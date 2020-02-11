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

from app.view import JinjaTemplateView

class WebPageBuilder(object):
    tpl_dir = 'templates'
    html_dir = 'public'
    lang_in_extension = True

    """ Constructor, needs base path of website """
    def __init__(self, path, page_extension = 'html'):
        self.path = path
        self.page_extension = page_extension

    def save_result(self, filename, result):
        if not os.path.isdir(os.path.dirname(filename)):
            os.makedirs(os.path.dirname(filename))

        with codecs.open(filename, 'w', 'utf-8') as fh:
            fh.write(result)

    def load_static_vars(self, path):
        if os.path.isfile(path):
            with codecs.open(path, 'r', 'utf-8') as json_file:
                data = json_file.read()

            return json.loads(data)
        else:
            print('WebPageBuilder: Warning: static variable file not found: {}'.format(path))
            return {}

    def build(self, page, variables = {}, output_file = None):
        tpl_vars = self.load_static_vars(os.path.join(self.path, 'variables.json'))

        for lang in os.listdir(os.path.join(self.path, self.tpl_dir)):
            lang_vars = copy.copy(tpl_vars)

            # Load extra language-specific variables
            if os.path.isfile(os.path.join(self.path, self.tpl_dir, lang, 'variables.json')):
                lang_vars.update(self.load_static_vars(os.path.join(self.path, self.tpl_dir, lang, 'variables.json')))

            # Overwrite with variables explicitly given
            lang_vars.update(variables)

            source = os.path.join(self.path, self.tpl_dir, lang, '{}.{}'.format(page, self.page_extension))

            if output_file:
                destination = os.path.join(self.path, self.html_dir, lang, output_file)
            elif (self.lang_in_extension):
                destination = '{}.{}.{}'.format(os.path.join(self.path, self.html_dir, page), lang, self.page_extension)
            else:
                destination = '{}.{}'.format(os.path.join(self.path, self.html_dir, lang, page), self.page_extension)

            if os.path.isfile(source):
                view = JinjaTemplateView(source)
                
                self.save_result(destination, view.render(lang_vars))
                print(destination)

            else:
                raise ValueError('Unknown page: {}'.format(source))
