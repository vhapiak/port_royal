#!/bin/bash

mkdir -p $2
convert -density 200 -depth 8 -quality 100 $1 $2/list.png