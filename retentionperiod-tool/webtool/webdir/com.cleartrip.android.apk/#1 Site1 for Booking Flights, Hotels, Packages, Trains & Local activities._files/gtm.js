
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"572",
  
  "macros":[{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Travel-Dates"
    },{
      "function":"__v",
      "vtp_name":"From-Location",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_name":"To-Location",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a;return a=\"",["escape",["macro",0],7],"-",["escape",["macro",1],7],"-",["escape",["macro",2],7],"\"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Travel-Dates"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Checkin-Date"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",4],8,16],";a=a.split(\"|\").shift();var b=a.split(\"-\");return\"00\"==b[1]?",["escape",["macro",5],8,16],":a=a.split(\"\/\").reverse().join(\"-\")})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Checkout-Date"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",4],8,16],";a=a.split(\"|\").pop();var b=a.split(\"-\");return\"00\"==b[1]?",["escape",["macro",7],8,16],":a=a.split(\"\/\").reverse().join(\"-\")})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"People-No"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",9],8,16],";return a=a.split(\"|\").shift()})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Flight-Return-OneWay"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",11],8,16],";return a=\"Roundtrip\"==a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return location.host})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return location.search})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=window.location.pathname;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=document.querySelector(\".menuItem.listMenuContainer.currencyMenuContainer .listMenuLink.currencyLink span\").getAttribute(\"class\");return a})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Flight-Return-OneWay"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"Roundtrip\"==",["escape",["macro",17],8,16],"){var a=document.querySelector(\".truncate\");a=a.textContent.split(\"\\u21c4\")[1]}else a=document.querySelector(\".truncate\"),a=a.textContent.split(\"\\u2192\")[1];return a.replace(\/\\s+\/g,\"\")})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"Roundtrip\"==",["escape",["macro",17],8,16],"){var a=document.querySelector(\".truncate\");a=a.textContent.split(\"\\u21c4\")[0]}else a=document.querySelector(\".truncate\"),a=a.textContent.split(\"\\u2192\")[0];return a.replace(\/\\s+\/g,\"\")})();"]
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__e"
    },{
      "function":"__u",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Product"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"source_affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"campaign_affiliatefirstsource"
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Source-Affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Infant-Count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Adult-Count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Journey-Type"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Currency"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Total-Passengers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Booking-Price"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Child-Count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Booking-Class"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Segment-X-Flight-Number"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"First-Departure-Date"
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-107683201-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Transaction-ID"
    },{
      "function":"__v",
      "vtp_name":"Trip_ID",
      "vtp_dataLayerVersion":2
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-105636210-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-8292447-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Final-Departure-Date"
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=",["escape",["macro",13],8,16],",c=",["escape",["macro",15],8,16],",a=\"\";\"www.cleartrip.com\"==b?a=\"india\":\"www.cleartrip.ae\"==b?a=\"uae\":\"om.cleartrip.com\"==b?a=\"oman\":\"qa.cleartrip.com\"==b?a=\"qatar\":\"bh.cleartrip.com\"==b?a=\"bahrain\":\"kw.cleartrip.com\"==b?a=\"kuwait\":\"www.cleartrip.sa\"==b?a=\"\/ar\"==c.slice(0,3)?\"ar\":\"en\":\"me.cleartrip.com\"==b\u0026\u0026(a=\"us\");return a})();"]
    },{
      "function":"__v",
      "vtp_name":"gtm.triggers",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":true,
      "vtp_defaultValue":""
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"google_tag_params"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Cost"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Domain"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Source-Metafirstsource"
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Payment-Mode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"term_affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Hotel-ID"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Hotel-Name"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Adult-Travel"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Rooms-No"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Trip_ID"
    },{
      "function":"__v",
      "vtp_name":"New-Customer",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Base-Fare"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"People-No"
    },{
      "function":"__cid"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Coupon-Code"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Travel-Type"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Room_nights"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Discount"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Category"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Payment-Type"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Coupon"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Segment-X-Airline"
    },{
      "function":"__u",
      "vtp_component":"QUERY",
      "vtp_queryKey":"utm_source",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"source_Meta"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Child-Travel"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Hotel-Rating"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Tripadvisor-Rating"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Device-Type"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"From-Location"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"To-Location"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Term-Affiliatefirstsource"
    },{
      "function":"__f"
    },{
      "function":"__aev",
      "vtp_varType":"ELEMENT"
    },{
      "function":"__aev",
      "vtp_varType":"CLASSES"
    },{
      "function":"__aev",
      "vtp_varType":"ID"
    },{
      "function":"__aev",
      "vtp_varType":"TARGET"
    },{
      "function":"__aev",
      "vtp_varType":"TEXT"
    },{
      "function":"__aev",
      "vtp_varType":"URL"
    },{
      "function":"__aev",
      "vtp_varType":"HISTORY_NEW_URL_FRAGMENT"
    },{
      "function":"__aev",
      "vtp_varType":"HISTORY_OLD_URL_FRAGMENT"
    },{
      "function":"__aev",
      "vtp_varType":"HISTORY_NEW_STATE"
    },{
      "function":"__aev",
      "vtp_varType":"HISTORY_OLD_STATE"
    },{
      "function":"__aev",
      "vtp_varType":"HISTORY_CHANGE_SOURCE"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Date-Search"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Day-Search"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"AirLine-Code"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Device"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Vehicle-ID"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Reserved1"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Reserved2"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"medium_affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"uid_affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Cash_Burn"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"D+X"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"RPS"
    },{
      "function":"__r"
    },{
      "function":"__u",
      "vtp_component":"QUERY",
      "vtp_queryKey":"refid",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__k",
      "vtp_decodeCookie":true,
      "vtp_name":"taclickid"
    },{
      "function":"__k",
      "vtp_decodeCookie":true,
      "vtp_name":"userid"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Infant-Travel"
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-106323936-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Trip_ID"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Cost"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"source_affiliatefirstsourceMeta"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",14],8,16],";queryArr=a.replace(\"?\",\"\").split(\"\\x26\");queryParams=[];a=0;for(var c=queryArr.length;a\u003Cc;a++){var b=queryArr[a].split(\"\\x3d\");queryParams[b[0]]=b[1]}queryParams.depart_date=queryParams.depart_date.split(\"\/\");queryParams.depart_date=queryParams.depart_date[2]+\"-\"+queryParams.depart_date[1]+\"-\"+queryParams.depart_date[0];void 0!==queryParams.return_date?(queryParams.return_date=queryParams.return_date.split(\"\/\"),queryParams.return_date=queryParams.return_date[2]+\n\"-\"+queryParams.return_date[1]+\"-\"+queryParams.return_date[0]):queryParams.return_date=queryParams.depart_date;return queryParams})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"ar\"==",["escape",["macro",46],8,16],"?\"ar-\":\"\"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"totalAmount"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"BaseRate"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Country"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Language"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Booking-Date"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Full-Itinerary"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Tax"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Wallet-Credit"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Convenience-Fee"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Insurance-Product"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Insurance-Cost"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Segment-Count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Itinerary-ID"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Campaign-Affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Medium-Affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Uid-Affiliatefirstsource"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Cust-Email-ID"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Segment-X-Departure-Date"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"Segment-X-Arrival-Date"
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_name":"gtm.element",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementClasses",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementId",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.newUrlFragment",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.oldUrlFragment",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.newHistoryState",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.oldHistoryState",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.historyChangeSource",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.visibleRatio",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.visibleTime",
      "vtp_dataLayerVersion":1
    }],
  "tags":[{
      "function":"__ua",
      "priority":1,
      "setup_tags":["list",["tag",157,0]],
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",42],
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "tag_id":210
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":42
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":49
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":50
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":52
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":53
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":66
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"995874483",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":67
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":71
    },{
      "function":"__paused",
      "vtp_originalTagType":"sp",
      "tag_id":72
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":73
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":97
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":98
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":113
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":114
    },{
      "function":"__paused",
      "vtp_originalTagType":"sp",
      "tag_id":115
    },{
      "function":"__paused",
      "vtp_originalTagType":"sp",
      "tag_id":127
    },{
      "function":"__paused",
      "vtp_originalTagType":"sp",
      "tag_id":128
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":137
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_conversionId":"865660202",
      "vtp_conversionLabel":"fsT6CLDlnXEQqtrjnAM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":161
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":162
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":163
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":169
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":173
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":174
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"1002172652",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":181
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"1002197040",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":182
    },{
      "function":"__gfct",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_passengersInfantInSeat":["macro",29],
      "vtp_passengersAdult":["macro",30],
      "vtp_tripType":["macro",31],
      "vtp_enableConversionLinker":true,
      "vtp_currency":["macro",32],
      "vtp_passengersTotal":["macro",33],
      "vtp_partnerId":"304",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_value":["macro",34],
      "vtp_passengersChild":["macro",35],
      "vtp_items":["template",["macro",36],["macro",37],["macro",1],["macro",2],["macro",38]],
      "tag_id":185
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":186
    },{
      "function":"__ua",
      "setup_tags":["list",["tag",30,0]],
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",39],
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "tag_id":194
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":195
    },{
      "function":"__baut",
      "once_per_event":true,
      "vtp_tagId":"5819586",
      "vtp_uetqName":"uetq",
      "vtp_eventType":"PAGE_LOAD",
      "tag_id":198
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"970697185",
      "vtp_conversionLabel":"aEAGCNC36XkQ4dPuzgM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":203
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",41],
      "vtp_conversionValue":"1.8",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"970697185",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"jvI6CISK5nkQ4dPuzgM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":204
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0.06",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"970697185",
      "vtp_conversionLabel":"WhmOCNSI0nkQ4dPuzgM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":205
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":207
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":208
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":209
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",43],
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "tag_id":212
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":213
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":214
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":215
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":216
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":217
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":218
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_customParams":["list",["map","key","flight_originid","value",["macro",1]],["map","key","flight_destid","value",["macro",2]],["map","key","flight_startdate","value",["macro",38]],["map","key","flight_enddate","value",["macro",44]]],
      "vtp_conversionId":"1067486003",
      "vtp_customParamsFormat":"USER_SPECIFIED",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":223
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"964964820",
      "vtp_conversionLabel":"niQzCI28mnwQ1OOQzAM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":224
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"1.8",
      "vtp_orderId":["macro",41],
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"964964820",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"X0q5CI-7mnwQ1OOQzAM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":225
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0.06",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"964964820",
      "vtp_conversionLabel":"JclsCNifn3wQ1OOQzAM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":226
    },{
      "function":"__paused",
      "vtp_originalTagType":"sp",
      "tag_id":227
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":234
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":235
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":236
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":237
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":238
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":239
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":240
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":241
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":242
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":243
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":245
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":246
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":247
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":248
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":252
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":253
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":254
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":255
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":256
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":257
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":259
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"992967773",
      "vtp_conversionLabel":"ctECCJTNj4QBEN34vdkD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":260
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"3.5",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"992967773",
      "vtp_conversionLabel":"K34UCPqOiIQBEN34vdkD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":261
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"1.8",
      "vtp_orderId":["macro",41],
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"992967773",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"EsoUCN3dj4QBEN34vdkD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":262
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_dataLayerVariable":["macro",49],
      "vtp_conversionId":"1067486003",
      "vtp_customParamsFormat":"DATA_LAYER",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":263
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":264
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":265
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":267
    },{
      "function":"__awct",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",41],
      "vtp_conversionValue":["macro",50],
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"994992302",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"m_ifCKrW9wEQrsG52gM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":268
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0.06",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"992967773",
      "vtp_conversionLabel":"AbiHCNblj4QBEN34vdkD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":269
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0.9",
      "vtp_orderId":["macro",41],
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"992967773",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"GoEUCM3fj4QBEN34vdkD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":270
    },{
      "function":"__baut",
      "once_per_event":true,
      "vtp_tagId":"5188305",
      "vtp_uetqName":"uetq",
      "vtp_eventType":"PAGE_LOAD",
      "tag_id":271
    },{
      "function":"__paused",
      "vtp_originalTagType":"baut",
      "tag_id":272
    },{
      "function":"__hjtc",
      "once_per_event":true,
      "vtp_hotjar_site_id":"332967",
      "tag_id":273
    },{
      "function":"__paused",
      "vtp_originalTagType":"hjtc",
      "tag_id":274
    },{
      "function":"__paused",
      "vtp_originalTagType":"hjtc",
      "tag_id":275
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":277
    },{
      "function":"__awct",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1067486003",
      "vtp_conversionLabel":"C7i7CJmNxAMQs5aC_QM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":282
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":283
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":284
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"990047230",
      "vtp_conversionLabel":"m9IoCOrcpAIQ_teL2AM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":285
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1067486003",
      "vtp_conversionLabel":"coJICI-kVhCzloL9Aw",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":286
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1002294477",
      "vtp_conversionLabel":"n7YMCOPwlwMQzZn33QM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":287
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"986824040",
      "vtp_conversionLabel":"EI14CIDMrQYQ6PrG1gM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":288
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"990047230",
      "vtp_conversionLabel":"9uCMCOKvqwcQ_teL2AM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":289
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"1",
      "vtp_orderId":["macro",41],
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"881711088",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"txFgCOvcyIkBEPCvt6QD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":292
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":293
    },{
      "function":"__gclidw",
      "once_per_event":true,
      "vtp_enableCrossDomain":false,
      "vtp_enableCookieOverrides":false,
      "vtp_enableCrossDomainFeature":true,
      "vtp_enableCookieUpdateFeature":false,
      "tag_id":310
    },{
      "function":"__paused",
      "vtp_originalTagType":"awct",
      "tag_id":313
    },{
      "function":"__awct",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"986824040",
      "vtp_conversionLabel":"WSyqCLDGrQYQ6PrG1gM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":314
    },{
      "function":"__awct",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1002294477",
      "vtp_conversionLabel":"MwuxCOvvlwMQzZn33QM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":315
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"1000705187",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":317
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"1005030997",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":318
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"1019108746",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":319
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"1001005067",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":320
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":321
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":322
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"865660202",
      "vtp_conversionLabel":"DKtACI6CrpEBEKra45wD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":325
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":327
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"3.5",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"828535964",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"ZovnCKX-5IUBEJzpiYsD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":328
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"828535964",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"FrDcCLC684UBEJzpiYsD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":329
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_customParams":["list",["map","key","flight_destid","value",["macro",2]],["map","key","flight_originid","value",["macro",1]],["map","key","flight_enddate","value",["macro",44]],["map","key","flight_startdate","value",["macro",38]]],
      "vtp_conversionId":"828535964",
      "vtp_customParamsFormat":"USER_SPECIFIED",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":330
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"777229090",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"pF7lCIGKk5ABEKKmzvIC",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":331
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_customParams":["list",["map","key","flight_destid","value",["macro",2]],["map","key","flight_originid","value",["macro",1]],["map","key","flight_enddate","value",["macro",44]],["map","key","flight_startdate","value",["macro",38]]],
      "vtp_conversionId":"777229090",
      "vtp_customParamsFormat":"USER_SPECIFIED",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":332
    },{
      "function":"__paused",
      "vtp_originalTagType":"hjtc",
      "tag_id":334
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_customParams":["list",["map","key","flight_destid","value",["macro",2]],["map","key","flight_originid","value",["macro",1]],["map","key","flight_enddate","value",["macro",44]],["map","key","flight_startdate","value",["macro",38]]],
      "vtp_conversionId":"828535991",
      "vtp_customParamsFormat":"USER_SPECIFIED",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":335
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"1",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"828535991",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"tpsLCMa484UBELfpiYsD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":336
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_orderId":["macro",40],
      "vtp_conversionValue":"3.5",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"828535991",
      "vtp_currencyCode":["macro",32],
      "vtp_conversionLabel":"ipFbCKXx84UBELfpiYsD",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":337
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"994992302",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":339
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":340
    },{
      "function":"__paused",
      "vtp_originalTagType":"hjtc",
      "tag_id":341
    },{
      "function":"__hjtc",
      "once_per_event":true,
      "vtp_hotjar_site_id":"332967",
      "tag_id":342
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":343
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":344
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":345
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":346
    },{
      "function":"__hjtc",
      "once_per_event":true,
      "vtp_hotjar_site_id":"332967",
      "tag_id":353
    },{
      "function":"__hjtc",
      "once_per_event":true,
      "vtp_hotjar_site_id":"332967",
      "tag_id":354
    },{
      "function":"__qpx",
      "once_per_event":true,
      "vtp_pixel_id":"3c210ba58c1e4936b4aeffe003375635",
      "vtp_pixel_event":"Purchase",
      "tag_id":356
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"995874483",
      "vtp_conversionLabel":"iizSCJKFg2sQs63v2gM",
      "vtp_url":["macro",23],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":357
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":359
    },{
      "function":"__sp",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableDynamicRemarketing":false,
      "vtp_dataLayerVariable":["macro",30],
      "vtp_conversionId":"994992302",
      "vtp_customParamsFormat":"DATA_LAYER",
      "vtp_conversionLabel":"m_ifCKrW9wEQrsG52gM",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":362
    },{
      "function":"__sp",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableDynamicRemarketing":false,
      "vtp_conversionId":"739493889",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",23],
      "tag_id":363
    },{
      "function":"__paused",
      "vtp_originalTagType":"hjtc",
      "tag_id":364
    },{
      "function":"__evl",
      "vtp_elementId":"Result",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"MANY_PER_ELEMENT",
      "vtp_selectorType":"ID",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"670932_490",
      "tag_id":365
    },{
      "function":"__tl",
      "vtp_eventName":"gtm.timer",
      "vtp_interval":"10000",
      "vtp_limit":"1",
      "vtp_uniqueTriggerId":"670932_510",
      "tag_id":366
    },{
      "function":"__cl",
      "tag_id":367
    },{
      "function":"__cl",
      "tag_id":368
    },{
      "function":"__cl",
      "tag_id":369
    },{
      "function":"__hl",
      "tag_id":370
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cimg height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"https:\/\/t.skyscnr.com\/hotels\/track\/booking?fclid=",["escape",["macro",55],12],"\u0026amp;\npartner=h_cr\u0026amp;order_id=",["escape",["macro",41],12],"\u0026amp;hotel_id=",["escape",["macro",56],12],"\u0026amp;hotel_name=",["escape",["macro",57],12],"\u0026amp;hot\nel_city=",["escape",["macro",2],12],"\u0026amp;hotel_country=India\u0026amp;checkin=",["escape",["macro",5],12],"\u0026amp;checkout=",["escape",["macro",7],12],"\u0026amp;guests=",["escape",["macro",58],12],"\u0026amp;rooms=",["escape",["macro",59],12],"\u0026amp;amount=",["escape",["macro",50],12],"\u0026amp;currency=",["escape",["macro",32],12],"\u0026amp;tld=cleartrip.com\"\u003E\n\n"],
      "vtp_supportDocumentWrite":true,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "vtp_usePostscribe":true,
      "tag_id":95
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar _wego=_wego||[];_wego.push([\"conversionId\",\"81f137d4-405d-4905-b2aa-d4147e7fe863\"],[\"transactionId\",\"",["escape",["macro",60],7],"\"],[\"currencyCode\",\"",["escape",["macro",32],7],"\"],[\"commission\",\"1200\"],[\"totalBookingValue\",\"",["escape",["macro",50],7],"\"]);(function(){var b=document.getElementsByTagName(\"script\")[0],a=document.createElement(\"script\");a.type=\"text\/javascript\";a.src=\"https:\/\/s.wego.com\/conversion.js\";b.parentNode.insertBefore(a,b)})();\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":110
    },{
      "function":"__html",
      "priority":0,
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/s.adx.io\/dxjet.js\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Efunction _dx_createCookie(g,h,f){if(f){var e=new Date;e.setTime(e.getTime()+864E5*f);f=\"; expires\\x3d\"+e.toGMTString()}else f=\"\";document.cookie=g+\"\\x3d\"+h+f+\";domain\\x3d\"+window.location.hostname+\";path\\x3d\/\"}function _dx_readCookie(g){g+=\"\\x3d\";for(var h=document.cookie.split(\";\"),f=0;f\u003Ch.length;f++){for(var e=h[f];\" \"===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(g))return e.substring(g.length,e.length)}return null}\ntry{var _adx_tmp_prod=\"\",_adx_tmp_cust=\"\",_adx_tmp_obj={xt:\"conversion\",xtid:\"",["escape",["macro",41],7],"\",xcv:\"",["escape",["macro",34],7],"\",xcc:\"",["escape",["macro",32],7],"\"};_adx_tmp_prod=\"",["escape",["macro",24],7],"\";_adx_tmp_cust=\"",["escape",["macro",61],7],"\";_adx_tmp_prod.match(\/local\/ig)?_adx_tmp_obj.xcart=\"",["escape",["macro",62],7],";",["escape",["macro",63],7],";",["escape",["macro",64],7],";",["escape",["macro",24],7],";",["escape",["macro",54],7],";",["escape",["macro",65],7],";",["escape",["macro",2],7],";",["escape",["macro",66],7],";;\"+_adx_tmp_cust:_adx_tmp_prod.match(\/hotel\/ig)?\n_adx_tmp_obj.xcart=\"",["escape",["macro",62],7],";",["escape",["macro",67],7],";",["escape",["macro",64],7],";",["escape",["macro",24],7],";",["escape",["macro",54],7],";",["escape",["macro",65],7],";",["escape",["macro",2],7],";",["escape",["macro",56],7],";;\"+_adx_tmp_cust:_adx_tmp_obj.xcart=\"",["escape",["macro",62],7],";",["escape",["macro",68],7],";",["escape",["macro",64],7],";",["escape",["macro",24],7]," - ",["escape",["macro",69],7],";",["escape",["macro",70],7],";",["escape",["macro",71],7],";",["escape",["macro",1],7]," - ",["escape",["macro",2],7],";",["escape",["macro",72],7],";",["escape",["macro",31],7],";\"+_adx_tmp_cust;\n_adx_tmp_obj.xcart=_adx_tmp_obj.xcart.replace(\/\\|\/g,\"-\");_adx_tmp_obj.xnojs=\"13\";_adx_tmp_obj.xb=\"35BTH1357\";_adx_tmp_obj.xtid\u0026\u00262\u003C_adx_tmp_obj.xtid.length\u0026\u0026(_dx_readCookie(_adx_tmp_obj.xb+\"-\"+_adx_tmp_obj.xtid)?_adx_tmp_obj.cm=\"0\":_dx_createCookie(_adx_tmp_obj.xb+\"-\"+_adx_tmp_obj.xtid,\"1\",90));Adx.track_conv(_adx_tmp_obj)}catch(g){if(Adx.track_conv({xb:\"35BTH1357\",xtid:\"",["escape",["macro",40],7],"\",xcc:\"",["escape",["macro",32],7],"\",xcv:\"",["escape",["macro",34],7],"\",xnojs:\"13.x\",xcmail:encodeURIComponent(g.message),\nxcart:\";;",["escape",["macro",64],7],"\"}),window.JSON){var a=\"https:\"==document.location.protocol?\"https:\/\/\":\"http:\/\/\",b=a+\"d.adx.io\/events?xb\\x3d35BTH1357\\x26xevent\\x3dxerror\\x26xtg\\x3dxconversions\\x26xv\\x3d13.x\\x26message\\x3d\",c=b+encodeURIComponent(g.message+\" | \"+JSON.stringify(_adx_tmp_obj));c+=\"\\x26rnd\\x3d\"+1E17*Math.random();var d=new Image;d.src=c}};\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":112
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.ixiTransactionTracker=function(a){u=\"https:\/\/www.ixigo.com\/ixi-api\/tracker\/updateConversion\/\"+a+\"?transactionId\\x3d",["escape",["macro",60],7],"\\x26saleValue\\x3d",["escape",["macro",50],7],"\";a=\"\\x3cimg style\\x3d'top:-999999px;left:-999999px;position:absolute;' src\\x3d'\"+u+\"' \/\\x3e\";var b=document.createElement(\"div\");b.innerHTML=a;document.body.appendChild(b)};\u003C\/script\u003E\n\u003Cscript data-gtmsrc=\"https:\/\/www.ixigo.com\/ixi-api\/tracker\/track270\" id=\"tracker\" type=\"text\/gtmscript\"\u003E\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":133
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"715010911907458\");fbq(\"track\",\"PageView\");\u003C\/script\u003E\n\u003Cnoscript\u003E\u003Cimg height=\"1\" width=\"1\" style=\"display:none\" src=\"https:\/\/www.facebook.com\/tr?id=715010911907458\u0026amp;ev=PageView\u0026amp;noscript=1\"\u003E\u003C\/noscript\u003E\n\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":136
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(d,e,g,f,h,b,a,c){d.taq||(b=d.taq=function(){b.queue.push(arguments)},b.queue=[],\/bot|googlebot|crawler|spider|robot|crawling\/i.test(g.userAgent)||(a=e.createElement(f),a.async=!0,a.src=h,c=e.getElementsByTagName(f)[0],c.parentNode.insertBefore(a,c)))})(window,document,navigator,\"script\",\"\/\/static.tacdn.com\/js3\/taevents-c.js\");taq(\"init\",\"470705579\");taq(\"track\",\"PAGEVIEW\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":138
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/track.in.omgpm.com\/195797\/transaction.asp?\nAPPID=",["escape",["macro",41],12],"\u0026amp;MID=195797\u0026amp;PID=8165\u0026amp;status=value\u0026amp;EX1=",["escape",["macro",66],12],"\"\u003E\u003C\/script\u003E\n\n\u003Cnoscript\u003E\u003Cimg src=\"https:\/\/track.in.omgpm.com\/apptag.asp?APPID=",["escape",["macro",41],12],"\u0026amp;MID=195797\u0026amp;PID=8165\u0026amp;status= value\u0026amp;EX1=",["escape",["macro",66],12],"\" border=\"0\" height=\"1\" width=\"1\"\u003E\u003C\/noscript\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":156
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(d,e,g,f,h,b,a,c){d.taq||(b=d.taq=function(){b.queue.push(arguments)},b.queue=[],\/bot|googlebot|crawler|spider|robot|crawling\/i.test(g.userAgent)||(a=e.createElement(f),a.async=!0,a.src=h,c=e.getElementsByTagName(f)[0],c.parentNode.insertBefore(a,c)))})(window,document,navigator,\"script\",\"\/\/static.tacdn.com\/js3\/taevents-c.js\");taq(\"init\",\"470705579\");var gbv=",["escape",["macro",50],8,16],";gbv=100*gbv.replace(\",\",\"\");\ntaq(\"track\",\"BOOKING_CONFIRMATION\",{partner:\"ClearTrip\",refid:\"",["escape",["macro",55],7],"\",gbv:gbv,currency:\"",["escape",["macro",32],7],"\",order_id:\"",["escape",["macro",41],7],"\",travel_start_date:\"",["escape",["macro",5],7],"\",travel_end_date:\"",["escape",["macro",7],7],"\"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":170
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cimg height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"https:\/\/secde.trivago.com\/page_check.php?pagetype=track\u0026amp;ref=856\u0026amp;hotel=",["escape",["macro",56],12],"\u0026amp;arrival=",["escape",["macro",5],12],"\u0026amp;departure=",["escape",["macro",7],12],"\u0026amp;date_format=Y-m-d\u0026amp;currency=",["escape",["macro",32],12],"\u0026amp;booking_id=",["escape",["macro",41],12],"\u0026amp;volume=",["escape",["macro",50],12],"\"\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":171
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"294579701007487\");\nfbq(\"track\",\"PageView\",{content_type:\"hotel\",content_id:\"",["escape",["macro",56],7],"\",city:\"",["escape",["macro",2],7],"\",checkin_date:\"",["escape",["macro",5],7],"\",checkout_date:\"",["escape",["macro",7],7],"\",num_adults:\"",["escape",["macro",58],7],"\",num_children:\"",["escape",["macro",75],7],"\",purchase_value:\"",["escape",["macro",50],7],"\",purchase_currency:\"",["escape",["macro",32],7],"\",hotel_score:\"",["escape",["macro",76],7],"\",user_score:\"",["escape",["macro",77],7],"\"});\u003C\/script\u003E\n\u003Cnoscript\u003E\u003Cimg height=\"1\" width=\"1\" style=\"display:none\" src=\"https:\/\/www.facebook.com\/tr?id=294579701007487\u0026amp;ev=PageView\u0026amp;noscript=1\"\u003E\u003C\/noscript\u003E\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":172
    },{
      "function":"__html",
      "once_per_load":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(d,e,f,a,b,c){d.twq||(a=d.twq=function(){a.exe?a.exe.apply(a,arguments):a.queue.push(arguments)},a.version=\"1.1\",a.queue=[],b=e.createElement(f),b.async=!0,b.src=\"\/\/static.ads-twitter.com\/uwt.js\",c=e.getElementsByTagName(f)[0],c.parentNode.insertBefore(b,c))}(window,document,\"script\");twq(\"init\",\"nxuvp\");twq(\"track\",\"PageView\");\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":175
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"294579701007487\");fbq(\"track\",\"PageView\",{content_type:\"hotel\",content_id:\"",["escape",["macro",56],7],"\",purchase_value:\"0\",purchase_currency:\"",["escape",["macro",32],7],"\"});\u003C\/script\u003E\n\u003Cnoscript\u003E\u003Cimg height=\"1\" width=\"1\" style=\"display:none\" src=\"https:\/\/www.facebook.com\/tr?id=294579701007487\u0026amp;ev=PageView\u0026amp;noscript=1\"\u003E\u003C\/noscript\u003E\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":176
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Ciframe src=\"https:\/\/tracking.vcommission.com\/GLBtS?adv_sub=",["escape",["macro",41],12],"\u0026amp;product_id=",["escape",["macro",24],12],"\" scrolling=\"no\" frameborder=\"0\" width=\"1\" height=\"1\"\u003E\u003C\/iframe\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":197
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:42078},{event:\"setEmail\",email:\"\"},{event:\"setSiteType\",type:\"Not Available\"},{event:\"viewItem\",item:\"",["escape",["macro",1],7],"-",["escape",["macro",2],7],"\",nbra:\"",["escape",["macro",30],7],"\",nbrc:\"",["escape",["macro",35],7],"\"},{event:\"viewSearch\",checkin_date:\"",["escape",["macro",38],7],"\",checkout_date:\"",["escape",["macro",44],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":199
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:42078},{event:\"setEmail\",email:\"\"},{event:\"setSiteType\",type:\"Not Available\"},{event:\"viewBasket\",currency:\"",["escape",["macro",32],7],"\",item:[{id:\"",["escape",["macro",1],7],"-",["escape",["macro",2],7],"\",price:\"1\",quantity:\"1\"}]});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":200
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:42078},{event:\"setEmail\",email:\"\"},{event:\"setSiteType\",type:\"Not Available\"},{event:\"trackTransaction\",currency:\"",["escape",["macro",32],7],"\",id:\"",["escape",["macro",40],7],"\",item:[{id:\"",["escape",["macro",1],7],"-",["escape",["macro",2],7],"\",price:\"1\",quantity:\"1\"}]});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":201
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(a,c,e,b,d,f){a.SkyscannerAnalyticsTag=b;a[b]=a[b]||function(){(a[b].buffer=a[b].buffer||[]).push(arguments)};a[b].u=e;d=c.createElement(\"script\");d.src=e+\"\/tag.js\";d.async=1;c=c.getElementsByTagName(\"head\")[0];c.appendChild(d)})(window,document,\"https:\/\/analytics.skyscanner.net\",\"sat\");sat(\"init\",\"SAT-1077144-1\");sat(\"send\",\"conversion\",{bookingReference:",["escape",["macro",41],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":202
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.dataLayer=window.dataLayer||[];\ndataLayer.push({ecommerce:{currencyCode:\"",["escape",["macro",32],7],"\",purchase:{actionField:{id:\"",["escape",["macro",40],7],"\",affiliation:\"",["escape",["macro",70],7],"\",revenue:\"",["escape",["macro",34],7],"\",coupon:\"",["escape",["macro",71],7],"\"},products:[{name:\"",["escape",["macro",1],7],"-",["escape",["macro",2],7],"\",id:\"",["escape",["macro",72],7],"\",price:\"",["escape",["macro",34],7],"\",category:\"",["escape",["macro",24],7],"\",variant:\"",["escape",["macro",69],7],"\",quantity:\"",["escape",["macro",33],7],"\",coupon:\"",["escape",["macro",71],7],"\",sku:\"",["escape",["macro",72],7],"-",["escape",["macro",56],7],"\",\nbrand:\"",["escape",["macro",78],7],"\",currency:\"",["escape",["macro",32],7],"\"}]}}});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":211
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cimg src=\"https:\/\/secure.wego.com\/analytics\/v2\/conversions?conversion_id=c-wego-cleartrip.com\u0026amp;click_id=",["escape",["macro",55],12],"\u0026amp;comm_currency_code=",["escape",["macro",32],12],"\u0026amp;bv_currency_code=",["escape",["macro",32],12],"\u0026amp;transaction_id=",["escape",["macro",41],12],"\u0026amp;commission=0\u0026amp;total_booking_value=0\" width=\"1\" height=\"1\" border=\"0\" alt=\"\"\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":276
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.addEventListener(\"load\",function(){var a=document,b=\"script\",c=a.getElementsByTagName(b)[0];a=a.createElement(b);a.src=\"\/\/ui.cltpstatic.com\/javascripts\/ctAnalytics.js\";c.parentNode.insertBefore(a,c)});\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.ctAnalyticsPageInfo={product:\"Flight\",pageType:\"SEM\"};\u003C\/script\u003E ",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":278
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.addEventListener(\"load\",function(){var a=document,b=\"script\",c=a.getElementsByTagName(b)[0];a=a.createElement(b);a.src=\"\/\/ui.cltpstatic.com\/javascripts\/ctAnalytics.js\";c.parentNode.insertBefore(a,c)});\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.ctAnalyticsPageInfo={product:\"Flight\",pageType:\"SEM\"};\u003C\/script\u003E ",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":279
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.addEventListener(\"load\",function(){var a=document,b=\"script\",c=a.getElementsByTagName(b)[0];a=a.createElement(b);a.src=\"\/\/ui.cltpstatic.com\/javascripts\/ctAnalytics.js\";c.parentNode.insertBefore(a,c)});\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.ctAnalyticsPageInfo={product:\"Flight\",pageType:\"SEM\"};\u003C\/script\u003E ",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":280
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cimg height=\"1\" width=\"1\" border=\"0\" alt=\"\" src=\"https:\/\/www.googletraveladservices.com\/travel\/clk\/pagead\/conversion\/248\/?\nlabel=HPA\u0026amp;guid=ON\u0026amp;script=0\u0026amp;ord=",["escape",["macro",41],12],"\u0026amp;data=hct_partner_hotel_id%3D",["escape",["macro",56],12],"%3Bhct_base_price%3D",["escape",["macro",50],12],"%3Bhct_total_price%3D",["escape",["macro",50],12],"%3Bhct_currency_code%3D",["escape",["macro",32],12],"%3Bhct_checkin_date%3D",["escape",["macro",5],12],"%3Bhct_checkout_date%3D",["escape",["macro",7],12],"%3Bhct_length_of_stay%3D",["escape",["macro",67],12],"%3Bhct_date_format%3D=yyyy-mm-dd%3Bhct_booking_xref%3D",["escape",["macro",41],12],"%3Bhct_ver%3D1.0.i\"\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":281
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=document.createElement(\"script\");a.async=!0;a.src=\"https:\/\/asia.creativecdn.com\/tags?type\\x3dscript\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_offer_",["escape",["macro",79],7],"-",["escape",["macro",80],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_flight-",["escape",["macro",79],7],"-",["escape",["macro",80],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_date_",["escape",["macro",38],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_from_",["escape",["macro",79],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_to_",["escape",["macro",80],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_returndate_",["escape",["macro",44],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_roundtrip_",["escape",["macro",31],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_adults_",["escape",["macro",30],7],"\";\ndocument.getElementsByTagName(\"head\")[0].appendChild(a)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":308
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=document.createElement(\"script\");a.async=!0;a.src=\"https:\/\/asia.creativecdn.com\/tags?type\\x3dscript\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_orderstatus2_1_",["escape",["macro",40],7],"_",["escape",["macro",79],7],"-",["escape",["macro",80],7],"\\x26cd\\x3ddefault\";document.getElementsByTagName(\"head\")[0].appendChild(a)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":309
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=document.createElement(\"script\");a.async=!0;a.src=\"https:\/\/asia.creativecdn.com\/tags?type\\x3dscript\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_basketstatus_",["escape",["macro",79],7],"-",["escape",["macro",80],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_date_",["escape",["macro",38],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_from_",["escape",["macro",79],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_to_",["escape",["macro",80],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_returndate_",["escape",["macro",44],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_roundtrip_",["escape",["macro",31],7],"\\x26id\\x3dpr_TQc8fp44h3AHLQ8dwnXw_custom_adults_",["escape",["macro",30],7],"\";\ndocument.getElementsByTagName(\"head\")[0].appendChild(a)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":311
    },{
      "function":"__html",
      "priority":0,
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/s.adx.io\/dxjet.js\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Efunction _dx_createCookie(g,h,f){if(f){var e=new Date;e.setTime(e.getTime()+864E5*f);f=\"; expires\\x3d\"+e.toGMTString()}else f=\"\";document.cookie=g+\"\\x3d\"+h+f+\";domain\\x3d\"+window.location.hostname+\";path\\x3d\/\"}function _dx_readCookie(g){g+=\"\\x3d\";for(var h=document.cookie.split(\";\"),f=0;f\u003Ch.length;f++){for(var e=h[f];\" \"===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(g))return e.substring(g.length,e.length)}return null}\ntry{var _adx1_tmp_prod=\"\",_adx1_tmp_cust=\"\",_adx1_tmp_obj={xt:\"conversion\",xtid:\"",["escape",["macro",40],7],"\",xcv:\"",["escape",["macro",34],7],"\",xcc:\"",["escape",["macro",32],7],"\"};_adx1_tmp_prod=\"",["escape",["macro",24],7],"\";_adx1_tmp_cust=\"",["escape",["macro",78],7],"\";_adx1_tmp_prod.match(\/local\/ig)?_adx1_tmp_obj.xcart=\"",["escape",["macro",62],7],";",["escape",["macro",63],7],";",["escape",["macro",64],7],";",["escape",["macro",24],7],";",["escape",["macro",54],7],";",["escape",["macro",65],7],";",["escape",["macro",2],7],";",["escape",["macro",66],7],";;\"+_adx1_tmp_cust:_adx1_tmp_prod.match(\/hotel\/ig)?\n_adx1_tmp_obj.xcart=\"",["escape",["macro",62],7],";",["escape",["macro",67],7],";",["escape",["macro",64],7],";",["escape",["macro",24],7],";",["escape",["macro",54],7],";",["escape",["macro",65],7],";",["escape",["macro",2],7],";",["escape",["macro",56],7],";;\"+_adx1_tmp_cust:_adx1_tmp_obj.xcart=\"",["escape",["macro",62],7],";",["escape",["macro",68],7],";",["escape",["macro",64],7],";",["escape",["macro",24],7]," - ",["escape",["macro",69],7],";",["escape",["macro",70],7],";",["escape",["macro",71],7],";",["escape",["macro",1],7]," - ",["escape",["macro",2],7],";",["escape",["macro",72],7],";",["escape",["macro",31],7],";\"+\n_adx1_tmp_cust;_adx1_tmp_obj.xcart=_adx1_tmp_obj.xcart.replace(\/\\|\/g,\"-\");_adx1_tmp_obj.xnojs=\"12\";_adx1_tmp_obj.xb=\"35BS11281\";_adx1_tmp_obj.xtid\u0026\u00262\u003C_adx1_tmp_obj.xtid.length\u0026\u0026(_dx_readCookie(_adx1_tmp_obj.xb+\"-\"+_adx1_tmp_obj.xtid)?_adx1_tmp_obj.cm=\"0\":_dx_createCookie(_adx1_tmp_obj.xb+\"-\"+_adx1_tmp_obj.xtid,\"1\",90));Adx.track_conv(_adx1_tmp_obj)}catch(g){if(Adx.track_conv({xb:\"35BS11281\",xtid:\"",["escape",["macro",40],7],"\",xcc:\"",["escape",["macro",32],7],"\",xcv:\"",["escape",["macro",34],7],"\",xnojs:\"12.x\",xcmail:encodeURIComponent(g.message),\nxcart:\";;",["escape",["macro",64],7],"\"}),window.JSON){var a=\"https:\"==document.location.protocol?\"https:\/\/\":\"http:\/\/\",b=a+\"d.adx.io\/events?xb\\x3d35BS11281\\x26xevent\\x3dxerror\\x26xtg\\x3dxconversions\\x26xv\\x3d12.x\\x26message\\x3d\",c=b+encodeURIComponent(g.message+\" | \"+JSON.stringify(_adx_tmp_obj));c+=\"\\x26rnd\\x3d\"+1E17*Math.random();var d=new Image;d.src=c}};\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":312
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(a,c,e,b,d,f){a.SkyscannerAnalyticsTag=b;a[b]=a[b]||function(){(a[b].buffer=a[b].buffer||[]).push(arguments)};a[b].u=e;d=c.createElement(\"script\");d.src=e+\"\/tag.js\";d.async=1;c=c.getElementsByTagName(\"head\")[0];c.appendChild(d)})(window,document,\"https:\/\/analytics.skyscanner.net\",\"sat\");sat(\"init\",\"SAT-1077144-1\");sat(\"send\",\"conversion\",{bookingReference:",["escape",["macro",40],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":316
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"288042424732696\");fbq(\"track\",\"PageView\");\u003C\/script\u003E\n\u003Cnoscript\u003E\n \u003Cimg height=\"1\" width=\"1\" src=\"https:\/\/www.facebook.com\/tr?id=288042424732696\u0026amp;ev=PageView\n\u0026amp;noscript=1\"\u003E\n\u003C\/noscript\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":326
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:42078},{event:\"setEmail\",email:\"\"},{event:\"setSiteType\",type:\"Not Available\"},{event:\"viewHome\"});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":333
    },{
      "function":"__html",
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"1370221946396364\");fbq(\"set\",\"agent\",\"tmgoogletagmanager\",\"1370221946396364\");fbq(\"track\",\"PageView\");\u003C\/script\u003E\n\u003Cnoscript\u003E\u003Cimg height=\"1\" width=\"1\" style=\"display:none\" src=\"https:\/\/www.facebook.com\/tr?id=1370221946396364\u0026amp;ev=PageView\u0026amp;noscript=1\"\u003E\u003C\/noscript\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":347
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E(function(b,a,c,d){a[c]=a[c]||[];a[c].push({xb:d,event:\"init\"});a=b.createElement(\"script\");a.async=!0;a.src=(\"https:\"==b.location.protocol?\"https\":\"http\")+\":\/\/s.adx.io\/lp.js\";b=b.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)})(document,window,\"dxUni\",\"35BS11281\");\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":348
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E(function(b,a,c,d){a[c]=a[c]||[];a[c].push({xb:d,event:\"init\"});a=b.createElement(\"script\");a.async=!0;a.src=(\"https:\"==b.location.protocol?\"https\":\"http\")+\":\/\/s.adx.io\/lp.js\";b=b.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)})(document,window,\"dxUni\",\"35BTH1357\");\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":349
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"288042424732696\");fbq(\"track\",\"PageView\");fbq(\"track\",\"Purchase\",{value:1,currency:\"INR\"});\u003C\/script\u003E\n\u003Cnoscript\u003E\n \u003Cimg height=\"1\" width=\"1\" src=\"https:\/\/www.facebook.com\/tr?id=288042424732696\u0026amp;ev=PageView\n\u0026amp;noscript=1\"\u003E\n\u003C\/noscript\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":350
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cimg src=\"https:\/\/secure.wego.com\/analytics\/v2\/conversions?conversion_id=c-wego-cleartrip.com\u0026amp;click_id=",["escape",["macro",81],12],"\u0026amp;comm_currency_code=",["escape",["macro",32],12],"\u0026amp;bv_currency_code=",["escape",["macro",32],12],"\u0026amp;transaction_id=",["escape",["macro",40],12],"\u0026amp;commission=0\u0026amp;total_booking_value=0\" width=\"1\" height=\"1\" border=\"0\" alt=\"\"\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":352
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\n\u003Cscript async data-gtmsrc=\"https:\/\/www.googletagmanager.com\/gtag\/js?id=AW-994992302\" type=\"text\/gtmscript\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag(\"js\",new Date);gtag(\"config\",\"AW-994992302\");gtag(\"config\",\"HA-1562831241\",{conversion_cookie_prefix:\"_ha\"});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":360
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Egtag(\"event\",\"purchase\",{send_to:[\"AW-994992302\/m_ifCKrW9wEQrsG52gM,HA-1562831241\",\"HA-1562831241\"],transaction_id:\"Transaction-ID\",value:\"Booking-Price\",currency:\"CURRENCY\",items:[{id:\"Hotel-ID\",start_date:\"Checkin-Date\",end_date:\"Checkout-Date\"}]});\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":361
    }],
  "predicates":[{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotels.*itinerary.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"www.cleartrip.com"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"gtm.js"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotel.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"www.cleartrip.ae"
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"www.cleartrip.sa"
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"qa.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/m\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/m"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*www.cleartrip.ae.*flight.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*www.cleartrip.ae\\\/flights\\\/itinerary.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*qa.cleartrip.com\\\/flights\\\/itinerary.*review|info"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/68.*\/confirmation"
    },{
      "function":"_eq",
      "arg0":["macro",24],
      "arg1":"Air"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"bing"
    },{
      "function":"_cn",
      "arg0":["macro",26],
      "arg1":"air"
    },{
      "function":"_cn",
      "arg0":["macro",26],
      "arg1":"brand"
    },{
      "function":"_ew",
      "arg0":["macro",20],
      "arg1":"\/confirmation"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/73.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"kayak"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/68.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"flights\/results"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"\/flights\/itinerary\/"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"gtm.load"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"flights\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"confirmation"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/fnb\/itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",24],
      "arg1":"Local"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/ttd\/itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*\/flights.*results",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"srp_loaded"
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"cleartrip.ae"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"momondo"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"www.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"local\/"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"kw.cleartrip.com.*do",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"qa.cleartrip.com.*do",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/confirmation"
    },{
      "function":"_cn",
      "arg0":["macro",28],
      "arg1":"GFS_Search"
    },{
      "function":"_eq",
      "arg0":["macro",25],
      "arg1":"GFS_Search"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/73"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"www.cleartrip.sa"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights.*itinerary.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*trains.*itinerary.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights\/itinerary.*",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.sa"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"gtm.dom"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/flights\/itinerary\/68"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.ae\/m\/"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"cleartrip.sa"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights\/itinerary.*review",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights\/itinerary.*traveller",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights\/itinerary.*pay",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights\/itinerary.*login",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"kw.cleartrip.com"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*\/hotels.*results",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"www.offline.com"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotels\/details.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotels.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotels\/itinerary.*",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*flights.*confirmation.*",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"arabyads"
    },{
      "function":"_re",
      "arg0":["macro",45],
      "arg1":"^(\/|\/ar\/|\/do\/search\/flights|\/m\/flights|\/ar\/m\/flights|\/ar\/m|\/m)$"
    },{
      "function":"_re",
      "arg0":["macro",46],
      "arg1":"ar|en",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",45],
      "arg1":"\/flights\/itinerary\/"
    },{
      "function":"_re",
      "arg0":["macro",45],
      "arg1":"\/flights\/international\/results"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"gtm.elementVisibility"
    },{
      "function":"_re",
      "arg0":["macro",47],
      "arg1":"(^$|((^|,)670932_490($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",45],
      "arg1":"m\/flights\/international\/results"
    },{
      "function":"_re",
      "arg0":["macro",45],
      "arg1":"itinerary\\\/\\w{10}-\\w{4}-\\w{4}-\\w{4}-\\w{12}\\\/confirmation",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",48],
      "arg1":"fireDRMFeedTag"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"fireDRMFeedTag"
    },{
      "function":"_eq",
      "arg0":["macro",27],
      "arg1":"https:\/\/www.cleartrip.com\/flights"
    },{
      "function":"_eq",
      "arg0":["macro",27],
      "arg1":"https:\/\/www.cleartrip.com"
    },{
      "function":"_re",
      "arg0":["macro",27],
      "arg1":"(?\u003C![\\w\\d])flights\/international\/results(?![\\w\\d])"
    },{
      "function":"_re",
      "arg0":["macro",45],
      "arg1":"(?\u003C![\\w\\d])\/flights\/results(?![\\w\\d])"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.sa\/do\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.ae\/do\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.com\/do"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"kw.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"qa.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"om.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"bh.cleartrip.com"
    },{
      "function":"_eq",
      "arg0":["macro",25],
      "arg1":"wego"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.com\/m\/"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"om.cleartrip.com.*do",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"bh.cleartrip.com.*do",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"cleartrip.ae.*do",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",20],
      "arg1":"https:\/\/www.cleartrip.com\/"
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"google_php"
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"me.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"utm_source=google_php"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"google_myr"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"hotels"
    },{
      "function":"_eq",
      "arg0":["macro",51],
      "arg1":"www.cleartrip.com"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"itinerary_loaded"
    },{
      "function":"_ew",
      "arg0":["macro",20],
      "arg1":"\/hotels"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/flight-booking\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/flight-schedule\/"
    },{
      "function":"_eq",
      "arg0":["macro",20],
      "arg1":"https:\/\/www.cleartrip.com\/flights"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"activities"
    },{
      "function":"_cn",
      "arg0":["macro",52],
      "arg1":"quora"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/ttd\/itinerary\/"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"www.amexindiatravel.com"
    },{
      "function":"_cn",
      "arg0":["macro",21],
      "arg1":"amexindiatravel.com"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"cleartrip.ae\/hotels"
    },{
      "function":"_cn",
      "arg0":["macro",53],
      "arg1":"\/flights\/results"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"PAH"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"skyscanner"
    },{
      "function":"_eq",
      "arg0":["macro",24],
      "arg1":"Hotel"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"wego"
    },{
      "function":"_ew",
      "arg0":["macro",27],
      "arg1":"\/confirmation"
    },{
      "function":"_re",
      "arg0":["macro",27],
      "arg1":"\/itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"Ixigo_hotels"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"hotels\/itinerary\/75.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",24],
      "arg1":"Local-ttd"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"facebook"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"www.cleartrip.ae"
    },{
      "function":"_cn",
      "arg0":["macro",73],
      "arg1":"tripadvisor"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"omg"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"hotels\/itinerary\/.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",54],
      "arg1":"PAH"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":"\/hotels\/itinerary\/75.*\/confirmation",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",74],
      "arg1":"tripadvisor"
    },{
      "function":"_cn",
      "arg0":["macro",74],
      "arg1":"trivago"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotels\/itinerary\/75.*\/confirmation.*",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/hotels\/results"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/hotels\/details"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"hotels\/itinerary"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*"
    },{
      "function":"_cn",
      "arg0":["macro",20],
      "arg1":"\/hotels\/itinerary\/"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"cleartrip.sa"
    },{
      "function":"_cn",
      "arg0":["macro",25],
      "arg1":"vcommission"
    },{
      "function":"_eq",
      "arg0":["macro",25],
      "arg1":"offline"
    },{
      "function":"_cn",
      "arg0":["macro",28],
      "arg1":"skyscanner"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"itinerary"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"www.cleartrip.com"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"www.cleartrip.sa"
    },{
      "function":"_eq",
      "arg0":["macro",28],
      "arg1":"wego"
    },{
      "function":"_eq",
      "arg0":["macro",24],
      "arg1":"Hotels"
    },{
      "function":"_re",
      "arg0":["macro",20],
      "arg1":".*hotels\/itinerary\/.*\/confirmation",
      "ignore_case":true
    }],
  "rules":[
    [["if",0,1,2],["add",1,2,5,33,47,73,78,82,105,157]],
    [["if",2,3],["add",3,4]],
    [["if",2,4],["add",6]],
    [["if",2,5],["add",6]],
    [["if",2,6],["add",6]],
    [["if",2,7],["add",7]],
    [["if",2,8],["add",7]],
    [["if",2],["add",7,97,133,168,175,31,45,81,131,170,134,136,137,138,139]],
    [["if",2,9],["add",8]],
    [["if",2,10],["add",8]],
    [["if",2,11],["add",9]],
    [["if",2,12,13,14,15],["add",10]],
    [["if",2,14,16,17],["add",11]],
    [["if",2,13,14,15,18],["add",12]],
    [["if",2,13,19,20],["add",13]],
    [["if",2,13,18,19],["add",14]],
    [["if",2,21],["add",15]],
    [["if",2,22],["add",16,77]],
    [["if",23,24],["add",17]],
    [["if",2,4,25],["unless",26],["add",18]],
    [["if",2,27,28],["add",19]],
    [["if",2,28,29],["add",19]],
    [["if",1,30,31],["add",20,123,153,163],["block",124]],
    [["if",2,5,25],["unless",26],["add",21]],
    [["if",2,32],["add",22]],
    [["if",2,13,20,33,34],["add",23]],
    [["if",1,2,13,18,33],["add",23]],
    [["if",1,2,35],["add",24]],
    [["if",2,36],["add",25]],
    [["if",2,37],["add",26]],
    [["if",1,24,38,39,40],["add",27]],
    [["if",1,2,13,39,41,42],["add",28]],
    [["if",24,43],["add",29]],
    [["if",2,43,44],["add",30,54]],
    [["if",1,2,45],["add",32,46,107,157,35]],
    [["if",1,2,46],["add",34,48,79]],
    [["if",2,4,45],["add",36]],
    [["if",2,5,45],["add",37]],
    [["if",24,34],["add",0]],
    [["if",1,2],["add",38]],
    [["if",2,4,30],["add",39]],
    [["if",2,4,47],["unless",26],["add",40]],
    [["if",4,24,45],["add",41]],
    [["if",2,5,30],["add",42]],
    [["if",2,5,47],["unless",26],["add",43]],
    [["if",5,24,45],["add",44]],
    [["if",48,49],["add",49]],
    [["if",2,4,39,50,51],["add",50]],
    [["if",2,4,39,42,51],["add",51]],
    [["if",2,32,52],["add",52]],
    [["if",2,53],["add",53,96]],
    [["if",2,30,53],["add",55]],
    [["if",2,5,54],["add",56]],
    [["if",2,5,55],["add",57]],
    [["if",2,5,56],["add",58]],
    [["if",2,5,57],["add",59]],
    [["if",2,58],["add",60]],
    [["if",2,52,58],["add",61]],
    [["if",2,59,60],["add",62]],
    [["if",2,60,61],["add",63]],
    [["if",2,60,62],["add",64]],
    [["if",1,2,63],["add",65]],
    [["if",2,13,43,64,65],["add",66]],
    [["if",5,49,66,67],["add",67]],
    [["if",2,5,67,68],["add",68]],
    [["if",5,67,69,70,71],["add",69]],
    [["if",2,5,67,72],["add",69]],
    [["if",5,49,67,73],["add",70]],
    [["if",1,2,39,50],["add",71,87,90,99,100,110,116]],
    [["if",1,2,39,42],["add",72,91,92,93,94,109,117]],
    [["if",24],["add",74]],
    [["if",74,75],["add",74]],
    [["if",2,76],["add",75]],
    [["if",2,77],["add",75]],
    [["if",2,78],["add",76]],
    [["if",2,79],["add",76]],
    [["if",1,2,28,29],["add",80,95,106,157]],
    [["if",2,80],["unless",26],["add",83,161]],
    [["if",2,81],["unless",26],["add",84,160]],
    [["if",2,82],["unless",26,83,84,85,86],["add",85,159]],
    [["if",2,4,45,87],["add",86]],
    [["if",1,2,39,50,88],["add",88,89]],
    [["if",1,2,39,50],["unless",88],["add",98]],
    [["if",2,89],["add",101]],
    [["if",2,90],["add",102]],
    [["if",2,91],["add",103,104]],
    [["if",1,2,92],["add",108]],
    [["if",2,93,94],["add",111]],
    [["if",2,45,95],["add",112]],
    [["if",2,95],["add",113]],
    [["if",1,2,96],["unless",26],["add",114]],
    [["if",2,93,97],["add",115]],
    [["if",2,98,99],["add",118]],
    [["if",1,47,100],["unless",26],["add",119,122,154,165]],
    [["if",1,2,101],["unless",26],["add",120]],
    [["if",1,2,102],["add",121]],
    [["if",1,2,103],["add",121]],
    [["if",1,2,104],["add",124,169]],
    [["if",1,24,45],["add",125,155,164,173]],
    [["if",1,2,105],["add",126]],
    [["if",2,32,105],["add",127]],
    [["if",1,24,45,106],["add",128]],
    [["if",2,39,93,107],["add",129]],
    [["if",2,108,109],["add",130]],
    [["if",2,110],["add",132]],
    [["if",2,111],["add",135]],
    [["if",2,113,114],["unless",112],["add",140]],
    [["if",2,114,115,116],["add",141]],
    [["if",24,117],["unless",1,53],["add",142]],
    [["if",2,114,118,119],["add",143]],
    [["if",2,29,120,121,122],["add",144]],
    [["if",2,123],["add",145]],
    [["if",2,32,114,124,125],["unless",126],["add",146]],
    [["if",2,114,127,128],["unless",126],["add",147]],
    [["if",2,34,114,129,130],["add",148]],
    [["if",1,2,131],["add",149]],
    [["if",1,2,132],["add",149]],
    [["if",1,2,133],["add",149]],
    [["if",2,134],["unless",1],["add",150]],
    [["if",1,2,39,135],["add",151]],
    [["if",2,114,125,136,137],["add",152]],
    [["if",2,5,13,45,113],["add",156]],
    [["if",2,5,45,87],["add",158]],
    [["if",2,26,93,114,138],["add",162]],
    [["if",1,24,117],["add",166]],
    [["if",13,24,45,93,139],["add",167]],
    [["if",2,141],["unless",140],["add",171]],
    [["if",2,142],["unless",140],["add",172]],
    [["if",1,24,45,143],["add",174]],
    [["if",1,24,144,145],["add",176]]]
},
"runtime":[
[],[50,"__qpx",[46,"a"],[52,"b",["require","sendPixel"]],[52,"c",["require","setInWindow"]],[52,"d",["require","copyFromWindow"]],[52,"e",["require","getUrl"]],[52,"f",["require","encodeUriComponent"]],[52,"g",["f",[17,[15,"a"],"pixel_id"]]],[52,"h",[17,[15,"a"],"pixel_event"]],[52,"i",["d","qp"]],[52,"j",["e",[45]]],[52,"k",["f",[15,"j"]]],[22,[29,[15,"h"],"ViewContent"],[46,["b",[0,[0,[0,[0,[0,"https://q.quora.com/_/ad/",[15,"g"]],"/pixel?tag\u003d"],[15,"h"]],"\u0026i\u003dgtm\u0026u\u003d"],[15,"k"]]]]],[22,[28,[15,"i"]],[46,["b",[0,[0,[0,"https://q.quora.com/_/ad/",[15,"g"]],"/pixel?tag\u003dViewContent\u0026i\u003dgtm\u0026u\u003d"],[15,"k"]]]]],["c","qp","1",true],[2,[15,"a"],"gtmOnSuccess",[7]]],
[]
]
,"permissions":{"__qpx":{"send_pixel":{"urls":["https:\/\/q.quora.com\/"]},"access_globals":{"keys":[{"key":"qp","read":true,"write":true,"execute":false}]},"get_url":{"urlParts":"any"}},
"null":0}


};
var aa,ba=this||self,ca=function(a){return"boolean"==typeof a},da=/^[\w+/_-]+[=]{0,2}$/,ea=null,fa=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a};var ja=function(a,b){this.L=a;this.Bg=b};ja.prototype.Rg=function(){return this.L};ja.prototype.getData=function(){return this.Bg};ja.prototype.getData=ja.prototype.getData;ja.prototype.getType=ja.prototype.Rg;var ka=function(a){return"number"===typeof a&&0<=a&&isFinite(a)&&0===a%1||"string"===typeof a&&"-"!==a[0]&&a===""+parseInt(a,10)},la=function(){this.H={};this.xb=!1;this.ed={}};la.prototype.get=function(a){return this.H["dust."+a]};la.prototype.set=function(a,b){this.xb||(a="dust."+a,this.ed.hasOwnProperty(a)||(this.H[a]=b))};la.prototype.has=function(a){return this.H.hasOwnProperty("dust."+a)};var ma=function(a){var b=[],c;for(c in a.H)a.H.hasOwnProperty(c)&&b.push(c.substr(5));return b};
la.prototype.remove=function(a){a="dust."+a;this.xb||this.ed.hasOwnProperty(a)||delete this.H[a]};la.prototype.P=function(){this.xb=!0};var g=function(a){this.Za=new la;this.i=[];a=a||[];for(var b in a)a.hasOwnProperty(b)&&(ka(b)?this.i[Number(b)]=a[Number(b)]:this.Za.set(b,a[b]))};aa=g.prototype;aa.toString=function(){for(var a=[],b=0;b<this.i.length;b++){var c=this.i[b];null===c||void 0===c?a.push(""):a.push(c.toString())}return a.join(",")};aa.set=function(a,b){if("length"==a){if(!ka(b))throw Error("RangeError: Length property must be a valid integer.");this.i.length=Number(b)}else ka(a)?this.i[Number(a)]=b:this.Za.set(a,b)};
aa.get=function(a){return"length"==a?this.length():ka(a)?this.i[Number(a)]:this.Za.get(a)};aa.length=function(){return this.i.length};aa.Ba=function(){for(var a=ma(this.Za),b=0;b<this.i.length;b++)a.push(b+"");return new g(a)};aa.remove=function(a){ka(a)?delete this.i[Number(a)]:this.Za.remove(a)};aa.pop=function(){return this.i.pop()};aa.push=function(a){return this.i.push.apply(this.i,Array.prototype.slice.call(arguments))};aa.shift=function(){return this.i.shift()};
aa.splice=function(a,b,c){return new g(this.i.splice.apply(this.i,arguments))};aa.unshift=function(a){return this.i.unshift.apply(this.i,Array.prototype.slice.call(arguments))};aa.has=function(a){return ka(a)&&this.i.hasOwnProperty(a)||this.Za.has(a)};g.prototype.unshift=g.prototype.unshift;g.prototype.splice=g.prototype.splice;g.prototype.shift=g.prototype.shift;g.prototype.push=g.prototype.push;g.prototype.pop=g.prototype.pop;g.prototype.remove=g.prototype.remove;g.prototype.getKeys=g.prototype.Ba;
g.prototype.get=g.prototype.get;g.prototype.set=g.prototype.set;var na=function(){function a(f,h){if(b[f]){if(b[f].bc+h>b[f].max)throw Error("Quota exceeded");b[f].bc+=h}}var b={},c=void 0,d=void 0,e={nh:function(f){c=f},se:function(){c&&a(c,1)},ph:function(f){d=f},Aa:function(f){d&&a(d,f)},Qh:function(f,h){b[f]=b[f]||{bc:0};b[f].max=h},Og:function(f){return b[f]&&b[f].bc||0},reset:function(){b={}},sg:a};e.onFnConsume=e.nh;e.consumeFn=e.se;e.onStorageConsume=e.ph;e.consumeStorage=e.Aa;e.setMax=e.Qh;e.getConsumed=e.Og;e.reset=e.reset;e.consume=e.sg;return e};var oa=function(a,b){this.fa=a;this.qc=function(c,d,e){return c.apply(d,e)};this.Ea=b;this.i=new la;this.S=this.kc=void 0};oa.prototype.add=function(a,b){pa(this,a,b,!1)};oa.prototype.Uc=function(a,b){pa(this,a,b,!0)};var pa=function(a,b,c,d){if(!a.i.xb)if(a.fa.Aa(("string"===typeof b?b.length:1)+("string"===typeof c?c.length:1)),d){var e=a.i;e.set(b,c);e.ed["dust."+b]=!0}else a.i.set(b,c)};
oa.prototype.set=function(a,b){this.i.xb||(!this.i.has(a)&&this.Ea&&this.Ea.has(a)?this.Ea.set(a,b):(this.fa.Aa(("string"===typeof a?a.length:1)+("string"===typeof b?b.length:1)),this.i.set(a,b)))};oa.prototype.get=function(a){return this.i.has(a)?this.i.get(a):this.Ea?this.Ea.get(a):void 0};oa.prototype.has=function(a){return!!this.i.has(a)||!(!this.Ea||!this.Ea.has(a))};var qa=function(a){var b=new oa(a.fa,a);a.kc&&b.Ia(a.kc);b.ra(a.qc);b.S=a.S;return b};oa.prototype.O=function(){return this.fa};
oa.prototype.Ia=function(a){this.kc=a};oa.prototype.ra=function(a){this.qc=a};oa.prototype.P=function(){this.i.P()};oa.prototype.has=oa.prototype.has;oa.prototype.get=oa.prototype.get;oa.prototype.set=oa.prototype.set;oa.prototype.addImmutable=oa.prototype.Uc;oa.prototype.add=oa.prototype.add;var ra=function(){},sa=function(a){return"function"==typeof a},ta=function(a){return"string"==typeof a},va=function(a){return"number"==typeof a&&!isNaN(a)},wa=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},xa=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},ya=function(a,b){if(a&&wa(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},za=function(a,b){if(!va(a)||
!va(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},Ba=function(a,b){for(var c=new Aa,d=0;d<a.length;d++)c.set(a[d],!0);for(var e=0;e<b.length;e++)if(c.get(b[e]))return!0;return!1},Ca=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},Da=function(a){return!!a&&("[object Arguments]"==Object.prototype.toString.call(a)||Object.prototype.hasOwnProperty.call(a,"callee"))},Ea=function(a){return Math.round(Number(a))||0},Fa=function(a){return"false"==
String(a).toLowerCase()?!1:!!a},Ga=function(a){var b=[];if(wa(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},Ha=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},Ia=function(){return(new Date).getTime()},Aa=function(){this.prefix="gtm.";this.values={}};Aa.prototype.set=function(a,b){this.values[this.prefix+a]=b};Aa.prototype.get=function(a){return this.values[this.prefix+a]};Aa.prototype.contains=function(a){return void 0!==this.get(a)};
var Ja=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ma=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},Na=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},Oa=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},Pa=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},Qa=function(a){for(var b=u,c=0;c<a.length-1;c++){if(!b.hasOwnProperty(a[c]))return;b=b[a[c]]}return b};var Ra=function(a,b){la.call(this);this.Oe=a;this.Kg=b};fa(Ra,la);var Ta=function(a,b){for(var c,d=0;d<b.length&&!(c=Sa(a,b[d]),c instanceof ja);d++);return c},Sa=function(a,b){try{var c=a.get(String(b[0]));if(!(c&&c instanceof Ra))throw Error("Attempting to execute non-function "+b[0]+".");return c.s.apply(c,[a].concat(b.slice(1)))}catch(e){var d=a.kc;d&&d(e,b.context?{id:b[0],line:b.context.line}:null);throw e;}};Ra.prototype.toString=function(){return this.Oe};Ra.prototype.getName=function(){return this.Oe};
Ra.prototype.getName=Ra.prototype.getName;Ra.prototype.Ba=function(){return new g(ma(this))};Ra.prototype.getKeys=Ra.prototype.Ba;Ra.prototype.s=function(a,b){var c=this;a.O().se();return this.Kg.apply({evaluate:function(d){var e=a;return wa(d)?Sa(e,d):d},$c:function(d){return Ta(a,d)},getName:function(){return c.getName()},O:function(){return a.O()},h:function(){return a}},Array.prototype.slice.call(arguments,1))};Ra.prototype.invoke=Ra.prototype.s;
Ra.prototype.Ga=function(a,b){try{return this.s.apply(this,Array.prototype.slice.call(arguments,0))}catch(c){}};Ra.prototype.safeInvoke=Ra.prototype.Ga;var Ua=function(){la.call(this)};fa(Ua,la);Ua.prototype.Ba=function(){return new g(ma(this))};Ua.prototype.getKeys=Ua.prototype.Ba;var Va=/^([a-z]*):(!|\?)(\*|string|boolean|number|Fn|Map|List)$/i,Wa={Fn:"function",Map:"Object",List:"Array"},Xa=function(a,b,c){for(var d=0;d<b.length;d++){var e=Va.exec(b[d]);if(!e)throw Error("Internal Error in "+a);var f=e[1],h="!"===e[2],k=e[3],l=c[d],m=typeof l;if(null===l||"undefined"===m){if(h)throw Error("Error in "+a+". Required argument "+f+" not supplied.");}else if("*"!==k){var n=typeof l;l instanceof Ra?n="Fn":l instanceof g?n="List":l instanceof Ua&&(n="Map");if(n!=k)throw Error("Error in "+
a+". Argument "+f+" has type "+n+", which does not match required type "+(Wa[k]||k)+".");}}};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Ya=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Za=function(a){if(null==a)return String(a);var b=Ya.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},$a=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},ab=function(a){if(!a||"object"!=Za(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!$a(a,"constructor")&&!$a(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||$a(a,b)},C=function(a,b){var c=b||("array"==Za(a)?[]:{}),d;for(d in a)if($a(a,d)){var e=a[d];"array"==Za(e)?("array"!=Za(c[d])&&(c[d]=[]),c[d]=C(e,c[d])):ab(e)?(ab(c[d])||(c[d]={}),c[d]=C(e,c[d])):c[d]=e}return c};var cb=function(a,b){var c=[],d=[],e=function(h,k){for(var l=ma(h),m=0;m<l.length;m++)k[l[m]]=f(h.get(l[m]))},f=function(h){var k=xa(c,h);if(-1<k)return d[k];if(h instanceof g){var l=[];c.push(h);d.push(l);for(var m=h.Ba(),n=0;n<m.length();n++)l[m.get(n)]=f(h.get(m.get(n)));return l}if(h instanceof Ua){var p={};c.push(h);d.push(p);e(h,p);return p}if(h instanceof Ra){var t=function(){for(var q=Array.prototype.slice.call(arguments,0),r=0;r<q.length;r++)q[r]=bb(q[r],b);var v=b?b.O():na(),w=new oa(v);
b&&(w.S=b.S);return f(h.s.apply(h,[w].concat(q)))};c.push(h);d.push(t);e(h,t);return t}switch(typeof h){case "boolean":case "number":case "string":case "undefined":return h;case "object":if(null===h)return null}};return f(a)},bb=function(a,b){var c=[],d=[],e=function(h,k){for(var l in h)h.hasOwnProperty(l)&&k.set(l,f(h[l]))},f=function(h){var k=xa(c,h);if(-1<k)return d[k];if(wa(h)||Da(h)){var l=new g([]);c.push(h);d.push(l);for(var m in h)h.hasOwnProperty(m)&&l.set(m,f(h[m]));return l}if(ab(h)){var n=
new Ua;c.push(h);d.push(n);e(h,n);return n}if("function"===typeof h){var p=new Ra("",function(q){for(var r=Array.prototype.slice.call(arguments,0),v=0;v<r.length;v++)r[v]=cb(this.evaluate(r[v]),b);return f((0,this.h().qc)(h,h,r))});c.push(h);d.push(p);e(h,p);return p}var t=typeof h;if(null===h||"string"===t||"number"===t||"boolean"===t)return h};return f(a)};var db={control:function(a,b){return new ja(a,this.evaluate(b))},fn:function(a,b,c){var d=this.h(),e=this.evaluate(b);if(!(e instanceof g))throw Error("Error: non-List value given for Fn argument names.");var f=Array.prototype.slice.call(arguments,2);this.O().Aa(a.length+f.length);return new Ra(a,function(){return function(h){var k=qa(d);void 0===k.S&&(k.S=this.h().S);for(var l=Array.prototype.slice.call(arguments,0),m=0;m<l.length;m++)if(l[m]=this.evaluate(l[m]),l[m]instanceof ja)return l[m];for(var n=
e.get("length"),p=0;p<n;p++)p<l.length?k.set(e.get(p),l[p]):k.set(e.get(p),void 0);k.set("arguments",new g(l));var t=Ta(k,f);if(t instanceof ja)return"return"===t.L?t.getData():t}}())},list:function(a){var b=this.O();b.Aa(arguments.length);for(var c=new g,d=0;d<arguments.length;d++){var e=this.evaluate(arguments[d]);"string"===typeof e&&b.Aa(e.length?e.length-1:0);c.push(e)}return c},map:function(a){for(var b=this.O(),c=new Ua,d=0;d<arguments.length-1;d+=2){var e=this.evaluate(arguments[d])+"",f=
this.evaluate(arguments[d+1]),h=e.length;h+="string"===typeof f?f.length:1;b.Aa(h);c.set(e,f)}return c},undefined:function(){}};function eb(a,b){var c=Sa(a,b);if(c instanceof ja||c instanceof Ra||c instanceof g||c instanceof Ua||null===c||void 0===c||"string"===typeof c||"number"===typeof c||"boolean"===typeof c)return c}var ib=function(){this.fa=na();this.Ca=new oa(this.fa)};aa=ib.prototype;aa.ya=function(a,b){var c=new Ra(a,b);c.P();this.Ca.set(a,c)};aa.oe=function(a,b){db.hasOwnProperty(a)&&this.ya(b||a,db[a])};aa.O=function(){return this.fa};aa.wc=function(){this.fa=na();this.Ca.fa=this.fa};aa.Ia=function(a){this.Ca.Ia(a)};
aa.ra=function(a){this.Ca.ra(a)};aa.Va=function(a,b){var c=Array.prototype.slice.call(arguments,0);return this.Ad(c)};aa.Ad=function(a){for(var b,c=0;c<arguments.length;c++)b=eb(this.Ca,arguments[c]);return b};aa.xc=function(a,b){var c=qa(this.Ca);c.S=a;for(var d,e=1;e<arguments.length;e++)d=eb(c,arguments[e]);return d};aa.P=function(){this.Ca.P()};ib.prototype.makeImmutable=ib.prototype.P;ib.prototype.run=ib.prototype.Ad;ib.prototype.execute=ib.prototype.Va;ib.prototype.setJavaScriptProxy=ib.prototype.ra;
ib.prototype.resetQuota=ib.prototype.wc;ib.prototype.getQuota=ib.prototype.O;ib.prototype.addNativeInstruction=ib.prototype.oe;ib.prototype.addInstruction=ib.prototype.ya;var jb=function(a){for(var b=[],c=0;c<a.length();c++)a.has(c)&&(b[c]=a.get(c));return b};var kb={Uh:"concat every filter forEach hasOwnProperty indexOf join lastIndexOf map pop push reduce reduceRight reverse shift slice some sort splice unshift toString".split(" "),concat:function(a,b){for(var c=[],d=0;d<this.length();d++)c.push(this.get(d));for(var e=1;e<arguments.length;e++)if(arguments[e]instanceof g)for(var f=arguments[e],h=0;h<f.length();h++)c.push(f.get(h));else c.push(arguments[e]);return new g(c)},every:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)if(this.has(d)&&
!b.s(a,this.get(d),d,this))return!1;return!0},filter:function(a,b){for(var c=this.length(),d=[],e=0;e<this.length()&&e<c;e++)this.has(e)&&b.s(a,this.get(e),e,this)&&d.push(this.get(e));return new g(d)},forEach:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)this.has(d)&&b.s(a,this.get(d),d,this)},hasOwnProperty:function(a,b){return this.has(b)},indexOf:function(a,b,c){var d=this.length(),e=void 0===c?0:Number(c);0>e&&(e=Math.max(d+e,0));for(var f=e;f<d;f++)if(this.has(f)&&this.get(f)===
b)return f;return-1},join:function(a,b){for(var c=[],d=0;d<this.length();d++)c.push(this.get(d));return c.join(b)},lastIndexOf:function(a,b,c){var d=this.length(),e=d-1;void 0!==c&&(e=0>c?d+c:Math.min(c,e));for(var f=e;0<=f;f--)if(this.has(f)&&this.get(f)===b)return f;return-1},map:function(a,b){for(var c=this.length(),d=[],e=0;e<this.length()&&e<c;e++)this.has(e)&&(d[e]=b.s(a,this.get(e),e,this));return new g(d)},pop:function(){return this.pop()},push:function(a,b){return this.push.apply(this,Array.prototype.slice.call(arguments,
1))},reduce:function(a,b,c){var d=this.length(),e,f;if(void 0!==c)e=c,f=0;else{if(0==d)throw Error("TypeError: Reduce on List with no elements.");var h;for(h=0;h<d;h++)if(this.has(h)){e=this.get(h);f=h+1;break}if(h==d)throw Error("TypeError: Reduce on List with no elements.");}for(var k=f;k<d;k++)this.has(k)&&(e=b.s(a,e,this.get(k),k,this));return e},reduceRight:function(a,b,c){var d=this.length(),e,f;if(void 0!==c)e=c,f=d-1;else{if(0==d)throw Error("TypeError: ReduceRight on List with no elements.");
var h;for(h=1;h<=d;h++)if(this.has(d-h)){e=this.get(d-h);f=d-(h+1);break}if(h>d)throw Error("TypeError: ReduceRight on List with no elements.");}for(var k=f;0<=k;k--)this.has(k)&&(e=b.s(a,e,this.get(k),k,this));return e},reverse:function(){for(var a=jb(this),b=a.length-1,c=0;0<=b;b--,c++)a.hasOwnProperty(b)?this.set(c,a[b]):this.remove(c);return this},shift:function(){return this.shift()},slice:function(a,b,c){var d=this.length();void 0===b&&(b=0);b=0>b?Math.max(d+b,0):Math.min(b,d);c=void 0===c?
d:0>c?Math.max(d+c,0):Math.min(c,d);c=Math.max(b,c);for(var e=[],f=b;f<c;f++)e.push(this.get(f));return new g(e)},some:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)if(this.has(d)&&b.s(a,this.get(d),d,this))return!0;return!1},sort:function(a,b){var c=jb(this);void 0===b?c.sort():c.sort(function(e,f){return Number(b.s(a,e,f))});for(var d=0;d<c.length;d++)c.hasOwnProperty(d)?this.set(d,c[d]):this.remove(d)},splice:function(a,b,c,d){return this.splice.apply(this,Array.prototype.splice.call(arguments,
1,arguments.length-1))},toString:function(){return this.toString()},unshift:function(a,b){return this.unshift.apply(this,Array.prototype.slice.call(arguments,1))}};var lb={ADD:0,AND:1,APPLY:2,ASSIGN:3,BITWISE_AND:56,BITWISE_LEFT_SHIFT:57,BITWISE_NOT:58,BITWISE_OR:59,BITWISE_RIGHT_SHIFT:60,BITWISE_UNSIGNED_RIGHT_SHIFT:61,BITWISE_XOR:62,BLOCK:53,BREAK:4,CASE:5,CONST:52,CONTINUE:6,CONTROL:49,CREATE_ARRAY:7,CREATE_OBJECT:8,DEFAULT:9,DEFN:50,DIVIDE:10,DO:11,EQUALS:12,EXPRESSION_LIST:13,FN:51,FOR:14,FOR_IN:47,FOR_IN_CONST:54,FOR_IN_LET:55,GET:15,GET_CONTAINER_VARIABLE:48,GET_INDEX:16,GET_PROPERTY:17,GREATER_THAN:18,GREATER_THAN_EQUALS:19,IDENTITY_EQUALS:20,IDENTITY_NOT_EQUALS:21,
IF:22,LESS_THAN:23,LESS_THAN_EQUALS:24,MODULUS:25,MULTIPLY:26,NEGATE:27,NOT:28,NOT_EQUALS:29,NULL:45,OR:30,PLUS_EQUALS:31,POST_DECREMENT:32,POST_INCREMENT:33,PRE_DECREMENT:34,PRE_INCREMENT:35,QUOTE:46,RETURN:36,SET_PROPERTY:43,SUBTRACT:37,SWITCH:38,TERNARY:39,TYPEOF:40,UNDEFINED:44,VAR:41,WHILE:42},mb="charAt concat indexOf lastIndexOf match replace search slice split substring toLowerCase toLocaleLowerCase toString toUpperCase toLocaleUpperCase trim".split(" "),nb=new ja("break"),ob=new ja("continue"),
pb=function(a,b){return this.evaluate(a)+this.evaluate(b)},qb=function(a,b){return this.evaluate(a)&&this.evaluate(b)},rb=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(!(c instanceof g))throw Error("Error: Non-List argument given to Apply instruction.");if(null===a||void 0===a)throw Error("TypeError: Can't read property "+b+" of "+a+".");if("boolean"==typeof a||"number"==typeof a){if("toString"==b)return a.toString();throw Error("TypeError: "+a+"."+b+" is not a function.");
}if("string"==typeof a){if(0<=xa(mb,b))return bb(a[b].apply(a,jb(c)),this.h());throw Error("TypeError: "+b+" is not a function");}if(a instanceof g){if(a.has(b)){var d=a.get(b);if(d instanceof Ra){var e=jb(c);e.unshift(this.h());return d.s.apply(d,e)}throw Error("TypeError: "+b+" is not a function");}if(0<=xa(kb.Uh,b)){var f=jb(c);f.unshift(this.h());return kb[b].apply(a,f)}}if(a instanceof Ra||a instanceof Ua){if(a.has(b)){var h=a.get(b);if(h instanceof Ra){var k=jb(c);k.unshift(this.h());return h.s.apply(h,
k)}throw Error("TypeError: "+b+" is not a function");}if("toString"==b)return a instanceof Ra?a.getName():a.toString();if("hasOwnProperty"==b)return a.has.apply(a,jb(c))}throw Error("TypeError: Object has no '"+b+"' property.");},sb=function(a,b){a=this.evaluate(a);if("string"!=typeof a)throw Error("Invalid key name given for assignment.");var c=this.h();if(!c.has(a))throw Error("Attempting to assign to undefined value "+b);var d=this.evaluate(b);c.set(a,d);return d},tb=function(a){var b=qa(this.h()),
c=Ta(b,Array.prototype.slice.apply(arguments));if(c instanceof ja)return c},vb=function(){return nb},wb=function(a){for(var b=this.evaluate(a),c=0;c<b.length;c++){var d=this.evaluate(b[c]);if(d instanceof ja)return d}},xb=function(a){for(var b=this.h(),c=0;c<arguments.length-1;c+=2){var d=arguments[c];if("string"===typeof d){var e=this.evaluate(arguments[c+1]);b.Uc(d,e)}}},yb=function(){return ob},zb=function(a,b,c){var d=new g;b=this.evaluate(b);for(var e=0;e<b.length;e++)d.push(b[e]);var f=[lb.FN,
a,d].concat(Array.prototype.splice.call(arguments,2,arguments.length-2));this.h().set(a,this.evaluate(f))},Ab=function(a,b){return this.evaluate(a)/this.evaluate(b)},Bb=function(a,b){return this.evaluate(a)==this.evaluate(b)},Db=function(a){for(var b,c=0;c<arguments.length;c++)b=this.evaluate(arguments[c]);return b};
function Eb(a,b,c){if("string"==typeof b)for(var d=0;d<b.length;d++){var e=a(d),f=Ta(e,c);if(f instanceof ja){if("break"==f.L)break;if("return"==f.L)return f}}else if(b instanceof Ua||b instanceof g||b instanceof Ra)for(var h=b.Ba(),k=h.length(),l=0;l<k;l++){var m=a(h.get(l)),n=Ta(m,c);if(n instanceof ja){if("break"==n.L)break;if("return"==n.L)return n}}}
var Fb=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);var d=this.h();return Eb(function(e){d.set(a,e);return d},b,c)},Gb=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);var d=this.h();return Eb(function(e){var f=qa(d);f.Uc(a,e);return f},b,c)},Hb=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);var d=this.h();return Eb(function(e){var f=qa(d);f.add(a,e);return f},b,c)},Ib=function(a){return this.h().get(this.evaluate(a))},
Jb=function(a,b){var c;a=this.evaluate(a);b=this.evaluate(b);if(void 0===a||null===a)throw Error("TypeError: cannot access property of "+a+".");a instanceof Ua||a instanceof g||a instanceof Ra?c=a.get(b):"string"==typeof a&&("length"==b?c=a.length:ka(b)&&(c=a[b]));return c},Kb=function(a,b){return this.evaluate(a)>this.evaluate(b)},Lb=function(a,b){return this.evaluate(a)>=this.evaluate(b)},Mb=function(a,b){return this.evaluate(a)===this.evaluate(b)},Nb=function(a,b){return this.evaluate(a)!==this.evaluate(b)},
Ob=function(a,b,c){var d=[];this.evaluate(a)?d=this.evaluate(b):c&&(d=this.evaluate(c));var e=this.$c(d);if(e instanceof ja)return e},Pb=function(a,b){return this.evaluate(a)<this.evaluate(b)},Qb=function(a,b){return this.evaluate(a)<=this.evaluate(b)},Rb=function(a,b){return this.evaluate(a)%this.evaluate(b)},Sb=function(a,b){return this.evaluate(a)*this.evaluate(b)},Tb=function(a){return-this.evaluate(a)},Ub=function(a){return!this.evaluate(a)},Vb=function(a,b){return this.evaluate(a)!=this.evaluate(b)},
Wb=function(){return null},Xb=function(a,b){return this.evaluate(a)||this.evaluate(b)},Yb=function(a,b){var c=this.evaluate(a);this.evaluate(b);return c},Zb=function(a){return this.evaluate(a)},$b=function(a){return Array.prototype.slice.apply(arguments)},ac=function(a){return new ja("return",this.evaluate(a))},bc=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(null===a||void 0===a)throw Error("TypeError: Can't set property "+b+" of "+a+".");(a instanceof Ra||a instanceof
g||a instanceof Ua)&&a.set(b,c);return c},cc=function(a,b){return this.evaluate(a)-this.evaluate(b)},dc=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(!wa(b)||!wa(c))throw Error("Error: Malformed switch instruction.");for(var d,e=!1,f=0;f<b.length;f++)if(e||a===this.evaluate(b[f]))if(d=this.evaluate(c[f]),d instanceof ja){var h=d.L;if("break"==h)return;if("return"==h||"continue"==h)return d}else e=!0;if(c.length==b.length+1&&(d=this.evaluate(c[c.length-1]),d instanceof
ja&&("return"==d.L||"continue"==d.L)))return d},ec=function(a,b,c){return this.evaluate(a)?this.evaluate(b):this.evaluate(c)},fc=function(a){a=this.evaluate(a);return a instanceof Ra?"function":typeof a},gc=function(a){for(var b=this.h(),c=0;c<arguments.length;c++){var d=arguments[c];"string"!=typeof d||b.add(d,void 0)}},hc=function(a,b,c,d){var e,f=this.evaluate(d);if(this.evaluate(c)&&(e=this.$c(f),e instanceof ja)){if("break"==e.L)return;if("return"==e.L)return e}for(;this.evaluate(a);){e=this.$c(f);
if(e instanceof ja){if("break"==e.L)break;if("return"==e.L)return e}this.evaluate(b)}},ic=function(a){return~Number(this.evaluate(a))},jc=function(a,b){return Number(this.evaluate(a))<<Number(this.evaluate(b))},kc=function(a,b){return Number(this.evaluate(a))>>Number(this.evaluate(b))},lc=function(a,b){return Number(this.evaluate(a))>>>Number(this.evaluate(b))},mc=function(a,b){return Number(this.evaluate(a))&Number(this.evaluate(b))},nc=function(a,b){return Number(this.evaluate(a))^Number(this.evaluate(b))},
oc=function(a,b){return Number(this.evaluate(a))|Number(this.evaluate(b))};var rc=function(){this.Je=!1;this.ca=new ib;pc(this);this.Je=!0};rc.prototype.fh=function(){return this.Je};rc.prototype.isInitialized=rc.prototype.fh;rc.prototype.Va=function(a){return this.ca.Ad(a)};rc.prototype.execute=rc.prototype.Va;rc.prototype.xc=function(a,b){return this.ca.xc(a,b)};rc.prototype.runProgram=rc.prototype.xc;rc.prototype.P=function(){this.ca.P()};rc.prototype.makeImmutable=rc.prototype.P;
var pc=function(a){function b(f,h){e.ca.oe(f,String(h))}function c(f,h){e.ca.ya(String(d[f]),h)}var d=lb,e=a;b("control",d.CONTROL);b("fn",d.FN);b("list",d.CREATE_ARRAY);b("map",d.CREATE_OBJECT);b("undefined",d.UNDEFINED);c("ADD",pb);c("AND",qb);c("APPLY",rb);c("ASSIGN",sb);c("BLOCK",tb);c("BREAK",vb);c("CASE",wb);c("CONST",xb);c("CONTINUE",yb);c("DEFAULT",wb);c("DEFN",zb);c("DIVIDE",Ab);c("EQUALS",Bb);c("EXPRESSION_LIST",Db);c("FOR_IN",Fb);c("FOR_IN_CONST",Gb);c("FOR_IN_LET",Hb);c("GET",Ib);c("GET_INDEX",
Jb);c("GET_PROPERTY",Jb);c("GREATER_THAN",Kb);c("GREATER_THAN_EQUALS",Lb);c("IDENTITY_EQUALS",Mb);c("IDENTITY_NOT_EQUALS",Nb);c("IF",Ob);c("LESS_THAN",Pb);c("LESS_THAN_EQUALS",Qb);c("MODULUS",Rb);c("MULTIPLY",Sb);c("NEGATE",Tb);c("NOT",Ub);c("NOT_EQUALS",Vb);c("NULL",Wb);c("OR",Xb);c("POST_DECREMENT",Yb);c("POST_INCREMENT",Yb);c("PRE_DECREMENT",Zb);c("PRE_INCREMENT",Zb);c("QUOTE",$b);c("RETURN",ac);c("SET_PROPERTY",bc);c("SUBTRACT",cc);c("SWITCH",dc);c("TERNARY",ec);c("TYPEOF",fc);c("VAR",gc);c("WHILE",
hc);c("BITWISE_NOT",ic);c("BITWISE_LEFT_SHIFT",jc);c("BITWISE_RIGHT_SHIFT",kc);c("BITWISE_UNSIGNED_RIGHT_SHIFT",lc);c("BITWISE_AND",mc);c("BITWISE_XOR",nc);c("BITWISE_OR",oc)};rc.prototype.ya=function(a,b){this.ca.ya(a,b)};rc.prototype.addInstruction=rc.prototype.ya;rc.prototype.O=function(){return this.ca.O()};rc.prototype.getQuota=rc.prototype.O;rc.prototype.wc=function(){this.ca.wc()};rc.prototype.resetQuota=rc.prototype.wc;rc.prototype.Ia=function(a){this.ca.Ia(a)};rc.prototype.ra=function(a){this.ca.ra(a)};
rc.prototype.setJavaScriptProxy=rc.prototype.ra;
var sc=[],tc={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},uc=function(a){return tc[a]},vc=/[\x00\x22\x26\x27\x3c\x3e]/g;var zc=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,Ac={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},Bc=function(a){return Ac[a]};sc[7]=function(a){return String(a).replace(zc,Bc)};
sc[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(zc,Bc)+"'"}};var Hc=/['()]/g,Ic=function(a){return"%"+a.charCodeAt(0).toString(16)};sc[12]=function(a){var b=
encodeURIComponent(String(a));Hc.lastIndex=0;return Hc.test(b)?b.replace(Hc,Ic):b};var Jc=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,Kc={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},Lc=function(a){return Kc[a]};sc[16]=function(a){return a};var Nc,Oc=[],Pc=[],Qc=[],Rc=[],Sc=[],Tc={},Uc,Vc,Wc,Xc=function(a,b){var c={};c["function"]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);return c},Zc=function(a,b){var c=a["function"];if(!c)throw Error("Error: No function name given for function call.");var d=!!Tc[c],e={},f;for(f in a)a.hasOwnProperty(f)&&0===f.indexOf("vtp_")&&(e[d?f:f.substr(4)]=a[f]);return d?Tc[c](e):Nc(c,e,b)},ad=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=$c(a[e],b,c));return d},
bd=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";var c=Tc[b];return c?c.priorityOverride||0:0},$c=function(a,b,c){if(wa(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push($c(a[e],b,c));return d;case "macro":var f=a[1];if(c[f])return;var h=Oc[f];if(!h||b.gd(h))return;c[f]=!0;try{var k=ad(h,b,c);k.vtp_gtmEventId=b.id;d=Zc(k,b);Wc&&(d=Wc.vg(d,k))}catch(w){b.Ne&&b.Ne(w,Number(f)),d=!1}c[f]=!1;return d;
case "map":d={};for(var l=1;l<a.length;l+=2)d[$c(a[l],b,c)]=$c(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,n=1;n<a.length;n++){var p=$c(a[n],b,c);Vc&&(m=m||p===Vc.Tb);d.push(p)}return Vc&&m?Vc.yg(d):d.join("");case "escape":d=$c(a[1],b,c);if(Vc&&wa(a[1])&&"macro"===a[1][0]&&Vc.gh(a))return Vc.xh(d);d=String(d);for(var t=2;t<a.length;t++)sc[a[t]]&&(d=sc[a[t]](d));return d;case "tag":var q=a[1];if(!Rc[q])throw Error("Unable to resolve tag reference "+q+".");return d={ye:a[2],index:q};case "zb":var r=
{arg0:a[2],arg1:a[3],ignore_case:a[5]};r["function"]=a[1];var v=cd(r,b,c);a[4]&&(v=!v);return v;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},cd=function(a,b,c){try{return Uc(ad(a,b,c))}catch(d){JSON.stringify(a)}return null};var dd=function(){var a=function(b){return{toString:function(){return b}}};return{Md:a("convert_case_to"),Nd:a("convert_false_to"),Od:a("convert_null_to"),Pd:a("convert_true_to"),Qd:a("convert_undefined_to"),ii:a("debug_mode_metadata"),xa:a("function"),Jf:a("instance_name"),Kf:a("live_only"),Lf:a("malware_disabled"),Mf:a("metadata"),ki:a("original_vendor_template_id"),Nf:a("once_per_event"),he:a("once_per_load"),ie:a("setup_tags"),je:a("tag_id"),ke:a("teardown_tags")}}();var ed=function(a,b,c){this.vh=a;this.sh=b;this.lh=c};fa(ed,Error);ed.prototype.getParameters=function(){return this.sh};var fd=function(a,b){if(wa(a)){Object.defineProperty(a,"context",{value:{line:b[0]}});for(var c=1;c<a.length;c++)fd(a[c],b[c])}};var hd=function(){return function(a,b){a instanceof gd||(a=new gd(a));b&&a.ve.push(b);throw a;}},gd=function(a){this.qh=a;this.ve=[]};fa(gd,Error);var id=null,ld=function(a){function b(p){for(var t=0;t<p.length;t++)d[p[t]]=!0}var c=[],d=[];id=jd(a);for(var e=0;e<Pc.length;e++){var f=Pc[e],h=kd(f);if(h){for(var k=f.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(f.block||[])}else null===h&&b(f.block||[])}for(var m=[],n=0;n<Rc.length;n++)c[n]&&!d[n]&&(m[n]=!0);return m},kd=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=id(b[c]);if(!d)return null===d?null:!1}for(var e=a.unless||[],f=0;f<e.length;f++){var h=id(e[f]);if(null===h)return null;
if(h)return!1}return!0},jd=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=cd(Qc[c],a));return b[c]}};function md(a,b,c,d){if(a)for(var e=0;e<a.length;e++){var f=void 0,h="A policy function denied the permission request";try{f=a[e].call(void 0,b,c,d),h+="."}catch(k){h="string"===typeof k?h+(": "+k):k instanceof Error?h+(": "+k.message):h+"."}if(!f)throw new ed(c,d,h);}}var pd=function(a){var b=nd,c=od.o;return function(){var d=arguments[0];if(d){var e=b.Bb[d],f=b.Bb.all;if(e||f){var h=a.apply(void 0,Array.prototype.slice.call(arguments,0));md(e,c,d,h);md(f,c,d,h)}}}};var qd={};function rd(a){throw sd(a,{},"The requested permission "+a+" is not configured.");}
var td=function(a){var b={},c=pd(function(){var d=arguments[0];return d&&b[d]?b[d].apply(void 0,Array.prototype.slice.call(arguments,0)):{}});Ca(a,function(d,e){var f={};Ca(e,function(h,k){var l,m=Xc(h,k);m.vtp_permissionName=h;m.vtp_createPermissionError=sd;l=Zc(m);f[h]=l.assert;b[h]||(b[h]=l.K)});qd[d]=function(h,k){var l=f[h]||rd,m=Array.prototype.slice.call(arguments,0);l.apply(void 0,m);c.apply(void 0,m)}})};function sd(a,b,c){return new ed(a,b,c)};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var ud,vd=function(){};(function(){function a(k,l){k=k||"";l=l||{};for(var m in b)b.hasOwnProperty(m)&&(l.eg&&(l["fix_"+m]=!0),l.ze=l.ze||l["fix_"+m]);var n={comment:/^\x3c!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var q=k.indexOf("--\x3e");if(0<=q)return{content:k.substr(4,q),length:q+3}},endTag:function(){var q=k.match(d);if(q)return{tagName:q[1],length:q[0].length}},atomicTag:function(){var q=p.startTag();
if(q){var r=k.slice(q.length);if(r.match(new RegExp("</\\s*"+q.tagName+"\\s*>","i"))){var v=r.match(new RegExp("([\\s\\S]*?)</\\s*"+q.tagName+"\\s*>","i"));if(v)return{tagName:q.tagName,M:q.M,content:v[1],length:v[0].length+q.length}}}},startTag:function(){var q=k.match(c);if(q){var r={};q[2].replace(e,function(v,w,y,x,A){var z=y||x||A||f.test(w)&&w||null,B=document.createElement("div");B.innerHTML=z;r[w]=B.textContent||B.innerText||z});return{tagName:q[1],M:r,Hb:!!q[3],length:q[0].length}}},chars:function(){var q=
k.indexOf("<");return{length:0<=q?q:k.length}}},t=function(){for(var q in n)if(n[q].test(k)){var r=p[q]();return r?(r.type=r.type||q,r.text=k.substr(0,r.length),k=k.slice(r.length),r):null}};l.ze&&function(){var q=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,r=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,v=[];v.Me=function(){return this[this.length-1]};v.ld=function(B){var E=this.Me();return E&&E.tagName&&E.tagName.toUpperCase()===B.toUpperCase()};v.ug=
function(B){for(var E=0,F;F=this[E];E++)if(F.tagName===B)return!0;return!1};var w=function(B){B&&"startTag"===B.type&&(B.Hb=q.test(B.tagName)||B.Hb);return B},y=t,x=function(){k="</"+v.pop().tagName+">"+k},A={startTag:function(B){var E=B.tagName;"TR"===E.toUpperCase()&&v.ld("TABLE")?(k="<TBODY>"+k,z()):l.vi&&r.test(E)&&v.ug(E)?v.ld(E)?x():(k="</"+B.tagName+">"+k,z()):B.Hb||v.push(B)},endTag:function(B){v.Me()?l.Jg&&!v.ld(B.tagName)?x():v.pop():l.Jg&&(y(),z())}},z=function(){var B=k,E=w(y());k=B;if(E&&
A[E.type])A[E.type](E)};t=function(){z();return w(y())}}();return{append:function(q){k+=q},Gh:t,Ai:function(q){for(var r;(r=t())&&(!q[r.type]||!1!==q[r.type](r)););},clear:function(){var q=k;k="";return q},Bi:function(){return k},stack:[]}}var b=function(){var k={},l=this.document.createElement("div");l.innerHTML="<P><I></P></I>";k.Gi="<P><I></P></I>"!==l.innerHTML;l.innerHTML="<P><i><P></P></i></P>";k.Ci=2===l.childNodes.length;return k}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,f=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;a.supports=b;a.Hi=function(k){var l={comment:function(m){return"<--"+m.content+"--\x3e"},endTag:function(m){return"</"+m.tagName+">"},atomicTag:function(m){return l.startTag(m)+m.content+l.endTag(m)},startTag:function(m){var n="<"+m.tagName,p;for(p in m.M){var t=m.M[p];
n+=" "+p+'="'+(t?t.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"'}return n+(m.Hb?"/>":">")},chars:function(m){return m.text}};return l[k.type](k)};a.ui=function(k){var l={},m;for(m in k){var n=k[m];l[m]=n&&n.replace(/(^|[^\\])"/g,'$1\\"')}return l};for(var h in b)a.jg=a.jg||!b[h]&&h;ud=a})();(function(){function a(){}function b(p){return void 0!==p&&null!==p}function c(p,t,q){var r,v=p&&p.length||0;for(r=0;r<v;r++)t.call(q,p[r],r)}function d(p,t,q){for(var r in p)p.hasOwnProperty(r)&&t.call(q,r,p[r])}function e(p,
t){d(t,function(q,r){p[q]=r});return p}function f(p,t){p=p||{};d(t,function(q,r){b(p[q])||(p[q]=r)});return p}function h(p){try{return m.call(p)}catch(q){var t=[];c(p,function(r){t.push(r)});return t}}var k={Uf:a,Vf:a,Wf:a,Xf:a,fg:a,gg:function(p){return p},done:a,error:function(p){throw p;},Kh:!1},l=this;if(!l.postscribe){var m=Array.prototype.slice,n=function(){function p(q,r,v){var w="data-ps-"+r;if(2===arguments.length){var y=q.getAttribute(w);return b(y)?String(y):y}b(v)&&""!==v?q.setAttribute(w,
v):q.removeAttribute(w)}function t(q,r){var v=q.ownerDocument;e(this,{root:q,options:r,Jb:v.defaultView||v.parentWindow,Ta:v,uc:ud("",{eg:!0}),Tc:[q],wd:"",xd:v.createElement(q.nodeName),Fb:[],Ja:[]});p(this.xd,"proxyof",0)}t.prototype.write=function(){[].push.apply(this.Ja,arguments);for(var q;!this.gc&&this.Ja.length;)q=this.Ja.shift(),"function"===typeof q?this.ng(q):this.Id(q)};t.prototype.ng=function(q){var r={type:"function",value:q.name||q.toString()};this.td(r);q.call(this.Jb,this.Ta);this.Qe(r)};
t.prototype.Id=function(q){this.uc.append(q);for(var r,v=[],w,y;(r=this.uc.Gh())&&!(w=r&&"tagName"in r?!!~r.tagName.toLowerCase().indexOf("script"):!1)&&!(y=r&&"tagName"in r?!!~r.tagName.toLowerCase().indexOf("style"):!1);)v.push(r);this.gi(v);w&&this.Tg(r);y&&this.Ug(r)};t.prototype.gi=function(q){var r=this.kg(q);r.ne&&(r.dd=this.wd+r.ne,this.wd+=r.Ch,this.xd.innerHTML=r.dd,this.ei())};t.prototype.kg=function(q){var r=this.Tc.length,v=[],w=[],y=[];c(q,function(x){v.push(x.text);if(x.M){if(!/^noscript$/i.test(x.tagName)){var A=
r++;w.push(x.text.replace(/(\/?>)/," data-ps-id="+A+" $1"));"ps-script"!==x.M.id&&"ps-style"!==x.M.id&&y.push("atomicTag"===x.type?"":"<"+x.tagName+" data-ps-proxyof="+A+(x.Hb?" />":">"))}}else w.push(x.text),y.push("endTag"===x.type?x.text:"")});return{Ii:q,raw:v.join(""),ne:w.join(""),Ch:y.join("")}};t.prototype.ei=function(){for(var q,r=[this.xd];b(q=r.shift());){var v=1===q.nodeType;if(!v||!p(q,"proxyof")){v&&(this.Tc[p(q,"id")]=q,p(q,"id",null));var w=q.parentNode&&p(q.parentNode,"proxyof");
w&&this.Tc[w].appendChild(q)}r.unshift.apply(r,h(q.childNodes))}};t.prototype.Tg=function(q){var r=this.uc.clear();r&&this.Ja.unshift(r);q.src=q.M.src||q.M.li;q.src&&this.Fb.length?this.gc=q:this.td(q);var v=this;this.fi(q,function(){v.Qe(q)})};t.prototype.Ug=function(q){var r=this.uc.clear();r&&this.Ja.unshift(r);q.type=q.M.type||q.M.mi||"text/css";this.hi(q);r&&this.write()};t.prototype.hi=function(q){var r=this.mg(q);this.dh(r);q.content&&(r.styleSheet&&!r.sheet?r.styleSheet.cssText=q.content:
r.appendChild(this.Ta.createTextNode(q.content)))};t.prototype.mg=function(q){var r=this.Ta.createElement(q.tagName);r.setAttribute("type",q.type);d(q.M,function(v,w){r.setAttribute(v,w)});return r};t.prototype.dh=function(q){this.Id('<span id="ps-style"/>');var r=this.Ta.getElementById("ps-style");r.parentNode.replaceChild(q,r)};t.prototype.td=function(q){q.rh=this.Ja;this.Ja=[];this.Fb.unshift(q)};t.prototype.Qe=function(q){q!==this.Fb[0]?this.options.error({message:"Bad script nesting or script finished twice"}):
(this.Fb.shift(),this.write.apply(this,q.rh),!this.Fb.length&&this.gc&&(this.td(this.gc),this.gc=null))};t.prototype.fi=function(q,r){var v=this.lg(q),w=this.Sh(v),y=this.options.Uf;q.src&&(v.src=q.src,this.Oh(v,w?y:function(){r();y()}));try{this.bh(v),q.src&&!w||r()}catch(x){this.options.error(x),r()}};t.prototype.lg=function(q){var r=this.Ta.createElement(q.tagName);d(q.M,function(v,w){r.setAttribute(v,w)});q.content&&(r.text=q.content);return r};t.prototype.bh=function(q){this.Id('<span id="ps-script"/>');
var r=this.Ta.getElementById("ps-script");r.parentNode.replaceChild(q,r)};t.prototype.Oh=function(q,r){function v(){q=q.onload=q.onreadystatechange=q.onerror=null}var w=this.options.error;e(q,{onload:function(){v();r()},onreadystatechange:function(){/^(loaded|complete)$/.test(q.readyState)&&(v(),r())},onerror:function(){var y={message:"remote script failed "+q.src};v();w(y);r()}})};t.prototype.Sh=function(q){return!/^script$/i.test(q.nodeName)||!!(this.options.Kh&&q.src&&q.hasAttribute("async"))};
return t}();l.postscribe=function(){function p(){var w=r.shift(),y;w&&(y=w[w.length-1],y.Vf(),w.stream=t.apply(null,w),y.Wf())}function t(w,y,x){function A(F){F=x.gg(F);v.write(F);x.Xf(F)}v=new n(w,x);v.id=q++;v.name=x.name||v.id;var z=w.ownerDocument,B={close:z.close,open:z.open,write:z.write,writeln:z.writeln};e(z,{close:a,open:a,write:function(){return A(h(arguments).join(""))},writeln:function(){return A(h(arguments).join("")+"\n")}});var E=v.Jb.onerror||a;v.Jb.onerror=function(F,M,Q){x.error({xi:F+
" - "+M+":"+Q});E.apply(v.Jb,arguments)};v.write(y,function(){e(z,B);v.Jb.onerror=E;x.done();v=null;p()});return v}var q=0,r=[],v=null;return e(function(w,y,x){"function"===typeof x&&(x={done:x});x=f(x,k);w=/^#/.test(w)?l.document.getElementById(w.substr(1)):w.wi?w[0]:w;var A=[w,y,x];w.wh={cancel:function(){A.stream?A.stream.abort():A[1]=a}};x.fg(A);r.push(A);v||p();return w.wh},{streams:{},zi:r,ni:n})}();vd=l.postscribe}})();var wd=function(a){Xa(this.getName(),["uri:!string"],arguments);try{return decodeURI(a)}catch(b){}};var xd=function(a){Xa(this.getName(),["uri:!string"],arguments);try{return decodeURIComponent(a)}catch(b){}};var yd=function(a){Xa(this.getName(),["uri:!string"],arguments);return encodeURI(a)};var zd=function(a){Xa(this.getName(),["uri:!string"],arguments);return encodeURIComponent(a)};var Ad=function(a,b){Xa(this.getName(),["min:!number","max:!number"],arguments);return za(a,b)};var Bd=function(){return(new Date).getTime()};var Cd=function(a,b,c){var d=a.h().S;if(!d)throw Error("Missing program state.");d.dg.apply(null,Array.prototype.slice.call(arguments,1))};var Dd=!1;var Ed={bi:'',Gg:''},Fd=function(){Cd(this,"read_container_data");var a=new Ua;a.set("containerId",'GTM-T9S432');a.set("version",'572');a.set("environmentName",'');a.set("debugMode",Dd);a.set("previewMode",Fa(Ed.bi));a.set("environmentMode",Fa(Ed.Gg));a.P();return a};var Gd=function(a){return null===a?"null":a instanceof g?"array":a instanceof Ra?"function":typeof a};var Hd=function(a){return Ea(cb(a,this.h()))};var Id=function(a){return Number(cb(a,this.h()))};var Jd=function(a){return null===a?"null":void 0===a?"undefined":a.toString()};var Kd=function(a,b,c){Xa(this.getName(),["tableObj:!List","keyColumnName:!string","valueColumnName:!string"],arguments);for(var d=new Ua,e=!1,f=0;f<a.length();f++){var h=a.get(f);h instanceof Ua&&h.has(b)&&h.has(c)&&(d.set(h.get(b),h.get(c)),e=!0)}return e?d:null};function Ld(){var a=Math[Md].bind(Math);return function(){for(var b=[],c=this.h(),d=0;d<arguments.length;++d)b.push(cb(arguments[d],c));return a.apply(null,b)}}for(var Nd="floor ceil round max min abs pow sqrt".split(" "),Od={},Pd=0;Pd<Nd.length;Pd++){var Md=Nd[Pd];Math.hasOwnProperty(Md)&&(Od[Md]=Ld())};var Qd=function(a,b){var c=new Ra(a,function(){for(var d=Array.prototype.slice.call(arguments,0),e=0;e<d.length;e++)d[e]=this.evaluate(d[e]);return b.apply(this,d)});c.P();return c};var Rd=function(){var a={};return{Pg:function(b){return a.hasOwnProperty(b)?a[b]:void 0},Rh:function(b,c){a[b]=c}}},Sd=function(a,b){Xa(this.getName(),["apiName:!string","mock:?*"],arguments);};var Td=function(){this.vc={}};Td.prototype.get=function(a,b){var c=this.vc.hasOwnProperty(a)?this.vc[a]:void 0;return c};
Td.prototype.add=function(a,b){if(this.vc.hasOwnProperty(a))throw"Attempting to add a function which already exists: "+a+".";if(!b)throw"Attempting to add an undefined implementation: "+a+".";var c=this.vc,d;if(sa(b))d=Qd(a,b);else{var e=new Ua,f;for(f in b)if(b.hasOwnProperty(f)){var h=b[f];sa(h)?e.set(f,Qd(a+"_"+f,h)):(va(h)||ta(h)||"boolean"==typeof h)&&e.set(f,h)}e.P();d=e}c[a]=d};Td.prototype.addAll=function(a){for(var b in a)a.hasOwnProperty(b)&&this.add(b,a[b])};var u=window,D=document,Ud=navigator,Vd=D.currentScript&&D.currentScript.src,Wd=function(a,b){var c=u[a];u[a]=void 0===c?b:c;return u[a]},Xd=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},Yd=function(a,b,c){var d=D.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Xd(d,b);c&&(d.onerror=c);var e;if(null===ea)b:{var f=ba.document,h=f.querySelector&&f.querySelector("script[nonce]");
if(h){var k=h.nonce||h.getAttribute("nonce");if(k&&da.test(k)){ea=k;break b}}ea=""}e=ea;e&&d.setAttribute("nonce",e);var l=D.getElementsByTagName("script")[0]||D.body||D.head;l.parentNode.insertBefore(d,l);return d},Zd=function(){if(Vd){var a=Vd.toLowerCase();if(0===a.indexOf("https://"))return 2;if(0===a.indexOf("http://"))return 3}return 1},$d=function(a,b){var c=D.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=D.body&&D.body.lastChild||
D.body||D.head;d.parentNode.insertBefore(c,d);Xd(c,b);void 0!==a&&(c.src=a);return c},ae=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},be=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},ce=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},G=function(a){u.setTimeout(a,0)},de=function(a,b){return a&&
b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},ee=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},fe=function(a){var b=D.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},ge=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var f=a,h=0;f&&h<=c;h++){if(d[String(f.tagName).toLowerCase()])return f;
f=f.parentElement}return null},he=function(a,b){var c=a[b];c&&"string"===typeof c.animVal&&(c=c.animVal);return c};var H={Hc:"event_callback",hb:"event_timeout",ja:"gtag.config",Y:"allow_ad_personalization_signals",aa:"cookie_expires",gb:"cookie_update",Oa:"session_duration"};var ve=/[A-Z]+/,we=/\s/,xe=function(a){if(ta(a)&&(a=Ha(a),!we.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(ve.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],W:d}}}}},ze=function(a){for(var b={},c=0;c<a.length;++c){var d=xe(a[c]);d&&(b[d.id]=d)}ye(b);var e=[];Ca(b,function(f,h){e.push(h)});return e};
function ye(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.W[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var od={},Ae=null,Be=Math.random();od.o="GTM-T9S432";od.Xb="9b0";var Ce={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fal:!0,__fil:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0,__paused:!0},De="www.googletagmanager.com/gtm.js";var Ee=De,Fe=null,Ge=null,He=null,Ie="//www.googletagmanager.com/a?id="+od.o+"&cv=572",Je={},Ke={},Le=function(){var a=Ae.sequence||0;Ae.sequence=a+1;return a};var Me={},Ne=function(a,b){Me[a]=Me[a]||[];Me[a][b]=!0},Oe=function(a){for(var b=[],c=Me[a]||[],d=0;d<c.length;d++)c[d]&&(b[Math.floor(d/6)]^=1<<d%6);for(var e=0;e<b.length;e++)b[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b[e]||0);return b.join("")};
var Pe=function(){return"&tc="+Rc.filter(function(a){return a}).length},Ze=function(){Qe&&(u.clearTimeout(Qe),Qe=void 0);void 0===Re||Se[Re]&&!Te||(Ue[Re]||Ve.ih()||0>=We--?(Ne("GTM",1),Ue[Re]=!0):(Ve.Ih(),ae(Xe()),Se[Re]=!0,Ye=Te=""))},Xe=function(){var a=Re;if(void 0===a)return"";var b=Oe("GTM"),c=Oe("TAGGING");return[$e,Se[a]?"":"&es=1",af[a],b?"&u="+b:"",c?"&ut="+c:"",Pe(),Te,Ye,"&z=0"].join("")},bf=function(){return[Ie,"&v=3&t=t","&pid="+za(),"&rv="+od.Xb].join("")},cf="0.005000">
Math.random(),$e=bf(),df=function(){$e=bf()},Se={},Te="",Ye="",Re=void 0,af={},Ue={},Qe=void 0,Ve=function(a,b){var c=0,d=0;return{ih:function(){if(c<a)return!1;Ia()-d>=b&&(c=0);return c>=a},Ih:function(){Ia()-d>=b&&(c=0);c++;d=Ia()}}}(2,1E3),We=1E3,ef=function(a,b){if(cf&&!Ue[a]&&Re!==a){Ze();Re=a;Te="";var c;c=0===b.indexOf("gtm.")?encodeURIComponent(b):"*";af[a]="&e="+c+"&eid="+a;Qe||(Qe=u.setTimeout(Ze,500))}},ff=function(a,b,c){if(cf&&!Ue[a]&&b){a!==Re&&(Ze(),Re=a);var d=String(b[dd.xa]||"").replace(/_/g,
"");0===d.indexOf("cvt")&&(d="cvt");var e=c+d;Te=Te?Te+"."+e:"&tr="+e;Qe||(Qe=u.setTimeout(Ze,500));2022<=Xe().length&&Ze()}};var gf={},hf=new Aa,jf={},kf={},of={name:"dataLayer",set:function(a,b){C(lf(a,b),jf);mf()},get:function(a){return nf(a,2)},reset:function(){hf=new Aa;jf={};mf()}},nf=function(a,b){if(2!=b){var c=hf.get(a);if(cf){var d=pf(a);c!==d&&Ne("GTM",5)}return c}return pf(a)},pf=function(a,b,c){var d=a.split("."),e=!1,f=void 0;return e?f:rf(d)},rf=function(a){for(var b=jf,c=0;c<a.length;c++){if(null===b)return!1;if(void 0===b)break;b=b[a[c]]}return b};
var uf=function(a,b){kf.hasOwnProperty(a)||(hf.set(a,b),C(lf(a,b),jf),mf())},lf=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c},mf=function(a){Ca(kf,function(b,c){hf.set(b,c);C(lf(b,void 0),jf);C(lf(b,c),jf);a&&delete kf[b]})},vf=function(a,b,c){gf[a]=gf[a]||{};var d=1!==c?pf(b):hf.get(b);"array"===Za(d)||"object"===Za(d)?gf[a][b]=C(d):gf[a][b]=d},wf=function(a,b){if(gf[a])return gf[a][b]};var xf=function(){var a=!1;return a};var J=function(a,b,c,d){return(2===yf()||d||"http:"!=u.location.protocol?a:b)+c},yf=function(){var a=Zd(),b;if(1===a)a:{var c=Ee;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,f=1,h=D.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===f&&0===l.indexOf(d)&&(f=2)}}b=f}else b=a;return b};var Of=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),Pf={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Qf={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Rf="google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" ");
var Tf=function(a){var b=nf("gtm.whitelist");b&&Ne("GTM",9);var c=b&&Pa(Ga(b),Pf),d=nf("gtm.blacklist");d||(d=nf("tagTypeBlacklist"))&&Ne("GTM",3);
d?Ne("GTM",8):d=[];Sf()&&(d=Ga(d),d.push("nonGooglePixels","nonGoogleScripts"));0<=xa(Ga(d),"google")&&Ne("GTM",2);var e=d&&Pa(Ga(d),Qf),f={};return function(h){var k=h&&h[dd.xa];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==f[k])return f[k];var l=Ke[k]||[],m=a(k,l);if(b){var n;if(n=m)a:{if(0>xa(c,k))if(l&&0<l.length)for(var p=0;p<l.length;p++){if(0>
xa(c,l[p])){Ne("GTM",11);n=!1;break a}}else{n=!1;break a}n=!0}m=n}var t=!1;if(d){var q=0<=xa(e,k);if(q)t=q;else{var r=Ba(e,l||[]);r&&Ne("GTM",10);t=r}}var v=!m||t;v||!(0<=xa(l,"sandboxedScripts"))||c&&-1!==xa(c,"sandboxedScripts")||(v=Ba(e,Rf));return f[k]=v}},Sf=function(){return Of.test(u.location&&u.location.hostname)};var Uf={vg:function(a,b){b[dd.Md]&&"string"===typeof a&&(a=1==b[dd.Md]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(dd.Od)&&null===a&&(a=b[dd.Od]);b.hasOwnProperty(dd.Qd)&&void 0===a&&(a=b[dd.Qd]);b.hasOwnProperty(dd.Pd)&&!0===a&&(a=b[dd.Pd]);b.hasOwnProperty(dd.Nd)&&!1===a&&(a=b[dd.Nd]);return a}};var Vf={active:!0,isWhitelisted:function(){return!0}},Wf=function(a){var b=Ae.zones;!b&&a&&(b=Ae.zones=a());return b};var Xf=!1,Yf=0,Zf=[];function $f(a){if(!Xf){var b=D.createEventObject,c="complete"==D.readyState,d="interactive"==D.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Xf=!0;for(var e=0;e<Zf.length;e++)G(Zf[e])}Zf.push=function(){for(var f=0;f<arguments.length;f++)G(arguments[f]);return 0}}}function ag(){if(!Xf&&140>Yf){Yf++;try{D.documentElement.doScroll("left"),$f()}catch(a){u.setTimeout(ag,50)}}}var bg=function(a){Xf?a():Zf.push(a)};var cg={},dg={},eg=function(a,b,c,d){if(!dg[a]||Ce[b]||"__zone"===b)return-1;var e={};ab(d)&&(e=C(d,e));e.id=c;e.status="timeout";return dg[a].tags.push(e)-1},fg=function(a,b,c,d){if(dg[a]){var e=dg[a].tags[b];e&&(e.status=c,e.executionTime=d)}};function gg(a){for(var b=cg[a]||[],c=0;c<b.length;c++)b[c]();cg[a]={push:function(d){d(od.o,dg[a])}}}
var jg=function(a,b,c){dg[a]={tags:[]};sa(b)&&hg(a,b);c&&u.setTimeout(function(){return gg(a)},Number(c));return ig(a)},hg=function(a,b){cg[a]=cg[a]||[];cg[a].push(Ma(function(){return G(function(){b(od.o,dg[a])})}))};function ig(a){var b=0,c=0,d=!1;return{add:function(){c++;return Ma(function(){b++;d&&b>=c&&gg(a)})},bg:function(){d=!0;b>=c&&gg(a)}}};var kg=function(){function a(d){return!va(d)||0>d?0:d}if(!Ae._li&&u.performance&&u.performance.timing){var b=u.performance.timing.navigationStart,c=va(of.get("gtm.start"))?of.get("gtm.start"):0;Ae._li={cst:a(c-b),cbt:a(Ge-b)}}};var og=!1,pg=function(){return u.GoogleAnalyticsObject&&u[u.GoogleAnalyticsObject]},qg=!1;
var rg=function(a){u.GoogleAnalyticsObject||(u.GoogleAnalyticsObject=a||"ga");var b=u.GoogleAnalyticsObject;if(u[b])u.hasOwnProperty(b)||Ne("GTM",12);else{var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);u[b]=c}kg();return u[b]},sg=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=pg();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var ug=function(){},tg=function(){return u.GoogleAnalyticsObject||"ga"};var wg=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var xg=/:[0-9]+$/,yg=function(a,b,c,d){for(var e=[],f=a.split("&"),h=0;h<f.length;h++){var k=f[h].split("=");if(decodeURIComponent(k[0]).replace(/\+/g," ")===b){var l=k.slice(1).join("=");if(!c)return d?l:decodeURIComponent(l).replace(/\+/g," ");e.push(d?l:decodeURIComponent(l).replace(/\+/g," "))}}return c?e:void 0},Bg=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=zg(a.protocol)||zg(u.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:
u.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&(a.hostname=(a.hostname||u.location.hostname).replace(xg,"").toLowerCase());return Ag(a,b,c,d,e)},Ag=function(a,b,c,d,e){var f,h=zg(a.protocol);b&&(b=String(b).toLowerCase());switch(b){case "url_no_fragment":f=Cg(a);break;case "protocol":f=h;break;case "host":f=a.hostname.replace(xg,"").toLowerCase();if(c){var k=/^www\d*\./.exec(f);k&&k[0]&&(f=f.substr(k[0].length))}break;case "port":f=String(Number(a.port)||("http"==
h?80:"https"==h?443:""));break;case "path":a.pathname||a.hostname||Ne("TAGGING",1);f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var l=f.split("/");0<=xa(d||[],l[l.length-1])&&(l[l.length-1]="");f=l.join("/");break;case "query":f=a.search.replace("?","");e&&(f=yg(f,e,!1,void 0));break;case "extension":var m=a.pathname.split(".");f=1<m.length?m[m.length-1]:"";f=f.split("/")[0];break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},zg=function(a){return a?a.replace(":",
"").toLowerCase():""},Cg=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");b=0>c?a.href:a.href.substr(0,c)}return b},Dg=function(a){var b=D.createElement("a");a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(a||Ne("TAGGING",1),c="/"+c);var d=b.hostname.replace(xg,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}};var Ig=function(){return!1},Kg=function(a){};function Jg(a,b,c){b.containerId=od.o;var d={type:a,value:b};c.length&&(d.trace=c);return d};function Lg(a,b,c,d){var e=Rc[a],f=Mg(a,b,c,d);if(!f)return null;var h=$c(e[dd.ie],c,[]);if(h&&h.length){var k=h[0];f=Lg(k.index,{R:f,da:1===k.ye?b.terminate:f,terminate:b.terminate},c,d)}return f}
function Mg(a,b,c,d){function e(){if(f[dd.Lf])k();else{var w=ad(f,c,[]),y=eg(c.id,String(f[dd.xa]),Number(f[dd.je]),w[dd.Mf]),x=!1;w.vtp_gtmOnSuccess=function(){if(!x){x=!0;var B=Ia()-z;ff(c.id,Rc[a],"5");fg(c.id,y,"success",B);h()}};w.vtp_gtmOnFailure=function(){if(!x){x=!0;var B=Ia()-z;ff(c.id,Rc[a],"6");fg(c.id,y,"failure",B);k()}};w.vtp_gtmTagId=f.tag_id;
w.vtp_gtmEventId=c.id;ff(c.id,f,"1");var A=function(B){var E=Ia()-z;Kg(B);ff(c.id,f,"7");fg(c.id,y,"exception",E);x||(x=!0,k())};var z=Ia();try{Zc(w,c)}catch(B){A(B)}}}var f=Rc[a],h=b.R,k=b.da,l=b.terminate;if(c.gd(f))return null;var m=$c(f[dd.ke],c,[]);if(m&&m.length){var n=m[0],p=Lg(n.index,{R:h,da:k,terminate:l},c,d);if(!p)return null;h=p;k=2===n.ye?l:p}if(f[dd.he]||f[dd.Nf]){var t=f[dd.he]?Sc:c.Vh,q=h,r=k;if(!t[a]){e=Ma(e);var v=Ng(a,t,e);h=v.R;k=v.da}return function(){t[a](q,r)}}return e}
function Ng(a,b,c){var d=[],e=[];b[a]=Og(d,e,c);return{R:function(){b[a]=Pg;for(var f=0;f<d.length;f++)d[f]()},da:function(){b[a]=Qg;for(var f=0;f<e.length;f++)e[f]()}}}function Og(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function Pg(a){a()}function Qg(a,b){b()};var Tg=function(a,b){for(var c=[],d=0;d<Rc.length;d++)if(a.zb[d]){var e=Rc[d];var f=b.add();try{var h=Lg(d,{R:f,da:f,terminate:f},a,d);h?c.push({cf:d,Ue:bd(e),Va:h}):(Rg(d,a),f())}catch(l){f()}}b.bg();c.sort(Sg);for(var k=0;k<c.length;k++)c[k].Va();return 0<c.length};function Sg(a,b){var c,d=b.Ue,e=a.Ue;c=d>e?1:d<e?-1:0;var f;if(0!==c)f=c;else{var h=a.cf,k=b.cf;f=h>k?1:h<k?-1:0}return f}
function Rg(a,b){if(!cf)return;var c=function(d){var e=b.gd(Rc[d])?"3":"4",f=$c(Rc[d][dd.ie],b,[]);f&&f.length&&c(f[0].index);ff(b.id,Rc[d],e);var h=$c(Rc[d][dd.ke],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var Ug=!1,Vg=function(a,b,c,d,e){if("gtm.js"==b){if(Ug)return!1;Ug=!0}ef(a,b);var f=jg(a,d,e);vf(a,"event",1);vf(a,"ecommerce",1);vf(a,"gtm");var h={id:a,name:b,gd:Tf(c),zb:[],Vh:[],Ne:function(n){Ne("GTM",6);Kg(n)}};h.zb=ld(h);var k=Tg(h,f);
if(!k)return k;for(var l=0;l<h.zb.length;l++)if(h.zb[l]){var m=Rc[l];if(m&&!Ce[String(m[dd.xa])])return!0}return!1};var Xg=function(a,b,c,d,e){var f=this;this.eventModel=a;this.containerConfig=c||{};this.targetConfig=b||{};this.containerConfig=c||{};this.Cb=d||{};this.globalConfig=e||{};this.getWithConfig=function(h){if(f.eventModel.hasOwnProperty(h))return f.eventModel[h];if(f.targetConfig.hasOwnProperty(h))return f.targetConfig[h];if(f.containerConfig.hasOwnProperty(h))return f.containerConfig[h];if(f.Cb.hasOwnProperty(h))return f.Cb[h];if(f.globalConfig.hasOwnProperty(h))return f.globalConfig[h]}};var Yg={},Zg=["G"];Yg.df="";var $g=Yg.df.split(",");function ah(){var a=Ae;return a.gcq=a.gcq||new bh}
var ch=function(a,b){ah().register(a,b,void 0)},dh=function(a,b,c,d){ah().push("event",[b,a],c,d)},eh=function(a,b){ah().push("config",[a],b)},fh={},gh=function(){this.status=1;this.containerConfig={};this.targetConfig={};this.Cb={};this.Ve=null;this.Ie=!1},hh=function(a,b,c,d,e){this.type=a;this.$h=b;this.X=c||"";this.$b=d;this.defer=e},bh=function(){this.te={};this.De={};this.tb=[]},ih=function(a,b){var c=xe(b);return a.te[c.containerId]=a.te[c.containerId]||new gh},jh=function(a,b,c,d){if(d.X){var e=
ih(a,d.X),f=e.Ve;if(f){var h=C(c),k=C(e.targetConfig[d.X]),l=C(e.containerConfig),m=C(e.Cb),n=C(a.De),p=new Xg(h,k,l,m,n);try{f(b,d.$h,p)}catch(t){}}}};bh.prototype.register=function(a,b,c){if(3!==ih(this,a).status){ih(this,a).Ve=b;ih(this,a).status=3;c&&(ih(this,a).Cb=c);var d=xe(a),e=fh[d.containerId];if(void 0!==e){var f=nf("gtm.uniqueEventId"),h=d.prefix,k=Ia()-e;if(cf&&!Ue[f]){f!==Re&&(Ze(),Re=f);var l=""+h+Math.floor(k);Ye=Ye?Ye+"."+l:"&cl="+l}delete fh[d.containerId]}this.flush()}};
bh.prototype.push=function(a,b,c,d){var e=Math.floor(Ia()/1E3);if(c){var f=xe(c),h;if(h=f){var k;if(k=1===ih(this,c).status)a:{var l=f.prefix;k=!0}h=k}if(h&&(ih(this,c).status=2,this.push("require",[],f.containerId),fh[f.containerId]=Ia(),!xf())){var m=encodeURIComponent(f.containerId);Yd(("http:"!=u.location.protocol?"https:":
"http:")+("//www.googletagmanager.com/gtag/js?id="+m+"&l=dataLayer&cx=c"))}}this.tb.push(new hh(a,e,c,b,d));d||this.flush()};
bh.prototype.flush=function(a){for(var b=this;this.tb.length;){var c=this.tb[0];if(c.defer)c.defer=!1,this.tb.push(c);else switch(c.type){case "require":if(3!==ih(this,c.X).status&&!a)return;break;case "set":Ca(c.$b[0],function(l,m){b.De[l]=m});break;case "config":var d=c.$b[0],e=!!d[H.Rb];delete d[H.Rb];var f=ih(this,c.X),h=xe(c.X),k=h.containerId===h.id;e||(k?f.containerConfig={}:f.targetConfig[c.X]={});f.Ie&&e||jh(this,H.ja,d,c);f.Ie=!0;k?C(d,f.containerConfig):C(d,f.targetConfig[c.X]);break;case "event":jh(this,
c.$b[1],c.$b[0],c)}this.tb.shift()}};var kh=function(a,b){Xa(this.getName(),["toPath:!string","fromPath:!string"],arguments);Cd(this,"access_globals","write",a);Cd(this,"access_globals","read",b);var c=a.split("."),d=b.split("."),e=Qa(c),f=Qa(d);if(void 0===e||void 0===f)return!1;e[c[c.length-1]]=f[d[d.length-1]];return!0};var lh=function(a,b){Xa(this.getName(),["path:!string"],[a]);Cd(this,"access_globals","execute",a);for(var c=a.split("."),d=u,e=d[c[0]],f=1;e&&f<c.length;f++)d=e,e=e[c[f]];if("function"===Za(e)){for(var h=[],k=1;k<arguments.length;k++)h.push(cb(arguments[k],this.h()));return bb((0,this.h().qc)(e,d,h),this.h())}};var mh=function(a){Xa(this.getName(),["fn:!Fn"],arguments);var b=this.h();G(function(){a instanceof Ra&&a.Ga(b)})};var nh=function(a){Xa(this.getName(),["path:!string"],arguments);Cd(this,"access_globals","read",a);var b=a.split("."),c=u,d;for(d=0;d<b.length-1;d++)if(c=c[b[d]],null==c)return;return bb(c[b[d]],this.h())};var oh=function(a,b){Xa(this.getName(),["functionPath:!string","arrayPath:!string"],arguments);Cd(this,"access_globals","readwrite",a);Cd(this,"access_globals","readwrite",b);var c=a.split("."),d=Qa(c),e=c[c.length-1];if(void 0===d)throw Error("Path "+a+" does not exist.");var f=d[e];if(f&&!sa(f))return null;if(f)return bb(f,this.h());var h;f=function(){if(!sa(h.push))throw Error("Object at "+b+" in window is not an array.");h.push.call(h,arguments)};d[e]=f;var k=b.split("."),l=Qa(k),m=k[k.length-
1];if(void 0===l)throw Error("Path "+k+" does not exist.");h=l[m];void 0===h&&(h=[],l[m]=h);return bb(function(){f.apply(f,Array.prototype.slice.call(arguments,0))},this.h())};var ph=function(a){Xa(this.getName(),["path:!string"],arguments);Cd(this,"access_globals","readwrite",a);var b=a.split("."),c=Qa(b),d=b[b.length-1];if(void 0===c)throw Error("Path "+a+" does not exist.");var e=c[d];void 0===e&&(e=[],c[d]=e);return bb(function(){if(!sa(e.push))throw Error("Object at "+a+" in window is not an array.");e.push.apply(e,Array.prototype.slice.call(arguments,0))},this.h())};var qh=function(a,b,c){for(var d=[],e=String(b||document.cookie).split(";"),f=0;f<e.length;f++){var h=e[f].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d},th=function(a,b,c,d){var e=rh(a,d);if(1===e.length)return e[0].id;if(0!==e.length){e=sh(e,function(f){return f.hc},b);if(1===e.length)return e[0].id;e=sh(e,function(f){return f.Ab},c);return e[0]?e[0].id:void 0}};
function uh(a,b,c){var d=document.cookie;document.cookie=a;var e=document.cookie;return d!=e||void 0!=c&&0<=qh(b,e).indexOf(c)}
var xh=function(a,b,c,d,e){var f;if(void 0==b)f=a+"=deleted; expires="+(new Date(0)).toUTCString();else{d&&(b=encodeURIComponent(b));var h=b;h&&1200<h.length&&(h=h.substring(0,1200));b=h;f=a+"="+b}var k=void 0,l=void 0,m;for(m in c)if(c.hasOwnProperty(m)){var n=c[m];if(null!=n)switch(m){case "secure":n&&(f+="; secure");break;case "domain":k=n;break;default:"path"==m&&(l=n),"expires"==m&&n instanceof Date&&(n=n.toUTCString()),f+="; "+m+"="+n}}if("auto"===k){for(var p=vh(),t=void 0,q=0,r=0;r<p.length;++r){var v=
"none"!=p[r]?p[r]:void 0;if(e){c.domain=v;try{e(a,c)}catch(w){t=w;continue}}q+=1;if(!wh(v,l)&&uh(f+(v?"; domain="+v:""),a,b))return!0}if(t&&!q)throw t;return!1}e&&e(a,c);k&&"none"!=k&&(f+="; domain="+k);return!wh(k,l)&&uh(f,a,b)},yh=function(a,b,c,d,e,f){d=d||"auto";var h={path:c||"/"};e&&(h.expires=e);"none"!==d&&(h.domain=d);return xh(a,b,h,f)};
function sh(a,b,c){for(var d=[],e=[],f,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===f||l<f?(e=[k],f=l):l===f&&e.push(k)}return 0<d.length?d:e}function rh(a,b){for(var c=[],d=qh(a),e=0;e<d.length;e++){var f=d[e].split("."),h=f.shift();if(!b||-1!==b.indexOf(h)){var k=f.shift();k&&(k=k.split("-"),c.push({id:f.join("."),hc:1*k[0]||1,Ab:1*k[1]||1}))}}return c}
var zh=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ah=/(^|\.)doubleclick\.net$/i,wh=function(a,b){return Ah.test(document.location.hostname)||"/"===b&&zh.test(a)},vh=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));var e=document.location.hostname;Ah.test(e)||zh.test(e)||a.push("none");return a};var Bh=function(a,b){b=void 0===b?!0:b;Xa(this.getName(),["name:!string","decode:?boolean"],arguments);Cd(this,"get_cookies",a);return bb(qh(a,void 0,!!b),this.h())};var Ch=function(a,b){Xa(this.getName(),["queryKey:!string","retrieveAll:?boolean"],arguments);Cd(this,"get_url","query",a);var c=Bg(Dg(u.location.href),"query"),d=yg(c,a,b);return bb(d,this.h())};var Dh=function(a,b){Xa(this.getName(),["queryKey:!string","retrieveAll:?boolean"],arguments);Cd(this,"get_referrer","query",a);var c=Bg(Dg(u.document.referrer),"query"),d=yg(c,a,b);return bb(d,this.h())};var Eh=function(a){Xa(this.getName(),["component:?string"],arguments);Cd(this,"get_referrer",a);return Ag(Dg(u.document.referrer),a)};var Fh=function(a){Xa(this.getName(),["component:?string"],arguments);Cd(this,"get_url",a);return Bg(Dg(u.location.href),a)};var Gh=function(a,b){Xa(this.getName(),["url:!string","onSuccess:?Fn"],arguments);Cd(this,"inject_hidden_iframe",a);var c=this.h();$d(a,function(){b instanceof Ra&&b.Ga(c)})};var Hh={},Ih=function(a,b,c,d){Xa(this.getName(),["url:!string","onSuccess:?Fn","onFailure:?Fn","cacheToken:?string"],arguments);Cd(this,"inject_script",a);var e=this.h(),f=function(){b instanceof Ra&&b.Ga(e)},h=function(){c instanceof Ra&&c.Ga(e)};if(d){var k=d;Hh[k]?(Hh[k].onSuccess.push(f),Hh[k].onFailure.push(h)):(Hh[k]={onSuccess:[f],onFailure:[h]},f=function(){for(var l=Hh[k].onSuccess,m=0;m<l.length;m++)G(l[m]);l.push=function(n){G(n);return 0}},h=function(){for(var l=Hh[k].onFailure,m=0;m<
l.length;m++)G(l[m]);Hh[k]=null},Yd(a,f,h))}else Yd(a,f,h)};var Jh=function(){try{Cd(this,"logging")}catch(c){return}if(console){for(var a=Array.prototype.slice.call(arguments,0),b=0;b<a.length;b++)a[b]=cb(a[b],this.h());console.log.apply(console,a)}};var Kh=function(a,b){Xa(this.getName(),["permission:!string"],[a]);for(var c=Array.prototype.slice.call(arguments,0),d=0;d<c.length;++d)c[d]=cb(c[d],this.h());c.unshift(this);try{return Cd.apply(null,c),!0}catch(e){return!1}};var Lh=function(a,b,c){Xa(this.getName(),["url:!string","onSuccess:?Fn","onFailure:?Fn"],arguments);Cd(this,"send_pixel",a);var d=this.h();ae(a,function(){b instanceof Ra&&b.Ga(d)},function(){c instanceof Ra&&c.Ga(d)})};var Mh=function(a,b,c,d){var e=this;d=void 0===d?!0:d;Xa(this.getName(),["name:!string","value:?string","options:?Map","encode:?boolean"],arguments);var f=c?cb(c,this.h()):void 0;return xh(a,b,f,!!d,function(h,k){return Cd(e,"set_cookies",h,k)})};var Nh=function(a,b,c){Xa(this.getName(),["path:!string","value:?*","overrideExisting:?boolean"],arguments);Cd(this,"access_globals","readwrite",a);var d=a.split("."),e=u,f;for(f=0;f<d.length-1;f++)if(e=e[d[f]],void 0===e)return!1;return void 0===e[d[f]]||c?(e[d[f]]=cb(b,this.h()),!0):!1};var Rh=function(a,b,c){var d=this;Xa(this.getName(),["input:!string","onSuccess:!Fn","onFailure:?Fn"],arguments);c=c||new Ra("emptyFn",function(){});var e=u.msCrypto,f=u.crypto,h=Oh(a);if(f&&f.subtle)f.subtle.digest("SHA-256",h).then(function(l){return void b.s(d.h(),Ph(l))},function(l){return void c.s(d.h(),Qh(l.name,l.message))});else if(e&&e.subtle){var k=e.subtle.digest("SHA-256",h);k.oncomplete=function(l){return void b.s(d.h(),Ph(l.target.result))};k.onerror=function(l){return void c.s(d.h(),
Qh(l.target.result.name,l.target.result.message))}}else c.s(this.h(),Qh("BrowserNotSupported","This method is not supported in this browser."))};function Ph(a){for(var b=new Uint8Array(a),c=Array(b.length),d=0;d<b.length;d++)c[d]=b[d];var e=c.map(function(f){return String.fromCharCode(f)}).join("");return u.btoa(e)}function Qh(a,b){var c=new Ua;c.set("name",a);c.set("message",b);return c}
function Oh(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}for(var f=new Uint8Array(b.length),h=0;h<b.length;h++)f[h]=b[h];return f};function Sh(a){Xa(this.getName(),["callback:!Fn"],arguments);Cd(this,"read_event_metadata");var b=this.h().S;if(!b)throw Error("invalid program state");var c=b.eventId;va(c)&&hg(c,cb(a))}function Th(a,b){Xa(this.getName(),["key:!string","dataLayerVersion:?number"],arguments);Cd(this,"read_data_layer",a);return bb(nf(a,b||2),this.h())}function Uh(){Cd(this,"read_character_set");return D.characterSet||""}function Vh(){Cd(this,"read_title");return D.title||""}
var Wh=function(){var a=new Td;xf()?a.addAll({injectHiddenIframe:ra,injectScript:ra}):a.addAll({injectHiddenIframe:Gh,injectScript:Ih});var b=Lh;a.addAll({aliasInWindow:kh,addEventCallback:Sh,callInWindow:lh,callLater:mh,copyFromDataLayer:Th,copyFromWindow:nh,createQueue:ph,createArgumentsQueue:oh,encodeUri:yd,encodeUriComponent:zd,
generateRandom:Ad,getCookieValues:Bh,getQueryParameters:Ch,getReferrerQueryParameters:Dh,getReferrerUrl:Eh,getTimestamp:Bd,getUrl:Fh,logToConsole:Jh,makeInteger:Hd,makeString:Jd,makeTableMap:Kd,queryPermission:Kh,readCharacterSet:Uh,readTitle:Vh,sendPixel:b,setCookie:Mh,setInWindow:Nh});a.add("Math",Od);a.add("decodeUri",wd),a.add("decodeUriComponent",
xd);a.add("sha256",Rh);a.add("makeNumber",Id);a.add("getType",Gd);
return function(c){var d=a.get(c,this);if(d)return d;throw Error(c+" is not a valid API name.");}};var Xh,nd=new function(){this.Bb={}};
function Yh(){var a=data.runtime||[],b=data.runtime_lines;Xh=new rc;Zh();Nc=function(e,f,h){$h(f);var k=new Ua;Ca(f,function(n,p){k.set(n,bb(p))});Xh.Ia(hd());var l={dg:qd[e]||rd,eventId:void 0!==h?h.id:void 0,pd:Ig()?Rd():void 0},m=Xh.xc(l,[e,k]);Xh.Ia(void 0);m instanceof ja&&"return"===m.L&&(m=m.getData());return cb(m)};Xh.ya("require",Wh());for(var c=0;c<a.length;c++){var d=a[c];if(!wa(d)||3>d.length){if(0===d.length)continue;break}b&&b[c]&&b[c].length&&fd(d,b[c]);Xh.Va(d)}}
function $h(a){var b=a.gtmOnSuccess,c=a.gtmOnFailure;sa(b)&&(a.gtmOnSuccess=function(){G(b)});sa(c)&&(a.gtmOnFailure=function(){G(c)})}function Zh(){var a=Xh;Ae.SANDBOXED_JS_SEMAPHORE=Ae.SANDBOXED_JS_SEMAPHORE||0;a.ra(function(b,c,d){Ae.SANDBOXED_JS_SEMAPHORE++;try{return b.apply(c,d)}finally{Ae.SANDBOXED_JS_SEMAPHORE--}})};var ai="".split(/,/),bi=null,ci={},di={},ei,fi=function(a,b){var c={event:a};b&&(c.eventModel=C(b),b[H.Hc]&&(c.eventCallback=b[H.Hc]),b[H.hb]&&(c.eventTimeout=b[H.hb]));return c};
var li={config:function(a){},event:function(a){var b=
a[1];if(ta(b)&&!(3<a.length)){var c;if(2<a.length){if(!ab(a[2]))return;c=a[2]}var d=fi(b,c);return d}},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(a){if(3===a.length){var b=a[1],c=a[2],d=nd;d.Bb[b]?d.Bb[b].push(c):d.Bb[b]=[c]}},set:function(a){var b;2==a.length&&ab(a[1])?b=C(a[1]):3==a.length&&ta(a[1])&&(b={},b[a[1]]=a[2]);if(b){b._clear=!0;return b}}},mi={policy:!0};var oi=function(a){return ni?D.querySelectorAll(a):null},pi=function(a,b){if(!ni)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!D.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},qi=!1;if(D.querySelectorAll)try{var ri=D.querySelectorAll(":root");ri&&1==ri.length&&ri[0]==D.documentElement&&(qi=!0)}catch(a){}var ni=qi;var yi=function(a){if(xi(a))return a;this.di=a};yi.prototype.Sg=function(){return this.di};var xi=function(a){return!a||"object"!==Za(a)||ab(a)?!1:"getUntrustedUpdateValue"in a};yi.prototype.getUntrustedUpdateValue=yi.prototype.Sg;var zi=!1,Ai=[];function Bi(){if(!zi){zi=!0;for(var a=0;a<Ai.length;a++)G(Ai[a])}}var Ci=function(a){zi?G(a):Ai.push(a)};var Di=[],Ei=!1,Fi=function(a){return u["dataLayer"].push(a)},Gi=function(a){var b=Ae["dataLayer"],c=b?b.subscribers:1,d=0;return function(){++d===c&&a()}},Ii=function(a){var b=a._clear;Ca(a,function(f,h){"_clear"!==f&&(b&&uf(f,void 0),uf(f,h))});Fe||(Fe=a["gtm.start"]);var c=a.event;if(!c)return!1;var d=a["gtm.uniqueEventId"];d||(d=Le(),a["gtm.uniqueEventId"]=d,uf("gtm.uniqueEventId",d));He=c;var e=Hi(a);
He=null;switch(c){case "gtm.init":Ne("GTM",19),e&&Ne("GTM",20)}return e};function Hi(a){var b=a.event,c=a["gtm.uniqueEventId"],d,e=Ae.zones;d=e?e.checkState(od.o,c):Vf;return d.active?Vg(c,b,d.isWhitelisted,a.eventCallback,a.eventTimeout)?!0:!1:!1}
var Ki=function(){for(var a=!1;!Ei&&0<Di.length;){Ei=!0;delete jf.eventModel;mf();var b=Di.shift();if(null!=b){var c=xi(b);if(c){var d=b;b=xi(d)?d.getUntrustedUpdateValue():void 0;for(var e=["gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],f=0;f<e.length;f++){var h=e[f],k=nf(h,1);if(wa(k)||ab(k))k=C(k);kf[h]=k}}try{if(sa(b))try{b.call(of)}catch(r){}else if(wa(b)){var l=b;if(ta(l[0])){var m=
l[0].split("."),n=m.pop(),p=l.slice(1),t=nf(m.join("."),2);if(void 0!==t&&null!==t)try{t[n].apply(t,p)}catch(r){}}}else{if(Da(b)){a:{if(b.length&&ta(b[0])){var q=li[b[0]];if(q&&(!c||!mi[b[0]])){b=q(b);break a}}b=void 0}if(!b){Ei=!1;continue}}a=Ii(b)||a}}finally{c&&mf(!0)}}Ei=!1}return!a},Li=function(){var a=Ki();try{var b=od.o,c=u["dataLayer"].hide;if(c&&void 0!==c[b]&&c.end){c[b]=
!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}}catch(f){}return a},Mi=function(){var a=Wd("dataLayer",[]),b=Wd("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};bg(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Ci(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});b.subscribers=(b.subscribers||0)+1;var c=a.push;a.push=function(){var d;if(0<Ae.SANDBOXED_JS_SEMAPHORE){d=[];for(var e=0;e<arguments.length;e++)d[e]=
new yi(arguments[e])}else d=[].slice.call(arguments,0);var f=c.apply(a,d);Di.push.apply(Di,d);if(300<this.length)for(Ne("GTM",4);300<this.length;)this.shift();var h="boolean"!==typeof f||f;return Ki()&&h};Di.push.apply(Di,a.slice(0));G(Li)};var Ni;var ij={};ij.Tb=new String("undefined");
var jj=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===ij.Tb?b:a[d]);return c.join("")}};jj.prototype.toString=function(){return this.resolve("undefined")};jj.prototype.valueOf=jj.prototype.toString;ij.Pf=jj;ij.Rc={};ij.yg=function(a){return new jj(a)};var kj={};ij.Jh=function(a,b){var c=Le();kj[c]=[a,b];return c};ij.ue=function(a){var b=a?0:1;return function(c){var d=kj[c];if(d&&"function"===typeof d[b])d[b]();kj[c]=void 0}};ij.gh=function(a){for(var b=!1,c=!1,
d=2;d<a.length;d++)b=b||8===a[d],c=c||16===a[d];return b&&c};ij.xh=function(a){if(a===ij.Tb)return a;var b=Le();ij.Rc[b]=a;return'google_tag_manager["'+od.o+'"].macro('+b+")"};ij.kh=function(a,b,c){a instanceof ij.Pf&&(a=a.resolve(ij.Jh(b,c)),b=ra);return{dd:a,R:b}};var lj=function(a,b,c){function d(f,h){var k=f[h];return k}var e={event:b,"gtm.element":a,"gtm.elementClasses":d(a,"className"),"gtm.elementId":a["for"]||de(a,"id")||"","gtm.elementTarget":a.formTarget||d(a,"target")||""};c&&(e["gtm.triggers"]=c.join(","));e["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||d(a,"href")||a.src||a.code||a.codebase||
"";return e},mj=function(a){Ae.hasOwnProperty("autoEventsSettings")||(Ae.autoEventsSettings={});var b=Ae.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},nj=function(a,b,c){mj(a)[b]=c},oj=function(a,b,c,d){var e=mj(a),f=Ja(e,b,d);e[b]=c(f)},pj=function(a,b,c){var d=mj(a);return Ja(d,b,c)};var qj=function(){for(var a=Ud.userAgent+(D.cookie||"")+(D.referrer||""),b=a.length,c=u.history.length;0<c;)a+=c--^b++;var d=1,e,f,h;if(a)for(d=0,f=a.length-1;0<=f;f--)h=a.charCodeAt(f),d=(d<<6&268435455)+h+(h<<14),e=d&266338304,d=0!=e?d^e>>21:d;return[Math.round(2147483647*Math.random())^d&2147483647,Math.round(Ia()/1E3)].join(".")},tj=function(a,b,c,d){var e=rj(b);return th(a,e,sj(c),d)},uj=function(a,b,c,d){var e=""+rj(c),f=sj(d);1<f&&(e+="-"+f);return[b,e,a].join(".")},rj=function(a){if(!a)return 1;
a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},sj=function(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};var vj=["1"],wj={},Aj=function(a,b,c,d){var e=xj(a);wj[e]||yj(e,b,c)||(zj(e,qj(),b,c,d),yj(e,b,c))};function zj(a,b,c,d,e){var f=uj(b,"1",d,c);yh(a,f,c,d,0==e?void 0:new Date(Ia()+1E3*(void 0==e?7776E3:e)))}function yj(a,b,c){var d=tj(a,b,c,vj);d&&(wj[a]=d);return d}function xj(a){return(a||"_gcl")+"_au"};var Bj=function(){for(var a=[],b=D.cookie.split(";"),c=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,d=0;d<b.length;d++){var e=b[d].match(c);e&&a.push({Fd:e[1],value:e[2]})}var f={};if(!a||!a.length)return f;for(var h=0;h<a.length;h++){var k=a[h].value.split(".");"1"==k[0]&&3==k.length&&k[1]&&(f[a[h].Fd]||(f[a[h].Fd]=[]),f[a[h].Fd].push({timestamp:k[1],Mg:k[2]}))}return f};function Cj(){for(var a=Dj,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function Ej(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}
var Dj,Fj,Gj=function(a){Dj=Dj||Ej();Fj=Fj||Cj();for(var b=[],c=0;c<a.length;c+=3){var d=c+1<a.length,e=c+2<a.length,f=a.charCodeAt(c),h=d?a.charCodeAt(c+1):0,k=e?a.charCodeAt(c+2):0,l=f>>2,m=(f&3)<<4|h>>4,n=(h&15)<<2|k>>6,p=k&63;e||(p=64,d||(n=64));b.push(Dj[l],Dj[m],Dj[n],Dj[p])}return b.join("")},Hj=function(a){function b(l){for(;d<a.length;){var m=a.charAt(d++),n=Fj[m];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(m))throw Error("Unknown base64 encoding at char: "+m);}return l}Dj=Dj||Ej();Fj=Fj||
Cj();for(var c="",d=0;;){var e=b(-1),f=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|f>>4);64!=h&&(c+=String.fromCharCode(f<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var Ij;function Jj(a,b){if(!a||b===D.location.hostname)return!1;for(var c=0;c<a.length;c++)if(a[c]instanceof RegExp){if(a[c].test(b))return!0}else if(0<=b.indexOf(a[c]))return!0;return!1}
var Nj=function(){var a=Kj,b=Lj,c=Mj(),d=function(h){a(h.target||h.srcElement||{})},e=function(h){b(h.target||h.srcElement||{})};if(!c.init){be(D,"mousedown",d);be(D,"keyup",d);be(D,"submit",e);var f=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){b(this);f.call(this)};c.init=!0}},Mj=function(){var a=Wd("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var Oj=/(.*?)\*(.*?)\*(.*)/,Pj=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,Qj=/^(?:www\.|m\.|amp\.)+/,Rj=/([^?#]+)(\?[^#]*)?(#.*)?/,Sj=/(.*?)(^|&)_gl=([^&]*)&?(.*)/,Uj=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()&&(b.push(c),b.push(Gj(String(d))))}var e=b.join("*");return["1",Tj(e),e].join("*")},Tj=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||
window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=Ij)){for(var e=Array(256),f=0;256>f;f++){for(var h=f,k=0;8>k;k++)h=h&1?h>>>1^3988292384:h>>>1;e[f]=h}d=e}Ij=d;for(var l=4294967295,m=0;m<c.length;m++)l=l>>>8^Ij[(l^c.charCodeAt(m))&255];return((l^-1)>>>0).toString(36)},Wj=function(){return function(a){var b=Dg(u.location.href),c=b.search.replace("?",""),d=yg(c,"_gl",!1,!0)||"";a.query=Vj(d)||{};var e=Bg(b,"fragment").match(Sj);a.fragment=Vj(e&&
e[3]||"")||{}}},Xj=function(){var a=Wj(),b=Mj();b.data||(b.data={query:{},fragment:{}},a(b.data));var c={},d=b.data;d&&(Na(c,d.query),Na(c,d.fragment));return c},Vj=function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var f=Oj.exec(d);if(f){c=f;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var m=h[2],n=0;n<b;++n)if(m===Tj(k,n)){l=!0;break a}l=!1}if(l){for(var p={},t=k?k.split("*"):[],q=0;q<t.length;q+=2)p[t[q]]=Hj(t[q+1]);return p}}}}catch(r){}};
function Yj(a,b,c){function d(m){var n=m,p=Sj.exec(n),t=n;if(p){var q=p[2],r=p[4];t=p[1];r&&(t=t+q+r)}m=t;var v=m.charAt(m.length-1);m&&"&"!==v&&(m+="&");return m+l}c=void 0===c?!1:c;var e=Rj.exec(b);if(!e)return"";var f=e[1],h=e[2]||"",k=e[3]||"",l="_gl="+a;c?k="#"+d(k.substring(1)):h="?"+d(h.substring(1));return""+f+h+k}
function Zj(a,b,c){for(var d={},e={},f=Mj().decorators,h=0;h<f.length;++h){var k=f[h];(!c||k.forms)&&Jj(k.domains,b)&&(k.fragment?Na(e,k.callback()):Na(d,k.callback()))}if(Oa(d)){var l=Uj(d);if(c){if(a&&a.action){var m=(a.method||"").toLowerCase();if("get"===m){for(var n=a.childNodes||[],p=!1,t=0;t<n.length;t++){var q=n[t];if("_gl"===q.name){q.setAttribute("value",l);p=!0;break}}if(!p){var r=D.createElement("input");r.setAttribute("type","hidden");r.setAttribute("name","_gl");r.setAttribute("value",
l);a.appendChild(r)}}else if("post"===m){var v=Yj(l,a.action);wg.test(v)&&(a.action=v)}}}else ak(l,a,!1)}if(!c&&Oa(e)){var w=Uj(e);ak(w,a,!0)}}function ak(a,b,c){if(b.href){var d=Yj(a,b.href,void 0===c?!1:c);wg.test(d)&&(b.href=d)}}
var Kj=function(a){try{var b;a:{for(var c=a,d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var f=e.protocol;"http:"!==f&&"https:"!==f||Zj(e,e.hostname,!1)}}catch(h){}},Lj=function(a){try{if(a.action){var b=Bg(Dg(a.action),"host");Zj(a,b,!0)}}catch(c){}},bk=function(a,b,c,d){Nj();var e={callback:a,domains:b,fragment:"fragment"===c,forms:!!d};Mj().decorators.push(e)},ck=function(){var a=D.location.hostname,b=Pj.exec(D.referrer);if(!b)return!1;
var c=b[2],d=b[1],e="";if(c){var f=c.split("/"),h=f[1];e="s"===h?decodeURIComponent(f[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}var k=a.replace(Qj,""),l=e.replace(Qj,""),m;if(!(m=k===l)){var n="."+l;m=k.substring(k.length-n.length,k.length)===n}return m},dk=function(a,b){return!1===a?!1:a||b||ck()};var ek={};var fk=/^\w+$/,gk=/^[\w-]+$/,hk=/^~?[\w-]+$/,ik={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha"};function jk(a){return a&&"string"==typeof a&&a.match(fk)?a:"_gcl"}var lk=function(){var a=Dg(u.location.href),b=Bg(a,"query",!1,void 0,"gclid"),c=Bg(a,"query",!1,void 0,"gclsrc"),d=Bg(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||yg(e,"gclid",!1,void 0);c=c||yg(e,"gclsrc",!1,void 0)}return kk(b,c,d)};
function kk(a,b,c){var d={},e=function(f,h){d[h]||(d[h]=[]);d[h].push(f)};if(void 0!==a&&a.match(gk))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "3p.ds":(void 0==ek.gtm_3pds?0:ek.gtm_3pds)&&e(a,"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha")}c&&e(c,"dc");return d}var nk=function(a){var b=lk();mk(b,a)};
function mk(a,b,c){function d(p,t){var q=ok(p,e);q&&yh(q,t,h,f,l,!0)}b=b||{};var e=jk(b.prefix),f=b.domain||"auto",h=b.path||"/",k=void 0==b.od?7776E3:b.od;c=c||Ia();var l=0==k?void 0:new Date(c+1E3*k),m=Math.round(c/1E3),n=function(p){return["GCL",m,p].join(".")};a.aw&&(!0===b.Ki?d("aw",n("~"+a.aw[0])):d("aw",n(a.aw[0])));a.dc&&d("dc",n(a.dc[0]));a.gf&&d("gf",n(a.gf[0]));a.ha&&d("ha",n(a.ha[0]))}
var qk=function(a,b,c,d,e){for(var f=Xj(),h=jk(b),k=0;k<a.length;++k){var l=a[k];if(void 0!==ik[l]){var m=ok(l,h),n=f[m];if(n){var p=Math.min(pk(n),Ia()),t;b:{for(var q=p,r=qh(m,D.cookie),v=0;v<r.length;++v)if(pk(r[v])>q){t=!0;break b}t=!1}t||yh(m,n,c,d,0==e?void 0:new Date(p+1E3*(null==e?7776E3:e)),!0)}}}var w={prefix:b,path:c,domain:d};mk(kk(f.gclid,f.gclsrc),w)},ok=function(a,b){var c=ik[a];if(void 0!==c)return b+c},pk=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||
0)};function rk(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var sk=function(a,b,c,d,e){if(wa(b)){var f=jk(e);bk(function(){for(var h={},k=0;k<a.length;++k){var l=ok(a[k],f);if(l){var m=qh(l,D.cookie);m.length&&(h[l]=m.sort()[m.length-1])}}return h},b,c,d)}},tk=function(a){return a.filter(function(b){return hk.test(b)})},uk=function(a){for(var b=["aw","dc"],c=jk(a&&a.prefix),d={},e=0;e<b.length;e++)ik[b[e]]&&(d[b[e]]=ik[b[e]]);Ca(d,function(f,h){var k=qh(c+h,D.cookie);if(k.length){var l=k[0],m=pk(l),n={};n[f]=[rk(l)];mk(n,a,m)}})};var vk=/^\d+\.fls\.doubleclick\.net$/;function wk(a){var b=Dg(u.location.href),c=Bg(b,"host",!1);if(c&&c.match(vk)){var d=Bg(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function xk(a,b){if("aw"==a||"dc"==a){var c=wk("gcl"+a);if(c)return c.split(".")}var d=jk(b);if("_gcl"==d){var e;e=lk()[a]||[];if(0<e.length)return e}var f=ok(a,d),h;if(f){var k=[];if(D.cookie){var l=qh(f,D.cookie);if(l&&0!=l.length){for(var m=0;m<l.length;m++){var n=rk(l[m]);n&&-1===xa(k,n)&&k.push(n)}h=tk(k)}else h=k}else h=k}else h=[];return h}
var yk=function(){var a=wk("gac");if(a)return decodeURIComponent(a);var b=Bj(),c=[];Ca(b,function(d,e){for(var f=[],h=0;h<e.length;h++)f.push(e[h].Mg);f=tk(f);f.length&&c.push(d+":"+f.join(","))});return c.join(";")},zk=function(a,b,c,d,e){Aj(b,c,d,e);var f=wj[xj(b)],h=lk().dc||[],k=!1;if(f&&0<h.length){var l=Ae.joined_au=Ae.joined_au||{},m=b||"_gcl";if(!l[m])for(var n=0;n<h.length;n++){var p="https://adservice.google.com/ddm/regclk",t=p=p+"?gclid="+h[n]+"&auiddc="+f;Ud.sendBeacon&&Ud.sendBeacon(t)||ae(t);k=l[m]=
!0}}null==a&&(a=k);if(a&&f){var q=xj(b),r=wj[q];r&&zj(q,r,c,d,e)}};var Ak;if(3===od.Xb.length)Ak="g";else{var Bk="G";Ak=Bk}
var Ck={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:Ak,OPT:"o"},Dk=function(a){var b=od.o.split("-"),c=b[0].toUpperCase(),d=Ck[c]||"i",e=a&&"GTM"===c?b[1]:"OPT"===c?b[1]:"",f;if(3===od.Xb.length){var h=void 0;f="2"+(h||"w")}else f=
"";return f+d+od.Xb+e};var Ik=["input","select","textarea"],Jk=["button","hidden","image","reset","submit"],Kk=function(a){var b=a.tagName.toLowerCase();return!ya(Ik,function(c){return c===b})||"input"===b&&ya(Jk,function(c){return c===a.type.toLowerCase()})?!1:!0},Lk=function(a){return a.form?a.form.tagName?a.form:D.getElementById(a.form):ge(a,["form"],100)},Mk=function(a,b,c){if(!a.elements)return 0;for(var d=b.getAttribute(c),e=0,f=1;e<a.elements.length;e++){var h=a.elements[e];if(Kk(h)){if(h.getAttribute(c)===d)return f;
f++}}return 0};
var Ok=function(a){var b;if(a.hasOwnProperty("conversion_data"))b="conversion_data";else if(a.hasOwnProperty("price"))b="price";else return;var c=b,d="/pagead/conversion/"+Nk(a.conversion_id)+"/?",e=Nk(JSON.stringify(a[c])),f="https://www.googletraveladservices.com/travel/flights/clk"+d+c+"="+e;if(a.conversionLinkerEnabled){var h=xk("gf",a.cookiePrefix);if(h&&h.length)for(var k=0;k<h.length;k++)f+="&gclgf="+Nk(h[k])}ae(f,a.onSuccess,a.onFailure)},Nk=function(a){return null===a||void 0===a||0===String(a).length?
"":encodeURIComponent(String(a))};var Pk=!!u.MutationObserver,Qk=void 0,Rk=function(a){if(!Qk){var b=function(){var c=D.body;if(c)if(Pk)(new MutationObserver(function(){for(var e=0;e<Qk.length;e++)G(Qk[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;be(c,"DOMNodeInserted",function(){d||(d=!0,G(function(){d=!1;for(var e=0;e<Qk.length;e++)G(Qk[e])}))})}};Qk=[];D.body?b():G(b)}Qk.push(a)};
var Uk=function(a,b){return a.length&&b.length&&a.lastIndexOf(b)===a.length-b.length},Vk=function(a,b){var c="*"===b.charAt(b.length-1)||"/"===b||"/*"===b;Uk(b,"/*")&&(b=b.slice(0,-2));Uk(b,"?")&&(b=b.slice(0,-1));var d=b.split("*");if(!c&&1===d.length)return a===d[0];for(var e=-1,f=0;f<d.length;f++){var h=d[f];if(h){e=a.indexOf(h,e);if(-1===e||0===f&&0!==e)return!1;e+=h.length}}if(c||e===a.length)return!0;var k=d[d.length-1];return a.lastIndexOf(k)===a.length-k.length},Wk=/^[a-z0-9-]+$/i,Xk=/^https:\/\/(\*\.|)((?:[a-z0-9-]+\.)+[a-z0-9-]+)\/(.*)$/i,
Yk=function(a,b){for(var c=0;c<b.length;c++){var d;var e=a,f=b[c];if(!Xk.exec(f))throw Error("Invalid Wildcard");var h=Dg(e),k;if(!(k="https:"!=h.protocol||h.port&&"443"!=h.port)){var l;b:{var m=h.hostname.split(".");if(2>m.length)l=!1;else{for(var n=0;n<m.length;n++)if(!Wk.exec(m[n])){l=!1;break b}l=!0}}k=!l}if(k)d=!1;else{var p=f.slice(8),t=p.slice(0,p.indexOf("/")),q;var r=h.hostname,v=t;if(0!==v.indexOf("*."))q=r.toLowerCase()===v.toLowerCase();else{v=v.slice(2);var w=r.toLowerCase().indexOf(v.toLowerCase());
q=-1===w?!1:r.length===v.length?!0:r.length!==v.length+w?!1:"."===r[w-1]}if(q){var y=p.slice(p.indexOf("/"));d=Vk(h.pathname+h.search,y)?!0:!1}else d=!1}if(d)return!0}return!1};
var il=function(){var a=D.body,b=D.documentElement||a&&a.parentElement,c,d;if(D.compatMode&&"BackCompat"!==D.compatMode)c=b?b.clientHeight:0,d=b?b.clientWidth:0;else{var e=function(f,h){return f&&h?Math.min(f,h):Math.max(f,h)};Ne("GTM",7);c=e(b?b.clientHeight:0,a?a.clientHeight:0);d=e(b?b.clientWidth:0,a?a.clientWidth:0)}return{width:d,height:c}},jl=function(a){var b=il(),c=b.height,d=b.width,e=a.getBoundingClientRect(),f=e.bottom-e.top,h=e.right-e.left;return f&&h?(1-Math.min((Math.max(0-e.left,
0)+Math.max(e.right-d,0))/h,1))*(1-Math.min((Math.max(0-e.top,0)+Math.max(e.bottom-c,0))/f,1)):0},kl=function(a){if(D.hidden)return!0;var b=a.getBoundingClientRect();if(b.top==b.bottom||b.left==b.right||!u.getComputedStyle)return!0;var c=u.getComputedStyle(a,null);if("hidden"===c.visibility)return!0;for(var d=a,e=c;d;){if("none"===e.display)return!0;var f=e.opacity,h=e.filter;if(h){var k=h.indexOf("opacity(");0<=k&&(h=h.substring(k+8,h.indexOf(")",k)),"%"==h.charAt(h.length-1)&&(h=h.substring(0,h.length-
1)),f=Math.min(h,f))}if(void 0!==f&&0>=f)return!0;(d=d.parentElement)&&(e=u.getComputedStyle(d,null))}return!1};var ll=[],ml=!(!u.IntersectionObserver||!u.IntersectionObserverEntry),nl=function(a,b,c){for(var d=new u.IntersectionObserver(a,{threshold:c}),e=0;e<b.length;e++)d.observe(b[e]);for(var f=0;f<ll.length;f++)if(!ll[f])return ll[f]=d,f;return ll.push(d)-1},ol=function(a,b,c){function d(k,l){var m={top:0,bottom:0,right:0,left:0,width:0,
height:0},n={boundingClientRect:k.getBoundingClientRect(),intersectionRatio:l,intersectionRect:m,isIntersecting:0<l,rootBounds:m,target:k,time:Ia()};G(function(){return a(n)})}for(var e=[],f=[],h=0;h<b.length;h++)e.push(0),f.push(-1);c.sort(function(k,l){return k-l});return function(){for(var k=0;k<b.length;k++){var l=jl(b[k]);if(l>e[k])for(;f[k]<c.length-1&&l>=c[f[k]+1];)d(b[k],l),f[k]++;else if(l<e[k])for(;0<=f[k]&&l<=c[f[k]];)d(b[k],l),f[k]--;e[k]=l}}},pl=function(a,b,c){for(var d=0;d<c.length;d++)1<
c[d]?c[d]=1:0>c[d]&&(c[d]=0);if(ml){var e=!1;G(function(){e||ol(a,b,c)()});return nl(function(f){e=!0;for(var h={ab:0};h.ab<f.length;h={ab:h.ab},h.ab++)G(function(k){return function(){return a(f[k.ab])}}(h))},b,c)}return u.setInterval(ol(a,b,c),1E3)},ql=function(a){ml?0<=a&&a<ll.length&&ll[a]&&(ll[a].disconnect(),ll[a]=void 0):u.clearInterval(a)};var sl=u.clearTimeout,tl=u.setTimeout,K=function(a,b,c){if(xf()){b&&G(b)}else return Yd(a,b,c)},ul=function(){return u.location.href},vl=function(a){return Bg(Dg(a),"fragment")},wl=function(a){return Cg(Dg(a))},xl=null;
var yl=function(a,b){return nf(a,b||2)},zl=function(a,b,c){b&&(a.eventCallback=b,c&&(a.eventTimeout=c));return Fi(a)},Al=function(a,b){u[a]=b},W=function(a,b,c){b&&(void 0===u[a]||c&&!u[a])&&(u[a]=b);return u[a]},Bl=function(a,b,c){return qh(a,b,void 0===c?!0:!!c)},Cl=function(a,b,c,d){var e={prefix:a,path:b,domain:c,od:d};nk(e);uk(e)},Dl=function(a,b,c,d,e){qk(a,b,c,d,e);},El=function(a,b,c,d,e){
sk(a,b,c,d,e);},Fl=function(a,b){if(xf()){b&&G(b)}else $d(a,b)},Gl=function(a){return!!pj(a,"init",!1)},Hl=function(a){nj(a,"init",!0)},Il=function(a,b,c){var d=(void 0===c?0:c)?"www.googletagmanager.com/gtag/js":Ee;d+="?id="+encodeURIComponent(a)+"&l=dataLayer";b&&Ca(b,function(e,f){f&&(d+="&"+e+"="+encodeURIComponent(f))});K(J("https://","http://",d))},Jl=function(a,b){var c=a[b];
return c};
var Ll=ij.kh;var Ml=new Aa,Nl=function(a,b){function c(h){var k=Dg(h),l=Bg(k,"protocol"),m=Bg(k,"host",!0),n=Bg(k,"port"),p=Bg(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==n||"https"==l&&"443"==n)l="web",n="default";return[l,m,n,p]}for(var d=c(String(a)),e=c(String(b)),f=0;f<d.length;f++)if(d[f]!==e[f])return!1;return!0},Ol=function(a){var b=a.arg0,c=a.arg1;if(a.any_of&&wa(c)){for(var d=0;d<c.length;d++)if(Ol({"function":a["function"],arg0:b,arg1:c[d]}))return!0;return!1}switch(a["function"]){case "_cn":return 0<=
String(b).indexOf(String(c));case "_css":var e;a:{if(b){var f=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var h=0;h<f.length;h++)if(b[f[h]]){e=b[f[h]](c);break a}}catch(v){}}e=!1}return e;case "_ew":var k,l;k=String(b);l=String(c);var m=k.length-l.length;return 0<=m&&k.indexOf(l,m)==m;case "_eq":return String(b)==String(c);case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var n;n=String(b).split(",");
return 0<=xa(n,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var p;var t=a.ignore_case?"i":void 0;try{var q=String(c)+t,r=Ml.get(q);r||(r=new RegExp(c,t),Ml.set(q,r));p=r.test(b)}catch(v){p=!1}return p;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return Nl(b,c)}return!1};var Ql={},Rl=function(){if(u._gtmexpgrp&&u._gtmexpgrp.hasOwnProperty(1))return u._gtmexpgrp[1];void 0===Ql[1]&&(Ql[1]=Math.floor(2*Math.random()));return Ql[1]};var Sl=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var Tl={},Ul=encodeURI,X=encodeURIComponent,Vl=ae;var Wl=function(a,b){if(!a)return!1;var c=Bg(Dg(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1};
var Xl=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null};Tl.hh=function(){var a=!1;return a};var wm=function(){var a=u.gaGlobal=u.gaGlobal||{};a.hid=a.hid||za();return a.hid};var en=window,fn=document,gn=function(a){var b=en._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===en["ga-disable-"+a])return!0;try{var c=en.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(f){}for(var d=qh("AMP_TOKEN",fn.cookie,!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return fn.getElementById("__gaOptOutExtension")?!0:!1};var mn=function(a,b,c){dh(b,c,a)},nn=function(a,b,c){dh(b,c,a,!0)},pn=function(a,b){},on=function(a,b){},
qn=function(a){return"_"===a.charAt(0)},rn=function(a){Ca(a,function(c){qn(c)&&delete a[c]});var b=a[H.Sb]||{};Ca(b,function(c){qn(c)&&delete b[c]})};var Z={a:{}};

Z.a.send_pixel=["google"],function(){function a(b,c){return{url:c}}(function(b){Z.__send_pixel=b;Z.__send_pixel.b="send_pixel";Z.__send_pixel.g=!0;Z.__send_pixel.priorityOverride=0})(function(b){var c=b.vtp_urls||[],d=b.vtp_createPermissionError;return{assert:function(e,f){if(!ta(f))throw d(e,{},"URL must be a string.");try{if(Yk(f,c))return}catch(h){throw d(e,{},"Invalid URL filter.");}throw d(e,{},"Prohibited URL: "+f+".");},K:a}})}();Z.a.qpx=["nonGooglePixels"];

Z.a.jsm=["customScripts"],function(){(function(a){Z.__jsm=a;Z.__jsm.b="jsm";Z.__jsm.g=!0;Z.__jsm.priorityOverride=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=W("google_tag_manager");return c&&c.e&&c.e(b)}catch(d){}}})}();
Z.a.sp=["google"],function(){(function(a){Z.__sp=a;Z.__sp.b="sp";Z.__sp.g=!0;Z.__sp.priorityOverride=0})(function(a){var b=void 0,c="//www.googleadservices.com/pagead/conversion_async.js";var d=a.vtp_gtmOnFailure;kg();K(c,function(){var e=W("google_trackConversion");
if(sa(e)){var f={};"DATA_LAYER"==a.vtp_customParamsFormat?f=a.vtp_dataLayerVariable:"USER_SPECIFIED"==a.vtp_customParamsFormat&&(f=Xl(a.vtp_customParams,"key","value"));var h={};a.vtp_enableDynamicRemarketing&&(a.vtp_eventName&&(f.event=a.vtp_eventName),a.vtp_eventValue&&(h.value=a.vtp_eventValue),a.vtp_eventItems&&(h.items=a.vtp_eventItems));var k={google_conversion_id:a.vtp_conversionId,google_conversion_label:a.vtp_conversionLabel,google_custom_params:f,google_gtag_event_data:h,google_remarketing_only:!0,
onload_callback:a.vtp_gtmOnSuccess,google_gtm:Dk()};b&&(k.google_additional_conversion_params=b);e(k)||d()}else d()},d)})}();
Z.a.e=["google"],function(){(function(a){Z.__e=a;Z.__e.b="e";Z.__e.g=!0;Z.__e.priorityOverride=0})(function(a){return String(wf(a.vtp_gtmEventId,"event"))})}();
Z.a.f=["google"],function(){(function(a){Z.__f=a;Z.__f.b="f";Z.__f.g=!0;Z.__f.priorityOverride=0})(function(a){var b=yl("gtm.referrer",1)||D.referrer;return b?a.vtp_component&&"URL"!=a.vtp_component?Bg(Dg(String(b)),a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey):wl(String(b)):String(b)})}();
Z.a.cl=["google"],function(){function a(b){var c=b.target;if(c){var d=lj(c,"gtm.click");zl(d)}}(function(b){Z.__cl=b;Z.__cl.b="cl";Z.__cl.g=!0;Z.__cl.priorityOverride=0})(function(b){if(!Gl("cl")){var c=W("document");be(c,"click",a,!0);Hl("cl")}G(b.vtp_gtmOnSuccess)})}();Z.a.k=["google"],function(){(function(a){Z.__k=a;Z.__k.b="k";Z.__k.g=!0;Z.__k.priorityOverride=0})(function(a){return Bl(a.vtp_name,yl("gtm.cookie",1),!!a.vtp_decodeCookie)[0]})}();

Z.a.access_globals=["google"],function(){function a(b,c,d){var e={key:d,read:!1,write:!1,execute:!1};switch(c){case "read":e.read=!0;break;case "write":e.write=!0;break;case "readwrite":e.read=e.write=!0;break;case "execute":e.execute=!0;break;default:throw Error("Invalid access_globals request "+c);}return e}(function(b){Z.__access_globals=b;Z.__access_globals.b="access_globals";Z.__access_globals.g=!0;Z.__access_globals.priorityOverride=0})(function(b){for(var c=b.vtp_keys||[],d=b.vtp_createPermissionError,
e=[],f=[],h=[],k=0;k<c.length;k++){var l=c[k],m=l.key;l.read&&e.push(m);l.write&&f.push(m);l.execute&&h.push(m)}return{assert:function(n,p,t){if(!ta(t))throw d(n,{},"Key must be a string.");if("read"===p){if(-1<xa(e,t))return}else if("write"===p){if(-1<xa(f,t))return}else if("readwrite"===p){if(-1<xa(f,t)&&-1<xa(e,t))return}else if("execute"===p){if(-1<xa(h,t))return}else throw d(n,{},"Operation must be either 'read', 'write', or 'execute', was "+p);throw d(n,{},"Prohibited "+p+" on global variable: "+
t+".");},K:a}})}();Z.a.r=["google"],function(){(function(a){Z.__r=a;Z.__r.b="r";Z.__r.g=!0;Z.__r.priorityOverride=0})(function(a){return za(a.vtp_min,a.vtp_max)})}();
Z.a.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){Z.__u=b;Z.__u.b="u";Z.__u.g=!0;Z.__u.priorityOverride=0})(function(b){var c;c=(c=b.vtp_customUrlSource?b.vtp_customUrlSource:yl("gtm.url",1))||ul();var d=b[a("vtp_component")];if(!d||"URL"==d)return wl(String(c));var e=Dg(String(c)),f;if("QUERY"===d)a:{var h=b[a("vtp_multiQueryKeys").toString()],k=b[a("vtp_queryKey").toString()]||"",l=b[a("vtp_ignoreEmptyQueryParam").toString()],m;m=h?wa(k)?k:String(k).replace(/\s+/g,
"").split(","):[String(k)];for(var n=0;n<m.length;n++){var p=Bg(e,"QUERY",void 0,void 0,m[n]);if(void 0!=p&&(!l||""!==p)){f=p;break a}}f=void 0}else f=Bg(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,void 0);return f})}();
Z.a.v=["google"],function(){(function(a){Z.__v=a;Z.__v.b="v";Z.__v.g=!0;Z.__v.priorityOverride=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=yl(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();
Z.a.tl=["google"],function(){function a(b){return function(){if(b.md&&b.qd>=b.md)b.fd&&W("self").clearInterval(b.fd);else{b.qd++;var c=(new Date).getTime();zl({event:b.ka,"gtm.timerId":b.fd,"gtm.timerEventNumber":b.qd,"gtm.timerInterval":b.interval,"gtm.timerLimit":b.md,"gtm.timerStartTime":b.bf,"gtm.timerCurrentTime":c,"gtm.timerElapsedTime":c-b.bf,"gtm.triggers":b.ai})}}}(function(b){Z.__tl=b;Z.__tl.b="tl";Z.__tl.g=!0;Z.__tl.priorityOverride=0})(function(b){G(b.vtp_gtmOnSuccess);if(!isNaN(b.vtp_interval)){var c=
{ka:b.vtp_eventName,qd:0,interval:Number(b.vtp_interval),md:isNaN(b.vtp_limit)?0:Number(b.vtp_limit),ai:String(b.vtp_uniqueTriggerId||"0"),bf:(new Date).getTime()};c.fd=W("self").setInterval(a(c),0>Number(b.vtp_interval)?0:Number(b.vtp_interval))}})}();
Z.a.ua=["google"],function(){var a,b={},c=function(d){var e={},f={},h={},k={},l={},m=void 0;if(d.vtp_gaSettings){var n=d.vtp_gaSettings;C(Xl(n.vtp_fieldsToSet,"fieldName","value"),f);C(Xl(n.vtp_contentGroup,"index","group"),h);C(Xl(n.vtp_dimension,"index","dimension"),k);C(Xl(n.vtp_metric,"index","metric"),l);d.vtp_gaSettings=null;n.vtp_fieldsToSet=void 0;n.vtp_contentGroup=void 0;n.vtp_dimension=void 0;n.vtp_metric=void 0;var p=C(n);d=C(d,p)}C(Xl(d.vtp_fieldsToSet,"fieldName","value"),f);C(Xl(d.vtp_contentGroup,
"index","group"),h);C(Xl(d.vtp_dimension,"index","dimension"),k);C(Xl(d.vtp_metric,"index","metric"),l);var t=rg(d.vtp_functionName);if(sa(t)){var q="",r="";d.vtp_setTrackerName&&"string"==typeof d.vtp_trackerName?""!==d.vtp_trackerName&&(r=d.vtp_trackerName,q=r+"."):(r="gtm"+Le(),q=r+".");var v={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,legacyCookieDomain:!0,
legacyHistoryImport:!0,storage:!0,useAmpClientId:!0,storeGac:!0},w={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,allowAdFeatures:!0},y=function(T){var O=[].slice.call(arguments,0);O[0]=q+O[0];t.apply(window,O)},x=function(T,O){return void 0===O?O:T(O)},A=function(T,O){if(O)for(var ua in O)O.hasOwnProperty(ua)&&y("set",T+ua,O[ua])},z=function(){
var T=function(Bn,Ji,Cn){if(!ab(Ji))return!1;for(var Yc=Ja(Object(Ji),Cn,[]),Kf=0;Yc&&Kf<Yc.length;Kf++)y(Bn,Yc[Kf]);return!!Yc&&0<Yc.length},O;if(d.vtp_useEcommerceDataLayer){var ua=!1;ua||(O=yl("ecommerce",1))}else d.vtp_ecommerceMacroData&&(O=d.vtp_ecommerceMacroData.ecommerce);if(!ab(O))return;O=Object(O);var fb=Ja(f,"currencyCode",O.currencyCode);
void 0!==fb&&y("set","&cu",fb);T("ec:addImpression",O,"impressions");if(T("ec:addPromo",O[O.promoClick?"promoClick":"promoView"],"promotions")&&O.promoClick){y("ec:setAction","promo_click",O.promoClick.actionField);return}for(var Ka="detail checkout checkout_option click add remove purchase refund".split(" "),gb="refund purchase remove checkout checkout_option add click detail".split(" "),hb=0;hb<Ka.length;hb++){var ub=O[Ka[hb]];if(ub){T("ec:addProduct",ub,"products");y("ec:setAction",Ka[hb],ub.actionField);
if(cf)for(var Cb=0;Cb<gb.length;Cb++){var qc=O[gb[Cb]];if(qc){qc!==ub&&Ne("GTM",13);break}}break}}},B=function(T,O,ua){var fb=0;if(T)for(var Ka in T)if(T.hasOwnProperty(Ka)&&(ua&&v[Ka]||!ua&&void 0===v[Ka])){var gb=w[Ka]?Fa(T[Ka]):T[Ka];"anonymizeIp"!=Ka||gb||(gb=void 0);O[Ka]=gb;fb++}return fb},E={name:r};B(f,E,!0);t("create",d.vtp_trackingId||e.trackingId,E);y("set","&gtm",Dk(!0));d.vtp_enableRecaptcha&&y("require","recaptcha","recaptcha.js");(function(T,O){void 0!==d[O]&&y("set",T,d[O])})("nonInteraction","vtp_nonInteraction");A("contentGroup",h);A("dimension",k);A("metric",l);var F={};B(f,F,!1)&&y("set",F);var M;
d.vtp_enableLinkId&&y("require","linkid","linkid.js");y("set","hitCallback",function(){var T=f&&f.hitCallback;sa(T)&&T();d.vtp_gtmOnSuccess()});if("TRACK_EVENT"==d.vtp_trackType){}else if("TRACK_SOCIAL"==d.vtp_trackType){}else if("TRACK_TRANSACTION"==d.vtp_trackType){}else if("TRACK_TIMING"==
d.vtp_trackType){}else if("DECORATE_LINK"==d.vtp_trackType){}else if("DECORATE_FORM"==d.vtp_trackType){}else if("TRACK_DATA"==d.vtp_trackType){}else{d.vtp_enableEcommerce&&(y("require","ec","ec.js"),z());if(d.vtp_doubleClick||"DISPLAY_FEATURES"==d.vtp_advertisingFeaturesType){var Y=
"_dc_gtm_"+String(d.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");y("require","displayfeatures",void 0,{cookieName:Y})}if("DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==d.vtp_advertisingFeaturesType){var ha="_dc_gtm_"+String(d.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");y("require","adfeatures",{cookieName:ha})}M?y("send","pageview",M):y("send","pageview");}if(!a){var ia=d.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";d.vtp_useInternalVersion&&!d.vtp_useDebugVersion&&(ia="internal/"+ia);a=!0;var La=J("https:","http:","//www.google-analytics.com/"+ia,f&&f.forceSSL);K(La,function(){var T=pg();T&&T.loaded||d.vtp_gtmOnFailure();},d.vtp_gtmOnFailure)}}else G(d.vtp_gtmOnFailure)};Z.__ua=c;Z.__ua.b="ua";Z.__ua.g=!0;Z.__ua.priorityOverride=0}();
Z.a.get_url=["google"],function(){function a(b,c,d){return{component:c,queryKey:d}}(function(b){Z.__get_url=b;Z.__get_url.b="get_url";Z.__get_url.g=!0;Z.__get_url.priorityOverride=0})(function(b){var c="any"===b.vtp_urlParts?null:[];c&&(b.vtp_protocol&&c.push("protocol"),b.vtp_host&&c.push("host"),b.vtp_port&&c.push("port"),b.vtp_path&&c.push("path"),b.vtp_extension&&c.push("extension"),b.vtp_query&&c.push("query"),b.vtp_fragment&&c.push("fragment"));var d=c&&"any"!==b.vtp_queriesAllowed?b.vtp_queryKeys||
[]:null,e=b.vtp_createPermissionError;return{assert:function(f,h,k){if(h){if(!ta(h))throw e(f,{},"URL component must be a string.");if(c&&0>xa(c,h))throw e(f,{},"Prohibited URL component: "+h);if("query"===h&&d){if(!k)throw e(f,{},"Prohibited from getting entire URL query when query keys are specified.");if(!ta(k))throw e(f,{},"Query key must be a string.");if(0>xa(d,k))throw e(f,{},"Prohibited query key: "+k);}}else if(c)throw e(f,{},"Prohibited from getting entire URL when components are specified.");
},K:a}})}();


Z.a.cid=["google"],function(){(function(a){Z.__cid=a;Z.__cid.b="cid";Z.__cid.g=!0;Z.__cid.priorityOverride=0})(function(){return od.o})}();
Z.a.hjtc=["nonGoogleScripts"],function(){(function(a){Z.__hjtc=a;Z.__hjtc.b="hjtc";Z.__hjtc.g=!0;Z.__hjtc.priorityOverride=0})(function(a){var b=a.vtp_hotjar_site_id;Al("hj",function(){(window.hj.q=window.hj.q||[]).push(arguments)});Al("_hjSettings",{hjid:b,hjsv:5});K("//static.hotjar.com/c/hotjar-"+X(b)+".js?sv=5",a.vtp_gtmOnSuccess,a.vtp_gtmOnFailure)})}();
Z.a.gclidw=["google"],function(){var a=["aw","dc","gf","ha"];(function(b){Z.__gclidw=b;Z.__gclidw.b="gclidw";Z.__gclidw.g=!0;Z.__gclidw.priorityOverride=100})(function(b){G(b.vtp_gtmOnSuccess);var c,d,e;b.vtp_enableCookieOverrides&&(e=b.vtp_cookiePrefix,c=b.vtp_path,d=b.vtp_domain);var f=null;b.vtp_enableCookieUpdateFeature&&(f=!0,void 0!==b.vtp_cookieUpdate&&(f=!!b.vtp_cookieUpdate));var h=e,k=c,l=d;b.vtp_enableCrossDomainFeature&&(b.vtp_enableCrossDomain&&!1===b.vtp_acceptIncoming||(b.vtp_enableCrossDomain||
ck())&&Dl(a,h,k,l));Cl(e,c,d);zk(f,e,c,d);var m=e;if(b.vtp_enableCrossDomainFeature&&b.vtp_enableCrossDomain&&b.vtp_linkerDomains){var n=b.vtp_linkerDomains.toString().replace(/\s+/g,"").split(",");El(a,n,b.vtp_urlPosition,!!b.vtp_formDecoration,m)}})}();

Z.a.aev=["google"],function(){function a(q,r){var v=wf(q,"gtm");if(v)return v[r]}function b(q,r,v,w){w||(w="element");var y=q+"."+r,x;if(n.hasOwnProperty(y))x=n[y];else{var A=a(q,w);if(A&&(x=v(A),n[y]=x,p.push(y),35<p.length)){var z=p.shift();delete n[z]}}return x}function c(q,r,v){var w=a(q,t[r]);return void 0!==w?w:v}function d(q,r){if(!q)return!1;var v=e(ul());wa(r)||(r=String(r||"").replace(/\s+/g,"").split(","));for(var w=[v],y=0;y<r.length;y++)if(r[y]instanceof RegExp){if(r[y].test(q))return!1}else{var x=
r[y];if(0!=x.length){if(0<=e(q).indexOf(x))return!1;w.push(e(x))}}return!Wl(q,w)}function e(q){m.test(q)||(q="http://"+q);return Bg(Dg(q),"HOST",!0)}function f(q,r,v){switch(q){case "SUBMIT_TEXT":return b(r,"FORM."+q,h,"formSubmitElement")||v;case "LENGTH":var w=b(r,"FORM."+q,k);return void 0===w?v:w;case "INTERACTED_FIELD_ID":return l(r,"id",v);case "INTERACTED_FIELD_NAME":return l(r,"name",v);case "INTERACTED_FIELD_TYPE":return l(r,"type",v);case "INTERACTED_FIELD_POSITION":var y=a(r,"interactedFormFieldPosition");
return void 0===y?v:y;case "INTERACT_SEQUENCE_NUMBER":var x=a(r,"interactSequenceNumber");return void 0===x?v:x;default:return v}}function h(q){switch(q.tagName.toLowerCase()){case "input":return de(q,"value");case "button":return ee(q);default:return null}}function k(q){if("form"===q.tagName.toLowerCase()&&q.elements){for(var r=0,v=0;v<q.elements.length;v++)Kk(q.elements[v])&&r++;return r}}function l(q,r,v){var w=a(q,"interactedFormField");return w&&de(w,r)||v}var m=/^https?:\/\//i,n={},p=[],t={ATTRIBUTE:"elementAttribute",
CLASSES:"elementClasses",ELEMENT:"element",ID:"elementId",HISTORY_CHANGE_SOURCE:"historyChangeSource",HISTORY_NEW_STATE:"newHistoryState",HISTORY_NEW_URL_FRAGMENT:"newUrlFragment",HISTORY_OLD_STATE:"oldHistoryState",HISTORY_OLD_URL_FRAGMENT:"oldUrlFragment",TARGET:"elementTarget"};(function(q){Z.__aev=q;Z.__aev.b="aev";Z.__aev.g=!0;Z.__aev.priorityOverride=0})(function(q){var r=q.vtp_gtmEventId,v=q.vtp_defaultValue,w=q.vtp_varType;switch(w){case "TAG_NAME":var y=a(r,"element");return y&&y.tagName||
v;case "TEXT":return b(r,w,ee)||v;case "URL":var x;a:{var A=String(a(r,"elementUrl")||v||""),z=Dg(A),B=String(q.vtp_component||"URL");switch(B){case "URL":x=A;break a;case "IS_OUTBOUND":x=d(A,q.vtp_affiliatedDomains);break a;default:x=Bg(z,B,q.vtp_stripWww,q.vtp_defaultPages,q.vtp_queryKey)}}return x;case "ATTRIBUTE":var E;if(void 0===q.vtp_attribute)E=c(r,w,v);else{var F=q.vtp_attribute,M=a(r,"element");E=M&&de(M,F)||v||""}return E;case "MD":var Q=q.vtp_mdValue,S=b(r,"MD",el);return Q&&S?hl(S,Q)||
v:S||v;case "FORM":return f(String(q.vtp_component||"SUBMIT_TEXT"),r,v);default:return c(r,w,v)}})}();
Z.a.gas=["google"],function(){(function(a){Z.__gas=a;Z.__gas.b="gas";Z.__gas.g=!0;Z.__gas.priorityOverride=0})(function(a){var b=C(a),c=b;c[dd.xa]=null;c[dd.Jf]=null;var d=b=c;d.vtp_fieldsToSet=d.vtp_fieldsToSet||[];var e=d.vtp_cookieDomain;void 0!==e&&(d.vtp_fieldsToSet.push({fieldName:"cookieDomain",value:e}),delete d.vtp_cookieDomain);return b})}();

Z.a.hl=["google"],function(){function a(f){return f.target&&f.target.location&&f.target.location.href?f.target.location.href:ul()}function b(f,h){be(f,"hashchange",function(k){var l=a(k);h({source:"hashchange",state:null,url:wl(l),J:vl(l)})})}function c(f,h){be(f,"popstate",function(k){var l=a(k);h({source:"popstate",state:k.state,url:wl(l),J:vl(l)})})}function d(f,h,k){var l=h.history,m=l[f];if(sa(m))try{l[f]=function(n,p,t){m.apply(l,[].slice.call(arguments,0));k({source:f,state:n,url:wl(ul()),
J:vl(ul())})}}catch(n){}}function e(){var f={source:null,state:W("history").state||null,url:wl(ul()),J:vl(ul())};return function(h){var k=f,l={};l[k.source]=!0;l[h.source]=!0;if(!l.popstate||!l.hashchange||k.J!=h.J){var m={event:"gtm.historyChange","gtm.historyChangeSource":h.source,"gtm.oldUrlFragment":f.J,"gtm.newUrlFragment":h.J,"gtm.oldHistoryState":f.state,"gtm.newHistoryState":h.state};m["gtm.oldUrl"]=f.url,m["gtm.newUrl"]=h.url;
f=h;zl(m)}}}(function(f){Z.__hl=f;Z.__hl.b="hl";Z.__hl.g=!0;Z.__hl.priorityOverride=0})(function(f){var h=W("self");if(!Gl("hl")){var k=e();b(h,k);c(h,k);d("pushState",h,k);d("replaceState",h,k);Hl("hl")}G(f.vtp_gtmOnSuccess)})}();
Z.a.awct=["google"],function(){var a=!1,b=[],c=function(k){var l=W("google_trackConversion"),m=k.gtm_onFailure;"function"==typeof l?l(k)||m():m()},d=function(){for(;0<b.length;)c(b.shift())},e=function(){return function(){d();a=!1}},f=function(){return function(){d();b={push:c};}},h=function(k){kg();var l={google_basket_transaction_type:"purchase",google_conversion_domain:"",google_conversion_id:k.vtp_conversionId,google_conversion_label:k.vtp_conversionLabel,
google_conversion_value:k.vtp_conversionValue||0,google_remarketing_only:!1,onload_callback:k.vtp_gtmOnSuccess,gtm_onFailure:k.vtp_gtmOnFailure,google_gtm:Dk()},m=function(v){return function(w,y,x){var A="DATA_LAYER"==v?yl(x):k[y];A&&(l[w]=A)}},n=m("JSON");n("google_conversion_currency","vtp_currencyCode");n("google_conversion_order_id","vtp_orderId");k.vtp_enableProductReporting&&(n=m(k.vtp_productReportingDataSource),n("google_conversion_merchant_id","vtp_awMerchantId","aw_merchant_id"),n("google_basket_feed_country",
"vtp_awFeedCountry","aw_feed_country"),n("google_basket_feed_language","vtp_awFeedLanguage","aw_feed_language"),n("google_basket_discount","vtp_discount","discount"),n("google_conversion_items","vtp_items","items"),l.google_conversion_items=l.google_conversion_items.map(function(v){return{value:v.price,quantity:v.quantity,item_id:v.id}}));var p=function(v,w){(l.google_additional_conversion_params=l.google_additional_conversion_params||{})[v]=w},t=function(v){return function(w,y,x,A){var z="DATA_LAYER"==
v?yl(x):k[y];A(z)&&p(w,z)}},q="//www.googleadservices.com/pagead/conversion_async.js";k.vtp_enableNewCustomerReporting&&(n=t(k.vtp_newCustomerReportingDataSource),n("vdnc","vtp_awNewCustomer","new_customer",ca),n("vdltv","vtp_awCustomerLTV","customer_lifetime_value",
function(v){return void 0!=v&&""!==v}));!k.hasOwnProperty("vtp_enableConversionLinker")||k.vtp_enableConversionLinker?(k.vtp_conversionCookiePrefix&&(l.google_gcl_cookie_prefix=k.vtp_conversionCookiePrefix),l.google_read_gcl_cookie_opt_out=!1):l.google_read_gcl_cookie_opt_out=!0;var r=!0;r&&b.push(l);a||(a=!0,K(q,f(),
e(q)))};Z.__awct=h;Z.__awct.b="awct";Z.__awct.g=!0;Z.__awct.priorityOverride=0}();
Z.a.baut=["nonGoogleScripts"],function(){var a=!1,b=function(c){var d=c.vtp_uetqName||"uetq",e=W(d,[],!0);if("VARIABLE_REVENUE"==c.vtp_eventType)e.push({gv:c.vtp_goalValue}),c.vtp_gtmOnSuccess();else if("CUSTOM"==c.vtp_eventType){var f={},h=function(k,l){void 0!==c[k]&&(f[l]=c[k])};h("vtp_goalValue","gv");h("vtp_eventCategory","ec");h("vtp_eventAction","ea");h("vtp_eventLabel","el");h("vtp_eventValue","ev");e.push(f);c.vtp_gtmOnSuccess()}else if(a)c.vtp_gtmOnSuccess();else try{K("//bat.bing.com/bat.js",
function(){var k=Sl(W("UET"),{ti:c.vtp_tagId,q:e});u[d]=k;k.push("pageLoad");c.vtp_gtmOnSuccess()},c.vtp_gtmOnFailure),a=!0}catch(k){G(c.vtp_gtmOnFailure)}};Z.__baut=b;Z.__baut.b="baut";Z.__baut.g=!0;Z.__baut.priorityOverride=0}();




Z.a.paused=[],function(){(function(a){Z.__paused=a;Z.__paused.b="paused";Z.__paused.g=!0;Z.__paused.priorityOverride=0})(function(a){G(a.vtp_gtmOnFailure)})}();
Z.a.html=["customScripts"],function(){function a(d,e,f,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,f,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var m=D.createElement("script");m.async=!1;m.type="text/javascript";m.id=k.id;m.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(m.charset=k.charset);var n=k.getAttribute("data-gtmsrc");n&&(m.src=n,Xd(m,l));d.insertBefore(m,null);n||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var p=
[];k.firstChild;)p.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,p,l,h)()}else d.insertBefore(k,null),l()}else f()}catch(t){G(h)}}}var b=function(d,e,f){bg(function(){var h,k=Ae;k.postscribe||(k.postscribe=vd);h=k.postscribe;var l={done:e},m=D.createElement("div");m.style.display="none";m.style.visibility="hidden";D.body.appendChild(m);try{h(m,d,l)}catch(n){G(f)}})};var c=function(d){if(D.body){var e=
d.vtp_gtmOnFailure,f=Ll(d.vtp_html,d.vtp_gtmOnSuccess,e),h=f.dd,k=f.R;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(D.body,fe(h),k,e)()}else tl(function(){c(d)},
200)};Z.__html=c;Z.__html.b="html";Z.__html.g=!0;Z.__html.priorityOverride=0}();


Z.a.gfct=["google"],function(){var a=/.*\.google\.com(:\d+)?\/booking\/flights.*/;(function(b){Z.__gfct=b;Z.__gfct.b="gfct";Z.__gfct.g=!0;Z.__gfct.priorityOverride=0})(function(b){var c=b.vtp_partnerId,d=!b.hasOwnProperty("vtp_enableConversionLinker")||b.vtp_enableConversionLinker,e={conversion_id:c,onFailure:b.vtp_gtmOnFailure,onSuccess:b.vtp_gtmOnSuccess,conversionLinkerEnabled:d,cookiePrefix:b.vtp_conversionCookiePrefix||void 0},f=a.test(ul()),h=b.vtp_tripType,k=b.vtp_value,l=b.vtp_currency,m;
var n=b.vtp_items;if(n){for(var p=[],t=0,q=0;q<n.length;++q){var r=n[q];!r||void 0!==r.category&&""!==r.category&&"FlightSegment"!==r.category||(p[t]={cabin:r.travel_class,fare_product:r.fare_product,booking_code:r.booking_code,flight_number:r.flight_number,origin:r.origin,destination:r.destination,departure_date:r.start_date},t++)}m=p}else m=void 0;e.conversion_data={partner_id:c,trip_type:h,total_price:k,currency:l,is_direct_booking:f,flight_segment:m,passengers_total:b.vtp_passengersTotal,passengers_adult:b.vtp_passengersAdult,
passengers_child:b.vtp_passengersChild,passengers_infant_in_seat:b.vtp_passengersInfantInSeat,passengers_infant_in_lap:b.vtp_passengersInfantInLap};Ok(e)})}();





Z.a.evl=["google"],function(){function a(f,h){this.element=f;this.uid=h}function b(){var f=Number(yl("gtm.start"))||0;return(new Date).getTime()-f}function c(f,h,k,l){function m(){if(!kl(f.target)){h.has(e.Wb)||h.set(e.Wb,""+b());h.has(e.Qc)||h.set(e.Qc,""+b());var p=0;h.has(e.Yb)&&(p=Number(h.get(e.Yb)));p+=100;h.set(e.Yb,""+p);if(p>=k){var t=lj(f.target,"gtm.elementVisibility",[h.uid]),q=jl(f.target);t["gtm.visibleRatio"]=Math.round(1E3*q)/10;t["gtm.visibleTime"]=k;t["gtm.visibleFirstTime"]=Number(h.get(e.Qc));
t["gtm.visibleLastTime"]=Number(h.get(e.Wb));zl(t);l()}}}if(!h.has(e.qb)&&(0==k&&m(),!h.has(e.Pa))){var n=W("self").setInterval(m,100);h.set(e.qb,n)}}function d(f){f.has(e.qb)&&(W("self").clearInterval(Number(f.get(e.qb))),f.remove(e.qb))}var e={qb:"polling-id-",Qc:"first-on-screen-",Wb:"recent-on-screen-",Yb:"total-visible-time-",Pa:"has-fired-"};a.prototype.has=function(f){return!!this.element.getAttribute("data-gtm-vis-"+f+this.uid)};a.prototype.get=function(f){return this.element.getAttribute("data-gtm-vis-"+
f+this.uid)};a.prototype.set=function(f,h){this.element.setAttribute("data-gtm-vis-"+f+this.uid,h)};a.prototype.remove=function(f){this.element.removeAttribute("data-gtm-vis-"+f+this.uid)};(function(f){Z.__evl=f;Z.__evl.b="evl";Z.__evl.g=!0;Z.__evl.priorityOverride=0})(function(f){function h(){var y=!1,x=null;if("CSS"===l){try{x=oi(m)}catch(F){}y=!!x&&v.length!=x.length}else if("ID"===l){var A=D.getElementById(m);A&&(x=[A],y=1!=v.length||v[0]!==A)}x||(x=[],y=0<v.length);if(y){for(var z=0;z<v.length;z++){var B=
new a(v[z],q);d(B)}v=[];for(var E=0;E<x.length;E++)v.push(x[E]);0<=w&&ql(w);0<v.length&&(w=pl(k,v,[t]))}}function k(y){var x=new a(y.target,q);y.intersectionRatio>=t?x.has(e.Pa)||c(y,x,p,"ONCE"===r?function(){for(var A=0;A<v.length;A++){var z=new a(v[A],q);z.set(e.Pa,"1");d(z)}ql(w);if(n&&Qk)for(var B=0;B<Qk.length;B++)Qk[B]===h&&Qk.splice(B,1)}:function(){x.set(e.Pa,"1");d(x)}):(d(x),"MANY_PER_ELEMENT"===r&&x.has(e.Pa)&&(x.remove(e.Pa),x.remove(e.Yb)),x.remove(e.Wb))}var l=f.vtp_selectorType,m;"ID"===
l?m=String(f.vtp_elementId):"CSS"===l&&(m=String(f.vtp_elementSelector));var n=!!f.vtp_useDomChangeListener,p=f.vtp_useOnScreenDuration&&Number(f.vtp_onScreenDuration)||0,t=(Number(f.vtp_onScreenRatio)||50)/100,q=f.vtp_uniqueTriggerId,r=f.vtp_firingFrequency,v=[],w=-1;h();n&&Rk(h);G(f.vtp_gtmOnSuccess)})}();

var An={};An.macro=function(a){if(ij.Rc.hasOwnProperty(a))return ij.Rc[a]},An.onHtmlSuccess=ij.ue(!0),An.onHtmlFailure=ij.ue(!1);An.dataLayer=of;An.callback=function(a){Je.hasOwnProperty(a)&&sa(Je[a])&&Je[a]();delete Je[a]};An.hg=function(){Ae[od.o]=An;Na(Ke,Z.a);Vc=Vc||ij;Wc=Uf};
An.ah=function(){ek.gtm_3pds=!0;Ae=u.google_tag_manager=u.google_tag_manager||{};if(Ae[od.o]){var a=Ae.zones;a&&a.unregisterChild(od.o)}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)Oc.push(c[d]);for(var e=b.tags||[],f=0;f<e.length;f++)Rc.push(e[f]);for(var h=b.predicates||[],
k=0;k<h.length;k++)Qc.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var n=l[m],p={},t=0;t<n.length;t++)p[n[t][0]]=Array.prototype.slice.call(n[t],1);Pc.push(p)}Tc=Z;Uc=Ol;var q=data.permissions||{},r=data.sandboxed_scripts;Yh();td(q);if(void 0!==r)for(var v=["sandboxedScripts"],w=0;w<r.length;w++){var y=r[w].replace(/^_*/,"");Ke[y]=v}An.hg();Mi();Xf=!1;Yf=0;if("interactive"==D.readyState&&!D.createEventObject||"complete"==D.readyState)$f();else{be(D,"DOMContentLoaded",$f);be(D,"readystatechange",
$f);if(D.createEventObject&&D.documentElement.doScroll){var x=!0;try{x=!u.frameElement}catch(E){}x&&ag()}be(u,"load",$f)}zi=!1;"complete"===D.readyState?Bi():be(u,"load",Bi);a:{if(!cf)break a;u.setInterval(df,864E5);}
Ge=(new Date).getTime();}};(0,An.ah)();

})()
