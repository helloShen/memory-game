import os
import shutil

src = '/Users/Wei/Downloads/dragontail-12.8.1/img/champion/tiles/'
dst = '/Users/Wei/github/react-pokemon/src/assets/img/champion/'
id = 0
for f in os.listdir(src):
  if f.endswith('_0.jpg'):
    shutil.copy(src + f, dst + 'img_' + str(id) + '.jpg')
    id+=1
