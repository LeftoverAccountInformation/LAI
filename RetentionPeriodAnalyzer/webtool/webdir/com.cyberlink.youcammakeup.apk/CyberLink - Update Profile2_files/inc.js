function Error_ID(obj) {	
   	alert("�п�J���T�������Ҧr��")
	obj.focus();   	   	
}

function checkID( obj ) {
   var id = obj.value;
   tab = "ABCDEFGHJKLMNPQRSTUVWXYZIO"
   A1 = new Array (1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3 );
   A2 = new Array (0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5 );
   Mx = new Array (9,8,7,6,5,4,3,2,1,1);

   if ( id.length != 10 )	{ Error_ID(obj); return false;}
   i = tab.indexOf( id.charAt(0).toUpperCase());
   if ( i == -1 ) { Error_ID(obj); return false;}
   sum = A1[i] + A2[i]*9;

   for ( i=1; i<10; i++ ) {
      v = parseInt( id.charAt(i) );
      if ( isNaN(v) ) { Error_ID(obj); return false;}
      sum = sum + v * Mx[i];
   }
   if ( sum % 10 != 0 )	{ Error_ID(obj); return false;}
   return true;
}

function chk_Email(textin) {
	var filter  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	var chstr = textin.value;
 	if ( chstr != "" || (textin.getAttributeNode("notnull") != null && textin.getAttributeNode("notnull").value =="1") )
 	{
		if(!filter.test(chstr))
		{
			textin.focus();		
			return  false;
		}	
		else 
			return  true;
	}else
		return  true;
}

function isNumber(num) {
    var charset="0123456789";
    for (var i=0;i<num.length;i++) {
        if (charset.indexOf(num.charAt(i)) == -1)
            return(false);            
    }
    return(true);
}

function chk(formname){
try{
	var k=formname.elements.length;	
	for(var i=0;i<k;i++){
		var szTag = formname.elements[i].tagName;		
		switch ( szTag ) {
			case "INPUT":								
				if ( ( formname.elements[i].type == "checkbox" || formname.elements[i].type == "radio" )&& ( formname.elements[i].getAttributeNode("notnull") != null && formname.elements[i].getAttributeNode("notnull").value =="1" ) ) {					
					var nSel=0;
					var obj_col = document.getElementsByName(formname.elements[i].name);					
					for (j=0;j<obj_col.length;j++){
						if ( obj_col[j].checked == true ) nSel++;
					}
					if ( nSel < 1 ){
						alert(obj_col[0].title);
						obj_col[0].focus();
						return false;
					}
				} else {
					if ( formname.elements[i].value == "" && ( formname.elements[i].getAttributeNode("notnull") != null && formname.elements[i].getAttributeNode("notnull").value =="1" ) ) {
						if ( formname.elements[i].title != null )
							alert(formname.elements[i].title);
						else			
							alert("Please input data!");
						formname.elements[i].focus();
						return false;				
					} 				
					if ( formname.elements[i].name.indexOf("Email") >= 0 ||( formname.elements[i].getAttributeNode("checkEmailFormat") != null && formname.elements[i].getAttributeNode("checkEmailFormat").value =="1" ) ) {
						if ( chk_Email(formname.elements[i]) == false ) {
						if ( formname.elements[i].getAttributeNode("ErrMsg") != null )
							alert(formname.elements[i].getAttributeNode("ErrMsg").value);				
						else													
							alert("Please check your email format!")
							return false;
						}	
					}
					if ( ( formname.elements[i].getAttributeNode("isnumber") != null && formname.elements[i].getAttributeNode("isnumber").value =="1" ) ) {
						if ( isNumber(formname.elements[i].value) == false ) {
							if ( formname.elements[i].getAttributeNode("ErrMsg") != null )
								alert(formname.elements[i].getAttributeNode("ErrMsg").value);
							else
								alert("Please input number only!");
								formname.elements[i].focus();
								return false;				
						}
					} 				
				}
				break;
			case "TEXTAREA":			
				if ( formname.elements[i].value == "" && ( formname.elements[i].getAttributeNode("notnull") != null && formname.elements[i].getAttributeNode("notnull").value =="1" ) ) {
					if ( formname.elements[i].title != null )
						alert(formname.elements[i].title);
					else			
						alert("Please input data!");
					formname.elements[i].focus();
					return false;				
				} 				
				if ( formname.elements[i].name.indexOf("Email") >= 0 || ( formname.elements[i].getAttributeNode("checkEmailFormat") != null && formname.elements[i].getAttributeNode("checkEmailFormat").value =="1" ) ) {
					if ( chk_Email(formname.elements[i]) == false ) {
						if ( formname.elements[i].getAttributeNode("ErrMsg") != null )
							alert(formname.elements[i].getAttributeNode("ErrMsg").value);				
						else						
							alert("Please check your email format!");		
						return false;
					}	
				}			
				break;
			case "SELECT":		
				if ( ( formname.elements[i].getAttributeNode("notnull") != null && formname.elements[i].getAttributeNode("notnull").value =="1" ) && formname.elements[i].selectedIndex < parseInt(formname.elements[i].getAttributeNode("lowindex").value) ) {
					if ( formname.elements[i].title != null )
						alert(formname.elements[i].title);
					else			
						alert("Please select one choice!");
					formname.elements[i].focus();
					return false;										
				}
				break;
			default:
				break;
				
		}
		
	}
	return true;
  } catch (e) {
  	alert(e);
  	return true;
  }
}

function chk_Num(obj,min) {
	if ( obj != null ) {
		if ( isNaN(obj.value) || obj.value == "" ) {
			if ( obj.title != null )
				alert(obj.title);
			else
				alert("Please input a number!");
			obj.focus();
			return;
		} else {
			if ( min != null ) {
				if ( parseInt(obj.value) < parseInt(min) ) {
					alert("Mininum requirement is: " + min);
					obj.value = min;
					obj.focus();
					return;
				}
			}				
		}
		
	}
}

function chk_Date(date1,date2) {	//3rd argument, max:range_day
	var nRange = 0;	
	if ( arguments.length == 3 )
		nRange = arguments[2] ;	//day

	if ( date1.value != "" && date2.value != "" ) {
		if ( date1.value > date2.value ) {
			if ( date1.title != "")
				alert(date1.title);
			else
				alert("Please select valid period!");
			date2.focus();
			return false;
		} else if ( nRange != 0 ) {
			var t1 = Date.parse(date1.value);
			var t2 = Date.parse(date2.value);
			var nDiff_D = Math.round( Math.abs((t2-t1)/(3600*1000*24) ) );			
			if ( nDiff_D  > nRange ) {
					alert(date1.title);
					date2.focus();
					return false;
			}
		}
		return true;
	}
}

function UrlEncode(str){
	/*********qiushuiwuhen(2002-9-16)********/
	var i,c,p,q,ret="",strSpecial="!\"#$%&'()*+,/:;<=>?@[\]^`{|}~%";
	for(i=0;i<str.length;i++){
			c=str.charAt(i);
			if(c==" ")
				ret+="+";
			else if(strSpecial.indexOf(c)!=-1)
				ret+="%"+str.charCodeAt(i).toString(16);
			else
				ret+=c;
	}
	return (ret);
}

function disableSubmitButton(formObj, canDisable) { // CS request: prevent double submit	
	if(canDisable) {
		formObj.submitButton.disabled = true;
		return true;
	}
	return false;
}