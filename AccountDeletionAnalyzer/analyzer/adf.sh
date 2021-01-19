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

# Decomplie apk file
[ ! -d "$outdir/$apkdir" ] && apktool d $apkpath -o $outdir/$apkdir

# Convert images to text only the first time
if [ ! -f "$model" ]; then
    find $outdir/$apkdir -type f -exec file {} \; | awk -F: '{if ($2 ~/image/) print $1}' | xargs -I{} tesseract {} {}
fi

# Find and validate AD strings
[ ! -z "$patterns" ] && while IFS='|' read -ra pats ; do
    for p in "${pats[@]}"; do
        valid=$(grep --color=never -Pio "(?<=>)$p(?=<)" $outdir/$apkdir/res/values/strings.xml | xargs -L 1 -I{} -r bash -c "grep -q 'TP' <(timeout $TIMELIMIT semantics.py \"{}\" \"$p\") && echo \"{}\" ")
        if [ ! -z "$valid" ]; then
            adstr+=$'\n'
            adstr+="$valid"
            adstr+=$'\n'
        fi
    done
done <<< "$patterns"
adstr=$(awk 'NF && !seen[$0]++' <<<"$adstr")  # Remove blank lines and duplicated lines

#### Build a mapping model ####
>$model
echo 'digraph G {' >> $model    # start dot graph

# { AD strings -> name attributes }
[ ! -z "$adstr" ] && while IFS= read -r ads ; do
    adsq=$(ere_quote "$ads")
    attr=$(grep --color=never -Po "(?<=name=\").*(?=\">$adsq<)" $outdir/$apkdir/res/values/strings.xml)
    if [ ! -z "$attr" ]; then
        echo "$attr" | sed "s/^/\"adstr::$ads\" -> \"nattr::/g" | sed "s/$/\"/g" >> $model
        nameattrs+=$'\n'
        nameattrs+="$attr"
        nameattrs+=$'\n'
    fi
done <<< "$adstr"
nameattrs=$(awk 'NF && !seen[$0]++' <<<"$nameattrs")

# { AD strings -> layouts }
[ ! -z "$adstr" ] && while IFS= read -r ads ; do
    adsq=$(ere_quote "$ads")
    lays=$(grep -Erl "$adsq" $outdir/$apkdir/res/layout/ | xargs -L 1 -r basename)
    if [ ! -z "$lays" ]; then
        echo "$lays" | sed "s/^/\"adstr::$ads\" -> \"lay::/g" | sed "s/$/\"/g" >> $model
        layouts+=$'\n'
        layouts+="$lays"
        layouts+=$'\n'
    fi
done <<< "$adstr"
layouts=$(awk 'NF && !seen[$0]++' <<<"$layouts")

# { AD strings -> images }
[ ! -z "$adstr" ] && while IFS= read -r ads ; do
    adsq=$(ere_quote "$ads")
    imgs=$(grep -Erl "$adsq" --include="*.txt" --exclude="*.txt.txt" $outdir/$apkdir/res/ | xargs -L 1 -r basename)
    if [ ! -z "$imgs" ]; then
        echo "$imgs" | sed "s/^/\"adstr::$ads\" -> \"img::/g" | sed "s/$/\"/g" >> $model
        images+=$'\n'
        images+="$imgs"
        images+=$'\n'
    fi
    imgs=$(grep -Erl "$adsq" --include="*.txt" --exclude="*.txt.txt" $outdir/$apkdir/assets/ | xargs -L 1 -r basename)
    if [ ! -z "$imgs" ]; then
        echo "$imgs" | sed "s/^/\"adstr::$ads\" -> \"img::/g" | sed "s/$/\"/g" >> $model
        images+=$'\n'
        images+="$imgs"
        images+=$'\n'
    fi
done <<< "$adstr"
images=$(awk 'NF && !seen[$0]++' <<<"$images")

# { AD strings -> html }
# Todo

# { name Attributes -> layouts }
[ ! -z "$nameattrs" ] && while IFS= read -r att ; do
    lays=$(grep -Erl "@string/$att" --include="*.xml" $outdir/$apkdir/res/layout/ | xargs -L 1 -r basename)
    if [ ! -z "$lays" ]; then
        echo "$lays" | sed "s/^/\"nattr::$att\" -> \"lay::/g" | sed "s/$/\"/g" >> $model
        layouts+=$'\n'
        layouts+="$lays"
        layouts+=$'\n'
    fi
done <<< "$nameattrs"
layouts=$(awk 'NF && !seen[$0]++' <<<"$layouts")


# { name Attributes -> fragments }
[ ! -z "$nameattrs" ] && while IFS= read -r att ; do
    hexid=$(grep --color=never -Po "(?<=name=\"$att\" id=\").*(?=\")" $outdir/$apkdir/res/values/public.xml)
    frags=$(grep --color=never -Erl "$hexid" --include="*.smali" $outdir/$apkdir/ | xargs -L 1 -r grep --color=never -Eril "\.super.*fragment;" | xargs -L 1 -r basename)
    if [ ! -z "$frags" ]; then
        echo "$frags" | sed "s/^/\"nattr::$att\" -> \"frag::/g" | sed "s/$/\"/g" >> $model
        fragments+=$'\n'
        fragments+="$frags"
        fragments+=$'\n'
    fi
done <<< "$nameattrs"
fragments=$(awk 'NF && !seen[$0]++' <<<"$fragments")

# { name Attributes -> activities }
[ ! -z "$nameattrs" ] && while IFS= read -r att ; do
    hexid=$(grep --color=never -Po "(?<=type=\"string\" name=\"$att\" id=\").*(?=\")" $outdir/$apkdir/res/values/public.xml)
    acts=$(grep --color=never -Erl "$hexid" --include="*.smali" --exclude="R*.smali" $outdir/$apkdir/ | xargs -L 1 -r grep --color=never -EriL "\.super.*fragment;" | xargs -L 1 -r basename)
    if [ ! -z "$acts" ]; then
        echo "$acts" | sed "s/^/\"nattr::$att\" -> \"act::/g" | sed "s/$/\"/g" >> $model
    fi
done <<< "$nameattrs"

# { images -> layouts }
[ ! -z "$images" ] && while IFS= read -r img ; do
    noext=${img%%.*}
    lays=$(grep -Erl "@drawable/$noext" --include="*.xml" $outdir/$apkdir/res/layout/ | xargs -L 1 -r basename)
    if [ ! -z "$lays" ]; then
        echo "$lays" | sed "s/^/\"img::$img\" -> \"lay::/g" | sed "s/$/\"/g" >> $model
        layouts+=$'\n'
        layouts+="$lays"
        layouts+=$'\n'
    fi
done <<< "$images"
layouts=$(awk 'NF && !seen[$0]++' <<<"$layouts")

# { images -> html }
# TODO

# { layouts -> toplevel layouts }
[ ! -z "$layouts" ] && while IFS= read -r lay ; do
    noext=${lay%%.*}
    tops=$(/home/hoang/Documents/Achilles/toplevel.sh $noext $outdir/$apkdir/res/layout/)
    if [ ! -z "$tops" ]; then
        echo "$tops" | sed "s/^/\"lay::$lay\" -> \"toplay::/g" | sed "s/$/\.xml\"/g" >> $model
        toplayouts+=$'\n'
        toplayouts+=$(sed "s/$/\.xml/g" <<<"$tops")
        toplayouts+=$'\n'
    fi
done <<< "$layouts"
toplayouts=$(awk 'NF && !seen[$0]++' <<<"$toplayouts")

# { toplevel layouts -> fragments }
[ ! -z "$toplayouts" ] && while IFS= read -r toplay ; do
    noext=${toplay%%.*}
    hexid=$(grep --color=never -Po "(?<=type=\"layout\" name=\"$noext\" id=\").*(?=\")" $outdir/$apkdir/res/values/public.xml)
    frags=$(grep --color=never -Erl "$hexid" --include="*.smali" $outdir/$apkdir/ | xargs -L 1 -r grep --color=never -Eril "\.super.*fragment;" | xargs -L 1 -r basename)
    if [ ! -z "$frags" ]; then
        echo "$frags" | sed "s/^/\"toplay::$toplay\" -> \"frag::/g" | sed "s/$/\"/g" >> $model
        fragments+=$'\n'
        fragments+="$frags"
        fragments+=$'\n'
    fi
done <<< "$toplayouts"
fragments=$(awk 'NF && !seen[$0]++' <<<"$fragments")

# { toplevel layouts -> activities }
[ ! -z "$toplayouts" ] && while IFS= read -r toplay ; do
    noext=${toplay%%.*}
    hexid=$(grep --color=never -Po "(?<=type=\"layout\" name=\"$noext\" id=\").*(?=\")" $outdir/$apkdir/res/values/public.xml)
    acts=$(grep --color=never -Erl "$hexid" --include="*.smali" --exclude="R*.smali" $outdir/$apkdir/ | xargs -L 1 -r grep --color=never -EriL "\.super.*fragment;" | xargs -L 1 -r basename)
    if [ ! -z "$acts" ]; then
        echo "$acts" | sed "s/^/\"toplay::$toplay\" -> \"act::/g" | sed "s/$/\"/g" >> $model
    fi
done <<< "$toplayouts"

# { fragments -> activities }
[ ! -z "$fragments" ] && while IFS= read -r fra ; do
    noext=${fra%%.*}
    acts=$(grep --color=never -Erl "$noext;-><init>\(" --include="*.smali" --exclude="R*.smali" $outdir/$apkdir/ | xargs -L 1 -r grep --color=never -EriL "\.super.*fragment;" | xargs -L 1 -r basename)
    if [ ! -z "$acts" ]; then
        echo "$acts" | sed "s/^/\"frag::$fra\" -> \"act::/g" | sed "s/$/\"/g" >> $model
    fi
done <<< "$fragments"

echo '}' >> $model   # end dot graph
