#!/bin/bash

# purge lib
rm -fr lib

export BABEL_ENV=lib

# babel transform es6 into es5
babel src --out-dir lib --copy-files