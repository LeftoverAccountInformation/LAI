#!/usr/bin/env bash

LOG_DIR="$1"

SIGNUP="sign.?up| register |facebook|twitter|google|@gmail|@yahoo|user.?name|password|login|logon|sign.?in|e.?mail|password|create.?account|phone.?number|mobile.?number"
EMAIL="e.?mail|@gmail|@yahoo|@outlook|@microsoft|@facebook"
PASSWORD="password|pin.?number| OTP|verification"
USERNAME="user.?name"
FIRSTNAME="first.?name|given.?name|full.?name"
LASTNAME="last.?name|family.?name|surname|full.?name"
SOCIAL="facebook|twitter|weibo"
AGE=" age|year.?.?old|how.?old.?are.?you|birth.?day|birth.?date|brith.?year|date.?of.?birth|dob.?month|dob.?day|dob.?year"
PHONE="phone.?number|mobile|cellphone|cell.?number|home.?phone|wireless.?number| SIM"
HEIGHT="height|feet|inch|ft\."
WEIGHT="weight|kgs|pound|lb\."
GENDER="gender|male|female|mr\. |mrs\. |ms\. |sex|boy|girl"
PHOTO="photos?|profile.?picture"
LANGUAGE="language"
LOCATION="location|gps|city|street|ethnicity|region|country|address|apartment"
ZIPCODE="zipcode|zip.?code|67226|postal.?code"
BANK="credit.?card|credit.?number|bank.?information|paypal|debit.?card|bank.?account| bill|account.?number| cvv|card.?number|name.?on.?card|payment.?method|billing.?details|name.?on.?card|expiration.?date| e-bill"
GOVID="social.?security|ssn.?number|driver.?license|dl.?number|license.?number|vin.?number|account.?id|pin.?number|employee.?id|worker.?id|associate.?id|government.?id"

declare -a categories=("$SIGNUP" "$EMAIL" "$PASSWORD" "$USERNAME" "$FIRSTNAME" "$LASTNAME" "$SOCIAL" "$AGE" "$PHONE" "$HEIGHT" "$WEIGHT" "$GENDER" "$PHOTO" "$LANGUAGE" "$LOCATION" "$ZIPCODE" "$BANK" "$GOVID")

function list_packages() {
    grep --color=never -Eril "$1" --exclude={*err/*} --exclude-dir="\.git" $LOG_DIR
}

packages=$(cat packages.txt)

for p in $packages; do
    logfile=$(find $1/*out/$p.log)
    status="$p.apk"
    if [ -f "$logfile" ]; then
        for c in "${categories[@]}"; do
            if grep -Erilq "$c" $logfile; then
                status+=",Y"
            else
                status+=",N"
            fi
        done
    else
        for c in "${categories[@]}"; do
            status+=",N"
        done
    fi
    echo "$status"
done
