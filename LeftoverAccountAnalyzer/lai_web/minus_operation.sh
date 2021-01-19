#!/usr/bin/env bash

if [ "$#" -ne 2 ]; then
    echo "Usage: ./minus_operation.sh <gmail address> <gmail password>"
    exit 1
fi

my_apps_html=$(python my_apps.py $1 $2)
my_apps=$(grep --color=never -oP "(?<=/store/apps/details\?id=).*?(?=\")" <<< $my_apps_html | awk '!NF || !seen[$0]++')
echo "$my_apps" > ./my_apps

device_apps=$(adb shell pm list packages -3 -f | dos2unix | grep --color=never -v appium | cut -d "=" -f 2)
echo "$device_apps" > ./on_device

uncleaned_apps=$(grep -F -x -v -f <(echo "$device_apps") <(echo "$my_apps"))

echo "$uncleaned_apps"
