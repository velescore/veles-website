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
import json
import os
import subprocess

from app.builder import WebPageBuilder
from app.view import MarkdownTemplateView

class WikiBuilder(WebPageBuilder):
	articles_dir = 'public/wiki/articles'
	article_tpl = 'wiki-article'
	# Overrides of parent's values
	html_dir = 'public/wiki/pages'
	lang_in_extension = False

	""" Constructor, needs base path of website """
	def __init__(self, path, page_extension = 'html', article_extension = 'md'):
		self.article_extension = article_extension
		super().__init__(path, page_extension)

	def build_articles(self):
		""" Build all wiki pages, for each language """
		wiki_config = self.load_static_vars(os.path.join(self.path, 'wiki.json'))

		for lang in os.listdir(os.path.join(self.path, self.articles_dir)):
			lang_config = copy.copy(wiki_config)
			page_list = []

			# Load extra language-specific variables
			if os.path.isfile(os.path.join(self.path, self.articles_dir, lang, 'wiki.json')):
				lang_config.update(self.load_static_vars(os.path.join(self.path, self.articles_dir, lang, 'wiki.json')))

			for filename in os.listdir(os.path.join(self.path, self.articles_dir, lang)):
				name_parts = os.path.splitext(filename)

				if name_parts[1] == '.md' and name_parts[0] != 'README':
					filepath = os.path.join(self.path, self.articles_dir, lang, filename)
					view = MarkdownTemplateView(filepath, lang_config)
					article = {
						'alias': name_parts[0],
						'html': view.render(language = lang),
						'meta': view.get_meta_info()
						}
					page_list += [{
						'page': name_parts[0] + '.wiki', 
						'title': self.article_alias_to_title(name_parts[0])
						}]

					article.update(self.get_article_metadata(filepath))
					self.build(
						self.article_tpl, 
						variables = {'article': article}, 
						output_file = '{}.{}'.format(article['alias'], self.page_extension)
						)

			print(os.path.join(self.path, self.html_dir, lang, 'pages.json'), '[meta-data]')
			self.save_result(
				os.path.join(self.path, self.html_dir, lang, 'pages.json'),
				json.dumps(page_list)
				)


	def get_article_metadata(self, filepath):
		cmd = 'git --no-pager log -n 1 -- {}'.format(os.path.basename(filepath))
		output = subprocess.check_output(cmd, cwd=os.path.dirname(filepath), shell=True)
		lines = output.decode("utf-8").split("\n")
		data = {}
		message_start = False

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
				else:
					data['commit_message'] += ('' if data['commit_message'] == '' else ' ') + line.strip()

			except Exception as e:
				print('Error obtaining metadata: ', filename, e)

		return data

	def article_alias_to_title(self, alias):
		return alias.replace('-', ' ')