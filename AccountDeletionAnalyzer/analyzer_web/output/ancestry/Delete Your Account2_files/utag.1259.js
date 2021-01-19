//tealium universal tag - utag.1259 ut4.0.201908151837, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
function getRandomInt(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min))+min;}
var qualtricsTraitsUcdmid=(utag.data["ucdmid"])?(utag.data["ucdmid"]):(utag.data["cp.LAU"])?(utag.data["cp.LAU"]):("");var rand=getRandomInt(1,10001);if(an_getCookie("qsBucket").indexOf(".4")==-1){an_removeCookie("qsBucket")}
if(an_getCookie("qsBucket")===""||(an_getCookie("qsBucket").indexOf(".4")==-1&&an_getCookie("qsBQ")==""&&an_getCookie("qs90")=="")){if(rand<=400){an_setCookie("qsBucket",2.4,90,false)
an_setCookie('surveyid','CSAT-1013',90,false)}
if(rand>400&&rand<=1400){an_setCookie("qsBucket",3.4,90,false)
an_setCookie('surveyid','CSAT-1022',90,false)}
if(rand>1400&&rand<=2150){an_setCookie("qsBucket",4.4,90,false)
an_setCookie('surveyid','CSAT-1026',90,false)}
if(rand>2150&&rand<=2550){an_setCookie("qsBucket",5.4,90,false)
an_setCookie('surveyid','CSAT-1005',90,false)}
if(rand>2550&&rand<=2950){an_setCookie("qsBucket",6.4,90,false)
an_setCookie('surveyid','CSAT-1006',90,false)}
if(rand>2950&&rand<=3350){an_setCookie("qsBucket",7.4,90,false)
an_setCookie('surveyid','CSAT-1009',90,false)}
if(rand>3350&&rand<=3750){an_setCookie("qsBucket",8.4,90,false)
an_setCookie('surveyid','CSAT-1010',90,false)}
if(rand>3750&&rand<=4150){an_setCookie("qsBucket",9.4,90,false)
an_setCookie('surveyid','CSAT-1003',90,false)}
if(rand>4150&&rand<=4525){an_setCookie("qsBucket",10.4,90,false)
an_setCookie('surveyid','CSAT-1025',90,false)}
if(rand>4525&&rand<=4775){an_setCookie("qsBucket",11.4,90,false)
an_setCookie('surveyid','CSAT-1023',90,false)}
if(rand>4775&&rand<=5775){an_setCookie("qsBucket",12.4,90,false)
an_setCookie('surveyid','CSAT-1021',90,false)}
if(rand>5775&&rand<=6050){an_setCookie("qsBucket",13.4,90,false)
an_setCookie('surveyid','CSAT-1020',90,false)}
if(rand>6050&&rand<=6450){an_setCookie("qsBucket",18.4,90,false)
an_setCookie('surveyid','CSAT-1016',90,false)}
if(rand>6450&&rand<=6825){an_setCookie("qsBucket",19.4,90,false)
an_setCookie('surveyid','CSAT-1018',90,false)}
if(rand>6825&&rand<=7225){an_setCookie("qsBucket",20.4,90,false)
an_setCookie('surveyid','CSAT-1015',90,false)}
if(rand>7225&&rand<=7625){an_setCookie("qsBucket",21.4,90,false)
an_setCookie('surveyid','CSAT-1017',90,false)}
if(rand>7625&&rand<=8375){an_setCookie("qsBucket",22.4,90,false)
an_setCookie('surveyid','CSAT-1027',90,false)}
if(rand>8375&&rand<=8875){an_setCookie("qsBucket",23.4,90,false)
an_setCookie('surveyid','CSAT-1028',90,false)}
if(rand>8875&&rand<=9125){an_setCookie("qsBucket",24.4,90,false)
an_setCookie('surveyid','CSAT-1029',90,false)}
if(rand>9125&&rand<=9625){an_setCookie("qsBucket",25.4,90,false)
an_setCookie('surveyid','CSAT-1030',90,false)}
if(rand>9625){an_setCookie("qsBucket",99.4,90,false)
an_setCookie('surveyid','none',90,false)}}
function qualtricsCSATSurvey(feature,qURL){if(!document.querySelector('.modalOpen')){var geo=utag.data["geo"];var device=encodeURIComponent(navigator.userAgent)
if(document.location.href.indexOf('dna/origins')!=-1){var testGuid=window.location.href.split('/')[5];qURL=qURL+'?ucdmid='+qualtricsTraitsUcdmid+'&geo='+geo+'&feature='+feature+'&device='+device+'&testGuid='+testGuid;}
else{qURL=qURL+'?ucdmid='+qualtricsTraitsUcdmid+'&geo='+geo+'&feature='+feature+'&device='+device;}
var qualtricsTraitsModal=document.createElement('div');qualtricsTraitsModal.innerHTML='<style>.modal{text-align: center}.qualtrics-copy{margin-top: 25px; color: #534D46}.qualtrics-button{margin: 20px 0 10px 0}@media only screen and (min-width: 767px){.acom-logo{margin-top: 5px}.modal-btn{margin: 25px 0 20px 0}}</style><div id="dna-traits-survey" class="modal"> <div class="qualtrics-acom-logo"> <a href='+qURL+' target="_blank"><img alt="Ancestry logo" src="//www.ancestrycdn.com/ui-static/i/logo/ancestry.svg" onclick="document.getElementById("modal").style="display:none";" style="margin-top: 15px; height: 30px;"/></a> </div><div class="qualtrics-copy"> <h1 class="textxlrg bold">We want to hear about your Ancestry experience!</h1> <p class="textsml">Please take our short survey to help improve the experiences we offer on Ancestry.</p></div><div class="modal-btn qualtrics-button"> <a class="ancBtn" href='+qURL+' target="_blank" onclick="an_setCookie(\'qsBQ\',\'n\', 90)">Take survey</a></div></div>';document.body.appendChild(qualtricsTraitsModal);if(ui.modal){var el=document.getElementById('dna-traits-survey')
var instance=ui.modal(el,{});instance.open()}
else if(window.$){$('#dna-traits-survey').modal({});}
utag.link({"link_name":"survey view","action":"survey view : "+an_getCookie('surveyid'),"site_event":"survey_view"});}}
var bucket=an_getCookie("qsBucket")
utag.data.temp_prop=bucket;if(an_getCookie("qsBQ")!="n"){switch(bucket){case'1.4':if(utag.data['page_name'].toLowerCase().toLowerCase().includes("complete")){an_setCookie("qsBQ","y",90,false)}
break
case'2.4':if(utag.data['page_name'].toLowerCase().includes("dna : membermatch : at member match")||utag.data['page_name'].toLowerCase().includes("community : messagecenter")||utag.data['page_name'].toLowerCase().includes("trees : member connect")||utag.data['page_name'].toLowerCase().includes("community : member directory")){an_setCookie("qsBQ","y",90,false)}
break
case'3.4':if(utag.data['page_name'].toLowerCase().includes("secure : account : emailsettings")){an_setCookie("qsBQ","y",90,false)}
break
case'4.4':if(utag.data['page_name'].toLowerCase().includes("dna : research")||utag.data['page_name'].toLowerCase().includes("support : surveysFAQ")){an_setCookie("qsBQ","y",90,false)}
break
case'5.4':if(utag.data['page_name'].toLowerCase().includes("all hints")||utag.data['page_name'].toLowerCase().includes("personui : personviews : hints")){an_setCookie("qsBQ","y",90,false)}
break
case'6.4':if(utag.data['page_name'].toLowerCase().includes("interactive image")){an_setCookie("qsBQ","y",90,false)}
break
case'7.4':if(utag.data['page_name'].toLowerCase().includes("search : form")){an_setCookie("qsBQ","y",90,false)}
break
case'8.4':if(utag.data['page_name'].toLowerCase().includes("search : results")){an_setCookie("qsBQ","y",90,false)}
break
case'9.4':if(utag.data['page_name'].toLowerCase().includes("dna : results : at results summary")){an_setCookie("qsBQ","y",90,false)}
break
case'10.4':if(utag.data['page_name'].toLowerCase().includes("connect : person")&&(document.URL.toLowerCase().includes(qualtricsTraitsUcdmid)||document.URL.toLowerCase().includes('000000000000')==false)){an_setCookie("qsBQ","y",90,false)}
break
case'11.4':if(utag.data['page_name'].toLowerCase().includes("connect : person")&&document.URL.toLowerCase().includes(qualtricsTraitsUcdmid)==false&&document.URL.toLowerCase().includes('000000000000')){an_setCookie("qsBQ","y",90,false)}
break
case'12.4':if(utag.data['page_name'].toLowerCase().includes("dna : settings : edit test info")){an_setCookie("qsBQ","y",90,false)}
break
case'13.4':if(document.URL.toLowerCase().includes("dna/activate/flow")){an_setCookie("qsBQ","y",90,false)}
break
case'18.4':if(utag.data['page_name'].toLowerCase().includes("trees")){an_setCookie("qsBQ","y",90,false)}
break
case'19.4':if(utag.data['page_name'].toLowerCase().includes("personui : personviews : lifestory")){an_setCookie("qsBQ","y",90,false)}
break
case'20.4':if(utag.data['page_name'].toLowerCase().includes("personui : personviews : facts")){an_setCookie("qsBQ","y",90,false)}
break
case'21.4':if(utag.data['page_name'].toLowerCase().includes("personui : personviews : gallery")){an_setCookie("qsBQ","y",90,false)}
break
case'22.4':if(document.URL.toLowerCase().includes("dna/origins")){an_setCookie("qsBQ","y",90,false)}
break
case'25.4':if(utag.data['page_name'].toLowerCase().includes("discoveryui-geneticfamily : genetic family")){an_setCookie("qsBQ","y",90,false)}
break}}
if(an_getCookie("qsBQ")==="y"&&an_getCookie("qs90")===""){switch(bucket){case'1.4':if(utag.data['page_name'].toLowerCase().includes("home page : logged in")){qualtricsCSATSurvey("FlywheelOnboardingFTHO","//ancestry.az1.qualtrics.com/jfe/form/SV_9M0zgU4gCMipKWp")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'2.4':if(utag.data['page_name'].toLowerCase().includes("dna : membermatch : at member match")==false&&utag.data['page_name'].toLowerCase().includes("community : messagecenter")==false&&utag.data['page_name'].toLowerCase().includes("trees : member connect")==false&&utag.data['page_name'].toLowerCase().includes("community : member directory")==false&&utag.data['page_name'].toLowerCase().includes("connect : person")==false){qualtricsCSATSurvey("FlywheelP2P","//ancestry.az1.qualtrics.com/jfe/form/SV_1Om4sr3mGiXzFC5")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'3.4':if(utag.data['page_name'].toLowerCase().includes("secure : account : emailsettings")==false){qualtricsCSATSurvey("TrustEmailSetting","//ancestry.az1.qualtrics.com/jfe/form/SV_0V9TyO9TxfgJUKV")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'4.4':if(utag.data['page_name'].toLowerCase().includes("dna : research")==false){qualtricsCSATSurvey("WellnessPersonalDiscoveryProject","//ancestry.az1.qualtrics.com/jfe/form/SV_a30eTc92tLmHpkh")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'5.4':if(utag.data['page_name'].toLowerCase().includes("all hints")==false&&utag.data['page_name'].toLowerCase().includes("personui : personviews")==false&&utag.data['page_name'].toLowerCase().includes("search : record : index page")==false&&utag.data['page_name'].toLowerCase().includes("interactive image")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Merge")==false&&utag.data['page_name'].toLowerCase().includes("Trees : New Add Person")==false&&utag.data['page_name'].toLowerCase().includes("media")==false){qualtricsCSATSurvey("DiscoveryHints","//ancestry.az1.qualtrics.com/jfe/form/SV_5pzQfsx3jMsRixn")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'6.4':if(utag.data['page_name'].toLowerCase().includes("interactive image")==false){qualtricsCSATSurvey("DiscoveryImageViewer","//ancestry.az1.qualtrics.com/jfe/form/SV_8CDCufj1B3Cx08d")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'7.4':if(utag.data['page_name'].toLowerCase().includes("search : form")==false){qualtricsCSATSurvey("DiscoverySearch","//ancestry.az1.qualtrics.com/jfe/form/SV_4SbMnJT4FhBZtMV")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'8.4':if(utag.data['page_name'].toLowerCase().includes("search : results")==false){qualtricsCSATSurvey("DiscoverySearchResults","//ancestry.az1.qualtrics.com/jfe/form/SV_br7bGceWymUTD2l")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'9.4':if(utag.data['page_name'].toLowerCase().includes("dna : results : at results summary")==false&&utag.data['page_name'].toLowerCase().includes("dna : membermatch")==false&&utag.data['page_name'].toLowerCase().includes("dna : relatedness")==false&&utag.data['page_name'].toLowerCase().includes("dna : ethnicitycompare")==false&&utag.data['page_name'].toLowerCase().includes("dna : help")==false){qualtricsCSATSurvey("DiscoveryDNAMatches","//ancestry.az1.qualtrics.com/jfe/form/SV_3mHSO5fSLs6pYVv")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'10.4':if(utag.data['page_name'].toLowerCase().includes("connect : person")==false){qualtricsCSATSurvey("TrustYourProfile","//ancestry.az1.qualtrics.com/jfe/form/SV_brrAwrJRxMj7S0B")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'11.4':if(utag.data['page_name'].toLowerCase().includes("connect : person")==false){qualtricsCSATSurvey("TrustMemberProfile","//ancestry.az1.qualtrics.com/jfe/form/SV_d0UG5a8MEMxOwjr")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'12.4':if(utag.data['page_name'].toLowerCase().includes("dna : settings : edit test info")==false&&utag.data['page_name'].toLowerCase().includes("dna : general : attach results")==false&&document.URL.toLowerCase().includes("informedconsent")==false&&document.URL.toLowerCase().includes("privacystatement")==false&&utag.data['page_name'].toLowerCase().includes("general sites : legal : termsandconditions")==false){qualtricsCSATSurvey("TrustDNASettings","//ancestry.az1.qualtrics.com/jfe/form/SV_eeM6afmhuyIySa1")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'13.4':if(utag.data['page_name'].toLowerCase().includes("dna : activation")==false){qualtricsCSATSurvey("TrustDNAActivation","//ancestry.az1.qualtrics.com/jfe/form/SV_25f7jgqJaqgXsi1")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'18.4':if(utag.data['page_name'].toLowerCase().includes("trees")==false&&utag.data['page_name'].toLowerCase().includes("HomePerson")==false){qualtricsCSATSurvey("PeopleFamilyTree","//ancestry.az1.qualtrics.com/jfe/form/SV_bDDSo8ULlEGvq7P")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'19.4':if(utag.data['page_name'].toLowerCase().includes("personui : personviews : lifestory")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Merge Duplicates")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Member Connect")==false&&utag.data['page_name'].toLowerCase().includes("academy")==false&&utag.data['page_name'].toLowerCase().includes("circles-ui : descendants")==false&&utag.data['page_name'].toLowerCase().includes("circles-ui : relationship")==false){qualtricsCSATSurvey("PeopleLifeStory","//ancestry.az1.qualtrics.com/jfe/form/SV_5gmU2DeDnWUPWIZ")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'20.4':if(utag.data['page_name'].toLowerCase().includes("personui : personviews : facts")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Merge Duplicates")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Member Connect")==false&&utag.data['page_name'].toLowerCase().includes("academy")==false&&utag.data['page_name'].toLowerCase().includes("circles-ui : descendants")==false&&utag.data['page_name'].toLowerCase().includes("circles-ui : relationship")==false){qualtricsCSATSurvey("PeopleFacts","//ancestry.az1.qualtrics.com/jfe/form/SV_b91SlfWneXCzGFT")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'21.4':if(utag.data['page_name'].toLowerCase().includes("personui : personviews : gallery")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Merge Duplicates")==false&&utag.data['page_name'].toLowerCase().includes("Trees : Member Connect")==false&&utag.data['page_name'].toLowerCase().includes("academy")==false&&utag.data['page_name'].toLowerCase().includes("circles-ui : descendants")==false&&utag.data['page_name'].toLowerCase().includes("circles-ui : relationship")==false){qualtricsCSATSurvey("PeopleGallery","//ancestry.az1.qualtrics.com/jfe/form/SV_2tKvQvSF5nlrtkh")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'22.4':if(document.referrer.indexOf('/dna/origins')!==-1&&document.location.pathname.indexOf('/dna/origins')===-1){qualtricsCSATSurvey("DNAStory","//ancestry.az1.qualtrics.com/jfe/form/SV_73OZygRpdaNWeZ7")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break
case'23.4':qualtricsCSATSurvey("PeopleMyTreeTags","//ancestry.az1.qualtrics.com/jfe/form/SV_01WBA5qD3vZOnA1")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)
break
case'24.4':qualtricsCSATSurvey("PeopleTreeNodeSearch","//ancestry.az1.qualtrics.com/jfe/form/SV_bK2PgHsBIAvn5TD")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)
break
case'25.4':if(utag.data['page_name'].toLowerCase().includes("discoveryui-geneticfamily : genetic family")==false&&utag.data['page_name'].toLowerCase().includes("discoveryui-geneticfamily : thrulines view")==false){qualtricsCSATSurvey("DiscoveryThruLines","//ancestry.az1.qualtrics.com/jfe/form/SV_5gQtY7LazMaXqIt ")
an_setCookie("qsBQ","n",90,false)
an_setCookie("qs90","yes",90,false)}
break}}
}};utag.o[loader].loader.LOAD(id);})("1259","ancestry.main");}catch(error){utag.DB(error);}
