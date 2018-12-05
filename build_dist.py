#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

# Must run this script before committing to repository if JS files within `src`
# had changed.

os.system('rm -fr dist')

presets = [
  'es2015',
  'react',
  'env',
]

plugins = [
  'transform-class-properties',
  'transform-object-rest-spread',
]

node_command = (
  './node_modules/.bin/babel src' +
  '  --out-dir dist' +
  '  --presets=' + ','.join(presets) +
  '  --plugins=' + ','.join(plugins)
)

# Build the ES5 JS files.
print(node_command)
os.system(node_command)

# Copy CSS files.
os.system('mkdir dist/styles')
os.system('cp src/styles/*.css dist/styles/')
