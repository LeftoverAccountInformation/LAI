
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"329",
  
  "macros":[{
      "function":"__v",
      "vtp_name":"gtm.elementUrl",
      "vtp_dataLayerVersion":1
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=document.createElement(\"a\");a.href=",["escape",["macro",0],8,16],";return a.hostname})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.status",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",2],8,16],",b=",["escape",["macro",3],8,16],";return void 0!==b\u0026\u0026\/for_sale|upcoming\/.test(a)})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"object\"===typeof ",["escape",["macro",5],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"eventLabel",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",7],8,16],";return\"undefined\"!==typeof a\u0026\u0026null!==a?a:void 0})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"eventValue",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",9],8,16],";return\"undefined\"!==typeof a\u0026\u0026null!==a?a:void 0})();"]
    },{
      "function":"__u",
      "vtp_component":"QUERY",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",11],8,16],";a=a?\"\\x26\"+a:\"\";return ",["escape",["macro",12],8,16],"+a})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.locations"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){Object.keys||(Object.keys=function(a){if(a!==Object(a))throw new TypeError(\"Object.keys called on a non-object\");var b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)\u0026\u0026b.push(c);return b});var d=\"id street district city postal_city municipality region country\".split(\" \"),e=function(a,b){return d.indexOf(a)-d.indexOf(b)};return ",["escape",["macro",14],8,16],".map(function(a){var b,c={};for(b in a)\"id\"!==b\u0026\u0026(c[b]=a[b]);return b=c}).map(function(a){var b=Object.keys(a).sort(e);b=b[0];a=a[b];\n-1\u003Cb.indexOf(\"municipality\")\u0026\u0026(a+=\" kommun\");-1\u003Cb.indexOf(\"region\")\u0026\u0026(a+=\" l\\u00e4n\");return a}).join(\",\")})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results.open_house_days",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",16],8,16],";return a\u0026\u0026\"undefined\"!==typeof a.length\u0026\u00260\u003Ca.length\u0026\u0026a.join(\",\")})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return Hemnet\u0026\u0026Hemnet.server\u0026\u0026Hemnet.server.isUserLoggedIn\u0026\u0026Hemnet.server.isUserLoggedIn()?\"registered user\":\"guest\"})();"]
    },{
      "function":"__v",
      "vtp_name":"gtm.element",
      "vtp_dataLayerVersion":1
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";return a=(a.checked?\"aktivera \":\"inaktivera \")+a.value})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a;\"function\"===typeof $\u0026\u0026$().jquery\u0026\u0026($(\"#search-location-dropdowns\").is(\":visible\")?a=\"V\\u00e4lj i lista\":$(\"#autocomplete-pane-anchor\").is(\":visible\")\u0026\u0026(a=\"Skriv in\"));return a?a:\"\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=",["escape",["macro",12],8,16],",a=\"\\u00d6vriga\";b.match(\/^\\\/(bostader|resultat|till-salu|karta|sok)\/)?a=\"S\\u00f6kfl\\u00f6de\":b.match(\/^\\\/bostad\/)\u0026\u0026",["escape",["macro",2],8,16],".match(\/^deactivated\/)?a=\"Objektsida borttagen\":b.match(\/^\\\/bostad\/)?a=\"Objektsida\":b.match(\/^\\\/$\/)?a=\"Start\":b.match(\/^\\\/salda\/)?a=\"Slutpris\":b.match(\/^\\\/(prefabs|bygg_och_renovera|bygga-hus)\/)?a=\"Bygga hus\":b.match(\/^\\\/tjanster\\\/statistik\/)?a=\"Bostadsstatistik\":b.match(\/^\\\/maklare\/)?a=\"Hitta m\\u00e4klare\":b.match(\/^\\\/inspiration\/)?\na=\"Inspiration\":b.match(\/^\\\/om\/)?a=\"Om\":b.match(\/^\\\/mitt_hemnet\/)?a=\"Mitt Hemnet\":b.match(\/^\\\/artiklar\/)?a=\"Artiklar\":b.match(\/^\\\/salja-bostad(?!\\\/maximera).*\/)\u0026\u0026(a=\"S\\u00e4lja bostad\");return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",12],8,16],",b=\/^\\\/artiklar\\\/.+\\\/[0-9]+\\\/[0-9]+\\\/[0-9]+\\\/.+\/;return a.match(b)?1:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"object\"===typeof ",["escape",["macro",3],8,16],"?1:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=",["escape",["macro",14],8,16],".filter(function(a){if(\"undefined\"!==typeof a.id\u0026\u0026a.id)return a}).map(function(a){return a.id}).join(\",\");if(0\u003Cb.length)return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",12],8,16],",b=\/^\\\/artiklar\\\/drom-dig-hem\\\/.+\/;return a.match(b)?1:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return ",["escape",["macro",7],8,16],".match(\/\\d+\/).toString()})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_rsp"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_rsp2"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",28],8,16],"||1001,b=",["escape",["macro",29],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);b=\"always\"===b?0:parseInt(b,10);var c=\"Original\";if(1001\u003Ea||10\u003Eb)c=\"Responsive Search Flow\";return c})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"_ga"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return ",["escape",["macro",31],8,16],"\u0026\u0026",["escape",["macro",31],8,16],".replace(\"GA1.2.\",\"\").replace(\/\\.\\d+$\/,\"\")})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_allimg"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",33],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);var b=\"Original\";800\u003E=a\u0026\u0026(b=\"All images mobile\");return b})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.item_types"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",35],8,16],";return a=a.replace(\/(bostadsratt)\/gi,\"cooperative\").replace(\/(gard)\/gi,\"homestead\").replace(\/(villa)\/gi,\"house\").replace(\/(tomt)\/gi,\"plot\").replace(\/(radhus)\/gi,\"row_house\").replace(\/(fritidshus)\/gi,\"vacation_home\")})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.new_construction"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.new_construction_only"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",37],8,16],",b=",["escape",["macro",38],8,16],";\"number\"===typeof a\u0026\u0026(a=b?\"only\":0==a\u0026\u00260==b?\"exclude\":\"include\");return a})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.open_house_within"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.open_house_phrase"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.open_house_date_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.open_house_date_max"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",40],8,16],";if(a\u0026\u00260\u003Ca.length)return a;a=",["escape",["macro",41],8,16],";if(",["escape",["macro",42],8,16],"||",["escape",["macro",43],8,16],")a=[],a.push(",["escape",["macro",42],8,16],".replace(\/-\/g,\"\")),a.push(",["escape",["macro",43],8,16],".replace(\/-\/g,\"\")),a=a.join(\"..\");return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=Math.random()+\"\";return a*=1E13})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_ptr"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",46],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);var b=\"Original\";750\u003E=a\u0026\u0026(b=\"Price index graph\");return b})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_imgs"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",48],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);var b=\"Original\";1E3\u003E=a\u0026\u0026(b=\"All images non mobile\");return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(f){var h=[{name:\"EMAIL\",regex:\/[^\\\/]{4}@(?!hemnet\\.se)[^\\\/]{4}\/gi,group:\"\"},{name:\"SELF-EMAIL\",regex:\/[^\\\/]{4}@(?=hemnet\\.se)[^\\\/]{4}\/gi,group:\"\"},{name:\"TEL\",regex:\/((tel=)|(telephone=)|(phone=)|(mobile=)|(telefon=))[\\d\\+\\s][^\u0026\\\/\\?]+\/gi,group:\"$1\"},{name:\"NAME\",regex:\/((firstname=)|(name=)|(namn=)|(lastname=)|(surname=))[^\u0026\\\/\\?]+\/gi,group:\"$1\"},{name:\"PASSWORD\",regex:\/((password=)|(passwd=)|(losenord=)|(pass=))[^\u0026\\\/\\?]+\/gi,group:\"$1\"}],a={objectName:\"ga_client_id\",expires:63072E6};\nif(\"object\"===typeof a\u0026\u0026\"string\"===typeof a.objectName\u0026\u0026\"number\"===typeof a.expires\u0026\u0026window.Storage){var g=f.get(\"clientId\");g=JSON.stringify({clientId:g,expires:(new Date).getTime()+a.expires});window.localStorage.setItem(a.objectName,g)}var k=f.get(\"sendHitTask\"),b,c,d,e;f.set(\"sendHitTask\",function(a){c=a.get(\"hitPayload\").split(\"\\x26\");for(b=0;b\u003Cc.length;b++)d=c[b].split(\"\\x3d\"),e=decodeURIComponent(decodeURIComponent(d[1])),h.forEach(function(a){e=e.replace(a.regex,\"[REDACTED \"+a.name+\"]\")}),\nd[1]=encodeURIComponent(e),c[b]=d.join(\"\\x3d\");a.set(\"hitPayload\",c.join(\"\\x26\"),!0);k(a)})}})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_lc"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",51],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);var b=\"Original\";1E3\u003E=a\u0026\u0026(b=\"Renewed Listing Cards\");return b})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_ww"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",53],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);var b=\"Original\";499\u003E=a\u0026\u0026(b=\"Wonderwall\");return b})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_ww2a"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"hn_exp_ww2b"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",55],8,16],"||1001,b=",["escape",["macro",56],8,16],"||1001;a=\"always\"===a?0:parseInt(a,10);b=\"always\"===b?0:parseInt(b,10);var c=\"Original\";499\u003E=a\u0026\u0026499\u003E=b\u0026\u0026(c=\"Variant A\");500\u003C=a\u0026\u0026499\u003E=b\u0026\u0026(c=\"Variant B\");499\u003E=a\u0026\u0026500\u003C=b\u0026\u0026(c=\"Variant C\");return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].country:b+\",\"+c[a].country;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].id:b+\",\"+c[a].id;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].region:b+\",\"+c[a].region;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].municipality:b+\",\"+c[a].municipality;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].postal_city:b+\",\"+c[a].postal_city;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].street:b+\",\"+c[a].street;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].district:b+\",\"+c[a].district;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",14],8,16],",b=\"\",a=0;a\u003Cc.length;a++)b=0==a?b+c[a].city:b+\",\"+c[a].city;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a,b){for(;!a.matches(b)\u0026\u0026!a.matches(\"body\");)a=a.parentElement;return a.matches(b)?a:void 0}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini\/i.test(navigator.userAgent)?\"true\":\"false\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=window.innerWidth;return a=520\u003E=a?\"mobile\":820\u003E=a?\"tablet\":\"desktop\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return(new Date).getTime()+\".\"+Math.random().toString(36).substring(5)})();"]
    },{
      "function":"__v",
      "vtp_name":"gtm.elementClasses",
      "vtp_dataLayerVersion":1
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"item property-tools__wrapper\"===",["escape",["macro",70],8,16],")return\"r\\u00e4kna p\\u00e5 ditt nya boende\";if(\"item property-neighbourhood__container js-listing-map\"===",["escape",["macro",70],8,16],")return\"karta \\x26 restider\";if(\"js-price-trend\"===",["escape",["macro",70],8,16],")return\"prisutveckling omr\\u00e5de\";if(\"item similar\"===",["escape",["macro",70],8,16],")return\"liknande bost\\u00e4der till salu\";if(\"showings\"===",["escape",["macro",70],8,16],")return\"kom p\\u00e5 visning\";if(",["escape",["macro",70],8,16],".match(\/broker-info\/))return\"kontakta m\\u00e4klaren\";\nif(",["escape",["macro",70],8,16],".match(\/sellers-page-upsell\/))return\"s\\u00e4ljkollen\";if(\"footer-bar__heading\"===",["escape",["macro",70],8,16],")return\"sidfot\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],",b=parseInt(a.getAttribute(\"data-kp-ad-id\"));isNaN(b)\u0026\u0026(a=a.querySelector(\".gtm-tracking-centerfold-ad-link\"),b=parseInt(a.getAttribute(\"data-kp-ad-id\")));if(!isNaN(b))return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],",b=parseInt(a.getAttribute(\"data-item-id\"));isNaN(b)\u0026\u0026(a=a.querySelector(\".gtm-tracking-centerfold-ad-link\"),b=parseInt(a.getAttribute(\"data-item-id\")));if(!isNaN(b))return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";a=parseInt(a.getAttribute(\"data-kp-ad-id\"));if(!isNaN(a))return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";a=parseInt(a.getAttribute(\"data-item-id\"));if(!isNaN(a))return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";a=parseInt(a.getAttribute(\"data-listing-id\"));if(!isNaN(a))return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";a=parseInt(a.getAttribute(\"data-project-ad-id\"));if(!isNaN(a))return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";a=parseInt(a.getAttribute(\"data-broker-id\"));if(!isNaN(a))return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";a=parseInt(a.getAttribute(\"data-broker-agency-id\"));if(!isNaN(a))return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=new Date,c=-a.getTimezoneOffset(),d=0\u003C=c?\"+\":\"-\",b=function(a){a=Math.abs(Math.floor(a));return(10\u003Ea?\"0\":\"\")+a};return a.getFullYear()+\"-\"+b(a.getMonth()+1)+\"-\"+b(a.getDate())+\"T\"+b(a.getHours())+\":\"+b(a.getMinutes())+\":\"+b(a.getSeconds())+\".\"+b(a.getMilliseconds())+d+b(c\/60)+\":\"+b(c%60)})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.id",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",12],8,16],".split(\"\/\");if(",["escape",["macro",81],8,16],")return ",["escape",["macro",81],8,16],";if(a[2].match(\/^\\d{4,}$\/g))return a[2]})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return ",["escape",["macro",31],8,16],"\u0026\u0026",["escape",["macro",31],8,16],".replace(\/GA1.2.\/g,\"\")})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a={objectName:\"ga_client_id\",expires:63072E6},d=\"_ga_originalSendHitTask\";return function(c){window[d]=window[d]||c.get(\"sendHitTask\");if(\"object\"===typeof a\u0026\u0026\"string\"===typeof a.objectName\u0026\u0026\"number\"===typeof a.expires\u0026\u0026window.Storage){var b=c.get(\"clientId\");b=JSON.stringify({clientId:b,expires:(new Date).getTime()+a.expires});window.localStorage.setItem(a.objectName,b)}c.set(\"sendHitTask\",function(a){var c=a,b=window[d],e=!0;try{e\u0026\u0026b(a)}catch(f){b(c)}})}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=\"ga_client_id\";if(window.localStorage){a=window.localStorage.getItem(a)||\"{}\";a=JSON.parse(a);var b=(new Date).getTime();if(a.clientId\u0026\u0026a.expires\u0026\u0026b\u003C=a.expires)return a.clientId}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return window.sessionStorage.getItem(\"sk_pkg_code\")})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){a:{var a=\"hn_sellers_page_visits\\x3d\";var c=decodeURIComponent(document.cookie);c=c.split(\";\");for(var d=0;d\u003Cc.length;d++){for(var b=c[d];\" \"==b.charAt(0);)b=b.substring(1);if(0==b.indexOf(a)){a=b.substring(a.length,b.length);break a}}a=\"\"}a=a.split(\"--\")[0];a=JSON.parse(window.atob(a));a=window.atob(a._rails.message);a=a.replace(\/([^0-9,]+)\/gi,\"\");return a=a.split(\",\")})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.keywords"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",88],8,16],".trim().toLowerCase();return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",70],8,16],";if(\"all-images__image all-images__halfway-image\"===a)return\"50%\";if(\"all-images__image all-images__last-image\"===a)return\"100%\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return document.querySelectorAll(\".all-images-content img\").length})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",70],8,16],".substr(30);return a})();"]
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"eventCategory",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"eventAction",
      "vtp_dataLayerVersion":2
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.highlighted_showings"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"legacyEvent\"==",["escape",["macro",96],8,16],"\u0026\u0026\"resultatvy\"==",["escape",["macro",94],8,16],"\u0026\u0026\"valt objekt\"==",["escape",["macro",95],8,16],"){var a=",["escape",["macro",3],8,16],",e=",["escape",["macro",5],8,16],";return a={ecommerce:{click:{products:[{id:a.id,name:a.id,brand:e.in_highlighted_showings_experiment,variant:a.has_highlighted_showings,position:",["escape",["macro",8],8,16],"}]}}}}if(\"gtm.js\"==",["escape",["macro",96],8,16],"\u0026\u0026",["escape",["macro",6],8,16],"\u0026\u0026",["escape",["macro",97],8,16],"){var d=",["escape",["macro",97],8,16],";e=",["escape",["macro",5],8,16],";a={ecommerce:{impressions:[]}};\nfor(var b=0;b\u003Cd.length;b++)try{var c={};c.id=d[b].id;c.name=d[b].id;c.position=d[b].position;c.variant=d[b].has_highlighted_showings;c.brand=e.in_highlighted_showings_experiment;a.ecommerce.impressions.push(c)}catch(f){console.error(\"GTM: Error regarding looping datalayer has result highlighted showings list\"+f)}return a}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.housing_form_groups"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.rooms_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.rooms_max"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.living_area_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.living_area_max"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.fee_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.fee_max"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.price_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.price_max"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(",["escape",["macro",6],8,16],"){var a=",["escape",["macro",12],8,16],",c=",["escape",["macro",11],8,16],";if(!c.match(\/extend=\/)\u0026\u0026!a.match(\/^\\\/sok\\\/avancerad.*\/)){var d=[",["escape",["macro",25],8,16],"?",["escape",["macro",25],8,16],".split(\",\").length:0,",["escape",["macro",99],8,16],",[",["escape",["macro",100],8,16],",",["escape",["macro",101],8,16],"].join(\"-\"),[",["escape",["macro",102],8,16],",",["escape",["macro",103],8,16],"].join(\"-\"),[",["escape",["macro",104],8,16],",",["escape",["macro",105],8,16],"].join(\"-\"),[",["escape",["macro",106],8,16],",",["escape",["macro",107],8,16],"].join(\"-\"),",["escape",["macro",39],8,16],",",["escape",["macro",89],8,16],"].join(\"|\"),\nb=\"s\\u00f6k\";a.match(\/^\\\/bostader(\\\/karta|\\?map=).*\/)\u0026\u0026(b=\"karts\\u00f6k\");a.match(\/^\\\/till-salu\\\/.+\/)?(a=\"\/bostader\",b=\"till salu\"):a.match(\/^\\\/salda\\\/.+\/)?b=\"slutpris\":c.match(\/subscription=[0-9]+\/)\u0026\u0026(b=\"sparad\");return a+\"?q\\x3d\"+d+\"\\x26c\\x3d\"+b}}})();"]
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"user.userId"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.borattavgift",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.broker_firm",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.driftkostnad",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.foreign",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.images_count",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.housing_form"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.land_area",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.location",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.main_location",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.offers_selling_price",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.price",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.price_per_m2",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.rooms",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.street_address",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.supplemental_area",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.upcoming_open_houses",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.new_production",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results.age",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.current_bid"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.foreclosure"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results.home_swapping",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results.price_decrease",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results.price_increase",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"results.row_house",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"results.upcoming"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"page.layoutProfile",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.price_per_m2_max"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.price_per_m2_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.land_area_max"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.land_area_min"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"page.type",
      "vtp_dataLayerVersion":2
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(",["escape",["macro",108],8,16],")return document.location.pathname+document.location.search+document.location.hash})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.count_total"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.count_page"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.sold_age"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.sorting"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.list_type"
    },{
      "function":"__j",
      "vtp_name":"navigator.userAgent"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.locations.municipality"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.locations.county"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.broker_logo"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.broker_logo_count_page"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"isInternalTraffic"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"role"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.publication_date"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.has_active_toplisting"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting.toplistings_chosen_results_count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting_ids"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.page_index"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.centerfold_ad_count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.broker_tip_count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"experiments"
    },{
      "function":"__cid"
    },{
      "function":"__ctv"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.construction_year_max"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.construction_year_min"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.nearby_listings_count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.project_ad_count"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"_hemnet_consent"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"typeOfListing"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting.toplisting_possible_results_count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting.toplisting_chosen_results.0.toplisting_purchases_count"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting.toplisting_chosen_results.0.toplisting_active_days"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting.toplisting_chosen_results.0.toplisting_active_id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.bidding"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.long_description"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",4],8,16],",b=document.querySelector(\".fa.fa-video-camera\");return b\u0026\u00261==a?!0:!1})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.tenure"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.callout"
    },{
      "function":"__c",
      "vtp_value":"UA-11190691-5"
    },{
      "function":"__gas",
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_contentGroup":["list",["map","index","3","group",["macro",22]]],
      "vtp_decorateFormsAutoLink":false,
      "vtp_cookieDomain":"auto",
      "vtp_useEcommerceDataLayer":false,
      "vtp_ecommerceMacroData":["macro",98],
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_fieldsToSet":["list",["map","fieldName","page","value",["macro",108]],["map","fieldName","userId","value",["macro",109]],["map","fieldName","customTask","value",["macro",50]],["map","fieldName","anonymizeIp","value","true"],["map","fieldName","clientId","value",["macro",85]]],
      "vtp_enableLinkId":false,
      "vtp_dimension":["list",["map","index","1","dimension",["macro",2]],["map","index","2","dimension",["macro",110]],["map","index","3","dimension",["macro",111]],["map","index","4","dimension",["macro",112]],["map","index","5","dimension",["macro",113]],["map","index","6","dimension",["macro",114]],["map","index","7","dimension",["macro",115]],["map","index","8","dimension",["macro",116]],["map","index","9","dimension",["macro",116]],["map","index","10","dimension",["macro",117]],["map","index","11","dimension",["macro",118]],["map","index","12","dimension",["macro",119]],["map","index","13","dimension",["macro",120]],["map","index","14","dimension",["macro",121]],["map","index","15","dimension",["macro",122]],["map","index","16","dimension",["macro",123]],["map","index","17","dimension",["macro",124]],["map","index","18","dimension",["macro",125]],["map","index","19","dimension",["macro",109]],["map","index","20","dimension",["macro",18]],["map","index","21","dimension",["macro",126]],["map","index","22","dimension",["macro",127]],["map","index","23","dimension",["macro",128]],["map","index","24","dimension",["macro",129]],["map","index","25","dimension",["macro",130]],["map","index","26","dimension",["macro",99]],["map","index","27","dimension",["macro",15]],["map","index","28","dimension",["macro",39]],["map","index","29","dimension",["macro",131]],["map","index","30","dimension",["macro",132]],["map","index","31","dimension",["macro",133]],["map","index","32","dimension",["macro",134]],["map","index","33","dimension",["macro",44]],["map","index","34","dimension",["macro",81]],["map","index","35","dimension",["macro",135]],["map","index","36","dimension",["macro",105]],["map","index","37","dimension",["macro",104]],["map","index","38","dimension",["macro",136]],["map","index","39","dimension",["macro",137]],["map","index","40","dimension",["macro",107]],["map","index","41","dimension",["macro",106]],["map","index","42","dimension",["macro",138]],["map","index","43","dimension",["macro",139]],["map","index","44","dimension",["macro",103]],["map","index","45","dimension",["macro",102]],["map","index","46","dimension",["macro",43]],["map","index","47","dimension",["macro",42]],["map","index","48","dimension",["macro",101]],["map","index","49","dimension",["macro",100]],["map","index","50","dimension",["macro",38]],["map","index","51","dimension",["macro",140]],["map","index","58","dimension",["macro",25]],["map","index","59","dimension",["macro",89]],["map","index","60","dimension",["macro",141]],["map","index","61","dimension",["macro",142]],["map","index","62","dimension",["macro",143]],["map","index","63","dimension",["macro",30]],["map","index","64","dimension",["macro",144]],["map","index","67","dimension",["macro",32]],["map","index","68","dimension",["macro",34]],["map","index","69","dimension",["macro",145]],["map","index","70","dimension",["macro",146]],["map","index","72","dimension",["macro",147]],["map","index","73","dimension",["macro",49]],["map","index","74","dimension",["macro",148]],["map","index","75","dimension",["macro",149]],["map","index","76","dimension",["macro",52]],["map","index","77","dimension",["macro",150]],["map","index","78","dimension",["macro",151]],["map","index","79","dimension",["macro",152]],["map","index","80","dimension",["macro",153]],["map","index","81","dimension",["macro",154]],["map","index","82","dimension",["macro",155]],["map","index","83","dimension",["macro",156]],["map","index","84","dimension",["macro",157]],["map","index","85","dimension",["macro",54]],["map","index","86","dimension",["macro",158]],["map","index","87","dimension",["macro",159]],["map","index","88","dimension",["macro",160]],["map","index","89","dimension",["macro",57]],["map","index","90","dimension",["macro",161]],["map","index","91","dimension",["macro",60]],["map","index","92","dimension",["macro",65]],["map","index","93","dimension",["macro",64]],["map","index","94","dimension",["macro",59]],["map","index","95","dimension",["macro",61]],["map","index","96","dimension",["macro",58]],["map","index","97","dimension",["macro",62]],["map","index","98","dimension",["macro",63]],["map","index","99","dimension",["template",["macro",162],"|",["macro",163]]],["map","index","100","dimension",["macro",164]],["map","index","101","dimension",["macro",165]],["map","index","102","dimension",["macro",166]],["map","index","103","dimension",["macro",167]],["map","index","104","dimension",["macro",168]],["map","index","105","dimension",["macro",69]],["map","index","106","dimension",["macro",169]],["map","index","107","dimension",["macro",170]],["map","index","108","dimension",["macro",171]],["map","index","109","dimension",["macro",172]],["map","index","110","dimension",["macro",173]],["map","index","111","dimension",["macro",174]],["map","index","112","dimension",["macro",175]],["map","index","113","dimension",["macro",176]],["map","index","114","dimension",["macro",115]],["map","index","115","dimension",["macro",177]],["map","index","116","dimension",["macro",178]]],
      "vtp_enableEcommerce":true,
      "vtp_trackingId":["macro",179],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_ecommerceIsEnabled":true
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"object\"===typeof ",["escape",["macro",5],8,16],"\u0026\u0026\"S\\u00f6kfl\\u00f6de\"===",["escape",["macro",22],8,16],"?1:void 0})();"]
    },{
      "function":"__v",
      "vtp_name":"gtm.triggers",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":true,
      "vtp_defaultValue":""
    },{
      "function":"__c",
      "vtp_value":"hemnet"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"tabs.resulting"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",185],
      "vtp_map":["list",["map","key","New construction","value","Nyproduktion"],["map","key","For sale","value","Till salu"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"tabs.current"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",187],
      "vtp_map":["list",["map","key","New construction","value","Nyproduktion"],["map","key","For sale","value","Till salu"]]
    },{
      "function":"__aev",
      "vtp_varType":"TEXT"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"RoyAppKeywordProvider.keyword"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"RoyAppKeywordProvider.position"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"RoyAppKeywordProvider.database"
    },{
      "function":"__c",
      "vtp_value":"GTM-N4P3TZ"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.nearby_listings_inline_map_count"
    },{
      "function":"__u",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",87],8,16],",c=",["escape",["macro",82],8,16],",a=0;a\u003Cb.length;a++)if(b[a]==c)return!0;return!1})();"]
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_fieldsToSet":["list",["map","fieldName","clientId","value",["macro",83]],["map","fieldName","userId","value",["macro",82]]],
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_dimension":["list",["map","index","1","dimension",["macro",83]],["map","index","2","dimension",["macro",82]],["map","index","3","dimension",["macro",69]],["map","index","4","dimension",["macro",80]],["map","index","5","dimension",["macro",152]]],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-11190691-27",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__c",
      "vtp_value":"750"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"broker_agency.id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"results.toplisting.toplisting_chosen_results.0.property_id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.toplisting.toplisting_active_days"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.broker_agency_id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"sold_property.broker_agency_id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.eligible_for_package_survey"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"property.pkg_code"
    },{
      "function":"__f",
      "vtp_component":"URL"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_dataLayerVersion":2,
      "vtp_name":"property.item_type"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",207],
      "vtp_map":["list",["map","key","Ägarlägenhet","value","bostadsratt"],["map","key","Andel i bostadsförening","value","bostadsratt"],["map","key","Bostadsrätt","value","bostadsratt"],["map","key","Bostadsrättsfritidshus","value","fritidshus"],["map","key","Bostadsrättslägenhet","value","bostadsratt"],["map","key","Ej specificerad villa","value","villa"],["map","key","Friliggande villa","value","villa"],["map","key","Fritidshus","value","fritidshus"],["map","key","Gård","value","gard"],["map","key","Gård med jordbruk","value","gard"],["map","key","Gård med skogsbruk","value","gard"],["map","key","Hyresrättslägenhet","value","other"],["map","key","Lägenhet med annan ägandeform","value","bostadsratt"],["map","key","Övrigt","value","other"],["map","key","Par\/Rad\/Kedjehus","value","radhus"],["map","key","Tomt","value","tomt"],["map","key","Villa","value","villa"],["map","key","Vinterbonat fritidshus","value","fritidshus"]]
    },{
      "function":"__c",
      "vtp_value":"9222363105877728875"
    },{
      "function":"__c",
      "vtp_value":"9222361852976958873"
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"taxonomy.Sajt",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"taxonomy.Sektion",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.has_price_change",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.home_swapping",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"property.living_area",
      "vtp_dataLayerVersion":2
    },{
      "function":"__smm",
      "vtp_input":["macro",7],
      "vtp_setDefaultValue":false,
      "vtp_map":["list",["map","key","#similar-items","value","liknande objekt"],["map","key",".main-broker-link","value","knapp till mäklarsida"],["map","key",".sold-properties-link__container","value","slutpriser i området"],["map","key","#property-tools__anchor","value","räkna på boende"],["map","key",".address-directions__form","value","restider adressfält"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"banner.format"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"banner.height"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"banner.width"
    },{
      "function":"__j",
      "vtp_name":"GTM_ArticleCountedAlready"
    },{
      "function":"__c",
      "vtp_value":"3d48c0a06d91442aaa3f754525141722"
    },{
      "function":"__u",
      "vtp_component":"PROTOCOL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__c",
      "vtp_value":"133710"
    },{
      "function":"__remm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",129],
      "vtp_fullMatch":true,
      "vtp_replaceAfterMatch":true,
      "vtp_defaultValue":["macro",129],
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","0","value","include"],["map","key","1","value","only"]]
    },{
      "function":"__remm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",128],
      "vtp_fullMatch":true,
      "vtp_replaceAfterMatch":true,
      "vtp_defaultValue":["macro",128],
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","0","value","include"],["map","key","1","value","only"]]
    },{
      "function":"__remm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",134],
      "vtp_fullMatch":true,
      "vtp_replaceAfterMatch":true,
      "vtp_defaultValue":["macro",134],
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","0","value","exclude"],["map","key","1","value","include"]]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",66],8,16],"(",["escape",["macro",19],8,16],",'div[class^\\x3d\"horizontal\"]');return\"undefined\"!==typeof a?a.className:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",4],8,16],",b=document.querySelector(\"#price-trend\"),c=document.querySelector(\"#similar-items\")||\"#listing__similar-listings\",d=document.querySelector(\"#property-tools__anchor\")||\"#kalkyler\",e=document.querySelector(\".gtm-tracking-housing-cooperative-information\"),f=document.querySelector(\".showings\")||\".listing__showings\",g=document.querySelector(\".qa-footer-bar-sellers-guide\");return e\u0026\u0026b\u0026\u0026c\u0026\u0026d\u0026\u0026f\u0026\u0026g\u0026\u00261==a?!0:!1})();"]
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_name":"gtm.elementId",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementTarget",
      "vtp_dataLayerVersion":1
    },{
      "function":"__hid"
    }],
  "tags":[{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventValue":["macro",10],
      "vtp_eventCategory":["macro",94],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":["macro",95],
      "vtp_eventLabel":["macro",8],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":56
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_metric":["list",["map","index","2","metric",["macro",23]],["map","index","3","metric",["macro",182]],["map","index","4","metric",["macro",24]],["map","index","5","metric",["macro",26]]],
      "vtp_gaSettings":["macro",180],
      "vtp_trackingId":["macro",179],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":59
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_fieldsToSet":["list",["map","fieldName","page","value",["template","\/404.html?page=",["macro",13]]]],
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_contentGroup":["list",["map","index","3","group","404"]],
      "vtp_gaSettings":["macro",180],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":60
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"artikelsida",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"scrolla till slutet av artikeln",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":64
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_setTrackerName":true,
      "vtp_doubleClick":false,
      "vtp_useDebugVersion":false,
      "vtp_eventCategory":"artikelsida",
      "vtp_trackerName":["macro",184],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_enableLinkId":false,
      "vtp_eventAction":"utgående länk",
      "vtp_eventLabel":["macro",0],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":["macro",179],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":70
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"om",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"klick på länk",
      "vtp_eventLabel":["macro",0],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":75
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventValue":["macro",10],
      "vtp_eventCategory":["macro",94],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","1","metric","1"]],
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":["macro",95],
      "vtp_eventLabel":["macro",8],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":77
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_setTrackerName":true,
      "vtp_doubleClick":false,
      "vtp_useDebugVersion":false,
      "vtp_eventCategory":"sökformulär framsida",
      "vtp_trackerName":["macro",184],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_enableLinkId":false,
      "vtp_eventAction":["template","välj flik: ",["macro",186]],
      "vtp_eventLabel":["template","från flik: ",["macro",188]],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":["macro",179],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":78
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"artikelsida",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":["template","tagg: ",["macro",189]],
      "vtp_eventLabel":["macro",0],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":79
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_useDebugVersion":false,
      "vtp_eventCategory":"Roy App Keyword Provider",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":"Set provided keyword",
      "vtp_eventLabel":["macro",190],
      "vtp_setTrackerName":true,
      "vtp_doubleClick":false,
      "vtp_trackerName":["macro",184],
      "vtp_metric":["list",["map","index","7","metric",["macro",191]]],
      "vtp_enableLinkId":false,
      "vtp_dimension":["list",["map","index","55","dimension",["macro",190]],["map","index","56","dimension",["macro",191]],["map","index","57","dimension",["macro",192]]],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":["macro",179],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":80
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"artikelsida",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":["template","läs också: ",["macro",189]],
      "vtp_eventLabel":["macro",0],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":82
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"resultatvy",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"valt objekt",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":83
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventValue":["macro",10],
      "vtp_eventCategory":["macro",94],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","6","metric","1"]],
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":["macro",95],
      "vtp_eventLabel":["macro",8],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":91
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventValue":["macro",10],
      "vtp_eventCategory":["macro",94],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","9","metric","1"]],
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":["macro",95],
      "vtp_eventLabel":["macro",8],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":97
    },{
      "function":"__opt",
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_optimizeContainerId":["macro",193],
      "vtp_trackingId":["macro",179],
      "tag_id":98
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":false,
      "vtp_trackType":"TRACK_TRANSACTION",
      "vtp_gaSettings":["macro",180],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsTransaction":true,
      "tag_id":103
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"objektsida",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"expandera beskrivning",
      "vtp_eventLabel":["macro",81],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":111
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"sökformulär objektlista",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"expandering fler sökalternativ",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":117
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"resultatvy",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"närliggande träffar i karta",
      "vtp_eventLabel":["macro",194],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":138
    },{
      "function":"__awct",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"724966477",
      "vtp_conversionLabel":"pYb7CKC3wKYBEM242NkC",
      "vtp_url":["macro",195],
      "vtp_enableProductReportingCheckbox":true,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":155
    },{
      "function":"__gclidw",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableCrossDomain":false,
      "vtp_enableCookieOverrides":false,
      "vtp_enableCrossDomainFeature":true,
      "vtp_enableCookieUpdateFeature":false,
      "tag_id":156
    },{
      "function":"__ua",
      "metadata":["map"],
      "setup_tags":["list",["tag",1,0]],
      "once_per_event":true,
      "vtp_overrideGaSettings":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",197],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":162
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventValue":["macro",10],
      "vtp_eventCategory":["macro",94],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",197],
      "vtp_eventAction":["macro",95],
      "vtp_eventLabel":["macro",8],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":163
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"resultatvy",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"scrollnivå",
      "vtp_eventLabel":["macro",7],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":168
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"objektsida",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",180],
      "vtp_eventAction":"bildgalleri",
      "vtp_eventLabel":["template","nådde ",["macro",92]," av ",["macro",91]," bilder"],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":172
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_overrideGaSettings":false,
      "vtp_trackType":"TRACK_TRANSACTION",
      "vtp_gaSettings":["macro",197],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsTransaction":true,
      "tag_id":175
    },{
      "function":"__cl",
      "tag_id":176
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":true,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_80",
      "tag_id":177
    },{
      "function":"__lcl",
      "vtp_waitForTags":true,
      "vtp_checkValidation":true,
      "vtp_waitForTagsTimeout":["macro",198],
      "vtp_uniqueTriggerId":"1530575_83",
      "tag_id":178
    },{
      "function":"__lcl",
      "vtp_waitForTags":true,
      "vtp_checkValidation":true,
      "vtp_waitForTagsTimeout":["macro",198],
      "vtp_uniqueTriggerId":"1530575_84",
      "tag_id":179
    },{
      "function":"__lcl",
      "vtp_waitForTags":true,
      "vtp_checkValidation":true,
      "vtp_waitForTagsTimeout":["macro",198],
      "vtp_uniqueTriggerId":"1530575_87",
      "tag_id":180
    },{
      "function":"__lcl",
      "vtp_waitForTags":true,
      "vtp_checkValidation":true,
      "vtp_waitForTagsTimeout":["macro",198],
      "vtp_uniqueTriggerId":"1530575_90",
      "tag_id":181
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_92",
      "tag_id":182
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":"#price-trend",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_200",
      "tag_id":183
    },{
      "function":"__cl",
      "tag_id":184
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_elementSelector":"#property-tools__anchor",
      "vtp_firingFrequency":"ONCE",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_284",
      "tag_id":185
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_elementSelector":"#link-anchor-map",
      "vtp_firingFrequency":"ONCE",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_287",
      "tag_id":186
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".similar-items-container",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_288",
      "tag_id":187
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".footer-bar",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"100",
      "vtp_uniqueTriggerId":"1530575_289",
      "tag_id":188
    },{
      "function":"__cl",
      "tag_id":189
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_elementSelector":".gtm-tracking-centerfold-ad",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_361",
      "tag_id":190
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_362",
      "tag_id":191
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_elementSelector":".gtm-tracking-broker-tip-item",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_363",
      "tag_id":192
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_364",
      "tag_id":193
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".showings",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_369",
      "tag_id":194
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".broker-contact-card",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_370",
      "tag_id":195
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".sellers-page-upsell",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_375",
      "tag_id":196
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":".gtm-tracking-project-listing",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_388",
      "tag_id":197
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":".gtm-tracking-project-ad",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_390",
      "tag_id":198
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_391",
      "tag_id":199
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_392",
      "tag_id":200
    },{
      "function":"__cl",
      "tag_id":201
    },{
      "function":"__cl",
      "tag_id":202
    },{
      "function":"__cl",
      "tag_id":203
    },{
      "function":"__cl",
      "tag_id":204
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".listing__showings",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_418",
      "tag_id":205
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".broker-contact-card--sidebar",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_419",
      "tag_id":206
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_elementSelector":"#kalkyler",
      "vtp_firingFrequency":"ONCE",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_420",
      "tag_id":207
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_firingFrequency":"ONCE",
      "vtp_elementSelector":".similar-listings",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_421",
      "tag_id":208
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":false,
      "vtp_elementSelector":".gtm-tracking-housing-cooperative-information",
      "vtp_firingFrequency":"ONCE",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_422",
      "tag_id":209
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":".gtm-tracking-find-broker-ad",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"1530575_431",
      "tag_id":210
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_434",
      "tag_id":211
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"1530575_435",
      "tag_id":212
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":true,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":".all-images__halfway-image",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_onScreenDuration":"500",
      "vtp_uniqueTriggerId":"1530575_484",
      "tag_id":213
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":true,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":".all-images__last-image",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_onScreenDuration":"500",
      "vtp_uniqueTriggerId":"1530575_485",
      "tag_id":214
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E\/*\n @preserve\n jquery.scrolldepth.js | v0.8\n Copyright (c) 2015 Rob Flaherty (@robflaherty)\n Licensed under the MIT and GPL licenses.\n*\/\n(function(e,f,r,A){var v={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0,nonInteraction:!0,gaGlobal:!1,gtmOverride:!1},n=e(f),k=[],l=0,m,p,g,h;e.scrollDepth=function(a){function t(a,c){if(h)h({event:\"ScrollDistance\",eventCategory:\"Scroll Depth\",eventAction:a,eventLabel:\"Baseline\",eventValue:1,eventNonInteraction:!0});else{if(m)f[g](\"send\",\"event\",\"Scroll Depth\",a,\"Baseline\",1,{nonInteraction:!0});p\u0026\u0026_gaq.push([\"_trackEvent\",\"Scroll Depth\",a,\"Baseline\",1,!0])}}function u(b,c,d,q){if(h)h({event:\"ScrollDistance\",\neventCategory:\"Scroll Depth\",eventAction:b,eventLabel:c,eventValue:1,eventNonInteraction:a.nonInteraction}),a.pixelDepth\u0026\u00262\u003Carguments.length\u0026\u0026d\u003El\u0026\u0026(l=d,h({event:\"ScrollDistance\",eventCategory:\"Scroll Depth\",eventAction:\"Pixel Depth\",eventLabel:(250*Math.floor(d\/250)).toString(),eventValue:1,eventNonInteraction:a.nonInteraction})),a.userTiming\u0026\u00263\u003Carguments.length\u0026\u0026h({event:\"ScrollTiming\",eventCategory:\"Scroll Depth\",eventAction:b,eventLabel:c,eventTiming:q});else{if(m\u0026\u0026(f[g](\"send\",\"event\",\"Scroll Depth\",\nb,c,1,{nonInteraction:a.nonInteraction}),a.pixelDepth\u0026\u00262\u003Carguments.length\u0026\u0026d\u003El\u0026\u0026(l=d,f[g](\"send\",\"event\",\"Scroll Depth\",\"Pixel Depth\",(250*Math.floor(d\/250)).toString(),1,{nonInteraction:a.nonInteraction})),a.userTiming\u0026\u00263\u003Carguments.length))f[g](\"send\",\"timing\",\"Scroll Depth\",b,q,c);p\u0026\u0026(_gaq.push([\"_trackEvent\",\"Scroll Depth\",b,c,1,a.nonInteraction]),a.pixelDepth\u0026\u00262\u003Carguments.length\u0026\u0026d\u003El\u0026\u0026(l=d,_gaq.push([\"_trackEvent\",\"Scroll Depth\",\"Pixel Depth\",(250*Math.floor(d\/250)).toString(),1,a.nonInteraction])),\na.userTiming\u0026\u00263\u003Carguments.length\u0026\u0026_gaq.push([\"_trackTiming\",\"Scroll Depth\",b,q,c,100]))}}function w(a,c,d){e.each(a,function(a,b){-1===e.inArray(a,k)\u0026\u0026c\u003E=b\u0026\u0026(u(\"Percentage\",a,c,d),k.push(a))})}function x(a,c,d){e.each(a,function(a,b){-1===e.inArray(b,k)\u0026\u0026e(b).length\u0026\u0026c\u003E=e(b).offset().top\u0026\u0026(u(\"Elements\",b,c,d),k.push(b))})}function y(a,c){var b,e,h,f=null,g=0,l=function(){g=new Date;f=null;h=a.apply(b,e)};return function(){var d=new Date;g||(g=d);var k=c-(d-g);b=this;e=arguments;0\u003E=k?(clearTimeout(f),\nf=null,g=d,h=a.apply(b,e)):f||(f=setTimeout(l,k));return h}}var z=+new Date;a=e.extend({},v,a);e(r).height()\u003Ca.minHeight||(a.gaGlobal?(m=!0,g=a.gaGlobal):\"function\"===typeof ga?(m=!0,g=\"ga\"):\"function\"===typeof __gaTracker\u0026\u0026(m=!0,g=\"__gaTracker\"),\"undefined\"!==typeof _gaq\u0026\u0026\"function\"===typeof _gaq.push\u0026\u0026(p=!0),\"function\"===typeof a.eventHandler?h=a.eventHandler:\"undefined\"===typeof dataLayer||\"function\"!==typeof dataLayer.push||a.gtmOverride||(h=function(a){dataLayer.push(a)}),a.percentage?t(\"Percentage\"):\na.elements\u0026\u0026t(\"Elements\"),n.on(\"scroll.scrollDepth\",y(function(){var b=e(r).height(),c=f.innerHeight?f.innerHeight:n.height();c=n.scrollTop()+c;b={\"25%\":parseInt(.25*b,10),\"50%\":parseInt(.5*b,10),\"75%\":parseInt(.75*b,10),\"100%\":b-5};var d=+new Date-z;k.length\u003E=4+a.elements.length?n.off(\"scroll.scrollDepth\"):(a.elements\u0026\u0026x(a.elements,c,d),a.percentage\u0026\u0026w(b,c,d))},500)))}})(jQuery,window,document);\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003EjQuery\u0026\u0026jQuery.scrollDepth({minHeight:2E3,elements:'.section.related .main-broker-link #property-tools__anchor .address-directions__form .sold-properties-link__container #similar-items li[data-gtm-item-page\\x3d\"1\"] li[data-gtm-item-page\\x3d\"5\"] li[data-gtm-item-page\\x3d\"10\"] li[data-gtm-item-page\\x3d\"15\"] li[data-gtm-item-page\\x3d\"20\"] li[data-gtm-item-page\\x3d\"25\"] li[data-gtm-item-page\\x3d\"30\"] li[data-gtm-item-page\\x3d\"35\"] li[data-gtm-item-page\\x3d\"40\"] li[data-gtm-item-page\\x3d\"45\"] li[data-gtm-item-page\\x3d\"50\"]'.split(\" \"),\npercentage:!1,userTiming:!1,pixelDepth:!1,nonInteraction:!1});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":63
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Evar _cInfo=_cInfo||[];(function(){if(null===document.cookie.match(\"__codnt\")){window._cInfo.push({cmd:\"_trackContentPath\",val:window.location.pathname},{cmd:\"_executeTracking\"});var a=document.createElement(\"script\");a.type=\"text\/javascript\";a.async=!0;a.src=(\"https:\"==document.location.protocol?\"https:\/\/\":\"http:\/\/\")+\"analytics.codigo.se\/j\/c07e5947c9b34922b1e5b884cf08532c.js\";var b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)}})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":92
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E(function(a,c,e,f,d,b){a.hj=a.hj||function(){(a.hj.q=a.hj.q||[]).push(arguments)};a._hjSettings={hjid:420875,hjsv:5};d=c.getElementsByTagName(\"head\")[0];b=c.createElement(\"script\");b.async=1;b.src=e+a._hjSettings.hjid+f+a._hjSettings.hjsv;d.appendChild(b)})(window,document,\"\/\/static.hotjar.com\/c\/hotjar-\",\".js?sv\\x3d\");window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};hj(\"tagRecording\",[\"Experiment Group: \"+",["escape",["macro",30],8,16],",\"User Status: \"+",["escape",["macro",18],8,16],",\"Client ID: \"+",["escape",["macro",32],8,16],"]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":95
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackPageView\",null,[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":114
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003EElement.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=a.length;0\u003C=--b\u0026\u0026a.item(b)!==this;);return-1\u003Cb});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":115
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackSelfDescribingEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"broker_link_click\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":118
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackSelfDescribingEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"all_images\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":120
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackSelfDescribingEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"calendar_download\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":121
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"oss-li-b\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":124
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackPageView\",null,[{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",199],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":125
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackPageView\",null,[{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",199],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":126
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/ad_impression\/jsonschema\/1-0-0\",data:{name:\"toplisting_impression\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:parseInt(",["escape",["macro",200],8,16],")}},{schema:\"iglu:se.hemnet\/supplemental_ad\/jsonschema\/1-0-1\",data:{ad_id:parseInt(",["escape",["macro",173],8,16],"),product:\"toplisting\",share_of_voice:1\/",["escape",["macro",170],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":128
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=",["escape",["macro",3],8,16],",b=parseInt(a.id);a=parseInt(a.toplisting.id);window.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"toplisting_click\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:b}},{schema:\"iglu:se.hemnet\/supplemental_ad\/jsonschema\/1-0-0\",data:{ad_id:a,product:\"toplisting\"}}])})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":129
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"sellers_active_rocket\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":130
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/ad_impression\/jsonschema\/1-0-0\",data:{name:\"centerfold\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",73],8,16],"}},{schema:\"iglu:se.hemnet\/supplemental_ad\/jsonschema\/1-0-1\",data:{ad_id:",["escape",["macro",72],8,16],",product:\"centerfold\"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":133
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"centerfold_click\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",73],8,16],"}},{schema:\"iglu:se.hemnet\/supplemental_ad\/jsonschema\/1-0-0\",data:{ad_id:",["escape",["macro",72],8,16],",product:\"centerfold\"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":134
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"broker_tip_click\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",75],8,16],"}},{schema:\"iglu:se.hemnet\/supplemental_ad\/jsonschema\/1-0-0\",data:{ad_id:",["escape",["macro",74],8,16],",product:\"broker_tip\"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":136
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/ad_impression\/jsonschema\/1-0-0\",data:{name:\"broker_tip\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",75],8,16],"}},{schema:\"iglu:se.hemnet\/supplemental_ad\/jsonschema\/1-0-1\",data:{ad_id:",["escape",["macro",74],8,16],",product:\"broker_tip\"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":137
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/ad_impression\/jsonschema\/1-0-0\",data:{name:\"result_page\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",76],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":144
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/ad_impression\/jsonschema\/1-0-0\",data:{name:\"project_ad\"}},[{schema:\"iglu:se.hemnet\/project_ad\/jsonschema\/1-0-0\",data:{project_ad_id:",["escape",["macro",77],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":145
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"result_page\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",76],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":146
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"project_ad\"}},[{schema:\"iglu:se.hemnet\/project_ad\/jsonschema\/1-0-0\",data:{project_ad_id:",["escape",["macro",77],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":147
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"broker_email_click\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}},{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",202],8,16],"}},{schema:\"iglu:se.hemnet\/broker\/jsonschema\/1-0-0\",data:{broker_id:",["escape",["macro",78],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":149
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"broker_phone_click\"}},[{schema:\"iglu:se.hemnet\/listing\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}},{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",202],8,16],"}},{schema:\"iglu:se.hemnet\/broker\/jsonschema\/1-0-0\",data:{broker_id:",["escape",["macro",78],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":150
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"broker_phone_click\"}},[{schema:\"iglu:se.hemnet\/sale\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}},{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",203],8,16],"}},{schema:\"iglu:se.hemnet\/broker\/jsonschema\/1-0-0\",data:{broker_id:",["escape",["macro",78],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":151
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"broker_email_click\"}},[{schema:\"iglu:se.hemnet\/sale\/jsonschema\/1-0-0\",data:{listing_id:",["escape",["macro",81],8,16],"}},{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",203],8,16],"}},{schema:\"iglu:se.hemnet\/broker\/jsonschema\/1-0-0\",data:{broker_id:",["escape",["macro",78],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":152
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"sellers7days\");\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":154
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/ad_impression\/jsonschema\/1-0-0\",data:{name:\"find_broker_ad\"}},[{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",79],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":157
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"find_broker_ad_internal_click\"}},[{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",79],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":158
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.spTrack(\"trackUnstructEvent\",{schema:\"iglu:se.hemnet\/click\/jsonschema\/1-0-0\",data:{name:\"find_broker_ad_external_click\"}},[{schema:\"iglu:se.hemnet\/broker_agency\/jsonschema\/1-0-0\",data:{broker_agency_id:",["escape",["macro",79],8,16],"}}]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":159
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"plus_survey\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":160
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"fullscreen-gallery-recording\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":161
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"premium_survey\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":164
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.sessionStorage.getItem(\"sk_pkg_code\")||\"base\"!=",["escape",["macro",205],8,16],"||window.sessionStorage.setItem(\"sk_pkg_code\",\"base\");\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":166
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"sellers_left_package_page\");\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":167
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"saljkollen-sthlm\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":169
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Ehj(\"trigger\",\"property-sthlm\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":170
    }],
  "predicates":[{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"legacyEvent"
    },{
      "function":"_eq",
      "arg0":["macro",94],
      "arg1":"inspiration"
    },{
      "function":"_eq",
      "arg0":["macro",95],
      "arg1":"visa bild"
    },{
      "function":"_eq",
      "arg0":["macro",94],
      "arg1":"värdera bostad"
    },{
      "function":"_eq",
      "arg0":["macro",95],
      "arg1":"klick värdera bostad"
    },{
      "function":"_eq",
      "arg0":["macro",94],
      "arg1":"objekt mäklarnavigation"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gtm.js"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gatsby-route-change"
    },{
      "function":"_eq",
      "arg0":["macro",140],
      "arg1":"404"
    },{
      "function":"_sw",
      "arg0":["macro",181],
      "arg1":"https:\/\/area-pages.hemnet.se\/location\/"
    },{
      "function":"_eq",
      "arg0":["macro",7],
      "arg1":".section.related"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"ScrollDistance"
    },{
      "function":"_eq",
      "arg0":["macro",1],
      "arg1":"www.hemnet.se"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gtm.linkClick"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_80($|,)))"
    },{
      "function":"_css",
      "arg0":["macro",19],
      "arg1":".news.archive a, .news.archive ~ .editorial a, .about-section a"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_83($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"switching top tab in main search"
    },{
      "function":"_css",
      "arg0":["macro",19],
      "arg1":".article-tags li a"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_87($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"Provided keyword"
    },{
      "function":"_css",
      "arg0":["macro",19],
      "arg1":".section.recent-news a.recent-news__link"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_90($|,)))"
    },{
      "function":"_css",
      "arg0":["macro",19],
      "arg1":"#search-results a.item-link-container"
    },{
      "function":"_css",
      "arg0":["macro",19],
      "arg1":"#search-results .item.result a.additional-info-toggler"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_92($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"^\\\/bostad\\\/.*"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"^\\\/boost\\\/listettan.*"
    },{
      "function":"_cn",
      "arg0":["macro",12],
      "arg1":"saljkollen"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"ecommerce.transaction"
    },{
      "function":"_re",
      "arg0":["macro",70],
      "arg1":"^button--link property__description-expand centered$|^property-description-expander-button js-property-description-expander-button$"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"\\\/bostad\\\/.*"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gtm.click"
    },{
      "function":"_eq",
      "arg0":["macro",70],
      "arg1":"search-form__expand-more-filters-button js-search-form-expand-more-filters"
    },{
      "function":"_gt",
      "arg0":["macro",194],
      "arg1":"0"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"nearbyListingsInMapEvent"
    },{
      "function":"_re",
      "arg0":["macro",94],
      "arg1":"^objektsida$|^objekt mäklarnavigation$"
    },{
      "function":"_re",
      "arg0":["macro",95],
      "arg1":"^lägg till i kalender$|^utgående mäklarlänk|(telefon|mailadress) mäklare$|spara objekt"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":".*\\\/saljkollen\\\/\\d{8}\\\/[0-9a-f]*$"
    },{
      "function":"_cn",
      "arg0":["macro",181],
      "arg1":"role=admin"
    },{
      "function":"_eq",
      "arg0":["macro",196],
      "arg1":"true"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"\/raketen|\/plus|\/premium|\/bas|\/valj-paket|\/paket|.*\\\/saljkollen\\\/\\d*$"
    },{
      "function":"_sw",
      "arg0":["macro",7],
      "arg1":"li[data-gtm-item-page="
    },{
      "function":"_cn",
      "arg0":["macro",161],
      "arg1":"{\"n\":\"bip\",\"v\":\"B\"}"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gtm.elementVisibility"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_484($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_485($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"^\/artiklar\/.+\/[0-9]+\/[0-9]+\/[0-9]+\/.+"
    },{
      "function":"_sw",
      "arg0":["macro",12],
      "arg1":"\/om"
    },{
      "function":"_eq",
      "arg0":["macro",6],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gtm.dom"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"^\/artiklar\/.+\/[0-9]+\/[0-9]+\/[0-9]+\/.+",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",4],
      "arg1":"true"
    },{
      "function":"_cn",
      "arg0":["macro",95],
      "arg1":"utgående mäklarlänk"
    },{
      "function":"_cn",
      "arg0":["macro",8],
      "arg1":"objekt alla bilder knapp"
    },{
      "function":"_eq",
      "arg0":["macro",94],
      "arg1":"objektsida"
    },{
      "function":"_eq",
      "arg0":["macro",95],
      "arg1":"lägg till i kalender"
    },{
      "function":"_eq",
      "arg0":["macro",152],
      "arg1":"false"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"Sökflöde"
    },{
      "function":"_cn",
      "arg0":["macro",12],
      "arg1":"\/karta"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"maklare\\\/objekt\\\/\\d+",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"maklare\\\/salda\\\/\\d+",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",6],
      "arg1":"true"
    },{
      "function":"_gt",
      "arg0":["macro",156],
      "arg1":"0"
    },{
      "function":"_eq",
      "arg0":["macro",94],
      "arg1":"resultatvy"
    },{
      "function":"_eq",
      "arg0":["macro",95],
      "arg1":"valt objekt"
    },{
      "function":"_eq",
      "arg0":["macro",169],
      "arg1":"raketen"
    },{
      "function":"_gt",
      "arg0":["macro",201],
      "arg1":"1"
    },{
      "function":"_cn",
      "arg0":["macro",12],
      "arg1":"\/saljkollen\/"
    },{
      "function":"_gt",
      "arg0":["macro",159],
      "arg1":"0"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_361($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-centerfold-ad-link"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_362($|,)))"
    },{
      "function":"_gt",
      "arg0":["macro",160],
      "arg1":"0"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-broker-tip-item"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_364($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_363($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_388($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_390($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-project-listing"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_391($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-project-ad"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_392($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",181],
      "arg1":".*\\\/bostad\\\/.*"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-broker-email"
    },{
      "function":"_eq",
      "arg0":["macro",78],
      "arg1":"undefined"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-broker-phone"
    },{
      "function":"_re",
      "arg0":["macro",181],
      "arg1":".*\\\/salda\\\/.*"
    },{
      "function":"_eq",
      "arg0":["macro",204],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"gtm.load"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_431($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-find-broker-ad-internal-link"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_434($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",70],
      "arg1":"gtm-tracking-find-broker-ad-external-link"
    },{
      "function":"_re",
      "arg0":["macro",183],
      "arg1":"(^$|((^|,)1530575_435($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",205],
      "arg1":"plus"
    },{
      "function":"_cn",
      "arg0":["macro",161],
      "arg1":"\"n\":\"ail\",\"v\":\"B\""
    },{
      "function":"_eq",
      "arg0":["macro",95],
      "arg1":"bildgalleri"
    },{
      "function":"_cn",
      "arg0":["macro",8],
      "arg1":"öppna"
    },{
      "function":"_eq",
      "arg0":["macro",205],
      "arg1":"premium"
    },{
      "function":"_re",
      "arg0":["macro",181],
      "arg1":".*\\\/paket\\\/\\d*$"
    },{
      "function":"_re",
      "arg0":["macro",206],
      "arg1":".*\\\/paket\\\/\\d*$"
    },{
      "function":"_re",
      "arg0":["macro",181],
      "arg1":".*\\\/raketen\\\/\\d*\\\/betala.*\\\/raketen\\\/\\d*\\\/tack"
    },{
      "function":"_re",
      "arg0":["macro",181],
      "arg1":".*\\\/plus\\\/\\d*\\\/betala|.*\\\/plus\\\/\\d*\\\/tack"
    },{
      "function":"_re",
      "arg0":["macro",181],
      "arg1":".*\\\/premium\\\/\\d*\\\/betala|.*\\\/premium\\\/\\d*\\\/tack"
    },{
      "function":"_eq",
      "arg0":["macro",86],
      "arg1":"base"
    },{
      "function":"_re",
      "arg0":["macro",12],
      "arg1":"^\\\/saljkollen\\\/\\d{8}\\\/.*"
    },{
      "function":"_eq",
      "arg0":["macro",149],
      "arg1":"Stockholms län"
    },{
      "function":"_eq",
      "arg0":["macro",148],
      "arg1":"Stockholms kommun"
    }],
  "rules":[
    [["if",0],["add",0]],
    [["if",6],["add",1,20,66,67,69,26,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]],
    [["if",7],["add",1,67]],
    [["if",6,8],["add",2],["block",1]],
    [["if",10,11],["add",3]],
    [["if",13,14],["unless",12],["add",4]],
    [["if",13,15,16],["add",5]],
    [["if",0,1,2],["add",6],["block",0]],
    [["if",17],["add",7]],
    [["if",13,18,19],["add",8]],
    [["if",20],["add",9]],
    [["if",13,21,22],["add",10]],
    [["if",13,23,25],["unless",24],["add",11]],
    [["if",0,3,4],["add",12],["block",0]],
    [["if",0,5],["add",13],["block",0]],
    [["if",6,26],["add",14]],
    [["if",6,27],["add",14]],
    [["if",6,28],["add",14]],
    [["if",29],["add",15,25]],
    [["if",30,31,32],["add",16]],
    [["if",32,33],["add",17]],
    [["if",34,35],["add",18]],
    [["if",0,36,37],["add",19]],
    [["if",6,38],["unless",39],["add",21]],
    [["if",6,40,41],["unless",39],["add",21]],
    [["if",0,38],["unless",39],["add",22]],
    [["if",11,42,43],["add",23]],
    [["if",44,45],["add",24]],
    [["if",44,46],["add",24]],
    [["if",6,47],["add",27,29,30,31]],
    [["if",6,48],["add",28]],
    [["if",49,50],["add",65]],
    [["if",50,51],["add",65]],
    [["if",6,52],["add",68]],
    [["if",0,5,53],["add",70]],
    [["if",0,5,54],["add",71]],
    [["if",0,55,56],["add",72]],
    [["if",6,43,57,58],["unless",59],["add",73]],
    [["if",50,60],["add",74]],
    [["if",50,61],["add",75]],
    [["if",6,62,63],["add",76]],
    [["if",0,64,65,66],["add",77]],
    [["if",6,67,68],["add",78]],
    [["if",44,69,70],["add",79]],
    [["if",13,69,71,72],["add",80]],
    [["if",13,73,74,75],["add",81]],
    [["if",44,73,76],["add",82]],
    [["if",44,77],["add",83]],
    [["if",44,78],["add",84]],
    [["if",13,79,80],["add",85]],
    [["if",13,81,82],["add",86]],
    [["if",32,83,84],["unless",85],["add",87]],
    [["if",32,83,86],["unless",85],["add",88]],
    [["if",32,86,87],["unless",85],["add",89]],
    [["if",32,84,87],["unless",85],["add",90]],
    [["if",88,89],["add",91]],
    [["if",44,90],["add",92]],
    [["if",13,91,92],["add",93]],
    [["if",13,93,94],["add",94]],
    [["if",6,38,88,95],["add",95]],
    [["if",0,55,57,96,97,98],["add",96]],
    [["if",6,38,88,99],["add",97]],
    [["if",6,100],["add",98]],
    [["if",89,101,105],["unless",100,102,103,104],["add",99]],
    [["if",6,57,106,107],["add",100]],
    [["if",6,26,57,108],["add",101]],
    [["if",6,9],["block",1]]]
},
"runtime":[
[],[]
]



};
var aa,ba="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},da;if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={nf:!0},ia={};try{ia.__proto__=fa;ea=ia.nf;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ja=da,la=this||self,ma=/^[\w+/_-]+[=]{0,2}$/,oa=null;var pa=function(){},qa=function(a){return"function"==typeof a},f=function(a){return"string"==typeof a},ra=function(a){return"number"==typeof a&&!isNaN(a)},ua=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},t=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},va=function(a,b){if(a&&ua(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},wa=function(a,b){if(!ra(a)||
!ra(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},ya=function(a,b){for(var c=new xa,d=0;d<a.length;d++)c.set(a[d],!0);for(var e=0;e<b.length;e++)if(c.get(b[e]))return!0;return!1},za=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},Aa=function(a){return Math.round(Number(a))||0},Ca=function(a){return"false"==String(a).toLowerCase()?!1:!!a},Da=function(a){var b=[];if(ua(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},Ea=function(a){return a?
a.replace(/^\s+|\s+$/g,""):""},Fa=function(){return(new Date).getTime()},xa=function(){this.prefix="gtm.";this.values={}};xa.prototype.set=function(a,b){this.values[this.prefix+a]=b};xa.prototype.get=function(a){return this.values[this.prefix+a]};xa.prototype.contains=function(a){return void 0!==this.get(a)};
var Ga=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ha=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},Ia=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},Ja=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},Ka=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},La=function(a,b){for(var c={},d=c,e=a.split("."),g=0;g<e.length-1;g++)d=d[e[g]]={};d[e[e.length-1]]=b;return c};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Ma=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Na=function(a){if(null==a)return String(a);var b=Ma.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Oa=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Pa=function(a){if(!a||"object"!=Na(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Oa(a,"constructor")&&!Oa(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Oa(a,b)},B=function(a,b){var c=b||("array"==Na(a)?[]:{}),d;for(d in a)if(Oa(a,d)){var e=a[d];"array"==Na(e)?("array"!=Na(c[d])&&(c[d]=[]),c[d]=B(e,c[d])):Pa(e)?(Pa(c[d])||(c[d]={}),c[d]=B(e,c[d])):c[d]=e}return c};
var Qa=[],Ra={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},Sa=function(a){return Ra[a]},Ta=/[\x00\x22\x26\x27\x3c\x3e]/g;var Xa=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,Ya={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},Za=function(a){return Ya[a]};
Qa[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(Xa,Za)+"'"}};var jb=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,lb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},mb=function(a){return lb[a]};Qa[16]=function(a){return a};var ob;
var pb=[],qb=[],rb=[],tb=[],ub=[],vb={},wb,xb,yb,zb=function(a,b){var c={};c["function"]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);return c},Ab=function(a,b){var c=a["function"];if(!c)throw Error("Error: No function name given for function call.");var d=vb[c],e={},g;for(g in a)a.hasOwnProperty(g)&&0===g.indexOf("vtp_")&&(e[void 0!==d?g:g.substr(4)]=a[g]);return void 0!==d?d(e):ob(c,e,b)},Db=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=Bb(a[e],b,c));
return d},Eb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";var c=vb[b];return c?c.priorityOverride||0:0},Bb=function(a,b,c){if(ua(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(Bb(a[e],b,c));return d;case "macro":var g=a[1];if(c[g])return;var h=pb[g];if(!h||b.Gc(h))return;c[g]=!0;try{var k=Db(h,b,c);k.vtp_gtmEventId=b.id;d=Ab(k,b);yb&&(d=yb.Rf(d,k))}catch(y){b.ce&&b.ce(y,Number(g)),d=!1}c[g]=
!1;return d;case "map":d={};for(var l=1;l<a.length;l+=2)d[Bb(a[l],b,c)]=Bb(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,n=1;n<a.length;n++){var q=Bb(a[n],b,c);xb&&(m=m||q===xb.yb);d.push(q)}return xb&&m?xb.Uf(d):d.join("");case "escape":d=Bb(a[1],b,c);if(xb&&ua(a[1])&&"macro"===a[1][0]&&xb.Bg(a))return xb.Mg(d);d=String(d);for(var u=2;u<a.length;u++)Qa[a[u]]&&(d=Qa[a[u]](d));return d;case "tag":var p=a[1];if(!tb[p])throw Error("Unable to resolve tag reference "+p+".");return d={Td:a[2],
index:p};case "zb":var r={arg0:a[2],arg1:a[3],ignore_case:a[5]};r["function"]=a[1];var v=Fb(r,b,c),w=!!a[4];return w||2!==v?w!==(1===v):null;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},Fb=function(a,b,c){try{return wb(Db(a,b,c))}catch(d){JSON.stringify(a)}return 2};var Gb=function(){var a=function(b){return{toString:function(){return b}}};return{jd:a("convert_case_to"),kd:a("convert_false_to"),ld:a("convert_null_to"),md:a("convert_true_to"),nd:a("convert_undefined_to"),sh:a("debug_mode_metadata"),la:a("function"),bf:a("instance_name"),cf:a("live_only"),df:a("malware_disabled"),ef:a("metadata"),uh:a("original_vendor_template_id"),ff:a("once_per_event"),Gd:a("once_per_load"),Hd:a("setup_tags"),Id:a("tag_id"),Jd:a("teardown_tags")}}();var Hb=null,Kb=function(a){function b(q){for(var u=0;u<q.length;u++)d[q[u]]=!0}var c=[],d=[];Hb=Ib(a);for(var e=0;e<qb.length;e++){var g=qb[e],h=Jb(g);if(h){for(var k=g.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(g.block||[])}else null===h&&b(g.block||[])}for(var m=[],n=0;n<tb.length;n++)c[n]&&!d[n]&&(m[n]=!0);return m},Jb=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=Hb(b[c]);if(0===d)return!1;if(2===d)return null}for(var e=a.unless||[],g=0;g<e.length;g++){var h=Hb(e[g]);if(2===h)return null;
if(1===h)return!1}return!0},Ib=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=Fb(rb[c],a));return b[c]}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */
var D=window,F=document,Sb=navigator,Tb=F.currentScript&&F.currentScript.src,Ub=function(a,b){var c=D[a];D[a]=void 0===c?b:c;return D[a]},Vb=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},Wb=function(a,b,c){var d=F.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Vb(d,b);c&&(d.onerror=c);var e;if(null===oa)b:{var g=la.document,h=g.querySelector&&g.querySelector("script[nonce]");
if(h){var k=h.nonce||h.getAttribute("nonce");if(k&&ma.test(k)){oa=k;break b}}oa=""}e=oa;e&&d.setAttribute("nonce",e);var l=F.getElementsByTagName("script")[0]||F.body||F.head;l.parentNode.insertBefore(d,l);return d},Xb=function(){if(Tb){var a=Tb.toLowerCase();if(0===a.indexOf("https://"))return 2;if(0===a.indexOf("http://"))return 3}return 1},Yb=function(a,b){var c=F.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=F.body&&F.body.lastChild||
F.body||F.head;d.parentNode.insertBefore(c,d);Vb(c,b);void 0!==a&&(c.src=a);return c},Zb=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},$b=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},ac=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},G=function(a){D.setTimeout(a,0)},bc=function(a,b){return a&&
b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},cc=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},dc=function(a){var b=F.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},ec=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var g=a,h=0;g&&h<=c;h++){if(d[String(g.tagName).toLowerCase()])return g;
g=g.parentElement}return null},fc=function(a,b){var c=a[b];c&&"string"===typeof c.animVal&&(c=c.animVal);return c};var I={ka:"_ee",cc:"event_callback",Ra:"event_timeout",w:"gtag.config",O:"allow_ad_personalization_signals",U:"cookie_expires",Pa:"cookie_update",Aa:"session_duration",V:"user_properties"};var uc=/[A-Z]+/,vc=/\s/,wc=function(a){if(f(a)&&(a=Ea(a),!vc.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(uc.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],h:d}}}}},yc=function(a){for(var b={},c=0;c<a.length;++c){var d=wc(a[c]);d&&(b[d.id]=d)}xc(b);var e=[];za(b,function(g,h){e.push(h)});return e};
function xc(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.h[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var zc={},Ac=null,Bc=Math.random();zc.m="GTM-MMHTZ7";zc.Cb="av9";var Cc={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fal:!0,__fil:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0,__paused:!0,__tg:!0},Dc="www.googletagmanager.com/gtm.js";var Ec=Dc,Fc=null,Gc=null,Hc=null,Ic="//www.googletagmanager.com/a?id="+zc.m+"&cv=329",Jc={},Kc={},Lc=function(){var a=Ac.sequence||0;Ac.sequence=a+1;return a};var Mc={},J=function(a,b){Mc[a]=Mc[a]||[];Mc[a][b]=!0},Nc=function(a){for(var b=[],c=Mc[a]||[],d=0;d<c.length;d++)c[d]&&(b[Math.floor(d/6)]^=1<<d%6);for(var e=0;e<b.length;e++)b[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b[e]||0);return b.join("")};
var Oc=function(){return"&tc="+tb.filter(function(a){return a}).length},Rc=function(){Pc||(Pc=D.setTimeout(Qc,500))},Qc=function(){Pc&&(D.clearTimeout(Pc),Pc=void 0);void 0===Sc||Tc[Sc]&&!Uc&&!Vc||(Wc[Sc]||Xc.Dg()||0>=Yc--?(J("GTM",1),Wc[Sc]=!0):(Xc.Xg(),Zb(Zc()),Tc[Sc]=!0,ad=Vc=Uc=""))},Zc=function(){var a=Sc;if(void 0===a)return"";var b=Nc("GTM"),c=Nc("TAGGING");return[bd,Tc[a]?"":"&es=1",cd[a],b?"&u="+b:"",c?"&ut="+c:"",Oc(),Uc,Vc,ad,"&z=0"].join("")},dd=function(){return[Ic,"&v=3&t=t","&pid="+
wa(),"&rv="+zc.Cb].join("")},ed="0.005000">Math.random(),bd=dd(),fd=function(){bd=dd()},Tc={},Uc="",Vc="",ad="",Sc=void 0,cd={},Wc={},Pc=void 0,Xc=function(a,b){var c=0,d=0;return{Dg:function(){if(c<a)return!1;Fa()-d>=b&&(c=0);return c>=a},Xg:function(){Fa()-d>=b&&(c=0);c++;d=Fa()}}}(2,1E3),Yc=1E3,gd=function(a,b){if(ed&&!Wc[a]&&Sc!==a){Qc();Sc=a;Uc="";var c;c=0===b.indexOf("gtm.")?encodeURIComponent(b):"*";cd[a]="&e="+c+"&eid="+a;Rc()}},hd=function(a,b,c){if(ed&&!Wc[a]&&b){a!==Sc&&
(Qc(),Sc=a);var d=String(b[Gb.la]||"").replace(/_/g,"");0===d.indexOf("cvt")&&(d="cvt");var e=c+d;Uc=Uc?Uc+"."+e:"&tr="+e;Rc();2022<=Zc().length&&Qc()}},id=function(a,b,c){if(ed&&!Wc[a]){a!==Sc&&(Qc(),Sc=a);var d=c+b;Vc=Vc?Vc+"."+d:"&epr="+d;Rc();2022<=Zc().length&&Qc()}};var jd={},kd=new xa,ld={},md={},pd={name:"dataLayer",set:function(a,b){B(La(a,b),ld);nd()},get:function(a){return od(a,2)},reset:function(){kd=new xa;ld={};nd()}},od=function(a,b){if(2!=b){var c=kd.get(a);if(ed){var d=qd(a);c!==d&&J("GTM",5)}return c}return qd(a)},qd=function(a,b,c){var d=a.split("."),e=!1,g=void 0;return e?g:sd(d)},sd=function(a){for(var b=ld,c=0;c<a.length;c++){if(null===b)return!1;if(void 0===b)break;b=b[a[c]]}return b};
var ud=function(a,b){md.hasOwnProperty(a)||(kd.set(a,b),B(La(a,b),ld),nd())},nd=function(a){za(md,function(b,c){kd.set(b,c);B(La(b,void 0),ld);B(La(b,c),ld);a&&delete md[b]})},vd=function(a,b,c){jd[a]=jd[a]||{};var d=1!==c?qd(b):kd.get(b);"array"===Na(d)||"object"===Na(d)?jd[a][b]=B(d):jd[a][b]=d},wd=function(a,b){if(jd[a])return jd[a][b]};var xd=function(){var a=!1;return a};var P=function(a,b,c,d){return(2===yd()||d||"http:"!=D.location.protocol?a:b)+c},yd=function(){var a=Xb(),b;if(1===a)a:{var c=Ec;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,g=1,h=F.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===g&&0===l.indexOf(d)&&(g=2)}}b=g}else b=a;return b};var Nd=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),Od={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Pd={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Qd="google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" ");
var Sd=function(a){Kc.pntr=Kc.pntr||["nonGoogleScripts"];Kc.snppx=Kc.snppx||["nonGoogleScripts"];Kc.qpx=Kc.qpx||["nonGooglePixels"];var b=od("gtm.whitelist");b&&J("GTM",9);
var c=b&&Ka(Da(b),Od),d=od("gtm.blacklist");d||(d=od("tagTypeBlacklist"))&&J("GTM",3);d?J("GTM",8):d=[];Rd()&&(d=Da(d),d.push("nonGooglePixels","nonGoogleScripts","sandboxedScripts"));0<=t(Da(d),"google")&&J("GTM",2);var e=d&&Ka(Da(d),Pd),g={};return function(h){var k=h&&h[Gb.la];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==g[k])return g[k];
var l=Kc[k]||[],m=a(k,l);if(b){var n;if(n=m)a:{if(0>t(c,k))if(l&&0<l.length)for(var q=0;q<l.length;q++){if(0>t(c,l[q])){J("GTM",11);n=!1;break a}}else{n=!1;break a}n=!0}m=n}var u=!1;if(d){var p=0<=t(e,k);if(p)u=p;else{var r=ya(e,l||[]);r&&J("GTM",10);u=r}}var v=!m||u;v||!(0<=t(l,"sandboxedScripts"))||c&&-1!==t(c,"sandboxedScripts")||(v=ya(e,Qd));return g[k]=v}},Rd=function(){return Nd.test(D.location&&D.location.hostname)};var Td={Rf:function(a,b){b[Gb.jd]&&"string"===typeof a&&(a=1==b[Gb.jd]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(Gb.ld)&&null===a&&(a=b[Gb.ld]);b.hasOwnProperty(Gb.nd)&&void 0===a&&(a=b[Gb.nd]);b.hasOwnProperty(Gb.md)&&!0===a&&(a=b[Gb.md]);b.hasOwnProperty(Gb.kd)&&!1===a&&(a=b[Gb.kd]);return a}};var Ud={active:!0,isWhitelisted:function(){return!0}},Vd=function(a){var b=Ac.zones;!b&&a&&(b=Ac.zones=a());return b};var Wd=!1,Xd=0,Yd=[];function Zd(a){if(!Wd){var b=F.createEventObject,c="complete"==F.readyState,d="interactive"==F.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Wd=!0;for(var e=0;e<Yd.length;e++)G(Yd[e])}Yd.push=function(){for(var g=0;g<arguments.length;g++)G(arguments[g]);return 0}}}function $d(){if(!Wd&&140>Xd){Xd++;try{F.documentElement.doScroll("left"),Zd()}catch(a){D.setTimeout($d,50)}}}var ae=function(a){Wd?a():Yd.push(a)};var be={},ce={},de=function(a,b,c,d){if(!ce[a]||Cc[b]||"__zone"===b)return-1;var e={};Pa(d)&&(e=B(d,e));e.id=c;e.status="timeout";return ce[a].tags.push(e)-1},ee=function(a,b,c,d){if(ce[a]){var e=ce[a].tags[b];e&&(e.status=c,e.executionTime=d)}};function fe(a){for(var b=be[a]||[],c=0;c<b.length;c++)b[c]();be[a]={push:function(d){d(zc.m,ce[a])}}}
var ie=function(a,b,c){ce[a]={tags:[]};qa(b)&&ge(a,b);c&&D.setTimeout(function(){return fe(a)},Number(c));return he(a)},ge=function(a,b){be[a]=be[a]||[];be[a].push(Ha(function(){return G(function(){b(zc.m,ce[a])})}))};function he(a){var b=0,c=0,d=!1;return{add:function(){c++;return Ha(function(){b++;d&&b>=c&&fe(a)})},Af:function(){d=!0;b>=c&&fe(a)}}};var je=function(){function a(d){return!ra(d)||0>d?0:d}if(!Ac._li&&D.performance&&D.performance.timing){var b=D.performance.timing.navigationStart,c=ra(pd.get("gtm.start"))?pd.get("gtm.start"):0;Ac._li={cst:a(c-b),cbt:a(Gc-b)}}};var ne=!1,oe=function(){return D.GoogleAnalyticsObject&&D[D.GoogleAnalyticsObject]},pe=!1;
var qe=function(a){D.GoogleAnalyticsObject||(D.GoogleAnalyticsObject=a||"ga");var b=D.GoogleAnalyticsObject;if(D[b])D.hasOwnProperty(b)||J("GTM",12);else{var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);D[b]=c}je();return D[b]},re=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=oe();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var te=function(){},se=function(){return D.GoogleAnalyticsObject||"ga"};var ve=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var we=/:[0-9]+$/,xe=function(a,b,c){for(var d=a.split("&"),e=0;e<d.length;e++){var g=d[e].split("=");if(decodeURIComponent(g[0]).replace(/\+/g," ")===b){var h=g.slice(1).join("=");return c?h:decodeURIComponent(h).replace(/\+/g," ")}}},Ae=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=ye(a.protocol)||ye(D.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:D.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&
(a.hostname=(a.hostname||D.location.hostname).replace(we,"").toLowerCase());var g=b,h,k=ye(a.protocol);g&&(g=String(g).toLowerCase());switch(g){case "url_no_fragment":h=ze(a);break;case "protocol":h=k;break;case "host":h=a.hostname.replace(we,"").toLowerCase();if(c){var l=/^www\d*\./.exec(h);l&&l[0]&&(h=h.substr(l[0].length))}break;case "port":h=String(Number(a.port)||("http"==k?80:"https"==k?443:""));break;case "path":a.pathname||a.hostname||J("TAGGING",1);h="/"==a.pathname.substr(0,1)?a.pathname:
"/"+a.pathname;var m=h.split("/");0<=t(d||[],m[m.length-1])&&(m[m.length-1]="");h=m.join("/");break;case "query":h=a.search.replace("?","");e&&(h=xe(h,e,void 0));break;case "extension":var n=a.pathname.split(".");h=1<n.length?n[n.length-1]:"";h=h.split("/")[0];break;case "fragment":h=a.hash.replace("#","");break;default:h=a&&a.href}return h},ye=function(a){return a?a.replace(":","").toLowerCase():""},ze=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");b=0>c?a.href:a.href.substr(0,c)}return b},
Be=function(a){var b=F.createElement("a");a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(a||J("TAGGING",1),c="/"+c);var d=b.hostname.replace(we,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}};function Ge(a,b,c,d){var e=tb[a],g=He(a,b,c,d);if(!g)return null;var h=Bb(e[Gb.Hd],c,[]);if(h&&h.length){var k=h[0];g=Ge(k.index,{s:g,o:1===k.Td?b.terminate:g,terminate:b.terminate},c,d)}return g}
function He(a,b,c,d){function e(){if(g[Gb.df])k();else{var w=Db(g,c,[]),y=de(c.id,String(g[Gb.la]),Number(g[Gb.Id]),w[Gb.ef]),x=!1;w.vtp_gtmOnSuccess=function(){if(!x){x=!0;var A=Fa()-C;hd(c.id,tb[a],"5");ee(c.id,y,"success",A);h()}};w.vtp_gtmOnFailure=function(){if(!x){x=!0;var A=Fa()-C;hd(c.id,tb[a],"6");ee(c.id,y,"failure",A);k()}};w.vtp_gtmTagId=g.tag_id;
w.vtp_gtmEventId=c.id;hd(c.id,g,"1");var z=function(){var A=Fa()-C;hd(c.id,g,"7");ee(c.id,y,"exception",A);x||(x=!0,k())};var C=Fa();try{Ab(w,c)}catch(A){z(A)}}}var g=tb[a],h=b.s,k=b.o,l=b.terminate;if(c.Gc(g))return null;var m=Bb(g[Gb.Jd],c,[]);if(m&&m.length){var n=m[0],q=Ge(n.index,{s:h,o:k,terminate:l},c,d);if(!q)return null;h=q;k=2===n.Td?l:q}if(g[Gb.Gd]||g[Gb.ff]){var u=g[Gb.Gd]?ub:c.gh,p=h,r=k;if(!u[a]){e=Ha(e);var v=Ie(a,u,e);h=v.s;k=v.o}return function(){u[a](p,r)}}return e}
function Ie(a,b,c){var d=[],e=[];b[a]=Je(d,e,c);return{s:function(){b[a]=Ke;for(var g=0;g<d.length;g++)d[g]()},o:function(){b[a]=Le;for(var g=0;g<e.length;g++)e[g]()}}}function Je(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function Ke(a){a()}function Le(a,b){b()};var Oe=function(a,b){for(var c=[],d=0;d<tb.length;d++)if(a.kb[d]){var e=tb[d];var g=b.add();try{var h=Ge(d,{s:g,o:g,terminate:g},a,d);h?c.push({ve:d,je:Eb(e),bg:h}):(Me(d,a),g())}catch(l){g()}}b.Af();c.sort(Ne);for(var k=0;k<c.length;k++)c[k].bg();return 0<c.length};function Ne(a,b){var c,d=b.je,e=a.je;c=d>e?1:d<e?-1:0;var g;if(0!==c)g=c;else{var h=a.ve,k=b.ve;g=h>k?1:h<k?-1:0}return g}
function Me(a,b){if(!ed)return;var c=function(d){var e=b.Gc(tb[d])?"3":"4",g=Bb(tb[d][Gb.Hd],b,[]);g&&g.length&&c(g[0].index);hd(b.id,tb[d],e);var h=Bb(tb[d][Gb.Jd],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var Pe=!1,Qe=function(a,b,c,d,e){if("gtm.js"==b){if(Pe)return!1;Pe=!0}gd(a,b);var g=ie(a,d,e);vd(a,"event",1);vd(a,"ecommerce",1);vd(a,"gtm");var h={id:a,name:b,Gc:Sd(c),kb:[],gh:[],ce:function(){J("GTM",6)}};h.kb=Kb(h);var k=Oe(h,g);
if(!k)return k;for(var l=0;l<h.kb.length;l++)if(h.kb[l]){var m=tb[l];if(m&&!Cc[String(m[Gb.la])])return!0}return!1};var Se=/^https?:\/\/www\.googletagmanager\.com/,Te=function(){var a;return a},Ue=function(){var a=!1;return a};var Ve=function(){this.eventModel={};this.targetConfig={};this.containerConfig={};this.La={};this.globalConfig={};this.s=function(){};this.o=function(){}},We=function(a){var b=new Ve;b.eventModel=a;return b},Xe=function(a,b){a.targetConfig=b;return a},Ye=function(a,b){a.containerConfig=b;return a},Ze=function(a,b){a.La=b;return a},$e=function(a,b){a.globalConfig=b;return a},af=function(a,b){a.s=b;return a},bf=function(a,b){a.o=b;return a};
Ve.prototype.getWithConfig=function(a){if(void 0!==this.eventModel[a])return this.eventModel[a];if(void 0!==this.targetConfig[a])return this.targetConfig[a];if(void 0!==this.containerConfig[a])return this.containerConfig[a];if(void 0!==this.La[a])return this.La[a];if(void 0!==this.globalConfig[a])return this.globalConfig[a]};var cf={},df=["G"];cf.xe="";var ef=cf.xe.split(",");function ff(){var a=Ac;return a.gcq=a.gcq||new gf}
var hf=function(a,b,c){ff().register(a,b,c)},jf=function(a,b,c,d){ff().push("event",[b,a],c,d)},kf=function(a,b){ff().push("config",[a],b)},lf={},mf=function(){this.status=1;this.containerConfig={};this.targetConfig={};this.La={};this.ke=null;this.Zd=!1},nf=function(a,b,c,d,e){this.type=a;this.we=b;this.L=c||"";this.Gb=d;this.defer=e},gf=function(){this.Pd={};this.Yd={};this.fb=[]},of=function(a,b){var c=wc(b);return a.Pd[c.containerId]=a.Pd[c.containerId]||new mf},pf=function(a,b,c,d){if(d.L){var e=
of(a,d.L),g=e.ke;if(g){var h=B(c),k=B(e.targetConfig[d.L]),l=B(e.containerConfig),m=B(e.La),n=B(a.Yd),q=od("gtm.uniqueEventId"),u=wc(d.L).prefix,p=bf(af($e(Ze(Ye(Xe(We(h),k),l),m),n),function(){id(q,u,"2");}),function(){id(q,u,"3");});try{id(q,u,"1");3===g.length?g(b,d.we,p):4===g.length&&
g(d.L,b,d.we,p)}catch(r){id(q,u,"4");}}}};
gf.prototype.register=function(a,b,c){if(3!==of(this,a).status){of(this,a).ke=b;of(this,a).status=3;c&&(of(this,a).La=c);var d=wc(a),e=lf[d.containerId];if(void 0!==e){var g=Ac[d.containerId].bootstrap,h=d.prefix.toUpperCase();Ac[d.containerId]._spx&&(h=h.toLowerCase());var k=od("gtm.uniqueEventId"),l=h,m=Fa()-g;if(ed&&!Wc[k]){k!==Sc&&(Qc(),Sc=k);var n=l+"."+Math.floor(g-e)+"."+Math.floor(m);ad=ad?ad+","+n:"&cl="+n}delete lf[d.containerId]}this.flush()}};
gf.prototype.push=function(a,b,c,d){var e=Math.floor(Fa()/1E3);if(c){var g=wc(c),h;if(h=g){var k;if(k=1===of(this,c).status)a:{var l=g.prefix;k=!0}h=k}if(h&&(of(this,c).status=2,this.push("require",[],g.containerId),lf[g.containerId]=Fa(),!xd())){var m=encodeURIComponent(g.containerId),n=("http:"!=D.location.protocol?"https:":"http:")+
"//www.googletagmanager.com";Wb(n+"/gtag/js?id="+m+"&l=dataLayer&cx=c")}}this.fb.push(new nf(a,e,c,b,d));d||this.flush()};
gf.prototype.flush=function(a){for(var b=this;this.fb.length;){var c=this.fb[0];if(c.defer)c.defer=!1,this.fb.push(c);else switch(c.type){case "require":if(3!==of(this,c.L).status&&!a)return;break;case "set":za(c.Gb[0],function(l,m){B(La(l,m),b.Yd)});break;case "config":var d=c.Gb[0],e=!!d[I.xb];delete d[I.xb];var g=of(this,c.L),h=wc(c.L),k=h.containerId===h.id;e||(k?g.containerConfig={}:g.targetConfig[c.L]={});g.Zd&&e||pf(this,I.w,d,c);g.Zd=!0;delete d[I.ka];k?B(d,g.containerConfig):B(d,g.targetConfig[c.L]);
break;case "event":pf(this,c.Gb[1],c.Gb[0],c)}this.fb.shift()}};var qf=function(a,b,c){for(var d=[],e=String(b||document.cookie).split(";"),g=0;g<e.length;g++){var h=e[g].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d},tf=function(a,b,c,d){var e=rf(a,d);if(1===e.length)return e[0].id;if(0!==e.length){e=sf(e,function(g){return g.Lb},b);if(1===e.length)return e[0].id;e=sf(e,function(g){return g.lb},c);return e[0]?e[0].id:void 0}};
function uf(a,b,c){var d=document.cookie;document.cookie=a;var e=document.cookie;return d!=e||void 0!=c&&0<=qf(b,e).indexOf(c)}
var xf=function(a,b,c,d,e,g){d=d||"auto";var h={path:c||"/"};e&&(h.expires=e);"none"!==d&&(h.domain=d);var k;a:{var l=b,m;if(void 0==l)m=a+"=deleted; expires="+(new Date(0)).toUTCString();else{g&&(l=encodeURIComponent(l));var n=l;n&&1200<n.length&&(n=n.substring(0,1200));l=n;m=a+"="+l}var q=void 0,u=void 0,p;for(p in h)if(h.hasOwnProperty(p)){var r=h[p];if(null!=r)switch(p){case "secure":r&&(m+="; secure");break;case "domain":q=r;break;default:"path"==p&&(u=r),"expires"==p&&r instanceof Date&&(r=
r.toUTCString()),m+="; "+p+"="+r}}if("auto"===q){for(var v=vf(),w=0;w<v.length;++w){var y="none"!=v[w]?v[w]:void 0;if(!wf(y,u)&&uf(m+(y?"; domain="+y:""),a,l)){k=!0;break a}}k=!1}else q&&"none"!=q&&(m+="; domain="+q),k=!wf(q,u)&&uf(m,a,l)}return k};function sf(a,b,c){for(var d=[],e=[],g,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===g||l<g?(e=[k],g=l):l===g&&e.push(k)}return 0<d.length?d:e}
function rf(a,b){for(var c=[],d=qf(a),e=0;e<d.length;e++){var g=d[e].split("."),h=g.shift();if(!b||-1!==b.indexOf(h)){var k=g.shift();k&&(k=k.split("-"),c.push({id:g.join("."),Lb:1*k[0]||1,lb:1*k[1]||1}))}}return c}
var yf=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,zf=/(^|\.)doubleclick\.net$/i,wf=function(a,b){return zf.test(document.location.hostname)||"/"===b&&yf.test(a)},vf=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));var e=document.location.hostname;zf.test(e)||yf.test(e)||a.push("none");return a};var Af="".split(/,/),Bf=!1;var Cf=null,Df={},Ef={},Gf,Hf=function(a,b){var c={event:a};b&&(c.eventModel=B(b),b[I.cc]&&(c.eventCallback=b[I.cc]),b[I.Ra]&&(c.eventTimeout=b[I.Ra]));return c};
var Nf={config:function(a){},
event:function(a){var b=a[1];if(f(b)&&!(3<a.length)){var c;if(2<a.length){if(!Pa(a[2])&&void 0!=a[2])return;c=a[2]}var d=Hf(b,c);return d}},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(a){3===a.length&&(void 0).Fh().yh(a[1],a[2])},set:function(a){var b;2==a.length&&Pa(a[1])?b=
B(a[1]):3==a.length&&f(a[1])&&(b={},Pa(a[2])||ua(a[2])?b[a[1]]=B(a[2]):b[a[1]]=a[2]);if(b){b._clear=!0;return b}}},Of={policy:!0};var Qf=function(a){return Pf?F.querySelectorAll(a):null},Rf=function(a,b){if(!Pf)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!F.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},Sf=!1;if(F.querySelectorAll)try{var Tf=F.querySelectorAll(":root");Tf&&1==Tf.length&&Tf[0]==F.documentElement&&(Sf=!0)}catch(a){}var Pf=Sf;var $f=function(a){if(Zf(a))return a;this.nh=a};$f.prototype.ig=function(){return this.nh};var Zf=function(a){return!a||"object"!==Na(a)||Pa(a)?!1:"getUntrustedUpdateValue"in a};$f.prototype.getUntrustedUpdateValue=$f.prototype.ig;var ag=!1,bg=[];function cg(){if(!ag){ag=!0;for(var a=0;a<bg.length;a++)G(bg[a])}}var dg=function(a){ag?G(a):bg.push(a)};var eg=[],fg=!1,gg=function(a){return D["dataLayer"].push(a)},hg=function(a){var b=Ac["dataLayer"],c=b?b.subscribers:1,d=0;return function(){++d===c&&a()}},jg=function(a){var b=a._clear;za(a,function(g,h){"_clear"!==g&&(b&&ud(g,void 0),ud(g,h))});Fc||(Fc=a["gtm.start"]);var c=a.event;if(!c)return!1;var d=a["gtm.uniqueEventId"];d||(d=Lc(),a["gtm.uniqueEventId"]=d,ud("gtm.uniqueEventId",d));Hc=c;var e=ig(a);
Hc=null;switch(c){case "gtm.init":J("GTM",19),e&&J("GTM",20)}return e};function ig(a){var b=a.event,c=a["gtm.uniqueEventId"],d,e=Ac.zones;d=e?e.checkState(zc.m,c):Ud;return d.active?Qe(c,b,d.isWhitelisted,a.eventCallback,a.eventTimeout)?!0:!1:!1}
var kg=function(){for(var a=!1;!fg&&0<eg.length;){fg=!0;delete ld.eventModel;nd();var b=eg.shift();if(null!=b){var c=Zf(b);if(c){var d=b;b=Zf(d)?d.getUntrustedUpdateValue():void 0;for(var e=["gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],g=0;g<e.length;g++){var h=e[g],k=od(h,1);if(ua(k)||Pa(k))k=B(k);md[h]=k}}try{if(qa(b))try{b.call(pd)}catch(v){}else if(ua(b)){var l=b;if(f(l[0])){var m=
l[0].split("."),n=m.pop(),q=l.slice(1),u=od(m.join("."),2);if(void 0!==u&&null!==u)try{u[n].apply(u,q)}catch(v){}}}else{var p=b;if(p&&("[object Arguments]"==Object.prototype.toString.call(p)||Object.prototype.hasOwnProperty.call(p,"callee"))){a:{if(b.length&&f(b[0])){var r=Nf[b[0]];if(r&&(!c||!Of[b[0]])){b=r(b);break a}}b=void 0}if(!b){fg=!1;continue}}a=jg(b)||a}}finally{c&&nd(!0)}}fg=!1}
return!a},lg=function(){var a=kg();try{var b=zc.m,c=D["dataLayer"].hide;if(c&&void 0!==c[b]&&c.end){c[b]=!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}}catch(g){}return a},ng=function(){var a=Ub("dataLayer",[]),b=Ub("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};ae(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});dg(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});b.subscribers=(b.subscribers||
0)+1;var c=a.push;a.push=function(){var d;if(0<Ac.SANDBOXED_JS_SEMAPHORE){d=[];for(var e=0;e<arguments.length;e++)d[e]=new $f(arguments[e])}else d=[].slice.call(arguments,0);var g=c.apply(a,d);eg.push.apply(eg,d);if(300<this.length)for(J("GTM",4);300<this.length;)this.shift();var h="boolean"!==typeof g||g;return kg()&&h};eg.push.apply(eg,a.slice(0));mg()&&G(lg)},mg=function(){var a=!0;return a};var og;var Kg={};Kg.yb=new String("undefined");
var Lg=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===Kg.yb?b:a[d]);return c.join("")}};Lg.prototype.toString=function(){return this.resolve("undefined")};Lg.prototype.valueOf=Lg.prototype.toString;Kg.kf=Lg;Kg.sc={};Kg.Uf=function(a){return new Lg(a)};var Mg={};Kg.Yg=function(a,b){var c=Lc();Mg[c]=[a,b];return c};Kg.Qd=function(a){var b=a?0:1;return function(c){var d=Mg[c];if(d&&"function"===typeof d[b])d[b]();Mg[c]=void 0}};Kg.Bg=function(a){for(var b=!1,c=!1,
d=2;d<a.length;d++)b=b||8===a[d],c=c||16===a[d];return b&&c};Kg.Mg=function(a){if(a===Kg.yb)return a;var b=Lc();Kg.sc[b]=a;return'google_tag_manager["'+zc.m+'"].macro('+b+")"};Kg.Fg=function(a,b,c){a instanceof Kg.kf&&(a=a.resolve(Kg.Yg(b,c)),b=pa);return{Ec:a,s:b}};var Ng=function(a,b,c){function d(g,h){var k=g[h];return k}var e={event:b,"gtm.element":a,"gtm.elementClasses":d(a,"className"),"gtm.elementId":a["for"]||bc(a,"id")||"","gtm.elementTarget":a.formTarget||d(a,"target")||""};c&&(e["gtm.triggers"]=c.join(","));e["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||d(a,"href")||a.src||a.code||a.codebase||
"";return e},Og=function(a){Ac.hasOwnProperty("autoEventsSettings")||(Ac.autoEventsSettings={});var b=Ac.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},Pg=function(a,b,c){Og(a)[b]=c},Qg=function(a,b,c,d){var e=Og(a),g=Ga(e,b,d);e[b]=c(g)},Rg=function(a,b,c){var d=Og(a);return Ga(d,b,c)};var Sg=function(){for(var a=Sb.userAgent+(F.cookie||"")+(F.referrer||""),b=a.length,c=D.history.length;0<c;)a+=c--^b++;var d=1,e,g,h;if(a)for(d=0,g=a.length-1;0<=g;g--)h=a.charCodeAt(g),d=(d<<6&268435455)+h+(h<<14),e=d&266338304,d=0!=e?d^e>>21:d;return[Math.round(2147483647*Math.random())^d&2147483647,Math.round(Fa()/1E3)].join(".")},Vg=function(a,b,c,d){var e=Tg(b);return tf(a,e,Ug(c),d)},Wg=function(a,b,c,d){var e=""+Tg(c),g=Ug(d);1<g&&(e+="-"+g);return[b,e,a].join(".")},Tg=function(a){if(!a)return 1;
a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},Ug=function(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};var Xg=["1"],Yg={},bh=function(a,b,c,d){var e=Zg(a);Yg[e]||$g(e,b,c)||(ah(e,Sg(),b,c,d),$g(e,b,c))};function ah(a,b,c,d,e){var g=Wg(b,"1",d,c);xf(a,g,c,d,0==e?void 0:new Date(Fa()+1E3*(void 0==e?7776E3:e)))}function $g(a,b,c){var d=Vg(a,b,c,Xg);d&&(Yg[a]=d);return d}function Zg(a){return(a||"_gcl")+"_au"};var ch=function(){for(var a=[],b=F.cookie.split(";"),c=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,d=0;d<b.length;d++){var e=b[d].match(c);e&&a.push({ad:e[1],value:e[2]})}var g={};if(!a||!a.length)return g;for(var h=0;h<a.length;h++){var k=a[h].value.split(".");"1"==k[0]&&3==k.length&&k[1]&&(g[a[h].ad]||(g[a[h].ad]=[]),g[a[h].ad].push({timestamp:k[1],fg:k[2]}))}return g};function dh(){for(var a=eh,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function fh(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}
var eh,gh,hh=function(a){eh=eh||fh();gh=gh||dh();for(var b=[],c=0;c<a.length;c+=3){var d=c+1<a.length,e=c+2<a.length,g=a.charCodeAt(c),h=d?a.charCodeAt(c+1):0,k=e?a.charCodeAt(c+2):0,l=g>>2,m=(g&3)<<4|h>>4,n=(h&15)<<2|k>>6,q=k&63;e||(q=64,d||(n=64));b.push(eh[l],eh[m],eh[n],eh[q])}return b.join("")},ih=function(a){function b(l){for(;d<a.length;){var m=a.charAt(d++),n=gh[m];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(m))throw Error("Unknown base64 encoding at char: "+m);}return l}eh=eh||fh();gh=gh||
dh();for(var c="",d=0;;){var e=b(-1),g=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|g>>4);64!=h&&(c+=String.fromCharCode(g<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var jh;function kh(a,b){if(!a||b===F.location.hostname)return!1;for(var c=0;c<a.length;c++)if(a[c]instanceof RegExp){if(a[c].test(b))return!0}else if(0<=b.indexOf(a[c]))return!0;return!1}
var oh=function(){var a=lh,b=mh,c=nh(),d=function(h){a(h.target||h.srcElement||{})},e=function(h){b(h.target||h.srcElement||{})};if(!c.init){$b(F,"mousedown",d);$b(F,"keyup",d);$b(F,"submit",e);var g=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){b(this);g.call(this)};c.init=!0}},nh=function(){var a=Ub("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var ph=/(.*?)\*(.*?)\*(.*)/,qh=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,rh=/^(?:www\.|m\.|amp\.)+/,sh=/([^?#]+)(\?[^#]*)?(#.*)?/,th=/(.*?)(^|&)_gl=([^&]*)&?(.*)/,vh=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()&&(b.push(c),b.push(hh(String(d))))}var e=b.join("*");return["1",uh(e),e].join("*")},uh=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||
window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=jh)){for(var e=Array(256),g=0;256>g;g++){for(var h=g,k=0;8>k;k++)h=h&1?h>>>1^3988292384:h>>>1;e[g]=h}d=e}jh=d;for(var l=4294967295,m=0;m<c.length;m++)l=l>>>8^jh[(l^c.charCodeAt(m))&255];return((l^-1)>>>0).toString(36)},xh=function(){return function(a){var b=Be(D.location.href),c=b.search.replace("?",""),d=xe(c,"_gl",!0)||"";a.query=wh(d)||{};var e=Ae(b,"fragment").match(th);a.fragment=wh(e&&e[3]||
"")||{}}},yh=function(){var a=xh(),b=nh();b.data||(b.data={query:{},fragment:{}},a(b.data));var c={},d=b.data;d&&(Ia(c,d.query),Ia(c,d.fragment));return c},wh=function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var g=ph.exec(d);if(g){c=g;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var m=h[2],n=0;n<b;++n)if(m===uh(k,n)){l=!0;break a}l=!1}if(l){for(var q={},u=k?k.split("*"):[],p=0;p<u.length;p+=2)q[u[p]]=ih(u[p+1]);return q}}}}catch(r){}};
function zh(a,b,c){function d(m){var n=m,q=th.exec(n),u=n;if(q){var p=q[2],r=q[4];u=q[1];r&&(u=u+p+r)}m=u;var v=m.charAt(m.length-1);m&&"&"!==v&&(m+="&");return m+l}c=void 0===c?!1:c;var e=sh.exec(b);if(!e)return"";var g=e[1],h=e[2]||"",k=e[3]||"",l="_gl="+a;c?k="#"+d(k.substring(1)):h="?"+d(h.substring(1));return""+g+h+k}
function Ah(a,b,c){for(var d={},e={},g=nh().decorators,h=0;h<g.length;++h){var k=g[h];(!c||k.forms)&&kh(k.domains,b)&&(k.fragment?Ia(e,k.callback()):Ia(d,k.callback()))}if(Ja(d)){var l=vh(d);if(c){if(a&&a.action){var m=(a.method||"").toLowerCase();if("get"===m){for(var n=a.childNodes||[],q=!1,u=0;u<n.length;u++){var p=n[u];if("_gl"===p.name){p.setAttribute("value",l);q=!0;break}}if(!q){var r=F.createElement("input");r.setAttribute("type","hidden");r.setAttribute("name","_gl");r.setAttribute("value",
l);a.appendChild(r)}}else if("post"===m){var v=zh(l,a.action);ve.test(v)&&(a.action=v)}}}else Bh(l,a,!1)}if(!c&&Ja(e)){var w=vh(e);Bh(w,a,!0)}}function Bh(a,b,c){if(b.href){var d=zh(a,b.href,void 0===c?!1:c);ve.test(d)&&(b.href=d)}}
var lh=function(a){try{var b;a:{for(var c=a,d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var g=e.protocol;"http:"!==g&&"https:"!==g||Ah(e,e.hostname,!1)}}catch(h){}},mh=function(a){try{if(a.action){var b=Ae(Be(a.action),"host");Ah(a,b,!0)}}catch(c){}},Ch=function(a,b,c,d){oh();var e={callback:a,domains:b,fragment:"fragment"===c,forms:!!d};nh().decorators.push(e)},Dh=function(){var a=F.location.hostname,b=qh.exec(F.referrer);if(!b)return!1;
var c=b[2],d=b[1],e="";if(c){var g=c.split("/"),h=g[1];e="s"===h?decodeURIComponent(g[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}var k=a.replace(rh,""),l=e.replace(rh,""),m;if(!(m=k===l)){var n="."+l;m=k.substring(k.length-n.length,k.length)===n}return m},Eh=function(a,b){return!1===a?!1:a||b||Dh()};var Fh={};var Gh=/^\w+$/,Hh=/^[\w-]+$/,Ih=/^~?[\w-]+$/,Jh={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha",gp:"_gp"};function Kh(a){return a&&"string"==typeof a&&a.match(Gh)?a:"_gcl"}var Mh=function(){var a=Be(D.location.href),b=Ae(a,"query",!1,void 0,"gclid"),c=Ae(a,"query",!1,void 0,"gclsrc"),d=Ae(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||xe(e,"gclid",void 0);c=c||xe(e,"gclsrc",void 0)}return Lh(b,c,d)};
function Lh(a,b,c){var d={},e=function(g,h){d[h]||(d[h]=[]);d[h].push(g)};if(void 0!==a&&a.match(Hh))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "3p.ds":(void 0==Fh.gtm_3pds?0:Fh.gtm_3pds)&&e(a,"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha");break;case "gp":e(a,"gp")}c&&e(c,"dc");return d}var Oh=function(a){var b=Mh();Nh(b,a)};
function Nh(a,b,c){function d(q,u){var p=Ph(q,e);p&&xf(p,u,h,g,l,!0)}b=b||{};var e=Kh(b.prefix),g=b.domain||"auto",h=b.path||"/",k=void 0==b.Ia?7776E3:b.Ia;c=c||Fa();var l=0==k?void 0:new Date(c+1E3*k),m=Math.round(c/1E3),n=function(q){return["GCL",m,q].join(".")};a.aw&&(!0===b.Th?d("aw",n("~"+a.aw[0])):d("aw",n(a.aw[0])));a.dc&&d("dc",n(a.dc[0]));a.gf&&d("gf",n(a.gf[0]));a.ha&&d("ha",n(a.ha[0]));a.gp&&d("gp",n(a.gp[0]))}
var Rh=function(a,b,c,d,e){for(var g=yh(),h=Kh(b),k=0;k<a.length;++k){var l=a[k];if(void 0!==Jh[l]){var m=Ph(l,h),n=g[m];if(n){var q=Math.min(Qh(n),Fa()),u;b:{for(var p=q,r=qf(m,F.cookie),v=0;v<r.length;++v)if(Qh(r[v])>p){u=!0;break b}u=!1}u||xf(m,n,c,d,0==e?void 0:new Date(q+1E3*(null==e?7776E3:e)),!0)}}}var w={prefix:b,path:c,domain:d};Nh(Lh(g.gclid,g.gclsrc),w)},Ph=function(a,b){var c=Jh[a];if(void 0!==c)return b+c},Qh=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||
0)};function Sh(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var Th=function(a,b,c,d,e){if(ua(b)){var g=Kh(e);Ch(function(){for(var h={},k=0;k<a.length;++k){var l=Ph(a[k],g);if(l){var m=qf(l,F.cookie);m.length&&(h[l]=m.sort()[m.length-1])}}return h},b,c,d)}},Uh=function(a){return a.filter(function(b){return Ih.test(b)})},Vh=function(a,b){for(var c=Kh(b&&b.prefix),d={},e=0;e<a.length;e++)Jh[a[e]]&&(d[a[e]]=Jh[a[e]]);za(d,function(g,h){var k=qf(c+h,F.cookie);if(k.length){var l=k[0],m=Qh(l),n={};n[g]=[Sh(l)];Nh(n,b,m)}})};var Wh=/^\d+\.fls\.doubleclick\.net$/;function Xh(a){var b=Be(D.location.href),c=Ae(b,"host",!1);if(c&&c.match(Wh)){var d=Ae(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function Yh(a,b){if("aw"==a||"dc"==a){var c=Xh("gcl"+a);if(c)return c.split(".")}var d=Kh(b);if("_gcl"==d){var e;e=Mh()[a]||[];if(0<e.length)return e}var g=Ph(a,d),h;if(g){var k=[];if(F.cookie){var l=qf(g,F.cookie);if(l&&0!=l.length){for(var m=0;m<l.length;m++){var n=Sh(l[m]);n&&-1===t(k,n)&&k.push(n)}h=Uh(k)}else h=k}else h=k}else h=[];return h}
var Zh=function(){var a=Xh("gac");if(a)return decodeURIComponent(a);var b=ch(),c=[];za(b,function(d,e){for(var g=[],h=0;h<e.length;h++)g.push(e[h].fg);g=Uh(g);g.length&&c.push(d+":"+g.join(","))});return c.join(";")},$h=function(a,b,c,d,e){bh(b,c,d,e);var g=Yg[Zg(b)],h=Mh().dc||[],k=!1;if(g&&0<h.length){var l=Ac.joined_au=Ac.joined_au||{},m=b||"_gcl";if(!l[m])for(var n=0;n<h.length;n++){var q="https://adservice.google.com/ddm/regclk",u=q=q+"?gclid="+h[n]+"&auiddc="+g;Sb.sendBeacon&&Sb.sendBeacon(u)||Zb(u);k=l[m]=
!0}}null==a&&(a=k);if(a&&g){var p=Zg(b),r=Yg[p];r&&ah(p,r,c,d,e)}};var ai;if(3===zc.Cb.length)ai="g";else{var bi="G";ai=bi}
var ci={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:ai,OPT:"o"},di=function(a){var b=zc.m.split("-"),c=b[0].toUpperCase(),d=ci[c]||"i",e=a&&"GTM"===c?b[1]:"OPT"===c?b[1]:"",g;if(3===zc.Cb.length){var h=void 0;g="2"+(h||"w")}else g=
"";return g+d+zc.Cb+e};var ii=["input","select","textarea"],ji=["button","hidden","image","reset","submit"],ki=function(a){var b=a.tagName.toLowerCase();return!va(ii,function(c){return c===b})||"input"===b&&va(ji,function(c){return c===a.type.toLowerCase()})?!1:!0},li=function(a){return a.form?a.form.tagName?a.form:F.getElementById(a.form):ec(a,["form"],100)},mi=function(a,b,c){if(!a.elements)return 0;for(var d=b.getAttribute(c),e=0,g=1;e<a.elements.length;e++){var h=a.elements[e];if(ki(h)){if(h.getAttribute(c)===d)return g;
g++}}return 0};var qi=!!D.MutationObserver,ri=void 0,si=function(a){if(!ri){var b=function(){var c=F.body;if(c)if(qi)(new MutationObserver(function(){for(var e=0;e<ri.length;e++)G(ri[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;$b(c,"DOMNodeInserted",function(){d||(d=!0,G(function(){d=!1;for(var e=0;e<ri.length;e++)G(ri[e])}))})}};ri=[];F.body?b():G(b)}ri.push(a)};
var Ki=function(){var a=F.body,b=F.documentElement||a&&a.parentElement,c,d;if(F.compatMode&&"BackCompat"!==F.compatMode)c=b?b.clientHeight:0,d=b?b.clientWidth:0;else{var e=function(g,h){return g&&h?Math.min(g,h):Math.max(g,h)};J("GTM",7);c=e(b?b.clientHeight:0,a?a.clientHeight:0);d=e(b?b.clientWidth:0,a?a.clientWidth:0)}return{width:d,height:c}},Li=function(a){var b=Ki(),c=b.height,d=b.width,e=a.getBoundingClientRect(),g=e.bottom-e.top,h=e.right-e.left;return g&&h?(1-Math.min((Math.max(0-e.left,0)+
Math.max(e.right-d,0))/h,1))*(1-Math.min((Math.max(0-e.top,0)+Math.max(e.bottom-c,0))/g,1)):0},Mi=function(a){if(F.hidden)return!0;var b=a.getBoundingClientRect();if(b.top==b.bottom||b.left==b.right||!D.getComputedStyle)return!0;var c=D.getComputedStyle(a,null);if("hidden"===c.visibility)return!0;for(var d=a,e=c;d;){if("none"===e.display)return!0;var g=e.opacity,h=e.filter;if(h){var k=h.indexOf("opacity(");0<=k&&(h=h.substring(k+8,h.indexOf(")",k)),"%"==h.charAt(h.length-1)&&(h=h.substring(0,h.length-
1)),g=Math.min(h,g))}if(void 0!==g&&0>=g)return!0;(d=d.parentElement)&&(e=D.getComputedStyle(d,null))}return!1};var Ni=[],Oi=!(!D.IntersectionObserver||!D.IntersectionObserverEntry),Pi=function(a,b,c){for(var d=new D.IntersectionObserver(a,{threshold:c}),e=0;e<b.length;e++)d.observe(b[e]);for(var g=0;g<Ni.length;g++)if(!Ni[g])return Ni[g]=d,g;return Ni.push(d)-1},Qi=function(a,b,c){function d(k,l){var m={top:0,bottom:0,right:0,left:0,width:0,
height:0},n={boundingClientRect:k.getBoundingClientRect(),intersectionRatio:l,intersectionRect:m,isIntersecting:0<l,rootBounds:m,target:k,time:Fa()};G(function(){return a(n)})}for(var e=[],g=[],h=0;h<b.length;h++)e.push(0),g.push(-1);c.sort(function(k,l){return k-l});return function(){for(var k=0;k<b.length;k++){var l=Li(b[k]);if(l>e[k])for(;g[k]<c.length-1&&l>=c[g[k]+1];)d(b[k],l),g[k]++;else if(l<e[k])for(;0<=g[k]&&l<=c[g[k]];)d(b[k],l),g[k]--;e[k]=l}}},Ri=function(a,b,c){for(var d=0;d<c.length;d++)1<
c[d]?c[d]=1:0>c[d]&&(c[d]=0);if(Oi){var e=!1;G(function(){e||Qi(a,b,c)()});return Pi(function(g){e=!0;for(var h={Na:0};h.Na<g.length;h={Na:h.Na},h.Na++)G(function(k){return function(){return a(g[k.Na])}}(h))},b,c)}return D.setInterval(Qi(a,b,c),1E3)},Si=function(a){Oi?0<=a&&a<Ni.length&&Ni[a]&&(Ni[a].disconnect(),Ni[a]=void 0):D.clearInterval(a)};var Ui=D.clearTimeout,Vi=D.setTimeout,R=function(a,b,c){if(xd()){b&&G(b)}else return Wb(a,b,c)},Wi=function(){return D.location.href},Xi=function(a){return Ae(Be(a),"fragment")},Yi=function(a){return ze(Be(a))},V=function(a,b){return od(a,b||2)},Zi=function(a,b,c){b&&(a.eventCallback=b,c&&(a.eventTimeout=c));return gg(a)},$i=function(a,b){D[a]=b},W=function(a,b,c){b&&(void 0===D[a]||c&&!D[a])&&(D[a]=b);return D[a]},
aj=function(a,b,c){return qf(a,b,void 0===c?!0:!!c)},bj=function(a,b){if(xd()){b&&G(b)}else Yb(a,b)},cj=function(a){return!!Rg(a,"init",!1)},dj=function(a){Pg(a,"init",!0)},ej=function(a,b,c){var d=(void 0===c?0:c)?"www.googletagmanager.com/gtag/js":Ec;d+="?id="+encodeURIComponent(a)+"&l=dataLayer";b&&za(b,function(e,g){g&&(d+="&"+e+"="+encodeURIComponent(g))});R(P("https://","http://",d))},fj=function(a,b){var c=a[b];return c};
var gj=Kg.Fg;var hj=new xa,ij=function(a,b){function c(h){var k=Be(h),l=Ae(k,"protocol"),m=Ae(k,"host",!0),n=Ae(k,"port"),q=Ae(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==n||"https"==l&&"443"==n)l="web",n="default";return[l,m,n,q]}for(var d=c(String(a)),e=c(String(b)),g=0;g<d.length;g++)if(d[g]!==e[g])return!1;return!0},kj=function(a){return jj(a)?1:0};
function jj(a){var b=a.arg0,c=a.arg1;if(a.any_of&&ua(c)){for(var d=0;d<c.length;d++)if(kj({"function":a["function"],arg0:b,arg1:c[d]}))return!0;return!1}switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var e;a:{if(b){var g=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var h=0;h<g.length;h++)if(b[g[h]]){e=b[g[h]](c);break a}}catch(v){}}e=!1}return e;case "_ew":var k,l;k=String(b);l=String(c);var m=k.length-
l.length;return 0<=m&&k.indexOf(l,m)==m;case "_eq":return String(b)==String(c);case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var n;n=String(b).split(",");return 0<=t(n,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var q;var u=a.ignore_case?"i":void 0;try{var p=String(c)+u,r=hj.get(p);r||(r=new RegExp(c,u),hj.set(p,r));q=r.test(b)}catch(v){q=!1}return q;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return ij(b,
c)}return!1};var mj=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var nj={},oj=encodeURI,X=encodeURIComponent,pj=Zb;var qj=function(a,b){if(!a)return!1;var c=Ae(Be(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var g=c.length-e.length;0<g&&"."!=e.charAt(0)&&(g--,e="."+e);if(0<=g&&c.indexOf(e,g)==g)return!0}}return!1};
var rj=function(a,b,c){for(var d={},e=!1,g=0;a&&g<a.length;g++)a[g]&&a[g].hasOwnProperty(b)&&a[g].hasOwnProperty(c)&&(d[a[g][b]]=a[g][c],e=!0);return e?d:null};nj.Cg=function(){var a=!1;return a};var xk=function(){var a=D.gaGlobal=D.gaGlobal||{};a.hid=a.hid||wa();return a.hid};var Ik=window,Jk=document,Kk=function(a){var b=Ik._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===Ik["ga-disable-"+a])return!0;try{var c=Ik.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(g){}for(var d=qf("AMP_TOKEN",Jk.cookie,!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return Jk.getElementById("__gaOptOutExtension")?!0:!1};
var Nk=function(a){return"_"===a.charAt(0)},Ok=function(a){za(a,function(c){Nk(c)&&delete a[c]});var b=a[I.V]||{};za(b,function(c){Nk(c)&&delete b[c]})};var Rk=function(a,b,c){jf(b,c,a)},Sk=function(a,b,c){jf(b,c,a,!0)},Uk=function(a,b){},Tk=function(a,b){};
var Y={a:{}};Y.a.ctv=["google"],function(){(function(a){Y.__ctv=a;Y.__ctv.b="ctv";Y.__ctv.g=!0;Y.__ctv.priorityOverride=0})(function(){return"329"})}();

Y.a.jsm=["customScripts"],function(){(function(a){Y.__jsm=a;Y.__jsm.b="jsm";Y.__jsm.g=!0;Y.__jsm.priorityOverride=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=W("google_tag_manager");return c&&c.e&&c.e(b)}catch(d){}}})}();
Y.a.c=["google"],function(){(function(a){Y.__c=a;Y.__c.b="c";Y.__c.g=!0;Y.__c.priorityOverride=0})(function(a){return a.vtp_value})}();
Y.a.e=["google"],function(){(function(a){Y.__e=a;Y.__e.b="e";Y.__e.g=!0;Y.__e.priorityOverride=0})(function(a){return String(wd(a.vtp_gtmEventId,"event"))})}();
Y.a.f=["google"],function(){(function(a){Y.__f=a;Y.__f.b="f";Y.__f.g=!0;Y.__f.priorityOverride=0})(function(a){var b=V("gtm.referrer",1)||F.referrer;return b?a.vtp_component&&"URL"!=a.vtp_component?Ae(Be(String(b)),a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey):Yi(String(b)):String(b)})}();
Y.a.cl=["google"],function(){function a(b){var c=b.target;if(c){var d=Ng(c,"gtm.click");Zi(d)}}(function(b){Y.__cl=b;Y.__cl.b="cl";Y.__cl.g=!0;Y.__cl.priorityOverride=0})(function(b){if(!cj("cl")){var c=W("document");$b(c,"click",a,!0);dj("cl")}G(b.vtp_gtmOnSuccess)})}();
Y.a.j=["google"],function(){(function(a){Y.__j=a;Y.__j.b="j";Y.__j.g=!0;Y.__j.priorityOverride=0})(function(a){for(var b=String(a.vtp_name).split("."),c=W(b.shift()),d=0;d<b.length;d++)c=c&&c[b[d]];return c})}();Y.a.k=["google"],function(){(function(a){Y.__k=a;Y.__k.b="k";Y.__k.g=!0;Y.__k.priorityOverride=0})(function(a){return aj(a.vtp_name,V("gtm.cookie",1),!!a.vtp_decodeCookie)[0]})}();

Y.a.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){Y.__u=b;Y.__u.b="u";Y.__u.g=!0;Y.__u.priorityOverride=0})(function(b){var c;c=(c=b.vtp_customUrlSource?b.vtp_customUrlSource:V("gtm.url",1))||Wi();var d=b[a("vtp_component")];if(!d||"URL"==d)return Yi(String(c));var e=Be(String(c)),g;if("QUERY"===d)a:{var h=b[a("vtp_multiQueryKeys").toString()],k=b[a("vtp_queryKey").toString()]||"",l=b[a("vtp_ignoreEmptyQueryParam").toString()],m;m=h?ua(k)?k:String(k).replace(/\s+/g,
"").split(","):[String(k)];for(var n=0;n<m.length;n++){var q=Ae(e,"QUERY",void 0,void 0,m[n]);if(void 0!=q&&(!l||""!==q)){g=q;break a}}g=void 0}else g=Ae(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,void 0);return g})}();
Y.a.v=["google"],function(){(function(a){Y.__v=a;Y.__v.b="v";Y.__v.g=!0;Y.__v.priorityOverride=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=V(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();
Y.a.ua=["google"],function(){var a,b={},c=function(d){var e={},g={},h={},k={},l={},m=void 0;if(d.vtp_gaSettings){var n=d.vtp_gaSettings;B(rj(n.vtp_fieldsToSet,"fieldName","value"),g);B(rj(n.vtp_contentGroup,"index","group"),h);B(rj(n.vtp_dimension,"index","dimension"),k);B(rj(n.vtp_metric,"index","metric"),l);d.vtp_gaSettings=null;n.vtp_fieldsToSet=void 0;n.vtp_contentGroup=void 0;n.vtp_dimension=void 0;n.vtp_metric=void 0;var q=B(n);d=B(d,q)}B(rj(d.vtp_fieldsToSet,"fieldName","value"),g);B(rj(d.vtp_contentGroup,
"index","group"),h);B(rj(d.vtp_dimension,"index","dimension"),k);B(rj(d.vtp_metric,"index","metric"),l);var u=qe(d.vtp_functionName);if(qa(u)){var p="",r="";d.vtp_setTrackerName&&"string"==typeof d.vtp_trackerName?""!==d.vtp_trackerName&&(r=d.vtp_trackerName,p=r+"."):(r="gtm"+Lc(),p=r+".");var v={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,legacyCookieDomain:!0,
legacyHistoryImport:!0,storage:!0,useAmpClientId:!0,storeGac:!0},w={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,allowAdFeatures:!0},y=function(O){var L=[].slice.call(arguments,0);L[0]=p+L[0];u.apply(window,L)},x=function(O,L){return void 0===L?L:O(L)},z=function(O,L){if(L)for(var sa in L)L.hasOwnProperty(sa)&&y("set",O+sa,L[sa])},C=function(){
var O=function(Ll,oi,Ml){if(!Pa(oi))return!1;for(var $c=Ga(Object(oi),Ml,[]),Ff=0;$c&&Ff<$c.length;Ff++)y(Ll,$c[Ff]);return!!$c&&0<$c.length},L;if(d.vtp_useEcommerceDataLayer){var sa=!1;sa||(L=V("ecommerce",1))}else d.vtp_ecommerceMacroData&&(L=d.vtp_ecommerceMacroData.ecommerce);if(!Pa(L))return;L=Object(L);var Cb=Ga(g,"currencyCode",L.currencyCode);
void 0!==Cb&&y("set","&cu",Cb);O("ec:addImpression",L,"impressions");if(O("ec:addPromo",L[L.promoClick?"promoClick":"promoView"],"promotions")&&L.promoClick){y("ec:setAction","promo_click",L.promoClick.actionField);return}for(var Ba="detail checkout checkout_option click add remove purchase refund".split(" "),$a="refund purchase remove checkout checkout_option add click detail".split(" "),ab=0;ab<Ba.length;ab++){var kb=L[Ba[ab]];if(kb){O("ec:addProduct",kb,"products");y("ec:setAction",Ba[ab],kb.actionField);
if(ed)for(var sb=0;sb<$a.length;sb++){var pc=L[$a[sb]];if(pc){pc!==kb&&J("GTM",13);break}}break}}},A=function(O,L,sa){var Cb=0;if(O)for(var Ba in O)if(O.hasOwnProperty(Ba)&&(sa&&v[Ba]||!sa&&void 0===v[Ba])){var $a=w[Ba]?Ca(O[Ba]):O[Ba];"anonymizeIp"!=Ba||$a||($a=void 0);L[Ba]=$a;Cb++}return Cb},E={name:r};A(g,E,!0);u("create",d.vtp_trackingId||e.trackingId,E);y("set","&gtm",di(!0));d.vtp_enableRecaptcha&&y("require","recaptcha","recaptcha.js");(function(O,L){void 0!==d[L]&&y("set",O,d[L])})("nonInteraction","vtp_nonInteraction");z("contentGroup",h);z("dimension",k);z("metric",l);var H={};A(g,H,!1)&&y("set",H);var K;
d.vtp_enableLinkId&&y("require","linkid","linkid.js");y("set","hitCallback",function(){var O=g&&g.hitCallback;qa(O)&&O();d.vtp_gtmOnSuccess()});if("TRACK_EVENT"==d.vtp_trackType){d.vtp_enableEcommerce&&(y("require","ec","ec.js"),C());var Q={hitType:"event",eventCategory:String(d.vtp_eventCategory||e.category),eventAction:String(d.vtp_eventAction||e.action),eventLabel:x(String,d.vtp_eventLabel||e.label),eventValue:x(Aa,d.vtp_eventValue||
e.value)};A(K,Q,!1);y("send",Q);}else if("TRACK_SOCIAL"==d.vtp_trackType){}else if("TRACK_TRANSACTION"==d.vtp_trackType){
y("require","ecommerce","//www.google-analytics.com/plugins/ua/ecommerce.js");var T=function(O){return V("transaction"+O,1)},ha=T("Id");y("ecommerce:addTransaction",{id:ha,affiliation:T("Affiliation"),revenue:T("Total"),shipping:T("Shipping"),tax:T("Tax")});for(var ca=T("Products")||[],N=0;N<ca.length;N++){var M=ca[N];y("ecommerce:addItem",{id:ha,sku:M.sku,name:M.name,category:M.category,price:M.price,quantity:M.quantity})}y("ecommerce:send");}else if("TRACK_TIMING"==
d.vtp_trackType){}else if("DECORATE_LINK"==d.vtp_trackType){}else if("DECORATE_FORM"==d.vtp_trackType){}else if("TRACK_DATA"==d.vtp_trackType){}else{d.vtp_enableEcommerce&&(y("require","ec","ec.js"),C());if(d.vtp_doubleClick||"DISPLAY_FEATURES"==d.vtp_advertisingFeaturesType){var na=
"_dc_gtm_"+String(d.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");y("require","displayfeatures",void 0,{cookieName:na})}if("DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==d.vtp_advertisingFeaturesType){var ka="_dc_gtm_"+String(d.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");y("require","adfeatures",{cookieName:ka})}K?y("send","pageview",K):y("send","pageview");}if(!a){var ta=d.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";d.vtp_useInternalVersion&&!d.vtp_useDebugVersion&&(ta="internal/"+ta);a=!0;var bb=P("https:","http:","//www.google-analytics.com/"+ta,g&&g.forceSSL);R(bb,function(){var O=oe();O&&O.loaded||d.vtp_gtmOnFailure();},d.vtp_gtmOnFailure)}}else G(d.vtp_gtmOnFailure)};Y.__ua=c;Y.__ua.b="ua";Y.__ua.g=!0;Y.__ua.priorityOverride=0}();



Y.a.opt=["google"],function(){var a,b=function(c){var d={};if(c.vtp_gaSettings){var e=c.vtp_gaSettings;B(rj(e.vtp_fieldsToSet,"fieldName","value"),d);c.vtp_gaSettings=null;e.vtp_fieldsToSet=void 0;var g=B(e);c=B(c,g)||{}}B(rj(c.vtp_fieldsToSet,"fieldName","value"),d);var h=qe(c.vtp_functionName);if(qa(h)){h.r=!0;var k="",l="";c.vtp_setTrackerName&&"string"===typeof c.vtp_trackerName?""!==c.vtp_trackerName&&(l=c.vtp_trackerName,k=l+"."):(l="gtm"+Lc(),k=l+".");var m={name:!0,clientId:!0,sampleRate:!0,
siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,storage:!0,useAmpClientId:!0,storeGac:!0},n={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0},q=function(y,x,z){var C=0,A;for(A in y)if(y.hasOwnProperty(A)&&
(z&&m[A]||!z&&void 0===m[A])){var E=n[A]?Ca(y[A]):y[A];"anonymizeIp"!==A||E||(E=void 0);x[A]=E;C++}return C},u={name:l};q(d,u,!0);var p={"&gtm":di(!0)};q(d,p,!1);var r=encodeURI(P("https:","http:","//www.google-analytics.com/"+(c.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js"),!!d.forceSSL));h("create",c.vtp_trackingId,u);h(k+"set",p);h(k+"require",c.vtp_optimizeContainerId,{dataLayer:"dataLayer"});h(c.vtp_gtmOnSuccess);h(k+"require","render");a||(a=!0,R(r,function(){return oe().loaded||
c.vtp_gtmOnFailure()},c.vtp_gtmOnFailure));var v=W("dataLayer"),w=v&&v.hide;w&&w.end&&(w[c.vtp_optimizeContainerId]=!0)}else G(c.vtp_gtmOnFailure)};Y.__opt=b;Y.__opt.b="opt";Y.__opt.g=!0;Y.__opt.priorityOverride=0}();
Y.a.cid=["google"],function(){(function(a){Y.__cid=a;Y.__cid.b="cid";Y.__cid.g=!0;Y.__cid.priorityOverride=0})(function(){return zc.m})}();

Y.a.gclidw=["google"],function(){var a=["aw","dc","gf","ha","gp"];(function(b){Y.__gclidw=b;Y.__gclidw.b="gclidw";Y.__gclidw.g=!0;Y.__gclidw.priorityOverride=100})(function(b){G(b.vtp_gtmOnSuccess);var c,d,e;b.vtp_enableCookieOverrides&&(e=b.vtp_cookiePrefix,c=b.vtp_path,d=b.vtp_domain);var g=null;b.vtp_enableCookieUpdateFeature&&(g=!0,void 0!==b.vtp_cookieUpdate&&(g=!!b.vtp_cookieUpdate));var h=e,k=c,l=d;if(b.vtp_enableCrossDomainFeature&&(!b.vtp_enableCrossDomain||!1!==b.vtp_acceptIncoming)&&(b.vtp_enableCrossDomain||
Dh())){Rh(a,h,k,l,void 0);}var m={prefix:e,path:c,domain:d,Ia:void 0};Oh(m);Vh(["aw","dc"],m);$h(g,e,c,d);var n=e;if(b.vtp_enableCrossDomainFeature&&b.vtp_enableCrossDomain&&b.vtp_linkerDomains){var q=b.vtp_linkerDomains.toString().replace(/\s+/g,"").split(","),u=b.vtp_urlPosition,p=!!b.vtp_formDecoration;Th(a,q,u,p,n);}})}();


Y.a.aev=["google"],function(){function a(p,r){var v=wd(p,"gtm");if(v)return v[r]}function b(p,r,v,w){w||(w="element");var y=p+"."+r,x;if(n.hasOwnProperty(y))x=n[y];else{var z=a(p,w);if(z&&(x=v(z),n[y]=x,q.push(y),35<q.length)){var C=q.shift();delete n[C]}}return x}function c(p,r,v){var w=a(p,u[r]);return void 0!==w?w:v}function d(p,r){if(!p)return!1;var v=e(Wi());ua(r)||(r=String(r||"").replace(/\s+/g,"").split(","));for(var w=[v],y=0;y<r.length;y++)if(r[y]instanceof RegExp){if(r[y].test(p))return!1}else{var x=
r[y];if(0!=x.length){if(0<=e(p).indexOf(x))return!1;w.push(e(x))}}return!qj(p,w)}function e(p){m.test(p)||(p="http://"+p);return Ae(Be(p),"HOST",!0)}function g(p,r,v){switch(p){case "SUBMIT_TEXT":return b(r,"FORM."+p,h,"formSubmitElement")||v;case "LENGTH":var w=b(r,"FORM."+p,k);return void 0===w?v:w;case "INTERACTED_FIELD_ID":return l(r,"id",v);case "INTERACTED_FIELD_NAME":return l(r,"name",v);case "INTERACTED_FIELD_TYPE":return l(r,"type",v);case "INTERACTED_FIELD_POSITION":var y=a(r,"interactedFormFieldPosition");
return void 0===y?v:y;case "INTERACT_SEQUENCE_NUMBER":var x=a(r,"interactSequenceNumber");return void 0===x?v:x;default:return v}}function h(p){switch(p.tagName.toLowerCase()){case "input":return bc(p,"value");case "button":return cc(p);default:return null}}function k(p){if("form"===p.tagName.toLowerCase()&&p.elements){for(var r=0,v=0;v<p.elements.length;v++)ki(p.elements[v])&&r++;return r}}function l(p,r,v){var w=a(p,"interactedFormField");return w&&bc(w,r)||v}var m=/^https?:\/\//i,n={},q=[],u={ATTRIBUTE:"elementAttribute",
CLASSES:"elementClasses",ELEMENT:"element",ID:"elementId",HISTORY_CHANGE_SOURCE:"historyChangeSource",HISTORY_NEW_STATE:"newHistoryState",HISTORY_NEW_URL_FRAGMENT:"newUrlFragment",HISTORY_OLD_STATE:"oldHistoryState",HISTORY_OLD_URL_FRAGMENT:"oldUrlFragment",TARGET:"elementTarget"};(function(p){Y.__aev=p;Y.__aev.b="aev";Y.__aev.g=!0;Y.__aev.priorityOverride=0})(function(p){var r=p.vtp_gtmEventId,v=p.vtp_defaultValue,w=p.vtp_varType;switch(w){case "TAG_NAME":var y=a(r,"element");return y&&y.tagName||
v;case "TEXT":return b(r,w,cc)||v;case "URL":var x;a:{var z=String(a(r,"elementUrl")||v||""),C=Be(z),A=String(p.vtp_component||"URL");switch(A){case "URL":x=z;break a;case "IS_OUTBOUND":x=d(z,p.vtp_affiliatedDomains);break a;default:x=Ae(C,A,p.vtp_stripWww,p.vtp_defaultPages,p.vtp_queryKey)}}return x;case "ATTRIBUTE":var E;if(void 0===p.vtp_attribute)E=c(r,w,v);else{var H=p.vtp_attribute,K=a(r,"element");E=K&&bc(K,H)||v||""}return E;case "MD":var Q=p.vtp_mdValue,Z=b(r,"MD",Gi);return Q&&Z?Ji(Z,Q)||
v:Z||v;case "FORM":return g(String(p.vtp_component||"SUBMIT_TEXT"),r,v);default:return c(r,w,v)}})}();
Y.a.gas=["google"],function(){(function(a){Y.__gas=a;Y.__gas.b="gas";Y.__gas.g=!0;Y.__gas.priorityOverride=0})(function(a){var b=B(a),c=b;c[Gb.la]=null;c[Gb.bf]=null;var d=b=c;d.vtp_fieldsToSet=d.vtp_fieldsToSet||[];var e=d.vtp_cookieDomain;void 0!==e&&(d.vtp_fieldsToSet.push({fieldName:"cookieDomain",value:e}),delete d.vtp_cookieDomain);return b})}();

Y.a.awct=["google"],function(){var a=!1,b=[],c=function(k){var l=W("google_trackConversion"),m=k.gtm_onFailure;"function"==typeof l?l(k)||m():m()},d=function(){for(;0<b.length;)c(b.shift())},e=function(){return function(){d();a=!1}},g=function(){return function(){d();b={push:c};}},h=function(k){je();var l={google_basket_transaction_type:"purchase",google_conversion_domain:"",google_conversion_id:k.vtp_conversionId,google_conversion_label:k.vtp_conversionLabel,
google_conversion_value:k.vtp_conversionValue||0,google_remarketing_only:!1,onload_callback:k.vtp_gtmOnSuccess,gtm_onFailure:k.vtp_gtmOnFailure,google_gtm:di()},m=function(v){return function(w,y,x){var z="DATA_LAYER"==v?V(x):k[y];z&&(l[w]=z)}},n=m("JSON");n("google_conversion_currency","vtp_currencyCode");n("google_conversion_order_id","vtp_orderId");k.vtp_enableProductReporting&&(n=m(k.vtp_productReportingDataSource),n("google_conversion_merchant_id","vtp_awMerchantId","aw_merchant_id"),n("google_basket_feed_country",
"vtp_awFeedCountry","aw_feed_country"),n("google_basket_feed_language","vtp_awFeedLanguage","aw_feed_language"),n("google_basket_discount","vtp_discount","discount"),n("google_conversion_items","vtp_items","items"),l.google_conversion_items=l.google_conversion_items.map(function(v){return{value:v.price,quantity:v.quantity,item_id:v.id}}));var q=function(v,w){(l.google_additional_conversion_params=l.google_additional_conversion_params||{})[v]=w},u=function(v){return function(w,y,x,z){var C="DATA_LAYER"==
v?V(x):k[y];z(C)&&q(w,C)}},p=-1==navigator.userAgent.toLowerCase().indexOf("firefox")?"//www.googleadservices.com/pagead/conversion_async.js":"https://www.google.com/pagead/conversion_async.js";k.vtp_enableNewCustomerReporting&&(n=u(k.vtp_newCustomerReportingDataSource),n("vdnc","vtp_awNewCustomer","new_customer",function(v){return void 0!=v&&""!==v}),n("vdltv","vtp_awCustomerLTV","customer_lifetime_value",function(v){return void 0!=v&&""!==v}));!k.hasOwnProperty("vtp_enableConversionLinker")||k.vtp_enableConversionLinker?
(k.vtp_conversionCookiePrefix&&(l.google_gcl_cookie_prefix=k.vtp_conversionCookiePrefix),l.google_read_gcl_cookie_opt_out=!1):l.google_read_gcl_cookie_opt_out=!0;var r=!0;r&&b.push(l);a||(a=!0,R(p,g(),e(p)))};Y.__awct=h;
Y.__awct.b="awct";Y.__awct.g=!0;Y.__awct.priorityOverride=0}();Y.a.remm=["google"],function(){(function(a){Y.__remm=a;Y.__remm.b="remm";Y.__remm.g=!0;Y.__remm.priorityOverride=0})(function(a){for(var b=a.vtp_input,c=a.vtp_map||[],d=a.vtp_fullMatch,e=a.vtp_ignoreCase?"gi":"g",g=0;g<c.length;g++){var h=c[g].key||"";d&&(h="^"+h+"$");var k=new RegExp(h,e);if(k.test(b)){var l=c[g].value;a.vtp_replaceAfterMatch&&(l=String(b).replace(k,l));return l}}return a.vtp_defaultValue})}();
Y.a.smm=["google"],function(){(function(a){Y.__smm=a;Y.__smm.b="smm";Y.__smm.g=!0;Y.__smm.priorityOverride=0})(function(a){var b=a.vtp_input,c=rj(a.vtp_map,"key","value")||{};return c.hasOwnProperty(b)?c[b]:a.vtp_defaultValue})}();


Y.a.hid=["google"],function(){(function(a){Y.__hid=a;Y.__hid.b="hid";Y.__hid.g=!0;Y.__hid.priorityOverride=0})(function(){return Kg.yb})}();
Y.a.html=["customScripts"],function(){function a(d,e,g,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,g,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var m=F.createElement("script");m.async=!1;m.type="text/javascript";m.id=k.id;m.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(m.charset=k.charset);var n=k.getAttribute("data-gtmsrc");n&&(m.src=n,Vb(m,l));d.insertBefore(m,null);n||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var q=
[];k.firstChild;)q.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,q,l,h)()}else d.insertBefore(k,null),l()}else g()}catch(u){G(h)}}}var c=function(d){if(F.body){var e=
d.vtp_gtmOnFailure,g=gj(d.vtp_html,d.vtp_gtmOnSuccess,e),h=g.Ec,k=g.s;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(F.body,dc(h),k,e)()}else Vi(function(){c(d)},
200)};Y.__html=c;Y.__html.b="html";Y.__html.g=!0;Y.__html.priorityOverride=0}();






Y.a.lcl=[],function(){function a(){var e=W("document"),g=0,h=function(k){var l=k.target;if(l&&3!==k.which&&!(k.Ag||k.timeStamp&&k.timeStamp===g)){g=k.timeStamp;l=ec(l,["a","area"],100);if(!l)return k.returnValue;var m=k.defaultPrevented||!1===k.returnValue,n=Rg("lcl",m?"nv.mwt":"mwt",0),q;q=m?Rg("lcl","nv.ids",[]):Rg("lcl","ids",[]);if(q.length){var u=Ng(l,"gtm.linkClick",q);if(b(k,l,e)&&!m&&n&&l.href){var p=String(fj(l,"rel")||""),r=!!va(p.split(" "),function(y){return"noreferrer"===y.toLowerCase()});
r&&J("GTM",36);var v=W((fj(l,"target")||"_self").substring(1)),w=!0;if(Zi(u,hg(function(){var y;if(y=w&&v){var x;a:if(r&&d){var z;try{z=new MouseEvent(k.type)}catch(C){if(!e.createEvent){x=!1;break a}z=e.createEvent("MouseEvents");z.initEvent(k.type,!0,!0)}z.Ag=!0;k.target.dispatchEvent(z);x=!0}else x=!1;y=!x}y&&(v.location.href=fj(l,"href"))}),n))w=!1;else return k.preventDefault&&k.preventDefault(),k.returnValue=!1}else Zi(u,function(){},n||2E3);return!0}}};$b(e,"click",h,!1);$b(e,"auxclick",h,
!1)}function b(e,g,h){if(2===e.which||e.ctrlKey||e.shiftKey||e.altKey||e.metaKey)return!1;var k=fj(g,"href"),l=k.indexOf("#"),m=fj(g,"target");if(m&&"_self"!==m&&"_parent"!==m&&"_top"!==m||0===l)return!1;if(0<l){var n=Yi(k),q=Yi(h.location);return n!==q}return!0}function c(e){var g=void 0===e.vtp_waitForTags?!0:e.vtp_waitForTags,h=void 0===e.vtp_checkValidation?!0:e.vtp_checkValidation,k=Number(e.vtp_waitForTagsTimeout);if(!k||0>=k)k=2E3;var l=e.vtp_uniqueTriggerId||"0";if(g){var m=function(q){return Math.max(k,
q)};Qg("lcl","mwt",m,0);h||Qg("lcl","nv.mwt",m,0)}var n=function(q){q.push(l);return q};Qg("lcl","ids",n,[]);h||Qg("lcl","nv.ids",n,[]);cj("lcl")||(a(),dj("lcl"));G(e.vtp_gtmOnSuccess)}var d=!1;Y.__lcl=c;Y.__lcl.b="lcl";Y.__lcl.g=!0;Y.__lcl.priorityOverride=0;}();

Y.a.evl=["google"],function(){function a(g,h){this.element=g;this.uid=h}function b(){var g=Number(V("gtm.start"))||0;return(new Date).getTime()-g}function c(g,h,k,l){function m(){if(!Mi(g.target)){h.has(e.Bb)||h.set(e.Bb,""+b());h.has(e.oc)||h.set(e.oc,""+b());var q=0;h.has(e.Eb)&&(q=Number(h.get(e.Eb)));q+=100;h.set(e.Eb,""+q);if(q>=k){var u=Ng(g.target,"gtm.elementVisibility",[h.uid]),p=Li(g.target);u["gtm.visibleRatio"]=Math.round(1E3*p)/10;u["gtm.visibleTime"]=k;u["gtm.visibleFirstTime"]=Number(h.get(e.oc));
u["gtm.visibleLastTime"]=Number(h.get(e.Bb));Zi(u);l()}}}if(!h.has(e.ab)&&(0==k&&m(),!h.has(e.Ba))){var n=W("self").setInterval(m,100);h.set(e.ab,n)}}function d(g){g.has(e.ab)&&(W("self").clearInterval(Number(g.get(e.ab))),g.remove(e.ab))}var e={ab:"polling-id-",oc:"first-on-screen-",Bb:"recent-on-screen-",Eb:"total-visible-time-",Ba:"has-fired-"};a.prototype.has=function(g){return!!this.element.getAttribute("data-gtm-vis-"+g+this.uid)};a.prototype.get=function(g){return this.element.getAttribute("data-gtm-vis-"+
g+this.uid)};a.prototype.set=function(g,h){this.element.setAttribute("data-gtm-vis-"+g+this.uid,h)};a.prototype.remove=function(g){this.element.removeAttribute("data-gtm-vis-"+g+this.uid)};(function(g){Y.__evl=g;Y.__evl.b="evl";Y.__evl.g=!0;Y.__evl.priorityOverride=0})(function(g){function h(){var y=!1,x=null;if("CSS"===l){try{x=Qf(m)}catch(H){}y=!!x&&v.length!=x.length}else if("ID"===l){var z=F.getElementById(m);z&&(x=[z],y=1!=v.length||v[0]!==z)}x||(x=[],y=0<v.length);if(y){for(var C=0;C<v.length;C++){var A=
new a(v[C],p);d(A)}v=[];for(var E=0;E<x.length;E++)v.push(x[E]);0<=w&&Si(w);0<v.length&&(w=Ri(k,v,[u]))}}function k(y){var x=new a(y.target,p);y.intersectionRatio>=u?x.has(e.Ba)||c(y,x,q,"ONCE"===r?function(){for(var z=0;z<v.length;z++){var C=new a(v[z],p);C.set(e.Ba,"1");d(C)}Si(w);if(n&&ri)for(var A=0;A<ri.length;A++)ri[A]===h&&ri.splice(A,1)}:function(){x.set(e.Ba,"1");d(x)}):(d(x),"MANY_PER_ELEMENT"===r&&x.has(e.Ba)&&(x.remove(e.Ba),x.remove(e.Eb)),x.remove(e.Bb))}var l=g.vtp_selectorType,m;"ID"===
l?m=String(g.vtp_elementId):"CSS"===l&&(m=String(g.vtp_elementSelector));var n=!!g.vtp_useDomChangeListener,q=g.vtp_useOnScreenDuration&&Number(g.vtp_onScreenDuration)||0,u=(Number(g.vtp_onScreenRatio)||50)/100,p=g.vtp_uniqueTriggerId,r=g.vtp_firingFrequency,v=[],w=-1;h();n&&si(h);G(g.vtp_gtmOnSuccess)})}();

var Kl={};Kl.macro=function(a){if(Kg.sc.hasOwnProperty(a))return Kg.sc[a]},Kl.onHtmlSuccess=Kg.Qd(!0),Kl.onHtmlFailure=Kg.Qd(!1);Kl.dataLayer=pd;Kl.callback=function(a){Jc.hasOwnProperty(a)&&qa(Jc[a])&&Jc[a]();delete Jc[a]};Kl.Ff=function(){Ac[zc.m]=Kl;Ia(Kc,Y.a);xb=xb||Kg;yb=Td};
Kl.wg=function(){Fh.gtm_3pds=!0;Ac=D.google_tag_manager=D.google_tag_manager||{};if(Ac[zc.m]){var a=Ac.zones;a&&a.unregisterChild(zc.m)}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)pb.push(c[d]);for(var e=b.tags||[],g=0;g<e.length;g++)tb.push(e[g]);for(var h=b.predicates||[],
k=0;k<h.length;k++)rb.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var n=l[m],q={},u=0;u<n.length;u++)q[n[u][0]]=Array.prototype.slice.call(n[u],1);qb.push(q)}vb=Y;wb=kj;(0,Kl.Ff)();ng();Wd=!1;Xd=0;if("interactive"==F.readyState&&!F.createEventObject||"complete"==F.readyState)Zd();else{$b(F,"DOMContentLoaded",Zd);$b(F,"readystatechange",Zd);if(F.createEventObject&&F.documentElement.doScroll){var p=!0;try{p=!D.frameElement}catch(y){}p&&$d()}$b(D,"load",Zd)}ag=!1;"complete"===F.readyState?
cg():$b(D,"load",cg);a:{if(!ed)break a;D.setInterval(fd,864E5);}
Gc=(new Date).getTime();}};(0,Kl.wg)();

})()
