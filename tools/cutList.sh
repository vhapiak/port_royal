#!/bin/bash

mkdir -p $2

ffmpeg -i $1 -vf crop="493:690:84:132"    $2/0.png
ffmpeg -i $1 -vf crop="493:690:580:132"   $2/1.png
ffmpeg -i $1 -vf crop="493:690:1076:132"  $2/2.png
ffmpeg -i $1 -vf crop="493:690:84:825"    $2/3.png
ffmpeg -i $1 -vf crop="493:690:580:825"   $2/4.png
ffmpeg -i $1 -vf crop="493:690:1076:825"  $2/5.png
ffmpeg -i $1 -vf crop="493:690:84:1518"   $2/6.png
ffmpeg -i $1 -vf crop="493:690:580:1518"  $2/7.png
ffmpeg -i $1 -vf crop="493:690:1076:1518" $2/8.png