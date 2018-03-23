#!/bin/sh

find $(dirname $(dirname $(readlink -f $0))) -name '*.js' -o -name '*.html' -o -name '*.css' -o -name '*.json' | xargs -I{} sed -i 's/\r$//g' '{}'
