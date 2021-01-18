(function() {
    function loadWidgetLibraries(filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);

        } else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }

        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }

    if (!window.embedded_svc) {
        //loadWidgetLibraries("https://service.force.com/embeddedservice/5.0/esw.min.js", "js");
    }

    this.sf_snapinsWidgetModel = function() {

        var buttonParams;

        var fileVersion = "2.0";

        //prechat title ids for adidas
        var prechatTitleSettingsAdidas = {

            "English": "0150O000005BxjW",
            "German": "0150O000005BxjX",
            "Spanish": "0150O000005BxjY",
            "French": "0150O000005BxjZ",
            "Italian": "0150O000005Bxja",
            "Dutch": "0150O000005Bxjb",
            "Russian": "0150O000005Bxjc",
            "Polish": "0150O000005BxjW"
        };

        //prechat title ids for Reebok
        var prechatTitleSettingsReebok = {

            "English": "0150O000005Bxjd",
            "German": "0150O000005CBbr",
            "Spanish": "0150O000005CBbs",
            "French": "0150O000005CBbt",
            "Italian": "0150O000005CBbu",
            "Dutch": "0150O000005CBbv",
            "Russian": "0150O000005CBbw"
                                                
        };

        var countrySettings = {

            "GB":{"country":"UK", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
            "IE":{"country":"Ireland", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
            "DE":{"country":"Germany", "language":"German", "FirstName":"Vorname", "LastName":"Nachname"},
            "US":{"country":"USA", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
            "IT":{"country":"Italy", "language":"Italian", "FirstName":"Nome", "LastName":"Cognome"},
            "ES":{"country":"Spain", "language":"Spanish", "FirstName":"Nombre", "LastName":"Apellidos"},
            "NL":{"country":"Netherlands", "language":"Dutch", "FirstName":"Voornaam", "LastName":"Achternaam"},
            "FR": { "country": "France", "language": "French", "FirstName": "Prénom", "LastName": "Nom" },
            "RU": { "country": "Russia", "language": "Russian", "FirstName": "Имя", "LastName": "Фамилия" },
            "PE":{"country":"Peru", "language":"Spanish", "FirstName":"Nombre", "LastName":"Apellidos"},
            "AR":{"country":"Argentina", "language":"Spanish", "FirstName":"Nombre", "LastName":"Apellidos"},
            "MX":{"country":"Mexico", "language":"Spanish", "FirstName":"Nombre", "LastName":"Apellidos"},
            "AU":{"country":"Australia", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
            "NZ":{"country":"New Zealand", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
            "CA":{"country":"Canada", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
            "TR":{"country":"Turkey", "language":"Turkish", "FirstName":"Adı", "LastName":"Soyadi"},
			"MY":{"country":"Malaysia", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
			"TH":{"country":"Thailand", "language":"Thai", "FirstName":"ชื่อจริง", "LastName":"นามสกุล"},
			"SG":{"country":"Singapore", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
			"PH":{"country":"Philippines", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
			"PL": { "country": "Poland", "language": "Polish", "FirstName": "Imię", "LastName": "Nazwisko" },
			"DK": { "country": "Denmark", "language": "Danish", "FirstName": "Fornavn", "LastName": "Efternavn" },
			"SE": { "country": "Sweden", "language": "Swedish", "FirstName": "Förnamn", "LastName": "Efternamn" },
			"CO": { "country": "Colombia", "language": "Spanish", "FirstName": "Nombre", "LastName": "Apellidos" },
			"CL": { "country": "Chile", "language": "Spanish", "FirstName": "Nombre", "LastName": "Apellidos"},
			"PT": { "country": "Portugal", "language": "Portuguese", "FirstName": "Nome", "LastName": "Sobrenome" },
			"GR": { "country": "Greece", "language": "Greek", "FirstName": "Όνομα", "LastName": "Επώνυμο" },
			"IE": {"country":"Ireland", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
			"FI": {"country":"Finland", "language":"English", "FirstName":"First Name", "LastName":"Last Name"},
			"AT": { "country": "Austria", "language": "German", "FirstName": "Vorname", "LastName": "Nachname" },
			"SK": {"country":"Slovakia", "language":"Slovak", "FirstName":"Meno", "LastName":"Priezvisko"},
			"NO": {"country":"Norway", "language":"Norwegian", "FirstName":"Fornavn", "LastName":"Etternavn"},
			"CZ": { "country": "Czech Republic", "language": "Czech", "FirstName": "Křestní jméno", "LastName": "Příjmení" }
 			
        };
	var countrySettingsSwitzerland = {

            "fr":{"country": "Switzerland", "language": "French", "FirstName": "Prénom", "LastName": "Nom" },
            "it":{"country":"Switzerland", "language":"Italian", "FirstName":"Nome", "LastName":"Cognome"},
            "de":{"country":"Switzerland", "language":"German", "FirstName":"Vorname", "LastName":"Nachname"},
			"en":{"country":"Switzerland", "language":"English", "FirstName":"First Name", "LastName":"Last Name"}
        };
	var countrySettingsBelgium = {

            "fr":{"country": "Belgium", "language": "French", "FirstName": "Prénom", "LastName": "Nom" },
            "nl":{"country":"Belgium", "language":"Dutch", "FirstName":"Voornaam", "LastName":"Achternaam"},
            "en":{"country":"Belgium", "language":"English", "FirstName":"First Name", "LastName":"Last Name"}
        };
        /*var isBotEnabledSetting = {
            "GB": true,
            "US": true
       };*/
               
               var isBotEnabledConfig = {
                       "ES":{"adidas":{"reactive chat":true,"sticky service chat":true}},
                       "FR":{"adidas":{"reactive chat":true,"sticky service chat":true}},
                       "GB":{"adidas":{"reactive chat":true,"sticky service chat":true}},
                       "DE":{"adidas":{"reactive chat":true,"sticky service chat":true}},
                       "US":{"adidas":{"reactive chat":false,"sticky service chat":true}},
                       "IT":{"adidas":{"reactive chat":true,"sticky service chat":true}},
					   "NL":{"adidas":{"reactive chat":true,"sticky service chat":true}}
               };
               
               var isBotEnabledSetting;

        var brandSettings = {
            "adidas":{"brand":"adidas", "subrand":"adidas inline" , "proactive sales chat":"sf-chat-btn", "proactive service chat":"sf-chat-btn", "sticky sales chat":"sf-chat-btn-stky", "sticky service chat":"sf-chat-btn-stky"},
            "reebok":{"brand":"reebok", "subrand":"Reebok Inline" , "proactive sales chat":"sf-chat-btn", "proactive service chat":"sf-chat-btn", "sticky sales chat":"sf-chat-btn-stky", "sticky service chat":"sf-chat-btn-stky"}
        };

        var chatTypeSettings = {
            "Proactive Sales Chat":{"type":"Proactive Sales Chat"},
            "Proactive Service Chat":{"type":"Proactive Service Chat"},
            "Sticky Sales Chat":{"type":"Proactive Sales Chat"},
            "Sticky Service Chat":{"type":"Proactive Service Chat"},
            "Reactive Chat":{"type":"Reactive Chat"}
        };

        //For transactional emails
        var pageUrl, snapinsEmailInviteCheck, eChat;
        pageUrl = window.location.href;
        snapinsEmailInviteCheck = "snapinsEchat=true";
        eChat = false;
        if(pageUrl.indexOf(snapinsEmailInviteCheck) != -1){
            eChat = true;
        }

        //live agent configurations
        // Define option defaults

        var defaults = {
            organisationId: '',
            deploymentId: '',
            buttonId: '',
            initURL: '',
            baseURL: '',
            contentURL: '',
            siteURL: '',
            brandName: '',
            countryCode: '',
            languageCode: '',
            deploymentName: '',
            embeddedServiceLiveAgentId: '',
            chatType: '',
            duration: '',
            botEnabled: false
        }
		var cookie;
		
		if (window.utag){
			cookie  = window.utag.data.adobe_visitor_id;
		
		}
        sf_snapinsWidgetModel.prototype.loadWidget = function() {

            // Create options by extending defaults with the passed in arugments
            if (arguments[0] && typeof arguments[0] === "object") {
                buttonParams = extendDefaults(defaults, arguments[0]);
            }

//            if (!window.embedded_svc) {
//                console.log('Snapins embeddedservice is not defined');
//                return false;
//            }

            if ((!buttonParams.brandName) || (buttonParams.brandName == '')) {
                console.log('brandName is not defined');
                return false;
            }

            if(buttonParams.brandName.toLowerCase() == 'adidas'){
                loadWidgetLibraries("https://www.contactus.adidas.com/adidasContact/servlet/servlet.FileDownload?file=0150O00000453b1&v="+fileVersion, "css");
                               //loadWidgetLibraries("https://csuat-e-com.cs81.force.com/adidasContact/servlet/servlet.FileDownload?file=0150O00000453b1&v=2", "css");
                if (buttonParams.countryCode.toLowerCase() == 'ru') {
                    loadWidgetLibraries("https://www.contactus.adidas.com/adidasContact/servlet/servlet.FileDownload?file=0150O000005Cpq7&v="+fileVersion, "css");
                }
            }else{
                loadWidgetLibraries("https://www.contactus.adidas.com/adidasContact/servlet/servlet.FileDownload?file=0150O000005Bxjh&v="+fileVersion, "css");
            }

            if ((!buttonParams.buttonId) || (buttonParams.buttonId == '')) {
                console.log('invalid button id');
                return false;
            }

            if ((!buttonParams.deploymentId) || (buttonParams.deploymentId == '')) {
                console.log('invalid deployment id');
                return false;
            }

            if ((!buttonParams.organisationId) || (buttonParams.organisationId == '')) {
                console.log('invalid organisation id');
                return false;
            }

            if ((!buttonParams.initURL) || (buttonParams.initURL == '')) {
                console.log('invalid initURL');
                return false;
            }

            if ((!buttonParams.baseURL) || (buttonParams.baseURL == '')) {
                console.log('invalid baseURL');
                return false;
           }

            if ((!buttonParams.contentURL) || (buttonParams.contentURL == '')) {
                console.log('invalid contentURL');
                return false;
            }

            if ((!buttonParams.siteURL) || (buttonParams.siteURL == '')) {
                console.log('invalid siteURL');
                return false;
            }

            if ((!buttonParams.countryCode) || (buttonParams.countryCode == '')) {
                console.log('countryCode is not defined');
                return false;
            }

            if ((!buttonParams.languageCode) || (buttonParams.languageCode == '')) {
                console.log('languageCode is not defined');
                return false;
            }

            if ((!buttonParams.deploymentName) || (buttonParams.deploymentName == '')) {
                console.log('deploymentName not defined');
                return false;
            }

            if ((!buttonParams.embeddedServiceLiveAgentId) || (buttonParams.embeddedServiceLiveAgentId == '')) {
                console.log('embeddedServiceLiveAgentId not defined');
                return false;
            }

            if ((!buttonParams.chatType) || (buttonParams.chatType == '')) {
                console.log('chatType not defined');
                return false;
            }

            if ((!buttonParams.duration) || (buttonParams.duration == '')) {
                buttonParams.duration = 0;
            }
                       console.log(buttonParams.chatType);
                       /*if(buttonParams.chatType != "Reactive Chat" && (defaults.countryCode == "GB" || defaults.countryCode == "US")){
                               isBotEnabledSetting[defaults.countryCode] = false;
                       }*/
                       if(isBotEnabledConfig[defaults.countryCode]){
                               var countryConfig = isBotEnabledConfig[defaults.countryCode];
                               if(countryConfig && countryConfig[buttonParams.brandName.toLowerCase()]){
                                      var brandConfig = countryConfig[buttonParams.brandName.toLowerCase()];
                                      if(brandConfig && brandConfig[buttonParams.chatType.toLowerCase()]){
                                              isBotEnabledSetting = true;
                                      }
                               }
                       }

                       if(isBotEnabledSetting != true){
                               isBotEnabledSetting = false;
                       }
                       console.log(isBotEnabledSetting);
                       
            if (!window.embedded_svc) {

                var s = document.createElement('script');

                s.setAttribute('src','https://adidas.my.salesforce.com/embeddedservice/5.0/esw.min.js');

                s.onload = function() {

                        initESW(null);

                };
                document.body.appendChild(s);

            } else {

                    initESW('https://service.force.com');
            }

        };

        //Load Tealium analytic code utag library file
        /*

        (function(a,b,c,d){

            if (!window.utag){

                if((defaults.countryCode == 'GB')){
                    var brandProfile = 'adidasglobal';

                    //'dev' for development
                    //'prod' for production

                    var environment = 'dev';

                    a='https://tags.tiqcdn.com/utag/adidas/'+brandProfile+'/'+environment+'/utag.js';
                    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
                    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);


                }else{
                    var brandProfile = 'reebokglobal';
                }

                //Enabled only for adidas as of now

            }

        })();
        */


        // Utility method to extend defaults with user options
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }

        function initESW(gslbBaseURL) {

            embedded_svc.settings.displayHelpButton = true; //Or false
            embedded_svc.settings.language = buttonParams.languageCode; //For example, enter 'en' or 'en-US'

            embedded_svc.settings.avatarImgURL = '';
			embedded_svc.settings.autoOpenPostChat = true;

			if((defaults.countryCode == 'CH')){
				var prechatTitleLang = countrySettingsSwitzerland[defaults.languageCode].language;
			}
			else if((defaults.countryCode == 'BE')){
				var prechatTitleLang = countrySettingsBelgium[defaults.languageCode].language;
			}
			else{
				var prechatTitleLang = countrySettings[defaults.countryCode].language;
			}
			
            if(buttonParams.brandName.toLowerCase() == 'adidas'){

                var prechatTitle = prechatTitleSettingsAdidas[prechatTitleLang];
            }else{
                var prechatTitle = prechatTitleSettingsReebok[prechatTitleLang];
            }

            embedded_svc.settings.prechatBackgroundImgURL = 'https://www.contactus.adidas.com/adidasContact/servlet/servlet.FileDownload?file='+prechatTitle;

            embedded_svc.settings.waitingStateBackgroundImgURL = '';
            embedded_svc.settings.smallCompanyLogoImgURL = '';

            embedded_svc.settings.enabledFeatures = ['LiveAgent'];
            embedded_svc.settings.entryFeature = 'LiveAgent';

            console.log(brandSettings[buttonParams.brandName.toLowerCase()].subrand);
                       //embedded_svc.settings.extraPrechatInfo = [];
                       //embedded_svc.settings.extraPrechatFormDetails = [] ;
					   
			embedded_svc.addEventHandler("onChatRequestSuccess", function() {
				if (window.utag){
					//Tealiun analytic code on click of the start chat button
					utag.link({
						event_category: 'PROACTIVE CHAT',
						event_name: 'START BUTTON CLICKED'
					});
				}
			});
                       
if((defaults.countryCode == 'CH')){
	            embedded_svc.settings.extraPrechatFormDetails = [
            {
                "label": "Case Origin",
                "value": "Chat",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Subject",
                "value": "Chat with Visitor",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Point of Sales",
                "value": "Online Shop",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "snapins prechat hidden field contactId",
                "transcriptFields": ["Contact_Id_created_by_Bot__c"]
            },{
                "label": "snapins prechat hidden field caseId",
                "transcriptFields": ["Case_Id_created_by_Bot__c"]
            },{
                "label": "BotEnabled",
                "value": (isBotEnabledSetting) ? true : false,
                "transcriptFields": [],
                "displayToAgent": false
            },{
                "label": "snapinsPrechatHiddenFieldContactCreated",
                "transcriptFields": ["Contact_Created_by_bot__c"],
            },{ 
				"label": countrySettingsSwitzerland[defaults.languageCode].FirstName,
				"transcriptFields": ["Visitor_Name__c"]
            },{
                "label": "CookieId",
				"value": cookie,
                "transcriptFields": ["Cookie_Id__c"]
            },{
                "label": "Ecom_Chat_Type__c",
                "value": "Advisor",
                "transcriptFields": [],
                "displayToAgent": false
            },{
				"label": "Language",
				"value": countrySettingsSwitzerland[defaults.languageCode].language,
				"transcriptFields": [],
				"displayToAgent": true
            },{
				"label": "Country",
				"value": countrySettingsSwitzerland[defaults.languageCode].country,
				"transcriptFields": [],
				"displayToAgent": true
			},{
                "label": "Status",
                "value": "In Progress",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Sub Origin",
                "value": chatTypeSettings[buttonParams.chatType].type,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Brand",
                "value": buttonParams.brandName,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Sub Brand",
                "value": brandSettings[buttonParams.brandName.toLowerCase()].subrand,
                "transcriptFields": [],
                "displayToAgent": true
            }];
}
else if((defaults.countryCode == 'BE')){
	            embedded_svc.settings.extraPrechatFormDetails = [
            {
                "label": "Case Origin",
                "value": "Chat",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Subject",
                "value": "Chat with Visitor",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Point of Sales",
                "value": "Online Shop",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "snapins prechat hidden field contactId",
                "transcriptFields": ["Contact_Id_created_by_Bot__c"]
            },{
                "label": "snapins prechat hidden field caseId",
                "transcriptFields": ["Case_Id_created_by_Bot__c"]
            },{
                "label": "BotEnabled",
                "value": (isBotEnabledSetting) ? true : false,
                "transcriptFields": [],
                "displayToAgent": false
            },{
                "label": "snapinsPrechatHiddenFieldContactCreated",
                "transcriptFields": ["Contact_Created_by_bot__c"],
            },{ 
				"label": countrySettingsBelgium[defaults.languageCode].FirstName,
				"transcriptFields": ["Visitor_Name__c"]
            },{
                 "label": "CookieId",
				"value": cookie,
                "transcriptFields": ["Cookie_Id__c"]
            },{
                "label": "Ecom_Chat_Type__c",
                "value": "Advisor",
                "transcriptFields": [],
                "displayToAgent": false
            },{
				"label": "Language",
				"value": countrySettingsBelgium[defaults.languageCode].language,
				"transcriptFields": [],
				"displayToAgent": true
            },{
				"label": "Country",
				"value": countrySettingsBelgium[defaults.languageCode].country,
				"transcriptFields": [],
				"displayToAgent": true
			},{
                "label": "Status",
                "value": "In Progress",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Sub Origin",
                "value": chatTypeSettings[buttonParams.chatType].type,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Brand",
                "value": buttonParams.brandName,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Sub Brand",
                "value": brandSettings[buttonParams.brandName.toLowerCase()].subrand,
                "transcriptFields": [],
                "displayToAgent": true
            }];
}
else{
            embedded_svc.settings.extraPrechatFormDetails = [
            {
                "label": "Case Origin",
                "value": "Chat",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Subject",
                "value": "Chat with Visitor",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Point of Sales",
                "value": "Online Shop",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "snapins prechat hidden field contactId",
                "transcriptFields": ["Contact_Id_created_by_Bot__c"]
            },{
                "label": "snapins prechat hidden field caseId",
                "transcriptFields": ["Case_Id_created_by_Bot__c"]
            },{
                "label": "BotEnabled",
                "value": (isBotEnabledSetting) ? true : false,
                "transcriptFields": [],
                "displayToAgent": false
            },{
                "label": "snapinsPrechatHiddenFieldContactCreated",
                "transcriptFields": ["Contact_Created_by_bot__c"],
            },{
                "label": countrySettings[defaults.countryCode].FirstName,
                "transcriptFields": ["Visitor_Name__c"]
            },{
                 "label": "CookieId",
				"value": cookie,
                "transcriptFields": ["Cookie_Id__c"]
            },{
                "label": "Ecom_Chat_Type__c",
                "value": "Advisor",
                "transcriptFields": [],
                "displayToAgent": false
            },{
                "label": "Language",
                "value": countrySettings[defaults.countryCode].language,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Country",
                "value": countrySettings[defaults.countryCode].country,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Status",
                "value": "In Progress",
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Sub Origin",
                "value": chatTypeSettings[buttonParams.chatType].type,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Brand",
                "value": buttonParams.brandName,
                "transcriptFields": [],
                "displayToAgent": true
            },{
                "label": "Sub Brand",
                "value": brandSettings[buttonParams.brandName.toLowerCase()].subrand,
                "transcriptFields": [],
                "displayToAgent": true
            }];
	}	

if((defaults.countryCode == 'CH')){
            embedded_svc.settings.extraPrechatInfo = [
            {
                "entityName":"Contact",
                "showOnCreate":true,
                "linkToEntityName":"Case",
                "linkToEntityField":"ContactId",
                "saveToTranscript":"ContactId",
                "entityFieldMaps":[
                {
                      "isExactMatch": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "fieldName": "Id",
                    "doCreate": false,
                    "doFind": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "label": "snapins prechat hidden field contactId"

                },
                {
                    "isExactMatch": true,
                    "fieldName": "Email",
                    "doFind": true,
                    "doCreate": true,
                    "label": "Email"
                },{
                    "isExactMatch": false,
                    "fieldName": "FirstName",
                    "doCreate": true,
                    "doFind": false,
                    "label": countrySettingsSwitzerland[defaults.languageCode].FirstName
                },{
                    "isExactMatch": false,
                    "fieldName": "LastName",
                    "doCreate": true,
                    "doFind": false,
                    "label": countrySettingsSwitzerland[defaults.languageCode].LastName
                }]
            },
            {
                "entityName": "Case",
                "showOnCreate": true,
                "saveToTranscript":"CaseId",
                "entityFieldMaps": [
                {
                    "isExactMatch": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "fieldName": "Id",
                    "doCreate": false,
                    "doFind": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "label": "snapins prechat hidden field caseId"
                },{
                    "isExactMatch": false,
                    "fieldName": "Ecom_Language__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Language"
               },{

                    "isExactMatch": false,
                    "fieldName": "Subject",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Subject"
                },{

                    "isExactMatch": false,
                    "fieldName": "Ecom_Chat_Type__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Ecom_Chat_Type__c"
                },{

                    "isExactMatch": false,
                    "fieldName": "Origin",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Case Origin"
                },{

                    "isExactMatch": false,
                    "fieldName": "Ecom_EMEA_Point_of_Sales__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Point of Sales"
                },{

                    "isExactMatch": false,
                    "fieldName": "Country__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Country"
                },{
                    "isExactMatch": false,
                    "fieldName": "Status",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Status"
                },{
                    "isExactMatch": false,
                    "fieldName": "Sub_Origin__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Sub Origin"
                },{
                    "isExactMatch": false,
                    "fieldName": "Ecom_Brand__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Brand"
                },{
                    "isExactMatch": false,
                    "fieldName": "Sub_Brand__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Sub Brand"
                }]
            }];
}
else if((defaults.countryCode == 'BE')){
	embedded_svc.settings.extraPrechatInfo = [
            {
                "entityName":"Contact",
                "showOnCreate":true,
                "linkToEntityName":"Case",
                "linkToEntityField":"ContactId",
                "saveToTranscript":"ContactId",
                "entityFieldMaps":[
                {
                    "isExactMatch": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "fieldName": "Id",
                    "doCreate": false,
                    "doFind": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "label": "snapins prechat hidden field contactId"

                },
		{
                    "isExactMatch": true,
                    "fieldName": "Email",
                    "doFind": (isBotEnabledSetting) ? false : true,
                    "doCreate": (isBotEnabledSetting) ? false : true,
                    "label": "Email"
                },
		{		

						"isExactMatch": false,
						"fieldName": "FirstName",
						"doCreate": true,
						"doFind": false,
						"label": countrySettingsBelgium[defaults.languageCode].FirstName

                },{

						"isExactMatch": false,
						"fieldName": "LastName",
						"doCreate": true,
						"doFind": false,
						"label": countrySettingsBelgium[defaults.languageCode].LastName

                }]
            },
            {
                "entityName": "Case",
                "showOnCreate": true,
                "saveToTranscript":"CaseId",
                "entityFieldMaps": [
                {
                    "isExactMatch": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "fieldName": "Id",
                    "doCreate": false,
                    "doFind": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "label": "snapins prechat hidden field caseId"
                },{
                    "isExactMatch": false,
                    "fieldName": "Ecom_Language__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Language"
                },{

                    "isExactMatch": false,
                    "fieldName": "Subject",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Subject"
                },{

                    "isExactMatch": false,
                    "fieldName": "Ecom_Chat_Type__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Ecom_Chat_Type__c"
                },{

                    "isExactMatch": false,
                    "fieldName": "Origin",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Case Origin"
                },{

                    "isExactMatch": false,
                    "fieldName": "Ecom_EMEA_Point_of_Sales__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Point of Sales"
                },{

                    "isExactMatch": false,
                    "fieldName": "Country__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Country"
                },{
                    "isExactMatch": false,
                    "fieldName": "Status",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Status"
                },{
                    "isExactMatch": false,
                    "fieldName": "Sub_Origin__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Sub Origin"
                },{
                    "isExactMatch": false,
                    "fieldName": "Ecom_Brand__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Brand"
                },{
                    "isExactMatch": false,
                    "fieldName": "Sub_Brand__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Sub Brand"
                }]
            }];
}
else{	
            embedded_svc.settings.extraPrechatInfo = [
            {
                "entityName":"Contact",
                "showOnCreate":true,
                "linkToEntityName":"Case",
                "linkToEntityField":"ContactId",
                "saveToTranscript":"ContactId",
                "entityFieldMaps":[
                {
                    "isExactMatch": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "fieldName": "Id",
                    "doCreate": false,
                    "doFind": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "label": "snapins prechat hidden field contactId"

                },
		{
                    "isExactMatch": true,
                    "fieldName": "Email",
                    "doFind": (isBotEnabledSetting) ? false : true,
                    "doCreate": (isBotEnabledSetting) ? false : true,
                    "label": "Email"
                },
		{
                    "isExactMatch": false,
                    "fieldName": "FirstName",
                    "doCreate": true,
                    "doFind": false,
                    "label": countrySettings[defaults.countryCode].FirstName
                },{
                    "isExactMatch": false,
                    "fieldName": "LastName",
                    "doCreate": true,
                    "doFind": false,
                    "label": countrySettings[defaults.countryCode].LastName
                }]
            },
            {
                "entityName": "Case",
                "showOnCreate": true,
                "saveToTranscript":"CaseId",
                "entityFieldMaps": [
                {
                    "isExactMatch": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "fieldName": "Id",
                    "doCreate": false,
                    "doFind": (isBotEnabledSetting) ? true : defaults.botEnabled, //true
                    "label": "snapins prechat hidden field caseId"
                },{
                    "isExactMatch": false,
                    "fieldName": "Ecom_Language__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Language"
                },{

                    "isExactMatch": false,
                    "fieldName": "Subject",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Subject"
                },{

                    "isExactMatch": false,
                    "fieldName": "Ecom_Chat_Type__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Ecom_Chat_Type__c"
                },{

                    "isExactMatch": false,
                    "fieldName": "Origin",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Case Origin"
                },{

                    "isExactMatch": false,
                    "fieldName": "Ecom_EMEA_Point_of_Sales__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Point of Sales"
                },{

                    "isExactMatch": false,
                    "fieldName": "Country__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Country"
                },{
                    "isExactMatch": false,
                    "fieldName": "Status",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Status"
                },{
                    "isExactMatch": false,
                    "fieldName": "Sub_Origin__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Sub Origin"
                },{
                    "isExactMatch": false,
                    "fieldName": "Ecom_Brand__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Brand"
                },{
                    "isExactMatch": false,
                    "fieldName": "Sub_Brand__c",
                    "doCreate": true,
                    "doFind": false,
                    "label": "Sub Brand"
                }]
            }];
			
	}		

            var snapChatType = buttonParams.chatType.toLowerCase();

            if(snapChatType == 'proactive sales chat' || snapChatType == 'proactive service chat' || snapChatType == 'sticky service chat' || snapChatType == 'sticky sales chat'){
                createWidget(gslbBaseURL,snapChatType);
            }else{
               initSnapins(gslbBaseURL);
            }


            //embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
            //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

            //embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
            //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)
            //embedded_svc.settings.storageDomain = 'ysblivechat-developer-edition.na46.force.com';
            //embedded_svc.init(buttonParams.baseURL, buttonParams.siteURL, buttonParams.baseURL, buttonParams.organisationId, buttonParams.deploymentName, { baseLiveAgentContentURL: buttonParams.contentURL, deploymentId: buttonParams.deploymentId, buttonId: buttonParams.buttonId, baseLiveAgentURL: buttonParams.initURL, eswLiveAgentDevName: buttonParams.embeddedServiceLiveAgentId});


        }

        function createWidget(gslbBaseURL,chattype) {

            loadWidgetLibraries("https://e-com.secure.force.com/adidasContact/servlet/servlet.FileDownload?file=0150O000005CQN9", "css");
            var btnClass =  brandSettings[buttonParams.brandName.toLowerCase()][chattype];
            var welcomeMsg = "Hi, Need a quick answer?";

            var container = document.createElement("div");
            container.setAttribute("id", 'snapins_invite');
            container.setAttribute("class", 'sf-chat-iconx-container '+btnClass);
            //container.setAttribute("class", btnClass);

            var widgetHtml = '<div class="sf-chat-iconx-wrapper">\
                      <div class="sf-chat-message-container" id="sf-live-chat-msg">\
                          <div class="sf-chat-message">\
                            <span id="sf-close-msg"></span><span id="sf-chat-msg"><span id="sf-welcme-msg">' + welcomeMsg + '</span></span>\
                          </div>\
                      </div>\
                      <div class="sf-chat-logo-container" id="sf-live-chat"></div>\
                  </div>';

            container.innerHTML = widgetHtml;
            document.body.appendChild(container);

            initSnapins(gslbBaseURL);

            if(eChat == false){
            bindWidgetEvents();
            }

            //document.body.innerHTML = widgetHtml;
        }

         //function to bind events to widget
        function bindWidgetEvents() {

            document.getElementById("sf-live-chat-msg").style.transform = "translateX(0%)";

            document.getElementById('sf-close-msg').addEventListener('click', function() {
                document.getElementById("sf-live-chat-msg").style.transform = "translateX(135%)";
                document.getElementById("snapins_invite").style.display = "none";
                embedded_svc.inviteAPI.inviteButton.rejectInvite();
            });

            document.getElementById('sf-chat-msg').addEventListener('click', function() {
                embedded_svc.inviteAPI.inviteButton.acceptInvite();

                if (window.utag){
                    //Tealiun analytic code on click of the chat button
                    utag.link({ event_category: 'PROACTIVE CHAT', event_name: 'CHAT BUTTON CLICKED' });
                }

            });

            document.getElementById('sf-live-chat').addEventListener('click', function() {
                embedded_svc.inviteAPI.inviteButton.acceptInvite();

                if (window.utag){
                    //Tealiun analytic code on click of the chat button
                    utag.link({ event_category: 'PROACTIVE CHAT', event_name: 'CHAT BUTTON CLICKED' });
                     //CRMSFI-9715 Changes Start
                   	var pageName=window.utag.data.filter_sport;		   
                     	var country =window.utag.data.country;
                        var brand   =window.utag.data.site_name;

					if(country == 'US'  && pageName =='RUNNING' && brand =='ADIDAS'){				    
						embedded_svc.settings.directToButtonRouting = function(page) {
							var page=getPageName(pageName);
							if(page =='RUNNING'){
								return embedded_svc.settings.fallbackRouting = ["5730O000000LJAI", "5730O000000LJAN"];
							}
						}
					 
						var buttonId=embedded_svc.settings.directToButtonRouting(pageName); 
													  
					
					}
                     //CRMSFI-9715 Changes End
                }

            });                               

        }

        function  getPageName(ob){
        
                var pagename='';
		for (index = 0; index < ob.length; index++)
			 { 
                           pagename=pagename+ob[index];
                         }
                 return  pagename;
	}

        function initSnapins(gslbBaseURL){

            console.log('init snapins');

            var offlineSupport = false;

            /*
            if ((buttonParams.chatType.toLowerCase() == "reactive chat") && (buttonParams.countryCode.toLowerCase() == 'gb')) {
                offlineSupport = true;
            }
            */

            embedded_svc.init(buttonParams.baseURL, buttonParams.siteURL, gslbBaseURL, buttonParams.organisationId, buttonParams.deploymentName,{baseLiveAgentContentURL: buttonParams.contentURL, deploymentId: buttonParams.deploymentId, buttonId: buttonParams.buttonId,baseLiveAgentURL: buttonParams.initURL, eswLiveAgentDevName: buttonParams.embeddedServiceLiveAgentId, isOfflineSupportEnabled: offlineSupport});

            if(eChat == true) {
                        snapinsEmailInvite();
                    }

        }

        function snapinsEmailInvite() {

            var max_attempts = 15;

            var snapins_timer = setInterval(function() {

                if((embedded_svc.hasOwnProperty("inviteAPI")) && (typeof embedded_svc.inviteAPI.inviteButton.acceptInvite !== "undefined")){
                            clearInterval(snapins_timer);
                            embedded_svc.inviteAPI.inviteButton.acceptInvite();
                }

                if (max_attempts <= 0) {
                    clearInterval(snapins_timer);
                }
                console.log("Attempt-"+max_attempts);
                max_attempts--;

            }, 300);
        }

    }

}());


//initiate the snapins widget
var sf_snapins_widget = new sf_snapinsWidgetModel();