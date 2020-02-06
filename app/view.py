"""
View objects that return compiled pages of Masternoe Web

Copyright (C) 2020 The Veles Core developers

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""
import jinja2

from app.interfaces import AbstractView

class WebIndexView(AbstractView):
    page_name = 'index'

    """View for the index page of dashboard, requires template dir path"""
    def __init__(self, tpl_dir, tpl_extension = 'html'):
        """Creates the object, needs path to the jinja template directory"""
        self.tpl_dir = tpl_dir
        self.tpl_extension = tpl_extension
        self.jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath=tpl_dir))

    def render(self, variables = {}):
        """Render the dashboard view""" 
        tpl = self.jinja_env.get_template('{}.{}'.format(self.page_name, self.tpl_extension))
        return tpl.render(**variables).strip()