//tealium universal tag - utag.1307 ut4.0.201812131917, Copyright 2018 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){u.initialized=true;var cat=undefined;if(utag.data['dom.pathname']==='/'){cat='ances00-';}
else if((utag.data['dom.pathname']==('/dna/'))||(utag.data['dom.pathname'].indexOf('/dna/insights')>-1)){cat='ances002';}
else if(utag.data.loadRules.dnaRegistrationPage){cat='ances003';}
else if(utag.data.loadRules.dnaPaymentPage){cat='ances005';}
else if(utag.data.loadRules.dnaReviewPage){cat='ances006';}
else if(utag.data.loadRules.dnaConfirmationPage){cat='ances0';}
else if(utag.data['dom.pathname'].indexOf('/cs/offers/freetrial')>-1){cat='ances000';}
else if(utag.data.loadRules.freeTrialRegistrationPage){cat='ances00d';}
else if(utag.data.loadRules.freeTrialPaymentPage){cat='ances00f';}
else if(utag.data.loadRules.freeTrialReviewPage){cat='ances00c';}
else if(utag.data.loadRules.freeTrialConfirmationPage||utag.data.ft_add_on){cat='ances00';}
else if(utag.data['dom.pathname'].indexOf('/cs/offers/subscribe')>-1){cat='ances001';}
else if(utag.data.loadRules.hardOfferRegistrationPage){cat='ances00h';}
else if(utag.data.loadRules.hardOfferPaymentPage){cat='ances00i';}
else if(utag.data.loadRules.hardOfferReviewPage){cat='ances00k';}
else if(utag.data.loadRules.hardOfferConfirmationPage){cat='ances000';}
else if((utag.data['dom.pathname'].indexOf('/cs/gifts/gift-selection')>-1)||(utag.data['dom.pathname'].indexOf('/cs/gift-selection')>-1)){cat='ances008';const GsOffer=document.querySelector("#offerCardForm, #offerBasicForm, #offerPremiumForm, #PurchaseGiftForm1");if(GsOffer!==null){GsOffer.addEventListener('submit',function(){var customerType=utag.data.customer_segment?utag.data.customer_segment:'undefined';var deviceType=navigator.userAgent?navigator.userAgent:'undefined';gtag('event','conversion',{'allow_custom_scripts':true,'u1':customerType,'u2':deviceType,'send_to':'DC-8889547/uscon00/ances00+standard'});});}}
else if(utag.data['dom.pathname']==='/cs/gifts'){cat='ances00l'}
else if(utag.data.loadRules.giftSubRegistrationPage){cat='ances00m'}
else if(utag.data.loadRules.giftSubPaymentPage){cat='ances00n'}
else if(utag.data.loadRules.giftSubReviewPage){cat='ances00o'}
else if(utag.data.loadRules.giftSubConfirmationPage){cat='ances001'}
var customerType=utag.data.customer_segment?utag.data.customer_segment:'undefined';var deviceType=navigator.userAgent?navigator.userAgent:'undefined';if(cat){if(utag.data.loadRules.anyConfirmationPagePlusGiftSub){gtag('event','purchase',{'allow_custom_scripts':true,'value':utag.data.order_total,'transaction_id':utag.data.order_id,'quantity':utag.data.product_quantity,'u1':customerType,'u2':deviceType,'send_to':'DC-8889547/uscon0/'+cat+'+items_sold'});}
else{gtag('event','conversion',{'allow_custom_scripts':true,'u1':customerType,'u2':deviceType,'send_to':'DC-8889547/uscon00/'+cat+'+standard'});}}
}
if(!u.initialized){u.loader({"type":"script","src":'//www.googletagmanager.com/gtag/js?id=DC-8889547'});window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','DC-8889547');u.loader_cb();}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("1307","ancestry.main");}catch(error){utag.DB(error);}
