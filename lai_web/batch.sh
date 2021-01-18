#!/usr/bin/env bash
export TIMEFORMAT=%R

trap nothing SIGINT SIGPIPE SIGTERM
function nothing() {
    echo "RECEIVED SIGNALS"
}

mapping_list=$1
param=$2


logdir=$(basename $1)_out
timedir=$(basename $1)_err

if [ "$param" == "remove" ]; then
    rm -rf $indir
    [ -d $logdir ] && rm -rf $logdir
    [ -d $timedir ] &&  rm -rf $timedir
    echo "---- DONE REMOVING DATA ---"
elif [ "$param" == "manual" ]; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    data=$(cat $mapping_list)
    for line in $data; do
        apk="${line%%,*}"
        url="${line#*,}"
        fname=$(basename $apk .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo "-------------- MANUAL TEST -------------------"
                echo "Running URL : ${url}"
                echo "of equivalent APK : ${apk}"
                echo "----------------------------------------------"
                { time python -u manual.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
                while true; do
                    read -p "Press [ a - again | q - quit | n - next | o - output | e - errors ] :: " -n 1 -r
                    echo
                    if [[ "$REPLY" == "a" ]]; then
                        break
                    elif [[ "$REPLY" == "q" ]]; then
                        exit 0
                    elif [[ "$REPLY" == "o" ]]; then
                        echo
                        [ -f $logdir/$fname.log ] && cat $logdir/$fname.log
                    elif [[ "$REPLY" == "e" ]]; then
                        echo
                        [ -f $timedir/$fname.log ] && cat $timedir/$fname.log
                    else
                        nflag="N"
                        break
                    fi
                done
                if [ "$nflag" == "N" ]; then
                    break
                fi
            done
        fi
    done
elif [ "$param" == "delete" ]; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    data=$(cat $mapping_list)
    for line in $data; do
        apk="${line%%,*}"
        url="${line#*,}"
        fname=$(basename $apk .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo "-------------- DELETE TEST -------------------"
                echo "Running URL : ${url}"
                echo "of equivalent APK : ${apk}"
                echo "----------------------------------------------"
                { time python -u delete.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
                while true; do
                    read -p "Press [ a - again | q - quit | n - next | o - output | e - errors ] :: " -n 1 -r
                    echo
                    if [[ "$REPLY" == "a" ]]; then
                        break
                    elif [[ "$REPLY" == "q" ]]; then
                        exit 0
                    elif [[ "$REPLY" == "o" ]]; then
                        echo
                        [ -f $logdir/$fname.log ] && cat $logdir/$fname.log
                    elif [[ "$REPLY" == "e" ]]; then
                        echo
                        [ -f $timedir/$fname.log ] && cat $timedir/$fname.log
                    else
                        nflag="N"
                        break
                    fi
                done
                if [ "$nflag" == "N" ]; then
                    break
                fi
            done
        fi
    done
elif [ "$param" == "signup" ]; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    data=$(cat $mapping_list)
    for line in $data; do
        apk="${line%%,*}"
        url="${line#*,}"
        fname=$(basename $apk .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo "-------------- SIGNUP TEST -------------------"
                echo "Running URL : ${url}"
                echo "of equivalent APK : ${apk}"
                echo "----------------------------------------------"
                { time python -u signup.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
                while true; do
                    read -p "Press [ a - again | q - quit | n - next | o - output | e - errors ] :: " -n 1 -r
                    echo
                    if [[ "$REPLY" == "a" ]]; then
                        break
                    elif [[ "$REPLY" == "q" ]]; then
                        exit 0
                    elif [[ "$REPLY" == "o" ]]; then
                        echo
                        [ -f $logdir/$fname.log ] && cat $logdir/$fname.log
                    elif [[ "$REPLY" == "e" ]]; then
                        echo
                        [ -f $timedir/$fname.log ] && cat $timedir/$fname.log
                    else
                        nflag="N"
                        break
                    fi
                done
                if [ "$nflag" == "N" ]; then
                    break
                fi
            done
        fi
    done
elif [ "$param" == "login" ]; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    data=$(cat $mapping_list)
    for line in $data; do
        apk="${line%%,*}"
        url="${line#*,}"
        fname=$(basename $apk .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo "-------------- LOGIN TEST -------------------"
                echo "Running URL : ${url}"
                echo "of equivalent APK : ${apk}"
                echo "----------------------------------------------"
                { time python -u login.py $url ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
                while true; do
                    read -p "Press [ a - again | q - quit | n - next | o - output | e - errors ] :: " -n 1 -r
                    echo
                    if [[ "$REPLY" == "a" ]]; then
                        break
                    elif [[ "$REPLY" == "q" ]]; then
                        exit 0
                    elif [[ "$REPLY" == "o" ]]; then
                        echo
                        [ -f $logdir/$fname.log ] && cat $logdir/$fname.log
                    elif [[ "$REPLY" == "e" ]]; then
                        echo
                        [ -f $timedir/$fname.log ] && cat $timedir/$fname.log
                    else
                        nflag="N"
                        break
                    fi
                done
                if [ "$nflag" == "N" ]; then
                    break
                fi
            done
        fi
    done
fi
