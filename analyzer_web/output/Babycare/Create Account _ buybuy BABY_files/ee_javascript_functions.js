// JS Files Used for EE
function elementExists(elemName)
{
	console.log('-- checking ElementExists ---');
	if (document.getElementById(elemName))
	{
		console.log('-- '+ elemName + ' exists ---');
		return true;
	}
	else
	{
		console.log('-- '+ elemName + ' does NOT exist ---');
		return false;
	}
}
// Function to determine if a cookie with the passed in name exists in the source of the page
// If it does exist, return true, else false.
function rn_bbb_getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 
// -------------------------------------------------------------------------------------
// Function to determine if a cookie with the passed in name has a value = 1
// If it does not exist, return true, else false.
function checkChatDeclinedCookie(name) {
    var myCookie = rn_bbb_getCookie(name);

	console.log('--'+ myCookie+'---');
    if (myCookie == null) {
	    console.log('-- '+ name + ' does not exist, show offer ---');
        return true;  //cookie does not exist, always US
    }
    else {
        if(myCookie == 1) {
	        console.log('-- '+ name + ' equals 1, do not show offer ---');
	        return false; //cookie is not true
        }
        else {
	        console.log('-- '+ name + ' does not equal 1, show offer ---');
	        return true;  //cookie is true (have declined within last hour);
        }
    }
}

/*
//Travis.Cable - Required for chat widget
if (!window.VisitorService) {
    (function() {
      var l = 'buybuybabycom.custhelp.com',d=document,ss='script',s=d.getElementsByTagName(ss)[0];
      function r(u) {
        var rn=d.createElement(ss);
        rn.type='text/javascript';
        rn.defer=rn.async=!0;
        rn.src = "//" + l + u;
        s.parentNode.insertBefore(rn,s);
      }
      r('/rnt/rnw/javascript/vs/1/vsapi.js');
      r('/vs/1/vsopts.js');
    })();
}
*/