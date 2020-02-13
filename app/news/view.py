"""
View to render news page from extended Markdown format
specialized for Veles Core news.

Copyright (C) 2020 The Veles Core developers

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""

import markdown

from app.wiki.view import WikiMarkdownTemplateView


class NewsMarkdownTemplateView(WikiMarkdownTemplateView):
	"""Renders a news page from Markdown file"""
	replacements = [
		['src="/', 'src="news/'],
		['href="/', 'href="news/'],
		]
	last_meta = None

	def setup_markdown(self):
		return markdown.Markdown(extensions=[
			'meta',
			'admonition',
			'tables',
			'attr_list'
			])
