"""
Generates a Caption for Figures for each Image which stands alone in a paragraph,
similar to pandoc#s handling of images/figures

--------------------------------------------

Licensed under the GPL2 or later (see LICENSE.md)

Copytight 2020 - The Veles Core Developers by building upon the figureAltCaption updated by
Copyright 2019 - Jérémie Dumas by updating figureAltCaption by
Copyright 2015 - Jan Dittrich by building upon the markdown-figures Plugin by
Copyright 2013 - [Helder Correia](http://heldercorreia.com) (GPL2)

--------------------------------------------

Examples:
    Bla bla bla

    ![](http://lorempixel.com/400/200/ "This is the caption")

    Next paragraph starts here

would generate a figure like this:

    <figure>
        <img src="http://lorempixel.com/400/200/">
        <figcaption>this is the caption</figcaption>
    </figure>
"""

from __future__ import unicode_literals
from markdown import Extension
from markdown.inlinepatterns import LinkInlineProcessor, IMAGE_LINK_RE
#from markdown.util import etree
import xml.etree.ElementTree as etree

class FigureFromTitleInlineProcessor(LinkInlineProcessor):
    """ Return a img element from the given match. """

    def handleMatch(self, m, data):
        text, index, handled = self.getText(data, m.end(0))
        if not handled or not text:
            return None, None, None

        src, title, index, handled = self.getLink(data, index)
        if not handled:
            return None, None, None

        # Skip if title is not given, keep the alt text for alt
        if title is None:
            return None, None, None        

        figure = etree.Element('figure')
        link = etree.SubElement(figure, 'a') # Wrap image to the link
        img = etree.SubElement(link, 'img')
        caption = etree.SubElement(figure, 'figcaption')
        caption.text = title

        img.set('src', src)
        img.set('alt', text)
        link.set('href', src)
        link.set('target', '_blank')

        return figure, m.start(0), index


class FigureFromTitleExtension(Extension):
    def extendMarkdown(self, md):
        """ Add an instance of AltCaptionInlineProcessor to InlinePatterns. """
        md.inlinePatterns.register(FigureFromTitleInlineProcessor(IMAGE_LINK_RE, md), 'figureFromTitle', 155)
        md.registerExtension(self)


def makeExtension(**kwargs):
    return FigureFromTitleExtension(**kwargs)
