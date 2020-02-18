"""
View to render wiki page from extended Markdown format
specialized for Veles Core wiki.

Copyright (C) 2020 The Veles Core developers

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""

import codecs
import os
import re
from urllib.parse import urlparse

import markdown
from markdown.extensions.wikilinks import WikiLinkExtension

from app.view import MarkdownTemplateView
from app.wiki.extensions import FigureFromTitleExtension


class WikiMarkdownTemplateView(MarkdownTemplateView):
    """Renders a wiki page from Markdown file"""
    replacements = [
        ['src="/', 'src="wiki/'],
        ['href="/', 'href="wiki/'],
        ]
    last_meta = None

    def setup_markdown(self):
        return markdown.Markdown(extensions=[
            WikiLinkExtension(base_url='', end_url='.wiki.' + self.language + '.html', build_url = self.build_url),
            FigureFromTitleExtension(),
            'meta',
            'admonition',
            'tables',
            'attr_list',
            'mdx_urlize'
            ])

    def post_render_filter(self, html, variables):
        """Gets called after rendering, can alter the output"""
        self.save_meta_info(variables)

        for item in self.replacements:
            html = html.replace(item[0], item[1])

        return html

    def get_meta(self):
        """Returns raw meta data of the last rendered article"""
        return self.last_meta

    def get_meta_info(self):
        """Returns human-readable meta data of the last rendered article"""
        return self.last_meta_info

    def save_meta_info(self, config):
        """Saves article metadata in human-readable format"""
        self.last_meta = self.md.Meta
        self.last_meta_info = {}

        for name, value in self.last_meta.items():
            if 'meta' in config and 'titles' in config['meta'] and name in config['meta']['titles']:
                name = config['meta']['titles'][name]
            self.last_meta_info[name] = ' '.join(value).strip()

    def build_url(self, label, base, end):
        """ Build a url from the label, a base, and an end. """
        clean_label = re.sub(r'([ ]+_)|(_[ ]+)|([ ]+)', '-', label)
        return '{}{}{}'.format(base, clean_label, end)