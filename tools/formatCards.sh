#!/bin/bash

mkdir -p $1/scaled/

for file in $(ls $1/*.png)
do

    ffmpeg -i $file -vf scale="235:328" $1/scaled/$(basename $file)
    convert $1/scaled/$(basename $file) $2 -compose CopyOpacity -composite $1/scaled/$(basename $file)

done