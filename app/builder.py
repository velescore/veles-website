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

from app.view import WebIndexView

class WebPageBuilder(object):
    """ Constructor, needs base path of website """
    def __init__(self, path, page_extension = 'html'):
        self.path = path
        self.page_extension = page_extension

    def save_result(self, filename, result):
        with codecs.open(filename, 'w', 'utf-8') as fh:
            fh.write(result)

    def load_static_vars(self, path):
        if os.path.isfile(path):
            with open(path, 'r') as json_file:
                data = json_file.read()

            return json.loads(data)
        else:
            print('WebPageBuilder: Warning: static variable file not found: {}'.format(path))
            return {}

    def build(self, page = 'index', variables = {}):
        tpl_vars = self.load_static_vars(os.path.join(self.path, 'variables.json'))

        for lang in os.listdir(os.path.join(self.path, 'templates')):
            lang_vars = copy.copy(tpl_vars)

            # Load extra language-specific variables
            if os.path.isfile(os.path.join(self.path, 'templates', lang, 'variables.json')):
                lang_vars.update(self.load_static_vars(os.path.join(self.path, 'templates', lang, 'variables.json')))

            # Overwrite with variables explicitly given
            lang_vars.update(variables)

            if page == 'index':
                print(os.path.join(self.path, 'templates', lang))
                view = WebIndexView(os.path.join(self.path, 'templates', lang))
                result = view.render(lang_vars)
                filename = '{}.{}.{}'.format(os.path.join(self.path, 'public', page), lang, self.page_extension)
                self.save_result(filename, result)
                print(filename)

            else:
                raise ValueError('unknown page: {}'.format(page))
