(function (window, document) {

	"use strict";

	function _jsMakeGeneralTag() {
		var generalTag = JumpstartGeneralTag();

		//To activate Jumpstart Tracking, uncomment the next two lines and fill in the Dealer ID.
		var dealerId = "12047";
		generalTag.setDealerId(dealerId);

		//To activate the Google Analytics Tag, uncomment the next two lines and fill in the Analytics Account ID.
		//var gaAcct = "UA-XXXXXXX-X";
		//generalTag.setGaAcct(gaAcct);

		//To activate the Audience Segments Tag, uncomment the next two lines and fill in the Network and Audience Segment IDs. Value needs array.
		var audSegArr = [{"nid":36117602,"sid":"638606045"}];
		generalTag.setAudienceSegmentTag(audSegArr);

		//To put a DFP Activity tag, uncomment and fill in the values below. Value needs array.
		var dfpArr = ["4406640"];
		generalTag.setDfpTag(dfpArr);

		//To put a DCM Activity tag, uncomment and fill in the values below. Value needs array.
		var dcmArr = [{"src":"8704599","type":"invmedia","cat":"autog0","count_meth":"s"}];
		generalTag.setDcmTag(dcmArr);

		return generalTag;
	}

	function JumpstartGeneralTag()
	{
		var priv = {
			body: document.getElementsByTagName('body')[0],
			head: document.getElementsByTagName('head')[0],
			sslLocation: "insecure",
			dealerId: null,
			gaAcct: null,
			audSegArr: null,
			dfpArr: null,
			dcmArr: null,
			searchUserId: null,
			searchSource: null,
			searchMedium: null,
			searchKeyword: null,

			detectSsl: function()
			{
				var loc = "insecure";
				var prot = parent.location.protocol;
				try {
					if(prot == "https:") {
						loc = "secure";
					}
				} catch(err) {
					loc = "insecure";
				}
				return loc;
			},

			getCookie: function(c_name)
			{
				if (document.cookie.length > 0) {
					var c_start = document.cookie.indexOf(c_name + "=");
					if (c_start!=-1) {
						c_start = c_start + c_name.length+1;
						var c_end = document.cookie.indexOf(";",c_start);
						if (c_end == -1) {
							c_end = document.cookie.length;
						}
						return unescape(document.cookie.substring(c_start,c_end));
					}
				}
				return "";
			},

			setCookie: function(c_name, value, days)
			{
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = ' ;expires=' + date.toGMTString();
				var path = ' ;path=/';
				document.cookie = c_name + '=' + value + expires + path;
			},
		
			getUrlParameter: function(name)
			{
				name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
				var regexS = "[\\?&]"+name+"=([^&#]*)";
				var regex = new RegExp(regexS);
				var results = regex.exec(window.location.href);
				if(results === null) {
					return "";
				} else {
					return results[1];
				}
			},

			createUniqueString: function()
			{
				var mydate = new Date();
				var myday = mydate.getDate();
				var mymonth = mydate.getMonth()+1;
				var myyear = ((mydate.getYear() < 100) ? "19" : "") + mydate.getYear();
				myyear = myyear.substring(2,4);
				var myhour = mydate.getHours();
				var myminutes = mydate.getMinutes();
				var myseconds = mydate.getSeconds();
				if(myday < 10) myday = "0" + myday;
				if(mymonth < 10) mymonth = "0" + mymonth;
				if(myhour < 10) myhour = "0" + myhour;
				if(myminutes < 10) myminutes = "0" + myminutes;
				if(myseconds < 10) myseconds = "0" + myseconds;
				var datearray = new Array(mymonth,myday,myyear,myhour,myminutes,myseconds);
				var uniq = "";
				var x;
				for(var i=0;i<datearray.length;i++){
					for(var z=0;z<2;z++){
						var which = Math.round(Math.random()*1);
						if(which===0){
							x = String.fromCharCode(64 + (Math.round(Math.random()*25)+1));
						} else {
							x = String.fromCharCode(47 + (Math.round(Math.random()*9)+1));
						}
						uniq += x;
					}
					uniq += datearray[i];
				}
				return uniq;
			},

			createGaTag: function()
			{

				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

				ga('create', priv.gaAcct, 'auto', {'name':'jts'});
				ga('jts.send', 'pageview');

			},

			createAudienceTag: function(networkId, segid, ord)
			{
				var t=document.createElement('img');
				t.width = '1';
				t.height = '1';
				t.border = '0';
				t.au = (networkId != 2909 ? "jam.bfppix.dfp" : "bfppix.dfp");
				t.src = 'https://pubads.g.doubleclick.net/activity;dc_iu=/' + networkId + '/' + t.au + ';dc_seg=' + segid + ';ord=' + ord + '?';

				if (priv.body !== "undefined") {
					priv.body.appendChild(t);
				} else if (priv.head !== "undefined") {
					priv.head.appendChild(t);
				} else {
					var w = '<im' + 'g src="' + t.src + '" width="1" height="1" border="0" alt="" />';
					document.write(w);
				}
			},

			createDfpTag: function(id, ord)
			{
				var t=document.createElement('img');
				t.width = '1';
				t.height = '1';
				t.border = '0';
				t.src = 'https://pubads.g.doubleclick.net/activity;xsp=' + id + ';ord=' + ord + '?';

				if (priv.body !== "undefined") {
					priv.body.appendChild(t);
				} else if (priv.head !== "undefined") {
					priv.head.appendChild(t);
				} else {
					var w = '<im' + 'g src="' + t.src + '"  width=1 height=1 border=0 />';
					document.write(w);
				}
			},

			createDcmTag: function(src, type, cat, count_meth, ord)
			{
				var t=document.createElement('iframe');
				t.setAttribute("width","1");
				t.setAttribute("height","1");
				t.setAttribute("frameBorder","0");
				t.style.display = 'none';
				t.src = 'https://' + src + '.fls.doubleclick.net/activityi;';
				t.src += 'src=' + src + ';type=' + type + ';cat=' + cat + ';';
				t.src += 'dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;';
				if (count_meth === 's') { t.src += 'ord=' + ord + '?'; }
				if (count_meth === 'u') { t.src += 'ord=1;num=' + ord + '?'; }

				if (priv.body !== "undefined") {
					priv.body.appendChild(t);
				} else if (priv.head !== "undefined") {
					priv.head.appendChild(t);
				} else {
					var w = '<ifr' + 'ame src="' + t.src + '" width="1" height="1" frameborder="0" style="display:none"></ifr' + 'ame>';
					document.write(w);
				}
			},

			jsPixel: function(dealerId, session, source, medium, keyword)
			{
				var ups = 'jssession=' + session + '&';
				ups += 'jsdealer=' + dealerId + '&';
				ups += 'jssource=' + source + '&';
				ups += 'jsmedium='  + medium + '&';
				ups += 'jskeyword=' + keyword;

				var a=document.createElement('img');
				a.width='0';
				a.height='0';
				a.src = 'https://www.jumpstarttaggingsolutions.com/tracking/general.php?' + ups;

				try {
					priv.head.appendChild(a);
				} catch(err) {
					var w = '<im' + 'g width=0 height=0 src="' + a.src + '">';
					document.write(w);
				}
			},

			setSslLocation: function(loc)
			{
				this.sslLocation = loc;
			}

		};

		var pub = {

			setDealerId: function(dealerId)
			{
				priv.dealerId = dealerId;
			},

			getGaAcct: function()
			{
				return priv.gaAcct;
			},

			setGaAcct: function(gaAcct)
			{
				priv.gaAcct = gaAcct;
			},

			setAudienceSegmentTag: function(audSegArr)
			{
				priv.audSegArr = audSegArr;
			},

			setDfpTag: function(dfpArr)
			{
				priv.dfpArr = dfpArr;
			},

			setDcmTag: function(dcmArr)
			{
				priv.dcmArr = dcmArr;
			},

			getSslLocation: function()
			{
				return priv.sslLocation;
			},

			getSearchSourceFromCookie: function()
			{
				var searchSource = priv.getCookie('jssource');
				return searchSource;
			},

			getSearchMediumFromCookie: function()
			{
				var searchMedium = priv.getCookie('jsmedium');
				return searchMedium;
			},

			getSearchKeywordFromCookie: function()
			{
				var searchKeyword = priv.getCookie('jskeyword');
				return searchKeyword;
			},

			getSearchSessionFromCookie: function()
			{
				var searchSession = priv.getCookie('jstrack');
				return searchSession;
			},

			goalSubmit: function(goalNumber)
			{
				var location = priv.sslLocation;
				var prefix = 'http://';
				if(location == 'secure') {
					prefix = 'https://';
				}
				var jsSession = priv.getCookie('jstrack');
				if (jsSession !== null && jsSession !== '') {
					var goal = goalNumber;
					var ups = "jssession=" + jsSession + "&goal=" + goal;
					var t=document.createElement('img');
					t.width='0';
					t.height='0';
					t.src= prefix + 'www.jumpstarttaggingsolutions.com/tracking/goals.php?' + ups + '&' + Math.random();
					priv.head.appendChild(t);
				}
			},

			linkValues: function(linkurl)
			{
				var testurl = linkurl;
				var qmr = testurl.search(/\?/);
				var qa = '?';
				if (qmr !== -1) {
					qa = '&';
				}
				var src = priv.getCookie('jssource');
				var med = priv.getCookie('jsmedium');
				var key = priv.getCookie('jskeyword');
				if (src !== null && src !== "") {
					window.open(linkurl + qa + "_jssource=" + src + "&_jsmedium=" + med + "&_jskeyword=" + key);
				} else {
					window.open(linkurl);
				}
			},

			linkSession: function(linkurl)
			{
				var testurl = linkurl;
				var qmr = testurl.search(/\?/);
				var qa = '?';
				if (qmr !== -1) {
					qa = '&';
				}
				var c = priv.getCookie('jstrack');
				if (c !== null && c !== "") {
					window.open(linkurl + qa + "_jscookie=" + c);
				}
				else {
					window.open(linkurl);
				}
			},

			writeTags: function()
			{
				var location = priv.sslLocation;
				var dealerId = priv.dealerId;
				var gaAcct = priv.gaAcct;
				var audSegArr = priv.audSegArr;
				var dfpArr = priv.dfpArr;
				var dcmArr = priv.dcmArr;

				var randomString = priv.createUniqueString();

				var jumpstartSource = priv.getUrlParameter('_jssource');
				var jumpstartMedium = priv.getUrlParameter('_jsmedium');
				var jumpstartKeyword = priv.getUrlParameter('_jskeyword');
				var linkedCookie = priv.getUrlParameter('_jscookie');
			
				if (linkedCookie !== null && linkedCookie !== '') {
					priv.setCookie('jstrack', linkedCookie, 365);
				}

				if (jumpstartSource !== null && jumpstartSource !== '' && dealerId !== null) {
					var jumpstartSession = priv.createUniqueString();
					priv.searchUserId = jumpstartSession;
					priv.setCookie('jstrack', jumpstartSession, 365);
					priv.setCookie('jssource', jumpstartSource, 365);
					priv.setCookie('jsmedium', jumpstartMedium, 365);
					priv.setCookie('jskeyword', jumpstartKeyword, 365);
					priv.jsPixel(location, dealerId, jumpstartSession, jumpstartSource, jumpstartMedium, jumpstartKeyword);
				}

				if (gaAcct) {
					priv.createGaTag();
				}

				if (audSegArr && audSegArr.length > 0) {
					for (var dfpA = 0; dfpA < audSegArr.length; dfpA++) {
						priv.createAudienceTag(audSegArr[dfpA].nid, audSegArr[dfpA].sid, randomString);
					}
				}

				if (dfpArr && dfpArr.length > 0) {
					for (var dfpI = 0; dfpI < dfpArr.length; dfpI++) {
						priv.createDfpTag(dfpArr[dfpI], randomString);
					}
				}

				if (dcmArr && dcmArr.length > 0) {
					for (var dcmI = 0; dcmI < dcmArr.length; dcmI++) {
						priv.createDcmTag(dcmArr[dcmI].src, dcmArr[dcmI].type, dcmArr[dcmI].cat, dcmArr[dcmI].count_meth, randomString);
					}
				}

			}

		};

		priv.setSslLocation(priv.detectSsl());

		return pub;

	}

	var _jsGeneralTag = _jsMakeGeneralTag();
	_jsGeneralTag.writeTags();

	window._jsGeneralTag = _jsGeneralTag;

})(window, document);
