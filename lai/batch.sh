#!/usr/bin/env bash
export TIMEFORMAT=%R

trap nothing SIGINT SIGPIPE SIGTERM
function nothing() {
    echo "RECEIVED SIGNALS"
}

indir=$1
param=$2

logdir=$(basename $1)_out
timedir=$(basename $1)_err

if [ "$param" == "remove" ]; then
    rm -rf $indir
    [ -d $logdir ] && rm -rf $logdir
    [ -d $timedir ] &&  rm -rf $timedir
    echo "---- DONE REMOVING DATA ---"
elif [ "$param" == "install" ]; then
    for f in $indir/*; do
        echo "Installing $f"
        adb install $f
    done
    echo "----  DONE INSTALLATIONS  ----"
elif [ "$param" == "uninstall" ]; then
    for f in $indir/*; do
        package=$(aapt dump badging $f | grep --color=never -Po "(?<=package:\ name=\').*?(?=\')")
        echo "Uninstalling $f"
        adb uninstall $package
    done
    echo "----  DONE UNINSTALLATIONS  ----"
elif [ "$param" == "manual" ]; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    for f in $indir/*; do
        fname=$(basename $f .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo ">>>>>>>>>>>>>>>>>>>>> Running APK : $f <<<<<<<<<<<<<<<<<<<<<<<<"
                { time python -u manual.py $f ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
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
    for f in $indir/*; do
        fname=$(basename $f .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo ">>>>>>>>>>>>>>>>>>>>> Running APK : $f <<<<<<<<<<<<<<<<<<<<<<<<"
                { time python -u delete.py $f dot/$fname.dot ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
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
    for f in $indir/*; do
        fname=$(basename $f .apk)
        if [ ! -f $logdir/$fname.log ] ; then
            while true; do
                nflag="Y"
                echo ">>>>>>>>>>>>>>>>>>>>> Running APK : $f <<<<<<<<<<<<<<<<<<<<<<<<"
                { time python -u login.py $f ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
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
    for f in $indir/*; do
        fname=$(basename $f .apk)
        [ -f $logdir/$fname.log ] && c1=$(grep -c '___TEST-AGAIN-PLS___' $logdir/$fname.log) && c2=$(grep -c '___TERMINATED-BY-SIGNAL___' $logdir/$fname.log)
        if [ ! -f $logdir/$fname.log ] || [ "$c1" != "0" -a "$c2" == "0" ] ; then
            while true; do
                nflag="Y"
                echo ">>>>>>>>>>>>>>>>>>>>> Running APK : $f <<<<<<<<<<<<<<<<<<<<<<<<"
                { time python -u signup.py $f ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
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
