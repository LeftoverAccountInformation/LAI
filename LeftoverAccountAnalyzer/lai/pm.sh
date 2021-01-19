#!/usr/bin/env bash

trap nothing SIGINT SIGPIPE SIGTERM
function nothing() {
    echo "RECEIVED SIGNALS - PROGRAM WILL EXIT"
    exit
}

output=pull
[ ! -d $output ] && mkdir $output

if [ "$#" -eq 0 ]; then
    echo "Usage: ./pm.sh [ pull | clean | count | <package-file> search | <package-name> pull ]"
    exit
fi

if [ "$1" == "count" ]; then
    echo "Total number of packages in $output directory: $(command ls $output | wc -l)"
    exit
fi

non_system_packages=$(adb shell pm list packages -3 -f | sed 's/^package://')

if [ "$1" == "pull" ]; then
    while read -r line; do 
        mline=$(echo "$line" | dos2unix | sed "s/=/ $output\//" | sed 's/$/.apk/')
        apkf=$(echo "$mline" | cut -d " " -f 2)
        except="appium"
        if [ ! -f $apkf ]; then
            if ! grep -Eq $except <<< $apkf;  then
                adb pull $mline
            fi
        fi
    done <<< "$non_system_packages"
elif [ "$1" == "uninstall" ]; then
    while read -r line; do 
        mline=$(echo "$line" | dos2unix | sed "s/=/ /")
        pname=$(echo "$mline" | cut -d " " -f 2)
        #except="appium|netflix|hulu|airdroid"
        except="appium"
        if ! grep -Eq $except <<< $pname;  then
            echo "Uninstalling $pname"
            adb uninstall $pname
        fi
    done <<< "$non_system_packages"
elif [ "$1" == "list" ]; then
    echo "$non_system_packages" | cut -d "=" -f 2  # list all third party packages
elif [ "$2" == "search" ]; then
    if [ ! -f "$1" ]; then
        echo "<package-file> does not exist! Please supply a file containing a list of APK package names"
        exit 1
    else
        allpacks=$(cat "$1")
        for line in $allpacks; do
            echo "=========== Searching Google Play Store for APK file with package name: $line =============="
            adb shell am start -a "android.intent.action.VIEW" -d "http://www.google.com/search?q=$line+google+play" --es "com.android.browse.application_id" "com.package.name" > /dev/null
            read -p "Press [ enter - continue | ctrl-c to exit ] :: "
        done
        echo "**** Please WAIT for your phone to FINISH installing BEFORE you start pulling apk files ****"
    fi
elif [ "$2" == "pull" ]; then
    pack=$(adb shell pm list packages -3 -f | dos2unix | grep --color=never $1 | sed 's/^package://' | sed "s/=/ .\//" | sed 's/$/.apk/')
    if [ -z "$pack" ]; then
        echo "Package does not exist on the device"
        exit 1
    fi
    adb pull $pack
fi
