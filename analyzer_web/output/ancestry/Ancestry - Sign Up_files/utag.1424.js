//tealium universal tag - utag.1424 ut4.0.201906251955, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
(function(){try{if(utag.id==='ancestry.main'){var ajs=document.createElement('script')
ajs.type='text/javascript'
ajs.async=true
ajs.src='//www.googletagmanager.com/gtag/js?id=AW-994238695'
ajs.onload=ajs.onreadystatechange=function(){window.dataLayer=window.dataLayer||[]
function gtag(){dataLayer.push(arguments)}
gtag('js',new Date())
gtag('config','UA-60272843-1')
gtag('config','DC-8889547')
gtag('config','AW-991179838')
gtag('config','AW-994238695')
gtag('config','AW-830159135')
gtag('config','AW-1011378274')
gtag('config','AW-961718860')
gtag('config','AW-984964593')}
var s=document.getElementsByTagName('script')[0]
s.parentNode.insertBefore(ajs,s)}}catch(e){}})()
}};utag.o[loader].loader.LOAD(id);})("1424","ancestry.main");}catch(error){utag.DB(error);}
