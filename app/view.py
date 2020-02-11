"""
View objects that return compiled pages of Masternoe Web

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

import jinja2
import markdown
from markdown.extensions.wikilinks import WikiLinkExtension

from app.interfaces import AbstractView
from app.mdextensions import FigureFromTitleExtension


class JinjaTemplateView(AbstractView):
    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, template_path):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_path = template_path
        self.jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath=os.path.dirname(template_path)))
        self.jinja_env.filters['basename'] = self.basename
        self.jinja_env.filters['urlparse'] = self.urlparse

    def render(self, variables = {}):
        """Render the dashboard view""" 
        tpl = self.jinja_env.get_template(os.path.basename(self.tpl_path))
        return tpl.render(**variables).strip()

    def basename(self, path):
        """Custom filter to provide basename function"""
        return os.path.basename(path)

    def urlparse(self, path, component):
        """Custom filter to provide basename function"""
        return urlparse(path)[component]

class MarkdownTemplateView(AbstractView):
    replacements = [
        ['src="/', 'src="wiki/'],
        ['href="/', 'href="wiki/'],
        ]
    last_meta = None

    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, template_path, config = {}):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_path = template_path
        self.config = config

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