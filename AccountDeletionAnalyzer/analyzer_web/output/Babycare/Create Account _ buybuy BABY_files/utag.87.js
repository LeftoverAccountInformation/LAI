//tealium universal tag - utag.87 ut4.0.201907100438, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
try{console.log("api container: start");var actiontype=b.call_to_actiontype;var invokeAPI=false;if(typeof actiontype=='undefined'){return;}
else if(actiontype=='add to registry'||actiontype=='add to registry from prc'||actiontype=='move to registry'||actiontype=='add item to registry from pnh checklist'||actiontype=='remove from registry'||actiontype=='update quantity'
||actiontype=='add to cart'||actiontype=='add to cart from prc'||actiontype=='add to cart from checklist'||actiontype=='move to cart'
)
{invokeAPI=true;}
else{return;}
var pid=b.product_id;var skuid=b.product_sku_id;var site="BedBathUS";console.log("api container: actiontype:"+actiontype);console.log("api container: pid:"+pid);console.log("api container: skuid:"+skuid);if(typeof pid=='undefined'||pid.length!=1){invokeAPI=false;}
if(typeof skuid=='undefined'||skuid.length!=1){invokeAPI=false;}
var dataAvailable=true;if(dataAvailable&&(typeof b.brand_name=='undefined'||b.brand_name==='')){dataAvailable=false;}
if(dataAvailable&&(typeof b.product_category=='undefined'||b.product_category==='')){dataAvailable=false;}
if(dataAvailable&&(typeof b.product_subcategory=='undefined'||b.product_subcategory==='')){dataAvailable=false;}
if(dataAvailable&&(typeof b.product_sub_sub_category=="undefined"||b.product_sub_sub_category==='')){dataAvailable=false;}
console.log("api container: invokeAPI:"+invokeAPI);if(invokeAPI&&!dataAvailable){if(typeof b.site_id!=='undefined'&&b.site_id=="BABY"){site="BabyUS";}
var uri="https://www.bedbathandbeyond.com/api/apollo/collections/bedbath/query-profiles/product-details/select?productId="
+pid[0]+"&skuId="+skuid[0]+"&siteId="+site;console.log("api container: uri:"+uri);fetch(uri).then(function(response){response.json().then(function(data){var rs=data.response.docs[0];try{b.brand_name=[rs.BRAND_NAME];b.product_category=[rs.LI_NAME];b.product_subcategory=[rs.L2_NAME];b.product_sub_sub_category=[rs.L3_NAME];var collection=rs.PARENT_COLLECTION_PRODUCT;if(typeof collection!=='undefined'&&collection.length>0){b.product_collection_id=collection[0];}
var accessories=rs.ACCESSORY_CHILD_PRODUCT;if(typeof accessories!=='undefined'&&accessories.length>0){b.product_child_accessory_id=accessories;}
b.solr_api_invoked=true;console.log("api container: Brand:"+rs.BRAND_NAME);console.log("api container: L1:"+rs.LI_NAME);console.log("api container: L2:"+rs.L2_NAME);console.log("api container: L3:"+rs.L3_NAME);console.log("api container: Collection:"+collection);console.log("api container: Accessories:"+accessories);console.log("api container: firing collect");console.log(b);utag.view(b,{},[88]);}
catch(err){console.log("api container: firing collect in error + "+err.message);b.solr_api_error=err.message;b.solr_api_invoked=false;utag.view(b,{},[88]);}});});}
else{console.log("api container: firing collect in else");b.solr_api_invoked=false;utag.view(b,{},[88]);}}
catch(err){console.log("api container: firing collect in error + "+err.message);b.solr_api_error=err.message;b.solr_api_invoked=false;utag.view(b,{},[88]);}
}};utag.o[loader].loader.LOAD(id);})("87","bbb.bbb-feo");}catch(error){utag.DB(error);}
