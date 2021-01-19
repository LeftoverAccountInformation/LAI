function CLMemberObj(){
    this.emailAddress = "";
    this.firstName = "";
	this.lastName = "";
	this.name = ""; // full name
}
CLMemberObj.prototype.getMemberDataFromXML = function(CLMemberXML) {
    this.emailAddress = $(CLMemberXML).find("emailAddress").text();
	this.firstName = $(CLMemberXML).find("firstName").text();
	this.lastName = $(CLMemberXML).find("lastName").text();
}
CLMemberObj.prototype.getMemberDataFromJSON = function(Json) {
    this.emailAddress = Json["emailAddress"];
	this.firstName = Json["firstName"];
	this.lastName = Json["lastName"];
}
function closeFacebookDiv() { 
    var closeFacebookDivToday = new Date(); 
	var cyberlinkCookieExpireDate = new Date(closeFacebookDivToday.getTime() + 86400000);
	$("#social_feedback").hide();
	setCyberLinkCookie('closeFacebookDiv', 'yes', cyberlinkCookieExpireDate);  
} 
function setCyberLinkCookie(name, value, expires, path, domain, secure) { 
    var cyberLinkCookieString = name + "=" +escape(value) + 
       ( (expires) ? ";expires=" + expires.toGMTString() : "") + ";path=/" + 
       ( (domain) ? ";domain=" + domain : "") + 
       ( (secure) ? ";secure" : ""); 
    document.cookie = cyberLinkCookieString; 
} 
function changeLangLocaleDomain(lang){
	$("#selectLanguageReferer").val(window.location.href);
	$("#nLangIdAndLocale").val(lang);
	$("#nLangIdAndLocaleForm").submit();	
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}
function createXmlDOMObject(xmlString){         
	var xmlDoc = null;          
	if(!window.DOMParser){                       
		xmlDoc = new ActiveXObject( "Microsoft.XMLDOM" );             
		xmlDoc.async = false;             
		xmlDoc.loadXML(xmlString);         
	}else{              
		xmlDoc = xmlString;
	}          
	return xmlDoc;     
}
function createMemberDataObjFromXML(){
	var memberObj = new CLMemberObj();     
	$.ajax({
		type: "POST",
		url: "/ws_member/queryMemberCookieData.jsp",
		dataType: "XML",
		cache: false,
		async: false,
		contentType: "text/html; charset=utf-8",
		success: function(data){			
			memberObj.getMemberDataFromXML(createXmlDOMObject(data));			
		}
	});
	return memberObj;
} 
function createMemberDataObjFromJSON(){
	var memberObj = new CLMemberObj();     
	$.ajax({
		type: "POST",
		url: "/ws_member/queryMemberCookieData.jsp",
		dataType: "json",
		cache: false,
		async: false,
		contentType: "text/html; charset=utf-8",
		success: function(data){			
			memberObj.getMemberDataFromJSON(data);			
		}
	});
	return memberObj;
}
function memberZoneHeaderLinkNameLimitLength(txt, lenLimit) {
	txt = txt.replace(/\s+/g, " ");
	var sTmp = txt.replace(/\*/g, " ").replace(/[^\u0000-\u00ff]/g, "**").substring(0, lenLimit);
	var sResult = txt.substring(0, sTmp.length - (sTmp.search(/\*{2}/)>-1 ? sTmp.match(/\*{2}/g).length : 0));
	return (sResult + (sResult.length!=txt.length ? ".." : ""));
}
function currencyChange(){
	var currencyLocale = $("#currencyId option:selected").attr("currencyLocale");
	if(currencyLocale.split(",")[1]=="null"){
		document.currencyForm.submit();
	}else{
		changeLangLocaleDomain(currencyLocale);
	}	
}
function currencyChangeMobile(currencyLocaleVale){
	var currencyLocale = currencyLocaleVale;
	if(currencyLocale.split(",")[1]=="null"){
		document.currencyForm.submit();
	}else{
		changeLangLocaleDomain(currencyLocale);
	}	
}