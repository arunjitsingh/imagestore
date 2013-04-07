# Copyright 2013 Arunjit Singh. All Rights Reserved.

import os

from ajpy.appengine import context


PRODUCTION = context.IS_PRODUCTION
DEBUGGING = not PRODUCTION

ROOT = os.path.dirname(__file__)

WEBAPP2 = {
    'webapp2_extras.jinja2': {
        'template_path': ['templates'],
    },
}
