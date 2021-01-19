#!/usr/bin/env bash

# $1 is apk_dot_dir
# $2 is web_dot_dir

[ -d analyses ] && rm -rf analyses

mkdir -p analyses/dot

>both.txt
for apk in $1/*; do
    a=$(basename $apk)
    if [ ! -f analyses/dot/$a ]; then
        if [ -f $2/$a ]; then   # merge
            head -n -1 $apk > analyses/dot/$a
            tail -n +2 $2/$a | sed 's/$/ [style="dashed"]/g' >> analyses/dot/$a
            sed -i '$ d' analyses/dot/$a
            echo "}" >> analyses/dot/$a
            echo $a >> both.txt
        else
            cp $apk analyses/dot
        fi
    fi
done

for web in $2/*; do
    w=$(basename $web)
    if [ ! -f analyses/dot/$w ]; then
        echo "digraph G {" > analyses/dot/$w
        tail -n +2 $2/$w | sed 's/$/ [style="dashed"]/g' >> analyses/dot/$w
        sed -i '$ d' analyses/dot/$w
        echo "}" >> analyses/dot/$w
    fi
done

### SVG ###
[ ! -d analyses/dot ] && echo "analyses/dot directory does not exist" && exit
[ -d analyses/svg ] && rm -rf analyses/svg
mkdir -p analyses/svg
for d in analyses/dot/*; do
    dot -Tsvg $d -o analyses/svg/$(basename $d .dot).svg
done

