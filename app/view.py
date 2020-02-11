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

    def render(self, variables = {}):
        """Render the dashboard view""" 
        tpl = self.jinja_env.get_template(os.path.basename(self.tpl_path))
        return tpl.render(**variables).strip()

class MarkdownTemplateView(AbstractView):
    replacements = [
        ['src="/', 'src="wiki/'],
        ['href="/', 'href="wiki/'],
        ]

    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, template_path):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_path = template_path

    def render(self, variables = {}, language = 'en'):
        """Render the dashboard view"""
        input_file = codecs.open(self.tpl_path, mode="r", encoding="utf-8")
        text = input_file.read()
        html = str(markdown.markdown(text, extensions=[
            WikiLinkExtension(base_url='', end_url='.wiki.' + language + '.html', build_url = self.build_url),
            FigureFromTitleExtension(),
            'meta',
            'admonition',
            'tables'
            ]))

        for item in self.replacements:
            html = html.replace(item[0], item[1])

        return html

    def build_url(self, label, base, end):
        """ Build a url from the label, a base, and an end. """
        clean_label = re.sub(r'([ ]+_)|(_[ ]+)|([ ]+)', '-', label)
        return '{}{}{}'.format(base, clean_label, end)