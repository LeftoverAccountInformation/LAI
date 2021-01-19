#!/usr/bin/env bash

# This script returns the website equivalent of an apk by looking into its Manifest file
# $1 is an apk file

manifest=$(aapt list -a $1 | dos2unix)
grep -P -A 1 android:scheme.*http <<< "$manifest" | grep android:host | grep --color=never -Po "(?<=\=\").*?(?=\")" | head -n 1
