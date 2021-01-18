//tealium universal tag - utag.88 ut4.0.201912040821, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={"id":id};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
var match=/ut\d\.(\d*)\..*/.exec(utag.cfg.v);if(utag.ut.loader===undefined||!match||parseInt(match[1])<35){u.loader=function(o){var b,c,l,a=document;if(o.type==="iframe"){b=a.createElement("iframe");o.attrs=o.attrs||{"height":"1","width":"1","style":"display:none"};for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";for(l in utag.loader.GV(o.attrs)){b[l]=o.attrs[l];}b.src=o.src;}if(o.id){b.id=o.id};if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb()},false);}else{b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
if(utag.ut.isEmptyObject===undefined){u.isEmptyObject=function(o,a){for(a in o){if(utag.ut.hasOwn(o,a)){return false;}}return true;};}else{u.isEmptyObject=utag.ut.isEmptyObject;}
u.pad=function(a,b,c,d){a=""+a;d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0';}}return""+d+a;};u.ev={"view":1,"link":1};u.inialised=false;u.initialized=false;u.scriptrequested=false;u.queue=[];u.map_func=function(arr,obj,item){var i=arr.shift();obj[i]=obj[i]||{};if(arr.length>0){u.map_func(arr,obj[i],item);}else{obj[i]=item;}};u.remove_empty=function(a){var b;for(b in utag.loader.GV(a)){if(a[b]===""||a[b]===undefined){try{delete a[b];}catch(e){a[b]=undefined;}}}
return a;};u.bool=function(a){return a===true||a==="true";};u.ads_function=function(data_prop,type,func,key){var _ad_arr=[],_data,udata=u.data[data_prop],tdata=udata[type],prop;if(u.typeOf(tdata[key])==="array"){for(prop in utag.loader.GV(tdata)){if(prop==="elem"){continue;}
tdata[prop]=u.convertToArray(tdata[prop]);for(var j=0;j<tdata[prop].length;j++){_ad_arr[j]=_ad_arr[j]||{};_ad_arr[j][prop]=tdata[prop][j];}}}else{_ad_arr.push(tdata);}
for(var i=0;i<_ad_arr.length;i++){_data={};_data[type]=_ad_arr[i];if(udata.elem){_data.elem=udata.elem;try{delete udata.elem;}catch(e){udata.elem=undefined;}
u.tracker[func].send(_data);}else{u.tracker[func].add(_data);}}};u.convertToArray=function(arr){var type=u.typeOf(arr);if(type==="undefined"){arr=[];}
if(type!=="array"){arr=arr.toString().split(/\s*,\s*/);}
return arr;};u.copy_ecm_array=function(sourceObj,sourceProp,destObj,destProp){if(!(destObj[destProp]&&u.typeOf(destObj[destProp])=="array"&&destObj[destProp].length>0)){destObj[destProp]=sourceObj[sourceProp].slice(0);}};u.createTracker=function(){if(u.inialised){return;}
u.inialised=true;u.data.config.secure=u.bool(u.data.config.secure);u.data.config.cookieSecure=u.bool(u.data.config.cookieSecure);u.data.config.pixelPath=u.data.config.pixelPath||"/hit.xiti";if(u.data.config.pixelPath.indexOf("/")!==0){u.data.config.pixelPath="/"+u.data.config.pixelPath;}
u.tracker=new ATInternet.Tracker.Tag(u.remove_empty(u.data.config));if(u.data.window_var){window[u.data.window_var]=u.tracker;}};u.convert_date=function(strDate){var date_yyymmdd="",date=new Date(strDate);date_yyymmdd+=date.getFullYear();date_yyymmdd+=u.pad(date.getMonth()+1,2);date_yyymmdd+=u.pad(date.getDate(),2);return date_yyymmdd;};u.calcDaysSinceLaunch=function(lld){if(!lld){return"";}
try{return Math.floor((((new Date()-new Date(lld))/1000)/60/60/24));}catch(e){utag.DB(e);}
return"";};u.callBack=function(){var data={};u.createTracker();u.initialized=true;while(data=u.queue.shift()){u.data=data.data;u.loader_cb(data.a,data.b,data.c);}};u.map={"js_page.IQ_xtsite":"config.site","js_page.IQ_xtn2":"page.level2","js_page.IQ_chapter1":"page.chapter1","js_page.IQ_chapter2":"page.chapter2","js_page.IQ_chapter3":"page.chapter3","js_page.IQ_pageName":"page.name","user_type":"visitor.category","js_page.IQ_userId":"visitor.id","ad_typology":"cv.site.1","search_typology":"cv.site.1","js_page.IQ_idTest":"cv.site.2","ad_id":"cv.site.3,cv.page.2","news_isAmp":"cv.site.4","page_language":"cv.site.5","user_status":"cv.site.6","page_section":"cv.site.7","page_subSection":"cv.site.8","event_outcome":"cv.site.9,cv.page.1","js_page.IQ_category":"cv.site.10","search_geo_locationId":"cv.site.11","js_page.IQ_search_geo_provinceName":"cv.site.12","ad_unsubscriptionDate":"cv.site.13","ad_owner_commercialId":"cv.site.14","ad_characteristics_roomNumber":"cv.site.15","ad_price":"cv.site.16","js_page.IQ_pageSectionPortal":"cv.site.17","ad_operation":"cv.site.18","search_operation":"cv.site.18","dom.referrer":"cv.site.19","js_page.IQ_user_agent":"cv.site.20,cv.page.3","list_totalResult":"cv.page.4","js_page.IQ_globalObj":"page.customObject","js_page.IQ_orderIdconcatenation":"order.orderId","js_page.IQ_roimt":"order.turnover","js_page.IQ_productId":"cart.productId","event_il:1":"purchase,cartview"};u.extend=[function(a,b){try{if(1){b['js_page.IQ_globalObj']={search_operation:b.search_operation,search_typology:b.search_typology};}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){utag.DB("send:88");utag.DB(b);var c,d,e,f,_data,h,_event,evt=[];u.data={"qsp_delim":"&","kvp_delim":"=","base_url":"//tag.aticdn.net/##utag_site##/smarttag.js","window_var":"atinternet","first_ext_is_settings":"true"||"false","config":{"site":"","log":"logc187","logSSL":"logs1187","domain":"xiti.com","cookiedomain":"","secure":"false","cookieSecure":"false"==="true","pixelPath":"/hit.xiti"},"visitor":{},"xtor":"","product_id":[],"product_name":[],"product_category":[],"product_subcategory":[],"product_quantity":[],"product_unit_price":[],"product_discount":[],"ecom_event":[]};if(u.data.first_ext_is_settings==="true"&&u.extend.length>1){u.first_extend=u.extend.shift();try{u.first_extend(a,b)}catch(e){utag.DB(u.id+": Failed to process settings extension");utag.DB(e);}
u.createTracker();}
if(b.lifecycle_isfirstlaunch){u.data.mob={"stc":{"lc":{"fl":u.typeOf(b.lifecycle_isfirstlaunch)=="boolean"?+b.lifecycle_isfirstlaunch:"","flau":u.typeOf(b.lifecycle_isfirstlaunchupdate)=="boolean"?+b.lifecycle_isfirstlaunchupdate:"","lc":b.lifecycle_totallaunchcount||"","fld":u.convert_date(b.lifecycle_firstlaunchdate),"dsfl":u.calcDaysSinceLaunch(b.lifecycle_firstlaunchdate),"uld":u.convert_date(b.lifecycle_updatelaunchdate),"dsu":b.lifecycle_dayssinceupdate||"","dslu":u.calcDaysSinceLaunch(b.lifecycle_lastlaunchdate)}}};}
for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){c=e[f].split(".");u.map_func(c,u.data,b[d]);}}else{h=d.split(":");if(h.length===2&&b[h[0]]===h[1]){if(u.map[d]){evt=evt.concat(u.map[d].split(","));}}}}
utag.DB("send:88:MAPPINGS");utag.DB(u.data);u.loader_cb=function(a,b,c){utag.DB("send:88:CALLBACK");var i;if(!u.isEmptyObject(u.data.param)){for(d in utag.loader.GV(u.data.param)){u.tracker.setParam(d,u.data.param[d]);}}
if('view'===a&&!u.isEmptyObject(u.data.page)){u.tracker.page.reset();u.tracker.page.set(u.data.page);}
if(!u.isEmptyObject(u.data.cv)){if('link'===a){u.tracker.page.set("");}
u.tracker.customVars.set(u.data.cv);}
if(!u.isEmptyObject(u.data.customTreeStructure)){u.tracker.customTreeStructure.set(u.data.customTreeStructure);}
if('link'===a&&!u.isEmptyObject(u.data.click)){u.tracker.click.set(u.data.click);}
if('link'===a&&!u.isEmptyObject(u.data.clickListener)){u.tracker.clickListener.send(u.data.clickListener);}
var _ecm={};_ecm.order_id=u.data.order_id||b._corder||"";_ecm.order_total=u.data.order_total||b._ctotal||"";_ecm.order_subtotal=u.data.order_subtotal||b._csubtotal||"";_ecm.order_shipping=u.data.order_shipping||b._cship||"";_ecm.order_tax=u.data.order_tax||b._ctax||"";_ecm.order_coupon_code=u.data.order_coupon_code||b._cpromo||"";_ecm.customer_id=u.data.customer_id||b._ccustid||"";if(u.data.product_id.length===0&&b._cprod!==undefined){_ecm.product_id=b._cprod.slice(0);}else{_ecm.product_id=u.data.product_id.slice(0);}
if(u.data.product_name.length===0&&b._cprodname!==undefined){_ecm.product_name=b._cprodname.slice(0);}else{_ecm.product_name=u.data.product_name.slice(0);}
if(u.data.product_category.length===0&&b._ccat!==undefined){_ecm.product_category=b._ccat.slice(0);}else{_ecm.product_category=u.data.product_category.slice(0);}
if(u.data.product_subcategory.length===0&&b._ccat2!==undefined){_ecm.product_subcategory=b._ccat2.slice(0);}else{_ecm.product_subcategory=u.data.product_subcategory.slice(0);}
if(u.data.product_quantity.length===0&&b._cquan!==undefined){_ecm.product_quantity=b._cquan.slice(0);}else{_ecm.product_quantity=u.data.product_quantity.slice(0);}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){_ecm.product_unit_price=b._cprice.slice(0);}else{_ecm.product_unit_price=u.data.product_unit_price.slice(0);}
if(u.data.product_discount.length===0&&b._cpdisc!==undefined){_ecm.product_discount=b._cpdisc.slice(0);}else{_ecm.product_discount=u.data.product_discount.slice(0);}
if(_ecm.customer_id){u.data.visitor=u.data.visitor||{};u.data.visitor.id=u.data.visitor.id||_ecm.customer_id;}
if(!u.isEmptyObject(u.data.visitor)){if(u.data.visitor.id){u.tracker.identifiedVisitor.set(u.data.visitor);}else if(u.bool(u.data.visitor.unset)){u.tracker.identifiedVisitor.unset();}}
u.data.ecom_event=u.convertToArray(u.data.ecom_event);if((u.data.ecom_event&&u.data.ecom_event.length>0)||(evt&&evt.length>0)){u.data.ecom_event=u.data.ecom_event.concat(evt);for(i=0;i<u.data.ecom_event.length;i++){_event=u.data.ecom_event[i];if(_event==="purchase"){_data=u.data.order||{};if(!_data.orderId){_data.orderId=_ecm.order_id;}
if(!_data.turnover){_data.turnover=_ecm.order_total;}
if(_data.status&&u.typeOf(_data.status)==="string"){_data.status=parseInt(_data.status);}
if(_data.newCustomer!==""||u.typeOf(_data.newCustomer)!=="undefined"){_data.newCustomer=u.bool(_data.newCustomer);}
if(_data.confirmationRequired){_data.confirmationRequired=u.bool(_data.confirmationRequired);}
if(_data.cartId){u.tracker.cart.set({cartId:_data.cartId});try{delete _data.cartId;}catch(e){_data.cartId=undefined;}}
if(_data.orderCustomVariables){_data.orderCustomVariables=u.convertToArray(_data.orderCustomVariables);if(_data.orderCustomVariables.length==0){try{delete _data.orderCustomVariables;}catch(e){_data.orderCustomVariables=undefined;}}}
_data.amount=_data.amount||{};if(!_data.amount.amountTaxFree){_data.amount.amountTaxFree=_ecm.order_subtotal;}
if(!_data.amount.amountTaxIncluded){_data.amount.amountTaxIncluded=parseFloat(_ecm.order_subtotal)+parseFloat(_ecm.order_tax);}
if(!_data.amount.taxAmount){_data.amount.taxAmount=_ecm.order_tax;}
_data.delivery=_data.delivery||{};if(!_data.delivery.shippingFeesTaxIncluded){_data.delivery.shippingFeesTaxIncluded=_ecm.order_shipping;}
_data.discount=_data.discount||{};if(!_data.discount.promotionalCode){_data.discount.promotionalCode=_ecm.order_coupon_code;}
if(!_data.discount.discountTaxIncluded){_data.discount.discountTaxIncluded=(function(){var i,discount=0;for(i=0;i<_ecm.product_discount.length;i++){discount+=parseFloat(_ecm.product_discount[i]||0)*parseInt(_ecm.product_quantity[i]||0);}
return discount;}());}
if(!u.isEmptyObject(_data)){u.tracker.order.set(_data);}}
else if(_event==="cartview"){_data={};var _cart=u.data.cart||{};if(_cart.cartId){_data.cartId=_cart.cartId;}
if(_cart.isBasketPage){_data.isBasketPage=u.bool(_cart.isBasketPage);}
if(!u.isEmptyObject(_data)){u.tracker.cart.set(_data);}
u.copy_ecm_array(_ecm,"product_id",_cart,"productId");u.copy_ecm_array(_ecm,"product_category",_cart,"category1");u.copy_ecm_array(_ecm,"product_subcategory",_cart,"category2");u.copy_ecm_array(_ecm,"product_quantity",_cart,"quantity");u.copy_ecm_array(_ecm,"product_unit_price",_cart,"unitPriceTaxIncluded");u.copy_ecm_array(_ecm,"product_discount",_cart,"discountTaxIncluded");for(d=0;d<_cart.productId.length;d++){_data={};if(_cart.productId[d]){_data.productId=_cart.productId[d];}
for(var _i=1;_i<7;_i++){if(_cart["category"+_i]&&_cart["category"+_i][d]){_data["category"+_i]=_cart["category"+_i][d];}}
if(u.typeOf(_cart.quantity)!=='undefined'&&_cart.quantity.length>0){_data.quantity=parseInt(_cart.quantity[d]);}
if(u.typeOf(_cart.unitPriceTaxIncluded)!=='undefined'&&_cart.unitPriceTaxIncluded.length>0){_data.unitPriceTaxIncluded=_cart.unitPriceTaxIncluded[d];}
if(u.typeOf(_cart.unitPriceTaxFree)!=='undefined'&&_cart.unitPriceTaxFree.length>0){_data.unitPriceTaxFree=_cart.unitPriceTaxFree[d];}
if(u.typeOf(_cart.discountTaxIncluded)!=='undefined'&&_cart.discountTaxIncluded.length>0){_data.discountTaxIncluded=_cart.discountTaxIncluded[d];}
if(u.typeOf(_cart.discountTaxFree)!=='undefined'&&_cart.discountTaxFree.length>0){_data.discountTaxFree=_cart.discountTaxFree[d];}
if(u.typeOf(_cart.promotionalCode)!=='undefined'&&_cart.promotionalCode.length>0){_data.promotionalCode=_cart.promotionalCode[d];}
u.tracker.cart.add({product:_data});}}else if(_event==="prodview"){_data={};var _prod=u.data.prod||{};u.copy_ecm_array(_ecm,"product_id",_prod,"productId");u.copy_ecm_array(_ecm,"product_category",_prod,"category1");u.copy_ecm_array(_ecm,"product_subcategory",_prod,"category2");for(d=0;d<_prod.productId.length;d++){_data={};if(_prod.productId[d]){_data.productId=_prod.productId[d];}
for(var _i=1;_i<7;_i++){if(_prod["category"+_i]&&_prod["category"+_i][d]){_data["category"+_i]=_prod["category"+_i][d];}}
u.tracker.product.add(_data);}}}}
if(!u.isEmptyObject(u.data.aisle)){u.tracker.aisle.set(u.data.aisle);}
if(!u.isEmptyObject(u.data.promo)){if(!u.isEmptyObject(u.data.promo.click)){u.ads_function("promo","click","selfPromotion","adId");}
if(!u.isEmptyObject(u.data.promo.impression)){u.ads_function("promo","impression","selfPromotion","adId");}}
if(!u.isEmptyObject(u.data.pub)){if(!u.isEmptyObject(u.data.pub.click)){u.ads_function("pub","click","publisher","campaignId");}
if(!u.isEmptyObject(u.data.pub.impression)){u.ads_function("pub","impression","publisher","campaignId");}}
if(!u.isEmptyObject(u.data.intsearch)){u.tracker.internalSearch.set(u.data.intsearch);}
if(!u.isEmptyObject(u.data.dynlabel)){u.tracker.dynamicLabel.set(u.data.dynlabel);}
if(!u.isEmptyObject(u.data.mvtesting)){d=u.data.mvtesting;if(!u.isEmptyObject(d.set)){u.tracker.mvTesting.set(d.set);}
if(!u.isEmptyObject(d.add)){d.add.variable=u.convertToArray(d.add.variable);d.add.version=u.convertToArray(d.add.version);var _max=Math.max(d.add.version.length,d.add.variable.length);for(c=0;c<_max;c++){u.tracker.mvTesting.add({variable:d.add.variable[c]||'',version:d.add.version[c]||''});}}}
if(!u.isEmptyObject(u.data.richmedia)){d=u.data.richmedia;if(!u.isEmptyObject(d.remove)){u.tracker.richMedia.remove(d.remove);}
if(u.bool(d.removeAll)){u.tracker.richMedia.removeAll();}
if(!u.isEmptyObject(d.add)){u.tracker.richMedia.add(d.add);}
if(!u.isEmptyObject(d.send)){u.tracker.richMedia.send(d.send);}}
if(u.bool(u.data.tvTracking)){u.tracker.tvTracking.set();}
if(u.bool(u.data.nuggAd)){u.tracker.nuggAd.set();}
if(!u.isEmptyObject(u.data.mob)){for(c in utag.loader.GV(u.data.mob)){if(c==="ref"&&u.data.mob.ref){u.tracker.setParam("ref",u.data.mob.ref.replace(/[<>]/g,"").substring(0,1600).replace(/&/g,"$"),{permanent:!0,last:!0});}else if(c==="xtor"&&u.data.mob.xtor){u.tracker.setParam("xto",u.data.mob.xtor);}else if(c==="stc"&&!u.isEmptyObject(u.data.mob.stc)){u.data.mob.stc.lifecycle=u.data.mob.stc.lifecycle||u.data.mob.stc.lc||{};try{delete u.data.mob.stc.lc;}catch(e){u.data.mob.stc.lc=void 0;}
u.tracker.setParam("stc",u.data.mob.stc);}else{u.tracker.setParam(c,u.data.mob[c]);}}}
if(u.data.xtor){u.tracker.setParam("xto",u.data.xtor);}
u.tracker.dispatch();utag.DB("send:88:CALLBACK:COMPLETE");};if(u.initialized){u.loader_cb(a,b,c);}else{u.queue.push({"data":u.data,"a":a,"b":b,"c":c});if(!u.scriptrequested){u.scriptrequested=true;u.loader({"type":"script","src":u.data.base_url.replace("##utag_site##",u.data.config.site),"cb":u.callBack,"loc":"script","id":"utag_88","attrs":{}});}}
utag.DB("send:88:COMPLETE");}};utag.o[loader].loader.LOAD(id);}("88","idealista.es-portal"));}catch(error){utag.DB(error);}
