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
from datetime import datetime
from dateutil.relativedelta import relativedelta
from urllib.parse import urlparse

import jinja2
import markdown

from app.interfaces import AbstractView


class JinjaTemplateView(AbstractView):
    config = {}

    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, template_path, config = {}):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_path = template_path
        self.config.update(config)
        self.jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath=os.path.dirname(template_path)))
        self.jinja_env.filters.update({
            'basename': self.basename,
            'urlparse': self.urlparse,
            'timedelta': self.timedelta
            });

    def render(self, variables = {}):
        """Render the dashboard view""" 
        tpl = self.jinja_env.get_template(os.path.basename(self.tpl_path))
        return tpl.render(**variables).strip()

    def basename(self, path):
        """Custom filter to provide basename function"""
        return os.path.basename(path)

    def urlparse(self, path, component):
        """Filter to parse urls to html links"""
        return urlparse(path)[component]

    def timedelta(self, dt):
        """Converts datetime to human readable form of time delta, eg. 2 seconds ago"""
        attrs = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
        human_readable = lambda delta: [
            '%d %s' % (getattr(delta, attr), getattr(delta, attr) != 1 and attr or attr[:-1])
                for attr in attrs if getattr(delta, attr) or attr == attrs[-1]
        ]
        return " and ".join(human_readable(relativedelta(datetime.now(), dt))[:2]) + ' ago' 

    def timeformat(self, dt, format):
        return dt.strftime(format)

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
