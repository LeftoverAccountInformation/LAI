
	var bdpAppDirectives = angular.module('bdpApp.directives', [
	]);
	
	bdpAppDirectives.directive('centerImageDisplay', function ($rootScope, userService, profileService, staffProfileService, $timeout) {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/center-image-display.html',
	        controller: function ($scope) {
	            $scope.$on('finishedLoadingImages', function (ngRepeatFinishedEvent) {
	                var slider = $('.center-image-slider').bxSlider({
	                    auto: true,
	                    mode: 'fade',
	                    controls: false,
	                    pager: false,
						pause: 2000
	                });
	                /*$timeout(function () {
	                    slider.reloadSlider();
	                }, 3000);*/
	
	            });
	            
	            var localErrorCallback = function (){
	            	var singleImageArr = [];
	            	var imageUrl = 'r/assets/imgs/Building_Rendering.jpg';
                	var image = {
                			imageUrl: imageUrl
                	};
                	singleImageArr.push(image);
	            }
	            
	            var callback = function (profileInfo) {
	            	var singleImageArr = [];
	                var imageInfos = [];
	                var centerId = profileInfo.center.id;
	                var storedCenterImages = profileInfo.center.images;
	                var storedCenterMainImages = [];
	                storedCenterImages.forEach(function (image) {
	                    if (image.imageClassId == 4) {
	                    	storedCenterMainImages.push(image);
	                    }
	                });
	                if(storedCenterMainImages[0] === null || storedCenterMainImages[0] === undefined || storedCenterImages[0] === null || storedCenterImages[0] === undefined || storedCenterImages === undefined){
	                	var imageUrl = 'r/assets/imgs/Building_Rendering.jpg';
	                	var image = {
	                			imageUrl: imageUrl
	                	};
	                	singleImageArr.push(image);
	                	$scope.singleImageArr = singleImageArr;
	                }else{  
	                	storedCenterImages.forEach(function (image) {
		                    if (image.imageClassId == 4) {
		                        var imageUrl = $rootScope.siteInfoResponse.webServerPrefix;
		                        imageUrl += '/center-' + centerId;
		                        imageUrl += '/center-images/';
		                        imageUrl += image.savedFileName;
		                        var imageInfo = {
		                            imageUrl: imageUrl,
		                            name: image.name
		                        };
		                        imageInfos.push(imageInfo);
		                    }
		                });
	                	$scope.imageInfos = imageInfos;
	                }          
	            };
	
	            if (userService.isDonor()) {
	                profileService.getProfile(callback, localErrorCallback);
	            } else if (userService.isNonDonor()) {
	                staffProfileService.getStaffHomeData(callback, localErrorCallback);
	            }
	        }
	    };
	});
	
	bdpAppDirectives.directive('scheduleNowCalendar', function ($location, $window, staffProfileService, appointmentService, profileService, userService, centerService) {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/donor/appointments/schedule-now-calendar.html',
	        scope : {
	        	dt : "=",
	        	donationType : "=",
				userType : "=",
				reloadCalendar: "=",
				isLoadingCalendar: "=",
				isRescheduling: "=",
				currentCenter : "=",
				hasPdn: "=",
				isDonor: "="
	        },
	        controller: function ($scope, staffProfileService, appointmentService, profileService, userService, centerService) {
	        	$scope.initialLoad = true;
	        	$scope.donationType = null;
	        	$scope.minDate = new Date();
	        	$scope.maxDate = new Date();
	        	$scope.dayList = null;
	        	$scope.isLoadingCalendar;
	        	$scope.donationType = null;
				var availableDates = [];
				$scope.showCalendarLegend = false;
				$scope.currentMonth;
				$scope.chosenCenterId = 0;	
				$scope.allowCenterUpdate = false;

	        	//server side init	        	
	        	var donationsTimeframe = null;
	        	var physicalTimeframe = null;
				var parentStaffProfileService = staffProfileService;
				$scope.possibleCenters = [];
		        
				$scope.checkbox = {
			    	value : false
			    }
				
		    	var zipCodeCallback = function(data) {
		    		$scope.possibleCenters = data.centers;
		    	};		    			    
				
	        	var calendarInit = function() {
	        		appointmentService.getAppointmentTypes(function(data) {
		        		$scope.appointmentTypeList = data;
		        		//$scope.donationType = $scope.appointmentTypeList[0];
		        		$scope.isLoadingCalendar = true;
		        		if ($scope.initialLoad) {

							var loadDonorInfo = function (data) {
								if (data.center !== undefined) {
									$scope.profile = data;
									$scope.center = data.center;
									$scope.chosenCenterId = data.center.id;
									donationsTimeframe = $scope.center.donationsApptsInAdvance;
									physicalTimeframe = $scope.center.physicalsApptsInAdvance;
								}

								$scope.hasPdn = (data.pdn != undefined && data.pdn !== null);
								if ($scope.hasPdn) {
									$scope.donationType = $scope.appointmentTypeList[0];
								} else {
									$scope.donationType = $scope.appointmentTypeList[1];
									profileService.getCentersFromDonorZip($scope.profile.zipCode, zipCodeCallback);
								}
							};

							if ($scope.userType && $scope.userType == "staff-manager") {
								// if this is a staff or manager loading a donor from search
								var selectedDonor = parentStaffProfileService.getSelectedDonor();
								loadDonorInfo(selectedDonor);
							} else {
								// else this is a donor on the schedule now screen
		    	        		profileService.getProfile(loadDonorInfo);
							}
		        		}
		        	});
	        	}
	        	calendarInit();
	        	//end init
	        	
	        	function updateCalendar() {
	        		if ($scope.donationType !== undefined && $scope.donationType !== null) {
		        		$scope.isLoadingCalendar = true;
		        		var dateArray = [];
		        		//This currently gets data for every date displayed in the calendar
		        		//It can be made more efficient by omitting days in the past at the call time instead of letting it return INELIGIBLE_PAST_DATE
		        		angular.forEach(dayList, function(week) {
		        			angular.forEach(week, function(day) {
		        				dateArray.push(day.date);
		        			});
		        		});
		        		
		        		var scheduleDto = {
		                		appointmentType : $scope.donationType,
		                		dateRange : dateArray,
		                		centerId : $scope.chosenCenterId
		        		};
		        		appointmentService.getScheduleNowCalendar(scheduleDto, $scope.userType, function(data) {
		        			$scope.displayErrorMessage = false;
		        			availableDates = data;
		        			$scope.initialLoad = false;
			        		$scope.isLoadingCalendar = false;
			        		updateColors();
			        	});
	        		}
	        	}
	        	
	        	var dayList = [];
	        	//This gets us into the datepicker directives scope so we have access to the Calendar object
	        	$scope.$watch('$$childHead.$$childHead.rows', function (newVal, oldVal) {
	        		dayList = newVal;
	        		
	        		if (newVal !== undefined) {
	        			if (oldVal !== undefined) {
	        				//Check to see if the first day is the same date in both cases
	        				//This means we can skip a server update
	        				var newWeek = newVal[0];
	        				var oldWeek = oldVal[0];
	        				if($scope.initialLoad){
	        					updateCalendar();
	        				}else if (newWeek[0].date.getTime() == oldWeek[0].date.getTime()) {
	        					//don't update the calendar
	        					//updateCalendar();
	        				} else {
	        					updateCalendar();
	        				}
	        			} else if (!$scope.initialLoad) {
	        				//first time getting data, so update
		        			updateCalendar();
	        			}
	        		}
	        	});
	        	
	        	var updateColors = function() {	        		
	        		var getAvailableDateData = function(calendarDay, serverDateArray) {
	        			var len = serverDateArray.length;
	        			/*Grabs the month of the selected month based on a date at the middle of the array
    					this guarantees we always have the month the user selected*/
	        			$scope.currentMonth = new Date(serverDateArray[21].date).getMonth();
	        			for (var i = 0; i < len; i++) {
	        				//The calendar dates have 12 hours added inside their directive, so adding 
	        				// twelve here to match up.  setHours also returns the ms value
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
	        				if (true) {//}!day.disabled) {
	        					//find the avail date
	        					data = getAvailableDateData(day, availableDates);
	        					if (data != null) {
	        						//If date is within the selected month, display it, else it is disabled and set to white just like easyScheduler calendars
	        						if($scope.currentMonth === new Date(data.date).getMonth()){
		        						//Using jquery for styling to avoid having to modify the datepicker source code
		        						var button = $("#"+day.uid+" > button");
		        						var closedButton = $("#"+day.uid+" "+ closed+" > button");
		        						if (data.status === 'INELIGIBLE_DONATION_RULE' || data.status === 'INELIGIBLE_ALLOWABLE_WINDOW'
		        							|| 'INELIGIBLE_DIS_RULE' || 'PLAYROOM_FULL' || 'PLAYROOM_NOT_AVAILABLE_IN_ANY_SLOT_FOR_CHILD_NUM') {
		        							button.prop('disabled',false)
		        							.css("background-color", "#fc5757");
		        						}
		        						if (data.status === 'PAST_DATE'){
		        							button.prop('disabled',true)
		        							.css("background-color", "#767676");
		        						}
		        						if (data.status === 'EXISTING_APPOINTMENT') {
		        							button.prop('disabled',false)
		        							.css("background-color", "#59D659")
		        							.css("color", "#fff");
		        						}
		        						if (data.status === 'PREVIOUS_DONATION') {
		        							button.prop('disabled',true)
		        							.css("background-color", "#39C8F7")
		        							.css("color", "#fff");
		        						}
		        						if (data.status === 'INELIGIBLE_CLOSED') {
		        							button.prop('disabled',true)
		        							.css("background-color", "#FF0000");
		        						}
		        						if (data.status === "INELIGIBLE_OVERRIDE_DIS_RULE") {
		        							button.prop('disabled',false)
		        							.css("background-color", "#FF0000");
		        						}
		        						if (data.status === '' || data.status === 'EMPTY_STRING'){ //Available
		        							button.prop('disabled',false)
		        							.css("background-color", "#FFFFFF")
		        							.css("color", "#333");
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
	        	};

	        	$scope.$watch('donationType', function (newVal, oldVal) {
	        		$scope.maxDate = new Date();
	        		$scope.displayErrorMessage === false;
	        		if($scope.isDonor && newVal !== null && newVal.id === 2 && $scope.chosenCenterId !== undefined && $scope.chosenCenterId !== 0) {	        			
	        			if($scope.chosenCenterId !== $scope.profile.center.id) {	        			
		        			$scope.errorMessage = "Physical appointments must be scheduled at your home center " + $scope.profile.center.alias + ", " + $scope.profile.center.state.code + ".";
	        				$scope.displayErrorMessage = true;	        				
	        			} else {
	        				if (newVal) {
			        			$scope.maxDate.setDate((newVal.shortDescription == 'Donation') ? ($scope.maxDate.getDate() + donationsTimeframe) : ($scope.maxDate.getDate() + physicalTimeframe));
							}
			        		if (newVal !== null && !$scope.initialLoad) {
				        		updateCalendar();
			        		}
	        			}
	        		} else {
						if (newVal) {
		        			$scope.maxDate.setDate((newVal.shortDescription == 'Donation') ? ($scope.maxDate.getDate() + donationsTimeframe) : ($scope.maxDate.getDate() + physicalTimeframe));
						}
		        		if (newVal !== null && !$scope.initialLoad) {
			        		updateCalendar();
		        		}
	        		}
	        	});
	        	
	        	$scope.$watch('reloadCalendar', function(newVal, oldVal){
	        		if (newVal){
	        			updateCalendar();
	        			$scope.reloadCalendar = false;
	        		}
	        	})
	        	
	        	$scope.updateHomeCheckboxValue = function() {
	        		appointmentService.makeHomeLocation = $scope.checkbox.value;
	        	};
	        	
	        	$scope.toggleLegend = function(){
	        		$scope.showCalendarLegend = !($scope.showCalendarLegend);
	        	}
	        	
	        	var successCallback = function (centers) {
	                $scope.centers = centers;
	            };
	            centerService.loadStatesAndCenters(successCallback);
	        	
	        	$scope.schedulePhysicalCheck = function(centerId){
	        		$scope.checkResult = false;
	        		if($scope.donationType.id === 1) {
	        			$scope.checkResult = true;
	        			return $scope.checkResult;
	        		} else {
	        			//Zip codes overlap for sister centers
	        			angular.forEach($scope.possibleCenters, function(center){
	        				if(center.id === centerId){
	        					$scope.checkResult = true;
	    	        			return $scope.checkResult;	        						        				
	        				}
	        			});
	        			return $scope.checkResult;
	        		}
	        	};
	        	
	        	$scope.updateCenter = function(item, model, label) {
	        		$scope.displayErrorMessage = false;
	        		$scope.allowCenterUpdate = false;
	            	if(item.isState) {
	            		
	            	} else {
	            		if((item.consolidated === "Y" && item.centerId !== $scope.profile.center.id) || (item.centerId === $scope.profile.center.id)) {
	            			$scope.allowCenterUpdate = true;
			            	$scope.physicalCheck = $scope.schedulePhysicalCheck(item.centerId);		            	
		            		if ($scope.physicalCheck){
			            		$scope.chosenCenterId = item.centerId;
			            		appointmentService.appointmentItem.chosenCenterId = item.centerId;
			                	$scope.currentCenter = item.name + ', ' + item.stateCode;
			                	if($scope.chosenCenterId !== $scope.profile.centerId){
			                		$scope.allowCenterUpdate = true;
			                	} else {
			                		$scope.allowCenterUpdate = false;
			                	}
			                	$scope.reloadCalendar = true;
		            		} else {
		            			$scope.errorMessage = "Physical appointments must be scheduled at your home center " + $scope.profile.center.alias + ", " + $scope.profile.center.state.code + ".";
		            			$scope.displayErrorMessage = true;
		            		}
	            		} else {
	            			$scope.errorMessage = "To schedule at the " + item.name + ", " + item.stateCode + " location please contact your home center "+ $scope.profile.center.alias + ", " + $scope.profile.center.state.code + ".";
	            			$scope.displayErrorMessage = true;
	            		}
	            	}        	
	            };
	        	
	        	var updateDonationCenterCallback = function(data) {
	            	if (data.responseBoolean === true) {
	            		$scope.updateCenterMessage = "Saved!";
	            		$scope.currentCenter = data.donor.center.alias + ' ' + data.donor.center.state.code;
	            	}
	            	if (data.responseBoolean === false) {
	            		$scope.updateCenterMessage = "Error!";
	            	}
	        		$scope.showUpdateCenterMessage = true;
	            };
	            
	        	$scope.updateDonationCenter = function() {
	        		$scope.showUpdateCenterMessage = false;	        		
	        		$scope.updateCenterMessage = "";
	        		profileService.updateDonorCenter($scope.profile, updateDonationCenterCallback);	        		        	
	        	};
	        	
	        	var successCallback = function (centers) {
	                $scope.startsWith = function(state, viewValue) {
	                    return state.substr(0, viewValue.length).toLowerCase() === viewValue.toLowerCase();
	                };
	                $scope.selectedState = '';
	                $scope.centers = centers;
	            };
	            centerService.loadStatesAndCenters(successCallback);
	        	
	        }
	    };
	});
	
	bdpAppDirectives.directive('selectAppointmentTime', function ($location, $modal, $window, appointmentService, profileService, userService, googleTagManagerService) {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/donor/appointments/select-time.html',	        
	        controller: function ($scope) {
	        	$scope.isLoadingTimeSlotData = appointmentService.isLoadingTimeSlotData;
	        	$scope.setHomeLocation = appointmentService.makeHomeLocation;
	        	$scope.bookFailure = false;
	        	$scope.bookSuccess = false;
	        	$scope.reloadCalendar = false;
	        	$scope.reloadTimes = false;
	        	$scope.isLoadingCalendar = false;
	        	$scope.selectDateMessage = true;
	        	$scope.isLoadingData = false;
	        	$scope.dateSelected = undefined;
	        	$scope.appointmentType = undefined;
	        	$scope.donationLocation = undefined;
	        	$scope.needsPlayroom = false;
	        	$scope.numberOfKids = 0;
	        	$scope.kidsNumberRange = [1,2,3,4,5,6];
	        	$scope.timeSlots = undefined;
	        	$scope.appointmentInfo = {};
	        	$scope.isNonDonor = userService.isNonDonor();
	        	$scope.isDonor = userService.isDonor();
	        	$scope.apptsAvailable = false;
	        	$scope.showNoApptsAvailableMessage = false;
	        	$scope.chosenCenterId;
	        	$scope.checkbox = {
        			value : false
	        	};
	        	$scope.showHomeLocationUpdate = false;
	        	
	        	$scope.$watch('donor', function(newVal, oldVal){
	        		if(newVal !== undefined) {
	        			$scope.donor = newVal;
	        			if($scope.donor.numOfChildrenForDaycare !== undefined && $scope.donor.numOfChildrenForDaycare > 0) {
	        				$scope.needsPlayroom = true;
	        				$scope.numberKidsChange($scope.donor.numOfChildrenForDaycare);
	        				if(appointmentService.donorScheduleAppointmentResponse !== undefined) {
	        					appointmentService.donorScheduleAppointmentResponse.numberOfChildren = $scope.numberOfKids;
	        				}
	        			}
	        		}
	        	});
                
	        	$scope.donorScheduleAppointmentResponse;
	        	if (userService.isStaff() || userService.isManager()){
	        		$scope.userType = "staff-manager";
	        	}
	        	if (userService.isDonor()){
	        		$scope.userType = "donor";
	        	}	        	
				
	        	$scope.date = '';
	        	$scope.d = '';
	        	$scope.t = '';
	        	$scope.z = '';
	        	$scope.y = '';
	        	$scope.donorProfile = profileService.profile;

				var timeSlotCallback = function(data) {
					$scope.apptsAvailable = false;
					appointmentService.isLoadingTimeSlotData = false;
					$scope.isLoadingTimeSlotData = false;
					$scope.isLoadingData = false;
					$scope.reloadTimes = false;
					$scope.selectDateMessage = false;
					$scope.appointmentInfo = data;
					$scope.appointmentInfo.chosenCenterId = $scope.chosenCenterId;
					appointmentService.donorScheduleAppointmentResponse = data;
					$scope.appointmentExistsForDay = data.apptExistsForDay;
					$scope.timeSlots = appointmentService.donorScheduleAppointmentResponse.appointmentList;
					$scope.apptList = appointmentService.donorScheduleAppointmentResponse.apptSelectedDateList;
					if ($scope.isDonor) {
						angular.forEach($scope.timeSlots, function(appt){
	        				if(appt.selectedDayData.renderMakeAppointment === true || appt.selectedDayData.bookedAppointment === true){
	        					$scope.apptsAvailable = true;
	        				}
	        			});
						if (!$scope.apptsAvailable) {
							$scope.showNoApptsAvailableMessage = true;
						}	
					}
					$scope.isDateSelected = false;
					$scope.isXSDevice = false;
				};


	        	$scope.$watch('donationType', function (newVal, oldVal) {
	        		if(newVal !== undefined && newVal !== null){
	        			$scope.$parent.donationType = newVal;
	        			appointmentService.appointmentItem.appointmentTypeId = $scope.donationType.id;
	        			appointmentService.appointmentItem.appointmentTypeDescription = $scope.donationType.shortDescription;
	        			$scope.showNoApptsAvailableMessage = false;
	        		}
	        	});
	        	
	        	//This should work to catch any changes to the donation type as is whenever it is updated in the calendar directive
	        	$scope.$watch('donationType', function(newVal, oldVal) {
	        		
	        		if($scope.donationType !== undefined && newVal !== undefined && newVal !== null && ($scope.donationType !== undefined && $scope.donationType.id === 2 && $scope.donor !== undefined && $scope.donor.centerId !== appointmentService.appointmentItem.chosenCenterId)) {
	        			//do nothing. donors are trying to schedule a physical at a non home center.
	        		} else {
		        		if ($scope.donationType !== undefined && newVal !== undefined && newVal !== null){
		        			appointmentService.appointmentItem.appointmentTypeId = $scope.donationType.id;
		        			appointmentService.appointmentItem.appointmentTypeDescription = $scope.donationType.shortDescription;
		        		}
		        		if ($scope.dateSelected !== undefined) {
		        			$scope.showNoApptsAvailableMessage = false;
		        			$scope.isLoadingData = true;
		        			appointmentService.getAppointmentTimes(appointmentService.appointmentItem, $scope.userType, timeSlotCallback);
		        			$scope.pageLoadFalse();
		        		}
	        		}	        			        	
	        	});
	        	
	        	$scope.$watch('needsPlayroom', function (newVal, oldVal) {
	        		//4 scenarios:
	        		//Do not need playroom and date is not selected
	        		//Do not need playroom and date is selected
	        		//Do need playroom and date is not selected	        		
	        		//Do need playroom and date is selcted
	        		if(appointmentService.donorScheduleAppointmentResponse === undefined){
	        			//working with appointment item
	        			if (!newVal && $scope.dateSelected === undefined) {    
	        				$scope.numberOfKids = 0;
		        			appointmentService.appointmentItem.numberOfKids = $scope.numberOfKids;
	        			} else if (!newVal && $scope.dateSelected !== undefined) {
	        				$scope.numberOfKids = 0;
		        			appointmentService.appointmentItem.numberOfKids = $scope.numberOfKids;
		        			$scope.showNoApptsAvailableMessage = false;
		        			$scope.isLoadingData = true;		        			
		        			appointmentService.getAppointmentTimes(appointmentService.appointmentItem, $scope.userType, timeSlotCallback);
	        			} else {
	        				//do nothing because they chose Yes and no change is needed right now because we dont load data until they pick # of children needed
	        			}
        			} else {
		        		if (!newVal) {
		        			$scope.numberOfKids = 0;
		        			appointmentService.appointmentItem.numberOfKids = $scope.numberOfKids;
		        			appointmentService.donorScheduleAppointmentResponse.childCareRequired = 'N';
		        			appointmentService.donorScheduleAppointmentResponse.iChildren = $scope.numberOfKids;
		        			//appointmentService.donorScheduleAppointmentResponse.numberOfChildren = $scope.numberOfKids;
		        			appointmentService.donorScheduleAppointmentResponse.renderChildCare = 'false';
		        			$scope.showNoApptsAvailableMessage = false;
		        			$scope.isLoadingData = true;
		        			appointmentService.donorScheduleAppointmentResponse.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
		        			appointmentService.dsaValueChangedChildCareNo(appointmentService.donorScheduleAppointmentResponse,  timeSlotCallback);
		        		}
        			}
	        	});
	        	
	        	$scope.numberKidsChange = function(number) {
	        		$scope.numberOfKids = number;
	        		if(appointmentService.donorScheduleAppointmentResponse === undefined){
        				appointmentService.appointmentItem.numberOfKids = $scope.numberOfKids;
        			} else {
        				appointmentService.appointmentItem.numberOfKids = $scope.numberOfKids;
        				appointmentService.donorScheduleAppointmentResponse.numberOfChildren = $scope.numberOfKids;
    	        		appointmentService.donorScheduleAppointmentResponse.iChildren = $scope.numberOfKids;
        				if($scope.numberOfKids > 0){
        					appointmentService.donorScheduleAppointmentResponse.childCareRequired = 'Y';
        				} else {
        					appointmentService.donorScheduleAppointmentResponse.childCareRequired = 'N';
        				}
        				appointmentService.donorScheduleAppointmentResponse.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
        				$scope.showNoApptsAvailableMessage = false;
        				$scope.isLoadingData = true;
    	        		appointmentService.dsaValueChangedChildren(appointmentService.donorScheduleAppointmentResponse, timeSlotCallback);
        			}	        			        			        			        		
	        	};
	        	
	        	$scope.$watch('appointmentType', function (newVal, oldVal) {
	        		if ($scope.donationType === 1) {
	        			appointmentService.appointmentItem.appointmentTypeDescription = "Donation";
	        		}
	        		if ($scope.donationType === 2) {
	        			appointmentService.appointmentItem.appointmentTypeDescription = "Physical with donation";
	        		}
	        		if (newVal) {
	        			$scope.appointmentType=newVal;
	        			
	        			if ($scope.dateSelected !== undefined) {
	        			$scope.showNoApptsAvailableMessage = false;
	        			$scope.isLoadingData = true;
						appointmentService.getAppointmentTimes(appointmentService.appointmentItem, $scope.userType, timeSlotCallback);
						$scope.pageLoadFalse();
	        			}
	        		}
	        	});
	        	
	        	$scope.$watch('dateSelected', function (newVal, oldVal) {
	        		if($scope.isDonor && $scope.donor.pdn !== undefined && $scope.donationType !== undefined && $scope.donationType.id === 2 && appointmentService.appointmentItem.chosenCenterId !== 0 
	        				&& ($scope.donor.centerId !== appointmentService.appointmentItem.chosenCenterId)) {	        
	        			//do not load the appointment times for the selected date because the donor is attempting to schedule a physical at a non-home center
	        		} else {
		        		if (newVal) {
		        			$scope.dateSelected = $scope.dateSelected + "";
		        			if ($scope.dateSelected !== undefined) {
			        			$scope.d = $scope.dateSelected.substring(0,11);
			        			$scope.y = $scope.dateSelected.substring(11,15);
			        			$scope.z = '12:00:00 ';
			        			$scope.t = $scope.dateSelected.substring(25,28) + ' ';
			        			$scope.date = $scope.d + $scope.z + $scope.t + $scope.y;
			        			appointmentService.appointmentItem.appointmentDateString = $scope.date;
			        			$scope.dateSelected = newVal;		        			
			        			$scope.showNoApptsAvailableMessage = false;
			            		$scope.isLoadingData = true;
			            		$scope.selectDateMessage = false;
			            		//appointmentService.appointmentItem.appointmentTypeId = $scope.donationType.id;
			            		$scope.isDateSelected = true;
			            		//appointmentService.appointmentItem.chosenCenterId = $scope.chosenCenterId;
			        	    	appointmentService.getAppointmentTimes(appointmentService.appointmentItem, $scope.userType, timeSlotCallback);
			        	    	if($window.innerWidth < 768 && $window.innerHeight < 768){
			    	        		$scope.isXSDevice = true;		    	        		
			    	        	}		        	    	
		        			}
		            	}
	        		}
	        	});

	        	$scope.selectSlot = function(time, type) {
                    var parent = this;
	        		$scope.timeSlot = time;
	        		$scope.appointmentInfo.selectedTime = $scope.timeSlot.time;
                    // set header info like title and instruction sentence
                    $scope.headerInfo = {};
                    if (type == 'makeAppt') {
                        $scope.headerInfo.title = 'Appointment Confirmation';
                        $scope.headerInfo.instruction = 'Please confirm that you are scheduling the following appointment';
                    } else if (type == 'override') {
                        $scope.headerInfo.title = 'Override Appointment';
                        $scope.headerInfo.instruction = 'Please confirm that you are overriding the following appointment';
                    }
	        		var modalInstance = $modal.open({
	                    templateUrl: 'html/donor/appointments/confirm-appointment-modal.html',
                        resolve: {
                            headerInfo: function () {
                                return $scope.headerInfo;
                            }
                        },
	                    controller: ['$scope', '$modalInstance', 'appointmentService',
	                    function ($scope, $modalInstance, appointmentService, googleTagManagerService) {                	
	                        $scope.cancel = function () {	                      
	                            $modalInstance.dismiss('cancel');
	                            $scope.showSchedule = true;
	                        };
	                        
	                        
	                        $scope.checkListModal = function() {
	                    		var modalInstance = $modal.open({
	                                templateUrl: 'html/donor/appointments/new-donor-checklist-modal.html',
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
	                    	}
	                        
	                        var makeHomeLocationCallback = function(data) {
	                        	$scope.isLoadingData = false;
	                        	if(data.responseBoolean){
	                        		$scope.showHomeLocationUpdated = true;
	                        	} else {
	                        		$scope.showHomeLocationUpdate = false;
	                        	}	                        
	                        }
	                        
	                        
	                        var submitCallback = function(data) {
	                        	if (data.scheduleResponse === 'Successful Appointment made') {	                        		
	                        		appointmentService.getAppointmentTimes(appointmentService.appointmentItem, $scope.userType, timeSlotCallback);	                        		
	                        		appointmentService.isLoadingTimeSlotData = true;
	                        		$scope.isLoadingTimeSlotData = appointmentService.isLoadingTimeSlotData;
	                        		$scope.reloadCalendarDirectiveBoolean();	                        		
	                        		$scope.bookSuccess = true;
	                        		if ($scope.isDonor){
	                        			var eventData = {
		                        				'donorID': $scope.donorProfile.id,
		                        				'centerID': $scope.donorProfile.center.id,
		                        				'apptID': data.apptId
		                        		};
	                        			$scope.executeGoogleTagManagerCall(eventData);
	                        			if (data.showNewDonorCheckList) {
	                        				$scope.checkListModal();
	                        			}
	                        		}
	                        		if(appointmentService.makeHomeLocation === true && appointmentService.appointmentItem.chosenCenterId !== 0
	                        				&& $scope.donor.centerId !== appointmentService.appointmentItem.chosenCenterId){
	                        			$scope.donor.centerId = $scope.donorScheduleAppointmentResponse.chosenCenterId;
	                        			profileService.updateDonorCenter($scope.donor, makeHomeLocationCallback);
	                        		} else {
	                        			$scope.isLoadingData = false;
	                        		}
	                        	} else {
	                        		$scope.bookFailure = true;
	                        	}
	                        };
	                        
	                        $scope.scheduleAppointment = function() {
	                        	$scope.showSchedule = false;
	                        	$scope.bookSuccess = false;
	                        	$scope.bookFailure = false;
	                        	$scope.isLoadingData = true;	                        	
	                        	$scope.donorScheduleAppointmentResponse = $scope.appointmentInfo;
	                        	$scope.donorScheduleAppointmentResponse.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
	                        	$scope.donorScheduleAppointmentResponse.makeHomeLocation = appointmentService.makeHomeLocation;
	                        	appointmentService.bookAppointment($scope.donorScheduleAppointmentResponse, submitCallback);
	                        };
	                    } ],
	                    backdrop: 'static',
	                    scope: $scope
	                });

	                modalInstance.result.then(function (info) {
	                    //$scope.donorInfo = info;
	                    console.log("result then");
	                });
	        	}
	        }
	    };
	});
	
	bdpAppDirectives.directive('selectRescheduleAppointmentTime', function ($location, $modal, $window, appointmentService, profileService, userService) {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/donor/appointments/select-reschedule-time.html',
	        controller: function ($scope) {
	        	$scope.dateSelected = null;
	        	$scope.appointmentType = null;
	        	$scope.donationLocation = null;
	        	$scope.kidsNumberRange = [1,2,3,4,5,6];
	        	$scope.timeSlots = null;
	        	$scope.appointmentInfo = {};
	        	$scope.isLoadingData = true;
	        	$scope.date = '';
	        	$scope.d = '';
	        	$scope.t = '';
	        	$scope.z = '';
	        	$scope.y = '';
	        	$scope.donorProfile = profileService.profile;
	        	$scope.isNonDonor = userService.isNonDonor();
	        	$scope.isDonor = userService.isDonor();
	        	$scope.noAvailableApptsForPreviousDayMessage = false;
	        	$scope.noAvailableApptsForSelectedDayMessage = false;
	        	$scope.noAvailableApptsForNextDayMessage = false;
	        	$scope.prevDayApptsAvailable = false;
	        	$scope.selectedDayApptsAvailable = false;
	        	$scope.nextDayApptsAvailable = false;
	        	
	        	$scope.rowUnavailable = function(info) {
	        		if(($scope.isDonor && info.prevDayData.renderMakeAppointment === false && info.prevDayData.bookedAppointment === false)
	        			&& ($scope.isDonor && info.selectedDayData.renderMakeAppointment === false && info.selectedDayData.bookedAppointment === false)
	        			&& ($scope.isDonor && info.nextDayData.renderMakeAppointment === false && info.nextDayData.bookedAppointment === false))
	        		{ 
	        			return true;
	        		} else {
	        			return false;
	        		}	
	        	}
	        	
	        	var timeSlotCallback = function(data) {
	        		$scope.noAvailableApptsForPreviousDayMessage = false;
		        	$scope.noAvailableApptsForSelectedDayMessage = false;
		        	$scope.noAvailableApptsForNextDayMessage = false;
		        	$scope.prevDayApptsAvailable = false;
		        	$scope.selectedDayApptsAvailable = false;
		        	$scope.nextDayApptsAvailable = false;
    				$scope.isLoadingData = false;
    				$scope.showPrevDayXSScreen = false;
    				$scope.showNextDayXSScreen = false;
    				$scope.showSelectedDayXSScreen = true;
    	    		$scope.modifyApptInfo = data;
    	    		$scope.timeSlots = $scope.modifyApptInfo.appointmentList;
    	    		$scope.numberOfSlots = $scope.timeSlots.length;
    	    		$scope.prevDate = $scope.modifyApptInfo.prevDateValue.substring(0, 11);	        	
    	        	$scope.selectedDate = $scope.modifyApptInfo.selectedDateValue.substring(0, 11);
    	        	$scope.nextDate = $scope.modifyApptInfo.nextDateValue.substring(0, 11);
    	        	if ($scope.isDonor) {
						angular.forEach($scope.timeSlots, function(appt){
	        				if(appt.prevDayData.renderMakeAppointment === true || appt.prevDayData.bookedAppointment === true){
	        					$scope.prevDayApptsAvailable = true;
	        				}
	        			});
						angular.forEach($scope.timeSlots, function(appt){
	        				if(appt.selectedDayData.renderMakeAppointment === true || appt.selectedDayData.bookedAppointment === true){
	        					$scope.selectedDayApptsAvailable = true;
	        				}
	        			});
						angular.forEach($scope.timeSlots, function(appt){
	        				if(appt.nextDayData.renderMakeAppointment === true || appt.nextDayData.bookedAppointment === true){
	        					$scope.nextDayApptsAvailable = true;
	        				}
	        			});
						if (!$scope.prevDayApptsAvailable) {
							$scope.noAvailableApptsForPreviousDayMessage = true;
						}
						if (!$scope.selectedDayApptsAvailable) {
							$scope.noAvailableApptsForSelectedDayMessage = true;
						}
						if (!$scope.nextDayApptsAvailable) {
							$scope.noAvailableApptsForNextDayMessage = true;
						}
					}
    	        	$scope.isDateSelected = false;
    	        	$scope.isXSDevice = false;
    	    	};
	        	
	        	$scope.getPreviousDayDetails = function(){
	        		$scope.isLoadingData = true;
	        		$scope.modifyApptInfo.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
	        		appointmentService.dmaPreviousDayDetails($scope.modifyApptInfo, timeSlotCallback);
	        	};
	        	
	        	$scope.getNextDayDetails = function(){
	        		$scope.isLoadingData = true;
	        		$scope.modifyApptInfo.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
	        		appointmentService.dmaNextDayDetails($scope.modifyApptInfo, timeSlotCallback);
	        	};
	        	
	        	$scope.getPreviousDayDetailsXSScreen = function(){
	        		if($scope.showSelectedDayXSScreen){
	        			$scope.showSelectedDayXSScreen = false;
	        			$scope.showPrevDayXSScreen = true;
	        		}else if ($scope.showNextDayXSScreen){
	        			$scope.showNextDayXSScreen = false;
	        			$scope.showSelectedDayXSScreen = true;
	        		} else {
	        			if($scope.showPrevDayXSScreen){
	        				$scope.showPrevDayXSScreen = false;
	        				$scope.isLoadingData = true;
	        				appointmentService.dmaPreviousDayDetails($scope.modifyApptInfo, timeSlotCallback);
	        			}
	        		}
	        	}
	        	
	        	$scope.getNextDayDetailsXSScreen = function(){
	        		if($scope.showSelectedDayXSScreen){
	        			$scope.showSelectedDayXSScreen = false;
	        			$scope.showNextDayXSScreen = true;
	        		} else if ($scope.showPrevDayXSScreen){
	        			$scope.showPrevDayXSScreen = false;
	        			$scope.showSelectedDayXSScreen = true;
	        		} else {
	        			if($scope.showNextDayXSScreen){
	        				$scope.showNextDayXSScreen = false;
	        				$scope.isLoadingData = true;
	        				appointmentService.dmaPreviousDayDetails($scope.modifyApptInfo, timeSlotCallback);
	        			}
	        		}
	        	}
	        	
	        	$scope.$watch('needsPlayroom', function (newVal, oldVal) {
	        		if (!newVal && $scope.modifyApptInfo !== undefined) {
	        			$scope.numberOfKids = 0;
	        			$scope.modifyApptInfo.childCareRequired = 'N';
	        			$scope.modifyApptInfo.iChildren = $scope.numberOfKids;
	        			//$scope.modifyApptInfo.numberOfChildren = $scope.numberOfKids;
	        			$scope.modifyApptInfo.renderChildCare = 'false';
	        			$scope.isLoadingData = true;
	        			$scope.modifyApptInfo.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
	        			appointmentService.dmaValueChangedChildCareNo($scope.modifyApptInfo,  timeSlotCallback);
	        		}
	        	});
	        		        	
	        	$scope.$watch('numberOfKids', function (newVal, oldVal){
	        		$scope.numberOfKids = newVal;
	        	});
	        	
	        	$scope.numberKidsChange = function(number) {
	        		$scope.numberOfKids = number;
        			$scope.modifyApptInfo.numberOfChildren = $scope.numberOfKids;
        			$scope.modifyApptInfo.iChildren = $scope.numberOfKids;
        			if($scope.numberOfKids > 0){
        				$scope.modifyApptInfo.childCareRequired = 'Y';
        			} else {
        				$scope.modifyApptInfo.childCareRequired = 'N';
        			}
        			$scope.isLoadingData = true;
        			$scope.modifyApptInfo.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
    	        	appointmentService.dmaValueChangedChildren($scope.modifyApptInfo, timeSlotCallback);       			        			        			        		
	        	};	        	
	        	
	        	/*$scope.numberKidsChange = function(number) {
	        		if (number > 0){
	        		$scope.isLoadingData = true;
	        		$scope.modifyApptInfo.numberOfChildren = $scope.numberOfKids;
	        		$scope.numberOfKids = number;
	        		if($scope.modifyApptInfo !== undefined){
	        			$scope.modifyApptInfo.childCareRequired = 'Y';
	        		}
	        		appointmentService.donorModifyAppointmentResponse.selectedDate = $scope.selectedDateCalendar;
	        		appointmentService.dmaChildCareNeededChange($scope.modifyApptInfo, timeSlotCallback);
	        		}
	        	};*/

	        	$scope.$watch('dateSelected', function (newVal, oldVal) {
	        			appointmentService.appointmentItem.appointmentDateString = $scope.dateSelected;
	        			
	        			$scope.dateSelected = $scope.dateSelected + "";
	        			$scope.d = $scope.dateSelected.substring(0,11);
	        			$scope.y = $scope.dateSelected.substring(11,16);
	        			$scope.z = $scope.dateSelected.substring(16,25);
	        			$scope.t = $scope.dateSelected.substring(25,28);
	        			//$scope.t = 'CST ';
	        			$scope.date = $scope.d + $scope.z + $scope.t + $scope.y;
	        			appointmentService.appointmentItem.appointmentDateString = $scope.date;
	        			if($scope.modifyApptInfo !== undefined){
	        				$scope.modifyApptInfo.dateSelected = $scope.date;
	        			}
	        			$scope.dateSelected = newVal;
	        			//$scope.scrollToAppts();	   
						
	            		if($scope.dateSelected != null) {
	            			$scope.isLoadingData = true;
	            			var date = new Date($scope.dateSelected);
	            			date = date.getMilliseconds();
	            			$scope.modifyApptInfo.selectedDate = $scope.dateSelected;
	            			$scope.modifyApptInfo.selectedDate.time = date;
	            			$scope.isDateSelected = true;
	            			$scope.modifyApptInfo.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
	        	    		appointmentService.dma3DaySelectedDayDetails($scope.modifyApptInfo, $scope.userType, timeSlotCallback);	        	    		
		        	    	if($window.innerWidth < 768 && $window.innerHeight < 768){
		    	        		$scope.isXSDevice = true;		    	        		
		    	        	}
	            		}
	        	});

	        	$scope.selectSlot = function(apptInfo, columnNumber) {
	        		$scope.modifyApptInfo.selectedColumn = columnNumber;
	        		$scope.modifyApptInfo.selectedTime = apptInfo.time;
	        		var modalInstance = $modal.open({
	                    templateUrl: 'html/donor/appointments/confirm-appointment-reschedule-modal.html',
	                    controller: ['$scope', '$modalInstance', '$location', 'appointmentService', 'userService',
	                    function ($scope, $modalInstance, $location, appointmentService, userService) {                	
	                        $scope.cancel = function () {
	                            $modalInstance.dismiss('cancel');
	                        };
	                        
	                        $scope.continueToHome = function(){
	                        	$modalInstance.dismiss('cancel');
	                        	if(userService.isStaff()) {
	                        		$location.path('staff-home');
	                        	} else if(userService.isManager()){
	                        		$location.path('/manager-home');
	                        	} else {
	                        		if(userService.isDonor()){
	                        			$location.path('/donor-home');
	                        		}
	                        	}
	                        }
	                        
	                        var confirmRescheduleCallback = function(data) {
	                        	$scope.isRescheduling = false;
	                        	if(data.actionResult === "success" && data.errorMessage === undefined){	                        		
	                        		$scope.showSuccessReschedulingMessage = true;
	                        		appointmentService.donorScheduleAppointmentResponse = {};
	                            	appointmentService.appointmentItem = {};
	                            	appointmentService.donorModifyAppointmentResponse = {};
	                        	}else{
	                        		$scope.showErrorReschedulingMessage = true;
	                        	}
	                        };
	                        $scope.confirmReschedule = function() {
	                        	$scope.isRescheduling = true;
	                        	$scope.modifyApptInfo.chosenCenterId = appointmentService.appointmentItem.chosenCenterId;
	                        	appointmentService.rescheduledAppointmentTime($scope.modifyApptInfo, confirmRescheduleCallback);
	                        };
	                    } ],
	                    backdrop: 'static',
	                    scope: $scope
	                });
	        		if(columnNumber === 1){
	        			angular.forEach($scope.modifyApptInfo.apptPrevDateList, function(appt){
	        				if(appt.appointmentDateTimeDisplay.slice(-8) === apptInfo.time){
	        					$scope.newAppt = appt;
	        				}
	        			});
	        		}else if(columnNumber === 2){
	        			angular.forEach($scope.modifyApptInfo.apptSelectedDateList, function(appt){
	        				if(appt.appointmentDateTimeDisplay.slice(-8) === apptInfo.time){
	        					$scope.newAppt = appt;
	        				}
	        			});	        			
	        		}else{
	        			if(columnNumber === 3){
	        				angular.forEach($scope.modifyApptInfo.apptNextDateList, function(appt){
		        				if(appt.appointmentDateTimeDisplay.slice(-8) === apptInfo.time){
		        					$scope.newAppt = appt;
		        				}
		        			});
	        			}
	        		}
	                modalInstance.result.then(function (info) {
	                    console.log("result then");
	                });
	        	};
	        }
	    };
	});

	bdpAppDirectives.directive('onFinishRender', function ($timeout) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            if (scope.$last === true) {
	                $timeout(function () {
	                    scope.$emit(attr.onFinishRender);
	                });
	            }
	        }
	    }
	});
	
	bdpAppDirectives.directive('imgGallery', function() {
		  return {
		    restrict: 'E',
		    template: "<img ng-src='r/img/marketing/inset_index_video_hyd.jpg' ng-click='setImage()' class='img-thumbnail mrkt_img img-responsive' />",
		    controller: function($scope) {
		      $scope.setImage = function(image) {
		        $scope.selectedImage = image;
		      }
		    }
		  };
		});

	bdpAppDirectives.directive('centerPromoImageDisplay', function ($rootScope, homeService, userService, profileService, staffProfileService) {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/center-promo-image-display.html',
	        controller: function ($scope) {
	            var callback = function (profileInfo) {
	                var centerPromoImages = [];
	                var centerId = profileInfo.center.id;
	                var storedPromotionSpots = profileInfo.center.promotionSpots;
	                storedPromotionSpots.forEach(function (promotionSpot) {
	                    var imageUrl = $rootScope.siteInfoResponse.webServerPrefix;
	                    imageUrl += '/center-' + centerId;
	                    imageUrl += '/promotion-spots/';
	                    imageUrl += promotionSpot.image.savedFileName;
	                    var centerPromoImageInfo = {
	                        imageUrl: imageUrl,
	                        linkUrl: promotionSpot.url
	                    };
	                    centerPromoImages[promotionSpot.spotNumber - 1] = centerPromoImageInfo;
	                });
	                $scope.centerPromoImages = centerPromoImages;

					// now set up top in promo dropdown:
					homeService.overrideSitePromosWithCenterPromos(profileInfo);
	            };
	
	            // load up the sources of information
	            if (userService.isDonor()) {
	                profileService.getProfile(callback);
	            } else if (userService.isAdmin()) {
	                $scope.centerPromoImages = $rootScope.sitePromoImagesInfo;
	            } else if (userService.isStaff() || userService.isManager()) {
	                staffProfileService.getStaffHomeData(callback);
	            }
	        }
	    };
	});

	bdpAppDirectives.directive('centerFinder', function () {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/center-finder.html',
	        controller: function ($rootScope, $scope, $location, centerService) {
	            var successCallback = function (centers) {
	                $scope.startsWith = function(state, viewValue) {
	                    return state.substr(0, viewValue.length).toLowerCase() === viewValue.toLowerCase();
	                };
	                $scope.selectedState = '';
	                $scope.centers = centers;
	            };	
	            centerService.loadStatesAndCenters(successCallback);
	            
	            $scope.showDonationCenter = function (item, model, label, form) {
	            	if(item.isState) {
	            		$scope.selectedState = "";
						form.$setPristine();
	            	} else {
		            	$rootScope.centerFinder = false;
	    				$rootScope.finderArrow = false;
	    				$location.path('/donation-center').search({'centerId': item.centerId});
						$scope.selectedState = "";
						form.$setPristine();
	            	}
	            };
            }
        };
    });
	
	bdpAppDirectives.directive('marketingCenterFinder', function () {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/marketing/marketing-center-finder.html',
	        scope: {
	            selectCallback: '='
	        },
	        controller: function ($scope, centerService) {
	            var successCallback = function (centers) {
	                $scope.startsWith = function(state, viewValue) {
	                    return state.substr(0, viewValue.length).toLowerCase() === viewValue.toLowerCase();
	                };
	                $scope.selectedState = '';
	                $scope.centers = centers;
	            };
	            centerService.loadStatesAndCenters(successCallback);
            }
        };
    });
	
	bdpAppDirectives.directive('profileCenterFinder', function () {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/profile-center-finder.html',
	        scope: {
	            centerSelect: '='
	        },
	        controller: function ($scope, centerService) {
	            var successCallback = function (centers) {
	                $scope.startsWith = function(state, viewValue) {
	                    return state.substr(0, viewValue.length).toLowerCase() === viewValue.toLowerCase();
	                };
	                $scope.selectedState = '';
	                $scope.centers = centers;
	            };
	            centerService.loadStatesAndCenters(successCallback);
            }
        };
    });
	
	/*bdpAppDirectives.directive('typeahead', function($timeout) {
		  return {
		    restrict: 'AEC',
		    scope: {
		    	centerSelect: '='
		    },
		    link: function(scope, elem, attrs) {
		    },
		    templateUrl: 'templates/templateurl.html'
		  };
		});*/
    
    bdpAppDirectives.directive('profileMenu', function() {
    	return {
            restrict: 'E',
            templateUrl: 'html/donor/profile/profile-menu.html',
            controller: function ($scope, $route, userService, staffProfileService) {
            	var isDonor = userService.isDonor();
    			$scope.selectedDonorEmailSearch = staffProfileService.isEmailSearch;

            	if(userService.loginResponse !== undefined && staffProfileService.selectedDonor !== undefined) {
            		if(userService.loginResponse.staffCenterId !== undefined && staffProfileService.selectedDonor.centerId !== undefined) {
            			$scope.employeeCenterId = userService.loginResponse.staffCenterId;
            			$scope.selectedDonorCenterId = staffProfileService.selectedDonor.centerId;
            		}
            	}
            	$scope.pageFileName = $route.current.originalPath.substr($route.current.originalPath.indexOf('/', 1)+1);
            }
        };
    });
    
    bdpAppDirectives.directive('loadingMessage', function() {
    	return {
            restrict: 'E',
            scope: {
	            isLoading: '='
	        },
            templateUrl: 'html/is-loading.html'
        };
    });
    
    bdpAppDirectives.directive('centerSetupMenu', function() {
    	return {
            restrict: 'E',
            templateUrl: 'html/manager/center/center-setup-menu.html',
            controller: function ($scope, $route) {
            	$scope.pageFileName = $route.current.originalPath.substr($route.current.originalPath.indexOf('/', 1)+1);
            }
        };
    });
    
    bdpAppDirectives.directive('reportMenu', function() {
    	return {
            restrict: 'E',
            templateUrl: 'html/manager/report/report-menu.html',
            controller: function ($scope, $route) {
            	$scope.pageFileName = $route.current.originalPath.substr($route.current.originalPath.indexOf('/', 1)+1);
            }
        };
    });
    
    bdpAppDirectives.directive('matchingFields', function() {
  	  return {
  	    require: 'ngModel',
  	    scope: {
  	    	matchValue: '='
  	    },
  	    link: function(scope, elm, attrs, ctrl) {
  	      ctrl.$validators.matchingFields = function(modelValue, viewValue) {
  	    	var value = modelValue || viewValue;
  	    	if (value !== null && value == scope.matchValue) {
  	    		ctrl.$setValidity('matchingFields', true);
  	    		return true;
  	    	} else {
  	    		ctrl.$setValidity('matchingFields', false);
  	    		return false;
  	    	}
  	      };
	    }
	  };
	});
    
    bdpAppDirectives.directive('minAgeRestriction', function() {
    	  return {
    	    require: 'ngModel',
    	    link: function(scope, elm, attrs, ctrl) {
    	      ctrl.$validators.minAgeRestriction = function(modelValue, viewValue) {
	    	  function getAge(dob) {
	    		    var today = new Date();
	    		    var birthDate = (typeof dob == 'string') ?  new Date(dob) : dob;
	    		    var age = today.getFullYear() - birthDate.getFullYear();
	    		    var m = today.getMonth() - birthDate.getMonth();
	    		    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	    		        age--;
	    		    }
	    		    return age;
	    		}
    	    	var value = modelValue || viewValue;
    	    	if (value == null || value == undefined) {
    	    		//required tag to handle or not handle
    	    	} else if(getAge(value) >= 18) {
    	    		ctrl.$setValidity('minAgeRestriction', true);
    	    		return true;
    	    	} else {
    	    		ctrl.$setValidity('minAgeRestriction', false);
    	    		return false;
    	    	}
    	      };
    	    }
    	  };
  	});
    
    bdpAppDirectives.directive('maxAgeRestriction', function() {
  	  return {
  	    require: 'ngModel',
  	    link: function(scope, elm, attrs, ctrl) {
  	      ctrl.$validators.maxAgeRestriction = function(modelValue, viewValue) {
	  	    	function getAge(dob) {
	    		    var today = new Date();
	    		    var birthDate = (typeof dob == 'string') ?  new Date(dob) : dob;
	    		    var age = today.getFullYear() - birthDate.getFullYear();
	    		    var m = today.getMonth() - birthDate.getMonth();
	    		    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	    		        age--;
	    		    }
	    		    return age;
	    		}
	  	    	var value = modelValue || viewValue;
	  	    	if (value == null || value == undefined) {
	  	    		//required tag to handle or not handle
	  	    	} else if(getAge(value) < 150) {
	  	    		ctrl.$setValidity('maxAgeRestriction', true);
	  	    		return true;
	  	    	} else {
	  	    		ctrl.$setValidity('maxAgeRestriction', false);
	  	    		return false;
	  	    	}
	  	      };
  	    }
  	  };
	});
    
    bdpAppDirectives.directive('matchDateFormat', function() {
    	  return {
    	    require: 'ngModel',
    	    link: function(scope, elm, attrs, ctrl) {
    	      ctrl.$validators.matchDateFormat = function(modelValue, viewValue) {
  	  	    	function doesDateFormatMatch(dob) {
	  	  	    	if(dob instanceof Date) {
		  	  	    	var day = dob.getDate() + "";
		  	  	    	if(day.length === 1){
		  	  	    		day = "0" + day;
		  	  	    	}
		        		var month = (dob.getMonth() + 1) + "";
		        		if(month.length === 1){
		        			month = "0" + month;
		        		}
		        		var year = dob.getFullYear() + "";
		        		dob = month + '/' + day + '/' + year;		        		
		        		var boolean = /^\d{2}\/\d{2}\/\d{4}$/.test(dob);
		  	    		return boolean; 
		  	    	} else {
		  	    		return true;
		  	    	}
  	  	    	}
  	  	    	var value = modelValue || viewValue;
  	  	    	if (value == null || value == undefined) {
  	  	    		//required tag to handle or not handle
  	  	    	} else if(doesDateFormatMatch(value) === true) {
  	  	    		ctrl.$setValidity('matchDateFormat', true);
  	  	    		return true;
  	  	    	} else {
  	  	    		ctrl.$setValidity('matchDateFormat', false);
  	  	    		return false;
  	  	    	}
  	  	      };
    	    }
    	  };
  	});
    
    bdpAppDirectives.directive('nameValidator', function() {
  	  return {
  	    require: 'ngModel',
  	    link: function(scope, elm, attrs, ctrl) {
  	      ctrl.$validators.matchDateFormat = function(modelValue, viewValue) {
	  	    	function doesNameFormatMatch(name) {
		      		//var nameRegex = new RegExp("/^[a-z0-9 ]$/i");
		      		var boolean = /^[a-zA-Z '-]+$/.test(name);
		    		return boolean; 
	    		}
	  	    	var value = modelValue || viewValue;
	  	    	if (value == null || value == undefined) {
	  	    		//required tag to handle or not handle
	  	    	} else if(doesNameFormatMatch(value) === true) {
	  	    		ctrl.$setValidity('nameValidator', true);
	  	    		return true;
	  	    	} else {
	  	    		ctrl.$setValidity('nameValidator', false);
	  	    		return false;
	  	    	}
	  	      };
  	    }
  	  };
	});
    
    /*bdpAppDirectives.directive('cityValidator', function() {
    	  return {
    	    require: 'ngModel',
    	    link: function(scope, elm, attrs, ctrl) {
    	      ctrl.$validators.matchDateFormat = function(modelValue, viewValue) {
  	  	    	function doesNameFormatMatch(name) {
  		      		var boolean = /^[a-zA-Z]+(?:(?:\\s+|-|')[a-zA-Z]+)*$/.test(name);
  		    		return boolean; 
  	    		}
  	  	    	var value = modelValue || viewValue;
  	  	    	if (value == null || value == undefined) {
  	  	    		//required tag to handle or not handle
  	  	    	} else if(doesNameFormatMatch(value) === true) {
  	  	    		ctrl.$setValidity('cityValidator', true);
  	  	    		return true;
  	  	    	} else {
  	  	    		ctrl.$setValidity('cityValidator', false);
  	  	    		return false;
  	  	    	}
  	  	      };
    	    }
    	  };
  	});
    
    bdpAppDirectives.directive('addressValidator', function() {
  	  return {
  	    require: 'ngModel',
  	    link: function(scope, elm, attrs, ctrl) {
  	      ctrl.$validators.matchDateFormat = function(modelValue, viewValue) {
	  	    	function doesNameFormatMatch(name) {
		      		var boolean = /^\s*\S+(?:\s+\S+){2}/.test(name);
		    		return boolean; 
	    		}
	  	    	var value = modelValue || viewValue;
	  	    	if (value == null || value == undefined) {
	  	    		//required tag to handle or not handle
	  	    	} else if(doesNameFormatMatch(value) === true) {
	  	    		ctrl.$setValidity('addressValidator', true);
	  	    		return true;
	  	    	} else {
	  	    		ctrl.$setValidity('addressValidator', false);
	  	    		return false;
	  	    	}
	  	      };
  	    }
  	  };
	});*/
    
    bdpAppDirectives.directive('middleNameValidator', function() {
    	  return {
    	    require: 'ngModel',
    	    link: function(scope, elm, attrs, ctrl) {
    	      ctrl.$validators.matchDateFormat = function(modelValue, viewValue) {
  	  	    	function doesNameFormatMatch(name) {
  		      		//var nameRegex = new RegExp("/^[a-z0-9 ]$/i");
  		      		var boolean = /^[a-zA-Z]{1,2}[.]{0,1}$/.test(name);
  		    		return boolean; 
  	    		}
  	  	    	var value = modelValue || viewValue;
  	  	    	if (value === null || value === undefined) {
  	  	    		//required tag to handle or not handle
  	  	    	} else if(value === "") {
  	  	    		ctrl.$setValidity('middleNameValidator', true);
	  	    		return true; 	  	    	
  	  	    	} else if(doesNameFormatMatch(value) === true) {
  	  	    		ctrl.$setValidity('middleNameValidator', true);
  	  	    		return true;
  	  	    	} else {
  	  	    		ctrl.$setValidity('middleNameValidator', false);
  	  	    		return false;
  	  	    	}
  	  	      };
    	    }
    	  };
  	}); 
    

	bdpAppDirectives.directive('adminSetupMenu', function() {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/admin/setup-menu.html',
	        controller: function ($scope, $route) {
	            $scope.pageFileName = $route.current.originalPath.substr($route.current.originalPath.indexOf('/', 1)+1);
	        }
	    };
	});
	
	bdpAppDirectives.directive('marketingSetupMenu', function() {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/marketing/marketing-menu.html',
	        controller: function ($scope, $route) {
	            $scope.pageFileName = $route.current.originalPath.substr($route.current.originalPath.indexOf('/', 1)+1);
	        }
	    };
	});
	
	bdpAppDirectives.directive('biolifePassword', function() {
	    return {
	        require: 'ngModel',
	        scope: {
	            loginId: '='
	        },
	        link: function(scope, elm, attrs, ctrl) {
	            ctrl.$validators.biolifePassword = function(modelValue, viewValue) {
	                var value = modelValue || viewValue;
	                if (ctrl.$isEmpty(modelValue)) {
	                    // consider empty models to be valid
	                    ctrl.$setValidity('biolifePassword', true);
	                    return true;
	                }
	                if (value.length < 6) {
	                    //return("too_short");
	                    ctrl.$setValidity('biolifePassword', false);
	                    return false;
	                } else if (value.length > 10) {
	                    //return("too_long");
	                    ctrl.$setValidity('biolifePassword', false);
	                    return false;
	                } else if (value.search(/\d/) == -1) {
	                    //return("no_num");
	                    ctrl.$setValidity('biolifePassword', false);
	                    return false;
	                } else if (value.search(/[a-z]/) == -1) {
	                    //return("no_low_letter");
	                    ctrl.$setValidity('biolifePassword', false);
	                    return false;
	                } else if (value.search(/[A-Z]/) == -1) {
	                    //return("no_up_letter");
	                    ctrl.$setValidity('biolifePassword', false);
	                    return false;
	                } else if (value != undefined && value == scope.loginId) {
	                    ctrl.$setValidity('biolifePassword', false);
	                    return false;
	                }
	
	                ctrl.$setValidity('biolifePassword', true);
	                return true;
	            };
	        }
	    };
	});

	//Use to focus anywhere except modals
	bdpAppDirectives.directive('focus', function() {
		  return {
		    link: function(scope, element, attrs) {
		      element[0].focus();
		    }
		  };
	});
	
	//Focus on login & register page
	bdpAppDirectives.directive('focusUsername', function($timeout, $parse, $rootScope) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	        	var model = $parse(attrs.focusUsername);
	            scope.$watch(model, function(currentValue) {
	                if (currentValue === true) {
	                	$timeout(function() {
	    		            element[0].focus(); 
	    		        });
	            }
	            });
	        }
	    }
	});
	
	//Use to focus on modals
	bdpAppDirectives.directive('focusModal', function($timeout, $parse) {
		  return {
		    link: function(scope, element, attrs) {
		      var model = $parse(attrs.focusModal);
		      scope.$watch(model, function(value) {
		        if(value === true) { 
		          $timeout(function() {
		            element[0].focus(); 
		          });
		        }
		      });
		      element.bind('blur', function() {
		         scope.$apply(model.assign(scope, false));
		      });
		    }
		  };
	});
	
	bdpAppDirectives.directive('emailBootstrapSwitch', [function() {
           return {
               restrict: 'A',
               require: '?ngModel',
               link: function(scope, element, attrs, ngModel) {
                   element.bootstrapSwitch();

                   element.on('switchChange.bootstrapSwitch', function(event, state) {
                       if (ngModel) {
                           scope.$apply(function() {
                               ngModel.$setViewValue(state);
                           });
                       }
                   });

                   scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                       if (newValue) {
                           element.bootstrapSwitch('state', true, true);
                       } else {
                           element.bootstrapSwitch('state', false, true);
                       }
                   });
               }
           };
       }
   ]);
	
	bdpAppDirectives.directive('phoneBootstrapSwitch', [function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.bootstrapSwitch();

                element.on('switchChange.bootstrapSwitch', function(event, state) {
                    if (ngModel) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(state);
                        });
                    }
                });

                scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                    if (newValue) {
                        element.bootstrapSwitch('state', true, true);
                    } else {
                        element.bootstrapSwitch('state', false, true);
                    }
                });
            }
        };
    }
]);

	bdpAppDirectives.directive('hoursOfOperationUpdate', function ($location, $filter, centerService) {
	    return {
	        restrict: 'E',
	        templateUrl: 'html/manager/center/hours-of-operation-update.html',
	        scope : {
	        	center : "="
	        },
	        controller: function ($scope) {
	        	//Datepicker set up
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
	            $scope.isSavingData = false;
	            //end set up
	            
	            //Existing adjustment table and toggles
	            $scope.hasExistingAdjustments = false;
	            //From the service call eventually
	            centerService.getHoursOfOperationsAdjustments(function(data) {
	            	$scope.adjustments = data;
	            	if (data != null) {
	            		$scope.hasExistingAdjustments = true;
	            	}
	            });
	            
	            $scope.deleteAdjustment = function(adjustment) {
                    centerService.deleteAdjustment(adjustment.id, function(){
                            centerService.getHoursOfOperationsAdjustments(function(data) {
                            $scope.adjustments = data;
                            if (data != null) {
                            	$scope.hasExistingAdjustments = true;
                            }
                        });
                    });
                };

	            
	            $scope.displayNewAdjustment = false;
	            //end existing table
	            
	        	$scope.dropdowns = centerService.getHoursDropdowns();
	        	$scope.showOperationHours = false;
	        	
	        	$scope.operationHoursEditTypeList = [{id: 1, description: 'Closure'}, {id: 2, description: 'Hours Change'}];
	        	$scope.operationHoursEditType = $scope.operationHoursEditTypeList[0];
	        	
	        	$scope.isPermanent = false;
	        	$scope.changePermanent = function() {
	        		if ($scope.isPermanent) {
	        			$scope.dateTo = null;
	        			angular.forEach($scope.hours, function(day) {
		    				day.isDisable = false;			    				
	        			});
	        		} else {
	        			$scope.dateChange();	        			
	        		}
	        	};
	        	
	        	$scope.cancel = function() {
	        		//reset values in adjustment form
            		$scope.operationHoursEditType = $scope.operationHoursEditTypeList[0];
            		$scope.dateFrom = undefined;
            		$scope.dateTo = undefined;
            		$scope.isPermanent = false;
            		$scope.title = undefined;    	            		   	            		    	            		    	            	
            		angular.forEach($scope.hours, function(day) {
    					day.isDisable = true;
	    			});
            		$scope.operationHoursEdit.$setPristine();
            		$scope.displayNewAdjustment = false;
	        	};
	        	
	        	$scope.hours = [];
	    		$scope.days = [];
	    		
	    		//Data has arrived in center from the server
	    		$scope.$watch('center', function(newVal, oldVal) {
	    			if (newVal !== null && newVal !== undefined) {
	    				
	    				$scope.hours = [];
			    		$scope.days = [];
	    				angular.forEach($scope.center.hoursOfOperations, function(dayOperation) {
	    					//Using the weekday num to insert the days in order
	    		        	$scope.hours[dayOperation.weekday.id.weekdayNum-1] = {
	    	                    name: dayOperation.weekday.description,
	    	                    weekdayNumber: dayOperation.weekday.id.weekdayNum,
	    	                    isClosed: dayOperation.closed === 'Y',
	    	                    openingTime: centerService.breakUpTimes(dayOperation.openingTime),
	    	                    closingTime: centerService.breakUpTimes(dayOperation.closingTime),
	    	                    isDisable: true
	    	                };
	    		        	
	    		        	$scope.days.push({
	    	                    name: dayOperation.weekday.description,
	    	                    isOpen: dayOperation.closed === 'N',
	    	                    isClosed: dayOperation.closed === 'Y',
	    	                    openingTime: $filter('hours')(dayOperation.openingTime),
	    	                    closingTime: $filter('hours')(dayOperation.closingTime),
	    	                	weekday: dayOperation.weekdayNumber   
	    	                });
	    	        	});
	    			}
	    		});
	    		
	    		$scope.dateChange = function() {
	    			if ($scope.dateFrom !== null && $scope.dateTo != null) {
	    				//The data object is 0-6, the nums are 1-7. Correcting that here
		    			var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	    				var dateFromNum = $scope.dateFrom.getDay()+1;
		    			var dateToNum = $scope.dateTo.getDay()+1;
		    			
		    			var firstDate = $scope.dateFrom.getTime();
		    			var secondDate = $scope.dateTo.getTime();

		    			var numberOfDays = Math.round(Math.abs((firstDate - secondDate)/(oneDay)));
		    			if (numberOfDays >= 7) {
			    			angular.forEach($scope.hours, function(day) {
				    				day.isDisable = false;			    				
				    		});
		    			} else {
		    				angular.forEach($scope.hours, function(day) {
				    			if(dateFromNum <= dateToNum) {
			    					if (day.weekdayNumber >= dateFromNum && day.weekdayNumber <= dateToNum) {
				    					day.isDisable = false;
				    				} else {
				    					day.isDisable = true;
				    				}
				    			} else {
				    				if (day.weekdayNumber >= dateFromNum || day.weekdayNumber <= dateToNum) {
				    					day.isDisable = false;
				    				} else {
				    					day.isDisable = true;
				    				}				    				
				    			}
			    			});
		    			}
	    			} else if ($scope.dateFrom !== null && $scope.dateTo == null) {
	    				var dateFromNum = $scope.dateFrom.getDay()+1;
	    				angular.forEach($scope.hours, function(day) {
		    				if (day.weekdayNumber == dateFromNum) {
		    					day.isDisable = false;
		    				} else {
		    					day.isDisable = true;
		    				}
		    			});
	    			} else {
	    				angular.forEach($scope.hours, function(day) {
	    					day.isDisable = true;
		    			});
	    			}
	    		};
	    		
	    		$scope.saveOperationHours = function() {
	    			$scope.isSavingData = true;
	    			/*var effectiveDateFrom = ;
	    			var effectiveDateTo = ;*/
	    			$scope.newAdjustment = {
    	            		centerId : $scope.center.id,
    	            		title : $scope.title,
    	            		hopAdjTypeId : $scope.operationHoursEditType.id,
    	            		effectiveDate : $scope.dateFrom,
    	            		untilDate : $scope.dateTo,
    	            		adjTimeDtoList : $scope.hours,
    	            		makeDefault : $scope.isPermanent,
    	            		makeDefaultString: ($scope.isPermanent) ? 'Yes' : 'No',
    	            		startDateDay : $scope.dateFrom.getDate() + "",
			    			startDateMonth : ($scope.dateFrom.getMonth() + 1) + "",
			    			startDateYear : $scope.dateFrom.getFullYear() + "",
			    			endDateDay : null,
			    			endDateMonth : null,
			    			endDateYear : null   	            		
    	            };
	    			
	    			if($scope.newAdjustment.untilDate instanceof Date){
	    				$scope.newAdjustment.endDateDay = $scope.newAdjustment.untilDate.getDate() + "";
	    				$scope.newAdjustment.endDateMonth = ($scope.newAdjustment.untilDate.getMonth() + 1) + "";
	    				$scope.newAdjustment.endDateYear = $scope.newAdjustment.untilDate.getFullYear() + "";	    				
	    			}
	    			
	    			angular.forEach($scope.newAdjustment.adjTimeDtoList, function(time) {
	    				var openTime = centerService.convertToMilitaryTime(time.openingTime);
	    				time.openTime = (openTime != null) ? new Number(openTime) : null;
	    				var closeTime = centerService.convertToMilitaryTime(time.closingTime);
	    				time.closeTime = (closeTime != null) ? new Number(closeTime) : null;
	    				time.closed = time.isClosed;
	    				
	    				time.openTimeDisplay = centerService.convertToLegacyDisplayFormat(time.openingTime);
	    				time.closeTimeDisplay = centerService.convertToLegacyDisplayFormat(time.closingTime);
	    			});
	    			
	    			centerService.saveHoursOfOperationsAdjustments($scope.newAdjustment, function(data) {
	    				$scope.isSavingData = false;
    	            	if (data != null) {
    	            		//reset values in adjustment form
    	            		$scope.operationHoursEditType = $scope.operationHoursEditTypeList[0];
    	            		$scope.dateFrom = undefined;
    	            		$scope.dateTo = undefined;
    	            		$scope.isPermanent = false;
    	            		$scope.title = undefined;    	            		   	            		    	            		    	            	
    	            		angular.forEach($scope.hours, function(day) {
    	    					day.isDisable = true;
    		    			});
    	            		$scope.operationHoursEdit.$setPristine();
    	            		$scope.displayNewAdjustment = false;
    	            		$scope.adjustments = data.existingHoursOfOperationAdjDTO;
    	            		$scope.hasExistingAdjustments = true;
    	            	}
	    			});
	    			
	        	};
	        	
	        	//Modify portion
	        	
	        	
	        	$scope.modifyDateChange = function() {
	    			if ($scope.modifyDate.effectiveDate !== null && $scope.modifyDate.untilDate != null) {
	    				//The data object is 0-6, the nums are 1-7. Correcting that here
	    				var dateFromNum = $scope.modifyDate.effectiveDate.getDay()+1;
		    			var dateToNum = $scope.modifyDate.untilDate.getDay()+1;
		    			
		    			angular.forEach($scope.modifyHours, function(day) {
		    				if (day.weekdayNumber >= dateFromNum && day.weekdayNumber <= dateToNum) {
		    					day.isDisable = false;
		    				} else {
		    					day.isDisable = true;
		    				}
		    			});
	    			} else if ($scope.modifyDate.effectiveDate !== null && $scope.modifyDate.untilDate == null) {
	    				var dateFromNum = $scope.modifyDate.effectiveDate.getDay()+1;
	    				angular.forEach($scope.modifyHours, function(day) {
		    				if (day.weekdayNumber == dateFromNum) {
		    					day.isDisable = false;
		    				} else {
		    					day.isDisable = true;
		    				}
		    			});
	    			} else {
	    				angular.forEach($scope.modifyHours, function(day) {
	    					day.isDisable = true;
		    			});
	    			}
	    		};
	        	$scope.modifyOpenedFrom = false;
	            $scope.modifyOpenedTo = false;
	            $scope.modifyOpenFrom = function($event) {
	    	        $event.preventDefault();
	    	        $event.stopPropagation();
	    	
	    	        $scope.modifyOpenedTo = false;
	    	        $scope.modifyOpenedFrom = true;
	            };
	            $scope.modifyOpenTo = function($event) {
	    	        $event.preventDefault();
	    	        $event.stopPropagation();
	    	
	    	        $scope.modifyOpenedFrom = false;
	    	        $scope.modifyOpenedTo = true;
	            };
	        	
	        	$scope.isModifyAdjustment = false;
	        	$scope.modifyHours =[];
        		$scope.modifyDate = {};
        		
        		//$scope.modifyDate.makeDefault = false;
	        	$scope.changeModifyPermanent = function() {
	        		if ($scope.modifyDate.makeDefault) {
	        			$scope.modifyDate.untilDate = null;
	        		}
	        	};
	        	
	            $scope.modifyAdjustment = function(adjustment) {
	            	centerService.modifyAdjustment(adjustment.id, function(data) {
	            		$scope.displayNewAdjustment = false;
	            		$scope.isModifyAdjustment = true;
	            		
	            		
	            		$scope.modifyHours =[];
	            		$scope.modifyDate = {};
	            		angular.forEach(data, function(dayOperation){
	            			$scope.modifyHours[dayOperation.weekdayNumber-1] = {
        	                    name: dayOperation.weekdayDescription,
        	                    weekdayNumber: dayOperation.weekdayNumber,
        	                    isClosed: dayOperation.closed,
        	                    openingTime: centerService.breakUpTimes(dayOperation.openTime),
        	                    closingTime: centerService.breakUpTimes(dayOperation.closeTime),
        	                    isDisable: dayOperation.disable
        	                };
	            		});
	            		
	            		$scope.modifyDate = {
	            				id : adjustment.id,
	            				insertedByUserId : adjustment.insertedByUserId,
	            				insertedDateTime : new Date(adjustment.insertedDateTime),
	            				recordVersion : adjustment.recordVersion,
	            				makeDefault : adjustment.makeDefault,
	            				title : adjustment.title,
			            		centerId : adjustment.centerId,
			            		effectiveDate : new Date(adjustment.effectiveDate),
			            		untilDate : new Date(adjustment.untilDate),
			            		hopAdjType : { id: adjustment.hopAdjTypeId, description: adjustment.adjType }
	            		};
	            	});
	            };
	            
	            $scope.saveModifyOperationHours = function() {
	            	$scope.isSavingData = true;
	            	angular.forEach($scope.modifyHours, function(time) {
	    				var openTime = centerService.convertToMilitaryTime(time.openingTime);
	    				time.openTime = (openTime != null) ? new Number(openTime) : null;
	    				var closeTime = centerService.convertToMilitaryTime(time.closingTime);
	    				time.closeTime = (closeTime != null) ? new Number(closeTime) : null;
	    				time.closed = time.isClosed;
	    				
	    				time.openTimeDisplay = centerService.convertToLegacyDisplayFormat(time.openingTime);
	    				time.closeTimeDisplay = centerService.convertToLegacyDisplayFormat(time.closingTime);
	    			});
	            	$scope.modifyDate.adjTimeDtoList = $scope.modifyHours;
	            	$scope.modifyDate.makeDefaultString = $scope.modifyDate.makeDefault ? 'Yes' : 'No';
	            	$scope.modifyDate.hopAdjTypeId = $scope.modifyDate.hopAdjType.id;

	            	var saveObject = angular.copy($scope.modifyDate);
	            	delete saveObject.hopAdjtype;
	            	
	            	centerService.saveHoursOfOperationsAdjustments(saveObject, function(data) {
	            		$scope.isSavingData = false;
	            		$scope.isModifyAdjustment = false;
	            	});
	            }
	        }
	    };
	});
	
	bdpAppDirectives.directive('imageNotFound', function() {
	  return {
	    link: function(scope, element, attrs) {
	      element.bind('error', function() {
	        if (attrs.src != attrs.imageNotFound) {
	          attrs.$set('src', attrs.imageNotFound);
	        }
	      });
	    }
	  }
	});
		
	bdpAppDirectives.directive('reloadHome',function($window, $route, $location, $templateCache){
	  return {
	    link: function(scope, elm,attr){
	      elm.on('click',function(){
	        if ( $location.path() !== "/" ) {
	        	$window.location.assign('#/');
	        }  else {
	        	/*Commenting out reload due to full reload causing
	        	 * marketing pop ups to display each time the logo
	        	 * is clicked.
	        	$window.location.reload();*/
	        }
	      });
	    }
	  };
	});
		
	bdpAppDirectives.directive('reloadGoogleMap',function($window, $document, $location, $templateCache){
	  return {
	    link: function(scope, elm){
	      elm.on('click',function(){
	        $window.location.reload();
	      });
	    }
	  };
	});
	
	//Directive to collapse mobile nav bar on ios when user clicks off the nav 
	bdpAppDirectives.directive('collapseNavIos',function($document){
		return {
			restrict:'A',
			link: function(scope, element, attrs) {
				$(document).on('click, touchend', function (event) {
				    if ($(event.target).closest('.navbar').length == 0) {
				        var opened = $('.navbar-collapse').hasClass('collapse in');
				        if (opened === true) {
				            $('.navbar-collapse').collapse('hide');
				        }
				    }
				});
			}
		};		
	});
	
	//Directive to collapse mobile nav bar on android when user clicks off the nav
	bdpAppDirectives.directive('collapseNavAndroid',function($document){
		return {
			restrict:'A',
			link: function(scope, element, attrs) {
				$(document).click(function (event) {
				    var clickover = $(event.target);
				    var $navbar = $(".navbar-collapse");               
				    var _opened = $navbar.hasClass("in");
				    if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
				        $navbar.collapse('hide');
				    }
			    });
			}
		};		
	});
	
	//Directive to control number of seconds per carousel image transition
	bdpAppDirectives.directive('carouselTransition',function($document){
		return {
			restrict:'A',
			link: function(scope, element, attrs) {
				$(document).ready(function(){
					$('#bigCarousel').carousel({interval: 5000});
					$('#smallCarousel').carousel({interval: 5000});
				});
			}
		};		
	});
	
	bdpAppDirectives.directive('marketingPopUp', function() {
		  return {
		    restrict: 'E',
		    controller: function($scope, $modal, $interval, $rootScope, homeService) {
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
		    	
		    	var interval;
		    	
		    	$scope.cancelInterval = function() {
					   $interval.cancel(interval);
			    };
		    	
		    	$scope.$watch('$root.promotions', function() {
		    		$scope.promotions = $rootScope.promotions;
		    		
		    		if($scope.promotions !== undefined && $scope.promotions.length > 0) {
		    			$scope.today = new Date().setHours(0, 0, 0, 0);	    	    	
		    	    	
		    	    	$scope.effectiveJSDate = new Date($scope.promotions[0].displayEffectiveDate);
		    	    	$scope.effectiveJSDate = $scope.effectiveJSDate.getTime();
		    	    	$scope.untilJSDate = new Date($scope.promotions[0].displayUntilDate);
		    	    	$scope.untilJSDate = $scope.untilJSDate.setHours(23, 59, 59, 59);		    	    	
		    	    	
		    	    	if($scope.today >= $scope.effectiveJSDate && $scope.today <= $scope.untilJSDate) {		    					    		
				    		interval = $interval(function() {
						    	var modalInstance = $modal.open({
						    		templateUrl: 'html/modals/marketing-pop-up-modal.html',
				                    controller: ['$scope', '$modalInstance', '$location', 'appointmentService', 'userService',
				                    function ($scope, $modalInstance, $interval) {
				                    	$scope.cancelInterval();
				                    	
				                    	$scope.hasClickableLink = false;
				                    	if($scope.promotions[0].promotionURL !== undefined) {
				                    		$scope.hasClickableLink = true;
				                    	}				                    					                    
				                    	
				                        $scope.close = function () {	                        	
				                            $modalInstance.dismiss('cancel');
				                        };
				                    } ],
				                    backdrop: 'static',
				                    scope: $scope
				                });
						    	}, 2000);		    		
				    		}
		    		}
		    	});
		    }
		  };
		});
	
	bdpAppDirectives.directive("fbLoginButtonLoad", function($rootScope) {
	    return function (scope) {
	        if (FB) {
	            FB.XFBML.parse();
	        }
	    };
	});
	
	/*bdpAppDirectives.directive('marketingLoginPopUp', function() {
	  return {
	    restrict: 'E',
	    controller: function($scope, $modal, $interval, $rootScope) {
	    	//INSTEAD ATTEMPT TO WATCH ROOTSCOPE VAR
	    	
	    	var loginInterval;
	    	
	    	$scope.cancelLoginInterval = function() {
				   $interval.cancel(loginInterval);
		    };
	    	
	    	$scope.$watch('$root.isLoggedIn', function() {
	    		if($rootScope.isLoggedIn && $rootScope.loginResponse.role === 'DONOR') {
		    		$scope.promotions = $rootScope.promotions;
		    		
		    		if($scope.promotions !== undefined && $scope.promotions.length > 0) {
		    			$scope.today = new Date().setHours(0, 0, 0, 0);	    	    	
		    	    	
		    	    	$scope.effectiveJSDate = new Date($scope.promotions[0].displayEffectiveDate);
		    	    	$scope.effectiveJSDate = $scope.effectiveJSDate.getTime();
		    	    	$scope.untilJSDate = new Date($scope.promotions[0].displayUntilDate);
		    	    	$scope.untilJSDate = $scope.untilJSDate.setHours(23, 59, 59, 59);		    	    	
		    	    	
		    	    	if($scope.today >= $scope.effectiveJSDate && $scope.today <= $scope.untilJSDate) {		    					    		
				    		loginInterval = $interval(function() {
						    	var modalInstance = $modal.open({
						    		templateUrl: 'html/modals/marketing-pop-up-modal.html',
				                    controller: ['$scope', '$modalInstance', '$location', 'appointmentService', 'userService',
				                    function ($scope, $modalInstance, $interval) {
				                    	$scope.cancelLoginInterval();
				                    	
				                    	$scope.hasClickableLink = false;
				                    	if($scope.promotions[0].image.appUrl !== undefined && $scope.promotions[0].mobileImage.appUrl !== undefined) {
				                    		$scope.hasClickableLink = true;
				                    	}
				                    	
				                        $scope.close = function () {	                        	
				                            $modalInstance.dismiss('cancel');
				                        };
				                    } ],
				                    backdrop: 'static',
				                    scope: $scope
				                });
						    	}, 5000);		    		
				    		}
		    		}	
	    		}
	    	});
	    }
	  };
	});*/
		
		
		