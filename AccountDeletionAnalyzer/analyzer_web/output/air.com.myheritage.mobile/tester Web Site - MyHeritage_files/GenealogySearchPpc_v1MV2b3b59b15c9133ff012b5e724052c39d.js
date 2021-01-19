/* #vfic now: 30 Aug 2019 13:57:57 on web264 */ 
function successfulMiniSignupCallback(e, t) {
window.location.href = genealogySearchPpc.checkoutLink;
}

function successfulLoginCallback() {
window.location.href = genealogySearchPpc.checkoutLink;
}

function updateSeoLinks(e) {
e.attr("href", seoCheckoutLink);
}

function updateLinkTooltips(e) {
e.mhTooltip({
getContent:function(e) {
return seoLinksTooltipText;
}
});
}

function setGoogleAnalytics() {
setGoogleAnalyticsForElements(jQuery(".recordImageContainer a"), "profile photo"), 
setGoogleAnalyticsForElements(jQuery(".recordFieldsContainer a"), "obfuscated data"), 
setGoogleAnalyticsForElements(jQuery(".recordRelatedPhotosContainer a"), "related photo");
}

function setSummaryMainGoogleAnalytics() {
setGoogleAnalyticsParamsForElementEvent("#summary_view_button", "click", {
event:EVENT_TYPE_EVENT,
eventCategory:GOOGLE_ANALYTICS_EVENT_CATEGORY,
eventAction:"view records clicked",
eventLabel:"button",
recordCategory:"all records"
}), setGoogleAnalyticsParamsForElementEvent("#view_all_now_link", "click", {
event:EVENT_TYPE_EVENT,
eventCategory:GOOGLE_ANALYTICS_EVENT_CATEGORY,
eventAction:"view records clicked",
eventLabel:"link",
recordCategory:"all records"
});
}

function updateRelatedRecordLinks() {
updateSeoLinks(jQuery(".RecordsStrip a")), setGoogleAnalyticsForElements(jQuery(".photoStripPhotoContainer a"), "related record");
}

function setGoogleAnalyticsForElements(e, t) {
googleAnalyticsTracking.bindTrackEvent(e, "click", googleAnalyticsEventsCategory, t, null, null, null, EVENT_TYPE_EVENT);
}

function setGoogleAnalyticsParamsForElementEvent(e, t, a) {
if ("undefined" != typeof t) {
var r = jQuery(e);
0 !== r.length && r.bind(t, function() {
googleAnalyticsTracking.trackEventObject(a);
});
}
}

var EVENT_TYPE_EVENT = "GTM event To GA", GOOGLE_ANALYTICS_EVENT_CATEGORY = "PPC SuperSearch", genealogySearchPpc = {
ITEM_DATA_SUBSCRIPTION_AND_WVR_FREE_TRIAL_BILLED_ANNUALLY:"",
ITEM_DATA_SUBSCRIPTION_AND_FL_FREE_TRIAL_BILLED_ANNUALLY:"",
headerTextAnnual:"",
headerTextMonthly:"",
submitStarted:!1,
validationInitialized:!1,
iFrameBaseUrl:null,
googleAnalyticsEventsCategory:"PPC Funnel",
searchingString:"",
initForm:function() {
jQuery("#firstName").focus(), jQuery("#genealogy_search_form").find("input, select").keypress(function(e) {
(10 == e.which || 13 == e.which) && (jQuery("#genealogy_search_form").submit(), 
disableCssButton("search_button"));
});
},
startSearch:function() {
return genealogySearchPpc.validationInitialized || (jQuery("#genealogy_search_form").validationEngine(), 
genealogySearchPpc.validationInitialized = !0), genealogySearchPpc.submitStarted ? (genealogySearchPpc.fixPreloaderImageIE(), 
!0) :jQuery("#genealogy_search_form").validationEngine("validate") ? (genealogySearchPpc.submitStarted = !0, 
jQuery("#search_button").html(genealogySearchPpc.searchingString), genealogySearchPpc.fixPreloaderImageIE(), 
jQuery(window).unload(function() {
genealogySearchPpc.fixPreloaderImageIE();
}), setTimeout(function() {
jQuery("#genealogy_search_form").submit();
}, 100), !1) :(setTimeout(function() {
enableCssButton("search_button");
}, 10), !1);
},
fixPreloaderImageIE:function() {
if (isIE && ieBrowserVersion <= 8) {
var e = jQuery(".iframe_preloader_container img"), t = e.attr("src");
e.attr("src", t + "?v=" + Math.random());
}
},
bindOnLoadEventToIframe:function() {
jQuery(".iframe_preloader_container").load(genealogySearchPpc.hideIframePreloader);
},
setPreloaderTimeout:function() {
setTimeout(function() {
genealogySearchPpc.hideIframePreloader();
}, 3e3);
},
initializePaymentIframe:function(e) {
genealogySearchPpc.bindOnLoadEventToIframe(), genealogySearchPpc.setPreloaderTimeout(), 
purchasedItem = new PurchasedItem(), purchasedItem.setSiteID(e.siteId), purchasedItem.setAccountID(e.accountId), 
purchasedItem.setPaymentProcessorID(e.paymentProcessorId), purchasedItem.setCheckoutLang(e.checkOutLang), 
purchasedItem.setProductClassID(e.productClassId), purchasedItem.setProductID(e.productId), 
purchasedItem.setTransactionReason(e.transactionReason), purchasedItem.setPurchaseContext(e.purchaseContext), 
purchasedItem.setCouponCode(e.couponCode), purchasedItem.setReferrerClientId(e.referrerClientId), 
e.hasOwnProperty("requireUserTermsApproval") && (purchasedItem.setRequireUserTermsApproval(e.requireUserTermsApproval), 
purchasedItem.setTermsApprovalText(e.termsApprovalText), e.hasOwnProperty("termsApprovalLink") && purchasedItem.setTermsApprovalLink(e.termsApprovalLink));
var t = new Currency();
return t.setCurrencyCode(e.currencyCode), purchasedItem.setCurrency(t), purchasedItem.setShouldShowShippingAddress(!1), 
purchasedItem.setIframeBaseUrl(genealogySearchPpc.iFrameBaseUrl), purchasedItem.setIFrameId("payment_iframe"), 
purchasedItem.checkOut(), !0;
},
initMessageBinding:function(e) {
var t = "block";
e && (t = "inline-block"), jQuery(window).on("message", function(e) {
var a = e.originalEvent;
if (a.origin.match("https://www.myheritage.com")) {
var r = jQuery(".offer_box_outer");
switch (a.data) {
case "state_with_tax":
r.find(".price_before_tax_note").css("cssText", "display: " + t + " !important; visibility: visible !important;");
break;

case "state_without_tax":
r.find(".price_before_tax_note").hide();
}
}
});
},
hideIframePreloader:function() {
jQuery(".iframe_preloader_container").hide(), jQuery("#payment_iframe").css("opacity", 1);
var e = jQuery(".offer_box_outer");
e.length > 1 && e.removeClass("disabled");
},
showIframePreloader:function() {
jQuery("#payment_iframe").css("opacity", 0), jQuery(".iframe_preloader_container").show();
var e = jQuery(".offer_box_outer");
e.length > 1 && e.addClass("disabled");
},
showMemberBenefitsLighbox:function() {
jQuery("#member_benefits_popup_contents").modal({
appendTo:".checkout_page",
closeHTML:'<a class="modal_close_img" title="Close"><p class="PK_Clickable PK_ClickableGrayX"></p></a>',
opacity:80,
overlayClose:!0,
focus:!1,
autoResize:!0,
minHeight:.5 * window.innerHeight,
maxHeight:.8 * window.innerHeight
}), window.innerWidth < 768 && jQuery("body").animate({
scrollTop:0
}, 200);
},
showMoreInfoLighbox:function() {
jQuery("#more_info_popup_contents").modal({
appendTo:".checkout_page",
closeHTML:'<a class="modal_close_img" title="Close" ><p class="PK_Clickable PK_ClickableGrayX"></p></a>',
opacity:80,
overlayClose:!0,
focus:!1,
autoResize:!0,
minHeight:.5 * window.innerHeight,
maxHeight:.8 * window.innerHeight
});
},
initPageStatistics:function() {
googleAnalyticsTracking.attachElementsTracking(genealogySearchPpc.googleAnalyticsEventsCategory, EVENT_TYPE_EVENT);
},
checkoutTwoPlans:{
checkoutStarted:!1,
selectPlan:function(e) {
if (!genealogySearchPpc.checkoutTwoPlans.checkoutStarted) {
var t = planParams[e];
genealogySearchPpc.showIframePreloader(), genealogySearchPpc.initializePaymentIframe(t), 
jQuery("#" + e).removeClass("disabled");
}
},
updateHeaderText:function(e) {
var t = planParams[e], a = t.productId;
a == genealogySearchPpc.ITEM_DATA_SUBSCRIPTION_AND_FL_FREE_TRIAL_BILLED_ANNUALLY || a == genealogySearchPpc.ITEM_DATA_SUBSCRIPTION_AND_WVR_FREE_TRIAL_BILLED_ANNUALLY ? jQuery("#free_trial_details").html(genealogySearchPpc.headerTextAnnual) :jQuery("#free_trial_details").html(genealogySearchPpc.headerTextMonthly);
}
},
trackAnalyticsRegistrationFromExternalSource:function(e) {
googleAnalyticsTracking.trackEvent("Registration", "Data Registration form success", e, void 0, void 0, "GTM page To GA");
}
};
