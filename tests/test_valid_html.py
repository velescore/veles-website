"""Tests whether generated HTML is valid"""
from py_w3c.validators.html.validator import HTMLValidator
import sys, os, json

class TestValidHTML(object):
    files = ['public/index.html']

    def __init__(self):
        self.project_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

    def show_error_report(self, validator_errors):
        i = 1;
        print('\n [ HTML Validator Report: ]\n')

        for error in validator_errors:
            print('\n [ {}. ]:'.format(i))
            for name, value in dict(error).items():
                print('{}: {}'.format(name, value))
            i += 1;

        print('\n [ End of report ]\n')

    def run(self):
        html_validator = HTMLValidator()
        
        for file in self.files:
            html_validator.validate_file(os.path.join(self.project_path, file))
            print(os.path.join(self.project_path, file))

            if len(html_validator.errors):
                self.show_error_report(html_validator.errors)
                raise Exception("Failed to validate HTML file: {}".format(file))

if __name__=='__main__':
    test = TestValidHTML()
    test.run()