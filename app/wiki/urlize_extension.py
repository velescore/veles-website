# urlize_extension.py
import re
from markdown.extensions import Extension
from markdown.inlinepatterns import InlineProcessor
import xml.etree.ElementTree as etree

class UrlizePattern(InlineProcessor):
    # Raw URL regex pattern as a string
    url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+'

    def handleMatch(self, m, data):
        url = m.group(0)
        el = etree.Element('a')
        el.set('href', url if url.startswith(('http://', 'https://')) else 'http://' + url)
        el.text = url
        return el, m.start(0), m.end(0)

class UrlizeExtension(Extension):
    def extendMarkdown(self, md):
        # Use the raw pattern string; Markdown will compile it with the correct flags.
        md.inlinePatterns.register(UrlizePattern(UrlizePattern.url_pattern, md), 'urlize', 175)


def makeExtension(**kwargs):  # This is now safely encapsulated in the urlize_extension.py file
    return UrlizeExtension(**kwargs)
