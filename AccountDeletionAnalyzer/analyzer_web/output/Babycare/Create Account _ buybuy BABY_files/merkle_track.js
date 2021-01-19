/*
 *    Copyright (c) 2018 Merkle Inc. All Rights Reserved.
 *
 *   This software is the confidential and proprietary information of
 *   Merkle Inc. ("Confidential Information").
 *   You shall not disclose such Confidential Information and shall use it only in
 *   accordance with the terms of the license agreement you entered into
 *   with Merkle Inc.
 *
 *   MERKLE MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
 *   THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 *   TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 *   PARTICULAR PURPOSE, OR NON-INFRINGEMENT. MERKLE SHALL NOT BE LIABLE FOR
 *   ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
 *   DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */
(function(merklesearch, undefined){
   try {
     
      var version = "3_16";
      
      merklesearch.sendAdSid = function( mid, cid ){
         try {
            if ( _self_referred() || !mid ) { return false };
         
            var params = _get_attributes_and_set_cookies(mid, cid);
            
            if (params.mrkgadid){ 
               var href = document.location.protocol + "//mct.rkdms.com/sid.gif?mid=" + encodeURIComponent(mid) + "&ref=" + encodeURIComponent( document.referrer ) + "&mrkgadid=" + encodeURIComponent(params.mrkgadid) + params.params;
               var img = document.createElement('img');
               img.src = href;
            };
         } catch(e){console.log(e)};
      }
      
      merklesearch.sendSid = function( mid, cid ){
         try { 
            if ( _self_referred() || !mid ) { return false };

            var params = _get_attributes_and_set_cookies(mid,cid);
               
            if (!params.mrkgadid){ 
               var href = document.location.protocol + "//mct.rkdms.com/sid.gif?mid=" + encodeURIComponent(mid) + "&ref=" + encodeURIComponent( document.referrer ) + params.params;
               var img = document.createElement('img');
               img.src = href;
            };
         } catch(e){console.log(e)};
      }
     
      merklesearch.sendOrder  = function( orderObject ){
         try {
            var attr = _prepare_conversion_gif(orderObject);
            if ( !attr ) { return undefined };

            _send_gif('order.gif', attr);
         } catch(e){console.log(e)};
      }
 
      merklesearch.sendMicro  = function( orderObject ){
         try { 
            var attr = _prepare_conversion_gif(orderObject);
            if ( !attr ) { return undefined };

            _send_gif('micro.gif', attr);
         } catch(e){console.log(e)};
      }

      merklesearch.sendOrderSkipNavigationCheck  = function( orderObject ){
         try {
            var attr = _prepare_conversion_gif(orderObject, true);
            if ( !attr ) { return undefined };

            _send_gif('order.gif', attr);
         } catch(e){console.log(e)};
      }
 
      merklesearch.sendMicroSkipNavigationCheck  = function( orderObject ){
         try { 
            var attr = _prepare_conversion_gif(orderObject, true);
            if ( !attr ) { return undefined };

            _send_gif('micro.gif', attr);
         } catch(e){console.log(e)};
      }

      merklesearch.sendPhoneOrder  = function( orderObject ){
         try {
            var attr = _prepare_offline_conversion_gif(orderObject);
            if ( !attr ) { return undefined };

            _send_gif('order.gif', attr);
         } catch(e){console.log(e)};
      }

      merklesearch.sendMicroOffline  = function( orderObject ){
         try {
            var attr = _prepare_offline_conversion_gif(orderObject);
            if ( !attr ) { return undefined };

            _send_gif('micro.gif', attr);
         } catch(e){console.log(e)};
      }

      merklesearch.getSidCookie = function(mid){
         if (!mid){ return false };

         try {
            var cookies = _getCookies();
            var paramsObj = _searchToObject();
            
            var rkglsid = cookies.rkglsid ? _stripTimestamp(cookies.rkglsid) : null;
            rkglsid = rkglsid || _merkle_generate_rkglsid( mid );
            _setCookieRefreshTTL("rkglsid", rkglsid);
            
            cookies = _getCookies();
            return cookies.rkglsid;
         } catch(e){console.log(e)};
      }
      
      merklesearch.getSids = function(mid){
         if (!mid){ return false };

         try {
            var cookies = _getCookies();
            var paramsObj = _searchToObject();

            var rkglsid = cookies.rkglsid ? _stripTimestamp(cookies.rkglsid) : null;
            rkglsid = rkglsid || _merkle_generate_rkglsid( mid );
            _setCookieRefreshTTL("rkglsid", rkglsid);
            
            return ( rkglsid ? "rkglsid=" + encodeURIComponent(rkglsid) : '') + "&v=" + version;
         } catch(e){console.log(e)};
      }

      function _send_gif(endpoint, attr){
         if (!endpoint || !attr){ return undefined };

         var href = document.location.protocol + "//www.rkdms.com/" + endpoint + "?" + attr;
         var img = document.createElement('img');
         img.src = href;
      }
     
      function _prepare_conversion_gif(orderObject, skipPageRefreshCheck){
         if ( !orderObject || !orderObject.mid ) { return undefined };
         if ( skipPageRefreshCheck !== true && ( window.performance && performance.navigation.type == 1 ) ) { return undefined };
         var cookies = _getCookies();
         
         var rkglsid = cookies.rkglsid ? _stripTimestamp(cookies.rkglsid) : null;
         rkglsid = rkglsid || _merkle_generate_rkglsid( orderObject.mid );
         _setCookieRefreshTTL("rkglsid", rkglsid);
         
         var attr = '';
         for ( var key in orderObject ) {
            if (orderObject.hasOwnProperty(key)){
               attr += "&" + key + "=" + encodeURIComponent(orderObject[key]); 
            };
         };
         
          return attr + (rkglsid ? "&rkglsid=" + encodeURIComponent(rkglsid) : '') + _getHref() + "&v=" + version;
      }

      function _prepare_offline_conversion_gif(orderObject){
         if ( !orderObject || !orderObject.mid ) { return undefined };
         
         var attr = '';
         for ( var key in orderObject ) {
            if (orderObject.hasOwnProperty(key)){
               if ( key == "sids" && orderObject.sids ) {
                  attr += "&" + orderObject.sids; 
               }
               else {
                  attr += "&" + key + "=" + encodeURIComponent(orderObject[key]);
               }
            };
         };
         return attr + _getHref();
      }

      function _self_referred(){
         return document.referrer.indexOf(location.protocol + "//" + location.host) === 0;
      }

      function _get_attributes_and_set_cookies(mid, cid, landingPageUrl){
         var isCrossDomain = window.location.href.indexOf('rkglsid=') > -1;
         var param = new Object();
         var paramsObj = _searchToObject(landingPageUrl);
         var cookies = _getCookies();
         param.mrkgadid = paramsObj.mrkgadid;
         
         var rkglsid;
         if (paramsObj.rkglsid) {
            rkglsid = _stripTimestamp(paramsObj.rkglsid);
         } else if (cookies.rkglsid) {
            rkglsid = _stripTimestamp(cookies.rkglsid);
         }

         if (rkglsid == 0 || !rkglsid) {
            rkglsid = _merkle_generate_rkglsid( mid );
         }
         
         if (!isCrossDomain){
            _setCookieRefreshTTL("rkglsid", rkglsid);
         }
         
         var rkglsidParam = rkglsid ? "&rkglsid=" + encodeURIComponent(rkglsid) : '';
         var cidParam = cid ? "&cid=" + encodeURIComponent(cid) : '';
         var srcParam = paramsObj && paramsObj.rkg_src ? "&src=" + encodeURIComponent(paramsObj.rkg_src) : "";
         var versionParam = "&v=" + version;
          param.params = rkglsidParam + srcParam + cidParam + _getHref() + versionParam;
         return param;
      }
      
      function _getCookies(){
         var cookiesObj = {};            
         var cookiesArray = document.cookie.split(";");
         for (var i=0; i < cookiesArray.length; i++){
            var cookie = cookiesArray[i].trim().split('=')
            var cookieName = cookie[0];
            var cookieValue  = cookie[1];
            if ( cookieName == 'rkglsid') {
               cookiesObj[cookieName] = cookieValue;
            }
         }
         return cookiesObj;  
      }

      function _stripTimestamp(cookieValue){
         if (!cookieValue){ return undefined; };

         try {
            var startIndex = 0;
            var endIndex = cookieValue.length;

            if (cookieValue.indexOf("h-") !== -1) {
               startIndex = cookieValue.indexOf("h-")+2;
            }

            if (cookieValue.indexOf("_t-") !== -1) {
               endIndex = cookieValue.indexOf("_t-");
            }

            return cookieValue.substring(startIndex, endIndex);
         } catch(e) {};
      }
      
      function _setCookieRefreshTTL(cookieName, cookieValue){
         if (!cookieName || !cookieValue){ return false; };

         var domain = _retrieveApexDomain();
         var expirationDate = new Date();
         var theTime = Math.round( expirationDate.getTime() / 1000 );
         expirationDate.setDate( expirationDate.getDate() + 365 );
         var value = "h-" + escape( cookieValue ) + "_t-" + theTime + ";expires=" + expirationDate.toUTCString() + ";path=/;domain=" + domain;
         document.cookie = cookieName + "=" + value;
      }

      function _merkle_generate_rkglsid( mid ) {
         var tsid;
         var v = 0;
         var hexmid = '';
         var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
         mid = mid.substring(0,4);
         var midArray = mid.split('');
         for (var i=0; i < midArray.length; i++){
            v = v * 64 + chars.search( midArray[i] );
         }
         hexmid = hexmid + v.toString(16);   
         
         var today  = new Date();
         var hexsec = today.getTime().toString(16);
         tsid = Math.floor( Math.random() * 65536 ).toString(16)
            + Math.floor( Math.random() * 65536 ).toString(16)  
            + hexmid 
            + navigator.userAgent.replace(/[^0-9a-f]/g,'').split("").reverse().join("").substring(0,10)
            + hexsec;
         
         while ( tsid.length < 32 ){
            hexran = Math.floor( Math.random() * 16 ).toString(16);
            tsid = tsid + hexran;
         }
         if ( tsid.length > 32 ){
            tsid = tsid.substring(0,32);
         }
         return tsid;
      }    

      function _searchToObject(landingPageUrl) {
        var pairs;

        if (landingPageUrl) {
            pairs = landingPageUrl.split("?")[1].split("&");
        } else {
            pairs = window.location.search.substring(1).split("&");
        }

         var obj = {};
         for ( var i=0; i < pairs.length; i++ ) {
            if ( pairs[i] === "" ) continue;
            var pair = pairs[i].split("=");
            obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
         }
         return obj;
      }
      
      function _retrieveApexDomain() {
         var i=0,domain=document.domain,p=domain.split('.'),s='_gd'+(new Date()).getTime();
         while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
            domain = p.slice(-1-(++i)).join('.');
            document.cookie = s+"="+s+";domain="+domain+";";
         }
         document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
         return domain;
      }

      function _getHref() {
          return window.location.href ? "&href=" + encodeURIComponent(window.location.href) : "";
      }

   }
   catch( e ){}
})(window.merklesearch = window.merklesearch || {});
