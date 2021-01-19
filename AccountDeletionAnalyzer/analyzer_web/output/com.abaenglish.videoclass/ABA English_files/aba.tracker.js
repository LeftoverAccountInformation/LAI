// Client-side tracking logic

var AbaTracker = function(){

  this.endpoint = 'https://tracker.analytics.aba.solutions';

  this.cookie = {

    get: function (sKey) {
      if (!sKey) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },

    set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "="
        + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "")
        + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");

      return true;
    },

    remove: function (sKey, sPath, sDomain) {
      if (!this.contains(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },

    contains: function (sKey) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    keys: function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };
}



AbaTracker.prototype.getQueryVariable = function(v) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == v) return decodeURIComponent(pair[1]);
  }
  return null;
}


AbaTracker.prototype.findUserId = function(){
  if(dataLayer != 'undefined' && dataLayer.length > 0 )
    for (var i = 0; i < dataLayer.length; i++)
      if('userId' in dataLayer[i])
        return dataLayer[i].userId;

  return null;
}


AbaTracker.prototype.track = function( event_type, track_data, response_fn ) {

  function toQuery(json){
    return '?auth=web_attr_key&' + Object.keys(json).map(function(key){ return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]); }).join('&');
  }

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == XMLHttpRequest.DONE){
      if(xmlhttp.status == 200) {
        if(typeof response_fn == 'function') response_fn(xmlhttp.responseText);
      }
    }
  };

  xmlhttp.open("GET", this.endpoint + "/" + event_type + "/" + toQuery(track_data), true);
  xmlhttp.send();
}
