(function(){
	
	//Check url
	if (isNeedWebpush()){
		var reg;
		var sub;
		
		if ('serviceWorker' in navigator) {		  
		  navigator.serviceWorker.register('/reg_webpush.js').then(function(registration) {
			registration.update();  //only work when previous service worker check was more than twenty-four hours ago.
		    return navigator.serviceWorker.ready;
		  }).then(function(serviceWorkerRegistration) {

		    reg = serviceWorkerRegistration;
		    //console.log('Service Worker is ready :^)', reg);
		    
		    //Get subscription state
		    reg.pushManager.getSubscription().then(function(subscription) {
		      
		      sub = subscription;
		      
		      //If not subscribed, subscribe it
		      if (!sub){
		    	  
		    	  var isAskingDialogShowing = false;
		    	  if (Notification.permission == "default"){
		    		  isAskingDialogShowing = true;		    		  
		    		  
		    		  GoogleAnalyticsEventTracking("Webpush", "AskingDialogShowed", getGaSendingValue());
		    	  }
		    	  
	    		  
		    	  reg.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription){
		    		  
		    		  if (isAskingDialogShowing){
		    			  GoogleAnalyticsEventTracking("Webpush", "WebpushAllowedFromAskingDialog", getGaSendingValue());
		    		  }
		    		  
		    		    sub = subscription;
		    		    var subJSON = sub.toJSON();
		    		    console.log("Subscribed:");
		    		    console.log(subJSON);
		    		    
		    		    var request = new XMLHttpRequest();
		    		    request.open('POST', '/prog/util/web-notification/ajax/insertSubscriberData.jsp', true);
		    		    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		    		    request.send(getParamStringFromObejct({
		    		    	endpoint : subJSON.endpoint,
		    		    	auth : subJSON.keys.auth,
		    		    	p256dh : subJSON.keys.p256dh,
		    		    	subscriber_url : location.href		    		    	
		    		    }));
		    		    
		    		  });
		      }else{
		    	  var subJSON = sub.toJSON();
		    	  console.log("subscried before");
		    	  console.log(subJSON);
		      }
		      
		    }).catch(function(err) {
		      console.log('Error during getSubscription()', err);
		    });
		    
		  }).catch(function(error) {
		    console.log('Service Worker Error :^(', error);
		  });
		}
	}
	
	//functions
	function getParamStringFromObejct(object){
		var resultString = "";
		Object.getOwnPropertyNames(object).forEach(function (value, index, array) {
	    if (index == 0){
	    	resultString += (value + "=" + object[value]);
	    }else{
	    	resultString += ("&" + value + "=" + object[value]);
	    }
	  });
	  
	  return resultString;
	}
	
	function isNeedWebpush(){
		var url = location.href.toLowerCase();
		//Don't ask user allow webpush frequently.
		if (navigator.userAgent.indexOf("Chrome") < 0 || navigator.userAgent.indexOf("Mobile") >= 0 || getCookie("cyberlink_isTodayAskedWebpush")){
		//if (navigator.userAgent.indexOf("Chrome") < 0 || navigator.userAgent.indexOf("Mobile") >= 0){
			return false;
		}else{
			var isNeedWebpush = false;
			var urlType = getUrlTypeFromUrl(url);
			
			if (urlType > 0){
				var locale = getLocaleFromUrl(url);
				if (getCookie("B-locale")){
					locale =　getCookie("B-locale");
				}
				
				switch (locale){
					case "en_US":
					case "en_GB":
					case "en_CA":
					case "en_AU":
					case "en_EU":
					case "en_NZ":
						if (urlType == 1 || urlType == 2 || urlType == 3 || urlType == 4 || urlType == 12 || urlType == 18){
							isNeedWebpush = true;
						}else if (urlType == 5 || urlType == 8){							
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra" || getProductFromUrl(url) == "director-suite" || getProductFromUrl(url) == "photodirector-ultra" || getProductFromUrl(url) == "cyberlink-media-suite-ultra" || getProductFromUrl(url) == "photodirector-ultra" || getProductFromUrl(url) == "youcam"){
								isNeedWebpush = true;
							}
						}else if (urlType == 9){							
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra" || getProductFromUrl(url) == "director-suite" || getProductFromUrl(url) == "photodirector-ultra" || getProductFromUrl(url) == "cyberlink-media-suite-ultra"){
								isNeedWebpush = true;
							}
						}else if (urlType == 6 || urlType == 7){
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra" || getProductFromUrl(url) == "powerdirector-ultimate" || getProductFromUrl(url) == "director-suite" || getProductFromUrl(url) == "photodirector-ultra" || getProductFromUrl(url) == "cyberlink-media-suite-ultra"){
								isNeedWebpush = true;
							}
						}							
					break;
					case "zh_TW":
					case "zh_CN":
						if (urlType == 2 || urlType == 3 || urlType == 4){
							isNeedWebpush = true;
						}else if (urlType == 8){
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra"){
								isNeedWebpush = true;
							}
						}
					break;
					
					case "ko_KR":
						if (urlType == 3){
							isNeedWebpush = true;
						}else if (urlType == 8){							
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra"){
								isNeedWebpush = true;
							}
						}					
					break;
					case "de_DE":
						if (urlType == 1 || urlType == 3 || urlType == 4 || urlType == 5 || urlType == 10 || urlType == 19){
							isNeedWebpush = true;
						}else if (urlType == 8 || urlType == 9){
							if (getProductFromUrl(url) == "powerdvd-ultra"){
								isNeedWebpush = true;
							}
						}
					break;
					case "fr_FR":
						if (urlType == 1 || urlType == 3 || urlType == 5 || urlType == 8 || urlType == 10 || urlType == 11 || urlType == 12){
							isNeedWebpush = true;
						}else if (urlType == 9){
							if (getProductFromUrl(url) == "powerdvd-ultra"){
								isNeedWebpush = true;
							}
						}
					break;
					case "es_ES":
						if (urlType == 3 || urlType == 5 || urlType == 7 || urlType == 8 || urlType == 10 || urlType == 11){
							isNeedWebpush = true;
						}else if (urlType == 9){
							if (getProductFromUrl(url) == "powerdvd-ultra"){
								isNeedWebpush = true;
							}
						}
					break;
					
					case "it_IT":
						if (urlType == 3 || urlType == 10 || urlType == 11){
							isNeedWebpush = true;
						}else if (urlType == 8){
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "youcam"){
								isNeedWebpush = true;
							}
						}
					break;
					case "ja_JP":
						if (urlType == 1 || urlType == 12){
							isNeedWebpush = true;
						}else if (urlType == 5){
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra" || getProductFromUrl(url) == "cyberlink-media-suite-ultra"){
								isNeedWebpush = true;
							}
						}else if (urlType == 6 || urlType == 7){
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra" || getProductFromUrl(url) == "powerdirector-ultimate"){
								isNeedWebpush = true;
							}
						}else if (urlType == 8 || urlType == 9){
							if (getProductFromUrl(url) == "powerdirector-ultra" || getProductFromUrl(url) == "powerdvd-ultra"){
								isNeedWebpush = true;
							}
						}
					break;
				}
				
				
				
			}
			
			if (isNeedWebpush){
				setCookie("cyberlink_isTodayAskedWebpush", "true", 1, location.hostname, "/");
			}
			
			return isNeedWebpush;
			
		}		
	}
	
	function getUrlTypeFromUrl(url){
		url = location.href.toLowerCase();
		var urlType = 0;
		
		if (/[^./]+\.cyberlink\.com\/index_[^./]+\.html/.test(url) || /[^./]+\.cyberlink\.com(\?.*|\/)?$/.test(url)){
			urlType = 1;
		}else if (/[^./]+\.cyberlink\.com\/store\/index_[^./]+\.html/.test(url)){
			urlType = 2;
		}else if (/[^./]+\.cyberlink\.com\/downloads\/trials\/index_[^./]+\.html/.test(url)){
			urlType = 3;
		}else if (/[^./]+\.cyberlink\.com\/products\/index_[^./]+\.html/.test(url)){
			urlType = 4;
		}else if (/[^./]+\.cyberlink\.com\/products\/[^./]+\/features_[^./]+\.html/.test(url)){
				urlType = 5;
		}else if (/[^./]+\.cyberlink\.com\/store\/[^./]+\/buy_[^./]+\.html/.test(url)){
				urlType = 6;
		}else if (/[^./]+\.cyberlink\.com\/store\/[^./]+\/upgrade_[^./]+\.html/.test(url)){
				urlType = 7;
		}else if (/[^./]+\.cyberlink\.com\/downloads\/trials\/[^./]+\/download_[^./]+\.html/.test(url)){
				urlType = 8;
		}else if (/[^./]+\.cyberlink\.com\/support\/[^./]+\/patches_[^./]+\.html/.test(url)){
				urlType = 9;
		}else if (/[^./]+\.cyberlink\.com\/support\/product-update\.do/.test(url)){
				urlType = 10;
		}else if (/[^./]+\.cyberlink\.com\/stat\/product\/free-zone\/[^./]+\/free-software-static\.jsp/.test(url)){
				urlType = 11;
		}else if (/membership\.cyberlink\.com\/prog\/member\/service\/index\.do/.test(url)){
				urlType = 12;
		}else if (/[^./]+\.cyberlink\.com\/support\/index\.html/.test(url)){
			urlType = 18;
		}else if (/membership\.cyberlink\.com\/prog\/member\/sign-in\.do/.test(url)){
			urlType = 19;
		}
		
		return urlType;
	}
	
	function getLocaleFromUrl(url){ //not browser locale
		url = location.href.toLowerCase();
		var lang = "en_US";
		
		//get lang from domain
		if (url.indexOf("www.") > 0){
			lang = "en_US";
		}else if (url.indexOf("tw.") > 0 || url.indexOf("cht") >0 ){
			lang = "zh_TW";
		}else if (url.indexOf("cn.") > 0 || url.indexOf("chs") >0 ){
			lang = "zh_CN";
		}else if (url.indexOf("kr.") > 0 || url.indexOf("kor") >0 ){
			lang = "ko_KR";
		}else if (url.indexOf("de.") > 0 || url.indexOf("deu") >0 ){
			lang = "de_DE";
		}else if (url.indexOf("fr.") > 0 || url.indexOf("fra") >0 ){
			lang = "fr_FR";
		}else if (url.indexOf("es.") > 0 || url.indexOf("esp") >0 ){
			lang = "es_ES";
		}else if (url.indexOf("it.") > 0 || url.indexOf("ita") >0 ){
			lang = "it_IT";
		}else if (url.indexOf("jp.") > 0 || url.indexOf("jpn") >0 ){
			lang = "ja_JP";
		}
		
		if (url.indexOf("en_us") > 0){
			lang = "en_US";
		}else if (url.indexOf("en_gb") > 0){
			lang = "en_GB";
		}else if (url.indexOf("en_ca") > 0){
			lang = "en_CA";
		}else if (url.indexOf("en_au") > 0){
			lang = "en_AU";
		}else if (url.indexOf("en_eu") > 0){
			lang = "en_EU";
		}else if (url.indexOf("en_nz") > 0){
			lang = "en_NZ";
		}else if (url.indexOf("zh_tw") > 0){
			lang = "zh_TW";
		}else if (url.indexOf("zh_cn") > 0){
			lang = "zh_CN";
		}else if (url.indexOf("ko_kr") > 0){
			lang = "ko_KR";
		}else if (url.indexOf("de_de") > 0){
			lang = "de_DE";
		}else if (url.indexOf("fr_fr") > 0){
			lang = "fr_FR";
		}else if (url.indexOf("es_es") > 0){
			lang = "es_ES";
		}else if (url.indexOf("it_it") > 0){
			lang = "it_IT";
		}else if (url.indexOf("ja_jp") > 0){
			lang = "ja_JP";
		}
		
		return lang;
	}
	
	function getProductFromUrl(url){
		url = location.href.toLowerCase();
		var product = "";
		
		if(/[^./]+\.cyberlink\.com\/products\/([^./]+)\/features_[^./]+\.html/.exec(url)){
			product = /[^./]+\.cyberlink\.com\/products\/([^./]+)\/features_[^./]+\.html/.exec(url)[1];
		}else if(/[^./]+\.cyberlink\.com\/store\/([^./]+)\/buy_[^./]+\.html/.exec(url)) {
			product = /[^./]+\.cyberlink\.com\/store\/([^./]+)\/buy_[^./]+\.html/.exec(url)[1];
		}else if(/[^./]+\.cyberlink\.com\/store\/([^./]+)\/upgrade_[^./]+\.html/.exec(url)) {
			product = /[^./]+\.cyberlink\.com\/store\/([^./]+)\/upgrade_[^./]+\.html/.exec(url)[1];
		}else if(/[^./]+\.cyberlink\.com\/downloads\/trials\/([^./]+)\/download_[^./]+\.html/.exec(url)) {
			product = /[^./]+\.cyberlink\.com\/downloads\/trials\/([^./]+)\/download_[^./]+\.html/.exec(url)[1];
		}else if(/[^./]+\.cyberlink\.com\/support\/([^./]+)\/patches_[^./]+\.html/.exec(url)) {
			product = /[^./]+\.cyberlink\.com\/support\/([^./]+)\/patches_[^./]+\.html/.exec(url)[1];
		}
		
		return product;
		
	}
	
	function getGaSendingValue(){
		var gaSendingValue = "";
		var url = location.href;
		
		//lang
		gaSendingValue += "" + (getCookie("CLCUSTOMERLANG") ? getCookie("CLCUSTOMERLANG") : "ENU");
		//locale
		gaSendingValue += "_" + (getCookie("B-locale") ? getCookie("B-locale") : "en_US");
		//url type
		gaSendingValue += "_" + getUrlTypeNameFromUrlType(getUrlTypeFromUrl(url));
		//product
		gaSendingValue += "_" + (getProductFromUrl(url) ? getProductFromUrl(url) : "noProduct");
		//url
		//gaSendingValue += "_" + location.href;
		
		
		return gaSendingValue;
	}
	
	function getUrlTypeNameFromUrlType(urlType){
		var urlTypeName = "";
		
		if(urlType==1){
			urlTypeName = "Homepage";
		}else if(urlType==2){
			urlTypeName = "Store Index";
		}else if(urlType==3){
			urlTypeName = "Trial Index";
		}else if(urlType==4){
			urlTypeName = "Product Index";
		}else if(urlType==5){
			urlTypeName = "Proudct Feature Page";
		}else if(urlType==6){
			urlTypeName = "Proudct  Store Page Full";
		}else if(urlType==7){
			urlTypeName = "Proudct  Store Page Upgrade";
		}else if(urlType==8){
			urlTypeName = " Proudct  Trial Page";
		}else if(urlType==9){
			urlTypeName = "Software Update Page";
		}else if(urlType==10){
			urlTypeName = "Product Support update";
		}else if(urlType==11){
			urlTypeName = "Free Software-update ";
		}else if(urlType==12){
			urlTypeName = "Member Zone Page";
		}else if(urlType==13){
			urlTypeName = "seeding page";
		}else if(urlType==14){
			urlTypeName = "bb page";
		}
		
		return urlTypeName
	}
	
	function setCookie(c_name,value,expiredays, domain, path)
	{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) +
		((domain==null) ? "" : ";domain="+domain) + 
		((path==null) ? "" : ";path="+path);
	}
	
	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
		    { 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
		    } 
		  }
		return ""
	}
})();