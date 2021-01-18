#!/usr/bin/env bash

apkpath=$1
apkfile=$(basename -- "$apkpath")
apkdir="${apkfile%.*}"
outdir=output
patterns=".*delete.*account.*|.*close.*account.*|.*cancel.*account.*"
model=$outdir/$apkdir/mapping_model.dot

TIMELIMIT=45

ere_quote() {
    sed 's/[]\.|$(){}?+*^]/\\&/g' <<< "$*"
}

[ ! -d $outdir ] && mkdir -p $outdir

# copy web data to output directory for processing
[ ! -d "$outdir/$apkdir" ] && cp -r $apkpath $outdir/$apkdir


# Convert images to text only the first time
if [ ! -f "$model" ]; then
    find $outdir/$apkdir -type f -exec file {} \; | awk -F: '{if ($2 ~/image/) print $1}' | xargs -I{} tesseract {} {}
fi

# Convert html or htm files to text only the first time
if [ ! -f "$model" ]; then
    find $outdir/$apkdir -type f \( -name "*.html" -o -name "*.htm" \) -print0 -exec bash -c 'html2text "{}" > "{}.txt"' \;
fi

# Find and validate AD strings
[ ! -z "$patterns" ] && while IFS='|' read -ra pats ; do
    for p in "${pats[@]}"; do
        valid=$(grep --color=never -Prioh "$p" --include "*.*.txt" $outdir/$apkdir | grep -ve "'" | xargs -L 1 -I{} -r bash -c "grep -q 'TP' <(timeout $TIMELIMIT semantics.py \"{}\" \"$p\") && echo \"{}\" ")
        if [ ! -z "$valid" ]; then
            adstr+=$'\n'
            adstr+="$valid"
            adstr+=$'\n'
        fi
    done
done <<< "$patterns"
adstr=$(awk 'NF && !seen[$0]++' <<<"$adstr")  # Remove blank lines and duplicated lines


>$model
echo 'digraph G {' >> $model    # start dot graph

# { AD strings -> html files }
[ ! -z "$adstr" ] && while IFS= read -r ads ; do
    adsq=$(ere_quote "$ads")
    html=$(grep --color=never -Erl "$adsq" --include="*.html.txt" --include="*.htm.txt" $outdir/$apkdir | xargs -L 1 -r -I{} basename {} | sed 's/\.txt//g')
    if [ ! -z "$html" ]; then
        echo "$html" | sed "s~^~\"adstr::$ads\" -> \"html::~g" | sed "s~$~\"~g" >> $model
    fi
done <<< "$adstr"

# { AD strings -> images }
[ ! -z "$adstr" ] && while IFS= read -r ads ; do
    adsq=$(ere_quote "$ads")
    imgs=$(grep -Erl "$adsq" --include="*.*.txt" --exclude="*.html.txt" --exclude="*.htm.txt" $outdir/$apkdir | xargs -L 1 -r -I{} basename {} | sed 's/\.txt//g')
    if [ ! -z "$imgs" ]; then
        echo "$imgs" | sed "s~^~\"adstr::$ads\" -> \"img::~g" | sed "s~$~\"~g" >> $model
        images+=$'\n'
        images+="$imgs"
        images+=$'\n'
    fi
done <<< "$adstr"
images=$(awk 'NF && !seen[$0]++' <<<"$images")

# { images -> htmls }
[ ! -z "$images" ] && while IFS= read -r img ; do
    html=$(grep -Erl "<img src=\"$img\"" --include="*.html" --include="*.htm" $outdir/$apkdir | xargs -L 1 -r -I{} basename {})
    if [ ! -z "$html" ]; then
        echo "$html" | sed "s~^~\"img::$img\" -> \"html::~g" | sed "s~$~\"~g" >> $model
    fi
done <<< "$images"


echo '}' >> $model   # end dot graph
