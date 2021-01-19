var pp = JSON.parse(document.getElementById("privacy-policy-json").textContent);
var ppDate = new Date(pp.LastModifiedDate);
var nowPPDate = new Date();

var productBottom = 0;
try{
	$(document).ready(function(e) {
		if($('.back_top')){
			if($('.back_top').css('bottom')){
				productBottom = parseInt($('.back_top').css('bottom').replace("px", "")) ;		
				resetBBM();		
			}			
		}		
	});		
}catch(err){

}
function readGdprCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}
function hideGdprNote(){
	var d = new Date();
	d.setTime(d.getTime() + (20*365*24*60*60*1000));
	var expires = "expires="+ d.toString();
	var now = new Date();	
	document.cookie = "CLCC="+Math.floor(now.getTime()/1000)+";" + expires + ";domain=.cyberlink.com;path=/";	
	document.getElementById("gdpr_note").style.display = "none";
	if($('.back_top')){
		if($('.back_top').css('bottom')){
			resetBBM();
		}			
	}			
}	

var showPP = false;
if(readGdprCookie("CLCCEF")=="YES"){
	showPP = true;
	if(readGdprCookie("CLCC")!=""){		
		if(parseInt(readGdprCookie("CLCC"))>(Math.floor(ppDate.getTime()/1000)-nowPPDate.getTimezoneOffset()*60)){
			showPP = false;	
		}
	}			
}
function resetBBM(){	
	if($('.back_top')){
		if($('#gdpr_note').is(':visible')){
			if(productBottom<parseInt($("#gdpr_note").css("height").replace("px", ""))){
				$('.back_top').css('bottom',productBottom+parseInt($("#gdpr_note").css("height").replace("px", "")));
			}			
		}else{
			$('.back_top').css('bottom',productBottom);
		}		
	}
}
if(showPP){	
	document.getElementById("gdpr_note").style.display = "block";
}
try{
	$("body").append($("#gdpr_note"));	
}catch(err){

}
