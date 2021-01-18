// JavaScript Document

$(document).ready(function(){
//Hide the tooglebox when page load
$(".togglebox").hide();
//slide up and down when click over heading 2
$("a.toggle").click(function(){
// slide toggle effect set to slow you can set it to fast too.
$(this).next(".togglebox").slideToggle("fast");
return true;
});
$("a.toggleButton").click(function(){
// slide toggle effect set to slow you can set it to fast too.
$(this).next(".togglebox").slideToggle("fast");
return true;
});
});



$(document).ready(function(){
//Hide the tooglebox when page load
$(".togglebox").hide();
//slide up and down when hover over heading 2
$("a.toggleautoclose").click(function(){
	$(".togglebox").hide(0);
// slide toggle effect set to slow you can set it to fast too.
$(this).next(".togglebox").slideToggle("slow");
return true;
});
});