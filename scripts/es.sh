#!/bin/bash

# purge es
rm -fr es

export BABEL_ENV=es

# babel transform es6 into es5
babel src --out-dir es --copy-files