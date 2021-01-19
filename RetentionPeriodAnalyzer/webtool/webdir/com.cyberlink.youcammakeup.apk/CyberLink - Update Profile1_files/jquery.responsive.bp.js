/*  ==|== Responsive =============================================================
    Author: James South
    twitter : http://twitter.com/James_M_South
    github : https://github.com/ResponsiveBP/Responsive
    Copyright (c),  James South.
    Licensed under the MIT License.
    ============================================================================== */

/*! Responsive v2.5.7 | MIT License | responsivebp.com */

/*
 * Responsive Core
 */

/*global jQuery*/
/*jshint forin:false, expr:true*/

	var getMediaProvider = function (url) {
        var providers = {
            youtube: /youtu(be\.com|be\.googleapis\.com|\.be)/i,
            vimeo: /vimeo/i,
            vine: /vine/i,
            instagram: /instagram|instagr\.am/i,
            getty: /embed\.gettyimages\.com/i,
			youku: /player\.youku\com/i
        };

        for (var p in providers) {
            if (providers.hasOwnProperty(p) && providers[p].test(url)) {
                return p;
            }
        }

        return false;
    }

	var getScrollbarWidth = function () {
		var $scroll = $("<div/>").css({ width: 99, height: 99, overflow: "scroll", position: "absolute", top: -9999 });
		$("body").append($scroll);
		scrollbarWidth = $scroll[0].offsetWidth - $scroll[0].clientWidth;
		$scroll.remove();

		return scrollbarWidth;
	}
	 
	$.fn.redraw = function () {
        /// <summary>Forces the browser to redraw by measuring the given target.</summary>
        /// <returns type="jQuery">The jQuery object for chaining.</returns>
        var redraw;
        return this.each(function () {
            redraw = this.offsetWidth;
        });
    };	

    $.fn.ensureTransitionEnd = function (duration) {
        /// <summary>
        /// Ensures that the transition end callback is triggered.
        /// http://blog.alexmaccaw.com/css-transitions
        ///</summary>
        var called = false,
            $this = $(this),
            callback = function () { if (!called) { $this.trigger($.support.transition.end); } };

        $this.one($.support.transition.end, function () { called = true; });
        window.setTimeout(callback, duration);
        return this;
    };
	
    $.fn.onTransitionEnd = function (callback) {
        /// <summary>Performs the given callback at the end of a css transition.</summary>
        /// <param name="callback" type="Function">The function to call on transition end.</param>
        /// <returns type="jQuery">The jQuery object for chaining.</returns>
        var supportTransition = $.support.transition;

        return this.each(function () {

            if (!$.isFunction(callback)) {
                return;
            }

            var $this = $(this).redraw(),
                rtransition = /\d+(.\d+)/;

            supportTransition ? $this.one(supportTransition.end, callback)
                                     .ensureTransitionEnd((rtransition.test($this.css("transition-duration")) ? $this.css("transition-duration").match(rtransition)[0] : 0) * 1000)
                              : callback();
        });
    };
	
    var lightboxOriginalWidth=null,	lightboxOriginalHeight=null, iframeScroll = true;
    
    var openLightBox = function (lightboxURL, lightboxWidth, lightboxHeight) {	    	
		createLightbox(lightboxURL, lightboxWidth, lightboxHeight);
	}
    
    var openLightBox = function (lightboxURL, lightboxWidth, lightboxHeight, isiframeScroll) {	
    	if (isiframeScroll == undefined){
    		iframeScroll = true;
    	}else{
    		iframeScroll = isiframeScroll;
    	}    	
		createLightbox(lightboxURL, lightboxWidth, lightboxHeight);
	}
	
	$( window ).resize(function() {
		if(lightboxOriginalWidth!=null && lightboxOriginalHeight!=null){
			if($( document ).height()<=parseInt(lightboxOriginalHeight)){
				var newLightboxWidth = Math.round($( document ).height()/parseInt(lightboxOriginalHeight)*parseInt(lightboxOriginalWidth));
				resizeLightbox(newLightboxWidth, $( document ).height(), 0);
			}else if($( document ).width()<=parseInt(lightboxOriginalWidth)){
				var newLightboxHeight = Math.round($( document ).width()/parseInt(lightboxOriginalWidth)*parseInt(lightboxOriginalHeight));
				resizeLightbox($( document ).width(), newLightboxHeight, 0);
			}else{				
				resizeLightbox(lightboxOriginalWidth, lightboxOriginalHeight, 0);
			}
		}
	});
	
	var createLightbox = function (lightboxURL, lightboxWidth, lightboxHeight) {		
		lightboxOriginalWidth = lightboxWidth.toString().toLowerCase().replace("px", "");
		lightboxOriginalHeight = lightboxHeight.toString().toLowerCase().replace("px", "");
		
		if($( document ).height()<=parseInt(lightboxOriginalHeight)){
			var newLightboxWidth = Math.round($( document ).height()/parseInt(lightboxOriginalHeight)*parseInt(lightboxOriginalWidth));
			lightboxWidth = newLightboxWidth.toString().toLowerCase();
			lightboxHeight  = $( document ).height().toString().toLowerCase();
		}else if($( document ).width()<=parseInt(lightboxOriginalWidth)){
			var newLightboxHeight = Math.round($( document ).width()/parseInt(lightboxOriginalWidth)*parseInt(lightboxOriginalHeight));
			lightboxWidth = $( document ).width().toString().toLowerCase();
			lightboxHeight  = newLightboxHeight;
		}
		
		// General variables.
		var lightbox_radius = "";
		if(lightboxURL.search("/stat/edms/")<0 && lightboxURL.search("http")<0){
			lightbox_radius = "lightbox-radius";
		}
		
		var $window = $(window),
			$html = $("html"),
			$body = $("body"),
			$overlay = $("<div/>").addClass("lightbox-overlay lightbox-loader lightbox-fade-out").css({
				"cursor": "pointer"
			}),
			$lightbox = $("<div/>").addClass("lightbox lightbox-fade-out "+lightbox_radius).appendTo($overlay),
			$iframe = null,
			$close = $("<span/>").attr({"title": "Close" }).addClass("lightbox-close lightbox-fade-out").html("x");	

		$close.appendTo($overlay);
		
		var $iframe = $("<iframe/>"); // This needs to be assigned then unassigned or ie8 won't test against it.
		
		// Normalize the src.
		if("https:" == document.location.protocol){
			lightboxURL = lightboxURL.replace("http://www.youtube.com", "https://www.youtube.com");
			lightboxURL = lightboxURL.replace("http://player.youku.com", "https://player.youku.com");
			if(lightboxURL.search("www.youtube.com")>=0){
				lightboxURL = lightboxURL.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/");				
				if(lightboxURL.search("rel=")<0){
					if(lightboxURL.search("\\?")>=0){
						lightboxURL = lightboxURL + "&rel=0";
					}else{
						lightboxURL = lightboxURL + "?rel=0";
					}
				}				
			}else if(lightboxURL.search(".cyberlink.com")>=0 && lightboxURL.search("http://")>=0 && lightboxURL.search(".gocyberlink.com")<0){
				lightboxURL = lightboxURL.replace("http://", "https://");
			}			
		}
		
		console.log("lightbox URL : " + lightboxURL);
		var src = lightboxURL;
		
		$lightbox.addClass("lightbox-iframe");
		var target = src;
		var $iframeWrap = $("<div/>").addClass(iframeScroll ? "lightbox-media lightbox-media-scroll" : "lightbox-media");
		// Have to add inline styles for older browsers.

		
		$iframe.attr({
			"scrolling": iframeScroll ? "yes" : "no",
			"allowTransparency": true,
			"allowfullscreen" : "allowfullscreen",
			"frameborder": 0,
			"hspace": 0,
			"vspace": 0,
			"allow": "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;",
			"src": src
		})
		.css("visibility", "hidden")
		.bind("load", function(){
			$(this).css("visibility", "visible")
		})
		.appendTo($iframeWrap);

		
		if(lightboxWidth.toString().toLowerCase().indexOf("px")<0){
			lightboxWidth = lightboxWidth+"px";
		}
		if(lightboxHeight.toString().toLowerCase().indexOf("px")<0){
			lightboxHeight = lightboxHeight+"px";
		}
		
		$lightbox.css({
			"max-width": lightboxWidth,
			"max-height": lightboxHeight
		});
		
		$iframeWrap.css({
			"max-width": lightboxWidth,
			"max-height": lightboxHeight
		})	
			
		$iframe.css({
			"max-width": lightboxWidth,
			"max-height": lightboxHeight
		})	
		
		$overlay.click(function() {
			closeLightbox(false);
		});
		
		$close.click(function() {
			closeLightbox(false);
			return false;
		});
		
		// Test and add additional media classes.
		var mediaClasses = getMediaProvider(target) || "";

		$iframeWrap.addClass(mediaClasses).appendTo($lightbox);
		if(mediaClasses!=""){
			$iframeWrap.css("padding-bottom", "56.25%" );
		}
		
		
		$.each([$close, $lightbox], function () {
			this.toggleClass("lightbox-fade-in").redraw();
		});

		$overlay.toggleClass("lightbox-loader");
			
		$body.append($overlay);

		$html.addClass("lightbox-on");
				 
		$overlay.removeClass("lightbox-hidden").toggleClass("lightbox-fade-in").redraw();
    }

	var closeLightbox = function (){
		closeLightbox(false);
	}
	
	var closeLightbox = function (closeFromIFrame){
		var $html = $("html"),
			$body = $("body"),
			$lightbox = $(".lightbox"),
			$close = $(".lightbox-close"),
			$overlay = $(".lightbox-overlay");		
        var empty = function () {
                $lightbox.removeClass("lightbox-iframe lightbox-ajax lightbox-image container").css({
                    "max-height": "",
                    "max-width": "",
                    "margin-top": "",
                    "margin-bottom": ""
                }).empty();
		}
		var cleanUp = function () {
			//$close.detach();

			// Fix __flash__removeCallback' is undefined error.
			//$.when( $(".lightbox").find("iframe").attr("src", "")).then(window.setTimeout(empty, 100));
			window.setTimeout(empty, 100);
		};

		var complete = function () {			
			$html.removeClass("lightbox-on");
			window.setTimeout(function(){ 
				$overlay.detach()
			}, 100);
		};
		$.each([$close, $lightbox], function () {
			this.toggleClass("lightbox-fade-in").redraw();
		});
		
		$overlay.toggleClass("lightbox-loader");
		$lightbox.onTransitionEnd(cleanUp);
        $html.addClass("lightbox-on");
		
		$overlay.removeClass("lightbox-hidden").toggleClass("lightbox-fade-in").redraw();
		$overlay.onTransitionEnd(complete);	
		try {			
			if(!closeFromIFrame){
				var simplemodalObj = $("#simplemodal-overlay");	
				if(!$.isEmptyObject( simplemodalObj )){  
					//close old lightbox
					$.modal && $.modal.close_responsive();
				}			
			}
			
		}catch (e) {
			
		}
		lightboxOriginalWidth=null;
		lightboxOriginalHeight=null;
		iframeScroll = true;
	}
	
	var resizeLightbox = function (lightboxWidth, lightboxHeight){
		resizeLightbox (lightboxWidth, lightboxHeight, 300)
	}	
	
	var resizeLightbox = function (lightboxWidth, lightboxHeight, animateSpeed){
		if($( document ).height()<=parseInt(lightboxOriginalHeight)){
			var newLightboxWidth = Math.round($( document ).height()/parseInt(lightboxOriginalHeight)*parseInt(lightboxOriginalWidth));
			lightboxWidth = newLightboxWidth.toString().toLowerCase();
			lightboxHeight  = $( document ).height().toString().toLowerCase();
		}else if($( document ).width()<=parseInt(lightboxOriginalWidth)){
			var newLightboxHeight = Math.round($( document ).width()/parseInt(lightboxOriginalWidth)*parseInt(lightboxOriginalHeight));
			lightboxWidth = $( document ).width().toString().toLowerCase();
			lightboxHeight  = newLightboxHeight;
		}		
		
		var $lightbox = $(".lightbox"),
			$iframeWrap = $(".lightbox-media"),
			$iframe = $iframeWrap.find("iframe");		

		if(lightboxWidth.toString().toLowerCase().indexOf("px")<0){
			lightboxWidth = lightboxWidth+"px";
		}
		if(lightboxHeight.toString().toLowerCase().indexOf("px")<0){
			lightboxHeight = lightboxHeight+"px";
		}			
		
		$lightbox.animate({
			"max-width": lightboxWidth,
			"max-height": lightboxHeight
		  }, animateSpeed );
		$iframeWrap.animate({
			"max-width": lightboxWidth,
			"max-height": lightboxHeight
		  }, animateSpeed );
		$iframe.animate({
			"max-width": lightboxWidth,
			"max-height": lightboxHeight
		  }, animateSpeed );		  
	}	