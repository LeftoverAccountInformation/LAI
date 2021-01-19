$(function(){
	$("img.CLlazy").lazyload({         
		effect : "fadeIn"
	});
	
	$("img.CLlazy2").lazyload({         
		effect : "fadeIn"
	});	
	
	$("img.CLlazy1200x600").lazyload({         
		effect : "fadeIn"
	});
	
	$("img.CLlazy540x315").lazyload({         
		effect : "fadeIn"
	});
	
	$("img.CLlazy140x140").lazyload({         
		effect : "fadeIn"
	});	
});

function scrollOri(){
	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
   
    window.scrollTo(left,top+1);
	top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	window.scrollTo(left,top-1);
}


$( document ).ready(function() {
scrollOri();
});