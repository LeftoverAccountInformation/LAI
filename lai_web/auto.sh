#!/usr/bin/env bash

######## AUTO SCRIPT ##################################################################################################################

USAGE="USAGE: ./auto.sh <apklist-directory> <server-username> <server-password> <wait-time-in-seconds> collect | <apkdir> apk2web"

#######################################################################################################################################

if [ -d $1 ] && [ "$5" = "collect" ]; then
    for f in $1/*; do
        echo "..... MAKE SURE APPIUM IS RUNNING OR CTRL-C TO ABORT......"
        echo
        echo "===============Using apk data file $f================"
        ./lac_batch.sh $f install 
        echo "Waiting for $4 seconds for the phone to finish downloading..." && sleep $4
        ./lac_batch.sh pull
        ./upload.sh $2 $3 
        ./lac_batch.sh uninstall
        command rm -rf pull
        echo "Waiting for $4 seconds before the next batch... " && sleep $4
    done
    exit 0
fi

if [ -d $1 ] && [ "$2" = "apk2web" ]; then
    for f in $1/*; do
        w=$(./apk2web.sh $f)
        b=$(basename $f)
        echo "$b,$w"
    done
    exit 0
fi


echo "$USAGE"
