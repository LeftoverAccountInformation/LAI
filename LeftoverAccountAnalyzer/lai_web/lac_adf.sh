#!/usr/bin/env bash

# This script does a sanity ADF check on-the-fly for any package on the device without using NLP algorithm
# Pre-requisite: The package must already be installed on the device

patterns=".*delete.*account.*|.*close.*account.*|.*cancel.*account.*"

PACKAGE_NAME=$1

pack=$(adb shell pm list packages -3 -f | dos2unix | grep --color=never $PACKAGE_NAME | sed 's/^package://' | sed "s/=/ \/tmp\//" | sed 's/$/.apk/')
if [ -z "$pack" ]; then
    echo "Package does not exist on the device"
    exit 1
fi
adb pull $pack > /dev/null

adf_check=$(aapt d --values strings /tmp/$PACKAGE_NAME.apk | grep --color=never -Ei "$patterns")

rm /tmp/$PACKAGE_NAME.apk

if [ -z "$adf_check" ]; then
    echo "Not AD"
else
    echo "AD"
fi
