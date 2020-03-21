"""
Compiles templates and saves resulted page to static file

Copyright (C) 2020 The Veles Core developers

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""

from app.wiki.builder import WikiBuilder
from app.news.view import NewsMarkdownTemplateView

class NewsBuilder(WikiBuilder):
	# Overrides of parent's values
	articles_dir = 'templates/news'
	article_tpl = 'news-article'
	json_config = 'news.json'
	page_type = 'news'
	pages_file = 'pages.json'
	articles_file = 'articles.json'
	tags_file = 'tags.json'
	tpl_dir = 'templates/news'
	html_dir = 'public/news/pages'
	images_path = 'images/news'

	def get_markdown_view(self, filepath, language):
		return NewsMarkdownTemplateView(filepath, language)