function addScriptManager() {
	var parent = document.getElementsByTagName('head')[0];

	// get script reference
	var scriptTags = document.getElementsByTagName('script');
	var url = '';
	for (var i = 0; i < scriptTags.length; i++) {
		var src = scriptTags[i].getAttribute('src', -1);
		if (src > '' && src.toLowerCase().indexOf('nextit-script-manager.js') > -1) {
			url = src;
			break;
		}
	}

	var baseUrl = url.substr(0, url.toLowerCase().lastIndexOf('/'));
	var currentTime = new Date().getTime();

	var scriptTag = document.createElement('script');
	scriptTag.id = "nit-loader";
	scriptTag.setAttribute('type', 'text/javascript');
	scriptTag.setAttribute('language', 'javascript');
	scriptTag.setAttribute('async', 'true');
	scriptTag.setAttribute('src', baseUrl + '/nextit-loader.js?' + currentTime);

	if (parent) parent.appendChild(scriptTag);
};
function addLaunchFunction() {
	if (!window.NITAgent) 
		window.NITAgent = {};

	if (!window.NITAgent.showAgentWithQuestion) 
		window.NITAgent.showAgentWithQuestion = fakeLaunch;

	function fakeLaunch() {
		var args = [].slice.call(arguments);
		var launch = window.NITAgent.showAgentWithQuestion;
		if (launch !== fakeLaunch) {
			launch.apply(null, args);
		} else {
			setTimeout(function () { fakeLaunch.apply(null, args) }, 100);
		}
	}
};

window.addEventListener('load', 
  function() { 
	addLaunchFunction();
	addReduce();
	addScriptManager();
  }, false);

/*
The tickets page is using an old version of prototype and it is interfering with our reduce function.
Amtrak removed the reduce function from their prototype file but we need to add back the default.
This needs to be added before redux does it's thing.
*/
function addReduce(){
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
//if (!Array.prototype.reduce) {
	Object.defineProperty(Array.prototype, 'reduce', {
	  value: function(callback /*, initialValue*/) {
		if (this === null) {
		  throw new TypeError( 'Array.prototype.reduce ' + 
			'called on null or undefined' );
		}
		if (typeof callback !== 'function') {
		  throw new TypeError( callback +
			' is not a function');
		}
  
		// 1. Let O be ? ToObject(this value).
		var o = Object(this);
  
		// 2. Let len be ? ToLength(? Get(O, "length")).
		var len = o.length >>> 0; 
  
		// Steps 3, 4, 5, 6, 7      
		var k = 0; 
		var value;
  
		if (arguments.length >= 2) {
		  value = arguments[1];
		} else {
		  while (k < len && !(k in o)) {
			k++; 
		  }
  
		  // 3. If len is 0 and initialValue is not present,
		  //    throw a TypeError exception.
		  if (k >= len) {
			throw new TypeError( 'Reduce of empty array ' +
			  'with no initial value' );
		  }
		  value = o[k++];
		}
  
		// 8. Repeat, while k < len
		while (k < len) {
		  // a. Let Pk be ! ToString(k).
		  // b. Let kPresent be ? HasProperty(O, Pk).
		  // c. If kPresent is true, then
		  //    i.  Let kValue be ? Get(O, Pk).
		  //    ii. Let accumulator be ? Call(
		  //          callbackfn, undefined,
		  //          « accumulator, kValue, k, O »).
		  if (k in o) {
			value = callback(value, o[k], k, o);
		  }
  
		  // d. Increase k by 1.      
		  k++;
		}
  
		// 9. Return accumulator.
		return value;
	  }
	});
//}
}
