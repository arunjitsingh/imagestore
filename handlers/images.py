"""Images handler."""

__author__ = 'arunjitsingh'

from ajpy.appengine.storage import images
from ajpy.appengine.wsgi import image
from ajpy.appengine.wsgi import paths
from ajpy.appengine.wsgi import response


def CreateImageMetadata(img):
  """Creates metadata for an image.

  Args:
    img: (images.Image)

  Returns:
    (dict)
  """
  data = img.to_dict()
  data['id'] = img.key.id()
  return data


@paths.Path(r'/images?')
class ImageHandler(image.ImageHandler):

  def Post(self):
    img = self.SaveImageAsync().get_result()
    return response.JsonResponse(data=CreateImageMetadata(img))

  def Get(self):
    data = []
    qry = images.Image.query()
    for img in qry:
      data.append(CreateImageMetadata(img))
    return response.JsonResponse(data=data)
