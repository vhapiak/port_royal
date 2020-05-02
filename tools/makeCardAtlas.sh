#!/bin/bash

cp $2 $1/atlas.json

index=1
for file in $(ls $1/*.png)
do
    sed -i "s/img$index/$(basename $file .png)/" $1/atlas.json
    index=$(expr $index + 1)
done

montage $1/*.png -tile 3x3 -geometry 235x328 -background none $1/atlas.png