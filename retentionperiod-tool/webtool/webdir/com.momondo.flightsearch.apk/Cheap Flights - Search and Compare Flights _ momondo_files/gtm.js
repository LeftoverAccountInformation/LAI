
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"303",
  
  "macros":[{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return!!document.cookie.split(\/\\s*;\\s*\/).map(function(a){return a.split(\"\\x3d\")}).find(function(a){return\"GTM_DEBUG\"===a[0]\u0026\u0026\"true\"===a[1]})})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"destinationCityName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"cityName"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"undefined\"!==typeof ",["escape",["macro",1],8,16],"?\"",["escape",["macro",1],7],"\":\"",["escape",["macro",2],7],"\"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"destinationCityId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupCityId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"cityId"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",4],8,16],")return ",["escape",["macro",4],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",5],8,16],")return ",["escape",["macro",5],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",6],8,16],")return ",["escape",["macro",6],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"destinationRegionName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"regionName"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"undefined\"!==typeof ",["escape",["macro",8],8,16],"?\"",["escape",["macro",8],7],"\":",["escape",["macro",9],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"destinationRegionCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffRegionCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"regionCode"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",11],8,16],")return ",["escape",["macro",11],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",12],8,16],")return ",["escape",["macro",12],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",13],8,16],")return ",["escape",["macro",13],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"destinationCountryCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffCountryCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"countryCode"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",15],8,16],")return ",["escape",["macro",15],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",16],8,16],")return ",["escape",["macro",16],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",17],8,16],")return ",["escape",["macro",17],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"cabinClass"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",19],8,16],";if(\"undefined\"!==typeof a){var b={e:\"economy\",p:\"premium\",b:\"business\",f:\"first\",s:\"student\"};for(k in b)if(b[k]==a.toLowerCase())return a.toLowerCase();return a in b?b[a]:void 0}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"vertical"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var vertical=\"",["escape",["macro",21],7],"\".toLowerCase();if(\/^packagetours?$\/.test(vertical))return\"package\";else if(\/^(flight|hotel|car|package|rental|guide|cruise|train)s$\/.test(vertical))return vertical.slice(0,-1);else return vertical})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"brandId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"parentBrandId"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"",["escape",["macro",23],7],"\"===\"371\"||\"",["escape",["macro",24],7],"\"===\"371\"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"startDate"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"",["escape",["macro",26],7],"\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"",["escape",["macro",26],7],"\".replace(\/-\/g,\"\")})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"endDate"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"",["escape",["macro",29],7],"\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"",["escape",["macro",29],7],"\".replace(\/-\/g,\"\")})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":true,
      "vtp_defaultValue":"",
      "vtp_name":"experiments"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=\"",["escape",["macro",32],7],"\".split(\/\\s*,\\s*\/g),a=0;a\u003Cb.length;a++){var c=b[a].match(\/^lift-test-([1-4])$\/);\"74ac32833f\"===b[a]\u0026\u0026(c=!0);\"b51f7d7d6b\"===b[a]\u0026\u0026(c=!0);\"aceb27e931\"===b[a]\u0026\u0026(c=!0);\"f2509541b5\"===b[a]\u0026\u0026(c=!0);if(c)return c[1]}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"brand"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"===typeof ",["escape",["macro",34],8,16],")return!1;var a={kayak:!0,checkfelixat:!0,checkfelixint:!0,swoodoo_wl:!0,swoodooat:!0,swoodooch:!0,mundi:!0,momondo:!0,\"momondo-kyk-wl\":!0,cheapflights:!0};return!0===a[",["escape",["macro",34],8,16],"]?a[",["escape",["macro",34],8,16],"]:!1})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"locale"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b={DK:!0,SE:!0,CH:!0,ES:!0,FI:!0,FR:!0,GB:!0,GR:!0,IE:!0,IT:!0,NL:!0,NO:!0,PL:!0,PT:!0,TR:!0,DE:!0,AT:!0},a=",["escape",["macro",36],8,16],";return\"string\"===typeof a?(a=a.slice(-2),a in b\u0026\u0026!0===b[a]):!1})();"]
    },{
      "function":"__dbg"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a,b,c){if(!0===",["escape",["macro",38],8,16],")console[a](\"- GTM log | \"+b,c)}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(c,b){var a=document.createElement(\"script\");a.type=\"text\/javascript\";\"readyState\"in a?a.onreadystatechange=function(){if(\"loaded\"===a.readyState||\"complete\"===a.readyState)a.onreadystatechange=null,b()}:a.onload=function(){b()};a.src=c;document.body.appendChild(a)}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"originAirportCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"destinationAirportCode"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"",["escape",["macro",41],7],"-",["escape",["macro",42],7],"\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return ",["escape",["macro",36],8,16],".substr(3)})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(b){for(var a=[\"floodlightId\",\"type\",\"category\"],c=0;c\u003Ca.length;c++)if(!a[c]in b)return console.warn(\"Floodlight Counter Tag is missing a required argument\",a[c]),null;a=Math.random()+\"\";a*=1E13;a=\"https:\/\/\"+b.floodlightId+\".fls.doubleclick.net\/activityi;src\\x3d\"+b.floodlightId+\";type\\x3d\"+b.type+\";cat\\x3d\"+b.category+\";dc_lat\\x3d;dc_rdid\\x3d;tag_for_child_directed_treatment\\x3d;ord\\x3d1;num\\x3d\"+a;if(\"undefined\"!==typeof b.customDimensions)for(cdId in b.customDimensions)a+=\n\";\"+cdId+\"\\x3d\"+b.customDimensions[cdId];return'\\x3ciframe src\\x3d\"'+a+'?\" width\\x3d\"1\" height\\x3d\"1\" frameborder\\x3d\"0\" style\\x3d\"display:none\"\\x3e\\x3c\/iframe\\x3e'}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a){for(var b=[\"floodlightId\",\"type\",\"category\",\"orderId\"],c=0;c\u003Cb.length;c++)if(!b[c]in a)return console.warn(\"Floodlight Counter Tag is missing a required argument\",b[c]),null;c=b=1;b=\"https:\/\/\"+a.floodlightId+\".fls.doubleclick.net\/activityi;src\\x3d\"+a.floodlightId+\";type\\x3d\"+a.type+\";cat\\x3d\"+a.category+\";dc_lat\\x3d;dc_rdid\\x3d;tag_for_child_directed_treatment\\x3d;ord\\x3d\"+a.orderId+\";qty\\x3d\"+b+\";cost\\x3d\"+c;if(\"undefined\"!==typeof a.customDimensions)for(cdId in a.customDimensions)b+=\n\";\"+cdId+\"\\x3d\"+a.customDimensions[cdId];return'\\x3ciframe src\\x3d\"'+b+'?\" width\\x3d\"1\" height\\x3d\"1\" frameborder\\x3d\"0\" style\\x3d\"display:none\"\\x3e\\x3c\/iframe\\x3e'}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"searchId"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a){var e=\"undefined\"!==typeof ",["escape",["macro",47],8,16],"?\"",["escape",["macro",47],7],"\":!1;if(\"undefined\"===typeof a.storageKey)return console.warn(\"Expected storage key\"),!1;var c={incrementionDelimiter:\"@\",storageKey:\"storage_key_\"+Date.parse(new Date).toString(),storageTTL:864E5};for(d in a)\"undefined\"!==typeof c[d]\u0026\u0026(c[d]=a[d]);try{var d=\"safeLocalStorageTest\";window.localStorage.setItem(d,\"succeeds\");window.localStorage.removeItem(d)}catch(f){return console.warn(f),!1}var b=JSON.parse(window.localStorage.getItem(c.storageKey))||\n{};Object.keys(b).forEach(function(a){(!b[a].time||b[a].time+c.storageTTL\u003CDate.now())\u0026\u0026delete b[a]});a=b[e]||{};a.time=Date.now();a.clickCount=(a.clickCount||0)+1;b[e]=a;window.localStorage.setItem(c.storageKey,JSON.stringify(b));return encodeURIComponent(e+c.incrementionDelimiter+a.clickCount)}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var e=function(){var e={0:\"january\",1:\"february\",2:\"march\",3:\"april\",4:\"may\",5:\"june\",6:\"july\",7:\"august\",8:\"september\",9:\"october\",10:\"november\",11:\"december\"},f={0:\"sunday\",1:\"monday\",2:\"tuesday\",3:\"wednesday\",4:\"thursday\",5:\"friday\",6:\"saturday\"};return{dateString:function(a){\"undefined\"===typeof a\u0026\u0026(a=new Date);var c=a;if(\"string\"!==typeof c\u0026\u0026\"object\"!==typeof c)a=void 0;else{a=(new Date(c)).getFullYear().toString();var b=(new Date(c)).getDate().toString();b=1===b.length?\"0\"+b:b;c=\n((new Date(c)).getMonth()+1).toString();c=1===c.length?\"0\"+c:c;a=a+\"-\"+c+\"-\"+b}return a},dayString:function(a){if(\"undefined\"===typeof a)a=new Date;else if(\"object\"!==typeof a)return;return f[a.getDay()]},monthString:function(a){if(\"undefined\"===typeof a)a=new Date;else if(\"object\"!==typeof a)return;return e[a.getMonth()]},deltaDays:function(a,c){var b=Date.parse(a),d=Date.parse(c),e=1==(b\u003Ed?1:b\u003Cd?-1:0)?b:d;b=-1==(d\u003Eb?1:d\u003Cb?-1:0)?d:b;d=864E5;return Math.round((e-b)\/d)}}}();return e})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",32],8,16],"){var a={},b=",["escape",["macro",32],8,16],".split(\",\"),c;for(c in b)a[b[c].trim()]=!0;return a}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"affiliate"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"string\"===typeof ",["escape",["macro",51],8,16],")return ",["escape",["macro",51],8,16],".split(\"\/\")[0]})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){ga.getAll().forEach(function(a){return a.get(\"clientId\")})})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"eventName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"screenId"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"screenView\"===",["escape",["macro",54],8,16],")switch(",["escape",["macro",55],8,16],"){case \"results\":return\"search\";case \"confirmation\":return\"whisky purchase\"}return\"clickOut\"===",["escape",["macro",54],8,16],"?\"book\":",["escape",["macro",54],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"obfuscatedUserId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"obfuscatedSessionId"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"undefined\"!==typeof ",["escape",["macro",57],8,16],"?",["escape",["macro",57],8,16],":",["escape",["macro",58],8,16],"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(d,b,e){for(var c=0;c\u003Cb.length;c++){var f=0==c?\"?\":\"\\x26\",a=b[c];!0===e\u0026\u0026(a=a.split(\"\\x3d\"),a=a[0]+\"\\x3d\"+encodeURIComponent(a[1]));d+=f+a}b=new Image;b.referrerPolicy=\"no-referrer\";b.src=d}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"www.cn.kayak.com,www.es.kayak.com,www.fi.kayak.com,www.gr.kayak.com,www.kayak.ae,www.kayak.cat,www.kayak.ch,www.kayak.cl,www.kayak.co.id,www.kayak.co.in,www.kayak.co.jp,www.kayak.co.kr,www.kayak.co.th,www.kayak.co.uk,www.kayak.com,www.kayak.com.ar,www.kayak.com.au,www.kayak.com.br,www.kayak.com.co,www.kayak.com.hk,www.kayak.com.mx,www.kayak.com.my,www.kayak.com.pe,www.kayak.com.tr,www.kayak.de,www.kayak.dk,www.kayak.es,www.kayak.fr,www.kayak.ie,www.kayak.it,www.kayak.nl,www.kayak.no,www.kayak.pl,www.kayak.pt,www.kayak.ru,www.kayak.se,www.kayak.sg,www.nz.kayak.com,www.tw.kayak.com,www.cn.momondo.com,www.momondo.at,www.momondo.be,www.momondo.by,www.momondo.ca,www.momondo.ch,www.momondo.cl,www.momondo.co.nz,www.momondo.co.uk,www.momondo.co.za,www.momondo.com,www.momondo.com.ar,www.momondo.com.au,www.momondo.com.br,www.momondo.com.co,www.momondo.com.pe,www.momondo.com.tr,www.momondo.com\/es,www.momondo.cz,www.momondo.de,www.momondo.dk,www.momondo.ee,www.momondo.es,www.momondo.fi,www.momondo.fr,www.momondo.hk,www.momondo.ie,www.momondo.in,www.momondo.it,www.momondo.kz,www.momondo.mx,www.momondo.nl,www.momondo.no,www.momondo.pl,www.momondo.pt,www.momondo.ro,www.momondo.ru,www.momondo.se,www.momondo.tw,www.momondo.ua,www.ae.cheapflights.com,www.cheapflights.ca,www.cheapflights.co.id,www.cheapflights.co.nz,www.cheapflights.co.uk,www.cheapflights.co.za,www.cheapflights.com,www.cheapflights.com.au,www.cheapflights.com.hk,www.cheapflights.com.my,www.cheapflights.com.ph,www.cheapflights.com.sg,www.cheapflights.qa,www.in.cheapflights.com,www.swoodoo.at,www.swoodoo.ch,www.swoodoo.com,www.checkfelix.com,www.mundi.com.br\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return ",["escape",["macro",36],8,16],".substr(0,2)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"totalTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"guests"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"undefined\"!==typeof ",["escape",["macro",63],8,16],"?",["escape",["macro",63],8,16],":",["escape",["macro",64],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupAirportCode"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",41],8,16],")return ",["escape",["macro",41],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",66],8,16],")return ",["escape",["macro",66],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"originCountryCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupCountryCode"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",68],8,16],")return ",["escape",["macro",68],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",69],8,16],")return ",["escape",["macro",69],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"originRegionName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupRegionName"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",71],8,16],")return ",["escape",["macro",71],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",72],8,16],")return ",["escape",["macro",72],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"originRegionCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupRegionCode"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",74],8,16],")return ",["escape",["macro",74],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",75],8,16],")return ",["escape",["macro",75],8,16],"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=document.referrer;if(0===a.length)return\"\";a=a.split(\"\/\");return a[0]+\"\/\/\"+a[2]})();"]
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=[\/f1.r9cdn.net\/,\/sss.www.checkfelix.com\/,\/runwaynine.com\/],c=\"",["escape",["macro",78],7],"\",b;for(b in a)if(c.match(a[b]))return!0;return!1})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a){var b={spoteffects:!1};return a in b?b[a]:!1}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=",["escape",["macro",36],8,16],",c=",["escape",["macro",34],8,16],",d=[\/(_FR)\/,\/_(DE)\/,\/_(GB)\/,\/_(GR)\/,\/_(IT)\/,\/_(QA)\/,\/_(AE)\/,\/_(ES)\/,\/_(PT)\/,\/_(PL)\/,\/_(TR)\/,\/_(RU)\/],e=[\/(_GB)\/,\/_(GL)\/,\/_(QA)\/,\/_(AE)\/,\/_(ZA)\/,\/_(IN)\/,\/_(NZ)\/,\/_(AU)\/,\/_(PH)\/];if(c.match(\/(kayak)\/)){if(b.match(\/(_US)\/))return 1195127;for(var a=0;a\u003Cd.length;a++)if(b.match(d[a]))return 1148264}if(c.match(\/(cheapflights)\/)){if(b.match(\/(_US)\/))return 1200005;for(a=0;a\u003Ce.length;a++)if(b.match(e[a]))return 1201470}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a,c,b){a=a+\"\\x3d\"+c+\";\";b=\"undefined\"!==typeof b?\"expires\\x3d\"+b+\";\":void 0;\"undefined\"!==typeof b\u0026\u0026(a+=b);a+=\"path\\x3d\/\";document.cookie=a}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(c){var a=decodeURIComponent(document.cookie);a=a.split(\";\");for(var b=0;b\u003Ca.length;b++){var d=a[b].split(\"\\x3d\")[0];if(d.trim()==c.trim())return c=a[b].split(\"\\x3d\")[1]}}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var c=\"fb\",d=\"1\",e=[\"\\x26\",\"#\"],f=Date.parse(new Date).toString(),a=document.location.href.split(\"fbclid\\x3d\")[1];if(\"undefined\"!==typeof a\u0026\u00260\u003Ca.length)return e.forEach(function(b){-1\u003Ca.indexOf(b)\u0026\u0026(a=a.substr(0,a.indexOf(b)))}),c+\".\"+d+\".\"+f+\".\"+a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"===typeof ",["escape",["macro",34],8,16],")return!1;var a={kayak:!0,checkfelixat:!0,checkfelixint:!0,swoodoo_wl:!0,swoodooat:!0,swoodooch:!0,mundi:!0,momondo:!0,\"momondo-kyk-wl\":!0,cheapflights:!0,hotelscombined:!0};return!0===a[",["escape",["macro",34],8,16],"]?a[",["escape",["macro",34],8,16],"]:!1})();"]
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dataConsent"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"DATA_CONSENT"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",37],8,16],";return!1===a\u0026\u0026\"undefined\"!==typeof ",["escape",["macro",36],8,16],"?!0:\"undefined\"!==typeof ",["escape",["macro",87],8,16],"?!0===",["escape",["macro",87],8,16],":\"undefined\"!==typeof ",["escape",["macro",88],8,16],"?!0===",["escape",["macro",88],8,16],"||\"true\"===",["escape",["macro",88],8,16],":!1})();"]
    },{
      "function":"__u",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"presentation"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=\"",["escape",["macro",44],7],"\";if(\"mweb\"==",["escape",["macro",91],8,16],"||\"tweb\"==",["escape",["macro",91],8,16],"){if(\"screenView\"==",["escape",["macro",54],8,16],"\u0026\u0026(\"results\"==",["escape",["macro",55],8,16],"||\"frontdoor\"==",["escape",["macro",55],8,16],")){switch(a){case \"DE\":return 9584;case \"ES\":return 9585;case \"FR\":return 9583;case \"GB\":return 9582}return 6766}}else if(\"web\"==",["escape",["macro",91],8,16],")if(\"confirmation\"!=",["escape",["macro",55],8,16],")switch(a){case \"US\":return 83;case \"CA\":return 20463;case \"DE\":return 4514;case \"ES\":return 4515;\ncase \"FR\":return 4513;case \"GB\":return 4512}else switch(a){case \"US\":return 20389;case \"CA\":return 20461;case \"DE\":return 20469;case \"ES\":return 20465;case \"FR\":return 20467;case \"GB\":return 20471}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b={\"kayak|swoodoo|mundi|checkfelix\":{\".*\":988306736},cheapflights:{US:833727979,\".*\":1053534539},momondo:{\".*\":1041444473}},a;for(a in b)if(",["escape",["macro",34],8,16],".match(a))for(var c in b[a])if(",["escape",["macro",44],8,16],".match(c))return b[a][c]})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"googleDynamicRemarketingOptions"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"isWhisky"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"clickOut\"===",["escape",["macro",54],8,16],"\u0026\u00260==",["escape",["macro",95],8,16],")return\"click0\";if(\"screenView\"===",["escape",["macro",54],8,16],"\u0026\u0026\"magazine\"===",["escape",["macro",22],8,16],")return\"conte0\";if(\"screenView\"===",["escape",["macro",54],8,16],"\u0026\u0026\"frontdoor\"===",["escape",["macro",55],8,16],")return\"front0\";if(\"clickOut\"===",["escape",["macro",54],8,16],"\u0026\u0026!0!==",["escape",["macro",95],8,16],")return\"click0\";if(\"clickOut\"===",["escape",["macro",54],8,16],"\u0026\u0026!0===",["escape",["macro",95],8,16],")return\"booki0\";if(\"results\"===",["escape",["macro",55],8,16],"\u0026\u0026\"screenView\"===",["escape",["macro",54],8,16],")return\"searc0\";\nif(\"confirmation\"!==",["escape",["macro",55],8,16],"){if(\"expandDetails\"===",["escape",["macro",54],8,16],")return\"detai0\";if(\"screenView\"===",["escape",["macro",54],8,16],"\u0026\u0026\"landing\"===",["escape",["macro",55],8,16],")return\"landi0\"}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"obfuscatedTrackingCookie"
    },{
      "function":"__r"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"user-test-1\"in ",["escape",["macro",50],8,16],"||\"23d2b7c649\"in ",["escape",["macro",50],8,16],"})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":true,
      "vtp_name":"source"
    },{
      "function":"__k",
      "vtp_decodeCookie":true,
      "vtp_name":"_msuuid_nixe9oroo0"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var map={\"kayak\":\"1347583438592982\",\"checkfelixat\":\"593382611027188\",\"checkfelixint\":\"593382611027188\",\"swoodoo_wl\":\"143839513144905\",\"swoodooat\":\"143839513144905\",\"swoodooch\":\"143839513144905\",\"cheapflights\":\"1753019971445860\",\"agoda\":[\"446731502144130\",\"856856107717994\"],\"mundi\":\"189563405032048\",\"momondo\":\"2132883120290726\",\"momondo-kyk-wl\":\"2132883120290726\"};var key=\"",["escape",["macro",22],7],"\"===\"magazine\"?\"kayak\":\"",["escape",["macro",34],7],"\";return map[key]||undefined})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"hashedObfuscatedTrackingCookie"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"resultId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"isLoggedIn"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"currency"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"placement"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"adultTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"childTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"originCityName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"subScreenId"
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"providerCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"geoIpCC"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"userScore"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"originCityId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"roundTrip"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"seniorTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"youthTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"seatInfantTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"lapInfantTravelers"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"rooms"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"hotelName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"hotelId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupTime"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffTime"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pickupCityName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffAirportCode"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffCityName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffCityId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"dropoffRegionName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"providerName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"providerCurrency"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"price"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"airlineName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"brandName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"starRating"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"agencyName"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"carClass"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"userValuationScore"
    },{
      "function":"__remm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",21],
      "vtp_fullMatch":true,
      "vtp_replaceAfterMatch":true,
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","^hotel$","value",["macro",137]],["map","key","^flight$","value",["macro",20]],["map","key","^car$","value",["macro",139]],["map","key","^packagetour$","value",["macro",137]]]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",26],8,16],")return ",["escape",["macro",49],8,16],".deltaDays(new Date,",["escape",["macro",27],8,16],")})();"]
    },{
      "function":"__k",
      "vtp_decodeCookie":true,
      "vtp_name":"web-session-id"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",26],8,16],"\u0026\u0026\"undefined\"!==typeof ",["escape",["macro",29],8,16],")return ",["escape",["macro",49],8,16],".deltaDays(",["escape",["macro",27],8,16],",",["escape",["macro",30],8,16],")})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",26],8,16],"\u0026\u0026\"undefined\"!==typeof ",["escape",["macro",29],8,16],"){for(var c=\"saturday\",d=new Date(",["escape",["macro",26],8,16],"),e=",["escape",["macro",49],8,16],".deltaDays(",["escape",["macro",26],8,16],",",["escape",["macro",29],8,16],"),a=0;a\u003Ce;a++){var b=new Date(d);b.setDate(b.getDate()+a);if(",["escape",["macro",49],8,16],".dayString(b)===c)return!0}return!1}})();"]
    },{
      "function":"__remm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",34],
      "vtp_fullMatch":false,
      "vtp_replaceAfterMatch":false,
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","swoodoo","value","JEhFfvZAL8v6jtMh"],["map","key","momondo","value","S3OOzGcx30mYbNx7"],["map","key","checkfelix","value","oukTrCVobIVYofgc"],["map","key","cheapflights","value","M2gjrdEj51wQucty"],["map","key","kayak","value","2ejGFw3SwjWkcVhh"],["map","key","mundi","value","1O8WhKQEeMbsfkSo"]]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a){try{return value=sessionStorage.getItem(a)}catch(b){return ",["escape",["macro",39],8,16],"(\"warn\",\"Unable to write to session storage - switching to cookie mode\"),",["escape",["macro",83],8,16],"(a)}}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a,b){try{return sessionStorage.setItem(a,b),!0}catch(c){return ",["escape",["macro",39],8,16],"(\"warn\",\"Unable to write to session storage - switching to cookie mode\"),",["escape",["macro",82],8,16],"(a,b),!1}}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"legs"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"creditCardType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"tripType"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"undefined\"!==typeof ",["escape",["macro",10],8,16],")return ",["escape",["macro",10],8,16],";if(\"undefined\"!==typeof ",["escape",["macro",14],8,16],")return ",["escape",["macro",14],8,16],"})();"]
    },{
      "function":"__e"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(typeof ",["escape",["macro",97],8,16],"===\"undefined\"||\"",["escape",["macro",87],7],"\"===\"false\")return null;if(\"",["escape",["macro",153],7],"\"!==\"r9\"){var currentState=",["escape",["macro",147],8,16],"(\"s_start_",["escape",["macro",97],7],"\");",["escape",["macro",148],8,16],"(\"s_start_",["escape",["macro",97],7],"\",currentState);return currentState}var sessionStarted=",["escape",["macro",147],8,16],"(\"s_start_",["escape",["macro",97],7],"\");if(sessionStarted===\"true\")return true;else{",["escape",["macro",148],8,16],"(\"s_start_",["escape",["macro",97],7],"\",\"true\");return false}})();"]
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__f",
      "vtp_component":"URL"
    }],
  "tags":[{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":51
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"988306736",
      "vtp_currencyCode":"USD",
      "vtp_conversionLabel":"rpqeCP-G9FwQsLqh1wM",
      "vtp_url":["macro",90],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":64
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_enableDynamicRemarketing":false,
      "vtp_conversionId":"1020073729",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",90],
      "tag_id":83
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_enableDynamicRemarketing":false,
      "vtp_conversionId":"1065776473",
      "vtp_customParamsFormat":"NONE",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",90],
      "tag_id":95
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":101
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1041444473",
      "vtp_conversionLabel":"AFJJCK7xo4UBEPnczPAD",
      "vtp_url":["macro",90],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":103
    },{
      "function":"__bzi",
      "once_per_event":true,
      "vtp_id":"386706",
      "tag_id":104
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_enableDynamicRemarketing":false,
      "vtp_dataLayerVariable":["macro",94],
      "vtp_conversionId":["macro",93],
      "vtp_customParamsFormat":"DATA_LAYER",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",90],
      "tag_id":108
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":109
    },{
      "function":"__gclidw",
      "once_per_event":true,
      "vtp_enableCrossDomain":true,
      "vtp_acceptIncoming":true,
      "vtp_linkerDomains":["macro",61],
      "vtp_enableCookieOverrides":false,
      "vtp_formDecoration":false,
      "vtp_urlPosition":"query",
      "vtp_enableCrossDomainFeature":true,
      "vtp_enableCookieUpdateFeature":false,
      "tag_id":115
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":123
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":124
    },{
      "function":"__flc",
      "once_per_event":true,
      "vtp_customVariable":["list",["map","key","u12","value",["macro",97]],["map","key","u13","value",["macro",57]],["map","key","u16","value",["macro",36]],["map","key","u27","value",["macro",59]]],
      "vtp_enableConversionLinker":true,
      "vtp_groupTag":"visit0",
      "vtp_useImageTag":false,
      "vtp_activityTag":["macro",96],
      "vtp_ordinalType":"STANDARD",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_advertiserId":"5142311",
      "vtp_ordinalStandard":["macro",98],
      "vtp_url":["macro",90],
      "vtp_enableGoogleAttributionOptions":false,
      "vtp_showConversionLinkingControls":true,
      "tag_id":128
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":134
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":136
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"1053534539",
      "vtp_currencyCode":"USD",
      "vtp_conversionLabel":"uQVSCMvL2ZMBEMvSrvYD",
      "vtp_url":["macro",90],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":148
    },{
      "function":"__awct",
      "once_per_event":true,
      "vtp_enableConversionLinker":true,
      "vtp_conversionValue":"0",
      "vtp_conversionCookiePrefix":"_gcl",
      "vtp_conversionId":"833727979",
      "vtp_currencyCode":"USD",
      "vtp_conversionLabel":"f7SUCM3E2ZMBEOvbxo0D",
      "vtp_url":["macro",90],
      "vtp_enableProductReportingCheckbox":false,
      "vtp_enableNewCustomerReportingCheckbox":false,
      "vtp_enableEnhancedConversionsCheckbox":false,
      "tag_id":149
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":155
    },{
      "function":"__baut",
      "once_per_event":true,
      "vtp_tagId":"34000000",
      "vtp_uetqName":"uetq",
      "vtp_eventType":"PAGE_LOAD",
      "tag_id":167
    },{
      "function":"__img",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_useCacheBuster":true,
      "vtp_url":["template","https:\/\/pixel.travelsupermarket.com\/global\/tracking\/v1\/flights\/event.gif?sourceCode=",["escape",["macro",100],12],"\u0026ppcId=",["escape",["macro",101],12],"\u0026departureIATA=",["escape",["macro",41],12],"\u0026arrivalIATA=",["escape",["macro",42],12],"\u0026deviceType=",["escape",["macro",91],12]],
      "vtp_cacheBusterQueryParam":"gtmcb",
      "vtp_randomNumber":["macro",98],
      "tag_id":170
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var event=\"",["escape",["macro",54],7],"\";var screenId=\"",["escape",["macro",55],7],"\";var vertical=\"",["escape",["macro",22],7],"\";var activeVerticals=[\"flight\",\"hotel\",\"car\",\"package\"];if(activeVerticals.indexOf(vertical)===-1)return;var params={};params.locale=\"",["escape",["macro",36],7],"\";var url=\"https:\/\/fdz.flashtalking.com\"+\"\/services\/kayak\/FBI565_retargeting\/segment.php?\"+Object.keys(params).map(function(key){return encodeURIComponent(key)+\"\\x3d\"+encodeURIComponent(params[key])}).join(\"\\x26\");var image=new Image;\nimage.src=url})();\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":3
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var b=",["escape",["macro",48],8,16],"({incrementionDelimiter:\"@\",storageKey:\"CHINESE_AN\"}),a={car:\"FLIGHT\",flight:\"FLIGHT\",hotel:\"HOTEL\",packagetour:\"PACKAGE\"};if(a=a.",["escape",["macro",22],7],"){var c=new Image;c.src=\"\/\/www.chinesean.com\/affiliate\/tracking.do?pId\\x3d13391\\x26tracking\\x3d\"+b+\"\\x26cpa\\x3d\"+a+\"\\x26cpl\\x3d\\x26cps\\x3d\"}})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":8
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var idSite=function(){switch(\"",["escape",["macro",34],7],"\"){case \"mundi\":return\"705\";default:return\"501\"}}();var idGoal=function(){switch(\"",["escape",["macro",34],7],"\"){case \"mundi\":return\"2\";default:return\"8\"}}();var currentURL=window.location.protocol+\"\/\/\"+\"",["escape",["macro",78],7],"\";var referrerHost=\"",["escape",["macro",77],7],"\";var presentation=typeof ",["escape",["macro",91],8,16],"===\"undefined\"?\"web\":\"",["escape",["macro",91],7],"\";var axel=Math.random()+\"\";var rand=parseInt(axel*1E13);var customVariables=function(){var content=\n{1:[\"searchid\",\"",["escape",["macro",47],7],"\"],2:[\"presentation\",presentation]};return JSON.stringify(content)}();if(",["escape",["macro",80],8,16],"(\"spoteffects\")){",["escape",["macro",39],8,16],"(\"log\",\"spotteffects base event\",[\"idsite\\x3d\"+idSite,\"rec\\x3d1\",\"url\\x3d\"+currentURL,\"urlref\\x3d\"+referrerHost,\"uid\\x3d",["escape",["macro",57],7],"\",\"_cvar\\x3d\"+customVariables,\"r\\x3d\"+rand]);",["escape",["macro",39],8,16],"(\"log\",\"spotteffects goal event\",[\"idsite\\x3d\"+idSite,\"idgoal\\x3d\"+idGoal,\"rec\\x3d1\",\"url\\x3d\"+currentURL,\"urlref\\x3d\"+referrerHost,\n\"cookie\\x3d0\",\"uid\\x3d",["escape",["macro",57],7],"\",\"_cvar\\x3d\"+customVariables,\"r\\x3d\"+rand])}",["escape",["macro",60],8,16],"(\"https:\/\/webanalytics.btelligent.net\/analytics\/piwik.php\",[\"idsite\\x3d\"+idSite,\"rec\\x3d1\",\"url\\x3d\"+currentURL,\"urlref\\x3d\"+referrerHost,\"uid\\x3d",["escape",["macro",57],7],"\",\"_cvar\\x3d\"+customVariables,\"r\\x3d\"+rand],true);",["escape",["macro",60],8,16],"(\"https:\/\/trck.spoteffects.net\/analytics\/piwik.php\",[\"idsite\\x3d\"+idSite,\"idgoal\\x3d\"+idGoal,\"rec\\x3d1\",\"url\\x3d\"+currentURL,\"urlref\\x3d\"+referrerHost,\n\"cookie\\x3d0\",\"uid\\x3d",["escape",["macro",57],7],"\",\"_cvar\\x3d\"+customVariables,\"r\\x3d\"+rand],true)})();\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":11
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=document.createElement(\"script\"),b=document.getElementsByTagName(\"script\")[0];a.async=!0;a.src=\"\/\/s.yjtag.jp\/tag.js#site\\x3dYwGEwU2\";b.parentNode.insertBefore(a,b)})();\u003C\/script\u003E\n\n\u003Cnoscript\u003E\n  \u003Ciframe src=\"\/\/b.yjtag.jp\/iframe?c=YwGEwU2\" width=\"1\" height=\"1\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\"\u003E\u003C\/iframe\u003E\n\u0026lt;\/noscript",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":21
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=new Image;a.src=\"https:\/\/vk.com\/rtrg?p\\x3dVK-RTRG-120150-cPHjI\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":22
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var eventType=function(){if(typeof ",["escape",["macro",55],8,16],"!==\"undefined\")return\"",["escape",["macro",55],7],"\".toLowerCase()===\"frontdoor\"?\"remarketing\":\"conversion\";else return undefined}();if(typeof eventType===\"undefined\"){",["escape",["macro",39],8,16],"(\"error\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: No pageID present, unable to proceed\");return}var pixelSources=[{type:\"conversion\",id:1000994957,label:\"hnRuCMmu74ABEJCL9IID\"},{type:\"conversion\",id:1000408664,label:\"NugYCOrL33cQ1bDnnAM\"},\n{type:\"conversion\",id:1000411070,label:\"UiM_CMKawXkQrvjmnAM\"},{type:\"conversion\",id:1001009375,label:\"SEiICNztjYwBEICRq_0C\"},{type:\"conversion\",id:1001009607,label:\"SKtsCJrdhYwBEP2Qq_0C\"},{type:\"conversion\",id:1001009377,label:\"wXorCNT3jYwBEPvcqf0C\"},{type:\"conversion\",id:1001009605,label:\"xh8OCOn6jYwBEMeNq_0C\"},{type:\"conversion\",id:1001009608,label:\"xiA6CKrqhYwBEIrmqv0C\"},{type:\"conversion\",id:1001009376,label:\"xmN6CO78jYwBENbnqv0C\"}];function loadTag(sourceNum){if(sourceNum+1\u003EpixelSources.length){",["escape",["macro",39],8,16],"(\"log\",\n\"Unified Yahoo Japan - Conversion and Remarketing Pixels: sources exhausted\");return}",["escape",["macro",39],8,16],"(\"log\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: processing sourceNum: \"+sourceNum,pixelSources[sourceNum]);",["escape",["macro",39],8,16],"(\"log\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: EventType: \"+eventType);if(\"id\"in pixelSources[sourceNum]\u0026\u0026\"type\"in pixelSources[sourceNum]){if(eventType!==pixelSources[sourceNum].type){console.log(\"eventType \"+eventType+\" vs \"+pixelSources[sourceNum].type);\n",["escape",["macro",39],8,16],"(\"warn\",'Unified Yahoo Japan - Conversion and Remarketing Pixels: skipped tag \"'+sourceNum+'\"because of event mismatch (OK)');loadTag(sourceNum+1);return}switch(pixelSources[sourceNum].type){case \"conversion\":window.yahoo_conversion_value=1;window.yahoo_conversion_id=pixelSources[sourceNum].id;window.yahoo_conversion_label=pixelSources[sourceNum].label;window.yahoo_ss_retargeting_id=undefined;window.yahoo_sstag_custom_params=undefined;window.yahoo_ss_retargeting=undefined;window.yahoo_conversion_label=\nundefined;break;case \"remarketing\":window.yahoo_ss_retargeting_id=pixelSources[sourceNum].id;window.yahoo_sstag_custom_params=window.yahoo_sstag_params;window.yahoo_ss_retargeting=true;window.yahoo_conversion_id=undefined;window.yahoo_conversion_value=undefined;window.yahoo_conversion_label=undefined;break;default:",["escape",["macro",39],8,16],"(\"error\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: Incorrect type given for pixelSource: \"+pixelSources[sourceNum].type);return}",["escape",["macro",40],8,16],"(\"https:\/\/s.yimg.jp\/images\/listing\/tool\/cv\/conversion.js\",\nfunction(){",["escape",["macro",39],8,16],"(\"log\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: loaded tag #\"+sourceNum);loadTag(sourceNum+1)})}else ",["escape",["macro",39],8,16],"(\"error\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: Missing type or ID for pixelSource\")}",["escape",["macro",40],8,16],"(\"https:\/\/s.yimg.jp\/images\/listing\/tool\/cv\/conversion.js\",function(){",["escape",["macro",39],8,16],"(\"log\",\"Unified Yahoo Japan - Conversion and Remarketing Pixels: preloaded script\");loadTag(0)})})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":24
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var id=function(){if(\"",["escape",["macro",34],7],"\".match(\/momondo\/))return\"8973832\";if(\"",["escape",["macro",34],7],"\".match(\/kayak\/))return\"16685854\";return null}();if(id==null){",["escape",["macro",39],8,16],"(\"error\",\"No Yandex ID found\");return}var src=\"https:\/\/mc.yandex.ru\/watch\/\"+id;var url=function(){var base=\"",["escape",["macro",78],7],"\/\";if(\"",["escape",["macro",54],7],"\"===\"screenView\"\u0026\u0026\"",["escape",["macro",55],7],"\"===\"results\")base+=\"search\/\";else if(\"",["escape",["macro",54],7],"\"===\"clickOut\"\u0026\u0026\"",["escape",["macro",55],7],"\"===\"results\")base+=\n\"clickout\/\";return base}();var args=[\"url\\x3d\"+url];",["escape",["macro",60],8,16],"(src,args,true)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":25
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=new Image;a.src=\"https:\/\/srv.stackadapt.com\/rt?sid\\x3dVXQoSszalsZwraIZMKGVMQ\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":49
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=new Image;a.src=\"https:\/\/srv.stackadapt.com\/conv?cid\\x3d4a5badez6ED3d_TJ27z6Ug\"})();\u003C\/script\u003E\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":50
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=new Image;a.src=\"\/\/bat.bing.com\/action\/0?ti\\x3d5625892\\x26Ver\\x3d2\\x26ec\\x3dSearch\\x26ea\\x3dPageLoad\\x26el\\x3dResults\\x26ev\\x3d1\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":60
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=new Image;a.src=\"\/\/bat.bing.com\/action\/0?ti\\x3d5625892\\x26Ver\\x3d2\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":61
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=[\"4030466\",\"5117764\"];a.forEach(function(b){var a=new Image;a.src=\"results\"===",["escape",["macro",55],8,16],"?\"\/\/bat.bing.com\/action\/0?ti\\x3d\"+b+\"\\x26Ver\\x3d2\\x26ec\\x3dSearch\\x26ea\\x3dPageLoad\\x26el\\x3dResults\\x26ev\\x3d1\":\"\/\/bat.bing.com\/action\/0?ti\\x3d\"+b+\"\\x26Ver\\x3d2\"})})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":62
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar image=new Image;image.src=\"https:\/\/www.kayak.com\/s\/kayakpixel\/impression?creativeData\\x3dCookieMap\\x26size\\x3d1\\x26rand\\x3d\"+(Math.floor(9999999*Math.random())+1)+\"\\x26metadata\\x3d",["escape",["macro",97],7],"\";\u003C\/script\u003E "],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":76
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var id=",["escape",["macro",102],8,16],";var ids=Array.isArray(id)?id:[id];ids.forEach(function(id){var eventName=getEventName();var params=",["escape",["macro",22],8,16],"===\"main\"?getEventParameters(\"flight\",eventName):getEventParameters(",["escape",["macro",22],8,16],",eventName);var image=new Image;image.referrerPolicy=\"no-referrer\";image.src=\"https:\/\/www.facebook.com\/tr\/\"+\"?id\\x3d\"+id+\"\\x26ev\\x3d\"+encodeURIComponent(eventName)+(getEventId()!=null?\"\\x26eid\\x3d\"+encodeURIComponent(getEventId()):\"\")+\"\\x26ud[external_id]\\x3d\"+\nencodeURIComponent(",["escape",["macro",103],8,16],")+(typeof ",["escape",["macro",84],8,16],"!==\"undefined\"?\"\\x26ud[fbc]\\x3d",["escape",["macro",84],7],"\":\"\")+\"\\x26\"+generateUrlPairsForParams(params)});if(getCustomEventName()!==null)ids.forEach(function(id){var customEventName=getCustomEventName();var params=getEventParameters(",["escape",["macro",22],8,16],",customEventName);var image=new Image;image.referrerPolicy=\"no-referrer\";image.src=\"https:\/\/www.facebook.com\/tr\/\"+\"?id\\x3d\"+id+\"\\x26ev\\x3d\"+encodeURIComponent(customEventName)+(getEventId()!=\nnull?\"\\x26eid\\x3d\"+encodeURIComponent(getEventId()):\"\")+\"\\x26ud[external_id]\\x3d\"+encodeURIComponent(",["escape",["macro",103],8,16],")+(typeof ",["escape",["macro",84],8,16],"!==\"undefined\"?\"\\x26ud[fbc]\\x3d",["escape",["macro",84],7],"\":\"\")+\"\\x26\"+generateUrlPairsForParams(params)});function getEventParameters(vertical,eventName){var params={};setUniversalParams(params);setLiftTestParams(params);switch(vertical){case \"flight\":setFlightParams(eventName,params);break;case \"hotel\":setHotelParams(eventName,params);break;case \"car\":setCarParams(eventName,\nparams);break;case \"packagetour\":setPackageParams(eventName,params);break}return params}function getEventName(){if(",["escape",["macro",54],8,16],"===\"expandDetails\")return\"ViewContent\";else if(",["escape",["macro",54],8,16],"===\"resultsLoaded\")return\"SearchCompleted\";else if(",["escape",["macro",55],8,16],"===\"results\"\u0026\u0026",["escape",["macro",54],8,16],"===\"screenView\"||",["escape",["macro",54],8,16],"===\"cfFindDeals\")return\"Search\";else if(",["escape",["macro",54],8,16],"===\"clickOut\")return\"InitiateCheckout\";else if(",["escape",["macro",55],8,16],"===\"confirmation\"||\n",["escape",["macro",54],8,16],"==\"cfViewDeal\")return\"Purchase\";else return\"PageView\"}function getCustomEventName(){if(",["escape",["macro",21],8,16],"===\"blog\"||",["escape",["macro",21],8,16],"===\"magazine\")return\"AddToWishlist\";return null}function getEventId(){var eventId=null;switch(getEventName()){case \"Search\":eventId=\"",["escape",["macro",47],7],"\";break;case \"ViewContent\":eventId=\"",["escape",["macro",47],7],["escape",["macro",104],7],"-details\";break;case \"InitiateCheckout\":eventId=\"",["escape",["macro",47],7],["escape",["macro",104],7],"-click\";break;\ncase \"Purchase\":eventId=\"",["escape",["macro",47],7],["escape",["macro",104],7],"-whisky\";break;default:eventId=null}var isSwoodoo=",["escape",["macro",102],8,16],"==\"143839513144905\";var isMundi=",["escape",["macro",102],8,16],"==\"189563405032048\";var isCheapflights=",["escape",["macro",102],8,16],"==\"1753019971445860\"\u0026\u0026",["escape",["macro",44],8,16],"!=\"US\";if(isSwoodoo){",["escape",["macro",39],8,16],"(\"log\",\"Facebook Unified\",\"Sending eid for Swoodoo case\");return eventId}if(",["escape",["macro",22],8,16],"==\"flight\"\u0026\u0026(isMundi||isCheapflights)){",["escape",["macro",39],8,16],"(\"log\",\n\"Facebook Unified\",\"Sending eid for Mundi or Cheapflights Flight case\");return eventId}}function setUniversalParams(params){var searchId=",["escape",["macro",47],8,16],";if(typeof searchId!==\"undefined\")params.order_id=",["escape",["macro",47],8,16],";params.is_logged_in=\"",["escape",["macro",105],7],"\";if(typeof ",["escape",["macro",57],8,16],"!==\"undefined\"){params.obfuscatedSessionId=",["escape",["macro",57],8,16],";params.hashedUserId=",["escape",["macro",57],8,16],";params.hashedSessionId=",["escape",["macro",58],8,16],"}else params.obfuscatedSessionId=",["escape",["macro",58],8,16],";\nparams.obfuscatedTrackingCookie=",["escape",["macro",97],8,16],";params.event_time=(new Date).getTime();params.locale=",["escape",["macro",36],8,16],";params.referrer=\"",["escape",["macro",51],7],"\";params.currency=",["escape",["macro",106],8,16],";params.placement=",["escape",["macro",107],8,16],";params.brand=",["escape",["macro",34],8,16],";params.placement=",["escape",["macro",107],8,16],"}function setLiftTestParams(params){var liftTestBucket=[];if(typeof ",["escape",["macro",50],8,16],"!==\"undefined\")for(var key in ",["escape",["macro",50],8,16],"){if(key===\"74ac32833f\")liftTestBucket.push(\"lift-test-1\");\nif(key===\"b51f7d7d6b\")liftTestBucket.push(\"lift-test-2\");if(key===\"aceb27e931\")liftTestBucket.push(\"lift-test-3\");if(key===\"f2509541b5\")liftTestBucket.push(\"lift-test-4\");if(key.match(\/^lift-test-\\d+$\/))liftTestBucket.push(key)}if(liftTestBucket.length\u003E0)params.liftTestBucket=liftTestBucket}function setFlightParams(eventName,params){}function setHotelParams(eventName,params){}function setCarParams(eventName,params){}function setPackageParams(eventName,params){}function generateUrlPairsForParams(params){var pairs=\n[];Object.keys(params).forEach(function(name){var value=params[name];if(typeof value!==\"undefined\"\u0026\u0026value!==null\u0026\u0026value.toString().length\u003E0){if(typeof value!==\"string\"\u0026\u0026typeof value!==\"number\")value=JSON.stringify(value);pairs.push(\"cd[\"+encodeURIComponent(name)+\"]\\x3d\"+encodeURIComponent(value))}});return pairs.join(\"\\x26\")}})();\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":80
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" async\u003E(function(){function d(a){var c=\"; \"+document.cookie;a=c.split(\"; \"+a+\"\\x3d\");if(2==a.length)return a.pop().split(\";\").shift()}var b=function(){for(var a,c=3,b=document.createElement(\"div\"),d=b.getElementsByTagName(\"i\");b.innerHTML=\"\\x3c!--[if gt IE \"+ ++c+\"]\\x3e\\x3ci\\x3e\\x3c\/i\\x3e\\x3c![endif]--\\x3e\",d[0];);return 4\u003Cc?c:a}();b=9\u003E=b?new XDomainRequest:new XMLHttpRequest;var e=d(\"web-session-id\"),a=[];a.push(\"noUrl\\x3d1\");a.push(\"encoder\\x3d27_1\");a.push(\"enc_pid\\x3dwhitelabel\");a.push(\"enc_eid\\x3d0\");\na.push(\"utm_source\\x3dtravelsupermarket\");a.push(\"utm_medium\\x3daffiliate\");a.push(\"utm_term\\x3drev\");a.push(\"utm_campaign\\x3dwhitelabel\");a.push(\"enc_cid\\x3d\"+e);a.push(\"a\\x3d",["escape",["macro",34],7],"\");b.open(\"POST\",\"\/in?\"+a.join(\"\\x26\"),!0);b.send(\"\");console.log(\"TSM params\",a)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":81
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Efunction isIframe(){try{return window.self!==window.top}catch(a){return!0}}function newNodesHandler(a){a.target\u0026\u0026\"IFRAME\"==a.target.tagName\u0026\u0026\"about:blank\"==a.target.src\u0026\u0026(a.target.style.height=\"100%\",document.removeEventListener(\"DOMNodeInserted\",newNodesHandler))}\nif(isIframe()){var outerWidget=window.parent.document.getElementsByClassName(\"Common-Widgets-Dialog-Dialog\");0\u003CouterWidget.length\u0026\u0026(outerWidget[0].style.display=\"block\");var outer=window.parent.document.getElementsByClassName(\"r9GTMFrame\")[0];outer||(outer=window.parent.document.getElementById(\"r9-tracking-unified\")?window.parent.document.getElementById(\"r9-tracking-unified\"):window.parent.document.getElementsByClassName(\"r9_gtm_frame\")[0],outer.height=\"35%\",outer.style.height=\"35%\",outer.style.position=\n\"fixed\",outer.style.bottom=0);\"undefined\"!==typeof outer\u0026\u0026(outer.style.zIndex=\"99998\",outer.style.width=\"100%\",outer.style.left=0,outer.style.visibility=\"visible\",outer.style.display=\"inline\",outer.style.top=\"auto\");var gtm=window.parent.document.getElementsByClassName(\"r9GTMFrame\\u2013unified\")[0];gtm||window.parent.document.getElementsByClassName(\"r9GTMFrame\\u2013-unified\")[0];gtm\u0026\u0026(gtm.style.width=\"100%\",gtm.style.height=\"35%\",gtm.style.left=0,gtm.style.visibility=\"visible\",gtm.style.display=\"inline\",\ngtm.style.zIndex=\"99999\",gtm.style.borderWidth=\"5px 0px 0px\",gtm.style.borderTopStyle=\"solid\",gtm.style.borderTopColor=\"rgb(204, 204, 204)\");document.addEventListener(\"DOMNodeInserted\",newNodesHandler)};\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":93
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=\"\/\/trc.taboola.com\/",["escape",["macro",81],7],"\/log\/3\/unip?en\\x3daction\",b=[];",["escape",["macro",60],8,16],"(a,b)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":94
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var img=new Image;var searchReference=",["escape",["macro",48],8,16],"({\"incrementionDelimiter\":\"@\",\"storageKey\":\"OPTIMISE_AFFILIATE_NETWORK_PROGRAMME\"});var domesticOrInternational=function(){switch(",["escape",["macro",22],8,16],"){case \"flight\":if(\"",["escape",["macro",68],7],"\".toLowerCase()===\"in\"\u0026\u0026\"",["escape",["macro",18],7],"\".toLowerCase()===\"in\")return\"domestic\";else return\"international\";case \"hotel\":return\"",["escape",["macro",18],7],"\".toLowerCase()===\"in\"?\"domestic\":\"international\";default:",["escape",["macro",39],8,16],"(\"error\",\n\"Optimise affiliate network programme\",\"Unable to determine vertical\")}}();img.src=\"https:\/\/track.in.omgpm.com\/e\/si\/\"+\"?APPID\\x3d\"+searchReference+\"\\x26MID\\x3d1368869\"+\"\\x26PID\\x3d33349\"+\"\\x26Status\\x3d\"+\"\\x26EX1\\x3d\"+(",["escape",["macro",91],8,16],"===\"mweb\"?\"mobile\":\"web\")+\"\\x26EX2\\x3d\"+domesticOrInternational})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":110
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var rand=Math.random().toString(36).substring(2);var _locale=\"",["escape",["macro",36],7],"\".toLowerCase().replace(\"_\",\"-\");var img=new Image;img.src=\"https:\/\/www.booking.com\/pxpixel.html\"+\"?partner\\x3dkayak\"+\"\\x26product\\x3dflights\"+\"\\x26type\\x3dsearch\"+\"\\x26page\\x3dsearch_results\"+\"\\x26origin_airport\\x3d",["escape",["macro",41],7],"\"+\"\\x26destination_airport\\x3d",["escape",["macro",42],7],"\"+\"\\x26num_adults\\x3d",["escape",["macro",108],7],"\"+\"\\x26num_children\\x3d",["escape",["macro",109],7],"\"+\"\\x26checkin_date\\x3d",["escape",["macro",27],7],"\"+\n\"\\x26checkout_date\\x3d",["escape",["macro",30],7],"\"+\"\\x26currency\\x3d",["escape",["macro",106],7],"\"+\"\\x26origin_city\\x3d",["escape",["macro",110],7],"\"+\"\\x26destination_city\\x3d",["escape",["macro",3],7],"\"+\"\\x26travel_class\\x3d",["escape",["macro",20],7],"\"+\"\\x26lang\\x3d\"+_locale+\"\\x26r\\x3d\"+rand})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":113
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Eif(\"",["escape",["macro",55],7],"\".toLowerCase()===\"frontdoor\")",["escape",["macro",60],8,16],"(\"\/\/s.amazon-adsystem.com\/iui3\",[\"d\\x3dforester-did\",\"ex-fargs\\x3d%3Fid%3D22761370-53f1-dd8d-0872-fdd94fa0bf75%26type%3D55%26m%3D1\",\"ex-fch\\x3d416613\",\"ex-src\\x3dkayak.com\",\"ex-hargs\\x3dv%3D1.0%3Bc%3D3164205193067%3Bp%3D22761370-53F1-DD8D-0872-FDD94FA0BF75\"]);\nif(\"",["escape",["macro",55],7],"\".toLowerCase()===\"results\")",["escape",["macro",60],8,16],"(\"\/\/s.amazon-adsystem.com\/iui3\",[\"d\\x3dforester-did\",\"ex-fargs\\x3d%3Fid%3D78527f92-75e9-67d6-cbb9-d48aed5c38d1%26type%3D54%26m%3D1\",\"ex-fch\\x3d416613\",\"ex-src\\x3dkayak.com\",\"ex-hargs\\x3dv%3D1.0%3Bc%3D3164205193067%3Bp%3D78527F92-75E9-67D6-CBB9-D48AED5C38D1\"]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":114
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=\"18000076\",b=new Image;b.src=\"\/\/bat.bing.com\/action\/0?ti\\x3d\"+a+\"\\x26Ver\\x3d2\\x26ec\\x3dSearch\\x26ea\\x3dPageLoad\\x26el\\x3dResults\\x26ev\\x3d1\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":117
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=\"15000871\",b=new Image;b.src=\"\/\/bat.bing.com\/action\/0?ti\\x3d\"+a+\"\\x26Ver\\x3d2\\x26ec\\x3dSearch\\x26ea\\x3dPageLoad\\x26el\\x3dResults\\x26ev\\x3d1\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":118
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/tag.yieldoptimizer.com\/ps\/ps?t=s\u0026amp;p=5658\u0026amp;u=",["escape",["macro",97],12],"\"\u003E\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":119
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/wcs.naver.net\/wcslog.js\"\u003E\u003C\/script\u003E \n\u003Cscript type=\"text\/gtmscript\"\u003Evar _nasa={};_nasa.cnv=wcs.cnv(\"5\",\"1\");\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Eif(!wcs_add)var wcs_add={};wcs_add.wa=\"s_49cd757dae65\";if(!_nasa)var _nasa={};wcs.inflow();wcs_do(_nasa);\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":132
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var c=\"https:\/\/t.teads.tv\/track\",b=\"",["escape",["macro",44],7],"\",a=function(){switch(",["escape",["macro",55],8,16],"){case \"results\":if(\"screenView\"===",["escape",["macro",54],8,16],")return\"KayakPixelTrueVisits\"+b+\"octubre2018Search\";if(\"clickOut\"===",["escape",["macro",54],8,16],")return\"KayakPixelTrueVisits\"+b+\"octubre2018ClickOut\";break;case \"frontdoor\":return\"KayakPixelTrueVisits\"+b+\"octubre2018Home\";default:",["escape",["macro",39],8,16],"(\"warn\",\"Teads Conversion for LATAM\",\"No conversion type found\")}};\"undefined\"!==typeof a()\u0026\u0026\n(a=[\"action\\x3dconversion\",\"conversion_type\\x3d\"+a(),\"advertiser_id\\x3d19261\"],",["escape",["macro",60],8,16],"(c,a))})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":137
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"application\/javascript\"\u003E(function(){var b={u1:",["escape",["macro",51],8,16],",u2:",["escape",["macro",36],8,16],",u3:",["escape",["macro",57],8,16],",u4:",["escape",["macro",58],8,16],",u5:",["escape",["macro",47],8,16],",u6:",["escape",["macro",106],8,16],"},a=\"\";switch(",["escape",["macro",21],8,16],"){case \"main\":if(\"frontdoor\"===",["escape",["macro",55],8,16],")switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99050\";break;case \"CA\":a=\"99070\"}break;case \"flight\":switch(",["escape",["macro",55],8,16],"){case \"frontdoor\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99051\";break;case \"CA\":a=\"99071\"}break;case \"results\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\n\"99055\";break;case \"CA\":a=\"99075\"}break;case \"landing\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99059\";break;case \"CA\":a=\"99079\"}break;case \"confirmation\":a=\"99067\"}break;case \"hotel\":switch(",["escape",["macro",55],8,16],"){case \"frontdoor\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99052\";break;case \"CA\":a=\"99072\"}break;case \"results\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99056\";break;case \"CA\":a=\"99076\"}break;case \"landing\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99060\";break;case \"CA\":a=\"99080\"}break;\ncase \"confirmation\":a=\"99068\"}break;case \"car\":switch(",["escape",["macro",55],8,16],"){case \"frontdoor\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99053\";break;case \"CA\":a=\"99073\"}break;case \"results\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99057\";break;case \"CA\":a=\"99077\"}break;case \"landing\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99061\";break;case \"CA\":a=\"99081\"}break;case \"confirmation\":a=\"99069\"}break;case \"packagetour\":switch(",["escape",["macro",55],8,16],"){case \"frontdoor\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\n\"99054\";break;case \"CA\":a=\"99074\"}break;case \"results\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99058\";break;case \"CA\":a=\"99078\"}break;case \"landing\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99062\";break;case \"CA\":a=\"99082\"}}break;case \"explore\":switch(",["escape",["macro",44],8,16],"){case \"US\":a=\"99063\";break;case \"CA\":a=\"99083\"}break;case \"blog\":a=\"99064\";break;case \"marketing\":\"travelHacker\"===",["escape",["macro",111],8,16],"\u0026\u0026(a=-1!==",["escape",["macro",112],8,16],".indexOf(\"holidaytravelhacker\")?\"99066\":\"99065\")}var c=\n\"\",d=1;for(key in b)\"undefined\"!==typeof b[key]\u0026\u0026(c+=\"\\x26U\"+d+\"\\x3d\"+b[key]),d++;b=\"https:\/\/servedby.flashtalking.com\/container\/11022;\"+a+\";10308;iframe\/?ftXCurrency\\x3d",["escape",["macro",106],7],"\";a=1E6*Math.random();a=\"\\x26cachebuster\\x3d\"+a;document.write('\\x3ciframe style\\x3d\"position:absolute; visibility:hidden; width:1px; height:1px;\" src\\x3d\"'+b+c+a+'\"\\x3e\\x3c\/iframe\\x3e')})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":true,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "vtp_usePostscribe":true,
      "tag_id":139
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=\"https:\/\/sp.analytics.yahoo.com\/spp.pl\",b=[\"a\\x3d10000\",\".yp\\x3d10034868\",\"ec\\x3dkayaksearchers\"];",["escape",["macro",60],8,16],"(a,b)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":140
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var customAffiliate=\"",["escape",["macro",52],7],"\"==\"kayak\"?\"self\":\"ad\";var src=\"https:\/\/pt.ispot.tv\/v2\/TC-3455-3.gif\";var args=[\"cid\\x3d",["escape",["macro",58],7],"\",\"uid\\x3d",["escape",["macro",57],7],"\",\"refid\\x3d",["escape",["macro",47],7],"\",\"type\\x3dsearch\",\"app\\x3dweb\",\"customdata\\x3daffiliate_\"+customAffiliate];",["escape",["macro",60],8,16],"(src,args)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":141
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" async\u003E(function(){for(var b,a=3,c=document.createElement(\"div\"),d=c.getElementsByTagName(\"i\");c.innerHTML=\"\\x3c!--[if gt IE \"+ ++a+\"]\\x3e\\x3ci\\x3e\\x3c\/i\\x3e\\x3c![endif]--\\x3e\",d[0];);b=4\u003Ca?a:b;a=(new Date).toISOString();a={headers:{clientRequestTime:a,domain:document.location.hostname,client:{type:\"gtm\",windowSize:{width:window.innerWidth,height:window.innerHeight}}},events:[{eventType:\"view\",eventName:\"show\",payload:{},context:{viewCode:{vertical:",["escape",["macro",21],8,16],",pageType:",["escape",["macro",55],8,16],",subPageType:",["escape",["macro",111],8,16],"},\nlocation:{uri:document.location.pathname,queryString:encodeURIComponent(document.location.search),referrer:encodeURIComponent(document.referrer)}},timestamp:a}]};b=9\u003E=b?new XDomainRequest:new XMLHttpRequest;b.open(\"POST\",\"\/s\/vestigo\/v1\/measure\");b.setRequestHeader(\"Content-Type\",\"application\/json;charset\\x3dUTF-8\");b.send(JSON.stringify(a))})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":150
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" async\u003E(function(){var a=3;for(var b=document.createElement(\"div\"),d=b.getElementsByTagName(\"i\");b.innerHTML=\"\\x3c!--[if gt IE \"+ ++a+\"]\\x3e\\x3ci\\x3e\\x3c\/i\\x3e\\x3c![endif]--\\x3e\",d[0];);a=4\u003Ca?a:c;var c=[{eventType:\"e\",eventName:\"search\",payload:{searchType:\"",["escape",["macro",21],7],"\",searchId:",["escape",["macro",47],8,16],"},domain:document.location.hostname,uri:document.location.pathname,queryString:encodeURIComponent(document.location.search),referrer:encodeURIComponent(document.referrer),fullPageType:{vertical:",["escape",["macro",21],8,16],",\npageType:",["escape",["macro",55],8,16],",subPageType:",["escape",["macro",111],8,16],"},screenName:{vertical:",["escape",["macro",21],8,16],",pageType:",["escape",["macro",55],8,16],",subPageType:",["escape",["macro",111],8,16],"}}];a=9\u003E=a?new XDomainRequest:new XMLHttpRequest;a.open(\"POST\",\"\/s\/vestigo\/track\");a.setRequestHeader(\"Content-Type\",\"application\/json;charset\\x3dUTF-8\");a.send(JSON.stringify(c))})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":152
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\" async\u003E(function(){var a=3;for(var b=document.createElement(\"div\"),d=b.getElementsByTagName(\"i\");b.innerHTML=\"\\x3c!--[if gt IE \"+ ++a+\"]\\x3e\\x3ci\\x3e\\x3c\/i\\x3e\\x3c![endif]--\\x3e\",d[0];);a=4\u003Ca?a:c;var c=[{eventType:\"e\",eventName:\"clickout\",domain:document.location.hostname,uri:document.location.pathname,queryString:encodeURIComponent(document.location.search),referrer:encodeURIComponent(document.referrer),fullPageType:{vertical:",["escape",["macro",21],8,16],",pageType:",["escape",["macro",55],8,16],",subPageType:",["escape",["macro",111],8,16],"},\nscreenName:{vertical:",["escape",["macro",21],8,16],",pageType:",["escape",["macro",55],8,16],",subPageType:",["escape",["macro",111],8,16],"},payload:{clickType:",["escape",["macro",21],8,16],",clickId:\"N\/A\",searchId:",["escape",["macro",47],8,16],",resultId:",["escape",["macro",104],8,16],"}}];a=9\u003E=a?new XDomainRequest:new XMLHttpRequest;a.open(\"POST\",\"\/s\/vestigo\/track\");a.setRequestHeader(\"Content-Type\",\"application\/json;charset\\x3dUTF-8\");a.send(JSON.stringify(c))})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":153
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var c=\"https:\/\/www.kayak.com\/s\/kayakpixel\/providerevent\",a=\"\",b=!1,d=Math.floor(1E10*Math.random());switch(",["escape",["macro",54],8,16],"){case \"screenView\":\"frontdoor\"===",["escape",["macro",55],8,16],"\u0026\u0026(a=\"homepage\");break;case \"cfFindDeals\":a=\"search\";b=!0;break;case \"cfViewDeal\":a=\"checkout\",b=!0}!1===b?(a=[\"pagetype\\x3d\"+a,\"pid\\x3d555555\",\"userid\\x3d",["escape",["macro",57],7],"\",\"isloggedin\\x3d",["escape",["macro",105],7],"\",\"random\\x3d\"+d],",["escape",["macro",60],8,16],"(c,a,!0)):!0===b\u0026\u0026(a=[\"pagetype\\x3d\"+a,\"pid\\x3d555555\",\n\"userid\\x3d",["escape",["macro",57],7],"\",\"org_city\\x3d",["escape",["macro",110],7],"\",\"org_iata\\x3d",["escape",["macro",67],7],"\",\"org_region\\x3d",["escape",["macro",73],7],"\",\"org_country\\x3d",["escape",["macro",70],7],"\",\"dest_city\\x3d",["escape",["macro",1],7],"\",\"dest_iata\\x3d",["escape",["macro",42],7],"\",\"dest_region\\x3d",["escape",["macro",8],7],"\",\"dest_country\\x3d",["escape",["macro",18],7],"\",\"start_date\\x3d",["escape",["macro",28],7],"\",\"end_date\\x3d",["escape",["macro",31],7],"\",\"adults\\x3d",["escape",["macro",108],7],"\",\"children\\x3d",["escape",["macro",109],7],"\",\"product\\x3d",["escape",["macro",21],7],"\",\n\"traffic_source\\x3d",["escape",["macro",51],7],"\",\"random\\x3d\"+d],",["escape",["macro",60],8,16],"(c,a,!0))})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":158
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar src=\"https:\/\/ib.adnxs.com\/getuid\",args=[\"https:\/\/www.kayak.com\/s\/kayakpixel\/lgbl\/impevent?adnxs_uid\\x3d$UID\"];",["escape",["macro",60],8,16],"(src,args,!0);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":159
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=\"\/\/remarket.clicktripz.com\/api\/advertisers\/v1\/prof?advertiserID\\x3d41\\x26format\\x3dimage\",b=[];",["escape",["macro",60],8,16],"(a,b)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":160
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar src=\"https:\/\/www.facebook.com\/tr\/\",args=[\"id\\x3d2132883120290726\",\"ev\\x3dTWP_signUp\"];",["escape",["macro",60],8,16],"(src,args,!0);\u003C\/script\u003E\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":161
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar src=\"https:\/\/www.facebook.com\/tr\/\",args=[\"id\\x3d2132883120290726\",\"ev\\x3dTWP_registered\"];",["escape",["macro",60],8,16],"(src,args,!0);\u003C\/script\u003E\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":162
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var c=\"https:\/\/t.teads.tv\/track\",b=\"",["escape",["macro",44],7],"\",a=function(){switch(",["escape",["macro",55],8,16],"){case \"results\":if(\"screenView\"===",["escape",["macro",54],8,16],")return\"Pixel_Momondo\"+b+\"_Search\";if(\"clickOut\"===",["escape",["macro",54],8,16],")return\"Pixel_Momondo\"+b+\"_Click_Out\";break;case \"frontdoor\":return\"Pixel_Momondo\"+b+\"_Home\";default:",["escape",["macro",39],8,16],"(\"warn\",\"Teads Conversion for LATAM\",\"No conversion type found\")}};\"undefined\"!==typeof a()\u0026\u0026(a=[\"action\\x3dconversion\",\"conversion_type\\x3d\"+\na(),\"advertiser_id\\x3d19261\"],",["escape",["macro",60],8,16],"(c,a))})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":163
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var g=",["escape",["macro",55],8,16],",h=",["escape",["macro",54],8,16],",k=",["escape",["macro",36],8,16],",a=\"\",d=\"PRODUCT\",b=\"\",e=\"\",f=\"\",l=",["escape",["macro",113],8,16],",m=\"1\",n=\"USD\",c=\"\";c=k.match(\/(_US)\/)?\"248085\":\"247223\";switch(h){case \"clickOut\":a=\"flight_selection\";b=\"CONVERSION\";window.IntentMediaProperties={page_id:a,product_category:d,page_view_type:b,user_member_id:e,click_id:f,order_id:l,conversion_value:m,conversion_currency:n,entity_id:c};break;case \"screenView\":switch(g){case \"results\":a=\"flight_searcher\";b=\n\"LIST\";window.IntentMediaProperties={page_id:a,product_category:d,page_view_type:b,user_member_id:e,click_id:f,entity_id:c};break;case \"frontdoor\":a=\"home_page\",b=\"HOME\",window.IntentMediaProperties={page_id:a,product_category:d,page_view_type:b,user_member_id:e,click_id:f,entity_id:c}}}",["escape",["macro",40],8,16],"(\"\/\/a.cdn.intentmedia.net\/javascripts\/intent_media_data.js\",function(){",["escape",["macro",39],8,16],"(\"log\",\"Intent Media Scipt Loaded\")})})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":168
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar axel=Math.random()+\"\",a=1E13*axel,src=\"https:\/\/pubads.g.doubleclick.net\/activity;activity;xsp\\x3d4466753;ord\\x3d\"+a+\"?\";",["escape",["macro",60],8,16],"(src,[]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":169
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\n\u003Cimg height=\"1\" width=\"1\" border=\"0\" alt=\"\" src=\"https:\/\/s.amazon-adsystem.com\/iui3?d=forester-did\u0026amp;ex-fargs=%3Fid%3Dc6221775-3337-80b3-5219-ed63b855ef1d%26type%3D4%26m%3D1\u0026amp;ex-fch=416613\u0026amp;ex-src=https:\/\/www.kayak.com\u0026amp;ex-hargs=v%3D1.0%3Bc%3D5706378570901%3Bp%3DC6221775-3337-80B3-5219-ED63B855EF1D\"\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":172
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a={kayak:\"2ejGFw3SwjWkcVhh\",checkfelixat:\"oukTrCVobIVYofgc\",swoodoo_wl:\"JEhFfvZAL8v6jtMh\",momondo:\"S3OOzGcx30mYbNx7\",\"momondo-kyk-wl\":\"S3OOzGcx30mYbNx7\",cheapflights:\"M2gjrdEj51wQucty\",hotelscombined:\"XMBOYLkL3pTiz8tk\",mundi:\"1O8WhKQEeMbsfkSo\"},b=new Image;b.referrerPolicy=\"no-referrer\";a=0\u003EObject.keys(a).indexOf(",["escape",["macro",34],8,16],")?a.kayak:a[",["escape",["macro",34],8,16],"];b.src=\"https:\/\/pixel.sojern.com\/pixel\/partnersync\/\"+a+\"?partner_uid\\x3d",["escape",["macro",103],7],"\"})();\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":173
    }],
  "predicates":[{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"clickOut"
    },{
      "function":"_eq",
      "arg0":["macro",86],
      "arg1":"r9"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"screenView"
    },{
      "function":"_eq",
      "arg0":["macro",55],
      "arg1":"frontdoor"
    },{
      "function":"_eq",
      "arg0":["macro",55],
      "arg1":"results"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"cfFindDeals"
    },{
      "function":"_eq",
      "arg0":["macro",55],
      "arg1":"confirmation"
    },{
      "function":"_eq",
      "arg0":["macro",89],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",79],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",35],
      "arg1":"true"
    },{
      "function":"_cn",
      "arg0":["macro",34],
      "arg1":"momondo"
    },{
      "function":"_re",
      "arg0":["macro",86],
      "arg1":".*"
    },{
      "function":"_eq",
      "arg0":["macro",34],
      "arg1":"agoda"
    },{
      "function":"_eq",
      "arg0":["macro",92],
      "arg1":"undefined"
    },{
      "function":"_eq",
      "arg0":["macro",34],
      "arg1":"kayak"
    },{
      "function":"_re",
      "arg0":["macro",44],
      "arg1":"UY|AR|BR|CO|MX"
    },{
      "function":"_eq",
      "arg0":["macro",93],
      "arg1":"undefined"
    },{
      "function":"_eq",
      "arg0":["macro",86],
      "arg1":"gtm.js"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"fly4free"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"hpirates"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"viajanet"
    },{
      "function":"_eq",
      "arg0":["macro",55],
      "arg1":"landing"
    },{
      "function":"_eq",
      "arg0":["macro",55],
      "arg1":"details"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"expandDetails"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"hotel"
    },{
      "function":"_sw",
      "arg0":["macro",55],
      "arg1":"static"
    },{
      "function":"_eq",
      "arg0":["macro",96],
      "arg1":"undefined"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_US"
    },{
      "function":"_eq",
      "arg0":["macro",99],
      "arg1":"false"
    },{
      "function":"_re",
      "arg0":["macro",22],
      "arg1":"^(flight|hotel|car|package)$"
    },{
      "function":"_re",
      "arg0":["macro",22],
      "arg1":"^(flight)$"
    },{
      "function":"_eq",
      "arg0":["macro",34],
      "arg1":"travelsupermarketuwl"
    },{
      "function":"_eq",
      "arg0":["macro",25],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"chinesean"
    },{
      "function":"_re",
      "arg0":["macro",36],
      "arg1":"(HK$)|(TW$)",
      "ignore_case":true
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_AR"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_BR"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_CL"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_CO"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_MX"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_PE"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_UY"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"yahoojapan"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_JP"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"vkontakte"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_RU"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_BY"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_TR"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_KZ"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_UA"
    },{
      "function":"_re",
      "arg0":["macro",34],
      "arg1":"momondo|kayak"
    },{
      "function":"_re",
      "arg0":["macro",36],
      "arg1":"_(UK|GB|FR|IT|ES|DE)$"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"resultsLoaded"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"cfViewDeal"
    },{
      "function":"_re",
      "arg0":["macro",86],
      "arg1":"r9|cfViewDeal"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"magazine"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"explore"
    },{
      "function":"_re",
      "arg0":["macro",47],
      "arg1":"TravelHacker(Page|CategoryPage)"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"blog"
    },{
      "function":"_eq",
      "arg0":["macro",102],
      "arg1":"undefined"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"travelsupermarket"
    },{
      "function":"_eq",
      "arg0":["macro",38],
      "arg1":"true"
    },{
      "function":"_re",
      "arg0":["macro",91],
      "arg1":"mweb|tweb",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",81],
      "arg1":"undefined"
    },{
      "function":"_ew",
      "arg0":["macro",36],
      "arg1":"_IN"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"optimise"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"flight"
    },{
      "function":"_eq",
      "arg0":["macro",34],
      "arg1":"booking"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"bingadssearch"
    },{
      "function":"_eq",
      "arg0":["macro",34],
      "arg1":"cheapflights"
    },{
      "function":"_eq",
      "arg0":["macro",85],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",52],
      "arg1":"naversearch"
    },{
      "function":"_re",
      "arg0":["macro",44],
      "arg1":"^(BR|CL|MX|AR|UY|PE|CO)$"
    },{
      "function":"_re",
      "arg0":["macro",36],
      "arg1":"(_CA)$|(_US)$"
    },{
      "function":"_re",
      "arg0":["macro",21],
      "arg1":"^(main|flight|hotel|car|packagetour|blog|explore|marketing)$"
    },{
      "function":"_cn",
      "arg0":["macro",32],
      "arg1":"c60645b71c"
    },{
      "function":"_eq",
      "arg0":["macro",47],
      "arg1":"undefined"
    },{
      "function":"_eq",
      "arg0":["macro",104],
      "arg1":"unknown"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"signUp"
    },{
      "function":"_eq",
      "arg0":["macro",111],
      "arg1":"theWorldPiece"
    },{
      "function":"_eq",
      "arg0":["macro",54],
      "arg1":"registered"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"car"
    }],
  "rules":[
    [["if",0,1],["add",0,3,4,6,8,10,11,12,13,14,19,20,21,24,25,26,33,37,44,53,56,57,60]],
    [["if",1,2,3],["add",0,3,4,6,8,10,11,12,13,17,20,32,33,39,44,45,51,52,56,57]],
    [["if",1,2,4],["add",0,1,3,4,5,6,8,10,11,12,13,14,15,17,18,20,22,23,25,26,28,29,32,33,36,39,40,41,42,43,44,45,46,47,56,57,58,60]],
    [["if",1,5],["add",0,16,33,36,41,42,51]],
    [["if",1,6],["add",0,4,6,11,12,21,33,45]],
    [["if",1,2],["add",2,7,24,27,30,31,34,53]],
    [["if",17],["add",9]],
    [["if",1,2,21],["add",11,12,20,45,52]],
    [["if",1,2,22],["add",11,14,53]],
    [["if",1,23,24],["add",11]],
    [["if",1,25],["add",11,12,13,17,33,52]],
    [["if",1,23],["add",12,14,20,33,53]],
    [["if",1,21],["add",12,13,17,33,52]],
    [["if",1,52],["add",33]],
    [["if",53,54],["add",33,51]],
    [["if",1,2,55],["add",33]],
    [["if",1,56],["add",33,45]],
    [["if",1,57],["add",33,45]],
    [["if",1,2,58],["add",33,45]],
    [["if",17,61],["add",35]],
    [["if",1,2,4,66],["add",38,59]],
    [["if",1,8],["add",38],["block",0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,36,37,39,40,41,42,43,44,45,46,47,51,52,53,54,55,56,57,58,59,60]],
    [["if",1,2],["unless",75],["add",48]],
    [["if",1,2],["unless",75,76],["add",49]],
    [["if",0,1],["unless",75,77],["add",50]],
    [["if",1,78,79],["add",54]],
    [["if",1,79,80],["add",55]],
    [["if",1,2,4,81],["add",59]],
    [["if",1,2,4,24],["add",59]],
    [["if",1],["unless",7],["block",0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,36,37,39,40,41,42,43,44,45,46,47,51,52,53,54,55,56,57,58,59,60]],
    [["if",1],["unless",9],["block",0,4,10,11,12,17,20,21,22,23,25,27,28,29,30,31,32,43,51,52,54,55,59]],
    [["if",11],["unless",10],["block",2,5,24,40,56]],
    [["if",11],["unless",12],["block",3,18,53,57]],
    [["if",1,13],["block",4]],
    [["if",1],["unless",14],["block",6,13,14,37,39,44,45,46,47,58,59]],
    [["if",1],["unless",15],["block",6]],
    [["if",1,16],["block",7,8]],
    [["if",1,18],["block",10]],
    [["if",1,19],["block",10]],
    [["if",1,20],["block",10]],
    [["if",1,26],["block",12]],
    [["if",1],["unless",27],["block",13,39,46,51,59]],
    [["if",1,28],["block",13]],
    [["if",1],["unless",29],["block",13]],
    [["if",1],["unless",30],["block",18,53,57]],
    [["if",11],["unless",31],["block",19]],
    [["if",1,32],["block",20]],
    [["if",1],["unless",33],["block",21]],
    [["if",1],["unless",34],["block",21]],
    [["if",1],["unless",35,36,37,38,39,40,41],["block",22]],
    [["if",1],["unless",42],["block",23,25]],
    [["if",1],["unless",43],["block",23]],
    [["if",1],["unless",44],["block",24]],
    [["if",1],["unless",45,46,47,48,49],["block",26]],
    [["if",11],["unless",50],["block",26]],
    [["if",1,51],["block",27]],
    [["if",1],["unless",51],["block",28]],
    [["if",1,59],["block",33]],
    [["if",11],["unless",60],["block",34]],
    [["if",1],["unless",62],["block",35]],
    [["if",1,63],["block",36]],
    [["if",1],["unless",64],["block",37]],
    [["if",1],["unless",65],["block",37]],
    [["if",1],["unless",67],["block",38]],
    [["if",1],["unless",68],["block",40,41]],
    [["if",11],["unless",69],["block",41,51]],
    [["if",1],["unless",70],["block",42,60]],
    [["if",1],["unless",71],["block",43]],
    [["if",1],["unless",72],["block",44]],
    [["if",1],["unless",73],["block",45]],
    [["if",1],["unless",74],["block",45]],
    [["if",1],["unless",36,39],["block",56]],
    [["if",1],["unless",35,37,38,39],["block",58]]]
},
"runtime":[
[],[]
]



};
var aa,da=this||self,ea=function(a){return"boolean"==typeof a},fa=/^[\w+/_-]+[=]{0,2}$/,ha=null;var ia=function(){},ja=function(a){return"function"==typeof a},ka=function(a){return"string"==typeof a},la=function(a){return"number"==typeof a&&!isNaN(a)},ma=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},oa=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},pa=function(a,b){if(a&&ma(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},qa=function(a,b){if(!la(a)||
!la(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},sa=function(a,b){for(var c=new ra,d=0;d<a.length;d++)c.set(a[d],!0);for(var e=0;e<b.length;e++)if(c.get(b[e]))return!0;return!1},ta=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},ua=function(a){return Math.round(Number(a))||0},va=function(a){return"false"==String(a).toLowerCase()?!1:!!a},wa=function(a){var b=[];if(ma(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},xa=function(a){return a?
a.replace(/^\s+|\s+$/g,""):""},ya=function(){return(new Date).getTime()},ra=function(){this.prefix="gtm.";this.values={}};ra.prototype.set=function(a,b){this.values[this.prefix+a]=b};ra.prototype.get=function(a){return this.values[this.prefix+a]};ra.prototype.contains=function(a){return void 0!==this.get(a)};
var za=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ca=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},Da=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},Ea=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},Fa=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Ga=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Ha=function(a){if(null==a)return String(a);var b=Ga.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Ia=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Ja=function(a){if(!a||"object"!=Ha(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Ia(a,"constructor")&&!Ia(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Ia(a,b)},f=function(a,b){var c=b||("array"==Ha(a)?[]:{}),d;for(d in a)if(Ia(a,d)){var e=a[d];"array"==Ha(e)?("array"!=Ha(c[d])&&(c[d]=[]),c[d]=f(e,c[d])):Ja(e)?(Ja(c[d])||(c[d]={}),c[d]=f(e,c[d])):c[d]=e}return c};
var Ka=[],La={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},Ma=function(a){return La[a]},Na=/[\x00\x22\x26\x27\x3c\x3e]/g;var Ra=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,Va={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},Wa=function(a){return Va[a]};Ka[7]=function(a){return String(a).replace(Ra,Wa)};
Ka[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(Ra,Wa)+"'"}};var bb=/['()]/g,cb=function(a){return"%"+a.charCodeAt(0).toString(16)};Ka[12]=function(a){var b=
encodeURIComponent(String(a));bb.lastIndex=0;return bb.test(b)?b.replace(bb,cb):b};var db=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,eb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},fb=function(a){return eb[a]};Ka[16]=function(a){return a};var ib=[],jb=[],kb=[],lb=[],mb=[],nb={},pb,qb,rb,sb=function(a,b){var c={};c["function"]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);return c},tb=function(a,b){var c=a["function"];if(!c)throw Error("Error: No function name given for function call.");var d=!!nb[c],e={},g;for(g in a)a.hasOwnProperty(g)&&0===g.indexOf("vtp_")&&(e[d?g:g.substr(4)]=a[g]);return d?nb[c](e):(void 0)(c,e,b)},vb=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=ub(a[e],b,c));return d},
wb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";var c=nb[b];return c?c.priorityOverride||0:0},ub=function(a,b,c){if(ma(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(ub(a[e],b,c));return d;case "macro":var g=a[1];if(c[g])return;var h=ib[g];if(!h||b.Dc(h))return;c[g]=!0;try{var k=vb(h,b,c);k.vtp_gtmEventId=b.id;d=tb(k,b);rb&&(d=rb.Jf(d,k))}catch(w){b.be&&b.be(w,Number(g)),d=!1}c[g]=!1;return d;
case "map":d={};for(var l=1;l<a.length;l+=2)d[ub(a[l],b,c)]=ub(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,n=1;n<a.length;n++){var p=ub(a[n],b,c);qb&&(m=m||p===qb.yb);d.push(p)}return qb&&m?qb.Mf(d):d.join("");case "escape":d=ub(a[1],b,c);if(qb&&ma(a[1])&&"macro"===a[1][0]&&qb.ng(a))return qb.zg(d);d=String(d);for(var t=2;t<a.length;t++)Ka[a[t]]&&(d=Ka[a[t]](d));return d;case "tag":var q=a[1];if(!lb[q])throw Error("Unable to resolve tag reference "+q+".");return d={Od:a[2],index:q};case "zb":var r=
{arg0:a[2],arg1:a[3],ignore_case:a[5]};r["function"]=a[1];var v=xb(r,b,c);a[4]&&(v=!v);return v;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},xb=function(a,b,c){try{return pb(vb(a,b,c))}catch(d){JSON.stringify(a)}return null};var yb=function(){var a=function(b){return{toString:function(){return b}}};return{gd:a("convert_case_to"),hd:a("convert_false_to"),jd:a("convert_null_to"),kd:a("convert_true_to"),ld:a("convert_undefined_to"),hh:a("debug_mode_metadata"),ka:a("function"),We:a("instance_name"),Xe:a("live_only"),Ye:a("malware_disabled"),Ze:a("metadata"),jh:a("original_vendor_template_id"),$e:a("once_per_event"),Cd:a("once_per_load"),Dd:a("setup_tags"),Ed:a("tag_id"),Fd:a("teardown_tags")}}();var zb=null,Cb=function(a){function b(p){for(var t=0;t<p.length;t++)d[p[t]]=!0}var c=[],d=[];zb=Ab(a);for(var e=0;e<jb.length;e++){var g=jb[e],h=Bb(g);if(h){for(var k=g.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(g.block||[])}else null===h&&b(g.block||[])}for(var m=[],n=0;n<lb.length;n++)c[n]&&!d[n]&&(m[n]=!0);return m},Bb=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=zb(b[c]);if(!d)return null===d?null:!1}for(var e=a.unless||[],g=0;g<e.length;g++){var h=zb(e[g]);if(null===h)return null;
if(h)return!1}return!0},Ab=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=xb(kb[c],a));return b[c]}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Db,Eb=function(){};(function(){function a(k,l){k=k||"";l=l||{};for(var m in b)b.hasOwnProperty(m)&&(l.uf&&(l["fix_"+m]=!0),l.Pd=l.Pd||l["fix_"+m]);var n={comment:/^\x3c!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var q=k.indexOf("--\x3e");if(0<=q)return{content:k.substr(4,q),length:q+3}},endTag:function(){var q=k.match(d);if(q)return{tagName:q[1],length:q[0].length}},atomicTag:function(){var q=p.startTag();
if(q){var r=k.slice(q.length);if(r.match(new RegExp("</\\s*"+q.tagName+"\\s*>","i"))){var v=r.match(new RegExp("([\\s\\S]*?)</\\s*"+q.tagName+"\\s*>","i"));if(v)return{tagName:q.tagName,F:q.F,content:v[1],length:v[0].length+q.length}}}},startTag:function(){var q=k.match(c);if(q){var r={};q[2].replace(e,function(v,w,y,x,A){var z=y||x||A||g.test(w)&&w||null,B=document.createElement("div");B.innerHTML=z;r[w]=B.textContent||B.innerText||z});return{tagName:q[1],F:r,mb:!!q[3],length:q[0].length}}},chars:function(){var q=
k.indexOf("<");return{length:0<=q?q:k.length}}},t=function(){for(var q in n)if(n[q].test(k)){var r=p[q]();return r?(r.type=r.type||q,r.text=k.substr(0,r.length),k=k.slice(r.length),r):null}};l.Pd&&function(){var q=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,r=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,v=[];v.ae=function(){return this[this.length-1]};v.Hc=function(B){var E=this.ae();return E&&E.tagName&&E.tagName.toUpperCase()===B.toUpperCase()};v.If=
function(B){for(var E=0,F;F=this[E];E++)if(F.tagName===B)return!0;return!1};var w=function(B){B&&"startTag"===B.type&&(B.mb=q.test(B.tagName)||B.mb);return B},y=t,x=function(){k="</"+v.pop().tagName+">"+k},A={startTag:function(B){var E=B.tagName;"TR"===E.toUpperCase()&&v.Hc("TABLE")?(k="<TBODY>"+k,z()):l.rh&&r.test(E)&&v.If(E)?v.Hc(E)?x():(k="</"+B.tagName+">"+k,z()):B.mb||v.push(B)},endTag:function(B){v.ae()?l.Wf&&!v.Hc(B.tagName)?x():v.pop():l.Wf&&(y(),z())}},z=function(){var B=k,E=w(y());k=B;if(E&&
A[E.type])A[E.type](E)};t=function(){z();return w(y())}}();return{append:function(q){k+=q},Ig:t,wh:function(q){for(var r;(r=t())&&(!q[r.type]||!1!==q[r.type](r)););},clear:function(){var q=k;k="";return q},xh:function(){return k},stack:[]}}var b=function(){var k={},l=this.document.createElement("div");l.innerHTML="<P><I></P></I>";k.Ch="<P><I></P></I>"!==l.innerHTML;l.innerHTML="<P><i><P></P></i></P>";k.yh=2===l.childNodes.length;return k}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,g=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;a.supports=b;a.Dh=function(k){var l={comment:function(m){return"<--"+m.content+"--\x3e"},endTag:function(m){return"</"+m.tagName+">"},atomicTag:function(m){return l.startTag(m)+m.content+l.endTag(m)},startTag:function(m){var n="<"+m.tagName,p;for(p in m.F){var t=m.F[p];
n+=" "+p+'="'+(t?t.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"'}return n+(m.mb?"/>":">")},chars:function(m){return m.text}};return l[k.type](k)};a.qh=function(k){var l={},m;for(m in k){var n=k[m];l[m]=n&&n.replace(/(^|[^\\])"/g,'$1\\"')}return l};for(var h in b)a.zf=a.zf||!b[h]&&h;Db=a})();(function(){function a(){}function b(p){return void 0!==p&&null!==p}function c(p,t,q){var r,v=p&&p.length||0;for(r=0;r<v;r++)t.call(q,p[r],r)}function d(p,t,q){for(var r in p)p.hasOwnProperty(r)&&t.call(q,r,p[r])}function e(p,
t){d(t,function(q,r){p[q]=r});return p}function g(p,t){p=p||{};d(t,function(q,r){b(p[q])||(p[q]=r)});return p}function h(p){try{return m.call(p)}catch(q){var t=[];c(p,function(r){t.push(r)});return t}}var k={hf:a,jf:a,kf:a,lf:a,vf:a,wf:function(p){return p},done:a,error:function(p){throw p;},Mg:!1},l=this;if(!l.postscribe){var m=Array.prototype.slice,n=function(){function p(q,r,v){var w="data-ps-"+r;if(2===arguments.length){var y=q.getAttribute(w);return b(y)?String(y):y}b(v)&&""!==v?q.setAttribute(w,
v):q.removeAttribute(w)}function t(q,r){var v=q.ownerDocument;e(this,{root:q,options:r,ob:v.defaultView||v.parentWindow,Ca:v,Rb:Db("",{uf:!0}),qc:[q],Sc:"",Tc:v.createElement(q.nodeName),kb:[],qa:[]});p(this.Tc,"proxyof",0)}t.prototype.write=function(){[].push.apply(this.qa,arguments);for(var q;!this.Jb&&this.qa.length;)q=this.qa.shift(),"function"===typeof q?this.Df(q):this.cd(q)};t.prototype.Df=function(q){var r={type:"function",value:q.name||q.toString()};this.Oc(r);q.call(this.ob,this.Ca);this.de(r)};
t.prototype.cd=function(q){this.Rb.append(q);for(var r,v=[],w,y;(r=this.Rb.Ig())&&!(w=r&&"tagName"in r?!!~r.tagName.toLowerCase().indexOf("script"):!1)&&!(y=r&&"tagName"in r?!!~r.tagName.toLowerCase().indexOf("style"):!1);)v.push(r);this.fh(v);w&&this.bg(r);y&&this.cg(r)};t.prototype.fh=function(q){var r=this.Af(q);r.Hd&&(r.Bc=this.Sc+r.Hd,this.Sc+=r.Eg,this.Tc.innerHTML=r.Bc,this.dh())};t.prototype.Af=function(q){var r=this.qc.length,v=[],w=[],y=[];c(q,function(x){v.push(x.text);if(x.F){if(!/^noscript$/i.test(x.tagName)){var A=
r++;w.push(x.text.replace(/(\/?>)/," data-ps-id="+A+" $1"));"ps-script"!==x.F.id&&"ps-style"!==x.F.id&&y.push("atomicTag"===x.type?"":"<"+x.tagName+" data-ps-proxyof="+A+(x.mb?" />":">"))}}else w.push(x.text),y.push("endTag"===x.type?x.text:"")});return{Eh:q,raw:v.join(""),Hd:w.join(""),Eg:y.join("")}};t.prototype.dh=function(){for(var q,r=[this.Tc];b(q=r.shift());){var v=1===q.nodeType;if(!v||!p(q,"proxyof")){v&&(this.qc[p(q,"id")]=q,p(q,"id",null));var w=q.parentNode&&p(q.parentNode,"proxyof");
w&&this.qc[w].appendChild(q)}r.unshift.apply(r,h(q.childNodes))}};t.prototype.bg=function(q){var r=this.Rb.clear();r&&this.qa.unshift(r);q.src=q.F.src||q.F.kh;q.src&&this.kb.length?this.Jb=q:this.Oc(q);var v=this;this.eh(q,function(){v.de(q)})};t.prototype.cg=function(q){var r=this.Rb.clear();r&&this.qa.unshift(r);q.type=q.F.type||q.F.lh||"text/css";this.gh(q);r&&this.write()};t.prototype.gh=function(q){var r=this.Cf(q);this.lg(r);q.content&&(r.styleSheet&&!r.sheet?r.styleSheet.cssText=q.content:
r.appendChild(this.Ca.createTextNode(q.content)))};t.prototype.Cf=function(q){var r=this.Ca.createElement(q.tagName);r.setAttribute("type",q.type);d(q.F,function(v,w){r.setAttribute(v,w)});return r};t.prototype.lg=function(q){this.cd('<span id="ps-style"/>');var r=this.Ca.getElementById("ps-style");r.parentNode.replaceChild(q,r)};t.prototype.Oc=function(q){q.vg=this.qa;this.qa=[];this.kb.unshift(q)};t.prototype.de=function(q){q!==this.kb[0]?this.options.error({message:"Bad script nesting or script finished twice"}):
(this.kb.shift(),this.write.apply(this,q.vg),!this.kb.length&&this.Jb&&(this.Oc(this.Jb),this.Jb=null))};t.prototype.eh=function(q,r){var v=this.Bf(q),w=this.Sg(v),y=this.options.hf;q.src&&(v.src=q.src,this.Qg(v,w?y:function(){r();y()}));try{this.kg(v),q.src&&!w||r()}catch(x){this.options.error(x),r()}};t.prototype.Bf=function(q){var r=this.Ca.createElement(q.tagName);d(q.F,function(v,w){r.setAttribute(v,w)});q.content&&(r.text=q.content);return r};t.prototype.kg=function(q){this.cd('<span id="ps-script"/>');
var r=this.Ca.getElementById("ps-script");r.parentNode.replaceChild(q,r)};t.prototype.Qg=function(q,r){function v(){q=q.onload=q.onreadystatechange=q.onerror=null}var w=this.options.error;e(q,{onload:function(){v();r()},onreadystatechange:function(){/^(loaded|complete)$/.test(q.readyState)&&(v(),r())},onerror:function(){var y={message:"remote script failed "+q.src};v();w(y);r()}})};t.prototype.Sg=function(q){return!/^script$/i.test(q.nodeName)||!!(this.options.Mg&&q.src&&q.hasAttribute("async"))};
return t}();l.postscribe=function(){function p(){var w=r.shift(),y;w&&(y=w[w.length-1],y.jf(),w.stream=t.apply(null,w),y.kf())}function t(w,y,x){function A(F){F=x.wf(F);v.write(F);x.lf(F)}v=new n(w,x);v.id=q++;v.name=x.name||v.id;var z=w.ownerDocument,B={close:z.close,open:z.open,write:z.write,writeln:z.writeln};e(z,{close:a,open:a,write:function(){return A(h(arguments).join(""))},writeln:function(){return A(h(arguments).join("")+"\n")}});var E=v.ob.onerror||a;v.ob.onerror=function(F,M,Q){x.error({th:F+
" - "+M+":"+Q});E.apply(v.ob,arguments)};v.write(y,function(){e(z,B);v.ob.onerror=E;x.done();v=null;p()});return v}var q=0,r=[],v=null;return e(function(w,y,x){"function"===typeof x&&(x={done:x});x=g(x,k);w=/^#/.test(w)?l.document.getElementById(w.substr(1)):w.sh?w[0]:w;var A=[w,y,x];w.yg={cancel:function(){A.stream?A.stream.abort():A[1]=a}};x.vf(A);r.push(A);v||p();return w.yg},{streams:{},vh:r,mh:n})}();Eb=l.postscribe}})();for(var Fb="floor ceil round max min abs pow sqrt".split(" "),Gb=0;Gb<Fb.length;Gb++)Math.hasOwnProperty(Fb[Gb]);var u=window,C=document,Hb=navigator,Ib=C.currentScript&&C.currentScript.src,Jb=function(a,b){var c=u[a];u[a]=void 0===c?b:c;return u[a]},Kb=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},Lb=function(a,b,c){var d=C.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Kb(d,b);c&&(d.onerror=c);var e;if(null===ha)b:{var g=da.document,h=g.querySelector&&g.querySelector("script[nonce]");
if(h){var k=h.nonce||h.getAttribute("nonce");if(k&&fa.test(k)){ha=k;break b}}ha=""}e=ha;e&&d.setAttribute("nonce",e);var l=C.getElementsByTagName("script")[0]||C.body||C.head;l.parentNode.insertBefore(d,l);return d},Mb=function(){if(Ib){var a=Ib.toLowerCase();if(0===a.indexOf("https://"))return 2;if(0===a.indexOf("http://"))return 3}return 1},Nb=function(a,b){var c=C.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=C.body&&C.body.lastChild||
C.body||C.head;d.parentNode.insertBefore(c,d);Kb(c,b);void 0!==a&&(c.src=a);return c},Ob=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},D=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Pb=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},G=function(a){u.setTimeout(a,0)},Qb=function(a,b){return a&&
b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},Rb=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},Sb=function(a){var b=C.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},Tb=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var g=a,h=0;g&&h<=c;h++){if(d[String(g.tagName).toLowerCase()])return g;
g=g.parentElement}return null},Ub=function(a,b){var c=a[b];c&&"string"===typeof c.animVal&&(c=c.animVal);return c};var H={ac:"event_callback",Na:"event_timeout",W:"gtag.config",P:"allow_ad_personalization_signals",S:"cookie_expires",Ma:"cookie_update",xa:"session_duration"};var ic=/[A-Z]+/,jc=/\s/,kc=function(a){if(ka(a)&&(a=xa(a),!jc.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(ic.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],N:d}}}}},mc=function(a){for(var b={},c=0;c<a.length;++c){var d=kc(a[c]);d&&(b[d.id]=d)}lc(b);var e=[];ta(b,function(g,h){e.push(h)});return e};
function lc(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.N[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var nc={},oc=null,pc=Math.random();nc.i="GTM-PSCCSHQ";nc.Cb="9b0";var qc={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fal:!0,__fil:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0,__paused:!0},rc="www.googletagmanager.com/gtm.js";var sc=rc,tc=null,uc=null,vc=null,wc="//www.googletagmanager.com/a?id="+nc.i+"&cv=303",xc={},yc={},zc=function(){var a=oc.sequence||0;oc.sequence=a+1;return a};var Ac={},Bc=function(a,b){Ac[a]=Ac[a]||[];Ac[a][b]=!0},Dc=function(a){for(var b=[],c=Ac[a]||[],d=0;d<c.length;d++)c[d]&&(b[Math.floor(d/6)]^=1<<d%6);for(var e=0;e<b.length;e++)b[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b[e]||0);return b.join("")};
var Ec=function(){return"&tc="+lb.filter(function(a){return a}).length},Oc=function(){Fc&&(u.clearTimeout(Fc),Fc=void 0);void 0===Gc||Hc[Gc]&&!Ic||(Jc[Gc]||Kc.pg()||0>=Lc--?(Bc("GTM",1),Jc[Gc]=!0):(Kc.Kg(),Ob(Mc()),Hc[Gc]=!0,Nc=Ic=""))},Mc=function(){var a=Gc;if(void 0===a)return"";var b=Dc("GTM"),c=Dc("TAGGING");return[Pc,Hc[a]?"":"&es=1",Qc[a],b?"&u="+b:"",c?"&ut="+c:"",Ec(),Ic,Nc,"&z=0"].join("")},Rc=function(){return[wc,"&v=3&t=t","&pid="+qa(),"&rv="+nc.Cb].join("")},Sc="0.005000">
Math.random(),Pc=Rc(),Tc=function(){Pc=Rc()},Hc={},Ic="",Nc="",Gc=void 0,Qc={},Jc={},Fc=void 0,Kc=function(a,b){var c=0,d=0;return{pg:function(){if(c<a)return!1;ya()-d>=b&&(c=0);return c>=a},Kg:function(){ya()-d>=b&&(c=0);c++;d=ya()}}}(2,1E3),Lc=1E3,Uc=function(a,b){if(Sc&&!Jc[a]&&Gc!==a){Oc();Gc=a;Ic="";var c;c=0===b.indexOf("gtm.")?encodeURIComponent(b):"*";Qc[a]="&e="+c+"&eid="+a;Fc||(Fc=u.setTimeout(Oc,500))}},Vc=function(a,b,c){if(Sc&&!Jc[a]&&b){a!==Gc&&(Oc(),Gc=a);var d=String(b[yb.ka]||"").replace(/_/g,
"");0===d.indexOf("cvt")&&(d="cvt");var e=c+d;Ic=Ic?Ic+"."+e:"&tr="+e;Fc||(Fc=u.setTimeout(Oc,500));2022<=Mc().length&&Oc()}};var Wc={},Xc=new ra,Yc={},Zc={},cd={name:"unifiedDataLayer",set:function(a,b){f($c(a,b),Yc);ad()},get:function(a){return bd(a,2)},reset:function(){Xc=new ra;Yc={};ad()}},bd=function(a,b){if(2!=b){var c=Xc.get(a);if(Sc){var d=dd(a);c!==d&&Bc("GTM",5)}return c}return dd(a)},dd=function(a,b,c){var d=a.split("."),e=!1,g=void 0;return e?g:fd(d)},fd=function(a){for(var b=Yc,c=0;c<a.length;c++){if(null===b)return!1;if(void 0===b)break;b=b[a[c]]}return b};
var id=function(a,b){Zc.hasOwnProperty(a)||(Xc.set(a,b),f($c(a,b),Yc),ad())},$c=function(a,b){for(var c={},d=c,e=a.split("."),g=0;g<e.length-1;g++)d=d[e[g]]={};d[e[e.length-1]]=b;return c},ad=function(a){ta(Zc,function(b,c){Xc.set(b,c);f($c(b,void 0),Yc);f($c(b,c),Yc);a&&delete Zc[b]})},jd=function(a,b,c){Wc[a]=Wc[a]||{};var d=1!==c?dd(b):Xc.get(b);"array"===Ha(d)||"object"===Ha(d)?Wc[a][b]=f(d):Wc[a][b]=d},kd=function(a,b){if(Wc[a])return Wc[a][b]};var ld=function(){var a=!1;return a};var J=function(a,b,c,d){return(2===md()||d||"http:"!=u.location.protocol?a:b)+c},md=function(){var a=Mb(),b;if(1===a)a:{var c=sc;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,g=1,h=C.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===g&&0===l.indexOf(d)&&(g=2)}}b=g}else b=a;return b};var Bd=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),Cd={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Dd={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Ed="google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" ");
var Gd=function(a){var b=bd("gtm.whitelist");b&&Bc("GTM",9);var c=b&&Fa(wa(b),Cd),d=bd("gtm.blacklist");d||(d=bd("tagTypeBlacklist"))&&Bc("GTM",3);
d?Bc("GTM",8):d=[];Fd()&&(d=wa(d),d.push("nonGooglePixels","nonGoogleScripts"));0<=oa(wa(d),"google")&&Bc("GTM",2);var e=d&&Fa(wa(d),Dd),g={};return function(h){var k=h&&h[yb.ka];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==g[k])return g[k];var l=yc[k]||[],m=a(k,l);if(b){var n;if(n=m)a:{if(0>oa(c,k))if(l&&0<l.length)for(var p=0;p<l.length;p++){if(0>
oa(c,l[p])){Bc("GTM",11);n=!1;break a}}else{n=!1;break a}n=!0}m=n}var t=!1;if(d){var q=0<=oa(e,k);if(q)t=q;else{var r=sa(e,l||[]);r&&Bc("GTM",10);t=r}}var v=!m||t;v||!(0<=oa(l,"sandboxedScripts"))||c&&-1!==oa(c,"sandboxedScripts")||(v=sa(e,Ed));return g[k]=v}},Fd=function(){return Bd.test(u.location&&u.location.hostname)};var Hd={Jf:function(a,b){b[yb.gd]&&"string"===typeof a&&(a=1==b[yb.gd]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(yb.jd)&&null===a&&(a=b[yb.jd]);b.hasOwnProperty(yb.ld)&&void 0===a&&(a=b[yb.ld]);b.hasOwnProperty(yb.kd)&&!0===a&&(a=b[yb.kd]);b.hasOwnProperty(yb.hd)&&!1===a&&(a=b[yb.hd]);return a}};var Id={active:!0,isWhitelisted:function(){return!0}},Jd=function(a){var b=oc.zones;!b&&a&&(b=oc.zones=a());return b};var Kd=!1,Ld=0,Md=[];function Nd(a){if(!Kd){var b=C.createEventObject,c="complete"==C.readyState,d="interactive"==C.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Kd=!0;for(var e=0;e<Md.length;e++)G(Md[e])}Md.push=function(){for(var g=0;g<arguments.length;g++)G(arguments[g]);return 0}}}function Od(){if(!Kd&&140>Ld){Ld++;try{C.documentElement.doScroll("left"),Nd()}catch(a){u.setTimeout(Od,50)}}}var Pd=function(a){Kd?a():Md.push(a)};var Qd={},Rd={},Sd=function(a,b,c,d){if(!Rd[a]||qc[b]||"__zone"===b)return-1;var e={};Ja(d)&&(e=f(d,e));e.id=c;e.status="timeout";return Rd[a].tags.push(e)-1},Td=function(a,b,c,d){if(Rd[a]){var e=Rd[a].tags[b];e&&(e.status=c,e.executionTime=d)}};function Ud(a){for(var b=Qd[a]||[],c=0;c<b.length;c++)b[c]();Qd[a]={push:function(d){d(nc.i,Rd[a])}}}
var Xd=function(a,b,c){Rd[a]={tags:[]};ja(b)&&Vd(a,b);c&&u.setTimeout(function(){return Ud(a)},Number(c));return Wd(a)},Vd=function(a,b){Qd[a]=Qd[a]||[];Qd[a].push(Ca(function(){return G(function(){b(nc.i,Rd[a])})}))};function Wd(a){var b=0,c=0,d=!1;return{add:function(){c++;return Ca(function(){b++;d&&b>=c&&Ud(a)})},sf:function(){d=!0;b>=c&&Ud(a)}}};var Yd=function(){function a(d){return!la(d)||0>d?0:d}if(!oc._li&&u.performance&&u.performance.timing){var b=u.performance.timing.navigationStart,c=la(cd.get("gtm.start"))?cd.get("gtm.start"):0;oc._li={cst:a(c-b),cbt:a(uc-b)}}};var be=!1,ce=function(){return u.GoogleAnalyticsObject&&u[u.GoogleAnalyticsObject]},de=!1;
var he=function(){},ge=function(){return u.GoogleAnalyticsObject||"ga"};var je=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var ke=/:[0-9]+$/,le=function(a,b,c){for(var d=a.split("&"),e=0;e<d.length;e++){var g=d[e].split("=");if(decodeURIComponent(g[0]).replace(/\+/g," ")===b){var h=g.slice(1).join("=");return c?h:decodeURIComponent(h).replace(/\+/g," ")}}},oe=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=me(a.protocol)||me(u.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:u.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&
(a.hostname=(a.hostname||u.location.hostname).replace(ke,"").toLowerCase());var g=b,h,k=me(a.protocol);g&&(g=String(g).toLowerCase());switch(g){case "url_no_fragment":h=ne(a);break;case "protocol":h=k;break;case "host":h=a.hostname.replace(ke,"").toLowerCase();if(c){var l=/^www\d*\./.exec(h);l&&l[0]&&(h=h.substr(l[0].length))}break;case "port":h=String(Number(a.port)||("http"==k?80:"https"==k?443:""));break;case "path":a.pathname||a.hostname||Bc("TAGGING",1);h="/"==a.pathname.substr(0,1)?a.pathname:
"/"+a.pathname;var m=h.split("/");0<=oa(d||[],m[m.length-1])&&(m[m.length-1]="");h=m.join("/");break;case "query":h=a.search.replace("?","");e&&(h=le(h,e,void 0));break;case "extension":var n=a.pathname.split(".");h=1<n.length?n[n.length-1]:"";h=h.split("/")[0];break;case "fragment":h=a.hash.replace("#","");break;default:h=a&&a.href}return h},me=function(a){return a?a.replace(":","").toLowerCase():""},ne=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");b=0>c?a.href:a.href.substr(0,c)}return b},
pe=function(a){var b=C.createElement("a");a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(a||Bc("TAGGING",1),c="/"+c);var d=b.hostname.replace(ke,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}};var ve=function(a){};function ue(a,b){a.containerId=nc.i;var c={type:"GENERIC",value:a};b.length&&(c.trace=b);return c};function we(a,b,c,d){var e=lb[a],g=xe(a,b,c,d);if(!g)return null;var h=ub(e[yb.Dd],c,[]);if(h&&h.length){var k=h[0];g=we(k.index,{J:g,U:1===k.Od?b.terminate:g,terminate:b.terminate},c,d)}return g}
function xe(a,b,c,d){function e(){if(g[yb.Ye])k();else{var w=vb(g,c,[]),y=Sd(c.id,String(g[yb.ka]),Number(g[yb.Ed]),w[yb.Ze]),x=!1;w.vtp_gtmOnSuccess=function(){if(!x){x=!0;var B=ya()-z;Vc(c.id,lb[a],"5");Td(c.id,y,"success",B);h()}};w.vtp_gtmOnFailure=function(){if(!x){x=!0;var B=ya()-z;Vc(c.id,lb[a],"6");Td(c.id,y,"failure",B);k()}};w.vtp_gtmTagId=g.tag_id;
w.vtp_gtmEventId=c.id;Vc(c.id,g,"1");var A=function(B){var E=ya()-z;ve(B);Vc(c.id,g,"7");Td(c.id,y,"exception",E);x||(x=!0,k())};var z=ya();try{tb(w,c)}catch(B){A(B)}}}var g=lb[a],h=b.J,k=b.U,l=b.terminate;if(c.Dc(g))return null;var m=ub(g[yb.Fd],c,[]);if(m&&m.length){var n=m[0],p=we(n.index,{J:h,U:k,terminate:l},c,d);if(!p)return null;h=p;k=2===n.Od?l:p}if(g[yb.Cd]||g[yb.$e]){var t=g[yb.Cd]?mb:c.Ug,q=h,r=k;if(!t[a]){e=Ca(e);var v=ye(a,t,e);h=v.J;k=v.U}return function(){t[a](q,r)}}return e}
function ye(a,b,c){var d=[],e=[];b[a]=ze(d,e,c);return{J:function(){b[a]=Ae;for(var g=0;g<d.length;g++)d[g]()},U:function(){b[a]=Be;for(var g=0;g<e.length;g++)e[g]()}}}function ze(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function Ae(a){a()}function Be(a,b){b()};var Ee=function(a,b){for(var c=[],d=0;d<lb.length;d++)if(a.fb[d]){var e=lb[d];var g=b.add();try{var h=we(d,{J:g,U:g,terminate:g},a,d);h?c.push({te:d,ie:wb(e),Uf:h}):(Ce(d,a),g())}catch(l){g()}}b.sf();c.sort(De);for(var k=0;k<c.length;k++)c[k].Uf();return 0<c.length};function De(a,b){var c,d=b.ie,e=a.ie;c=d>e?1:d<e?-1:0;var g;if(0!==c)g=c;else{var h=a.te,k=b.te;g=h>k?1:h<k?-1:0}return g}
function Ce(a,b){if(!Sc)return;var c=function(d){var e=b.Dc(lb[d])?"3":"4",g=ub(lb[d][yb.Dd],b,[]);g&&g.length&&c(g[0].index);Vc(b.id,lb[d],e);var h=ub(lb[d][yb.Fd],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var Fe=!1,Ge=function(a,b,c,d,e){if("gtm.js"==b){if(Fe)return!1;Fe=!0}Uc(a,b);var g=Xd(a,d,e);jd(a,"event",1);jd(a,"ecommerce",1);jd(a,"gtm");var h={id:a,name:b,Dc:Gd(c),fb:[],Ug:[],be:function(n){Bc("GTM",6);ve(n)}};h.fb=Cb(h);var k=Ee(h,g);
if(!k)return k;for(var l=0;l<h.fb.length;l++)if(h.fb[l]){var m=lb[l];if(m&&!qc[String(m[yb.ka])])return!0}return!1};var Ie=function(a,b,c,d,e){var g=this;this.eventModel=a;this.containerConfig=c||{};this.targetConfig=b||{};this.containerConfig=c||{};this.hb=d||{};this.globalConfig=e||{};this.getWithConfig=function(h){if(g.eventModel.hasOwnProperty(h))return g.eventModel[h];if(g.targetConfig.hasOwnProperty(h))return g.targetConfig[h];if(g.containerConfig.hasOwnProperty(h))return g.containerConfig[h];if(g.hb.hasOwnProperty(h))return g.hb[h];if(g.globalConfig.hasOwnProperty(h))return g.globalConfig[h]}};var Je={},Ke=["G"];Je.ue="";var Le=Je.ue.split(",");function Me(){var a=oc;return a.gcq=a.gcq||new Ne}
var Oe=function(a,b){Me().register(a,b,void 0)},Pe=function(a,b,c,d){Me().push("event",[b,a],c,d)},Qe=function(a,b){Me().push("config",[a],b)},Re={},Se=function(){this.status=1;this.containerConfig={};this.targetConfig={};this.hb={};this.je=null;this.Yd=!1},Te=function(a,b,c,d,e){this.type=a;this.Zg=b;this.O=c||"";this.Fb=d;this.defer=e},Ne=function(){this.Kd={};this.Td={};this.Za=[]},Ue=function(a,b){var c=kc(b);return a.Kd[c.containerId]=a.Kd[c.containerId]||new Se},Ve=function(a,b,c,d){if(d.O){var e=
Ue(a,d.O),g=e.je;if(g){var h=f(c),k=f(e.targetConfig[d.O]),l=f(e.containerConfig),m=f(e.hb),n=f(a.Td),p=new Ie(h,k,l,m,n);try{g(b,d.Zg,p)}catch(t){}}}};Ne.prototype.register=function(a,b,c){if(3!==Ue(this,a).status){Ue(this,a).je=b;Ue(this,a).status=3;c&&(Ue(this,a).hb=c);var d=kc(a),e=Re[d.containerId];if(void 0!==e){var g=bd("gtm.uniqueEventId"),h=d.prefix,k=ya()-e;if(Sc&&!Jc[g]){g!==Gc&&(Oc(),Gc=g);var l=""+h+Math.floor(k);Nc=Nc?Nc+"."+l:"&cl="+l}delete Re[d.containerId]}this.flush()}};
Ne.prototype.push=function(a,b,c,d){var e=Math.floor(ya()/1E3);if(c){var g=kc(c),h;if(h=g){var k;if(k=1===Ue(this,c).status)a:{var l=g.prefix;k=!0}h=k}if(h&&(Ue(this,c).status=2,this.push("require",[],g.containerId),Re[g.containerId]=ya(),!ld())){var m=encodeURIComponent(g.containerId);Lb(("http:"!=u.location.protocol?"https:":
"http:")+("//www.googletagmanager.com/gtag/js?id="+m+"&l=unifiedDataLayer&cx=c"))}}this.Za.push(new Te(a,e,c,b,d));d||this.flush()};
Ne.prototype.flush=function(a){for(var b=this;this.Za.length;){var c=this.Za[0];if(c.defer)c.defer=!1,this.Za.push(c);else switch(c.type){case "require":if(3!==Ue(this,c.O).status&&!a)return;break;case "set":ta(c.Fb[0],function(l,m){b.Td[l]=m});break;case "config":var d=c.Fb[0],e=!!d[H.wb];delete d[H.wb];var g=Ue(this,c.O),h=kc(c.O),k=h.containerId===h.id;e||(k?g.containerConfig={}:g.targetConfig[c.O]={});g.Yd&&e||Ve(this,H.W,d,c);g.Yd=!0;k?f(d,g.containerConfig):f(d,g.targetConfig[c.O]);break;case "event":Ve(this,
c.Fb[1],c.Fb[0],c)}this.Za.shift()}};var We=function(a,b,c){for(var d=[],e=String(b||document.cookie).split(";"),g=0;g<e.length;g++){var h=e[g].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d},Ze=function(a,b,c,d){var e=Xe(a,d);if(1===e.length)return e[0].id;if(0!==e.length){e=Ye(e,function(g){return g.Kb},b);if(1===e.length)return e[0].id;e=Ye(e,function(g){return g.gb},c);return e[0]?e[0].id:void 0}};
function $e(a,b,c){var d=document.cookie;document.cookie=a;var e=document.cookie;return d!=e||void 0!=c&&0<=We(b,e).indexOf(c)}
var df=function(a,b,c,d,e,g){d=d||"auto";var h={path:c||"/"};e&&(h.expires=e);"none"!==d&&(h.domain=d);var k;a:{var l=b,m;if(void 0==l)m=a+"=deleted; expires="+(new Date(0)).toUTCString();else{g&&(l=encodeURIComponent(l));var n=l;n&&1200<n.length&&(n=n.substring(0,1200));l=n;m=a+"="+l}var p=void 0,t=void 0,q;for(q in h)if(h.hasOwnProperty(q)){var r=h[q];if(null!=r)switch(q){case "secure":r&&(m+="; secure");break;case "domain":p=r;break;default:"path"==q&&(t=r),"expires"==q&&r instanceof Date&&(r=
r.toUTCString()),m+="; "+q+"="+r}}if("auto"===p){for(var v=bf(),w=0;w<v.length;++w){var y="none"!=v[w]?v[w]:void 0;if(!cf(y,t)&&$e(m+(y?"; domain="+y:""),a,l)){k=!0;break a}}k=!1}else p&&"none"!=p&&(m+="; domain="+p),k=!cf(p,t)&&$e(m,a,l)}return k};function Ye(a,b,c){for(var d=[],e=[],g,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===g||l<g?(e=[k],g=l):l===g&&e.push(k)}return 0<d.length?d:e}
function Xe(a,b){for(var c=[],d=We(a),e=0;e<d.length;e++){var g=d[e].split("."),h=g.shift();if(!b||-1!==b.indexOf(h)){var k=g.shift();k&&(k=k.split("-"),c.push({id:g.join("."),Kb:1*k[0]||1,gb:1*k[1]||1}))}}return c}
var ef=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,ff=/(^|\.)doubleclick\.net$/i,cf=function(a,b){return ff.test(document.location.hostname)||"/"===b&&ef.test(a)},bf=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));var e=document.location.hostname;ff.test(e)||ef.test(e)||a.push("none");return a};var gf=new function(){this.Pc={}};var hf="".split(/,/),jf=null,kf={},lf={},mf,nf=function(a,b){var c={event:a};b&&(c.eventModel=f(b),b[H.ac]&&(c.eventCallback=b[H.ac]),b[H.Na]&&(c.eventTimeout=b[H.Na]));return c};
var tf={config:function(a){},event:function(a){var b=
a[1];if(ka(b)&&!(3<a.length)){var c;if(2<a.length){if(!Ja(a[2]))return;c=a[2]}var d=nf(b,c);return d}},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(a){if(3===a.length){var b=a[1],c=a[2];gf.Pc[b]?gf.Pc[b].push(c):gf.Pc[b]=[c]}},set:function(a){var b;2==a.length&&Ja(a[1])?b=f(a[1]):3==a.length&&ka(a[1])&&(b={},b[a[1]]=a[2]);if(b){b._clear=!0;return b}}},uf={policy:!0};var wf=function(a){return vf?C.querySelectorAll(a):null},xf=function(a,b){if(!vf)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!C.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},yf=!1;if(C.querySelectorAll)try{var zf=C.querySelectorAll(":root");zf&&1==zf.length&&zf[0]==C.documentElement&&(yf=!0)}catch(a){}var vf=yf;var Gf=function(a){if(Ff(a))return a;this.bh=a};Gf.prototype.ag=function(){return this.bh};var Ff=function(a){return!a||"object"!==Ha(a)||Ja(a)?!1:"getUntrustedUpdateValue"in a};Gf.prototype.getUntrustedUpdateValue=Gf.prototype.ag;var Hf=!1,If=[];function Jf(){if(!Hf){Hf=!0;for(var a=0;a<If.length;a++)G(If[a])}}var Kf=function(a){Hf?G(a):If.push(a)};var Lf=[],Mf=!1,Nf=function(a){return u["unifiedDataLayer"].push(a)},Of=function(a){var b=oc["unifiedDataLayer"],c=b?b.subscribers:1,d=0;return function(){++d===c&&a()}},Qf=function(a){var b=a._clear;ta(a,function(g,h){"_clear"!==g&&(b&&id(g,void 0),id(g,h))});tc||(tc=a["gtm.start"]);var c=a.event;if(!c)return!1;var d=a["gtm.uniqueEventId"];d||(d=zc(),a["gtm.uniqueEventId"]=d,id("gtm.uniqueEventId",d));vc=c;var e=Pf(a);
vc=null;switch(c){case "gtm.init":Bc("GTM",19),e&&Bc("GTM",20)}return e};function Pf(a){var b=a.event,c=a["gtm.uniqueEventId"],d,e=oc.zones;d=e?e.checkState(nc.i,c):Id;return d.active?Ge(c,b,d.isWhitelisted,a.eventCallback,a.eventTimeout)?!0:!1:!1}
var Rf=function(){for(var a=!1;!Mf&&0<Lf.length;){Mf=!0;delete Yc.eventModel;ad();var b=Lf.shift();if(null!=b){var c=Ff(b);if(c){var d=b;b=Ff(d)?d.getUntrustedUpdateValue():void 0;for(var e=["gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],g=0;g<e.length;g++){var h=e[g],k=bd(h,1);if(ma(k)||Ja(k))k=f(k);Zc[h]=k}}try{if(ja(b))try{b.call(cd)}catch(v){}else if(ma(b)){var l=b;if(ka(l[0])){var m=
l[0].split("."),n=m.pop(),p=l.slice(1),t=bd(m.join("."),2);if(void 0!==t&&null!==t)try{t[n].apply(t,p)}catch(v){}}}else{var q=b;if(q&&("[object Arguments]"==Object.prototype.toString.call(q)||Object.prototype.hasOwnProperty.call(q,"callee"))){a:{if(b.length&&ka(b[0])){var r=tf[b[0]];if(r&&(!c||!uf[b[0]])){b=r(b);break a}}b=void 0}if(!b){Mf=!1;continue}}a=Qf(b)||a}}finally{c&&ad(!0)}}Mf=!1}
return!a},Sf=function(){var a=Rf();try{var b=nc.i,c=u["unifiedDataLayer"].hide;if(c&&void 0!==c[b]&&c.end){c[b]=!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}}catch(g){}return a},Tf=function(){var a=Jb("unifiedDataLayer",[]),b=Jb("google_tag_manager",{});b=b["unifiedDataLayer"]=b["unifiedDataLayer"]||{};Pd(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Kf(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});b.subscribers=(b.subscribers||
0)+1;var c=a.push;a.push=function(){var d;if(0<oc.SANDBOXED_JS_SEMAPHORE){d=[];for(var e=0;e<arguments.length;e++)d[e]=new Gf(arguments[e])}else d=[].slice.call(arguments,0);var g=c.apply(a,d);Lf.push.apply(Lf,d);if(300<this.length)for(Bc("GTM",4);300<this.length;)this.shift();var h="boolean"!==typeof g||g;return Rf()&&h};Lf.push.apply(Lf,a.slice(0));G(Sf)};var Uf;var pg={};pg.yb=new String("undefined");
var qg=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===pg.yb?b:a[d]);return c.join("")}};qg.prototype.toString=function(){return this.resolve("undefined")};qg.prototype.valueOf=qg.prototype.toString;pg.bf=qg;pg.nc={};pg.Mf=function(a){return new qg(a)};var rg={};pg.Lg=function(a,b){var c=zc();rg[c]=[a,b];return c};pg.Ld=function(a){var b=a?0:1;return function(c){var d=rg[c];if(d&&"function"===typeof d[b])d[b]();rg[c]=void 0}};pg.ng=function(a){for(var b=!1,c=!1,
d=2;d<a.length;d++)b=b||8===a[d],c=c||16===a[d];return b&&c};pg.zg=function(a){if(a===pg.yb)return a;var b=zc();pg.nc[b]=a;return'google_tag_manager["'+nc.i+'"].macro('+b+")"};pg.rg=function(a,b,c){a instanceof pg.bf&&(a=a.resolve(pg.Lg(b,c)),b=ia);return{Bc:a,J:b}};var sg=function(a,b,c){function d(g,h){var k=g[h];return k}var e={event:b,"gtm.element":a,"gtm.elementClasses":d(a,"className"),"gtm.elementId":a["for"]||Qb(a,"id")||"","gtm.elementTarget":a.formTarget||d(a,"target")||""};c&&(e["gtm.triggers"]=c.join(","));e["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||d(a,"href")||a.src||a.code||a.codebase||
"";return e},tg=function(a){oc.hasOwnProperty("autoEventsSettings")||(oc.autoEventsSettings={});var b=oc.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},ug=function(a,b,c){tg(a)[b]=c},vg=function(a,b,c,d){var e=tg(a),g=za(e,b,d);e[b]=c(g)},wg=function(a,b,c){var d=tg(a);return za(d,b,c)};var xg=function(){for(var a=Hb.userAgent+(C.cookie||"")+(C.referrer||""),b=a.length,c=u.history.length;0<c;)a+=c--^b++;var d=1,e,g,h;if(a)for(d=0,g=a.length-1;0<=g;g--)h=a.charCodeAt(g),d=(d<<6&268435455)+h+(h<<14),e=d&266338304,d=0!=e?d^e>>21:d;return[Math.round(2147483647*Math.random())^d&2147483647,Math.round(ya()/1E3)].join(".")},Ag=function(a,b,c,d){var e=yg(b);return Ze(a,e,zg(c),d)},Bg=function(a,b,c,d){var e=""+yg(c),g=zg(d);1<g&&(e+="-"+g);return[b,e,a].join(".")},yg=function(a){if(!a)return 1;
a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},zg=function(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};var Cg=["1"],Dg={},Hg=function(a,b,c,d){var e=Eg(a);Dg[e]||Fg(e,b,c)||(Gg(e,xg(),b,c,d),Fg(e,b,c))};function Gg(a,b,c,d,e){var g=Bg(b,"1",d,c);df(a,g,c,d,0==e?void 0:new Date(ya()+1E3*(void 0==e?7776E3:e)))}function Fg(a,b,c){var d=Ag(a,b,c,Cg);d&&(Dg[a]=d);return d}function Eg(a){return(a||"_gcl")+"_au"};var Ig=function(){for(var a=[],b=C.cookie.split(";"),c=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,d=0;d<b.length;d++){var e=b[d].match(c);e&&a.push({$c:e[1],value:e[2]})}var g={};if(!a||!a.length)return g;for(var h=0;h<a.length;h++){var k=a[h].value.split(".");"1"==k[0]&&3==k.length&&k[1]&&(g[a[h].$c]||(g[a[h].$c]=[]),g[a[h].$c].push({timestamp:k[1],Yf:k[2]}))}return g};function Jg(){for(var a=Kg,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function Lg(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}
var Kg,Mg,Ng=function(a){Kg=Kg||Lg();Mg=Mg||Jg();for(var b=[],c=0;c<a.length;c+=3){var d=c+1<a.length,e=c+2<a.length,g=a.charCodeAt(c),h=d?a.charCodeAt(c+1):0,k=e?a.charCodeAt(c+2):0,l=g>>2,m=(g&3)<<4|h>>4,n=(h&15)<<2|k>>6,p=k&63;e||(p=64,d||(n=64));b.push(Kg[l],Kg[m],Kg[n],Kg[p])}return b.join("")},Og=function(a){function b(l){for(;d<a.length;){var m=a.charAt(d++),n=Mg[m];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(m))throw Error("Unknown base64 encoding at char: "+m);}return l}Kg=Kg||Lg();Mg=Mg||
Jg();for(var c="",d=0;;){var e=b(-1),g=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|g>>4);64!=h&&(c+=String.fromCharCode(g<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var Pg;function Qg(a,b){if(!a||b===C.location.hostname)return!1;for(var c=0;c<a.length;c++)if(a[c]instanceof RegExp){if(a[c].test(b))return!0}else if(0<=b.indexOf(a[c]))return!0;return!1}
var Ug=function(){var a=Rg,b=Sg,c=Tg(),d=function(h){a(h.target||h.srcElement||{})},e=function(h){b(h.target||h.srcElement||{})};if(!c.init){D(C,"mousedown",d);D(C,"keyup",d);D(C,"submit",e);var g=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){b(this);g.call(this)};c.init=!0}},Tg=function(){var a=Jb("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var Vg=/(.*?)\*(.*?)\*(.*)/,Wg=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,Xg=/^(?:www\.|m\.|amp\.)+/,Yg=/([^?#]+)(\?[^#]*)?(#.*)?/,Zg=/(.*?)(^|&)_gl=([^&]*)&?(.*)/,ah=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()&&(b.push(c),b.push(Ng(String(d))))}var e=b.join("*");return["1",$g(e),e].join("*")},$g=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||
window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=Pg)){for(var e=Array(256),g=0;256>g;g++){for(var h=g,k=0;8>k;k++)h=h&1?h>>>1^3988292384:h>>>1;e[g]=h}d=e}Pg=d;for(var l=4294967295,m=0;m<c.length;m++)l=l>>>8^Pg[(l^c.charCodeAt(m))&255];return((l^-1)>>>0).toString(36)},ch=function(){return function(a){var b=pe(u.location.href),c=b.search.replace("?",""),d=le(c,"_gl",!0)||"";a.query=bh(d)||{};var e=oe(b,"fragment").match(Zg);a.fragment=bh(e&&e[3]||
"")||{}}},dh=function(){var a=ch(),b=Tg();b.data||(b.data={query:{},fragment:{}},a(b.data));var c={},d=b.data;d&&(Da(c,d.query),Da(c,d.fragment));return c},bh=function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var g=Vg.exec(d);if(g){c=g;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var m=h[2],n=0;n<b;++n)if(m===$g(k,n)){l=!0;break a}l=!1}if(l){for(var p={},t=k?k.split("*"):[],q=0;q<t.length;q+=2)p[t[q]]=Og(t[q+1]);return p}}}}catch(r){}};
function eh(a,b,c){function d(m){var n=m,p=Zg.exec(n),t=n;if(p){var q=p[2],r=p[4];t=p[1];r&&(t=t+q+r)}m=t;var v=m.charAt(m.length-1);m&&"&"!==v&&(m+="&");return m+l}c=void 0===c?!1:c;var e=Yg.exec(b);if(!e)return"";var g=e[1],h=e[2]||"",k=e[3]||"",l="_gl="+a;c?k="#"+d(k.substring(1)):h="?"+d(h.substring(1));return""+g+h+k}
function fh(a,b,c){for(var d={},e={},g=Tg().decorators,h=0;h<g.length;++h){var k=g[h];(!c||k.forms)&&Qg(k.domains,b)&&(k.fragment?Da(e,k.callback()):Da(d,k.callback()))}if(Ea(d)){var l=ah(d);if(c){if(a&&a.action){var m=(a.method||"").toLowerCase();if("get"===m){for(var n=a.childNodes||[],p=!1,t=0;t<n.length;t++){var q=n[t];if("_gl"===q.name){q.setAttribute("value",l);p=!0;break}}if(!p){var r=C.createElement("input");r.setAttribute("type","hidden");r.setAttribute("name","_gl");r.setAttribute("value",
l);a.appendChild(r)}}else if("post"===m){var v=eh(l,a.action);je.test(v)&&(a.action=v)}}}else gh(l,a,!1)}if(!c&&Ea(e)){var w=ah(e);gh(w,a,!0)}}function gh(a,b,c){if(b.href){var d=eh(a,b.href,void 0===c?!1:c);je.test(d)&&(b.href=d)}}
var Rg=function(a){try{var b;a:{for(var c=a,d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var g=e.protocol;"http:"!==g&&"https:"!==g||fh(e,e.hostname,!1)}}catch(h){}},Sg=function(a){try{if(a.action){var b=oe(pe(a.action),"host");fh(a,b,!0)}}catch(c){}},hh=function(a,b,c,d){Ug();var e={callback:a,domains:b,fragment:"fragment"===c,forms:!!d};Tg().decorators.push(e)},ih=function(){var a=C.location.hostname,b=Wg.exec(C.referrer);if(!b)return!1;
var c=b[2],d=b[1],e="";if(c){var g=c.split("/"),h=g[1];e="s"===h?decodeURIComponent(g[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}var k=a.replace(Xg,""),l=e.replace(Xg,""),m;if(!(m=k===l)){var n="."+l;m=k.substring(k.length-n.length,k.length)===n}return m},jh=function(a,b){return!1===a?!1:a||b||ih()};var kh={};var lh=/^\w+$/,mh=/^[\w-]+$/,nh=/^~?[\w-]+$/,oh={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha"};function ph(a){return a&&"string"==typeof a&&a.match(lh)?a:"_gcl"}var rh=function(){var a=pe(u.location.href),b=oe(a,"query",!1,void 0,"gclid"),c=oe(a,"query",!1,void 0,"gclsrc"),d=oe(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||le(e,"gclid",void 0);c=c||le(e,"gclsrc",void 0)}return qh(b,c,d)};
function qh(a,b,c){var d={},e=function(g,h){d[h]||(d[h]=[]);d[h].push(g)};if(void 0!==a&&a.match(mh))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "3p.ds":(void 0==kh.gtm_3pds?0:kh.gtm_3pds)&&e(a,"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha")}c&&e(c,"dc");return d}var th=function(a){var b=rh();sh(b,a)};
function sh(a,b,c){function d(p,t){var q=uh(p,e);q&&df(q,t,h,g,l,!0)}b=b||{};var e=ph(b.prefix),g=b.domain||"auto",h=b.path||"/",k=void 0==b.Kc?7776E3:b.Kc;c=c||ya();var l=0==k?void 0:new Date(c+1E3*k),m=Math.round(c/1E3),n=function(p){return["GCL",m,p].join(".")};a.aw&&(!0===b.Gh?d("aw",n("~"+a.aw[0])):d("aw",n(a.aw[0])));a.dc&&d("dc",n(a.dc[0]));a.gf&&d("gf",n(a.gf[0]));a.ha&&d("ha",n(a.ha[0]))}
var wh=function(a,b,c,d,e){for(var g=dh(),h=ph(b),k=0;k<a.length;++k){var l=a[k];if(void 0!==oh[l]){var m=uh(l,h),n=g[m];if(n){var p=Math.min(vh(n),ya()),t;b:{for(var q=p,r=We(m,C.cookie),v=0;v<r.length;++v)if(vh(r[v])>q){t=!0;break b}t=!1}t||df(m,n,c,d,0==e?void 0:new Date(p+1E3*(null==e?7776E3:e)),!0)}}}var w={prefix:b,path:c,domain:d};sh(qh(g.gclid,g.gclsrc),w)},uh=function(a,b){var c=oh[a];if(void 0!==c)return b+c},vh=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||
0)};function xh(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var yh=function(a,b,c,d,e){if(ma(b)){var g=ph(e);hh(function(){for(var h={},k=0;k<a.length;++k){var l=uh(a[k],g);if(l){var m=We(l,C.cookie);m.length&&(h[l]=m.sort()[m.length-1])}}return h},b,c,d)}},zh=function(a){return a.filter(function(b){return nh.test(b)})},Ah=function(a){for(var b=["aw","dc"],c=ph(a&&a.prefix),d={},e=0;e<b.length;e++)oh[b[e]]&&(d[b[e]]=oh[b[e]]);ta(d,function(g,h){var k=We(c+h,C.cookie);if(k.length){var l=k[0],m=vh(l),n={};n[g]=[xh(l)];sh(n,a,m)}})};var Bh=/^\d+\.fls\.doubleclick\.net$/;function Ch(a){var b=pe(u.location.href),c=oe(b,"host",!1);if(c&&c.match(Bh)){var d=oe(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function Dh(a,b){if("aw"==a||"dc"==a){var c=Ch("gcl"+a);if(c)return c.split(".")}var d=ph(b);if("_gcl"==d){var e;e=rh()[a]||[];if(0<e.length)return e}var g=uh(a,d),h;if(g){var k=[];if(C.cookie){var l=We(g,C.cookie);if(l&&0!=l.length){for(var m=0;m<l.length;m++){var n=xh(l[m]);n&&-1===oa(k,n)&&k.push(n)}h=zh(k)}else h=k}else h=k}else h=[];return h}
var Eh=function(){var a=Ch("gac");if(a)return decodeURIComponent(a);var b=Ig(),c=[];ta(b,function(d,e){for(var g=[],h=0;h<e.length;h++)g.push(e[h].Yf);g=zh(g);g.length&&c.push(d+":"+g.join(","))});return c.join(";")},Fh=function(a,b,c,d,e){Hg(b,c,d,e);var g=Dg[Eg(b)],h=rh().dc||[],k=!1;if(g&&0<h.length){var l=oc.joined_au=oc.joined_au||{},m=b||"_gcl";if(!l[m])for(var n=0;n<h.length;n++){var p="https://adservice.google.com/ddm/regclk",t=p=p+"?gclid="+h[n]+"&auiddc="+g;Hb.sendBeacon&&Hb.sendBeacon(t)||Ob(t);k=l[m]=
!0}}null==a&&(a=k);if(a&&g){var q=Eg(b),r=Dg[q];r&&Gg(q,r,c,d,e)}};var Gh;if(3===nc.Cb.length)Gh="g";else{var Ih="G";Gh=Ih}
var Jh={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:Gh,OPT:"o"},Kh=function(a){var b=nc.i.split("-"),c=b[0].toUpperCase(),d=Jh[c]||"i",e=a&&"GTM"===c?b[1]:"OPT"===c?b[1]:"",g;if(3===nc.Cb.length){var h=void 0;g="2"+(h||"w")}else g=
"";return g+d+nc.Cb+e};
var Lh=function(a){return!(void 0===a||null===a||0===(a+"").length)},Mh=function(a,b){var c;if(2===b.M)return a("ord",qa(1E11,1E13)),!0;if(3===b.M)return a("ord","1"),a("num",qa(1E11,1E13)),!0;if(4===b.M)return Lh(b.sessionId)&&a("ord",b.sessionId),!0;if(5===b.M)c="1";else if(6===b.M)c=b.Uc;else return!1;Lh(c)&&a("qty",c);Lh(b.Hb)&&a("cost",b.Hb);Lh(b.transactionId)&&a("ord",b.transactionId);return!0},Nh=encodeURIComponent,Oh=function(a,b){function c(n,p,t){g.hasOwnProperty(n)||(p+="",e+=";"+n+"="+
(t?p:Nh(p)))}var d=a.yc,e=a.protocol;e+=a.Sb?"//"+d+".fls.doubleclick.net/activityi":"//ad.doubleclick.net/activity";e+=";src="+Nh(d)+(";type="+Nh(a.Ac))+(";cat="+Nh(a.Ya));var g=a.Of||{};ta(g,function(n,p){e+=";"+Nh(n)+"="+Nh(p+"")});if(Mh(c,a)){Lh(a.Yb)&&c("u",a.Yb);Lh(a.Xb)&&c("tran",a.Xb);c("gtm",Kh());!1===a.nf&&c("npa","1");if(a.wc){var h=Dh("dc",a.Aa);h&&h.length&&c("gcldc",h.join("."));var k=Dh("aw",a.Aa);k&&k.length&&c("gclaw",k.join("."));var l=Eh();l&&c("gac",l);Hg(a.Aa,void 0,a.Kf,a.Lf);
var m=Dg[Eg(a.Aa)];m&&c("auiddc",m)}Lh(a.Qc)&&c("prd",a.Qc,!0);ta(a.bd,function(n,p){c(n,p)});e+=b||"";Lh(a.Qb)&&c("~oref",a.Qb);a.Sb?Nb(e+"?",a.J):Ob(e+"?",a.J,a.U)}else G(a.U)};var Ph=["input","select","textarea"],Qh=["button","hidden","image","reset","submit"],Rh=function(a){var b=a.tagName.toLowerCase();return!pa(Ph,function(c){return c===b})||"input"===b&&pa(Qh,function(c){return c===a.type.toLowerCase()})?!1:!0},Sh=function(a){return a.form?a.form.tagName?a.form:C.getElementById(a.form):Tb(a,["form"],100)},Th=function(a,b,c){if(!a.elements)return 0;for(var d=b.getAttribute(c),e=0,g=1;e<a.elements.length;e++){var h=a.elements[e];if(Rh(h)){if(h.getAttribute(c)===d)return g;
g++}}return 0};var Wh=!!u.MutationObserver,Xh=void 0,Yh=function(a){if(!Xh){var b=function(){var c=C.body;if(c)if(Wh)(new MutationObserver(function(){for(var e=0;e<Xh.length;e++)G(Xh[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;D(c,"DOMNodeInserted",function(){d||(d=!0,G(function(){d=!1;for(var e=0;e<Xh.length;e++)G(Xh[e])}))})}};Xh=[];C.body?b():G(b)}Xh.push(a)};var zi=u.clearTimeout,Ai=u.setTimeout,K=function(a,b,c){if(ld()){b&&G(b)}else return Lb(a,b,c)},Bi=function(){return u.location.href},Ci=function(a){return oe(pe(a),"fragment")},Di=function(a){return ne(pe(a))},Ei=null;
var Fi=function(a,b){return bd(a,b||2)},Gi=function(a,b,c){b&&(a.eventCallback=b,c&&(a.eventTimeout=c));return Nf(a)},Hi=function(a,b){u[a]=b},W=function(a,b,c){b&&(void 0===u[a]||c&&!u[a])&&(u[a]=b);return u[a]},Ii=function(a,b,c){return We(a,b,void 0===c?!0:!!c)},Ji=function(a,b,c,d){var e={prefix:a,path:b,domain:c,Kc:d};th(e);Ah(e)},Ki=function(a,b,c,d,e){wh(a,b,c,d,e);},Li=function(a,b,c,d,e){
yh(a,b,c,d,e);},Mi=function(a,b){if(ld()){b&&G(b)}else Nb(a,b)},Ni=function(a){return!!wg(a,"init",!1)},Oi=function(a){ug(a,"init",!0)},Pi=function(a,b,c){var d=(void 0===c?0:c)?"www.googletagmanager.com/gtag/js":sc;d+="?id="+encodeURIComponent(a)+"&l=unifiedDataLayer";b&&ta(b,function(e,g){g&&(d+="&"+e+"="+encodeURIComponent(g))});K(J("https://","http://",d))},Qi=function(a,b){var c=a[b];
return c};
var Si=pg.rg;var Ti=new ra,Ui=function(a,b){function c(h){var k=pe(h),l=oe(k,"protocol"),m=oe(k,"host",!0),n=oe(k,"port"),p=oe(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==n||"https"==l&&"443"==n)l="web",n="default";return[l,m,n,p]}for(var d=c(String(a)),e=c(String(b)),g=0;g<d.length;g++)if(d[g]!==e[g])return!1;return!0},Vi=function(a){var b=a.arg0,c=a.arg1;if(a.any_of&&ma(c)){for(var d=0;d<c.length;d++)if(Vi({"function":a["function"],arg0:b,arg1:c[d]}))return!0;return!1}switch(a["function"]){case "_cn":return 0<=
String(b).indexOf(String(c));case "_css":var e;a:{if(b){var g=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var h=0;h<g.length;h++)if(b[g[h]]){e=b[g[h]](c);break a}}catch(v){}}e=!1}return e;case "_ew":var k,l;k=String(b);l=String(c);var m=k.length-l.length;return 0<=m&&k.indexOf(l,m)==m;case "_eq":return String(b)==String(c);case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var n;n=String(b).split(",");
return 0<=oa(n,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var p;var t=a.ignore_case?"i":void 0;try{var q=String(c)+t,r=Ti.get(q);r||(r=new RegExp(c,t),Ti.set(q,r));p=r.test(b)}catch(v){p=!1}return p;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return Ui(b,c)}return!1};var Xi={},Yi=function(){if(u._gtmexpgrp&&u._gtmexpgrp.hasOwnProperty(1))return u._gtmexpgrp[1];void 0===Xi[1]&&(Xi[1]=Math.floor(2*Math.random()));return Xi[1]};var Zi=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var $i={},aj=encodeURI,X=encodeURIComponent,bj=Ob;var cj=function(a,b){if(!a)return!1;var c=oe(pe(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var g=c.length-e.length;0<g&&"."!=e.charAt(0)&&(g--,e="."+e);if(0<=g&&c.indexOf(e,g)==g)return!0}}return!1};
var dj=function(a,b,c){for(var d={},e=!1,g=0;a&&g<a.length;g++)a[g]&&a[g].hasOwnProperty(b)&&a[g].hasOwnProperty(c)&&(d[a[g][b]]=a[g][c],e=!0);return e?d:null};$i.og=function(){var a=!1;return a};var Dj=function(){var a=u.gaGlobal=u.gaGlobal||{};a.hid=a.hid||qa();return a.hid};var mk=window,nk=document,ok=function(a){var b=mk._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===mk["ga-disable-"+a])return!0;try{var c=mk.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(g){}for(var d=We("AMP_TOKEN",nk.cookie,!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return nk.getElementById("__gaOptOutExtension")?!0:!1};var tk=function(a,b,c){Pe(b,c,a)},uk=function(a,b,c){Pe(b,c,a,!0)},wk=function(a,b){},vk=function(a,b){},
xk=function(a){return"_"===a.charAt(0)},yk=function(a){ta(a,function(c){xk(c)&&delete a[c]});var b=a[H.xb]||{};ta(b,function(c){xk(c)&&delete b[c]})};var Z={a:{}};


Z.a.jsm=["customScripts"],function(){(function(a){Z.__jsm=a;Z.__jsm.b="jsm";Z.__jsm.g=!0;Z.__jsm.priorityOverride=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=W("google_tag_manager");return c&&c.e&&c.e(b)}catch(d){}}})}();
Z.a.flc=[],function(){function a(b,c){c=c?c.slice(0,-1):void 0;Oh(b,c)}(function(b){Z.__flc=b;Z.__flc.b="flc";Z.__flc.g=!0;Z.__flc.priorityOverride=0})(function(b){var c=!b.hasOwnProperty("vtp_enableConversionLinker")||b.vtp_enableConversionLinker,d=dj(b.vtp_customVariable||[],"key","value")||{},e={Ya:b.vtp_activityTag,wc:c,Aa:b.vtp_conversionCookiePrefix||void 0,Hb:void 0,M:{UNIQUE:3,SESSION:4}[b.vtp_ordinalType]||2,yc:b.vtp_advertiserId,Ac:b.vtp_groupTag,U:b.vtp_gtmOnFailure,J:b.vtp_gtmOnSuccess,
Qb:b.vtp_useImageTag?void 0:b.vtp_url,protocol:"",Uc:void 0,Sb:!b.vtp_useImageTag,sessionId:b.vtp_sessionId,Xb:b.vtp_transactionVariable,transactionId:void 0,Yb:b.vtp_userVariable,bd:d};if(b.vtp_enableAttribution){var g=b.vtp_attributionFields||[];if(g.length){K("//www.gstatic.com/attribution/collection/attributiontools.js",function(){a(e,W("google_attr").build([dj(g,"key","value")||{}]))},b.vtp_gtmOnFailure);return}}a(e)})}();
Z.a.sp=["google"],function(){(function(a){Z.__sp=a;Z.__sp.b="sp";Z.__sp.g=!0;Z.__sp.priorityOverride=0})(function(a){var b=void 0,c="//www.googleadservices.com/pagead/conversion_async.js";var d=a.vtp_gtmOnFailure;Yd();K(c,function(){var e=W("google_trackConversion");
if(ja(e)){var g={};"DATA_LAYER"==a.vtp_customParamsFormat?g=a.vtp_dataLayerVariable:"USER_SPECIFIED"==a.vtp_customParamsFormat&&(g=dj(a.vtp_customParams,"key","value"));var h={};a.vtp_enableDynamicRemarketing&&(a.vtp_eventName&&(g.event=a.vtp_eventName),a.vtp_eventValue&&(h.value=a.vtp_eventValue),a.vtp_eventItems&&(h.items=a.vtp_eventItems));var k={google_conversion_id:a.vtp_conversionId,google_conversion_label:a.vtp_conversionLabel,google_custom_params:g,google_gtag_event_data:h,google_remarketing_only:!0,
onload_callback:a.vtp_gtmOnSuccess,google_gtm:Kh()};b&&(k.google_additional_conversion_params=b);e(k)||d()}else d()},d)})}();
Z.a.e=["google"],function(){(function(a){Z.__e=a;Z.__e.b="e";Z.__e.g=!0;Z.__e.priorityOverride=0})(function(a){return String(kd(a.vtp_gtmEventId,"event"))})}();
Z.a.f=["google"],function(){(function(a){Z.__f=a;Z.__f.b="f";Z.__f.g=!0;Z.__f.priorityOverride=0})(function(a){var b=Fi("gtm.referrer",1)||C.referrer;return b?a.vtp_component&&"URL"!=a.vtp_component?oe(pe(String(b)),a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey):Di(String(b)):String(b)})}();Z.a.k=["google"],function(){(function(a){Z.__k=a;Z.__k.b="k";Z.__k.g=!0;Z.__k.priorityOverride=0})(function(a){return Ii(a.vtp_name,Fi("gtm.cookie",1),!!a.vtp_decodeCookie)[0]})}();
Z.a.r=["google"],function(){(function(a){Z.__r=a;Z.__r.b="r";Z.__r.g=!0;Z.__r.priorityOverride=0})(function(a){return qa(a.vtp_min,a.vtp_max)})}();
Z.a.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){Z.__u=b;Z.__u.b="u";Z.__u.g=!0;Z.__u.priorityOverride=0})(function(b){var c;c=(c=b.vtp_customUrlSource?b.vtp_customUrlSource:Fi("gtm.url",1))||Bi();var d=b[a("vtp_component")];if(!d||"URL"==d)return Di(String(c));var e=pe(String(c)),g;if("QUERY"===d)a:{var h=b[a("vtp_multiQueryKeys").toString()],k=b[a("vtp_queryKey").toString()]||"",l=b[a("vtp_ignoreEmptyQueryParam").toString()],m;m=h?ma(k)?k:String(k).replace(/\s+/g,
"").split(","):[String(k)];for(var n=0;n<m.length;n++){var p=oe(e,"QUERY",void 0,void 0,m[n]);if(void 0!=p&&(!l||""!==p)){g=p;break a}}g=void 0}else g=oe(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,void 0);return g})}();
Z.a.v=["google"],function(){(function(a){Z.__v=a;Z.__v.b="v";Z.__v.g=!0;Z.__v.priorityOverride=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=Fi(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();




Z.a.gclidw=["google"],function(){var a=["aw","dc","gf","ha"];(function(b){Z.__gclidw=b;Z.__gclidw.b="gclidw";Z.__gclidw.g=!0;Z.__gclidw.priorityOverride=100})(function(b){G(b.vtp_gtmOnSuccess);var c,d,e;b.vtp_enableCookieOverrides&&(e=b.vtp_cookiePrefix,c=b.vtp_path,d=b.vtp_domain);var g=null;b.vtp_enableCookieUpdateFeature&&(g=!0,void 0!==b.vtp_cookieUpdate&&(g=!!b.vtp_cookieUpdate));var h=e,k=c,l=d;b.vtp_enableCrossDomainFeature&&(b.vtp_enableCrossDomain&&!1===b.vtp_acceptIncoming||(b.vtp_enableCrossDomain||
ih())&&Ki(a,h,k,l));Ji(e,c,d);Fh(g,e,c,d);var m=e;if(b.vtp_enableCrossDomainFeature&&b.vtp_enableCrossDomain&&b.vtp_linkerDomains){var n=b.vtp_linkerDomains.toString().replace(/\s+/g,"").split(",");Li(a,n,b.vtp_urlPosition,!!b.vtp_formDecoration,m)}})}();


Z.a.awct=["google"],function(){var a=!1,b=[],c=function(k){var l=W("google_trackConversion"),m=k.gtm_onFailure;"function"==typeof l?l(k)||m():m()},d=function(){for(;0<b.length;)c(b.shift())},e=function(){return function(){d();a=!1}},g=function(){return function(){d();b={push:c};}},h=function(k){Yd();var l={google_basket_transaction_type:"purchase",google_conversion_domain:"",google_conversion_id:k.vtp_conversionId,google_conversion_label:k.vtp_conversionLabel,
google_conversion_value:k.vtp_conversionValue||0,google_remarketing_only:!1,onload_callback:k.vtp_gtmOnSuccess,gtm_onFailure:k.vtp_gtmOnFailure,google_gtm:Kh()},m=function(v){return function(w,y,x){var A="DATA_LAYER"==v?Fi(x):k[y];A&&(l[w]=A)}},n=m("JSON");n("google_conversion_currency","vtp_currencyCode");n("google_conversion_order_id","vtp_orderId");k.vtp_enableProductReporting&&(n=m(k.vtp_productReportingDataSource),n("google_conversion_merchant_id","vtp_awMerchantId","aw_merchant_id"),n("google_basket_feed_country",
"vtp_awFeedCountry","aw_feed_country"),n("google_basket_feed_language","vtp_awFeedLanguage","aw_feed_language"),n("google_basket_discount","vtp_discount","discount"),n("google_conversion_items","vtp_items","items"),l.google_conversion_items=l.google_conversion_items.map(function(v){return{value:v.price,quantity:v.quantity,item_id:v.id}}));var p=function(v,w){(l.google_additional_conversion_params=l.google_additional_conversion_params||{})[v]=w},t=function(v){return function(w,y,x,A){var z="DATA_LAYER"==
v?Fi(x):k[y];A(z)&&p(w,z)}},q="//www.googleadservices.com/pagead/conversion_async.js";k.vtp_enableNewCustomerReporting&&(n=t(k.vtp_newCustomerReportingDataSource),n("vdnc","vtp_awNewCustomer","new_customer",ea),n("vdltv","vtp_awCustomerLTV","customer_lifetime_value",
function(v){return void 0!=v&&""!==v}));!k.hasOwnProperty("vtp_enableConversionLinker")||k.vtp_enableConversionLinker?(k.vtp_conversionCookiePrefix&&(l.google_gcl_cookie_prefix=k.vtp_conversionCookiePrefix),l.google_read_gcl_cookie_opt_out=!1):l.google_read_gcl_cookie_opt_out=!0;var r=!0;r&&b.push(l);a||(a=!0,K(q,g(),
e(q)))};Z.__awct=h;Z.__awct.b="awct";Z.__awct.g=!0;Z.__awct.priorityOverride=0}();
Z.a.bzi=["nonGoogleScripts"],function(){(function(a){Z.__bzi=a;Z.__bzi.b="bzi";Z.__bzi.g=!0;Z.__bzi.priorityOverride=0})(function(a){try{u._bizo_data_partner_id=a.vtp_id,u._bizo_data_partner_title=a.vtp_title,u._bizo_data_partner_domain=a.vtp_domain,u._bizo_data_partner_company=a.vtp_company,u._bizo_data_partner_location=a.vtp_location,u._bizo_data_partner_employee_range=a.vtp_employeeRange,u._bizo_data_partner_sics=a.vtp_standardIndustrialClassification,u._bizo_data_partner_email=a.vtp_email,K(J("https://sjs",
"http://js",".bizographics.com/insight.min.js"),a.vtp_gtmOnSuccess,a.vtp_gtmOnFailure)}catch(b){G(a.vtp_gtmOnFailure)}})}();
Z.a.remm=["google"],function(){(function(a){Z.__remm=a;Z.__remm.b="remm";Z.__remm.g=!0;Z.__remm.priorityOverride=0})(function(a){for(var b=a.vtp_input,c=a.vtp_map||[],d=a.vtp_fullMatch,e=a.vtp_ignoreCase?"gi":"g",g=0;g<c.length;g++){var h=c[g].key||"";d&&(h="^"+h+"$");var k=new RegExp(h,e);if(k.test(b)){var l=c[g].value;a.vtp_replaceAfterMatch&&(l=String(b).replace(k,l));return l}}return a.vtp_defaultValue})}();
Z.a.baut=["nonGoogleScripts"],function(){var a=!1,b=function(c){var d=c.vtp_uetqName||"uetq",e=W(d,[],!0);if("VARIABLE_REVENUE"==c.vtp_eventType)e.push({gv:c.vtp_goalValue}),c.vtp_gtmOnSuccess();else if("CUSTOM"==c.vtp_eventType){var g={},h=function(k,l){void 0!==c[k]&&(g[l]=c[k])};h("vtp_goalValue","gv");h("vtp_eventCategory","ec");h("vtp_eventAction","ea");h("vtp_eventLabel","el");h("vtp_eventValue","ev");e.push(g);c.vtp_gtmOnSuccess()}else if(a)c.vtp_gtmOnSuccess();else try{K("//bat.bing.com/bat.js",
function(){var k=Zi(W("UET"),{ti:c.vtp_tagId,q:e});u[d]=k;k.push("pageLoad");c.vtp_gtmOnSuccess()},c.vtp_gtmOnFailure),a=!0}catch(k){G(c.vtp_gtmOnFailure)}};Z.__baut=b;Z.__baut.b="baut";Z.__baut.g=!0;Z.__baut.priorityOverride=0}();




Z.a.paused=[],function(){(function(a){Z.__paused=a;Z.__paused.b="paused";Z.__paused.g=!0;Z.__paused.priorityOverride=0})(function(a){G(a.vtp_gtmOnFailure)})}();
Z.a.html=["customScripts"],function(){function a(d,e,g,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,g,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var m=C.createElement("script");m.async=!1;m.type="text/javascript";m.id=k.id;m.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(m.charset=k.charset);var n=k.getAttribute("data-gtmsrc");n&&(m.src=n,Kb(m,l));d.insertBefore(m,null);n||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var p=
[];k.firstChild;)p.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,p,l,h)()}else d.insertBefore(k,null),l()}else g()}catch(t){G(h)}}}var b=function(d,e,g){Pd(function(){var h,k=oc;k.postscribe||(k.postscribe=Eb);h=k.postscribe;var l={done:e},m=C.createElement("div");m.style.display="none";m.style.visibility="hidden";C.body.appendChild(m);try{h(m,d,l)}catch(n){G(g)}})};var c=function(d){if(C.body){var e=
d.vtp_gtmOnFailure,g=Si(d.vtp_html,d.vtp_gtmOnSuccess,e),h=g.Bc,k=g.J;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(C.body,Sb(h),k,e)()}else Ai(function(){c(d)},
200)};Z.__html=c;Z.__html.b="html";Z.__html.g=!0;Z.__html.priorityOverride=0}();


Z.a.dbg=["google"],function(){(function(a){Z.__dbg=a;Z.__dbg.b="dbg";Z.__dbg.g=!0;Z.__dbg.priorityOverride=0})(function(){return!1})}();


Z.a.img=["customPixels"],function(){(function(a){Z.__img=a;Z.__img.b="img";Z.__img.g=!0;Z.__img.priorityOverride=0})(function(a){var b=Sb('<a href="'+a.vtp_url+'"></a>')[0].href,c=a.vtp_cacheBusterQueryParam;if(a.vtp_useCacheBuster){c||(c="gtmcb");var d=b.charAt(b.length-1),e=0<=b.indexOf("?")?"?"==d||"&"==d?"":"&":"?";b+=e+c+"="+a.vtp_randomNumber}bj(b,a.vtp_gtmOnSuccess,a.vtp_gtmOnFailure)})}();



var Hk={};Hk.macro=function(a){if(pg.nc.hasOwnProperty(a))return pg.nc[a]},Hk.onHtmlSuccess=pg.Ld(!0),Hk.onHtmlFailure=pg.Ld(!1);Hk.dataLayer=cd;Hk.callback=function(a){xc.hasOwnProperty(a)&&ja(xc[a])&&xc[a]();delete xc[a]};Hk.xf=function(){oc[nc.i]=Hk;Da(yc,Z.a);qb=qb||pg;rb=Hd};
Hk.jg=function(){kh.gtm_3pds=!0;oc=u.google_tag_manager=u.google_tag_manager||{};if(oc[nc.i]){var a=oc.zones;a&&a.unregisterChild(nc.i)}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)ib.push(c[d]);for(var e=b.tags||[],g=0;g<e.length;g++)lb.push(e[g]);for(var h=b.predicates||[],
k=0;k<h.length;k++)kb.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var n=l[m],p={},t=0;t<n.length;t++)p[n[t][0]]=Array.prototype.slice.call(n[t],1);jb.push(p)}nb=Z;pb=Vi;Hk.xf();Tf();Kd=!1;Ld=0;if("interactive"==C.readyState&&!C.createEventObject||"complete"==C.readyState)Nd();else{D(C,"DOMContentLoaded",Nd);D(C,"readystatechange",Nd);if(C.createEventObject&&C.documentElement.doScroll){var q=!0;try{q=!u.frameElement}catch(y){}q&&Od()}D(u,"load",Nd)}Hf=!1;"complete"===C.readyState?Jf():
D(u,"load",Jf);a:{if(!Sc)break a;u.setInterval(Tc,864E5);}
uc=(new Date).getTime();
}};(0,Hk.jg)();

})()
