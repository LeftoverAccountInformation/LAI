#!/usr/bin/env bash

if [ ! -f "$1" ]; then
   echo "Usage: ./apk2url.sh <apklist> [auto]"
   exit 1
fi 

if [ "$2" = "auto" ]; then
    python url.py $1 $2
else
    python url.py $1
fi
