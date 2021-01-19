#!/usr/bin/env bash

indir=$1
maxprocs=$2

logdir=logs_fp
[ ! -d $logdir/$indir ] && mkdir -p $logdir/$indir

for f in $indir/*; do
    echo "$f"
done | xargs -I{} --max-procs $maxprocs bash -c "{ /usr/bin/time -f \"%e\" ./adf_fp.sh {} ; } 2> $logdir/{}.log"
