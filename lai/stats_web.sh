#!/usr/bin/env bash

WEBDATA_DIR="$1"
SIGNUP_LIST=$(cat /home/hoang/Downloads/web_signup_1435.txt)
GRACE_PERIOD_LIST=$(cat /home/hoang/Downloads/web_grace_period_1435.txt)

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

function count() {
    co=0
    for i in $SIGNUP_LIST; do
        if grep -Eriqs --include="*.*.txt" "$1" $WEBDATA_DIR/${i%.apk}; then
            co=$((co+1))
        fi
    done
    echo $co
}

echo "signup: $(wc -l <<<$SIGNUP_LIST)"
echo "----------- ALL WEB (SIGNUP) APP STATISTICS -------------"
echo "email: $(count "$EMAIL")"
echo "password: $(count "$PASSWORD")"
echo "username: $(count "$USERNAME")"
echo "first_name: $(count "$FIRSTNAME")"
echo "last_name: $(count "$LASTNAME")"
echo "social_network: $(count "$SOCIAL")"
echo "age: $(count "$AGE")"
echo "phone: $(count "$PHONE")"
echo "height: $(count "$HEIGHT")"
echo "weight: $(count "$WEIGHT")"
echo "gender: $(count "$GENDER")"
echo "photo: $(count "$PHOTO")"
echo "language: $(count "$LANGUAGE")"
echo "location: $(count "$LOCATION")"
echo "zipcode: $(count "$ZIPCODE")"
echo "banking_info: $(count "$BANK")"
echo "goverment_id: $(count "$GOVID")"

function count2() {
    co=0
    for i in $GRACE_PERIOD_LIST; do
        if grep -Eriqs --include="*.*.txt" "$1" $WEBDATA_DIR/${i%.apk}; then
            co=$((co+1))
        fi
    done
    echo $co
}

echo
echo "graceperiod: $(wc -l <<<$GRACE_PERIOD_LIST)"
echo "----------- ALL WEB (GRACE PERIOD) APP STATISTICS -------------"
echo "email: $(count2 "$EMAIL")"
echo "password: $(count2 "$PASSWORD")"
echo "username: $(count2 "$USERNAME")"
echo "first_name: $(count2 "$FIRSTNAME")"
echo "last_name: $(count2 "$LASTNAME")"
echo "social_network: $(count2 "$SOCIAL")"
echo "age: $(count2 "$AGE")"
echo "phone: $(count2 "$PHONE")"
echo "height: $(count2 "$HEIGHT")"
echo "weight: $(count2 "$WEIGHT")"
echo "gender: $(count2 "$GENDER")"
echo "photo: $(count2 "$PHOTO")"
echo "language: $(count2 "$LANGUAGE")"
echo "location: $(count2 "$LOCATION")"
echo "zipcode: $(count2 "$ZIPCODE")"
echo "banking_info: $(count2 "$BANK")"
echo "goverment_id: $(count2 "$GOVID")"
