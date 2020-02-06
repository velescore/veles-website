"""
Compiles templates and saves resulted page to static file

Copyright (C) 2020 The Veles Core developers

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""
from abc import ABCMeta, abstractmethod

class AbstractView(object, metaclass=ABCMeta):
	"""Defines common interface for the view objects"""

	@abstractmethod
	def render(self):
		"""Render the view and result as string""" 
		pass
