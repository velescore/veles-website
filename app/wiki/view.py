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

    def render(self, variables = {}, language = 'en'):
        """Render the dashboard view"""
        input_file = codecs.open(self.tpl_path, mode="r", encoding="utf-8")
        text = input_file.read()
        md = markdown.Markdown(extensions=[
            WikiLinkExtension(base_url='', end_url='.wiki.' + language + '.html', build_url = self.build_url),
            FigureFromTitleExtension(),
            'meta',
            'admonition',
            'tables',
            'attr_list'
            ])
        html = str(md.convert(text))
        self.last_meta = md.Meta

        for item in self.replacements:
            html = html.replace(item[0], item[1])

        return html

    def get_meta(self):
        """Returns raw meta data of the last rendered article"""
        return self.last_meta

    def get_meta_info(self):
        """Returns article metadata in human-readable format"""
        joined = {}

        for name, value in self.last_meta.items():
            if 'meta' in self.config and 'titles' in self.config['meta'] and name in self.config['meta']['titles']:
                name = self.config['meta']['titles'][name]
            joined[name] = ' '.join(value).strip()

        return joined


    def build_url(self, label, base, end):
        """ Build a url from the label, a base, and an end. """
        clean_label = re.sub(r'([ ]+_)|(_[ ]+)|([ ]+)', '-', label)
        return '{}{}{}'.format(base, clean_label, end)