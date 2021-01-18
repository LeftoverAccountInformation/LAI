#!/usr/bin/env bash
export TIMEFORMAT=%R

USAGE="Usage: ./lac_batch.sh [ <gmail> <gpassword> minus | <./minus/laXX> install | <package-file> <app-email> <app-password> clean | pull | uninstall | <./minus/laXX> remove ]"

trap nothing SIGINT SIGPIPE SIGTERM
function nothing() {
    echo "RECEIVED SIGNALS"
}

if [ "$3" == "minus" ]; then
    GMAIL=$1
    GPASS=$2
    packages=$(./minus_operation.sh $GMAIL $GPASS)
    echo "$packages"
    total=$(echo "$packages" | wc -l)
    on_device_count=$(cat on_device | wc -l)
    splitsize="$((55 - $on_device_count))"
    if [[ ! $splitsize -gt 0 ]] ; then
        echo "Your device's storage memory is full, can't do minus operation"
        exit 1
    fi
    echo
    echo "*---------------------------------*"
    echo "  Leftover accounts found: $total  " 
    echo "*---------------------------------*"
    echo 
    echo "...All leftover account packages are saved into ./minus directory..."
    [ -d ./minus ] && rm -rf ./minus
    [ ! -d ./minus ] && mkdir ./minus
    gsplit -dl $splitsize <(echo "$packages") ./minus/la
    exit 0
elif [ "$2" == "install" ]; then
    [ ! -f "$1" ] && echo $USAGE && exit 1
    python store.py "$(cat $1)"
elif [ "$1" == "pull" ]; then
    output=pull
    [ ! -d $output ] && mkdir $output
    non_system_packages=$(adb shell pm list packages -3 -f | sed 's/^package://')
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
    current=$(adb shell pm list packages -3 -f |  dos2unix | grep --color=never -Po "(?<==).*(?=$)" | grep -v appium)
    old=$(cat on_device)
    should_uninstall=$(grep -F -x -v -f <(echo "$old") <(echo "$current"))
    readarray -t should <<<"$should_uninstall"
    for s in "${should[@]}" ; do 
        echo "Uninstalling $s ..."
        adb uninstall "$s"
    done
elif [ "$4" == "clean" ]; then
    [ ! -f $1 ] && echo $USAGE && exit 1
    logdir=$(basename $1)_out
    timedir=$(basename $1)_err
    [ ! -d $logdir ] && mkdir -p $logdir
    [ ! -d $timedir ] && mkdir -p $timedir
    pfile=$(cat $1)
    readarray -t packages <<<"$pfile"
    for p in "${packages[@]}" ; do 
        echo "------ Cleaning $p -------"
        check_adf=$(./lac_adf.sh $p)
        if [ "$check_adf" = "Not AD" ]; then
            echo "Not AD"
        elif [ "$check_adf" = "AD" ]; then
            echo "AD"
            if [ ! -f $logdir/$p.log ] ; then
                while true; do
                    nflag="Y"
                    { time python -u cleanup.py $p $2 $3 ; } 2>$timedir/$p.log | tee $logdir/$p.log
                    while true; do
                        read -p "Press [ a - again | q - quit | n - next | o - output | e - errors ] :: " -n 1 -r
                        echo
                        if [[ "$REPLY" == "a" ]]; then
                            break
                        elif [[ "$REPLY" == "q" ]]; then
                            exit 0
                        elif [[ "$REPLY" == "o" ]]; then
                            echo
                            [ -f $logdir/$p.log ] && cat $logdir/$p.log
                        elif [[ "$REPLY" == "e" ]]; then
                            echo
                            [ -f $timedir/$p.log ] && cat $timedir/$p.log
                        else
                            nflag="N"
                            break
                        fi
                    done
                    if [ "$nflag" == "N" ]; then
                        break
                    fi
                done
            else
                echo "Already cleaned!"
            fi
        else
            if [ ! -f $logdir/$p.log ] ; then
                while true; do
                    nflag="Y"
                    echo "Package $p does not exist on device. Please download to device first"
                    while true; do
                        read -p "Press [ a - again | q - quit | n - next ] :: " -n 1 -r
                        echo
                        if [[ "$REPLY" == "a" ]]; then
                            break
                        elif [[ "$REPLY" == "q" ]]; then
                            exit 0
                        else
                            nflag="N"
                            break
                        fi
                    done
                    if [ "$nflag" == "N" ]; then
                        break
                    fi
                done
            else
                echo "Already cleaned!"
            fi
        fi
    done
elif [ "$2" == "remove" ]; then
    logdir=$(basename $1)_out
    timedir=$(basename $1)_err
    [ -d $logdir ] && rm -rf $logdir
    [ -d $timedir ] &&  rm -rf $timedir
    echo "---- DONE REMOVING DATA ---"
else
    echo "$USAGE"
fi
