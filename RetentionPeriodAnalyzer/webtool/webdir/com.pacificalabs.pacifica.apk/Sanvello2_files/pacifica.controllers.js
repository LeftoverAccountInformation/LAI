(function() {

	var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	var ctrl = angular.module('accountCtrl', []);

	ctrl.controller('AccountCtrl', ['$scope', '$rootScope', '$sce', '$controller', '$state', '$http', '$timeout', '$ionicPopup', '$ionicModal', '$translate', 'AccountService', 'Token', 'Environment', 'OverlayService', 'GeneralService',
	  function ($scope, $rootScope, $sce, $controller, $state, $http, $timeout, $ionicPopup, $ionicModal, $translate, AccountService, Token,  Environment, OverlayService, GeneralService) {

			if (!AccountService.isLoggedIn()) {
	  		$state.go('app.login');
	  		return;
	  	}

			$scope.isPractitioner = function isPractitioner() {
			  return AccountService.isPractitioner();
			};

  		$scope.editingEmail = false;
  		$scope.editingName = false;
  		$scope.editingLanguage = false;
  		$scope.showingLogout = false;
      $scope.connectPractitioner = false;
      $scope.enteringInvite = true; // controls which step you're in in the process
      $scope.submittingInvite = false;

      $scope.practitionerData = {
          inviteCode: '',
          practitioner: ''
      };

  		$scope.accountData = {
  			name: ''
  		};

  		$scope.insecureEmail = {
	      checked: false
	    };

			$scope.insecurePushes = {
				checked: false
			};

			var emailPref = AccountService.getUserPreference('receive_phi_in_email');
	    if (typeof emailPref !== 'undefined') {

	      $scope.insecureEmail.checked = emailPref == 'true';
	    }

	    var pushPref = AccountService.getUserPreference('receive_phi_in_pushes');
	    if (typeof pushPref !== 'undefined') {

	      $scope.insecurePushes.checked = pushPref == 'true';
	    }

	    function initializeTwoFactorAuth() {
	    	if(!$scope.accountUser || !$scope.accountUser.hasOwnProperty('user')) 
	    		return;
	    	$timeout(function(){
		    	$scope.twoFactorAuthBool = $scope.accountUser.user.twoFactor == 'off' ? false : true;
		    	$scope.twoFactorAuthPref = $scope.accountUser.user.twoFactor;	    		
	    	});
	    }

	    $scope.getAuthorizationText = function getAuthorizationText() {

	      if ($scope.practitionerData.practitioner) {

	        var rawText = $translate.instant('CONNECT_TO_PRACTITIONER_DESC');
	        rawText = rawText.replace('XXXPRACTITIONER_NAMEXXX', $scope.getPractitionerName($scope.practitionerData.practitioner));

	        return $sce.trustAsHtml(rawText);
	      }
	      return '';
	    };

	    $scope.cancelConnectPractitioner = function() {

	    	$scope.connectPractitioner = false;
	    	$scope.enteringInvite = true;
	    };

	    $scope.getPractitionerName = function getPractitionerName(practitioner) {

	    	var ret = '';

	    	if (practitioner.title)
	    		ret += practitioner.title + ' ';

	    	ret += practitioner.firstName + ' ' + practitioner.lastName;

	    	if (practitioner.credentials)
	    		ret += ' ' + practitioner.credentials;

	    	return ret;
	    };

	    $scope.getPractitionerDetails = function getPractitionerDetails(practitioner) {

	    	if (!practitioner)
	    		return '';

	    	var ret = $scope.getPractitionerName(practitioner);

	    	ret += ', ' + practitioner.location.address + ', ' + practitioner.location.city + ', ' + practitioner.location.state;

	    	return ret;
	    };

  		$scope.useInviteCode = function() {

  			if ($scope.enteringInvite) {

  				AccountService.getPractitionerInvite($scope.practitionerData.inviteCode)
		        .success(function(practitioner) {
		          $scope.practitionerData.practitioner = practitioner;

		          $scope.enteringInvite = false;
		        })
		        .error(function(data, status, headers, config) {
		          if (status == 404) {

		            $ionicPopup.alert({
		              template: $translate.instant('CONNECT_PRACTITIONER_INVALID_CODE'),
		              okText: $translate.instant('OK_GOT_IT'),
		              okType: 'button-default'
		            });
		          }
		          else {

		            $ionicPopup.alert({
		              template: $translate.instant('CONNECT_PRACTITIONER_ERROR'),
		              okText: $translate.instant('OK_GOT_IT'),
		              okType: 'button-default'
		            });
		          }
		        });
  			}
  			else {

	        $scope.submittingInvite = true;
  		    AccountService.connectPractitioner($scope.practitionerData.inviteCode)
	        .success(function(practitioner) {
	            $scope.submittingInvite = false;
	            $scope.connectPractitioner = false;

	            $scope.practitionerConnections.push(practitioner);

	            var emailPref = AccountService.getUserPreference('receive_phi_in_email');
		          if (typeof emailPref === 'undefined') {

		              showInsecureEmailModal();
		          }

							AccountService.setUserPreference('receive_phi_in_email', false);
	            AccountService.setUserPreference('receive_phi_in_pushes', false);
	        })
	        .error(function(data, status, headers, config) {

	        	$scope.submittingInvite = false;
	        	var localError;

            if (status == 404) {

              localError = $translate.instant('CONNECT_PRACTITIONER_INVALID_CODE');
            }
            else if (status == 409) {

              localError = $translate.instant('CONNECT_TO_PRACTITIONER_CONFLICT');
            }
            else {

              localError = $translate.instant('CONNECT_PRACTITIONER_ERROR');
            }

            $ionicPopup.alert({
              template: localError,
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
	        });
	      }
  		};

  		$scope.disconnectPractitioner = function(practitioner) {

  			var disconnectPopup = $ionicPopup.confirm({
	        template: '<div>' + $translate.instant('DISCONNECT_PRACTITIONER_POPUP') + '</div>',
	        cancelText: $translate.instant('CANCEL'),
	        cancelType: 'button-default',
	        okText: $translate.instant('DISCONNECT'),
	        okType: 'button-default'
	      });

	      disconnectPopup.then(function(res) {

	        if (res) {

		  			AccountService.disconnectPractitioner(practitioner)
		  				.success(function() {
			            var index = $scope.practitionerConnections.indexOf(practitioner);
			            if (index >= 0) {

			            	$scope.practitionerConnections.splice(index, 1);
			            }
			        })
			        .error(function(data, status, headers, config) {
			            $ionicPopup.alert({
						        template: $translate.instant('DISCONNECT_PRACTITIONER_ERROR'),
						        okText: $translate.instant('OK_GOT_IT'),
						        okType: 'button-default'
						      });
			        });
			    }
			  });
  		};

  		$scope.closeInsecureEmailModal = function closeInsecureEmailModal() {
            OverlayService.modal.close($scope.insecureEmailModal).then(function(modal) {
              $scope.insecureEmailModal = modal;
            });
	    };

	    $scope.updateInsecureEmailPreference = function updateInsecureEmailPreference() {

	      if ($scope.insecureEmail.checked) {

	        AccountService.setUserPreference('receive_phi_in_email', true);
	      }
	      else {

	        AccountService.setUserPreference('receive_phi_in_email', false);
	      }
	    };

			$scope.updateInsecurePushPreference = function updateInsecurePushPreference() {

	      if ($scope.insecurePushes.checked) {

	        AccountService.setUserPreference('receive_phi_in_pushes', true);
	      }
	      else {

	        AccountService.setUserPreference('receive_phi_in_pushes', false);
	      }
	    };

	    $scope.showInsecureEmailPreference = function showInsecureEmailPreference() {

	      // This has to get set once after making the connection to the practitioner.
	      var emailPref = AccountService.getUserPreference('receive_phi_in_email');
	      return (typeof emailPref !== 'undefined') || ($scope.practitionerConnections && $scope.practitionerConnections.length > 0);
	    };

	    function showInsecureEmailModal() {
            OverlayService.modal.open({
              modalId: 'InsecureEmailModal',
              templateUrl: 'templates/account.insecureEmail.modal.html',
              scope: $scope,
              animation: 'slide-in-up',
              ignoreStatusBar: false,
              recordAppseeEvent: false
             }).then(function(modal) {
              $scope.insecureEmailModal = modal;
             });
	    }

	    function initVersion(){
	  		$scope.appVersion = Environment.getAppVersion();
	  		$scope.copyrightYear = GeneralService.getCurrentYear();
	    }

  		function updateAccountUser() {
  			$scope.accountUser = AccountService.getAccountUser();
	  		if ($scope.accountUser && $scope.accountUser.user) {
					if($scope.isPractitioner()){
						$state.go('practitioner.account');
					}

	  			$scope.accountData.name = $scope.accountUser.user.name;
	  			$scope.accountData.email = $scope.accountUser.user.email;

      		$scope.practitionerConnections = AccountService.getConnectionContext();

			    var emailPref = AccountService.getUserPreference('receive_phi_in_email');
			    if (typeof emailPref !== 'undefined') {

			      $scope.insecureEmail.checked = emailPref == 'true';
			    }
	  		}

	  		if (!$scope.practitionerConnections)
	  			$scope.practitionerConnections = [];
	  		else
	  			$scope.practitionerConnections = $scope.practitionerConnections.practitioners;

	  		initializeTwoFactorAuth();

	  		initVersion();
	  	}
	  	// When reloading the page this won't exist right away.
	  	updateAccountUser();

  		$rootScope.$on('event:pacificaReady', updateAccountUser);

  		$scope.accountData.locale = AccountService.getUserPreference('preferred_locale');
	  	if (typeof $scope.accountData.locale === 'undefined')
	  		$scope.accountData.locale = "en-us";
	    else
	      $scope.accountData.locale = $scope.accountData.locale.toLowerCase();

  		$scope.showUpdateName = function showUpdateName() {

  			$scope.accountData.name = $scope.accountUser.user.name;
  			$scope.editingName = true;
  		};

  		$scope.cancelUpdateName = function cancelUpdateName() {

  			$scope.editingName = false;
  		};

  		$scope.updateName = function updateName() {

  			var nickname = $scope.accountData.name;

	      if (!nickname || nickname.length === 0) {

	        $scope.nicknameError = $translate.instant('LOGIN_ERROR_MISSING_NAME');
	      }
	      else {

	        $scope.nicknameError = undefined;
	        $scope.updatingName = true;

	        AccountService.setNickname(nickname)
	          .success(function() {

	          	$scope.accountUser.user.name = nickname;
	            $scope.updatingName = false;
	            $scope.editingName = false;
	          })
	          .error(function(data, status, headers, config) {

	            $scope.updatingName = false;
	            $scope.nicknameError$translate.instant('UPDATE_NICKNAME_ERROR');
	          });
	      }
  		};


  		$scope.isEmailValidated = function isEmailValidated() {

	      return AccountService.isEmailValidated();
	    };

	    $scope.updateEmail = function updateEmail() {
	        AccountService.setEmailAddress($scope.accountUser.user.email)
	          .success(function() {
		            $ionicPopup.alert({
		              template: $translate.instant('CHECK_EMAIL_UPDATE_EMAIL'),
		              okText: $translate.instant('OK_GOT_IT'),
		              okType: 'button-default'
		            });
	          })
	          .error(function(data, status, headers, config) {
	            $scope.emailError = $translate.instant('UPDATE_EMAIL_ERROR');
	            $scope.updatingEmail = false;
	          });
	     };

	    $scope.changeLanguage = function changeLanguage() {

	    	$scope.editingLanguage = true;
	    };

	    $scope.stopEditingLanguage = function stopEditingLanguage() {

	    	$scope.editingLanguage = false;
	    };

	    $scope.setLanguage = function setLanguage(lang) {

	    	AccountService.setLocale(lang)
        .success(function() {

        	$scope.accountData.locale = lang;

          $scope.languageUpdated = true;

          $scope.editingLanguage = false;

          $timeout(function() {

            $scope.languageUpdated = false;
          }, 3000);
        });
	    };

	    $scope.isLanguageActive = function isLanguageActive(lang) {

	    	return $scope.accountData.locale == lang;
	    };

	    $scope.isPremium = function isPremium() {
	      return AccountService.isPremiumEnabled();
	    };

	    $scope.getPremiumExpiration = function getPremiumExpiration() {

	      return AccountService.getPremiumExpiration();
	    };

	    $scope.isWebSubscription = function isWebSubscription() {

	    	return $scope.isPremium() &&
	    		   !$scope.subscriptionCancelled &&
	    	       AccountService.getAccountUser().account.paymentPlatform == 'WEB' &&
	    	       AccountService.getAccountUser().account.paymentType == 'PURCHASE';
	    };

	    $scope.hasDownloadedGiftCodes = function hasDownloadedGiftCodes() {

	    	return AccountService.getUserPreference('has_purchased_gift_codes') == 'true';
	    };

	    $scope.downloadGiftCodes = function downloadGiftCodes() {

	    	AccountService.getDownloadGiftCodeToken()
  				.success(function(token) {

  					window.open(Environment.serverURL + '/payment/giftCodes.csv?token=' + token, '_blank');
  				})
  				.error(function() {

  					window.alert("There was an error loading the gift codes.");
  				});
	    };

	    $scope.toggleTwoFactorAuth = function toggleTwoFactorAuth() {
	    	
	    	function toggleValue(){
		      if ($scope.twoFactorAuthPref === 'off') {
		        $scope.twoFactorAuthPref = 'email';
		      } else if ($scope.twoFactorAuthPref === 'email') {
		        $scope.twoFactorAuthPref = 'off';
		      }

		      $scope.twoFactorAuthBool = !$scope.twoFactorAuthBool;
		    }

		    toggleValue();

		    function failureCallback(){
          OverlayService.popup.alert({
            template: $translate.instant('GENERIC_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
          toggleValue();
		      if (!$scope.$$phase)
		      	$scope.$apply();
		    }

	      AccountService.setTwoFactorAuth($scope.twoFactorAuthPref, failureCallback);
	    };


	    $scope.cancelSubscription = function cancelSubscription() {

	    	AccountService.cancelSubscription()
	    		.success(function() {
	    			$ionicPopup.alert({
	    			  template: $translate.instant('SUBSCRIPTION_CANCEL_SUCCESS'),
	    			  okText: $translate.instant('OK_GOT_IT'),
	    			  okType: 'button-default'
	    			}).then(function() {
	    				$scope.subscriptionCancelled = true;
	    			});
	    		})
	    		.error(function() {
	    			$ionicPopup.alert({
	    			  template: $translate.instant('SUBSCRIPTION_CANCEL_ERROR'),
	    			  okText: $translate.instant('OK_GOT_IT'),
	    			  okType: 'button-default'
	    			});
	    		});
	    };

	    $scope.getAccountType = function getAccountType() {
	    	if(!$scope.accountUser || !$scope.accountUser.account){
	    		return;
	    	}
	      var type = '';
	      if (AccountService.isPremiumEnabled()) {
	        type += $translate.instant('ACCOUNT_TYPE_FULL_ACCESS') + ' - ' + $translate.instant($scope.accountUser.account.paymentType);
	      } else {
					type += $translate.instant('ACCOUNT_TYPE_BASIC');
		  	}
	      return type;
	    };

	    $scope.showLogout = function showLogout() {

	    	$scope.showingLogout = true;
	    };

	    $scope.hideLogout = function hideLogout() {

	    	$scope.showingLogout = false;
	    };

	    $scope.showConfirmDelete = function showConfirmDelete(){
	      $scope.deleteModal = AccountService.showConfirmDeleteModal('templates/account.delete.modal.html', $scope);
	    };

	    $scope.confirmDelete = function confirmDelete(){
	      var passed = AccountService.validateDeleteText($scope.confirmData, $scope.deleteModal, $scope.socialLogout);
	      if(!passed){
	        $scope.confirmError = true;
	      } else {
	      	AccountService.finishDelete();
	        $scope.closeDeleteModal();
	      }
	    };

	    $scope.closeDeleteModal = function closeDeleteModal(){
			OverlayService.modal.close($scope.deleteModal).then(function(modal) {
			  $scope.deleteModal = modal;
			}); 
	    };

	    $scope.updatePassword = function udpatePassword(){
	    	AccountService.showUpdatePasswordModal();
	    };

	    $scope.hide2FA = function hide2FA(){
	      return AccountService.hide2FA();
	    };

    }
  ]);
})();

(function() {

  var introCtrl = angular.module('assessmentIntroCtrl', []);

  introCtrl.controller('AssessmentIntroCtrl', ['$scope', 'AssessmentService', '$state', '$rootScope',
    function ($scope, AssessmentService, $state, $rootScope) {

      $scope.setShowSidebar(false);

      if ($scope.isAppReady()) {
        AssessmentService.initializeIntroFunctionality($scope);
      }
      $scope.$on('event:pacificaReady', function(){
        AssessmentService.initializeIntroFunctionality($scope);
      });

      $scope.closeAssessment = function(){
        $scope.setShowSidebar(true);
        $state.go('app.therapist');
      };
    }
  ]);

  var questionCtrl = angular.module('assessmentQuestionCtrl', []);

  questionCtrl.controller('AssessmentQuestionCtrl', ['$scope', 'AssessmentService', '$rootScope', '$controller', '$state', '$stateParams',
    function ($scope, AssessmentService, $rootScope, $controller, $state, $stateParams){
      $controller('AssessmentIntroCtrl', {$scope: $scope});

      function redirectIfNecessary() {
        // don't allow users to view questions after they've completed the assessment
        if($scope.assessmentRequest.userAssessment.status == 'COMPLETE'){
          $state.go('app.assessment-results', {assessmentId: $stateParams.assessmentId, assessmentRequestId: $stateParams.assessmentRequestId });
        }
      }

      function initAssessmentQuestion() {
        AssessmentService.initializeQuestionFunctionality($scope);
        redirectIfNecessary();
      }

      if ($scope.isAppReady()) {
        initAssessmentQuestion();
      }
      $scope.$on('event:pacificaReady', function(){
        initAssessmentQuestion();
      });
    }
  ]);

  var resultsCtrl = angular.module('assessmentResultsCtrl', []);

  resultsCtrl.controller('AssessmentResultsCtrl', ['$scope', 'AssessmentService', '$rootScope', '$state',
    function ($scope, AssessmentService, $rootScope, $state) {

      $scope.isReview = $state.current.data.review;
      $scope.setShowSidebar(false);

      $scope.exitResults = function(){
        $scope.setShowSidebar(true);
        $state.go('app.therapist');
      };

      if ($scope.isAppReady()) {
        AssessmentService.initializeResultsFunctionality($scope);
      }
      $scope.$on('event:pacificaReady', function(){
        AssessmentService.initializeResultsFunctionality($scope);
      });
    }
  ]);
})();

(function() {

  var ctrl = angular.module('habitsCtrl', []);

  ctrl.controller('HabitsCtrl', ['$scope', '$rootScope', '$controller', '$state', '$timeout', '$http', '$translate', '$analytics', '$ionicPopup', 'AccountService', 'HabitsService', 'GeneralService', 'Environment', 'OverlayService',
    function ($scope, $rootScope, $controller, $state, $timeout, $http, $translate, $analytics, $ionicPopup, AccountService, HabitsService, GeneralService, Environment, OverlayService) {

      $scope.todaysData = {};
      $scope.updating = false;

      $scope.redraw = 0;

      if (typeof $scope.editingGoals == 'undefined')
        $scope.editingGoals = false;


      function recreateHabitsArrays() {
        $scope.habits = HabitsService.getAccountHabits();
        $scope.potentialHabits = HabitsService.getPotentialAccountHabits();

        // NOTE: This creates a copy of the array.
        HabitsService.removeMoodHabit($scope);
      }

      recreateHabitsArrays();

      $scope.date = new Date();

      $scope.getDateString = function getDateString() {

        var dateString = GeneralService.getDayString($scope.date);

        var todayString = GeneralService.getDayString(new Date());
        if (dateString == todayString)
          return $translate.instant('TODAY');
        else {

          var yesterday = new Date().addDays(-1);

          var yesterdayString = GeneralService.getDayString(yesterday);
          if (dateString == yesterdayString) {
            return $translate.instant('YESTERDAY');
          }
          else {

            var day =  $scope.date.getDay();
            var month = $scope.date.getMonth();

            return moment($scope.date).format("dddd, MMMM Do YYYY");
          }
        }
      };

      $scope.previousDay = function previousDay() {

        if (!$scope.canGoBackwards()) return;

        $scope.postHabits();

        // Subtract a day.
        $scope.date = $scope.date.addDays(-1);

        // Need to check to see if that day's data has been requested. If not, go request it.
        var hasHabitData = HabitsService.hasHabitData($scope.date);
        console.log("has data: " + hasHabitData);

        if (!hasHabitData) {

          var startDate = $scope.date.addDays(-6);

          $scope.loadingData = true;

          HabitsService.findHabitData(startDate, $scope.date)
            .success(function(data) {
              $scope.loadingData = false;
              HabitsService.addHabitData(data);
            })
            .error(function(data, status, headers, config) {

              $scope.loadingData = false;
              // Handle the error
              console.log("habit data error");
            });

          $analytics.eventTrack('previousDay', {category: 'habits'});
        }

        updateHabits();
      };

      $scope.nextDay = function nextDay() {

        if (!$scope.canGoForward()) return;

        $scope.postHabits();

        $scope.date = $scope.date.addDays(1);

        $analytics.eventTrack('nextDay', {category: 'habits'});

        updateHabits();
      };

      $scope.canGoBackwards = function canGoBackwards() {

        var accountUser = AccountService.getAccountUser();
        if (!accountUser || !accountUser.user)
          return false;

        var currentDay = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate());

        var createdAt = new Date(accountUser.user.createdAtStr);
        var createdDay = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());

        return currentDay > createdDay;
      };

      $scope.canGoForward = function canGoForward() {

        var currentDate = new Date();
        var yesterday = currentDate.addDays(-1);

        return $scope.date < yesterday;
      };

      $scope.getHabitName = function getHabitName(habit) {

        return HabitsService.getHabitName(habit);
      };

      $scope.getEditHabitText = function getEditHabitText(habit) {

        if ($scope.editingGoals && $scope.canEditHabit(habit)) {

          return '(' + $translate.instant('TAP_TO_EDIT') + ')';
        }
        else {

          return '';
        }
      };

      $scope.getTodaysHabitsClass = function getTodaysHabitsClass() {

        var numHabits = 0;
        var accountHabits = $scope.habits;
        for (var index in accountHabits) {

          var habit = accountHabits[index];
          if (habit.id != 1 && habit.id != 19) // Mood and stress
            ++numHabits;
        }

        var completed = $scope.getCurrentlyCompletedHabits();

        var percentage = (completed * 100) / numHabits;

        if (numHabits === 0){
          return 'zero';
        }

        if (percentage === 0) {
          return 'zero';
        }
        else if (percentage > 0 && percentage < 10) {
          return 'one';
        }
        else if (percentage >= 10 && percentage < 20) {
          return 'two';
        }
        else if (percentage >= 20 && percentage < 30) {
          return 'three';
        }
        else if (percentage >= 30 && percentage < 40) {
          return 'four';
        }
        else if (percentage >= 40 && percentage < 50) {
          return 'five';
        }
        else if (percentage >= 50 && percentage < 60) {
          return 'six';
        }
        else if (percentage >= 60 && percentage < 70) {
          return 'seven';
        }
        else if (percentage >= 70 && percentage < 80) {
          return 'eight';
        }
        else if (percentage >= 80 && percentage < 90) {
          return 'nine';
        }
        else if (percentage >= 90 && percentage < 100) {
          return 'ten';
        }
        else {
          return 'eleven';
        }
      };

      $scope.getCurrentlyCompletedHabits = function getCurrentlyCompletedHabits() {

        var habits = $scope.habits;

        var completed = 0;
        for (var i=0; i<habits.length; ++i) { // Note that we're starting

          var habit = habits[i];
          if (habit.id == 1 || habit.id == 19) // Mood and stress
            continue;

          var singleHabitData = $scope.todaysData[habit.id];

          var singleHabitValue = singleHabitData.options.value;

          if ($scope.editingGoals || ( (singleHabitValue > 0) && HabitsService.metGoal(habit, singleHabitValue-1)))
            ++completed;
        }

        return completed;
      };

      $scope.removeHabit = function removeHabit(habit) {

        HabitsService.removeHabit(habit.id)
          .success(function() {

            HabitsService.removeLocalHabit(habit.id);

            // Because we created a copy of the habits array, we need to manually remove the habit.
            for (var habitName in $scope.todaysData) {

              var singleHabitData = $scope.todaysData[habit.id];

              if(singleHabitData.habit.id == habit.id) {

                delete $scope.todaysData[habit.id];
                break;
              }
            }

            recreateHabitsArrays();

            $timeout(function() {
              $rootScope.$broadcast('reCalcViewDimensions');
            });

          })
          .error(function(data, status, headers, config) {

            window.alert($translate.instant('HABITS_REMOVING_ACTIVITY_ERROR'));
          });
      };

      $scope.addHabit = function addHabit(habit) {

        HabitsService.addHabit(habit.id, true) // Just telling the service that this was a user action
          .success(function() {

            HabitsService.addLocalHabit(habit);

            recreateHabitsArrays();

            $scope.stopAddingActivity();

            updateHabits();
          })
          .error(function(data, status, headers, config) {

            window.alert($translate.instant('HABITS_ERROR_ADDING_HABIT'));
          });
      };

      $scope.moveHabit = function moveHabit(habit, fromIndex, toIndex) {

        console.log("moving " + habit.name + " from " + fromIndex + " to " + toIndex);

        $scope.habits.splice(fromIndex, 1);
        $scope.habits.splice(toIndex, 0, habit);

        HabitsService.reorderHabits($scope.habits);
      };

      $scope.isGoalMet = function isGoalMet(habit) {

        if ($scope.editingGoals)
          return true;

        // Habit was scoped and the goal ordinal could change. Make sure to reference
        // the one in the singleHabitData object for the data.
        var singleHabitData = $scope.todaysData[habit.id];

        if (singleHabitData.options.value === 0)
          return false;

        return HabitsService.metGoal(habit, singleHabitData.options.value-1);
      };

      $scope.hasEntry = function hasEntry(habit) {

        var singleHabitData = $scope.todaysData[habit.id];

        return singleHabitData.options.value > 0;
      };

      $scope.getRangeBackgroundStyle = function getRangeBackgroundStyle(habit) {

        // input[type=range]::-webkit-slider-runnable-track {
        //   width: 100%;
        //   height: 4px;
        //   background:
        //     repeating-linear-gradient(90deg, #606dbc 10%, #465298 30%, #465298 60%);
        // }

        var items = habit.habitValues.length + 1;
        var goal = habit.goalOrdinal;

        var section = 100 / items;

        var firstHalf = (goal + 1) * section;

        var secondHalf = 100 - section - firstHalf;

        var firstColor = habit.goalMinimized ? 'green' : 'red';
        var secondColor = habit.goalMinimized ? 'red' : 'green';

        return 'background: repeating-linear-gradient(90deg, grey 0%, grey ' + section + '%, ' +
          firstColor + ' ' + section + '%, ' +
          firstColor + ' ' + firstHalf + '%, ' +

          secondColor + ' ' + firstHalf + '%, ' +
          secondColor + ' 100%)';
      };

      // $scope.showOptions = function showOptions(habit) {

      //   var canEdit = $scope.canEditHabit(habit);
      //   var editText = canEdit ? 'EDIT_ACTIVITY' : 'CUSTOMIZE_ACTIVITY';

      //   $ionicActionSheet.show({
      //     buttons: [
      //       { text: $translate.instant('CHANGE_DAILY_GOAL') },
      //       { text: $translate.instant('REMOVE_ACTIVITY') },
      //       { text: $translate.instant(editText) }
      //     ],
      //     cancelText: $translate.instant('CANCEL'),
      //     cancel: function() {

      //     },
      //     buttonClicked: function(index) {

      //       // TODO Google Analytics.

      //       if (index === 0) {

      //         $scope.editGoals();
      //       }
      //       else if (index == 1) {

      //         $scope.removeHabit(habit);
      //       }
      //       else {

      //         if (!AccountService.isPremiumEnabled()) {

      //           PayService.showPremiumModal($scope, 'health', 'createActivity', true);
      //           return true;
      //         }

      //         if (canEdit) {

      //           $scope.editHabit(habit, true);
      //         }
      //         else {

      //           $state.go('app.habits-create', {habitName: habit.name});
      //         }
      //       }
      //       return true;
      //     }
      //    });
      // };

      $scope.editGoals = function editGoals() {

        $scope.postHabits();

        $scope.editingGoals = !$scope.editingGoals;

        // Recreate the habits with the goal data
        updateHabits();

        $scope.date = new Date();
      };

      $scope.stopEditingGoals = function stopEditingGoals() {

        $scope.editingGoals = false;

        // Recreate the habits with the habit data
        updateHabits();
      };

      $scope.showAddActivity = function showAddActivity() {

        if (!$scope.canAddHabits()) {

          $ionicPopup.alert({
            template: $translate.instant('UNLIMITED_TRACKING_WEB_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
          return;
        }
        $scope.postHabits();
        $scope.addingActivity = true;
      };

      $scope.stopAddingActivity = function stopAddingActivity() {

        $scope.addingActivity = false;

        updateHabits();

        $timeout(function() {
          ++$scope.redraw;
        });
        
      };

      $scope.canAddHabits = function canAddHabits() {

        var habitCount = $scope.habits.length;
        if ((habitCount >= 3) && (!AccountService.hasUnlockedTracking())) {

          return false;
        }

        return true;
      };

      $scope.hasPotentialHabits = function hasPotentialHabits() {

        return $scope.potentialHabits.length > 0;
      };

      $scope.isHabitDisabled = function isHabitDisabled(habit) {

        return $scope.canEditHabit(habit) && !AccountService.isPremiumEnabled();
      };

      // This does not check premium.
      $scope.canEditHabit = function canEditHabit(habit) {

        var accountUser = AccountService.getAccountUser();

        return accountUser && accountUser.user && (habit.creatorId == accountUser.user.id);
      };

      $scope.editHabit = function editHabit(habit, force) {

        if ($scope.canEditHabit(habit) && ($scope.editingGoals || force)) {

          HabitsService.setIsEditingHabits(true);

          $state.go('app.habits-create', {habitId: habit.id});
        }
      };

      $scope.getHabitData = function getHabitData(habitId) {
        return HabitsService.getHabitDataByHabitId($scope.date, habitId);
      };

      $scope.getTodaysData = function getTodaysData(habit) {

        if ($scope.todaysData[habit.id]) {

          return $scope.todaysData[habit.id];
        }
      };

      $scope.getTodaysDataDisplay = function getTodaysDataDisplay(habit) {

        if ($scope.todaysData[habit.id]) {

          if ($scope.todaysData[habit.id].options.value === 0)
            return $translate.instant('NO_DATA');

          return HabitsService.getHabitDisplay(habit, $scope.todaysData[habit.id].options.value-1);
        }
      };

      $scope.habitCallbacks = {
        valueUpdated: function valueUpdated(habit) {

          // Don't let them reset to the empty value. This implies deleting the data.
          var todaysHabitData = $scope.getTodaysData(habit);

          // We are reusing the
          if (!todaysHabitData)
            return;

          todaysHabitData.updated = true;
        },

        // This is for when the user interacts with a disabled custom habit.
        disabledInteraction: function disabledInteraction() {

          $scope.showPremiumModal();
        }
      };

      function postHabitData(successCallback, errorCallback) {

        var recordArray = [];
        var updateArray = [];

        // Go over all of the habits and figure out whether or not to record them.
        for (var habitId in $scope.todaysData) {

          var singleHabitData = $scope.todaysData[habitId];

          // Avoid sending data if the value is the minimum
          var value = +singleHabitData.options.value;
          if (value > 0 && singleHabitData.updated) {
            var habitData = singleHabitData.habitData;

            if (habitData) {

              HabitsService.buildMultiHabitDataUpdateArray(updateArray, singleHabitData.habit, habitData, value-1, $scope.date);
            }
            else {

              HabitsService.buildMultiHabitDataArray(recordArray, singleHabitData.habit, value-1, $scope.date);
            }
          }
        }

        // Coordinating two remote calls here.

        if (recordArray.length > 0) {

          $scope.updating = true;

          HabitsService.recordMultiHabitData(recordArray)
            .success(function() {

              updateHabits();

              if (updateArray.length > 0) {

                HabitsService.updateMultiHabitData(updateArray)
                  .success(function() {

                    updateHabits();

                    $scope.updating = false;

                    if (successCallback)
                      successCallback();
                  })
                  .error(function(data, status, headers, config) {

                    // TODO offline stuff.

                    $scope.updating = false;

                    if (errorCallback)
                      errorCallback();
                  });
              }
              else {

                $scope.updating = false;

                if (successCallback)
                  successCallback();
              }
            })
            .error(function(data, status, headers, config) {

              // TODO error and offline stuff
              $scope.updating = false;

              if (errorCallback)
                errorCallback();
            });
        }

        if (updateArray.length > 0 && recordArray.length === 0) {

          HabitsService.updateMultiHabitData(updateArray)
            .success(function() {

              updateHabits();

              $scope.updating = false;

              if (successCallback)
                successCallback();
            })
            .error(function(data, status, headers, config) {

              // TODO error and offline stuff.
              $scope.updating = false;

              if (errorCallback)
                errorCallback();
            });
        }

        if ( (updateArray.length === 0) &&
             (recordArray.length === 0) &&
             successCallback) {

          $timeout(successCallback);
        }
      }

      function postUpdatedGoals(success, error) {

        for (var i=0; i<$scope.habits.length; ++i) {

          // These should be the same, but we made a copy of the array and it does not
          // seem to be getting updated.
          var habit = $scope.habits[i];
          var singleHabitData = $scope.todaysData[habit.id];

          if (singleHabitData.updated) {
            habit.goalOrdinal = singleHabitData.habit.goalOrdinal = singleHabitData.options.value-1;

            HabitsService.updateGoalOrdinal(habit)
              .success(success)
              .error(error);
          }
        }

        updateHabits();
      }

      $scope.finishEditingGoals = function finishEditingGoals() {

        $scope.postHabits();

        $scope.stopEditingGoals();
      };

      $scope.postHabits = function postHabits(success, error) {

        if ($scope.editingGoals) {
          postUpdatedGoals(success, error);
        }
        else {
          postHabitData(success, error);
        }
      };

      function createTodaysHabitData(habit, habitData) {

        var values = habit.habitValues;

        // This should not happen, but editing habits might get things out of whack.
        if (habit.goalOrdinal >= values.length)
          habit.goalOrdinal = values.length-1;

        var goalValue = values[habit.goalOrdinal];

        var value;
        var valueOrdinal;
        var hasData = false;

        var isString = !!goalValue.valueString;

        if (habitData && !$scope.editingGoals) {

          var habitValue = HabitsService.getHabitValueById(habitData.habitValueId);

          // It is possible that someone deleted a habit value, which vould cause this.
          if (habitValue) {

            hasData = true;

            valueOrdinal = habitValue.ordinate + 1; // Need to account for the empty value.
          }
        }

        if (!hasData) {

          if ($scope.editingGoals) {

            valueOrdinal = habit.goalOrdinal + 1;
          }
          else {

            valueOrdinal = 0;
          }
        }

        // Don't recreate the object. Tracking might not work correctly.
        if (!$scope.todaysData[habit.id]) {
          $scope.todaysData[habit.id] = {
            habit: habit
          };
        }

        var todaysHabitData = $scope.todaysData[habit.id];
        todaysHabitData.hasData = hasData;
        todaysHabitData.habitData = hasData ? habitData : undefined;
        todaysHabitData.isString = isString;
        todaysHabitData.updated = false;

        if (!todaysHabitData.options)
          todaysHabitData.options = {};

        todaysHabitData.options.floor = 0;
        todaysHabitData.options.ceil = values.length; // Note this would be values.length-1 but we need to account for the empty value on the left.
        todaysHabitData.options.step = 1;
        todaysHabitData.options.value = valueOrdinal;
      }

      function updateHabits() {

        recreateHabitsArrays();

        // Determine today's data
        for (var i=0; i<$scope.habits.length; ++i) {

          var habit = $scope.habits[i];

          var habitData = $scope.getHabitData(habit.id);

          createTodaysHabitData(habit, habitData);
        }

        ++$scope.redraw;
      }

      $scope.initializeHabits = function() {

        updateHabits();
      };

      $scope.closeHealthKitModal = function closeHealthKitModal() {

        AccountService.setUserPreference('integrate_with_healthkit', 'true');

        HabitsService.initHealthKit();

        OverlayService.modal.close($scope.healthKitModal).then(function(modal) {
          $scope.healthKitModal = modal;
        });
      };

      updateHabits();

      // Check to make sure that we have active habit data for all of the account habits.

      if (HabitsService.requiresHabitDataReload()) {

        var startDate = $scope.date.addDays(-6);

        HabitsService.findHabitData(startDate, $scope.date)
          .success(function(data) {
            $scope.loadingData = false;
            HabitsService.addHabitData(data);

            HabitsService.clearHabitDataReload();
          })
          .error(function(data, status, headers, config) {

            $scope.loadingData = false;
            // Handle the error
            console.log("habit data error");
          });
      }
    }
  ]);
})();
(function() {

	var ctrl = angular.module('homeCtrl', []);

	ctrl.controller('HomeCtrl', ['$scope', '$rootScope', '$controller', '$state', '$http', '$timeout', '$translate', 'AccountService', 'HabitsService',
	  function ($scope, $rootScope, $controller, $state, $http, $timeout, $translate, AccountService, HabitsService) {
	  	$scope.homeRenderReady = false;
      if (!AccountService.isLoggedIn()) {

	  		$state.go('app.login');
	  		return;
	  	}

      var redirectForDashboardUser = function(){

        if ($scope.isShowingClientView()){
          $scope.homeRenderReady = true;
          return;
        }
        var accountUser = AccountService.getAccountUser();
        var user = accountUser.user;

        if (AccountService.isPractitioner()) {

          window.location.hash = '#/practitioner/clients';
          return;
        } else if (AccountService.isAnyCoach()) {
          window.location.hash = '#/practitioner/individuals';
          return;
        }

        $scope.homeRenderReady = true;
      };


      if($scope.isAppReady()){
        redirectForDashboardUser();
        // from app.js
        $scope.showAgreement();
      }

      $scope.$on('event:pacificaReady', function() {
        redirectForDashboardUser();
        // from app.js
        $scope.showAgreement();
      });

      // From app.js
      // Removing because it isn't working correctly.
      // if ($scope.isMobile()) {

      //   $state.go('app.mobile');
      // }

	  	// Extend these controllers.
	  	$controller('MoodCtrl', {$scope: $scope});
	  	$controller('HabitsCtrl', {$scope: $scope});

	  	// TODO Remove
	  	$controller('RelaxCtrl', {$scope: $scope});

	  	$scope.activeSection = undefined;
	  	$scope.showingMoodHelp = false;
	  	$scope.showingHealthHelp = false;
			$scope.showingRelaxHelp = false;


  		$scope.isSectionActive = function isSectionActive(section) {

  			return section == $scope.activeSection;
  		};

  		$scope.isAnySectionAction = function isAnySectionAction() {

  			return (typeof $scope.activeSection) !== 'undefined';
  		};

  		$scope.setSectionActive = function setSectionActive(section) {

  			$scope.activeSection = section;
        var pref;

  			if (section == 'mood') {

  				$scope.initializeMoodData();

  				pref = AccountService.getUserPreference('completed_mood_intro');
			    if (!pref || pref != 'true') {

			      $scope.showMoodHelp();

			      AccountService.setUserPreference('completed_mood_intro', 'true');
			    }
  			}
  			else if (section == 'relax') {

  				pref = AccountService.getUserPreference('completed_relax_intro');
			    if (!pref || pref != 'true') {

			      $scope.showRelaxHelp();

			      AccountService.setUserPreference('completed_relax_intro', 'true');
			    }
  			}
  			else if (section == 'health') {

          $scope.initializeHabits();

  				pref = AccountService.getUserPreference('completed_habits_intro');
			    if (!pref || pref != 'true') {

			    	$scope.showHealthHelp();

			      AccountService.setUserPreference('completed_habits_intro', 'true');
			    }
  			}

        // Annoying, but it will not draw correctly the first time.
        $timeout(function() {
          ++$scope.redraw;

          window.scrollTo(0,0);
        });
  		};

  		$scope.clearActiveSection = function clearActiveSection() {

  			$scope.activeSection = undefined;

        $timeout(function() {

          window.scrollTo(0,0);
        });
  		};

  		$scope.updateMood = function updateMood() {

  			$scope.postMoodData();
  		};

  		$scope.getCompletedHabits = function getCompletedHabits() {

        var habits = HabitsService.getAccountHabits();

        var completed = 0;
        for (var i=0; i<habits.length; ++i) { // Note that we're starting

          var habit = habits[i];
          if (habit.id == 1 || habit.id == 19)
            continue;

          var todaysData = HabitsService.getHabitDataByHabitId($scope.date, habit.id);

          if (todaysData && HabitsService.metGoalWithHabitData(todaysData))
            ++completed;
        }

        return completed;
      };

      $scope.getCurrentMoodClass = function getCurrentMoodClass() {

      	if ($scope.isSectionActive('mood'))
      		return $scope.getMoodClass(); // from moodCtrl
      	else
      		return HabitsService.getTodaysLastMoodEntryClass();
      };

      // When getCurrentMoodClass in a template is interpolated in Safari,
      // the previous class or return value is still applied to the element.
      // This manually removes all mood classes before setting the new value.
      $scope.$watch($scope.getCurrentMoodClass, function(newValue, oldValue) {
        if ((newValue !== oldValue) && $scope.moodHabit) {
          var moodClasses = _.map($scope.moodHabit.habitValues, function(habitValue) {
            return habitValue.display.split(' ').join('');
          });
          $('#mood-column').removeClass(moodClasses.join(' '));
          $scope.currentMoodClass = newValue;
        }
      });

      $scope.getCurrentStressClass = function getCurrentStressClass() {

        return $scope.getStressClass(); // from moodCtrl
      };

  		$scope.getTodaysHabitsClass = function getTodaysHabitsClass() {

        var numHabits = 0;
        var accountHabits = HabitsService.getAccountHabits();
        for (var index in accountHabits) {

          var habit = accountHabits[index];
          if (habit.id != 1 && habit.id != 19)
            ++numHabits;
        }

        // Use the active values if the user is currently editing them.
        var completed;
        if ($scope.isSectionActive('health'))
        	completed = $scope.getCurrentlyCompletedHabits(); // from habitsCtrl
        else
        	completed = $scope.getCompletedHabits();

        var percentage = (completed * 100) / numHabits;

        if (numHabits === 0){
          return 'zero';
        }

        if (percentage === 0) {
          return 'zero';
        }
        else if (percentage <= 25) {
          return 'one';
        }
        else if (percentage <= 44) {
          return 'two';
        }
        else if (percentage <= 55) {
          return 'three';
        }
        else if (percentage <= 74) {
          return 'four';
        }
        else if (percentage <= 99) {
          return 'five';
        }
        else {
          return 'six';
        }

      };

      $scope.showMoodHelp = function showMoodHelp() {

      	$scope.showingMoodHelp = true;
      };

      $scope.hideMoodHelp = function hideMoodHelp() {

      	$scope.showingMoodHelp = false;

        // To make sure mood draws correctly.
        $timeout(function() {
          ++$scope.redraw;
        });
      };

      $scope.showHealthHelp = function showHealthHelp() {

      	$scope.showingHealthHelp = true;
      };

      $scope.hideHealthHelp = function hideHealthHelp() {

      	$scope.showingHealthHelp = false;

        // To make sure mood draws correctly.
        $timeout(function() {
          ++$scope.redraw;
        });
      };

      $scope.showRelaxHelp = function showRelaxHelp() {

      	$scope.showingRelaxHelp = true;
      };

      $scope.hideRelaxHelp = function hideRelaxHelp() {

      	$scope.showingRelaxHelp = false;
      };

      $scope.getMoodTitle = function getMoodTitle() {
        return $translate.instant('MOOD');
      };

      $scope.getHabitsHelpLine1 = function getHabitsHelpLine1() {

        var val = $translate.instant('HABITS_HELP_LINE_1');

        return val;
      };

      $scope.getHabitsHelpLine2 = function getHabitsHelpLine2() {

        var val = $translate.instant('HABITS_HELP_LINE_2');

        return val;
      };

  		$scope.homeUpdateHabits = function homeUpdateHabits() {

  			$scope.updatingHabitData = true;

  			$scope.postHabits(
          function success() {

  					$scope.clearActiveSection();

  					$scope.updatingHabitData = false;
  				},
          function error(data, status, headers, config) {
  					console.log("Error updating habit data:" + data);

  					$scope.updatingHabitData = false;
  				}
  			);
  		};

  		$scope.exitCurrentRelaxScreen = function exitCurrentRelaxScreen() {

  			if ($scope.showRelaxOptions) {

      		$scope.hideRelaxOptions();
      	}
      	else {

      		$scope.clearActiveSection(); // from homeCtrl.js
      	}
  		};

  		$(document).ready(function() {

  			$('.col-md-4').css("min-height",window.innerHeight);
  		});
    }
  ]);

  ctrl.controller('MobileCtrl', ['$scope', '$rootScope', '$controller', '$state', '$http', '$translate', 'AccountService', 'HabitsService',
    function ($scope, $rootScope, $controller, $state, $http, $translate, AccountService, HabitsService) {

      // Not sure there's anything to do here.
    }
  ]);
})();


(function() {

	var ctrl = angular.module('loginCtrl', []);

  // 8 Hours
  var KEEP_LOGGED_IN_TIME = 1000 * 60 * 60 * 8;

	ctrl.controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$translate', '$timeout', 'AccountService', 'HabitsService', 'GoalsService', 'AudioService', 'GeneralService', 'TokenService', 'Environment', 'AssessmentService', 'ActivityService', 'PathService', '$ionicModal', '$location', '$sce', 'OverlayService',
	  function ($scope, $rootScope, $state, $stateParams, $http, $translate, $timeout, AccountService, HabitsService, GoalsService, AudioService, GeneralService, TokenService, Environment, AssessmentService, ActivityService, PathService, $ionicModal, $location, $sce, OverlayService) {

      if($stateParams.showDataDisclaimer == 'true'){

        OverlayService.modal.open({
          modalId: 'DeleteDataDisclaimerModal',
          templateUrl: 'templates/account.deleteDataDisclaimer.modal.html',
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false,
          recordAppseeEvent: false
        }).then(function(modal) {
          $scope.deleteDataDisclaimer = modal;
        });
      }

      $scope.appVersion = Environment.getAppVersion();
      $scope.copyrightYear = GeneralService.getCurrentYear();

      $scope.closeDeleteDataDisclaimer = function closeDeleteDataDisclaimer(){
        OverlayService.modal.close($scope.deleteDataDisclaimer).then(function(modal) {
          $scope.deleteDataDisclaimer = modal;
        });
        $location.search('showDataDisclaimer', null);
      };

          $scope.showPwIcon = true;
          $scope.visibility = {
            new_password: 'password'
          };

          //$scope.passwordLabel = $translate.instant('NEW_PASSWORD');
          $scope.validationCount = 0;
          $scope.validationError = '';
          $scope.validationLabel = $translate.instant('PASSWORD');
          $scope.evalPassword = AccountService.evalPassword;
          $scope.visibility = { new_password: 'password' };
          $scope.form = {new_password: ''};
          $scope.evalPassword = function evalPassword(){
            var obj = AccountService.evalPassword($scope.form.new_password);
            $scope.validationCount = obj.validationCount;
            $scope.validationError = obj.validationError;
          };          

          $scope.toggleVisibility = function toggleVisibility(param){
            $scope.visibility[param] = $scope.visibility[param] == 'password' ? 'text' : 'password';
          };
          
          $('html').addClass('background-container');
          $('html').addClass('outside');

          $scope.removePractitionerClass();

          $scope.loginData = {};
          $scope.signUpData = {};

          $scope.showingForgotPassword = false;
          $scope.forgotPasswordSuccess = false;

          // olark('api.box.hide');

          function getLoginTimeout() {

            if ($scope.loginData.keepLoggedIn)
              return KEEP_LOGGED_IN_TIME;

            return undefined;
          }

          function checkForAgreement(){
            if(!$scope.signUpData.agreed){
              $scope.errorMessage = $translate.instant('YOU_MUST_ACCEPT_TERMS');
              $scope.loginError = true;
              return true;
            }
            return false;
          }

          $scope.facebookSignIn=function(create) {
              if(!$scope.isLogin() && checkForAgreement()){
                return;
              }

              FB.login(function(response) {
                  if (response.authResponse) {
                      var id_token = response.authResponse.accessToken;

                      $scope.loginError = false;
                      $scope.errorMessage = '';
                      $scope.loading = true;
                   if (create) {
                     AccountService.signUpWithFacebook(id_token, getLoginTimeout())
                       .success(function(data, status, headers, config){
                          AccountService.updateTokenAndGetContext(data, status, headers, config, loginSuccess);
                       })
                       .error(loginFailure);
                   } else {
                     AccountService.loginWithFacebook(id_token, getLoginTimeout())
                       .success(function(data, status, headers, config){
                          AccountService.updateTokenAndGetContext(data, status, headers, config, loginSuccess);                        
                       })
                       .error(loginFailure);
                   }
                  } else {
                    console.log('User cancelled login or did not fully authorize.');
                  }
              }, {scope: 'public_profile,email'});
          };

          $scope.googleSignIn=function(create){
              if(!$scope.isLogin() && checkForAgreement()){
                return;
              }

              $scope.googleAuth.signIn().then(function(googleUser) {

                  var id_token = googleUser.getAuthResponse().id_token;

                  $scope.loginError = false;
                  $scope.errorMessage = '';
                  $scope.loading = true;

                  if (create) {
                    AccountService.signUpWithGoogle(id_token, getLoginTimeout())
                      .success(function(data, status, headers, config){
                        AccountService.updateTokenAndGetContext(data, status, headers, config, loginSuccess);
                      })
                      .error(loginFailure);
                  } else {
                    AccountService.loginWithGoogle(id_token, getLoginTimeout())
                      .success(function(data, status, headers, config){
                        AccountService.updateTokenAndGetContext(data, status, headers, config, loginSuccess);
                      })
                      .error(loginFailure);
                  }
              });
          };


      var loggedInRedirect = function(){
        $('html').removeClass('outside');
        if (AccountService.isPractitioner() && !$scope.isShowingClientView()) {
          $state.go('practitioner.clients');
        } else if (AccountService.isCoachManager() || AccountService.isCoach() || AccountService.isBackendCoach()) {
          $state.go('practitioner.individuals');
        } else if ($rootScope.returnToState) {
          $state.go($rootScope.returnToState.name, $rootScope.returnToParams , {location: 'replace'});
        } else {
          $state.go('app.home', {} , {location: 'replace'});
        }
        if($scope.unbindHandler)
          $scope.unbindHandler();
      };

          // This function comes from app.js, and allows us to notify the user that
      // their session has expired.
      if ($scope.hasBeenLoggedOut()) {

        $scope.loginError = true;
        $translate('LOGGED_OUT_MESSAGE').then(function(errorMessage) {
          $scope.errorMessage = errorMessage;
        });
      }

      if (AccountService.isLoggedIn() && $stateParams.reset != 'true' ) {
        loggedInRedirect();
      }

      $scope.loggingIn = true;

      if ($stateParams.create == 'true')
        $scope.loggingIn = false;

      if ($stateParams.reset == 'true')
        $scope.showingForgotPassword = true;


      $scope.toggleLogin = function toggleLogin() {
        $scope.pwPlaceholder = $translate.instant('PASSWORD');
        $scope.loggingIn = !$scope.loggingIn;

        // Clear this.
        $scope.errorMessage = undefined;
      };

      $scope.isLogin = function isLogin() {

        return $scope.loggingIn;
      };

      $scope.toggleForgotPassword = function toggleForgotPassword() {

        $scope.showingForgotPassword = !$scope.showingForgotPassword;
      };

      $scope.getLoginTosHTML = function getLoginTosHTML(){
        return $sce.trustAsHtml($translate.instant('SIGNUP_AGREEMENT'));
      };

      $scope.clickedAgreement = function clickedAgreement(ev){
        if($scope.signUpData.agreed){
          $scope.signUpData.agreed = false;
          return;
        }
        ev.preventDefault();

        OverlayService.modal.open({
          modalId: 'AgreementModal',
          templateUrl: 'templates/agreement.modal.html',
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false,
          recordAppseeEvent: false
        }).then(function(modal) {
          $scope.agreementModal = modal;
        });

      };

      $scope.closeAgreement = function(){
        OverlayService.modal.close($scope.agreementModal).then(function(modal) {
          $scope.agreementModal = modal;
        });
      };

      $scope.agreeToAgreement = function(){
        $scope.signUpData.agreed = true;
        $scope.errorMessage = null;
        $scope.loginError = false;

        $scope.closeAgreement();
      };

      function checkEmail() {

        if (!$scope.loginData.email) {
          $scope.errorMessage = $translate.instant('LOGIN_ERROR_MISSING_EMAIL');

          $timeout(function() {
            $('#loginEmail').focus();
          });

          return false;
        }
        else if (!GeneralService.isEmailValid($scope.loginData.email)) {

          $scope.errorMessage = $translate.instant('LOGIN_ERROR_INVALID_EMAIL');

          $timeout(function() {
            $('#loginEmail').focus();
          });

          return false;
        }

        return true;
      }

      $scope.useSuggestedEmail = function useSuggestedEmail() {

        $scope.signUpData.email = $scope.suggestedEmail;

        $scope.signup(true);
      };

      $scope.signup = function signup(skipMailCheck) {

        $scope.loginError = false;
        $scope.errorMessage = '';

        if (!$scope.signUpData.name) {
          $scope.errorMessage = $translate.instant('LOGIN_ERROR_MISSING_NAME');
          document.getElementById('createUserName').focus();
        }
        else if (!$scope.signUpData.email) {
          $scope.errorMessage = $translate.instant('LOGIN_ERROR_MISSING_EMAIL');
          document.getElementById('createUserEmail').focus();
        }
        else if (!GeneralService.isEmailValid($scope.signUpData.email)) {

          $scope.errorMessage = $translate.instant('LOGIN_ERROR_INVALID_EMAIL');
          document.getElementById('createUserEmail').focus();
        }
        else if (!$scope.form.new_password) {
          $scope.errorMessage = $translate.instant('LOGIN_ERROR_MISSING_PASSWORD');
          document.getElementById('new_password').focus();
        } else if (!$scope.signUpData.agreed){
          $scope.errorMessage = $translate.instant('YOU_MUST_ACCEPT_TERMS');
        }

        if ($scope.errorMessage !== '' || $scope.validationError) {
          $scope.loginError = true;
          return;
        }

        if (!skipMailCheck) {
          Mailcheck.run({
            email: $scope.signUpData.email,
            suggested: function(suggestion) {

              $scope.suggestedEmail = suggestion.full;
            },
            empty: function() {

              $scope.signup(true);
            }
          });

          return;
        }

        $scope.loading = true;

        AccountService.createAccount($scope.signUpData.email,
                                     $scope.form.new_password,
                                     $scope.signUpData.name,
                                     $scope.signUpData.referralCode,
                                     $scope.userGoal,
                                     $scope.groupCode,
                                     getLoginTimeout())

          .success(loginSuccess)
          .error(function(data, status, headers, config) {

            $scope.loading = false;
            $scope.loginError = true;

            $scope.errorMessage = $translate.instant("LOGIN_ERROR_CREATING_USER");
            if (status == 409) {
              $scope.errorMessage = $translate.instant('LOGIN_ERROR_EMAIL_IN_USE');
            }
          });
      };

      $scope.resetPassword = function resetPassword() {

        $scope.loginError = false;
        $scope.errorMessage = '';

        var ok = checkEmail();
        if (!ok) {
          $scope.loginError = true;
          return;
        }

        $scope.loading = true;

        AccountService.resetPassword($scope.loginData.email)
          .success(function() {

            $scope.loading = false;

            $scope.forgotPasswordSuccess = true;
          })
          .error(function(data, status, headers, config) {

            $scope.loading = false;
            $scope.loginError = true;

            $scope.errorMessage = $translate.instant('LOGIN_ERROR_RESET_PASSWORD');
          });
      };

      var loginSuccess = function(data, status, headers) {
        $scope.loading = false;

        // This is in app.js
        $scope.appRenderReady = false;
        $scope.unbindHandler = $rootScope.$on('event:userContextInitialized', loggedInRedirect);
        $scope.initializeUserContext(data, $rootScope, AccountService, HabitsService, GoalsService, AudioService, Environment, AssessmentService, ActivityService, PathService);
      };

      var loginFailure = function (data, status ) {

        $scope.loading = false;
        $scope.loginError = true;

        if (status == 400) {
          $scope.errorMessage = $translate.instant('LOGIN_ERROR_OAUTH_EMAIL_REQUIRED');
        } else if (status == 401) {
            $scope.errorMessage = $translate.instant('LOGIN_ERROR_INVALID_CREDENTIALS');
        } else if (status == 403) {
            $scope.errorMessage = $translate.instant('LOGIN_ERROR_ACCOUNT_LOCKED');
        } else if (status == 409) {
            $scope.errorMessage = $translate.instant('LOGIN_ERROR_EMAIL_IN_USE');
        } else {
          $scope.errorMessage = $translate.instant("LOGIN_ERROR_GENERIC");
        }
      };

      $scope.login = function login() {

        $scope.loginError = false;
        $scope.errorMessage = '';

        var ok = checkEmail();
        if (!ok) {
          $scope.loginError = true;
          return;
        }

        else if (!$scope.loginData.password) {
          $scope.errorMessage = $translate.instant('LOGIN_ERROR_MISSING_PASSWORD');
          $('#loginPassword').focus();
        }

        if ($scope.errorMessage !== '') {
          $scope.loginError = true;
          return;
        }

        $scope.loading = true;

        // Make sure there is no old data in here. But do this before calling login so that
        // the loginTimeout can be stored.
        localStorage.clear();

      	AccountService.login($scope.loginData.email, $scope.loginData.password, getLoginTimeout())
      		.success(function(data, status, headers, config){

            $scope.loading = false;

            if(data.twoFactor && data.twoFactor === 'email'){
              AccountService.promptFor2FA($scope.loginData.email, loginSuccess);
            } else {
              AccountService.updateTokenAndGetContext(data, status, headers, config, loginSuccess);
            }
          })
          .error(loginFailure);
      };
    }
  ]);

})();

(function() {

	var ctrl = angular.module('moodCtrl', []);

	ctrl.controller('MoodCtrl', ['$sce', '$scope', '$rootScope', '$timeout', '$controller', '$state', '$http', '$translate', 'AccountService', 'HabitsService', 'GeneralService', 'Token',
	  function ($sce, $scope, $rootScope, $timeout, $controller, $state, $http, $translate, AccountService, HabitsService, GeneralService, Token) {

	  	$scope.initialized = false;

	  	$scope.selectedSubValues = [];

	  	var habits = [];
	  	var moodHabitValues = [];
	  	var moodHabitSubValues = [];

	  	// The change listener will update this, avoiding replicating a lot of work
	  	// when we are checking for active sub-values.
	  	var strippedNotes = '';
	  	var splitStrippedNotes = [];
	  	var hashedFeelings = {};

	  	// This will be that atwho reference.
	  	var inputor;

	  	// The translation files have not yet been loaded.
	  	function updateRecentFeelings() {

	  		var recentFeelings = HabitsService.getRecentFeelings();
	  		$scope.recentFeelingText = [];

	  		if (recentFeelings) {

	  			for (var i=0; i<recentFeelings.length; ++i) {

	  				var recentFeeling = recentFeelings[i];
	  				$scope.recentFeelingText.push(recentFeeling.valueString);
	  			}
	  		}

		  	for (var j=0; j<moodHabitSubValues.length; ++j) {

		  		var display = getMoodSubValueDisplay(moodHabitSubValues[j]);

		  		$scope.recentFeelingText.push(display);
		  	}
		  }


	  	// updateRecentFeelingText();

	  	$scope.initializeMoodData = function initializeMoodData() {

	  		if (!$scope.moodData) {
	  			$scope.moodData = {};
	  			$scope.stressData = {};
	  		}

	  		var hasRecentData = false;

        var now = new Date();

        var moodDate;
	  		var existingMoodData = HabitsService.getHabitDataByHabitId(now, $scope.moodHabit.id);
	  		var existingStressData = HabitsService.getHabitDataByHabitId(now, HabitsService.STRESS_HABIT_ID);

	  		if (existingMoodData) {
					if (typeof existingMoodData.experiencedAt == 'object')
	          moodDate = existingMoodData.experiencedAt.getTime();
	        else
	          moodDate = new Date(existingMoodData.experiencedAt).getTime();

	        if (moodDate > now.getTime() - (30 * 1000)) {
	          hasRecentData = true;
	        }
	      }
		  	if (hasRecentData) {

		  		var moodHabitValue = HabitsService.getHabitValueById(existingMoodData.habitValueId);

		  		$scope.moodData.value = moodHabitValue.ordinate + 1;
		  		$scope.moodData.data = existingMoodData;

		  		if (existingStressData) {
		  			var stressHabitValue = HabitsService.getHabitValueById(existingStressData.habitValueId);

		  			$scope.stressData.value = stressHabitValue.ordinate + 1;
		  			$scope.stressData.data = existingStressData;
		  		}
		  	}
		  	else {

		  		$scope.moodData.value = 1;
		  		$scope.stressData.value = 1;
		  	}

		  	$scope.moodData.lastValue = $scope.moodData.value;

		  	if (hasRecentData) {

		  		if (existingMoodData.habitDataNotes) {
			  		$scope.moodData.notes = existingMoodData.habitDataNotes.notes;

			  		$scope.moodData.notes = $scope.moodData.notes.replace(/#(\S*)/g, '<span class="atwho-inserted" data-atwho-at-query="#$1"><strong>#$1</strong></span>');
			  	}
		  	}
		  	else {
		  		$scope.moodData.notes = '';
		  	}

		  	$scope.moodData.hasRecentData = hasRecentData;
		  	$scope.moodData.options = {

	  			floor: 0,
  				ceil: $scope.moodHabit.habitValues.length-1,
  				step: 1,
  				hideLimitLabels: true,
  				showSelectionBar: true,
  				id: $scope.moodHabit.name + '_val',
  				updateOrdinal: function (value) {

  					this.valueOrdinal = value;
  				},
  				onChange: function () {
  					$scope.moodData.updated = true;

  					if ( ($scope.moodData.value <= 3 && $scope.moodData.lastValue > 3) ||
                 ($scope.moodData.value == 4 && $scope.moodData.lastValue != 4) ||
                 ($scope.moodData.value >= 5 && $scope.moodData.lastValue < 5) ) {

  						$scope.selectedSubValues.length = 0;
  					}

  					$scope.moodData.lastValue = $scope.moodData.value;
  				},
        	getSelectionBarColor: function (value) {

        		return GeneralService.COLORS[value];
        	}
        };

        $scope.stressData.options = {
        	floor: 0,
        	ceil: $scope.stressHabit ? $scope.stressHabit.habitValues.length-1 : 1,
        	step: 1,
        	hideLimitLabels: true,
        	showSelectionBar: true,
        	updateOrdinal: function (value) {

  					this.valueOrdinal = value;
  				},
  				getSelectionBarColor: function (value) {

        		return GeneralService.STRESS_COLORS[value];
        	}

        };

        resetStrippedNotes();
      };

      function resetStrippedNotes() {

				strippedNotes = undefined;
	  		splitStrippedNotes = [];
	  		hashedFeelings = {};
      }

	  	function getStrippedNotes() {

	  		var notes = $scope.moodData.notes;

	  		if (notes) {
		  		notes = notes.replace(/&nbsp;/gm, '');
		  		notes = notes.replace(/<(?:.|\n)*?>/gm, '');
		  	}

	  		return notes;
	  	}

	  	$scope.notesChanged = function notesChanged() {

	  		resetStrippedNotes();

	  		// Can this thing replace the hashtags for us?
	  		if (inputor)
	  			inputor.atwho('reposition');
	  	};

	  	function updateStrippedNotes() {

	  		// This will be unset every time the model changes.
	  		if (strippedNotes)
	  			return;

	  		strippedNotes = getStrippedNotes();
	  		hashedFeelings = {};

	  		if (!strippedNotes)
	  			return;

	  		splitStrippedNotes = strippedNotes.split(' ');

	  		// check all of the notes.
	  		for (var i=0; i<splitStrippedNotes.length; ++i) {

	  			// See if there is a hashtag.
	  			var word = splitStrippedNotes[i];
	  			if (word.indexOf('#') === 0) {

	  				word = word.substring(1);

	  				word = word.replace(/\W+/g, '');

	  				word = word.toLowerCase();

	  				hashedFeelings[word] = word;
	  			}
	  		}
	  	}

	  	$scope.subValueIsActive = function subValueIsActive(subValueName) {

        for (var i=0; i<$scope.selectedSubValues.length; ++i) {
          if ($scope.selectedSubValues[i].valueString == subValueName)
            return true;
        }

        updateStrippedNotes();

        return !!hashedFeelings[subValueName.toLowerCase()];
      };

      $scope.setSelectedSubValue = function setSelectedSubValue(subValueName) {

        for (var i=0; i<$scope.moodHabit.habitSubValues.length; ++i) {

          var subValue = $scope.moodHabit.habitSubValues[i];

          if (subValue.valueString == subValueName) {

            var index = $scope.selectedSubValues.indexOf(subValue);

            if (index >= 0) {

              $scope.selectedSubValues.splice(index, 1);
            }
            else {
              $scope.selectedSubValues.push(subValue);
            }

            break;
          }
        }
      };

  		$scope.getMoodClass = function getMoodClass() {

				if (!$scope.initialized)
	  			return '';

  			var habitValue = $scope.moodHabit.habitValues[$scope.moodData.value-1].display;

  			habitValue = habitValue.replace(' ', '');

  			return habitValue;
  		};

	  	$scope.getMoodValue = function getMoodValue() {

	  		if (!$scope.initialized)
	  			return '';

				var habitValue = $scope.moodHabit.habitValues[$scope.moodData.value-1];

				return getMoodValueFromDisplay(habitValue.display);
	  	};

	  	$scope.getStressClass = function getStressClass() {

	  		if (!$scope.initialized || !$scope.stressHabit)
	  			return '';

	  		var stressValue = $scope.stressHabit.habitValues[$scope.stressData.value-1].display;

	  		stressValue = stressValue.replace(/ /g, '');

	  		return stressValue;
	  	};

	  	$scope.getStressValue = function getStressValue() {

	  		if (!$scope.initialized || !$scope.stressHabit)
	  			return '';

	  		var stressValue = $scope.stressHabit.habitValues[$scope.stressData.value-1];

	  		return getMoodValueFromDisplay(stressValue.display);
	  	};

	  	function getMoodValueFromDisplay(display) {

	  		var key = 'HABITS_VALUES_' + display;
				key = key.replace(/ /g, '_').toUpperCase();

				var text = $translate.instant(key);

        return text;
	  	}

	  	function getMoodSubValueDisplay(subValue) {

	  		var key = subValue.valueString.toUpperCase();

				// Only use the translated value if we got something different.
				var text = $translate.instant(key);
				if (text != key)
					return text;

				// It is likely a user-entered version.
				return subValue.valueString;
	  	}

	  	// this just uses the first sub-value in the "group"
      $scope.showSubValueSection = function showSubValueSection(subValueName) {

      	if (!$scope.initialized)
	  			return false;

        // if (!$scope.moodData.updated)
        //   return false;

        var ordinate = $scope.moodData.value-1;

        for (var i=0; i<$scope.moodHabit.habitSubValues.length; ++i) {

          var subValue = $scope.moodHabit.habitSubValues[i];

          if (subValue.valueString == subValueName) {

            return ordinate >= subValue.minHabitValueOrdinate &&
                   ordinate <= subValue.maxHabitValueOrdinate;
          }
        }
      };

      function saveActualMoodData(subValues) {

      	var valueIndex = $scope.moodData.value-1;

      	var subValueIds = [];
      	for (var i=0; i<subValues.length; ++i) {

      		subValueIds.push(subValues[i].id);
      	}

      	if ($scope.moodData.hasRecentData) {
      		HabitsService.updateHabitData($scope.moodHabit, $scope.moodData.data, valueIndex, subValueIds, new Date(), strippedNotes);

      		if ($scope.stressHabit)
      			HabitsService.updateHabitData($scope.stressHabit, scope.stressData.data, $scope.stressData.value-1, undefined, new Date(), undefined);

      	}
      	else {
      		HabitsService.recordHabitData($scope.moodHabit, valueIndex, subValueIds, new Date(), strippedNotes);

      		if ($scope.stressHabit)
      			HabitsService.recordHabitData($scope.stressHabit, $scope.stressData.value-1, undefined, new Date(), undefined);
      	}

      	$scope.savingMoodData = false;

      	$scope.clearActiveSection();
      }

      $scope.postMoodData = function postMoodData() {

      	$scope.savingMoodData = true;

      	resetStrippedNotes();
      	updateStrippedNotes();

      	var subValuesToSend = [];
      	var feelingsToCreate = [];

      	for (var feeling in hashedFeelings) {

      		var found = false;
      		for (var i=0; i<moodHabitSubValues.length; ++i) {

      			var subValue = moodHabitSubValues[i];

      			if (subValue.valueString.toLowerCase() == feeling) {
      				subValuesToSend.push(subValue);
      				found = true;
      				break;
      			}
      		}

      		if (!found) {
    				feelingsToCreate.push(feeling);
    			}
      	}

      	for (var k=0; k<$scope.selectedSubValues.length; ++k) {

      		var selectedSubValue = $scope.selectedSubValues[k];

      		var hasSubValue = false;

      		// Make sure it isn't selected
      		for (var j=0; j<subValuesToSend.length; ++j) {

      			var subValueToSend = subValuesToSend[j];

      			if (selectedSubValue.id == subValueToSend.id) {

      				hasSubValue = true;
      				break;
      			}
      		}

      		if (!hasSubValue)
						subValuesToSend.push(selectedSubValue);
      	}

      	if (feelingsToCreate.length > 0) {

	      	HabitsService.saveCustomFeelings(feelingsToCreate)
	      		.success(function(newSubValues) {

	      			for (var i=0; i<newSubValues.length; ++i) {

	      				subValuesToSend.push(newSubValues[i]);
	      			}

	      			saveActualMoodData(subValuesToSend);
	      		})
	      		.error(function() {

	      			window.alert($translate.instant('SAVE_CUSTOM_FEELING_ERROR'));
	      			$scope.savingMoodData = false;
	      		});
	      }
	      else {
	      	saveActualMoodData(subValuesToSend);
	      }

      };

      // Need the translations in order to initialize the input.
      function reinitializeController() {

      	if (!AccountService.isLoggedIn()) {

		  		$state.go('app.login');
		  		return;
		  	}

      	habits = HabitsService.getAccountHabits();

		  	$scope.moodHabit = habits[0];
		  	$scope.stressHabit = HabitsService.getAccountHabitById(HabitsService.STRESS_HABIT_ID);

		  	moodHabitValues = $scope.moodHabit.habitValues;
		  	moodHabitSubValues = $scope.moodHabit.habitSubValues;

      	if (inputor)
      		inputor.atwho('destroy');

      	updateRecentFeelings();

      	inputor = $('#moodNotes').atwho({
			    at: "#",
			    data: $scope.recentFeelingText,
			    insertTpl: "<strong>${atwho-at}${name}</strong>",
			    callbacks: {
			    	afterMatchFailed: function(at, el) {
		          // 32 is spacebar
		          if (at == '#') {

		          	var missed = el.text().trim().slice(1);

		          	// Good luck reading this. Basically reverse-engineered the atwho plugin to allow
		          	// me to insert things correctly.

		            var $li = this.$el.find(".cur");

		            var textToInsert = el.text().trim();

		            var tpl = this.view.context.getOpt('insertTpl');

		            var data = {'atwho-at': textToInsert, 'atwho-at-query': textToInsert, 'name': ''};
		            var something = this.view.context.callbacks("tplEval").call(this.view.context, tpl, data, "onInsert");

		            this.view.context.query.text = '';

		            this.insert( this.view.context.callbacks("beforeInsert").call(this.view.context, something, $li), { data: function() { return data; }});
		            return false;
		          }
		        }
			    }
				});

				$scope.initializeMoodData();

				$scope.initialized = true;
      }

		  if ($scope.isAppReady()) {
		  	reinitializeController();
		  }
		  else {

		  	$scope.$on('event:pacificaReady', reinitializeController);
		  }

	  }
  ]);
})();

(function() {

	var ctrl = angular.module('progressCtrl', []);

	var MIN = 0;
	var AVG = 1;
	var MAX = 2;

	var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

	var COMPLETED_BREATHING                 = 3;
	var COMPLETED_RETHINK                   = 4;
	var COMPLETED_EXPERIMENT                = 5;
	var COMPLETED_MUSCLE_RELAXATION         = 6;
	var COMPLETED_POSITIVE_VISUALIZATION    = 7;
	var COMPLETED_JOURNAL                   = 9;

	var recordingId = 0;

	function getThoughtType(thought) {

	  var thoughtType;
	  if (thought.thoughtType == 'TEXT_DISTORTIONS' || thought.thoughtType == 'AUDIO_DISTORTIONS')
		thoughtType = 'REFRAME';
	  else if (thought.thoughtType == 'AUDIO_JOURNAL' || thought.thoughtType == 'TEXT_JOURNAL')
		thoughtType = 'JOURNAL';
	  else
		thoughtType = thought.thoughtType;

	  thoughtType = thoughtType.toLowerCase();

	  return thoughtType;
	}

	function getUniqueDistortions(tagsToAnalyze) {

	  var ret = [];
	  for (var i=0; i<tagsToAnalyze.length; ++i) {

	    var tag = tagsToAnalyze[i];
	    var tagString = tag.tagString;

	    var constituents = tagString.split(/[,;]/);
	    for (var j=0; j<constituents.length; ++j) {

	      var constituent = constituents[j];
	      if (ret.indexOf(constituent) < 0) {
	        ret.push(constituent);
	      }
	    }
	  }

	  return ret;
	}

	function thoughtTypeToTemplateUrl(thoughtType) {
		return {
			'basic': 'templates/thoughts.review.generic.modal.html',
			'gratitude': 'templates/thoughts.review.generic.modal.html',
			'positivity': 'templates/thoughts.review.generic.modal.html',

			'beliefs': 'templates/thoughts.review.beliefs.modal.html',
			'blame': 'templates/thoughts.review.blame.modal.html',
			'evidence': 'templates/thoughts.review.evidence.modal.html',
			'journal': 'templates/thoughts.review.journal.modal.html',
			'traps': 'templates/thoughts.review.traps.modal.html',
			'reframe': 'templates/thoughts.review.reframe.modal.html'
		}[thoughtType];
	}

	var THOUGHT_ACTIVITIES = {
	  basic: {
		activityId: 40, // The activity ID corresponding to the database value.
		activityName: 'COMPLETED_ABC_THOUGHT_RECORD', // The activity name corresponding to the database value.
		thoughtType: 'BASIC', // The thought type, which mirrors the thought type on the server.
		name: 'THOUGHTS_ACTIVITY_BASIC', // Key for the name of the activity
		description: 'THOUGHTS_ACTIVITY_BASIC_DESC', // Key for the description of the activity, shown in the intro screen.
		completionTitle: 'THOUGHTS_ACTIVITY_BASIC_SUMMARY', // Key for the title of the completion screen for hte activity
		completionText: 'THOUGHTS_ACTIVITY_BASIC_COMPLETED', // Key for the completion text
		completionRoute: 'app.thought-completed',
		recordingOrder: ['event', 'thoughts', 'feelings'], // This is used for the completion screen.
		premium: false,
		options: [ // A set of options displayed on the modal when going into the activity.
		  {
			name: 'THE_CYCLE',
			value: 'cycle',
			show: true
		  },
		  {
			name: 'THE_CYCLE_AND_EVIDENCE',
			value: 'evidence',
			show: true
		  }
		],
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'event', // The type is the type of recording for the thought being addressed in the step.
			name: 'THE_EVENT', // This is used in the intro screen for each step as a main title, and in the activity itself as the header
			description: 'THE_EVENT_DESCRIPTION', // This is used in the intro screen as the description of the step
			byline: 'THE_EVENT_BYLINE', // This is the byline in the header for the activity
			example: 'THE_EVENT_EXAMPLE', // This is the placeholder in the text area for the step.
			route: 'app.generictextthoughts' // This is the route that corresponds to this step.
		  },
		  {
			type: 'thoughts',
			name: 'YOUR_THOUGHTS',
			description: 'YOUR_THOUGHTS_DESCRIPTION',
			byline: 'YOUR_THOUGHTS_BYLINE',
			example: 'YOUR_THOUGHTS_EXAMPLE',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'feelings',
			name: 'YOUR_FEELINGS',
			description: 'YOUR_FEELINGS_DESCRIPTION',
			byline: 'YOUR_FEELINGS_BYLINE',
			example: 'YOUR_FEELINGS_EXAMPLE',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'feelings', // Note that this step adds tags to the feeling recording.
			name: 'THE_EVIDENCE',
			description: 'THE_EVIDENCE_DESCRIPTION',
			byline: 'THE_EVIDENCE_BYLINE',
			forExample: 'THE_EVIDENCE_FOR_EXAMPLE',
			againstExample: 'THE_EVIDENCE_AGAINST_EXAMPLE',
			route: 'app.evidencetextthoughts'
		  }
		]
	  },
	  traps: {
		activityId: 41,
		activityName: 'COMPLETED_TRAPS_THOUGHT_RECORD',
		thoughtType: 'TRAPS',
		name: 'THOUGHTS_ACTIVITY_TRAPS',
		description: 'THOUGHTS_ACTIVITY_TRAPS_DESC',
		completionTitle: 'THOUGHTS_ACTIVITY_TRAPS_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_TRAPS_COMPLETED',
		completionRoute: 'app.traps-completed',
		recordingOrder: ['thought', 'pattern'],
		premium: false,
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'thought',
			name: 'THE_THOUGHT',
			description: 'THE_THOUGHT_DESCRIPTION',
			byline: 'THE_THOUGHT_BYLINE',
			example: 'THE_THOUGHT_EXAMPLE',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'thought',
			name: 'THE_THINKING_TRAP',
			description: 'THE_THINKING_TRAP_DESCRIPTION',
			byline: 'THE_THINKING_TRAP_BYLINE',
			example: 'THE_THINKING_TRAP_EXAMPLE',
			route: 'app.distortedtextthoughts',
			hints: {
			  // preference: 'viewed_distorted_text_thoughts_hints', // maybe?
			  keys: [
				'DISTORTED_TEXT_THOUGHT_HINT_ONE',
				'DISTORTED_TEXT_THOUGHT_HINT_TWO',
				'DISTORTED_TEXT_THOUGHT_HINT_THREE'
			  ]
			}
		  },
		  {
			type: 'pattern',
			name: 'THE_PATTERN',
			description: 'THE_PATTERN_DESCRIPTION',
			byline: 'THE_PATTERN_BYLINE',
			example: 'THE_PATTERN_EXAMPLE',
			route: 'app.distortedtextpatterns',
			recordingToAnalyze: 'thought' // We are actually responding to the thought recording by creating a pattern one.
		  }
		]
	  },
	  reframe: {
		activityId: 4,
		activityName: 'COMPLETED_RETHINK',
		thoughtType: 'REFRAME',
		name : 'THOUGHTS_ACTIVITY_REFRAME',
		description: 'THOUGHTS_ACTIVITY_REFRAME_DESC',
		completionTitle: 'THOUGHTS_ACTIVITY_REFRAME_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_REFRAME_COMPLETED',
		completionRoute: 'app.reframe-completed',
		recordingOrder: ['thought', 'analysis'],
		premium: false,
		options: [
		  {
			name: 'INPUT_OPTION_TEXT',
			value: 'text',
			show: true
		  },
		  {
			name: 'INPUT_OPTION_VOICE',
			value: 'voice',
			show: !ionic.Platform.isAndroid() || ( (+ionic.Platform.version()) > 5.0)
		  }
		],
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'thought',
			name: 'YOUR_THOUGHTS',
			description: 'YOUR_THOUGHTS_DESCRIPTION',
			byline: 'YOUR_THOUGHTS_BYLINE',
			example: 'YOUR_THOUGHTS_EXAMPLE',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'thought',
			name: 'THE_THINKING_TRAP',
			description: 'THE_THINKING_TRAP_DESCRIPTION',
			byline: 'THE_THINKING_TRAP_BYLINE',
			example: 'THE_THINKING_TRAP_EXAMPLE',
			route: 'app.distortedtextthoughts'
		  },
		  {
			type: 'analysis',
			name: 'REFRAME_THE_THOUGHT',
			description: 'REFRAME_THE_THOUGHT_DESCRIPTION',
			byline: 'REFRAME_THE_THOUGHT_BYLINE',
			example: 'REFRAME_THE_THOUGHT_EXAMPLE',
			route: 'app.textthoughts-rethink', // We are re-using the old one here.
			hints: {
			  // preference: 'viewed_distorted_text_thoughts_hints', // maybe?
			  keys: [
				'REFRAME_THOUGHT_HINT_ONE',
				'REFRAME_THOUGHT_HINT_TWO',
				'REFRAME_THOUGHT_HINT_THREE'
			  ]
			}
		  }
		]
	  },
	  positivity: {
		activityId: 33,
		activityName: 'COMPLETED_POSITIVITY_JOURNAL',
		thoughtType: 'POSITIVITY',
		name : 'THOUGHTS_ACTIVITY_POSITIVITY',
		description: 'THOUGHTS_POSITIVITY_DESCRIPTION',
		completionTitle: 'THOUGHTS_ACTIVITY_POSITIVITY_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_POSITIVITY_COMPLETED',
		completionRoute: 'app.thought-completed',
		recordingOrder: ['journal'],
		premium: true,
		options: [
		  {
			name: 'INPUT_OPTION_TEXT',
			value: 'text',
			show: true
		  },
		  {
			name: 'INPUT_OPTION_VOICE',
			value: 'voice',
			show: !ionic.Platform.isAndroid() || ( (+ionic.Platform.version()) > 5.0)
		  }
		],
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'journal',
			name: 'THOUGHTS_ACTIVITY_POSITIVITY',
			description: 'THOUGHTS_POSITIVITY_DESCRIPTION',
			byline: 'THOUGHTS_POSITIVITY_DESCRIPTION', // TODO fix these?
			example: 'POSITIVITY_TEXT_PLACEHOLDER',
			route: 'app.generictextthoughts'
		  }
		]
	  },
	  gratitude: {
		activityId: 32,
		activityName: 'COMPLETED_GRATITUDE_JOURNAL',
		thoughtType: 'GRATITUDE',
		name : 'THOUGHTS_ACTIVITY_GRATITUDE',
		description: 'THOUGHTS_GRATITUDE_DESCRIPTION',
		completionTitle: 'THOUGHTS_ACTIVITY_GRATITUDE_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_GRATITUDE_COMPLETED',
		completionRoute: 'app.thought-completed',
		recordingOrder: ['journal'],
		premium: true,
		options: [
		  {
			name: 'INPUT_OPTION_TEXT',
			value: 'text',
			show: true
		  },
		  {
			name: 'INPUT_OPTION_VOICE',
			value: 'voice',
			show: !ionic.Platform.isAndroid() || ( (+ionic.Platform.version()) > 5.0)
		  }
		],
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'journal',
			name: 'JOURNAL_GRATITUDE_HEADER',
			description: 'THOUGHTS_GRATITUDE_DESCRIPTION',
			byline: 'THOUGHTS_GRATITUDE_DESCRIPTION', // TODO fix these?
			example: 'GRATITUDE_TEXT_PLACEHOLDER',
			route: 'app.generictextthoughts'
		  }
		]
	  },
	  journal: {
		activityId: 9,
		activityName: 'COMPLETED_JOURNAL',
		thoughtType: 'JOURNAL',
		name : 'THOUGHTS_ACTIVITY_JOURNAL',
		description: 'THOUGHTS_JOURNAL_HEADER',
		completionTitle: 'THOUGHTS_ACTIVITY_JOURNAL_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_JOURNAL_COMPLETED',
		completionRoute: 'app.thought-completed',
		recordingOrder: ['journal'],
		premium: true,
		options: [
		  {
			name: 'INPUT_OPTION_TEXT',
			value: 'text',
			show: true
		  },
		  {
			name: 'INPUT_OPTION_VOICE',
			value: 'voice',
			show: !ionic.Platform.isAndroid() || ( (+ionic.Platform.version()) > 5.0)
		  }
		],
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'journal',
			name: 'THOUGHTS_ACTIVITY_JOURNAL',
			description: 'THOUGHTS_JOURNAL_HEADER',
			byline: 'THOUGHTS_JOURNAL_HEADER', // TODO fix these?
			example: 'GRATITUDE_TEXT_PLACEHOLDER',
			route: 'app.generictextthoughts'
		  }
		]
	  },
	  'blame': {
		activityId: 42,
		activityName: 'COMPLETED_BLAME_THOUGHT_RECORD',
		thoughtType: 'BLAME',
		name : 'THOUGHTS_ACTIVITY_BLAME',
		description: 'THOUGHTS_ACTIVITY_BLAME_DESC',
		completionTitle: 'THOUGHTS_ACTIVITY_BLAME_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_BLAME_COMPLETED',
		completionRoute: 'app.contributingfactorscomplete',
		recordingOrder: ['event'],
		premium: true,
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'event',
			name: 'EVENT_AND_OUTCOME',
			description: 'EVENT_AND_OUTCOME_DESCRIPTION',
			byline: 'EVENT_AND_OUTCOME_BYLINE',
			example: 'EVENT_AND_OUTCOME_PLACEHOLDER',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'event',
			name: 'CONTRIBUTING_FACTORS',
			description: 'CONTRIBUTING_FACTORS_DESCRIPTION',
			byline: 'CONTRIBUTING_FACTORS_BYLINE',
			example: 'CONTRIBUTING_FACTORS_PLACEHOLDER',
			route: 'app.contributingfactorstextthoughts',
			hints: {
			  // preference: 'viewed_distorted_text_thoughts_hints', // maybe?
			  keys: [
				'BLAME_TEXT_THOUGHT_HINT_ONE',
				'BLAME_TEXT_THOUGHT_HINT_TWO',
				'BLAME_TEXT_THOUGHT_HINT_THREE'
			  ]
			}
		  }
		]
	  },
	  'evidence': {
		activityId: 43,
		activityName: 'COMPLETED_EVIDENCE_THOUGHT_RECORD',
		thoughtType: 'EVIDENCE',
		name : 'THOUGHTS_ACTIVITY_EVIDENCE',
		description: 'THE_THOUGHT_EVIDENCE_DESCRIPTION',
		completionTitle: 'THOUGHTS_ACTIVITY_EVIDENCE_SUMMARY',
		completionText: 'THOUGHTS_ACTIVITY_EVIDENCE_COMPLETED',
		completionRoute: 'app.evidence-completed',
		recordingOrder: ['thought'],
		premium: true,
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'thought',
			name: 'THE_THOUGHT',
			description: 'THE_THOUGHT_DESCRIPTION',
			byline: 'THE_THOUGHT_EVIDENCE_DESCRIPTION',
			example: 'THE_THOUGHT_EVIDENCE_EXAMPLE',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'thought',
			name: 'THE_EVIDENCE',
			description: 'THE_EVIDENCE_EVIDENCE_DESCRIPTION',
			route: 'app.evidencequestions'
		  }
		]
	  },
	  'beliefs': {
		activityId: 44,
		activityName: 'COMPLETED_BELIEFS_THOUGHT_RECORD',
		thoughtType: 'BELIEFS',
		name : 'THOUGHTS_ACTIVITY_BELIEFS',
		description: 'THOUGHTS_ACTIVITY_BELIEFS_DESC',
		completionTitle: 'THOUGHTS_ACTIVITY_BELIEFS_SUMMARY',
		completionText: 'TTHOUGHTS_ACTIVITY_BELIEFS_COMPLETED',
		completionRoute: 'app.beliefs-completed',
		recordingOrder: ['thought', 'evidence'],
		premium: true,
		steps: [ // We could potentially add the view name to each of these.
		  {
			type: 'thought',
			name: 'YOUR_THOUGHTS',
			description: 'THE_THOUGHT_BELIEF_DESCRIPTION',
			byline: 'THE_THOUGHT_BELIEF_BYLINE',
			example: 'THE_THOUGHT_BELIEF_EXAMPLE',
			route: 'app.generictextthoughts'
		  },
		  {
			type: 'thought',
			name: 'DRILL_DOWN',
			description: 'CORE_BELIEF_DESCRIPTION',
			byline: 'CORE_BELIEF_BYLINE',
			route: 'app.corebeliefstextthoughts',
			hints: {
			  // preference: 'viewed_distorted_text_thoughts_hints', // maybe?
			  keys: [
				'CORE_BELIEFS_TEXT_THOUGHT_HINT_ONE',
				'CORE_BELIEFS_TEXT_THOUGHT_HINT_TWO',
				'CORE_BELIEFS_TEXT_THOUGHT_HINT_THREE'
			  ]
			}
		  },
		  {
			type: 'evidence',
			name: 'EVIDENCE_FOR_BELIEF',
			description: 'EVIDENCE_FOR_BELIEF_DESCRIPTION',
			byline: 'EVIDENCE_FOR_BELIEF_BYLINE',
			forExample: 'THE_EVIDENCE_FOR_EXAMPLE',
			againstExample: 'THE_EVIDENCE_AGAINST_EXAMPLE',
			route: 'app.corebeliefevidence'
		  }
		]
	  }
	};

	function getActivityByName(activityName) {

	  return THOUGHT_ACTIVITIES[activityName];
	}

	function getRecordingTagDisplay($translate, tagStrings, tagTypeString) {

		var result = '';

		if (tagStrings.indexOf('catastrophizing') >= 0) {
			result += $translate.instant('THOUGHTS_EMOTIONS_CATASTROPHIZING');
		}

		if (tagStrings.indexOf('emotional_reasoning') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_EMOTIONAL_REASONING');
		}

		if (tagStrings.indexOf('mind_reading') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_MIND_READING');
		}

		if (tagStrings.indexOf('fortune_telling') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_FORTUNE_TELLING');
		}

		if (tagStrings.indexOf('extreme_words') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_PRESSURIZED');
		}

		if (tagStrings.indexOf('judging') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_LABELLING');
		}

		if (tagStrings.indexOf('personalization') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_PERSONALIZATION');
		}

		if (tagStrings.indexOf('overgeneralizing') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_GENERALIZING');
		}

		if (tagStrings.indexOf('negative_filtering') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_NEGATIVE');
		}

		if (tagStrings.indexOf('notsure') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('NEGATIVE_THOUGHT');
		}



		if (result.length === 0) {

			if (tagTypeString == 'negative')
				result = $translate.instant('NEGATIVE_THOUGHT');
			else
				result = $translate.instant('POSITIVE_THOUGHT');
		}

		return result;
	}

	ctrl.controller('ProgressCtrl', ['$sce', '$scope', '$rootScope', '$controller', '$state', '$http', '$timeout', '$translate', '$ionicModal','$ionicPopup', '$ionicHistory', 'HabitsService', 'GoalsService', 'AudioService', 'AccountService', 'GeneralService', '$stateParams','PractitionerService', 'Environment', 'ActivityService', 'OverlayService',
		function ($sce, $scope, $rootScope, $controller, $state, $http, $timeout, $translate, $ionicModal, $ionicPopup, $ionicHistory, HabitsService, GoalsService, AudioService, AccountService, GeneralService, $stateParams, PractitionerService, Environment, ActivityService, OverlayService) {

		$scope.mediaRec = undefined;
		$scope.recording = false;
		$scope.elapsedTime = 0.0;
		$scope.src = undefined;

		$scope.maxTime = $stateParams.maxTime;
		if (!$scope.maxTime)
		  $scope.maxTime = 300;

		// The Record and Analyze states are nearly identical, so we just pass in
		// some data to define how they operate.

		// $scope.audioPrefix = $state.current.data.audioPrefix;
		$scope.audioPrefix = "journal";

		// $scope.nextState = $state.current.data.nextState;
		$scope.nextState = "app.home";

		// $scope.helpState = $state.current.data.helpState;
		// $scope.clearRethinkState = $state.current.data.clearRethinkState;


		// Thought ID should be here in two instances: you have come back to the
		// initial step after recording once, or you are on the last step.
		var thoughtId = AudioService.getActiveThoughtId();
		if (thoughtId)
		  $scope.thoughtId = thoughtId;

		$scope.getThoughtsRecordHeader = function getThoughtsRecordHeader() {

		  return $translate.instant('THOUGHTS_RECORD_HEADER');
		};

    $scope.getClientName = function getClientName() {
      if ($scope.otherUser) {
        return $scope.otherUser.account.firstName + ' ' + $scope.otherUser.account.lastName;
      }
    };

			$scope.otherUser = undefined;

			// For re-initialization.
			var retrievedContext = null;

			// TODO This may need to come from the context
			$scope.accountHabits = [];
			$scope.accountHabitsById = [];
			$scope.accountHabitValues = [];
			$scope.accountHabitSubValues = [];

			$scope.accountSubGoals = undefined;
			$scope.accountThoughts = undefined;

			$scope.showingMood = true;

			$scope.mode = 'week'; // day, week, or month

			$scope.pdfData = {
				name: ''
			};

			var startDate;
			var endDate;

			var activeDate = new Date();
			activeDate.setHours(0,0,0,0);

			function resetData() {
				$scope.dailyData = {};
				$scope.weeklyData = {};
				$scope.monthlyData = {};
				$scope.allData = {};
			}

			resetData();

			$scope.showingNotes = {};
			$scope.activeHighlightDay = undefined;

			var canvasScale = window.devicePixelRatio ? window.devicePixelRatio : 1;

	$scope.closeDownloadModal = function closeDownloadModal() {
		OverlayService.modal.close($scope.downloadModal).then(function(modal) {
		  $scope.downloadModal = modal;
		});
	};

	  $scope.showDownloadModal = function showDownloadModal() {
	  	OverlayService.modal.open({
	  	  modalId: 'DownloadModal',
	  	  templateUrl: 'templates/download.modal.html',
	  	  scope: $scope,
	  	  animation: 'slide-in-up',
	  	  ignoreStatusBar: false,
	  	  recordAppseeEvent: false
	  	}).then(function(modal) {
	  		$scope.downloadModal = modal;
	  	});
	  };

			$scope.downloadCSV = function downloadCSV(type) {

				var url;
				if (type === 'all') {
					url = '/app/activity/csv/alldata.zip';
				} else {
					url = '/app/activity/csv/' + type + '.csv?startMS=' + getModeStartDate().getTime() + '&endMS=' + getModeEndDate().getTime();
					if ($scope.viewingOtherUser)
						url += '&clientId=' + $scope.otherUserAccountId;
				}

				window.open(url);
			};

			$scope.downloadPDF = function downloadPDF() {

				var reportWeek = $("input[name='reportWeek']:checked").val();

				var url = '/app/activity/pdf?name=' + $scope.pdfData.name + '&week=' + reportWeek;

				if ($scope.viewingOtherUser)
					url += '&clientId=' + $scope.otherUserAccountId;

				window.open(url);
			};

			$scope.toggleMood = function toggleMood() {

				$scope.showingMood = !$scope.showingMood;

				updatePieChart();
				updateGraph();
			};

			$scope.isShowingMood = function isShowingMood() {

				return $scope.showingMood;
			};

			$scope.filterMoodAndStress = function filterMoodAndStress(habit) {
				return habit.id != 1 &&
					habit.id != 19;
			};

			function updateAccountHabits(accountHabits) {

				$scope.accountHabits = accountHabits;

				$scope.hasHabits = false;

				for (var i=0; i<accountHabits.length; ++i) {

					var accountHabit = accountHabits[i];

					if ($scope.filterMoodAndStress(accountHabit))
						$scope.hasHabits = true;

					// hmm, custom habits with ids will create huge arrays here I think
					$scope.accountHabitsById[accountHabit.id] = accountHabit;

					for (var j=0; j<accountHabit.habitValues.length; ++j) {

						var habitValue = accountHabit.habitValues[j];
						$scope.accountHabitValues[habitValue.id] = habitValue;
					}

					updateAccountHabitSubValues(accountHabit.habitSubValues);
				}
			}

			function getAccountHabitById(habitId) {

				return $scope.accountHabitsById[habitId];
			}

			function getHabitValueById(habitValueId) {

				return $scope.accountHabitValues[habitValueId];
			}

			function updateAccountHabitSubValues(habitSubValues) {

				if (habitSubValues) {

					for (var i=0; i<habitSubValues.length; ++i) {

						var habitSubValue = habitSubValues[i];

						$scope.accountHabitSubValues[habitSubValue.id] = habitSubValue;
					}
				}
			}

			function updateAccountSubGoals(subGoals) {

				$scope.accountSubGoals = subGoals;
			}

			function updateAccountThoughts(thoughts) {

				$scope.accountThoughts = thoughts;
			}

			function getMoveDate(forwards) {

				var multiplier = forwards ? 1 : -1;

				if ($scope.isModeActive('day')) {

					return activeDate.addDays(multiplier * 1);
				}
				else if ($scope.isModeActive('week')) {

					var nextDate = activeDate.addDays(multiplier * 7);

					// Subtract the day of the week to get to the Sunday. We need to do this
					// because just adding 7 could skip past the current date, which lends
					// to not being able to move forward correctly.
					if (forwards)
						nextDate.setDate(nextDate.getDate() - nextDate.getDay());
					else {
						var nextDay = nextDate.getDay();

						// In this case, we move to the previous Saturday since it will be in the previous week.
						nextDate.setDate(nextDate.getDate() + (6-nextDay));
					}

					return nextDate;
				}
				else {

					var newDate = new Date(activeDate);
					newDate.setMonth(newDate.getMonth() + multiplier);

					return newDate;
				}
			}

			function getUser() {
				if ($scope.viewingOtherUser) {
					if ($scope.otherUser) {
						if (AccountService.isPractitioner() && (AccountService.isPremiumEnabled() || ($scope.otherUser.account.id == AccountService.getAccountUser().user.id) || $scope.otherUser.account.premium)) {

							if ($scope.otherUser.account.id == AccountService.getAccountUser().account.id) {

								AccountService.setUserPreference('practitioner_completed_onboarding', true);
							}

							// need to consider authorization here
							return $scope.otherUser;
					  }
					}
				} else {
					return AccountService.getAccountUser();
				}
			}

			function canMove(forwards) {

				var user = getUser();

				if (!user) return false;

				var userCreatedAt;
				if (user.user) {
				    userCreatedAt = new Date(user.user.createdAt);
                } else if (user.account) {
				    userCreatedAt = new Date(user.account.createdAt);
                } else {
                    return false;
                }
				userCreatedAt.setHours(0,0,0,0);
				// We need to check both the start and end date.
				var nextDate = getMoveDate(forwards);
				var endDate;
				if ($scope.mode == 'day') {
					endDate = nextDate.addDays(1);
				}
				else if ($scope.mode == 'week') {
					nextDate = getWeekStart(nextDate);
					endDate = nextDate.addDays(7);
				}
				else {
					nextDate = getMonthStart(nextDate);
					endDate = new Date(nextDate);
					endDate.setMonth(endDate.getMonth()+1);
				}


				var ret = (nextDate < new Date()) && ((nextDate >= userCreatedAt) || (userCreatedAt <= endDate));
				return ret;
			}

			$scope.getDayAbbreviation = function getDayAbbreviation(day) {

				var date = new Date();
				date.setDate(date.getDate() - date.getDay() + day);

				return moment(date).format('ddd');
			};

			$scope.getDaysBeforeFirstOfMonth = function() {

				var ret = [];

				var weekDay = getModeStartDate().getDay();

				for (var i=0; i<weekDay; ++i) {
					ret.push(i+1); // The value in this doesn't matter, it's just allowing us to skip.
				}
				return ret;
			};

			$scope.getDaysInMonth = function() {

				var ret = [];
				var index = 0;

				var modeStartDate = getModeStartDate();
				var modeEndDate = getModeEndDate();

				while (modeStartDate < modeEndDate) {

					ret.push(++index);

					modeStartDate.setDate(modeStartDate.getDate() + 1);
				}

				return ret;
			};

			$scope.isDayAvailable = function isDayAvailable(day) {
				var dateCreated;
				var currentUser = getUser();

				if (currentUser) {
					if($scope.otherUser){
						dateCreated = currentUser.createdAt;
					} else if(currentUser.user){
						dateCreated = currentUser.user.createdAt;
					} else {
						return false;
					}
					// days are indexed at 1 for display
					day -= 1;

					var dayDate = getModeStartDate();
					if (day > 0)
						dayDate.setDate(dayDate.getDate() + day);

					var userDate = new Date(dateCreated);
					userDate.setHours(0,0,0,0);

					if (! ((dayDate >= userDate) && (dayDate < new Date())) ) {

						return $scope.hasMoodRating(day+1); // We already subtracted 1
					}
					else {

						return true;
					}
				}

				return false;
			};

			$scope.goToDay = function goToDay(day) {

				if ($scope.isDayAvailable(day)) {

					var dayDate = getModeStartDate();
					day -= 1;
					if (day > 0)
						dayDate.setDate(dayDate.getDate() + day);

					activeDate = dayDate;

					$scope.setMode('day');
				}
			};

			$scope.setActiveHighlightDay = function setActiveHighlightDay(day) {


				if ($scope.isDayAvailable(day)) {
					$scope.activeHighlightDay = day;
				}
				else {
					$scope.activeHighlightDay = undefined;
				}
			};

			$scope.isDayInFuture = function isDayInFuture(day) {

				// days are indexed at 1 for display
				day -= 1;

				var dayDate = getModeStartDate();
				if (day > 0)
					dayDate.setDate(dayDate.getDate() + day);

				return dayDate > new Date();
			};

			$scope.hasMoodRating = function hasMoodRating(day) {

				// days are indexed at 1 for display
				day -= 1;

				var dayDate = getModeStartDate();
				if (day > 0)
					dayDate.setDate(dayDate.getDate() + day);

				// Note we use the daily data here to get the average for the day.

				var type = ($scope.isShowingMood() || forceMood) ? 1 : 19;

				var habitDaysData = getHabitDaysData($scope.dailyData, dayDate, type);

				return !!habitDaysData;
			};

			$scope.getDayMoodClass = function getDayMoodClass(day, forceMood) {

				// days are indexed at 1 for display
				day -= 1;

				var dayDate = getModeStartDate();
				if (day > 0)
					dayDate.setDate(dayDate.getDate() + day);

				// Note we use the daily data here to get the average for the day.

				var type = ($scope.isShowingMood() || forceMood) ? 1 : 19;

				var habitDaysData = getHabitDaysData($scope.dailyData, dayDate, type);

				if (habitDaysData) {

					return ($scope.isShowingMood() || forceMood) ?
						getMoodClass(habitDaysData) :
						getStressClass(habitDaysData);
				}

				return '';
			};

			$scope.getModeHabitsClass = function getModeHabitsClass() {

				var modeStartDate = getModeStartDate();

				var day = GeneralService.getDayString(modeStartDate);

				var struct = getModeStructure();

				var daysData = struct[day];

				if (daysData) {

					var completed = daysData.completedHabits;
					var total = daysData.numHabits;

					if ((typeof completed != 'undefined') && (typeof total != 'undefined'))
						return getHabitClass(completed, total);
				}
			};

			function getHabitClass(completedHabits, totalHabits) {

				var percentage = (completedHabits * 100) / totalHabits;
				// check isNaN for divide by 0
				if (isNaN(percentage) || percentage === 0) {
					return 'zero';
				}
				else if (percentage <= 25) {
					return 'one';
				}
				else if (percentage <= 44) {
					return 'two';
				}
				else if (percentage <= 55) {
					return 'three';
				}
				else if (percentage <= 74) {
					return 'four';
				}
				else if (percentage <= 99) {
					return 'five';
				}
				else {
					return 'six';
				}
			}

			$scope.getDayHabitClass = function getDayHabitClass(day) {

				// days are indexed at 1 for display
				day -= 1;

				var dayDate = getModeStartDate();
				if (day > 0)
					dayDate.setDate(dayDate.getDate() + day);

				var dayIndex = GeneralService.getDayString(dayDate);
				var daysData = $scope.dailyData[dayIndex];

				if (daysData) {

					var completed = daysData.completedHabits;
					var total = daysData.numHabits;

					if ((typeof completed != 'undefined') && (typeof total != 'undefined'))
						return getHabitClass(completed, total);
				}

				return 'zero';
			};

			$scope.getDayActivityDisplay = function getDayActivityDisplay(day) {

				// days are indexed at 1 for display
				day -= 1;

				var dayDate = getModeStartDate();
				if (day > 0)
					dayDate.setDate(dayDate.getDate() + day);

				var dayIndex = GeneralService.getDayString(dayDate);
				var daysData = $scope.dailyData[dayIndex];

				var count = 0;
				if (daysData) {

					count =
						daysData.activities.relax.length +
						daysData.activities.thoughts.length |
						daysData.activities.goals.length;
				}

				return (count > 0) ? count + 'X' : '0';
			};

			$scope.getDayActivityClass = function getDayActivityClass(day) {
				return ($scope.getDayActivityDisplay(day) != '0') ? 'active' : '';
			};

			$scope.moveBackwards = function moveBackwards() {

				activeDate = getMoveDate(false);
				updateGraph();

				if (activeDate < startDate) {

					// We're going to go back another month.
					queryForData(getMonthStart(activeDate));
				}
			};

			$scope.canMoveBackwards = function canMoveBackwards() {

				return canMove(false);
			};

			$scope.moveForwards = function moveForwards() {

				activeDate = getMoveDate(true);
				updateGraph();
			};

			$scope.canMoveForwards = function canMoveForwards() {

				return canMove(true);
			};

			$scope.setMode = function setMode(mode) {

				$scope.mode = mode;

				$timeout(updateGraph);
			};

			$scope.isModeActive = function isModeActive(mode) {

				return $scope.mode == mode;
			};

			$scope.getAllDateDisplay = function() {
				var user = AccountService.getAccountUser();
				return moment(user.user.createdAt).format('LL') + ' - ' + moment(moment.now()).format('LL');
			};

			$scope.getActiveDateDisplay = function getActiveDateDisplay() {

				if ($scope.isModeActive('day')) {

					return moment(activeDate).format('LL');
				}
				else if ($scope.isModeActive('week')) {

					var weekStart = getWeekStart(activeDate);
					weekEnd = weekStart.addDays(6);

					return moment(weekStart).format('LL') + ' - ' + moment(weekEnd).format('LL');
				}
				else {

					return moment(activeDate).format('MMMM YYYY');
				}
			};

			function getModeStructure() {

				if ($scope.mode == 'day')
					return $scope.dailyData;
				else if ($scope.mode == 'week')
					return $scope.weeklyData;
				else
					return $scope.monthlyData;
			}

			function getModeStartDate() {

				if ($scope.mode == 'day')
					return new Date(activeDate);
				else if ($scope.mode == 'week')
					return getWeekStart(activeDate);
				else
					return getMonthStart(activeDate);
			}

			function getModeEndDate() {

				var modeStartDate = getModeStartDate();

				if ($scope.mode == 'day')
					return modeStartDate.addDays(1);
				else if ($scope.mode == 'week')
					return modeStartDate.addDays(7);
				else {

					var modeEndDate = new Date(modeStartDate);
					modeEndDate.setMonth(modeStartDate.getMonth()+1);

					return modeEndDate;
				}
			}

			$scope.getHabitSubValueDisplayById =  function getHabitSubValueDisplayById(id) {

				var habitSubValue = $scope.accountHabitSubValues[id];

				if (habitSubValue) {

					var valueString = habitSubValue.valueString;

					if (valueString) {
						var translatedVal = $translate.instant(valueString.toUpperCase());

						// There was no translation, so return the original.
						if (translatedVal == valueString.toUpperCase()) {
							return capitalizeFirstLetter(valueString);
						}
						else {

							return translatedVal;
						}
					}
				}
			};

			// This is for the mood rating in the view.
			$scope.getRatingDisplay = function getRatingDisplay(rating) {

				return getValueFromDisplay(rating.valueString);
			};

			$scope.getRatingDateDisplay = function getRatingDateDisplay(rating) {

				var moodDate = new Date(rating.experiencedAtStr);

				return moment(moodDate).calendar();
			};

			$scope.getActivityDisplay = function getActivityDisplay(userActivity) {

				var activity = ActivityService.getActivityById(userActivity.activityId);

				if (activity) {

					return ActivityService.getDisplayForActivity(activity.name);
				}
			};

			$scope.getActivityDateDisplay = function getActivityDateDisplay(userActivity) {

				var activityDate = new Date(userActivity.recordedAtString);

				return moment(activityDate).calendar();
			};

			function getMoodValue(moodHabit, ordinate) { //XXX Note this is an ordinate, not the value

				var habitValue = moodHabit.habitValues[ordinate];

				return getValueFromDisplay(habitValue.display);
			}

			function getStressValue(stressHabit, ordinate) {

				if (!stressHabit)
					return;

				var habitValue = stressHabit.habitValues[ordinate];

				return getValueFromDisplay(habitValue.display);
			}

			function getValueFromDisplay(display) {

				var key = 'HABITS_VALUES_' + display;
				key = key.replace(/ /g, '_').toUpperCase();

				var text = $translate.instant(key);

				return text;
			}

			function getModeValueDisplay(habitId, valType) {

				var struct = getModeStructure();

				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), habitId);

				if (habitDaysData) {

					var habit = habitDaysData.habit;

					var val;
					if (valType == MIN)
						val = habitDaysData.minOrdinate;
					else if (valType == AVG)
						val = Math.round(habitDaysData.averageOrdinate);
					else
						val = habitDaysData.maxOrdinate;

					if (habitId == 1)
						return getMoodValue(habit, val);
					else if (habitId == 19)
						return getStressValue(habit, val);
					else
						return HabitsService.getHabitDisplay(habit, val);
				}

				return '?';
			}

			$scope.getModeMinimumDay = function getModeMinimumDay(habitId) {

				var struct = getModeStructure();

				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), habitId);

				if (habitDaysData) {

					// Mood is technically minimized, but apparently not set that way in the database.
					var minDate = (habitDaysData.habit.goalMinimized || habitDaysData.habit.id == 1) ?
						habitDaysData.maxDate : habitDaysData.minDate;

					return moment(minDate).format('dddd');
				}

				return '?';
			};

			$scope.getModeMaximumDay = function getModeMaximumDay(habitId) {

				var struct = getModeStructure();

				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), habitId);

				if (habitDaysData) {

					// Mood is technically minimized, but apparently not set that way in the database.
					var maxDate = (habitDaysData.habit.goalMinimized || habitDaysData.habit.id == 1) ?
						habitDaysData.minDate : habitDaysData.maxDate;

					return moment(maxDate).format('dddd');
				}

				return '?';
			};

			$scope.getModeAverage = function getModeAverage(habitId) {

				return getModeValueDisplay(habitId, AVG);
			};

			function getMoodClass(habitDaysData) {

				var val = Math.round(habitDaysData.averageOrdinate);
				var habitValue = habitDaysData.habit.habitValues[val];

				// expects a habitData but habitValue also has the valueInt.
				return HabitsService.getMoodClass(habitValue);
			}

			function getStressClass(habitDaysData) {

				var val = Math.round(habitDaysData.averageOrdinate);
				var habitValue = habitDaysData.habit.habitValues[val];

				// expects a habitData but habitValue also has the valueInt.
				return HabitsService.getStressClass(habitValue);
			}

			$scope.getModeMoodClass = function getModeMoodClass() {

				var struct = getModeStructure();

				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), 1);

				if (habitDaysData) {

					return getMoodClass(habitDaysData);
				}

				return '';
			};

			$scope.getModeStressClass = function getModeStressClass() {

				var struct = getModeStructure();

				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), 19);

				if (habitDaysData) {

					return getStressClass(habitDaysData);
				}

				return '';
			};

			$scope.getModeMinimum = function getModeMinimum(habitId) {

				return getModeValueDisplay(habitId, MIN);
			};

			$scope.getModeMaximum = function getModeMaximum(habitId) {

				return getModeValueDisplay(habitId, MAX);
			};

			// For the habits, and for daily, this assumes a single return value.
			$scope.getDailyHabitValue = function getDailyHabitValue(habitId) {

				var habitDaysData = getHabitDaysData($scope.dailyData, getModeStartDate(), habitId);

				if (habitDaysData && habitDaysData.values && habitDaysData.values.length > 0) {

					var val = habitDaysData.values[0];

					var habitValue = getHabitValueById(val.habitValueId);

					return HabitsService.getHabitDisplayFromValue(getAccountHabitById(habitId), habitValue);
				}
			};

			$scope.getModeActivities = function getModeActivities(activity) {

				var struct = getModeStructure();
				var activityDaysData = getActivityDaysData(struct, getModeStartDate(), activity);

				return activityDaysData;
			};

			$scope.getModeActivityCount = function getModeActivityCount(activity) {

				var struct = getModeStructure();
				var activityDaysData = getActivityDaysData(struct, getModeStartDate(), activity);

				if (activityDaysData)
					return activityDaysData.length + 'X';

				return '0X';
			};

			$scope.getModeHabits = function getModeHabits(habitId) {

				var struct = getModeStructure();
				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), habitId);

				return habitDaysData ? habitDaysData.values : [];
			};

			$scope.getModeGoals = function getModeGoals() {

				var struct = getModeStructure();

				var day = GeneralService.getDayString(getModeStartDate());

				var daysData = struct[day];

				return daysData ? daysData.goals : [];
			};

			$scope.getModeThoughts = function getModeThoughts() {

				var struct = getModeStructure();

				var day = GeneralService.getDayString(getModeStartDate());

				var daysData = struct[day];

				return daysData ? daysData.thoughts : [];
			};

			// start: thoughtCtrl code

			function getStep(recordingType) {
				for (var i=0; i<$scope.activity.steps.length; ++i) {
					var step = $scope.activity.steps[i];
				 	if (step.type == recordingType)
						return step;
				}
			  }

			  $scope.getThoughtRecordingExtension = function(thought) {
			  	if (thought !== undefined && thought.recordings !== undefined) {
			  		var title = _.get(thought,'recordings.thought.title') || _.get(thought, 'recordings.journal.title');
			  		var splitTitle = title.split('.');
			  		return splitTitle[splitTitle.length - 1];
			  	}
			  	return '';
			  };

			  $scope.canShowMore = function(thought) {
			  	var hasNoAudio = !$scope.containsAudio(thought);
			  	var hasUnplayableAudio = $scope.hasUnplayableAudio(thought);
			  	if (hasUnplayableAudio || hasNoAudio) return true;
			  };

			  $scope.hasUnplayableAudio = function(thought) {
			  	return ($scope.containsAudio(thought) && ($scope.getThoughtRecordingExtension(thought) != 'm4a') );
			  };

			  $scope.handleThoughtReviewRequest = function(thought) {
			  	var shouldShowThought = $scope.canShowMore(thought) && !$scope.hasUnplayableAudio(thought);
			  	var shouldShowAudioFormatError = $scope.hasUnplayableAudio(thought);
			  	if (shouldShowThought) {
			  		$scope.viewThought(thought);
			  	} else if (shouldShowAudioFormatError) {

			  		OverlayService.modal.open({
			  		  modalId: 'ReviewAudioModal',
			  		  templateUrl: 'templates/thoughts.review.audio.modal.html',
			  		  scope: $scope,
			  		  animation: 'slide-in-up',
			  		  ignoreStatusBar: false,
			  		  recordAppseeEvent: false
			  		}).then(function(modal) {
			  			$scope.modal = modal;
			  		});
			  	}
			  };

			  $scope.containsAudio = function(thought) {
			    if (thought.thoughtType == 'AUDIO_JOURNAL' || thought.thoughtType == 'AUDIO_DISTORTIONS')
			    	return true;
			    return false;
			  };

			  $scope.getThoughtName = function getThoughtName() {
				return $scope.thought.title;
			  };

			  $scope.getThoughtType = function getThoughtType() {
				return $scope.thoughtType;
			  };

			  $scope.getCompletionTitle = function getCompletionTitle() {
				return $translate.instant($scope.activity.completionTitle);
			  };

			  $scope.getRecordingOrder = function getRecordingOrder() {
				return $scope.activity.recordingOrder;
			  };

			  $scope.getRecordingTitle = function getRecordingTitle(recordingType) {

				var step = getStep(recordingType);

				return $translate.instant(step.name);
			  };

			  $scope.getRecordingText = function getRecordingText(recordingType) {
				var recording = $scope.thought.recordings[recordingType];

				return recording.notes;
			  };

			  $scope.getRecordingTagByType = function getRecordingTagByType(recordingType, tagTypeString) {

				var recording = $scope.thought.recordings[recordingType];

				if (recording.tags) {

				  for (var i=0; i<recording.tags.length; ++i) {

					var tag = recording.tags[i];
					if (tag.tagTypeString == tagTypeString)
					  return tag;
				  }
				}
			  };

			  $scope.getDistortionTagString = function getDistortionTagString(recordingType, tagTypeString) {

				var recording = $scope.thought.recordings[recordingType];

				if (recording.tags) {

				  for (var i=0; i<recording.tags.length; ++i) {

					var tag = recording.tags[i];
					if (tag.tagTypeString == tagTypeString)
					  return getRecordingTagDisplay($translate, tag.tagString, tag.tagTypeString);
				  }
				}
			  };

			  $scope.getRecordingTagByIndex = function getRecordingTagByIndex(recordingType, index) {

				var recordings = $scope.thought.recordings[recordingType];
				var tags = recordings.tags;

				return tags[index];
			  };

			  $scope.getUniqueTagDistortions = function getUniqueTagDistortions(recordingType) {

				var ret = getUniqueDistortions($scope.thought.recordings[recordingType].tags);

				if (ret) {
				  for (var i=0; i<ret.length; ++i) {

					ret[i] = getRecordingTagDisplay($translate, ret[i], 'negative');
				  }
				}

				return ret;
			  };

			  $scope.getRecordingTagName = function getRecordingTagName(tag) {

				// This is not close to correct for the generic case.
				if (tag.tagTypeString == 'positive')
				  return $translate.instant('EVIDENCE_FOR') + '...';
				else if (tag.tagTypeString == 'negative')
				  return $translate.instant('EVIDENCE_AGAINST') + '...';
			  };

			  $scope.getRecordingTagString = function getRecordingTagString(tag) {

				return tag.tagString;
			  };

			  $scope.getRecordingTagStringDisplay = function getRecordingTagStringDisplay(tag) {

				return getRecordingTagDisplay($translate, tag.tagString, tag.tagTypeString);
			  };

			  $scope.getRecordingSection = function getRecordingSection(recordingType, tagTime, tagSpan) {

				var recording = $scope.thought.recordings[recordingType];

				var words = recording.notes.split(' ');

				var text = '';
				for (var i=tagTime; i<tagTime+tagSpan; ++i) {

				  if (i>0)
					text += ' ';

				  text += words[i];
				}

				return text;
			  };

	  		// end: thoughtsCtrl code

			function shouldOpenTextThoughtsModal(thought) {
				return (!$scope.textThoughtsModal &&
					   (thought.thoughtType == 'TEXT_DISTORTIONS' ||
					   thought.thoughtType == 'TEXT_JOURNAL'));
			}

			$scope.viewThought = function viewThought(thought) {

				$scope.thought = thought;
				$scope.completed = true;
				$scope.thoughtType = getThoughtType($scope.thought);
				$scope.activity = getActivityByName($scope.thoughtType);

				for (var recordingType in $scope.thought.recordings) {

					var recording = $scope.thought.recordings[recordingType];
					if (recording.tags) {

						recording.tags.sort(function(a, b) {

						return a.tagTime - b.tagTime;
					  });
					}
				}


				var templateUrl = thoughtTypeToTemplateUrl($scope.thoughtType);

				OverlayService.modal.open({
				  modalId: 'ViewThoughtModal',
				  templateUrl: templateUrl,
				  scope: $scope,
				  animation: 'slide-in-up',
				  ignoreStatusBar: false,
				  recordAppseeEvent: false
				}).then(function(modal) {
					$scope.modal = modal;
				});

			};

			$scope.closeModal = function() {
				OverlayService.modal.close($scope.modal).then(function(modal) {
				  $scope.modal = modal;
				});
			};

			$scope.getGoalDateDisplay = function getGoalDateDisplay(goal) {

				var goalDate = new Date(goal.achievedRecordedAtString);

				return moment(goalDate).calendar();
			};

			function getRecordingAttribute(thought, type, attribute) {

				if (thought.recordings && thought.recordings[type])
					return thought.recordings[type][attribute];
			}

			$scope.getRecordingSource = function getRecordingSource(thought, type) {

				return getRecordingAttribute(thought, type, 'url');
			};

			console.log('recordingSource', $scope);

			$scope.getRecordingDuration = function getRecordingDuration(thought, type) {

				return getRecordingAttribute(thought, type, 'duration');
			};

			$scope.getRecordingTags = function getRecordingTags(thought, type) {

				return getRecordingAttribute(thought, type, 'tags');
			};

			$scope.getRecordingTagLabel = function getRecordingTagLabel(tag) {

				var tagStrings;

				if (tag.tagString) {

					if (tag.tagString.indexOf(',') >= 0) {
						tagStrings = tag.tagString.split(',');
					}
					else if (tag.tagString.indexOf(';') >= 0) {
						tagStrings = tag.tagString.split(';');
					}
					else
						tagStrings = [tag.tagStrings];
				}
				else {
					tagStrings = [];
				}

				return getRecordingTagDisplay($translate, tagStrings, tag.tagTypeString);
			};

			$scope.getRecordingTagTimeDisplay =function getRecordingTagTimeDisplay(tag) {

				var tagTime = tag.tagTime;

				if (tagTime < 0)
					tagTime = 0;

				var minute = Math.floor(tagTime / 60);

				var seconds = Math.floor(tagTime - (minute*60));

				return (minute < 10 ? '0' + minute : minute) + ':' + (seconds < 10 ? '0' + seconds : seconds);
			};

			$scope.getThoughtDateDisplay = function getThoughtDateDisplay(thought) {

				var thoughtDate = new Date(thought.createdAtString);
				return moment(thoughtDate).calendar();
			};

			$scope.getThoughtDisplay = function getThoughtDisplay(thought) {

				if (thought.thoughtType == 'TEXT_DISTORTIONS')
					return $translate.instant('COMPLETED_THINKING_TRAPS');
				else
					return $translate.instant('COMPLETED_JOURNAL');
			};

			$scope.hasNotes = function hasNotes(moodRating) {

				return moodRating.habitDataNotes && moodRating.habitDataNotes.notes && moodRating.habitDataNotes.notes.length > 1;
			};

			$scope.toggleNotes = function toggleNotes(moodRating) {

				if ($scope.showingNotes[moodRating.id]) {
					delete $scope.showingNotes[moodRating.id];
				}
				else {
					$scope.showingNotes[moodRating.id] = moodRating;
				}
			};

			$scope.showNotes = function showNotes(moodRating) {

				return !!$scope.showingNotes[moodRating.id];
			};

			function getMonthStart(date) {

				var monthDate = new Date(date);
				monthDate.setDate(1);
				monthDate.setHours(0,0,0,0);

				return monthDate;
			}

			function getWeekStart(date) {

				var weekDate = new Date(date);

				// 0 is Sunday, 1 is Monday, etc.
				var weekDay = date.getDay();

				weekDate = weekDate.addDays(-weekDay);
				weekDate.setHours(0,0,0,0);

				return weekDate;
			}

			function drawText(currentDate, startPos, sectionWidth) {

				var dateText = moment(currentDate).format('L');
				var dayOfWeekText = moment(currentDate).format('ddd');

				var dayTextSize = (10 * canvasScale) + 'pt';

				$scope.ctx.font = dayTextSize + ' Helvetica Neue, Helvetica, sans-serif';
				$scope.ctx.textAlign = 'center';
				$scope.ctx.fillStyle = $scope.viewingOtherUser ? 'rgb(43,43,43)' : 'rgb(255,255,255)';
				$scope.ctx.fillText(dayOfWeekText, startPos + (sectionWidth/2), 22 * canvasScale);

				var dateTextSize = (8 * canvasScale) + 'pt';

				$scope.ctx.font = dateTextSize + ' Helvetica Neue, Helvetica, sans-serif';
				$scope.ctx.fillStyle = $scope.viewingOtherUser ? 'rgb(43,43,43)' : 'rgba(255,255,255, 0.7)';
				$scope.ctx.fillText(dateText, startPos + (sectionWidth/2), 37 * canvasScale);
			}

			function drawDataPoints(moodRatings, width, height, startMS, widthInMS, isMoodRating) {

				if (moodRatings) {

					for (var iteration = 0; iteration<2; ++iteration) {

						for (var i=0; i<moodRatings.length; ++i) {

							var moodRating = moodRatings[i];
							var moodRatingDate = new Date(moodRating.experiencedAtStr);

							var x = width * ((moodRatingDate.getTime() - startMS) / widthInMS);

							var yTopOffset = 10 * canvasScale;
							var yHeightOffset = 95 * canvasScale;

							var divisor = isMoodRating ? 6 : 4;
							var y = height - (yTopOffset + (((moodRating.valueInt-1) / divisor) * yHeightOffset));

							if (iteration === 0) {
								if (i > 0) {

									$scope.ctx.strokeStyle = $scope.viewingOtherUser ? 'rgb(125,125,125, 1)' : 'rgba(255,255,255, 0.4)';
									$scope.ctx.beginPath();
									$scope.ctx.moveTo(lastX, lastY);
									$scope.ctx.lineTo(x, y);
									$scope.ctx.lineWidth=canvasScale;
									$scope.ctx.stroke();
								}
							}
							else {

								var color;

								if (isMoodRating)
									color = GeneralService.COLORS[7-moodRating.valueInt];
								else
									color = GeneralService.STRESS_COLORS[moodRating.valueInt-1];

								// To get alpha
								var rgb = hexToRgb(color);
								var localRGBString = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

								$scope.ctx.fillStyle = localRGBString;

								$scope.ctx.beginPath();
								$scope.ctx.arc(x, y, 4 * canvasScale, 0, 2*Math.PI);
								$scope.ctx.closePath();

								$scope.ctx.fill();
							}

							lastX = x;
							lastY = y;
						}
					}
				}
			}

			function drawDayGraph() {

				var width = $scope.ctx.canvas.width;
				var height = $scope.ctx.canvas.height;

				var startDay = activeDate;
				var startDayMS = startDay.getTime();

				var hourWidthInMS;
				var widthInMS = MILLISECONDS_IN_DAY;


				var rgbString = $scope.viewingOtherUser ? "rgba(239, 239, 239, 1)" : "rgba(0, 0, 0, 0.25)";
				$scope.ctx.fillStyle = rgbString;
				$scope.ctx.fillRect(0, 0, width, height);

				for (var i=1; i<24; ++i) {

					var hourDate = new Date(startDay);
					hourDate.setHours(startDay.getHours() + i);

					var startPos = width * ((hourDate.getTime() - startDayMS) / widthInMS);

					// For the first one, we'll record the width of the hour in MS.
					if (i==1)
						hourWidthInMS = startPos;

					$scope.ctx.strokeStyle = $scope.viewingOtherUser ? 'rgba(204,204,204,1)' : 'rgba(255,255,255, 0.4)';
					$scope.ctx.beginPath();
					$scope.ctx.moveTo(startPos, 0);
					$scope.ctx.lineTo(startPos, 7 * canvasScale);
					$scope.ctx.lineWidth=canvasScale;
					$scope.ctx.stroke();

					if ( ((i%3) == 0) && (i != 12)) {

						var timeText = moment(hourDate).format('ha').toUpperCase();

						var timeTextSize = (canvasScale * 8) + 'pt';

						$scope.ctx.font = timeTextSize + ' Helvetica Neue, Helvetica, sans-serif';
						$scope.ctx.fillStyle = $scope.viewingOtherUser ? 'rgb(43,43,43)' : $scope.ctx.strokeStyle;
						$scope.ctx.textAlign = 'center';
						$scope.ctx.fillText(timeText, startPos, 20 * canvasScale);
					}
				}

				drawText(activeDate, 0, width);

				// Draw the values.
				// We really want all of the habit data here to draw the graph more effectively,
				// otherwise we won't see lines from previous weeks
				var dataPoints =
					$scope.isShowingMood() ? getAllHabitData(1) : getAllHabitData(19);

				drawDataPoints(dataPoints, width, height, startDayMS, widthInMS, $scope.isShowingMood());
			}

			function drawWeekGraph() {

				var width = $scope.ctx.canvas.width;
				var height = $scope.ctx.canvas.height;
				var sectionWidth = width / 7;

				var startDay = getWeekStart(activeDate);

				var startDayMS = startDay.getTime();

				var widthInMS = 7 * MILLISECONDS_IN_DAY;

				for (var day=0; day<7; ++day) {

					var currentDate = startDay.addDays(day);

					// We can't use milliseconds offset from the start date because of daylight
					// savings time issues.
					var startPos = width * ((MILLISECONDS_IN_DAY * day) / widthInMS);

					// color in the background
					var rgbString;
					rgbString = $scope.viewingOtherUser ? "rgba(239, 239, 239, 1)" : 'rgba(0, 0, 0, 0.25)';

					$scope.ctx.fillStyle = rgbString;
					$scope.ctx.fillRect(startPos, 0, sectionWidth, height);

					// Draw the separating line
					if (day != 0) {

						$scope.ctx.strokeStyle = $scope.viewingOtherUser ? 'rgba(204,204,204,1)' : 'rgba(0,0,0, 0.35)';
						$scope.ctx.beginPath();
						$scope.ctx.moveTo(startPos, 0);
						$scope.ctx.lineTo(startPos, height);
						$scope.ctx.lineWidth=canvasScale;
						$scope.ctx.stroke();
					}
					drawText(currentDate, startPos, sectionWidth);
				}

				// Draw the values.
				// We really want all of the habit data here to draw the graph more effectively,
				// otherwise we won't see lines from previous weeks
				var dataPoints =
					$scope.isShowingMood() ? getAllHabitData(1) : getAllHabitData(19);

				drawDataPoints(dataPoints, width, height, startDayMS, widthInMS, $scope.isShowingMood());
			}

			function updateGraph(isResize) {

				$scope.canvas = document.getElementById("moodHistory");
				$scope.ctx = $scope.canvas ? $scope.canvas.getContext("2d") : undefined;

				if (!$scope.ctx)
					return;

				var moodHistoryEl = $("#moodHistory");

				$scope.ctx.canvas.width = moodHistoryEl.parent().innerWidth() * canvasScale;
				$scope.ctx.canvas.height = 150 * canvasScale;

				moodHistoryEl.css('width', moodHistoryEl.parent().innerWidth());
				moodHistoryEl.css('height', 150);

				var width = $scope.ctx.canvas.width;
				var height = $scope.ctx.canvas.height;

				$scope.ctx.save();

				// Start by clearing the canvas and drawing the background.
				$scope.ctx.clearRect(0, 0, width, height);

				// Draw in the background
				// var rgbString = "rgba(0, 0, 0, 0.5)";
				// $scope.ctx.fillStyle = rgbString;
				// $scope.ctx.fillRect(0, 0, width, height);

				if ($scope.isModeActive('day')) {

					drawDayGraph();
				}
				else if ($scope.isModeActive('week')) {

					drawWeekGraph();

					if (!isResize) {
						updatePieChart();
						updateWordCloud();
					}
				}
				else {

					if (!isResize) {
						updatePieChart();
						updateWordCloud();
					}
				}

				$scope.ctx.restore();

				// We're also going to update the heights of the elements below.

				// Remove this first so it can be recomputed
				var elements = $('.vertical-stretch');
				for (var i=0; i<elements.length; ++i) {

					element = $(elements[i]);
					element.css('min-height', '');
				}

				$timeout(updateMinHeights);
			}

			$scope.getWordCloud = function getWordCloud() {

				if ($scope.wordCloud) {

					return $sce.trustAsHtml($scope.wordCloud);
				}

				return '';
			};

			function updateWordCloud() {

				var struct = getModeStructure();

				var habitDaysData = getHabitDaysData(struct, getModeStartDate(), 1);

				if (!habitDaysData || habitDaysData.values.length == 0) {

					$scope.wordCloud = undefined;
					return;
				}

				var maxTags = 0;
				var tagCounts = {};

				for (var i=0; i<habitDaysData.values.length; ++i) {

					var habitData = habitDaysData.values[i];

					var subValueIds = habitData.habitSubValueIds;

					if (subValueIds) {
						for (var j=0; j<subValueIds.length; ++j) {

							var display = $scope.getHabitSubValueDisplayById(subValueIds[j]);

							console.log("display: " + display);

							if (!tagCounts[display])
								tagCounts[display] = 1;
							else
								++tagCounts[display];

							if (tagCounts[display] > maxTags)
								maxTags = tagCounts[display];
						}
					}
				}

				if (maxTags > 0) {

					$scope.wordCloud = '';

					var tagArray = [];
					for (var tag in tagCounts) {

						tagArray.push(tag);
					}

					tagArray.sort();



					// For each tag, determine the size.
					for (var k=0; k<tagArray.length; ++k) {

						tag = tagArray[k];
						var tagCount = tagCounts[tag];
						var tagClass;

						for (var m=0; m<5; ++m) {

							var max = Math.round( ((m+1)/5) * maxTags );
							var min = Math.round( (m/5) * maxTags );

							if (tagCount > min && tagCount <= max) {

								tagClass = "size" + (m+1);
								break;
							}
						}

						if (k>0)
							$scope.wordCloud += ' ';

						$scope.wordCloud += '<span class="' + tagClass + '">' + tag + '</span>';
					}


				}
				else {

					$scope.wordCloud = undefined;
				}


			}



			function updatePieChart() {

				var struct = getModeStructure();

				var habitDaysData;

				var colors;

				if ($scope.isShowingMood()) {
					habitDaysData = getHabitDaysData(struct, getModeStartDate(), 1);

					colors = GeneralService.COLORS;
				}
				else {

					habitDaysData = getHabitDaysData(struct, getModeStartDate(), 19);

					colors = GeneralService.STRESS_COLORS;
				}

				// Now that the counts are there, create the data array.
				var series = {

					colors: colors,
					data: []
				};


				if (habitDaysData) {

					var valueArray = habitDaysData.habit.habitValues;

					// Fill an array with 0s.
					var totalCount = 0;
					var valueCounts = {};

					for (var i=0; i<habitDaysData.values.length; ++i) {

						var habitData = habitDaysData.values[i];

						if (!valueCounts[habitData.habitValueId]) {

							valueCounts[habitData.habitValueId] = 1;
						}
						else {
							++valueCounts[habitData.habitValueId];
						}

						++totalCount;
					}

					for (var j=0; j<valueArray.length; ++j) {

						var habitValue = valueArray[j];

						var valueCount = valueCounts[habitValue.id];
						if (typeof valueCount == 'undefined')
							valueCount = 0;

						series.data.push({
							name: getValueFromDisplay(habitValue.display),
							y: totalCount > 0 ? (valueCount / totalCount) : 0
						});
					}
				}
				else {

					if ($scope.isShowingClientView())
						series.colors = ['white'];
					else
						series.colors = ['black'];

					series.data.push({
						name: $translate.instant('NO_DATA'),
						y: 1
					});
				}




				$('.moodPieChart').highcharts({
					chart: {
						backgroundColor: 'transparent',
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						type: 'pie',
						marginTop: 0,
						marginBottom: 0,
						marginLeft: 0,
						marginRight: 0
					},
					title: {
						text: null
					},
					tooltip: {
						headerFormat: '',
						pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
						followPointer: false
					},
					plotOptions: {
						pie: {
							allowPointSelect: false,
							cursor: 'pointer',
							dataLabels: {
								enabled: false
							}
						}
					},
					series: [series],
					credits: {
						enabled: false
					}
				});

			}

			function updateMinHeights() {

				var maxHeight = 0;

				var elements = $('.vertical-stretch');
				for (var i=0; i<elements.length; ++i) {

					element = $(elements[i]);

					if (element.innerHeight() > maxHeight)
						maxHeight = element.innerHeight();
				}

				for (var k=0; i<elements.length; ++k) {

					element = $(elements[k]);
					element.css('min-height', maxHeight);
				}
			}

			function updateOnResize(isResize) {

				updateGraph(isResize);
			}

			// Redraw the graph when resizing the window.
			$(window).on('resize', updateOnResize);

			// Make sure we don't keep listening.
			$scope.$on('$destroy', function() {
				$(window).off('resize', updateOnResize);
			});

			function getActivityDaysData(struct, date, activity) {

				var day = GeneralService.getDayString(date);

				var daysData = struct[day];

				if (daysData) {
					return daysData.activities[activity];
				}

				return undefined;
			}

			function getHabitDaysData(struct, date, habitId) {

				var day = GeneralService.getDayString(date);

				var daysData = struct[day];

				if (daysData) {
					return daysData.habits[habitId];
				}

				return undefined;
			}

			function  getAllHabitData(habitId) {

				var habitData = $scope.allData.habits ? $scope.allData.habits[habitId] : undefined;
				if (habitData)
					return habitData.values;

				return undefined;
			}

			function initializeDataStructure(structure, habit) {

				if (!structure.activities) {

					structure.activities = {
						relax: [],
						thoughts: [],
						goals: [],
						social: [],
						account: []
					};
				}

				if (!structure.goals) {
					structure.goals = [];
				}

				if (!structure.thoughts) {
					structure.thoughts = [];
				}

				var habitWrapper = structure.habits;
				if (!habitWrapper) {
					habitWrapper = structure.habits = {};
				}

				if (habit) {
					var daysHabitData = habitWrapper[habit.id];
					if (!daysHabitData) {

						daysHabitData = habitWrapper[habit.id] = {};
						daysHabitData.habit = habit;
					}

					var daysHabitDataValues = daysHabitData.values;
					if (!daysHabitDataValues) {

						daysHabitDataValues = daysHabitData.values = [];
					}
				}
			}

			// Structures will take the form:
			// [day]: {
			//   habits : {
			//     [habitId]: {
			//       values: [] // the original habit data,
			//       averageOrdinate:
			//     }
			//   },
			//   thoughts: [ ],
			//   goals: [ ],
			//   activities: {
			//     RELAX: [],
			//     THOUGHTS: [],
			//     GOALS: [],
			//     SOCIAL: []
			//   }
			// }
			function initializeDataStructureForDay(structure, date, day, habit) {

				var daysData = structure[day];
				if (!daysData) {

					daysData = structure[day] = {};

					// This is used to store the date object which makes some of the roll-up
					// computation a bit easier.
					daysData.date = date;
				}

				initializeDataStructure(daysData, habit);
			}

			// This assumes the structure was just initialized.
			function addHabitDataToValuesArray(structure, habit, habitData) {

				// Habits will be missing when the user does not have them active.
				if (!habit)
					return;

				var habitStructure = structure.habits[habit.id];
				if (habitStructure)
					habitStructure.values.push(habitData);
			}

			function addGoalToValuesArray(structure, goal) {

				structure.goals.push(goal);
			}

			function addThoughtToValuesArray(structure, thought) {

				structure.thoughts.push(thought);
			}

			function addUserActivityToValuesArray(structure, activity, userActivity) {

				structure.activities[activity].push(userActivity);
			}

			function updateAverages(structure, mode) {

				for (var day in structure) {

					var daysData = structure[day];

					var completed = 0;
					var numHabits = 0;

					for (var habitId in daysData.habits) {

						if (habitId != 1 &&
							habitId != 19) {

							++numHabits;
						}

						var habitDaysData = daysData.habits[habitId];
						var habit = habitDaysData.habit;

						var total = 0;

						var minOrdinate = Number.MAX_SAFE_INTEGER;
						var minDate = undefined;

						var maxOrdinate = -1; // They're all positive since they're ordinates
						var maxDate = undefined;

						var habitDataArray = habitDaysData.values;
						for (var i=0; i<habitDataArray.length; ++i) {

							var habitData = habitDataArray[i];

							// We are going to use the ordinate for averages.
							var habitValue = getHabitValueById(habitData.habitValueId);
							total += habitValue.ordinate;

							if (habitValue.ordinate < minOrdinate)
								minOrdinate = habitValue.ordinate;
							if (habitValue.ordinate > maxOrdinate)
								maxOrdinate = habitValue.ordinate;

							// Non-mood habits can only have a single value.
							if (habitId != 1 &&
								habitId != 19 &&
								(i==0) && (mode == 'day')) {

								var metGoal = HabitsService.metGoal(habit, habitValue.ordinate);
								if (metGoal)
									++completed;
							}
						}

						habitDaysData.averageOrdinate = total / habitDataArray.length;

						// The dailyData has already been processed, so we can use
						// that to compute averages.
						if (mode == 'week' || mode == 'month') {

							minOrdinate = Number.MAX_SAFE_INTEGER;
							minDate = undefined;

							maxOrdinate = -1; // They're all positive since they're ordinates
							maxDate = undefined;

							// This is the start date for this grouping.
							var date = daysData.date;

							var avgEndDate;
							if (mode == 'week')
								avgEndDate = date.addDays(7);
							else {
								avgEndDate = new Date(date);
								avgEndDate.setMonth(avgEndDate.getMonth()+1);
							}

							// This is going to start at the beginning of the 'section' and try to roll up the data.
							for (var k=0; k<7; ++k) {

								var currentDate = date.addDays(k);
								var dailyHabitDaysData;

								if (mode == 'week') {
									// This will hold the averages.
									dailyHabitDaysData = getHabitDaysData($scope.dailyData, currentDate, habitId);

									if (dailyHabitDaysData) {
										if (dailyHabitDaysData.averageOrdinate < minOrdinate) {
											minOrdinate = dailyHabitDaysData.averageOrdinate;
											minDate = currentDate;
										}
										if (dailyHabitDaysData.averageOrdinate > maxOrdinate) {
											maxOrdinate = dailyHabitDaysData.averageOrdinate;
											maxDate = currentDate;
										}
									}
								}
								else if (mode == 'month') {

									var dayAverage = 0;
									var dayCount = 0;

									var dateForWeek = new Date(currentDate);

									// Roll up each corresponding day of the week for the month.
									while (dateForWeek < avgEndDate) {

										dailyHabitDaysData = getHabitDaysData($scope.dailyData, dateForWeek, habitId);
										if (dailyHabitDaysData) {

											dayAverage += dailyHabitDaysData.averageOrdinate;
											++dayCount;
										}

										dateForWeek = dateForWeek.addDays(7);
									}

									if (dayCount > 0) {

										var newAverage = Math.round(dayAverage / dayCount);
										if (newAverage < minOrdinate) {
											minOrdinate = newAverage;
											minDate = currentDate; // This is to record which day of the week, not the day of the month.
										}
										if (newAverage > maxOrdinate) {
											maxOrdinate = newAverage;
											maxDate = currentDate;
										}
									}
								}
							}

							habitDaysData.minOrdinate = minOrdinate;
							habitDaysData.minDate = minDate;

							habitDaysData.maxOrdinate = maxOrdinate;
							habitDaysData.maxDate = maxDate;
						}

					}

					if (mode == 'day') {
						daysData.completedHabits = completed;
						daysData.numHabits = numHabits;
					}
					else {

						var modeStartDate = new Date(daysData.date);

						var modeEndDate;
						if (mode == 'week')
							modeEndDate = modeStartDate.addDays(7);
						else {
							modeEndDate = new Date(modeStartDate);
							modeEndDate.setMonth(modeEndDate.getMonth()+1);
						}

						var completedHabits = 0;
						var numDailyHabits = 0;

						while (modeStartDate < modeEndDate) {

							var dayString = GeneralService.getDayString(modeStartDate);
							var dailyData = $scope.dailyData[dayString];

							if (dailyData) {

								completedHabits += dailyData.completedHabits;
								numDailyHabits += dailyData.numHabits;
							}

							modeStartDate = modeStartDate.addDays(1);
						}

						daysData.completedHabits = completedHabits;
						daysData.numHabits = numDailyHabits;
					}
				}
			}

			// habit is optional here.
			function initializeAllDataStructures(dateToInitialize, habit) {

				var dayToInitialize = GeneralService.getDayString(dateToInitialize);
				initializeDataStructureForDay($scope.dailyData, dateToInitialize, dayToInitialize, habit);

				var weekDate = getWeekStart(dateToInitialize);
				var weekDay = GeneralService.getDayString(weekDate);

				initializeDataStructureForDay($scope.weeklyData, weekDate, weekDay, habit);

				var monthDate = getMonthStart(dateToInitialize);
				var monthDay = GeneralService.getDayString(monthDate);

				initializeDataStructureForDay($scope.monthlyData, monthDate, monthDay, habit);

				// We're also going to keep track of all the data.
				initializeDataStructure($scope.allData, habit);
			}

			function processHabitData(habitData) {

				var habitValue = getHabitValueById(habitData.habitValueId);

				// It's possible that data is returned that is not part of the account habits,
				// for which all habit value IDs should be stored.
				var habit;
				if (habitValue)
					habit = getAccountHabitById(habitValue.habitId);

				var habitDate = new Date(habitData.experiencedAtStr);
				var habitDay = GeneralService.getDayString(habitDate);

				initializeAllDataStructures(habitDate, habit);
				addHabitDataToValuesArray($scope.dailyData[habitDay], habit, habitData);

				// Determine the start of the week relative to the habit day.
				var weekDate = getWeekStart(habitDate);
				var weekDay = GeneralService.getDayString(weekDate);

				addHabitDataToValuesArray($scope.weeklyData[weekDay], habit, habitData);

				var monthDate = getMonthStart(habitDate);
				var monthDay = GeneralService.getDayString(monthDate);

				addHabitDataToValuesArray($scope.monthlyData[monthDay], habit, habitData);

				addHabitDataToValuesArray($scope.allData, habit, habitData);
			}

			function processUserActivity(userActivity) {

				var activityId = userActivity.activityId;
				var activity = ActivityService.getActivityById(activityId);

				if (activity.name == 'CREATED_EXPERIMENT')
					return;

				var category = activity.type;

				if (category) {
					var activityDate = new Date(userActivity.recordedAtString);
					var activityDay = GeneralService.getDayString(activityDate);

					initializeAllDataStructures(activityDate);

					addUserActivityToValuesArray($scope.dailyData[activityDay], category, userActivity);

					var weekDate = getWeekStart(activityDate);
					var weekDay = GeneralService.getDayString(weekDate);

					addUserActivityToValuesArray($scope.weeklyData[weekDay], category, userActivity);

					var monthDate = getMonthStart(activityDate);
					var monthDay = GeneralService.getDayString(monthDate);

					addUserActivityToValuesArray($scope.monthlyData[monthDay], category, userActivity);

					addUserActivityToValuesArray($scope.allData, category, userActivity);
				}
			}

			function processThought(thought) {

				var thoughtDate = new Date(thought.createdAtString);
				var thoughtDay = GeneralService.getDayString(thoughtDate);

				initializeAllDataStructures(thoughtDate);

				addThoughtToValuesArray($scope.dailyData[thoughtDay], thought);

				var weekDate = getWeekStart(thoughtDate);
				var weekDay = GeneralService.getDayString(weekDate);

				addThoughtToValuesArray($scope.weeklyData[weekDay], thought);

				var monthDate = getMonthStart(thoughtDate);
				var monthDay = GeneralService.getDayString(monthDate);

				addThoughtToValuesArray($scope.monthlyData[monthDay], thought);

				addThoughtToValuesArray($scope.allData, thought);
			}

			function processGoal(goal) {

				if (!goal.achievedRecordedAtString)
					return;

				var goalDate = new Date(goal.achievedRecordedAtString);
				var goalDay = GeneralService.getDayString(goalDate);

				initializeAllDataStructures(goalDate);

				addGoalToValuesArray($scope.dailyData[goalDay], goal);

				var weekDate = getWeekStart(goalDate);
				var weekDay = GeneralService.getDayString(weekDate);

				addGoalToValuesArray($scope.weeklyData[weekDay], goal);

				var monthDate = getMonthStart(goalDate);
				var monthDay = GeneralService.getDayString(monthDate);

				addGoalToValuesArray($scope.monthlyData[monthDay], goal);

				addGoalToValuesArray($scope.allData, goal);
			}

			// Context here is the ActivityContextV2
			function processContextData(context) {

				if (!$scope.habitSubValues)
					$scope.habitSubValues = {};

				if (context.habitSubValues) {

					updateAccountHabitSubValues(context.habitSubValues);
				}

				if (context.habitData) {

					context.habitData.sort(function(a,b) {
						return new Date(b.experiencedAt) - new Date(a.experiencedAt);
					});
				}

				for (var i=0; i<context.habitData.length; ++i) {

					var habitData = context.habitData[i];

					processHabitData(habitData);
				}

				// Roll up averages for each of the structures.
				updateAverages($scope.dailyData, 'day');
				updateAverages($scope.weeklyData, 'week');
				updateAverages($scope.monthlyData, 'month');

				// Sort the habit data.
				if ($scope.allData.habits) {
					Object.keys($scope.allData.habits).forEach(function(habitId) {

						var allHabitData = $scope.allData.habits[habitId].values;
						allHabitData.sort(function(a,b) {
							return new Date(b.experiencedAt) - new Date(a.experiencedAt);
						});
					});
				}

				for (var j=0; j<context.userActivities.length; ++j) {

					processUserActivity(context.userActivities[j]);
				}

				if (context.thoughtContext && context.thoughtContext.thoughts) {

					for (var k=0; k<context.thoughtContext.thoughts.length; ++k) {

						processThought(context.thoughtContext.thoughts[k]);
					}
				}

				if (context.goalContext && context.goalContext.accountSubGoals) {

					for (var goalDay in context.goalContext.accountSubGoals) {

						var daysGoals = context.goalContext.accountSubGoals[goalDay];

						for (var l=0; l<daysGoals.length; ++l) {

							processGoal(daysGoals[l]);
						}
					}
				}

				updateGraph();
			}

			$scope.setActiveTab = function(tab){
				$state.go('practitioner.client.tab', {userId: $stateParams.userId, activeTab: tab});
			};

			function queryForData(newStartDate) {
				// The next startDate/e
				if (!startDate) {
					startDate = new Date();

					// Go back to the beginning of the previous month. This works for january as well.
					startDate.setMonth(startDate.getMonth() - 1);
					startDate.setDate(1);
					startDate.setHours(0, 0, 0, 0);
				}
				else if (newStartDate) {

					endDate = startDate;
					startDate = newStartDate;
				}

				$scope.loading = true;
				var activityQuery = ($scope.viewingOtherUser?
					PractitionerService.getUserActivity($scope.otherUserAccountId ,startDate, endDate):
					ActivityService.getActivityContextV2(startDate, endDate));

				activityQuery.success(function (context) {
					retrievedContext = context;

					processContextData(context);

					console.log("got activity context:");
					console.log(context);

					// When viewing another user.
					if (context.accountHabits)
						$scope.accountHabits = context.accountHabits;
					if ( $scope.viewingOtherUser) {
						PractitionerService.getUser($scope.otherUserAccountId).success(function (data) {
							$scope.otherUser = data;
							$scope.loading = false;
						});
					} else {
						$scope.loading = false;
					}
				}).error(function () {
					$scope.error = $translate.instant('PROGRESS_LOADING_ERROR');
					$scope.loading = false;
				});
			}

			var getOtherUserContext = function(){
				// since we always include this controller on the client page if they are connected
				// or not, this code tries to run and we get a 404 on userContext for non-connected users
				// this blocks that 404
				if($scope.clients){
					var client = _.find($scope.clients, function(cl){
						return cl.account.id == $scope.otherUserAccountId;
					});
					if(client && client.status == 'INVITED'){
						return false;
					}
				}
				PractitionerService.getUserContext($scope.otherUserAccountId).success(function (data) {
					resetData();
					var accountHabits = data.habitContext.habitValues;

					accountHabits.sort(function(a,b) {
						return a.ordinate - b.ordinate;
					});
					updateAccountHabits(accountHabits);

					queryForData();
					$timeout(updateGraph);
				});
			};

		  $scope.viewingOtherUser = false;
		  var setupOtherUser = function(){
				if ($stateParams.clientId) {
					$scope.otherUserAccountId = $stateParams.clientId;

					var accountUser = AccountService.getAccountUser();
					if (accountUser && accountUser.user)
				  	$scope.viewingOtherUser = $scope.otherUserAccountId != accountUser.account.id;
			  }
		  };

		  $scope.initProgress = function(date){
			  setupOtherUser();
				if (!$scope.viewingOtherUser) {

					updateAccountHabits(HabitsService.getAccountHabits());
					queryForData();
					$timeout(updateGraph);
				} else {
					getOtherUserContext();
				}
				if(date){
					activeDate = new Date(date);
					$scope.setMode('day');
		  	}
		  };

			// initialization code - on load. will refire after pacfica ready
			$scope.initProgress();


			$rootScope.$on('event:pacificaReady', function() {

				setupOtherUser();
				if (!$scope.viewingOtherUser) {

					$scope.pdfData.name = AccountService.getAccountUser().user.name;

					updateAccountHabits(HabitsService.getAccountHabits());
					updateAccountSubGoals(GoalsService.getAccountSubGoals());
					updateAccountThoughts(AudioService.getThoughts());

					if (retrievedContext) {
						resetData();

						processContextData(retrievedContext);
					}

					// Need to recreate all of our data as well.
					$timeout(updateGraph);
				}
				else {
					getOtherUserContext();
				}
			});
		}
	]);


	ctrl.controller('TrapsCompleteCtrl', ['$scope', '$controller', function ($scope, $controller) {
		$controller('ProgressCtrl', {
		  $scope: $scope
		});
		$scope.getRecordingTags = function getRecordingTags(recordingType) {
			var recording = $scope.thought.recordings[recordingType];

			return recording.tags;
		};
		}
	]);

	ctrl.controller('ReframeCompleteCtrl', ['$scope', '$controller', function ($scope, $controller) {
		$controller('ProgressCtrl', {
		  $scope: $scope
		});
		$scope.getRecordingTags = function getRecordingTags(recordingType) {
			var recording = $scope.thought.recordings[recordingType];

			return recording.tags;
		};
		}
	]);

})();

(function() {

	/*
	 * NOTE: This is largely copied from relaxCtrl.js in the mobile app. The functionality is nearly
	 * identical, but I don't have a good way to keep the two in sync right now.
	 */

	var ctrl = angular.module('relaxCtrl', []);

  function initializeBgAudio($scope, $timeout, AccountService) {

    window.thescope = $scope;

    var offsets;

    if ($scope.bgSrc == 'Ocean')
      offsets = [54, 52968, true];
    else if ($scope.bgSrc == 'SummerNight')
      offsets = [54, 58568, true];
    else if ($scope.bgSrc == 'Campfire')
      offsets = [54, 31800, true];
    else if ($scope.bgSrc == 'ForestMorning')
      offsets = [54, 46707, true];
    else if ($scope.bgSrc == 'Stream')
      offsets = [54, 39936, true];
    else if ($scope.bgSrc == 'RooftopRain')
      offsets = [54, 59040, true];
    else if ($scope.bgSrc == 'City')
      offsets = [54, 30120, true];
    else if ($scope.bgSrc == 'Thunderstorm')
      offsets = [54, 59925, true];
    else if ($scope.bgSrc == 'Bach')
      offsets = [75, 143961, true];
    else if ($scope.bgSrc == 'Pinknoise')
      offsets = [54, 30145, true];

    $scope.bgPlayerInstance = new Howl({
      src: [$scope.backgroundURL],
      autoplay: false,
      loop: true,
      volume: 0.5,
      sprite: {
        bgSprite: offsets
      },
      onload: function() {

        $scope.checkIfLoaded();
      },
      onloaderror: function() {

        console.log("bgAudio error");
      }
    });

    $scope.volumeData = {
      bgVolume: 0.5
    };

    var volumePref = AccountService.getUserPreference('soundscape_volume');
    if (volumePref)
      $scope.volumeData.bgVolume = +volumePref;

    var volumeTimeout;

    $scope.bgVolumeChanged = function bgVolumeChanged() {

      // This gets fired on every step change, so we only want the last one to get saved.
      if (volumeTimeout) {

        $timeout.cancel(volumeTimeout);
        volumeTimeout = undefined;
      }

      volumeTimeout = $timeout(function() {

        AccountService.setUserPreference('soundscape_volume', $scope.volumeData.bgVolume);
      }, 500);

      if ($scope.bgPlayerInstance) {

        $scope.bgPlayerInstance.volume($scope.volumeData.bgVolume);
      }

    };
  }


	ctrl.controller('RelaxCtrl', ['$scope', '$rootScope', '$controller', '$state', '$http', '$translate', '$analytics', 'AccountService', 'MediaService', 'RelaxService', 'GeneralService',
	  function ($scope, $rootScope, $controller, $state, $http, $translate, $analytics, AccountService, MediaService, RelaxService, GeneralService) {

      var bgAudioSources = RelaxService.bgAudioSources;
      var bgAudioText = RelaxService.bgAudioText;
      var relaxCategories = RelaxService.getRelaxCategories();
      // This is the inhale curve.
      var breathingValues = RelaxService.breathingValues;
      var breathingValueMaxIndex = RelaxService.breathingValueMaxIndex;

      $scope.exerciseCategories = RelaxService.categoryOrder;

      RelaxService.initRelaxExercises();

      // Consolidate these, partly for legacy, partly for performance (don't want to loop over everything all the time).
      var relaxExercises = [];
      var relaxExercisesAudio = [];
      var relaxExerciseLengths = [];

      var index = 0;
      for (var key in relaxCategories) {

        var keyList = relaxCategories[key].exercises;

        for (var i=0; i<keyList.length; ++i) {

          var relaxItem = keyList[i];

          relaxExercises[index] = relaxItem.exercise;
          relaxExercisesAudio[index] = relaxItem.audio;
          relaxExerciseLengths[index] = relaxItem.audioLength;

          ++index;
        }
      }


      // Legacy stuff.
	  	$scope.exerciseOptions = {
        options: relaxExercises,
        exerciseOptionOrdinal: 0
      };

      function reinitializeController() {

        RelaxService.initializeBreatheParams($scope, AccountService);
      }

      // We won't have the user preferences until this is called.
      $scope.$on('event:pacificaReady', reinitializeController);

      // We also need to do this the first time it's created because we won't get the above
      // event when going back to the home page.
      reinitializeController();

      $scope.getExerciseCategory = function getExerciseCategory(category) {

        var key = 'RELAX_CATEGORY_' + category;
        key = RelaxService.replaceExerciseCharacters(key).toUpperCase();

        return $translate.instant(key);
      };

      $scope.getExerciseOptionTimeDisplay = function getExerciseOptionTimeDisplay(item) {

        return RelaxService.getExerciseTimeDisplay(item, AccountService, GeneralService);
      };

      $scope.getCategoryExercises = function getCategoryExercises(category) {
        return relaxCategories[category].exercises;
      };

	  	$scope.getExerciseIndexClass = function getExerciseIndexClass(index) {

	  		var exercise = relaxExercises[index];

	  		return $scope.getExerciseClass(exercise);
	  	};

      $scope.getExerciseClass = function getExerciseClass(item) {
        if(item)
          return RelaxService.replaceExerciseCharacters(item);
      };

	  	$scope.isPremiumEnabled = function isPremiumEnabled(exercise) {
        if(AccountService.isActivityTypeFree('RELAX'))
          return true;
        
        var obj = RelaxService.getExerciseObject(exercise);

        if (!obj.premium)
          return true;

        return AccountService.isPremiumEnabled();
      };

      $scope.isMeditateActivity = function isMeditateActivity(item) {

        if (!item)
          return false;

        return item.meditation;
      };

      $scope.getExerciseOptionDisplay = function getExerciseOptionDisplay(item) {

        return RelaxService.getRelaxExerciseDisplay(item, $translate);
      };

      $scope.getExerciseOptionDescription = function getExerciseOptionDescription() {

        var item = $scope.exerciseOptions.options[$scope.exerciseOptions.exerciseOptionOrdinal];

        return RelaxService.getRelaxExerciseDescription(item, $translate);
      };

      // TODO This looks super messed up. Where is the ending curly brace?
      $scope.goToExercise = function goToExercise(exerciseObj) {

        if ($scope.isPremiumEnabled(exerciseObj.exercise)) {

        	$scope.exercise = exerciseObj;

        	$scope.showRelaxOptions = true;
        }
        else {

          $scope.showPremiumModal(exerciseObj.exercise);
        }
      };

      $scope.hideRelaxOptions = function hideRelaxOptions() {

      	$scope.showRelaxOptions = false;
      };

      /*
       * These below functions relate to the configuration of the activity.
       */

      $scope.getActivityName = function getActivityName() {

        if (!$scope.exercise)
          return '';

        return RelaxService.getRelaxExerciseDisplay($scope.exercise.exercise, $translate);
      };

      $scope.getActivityClass = function getActivityClass() {

        if (!$scope.exercise)
          return '';

        return RelaxService.replaceExerciseCharacters($scope.exercise.exercise);
      };

      $scope.getActivityDescription = function getActivityDescription() {

        if (!$scope.exercise)
          return '';

        return RelaxService.getRelaxExerciseDescription($scope.exercise.exercise, $translate);
      };

      $scope.showCycleOptions = function showCycleOptions() {

        return $scope.exercise &&
               $scope.exercise.exercise != 'Soundscape Mode' &&
               !$scope.isMeditateActivity($scope.exercise);
      };

      $scope.showContinueOptions = function showContinueOptions() {

        return $scope.exerciseName != 'Soundscape Mode';
      };

      // Update the sound option with the ordinal that has been set.
      $scope.updateSoundOption = function updateSoundOption() {

        var newOrdinal = $scope.soundOptions.soundOptionOrdinal;

        $scope.bgAudioSource = $scope.bgAudioSources[$scope.soundOptions.soundOptionOrdinal];

        updateUserPreferences();

        $analytics.eventTrack('setBackgroundAudio', {category: 'relax', label: $scope.bgAudioSource });

        // Hack. Refreshing the css seems to avoid a white line that shows at the
        // bottom of the page.
        $("html").removeClass("is_spinner");
      };

      $scope.updateCycleLength = function updateCycleLength() {

        $scope.cycleLength = $scope.cycleOptions.options[$scope.cycleOptions.cycleOptionOrdinal];

        updateUserPreferences();

        $analytics.eventTrack('setCycleLength', {category: 'relax', label: '' + $scope.cycleLength });

        // Hack. Refreshing the css seems to avoid a white line that shows at the
        // bottom of the page.
        $("html").removeClass("is_spinner");
      };

      $scope.updateContinueOption = function updateContinueOption() {

        $scope.continueOption = $scope.continueOptions.options[$scope.continueOptions.continueOptionOrdinal];
        $scope.enableMeditationMode = $scope.continueOptions.continueOptionOrdinal == 1;

        updateUserPreferences();

        $analytics.eventTrack('setContinueOption', {category: 'relax', label: $scope.continueOption });

        // Hack. Refreshing the css seems to avoid a white line that shows at the
        // bottom of the page.
        $("html").removeClass("is_spinner");
      };

      $scope.getCycleOptionDisplay = function getCycleOptionDisplay(item) {

        var key = 'RELAX_ACTIVITY_SECONDS_BREATHING';

        return item + ' ' + $translate.instant(key);
      };

      $scope.getSoundOptionDisplay = function getSoundOptionDisplay(item) {

        var key = 'RELAX_ACTIVITY_SOUND_' + item;
        key = key.replace(/ /g, '_').replace(/#/g, '').toUpperCase();

        var text = $translate.instant(key);

        return text;
      };

      $scope.getContinueOptionDisplay = function getContinueOptionDisplay(item) {

        // TODO
        return item;
      };


      function updateUserPreferences() {

        AccountService.setUserPreference('bg_audio_src', '' + $scope.bgAudioSource);
        AccountService.setUserPreference('breathe_cycle_length', '' + $scope.cycleLength);
        AccountService.setUserPreference('enable_meditation_mode', $scope.enableMeditationMode);
      }

      $scope.startExercise = function startExercise() {

        var params = {
          cycleLength: $scope.cycleLength,
          bgSrc: $scope.bgAudioSource,
          meditationMode: $scope.enableMeditationMode
        };

        if ($scope.exercise.exercise == 'Soundscape Mode') {

          // If there is no sound,
          if ($scope.bgAudioSource == 'none') {

            window.alert($translate.instant('RELAX_ACTIVITY_SOUNDSCAPE_MODE_NO_SOUND_POPUP'));
            return;
          }

          // No meditation.
          params.src = 'none';

          $state.go('app.meditation', params);
        }
        else if ($scope.isMeditateActivity($scope.exercise)) {

          params.src = $scope.exercise.audio;

          $state.go('app.meditation', params);

        }
        else {

          $state.go('app.breathe', params);
        }
      };
    }
  ]);

  ctrl.controller('BreathingCtrl', ['$scope', '$rootScope', '$controller', '$state', '$stateParams', '$timeout', '$http', '$translate', '$analytics', 'AccountService', 'MediaService', 'GeneralService', 'RelaxService', 'ActivityService',
  	function ($scope, $rootScope, $controller, $state, $stateParams, $timeout, $http, $translate, $analytics, AccountService, MediaService, GeneralService, RelaxService, ActivityService) {

      $scope.cancelLogoutTimer(); // in app.js

  		$scope.backgroundURL = undefined;
  		var hasBackgroundURL = false;
  		$scope.bgPlayerInstance = undefined;

  		var inhalePlayer;
  		var exhalePlayer;

  		$scope.playing = false;
  		$scope.cycle = 1;
  		$scope.percentage = 0;

  		$scope.elapsedTime = 0;
      $scope.startTime = undefined;

      var firstCyclePercentage = 0.5;
      var percentageStep = 0.003;

      $scope.enableMeditationMode = false;
      var enableMeditationMode = AccountService.getUserPreference('enable_meditation_mode');
      if (enableMeditationMode) {

      	$scope.enableMeditationMode = (enableMeditationMode == 'true');
      }

  		var cyclePref = $stateParams.cycles;
      if (cyclePref)
        $scope.cycles = +cyclePref;
      else
        $scope.cycles = 8;

      var cycleLengthPref = $stateParams.cycleLength;

      if (cycleLengthPref)
        $scope.cycleLength = +cycleLengthPref;
      else
        $scope.cycleLength = 10;

      // holdover from old stuff?
      var firstCycleLength = $scope.cycleLength / 3;

      var percentageTimeout = (firstCycleLength * 1000) / (firstCyclePercentage / percentageStep);


      var inhaleSrc = 'Inhale-10.mp3';
      var exhaleSrc = 'Exhale-10.mp3';

      if ($scope.cycleLength == 5) {
        inhaleSrc = 'Inhale-5.mp3';
        exhaleSrc = 'Exhale-5.mp3';
      }
      else if ($scope.cycleLength == 15) {
        inhaleSrc = 'Inhale-15.mp3';
        exhaleSrc = 'Exhale-15.mp3';
      }
      else if ($scope.cycleLength == 20) {
        inhaleSrc = 'Inhale-20.mp3';
        exhaleSrc = 'Exhale-20.mp3';
      }
      else if ($scope.cycleLength == 25) {
        inhaleSrc = 'Inhale-25.mp3';
        exhaleSrc = 'Exhale-25.mp3';
      }

      if ($stateParams.bgSrc != 'none') {

      	$scope.bgSrc = $stateParams.bgSrc;

  			MediaService.getStreamingBackgroundURL($stateParams.bgSrc + '.mp3')
  				.success(function(urlWrapper) {

  					$scope.backgroundURL = urlWrapper.url;
  					hasBackgroundURL = !!$scope.backgroundURL;

            initializeBgAudio($scope, $timeout, AccountService);

  					initializeAudio();
  				});
  				// TODO error states
  		}
  		else {
  			$scope.backgroundURL = 'none';
  			hasBackgroundURL = false;

  			initializeAudio();
  		}

      $scope.getExerciseHeader = function getExerciseHeader() {

        if (!$scope.started) {
          return $translate.instant('GET_READY') + '...';
        }
        if ($scope.finished) {
          return $translate.instant('FINISHED') ;
        }

        if (!$scope.playing) {
          return $translate.instant('PAUSED');
        }

        if ($scope.inhale) {

          return $translate.instant('INHALE') ;
        }
        else {

          return $translate.instant('EXHALE');
        }
      };

  		$scope.pause = function pause() {

  			$scope.playing = !$scope.playing;

  			if ($scope.bgPlayerInstance) {

  				// It has already been changed.
  				if ($scope.playing)
  					$scope.bgPlayerInstance.play('bgSprite');
  				else
  					$scope.bgPlayerInstance.pause();
  			}

  			if ($scope.playing) {
          $scope.startTime = new Date().getTime();

      		if ($scope.started) {
  	    		breathe();

  	    		if ($scope.inhale)
            	$scope.playInhaleAudio(false);
            else
            	$scope.playExhaleAudio(false);

            if ($scope.personalAudioPosition > 0)
              $scope.personalAudio.play(playOptions);

  	    	}
      	}
      	else {
          // Update the elapsed time.
          if ($scope.started) {
            $scope.elapsedTime += new Date().getTime() - $scope.startTime;
            $scope.percentage = ($scope.elapsedTime / 1000) / $scope.cycleLength;
          }

          inhaleAudio.pause();
          exhaleAudio.pause();
      	}
  		};

  		$scope.playInhaleAudio = function playInhaleAudio(reset) {

  			if (reset)
        	inhaleAudio.currentTime = 0;
        inhaleAudio.play();

        // If the other audio's length is too long, we want to make sure they aren't both playing
        // at the same time.
        exhaleAudio.pause();
        exhaleAudio.currentTime = 0;
      };

      $scope.playExhaleAudio = function playExhaleAudio(reset) {

      	if (reset)
        	exhaleAudio.currentTime = 0;
        exhaleAudio.play();

        // If the other audio's length is too long, we want to make sure they aren't both playing
        // at the same time.
        inhaleAudio.pause();
        inhaleAudio.currentTime = 0;
      };

       $scope.getExerciseTitle = function getExerciseTitle() {

        if ($scope.cycle <= $scope.cycles) {

          var cycleText = $translate.instant('RELAX_ACTIVITY_CYCLE_X_OF_Y');
          cycleText = cycleText.replace('[X]', $scope.cycle).replace('[Y]', $scope.cycles);

          return cycleText;
        }

        return $translate.instant("RELAX_ACTIVITY_COMPLETE");
      };


      $scope.checkIfLoaded = function checkIfLoaded() {

        if ( ($stateParams.bgSrc == 'none') ||
             (!!$scope.bgPlayerInstance && $scope.bgPlayerInstance.state() == 'loaded') ) {

          startPlaying();
        }
      };

  		function startPlaying() {

        if ($scope.playing)
          return;

  			if ($scope.bgPlayerInstance) {
  				$scope.bgPlayerInstance.play('bgSprite');
        }

  			fadeIn();

  			$scope.playing = true;
  		}

  		var fadeSteps = 100;
      var step = 0;
  		function fadeIn() {

  			if ($scope.bgPlayerInstance)
  				$scope.bgPlayerInstance.volume((step * $scope.volumeData.bgVolume) / 100.0);

        if (step < fadeSteps) {
          $timeout(fadeIn, 3000 / 100);
          ++step;
        }
        else {
          step = 0;

        	$scope.startTime = new Date().getTime();
          $scope.started = true;
          breathe();
        }
      }

      function fadeOut() {

      	if ($scope.bgPlayerInstance)
  				$scope.bgPlayerInstance.volume(((fadeSteps - step) * $scope.volumeData.bgVolume) / 100.0);

        if (step < fadeSteps) {
          $timeout(fadeOut, 3000 / 100);
          ++step;
        }
        else {
          step = 0;

          $scope.finishExercise();
        }
      }

  		function initializeAudio() {

  			inhalePlayer = document.getElementById('inhaleAudio');
  			exhalePlayer = document.getElementById('exhaleAudio');

  			inhalePlayer.src = '/binaries/breathing-sounds/' + inhaleSrc;
  			exhalePlayer.src = '/binaries/breathing-sounds/' + exhaleSrc;

        inhalePlayer.volume = 0.25;
        exhalePlayer.volume = 0.25;

  			inhalePlayer.load();
  			exhalePlayer.load();

  			$scope.canvas = $("canvas")[0];

  			$timeout($scope.checkIfLoaded, 1000);
  		}

  		var halfSize = 135;

      function drawcircle() {

        var ctx = $scope.canvas.getContext("2d");

        var width = $scope.canvas.width;
        var height = $scope.canvas.height;

        ctx.clearRect(0, 0, width, height);

        var max = 96;

        var val = $scope.percentage < 0.5 ? $scope.percentage / 0.5 : (1.0 - $scope.percentage) / 0.5;

        val = RelaxService.getBreathingValue(val);

        ctx.beginPath();
        ctx.arc(halfSize, halfSize, max * val, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();

      }

  		function breathe() {

      	if (!$scope.playing || $scope.exited)
      		return;

      	if ($scope.percentage === 0.0) {

          $scope.playInhaleAudio(true);
          $scope.inhale = true;
      	}
        else if ($scope.percentage >= firstCyclePercentage && $scope.inhale) {

         	$scope.playExhaleAudio(true);
          $scope.inhale = false;
      	}

        var currentTime = new Date().getTime();
        var elapsedTime = $scope.elapsedTime + (currentTime - $scope.startTime);

        var nextPercentage = (elapsedTime / 1000) / $scope.cycleLength;

    		if (nextPercentage >= 0.999) {

      		if ($scope.cycle < $scope.cycles || $scope.enableMeditationMode) {

            // Record any activities we need to but be sure to do this only once
            if ($scope.cycle == $scope.cycles) {
              $scope.preFinishExercise();
            }

            $scope.percentage = 0.0;

            $scope.elapsedTime = 0.0;
            $scope.startTime = new Date().getTime();

      			++$scope.cycle;

            $scope.inhale = true;

      			$timeout(breathe, percentageTimeout);
      		}
      		else {
            $scope.preFinishExercise();
      		}
    		}
    		else {
          // Some timing issues with updating this when the exercise is ending.
          $scope.percentage = nextPercentage;

    			$timeout(breathe, percentageTimeout);
    		}

        drawcircle();
      }

      $scope.finishedExercise = function finishedExercise() {

  			return $scope.finished;
  		};

      $scope.preFinishExercise = function preFinishExercise() {

      	$scope.finished = true;

      	 ActivityService.recordActivity('COMPLETED_BREATHING');

      	 if (!$scope.enableMeditationMode) {

      	 	 fadeOut();
      	 }
      };

      $scope.finishExercise = function finishExercise() {

      	$state.go('app.home');
      };

  		$scope.destroyCtrl = function destroyCtrl() {

  			if ($scope.bgPlayerInstance)
  				$scope.bgPlayerInstance.unload();

        // if ($scope.narrationTimeout)
        //   $timeout.cancel($scope.narrationTimeout);

        $scope.exited = true;
      };

      $scope.$on('$destroy', function() {
          $scope.destroyCtrl();
  		});
  	}
  ]);

  ctrl.controller('MeditationCtrl', ['$scope', '$rootScope', '$controller', '$state', '$stateParams', '$timeout', '$http', '$translate', '$analytics', 'AccountService', 'MediaService', 'GeneralService', 'ActivityService', 'RelaxService',
  	function ($scope, $rootScope, $controller, $state, $stateParams, $timeout, $http, $translate, $analytics, AccountService, MediaService, GeneralService, ActivityService, RelaxService) {

      $scope.cancelLogoutTimer(); // in app.js

      $scope.hasFlash = false;

      try {
          $scope.hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
      } catch(exception) {
          $scope.hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
      }

  		$scope.loading = true;
  		$scope.initialized = false;
  		$scope.paused = false;

  		$scope.streamingURL = undefined;
  		$scope.backgroundURL = undefined;

  		var hasStreamingURL = false;
  		var hasBackgroundURL = false;

  		$scope.elapsedTime = 0;
  		$scope.completedPlayback = false;

  		var meditationPlayerInstance;
  		$scope.bgPlayerInstance = undefined;

  		$scope.startedPlaying = false;
  		$scope.isSoundscape = false;

  		$scope.enableMeditationMode = $stateParams.meditationMode == 'true';

  		// Can be none for soundscape mode.
  		if ($stateParams.src != 'none') {
  			MediaService.getStreamingMeditationURL($stateParams.src)
  				.success(function(urlWrapper) {

  					$scope.streamingURL = urlWrapper.url;
  					hasStreamingURL = !!$scope.streamingURL;

  					$scope.checkIfLoaded();
  				});
  		}
  			// TODO error states

  		if ($stateParams.bgSrc != 'none') {

  			$scope.bgSrc = $stateParams.bgSrc;

  			MediaService.getStreamingBackgroundURL($stateParams.bgSrc + '.mp3')
  				.success(function(urlWrapper) {

  					$scope.backgroundURL = urlWrapper.url;
  					hasBackgroundURL = !!$scope.backgroundURL;

            initializeBgAudio($scope, $timeout, AccountService);
  				});
  				// TODO error states
  		}
  		else {
  			$scope.backgroundURL = 'none';
  			hasBackgroundURL = false;
  		}

  		$scope.goBack = function goBack() {

  			window.history.go(-1);
  		};

  		$scope.pause = function pause() {

  			if ($scope.loading || !$scope.initialized)
  				return;

  			if (hasBackgroundURL) {

  				if ($scope.paused)
  					$scope.bgPlayerInstance.play('bgSprite');
  				else
  					$scope.bgPlayerInstance.pause();
  			}

  			if (hasStreamingURL) {

  				meditationPlayerInstance.pause();
  			}

  			$scope.paused = !$scope.paused;
  		};

  		$scope.destroyCtrl = function destroyCtrl() {

  			if (meditationPlayerInstance)
  				meditationPlayerInstance.remove();

  			if ($scope.bgPlayerInstance)
  				$scope.bgPlayerInstance.unload();

        if ($scope.narrationTimeout)
          $timeout.cancel($scope.narrationTimeout);

        $scope.exited = true;
      };

      $scope.$on('$destroy', function() {
          $scope.destroyCtrl();
  		});

  		$scope.getElapsedTime = function getElapsedTime() {

  			var seconds = 0;

  			if (meditationPlayerInstance) {

  				if ($scope.bgPlayerInstance)
  					bgDuration = $scope.bgPlayerInstance.seek();

  				var duration = $scope.relaxObj.audioLength; // .getDuration() on player returns incorrect value
  				var position = meditationPlayerInstance.getPosition();

					console.log("position: " + position);
  				// Duration is not working.
  				seconds = duration - position;

  				if (seconds < 0)
  					seconds = 0;
  			}

  			return GeneralService.getTimeDisplay(seconds);
  		};

  		$scope.finishExercise = function finishExercise() {
  			$state.go('app.home');
  		};

  		$scope.finishedExercise = function finishedExercise() {

  			return $scope.completedPlayback;
  		};

  		var fadeSteps = 100;
      var step = 0;
  		function fadeIn() {

  			if ($scope.bgPlayerInstance)
  				$scope.bgPlayerInstance.volume((step * $scope.volumeData.bgVolume) / 100.0);

        if (step < fadeSteps) {
          $timeout(fadeIn, 3000 / 100);
          ++step;
        }
        else {
          step = 0;
        }
      }

      function fadeOut() {

      	if ($scope.bgPlayerInstance)
  				$scope.bgPlayerInstance.volume(((fadeSteps - step) * $scope.volumeData.bgVolume) / 100.0);

        if (step < fadeSteps) {
          $timeout(fadeOut, 3000 / 100);
          ++step;
        }
        else {
          step = 0;

          $scope.finishExercise();
        }
      }

  		function getNarrationPosition() {

        if (meditationPlayerInstance) {

        	$scope.elapsedTime = meditationPlayerInstance.getPosition();

  	      if (!$scope.exited)
  	        $scope.narrationTimeout = $timeout(getNarrationPosition, 300);
        }
      }

  		$scope.checkIfLoaded = function checkIfLoaded() {

  			if ( (($stateParams.src == 'none') || !!$scope.streamingURL) &&
  				   (($stateParams.bgSrc == 'none') || (!!$scope.bgPlayerInstance && $scope.bgPlayerInstance.state() == 'loaded') ) ) {

  				$scope.loading = false;

  				$scope.isSoundscape = ($stateParams.src == 'none');

  				initializeAudio();
  			}
  		};

  		function startPlaying() {

  			if ($scope.startedPlaying)
  				return;

  			$scope.startedPlaying = true;

  			if (meditationPlayerInstance)
  				meditationPlayerInstance.play();

  			if ($scope.bgPlayerInstance) {

  				$scope.bgPlayerInstance.play('bgSprite');
        }

  			fadeIn();

  			$scope.narrationTimeout = $timeout(getNarrationPosition, 100);
  		}

  		function initializeAudio() {

  			if (hasStreamingURL) {

          $scope.relaxObj = RelaxService.getExerciseObjectByAudio($stateParams.src);
  				// TODO consolidate parameters to share between the two.
  				meditationPlayerInstance = jwplayer("meditationAudio");
  				meditationPlayerInstance.setup({
  					file: $scope.streamingURL,
  					height: 40
  				});

  				meditationPlayerInstance.setVolume(100);

  				meditationPlayerInstance.onComplete(function() {

  					$scope.completedPlayback = true;

            ActivityService.recordActivity($scope.relaxObj.activity);

  	        $analytics.eventTrack('finishRelaxExercise', {category: 'relax' });

  	        if (!$scope.enableMeditationMode)
  	        	fadeOut();
  				});
  			}

  			$timeout(startPlaying, 1000);

  			$scope.initialized = true;
  		}
  	}
  ]);

})();

var therapistCtrl = angular.module('therapistCtrl', []);

therapistCtrl.controller('TherapistCtrl', ['$scope', '$rootScope', '$sce', '$controller', '$state', '$ionicPopup', '$ionicModal', '$ionicScrollDelegate', 'AccountService', 'AssessmentService',
	function ($scope, $rootScope, $sce, $controller, $state, $ionicPopup, $ionicModal, $ionicScrollDelegate, AccountService, AssessmentService) {
    
    $controller('VideoChatCtrl', {$scope: $scope});

    $scope.loading = true;

    var connectionCtx = AccountService.getConnectionContext();

		if (!AccountService.isLoggedIn()) {
			$state.go('app.login');
			return;
    }

    $scope.shouldShowResources = function() {
      return connectionCtx && connectionCtx.resourceContent;
    };

    $scope.getPersonalizedResources = function() {
      return $sce.trustAsHtml(connectionCtx ? connectionCtx.resourceContent : '');
    };
    
    function init() {
      AccountService.initializeAppointmentFunctionality($scope, $state);
      AccountService.initializeInviteFunctionality($scope, $ionicModal, $ionicPopup, $ionicScrollDelegate, $sce);
      AssessmentService.initializeAssessmentFunctionality($scope, $state, $ionicPopup);
      
      $scope.loading = false;
    }

    $scope.showConnectionOptions = function(connection){
      $scope.disconnectPractitioner(connection);
      //authorize hippa call in account service
      return;
    };

    if ($scope.isAppReady()) {
      init();
    }

    $rootScope.$on('event:pacificaReady', init);
    $scope.$on('event:userContextRefreshRequest', $scope.retrieveUserContext);
  }]);
(function() {

	var ctrl = angular.module('thoughtsCtrl', []);

	function getRecordingTagDisplay($translate, tagStrings, tagTypeString) {

		var result = '';

		if (tagStrings.indexOf('catastrophizing') >= 0) {
			result += $translate.instant('THOUGHTS_EMOTIONS_CATASTROPHIZING');
		}

		if (tagStrings.indexOf('emotional_reasoning') >= 0) {

			if (result.length > 0)
				result += ', ';

			result += $translate.instant('THOUGHTS_EMOTIONS_EMOTIONAL_REASONING');	
		}

		if (tagStrings.indexOf('mind_reading') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_MIND_READING');	
		}

		if (tagStrings.indexOf('fortune_telling') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_FORTUNE_TELLING');	
		}

		if (tagStrings.indexOf('extreme_words') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_PRESSURIZED');	
		}

		if (tagStrings.indexOf('judging') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_LABELLING');	
		}

		if (tagStrings.indexOf('personalization') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_PERSONALIZATION');	
		}

		if (tagStrings.indexOf('overgeneralizing') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_GENERALIZING');	
		}

		if (tagStrings.indexOf('negative_filtering') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('THOUGHTS_EMOTIONS_NEGATIVE');	
		}

		if (tagStrings.indexOf('notsure') >= 0) {

			if (result.length > 0)
				result += ', ';
			
			result += $translate.instant('NEGATIVE_THOUGHT');	
		}

		

		if (result.length === 0) {

			if (tagTypeString == 'negative')
				result = $translate.instant('NEGATIVE_THOUGHT');
			else
				result = $translate.instant('POSITIVE_THOUGHT');
		}

		return result;
	}

	ctrl.controller('TextThoughtsReviewCtrl', ['$sce', '$scope', '$rootScope', '$state', '$controller', '$stateParams', '$timeout', '$translate', '$ionicActionSheet', '$ionicModal', '$ionicPopup', '$ionicPopover', 'AccountService', 'AudioService', 'HabitsService',
		function ($sce, $scope, $rootScope, $state, $controller, $stateParams, $timeout, $translate, $ionicActionSheet, $ionicModal, $ionicPopup, $ionicPopover, AccountService, AudioService, HabitsService) {

			if (!$scope.thought && $stateParams.thoughtId) {
				$scope.thought = AudioService.getThought($stateParams.thoughtId);
			}

			$scope.analysisRecording = $scope.thought.recordings.analysis;
			$scope.thoughtRecording = $scope.thought.recordings.thought;

			var words;

			if ($scope.analysisRecording)
				words = $scope.analysisRecording.notes.split(' ');
			else if ($scope.thoughtRecording)
				words = $scope.thoughtRecording.notes.split(' ');

			var html = '';

			var tagIndex = -1;

			var tags = $scope.analysisRecording ? $scope.analysisRecording.tags : [];

			// Sort the tags based on their tagTime so that the right indices are applied.
			tags.sort(function(a,b) {

				return a.tagTime - b.tagTime;
			});

			for (var i=0; i<words.length; ++i) {

				var inHighlight = false;
				var highlightStart = false;
				var highlightEnd = false;

				var extraClasses = '';
				var toolTipHTML = '';

				for (var j=0; j<tags.length; ++j) {

					var tag = tags[j];

					if (i >= tag.tagTime && i <= (tag.tagTime + tag.tagSpan - 1)) {

						highlightStart = i == tag.tagTime;
						highlightEnd = i == tag.tagTime + tag.tagSpan - 1;

						inHighlight = true;

						if (tag.tagTypeString) {
							extraClasses = tag.tagTypeString;

							if (tag.tagTypeString == 'negative')
								toolTipHTML = 'onClick="showTagToolTip(event, \'' + tag.tagString + '\', \'' + tag.tagTypeString + '\')"';
						}

						if (highlightStart) {

							++tagIndex;

							if (tag.replaced)
								extraClasses += ' replaced';
						}

						break;
					}
				}

				if (i > 0)
					html += ' ';

				if (highlightStart) {

					html += '<span class="thoughtWord thoughtHighlight start end ' + extraClasses + '" ' + toolTipHTML + '>';

				}

				html += words[i];

				if (highlightEnd) {
					html += '</span>';
				}
			}

			$scope.thoughtHTML = $sce.trustAsHtml(html);

			$scope.getToughtTitle = function getToughtTitle() {

				return $scope.thought.title;
			};

			$scope.removePopover = function removePopover() {

				if ($scope.popover) {

					$scope.popover.remove();

					$scope.popover = undefined;
				}
			};

			// A little gross how i'm mixing JS and angular here.
			window.showTagToolTip = function showTagToolTip(event, tagString, tagTypeString) {

				var $event = $.event.fix(event);

				var tagStrings = tagString ? tagString.split(',') : [];

				var translatedTagString = getRecordingTagDisplay($translate, tagStrings, tagTypeString);

				// platform-ios allows the arrow to be placed
				var template = '<ion-popover-view class="platform-ios"><ion-header-bar> <h1 class="title">' + translatedTagString + '</h1> </ion-header-bar></ion-popover-view>';

				$scope.removePopover();

				$scope.popover = $ionicPopover.fromTemplate(template, {
					scope: $scope
				});

				$scope.popover.show($event);
			};

			$scope.$on('$destroy', function() {

				$scope.removePopover();

	      window.showTagToolTip = undefined;
	    });
		}
	]);

	ctrl.controller('TextThoughtsJournalReviewCtrl', ['$sce', '$scope', '$rootScope', '$state', '$controller', '$stateParams', '$timeout', '$translate', '$ionicActionSheet', '$ionicModal', '$ionicPopup', '$ionicPopover', 'AccountService', 'AudioService', 'HabitsService',
		function ($sce, $scope, $rootScope, $state, $controller, $stateParams, $timeout, $translate, $ionicActionSheet, $ionicModal, $ionicPopup, $ionicPopover, AccountService, AudioService, HabitsService) {

			if ($scope.thought && $stateParams.thoughtId) {
				$scope.thought = AudioService.getThought($stateParams.thoughtId);
			}

			var journal = $scope.thought.recordings.journal;

			$scope.thoughtHTML = $sce.trustAsHtml(journal.notes);
		}
	]);

})();
(function() {

  var ctrl = angular.module('upgradeCtrl', []);

  ctrl.controller('RedeemGiftCodeCtrl', [
    '$scope',
    '$rootScope',
    '$controller',
    '$state',
    '$http',
    '$timeout',
    '$translate',
    'AccountService',
    'Environment',
    function($scope, $rootScope, $controller, $state, $http, $timeout, $translate, AccountService, Environment) {

      if (AccountService.isPremiumEnabled()) {
        $state.go('app.home');
      }

      $scope.formData = {
        giftCode: ''
      };

      $scope.redemptionSuccessful = false;

      $scope.back = function back() {

        window.history.go(-1);
      };

      $scope.redeem = function redeem() {

        $scope.otherError = undefined;

        if (/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/gm.test($scope.formData.giftCode)) {

          $scope.formatError = false;

          AccountService.redeemGiftCode($scope.formData.giftCode).success(function(expiration) {

            AccountService.enablePremiumAccount(new Date(expiration), 'GIFT_CODE');

            $scope.redemptionSuccessful = true;
          }).error(function() {

            // window.alert("There was an error validating your gift code.");

            $scope.otherError = $translate.instant('REDEEM_GIFT_CODE_OTHER_ERROR');
          });
        } else {

          $scope.formatError = true;
        }
      };
    }
  ]);

  ctrl.controller('UpgradeCtrl', [
    '$scope',
    '$rootScope',
    '$controller',
    '$state',
    '$stateParams',
    '$http',
    '$timeout',
    '$translate',
    'AccountService',
    'Environment',
    function($scope, $rootScope, $controller, $state, $stateParams, $http, $timeout, $translate, AccountService, Environment) {

      if (!AccountService.isLoggedIn()) {
        $state.go('app.login');
        return;
      }

      $scope.allowSubscription = true;

      if (!$scope.canUpgrade()) {

        // Only allow purchase of gift codes.
        $scope.allowSubscription = false;
      }

      $scope.errorFields = [];
      $scope.accountUser = AccountService.getAccountUser();

      $scope.shouldShowCouponCode = false;
      $scope.requestingCoupon = false;

      $scope.pricing = recurly.Pricing();

      $scope.updatingPricing = false;

      $scope.upgradeComplete = false;

			// This is the index into the planCodes object.
      $scope.planType = undefined;
      if ($scope.allowSubscription) {

        if ($stateParams.plan == 'monthly' || $stateParams.plan == 'yearly' || $stateParams.plan == 'lifetime')
          $scope.planType = $stateParams.plan;
			}
      else {
        $scope.planType = 'giftpurchaser';
      }

      if (!$scope.planType)
        $scope.planType = 'monthly';

			var planCodes = {};

			function getPlanCode(newType) {

				var ret = planCodes[newType];

				if (ret)
					return ret;

				return newType;
			}

			function getCurrentPlanCode() {

				return getPlanCode($scope.planType);
			}

			function reinitializeController() {

				if (AccountService.isPractitioner()) {
					planCodes.monthly = 'practitioner_monthly';
					planCodes.yearly = 'practitioner_yearly';
				}
				else {
					planCodes.monthly = 'monthly';
					planCodes.yearly = 'yearly';
          planCodes.lifetime = 'lifetime';
				}

				$scope.formData = {

	        firstName: '',
	        lastName: '',
	        address1: '',
	        address2: '',
	        city: '',
	        state: '',
	        postalCode: '',
	        country: '',

	        ccNumber: '',
	        cvv: '',
	        coupon: '',
	        plan: getCurrentPlanCode(),

	        // For bulk purchasing.
	        purchases: 1
	      };

        if ($stateParams.couponCode) {
          $scope.formData.coupon = $stateParams.couponCode;
          $scope.shouldShowCouponCode = true;
        }

				initializePricing();
			}

			$scope.isPractitioner = function isPractitioner() {

				return AccountService.isPractitioner();
			};


      $scope.isGiftPurchase = function isGiftPurchase() {

        return $scope.formData ? ($scope.formData.plan == 'bulkpurchaser') || ($scope.formData.plan == 'giftpurchaser') : false;
      };

      $scope.isBulkPurchase = function isBulkPurchase() {

        return $scope.formData ? $scope.formData.plan == 'bulkpurchaser' : false;
      };

      $scope.updateGiftPurchases = function updateGiftPurchases() {

        if ($scope.formData.purchases >= 20) {

          $scope.formData.plan = 'bulkpurchaser';
        } else {
          $scope.formData.plan = 'giftpurchaser';
        }

        updatePricing();
      };

      var request = 0;

      function updatePricing() {

        var localRequest = ++request;

        $scope.updatingPricing = true;

        var pricingObj = $scope.pricing.plan($scope.formData.plan, {quantity: 1}).currency('USD').coupon($scope.formData.coupon)
        // .address({
        //   country: 'US',
        //   postal_code: '90210'
        // })
          .tax({tax_code: 'digital', vat_number: ''});

        if ($scope.isGiftPurchase()) {
          pricingObj.addon('yearlypurchase', {quantity: $scope.formData.purchases});
        }

        pricingObj.catch(function(err) {
          // err.code
					console.log("ERROR in pricing: ");
					console.log(err);
        }).done(function(price) {
          // price object as emitted by 'change' event

          // Make sure that we aren't overriding previous requests.
          if (localRequest == request) {
            console.log("done (" + request + " ):");
            console.log(price);

            $scope.updatingPricing = false;

            if (!$scope.$$phase) {
              $scope.$apply();
            }
          }
        });
      }

      $scope.showCouponCode = function showCouponCode() {

        $scope.shouldShowCouponCode = true;
      };

      $scope.applyCoupon = function applyCoupon() {

        $scope.requestingCoupon = $scope.enteredCoupon();

        updatePricing();
      };

      $scope.getDiscount = function getDiscount() {

        if ($scope.price) {

          return parseFloat($scope.price.discount).toFixed(2);
        }

        return 0;
      };

      $scope.couponChanged = function couponChanged() {

        $scope.requestingCoupon = $scope.enteredCoupon();

        updatePricing();
      };

      $scope.enteredCoupon = function enteredCoupon() {

        return (!!$scope.formData.coupon) && ($scope.formData.coupon.length > 0);
      };

      $scope.hasValidCoupon = function hasValidCoupon() {

        return $scope.requestingCoupon && !!$scope.coupon;
      };

      $scope.showPrice = function showPrice() {

        return !!$scope.price;
      };

      $scope.setPlan = function setPlan(plan) {

        $scope.formData.plan = getPlanCode(plan);
        $scope.planType = plan;

        updatePricing();
      };

      // Need to attach to the pricing element
      function initializePricing() {

        $scope.pricing.on('set.coupon', function planHandler(coupon) {
          $scope.coupon = coupon;

          console.log("Set coupon");
          console.log(coupon);
        });

        $scope.pricing.on('change', function(price) {
          console.log("Pricing changed:" + price.now.total);

          $scope.price = price.now;
					$scope.nextPrice = price.next;

          if (!$scope.$$phase) {
            $scope.$apply();
          }

        });

        updatePricing();
      }

      $scope.hasFieldError = function hasFieldError(field) {

        for (var i = 0; i < $scope.errorFields.length; ++i) {

          if ($scope.errorFields[i] == field)
            return true;
          }

        return false;
      };

      $scope.removeErrorField = function removeErrorField(field) {

        for (var i = 0; i < $scope.errorFields.length; ++i) {

          if ($scope.errorFields[i] == field) {

            $scope.errorFields.splice(i, 1);

            break;
          }
        }
      };

      $scope.addErrorField = function addErrorField(field) {

        for (var i = 0; i < $scope.errorFields.length; ++i) {

          if ($scope.errorFields[i] == field) {

            return;
          }
        }

        $scope.errorFields.push(field);
      };

      // The CVV code is only recommended, so recurly is not telling us that it has an error.
      $scope.checkCVV = function checkCVV() {

        if ($scope.formData.cvv.length == 0) {

          $scope.addErrorField('cvv');
          return false;
        }

        return true;
      };

      $scope.checkCoupon = function checkCoupon() {

        if ($scope.requestingCoupon) {
          if (!$scope.hasValidCoupon()) {

            $scope.addErrorField('coupon');
            return false;
          }
        }

        return true;
      };

      $scope.checkCreditCard = function checkCreditCard() {

        // Identity card type
        var card_number = $scope.formData.ccNumber,
          card_type = recurly.validate.cardType(card_number);

        var cardError = false;

        if (recurly.validate.cardNumber(card_number)) {
          $scope.removeErrorField('number');
        } else {
          $scope.addErrorField('number');
          cardError = true;
        }

        if (cardError) {
          $('.credit-card-image').removeClass('generic visa mastercard amex visa discover');
        } else if ((card_type == 'default') || (card_type == 'unknown')) {
          $('.credit-card-image').addClass('generic');
          $('.credit-card-image').removeClass('visa mastercard amex visa discover');
        } else {
          $('.credit-card-image').removeClass('generic');
          $('.credit-card-image').addClass(card_type);
        }

      };

      $scope.submittingForm = false;

      $scope.submitForm = function submitForm(event) {
        $scope.errorMsg = "";
        var form = $('form');

        event.preventDefault();

        recurly.token(form, function(err, token) {

          if (err) {
            // handle error using err.code and err.fields
            console.log("Error");
            console.log(err);

            $scope.errorMsg = err.message;
            if (err.fields) {

              // The fields need to correspond to the ids of the elements
              $scope.errorFields = err.fields;
            }

            $scope.checkCVV();

            $scope.checkCoupon();

            if (!$scope.$$phase) {
              $scope.$apply();
            }

          } else {

            $scope.errorFields = [];

            $scope.checkCVV();

            $scope.checkCoupon();

            if ($scope.errorFields.length > 0) {

              console.log("cvv or coupon error, had token: " + token.id);

              if (!$scope.$$phase) {
                $scope.$apply();
              }

              return;
            }

            // recurly.js has filled in the 'token' field, so now we can submit the
            // form to your server; alternatively, you can access token.id and do
            // any processing you wish
            // form.submit();

            $scope.submittingForm = true;

            console.log("success: " + token.id);

            if ($scope.isGiftPurchase()) {

              AccountService.bulkPurchaseWithtoken(token.id, $scope.formData.firstName, $scope.formData.lastName, $scope.formData.address1, $scope.formData.address2, $scope.formData.city, $scope.formData.state, $scope.formData.postalCode, $scope.formData.country, $scope.formData.plan, $scope.formData.coupon, $scope.formData.purchases).success(function(resp) {

                if (resp.expiration) {

                  AccountService.userPreferences.has_purchased_gift_codes = 'true';

                  // date is a long here.
                  AccountService.enablePremiumAccount(new Date(resp.expiration));
                }

                $scope.purchasedGiftCodes = resp.giftCodes;
                $scope.upgradeComplete = true;
                $scope.hasError = true;
                $scope.submittingForm = false;
              }).error(function() {

                $scope.hasError = true;
                $scope.submittingForm = false;
              });
            } else {
              AccountService.subscribeWithToken(token.id, $scope.formData.firstName, $scope.formData.lastName, $scope.formData.address1, $scope.formData.address2, $scope.formData.city, $scope.formData.state, $scope.formData.postalCode, $scope.formData.country, $scope.formData.plan, $scope.formData.coupon).success(function(date) {

                if (date) {
                  // date is a long here.
                  AccountService.enablePremiumAccount(new Date(date));

                  $scope.upgradeComplete = true;
                } else {

                  $scope.hasError = true;
                }

                $scope.submittingForm = false;
              }).error(function(err) {
                if (err.message) {
                  $scope.errorMsg = err.message;
                }
                $scope.hasError = true;
                $scope.submittingForm = false;
              });
            }
          }

          if (!$scope.$$phase) {
            $scope.$apply();
          }
        });

      };

      $scope.downloadGiftCodes = function downloadGiftCodes() {

        AccountService.getDownloadGiftCodeToken().success(function(token) {

          window.open(Environment.serverURL + '/payment/giftCodes.csv?token=' + token, '_blank');
        }).error(function() {

          window.alert("There was an error loading the gift codes.");
        });
      };

			if ($scope.isAppReady()) {
        reinitializeController();
      } else {
        $scope.$on('event:pacificaReady', reinitializeController);
      }
    }
  ]);
})();

var DID_INITIALIZE_MASONRY = false;

function initMasonry() {
  $('.masonry-grid').masonry({
    percentPosition: true,
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: 5
  });
  DID_INITIALIZE_MASONRY = true;
}

function redrawMasonry() {
  if (DID_INITIALIZE_MASONRY) {
    setTimeout(function() {
      $('.masonry-grid').masonry('reloadItems');
      $('.masonry-grid').masonry();
    }, 0);
  }
}

angular.module('webCommunityCtrl', [])

.controller('WebCommunityCtrl', ['$scope', '$controller', '$timeout', '$location', '$stateParams', 
  function($scope, $controller, $timeout, $location, $stateParams) {


    // For community on the web, we need functionality from both the shared GroupsCtrl
    // as well as GroupPostsCtrl -- all in one controller.
    $controller('GroupPostsCtrl', {
      $scope: $scope
    });
    $controller('GroupsCtrl', {
      $scope: $scope
    });

    // Since this controller only runs on the web, we can implement
    // web specific functionality here:

    $scope.loadCommunities();

    $scope.initMasonry = function() {
      initMasonry();
    };

    $scope.$watch('groupPosts', function() {
      redrawMasonry();
    }, true);

    $scope.$on('$destroy', function() {
      DID_INITIALIZE_MASONRY = false;
    });

  }
]);
(function(){
    'use strict';

    angular
        .module('coachesCtrl', [])
        .controller('CoachesCtrl', CoachesCtrl);

    CoachesCtrl.$inject = ['$scope', 'CareteamService', 'AccountService'];

    function CoachesCtrl($scope, CareteamService, AccountService) {
        
        // Initial view state
        var ITEMS_PER_PAGE = 25;

        $scope.initialized = false;
        $scope.sortedBy = {
            field: 'name',
            order: 'asc'
        };

        $scope.resetViewParameters = function resetViewParameters() {
            $scope.coaches = [];
            $scope.currentPage = 0;
            $scope.totalPages = null;
            $scope.totalIndividuals = 0;
        };
        $scope.resetViewParameters();

        $scope.reloadCoaches = function reloadCoaches() {
            $scope.resetViewParameters();
            $scope.getCoaches({ page: 1 });
        };

        $scope.getCoaches = function() {
            CareteamService.getAllCoaches()
                .success(function (coaches) {
                    $scope.coaches = coaches.list;
                })
                .error(function (e) {
                    // handle it
                }); 
        };

        $scope.onSort = function (sortDetails) {
            $scope.sortedBy = sortDetails;

            $scope.reloadCoaches();
        };

        $scope.getNextPage = function () {
            var hasLoadedFirstPage = $scope.initialized && $scope.coaches.length;
            var isFinalPage = $scope.currentPage === $scope.totalPages;
            if (!hasLoadedFirstPage || isFinalPage)
                return;
            $scope.getCoaches({ page: $scope.currentPage + 1 });
        };

        $scope.init = function () {
            $scope.getCoaches({ page: 1 });

            // Coaches abd Backend Coaches should not be able to view all coaches.
            if (AccountService.isCoachManager())
                $scope.getCoaches();

            $scope.initialized = true;
        };

        if ($scope.isAppReady())
            $scope.init();

        $scope.$on('event:userContextInitialized', function () {
            $scope.init();
        });

    }



    


})();
(function () {
    'use strict';

    angular
        .module('individualsCtrl', [])
        .controller('IndividualsCtrl', IndividualsCtrl)
        .constant('VIEW_OPTIONS', {
            ALL: 'all',
            ASSIGNED: 'assigned',
            YOURS: 'yours'
        })
        .filter('viewOptionLabel', viewOptionLabelFilter);

    IndividualsCtrl.$inject = ['$scope', '$state', 'CareteamService', 'AccountService', 'OverlayService', 'VIEW_OPTIONS'];

    function IndividualsCtrl($scope, $state, CareteamService, AccountService, OverlayService, VIEW_OPTIONS) {
        // Initial view state
        var ITEMS_PER_PAGE = 25;

        $scope.initialized = false;
        
        // Variables related to the coach assignment
        $scope.individualId = null;
        $scope.selectedCoachId = null;
        $scope.assignModal = null;
        $scope.assignError = null;
        $scope.showViewOptions = false; // controls the dropdown.

        $scope.sortedBy = {
            field: 'practitionerName',
            order: 'asc'
        };

        $scope.resetViewParameters = function resetViewParameters() {
            $scope.individuals = [];
            $scope.currentPage = 0;
            $scope.totalPages = null;
            $scope.totalIndividuals = 0;
        };
        $scope.resetViewParameters();

        function initViewOptions() {
            $scope.viewOptions = [];

            if (AccountService.isCoach())
                $scope.viewOptions.push(VIEW_OPTIONS.YOURS);
            if (AccountService.isBackendCoach())
                $scope.viewOptions.push(VIEW_OPTIONS.ASSIGNED);
            if (AccountService.isCoachManager())
                $scope.viewOptions.push(VIEW_OPTIONS.ALL);

            $scope.shouldShowViewOptions = $scope.viewOptions.length > 1;
            $scope.currentViewOption = $scope.viewOptions[0];
        }
        // Just to make sure they're initialized, this will get used later when the controller's initialize function gets called.
        initViewOptions();

        $scope.reloadIndividuals = function reloadIndividuals() {
            $scope.resetViewParameters();
            $scope.getIndividuals({ page: 1 });
        };

        $scope.updateViewOptions = function updateViewOptions(option) {

            $scope.sortedBy.field = 'practitionerName';
            $scope.currentViewOption = option;

            $scope.reloadIndividuals();
        };

        $scope.isManagerView = function() {
            return $scope.currentViewOption == VIEW_OPTIONS.ALL;
        };

        $scope.isBackendCoachView = function() {
            return $scope.currentViewOption == VIEW_OPTIONS.ASSIGNED;
        };

        function getIndividuals(options) {
            if ($scope.currentViewOption == VIEW_OPTIONS.ALL)
                return CareteamService.getAllIndividuals(options);
            else if ($scope.currentViewOption == VIEW_OPTIONS.ASSIGNED)
                return CareteamService.getAssignedIndividuals(options);
            else
                return CareteamService.getYourIndividuals(options);
        }

        $scope.getIndividuals = function (options) {
            var alreadyFetchedPage = options.page === $scope.currentPage;
            
            // This can cause some strange behavior if you are trying to re-sort, but the parameters are different.
            if ($scope.fetchingIndividuals || alreadyFetchedPage) {
                return;
            }

            options.sortField = $scope.sortedBy.field;
            options.sortAscending = $scope.sortedBy.order == 'asc';

            $scope.fetchingIndividuals = true;
            
            getIndividuals(options)
                .success(function (results) {
                    $scope.currentPage = results.currentPage;
                    $scope.fetchingIndividuals = false;
                    $scope.individuals = $scope.individuals.concat(results.list);
                    $scope.totalIndividuals = results.totalItems;

                    // Calculate total number of pages if we have not already done so
                    if (!$scope.totalPages) {
                        $scope.totalPages = Math.ceil(results.totalItems / ITEMS_PER_PAGE);
                    }
                })
                .error(function (e) {
                    $scope.fetchingIndividuals = false;
                });
        };

        // We need to be able to get the coaches so that we can assign them to people.
        $scope.getCoaches = function() {

            if (AccountService.isCoachManager()) {
                CareteamService.getAllCoaches()
                    .success(function (coaches) {
                        $scope.coaches = coaches.list;
                    })
                    .error(function (e) {
                        // handle it
                    }); 
            }
        };

        $scope.init = function () {
            initViewOptions();
            $scope.getCoaches();
            $scope.getIndividuals({ page: 1 });
            $scope.initialized = true;
        };

        $scope.onSort = function (sortDetails) {
            $scope.sortedBy = sortDetails;

            $scope.reloadIndividuals();
        };

        $scope.getNextPage = function () {
            var hasLoadedFirstPage = $scope.initialized && $scope.individuals.length;
            var isFinalPage = $scope.currentPage === $scope.totalPages;
            if (!hasLoadedFirstPage || isFinalPage)
                return;
            $scope.getIndividuals({ page: $scope.currentPage + 1 });
        };

        $scope.assignCoachToIndividual = function (coach, individualId) {
            CareteamService.assignCoachToIndividual(coach.practitionerId, individualId)
                .success(function (res) {
                    // no need for additional request
                    $scope.individuals.forEach(function(individual) {
                        if(individual.userId === individualId) {
                            individual.practitionerName = coach.firstName + ' ' + coach.lastName;
                            individual.status = "INVITED";
                            individual.practitionerId = coach.practitionerId;
                        }
                    });

                    $scope.closeModal()
                        .then($scope.openAssignSuccessfulModal);
                })
                .error(function (e) {
                    $scope.assignError = e.message;
                });
        };

        $scope.openAssignSuccessfulModal = function() {
            OverlayService.modal.open({
                modalId: 'SuccessfulAssignModal',
                templateUrl: 'templates/careteam/individuals/coach-assign-success.modal.html',
                scope: $scope,
                animation: 'slide-in-up',
            }).then(function (modal) {
                $scope.successModal = modal;
            });
        };

        $scope.closeAssignSuccessfulModal = function () {
            OverlayService.modal.close($scope.successModal)
                .then(function(modal) {
                    $scope.successModal = modal;
                });
        };

        $scope.openAssignModalForIndividual = function (individualId) {
            $scope.individualId = individualId;

            OverlayService.modal.open({
                modalId: 'AssignCoachModal',
                templateUrl: 'templates/careteam/individuals.add.modal.html',
                scope: $scope,
                animation: 'slide-in-up',
            }).then(function (modal) {
                $scope.assignModal = modal;
            });
        };

        $scope.closeModal = function () {
            return OverlayService.modal.close($scope.assignModal)
                .then(function(modal) {
                    $scope.assignModal = modal;
                    $scope.individualId = null;
                    $scope.selectedCoachId = null;
                });
        };

        if ($scope.isAppReady())
            $scope.init();

        $scope.$on('event:userContextInitialized', function () {
            $scope.init();
        });
    }

    viewOptionLabelFilter.$inject = ['$translate', 'VIEW_OPTIONS'];

    function viewOptionLabelFilter($translate, VIEW_OPTIONS) {
        return function(viewOption) {
            switch(viewOption){
                case VIEW_OPTIONS.YOURS:
                  return $translate.instant('YOUR_INDIVIDUALS');
                  case VIEW_OPTIONS.ASSIGNED:
                  return $translate.instant('ASSIGNED_INDIVIDUALS');
                case VIEW_OPTIONS.ALL:
                  return $translate.instant('ALL_INDIVIDUALS');
                default:
                  return null;
              }
        };
    }
})();
(function() {

	var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var ZIP_REGEX = /[0-9]{5}/;
	var STATE_REGEX = /^\b([A-z]{2})\b/;
	var NPI_REGEX = /[0-9]{10}/;
	var URL_REGEX = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	var ctrl = angular.module('practitionerAccountCtrl', []);

	ctrl.controller('PractitionerAccountCtrl', ['$scope', '$rootScope', '$sce', '$controller', '$state', '$http', '$timeout', '$ionicPopup', '$translate', 'AccountService', 'PractitionerService', 'CareteamService', 'Token', 'Environment', 'authHttp', '$location', '$stateParams', 
	  function ($scope, $rootScope, $sce, $controller, $state, $http, $timeout, $ionicPopup, $translate, AccountService, PractitionerService, CareteamService, Token,  Environment, authHttp, $location, $stateParams) {

			if (!AccountService.isLoggedIn()) {
	  		$state.go('app.login');
	  		return;
	  	}

	  	$scope.activeView = null;
	  	$scope.editingAgeGroups = false;
	  	$scope.editingSpecialties = false;
	  	$scope.editingOrientations = false;
	  	$scope.editingLanguages = false;
	  	$scope.showRemoveBtn = false;
	  	$scope.billinginfo = null;

	  	$scope.updateView = function updateView(view){
	  		$scope.activeView = view;
	  		// update url
	  		if(view == 'directory'){
	  			$stateParams.activeTab = 'directory';
	  			$location.search('activeTab', 'directory');
	  		} else if (view == 'billing') {
	  	        if ($scope.billinginfo == null)	{
	  	            getBillingInfo();
	  	        }

	  		} else {
	  			$stateParams.activeTab = undefined;
	  			$location.search('activeTab', '');
	  		}
	  	};

			$scope.isPractitioner = function isPractitioner() {
			  return AccountService.isPractitioner();
			};

			var buildSelectionArray = function(pracSelections){
  			var selected = [];
  			if(!pracSelections)
  				return [];
  			pracSelections.forEach(function(selection){
  				var dupe = angular.copy(selection);
  				dupe.selected = true;
  				selected.push(dupe);
  			});
  			return selected;
			};

			$scope.createEmptyStateLicense = function(){
			 	$scope.userLicenses.push({
					licenseState: '',
					licenseNumber: null,
				});
			};

			$scope.buildAgeGroupString = function buildAgeGroupString(){
				var selectedGroups = [];
				$scope.ageGroupString = '';
				if($scope.editUser.ageGroups.zeroToFive){
					selectedGroups.push('0-5 Years');
				}
				if($scope.editUser.ageGroups.sixToEleven){
					selectedGroups.push('6-11 Years');
				}
				if($scope.editUser.ageGroups.twelveToSeventeen){
					selectedGroups.push('12-17 Years');
				}
				if($scope.editUser.ageGroups.eighteenToSixtyFour){
					selectedGroups.push('18-64 Years');
				}
				if($scope.editUser.ageGroups.sixtyFiveOrOver){
					selectedGroups.push('65 Years or Over');
				}
				for(i=0; i < selectedGroups.length; i++){
					$scope.ageGroupString += selectedGroups[i];
					if(i != selectedGroups.length - 1){
						$scope.ageGroupString += ', ';
					}
				}
			};

			var buildSpecialtiesString = function buildSpecialtiesString(){
				$scope.specialtiesString = buildSelectedString($scope.editUser.specialties, 'specialty');
			};

			var buildOrientationsString = function buildOrientationsString(){
				$scope.orientationsString = buildSelectedString($scope.editUser.orientations, 'orientation');
			};

			var buildLanguageString = function buildLanguageString(){
				$scope.languagesString = buildSelectedString($scope.editUser.languages, 'language');
			};

			var buildSelectedString = function buildSelectedString(objects, key, assignment){
				var selectedString = '';
				for(i=0; i < objects.length; i++){
					selectedString += objects[i][key];
					if(i != objects.length - 1){
						selectedString += ', ';
					}
				}
				return selectedString;
			};

			var initActiveTab = function initActiveTab(){
				if (!$scope.editUser)
					return;
				// on first visit, take them to directory page
				// on subsequent visits, check url
				var pageVisited = AccountService.getUserPreference('practitioner_settings_visited');
				if (pageVisited != 'true') {
					AccountService.setUserPreference('practitioner_settings_visited', true);
					$scope.updateView('directory');
				} else if($stateParams.activeTab == 'directory'){
					$scope.updateView('directory');
				} else {
					$scope.updateView('account');
				}
			};

			$scope.updateListingVisibility = function(val){
				// don't want to touch the editUser object since we only want to update the one field.
				// kind of hacky, but gets it done
				$scope.accountUser.practitioner.publicDirectory = val;
				authHttp.post('app/practitioner/account', $scope.accountUser.practitioner)
	    		.success(function(data){
	    			$scope.editUser.publicDirectory = val;
	    		})
	    		.error(function(err){
	    			$scope.formError = $translate.instant('UPDATE_PROFILE_ERROR');
	    		});
			};

			var setupEditUser = function(){
				$scope.directoryVisibleMsg = $sce.trustAsHtml($translate.instant("DIRECTORY_VISIBLE_MESSAGE"));
				$scope.directoryHiddenMsg = $sce.trustAsHtml($translate.instant("DIRECTORY_HIDDEN_MESSAGE"));

				initActiveTab();

				$scope.buildAgeGroupString();
				buildSpecialtiesString();
				buildOrientationsString();
				buildLanguageString();

	  			if($scope.editUser.npi == 0)
	  				$scope.editUser.npi = '';
	  			if(!$scope.editUser.supportedPayers)
	  				$scope.editUser.supportedPayers = [];
	  			$scope.userLicenses = $scope.editUser.stateLicenses;
	  			if(!$scope.userLicenses.length){
	  				$scope.createEmptyStateLicense();
	  			}
	  			$scope.editUser.telehealth = $scope.editUser.telehealth.toString();
	  			$scope.specialtySelections = buildSelectionArray($scope.editUser.specialties);
	  			$scope.languageSelections = buildSelectionArray($scope.editUser.languages);
	  			$scope.orientationSelections = buildSelectionArray($scope.editUser.orientations);
	  			$scope.payerSelections = buildSelectionArray($scope.editUser.supportedPayers);
	  			// setting this up for ng-model value on checkboxes, but we don't care about it
	  			$scope.specialtyCheckbox = null;
	  			$scope.languageCheckbox = null;
	  			$scope.orientationCheckbox = null;
	  			$scope.payersCheckbox = null;
	  			$scope.stateLicenses = null;
	  			$scope.stateLicenseNumber = null;
			};

			var retrieveEditUser = function() {

				// If we are viewing another user, we need to retrieve that user from the server.
				if (!$stateParams.coachId) {
	  				$scope.editUser = angular.copy($scope.accountUser.practitioner);
	  				setupEditUser();
				}
	  			else {
	  				$scope.viewingCoach = true;

	  				CareteamService.getCoach($stateParams.coachId)
	  					.success(function(coach) {
	  						$scope.editUser = coach;
	  						setupEditUser();
	  					})
	  					.error(function (e) {
		                    console.log("There was an error retrieving the coach: " + e.message);
		                });
	  			}
			};

			

  		function updateAccountUser() {
  			$scope.accountUser = AccountService.getAccountUser();
  			if(!$scope.accountUser.practitioner){
  				// we're not ready yet
  				return;
  			}
  			retrieveEditUser();
  			// make sure we have this info before we redirect
  			if($scope.accountUser.user){
  				if(!$scope.isPractitioner() && !AccountService.isAnyCoach()){
						$state.go('app.account');
					}
				}
			}

  		$scope.cancelEdits = function(){
  			$scope.formErrors = [];
  			updateAccountUser();
  		};

  		$scope.isEmailValidated = function isEmailValidated() {

	      return AccountService.isEmailValidated();
	    };

	    $scope.isPremium = function isPremium() {
	      return AccountService.isPremiumEnabled();
	    };

	    $scope.getPremiumExpiration = function getPremiumExpiration() {

	      return AccountService.getPremiumExpiration();
	    };

	    $scope.getAccountType = function getAccountType() {
	    	if(!$scope.accountUser || !$scope.accountUser.account){
	    		return;
	    	}
	      var type = 'Practitioner ';
	      if (AccountService.isPremiumEnabled()) {
	        type += $translate.instant('ACCOUNT_TYPE_FULL_ACCESS') + ' - ' + $translate.instant($scope.accountUser.account.paymentType);
	      } else {
					type += $translate.instant('ACCOUNT_TYPE_BASIC');
		  	}
	      return type;
	    };

	    // Note: isPhoneGood should match the formatter methods in clinicianSignup.ftl
	    $scope.isPhoneGood = function() {

	    	var phone = $scope.editUser.location.phone;
	        if (!phone || phone.length == 0)
	    	  return false;

	    	var numObj = libphonenumber.parse(phone, 'US');

	    	return numObj.phone;
	    };

	    var validateForm = function(){
    	  $scope.formErrors = [];
	      var email = $scope.editUser.email;
	      var phone = $scope.editUser.location.phone;
	      var address = $scope.editUser.location.address;
		  var zip = $scope.editUser.location.postalCode;
		  var about = $scope.editUser.statement;

		  if (about.length > 4000) {
			$scope.formErrors.push($translate.instant('INVALID_ABOUT_LENGTH'));
		  }
	      if (!EMAIL_REGEX.test(email)) {
	        $scope.formErrors.push($translate.instant('LOGIN_ERROR_INVALID_EMAIL'));
	      }
	      if (!$scope.isPhoneGood()){
	      	$scope.formErrors.push($translate.instant('INVALID_PHONE'));
	      }
	      if (!ZIP_REGEX.test(zip)){
	      	$scope.formErrors.push($translate.instant('INVALID_ZIP'));
	      }
	      var state;
	      if (!$scope.editUser.location.state) {
		      $scope.formErrors.push($translate.instant('INVALID_STATE'));
		  }
		  else {
	      	  state = $scope.editUser.location.state = $scope.editUser.location.state.toUpperCase();

		      if (!STATE_REGEX.test(state)){
		      	$scope.formErrors.push($translate.instant('INVALID_STATE'));
		      }
	      }
	      if (!address) {
	      	$scope.formErrors.push($translate.instant('INVALID_ADDRESS'));
	      }
	      if($scope.editUser.npi != '' && !NPI_REGEX.test($scope.editUser.npi)){
	      	$scope.formErrors.push($translate.instant('INVALID_NPI'));
	      }
	      if($scope.editUser.facebookUrl && $scope.editUser.facebookUrl.indexOf('facebook.com') > -1) {
	      	$scope.formErrors.push($translate.instant('INVALID_FACEBOOK'));
	      }
	      if($scope.editUser.twitterUrl && $scope.editUser.twitterUrl.indexOf('twitter.com') > -1) {
	      	$scope.formErrors.push($translate.instant('INVALID_TWITTER'));
	      }
	      if($scope.editUser.websiteUrl && !URL_REGEX.test($scope.editUser.websiteUrl)){
	      	$scope.formErrors.push($translate.instant('INVALID_WEBISTE'));
	      }

	      $scope.editUser.stateLicenses.forEach(function(license, i){
	      	var removalIndexes = [];
	      	if(license.licenseState && !license.licenseNumber) {
	      		$scope.formErrors.push($translate.instante('INVALID_LICENSE_NUMBER'));
	      	} else if(!license.licenseState && license.licenseNumber) {
	      		$scope.formErrors.push($translate.instante('INVALID_LICENSE_STATE'));
	      	} else if(!license.licenseState && !license.licenseNumber){
	      		// remove empties
	      		removalIndexes.push(i);
	      	}
	      	while(removalIndexes.length) {
 					  $scope.editUser.stateLicenses.splice(removalIndexes.pop(), 1);
					}
	      });
	    };

	    var toggleEditStates = function toggleEditStates(){
	    	$scope.editingLanguages = false;
	    	$scope.editingOrientations = false;
	    	$scope.editingSpecialties = false;
	    	$scope.editUserSelections = false;
	    	$scope.editingAgeGroups	= false;
	    };

	    $scope.toggleSpecialties = function(){
	    	$scope.editingSpecialties = !$scope.editingSpecialties;
	    };

	    $scope.toggleLanguages = function(){
	    	$scope.editingLanguages = !$scope.editingLanguages;
	    };

	    $scope.toggleOrientations = function(){
	    	$scope.editingOrientations = !$scope.editingOrientations;
	    };

	    $scope.toggleUserSelections = function(){
	    	$scope.editingUserSelections = !$scope.editingUserSelections;
	    };

	    $scope.toggleAgeGroups = function(){
	    	$scope.editingAgeGroups = !$scope.editingAgeGroups;
	    };

	    $scope.saveDetails = function(){
	      if ($scope.editUser.licenses)
	      	delete $scope.editUser.licenses;
	      $scope.editUser.stateLicenses = $scope.userLicenses;

	      $scope.isSaving = true;
	      $scope.formConfirmation = undefined;

	      validateForm();
	      if($scope.formErrors.length){
	      	$scope.isSaving = false;
	      	return;
	      }
	    	authHttp.post('app/practitioner/account', $scope.editUser)
	    		.success(function(data){
	    			$scope.formConfirmation = $translate.instant('UPDATE_PROFILE_SUCCESS');
	    			$scope.retrieveUserContext();
	    			toggleEditStates();
	    			$timeout(function(){
	    				$scope.formConfirmation = undefined;
	    			}, 4000);
	    		})
	    		.error(function(err){
	    			$scope.formError = $translate.instant('UPDATE_PROFILE_ERROR');
	    		})
	    		.finally(function(){
	    			$scope.isSaving = false;
	    		});
	    };

	    var loadSettings = function(){
	    	authHttp.get('app/support/practitionerOptions')
	    		.success(function(data){
	    			$scope.languages = data.languages;
	    			$scope.payers = data.payers;
	    			$scope.orientations = data.orientations;
	    			$scope.specialties = data.specialties;
	    		})
	    		.error(function(err){
	    			console.log('error retrieving settings: ' + err);
	    		});
	    };

	    $scope.isSelected = function(id, selections){
	    	var selectionIndex = _.findIndex(selections, function(selection){
	    		return selection.id == id;
	    	});
	    	return selectionIndex > -1;
	    };

	    $scope.updateSelection = function(checkedItem, selectedSelections, editUserSelections){
	    	var selectionIndex = _.findIndex(selectedSelections, function(selection){
	    		return selection.id == checkedItem.id;
	    	});
	    	if(selectionIndex > -1) {
	    		selectedSelections.splice(selectionIndex, 1);
	    		editUserSelections.splice(selectionIndex, 1);
	    		return;
	    	}
    		editUserSelections.push(checkedItem);
    		var dupe = angular.copy(checkedItem);
    		selectedSelections.push(dupe);
    		selectedSelections[selectedSelections.length - 1].selected = true;
	    	if(checkedItem.hasOwnProperty('specialty')){
	    		buildSpecialtiesString();
	    	} else if(checkedItem.hasOwnProperty('orientation')){
	    		buildOrientationsString();
	    	} else if(checkedItem.hasOwnProperty('language')){
	    		buildLanguageString();
	    	}
	    };

	    $scope.removeLicense = function(id){
	    	var licenseIndex = _.findIndex($scope.userLicenses, function(license){
	    		return license.id == id;
	    	});
	    	$scope.userLicenses.splice(licenseIndex, 1);
	    };

	    $scope.photoHoverIn = function photoHoverIn(){
				$scope.showRemoveBtn = true;
	    };

	    $scope.photoHoverOut = function photoHoverOut(){
	    	$scope.showRemoveBtn = false;
	    };

	   	var uploadError = function uploadError(){
  	    $ionicPopup.alert({
          template: $translate.instant("An Error Occurred Attaching Your File"),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
	    };

	    var updateUserPhoto = function(path){
  			$scope.accountUser.practitioner.photo = path;
  			$scope.editUser.photo = path;
	    };

	    $scope.photoUploadChange = function photoUploadChange(elem){
	    	var filesize = elem.files[0].size/1024/1024;
	    	if(filesize > 5){
          $ionicPopup.alert({
            template: $translate.instant('FILESIZE_TOO_BIG'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
	    		return;
	    	}
	    	var fileType = elem.files[0].type;
	    	var requestType = fileType.split('/')[1];

	     PractitionerService.presignURL(requestType)
          .success(function(resp) {
            // Perform The Push To S3
            var url = resp.url;
            $http.put(url, elem.files[0], {headers: {'Content-Type': fileType}})
              .success(function(resp) {
                //Finally, We're done
                var photoUrl = url.split("?")[0];
                PractitionerService.setPhotoURL(photoUrl)
                	.success(function(resp){
                		updateUserPhoto(photoUrl);
                	});
              })
              .error(function(resp) {
                uploadError();
              });
          })
          .error(function(resp) {
          	uploadError();
          });
	    };

	    $scope.removePhoto = function removePhoto(){
	    	PractitionerService.setPhotoURL('')
	    		.success(function(resp){
	    			updateUserPhoto(null);
	    		})
	    		.error(function(err){
	    			$ionicPopup.alert({
	            template: $translate.instant('UPLOAD_ERROR'),
	            okText: $translate.instant('OK_GOT_IT'),
	            okType: 'button-default'
	          });
	    		});
	    };

	  	// When reloading the page this won't exist right away.
	  	updateAccountUser();
	  	$rootScope.$on('event:pacificaReady', updateAccountUser);
	  	loadSettings();

			$scope.stateOptions = {
				'': 'Choose state',
				AL: 'Alabama',
				AK: 'Alaska',
				AZ: 'Arizona',
				AR: 'Arkansas',
				CA: 'California',
				CO: 'Colorado',
				CT: 'Connecticut',
				DE: 'Delaware',
				DC: 'District Of Columbia',
				FL: 'Florida',
				GA: 'Georgia',
				GU: 'Guam',
				HI: 'Hawaii',
				ID: 'Idaho',
				IL: 'Illinois',
				IN: 'Indiana',
				IA: 'Iowa',
				KS: 'Kansas',
				KY: 'Kentucky',
				LA: 'Louisiana',
				ME: 'Maine',
				MD: 'Maryland',
				MA: 'Massachusetts',
				MI: 'Michigan',
				MN: 'Minnesota',
				MS: 'Mississippi',
				MO: 'Missouri',
				MT: 'Montana',
				NE: 'Nebraska',
				NV: 'Nevada',
				NH: 'New Hampshire',
				NJ: 'New Jersey',
				NM: 'New Mexico',
				NY: 'New York',
				NC: 'North Carolina',
				ND: 'North Dakota',
				OH: 'Ohio',
				OK: 'Oklahoma',
				OR: 'Oregon',
				PA: 'Pennsylvania',
				PR: 'Puerto Rico',
				RI: 'Rhode Island',
				SC: 'South Carolina',
				SD: 'South Dakota',
				TN: 'Tennessee',
				TX: 'Texas',
				UT: 'Utah',
				VT: 'Vermont',
				VA: 'Virginia',
				VI: 'Virgin Islands',
				WA: 'Washington',
				WV: 'West Virginia',
				WI: 'Wisconsin',
				WY: 'Wyoming'
			};

      var parseBillingInfo = function parseBillingInfo() {
        $scope.usages = [];
        $scope.billinginfo.subscriptions.forEach(function(subscription) {
            if (subscription.addOns) {
                subscription.addOns.forEach(function(addOn) {
                    $scope.usages.push.apply($scope.usages,addOn.usages);
                });
            }
        });
      };

	  // billing stuff here
	  if (!$stateParams.coachId) {
		  var getBillingInfo = function getBillingInfo() {
			authHttp.get('app/practitioner/billing')
		    .success(function(data) {
		      $scope.billinginfo = data;
		      parseBillingInfo();
		    })
		    .error(function(err){
		      alert("ERROR!");
		    });
		  };
	  }
    }
  ]);
})();

(function() {

  var ctrl = angular.module('clientsCtrl', []);

  ctrl.filter('inviteStatus', function() {
    return function(input, uppercase) {
      switch(input) {
        case 0: return 'Invited';
        case 1: return 'Connected';
        case 2: return 'Discontinued';
        default: return '--';
      }
    };
  });

  ctrl.controller('ClientCtrl', ['$scope', '$rootScope', '$controller', '$state', '$stateParams', '$timeout', '$translate', '$ionicPopup', '$ionicModal', 'AccountService', 'PractitionerService', '$location', 'GroupsService', 'HomeworkService', 'OverlayService', 'CareteamService', 
    function ($scope, $rootScope, $controller, $state, $stateParams, $timeout, $translate, $ionicPopup, $ionicModal, AccountService, PractitionerService, $location, GroupsService, HomeworkService, OverlayService, CareteamService) {

      $scope.clientId = +$stateParams.clientId;
      $scope.loading = true;
      $scope.activeTab = $stateParams.activeTab ? $stateParams.activeTab : 'schedule';
      // sometimes we have: ?activeTab=activity&activeTab=activity
      if(Array.isArray($scope.activeTab))
        $scope.activeTab = $scope.activeTab[0];
      $scope.loadingClient = false;
      $scope.loadingData = false;
      $scope.activeAssessments = [];
      $scope.assessments = [];

      PractitionerService.initAssessmentFunctionality($scope);

      $scope.launchHomeworkModal = function(client){
        $scope.dismissToolTip('viewed_assign_homework_tooltip');
        $scope.openHomeworkModal(client);
      };

      $scope.closeEditHomeworkModal = function() {
        OverlayService.modal.close($scope.editHomeworkModal).then(function(modal) {
          $scope.editHomeworkModal = modal;
        });
      };

      $controller('VideoChatCtrl', {$scope: $scope});
      $controller('ProgressCtrl', {$scope: $scope});

      $scope.getClientNotificationCount = function getClientNotificationCount(client) {
        return PractitionerService.clientNotificationCount(client);
      };

      $scope.closeDownloadModal = function closeDownloadModal() {
        OverlayService.modal.close($scope.downloadModal).then(function(modal) {
          $scope.downloadModal = modal;
        });
      };

      $scope.showDownloadModal = function showDownloadModal() {

        if (!$scope.downloadModal) {

          // For use in the modal.
          $scope.viewingOtherUser = true;

          $scope.pdfData = {
            name: ''
          };

          OverlayService.modal.open({
            modalId: 'DownloadModal',
            templateUrl: 'templates/download.modal.html',
            scope: $scope,
            animation: 'slide-in-up',
            ignoreStatusBar: false,
            recordAppseeEvent: false
          }).then(function(modal) {
            $scope.downloadModal = modal;
          });
        }
      };

      $scope.downloadCSV = function downloadCSV(type) {

        var url = '/app/activity/csv/' + type + '.csv?clientId=' + $scope.clientId;

        window.open(url);
      };

      $scope.downloadPDF = function downloadPDF() {

        var reportWeek = $("input[name='reportWeek']:checked").val();

        var url = '/app/activity/pdf?name=' + $scope.pdfData.name + '&week=' + reportWeek;
        url += '&clientId=' + $scope.clientId;

        window.open(url);
      };

      $translate('NO_ASSESSMENTS_DATA')
          .then(function (translatedValue) {
            $scope.chartConfig.lang.noData = translatedValue;
          });

      $scope.chartConfig = {
        chart: {
          type: 'spline',
          backgroundColor: '#EEE',
          ignoreHiddenSeries : false,
          width: $('.assessment-dropdown').outerWidth()
        },
        series: [getEmptySeries()],
        title: {
          text: null
        },
        lang: {
            noData: ''
        },
        noData: {
          style: {
            fontWeight: '300',
            fontFamily: 'Helvetica,Arial,sans-serif',
            color: 'rgb(154,154,154)',
            fontSize: '20px'
          }
        },
        xAxis: {
          type: 'datetime',
          max: new Date().getTime(),
          labels: {
            enabled: true,
            formatter: function(){
              return moment(this.value).format('MM/DD/YY');
            },
            rotation: -40
          },
          minRange: 7 * 24 * 60 * 60 * 1000, // 1 week
          minTickInterval: 24 * 60 * 60 * 1000, // 1 day
          lineWidth: 1,
          tickLength: 0,
          showEmpty: true
        },
        yAxis: {
          title: {
            text: null
          },
          labels: {
            enabled: true
          },
          gridLineColor: 'transparent',
          lineWidth: 1,
          tickLength: 0,
          max: 80,
          min: 0,
          minTickInterval: 1,
          showEmpty: true
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          formatter: function(){
            return '<span style="font-size: 10px">' + moment(this.point.x).format("MMM DD, YYYY h:mm a") + '</span><br/>' +
              '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + this.point.y + '</b>';
          }
        }
      };

      $scope.startSessionClick = function(){
        if ($scope.canAccessPremiumActivity()) {
          $scope.startWebAppointmentNow($scope.client);
          $scope.dismissToolTip('viewed_start_appointment_now_tooltip');
        } else {
          $scope.showClinicianPremiumModal();
        }
      };

      $scope.isViewingPersonalAccount = function isViewingPersonalAccount() {

        return AccountService.getAccountUser().account.id == +$scope.clientId;
      };

      $scope.canAccessPremiumActivity = function() {
        return (AccountService.isPremiumEnabled() || $scope.isViewingPersonalAccount() || ($scope.client && $scope.client.account.premium));
      };

      $scope.checkCanAccessPremiumActivity = function() {
        if (!$scope.canAccessPremiumActivity()) {
          $scope.showClinicianPremiumModal();
        }
        return $scope.canAccessPremiumActivity();
      };

      $scope.setActiveTab = function setActiveTab(activeTab, date) {
        $scope.activeTab = activeTab;
        $location.search('activeTab', activeTab);
        if(activeTab == 'activity'){
          // need to re-init the progressCtrl - if a digest cycle happens
          // while the progress html is hidden, the graph renders with width: 0
          $scope.initProgress(date);
        } if(activeTab == 'chat'){
          GroupsService.clearGroupNotification($scope.client.clientGroupId, setClientNotificationCount);
        }
      };

      $scope.isTabActive = function isTabActive(tab) {
        return $scope.activeTab == tab;
      };

      $scope.showTab = function showTab(tab) {

        if (!$scope.client || $scope.client.status == 'INVITED')
          return false;

        if (tab == 'homework' || tab == 'schedule')
          return AccountService.isPractitioner();

        return true;
      };

      $scope.getClientName = function getClientName() {
        if ($scope.client) {
          return $scope.client.account.firstName ? $scope.client.account.firstName + ' ' + $scope.client.account.lastName : $scope.client.name;
        }
      };

      $scope.getAssessmentById = function getAssessmentById(id) {
        return _.find($scope.assessments, {id: id});
      };

      $scope.hasClientGroup = function hasClientGroup() {

        return $scope.client && !!$scope.client.clientGroupId;
      };

      $scope.createClientGroup = function createClientGroup() {

        if ($scope.canAccessPremiumActivity()) {

          PractitionerService.createClientGroup($scope.clientId)
            .success(function(newGroupId) {
              $scope.client.clientGroupId = newGroupId;
              $scope.setActiveTab('chat');
              window.location.reload();
            })
            .error(function() {
              $ionicPopup.alert({
                template: $translate.instant('GENERIC_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });

        } else {
          $scope.showClinicianPremiumModal();
        }
      };

      $scope.cancelAssessment = function(assessment) {

        var confirmPopup = $ionicPopup.confirm({
          template: $translate.instant('CANCEL_ASSESSMENT_TEXT'),
          cancelText: $translate.instant('NO_CANCEL_ASSESSMENT'),
          cssClass: 'cancel-assessment',
          cancelType: 'button-default',
          title: $translate.instant('CANCEL_ASSESSMENT'),
          okText: $translate.instant('YES_CANCEL_ASSESSMENT'),
          okType: 'button-default'
        });

        confirmPopup.then(function(res) {
          if(res) {

            PractitionerService.cancelAssessmentRequest(assessment.assessmentId, assessment.id).success(function() {
              $scope.loadAssessmentRequests();
            });
          }
        });
      };

      $scope.assessmentHasRequests = function assessmentHasRequests(assessmentId) {
        return !!_.find($scope.assessmentRequests, {assessmentId: assessmentId});
      };

      flattenQuestions = function flattenQuestions(assessment) {
        assessment.questions = [];
        assessment.parts.forEach(function(part) {
          part.questions.forEach(function(question) {
            question.instructions = part.instructions;
            assessment.questions.push(question);
          });
        });
      };

      $scope.downloadAssessmentPDF = function(assessmentRequest) {
          PractitionerService.downloadPDF(assessmentRequest.assessmentId,assessmentRequest.id).success(function (data) {
              var fileUrl = URL.createObjectURL(data);
              window.open(fileUrl);
        });
      };

      $scope.viewAssessmentResults = function(assessmentRequest) {
        $scope.selectedResults = assessmentRequest;
        PractitionerService.getAssessment(assessmentRequest.assessmentId).success(function (data) {
          $scope.selectedAssessment = data;
          flattenQuestions($scope.selectedAssessment);

          OverlayService.modal.open({
            modalId: 'ViewAssessmentResultsModal',
            templateUrl: 'templates/practitioner/view-assessment-results.html',
            scope: $scope,
            animation: 'slide-in-up',
            ignoreStatusBar: false,
            recordAppseeEvent: false
          }).then(function(modal) {
            $scope.viewAssessmentResultsModal = modal;
          });

        });
      };

      $scope.closeViewAssessmentResultsModal = function closeViewAssessmentResultsModal() {
        OverlayService.modal.close($scope.viewAssessmentResultsModal).then(function(modal) {
          $scope.viewAssessmentResultsModal = modal;
        });
      };


      $scope.getAnswerText = function(question, answer) {

        var isIntegerType = question.questionType === "INTEGER_RANGE";
        var isMultiSelectFreetext = question.questionType === "MULTI_SELECT_FREETEXT";
        var isMultipleChoice = question.questionType === "MULTIPLE_CHOICE";

        if (isMultiSelectFreetext) {
          return answer.answerText.replace(/,/g, ', ');  // add space between comma-delimited answers
        }

        if (isIntegerType) {
          return answer.choiceId;
        }

        if (isMultipleChoice) {
          var singleAnswer = _.find(question.options, { id: answer.choiceId });
          return $translate.instant(singleAnswer.text);
        }
      };

      function getMaxScore(assessment) {
        var shortName = assessment.shortName;
        if (shortName == 'PHQ-8')
          return 24;
        else if (shortName == 'PHQ-9')
          return 27;
        else if (shortName == 'GAD-7')
          return 21;
        else if (shortName == 'CESD-R')
          return 60;
        else if (shortName == 'DASS-21')
          return 21;
        else if (shortName == 'PCL-5')
          return 80;
        else if (shortName == 'AUDIT')
          return 80;
        else if (shortName == 'PROMIS')
          return 55;
        else if (shortName == 'STAI')
          return 80;

        return 50;
      }

      $scope.getIntervalDaysDisplay = function(intervalDays){
        if(intervalDays == 7){
            return "Repeats Weekly";
        } else if(intervalDays == 14){
          return "Repeats Every 2 Weeks";
        } else if(intervalDays == 28){
          return "Repeats Every 4 Weeks";
        }
      };

      $scope.loadAssessmentRequests = function loadAssessmentRequests() {

        $scope.chartConfig.series = [];

        $scope.loadingAssessmentRequests = true;
        PractitionerService.getAssessmentRequests($scope.client.account.id)
          .success(function(requests) {
            $scope.assessmentRequests = requests.requests;
            $scope.parseUserAssessments();
          })
          .error(function() {
            console.log('There was an error loading assessment requests.');
            $scope.loadingAssessmentRequests = false;
          });
      };

        $scope.parseUserAssessments = function(){
          // make sure assessments are loaded first
          if($scope.loadingAssessments && !$scope.setupWatch){
            $scope.$watch('assessments', function(newVal, oldVal) {
              $scope.setupWatch = true;
              if(newVal.length > 0 && oldVal.length == 0)
                $scope.parseUserAssessments();
            });
          }
          if($scope.loadingAssessments) // in case it loaded during the watch
            return;

          var seriesData = {};
          var seriesCount = 0;
          $scope.maxYAxis = 0;

          $scope.userAssessmentList = [];

          // An assessmentRequest corresponds to a single completion of an assessment.
          // There are multiple types of scores for each assessment completion.
          $scope.assessmentRequests.forEach(function(assessmentRequest){
            assessmentRequest.requestDate = moment.tz(assessmentRequest.requestDate , AccountService.getUserTimeZone());
            var assessment = _.find($scope.assessments, {id: assessmentRequest.assessmentId});
            if($scope.userAssessmentList.indexOf(assessment) == -1){
              $scope.userAssessmentList.push(assessment);
            }
            if (assessmentRequest.repeating) {
                assessmentRequest.repeatStr = $scope.getIntervalDaysDisplay(assessmentRequest.intervalDays);
            }

            if(assessmentRequest.userAssessment.status == 'COMPLETE') {
              assessmentRequest.userAssessment.finishedAt = moment.tz(assessmentRequest.userAssessment.finishedAt , AccountService.getUserTimeZone());
              var scores = assessmentRequest.userAssessment.scores;

              for (var j=0; j<scores.length; ++j) {

                var score = scores[j];
                assessment = $scope.getAssessmentById(assessmentRequest.assessmentId);
                var seriesName = assessment.shortName + ' ' + $translate.instant(score.name);

                var assessmentSeries = seriesData[seriesName];
                if (!assessmentSeries) {

                  assessmentSeries = seriesData[seriesName] = getEmptySeries();
                  assessmentSeries.color = getSeriesColor(seriesCount); // 0-indexed
                  assessmentSeries.name = seriesName;
                  assessmentSeries.id = assessment.id;

                  seriesCount += 1;

                  // enable the legend with > 1 series
                  if (seriesCount > 1)
                    $scope.chartConfig.legend.enabled = true;
                }
                // set yAxis max
                var maxAssessmentScore = getMaxScore(assessment);
                if( maxAssessmentScore > $scope.maxYAxis){
                  $scope.maxYAxis = maxAssessmentScore;
                }
                var chartData = assessmentSeries.data;
                chartData.push([assessmentRequest.userAssessment.finishedAt.toDate().getTime(), score.score]);
              }
            }
          });

          if($scope.maxYAxis > 0) {
            $scope.chartConfig.yAxis.max = $scope.maxYAxis;
          } else {
            // use max val for empty graphs
            $scope.maxYAxis = 80;
          }

          $scope.chartConfig.series = [];
          for (var series in seriesData) {

            var singleSeriesData = seriesData[series];

            singleSeriesData.data.sort(function(a,b) {
              return a[0] - b[0];
            });

            $scope.chartConfig.series.push(singleSeriesData);
          }

          $scope.loadingAssessmentRequests = false;
          $scope.chartConfig.completeSeries = angular.copy($scope.chartConfig.series);

          if($scope.chartConfig.completeSeries.length == 0){
            $scope.chartConfig.completeSeries = getFakeSeries();
          }
          // This is a hack, as 2-way binding isn't working with highcharts-ng in this app
          $scope.chartsReady = true;
          $scope.displayedAssessment = null;

          if($scope.userAssessmentList.length > 0){
            $scope.userAssessmentList.unshift({longName: 'All Assessments', id: 'all'});
            $scope.displayedAssessment = $scope.userAssessmentList[0];
          } else {
            $scope.upcomingRequests = [];
            $scope.previousRequests = [];
          }
          $scope.updateAssessmentView();
      };

      var getFakeSeries = function(){
        // fake dataset to force the axises to render
        return [
          {
            name: 'hiddenMockData',
            showInLegend: false,
            data:
            [[ + new Date() - (1*24*60*60*1000), 50]],
            visible: false,
          }];
      };

      $scope.showingAssessmentResultsDropdown = false;
      $scope.showingAssessmentEditDropdown = false;

      $scope.updateAssessmentView = function(){
        var selectedAssessments = $scope.assessmentRequests;
        if($scope.displayedAssessment && $scope.displayedAssessment.id != 'all'){
          $scope.chartConfig.series = [];
          selectedAssessments = _.filter($scope.assessmentRequests, {assessmentId: $scope.displayedAssessment.id});
          $scope.chartConfig.yAxis.max = getMaxScore($scope.displayedAssessment);
          var seriesIndex = _.findIndex($scope.chartConfig.completeSeries, {id: $scope.displayedAssessment.id});
          $scope.chartConfig.completeSeries.forEach(function(series){
            if(series.id == $scope.displayedAssessment.id){
              $scope.chartConfig.series.push(series);
            }
          });
          if($scope.chartConfig.series.length == 0){
            $scope.chartConfig.series = getFakeSeries();
          }
        } else {
          $scope.chartConfig.yAxis.max = $scope.maxYAxis;
          $scope.chartConfig.series = $scope.chartConfig.completeSeries;
        }
        $scope.upcomingRequests = [];
        $scope.previousRequests = [];

        var now = moment();

        selectedAssessments.forEach(function(request){

          if(request.userAssessment.status == 'COMPLETE'){
            $scope.previousRequests.push(request);
          } else {
            $scope.upcomingRequests.push(request);
          }
        });

        if($scope.displayedAssessment && $scope.displayedAssessment.id == 'all'){
          $scope.upcomingRequests = _.groupBy($scope.upcomingRequests, function(r){ return r.assessmentId;});
          $scope.previousRequests = _.groupBy($scope.previousRequests, function(r){ return r.assessmentId;});
        }
        // determine first instance of recurring assessments so we only show the tooltip once
        var foundFirstRecurring = false;
        for(var grouping in $scope.upcomingRequests){
          if(!foundFirstRecurring){
            var firstRepeatingIndex = _.findIndex($scope.upcomingRequests[grouping], function(request){ return request.repeating; });
            if(firstRepeatingIndex > -1){
              foundFirstRecurring = true;
              $scope.upcomingRequests[grouping][firstRepeatingIndex].firstRepeating = true;
            }
          }
        }
      };

      var colorSeries = ['#E77D8D','#AB8FBF','#48A3B6','#4BA578','#919640','#C77C4A'];
      function getSeriesColor(index) {

        return colorSeries[index % colorSeries.length];
      }

      function getEmptySeries() {

        return {
          data: [],
          id: 'series1',
          name: 'Score',
          color: '#AAA'
        };
      }

      $scope.activeRoom = null;

      $scope.loadingClient = true;

      $scope.showingEditAppointmentDropdown = false;
      $scope.showingEditHomeworkDropdown = false;

      $scope.sortAppointments = function(){
        $scope.previousAppointments = [];
        $scope.upcomingAppointments = [];
        var now = moment();
        $scope.appointments.forEach(function(appointment){
          var canStart = $scope.canStartAppointment(appointment);
          if(canStart || moment(appointment.finishTime) > now){
            $scope.upcomingAppointments.push(appointment);
          } else {
            $scope.previousAppointments.push(appointment);
          }
          if(canStart && $stateParams.startSession == 'true'){
            $scope.startWebAppointment(appointment);
          }
        });
        $scope.upcomingAppointments = _.sortBy($scope.upcomingAppointments, 'startTime');
        var foundFirstRecurring = false;
        $scope.upcomingAppointments.forEach(function(appt){
          if(!foundFirstRecurring && appt.repeating){
            appt.firstRepeating = true;
            foundFirstRecurring = true;
          }
        });

      };

      var createRecurringInstance = function(appointment){
        var newStart = appointment.startTime.clone().add(appointment.intervalDays, 'days');
        var isException = PractitionerService.evaluateException(appointment, newStart);
        var repeatedAppointment = angular.copy(appointment);
        if(isException){
          repeatedAppointment.cancelled = true;
        }
        repeatedAppointment.startTime = newStart;
        var finishTime = repeatedAppointment.startTime.clone().add(repeatedAppointment.duration, 'm');
        repeatedAppointment.finishTime = moment.tz(finishTime, AccountService.getUserTimeZone());
        return repeatedAppointment;
      };

      $scope.loadAppointments = function() {
        $scope.appointments = [];
        
        // Don't allow non-practitioners to see appointments.
        if (!AccountService.isPractitioner())
          return;
        
        PractitionerService.getAppointmentsForClient($scope.client.account.id)
        .success(function(data) {
          data.forEach(function(appointment) {

            appointment.startTime = moment.tz(appointment.startTime, AccountService.getUserTimeZone());
            var finishTime = appointment.startTime.clone().add(appointment.duration, 'm');
            appointment.finishTime = moment.tz(finishTime, AccountService.getUserTimeZone());
            // create repeating objects

            if(appointment.repeating){
              var isException = PractitionerService.evaluateException(appointment, appointment.startTime);
              if(!isException){
                $scope.appointments.push(appointment);
              }
              var previousAppointment = appointment;
              var repeatedAppointment;
              // create objects in the past

              while(previousAppointment.startTime.diff(moment(), 'd') < appointment.intervalDays){
                repeatedAppointment = createRecurringInstance(previousAppointment);
                if(repeatedAppointment.cancelTime && repeatedAppointment.startTime.isAfter(moment(repeatedAppointment.cancelTime))){
                  break;
                } else {
                  if(!repeatedAppointment.cancelled){
                    $scope.appointments.push(repeatedAppointment);
                  }
                  previousAppointment = repeatedAppointment;
                  previousAppointment.cancelled = false;
                }
              }
              if(!previousAppointment.cancelTime){
                // create forward looking appointments
                var forwardCount = 0;

                while(forwardCount < 3){
                  repeatedAppointment = createRecurringInstance(previousAppointment);
                  if(!repeatedAppointment.cancelled){
                    $scope.appointments.push(repeatedAppointment);
                    forwardCount++;
                  }
                  previousAppointment = repeatedAppointment;
                  previousAppointment.cancelled = false;
                }
              }
            } else {
              $scope.appointments.push(appointment);
            }
          });
          $scope.loadingAppointments = false;
          $scope.sortAppointments();
        })
        .error(function() {
          console.log('There was an error loading appointments.');
          $scope.loadingAppointments = false;
        });
      };

      function loadClientGoals(){
        PractitionerService.getClientGoalContext($scope.clientId)
          .success(function(ctx) {
            $scope.clientGoals = ctx.accountGoals;
            $scope.clientSubGoals = [];
            _.each(ctx.accountSubGoals, function(days){
              _.each(days, function(day){
                $scope.clientSubGoals.push(day);
              });
            });
          });
      }

      function loadClientHabits(){
        PractitionerService.getClientHabits($scope.client)
          .success(function(habits){
            $scope.clientHabits = habits;
          });
      }

      $scope.openHomeworkModal = function(client){

        if (AccountService.isPremiumEnabled() || $scope.isViewingPersonalAccount() || (client && client.account.premium)) {

          OverlayService.modal.open({
            modalId: 'HomeworkModal',
            templateUrl: 'templates/practitioner/edit-homework.html',
            scope: $scope,
            animation: 'slide-in-up',
            ignoreStatusBar: false,
            recordAppseeEvent: false
          }).then(function(modal) {
            $scope.editHomeworkModal = modal;
          });

        } else {
          $scope.showClinicianPremiumModal();
        }

      };

      function loadHomework(){
        loadClientGoals();
        loadClientHabits();
        $scope.client.homeworkRequests = HomeworkService.annotateRequests($scope.client.homeworkRequests);
        $scope.upcomingHomework = _.filter($scope.client.homeworkRequests, function(hw){
          return !hw.finishedAt;
        });
        $scope.completedHomework = _.filter($scope.client.homeworkRequests, function(hw){
          return hw.finishedAt != null;
        });
        $scope.completedHomework = _.sortBy($scope.completedHomework, 'finishedAt');
        $scope.completedHomework.reverse();

        $scope.upcomingHomework = _.sortBy($scope.upcomingHomework, 'requestDate');
        $scope.upcomingHomework.reverse();
      }

      function getGoalText(request){
        var goal = _.find($scope.clientGoals, {id: request.auxiliaryId});
        if(goal)
          return goal.title;
        var subgoal = _.find($scope.clientSubGoals, {id: request.auxiliaryId});
        if(subgoal)
          return subgoal.title;
      }

      function getHealthText(request){
        var habit = _.find($scope.clientHabits, {id: request.auxiliaryId});
        if(habit && habit.name)
          return habit.name;
      }

      $scope.getAuxActivity = function(request){
        if(request.activityCategory == 'GOALS'){
          return getGoalText(request);
        }
        return getHealthText(request);
      };

      $scope.getHwCategoryName = function(request){
        return HomeworkService.getCategoryName(request);
      };

      $scope.getGenericActivityText = function(request){
        switch(request.activityCategory){
          case 'THOUGHTS':
            return $translate.instant('HW_ANY_THOUGHT');
          case 'GOALS':
            return $translate.instant('HW_ANY_GOAL');
          case 'RELAX':
            return $translate.instant('HW_ANY_RELAX');
          case 'HABITS':
            return $translate.instant('HW_ANY_HEALTH');
        }
      };

      $scope.cancelHomework = function(request){
        var confirmPopup = $ionicPopup.confirm({
          template: $translate.instant('CANCEL_HOMEWORK_TEXT'),
          cancelText: $translate.instant('NO_CANCEL_ASSESSMENT'),
          cssClass: 'cancel-assessment',
          cancelType: 'button-default',
          title: $translate.instant('CANCEL_HOMEWORK'),
          okText: $translate.instant('YES_CANCEL_HOMEWORK'),
          okType: 'button-default'
        });
        confirmPopup.then(function(res) {
          if(res) {
            HomeworkService.cancelHomework($scope.clientId, request.id)
              .success(function(data){
                var index = _.findIndex($scope.upcomingHomework, request);
                if(index > -1)
                  $scope.upcomingHomework.splice(index, 1);
              })
              .error(function(err){
                alert('An error occurred');
              });
            }
        });
      };

      $scope.displayCoachInformation = function displayCoachInformation() {
        return $scope.client && ($scope.client.practitionerId != $scope.practitionerId);
      };

      var getClientUser = function(){
        PractitionerService.getUser($scope.clientId)
          .success(function(practitionerClient) {

            $scope.loadingClient = false;
            if(!practitionerClient){
              // on connect this comes back empty bc we re-map the user id
              $state.go('practitioner.clients.refresh');
              return;
            }
            $scope.client = practitionerClient;

            if ($scope.client.practitionerId != $scope.practitionerId) {
              CareteamService.getCoach($scope.client.practitionerId)
                .success(function(currentPractitioner) {
                  $scope.currentPractitioner = currentPractitioner;
                })
                .error(function() {
                  console.log('There was an error retrieving the client\'s practitioner.');
                });
            }
            else {
              $scope.currentPractitioner = AccountService.getAccountUser().practitioner;
            }
            $scope.$broadcast('event:setClient');
            setClientNotificationCount();

            $scope.loadAssessments();
            $scope.loadAssessmentRequests();
            $scope.loadAppointments();
            loadHomework();
            $scope.joinDate = moment($scope.client.account.createdAt).format("M/D/YYYY");
            $scope.communitiesIneligible = false;
            if($scope.client.communitiesIneligible == 'true'){
              $scope.communitiesIneligible = true;
            }
            if($stateParams.startSessionNow == 'true' && !$scope.startedAppt){
              // this this code runs again when the appointment is created, so we want to not launch additional modals
              $scope.startedAppt = true;
              $scope.startWebAppointmentNow($scope.client);
            }
          })
          .error(function() {
            console.log('There was an error loading the user.');
            $state.go('practitioner.clients');
            $scope.loadingClient = false;
          });
      };

      $scope.updateCommunitiesSetting = function(){
        if(!$scope.updatingCommunities){
          $scope.updatingCommunities = true;
          PractitionerService.disableCommunities($scope.client.clientId, $scope.communitiesIneligible)
            .success(function(data){
              $scope.updatingCommunities = false;
              $scope.client.communitiesIneligible = $scope.communitiesIneligible;
            })
            .error(function(err){
              $scope.communitiesIneligible = $scope.client.communitiesIneligible;
              $scope.updatingCommunities = false;
            });
        }
      };

      $scope.changeAssessments = function(assessmentRequest){
        $scope.dismissToolTip('viewed_assessment_edit_tooltip');
        $scope.editAssessment(assessmentRequest);
      };

      $scope.changeAppointments = function(appointment){
        $scope.updateAppointment(appointment, false, true);
        $scope.dismissToolTip('viewed_recurring_appointments_tooltip');
      };

      $scope.resendInviteEmail = function(client) {
        PractitionerService.resendInvite(client)
          .success(function () {
            $ionicPopup.alert({
              template: '<div>Inivitation resent</div>',
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      };

      setPractitionerId = function(){
        $scope.practitionerId = AccountService.getAccountUser().practitioner.id;
      };
      if ($scope.isAppReady()) {
        getClientUser();
        setPractitionerId();
      }
      else {
        $scope.$on('event:pacificaReady', function(){
          setPractitionerId();
          getClientUser();
        });
      }

      function setClientNotificationCount(){
        if(!$scope.client)
          return;
        $scope.clientNotificationCount = PractitionerService.clientNotificationCount($scope.client);
      }

      $rootScope.$on('event:homeworkAdded', function(data, hw){
        $scope.upcomingHomework.unshift(hw);
        if(hw.activityCategory && hw.activityCategory == 'GOALS')
          // refresh goals
          loadClientGoals();
      });

      $rootScope.$on('event:appointmentsUpdated', getClientUser);
      $rootScope.$on('event:appointmentCancelled', getClientUser);
      $rootScope.$on('event:assessmentsUpdated', $scope.loadAssessmentRequests);

      // this fixes issue where browser forward click isn't captured when switching
      // from one client to another.
      $scope.$watch(function(){ return $location.path(); }, function(newVal, oldVal){
        newId = newVal.split('/')[3];
        oldId = oldVal.split('/')[3];
        if(newId != oldId){
          $scope.clientId = parseInt(newId);
          getClientUser();
        }
      }, true);
  
      $scope.getMaxChatLength = function getMaxChatLength(){
        if(AccountService.isAnyCoach()){
          return 4000;
        }
        return 512;
      };

    }
  ]);

  ctrl.controller('ClientsCtrl', ['$scope', '$rootScope', '$controller', '$state', '$stateParams', '$timeout', '$translate', '$ionicPopup', 'AccountService', 'PractitionerService', 'HabitsService',
    function ($scope, $rootScope, $controller, $state, $stateParams, $timeout, $translate, $ionicPopup, AccountService, PractitionerService, HabitsService ) {

      $scope.errorMessage = undefined;
      $scope.showingSortClientDropdown = false;
      $scope.sortBy = 'nextAppointment';
      $scope.filterBy = 'active';
      $scope.reverseSort = false;
      $scope.showDisconnected = false;
      $scope.filteredClients = [];
      $scope.showFilterDropdown = false;
      $scope.deletedContent = [];
      $scope.showTooltips = false;

      if($state.current.name.indexOf('refresh') > -1){
        // may need to refresh clients if a newly paired client exists
        $state.go('practitioner.clients').then(window.location.reload);
        return;
      }

      PractitionerService.initAssessmentFunctionality($scope);

      $controller('VideoChatCtrl', {$scope: $scope});

      $scope.loadAssessments();

      $scope.filterOptions = ['active', 'inactive', 'all'];

      var getDemoClient = function(){
        return _.findIndex($scope.activeClients, {fullName: 'Demo Client'});
      };


      $scope.getClientNotificationCount = function getClientNotificationCount(client) {
        return PractitionerService.clientNotificationCount(client);
      };

      $scope.hasDeletedContent = function(clientId){
        return $scope.deletedContent.indexOf(clientId) > -1;
      };

      $scope.shouldShowTooltips = function(){
        if($scope.filterBy == 'inactive')
          return false;
        var demoClientIndex = getDemoClient();
        if(demoClientIndex > -1){
          if($scope.activeClients.length == 1){
            return false;
          } else if($scope.activeClients.length == 2){
            var demoUser = $scope.activeClients[demoClientIndex];
            $scope.activeClients.splice(demoClientIndex, 1);
            $scope.activeClients.unshift(demoUser);
            return true;
          }
        } else if ((demoClientIndex < 0) && $scope.activeClients.length == 1){
          return true;
        }
        return false;
      };

      $scope.deleteAllForClient = function(clientId){
        PractitionerService.deleteAllForClient(clientId)
        .success(function(){
          $scope.deletedContent.push(clientId);
          $scope.refreshClients();
        });
      };

      $scope.navigateToAppointment = function(client){
        $scope.goToClientStartAppointment(client.account.id);
      };

      $scope.toggleShowingSortClientDropdown = function(){
        $scope.showingSortClientDropdown = !$scope.showingSortClientDropdown;
      };

      $scope.goToClientStartAppointment = function(clientId) {
        $state.go('practitioner.client.view',{clientId: clientId, startSession: true});
      };

      $scope.goToClientStartAppointmentNow = function(clientId) {
        $state.go('practitioner.client.view',{clientId: clientId, startSessionNow: true});
      };

      $scope.getFilterByLabel = function(filterBy){
        switch(filterBy){
          case 'active':
            return $translate.instant('YOUR_ACTIVE_CLIENTS');
          case 'inactive':
            return $translate.instant('YOUR_INACTIVE_CLIENTS');
          case 'all':
            return $translate.instant('YOUR_CLIENTS_ALL');
        }
      };

      $scope.getFilterCount = function(filterBy){
        if($scope.clients){
          if(filterBy == 'active'){
            return $scope.activeClients.length;
          } else if(filterBy == 'inactive'){
            return $scope.inactiveClients.length;
          } else {
            return $scope.clients.length;
          }
        }
      };

      $scope.filterClients = function(filterBy){
        if(filterBy){
          $scope.filterBy = filterBy;
        }
        $scope.activeClients = _.filter(
            $scope.clients, function(client){return (client.status == 'CONNECTED' || client.status == 'INVITED');});
        $scope.inactiveClients = _.filter($scope.clients, function(client){ return client.status == 'DISCONNECTED';});

        $scope.showingClientDropdown = false;
        $scope.sortClients();

        $scope.setupFilterSet();
      };

      $scope.setupFilterSet = function(filterBy){
        if(filterBy){
          $scope.filterBy = filterBy;
        }
        if($scope.filterBy == 'active'){
          $scope.filteredClients = $scope.activeClients;
        } else if($scope.filterBy == 'inactive'){
          $scope.filteredClients = $scope.inactiveClients;
        } else {
          $scope.filteredClients = $scope.clients;
        }

        if ($scope.updateClientAssessmentGraph)
          $scope.updateClientAssessmentGraph($scope.filteredClients, $scope.graphAssessment.id);
      };

      $scope.sortClients = function(sortBy) {
        if(sortBy == $scope.sortBy){
          $scope.reverseSort = !$scope.reverseSort;
        }
        if(sortBy){
          $scope.sortBy = sortBy;
        }
        var c;
        var d;
        $scope.filteredClients.sort(function(a,b) {
          if($scope.sortBy == 'nextAppointment' || $scope.sortBy == 'lastActivity'){
            if($scope.sortBy == 'nextAppointment'){
              c = a.nextAppointment ? a.nextAppointment.startTime : null;
              d = b.nextAppointment ? b.nextAppointment.startTime : null;
            } else {
              c = a.lastActivity;
              d = b.lastActivity;
            }
            if(c && d){
              if($scope.sortBy == 'nextAppointment'){
                if(moment(c).isBefore(moment(d))){
                  return -1;
                } else {
                  return 1;
                }
              } else {
                if(moment(c).isAfter(moment(d))){
                  return -1;
                } else {
                  return 1;
                }
              }
            } else if(!c && d){
              return 1;
            } else if(!d && c){
              return -1;
            }
          }
          else if ($scope.sortBy == 'lastAssessment') {

            if (a.lastAssessment && b.lastAssessment) {
              if(moment(a.lastAssessment.userAssessment.finishedAt).isBefore(moment(b.lastAssessment.userAssessment.finishedAt))) {
                  return 1;
                } else {
                  return -1;
                }
            }
            else if (a.lastAssessment) {
              return -1;
            }
            else if (b.lastAssessment) {
              return 1;
            }
            else {
              return 0;
            }
          }
          if (a.account.lastName.toLowerCase() < b.account.lastName.toLowerCase())
            return -1;
          else if (a.account.lastName.toLowerCase() > b.account.lastName.toLowerCase())
            return 1;
          else {
            if (a.account.firstName.toLowerCase() < b.account.firstName.toLowerCase())
              return -1;
            else if (a.account.firstName.toLowerCase() > b.account.firstName.toLowerCase())
              return 1;
          }

          return 0;
        });

        if($scope.reverseSort){
          $scope.filteredClients.reverse();
        }
      };

      $scope.resendInviteEmail = function(client) {
        PractitionerService.resendInvite(client)
          .success(function () {
            $ionicPopup.alert({
              template: '<div>Inivitation resent</div>',
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      };

      $scope.disconnect = function disconnect(client) {

        var confirmPopup = $ionicPopup.confirm({
          template: 'Are you sure you want to remove <strong>' + client.fullName + '</strong>?',
          cancelText: $translate.instant('CANCEL'),
          cancelType: 'button-default',
          okText: $translate.instant('REMOVE'),
          okType: 'button-default'
        });

        confirmPopup.then(function(res) {
          if(res) {
            PractitionerService.disconnectClient(client)
              .success(function() {
                client.status = 'DISCONNECTED'  ;
                client.createdAt = new Date().getTime();
                $scope.refreshClients(initClients);
              })
             .error(function() { });
          } else {
            console.log('You are not sure');
          }
        });
      };

      var clinicianHasAppointments = function(){
        var hasAppointments = false;
        if($scope.clients){
          $scope.clients.forEach(function(client){
            if(client.nextAppointment){
              hasAppointments = true;
            }
          });
        }
        return hasAppointments;
      };

      var lastClientIsUninvited = function(){
        var lastClientIsUninvited = false;
        if($scope.clients && $scope.clients.length){
          lastClientIsUninvited = $scope.clients[$scope.clients.length - 1].status != 'CONNECTED';
        }
        return lastClientIsUninvited;
      };

      var initClients = function(){
        $scope.filterClients();
        $scope.setupFilterSet();
        $scope.sortClients();
        $scope.showTooltips = $scope.shouldShowTooltips();
        $scope.hasAppointments = clinicianHasAppointments();
        $scope.uninvitedClient = lastClientIsUninvited();
        $scope.chartsReady = !$scope.chartsReady ? 1 : $scope.chartsReady + 1;
      };

      function reinitializeController() {
        if (!AccountService.isLoggedIn()) {
          $state.go('app.login');
          return;
        } else if (!AccountService.isPractitioner()) {
          $state.go('app.home');
          return;
        }
        // from app.js
        $scope.showAgreement();
        initClients();
      }

      if ($scope.isAppReady()) {
        reinitializeController();
      }
      else {
        $scope.$on('event:pacificaReady', reinitializeController);
      }

      $scope.getTimeFormatted = function(time){
        return moment(time).format('M/D') + ' at ' + moment(time).format('hh:mmA');
      };

      $scope.updateAssessmentView = function updateAssessmentView() {

        if ($scope.graphAssessment.id > 0)
          AccountService.setUserPreference('practitioner_last_overview_assessment', $scope.graphAssessment.id);

        $scope.updateClientAssessmentGraph($scope.graphAssessment.id);
      };

      $scope.getAssessmentShortName = function getAssessmentShortName(assessmentId) {

        if (!$scope.assessments)
          return '';

        var assessment =  _.find($scope.assessments, {id: +assessmentId});

        if (assessment)
          return assessment.shortName;
        else
          return '';
      };

      $scope.getAssessmentLongName = function getAssessmentLongName(assessmentId) {

        if (!$scope.assessments)
          return '';

        var assessment =  _.find($scope.assessments, {id: +assessmentId});

        if (assessment)
          return assessment.longName;
        else
          return '';
      };

      $scope.getDisplayedAssessmentShortName = function getDisplayedAssessmentShortName() {

        if ($scope.graphAssessment.id > 0)
          return $scope.getAssessmentShortName($scope.graphAssessment.id);

        return '';
      };

      $scope.getLastAssessmentName = function getLastAssessmentName(client) {

        var assessmentData = client.lastAssessment;
        if (assessmentData) {

          return $scope.getAssessmentShortName(assessmentData.assessmentId);
        }
      };

      $scope.getLastMoodDisplay = function getLastMoodDisplay(client) {

        var moodData = client.moodData;
        if (moodData && moodData.length > 0) {

          var lastMoodEntry = moodData[moodData.length - 1];
          return HabitsService.getHabitDisplayFromData(lastMoodEntry);
        }
      };

      $scope.getLastMoodClass = function getLastMoodClass(client) {

        var moodData = client.moodData;
        if (moodData && moodData.length > 0) {

          var lastMoodEntry = moodData[moodData.length - 1];
          return HabitsService.getMoodClassFromData(lastMoodEntry);
        }
      };

      $scope.getDateDisplay = function(time){
        var today = moment().startOf('day');
        var yesterday = moment().subtract(1, 'days').startOf('day');
        var tomorrow = moment().add(1, 'days').startOf('day');
        var week = moment().add(7, 'days').startOf('day');

        if(moment(time).isSame(yesterday, 'd')){
          return 'Yesterday, ' + $scope.getTimeFormatted(time);
        }
        if(moment(time).isSame(today, 'd')){
          return 'Today, ' + $scope.getTimeFormatted(time);
        }
        if(moment(time).isSame(tomorrow, 'd')){
          return 'Tomorrow, ' + $scope.getTimeFormatted(time);
        }
          if(moment(time) < yesterday || moment(time) > week){
          return $scope.getTimeFormatted(time);
        }

        return moment(time).format('dddd') + ', ' + $scope.getTimeFormatted(time);
      };

      $scope.$watch('clients', function(){
        initClients();
      });

      //on bootstrap, sometimes clients haven't loaded yet, so the page is empty
      $rootScope.$on('event:clientsLoaded', function(){
        initClients();
      });

    }
  ]);
})();

(function() {

  var ctrl = angular.module('findClientsCtrl', []);

  ctrl.controller('FindClientsCtrl', ['$scope', 'AccountService', '$translate', '$sce', 'PractitionerService', '$controller', '$rootScope', '$stateParams',
    function ($scope, AccountService, $translate, $sce, PractitionerService, $controller, $rootScope, $stateParams) {

      $controller('VideoChatCtrl', {$scope: $scope});
      $scope.showClientTooltip = false;

      $scope.updateClientTooltipVisibility = function(val){
        $scope.showClientTooltip = val;
      };

      function startConsultation(id){
        var consult = _.find($scope.futureConsultations, function(consultation){
          return consultation.id == id;
        });
        if(consult && $scope.canStartAppointment(consult)){
          $scope.startWebAppointment(consult);
        }
      }

      function reinitializeController(){
        $scope.directoryVisibleMsg = $sce.trustAsHtml($translate.instant("DIRECTORY_VISIBLE_MESSAGE"));
        $scope.directoryHiddenMsg = $sce.trustAsHtml($translate.instant("DIRECTORY_HIDDEN_MESSAGE"));

        updateAccountUser();
        setDirectoryStatusText();
        $scope.findNewClientsRibbon = $sce.trustAsHtml($translate.instant("FIND_NEW_CLIENTS_RIBBON"));
        loadAppointments();
        PractitionerService.clearConsultationNotifications();
      }

      function loadAppointments(){
        PractitionerService.getAppointments(new Date(2015,1,1), new Date(2020,1,1)).success(function(appointments) {
          var consultations = _.sortBy(
              (_.filter(appointments, function(appt){
                return appt.appointmentType == "CONSULTATION" && appt.clientId;})
              ), 'startTime');
          consultations.reverse();
          $scope.pastConsultations = [];
          $scope.futureConsultations = [];
          consultations.forEach(function(consult){
            var endTime = moment(consult.startTime).add(consult.duration, 'm');
            if(endTime.isBefore(moment())){
              $scope.pastConsultations.push(consult);
            } else {
              $scope.futureConsultations.push(consult);
            }
          });
          $scope.futureConsultations = _.sortBy($scope.futureConsultations, 'startTime');
          $scope.pastConsultations = (_.sortBy($scope.pastConsultations, 'startTime')).reverse();

          // figure out if we need to show add client button
          var index;
          var client;
          $scope.pastConsultations.forEach(function(consultation){
            index = _.findIndex($scope.clients, function(client){
              return consultation.clientId == client.clientId;
            });
            if(index == -1){
              index = _.findIndex($scope.clients, function(client){
                return consultation.email == client.account.email && client.status == 'INVITED';
              });
            }
            if(index > -1){
              client = $scope.clients[index];
              consultation.clientStatus = client.status.charAt(0) + client.status.toLowerCase().slice(1);
            }
          });
          var startSession = $stateParams.startSession;
          if(startSession){
            startConsultation(startSession);
          }
        });
      }

      $scope.addClientPrefilled = function(consult){
        $scope.newClient({
          firstName: consult.firstName,
          lastName: consult.lastName,
          email: consult.email
        });
      };

      function updateAccountUser() {
        $scope.accountUser = AccountService.getAccountUser();
        if(!$scope.accountUser.practitioner){
          // we're not ready yet
          return;
        }
        // make sure we have this info before we redirect
        if($scope.accountUser.user){
          if(!$scope.isPractitioner()){
            $state.go('app.home');
          }
        }
      }

      $scope.updateListingVisibility = function(setting){
        PractitionerService.updateDirectoryVisibility(setting)
          .success(function(resp){
            $scope.accountUser = AccountService.getAccountUser();
            setDirectoryStatusText();
          })
          .error(function(err){
            console.log(err);
          });
      };

      function setDirectoryStatusText(){
        var text = '';
        if($scope.accountUser.practitioner.publicDirectory){
          text = $translate.instant("FIND_CLIENTS_VISIBLE");
        } else if($scope.accountUser.practitioner.pendingApproval){
          text = $translate.instant("PENDING_APPROVAL");
        } else {
          text = $translate.instant("DIRECTORY_HIDDEN_MESSAGE");
        }

        $scope.directoryStatusText = $sce.trustAsHtml(text);
      }

      function removeDeletedConsultation(consult){
        var index = _.findIndex($scope.futureConsultations, function(future){
          return future.id == consult.id;
        });
        if(index > -1){
          $scope.futureConsultations.splice(index);
        }
      }

      if ($scope.isAppReady()) {
        reinitializeController();
      }
      else {
        $scope.$on('event:pacificaReady', reinitializeController);
      }

      $rootScope.$on('event:appointmentCancelled', function(ev, args){
        removeDeletedConsultation(args.appointment);
      });

  }]);

})();

(function() {

	var ctrl = angular.module('homeworkModalCtrl', []);

	ctrl.controller('HomeworkModalCtrl', ['$scope', 'AccountService','PractitionerService', '$translate', 'HomeworkService', 'GoalsService', 'ActivityService',
		function ($scope, AccountService, PractitionerService, $translate, HomeworkService, GoalsService, ActivityService) {

			$scope.homework = { reminder: "0", reminderDate: moment().add(1, 'd') };
			// for goal suggestions
			$scope.showSuggestions = false;

			// Initialize Category Names
			$translate(['MEDITATION', 'THOUGHT_ENTRY', 'HEALTH_HABIT', 'GOAL']).then(function(translations) {
			  $scope.homeworkTypeOptions = [
			    {id:1, type: 'meditation', label: translations.MEDITATION },
			    {id:2, type: 'thought', label: translations.THOUGHT_ENTRY },
			    {id:3, type: 'health', label: translations.HEALTH_HABIT },
			    {id:4, type: 'goal', label: translations.GOAL }
			  ];
			  $scope.homework.type = $scope.homeworkTypeOptions[0];
			});

			$scope.toggleShowSuggestions = function(val){
				$scope.showSuggestions = val;
			};

			$scope.goalCategories = GoalsService.getCategoryOrder();
			$scope.subGoalKeys = GoalsService.getSubGoalKeys();

			$scope.selectGoal = function selectGoal(subGoalKey){
				$scope.homework.newSubGoal = $translate.instant(subGoalKey);
			};

			function getValidHomeworkActivities(client, activityType) {

				var validActivities = [];

				if (activityType == 'thoughts' || activityType == 'relax') {
					validActivities = _.filter(ActivityService.activities, function(a) {
						var noDisplayKey = !_.has(a, 'displayKey');
						if (a.type == 'goals' || noDisplayKey || a.excludeFromHw) {
							return false;
						}
					  return a.type == activityType;
					});
				}

			  // Habits not use accountService, so we need to fetch them here.
			  if (activityType == 'habits') {
			  	PractitionerService.getClientHabits($scope.client)
			  		.success(function(habits) {
			  			_.each(habits, function(habit){
			  				if (habit.id != 1) {
			  					validActivities.push({title: habit.name, habitId: habit.id, type: 'habits'});
			  				}
			  			});
			  		});
			  }

			  if (activityType == 'relax')
			    validActivities.unshift({displayKey: 'ANY_MEDITATION'});
			  if (activityType == 'thoughts')
			    validActivities.unshift({activityDisplay: 'ANY_THOUGHT_ENTRY'});
			  if (activityType == 'habits')
			  	validActivities.unshift({title: 'Any Health Habit'});

			  return validActivities;
			}

			$scope.toggleReminder = function toggleReminder(val) {
				$scope.homework.reminder = ($scope.homework.reminder == "1") ? "0" : "1";
				if (!$scope.$$phase) {
					$scope.$apply();
				}
			};

			$scope.getReminderDateTz = function getReminderDateTz(dateVal) {
				return moment(dateVal).zoneAbbr();
			};

			$scope.getConfirmationDateDisplay = function getConfirmationDateDisplay(dateVal) {
				return moment(dateVal).format('h:mm zz on MMMM D, YYYY');
			};

			// Initialize Activity Data
			$scope.relaxActivities = getValidHomeworkActivities($scope.client, 'relax');
			$scope.thoughtActivities = getValidHomeworkActivities($scope.client, 'thoughts');
			$scope.healthActivities = getValidHomeworkActivities($scope.client, 'habits');

			$scope.homework.exercise = $scope.relaxActivities[0];

			$scope.$watch('homework.type', function(newVal, oldVal) {
			  // Kind of hacky, but we need to update the (default) selected exercise after switching the type
			  if (newVal.type == 'meditation')
			    $scope.homework.exercise = $scope.relaxActivities[0];
			  if (newVal.type == 'thought')
			    $scope.homework.exercise = $scope.thoughtActivities[0];
			  if (newVal.type == 'health')
				$scope.homework.exercise = $scope.healthActivities[0];
			});

	    $scope.getSelectedActivityId = function getSelectedActivityId(homework) {
	      try {

	        if (homework.exercise.id) {
	          return homework.exercise.id;
	        }

	        var activityKey = homework.exercise.activity;
	        var activityId = ActivityService.activities[activityKey].id;
	        return activityId;
	      } catch (e) {
	        return '';
	      }
	    };

	    $scope.getHomeworkScreenshot = function(homework) {
	      return HomeworkService.getHomeworkScreenshot(homework);
	    };

	    $scope.getDescriptionKey = function(homework) {

	    	var displayKey = homework.exercise.displayKey;
	    	var hwType = homework.type.type;
	    	var isSpecificMeditation = hwType === 'meditation' && displayKey != 'ANY_MEDITATION';
	    	var isSpecificThoughtEntry = hwType === 'thought' && displayKey != 'ANY_THOUGHT_ENTRY';

	    	//  Kind of messy, but these two meditations use a different name convention for the translation strings than the rest...
	    	if (displayKey === "RELAX_VISUALIZE_HELP_TITLE")
	    		return "RELAX_ACTIVITY_VISUALIZATION_DESCRIPTION";
	    	if (displayKey === "UNGUIDED_MEDITATION_DISPLAY")
	    		return "RELAX_ACTIVITY_SOUNDSCAPE_MODE_DESCRIPTION";

	    	if (isSpecificMeditation) {
				return homework.exercise.displayKey + "_DESCRIPTION";
	    	}

	    	if (isSpecificThoughtEntry) {
	    		return homework.exercise.descriptionDisplayKey;
	    	}

	    	if (hwType === 'health') {
	    		return 'Your client will be prompted to track this health habit within the Sanvello mobile app.';
	    	}

	    	if (hwType === 'goal') {
	    		return 'Your client will be prompted to completed this goal within the Sanvello mobile app.';
	    	}
	    };

	    function getActivityCategory(type){
	    	if(type == 'goal')
	    		return 'goals';
	    	if(type == 'health')
	    		return 'habits';
	    	if(type == 'meditation')
	    		return 'relax';
	    	if(type == 'thought')
	    		return 'thoughts';
	    }

	    $scope.closeHomeworkModal = function(){
	    	$scope.closeEditHomeworkModal();// from controller, let it know it's closed.
	    	$scope.showHomeworkConfirmationText = false;
	    };

	    $scope.saveHomework = function saveHomework(homework) {

	      var activityId = $scope.getSelectedActivityId(homework);
	      var clientId = $scope.client.clientId;
	      var activityCategory = getActivityCategory(homework.type.type);
	      var newSubGoal = homework.newSubGoal;

	      var reminderDate;
	      if (homework.reminder == '1')
	        reminderDate = homework.reminderDate;

	      var auxiliaryId;
	      if (homework.type.type === 'health') {
	        if (homework.exercise.habitId)
	          auxiliaryId = homework.exercise.habitId;
	      }

	      PractitionerService.saveHomeworkInternal(clientId, activityCategory, activityId, auxiliaryId, newSubGoal, reminderDate)
	        .success(function(homework) {
	        	HomeworkService.addRequest(homework);
		          $scope.showHomeworkConfirmationText = true;
	        })
	        .error(function() {
	          console.log('failed to save homework assignment');
	        });
	    };
	  }
  ]);
})();

(function() {

  var ctrl = angular.module('scheduleCtrl', []);
  ctrl.directive('onFinishRender', [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function() {
              scope.$emit(attr.onFinishRender);
            });
          }
        }
      };
    }
  ]);

  ctrl.controller('ScheduleCtrl', [
    '$scope',
    '$state',
    '$timeout',
    '$translate',
    '$sce',
    '$ionicModal',
    '$ionicPopup',
    'AccountService',
    'PractitionerService',
    'GeneralService',
    'uiCalendarConfig',
    '$rootScope',
    function($scope, $state, $timeout, $translate, $sce, $ionicModal, $ionicPopup, AccountService, PractitionerService, GeneralService, uiCalendarConfig, $rootScope) {
      $scope.events = [];
      $scope.appointmentsLoaded = false;

      $scope.calendarLoaded = false;

      var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

      function drawDot(context, data) {
        context.beginPath();
        context.arc(data.x, data.y, data.amount, 0, 2 * Math.PI, false);

        // To get alpha
        var rgb = hexToRgb(data.color);
        var localRGBString = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
        context.fillStyle = localRGBString;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "#666666";
        context.stroke();
      }

      function drawLine(context, data1, data2) {
        context.beginPath();
        context.moveTo(data1.x, data1.y);
        context.lineTo(data2.x, data2.y);
        context.strokeStyle = "black";
        context.stroke();
      }

      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $scope.clients.forEach(function(client) {
          var canvas = document.getElementById(client.clientId.toString());
          var context = canvas.getContext('2d');
          context.fillStyle = "rgba(255, 255, 255, 1)";
          context.fillRect(0, 0, canvas.width, canvas.height);

          var startMS = new Date().getTime();
          var widthInMS = 7 * MILLISECONDS_IN_DAY;
          var dots = [];
          var lastDot;
          for (var i = 0; i < client.habitData.length; ++i) {
            var moodRating = client.habitData[i];
            var moodRatingDate = new Date(moodRating.experiencedAtStr);
            var color = GeneralService.COLORS[7 - moodRating.valueInt];
            var x = canvas.width * ((startMS - moodRatingDate.getTime()) / widthInMS);
            var y = canvas.height * 0.1 + (canvas.height * 0.8) * (7 - moodRating.valueInt) / 6;
            var dot = {
              x: x,
              y: y,
              amount: 5,
              color: color
            };
            dots.push(dot);
            if (lastDot) {
              drawLine(context, dot, lastDot);
            }
            lastDot = dot;
          }
          if (lastDot)
            drawLine(context, lastDot, {
              x: 0,
              y: canvas.height / 2
            });

          dots.forEach(function(dot) {
            drawDot(context, dot);
          });
        });
      });

      // This looks like unused code. The userId -> clientId is wrong too as clientId is accountId.
      // $scope.viewHistory = function viewHistory(client) {
      //   $state.go('practitioner.progress', {
      //     viewingOtherUser: true,
      //     userId: client.clientId
      //   });
      // };

      $scope.getBaaTitle = function getBaaTitle() {

        var text = $translate.instant('PLEASE_SIGN_BAA');

        return $sce.trustAsHtml(text);
      };

    var buildCalendarItem = function(appointment){
      var itemClasses = [appointment.appointmentType.toLowerCase()];
      var end = appointment.startTime.clone().add(appointment.duration, 'm');
      if(!end.isAfter(moment())){
        itemClasses.push('old-event');
      }
      var title = appointment.firstName + ' ' + appointment.lastName;
      if(appointment.appointmentType == 'CONSULTATION' && !appointment.clientId){
        title = 'Open Consultation';
      }
      return {
        start: appointment.startTime,
        end: end,
        title: title,
        appointment: appointment,
        className: itemClasses,
        stick: true
      };
    };

    var dateInCalendar = function(dateToCompare){
      return dateToCompare.isAfter($scope.calendarStart) && dateToCompare.isBefore($scope.calendarEnd);
    };

    var getEventIndex = function(eventToCompare, compareStart){
      var index = -1;
      if($scope.events.length){
        index = _.findIndex($scope.events, function(ev){
          if(compareStart){
            return ev.appointment.id == eventToCompare.appointment.id && ev.start.isSame(eventToCompare.start);
          } else {
            return ev.appointment.id == eventToCompare.appointment.id;
          }
        });
      }
      return index;
    };

    $scope.loadAppointments = function() {
      PractitionerService.getAppointments(new Date(2015,1,1), new Date(2020,1,1)).success(function(appointments) {
        $scope.appointments = [];
        var calendarItem;
        appointments.forEach(function(appointment) {

          appointment.startTime = moment.tz(appointment.startTime, AccountService.getUserTimeZone());
          appointment.end = moment.tz(appointment.startTime.clone().add(appointment.duration, 'm'),  AccountService.getUserTimeZone());
          if(!$scope.calendarStart){
            $scope.calendarStart = moment().startOf('week');
            $scope.calendarEnd = moment().endOf('week');
          }
          if(appointment.repeating){
            var newStart = PractitionerService.getFirstRecurringInstance(appointment, $scope.calendarStart);
            // let's see if next date is in start time
            if(!newStart.isSame(appointment.startTime)){
              // make sure this gets added to the appointments array with original start time for subsequent renders
              $scope.appointments.push(appointment);
            }
            if(!(dateInCalendar(newStart))){
              $scope.appointments.push(appointment);
              newStart = newStart.clone().add(appointment.intervalDays, 'd');
            }
            while(dateInCalendar(newStart)){
              if(appointment.cancelTime && newStart.isAfter(appointment.cancelTime)){
                break;
              }
              var isException = PractitionerService.evaluateException(appointment, newStart);
              var newAppointment = angular.copy(appointment);

              if(appointment.appointmentType !== 'CONSULTATION' && !isException || appointment.appointmentType == 'CONSULTATION' && shouldShowConsultation(appointment, newStart) && !isException){
                newAppointment.startTime = newStart;
                newAppointment.end = newStart.clone().add(appointment.duration, 'm');
                item = buildCalendarItem(newAppointment);
                var itemIndex = getEventIndex(item, true);
                if(itemIndex == -1){ // this event doesn't exist yet
                  $scope.events.push(item);
                  $scope.appointments.push(newAppointment);
                }
              } else if(newStart.isSame(appointment.startTime)){
                // first recurring has been cancelled, still need it in appointments array though
                $scope.appointments.push(appointment);
              }
              newStart = newStart.clone().add(appointment.intervalDays, 'd');
            }
          } else {

            // don't show past unclaimed consultations
            if(appointment.appointmentType != 'CONSULTATION' || (appointment.appointmentType == 'CONSULTATION'  && shouldShowConsultation(appointment, appointment.startTime))){
              item = buildCalendarItem(appointment);
              var itemNdx = getEventIndex(item, false);
              if(itemNdx == -1){
                $scope.events.push(item);
                $scope.appointments.push(appointment);
              } else {
                $scope.events[itemNdx] = item;
              }
            }
          }
        });
        $scope.eventSources = [$scope.events];
        $scope.appointmentsLoaded = true;
        $scope.initialLoad = false;

      }).error(function() {
        console.log('an error occurred retrieving appointments');
      });
    };

    function shouldShowConsultation(appt, startTime){
      if(appt.clientId){
        return true;
      } else if(startTime.clone().add(appt.duration, 'm').isAfter(moment())){
        return true;
      }
      return false;
    }

    $scope.clickToJoin = function(clientId){
      if($scope.editAppointmentModal != undefined){
        $scope.closeEditAppointmentModal();
      }
      $scope.goToClient(clientId);
    };

    var setPractitionerUserId = function(){
      $scope.practitionerUserId = AccountService.getAccountUser().user.id;
    };


    var onCalendarEventClick = function(calEvent, jsEvent, view) {
      if(!calEvent.end.isAfter(moment())){
        // if it's an old event, don't open the dialog
        return;
      }
      if(calEvent.appointment.appointmentType == 'CONSULTATION' && calEvent.appointment.clientId){
        $scope.showConsultConfirmation(calEvent.appointment);
      } else {
        $scope.updateAppointment(calEvent.appointment, calEvent.appointment.repeating);
      }
    };
    var onCalendarSelect = function(start, end, jsEvent, view){
      if($scope.clients.length == 0)
        return;
      start = moment.tz(start, AccountService.getUserTimeZone());
      var now = moment.utc();
      var offset = moment.tz.zone(AccountService.getUserTimeZone()).offset(now);
      start.add(offset, 'm');
      if(start.isAfter(moment())){
        $scope.newAppointment();
        $scope.editAppointment.startTime = start;
        $scope.editAppointment.startDate = start;
      } else {
        return;
      }
    };

    var renderCallback = function(){
      if(uiCalendarConfig.calendars.hasOwnProperty('mainCalendar')){
        $scope.calendarLoaded = true;
        var calendar = uiCalendarConfig.calendars.mainCalendar.fullCalendar('getView');
        if(calendar.hasOwnProperty('start')){
          $scope.calendarStart = calendar.start;
          $scope.calendarEnd = calendar.end;
        }
        $scope.appointments.forEach(function(appointment){
          var eventCreated;
          if(appointment.repeating){
            var newStart = PractitionerService.getFirstRecurringInstance(appointment, $scope.calendarStart);
            while(dateInCalendar(newStart)){
              if(appointment.endTime && newStart.isAfter(appointment.cancelTime)){
                break;
              }
              var isException = PractitionerService.evaluateException(appointment, newStart);

              var appointmentCreated = _.find($scope.appointments, function(appt){
                return (appt.startTime.diff(newStart) == 0 && appt.id == appointment.id);});

              eventCreated = _.find($scope.events, function(ev){
                return (ev.appointment.startTime.diff(newStart) == 0 && ev.appointment.id == appointment.id);
              });

              if(!eventCreated && !isException){
                if(appointment.appointmentType != 'CONSULTATION' || appointment.appointmentType == 'CONSULTATION' && shouldShowConsultation(appointment, newStart)){
                  var newAppointment = angular.copy(appointment);
                  newAppointment.startTime = newStart;
                  newAppointment.end = newStart.clone().add(appointment.duration, 'm');
                  item = buildCalendarItem(newAppointment);
                  $scope.events.push(item);
                  if(!appointmentCreated){
                    $scope.appointments.push(newAppointment);
                  }
                }
              }
              newStart = newStart.clone().add(appointment.intervalDays, 'd');
            }
          } else {
            eventCreated = _.find($scope.events, function(ev){
              return (ev.appointment.startTime.diff(appointment.startTime) == 0 && ev.appointment.id == appointment.id);
            });
            if(!eventCreated){
              item = buildCalendarItem(appointment);
              $scope.events.push(item);
            }
          }
        });
      }
      // After the week range is rendered, scroll to approximately 7am
      $timeout(function() {
        $('.fc-scroller').scrollTop(305);
      }, 0);
    };

    function setupCalendarConfig(){
      var locale = AccountService.getLocale();
      $scope.uiConfig = {
        calendar:{
          locale: locale,
          defaultView: 'agendaWeek',
          allDaySlot: false,
          height: ($(window).height() - 240),
          editable: true,
          selectable: true,
          header:{
            left: 'prev agendaWeek month next',
            center: 'title',
            right: ''
          },
          eventClick: onCalendarEventClick,
          select: onCalendarSelect,
          eventBackgroundColor: 'rgb(76,151,22)',
          eventBorderColor: '#67ca9e',
          eventTextColor: '#fff',
          timeFormat: 'h(:mm)t',
          eventStartEditable: false,
          viewRender: renderCallback,
          eventDurationEditable: false,
          // scroll bar was disappearing, this turns it back on (lame) -lw
          eventAfterAllRender: function(view){ $('.fc-scroller').css('overflow-y', 'scroll');}
        }
      };
    }

    function reinitializeController() {
      if (!AccountService.isLoggedIn()) {
        $state.go('app.login');
        return;
      } else if ( !(AccountService.isPractitioner() || AccountService.isAnyCoach()) ) {
        $state.go('app.home');
        return;
      }
      $scope.initialLoad = true;
      setPractitionerUserId();
      setupCalendarConfig();
      $scope.loadAppointments();
    }

    var removeFromAppointmentsArray = function(appointment){
        var apptIndex = _.findIndex($scope.appointments, function(appt){
        if(appointment.exceptionTime){
          return appt.id == appointment.id && appt.startTime.isSame(appointment.exceptionTime);
        } else {
          return appt.id == appointment.id && appt.startTime.isSame(appointment.startTime);
        }
      });
      if(apptIndex > -1){
        $scope.appointments.splice(apptIndex, 1);
      }
      if(appointment.exceptionTime){
        // add appointment to exception array for all instances of appointment so it doesn't get re added on nav
        $scope.appointments.forEach(function(appt, i){
          if(appt.id == appointment.id){
            appt.exceptions.push(appointment);
          }
        });
      }

    };

    var removeDeletedEvent = function(appointment){
      var eventIndex = _.findIndex($scope.events, function(ev){
        if(appointment.exceptionTime){
          return ev.appointment.id == appointment.id && ev.appointment.startTime.isSame(appointment.exceptionTime);
        } else {
          return ev.appointment.id == appointment.id && ev.appointment.startTime.isSame(appointment.startTime);
        }
      });
      if(eventIndex > -1){
        $scope.events.splice(eventIndex, 1);
      }
      removeFromAppointmentsArray(appointment);
    };

    var removeDeletedSeries = function(appointment){
      var indexesToDelete = [];
      $scope.events.forEach(function(ev, i){
        if(ev.appointment.id == appointment.id){
          indexesToDelete.push(i);
        }
      });
      for(i=0; i<indexesToDelete.length; i++){
        delete $scope.events[indexesToDelete[i]];
      }
      removeFromAppointmentsArray(appointment);
    };

    // listen to event from menu add appointment so we can update the calendar
    $rootScope.$on('event:appointmentsUpdated', $scope.loadAppointments);
    $rootScope.$on('event:appointmentCancelled', function(ev, args){
      if(args.hasOwnProperty('repeating') && args.repeating == true){
        removeDeletedSeries(args.appointment);
      } else {
        removeDeletedEvent(args.appointment);
      }
      if($scope.consultConfirmModal != undefined){
        $scope.closeConsultConfirmModal();
      }
    });

    if ($scope.isAppReady()) {
      reinitializeController();
    } else {
      $scope.$on('event:pacificaReady', function(){
        reinitializeController();
      });
    }

  }
  ]);
})();

(function() {

	var ctrl = angular.module('tutorialsCtrl', []);
	
	ctrl.controller('TutorialsCtrl', ['$scope', '$state', '$timeout', '$ionicModal', 'AccountService', 'PractitionerService','GeneralService',
		function ($scope, $state, $timeout, $ionicModal, AccountService, PractitionerService, GeneralService) {

			// var options = {
			//    pdfOpenParams: { pagemode: 'none', toolbar: '1' }
			// };

			// PDFObject.embed("/tutorials/PacificaLabs_ClientInviteTutorial.pdf", "#clientInviteTutorial", options);

			// PDFObject.embed("/tutorials/PacificaLabs_InviteCodeTutorial.pdf", "#inviteCodeTutorial", options);

			// PDFObject.embed("/tutorials/PacificaLabs_ActivitiesTutorial.pdf", "#activitiesTutorial", options);
		}
	]);
})();

(function () {

  var ctrl = angular.module('videochat', []);

  ctrl.controller('VideoChatCtrl', ['$rootScope', '$scope', '$translate', '$ionicPopup', 'AccountService', 'PractitionerService', '$state', '$location',
    function($rootScope, $scope, $translate, $ionicPopup, AccountService, PractitionerService, $state, $location) {

    $scope.remoteParticipants = {};
    $scope.clientConnected = false;
    $scope.localTracks = [];
    $scope.activeRoom = undefined;
    $scope.videoTrack = undefined;
    $scope.audioTrack = undefined;
    $scope.fullscreen = false;

    $scope.dragOptions = {container: 'draggable-area'};

    var token;

    $scope.hasRemoteParticipant = function hasRemoteParticipant() {

      for (var key in $scope.remoteParticipants) {
        return true;
      }

      return false;
    };

    function createTracks(localParticipant, callback) {

      Twilio.Video.createLocalVideoTrack().then(function(track) {
        $scope.videoTrack = track;
        if (localParticipant) {
          localParticipant.addTrack(track);
        }
        $scope.$apply(function() {
          $scope.localTracks.push(track);
        });
        Twilio.Video.createLocalAudioTrack().then(function(track) {
          $scope.audioTrack = track;
          if (localParticipant) {
            localParticipant.addTrack(track);
          }
          $scope.$apply(function() {
            $scope.localTracks.push(track) ;

            if (callback)
              callback();
          });
        }, function (error) {
          console.error('Unable to access local audio', error);
        });
      }, function (error) {
        console.error('Unable to access local video', error);
      });
    }

    function removeTracks() {
      var track;
      while($scope.localTracks.length > 0) {
        track = $scope.localTracks.pop();
        if (track.kind == "audio")  {
          $scope.audioTrack = undefined;
        } else {
          $scope.videoTrack = undefined;
        }
        track.stop();
        track.detach();
      }
    }

    $scope.previewCamera = function () {
      if ($scope.localTracks.length == 0) {
        createTracks();
      } else {
        removeTracks();
      }
    };

    $scope.toggleCamera = function (enable) {
      if ($scope.videoTrack) {
        $scope.videoTrack.enable(enable);
      }
    };

    $scope.toggleAudio = function (enable) {
      if ($scope.audioTrack) {
        $scope.audioTrack.enable(enable);
      }
    };


    var warnOnRefresh = function(){
      confirmationMessage = $translate.instant('LEAVE_SESSION_WARNING');
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    function performSessionLeave() {

      if ($scope.activeRoom) {

        $scope.activeRoom.disconnect();
        $scope.activeRoom = undefined;
        $scope.activeAppointment = undefined;

        $scope.setShowSidebar(true);

        //clear out these params if they exist, so on refresh we don't start a new session
        $location.search('startSession', null);
        $location.search('startSessionNow', null);

        $scope.restartLogoutTimer();
        window.removeEventListener("beforeunload", warnOnRefresh);
      }
    }

    $scope.leaveSession = function () {

      if ($scope.activeRoom) {

        var confirmPopup = $ionicPopup.confirm({
          // title: 'Alert',
          template: '<div>' + $translate.instant('LEAVE_SESSION_WARNING') + '</div>',
          cancelText: $translate.instant('CANCEL'),
          cancelType: 'button-default',
          okText: $translate.instant('LEAVE'),
          okType: 'button-default'
        });
        confirmPopup.then(function(res) {

          if (res) {

            performSessionLeave();
          }
        });
      }
    };

    var rootScopelistener = $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      if ($scope.activeRoom) {
        event.preventDefault();
        var confirmPopup = $ionicPopup.confirm({
          template: '<div>' + $translate.instant('LEAVE_SESSION_WARNING') + '</div>',
          cancelText: $translate.instant('CANCEL'),
          cancelType: 'button-default',
          okText: $translate.instant('LEAVE'),
          okType: 'button-default'
        });
        confirmPopup.then(function(res) {
          if (res) {
            performSessionLeave();
            $state.go(toState.name, toParams);
          }
        });
      }
    });

    $scope.$on('$destroy', function() {

      if (rootScopelistener)
        rootScopelistener();

      // Just to be sure.
      performSessionLeave();
    });

    function roomJoined(room) {

      $scope.activeRoom = room;

      room.participants.forEach(function(participant) {
        $scope.$apply(function () {
          console.log("Already in Room: '" + participant.identity + "'");
          $scope.remoteParticipants[participant.sid] = [];
          participant.tracks.forEach(function(value,key) {
            $scope.$apply(function () {
              $scope.remoteParticipants[participant.sid].push(value);
            });
          });
        });
      });

      // When a participant joins, draw their video on screen
      room.on('participantConnected', function (participant) {
        $scope.$apply(function () {
          console.log('Participant "' + participant.identity + '" connected');
          //$scope.remoteParticipants[participant.sid] = participant.tracks;
        });
      });

      room.on('trackSubscribed', function(track, participant) {
        $scope.remoteParticipants[participant.sid] = [];
          participant.tracks.forEach(function(value,key) {
            $scope.$apply(function () {
              $scope.remoteParticipants[participant.sid].push(value);
            });
          });
      });

      room.on('trackUnsubscribed', function(track, participant) {
        $scope.remoteParticipants[participant.sid] = [];
          participant.tracks.forEach(function(value,key) {
            $scope.remoteParticipants[participant.sid].push(value);
          });
      });

      // When a participant disconnects, note in log
      room.on('participantDisconnected', function (participant) {
        $scope.$apply(function () {
          delete $scope.remoteParticipants[participant.sid];
        });
      });

      // When we are disconnected, stop capturing local video
      // Also remove media for all remote participants
      room.on('disconnected', function () {
        console.log('Left');

        $scope.clientConnected = false;

        room.participants.forEach(function(participant) {
          delete $scope.remoteParticipants[participant.sid];
        });
        removeTracks();
        $scope.activeRoom = undefined;
      });

      // To get the activeRoom.
      if(!$scope.$$phase)
        $scope.$apply();
    }

    $scope.activateSession = function activateSession() {
      if ($scope.activeAppointment) {
        $scope.cancelLogoutTimer();

        return AccountService.getVideoToken()
          .success(function (response) {

            console.info('Token Retrieved: ' + response.token);
            token = response.token;

            function performConnect() {
              var connectOptions = {name: $scope.activeAppointment.roomId, logLevel: 'info'};

              //capture page refresh event
              // most browsers will ignore our string and display their own
              window.addEventListener("beforeunload", warnOnRefresh);

              if ($scope.localTracks)
                connectOptions.tracks = $scope.localTracks;

              Twilio.Video.connect(token,connectOptions).then(roomJoined,
                function (error) {
                  console.error('Could not connect to Twilio: ' + error.message);
                });

              if(!$scope.$$phase)
                $scope.$apply();
            }

             // Draw local video, if not already previewing
            if ($scope.localTracks.length == 0) {
              createTracks(undefined, performConnect);
            }
            else {
              performConnect();
            }
          });
      }
    };

    $scope.activateSession();

    $scope.startWebAppointmentNow = function startAppointmentNow(client) {
      if (!$scope.checkWebRTCSupport())
        return;

      if(client && $scope.clients){
        $scope.client = _.find($scope.clients, {id: client.id});
      }

      var activeAppointment = null;
      // attempt to find an active appointment
      if ($scope.appointments) {
        $scope.appointments.forEach(function(appointment) {
          var appointmentEnd = appointment.startTime.clone().add(appointment.duration, 'm');
          if (appointment.startTime.isSame(moment(), 'day') && appointmentEnd.isAfter(moment())) {
            activeAppointment = appointment;
          }
        });
      }

      if (activeAppointment == null) {
        // prompt user if they want to create new session and notify user

        var confirmPopup = $ionicPopup.confirm({
          title: $translate.instant('START_SESSION'),
          template: $translate.instant('START_NEW_SESSION_TEXT'),
          cssClass: 'cancel-assessment',
          okText: $translate.instant('YES'),
          okType: 'button-default',
          cancelText: $translate.instant('CANCEL_LOWER'),
          cancelType: 'button-default',
        });

        confirmPopup.then(function(res) {
          if(res) {
            PractitionerService.newAppointment({
              practitionerId: AccountService.getAccountUser().practitioner.id,
              clientId: $scope.client.account.id,
              description: 'Unscheduled Session',
              startTime: moment(),
              duration: 50,
              appointmentType: "TELETHERAPY",
              intervalDays: 0
            }).success(function (data) {
              data.startTime = moment.tz(data.startTime, AccountService.getUserTimeZone());
              data.endTime = moment.tz(data.startTime.clone().add(data.duration, 'm'),  AccountService.getUserTimeZone());
              $rootScope.$broadcast('event:appointmentsUpdated');
              $scope.startWebAppointment(data);
            }).error(function(err){
              if(err.message){
                var confirmPopup = $ionicPopup.alert({
                  title: $translate.instant('START_SESSION_ERROR'),
                  template: err.message,
                  okText: $translate.instant('DISMISS'),
                  okType: 'button-default',
                });
              }
            });
          }
        });
      } else {
        $scope.startWebAppointment(activeAppointment);
      }
    };

    $scope.startWebAppointment = function startWebAppointment(appointment) {

      if (!$scope.checkWebRTCSupport())
        return;

      if($scope.activeRoom)
        return;

      $scope.activeAppointment = appointment;

      $scope.activateSession();

      $scope.setShowSidebar(false);
    };

  }]);
})();

angular.module('abstractGroupPostsCtrl', [])
.controller('AbstractGroupPostsCtrl', ['$scope', '$state', '$sce', '$timeout', '$analytics', '$translate', '$ionicModal', '$ionicScrollDelegate', '$ionicActionSheet', 'AccountService', 'HabitsService', 'GoalsService', 'AudioService', 'GroupsService', 'GeneralService', 'Environment', 'OverlayService', 'SkillsService', '$rootScope', 'ActivityService', '$q',
  function($scope, $state, $sce, $timeout, $analytics, $translate, $ionicModal, $ionicScrollDelegate, $ionicActionSheet, AccountService, HabitsService, GoalsService, AudioService, GroupsService, GeneralService, Environment, OverlayService, SkillsService, $rootScope, ActivityService, $q) {

    $scope.showingMenu = undefined;

    // Map of which post IDs have been expanded.
    $scope.showingMore = {};
    var reducedTitleLength = 140;

    $scope.userVotes = {};
    $scope.userCommentVotes = {};

    // A map of the sharing type (mood, thoughts, etc.) to the data being shared.
    $scope.sharingData = {};

    // Models for posting data.
    $scope.groupPostData = {
      postText: ''
    };

    $scope.communityPostData = {
      postText: ''
    };

    $scope.reportPostData = {
      postText: ''
    };

    $scope.isOwnerById = function isOwnerById(groupId) {

      var group = GroupsService.getGroupImmediate(groupId);

      return group.creatorId == AccountService.getAccountUser().user.id;
    };

    $scope.isOwner = function isOwner(group) {

      return group && (group.creatorId == AccountService.getAccountUser().user.id);
    };

    // For the invite functionality inside a group where isOwner conflicts
    $scope.isGroupOwner = function isGroupOwner(group) {

      return group.creatorId == AccountService.getAccountUser().user.id;
    };

    $scope.hasUserNickname = function hasUserNickname() {

      return $scope.getUserNickname() && $scope.getUserNickname().length > 0;
    };

    $scope.getUserNickname = function getUserNickname() {

      return AccountService.getAccountUser().user.publicName;
    };

    $scope.isNicknameGenerated = function isNicknameGenerated() {

      return AccountService.getAccountUser().user.generatedName;
    };

    $scope.hasPostNotification = function hasPostNotification(postId) {

      return GroupsService.hasPostNotification(postId);
    };

    $scope.hasGroupNotification = function hasGroupNotification(groupId) {

      return GroupsService.hasGroupNotification(groupId);
    };

    $scope.getGroupNotificationCount = function getGroupNotificationCount(groupId) {

      return GroupsService.getGroupNotificationCount(groupId);
    };

    $scope.checkOfflineMode = function checkOfflineMode() {

      if (!Environment.isOnline()) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('GROUPS_OFFLINE_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return true;
      }

      return false;
    };

    $scope.getPostCreatorNickname = function getPostCreatorNickname(post) {

      if (!post)
        return;

      if (post.creatorNickname)
        return post.creatorNickname;
      else
        return '[' + $translate.instant("DELETED") + ']';
    };

    $scope.getPostAvatar = function getPostAvatar(post) {
      return AccountService.getPostAvatar(post);
    };

    $scope.getPostDate = function getPostDate(post) {

      if (!post)
        return;

      if (post.momentDate)
        return post.momentDate;

      var date = (typeof post.createdAt == 'object') ? post.createdAt : new Date(post.createdAt);

      post.momentDate = moment(date).calendar();

      return post.momentDate;
    };

    function getTruncatedTitle(title) {

      if (title.lastIndexOf('.') == title.length - 1)
        return title + '..';
      else
        return title + '...';
    }

    var linkifyOptions = {
      // format: null,
      formatHref: function(url, type) {

        // Can't just return this normally because of linting
        // This doesn't allow us to capture the event though. See below.
        // return ['javascript', ':', 'window.open(\'', url, '\',\'_blank\', \'location=no\');'].join('');

        return url;
      },

      target: function(type) {
        return null;
      },

      // We use linkify.js to highlight @mentions, but we need to prevent click events on those links with css
      className: function(href, type) {
        if (type === 'mention') {
          href = 'linkified-mention';
        }
        return href;
      },

      // Hacky. This allows us to prevent the event from propagating to the rest of the dom and
      // then launches the in app browser.
      linkAttributes: {
        onClick: 'event.stopPropagation(); event.preventDefault(); window.open(event.target.href, \'_blank\', \'location=no\');'
      },

      events: {
        click: function(e) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    $scope.getPostTitle = function getPostTitle(post, showAll, returnString) {

      var title = post.title;

      // This function is reused in the profile where there is no group.
      var showExpandedContent = false;
      if ($scope.group)
        showExpandedContent = $scope.group.groupType != 'COMMUNITY';

      if (!$scope.showingMore[post.id] && !showExpandedContent && $scope.canShowMore(post) && !showAll) {

        if (post.truncatedTitle){
          if(returnString)
            return post.truncatedTitle;
          return $sce.trustAsHtml(post.truncatedTitle);
        }

        var remaining = title.substring(reducedTitleLength);

        var nextSpace = remaining.indexOf(' ');
        if (nextSpace >= 0) {

          post.truncatedTitle = linkifyStr(getTruncatedTitle(title.substring(0, reducedTitleLength + nextSpace)), linkifyOptions);
        } else {

          post.truncatedTitle = linkifyStr(getTruncatedTitle(title.substring(0, reducedTitleLength)), linkifyOptions);
        }
        if(returnString)
          return post.truncatedTitle;
        return $sce.trustAsHtml(post.truncatedTitle);
      } else {

        if (!post.linkifiedTitle)
          post.linkifiedTitle = linkifyStr(title, linkifyOptions);

        if(returnString)
          return post.linkifiedTitle;
        return $sce.trustAsHtml(post.linkifiedTitle);
      }
    };

    $scope.canShowMore = function canShowMore(post) {

      var title = post.title;

      var ret = (typeof $scope.showingMore[post.id] == 'undefined') && (title.length > reducedTitleLength);

      return ret;
    };

    $scope.showMore = function showMore(post) {

      $scope.showSocialTooltip = false;

      if (!$scope.mobile)
        $scope.previousScrollPosition = $(window).scrollTop();

      if ($scope.group && $scope.group.groupType == 'GROUP') {

        if ($scope.canShowMore(post)) {
          $scope.showingMore[post.id] = post.id;
          $ionicScrollDelegate.resize();
        } else {
          delete $scope.showingMore[post.id];
          $ionicScrollDelegate.resize();
        }
      } else {

        var postId;

        if (typeof post.groupPostId == 'undefined') {
          // Store this so that the comments controller can get to it.
          GroupsService.storeCachedPost(post, $scope.postDataObjects ? $scope.postDataObjects[post.id] : undefined, $scope.userVotes);

          postId = post.id;
        } else {

          postId = post.groupPostId;
        }

        var data = {
          postId: postId,
          order: 'date'
        };

        if ($state.$current.name.indexOf('app.groups') >= 0) {

          // var href = $state.href('app.communities-post-comments', data, {
          //   relative: true
          // });

          // // In app.js. Because we are on the groups tab, we need to navigate to
          // // the communities tab first.
          // openURL(href);

          $state.go('app.groups-post-comments', data);
        } else {
            if ($scope.mobile) {
              $state.go('app.communities-post-comments', data);
            } else {
              $scope.postId = data.postId;

              OverlayService.modal.open({
                modalId: 'PostCommentsModal',
                templateUrl: 'templates/community/community.post.comments.modal.html',
                scope: $scope,
                data: data,
                animation: 'slide-in-up',
                ignoreStatusBar: false
              }).then(function(modal) {
                $scope.postCommentsModal = modal;
              });

            }
        }


      }
    };

    $scope.closePostCommentsModal = function(){

      OverlayService.modal.close($scope.postCommentsModal).then(function(modal) {
        $scope.postCommentsModal = modal;

        // We reset scrollTop to 0 when a user loads a community post.
        // Need restore to the previous scroll position if one was stored.
        if (!$scope.mobile && $scope.previousScrollPosition) {
          $(window).scrollTop($scope.previousScrollPosition);
          $scope.previousScrollPosition = undefined;
        }
      });
    };

    $scope.hasVote = function hasVote(post) {

      if (!post)
        return false;

      if ($scope.activeTab == 'comments') {

        return $scope.hasCommentVote(post);
      } else {

        var userVote = $scope.userVotes[post.id];

        return (userVote && userVote.up) || (post.creatorId == AccountService.getAccountUser().user.id);
      }

    };

    $scope.removeVote = function removeVote(event, post) {

      event.stopPropagation();
      event.preventDefault();

      if ($scope.activeTab == 'comments') {

        $scope.removeCommentVote(event, post);
      } else {
        if ($scope.isPostOwner(post)) {

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('REMOVE_OWNED_POST_VOTE_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          return;
        }

        delete $scope.userVotes[post.id];

        --post.ups;
        --post.score;

        GroupsService.removeVote(post);
      }
    };

    $scope.addUserVotes = function addUserVotes(userVotes) {

      for (var j = 0; j < userVotes.length; ++j) {

        var vote = userVotes[j];

        $scope.userVotes[vote.postId] = vote;
      }
    };

    $scope.createVoteObject = function createVoteObject(post) {

      // TODO need the date here.
      $scope.userVotes[post.id] = {
        postId: post.id,
        groupId: $scope.group ? $scope.group.id : post.groupId,
        up: true,
        recordedAt: new Date()
      };
    };

    $scope.voteUp = function voteUp(event, post) {

      event.stopPropagation();
      event.preventDefault();

      // Note that the post could be a post or a comment here.
      if ($scope.activeTab == 'comments') {

        $scope.voteCommentUp(event, post);
      } else {

        ++post.ups;
        ++post.score;

        $scope.createVoteObject(post);

        GroupsService.voteUp(post.id, post.groupId);
      }
    };

    $scope.addUserCommentVotes = function addUserCommentVotes(userCommentVotes) {

      for (var j = 0; j < userCommentVotes.length; ++j) {

        var vote = userCommentVotes[j];

        $scope.userCommentVotes[vote.postCommentId] = vote;
      }
    };

    $scope.createCommentVoteObject = function createCommentVoteObject(comment) {

      // TODO need the date here.
      $scope.userCommentVotes[comment.id] = {
        postId: comment.id,
        groupId: $scope.group ? $scope.group.id : comment.groupId,
        up: true,
        recordedAt: new Date()
      };
    };

    $scope.hasCommentVote = function hasCommentVote(comment) {

      var userVote = $scope.userCommentVotes[comment.id];

      return (userVote && userVote.up) || (comment.creatorId == AccountService.getAccountUser().user.id);
    };

    $scope.voteCommentUp = function voteCommentUp(event, comment) {

      event.stopPropagation();
      event.preventDefault();

      ++comment.ups;
      ++comment.score;

      $scope.createCommentVoteObject(comment);

      GroupsService.voteCommentUp(comment.id, comment.groupPostId, comment.groupId);
    };

    $scope.removeCommentVote = function removeCommentVote(event, comment) {

      event.stopPropagation();
      event.preventDefault();

      if ($scope.isPostOwner(comment)) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('REMOVE_OWNED_POST_VOTE_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return;
      }

      delete $scope.userCommentVotes[comment.id];

      --comment.ups;
      --comment.score;

      GroupsService.removeCommentVote(comment);
    };

    function initController(){
      GroupsService.initValidateEmailFunctionality($scope);
      GroupsService.initCreateGroupFunctionality($scope);
      GroupsService.initInviteFunctionality($scope);
    }


    $scope.viewUserProfile = function viewUserProfile(event, post) {

      event.stopPropagation();
      event.preventDefault();

      if (post.creatorNickname)
        $state.go('app.community-profile', {
          userId: post.creatorId,
          nickname: post.creatorNickname
        });
    };

    $scope.closeReportModal = function closeReportModal() {
      $scope.reporting = false;
      OverlayService.modal.close($scope.reportModal).then(function(modal) {
        $scope.reportModal = modal;
        $scope.reportPostData.postText = '';
      });
    };

    $scope.reportPost = function reportPost() {

      var reportText = $scope.reportPostData.postText.trim();
      if (!reportText || reportText.length === 0) {

        $scope.reportError = $translate.instant("REPORT_POST_TEXT_ERROR");
        return;
      }

      if($scope.reporting)
        return false;

      $scope.reporting = true;

      var referUser = $scope.referUserData.referUser;

      $scope.reportError = undefined;

      GroupsService.reportPost($scope.reportingPostId, reportText, referUser ? true : false)
        .success(function() {
          $scope.closeReportModal();

          // Not there for the comments view.
          if ($scope.removePostById)
            $scope.removePostById($scope.reportingPostId);

          $timeout(function() {
            OverlayService.popup.alert({
              template: $translate.instant('REPORT_POST_CONFIRM'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }, 500);
        })
        .error(function() {
          $scope.reporting = false;
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('REPORT_POST_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    };

    $scope.showReportPost = function showReportPost(event, post) {

      event.stopPropagation();
      event.preventDefault();

      $scope.reportingComment = false;

      if (AccountService.getAccountUser().user.banned) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('BANNED_USER_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return;
      }

      if (!$scope.isUserEmailValidated()) {

        $scope.checkRemoteEmailValidation(function(validated) {

          if (validated)
            $scope.showReportPost(event, post);
        });

        return;
      }

      $scope.reportingPostId = post.id;

      $scope.reportPostData.postText = '';

      $scope.referUserData = {
        referUser: false
      };

      var reportModal;
      if ($scope.mobile) {
        reportModal = 'views/groups/groups.report.modal.html';
      } else {
        reportModal = 'templates/groups/groups.report.modal.html';
      }

      if (!$scope.reportModal) {

        OverlayService.modal.open({
          modalId: 'ReportModal',
          templateUrl: reportModal,
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.reportModal = modal;
        });
      }
    };

    $scope.closeSubGoalModal = function closeSubGoalModal() {
      OverlayService.modal.close($scope.goalModal).then(function(modal) {
        $scope.goalModal = modal;
      });
    };

    $scope.clearSubGoal = function clearSubGoal() {

      $scope.viewData.subGoal = '';
    };

    // Update the goal option with the ordinal that has been set.
    $scope.updateGoalOption = function updateGoalOption() {

      $scope.goalForSubGoal = $scope.goalOptions.goals[$scope.goalOptions.goalOptionOrdinal];

      if ($scope.valueData && $scope.valueData.redraw)
        ++$scope.valueData.redraw;
    };

    $scope.getGoalOptionDisplay = function getGoalOptionDisplay(item) {
      return item.title;
    };

    $scope.saveSubGoal = function saveSubGoal() {

      if ($scope.valueData.value == '?') {
        $scope.noDataError = true;
        return;
      } else {
        $scope.noDataError = false;
      }
      
      OverlayService.loading.show($translate.instant('EXPERIMENTS_SETTING_EXPERIMENT') + '...');

      // Need the current goal
      GoalsService.addSubGoal($scope.goalForSubGoal.id,
          $scope.viewData.subGoal,
          GeneralService.getTodayString(),
          $scope.difficultyValues[$scope.valueData.valueIndex].valueInt)
        .success(function() {

          $scope.closeSubGoalModal();

          OverlayService.loading.hide();
        })
        .error(function() {

          $scope.closeSubGoalModal();

          OverlayService.loading.hide();
        });

      $analytics.eventTrack('addSubGoal', {
        category: 'groups'
      });
    };

    // This is all copied from the goals controller. A bit gross...
    $scope.allDifficultyColors = [
      '#60d293',
      '#5fe9c4',
      '#5bdddf',
      '#58caf6',
      '#66edff',
      '#ffe566',
      '#ffbe66',
      '#ff8d6e',
      '#ef7d7d',
      '#ff6669'
    ];

    $scope.$watch('valueData.valueIndex', function() {

      if ($scope.valueData) {
        var newValueIndex = $scope.valueData.valueIndex;
        if ($scope.lastValueIndex != newValueIndex) {

          $scope.difficultyColors[1] = $scope.allDifficultyColors[newValueIndex];
        }
      }
    });

    $scope.addExperiment = function addExperiment(event, post) {

      event.stopPropagation();
      event.preventDefault();

      var experiment = $scope.getExperiment(post);

      $scope.goalOptions = {
        goals: GoalsService.getAccountGoals(),
        goalOptionOrdinal: 0
      };

      // Sets the active goal
      $scope.updateGoalOption();

      $scope.viewData = {
        subGoal: experiment.title,
        error: false,
        submitting: false
      };

      // Pretty gross, just copying this over from the goals controller.
      $scope.colorPercentages = [0, 1];
      $scope.difficultyColors = ["#c8c8c8", GeneralService.getColor('green'), "#c8c8c8"];

      $scope.difficultyValues = [10];
      for (var i = 0; i < 10; ++i) {

        $scope.difficultyValues[i] = createValue(i, i + 1);
      }

      $scope.valueData = {
        value: '?',
        valueIndex: 0,
        percentage: 0.0,
        redraw: 0
      };

      $scope.getSpinnerDifficulty = function getSpinnerDifficulty() {

        if ($scope.valueData)
          return $scope.difficultyValues[$scope.valueData.valueIndex].valueInt;
      };

      OverlayService.modal.open({
        modalId: 'GoalModal',
        templateUrl: 'views/goals/goals.addCommunitySubGoal.modal.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.goalModal = modal;
      });
    };

    $scope.showAddExperiment = function showAddExperiment(post) {

      if ($scope.isPostOwner(post))
        return false;

      var experiment = $scope.getExperiment(post);

      return experiment && experiment.title;
    };

    $scope.savePost = function savePost(event, post) {

      event.preventDefault();
      event.stopPropagation();

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('SAVE_POST_TO_FEED_CONFIRM') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('SAVE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {
          var personalGroupId = AccountService.getAccountUser().user.personalGroupId;

          var postData = GroupsService.getCachedPostData(post.id);

          GroupsService.createGroupPost(personalGroupId, post.title, postData)
            .success(function(newPost) {
              ActivityService.recordActivity('ADD_POST_TO_HOPE_FEED');
              if($scope.mobile){
                GeneralService.showToast($translate.instant('POST_TO_PERSONAL_FEED_SUCCESS'), true, 'bottom');
              } else {
                OverlayService.popup.alert({
                  template: $translate.instant('POST_TO_PERSONAL_FEED_SUCCESS'),
                  okText: $translate.instant('OK_GOT_IT'),
                  okType: 'button-default'
                });
              }
           })
            .error(function() {
              OverlayService.popup.alert({
                template: $translate.instant('CREATE_POST_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };

    $scope.sharePost = function sharePost(event, post) {
      $analytics.eventTrack('sharePostClick', {
        category: 'communities'
      });

      event.preventDefault();
      event.stopPropagation();

      var url;
      if (Environment.isDevelopment()) {
        url = 'http://dev.sanvello.com/community/post/';
      } else {
        url = 'http://www.sanvello.com/community/post/';
      }

      url += post.id;
      if ($scope.mobile) {
        window.plugins.socialsharing.share($translate.instant('SHARE_POST_TEXT') + ' "' + post.title + '"', null, null, url);
      } else {
        $scope.socialTooltipUrl = url;

        OverlayService.modal.open({
          modalId: 'ShareContentModal',
          templateUrl: 'templates/community/community.shareContent.modal.html',
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.shareContentModal = modal;
        });
      }
    };

    $scope.closeShareContentModal = function() {
      OverlayService.modal.close($scope.shareContentModal).then(function(modal) {
        $scope.shareContentModal = modal;
      });
    };

    $scope.deletePost = function deletePost(event, post) {

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('ARCHIVE_POST_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('REMOVE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {
          GroupsService.archivePost(post.id)
            .success(function() {

              $scope.removePost(post);
            })
            .error(function() {

              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('ARCHIVE_POST_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };

    $scope.isPostOwner = function isPostOwner(post) {
      return post && (post.creatorId == AccountService.getAccountUser().user.id);
    };

    $scope.isFeaturedInFeed = function isFeaturedInFeed(post) {
      return GroupsService.isFeaturedInFeed(post);
    };

    $scope.showMenu = function showMenu(post) {

      return $scope.showingMenu == post.id;
    };

    $scope.toggleMenu = function toggleMenu(event, post) {

      event.stopPropagation();
      event.preventDefault();

      if ($scope.showingMenu == post.id)
        $scope.showingMenu = undefined;
      else
        $scope.showingMenu = post.id;
    };

    $scope.closeShareMoodModal = function closeShareMoodModal() {
      OverlayService.modal.close($scope.moodModal).then(function(modal) {
        $scope.moodModal = modal;
      });
    };

    $scope.hasSharingData = function hasSharingData(type) {

      return $scope.sharingData[type];
    };

    $scope.shareWeeksMood = function shareWeeksMood() {

      var habitData = HabitsService.getAllMoodHabitData();

      var weeklyData = [];

      var lastWeek = new Date(new Date().getTime() - (6 * 1000 * 60 * 60 * 24));
      lastWeek.setHours(0, 0, 0, 0);

      if (habitData && habitData.length > 0) {

        for (var i = 0; i < habitData.length; ++i) {

          var moodEntry = habitData[i];
          var moodDate = new Date(moodEntry.experiencedAtStr);

          if (moodDate > lastWeek) {

            weeklyData.push(moodEntry);
          }
        }
      }

      if (weeklyData.length === 0) {

        // Alert that there is no data.
        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('MISSING_MOOD_DATA_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
      } else {

        $scope.sharingData = {};

        // Sort the mood entries.
        weeklyData.sort(function(a, b) {

          return new Date(a.experiencedAtStr) - new Date(b.experiencedAtStr);
        });

        // We need to record the start time for the graph so it can be rendered correctly

        $scope.sharingData.Mood = {
          moodEntries: weeklyData,
          startDate: lastWeek.toString(),
          numberOfDays: 7
        };

        $scope.closeShareMoodModal();

        updateDefaultText($translate.instant("DEFAULT_MOOD_SHARE_TEXT"));
      }
    };

    function updateDefaultText(defaultText) {

      var text = $scope.groupPostData.postText.trim();
      if (!text ||
        text.length === 0 ||
        text == $translate.instant("DEFAULT_MOOD_SHARE_TEXT") ||
        text == $translate.instant("DEFAULT_THOUGHT_SHARE_TEXT") ||
        text == $translate.instant("DEFAULT_EXPERIMENT_SHARE_TEXT")) {
        $scope.groupPostData.postText = defaultText;
      }
    }

    function removeDefaultText(defaultText) {

      var text = $scope.groupPostData.postText.trim();
      if (text == defaultText)
        $scope.groupPostData.postText = '';
    }

    function getRecordingAttribute(thought, type, attribute) {

      if (thought.recordings && thought.recordings[type])
        return thought.recordings[type][attribute];
    }

    $scope.getRecordingSource = function getRecordingSource(thought, type) {

      return getRecordingAttribute(thought, type, 'url');
    };

    $scope.getRecordingDuration = function getRecordingDuration(thought, type) {

      return getRecordingAttribute(thought, type, 'duration');
    };

    $scope.getRecordingTags = function getRecordingTags(thought, type) {

      return getRecordingAttribute(thought, type, 'tags');
    };

    $scope.isThoughtExpired = function isThoughtExpired(post) {

      var thought = $scope.getThought(post);
      if (thought && thought.expiresAtStr) {

        var expiresAt = new Date(thought.expiresAtStr);
        return expiresAt < new Date();
      }

      return false;
    };

    $scope.isAudioJournal = function isAudioJournal(post) {

      var thought = $scope.getThought(post);

      return thought && thought.thoughtType == 'AUDIO_JOURNAL';
    };

    $scope.isAudioThought = function isAudioThought(post) {

      var thought = $scope.getThought(post);

      // Old posts will not have the thoughtType.
      return thought &&
        (!thought.thoughtType || thought.thoughtType == 'AUDIO_DISTORTIONS');
    };

    $scope.isTextThought = function isTextThought(post) {

      var thought = $scope.getThought(post);

      return thought && thought.thoughtType == 'TEXT_DISTORTIONS';
    };

    $scope.isTextJournal = function isTextJournal(post) {

      var thought = $scope.getThought(post);

      return thought && thought.thoughtType == 'TEXT_JOURNAL';
    };

    $scope.getTextThoughtDisplay = function getTextThoughtDisplay(post) {

      var thought = $scope.getThought(post);
      if (thought && thought.thoughtType == 'TEXT_DISTORTIONS') {

        var analysis = thought.recordings.analysis;

        var text = analysis ? analysis.notes : '';

        if (text.length > 250)
          text = text.substring(0, 250) + '...';

        return text;
      }
    };

    $scope.getTextJournalDisplay = function getTextJournalDisplay(post) {

      var thought = $scope.getThought(post);
      if (thought && thought.thoughtType == 'TEXT_JOURNAL') {

        var analysis = thought.recordings.journal;

        var text = analysis ? analysis.notes : '';

        if (text.length > 250)
          text = text.substring(0, 250) + '...';

        return text;
      }
    };

    $scope.closeTextThoughtModal = function closeTextThoughtModal() {
      OverlayService.modal.close($scope.textThoughtModal).then(function(modal) {
        $scope.textThoughtModal = modal;
      });
    };

    $scope.getThoughtDate = function getThoughtDate(post) {

      var thought = $scope.getThought(post);
      if (thought) {

        return moment(new Date(thought.createdAtString)).calendar();
      }
    };

    $scope.closeShareThoughtModal = function closeThoughtModal() {
      OverlayService.modal.close($scope.thoughtModal).then(function(modal) {
        $scope.thoughtModal = modal;
      });
    };

    $scope.getShareThoughtButtonText = function() {

      return $translate.instant('SHARE_THOUGHT');
    };

    $scope.getShareThoughtCopy = function getShareThoughtCopy() {

      return $translate.instant('SHARE_THOUGHT_COPY');
    };

    $scope.getThoughtItemDisplay = function getThoughtItemDisplay(item) {

      return item.title;
    };

    $scope.updateSelectedThought = function updateSelectedThought() {

      $scope.selectedThought = $scope.thoughtOptions.thoughts[$scope.thoughtOptions.thoughtOrdinal];
    };

    $scope.getSelectedThought = function getSelectedThought() {

      if ($scope.selectedThought)
        return $scope.selectedThought.title;
    };

    $scope.showingModal = function showingModal() {

      return $scope.moodModal || $scope.thoughtModal || $scope.experimentModal;
    };

    $scope.shareThought = function shareThought() {

      $scope.sharingData = {};

      $scope.sharingData.Thought = $scope.selectedThought;

      updateDefaultText($translate.instant("DEFAULT_THOUGHT_SHARE_TEXT"));

      $scope.closeShareThoughtModal();
    };

    $scope.closeShareExperimentModal = function closeShareExperimentModal(creatingPost) {
      OverlayService.modal.close($scope.experimentModal).then(function(modal) {
        $scope.experimentModal = modal;
      });
    };

    $scope.getExperimentItemDisplay = function getExperimentItemDisplay(item) {

      return item.title;
    };

    $scope.getShareExperimentCopy = function getShareExperimentCopy() {

      return $translate.instant('SHARE_EXPERIMENT_COPY');
    };

    $scope.getShareExperimentButtonText = function getShareExperimentButtonText() {

      return $translate.instant('SHARE_EXPERIMENT');
    };

    $scope.updateSelectedExperiment = function updateSelectedExperiment() {

      $scope.selectedExperiment = $scope.experimentOptions.experiments[$scope.experimentOptions.experimentOrdinal];
    };

    $scope.getSelectedExperiment = function getSelectedExperiment() {

      if ($scope.selectedExperiment)
        return $scope.selectedExperiment.title;
    };

    $scope.shareExperiment = function shareExperiment() {

      if ($scope.group.groupType == 'GROUP' ||
          $scope.group.groupType == 'PERSONAL') {

        $scope.sharingData = {};

        $scope.sharingData.Experiment = $scope.selectedExperiment;

        updateDefaultText($translate.instant("DEFAULT_EXPERIMENT_SHARE_TEXT"));
      } else {

        // Actually perform the share.
        $scope.createPostInternal($scope.selectedExperiment.title, {
          Experiment: $scope.selectedExperiment
        });
      }

      $scope.closeShareExperimentModal(true);
    };

    function showMissingExperimentAlert() {

      var alertPopup = OverlayService.popup.alert({
        template: $translate.instant('MISSING_EXPERIMENT_DATA_ERROR'),
        okText: $translate.instant('OK_GOT_IT'),
        okType: 'button-default'
      });
    }

    $scope.showExperimentShare = function showExperimentShare() {

      if ( ($scope.group.groupType == 'GROUP' || $scope.group.groupType == 'PERSONAL') && $scope.sharingData.Experiment) {

        $scope.sharingData = {};

        removeDefaultText($translate.instant("DEFAULT_EXPERIMENT_SHARE_TEXT"));
      } else {
        var experimentMap = GoalsService.getAccountSubGoals();

        if (!experimentMap) {

          showMissingExperimentAlert();
        } else {
          var experiments = [];

          for (var day in experimentMap) {

            var dayExperiments = experimentMap[day];

            for (var i = 0; i < dayExperiments.length; ++i) {

              var dayExperiment = dayExperiments[i];
              if (dayExperiment.achievedRecordedAt) {

                experiments.push(dayExperiment);
              }
            }
          }

          if (experiments.length === 0) {

            showMissingExperimentAlert();
            return;
          }

          experiments.sort(function(a, b) {

            var aDate = new Date(a.achievedRecordedAtString);
            var bDate = new Date(b.achievedRecordedAtString);

            return bDate - aDate;
          });

          $scope.selectedExperiment = experiments[0];

          $scope.experimentOptions = {
            experiments: experiments,
            experimentOrdinal: 0
          };

          OverlayService.modal.open({
            modalId: 'ExperimentModal',
            templateUrl: 'views/groups/groups.experiment.modal.html',
            scope: $scope,
            animation: 'slide-in-up',
            ignoreStatusBar: false
          }).then(function(modal) {
            $scope.experimentModal = modal;
          });
        }
      }
    };

    $scope.inputHasFocus = false;

    $scope.inputFocused = function inputFocused() {
      if($scope.group.groupType == 'PERSONAL' || $scope.group.groupType == 'CLIENT' || $scope.group.groupType == 'COACH')
        return;
      
      if (!$scope.isUserEmailValidated()) {

        $scope.checkRemoteEmailValidation(function(validated) {

          if (validated)
            $scope.inputHasFocus = true;
        });

        return;
      } else if (!$scope.hasUserNickname() || $scope.isNicknameGenerated()) {
        $scope.showUpdateNickname();
        $("#postText").blur();
      }
    };

    $scope.inputBlurred = function inputBlurred() {

      $scope.inputHasFocus = false;
    };

    $scope.isInputFocused = function isInputFocused() {

      return $scope.inputHasFocus;
    };

    $scope.inputChanged = function inputChanged() {
      // This is overloaded and there won't be a socket for public groups.
      if (!$scope.websocketSend)
        return;

      var hasText = $scope.hasPostText();

      if (hasText && !$scope.typing) {

        // The user has started typing. Send the message to the server.
        $scope.typing = true;
        $scope.websocketSend('typing');
      } else if (!hasText && $scope.typing) {

        // The user has stopped typing. Send the message to the server.
        $scope.typing = false;
        $scope.websocketSend('nottyping');
      }
    };

    $scope.hasPostText = function hasPostText() {

      var text = $scope.groupPostData.postText;
      if (text)
        text = text.trim();
      else
        return false;

      return text.length > 0;
    };


    $scope.editPost = function editPost(event, post, isComment){

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if(post.comments && post.comments > 0){
        GeneralService.showToast($translate.instant('CANNOT_EDIT_POST_MSG'), false, 'center');
        return;
      }

      if(isComment)
        $scope.isEditingComment = true;
      $scope.isEditing = true;
      $scope.postForEdit = post;
      $scope.communityPostData.postText = post.title;
      showCreatePostModal();
    };

    $scope.postEdited = function postEdited(){
      $scope.editedPost = true;
    };

    $scope.editCommunityPost = function editCommunityPost(){
      $scope.closeCreatePostModal();
    };

    $scope.checkClosePost = function checkClosePost(){
      if(!$scope.editedPost){
        $scope.closeCreatePostModal();
        return;
      } else {
        OverlayService.popup.confirm({
          template: $translate.instant('THOUGHTS_GO_BACK_PROMPT'),
          cancelText: $translate.instant('CANCEL'),
          cancelType: 'button-default',
          okText: $translate.instant('CONFIRM'),
          okType: 'button-default'
        }).then(function(res) {
          if (res) {
            $scope.closeCreatePostModal();
          }
        });    
      }
    };

    $scope.closeCreatePostModal = function closeCreatePostModal() {
      OverlayService.modal.close($scope.createCommunityPostModal).then(function(modal) {
        $scope.createCommunityPostModal = modal;
        $scope.isEditing = false;
        $scope.editedPost = true;
        $scope.postForEdit = undefined;
      });
    };    

    function showCreatePostModal(){      
      var createPostModalTemplate;
      if ($scope.mobile) {
        createPostModalTemplate = 'views/groups/communities.createPost.modal.html';
      } else {
        createPostModalTemplate = 'templates/community/community.createPost.modal.html';
      }

      OverlayService.modal.open({
        modalId: 'CreatePostModal',
        templateUrl: createPostModalTemplate,
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.createCommunityPostModal = modal;
      });
    }

    $scope.showCreatePost = function showCreatePost() {

      if ($scope.checkOfflineMode()) return;

      if (!$scope.hasUserNickname()) {

        $scope.attemptingCommunityPost = true;

        $scope.showUpdateNickname();
        return;
      }

      if (!$scope.isUserEmailValidated()) {

        $scope.checkRemoteEmailValidation(function(validated) {

          if (validated)
            $scope.showCreatePost();
        });

        return;
      }

      if (!$scope.canCreateCommunityPost()) {

        if (AccountService.getAccountUser().user.banned) {

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('BANNED_USER_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        } else {
          var alertPopup2 = OverlayService.popup.alert({
            template: $translate.instant('CREATE_POST_COOLOFF_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        }

        return;
      }


      // This is a bit tough because it means we can't change the name on the
      // server. ID-based is tough as well. And I'd rather not add another field just for
      // this.
      if ($scope.group && $scope.group.name == 'Experiments') {

        $scope.showExperimentShare();
      } else {

        $scope.communityPostData.postText = '';
        
        if($scope.group.name == 'Your Mind Matters Podcast'){
          $scope.groupDescription = $translate.instant('COMMUNITY_YOUR_MIND_MATTERS_PODCAST_POST');
        } else {
          $scope.groupDescription = $scope.group.description;
        }
        showCreatePostModal();
      }
    };  

    // This is now set up to load the group on demand, as is necessary when going directly to
    // a community.
    $scope.loadGroupOnDemand = function loadGroupOnDemand(){

      GroupsService.getGroup($scope.groupId)
        .success(function(group) {
          $scope.group = group;
          $scope.loadingGroup = false;
          if($scope.initView)
            $scope.initView();
        })
        .error(function() {
          $scope.loadingGroup = false;
        });    
    };      

    $scope.createPostInternal = function createPostInternal(text, sharingData, postId) {
      var deferred = $q.defer();

      $scope.submittingPost = true;
      $scope.typing = false;

      var postData;
      // We don't want to send the URL up that we used since the signed URL will
      // be generated coming back every time.
      var localUrl;

      if (sharingData) {

        postData = [];

        // We can only have one element in sharingData, but we need to get the key out.
        for (var key in sharingData) {

          postData.push({
            name: 'type',
            value: key
          });

          // Not sure if we'll use this but it could be handy.
          postData.push({
            name: 'version',
            value: '1'
          });

          if (key == 'Mood') {

            // Need to create an array representation of the mood entries.
            var moodEntries = sharingData.Mood.moodEntries;

            postData.push({
              name: 'data',
              value: JSON.stringify(moodEntries)
            });

            postData.push({
              name: 'startDate',
              value: sharingData.Mood.startDate
            });

            postData.push({
              name: 'numberOfDays',
              value: sharingData.Mood.numberOfDays
            });
          } else if (key == 'Thought') {

            var thought = sharingData.Thought;

            postData.push({
              name: 'data',
              value: JSON.stringify(thought)
            });

            // The signed urls expire in 7 days.
            var expiresAt = new Date(new Date().getTime() + (7 * 1000 * 60 * 60 * 24));

            postData.push({
              name: 'expiresAtStr',
              value: expiresAt.toString()
            });
          } else if (key == 'Experiment') {

            var experiment = sharingData.Experiment;

            postData.push({
              name: 'data',
              value: JSON.stringify(experiment)
            });
          } else if (key == 'Image') {

            var image = sharingData.Image;

            var parser = document.createElement('a');
            parser.href = image.url;

            if ($rootScope.isSavingQuoteImage) {
              postData.push({
                name: 'imageURL',
                value: image.url  // Get rid of the beginning slash.
              });
              $rootScope.isSavingQuoteImage = false;
            } else {
              postData.push({
                name: 'path',
                value: parser.pathname.substring(1) // Get rid of the beginning slash.
              });
            }

            localUrl = image.url;
          }

          break;
        }
      }

      $("#postText").blur();

      var groupPostText = $scope.groupPostData.postText;
      var communityPostText = $scope.communityPostData.postText;
      
      if($scope.isEditingComment){
        GroupsService.editComment($scope.postForEdit.id, text)
          .success(function(comment){
            $scope.isEditingComment = false;
            $scope.submittingPost = false;
            $scope.isEditing = false;
            deferred.resolve(comment);

            $scope.loadPostComments(true);
          })
          .error(function() {
            $scope.groupPostData.postText = groupPostText;
            $scope.communityPostData.postText = communityPostText;

            OverlayService.popup.alert({
              template: $translate.instant('CREATE_POST_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });

            $scope.submittingPost = false;

            deferred.reject();

          });          

        return deferred.promise;
      }

      GroupsService.createGroupPost($scope.groupId, text, postData, postId)
        .success(function(post) {

          $scope.groupPostData.postText = '';
          $scope.communityPostData.postText = '';

          $scope.submittingPost = false;
          var groupType = $scope.group && $scope.group.groupType ? $scope.group.groupType : null;

          // We're just going to reload the newer posts.
          if (groupType == 'PERSONAL') {
            if ($scope.finishedPost)
              $scope.finishedPost(post);

            return deferred.promise;
          }

          if (groupType == 'GROUP' || groupType == 'CLIENT' || groupType == 'COACH') {

            $scope.groupPosts.push(post);

            $scope.postDataObjects[post.id] = {};

            // Store the post data so it can be referenced right away.
            for (var i = 0; i < postData.length; ++i) {

              var localData = postData[i];

              $scope.postDataObjects[post.id][localData.name] = localData.value;
            }

            // Save this locally so that we have the reference to it.
            if (localUrl)
              $scope.postDataObjects[post.id].url = localUrl;

            $timeout(function() {
              $scope.scrollToNewPosts();
            });

          } else if (groupType == 'COMMUNITY') {
            // Check to see if you should get credit for leveling up after this post.
            SkillsService.checkForLevelUp();
            if($scope.groupPosts){
              var index = _.findIndex($scope.groupPosts, {id: post.id});
              if(index > -1){
                $scope.groupPosts[index] = post;
              } else {
                $scope.groupPosts.splice(0, 0, post);
              }
            } else {
              $rootScope.postEdited = true;
            }
          }

          $scope.createVoteObject(post);

          if($scope.updateMoodGraphs)
            $timeout($scope.updateMoodGraphs);

          $timeout(function() {
            $rootScope.$broadcast('event:createdMessage');
          }, 500);

          if ($scope.finishedPost)
            $scope.finishedPost(post);

          deferred.resolve(post);

          // This happens after calling finishedPost so that an extending controller
          // can look at what was shared.
          $scope.sharingData = {};
        })
        .error(function() {

          $scope.groupPostData.postText = groupPostText;
          $scope.communityPostData.postText = communityPostText;

          OverlayService.popup.alert({
            template: $translate.instant('CREATE_POST_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.submittingPost = false;

          deferred.reject();

        });

      return deferred.promise;
    };

    $scope.createPost = function createPost(event, postId) {

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if ($scope.checkOfflineMode()) return;

      if ($scope.group.groupType != 'PERSONAL' && AccountService.getAccountUser().user.banned) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('BANNED_USER_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return;
      }

      if ($scope.group.groupType != 'PERSONAL' && !$scope.isUserEmailValidated()) {

        $scope.checkRemoteEmailValidation(function(validated) {

          if (validated)
            $scope.createPost();
        });

        return;
      }

      var hasSharingData = false;
      if ($scope.hasSharingData) {

        hasSharingData = $scope.hasSharingData('Mood') || $scope.hasSharingData('Thought') || $scope.hasSharingData('Experiment');
      }

      var text = $scope.groupPostData.postText.trim();
      if ($scope.group.groupType != 'PERSONAL' && text.length === 0 && !hasSharingData) {

        $scope.groupError = $translate.instant('CREATE_POST_TEXT_ERROR');
        return;
      }

      $scope.createPostInternal(text, $scope.sharingData, postId);
    };

    $scope.canCreateCommunityPost = function canCreateCommunityPost() {

      return !AccountService.getAccountUser().user.banned && GroupsService.canCreatePublicGroupPost($scope.group);
    };

    $scope.createCommunityPost = function createCommunityPost() {
      var postId;

      if($scope.postForEdit){
        postId = $scope.postForEdit.id;
        $scope.groupId = $scope.postForEdit.groupId;
      }

      var text = $scope.communityPostData.postText.trim();
      if (text.length === 0) {  

        $scope.communityError = $translate.instant('CREATE_POST_TEXT_ERROR');
        return;
      } else if (text.length > 500) {

        $scope.communityError = $translate.instant('CREATE_POST_LENGTH_ERROR');
        return;
      }

      $scope.communityError = undefined;

      $scope.createPostInternal(text, null, postId).then(function() {

        $scope.closeCreatePostModal();

        if($scope.showNew)
          $scope.showNew(true);

        if (!$scope.mobile) {
          redrawMasonry();
        }

      }); 

    };

    $scope.deleteComment = function deleteComment(event, comment) {

      event.preventDefault();
      event.stopPropagation();

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('ARCHIVE_COMMENT_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('REMOVE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {
          GroupsService.archiveComment(comment.id)
            .success(function() {

              $scope.removeComment(comment);

            })
            .error(function() {
              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('ARCHIVE_COMMENT_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };

    initController();
  }
]);

angular.module('communitiesHelpCtrl', [])

.controller('CommunitiesHelpCtrl', ['$scope', '$sce', '$state', '$stateParams', '$controller', '$translate', '$ionicHistory', '$ionicSlideBoxDelegate', 'AccountService',
  function($scope, $sce, $state, $stateParams, $controller, $translate, $ionicHistory, $ionicSlideBoxDelegate, AccountService) {

    // Extend the help controller.
    $controller('HelpCtrl', {
      $scope: $scope
    });

    $scope.getHelpSlide = function getHelpSlide(slide) {

      var key = 'COMMUNITIES_HELP_SLIDE_' + slide;

      return $sce.trustAsHtml($translate.instant(key));
    };

    $scope.getSlideIndex = function getSlideIndex() {
      var slide_index = "slide" + $ionicSlideBoxDelegate.$getByHandle('communities-help-slides').currentIndex();
      return slide_index;
    };

    $scope.confirm = function confirm() {

      AccountService.setUserPreference('viewed_community_rules', 'true');

      // Hack.
      $ionicHistory.currentView($ionicHistory.backView());
      // This is now reused in groups and communities so we need to be sure to go to the right place.
      if ($state.current.name == 'app.communities-help') {
        // then we're coming from featured post
        if($stateParams.postId){
          $state.go('app.communities-post-comments', {
            postId: $stateParams.postId,
            previousTab: $stateParams.previousTab
          }, {
            location: 'replace'
          });
          return;
        }
        $state.go('app.communities-posts', {
          groupId: $stateParams.groupId,
          order: $stateParams.order
        }, {
          location: 'replace'
        });
        return;
      } else if ($state.current.name == 'app.groups-help') {

        $state.go('app.group-posts', {
          groupId: $stateParams.groupId,
          order: $stateParams.order
        }, {
          location: 'replace'
        });
      }
    };
  }
]);
var ctrl = angular.module('communityNotificationsSettingsCtrl', []);
ctrl.controller('CommunityNotificationsSettingsCtrl', ['$scope', 'AccountService', '$timeout', '$ionicPlatform',
  function($scope, AccountService, $timeout, $ionicPlatform) {

    function initialize() {

      $timeout(function() {
        var doNotDisturbPref = AccountService.getUserPreference('notifications_dnd');
        if (!doNotDisturbPref || doNotDisturbPref === 'false') {
          $scope.data.doNotDisturb = 'false';
        } else {
          $scope.data.doNotDisturb = 'true';
        }

        var doNotDisturbWindowPref = AccountService.getUserPreference('notifications_dnd_window');
        if (!doNotDisturbWindowPref || doNotDisturbWindowPref === 'false') {
          $scope.doNotDisturbStart = '22';
          $scope.doNotDisturbEnd = '8';
        } else {
          $scope.doNotDisturbStart = doNotDisturbWindowPref.split(',')[0];
          $scope.doNotDisturbEnd = doNotDisturbWindowPref.split(',')[1];
        }

        var repliesPref = AccountService.getUserPreference('receive_replies');
        if(!repliesPref || repliesPref == 'true'){
          $scope.data.receiveReplies = 'true';
        } else {
          $scope.data.receiveReplies = 'false';
        }

        var communityNotificationPref = AccountService.getUserPreference('receive_community_notifications');
        if (!communityNotificationPref) {
          $scope.data.communityNotification = 'true';
        } else {
          $scope.data.communityNotification = '' + (communityNotificationPref.toLowerCase() == 'true');
        }

      });
    }

  	$scope.indexToTime = function indexToTime(ndx) {
  	  return moment().set({hours: ndx}).format('h A');
  	};

  	$scope.updateDoNotDisturb = function updateDoNotDisturb() {

  	  AccountService.setUserPreference('notifications_dnd', '' + $scope.data.doNotDisturb, angular.noop);
  	};

  	$scope.updateDoNotDisturbWindow = function updateDoNotDisturbWindow(newVal) {

  	  AccountService.setUserPreference('notifications_dnd_window', newVal, angular.noop);
  	};

    $scope.updateReceiveReplies = function updateReceiveReplies(){

      AccountService.setUserPreference('receive_replies', '' + $scope.data.receiveReplies, angular.noop);
    };  
    
    $scope.updateCommunityNotifications = function updateCommunityNotifications() {
      AccountService.setUserPreference('receive_community_notifications', $scope.data.communityNotification,
        function success() {

          $scope.communityNotificationUpdated = true;

          $timeout(function() {

            $scope.communityNotificationUpdated = false;
          }, 3000);
        });
    };

    // No idea why we need to set this in afterEnter in a timeout. Setting it any earlier
    // causes rendering issues on iOS 12: https://github.com/pacifica-app/pacifica/issues/3876
    $scope.$on("$ionicView.afterEnter", function( scopes, states ) {
      initialize();
    });

    $ionicPlatform.on('resume', function(){
      $timeout(function() {
        initialize();
      });
    });

  }
 ]);

(function() {

  var ctrl = angular.module('contributingFactorsCompleteCtrl', []);
  ctrl.controller('ContributingFactorsCompleteCtrl', ['$scope', '$rootScope', '$controller', '$state', '$stateParams', '$timeout', '$translate', '$ionicHistory', '$ionicPopup', 'AccountService', 'AudioService', 'HabitsService', 'Environment',
    function($scope, $rootScope, $controller, $state, $stateParams, $timeout, $translate, $ionicHistory, $ionicPopup, AccountService, AudioService, HabitsService, Environment) {

      if ($scope.mobile) {
        $controller('ThoughtCompleteCtrl', {
          $scope: $scope
        });
      } else {
       $controller('ProgressCtrl', {
         $scope: $scope
       }); 
      }


      var pieColors = [
        '#5DA5DA', // (blue)
        '#FAA43A', // (orange)
        '#60BD68', // (green)
        '#F15854', // (red)
        '#B2912F', // (brown)
        '#B276B2', // (purple)
        '#DECF3F', // (yellow)
        '#F17CB0'  // (pink)
      ];

      $scope.getTagColor = function getTagColor(index) {

        return pieColors[index % pieColors.length];
      };

      $scope.recording = $scope.thought.recordings.event;

      // The tagSpan in each of these tags is the percentage that will be displayed
      $scope.tags = $scope.recording.tags;

      window.drawCanvas = function drawCanvas() {

        $scope.canvasScale = window.devicePixelRatio;

        var canvas = $("#pieChart")[0];
        var ctx = canvas.getContext("2d");

        var elementWidth = $(canvas).innerWidth();
        var elementHeight = $(canvas).innerHeight();

        if (canvas.width != (elementWidth * $scope.canvasScale))
          canvas.width = elementWidth * $scope.canvasScale;
        if (canvas.height != (elementHeight * $scope.canvasScale))
          canvas.height = elementHeight * $scope.canvasScale;

        canvas.style.width = elementWidth + 'px';
        canvas.style.height = elementHeight + 'px';

        var width = canvas.width;
        var height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.save();

        var lastend = 0;
        var total = 0;

        for (var j=0;j<$scope.tags.length; ++j) {

          total += $scope.tags[j].tagSpan;
        }

        for (var i=0;i<$scope.tags.length; ++i) {

          var tag = $scope.tags[i];

          ctx.fillStyle = pieColors[i % pieColors.length];
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, canvas.height / 2);
          ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (tag.tagSpan / total)), false);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.fill();
          lastend += Math.PI * 2 * (tag.tagSpan / total);
        }

        ctx.restore();
      };

      $timeout(drawCanvas);
    }

  ]);
})();
(function() {

  var ctrl = angular.module('evidenceCompleteCtrl', []);

  /*
   * This controller extends the basic ThoughtCompleteCtrl to provide functionality
   * specific to the tags used in the evidence activity.
   */
  ctrl.controller('EvidenceCompleteCtrl', ['$scope', '$controller', '$translate',
    function($scope, $controller, $translate) {

      if ($scope.mobile) {
        $controller('ThoughtCompleteCtrl', {
          $scope: $scope
        });
      } else {
       $controller('ProgressCtrl', {
         $scope: $scope
       }); 
      }

      $scope.recording = $scope.thought.recordings.thought;

      $scope.getQuestionYesNo = function getQuestionYesNo(index) {

        var tag = $scope.recording.tags[index];

        return $translate.instant(tag.tagTypeString == 'positive' ? ' YES' : 'NO');
      };

      $scope.showQuestionAnswer = function showQuestionAnswer(index) {

        var tag = $scope.recording.tags[index];

        return tag.tagTypeString == 'positive';
      };

      $scope.getQuestionAnswer = function getQuestionAnswer(index) {

        var tag = $scope.recording.tags[index];

        return tag.tagString;
      };
    }
  ]);
})();
angular.module('groupPostCommentsCtrl', [])
.controller('GroupPostCommentsCtrl', ['$scope', '$rootScope', '$controller', '$stateParams', '$timeout', '$translate', '$ionicPlatform', '$ionicScrollDelegate', 'AccountService', 'GroupsService', 'OverlayService', '$state',
  function($scope, $rootScope, $controller, $stateParams, $timeout, $translate, $ionicPlatform, $ionicScrollDelegate, AccountService, GroupsService, OverlayService, $state) {

    // Extend the abstract controller.
    $controller('AbstractGroupPostsCtrl', {
      $scope: $scope
    });

    $scope.postId = $scope.postId || +$stateParams.postId;

    // Override this so that it doesn't do the same thing for a group.
    $scope.inputFocused = function inputFocused() {

      if (!$scope.hasUserNickname() || $scope.isNicknameGenerated()) {

        $scope.showUpdateNickname();

        // Avoid issues with the text input coming up right away.
        $("#postText").blur();

        $scope.inputHasFocus = true;
      } else {

        $scope.checkRemoteEmailValidation(function(validated) {

          if (validated)
            $scope.inputHasFocus = true;
        });
      }
    };

    $scope.finishedPost = function finishedPost(post){
      if($scope.editedPost){
        $scope.post = post;
      }
    };

    // Handled when going to the profile now.
    // GroupsService.clearPostNotification($scope.postId);
    function initController(){
      
      if($scope.mobile && AccountService.shouldShowCommunityRules()){
        $state.go('app.communities-help', {
          intro: true,
          postId: $stateParams.postId,
          previousTab: $stateParams.previousTab
        });
        return;
      }
      // This needs to be resident.
      $scope.post = GroupsService.getCachedPost($scope.postId);
      if (!$scope.post) {

        GroupsService.getGroupPost($scope.postId)
          .success(function(groupContext) {

            if (groupContext &&
              groupContext.groupPostsContext &&
              groupContext.groupPostsContext.groupPosts &&
              groupContext.groupPostsContext.groupPosts.length > 0) {

              $scope.post = groupContext.groupPostsContext.groupPosts[0];
              $scope.groupId = $scope.post.groupId;
              $scope.loadGroupOnDemand();
              // TODO Handle post data and votes

              $scope.addUserVotes(groupContext.userVotes);
            }
          })
          .error(function() {
            OverlayService.popup.alert({
              template: $translate.instant('LOADING_COMMENTS_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      } else {
        $scope.groupId = $scope.post.groupId;
        $scope.loadGroupOnDemand();
        $scope.postData = GroupsService.getCachedPostData($scope.post.id);
        $scope.userVotes = GroupsService.getCachedUserVotes();
      }

      $scope.order = $stateParams.order;
      if (!$scope.order)
        $scope.order = 'score';
      if (!$scope.mobile && $scope.order == 'hotness')  // Web comments only
        $scope.order = 'date';

      $scope.limit = 25;
      $scope.offset = 0;
      $scope.canLoadMore = true;

      // Need to be able to prevent new users from posting without a nickname.
      GroupsService.initEditNicknameFunctionality($scope);

      $ionicPlatform.onHardwareBackButton(function(e) {
        if($scope.nicknameModal){
          $scope.closeNicknameModal();  // from groupsService closeNicknameModal
        }
        return false;
      });

      $scope.postComments = [];
      loadPostComments();
    }

    function resetOffset() {

      $scope.offset = 0;
    }

    $scope.getGroupRemainingPostCharacters = function getGroupRemainingPostCharacters() {

      var text = $scope.groupPostData.postText;
      if (!text)
        text = '';

      return 512 - text.length;
    };

    // Overriding this to allow us to go back
    $scope.removePost = function removePost(post) {
      $rootScope.didDeleteCommunityPost = true;
      $scope.goBack();
    };

    $scope.getCommentPostTitle = function getCommentPostTitle() {

      if ($scope.post)
        return $scope.getPostTitle($scope.post, true);

      return $translate.instant('LOADING') + '...';
    };

    $scope.showNew = function showNew() {

      if ($scope.order != 'date') {
        $scope.order = 'date';

        resetOffset();
        $scope.postComments.length = 0;

        loadPostComments();
      }
    };

    $scope.showAllTime = function showAllTime() {

      if ($scope.order != 'score') {
        $scope.order = 'score';

        resetOffset();
        $scope.postComments.length = 0;

        loadPostComments();
      }
    };

    // TODO Partially duplicated. This one gets the cached post data from the groupss service.
    $scope.getExperiment = function getExperiment() {

      if ($scope.postData) {

        if ($scope.postData.experiment) {
          return $scope.postData.experiment;
        } else if ($scope.postData.type == 'Experiment') {

          var data = $scope.postData.data;
          if (data) {

            var experiment = JSON.parse(data);
            $scope.postData.experiment = experiment;

            return experiment;
          } else {
            $scope.postData.experiment = {};
          }
        }
      }

      return {};
    };

    $scope.postComment = function postComment(event) {

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if ($scope.checkOfflineMode()) return;

      if (AccountService.getAccountUser().user.banned) {

        OverlayService.popup.alert({
          template: $translate.instant('BANNED_USER_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return;
      }

      if (!$scope.hasUserNickname() || $scope.isNicknameGenerated() ) {

        $scope.showUpdateNickname();
        return;
      }

      // if (!GroupsService.canCreatePublicComment($scope.post.groupId)) {

      //   OverlayService.popup.alert({
      //     template: $translate.instant('POSTING_COMMENT_COOLOFF_ERROR'),
      //     okText: $translate.instant('OK_GOT_IT'),
      //     okType: 'button-default'
      //   });

      //   return;
      // }

      // Could be a problem here loading the value...
      var text = $scope.groupPostData.postText.trim();
      if (text.length === 0 && !hasSharingData) {

        $scope.groupError = $translate.instant('CREATE_POST_TEXT_ERROR');
        return;
      }

      $("#postText").blur();

      $scope.postingComment = true;
      $scope.postingCommentText = text;

      $scope.groupPostData.postText = '';

      GroupsService.postComment($scope.postId, $scope.post.groupId, text)
        .success(function(comment) {

          $scope.postingComment = false;

          $scope.postComments.splice(0, 0, comment);

          $scope.showNew();

          $scope.createVoteObject(comment);

          ++$scope.post.comments;

          $timeout(function() {
            $rootScope.$broadcast('event:createdMessage');
          }, 500);

        })
        .error(function() {

          $scope.groupPostData.postText = $scope.postingCommentText;

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('POSTING_COMMENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.postingComment = false;
        });
    };

    $scope.removeComment = function removeComment(comment) {
      
      --$scope.post.comments;
      $scope.removeCommentById(comment.id);
    };

    $scope.removeCommentById = function removeCommentById(commentId) {

      for (var i = 0; i < $scope.postComments.length; ++i) {

        if ($scope.postComments[i].id == commentId) {

          $scope.postComments.splice(i, 1);
          return;
        }
      }
    };

    $scope.checkForEditClose = function checkForEditClose(){
      if(!$scope.editedComment){
        $scope.closeEditCommentModal();
        return;
      }
      OverlayService.popup.confirm({
        template: $translate.instant('THOUGHTS_GO_BACK_PROMPT'),
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('CONFIRM'),
        okType: 'button-default'
      }).then(function(res) {
        if (res) {
          $scope.closeEditCommentModal();
        }
      });       
    };

    $scope.closeEditCommentModal = function closeEditCommentModal(){
      OverlayService.modal.close($scope.editCommentModal).then(function(modal) {
        $scope.editCommentModal = modal;
      });

      $scope.updatingComment = false;
      $scope.editComment = null;
      $scope.editedComment = false;
    };

    $scope.updateComment = function updateComment(){
      $scope.updatingComment = true;
      $scope.closeEditCommentModal();
    };

    $scope.didEditComment = function didEditComment(){
      $scope.editedComment = true;
    };

    $scope.editCommentClick = function editCommentClick(event, comment){
      // this wasn't implemented, but leaving it here in case we decide to
      event.preventDefault();
      event.stopPropagation();
      
      $scope.commentForEdit = $scope.getPostTitle(comment, true, true);

      OverlayService.modal.open({
        modalId: 'EditCommentModal',
        templateUrl: 'views/groups/communities.editComment.modal.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.editCommentModal = modal;
      });      
    };

    $scope.closeReportModal = function closeReportModal() {
      $scope.reporting = false;
      if ($scope.reportModal) {
        $scope.reportPostData.postText = '';

        return OverlayService.modal.close($scope.reportModal).then(function(modal) {
          $scope.reportModal = modal;
        });
      }
    };

    $scope.reportComment = function reportComment() {

      var reportText = $scope.reportPostData.postText.trim();
      if (!reportText || reportText.length === 0) {

        $scope.reportError = $translate.instant("REPORT_POST_TEXT_ERROR");
        return;
      }

      if($scope.reporting)
        return;
      $scope.reporting = true;
      
      var referUser = $scope.referUserData.referUser;

      $scope.reportError = undefined;

      GroupsService.reportComment($scope.reportingCommentId, reportText, referUser ? true : false)
        .success(function() {

          $scope.closeReportModal().then(function() {
            $scope.removeCommentById($scope.reportingCommentId);

            --$scope.post.comments;

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('REPORT_POST_CONFIRM'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });

        })
        .error(function() {
          $scope.reporting = false;
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('REPORT_POST_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    };

    $scope.showReportComment = function showReportComment(event, comment) {

      event.stopPropagation();
      event.preventDefault();

      $scope.reportingComment = true;

      if (AccountService.getAccountUser().user.banned) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('BANNED_USER_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return;
      }

      $scope.reportingCommentId = comment.id;

      $scope.referUserData = {
        referUser: false
      };
      var reportModal;
      if ($scope.mobile) {
        reportModal = 'views/groups/groups.report.modal.html';
      } else {
        reportModal = 'templates/groups/groups.report.modal.html';
      }

      OverlayService.modal.open({
        modalId: 'ReportModal',
        templateUrl: reportModal,
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.reportModal = modal;
      });
    };


    $scope.loadMorePostComments = function loadMorePostComments() {

      $scope.offset += $scope.limit;

      loadPostComments();
    };

    function loadPostComments() {

      $scope.loadingComments = true;

      GroupsService.findGroupPostComments($scope.postId, $scope.order, $scope.limit, $scope.offset)
        .success(function(context) {

          // There needs to be some sort of reconciliation here.
          var newComments = context.postComments;

          $scope.loadingComments = false;

          var newPosts = context.postComments;

          // if (firstLoad)
          //   $scope.postComments.length = 0;

          $scope.canLoadMore = newComments.length == $scope.limit;

          $scope.lastPostLoad = new Date();

          // These are returned in the reverse order.
          // Don't think we want to do this.
          // newPosts = newPosts.reverse();

          // Could potentially remove duplicates here.

          // This adds them all to the beginning
          // Array.prototype.splice.apply($scope.postComments, [0, 0].concat(newPosts));

          // This adds them all to the end.
          $scope.postComments.push.apply($scope.postComments, newComments);



          $timeout(function() {
            // Get mentionable users in the thread

            var creatorUser = {'userId': $scope.post.creatorId,
                               'nickname': $scope.post.creatorNickname };

            $scope.mentionableUsers = _.map($scope.postComments, function(comment) {
              return {'userId': comment.creatorId,
                      'nickname': comment.creatorNickname };
            });
            $scope.mentionableUsers.push(creatorUser);
            $scope.mentionableUsers = _.uniqBy($scope.mentionableUsers, 'userId');  // remove duplicates
            $scope.mentionableUsers = _.filter($scope.mentionableUsers, function(user) {  // remove self posts, deleted posts
              var currentUserId = AccountService.getAccountUser().user.id;
              var isSelf = user.userId === currentUserId;
              return user.nickname !== null &&
                     user.userId !== null &&
                     !isSelf;
            });
          });

          $scope.addUserCommentVotes(context.userVotes);

          $ionicScrollDelegate.resize();

          $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function() {

          $scope.loadingComments = false;
        });
    }

    $scope.$on("$ionicView.beforeEnter", function() {
      // This is hacky, but this view requires some specific styling when navigated to from the home feed.
      if ($stateParams.previousTab)
        $('#groupPosts.comments').addClass('came-from-home-feed');
    });

    initController();
  }
]);

angular.module('groupPostsCtrl', [])
.controller('GroupPostsCtrl', ['$scope', '$ionicHistory', '$location', '$controller', '$state', '$stateParams', '$timeout','$interval', '$translate', '$ionicScrollDelegate', '$ionicPlatform', 'AccountService', 'HabitsService', 'GroupsService', 'GeneralService', 'Environment', 'TokenService', 'OverlayService', '$rootScope', 'CareteamService',
  function($scope, $ionicHistory, $location, $controller, $state, $stateParams, $timeout, $interval, $translate, $ionicScrollDelegate, $ionicPlatform, AccountService, HabitsService, GroupsService, GeneralService, Environment, TokenService, OverlayService, $rootScope, CareteamService) {

    var reloadDelayTime = 30000;
    $scope.polling = false;
    $scope.pollingInterval = undefined;

    // Extend the abstract controller.
    $controller('AbstractGroupPostsCtrl', {
      $scope: $scope
    });
    
    $scope.isIos = Environment.isIos();
    $scope.isX = Environment.isIphoneX();
    
    $scope.isCareteam = function isCareteam() {
      if($stateParams.therapist) {
        var isCoach = $stateParams.therapist.coach;
        return isCoach;
      }
    };

    $scope.goBack = function goBack(){
      $ionicHistory.goBack();
    };

    $scope.$watch("polling", function(newVal, oldVal) {
        if (oldVal === false && newVal === true) {
          $scope.pollingInterval = $interval($scope.checkForNewPosts, reloadDelayTime);
          console.log($scope.pollingInterval);
        }
    });

    $scope.clinicianDashChatInitialized = function() {
      $scope.scrollBottomOnChatMessagesRendered = true;
    };

    $scope.clinicianChatMessagesRendered = function() {
      if ($scope.scrollBottomOnChatMessagesRendered) {
        $('.chat-scroll-container').scrollTop($('.chat-scroll-container').prop('scrollHeight'));
      }
    };

    function loadFirstGroup() {
      if ($location.path() === '/app/groups') {
        GroupsService.findUserGroups()
          .success(function(data) {
            $scope.filteredGroups = data.userGroups.filter(function(group) {
              return group.groupType === 'GROUP';
            });
            if ($scope.filteredGroups.length > 0) {
              $scope.groupId = $scope.filteredGroups[0].id;
              $state.go('app.groups', {'groupId': $scope.groupId });
            } else {
              $scope.group = undefined;
              $state.go('app.groups', {'groupId': ''});
            }

          });
      } else if ($location.path().indexOf('/practitioner/client/') != -1) {

        GroupsService.findUserGroups()
          .success(function(data) {

            function loadClientChatGroup() {
              $scope.groupId = $scope.client.clientGroupId;
              $location.search({'groupId': $scope.groupId, 'activeTab': 'chat' });
              $scope.loadGroupOnDemand();

              // This is messy, but calculating this with css alone doesn't seem to be possible
              var chatBoxHeight = $(document).height() - $('.client-menu').offset().top - 120 - $('.group-message-bar').height();
              $('.chat-scroll-container').css('height', chatBoxHeight);

              $scope.scrollToNewPosts();
            }

            if ($scope.client) {
              loadClientChatGroup();
            } else {
              once($scope, 'event:setClient', loadClientChatGroup);
            }
          });
      } else {
        GroupsService.findPublicGroups()
          .success(function(publicGroupContext) {
            $scope.groupId = publicGroupContext.publicGroups[0].id;
            $scope.communities = publicGroupContext.publicGroups;
            $scope.userLikes = publicGroupContext.userLikes;
            $scope.userShares = publicGroupContext.userShares;
            $scope.loadingCommunities = false;
            $location.search({'groupId': $scope.groupId, 'order': 'hotness' });
            $scope.loadGroupOnDemand();
          });
      }
    }

    function initController(){
      if ($scope.mobile || $stateParams.groupId) {
        $scope.groupId = $stateParams.groupId;
      } else {
        loadFirstGroup();
      }

      if ($stateParams.therapist) {
        $scope.therapist = $stateParams.therapist;
      } else {
        AccountService.onceUserContextInitialized(function() {
          if (AccountService.isPractitioner()) {
            $scope.therapist = AccountService.getAccountUser().practitioner;
          }
        });
      }
      $scope.loadGroupOnDemand();

      GroupsService.initEditFunctionality($scope);
      GroupsService.initEditNicknameFunctionality($scope);
      GroupsService.clearGroupNotification($scope.groupId);

    }

    function loadMentionableUsers() {

      if (!$scope.loadingMentionableUsers && $location.path() === '/app/groups/posts') {

        $scope.loadingMentionableUsers = true;

        GroupsService.getGroupUsers(+$stateParams.groupId)
          .success(function(context) {

            $scope.loadingMentionableUsers = false;
            var users = context.groupUsers;
            $scope.mentionableUsers = users;

          })
          .error(function(data) {

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('RETRIEVE_USERS_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });

            $scope.loadingMentionableUsers = false;
          });

      }
    }

    $scope.switchGroup = function(communityId){
      $location.search({'groupId': communityId, order: 'hotness'});
      $scope.groupId = communityId;
      $scope.groupPosts = [];
      $scope.loadGroupOnDemand();
    };

    $scope.$watch(function(){ return $location.search(); }, function(newVal, oldVal){

      var groupIdUpdated = ('groupId' in newVal) && ('groupId' in oldVal) && (newVal.groupId !== oldVal.groupId);

      if (!$scope.group && $scope.loadingGroup) {

        // Hack. Only load the group have group context is available
        var loadGroupWhenReady = function() {
          var groupsHaveLoaded = !$scope.loadingGroups;
          if (groupsHaveLoaded) {
            $scope.loadGroupOnDemand();
          } else {
            $timeout(function() {
              console.log('waiting for group to be ready');
              loadGroupWhenReady();
            }, 50);
          }
        };
        loadGroupWhenReady();


      } else if (groupIdUpdated || $rootScope.postEdited === true) {
        $scope.switchGroup(newVal.groupId);
        $rootScope.postEdited = undefined;
      }

    }, true);

    $scope.loadingGroup = true;

    $scope.initView = function initView() {

      // Load the posts.
      reloadGroupPosts();

      loadMentionableUsers();

      // Create the connection to the server for real-time chat.
      createWebsocket();
    };

    $scope.isMentionsPopupOpen = function isMentionsPopupOpen() {
      return $('#groups-mentions-popup').attr('popup-visible');
    };

    $scope.getGroupTitle = function getGroupTitle() {

      var name = $scope.group ? $scope.group.name : undefined;

      if (name) {

        if (name.length > 20) {
          name = name.substring(0, 20);

          // Don't end on a space
          if (name.substring(19) == ' ')
            name = name.substring(0, 19);

          //name += '...';
        }
      } else {
        name = '';
      }

      return name;
    };

    $scope.getGroupCode = function getGroupCode() {

      return ($scope.group && $scope.isOwner($scope.group)) ? $scope.group.code : '';
    };

    $scope.getClinicianAvatar = function getClinicianAvatar(post, therapist) {
      // This needs to be on top otherwise it will return post creatorAvatar
      // This will break the view on both mobile and web dashboard
      if (!therapist)
        return;

      if (post.creatorAvatar)
        return post.creatorAvatar;
      
      if (therapist.userId != post.creatorId)
        return;

      return therapist.photoUrl;
    };

    $scope.markAsRead = function(post) {
      $scope.markedAsRead = true;
      CareteamService.markAsRead(post)
        .success(function(result) {
        });
    };

    $scope.isLastMessageFromClient = function(post) {

      var clientPosts = _.filter($scope.groupPosts, function(post){
        return !$scope.isPostOwner(post);
      });

      return post.id === clientPosts[clientPosts.length-1].id;
    };

    $scope.showGroupTip = function showGroupTip() {

      if ($scope.group && $scope.group.members > 1)
        return false;

      var pref = AccountService.getUserPreference('sent_group_invitation');
      return (!pref) && $scope.isOwner($scope.group);
    };

    $scope.showManageGroupTooltip = function showManageGroupTooltip() {

      var manageGroupTooltipPref = AccountService.getUserPreference('viewed_manage_group_tooltip');
      return !$scope.showGroupTip() && (!manageGroupTooltipPref || manageGroupTooltipPref == 'false');
    };

    $scope.dismissManageGroupTooltip = function dismissManageGroupTooltip() {

      $scope.viewManageGroupTooltip = false;

      AccountService.setUserPreference('viewed_manage_group_tooltip', 'true');
    };

    // We get this notification
    function websocketClosed() {

      // Recreate the web socket. But, don't do it if we don't have an active reference
      // to a chat connection because we probably destroyed it ourself.
      if (!$scope.destroying && !$scope.websocketError && $scope.chatConnection) {
        createWebsocket();
      }
    }

    function shouldScrollForNewPosts() {
      var current;
      var max;

      if (!$scope.mobile) {
        current = $(window).scrollTop();
        max = $(document).height() - $(window).height();
      } else {
        var scrollPosition = $ionicScrollDelegate.getScrollPosition();
        if (scrollPosition) {
          current = scrollPosition.top;
          max = $ionicScrollDelegate.getScrollView().__maxScrollTop;
        } else {
          // For some reason the scroll position in the Ionic view is not always ready, in which case we don't
          // want to scroll for new posts.
          // It may be a race condition between the view rendering and this function getting called.
          return false;
        }
      }

      return current > max - 30 && $scope.group.groupType == 'GROUP';
    }

    function websocketReceive(e) {

      // Just for testing really.
      if (e.data.startsWith('{')) {

        // This is going to be a GroupChatContext
        var msg = JSON.parse(e.data);

        $scope.usersTyping = msg.usersTyping;

        // TODO We should create a timer that removes the usersTyping if we don't receive anything in 30 seconds.
        // TODO
        // TODO

        // Determine if we are currently scrolled close to the bottom.
        var scrollDown = shouldScrollForNewPosts();

        var newPosts = msg.groupPosts;
        if (newPosts && newPosts.length > 0) {

          for (var i = 0; i < newPosts.length; ++i) {

            var newPost = newPosts[i];

            // Would be nice to avoid it getting sent at all.
            if (newPost.creatorId != AccountService.getAccountUser().user.id) {

              $scope.groupPosts.push(newPost);
              $scope.hasNewPosts = true;
              $scope.markedAsRead = false;
            }
          }

          var postDataObjects = msg.groupPostData;
          if (postDataObjects) {
            updatePostDataObjects(postDataObjects);

            $timeout(function() {
              $scope.updateMoodGraphs(false, false);
            });
          }

          // If we are already scrolled to the bottom, we should scroll
          if (scrollDown)
            $scope.scrollToNewPosts();
        }

        // Make sure the UI updates.
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    }

    $scope.websocketSend = function websocketSend(val) {

      if ($scope.chatConnection) {

        $scope.chatConnection.send(val);
      }
    };

    function websocketError(err) {

      console.log('Error detected: ');
      console.log(err);

      destroyWebsocket();

      // If we were able to open a websocket at one point, we will try again.
      if (!$scope.websocketOpened || $scope.creatingWebsocket) {
        $scope.websocketError = true;
        $scope.polling = true;
      } else {
        createWebsocket();
      }
    }

    function shouldCheckForNewPosts(group) {
      if (!group) return false;
      var groupType = group.groupType;
      var isChatGroup = groupType != 'COMMUNITY' && groupType != 'PERSONAL';
      var isCommunityNewTab = groupType == 'COMMUNITY' && $scope.order == 'date';
      return isChatGroup || isCommunityNewTab;
    }

    function postResumeCallback() {

      if (shouldCheckForNewPosts($scope.group))
        $scope.checkForNewPosts();

      createWebsocket();

      // If we're resuming from the controller, it's likely because we got a notification.
      GroupsService.clearGroupNotification($scope.groupId);
    }

    function createWebsocket() {

      var groupType = $scope.group ? $scope.group.groupType : null;

      if ((groupType != 'GROUP' && groupType != 'CLIENT' &&  groupType != 'COACH') || !AccountService.isLoggedIn())
        return;


      // If we were called for some reason and we're currently trying to connect, don't redo this.
      if ($scope.chatConnection && ($scope.chatConnection.readyState === 0))
        return;


      $scope.creatingWebsocket = true;

      // We might be recreating this as a result of a "resume"
      if ($scope.chatConnection)
        destroyWebsocket();

      // On the web this token will not be accessible. We will likely need to request it from the server.
      var token = TokenService.getToken();

      if (token != 'notsecure') {

        var socketUrl = Environment.websocketURL + '/chat/group/' + $scope.group.id;
        token = TokenService.getToken();
        if (token)
          socketUrl += "?token=" + token;

        $scope.chatConnection = new WebSocket(socketUrl);

        $scope.chatConnection.onclose = websocketClosed;
        $scope.chatConnection.onmessage = websocketReceive;
        $scope.chatConnection.onerror = websocketError;

        $scope.chatConnection.onopen = function() {
          /*Send a small message to the console once the connection is established */
          console.log('Connection open!');

          // Not that we were capable of creating a websocket.
          $scope.websocketOpened = true;
        };

        $scope.creatingWebsocket = false;
      } else {
        $scope.polling = true;
      }
    }

    function destroyWebsocket() {

      if ($scope.chatConnection) {

        var readyState = $scope.chatConnection.readyState;

        // If it's opening, or open, close it. Otherwise it's already being closed.
        if ((readyState === 0) || (readyState == 1)) {
          $scope.chatConnection.close();
        }

        $scope.chatConnection = undefined;
      }
    }

    // Try checking for new posts when the app resumes.
    document.addEventListener("resume", postResumeCallback, false);

    $ionicPlatform.on("pause", function() {

      destroyWebsocket();
      if ($scope.polling === true) {
        console.log("Cancelling Polling");
        $interval.cancel($scope.pollingInterval);
      }
    });

    $scope.$on('$destroy', function() {

      $scope.destroying = true;

      // Remove this once the view has been destroyed.
      document.removeEventListener("resume", postResumeCallback, false);

      // We don't need to tell the server we aren't typing or anything, it will
      // clean up that stuff for us.

      destroyWebsocket();
      if ($scope.polling === true) {
        console.log("Cancelling Polling");
        $interval.cancel($scope.pollingInterval);
      }
    });

    $scope.scrollToNewPosts = function scrollToNewPosts() {

      if ($scope.mobile) {
        $ionicScrollDelegate.scrollBottom(true);
      } else {

        var scrollContainer = $('.chat-scroll-container');
        var chatType = scrollContainer.attr('data-chat-type');

        if (chatType && chatType == 'clinician') {
          // Clinician Web App
          scrollContainer.scrollTop(scrollContainer[0].scrollHeight);
        } else {
          // Client Web App
          $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        }

      }

      $scope.hasNewPosts = false;
    };

    $('.scroll-content').scroll(function() {

      var current = $ionicScrollDelegate.getScrollPosition().top;
      var max = $ionicScrollDelegate.getScrollView().__maxScrollTop;

      if (current > max - 150) {
        $scope.hasNewPosts = false;

        if (!$scope.$$phase) {
          $scope.$digest();
        }
      }
    });

    // This is here as a fallback for the websocket functionality.
    $scope.checkForNewPosts = function checkForNewPosts() {

      if (!$scope.lastPostLoad || !$scope.group) {
        return;
      }

      // We actually need to use the last post's timestamp here. There are potential issues
      // with the client's clock being off compared to the server.
      var lastDate;
      if ($scope.groupPosts.length > 0)
        lastDate = new Date($scope.groupPosts[$scope.groupPosts.length - 1].createdAt);
      else
        lastDate = $scope.lastPostLoad;

      GroupsService.findNewerPosts($scope.group, lastDate)
        .success(function(context) {


          var newPosts = context.groupPostsContext.groupPosts;

          if (newPosts.length > 0) {

            // Determine if we are currently scrolled close to the bottom.
            var scrollDown = shouldScrollForNewPosts();

            // We actually need to go through these and remove any posts that might
            // be in our list already. This is because we could have added our own
            // post when we did it, or gotten ones through the websocket.
            for (var i = newPosts.length - 1; i >= 0; --i) {

              var newPost = newPosts[i];

              for (var j = $scope.groupPosts.length - 1; j >= 0; --j) {

                var existingPost = $scope.groupPosts[j];

                if (newPost.id == existingPost.id) {
                  newPosts.splice(i, 1);
                  continue;
                }
              }
            }

            if (newPosts.length > 0) {

              $scope.hasNewPosts = true;

              if ($scope.group.groupType == 'GROUP' || $scope.group.groupType == 'CLIENT' || $scope.group.groupType == 'COACH') {

                // These are returned in the reverse order.
                newPosts = newPosts.reverse();

                // Could potentially remove duplicates here.

                // This adds them all to the end
                $scope.groupPosts.push.apply($scope.groupPosts, newPosts);
              } else {

                // This adds them all to the beginning
                Array.prototype.splice.apply($scope.groupPosts, [0, 0].concat(newPosts));
              }

              // Update the group post data so things like thoughts render
              var postDataObjects = context.groupPostsContext.groupPostData;
              updatePostDataObjects(postDataObjects);

              $scope.lastPostLoad = new Date();

              if (scrollDown)
                $scope.scrollToNewPosts();
              else if ($scope.group.groupType == 'PERSONAL')
                $ionicScrollDelegate.scrollTop();

              $timeout(function() {
                $scope.updateMoodGraphs(false, false);
              });
            }
          }

        })
        .error(function() {

          console.log("There was a problem loading newer posts.");
        });
    };

    $scope.isOwner = function isOwner() {
      return $scope.group && $scope.group.creatorId == AccountService.getAccountUser().user.id;
    };

    $scope.viewGroupUsers = function viewGroupUsers(event) {

      event.stopPropagation();
      event.preventDefault();

      if (!$scope.group)
        return;

      $state.go('app.groups-users', {
        groupId: $scope.group.id
      });
    };

    $scope.groupPosts = [];

    // A map of post ID to a map of name/value pairs.
    $scope.postDataObjects = {};

    $scope.limit = 25;
    $scope.offset = 0;
    $scope.canLoadMore = true;

    $scope.order = !!$scope.order ? $scope.order : $stateParams.order;

    $scope.loadMoreGroupsPosts = function loadMoreGroupsPosts(reload) {
      var shouldReload;
      if (typeof reload === undefined) {
        shouldReload = false;
      } else {
        shouldReload = reload;
      }

      $scope.offset += $scope.limit;
      reloadGroupPosts(shouldReload);
    };

    $scope.reloadCommunityPosts = function reloadCommunityPosts() {

      $scope.offset = 0;

      reloadGroupPosts(true);
    };

    $scope.isPostType = function isPostType(post, type) {
      if(!post)
        return;

      var postData = $scope.postDataObjects[post.id];
      if (postData) {

        return postData.type == type;
      }

      return false;
    };

    $scope.getCommunityName = function getCommunityName() {

      if (!$scope.group)
        return '';

      var name = $scope.group.name;

      var key = ('COMMUNITY_' + name).replace(/ /g, '_').toUpperCase();

      var translatedName = $translate.instant(key);
      if (translatedName == key)
        return name; // couldn't find it
      else
        return translatedName;
    };

    $scope.getPost = function getPost(postId) {

      for (var i = 0; i < $scope.groupPosts.length; ++i) {

        var post = $scope.groupPosts[i];
        if (post.id == postId)
          return post;
      }
    };

    $scope.getMoodEntries = function getMoodEntries(post) {

      var postData = $scope.postDataObjects[post.id];
      if (postData) {

        if (postData.moodEntries) {
          return postData.moodEntries;
        } else if (postData.type == 'Mood') {

          var data = postData.data;
          if (data) {

            var moodEntries = JSON.parse(data);
            postData.moodEntries = moodEntries;

            return moodEntries;
          }
        }
      }
    };

    $scope.getMoodStartDate = function getMoodStartDate(post) {

      var postData = $scope.postDataObjects[post.id];
      if (postData) {

        if (postData.startDate) {
          return postData.startDate;
        } else if (postData.type == 'Mood') {

          var data = postData.data;
          if (data && data.startDate) {

            var startDate = new Date(data.startDate);
            postData.startDate = startDate;

            return startDate;
          }
        }
      }
    };

    $scope.getMoodNumberOfDays = function getMoodNumberOfDays(post) {

      var postData = $scope.postDataObjects[post.id];
      if (postData) {

        if (postData.numberOfDays) {
          return postData.numberOfDays;
        } else if (postData.type == 'Mood') {

          var data = postData.data;
          if (data) {

            var numberOfDays = +data.numberOfDays;
            postData.numberOfDays = numberOfDays;

            return numberOfDays;
          }
        }
      }
    };

    $scope.getMoodClass = function getMoodClass(post) {

      var moodEntries = $scope.getMoodEntries(post);

      if (moodEntries && moodEntries.length > 0) {

        var moodEntry = moodEntries[moodEntries.length - 1];

        return HabitsService.getMoodClass(moodEntry);
      }
    };

    $scope.getMoodDisplay = function getMoodDisplay(post) {

      var moodEntries = $scope.getMoodEntries(post);

      if (moodEntries && moodEntries.length > 0) {

        var moodEntry = moodEntries[moodEntries.length - 1];

        return HabitsService.getHabitDisplayFromValue(moodEntry);
      }
    };

    $scope.getMoodData = function getMoodData(post) {

      var moodEntries = $scope.getMoodEntries(post);

      if (moodEntries && moodEntries.length > 0) {

        var moodData = '';

        for (var i = 0; i < moodEntries.length; ++i) {

          if (i > 0)
            moodData += '|';

          // I think that this happens for a new habit value that hasn't been saved
          // to the server somehow.
          if (moodEntries[i].valueInt === undefined) {

            var habitValue = HabitsService.getHabitValueById(moodEntries[i].habitValueId);
            moodData += habitValue.valueInt;
          } else {
            moodData += moodEntries[i].valueInt;
          }

          moodData += ';' + moodEntries[i].experiencedAtStr;
        }

        return moodData;
      }

    };

    $scope.getPositiveFlags = function getPositiveFlags(post) {

      return getFlags(post, 'positive');
    };

    $scope.getNegativeFlags = function getNegativeFlags(post) {

      return getFlags(post, 'negative');
    };

    function getFlags(post, expectedTag) {

      var count = 0;

      var thought = $scope.getThought(post);
      if (thought && thought.recordings && thought.recordings.thought && thought.recordings.thought.tags) {

        var tags = thought.recordings.thought.tags;

        for (var i = 0; i < tags.length; ++i) {

          var tag = tags[i];
          if (tag.tagTypeString == expectedTag)
            ++count;
        }
      }

      return count;
    }

    $scope.getImagePostSrc = function getImagePostSrc(post) {

      var postData = $scope.postDataObjects[post.id];
      if (postData && postData.type == 'Image') {

        return postData.url;
      }
      return undefined;
    };

    $scope.getThought = function getThought(post) {

      var postData = $scope.postDataObjects[post.id];
      if (postData) {

        if (postData.thought) {
          return postData.thought;
        } else if (postData.type == 'Thought') {

          var data = postData.data;
          if (data) {

            var thought = JSON.parse(data);
            postData.thought = thought;

            return thought;
          } else {
            postData.thought = {};
          }
        }
      }

      return {};
    };

    $scope.getExperiment = function getExperiment(post) {

      var postData = $scope.postDataObjects[post.id];
      if (postData) {

        if (postData.experiment) {
          return postData.experiment;
        } else if (postData.type == 'Experiment') {

          var data = postData.data;
          if (data) {

            var experiment = JSON.parse(data);
            postData.experiment = experiment;

            return experiment;
          } else {
            postData.experiment = {};
          }
        }
      }

      return {};
    };

    $scope.getExperimentCompletionDate = function getExperimentCompletionDate(post) {

      var experiment = $scope.getExperiment(post);
      if (experiment) {

        var achievedRecordedAtString = experiment.achievedRecordedAtString;
        if (achievedRecordedAtString) {

          return moment(new Date(achievedRecordedAtString)).calendar();
        }
      }
    };

    function updatePostDataObjects(postDataObjects) {

      if (postDataObjects) {

        for (var i = 0; i < postDataObjects.length; ++i) {

          var postData = postDataObjects[i];

          var currentData = $scope.postDataObjects[postData.postId];
          if (!currentData) {

            currentData = {};
            $scope.postDataObjects[postData.postId] = currentData;
          }

          currentData[postData.name] = postData.value;
        }
      }
    }

    function reloadGroupPosts(reload) {
      
      if (!$scope.group)
        return;

      var firstLoad = ($scope.groupPosts.length === 0) || reload;

      if (firstLoad)
        $scope.loadingPosts = true;

      GroupsService.findGroupPosts($scope.group, $scope.order, $scope.limit, $scope.offset)
        .success(function(context) {

          $scope.lastPostLoad = new Date();

          var newPosts = context.groupPostsContext.groupPosts;
          if (context.groupPostsContext.careTeamGroup) {
            $scope.careTeamGroup = context.groupPostsContext.careTeamGroup;
          }

          if (firstLoad)
            $scope.groupPosts.length = 0;

          var postDataObjects = context.groupPostsContext.groupPostData;
          updatePostDataObjects(postDataObjects);

          $scope.canLoadMore = newPosts.length == $scope.limit;

          var groupType = $scope.group.groupType;
          var scrollContainer;
          var chatType;

          if (groupType == 'GROUP' || groupType == 'CLIENT' || groupType == 'COACH' ) {

            // These are returned in the reverse order.
            newPosts = newPosts.reverse();

            // Could potentially remove duplicates here.

            // This adds them all to the beginning
            Array.prototype.splice.apply($scope.groupPosts, [0, 0].concat(newPosts));

            // On web, scroll to the (old) top item when the new messages are rendered
            var modalIsOpen = $('body').hasClass('modal-open');
            if (!$scope.mobile && !modalIsOpen) {

              scrollContainer = $('.chat-scroll-container');
              chatType = scrollContainer.attr('data-chat-type');
              var isClinicianChatGroup = chatType && chatType == 'clinician';

              $scope.$$postDigest(function() {

                var $topItem = $('.group-message-wrapper:first');
                scrollContainer = $('.chat-scroll-container');
                chatType = scrollContainer.attr('data-chat-type');
                isClinicianChatGroup = chatType && chatType == 'clinician';

                if (isClinicianChatGroup) {
                  // Clinician Chat Groups (scroll the chat container)
                  $('.chat-scroll-container').scrollTop( $topItem.offset().top - (162 * 2) );

                } else {
                  // Web Groups (scroll the window)
                  $(window).scrollTop( $topItem.offset().top - 158 );
                }
              });

            }

          } else {
            // This adds them all to the end.
            $scope.groupPosts.push.apply($scope.groupPosts, newPosts);
          }
          // Make sure duplicate posts are removed.
          $scope.groupPosts = _.uniqWith($scope.groupPosts, function(arrVal, othVal) {
            return arrVal.id === othVal.id; //Note: This works with primitive values only.
          });

          $scope.addUserVotes(context.userVotes);

          $scope.loadingPosts = false;

          $ionicScrollDelegate.resize();

          if (firstLoad) {
            scrollContainer = $('.chat-scroll-container');
            chatType = scrollContainer.attr('data-chat-type');
            if (chatType && chatType == 'clinician') {
              $scope.scrollToNewPosts();
            }
            if ($scope.mobile && groupType != "COMMUNITY") {
              $ionicScrollDelegate.scrollBottom();
            }
          }

          // Redraw these next time.
          if ($scope.group.groupType == 'GROUP') {

            // Need the timeout to read the data elements
            $timeout(function() {
              $scope.updateMoodGraphs(firstLoad, !firstLoad);
            });
          }

          $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function() {
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOADING_POSTS_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
          $scope.loadingPosts = true;

          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function resetOffset() {

      $scope.offset = 0;
    }

    var completeSort = function(reload) {
      $scope.groupPosts.length = 0;
      resetOffset();
      reloadGroupPosts(reload);
      $ionicScrollDelegate.scrollTop();
    };

    $scope.showTop = function showTop(reload) {
      if (!$scope.mobile)
        $location.search('order', 'hotness');
      $scope.order = 'hotness';
      completeSort(reload);
    };

    $scope.showNew = function showNew(reload) {
      if (!$scope.mobile)
        $location.search('order', 'date');
      $scope.order = 'date';
      completeSort(reload);
    };

    $scope.showAllTime = function showAllTime(reload) {
      if (!$scope.mobile)
        $location.search('order', 'score');
      $scope.order = 'score';
      completeSort(reload);
    };

    $scope.handleCommunitySwipe = function handleCommunitySwipe(direction) {
      if (direction === 'left') {
        if ($scope.order === 'hotness') {
          $scope.showNew();
          return;
        }
        if ($scope.order === 'date') {
          $scope.showAllTime();
          return;
        }
      }
      if (direction === 'right') {
        if ($scope.order === 'score') {
          $scope.showNew();
          return;
        }
        if ($scope.order === 'date') {
          $scope.showTop();
          return;
        }
      }
    };

    $scope.removePost = function removePost(post) {

      $scope.removePostById(post.id);
    };

    $scope.removePostById = function removePostById(postId) {

      for (var i = 0; i < $scope.groupPosts.length; ++i) {

        if ($scope.groupPosts[i].id == postId) {

          $scope.groupPosts.splice(i, 1);
          return;
        }
      }
    };

    $scope.getCommunityPostRemainingCharacters = function getCommunityPostRemainingCharacters() {

      // Timing is strange for when the popup comes up.
      var text = $scope.communityPostData.postText;
      if (text) {
        text = text.trim();
      } else {
        text = '';
      }
      return 500 - text.length;
    };

    $scope.getGroupRemainingPostCharacters = function getGroupRemainingPostCharacters() {

      var text = $scope.groupPostData.postText;
      if (!text)
        text = '';

      return 500 - text.length;
    };


    $timeout(function() {
      $(".community-tabs").css('top', $('ion-header-bar').outerHeight() + 'px');
    });

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();

      // Try to handle both android and ios...
      var x;

      if (evt.changedTouches)
        x = evt.changedTouches[0].pageX;

      if (!x)
        x = (typeof evt.pageX != 'undefined') ? evt.pageX : evt.clientX;

      var y;
      if (evt.changedTouches)
        y = evt.changedTouches[0].pageY;

      if (!y)
        y = (typeof evt.pageY != 'undefined') ? evt.pageY : evt.clientY;

      return {
        x: x - rect.left,
        y: y - rect.top
      };
    }

    $scope.getMoodDetailDate = function getMoodDetailDate() {

      if ($scope.moodDetailDate) {

        return moment($scope.moodDetailDate).calendar();
      }
    };

    $scope.getMoodColor = function getMoodColor(moodRating) {

      return GeneralService.COLOR_NAMES[7 - moodRating.valueInt];
    };

    $scope.getHabitSubValue = function getHabitSubValue(subValueId) {

      var value = HabitsService.getHabitSubValueName(0, subValueId);

      if (value)
        return $translate.instant(value.toUpperCase());

      return $translate.instant('UNKNOWN');
    };

    $scope.getMoodRatingDisplay = function getMoodRatingDisplay(moodRating) {

      var value = moodRating.valueString;

      var key = 'HABITS_VALUES_' + value;
      key = key.replace(/ /g, '_').toUpperCase();

      return $translate.instant(key);
    };

    $scope.getMoodRatingDateDisplay = function getMoodRatingDateDisplay(moodRating) {

      var moodDate = new Date(moodRating.experiencedAtStr);

      return moment(moodDate).calendar();
      // return (moodDate.getMonth()+1) + '/' + (moodDate.getDate()) + ' at ' + GeneralService.getMinuteDisplay(moodDate);
    };

    $scope.hasNotes = function hasNotes(moodRating) {

      return moodRating.habitDataNotes && moodRating.habitDataNotes.notes && moodRating.habitDataNotes.notes.length > 1;
    };

    $scope.closeMoodDetailModal = function closeMoodDetailModal() {
      OverlayService.modal.close($scope.moodDetailModal).then(function(modal) {
        $scope.moodDetailModal = modal;
      });
    };

    $scope.updateMoodGraph = function updateMoodGraph(graphElement, graphData, canvas, canvasScale, canvasHeight, canvasWidth, highlightedSection, firstRender) {

      var startDateStr = graphElement.data('startdate');
      var startDate = new Date(startDateStr);
      var sections = +graphElement.data('numberofdays');

      var startMS = startDate.getTime();
      var totalMS = sections * (1000 * 60 * 60 * 24);

      var postId = +graphElement.data('postid');

      var startPos;

      // Only initialize click handlers once
      if (firstRender) {

        /*jshint -W083 */
        var handleClick = function handleClick() {

          console.log("click");

          var xLocation = startPos.x / canvasWidth;

          var section = Math.floor(xLocation * sections);

          var locationDate = new Date(startDate.getTime() + (section * 1000 * 60 * 60 * 24));
          $scope.moodDetailDate = locationDate;

          var locationEndDate = new Date(locationDate.getTime() + (1000 * 60 * 60 * 24));

          // Use the start date to loop over the mood entries
          var post = $scope.getPost(postId);
          if (post) {

            var postMoodEntries = $scope.getMoodEntries(post);
            if (postMoodEntries) {

              $scope.modalMoodEntries = [];

              var subValueIds = {};

              for (var j = 0; j < postMoodEntries.length; ++j) {

                var postMoodEntry = postMoodEntries[j];

                var postMoodEntryDate = new Date(postMoodEntry.experiencedAtStr);

                if (postMoodEntryDate > locationDate && postMoodEntryDate < locationEndDate) {

                  $scope.modalMoodEntries.push(postMoodEntry);

                  if (postMoodEntry.habitSubValueIds) {
                    for (var k = 0; k < postMoodEntry.habitSubValueIds.length; ++k) {

                      var habitSubValueId = postMoodEntry.habitSubValueIds[k];

                      subValueIds[habitSubValueId] = subValueId;
                    }
                  }
                }
              }

              // Go through and find the sub values.
              var subValueIdList = [];
              for (var subValueId in subValueIds) {

                var subValueName = HabitsService.getHabitSubValueName(0, subValueId);
                if (!subValueName) {

                  subValueIdList.push(subValueId);
                }
              }

              if (subValueIdList.length > 0) {

                HabitsService.getHabitSubValues(subValueIdList);
              }

              OverlayService.modal.open({
                modalId: 'MoodDetailModal',
                templateUrl: 'views/groups/groups.moodDetail.modal.html',
                scope: $scope,
                animation: 'slide-in-up',
                ignoreStatusBar: false
              }).then(function(modal) {
                $scope.moodDetailModal = modal;
              });
            }
          }
        };

        /*jshint -W083 */
        var handleStart = function handleStart(evt) {

          startPos = getMousePos(canvas[0], evt);

          highlightedSection = Math.floor(sections * (startPos.x / canvasWidth));

          $scope.updateMoodGraph(graphElement, graphData, canvas, canvasScale, canvasHeight, canvasWidth, highlightedSection);
        };

        /*jshint -W083 */
        var handleEnd = function handleEnd(evt) {

          endPos = getMousePos(canvas[0], evt);

          if ((endPos.x == startPos.x) &&
            (endPos.y == startPos.y))
            handleClick(evt);

          highlightedSection = -1;

          $scope.updateMoodGraph(graphElement, graphData, canvas, canvasScale, canvasHeight, canvasWidth, highlightedSection);
        };

        canvas[0].addEventListener('mousedown', handleStart);
        canvas[0].addEventListener('mouseup', handleEnd);

        canvas[0].addEventListener('touchstart', handleStart);
        canvas[0].addEventListener('touchend', handleEnd);
      }

      var ctx = canvas[0].getContext("2d");

      var graphWidth = ctx.canvas.width = canvasWidth * canvasScale;
      var graphHeight = ctx.canvas.height = canvasHeight * canvasScale;

      var sectionWidth = graphWidth / sections;

      var pointMargin = 40;

      // Draw the bars
      for (var j = 0; j < sections; ++j) {

        var rgbString;
        if (j == highlightedSection) {

          rgbString = "rgba(0, 0, 0, 0.3)";
        } else if ((j % 2) === 0) {

          rgbString = "rgba(0, 0, 0, 0.5)";
        } else {

          rgbString = "rgba(0, 0, 0, 0.55)";
        }

        var start = j * sectionWidth;

        ctx.fillStyle = rgbString;
        ctx.fillRect(start, 0, sectionWidth, graphHeight);

        var sectionDate = new Date(startDate.getTime()); //  + (j * 1000 * 60 * 60 * 24) Daylight Savings Time issues.
        sectionDate.setDate(sectionDate.getDate() + j);

        var text = moment(sectionDate).format('L');

        ctx.textAlign = 'center';
        ctx.font = '25px sans-serif';
        ctx.fillStyle = 'rgb(150,150,150)';
        ctx.fillText(text, start + (sectionWidth / 2), 30);
      }

      var moodEntries = graphData.split('|');

      for (var iterations = 0; iterations < 2; ++iterations) {


        for (var k = 0; k < moodEntries.length; ++k) {

          var endMoodEntryData = moodEntries[k].split(";");

          var endPointDate = new Date(endMoodEntryData[1]);
          var endPosition = ((endPointDate.getTime() - startMS) / totalMS) * graphWidth;
          var endHeight = graphHeight - (pointMargin + (((+endMoodEntryData[0] - 1) / 6) * ((graphHeight - 30) - (pointMargin * 2))));

          // Draw the lines
          if (iterations === 0) {

            if (k > 0) {
              var startMoodEntryData = moodEntries[k - 1].split(";");
              var startPointDate = new Date(startMoodEntryData[1]);
              var startPosition = ((startPointDate.getTime() - startMS) / totalMS) * graphWidth;
              var startHeight = graphHeight - (pointMargin + (((+startMoodEntryData[0] - 1) / 6) * ((graphHeight - 30) - (pointMargin * 2))));

              ctx.strokeStyle = 'rgba(255,255,255, 0.4)';

              ctx.beginPath();
              ctx.moveTo(startPosition, startHeight);
              ctx.lineTo(endPosition, endHeight);
              ctx.stroke();
            }
          }
          // Draw the points.
          else {

            var color = GeneralService.COLORS[7 - endMoodEntryData[0]];

            // To get alpha
            var rgb = hexToRgb(color);
            var localRGBString = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

            ctx.fillStyle = localRGBString;

            ctx.beginPath();
            ctx.arc(endPosition, endHeight, 8, 0, 2 * Math.PI);
            ctx.closePath();

            ctx.fill();
          }
        }
      }
    };

    $scope.updateMoodGraphs = function updateMoodGraphs(scroll, animate) {

      var groupPostElements = $('.group-post');
      if (groupPostElements.length === 0)
        return;

      var graphElements = $("div[data-mooddata]");

      var canvasScale = window.devicePixelRatio;
      var canvasHeight = 120;

      var canvasWidth = window.innerWidth;

      var count = graphElements.length;
      for (var i = 0; i < count; ++i) {

        // Get the individual element
        var graphElement = $(graphElements[i]);
        var graphData = '' + graphElement.data('mooddata');

        // Mostly for testing to eliminate some old posts. This should always be here.
        var startDateStr = graphElement.data('startdate');
        if (!startDateStr)
          continue;

        canvasWidth = graphElement.outerWidth();

        var highlightedSection = -1;

        var canvas = graphElement.find("canvas");

        // Such a hack. The code below will set the canvas' height.
        if (canvas[0].width < 100) {

          canvas.css("width", canvasWidth);
          canvas.css("height", canvasHeight);

          $scope.updateMoodGraph(graphElement, graphData, canvas, canvasScale, canvasHeight, canvasWidth, highlightedSection, true);

          // graphElement.append(canvas);
        }
      }

      // Since we added an element I think this needs to scroll down.
      if (scroll) {
        $timeout(function() {
          $ionicScrollDelegate.scrollBottom(animate);
        });
      }
    };

    $scope.isCareteamDashboardChat = function() {
      return (Environment.isWeb() && !_.isUndefined($scope.careTeamGroup));
    };

    $scope.getCreatorName = function(post) {
      return post.creatorNickname;
    };

    $scope.postCreatedByCurrentUser = function(post) {
      var postCreatorId = post.creatorId;
      var currentUserId = AccountService.getUserId();

      return postCreatorId === currentUserId;
    };

    $scope.getMessageDate = function(message) {
      if (!message || !message.createdAt) {
        return null;
      }

      if (!$scope.isCareteamDashboardChat()) {
        return $scope.getPostDate(message);
      }

      return moment(message.createdAt).format('MM/DD/YYYY LT');
    };

    $scope.scrollBottom = function() {
      $(window).scrollTop($(document).height());
    };

    $rootScope.$on('event:createdMessage', function(event){
      if($scope.isCareteam()) {
        GeneralService.showToast(
          $translate.instant('SECURE_CHAT_TOAST'),
          true, 'bottom',
          angular.noop,
          {
            opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
            backgroundColor: '#000000', // make sure you use #RRGGBB. Default #333333
            textColor: '#FFFFFF', // Ditto. Default #FFFFFF
            textSize: 15, // Default is approx. 13.
            cornerRadius: 15, // minimum is 0 (square). iOS default 20, Android default 100
            horizontalPadding: 10, // iOS default 16, Android default 50
            verticalPadding: 10 // iOS default 12, Android default 30
          }
        );
      }
    });

    $scope.$on("$ionicView.beforeEnter", function(event, data) {
      if ($scope.mobile && $rootScope.didDeleteCommunityPost) {
        $scope.reloadCommunityPosts();
        $rootScope.didDeleteCommunityPost = false;
      }
    });

    initController();

  }
]);

var ctrl = angular.module('groupsCtrl', []);
ctrl.controller('GroupsCtrl', ['$scope', '$state', '$timeout', '$analytics', '$translate', '$ionicSideMenuDelegate', '$ionicScrollDelegate', '$ionicHistory', '$ionicPlatform', 'AccountService', 'GroupsService', 'GeneralService', 'Environment', '$q', 'OverlayService',
  function($scope, $state, $timeout, $analytics, $translate, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicHistory, $ionicPlatform, AccountService, GroupsService, GeneralService, Environment, $q, OverlayService) {

    $scope.searchQuery = {
      query: ''
    };

    $scope.$on("$ionicView.beforeEnter", function(event, data) {

      var pref = AccountService.getUserPreference('completed_social_intro');
      if (!pref || pref != 'true') {

        $scope.showActivityIntroModal('community', function(){
          AccountService.setUserPreference('completed_social_intro', true);
        });
        var modalListener = $scope.$on('event:introVideoModalClosed', function() {

          // Note that this will fire for other tabs, so make sure we're on the right ones.
          if ($state.current.name == 'app.communities') {

            if (modalListener)
              modalListener();
          } else if ($state.current.name == 'app.groups') {

            if ($scope.userGroups && $scope.userGroups.length === 0)
              $scope.browseCuratedGroups();

            if (modalListener)
              modalListener();
          }
        });
      } else if ($state.current.name == 'app.groups') {

        var groupPref = AccountService.getUserPreference('viewed_groups_popup');
        if (!groupPref || groupPref == 'false') {

          // This waits until the group request has returned.
          $scope.showBrowseIfEmpty = true;
        }
      }
    });

    $scope.$on("$ionicView.afterEnter", function(event, data) {
      // Capture the back button to send people to home.
      $scope.backButtonCancel = $ionicPlatform.registerBackButtonAction(function() {

        openURL('/home');

      }, 101);

      // Check for new notifications
      GroupsService.updateNotificationContext();

      // Clear any history when you get back to the root of a tab.
      $ionicHistory.clearHistory();
    });
    
    $scope.$on("$ionicView.afterLeave", function(event, data) {

      if ($scope.backButtonCancel) {
        $scope.backButtonCancel();
        $scope.backButtonCancel = undefined;
      }

    });

    function loadFirstGroup() {
      GroupsService.findUserGroups()
        .success(function(data) {
          $scope.filteredGroups = data.userGroups.filter(function(group) {
            return group.groupType === 'GROUP';
          });
          if ($scope.filteredGroups.length > 0) {
            $scope.groupId = $scope.filteredGroups[0].id;
            $state.go('app.groups', {'groupId': $scope.groupId, 'order': 'hotness' });
          } else {
            $scope.group = undefined;
            $state.go('app.groups', {'groupId': ''});
          }

        });
    }

    var lastActiveTab = GroupsService.getLastActiveTab();
    $scope.activeTab = lastActiveTab ? lastActiveTab : 'communities';

    $scope.showHelp = function showHelp() {

      OverlayService.actionSheet.show({
        buttons: [{
          text: '<i class="icon ion-ios-help-outline"></i> ' + $translate.instant('ABOUT_COMMUNITY')
        }, {
          text: '<i class="icon ion-ios-list-outline"></i> ' + $translate.instant('VIEW_COMMON_QUESTIONS')
        }, {
          text: '<i class="icon ion-ios-community"></i> ' + $translate.instant('VIEW_RULES')
        }, ],
        titleText: $translate.instant('HELP_LINKS'),
        cancelText: $translate.instant('CANCEL'),
        cancel: function() {

        },
        buttonClicked: function(index) {

          if (index === 0) {
            $scope.showActivityIntroModal('community');
          } else if (index == 1) {
            $scope.openInAppBrowserURL('https://help.sanvello.com/hc/en-us/sections/203653507-Groups-Communities', '_blank', 'location=no');
          } else if (index == 2) {

            if ($state.current.name == 'app.communities') {
              $state.go('app.communities-help');
            } else {
              $state.go('app.groups-help');
            }
          }

          return true;
        }
      });
    };

    // Used when leaving the controller as well since the view is cached.
    function resetData() {

      $scope.loadingGroups = false;

      $scope.userGroups = undefined;
      $scope.communities = undefined;

      $scope.userLikes = 0;
      $scope.userShares = 0;

      $scope.pendingInvites = [];
    }

    function initController(){
      resetData();
      if (!$scope.mobile)
        $scope.loadGroups(true);
  
      GroupsService.initEditFunctionality($scope);
      GroupsService.initCreateGroupFunctionality($scope);
      GroupsService.initValidateEmailFunctionality($scope);
      GroupsService.initEditNicknameFunctionality($scope);
    }

    $scope.getActiveTabTitle = function getActiveTabTitle() {
        return $translate.instant('COMMUNITY');
    };

    $scope.showGroups = function showGroups() {

      return $scope.activeTab == 'groups';
    };

    $scope.showCommunities = function showCommunities() {

      return $scope.activeTab == 'communities';
    };

    $scope.hasNewSocialNotification = function hasNewSocialNotification() {
      var notificationContext = GroupsService.getNotificationContext();
      if (notificationContext) {
        var socialNotifications = notificationContext.notifications;
        if (socialNotifications && socialNotifications.length > 0) {
          return _.some(socialNotifications, function(notification) {
            return !notification.read;
          });
        }
      }
      return false;
    };

    $scope.shouldShowSocialNotificationBadge = function shouldShowSocialNotificationBadge() {
      var communityNotificationPref = AccountService.getUserPreference('receive_community_notifications');
      if (!communityNotificationPref && $scope.hasNewSocialNotification())
        return true;

      var communityNotificationsDisabled = communityNotificationPref && communityNotificationPref.toLowerCase() === 'false';
      return !communityNotificationsDisabled && $scope.hasNewSocialNotification();
    };

    $scope.hasGroupNotification = function hasGroupNotification(groupId) {

      return GroupsService.hasGroupNotification(groupId);
    };

    $scope.getGroupNotificationCount = function getGroupNotificationCount(groupId) {

      return GroupsService.getGroupNotificationCount(groupId);
    };

    $scope.hasAnyPostNotification = function hasAnyPostNotification() {

      return GroupsService.hasPostNotification();
    };

    $scope.getPostNotificationCount = function getPostNotificationCount() {

      return GroupsService.getPostNotificationCount();
    };

    $scope.getGroupAvatar = function getGroupAvatar(group) {

      // This needs to be a single letter, a-z
      var avatar = AccountService.getAvatarCharacter(group.creatorAvatar, group.creatorId);

      return 'avatar_' + avatar;
    };

    $scope.openSideMenu = function openSideMenu() {

      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.$on('$destroy', function() {

      // Remove this once the view has been destroyed.
      document.removeEventListener("resume", loadActiveTab, false);
    });

    // Try to reload the active tab on resume
    document.addEventListener("resume", loadActiveTab, false);

    function updateActiveTab() {

      GroupsService.setLastActiveTab($scope.activeTab);

      $ionicScrollDelegate.resize();
    }

    $scope.goToProfile = function goToProfile() {

      var isNicknameGenerated = AccountService.getAccountUser().user.generatedName;
      if ($scope.hasUserNickname() && !isNicknameGenerated) {

        $state.go('app.community-profile');
      }
      else {
        $scope.showUpdateNickname();
      }
    };

    $scope.checkOfflineMode = function checkOfflineMode() {

      if (!Environment.isOnline()) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('GROUPS_OFFLINE_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return true;
      }

      return false;
    };

    $scope.hasUserNickname = function hasUserNickname() {

      var accountUser = AccountService.getAccountUser();
      return accountUser && accountUser.user && accountUser.user.publicName && accountUser.user.publicName.length > 0;
    };

    $scope.getUserNickname = function getUserNickname() {

      var accountUser = AccountService.getAccountUser();
      return (accountUser && accountUser.user && accountUser.user.publicName && accountUser.user.publicName.length > 0) ? accountUser.user.publicName : ('' + $translate.instant('SET_UP_PROFILE') + '');
    };

    $scope.getUserAvatar = function getUserAvatar() {

      var accountUser = AccountService.getAccountUser();
      if (!accountUser.user)
        return '';

      // This needs to be a single letter, a-z
      var avatar = AccountService.getAvatarCharacter(AccountService.getAccountUser().user.avatar, AccountService.getAccountUser().user.id);

      return 'avatar_' + avatar;
    };

    $scope.getUserLikes = function getUserLikes() {

      return $scope.userLikes + '';
    };

    $scope.getUserShares = function getUserShares() {

      return $scope.userShares + '';
    };

    $scope.loadGroups = function loadGroups(force) {

      // We don't want to continuously flash the loading thing when going back to your list of groups.
      if (!$scope.userGroups)
        $scope.loadingGroups = true;

      return GroupsService.findUserGroups(force)
        .success(function(userGroupContext) {

          $scope.userGroups = angular.copy(userGroupContext.userGroups);
          // remove hope feed group

          // Remove duplicates here too (This is the same approach that we use in groupPostsCtrl).
          // The solution there is working for the coach chat, but not here because of the timing 
          // We are hitting the else statement but with empty array because of the resetData() we are doing here.
          $scope.userGroups = _.uniqWith($scope.userGroups, function(arrVal, othVal) {
            return arrVal.id === othVal.id; //Note: This works with primitive values only.
          });

          var hopeIndex = _.findIndex($scope.userGroups, function(g){ return g.groupType == 'PERSONAL'; });
          if(hopeIndex > -1)
            $scope.userGroups.splice(hopeIndex, 1);
          // remove client chat group

          var chatIndex = _.findIndex($scope.userGroups, function(g){ return g.groupType == 'CLIENT';});
          if(chatIndex > -1)
            $scope.userGroups.splice(chatIndex, 1);
          
          var coachIndex = _.findIndex($scope.userGroups, function(g){ return g.groupType == 'COACH';});
          if(coachIndex > -1)
            $scope.userGroups.splice(coachIndex, 1);
          //REMOVE COACH 

          $scope.pendingInvites = userGroupContext.pendingInvites;

          if ($scope.showBrowseIfEmpty && (!$scope.userGroups || ($scope.userGroups.length === 0))) {

            $scope.browseCuratedGroups();

            $scope.showBrowseIfEmpty = false;
          }

          $scope.loadingGroups = false;
        })
        .error(function() {

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOADING_GROUPS_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
          $scope.loadingGroups = false;
        });
    };

    $scope.loadCommunities = function loadCommunities() {

      var deferred = $q.defer();

      // We don't want to continuously flash the loading thing when going back to your the communities.
      if (!$scope.communities)
        $scope.loadingCommunities = true;

      GroupsService.findPublicGroups()
        .success(function(publicGroupContext) {

          $scope.communities = publicGroupContext.publicGroups;
          $scope.userLikes = publicGroupContext.userLikes;
          $scope.userShares = publicGroupContext.userShares;

          $scope.loadingCommunities = false;
          deferred.resolve(publicGroupContext);
        })
        .error(function() {
          if(Environment.isWeb()){
            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('LOADING_COMMUNITIES_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }
          else{
            GeneralService.showToast($translate.instant('LOADING_COMMUNITIES_ERROR'));
          }
          $scope.loadingCommunities = false;
          deferred.reject('error loading communities');
        });

        return deferred.promise;
    };

    $scope.activateGroups = function activateGroups(loading) {

      if ($scope.checkOfflineMode()) return;

      $analytics.eventTrack('activateGroups', {
        category: 'group'
      });

      $scope.activeTab = 'groups';

      // Viewing the group page will clear the badge at the bottom, but not the counts for each group.
      // GroupsService.clearAllGroupNotifications();

      if (!loading)
        updateActiveTab();

      $scope.loadGroups();

      // Not there on first load
      $timeout(function() {
        $("#groupTitle").addClass("active");
        $("#communitiesTitle").removeClass("active");
      });
    };

    $scope.activateCommunities = function activateCommunities(loading) {

      if ($scope.checkOfflineMode()) return;

      $analytics.eventTrack('activateCommunities', {
        category: 'group'
      });

      $scope.activeTab = 'communities';

      if (!loading)
        updateActiveTab();

      $scope.loadCommunities()
        .then(function() {
          $ionicScrollDelegate.resize();
        });

      // Not there on first load
      $timeout(function() {
        $("#communitiesTitle").addClass("active");
        $("#groupTitle").removeClass("active");
        $ionicScrollDelegate.resize();
      });
    };

    $scope.isOwner = function isOwner(group) {
      return group && (group.creatorId == AccountService.getAccountUser().user.id);
    };

    $scope.isOwnerById = function isOwnerById(groupId) {

      var group = GroupsService.getGroupImmediate(groupId);

      return group.creatorId == AccountService.getAccountUser().user.id;
    };

    $scope.getCommunityName = function getCommunityName(community) {

      var name = community.name;

      var key = ('COMMUNITY_' + name).replace(/ /g, '_').toUpperCase();

      var translatedName = $translate.instant(key);
      if (translatedName == key)
        return name; // couldn't find it
      else
        return translatedName;
    };

    $scope.getCommunityDescription = function getCommunityDescription(community) {

      var name = community.name;

      var key = ('COMMUNITY_' + name + '_DESCRIPTION').replace(/ /g, '_').toUpperCase();
      var translatedDescription = $translate.instant(key);
      if (translatedDescription == key)
        return community.description;
      else
        return translatedDescription;
    };

    function removeGroup(groupId) {

      for (var i = 0; i < $scope.userGroups.length; ++i) {

        var existingGroup = $scope.userGroups[i];
        if (groupId == existingGroup.id) {

          $scope.userGroups.splice(i, 1);
          break;
        }
      }
    }

    $scope.archiveGroup = function archiveGroup(event, group) {

      event.stopPropagation();
      event.preventDefault();

      if ($scope.checkOfflineMode()) return;

      $analytics.eventTrack('archiveGroupPopup', {
        category: 'group'
      });

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('ARCHIVE_GROUP_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('REMOVE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {

          // Not that you can only leave curated groups now.
          if (!group.curated && (group.creatorId == AccountService.getAccountUser().user.id)) {
            GroupsService.archiveGroup(group.id)
              .success(function() {

                removeGroup(group.id);
                if (!$scope.mobile)
                  loadFirstGroup();
              })
              .error(function() {

                var alertPopup = OverlayService.popup.alert({
                  template: $translate.instant('ARCHIVE_GROUP_ERROR'),
                  okText: $translate.instant('OK_GOT_IT'),
                  okType: 'button-default'
                });
              });

            $analytics.eventTrack('archiveGroupConfirm', {
              category: 'groups'
            });
          } else {

            GroupsService.leaveGroup(group.id)
              .success(function() {

                removeGroup(group.id);
                if (!$scope.mobile)
                  loadFirstGroup();
              })
              .error(function() {

                var alertPopup = OverlayService.popup.alert({
                  template: $translate.instant('ARCHIVE_GROUP_ERROR'),
                  okText: $translate.instant('OK_GOT_IT'),
                  okType: 'button-default'
                });
              });
          }

        } else {

          $analytics.eventTrack('archiveGroupCancel', {
            category: 'groups'
          });
        }
      });
    };

    $scope.closeJoinGroupModal = function closeJoinGroupModal() {
      return OverlayService.modal.close($scope.joinModal).then(function(modal) {
        $scope.joinModal = modal;
        $scope.groupCodeError = undefined;
      });
    };

    $scope.clearGroupSearch = function clearGroupSearch() {

      $scope.searchQuery.query = '';
      $scope.hasSearchEntry = false;
    };

    $scope.joinGroup = function joinGroup() {

      var groupCode;

      if ($scope.showGroupCode) {

        groupCode = $("#groupCode").val();
        if (!groupCode || groupCode.length === 0) {

          $scope.groupCodeError = $translate.instant("GROUP_CODE_PLACEHOLDER");
          return;
        }
      }

      $scope.groupCodeError = undefined;

      $scope.joiningGroup = true;

      if ($scope.showGroupCode || $scope.joinGroupCode) {

        if (!groupCode)
          groupCode = $scope.joinGroupCode;

        GroupsService.joinGroup(groupCode)
          .success(function(group) {

            $scope.loadGroups(true).success(function() {
              $scope.clearGroupSearch();

              $scope.closeJoinGroupModal()
                .then(function() {
                  $scope.joiningGroup = false;
                  $scope.attemptingJoinGroup = false;

                  var groupId = $scope.joinGroupId || group.id;

                  if ($scope.mobile) {

                    if (AccountService.shouldShowCommunityRules()) {

                      $state.go('app.groups-help', {
                        intro: true,
                        groupId: groupId,
                        order: 'date'
                      });
                    } else {
                      $state.go('app.group-posts', {'groupId': groupId, 'order': 'date' });
                    }


                  } else {
                    $state.go('app.groups', {'groupId': $scope.joinGroupId });
                  }
                });

              if ($scope.mobile)
                $ionicScrollDelegate.resize();
            });

          })
          .error(function(data, status, headers, config) {

            if (status == 404) {

              $scope.groupCodeError = $translate.instant('GROUP_CODE_NOT_FOUND');
            } else {
              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('JOIN_GROUP_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            }

            $scope.joiningGroup = false;
          });
      } else {
        GroupsService.acceptInvite($scope.joinGroupId, nickname)
          .success(function(group) {

            $scope.loadGroups(true);

            $scope.closeJoinGroupModal();

            $scope.joiningGroup = false;
          })
          .error(function() {

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('JOIN_GROUP_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });

            $scope.joiningGroup = false;
          });
      }
    };

    $scope.showJoinGroup = function showJoinGroup(groupId, groupCode) {
      
      $scope.groupError = undefined;
      $scope.showGroupCode = false;
      $scope.joinGroupId = groupId;
      $scope.joinGroupCode = groupCode;

      $scope.joinForm = {
        joinGroupNickname: AccountService.getAccountUser().user.publicName
      };
      var isNicknameGenerated = AccountService.getAccountUser().user.generatedName;

      var joinGroupModalTemplate;

      if (!$scope.joinForm.joinGroupNickname || isNicknameGenerated) {
        $scope.attemptingJoinGroup = true;
        $scope.showUpdateNickname();
      } else {
        $scope.joinGroup();          
      }

    };

    $scope.showJoinGroupByCode = function showJoinGroupByCode() {

      var nickname = AccountService.getAccountUser().user.publicName;
      var isNicknameGenerated = AccountService.getAccountUser().user.generatedName;
      if (!nickname || isNicknameGenerated) {
        return $scope.showUpdateNickname();
      }

      $scope.groupError = undefined;
      $scope.showGroupCode = true;
      $scope.joinGroupId = undefined;
      $scope.joinGroupCode = undefined;
      
      var joinGroupModalTemplate;
      if ($scope.mobile) {
        joinGroupModalTemplate = 'views/groups/groups.joinGroup.modal.html';
      } else {
        joinGroupModalTemplate = 'templates/groups/groups.joinGroup.modal.html';
      }

      OverlayService.modal.open({
        modalId: 'JoinGroupModal',
        templateUrl: joinGroupModalTemplate,
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.joinModal = modal;
      });

    };

    $scope.getGroupDescription = function getGroupDescription(group) {

      var description = group.description;
      if (description && description.length > 140)
        description = description.substring(0, 140) + '...';

      return description;
    };

    $scope.joinCuratedGroup = function joinCuratedGroup(groupId, groupCode) {

      $scope.showJoinGroup(groupId, groupCode);

      $scope.closeBrowseGroupsModal();

      // $scope.joiningCuratedGroup = true;

      // GroupsService.joinGroup(groupCode, AccountService.getAccountUser().user.name)
      //   .success(function() {

      //     $scope.joiningCuratedGroup = false;

      //     $scope.loadGroups(true);

      //     $scope.closeBrowseGroupsModal();
      //   })
      //   .error(function(data) {

      //     OverlayService.popup.alert({
      //       template: $translate.instant('ERROR_JOINING_RANDOM_GROUP'),
      //       okText: $translate.instant('OK_GOT_IT'),
      //       okType: 'button-default'
      //     });

      //     $scope.joiningCuratedGroup = false;
      //   });
    };

    $scope.closeBrowseGroupsModal = function closeBrowseGroupsModal() {
      OverlayService.modal.close($scope.browseGroupsModal).then(function(modal) {
        $scope.browseGroupsModal = modal;
      });
    };

    $scope.browseCuratedGroups = function browseCuratedGroups() {

      AccountService.setUserPreference('viewed_groups_popup', true);

      $scope.displayingCategories = {};

      $scope.loadingCuratedGroups = true;

      var browseGroupsModalTemplate;
      if ($scope.mobile) {
        browseGroupsModalTemplate = 'views/groups/groups.browseGroups.modal.html';
      } else {
        browseGroupsModalTemplate = 'templates/groups/groups.browseGroups.modal.html';
      }

      OverlayService.modal.open({
        modalId: 'BrowseGroupsModal',
        templateUrl: browseGroupsModalTemplate,
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.browseGroupsModal = modal;
        GroupsService.findCuratedGroups()
          .success(function(curatedGroups) {

            GroupsService.initializeCuratedGroups($scope, curatedGroups);

            $scope.loadingCuratedGroups = false;
          })
          .error(function(data) {

            console.log("Error loading curated groups:");
            console.log(data);

            $scope.loadingCuratedGroups = false;
          });
      });

    };

    $scope.displayingCategories = {};

    $scope.isDisplayingCategory = function isDisplayingCategory(category) {

      return !!$scope.displayingCategories[category];
    };

    $scope.toggleCategoryDisplay = function toggleCategoryDisplay(category) {

      if ($scope.isDisplayingCategory(category)) {

        delete $scope.displayingCategories[category];
      } else {

        $scope.displayingCategories[category] = true;
      }

      $ionicScrollDelegate.resize();
    };

    $scope.hasSearchEntry = false;
    $scope.isSearching = false;
    $scope.searchableGroups = undefined;

    var searchGroupsTimeout;

    $scope.searchGroups = function searchGroups() {

      if (searchGroupsTimeout)
        $timeout.cancel(searchGroupsTimeout);

      searchGroupsTimeout = $timeout(searchGroupsInternal, 1000);
    };

    // Allow a timer to control how often this is called
    function searchGroupsInternal() {

      searchGroupsTimeout = undefined;

      var query = $scope.searchQuery.query;
      if (query)
        query.trim();

      if (query !== '') {
        $scope.hasSearchEntry = true;
        $scope.isSearching = true;

        GroupsService.searchForGroup(query)
          .success(function(groups) {

            $scope.searchableGroups = groups;

            $scope.isSearching = false;
          })
          .error(function() {

            $scope.clearGroupSearch();

            $scope.hasSearchEntry = false;
            $scope.isSearching = false;

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('GROUP_SEARCH_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });

      } else {
        $scope.isSearching = false;
        $scope.hasSearchEntry = false;
      }

    }

    $scope.deleteInvite = function deleteInvite(groupId) {

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('DELETE_INVITE_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('DELETE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {
          GroupsService.deleteInvite(groupId)
            .success(function() {

              for (var i = 0; i < $scope.pendingInvites.length; ++i) {

                var invite = $scope.pendingInvites[i];
                if (invite.userGroup.id == groupId) {

                  $scope.pendingInvites.splice(i, 1);
                }
              }
            })
            .error(function() {

              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('DELETE_INVITE_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };

    $scope.goToGroup = function goToGroup(group) {

      if ($scope.checkOfflineMode()) return;

      var order = group.groupType == 'GROUP' ? 'date' : 'hotness';

      if (group.groupType == 'GROUP') {

        if (AccountService.shouldShowCommunityRules()) {

          $state.go('app.groups-help', {
            intro: true,
            groupId: group.id,
            order: order
          });
        } else {

          $state.go('app.group-posts', {
            groupId: group.id,
            order: order
          });
        }
      } else {
        if (AccountService.shouldShowCommunityRules()) {

          $state.go('app.communities-help', {
            intro: true,
            groupId: group.id,
            order: order
          });
        } else {

          $state.go('app.communities-posts', {
            groupId: group.id,
            order: order
          });
        }
      }
    };

    function loadActiveTab() {

      // The view was cached, but the user logged out.
      if (!AccountService.isLoggedIn() || !Environment.isOnline())
        return;

      // On load, request the right thing
      if ($scope.showGroups()) {

        $scope.activateGroups(true);
      } else {

        $scope.activateCommunities(true);
      }
    }

    $scope.toggleMobileSideBar = function() {
      $('body').toggleClass('showing-mobile-side-bar');
    };

    $scope.$on('$ionicView.enter', function() {
      loadActiveTab();
    });

    $scope.$on("$ionicView.afterLeave", function() {
      resetData();
    });

    var checkCommunityEligibility = function(){
      pref = AccountService.getUserPreference('communities_ineligible');
      if(pref == 'true'){
        $state.go('app.home');
      }      
    };

    if (!$scope.mobile && $scope.isAppReady()) {
      checkCommunityEligibility();
    }

    // mobile
    $scope.$on('event:initializedFromStorage', function(){
      checkCommunityEligibility();
    });

    //web
    $scope.$on('event:pacificaReady', function(){
      checkCommunityEligibility();
    });

    initController();
  }
]);
angular.module('groupsHelpCtrl', [])

.controller('GroupsHelpCtrl', ['$scope', '$sce', '$state', '$stateParams', '$controller', '$translate', '$ionicHistory', 'AccountService',
  function($scope, $sce, $state, $stateParams, $controller, $translate, $ionicHistory, AccountService) {

    // Extend the help controller.
    $controller('HelpCtrl', {
      $scope: $scope
    });

    $scope.getHelpSlide = function getHelpSlide(slide) {

      var key = 'GROUPS_HELP_SLIDE_' + slide;

      return $sce.trustAsHtml($translate.instant(key));
    };

    $scope.confirm = function confirm() {

      AccountService.setUserPreference('viewed_groups_disclaimer', 'true');

      // Hack.
      $ionicHistory.currentView($ionicHistory.backView());

      $state.go('app.group-posts', {
        groupId: $stateParams.groupId,
        order: $stateParams.order
      }, {
        location: 'replace'
      });
    };
  }
]);
angular.module('groupsProfileCtrl', [])

.controller('GroupsProfileCtrl', ['$scope', '$timeout', '$stateParams', '$ionicScrollDelegate', '$controller', '$translate', 'AccountService', 'GroupsService', 'OverlayService',
  function($scope, $timeout, $stateParams, $ionicScrollDelegate, $controller, $translate, AccountService, GroupsService, OverlayService) {

    // Extend the abstract controller.
    $controller('AbstractGroupPostsCtrl', {
      $scope: $scope
    });

    // This forces a load of the public groups if they haven't been so that we can resolve
    // the group names for the posts.
    GroupsService.findPublicGroups();

    if ($stateParams.userId) {

      $scope.loadingUser = true;

      $scope.viewingOtherUser = true;
      $scope.otherUserId = +$stateParams.userId;

      AccountService.getPublicUser($scope.otherUserId)
        .success(function(publicUser) {

          $scope.user = publicUser;

          if ($stateParams.nickname)
            $scope.user.publicName = $stateParams.nickname;

          $scope.loadingUser = false;
        })
        .error(function() {
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOAD_PROFILE_CONTENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.loadingUser = false;
        });
    } else {
      $scope.user = AccountService.getAccountUser().user;
    }

    $scope.getUserName = function getUserName() {

      if ($scope.viewingOtherUser && $scope.loadingUser) {

        return $translate.instant('LOADING') + '...';
      } else if ($stateParams.nickname) {
        return $stateParams.nickname;
      } else {
        return $scope.user.publicName;
      }
    };

    $scope.deletePostFromProfile = function deletePostFromProfile(ev, post){
      if($scope.activeTab == 'comments'){
        $scope.deleteComment(ev, post);
      } else {
        $scope.deletePost(ev, post);
      }
    };

    $scope.removeComment = function removeComment(comment) {
      var index = _.findIndex($scope.comments, {id: comment.id});
      if(index > -1){
        $scope.comments.splice(index, 1);
      }
    };

    $scope.getUserAvatar = function getUserAvatar() {

      if ($scope.viewingOtherUser && $scope.loadingUser) {
        return '';
      } else {

        // This needs to be a single letter, a-z
        var avatar = AccountService.getAvatarCharacter($scope.user.avatar, $scope.user.id);

        return 'avatar_' + avatar;
      }

    };

    $scope.isAvatarSelected = function isAvatarSelected(avatar) {

      var user = AccountService.getAccountUser().user;
      return avatar == AccountService.getAvatarCharacter(user.avatar, user.id);
    };

    function updateAvatars(list, newAvatar) {

      if (list) {

        var userId = AccountService.getAccountUser().user.id;

        for (var i = 0; i < list.length; ++i) {

          var post = list[i];

          if (post.creatorId == userId)
            post.creatorAvatar = newAvatar;
        }
      }
    }

    $scope.setUserAvatar = function setUserAvatar(avatar) {

      AccountService.setAvatar(avatar)
        .success(function(postLikes) {

          $scope.user.avatar = avatar;

          // Need to loop over all of the posts and see if any of the avatars are
          // for the current user.
          updateAvatars($scope.shares, avatar);
          updateAvatars($scope.likes, avatar);
          updateAvatars($scope.comments, avatar);

          $scope.closeAvatarModal();
        })
        .error(function() {
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('ERROR_UPDATING_AVATAR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    };

    $scope.closeAvatarModal = function closeAvatarModal() {
      OverlayService.modal.close($scope.chooseAvatarModal).then(function(modal) {
        $scope.chooseAvatarModal = modal;
      });
    };

    $scope.showChooseAvatar = function showChooseAvatar() {
      OverlayService.modal.open({
        modalId: 'ToolsModal',
        templateUrl: 'views/groups/communities.chooseAvatar.modal.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.chooseAvatarModal = modal;
      });
    };

    $scope.getJoinedDate = function getJoinedDate() {

      if ($scope.user) {
        var joinedDate = new Date($scope.user.createdAt);

        return moment(joinedDate).format('LL');
      } else {
        return '';
      }
    };

    $scope.activeTab = 'shares'; //vs likes or comments

    $scope.limit = 25;

    $scope.shares = undefined;
    $scope.shareOffset = 0;
    $scope.canLoadMoreShares = true;

    $scope.likes = undefined;
    $scope.likeOffset = 0;
    $scope.canLoadMoreLikes = true;

    $scope.comments = undefined;
    $scope.commentOffset = 0;
    $scope.canLoadMoreComments = true;

    GroupsService.initEditNicknameFunctionality($scope);

    $scope.findPublicGroupName = function findPublicGroupName(groupId) {

      return GroupsService.findPublicGroupName(groupId);
    };

    $scope.setActiveTab = function setActiveTab(tab) {

      $scope.activeTab = tab;

      if (tab == 'shares') {

        loadShares();
      } else if (tab == 'likes') {
        loadLikes();
      } else {
        $scope.loadPostComments(true);
      }

      $ionicScrollDelegate.scrollTop();

      $timeout($ionicScrollDelegate.resize);
    };

    $scope.removePost = function removePost(post) {

      $scope.removePostById(post.id);
    };

    $scope.removePostById = function removePostById(postId) {

      if ($scope.shares) {
        for (var i = 0; i < $scope.shares.length; ++i) {

          if ($scope.shares[i].id == postId) {

            $scope.shares.splice(i, 1);
            break;
          }
        }
      }

      if ($scope.likes) {
        for (var j = 0; j < $scope.likes.length; ++j) {

          if ($scope.likes[j].id == postId) {

            break;
          }
        }
      }
    };

    $scope.getActivePosts = function getActivePosts() {

      if ($scope.activeTab == 'shares')
        return $scope.shares;
      else if ($scope.activeTab == 'likes')
        return $scope.likes;
      else
        return $scope.comments;
    };

    $scope.isLoading = function isLoading() {

      return $scope.loadingShares || $scope.loadingLikes;
    };

    function loadUserLikes(posts) {

      GroupsService.getUserLikes(posts)
        .success(function(postLikes) {

          $scope.addUserVotes(postLikes);
        })
        .error(function() {
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOAD_PROFILE_CONTENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    }

    function loadUserCommentLikes(comments) {

      GroupsService.getUserCommentLikes(comments)
        .success(function(commentLikes) {

          $scope.addUserCommentVotes(commentLikes);
        })
        .error(function() {
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOAD_PROFILE_CONTENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    }

    function loadShares(force) {

      if (!force && $scope.shares)
        return;

      if (!$scope.shares || $scope.otherUserId || ($scope.shareOffset === 0))
        $scope.shares = [];

      $scope.loadingShares = true;

      GroupsService.getShares($scope.limit, $scope.shareOffset, $scope.otherUserId ? $scope.otherUserId : undefined)
        .success(function(shares) {

          $scope.canLoadMoreShares = shares.length == $scope.limit;

          // Append to end
          $scope.shares.push.apply($scope.shares, shares);

          console.log("got shares:");
          console.log(shares);

          if (!$scope.viewingOtherUser) {
            for (var i in shares) {

              $scope.createVoteObject(shares[i]);
            }
          } else {
            loadUserLikes(shares);
          }

          $scope.loadingShares = false;

          $ionicScrollDelegate.resize();
        })
        .error(function() {

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOAD_PROFILE_CONTENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.loadingShares = false;
        });
    }

    $scope.finishedPost = function finishedPost(post){
      var index = _.findIndex($scope.getActivePosts(), {id: post.id});
      if(index > -1){
        $scope.getActivePosts()[index] = post;
      }
    };

    function loadLikes(force) {

      if (!force && $scope.likes) {

        // In the case where they have downvoted the post, we need to remove it the next
        // time they load the list.
        for (var j = $scope.likes.length - 1; j >= 0; --j) {

          if (!$scope.hasVote($scope.likes[j]))
            $scope.likes.splice(j, 1);
        }

        return;
      }

      if (!$scope.likes || $scope.otherUserId || ($scope.likeOffset === 0))
        $scope.likes = [];

      $scope.loadingLikes = true;

      GroupsService.getLikes($scope.limit, $scope.likeOffset, $scope.otherUserId ? $scope.otherUserId : undefined)
        .success(function(likes) {

          $scope.canLoadMoreLikes = likes.length == $scope.limit;

          // Append to end
          $scope.likes.push.apply($scope.likes, likes);

          console.log("got likes:");
          console.log(likes);

          for (var i in likes) {

            $scope.createVoteObject(likes[i]);
          }

          $scope.loadingLikes = false;

          $ionicScrollDelegate.resize();
        })
        .error(function() {
          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOAD_PROFILE_CONTENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.loadingLikes = false;
        });
    }

    $scope.loadPostComments = function loadPostComments(force) {

      if (!force && $scope.comments)
        return;

      if (!$scope.comments || $scope.otherUserId || ($scope.commentOffset === 0))
        $scope.comments = [];

      $scope.loadingComments = true;

      GroupsService.getComments($scope.limit, $scope.commentOffset, $scope.otherUserId ? $scope.otherUserId : undefined, force)
        .success(function(comments) {

          $scope.canLoadMoreComments = comments.length == $scope.limit;

          // Append to end
          $scope.comments.push.apply($scope.comments, comments);

          console.log("got comments:");
          console.log(comments);

          // When we are viewing another user, we don't have the list of which comments you
          // have voted on.
          if (!$scope.otherUserId) {
            for (var i in comments) {

              $scope.createVoteObject(comments[i]);
            }
          } else {
            loadUserCommentLikes(comments);
          }

          $scope.loadingComments = false;

          $ionicScrollDelegate.resize();
        })
        .error(function() {

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('LOAD_PROFILE_CONTENT_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.loadingComments = false;
        });
    };

    $scope.loadMoreLikes = function loadMoreLikes() {

      $scope.likeOffset += $scope.limit;

      loadLikes(true);
    };

    $scope.loadMoreShares = function loadMoreShares() {

      $scope.shareOffset += $scope.limit;

      loadShares(true);
    };

    $scope.loadMoreComments = function loadMoreComents() {

      $scope.commentOffset += $scope.limit;

      $scope.loadPostComments(true);
    };

    $scope.loadMorePosts = function loadMorePosts() {

      if ($scope.activeTab == 'shares') {
        $scope.loadMoreShares();
      } else if ($scope.activeTab == 'likes') {
        $scope.loadMoreLikes();
      } else {
        $scope.loadMoreComments();
      }
    };

    $scope.canLoadMore = function canLoadMore() {

      if ($scope.activeTab == 'shares') {
        return $scope.canLoadMoreShares;
      } else if ($scope.activeTab == 'likes') {
        return $scope.canLoadMoreLikes;
      } else {
        return $scope.canLoadMoreComments;
      }
    };

    $timeout(function() {
      $(".community-tabs").css('top', $('ion-header-bar').outerHeight() + 'px');
    });

    $scope.$on("$ionicView.afterEnter", function(event, data) {
      // When returning to the profile (list) view, we want to update the current data in case it was changed
      // while in the post or comment detail view.
      if (data.direction === 'back') {
        if ($scope.activeTab === 'likes')
          loadLikes(true);
        if ($scope.activeTab === 'shares')
          loadShares(true);
        if ($scope.activeTab === 'comments')
          $scope.loadPostComments(true);
      }
    });

    // This is the default for public profiles as well.
    $scope.setActiveTab('shares');
  }
]);
angular.module('groupUsersCtrl', [])

.controller('GroupsUsersCtrl', ['$scope', '$state', '$timeout', '$stateParams', '$analytics', '$translate', 'AccountService', 'GroupsService', 'Environment', 'OverlayService', '$controller', '$filter',
  function($scope, $state, $timeout, $stateParams, $analytics, $translate, AccountService, GroupsService, Environment, OverlayService, $controller, $filter) {

    $scope.data = {};

    $controller('CommunityNotificationsSettingsCtrl', {
      $scope: $scope
    });

    $scope.group = GroupsService.getGroupImmediate(+$stateParams.groupId);

    $scope.loadingUsers = true;

    function initController(){
      var communityNotificationPref = AccountService.getUserPreference('receive_community_notifications');
      if (!communityNotificationPref) {
        $scope.data.communityNotification = 'true';
      } else {
        $scope.data.communityNotification = '' + (communityNotificationPref.toLowerCase() == 'true');
      }

      GroupsService.initInviteFunctionality($scope);

      GroupsService.getGroupUsers(+$stateParams.groupId)
        .success(function(context) {

          var users = context.groupUsers;

          $scope.groupUsers = $filter('orderBy')(users, 'nickname');

          // Move user to the first one.
          for (var i = 0; i < $scope.groupUsers.length; ++i) {

            var groupUser = $scope.groupUsers[i];

            if ($scope.isYou(groupUser)) {

              $scope.groupUsers.splice(i, 1);
              $scope.groupUsers.unshift(groupUser);

              break;
            }
          }

          $scope.pendingInvites = context.pendingInvites;

          $scope.loadingUsers = false;
        })
        .error(function(data) {

          var alertPopup = OverlayService.popup.alert({
            template: $translate.instant('RETRIEVE_USERS_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

          $scope.loadingUsers = false;
        });          
    }

    $scope.updateCommunityNotifications = function updateCommunityNotifications() {

      AccountService.setUserPreference('receive_community_notifications', $scope.notificationData.communityNotification, 
        function success() {

          $scope.communityNotificationUpdated = true;

          $timeout(function() {

            $scope.communityNotificationUpdated = false;
          }, 3000);
        });
    };

    $scope.checkOfflineMode = function checkOfflineMode() {

      if (!Environment.isOnline()) {

        var alertPopup = OverlayService.popup.alert({
          template: $translate.instant('GROUPS_OFFLINE_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });

        return true;
      }

      return false;
    };

    $scope.getGroupCode = function getGroupCode() {

      return $scope.group.code;
    };

    $scope.viewUserProfile = function viewUserProfile(event, user, nickname) {

      event.stopPropagation();
      event.preventDefault();

      $state.go('app.groups-profile', {
        userId: user.userId,
        nickname: nickname
      });
    };

    // $scope.selectGroupCode = function selectGroupCode() {

    //   var jEl = $("#groupCodeInput");
    //   var el = jEl[0];

    //   if (el.setSelectionRange)
    //     el.setSelectionRange(0, jEl.val().length);
    //   else
    //     el.select();
    // };

    $scope.leaveGroup = function leaveGroup(event) {

      event.stopPropagation();
      event.preventDefault();

      if ($scope.checkOfflineMode()) return;

      $analytics.eventTrack('archiveGroupPopupFromMembers', {
        category: 'group'
      });

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('LEAVE_GROUP_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('LEAVE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {

          GroupsService.leaveGroup($scope.group.id)
            .success(function() {

              // Go back 2

              $scope.goBack(-2);
            })
            .error(function() {

              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('LEAVE_GROUP_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };

    $scope.copyCodeToClipboard = function copyCodeToClipboard() {

      cordova.plugins.clipboard
        .copy($scope.group.code,
          function success() {

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('GROUP_CODE_COPIED'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });

          },
          function fail() {
            // error
          }
        );
    };

    $scope.isOwner = function isOwner() {

      return $scope.group.creatorId == AccountService.getAccountUser().user.id;
    };

    $scope.isYou = function isYou(groupUser) {

      return groupUser.userId == AccountService.getAccountUser().user.id;
    };

    $scope.deletePendingInvite = function deletePendingInvite(email) {

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('DELETE_INVITE_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('DELETE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {
          GroupsService.deleteInvite($scope.group.id, email)
            .success(function() {

              for (var i = 0; i < $scope.pendingInvites.length; ++i) {

                if ($scope.pendingInvites[i].email == email) {

                  $scope.pendingInvites.splice(i, 1);
                  break;
                }
              }
            })
            .error(function() {
              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('DELETE_INVITE_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }

      });
    };

    $scope.removeUser = function removeUser(userId) {

      var confirmPopup = OverlayService.popup.confirm({
        // title: 'Alert',
        template: '<div>' + $translate.instant('REMOVE_USER_PROMPT') + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('REMOVE'),
        okType: 'button-default'
      });
      confirmPopup.then(function(res) {

        if (res) {

          GroupsService.removeUser($scope.group.id, userId)
            .success(function() {

              for (var i = 0; i < $scope.groupUsers.length; ++i) {

                if ($scope.groupUsers[i].userId == userId) {

                  $scope.groupUsers.splice(i, 1);
                  break;
                }
              }

              --$scope.group.members;

            })
            .error(function() {
              var alertPopup = OverlayService.popup.alert({
                template: $translate.instant('REMOVE_USER_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };

    initController();
  }
]);