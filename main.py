# Copyright 2013 Arunjit Singh. All Rights Reserved.

"""The main script."""

__author__ = 'arunjitsingh'

from ajpy.appengine import application
from ajpy.appengine.wsgi import base
from ajpy.appengine.wsgi import paths
from ajpy.appengine.wsgi import response

import config


@paths.Paths(r'/')
class Index(base.RequestHandler):

  def Get(self):
    return response.TemplateResponse(self.GetTemplate('index.html'))


app = application.CreateFromDecoratedPaths(debug=config.DEBUGGING)
