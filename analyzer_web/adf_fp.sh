#!/usr/bin/env bash

apkpath=$1
apkfile=$(basename -- "$apkpath")
apkdir="${apkfile%.*}"
outdir=output
patterns=".*delete.*account.*|.*close.*account.*|.*cancel.*account.*"
not_ad_out=$outdir/$apkdir/not_ad_strings.txt

TIMELIMIT=30

ere_quote() {
    sed 's/[]\.|$(){}?+*^]/\\&/g' <<< "$*"
}

[ ! -d $outdir ] && echo "You must run parallel.sh script before running this tool" && exit 1

# Find False Positive AD strings
[ ! -z "$patterns" ] && while IFS='|' read -ra pats ; do
    for p in "${pats[@]}"; do
        valid=$(grep --color=never -Prioh "$p" --include "*.*.txt" $outdir/$apkdir | grep -ve "'" | xargs -L 1 -I{} -r bash -c "grep -q 'TP' <(timeout $TIMELIMIT semantics.py \"{}\" \"$p\") && echo \"{}\" ")
        if [ ! -z "$valid" ]; then
            adstr+=$'\n'
            adstr+="$valid"
            adstr+=$'\n'
            exit 0
        else
            invalid=$(grep --color=never -Prioh "$p" --include "*.*.txt" $outdir/$apkdir | grep -ve "'" | xargs -L 1 -I{} -r bash -c "grep -q 'FP' <(timeout $TIMELIMIT semantics.py \"{}\" \"$p\") && echo \"{}\" ")
            if [ ! -z "$invalid" ]; then
                fpadstr+=$'\n'
                fpadstr+="$invalid"
                fpadstr+=$'\n'
            fi
        fi
    done
done <<< "$patterns"

if [ ! -z "$fpadstr" ]; then
    echo "$fpadstr" > $not_ad_out
fi
