"""
Compiles templates and saves resulted page to static file

Copyright (C) 2020 The Veles Core developers

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""
import codecs
import copy
import dateutil.parser
import json
import os
import re
import subprocess
import time
from datetime import datetime

from app.builder import WebPageBuilder
from app.wiki.view import WikiMarkdownTemplateView

class WikiBuilder(WebPageBuilder):
	articles_dir = 'public/wiki/articles'
	article_tpl = 'wiki-article'
	json_config = 'wiki.json'
	page_type = 'wiki'
	pages_file = 'pages.json'
	articles_file = 'articles.json'
	tags_file = 'tags.json'
	# Overrides of parent's values
	tpl_dir = 'templates/wiki'
	html_dir = 'public/wiki/pages'
	lang_in_extension = False
	max_abstract_len = 120

	""" Constructor, needs base path of website """
	def __init__(self, path, page_extension = 'html', article_extension = 'md'):
		self.article_extension = article_extension
		super().__init__(path, page_extension)

	def build_articles(self):
		""" Build all wiki pages, for each language """
		wiki_config = self.load_static_vars(os.path.join(self.path, self.json_config))

		for lang in os.listdir(os.path.join(self.path, self.articles_dir)):
			lang_config = copy.copy(wiki_config)
			page_list = []
			article_info = []
			tag_index = {}

			# Load extra language-specific variables
			if os.path.isfile(os.path.join(self.path, self.articles_dir, lang, self.json_config)):
				lang_config.update(self.load_static_vars(os.path.join(self.path, self.articles_dir, lang, self.json_config)))

			for filename in os.listdir(os.path.join(self.path, self.articles_dir, lang)):
				name_parts = os.path.splitext(filename)

				if name_parts[1] == '.md' and name_parts[0] != 'README':
					filepath = os.path.join(self.path, self.articles_dir, lang, filename)
					view = self.get_markdown_view(filepath, lang)
					article = {
						'alias': name_parts[0],
						'html': view.render(lang_config),
						'meta': view.get_meta_info()
						}
					page_list_item = {
						'page': name_parts[0] + '.' + self.page_type, 
						'title': self.article_alias_to_title(name_parts[0])
						}
					article['abstract'] = self.get_html_article_abstract(article['html'])
					article_tags = str(article['meta']['tags']).replace(' ', '').split(',') if 'tags' in article['meta'] else []
					article_info_item = {
						'alias': article['alias'],
						'title': page_list_item['title'],
						'abstract': article['abstract'],
						'tags': article_tags,
						'url': article['alias'] + '.' + self.page_type + '.' + lang + '.html' 
					}
					article['infobox'] = copy.copy(article['meta'])

					# Remove special tags from infobox
					if 'tags' in article['infobox']:
						del(article['infobox']['tags'])
					
					# index tags to better structure
					for tag in article_tags:
						if not tag in tag_index:
							tag_index[tag] = []

						tag_index[tag] += [article['alias']]

					article.update(self.get_article_metadata(filepath))

					# parse the datetime string from metadata
					if 'updated_at' in article:
						dt = dateutil.parser.parse(article['updated_at'])
						article['updated_at'] = dt		# pythonic datetime object passed to Jinja2
						page_list_item['timestamp'] = int(time.mktime(dt.timetuple()))
					else:
						print('Warning: Wiki article {} not is not on the git repository')

					# add collected info to the lists
					page_list += [page_list_item]
					article_info += [article_info_item]

					# build current article
					self.build(
						self.article_tpl, 
						variables = {'article': article, self.page_type: lang_config}, 
						output_file = '{}.{}'.format(article['alias'], self.page_extension)
						)

			print(os.path.join(self.path, self.html_dir, lang, self.pages_file), '[meta-data]')
			self.save_result(
				os.path.join(self.path, self.html_dir, lang, self.pages_file),
				json.dumps(page_list)
				)
			self.save_result(
				os.path.join(self.path, self.html_dir, lang, self.articles_file),
				json.dumps(article_info, indent=4)
				)
			self.save_result(
				os.path.join(self.path, self.html_dir, lang, self.tags_file),
				json.dumps(tag_index)
				)

	def get_markdown_view(self, filepath, language):
		return WikiMarkdownTemplateView(filepath, language)

	def get_html_article_abstract(self, html):
		abstract = self.get_html_first_child_text(html, 'p')

		if not len(abstract):
			abstract = self.get_html_first_child_text(html, 'h1')

		if not len(abstract):
			abstract = self.get_html_first_child_text(html, 'h2')

		return abstract if len(abstract) < self.max_abstract_len else abstract[:(self.max_abstract_len - 4)] + ' ...'

	def get_html_first_child_text(self, html, el):
		match = re.search("<" + el + ">.*?</" + el + ">", html, re.IGNORECASE | re.MULTILINE)
		result = str(match.group()) if match else ""	# extract first HTML element we need
		tags_re = re.compile(r'<.*?>')	# look for HTML tags to remove
		return tags_re.sub('', result)

	def get_article_metadata(self, filepath, get_all_commits = True):
		cmd = 'git --no-pager log {} -- {}'.format('--follow' if get_all_commits else '-n 1 ', os.path.basename(filepath))
		output = subprocess.check_output(cmd, cwd=os.path.dirname(filepath), shell=True)
		lines = output.decode("utf-8").split("\n")
		data = {}
		message_start = False
		message_end = False

		if not output.strip():
			print('Warning: Failed to get git info about: ' + filepath)
			return {}

		for line in lines:
			try:
				if not message_start:
					if line.startswith('commit'):
						data['commit'] = line.split(' ')[1].strip()

					elif line.startswith('Author:'):
						data['author'] = line.strip()[7:].split('<')[0].strip()

					elif line.startswith('Date:'):
						data['updated_at'] = line.strip()[5:].split('+')[0].strip()

					elif line.strip() == '':
						message_start = True
						data['commit_message'] = ''
						data['commit_count'] = 1 if get_all_commits else False
						data['authors'] = [data['author']]
				else:
					if line.startswith('commit'):	# the message is indented by git client so this is supposed to be safu
						message_end = True
						data['commit_count'] += 1

					elif line.startswith('Author:'):
						other_author = line.strip()[7:].split('<')[0].strip()

						if other_author not in data['authors']:
							data['authors'] += [other_author]

					elif not message_end:
						data['commit_message'] += ('' if data['commit_message'] == '' else ' ') + line.strip()

			except Exception as e:
				print('Error obtaining metadata: ', filename, e)

		return data

	def article_alias_to_title(self, alias):
		return alias.replace('-', ' ')