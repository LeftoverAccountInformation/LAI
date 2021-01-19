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

function count() {
    echo $(grep --color=never -Eril "$1" --exclude={*err/*} --exclude-dir="\.git" $LOG_DIR | wc -l)
}
echo "signup: $(count "$SIGNUP")"
echo "----------- ALL 1435 APP STATISTICS -------------"
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


LOG_DIR2=/tmp/signup_logs
function count2() {
    echo $(grep --color=never -Eril "$1" --exclude={*err/*} --exclude-dir="\.git" $LOG_DIR2 | wc -l)
}
#[ -d $LOG_DIR2 ] && rm -rf $LOG_DIR2
[ ! -d $LOG_DIR2 ] && mkdir $LOG_DIR2
grep --color=never  -Eril "$EMAIL" "$1" --exclude={*err/*} --exclude-dir="\.git" | xargs -L 1 -r cp -t $LOG_DIR2

echo "----------- ALL email_signup APP STATISTICS -------"
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


LOG_DIR3=/home/hoang/Downloads/chunks1435_grace_period_logs
function count3() {
    echo $(grep --color=never -Eril "$1" --exclude={*err/*} --exclude-dir="\.git" $LOG_DIR3 | wc -l)
}
echo "----------- ALL grace_period APP STATISTICS -------"
echo "email: $(count3 "$EMAIL")"
echo "password: $(count3 "$PASSWORD")"
echo "username: $(count3 "$USERNAME")"
echo "first_name: $(count3 "$FIRSTNAME")"
echo "last_name: $(count3 "$LASTNAME")"
echo "social_network: $(count3 "$SOCIAL")"
echo "age: $(count3 "$AGE")"
echo "phone: $(count3 "$PHONE")"
echo "height: $(count3 "$HEIGHT")"
echo "weight: $(count3 "$WEIGHT")"
echo "gender: $(count3 "$GENDER")"
echo "photo: $(count3 "$PHOTO")"
echo "language: $(count3 "$LANGUAGE")"
echo "location: $(count3 "$LOCATION")"
echo "zipcode: $(count3 "$ZIPCODE")"
echo "banking_info: $(count3 "$BANK")"
echo "goverment_id: $(count3 "$GOVID")"

