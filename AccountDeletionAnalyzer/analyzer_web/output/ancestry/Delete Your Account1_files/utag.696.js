//tealium universal tag - utag.696 ut4.0.201909031655, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[function(a,b){try{if(1){(function(myevents,bdata){var data={}
data.northstar_tags={}
if(utag.data.loadRules.anyConfirmationPage&&utag.data.order_id.length>0){try{(function(){var currentTime=(new Date()).getTime()
if(currentTime<1567693700209){var xhr=new XMLHttpRequest()
var url='https://ancestry-dbg.agilemeasure.com/api/dbg'
xhr.open('POST',url,true)
xhr.setRequestHeader('Content-Type','application/json')
var offersArray=[]
try{offersArray=utag.data.offers}catch(e){}
var mcid='no-mcid'
try{mcid=sx.visitor.getMarketingCloudVisitorID()}catch(e){}
var loadRules='no-loadRules'
try{loadRules=JSON.stringify(utag.data.loadRules)}catch(e){}
var orderId='no-orderId'
try{orderId=utag.data.order_id}catch(e){}
var data=JSON.stringify({'type':'before-dbg','url':location.href,'userAgent':navigator.userAgent,'mcid':mcid,'orderId':orderId,'orderCurrency':utag.data.order_currency||'no-order_currency','orderTotal':utag.data.order_total||'no order_total','loadRules':loadRules,offers:offersArray})
xhr.send(data)}})()}catch(e){}
data.northstar_tags['trade-desk']=true
if(!utag.data.loadRules.giftSubConfirmationPage){data.northstar_tags['facebook']=true}
data.td_ct='ux3ocse'
data.td_td2=utag.data.order_total||0
data.td_orderid=utag.data.order_id
var productSubscriptionTotal=0
try{for(var i=0,l=utag.data.offers.length;i<l;i++){productSubscriptionTotal+=(utag.data.offers[i].product_subscription_value||0)}}catch(e){productSubscriptionTotal=0}
data.product_subscription_total=data.td_v=productSubscriptionTotal
data.td_vf=utag.data.order_currency
data.td_td1='ho'
if(utag.data.loadRules.dnaConfirmationPage){data.td_ct='06qmphc'
data.td_td1='dna'}
if(utag.data.loadRules.freeTrialConfirmationPage){data.td_td1='ft'}
Object.keys(data).forEach(function(key,i){utag.data[key]=bdata[key]=data[key]})
bdata['_corder']=utag.data.td_orderid
bdata['_ccurrency']=utag.data.td_vf
try{(function(){var currentTime=(new Date()).getTime()
if(currentTime<1567693700209){var xhr=new XMLHttpRequest()
var url='https://ancestry-dbg.agilemeasure.com/api/dbg'
xhr.open('POST',url,true)
xhr.setRequestHeader('Content-Type','application/json')
var offersArray=[]
try{offersArray=utag.data.offers}catch(e){}
var mcid='no-mcid'
try{mcid=sx.visitor.getMarketingCloudVisitorID()}catch(e){}
var loadRules='no-loadRules'
try{loadRules=JSON.stringify(utag.data.loadRules)}catch(e){}
var orderId='no-orderId'
try{orderId=utag.data.order_id}catch(e){}
var td_bdata='no bdata'
try{td_bdata=bdata}catch(e){}
var data=JSON.stringify({'type':'after-dbg','url':location.href,'userAgent':navigator.userAgent,'mcid':mcid,'orderId':orderId,'orderCurrency':utag.data.order_currency||'no-order_currency','orderTotal':utag.data.order_total||'no order_total','loadRules':loadRules,'offers':offersArray,'bdata':td_bdata})
xhr.send(data)}})()}catch(e){}}})(a,b)}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){u.initialized=true;fbq('track','PageView');if(typeof(utag.data['trackingPageGuid'])!='undefined'){if(!utag.data.FBfirstCartView&&(utag.data.loadRules.anyPaymentPage||utag.data.loadRules.anyReviewPage||utag.data.loadRules.anyRegistrationPage)){fbq('track','InitiateCheckout');utag.data.FBfirstCartView=true}
if(utag.data.northstar_tags&&utag.data.northstar_tags['facebook']){if(utag.data.loadRules.freeTrialConfirmationPage){fbq('track','StartTrial',{value:utag.data.product_subscription_total||0,currency:utag.data.order_currency,order_id:utag.data.order_id,type:'ft'})
fbq('track','Subscribe',{value:utag.data['order_total']||0,currency:utag.data.order_currency,order_id:utag.data.order_id,type:'ft'})}
if(utag.data.loadRules.hardOfferConfirmationPage){fbq('track','StartTrial',{value:0,currency:utag.data.order_currency,order_id:utag.data.order_id,type:'ho'})
fbq('track','Subscribe',{value:utag.data['order_total']||0,currency:utag.data.order_currency,order_id:utag.data.order_id,type:'ho'})}
if(utag.data.loadRules.dnaConfirmationPage){fbq('track','Purchase',{value:utag.data['order_total'],currency:utag.data.order_currency,order_id:utag.data.order_id,type:'dna'})
if(utag.data.product_subscription_total>0||(utag.data.offers&&utag.data.offers.length>1)){fbq('track','StartTrial',{value:utag.data.product_subscription_total||0,currency:utag.data.order_currency,order_id:utag.data.order_id,type:'dna|ft'})
fbq('track','Subscribe',{value:0,currency:utag.data.order_currency,order_id:utag.data.order_id,type:'dna|ft'})}}}else{if(utag.data.loadRules.FtHoConfirmation||utag.data.loadRules.giftSubConfirmationPage){fbq('track','Subscribe',{value:utag.data['order_total'],currency:utag.data['order_currency'],order_id:utag.data['order_id']})}
if(utag.data.loadRules.dnaConfirmationPage&&utag.data.flow_type.indexOf('dna')!==-1){fbq('track','Purchase',{order_id:utag.data['order_id']})}}
}
if(utag.data.base_url.indexOf("search")!=-1&&utag.data["page_name"].indexOf("results")!=-1){fbq('track','Search');}
if(utag.data.dna_user==="Non DNA User"&&utag.data.base_url.indexOf("dna")!=-1){fbq('track','ViewContent');}
if(utag.data.base_url.indexOf("cs/offers/subscribe")!=-1||utag.data.base_url.indexOf("/cs/offers/freetrial")!=-1||utag.data.base_url.indexOf("cs/gifts/gift-selection")!=-1){fbq('track','ViewContent');}
};if(!u.initialized){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','//connect.facebook.net/en_US/fbevents.js');var fbAdditionalData={};if(utag.data['customer_email']&&utag.data['customer_email']!=''){fbAdditionalData.em=utag.data['customer_email'];}
if(utag.data['postal_code']){fbAdditionalData.zp=utag.data['postal_code'];}
fbq('init','1411840285724878',fbAdditionalData);u.loader_cb();}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("696","ancestry.main");}catch(error){utag.DB(error);}
