function menubarColor(number) {
	blackglass(number);
	if (number == 1) {
		$('.header_wrapper').css("opacity", 1);
		$('.header_wrapper').css("background-color", "white");
	} else {
		$('.header_wrapper').css("background-color", "rgba(255, 255, 255, 0.7)");
	}
}

function checkDropAndroid(area) {

	var result = true;
	// alert(is_touch_device());
	// alert(checkIphone());
	// alert($('#hoverLock').val());
	if (is_touch_device() && checkIphone()) {
		if ($('#lock').val() == 1) {
			result = false;
		} else if ($('#hoverLock').val() == '0') {
			result = false;
		} else if ($('#hoverLock').val() != area) {
			result = false;
		}

		if (result) {
			$('#hoverLock').val('0');
		} else {
			$('#hoverLock').val(area);
		}

	}

	if ($('#lock').val() == 1) {
		result = false;
	}

	// alert(result);

	// result = false;
	return result;

}

function is_touch_device() {
	return Modernizr.touch;
}

function checkIphone() {

	if (/iPhone|iPad/i.test(navigator.userAgent)) {
		return false;
	} else {
		return true;
	}

}
function scrollOri() {

	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	window.scrollTo(left, top + 1);
	top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	// window.scrollTo(left,top-1);
}

function searchbarSize() {
	// Get the dimensions of the viewport
	var width = window.innerWidth || document.documentElement.clientWidth
			|| document.body.clientWidth;
	/*
	 * if(width > 1045){ $(".search").css("display","none");
	 * $(".search_inmenu").css("display","");
	 * 
	 *  } else{ $(".search").css("display","");
	 * $(".search_inmenu").css("display","none"); }
	 */
};

function checkDevice() {

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			.test(navigator.userAgent)) {
		return false;
	} else {
		return true;
	}

}

function ifPhone() {

	if (/Phone/i.test(navigator.userAgent)) {
		return false;
	} else {
		return true;
	}

}

function checkAndroid() {

	if (/Android/i.test(navigator.userAgent)) {
		return false;
	} else {
		return true;
	}

}
function menuBarHeight() {

	var maxHeight = 0, aHeight = $('.list_a').height(), bHeight = $('.list_b')
			.height(), cHeight = $('.list_c').height()

	$('.list_a, .list_b, .list_c').each(function() {
		maxHeight = Math.max(aHeight, bHeight, cHeight);
	}).height(maxHeight);

}
// for let touch like hover effect on tablet
$(function() {
	/*
	 * $('#Product_desktop, #Product_tablet, #for_product').attr('ontouchstart',
	 * 'hover(this)'); $('#Store_desktop, #Store_tablet,
	 * #for_store').attr('ontouchstart', 'hover(this)'); $('#Downloads ,
	 * #for_download').attr('ontouchstart', 'hover(this)'); $('#Support,
	 * #for_support').attr('ontouchstart', 'hover(this)'); $('#Company ,
	 * #for_company').attr('ontouchstart', 'hover(this)');
	 */

})

var tipTimer = null;
var tipTimerProduct = null;
var tipTimerStore = null;
var tipTimerBusiness = null;
var tipTimerDownload = null;
var tipTimerCompany = null;
var tipTimerSupport = null;
var tipTimerMenu6 = null;
var timerSpeed = 0;
if (checkDevice()) {
	timerSpeed = 100;

}

var closeSpeed = 100;
var openSpeed = 200;
// menuberBar hover control

function menubarHoverControl(height, area, time, isHover, tab, circle, link) {
	var tabObj = $(area).html();
	var $win = $(this), winWidth = $win.width(), winHeight = $win.height();
	
	if ($(area).height() == 0){
		//Calculate correct height of area
		var correctHeight = $(area).css({visibility:"hidden", height:"auto"}).height();
		if (height != 0 && height < correctHeight){
			height = correctHeight;
		}
		$(area).css({visibility:"", height:""});
	}	

	winHeight = $(document).height();
	winWidth = $(document).width();
	// circle use for only Store , due to it need much hightlighte
	var lock = $('#lock').val();
	if (lock == 0) {
		if (checkDevice()) {
			$(area).stop().animate({
				height : height
			}, time)
		} else {
			$(area).stop().animate({
				height : height,
				width : winWidth
			}, time)
		}
		if (!$.isEmptyObject(tabObj)) {
			if (height > 0) {
				menubarColor(1);
			} else {
				menubarColor(0);
			}
		}

		// alert("function Hover" + height + "/ " + area + " / "+ time +" / "+
		// timerSpeed);
		if (isHover == 1) {
			$(tab + " a").css("color", "white");			
			$(tab + " a").css("background-color", "#b81a35");
			$(tab + " a").css("cursor", "pointer");
			if (circle == 1) {
				$('.ugly_store, .ugly_border a').css("color", "white");
				$(".ugly_border a ").css("border", "1px solid white");
				$(".ugly_border a").css("cursor", "pointer");
			}
			if(area=="#for_download"){
				$("#Downloads .u_color").addClass("to_white");
				$("#Downloads .u_color_size").addClass("to_white");
			}
		} else {
			$(tab + " a").css("color", "black");
			$(tab + " a").css("background-color", "");
			if (circle == 1) {
				$('.ugly_store').css("color", "black");
				$('.ugly_border a').css("color", "#b81a35");
				$(".ugly_border a").css("border", "1px solid #999999");
				$(".ugly_border a").css("cursor", "default");
			}
			if(area=="#for_download"){
				$("#Downloads .u_color").removeClass("to_white");
				$("#Downloads .u_color_size").removeClass("to_white");
			}
		}

	} else {

		$(tab + " a").css("color", "black");
		$(tab + " a").css("background-color", "");
		$(tab + " a").css("cursor", "default");
		if (circle == 1) {
			$('.ugly_store, .ugly_border a').css("color", "black");
			$(".ugly_border a").css("border", "1px solid #999999");
			$(".ugly_border a").css("cursor", "default");
		}
	}
}

function hoverImage(area, beforeImg, afterImg) {

}

var for_menu6Obj_heigth = 100;
$(function() {

	if (checkDevice()) {
		var $win = $(this), winWidth = $win.width(), winHeight = $win.height(), slideWidth = $(
				'.slider').width(), top_blockWidth = $('.top_block').width();

		// for TopMenuhover Effect

		$('#searchImg, #mobileSearchImg').hover(function() {

			$("#searchImg").attr("src", "/prog/bar/img/icon_red_4.png");
			$("#mobileSearchImg").attr("src", "/prog/bar/img/icon_red_4.png");

		}, function() {
			if ($('#searchLock').val() == 0) {
				$("#searchImg").attr("src", "/prog/bar/img/icon_4.png");
				$("#mobileSearchImg").attr("src", "/prog/bar/img/icon_4.png");
			}
		});

		$('.language, #mobileLanguageImg').hover(
				function() {

					$("#languageImg").attr("src",
							"/prog/bar/img/icon_red_3.png");
					$("#mobileLanguageImg").attr("src",
							"/prog/bar/img/icon_red_3.png");
					$(".language").css("color", "#b81a35");

				},
				function() {
					if ($('#languageLock').val() == 0) {
						$("#languageImg").attr("src",
								"/prog/bar/img/icon_3.png");
						$("#mobileLanguageImg").attr("src",
								"/prog/bar/img/icon_3.png");
						$(".language").css("color", "white");
					}
				});

		$('#shoppingImg, #mobileShoppingImg').hover(
				function() {

					$("#shoppingImg").attr("src",
							"/prog/bar/img/icon_red_2.png");
					$("#mobileShoppingImg").attr("src",
							"/prog/bar/img/icon_red_2.png");

				},
				function() {
					$("#shoppingImg").attr("src", "/prog/bar/img/icon_2.png");
					$("#mobileShoppingImg").attr("src",
							"/prog/bar/img/icon_2.png");
				});

		$('#loginImg, #mobileLoginImg, #person_signin').hover(function() {
			$("#loginImg").attr("src", "/prog/bar/img/icon_red_1.png");
			$("#mobileLoginImg").attr("src", "/prog/bar/img/icon_red_1.png");
			$("#person_signin").css("color", "#b81a35");
		}, function() {
			if ($('#loginLock').val() == 0) {
				$("#loginImg").attr("src", "/prog/bar/img/icon_1.png");
				$("#mobileLoginImg").attr("src", "/prog/bar/img/icon_1.png");
				$("#person_signin").css("color", "white");
			}
		});
	}

	$('#Product_desktop, #Product_tablet, #for_product')
			.hover(
					function() {

						if (timerSpeed > 0) {
							var self = this;

							if (tipTimerProduct) {
								clearTimeout(tipTimerProduct);
								tipTimerProduct = null;
							}
							tipTimerProduct = setTimeout(function() {
								menubarColor(1);
								var productHieght = 0;
								productHieght = Math.max(productHieght, $(
										".list_a").height());
								productHieght = Math.max(productHieght, $(
										".list_b").height());
								productHieght = Math.max(productHieght, $(
										".list_c").height());
								productHieght = productHieght + 30
										+ $(".zone_02").height();

								menubarHoverControl(productHieght,
										'#for_product', openSpeed, 1,
										'#Product_desktop');

							}, timerSpeed);
						} else {
							menubarColor(1);
							var productHieght = 0;
							productHieght = Math.max(productHieght,
									$(".list_a").height());
							productHieght = Math.max(productHieght,
									$(".list_b").height());
							productHieght = Math.max(productHieght,
									$(".list_c").height());
							productHieght = productHieght + 30
									+ $(".zone_02").height();

							menubarHoverControl(productHieght, '#for_product',
									openSpeed, 1, '#Product_desktop');
						}

					},
					function() {
						if (timerSpeed > 0) {
							if (tipTimerProduct) {
								clearTimeout(tipTimerProduct);
								tipTimerProduct = null;

							}

							tipTimerProduct = setTimeout(function() {

								menubarHoverControl(0, '#for_product',
										closeSpeed, 0, '#Product_desktop');

							}, timerSpeed);
						} else {
							menubarHoverControl(0, '#for_product', closeSpeed,
									0, '#Product_desktop');
						}

					});

	// [for store]
	var for_store_heigth = 100;
	if ($("a[storeItem='1']").length > 6) {
		for_store_heigth = 170;
	} else if ($("a[storeItem='1']").length > 4) {
		for_store_heigth = 135;
	}
	$('#Store_desktop, #Store_tablet, #for_store').hover(
			function() {
				if (timerSpeed > 0) {
					var self = this;
					if (tipTimerStore) {
						clearTimeout(tipTimerStore);
						tipTimerStore = null;
					}
					tipTimerStore = setTimeout(function() {

						menubarHoverControl(for_store_heigth, '#for_store',
								openSpeed, 1, '#Store_desktop, #Store_tablet',
								1);
					}, timerSpeed);
				} else {
					menubarHoverControl(for_store_heigth, '#for_store',
							openSpeed, 1, '#Store_desktop, #Store_tablet', 1);
				}

			},
			function() {
				if (timerSpeed > 0) {
					if (tipTimerStore) {
						clearTimeout(tipTimerStore);
						tipTimerStore = null;
					}
					tipTimerStore = setTimeout(function() {
						menubarHoverControl(0, '#for_store', closeSpeed, 0,
								'#Store_desktop, #Store_tablet', 1);
					}, timerSpeed);
				} else {
					menubarHoverControl(0, '#for_store', closeSpeed, 0,
							'#Store_desktop, #Store_tablet', 1);
				}

			});
	
	// [for store]
	var for_business_heigth = 170;	
	$('#Business_desktop, #Business_tablet, #for_business').hover(
			function() {
				if (timerSpeed > 0) {
					var self = this;
					if (tipTimerBusiness) {
						clearTimeout(tipTimerBusiness);
						tipTimerBusiness = null;
					}
					tipTimerBusiness = setTimeout(function() {
						menubarHoverControl(for_business_heigth, '#for_business',
								openSpeed, 1, '#Business_desktop');
					}, timerSpeed);
				} else {
					menubarHoverControl(for_business_heigth, '#for_business',
							openSpeed, 1, '#Business_desktop');
				}

			},
			function() {
				if (timerSpeed > 0) {
					if (tipTimerBusiness) {
						clearTimeout(tipTimerBusiness);
						tipTimerBusiness = null;
					}
					tipTimerBusiness = setTimeout(function() {
						menubarHoverControl(0, '#for_business', closeSpeed, 0,
								'#Business_desktop');
					}, timerSpeed);
				} else {
					menubarHoverControl(0, '#for_business', closeSpeed, 0,
							'#Business_desktop');
				}

			});	

	// [for download]
	var for_download_heigth = 100;
	if ($("a[downloadItem='1']").length > 6) {
		for_download_heigth = 170;
	} else if ($("a[downloadItem='1']").length > 3) {
		for_download_heigth = 135;
	}
	$('#Downloads , #for_download').hover(
			function() {
				if (timerSpeed > 0) {
					var self = this;
					if (tipTimerDownload) {
						clearTimeout(tipTimerDownload);
						tipTimerDownload = null;
					}
					tipTimerDownload = setTimeout(function() {

						menubarHoverControl(for_download_heigth,
								'#for_download', openSpeed, 1, '#Downloads');
					}, timerSpeed);
				} else {
					menubarHoverControl(for_download_heigth, '#for_download',
							openSpeed, 1, '#Downloads');
				}
			},
			function() {
				if (timerSpeed > 0) {
					if (tipTimerDownload) {
						clearTimeout(tipTimerDownload);
						tipTimerDownload = null;
					}

					tipTimerDownload = setTimeout(function() {
						menubarHoverControl(0, '#for_download', closeSpeed, 0,
								'#Downloads');
					}, timerSpeed);
				} else {
					menubarHoverControl(0, '#for_download', closeSpeed, 0,
							'#Downloads');
				}
			});

	// [for support]
	var for_support_heigth = 100;
	if ($("a[supportItem='1']").length > 6) {
		for_support_heigth = 170;
	} else if ($("a[supportItem='1']").length > 4) {
		for_support_heigth = 135;
	}	
	$('#Support, #for_support').hover(
			function() {
				if (timerSpeed > 0) {
					var self = this;
					if (tipTimerSupport) {
						clearTimeout(tipTimerSupport);
						tipTimerSupport = null;
					}
					tipTimerSupport = setTimeout(function() {
						menubarHoverControl(for_support_heigth, '#for_support', openSpeed, 1,
								'#Support');
					}, timerSpeed);
				} else {
					menubarHoverControl(for_support_heigth, '#for_support', openSpeed, 1,
							'#Support');
				}
			},
			function() {
				if (timerSpeed > 0) {
					if (tipTimerSupport) {
						clearTimeout(tipTimerSupport);
						tipTimerSupport = null;
					}
					tipTimerSupport = setTimeout(function() {
						menubarHoverControl(0, '#for_support', closeSpeed, 0,
								'#Support');
					}, timerSpeed);
				} else {
					menubarHoverControl(0, '#for_support', closeSpeed, 0,
							'#Support');
				}
			});

	// [for Company]
	$('#Company , #for_company').hover(
			function() {
				if (timerSpeed > 0) {
					var self = this;
					if (tipTimerCompany) {
						clearTimeout(tipTimerCompany);
						tipTimerCompany = null;
					}
					tipTimerCompany = setTimeout(function() {
						menubarHoverControl(170, '#for_company', openSpeed, 1,
								'#Company');
					}, timerSpeed);
				} else {
					menubarHoverControl(170, '#for_company', openSpeed, 1,
							'#Company');
				}

			},
			function() {
				if (timerSpeed > 0) {
					if (tipTimerCompany) {
						clearTimeout(tipTimerCompany);
						tipTimerCompany = null;
					}
					tipTimerCompany = setTimeout(function() {
						menubarHoverControl(0, '#for_company', closeSpeed, 0,
								'#Company');
					}, timerSpeed);
				} else {
					menubarHoverControl(0, '#for_company', closeSpeed, 0,
							'#Company');
				}
			});

	// [for Menu6]
	var menu6Obj = $('.drop_menu6').html();

	if ($("a[menu6Item='1']").length > 6) {
		for_menu6Obj_heigth = 170;
	} else if ($("a[menu6Item='1']").length > 4) {
		for_menu6Obj_heigth = 135;
	}

	$('#Menu6 , #for_menu6').hover(
			function() {
				if (!$.isEmptyObject(menu6Obj)) {
					if (timerSpeed > 0) {
						var self = this;
						if (tipTimerMenu6) {
							clearTimeout(tipTimerMenu6);
							tipTimerMenu6 = null;
						}

						tipTimerMenu6 = setTimeout(function() {
							menubarHoverControl(for_menu6Obj_heigth,
									'#for_menu6', openSpeed, 1, '#Menu6');
						}, timerSpeed);
					} else {
						menubarHoverControl(for_menu6Obj_heigth, '#for_menu6',
								openSpeed, 1, '#Menu6');
					}
				} else {
					if (timerSpeed > 0) {
						var self = this;
						if (tipTimerMenu6) {
							clearTimeout(tipTimerMenu6);
							tipTimerMenu6 = null;
						}

						tipTimerMenu6 = setTimeout(function() {
							menubarHoverControl(for_menu6Obj_heigth,
									'#for_menu6_NAN', openSpeed, 1, '#Menu6');
						}, timerSpeed);
					} else {
						menubarHoverControl(for_menu6Obj_heigth,
								'#for_menu6_NAN', openSpeed, 1, '#Menu6');
					}
				}
			},
			function() {
				if (timerSpeed > 0) {
					if (tipTimerMenu6) {
						clearTimeout(tipTimerMenu6);
						tipTimerMenu6 = null;
					}
					tipTimerMenu6 = setTimeout(function() {
						menubarHoverControl(0, '#for_menu6', closeSpeed, 0,
								'#Menu6');
					}, timerSpeed);
				} else {
					menubarHoverControl(0, '#for_menu6', closeSpeed, 0,
							'#Menu6');
				}
			});

	if (checkDevice()) {
		$('.mobile_menu').hover(function() {
			$("#mobileImg").attr("src", "/prog/bar/img/mobile_menu_red.png");

		}, function() {

			if ($('#lock').val() == 0) {
				$("#mobileImg").attr("src", "/prog/bar/img/mobile_menu.png");
			}
		})

		$('.tablet_menu').hover(function() {
			$("#tabletImg").attr("src", "/prog/bar/img/mobile_menu_red.png");

		}, function() {
			if ($('#lock').val() == 0) {
				$("#tabletImg").attr("src", "/prog/bar/img/mobile_menu.png");
			}
		})
	}
	
	//[for PromotionBanner Link and Image]	
	var for_promoObj = $('#for_promo').html();
	//Get correct height when is visible
	$('#for_promo').css({"visibility": "hidden", "height" : "auto"});
	var for_promoObj_heigth = $('.drop_promo').height();	
	$('#for_promo').css({"visibility": "visible", "height" : "0px"});
	
	var tipTimerPromo = null;
	$('#promo_btn , #for_promo').hover(function(){
		if(!$.isEmptyObject( for_promoObj )){
			if(timerSpeed > 0){
				var self = this;
		        if (tipTimerPromo) {
		            clearTimeout(tipTimerPromo);
		            tipTimerPromo = null;
		        }
	        
		        tipTimerPromo = setTimeout(function() {
		        	menubarHoverControl(for_promoObj_heigth,'#for_promo',openSpeed,1,'#promo_btn');
	            }, timerSpeed);
			}else{
				menubarHoverControl(for_promoObj_heigth,'#for_promo',openSpeed,1,'#promo_btn');
			}	
		}
	},function(){
		if(timerSpeed > 0){
			if (tipTimerPromo) {
	            clearTimeout(tipTimerPromo);
	            tipTimerPromo = null;
	        }
			tipTimerPromo = setTimeout(function() {
				menubarHoverControl(0,'#for_promo',closeSpeed,0,'#promo_btn');
			}, timerSpeed);
		}else{
			menubarHoverControl(0,'#for_promo',closeSpeed,0,'#promo_btn');
		}
	});
	
	$('#faceme_btn').hover(function(){
		menubarHoverControl(0,'#for_faceme',openSpeed,1,'#faceme_btn');
	},function(){
		menubarHoverControl(0,'#for_faceme',closeSpeed,0,'#faceme_btn');
	});	
		
	$(".promo_menu").click(function(){
		var drop_promo = $('#for_promo');
		var drop_promoHeigth = drop_promo.height();
		var isDrop_promoOpened = (drop_promoHeigth > 0);		
		if (!isDrop_promoOpened){
			cleanAll("all");
			$(".img_promo ").addClass("active");
			//Get correct height when is visible
			drop_promo.css({"visibility": "hidden", "height" : "auto"});
			drop_promoHeigth = $('.drop_promo').height();
			drop_promo.css({"visibility": "visible", "height" : "0px"});
			
			drop_promo.stop().animate({
				height : drop_promoHeigth
			}, 201);
			menubarColor(1);
		}else{
			$(".img_promo ").removeClass("active");
			drop_promo.stop().animate({
				height : 0
			}, 100);
			menubarColor(0);
		}		
	});
	//[for Search bar PC]	
	var for_searchObj = $('#for_search').html();
	//Get correct height when is visible
	$('#for_search').css({"visibility": "hidden", "height" : "auto"});
	var for_searchObj_heigth = $('#for_search').height();	
	$('#for_search').css({"visibility": "visible", "height" : "0px"});
	
	var tipTimerSearch = null;
	$('#search_btn , #for_search').hover(function(){
		if(!$.isEmptyObject( for_searchObj )){
			if(timerSpeed > 0){
				var self = this;
		        if (tipTimerSearch) {
		            clearTimeout(tipTimerSearch);
		            tipTimerSearch = null;
		        }
	        
		        tipTimerSearch = setTimeout(function() {
		        	menubarHoverControl(for_searchObj_heigth,'#for_search',openSpeed,1,'#search_btn');
	            }, timerSpeed);
			}else{
				menubarHoverControl(for_searchObj_heigth,'#for_search',openSpeed,1,'#search_btn');
			}	
		}
	},function(){
		if(timerSpeed > 0){
			if (tipTimerSearch) {
	            clearTimeout(tipTimerSearch);
	            tipTimerSearch = null;
	        }
			tipTimerSearch = setTimeout(function() {
				menubarHoverControl(0,'#for_search',closeSpeed,0,'#search_btn');
			}, timerSpeed);
		}else{
			menubarHoverControl(0,'#for_search',closeSpeed,0,'#search_btn');
		}
	});
});


// for topMenu

function topMenubar(area, lockName, height, menuName, clickImg, unclickImg,
		clickImgId, mobileImgId) {
	cleanAll(area);
	var lock = 0;
	var itemLock = $(lockName).val();

	if (itemLock == 0) {
		itemLock = 1;
	} else {
		itemLock = 0;
	}

	if (itemLock == 1) {
		lock = 1;
		
		//Calculate correct height of area
		var correctHeight = $(menuName).css({visibility:"hidden", height:"auto"}).height();
		if (height != 0){
			height = correctHeight;
		}
		$(menuName).css({visibility:"", height:""});

		$(clickImgId).attr("src", unclickImg);
		$(mobileImgId).attr("src", unclickImg);
		if (clickImgId.indexOf('language') >= 0) {

			$(".language").css("color", "#b81a35");
		}
		$(menuName).stop().animate({
			height : height
		}, 201)
		menubarColor(1);
	} else {
		$(clickImgId).attr("src", clickImg);
		$(mobileImgId).attr("src", clickImg);
		if (clickImgId.indexOf('language') >= 0) {

			$(".language").css("color", "white");
		}
		$(menuName).stop().animate({
			height : 0
		}, 100)
		menubarColor(0);
	}

	$('#lock').val(lock);

	$(lockName).val(itemLock);
}

function languageBar() {

	var languageHeight = $(".language_content").height();
	languageHeight = languageHeight + 40;

	topMenubar('language', '#languageLock', languageHeight, '.menu_language',
			'/prog/bar/img/icon_3.png', '/prog/bar/img/icon_red_3.png',
			'#languageImg', '#mobileLanguageImg');

}

function searchBar() {

	var searchHeight = $(".search_content").height();
	searchHeight = searchHeight + 40;
	topMenubar('search', '#searchLock', searchHeight, '.menu_search',
			'/prog/bar/img/icon_4.png', '/prog/bar/img/icon_red_4.png',
			'#searchImg', '#mobileSearchImg');

}

function tabletDropBar() {
	var menu6Obj = $('#Menu6').html();
	if (!$.isEmptyObject(menu6Obj)) {
		$(".tablet_go").css({"visibility":"hidden", "height":"auto"});
		var tablet_go_height = $(".tablet_go").height();
		$(".tablet_go").css({"visibility":"visible", "height":"0px"});
		
		topMenubar('tabletDrop', '#tabletLock', tablet_go_height, '.tablet_go',
				'/prog/bar/img/mobile_menu.png',
				'/prog/bar/img/mobile_menu_red.png', '#tabletImg', '#tabletImg');
	} else {
		topMenubar('tabletDrop', '#tabletLock', 170, '.tablet_go',
				'/prog/bar/img/mobile_menu.png',
				'/prog/bar/img/mobile_menu_red.png', '#tabletImg', '#tabletImg');
	}
}

function mobileDropBar() {
	var menu6Obj = $('#Menu6').html();
	if (!$.isEmptyObject(menu6Obj)) {
		topMenubar('mobileDrop', '#mobileLock', 405, '.mobile_go',
				'/prog/bar/img/mobile_menu.png',
				'/prog/bar/img/mobile_menu_red.png', '#mobileImg', '#mobileImg');
	} else {
		topMenubar('mobileDrop', '#mobileLock', 277, '.mobile_go',
				'/prog/bar/img/mobile_menu.png',
				'/prog/bar/img/mobile_menu_red.png', '#mobileImg', '#mobileImg');
	}
}

// for mobile

function forMobileDropDown(area, lockName, cleanName, clickImg, unclickImg,
		clickImgId, mobileImgId) {

	cleanAll(cleanName);
	var width = window.innerWidth || document.documentElement.clientWidth
			|| document.body.clientWidth;

	$('.mobile_go').stop().animate({
		height : 277
	}, 201)
	var length = $(area).height() + 277 + 5;
	var menu6Obj = $('#Menu6').html();
	if (!$.isEmptyObject(menu6Obj)) {
		length = $(area).height() + 277 + 5 + 55;
	}

	if (width < 365 && (area.indexOf('language') > 0)) {
		length = 1050;
	}

	var itemLock = $(lockName).val();

	if (itemLock == 0) {
		itemLock = 1;
	} else {
		itemLock = 0;
	}

	if (itemLock == 1) {
		lock = 1;

		$(clickImgId).attr("src", unclickImg);
		$(mobileImgId).attr("src", unclickImg);
		$('.mobile_search').fadeOut(0);
		$('.mobile_language').fadeOut(0);
		$('.mobile_login').fadeOut(0);
		$('.mobile_currency').fadeOut(0);
		$(area).fadeIn(400);
		$('.mobile_go').stop().animate({
			height : length
		}, 201)

	} else {

		$('.mobile_search').fadeOut(0);
		$('.mobile_language').fadeOut(0);
		$('.mobile_login').fadeOut(0);
		$('.mobile_currency').fadeOut(0);
		$(clickImgId).attr("src", clickImg);
		$(mobileImgId).attr("src", clickImg);
		$('.mobile_go').stop().animate({
			height : 277
		}, 340)
	}

	$('#lock').val(lock);
	$(lockName).val(itemLock);

}

function searchMobile() {
	forMobileDropDown('.mobile_search', '#searchLock', 'search',
			'/prog/bar/img/icon_4.png', '/prog/bar/img/icon_red_4.png',
			'#searchImg', '#mobileSearchImg');

}
function languageMobile() {
	forMobileDropDown('.mobile_language', '#languageLock', 'language',
			'/prog/bar/img/icon_3.png', '/prog/bar/img/icon_red_3.png',
			'#languageImg', '#mobileLanguageImg');
}
function currencyMobile() {
	forMobileDropDown('.mobile_currency', '#currencyLock', 'currency',
			'/prog/bar/img/icon_5.png', '/prog/bar/img/icon_red_5.png',
			'#currencyImg', '#mobileCurrencyImg');
}
function cleanBehavior(area, keyName, lockName, menuName, imgTag, imgMobileTag,
		imgSrc) {

	var result = 0;
	if (area != keyName) {
		var lock = $(lockName).val();

		if (lock == 1) {
			$(menuName).stop().animate({
				height : 0
			}, 201)
			$(lockName).val(0);
			$(imgTag).attr("src", imgSrc);
			$(imgMobileTag).attr("src", imgSrc);

			if (keyName.indexOf('language') >= 0) {

				$(".language").css("color", "white");
			}

		}

	} else {

		result++;

	}

	return result;
}

function cleanAll(area) {

	var number = 0;
	var lock = 0;

	number = number
			+ cleanBehavior(area, 'search', '#searchLock', '.menu_search',
					'#searchImg', '#mobileSearchImg',
					'/prog/bar/img/icon_4.png');
	number = number
			+ cleanBehavior(area, 'language', '#languageLock',
					'.menu_language', '#languageImg', '#mobileLanguageImg',
					'/prog/bar/img/icon_3.png');
	number = number
			+ cleanBehavior(area, 'login', '#loginLock', '.login', '#loginImg',
					'#mobileLoginImg', '/prog/bar/img/icon_1.png');
	number = number
			+ cleanBehavior(area, 'currency', '#currencyLock', '.currency',
					'#currencyImg', '#mobileCurrencyImg',
					'/prog/bar/img/icon_5.png');

	number = number
			+ cleanBehavior(area, 'tabletDrop', '#tabletLock', '.tablet_go',
					'#tabletImg', '#tabletImg', '/prog/bar/img/mobile_menu.png');
	number = number
			+ cleanBehavior(area, 'mobileDrop', '#mobileLock', '.mobile_go',
					'#mobileImg', '#mobileImg', '/prog/bar/img/mobile_menu.png');

	if (area == 'all') {

		$("#Product_desktop a").css("color", "black");
		$("#Product_desktop a").css("background-color", "");
		$("#Product_desktop a").css("cursor", "default");

		$("#Downloads a").css("color", "black");
		$("#Downloads a").css("background-color", "");
		$("#Downloads a").css("cursor", "default");

		$("#Support a").css("color", "black");
		$("#Support a").css("background-color", "");
		$("#Support a").css("cursor", "default");

		$("#Company a").css("color", "black");
		$("#Company a").css("background-color", "");
		$("#Company a").css("cursor", "default");

		$("#Business_desktop a").css("color", "black");
		$("#Business_desktop").css("background-color", "");
		$("#Business_desktop a").css("cursor", "default");		
		
		$("#Store_desktop a").css("color", "black");
		$("#Store_desktop").css("background-color", "");
		$("#Store_desktop a").css("cursor", "default");

		$('.ugly_store').css("color", "black");
		$('.ugly_border a').css("color", "#b81a35");
		$(".ugly_border a").css("border", "1px solid #999999");

		$(".ugly_border a").css("cursor", "default");
		
		if(area=="#for_download"){
			$("#Downloads .u_color").removeClass("to_white");
			$("#Downloads .u_color_size").removeClass("to_white");
		}

		menubarColor(0);
		$('#lock').val(0);
		$("#languageImg").attr("src", "/prog/bar/img/icon_3.png");
		$("#mobileLanguageImg").attr("src", "/prog/bar/img/icon_3.png");
		$("#searchImg").attr("src", "/prog/bar/img/icon_4.png");
		$("#mobileSearchImg").attr("src", "/prog/bar/img/icon_4.png");
		$("#mobileCurrencyImg").attr("src", "/prog/bar/img/icon_5.png");
		if ($('#isMember').val() == 0) {
			$("#loginImg").attr("src", "/prog/bar/img/icon_1.png");
			$("#mobileLoginImg").attr("src", "/prog/bar/img/icon_1.png");
			$("#person_signin").css("color", "white");
		}
		$("#shoppingImg").attr("src", "/prog/bar/img/icon_2.png");
		$("#mobileShoppingImg").attr("src", "/prog/bar/img/icon_2.png");
		$(".language").css("color", "white");
		$("#tabletImg").attr("src", "/prog/bar/img/mobile_menu.png");
		$("#mobileImg").attr("src", "/prog/bar/img/mobile_menu.png");

		$('.mobile_go').stop().animate({
			height : 0
		}, 340)

	}

	$('#for_product').stop().animate({
		height : 0
	}, 100);

	$('#for_store').stop().animate({
		height : 0
	}, 100);
	
	$('#for_business').stop().animate({
		height : 0
	}, 100);

	$('#for_download').stop().animate({
		height : 0
	}, 100);

	$('#for_support').stop().animate({
		height : 0
	}, 100);

	$('#for_company').stop().animate({
		height : 0
	}, 100);

	$('#for_menu6').stop().animate({
		height : 0
	}, 100);
	
	$(".img_promo ").removeClass("active");
	$('#for_promo').stop().animate({
		height : 0
	}, 100);
}

function blackglass(number) {
	var $win = $(this), winWidth = $win.width(), winHeight = $win.height();

	winHeight = $(document).height();
	winWidth = $(document).width();
	var str = window.location.toString();

	if (str.indexOf("support/index") > -1) {
		winHeight = $win.height() - 20;
	}

	if (number == 1) {
		$(".blackgalss").css({
			width : winWidth,
			height : winHeight
		})
	} else {
		$(".blackgalss").css({
			width : 0,
			height : 0
		})
	}
}

$(document)
		.ready(
				function() {
					if($(".promo_banner > a > img").attr("data-src")!=""){
						$(".promo_banner > a > img").attr("src", $(".promo_banner > a> img").attr("data-src"));	 																		
					}
					
					$(window)
							.resize(
									function() {
										searchbarSize();
										// menuBarHeight();
										if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
												.test(navigator.userAgent)) {

										} else {
											cleanAll('all');
										}

									});

					$(window).bind('orientationchange', function(event) {
						cleanAll('all');
					});

				});