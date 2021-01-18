#!/usr/bin/env bash

choice=$1

if [ "$choice" == "time" ]; then
    find logs/ -name "*.log" -printf "%f," -exec tail -1 {} \; | sed 's/.log//g'
fi

if [ "$choice" == "dot" ]; then
    [ -d analyses/dot ] && rm -rf analyses/dot
    mkdir -p analyses/dot
    for o in output/*; do
        model="$o/mapping_model.dot"
        if [ -f $model ] && [ "$(wc -l < $model)" -ne "2" ] && ! grep -q "APKTOOL_DUPLICATENAME" $model; then
            cp $model analyses/dot/$(basename $o).dot
        fi
    done
    echo "Done copying all valid mapping_models.dot files to analyses/dot directory!"
fi

if [ "$choice" == "svg" ]; then
    [ ! -d analyses/dot ] && echo "analyses/dot directory does not exist" && exit
    [ -d analyses/svg ] && rm -rf analyses/svg
    mkdir -p analyses/svg
    for d in analyses/dot/*; do
        dot -Tsvg $d -o analyses/svg/$(basename $d .dot).svg
    done
    echo "Done convert dot files to svg files"
fi

if [ "$choice" == "fp" ]; then
    [ -d analyses/fp ] && rm -rf analyses/fp
    mkdir -p analyses/fp
    for o in output/*; do
        model="$o/not_ad_strings.txt"
        if [ -f $model ] && [ "$(wc -l < $model)" -ne "2" ] && ! grep -q "APKTOOL_DUPLICATENAME" $model; then
            cp $model analyses/fp/$(basename $o).fp
        fi
    done
    echo "Done copying all not_ad_strings.txt to analyses/fp directory!"
fi
