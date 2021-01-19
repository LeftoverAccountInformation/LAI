#!/usr/bin/env bash

# This script will upload all apk files in pull directory 
# to the lab server at a specific location 
# User must provide his/her username and password to login the server

username=$1
password=$2
target=$username@wh-312-lab001.dyn.wichita.edu:/home/hoang/Downloads/apkdata1000

[ ! -d pull ] && echo "pull directory does not exist" && exit 1

sshpass -p $password scp -rv pull/* $target
