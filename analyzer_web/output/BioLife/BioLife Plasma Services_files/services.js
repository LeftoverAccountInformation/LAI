var bdpAppServices = angular.module('bdpApp.services', []);

bdpAppServices.service('menuService', function ($http, $rootScope) {
	var menuService = {
			getCenterUpdateMessages: function(callback) {
				var errorCallback = function (data, status, headers, config) {
	                console.error(status + ' data = ' + data);
	            };
	            var successCallback = function (data, status, headers, config) {
	                if (data != 'null') {
	                    callback(data);
	                }
	            };
	            $http.get('resources/center/center-update-messages').success(successCallback).error(errorCallback);
			}
	}
    return menuService;
});
bdpAppServices.service('homeService', function ($http, $rootScope,$location,$window) {
    var homeService = {
        sitePromoImagesInfo: undefined,
        promotions: undefined,
        languages: undefined,
        getDonor: function (accountName, successCallback) {
            var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var endpoint = 'resources/donor/' + accountName;
            $http.get(endpoint).success(successCallback).error(errorCallback);
        },
        getStaff: function (accountName, successCallback) {
            var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var endpoint = 'resources/staff/' + accountName;
            $http.get(endpoint).success(successCallback).error(errorCallback);
        },
        loadSiteInfo: function () {
            $rootScope.doShowPromo = false; 
        	  
   	    	$rootScope.languageChanged = function(id,$location){
            	if(id !== $rootScope.currentLanguage){
            		$window.location = id.url;
            	}
            }
            
            var successCallback = function (siteInfoResponse) {
            	$rootScope.sliderImageInfoHolder = siteInfoResponse.sliderImageInfo;
            	$rootScope.mobileSliderImageInfoHolder = siteInfoResponse.mobileSliderPortraitImageInfo;
                $rootScope.mobileSliderPortraitImageInfoHolder = siteInfoResponse.mobileSliderPortraitImageInfo;
                $rootScope.mobileSliderLandscapeImageInfoHolder = siteInfoResponse.mobileSliderLandscapeImageInfo;
                
                $rootScope.placeholderArray = [];
                for (i = 0; i < 5; i++) {
                	$rootScope.placeholderArray.push({
                		appUrl: '',
                		savedFileName: ''
                	});
                }
                $rootScope.sliderImageInfo = $rootScope.placeholderArray;    
                $rootScope.mobileSliderImageInfo = $rootScope.placeholderArray;
                $rootScope.mobileSliderPortraitImageInfo = $rootScope.placeholderArray;
                $rootScope.mobileSliderLandscapeImageInfo = $rootScope.placeholderArray;
                
                //Mobile Portrait
                if($window.innerWidth < $window.innerHeight && $window.innerWidth <= 767) {
                	$rootScope.mobileSliderImageInfo = $rootScope.mobileSliderPortraitImageInfoHolder;
                //Mobile Landscape
                } else if ($window.innerWidth > $window.innerHeight && $window.innerWidth <= 767) {
                	$rootScope.mobileSliderImageInfo = $rootScope.mobileSliderLandscapeImageInfoHolder;
                //Desktop
                } else if ($window.innerWidth >= 767) {
                	$rootScope.sliderImageInfo = $rootScope.sliderImageInfoHolder;
                }
                
                $rootScope.siteInfoResponse = siteInfoResponse;
                //$rootScope.sliderImageInfo = siteInfoResponse.sliderImageInfo;
                //Defaulting mobileImages to Portrait size
                //$rootScope.mobileSliderImageInfo = siteInfoResponse.mobileSliderPortraitImageInfo;
                //$rootScope.mobileSliderPortraitImageInfo = siteInfoResponse.mobileSliderPortraitImageInfo;
                //$rootScope.mobileSliderLandscapeImageInfo = siteInfoResponse.mobileSliderLandscapeImageInfo;
                var sitePromoImagesInfo = [];
                $rootScope.sitePromoImagesInfo = [];
                siteInfoResponse.sitePromoImages.forEach(function (promotionSpot) {
                	if(promotionSpot.image.imageClassId === 5){
	                    var webServerPrefix = siteInfoResponse.webServerPrefix;
	                    var fullUrl = siteInfoResponse.webServerPrefix;
	                    fullUrl += '/site/promotion-spots/';
	                    fullUrl += promotionSpot.image.savedFileName;
	                    var imageInfo = {
	                        imageUrl: fullUrl,
	                        linkUrl: promotionSpot.url
	                    };
	                    sitePromoImagesInfo.push(imageInfo);
                	}
                });
                if (sitePromoImagesInfo.length >= 1) {
                    $rootScope.sitePromoImagesInfo = sitePromoImagesInfo;
                    homeService.sitePromoImagesInfo = sitePromoImagesInfo;
                }
                $rootScope.daysToSuppressSchedulingMessage = $rootScope.siteInfoResponse.daysToSuppressDeferralSchedulingMessage;
                $rootScope.shirePrivacyPolicyURL = $rootScope.siteInfoResponse.shirePrivacyPolicyURL;
                if ($rootScope.promotions === undefined) {
                	$rootScope.promotions = siteInfoResponse.promotions;
                }
                
                if($rootScope.languages === undefined){
                	$rootScope.languages = siteInfoResponse.languages;
                	$rootScope.isActive = 0;
                	for(var i=0; i< $rootScope.languages.length; i++){
                  	     if($rootScope.languages[i].active === "Y"){
                  	    	 $rootScope.isActive++;
                  	     }
                  	     if($rootScope.languages[i].url === $window.location.href || $window.location.href.indexOf($rootScope.languages[i].url) > -1){
                  	    	$rootScope.currentLanguage = $rootScope.languages[i];
                  	     }
                	} 
                } 
                  
                /*if ($rootScope.popUpPromotions !== undefined) {
                	var interval = $interval(function() {
    			    	var modalInstance = $modal.open({
    			    		templateUrl: 'html/donor/appointments/new-donor-checklist-modal.html',
    	                    controller: ['$scope', '$modalInstance', '$location', 'appointmentService', 'userService',
    	                    function ($scope, $modalInstance, $interval) {
    	                    	$scope.cancelInterval();
    	                    	
    	                        $scope.cancel = function () {	                        	
    	                            $modalInstance.dismiss('cancel');
    	                        };
    	                    } ],
    	                    backdrop: 'static',
    	                    scope: $scope
    	                });
    			    	}, 5000);
    			    
    			   $scope.cancelInterval = function() {
    				   $interval.cancel(interval);
    			   };                	
                }*/
            };

            $http.get('resources/site/info').success(successCallback);
        },
        overrideSitePromosWithCenterPromos: function (profileInfo) {
            var centerPromoImages = [];
            var centerId = profileInfo.center.id;
            var storedPromotionSpots = profileInfo.center.promotionSpots;
            storedPromotionSpots.forEach(function (promotionSpot) {
            	if(promotionSpot.image.imageClassId === 5){
	                var imageUrl = $rootScope.siteInfoResponse.webServerPrefix;
	                imageUrl += '/center-' + centerId;
	                imageUrl += '/promotion-spots/';
	                imageUrl += promotionSpot.image.savedFileName;
	                var centerPromoImageInfo = {
	                    imageUrl: imageUrl,
	                    linkUrl: promotionSpot.url
	                };
	                centerPromoImages.splice(promotionSpot.spotNumber - 4, 0, centerPromoImageInfo);
            	}
            });
            if (centerPromoImages.length >= 1) {
                $rootScope.sitePromoImagesInfo = centerPromoImages;
            }
        },
        resetSitePromoImages: function () {
        	this.loadSiteInfo();
        }
    };

    return homeService;
});

bdpAppServices.service('userService', function ($http, $rootScope, $location, $timeout, $modal, $window, homeService, profileService, staffProfileService, appointmentService, googleTagManagerService) {
	var promise;
	var sessionTimer;
	var userService = {
        loginResponse: undefined,
        login: function (login, successCallback, errorCallback) {
//        	  var windowTest = login;
          	var serviceSuccessCallback = function (loginResponse) {
              	/*if (loginResponse.demoLoginFlag) { 
              		// We need to encrypt the password some how and also look at the other application
              		// This needs to stay in the code             
              		//$window.location = "https://biolifeplasmastageext.wahapps.inbaxter.com/us-beta/#/betaLogin/?value=" + login.username + "-" + login.password;
              	} else {
                  userService.attemptLogin(loginResponse);
                  successCallback(loginResponse);
                }*/
          		userService.attemptLogin(loginResponse);
                successCallback(loginResponse);
              };
            var serviceErrorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errorCallback();
            };
            var endpoint = 'resources/security/login/';
            $http.post(endpoint, login).success(serviceSuccessCallback).error(serviceErrorCallback);
        },
        socialMediaFaceBookLogin: function (socialMediaLogin, LoginSuccessCallback, errorCallback) {
        	var serviceSuccessCallback = function (data, status, headers, config) { 
        		var socialMediaResponse = data;
	        	if(socialMediaResponse.loggingInFromSocialMedia === true) {
	        		if(socialMediaResponse.loginResponse.loginWithSocialMedia === true) {
	        			userService.attemptLogin(socialMediaResponse.loginResponse);
	              		LoginSuccessCallback(socialMediaResponse.loginResponse);
		        	}
        		} else {
        			errorCallback();
        		}
              };
            var serviceErrorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errorCallback();
            };
        $http.post('resources/security/socialMediaFaceBookLogin/', socialMediaLogin).success(serviceSuccessCallback).error(serviceErrorCallback);
        },
        socialMediaFaceBookRegister: function (socialMediaLogin, successCallback, errorCallback) {
        	var serviceSuccessCallback = function (data, status, headers, config) {         		
        		var socialMediaResponse = data;
        		if(socialMediaResponse.registeringFromSocialMedia === true) {
        			successCallback(socialMediaResponse.registrationResponse, "Facebook");
	        	} else {
	        		errorCallback();
	        	}
              };
            var serviceErrorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errorCallback();
            };
        $http.post('resources/security/socialMediaFaceBookLogin/', socialMediaLogin).success(serviceSuccessCallback).error(serviceErrorCallback);
        },
        socialMediaFacebookUsernamePromptWithRegistration: function (socialMediaLogin, RegistrationSuccessCallback, errorCallback) {
        	var serviceSuccessCallback = function (socialMediaResponse) {
        		if(socialMediaResponse.registrationResponse.registerForSocialMedia === true) {
        			userService.attemptLogin(socialMediaResponse.loginResponse);
        			RegistrationSuccessCallback(socialMediaResponse.registrationResponse);
        		}
              };
            var serviceErrorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errorCallback();
            };
        $http.post('resources/security/retrySocialMediaUserRegistrationPrompt/', socialMediaLogin).success(serviceSuccessCallback).error(serviceErrorCallback);
        },
        socialMediaGoogleLogin: function (socialMediaLogin, successCallback, errorCallback) {
        	var serviceSuccessCallback = function (data, status, headers, config) { 
        		var socialMediaResponse = data;
	        	if(socialMediaResponse.loggingInFromSocialMedia === true) {
	        		if(socialMediaResponse.loginResponse.loginWithSocialMedia === true) {
	        			userService.attemptLogin(socialMediaResponse.loginResponse);
	        			successCallback(socialMediaResponse.loginResponse);
		        	}
        		} else {
        			errorCallback();
        		}
            };
            var serviceErrorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errorCallback();
            };
        $http.post('resources/security/socialMediaGoogleLogin/', socialMediaLogin).success(serviceSuccessCallback).error(serviceErrorCallback);
        },
        socialMediaGoogleRegister: function (socialMediaLogin, successCallback, errorCallback) {
        	var serviceSuccessCallback = function (data, status, headers, config) { 
        		var socialMediaResponse = data;
        		if(socialMediaResponse.registeringFromSocialMedia === true) {
        			successCallback(socialMediaResponse.registrationResponse, "Google");
	        	} else {
	        		errorCallback();
	        	}
            };
            var serviceErrorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errorCallback();
            };
        $http.post('resources/security/socialMediaGoogleLogin/', socialMediaLogin).success(serviceSuccessCallback).error(serviceErrorCallback);
        },
        logout: function () {
            var serviceSuccessCallback = function (loginResponse) {
                // cleanup and reset
                userService.loginResponse = undefined;
                $rootScope.loginResponse = undefined;
                $rootScope.isLoggedIn = false;
                userService.loadRole();
                userService.additionalLogoutTasks();
                $timeout.cancel(promise);
                // finally route back to home
                $location.path('/');
            };
            var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var endpoint = 'resources/security/logout';
            $http.post(endpoint, {}).success(serviceSuccessCallback).error(errorCallback);
        },
        additionalLogoutTasks: function() {
            profileService.clearData();
            staffProfileService.clearData();
            appointmentService.clearData();
            homeService.resetSitePromoImages();
            googleTagManagerService.clearData();            
        },
        attemptLogin: function (loginResponse) {
            if (loginResponse.loggedIn) {
                userService.loginResponse = loginResponse; // capture a reference
                $rootScope.loginResponse = loginResponse;
                $rootScope.isLoggedIn = true;
                userService.loadRole();
                sessionTimer = userService.setTimeoutLength();
                $(document.body).bind('click', userService.resetTimer);
                $(document.body).bind('keydown', userService.resetTimer);
                userService.resetTimer(sessionTimer);
            }
        },
        setTimeoutLength: function () {
        	if (userService.isDonor()) {
            	sessionTimer = userService.loginResponse.donorTimeout;
            } else if (userService.isStaff()) {
            	sessionTimer = userService.loginResponse.staffTimeout;
            } else if (userService.isManager()) {
            	sessionTimer = userService.loginResponse.managerTimeout;
            } else if (userService.isAdmin()) {
            	sessionTimer = userService.loginResponse.sysAdminTimeout;
        	} else if (userService.isMarketing()) {
            	sessionTimer = userService.loginResponse.marketingTimeout;
            }
            return sessionTimer = sessionTimer - 5;
        },
        whenUserIdle: function () {
        	var modalInstance = $modal.open({
		    	  templateUrl: 'html/timeout-warning-modal.html',
		    	  controller: 'TimeoutWarningController'
		      });
        },
        resetTimer: function () {
        	if(userService.isLoggedIn()){
        		sessionTimer = userService.setTimeoutLength();
        		if (promise) {
					 $timeout.cancel(promise);
				 }
				 promise = $timeout(userService.whenUserIdle, sessionTimer * 60000);
        	}
        },
        isLoggedIn: function () {
            return this.loginResponse !== undefined && this.loginResponse.loggedIn === true;
        },
        isMarketing: function () {
            return this.isLoggedIn() && this.loginResponse.role === 'marketing'; // constant from Login.java
        },
        isStaff: function () {
            return this.isLoggedIn() && this.loginResponse.role === 'staff'; // constant from Login.java
        },
        isManager: function () {
            return this.isLoggedIn() && this.loginResponse.role === 'manager'; // constant from Login.java
        },
        isAdmin: function () {
            return this.isLoggedIn() && this.loginResponse.role === 'sysadmin'; // constant from Login.java
        },
        isDonor: function() {
            return this.isLoggedIn() && this.loginResponse.role === 'DONOR';
        },
        isSocialMediaDonor: function() {
            return this.isLoggedIn() && this.loginResponse.loginWithSocialMedia === true;
        },
        isNonDonor: function () {
            return this.isLoggedIn() && this.loginResponse.role !== 'DONOR'; // constant from Login.java
        },
        loadRole: function () {
            $rootScope.isStaff = this.isStaff();
            $rootScope.isMarketing = this.isMarketing();
            $rootScope.isManager = this.isManager();
            $rootScope.isAdmin = this.isAdmin();
            $rootScope.isDonor = this.isDonor();
            $rootScope.isNonDonor = this.isNonDonor();
            $rootScope.isSocialMediaDonor = this.isSocialMediaDonor();
        },
        loadLoginResponse: function () {
            // if the login response is not set then fetch it
            if (!this.loginResponse) {
                var parent = userService;
                var successCallback = function (loginResponse) {
                    // NOTE: this assignment could be a valid loginResponse object from the server or
                    //		could be undefined (null from the server) if the user did not login. But
                    //		the end state should be an indicator of whether/not the user is logged,
                    //		and update the client/UI accordingly
                    parent.loginResponse = loginResponse;
                    $rootScope.loginResponse = loginResponse;
                    parent.loadRole();
                    if (parent.isLoggedIn()) {
                        $rootScope.isLoggedIn = true;
                        userService.resetTimer();
                    }
                };
                var errorCallback = function (data, status, headers, config) {
                    console.error(status + ' data = ' + data);
                };
                $http.get('resources/security/loadLoginResponse').success(successCallback).error(errorCallback);
            }
        },
        loadLoginResponseAfterRegistration: function () {
            var parent = userService;
            var successCallback = function (loginResponse) {
                // NOTE: this assignment could be a valid loginResponse object from the server or
                //		could be undefined (null from the server) if the user did not login. But
                //		the end state should be an indicator of whether/not the user is logged,
                //		and update the client/UI accordingly
                parent.loginResponse = loginResponse;
                $rootScope.loginResponse = loginResponse;
            };
            var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            $http.get('resources/security/loadLoginResponse').success(successCallback).error(errorCallback);
        },
        getRegisterDonor: function (registrationRequest,callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                userService.attemptLogin(data.loginResponse);// test to delete?
            	callback(data);
        };
        $http.post('resources/donor/registration', registrationRequest).success(successCallBack).error(errorCallBack);
        },
        reSendRegistrationEmail: function (callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
            	callback(data);
        };
        $http.post('resources/donor/reSendRegistrationdEmail').success(successCallBack).error(errorCallBack);
        },
        loginDonorAfterRegistration: function (registrationRequest,callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                userService.attemptLogin(data.loginResponse);
            	callback(data);
        };
        $http.post('resources/donor/login-after-registration', registrationRequest).success(successCallBack).error(errorCallBack);
        },
        loginAfterForgotPassword: function (donorRequest,callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                userService.attemptLogin(data);
            	callback(data);
        };
        $http.post('resources/donor/login-after-forgot-password', donorRequest).success(successCallBack).error(errorCallBack);
        },                
    };
    return userService;
});

bdpAppServices.service('centerService', function ($http, $upload) {
    return {
        centers: undefined,
        centersWithAllInformation: undefined,
        centerEvents: undefined,
        centerEvent: undefined,
        centersByState: undefined,
        centersByStateLeftCol: undefined,
        centersByStateRightCol: undefined,
        centersForMarketing: undefined,
        getCenterMarketingMedia: function (successCallback) {
            var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var endpoint = 'resources/center/center-marketing-media';
            $http.get(endpoint).success(successCallback).error(errorCallback);
        },
        saveCenter: function (center)  {
            var errorCallBack = function (data, status, headers, config) {
            	console.log("Error during saveCenter service.js function");
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	console.log("Successful send of centerRequest");
                }
            };
            $http.post('resources/center', center).success(successCallBack).error(errorCallBack);
        },
        getHoursOfOperationsAdjustments : function(callback) {
        	var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            
            var successCallback = function (data, status, headers, config) {
                if (data != 'null') {
                	callback(data);
                }
            };
            var endpoint = 'resources/center/hours-of-operation-adj';
            $http.get(endpoint).success(successCallback).error(errorCallback);
        },
        saveHoursOfOperationsAdjustments : function(dto, callback) {
        	var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            
            var successCallback = function (data, status, headers, config) {
                if (data != 'null') {
                	callback(data);
                }
            };
            var endpoint = 'resources/center/hours-of-operation-adj';
            $http.post(endpoint, dto).success(successCallback).error(errorCallback);
        },
        deleteAdjustment : function(appointmentAdjId, callback) {
        	var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            
            var successCallback = function (data, status, headers, config) {
                if (data != 'null') {
                	callback(data);
                }
            };
            var endpoint = 'resources/center/delete-hours-of-operation-adj';
            $http.post(endpoint, {adjustmentId : appointmentAdjId}).success(successCallback).error(errorCallback);
        },
        modifyAdjustment : function(appointmentAdjId, callback) {
        	var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            
            var successCallback = function (data, status, headers, config) {
                if (data != 'null') {
                	callback(data);
                }
            };
            var endpoint = 'resources/center/modify-hours-of-operation-adj';
            $http.post(endpoint, {adjustmentId : appointmentAdjId}).success(successCallback).error(errorCallback);
        },
        saveAlias: function (alias, callback) {
            var errorCallBack = function (data, status, headers, config) {
            	 console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	callback(data);
                }
            };

            $http.post('resources/center/alias', alias).success(successCallBack).error(errorCallBack);
        },
        getHoursDropdowns : function() {
        	return {
        		minutes : ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 
        		           '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
 	            	        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
 	            	        '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', 
 	            	        '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', 
 	            	        '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
    	        hours : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    	        amPm :['AM', 'PM'] 
        	};
        },
        convertToMilitaryTime: function(input) {
        	if (input != null) {
				var retTime = (input.hours == 12) ? ((input.amPmMarker == 'AM') ? '00' : '12') : ((input.amPmMarker == 'AM') ? input.hours : (Number(input.hours)+12).toString());
				return retTime+''+input.minutes;
			} else {
				return undefined;
			}
		},
		convertToLegacyDisplayFormat: function(input) {
			if (input.hours != null && input.minutes != null && input.amPmMarker != null) {
				return input.hours + ":" + input.minutes + " " + input.amPmMarker;
			} else {
				return null;
			}
		},		
        saveCenterHoursAndLocation: function (centerHoursAndLocationRequest)  {
            var errorCallBack = function (data, status, headers, config) {
                //do something
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.post('center/saveCenterHoursAndLocation/', centerHoursAndLocationRequest).success(successCallBack).error(errorCallBack);
        },
        getCenterZipcodes: function (callback, centerId)  {
            var errorCallBack = function (data, status, headers, config) {
                //do something
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.get('resources/center/center-zipcodes/' + centerId).success(successCallBack).error(errorCallBack);
        },
        saveCenterZipcodes: function (callback, request)  {
            var errorCallBack = function (data, status, headers, config) {
                //do something
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.post('resources/center/center-zipcodes/', request).success(successCallBack).error(errorCallBack);
        },
        getStates: function (callback)  {
            var errorCallBack = function (data, status, headers, config) {
                console.error(data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.get('resources/center/state/').success(successCallBack).error(errorCallBack);
        },
        breakUpTimes : function(input) {
        	var blankTime = {
	        	hours : null,
	        	minutes : null,
	        	amPmMarker : null
	        };
        	
			if (!isNaN(Number(input))) { // expecting to start as a number string
    			input = input.toString();
	            if (input.length >= 3 && input.length <= 4) {
	                var hours = input.slice(0, input.length-2);
	                var minutes = input.substr(input.length-2, 2);
	                // am / pm string
	                var hoursNum = Number(hours);
	                if (hoursNum >= 13) {
	                    hours = (hours - 12).toString();
	                }
	                var amPmMarker = 'AM'; // init to AM
	                if (hoursNum >= 12) {
	                    amPmMarker = 'PM';
	                }
	
	                // build string
	                return {
	                	hours : hours,
	                	minutes : minutes,
	                	amPmMarker : amPmMarker
	                };
	            }
	            else {
    				return angular.copy(blankTime); 
    			}
			} else {
				return angular.copy(blankTime); 
			}
		},
        loadStatesAndCenters: function (successCallback) {
            var parent = this; // reference to this (centerService)
            if (this.centers) { // already have a cached copy
                successCallback(this.centers); // immediately call back
            } else { // else we need to load from server
                // wrap a hook around successCallback to set local cache
                var serviceSuccessCallback = function (statesAndCenters) {
                    parent.centers = restructureStatesAndCenters(statesAndCenters);
                    successCallback(parent.centers);
                };
                var errorCallback = function (data, status, headers, config) {
                    console.error(status + ' data = ' + data);
                };
                var endpoint = 'resources/donor/center';
                $http.get(endpoint).success(serviceSuccessCallback).error(errorCallback);
            }

            /*
             * This function translates the normalized data structure of states and centers
             *   (many centers within each state), into the structure specific for the
             *   typeahead UI
             */
            function restructureStatesAndCenters(centerSourceArray) {
                var centerArray = new Array();
                //Associative Array used to track adding each state to the center array only once
                var stateCheck = new Array();
                var sortedCenters = new Array();
                // loop through each state, then through its centers
                centerSourceArray.forEach(function (centerSource) {
                	if (typeof centerSource.state != 'undefined') {
                        if (!stateCheck[centerSource.state.code]) {
                        	if(sortedCenters.length > 0) {
                        		sortedCenters.sort(function (center1, center2) {
                        			  if (center1.name > center2.name) {
                        			    return 1;
                        			  }
                        			  if (center1.name < center2.name) {
                        			    return -1;
                        			  }
                        			  return 0;
                        		});
                        		sortedCenters.forEach(function (center) {
                        			centerArray.push(center);
                        		});
                        		sortedCenters = [];
                        	}
                            centerArray.push({
                                name: centerSource.state.description,
                                state: centerSource.state.description,
                                centerId: centerSource.id,
                                isState: true
                            });
                            stateCheck[centerSource.state.code] =  true;
                        }
                        sortedCenters.push({
                            name: centerSource.alias,
                            state: centerSource.state.description,
                            centerId: centerSource.id,
                            stateCode: centerSource.state.code,
                            consolidated: centerSource.consolidated,
                            fullCenterInfo: centerSource,
                            isState: false
                        });
                    }
                });
                if(sortedCenters.length > 0) {
            		sortedCenters.sort(function (center1, center2) {
            			  if (center1.name > center2.name) {
            			    return 1;
            			  }
            			  if (center1.name < center2.name) {
            			    return -1;
            			  }
            			  return 0;
            		});
            		sortedCenters.forEach(function (center) {
            			centerArray.push(center);
            		});
            	}                             
                return centerArray;
            }
        },
        loadStatesAndCentersWithAllInformation: function (successCallback) {
        	 var parent = this; // reference to this (centerService)
             /* if (this.centersWithAllInformation) { // already have a cached copy
                  successCallback(this.centersWithAllInformation); // immediately call back
              } else {*/ // else we need to load from server
                  // wrap a hook around successCallback to set local cache
                  var serviceSuccessCallback = function (statesAndCenters) {
                      parent.centersWithAllInformation = restructureStatesAndCenters(statesAndCenters);
                      successCallback(parent.centersWithAllInformation);
                  };
                  var errorCallback = function (data, status, headers, config) {
                      console.error(status + ' data = ' + data);
                  };
                  var endpoint = 'resources/center/centers-with-additional-info';
                  $http.get(endpoint).success(serviceSuccessCallback).error(errorCallback);
              //}

              /*
               * This function translates the normalized data structure of states and centers
               *   (many centers within each state), into the structure specific for the
               *   typeahead UI
               */
              function restructureStatesAndCenters(centerSourceArray) {
              	  var centerArray = new Array();
                  //Associative Array used to track adding each state to the center array only once
                  var stateCheck = new Array();
                  var sortedCenters = new Array();
                  // loop through each state, then through its centers
                  centerSourceArray.forEach(function (centerSource) {
                      if (typeof centerSource.state != 'undefined') {
                          if (!stateCheck[centerSource.state.code]) {
                          	if(sortedCenters.length > 0) {
                          		sortedCenters.sort(function (center1, center2) {
                          			  if (center1.alias > center2.alias) {
                          			    return 1;
                          			  }
                          			  if (center1.alias < center2.alias) {
                          			    return -1;
                          			  }
                          			  return 0;
                          		});
                          		sortedCenters.forEach(function (center) {
                          			centerArray.push(center);
                          		});
                          		sortedCenters = [];
                          	}
                              centerArray.push({
                                  name: centerSource.state.description,
                                  state: centerSource.state.description,
                                  centerId: centerSource.id,
                                  isState: true
                              });
                              stateCheck[centerSource.state.code] =  true;
                          }
                          sortedCenters.push(centerSource);
                      }
                  });
                  if(sortedCenters.length > 0) {
              		sortedCenters.sort(function (center1, center2) {
              			  if (center1.alias > center2.alias) {
              			    return 1;
              			  }
              			  if (center1.alias < center2.alias) {
              			    return -1;
              			  }
              			  return 0;
              		});
              		sortedCenters.forEach(function (center) {
              			centerArray.push(center);
              		});
              	}  
                  return centerArray;
              }
        },
        loadMarketingCenters: function(successCallback) {
        	var serviceSuccessCallback = function (statesAndCenters) {
                successCallback(statesAndCenters);
            };
            var errorCallback = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var endpoint = 'resources/center/centers-with-additional-info';
            $http.get(endpoint).success(serviceSuccessCallback).error(errorCallback);
        },
        loadDonationCenterInfo: function (centerId, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(data);
            };
            var successCallBack = function (data, status, headers, config) {
                // pass first instance back
                var centerObject = data.centerInfoById;
                callback(centerObject);
            };
            var endpoint = 'resources/center/donation-center/' + centerId;
            $http.get(endpoint).success(successCallBack).error(errorCallBack);
        },
        getSiteImages: function (successCallback) {
            $http.get('resources/image/site-images').success(successCallback);
        },
        getCenterImages: function (successCallback) {
            $http.get('resources/image/center-images').success(successCallback);
        },
        saveSitePromotionImage: function (newImage, successCallback) {
            var data = {
                spot: newImage.spot,
                applicationLinkUrl: newImage.link
            };
            var file = newImage.file;

            var endpoint = 'resources/image/site-promotion-spots';
            this.uploadImage(endpoint, data, file, successCallback);
        },
        removeSitePromotionImage: function (promotionSpot, successCallback) {
            var endpoint = 'resources/image/site-promotion-spots/remove';
            $http.post(endpoint, promotionSpot).success(successCallback);
        },
        saveCenterPromotionImage: function (newImage, successCallback) {
            var data = {
                spot: newImage.spot,
                applicationLinkUrl: newImage.link
            };
            var file = newImage.file;

            var endpoint = 'resources/image/center-promotion-spots';
            this.uploadImage(endpoint, data, file, successCallback);
        },
        removeCenterPromotionImage: function (promotionSpot, successCallback) {
            var endpoint = 'resources/image/center-promotion-spots/remove';
            $http.post(endpoint, promotionSpot).success(successCallback);
        },
        saveScheduleSetup: function(centerScheduleDTO, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/center/schedule', centerScheduleDTO).success(successCallBack).error(errorCallBack);
        },
        saveCenterImage: function (newImage, successCallback) {
            var data = {
                imageName: newImage.imageName
            };
            var file = newImage.file;

            var endpoint = 'resources/image/center-images';
            this.uploadImage(endpoint, data, file, successCallback);
        },
        removeCenterImage: function (centerImage, successCallback) {
            var endpoint = 'resources/image/center-images/remove';
            $http.post(endpoint, centerImage).success(successCallback);
        },
        uploadImage: function (endpoint, data, file, successCallback) {
            if (file.constructor === Array && file.length == 1) {
                file = file[0]; // reassign
            }
            $upload.upload({
                url: endpoint,
                method: 'POST',
                data: data,
                //fileFormDataName: data,
                file: file
            }).progress(function(evt) {
                
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                successCallback(data);
            });
        },
        getAllCenterEvents: function(successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.get('resources/center/center-events').success(successCallBack).error(errorCallBack);
        },
        saveCenterEvent: function(centerEventRequest, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/save-center-event', centerEventRequest).success(successCallBack).error(errorCallBack);
        },
        removeCenterEvent: function(centerEvent, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/remove-center-event', centerEvent).success(successCallBack).error(errorCallBack);
        },
        addCenterUpdateMessage: function(message, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/add-center-update-message', message).success(successCallBack).error(errorCallBack);
        },
        removeCenterUpdateMessage: function(message, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/remove-center-update-message', message).success(successCallBack).error(errorCallBack);
        },
        getCenterNewsMessageTypeDescriptions: function(successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.get('resources/center/center-news-message-type-descriptions').success(successCallBack).error(errorCallBack);
        },
        getCenterNewsMessages: function(successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.get('resources/center/center-news-messages').success(successCallBack).error(errorCallBack);
        },
        addCenterNewsMessage: function(message, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/add-center-news-message', message).success(successCallBack).error(errorCallBack);
        },
        removeCenterNewsMessage: function(message, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/remove-center-news-message', message).success(successCallBack).error(errorCallBack);
        },
        getAllCenterRelocations: function(successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.get('resources/center/center-relocations').success(successCallBack).error(errorCallBack);
        },
        saveCenterRelocation: function(centerRelocationRequest, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/save-center-relocation', centerRelocationRequest).success(successCallBack).error(errorCallBack);
        },
        removeCenterRelocation: function(centerRelocation, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/remove-center-relocation', centerRelocation).success(successCallBack).error(errorCallBack);
        },
        saveCenterOpeningDate: function(selectedCenter, successCallback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	successCallback(data);
                }
            };
            $http.post('resources/center/save-center-opening-date', selectedCenter).success(successCallBack).error(errorCallBack);
        },
        removeStatesFromArray: function(array) {
        	var parent = this;
        	parent.centersForMarketing = array;
        	angular.forEach(parent.centersForMarketing, function(index) {
				if (index.isState !== undefined && index.isState === true) {
					var arrIndex = parent.centersForMarketing.indexOf(index);
					parent.centersForMarketing.splice(arrIndex, 1);
				}
			})
			return parent.centersForMarketing;
		},
    };
});

bdpAppServices.service('profileService', ['$http', function ($http) {
    return {
        profile : undefined,
        citi : undefined,
        profileDropdowns : undefined,
        registrationCompleted : undefined,
        showPrivacyOptInModal : true,
        clearData: function() {
            this.profile = undefined;
            this.citi = undefined;
            this.showPrivacyOptInModal = true;
        },
        getProfile: function (callback, errCallBack) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
            	if(errCallBack !== undefined){
            		errCallBack();
            	}
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile = data;
                    callback(data);
                }
            };

            $http.get('resources/donor/').success(successCallBack).error(errorCallBack);
        },
        saveProfile: function (donor, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile = data;
                    callback(data);
                }
            };

            $http.post('resources/donor/', donor).success(successCallBack).error(errorCallBack);
        },
        saveDonorInformation: function (donor, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile = data;
                    callback(data);
                }
            };

            $http.post('resources/donor/', donor).success(successCallBack).error(errorCallBack);
        },
        saveKeepInformedFlag: function (callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/donor/keep-informed-flag').success(successCallBack).error(errorCallBack);
        },
        saveKeepInformedSmsFlag: function (callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/donor/keep-informed-sms-flag').success(successCallBack).error(errorCallBack);
        },
        saveLoginId: function (donor, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile.loginId = data.loginId;
                    self.profile.emailAddress = data.emailAddress;
                    callback(data);
                }
            };

            $http.post('resources/donor/login-update', donor).success(successCallBack).error(errorCallBack);
        },
        getProfileDropdowns: function (callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                	self.profileDropdowns = data;
                	callback(data);                   
                }
            };

            $http.get('resources/donor/options').success(successCallBack).error(errorCallBack);
        },
        getPromoOptions: function(centerId, callback) {
        	var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {                	
                    callback(data);
                }
            };

            $http.get('resources/donor/promos/'+centerId).success(successCallBack).error(errorCallBack);
        },
        savePromos: function(donorMarketingPromos, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile = data;
                    callback(data);
                }
            };

            $http.post('resources/donor/promos/', donorMarketingPromos).success(successCallBack).error(errorCallBack);
        },
        getAllCenters: function(callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.get('resources/donor/center').success(successCallBack).error(errorCallBack);
        },
        saveDonorCenter: function(donor, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile = data;
                    callback(data);
                }
            };

            $http.post('resources/donor/', donor).success(successCallBack).error(errorCallBack);
        },
        getDonorHomeData: function(callback, eCallback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
            	eCallback();
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.profile = data;
                    callback(data);
                }
            };

            if (self.profile === undefined) {
                $http.get('resources/donor/home').success(successCallBack).error(errorCallBack);
            } else {
                callback(self.profile);
            }
        },
        getDonorAppointments: function(callback) {
            //var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
                $http.get('resources/security/getRefreshDISAppointmentsAndDeferrals').success(successCallBack).error(errorCallBack);
        },
        getUpcomingAppointments: function(userType, callback) {
            //var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            var endpoint = 'resources/appointments/upcoming-appointments-list?user-type=' + userType;
            $http.get(endpoint).success(successCallBack).error(errorCallBack);
        },
        getNewTransactionInfo : function(dateFrom, dateTo, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            var formatCitiDate = function(date) {
                if (date instanceof Date) {
                    //Need to add 0's before single digit months / days and normalize month to 1-12 from 0-11
                    //Format is YYYYMMDD
                    var citiDate = date.getFullYear()+'';
                    citiDate += ((1+date.getMonth()) < 10) ? ('0'+(1+date.getMonth())) : (1+date.getMonth());
                    citiDate += (date.getDate() < 10) ? ('0'+date.getDate()) : date.getDate();
                    return citiDate;
                }
                //Zero corresponds to no preference on date in the API
                return 0;
            };

            var uriString = 'resources/donor/transaction/'+formatCitiDate(dateFrom)+'/'+formatCitiDate(dateTo)+'/';
            $http.get(uriString).success(successCallBack).error(errorCallBack);
        },
        getDebitInfo: function(callback, errCallback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
                errCallback();
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.citi = data;
                    callback(data);
                }
            };

            if (self.citi === undefined) {
                $http.get('resources/donor/debit/', {timeout: 10000}).success(successCallBack).error(errorCallBack);
            } else {
                callback(self.citi);
            }
        },
        forgotPasswordUpdate: function(loginIdObj, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/donor/forgotPasswordEmail', loginIdObj).success(successCallBack).error(errorCallBack);
        },
        emailResponseUpdate: function(id, guid, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.get('resources/donor/passwordResetEmailConf/'+id+'/'+guid+'/').success(successCallBack).error(errorCallBack);
        },
        saveNewPassword: function(passwordObj, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/donor/resetPasswordWizardStepTwo', passwordObj).success(successCallBack).error(errorCallBack);
        },
        resetPasswordDonor: function(passwordObj, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/donor/passwordReset', passwordObj).success(successCallBack).error(errorCallBack);
        },
        staffPasswordReset: function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.get('resources/donor/staffForgotPasswordEmail').success(successCallBack).error(errorCallBack);
        },
        staffUnlinkSocialMedia: function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.get('resources/donor/staff-unlink-social-media').success(successCallBack).error(errorCallBack);
        },
        notificationPreferencesUpdate: function(donorRequest, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.post('resources/donor/notification-preferences-update', donorRequest).success(successCallBack).error(errorCallBack);
        },
        notificationPreferencesLoad: function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };

            $http.get('resources/donor/get-notification-preferences').success(successCallBack).error(errorCallBack);
        },
        schedulePreferencesUpdate: function(donor, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.post('resources/donor/donor-schedule-preferences-update', donor).success(successCallBack).error(errorCallBack);
        },
        deleteDonorProfile : function(donor, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            $http.post('resources/donor/delete-profile', donor).success(successCallBack).error(errorCallBack);
        },
        updateDonorCenter : function(donor, callback) {
        	var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
            	if (data != null) {
            		self.profile = data.donor;
            		callback(data);
            	}
            };
            $http.post('resources/donor/donor-center-change', donor).success(successCallBack).error(errorCallBack);
        },
        staffUpdatedDonorCenter : function(donor, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
            	if (data != null) {            	
            		callback(data);
            	}
            };
            $http.post('resources/donor/donor-center-change-by-staff', donor).success(successCallBack).error(errorCallBack);
        },
        getDonorDisDeferral: function(pdn, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {                
                callback(data);                
            };            
            $http.post('resources/donor/donor-dis-deferral', pdn).success(successCallBack).error(errorCallBack);
        },
        getDonorId: function(loginId, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {                
                callback(data);                
            };            
            $http.post('resources/donor/donor-id', loginId).success(successCallBack).error(errorCallBack);
        },
        updatePrivacyPolicyOptInFlag: function(callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {                
                callback(data);                
            };            
            $http.post('resources/donor/privacy-policy-opt-in').success(successCallBack).error(errorCallBack);
        },
        getCentersFromDonorZip: function(zipCode, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {                
                callback(data);                
            };            
            $http.get('resources/center/center-zip/' + zipCode).success(successCallBack).error(errorCallBack);
        }
    };
} ]);

bdpAppServices.service('reportService', ['$http', function ($http) {
    return {
        apptByTypeReportResult: undefined,
        playroomReportResult: undefined,
        potentialDonorReportResult: undefined,
        donorOverrideReportResult: undefined,
        appointmentMadeByReportResult: undefined,
        potentialDonorSort:undefined,
        reportInfo: {
        	startDate : undefined,
        	endDate: undefined
        },
        runApptByTypeReport: function (reportRequest,callback) {
            var parent = this;
            parent.reportInfo.startDate = reportRequest.startDate;
            parent.reportInfo.endDate = reportRequest.endDate;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    parent.apptByTypeReportResult = data;
                    callback(data);
                }
            };
            $http.post('resources/report/appointment-by-type-report/', reportRequest).success(successCallBack).error(errorCallBack);
        },
        getApptByTypeReportResult: function () {
            var apptByTypeReportResult = this.apptByTypeReportResult;
            return apptByTypeReportResult;
        },
        runPlayroomReport: function (reportRequest,callback) {
            var parent = this;
            parent.reportInfo.startDate = reportRequest.startDate;
            parent.reportInfo.endDate = reportRequest.endDate;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    parent.playroomReportResult = data;
                    callback(data);
                }
            };
            $http.post('resources/report/playroom-report/', reportRequest).success(successCallBack).error(errorCallBack);
        },
        getPlayroomReportResult: function () {
            var playroomReportResult = this.playroomReportResult;
            return playroomReportResult;
        },
        runPotentialDonorReport: function (reportRequest,callback) {
            var parent = this;
            parent.reportInfo.startDate = reportRequest.startDate;
            parent.reportInfo.endDate = reportRequest.endDate;
            parent.potentialDonorSort = reportRequest.potentialDonorCriteria;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    parent.potentialDonorReportResult = data;
                    callback(data);
                }
            };
            $http.post('resources/report/potential-donor-report', reportRequest).success(successCallBack).error(errorCallBack);
        },
        getPotentialDonorReportResult: function () {
            var potentialDonorReportResult = this.potentialDonorReportResult;
            return potentialDonorReportResult;
        },
        runDonorOverRideReport: function (reportRequest, callback) {
            var parent = this;
            parent.reportInfo.startDate = reportRequest.startDate;
            parent.reportInfo.endDate = reportRequest.endDate;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    parent.donorOverrideReportResult = data;
                    callback(data);
                }
            };
            $http.post('resources/report/donor-override-report', reportRequest).success(successCallBack).error(errorCallBack);
        },
        getDonorOverrideReportResult: function () {
            var donorOverrideReportResult = this.donorOverrideReportResult;
            return donorOverrideReportResult;
        },
        runAppointmentMadeByReport: function (reportRequest, callback) {
            var parent = this;
            parent.reportInfo.startDate = reportRequest.startDate;
            parent.reportInfo.endDate = reportRequest.endDate;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    parent.appointmentMadeByReportResult = data;
                    callback(data);
                }
            };
            $http.post('resources/report/appointment-made-by-report', reportRequest).success(successCallBack).error(errorCallBack);
        },
        getAppointmentMadeByReportResult: function () {
            return this.appointmentMadeByReportResult;
        },
        
    }
} ]);

bdpAppServices.service('appointmentService', ['$http', '$window', 'googleTagManagerService', function ($http, $window, googleTagManagerService) {	
    return {
    	isLoadingTimeSlotData: false,
    	donorScheduleAppointmentResponse: undefined,
    	donorModifyAppointmentResponse: undefined,
    	staffModifyAppointmentResponse: undefined,
    	makeHomeLocation: false,
    	appointmentItem : {
			appointmentDateString : undefined,
			appointmentTypeId : undefined,
			appointmentTypeDescription : undefined,
			numberOfKids : 0,
			appointmentDateTime : "",
			chosenCenterId : 0
    	},
    	staffModifyAppointmentItem : {
    		appointmentDateString: "",
    		appointmentId : undefined,
    		appointmentTypeId : undefined,
    		donor : undefined,
    		displayTimeSlot : "",    		
    		numberOfKids : 0,
    		sourceView : "",
    		timeSlot : undefined,
    		appointmentCenterId : 0
    	},
    	calendarDate : undefined,
    	clearData: function(){
    		this.donorScheduleAppointmentResponse = undefined;
    		this.donorModifyAppointmentResponse = undefined;
    		this.appointmentItem = {
				appointmentDateString : undefined,
    			appointmentTypeId : undefined,
    			appointmentTypeDescription : undefined,
    			numberOfKids : 0,
    			appointmentDateTime : "",
    			chosenCenterId : 0
    		}
    		this.staffModifyAppointmentItem = {
				appointmentDateString: "",
	    		appointmentId : undefined,
	    		appointmentTypeId : undefined,
	    		donor : undefined,
	    		displayTimeSlot : "",    		
	    		numberOfKids : 0,
	    		sourceView : "",
	    		timeSlot : undefined,
	    		appointmentCenterId : 0
    		}
    		this.calendarDate = undefined;
    	},
        getAppointmentTimes: function(appointmentItem, userType, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                    //TODO: set appointmentItem here
                }
            };
            var endpoint = 'resources/appointments/appointment-time-slot?user-type=' + userType;
            $http.post(endpoint, appointmentItem).success(successCallBack).error(errorCallBack);
        },
        getAppointmentTypes : function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
        	
        	$http.get('resources/appointments/appointment-type').success(successCallBack).error(errorCallBack);
        },
        getAllAppointmentTypes : function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
        	
        	$http.get('resources/appointments/all-appointment-type').success(successCallBack).error(errorCallBack);
        },
        getScheduleNowCalendar : function(scheduleDto, userType, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };

            var endpoint = 'resources/appointments/schedule-now?user-type=' + userType;
        	$http.post(endpoint, scheduleDto).success(successCallBack).error(errorCallBack);
        },
        bookAppointment : function(donorScheduleAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {            	
            	callback(data);
            };
            
        	$http.post('resources/appointments/book-appointment-time-slot', donorScheduleAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        modifyAppointment : function(appointmentItem, callback) {
        	var self = this;
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/donorModifiedAppointment-initialization', appointmentItem).success(successCallBack).error(errorCallBack);
        },
        cancelAppointment : function(appointmentItem, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/cancel-appointment-time', appointmentItem).success(successCallBack).error(errorCallBack);
        },
        dsaValueChangedChildCareNo : function(donorScheduleAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dsa-value-changed-child-care-no', donorScheduleAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        dsaValueChangedChildren : function(donorScheduleAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dsa-value-changed-children', donorScheduleAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        dmaValueChangedChildCareNo : function(donorModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dma-value-changed-child-care-no', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        dmaValueChangedChildren : function(donorModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dma-value-changed-children', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        cancelRescheduledAppointmentTime : function(donorModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/cancel-rescheduled-appointment-time', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        rescheduledAppointmentTime : function(donorModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/rescheduled-appointment-time', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        dmaPreviousDayDetails : function(donorModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dma-previous-day-details', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        dmaNextDayDetails : function(donorModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dma-next-day-details', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        dma3DaySelectedDayDetails : function(donorModifyAppointmentResponse, userType, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/dma-3-day-selected-day-details', donorModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorInitialization : function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.get('resources/appointments/find-donor-initialize').success(successCallBack).error(errorCallBack);
        },
        findDonorScheduleSetup : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/find-donor-schedule-setup', donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorConfirmAppointment : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/find-donor-confirm-appointment', donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorOverRideDeferralOk : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/find-donor-over-ride-deferral-ok', donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorOverRideDeferralCancel : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/find-donor-cancel-making-override-deferral', donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorNeedToUsePlayRoom : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/find-donor-need-to-use-playRoom', donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorValueChangedChildren : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/find-donor-value-changed-children', donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        findDonorCheckScheduleAvailability : function(donorSearchCriteriaResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            var endpoint = 'resources/appointments/find-donor-check-schedule-availability';
        	$http.post(endpoint, donorSearchCriteriaResponse).success(successCallBack).error(errorCallBack);
        },
        scheduleQuickPhysical : function(quickPhysicalRequest, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/schedule-quick-physical', quickPhysicalRequest).success(successCallBack).error(errorCallBack);
        },
        getDonorDisAppointmentHistoryByPdn : function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.get('resources/appointments/get-donor-dis-appointment-history').success(successCallBack).error(errorCallBack);
        },
        getDonorDisLastAndNextPhysical : function(callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.get('resources/appointments/get-donor-dis-appointment-last-and-next-physical').success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentInitialization : function(appointmentItem, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-initialization', appointmentItem).success(successCallBack).error(errorCallBack);
        },
        staffModifyPreviousDayDetails : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-previous-day-details', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentNextDayDetails : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-next-day-details', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppoiontmentValueChangedChildcare : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-value-changed-childcare', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppoiontmentValueChangedChildren : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-value-changed-children', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentCancelAppointment : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-cancel-appointment', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppoiontmentResetNumberOfChildren : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-reset-number-of-children', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentChangeNumberOfChildren : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-change-number-of-children', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentUpdateNumberOfChildren : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-update-number-of-children', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifySelectionChanged : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-selection-changed', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentRescheduleAppointment : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-reschedule-appointment', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        staffModifyAppointmentSelectedDayDetails : function(staffModifyAppointmentResponse, callback) {
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
            	callback(data);
            };
            
        	$http.post('resources/appointments/staff-modify-appointment-selected-day-details', staffModifyAppointmentResponse).success(successCallBack).error(errorCallBack);
        },
        getSetupScheduleInfo: function(successCallback) {
            $http.get('resources/appointments/setup-schedule').success(successCallback);
        },
        saveScheduleSetup: function(centerScheduleDto, successCallback) {
            $http.post('resources/appointments/setup-schedule', centerScheduleDto).success(successCallback);
        },
        getAppointmentSetupInfo: function(successCallback) {
            $http.get('resources/appointments/setup/load').success(successCallback);
        },
        changeAppointmentType: function (dto, successCallback) {
            $http.post('resources/appointments/setup/appt-type-changed', dto).success(successCallback);
        },
        changePreviousDayDetails: function (dto, successCallback) {
            $http.post('resources/appointments/setup/previous-day-details', dto).success(successCallback);
        },
        changeNextDayDetails: function (dto, successCallback) {
            $http.post('resources/appointments/setup/next-day-details', dto).success(successCallback);
        },
        changeSelectedDayDetails: function (dto, successCallback) {
            $http.post('resources/appointments/setup/selected-day-details', dto).success(successCallback);
        },
        changeExcludeFromMassUpdate: function (dto, successCallback) {
            $http.post('resources/appointments/setup/exclude-from-mass-update', dto).success(successCallback);
        },
        changeSelectedTime: function (dto, successCallback) {
            $http.post('resources/appointments/setup/selected-time', dto).success(successCallback);
        },
        changeSelectBaseOrAdjustment: function (dto, successCallback) {
            $http.post('resources/appointments/setup/select-base-or-adjustment', dto).success(successCallback);
        },
        changeApplyToSelected: function (dto, successCallback) {
            $http.post('resources/appointments/setup/apply-to-selected', dto).success(successCallback);
        },
        changeMassUpdateChanged: function (dto, successCallback) {
            $http.post('resources/appointments/setup/mass-update-changed', dto).success(successCallback);
        },
        changeMassUpdateSetStartDate: function (dto, successCallback) {
            $http.post('resources/appointments/setup/mass-update-changed/set-start-date', dto).success(successCallback);
        },
        changeMassUpdateSetEndDate: function (dto, successCallback) {
            $http.post('resources/appointments/setup/mass-update-changed/set-end-date', dto).success(successCallback);
        },
        createTemplate: function (dto, successCallback) {
            $http.post('resources/appointments/setup/create-template', dto).success(successCallback);
        },
        loadTemplate: function (dto, successCallback) {
            $http.post('resources/appointments/setup/load-template', dto).success(successCallback);
        },
        deleteTemplate: function (dto, successCallback) {
            $http.post('resources/appointments/setup/delete-template', dto).success(successCallback);
        },
        save: function (dto, successCallback) {
            $http.post('resources/appointments/setup/save', dto).success(successCallback);
        },
        cancel: function (dto, successCallback) {
            $http.post('resources/appointments/setup/cancel-information', dto).success(successCallback);
        },
        loadAppointmentResponse: function(successCallback){
        	var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallback = function (data, status, headers, config) {
            	if(data !== null){
            		if(data.donorScheduleAppointmentResponse !== undefined){
            			appointmentService.donorScheduleAppointmentResponse = data.donorScheduleAppointmentResponse;
            		}
            		if(data.donorModifyAppointmentResponse !== undefined){
            			appointmentService.donorModifyAppointmentResponse = data.donorModifyAppointmentResponse;
            		}
            		if(data.appointmentItem !== undefined){
            			appointmentService.appointmentItem = data.appointmentItem;
            		}
            	}
            };          
        	$http.get('resources/security/loadAppointmentResponse').success(successCallback).error(errorCallBack);       	
        }
    };
} ]);

bdpAppServices.service('staffProfileService', ['$http',  'profileService', function ($http, profileService) {
    return {
        appUserCenterData : undefined,
        applicationUserList : undefined,
        searchDonor: undefined,
        selectedDonor: undefined,
        isGlobalSearch: false,
        isEmailSearch: false,
        clearData: function() {
            this.appUserCenterData = undefined;
            this.applicationUserList = undefined;
            this.searchDonor = undefined;
        },
        getProfile: function (callback) {
            var parent = this;
            var errorCallBack = function (data, status, headers, config) {
                //do something
            };
            var successCallBack = function (data, status, headers, config) {
                parent.applicationUserList = data;
                if (parent.applicationUserList != 'null') {
                    if (data.staff.length == 1) {
                        callback(data.staff[0]);
                    }
                }
            };
            $http.get('resources/staff/').success(successCallBack).error(errorCallBack);
        },
        getStaffHomeData: function(callback) {
            var self = this;
            var callCounter = 0;
            var errorCallBack = function (data, status, headers, config) {
            	console.error(status + ' data = ' + data);
            	if(callCounter < 2){
            		callCounter++;
            		$http.get('resources/staff/home').success(successCallBack).error(errorCallBack);
            	}
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.appUserCenterData = data;
                    callback(data);
                }
            };
            $http.get('resources/staff/home').success(successCallBack).error(errorCallBack);
        },
        addStaffMessage : function(staffMessageDescription, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    //This data has changed, so get the fresh data from the server
                    this.appUserCenterData = undefined;
                    callback(data);
                }
            };

            $http.post('resources/center/staff-message', staffMessageDescription).success(successCallBack).error(errorCallBack);
        },
        deleteStaffMessage : function(staffMessage, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    //This data has changed, so get the fresh data from the server
                    this.appUserCenterData = undefined;
                    callback(data);
                }
            };

            $http.post('resources/center/message/remove', staffMessage).success(successCallBack).error(errorCallBack);
        },
        addDonorMessage : function(donorMessageDescription, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    //This data has changed, so get the fresh data from the server
                    this.appUserCenterData = undefined;
                    callback(data);
                }
            };

            $http.post('resources/center/donor-message', donorMessageDescription).success(successCallBack).error(errorCallBack);
        },
        deleteDonorMessage : function(donorMessage, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    //This data has changed, so get the fresh data from the server
                    this.appUserCenterData = undefined;
                    callback(data);
                }
            };

            $http.post('resources/center/message/remove', donorMessage).success(successCallBack).error(errorCallBack);
        },
        addCenterMarketingPromotion : function(centerMarketingPromoDescription, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    //This data has changed, so get the fresh data from the server
                    this.appUserCenterData = undefined;
                    callback(data);
                }
            };

            $http.post('resources/center/save-center-marketing-promo', centerMarketingPromoDescription).success(successCallBack).error(errorCallBack);
        },
        deleteCenterMarketingPromotion : function(centerMarketingPromo, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    //This data has changed, so get the fresh data from the server
                    this.appUserCenterData = undefined;
                    callback(data);
                }
            };

            $http.post('resources/center/remove-center-marketing-promo', centerMarketingPromo).success(successCallBack).error(errorCallBack);
        },
        getSearchDonor: function (searchRequest,callback) {
            var parent = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    parent.searchDonor = data;
                    callback(data);
                }
            };
            $http.post('resources/center/search/', searchRequest).success(successCallBack).error(errorCallBack);
        },
        getAndClearSearchDonor: function () {
            var retval = this.searchDonor;
            profileService.clearData();
            // this.searchDonor = undefined; // clear out for next use
            return retval;
        },
        setSelectedDonor: function (donorSessionRequest, callback, donor) {
            var parent = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };

            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {                	
                    callback(data);
                }
            };

            if (donor) { // could be undefined if not passed
                this.selectedDonor = donor; // save off whole searched donor
            }

            $http.post('resources/security/donorSession/', donorSessionRequest).success(successCallBack).error(errorCallBack);
        },
        getSelectedDonor: function () {
            return this.selectedDonor;
        }
    };
} ]);

/*setSelectedDonor: function (donorSessionRequest,callback) {
	var parent = this;
    var errorCallBack = function (data, status, headers, config) {
        console.error(status + ' data = ' + data);
    };

    var successCallBack = function (data, status, headers, config) {
        if (data != 'null') {
        	parent.selectedDonor = data;
        	parent.searchDonorSelected();
            callback(data);
        }
    };

    $http.post('resources/security/donorSession/', donorSessionRequest).success(successCallBack).error(errorCallBack);
}
};
} ]);*/


bdpAppServices.service('calendarService', ['$http', function($http) {
	return {
		selectedDate : undefined,
		setDateSelection : function(dateIn) {
			this.selectedDate = dateIn;
		},
		getAndClearDateSelection: function() {
			var temp = this.selectedDate;
			this.selectedDate = undefined;
			return temp;
		},
		getTimeSlots : function(date, callback) {
			var errorCallBack = function (data, status, headers, config) {
				console.error(status + ' data = ' + data);
			};

			var successCallBack = function (data, status, headers, config) {
		        callback(data);
			};
			
			$http.post('resources/staff/appointment-one-day', { date : date }).success(successCallBack).error(errorCallBack);
		},
		getDonorViewTimeSlots : function(date, callback) {
			var errorCallBack = function (data, status, headers, config) {
				console.error(status + ' data = ' + data);
			};

			var successCallBack = function (data, status, headers, config) {
		        callback(data);
			};
			
			$http.post('resources/staff/appointment-donor', { date : date }).success(successCallBack).error(errorCallBack);
		},
		sendTimeSlotSelect: function(dto, callback) {
			var errorCallBack = function (data, status, headers, config) {
				console.error(status + ' data = ' + data);
			};

			var successCallBack = function (data, status, headers, config) {
		        callback(data);
			};
			
			$http.post('resources/staff/one-day-timeslot', dto).success(successCallBack).error(errorCallBack);
		},
		getSlotHeights: function (data) {
			var getDifferenceInMinutes = function(input1, input2) {
				input1 = input1+"";
				input2 = input2+"";
				if (input1.length >= 3 && input1.length <= 4 && input2.length >= 3 && input2.length <= 4) {
                    var hours1 = input1.slice(0, input1.length-2);
                    var minutes1 = input1.substr(input1.length-2, 2);

                    var hours2 = input2.slice(0, input2.length-2);
                    var minutes2 = input2.substr(input2.length-2, 2);

                    return (hours1*60+minutes1*1)-(hours2*60+minutes2*1);
				}
			}
			//Because the heights are not all uniform across each type, must calculate the height needed for each item
			//Also each type has a different amount of items, so each needs to be iterated over separately
			for (var i = 0; i < data.donations.length-1; i++) {
				var difference = getDifferenceInMinutes(data.donations[i+1].time, data.donations[i].time);
				data.donations[i].height = difference / data.interval;
			}
			
			for (var i = 0; i < data.physicals.length-1; i++) {
				var difference = getDifferenceInMinutes(data.physicals[i+1].time, data.physicals[i].time);
				data.physicals[i].height = difference / data.interval;
			}
			
			for (var i = 0; i < data.playrooms.length-1; i++) {
				var difference = getDifferenceInMinutes(data.playrooms[i+1].time, data.playrooms[i].time);
				data.playrooms[i].height = difference / data.interval;
			}
			
			return data;
		},
		getTimes : function( timeSlotData ) {
			var convertToDate = function(input) {
				input = input+"";
				if (input.length >= 3 && input.length <= 4) {
                    var hours = input.slice(0, input.length-2);
                    var minutes = input.substr(input.length-2, 2);
                    return new Date(0,0,0,hours,minutes);
				}
			}
			var earliestTime = (timeSlotData.donations[0].time <= timeSlotData.physicals[0].time) ? timeSlotData.donations[0].time : timeSlotData.physicals[0].time; 
			earliestTime = (earliestTime <= timeSlotData.playrooms[0].time) ? earliestTime : timeSlotData.playrooms[0].time;
			earliestTime = convertToDate(earliestTime);
			
			var lastTime = (timeSlotData.donations[timeSlotData.donations.length - 1].time >= timeSlotData.physicals[timeSlotData.physicals.length - 1].time) ? timeSlotData.donations[timeSlotData.donations.length - 1].time : timeSlotData.physicals[timeSlotData.physicals.length - 1].time; 
			lastTime = (lastTime >= timeSlotData.playrooms[timeSlotData.playrooms.length - 1].time) ? lastTime : timeSlotData.playrooms[timeSlotData.playrooms.length - 1].time;
			lastTime = convertToDate(lastTime);
			
			var times = [];
			var curTime = earliestTime;
			
			while (curTime <= lastTime) {
				times.push(angular.copy(curTime));
				curTime.setMinutes(curTime.getMinutes()+timeSlotData.interval);
			}
			
			return times;
		},
		deleteAppointment: function(appointmentId, callback) {
			var errorCallBack = function (data, status, headers, config) {
				console.error(status + ' data = ' + data);
			};

			var successCallBack = function (data, status, headers, config) {
		        callback(data);
			};
			
			$http.post('resources/staff/delete-appointment', { appointmentId : appointmentId }).success(successCallBack).error(errorCallBack);
		},
		deleteDonorAppointment: function(appointmentId, callback) {
			var errorCallBack = function (data, status, headers, config) {
				console.error(status + ' data = ' + data);
			};

			var successCallBack = function (data, status, headers, config) {
		        callback(data);
			};
			
			$http.post('resources/staff/delete-appointment-donor', { appointmentId : appointmentId }).success(successCallBack).error(errorCallBack);
		},
		getOneMonthCalendar: function(dto, callback) {
			var errorCallBack = function (data, status, headers, config) {
				console.error(status + ' data = ' + data);
			};

			var successCallBack = function (data, status, headers, config) {
		        callback(data);
			};
			
			$http.post('resources/staff/appointment-month', dto).success(successCallBack).error(errorCallBack);
		}
	};
} ]);


bdpAppServices.service('donorViewService', ['$http', function($http) {
	return {
		donationCenterTimes: undefined,
		appointments: undefined,
		getDonationCenterTimes: function(observedDate) {
			//MOCKED DATA
			var observedDate = new Date("2/3/2015 8:00 AM");
			var donationCenterTimes = [];
			for (var timeIncrement=-5; timeIncrement<=5; timeIncrement++) {
				var buildDate = new Date(observedDate.getTime() + timeIncrement*24*60*60*1000);
				for (var i=0; i<2; i++) {
					var appointmentType = "";
					switch(i) {
					case 0:
						appointmentType = "Donation";
						break;
					case 1:
						appointmentType = "Physical";
						break;
/*					case 2:
						appointmentType = "Playroom";
						break;*/
					}

					var time = new Date(buildDate.getTime());
					for (var j=0; j<30; j+=i+1) {
						time = new Date(buildDate.getTime() + j*5*60*1000); 
						donationCenterTimes.push({appointmentType:appointmentType, time:time, slotsAvailable:5});
					}
				}
			}
			//END MOCKED DATA
			this.donationCenterTimes = donationCenterTimes;
		},
		
		getAppointments: function(observedDate) {
			//MOCKED DATA
			var appointments = [];
			for (var timeIncrement=-5; timeIncrement<=5; timeIncrement++) {
				var buildDate = new Date(observedDate.getTime() + timeIncrement*24*60*60*1000);
				for (var i=0; i<2; i++) {
					var appointmentType = "";
					switch(i) {
					case 0:
						appointmentType = "Donation";
						break;
					case 1:
						appointmentType = "Physical";
						break;
					}

					var time = new Date(buildDate.getTime());
					for (var j=0; j<30; j+=i+1) {
						time = new Date(buildDate.getTime() + j*5*60*1000);

						var donorIds = [];
						for (var k=0; k<5; k++) {
							var number = Math.trunc(Math.random() * 5);
							if (number >= 3) {
								donorIds.push("John Doe " + Math.trunc(Math.random()*10000));
							}
						}

						appointments.push({donorIds:donorIds, time:time, appointmentType:appointmentType});
					}
				}
			}
			//END MOCKED DATA
			this.appointments = appointments;
		},

		//Add a Donation Appointment
		addDonationAppointment: function(viewDate){
			/*donorIds.push(Math.trunc(Math.random()*10000));*/
		},
		
		//Delete a Donation Appointment
		deleteDonationAppointment: function(viewDate, donationDonorId){
			/*donorIds.push(Math.trunc(Math.random()*10000));*/
		},
		
		//Add a Physical Appointment
		addPhysicalAppointment: function(viewDate){
		},
		
		//Delete a Physical Appointment
		deletePhysicalAppointment: function(viewDate, donationDonorId){
		},
		
		//Building out donationCenterAppointments by appending any donor ids to a donation center hour
		getDonationCenterAppointments: function(callback, viewDate) {		
			if(this.donationCenterTimes==undefined) {
				this.getDonationCenterTimes(viewDate);
			}
			
			if(this.appointments==undefined) {
				this.getAppointments(viewDate);
			}
			
			var donationCenterTimes = this.donationCenterTimes;
			var appointments = this.appointments;
			
			var donationCenterAppointments = [];
			
			for (var i=0; i<donationCenterTimes.length; i++) {
				if(donationCenterTimes[i].time.getFullYear()==viewDate.getFullYear() 
						&& donationCenterTimes[i].time.getMonth()==viewDate.getMonth() 
						&& donationCenterTimes[i].time.getDate()==viewDate.getDate()) {
					var donorIds = [];
					for (var j=0; j<appointments.length; j++) {
						if (appointments[j].time.getTime()==donationCenterTimes[i].time.getTime() && appointments[j].appointmentType == donationCenterTimes[i].appointmentType) {
							donorIds = appointments[j].donorIds;
							break;
						}
					}

					//Preparing variables for new object creation
					var totalSlots = donationCenterTimes[i].slotsAvailable;
					var scheduledSlots = donorIds.length;
					availableSlots = totalSlots - scheduledSlots;
					
					donationCenterAppointments.push(
							{
								time: donationCenterTimes[i].time, 
								appointmentType: donationCenterTimes[i].appointmentType,
								totalSlots: totalSlots,
								donorIds: donorIds,
								scheduledSlots: scheduledSlots,
								availableSlots: availableSlots,
								continuation: false,
								copyAppointment: function() {
									var appointment = {
											time: this.time,
											appointmentType: this.appointmentType,
											totalSlots: this.totalSlots,
											donorIds: this.donorIds,
											scheduledSlots: this.scheduledSlots,
											availableSlots: this.availableSlots,
											continuation: true,
											copyAppointment: this.copyAppointment
									};
									return appointment;
								}
							});
				}
			}
			callback(donationCenterAppointments);
		}
	};
} ]);

bdpAppServices.service('marketingService', ['$http', function ($http) {
    return {
    	newCenterId : undefined, 
        saveProfile: function (newCenterSetupRequest, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.newCenterId = data;
                    callback(data);
                }
            };

            $http.post('resources/center/add-new-center', newCenterSetupRequest).success(successCallBack).error(errorCallBack);
        },   
        savePromotion: function (newCenterSetupRequest, callback) {
            var self = this;
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    self.newCenterId = data;
                    callback(data);
                }
            };

            $http.post('resources/center/add-new-center', newCenterSetupRequest).success(successCallBack).error(errorCallBack);
        },
    }
} ]);

bdpAppServices.service('googleTagManagerService', ['$http', '$rootScope', '$location', '$window', '$document', '$interval', 'profileService', function ($http, $rootScope, $location, $window, $document, $interval, profileService) {		
	return {
		thirtyMinutesInMilliseconds: 30*60*1000,
		thirtyDaysInMilliseconds: 30*24*60*60*1000,
		visitID: undefined,
		userID: undefined,
		donorID: undefined,
		isInitialized: false,
		callQueue: [],
		clearData: function() {
			var self = this;
			self.donorID = undefined;
		},		
		executeQueuedEvents: function() {
			var self = this;
			angular.forEach(self.callQueue, function(callObject) {
				if(callObject.event === 'NewDonorRegistrationComplete') {
					callObject.VisitID = self.visitID;
					callObject.UserID = self.userID;
				}
				$window.dataLayer.push(callObject);
   				$window.dataLayer.splice(-1);			
       		});
			self.callQueue = [];
		},
		checkGTMInitialization: function() {
			var self = this;
			var isGTMInitialized = $interval(function() {
			    if($window.google_tag_manager !== undefined && $window.google_tag_manager.dataLayer !== undefined && $window.google_tag_manager.dataLayer.gtmDom && $window.google_tag_manager.dataLayer.gtmLoad && self.visitID !== undefined && self.userID !== undefined) {
			    	$interval.cancel(isGTMInitialized);
			    	self.isInitialized = true;
			    	self.executeQueuedEvents();				
			    }
			},250, 10);
		},
		generate4: function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); 
		},
		generateUUID: function () {
			var self = this;
			var UUID = (self.generate4() + self.generate4() + "-" + self.generate4() + "-" + self.generate4() + "-" + self.generate4() + "-" + self.generate4() + self.generate4() + self.generate4()).toLowerCase();
			return UUID;
        },
        create30MinuteCookie: function () {
        	var self = this;
            var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + self.thirtyMinutesInMilliseconds);
            var expires = "expires=" + expirationDate.toUTCString();
            self.visitID = self.generateUUID();
            $document[0].cookie = "visitID=" + self.visitID + "; " + expires + "; domain=" + $document[0].domain;            
        },
        create30DayCookie: function () {
        	var self = this;
        	var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + self.thirtyDaysInMilliseconds);
            var expires = "expires=" + expirationDate.toUTCString();
            self.userID = self.generateUUID();
            $document[0].cookie = "userID=" + self.userID + "; " + expires + "; domain=" + $document[0].domain;       
        },
        refresh30MinuteCookie: function () { 
        	var self = this;
        	var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + self.thirtyMinutesInMilliseconds);
            var expires = "expires=" + expirationDate.toUTCString();
            self.visitID = self.getCookieValue("visitID=");
            $document[0].cookie = "visitID=" + self.visitID + "; " + expires + "; domain=" + $document[0].domain;
        },
        refresh30DayCookie: function () {
        	var self = this;
        	var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + self.thirtyDaysInMilliseconds);
            var expires = "expires=" + expirationDate.toUTCString();
            self.userID = self.getCookieValue("userID=");
            $document[0].cookie = "userID=" + self.userID + "; " + expires + "; domain=" + $document[0].domain;
        },        
        getCookieValue: function (cookieName) {
            var cookieArray = $document[0].cookie.split(';');
            for(var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i];
                while (cookie.charAt(0) === ' ') {
                	cookie = cookie.substring(1);
                }
                if (cookie.indexOf(cookieName) == 0) {
                    var cookieValue = cookie.substring(cookieName.length, cookie.length);
                    return cookieValue;
                }
            }
            return undefined;
        },
		sendGeneralTrackingData: function () {
			var self = this;
			if(self.isInitialized) {
	        	if(self.donorID === undefined && profileService.profile !== undefined && profileService.profile.id !== undefined) {        		
	        		self.donorID = profileService.profile.id;
	        	} else if (self.donorID === undefined && profileService.profile !== undefined && profileService.profile.donor !== undefined && profileService.profile.donor.id !== undefined) {
	        		self.donorID = profileService.profile.donor.id;
	        	}         	
	        	$window.dataLayer.push({
	        		'VisitID': self.visitID,
	        		'UserID': self.userID,
	        		'DonorID': self.donorID,
	        		'AddressURL': $location.absUrl(),
	        		'event': 'angular_pageview'
	        	});
	        	$window.dataLayer.splice(-1);
			} else {				
				self.callQueue.push({
	        		'VisitID': self.visitID,
	        		'UserID': self.userID,
	        		'DonorID': self.donorID,
	        		'AddressURL': $location.absUrl(),
	        		'event': 'angular_pageview'
	        	});
				self.checkGTMInitialization();
			}
        },
        newDonorRegistrationSentEvent: function (donorID) {
        	var self = this;
        	$window.dataLayer.push({
        		'VisitID': self.visitID,
        		'UserID': self.userID,
        		'DonorID': donorID,
        		'AddressURL': $location.absUrl(),
        		'event': 'NewDonorRegistrationSent'
        	});
        	$window.dataLayer.splice(-1);
        },
        newDonorRegistrationCompleteEvent: function (donorID) {
        	var self = this;
        	if(self.initialized) {
	        	$window.dataLayer.push({
	        		'VisitID': self.visitID,
	        		'UserID': self.userID,
	        		'DonorID': donorID,
	        		'AddressURL': $location.absUrl(),
	        		'event': 'NewDonorRegistrationComplete'
	        	});
	        	$window.dataLayer.splice(-1);
        	} else {        	
        		self.callQueue.push({
	        		'VisitID': self.visitID,
	        		'UserID': self.userID,
	        		'DonorID': donorID,
	        		'AddressURL': $location.absUrl(),
	        		'event': 'NewDonorRegistrationComplete'
	        	});
        		self.checkGTMInitialization();
        	}
        },
        newDonorRegistrationCompleteAtCenterEvent: function (donorID) {
        	var self = this;
        	$window.dataLayer.push({
        		'VisitID': self.visitID,
        		'UserID': self.userID,
        		'DonorID': donorID,
        		'AddressURL': $location.absUrl(),
        		'event': 'NewDonorRegistrationComplete_AtCenter'
        	});
        	$window.dataLayer.splice(-1);
        },
        donorInfoCompleteEvent: function (donor) {
        	var self = this;
        	if(donor.state === undefined || donor.state.description === undefined || donor.country === undefined || donor.country.description === undefined) {
	        	$window.dataLayer.push({
	        		'VisitID': self.visitID,
	        		'UserID': self.userID,
	        		'DonorID': donor.id,
	        		'Country': undefined,
	        		'State': undefined,
	        		'Zip': donor.zipCode,
	        		'Birthdate': donor.dateOfBirthString,
	        		'AddressURL': $location.absUrl(),
	        		'event': 'DonorInfoComplete'
	        	});
        	} else {
        		$window.dataLayer.push({
	        		'VisitID': self.visitID,
	        		'UserID': self.userID,
	        		'DonorID': donor.id,
	        		'Country': donor.country.description,
	        		'State': donor.state.description,
	        		'Zip': donor.zipCode,
	        		'Birthdate': donor.dateOfBirthString,
	        		'AddressURL': $location.absUrl(),
	        		'event': 'DonorInfoComplete'
	        	});
        	}
        	$window.dataLayer.splice(-1);
        },
        donorCenterCompleteEvent: function (donor) {
        	var self = this;
        	$window.dataLayer.push({
        		'VisitID': self.visitID,
        		'UserID': self.userID,
        		'DonorID': donor.id,
        		'CenterID': donor.centerId,
        		'AddressURL': $location.absUrl(),
        		'event': 'DonorCenterComplete'
        	});
        	$window.dataLayer.splice(-1);
        },
        profileCompleteEvent: function (donor, mediaSelections) {
        	var self = this;
        	$window.dataLayer.push({
        		'VisitID': self.visitID,
        		'UserID': self.userID,
        		'DonorID': donor.id,
        		'Source': mediaSelections,
        		'AddressURL': $location.absUrl(),
        		'event': 'ProfileComplete'
        	});
        	$window.dataLayer.splice(-1);        	
        },
        successfulLoginEvent: function (donorID) {
        	var self = this;
        	self.donorID = donorID;        	
        	$window.dataLayer.push({
        		'VisitID': self.visitID,
        		'UserID': self.userID,
        		'DonorID': self.donorID,
        		'AddressURL': $location.absUrl(),
        		'event': 'SuccessfulLogin'
        	});
        	$window.dataLayer.splice(-1);
        },
        appointmentCreatedEvent: function (eventData) {
        	var self = this;
        	$window.dataLayer.push({
        		'VisitID': self.visitID,
        		'UserID': self.userID,
        		'DonorID': eventData.donorID,
        		'CenterID': eventData.centerID,
        		'ApptID': eventData.apptID,
        		'AddressURL': $location.absUrl(),
        		'event': 'AppointmentCreated'
        	});
        	$window.dataLayer.splice(-1);
        },
    };
}]);


bdpAppServices.service('salesforceInquiryService', ['$http', function ($http) {
    return {      
        contactUs: function (bioLifeContactUsInquiryRequest, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.post('resources/donor/contact-us/', bioLifeContactUsInquiryRequest).success(successCallBack).error(errorCallBack);
        },
        feedback: function (bioLifeFeedbackInquiryRequestObject, callback) {
            var errorCallBack = function (data, status, headers, config) {
                console.error(status + ' data = ' + data);
            };
            var successCallBack = function (data, status, headers, config) {
                if (data != 'null') {
                    callback(data);
                }
            };
            $http.post('resources/donor/feedback/', bioLifeFeedbackInquiryRequestObject).success(successCallBack).error(errorCallBack);
        }
    }
}]);

