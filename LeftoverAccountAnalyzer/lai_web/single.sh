#!/usr/bin/env bash
export TIMEFORMAT=%R

trap nothing SIGINT SIGPIPE SIGTERM
function nothing() {
    echo "RECEIVED SIGNALS"
}

mapping_list=$1
apkfile=$2

logdir=${mapping_list}_out
timedir=${mapping_list}_err

if grep -q $apkfile $mapping_list ; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    
    line=$(grep --color=never $apkfile $mapping_list)
    apk="${line%%,*}"
    url="${line#*,}"
    fname=$(basename $apk .apk)
    
    echo "*************************************"
    echo "Running URL : ${url}"
    echo "of equivalent APK : ${apk}"
    echo "*************************************"
    if [ "$3" == "signup" ]; then
        { time python -u signup.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$3" == "manual" ]; then
        { time python -u manual.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$3" == "delete" ]; then
        { time python -u delete.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$3" == "login" ]; then
        { time python -u login.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    else 
        echo "You are missing 3rd parameter"
    fi
fi
