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

import jinja2
import markdown

from app.interfaces import AbstractView


class JinjaTemplateView(AbstractView):
    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, template_path, config = {}):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_path = template_path
        self.config = config
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
    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, template_path, language = 'en'):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_path = template_path
        self.language = language
        self.md = self.setup_markdown()

    def render(self, variables = {}):
        """Render the dashboard view"""
        input_file = codecs.open(self.tpl_path, mode="r", encoding="utf-8")
        text = input_file.read()
        html = str(self.md.convert(text))
        return self.post_render_filter(html, variables)

    def setup_markdown(self):
        return markdown.Markdown(extensions=[])

    def post_render_filter(self, html):
        """Gets called after rendering, can alter the output"""
        return html