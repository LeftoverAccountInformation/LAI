
    var bdpAppControllers = angular.module('bdpApp.controllers', [
        'ui.bootstrap',
        'ngResource', 
        'datatables',
        'bdpApp.services',
        'ui.utils',
        'ui.mask',
        'xeditable'
    ]);


    /* Fix for ui.bootstrap carousel error. See: http://www.tagwith.com/question_585403_using-ui-bootstrap-causing-issues-with-carousel  */
    angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
        .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
        }]).directive('carousel', [function() {
            return { }
        }]);

    bdpAppControllers.controller('HomeController', ['$rootScope', '$scope', '$location', '$window', '$timeout', 'homeService', function ($rootScope, $scope, $location, $window, $timeout, homeService) {	    
    	$scope.getDeviceOrientation = function () {
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
       };
       $scope.getDeviceOrientation();
       
       //Works on iOS and others
       angular.element($window).bind('orientationchange', function () {
    	   $scope.safeApply($scope.getDeviceOrientation);
       });
       
       //Works on Android
       angular.element($window).bind('resize', function () {
    	   $scope.safeApply($scope.getDeviceOrientation);
       });
       
       //Copy-Pasta Function below from here: https://coderwall.com/p/ngisma/safe-apply-in-angular-js
       $scope.safeApply = function(fn) {
    	   var phase = this.$root.$$phase;
    	   if(phase == '$apply' || phase == '$digest') {
    	     if(fn && (typeof(fn) === 'function')) {
    	       fn();
    	     }
    	   } else {
    	     this.$apply(fn);
    	   }
    	   /*if (this.$root.$$phase !== null) {
	    	   var phase = this.$root.$$phase;
	    	   if(phase == '$apply' || phase == '$digest') {
	    	     if(fn && (typeof(fn) === 'function')) {
	    	       fn();
	    	     }
	    	   } else {
	    	     this.$apply(fn);
	    	   }
    	   }*/
       };
	   	   
       $scope.printDonorInfo = function () {
           var successCallback = function (donor) {
               $scope.prettyDonorInfo = angular.toJson(donor, true);
           };
           homeService.getDonor($scope.accountName, successCallback);
       };
       $scope.clearDonorInfo = function () {
           $scope.prettyDonorInfo = undefined;
       };
       $scope.showDonationCenter = function (item, model, label) {
           $location.path('/donation-center').search({'centerId': item.centerId});
       };

       $scope.modalDisplay = function() {
       var modalInstance = $modal.open({
           templateUrl: 'html/video-modal.html',
           controller: ['$scope', '$sce', '$modalInstance', 'profileService', 
           function ($scope, $sce, $modalInstance, profileService) {
               
               $scope.url = "http://www.youtube.com/embed/gmtuQUSh78M?rel=0";
               $scope.vidUrl = $sce.trustAsResourceUrl($scope.url);
               //$scope.vidUrl = $sce.parseAsUrl($scope.url);
               $scope.cancel = function () {
                   $modalInstance.dismiss('cancel');
               };
           } ],
           backdrop: 'static'
       });           
           modalInstance.result.then(function (info) {
               //$scope.donorInfo = info;
               console.log("result then");
           });
       }
    }]);
    
	bdpAppControllers.controller('MenuPageController', ['$scope', '$route', '$location', '$modal', '$sce', 'menuService', 'centerService', function ($scope, $route, $location, $modal, $sce, menuService, centerService) {
		$scope.showCenterUpdates = false;
		$scope.noResults = false;
		$scope.noResultsMessage = "No center updates at this time.";
		$scope.messages = {};
	    // parse out elements for page
	    var current = $route.current;
	    $scope.title = current.title;
	    $scope.sectionTitle = current.sectionTitle;
	    // get the section path and the second slash index
	    var secondSlashIdx = current.originalPath.indexOf('/', 1);
	    var sectionPath = current.originalPath.substr(0, secondSlashIdx);
	    var section = current.originalPath.substr(1, secondSlashIdx-1);
	    // get the html page, or just the page part in the URL and suffix it with an .html extension
	    var pagePathAndFileName = current.originalPath.substr(secondSlashIdx);
	    var pageFileName = current.originalPath.substr(secondSlashIdx+1);
	    // build the full paths for the navigation rail and page content
	    $scope.navigationUrl = 'html/menus' + sectionPath + '/navigation-rail.html';
	    $scope.pageContentUrl = 'html/menus' + sectionPath + pagePathAndFileName + '.html';
	    // build stylistic variables
	    $scope.pageStyle = section;
	    $scope.pageFileName = pageFileName;
	    $scope.vidUrl;
	    $scope.centersByState = [];
	    $scope.centersByStateLeftCol = [];
	    $scope.centersByStateRightCol = [];
	    $scope.noCenterEvents = false;
	    
	  //Toggles for become-donor/eligibility
        $scope.showDonorEligibilty = false;
        $scope.showMedicalScreening = false;
        $scope.showDrugsMeds = false;
        $scope.showMedicalScreening = false;
        $scope.showMedicalConditions = false;
        $scope.showMedicalProcedures = false;
        $scope.showMiscellaneous = false;
        
        $scope.showDonorEligibiltyInfo = function(){
        	$scope.showDonorEligibilty = !($scope.showDonorEligibilty);
        };
        $scope.showDrugsMedsInfo = function(){
        	$scope.showDrugsMeds = !($scope.showDrugsMeds);
        };
        $scope.showMedicalScreeningInfo = function(){
        	$scope.showMedicalScreening = !($scope.showMedicalScreening);
        };
        $scope.showMedicalConditionsInfo = function(){
        	$scope.showMedicalConditions = !($scope.showMedicalConditions);
        };
        $scope.showMedicalProceduresInfo = function(){
        	$scope.showMedicalProcedures = !($scope.showMedicalProcedures);
        };
        $scope.showMiscellaneousInfo = function(){
        	$scope.showMiscellaneous = !($scope.showMiscellaneous);
        }; 
        
        //Toggles for become-donor/faqs
        $scope.showGetStarted = false;
        $scope.showDonationSafety = false;
        $scope.showDonationOften = false;
        $scope.showDonationTime = false;
        $scope.showPlasmaUsed = false;
        $scope.showPayment = false;
        $scope.showFindCenters = false;
        
        $scope.showGetStartedInfo = function(){
        	$scope.showGetStarted = !($scope.showGetStarted);
        };
        $scope.showDonationSafetyInfo = function(){
        	$scope.showDonationSafety = !($scope.showDonationSafety);
        };
        $scope.showDonationOftenInfo = function(){
        	$scope.showDonationOften = !($scope.showDonationOften);
        };
        $scope.showDonationTimeInfo = function(){
        	$scope.showDonationTime = !($scope.showDonationTime);
        };
        $scope.showPlasmaUsedInfo = function(){
        	$scope.showPlasmaUsed = !($scope.showPlasmaUsed);
        };
        $scope.showPaymentInfo = function(){
        	$scope.showPayment = !($scope.showPayment);
        };
        $scope.showFindCentersInfo = function(){
        	$scope.showFindCenters = !($scope.showFindCenters);
        }
        
        //become-donor/visa-debit-card
        $scope.showCard = false;
        $scope.showCredit = false;
        $scope.showRecieve = false;
        $scope.showWebsite = false;
        $scope.showWithdraw = false;
        $scope.showBank = false;
        $scope.showTransfer = false;
        $scope.showFee = false;
        $scope.showPurchase = false;
        $scope.showAddMoney = false;
        
        $scope.showCardInfo = function(){
        	$scope.showCard = !($scope.showCard);
        };
        $scope.showCreditInfo = function(){
        	$scope.showCredit = !($scope.showCredit);
        };
        $scope.showRecieveInfo = function(){
        	$scope.showRecieve = !($scope.showRecieve);
        };
        $scope.showWebsiteInfo = function(){
        	$scope.showWebsite = !($scope.showWebsite);
        };
        $scope.showWithdrawInfo = function(){
        	$scope.showWithdraw = !($scope.showWithdraw);
        };
        $scope.showBankInfo = function(){
        	$scope.showBank = !($scope.showBank);
        };
        $scope.showTransferInfo = function(){
        	$scope.showTransfer = !($scope.showTransfer);
        };
        $scope.showFeeInfo = function(){
        	$scope.showFee = !($scope.showFee);
        };
        $scope.showPurchaseInfo = function(){
        	$scope.showPurchase = !($scope.showPurchase);
        };
        $scope.showAddMoneyInfo = function(){
        	$scope.showAddMoney = !($scope.showAddMoney);
        };
        
        //Toggles for current-donor/faqs
        $scope.showBiolifeContact = false;
        $scope.showBloodPlasmaWaitTime = false;
        $scope.showBiolifeJob = false;
        $scope.showLogin = false;
        
        $scope.showBiolifeContactInfo = function(){
        	$scope.showBiolifeContact = !($scope.showBiolifeContact);
        };
        $scope.showBloodPlasmaWaitTimeInfo = function(){
        	$scope.showBloodPlasmaWaitTime = !($scope.showBloodPlasmaWaitTime);
        };
        $scope.showBiolifeJobInfo = function(){
        	$scope.showBiolifeJob = !($scope.showBiolifeJob);
        };
        $scope.showLoginInfo = function(){
        	$scope.showLogin = !($scope.showLogin);
        };
        //
        
        //Toggles for current-donor/visa-debit-card
        $scope.showAmount = false;
        $scope.showGas = false;
        $scope.showRestaurant = false;
        $scope.showReturn = false;
        $scope.showLost = false;
        $scope.showReplacement = false;
        $scope.showSMS = false;
        $scope.showDeclined = false;
        $scope.showBalance = false;
        $scope.showAccountFee = false;
        //New below for Wirecard Updates
        $scope.showPhoneNumber = false;
        $scope.showFees = false;
        $scope.showBalanceCheck = false;
        $scope.showNetworkATM = false;
        $scope.showPersonalAccount = false;
        
        $scope.showPhoneNumberInfo = function(){
        	$scope.showPhoneNumber = !($scope.showPhoneNumber);
        };
        
        $scope.showFeesInfo = function(){
        	$scope.showFees = !($scope.showFees);
        };
        
        $scope.showBalanceCheckInfo = function(){
        	$scope.showBalanceCheck = !($scope.showBalanceCheck);
        };
        
        $scope.showNetworkATMInfo = function(){
        	$scope.showNetworkATM = !($scope.showNetworkATM);
        };
        
        $scope.showPersonalAccountInfo = function(){
        	$scope.showPersonalAccount = !($scope.showPersonalAccount);
        };
        
        
        $scope.showAmountInfo = function(){
        	$scope.showAmount = !($scope.showAmount);
        };
        $scope.showGasInfo = function(){
        	$scope.showGas = !($scope.showGas);
        };
        $scope.showRestaurantInfo = function(){
        	$scope.showRestaurant = !($scope.showRestaurant);
        };
        $scope.showReturnInfo = function(){
        	$scope.showReturn = !($scope.showReturn);
        };
        $scope.showLostInfo = function(){
        	$scope.showLost = !($scope.showLost);
        };
        $scope.showReplacementInfo = function(){
        	$scope.showReplacement = !($scope.showReplacement);
        };
        $scope.showSMSInfo = function(){
        	$scope.showSMS = !($scope.showSMS);
        };
        $scope.showDeclinedInfo = function(){
        	$scope.showDeclined = !($scope.showDeclined);
        };
        $scope.showBalanceInfo = function(){
        	$scope.showBalance = !($scope.showBalance);
        };
        $scope.showAccountFeeInfo = function(){
        	$scope.showAccountFee = !($scope.showAccountFee);
        };
	    
	    $scope.videos = [
	        			"https://www.youtube.com/embed/b_nwWlZBSV4?rel=0",
	                    "https://www.youtube.com/embed/gmtuQUSh78M?rel=0",
	                    "https://www.youtube.com/embed/Z4ELrgS77QU?rel=0",
	                    "https://www.youtube.com/embed/Ns8H56tk7lU?rel=0",
	                    "https://www.youtube.com/embed/TLabpJ4TyeI?rel=0",
	                    "https://www.youtube.com/embed/Qf6a-pyKXDE?rel=0"
	    ];
	    
	    $scope.selectedVideo = function(number){
	    	angular.forEach($scope.videos, function (value, key) {
	    	    if(key === number){
	    	    	$scope.url = value;
	    	    	$scope.vidUrl = $sce.trustAsResourceUrl($scope.url);
	    	    	$scope.modalDisplay($scope.vidUrl);
	    	    }
	    	});      		
	    }
	    	
		$scope.modalDisplay = function(vidUrl) {
			var modalInstance = $modal.open({
	            templateUrl: 'html/video-modal.html',
	            controller: ['$scope', '$modalInstance', 'profileService',
	            function ($scope, $modalInstance, profileService) {
	            	$scope.vidUrl = vidUrl;
	                $scope.cancel = function () {
	                    $modalInstance.dismiss('cancel');
	                };
	            } ],
	            backdrop: 'static'
	        });           
	        modalInstance.result.then(function (info) {
	            //$scope.donorInfo = info;
	            console.log("result then");
	        });
		}	    
	    
	    /*Important Center Updates Code Begin */
		var centerUpdateMessagesCallback = function(data) {
        	if (data.length > 0) {
        		$scope.messages = data;
        	} else {
        		$scope.noResults = true;
        	}
        }
        
        if ($location.path() === '/about-biolife/important-center-updates') {
        	$scope.showCenterUpdates = true;
        	menuService.getCenterUpdateMessages(centerUpdateMessagesCallback);
        }
	    /*Important Center Updates Code End */
	    
	    $scope.loadCenterPage = function(centerId){
	    	$location.path('/donation-center').search({'centerId': centerId});
	    };
	    
	    $scope.compute3MonthsAfterOpenDate = function(date){
	    	return date + (3 * 2592000000);
	    }
	    
	    /*Begin our-centers code */
        var centersSuccessCallback = function(data){
        	$scope.centersByState = [];
	    	var state;
	    	var stateName = undefined;
	    	var centers = [];
	    	var midpoint;
	    	var stateAndCentersObj = {
	        		state: undefined,
	        		centers : undefined
	        }
	    	//Sort centers by state
	    	for (var i = 0; i < data.length; i++){
	    		if (data[i].isState === true && data[i].name !== stateName){
	    			if(stateName !== undefined){
	    					centers.sort();
	    					stateAndCentersObj = {state : state, centers: centers};
	    					stateAndCentersObj.state.name = stateAndCentersObj.state.name.replace(' ', '');
	    					$scope.centersByState.push(stateAndCentersObj);
	    					centers = [];  					
	    			}
	    			state = data[i];
	    			stateName = state.name;
	    		}else {
		    		if (data[i].isState === undefined && data[i].state.description === stateName){
		    			centers.push(data[i]);
		    		}
	    		}
	    	}
	    	stateAndCentersObj = {state : state, centers: centers};
			$scope.centersByState.push(stateAndCentersObj);
			
			//Set center.openingDate for each center to epoch time for determining what to show in view using ng-if's
			for(var i = 0; i < $scope.centersByState.length; i++) {
				for(var j = 0; j < $scope.centersByState[i].centers.length; j++){
					if($scope.centersByState[i].centers[j].openingDate !== undefined) { 
						var momentDate = moment($scope.centersByState[i].centers[j].openingDate).format('LL');
						var date = new Date($scope.centersByState[i].centers[j].openingDate).getTime();
						$scope.centersByState[i].centers[j].openingDate = {jsDate:date, momentJSDate: momentDate};
					}
					if($scope.centersByState[i].centers[j].centerRelocations[0] !== undefined){
						var momentReloDate = moment($scope.centersByState[i].centers[j].centerRelocations[0].relocationDate).format('LL');
						var reloDate = new Date($scope.centersByState[i].centers[j].centerRelocations[0].relocationDate).getTime();
						$scope.centersByState[i].centers[j].centerRelocations[0].relocationDate = {jsReloDate:reloDate, momentReloDate: momentReloDate};

					}
				}
			}
			
			//Break the list of states with centers up into two rows that will be used for display
	    	var arrLength =  $scope.centersByState.length;
	    	if(arrLength % 2 === 0){
	    		midpoint = arrLength / 2;
	    		for (var i = 0; i < arrLength; i++){
	    			if(i < midpoint){
	    				$scope.centersByStateLeftCol.push($scope.centersByState[i]);
	    			}else{
	    				$scope.centersByStateRightCol.push($scope.centersByState[i]);
	    			}
	    		}
	    	}else{
	    		midpoint = Math.ceil(arrLength / 2);
	    		for (var i = 0; i < arrLength; i++){
	    			if(i <= midpoint){
	    				$scope.centersByStateLeftCol.push($scope.centersByState[i]);
	    			}else{
	    				$scope.centersByStateRightCol.push($scope.centersByState[i]);
	    			}
	    		}		
	    	}
	    	centerService.centersByStateLeftCol = $scope.centersByStateLeftCol;
	    	centerService.centersByStateRightCol = $scope.centersByStateRightCol;
	    	centerService.centersByState = $scope.centersByState;
	    }
        
        if ($location.path() === '/about-biolife/our-centers') {
	    	moment.locale('en', {
			    longDateFormat : {
			        LT: "h:mmA",
			        LTS: "h:mm:ss A",
			        L: "MM/DD/YYYY",
			        LL: "MMMM Do YYYY",
			        LLL: "MMM Do LT",
			        LLLL: "dddd, MMMM Do YYYY LT"
			    }
			})
	    	$scope.centersWithOpeningInfo = [];
	    	$scope.today = new Date().setHours(0, 0, 0, 0);
	    	$scope.today = new Date($scope.today).getTime();
	    	centerService.loadStatesAndCentersWithAllInformation(centersSuccessCallback);
	    	/*
			 * if(centerService.centersWithAllInformation === undefined){
			 * centerService.loadStatesAndCentersWithAllInformation(centersSuccessCallback);
			 * }else if($scope.centersByStateLeftCol === undefined ||
			 * $scope.centersByStateRightCol === undefined ||
			 * $scope.centersByState === undefined) {
			 * centersSuccessCallback(centerService.centersWithAllInformation); }
			 * else { $scope.centersByStateLeftCol =
			 * centerService.centersByStateLeftCol;
			 * $scope.centersByStateRightCol =
			 * centerService.centersByStateRightCol; $scope.centersByState =
			 * centerService.centersByState; }
			 */
	    }
        /*End our-centers code*/
	    
	    /*Begin center-events code*/
        var centerEventSuccessCallback = function(data){
	    	$scope.event;
	    	$scope.eventInfo = {
    			centers : [],
    			event : undefined,
	    	}
	    	$scope.events = [];
	    	$scope.centerIdsUsed = [];
	    	var index = 0;
	    	if(data.centerEvents !== undefined) {
	    		var length = data.centerEvents.length;	    		
	    		if(length > 0) {
	    			for(var i = 0; i < data.centerEvents.length; i++) {
	    				//Array holding each event object for a given event
	    				var event = [];
	    				var centerEventId = data.centerEvents[i].centerEventId;	    				
	    				//Have not saved these events yet.
	    				if($scope.centerIdsUsed.indexOf(centerEventId) === -1){    					
		    				event.push(data.centerEvents[i]);
		    				for(var j = 0; j < data.centerEvents.length; j++){
		    					if ((data.centerEvents[j].centerEventId === centerEventId) && (i !== j)){
		    						event.push(data.centerEvents[j]);
		    					}
		    				}	    				
	    				$scope.events.push(event);
	    				$scope.centerIdsUsed.push(centerEventId);
	    				}
	    			}
		    		$scope.centerEvents = $scope.structureEventsIntoRows($scope.events);
		    		centerService.centerEvents = $scope.centerEvents;
	    		} else {
	    			if(length === 0) {	    		
	    				$scope.noCenterEvents = true;
	    			}
	    		}
	    	}
	    };
	    
	    $scope.structureEventsIntoRows = function(array){
			var groupedArray = [];
			var groupBySize = 3;
			for (var i = 0; i < array.length; i += groupBySize) {
				groupedArray.push(array.slice(i, i + groupBySize));
			}
			return groupedArray;
	    };
	    
	    $scope.loadEventPage = function(event){
	    	centerService.centerEvent = event;
	    	$location.path('/center-event').search({'id': event.id});
	    };
	    
	    if($location.path() === '/about-biolife/upcoming-events') {
	    	/*
			 * if(centerService.centerEvents === undefined){
			 * centerService.getAllCenterEvents(centerEventSuccessCallback);
			 * }else{ $scope.centerEvents = centerService.centerEvents; }
			 */
	    	centerService.getAllCenterEvents(centerEventSuccessCallback);
	    }
	    /*End center-events code*/
	    
	    /*Begin new-centers code*/
	    if($location.path() === '/about-biolife/new-centers') {
			moment.locale('en', {
			    longDateFormat : {
			        LT: "h:mmA",
			        LTS: "h:mm:ss A",
			        L: "MM/DD/YYYY",
			        LL: "MMMM Do YYYY",
			        LLL: "MMM Do LT",
			        LLLL: "dddd, MMMM Do YYYY LT"
			    }
			})
	    	$scope.centersWithOpeningInfo = [];
	    	$scope.today = new Date().setHours(0, 0, 0, 0);
	    	$scope.today = new Date($scope.today).getTime();
	    	var newCentersSuccessCallback = function(data) {
				if(data !== null){
					centerService.centersForMarketing = centerService.removeStatesFromArray(data);
					$scope.centers = centerService.centersForMarketing;
					var length = $scope.centers.length;
					for(var i = 0; i < length; i++) {
						var openingDate;
						var center = $scope.centers[i];
						if(center.openingDate === undefined || center.openingDate === null) {
							openingDate = undefined;
							$scope.centersWithOpeningInfo.push({center: center, openingDate: openingDate, threeMonthsAfterOpening: undefined, momentDate: undefined});
						} else {
							var momentDate = moment(center.openingDate).format('LL');
							openingDate = new Date(center.openingDate).getTime();
							var threeMonthsAfterOpening = openingDate + (3 * 2592000000);// 2592000000
																							// is
																							// 30
																							// days.
																							// Setting
																							// it
																							// to
																							// 90
																							// days
																							// after
																							// opening
							if((openingDate >= $scope.today) || ($scope.today <= threeMonthsAfterOpening)) {
								$scope.centersWithOpeningInfo.push({center: center, openingDate: openingDate, threeMonthsAfterOpening: threeMonthsAfterOpening, momentDate: momentDate});								
							}			
						}
						/*
						 * if(center.centerRelocations.length > 0) { var
						 * momentReloDate =
						 * moment(center.centerRelocations[0].relocationDate).format('LL');
						 * reloDate = new
						 * Date(center.centerRelocations[0].relocationDate).getTime();
						 * var threeMonthsAfterRelo = reloDate + (3 *
						 * 2592000000); if((reloDate >= $scope.today) ||
						 * ($scope.today <= threeMonthsAfterRelo)) {
						 * $scope.centersWithOpeningInfo.push({center: center,
						 * reloDate: reloDate, threeMonthsAfterRelo:
						 * threeMonthsAfterRelo, momentReloDate:
						 * momentReloDate}); } }
						 */
					}
					centerService.centersForMarketing = $scope.centersWithOpeningInfo;
				}
			}
	    	centerService.loadMarketingCenters(newCentersSuccessCallback);
	    	/*
			 * if(centerService.centersForMarketing === undefined) {
			 * centerService.loadMarketingCenters(newCentersSuccessCallback); }
			 * else { $scope.centersWithOpeningInfo =
			 * centerService.centersForMarketing; }
			 */
	    }
	    /*End new-centers code*/
	}]);

	bdpAppControllers.controller('CenterEventController', ['$scope', '$location', 'staffProfileService', 'centerService', 'homeService', function ($scope, $location, staffProfileService, centerService, homeService) {
		$scope.eventId = $location.search()['id'];
		$scope.noTime = "12:00AM";
		$scope.event;
		
		/*
		 * THESE ARE STANDARD FORMATS FROM MOMENT.JS WITH SLIGHT MODIFICATION. I
		 * HAVE CHANGED LL TO BE A DATE STRING, AND LT TO BE A TIME STRING.
		 * THESE CHANGES ALLOW FOR EASY MODIFICATION BASED ON THE NEEDS OF
		 * CENTER EVENTS PAGES. I USE THE STRINGS CREATED TO DETERMINE WHAT DATA
		 * NEEDS TO BE SHOWN TO THE CLIENT.
		 */
		moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
		        LTS: "h:mm:ss A",
		        L: "MM/DD/YYYY",
		        LL: "MMM Do",
		        LLL: "MMM Do LT",
		        LLLL: "dddd, MMMM Do YYYY LT"
		    }
		});
		$scope.navigationUrl = 'html/menus/about-biolife/navigation-rail.html';
		
		var prepareCenterEventDatesandTimes = function(event) {
			if(event[0].eventStartDatetime !== undefined) {
	    		$scope.startDate = new moment(event[0].eventStartDatetime).format('LL');
	    		$scope.startTime = new moment(event[0].eventStartDatetime).format('LT');
			} else {
				$scope.startDate = undefined;
	    		$scope.startTime = undefined;
			}
			if(event[0].eventEndDatetime !== undefined) {
				$scope.endDate = new moment(event[0].eventEndDatetime).format('LL');
				$scope.endTime = new moment(event[0].eventEndDatetime).format('LT');
			} else {
				$scope.endDate = undefined;
				$scope.endTime = undefined;
			}
			//Check to format for when only startDate is defined.
			if($scope.startDate !== undefined && $scope.startTime !== undefined && $scope.endDate === undefined && $scope.endTime === undefined) {
				if($scope.startTime === $scope.noTime) {
					$scope.startTime = undefined;
				}
			} 
			//Check to format for when startDate and endDate are defined.
			if($scope.startDate !== undefined && $scope.startTime !== undefined && $scope.endDate !== undefined && $scope.endTime !== undefined) {
				if($scope.startDate === $scope.endDate) {
					$scope.endDate = undefined;
				}
				if($scope.startTime === $scope.endTime) {
					$scope.endTime = undefined;
				}
				if($scope.startTime === $scope.noTime){
					$scope.startTime = undefined;
				}
				if($scope.endTime !== undefined && $scope.endTime === $scope.noTime){
					$scope.endTime = undefined;
				}
			}
		};
		
		var centerEventSuccessCallback = function(data){
			if(data.centerEvents !== undefined) {
				for(var i = 0; i < data.centerEvents.length; i++){
					if(data.centerEvents[i].id + "" === $scope.eventId){
						$scope.event = data.centerEvents[i];
					}
				}
				prepareCenterEventDatesandTimes($scope.event);
			}
		};
		
		if(centerService.centerEvent === undefined) {
			centerService.getAllCenterEvents(centerEventSuccessCallback);
		} else { 
			$scope.event = centerService.centerEvent;
			prepareCenterEventDatesandTimes($scope.event);
		}
	}]);
    
    bdpAppControllers.controller('CenterSetupController', ['$scope', '$location', 'staffProfileService', 'centerService', 'homeService', function ($scope, $location, staffProfileService, centerService, homeService) {
    	$scope.isAddStaffMessage = false;
    	$scope.isAddDonorMessage = false;
    	$scope.isCenterMarketingPromo = false;
    	$scope.newImage = {};
		$scope.newPromotionImage = {};
		$scope.showPromoImgSizeMessage = false;
		$scope.showCenterImgSizeMessage = false;
		
		var staffHomeDataCallback = function(data) {
			homeService.overrideSitePromosWithCenterPromos(staffProfileService.appUserCenterData);
		};
		
		//TODO: Compare this callback to the equivalent in P1
		var loadCenterImagesCallback = function (imageResponse) {
			$scope.centerImages = imageResponse.centerImages;
			$scope.centerPromoImages = imageResponse.centerPromoImages;
			$scope.centerPromoAvailableSpots = imageResponse.centerPromoAvailableSpots;
			$scope.isLoadingPromoData = false;
			$scope.isLoadingImageData = false;
			for(var i = 0; i < $scope.centerPromoImages.length; i++){
				if ($scope.centerPromoImages[i].spotNumber === 4){
					$scope.centerPromoAvailableSpots.splice($scope.centerPromoAvailableSpots.indexOf(1) ,1);
				}
				if ($scope.centerPromoImages[i].spotNumber === 5){
					$scope.centerPromoAvailableSpots.splice($scope.centerPromoAvailableSpots.indexOf(2) ,1);
				}
				if ($scope.centerPromoImages[i].spotNumber === 6){
					$scope.centerPromoAvailableSpots.splice($scope.centerPromoAvailableSpots.indexOf(3) ,1);
				}
			}		
			if (staffProfileService.appUserCenterData !== undefined) {
			    homeService.overrideSitePromosWithCenterPromos(staffProfileService.appUserCenterData);
			} else {
				staffProfileService.getStaffHomeData(staffHomeDataCallback);
			}
		};
		$scope.isLoadingPromoData = true;
		$scope.isLoadingImageData = true;
		centerService.getCenterImages(loadCenterImagesCallback);

		$scope.saveCenterPromotionImage = function () {
			$scope.showPromoImgSizeMessage = false;
			var successCallback = function () {
				centerService.getCenterImages(loadCenterImagesCallback);
				$scope.newPromotionImage = {};
			};
			var homeDataCallback = function(data){
				if(data.imageUploadSizeUnAcceptable !== undefined && data.imageUploadSizeUnAcceptable === "The image cannot be uploaded due to the upload size being incorrect") {
					$scope.showPromoImgSizeMessage = true;
				}
				staffProfileService.getStaffHomeData(successCallback);
			};
			$scope.isLoadingPromoData = true;
			if($scope.newPromotionImage.spot === 1){
				$scope.newPromotionImage.spot = 4;
			}else if ($scope.newPromotionImage.spot === 2){
				$scope.newPromotionImage.spot = 5;
			}else{
				if ($scope.newPromotionImage.spot === 3){
					$scope.newPromotionImage.spot = 6;
				}
			}
			centerService.saveCenterPromotionImage($scope.newPromotionImage, homeDataCallback);
		};
		$scope.removeCenterPromotionImage = function (promotionSpot) {
			var successCallback = function () {
				centerService.getCenterImages(loadCenterImagesCallback);
				$scope.newPromotionImage = {};
			};
			var homeDataCallback = function(){
				staffProfileService.getStaffHomeData(successCallback);
			};
			$scope.isLoadingPromoData = true;
			centerService.removeCenterPromotionImage(promotionSpot, homeDataCallback);
		};

		$scope.saveCenterImage = function () {
			$scope.showCenterImgSizeMessage = false;
			var successCallback = function (image) {
				if(image.imageUploadSizeUnAcceptable !== undefined && image.imageUploadSizeUnAcceptable === "The image cannot be uploaded due to the upload size being incorrect") {
					$scope.showCenterImgSizeMessage = true;
				}
				centerService.getCenterImages(loadCenterImagesCallback);
				$scope.newImage = {};
			};
			$scope.isLoadingImageData = true;
			centerService.saveCenterImage($scope.newImage, successCallback);
		};
		$scope.removeCenterImage = function (centerImage) {
			var successCallback = function (image) {
				centerService.getCenterImages(loadCenterImagesCallback);
			};
			$scope.isLoadingImageData = true;
			centerService.removeCenterImage(centerImage, successCallback);
		};

    	var staffCallback = function (data) {
    		var appUser = data;
    		$scope.staffMessages = [];
    		$scope.donorMessages = [];
    		$scope.centerMarketingPromos = [];
    		angular.forEach(appUser.center.messages, function(message) {
    			if (message.messageTypeId === 3) {
    				$scope.staffMessages.push(message);
    			}
    			if (message.messageTypeId === 1) {
    				$scope.donorMessages.push(message);
    			}
    		});
    		angular.forEach(appUser.center.marketingPromos, function(promo) {    			
    			$scope.centerMarketingPromos.push(promo);    			
    		});
    	};
    	staffProfileService.getStaffHomeData(staffCallback);
    	
    	//Staff Message
    	var staffMessageToDelete = undefined;
    	var deleteStaffMessageCallback = function(data) {
    		if (data == "" && staffMessageToDelete !== undefined) {
    			angular.forEach($scope.staffMessages, function(message, i) {
    				if (message.id == staffMessageToDelete.id) {
    					$scope.staffMessages.splice(i, 1);
    				}
    			});
    			staffMessageToDelete = undefined;
    		}
    	};
    	$scope.deleteStaffMessage = function(message) {
    		staffMessageToDelete = message;
    		staffProfileService.deleteStaffMessage(message, deleteStaffMessageCallback);
    	};
    	
    	var addStaffMessageCallback = function(data) {
    		$scope.newStaffMessage = "";
    		$scope.staffMessages.push(data);
    		$scope.toggleAddStaffMessage();
    	};
    	$scope.saveStaffMessage = function() {
    		staffProfileService.addStaffMessage($scope.newStaffMessage, addStaffMessageCallback);
    	};
    	
    	$scope.toggleAddStaffMessage = function() {
    		$scope.isAddStaffMessage = !($scope.isAddStaffMessage);
    	}
    	
    	//Donor Messages
    	var donorMessageToDelete = undefined;
    	var deleteDonorMessageCallback = function(data) {
    		if (data == "" && donorMessageToDelete !== undefined) {
    			angular.forEach($scope.donorMessages, function(message, i) {
    				if (message.id == donorMessageToDelete.id) {
    					$scope.donorMessages.splice(i, 1);
    				}
    			});
    			donorMessageToDelete = undefined;
    		}
    	};
    	$scope.deleteDonorMessage = function(message) {
    		donorMessageToDelete = message;
    		staffProfileService.deleteDonorMessage(message, deleteDonorMessageCallback);
    	};
    	
    	var addDonorMessageCallback = function(data) {
    		$scope.newDonorMessage = "";
    		$scope.donorMessages.push(data);
    		$scope.toggleAddDonorMessage();
    	};
    	$scope.saveDonorMessage = function() {
    		staffProfileService.addDonorMessage($scope.newDonorMessage, addDonorMessageCallback);
    	};
    	
    	$scope.toggleAddDonorMessage = function() {
    		$scope.isAddDonorMessage = !($scope.isAddDonorMessage);
    	}
    	
    	//Center Marketing Promotions
    	var centerMarketingPromotionToDelete = undefined;
    	var deleteCenterMarketingPromotionCallback = function(data) {
    		if (data.responseBoolean && centerMarketingPromotionToDelete !== undefined) {
    			angular.forEach($scope.centerMarketingPromos, function(promo, i) {
    				if (promo.id === centerMarketingPromotionToDelete.id) {
    					$scope.centerMarketingPromos.splice(i, 1);
    				}
    			});
    			centerMarketingPromotionToDelete = undefined;
    		}
    	};
    	$scope.deleteCenterMarketingPromo = function(promo) {
    		centerMarketingPromotionToDelete = promo;
    		staffProfileService.deleteCenterMarketingPromotion(promo, deleteCenterMarketingPromotionCallback);
    	};
    	
    	var addCenterMarketingPromoCallback = function(data) {
    		$scope.newCenterMarketingPromo = "";
    		$scope.centerMarketingPromos.push(data.marketingPromo);
    		$scope.toggleAddCenterMarketingPromo();
    	};
    	$scope.saveCenterMarketingPromo = function() {
    		staffProfileService.addCenterMarketingPromotion($scope.newCenterMarketingPromo, addCenterMarketingPromoCallback);
    	};
    	
    	$scope.toggleAddCenterMarketingPromo = function() {
    		$scope.isCenterMarketingPromo = !($scope.isCenterMarketingPromo);
    	}
	}]);


	bdpAppControllers.controller('AdminGeneralSetupController', ['$scope', 'centerService', function ($scope, centerService) {
		$scope.showSitePromoImgSizeMessage = false;
		$scope.newPromotionImage = {};

		var loadSiteImagesCallback = function (imageResponse) {
			$scope.sitePromoImages = imageResponse.sitePromoImages;
			$scope.sitePromoAvailableSpots = imageResponse.sitePromoAvailableSpots;
			$scope.isLoadingData = false;
		};
		$scope.isLoadingData = true;
		centerService.getSiteImages(loadSiteImagesCallback);

		$scope.saveSitePromotionImage = function () {
			$scope.showSitePromoImgSizeMessage = false;
			var successCallback = function (image) {
				if(image.imageUploadSizeUnAcceptable !== undefined && image.imageUploadSizeUnAcceptable === "The image cannot be uploaded due to the upload size being incorrect") {
					$scope.showSitePromoImgSizeMessage = true;
				}
				centerService.getSiteImages(loadSiteImagesCallback);
				$scope.newPromotionImage = {};
			};
			$scope.isLoadingData = true;
			centerService.saveSitePromotionImage($scope.newPromotionImage, successCallback);
		};
		$scope.removeSitePromotionImage = function (promotionSpot) {
			var successCallback = function (image) {
				centerService.getSiteImages(loadSiteImagesCallback);
			};
			$scope.isLoadingData = true;
			centerService.removeSitePromotionImage(promotionSpot, successCallback);
		};

		$scope.fileChanged = function () {
			var fileObj = $('#promotionSpotFile');
			var w = fileObj.width(),
				h = fileObj.height();
		}
	}]);

    bdpAppControllers.controller('CenterHoursController', ['$scope', '$location', '$filter', 'staffProfileService', 'centerService', function ($scope, $location, $filter, staffProfileService, centerService) {
    	// TODO: This controller is getting quite bloated and has many
		// independent parts.
    	// Recommend breaking the individual panels into their own directive to
		// separate the code a bit.
    	$scope.hoursDropdowns = centerService.getHoursDropdowns();
    	
    	$scope.showCenterHours = false;
    	
    	
    	$scope.displayAliasUpdate = false;
    	$scope.updateSuccess = false;
    	$scope.errorSuccessMessage = false;
    	$scope.aliasObj = {
    			alias : "",
    			newAlias : null,
    			confirmAlias : null
    	}
    	$scope.zipcodes = null;
    	$scope.zipcodeError = false;
    	$scope.isLoadingZipcodes = true;
    	
        var getZipcodesCallback = function(data){
        	$scope.isLoadingZipcodes = false;
        	$scope.zipcodes = data.zipcodes;
        };
    	
    	var staffCallback = function (data) {
    		var appUser = data;
    		$scope.center = appUser.center;
    		$scope.aliasObj.alias = $scope.center.alias;
    		
    		$scope.hours = [];
    		$scope.days = [];
    		angular.forEach($scope.center.hoursOfOperations, function(dayOperation) {
    			$scope.hours.push({
                    name: dayOperation.weekday.description,
                    isClosed: dayOperation.playroomClosed === 'Y',
                    openingTime: centerService.breakUpTimes(dayOperation.playroomOpeningTime),
                    closingTime: centerService.breakUpTimes(dayOperation.playroomClosingTime),
                	weekday: dayOperation.weekdayNumber
                });
	            
                $scope.days.push({
                    name: dayOperation.weekday.description,
                    isOpen: dayOperation.playroomClosed === 'N',
                    isClosed: dayOperation.playroomClosed === 'Y',
                    playroomOpeningTime: $filter('hours')(dayOperation.playroomOpeningTime),
                    playroomClosingTime: $filter('hours')(dayOperation.playroomClosingTime),
                	weekday: dayOperation.weekdayNumber
                });
    		});
            centerService.getCenterZipcodes(getZipcodesCallback, $scope.center.id);  	
    	}
    	staffProfileService.getStaffHomeData(staffCallback);
    	
    	var dropdownCallback = function(data) {
    		$scope.dropdowns = data;
    	}
    	centerService.getStates(dropdownCallback);
    	
    	$scope.saveAddress = function() {
    		centerService.saveCenter($scope.center);
    	}
    	
    	$scope.changeClosed = function(day) {
    		if (day.isClosed) {
    			day.openingTime = angular.copy(blankTime);
    			day.closingTime = angular.copy(blankTime);
    		}
    	}
			
    	$scope.saveHours = function() {
    		angular.forEach($scope.hours, function(hour, i) {
    			$scope.center.hoursOfOperations[i].playroomClosed = (hour.isClosed === true) ? 'Y' : 'N';
    			$scope.center.hoursOfOperations[i].playroomOpeningTime = centerService.convertToMilitaryTime(hour.openingTime);
    			$scope.center.hoursOfOperations[i].playroomClosingTime = centerService.convertToMilitaryTime(hour.closingTime);
    		});
    		centerService.saveCenter($scope.center);
    	}
    	
    	
       
    	$scope.displayAliasUpdateToggle = function() {
    		$scope.displayAliasUpdate = !$scope.displayAliasUpdate;
    		
    	}
    
    	var aliasUpdateCallback = function(data) {
        	if(data == "true") {
            	$scope.updateSuccess = true;
	        	if($scope.updateSuccess == true) {
	        		$scope.center.alias = $scope.aliasObj.newAlias;
	        	}
        	}
        	if(data == "false") {
        		$scope.center.alias = $scope.aliasObj.newAlias;
        		$scope.errorSuccessMessage = true;
        	}
         };
        $scope.submit = function() {
        	centerService.saveAlias($scope.aliasObj.newAlias, aliasUpdateCallback);        	
        };
                
        var saveZipcodesCallback = function(data){
        	$scope.isLoadingZipcodes = false;
        	$scope.zipCodes = data.zipcodes;
        };
        
        $scope.saveZipcodes = function() {
        	$scope.isLoadingZipcodes = true;
        	var request = {};
        	request.centerId = $scope.center.id;
        	request.zipcodes = $scope.zipcodes;
        	centerService.saveCenterZipcodes(saveZipcodesCallback, request);        	
        }
        
        $scope.addZipcode = function() {
        	if ($scope.newZipcode != null) {
        		$scope.zipcodeError = false;
        		
        		var index = $scope.zipcodes.indexOf($scope.newZipcode);
            	if (index > -1) {
            		$scope.addZipcodeError = "Zip Code already in the list";
            		$scope.zipcodeError = true;
            	}
	            
	            if (!$scope.zipcodeError) {
	            	$scope.zipcodes.unshift($scope.newZipcode);
	            	$scope.newZipcode = "";
	            }
        	}       	
        }
        
        $scope.deleteZipcode = function(zipcode) {
        	var index = $scope.zipcodes.indexOf(zipcode);
        	if (index > -1) {
        		$scope.zipcodes.splice(index, 1);
        	}
        }
        
        $scope.invalidNewZipcode = function() {
    		$scope.zipcodeError = false;
    		
    		if ($scope.zipcodes != null) {
    			var index = $scope.zipcodes.indexOf($scope.newZipcode);
            	if (index > -1) {
            		$scope.addZipcodeError = "Zip Code already in the list";
            		$scope.zipcodeError = true;
            	}
    		}
        	
        	return $scope.zipcodeError || ($scope.newZipcode != null && $scope.newZipcode.length < 2);      	
        }
    } ]);

    bdpAppControllers.controller('DonorHomeController', ['$scope', '$location', '$filter', '$modal', '$route','profileService', 'appointmentService', 'homeService', 'userService', function ($scope, $location, $filter, $modal, $route,profileService, appointmentService, homeService, userService) {
    	$scope.isLoadingData = true;
        $scope.isLoadingBalance = true;
    	$scope.showCenterHours = false;
    	$scope.haveBalance = false;
    	$scope.hasPhysicalAppt = false;
    	$scope.hasDonationAppt = false;
    	$scope.upcomingDonations;
    	$scope.upcomingPhysical;
    	$scope.oldAppt;
    	$scope.cancelData = {};
    	$scope.debitError = false;
    	$scope.overduePhysical = false;
    	$scope.requiredPhysical = false;
    	$scope.disLastAndNextPhysical;
    	
    	if(profileService.registrationCompleted === true) {
        		var modalInstance = $modal.open({
                    templateUrl: 'html/registration-complete-modal.html',
                    controller: ['$scope', '$modalInstance', 'profileService',
                    function ($scope, $modalInstance, profileService) {  
                    	profileService.registrationCompleted = false;
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };                                         
                    } ],
                    backdrop: 'static'
                });
    	}
    	
    	$scope.toggleHours = function() {
    		$scope.showCenterHours = !($scope.showCenterHours);
    	};
    	$scope.isDonorViewable = function(message) {
    		return message.messageTypeId === 1;
    	}
    	
    	$scope.scheduleNow = function(){        	
   			$location.path('/appointments/schedule-now');
        }
    	
        var profileCallback = function(data) {
        	var profile = data;
        	homeService.overrideSitePromosWithCenterPromos(profile);
        	
        	if (profile.center !== undefined) {
	        	$scope.donorNameWelcome = ", "+profile.firstName + ' ' + profile.lastName;
	        	$scope.center = {
	                address1 : profile.center.addressLine1,
	                address2 : (profile.center.city + ', ' + profile.center.state.code + ' ' + profile.center.zipCode),
	                address3 : $filter('phone')(profile.center.phoneNumber, true),
	                days : new Array(),
	                messages : profile.center.messages
	            }
	
	            profile.center.hoursOfOperations.forEach(function (dayOperation) {
	                var day = {
	                    name: dayOperation.weekday.description,
	                    isOpen: dayOperation.closed === 'N',
	                    isClosed: dayOperation.closed === 'Y',
	                    openingTime: $filter('hours')(dayOperation.openingTime),
	                    closingTime: $filter('hours')(dayOperation.closingTime),
	                    playroomOpeningTime: $filter('hours')(dayOperation.playroomOpeningTime),
	                    playroomClosingTime: $filter('hours')(dayOperation.playroomClosingTime),
	                    isPlayroomOpen: dayOperation.playroomClosed === 'N',
	                    isPlayroomClosed: dayOperation.playroomClosed === 'Y',
	                    weekday: dayOperation.weekdayNumber
	                };
	                $scope.center.days.push(day);
	            });
	            
	        	if (profile.privacyOptInFlag === "N" && profile.center.pilot === "Y" && profileService.showPrivacyOptInModal){
            		var modalInstance = $modal.open({
                        templateUrl: 'html/modals/privacy-policy-opt-in-modal.html',
                        controller: ['$scope', '$modalInstance', 'profileService',
                        function ($scope, $modalInstance, profileService) {		                        	
                        	$scope.modalContext = "initialLoad";
                        	profileService.showPrivacyOptInModal = false;
	                        
	                        var updatePrivacyPolicyCallback = function(data) {
	                    		if(data.responseBoolean){
	                    			$scope.isSaving = false;
	                    			$modalInstance.dismiss('cancel');
	                    		} else if (!data.responseBoolean){
	                    			$scope.errorMessage = true;
	                    			$scope.modalContext = "privacyPolicyFailed";	
	                    		}			                    		
	                    	};
	                        $scope.accept = function() {
	                        	$scope.isSaving = true;
                        		profileService.updatePrivacyPolicyOptInFlag(updatePrivacyPolicyCallback);		                        	
	                        };
	                        $scope.close = function() {
	                            $modalInstance.dismiss('cancel');
	                        };
                    } ],        		
                        backdrop: 'static'
            		});
	        	}		
        	}
        	if(profile.forcePasswordChangeFlag === 'Y'){
        		var modalInstance = $modal.open({
                    templateUrl: 'html/force-donor-forgot-password-modal.html',
                    controller: ['$scope', '$modalInstance', 'profileService',
                    function ($scope, $modalInstance, profileService) {
                    	$scope.changeSuccess = false;
                	$scope.message = null;
                	
                	$scope.newPasswordRequest = {
                			currentPassword : '',
                			newPassword: '',
                			confirmPassword: ''
            		};
                	var profileCallback = function(data) {
                    	$scope.profile = angular.copy(data);
                    };
                    profileService.getProfile(profileCallback);
                    
                    var resetCallback = function(data) {
                		if(data.passwordUpdateResponse === true){
                			profileService.getProfile(profileCallback);
                			$scope.changeSuccess = true;
                			$scope.message = "Password changed successfully.";
                		}else{
                			$scope.message = "Current password entered is incorrect.";
                		}
                	};
                    $scope.submit = function() {
                    	if($scope.newPasswordRequest.newPassword === $scope.newPasswordRequest.confirmPassword){
                    		profileService.resetPasswordDonor({password: $scope.newPasswordRequest.newPassword, currentPassword: $scope.newPasswordRequest.currentPassword }, resetCallback);
                    	}
                    };
                    $scope.logout = function() {
                        $modalInstance.dismiss('cancel');
                    	userService.logout();
                    };
                    $scope.continueBDP = function() {
                        $modalInstance.dismiss('cancel');
                    };
                } ],        		
                    backdrop: 'static'
        		});
        	}
        	$scope.isLoadingData = false;
        	
        };
        profileService.getDonorHomeData(profileCallback);
        
        
        var debitErrorCallback = function(){
        	$scope.isLoadingBalance = false;
        	$scope.debitError = true;
        }
        var debitCallback = function(data) {
            $scope.isLoadingBalance = false;
        	var citi = data;
        	if (citi.balance !== undefined) {
        		$scope.availableBalance = $filter('currency')(citi.balance.balance_available / 100);
        		$scope.haveBalance = true;
        	} else {
        		$scope.haveBalance = false;
        	}
            
        };
        profileService.getDebitInfo(debitCallback, debitErrorCallback);
        
        var upcomingApptsCallback = function(data) {
        	$scope.upcomingDonations = data.upcomingDonationAppointmentsList;
        	if ($scope.upcomingDonations !== undefined) {
	        	if ($scope.upcomingDonations.length > 0) {
	        		$scope.hasDonationAppt = true;
	        	}
        	}
        	$scope.upcomingPhysical = data.upcomingPhysicalAppointmentsList;
        	if ($scope.upcomingPhysical !== undefined) {
	        	if ($scope.upcomingPhysical.length > 0) {
	        		$scope.hasPhysicalAppt = true;
	        	};
        	};     		
        }
        profileService.getUpcomingAppointments('donor', upcomingApptsCallback);
        
        var getDonorDisLastAndNextPhysicalCallback = function(data){
        	$scope.disLastAndNextPhysical = data;
        	if($scope.disLastAndNextPhysical.nextPhysicalDate === "Overdue"){
        		$scope.requiredPhysical = true;
        	}
        	if($scope.disLastAndNextPhysical.lastPhysicalDate === undefined){
        		$scope.requiredPhysical = true;
        		$scope.disLastAndNextPhysical.nextPhysicalDate = "Required";
        	}
        };
        appointmentService.getDonorDisLastAndNextPhysical(getDonorDisLastAndNextPhysicalCallback);
        
        $scope.goToDonationCenterPage = function(){
        	$location.path('/profile/donation-center');
        };
        
        $scope.modifyAppointment = function(appointment) {
        	//appointmentService.appointmentItem = appointment;
        	$scope.oldAppt = appointment;
        	$scope.apptDate = appointment.appointmentDateTimeDisplay.substring(0,10);
        	$scope.apptTime = appointment.appointmentDateTimeDisplay.substring(11,19);
        	appointmentService.appointmentItem.appointmentId = appointment.appointmentId;
        	$scope.children = appointment.numberOfChildren;
        	$scope.apptType = appointment.appointmentType;
        	appointmentService.appointmentItem.appointmentTypeId = appointment.appointmentTypeId;
        	appointmentService.appointmentItem.appointmentDateString = appointment.appointmentDateTime;
        	appointmentService.appointmentItem.appointmentDateTime = appointment.appointmentDateTimeDisplay;
        	appointmentService.appointmentItem.chosenCenterId = appointment.centerId;
        	appointmentService.appointmentItem.appointmentTypeDescription = appointment.appointmentType;
        	
        	var cancelMe = function() {
    			$scope.isCanceled = true;   		
        	}
        	
        	var closeModal = function () {
                $modalInstance.dismiss('cancel');
            };
                    
        	var modalInstance = $modal.open({
                templateUrl: 'html/donor/appointments/modify-appointment-modal.html',
                scope: $scope,
                controller: ['$scope', '$modalInstance', '$route','profileService', 'appointmentService',
                function ($scope, $modalInstance, $route,profileService, appointmentService) {
                	$scope.showCancelInformation = false;
                	$scope.isCanceling = false;
                	$scope.showCancelSuccessMessage = false;
                	$scope.showCancelErrorMessage = false;
                	$scope.cancelSuccess = function() {
                    	if($scope.cancelData.cancelAppointmentResponse === 'Success, the appointment was cancelled') {
                    			$scope.isCancelSuccess = true;
                    	}
                    }
                	
                	$scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    	$route.reload();
                    };
                    
                    $scope.rescheduleAppointment = function() {
                    	$modalInstance.dismiss('cancel');
                    	$location.path('/appointments/reschedule-appointment');
                    };
                    
                    $scope.cancelAppt = function() {
                    	                    	
                    	var modifyCallback = function(data) {                    		
                        	appointmentService.donorModifyAppointmentResponse = data;
                        	$scope.cancelInfo = appointmentService.donorModifyAppointmentResponse;
                        	$scope.isLoadingApptModify = false;
                        	$scope.isCanceling = true;
                        }
                    	$scope.isLoadingApptModify = true;
                    	appointmentService.modifyAppointment(appointmentService.appointmentItem, modifyCallback);                   	
                    };
                    
                    var upcomingApptsCallback = function(data) {
                    	$scope.upcomingDonations = data.upcomingDonationAppointmentsList;
                    	if ($scope.upcomingDonations !== undefined) {
	                    	if ($scope.upcomingDonations.length > 0) {
	                    		$scope.hasDonationAppt = true;
	                    	}	
                    	}
                    	$scope.upcomingPhysical = data.upcomingPhysicalAppointmentsList;
                    	if ($scope.upcomingPhysical !== undefined) {
	                    	if ($scope.upcomingPhysical.length > 0) {
	                    		$scope.hasPhysicalAppt = true;
	                    	}
                    	}
                    }
                                    
                    var confirmCancelCallback = function(data) {
                    	$scope.cancelData = data;
                    	if($scope.cancelData.cancelAppointmentResponse === 'Success, the appointment was cancelled') {
                    		$scope.showCancelSuccessMessage = true;                    
                    		profileService.getUpcomingAppointments('donor', upcomingApptsCallback);
                    	} else {
                    		$scope.showCancelErrorMessage = true;
                    	}                    		
                    };
                    
                    $scope.confirmCancelAppt = function() {
                    	appointmentService.cancelAppointment(appointmentService.appointmentItem, confirmCancelCallback);
                    };               
                } ],
                backdrop: 'static'
            });
        }       
    }]);
    
    bdpAppControllers.controller('StaffHomeController', ['$scope', '$location', '$filter', 'staffProfileService', 'centerService', 'homeService', function ($scope, $location, $filter, staffProfileService, centerService, homeService) {
    	$scope.showCenterHours = false;
    	$scope.isLoadingData = true;
    	$scope.isLoadingSearchData = false;
    	$scope.center = {};
    	$scope.toggleHours = function() {
    		$scope.showCenterHours = !($scope.showCenterHours);
    	};
    	
    	$scope.isStaffViewable = function(message) {
    		return message.messageTypeId === 3;
    	};
    	
        var staffHomeCallback = function(applicationUser) {
        	var appUser = applicationUser;
        	homeService.overrideSitePromosWithCenterPromos(appUser);
        	$scope.staffNameWelcome = ", "+appUser.firstName;
        	$scope.center = {
                address1 : appUser.center.addressLine1,
                address2 : (appUser.center.city + ', ' + appUser.center.state.code + ' ' + appUser.center.zipCode),
                address3 : $filter('phone')(appUser.center.phoneNumber, true),
                messages : appUser.center.messages,
                days : new Array()
            }

        	appUser.center.hoursOfOperations.forEach(function (dayOperation) {
                var day = {
                    name: dayOperation.weekday.description,
                    isOpen: dayOperation.closed === 'N',
                    isClosed: dayOperation.closed === 'Y',
                    openingTime: $filter('hours')(dayOperation.openingTime),
                    closingTime: $filter('hours')(dayOperation.closingTime),
                    playroomOpeningTime: $filter('hours')(dayOperation.playroomOpeningTime),
                    playroomClosingTime: $filter('hours')(dayOperation.playroomClosingTime),
                    isPlayroomOpen: dayOperation.playroomClosed === 'N',
                	isPlayroomClosed: dayOperation.playroomClosed === 'Y',
               		weekday: dayOperation.weekdayNumber
                };
                $scope.center.days.push(day);
            });
        	$scope.isLoadingData = false;
        };
		staffProfileService.getStaffHomeData(staffHomeCallback);

        $scope.searchRequest = {
  			 firstName : "",
          	 lastName : "",
          	 pdn : "",
          	 emailAddress : ""
       	};

        var searchCallback = function(data) {
        	$scope.searchRequest = {};
        	$scope.donorSearch.$setPristine();
        	$scope.isLoadingSearchData = false;
    		$scope.searchList = data;
/*            $scope.ShowIncompleteDonorResultsTable = false;
        	$scope.isEmailSearch = staffProfileService.isEmailSearch;*/

        	if(data.length == 0) {
        		$scope.noResultsMessage = true;        		
        	}	
        	isLoadingSearchData = false;        	     
             
        	// re-route to search results page
        	$location.path('/search-result');
        };        
        
        $scope.search = function() {
        	$scope.errorMessage = false;
        	$scope.noResultsMessage = false;
        	$scope.isLoadingSearchData = true;
        	staffProfileService.isEmailSearch = false;
        	if($scope.searchRequest.firstName || $scope.searchRequest.lastName) {
	       		staffProfileService.isGlobalSearch = false;
	           	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	       	} else if($scope.searchRequest.pdn) {
	       		staffProfileService.isGlobalSearch = true;
	           	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	       	} else if($scope.searchRequest.emailAddress) {
	       		staffProfileService.isEmailSearch = true;
	           	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	       	} else {
	       		$scope.errorMessage = true;
	       	}    	
        }; 
    } ]);

    bdpAppControllers.controller('SearchResultsController', ['$scope', '$location', '$modal', 'staffProfileService', 'userService', 'profileService', function ($scope, $location, $modal, staffProfileService, userService, profileService) {

    	$scope.isLoadingResults = false;
    	$scope.isGlobalSearch = staffProfileService.isGlobalSearch;
    	$scope.isEmailSearch = staffProfileService.isEmailSearch;
    	$scope.searchList = staffProfileService.getAndClearSearchDonor();
    	if ($scope.searchList !== undefined && $scope.searchList.length === 0) {
    		$scope.noResultsMessage = true;
    	}
    	
    	 if($scope.searchList !== undefined && $scope.searchList.length > 0 && $scope.isEmailSearch && $scope.searchList[0].profileCompletedFlag === 'N' && $scope.searchList[0].pdn === undefined){
             $scope.ShowIncompleteDonorResultsTable = true;
         }

    	$scope.searchRequest = {
     			 firstName : "",
             	 lastName : "",
             	 pdn : "",
             	 emailAddress : ""
      	};

       var searchCallback = function(data) {
       	$scope.searchRequest = {};
       	$scope.isGlobalSearch = staffProfileService.isGlobalSearch;
       	$scope.isEmailSearch = staffProfileService.isEmailSearch;
       	$scope.donorSearch.$setPristine();
    	$scope.isLoadingResults = false;
   		$scope.searchList = data;
   		$scope.allQuickPhysical = true;
   		$scope.continueForEach = true;
        $scope.ShowIncompleteDonorResultsTable = false;

   		//Check if all donors are Quick Physical in result
   		angular.forEach($scope.searchList, function(donor) {
   			if($scope.continueForEach) {
	   			if(donor.id + '' !== donor.loginId) {
	   				$scope.allQuickPhysical = false;
	   				$scope.continueForEach = false;
	   			};
   			};
   		});
       	if(data.length == 0 || $scope.allQuickPhysical) {
       		$scope.noResultsMessage = true;
       	};
        if($scope.searchList !== undefined &&$scope.searchList.length > 0 && $scope.isEmailSearch && $scope.searchList[0].profileCompletedFlag === 'N' && $scope.searchList[0].pdn === undefined){
                $scope.ShowIncompleteDonorResultsTable = true;
         }
       };

       var selectedDonorCallback = function(data) {       
            $scope.selectedDonor = data;
            $location.path('/profile/donor-appointments');       
       };

       $scope.search = function() {
	       	$scope.errorMessage = false;
	       	$scope.noResultsMessage = false;
	    	$scope.isLoadingResults = true;
	    	$scope.allQuickPhysical = false;
	    	staffProfileService.isEmailSearch = false;
	    	if($scope.searchRequest.firstName || $scope.searchRequest.lastName) {
	       		staffProfileService.isGlobalSearch = false;
	           	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	       	} else if($scope.searchRequest.pdn) {
	       		staffProfileService.isGlobalSearch = true;
	           	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	       	} else if($scope.searchRequest.emailAddress) {
	       		staffProfileService.isEmailSearch = true;
	           	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	       	} else {
	       		$scope.errorMessage = true;
	       	}
      };

       $scope.selectedDonor = function(donor) {
    	   var donorSearchSessionResponse;

    	/*   if(staffProfileService.isEmailSearch && donor.centerId === loginResponse.centerId) {
    	       donorSearchSessionResponse = {
                   loginId : donor.loginId,
                   donorId: donor.id,
                   centerId: donor.centerId,
                   currentCenterLocalTime : donor.center.currentLocalTime            
    	       }
    	    } else {*/
    	   if($scope.searchList !== undefined && $scope.searchList.length > 0 && $scope.isEmailSearch && $scope.searchList[0].profileCompletedFlag === 'N' && $scope.searchList[0].pdn === undefined) {	
	               $scope.donorForDelete = donor;	      
	               var modalInstance = $modal.open({
	                   templateUrl: 'html/donor-deletion-email-search-modal.html',
	                   scope: $scope,
	                   controller: ['$scope', '$modalInstance', '$location', 'profileService', 'staffProfileService', 'userService', 
	                   function ($scope, $modalInstance, $location, profileService, staffProfileService, userService) {
	                	   $scope.isDeleting = false;
	                	   $scope.deleteCallCompleted = false;
	                	   $scope.showSuccessMessage = false;
	                	   $scope.showErrorMessage = false;
	                	   
	                       var deleteProfileCallback = function(data) {
	                          $scope.isDeleting = false;
	                          $scope.deleteCallCompleted = true;
	                          staffProfileService.searchDonor = undefined;
	                          if(data.responseString === "Successfully deleted profile."){	                               
	                              $scope.showSuccessMessage = true;                          
	                          } else if (data.responseString === "Error deleting profile") {
	                       	      $scope.showErrorMessage = true;
	                          }
	                       };
	                        
	                       $scope.deleteProfile = function() {
	                    	   $scope.isDeleting = true;
	                           profileService.deleteDonorProfile($scope.donorForDelete, deleteProfileCallback);                                                        
	                       };
	                        
	                       $scope.cancel = function () {
	                           $modalInstance.dismiss('cancel');	                          
	                       };
	                       
	                       $scope.redirectToHomePage = function () {
	                           $modalInstance.dismiss('cancel');
	                           if(userService.isManager()){
                                   $location.path('/manager-home');
                               }
                               if(userService.isStaff()){
                                   $location.path('/staff-home');
                               }
	                       };
	                   } ],
	                   backdrop: 'static'
	               });           
	               modalInstance.result.then(function (info) {
	                   console.log("result then");
	               });                                       
    	   } else {    	   
	            donorSearchSessionResponse = {
	                loginId : donor.loginId,
	                donorId: donor.id,
	                pdn: donor.pdn,
	                centerId: donor.centerId,
	                currentCenterLocalTime : donor.center.currentLocalTime,
	                alias : donor.center.alias
	           }
    	   }

    	   if(donorSearchSessionResponse.loginId != null) {
    		   staffProfileService.setSelectedDonor(donorSearchSessionResponse, selectedDonorCallback, donor);
    	   }  else {
    		   $scope.errorMessage=true;
    	   }
		};
   } ]);    
    
    bdpAppControllers.controller('SocialMediaController', ['$scope', '$location', '$modal', 'userService', 'googleTagManagerService', function ($scope, $location, $modal, userService, googleTagManagerService) {    
    	$scope.login = {username: '', password: ''};	
     	$scope.failedLogin = false;
     	$scope.showVerifySuccessMessage = false;
     	$scope.showVerifyFailureMessage = false;
		$scope.isLoggingIn = false;
		$scope.focusUsername = true;
     	if($location.url().indexOf('/login?verify=true') >= 0) {
			$scope.showVerifySuccessMessage = true;
			var donorID = $location.$$search.value;
			googleTagManagerService.newDonorRegistrationCompleteEvent(donorID);
		}
		if($location.url() === '/login?verify=false') {
			$scope.showVerifyFailureMessage = true;
		}
		
		var errorCallback = function () {
			$scope.isLoggingIn = false;
			$scope.failedLogin = true;
		}
		
    	var successCallback = function (loginResponse) {
			$scope.loginResponse = loginResponse;
			$scope.isLoggingIn = false;
			if (loginResponse != null) {
				if(loginResponse.loggedIn === false) {
					$scope.failedLogin = true;
				}
				if(loginResponse.loggedIn === false && loginResponse.staffNotAtCenterForLogin === true) {
					$scope.failedLogin = true;
					$scope.errorMessage = loginResponse.errorMessage;
					$scope.isLoggingIn = false;
				}				
				if(userService.isDonor()) {
					googleTagManagerService.successfulLoginEvent(loginResponse.donorId);
				}
    			$location.path("/" + loginResponse.loginUrl);
    		} else {
    			
    		}
    	};
    	$scope.submitLogin = function () {
    		$scope.isLoggingIn = true;
    		$scope.failedLogin = false;
    		$scope.login.username.toLowerCase();
    		userService.login($scope.login, successCallback, errorCallback);
    	};
    	
    	$scope.modalDisplay = function() {
    		var modalInstance = $modal.open({
                templateUrl: 'html/forgot-password-modal.html',
                controller: ['$scope', '$modalInstance', 'profileService',
                function ($scope, $modalInstance, profileService) {
                	$scope.focusInput = true;
                	$scope.username = null;
                	$scope.couldNotFindName = false;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    
                    var submitCallback = function(data) {
                    	if (data === "false") {
                    		$scope.couldNotFindName = true;
                    	} else {
                    		$scope.cancel();
                    		$location.path('/forgot-password-instructions');
                    	}
                    };
                    $scope.submit = function() {
                    	$scope.couldNotFindName = false;
                    	profileService.forgotPasswordUpdate({ loginId : $scope.username }, submitCallback);
                    };
                } ],
                backdrop: 'static'
            });
            
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}
    } ]);
    
    bdpAppControllers.controller('SocialMediaLogInTestController', ['$scope', '$location', '$modal', 'userService', 'googleTagManagerService', 'userService', 'profileService', '$rootScope', function ($scope, $location, $modal, userService, googleTagManagerService, userService, profileService, $rootScope) {    
    	$scope.login = {username: '', password: ''};	
     	$scope.failedLogin = false;
     	$scope.showVerifySuccessMessage = false;
     	$scope.showVerifyFailureMessage = false;
		$scope.isLoggingOut = false;
		$scope.showErrorMessage = false;
		$scope.showSocialMediaLogin = false;
		$scope.testPassword = '';
		
		$scope.submitPassword = function(input) {
			if(input === "biolifetest") {
				$scope.showSocialMediaLogin = true;
			}
		}
		
		$scope.socialLogin = {username: '', password: '', remember: '', accessToken: ''};
		
		var errorCallback = function () {
			$scope.isLoggingIn = false;
			$scope.failedLogin = true;
		}
		
    	var successCallback = function (loginResponse) {
			$scope.loginResponse = loginResponse;
			$scope.isLoggingIn = false;
			if (loginResponse != null) {
				if(loginResponse.loggedIn === false) {
					$scope.failedLogin = true;
				}
				if(loginResponse.loggedIn === false && loginResponse.staffNotAtCenterForLogin === true) {
					$scope.failedLogin = true;
					$scope.errorMessage = loginResponse.errorMessage;
					$scope.isLoggingIn = false;
				}				
				if(userService.isDonor()) {
					googleTagManagerService.successfulLoginEvent(loginResponse.donorId);
				}
				if(loginResponse.isOnShireNetwork){
					/*FB.logout(function(response){
						console.log("Response after FB.logout()" + response);
						FB.getLoginStatus(function(response) {
							  console.log("Response after FB.getLoginStatus()" + reponse);
						}, true);
					});*/
    		    }
    			$location.path("/" + loginResponse.loginUrl);
    		} else {
    			
    		}
    	};
    	    	
        var registrationCallback = function(data) {        	
    		$scope.registrationResult = data;
    		if (data.accountAlreadyRegistered) {
				$scope.showErrorMessage = true;
				$scope.registrationMessage = "The Facebook/Google account you are trying to register with is already registered with our system";
    		}
    		if(data.responseBoolean && !data.registeringFromCenter){
    			profileService.getDonorId(data.donor.loginId, donorIdCallback);
    			$location.path('/' + data.emailRegistrationURL);
    		}
    		else if(data.responseBoolean && data.registeringFromCenter) {
    			userService.login($scope.registration, loginSuccessCallback, errorCallback);
    		} else {
    			if(!data.responseBoolean){
    				if(data.responseString !== "" && data.responseString !== undefined) {   					
    					$scope.registrationMessage = data.responseString;
    				} else if(!data.accountAlreadyRegistered) {
    					$scope.registrationMessage = "Error during registration. Please try again or contact BioLife for support.";
    				}
    				$scope.showErrorMessage = true;
    			}
    		}
        	$scope.isRegistering = false;
        };
        
    	var donorIdCallback = function(data) {
    		if(data.donorId !== undefined) {
    			googleTagManagerService.newDonorRegistrationSentEvent(data.donorId);    			
    		}
    	};
        
        var registrationWithUsernamePromptSuccessCallback = function(data) {        	    		
        	$scope.facebookEmailAdditionModalDisplay(data);
        };
    	
    	$scope.submitLogin = function () {
    		$scope.isLoggingIn = true;
    		$scope.failedLogin = false;
    		$scope.login.username.toLowerCase();
    		userService.login($scope.login, successCallback, errorCallback);
    	};
    	
    	$scope.modalDisplay = function() {
    		var modalInstance = $modal.open({
                templateUrl: 'html/forgot-password-modal.html',
                controller: ['$scope', '$modalInstance', 'profileService',
                function ($scope, $modalInstance, profileService) {
                	$scope.focusInput = true;
                	$scope.username = null;
                	$scope.couldNotFindName = false;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    
                    var submitCallback = function(data) {
                    	if (data === "false") {
                    		$scope.couldNotFindName = true;
                    	} else {
                    		$scope.cancel();
                    		$location.path('/forgot-password-instructions');
                    	}
                    };
                    $scope.submit = function() {
                    	$scope.couldNotFindName = false;
                    	profileService.forgotPasswordUpdate({ loginId : $scope.username }, submitCallback);
                    };
                } ],
                backdrop: 'static'
            });
            
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}
    	
    	// fix this
    	$scope.facebookEmailAdditionModalDisplay = function(data) {
    		var modalInstance = $modal.open({
                templateUrl: 'html/facebook-email-login-modal.html',
                controller: ['$scope', '$modalInstance', 'userService',
                function ($scope, $modalInstance, userService) {
                	$scope.login = {username: '', password: '', remember: '', accessToken: ''};	   
                	$scope.registrationResponse = data;
                	$scope.focusInput = true;
                	$scope.couldNotFindName = false;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    
                    var submitCallback = function(data) {
                    	if ($scope.registrationResponse === "false") {
                    		$scope.couldNotFindName = true;
                    	} else {
                    		$scope.cancel();
                    		$location.path('/forgot-password-instructions');
                    	}
                    };
                    
                    $scope.submit = function() {
                    	$scope.couldNotFindName = false;
                        $scope.login.accessToken = $scope.registrationResponse.accessToken;
                    	userService.socialMediaFacebookUsernamePromptWithRegistration($scope.login, registrationCallback);
                    };
                } ],
                backdrop: 'static'
            });
            
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}
    	
    	$scope.login = {username: '', password: '', remember: '', accessToken: ''};	   
    	$rootScope.FBLoginStatus = function() {
	    	FB.getLoginStatus(function(response) {
	    	    statusChangeCallback(response);
	    	});
    	}
    	$rootScope.FBLogin = function(response) {
			$scope.login.accessToken = response.authResponse.accessToken;
		    userService.socialMediaFaceBookLoginOrRegister($scope.login, successCallback, registrationCallback, registrationWithUsernamePromptSuccessCallback );
    	}
    	
    	$rootScope.$on("fb_statusChange", function (event, args) {
 	    	statusChangeCallback(args.response);
 	    });
    	
        $rootScope.$on("fb_connected", function (event, args) {
 	    	statusChangeCallback(args.response);
	    });
	    
 
    	 function statusChangeCallback(response) {
    		    console.log('statusChangeCallback');
    		    console.log(response);
    		    // The response object is returned with a status field that lets the
    		    // app know the current login status of the person.
    		    // Full docs on the response object can be found in the documentation
    		    // for FB.getLoginStatus().
    		    if (response.status === 'connected'  && userService.loginResponse !== undefined && userService.loginResponse.loggedIn === true && userService.loginResponse.donorId !== undefined) {					
			    	// Logged into your app and Facebook.
    		    	// Check to see if they are logged in with Facebook and if they are,
            		$location.path('/donor-home');    		        		   
    		    } else if (response.status === 'connected' && userService.loginResponse !== undefined && userService.loginResponse.loggedIn !== undefined) {					
			    	// Logged into your app and Facebook.
    		    	$rootScope.FBLogin(response); 	
    		    //May need to add below || (response connected and loginRespone undefined)
    		    } else if(response.status !== 'unknown') {
    		      //https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    		      // The person is not logged into your app or we are unable to tell.
    		      FB.login(function(response){
	    			$scope.login.accessToken = response.authResponse.accessToken;
	    		    	userService.socialMediaFaceBookLoginOrRegister($scope.login, successCallback, registrationCallback, registrationWithUsernamePromptSuccessCallback );
					}, {scope: 'email'});
    		      }
    		  }
    	 
    	 function testAPI() {
    		    console.log('Welcome!  Fetching your information.... ');
    		    FB.api('/me', function(response) {
    		      console.log('Successful login for: ' + response.name);
    		      document.getElementById('status').innerHTML =
    		        'Thanks for logging in, ' + response.name + '!';
    		    });
    		  }
    	     	 
    	   
    	    
	 $scope.googleSignIn = function () {
		      userService.socialMediaGoogleLoginOrRegister($scope.login, successCallback, registrationCallback);
   	 }
   	    
   	  $scope.$on('event:google-plus-signin-success', function (event,authResult) {
   		    // Send login to server or save into cookie
   		  $scope.id_token = authResult.getAuthResponse().id_token;
   		  $scope.login.accessToken = $scope.id_token;
		      console.log('Logged in as: ' + authResult.getBasicProfile().getName());
		      console.log('ID Token is: ' + $scope.id_token);
		      //userService.socialMediaGoogleLoginOrRegister($scope.login, successCallback, registrationCallback);
   	  });
		  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
		    // Auth failure or signout detected
		  });
		 
		$scope.googleLoginStatus = function() {
			googleRenderButton();
		}
	}]);
    
    
        
    bdpAppControllers.controller('LoginController', ['$scope', '$location', '$modal', 'userService', 'googleTagManagerService', 'userService', 'profileService', '$rootScope', function ($scope, $location, $modal, userService, googleTagManagerService, userService, profileService, $rootScope) {    
    	$scope.login = {username: '', password: ''};	
     	$scope.failedLogin = false;
     	$scope.showVerifySuccessMessage = false;
     	$scope.showVerifyFailureMessage = false;
		$scope.isLoggingIn = false;
		$scope.focusUsername = true;
		
		
		$scope.socialLogin = {username: '', password: '', remember: '', accessToken: ''};
		
     	if($location.url().indexOf('/login?verify=true') >= 0) {
			$scope.showVerifySuccessMessage = true;
			var donorID = $location.$$search.value;
			googleTagManagerService.newDonorRegistrationCompleteEvent(donorID);
		}
		if($location.url() === '/login?verify=false') {
			$scope.showVerifyFailureMessage = true;
		}
		
		var errorCallback = function () {
			$scope.isLoggingIn = false;
			$scope.failedLogin = true;
		}
		
    	var successCallback = function (loginResponse) {
			$scope.loginResponse = loginResponse;
			$scope.isLoggingIn = false;
			if (loginResponse != null) {
				if(loginResponse.loggedIn === false) {
					$scope.failedLogin = true;
				}
				if(loginResponse.loggedIn === false && loginResponse.staffNotAtCenterForLogin === true) {
					$scope.failedLogin = true;
					$scope.errorMessage = loginResponse.errorMessage;
					$scope.isLoggingIn = false;
				}				
				if(userService.isDonor()) {
					googleTagManagerService.successfulLoginEvent(loginResponse.donorId);
				}
    			$location.path("/" + loginResponse.loginUrl);
    		} else {
    			
    		}
    	};
    	
    	var googleSuccessCallback = function (loginResponse) {
    		successCallback(loginResponse);
    		
    		if(loginResponse.loggedIn && loginResponse.onShireNetwork){
    			googleLogout();
    		}
    	};
    	
    	var googleErrorCallback = function () {
    		errorCallback();	
    		googleLogout();
    	};
    	
    	var googleLogout = function (){
    		var auth2 = gapi.auth2.getAuthInstance();
		    auth2.signOut().then(function () {
		      console.log('User signed out.');
		    });
		    auth2.disconnect().then(function () {
		      console.log('User disconnected.');
		    });
    	};
    		
		var facebookSuccessCallback = function (loginResponse) {
    		successCallback(loginResponse);
    		if(loginResponse.loggedIn && loginResponse.onShireNetwork){
        		facebookLogout();
    		}
    	};
    	
    	var facebookErrorCallback = function () {
    		errorCallback();	
    		facebookLogout();
    	};
    	
    	var facebookLogout = function (){
			FB.logout(function(response){
				console.log("Response after FB.logout()" + response);
				FB.getLoginStatus(function(response) {
					  console.log("Response after FB.getLoginStatus()" + response);
				}, true);
			});		
    	};
        
    	var donorIdCallback = function(data) {
    		if(data.donorId !== undefined) {
    			googleTagManagerService.newDonorRegistrationSentEvent(data.donorId);    			
    		}
    	};
        
        var registrationWithUsernamePromptSuccessCallback = function(data) {        	    		
        	$scope.facebookEmailAdditionModalDisplay(data);
        };
    	
    	$scope.submitLogin = function () {
    		$scope.isLoggingIn = true;
    		$scope.failedLogin = false;
    		$scope.login.username.toLowerCase();
    		userService.login($scope.login, successCallback, errorCallback);
    	};
    	
    	$scope.modalDisplay = function() {
    		var modalInstance = $modal.open({
                templateUrl: 'html/forgot-password-modal.html',
                controller: ['$scope', '$modalInstance', 'profileService',
                function ($scope, $modalInstance, profileService) {
                	$scope.focusInput = true;
                	$scope.username = null;
                	$scope.couldNotFindName = false;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    
                    var submitCallback = function(data) {
                    	if (data === "false") {
                    		$scope.couldNotFindName = true;
                    	} else {
                    		$scope.cancel();
                    		$location.path('/forgot-password-instructions');
                    	}
                    };
                    $scope.submit = function() {
                    	$scope.couldNotFindName = false;
                    	profileService.forgotPasswordUpdate({ loginId : $scope.username }, submitCallback);
                    };
                } ],
                backdrop: 'static'
            });
            
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}
    	
    	// fix this
    	$scope.facebookEmailAdditionModalDisplay = function(data) {
    		var modalInstance = $modal.open({
                templateUrl: 'html/facebook-email-login-modal.html',
                controller: ['$scope', '$modalInstance', 'userService',
                function ($scope, $modalInstance, userService) {
                	$scope.login = {username: '', password: '', remember: '', accessToken: ''};	   
                	$scope.registrationResponse = data;
                	$scope.focusInput = true;
                	$scope.couldNotFindName = false;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    
                    var submitCallback = function(data) {
                    	if ($scope.registrationResponse === "false") {
                    		$scope.couldNotFindName = true;
                    	} else {
                    		$scope.cancel();
                    		$location.path('/forgot-password-instructions');
                    	}
                    };
                    
                    $scope.submit = function() {
                    	$scope.couldNotFindName = false;
                        $scope.login.accessToken = $scope.registrationResponse.accessToken;
                    	userService.socialMediaFacebookUsernamePromptWithRegistration($scope.login, registrationCallback);
                    };
                } ],
                backdrop: 'static'
            });
            
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}
    	
    	$scope.login = {username: '', password: '', remember: '', accessToken: '', registering: false};	   
    	$scope.FBLoginStatus = function() {
    		FB.login(function(response){
				if(response.status === "connected") {
					$scope.login.accessToken = response.authResponse.accessToken;
					$scope.login.registering = false;
					$scope.isLoggingIn = true;
				    userService.socialMediaFaceBookLogin($scope.login, facebookSuccessCallback, facebookErrorCallback);
				}
			}, 
			{scope: "email"});
	    	/*FB.getLoginStatus(function(response) {
	    		if(response.status === "connected") {
	    			//statusChangeCallback(response);
	    			//user already logged in to FB, need to log them into BDP
	    			$scope.login.accessToken = response.authResponse.accessToken;
	    			$scope.login.registering = false;
	    			$scope.isLoggingIn = true;
	    		    userService.socialMediaFaceBookLogin($scope.login, facebookSuccessCallback, facebookErrorCallback);
	    		} else {
	    			FB.login(function(response){
	    				if(response.status === "connected") {
	    					$scope.login.accessToken = response.authResponse.accessToken;
	    					$scope.login.registering = false;
	    					$scope.isLoggingIn = true;
	    				    userService.socialMediaFaceBookLogin($scope.login, facebookSuccessCallback, facebookErrorCallback);
	    				}
	    			}, 
	    			{scope: "email"});
	    		}
	    	}, true);*/
    	};
    	    
    	 $scope.$on('event:google-plus-signin-success', function (event,authResult) {
    		    // Send login to server or save into cookie
    		  $scope.id_token = authResult.getAuthResponse().id_token;
    		  $scope.login.accessToken = $scope.id_token;
		      console.log('Logged in as: ' + authResult.getBasicProfile().getName());
		      console.log('ID Token is: ' + $scope.id_token);
		      
		  	  $scope.isLoggingIn = true;
    		  $scope.failedLogin = false;
		      userService.socialMediaGoogleLogin($scope.login, googleSuccessCallback, googleErrorCallback);
    	  });
		  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
		    // Auth failure or signout detected
		  });
	}]);
    
    bdpAppControllers.controller('BetaLoginController', ['$scope', '$location', '$modal', 'userService','$routeParams', function ($scope, $location, $modal, userService, $routeParams) {    
    	$scope.betaLogin = $routeParams.value;
    	$scope.betaLogin = $scope.betaLogin.split('-');
     	$scope.failedLogin = false;
     	$scope.showVerifySuccessMessage = false;
     	$scope.showVerifyFailureMessage = false;
		$scope.isLoggingIn = false;
		$scope.focusUsername = true;
		
		$scope.login = {
			username : $scope.betaLogin[0],
			password : $scope.betaLogin[1]
		}
		
		var errorCallback = function () {
			$scope.isLoggingIn = false;
			$scope.failedLogin = true;
		}
		
    	var successCallback = function (loginResponse) {
			$scope.loginResponse = loginResponse;
			$scope.isLoggingIn = false;
			if (loginResponse != null) {
				if(loginResponse.loggedIn === false) {
					$scope.failedLogin = true;
				}
				if(loginResponse.loggedIn === false && loginResponse.staffNotAtCenterForLogin === true) {
					$scope.failedLogin = true;
					$scope.errorMessage = loginResponse.errorMessage;
					$scope.isLoggingIn = false;
				}									
    			$location.path("/" + loginResponse.loginUrl);
    		} else {
    			
    		}
    	};
		
		userService.login($scope.login, successCallback, errorCallback);
					
     	if($location.url() === '/login?verify=true') {
			$scope.showVerifySuccessMessage = true;
		}
		if($location.url() === '/login?verify=false') {
			$scope.showVerifyFailureMessage = true;
		}
		
		
    	/*$scope.submitLogin = function () {
    		$scope.isLoggingIn = true;
    		$scope.failedLogin = false;
    		$scope.login.username.toLowerCase();
    		userService.login($scope.login, successCallback, errorCallback);
    	};*/
    	
    	$scope.modalDisplay = function() {
    		var modalInstance = $modal.open({
                templateUrl: 'html/forgot-password-modal.html',
                controller: ['$scope', '$modalInstance', 'profileService',
                function ($scope, $modalInstance, profileService) {
                	$scope.focusInput = true;
                	$scope.username = null;
                	$scope.couldNotFindName = false;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    
                    var submitCallback = function(data) {
                    	//Data should ideally be a boolean to show if the name was found or not
                    	if (!data) {
                    		$scope.couldNotFindName = true;
                    	} else {
                    		$scope.cancel();
                    		$location.path('/forgot-password-instructions');
                    	}
                    };
                    $scope.submit = function() {
                    	profileService.forgotPasswordUpdate({ loginId : $scope.username }, submitCallback);
                    };
                } ],
                backdrop: 'static'
            });
            
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}
    } ]);
    
   bdpAppControllers.controller('ProfileWizardOneController', ['$scope', '$location', 'profileService', 'userService', 'googleTagManagerService', function ($scope, $location, profileService, userService, googleTagManagerService) {
    	$scope.dateOfBirthIsOpen = false;
    	$scope.format = 'MM/dd/yyyy';
    	$scope.today = new Date();
    	$scope.showOptInErrorMessage = false;
    	/* $scope.iosDateOfBirth; 
        $scope.androidDateOfBirth; */

    	$scope.openDateOfBirth = function($event) {
    		$event.preventDefault();
	        $event.stopPropagation();
	
	        $scope.dateOfBirthIsOpen = true;
    	}
    	/*$scope.mobileDevice = $rootScope.userAgent; 
        if ($scope.mobileDevice === 'iOS'){ 
            
            $scope.isIOS = true; 
     
        } 
        
        if ($scope.mobileDevice === 'Android'){ 
            
            $scope.isAndroid = true; 
     
        } 
        
        console.log($scope.isIOS); 
        console.log($scope.isAndroid); 
        make arrays for the day and month dropdowns 
        
        var days = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'], 

        select = document.getElementById( 'days' ); 

        for(day in days){ 

        select.add( new Option( days[day] ) ); 

        }; 

        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'],

        select = document.getElementById( 'months' ); 

        for(month in months){ 

        select.add( new Option( months[month] ) ); 

        }; 

        make arrary and dropdown for year 
        var max = new Date().getFullYear(), 
            min = max - 100, 
            select = document.getElementById('dobyear'); 

        for (var i = min; i<=max; i++){ 
            var opt = document.createElement('option'); 
            opt.value = i; 
            opt.innerHTML = i; 
            select.appendChild(opt); 
        }; 
        
        document.getElementById('dobyear').selectedIndex = "82";*/ 

        //$scope.selected =$scope.dobyear[20];


    	//Get donor data and dropdown options
        var profileCallback = function(data) {
        	$scope.profile = angular.copy(data);
        	if (typeof $scope.dropdowns != 'undefined') {
        		convertCountry();
        		$scope.profile.country = $scope.dropdowns.countries[2];
        		//convertLanguage();
        	}
        	$scope.profile.keepInformedFlag = $scope.profile.keepInformedFlag === 'Y';
        	$scope.profile.keepInformedSMSFlag = $scope.profile.keepInformedSMSFlag === 'Y';
        };
        profileService.getProfile(profileCallback);
        
        $scope.dropdowns = undefined;
        var dropdownCallback = function(data) {
        	$scope.dropdowns = data;
        	if (typeof $scope.profile != 'undefined') {
        		convertCountry();
        		$scope.profile.country = $scope.dropdowns.countries[2];
        		convertLanguage();
        		
        		$scope.activeLanguage = 0;
            	for(var i=0; i< $scope.dropdowns.languages.length; i++){
              	     if($scope.dropdowns.languages[i].active === "Y"){
              	    	 $scope.activeLanguage++;
              	    	 
              	    	 if($scope.activeLanguage < 2){
              	    		$scope.profile.language = $scope.dropdowns.languages[i];
              	    	 }
              	     }
            	}
        	}
        	
        };
        profileService.getProfileDropdowns(dropdownCallback);
        //End Rest getters
        
        $scope.phoneAvailable = function() {
        	if (typeof $scope.profile.donorContacts == 'undefined') {
        		return false;
        	}
        	return $scope.profile.donorContacts.length < 2;
        };
        
        var saveProfileCallback = function(data) {
        	if (data != null) {
        		googleTagManagerService.donorInfoCompleteEvent(data.donor);
        		$location.path('/profile-wizard-2');
        	}
        };
        $scope.saveProfile = function() {
        	$scope.profile.keepInformedFlag = $scope.profile.keepInformedFlag ? 'Y' : 'N';
        	$scope.profile.keepInformedSMSFlag = $scope.profile.keepInformedSMSFlag ? 'Y' : 'N';
        	if($scope.profile.donorContacts.length > 1) {
	        	if($scope.profile.donorContacts[1].phoneNumber === "" || $scope.profile.donorContacts[1].phoneNumber === undefined) {
	        		$scope.profile.donorContacts.splice(1, 1);
	        	}
        	}
        	if( $scope.profile.dateOfBirth instanceof Date){
        		$scope.profile.day = $scope.profile.dateOfBirth.getDate() + "";
        		$scope.profile.month = ($scope.profile.dateOfBirth.getMonth() + 1) + "";
        		$scope.profile.year = $scope.profile.dateOfBirth.getFullYear() + "";
        		$scope.profile.dateOfBirthString = $scope.profile.month + '/' + $scope.profile.day + '/' + $scope.profile.year;
        	}
        	profileService.saveProfile($scope.profile, saveProfileCallback);
        };
        
        var convertCountry = function() {
        	if (typeof $scope.profile.country != 'undefined') {
        		angular.forEach($scope.dropdowns.countries, function(country) {
        			if (country.id == $scope.profile.country.id) {
        				$scope.profile.country = country;
        			}
        		});
        	}
        };
        
        var convertLanguage = function() {
        	if (typeof $scope.profile.language != 'undefined') {
        		angular.forEach($scope.dropdowns.languages, function(language) {
        			if (language.id == $scope.profile.language.id) {
        				$scope.profile.language = language;
        			}
        		});
        	}
        };
        // Show OptInError message if marketingOptIn is true, phone number is
		// undefined and populated, and phone type is
        $scope.$watch('profile.donorContacts[0].phoneNumber', function(newValue, oldValue){
        	if($scope.profile !== undefined) {
	        	if (typeof oldValue === newValue){
	        		return;
	        	} else {
		 			if (newValue !== undefined && $scope.profile.keepInformedSMSFlag === true){
		 				if (($scope.profile.donorContacts[0].phoneType.description !== "Mobile" || $scope.profile.donorContacts[0].phoneType === undefined) && $scope.profile.keepInformedSMSFlag === true){
		 						$scope.showOptInErrorMessage = true;
		 				} else {
		 					$scope.showOptInErrorMessage = false;
		 				}
		 			}else if (newValue === undefined && $scope.profile.donorContacts[0].phoneType.description === "Mobile") {
		 				if($scope.profile.keepInformedSMSFlag === true) {
	 						$scope.showOptInErrorMessage = true;
	 					}
		 			}else{
		 				$scope.showOptInErrorMessage = false;
		 			}
	        	}
        	}
 		});
        
        //Show OptInError message
        $scope.$watch('profile.donorContacts[0].phoneType', function(newValue, oldValue){
        	if($scope.profile !== undefined) {
	        	if (typeof oldValue === 'undefined'){
	        		return;
	        	} else {
		 			if (newValue !== "Mobile"){
		 				if ($scope.profile.donorContacts[0] === undefined || ($scope.profile.donorContacts[0].phoneNumber === undefined || $scope.profile.donorContacts[0].phoneType.description !== "Mobile")){
		 					if($scope.profile.keepInformedSMSFlag === true) {
		 						$scope.showOptInErrorMessage = true;
		 					}
		 				} else {
		 					$scope.showOptInErrorMessage = false;
		 				}
		 			}else{
		 				$scope.showOptInErrorMessage = false;
		 			}
	        	}
        	}
 		});
        
        // Show OptInError message if: 1.) marketingOptIn is checked 2.)primary
		// phone number is not undefined and is populated 3.)primary phone type
		// is not work or home, primary phone type must be mobile
        $scope.$watch('profile.keepInformedSMSFlag', function(newValue, oldValue){
        	if($scope.profile !== undefined) {
	        	if (typeof oldValue === 'undefined'){
	        		return;
	        	} else {
		 			if (newValue){
		 				if ($scope.profile.donorContacts[0] === undefined || ($scope.profile.donorContacts[0].phoneNumber === undefined || $scope.profile.donorContacts[0].phoneType.description !== "Mobile" || $scope.profile.donorContacts[0].phoneType === undefined)){
		 					if($scope.profile.keepInformedSMSFlag === true) {
		 						$scope.showOptInErrorMessage = true;
		 					}
		 				} else {
		 					$scope.showOptInErrorMessage = false;
		 				}
		 			}else{
		 				$scope.showOptInErrorMessage = false;
		 			}
	        	}
        	}
 		});
        
        $scope.logout = function() {
        	userService.logout();
        };
    } ]);
    
    bdpAppControllers.controller('DonorInformationController', ['$scope', '$location', 'profileService', 'userService', function ($scope, $location, profileService, userService) {
    	$scope.dateOfBirthIsOpen = false;
    	$scope.format = 'MM/dd/yyyy';
    	$scope.today = new Date();
    	$scope.keepInformedSaveMessage = '';
    	$scope.showOptInErrorMessage = false;
    	$scope.saveKeepInformedSmsMessage = '';
    	$scope.openDateOfBirth = function($event) {
    		$event.preventDefault();
	        $event.stopPropagation();
	        $scope.dateOfBirthIsOpen = true;
    	}
    	$scope.isDonor = userService.isDonor();
    	//Get donor data and dropdown options
        var profileCallback = function(data) {
        	$scope.profile = angular.copy(data);

        	if (typeof $scope.dropdowns != 'undefined') {
        		convertCountry();
        		//convertLanguage();
        	}
        	$scope.profile.keepInformedFlag = $scope.profile.keepInformedFlag === 'Y';
        	$scope.profile.keepInformedSMSFlag = $scope.profile.keepInformedSMSFlag === 'Y';
        };
        profileService.getProfile(profileCallback);
        
        $scope.dropdowns = undefined;
        var dropdownCallback = function(data) {
        	$scope.dropdowns = data;
        	if (typeof $scope.profile != 'undefined') {
        		convertCountry();
        		//convertLanguage();
        		
        		$scope.activeLanguage = 0;

            	for(var i=0; i< $scope.dropdowns.languages.length; i++){
              	     if($scope.dropdowns.languages[i].active === "Y"){
              	    	 $scope.activeLanguage++;
              	     }
            	}
        	}
        };
        profileService.getProfileDropdowns(dropdownCallback);
        //End Rest getters
        
        $scope.phoneAvailable = function() {
        	if (typeof $scope.profile.donorContacts == 'undefined') {
        		return false;
        	}
        	return $scope.profile.donorContacts.length < 2;
        };
        var convertCountry = function() {
        	if (typeof $scope.profile.country != 'undefined') {
        		angular.forEach($scope.dropdowns.countries, function(country) {
        			if (country.id == $scope.profile.country.id) {
        				$scope.profile.country = country;
        			}
        		});
        	}
        };
        
        var convertLanguage = function() {
        	if (typeof $scope.profile.language != 'undefined') {
        		angular.forEach($scope.dropdowns.languages, function(language) {
        			if (language.id == $scope.profile.language.id) {
        				$scope.profile.language = language;
        			}
        		});
        	}
        };
        var saveKeepInformedCallback = function(data) {
        	if (data != null) {
        		$scope.profile.keepInformedFlag = data.keepInformedFlag === 'Y';    		
        		$scope.keepInformedSaveMessage = data.keepInformedFlagResponse;
        	}
        };
        $scope.saveKeepInformedFlag = function() {
        	$scope.saveKeepInformedSmsMessage = "";
        	$scope.keepInformedSaveMessage = "";
        	$scope.displaySaveSuccess = false;
        	profileService.saveKeepInformedFlag(saveKeepInformedCallback);
        };
        var saveKeepInformedSmsFlagCallback = function(data) {
        	if (data != null) {
        		$scope.profile.keepInformedSMSFlag = data.keepInformedSMSFlag === 'Y';    		
        		$scope.saveKeepInformedSmsMessage = data.keepInformedSMSFlagResponse;
        	}
        };
        /*
		 * If they dont have a pdn, make them save the normal way by clicking
		 * save.
		 */
        $scope.saveKeepInformedSMSFlag = function() {       	
        	$scope.saveKeepInformedSmsMessage = "";
        	$scope.keepInformedSaveMessage = "";
        	$scope.displaySaveSuccess = false;
        	if($scope.showOptInErrorMessage === false) {
        		profileService.saveKeepInformedSmsFlag(saveKeepInformedSmsFlagCallback);
        	}
        };
        var saveProfileCallback = function(data) {
        	if (data != null) {
        		$scope.displaySaveSuccess = true;
        		profileService.getProfile(profileCallback);
        	}
        };
        $scope.saveProfile = function() {
        	$scope.saveKeepInformedSmsMessage = "";
    		$scope.keepInformedSaveMessage = "";
        	$scope.displaySaveSuccess = false;
        	$scope.profile.keepInformedFlag = $scope.profile.keepInformedFlag ? 'Y' : 'N';
        	$scope.profile.keepInformedSMSFlag = $scope.profile.keepInformedSMSFlag ? 'Y' : 'N';
        	if( $scope.profile.dateOfBirth instanceof Date){
        		$scope.profile.day = $scope.profile.dateOfBirth.getDate() + "";
    			$scope.profile.month = ($scope.profile.dateOfBirth.getMonth() + 1) + "";
    			$scope.profile.year = $scope.profile.dateOfBirth.getFullYear() + "";
        		$scope.profile.dateOfBirthString = $scope.profile.month + '/' + $scope.profile.day + '/' + $scope.profile.year;
        	}
        	profileService.saveDonorInformation($scope.profile, saveProfileCallback);
        };
        
        $scope.$watch('profile.country', function(newValue, oldValue){
        	if($scope.profile !== undefined) {
	 			if (oldValue !== undefined && newValue !== undefined){
	 				$scope.countryOriginal = oldValue;
	 				$scope.countryNew = newValue;
	 				if($scope.countryOriginal.id !== $scope.countryNew.id) {
	 					$scope.profile.state = undefined;
	 				}
	 			}
        	}
 		});
        
        /*
		 * $scope.showTextReminderInfo = function() { var modalInstance =
		 * $modal.open({ templateUrl:
		 * 'html/profile-wizard-appointment-reminder-information.html',
		 * controller: ['$scope', '$modalInstance', function ($scope,
		 * $modalInstance) { $scope.cancel = function () {
		 * $modalInstance.dismiss('cancel'); }; } ], backdrop: 'static' }); };
		 */
    } ]);
    
    bdpAppControllers.controller('ProfileWizardTwoController', ['$scope', '$location', 'profileService', 'userService', 'googleTagManagerService', 'centerService', function ($scope, $location, profileService, userService, googleTagManagerService, centerService) {
    	$scope.centerDisplay = "";
    	$scope.profile = {};
    	$scope.showCenterSelectMessage = false;
    	$scope.showLocationMessage = false;
    	$scope.locationMessage = "Based on your zip code, you are not eligible to register at this center. Please contact the BioLife location for more information.";
    	$scope.possibleCenters = [];
        
    	var zipCodeCallback = function(data) {
    		$scope.possibleCenters = data;
    		if($scope.profile.center !== undefined && $scope.profile.center.id !== undefined) {
    			if ($scope.centerZipCodeCheck($scope.profile.center.id)) {
    				
        		} else {        			
        			$scope.showLocationMessage = true;        			    
        		}
    		}
    	};
    	
        var profileCallback = function(data) {
        	$scope.profile = data;
        	//profileService.getCentersFromDonorZip($scope.profile.zipCode, zipCodeCallback);
        	if ($scope.profile.center !== undefined) {
            	$scope.centerDisplay = ' ' + $scope.profile.center.state.description  +' - ' + $scope.profile.center.city;
            }
        };
        profileService.getProfile(profileCallback);
        
        var successCallback = function (centers) {
        	$scope.centers;
        };
        centerService.loadStatesAndCenters(successCallback);               
        
        $scope.updateCenter = function(item, model, label) {
        	$scope.showCenterSelectMessage = false;
        	$scope.showLocationMessage = false;
        	if(item.isState) {
        		$scope.showCenterSelectMessage = true;
        		$scope.centerDisplay = "";
        		$scope.profile.centerId = undefined;
        	} else {
        		label = "";
        		$scope.centerDisplay = ' ' + item.state + ' - ' + item.name;
        		$scope.profile.centerId = item.centerId;
        		/*if ($scope.centerZipCodeCheck(item.centerId)) {
	        		label = "";
	        		$scope.centerDisplay = ' ' + item.state + ' - ' + item.name;
	        		$scope.profile.centerId = item.centerId;
        		} else {        			
        			$scope.showLocationMessage = true;        			    
        		}*/
        	}
        };
        
        $scope.centerZipCodeCheck = function(centerId) {
        	$scope.eligibleCenter = false;
        	if($scope.possibleCenters.centers.length > 0) {
				angular.forEach($scope.possibleCenters.centers, function(center){
					if(center.id === centerId){
						$scope.eligibleCenter = true;
						return $scope.eligibleCenter;	        						        				
					}
				});
				return $scope.eligibleCenter;
        	}
    		return $scope.eligibleCenter;
		};
    	
        var saveCenterCallback = function(data) {
        	$scope.showCenterSelectMessage = false;
        	if (data != null) {
        		googleTagManagerService.donorCenterCompleteEvent(data.donor);
        		$location.path('/profile-wizard-3');
        	}
        };
    	$scope.saveCenter = function() {
    		$scope.showCenterSelectMessage = false;
    		if($scope.profile.centerId !== undefined) {
    			profileService.saveDonorCenter($scope.profile, saveCenterCallback);
    		} else {
    			$scope.showCenterSelectMessage = true;
    		}
    	};
    	
    	$scope.logout = function() {
        	userService.logout();
        };
        
    } ]);
    
    bdpAppControllers.controller('ProfileWizardThreeController', ['$scope', '$location', 'profileService', 'userService', 'googleTagManagerService', function ($scope, $location, profileService, userService, googleTagManagerService) {
    	$scope.displayError = false;
    	
    	$scope.promos = [];
        var promoCallback = function(data) {
        	$scope.promos = data;
        };
        
        var centerId = null;
        var profile = {};
        var profileCallback = function(data) {
        	profile = data;
        	$scope.donorProfile = data;
        	if (profile.center !== undefined) {
        		centerId = profile.center.id;
            	profileService.getPromoOptions(centerId, promoCallback);
            } else if(profile.centerId !== undefined)  {
            	centerId = profile.centerId;
            	profileService.getPromoOptions(centerId, promoCallback);
            } else {
            	$scope.displayError = true;
            }
        };
        profileService.getProfile(profileCallback);

        $scope.promoObj = [];
        for (var i = 1; i < $scope.promos.length; i++) {
            $scope.promoObj["_"+$scope.promos[i].id] = false;
        }
        
        var savePromoCallback = function(data) {
        	if (data != null) {
        		profileService.registrationCompleted = true;
        		profileService.clearData();
        		userService.loadLoginResponseAfterRegistration();
        		googleTagManagerService.profileCompleteEvent($scope.donorProfile, $scope.mediaSelections);
        		$location.path('/donor-home');
        	}
        }
        
        $scope.savePromos = function() {
        	var promoSave = [];
        	$scope.mediaSelections = "";
        	angular.forEach($scope.promos, function(promo) {
        		if ($scope.promoObj['_'+promo.id] !== undefined && $scope.promoObj['_'+promo.id]) {
        			promoSave.push(promo);
        			if ($scope.mediaSelections === ""){
        				$scope.mediaSelections += promo.description;
        			} else {
        				$scope.mediaSelections += '|' + promo.description;
        			}
        		}
        	});
        	profileService.savePromos(promoSave, savePromoCallback);
        };
        
        $scope.logout = function() {
        	userService.logout();
        };
    } ]);
    
    bdpAppControllers.controller('DebitCardController', ['$scope', '$location', '$modal', 'profileService', 'userService', function ($scope, $location, $modal, profileService, userService) {
    	var PAGE_LENGTH = 10;
    	$scope.isNonDonor = userService.isNonDonor();
    	//$scope.isNonDonor = false;
        $scope.editDates = false;
        $scope.searched = false;
        $scope.loadingTransactions = false;
        $scope.hasNoDebitCard = false;
        //Begin journal nav controls
        $scope.displayedTransactions = [];
        $scope.page = 0;
        $scope.changePage = function(forward) {
        	if (forward) {
        		if (!$scope.lastPage) {
        			$scope.page++;
        		}
        	}
        	else {
        		if ($scope.page > 0) {
        			$scope.page--;
        		} else {
        			$scope.page = 0;
        		}
        	}
        	updateJournalArray();
        };
        
        var updateJournalArray = function() {
        	if ($scope.citi.journal !== undefined) {
        		var journalLength = $scope.citi.journal.length;
        		var index = PAGE_LENGTH*$scope.page;
        		$scope.lastPage = (index+PAGE_LENGTH > journalLength) ? true : false;
        		$scope.displayedTransactions = [];
        		while (index < journalLength && index < PAGE_LENGTH*$scope.page+(PAGE_LENGTH-1)) {
        			if ($scope.citi.journal[index].transaction_type === 'pos-domestic-purchase'){
        				$scope.citi.journal[index].transaction_type = 'Spend $';
        			}
        			$scope.displayedTransactions.push($scope.citi.journal[index]);
        			index++;
        		}
        	}
        };
        //End journal nav controls
        
        $scope.displayEditDates = function() {
        	$scope.editDates = true;
        };
        
        //Begin datepickers set up
    	$scope.format = 'MMMM-dd-yyyy';
    	$scope.today = new Date();
        $scope.openedFrom = false;
        $scope.openedTo = false;
        $scope.openFrom = function($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	
	        $scope.openedTo = false;
	        $scope.openedFrom = true;
        };
        $scope.openTo = function($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	
	        $scope.openedFrom = false;
	        $scope.openedTo = true;
        };
        //end datepickers set up
        
        var debitCallback = function(data) {
        	$scope.citi = data;
        	if($scope.citi.response !== undefined && $scope.citi.response.code !== undefined && $scope.citi.response.code === 34002) {
        		$scope.hasNoDebitCard = true; 
        	}
        	if($scope.citi.card !== undefined){
        		$scope.citi.card.card_number = "XXXX" + $scope.citi.card.card_number.slice(4);
        	}
        	if ($scope.citi.journal !== undefined && $scope.citi.journal.length < PAGE_LENGTH) {
        		$scope.lastPage = true;
        	}
        	updateJournalArray();        	
        };
        profileService.getDebitInfo(debitCallback);
        
        var transactionCallback = function(data) {
        	$scope.loadingTransaction = false;
        	$scope.citi.journal = data.journal;
        	
        	if ($scope.citi.journal.length < PAGE_LENGTH) {
        		$scope.lastPage = true;
        	}
        	$scope.page = 0;
        	updateJournalArray();
        };
        $scope.submitJournalDates = function() {
        	$scope.searched = true;
        	$scope.loadingTransactions = true;
        	profileService.getNewTransactionInfo($scope.dateFrom, $scope.dateTo, transactionCallback);
        };
        
        $scope.goToCitiLocator = function() {
            var modalInstance = $modal.open({
                templateUrl: 'html/citi-atm-modal.html',
                controller: ['$scope', '$modalInstance',
                function ($scope, $modalInstance) {
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                } ],
                backdrop: 'static'
            });

            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
        };
        
    } ]);
    
    bdpAppControllers.controller('RegistrationController', ['$scope', '$location', 'userService', 'profileService', 'googleTagManagerService', '$rootScope', '$window', function ($scope, $location, userService, profileService, googleTagManagerService, $rootScope, $window) {
    	$scope.focusUsername = true;
    	$scope.isRegistering = false;
    	$scope.showErrorMessage = false;
    	$scope.isLoading = false;
    	$scope.registrationMessage;
    	$scope.showRegistrationMessage = false;
    	$scope.registration = {
    			username : '',
    			password : '',
    			confirmPassword : '',
    			languageId: 1
    	};
    	
    	var errorCallback = function () {
        	$scope.isRegistering = false;
        	$scope.registrationMessage = "Issue logging in after registration, please try logging in again. If the problems still persist, contact your Biolife center for help.";
			$scope.showErrorMessage = true;			
		}

    	var loginSuccessCallback = function (loginResponse) {
			$scope.loginResponse = loginResponse;
	    	$scope.isRegistering = false;	    	
			if (loginResponse != null) {
				if(loginResponse.loggedIn) {
					googleTagManagerService.newDonorRegistrationCompleteAtCenterEvent(loginResponse.donorId);
					googleTagManagerService.successfulLoginEvent(loginResponse.donorId);
					if(loginResponse.isOnShireNetwork){
						FB.logout(function(response){
							console.log("Response after FB.logout()" + response);
							FB.getLoginStatus(function(response) {
								  console.log("Response after FB.getLoginStatus()" + reponse);
							}, true);
						});
	    		    };
					$location.path("/" + loginResponse.loginUrl);
				} else {
					$scope.registrationMessage = "Issue logging in after registration, please try logging in again. If the problems still persist, contact your Biolife center for help.";
					$scope.showErrorMessage = true;
				}	
    		}			
    	};
    	
    	var googleSuccessCallback = function (loginResponse) {
    		loginSuccessCallback(loginResponse);
    		
    		if(loginResponse.loggedIn && loginResponse.onShireNetwork){
    			googleLogout();
    		}
    	};
    	
    	var googleErrorCallback = function () {
    		errorCallback();	
    		googleLogout();
    	};
    	
    	var googleLogout = function (){
    		var auth2 = gapi.auth2.getAuthInstance();
		    auth2.signOut().then(function () {
		      console.log('User signed out.');
		    });
		    auth2.disconnect().then(function () {
		      console.log('User disconnected.');
		    });
    	};
    		
		var facebookSuccessCallback = function (loginResponse) {
			loginSuccessCallback(loginResponse);
    		if(loginResponse.loggedIn && loginResponse.onShireNetwork){
        		facebookLogout();
    		}
    	};
    	
    	var facebookErrorCallback = function () {
    		errorCallback();	
    		facebookLogout();
    	};
    	
    	var facebookLogout = function (){
			FB.logout(function(response){
				console.log("Response after FB.logout()" + response);
				FB.getLoginStatus(function(response) {
					  console.log("Response after FB.getLoginStatus()" + response);
				}, true);
			});		
    	};
    	
    	var donorIdCallback = function(data) {
    		if(data.donorId !== undefined) {
    			googleTagManagerService.newDonorRegistrationSentEvent(data.donorId);    			
    		}
    	};
    	
        var registrationCallback = function(data) {        	
    		$scope.registrationResult = data;    		
    		if(data.responseBoolean && !data.registeringFromCenter){
    			profileService.getDonorId(data.donor.loginId, donorIdCallback);
    			$location.path('/' + data.emailRegistrationURL);
    		}
    		else if(data.responseBoolean && data.registeringFromCenter) {
    			userService.login($scope.registration, loginSuccessCallback, errorCallback);
    		} else {
    			if(!data.responseBoolean){
    				if(data.responseString !== "" && data.responseString !== undefined) {    					
    					$scope.registrationMessage = data.responseString;
    					facebookLogout();
    					googleLogout();
    				} else {
    					$scope.registrationMessage = "Error during registration. Please try again or contact BioLife for support.";
    				}
    				$scope.showErrorMessage = true;
    			}
    		}
        	$scope.isRegistering = false;
        };
    	
        $scope.submit = function() {
        	$scope.showErrorMessage = false;
        	$scope.registrationMessage = "";
			if($window.location.href.indexOf("es.") > -1){
				$scope.registration.languageId = 2;
			}									
        	if($scope.registration.username && $scope.registration.password && $scope.registration.confirmPassword) {
        		if($scope.registration.password === $scope.registration.confirmPassword){        			        		
        			$scope.isRegistering = true;
        			userService.getRegisterDonor($scope.registration, registrationCallback);
        		} else {
        			$scope.registrationMessage = "Password and Confirm Password must match.";
        			$scope.showErrorMessage = true;
        		}
        	}  else {
        		$scope.errorMessage=true;
        	}
        };
        
        var reSendregistrationEmailCallback = function(data) {
        	$scope.isLoading = false;
        	if(data.resendEmailSent) {
				$scope.registrationMessage = "Registration email sent successfully.";
        	} else {
				$scope.registrationMessage = "Error sending email. Please try again or contact BioLife for support.";
        	}
        	$scope.showRegistrationMessage = true;
        };
    	
        $scope.reSendRegistrationEmail= function() {
        	$scope.isLoading = true;
        	$scope.showRegistrationMessage = false;
        	userService.reSendRegistrationEmail(reSendregistrationEmailCallback);        	
        };
        
        var socialMediaRegistrationCallback = function(data, socialMediaType) {        	
    		$scope.registrationResult = data;
    		if (data.accountAlreadyRegistered) {
            	$scope.isRegistering = false;
				$scope.showErrorMessage = true;
				$scope.registrationMessage = data.responseString;
				if(socialMediaType === "Facebook") {
					facebookLogout();
				} else if (socialMediaType === "Google") {
					googleLogout();
				}
    		} else {
    			if(data.responseBoolean) {
    				$scope.login.registering = false;
    				if(socialMediaType === "Facebook") {
    					userService.socialMediaFaceBookLogin($scope.login, facebookSuccessCallback, facebookErrorCallback);
    				} else if (socialMediaType === "Google") {
    					userService.socialMediaGoogleLogin($scope.login, googleSuccessCallback, googleErrorCallback);
    				}
        		} else {
        			if(!data.responseBoolean){
        				if(data.responseString !== "" && data.responseString !== undefined) {   					
        					$scope.registrationMessage = data.responseString;
        				} else if(!data.accountAlreadyRegistered) {
        					$scope.registrationMessage = "Error during registration. Please try again or contact BioLife for support.";
        				}
        				$scope.showErrorMessage = true;
        	        	$scope.isRegistering = false;
        			}
        		}
    		}
    		
        };
        
        $scope.login = {username: '', password: '', remember: '', accessToken: '', registering: false};	   
    	$scope.FBRegisterStatus = function() {
    		$scope.showErrorMessage = false;
    		FB.login(function(response){
				if(response.status === "connected") {
					$scope.isRegistering = true;
					$scope.showErrorMessage = false;
					$scope.login.accessToken = response.authResponse.accessToken;
					$scope.login.registering = true;
				    userService.socialMediaFaceBookRegister($scope.login, socialMediaRegistrationCallback, errorCallback);
				}
			}, 
			{scope: "email"});
    	};
        
      	 $scope.$on('event:google-plus-signin-success', function (event,authResult) {
 		    // Send login to server or save into cookie
      		 $scope.login = { registering: true };
      		 $scope.id_token = authResult.getAuthResponse().id_token;
      		 $scope.login.accessToken = $scope.id_token;
		     console.log('Logged in as: ' + authResult.getBasicProfile().getName());
		     console.log('ID Token is: ' + $scope.id_token);
		      
 			 $scope.isRegistering = true;
         	 $scope.showErrorMessage = false;
		     userService.socialMediaGoogleRegister($scope.login, socialMediaRegistrationCallback, errorCallback);
      	 });
		  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
		    // Auth failure or signout detected
		  });
    } ]);
    
    bdpAppControllers.controller('UpdatePasswordController', ['$scope', 'profileService', function ($scope, profileService) {
    	$scope.changeSuccess = false;
    	$scope.message = null;
    	$scope.newStaffPassword = null;
		$scope.showErrorMessage = false;

    	$scope.newPasswordRequest = {
    			currentPassword : '',
    			newPassword: '',
    			confirmPassword: ''
		};
		
    	var profileCallback = function(data) {
        	$scope.profile = angular.copy(data);
        };
        profileService.getProfile(profileCallback);
    	
        var resetCallback = function(data) {
        	if(data.socialMediaResponseBoolean === true) {
    			$scope.message = "We are unable to update a social media account's password.";
        	}
    		if(data.passwordUpdateResponse === true){
    			profileService.getProfile(profileCallback);
    			$scope.changeSuccess = true;
    			$scope.message = "Password changed successfully.";
    		}else{
    			$scope.message = "Current password entered is incorrect.";
    		}
    	};
        $scope.submit = function() {
        	$scope.showErrorMessage = false;
        	if($scope.newPasswordRequest.newPassword === $scope.newPasswordRequest.confirmPassword){
        		profileService.resetPasswordDonor({password: $scope.newPasswordRequest.newPassword, currentPassword: $scope.newPasswordRequest.currentPassword }, resetCallback);
        	}
        };
        
        var staffPasswordResetCallback = function(data) {
        	profileService.getProfile(profileCallback);
        	if(data === 'Either the BioLife Plasma account was not found or we are unable to update the password for a social media account.') {
        		$scope.data = data;
        		$scope.showErrorMessage = true;
        } else {
        	$scope.newStaffPassword = data;
        	profileService.getProfile(profileCallback);
        }
        };
        $scope.staffPasswordReset = function() {
        	profileService.staffPasswordReset(staffPasswordResetCallback);
        };
    } ]);
    
    bdpAppControllers.controller('UnlinkSocialMediaController', ['$scope', '$modal', 'profileService', function ($scope, $modal, profileService) {
    	$scope.changeSuccess = false;
    	$scope.message = null;
    	$scope.newStaffPassword = null;
		$scope.showErrorMessage = false;
		$scope.linkedToFacebook = false;
		$scope.linkedToGoogle = false;
		$scope.accountUnlinked = false;
		$scope.newTemporaryPassword = undefined;
		$scope.unlinkFailed = false;
		$scope.accountUnlinkSuccess = false;
		$scope.accountUnlinkFailed = false;
		
    	var profileCallback = function(data) {
        	$scope.profile = data;
        	if ($scope.profile.facebookUserId !== undefined) {
        		$scope.linkedToFacebook = true;
        	}
        	if ($scope.profile.googleUserId !== undefined) {        		
        		$scope.linkedToGoogle = true;
        	}
        	if ($scope.profile.facebookUserId === undefined && $scope.profile.googleUserId === undefined) {
        		$scope.linkedToFacebook = false;
        		$scope.linkedToGoogle = false;
        	}
        };
        profileService.getProfile(profileCallback);    	
        
        var unlinkSocialMediaCallback = function(data) {
        	profileService.getProfile(profileCallback);
        	//All temporary passwords are 6 characters in length
        	if(data.length !== 6) {
        		$scope.accountUnlinkFailed = true;
        		$scope.showErrorMessage = true;
        	} else {
        		$scope.accountUnlinkSuccess = true;
        		$scope.newTemporaryPassword = data;
        	}
        };
        
        $scope.unlink = function() {
        	$scope.showErrorMessage = false;
        	$scope.modalDisplay();
        };
        
        $scope.modalDisplay = function() {
    		var modalInstance = $modal.open({
                templateUrl: 'html/modals/unlink-social-media-modal.html',
                controller: ['$scope', '$modalInstance', '$location', 'profileService', 'staffProfileService', 'userService', 
                function ($scope, $modalInstance, $location, profileService, staffProfileService, userService) {
                	var unlinkSocialMediaCallback = function(data) {
                    	profileService.getProfile(profileCallback);
                    	//All temporary passwords are 6 characters in length
                    	if(data.length !== 6) {
                    		$scope.unlinkFailure = true;
                    		$scope.showErrorMessage = true;
                    	} else {
                    		$scope.unlinkSuccess = true;
                    		$scope.newTemporaryPassword = data;
                    	}
                    };
                	
                	$scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirmUnlink = function() {
                    	profileService.staffUnlinkSocialMedia(unlinkSocialMediaCallback);                                                      
                    };
                } ],
                backdrop: 'static'
            });           
            modalInstance.result.then(function (info) {
                console.log("result then");
            });
    	};
    } ]);
    
    bdpAppControllers.controller('NotificationPreferencesController', ['$scope', 'profileService', function ($scope, profileService) {
    	$scope.textAction = 'Save';
    	$scope.emailAction = 'Save';
    	$scope.emailReminderExists = false;
    	$scope.phoneReminderExists = false;
    	$scope.reminderDates = [{id: 1, day:'1 Day'}, {id: 2, day:'2 Days'}];
    	$scope.reminderInfo;
    	$scope.emailReminderInAdvance = "Reminder In Advance";
    	$scope.noEmailReminderSet = false;
    	$scope.noPhoneReminderSet = false;
    	$scope.emailReminder;
    	$scope.textReminder;
    	$scope.emailState = false;
    	$scope.phoneState = false;
    	$scope.canModifyEmailInput = false;
    	$scope.emailIsModifyable = false;
    	$scope.canModifyPhoneInput = false;
    	$scope.phoneIsModifyable = false;
    	$scope.isLoadingEmailData = false;
    	$scope.isLoadingPhoneData = false;
    	$scope.emailResponseMessage = false;
    	$scope.phoneResponseMessage = false;
    	
    	$scope.$watch('emailState', function(newValue, oldValue) {
            if (newValue) {
            	if ($scope.emailReminderExists === false){
            		$scope.canModifyEmailInput = true;
            		$scope.emailIsModifyable = true;
            		$scope.emailResponseMessage = false;
            	}
            } else {
            	$scope.turnEmailOff();
            	$scope.canModifyEmailInput = false;
        		$scope.emailIsModifyable = false;
        		$scope.emailReminder = "Days In Advance";
            }
        });
    	
    	$scope.$watch('phoneState', function(newValue, oldValue) {
            if (newValue) {
            	if ($scope.phoneReminderExists === false){
            		$scope.canModifyPhoneInput = true;
            		$scope.phoneIsModifyable = true;
            		$scope.phoneResponseMessage = false;
            	}
            } else {
            	$scope.turnPhoneOff();
            	$scope.canModifyPhoneInput = false;
        		$scope.phoneIsModifyable = false;
        		$scope.phoneReminder = "Days In Advance";
            }
        });
    	
    	$scope.turnEmailOff = function(){
    		if ($scope.reminderInfo !== undefined){
				$scope.reminderInfo.donorAppointmentReminder.emailAddress = "";
				$scope.reminderInfo.donorAppointmentReminder.emailReminderInAdvanceId = undefined;
    		
				$scope.emailAction = 'Save';
				$scope.emailReminderExists = false;
				$scope.emailIsModifyable = false;
				$scope.donorRequest = {
	        			emailAddress : undefined,
	        			emailReminderInAdvance : undefined,
	        			emailActive : 'N'     			
	    		};
				if ($scope.reminderInfo.donorAppointmentReminder.phoneNumber !== undefined && $scope.textReminder !== undefined && $scope.textReminder.id !== undefined){
        			$scope.donorRequest.contactNumber = $scope.reminderInfo.donorAppointmentReminder.phoneNumber,
        			$scope.donorRequest.phoneReminderInAdvance = $scope.textReminder.id,
        			$scope.donorRequest.phoneActive = 'Y';
        		}
				$scope.isLoadingEmailData = true;
				$scope.emailResponseMessage = false;
		    	$scope.phoneResponseMessage = false;
	        	profileService.notificationPreferencesUpdate($scope.donorRequest, reminderInfoCallback); 
    		}
    	}
    	
    	$scope.turnPhoneOff = function(){
    		if ($scope.reminderInfo !== undefined){
	    		$scope.reminderInfo.donorAppointmentReminder.phoneNumber = "";
				$scope.reminderInfo.donorAppointmentReminder.phoneReminderInAdvanceId = undefined;
				
				$scope.textAction = 'Save';
				$scope.phoneReminderExists = false;
				$scope.phoneIsModifyable = false;
				$scope.donorRequest = {
	        			contactNumber : undefined,
	        			phoneReminderInAdvance : undefined,
	        			phoneActive : 'N'     			
	    		};
				if ($scope.reminderInfo.donorAppointmentReminder.phoneNumber !== undefined && $scope.textReminder.id !== undefined){
        			$scope.donorRequest.emailAddress = $scope.reminderInfo.donorAppointmentReminder.emailAddress,
        			$scope.donorRequest.emailReminderInAdvance = $scope.emailReminder.id,
        			$scope.donorRequest.emailActive = 'Y';
        		}
				$scope.isLoadingPhoneData = true;
				$scope.emailResponseMessage = false;
		    	$scope.phoneResponseMessage = false;
	        	profileService.notificationPreferencesUpdate($scope.donorRequest, reminderInfoCallback); 
    		}
    	}
    	
    	$scope.saveModifyEmail = function() {
        	if ($scope.emailAction === 'Save' && $scope.reminderInfo.donorAppointmentReminder.emailAddress !== "" && ($scope.emailReminder.id !== null && $scope.emailReminder.id !== undefined)){
        		$scope.donorRequest = {        			
            			emailAddress : $scope.reminderInfo.donorAppointmentReminder.emailAddress,
            			emailReminderInAdvance : $scope.emailReminder.id,
            			emailActive : 'Y',
            			contactNumber : '',
            			phoneReminderInAdvance : '',
            			phoneActive : ''
        		};
        		if ($scope.reminderInfo.donorAppointmentReminder.phoneNumber !== undefined && $scope.textReminder !== undefined && $scope.textReminder.id !== undefined) {
        			$scope.donorRequest.contactNumber = $scope.reminderInfo.donorAppointmentReminder.phoneNumber,
        			$scope.donorRequest.phoneReminderInAdvance = $scope.textReminder.id,
        			$scope.donorRequest.phoneActive = 'Y';
        		}
        		$scope.isLoadingEmailData = true;
        		$scope.emailResponseMessage = false;
            	$scope.phoneResponseMessage = false;
            	profileService.notificationPreferencesUpdate($scope.donorRequest, reminderInfoCallback);  
        	}
        	else if ($scope.emailAction === 'Modify') {
    			$scope.emailAction = 'Save';
    			$scope.canModifyEmailInput = true;
    			$scope.emailResponseMessage = false;
            	$scope.phoneResponseMessage = false;
        	}
        }
        
    	
    	$scope.saveModifyText = function(){        	
        	if ($scope.textAction === 'Save' && $scope.reminderInfo.donorAppointmentReminder.phoneNumber !== "" && ($scope.textReminder.id !== null && $scope.textReminder.id !== undefined)){
        		$scope.donorRequest = {        			        		
            			contactNumber : $scope.reminderInfo.donorAppointmentReminder.phoneNumber,
            			phoneReminderInAdvance : $scope.textReminder.id,
            			phoneActive : 'Y',
            			emailAddress : '',
            			emailReminderInAdvance : '',
            			emailActive : ''
        		};
        		if ($scope.reminderInfo.donorAppointmentReminder.emailAddress !== undefined && $scope.emailReminder !== undefined && $scope.emailReminder.id !== undefined){
        			$scope.donorRequest.emailAddress = $scope.reminderInfo.donorAppointmentReminder.emailAddress,
        			$scope.donorRequest.emailReminderInAdvance = $scope.emailReminder.id,
        			$scope.donorRequest.emailActive = 'Y';
        		}
        		$scope.isLoadingPhoneData = true;
        		$scope.emailResponseMessage = false;
            	$scope.phoneResponseMessage = false;
        		profileService.notificationPreferencesUpdate($scope.donorRequest, reminderInfoCallback); 
        	}
        	else if ($scope.textAction === 'Modify') {
        		$scope.textAction = 'Save';
        		$scope.canModifyPhoneInput = true;
        		$scope.emailResponseMessage = false;
            	$scope.phoneResponseMessage = false;
        	}
        }    	    
    	
    	var reminderInfoCallback = function(data) {
        	$scope.reminderInfo = angular.copy(data);
        	if ($scope.isLoadingEmailData && $scope.reminderInfo.responseBoolean){
        		$scope.emailResponseMessage = true;
        		$scope.emailReminder = "Days In Advance";
        	}
        	if ($scope.isLoadingPhoneData && $scope.reminderInfo.responseBoolean){
        		$scope.phoneResponseMessage = true;
        		$scope.textReminder = "Days In Advance";
        	}
        	$scope.isLoadingEmailData = false;
        	$scope.isLoadingPhoneData = false;
        	if ($scope.reminderInfo.donorAppointmentReminder !== undefined){
	        	if($scope.reminderInfo.donorAppointmentReminder.emailAddress !== undefined && $scope.reminderInfo.donorAppointmentReminder.emailAddress !== ""){
	        		$scope.emailReminderExists = true;
	        		$scope.emailState = true;
	        		$scope.emailIsModifyable = true;
	        		$scope.canModifyEmailInput = false;
	            	$scope.emailAction = 'Modify';
	            	
	            	if($scope.reminderInfo.donorAppointmentReminder.emailReminderInAdvanceId === 1){
	            		$scope.emailReminder = {id:1, day:"1 Day"};
	            	} else if ($scope.reminderInfo.donorAppointmentReminder.emailReminderInAdvanceId === 2) {
	            		$scope.emailReminder = {id:2, day:"2 Days"};
	            	}else{
	            		$scope.noEmailReminderSet = true;
	            		$scope.emailReminder = "Days In Advance";
	            	}          	           	
	        	}
	        	
	        	if($scope.reminderInfo.donorAppointmentReminder.phoneNumber !== undefined && $scope.reminderInfo.donorAppointmentReminder.phoneNumber !== ""){
	        		$scope.phoneReminderExists = true;
	        		$scope.phoneState = true;
	        		$scope.phoneIsModifyable = true;
	        		$scope.canModifyPhoneInput = false;
	            	$scope.textAction = 'Modify';  
	            	
	            	if($scope.reminderInfo.donorAppointmentReminder.phoneReminderInAdvanceId === 1){
	            		$scope.textReminder = {id:1, day:"1 Day"};
	            	} else if ($scope.reminderInfo.donorAppointmentReminder.phoneReminderInAdvanceId === 2) {
	            		$scope.textReminder = {id:2, day:"2 Days"};
	            	}else{
	            		$scope.noPhoneReminderSet = true;
	            		$scope.textReminder = "Days In Advance";
	            	}
	        	}
        	}else{
        		$scope.noEmailReminderSet = true;
        		$scope.noPhoneReminderSet = true;
        	}
        };
        profileService.notificationPreferencesLoad(reminderInfoCallback);
    }]);
    
    bdpAppControllers.controller('PasswordWizardController', ['$scope', '$routeParams', '$location', 'profileService', 'userService', function ($scope, $routeParams, $location, profileService, userService) {
    	$scope.dobCheckFailed = false;
    	$scope.updatePassword = false;
    	$scope.displayPasswordMatchError = false;
    	$scope.passwordsChanging = function() {
    		$scope.displayPasswordMatchError = false;
    	};
    	
    	$scope.obj = {
    			dob : null
    	};
    	$scope.dateOfBirthIsOpen = false;
    	$scope.format = 'MMMM-dd-yyyy';
    	$scope.today = new Date();
    	$scope.openDateOfBirth = function($event) {
    		$event.preventDefault();
	        $event.stopPropagation();
	
	        $scope.dateOfBirthIsOpen = true;
    	};
    	$scope.showSuccessMessage = false;
    	var profile = {};
    	var paramCallback = function(data) {
    		profile = data;
    		$scope.loginId = profile.loginId;
    		if (profile.dateOfBirth == undefined) {
				// We can't guarantee a user has entered a DoB before they have
				// forgotten their password
    			// If they don't have one, skip the DoB confirmation step
				$scope.updatePassword = true;
			}
    	};
    	profileService.emailResponseUpdate($routeParams.id, $routeParams.guid, paramCallback);
    	
        $scope.submit = function() {
        	if($scope.obj.dob.getTime() == new Date(profile.dateOfBirth.substring(0,4), (profile.dateOfBirth.substring(5,7) - 1), profile.dateOfBirth.substring(8,10)).getTime()) {
				// date is constructed this way to avoid a conversion from UTC
				// to local time causing a shift by 1 day changing the DOB.
				$scope.updatePassword = true;
			} else {
				$scope.dobCheckFailed = true;
			}
        };
        
        $scope.newPasswordRequest = {
        		newPassword : '',
        		confirmPassword : ''
        };
        var loginCallback = function(loginResponse) {
        	$location.path("/" + loginResponse.loginUrl);
        };        
        var saveCallback = function(donorResponse) {
        	if(donorResponse.responseBoolean === true){
        		$scope.showSuccessMessage = true;
        	}
        	//userService.loginAfterForgotPassword(donorResponse.donorRequest, loginCallback);
        };
        $scope.submitPassword = function() {
        	if ($scope.newPasswordRequest.newPassword != $scope.newPasswordRequest.confirmPassword) {
        		$scope.displayPasswordMatchError = true;
        	} else {
        		profileService.saveNewPassword({loginId: profile.loginId, password : $scope.newPasswordRequest.newPassword}, saveCallback);
        	}
        };
    } ]);
    
    bdpAppControllers.controller('UpdateUsernameController', ['$scope', 'profileService', function ($scope, profileService) {
    	$scope.isLoadingData = true;
    	$scope.displayUsernameUpdate = false;
    	$scope.alreadyRegistered = false;
    	$scope.updateSuccess = false;
    	$scope.noSocialMediaUpdate = false;
    	$scope.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    	$scope.usernameObj = {
    			username : "",
    			newUsername : null,
    			confirmUsername : null
    	}
    	
    	$scope.areUsernamesMatching = true;
    	
    	$scope.toggleUsernameUpdate = function() {
    		$scope.displayUsernameUpdate = true;
    	};
    	
    	var profile = {};
    	var profileCallback = function(data) {
        	profile = data;
        	$scope.usernameObj.username = profile.loginId;
        	$scope.isLoadingData = false;
        };
        profileService.getDonorHomeData(profileCallback);
        
        var loginUpdateCallback = function(data) {
        	if (data.socialMediaResponseBoolean === true && data.socialMediaResponseBoolean !== undefined) {
	        	$scope.noSocialMediaUpdate = true;
        	}
        	if (data.responseBoolean === false && data.responseBoolean !== undefined && socialMediaResponseBoolean === false  && socialMediaResponseBoolean !== undefined) {
	        	$scope.alreadyRegistered = true;
        	}
        	if(data.responseBoolean === undefined) {
	        	$scope.isSaving = false;
	    		$scope.showUpdateCenterMessage = true;
	        	$scope.updateSuccess = true;
	        	profileService.getDonorHomeData(profileCallback);
        	}
        };
        $scope.submit = function() {
        	$scope.noSocialMediaUpdate = false;
        	$scope.updateSuccess = false;
        	$scope.alreadyRegistered = false;
        	if ($scope.usernameObj.newUsername !== null && $scope.usernameObj.newUsername == $scope.usernameObj.confirmUsername) {
        		profile.loginId = $scope.usernameObj.newUsername;
        		profile.loginId = profile.loginId.toLowerCase();
        		profile.emailAddress = profile.loginId.toLowerCase();
	        	profileService.saveLoginId(profile, loginUpdateCallback);
	        	$scope.isLoadingData = true;
        	} else {
        		$scope.areUsernamesMatching = false;
        	}
        };
    } ]);
    
    bdpAppControllers.controller('DeleteProfileController', ['$scope', '$location', '$modal', 'profileService', 'userService', 'staffProfileService', function ($scope, $location, $modal, profileService, userService, staffProfileService){
    	//$scope.isLoadingData = true;
    	if (userService.isLoggedIn() === false){
    		$location.path('/unauthorized');
    	}

    	$scope.hasPDN;
    	$scope.updateSuccess = false;
    	
    	var profileCallback = function(data) {
        	$scope.profile = data;
        	$scope.username = $scope.profile.loginId;
        	if($scope.profile.pdn != null) {
        		$scope.hasPDN = true;
        	}
        };
        profileService.getDonorHomeData(profileCallback);

        var deleteProfileCallback = function(data) {
        	if(data.responseString === "Successfully deleted profile."){
        		staffProfileService.searchDonor = undefined;
        		$scope.display();
        	}
        	//$scope.updateSuccess = true;
        };
        
        $scope.display = function(){
        	$scope.modalDisplay();
        }
        
        $scope.deleteProfile = function() {
    		$scope.donor = {
    			id: $scope.profile.id,
    			loginId: $scope.profile.loginId
    		}
        	profileService.deleteDonorProfile($scope.donor, deleteProfileCallback);
        };
        
        $scope.modalDisplay = function() {
    		var modalInstance = $modal.open({
                templateUrl: 'html/delete-profile-modal.html',
                controller: ['$scope', '$modalInstance', '$location', 'profileService', 'staffProfileService', 'userService', 
                function ($scope, $modalInstance, $location, profileService, staffProfileService, userService) {
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                        if(userService.isManager()){
                        	$location.path('/manager-home');
                        }
                        if(userService.isStaff()){
                        	$location.path('/staff-home');
                        }
                    };
                } ],
                backdrop: 'static'
            });           
            modalInstance.result.then(function (info) {
                //$scope.donorInfo = info;
                console.log("result then");
            });
    	}        
    } ]);
    
    bdpAppControllers.controller('DonorDonationCenterController', ['$scope', '$location', 'profileService', 'userService', function ($scope, $location, profileService, userService) {
    	$scope.hasPDN = false;
    	$scope.centerDisplay = "";
    	$scope.centerSet = false;
    	$scope.isDonor = userService.isDonor();
    	$scope.isNonDonor = userService.isNonDonor();
    	$scope.updateCenterMessage = "";
    	$scope.showUpdateCenterMessage = false;
    	$scope.isSaving = false;
    	$scope.profile;
    	$scope.showCenterSelectMessage = false;
    	$scope.consolidatedMessage = "Please contact your current center to change to this location.";
    	$scope.zipCodeMessage = "Please choose a center near your zip code or update your zip code on the Donor Information page of your profile."
    	$scope.showConsolidatedMessage = false;
    	$scope.showZipCodeMessage = false;
    	$scope.possibleCenters = [];
        
    	var zipCodeCallback = function(data) {
    		$scope.possibleCenters = data;
    	};    	
        
        var profileCallback = function(data) {
        	$scope.profile = data;
        	//profileService.getCentersFromDonorZip($scope.profile.zipCode, zipCodeCallback);
        	if ($scope.profile.center !== undefined) {
            	$scope.centerDisplay = ' ' + $scope.profile.center.state.description + ' - ' + $scope.profile.center.city;
            }
        	/*if($scope.profile.pdn != undefined && $scope.isDonor === true) {
        		$scope.hasPDN = true;
        	}*/     	
        };        
        profileService.getProfile(profileCallback);
        
        $scope.centerZipCodeCheck = function(centerId) {
        	$scope.eligibleCenter = false;
        	if($scope.possibleCenters.centers.length > 0) {
				angular.forEach($scope.possibleCenters.centers, function(center){
					if(center.id === centerId){
						$scope.eligibleCenter = true;
						return $scope.eligibleCenter;	        						        				
					}
				});
				return $scope.eligibleCenter;
        	}
    		return $scope.eligibleCenter;
		};
        
        $scope.updateCenter = function(item, model, label) {
        	$scope.showCenterSelectMessage = false;
        	$scope.showConsolidatedMessage = false;
        	$scope.showZipCodeMessage = false;
        	if(item.isState) {
        		$scope.showCenterSelectMessage = true;
        		$scope.centerSet = false;
        		$scope.centerDisplay = "";
        		$scope.profile.centerId = undefined;
        	} else {
        		$scope.centerSet = true;
        		//Donor without PDN update
        		if ($scope.isDonor){
		    		if ($scope.profile.pdn === undefined) {
		    			/*$scope.showZipCodeMessage = !$scope.centerZipCodeCheck(item.centerId);
		    			if(!$scope.showZipCodeMessage) {
		    				$scope.centerSet = true;
			            	label = "";
			            	$scope.centerDisplay = ' '+item.state + ' - ' + item.name;
			            	$scope.profile.centerId = item.centerId;
		    			}*/
		    			$scope.centerSet = true;
		            	label = "";
		            	$scope.centerDisplay = ' '+item.state + ' - ' + item.name;
		            	$scope.profile.centerId = item.centerId;
		    		} else {
		        		//Donor with PDN update 
		        		/*if ($scope.profile.pdn !== undefined && item.isConsolidated) {
			        		$scope.centerSet = true;
			            	label = "";
			            	$scope.centerDisplay = ' '+item.state + ' - ' + item.name;
			            	$scope.profile.centerId = item.centerId;
		        		} else {        			
		        			$scope.showConsolidatedMessage = true;        			    
		        		}*/
		        		$scope.showConsolidatedMessage = true; 
		    		}
        		} else {
        			$scope.centerSet = true;
	            	label = "";
	            	$scope.centerDisplay = ' '+item.state + ' - ' + item.name;
	            	$scope.profile.centerId = item.centerId;
        		}
        	}   	
        };
    	
        var updateDonationCenterCallback = function(data) {
        	if (data.responseBoolean === true) {
        		$scope.updateCenterMessage = "Center updated successfully!";
        	}
        	if (data.responseBoolean === false) {
        		$scope.updateCenterMessage = "Error updating center, please try again.";
        	}
        	$scope.isSaving = false;
    		$scope.showUpdateCenterMessage = true;
        };
        
    	$scope.updateDonationCenter = function() {
    		$scope.showUpdateCenterMessage = false;
    		$scope.isSaving = true;
    		$scope.updateCenterMessage = "";
    		if($scope.isDonor === true) {
    			profileService.updateDonorCenter($scope.profile, updateDonationCenterCallback);
    		}
    		if($scope.isNonDonor === true) {
    			profileService.staffUpdatedDonorCenter($scope.profile, updateDonationCenterCallback);
    		}
    	};      
    } ]);

    bdpAppControllers.controller('DonationCenterController', ['$scope', '$location', '$filter', 'centerService', function ($scope, $location, $filter, centerService) {
    	$scope.isLoadingData = true;
        $scope.showHours = false;
        $scope.today = new Date().setHours(0, 0, 0, 0);
    	$scope.today = new Date($scope.today).getTime();
    	$scope.imgPath = undefined;
    	moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
		        LTS: "h:mm:ss A",
		        L: "MM/DD/YYYY",
		        LL: "MMMM Do YYYY",
		        LLL: "MMM Do LT",
		        LLLL: "dddd, MMMM Do YYYY LT"
		    }
		})
        var successCallback = function(centerObject) {
            var center = {
            	alias : centerObject.alias,
                addressLine1: centerObject.addressLine1,
                city: centerObject.city,
                state: centerObject.state.code,
                zip: centerObject.zipCode,
                openingDate : centerObject.openingDate,
                displayDate : new Date(centerObject.openingDate).getTime(),
                relocation : undefined,
                reloDate : undefined,
                reloDisplayDate : undefined,
                phone: $filter('phone')(centerObject.phoneNumber),
                days: new Array(),
                donorMessages: new Array(),
                newsMessage: undefined
            };
          //relocationDate, set if not undefined in centerObject`
            if(centerObject.centerRelocations.length > 0) {
            	center.relocation = centerObject.centerRelocations[0];
            	if(centerObject.centerRelocations[0].relocationDate !== undefined) {
            	center.reloDate = new Date(centerObject.centerRelocations[0].relocationDate).getTime();
            	center.reloDisplayDate = moment(centerObject.centerRelocations[0].relocationDate).format('LL');;
            	}
            }
            if(centerObject.messages !== []) {
            	centerObject.messages.forEach(function (message) {
            		if(message.messageTypeId >= 4) {
            			//Remove "Message" at end of each heading
            			var heading = message.messageType.description.substring(0, message.messageType.description.length -7);
            			center.newsMessage = {heading: heading, description:message.description};
            		}
            	});
            }
            //
            center.map = {
                center: {
                    latitude: centerObject.latitude,
                    longitude: centerObject.longitude
                },
                zoom: 14,
                marker: {
                    id: 0,
                    coords: {
                        latitude: centerObject.latitude,
                        longitude: centerObject.longitude
                    }
                }
            };

            centerObject.hoursOfOperations.forEach(function (dayOperation) {
                var day = {
                    name: dayOperation.weekday.description,
                    isOpen: dayOperation.closed === 'N',
                    isClosed: dayOperation.closed === 'Y',
                    openingTime: $filter('hours')(dayOperation.openingTime),
                    closingTime: $filter('hours')(dayOperation.closingTime),
                    playroomOpeningTime: $filter('hours')(dayOperation.playroomOpeningTime),
                    playroomClosingTime: $filter('hours')(dayOperation.playroomClosingTime),
                    isPlayroomOpen: dayOperation.playroomClosed === 'N',
                	isPlayroomClosed: dayOperation.playroomClosed === 'Y',
                    weekday: dayOperation.weekdayNumber 
                };
                center.days.push(day);
            });
            
            centerObject.messages.forEach(function (message) {
                if (message.messageTypeId == 1) { // only donor messages
                    center.donorMessages.push(message.description);
                }
            });

            $scope.center = center;
            $scope.center.displayDate = new moment($scope.center.displayDate).format('LLLL');
            $scope.threeMonthsAfterOpening = $scope.center.openingDate + (3 * 2592000000);
            $scope.isLoadingData = false;
            
            // Local imgs
            /*
			 * $scope.imgPath = 'r/assets/imgs/center_' +
			 * centerObject.state.code + '-' + centerObject.alias.replace(/[\.
			 * -]+/g, "").toLowerCase() + '.jpeg';
			 */
            /*
			 * Teamsite Content --- Need to tell Melissa what naming conventinon
			 * is needed for each image
			 */
            $scope.imgPath = 'https://www.prod.biolifeplasma.com/assets/imgs/center_' + centerObject.state.code + '-' + centerObject.alias.replace(/[\. -]+/g, "").toLowerCase() + '.jpeg';
            $scope.imgPath = $scope.imgPath.trim();
            
            // OpeningDate
            if($scope.center.openingDate !== undefined) { 
				var momentDate = moment($scope.center.openingDate).format('LL');
				var date = new Date($scope.center.openingDate).getTime();
				$scope.center.openingDate = {jsDate:date, momentJSDate: momentDate};
			}
        };
        
        $scope.compute3MonthsAfterOpenDate = function(date){
	    	return date + (3 * 2592000000);
	    }

        var centerId = $location.search()['centerId'];
        centerService.loadDonationCenterInfo(centerId, successCallback);
    } ]);
    
    bdpAppControllers.controller('SchedulePreferencesController', ['$scope', 'profileService', 'userService', function ($scope, profileService, userService) {
    	$scope.isSaving = false;
    	$scope.displayPreferencesSuccessMessage = false;
    	$scope.displayPreferencesErrorMessage = false;
    	$scope.updateSuccess = false;
    	$scope.numberOfKids = 0;
    	$scope.kidsNumberRange = [1,2,3,4,5,6];
    	$scope.needsPlayroom = {
    		boolean : false
    	};
    	$scope.donorRequest = {        			
    		numberOfChildrenForDayCare : undefined
		};
    	$scope.successMessage = "Schedule preferences saved successfully!";
    	$scope.errorMessage = "Error saving schedule preferences!";
    	
    	var profileCallback = function(data) {
    		$scope.donorData = data;
    		if($scope.donorData.numOfChildrenForDaycare > 0) {
        		$scope.needsPlayroom.boolean = true;                		
        	}
        };
        profileService.getProfile(profileCallback);
    	
    	/*if(profileService.profile !== undefined) {
    		$scope.donorData = profileService.profile;
    		if($scope.donorData.numOfChildrenForDaycare > 0) {
        		$scope.needsPlayroom.boolean = true;	                		
        	}
    	} else {
    		profileService.getProfile(profileCallback);
    	}*/
    	
    	$scope.$watch('needsPlayroom.boolean', function (newVal, oldVal) {
    		//User clicked No
    		if (!newVal) {
    			if($scope.donorData !== undefined) {
        			$scope.donorData.numOfChildrenForDaycare = 0;
    			}
    		}
    		//User clicked from No to Yes and we need to default the dropdown to 1 since their donor record does not have a numOfChildrenForDaycare value
    		if (newVal && $scope.donorData !== undefined && $scope.donorData.numOfChildrenForDaycare === 0) {
    			$scope.numberKidsChange(1);
    		//User clicked from No to Yes and has a default numOfChildrenForDaycare value already - for page load
    		} else if (newVal && $scope.donorData !== undefined && $scope.donorData.numOfChildrenForDaycare > 0) {
    			$scope.numberKidsChange($scope.donorData.numOfChildrenForDaycare);
    		}
    	});
       
    	$scope.numberKidsChange = function(number) {
    		if (number > 0) {
        		$scope.numberOfKids = number;
    			$scope.donorData.numOfChildrenForDaycare = number;         		        	
    		}
    	};    	    	
        
        var saveSchedulePreferencesCallback = function(data) {
        	if (data.responseBoolean) {
        		$scope.donorData = data.donor;
            	//profileService.profile = data.donor;        	
            	$scope.isSaving = false;
            	$scope.displayPreferencesSuccessMessage = true;
        	} else {        	
            	$scope.isSaving = false;
            	$scope.displayPreferencesErrorMessage = true;
        	}        	
        };
        
        $scope.savePreferences = function() {
        	$scope.donorRequest.numberOfChildrenForDayCare = $scope.donorData.numOfChildrenForDaycare;        	
        	$scope.displayPreferencesErrorMessage = false;
        	$scope.displayPreferencesUpdateSuccessMessage = false;
        	profileService.schedulePreferencesUpdate($scope.donorData, saveSchedulePreferencesCallback);
        	$scope.isSaving = true;
        };
        
    } ]);

    bdpAppControllers.controller('ScheduleNowController', ['$rootScope', '$scope', '$location', '$anchorScroll', '$modal', '$window','appointmentService', 'userService', 'profileService', 'googleTagManagerService', 'centerService', function ($rootScope, $scope, $location, $anchorScroll, $modal, $window, appointmentService, userService, profileService, googleTagManagerService, centerService) {
    	$scope.dateSelected = null;
    	$scope.donationType = null;
    	// This is used within the calendar directive. To see this refer to
		// schedule-now.html line 7.
    	$scope.reloadCalendar;
    	$scope.isLoadingCalendar = true;    	
        $scope.userType;
        $scope.showSchedule = true;
        $scope.bookSuccess = false;
        $scope.bookFailure = false;
        $scope.hideUpcomingAppointmentsFlag = true;
        $scope.initialCalendarLoad = true;
        $scope.isXSDevice;
        $scope.isDateSelected;
        $scope.isDeferred = false;
        $scope.donor = profileService.profile;
        $scope.showCenterSelector = false;
        $scope.currentCenter = '';
        $scope.chosenCenter;
        $scope.hasPdn = false;
        $scope.centersForDropdown = [];
        $scope.allowCenterUpdate = false;
        
        if (userService.isDonor()) {
            $scope.userType = "donor";
        } else {
            $scope.userType = "staff-manager";
        }
        
        var donorDisDeferralCallback = function(data) {
        	if(data !== undefined && data.donorDisDeferral !== undefined && data.donorDisDeferral.length > 0) {
        		if(data.donorDisDeferral[0].permanentYNFlag === 'N' && data.donorDisDeferral[0].endDate !== undefined && ((new moment(data.donorDisDeferral[0].endDate).valueOf() - new moment().hour(0).minute(0).second(0).millisecond(0).valueOf()) <= ($rootScope.daysToSuppressSchedulingMessage * 86400000))) {        			        		
        		  //Do not show modal panel
        		} else {
        			$scope.centerAddress = $scope.centerAddressConcatenation($scope.donor.center);
	        		
	        		var modalInstance = $modal.open({
	                    templateUrl: 'html/donor/appointments/donor-deferral-modal.html',
	                    scope: $scope,
	                    controller: ['$modalInstance',
	                    function ($modalInstance) {
	                    	
	                    	$scope.cancel = function () {
	                    		$location.path("/donor-home");
	                            $modalInstance.dismiss('cancel');                            
	                        };                       
	                        
	                    } ],
	                    backdrop: 'static'
	                }); 
        		}
        	}
        };
        
        var profileCallback = function(data) {
			$scope.donor = data;
			if ($scope.donor.pdn !== undefined && $scope.donor.pdn !== null) {
				$scope.hasPdn = true;
			}
			$scope.currentCenter = $scope.donor.center.alias + ', ' + $scope.donor.center.state.code; 
			if($scope.userType === "donor" && ($scope.donor.pdn !== undefined && $scope.donor.pdn !== null)) {
				profileService.getDonorDisDeferral($scope.donor.pdn, donorDisDeferralCallback);
			}
        };
        profileService.getProfile(profileCallback);
                        
        /*if(profileService.profile !== undefined && profileService.profile.center.state !== undefined) {
        	$scope.donor = profileService.profile;
			if($scope.userType === "donor" && ($scope.donor.pdn !== undefined && $scope.donor.pdn !== null)) {
				profileService.getDonorDisDeferral($scope.donor.pdn, donorDisDeferralCallback);
			}
    	} else {
    		profileService.getProfile(profileCallback);
    	}*/               
        
        $scope.centerAddressConcatenation = function(center) {
        	var addressString = center.addressLine1;
        	if(center.addressLine2 !== undefined) {
        		addressString += ' ' + center.addressLine2;
			}
    		return addressString += ' ' + center.city + ', ' + center.state.code + ' ' + center.zipCode;        	
        };                                                     
                               
        $scope.$watch('isXSDevice', function(newVal, oldVal) {
        	$scope.isXSDevice = newVal;
        	if(newVal && $scope.isDateSelected) {
	        	$('html, body').animate({
	                scrollTop: $('#appointmentSlots').offset().top
	            }, 200);
        	}
        });
        
        $scope.scrollToCalendar = function(){
        	$('html, body').animate({
                scrollTop: $('#donorCalendar').offset().top
            }, 200);
        };                
        
        var upcomingApppointmentsListCallback = function (myAppointmentsControllerResponse) {
			$scope.myAppointmentsControllerResponse = myAppointmentsControllerResponse;
		};
		profileService.getUpcomingAppointments($scope.userType, upcomingApppointmentsListCallback);
        
        if(appointmentService.donorScheduleAppointmentResponse !== undefined) {
        	appointmentService.donorScheduleAppointmentResponse = undefined;
        }
        
        $scope.reloadCalendarDirectiveBoolean = function(){
        	$scope.reloadCalendar = true;
        	profileService.getUpcomingAppointments($scope.userType, upcomingApppointmentsListCallback);
        };
        
        $scope.showUpcomingAppointments = function() {
        	$scope.hideUpcomingAppointmentsFlag = !($scope.hideUpcomingAppointmentsFlag);
        }
        
        $scope.updateCenter = function(item, model, label) {
        	$scope.showCenterSelectMessage = false;
        	$scope.chosenCenter = item.centerId;
        	if(item.isState) {
        		$scope.showCenterSelectMessage = true;
        		$scope.centerSet = false;
        		$scope.centerDisplay = "";
        		$scope.allowCenterUpdate = false;
        	} else {
        		$scope.centerSet = true;
            	label = "";
            	$scope.centerDisplay = ' '+item.state + ' - ' + item.name;
            	if($scope.chosenCenterId !== $scope.donor.centerId){
            		$scope.allowCenterUpdate = true;
        		} else {
        			$scope.allowCenterUpdate = true;
        		}
        	}        	
        };
    	
        /*var updateHomeCenterCallback = function(data) {
        	if (data.responseBoolean === true) {
        		$scope.updateCenterMessage = "Center updated successfully!";
        	}
        	if (data.responseBoolean === false) {
        		$scope.updateCenterMessage = "Error updating center, please try again.";
        	}
        	$scope.isSaving = false;
    		$scope.showUpdateCenterMessage = true;
        };
        
    	$scope.updateHomeCenter = function() {
    		if($scope.isDonor === true) {
    			profileService.updateDonorCenter($scope.profile, updateHomeCenterCallback);
    		}    		
    	};*/
                        
        $scope.modifyAppointment = function(appointment) {
        	$scope.oldAppt = appointment;
        	$scope.apptDate = appointment.appointmentDateTimeDisplay.substring(0,10);
        	$scope.apptTime = appointment.appointmentDateTimeDisplay.substring(11,19);
        	appointmentService.appointmentItem.appointmentId = appointment.appointmentId;
        	$scope.children = appointment.numberOfChildren;
        	$scope.apptType = appointment.appointmentType;
        	appointmentService.appointmentItem.appointmentTypeId = appointment.appointmentTypeId;
        	appointmentService.appointmentItem.appointmentDateString = appointment.appointmentDateTime;
        	appointmentService.appointmentItem.appointmentDateTime = appointment.appointmentDateTimeDisplay;
        	
        	var cancelMe = function() {
    			$scope.isCanceled = true;   		
        	}
        	
        	var closeModal = function () {
                $modalInstance.dismiss('cancel');
            };
                    
        	var modalInstance = $modal.open({
                templateUrl: 'html/donor/appointments/modify-appointment-modal.html',
                scope: $scope,
                controller: ['$scope', '$modalInstance', '$route','profileService', 'appointmentService',
                function ($scope, $modalInstance, $route,profileService, appointmentService) {
                	$scope.showCancelInformation = false;
                	$scope.isCanceling = false;
                	$scope.showCancelSuccessMessage = false;
                	$scope.showCancelErrorMessage = false;
                	$scope.cancelSuccess = function() {
                    	if($scope.cancelData.cancelAppointmentResponse === 'Success, the appointment was cancelled') {
                    			$scope.isCancelSuccess = true;
                    	}
                    }
                	
                	$scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    	$route.reload();
                    };
                    
                    $scope.rescheduleAppointment = function() {
                    	$modalInstance.dismiss('cancel');
                    	$location.path('/appointments/reschedule-appointment');
                    };
                    
                    var upcomingApppointmentsListCallback = function (myAppointmentsControllerResponse) {
            			$scope.myAppointmentsControllerResponse = myAppointmentsControllerResponse;
            		}
            		
                    $scope.cancelAppt = function() {                    	                    	
                    	var modifyCallback = function(data) {                    		
                        	appointmentService.donorModifyAppointmentResponse = data;
                        	$scope.cancelInfo = appointmentService.donorModifyAppointmentResponse;
                        	$scope.isLoadingApptModify = false;
                        	$scope.isCanceling = true;
                        	profileService.getUpcomingAppointments($scope.userType, upcomingApppointmentsListCallback);
                        }
                    	$scope.isLoadingApptModify = true;
                    	appointmentService.modifyAppointment(appointmentService.appointmentItem, modifyCallback);                   	
                    };
                    
                    var upcomingApptsCallback = function(data) {
                    	$scope.upcomingDonations = data.upcomingDonationAppointmentsList;
                    	if ($scope.upcomingDonations !== undefined) {
	                    	if ($scope.upcomingDonations.length > 0) {
	                    		$scope.hasDonationAppt = true;
	                    	}	
                    	}
                    	$scope.upcomingPhysical = data.upcomingPhysicalAppointmentsList;
                    	if ($scope.upcomingPhysical !== undefined) {
	                    	if ($scope.upcomingPhysical.length > 0) {
	                    		$scope.hasPhysicalAppt = true;
	                    	}
                    	}
                    };
                                    
                    var confirmCancelCallback = function(data) {
                    	$scope.cancelData = data;
                    	if($scope.cancelData.cancelAppointmentResponse === 'Success, the appointment was cancelled') {
                    		$scope.showCancelSuccessMessage = true;                    
                    		profileService.getUpcomingAppointments('donor', upcomingApptsCallback);
                    	} else {
                    		$scope.showCancelErrorMessage = true;
                    	}                    		
                    };
                    
                    $scope.confirmCancelAppt = function() {
                    	appointmentService.cancelAppointment(appointmentService.appointmentItem, confirmCancelCallback);
                    };               
                } ],
                backdrop: 'static'
            });
        }
        
        $scope.executeGoogleTagManagerCall = function(eventData) {
        	googleTagManagerService.appointmentCreatedEvent(eventData);
        };
        
        var loadCentersCallback = function(data) {			
			$scope.centers = data;			
			angular.forEach($scope.centers, function(center) {   			
       			if(center.name !== center.state) {
       				$scope.centersForDropdown.push(center);
       			}           			
       		});
		}
		centerService.loadStatesAndCenters(loadCentersCallback);
		
		/*$scope.$watch('donationType', function (newVal, oldVal) {
    		console.log("hit it");
    	});*/
        
    } ]);
    
    bdpAppControllers.controller('RescheduleAppointmentController', ['$scope', '$location', '$modal', 'appointmentService', 'userService', 'profileService', function ($scope, $location, $modal, appointmentService, userService, profileService) {
        $scope.dateSelected = null;
        $scope.donationType = null;
        $scope.rescheduleSuccess = false;
        $scope.rescheduleFailure = false;
        $scope.isRescheduling = false;
        $scope.showSelectedDayXSScreen = false;
        $scope.showPrevDayXSScreen = false;
        $scope.showNextDayXSScreen = false;
        $scope.reloadCalendar;
        $scope.isLoadingCalendar;
        $scope.needsPlayroom;
        $scope.numberOfKids;
        $scope.isXSDevice;
        $scope.isDateSelected;
        $scope.hasPdn = false;
        $scope.isDonor;
        
        $scope.isLoadingData = true;
        
        if (userService.isDonor()) {
            $scope.userType = "donor";
            $scope.isDonor = true;
        } else {
            $scope.userType = "staff-manager";
            $scope.isDonor = false;
        }
        
        var donorDisDeferralCallback = function(data) {
        	if(data !== undefined && data.donorDisDeferral !== undefined && data.donorDisDeferral.length > 0) {
        		angular.forEach(data.donorDisDeferral, function(deferral) {   			
           			if(deferral.permanentYNFlag === 'N' && deferral.endDate === undefined) {
           				$scope.centerAddress = $scope.centerAddressConcatenation($scope.donor.center);
           				var modalInstance = $modal.open({
                            templateUrl: 'html/donor/appointments/donor-deferral-reschedule-modal.html',
                            scope: $scope,
                            controller: ['$modalInstance',
                            function ($modalInstance) {
                            	
                            	$scope.cancel = function () {
                            		$location.path("/donor-home");
                                    $modalInstance.dismiss('cancel');                            
                                };                       
                                
                            } ],
                            backdrop: 'static'
                        });
           				data.donorDisDeferral = [];
           			};           			
           		});        		        		        		        		        		
        	}
        };
        
        var profileCallback = function(data) {
			$scope.donor = data;
			if ($scope.donor.pdn !== undefined && $scope.donor.pdn !== null) {
				$scope.hasPdn = true;
			}
			if($scope.userType === "donor" && ($scope.donor.pdn !== undefined && $scope.donor.pdn !== null)) {
				profileService.getDonorDisDeferral($scope.donor.pdn, donorDisDeferralCallback);
			}
        };
        profileService.getProfile(profileCallback);
                        
        /*if(profileService.profile !== undefined && profileService.profile.state !== undefined) {
        	$scope.donor = profileService.profile;
			if($scope.userType === "donor" && ($scope.donor.pdn !== undefined && $scope.donor.pdn !== null)) {
				profileService.getDonorDisDeferral($scope.donor.pdn, donorDisDeferralCallback);
			}
    	} else {
    		profileService.getProfile(profileCallback);
    	}*/               
        
        $scope.centerAddressConcatenation = function(center) {
        	var addressString = center.addressLine1;
        	if(center.addressLine2 !== undefined) {
        		addressString += ' ' + center.addressLine2;
			}
    		return addressString += ' ' + center.city + ', ' + center.state.code + ' ' + center.zipCode;        	
        };
        
        $scope.$watch('isXSDevice', function(newVal, oldVal) {
        	$scope.isXSDevice = newVal;
        	if(newVal && $scope.isDateSelected) {
	        	$('html, body').animate({
	                scrollTop: $('#rescheduleAppointmentTimeslots').offset().top
	            }, 200);
        	}
        });
        
        $scope.scrollToCalendar = function(){
        	$('html, body').animate({
                scrollTop: $('#rescheduleDonorCalendar').offset().top
            }, 200);
        };
        
        var modifyCallback = function(data) {
    		$scope.isLoadingData = false;
    		appointmentService.donorModifyAppointmentResponse = data;
    		$scope.modifyApptInfo = data;
    		$scope.timeSlots = $scope.modifyApptInfo.appointmentList;
    		$scope.numberOfSlots = $scope.timeSlots.length;
    		$scope.prevDate = $scope.modifyApptInfo.prevDateValue.substring(0, 11);	        	
        	$scope.selectedDate = $scope.modifyApptInfo.selectedDateValue.substring(0, 11);
        	$scope.nextDate = $scope.modifyApptInfo.nextDateValue.substring(0, 11);
        	$scope.showSelectedDayXSScreen = true;
        	
        	if($scope.modifyApptInfo.childCareRequired === "Y" && $scope.modifyApptInfo.iChildren > 0){
        		$scope.needsPlayroom = true;
        		$scope.numberOfKids = $scope.modifyApptInfo.iChildren;
        	} else {
        		$scope.needsPlayroom = false;
        		$scope.numberOfKids = 0;
        	}
        };
    	appointmentService.modifyAppointment(appointmentService.appointmentItem, modifyCallback);
        $scope.oldAppt = appointmentService.appointmentItem;
        $scope.newAppt;
    } ]);
    
    bdpAppControllers.controller('StaffModifyAppointmentController', ['$scope', '$location', '$modal', 'userService', 'appointmentService', function ($scope, $location, $modal, userService, appointmentService) {
        $scope.dateSelected = null;
        $scope.donationType = null;
        $scope.rescheduleSuccess = false;
        $scope.rescheduleFailure = false;
        $scope.isRescheduling = false;
        $scope.reloadCalendar;
        $scope.isLoadingCalendar;
        $scope.needsPlayroom = false;
        $scope.numberOfKids;
        $scope.showCalendarLegend = false;
        $scope.isLoading = true;
        $scope.showPlayroomOptions = false;
        $scope.kidsNumberRange = ["0","1","2","3","4","5","6"];
        $scope.modalContext = "";
        $scope.dateString = appointmentService.staffModifyAppointmentItem.appointmentDateString;
    	$scope.modifyInfo = undefined;
    	$scope.dt = appointmentService.calendarDate;
        
    	var selectedDayDetailsCallback = function(data){
    		$scope.isLoading = false;
    		appointmentService.staffModifyAppointmentResponse = data;
    		$scope.modifyInfo = data;
    		$scope.prevDateValue = $scope.modifyInfo.prevDateValue.substring(0, 11);	        	
        	$scope.selectedDateValue = $scope.modifyInfo.selectedDateValue.substring(0, 11);
        	$scope.nextDateValue = $scope.modifyInfo.nextDateValue.substring(0, 11);
        	if(appointmentService.staffModifyAppointmentResponse.childCareRequired === "Y"){
        		$scope.needsPlayroom = true;
        		$scope.numbersOfKids = appointmentService.staffModifyAppointmentResponse.numberOfChildren;
        	}
    	};
    	
		$scope.$watch('dt', function(newVal, oldVal) {
			if($scope.modifyInfo !== undefined) {
	        	$scope.isLoading = true;
	        	$scope.dt = newVal;
	        	appointmentService.staffModifyAppointmentResponse.selectedDate = $scope.dt;
	        	appointmentService.staffModifyAppointmentSelectedDayDetails(appointmentService.staffModifyAppointmentResponse, selectedDayDetailsCallback);
			}
        });
    	
        var staffModifyCallback = function(data) {
    		$scope.isLoading = false;
    		appointmentService.staffModifyAppointmentResponse = data;
    		$scope.modifyInfo = data;
    		$scope.prevDateValue = $scope.modifyInfo.prevDateValue.substring(0, 11);	        	
        	$scope.selectedDateValue = $scope.modifyInfo.selectedDateValue.substring(0, 11);
        	$scope.nextDateValue = $scope.modifyInfo.nextDateValue.substring(0, 11);
        	if(appointmentService.staffModifyAppointmentResponse.childCareRequired === "Y"){
        		$scope.needsPlayroom = true;
        		$scope.numberOfKids = appointmentService.staffModifyAppointmentResponse.numberOfChildren;
        	}
        };
    	appointmentService.staffModifyAppointmentInitialization(appointmentService.staffModifyAppointmentItem, staffModifyCallback);
    	    	    	
    	$scope.rowHeight = function(rowSpan) {
    		var rowHeight = rowSpan * 30;
    		return { height: rowHeight+'px' };
    	};
        
        $scope.showPlayroomOptions = function(){
 	        var modalInstance = $modal.open({
 	            templateUrl: 'html/manager/appointments/staff-modify-appointment-playroom-modal.html',
 	            controller: ['$scope', '$modalInstance', '$location', 'appointmentService',
 	            function ($scope, $modalInstance, $location, appointmentService) {
 	            	$scope.showSuccessMessage = false;
 	            	$scope.showFailureMessage = false;
 	            	$scope.modalContext = "playroomOptions";
 	               
 	               //CHILDREN VALUE
 	               var staffModifyValueChangedChildrenCallback = function(data){
 	               	$scope.modifyInfo = data;
 	               	appointmentService.staffModifyAppointmentResponse = data;
 	               	$scope.isLoading = false;
 	               };
 	                                  	              
 	               //PLAYROOM
 	               var staffModifyNeedToUsePlayRoomCallback = function(data){
 	               	$scope.modifyInfo = data;
 	               	appointmentService.staffModifyAppointmentResponse = data;
 	               };
 	            
 	               $scope.$watch('needsPlayroom', function (newVal, oldVal) {
 	            		if (!newVal) {
 	            			appointmentService.staffModifyAppointmentResponse.numberOfChildren = 0;
 	            			appointmentService.staffModifyAppointmentResponse.childCareRequired = 'N';
 	            			appointmentService.staffModifyAppoiontmentValueChangedChildcare(appointmentService.staffModifyAppointmentResponse, staffModifyNeedToUsePlayRoomCallback);
 	            		} else {
 	            			appointmentService.staffModifyAppointmentResponse.childCareRequired = 'Y';
 	            			appointmentService.staffModifyAppoiontmentValueChangedChildcare(appointmentService.staffModifyAppointmentResponse, staffModifyNeedToUsePlayRoomCallback);
 	            		}
 	            	});
 	               
 	               //Code from directive
 	            	$scope.numberKidsChange = function(number) {
 	            		if (number > 0) {
 	            			$scope.numberOfKids = number;
 	            			appointmentService.staffModifyAppointmentResponse.numberOfChildren = number.toString();
 	            			appointmentService.staffModifyAppointmentResponse.childCareRequired = 'Y';
 	            			$scope.isLoading = true;
 	            			appointmentService.staffModifyAppoiontmentValueChangedChildren(appointmentService.staffModifyAppointmentResponse, staffModifyValueChangedChildrenCallback);	         		        	
 	            		}
 	            	};
 	            	
 	            	$scope.ok = function(){
 	            		$scope.modalContext = "playroomUpdateOverview";
 	            	}
 	            	
 	            	
 	            	$scope.resetNumberOfChildren = function(){
 	            		if(appointmentService.staffModifyAppointmentResponse.numberOfChildren !== undefined){
 	            			appointmentService.staffModifyAppointmentResponse.numberOfChildren = appointmentService.staffModifyAppointmentItem.numberOfKids;
 	            		}
 	            		if(appointmentService.staffModifyAppointmentResponse.iChildren !== undefined){
 	            			appointmentService.staffModifyAppointmentResponse.iChildren = appointmentService.staffModifyAppointmentItem.numberOfKids;
 	            		}
 	            		if(appointmentService.staffModifyAppointmentItem.numberOfKids > 0){
 	            			appointmentService.staffModifyAppointmentResponse.childCareRequired = 'Y';
 	            		} else {
 	            			appointmentService.staffModifyAppointmentResponse.childCareRequired = 'N';
 	            		}
 	            		$scope.cancel();
 	            	};
 	            	
 	            	
 	            	var selectionChangedCallback = function(data){	            		
 	            		$scope.modifyInfo = data;
 	            		appointmentService.staffModifyAppointmentResponse = data;
 	            		if(appointmentService.staffModifyAppointmentResponse.notAvailable && !appointmentService.staffModifyAppointmentResponse.renderReschedule) {
 	            			$scope.modalContext = "noAppointmentsAvailable";
 	            		}
 	            		$scope.isLoading = false;
 	            	};
 	            	if($scope.modalContext === "rescheduling"){
 	            		$scope.isLoading = true;
 	            		appointmentService.staffModifySelectionChanged(appointmentService.staffModifyAppointmentResponse, selectionChangedCallback);
 	            	}
 	            	
 	            	var changeNumberOfChildrenCallback = function(data){
 	            		$scope.isLoading = false;
 	            		$scope.modifyInfo = data;
 	            		appointmentService.staffModifyAppointmentResponse = data;
 	            		if($scope.modifyInfo.errorMessage === undefined){
 	            			if($scope.modifyInfo.showPlayroomOverrideMessage === "N"){
 	            				$scope.showSuccessMessage = true;
 	            			} else {
 	            				if($scope.modifyInfo.showPlayroomOverrideMessage === "Y"){
 	            					$scope.modalContext = "playroomOverride";
 	            				}
 	            			}
 	            		} else {
 	            			$scope.showFailureMessage = true;
 	            		}
 	            	};
 	            	
 	            	$scope.changeNumberOfChildren = function(){	            		
 	            		$scope.isLoading = true;
 	            		appointmentService.staffModifyAppointmentChangeNumberOfChildren(appointmentService.staffModifyAppointmentResponse, changeNumberOfChildrenCallback);
 	            	};
 	            	
 	            	var updateNumberOfChildrenCallback = function(data){
 	            		$scope.isLoading = false;
 	            		$scope.modifyInfo = data;
 	            		appointmentService.staffModifyAppointmentResponse = data;
 	            		if($scope.modifyInfo.errorMessage === undefined){  	
 	            			$scope.showSuccessMessage = true;
 	            		} else {
 	            			$scope.showFailureMessage = true;
 	            		}
 	            		
 	            	};
 	            	
 	            	$scope.updateNumberOfChildren = function(){	            		
 	            		$scope.isLoading = true;
 	            		appointmentService.staffModifyAppointmentUpdateNumberOfChildren(appointmentService.staffModifyAppointmentResponse, updateNumberOfChildrenCallback);
 	            	};
 	            	
 	            	$scope.continue = function(){
 	            		if($scope.showSuccessMessage) {
 	            			$scope.cancel();
 	            			if(appointmentService.staffModifyAppointmentItem.sourceView === "CalendarView1Day") {
 	            				$location.path('/appointments/calendar-one-day');
 	            			} else {
 	            				if(appointmentService.staffModifyAppointmentItem.sourceView === "DonorView1Day") {
 	            					$location.path('/appointments/calendar-donor');
 	            				};
 	            			};
 	            		} else {
 	            			if ($scope.showFailureMessage) {
 	            				$scope.cancel();
 	            			};
 	            		};
 	            	}
 	            	
 	            	$scope.continueAfterNoAppointmentsAvailableContext = function(){
 	            		$scope.cancel();
 	            		$scope.modalContext = "rescheduling";
 	            	}
 	            		            	
 	                $scope.cancel = function () {
 	                    $modalInstance.dismiss('cancel');
 	                };               	               	               	               	               
 	            }],
 	            backdrop: 'static',
 	            scope: $scope
 	        });
     	
 	        modalInstance.result.then(function (info) {
 	            console.log("result then");
 	        });
    	};
    	
        $scope.toggleCalendarLegend = function(){
        	$scope.showCalendarLegend = !($scope.showCalendarLegend);
        }
        
        $scope.noChangeNeeded = function(){
        	if(appointmentService.staffModifyAppointmentItem !== undefined){
        		if(appointmentService.staffModifyAppointmentItem.sourceView === 'CalendarView1Day'){
        			$location.path('/appointments/calendar-one-day');
        		}
        		if(appointmentService.staffModifyAppointmentItem.sourceView === 'DonorView1Day'){
        			$location.path('#/appointments/calendar-donor');
        		}
        	}        	
        };
        
        /*
		 * NOT IMPLEMENTING AT THIS TIME $scope.cancelAppointment = function(){
		 * $scope.modalContext = "canceling";
		 * launchStaffModifyAppointmentModal(); };
		 */
        
        /*
		 * NOT IMPLEMENTING AT THIS TIME $scope.previousDayDetails = function(){
		 *  }
		 */
        
        /*
		 * NOT IMPLEMENTING AT THIS TIME $scope.nextDayDetails = function(){
		 *  }
		 */
        
        
        
     	var convertTo12HourTime = function(time) {
     		var timeStr = time.toString();
     		if (timeStr.length >= 3 && timeStr.length <= 4) {
                var hours = timeStr.slice(0, timeStr.length-2);
                var minutes = timeStr.substr(timeStr.length-2, 2);
                // am / pm string
                var hoursNum = Number(hours);
                if (hoursNum >= 13) {
                    hours = hours - 12;
                }
                var amPmMarker = 'AM'; // init to AM
                if (hoursNum >= 12) {
                    amPmMarker = 'PM';
                }
                if(hours.toString().length === 1){
                	hours = "0" + hours;
                }
                // build string
                timeStr = hours + ':' + minutes + ' ' + amPmMarker;
            }
     		return timeStr;
     	};
     	
        $scope.timeSlotSelect = function(timeSlot, column, table){
        	appointmentService.staffModifyAppointmentResponse.selectedTime = convertTo12HourTime(timeSlot);
        	appointmentService.staffModifyAppointmentResponse.selectedColumn = column;
        	appointmentService.staffModifyAppointmentResponse.tableSelected = table;
        	if(appointmentService.staffModifyAppointmentResponse.appointmentTypeId === appointmentService.staffModifyAppointmentResponse.selectedColumn){
        		$scope.modalContext = "rescheduling";
        	} else {
        		$scope.modalContext = "appointmentTypeMismatch";
        	}
        	launchStaffModifyAppointmentModal();
        };
        var launchStaffModifyAppointmentModal = function() {
	        var modalInstance = $modal.open({
	            templateUrl: 'html/manager/appointments/staff-modify-appointment-modal.html',
	            controller: ['$scope', '$modalInstance', '$location', 'appointmentService',
	            function ($scope, $modalInstance, $location, appointmentService) {
	            	$scope.showSuccessMessage = false;
	            	$scope.showFailureMessage = false;
	            	
	            	var selectionChangedCallback = function(data){	            		
	            		$scope.modifyInfo = data;
	            		appointmentService.staffModifyAppointmentResponse = data;
	            		$scope.newDate = new Date(appointmentService.staffModifyAppointmentResponse.newApptDateValue);
	            		if(appointmentService.staffModifyAppointmentResponse.notAvailable && !appointmentService.staffModifyAppointmentResponse.renderReschedule) {
	            			$scope.modalContext = "noAppointmentsAvailable";
	            		}
	            		$scope.isLoading = false;
	            	};
	            	if($scope.modalContext === "rescheduling"){
	            		$scope.isLoading = true;
	            		appointmentService.staffModifySelectionChanged(appointmentService.staffModifyAppointmentResponse, selectionChangedCallback);
	            	}
	            	
	            	var rescheduleAppointmentCallback = function(data){
	            		$scope.isLoading = false;
	            		$scope.modifyInfo = data;
	            		appointmentService.staffModifyAppointmentResponse = data;
	            		if($scope.modifyInfo.errorMessage === undefined){
	            			$scope.showSuccessMessage = true;
	            		} else {
	            			$scope.showFailureMessage = true;
	            		}
	            	};
	            	
	            	$scope.confirmRescheduleAppointment = function(){	            		
	            		$scope.isLoading = true;
	            		appointmentService.staffModifyAppointmentRescheduleAppointment(appointmentService.staffModifyAppointmentResponse, rescheduleAppointmentCallback);
	            	};
	            	
	            	$scope.continue = function(){
	            		if($scope.showSuccessMessage) {
	            			$scope.cancel();
	            			if(appointmentService.staffModifyAppointmentItem.sourceView === "CalendarView1Day") {
	            				$location.path('/appointments/calendar-one-day');
	            			} else {
	            				if(appointmentService.staffModifyAppointmentItem.sourceView === "DonorView1Day") {
	            					$location.path('/appointments/calendar-donor');
	            				};
	            			};
	            		} else {
	            			if ($scope.showFailureMessage) {
	            				$scope.cancel();
	            			};
	            		};
	            	}
	            	
	            	$scope.continueAfterNoAppointmentsAvailableContext = function(){
	            		$scope.cancel();
	            		$scope.modalContext = "rescheduling";
	            	}
	            		            	
	                $scope.cancel = function () {
	                    $modalInstance.dismiss('cancel');
	                };               	               	               	               	               
	            }],
	            backdrop: 'static',
	            scope: $scope
	        });
	
	        modalInstance.result.then(function (info) {
	            console.log("result then");
	        });
        };       
    } ]);

	bdpAppControllers.controller('DonorAppointmentsController', ['$scope', '$location', '$anchorScroll', '$modal', 'appointmentService', 'profileService', 'staffProfileService', function ($scope, $location, $anchorScroll, $modal, appointmentService, profileService, staffProfileService) {		
		$scope.dateSelected = null;
		$scope.donationType = null;
		$scope.reloadCalendar;
        $scope.isLoadingCalendar;
        $scope.userType = "staff-manager";
        $scope.showSchedule = true; 
        $scope.bookSuccess = false;
        $scope.bookFailure = false;
        $scope.donor;

        if(appointmentService.donorScheduleAppointmentResponse !== undefined) {
        	appointmentService.donorScheduleAppointmentResponse = undefined;
        }
        
        $scope.reloadCalendarDirectiveBoolean = function(){
        	profileService.getUpcomingAppointments('staff-manager', upcomingApppointmentsListCallback);
        	$scope.reloadCalendar = true;
        }

		var upcomingApppointmentsListCallback = function (myAppointmentsControllerResponse) {
			$scope.myAppointmentsControllerResponse = myAppointmentsControllerResponse;
		};
		profileService.getUpcomingAppointments('staff-manager', upcomingApppointmentsListCallback);
		
		var profileCallback = function(data) {
			$scope.donor = data;
			if (data.pdn !== undefined) {
				$scope.donorPDN = data.pdn; 
			} else {
				$scope.donorPDN = "Not Assigned";
			}
			
			$scope.donorName = data.firstName + ' ' + data.lastName;
        	if (data.middleInitial !== undefined) {
        		$scope.donorName = data.firstName + ' ' + data.middleInitial + ' ' + data.lastName;
        	}
        	if (data.nameSuffix !== undefined && data.nameSuffix.nameSuffixCode !== "*") {
        		$scope.donorName = data.firstName + ' ' + data.middleInitial + ' ' + data.lastName + ' ' + data.nameSuffix.nameSuffixCode;
        	}
        };
        profileService.getProfile(profileCallback);
		
		$scope.modifyAppointment = function(appointment) {
        	$scope.oldAppt = appointment;
        	$scope.apptDate = appointment.appointmentDateTimeDisplay.substring(0,10);
        	$scope.apptTime = appointment.appointmentDateTimeDisplay.substring(11,19);
        	appointmentService.appointmentItem.appointmentId = appointment.appointmentId;
        	$scope.children = appointment.numberOfChildren;
        	$scope.apptType = appointment.appointmentType;
        	appointmentService.appointmentItem.appointmentTypeId = appointment.appointmentTypeId;
        	appointmentService.appointmentItem.appointmentDateString = appointment.appointmentDateTime;
        	appointmentService.appointmentItem.appointmentDateTime = appointment.appointmentDateTimeDisplay;
        	$scope.hideModifyButton = false;
        	
        	if(staffProfileService.appUserCenterData !== undefined 
        	  	&& staffProfileService.appUserCenterData.centerNo !== $scope.oldAppt.centerId) {
        		$scope.hideModifyButton = true;
        	}
        	
        	var cancelMe = function() {
    			$scope.isCanceled = true;   		
        	}
        	
        	var closeModal = function () {
                $modalInstance.dismiss('cancel');
            };
                    
        	var modalInstance = $modal.open({
                templateUrl: 'html/donor/appointments/modify-appointment-modal.html',
                scope: $scope,
                controller: ['$scope', '$modalInstance', '$route','profileService', 'appointmentService',
                function ($scope, $modalInstance, $route,profileService, appointmentService) {
                	$scope.showCancelInformation = false;
                	$scope.isCanceling = false;
                	$scope.showCancelSuccessMessage = false;
                	$scope.showCancelErrorMessage = false;
                	$scope.cancelSuccess = function() {
                    	if($scope.cancelData.cancelAppointmentResponse === 'Success, the appointment was cancelled') {
                    			$scope.isCancelSuccess = true;
                    	}
                    }
                	
                	$scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    	$route.reload();
                    };
                    
                    $scope.rescheduleAppointment = function() {
                    	$modalInstance.dismiss('cancel');
                    	$location.path('/appointments/reschedule-appointment');
                    };
                    
                    var upcomingApppointmentsListCallback = function (myAppointmentsControllerResponse) {
            			$scope.myAppointmentsControllerResponse = myAppointmentsControllerResponse;
            		}
            		
                    $scope.cancelAppt = function() {                    	                    	
                    	var modifyCallback = function(data) {                    		
                        	appointmentService.donorModifyAppointmentResponse = data;
                        	$scope.cancelInfo = appointmentService.donorModifyAppointmentResponse;
                        	$scope.isLoadingApptModify = false;
                        	$scope.isCanceling = true;
                        	profileService.getUpcomingAppointments('staff-manager', upcomingApppointmentsListCallback);
                        }
                    	$scope.isLoadingApptModify = true;
                    	appointmentService.modifyAppointment(appointmentService.appointmentItem, modifyCallback);                   	
                    };
                    
                    var upcomingApptsCallback = function(data) {
                    	$scope.upcomingDonations = data.upcomingDonationAppointmentsList;
                    	if ($scope.upcomingDonations !== undefined) {
	                    	if ($scope.upcomingDonations.length > 0) {
	                    		$scope.hasDonationAppt = true;
	                    	}	
                    	}
                    	$scope.upcomingPhysical = data.upcomingPhysicalAppointmentsList;
                    	if ($scope.upcomingPhysical !== undefined) {
	                    	if ($scope.upcomingPhysical.length > 0) {
	                    		$scope.hasPhysicalAppt = true;
	                    	}
                    	}
                    }
                                    
                    var confirmCancelCallback = function(data) {
                    	$scope.cancelData = data;
                    	if($scope.cancelData.cancelAppointmentResponse === 'Success, the appointment was cancelled') {
                    		$scope.showCancelSuccessMessage = true;                    
                    		profileService.getUpcomingAppointments('donor', upcomingApptsCallback);
                    	} else {
                    		$scope.showCancelErrorMessage = true;
                    	}                    		
                    };
                    
                    $scope.confirmCancelAppt = function() {
                    	appointmentService.cancelAppointment(appointmentService.appointmentItem, confirmCancelCallback);
                    };               
                } ],
                backdrop: 'static'
            });
        }

	} ]);
    
    bdpAppControllers.controller('ApptByTypeReportController', ['$scope', '$location', '$window', 'userService', 'reportService', function ($scope, $location, $window, userService, reportService) {
    	$scope.reportStartDate = false;
    	$scope.reportEndDate = false;
    	$scope.format = 'shortDate';
    	$scope.today = new Date();
    	$scope.apptTypeOptions = ['All', 'Donation', 'Physical with Donation'];
    	$scope.isQuerying = false;
    	/*
		 * $scope.reportRequest = { startDate : undefined, endDate : undefined,
		 * appointmentType : 'All' }
		 */
    	
    	$scope.openStartDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportStartDate = true;
    	}
    	
    	$scope.openEndDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportEndDate = true;
    	}

           var apptByTypeReportCallback = function(data) {
           		$scope.reportRequest = {};
       			$scope.reportResult = data;

       			if(data.length == 0) {
       				$scope.noResultsMessage = true;        		
       			}
       			
       			// for (appointment in $scope.reportResult) {
       			// $scope.reportResult.appointmentDatetime = new
				// Date($scope.reportResult.appointmentDatetime);
       			// }
       			// re-route to appointment-by-type-report-result page
       			$scope.isQuerying = false;
       			$location.path('/report/appointment-by-type-report-result');
           };
           
       $scope.runApptByTypeReport = function() {
        	$scope.isQuerying = true;
           	$scope.errorMessage = false;
           	$scope.noResultsMessage = false;
           	if($scope.reportRequest.startDate !== undefined) {
	        		$scope.reportRequest.startDay = $scope.reportRequest.startDate.getDate() + "";
	        		$scope.reportRequest.startMonth = ($scope.reportRequest.startDate.getMonth() + 1) + "";
	        		$scope.reportRequest.startYear = $scope.reportRequest.startDate.getFullYear() + "";
	        }
           	if($scope.reportRequest.endDate !== undefined) {
        		$scope.reportRequest.endDay = $scope.reportRequest.endDate.getDate() + "";
        		$scope.reportRequest.endMonth = ($scope.reportRequest.endDate.getMonth() + 1) + "";
        		$scope.reportRequest.endYear = $scope.reportRequest.endDate.getFullYear() + "";
           	}
           	if($scope.reportRequest.startDate && $scope.reportRequest.endDate) {
           		if($scope.reportRequest.appointmentType === 'All'){
           			$scope.reportRequest.appointmentType = 0;
           		}
           		if($scope.reportRequest.appointmentType === 'Donation'){
           			$scope.reportRequest.appointmentType = 1;
           		} 
           		if($scope.reportRequest.appointmentType === 'Physical with Donation'){
           			$scope.reportRequest.appointmentType = 2;
           		}
           		reportService.runApptByTypeReport($scope.reportRequest, apptByTypeReportCallback);
           	}
        };
    }]);
    
    bdpAppControllers.controller('ApptByTypeReportResultController', ['$scope', '$location', 'userService', 'reportService', 'staffProfileService', function ($scope, $location, userService, reportService, staffProfileService) {
    	moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
		        LTS: "h:mm:ss A",
		        L: "MM/DD/YYYY h:mmA",
		        LL: "MMM Do",
		        LLL: "MMMM Do",
		        LLLL: "MMMM Do YYYY"
		    }
		});
    	
    	$scope.reportResults = reportService.getApptByTypeReportResult();
    	$scope.displayResults = $scope.reportResults;
    	$scope.reportInfo = reportService.reportInfo;
    	$scope.reportInfo.startDate = new moment(reportService.reportInfo.startDate).format('LLLL');
    	$scope.reportInfo.endDate = new moment(reportService.reportInfo.endDate).format('LLLL');
    	$scope.nowDate = new moment().format('LLL');
    	$scope.nowTime = new moment().format('LT');
    	$scope.dates = [];
    	$scope.date= '';
    	$scope.address = '';
    	$scope.noResultsMessage = false;
    	
    	
    	// Go through results and 1.)format the apptDateTime to appear correctly
		// within each result and 2.)each time a new date appears, splice the
		// array and that date right before all objects in the array that have a
		// new date.
    	// This is done for display purposes only when a user is viewing the
		// data paginated in bootstrap for reports that need blue date stripes
		// (ApptByType and Playroom)
    	var resultLength = $scope.displayResults.apptByTypeReport.length;
    	if (resultLength > 0){
    		for(var i = 0; i < resultLength; i++){
    			var currentDate = new moment($scope.displayResults.apptByTypeReport[i].appointmentDatetime).format('L');
    			var nextDate;
    			if(i === resultLength - 1){
    				$scope.displayResults.apptByTypeReport[i].appointmentDatetime = new moment($scope.displayResults.apptByTypeReport[i].appointmentDatetime).format('L');
    			} else {
	    			nextDate = new moment($scope.displayResults.apptByTypeReport[i + 1].appointmentDatetime).format('L');
	    			if(i === 0){
	    				var date = {
	    						apptDate : currentDate.substring(0, 10)
	    				};
	    				$scope.displayResults.apptByTypeReport.splice(i, 0, date);
	    				resultLength += 1;
	    			}
	    			if(i !== 0 && $scope.displayResults.apptByTypeReport[i].apptDate !== undefined){
	    				i++;
	    				currentDate = new moment($scope.displayResults.apptByTypeReport[i].appointmentDatetime).format('L'); 
	        			nextDate = new moment($scope.displayResults.apptByTypeReport[i + 1].appointmentDatetime).format('L');   				
	    			}
	    			if(currentDate.substring(0, 10) !== nextDate.substring(0, 10)){
	    				var date = {
	    						apptDate : nextDate.substring(0, 10)
	    				};
	    				$scope.displayResults.apptByTypeReport.splice(i + 1, 0, date);
	    				resultLength += 1;
	    			}
	    			$scope.displayResults.apptByTypeReport[i].appointmentDatetime = new moment($scope.displayResults.apptByTypeReport[i].appointmentDatetime).format('L');
    			}
    		}
    	} else {
    		$scope.noResultsMessage = true;
    	}
    	console.log($scope.displayResults);
    	
    	var successCallback = function (data){
    		$scope.centerInfo = data;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	};
    	if(staffProfileService.appUserCenterData === undefined){
    		staffProfileService.getStaffHomeData(successCallback);
    	}else{
    		$scope.centerInfo = staffProfileService.appUserCenterData;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	}
    	
    	$scope.backToReport = function(){
    		$location.path('/report/appointment-by-type-report');
    	}
    	
    	$scope.columns = [
    	    {title: "Date", key: "date", width: 12},
	        {title: "Name", key: "name", width: 68},
	        {title: "PDN", key: "pdn", width: 5}, 
	        {title: "Phone", key: "phone", width: 5}, 
	        {title: "Type", key: "apptType", width: 25},
	        {title: "Time", key: "apptTime", width: 5}
    	];
    	
    	var createData = function(array){
    		var previousApptDate;
    		var currentApptDate;
    		var data = [];
    		var name = '';
    		var phone = '';
    		var pdn = '';
    		var apptType = '';
    		for (var i = 0; i < array.length; i++){
    			if (array[i].apptDate !== undefined){
    				currentApptDate = array[i].apptDate;
    				if ((currentApptDate !== previousApptDate && previousApptDate !== undefined) || i === 0) {
    					data.push({"date": array[i].apptDate ,"name": "", "pdn": "", "phone": "", "apptType": "", "apptTime": ""});
    				}
    				previousApptDate = array[i].apptDate;
    			}
    			if (array[i].apptDate === undefined){
	    			if (array[i].donorAppointment.lastName !== undefined && array[i].donorAppointment.firstName !== undefined && array[i].donorAppointment.middleInitial !== undefined){
	    				name = array[i].donorAppointment.lastName + ', ' + array[i].donorAppointment.firstName + ' ' + array[i].donorAppointment.middleInitial;
	    			} else {
	    				name = array[i].donorAppointment.lastName + ', ' + array[i].donorAppointment.firstName;
	    			}
    			
	    			if (array[i].donorAppointment.pdn !== undefined){
	    				pdn = array[i].donorAppointment.pdn;
	    			}
    			
	    			if (array[i].donorAppointment.donorContacts !== undefined && array[i].donorAppointment.donorContacts.length > 0){
	    				phone = array[i].donorAppointment.donorContacts[0].phoneNumber;
	    				if(phone !== undefined) { 
	    					phone = '(' + phone.substring(0, 3) + ')' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	    				};
	    			}
    			
	    			/*
					 * apptTime = new
					 * moment(array[i].appointmentDatetime).format('LT');
					 */
	    			/*
					 * if (apptTime.substring(0,2) === "10" ||
					 * apptTime.substring(0,2) === "11" ||
					 * apptTime.substring(0,2) === "12"){ apptTime =
					 * apptTime.substring(0, 5) + ' ' + apptTime.substring(9,
					 * apptTime.length); }else { apptTime =
					 * apptTime.substring(0, 4) + ' ' + apptTime.substring(8,
					 * apptTime.length); }
					 */
	    			
	    			if (array[i].appointmentTypeId === 1){
	    				apptType = "Donation";
	    			}else{
	    				if (array[i].appointmentTypeId === 2){
	    					apptType = "Physical with Donation";
	    				}
	    			}
	    			
	    			/*
					 * date = new
					 * moment(array[i].appointmentDatetime).format('LL');
					 */
	    			apptTime = array[i].appointmentDatetime.substring(10, array[i].appointmentDatetime.length);
	    			date = array[i].appointmentDatetime.substring(0, 10);
	    			data.push({"date": date,"name": name, "pdn": pdn, "phone": phone, "apptType": apptType, "apptTime": apptTime});
	    			phone = '';
	    			pdn = '';
    			}  			
    		}
    		return data;
    	}
    	
    	$scope.createPDF = function() {		
    		var data = createData($scope.reportResults.apptByTypeReport);
    		var columns = $scope.columns;
    		var doc = new jsPDF('p', 'pt');
    		doc.setFontSize(12);
    		$scope.reportType = 'Appointment By Type Report';
    		doc.setFont("helvetica", "bolditalic");
    		doc.text(220,20, 'Appointment By Type Report');
    		doc.setFontSize(10);
    		doc.setFont("helvetica", "normal");
    		doc.text(5, 45, 'Report Dates: ' + $scope.reportInfo.startDate + ' to ' + $scope.reportInfo.endDate);
    		doc.text(5, 65, 'Center: ' + $scope.address);
    		doc.text(370, 45, 'Report Generated: ' + $scope.nowDate + ' ' + $scope.nowTime);
    		doc.line(5, 75, 590, 75); // horizontal line
    		doc.autoTable(columns, data, {}, $scope.reportType, $scope.reportInfo.startDate, $scope.reportInfo.endDate, $scope.address, $scope.nowDate, $scope.nowTime);
    		doc.save('AppointmentByTypeReport_' + $scope.nowDate + '_' + $scope.nowTime + '.pdf');		
    	}
    } ]);
    
    bdpAppControllers.controller('OverrideReportController', ['$scope', '$location', '$window', 'userService', 'reportService', function ($scope, $location, $window, userService, reportService) {
    	$scope.reportStartDate = false;
    	$scope.reportEndDate = false;
    	$scope.format = 'shortDate';
    	$scope.today = new Date();
    	$scope.overrideOptions = ['Appointment Date', 'Employee Name', 'Donor Name'];
    	$scope.isQuerying = false;    
    	$scope.isManager = userService.isManager();

    	$scope.openStartDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportStartDate = true;
    	}
    	
    	$scope.openEndDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportEndDate = true;
    	}
    	
    	var donorOverrideReportCallback = function(data){
    		$scope.reportRequest = {};
    		$scope.reportResult = data;
    		if(data.length == 0) {
   				$scope.noResultsMessage = true;        		
   			}
    		$scope.isQuerying = false;
   			$location.path('/report/donor-override-report-result');
    	}
    	$scope.runDonorOverRideReport = function() {
    		if($scope.reportRequest.startDate !== undefined) {
        		$scope.reportRequest.startDay = $scope.reportRequest.startDate.getDate() + "";
        		$scope.reportRequest.startMonth = ($scope.reportRequest.startDate.getMonth() + 1) + "";
        		$scope.reportRequest.startYear = $scope.reportRequest.startDate.getFullYear() + "";
    		}
    		if($scope.reportRequest.endDate !== undefined) {
	    		$scope.reportRequest.endDay = $scope.reportRequest.endDate.getDate() + "";
	    		$scope.reportRequest.endMonth = ($scope.reportRequest.endDate.getMonth() + 1) + "";
	    		$scope.reportRequest.endYear = $scope.reportRequest.endDate.getFullYear() + "";
    		}
	    	if($scope.reportRequest.startDate && $scope.reportRequest.endDate) {
	       		$scope.isQuerying = true; 
	           	reportService.runDonorOverRideReport($scope.reportRequest, donorOverrideReportCallback);
	       	} else {
	       		$scope.errorMessage=true;
	       	}
    	};   	
    } ]);	
    
    bdpAppControllers.controller('OverrideReportResultController', ['$scope', '$location', 'userService', 'reportService', 'staffProfileService', function ($scope, $location, userService, reportService, staffProfileService) {
    	moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
		        LTS: "h:mm:ss A",
		        L: "MM/DD/YYYY LT",
		        LL: "MMM Do",
		        LLL: "MMMM Do",
		        LLLL: "MMMM Do YYYY"
		    }
		});
    	
    	$scope.reportResults = reportService.getDonorOverrideReportResult();
    	$scope.displayResults = $scope.reportResults;
    	$scope.reportInfo = reportService.reportInfo;
    	$scope.reportInfo.startDate = new moment(reportService.reportInfo.startDate).format('LLLL');
    	$scope.reportInfo.endDate = new moment(reportService.reportInfo.endDate).format('LLLL');
    	$scope.nowDate = new moment().format('LLL');
    	$scope.nowTime = new moment().format('LT');
    	$scope.dates = [];
    	$scope.date= '';
    	$scope.noResultsMessage = false;
    	
    	var resultLength = $scope.displayResults.donorOverRideReport.length;
    	if(resultLength > 0) {
    		for(var i = 0; i < resultLength; i++) {
    			if($scope.displayResults.donorOverRideReport[i].appointmentOverride.description === "DEFERRALS OVERRIDE") {
    				$scope.displayResults.donorOverRideReport[i].appointmentOverride.description = "Deferrals Override";
    			}else {
    				if($scope.displayResults.donorOverRideReport[i].appointmentOverride.description === "OVERBOOKED") {
    					$scope.displayResults.donorOverRideReport[i].appointmentOverride.description = "Overbooked";
    				}
    			}
    			var date = new moment($scope.displayResults.donorOverRideReport[i].appointmentDatetime).format('L');
    			$scope.displayResults.donorOverRideReport[i].appointmentDatetime = date;
    		}
    	} else {
    		$scope.noResultsMessage = true;
    	}
    	
    	var successCallback = function (data){
    		$scope.centerInfo = data;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	};
    	if(staffProfileService.appUserCenterData === undefined) {
    		staffProfileService.getStaffHomeData(successCallback);
    	}else{
    		$scope.centerInfo = staffProfileService.appUserCenterData;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	}
    	
    	$scope.backToReport = function(){
    		$location.path('/report/donor-override-report');
    	}
    	
    	$scope.columns = [    
	        {title: "Donor", key: "name", width: 65},
	        {title: "PDN", key: "pdn", width: 5},
	        {title: "Appointment Date/Time", key: "date", width: 35},
	        {title: "Description", key: "description", width: 5}, 
	        {title: "Employee Name", key: "empName", width: 25}
    	];
    	
    	var createData = function(array){
    		var data = [];
    		var name = '';
    		var empName;
    		var description = '';
    		var pdn = '';
    		var date = '';
    		for (var i = 0; i < array.length; i++){
    			if(array[i].donorAppointmentOneWay.lastName !== undefined && array[i].donorAppointmentOneWay.firstName !== undefined && array[i].donorAppointmentOneWay.middleInitial !== undefined) {
    				name = array[i].donorAppointmentOneWay.lastName + ', ' + array[i].donorAppointmentOneWay.firstName + ' ' + array[i].donorAppointmentOneWay.middleInitial;
    			} else {
    				name = array[i].donorAppointmentOneWay.lastName + ', ' + array[i].donorAppointmentOneWay.firstName;
    			}
			
    			if (array[i].donorAppointmentOneWay.pdn !== undefined){
    				pdn = array[i].donorAppointmentOneWay.pdn;
    			}
    			
    			date = array[i].appointmentDatetime;
    			/*
				 * date = new
				 * Date(array[i].appointmentDatetime).toLocaleDateString().replace(/[^
				 * -~]/g,''); time = new
				 * Date(array[i].appointmentDatetime).toLocaleTimeString().replace(/[^
				 * -~]/g,''); // initialize to this, ex: "12:00:00 AM" if
				 * (time.substring(0,2) === "10" || time.substring(0,2) === "11" ||
				 * time.substring(0,2) === "12"){ time = time.substring(0, 5) + ' ' +
				 * time.substring(9, time.length); }else { time =
				 * time.substring(0, 4) + ' ' + time.substring(8, time.length); }
				 * date = date.replace(/[^ -~]/g,'') + ' ' + time.replace(/[^
				 * -~]/g,'');
				 */
    			
    			if(array[i].applicationUser !== undefined){
    				empName = array[i].applicationUser.firstName;
    			}
    			
    			description = array[i].appointmentOverride.description;
    			
    			/*
				 * apptTime = new
				 * Date(array[i].appointmentDatetime).toLocaleTimeString().replace(/[^
				 * -~]/g,''); if (apptTime.substring(0,2) === "10" ||
				 * apptTime.substring(0,2) === "11" || apptTime.substring(0,2)
				 * === "12"){ apptTime = apptTime.substring(0, 5) + ' ' +
				 * apptTime.substring(9, apptTime.length); }else { apptTime =
				 * apptTime.substring(0, 4) + ' ' + apptTime.substring(8,
				 * apptTime.length); }
				 */
    			
    			data.push({"name": name, "pdn": pdn, "date": date, "description": description, "empName": empName});
    			empName = '';
    			pdn = '';		
    			description = '';
    		}
    		return data;
    	}
    	
    	$scope.createPDF = function() {		
    		var data = createData($scope.reportResults.donorOverRideReport);
    		var columns = $scope.columns;
    		var doc = new jsPDF('p', 'pt');
    		doc.setFontSize(12);
    		$scope.reportType = 'Override Report';
    		doc.setFont("helvetica", "bolditalic");
    		doc.text(245,20, 'Override Report');
    		doc.setFontSize(10);
    		doc.setFont("helvetica", "normal");
    		doc.text(5, 45, 'Report Dates: ' + $scope.reportInfo.startDate + ' to ' + $scope.reportInfo.endDate);
    		doc.text(5, 65, 'Center: ' + $scope.address);
    		doc.text(373, 45, 'Report Generated: ' + $scope.nowDate.replace(/[^ -~]/g,'') + ' ' + $scope.nowTime.replace(/[^ -~]/g,''));
    		doc.line(5, 75, 590, 75); // horizontal line
    		doc.autoTable(columns, data, {}, $scope.reportType, $scope.reportInfo.startDate, $scope.reportInfo.endDate, $scope.address, $scope.nowDate, $scope.nowTime);
    		doc.save('OverrideReport_' + $scope.nowDate + '_' + $scope.nowTime.replace(/[^ -~]/g,'') + '.pdf');		
    	}
    } ]);
    
    bdpAppControllers.controller('PotentialDonorReportController', ['$scope', '$location', '$window', 'userService', 'reportService', function ($scope, $location, $window, userService, reportService) {
    	$scope.reportStartDate = false;
    	$scope.reportEndDate = false;
    	$scope.format = 'shortDate';
    	$scope.today = new Date();
    	$scope.potentialDonorOptions = ['Donor Name', 'Profile Created', 'Appointment Date'];
    	$scope.isQuerying = false;
    	
    	$scope.openStartDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportStartDate = true;
    	}
    	
    	$scope.openEndDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportEndDate = true;
    	}

           var potentialDonorReportCallback = function(data) {
           		$scope.reportRequest = {};
       			$scope.reportResult = data.reportDetails;

       			if(data.length == 0) {
       				$scope.noResultsMessage = true;        		
       			}
       			$scope.isQuerying = false;
       			$location.path('/report/potential-donor-report-result');
           };
           
           $scope.runPotentialDonorReport = function() {
        	$scope.isQuerying = true;
           	$scope.errorMessage = false;
           	$scope.noResultsMessage = false;
           	if($scope.reportRequest.startDate !== undefined) {
        		$scope.reportRequest.startDay = $scope.reportRequest.startDate.getDate() + "";
        		$scope.reportRequest.startMonth = ($scope.reportRequest.startDate.getMonth() + 1) + "";
        		$scope.reportRequest.startYear = $scope.reportRequest.startDate.getFullYear() + "";
           	}
           	if($scope.reportRequest.endDate !== undefined) {
           		$scope.reportRequest.endDay = $scope.reportRequest.endDate.getDate() + "";
           		$scope.reportRequest.endMonth = ($scope.reportRequest.endDate.getMonth() + 1) + "";
           		$scope.reportRequest.endYear = $scope.reportRequest.endDate.getFullYear() + "";
           	}
           	if($scope.reportRequest.startDate && $scope.reportRequest.endDate) {
               	reportService.runPotentialDonorReport($scope.reportRequest, potentialDonorReportCallback);
           	} else {
           		$scope.errorMessage=true;
           	}
          };
    	
    } ]);	
    
    bdpAppControllers.controller('PotentialDonorReportResultController', ['$scope', '$location', 'userService', 'reportService', 'staffProfileService', function ($scope, $location, userService, reportService, staffProfileService) {
    	moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
		        LTS: "MM/DD/YYYY",
		        L: "MM/DD/YYYY LT",
		        LL: "MMM Do",
		        LLL: "MMMM Do",
		        LLLL: "MMMM Do YYYY"
		    }
		});
    	
    	$scope.reportResults = reportService.getPotentialDonorReportResult();
    	$scope.displayResults = $scope.reportResults;
    	$scope.reportInfo = reportService.reportInfo;
    	$scope.reportInfo.startDate = new moment(reportService.reportInfo.startDate).format('LLLL');
    	$scope.reportInfo.endDate = new moment(reportService.reportInfo.endDate).format('LLLL');
    	$scope.nowDate = new moment().format('LLL');
    	$scope.nowTime = new moment().format('LT');
    	$scope.today = new Date().setHours(0, 0, 0, 0);
    	$scope.today = new Date($scope.today).getTime();
    	$scope.dates = [];
    	$scope.date = '';
    	$scope.address = '';
    	$scope.noResultsMessage = false;
    	$scope.sortBy = reportService.potentialDonorSort;
    	$scope.appointmentDateList = [];
    	if($scope.displayResults.reportDetails !== undefined){
    	var resultLength = $scope.displayResults.reportDetails.length;
	    	if (resultLength > 0){
	    		for(var i = 0; i < resultLength; i++){
	    			if($scope.displayResults.reportDetails[i].appointments.length !== 0) {
	    				var milliDate = new Date($scope.displayResults.reportDetails[i].appointments[$scope.displayResults.reportDetails[i].appointments.length - 1].appointmentDatetime).getTime();    				    				
	    				if($scope.displayResults.reportDetails[i].appointments[$scope.displayResults.reportDetails[i].appointments.length - 1].appointmentStatusId === 1 && milliDate > $scope.today) {
	    					$scope.displayResults.reportDetails[i].appointments[$scope.displayResults.reportDetails[i].appointments.length - 1].appointmentDatetime = new moment($scope.displayResults.reportDetails[i].appointments[$scope.displayResults.reportDetails[i].appointments.length - 1].appointmentDatetime).format('LTS');
	    				} else {
	    					$scope.displayResults.reportDetails[i].appointments[$scope.displayResults.reportDetails[i].appointments.length - 1].appointmentDatetime = "";
	    				}
	    			}
	    			$scope.displayResults.reportDetails[i].donor.insertedDateTime = new moment($scope.displayResults.reportDetails[i].donor.insertedDateTime).format('LTS');
	    		}
	    	} else {
	    		$scope.noResultsMessage = true;
	    	}
    	} else {
    		$scope.noResultsMessage = true;
    	}
    	
    	var successCallback = function (data){
    		$scope.centerInfo = data;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	};
    	if(staffProfileService.appUserCenterData === undefined){
    		staffProfileService.getStaffHomeData(successCallback);
    	}else{
    		$scope.centerInfo = staffProfileService.appUserCenterData;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	}
    	
    	$scope.backToReport = function(){
    		$location.path('/report/potential-donor-report');
    	}
    	
    	$scope.columns = [    
	        {title: "Donor", key: "name", width: 55},
	        {title: "Phone", key: "phone", width: 3},
	        {title: "Email Address", key: "email", width: 61},
	        {title: "Appt Date", key: "date", width: 3},
	        {title: "Profile Created", key: "profile", width: 20}, 
	        {title: "Ok To Contact?", key: "contact", width: 12}
    	];
    	
    	var createData = function(array){
    		var data = [];
    		var name = '';
    		var phone = '';
    		var email = '';
    		var date = '';
    		var profile = '';
    		var contact = '';
    		var today = new Date().getTime();
    		for (var i = 0; i < array.length; i++){
	    			if (array[i].donor.lastName !== undefined && array[i].donor.firstName !== undefined && array[i].donor.middleInitial !== undefined){
	    				name = array[i].donor.lastName + ', ' + array[i].donor.firstName + ' ' + array[i].donor.middleInitial;
	    			} else {
	    				name = array[i].donor.lastName + ', ' + array[i].donor.firstName;
	    			}
    			
	    			if (array[i].donor.donorContacts !== undefined && array[i].donor.donorContacts.length > 0){
	    				phone = array[i].donor.donorContacts[0].phoneNumber;
	    				if(phone !== undefined) {	    					
	    					phone = '(' + phone.substring(0, 3) + ')' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	    				} else if (phone === undefined && array[i].donor.donorContacts.length === 2) {
	    					phone = array[i].donor.donorContacts[1].phoneNumber;
	    					if(phone !== undefined) {
	    						phone = '(' + phone.substring(0, 3) + ')' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	    					} else {
	    						phone = '';
	    					}
	    				} else {
	    					phone = '';
	    				}
	    			}
	    			
	    			if (array[i].donor.emailAddress !== undefined){
	    				email = array[i].donor.emailAddress;
	    			}
	    			
	    			if(array[i].appointments.length !== 0) {
		    			if (array[i].appointments[array[i].appointments.length - 1].appointmentDatetime !== undefined){
		    				date = (array[i].appointments[array[i].appointments.length - 1].appointmentDatetime).replace(/[^ -~]/g,'');
		    			}
	    			}
	    			
	    			profile = array[i].donor.insertedDateTime.replace(/[^ -~]/g,'');
	    			contact = array[i].donor.keepInformedFlag;
	    			
	    			data.push({"name": name, "phone": phone, "email": email, "date": date, "profile": profile, "contact": contact});
	    			phone = '';
	    			email = '';
	    			date = '';
	    			profile = '';
	    			contact = '';
    		}
    		return data;
    	}
    	
    	$scope.createPDF = function() {		
    		var data = createData($scope.reportResults.reportDetails);
    		var columns = $scope.columns;
    		var doc = new jsPDF('p', 'pt');
    		doc.setFontSize(12);
    		$scope.reportType = 'Potential Donor Report';
    		doc.setFont("helvetica", "bolditalic");
    		doc.text(220,20, 'Potential Donor Report');
    		doc.setFontSize(10);
    		doc.setFont("helvetica", "normal");
    		doc.text(5, 45, 'Report Dates: ' + $scope.reportInfo.startDate + ' to ' + $scope.reportInfo.endDate);
    		doc.text(5, 65, 'Center: ' + $scope.address);
    		doc.text(373, 45, 'Report Generated: ' + $scope.nowDate.replace(/[^ -~]/g,'') + ' ' + $scope.nowTime.replace(/[^ -~]/g,''));
    		doc.line(5, 75, 590, 75); // horizontal line
    		doc.autoTable(columns, data, {}, $scope.reportType, $scope.reportInfo.startDate, $scope.reportInfo.endDate, $scope.address, $scope.nowDate, $scope.nowTime);
    		doc.save('PotentialDonorReport_' + $scope.nowDate + '_' + $scope.nowTime.replace(/[^ -~]/g,'') + '.pdf');		
    	}
    } ]);
    	
    bdpAppControllers.controller('PlayroomReportController', ['$scope', '$location', 'userService', 'reportService', function ($scope, $location, userService, reportService) {
    	$scope.reportStartDate = false;
    	$scope.reportEndDate = false;
    	$scope.format = 'shortDate';
    	$scope.today = new Date();
    	$scope.apptTypeOptions = ['All', 'Donation', 'Physical with Donation'];
    	$scope.isQuerying = false;
    	
    	$scope.openStartDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportStartDate = true;
    	}
    	
    	$scope.openEndDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportEndDate = true;
    	}
    	
    	$scope.reportRequest = {
         		centerId: "", 
        		startDate : "",
                endDate : "",
                firstName: "",
                lastName: "",
                pdn: "",
                appointmentType : "",
                startMonth : "",
                startDay : "",
                startYear : "",
                endMonth : "",
                endDay : "",
                endYear : ""                
            };

           var playroomReportCallback = function(data) {
           	$scope.reportRequest = {};
       		$scope.reportResult = data;

           	if(data.length == 0) {
           		$scope.noResultsMessage = true;        		
           	}
           	$scope.isQuerying = false;
           	$location.path('/report/playroom-report-result');
           };
           
        $scope.runPlayroomReport = function() {
           	$scope.errorMessage = false;
           	$scope.noResultsMessage = false;
           	if($scope.reportRequest.startDate !== undefined) {
        		$scope.reportRequest.startDay = $scope.reportRequest.startDate.getDate() + "";
        		$scope.reportRequest.startMonth = ($scope.reportRequest.startDate.getMonth() + 1) + "";
        		$scope.reportRequest.startYear = $scope.reportRequest.startDate.getFullYear() + "";
           	}
           	if($scope.reportRequest.endDate !== undefined) {
           		$scope.reportRequest.endDay = $scope.reportRequest.endDate.getDate() + "";
           		$scope.reportRequest.endMonth = ($scope.reportRequest.endDate.getMonth() + 1) + "";
           		$scope.reportRequest.endYear = $scope.reportRequest.endDate.getFullYear() + "";
           	}
           	if($scope.reportRequest.startDate && $scope.reportRequest.endDate) {
           		$scope.isQuerying = true;
           		if($scope.reportRequest.centerId === ""){
           			$scope.reportRequest.centerId = 0;
           		}
               	reportService.runPlayroomReport($scope.reportRequest, playroomReportCallback);
           	}  else {
           		$scope.errorMessage=true;
           	}
          };
    } ]);
    
    bdpAppControllers.controller('PlayroomReportResultController', ['$scope', '$location', 'userService', 'reportService', 'staffProfileService', function ($scope, $location, userService, reportService, staffProfileService) {
    	moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
			    LTS: "h:mm:ss A",
			    L: "MM/DD/YYYY h:mmA",
			    LL: "MMM Do",
			    LLL: "MMMM Do",
			    LLLL: "MMMM Do YYYY"
		    }
		});
    	
    	$scope.reportResult = reportService.getPlayroomReportResult();
    	$scope.displayResults = $scope.reportResult;
    	$scope.reportInfo = reportService.reportInfo;
    	$scope.reportInfo.startDate = new moment(reportService.reportInfo.startDate).format('LLLL');
    	$scope.reportInfo.endDate = new moment(reportService.reportInfo.endDate).format('LLLL');
    	$scope.nowDate = new moment().format('LLL');
    	$scope.nowTime = new moment().format('LT');
    	$scope.dates = [];
    	$scope.date= '';
    	$scope.noResultsMessage = false;
    	
    	// Go through results and each time a new date appears, splice the array
		// and that date right before all objects in the array that have a new
		// date.
    	// This is done for display purposes only when a user is viewing the
		// data paginated in bootstrap.
    	var resultLength = $scope.displayResults.playroomReport.length;
    	if (resultLength > 0){
    		for(var i = 0; i < resultLength; i++){
    			var currentDate = new moment($scope.displayResults.playroomReport[i].appointmentDatetime).format('L');
    			var nextDate;
    			if(i === resultLength - 1){
    				$scope.displayResults.playroomReport[i].appointmentDatetime = new moment($scope.displayResults.playroomReport[i].appointmentDatetime).format('L');
    			} else {
	    			nextDate = new moment($scope.displayResults.playroomReport[i + 1].appointmentDatetime).format('L');
	    			if(i === 0){
	    				var date = {
	    						apptDate : currentDate.substring(0, 10)
	    				};
	    				$scope.displayResults.playroomReport.splice(i, 0, date);
	    				resultLength += 1;
	    			}
	    			if(i !== 0 && $scope.displayResults.playroomReport[i].apptDate !== undefined){
	    				i++;
	    				currentDate = new moment($scope.displayResults.playroomReport[i].appointmentDatetime).format('L'); 
	        			nextDate = new moment($scope.displayResults.playroomReport[i + 1].appointmentDatetime).format('L');   				
	    			}
	    			if(currentDate.substring(0, 10) !== nextDate.substring(0, 10)){
	    				var date = {
	    						apptDate : nextDate.substring(0, 10)
	    				};
	    				$scope.displayResults.playroomReport.splice(i + 1, 0, date);
	    				resultLength += 1;
	    			}
	    			$scope.displayResults.playroomReport[i].appointmentDatetime = new moment($scope.displayResults.playroomReport[i].appointmentDatetime).format('L');
    			}
    		}
    	} else {
    		$scope.noResultsMessage = true;
    	}
    	
    	var successCallback = function (data){
    		$scope.centerInfo = data;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	};
    	if(staffProfileService.appUserCenterData === undefined){
    		staffProfileService.getStaffHomeData(successCallback);
    	}else{
    		$scope.centerInfo = staffProfileService.appUserCenterData;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	}
    	
    	$scope.backToReport = function(){
    		$location.path('/report/playroom-report');
    	}
    	
    	$scope.columns = [
    	    {title: "Date", key: "date", width: 10},
    	    {title: "Time", key: "time", width: 5},
	        {title: "Name", key: "name", width: 70},
	        {title: "Phone", key: "phone", width: 5}, 
	        {title: "# of Kids", key: "kids", width: 5},
	        {title: "Sign Out", key: "signOutLine", width: 5}
    	];
    	
    	var createData = function(array){
    		var previousApptDate;
    		var currentApptDate;
    		var data = [];
    		var date = '';
    		var name = '';
    		var time = '';
    		var phone = '';
    		var numKids = 0;
    		var signOutLine = '__________';
    		for (var i = 0; i < array.length; i++){
    			if (array[i].apptDate !== undefined){
    				currentApptDate = array[i].apptDate;
    				if ((currentApptDate !== previousApptDate && previousApptDate !== undefined) || i === 0) {
    					data.push({"date": array[i].apptDate,"time": "", "name": "", "phone": "", "kids": "", "signOutLine": ""});
    				}
    				previousApptDate = array[i].apptDate;
    			}
    			if (array[i].apptDate === undefined){
	    			if (array[i].donorAppointment.lastName !== undefined && array[i].donorAppointment.firstName !== undefined && array[i].donorAppointment.middleInitial !== undefined){
	    				name = array[i].donorAppointment.lastName + ', ' + array[i].donorAppointment.firstName + ' ' + array[i].donorAppointment.middleInitial;
	    			} else {
	    				name = array[i].donorAppointment.lastName + ', ' + array[i].donorAppointment.firstName;
	    			}
    			
	    			numKids = array[i].numberOfChildren;
    			
	    			if (array[i].donorAppointment.donorContacts !== undefined && array[i].donorAppointment.donorContacts.length > 0){
	    				phone = array[i].donorAppointment.donorContacts[0].phoneNumber;
	    				phone = '(' + phone.substring(0, 3) + ')' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	    			}
	    			time = array[i].appointmentDatetime.substring(10, array[i].appointmentDatetime.length);
	    			date = array[i].appointmentDatetime.substring(0, 10);
	    			data.push({"date": date, "time": time, "name": name, "phone": phone, "kids": numKids, "signOutLine": signOutLine});
	    			date = '';
	    			time = '';
	    			phone = '';
	    			kids = '';
	    			name = '';
    			}
    		}
    		return data;
    	}
    	
    	$scope.createPDF = function() {		
    		var data = createData($scope.reportResult.playroomReport);
    		var columns = $scope.columns;
    		var doc = new jsPDF('p', 'pt');
    		doc.setFontSize(12);
    		$scope.reportType = 'Playroom Report';
    		doc.setFont("helvetica", "bolditalic");
    		doc.text(245,20, 'Playroom Report');
    		doc.setFontSize(10);
    		doc.setFont("helvetica", "normal");
    		doc.text(5, 45, 'Report Dates: ' + $scope.reportInfo.startDate + ' to ' + $scope.reportInfo.endDate);
    		doc.text(5, 65, 'Center: ' + $scope.address);
    		doc.text(373, 45, 'Report Generated: ' + $scope.nowDate.replace(/[^ -~]/g,'') + ' ' + $scope.nowTime.replace(/[^ -~]/g,''));
    		doc.line(5, 75, 590, 75); // horizontal line
    		doc.autoTable(columns, data, {}, $scope.reportType, $scope.reportInfo.startDate, $scope.reportInfo.endDate, $scope.address, $scope.nowDate, $scope.nowTime);
    		doc.save('PlayroomReport_' + $scope.nowDate + '_' + $scope.nowTime.replace(/[^ -~]/g,'') + '.pdf');		
    	}
    } ]);
    
    bdpAppControllers.controller('AppointmentMadeByReportController', ['$scope', '$location', '$window', 'userService', 'reportService', function ($scope, $location, $window, userService, reportService) {
    	$scope.reportStartDate = false;
    	$scope.reportEndDate = false;
    	$scope.format = 'shortDate';
    	$scope.today = new Date();
    	$scope.apptTypeOptions = ['Appointment Date', 'Donor Name', 'PDN', 'Employee Name', 'Made By', 'Location'];
    	$scope.isQuerying = false;
    	$scope.isManager = userService.isManager();
    	
    	$scope.openStartDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportStartDate = true;
    	}
    	
    	$scope.openEndDate = function($event) {
    		$event.preventDefault();
    		$event.stopPropagation();
    		$scope.reportEndDate = true;
    	}

           var appointmentMadeByReportCallback = function(data) {
           		$scope.reportRequest = {};
       			$scope.reportResult = data;

       			if(data.length == 0) {
       				$scope.noResultsMessage = true;        		
       			}
       			$scope.isQuerying = false;
       			$location.path('/report/appointment-made-by-report-result');
           };
           
       $scope.runAppointmentMadeByReport = function() {
		   $scope.isQuerying = true;
		   $scope.errorMessage = false;
		   $scope.noResultsMessage = false;
		   if($scope.reportRequest.startDate && $scope.reportRequest.endDate) {
			   var reportRequest = {
	       	   		startDate : $scope.reportRequest.startDate,
	       	   		endDate : $scope.reportRequest.endDate,
	       			madeByCriteria : $scope.reportRequest.madeByCriteria,
	       			employeeUserId : $scope.reportRequest.employeeUserId,
	       			pdn : $scope.reportRequest.pdn,
	       			firstName: $scope.reportRequest.firstName,
	       			lastName : $scope.reportRequest.lastName,
	       			startDay : $scope.reportRequest.startDate.getDate() + "",
	       			startMonth : ($scope.reportRequest.startDate.getMonth() + 1) + "",
	       			startYear : $scope.reportRequest.startDate.getFullYear() + "",
	       			endDay : $scope.reportRequest.endDate.getDate() + "",
	       			endMonth : ($scope.reportRequest.endDate.getMonth() + 1) + "",
	       			endYear : $scope.reportRequest.endDate.getFullYear() + ""
	       		}
	           	reportService.runAppointmentMadeByReport(reportRequest, appointmentMadeByReportCallback);
       	   } else {
       		   $scope.errorMessage=true;
       	   }
        };
    }]);
    
    bdpAppControllers.controller('AppointmentMadeByReportResultController', ['$scope', '$location', 'userService', 'reportService', 'staffProfileService', function ($scope, $location, userService, reportService, staffProfileService) {
    	moment.locale('en', {
		    longDateFormat : {
		        LT: "h:mmA",
		        LTS: "MM/DD/YYYY",
		        L: "MM/DD/YYYY LT",
		        LL: "MMM Do",
		        LLL: "MMMM Do",
		        LLLL: "MMMM Do YYYY"
		    }
		});
    	
    	$scope.reportResults = reportService.getAppointmentMadeByReportResult();
    	$scope.displayResults = $scope.reportResults.apptMadeByReport;
    	$scope.reportInfo = reportService.reportInfo;
    	$scope.reportInfo.startDate = new moment(reportService.reportInfo.startDate).format('LLLL');
    	$scope.reportInfo.endDate = new moment(reportService.reportInfo.endDate).format('LLLL');
    	$scope.nowDate = new moment().format('LLL');
    	$scope.nowTime = new moment().format('LT');
    	$scope.dates = [];
    	$scope.date= '';
    	$scope.address = '';
		$scope.noResultsMessage = false;
    	
    	var resultLength = $scope.displayResults.length;
    	if (resultLength > 0){
    		for(var i = 0; i < resultLength; i++){
    			$scope.displayResults[i].appointmentDatetime = new moment($scope.displayResults[i].appointmentDatetime).format('L');
    			// $scope.displayResults[i].appointmentDatetime = new
				// moment($scope.displayResults[i].appointmentDatetime).format('L');
    		}
    	} else {
    		$scope.noResultsMessage = true;
    	}
    	
    	var successCallback = function (data){
    		$scope.centerInfo = data;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	};
    	if(staffProfileService.appUserCenterData === undefined){
    		staffProfileService.getStaffHomeData(successCallback);
    	}else{
    		$scope.centerInfo = staffProfileService.appUserCenterData;
    		$scope.address = $scope.centerInfo.center.addressLine1 + ', ' + $scope.centerInfo.center.city + ' ' + $scope.centerInfo.center.state.code + ' ' + $scope.centerInfo.center.zipCode;
    	}
    	
    	$scope.backToReport = function(){
    		$location.path('/report/appointment-made-by-report');
    	}
    	
    	$scope.columns = [	    
	        {title: "Donor Name", key: "donor", width: 68},
	        {title: "Date", key: "dateTime", width: 25},
	        {title: "PDN", key: "pdn", width: 5}, 
	        {title: "Made By", key: "made", width: 5}, 
	        {title: "Employee Name", key: "employee", width: 25},
	        {title: "Location", key: "location", width: 5}
    	];
    	
    	var createData = function(array){
    		array = array.apptMadeByReport;
    		var data = [];
    		var donor = '';
    		var date = '';
    		var pdn = '';
    		var made = '';
    		var employee = '';   		
    		var location = '';
    		for (var i = 0; i < array.length; i++){
	    			if (array[i].donorAppointmentOneWay.lastName !== undefined && array[i].donorAppointmentOneWay.firstName !== undefined && array[i].donorAppointmentOneWay.middleInitial !== undefined){
	    				donor = array[i].donorAppointmentOneWay.lastName + ', ' + array[i].donorAppointmentOneWay.firstName + ' ' + array[i].donorAppointmentOneWay.middleInitial;
	    			} else {
	    				donor = array[i].donorAppointmentOneWay.lastName + ', ' + array[i].donorAppointmentOneWay.firstName;
	    			}
    			
	    			if (array[i].donorAppointmentOneWay.pdn !== undefined){
	    				pdn = array[i].donorAppointmentOneWay.pdn;
	    			}
    			
	    			if (array[i].donorAppointmentOneWay.donorContacts !== undefined && array[i].donorAppointmentOneWay.donorContacts.length > 0){
	    				phone = array[i].donorAppointmentOneWay.donorContacts[0].phoneNumber;
	    				phone = '(' + phone.substring(0, 3) + ')' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	    			}
    			
	    			/*
					 * date = new
					 * Date(array[i].appointmentDatetime).toLocaleDateString();
					 * time = new
					 * Date(array[i].appointmentDatetime).toLocaleTimeString().replace(/[^
					 * -~]/g,''); // initialize to this, ex: "12:00:00 AM" if
					 * (time.substring(0,2) === "10" || time.substring(0,2) ===
					 * "11" || time.substring(0,2) === "12"){ time =
					 * time.substring(0, 5) + ' ' + time.substring(9,
					 * time.length); }else { time = time.substring(0, 4) + ' ' +
					 * time.substring(8, time.length); } date = date + ' ' +
					 * time; date = date.replace(/[^ -~]/g,'');
					 */
	    			
	    			if(array[i].applicationUser !== undefined){
	    				employee = array[i].applicationUser.firstName;
	    			}
	    			
	    			if(array[i].applicationUser === undefined || array[i].applicationUser.firstName === 'DISAppUser'){
	    				made = "Donor";
	    				if (array[i].applicationUser !== undefined && array[i].applicationUser.firstName === 'DISAppUser'){
	    					employee = "";
	    				}
	    			}else{
	    				if (array[i].applicationUser !== undefined && array[i].applicationUser.firstName !== 'DISAppUser'){
    						made = "Employee";
    					}
	    			}
	    			
	    			if (array[i].scheduledFromCenterFlag === "Y"){
	    				location = "Center";
	    			}else{
	    				if (array[i].scheduledFromCenterFlag === "N"){
	    					location = "Home";
	    				}
	    			}
	    			date = array[i].appointmentDatetime;
	    			data.push({"donor": donor, "dateTime": date, "pdn": pdn, "made": made, "employee": employee, "location": location});
	    			employee = '';
    		}
    		return data;
    	}
    	
    	$scope.createPDF = function() {		
    		var data = createData($scope.reportResults);
    		var columns = $scope.columns;
    		var doc = new jsPDF('p', 'pt');
    		doc.setFontSize(12);
    		$scope.reportType = 'Appointment Made By Report';
    		doc.setFont("helvetica", "bolditalic");
    		doc.text(220,20, 'Appointment Made By Report');
    		doc.setFontSize(10);
    		doc.setFont("helvetica", "normal");
    		doc.text(5, 45, 'Report Dates: ' + $scope.reportInfo.startDate + ' to ' + $scope.reportInfo.endDate);
    		doc.text(5, 65, 'Center: ' + $scope.address);
    		doc.text(370, 45, 'Report Generated: ' + $scope.nowDate.replace(/[^ -~]/g,'') + ' ' + $scope.nowTime.replace(/[^ -~]/g,''));
    		doc.line(5, 75, 590, 75); // horizontal line
    		doc.autoTable(columns, data, {}, $scope.reportType, $scope.reportInfo.startDate, $scope.reportInfo.endDate, $scope.address, $scope.nowDate, $scope.nowTime);
    		doc.save('AppointmentMadeByReport_' + $scope.nowDate + '_' + $scope.nowTime.replace(/[^ -~]/g,'') + '.pdf');		
    	}
    } ]);
    
    bdpAppControllers.controller('ScheduleSetupController', ['$scope', 'appointmentService', function ($scope, appointmentService) {
    	$scope.effectiveDateIsOpen = false;
    	$scope.format = 'MMMM-dd-yyyy';
    	$scope.today = new Date();
    	// $scope.effectiveDate;
    	$scope.disableModifyInputs = true;
    	
    	$scope.donationIntervals = [{key: '5 minutes', value: 5}, {key: '10 minutes'}, {value: 10}];
    	
    	$scope.openEffectiveDate = function($event) {
    		$event.preventDefault();
	        $event.stopPropagation();

	        $scope.effectiveDateIsOpen = true;
    	};
    	
    	$scope.scheduleSaved = false;
    	$scope.isLoadingData = true;

    	var intervalsCallback = function(response) {
			$scope.scheduleInfo = response;
			$scope.scheduleSaved = true;
			$scope.scheduleSetup.$setPristine();
			$scope.isLoadingData = false;
    	};
	    $scope.submit = function() {
			$scope.scheduleSaved = false;
	    	$scope.isLoadingData = true;
	    	$scope.scheduleInfo.effectiveDate = $scope.scheduleInfo.effectiveDate;
	    	appointmentService.saveScheduleSetup($scope.scheduleInfo, intervalsCallback);
	    };

		var loadInfoCallback = function (response) {
			$scope.scheduleInfo = response;
			$scope.isLoadingData = false;
		};
		appointmentService.getSetupScheduleInfo(loadInfoCallback);
		
		$scope.$watch('scheduleInfo.effectiveDate', function (newVal, oldVal) {
    		if (newVal !== undefined) {
    			$scope.disableModifyInputs = false;
    		} else {
    			$scope.disableModifyInputs = true;
    		}
    	});
		
		$scope.cancel = function(){
			$scope.scheduleInfo.effectiveDate = undefined;
			$scope.scheduleSetup.$setPristine();
		}
		
    } ]);
    
    /*
	 * bdpAppControllers.controller('DonorViewOneDayController', ['$scope',
	 * 'donorViewService', function($scope, donorViewService) {
	 * 
	 * Begin Calendar Popup Functionality
	 * 
	 * //bootstrap ui $scope.today = function() { $scope.viewDate = new Date(); };
	 * $scope.today();
	 * 
	 * $scope.clear = function () { $scope.viewDate = null; };
	 *  // Disable weekend selection $scope.disabled = function(date, mode) {
	 * return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) ); };
	 * 
	 * $scope.toggleMin = function() { $scope.minDate = $scope.minDate ? null :
	 * new Date(); }; $scope.toggleMin();
	 * 
	 * $scope.open = function($event) { $event.preventDefault();
	 * $event.stopPropagation();
	 * 
	 * $scope.opened = true; };
	 * 
	 * $scope.dateOptions = { formatYear: 'yy', startingDay: 1 };
	 * 
	 * $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
	 * 'shortDate']; $scope.format = $scope.formats[0];
	 * 
	 * End Calendar Popup Functionality
	 * 
	 * //Populate scope variables $scope.viewDate = new Date("2/3/2015 8:00
	 * AM");
	 * 
	 * var calendarCallback = function(donationCenterAppointments) {
	 * $scope.appointments.updateTime(donationCenterAppointments,
	 * $scope.viewDate); }
	 * 
	 * $scope.appointments = { //Holds information about timeSlots: [],
	 * updateTime: function (donationCenterAppointments, viewDate) {
	 * this.timeSlots = [];
	 * 
	 * donationCenterAppointments.sort(function(a,b){return a.time.getTime() -
	 * b.time.getTime()});
	 * 
	 * //getting the smallest time increment needed var smallestDistance =
	 * donationCenterAppointments[donationCenterAppointments.length-1].time.getTime() -
	 * donationCenterAppointments[0].time.getTime(); for (var i=0; i<
	 * donationCenterAppointments.length-1; i++) {
	 * if(donationCenterAppointments[i+1].time.getTime()-donationCenterAppointments[i].time.getTime() !=
	 * 0 && smallestDistance >
	 * donationCenterAppointments[i+1].time.getTime()-donationCenterAppointments[i].time.getTime()) {
	 * smallestDistance =
	 * donationCenterAppointments[i+1].time.getTime()-donationCenterAppointments[i].time.getTime(); } }
	 * 
	 * //Initializing time slots for (var
	 * i=donationCenterAppointments[0].time.getTime(); i<=donationCenterAppointments[donationCenterAppointments.length-1].time.getTime();
	 * i+=smallestDistance) { this.timeSlots.push({time:new Date(i)}); }
	 * 
	 * //Build out time slots for (var i=0; i<this.timeSlots.length; i++) { for
	 * (var j=0; j<donationCenterAppointments.length; j++) { if
	 * (this.timeSlots[i].time.getTime()==donationCenterAppointments[j].time.getTime()) {
	 * switch (donationCenterAppointments[j].appointmentType) { case "Donation":
	 * this.timeSlots[i].donationAppointment = donationCenterAppointments[j];
	 * break; case "Physical": this.timeSlots[i].physicalAppointment =
	 * donationCenterAppointments[j]; break; } } }
	 * 
	 * if (this.timeSlots[i].donationAppointment==undefined && i!=0) {
	 * this.timeSlots[i].donationAppointment =
	 * this.timeSlots[i-1].donationAppointment.copyAppointment(); }
	 * 
	 * if (this.timeSlots[i].physicalAppointment==undefined && i!=0) {
	 * this.timeSlots[i].physicalAppointment =
	 * this.timeSlots[i-1].physicalAppointment.copyAppointment(); } } } }
	 * 
	 * donorViewService.getDonationCenterAppointments(calendarCallback,
	 * $scope.viewDate);
	 * 
	 * //Displays donors $scope.displayDonorIds = function(donorIds) {
	 * $scope.donorIds = donorIds; }
	 * 
	 * //Add a Donation Appointment $scope.addDonationAppointment =
	 * function(timeSlotTime){
	 * donorViewService.addDonationAppointment(timeSlotTime); }
	 * 
	 * //Delete a Donation Appointment $scope.deleteDonationAppointment =
	 * function(ids, timeSlotTime){
	 * donorViewService.deleteDonationAppointment(timeSlotTime, ids); }
	 * 
	 * //Add a Physical Appointment $scope.addPhysicalAppointment =
	 * function(timeSlotTime){
	 * donorViewService.addPhysicalAppointment(timeSlotTime); }
	 * 
	 * //Delete a Physical Appointment $scope.deletePhysicalAppointment =
	 * function(ids,timeSlotTime){
	 * donorViewService.deletePhysicalAppointment(timeSlotTime, ids); }
	 * 
	 * //Watch for changes in the date $scope.$watch('viewDate', function
	 * (newVal, oldVal) { $scope.print=newVal; if (newVal != null) {
	 * donorViewService.getDonationCenterAppointments(calendarCallback,
	 * $scope.viewDate); } });
	 * 
	 * //Increments view date $scope.incrementDate = function() {
	 * $scope.viewDate.setDate($scope.viewDate.getDate() + 1); }
	 * 
	 * //Decrements view date $scope.decrementDate = function() {
	 * $scope.viewDate.setDate($scope.viewDate.getDate() - 1); }
	 *  } ]);
	 */
    
    
    bdpAppControllers.controller('CalendarViewOneDayController', ['$scope', '$location', 'calendarService', 'appointmentService', 'staffProfileService', '$modal', function($scope, $location, calendarService, appointmentService, staffProfileService, $modal) {
    	var serviceDate = calendarService.getAndClearDateSelection();
    	$scope.dt = (serviceDate == undefined) ? new Date() : serviceDate;
    	$scope.today = new Date();
    	$scope.appointmentTimes = null;
    	$scope.donorSelected = false;
    	$scope.selectedApptType;
    	$scope.selectedApptTypeId;
    	var appointmentTypes = null;
    	$scope.firstName;
    	$scope.lastName;
    	$scope.phoneNumber;
    	$scope.phoneType;
    	$scope.emailAddress;
    	$scope.empLogin;
    	$scope.empPassword;
    	$scope.showCalendarLegend = false;
    	
    	appointmentService.getAllAppointmentTypes(function(data) {
    		appointmentTypes = data;
    	});
    	    	
        $scope.$watch('dt', function(newVal, oldVal) {
        	$scope.isLoading = true;
        	$scope.dt = newVal;
        	calendarService.getTimeSlots(newVal, function(data) {
        		$scope.baseTimeSlotDisplays = data.baseTimeSlotDisplays;
    	    	$scope.timeSlots = calendarService.getSlotHeights(data);
    	    	$scope.isLoading = false;
    	    	$scope.appointmentTimes = calendarService.getTimes(data);
        	});
        });
        
        var getTimeSlotsAfterScheduling = function(){
        	$scope.isLoading = true;
        	calendarService.getTimeSlots($scope.dt, function(data) {
        		$scope.baseTimeSlotDisplays = data.baseTimeSlotDisplays;
    	    	$scope.timeSlots = calendarService.getSlotHeights(data);
    	    	$scope.isLoading = false;
    	    	$scope.appointmentTimes = calendarService.getTimes(data);
        	});
        }
        
        $scope.timeSlotSelect = function(slot, type, id) {
        	if(id === 1 && !slot.donationClickable || id === 2 && !slot.physicalClickable) {
        		return;
        	}
        	$scope.selectedApptType = type;
        	$scope.selectedApptTypeId = id;
        	var timeSlotSelectDto = {};
        	for (var i = 0; i < appointmentTypes.length; i++) {
        		if (appointmentTypes[i].shortDescription == type) {
        			timeSlotSelectDto.appointmentType = appointmentTypes[i];
        			$scope.selectedAppointmentType = appointmentTypes[i];
        			break;
        		}
        	}
        	timeSlotSelectDto.baseTimeSlotDisplay = slot;
        	timeSlotSelectDto.date = $scope.dt;
        	$scope.date = $scope.dt;
        	timeSlotSelectDto.time = slot.timeSlot;       
        	$scope.time = timeSlotSelectDto.time;
        	
        	calendarService.sendTimeSlotSelect(timeSlotSelectDto, function(data) {
        		$scope.timeSlotData = data;
        		launchSlotModal();
        	});
        };
        
        $scope.toggleLegend = function() {
        	$scope.showCalendarLegend = !($scope.showCalendarLegend);
        }
        
        function launchSlotModal() {
	        var modalInstance = $modal.open({
	            templateUrl: 'html/manager/appointments/calendar-one-day-modal.html',
	            controller: ['$scope', '$modalInstance', 'calendarService',
	            function ($scope, $modalInstance, calendarService) {
	            	// Switchs which modal context is displayed
	            	$scope.donorSearchCriteriaResponse;
	            	$scope.appointmentToBeScheduled;
	            	$scope.modalContext = 'default';
	            	$scope.isSearching = false;
	            	$scope.isScheduling = false;
	            	$scope.isLoading = false;
	            	$scope.donorResult = false;
	            	$scope.needsPlayroom = false;
	            	$scope.numberOfKids = 0;
		        	$scope.kidsNumberRange = [1,2,3,4,5,6];
		        	$scope.prevApptTypeId;
	            	$scope.searchList = staffProfileService.getAndClearSearchDonor();
	            	$scope.donorData;
	            	$scope.selectedDonor;
	            	$scope.isDonorSelected = false;
	            	$scope.donorInfo;
	            	$scope.needsPlayroom = {
	            		boolean : false
	            	}
	            	$scope.dateSelected = false;
	            	$scope.lastErrorMessage;
	            	$scope.hasErrorMessage = false;
	            	$scope.showSuccessMessage = false;
	            	$scope.phoneTypes = ["Home", "Work", "Mobile"];
	            	$scope.searchFirstName = "";
	            	$scope.searchLastName = "";
	            	$scope.searchPDN = "";
	            	$scope.searchRequest = {
             			 firstName : "",
                     	 lastName : "",
                     	 pdn : ""
	                };
	            	$scope.isGlobalSearch = false;
	            	$scope.searchExecuted = false;
	            	/*
					 * Additional Modal Contexts quickPhysical
					 * searchNeedsPhysical searchIsDeferred searchCanSchedule
					 */
	            	          		            	            	            	
	            	/**
					 * Controller section for the default context
					 */
	            	// Selects the approriate data depending on the appointment
					// type
	            	if($scope.selectedAppointmentType.shortDescription === 'Playroom'){
	            		$scope.modalContext = 'playroom';
	            	}
	            	
	            	$scope.modalTitle = 
	            		($scope.selectedAppointmentType.shortDescription == 'Donation') ? 
	            		$scope.timeSlotData.donationTitle : ($scope.selectedAppointmentType.shortDescription == 'Physical with Donation') ? 
	            		$scope.timeSlotData.physicalTitle : $scope.timeSlotData.playroomTitle;
	            	$scope.displayList = 
	            		($scope.selectedAppointmentType.shortDescription == 'Donation') ? 
	            		$scope.timeSlotData.donationDonorDisplayList : ($scope.selectedAppointmentType.shortDescription == 'Physical with Donation') ? 
	            		$scope.timeSlotData.physicalDonorDisplayList : $scope.timeSlotData.playroomDonorDisplayList;
	            	
	            	$scope.modifyAppointment = function(appointmentInfo) {
	            		$scope.donor = {
	            				donorId : appointmentInfo.donorId
	            		}
	            		appointmentService.staffModifyAppointmentItem.appointmentId = appointmentInfo.appointmentId;
	                	appointmentService.staffModifyAppointmentItem.appointmentTypeId = appointmentInfo.appointmentTypeId;	                	
	                	appointmentService.staffModifyAppointmentItem.appointmentDateString = appointmentInfo.appointmentDate;
	                	appointmentService.staffModifyAppointmentItem.donor = $scope.donor;
	                	appointmentService.staffModifyAppointmentItem.displayTimeSlot = $scope.timeSlotData.displayTimeSlot;
	                	appointmentService.staffModifyAppointmentItem.numberOfKids = appointmentInfo.numberOfKids;
	                	appointmentService.staffModifyAppointmentItem.sourceView = "CalendarView1Day";
	                	appointmentService.staffModifyAppointmentItem.timeSlot = $scope.timeSlotData.timeSlot;
	                	appointmentService.calendarDate = $scope.dt;
	                	$modalInstance.dismiss('cancel');
	            		$location.path('/appointments/staff-modify-appointment');
	            	}
	            	
	            	$scope.deleteStatus = { message: null, status: null};
	            	var deleteCallback = function(data) {
	            		$scope.deleteStatus = (data) ? { message: 'Appointment successfully deleted.', status : true} : { message: 'There was an error attempting to delete the appointment.', status : false};	            		
	            		if($scope.deleteStatus.message === "Appointment successfully deleted."){
	            			getTimeSlotsAfterScheduling();
	            		}
	            	}
	            	
	            	$scope.deleteAppointment = function(donor) {
	            		$scope.deleteStatus = { message: null, status: null};
	            		$scope.isLoading = true;
	            		calendarService.deleteAppointment(donor.appointmentId, deleteCallback);
	            	}

                    $scope.addAppointment = function() {
	            		$scope.modalContext = 'search';
	            	};
	            	
                    $scope.overbook = function() {
                        // NOTE: As done in the original application, and
						// similar to Add - Overbook just
                        // calls the add process. The only difference is the
						// Overbook button is only
                        // exposed (in the HTML) when the condition is set on
						// the server
                        $scope.modalContext = 'search';
                    };
                    
                    var scheduleQuickPhysicalCallback = function(data) {
	                	$scope.quickPhysicalResponse = data;
	                };
	            	
	                $scope.cancel = function () {
	                	$scope.showSuccessMessage = false;
	                	$scope.showCloseButton = false;
	                	$scope.showOKButton = false;
	                    $modalInstance.dismiss('cancel');
	                };
	                
	                $scope.reset = function() {
	                	$scope.showSuccessMessage = false;
	                	$scope.showCloseButton = false;
	                	$scope.showOKButton = false;
	                };
	                
	                var loadTimeSlotsData = function(data) {
	        			$scope.isLoading = false;
	        			$scope.timeslots = data;
	        		};
	                
	                var scheduleQuickPhysicalCallback = function(data) {
	                	$scope.isScheduling = false;
	                	$scope.quickPhysicalResponse = data;
	                	$scope.showSuccessMessage = true;
	                	if($scope.quickPhysicalResponse === "") {
	                		$scope.quickPhysicalResult = "Appointment Scheduled Successfully!";
 	                		$scope.showCloseButton = true;
 	                		getTimeSlotsAfterScheduling();
 	                	} else if ($scope.quickPhysicalResponse === "Email already registered."){
 	                		$scope.quickPhysicalResult = "Donor email address is already registered.";
 	                		$scope.showOKButton = true;
 	                	} else if ($scope.quickPhysicalResponse === "Invalid Login! Please Try Again."){
 	                		$scope.quickPhysicalResult = "Invalid Login! Please Try Again.";
 	                		$scope.showOKButton = true;
 	                	} else {
 	                		$scope.quickPhysicalResult = "Error Scheduling Quick Physical.";
 	                	}	                		                	
	                };
	                
	                $scope.scheduleQuickPhysical = function(){
	                	$scope.isScheduling = true;
	                	if($scope.phoneType === "Home"){
	                		$scope.phoneTypeValue = 1;
	                	}else if($scope.phoneType === "Work"){
	                		$scope.phoneTypeValue = 2;
	                	}else{
	                		if($scope.phoneType === "Mobile")
	                		$scope.phoneTypeValue = 3;
	                	}
	                	$scope.quickPhysicalRequest = {
		                	firstName : $scope.firstName,
		                	lastName : $scope.lastName,
		                	phoneNumber : $scope.phoneNumber,
		                	phoneType : $scope.phoneTypeValue,
		                	empLogin : $scope.empLogin,
		                	empPassword : $scope.empPassword,
		                	apptTypeId : 2,
		                	apptDate : $scope.date,
		                	apptTime : $scope.time,
		                	emailAddress : $scope.emailAddress
	                	};
	                	appointmentService.scheduleQuickPhysical($scope.quickPhysicalRequest, scheduleQuickPhysicalCallback);
	                };	                
	              
	                /**
					 * Controller section for the search context
					 */
	                
	                
	                var searchCallback = function(data) {
	                	$scope.searchExecuted = true;
	                	$scope.searchRequest = {
	                			 firstName : "",
	                        	 lastName : "",
	                        	 pdn : ""
	   	                };
	               		$scope.searchList = data;
	               		$scope.allQuickPhysical = true;
	               		$scope.continueForEach = true;
	               		// Check if all donors are Quick Physical in result
	               		angular.forEach($scope.searchList, function(donor) {   			
	               			if($scope.continueForEach) {
	            	   			if(donor.id + '' !== donor.loginId) {
	            	   				$scope.allQuickPhysical = false;
	            	   				$scope.continueForEach = false;
	            	   			};
	               			};
	               		});
	                   	if(data.length == 0 || $scope.allQuickPhysical) {
	                   		$scope.noResultsMessage = true;        		
	                   	};	
	                   	$scope.isSearching = false;
	                   	$scope.donorResult = true;                 
	                }
	                
	                $scope.find = function() {
	                	$scope.searchExecuted = false;
	                	$scope.isGlobalSearch = false;
	                	$scope.modalContext = 'search';
	                	$scope.errorMessage = false;
	                   	$scope.noResultsMessage = false;
	                   	$scope.allQuickPhysical = false;
	                   	$scope.isSearching = true;
	                   	$scope.isDonorSelected = false;
	                   	$scope.needsPlayroom.boolean = false;
	                   	$scope.numberOfKids = 0;
	                	if($scope.searchRequest.firstName || $scope.searchRequest.lastName || $scope.searchRequest.pdn) {
	                       	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
	                       	if ($scope.searchRequest.pdn) {
	                       		$scope.isGlobalSearch = true;
	                       	}
	                   	}  else {
	                   		$scope.isSearching = false;
	                   		$scope.errorMessage=true;
	                   	}
	                }
	                
	                $scope.showQuickPhysicalInput = function(){
	                	$scope.modalContext = 'quickPhysical';
	                };
	                
	                // QUICK PHYSICAL
	                
	                
	                // SCHEDULE SETUP
	                var findDonorScheduleSetupCallback = function(data) {
	                	$scope.donorSearchCriteriaResponse = data;
	                	$scope.findDonorCheckScheduleAvailability();
	                };	                
	                $scope.findDonorScheduleSetup = function() {
	                	$scope.isLoading = true;
	                	$scope.appointmentToBeScheduledDate = $scope.donorSearchCriteriaResponse.appointmentDate;
 	                	$scope.appointmentToBeScheduledTime = $scope.donorSearchCriteriaResponse.appointmentTime;
	                	appointmentService.findDonorScheduleSetup($scope.donorSearchCriteriaResponse, findDonorScheduleSetupCallback);
	                };
	                
	                // SCHEDULE AVAILABILITY
	                var findDonorCheckScheduleAvailabilityCallback = function(data){
	                	$scope.lastErrorMessage = data.lastErrorMessage;
	                	   if (data.lastErrorMessage !== null || data.lastErrorMessage !== undefined || data.lastErrorMessage !== ""){
	                		   $scope.lastErrorMessage = data.lastErrorMessage;
	                		   $scope.hasErrorMessage = false;
	                		   if ($scope.lastErrorMessage === "The donor is deferred. Are you sure you want to override the deferral?"){
	                			   $scope.modalContext = 'searchIsDeferred';
	                		   } else if ($scope.lastErrorMessage === ""){
	                			   $scope.modalContext = 'okToSchedule';
	                		   } else if ($scope.lastErrorMessage !== "" && $scope.lastErrorMessage !== undefined){
	                			   $scope.modalContext = 'unableToSchedule';
	                		   }
	                	   }
	                	   $scope.isLoading = false;
		            	   $scope.donorData = data;
		            	   $scope.donorSearchCriteriaResponse = data;
		               };
		               
		            $scope.findDonorCheckScheduleAvailability = function(){
		            	appointmentService.findDonorCheckScheduleAvailability($scope.donorSearchCriteriaResponse, findDonorCheckScheduleAvailabilityCallback);
		            };
                  
	                // CONFIRM APPOINTMENT
	                var findDonorConfirmAppointmentCallback = function(data){
	                	$scope.isScheduling = false;
	                	$scope.donorSearchCriteriaResponse = data;
	                	if (data.lastErrorMessage === ""){
	                		$scope.showSuccessMessage = true;
	                		$scope.isLoading = true;
	                		getTimeSlotsAfterScheduling();
	                	}else {
	                		$scope.showErrorMessage = true;
	                		$scope.lastErrorMessage = data.lastErrorMessage;
	                	}
		            }
		               
		            $scope.findDonorConfirmAppointment = function(){
		            	$scope.isScheduling = true;
		            	if($scope.donorSearchCriteriaResponse.numberOfChildren > 0) {
 		            		$scope.donorSearchCriteriaResponse.iChildren = $scope.donorSearchCriteriaResponse.numberOfChildren;
 		            	}
		            	appointmentService.findDonorConfirmAppointment($scope.donorSearchCriteriaResponse, findDonorConfirmAppointmentCallback);
		            }                
	               
	               // CHILDREN VALUE
	               var findDonorValueChangedChildrenCallback = function(data){
	            	   $scope.donorSearchCriteriaResponse = data;
	               };
	               
	               $scope.findDonorValueChangedChildren = function(){
	            	   appointmentService.findDonorValueChangedChildren($scope.donorSearchCriteriaResponse, findDonorValueChangedChildrenCallback);
	               };	              	               
	               
	               // PLAYROOM
	               var findDonorNeedToUsePlayRoomCallback = function(data){
	            	   $scope.donorSearchCriteriaResponse = data;
	               };
	               
	               $scope.findDonorNeedToUsePlayRoom = function(){
	            	   appointmentService.findDonorNeedToUsePlayRoom($scope.donorSearchCriteriaResponse, findDonorNeedToUsePlayRoomCallback);
	               }; 
	               
	               $scope.$watch('needsPlayroom.boolean', function (newVal, oldVal) {
		        		if (!newVal) {
		        			if($scope.donorSearchCriteriaResponse !== undefined) {
			        			$scope.donorSearchCriteriaResponse.numberOfChildren = 0;
			        			$scope.donorSearchCriteriaResponse.hasChildren = 'N';
			        			$scope.donorSearchCriteriaResponse.playRoomNeeded = false;
		        			}
		        		} else {
		        			$scope.donorSearchCriteriaResponse.hasChildren = 'Y';
		        			appointmentService.findDonorNeedToUsePlayRoom($scope.donorSearchCriteriaResponse, findDonorNeedToUsePlayRoomCallback);
		        		}
		        	});
	               
	               // Code from directive
		        	$scope.numberKidsChange = function(number) {
		        		if (number > 0) {
    		        		$scope.numberOfKids = number;
    	        			$scope.donorSearchCriteriaResponse.iChildren = number;
    	        			$scope.donorSearchCriteriaResponse.numberOfChildren = number;
    	        			$scope.donorSearchCriteriaResponse.hasChildren = 'Y';
    	        			$scope.donorSearchCriteriaResponse.playRoomNeeded = true;
    	        			
    		        		$scope.isLoadingData = true;
    		        		appointmentService.findDonorValueChangedChildren($scope.donorSearchCriteriaResponse, findDonorValueChangedChildrenCallback);	         		        	
		        		}
		        	}
	               
	               var findDonorOverRideDeferralCancelCallback = function(data){
	            	   $scope.donorSearchCriteriaResponse = data;
	               };
	               
	               $scope.findDonorOverRideDeferralCancel = function(){
	            	   appointmentService.findDonorOverRideDeferralCancel($scope.donorSearchCriteriaResponse, findDonorOverRideDeferralCancelCallback);
	               };
	               
	               $scope.yesDefer = function(){
	            	   $scope.modalContext = 'yesDeferral';
	               };
	               
	               var findDonorOverRideDeferralOkCallback = function(data){
	            	   $scope.isScheduling = false;
	            	   if(data.responseMessage === "Appointment scheduled successfully."){
	            		   $scope.showSuccessMessage = true;
	            		   getTimeSlotsAfterScheduling();
	            	   }
	            	   $scope.donorSearchCriteriaResponse = data;
	               };
	               
	               $scope.findDonorOverRideDeferralOk = function(){
	            	   $scope.isScheduling = true;
	            	   if($scope.donorSearchCriteriaResponse.numberOfChildren > 0) {
		            		$scope.donorSearchCriteriaResponse.iChildren = $scope.donorSearchCriteriaResponse.numberOfChildren;
		            	}
	            	   appointmentService.findDonorOverRideDeferralOk($scope.donorSearchCriteriaResponse, findDonorOverRideDeferralOkCallback);
	               };
	               	     
	                var donorInitializeCallback = function(data) {
	                	$scope.donorData = data;
	                	$scope.donorSearchCriteriaResponse = data;
	                	$scope.donorSearchCriteriaResponse.donorId = $scope.donorInfo.id;
	                	$scope.donorSearchCriteriaResponse.appointmentDate = $scope.date;
	                	$scope.donorSearchCriteriaResponse.appointmentTime = $scope.timeSlotData.timeSlot;
	                	$scope.donorSearchCriteriaResponse.appointmentTypeId = $scope.selectedApptTypeId;
	                	if($scope.donorData.playRoomNeeded && $scope.donorData.numberOfChildren > 0) {
	                		$scope.needsPlayroom.boolean = $scope.donorData.playRoomNeeded;
	                		$scope.numberKidsChange($scope.donorData.numberOfChildren);	                		
	                	}
	                };
	                
	                var selectedSearchDonorCallback = function(data) {      	
	                   	if(data.length == 0) {
	                   		$scope.noResultsMessage = true;        		
	                   	} else {
	                   		$scope.isDonorSelected = true;
	                   		appointmentService.findDonorInitialization(donorInitializeCallback);
	                   	}	
	                };
	               
                   $scope.selectedDonor = function(donor) {
                	   $scope.donorInfo = donor;
                       var donorSessionRequest = {
                    		donorId : donor.id,
                    		pdn : donor.pdn,
                       		loginId : donor.loginId,
                       		centerId : donor.centerId,
                       		currentCenterLocalTime : donor.center.currentLocalTime,                 			            
                       		alias : donor.center.alias
                       };
                   	
	                   	if(donorSessionRequest.loginId != null) {
	                       	staffProfileService.setSelectedDonor(donorSessionRequest, selectedSearchDonorCallback);
	                   	}  else {
	                   		$scope.errorMessage=true;
	                   	}
                   }
	            }],
	            backdrop: 'static',
	            scope: $scope
	        });
	
	        modalInstance.result.then(function (info) {
	            // $scope.donorInfo = info;
	            console.log("result then");
	        });
        }
    	
    } ]);

    bdpAppControllers.controller('CalendarViewMonthController', ['$scope', '$timeout', '$location', 'calendarService', 'appointmentService', 'staffProfileService', function ($scope, $timeout, $location, calendarService, appointmentService, staffProfileService) {
    	$scope.dt = new Date();
    	$scope.initialLoad = true;
    	$scope.donationType = null;
    	$scope.minDate = new Date();
    	$scope.maxDate = new Date();
    	$scope.dayList = null;
    	$scope.isLoadingCalendar = false;
    	$scope.donationType = null;
    	var availableDates = [];
    	var nonClickDateChange = true;
    	$scope.donationsTimeframe;
    	$scope.physicalTimeframe;
    	$scope.showCalendarLegend = false;
    	$scope.currentMonth;
    	
    	$scope.$watch('dt', function(newVal, oldVal) {
    		if (newVal != null) {
    			// ignore the initial change, it is not a click event
    			if (nonClickDateChange == true) {
    				nonClickDateChange = false;
    			} else {
	    			// direct them to the 1 Day Page for the selected date
	    			calendarService.setDateSelection(newVal);
	    			$location.path("/appointments/calendar-one-day");
    			}
    		}
    	});
    	
    	$scope.toggleLegend = function() {
        	$scope.showCalendarLegend = !($scope.showCalendarLegend);
        }
    	
    	appointmentService.getAppointmentTypes(function(data) {
    		$scope.appointmentTypeList = data;
    		$scope.donationType = $scope.appointmentTypeList[0];
	        staffProfileService.getStaffHomeData(function(data) {
	        		if (data.center !== undefined) {
	        			$scope.center = data.center;
	        			donationsTimeframe = $scope.center.donationsApptsInAdvance;
	        			physicalTimeframe = $scope.center.physicalsApptsInAdvance;
	        		}
	        	});
    		$scope.isLoadingCalendar = true;
    		var dateArray = [];
    		// This currently gets data for every date displayed in the calendar
    		// It can be made more efficient by omitting days in the past at the
			// call time instead of letting it return INELIGIBLE_PAST_DATE
    		angular.forEach(dayList, function(week) {
    			angular.forEach(week, function(day) {
    				dateArray.push(day.date);
    			});
    		});
    		
    		var scheduleDto = {

            		appointmentType : $scope.donationType,
            		dateRange : dateArray
    		};
    		calendarService.getOneMonthCalendar(scheduleDto, function(data) {
    			availableDates = data;
    			$scope.initialLoad = false;
        		$scope.isLoadingCalendar = false;
        		updateColors();
        	});
    		
    	});
    	
    	/*
		 * //server side init var donationsTimeframe = null var
		 * physicalTimeframe = null var calendarInit = function() { //TODO:
		 * switch over to a call taht gets playroom too
		 * appointmentService.getAppointmentTypes(function(data) {
		 * $scope.appointmentTypeList = data; $scope.donationType =
		 * $scope.appointmentTypeList[0]; if ($scope.initialLoad) {
		 * staffProfileService.getStaffHomeData(function(data) { if (data.center
		 * !== undefined) { $scope.center = data.center; donationsTimeframe =
		 * $scope.center.donationsApptsInAdvance; physicalTimeframe =
		 * $scope.center.physicalsApptsInAdvance; } }); } });
		 * $scope.isLoadingCalendar = true; var dateArray = []; //This currently
		 * gets data for every date displayed in the calendar //It can be made
		 * more efficient by omitting days in the past at the call time instead
		 * of letting it return INELIGIBLE_PAST_DATE angular.forEach(dayList,
		 * function(week) { angular.forEach(week, function(day) {
		 * dateArray.push(day.date); }); });
		 * 
		 * var scheduleDto = {
		 * 
		 * appointmentType : $scope.donationType, dateRange : dateArray };
		 * calendarService.getOneMonthCalendar(scheduleDto, function(data) {
		 * availableDates = data; $scope.initialLoad = false;
		 * $scope.isLoadingCalendar = false; updateColors(); }); }
		 * calendarInit();
		 */
    	// end init
    	var dayList = [];
    	// This gets us into the datepicker directives scope so we have access
		// to the Calendar object
    	$scope.$watch('$$childHead.$$childHead.rows', function (newVal, oldVal) {
    		dayList = newVal;
    		
    		if (newVal !== undefined) {
    			if (oldVal !== undefined) {
    				// Check to see if the first day is the same date in both
					// cases
    				// This means we can skip a server update
    				var newWeek = newVal[0];
    				var oldWeek = oldVal[0];
    				if (newWeek[0].date.getTime() == oldWeek[0].date.getTime()) {
    					// don't update the calendar
    				} else {
    					updateCalendar();
    				}
    			} else if (!$scope.initalLoad) {
    				// first time getting data, so update
        			updateCalendar();
    			}
    		}
    	});
    	
    	var updateColors = function() {
    		var getAvailableDateData = function(calendarDay, serverDateArray) {
    			var len = serverDateArray.length;
    			/*
				 * Grabs the month of the selected month based on a date at the
				 * middle of the array this guarantees we always have the month
				 * the user selected
				 */
    			$scope.currentMonth = new Date(serverDateArray[21].date).getMonth();
    			for (var i = 0; i < len; i++) {
    				// The calendar dates have 12 hours added inside their
					// directive, so adding
    				// twelve here to match up. setHours also returns the ms
					// value
    				var serverDate = new Date(serverDateArray[i].date);
    				if (calendarDay.date.getFullYear() === serverDate.getFullYear() &&
    					    calendarDay.date.getMonth() === serverDate.getMonth() &&
    					    calendarDay.date.getDate() === serverDate.getDate()) {
        				return serverDateArray[i];
        			}
    			}
    			return null;
    		}
    		
    		angular.forEach(dayList, function(week) {
    			angular.forEach(week, function(day) {
    				var data = null;
    				if (true) {// }!day.disabled) {
    					// find the avail date
    					data = getAvailableDateData(day, availableDates);
    					if (data != null) {
    						// If date is within the selected month, display it,
							// else it is disabled and set to white just like
							// easyScheduler calendars
    						if($scope.currentMonth === new Date(data.date).getMonth()){
	    						// Using jquery for styling to avoid having to
								// modify the datepicker source code
	    						var button = $("#"+day.uid+" > button");
	    						if (data.status === 'PAST_DATE') {
	    							button.prop('disabled',true)
	    							.css("background-color", "#767676");
	    						// All Appts Available
	    						} else if (data.status == 'AVAILABILITY_CATEGORY4') {
	    							button.prop('disabled',false)
	    							.css("background-color", "#59D659")
	    							.css("color", "#000");
	    						// Some Appts Available
	    						} else if (data.status == 'AVAILABILITY_CATEGORY3') {
	    							button.prop('disabled',false)
	    							.css("background-color", "#ffff4d")
	    							.css("color", "#000");
	    						// Limited Appts Available
	    						} else if (data.status == 'AVAILABILITY_CATEGORY2') {
	    							button.prop('disabled',false)
	    							.css("background-color", "#ff8c1a")
	    							.css("color", "#000");
	    						// No Appts Available
	    						} else if (data.status == 'AVAILABILITY_CATEGORY1') {
	    							button.prop('disabled',false)
	    							.css("background-color", "#FF5858")
	    							.css("color", "#000");
	    						// Closed
	    						} else if (data.status == 'INELIGIBLE_CLOSED'){    							
	    							button.prop('disabled',false)
	    							.css("background-color", "#FF5858")
	    							.css("color", "#000");
	    						}
    						} else {
    							var button = $("#"+day.uid+" > button");
    							button.prop('disabled',true)
    							.css("color", "#fff");
    						}
    					}
    				}
    			});
    		});
    	}

    	$scope.$watch('donationType', function (newVal, oldVal) {
    		$scope.maxDate = new Date();
    		$scope.maxDate.setDate((newVal.shortDescription == 'Donation') ? ($scope.maxDate.getDate() + donationsTimeframe) : ($scope.maxDate.getDate() + physicalTimeframe));
    		if (newVal !== null && !$scope.initialLoad) {
        		updateCalendar();
    		}
    	});
    	
    	function updateCalendar() {
    		if ($scope.donationType === undefined || $scope.donationType === null) {
    			$scope.donationType = ''
    		}
        		$scope.isLoadingCalendar = true;
        		var dateArray = [];
        		// This currently gets data for every date displayed in the
				// calendar
        		// It can be made more efficient by omitting days in the past at
				// the call time instead of letting it return
				// INELIGIBLE_PAST_DATE
        		angular.forEach(dayList, function(week) {
        			angular.forEach(week, function(day) {
        				dateArray.push(day.date);
        			});
        		});
        		
        		var scheduleDto = {

                		appointmentType : $scope.donationType,
                		dateRange : dateArray
        		};
        		calendarService.getOneMonthCalendar(scheduleDto, function(data) {
        			availableDates = data;
        			$scope.initialLoad = false;
	        		$scope.isLoadingCalendar = false;
	        		updateColors();
	        	});
    	}
    	
    } ]);
    
    /*
	 * Month Controller - MATTS VERSION
	 * bdpAppControllers.controller('CalendarViewMonthController', ['$scope',
	 * '$timeout', '$location', 'calendarService', function ($scope, $timeout,
	 * $location, calendarService) {
	 * 
	 * //Get the current date $scope.calendarDate =
	 * calendarService.getCurrentDate(); var donationCenterAppointments;
	 * 
	 * 
	 * //Gets all the donation center appointment times var calendarCallback =
	 * function(donationCenterAppointments) { this.donationCenterAppointments =
	 * donationCenterAppointments; }
	 * 
	 * //Updates the background cover for a button updateBackground =
	 * function(button, viewDate) { var totalSlots = 0; var filledSlots = 0; var
	 * donationCenterAppointments = this.donationCenterAppointments;
	 * 
	 * //Get the total number of slots filled on a given day for(var i=0; i<donationCenterAppointments.length;
	 * i++) { totalSlots += donationCenterAppointments[i].totalSlots;
	 * filledSlots += donationCenterAppointments[i].filledSlots; }
	 * 
	 * //Holds the name of the class to be applied var classApplication = "";
	 * 
	 * //Set the class to be applied based on the ratio of filled slots to total
	 * slots if(totalSlots!=0) { if(totalSlots==filledSlots) { classApplication =
	 * "none-calendar"; } else if (filledSlots==0) { classApplication =
	 * "all-calendar"; } else if (totalSlots < filledSlots*2.5) {
	 * classApplication = "limited-calendar"; } else { classApplication =
	 * "some-calendar"; } }
	 * 
	 * //Remove any existing classes button.removeClass("none-calendar");
	 * button.removeClass("all-calendar");
	 * button.removeClass("limited-calendar");
	 * button.removeClass("some-calendar");
	 * 
	 * //Add new class to button button.addClass(classApplication); }
	 * 
	 * 
	 * //Watches to see changes to the calendar by seeing when the month changes
	 * $scope.$watch(function () { //Watches for a change in the datepicker
	 * month button header return
	 * $("#datePicker").find("thead").children("tr").children("th").find("strong").first().html(); },
	 * function (newVal,oldVal) { //Timeout used to help ensure that the
	 * datapicker is not modified before it is created. $timeout(function() {
	 * //Holds the date which we will use to call the service (set to the first
	 * day of the month var dateLoop = new
	 * Date($("#datePicker").find("thead").children("tr").children("th").find("strong").first().html());
	 * var counter = 0; //Used to loop though the appropriate days of the month
	 * //Loop through all dates on the calendar
	 * $("#datePicker").find("tbody").find("button").children("span").each(function(index) {
	 * //As it is looping through the different dates //Does not return true
	 * until the first of the month is reached //Returns false after the last
	 * day of the month is reached if(counter==Number($(this).html()) - 1) {
	 * dateLoop.setDate($(this).html()); //Retrieve donation information
	 * calendarService.getDonationCenterAppointments(calendarCallback,
	 * dateLoop); //Updates the button that contains the date
	 * updateBackground($(this).parent(),dateLoop); counter += 1; } }); }); });
	 * 
	 * //Moves to the donation day view if a date is selected on the calendar
	 * $scope.$watch('calendarDate', function (newVal, oldVal) {
	 * if(newVal!=oldVal) { calendarService.setCurrentDate($scope.calendarDate);
	 * $location.path('/matt'); }
	 * 
	 * }); } ]);
	 */



	bdpAppControllers.controller('AppointmentsSetupController', ['$scope', '$filter', 'appointmentService', function($scope, $filter, appointmentService) {

		$scope.isLoadingData = true;

		var loadScreenCallback = function (response) {
			var dto = response;

			// apply any special UI conditions
			dto.baseSelected = dto.baseSelected+"";
			dto.base = parseInt(dto.base);
			dto.adjustment = parseInt(dto.adjustment);

			// set onto model
			$scope.dto = dto;

			$scope.isLoadingData = false;
		};

		$scope.changeAppointmentType = function () {
			$scope.isLoadingData = true;
			appointmentService.changeAppointmentType($scope.dto, loadScreenCallback);
		};
		$scope.changePreviousDayDetails = function () {
			$scope.isLoadingData = true;
			appointmentService.changePreviousDayDetails($scope.dto, loadScreenCallback);
		};
		$scope.changeNextDayDetails = function () {
			$scope.isLoadingData = true;
			appointmentService.changeNextDayDetails($scope.dto, loadScreenCallback);
		};
		$scope.changeSelectedDayDetails = function () {
			$scope.isLoadingData = true;
			appointmentService.changeSelectedDayDetails($scope.dto, loadScreenCallback);
		};
		$scope.changeExcludeFromMassUpdate = function () {
			$scope.isLoadingData = true;
			appointmentService.changeExcludeFromMassUpdate($scope.dto, loadScreenCallback);
		};
		$scope.changeSelectedTime = function () {
			$scope.isLoadingData = true;
			// copy over values for data model
			var dto = $scope.dto;
			dto.selectedStartFromTime = dto.selectedStartFromTimeValue;
			dto.selectedStartToTime = dto.selectedStartToTimeValue;
			appointmentService.changeSelectedTime(dto, loadScreenCallback);
		};
		$scope.changeSelectBaseOrAdjustment = function () {
			$scope.isLoadingData = true;
			// convert over ui values for backend
			var dto = $scope.dto;
			dto.selectedBaseAdjString = dto.baseSelected == "true" ? "0" : "1";
			appointmentService.changeSelectBaseOrAdjustment(dto, loadScreenCallback);
		};
		$scope.changeApplyToSelected = function () {
			$scope.isLoadingData = true;
			appointmentService.changeApplyToSelected($scope.dto, loadScreenCallback);
		};
		$scope.changeMassUpdateChanged = function () {
			$scope.isLoadingData = true;
			appointmentService.changeMassUpdateChanged($scope.dto, loadScreenCallback);
		};
		$scope.changeMassUpdateSetStartDate = function () {
			$scope.isLoadingData = true;
			appointmentService.changeMassUpdateSetStartDate($scope.dto, loadScreenCallback);
		};
		$scope.changeMassUpdateSetEndDate = function () {
			$scope.isLoadingData = true;
			appointmentService.changeMassUpdateSetEndDate($scope.dto, loadScreenCallback);
		};
		$scope.createTemplate = function () {
			$scope.isLoadingData = true;
			appointmentService.createTemplate($scope.dto, loadScreenCallback);
		};
		$scope.loadTemplate = function () {
			$scope.isLoadingData = true;
			appointmentService.loadTemplate($scope.dto, loadScreenCallback);
		};
		$scope.deleteTemplate = function () {
			$scope.isLoadingData = true;
			appointmentService.deleteTemplate($scope.dto, loadScreenCallback);
		};
		$scope.save = function () {
			$scope.isLoadingData = true;
			var successCallback = function (response) {
				loadScreenCallback(response);
				$scope.appointmentSetupSaved = true;
			};
			if($scope.dto.endDate !== undefined) {
				var date = $scope.dto.endDate.substring(0, 11);
				var time = '23:59:59.999';
				$scope.dto.endDate = date + '' + time;
			}
			appointmentService.save($scope.dto, successCallback);
		};
		$scope.cancel = function () {
			$scope.isLoadingData = true;
			appointmentService.cancel($scope.dto, loadScreenCallback);
		};


		$scope.openScheduleDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.scheduleDateIsOpen = true;
		};
		$scope.openStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.startDateIsOpen = true;
		};
		$scope.openEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.endDateIsOpen = true;
		};

		$scope.isDayChecked = function (idx) {
			var retval = false;
			var targetIdxStr = (idx + 1) + "";
			$scope.dto.weekdayCheckedList.forEach(function (element) {
				if (targetIdxStr == element) {
					retval = true;
				}
			});
			return retval;
		};

		$scope.decrementDate = function($event) {
			$scope.changePreviousDayDetails();
		};

		$scope.incrementDate = function() {
			$scope.changeNextDayDetails();
		};

		appointmentService.getAppointmentSetupInfo(loadScreenCallback);
	}]);
	
	bdpAppControllers.controller('TimeoutWarningController', ['$scope', '$location', '$modal', '$modalInstance', '$timeout', 'userService', function ($scope, $location, $modal, $modalInstance, $timeout, userService) {
        
        // If the user does nothing, they will be logged out in five minutes.
    	$scope.logoutPromise = {};
        
    	$scope.logoutPromise =
            $timeout(function () {
            	$modalInstance.dismiss('cancel');
                $scope.dismissModalAndLogoutUser(); 
            }, 300000); // 5 minutes
        
       // If the user clicks the 'Continue Session' button, the timeout will
		// reset.
       // Resets to 10 minutes for Donors, 30 minutes for Employees (current
		// database values).
       $scope.continueSession = function () {
            $timeout.cancel($scope.logoutPromise);
            $modalInstance.dismiss('cancel');
            userService.resetTimer();
       }
       
       $scope.dismissModalAndLogoutUser = function() {
    	   $timeout.cancel($scope.logoutPromise);
    	   $modalInstance.dismiss('cancel');
    	   userService.logout();
       }
    } ]);
	
	bdpAppControllers.controller('DonationHistoryController', ['$scope', '$location', 'appointmentService', function ($scope, $location, appointmentService) {
    	$scope.showHistory = false;
    	$scope.disAppointmentHistory;
    	$scope.disLastAndNextPhysical;
    	$scope.overdue = false;
        $scope.showDonations = function() {
        	if ($scope.showHistory){
        		$scope.showHistory = false;
        	}else{
        		$scope.showHistory = true;
        	}
        };
        $scope.currentDate = new Date();
        $scope.day = $scope.currentDate.getDate();
        if ($scope.day < 10){
        	$scope.day = '0' + $scope.day;
        }
        $scope.month = $scope.currentDate.getMonth() + 1;
        if ($scope.month < 10){
        	$scope.month = '0' + $scope.month;
        }
        $scope.year = $scope.currentDate.getFullYear();
        $scope.currentDate = $scope.month + '/' + $scope.day + '/' + $scope.year;
        
        var getDonorDisAppointmentHistoryByPdnCallback = function(data){
        	$scope.disAppointmentHistory = data;
        };
        appointmentService.getDonorDisAppointmentHistoryByPdn(getDonorDisAppointmentHistoryByPdnCallback);
        
        var getDonorDisLastAndNextPhysicalCallback = function(data){
        	$scope.disLastAndNextPhysical = data;
        	if($scope.disLastAndNextPhysical.nextPhysicalDate === "Overdue"){
        		$scope.overdue = true;
        	}
        	if($scope.disLastAndNextPhysical.lastPhysicalDate === undefined){
        		$scope.disLastAndNextPhysical.lastPhysicalDate = "Overdue";
        	}
        };
        appointmentService.getDonorDisLastAndNextPhysical(getDonorDisLastAndNextPhysicalCallback);
        
    } ]);
	
	bdpAppControllers.controller('CalendarDonorViewController', ['$scope', '$modal', '$location', 'calendarService', 'staffProfileService', 'appointmentService', function ($scope, $modal, $location, calendarService, staffProfileService, appointmentService) {
		$scope.isLoading = true;
		$scope.selectedApptType;
    	$scope.selectedApptTypeId;
    	var appointmentTypes = null;
    	$scope.firstName;
    	$scope.lastName;
    	$scope.phoneNumber;
    	$scope.phoneType;
    	$scope.emailAddress;
    	$scope.empLogin;
    	$scope.empPassword;
    	$scope.time;
		// datepicker set up start
		$scope.dt = new Date();
		$scope.format = 'MMMM-dd-yyyy';
    	$scope.today = new Date();
    	$scope.dateOpen = false;
    	$scope.openDate = function($event) {
    		$event.preventDefault();
	        $event.stopPropagation();
	
	        $scope.dateOpen = true;
    	}
    	
    	var loadTimeSlotsData = function(data) {
			$scope.isLoading = false;
			$scope.timeslots = data;
		};
    	$scope.$watch('dt', function(newVal, oldVal) {
    		// If the date is not the same as the old date, make the update
    		if (!(newVal.getYear() == oldVal.getYear() && newVal.getMonth() == oldVal.getMonth() && newVal.getDate() == oldVal.getDate())) {
    			$scope.isLoading = true;
    			calendarService.getDonorViewTimeSlots(newVal, loadTimeSlotsData);
    		}
    	});
    	// datepicker end
		calendarService.getDonorViewTimeSlots($scope.dt,loadTimeSlotsData);
		
		$scope.timeSlotSelect = function(slot, type, id) {
			$scope.timeSlotData = slot;
        	$scope.selectedApptType = type;
        	$scope.selectedApptTypeId = id;
        	$scope.date = $scope.dt;       
        	$scope.time = slot.timeSlot;
        	launchSlotModal();
        };
		
		$scope.modifyDonor = function(appointmentInfo, timeslot) {
			$scope.donor = {
    				donorId : appointmentInfo.donorId
    		}
			appointmentService.staffModifyAppointmentItem.appointmentId = appointmentInfo.appointmentId;
        	appointmentService.staffModifyAppointmentItem.appointmentTypeId = appointmentInfo.appointmentTypeId;	                	
        	appointmentService.staffModifyAppointmentItem.appointmentDateString = appointmentInfo.appointmentDate;
        	appointmentService.staffModifyAppointmentItem.donor = $scope.donor;
        	appointmentService.staffModifyAppointmentItem.displayTimeSlot = timeslot.displayTimeSlot;
        	appointmentService.staffModifyAppointmentItem.numberOfKids = appointmentInfo.numberOfKids;
        	appointmentService.staffModifyAppointmentItem.sourceView = "DonorView1Day";
        	appointmentService.staffModifyAppointmentItem.timeSlot = timeslot.timeSlot;
        	appointmentService.calendarDate = $scope.dt;
    		$location.path('/appointments/staff-modify-appointment');
		}
		$scope.removeDonor = function(donor) {
			calendarService.deleteDonorAppointment(donor.appointmentId, function(data) {
				if (data.appointmentId != null) {
					// update the calendar
					$scope.isLoading = true;
	    			calendarService.getDonorViewTimeSlots($scope.dt, loadTimeSlotsData);
				} else {
					// there was an error
				}
			});
		}
		
		function launchSlotModal() {
	        var modalInstance = $modal.open({
	            templateUrl: 'html/manager/appointments/calendar-donor-modal.html',
	            controller: ['$scope', '$modalInstance', 'calendarService',
	         	            function ($scope, $modalInstance, calendarService) {
	         	            	$scope.donorSearchCriteriaResponse;
	         	            	$scope.appointmentToBeScheduled;
	         	            	$scope.modalContext = 'search';
	         	            	$scope.isSearching = false;
	         	            	$scope.isScheduling = false;
	         	            	$scope.isLoading = false;
	         	            	$scope.donorResult = false;
	         	            	$scope.numberOfKids = 0;
	         		        	$scope.kidsNumberRange = [1,2,3,4,5,6];
	         		        	$scope.prevApptTypeId;
	         	            	$scope.searchList = staffProfileService.getAndClearSearchDonor();
	         	            	$scope.donorData;
	         	            	$scope.selectedDonor;
	         	            	$scope.donorInfo;
	         	            	$scope.isGlobalSearch;
	         	            	$scope.isDonorSelected = false;
	         	            	$scope.dateSelected = false;
	         	            	$scope.lastErrorMessage;
	         	            	$scope.hasErrorMessage = false;
	         	            	$scope.showSuccessMessage = false;
	         	            	$scope.phoneTypes = ["Home", "Work", "Mobile"];
	         	            	$scope.searchFirstName = "";
	         	            	$scope.searchLastName = "";
	         	            	$scope.searchPDN = "";
	         	            	$scope.searchRequest = {
	                      			 firstName : "",
	                              	 lastName : "",
	                              	 pdn : ""
	         	                };
	         	            	$scope.needsPlayroom = {
	         	            		boolean : false
	         	            	}
	         	            	$scope.searchExecuted = false;
	         	            	
	         	            	$scope.modalTitle = 
	         	            		($scope.selectedApptType == 'Donation') ? 
	         	            		$scope.timeSlotData.donationTitle : ($scope.selectedApptType == 'Physical with Donation') ? 
	         	            		$scope.timeSlotData.physicalTitle : $scope.timeSlotData.playroomTitle;
	         	            	$scope.displayList = 
	         	            		($scope.selectedApptType == 'Donation') ? 
	         	            		$scope.timeSlotData.donationDonorDisplayList : ($scope.selectedApptType == 'Physical with Donation') ? 
	         	            		$scope.timeSlotData.physicalDonorDisplayList : $scope.timeSlotData.playroomDonorDisplayList;
	         	            	
	         	            	$scope.modifyAppointment = function(donor) {
	         	            		appointmentService.staffModifyAppointmentItem.appointmentId = appointmentInfo.appointmentId;
		         	               	appointmentService.staffModifyAppointmentItem.appointmentTypeId = appointmentInfo.appointmentTypeId;	                	
		         	               	appointmentService.staffModifyAppointmentItem.appointmentDateString = appointmentInfo.appointmentDate;
		         	               	appointmentService.staffModifyAppointmentItem.donor = $scope.donor;
		         	               	appointmentService.staffModifyAppointmentItem.displayTimeSlot = $scope.timeSlotData.displayTimeSlot;
		         	               	appointmentService.staffModifyAppointmentItem.numberOfKids = appointmentInfo.numberOfKids;
		         	               	appointmentService.staffModifyAppointmentItem.sourceView = "DonorView1Day";
		         	               	appointmentService.staffModifyAppointmentItem.timeSlot = $scope.timeSlotData.timeSlot;
		         	               	$modalInstance.dismiss('cancel');
		         	           		$location.path('/appointments/staff-modify-appointment');
	         	            	}
	         	            	
	         	            	$scope.deleteStatus = { message: null, status: null};
	         	            	var deleteCallback = function(data) {
	         	            		// Either the deleted appointmentId is
									// returned or null returned on failure
	         	            		$scope.deleteStatus = (data) ? { message: 'Appointment successfully deleted.', status : true} : { message: 'There was an error attempting to delete the appointment.', status : false};
	         	            		
	         	            		// TODO: refresh the slot data post delete?
	         	            	}
	         	            	
	         	            	$scope.deleteAppointment = function(donor) {
	         	            		$scope.deleteStatus = { message: null, status: null};
	         	            		$scope.isLoading = true;
	         	            		calendarService.deleteAppointment(donor.appointmentId, deleteCallback);
	         	            	}
	                             
	                             var scheduleQuickPhysicalCallback = function(data) {
	         	                	$scope.quickPhysicalResponse = data;
	         	                };
	         	            	
	         	                $scope.cancel = function () {
	         	                	$scope.showSuccessMessage = false;
	         	                	$scope.showErrorMessage = false;
	         	                	$scope.showCloseButton = false;
		       	                	$scope.showOKButton = false;
	         	                	$scope.appointmentToBeScheduledDate = '';
	         	                	$scope.appointmentToBeScheduledTime = '';
	         	                    $modalInstance.dismiss('cancel');
	         	                };	         	                
		       	                
		       	                $scope.reset = function() {
		       	                	$scope.showSuccessMessage = false;
		       	                	$scope.showCloseButton = false;
		       	                	$scope.showOKButton = false;
		       	                };
	         	                
	         	                var scheduleQuickPhysicalCallback = function(data) {
	         	                	$scope.isScheduling = false;
	         	                	$scope.quickPhysicalResponse = data;	 
	         	                	$scope.showSuccessMessage = true;
	         	                	if($scope.quickPhysicalResponse === "") {
	        	                		$scope.quickPhysicalResult = "Appointment Scheduled Successfully!";
	         	                		$scope.showCloseButton = true;
	         	                		calendarService.getDonorViewTimeSlots($scope.dt, loadTimeSlotsData);
	         	                	} else if ($scope.quickPhysicalResponse === "Email already registered."){
	         	                		$scope.quickPhysicalResult = "Donor email address is already registered.";
	         	                		$scope.showOKButton = true;
	         	                	} else if ($scope.quickPhysicalResponse === "Invalid Login! Please Try Again."){
	         	                		$scope.quickPhysicalResult = "Invalid Login! Please Try Again.";
	         	                		$scope.showOKButton = true;
	         	                	} else {
	         	                		$scope.quickPhysicalResult = "Error Scheduling Quick Physical.";
	         	                	}             		                	
	         	                };
	         	                
	         	                $scope.scheduleQuickPhysical = function(){
	         	                	$scope.isScheduling = true;
	         	                	if($scope.phoneType === "Home"){
	         	                		$scope.phoneTypeValue = 1;
	         	                	}else if($scope.phoneType === "Work"){
	         	                		$scope.phoneTypeValue = 2;
	         	                	}else{
	         	                		if($scope.phoneType === "Mobile") {
	         	                			$scope.phoneTypeValue = 3;
	         	                		}
	         	                	}
	         	                	$scope.quickPhysicalRequest = {
	         		                	firstName : $scope.firstName,
	         		                	lastName : $scope.lastName,
	         		                	phoneNumber : $scope.phoneNumber,
	         		                	phoneType : $scope.phoneTypeValue,
	         		                	empLogin : $scope.empLogin,
	         		                	empPassword : $scope.empPassword,
	         		                	apptTypeId : 2,
	         		                	apptDate : $scope.date,
	         		                	apptTime : $scope.time,
	         		                	emailAddress : $scope.emailAddress
	         	                	};
	         	                	appointmentService.scheduleQuickPhysical($scope.quickPhysicalRequest, scheduleQuickPhysicalCallback);
	         	                };	                
	         	              
	         	                /**
								 * Controller section for the search context
								 */
	         	                
	         	                
	         	                var searchCallback = function(data) {
	         	                	$scope.searchExecuted = true;
	         	                	$scope.searchRequest = {
	         	                			 firstName : "",
	         	                        	 lastName : "",
	         	                        	 pdn : ""
	         	   	                };
	         	               		$scope.searchList = data;
		         	               	$scope.allQuickPhysical = true;
		    	               		$scope.continueForEach = true;
		    	               		// Check if all donors are Quick Physical in
									// result
		    	               		angular.forEach($scope.searchList, function(donor) {   			
		    	               			if($scope.continueForEach) {
		    	            	   			if(donor.id + '' !== donor.loginId) {
		    	            	   				$scope.allQuickPhysical = false;
		    	            	   				$scope.continueForEach = false;
		    	            	   			};
		    	               			};
		    	               		});
		    	                   	if(data.length == 0 || $scope.allQuickPhysical) {
		    	                   		$scope.noResultsMessage = true;        		
		    	                   	};
	         	                   	$scope.isSearching = false;
	         	                   	$scope.donorResult = true;                 
	         	                }
	         	                
		         	            $scope.find = function() {
		         	            	$scope.searchExecuted = false;
		       	                	$scope.isGlobalSearch = false;
		       	                	$scope.modalContext = 'search';
		       	                	$scope.errorMessage = false;
		       	                   	$scope.noResultsMessage = false;
		       	                   	$scope.allQuickPhysical = false;
		       	                   	$scope.isSearching = true;
		       	                   	$scope.isDonorSelected = false;
			       	                $scope.needsPlayroom.boolean = false;
			 	                   	$scope.numberOfKids = 0;
		       	                	if($scope.searchRequest.firstName || $scope.searchRequest.lastName || $scope.searchRequest.pdn) {
		       	                       	staffProfileService.getSearchDonor($scope.searchRequest, searchCallback);
		       	                       	if ($scope.searchRequest.pdn) {
		       	                       		$scope.isGlobalSearch = true;
		       	                       	}
		       	                   	}  else {
		       	                   		$scope.isSearching = false;
		       	                   		$scope.errorMessage=true;
		       	                   	}
		       	                }
	         	                
	         	                $scope.showQuickPhysicalInput = function(){
	         	                	$scope.modalContext = 'quickPhysical';
	         	                };
	         	                
	         	                // QUICK PHYSICAL
	         	                
	         	                
	         	                // SCHEDULE SETUP
	         	                var findDonorScheduleSetupCallback = function(data) {	         	                	
	         	                	$scope.donorSearchCriteriaResponse = data;
	         	                	$scope.findDonorCheckScheduleAvailability();
	         	                };	                
	         	                $scope.findDonorScheduleSetup = function() {
	         	                	$scope.isLoading = true;
	         	                	$scope.appointmentToBeScheduledDate = $scope.donorSearchCriteriaResponse.appointmentDate;
	         	                	$scope.appointmentToBeScheduledTime = $scope.donorSearchCriteriaResponse.appointmentTime;
	         	                	appointmentService.findDonorScheduleSetup($scope.donorSearchCriteriaResponse, findDonorScheduleSetupCallback);
	         	                };
	         	                
	         	                // SCHEDULE AVAILABILITY
	         	                var findDonorCheckScheduleAvailabilityCallback = function(data){
	         	                	   $scope.lastErrorMessage = data.lastErrorMessage;
	         	                	   if (data.lastErrorMessage !== null || data.lastErrorMessage !== undefined || data.lastErrorMessage !== ""){
	         	                		   $scope.lastErrorMessage = data.lastErrorMessage;
	         	                		   $scope.hasErrorMessage = false;
	         	                		   if ($scope.lastErrorMessage === "The donor is deferred. Are you sure you want to override the deferral?"){
	         	                			   $scope.modalContext = 'searchIsDeferred';
	         	                		   } else if ($scope.lastErrorMessage === ""){
	         	                			   $scope.modalContext = 'okToSchedule';
	         	                		   } else if ($scope.lastErrorMessage !== "" && $scope.lastErrorMessage !== undefined){
	         	                			   $scope.modalContext = 'unableToSchedule';
	         	                		   }
	         	                	   }
	         	                	   $scope.isLoading = false;
	         		            	   $scope.donorData = data;
	         		            	   $scope.donorSearchCriteriaResponse = data;
	         		               };
	         		               
	         		            $scope.findDonorCheckScheduleAvailability = function(){
	         		            	appointmentService.findDonorCheckScheduleAvailability($scope.donorSearchCriteriaResponse, findDonorCheckScheduleAvailabilityCallback);
	         		            };
	                           
	         	                // CONFIRM APPOINTMENT
	         	                var findDonorConfirmAppointmentCallback = function(data){
	         	                	$scope.isScheduling = false;
	         	                	$scope.donorSearchCriteriaResponse = data;
	         	                	if (data.lastErrorMessage === ""){
	         	                		$scope.showSuccessMessage = true;
	         	                		calendarService.getDonorViewTimeSlots($scope.dt, loadTimeSlotsData);
	         	                	}else {
	         	                		$scope.showErrorMessage = true;
	         	                		$scope.lastErrorMessage = data.lastErrorMessage;
	         	                	}
	         		            }
	         		               
	         		            $scope.findDonorConfirmAppointment = function(){
	         		            	$scope.isScheduling = true;
	         		            	if($scope.donorSearchCriteriaResponse.numberOfChildren > 0) {
	         		            		$scope.donorSearchCriteriaResponse.iChildren = $scope.donorSearchCriteriaResponse.numberOfChildren;
	         		            	}
	         		            	appointmentService.findDonorConfirmAppointment($scope.donorSearchCriteriaResponse, findDonorConfirmAppointmentCallback);
	         		            }                
	         	               
	         	               // CHILDREN VALUE
	         	               var findDonorValueChangedChildrenCallback = function(data){
	         	            	   $scope.donorSearchCriteriaResponse = data;
	         	               };
	         	               
	         	               $scope.findDonorValueChangedChildren = function(){
	         	            	   appointmentService.findDonorValueChangedChildren($scope.donorSearchCriteriaResponse, findDonorValueChangedChildrenCallback);
	         	               };	              	               
	         	               
	         	               // PLAYROOM
	         	               var findDonorNeedToUsePlayRoomCallback = function(data){
	         	            	   $scope.donorSearchCriteriaResponse = data;
	         	               };
	         	               
	         	               $scope.findDonorNeedToUsePlayRoom = function(){
	         	            	   appointmentService.findDonorNeedToUsePlayRoom($scope.donorSearchCriteriaResponse, findDonorNeedToUsePlayRoomCallback);
	         	               }; 
	         	               	         	             
	         	               $scope.$watch('needsPlayroom.boolean', function (newVal, oldVal) {
		      		        		if (!newVal) {
		      		        			if($scope.donorSearchCriteriaResponse !== undefined) {
		      		        				$scope.donorSearchCriteriaResponse.numberOfChildren = 0;
		      		        				$scope.donorSearchCriteriaResponse.hasChildren = 'N';
		      		        				$scope.donorSearchCriteriaResponse.playRoomNeeded = false;
		      		        			}
		      		        		} else {
		      		        			$scope.donorSearchCriteriaResponse.hasChildren = 'Y';
		      		        			appointmentService.findDonorNeedToUsePlayRoom($scope.donorSearchCriteriaResponse, findDonorNeedToUsePlayRoomCallback);
		      		        		}
	         	               });
	      	               
		      		           $scope.numberKidsChange = function(number) {
		      		        		if (number > 0) {
		          		        		$scope.numberOfKids = number;
		          	        			$scope.donorSearchCriteriaResponse.iChildren = number;
		          	        			$scope.donorSearchCriteriaResponse.numberOfChildren = number;
		          	        			$scope.donorSearchCriteriaResponse.hasChildren = 'Y';
		          	        			$scope.donorSearchCriteriaResponse.playRoomNeeded = true;
		          	        			
		          		        		$scope.isLoadingData = true;
		          		        		appointmentService.findDonorValueChangedChildren($scope.donorSearchCriteriaResponse, findDonorValueChangedChildrenCallback);	         		        	
		      		        		}
		      		           }
	         	               
	         	               var findDonorOverRideDeferralCancelCallback = function(data){
	         	            	   $scope.donorSearchCriteriaResponse = data;
	         	               };
	         	               
	         	               $scope.findDonorOverRideDeferralCancel = function(){	 
	         	            	   appointmentService.findDonorOverRideDeferralCancel($scope.donorSearchCriteriaResponse, findDonorOverRideDeferralCancelCallback);
	         	               };
	         	               
	         	               $scope.yesDefer = function(){
	         	            	   $scope.modalContext = 'yesDeferral';
	         	               };
	         	               
	         	               var findDonorOverRideDeferralOkCallback = function(data){
	         	            	   $scope.isScheduling = false;
	         	            	   if(data.responseMessage === "Appointment scheduled successfully."){
	         	            		   $scope.showSuccessMessage = true;
	         	            		   calendarService.getDonorViewTimeSlots($scope.dt, loadTimeSlotsData);
	         	            	   }
	         	            	   $scope.donorSearchCriteriaResponse = data;
	         	               };
	         	               
	         	               $scope.findDonorOverRideDeferralOk = function(){
	         	            	   $scope.isScheduling = true;
	         	            	   if($scope.donorSearchCriteriaResponse.numberOfChildren > 0) {
	         	            		   $scope.donorSearchCriteriaResponse.iChildren = $scope.donorSearchCriteriaResponse.numberOfChildren;
	         	            	   }
	         	            	   appointmentService.findDonorOverRideDeferralOk($scope.donorSearchCriteriaResponse, findDonorOverRideDeferralOkCallback);
	         	               };
	         	               	               	               	               	                    	                   	               
	         	               
	         	                   
	         	                
	         	                var donorInitializeCallback = function(data) {
	         	                	$scope.donorData = data;
	         	                	$scope.donorSearchCriteriaResponse = data;
	         	                	$scope.donorSearchCriteriaResponse.donorId = $scope.donorInfo.id;
	         	                	$scope.donorSearchCriteriaResponse.appointmentDate = $scope.date;
	         	                	$scope.donorSearchCriteriaResponse.appointmentTime = $scope.timeSlotData.timeSlot;
	         	                	$scope.donorSearchCriteriaResponse.appointmentTypeId = $scope.selectedApptTypeId;	
	         	                	if($scope.donorData.playRoomNeeded && $scope.donorData.numberOfChildren > 0) {
	        	                		$scope.needsPlayroom.boolean = $scope.donorData.playRoomNeeded;
	        	                		$scope.numberKidsChange($scope.donorData.numberOfChildren);	        	                		
	        	                	}
	         	                };
	         	                
	         	                var selectedSearchDonorCallback = function(data) {      	
	         	                   	if(data.length == 0) {
	         	                   		$scope.noResultsMessage = true;        		
	         	                   	} else {
	         	                   		$scope.donorSelected = true;
	         	                   		appointmentService.findDonorInitialization(donorInitializeCallback);
	         	                   	}	
	         	                };
	         	               
	                            $scope.selectedDonor = function(donor) {
	                         	   $scope.donorInfo = donor;
	                         	   if(donor.pdn !== undefined) {
	                                   var donorSessionRequest = {
	                                		donorId : donor.id,
	                                		pdn : donor.pdn,
	                                		loginId : donor.loginId,
	                                		centerId : donor.centerId,
	                                		currentCenterLocalTime : donor.center.currentLocalTime,                 			            
	                                		alias : donor.center.alias
	                                   };
	                         	   } else {
	                         		  var donorSessionRequest = {
	                                		donorId : donor.id,
	                                		loginId : donor.loginId,
	                                		centerId : donor.centerId,
	                                		currentCenterLocalTime : donor.center.currentLocalTime,                 			            
	                                		alias : donor.center.alias
		                              };
	                         	   }
	                            	
	         	                   	if(donorSessionRequest.loginId != null) {
	         	                       	staffProfileService.setSelectedDonor(donorSessionRequest, selectedSearchDonorCallback);
	         	                       $scope.isDonorSelected = true;
	         	                   	}  else {
	         	                   		$scope.errorMessage=true;
	         	                   	}
	                            }
	         	            }],
	         	            backdrop: 'static',
	         	            scope: $scope
	         	        });
	         	
	         	        modalInstance.result.then(function (info) {
	         	            // $scope.donorInfo = info;
	         	            console.log("result then");
	         	        });
	                 }
	} ]);
	
	bdpAppControllers.controller('MarketingNewCenterSetupController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', function ($scope, $location, marketingService, centerService, profileService) {    	
		// $scope.newCenter = "";
    	$scope.showCenterImgSizeMessage = false;
 		$scope.newImage = {};
 		$scope.isLoadingImageData = false;
 		$scope.isSavingCenterData = false;
 		$scope.daycareAvail = ["Y","N"];
 		$scope.centerInfoSaved = false;
 		$scope.canSaveImage = false;
 		$scope.centerInfoSaveSuccess = false;
 		$scope.centerInfoSaveFail = false;
 		$scope.centerImageSaveSuccess = false;
 		$scope.centerImageSaveFail = false;
 		$scope.calendarOpen = false;
 		$scope.format = 'shortDate';
 		
 		$scope.open = function($event) {
 		    $event.preventDefault();
 		    $event.stopPropagation();
 		    
 		    $scope.calendarOpen = true;
 		};
 		
 		$scope.$watch('newImage.imageName', function(newValue, oldValue){
 			if (newValue !== undefined && newValue !== ""){
 				if ($scope.newImage.file !== undefined && ($scope.newImage.imageName !== undefined || $scope.newImage.imageName !== "")){
 					$scope.canSaveImage = true;
 				}
 			}else{
 				$scope.canSaveImage = false;
 			}
 		});
 		
 		$scope.$watch('newImage.file', function(newValue, oldValue){
 			if (newValue !== undefined){
 				if ($scope.newImage.file !== undefined && ($scope.newImage.imageName !== undefined || $scope.newImage.imageName !== "")){
 					$scope.canSaveImage = true;
 				}
 			}
 		});
 		
 		var loadCenterImagesCallback = function (imageResponse) {
 			$scope.isLoadingImageData = false;
 			$scope.centerImages = imageResponse.centerImages;
 		};
 		// $scope.isLoadingImageData = true;
 		
 		var statesCallback = function(data) {
         	$scope.states = data.countries[2].states;        	
         };
         profileService.getProfileDropdowns(statesCallback);      
         
         var saveProfileCallback = function(data) {
         	if (data != null) {
         		$scope.centerInfoSaved = true;
         		$scope.isSavingCenterData = false;
         		if(data.responseBoolean === true){
         			$scope.centerInfoSaveSuccess = true;
         		}else{
         			if(data.responseBoolean === false){
         				$scope.centerInfoSaveFail = true;
         			}
         		}
         		// $location.path('/new-center-setup-add-image');
         	}else {
         		$scope.isSavingCenterData = false;
         	}
         };
         $scope.saveProfile = function() {
         	var newCenterSetupRequest = {
         			newCenter : $scope.newCenter
         	};
         	$scope.isSavingCenterData = true;
         	marketingService.saveProfile(newCenterSetupRequest, saveProfileCallback);
         };
         
         $scope.saveCenterImage = function () {
        	 $scope.showCenterImgSizeMessage = false;
 			var successCallback = function (image) {
 				if(image.imageUploadSizeUnAcceptable !== undefined && image.imageUploadSizeUnAcceptable === "The image cannot be uploaded due to the upload size being incorrect") {
 					$scope.showCenterImgSizeMessage = true;
 				}
 				if($scope.showCenterImgSizeMessage === false){
	 				if (image !== null || image !== undefined){
	 					$scope.centerImageSaveSuccess = true;
	 					centerService.getCenterImages(loadCenterImagesCallback);
	 				} else{
	 					$scope.centerImageSaveFail = true;
	 				}
 				}				
 				$scope.isLoadingImageData = false;
 				$scope.newImage = {};
 			};
 			$scope.isLoadingImageData = true;
 			centerService.saveCenterImage($scope.newImage, successCallback);
 		};
 		$scope.removeCenterImage = function (centerImage) {
 			var successCallback = function (image) {
 				centerService.getCenterImages(loadCenterImagesCallback);
 				$scope.isLoadingImageData = false;
 			};
 			$scope.isLoadingImageData = true;
 			centerService.removeCenterImage(centerImage, successCallback);
 		};

     } ]);
	
	bdpAppControllers.controller('MarketingNewCenterEventController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', function ($scope, $location, marketingService, centerService, profileService) {    	
		$scope.isSavingCenterEventData = false;
			$scope.plazmoEvent = ["Y","N"];
			$scope.format = 'shortDate';
			$scope.hstep = 1;
			$scope.mstep = 5;
			$scope.centerEventSaveSuccess = false;
			$scope.centerEventSaveFail = false;
			$scope.startTime = new Date();
 			$scope.startTime.setHours(0,0,0,0);
 			$scope.endTime = new Date();
 			$scope.endTime.setHours(0,0,0,0);
			$scope.ismeridian = true;
			$scope.startOpened = false;
			$scope.endOpened = false;
			$scope.centerIds = [];
			$scope.centers = [];
			$scope.selectedCenters = [];
			$scope.centerEventSaveResult = '';
			$scope.savingCenterEvent = false;
			$scope.centerEvents;
			moment.locale('en', {
			    longDateFormat : {
			        LT: "h:mmA",
			        LTS: "h:mm:ss A",
			        L: "MM/DD/YYYY",
			        LL: "MMM Do",
			        LLL: "MMM Do LT",
			        LLLL: "dddd, MMMM Do YYYY LT"
			    }
			});
			$scope.centerEventRequest = {					
					centerIds : [],
					startDate : undefined,
					endDate : undefined,
					startTime : $scope.startTime, 
					endTime : $scope.endTime, 
					eventName : undefined, 
					eventLocation : undefined, 
					plazmoEvent : undefined,
					eventPhone : undefined, 
					eventDetails : undefined, 
					additionalDetails : undefined, 
					externalEventLink : undefined,
					startDay : undefined,
					startMonth : undefined,
					startYear : undefined,
					startHour : undefined,
					startMinute : undefined,
					startMeridiem : undefined,
					endDay : undefined,
					endMonth : undefined,
					endYear : undefined,
					endHour : undefined,
					endMinute : undefined,
					endMeridiem : undefined
			}
			
			var getAllCenterEventsSuccesCallback = function(data) {
				$scope.centerEvents = data.centerEvents;
			}
			centerService.getAllCenterEvents(getAllCenterEventsSuccesCallback);
			
			var centersSuccessCallback = function(data) {
				if(data !== null){
					centerService.centersForMarketing = centerService.removeStatesFromArray(data);
					$scope.centers = centerService.centersForMarketing;
				}
			};
			
			/* if(centerService.centersForMarketing === undefined){ */
	    	centerService.loadMarketingCenters(centersSuccessCallback);
	    	/*
			 * }else{ $scope.centers = centerService.centersForMarketing; }
			 */
			
			$scope.addCenter = function(selectedCenter) {
				if(selectedCenter !== '' && selectedCenter !== undefined)
					$scope.selectedCenters.push(selectedCenter);
					$scope.selectedCenter = '';
			}
			
			$scope.deleteCenter = function(selectedCenter) {
				var index = $scope.selectedCenters.indexOf(selectedCenter);
				$scope.selectedCenters.splice(index, 1);
			}
			
			$scope.$watch('startTime', function(newValue, oldValue) {
	            if (newValue) {
	            	$scope.centerEventRequest.startTime = newValue;
	            }
	        });
			
			$scope.$watch('endTime', function(newValue, oldValue) {
	            if (newValue) {
	            	$scope.centerEventRequest.endTime = newValue;
	            }
	        });
			
			$scope.toggleMode = function() {
			    $scope.ismeridian = !$scope.ismeridian;
			};
			
			$scope.openStartDate = function($event) {
	    		$event.preventDefault();
	    		$event.stopPropagation();
	    		$scope.reportStartDate = true;
	    	}
			
			$scope.open = function($event, opened) {
			    $event.preventDefault();
			    $event.stopPropagation();

			    $scope[opened] = true;
			  };

			  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };
			  
			  var tomorrow = new Date();
			  tomorrow.setDate(tomorrow.getDate() + 1);
			  var afterTomorrow = new Date();
			  afterTomorrow.setDate(tomorrow.getDate() + 2);
			  $scope.events =
			    [
			      {
			        date: tomorrow,
			        status: 'full'
			      },
			      {
			        date: afterTomorrow,
			        status: 'partially'
			      }
			    ];
			
			var statesCallback = function(data) {
	        	$scope.states = data.countries[2].states;        	
	        };
	        profileService.getProfileDropdowns(statesCallback);      
	        
	        // Saving center events
	        var saveNewCenterEventSuccessCallback = function (data) {
				if(data.responseBoolean) {
					centerService.getAllCenterEvents(getAllCenterEventsSuccesCallback);
					$scope.selectedCenters.length = 0;
					$scope.centerEventSaveSuccess = true;
					$scope.isSavingCenterEventData = false;
					$scope.centerEventRequest = {					
							centerIds : [],
							startDate : undefined,
							endDate : undefined,
							startTime : $scope.startTime, 
							endTime : $scope.endTime, 
							eventName : undefined, 
							eventLocation : undefined, 
							plazmoEvent : undefined,
							eventPhone : undefined, 
							eventDetails : undefined, 
							additionalDetails : undefined, 
							externalEventLink : undefined,
							startDay : undefined,
							startMonth : undefined,
							startYear : undefined,
							startHour : undefined,
							startMinute : undefined,
							startMeridiem : undefined,
							endDay : undefined,
							endMonth : undefined,
							endYear : undefined,
							endHour : undefined,
							endMinute : undefined,
							endMeridiem : undefined
 		 			}
				} else{
					$scope.centerEventSaveFail = true;
					$scope.isSavingCenterEventData = false;
				}
			};
	        
	        $scope.saveNewCenterEvent = function () {
	        	$scope.savingCenterEvent = false;
 	        	$scope.isSavingCenterEventData = true;
 	        	$scope.centerEventSaveSuccess = false;
 	        	$scope.centerEventSaveFail = false;
 	        	// Start date
 	        	if($scope.centerEventRequest.startDate !== undefined) {
 	        		$scope.centerEventRequest.startDay = $scope.centerEventRequest.startDate.getDate() + "";
 	        		$scope.centerEventRequest.startMonth = ($scope.centerEventRequest.startDate.getMonth() + 1) + "";
 	        		$scope.centerEventRequest.startYear = $scope.centerEventRequest.startDate.getFullYear() + "";
 	        	}
 	        	// Start time
 	        	if($scope.centerEventRequest.startTime !== undefined) {
 	        		$scope.centerEventRequest.startHour = ((($scope.centerEventRequest.startTime.getHours() + 11) % 12 + 1) + "");
 	        		$scope.centerEventRequest.startHour = $scope.centerEventRequest.startTime.getHours();
 	        		$scope.centerEventRequest.startMinute = $scope.centerEventRequest.startTime.getMinutes() + "";
 	        		if($scope.centerEventRequest.startMinute === "0") {
 	        			$scope.centerEventRequest.startMinute = "00";
 	        		}
 	        		if($scope.centerEventRequest.startTime.getHours() < 12) {
 	        			$scope.centerEventRequest.startMeridiem = "AM";
 	        		} else {
 	        			$scope.centerEventRequest.startMeridiem = "PM";
 	        		}
 	        	}
 	        	// End date
 	        	if($scope.centerEventRequest.endDate !== undefined) {
 	        		$scope.centerEventRequest.endDay = $scope.centerEventRequest.endDate.getDate() + "";
 	        		$scope.centerEventRequest.endMonth = ($scope.centerEventRequest.endDate.getMonth() + 1) + "";
 	        		$scope.centerEventRequest.endYear = $scope.centerEventRequest.endDate.getFullYear() + "";
 	        	}
 	        	// End time
 	        	if($scope.centerEventRequest.endTime !== undefined) {
 	        		$scope.centerEventRequest.endHour = ((($scope.centerEventRequest.endTime.getHours() + 11) % 12 + 1) + "");
 	        		$scope.centerEventRequest.endHour = $scope.centerEventRequest.endTime.getHours();
 	        		$scope.centerEventRequest.endMinute = $scope.centerEventRequest.endTime.getMinutes() + "";
 	        		if($scope.centerEventRequest.endMinute === "0") {
 	        			$scope.centerEventRequest.endMinute = "00";
 	        		} 
 	        		if($scope.centerEventRequest.endTime.getHours() < 12) {
 	        			$scope.centerEventRequest.endMeridiem = "AM";
 	        		} else {
 	        			$scope.centerEventRequest.endMeridiem = "PM";
 	        		}
 	        	}
 				for(var i = 0; i < $scope.selectedCenters.length; i++) {
 					if($scope.centerEventRequest.centerIds.indexOf(i) === -1) {
 						$scope.centerEventRequest.centerIds.push($scope.selectedCenters[i].id);
 					}
 	        	}
 				centerService.saveCenterEvent($scope.centerEventRequest, saveNewCenterEventSuccessCallback);
			};
			
			// Removing center events
			var removeCenterEventSuccessCallback = function(data){
				$scope.centerEvents = data.centerEvents;
			};		
			$scope.removeCenterEvent = function(event) {
				centerService.removeCenterEvent(event, removeCenterEventSuccessCallback);
			};
	} ]);
	
	bdpAppControllers.controller('MarketingImportantCenterUpdatesController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', 'menuService', function ($scope, $location, marketingService, centerService, profileService, menuService) {    	
		$scope.noCenterUpdateMessages = false;
			$scope.isAddCenterUpdateMessage = false;
			$scope.message = {
					centerId : undefined,
					description : undefined
			};
			$scope.centers;
			$scope.selectedCenter;
			
			var centersSuccessCallback = function(data) {
				if(data !== null){
					centerService.centersForMarketing = centerService.removeStatesFromArray(data);
					$scope.centers = centerService.centersForMarketing;
				}
			};
			
			/* if(centerService.centersForMarketing === undefined){ */
	    	centerService.loadMarketingCenters(centersSuccessCallback);
	    	/*
			 * }else{ $scope.centers = centerService.centersForMarketing; }
			 */
		
			var centerUpdateMessagesCallback = function(data) {
				if(data !== undefined) {
					$scope.centerUpdateMessages = data;
				} else {
					$scope.noCenterUpdateMessages = true;
				}
			};
			menuService.getCenterUpdateMessages(centerUpdateMessagesCallback);
	        
	        $scope.toggleAddCenterUpdateMessage = function(){
	        	$scope.isAddCenterUpdateMessage = !($scope.isAddCenterUpdateMessage);
	        };
			
			var statesCallback = function(data) {
	        	$scope.states = data.countries[2].states;        	
	        };
	        profileService.getProfileDropdowns(statesCallback);
	        
	        var addCenterUpdateMessageCallback = function(data, $item) {
	        	$scope.isAddCenterUpdateMessage = !($scope.isAddCenterUpdateMessage);
	        	$scope.centerUpdateMessages = data;
	        	$scope.message.centerId = undefined;
	        	$scope.message.description = undefined;
	        };
	        
	        $scope.addCenterUpdateMessage = function() {
	        	$scope.message.centerId = $scope.selectedCenter.id;
	        	centerService.addCenterUpdateMessage($scope.message, addCenterUpdateMessageCallback);
	        };
	        
	        var removeCenterUpdateMessageCallback = function(data) {
	        	$scope.message.centerId = undefined;
	        	$scope.message.description = undefined;
	        	$scope.centerUpdateMessages = data;	        	
	        };
	        
	        $scope.removeCenterUpdateMessage = function(message) {
	        	$scope.message = message;
	        	centerService.removeCenterUpdateMessage($scope.message, removeCenterUpdateMessageCallback);
	        }; 	        
	} ]);
	
	bdpAppControllers.controller('MarketingEditCenterController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', 'menuService', function ($scope, $location, marketingService, centerService, profileService, menuService) {    	
		$scope.calendarOpen = false;
 		$scope.format = 'shortDate';
 		$scope.openingDateSaved = false;
 		$scope.openingDateSaveError = false;
 		$scope.savingOpeningDate = false;
 		$scope.unopenCenters = [];
 		$scope.selectedCenter;
 		$scope.openingDate;
 		
 		$scope.open = function($event) {
 		    $event.preventDefault();
 		    $event.stopPropagation();
 		    
 		    $scope.calendarOpen = true;
 		};
 		
 		$scope.removeOpenCenters = function(data) {
 			var today = new Date();
 			today = today.getTime();
 			var length = data.length;
 			for(var i = 0; i < length; i++) {
 				if(data[i].openingDate === undefined) {
 					$scope.unopenCenters.push(data[i]);
 				} else {
 					var openDateTime = new Date(data[i].openingDate).getTime();
 					if (today < openDateTime){
 						$scope.unopenCenters.push(data[i]);
 					}
 				}
 			}
 			$scope.centers = $scope.unopenCenters;
 		};
 		
 		var centersSuccessCallback = function(data) {
 			if(data !== null){
 				centerService.centersForMarketing = centerService.removeStatesFromArray(data);
 				$scope.centers = centerService.centersForMarketing;
 				$scope.centers = $scope.removeOpenCenters($scope.centers);
 			}
 		};
 		
 		/* if(centerService.centersForMarketing === undefined){ */
     	centerService.loadMarketingCenters(centersSuccessCallback);
     	/*
		 * }else{ $scope.centers = centerService.centersForMarketing;
		 * $scope.centers = $scope.removeOpenCenters($scope.centers); }
		 */
 		
 		var saveCenterOpeningDateCallback = function(data) {
 			$scope.savingOpeningDate = false;
 			if(data === "true"){
 				$scope.openingDateSaved = true; 
 			} else {
 				$scope.openingDateSaveError = true;
 			}
 		};
 		$scope.saveCenterOpeningDate = function() {
 			$scope.savingOpeningDate = true;
 			$scope.openingDateSaveError = false;
 			$scope.openingDateSaved = false; 
 			// set date to utc or milliseconds prior to send to java and saving
			// in database
 			// look to center events to see how it is done there.
 			if($scope.openingDate !== undefined) {
 				$scope.selectedCenter.openingDate = $scope.openingDate;			
 				centerService.saveCenterOpeningDate($scope.selectedCenter, saveCenterOpeningDateCallback);
 			}
 		};
        
     } ]);
	
	bdpAppControllers.controller('MarketingCenterRelocationController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', 'menuService', function ($scope, $location, marketingService, centerService, profileService, menuService) {    	
		$scope.states;
 		$scope.reloCalendarOpen = false;
 		$scope.format = 'shortDate';
 		$scope.centerRelocationSaved = false;
 		$scope.centerRelocationSaveError = false;
 		$scope.centers;
 		$scope.selectedCenter;
 		$scope.centerRelocations;
 		$scope.showSavingErrorMessage = false;
 		$scope.centerRelocationRequest = {
 				centerId : undefined,
 				relocationDate : undefined,
 				addressLine1 : undefined,
 				addressLine2 : undefined,
 				city : undefined,
 				state : undefined,
 				zipCode : undefined
 		};
 		
 		
 		var relocationsCallback = function(data){
 			// Use this in new panel to display to use. Give option to delete a
			// relo.
 			$scope.centerRelocations = data.centerRelocations;
 		};
 		centerService.getAllCenterRelocations(relocationsCallback);
 		
 		var centersSuccessCallback = function(data) {
 			if(data !== null){
 				centerService.centersForMarketing = centerService.removeStatesFromArray(data);
 				$scope.centers = centerService.centersForMarketing;
 			}
 		};
 		
 		/* if(centerService.centersForMarketing === undefined){ */
     	centerService.loadMarketingCenters(centersSuccessCallback);
     	/*
		 * }else{ $scope.centers = centerService.centersForMarketing; }
		 */
 		
 		var statesCallback = function(data) {
         	$scope.states = data.countries[2].states;        	
         };
         if(profileService.profileDropdowns === undefined) {
         	profileService.getProfileDropdowns(statesCallback);   
         } else {
         	$scope.states = profileService.profileDropdowns.countries[2].states;
         }
         
         $scope.open = function($event) {
 		    $event.preventDefault();
 		    $event.stopPropagation();	    
 		    $scope.reloCalendarOpen = true;
 		};
 		
 		var saveCenterRelocationCallback = function(data){
 			if(data.responseBoolean) {
 				centerService.getAllCenterRelocations(relocationsCallback);
 				$scope.centerRelocationSaved = true;
 				$scope.showSavingErrorMessage === false;
 				$scope.centerRelocationRequest = undefined;
 				$scope.selectedCenter = undefined;
 			} else {
 				$scope.centerRelocationSaveError = true;
 			}
 		};
 		$scope.saveCenterRelocation = function() {
 			$scope.showSavingErrorMessage = false;
 			$scope.centerRelocationSaved = false;
 			$scope.centerRelocationSaveError = false;
 			if($scope.centerRelocations !== undefined){
	 			angular.forEach($scope.centerRelocations, function(relo){
	 				if($scope.selectedCenter.id === relo.centerId){
	 					$scope.showSavingErrorMessage = true;
	 				}	 				
	 			});
	 			if($scope.showSavingErrorMessage === false && $scope.selectedCenter !== undefined) {
	 				if($scope.selectedCenter !== undefined){
	 	 				$scope.centerRelocationRequest.centerId = $scope.selectedCenter.id;
	 	 			}
	 	 			if($scope.centerRelocationRequest.state !== undefined) {
	 	 				$scope.centerRelocationRequest.state = $scope.centerRelocationRequest.state.code;
	 	 			}
	 	 			if($scope.centerRelocationRequest.zipCode !== undefined){
	 	 				$scope.centerRelocationRequest.zipCode = $scope.centerRelocationRequest.zipCode; 
	 	 			}
	 	 			centerService.saveCenterRelocation($scope.centerRelocationRequest, saveCenterRelocationCallback);
	 			}
 			} else {
 				if($scope.showSavingErrorMessage === false) {
 					if($scope.selectedCenter !== undefined){
	 	 				$scope.centerRelocationRequest.centerId = $scope.selectedCenter.id;
	 	 			}
	 	 			if($scope.centerRelocationRequest.state !== undefined) {
	 	 				$scope.centerRelocationRequest.state = $scope.centerRelocationRequest.state.code;
	 	 			}
	 	 			if($scope.centerRelocationRequest.zipCode !== undefined){
	 	 				$scope.centerRelocationRequest.zipCode = $scope.centerRelocationRequest.zipCode; 
	 	 			}
	 	 			centerService.saveCenterRelocation($scope.centerRelocationRequest, saveCenterRelocationCallback);
	 			}
 			}			
 		};
 		
 		// Removing center events
		var removeCenterRelocationSuccessCallback = function(data){
			$scope.centerRelocations = data.centerRelocations;
			centerService.getAllCenterRelocations(relocationsCallback);
			$scope.showSavingErrorMessage === false;
		};		
		$scope.removeCenterRelocation = function(centerRelocation) {
			centerService.removeCenterRelocation(centerRelocation, removeCenterRelocationSuccessCallback);
		};		
 	} ]);

	bdpAppControllers.controller('MarketingCenterNewsMessagesController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', 'menuService', function ($scope, $location, marketingService, centerService, profileService, menuService) {    	
		$scope.messageTypeDescriptions;
 		$scope.messageTypeError = false;
 		$scope.noCenterNewsMessages = false;
 	    $scope.centerNewsMessages;
 	    $scope.errorGettingUpdatedMessages = false;
 	    $scope.isAddCenterNewsMessage = false;
 	    $scope.centers;
 	    $scope.selectedCenter;
 	    $scope.messageType;
 	    $scope.showSavingErrorMessage = false;
 	    $scope.message = {
 	    		centerId : undefined,
 	    		messageTypeId : undefined,
 	    		description : undefined
 	    };
 	    
 	    $scope.toggleAddCenterNewsMessage = function(data) {
 	    	$scope.isAddCenterNewsMessage = !($scope.isAddCenterNewsMessage);
 	    };
 	    
 	    var centersSuccessCallback = function(data) {
 			if(data !== null){
 				centerService.centersForMarketing = centerService.removeStatesFromArray(data);
 				$scope.centers = centerService.centersForMarketing;
 			}
 		};
 		
 		/* if(centerService.centersForMarketing === undefined){ */
     	centerService.loadMarketingCenters(centersSuccessCallback);
     	/*
		 * }else{ $scope.centers = centerService.centersForMarketing; }
		 */
 		
 	    var messageTypeDescriptionsCallback = function(data) {
 	    	if(data !== null) {
 	    		$scope.messageTypeDescriptions = data;
 	    	} else {
 	    		$scope.messageTypeError = true;
 	    	}
 	    };
 		centerService.getCenterNewsMessageTypeDescriptions(messageTypeDescriptionsCallback);
 				
 		var centerNewsMessageCallback = function(data) {
 			if(data !== null) {
 				$scope.centerNewsMessages = data;
 			} else {
 				$scope.noCenterNewsMessages = true;
 			}
 		};
 		centerService.getCenterNewsMessages(centerNewsMessageCallback);
 		
 		var addCenterNewsMessageSuccessCallback = function(data) {
 			if(data !== null) {
 				$scope.centerNewsMessages = data;
 				$scope.isAddCenterNewsMessage = false;
 				$scope.showSavingErrorMessage = false;
 				$scope.selectedCenter = undefined;
 				$scope.messageType = undefined;
 				$scope.message.description = undefined;
 			} else {
 				$scope.errorGettingUpdatedMessages = true;
 				$scope.showSavingErrorMessage = false;
 			}
 		};
 		
 		$scope.addCenterNewsMessage = function() {
 			$scope.errorGettingUpdatedMessages = false;
 			$scope.showSavingErrorMessage = false;
 			// Per Marketing:: Each center will only have one centerMessage at a
			// time
 			if($scope.centerNewsMessages.length > 0){
	 			angular.forEach($scope.centerNewsMessages, function(message){
	 				if($scope.selectedCenter.id === message.center.id){
	 					$scope.showSavingErrorMessage = true;
	 				}	 				
	 			});
	 			if($scope.showSavingErrorMessage === false && $scope.selectedCenter !== undefined && $scope.messageType !== undefined) {
	 				$scope.message.centerId = $scope.selectedCenter.id;
	 				$scope.message.messageTypeId = $scope.messageType.id;
	 				centerService.addCenterNewsMessage($scope.message, addCenterNewsMessageSuccessCallback);
	 			}
 			} else {
 				if($scope.showSavingErrorMessage === false && $scope.selectedCenter !== undefined && $scope.messageType !== undefined) {
	 				$scope.message.centerId = $scope.selectedCenter.id;
	 				$scope.message.messageTypeId = $scope.messageType.id;
	 				centerService.addCenterNewsMessage($scope.message, addCenterNewsMessageSuccessCallback);
	 			}
 			}
 		};
 				
 		var removeCenterNewsMessageSuccessCallback = function(data) {
 			if(data !== null) {
 				$scope.centerNewsMessages = data;
 				$scope.showSavingErrorMessage = false;
 			} else {
 				$scope.errorGettingUpdatedMessages = true;
 				$scope.showSavingErrorMessage = false;
 			}
 		};
 		$scope.removeCenterNewsMessage = function(message) {
 			$scope.errorGettingUpdatedMessages = false;
 			centerService.removeCenterNewsMessage(message, removeCenterNewsMessageSuccessCallback);
 		};
 	} ]);
	
	bdpAppControllers.controller('MarketingPopUpPromotionsController', ['$scope', '$location', 'marketingService', 'centerService', 'profileService', 'menuService', function ($scope, $location, marketingService, centerService, profileService, menuService) {
		$scope.marketingPromotion = {					
			centerId : 0,
			title : '',
			description : '',
			displayEffectiveDate : undefined,
			displayUntilDate : undefined,
			promotionTypeID : undefined,
			imageID : undefined,
			promotionURL : undefined
		}
		
		$scope.marketingPromotionMoibile = {					
			centerId : 0,
			title : '',
			description : '',
			displayEffectiveDate : undefined,
			displayUntilDate : undefined,
			promotionTypeID : undefined,
			imageID : undefined,
			promotionURL : undefined
		}
	
	} ]);
	
	bdpAppControllers.controller('ContactUsController', ['$scope', '$location', 'menuService', 'salesforceInquiryService', 'centerService', function ($scope, $location, menuService, salesforceInquiryService, centerService) {
		$scope.navigationUrl = 'html/menus/about-biolife/navigation-rail.html';
		$scope.pageStyle = 'about-biolife';
		$scope.bioLifeCenters = undefined;
		$scope.chosenCenter;
		$scope.displayErrorMessage = false;
		$scope.centersForDropdown = [];
		$scope.bioLifeInquiryRequestObject = {
				firstName: undefined,
				lastName: undefined,
				email: undefined,
				phone: undefined,
				city: undefined,
				state: undefined,
				zip: undefined,
				bioLifeLocation: undefined,
				status: undefined,
				subject: undefined,
				description: undefined
		};
		
		var loadCentersCallback = function(data) {			
			$scope.centers = data;
			angular.forEach($scope.centers, function(center) {   			
				if(center.name !== center.state) {
       				$scope.centersForDropdown.push(center);
       			}          			
       		});
		}
		centerService.loadStatesAndCenters(loadCentersCallback);
		
		var submitCallback = function(data) {
			if (data !== undefined && data.success === "true") {
				$location.path('/about-biolife/contact_thx');
			} else {
				$scope.displayErrorMessage = true;
			}
		}
		
		$scope.submit = function() {
			var centerLocation = $scope.chosenCenter.name.trim().toLowerCase();			
			centerLocation = centerLocation.replace(/-/g, '');
			centerLocation = centerLocation.replace(/\./g, '');
			centerLocation = centerLocation.replace(/\s/g, '');
			var centerState = $scope.chosenCenter.state.trim().toLowerCase();
			centerState = centerState.replace(/\s/g, '');
			$scope.bioLifeInquiryRequestObject.bioLifeLocation = centerState + '_' + centerLocation;
			salesforceInquiryService.contactUs($scope.bioLifeInquiryRequestObject, submitCallback);
		};

	} ]);
	
	bdpAppControllers.controller('FeedbackController', ['$scope', '$location', 'menuService', 'salesforceInquiryService', 'centerService', function ($scope, $location, menuService, salesforceInquiryService, centerService) {
		$scope.navigationUrl = 'html/menus/current-donor/navigation-rail.html';
		$scope.pageStyle = 'current-donor';
		$scope.bioLifeCenters = undefined;
		$scope.chosenCenter;
		$scope.displayErrorMessage = false;
		$scope.centersForDropdown = [];
		$scope.bioLifeInquiryRequestObject = {
				firstName: undefined,
				lastName: undefined,
				email: undefined,
				phone: undefined,
				bioLifeLocation: undefined,
				bioLifeDonationPeriod: undefined,
				bioLifeStory: undefined
		};
		
		var loadCentersCallback = function(data) {			
			$scope.centers = data;			
			angular.forEach($scope.centers, function(center) {   			
       			if(center.name !== center.state) {
       				$scope.centersForDropdown.push(center);
       			}           			
       		});
		}
		centerService.loadStatesAndCenters(loadCentersCallback);
		
		var submitCallback = function(data) {
			if (data !== undefined && data.success === "true") {
				$location.path('/current-donor/feedback_thank_you');
			} else {
				$scope.displayErrorMessage = true;
			}
		}
		
		$scope.submit = function() {
			var centerLocation = $scope.chosenCenter.name.trim().toLowerCase();			
			centerLocation = centerLocation.replace(/-/g, '');
			centerLocation = centerLocation.replace(/\./g, '');
			centerLocation = centerLocation.replace(/\s/g, '');
			var centerState = $scope.chosenCenter.state.trim().toLowerCase();
			centerState = centerState.replace(/\s/g, '');
			$scope.bioLifeInquiryRequestObject.bioLifeLocation = centerState + '_' + centerLocation;
			salesforceInquiryService.feedback($scope.bioLifeInquiryRequestObject, submitCallback);
		};
	
	} ]);
