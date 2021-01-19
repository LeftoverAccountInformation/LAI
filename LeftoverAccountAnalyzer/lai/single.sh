#!/usr/bin/env bash
export TIMEFORMAT=%R

trap nothing SIGINT SIGPIPE SIGTERM
function nothing() {
    echo "RECEIVED SIGNALS"
}

f=$1
d="$(basename "$(dirname "$1")")"
fname=$(basename $f .apk)

logdir=${d}_out
timedir=${d}_err

if [ "$2" == "download" ]; then
    read -p 'SAIL username: ' username
    scp $username@wh-312-lab001.dyn.wichita.edu:/home/hoang/Downloads/apkdata1435/$f .
    exit
fi

if [ -f $f ]; then
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    echo ">>>>>>>>>>>>>>>>>>>>> Running APK : $f <<<<<<<<<<<<<<<<<<<<<<<<"
    if [ "$2" == "signup" ]; then
        { time python -u signup.py $f ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$2" == "manual" ]; then
        { time python -u manual.py $f ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$2" == "delete" ]; then
        { time python -u delete.py $f dot/$fname.dot ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$2" == "login" ]; then
        { time python -u login.py $f dot/$fname.dot ; } 2>$timedir/$fname.log | tee $logdir/$fname.log
    elif [ "$2" == "install" ]; then
        adb install $f
    elif [ "$2" == "uninstall" ]; then
        package=$(aapt dump badging $f | grep --color=never -Po "(?<=package:\ name=\').*?(?=\')")
        adb uninstall $package
    elif [ "$2" == "launch" ]; then
        package=$(aapt dump badging $f | grep --color=never -Po "(?<=package:\ name=\').*?(?=\')")
        adb shell monkey -p $package 1
    else 
        echo "You are missing 2nd parameter"
    fi
fi

if [ "$2" == "search" ]; then
    echo "=========== Searching Google Play Store for APK file with package name: $1 =============="
    adb shell am start -a "android.intent.action.VIEW" -d "http://www.google.com/search?q=$1+google+play" --es "com.android.browse.application_id" "com.package.name" > /dev/null
fi
