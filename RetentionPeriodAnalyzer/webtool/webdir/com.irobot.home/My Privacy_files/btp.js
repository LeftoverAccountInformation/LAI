//iRobot NA

function createPixel(src){
  var input = document.createElement('img');
  input.setAttribute('src',src);
  input.setAttribute('width', 1);
  input.setAttribute('height', 1);
  input.setAttribute('alt', "");
  input.setAttribute('style', "display:none !important;");
  document.body.appendChild(input); 
}
try{
//apn ads - all accounts
if(window.location.href.toLowerCase().indexOf("orderconfirmation") >= 0 && document.querySelectorAll(".order-number .value").length){
    var oN = document.querySelector(".order-number .value").textContent; //order id
    var oV = document.querySelector(".col3 .order-payment-summary .order-subtotal td+td").textContent.match(/[0-9.,]+/)[0].replace(",","");
	window.cybOrderData = {
        order_id: oN,
        value: oV
	};
	//if(document.querySelector(".country-selector")){
		if(window.location.hostname.indexOf("com") >= 0){
    		createPixel("//secure.adnxs.com/px?id=776370&seg=3140782&order_id="+oN+"&value="+oV+"&other=[USD]&t=2");
		}else if(window.location.hostname.indexOf("ca") >= 0){
			createPixel("//secure.adnxs.com/px?id=1047489&seg=15951518&order_id="+oN+"&value="+oV+"&other=[CAD]&t=2");
		}
	//}
}else if(window.location.href.toLowerCase().indexOf("product.jsp") >= 0){
    createPixel("//secure.adnxs.com/seg?add=3140780&t=2");
}
if(window.location.href.toLowerCase().indexOf("cart") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414423&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("530") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414346&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("390") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414344&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("240") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414343&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("614") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414341&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("690") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414336&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("890") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414334&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("960") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414333&t=2"); 
}else if(window.location.href.toLowerCase().indexOf("980") >= 0){
    createPixel("//secure.adnxs.com/seg?add=11414332&t=2"); 
}
createPixel("//secure.adnxs.com/seg?add=3140781&t=2"); 
}catch(e){}

getProdSku();

try{
	var load = !0; 
	if(document.querySelector("[class*='step-'].active") && document.querySelector("[class*='step-'].active").classList[0].replace(/[^0-9]+/g, '') === '2' ) load = !1;
	
	var shopUrlCYB = 'google.com'
	load && !function(){var t=function(t){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=t;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)},e=Math.floor(5e4*Math.random());t("//d2rp1k1dldbai6.cloudfront.net/cybba_latest.min.js"),t("https://files1.cybba.solutions/"+shopUrlCYB+"/loader.min.js?v="+e),window._vteq=window._vteq||[],setTimeout(function(){window._vtsdk||t("https://storage.googleapis.com/cybcdn/"+shopUrlCYB+"/loader.js?v="+e)},1100),setTimeout(function(){"nestedVarDefined"in window&&!nestedVarDefined("_vtsdk.state.eventQueue")&&"_vtsdk"in window&&_vtsdk.init()},3e3)}();
}catch(e){}


function getProdSku(){
  if(document.querySelector('.sku.itemno')){
    	productID = document.querySelector('.sku.itemno').innerText.split(': ')[1];
            //productID = getProdSku();//productID.id;
        if(productID === "R980020"){//iRobot 980
             segment = "13663631";
        }else if(productID === "R890020"){// iRobot 890
              segment= "13663846";
        }else if(productID === "R960020"){// iRobot 960
              segment= "15683600";
        }else if(productID === "R675020"){// iRobot 675
              segment= "15683589";
        }else if(productID === "R690020"){// iRobot 690
              segment= "13663920";
        }else if(productID === "R616040"){ // iRobot 614
              segment= "13663943";
        }else if(productID === "M530020"){// Mirra 530
              segment= "13664950";
        }else if(productID === "B240020"){// Braava Jet 240
              segment= "13665006";
        }else if(productID === "B380020"){// iRobot Braava 380t 
              segment= "13665022";
        }else if(productID === "i715020"){// Roomba i7
              segment= "14575441";
        }else if(productID === "i755020"){// Roomba i7Plus
              segment= "14575445";
        }else if(productID === "e515020"){// Roomba e5
              segment= "14575450";
        }else if(productID === "s955020"){// Roomba s9+
              segment= "19393804";
        }else if(productID === "4699391"){// Roomba s9
              segment= "19393814";
        }else if(productID === "614020"){// R615 
              segment= "13663943";
        }else if(productID === "m611020"){// m6 
              segment= "19394074";
        }else if(productID === "4696510"){// R675 B240 Bundle 
              segment= "19393846";
        }else if(productID === "4699392"){// s9Plus m6 Bundle
              segment= "19393864";
        }else if(productID === "4699391"){// s9 m6 Bundle
              segment= "19393874";
        }else if(productID === "4699390"){// i7Plus m6 Bundle
              segment= "19394031";
        }else if(productID === "4699388"){// i7 m6 Bundle
              segment= "19394033";
        }else if(productID === "4699386"){// e5 B240 Bundle
              segment= "19394036";
        }else if(productID === "4643135"){// e5 B380t Bundle
              segment= "19394047";
        }else if(productID === "4699387"){// r960 m6 Bundle
              segment= "19394073";
        }else{
              segment= "13665525"
        }
        var adnxCyb = "[src*='adnxs.com/seg?add="  + segment + "']"
        if(!document.querySelector(adnxCyb)){
          createPixel("//secure.adnxs.com/seg?add="+segment+"&t=2");
        }
        
  }
}