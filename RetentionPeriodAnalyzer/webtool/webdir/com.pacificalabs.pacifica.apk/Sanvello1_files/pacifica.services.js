var servicesModule = angular.module('accessibilityService', []);

servicesModule.factory('AccessibilityService', ['$q', '$rootScope', '$timeout',
 function($q, $rootScope, $timeout) {

 	var accessibilityService = {
 		initialized: false,
 		usingScreenReader: false,
 		plugin: null,
 	};

 	var plugin;

 	function initializeService() {
 		if(plugin){
 	 		plugin.isScreenReaderRunning(function(result) {
	 			accessibilityService.usingScreenReader = result;
	 		});		
 		}
	 }

 	accessibilityService.speak = function(string, queue) {
 		var queueMode = queue? queue : null;
 		if(plugin)
 			plugin.speak(string, queueMode);
 	};

 	accessibilityService.setTextZoomClass = function setTextZoomClass() {

 		accessibilityService.plugin.getTextZoom(function(zoom) {

 			var zoomMap = {
 				'text-zoom-default': function(z) { return z <= 100; },
 				'text-zoom-large': function(z) { return (z > 100) && (z < 119); },
 				'text-zoom-xlarge': function(z) { return (z >= 119) && (z < 131); },
 				'text-zoom-xxlarge': function(z) { return z >= 131; }
 			};

 			function zoomToClass(zoom) {
 				var zoomClass;
 				_.each(zoomMap, function(truthTest, className) {
 					if (truthTest(zoom))
 						zoomClass = className;
 				});
 				return zoomClass;
 			}

 			var body = angular.element(document.querySelector("body"));

 			// Make sure old zoom classes are removed
 			_.map(_.keys(zoomMap), function(className) { body.removeClass(className); });

 			// Add the new class
 			var bodyClass = zoomToClass(zoom);
 			body.addClass(bodyClass);
 		});
 	};

 	accessibilityService.initialize = function initialize() {
 		var deferred = $q.defer();
 		plugin = window.plugins ? window.MobileAccessibility : undefined;
 		if (plugin) {
 			plugin.isScreenReaderRunning(function(result) {
 				accessibilityService.plugin = plugin;
 				accessibilityService.usingScreenReader = result;
 				accessibilityService.initialized = true;
 				plugin.usePreferredTextZoom(false);
 				$rootScope.$broadcast('event:accessibilityServiceInitialized', result);
 				deferred.resolve(accessibilityService);
 			});
 		} else {
 			$timeout(function() {
 				$rootScope.$broadcast('event:accessibilityServiceInitialized', accessibilityService);
 				deferred.resolve(accessibilityService);
 			});
 		}

 		return deferred.promise;
 	};

 	accessibilityService.onceInitialized = function onceInitialized(fn) {
 	  if (!accessibilityService.initialized) {
 	    once($rootScope, 'event:accessibilityServiceInitialized', fn);  // from helpers.js
 	  } else {
 	    fn();
 	  }
 	};

 	return accessibilityService;

 }]);
var servicesModule = angular.module('accountService', []);

servicesModule.constant('ACCOUNT_ROLES', {
  ADMIN: 'ADMIN',
  PRACTITIONER: 'PRACTITIONER',
  COACH: 'COACH',
  BACKEND_COACH: 'BACKEND_COACH',
  COACH_MANAGER: 'COACH_MANAGER'
});

servicesModule.factory('AccountService', ['$q', '$http', '$rootScope', '$translate', '$timeout', '$analytics', '$interval', 'authHttp', 'Environment', 'StorageService', 'GeneralService', 'Token', 'FeedService', 'OverlayService', '$ionicPlatform', 'ACCOUNT_ROLES', '$anchorScroll', '$location',

  function($q, $http, $rootScope, $translate, $timeout, $analytics, $interval, authHttp, Environment, StorageService, GeneralService, Token, FeedService, OverlayService, $ionicPlatform, ACCOUNT_ROLES, $anchorScroll, $location) {

  var accountService = {
    accountUser: {},
    userPreferences: {},
    experienceTips: {}, // These are
    appointmentContext: {},
    splitTestContext: {},
    connectionContext: {},
    consentContext: {},
    userNotification: {},
    refreshedStore: false, // Used for a single refresh when the user is using the app and premium expires.
    locale: undefined,
    isCreatingAccount: false,
    googleSignin: false,
    offlinePreferences: [],

    loginTimeout: 60 * 60 * 1000, // The default login timeout for the web = 1 hour
    deletionReason: null,
    finishVidCallback: null
  };


  accountService.creatingAccount = function creatingAccount(newVal) {
    // Combined getter / setter for whether the user is currently viewing the theme selection part of loginCtrl
    if (!_.isUndefined(newVal))
      accountService.isCreatingAccount = newVal;
    return accountService.isCreatingAccount;
  };

  var savedLoginTimeout = localStorage.getItem('loginTimeout');
  if (savedLoginTimeout) {

    accountService.loginTimeout = +savedLoginTimeout;
  }

  accountService.setLoginTimeout = function setLoginTimeout(loginTimeout) {

    accountService.loginTimeout = loginTimeout;

    localStorage.setItem('loginTimeout', loginTimeout);
  };

  accountService.getLoginTimeout = function getLoginTimeout() {

    return accountService.loginTimeout;
  };

  accountService.initFromLocalStorage = function(){
    return $q.all([
      StorageService.getItemAsync('accountUser')
        .then(function(localUser) {
          if (localUser) {
            var userObj = JSON.parse(localUser);
            accountService.accountUser = userObj;
          }
        }),
      StorageService.getItemAsync('userPreferences')
        .then(function(localPreferences) {
          if (localPreferences) {
            var prefObj = JSON.parse(localPreferences);
            accountService.userPreferences = prefObj;
            $rootScope.$broadcast('request:updateLocalCompletedActivities');
          }
        }),
      StorageService.getItemAsync('offlinePreferences')
        .then(function(offlinePreferences){
          if(offlinePreferences){
            var prefs = JSON.parse(offlinePreferences);
            accountService.offlinePreferences = prefs;
          }
        }),
      StorageService.getItemAsync("splitTestContext")
        .then(function(splitTestContext) {
          if (splitTestContext) {
            try {
              var storedSplitTestContext = JSON.parse(splitTestContext);
              accountService.splitTestContext = storedSplitTestContext;
            }
            catch (err) {
              console.log("There was an error parsing the split test context: " + err);
            }
          }
        }),
      StorageService.getItemAsync("connectionContext")
        .then(function(connectionContext) {
          if (connectionContext) {
            try {
              var storedConnectionContext = JSON.parse(connectionContext);
              accountService.connectionContext = storedConnectionContext;
            }
            catch (err) {
              console.log("There was an error parsing the connection context: " + err);
            }
          }
        })
    ]);
  };

  function getDeviceInfo(data) {
    var deviceInfo = data ? data : {};
    if (window.device) {

      deviceInfo.appVersion = Environment.getAppVersion();
      deviceInfo.cordovaVersion = device.cordova;
      deviceInfo.model = device.model;
      deviceInfo.platform = device.platform;
      deviceInfo.uuid = device.uuid;
      deviceInfo.version = device.version;
    }

    return deviceInfo;
  }

  // We could just be accumulating these? it's weird, they are only pushed on the online event.
  // But that doesn't happen all that often I think.
  function postOfflinePreferences() {

    function postOfflinePreferencesInternal() {
      _.each(accountService.offlinePreferences, function(pref){
        accountService.setUserPreference(pref.preference, pref.value, function(){
          console.log('set ' + pref.preference + ' to ' + pref.value);
        });
      });
      accountService.offlinePreferences = [];
      updateOfflinePreferences();
    }


    StorageService.onceInitialized(function() {
      accountService.onceUserContextInitialized(function() {
        postOfflinePreferencesInternal();
      });
    });

  }

  $rootScope.$on('event:online', postOfflinePreferences);

  accountService.enablePremiumAccount = function enablePremiumAccount(expiresAt, type) {

    accountService.accountUser.account.premium = true;
    accountService.accountUser.account.paymentType = !type ? 'PURCHASE' : type;
    accountService.accountUser.account.premiumExpiresAt = expiresAt;

    updateLocalAccountUser();
  };

  accountService.enablePremiumFeatures = function enablePremiumFeatures(transaction, subscriptionId, price, callback) {

    if (accountService.canUpgrade()) {

      // We don't have the transaction anymore. Likely the user needs to log out
      // of iTunes and back in again if they are having issues with the premium
      // stuff persisting...
      if (transaction) {
        if (transaction.type == "ios-appstore") {

          authHttp.post(Environment.serverURL + '/account/verifyIOSPurchase', {

              transactionId: transaction.id,
              subscriptionId: subscriptionId,
              receipt: transaction.appStoreReceipt,
              price: price
            }, {
              // This is so that angular doesn't try to parse it as JSON (which it didn't in the old version and does in the new one).
              transformResponse: undefined
            })
            .success(function(data) {

              console.log("Received verify response: ");
              console.log(data);

              if (data && data != 'false') {
                accountService.enablePremiumAccount(data);
              }

              if (callback)
                callback(data);

            })
            .error(function habitError(data, status, header, config) {

              if (callback)
                callback(false);
            });
        }
        else if (transaction.type == "android-playstore") {

          console.log("Received android transaction:");
          console.log(transaction);

          // No idea if this is right yet. I can't debug it...
          authHttp.post(Environment.serverURL + '/account/verifyAndroidPurchase', {

              transactionId: transaction.id,
              subscriptionId: subscriptionId,
              purchaseToken: transaction.purchaseToken,
              price: price
            })
            .success(function(data) {

              console.log("Received verify response: ");
              console.log(data);

              if (data && data != 'false') {
                accountService.enablePremiumAccount(data);
              }

              if (callback)
                callback(data);
            })
            .error(function habitError(data, status, header, config) {

              if (callback)
                callback(false);
            });
        }
      }
    }
    else {
      callback(true);
    }
  };

  accountService.isLoggedIn = function isLoggedIn() {

    if (Environment.isWeb())
      return Token.hasToken(); // This is specific to the web application. It functions differently in that we might not have the accountUser yet.
    else
      return !!accountService.accountUser.user && Token.hasToken();
  };

  accountService.isPremiumEnabled = function isPremiumEnabled() {

    var ret = accountService.accountUser.account && accountService.accountUser.account.premium === true;

    // Check the date as well. The client may not have checked back in
    // in a while.
    if (ret ) {
      var expiresAt = new Date(accountService.accountUser.account.premiumExpiresAt);
      if (!isNaN(expiresAt)) {
        ret = expiresAt > new Date();

        // If the premium type has purchased, ann we're now expired, we might want to
        // reload the store to see if there is a new receipt for the user.
        // DO NOT DO THIS MORE THAN ONCE. Way too many requests will cause the app to crash.
        if (!ret && accountService.accountUser.account.paymentType == 'PURCHASE' && !accountService.refreshedStore) {
          accountService.refreshedStore = true;

         $rootScope.$broadcast('event:refreshStore');
        }
      }
    }

    return ret;
  };

  // Determine whether or not the user has unlocked the tracking features. This is
  // done either through a one-time payment, or is also made available with a
  // premium subscription.
  accountService.hasUnlockedTracking = function hasUnlockedTracking() {

    var pref = accountService.getUserPreference('unlimited_tracking');
    if (pref && pref == 'true') {
      return true;
    }

    return accountService.isPremiumEnabled();
  };

  accountService.getPremiumExpiration = function getPremiumExpiration() {
    if (accountService.isPremiumEnabled()) {
      var expires = new Date(accountService.accountUser.account.premiumExpiresAt)  ;
      if (!isNaN(expires)) {
        return moment(expires).format('LLLL');
      }
        if (accountService.accountUser.account.paymentType == 'SPONSOR') {
            return accountService.accountUser.account.premiumExpiresAt;
        }
    }

    return '';
  };

  accountService.canUpgrade = function canUpgrade() {

    return !accountService.isPremiumEnabled() ||
           accountService.accountUser.account.paymentType == 'TRIAL' ||
           accountService.accountUser.account.paymentType == 'COMPLIMENTARY';
  };

  // This retrieves the main user context, which contains user preferencs
  // and the habit context.
  accountService.findUserContext = function findUserContext() {

    var deviceInfo = getDeviceInfo();

    return authHttp.post(Environment.serverURL + '/account/context', deviceInfo);
  };

  accountService.onceUserContextInitialized = function onceUserContextInitialized(fn) {
    if (!$rootScope.retrievedUserContext ) {
      once($rootScope, 'event:userContextInitialized', fn);  // from helpers.js
    } else {
      fn();
    }
  };

  accountService.createAccount = function createAccount(email, password, name, referralCode, groupCode) {

    var config = {};
    authHttp.addTimezone(config);

    // Add the platform since it isn't the easiest to determine without Crosswalk.
    authHttp.addPlatform(config);

    var data = {
      email: email,
      password: password,
      name: name,
      lang: accountService.getLocale(), // This should have been set when the app started.
      joinGroupCode: groupCode,
      preventDefaultHabits: false // For transitioning client versions.
    };

    if (referralCode)
      data.referralCode = referralCode;

    getDeviceInfo(data);

    // This is required to set the cookie.
    config.withCredentials = true;

    // change to /account/createUMNPilot if testing pilot stuff.
    return $http.post(Environment.serverURL + '/account/createV2', data, config);
  };

  accountService.resetPassword = function resetPassword(email) {

    return $http.post(Environment.serverURL + '/account/requestPasswordReset', email);
  };

  accountService.updateToken = function updateToken(headers) {

    authHttp.update(headers);
  };

  function markAsPHIAccount() {
    var accountUser = accountService.accountUser;

    // Make sure to set the local user to having PHI. This way we can test for the
    // passcode and disallow usage if they turn off the phone's passcode.
    accountUser.user.phi = true;
    updateLocalAccountUser();

    // Make sure that we do not send any analytics information when the account
    // has phi.
    $analytics.disable();
  }

  function updateLocalAccountUser() {

    StorageService.setItem("accountUser", JSON.stringify(accountService.accountUser));
  }

  function updateLocalPreferences() {

    StorageService.setItem("userPreferences", JSON.stringify(accountService.userPreferences));
  }

  function updateOfflinePreferences(){
    StorageService.setItem("offlinePreferences", JSON.stringify(accountService.offlinePreferences));
  }

  accountService.setNickname = function setNickname(nickname) {

    var ret = createPromise();

    authHttp.post(Environment.serverURL + '/account/name', nickname)
      .success(function() {

        accountService.accountUser.user.name = nickname;

        updateLocalAccountUser();

        if (ret.successCallback)
          ret.successCallback();
      })
      .error(function() {
        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  accountService.setPublicNickname = function setPublicNickname(publicNickname) {

    return authHttp.post(Environment.serverURL + '/account/publicName', publicNickname);
  };

  accountService.updateLocalPublicNickname = function updateLocalPublicNickname(publicNickname) {

    accountService.accountUser.user.publicName = publicNickname;

    updateLocalAccountUser();
  };

  accountService.setAvatar = function setAvatar(avatar) {

    accountService.getAccountUser().user.avatar = avatar;

    updateLocalAccountUser();

    return authHttp.post(Environment.serverURL + '/account/avatar', avatar);
  };

  accountService.getAvatarCharacter = function getAvatarCharacter(avatar, userid) {

    // TODO In the future this should use the user roles somehow.
    switch (userid) {
      case 1:
      case 2932357: // kristina
      case 2962553: // edds
      case 2953188: // jamie ellis
        return 'pacifica';
      case 1003:  // dale
        return 'dale';
      case 1001:  // chris
        return 'chris';
      case 1171516:  // ashley
        return 'ashley';
      case 1057724:  // enda
        return 'enda';
      case 1064918:  // christine
        return 'christine';
    }
    // This needs to be a single letter, a-z
    if (!avatar) {

      var id = userid % 26;

      avatar = String.fromCharCode(97 + id);
    }

    return avatar;
  };

  accountService.getPostAvatar = function getPostAvatar(post) {
    if (post)
      return 'avatar_' + accountService.getAvatarCharacter(post.creatorAvatar, post.creatorId);

    return '';
  };

  accountService.setPhoneNumber = function setPhoneNumber(phone, sendCode) {

    var ret = createPromise();

    phone = phone.replace(/[^0-9.]/g, "");
    var changed = accountService.accountUser.user.phone != phone;

    authHttp.post(Environment.serverURL + '/account/phone', {
      phone: phone,
      sendCode: sendCode
    })
      .success(function() {
        accountService.accountUser.user.phone = phone;
        if(changed)
          accountService.accountUser.user.phoneVerifiedAt = undefined;

        updateLocalAccountUser();

        if (ret.successCallback)
            ret.successCallback();
      })
      .error(function() {
        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  accountService.setEmailAddress = function setEmailAddress(email) {

    var ret = createPromise();

    authHttp.post(Environment.serverURL + '/account/email', email)
      .success(function() {
        accountService.accountUser.user.email = email;
        accountService.accountUser.user.emailVerifiedAt = undefined;

        updateLocalAccountUser();

        if (ret.successCallback)
            ret.successCallback();
      })
      .error(function() {
        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  accountService.isEmailValidated = function isEmailValidated() {

    var user = accountService.getAccountUser();

    return user && user.user && !!user.user.emailVerifiedAt;
  };

  accountService.isPhoneValidated = function isPhoneValidated() {

    var user = accountService.getAccountUser();

    return user && user.user && !!user.user.phoneVerifiedAt;
  };

  accountService.checkRemoteEmailValidation = function checkRemoteEmailValidation() {

    return authHttp.get(Environment.serverURL + "/account/isEmailValidated");
  };

  accountService.validatePhone = function validatePhone(code) {

    var ret = createPromise();

    authHttp.post(Environment.serverURL + "/account/validatePhone", {
      phone: accountService.getAccountUser().user.phone,
      phoneVerificationCode: code
    })
      .success(function (resp) {

        if (resp.validated) {
          accountService.accountUser.user.phoneVerifiedAt = new Date();

          updateLocalAccountUser();
        }

        if (ret.successCallback)
          ret.successCallback(resp);
      })
      .error(function() {

        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  accountService.cancelConsultation = function cancelConsultation(consultation) {

    var ret = createPromise();

    authHttp.post(Environment.serverURL + '/account/cancelConsultation/' + consultation.id)
      .success(function (data) {

        if (accountService.appointmentContext.appointments) {

          var index = accountService.appointmentContext.appointments.indexOf(consultation);
          accountService.appointmentContext.appointments.splice(index, 1);

          if (ret.successCallback)
            ret.successCallback(consultation);
        }
      })

      .error(function() {

        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  accountService.claimConsultation = function claimConsultation(firstName, lastName, consultation) {

    var ret = createPromise();

    authHttp.post(Environment.serverURL + '/account/claimConsultation', {
      appointmentId: consultation.id,
      firstName: firstName,
      lastName: lastName,
      startTime: consultation.startTime
    })
      .success(function (consultation) {

        var accountUser = accountService.getAccountUser();
        accountUser.account.firstName = firstName;
        accountUser.account.lastName = lastName;

        updateLocalAccountUser();

        if (!accountService.appointmentContext.appointments)
          accountService.appointmentContext.appointments = [];

        accountService.appointmentContext.appointments.push(consultation);

        if (ret.successCallback)
          ret.successCallback();
      })
      .error(function(err) {

        if (ret.errorCallback)
          ret.errorCallback(err);
      });

    return ret;
  };

  accountService.handleInsecureStorage = function handleInsecureStorage() {

    StorageService.clear();

    $rootScope.$broadcast('event:loginRequired');

    OverlayService.modal.open({
      modalId: 'InsecureDeviceModal',
      templateUrl: 'views/account/account.insecureDevice.modal.html',
      scope: $rootScope,
      animation: 'slide-in-up',
      ignoreStatusBar: false
    }).then(function(modal) {
      $rootScope.insecureDeviceModal = modal;
    });
  };

  accountService.checkSecureStorage = function checkSecureStorage() {

    var accountUser = accountService.accountUser;

    if (accountUser && accountUser.user && (accountUser.user.phi || accountService.isPractitioner()) ) {

      $analytics.disable();

      $rootScope.closeInsecureDeviceModal = function closeInsecureDeviceModal() {

        OverlayService.modal.close($rootScope.insecureDeviceModal).then(function(modal) {
          $rootScope.insecureDeviceModal = modal;
        });
      };

      // If the account in question contains Protected Health Information,
      // and the device is not secure (maybe it doesn't have a passcode),
      // we must immediately clear any storage on the device and log the
      // user out. Only devices that securely store encrypted data
      // can be used with PHI.
      StorageService.isKeyguardSecure(function(secure) {

        if (!secure) {
          accountService.handleInsecureStorage();
        }
      }, function() {

        accountService.handleInsecureStorage();
      });
    }
  };

  accountService.setAccountUser = function setAccountUser(accountUser) {
    accountService.accountUser = accountUser;
    updateLocalAccountUser();

    accountService.checkSecureStorage();
  };

  accountService.getAccountUser = function getAccountUser() {
    return accountService.accountUser;
  };

  accountService.getUserId = function() {
    var accountUser = accountService.getAccountUser();

    return accountUser ? accountUser.userId : null;
  };

  accountService.getUserNames = function() {
    var accountUser = accountService.getAccountUser();

    return {
      first: _.get(accountUser, 'account.firstName'),
      last: _.get(accountUser, 'account.lastName')
    };
  };

  accountService.setupAccountTimezone = function(tz){
    authHttp.setActiveTimezone(tz);
    moment.tz.setDefault(tz);
  };

  accountService.setUserPreferences = function setUserPreferences(list) {

    // Clear out user preferences when getting the new list.
    accountService.userPreferences = {};

    if (list) {
      for (var i=0; i<list.length; ++i) {
        var pref = list[i];
        accountService.userPreferences[pref.preference] = pref.value;
      }
    }

    updateLocalPreferences();

    accountService.getUserTimeZone(accountService.setupAccountTimezone);
  };

  accountService.getUserPreference = function getUserPreference(pref) {
    return accountService.userPreferences[pref];
  };

  accountService.setUserNotification = function setUserNotification(notification) {

    accountService.userNotification = notification;
  };

  accountService.getUserNotification = function getUserNotification() {

    return accountService.userNotification;
  };

  accountService.getSystemNotification = function getSystemNotification() {

    return accountService.userNotification.systemNotification;
  };

  accountService.setSplitTestContext = function setSplitTestContext(splitTestContext) {

    accountService.splitTestContext = splitTestContext;

    if (splitTestContext)
      StorageService.setItem("splitTestContext", JSON.stringify(splitTestContext));
  };

  accountService.getSplitTestContext = function getSplitTestContext() {

    return accountService.splitTestContext;
  };

  accountService.isStudyUser = function isStudyUser() {
    return false;

    //var splitTestContext = accountService.getSplitTestContext();
  };

  accountService.usesSocialLogin = function usesSocialLogin() {
    return accountService.getUserPreference('oauth_signup');
  };

  accountService.setAppointmentContext = function setAppointmentContext(appointmentContext) {

    accountService.appointmentContext= appointmentContext;
  };

  accountService.getAppointmentContext = function getAppointmentContext () {

    return accountService.appointmentContext;
  };

  accountService.setPremiumContext = function setPremiumContext(premiumContext){

    accountService.premiumContext = premiumContext;

    if (premiumContext)
      StorageService.setItem("premiumContext", JSON.stringify(premiumContext));
  };

  accountService.getPremiumContext = function getPremiumContext(){
    return accountService.premiumContext;
  };

  accountService.isActivityTypeFree = function isActivityTypeFree(activityType){
    if(accountService.getPremiumContext() && accountService.getPremiumContext().freeActivityTypes)
      return accountService.getPremiumContext().freeActivityTypes.indexOf(activityType) > -1;
    return false;
  };

  accountService.setConnectionContext = function setConnectionContext(connectionContext) {

    accountService.connectionContext = connectionContext;

    if (connectionContext)
      StorageService.setItem('connectionContext', JSON.stringify(connectionContext));

    accountService.checkHipaaAuthorizations();
  };

  accountService.getConnectionContext = function getConnectionContext() {

    return accountService.connectionContext;
  };

  var handleSignUpOrIn = function (url, token, loginTimeout) {
    var config = {
      // This is required to set the cookie.
      withCredentials: true
    };
    authHttp.addTimezone(config);
    authHttp.addPlatform(config);

    var data = {
      token: token
    };

    if (loginTimeout) {
      data.loginTimeout = loginTimeout;

      accountService.setLoginTimeout(loginTimeout);
    }

    getDeviceInfo(data);

    return $http.post(Environment.serverURL + '/account/' + url, data, config);
  };

  accountService.loginWithFacebook = function loginWithFacebook(token, loginTimeout) {
        return handleSignUpOrIn('loginWithFacebook', token, loginTimeout);
  };

  accountService.loginWithGoogle = function loginWithGoogle(token, loginTimeout) {
  return handleSignUpOrIn('loginWithGoogle' ,token, loginTimeout);
  };

  accountService.signUpWithFacebook = function loginWithFacebook(token) {
      return handleSignUpOrIn('signUpWithFacebook', token);
  };

  accountService.signUpWithGoogle = function loginWithGoogle(token) {
      return handleSignUpOrIn('signUpWithGoogle', token);
  };

  accountService.getRequestConfig = function(){
    var config = {
      // This is required to set the cookie.
      withCredentials :true,
      headers: {}
    };
    var tz = accountService.getUserTimeZone();
    if(tz)
      config.headers.TimezoneLocale = tz;
    return config;
  };

  accountService.login = function login(email, password, loginTimeout, verificationCode) {
    var config = accountService.getRequestConfig();
    authHttp.addPlatform(config);

    var data = {
      email: email,
      password: password
    };

    if(verificationCode)
      data.verificationCode = verificationCode;

    if (loginTimeout) {
      data.loginTimeout = loginTimeout;

      accountService.setLoginTimeout(loginTimeout);
    }

    getDeviceInfo(data);

    return $http.post(Environment.serverURL + '/account/login', data, config);
  };

  accountService.hasCompletedOnboarding = function() {
    var lastNuxState = accountService.getUserPreference('last_nux_state') || $rootScope.lastNuxState;
    return lastNuxState === 'completed';
  };

  accountService.clearData = function clearData() {

    FeedService.clearData();

    accountService.accountUser = {};
    accountService.userPreferences = {};
    accountService.splitTestContext = {};
    accountService.userNotification = {};
    accountService.offlinePreferences = [];
    accountService.googleSignin = false;
    // Be sure to update these in local storage. Otherwise, if the remote
    // call fails somehow, we won't actually get logged out.
    updateLocalAccountUser();
    updateLocalPreferences();

    localStorage.removeItem('cachedHomeImageUrl');
    localStorage.removeItem('suggestedActivities');
    localStorage.removeItem('viewed_daily_checkin_popup_date');
    localStorage.removeItem('viewed_streak_popup_date');
    localStorage.removeItem('lastHomeView');
    localStorage.removeItem('lastHomeVisit');
    localStorage.removeItem('notification_timing');
    localStorage.removeItem('display_progress_activity_data');
    localStorage.removeItem('lastAppRatingDay');
    localStorage.removeItem('skipped_home');
    StorageService.removeItem('offlineActivities');
    StorageService.removeItem('offlinePreferences');
    StorageService.removeItem('splitTestContext');
  };

  accountService.setOffline = function setOffline() {

    return authHttp.post(Environment.serverURL + '/account/setOffline');
  };

  accountService.logout = function logout() {
    if (accountService.googleSignin) {
      //window.plugins.googleplus.logout();
      window.plugins.googleplus.disconnect();
    }
    accountService.clearData();

    return authHttp.post(Environment.serverURL + '/account/logout');
  };

  accountService.ping = function ping() {

    return authHttp.get(Environment.serverURL + '/ping');
  };

  accountService.clearUserPreference = function clearUserPreference(pref) {

    delete accountService.userPreferences[pref];

    return authHttp.post(Environment.serverURL + '/account/clearPreference', { preference: pref } );
  };

  accountService.saveUserPreferences = function saveUserPreferences(values, successCallback) {
    // takes an array of objects [{key: val}, {key: val}]
    var isOffline = !Environment.isOnline();
    var data = [];

    var evalPref = function evalPref(val, key){
      if(typeof val === 'boolean')
        val = val + '';
      data.push({preference: key, value: val});
      accountService.userPreferences[key] = val;
      if(isOffline)
        accountService.offlinePreferences.push({preference: key, value: val});
    };


    for(i=0; i<values.length; i++){
      _.each(values[i], evalPref);
    }

    updateLocalPreferences();

    if(isOffline){
      updateOfflinePreferences();
      if(successCallback)
        successCallback();
    } else {
      authHttp.post(Environment.serverURL + '/account/preferences', data)
        .success(function(){
          if(successCallback)
            successCallback();
        });
    }

  };

  accountService.setUserPreference = function setUserPreference(pref, value, successCallback) {

    if (typeof value === 'undefined') {
      console.log("MISSING VALUE while setting preference: " + pref);
      return;
    }

    // All types need to be strings.
    if (typeof value === 'boolean')
      value = value + '';

    if (accountService.isLoggedIn()) {

      var isUpdatingPreference = typeof accountService.userPreferences[pref] === 'undefined' || accountService.userPreferences[pref] != value;
      var isPostingOfflinePreference = _.filter(accountService.offlinePreferences, function(item) {
        return item.preference === pref;
      }).length > 0;

      if (isUpdatingPreference || isPostingOfflinePreference) {

        accountService.userPreferences[pref] = value;
        updateLocalPreferences();

        if(pref === 'preferred_timezone'){
          accountService.setupAccountTimezone(value);
        }

        console.log("set user preference [" + pref + "]: " + value);
        if(Environment.isOnline()){
          return authHttp.post(Environment.serverURL + '/account/preference', {
            preference: pref,
            value: value
          });
        } else {
          accountService.offlinePreferences.push({preference: pref, value: value});
          updateOfflinePreferences();
        }
      }

      return;
    }

    if (successCallback) {
      $timeout(successCallback);
    }

  };

  accountService.registerGCMToken = function registerGCMToken(token, errorCallback) {

    return authHttp.post(
            Environment.serverURL + '/account/gcmToken',
            token
        ).then(function onSuccess(reponse) {},errorCallback);
  };

  accountService.registerAPNSToken = function registerAPNSToken(token) {

    return authHttp.post(Environment.serverURL + '/account/apnsToken', token);
  };

   accountService.getDaysSinceSignup = function getDaysSinceSignup() {

    var daysSinceSignup = 0;

    if (accountService.accountUser.user) {
      var user = accountService.accountUser.user;

      var createdAt = GeneralService.getDayString(new Date(user.createdAtStr));

      var createdDay = new Date(createdAt);
      var today = new Date(GeneralService.getTodayString());

      daysSinceSignup = GeneralService.getDifferenceInDays(createdDay, today);
    }

    return daysSinceSignup;
  };

  // Our languages are not separated by locales
  accountService.getLang = function getLang(locale) {

    var lang = locale;

    // Change the locale if it is something like 'en-gb'
    var dashIndex = lang.indexOf('-');
    if (dashIndex > 0) {

      lang = lang.substring(0, dashIndex);
    }

    return lang;
  };

  accountService.getLocale = function getLocale() {

    return accountService.locale;
  };

  function getCorrectedLocale(locale) {

    locale = locale.toLowerCase();

    // Most languages we do not support.
    if (locale.startsWith('es'))
      locale = 'es';
    else if (locale.startsWith('fr'))
      locale = 'fr';
    else if (locale != 'en-us' && locale != 'en-gb') {
      locale = 'en-us';
    }

    return locale;
  }

  accountService.updateLocale = function updateLocale(locale) {

    accountService.locale = getCorrectedLocale(locale);

    var lang = accountService.getLang(accountService.locale);

    // Update the body with the lang class. We have different styles for layouts in different languages.
    $('body').removeClass('en');
    $('body').removeClass('es');
    $('body').removeClass('fr');

    $('body').addClass(lang);

    var doc = angular.element(document.querySelector("html"));
    doc.attr('lang', lang);

    // Our languages are not separated by locales
    console.log("Setting translation: " + lang);
    $translate.use(lang);

    // But our time and calendar displays are (en-US vs en-Gb, e.g.)
    moment.locale(accountService.locale);
  };

  accountService.setLocale = function setLocale(locale) {

    accountService.locale = locale;

    accountService.updateLocale(accountService.locale);

    locale = getCorrectedLocale(locale);

    return accountService.setUserPreference('preferred_locale', locale);
  };

  accountService.getPublicUser = function getPublicUser(userId) {

    return authHttp.get(Environment.serverURL + '/account/publicUser?userId=' + userId);
  };

  accountService.getUserTimeZone = function getUserTimeZone(callback) {
    var timeZonePref = accountService.getUserPreference('preferred_timezone');
    if(timeZonePref){
      if(callback)
        callback(timeZonePref);
      return timeZonePref;
    }
    if(Environment.isWeb()){
      var jsTimeZone = jstz.determine();
      if (callback) {
        callback(jsTimeZone.name());
      }
      return jsTimeZone.name();
    }
    if (navigator && navigator.globalization) {
      navigator.globalization.getDatePattern(function success(data) {
        if(callback)
          callback(data.iana_timezone);
        return data.iana_timezone;
      });
    }
  };

  accountService.resendValidationEmail = function resendValidationEmail() {

    return authHttp.post(Environment.serverURL + '/account/sendValidateEmail');
  };

  accountService.forceAppRatingPrompt = function forceAppRatingPrompt() {

    // This seems like it would be used IF clicking on the selection to rate the
    // app didn't launch the dialog itself. I'm guessing it's used for custom views.
    var onRateDialogShow = function(callback) {
        //  call this callback when user click on button into your custom rate-dialog
        //  for example: simulate click on "Rate now" button and display store
        // callback(3);
        callbackForRating = callback;
    };
    var onButtonClicked = function(buttonIndex) {

        // The buttons start with an index of 1
        if (buttonIndex == 1 || buttonIndex == 3) {
          // This is the No Thanks button.
          accountService.setUserPreference('viewed_rate_app_popup', true);
        }
        else {

          localStorage.setItem("lastAppRatingDay", GeneralService.getTodayString());
        }
    };

    AppRate.preferences.storeAppURL.ios = '922968861';
    AppRate.preferences.storeAppURL.android = 'market://details?id=com.pacificalabs.pacifica';
    // AppRate.preferences.useCustomRateDialog = true;

    AppRate.preferences.callbacks.onRateDialogShow = onRateDialogShow;
    AppRate.preferences.callbacks.onButtonClicked = onButtonClicked;

    AppRate.preferences.useLanguage = 'en';  // need to force this to english. spanish/french system setting causes crashing

    AppRate.preferences.customLocale = {
      title: $translate.instant('APPRATE_TITLE') + " %@?",
      message: $translate.instant('APPRATE_MESSAGE'),
      cancelButtonLabel: $translate.instant('APPRATE_CANCEL_BUTTON_LABEL'),
      laterButtonLabel: $translate.instant('APPRATE_LATER_BUTTON_LABEL'),
      rateButtonLabel: $translate.instant('APPRATE_RATE_BUTTON_LABEL'),
      yesButtonLabel: $translate.instant('APPRATE_YES_BUTTON_LABEL'),
      noButtonLabel: $translate.instant('APPRATE_NO_BUTTON_LABEL'),
      appRatePromptTitle: $translate.instant('APPRATE_APP_RATE_PROMPT_TITLE') + " %@?",
      feedbackPromptTitle: $translate.instant('APPRATE_FEEDBACK_PROMPT_TITLE')
    };

    AppRate.promptForRating(true);
  };

  accountService.checkForRatingPrompt = function checkForRatingPrompt() {

    var pref = accountService.getUserPreference('viewed_rate_app_popup');
    if (!pref || pref == 'false') {

      if (window.AppRate) {

        // Don't remind them again today.
        var lastRatingDay = localStorage.getItem("lastAppRatingDay");

        if (lastRatingDay == GeneralService.getTodayString())
          return;

        if (accountService.getDaysSinceSignup() >= 3) {

          var callbackForRating;

          accountService.forceAppRatingPrompt();
        }
      }
    }
  };

  accountService.clearPasscode = function clearPasscode() {

    accountService.getAccountUser().user.passcode = undefined;

    updateLocalAccountUser();

    return authHttp.post(Environment.serverURL + '/account/clearPasscode');
  };

  accountService.setPasscode = function setPasscode(newPasscode) {

    // TODO on success.
    accountService.getAccountUser().user.passcode = newPasscode;

    updateLocalAccountUser();

    return authHttp.post(Environment.serverURL + '/account/setPasscode', {
      passcode: newPasscode
    });
  };

  // Below is mostly used for the website.
  accountService.getDownloadGiftCodeToken = function getDownloadGiftCodeToken() {

    return authHttp.get(Environment.serverURL + '/payment/getGiftCodeDownloadToken');
  };

  accountService.redeemGiftCode = function redeemGiftCode(code) {

    return authHttp.post(Environment.serverURL + '/payment/redeemGiftCode', {code: code});
  };

  accountService.bulkPurchaseWithtoken = function bulkPurchaseWithtoken(token, firstName, lastName, address1, address2, city, state, postalCode, country, subscription, coupon, purchases) {

    return authHttp.post(Environment.serverURL + '/payment/bulkPurchase', {
      token: token,
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      subscription: subscription,
      coupon: coupon,
      purchases: purchases
    });
  };

  accountService.subscribeWithToken = function subscribeWithToken(token, firstName, lastName, address1, address2, city, state, postalCode, country, subscription, coupon) {

    return authHttp.post(Environment.serverURL + '/payment/subscribeWithToken', {
      token: token,
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      subscription: subscription,
      coupon: coupon
    });
  };

  // For web subscriptions.
  accountService.cancelSubscription = function cancelSubscription() {

    return authHttp.post(Environment.serverURL + '/payment/cancelSubscription');
  };


  function viewVidSuccessCallback(val) {

    $rootScope.viewingVideo = false;

    if (typeof val != 'boolean') {

      val = (val === 'true');
    }

    if (val) {
      console.log("Finished video.");

      if (accountService.finishVidCallback){
        accountService.finishVidCallback();
        accountService.finishVidCallback = null;
      }
    }
    else {
      console.log("Did not finish video.");
      }

    var videoTimeout = ionic.Platform.isAndroid() ? 500 : 0;
    $timeout(window.playVideo, videoTimeout);
  }

  accountService.viewVideo = function viewVideo(index, finishCallback) {

    accountService.finishVidCallback = finishCallback;

    if (index < 0 || index >= 6) {
      console.log('ERROR: index for video viewing is invalid.');
      return;
    }

    if (window.plugins && window.plugins.streamingMedia) {

      // Get the URL from the server.
      var url = Environment.serverURL + '/media/introVideo/stream/' + index;

      authHttp.get(url)
        .success(function(data) {
          $rootScope.viewingVideo = true;
          window.pauseVideo();
          window.plugins.streamingMedia.playVideo(data.url, {
            successCallback: viewVidSuccessCallback,
            shouldAutoClose: true
          });
        })
        .error(function() {

          console.log("Error viewing video.");
        });
    }
  };

  accountService.isAdmin = function isAdmin() {
    return accountService.hasRole(ACCOUNT_ROLES.ADMIN);
  };

  accountService.isPractitioner = function isPractitioner() {
    return accountService.hasRole(ACCOUNT_ROLES.PRACTITIONER);
  };

  accountService.isCoach = function isCoach() {
    return accountService.hasRole(ACCOUNT_ROLES.COACH);
  };

  accountService.isBackendCoach = function isBackendCoach() {
    return accountService.hasRole(ACCOUNT_ROLES.BACKEND_COACH);
  };

  accountService.isCoachManager = function isCoachManager() {
    return accountService.hasRole(ACCOUNT_ROLES.COACH_MANAGER);
  };

  accountService.isAnyCoach = function isAnyCoach() {
    return accountService.isCoachManager() || accountService.isCoach() || accountService.isBackendCoach();
  };

  accountService.getExactCoachRole = function getExactCoachRole() {
    if (accountService.isCoach()) {
      return ACCOUNT_ROLES.COACH;
    }

    if (accountService.isCoachManager()) {
      return ACCOUNT_ROLES.COACH_MANAGER;
    }

    if (accountService.isBackendCoach()) {
      return ACCOUNT_ROLES.BACKEND_COACH;
    }
  };

  accountService.getFullName = function() {
    var accountUser = accountService.getAccountUser();
    var firstName = _.get(accountUser, 'account.firstName');
    var lastName = _.get(accountUser, 'account.lastName');

    return firstName + ' ' + lastName;
  };

  accountService.getAvatarUrl = function() {
    var accountUser = accountService.getAccountUser();
    return _.get(accountUser, 'user.signedHomeImageUrl');
  };

  accountService.hasRole = function hasRole(role) {
    var user = accountService.getAccountUser();
    var roles = _.get(user, 'user.roles', []);

    return _.includes(roles, role);
  };

  accountService.isPHI = function isPHI() {
      var accountUser = accountService.accountUser;
      if (accountUser && accountUser.user && accountUser.user.phi) {
          return true;
      }
      return false;
  };

  accountService.hasConnection = function hasConnection(){
    var connection = accountService.getConnectionContext();
    return connection && connection.practitioners && connection.practitioners.length > 0;
  };

  accountService.getPractitionerInvite = function getPractitionerInvite(inviteCode) {

    return authHttp.post(Environment.serverURL + '/account/getPractitionerInvite', {inviteCode: inviteCode});
  };

  accountService.connectPractitioner = function connectPractitioner(inviteCode) {

    var ret = createPromise();
    authHttp.post(Environment.serverURL + '/account/connect', {inviteCode: inviteCode})
      .success(function(data) {

        markAsPHIAccount();

        if (ret.successCallback)
          ret.successCallback(data);

      })
    .error(function(data, status, headers, config) {

        if (ret.errorCallback)
          ret.errorCallback(data, status, headers, config);
      });

    return ret;
  };

  accountService.disconnectPractitioner = function disconnectPractitioner(practitioner) {

    var ret = createPromise();

    authHttp.post(Environment.serverURL + '/account/disconnect', {practitionerId: practitioner.id})
      .success(function(hipaaAuthorization) {

        if (!accountService.connectionContext)
          accountService.connectionContext = {};

        if (accountService.connectionContext.authorizations)
          accountService.connectionContext.authorizations = [];

        accountService.connectionContext.authorizations.push(hipaaAuthorization);

        accountService.checkHipaaAuthorizations();

        if (ret.successCallback)
          ret.successCallback();
      })
      .error(function() {

        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  accountService.sendReportToSelf = function sendReportToSelf(week, userName) {

    return authHttp.post(Environment.serverURL + '/activity/sendReportToSelf', {
      sendToSelf: true,
      week: week,
      userName: userName
    });
  };

  accountService.sendReportToOther = function sendReportToOther(week, userName, otherName, email, type) {

    return authHttp.post(Environment.serverURL + '/activity/sendReportToOther', {
      sendToSelf: false,
      week: week,
      userName: userName,
      name: otherName,
      email: email,
      type: type
    });
  };

  accountService.checkHipaaAuthorizations = function checkHipaaAuthorizations(forcePresent) {
    var ctx = accountService.connectionContext;
    if (ctx) {

      var auths = ctx.authorizations;
      if (auths) {

        for (var i=0; i<auths.length; ++i) {

          var auth = auths[i];
          if ((!auth.authorizedAt && !auth.deniedAt) && (auth.authorizationType === "DATA_RETENTION" || forcePresent)) {

            accountService.presentHipaaAuthorization(auth);
            break;
          }
        }
      }
    }
  };

  accountService.presentHipaaAuthorization = function presentHipaaAuthorization(authorization) {

    var HIPAA_MODAL_ID = 'HIPAAModal';
    var scope = $rootScope.$new();

    scope.data = {
      fullName: ''
    };

    scope.authorizationText = authorization.authorizationText;

    scope.checkName = function checkName() {

      scope.nameError = scope.data.fullName.length < 2;
    };

    scope.closeHipaaModal = function closeHipaaModal() {
      return OverlayService.modal.close(scope.hipaaModal).then(function(modal) {
        scope.hipaaModal = modal;
      });
    };

    scope.authorize = function authorize() {

      scope.checkName();

      if (scope.nameError)
        return;

      scope.busy = true;

      accountService.authorizeHIPAA(authorization.id, scope.data.fullName)
        .success(function () {
          authorization.authorizedAt = new Date().getTime();
          StorageService.setItem('connectionContext', JSON.stringify(accountService.connectionContext));

          scope.closeHipaaModal().then(function() {
            var ctx = accountService.connectionContext;

            scope.busy = false;

            if (authorization.authorizationType != "CONSENT_ONLY") {
              OverlayService.popup.alert({
                template: $translate.instant('DENY_HIPAA_LOGOUT'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });

              $rootScope.$broadcast('event:loginRequired');
            } else {

              var coach = _.find(accountService.connectionContext.invitedPractitioners, function(practitioner) {
                return practitioner.organization.id === authorization.organizationId;
              });

              var emailPref = accountService.getUserPreference('receive_phi_in_email');
              if (typeof emailPref === 'undefined') {
                scope.showInsecureEmailModal({'connectionName': coach.organization.organizationName});
              }

              markAsPHIAccount();

              // This will refresh the user context, and navigate to the new coach behind the scenes.
              // All open modals except the PHI modal will be closed.
              scope.$emit('event:connectedToCoach', {'coach': coach });

            }



          });

        })
        .error(function habitError(data, status, header, config) {

          scope.busy = false;
        });
    };

    scope.deny = function deny() {

      // When connecting to therapists, deny means we want to explicitly deny the authorization request.
      // If connecting to a coach, we don't give them the option to deny, so we can just close the modal.
      if (authorization.authorizationType != "CONSENT_ONLY") {

        scope.checkName();

        if (scope.nameError)
          return;

        var confirmPopup = OverlayService.popup.confirm({
          template: '<div focus-on-open>' + $translate.instant('DENY_HIPAA_CONFIRM') + '</div>',
          cancelText: $translate.instant('CANCEL'),
          cancelType: 'button-default',
          okText: $translate.instant('DELETE_MY_DATA'),
          okType: 'button-default',
          cssClass: 'deny-hipaa-confirmation-popup'
        });

        confirmPopup.then(function(res) {
          if (res) {
            scope.busy = true;

            accountService.denyHIPAA(authorization.id, scope.data.fullName)
              .success(function () {

                authorization.deniedAt = new Date().getTime();
                StorageService.setItem('connectionContext', JSON.stringify(accountService.connectionContext));

                scope.closeHipaaModal().then(function() {

                  scope.busy = false;

                  OverlayService.popup.alert({
                    template: $translate.instant('DENY_HIPAA_LOGOUT'),
                    okText: $translate.instant('OK_GOT_IT'),
                    okType: 'button-default'
                  });

                  $rootScope.$broadcast('event:loginRequired');

                });


              })
              .error(function habitError(data, status, header, config) {

                scope.busy = false;
              });
          }
        });
      } else {
        scope.closeHipaaModal();
      }

    };

    scope.$on('$destroy', function() {
      window.removeEventListener('keyboardDidShow', adjustHeightToKeyboard);
      window.removeEventListener('keyboardWillHide', resetHeight);
    });

    var viewUrl = Environment.isWeb() ?
     'templates/account.authorizeHIPAA.modal.html' :
     'views/account/account.authorizeHIPAA.modal.html';

    scope.authorization = authorization;

    OverlayService.modal.open({
      modalId: HIPAA_MODAL_ID,
      templateUrl: viewUrl,
      scope: scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false
    }).then(function(modal) {
      scope.hipaaModal = modal;

      if (Environment.isIos()) {
        window.addEventListener('keyboardDidShow', adjustHeightToKeyboard);
        window.addEventListener('keyboardWillHide', resetHeight);
      }

      // Kind of hacky, but this allows us to open these links (which come from the server) in-app.
      var privacyPolicyLink = $('.hipaa a[href="#"]')[0];
      var tosLink = $('.hipaa a[href="#"]')[1];
      privacyPolicyLink.addEventListener('click', window.showPrivacyPolicy);
      tosLink.addEventListener('click', window.showTermsOfService);
    });

    function adjustHeightToKeyboard(e) {
      var modalContent = document.getElementById(HIPAA_MODAL_ID);

      if (modalContent) {
        modalContent.style.bottom = e.keyboardHeight + 'px';

        $location.hash('full-name');
        $anchorScroll();
      }
    }

    function resetHeight() {
      var modalContent = document.getElementById(HIPAA_MODAL_ID);

      if (modalContent) {
        modalContent.style.bottom = 0;
      }
    }

  };

  accountService.authorizeHIPAA = function authorizeHIPAA(id, fullName) {

    var auth = _.find(accountService.connectionContext.authorizations, function(auth) { return auth.id === id; } );
    var practitioner = _.find(accountService.connectionContext.invitedPractitioners, function(practitioner) {
      return practitioner.organization.id === auth.organizationId;
    });
    var authEndpoint = auth.authorizationType === 'CONSENT_ONLY' ? ('/account/connect/' + practitioner.id) : '/account/authorizeHIPAA';

    return authHttp.post(Environment.serverURL + authEndpoint, {
      authorizationId: id,
      userName: fullName
    });
  };

  accountService.denyHIPAA = function denyHIPAA(id, fullName) {

    return authHttp.post(Environment.serverURL + '/account/denyHIPAA', {
      authorizationId: id,
      userName: fullName
    });
  };

  accountService.getVideoToken = function getVideoToken() {

    return authHttp.get(Environment.serverURL + '/video/token');
  };

  accountService.sharePacificaWithPractitioner = function sharePacificaWithPractitioner(practitionerType, practitionerName, practitionerEmail, userName) {

    return authHttp.post(Environment.serverURL + '/account/sharePacificaWithPractitioner', {
      practitionerType: practitionerType,
      practitionerName: practitionerName,
      practitionerEmail: practitionerEmail,
      userName: userName
    });
  };

  accountService.canStartAppointment = function canStartAppointment(appointment) {
    if (appointment && appointment.appointmentType == 'TELETHERAPY' || appointment.appointmentType == 'CONSULTATION') {
      var now = new Date();
      var startDate = new Date(appointment.startTime - (5 * 60 * 1000));
      var endDate = new Date(appointment.startTime + (appointment.duration * 60 * 1000) + (15 * 60 * 1000));

      return (startDate < now) && (endDate > now);
    }

    return false;
  };

  accountService.initializeAppointmentFunctionality = function initializeAppointmentFunctionality($scope, $state) {

    $scope.isAppointmentToday = function isAppointmentToday(appointment) {

      if (appointment) {

        var todayString = GeneralService.getTodayString();

        var startDate = new Date(appointment.startTime - (5 * 60 * 1000));
        var endDate = new Date(appointment.startTime + (appointment.duration * 60 * 1000) + (15 * 60 * 1000));

        return (todayString == GeneralService.getDayString(startDate)) ||
               (todayString == GeneralService.getDayString(endDate));
      }
    };

    $scope.toggleShowAdditionalAppointments = function toggleShowAdditionalAppointments() {
      $scope.isShowingMoreAppointments = !$scope.isShowingMoreAppointments;
    };

    var appointmentContext = accountService.getAppointmentContext();
    if (appointmentContext) {
      $scope.todaysAppointments = _.filter(appointmentContext.appointments, function(appointment) {
        return $scope.isAppointmentToday(appointment);
      });

      $scope.upcomingAppointments = _.filter(appointmentContext.appointments, function(appointment) {
        var isNotCancelled = appointment.cancelTime === null;
        return appointment.appointmentType !== 'CONSULTATION' && isNotCancelled;
      });

      $scope.upcomingConsultations = _.filter(appointmentContext.appointments, function(appointment) {
        var now = moment();
        var isUpcoming = moment(appointment.endTime).isAfter(now);
        var isNotCancelled = appointment.cancelTime === null;
        return appointment.appointmentType === 'CONSULTATION' && isUpcoming && isNotCancelled;
      });
      $scope.completedConsultations = _.filter(appointmentContext.appointments, function(appointment) {
        var now = moment();
        var isUpcoming = moment(appointment.endTime).isAfter(now);
        return appointment.appointmentType === 'CONSULTATION' && !isUpcoming;
      });

      $scope.upcomingAppointments = _.sortBy($scope.upcomingAppointments, 'startTime');
      $scope.upcomingConsultations = _.sortBy($scope.upcomingConsultations, 'startTime');
      $scope.completedConsultations = _.sortBy($scope.completedConsultations, 'startTime');
      $scope.completedConsultations.reverse();
    }


    // This view is cached, so this allows us to store and update the last time we displayed an appointment.
    // updateAppointmentsDisplayedTime should get called before we display the time of an appointment.
    $scope.appointmentsDisplayedTime = new Date();

    $scope.updateAppointmentsDisplayedTime = function() {
      $scope.appointmentsDisplayedTime = new Date();
    };

    $scope.hasConsultationWithClinician = function(clinician) {
      if ($scope.upcomingConsultations.length < 1)
        return false;
      var consultationsWithClincian = _.filter($scope.upcomingConsultations, function(consultation) {
        return consultation.practitionerId === clinician.id;
      });

      return consultationsWithClincian.length > 0;
    };

    $scope.getAppointmentTimeDiff = function getAppointmentTimeDiff(appointment) {

      return GeneralService.getElapsedTimeDisplay(appointment.startTime, $scope.appointmentsDisplayedTime);
    };

    $scope.canStartAppointment = function canStartAppointment(appointment) {

      return accountService.canStartAppointment(appointment);
    };

    $scope.tappedAppointment = function tappedAppointment(appointment, $event) {
      if(appointment.appointmentType != 'TELETHERAPY' && appointment.appointmentType != 'CONSULTATION'){
        return;
      }
      if (!$scope.canStartAppointment(appointment)) {

        GeneralService.showToast($translate.instant('APPOINTMENT_UNAVAILABLE_MSG'));
      } else {
        $scope.startAppointment(appointment, $event);
      }
    };

    $scope.getAppointmentTypeDisplay = function(type){
      if(type == 'TELETHERAPY'){
        return $translate.instant('TELETHERAPY');
      } else if(type == 'IN_PERSON'){
        return $translate.instant("IN_PERSON");
      }
    };

    $scope.startAppointment = function startAppointment(appointment, event) {

      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }

      if (window.pauseVideo)
        window.pauseVideo();

      accountService.getVideoToken().success(function (tokenData) {
        console.log("got token" + tokenData);
        if(!$scope.mobile)
          return;
        if (window.plugins && window.plugins.twilio && !ionic.Platform.isAndroid()) {
          window.plugins.twilio(tokenData.token, appointment.roomId, function(msgType, value) {
            console.log("msgType: " + msgType);
            console.log("value: " + value);
          });
        } else {
          $state.go('videochat', {token: tokenData.token, roomId: appointment.roomId});
        }
      }).error(function() {
        console.log("Could not retrieve video token.");
      });
    };

    $scope.$on('$ionicView.enter', function() {

      if (!$scope.todaysAppointments)
        return;

      if ($scope.todaysAppointments.length > 0) {

        $scope.updateAppointmentsDisplayedTime();

        // Update displayed appointment time on an interval.
        if (!$scope.updateAppointmentTimePromise) {
          $scope.updateAppointmentTimePromise = $interval(function() {
            console.log('updateAppointmentsDisplayedTime');
            $scope.updateAppointmentsDisplayedTime();
          }, 15 * 1000);
        }
      }

    });

    $scope.$on('$ionicView.leave', function(){
      if ($scope.updateAppointmentTimePromise) {
        $interval.cancel($scope.updateAppointmentTimePromise);
      }
    });

  };

  accountService.isUserConnected = function(practitioner){
    var connections = accountService.getConnectionContext();
    if(connections && connections.practitioners){
      var isConnected = _.filter(connections.practitioners, function(connection){
        return connection.id == practitioner.id;
      });
      return isConnected.length > 0;
    }
    return false;
  };

  accountService.initializeInviteFunctionality = function initializeInviteFunctionality($scope, $ionicModal, $ionicPopup, $ionicScrollDelegate, $sce) {

    var connectionContext = accountService.getConnectionContext();

    if (!connectionContext || !connectionContext.practitioners)
      $scope.practitionerConnections = [];
    else
      $scope.practitionerConnections = _.filter(connectionContext.practitioners, function(connection) { return !connection.coach; });

    $scope.isConnectedToPractitioner = function isConnectedToPractitioner() {

      return $scope.practitionerConnections.length > 0;
    };

    $scope.practitionerData = {
      inviteCode: '',
      practitioner: undefined
    };

    $rootScope.insecureEmail = {
      checked: false
    };

    $rootScope.insecurePushes = {
      checked: false
    };

    var emailPref = accountService.getUserPreference('receive_phi_in_email');
    if (typeof emailPref !== 'undefined') {

      $rootScope.insecureEmail.checked = emailPref == 'true';
    }

    var pushPref = accountService.getUserPreference('receive_phi_in_pushes');
    if (typeof pushPref !== 'undefined') {

      $rootScope.insecurePushes.checked = pushPref == 'true';
    }

    $scope.enteringInvite = true;

    $scope.getTherapyIntroText = function getTherapyIntroText() {

      return $sce.trustAsHtml($translate.instant('THERAPY_INTRO_1'));
    };

    $scope.copyTherapyLink = function copyTherapyLink() {

      cordova.plugins.clipboard
        .copy('http://www.sanvello.com/clinicians/',
          function success() {


            GeneralService.showToast($translate.instant('URL_COPIED_TO_CLIPBOARD'), true);
          },
          function fail() {
            // error
          }
        );
    };

    $scope.getPractitionerName = function getPractitionerName(practitioner) {

      if (!practitioner)
        return '';

      return practitioner.fullName;
    };

    $scope.getPractitionerDetails = function getPractitionerDetails(practitioner) {

      if (!practitioner)
        return '';

      var ret = $scope.getPractitionerName(practitioner);

      ret += ', ' + practitioner.location.address + ', ' + practitioner.location.city + ', ' + practitioner.location.state;

      return ret;
    };

    $scope.getAuthorizationText = function getAuthorizationText() {

      if ($scope.practitionerData.practitioner) {

        var rawText = $translate.instant('CONNECT_TO_PRACTITIONER_DESC');
        rawText = rawText.replace('XXXPRACTITIONER_NAMEXXX', $scope.getPractitionerName($scope.practitionerData.practitioner));

        return $sce.trustAsHtml(rawText);
      }
      return '';
    };

    $scope.closeConnectModal = function closeConnectModal() {
      return OverlayService.modal.close($scope.connectModal).then(function(modal) {
        $scope.connectModal = modal;
        $scope.enteringInvite = true;
        $scope.practitionerData.practitioner = undefined;
      });
    };

    $rootScope.closeInsecureDeviceModal = function closeInsecureDeviceModal() {
      OverlayService.modal.close($rootScope.insecureDeviceModal).then(function(modal) {
        $rootScope.insecureDeviceModal = modal;
      });
    };

    function showInsecureDeviceModal() {

      OverlayService.modal.open({
        modalId: 'InsecureDeviceModal',
        templateUrl: 'views/account/account.insecureDevice.modal.html',
        scope: $rootScope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $rootScope.insecureDeviceModal = modal;
      });
    }

    $scope.showConnectModal = function showConnectModal() {

      $scope.practitionerData.inviteCode = '';
      $scope.practitionerData.practitioner = undefined;

      var templateUrl = Environment.isWeb() ?
        'templates/account.connect.modal.html' :
        'views/account/account.connect.modal.html';

      if (Environment.isWebDebug()) {
        OverlayService.modal.open({
          modalId: 'TherapistConnectModal',
          templateUrl: templateUrl,
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.connectModal = modal;
          if($scope.mobile){
            $timeout($ionicScrollDelegate.resize());
          }
        });
      } else {

        StorageService.isKeyguardSecure(function(secure) {

          if (secure) {
            OverlayService.modal.open({
              modalId: 'TherapistConnectModal',
              templateUrl: templateUrl,
              scope: $scope,
              animation: 'slide-in-up',
              ignoreStatusBar: false
            }).then(function(modal) {
              $scope.connectModal = modal;
              if($scope.mobile)
                $timeout($ionicScrollDelegate.resize());
            });
          } else {

            showInsecureDeviceModal();
          }
        }, function() {
          showInsecureDeviceModal();
        });
      }
    };

    $rootScope.closeInsecureEmailModal = function closeInsecureEmailModal() {

      OverlayService.modal.close($rootScope.insecureEmailModal).then(function(modal) {
        $rootScope.insecureEmailModal = modal;
        $rootScope.connectionName = undefined;
        if ($scope.mobile) {
          $ionicScrollDelegate.$getByHandle('therapyScroller').resize();
          $ionicScrollDelegate.$getByHandle('therapyScroller').scrollTop(false);
        }
      });

    };

    $scope.closeTherapistSharemodal = function closeTherapistSharemodal() {
      OverlayService.modal.close($scope.therapistSharemodal).then(function(modal) {
        $scope.therapistSharemodal = modal;
      });
    };

    $scope.showTherapistShareModal = function showTherapistShareModal() {

      $scope.practitionerData = {
        type: $translate.instant('THERAPIST')
      };
      // use this to show submission confirmation on web since we don't use toasts
      $scope.showConfirmScreen = false;
      var templateUrl = Environment.isWeb() ?
        'templates/therapist.info.modal.html' :
        'views/therapy/therapist.info.modal.html';

      OverlayService.modal.open({
        modalId: 'TherapistShareModal',
        templateUrl: templateUrl,
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.therapistSharemodal = modal;
      });

    };

    $scope.sharePacificaInfo = function sharePacificaInfo() {

      $scope.sendingEmail = true;

      accountService.sharePacificaWithPractitioner(
        $scope.practitionerData.type,
        $scope.practitionerData.name,
        $scope.practitionerData.email,
        $scope.practitionerData.userName)
        .success(function() {

          $scope.confirmMsg = $translate.instant('SHARED_PACIFICA_FOR_CLINICIANS').replace('XXXPRACTITIONERXXX', $scope.practitionerData.type.toLowerCase());

          $scope.sendingEmail = false;
            if(!Environment.isWeb()) {
            $scope.closeTherapistSharemodal();

            GeneralService.showToast($scope.confirmMsg);

            if ($scope.nextNuxSlide)
              $scope.nextNuxSlide();

          } else {
            $scope.showConfirmScreen = true;
          }
        })
        .error(function() {

          $scope.sendingEmail = false;
          OverlayService.popup.alert({
            template: $translate.instant('SHARE_PACIFICA_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    };

    $rootScope.updateInsecureEmailPreference = function updateInsecureEmailPreference() {

      accountService.setUserPreference('receive_phi_in_email', $rootScope.insecureEmail.checked);
    };

    $rootScope.updateInsecurePushPreference = function updateInsecurePushPreference() {

      accountService.setUserPreference('receive_phi_in_pushes', $rootScope.insecurePushes.checked);
    };

    $scope.showInsecureEmailPreference = function showInsecureEmailPreference() {

      // This has to get set once after making the connection to the practitioner.
      var emailPref = accountService.getUserPreference('receive_phi_in_email');
      return typeof emailPref !== 'undefined';
    };

    $rootScope.showInsecureEmailModal = function showInsecureEmailModal(options) {

      $rootScope.connectionName = (options && options.connectionName) ? options.connectionName : '';

      var templateUrl = Environment.isWeb() ?
        'templates/account.insecureEmail.modal.html' :
        'views/account/account.insecureEmail.modal.html';

      return OverlayService.modal.open({
        modalId: 'InsecureEmailModal',
        templateUrl: templateUrl,
        scope: $rootScope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $rootScope.insecureEmailModal = modal;
      });
    };

    $scope.getPractitionerInvite = function getPractitionerInvite() {

      accountService.getPractitionerInvite($scope.practitionerData.inviteCode)
        .success(function(practitioner) {
          $scope.practitionerData.practitioner = practitioner;

          $scope.enteringInvite = false;
          if($scope.mobile)
            $timeout($ionicScrollDelegate.resize, 200);
        })
        .error(function(data, status, headers, config) {

          if (status == 404) {

            OverlayService.popup.alert({
              template: $translate.instant('CONNECT_PRACTITIONER_INVALID_CODE'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          } else {
            OverlayService.popup.alert({
              template: $translate.instant('CONNECT_PRACTITIONER_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }
        });
    };

    $scope.connectToPractitioner = function connectToPractitioner() {

      if ($scope.enteringInvite) {

        $scope.getPractitionerInvite();
      } else {
        accountService.connectPractitioner($scope.practitionerData.inviteCode)
          .success(function(practitioner) {
            $scope.closeConnectModal().then(function() {
              $scope.showInsecureEmailModal();
            });

            $scope.practitionerConnections.push(practitioner);
            $rootScope.$broadcast('event:userContextRefreshRequest');

            // @fixme This resets user preferences whenever `accountService.connectPractitioner()` resolves
            // Previous preferences shouldn't be reset
            accountService.setUserPreference('receive_phi_in_email', false);
            accountService.setUserPreference('receive_phi_in_pushes', false);

            if($scope.mobile){
              $timeout($ionicScrollDelegate.scrollTop);
              $timeout($ionicScrollDelegate.resize, 200);
            }
          })
          .error(function(data, status, headers, config) {

            var localError;

            if (status == 404) {

              localError = $translate.instant('CONNECT_PRACTITIONER_INVALID_CODE');
            } else if (status == 409) {

              localError = $translate.instant('CONNECT_TO_PRACTITIONER_CONFLICT');
            } else {

              localError = $translate.instant('CONNECT_PRACTITIONER_ERROR');
            }

            OverlayService.popup.alert({
              template: localError,
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      }
    };

    $scope.disconnectPractitioner = function disconnectPractitioner(practitioner) {

      var disconnectText = practitioner.coach ?
                           $translate.instant('DISCONNECT_COACH_POPUP') :
                           $translate.instant('DISCONNECT_PRACTITIONER_POPUP');

      var disconnectPopup = OverlayService.popup.confirm({
        template: '<div focus-on-open>' + disconnectText + '</div>',
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('DISCONNECT'),
        okType: 'button-default'
      });

      disconnectPopup.then(function(res) {

        if (res) {

          accountService.disconnectPractitioner(practitioner)
            .success(function() {
              var index = $scope.practitionerConnections.indexOf(practitioner);
              if (index >= 0) {

                $scope.practitionerConnections.splice(index, 1);
              }
              //make sure we close details modal right after disconnect success
              if($scope.therapistDetailsModal) {
                $scope.closePractitionerDetailsModal();
              }

              $scope.$broadcast('event:userContextRefreshRequest');

            })
            .error(function(data, status, headers, config) {

            OverlayService.popup.alert({
                template: $translate.instant('CONNECT_PRACTITIONER_ERROR'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            });
        }
      });
    };
  };

  accountService.timeZones = {
    "Africa/Abidjan": "Africa/Abidjan",
    "Africa/Accra": "Africa/Accra",
    "Africa/Addis_Ababa": "Africa/Addis Ababa",
    "Africa/Algiers": "Africa/Algiers",
    "Africa/Asmara": "Africa/Asmara",
    "Africa/Bamako": "Africa/Bamako",
    "Africa/Bangui": "Africa/Bangui",
    "Africa/Banjul": "Africa/Banjul",
    "Africa/Bissau": "Africa/Bissau",
    "Africa/Blantyre": "Africa/Blantyre",
    "Africa/Brazzaville": "Africa/Brazzaville",
    "Africa/Bujumbura": "Africa/Bujumbura",
    "Africa/Cairo": "Africa/Cairo",
    "Africa/Casablanca": "Africa/Casablanca",
    "Africa/Ceuta": "Africa/Ceuta",
    "Africa/Conakry": "Africa/Conakry",
    "Africa/Dakar": "Africa/Dakar",
    "Africa/Dar_es_Salaam": "Africa/Dar es Salaam",
    "Africa/Djibouti": "Africa/Djibouti",
    "Africa/Douala": "Africa/Douala",
    "Africa/El_Aaiun": "Africa/El Aaiun",
    "Africa/Freetown": "Africa/Freetown",
    "Africa/Gaborone": "Africa/Gaborone",
    "Africa/Harare": "Africa/Harare",
    "Africa/Johannesburg": "Africa/Johannesburg",
    "Africa/Kampala": "Africa/Kampala",
    "Africa/Khartoum": "Africa/Khartoum",
    "Africa/Kigali": "Africa/Kigali",
    "Africa/Kinshasa": "Africa/Kinshasa",
    "Africa/Lagos": "Africa/Lagos",
    "Africa/Libreville": "Africa/Libreville",
    "Africa/Lome": "Africa/Lome",
    "Africa/Luanda": "Africa/Luanda",
    "Africa/Lubumbashi": "Africa/Lubumbashi",
    "Africa/Lusaka": "Africa/Lusaka",
    "Africa/Malabo": "Africa/Malabo",
    "Africa/Maputo": "Africa/Maputo",
    "Africa/Maseru": "Africa/Maseru",
    "Africa/Mbabane": "Africa/Mbabane",
    "Africa/Mogadishu": "Africa/Mogadishu",
    "Africa/Monrovia": "Africa/Monrovia",
    "Africa/Nairobi": "Africa/Nairobi",
    "Africa/Ndjamena": "Africa/Ndjamena",
    "Africa/Niamey": "Africa/Niamey",
    "Africa/Nouakchott": "Africa/Nouakchott",
    "Africa/Ouagadougou": "Africa/Ouagadougou",
    "Africa/Porto-Novo": "Africa/Porto-Novo",
    "Africa/Sao_Tome": "Africa/Sao Tome",
    "Africa/Tripoli": "Africa/Tripoli",
    "Africa/Tunis": "Africa/Tunis",
    "Africa/Windhoek": "Africa/Windhoek",
    "America/Adak": "America/Adak",
    "America/Anchorage": "America/Anchorage",
    "America/Anguilla": "America/Anguilla",
    "America/Antigua": "America/Antigua",
    "America/Araguaina": "America/Araguaina",
    "America/Argentina/Buenos_Aires": "America/Argentina/Buenos Aires",
    "America/Argentina/Catamarca": "America/Argentina/Catamarca",
    "America/Argentina/Cordoba": "America/Argentina/Cordoba",
    "America/Argentina/Jujuy": "America/Argentina/Jujuy",
    "America/Argentina/La_Rioja": "America/Argentina/La Rioja",
    "America/Argentina/Mendoza": "America/Argentina/Mendoza",
    "America/Argentina/Rio_Gallegos": "America/Argentina/Rio Gallegos",
    "America/Argentina/Salta": "America/Argentina/Salta",
    "America/Argentina/San_Juan": "America/Argentina/San Juan",
    "America/Argentina/San_Luis": "America/Argentina/San Luis",
    "America/Argentina/Tucuman": "America/Argentina/Tucuman",
    "America/Argentina/Ushuaia": "America/Argentina/Ushuaia",
    "America/Aruba": "America/Aruba",
    "America/Asuncion": "America/Asuncion",
    "America/Atikokan": "America/Atikokan",
    "America/Bahia_Banderas": "America/Bahia Banderas",
    "America/Bahia": "America/Bahia",
    "America/Barbados": "America/Barbados",
    "America/Belem": "America/Belem",
    "America/Belize": "America/Belize",
    "America/Blanc-Sablon": "America/Blanc-Sablon",
    "America/Boa_Vista": "America/Boa Vista",
    "America/Bogota": "America/Bogota",
    "America/Boise": "America/Boise",
    "America/Cambridge_Bay": "America/Cambridge Bay",
    "America/Campo_Grande": "America/Campo Grande",
    "America/Cancun": "America/Cancun",
    "America/Caracas": "America/Caracas",
    "America/Cayenne": "America/Cayenne",
    "America/Cayman": "America/Cayman",
    "America/Chicago": "America/Chicago",
    "America/Chihuahua": "America/Chihuahua",
    "America/Costa_Rica": "America/Costa Rica",
    "America/Cuiaba": "America/Cuiaba",
    "America/Curacao": "America/Curacao",
    "America/Danmarkshavn": "America/Danmarkshavn",
    "America/Dawson_Creek": "America/Dawson Creek",
    "America/Dawson": "America/Dawson",
    "America/Denver": "America/Denver",
    "America/Detroit": "America/Detroit",
    "America/Dominica": "America/Dominica",
    "America/Edmonton": "America/Edmonton",
    "America/Eirunepe": "America/Eirunepe",
    "America/El_Salvador": "America/El Salvador",
    "America/Fortaleza": "America/Fortaleza",
    "America/Glace_Bay": "America/Glace Bay",
    "America/Godthab": "America/Godthab",
    "America/Goose_Bay": "America/Goose Bay",
    "America/Grand_Turk": "America/Grand Turk",
    "America/Grenada": "America/Grenada",
    "America/Guadeloupe": "America/Guadeloupe",
    "America/Guatemala": "America/Guatemala",
    "America/Guayaquil": "America/Guayaquil",
    "America/Guyana": "America/Guyana",
    "America/Halifax": "America/Halifax",
    "America/Havana": "America/Havana",
    "America/Hermosillo": "America/Hermosillo",
    "America/Indiana/Indianapolis": "America/Indiana/Indianapolis",
    "America/Indiana/Knox": "America/Indiana/Knox",
    "America/Indiana/Marengo": "America/Indiana/Marengo",
    "America/Indiana/Petersburg": "America/Indiana/Petersburg",
    "America/Indiana/Tell_City": "America/Indiana/Tell City",
    "America/Indiana/Vevay": "America/Indiana/Vevay",
    "America/Indiana/Vincennes": "America/Indiana/Vincennes",
    "America/Indiana/Winamac": "America/Indiana/Winamac",
    "America/Inuvik": "America/Inuvik",
    "America/Iqaluit": "America/Iqaluit",
    "America/Jamaica": "America/Jamaica",
    "America/Juneau": "America/Juneau",
    "America/Kentucky/Louisville": "America/Kentucky/Louisville",
    "America/Kentucky/Monticello": "America/Kentucky/Monticello",
    "America/La_Paz": "America/La Paz",
    "America/Lima": "America/Lima",
    "America/Los_Angeles": "America/Los Angeles",
    "America/Maceio": "America/Maceio",
    "America/Managua": "America/Managua",
    "America/Manaus": "America/Manaus",
    "America/Marigot": "America/Marigot",
    "America/Martinique": "America/Martinique",
    "America/Matamoros": "America/Matamoros",
    "America/Mazatlan": "America/Mazatlan",
    "America/Menominee": "America/Menominee",
    "America/Merida": "America/Merida",
    "America/Metlakatla": "America/Metlakatla",
    "America/Mexico_City": "America/Mexico City",
    "America/Miquelon": "America/Miquelon",
    "America/Moncton": "America/Moncton",
    "America/Monterrey": "America/Monterrey",
    "America/Montevideo": "America/Montevideo",
    "America/Montreal": "America/Montreal",
    "America/Montserrat": "America/Montserrat",
    "America/Nassau": "America/Nassau",
    "America/New_York": "America/New York",
    "America/Nipigon": "America/Nipigon",
    "America/Nome": "America/Nome",
    "America/Noronha": "America/Noronha",
    "America/North_Dakota/Beulah": "America/North Dakota/Beulah",
    "America/North_Dakota/Center": "America/North Dakota/Center",
    "America/North_Dakota/New_Salem": "America/North Dakota/New Salem",
    "America/Ojinaga": "America/Ojinaga",
    "America/Panama": "America/Panama",
    "America/Pangnirtung": "America/Pangnirtung",
    "America/Paramaribo": "America/Paramaribo",
    "America/Phoenix": "America/Phoenix",
    "America/Port_of_Spain": "America/Port of Spain",
    "America/Port-au-Prince": "America/Port-au-Prince",
    "America/Porto_Velho": "America/Porto Velho",
    "America/Puerto_Rico": "America/Puerto Rico",
    "America/Rainy_River": "America/Rainy River",
    "America/Rankin_Inlet": "America/Rankin Inlet",
    "America/Recife": "America/Recife",
    "America/Regina": "America/Regina",
    "America/Resolute": "America/Resolute",
    "America/Rio_Branco": "America/Rio Branco",
    "America/Santa_Isabel": "America/Santa Isabel",
    "America/Santarem": "America/Santarem",
    "America/Santiago": "America/Santiago",
    "America/Santo_Domingo": "America/Santo Domingo",
    "America/Sao_Paulo": "America/Sao Paulo",
    "America/Scoresbysund": "America/Scoresbysund",
    "America/Shiprock": "America/Shiprock",
    "America/Sitka": "America/Sitka",
    "America/St_Barthelemy": "America/St Barthelemy",
    "America/St_Johns": "America/St Johns",
    "America/St_Kitts": "America/St Kitts",
    "America/St_Lucia": "America/St Lucia",
    "America/St_Thomas": "America/St Thomas",
    "America/St_Vincent": "America/St Vincent",
    "America/Swift_Current": "America/Swift Current",
    "America/Tegucigalpa": "America/Tegucigalpa",
    "America/Thule": "America/Thule",
    "America/Thunder_Bay": "America/Thunder Bay",
    "America/Tijuana": "America/Tijuana",
    "America/Toronto": "America/Toronto",
    "America/Tortola": "America/Tortola",
    "America/Vancouver": "America/Vancouver",
    "America/Whitehorse": "America/Whitehorse",
    "America/Winnipeg": "America/Winnipeg",
    "America/Yakutat": "America/Yakutat",
    "America/Yellowknife": "America/Yellowknife",
    "Antarctica/Casey": "Antarctica/Casey",
    "Antarctica/Davis": "Antarctica/Davis",
    "Antarctica/DumontDUrville": "Antarctica/DumontDUrville",
    "Antarctica/Macquarie": "Antarctica/Macquarie",
    "Antarctica/Mawson": "Antarctica/Mawson",
    "Antarctica/McMurdo": "Antarctica/McMurdo",
    "Antarctica/Palmer": "Antarctica/Palmer",
    "Antarctica/Rothera": "Antarctica/Rothera",
    "Antarctica/South_Pole": "Antarctica/South Pole",
    "Antarctica/Syowa": "Antarctica/Syowa",
    "Antarctica/Vostok": "Antarctica/Vostok",
    "Arctic/Longyearbyen": "Arctic/Longyearbyen",
    "Asia/Aden": "Asia/Aden",
    "Asia/Almaty": "Asia/Almaty",
    "Asia/Amman": "Asia/Amman",
    "Asia/Anadyr": "Asia/Anadyr",
    "Asia/Aqtau": "Asia/Aqtau",
    "Asia/Aqtobe": "Asia/Aqtobe",
    "Asia/Ashgabat": "Asia/Ashgabat",
    "Asia/Baghdad": "Asia/Baghdad",
    "Asia/Bahrain": "Asia/Bahrain",
    "Asia/Baku": "Asia/Baku",
    "Asia/Bangkok": "Asia/Bangkok",
    "Asia/Beirut": "Asia/Beirut",
    "Asia/Bishkek": "Asia/Bishkek",
    "Asia/Brunei": "Asia/Brunei",
    "Asia/Choibalsan": "Asia/Choibalsan",
    "Asia/Chongqing": "Asia/Chongqing",
    "Asia/Colombo": "Asia/Colombo",
    "Asia/Damascus": "Asia/Damascus",
    "Asia/Dhaka": "Asia/Dhaka",
    "Asia/Dili": "Asia/Dili",
    "Asia/Dubai": "Asia/Dubai",
    "Asia/Dushanbe": "Asia/Dushanbe",
    "Asia/Gaza": "Asia/Gaza",
    "Asia/Harbin": "Asia/Harbin",
    "Asia/Ho_Chi_Minh": "Asia/Ho Chi Minh",
    "Asia/Hong_Kong": "Asia/Hong Kong",
    "Asia/Hovd": "Asia/Hovd",
    "Asia/Irkutsk": "Asia/Irkutsk",
    "Asia/Jakarta": "Asia/Jakarta",
    "Asia/Jayapura": "Asia/Jayapura",
    "Asia/Jerusalem": "Asia/Jerusalem",
    "Asia/Kabul": "Asia/Kabul",
    "Asia/Kamchatka": "Asia/Kamchatka",
    "Asia/Karachi": "Asia/Karachi",
    "Asia/Kashgar": "Asia/Kashgar",
    "Asia/Kathmandu": "Asia/Kathmandu",
    "Asia/Kolkata": "Asia/Kolkata",
    "Asia/Krasnoyarsk": "Asia/Krasnoyarsk",
    "Asia/Kuala_Lumpur": "Asia/Kuala Lumpur",
    "Asia/Kuching": "Asia/Kuching",
    "Asia/Kuwait": "Asia/Kuwait",
    "Asia/Macau": "Asia/Macau",
    "Asia/Magadan": "Asia/Magadan",
    "Asia/Makassar": "Asia/Makassar",
    "Asia/Manila": "Asia/Manila",
    "Asia/Muscat": "Asia/Muscat",
    "Asia/Nicosia": "Asia/Nicosia",
    "Asia/Novokuznetsk": "Asia/Novokuznetsk",
    "Asia/Novosibirsk": "Asia/Novosibirsk",
    "Asia/Omsk": "Asia/Omsk",
    "Asia/Oral": "Asia/Oral",
    "Asia/Phnom_Penh": "Asia/Phnom Penh",
    "Asia/Pontianak": "Asia/Pontianak",
    "Asia/Pyongyang": "Asia/Pyongyang",
    "Asia/Qatar": "Asia/Qatar",
    "Asia/Qyzylorda": "Asia/Qyzylorda",
    "Asia/Rangoon": "Asia/Rangoon",
    "Asia/Riyadh": "Asia/Riyadh",
    "Asia/Sakhalin": "Asia/Sakhalin",
    "Asia/Samarkand": "Asia/Samarkand",
    "Asia/Seoul": "Asia/Seoul",
    "Asia/Shanghai": "Asia/Shanghai",
    "Asia/Singapore": "Asia/Singapore",
    "Asia/Taipei": "Asia/Taipei",
    "Asia/Tashkent": "Asia/Tashkent",
    "Asia/Tbilisi": "Asia/Tbilisi",
    "Asia/Tehran": "Asia/Tehran",
    "Asia/Thimphu": "Asia/Thimphu",
    "Asia/Tokyo": "Asia/Tokyo",
    "Asia/Ulaanbaatar": "Asia/Ulaanbaatar",
    "Asia/Urumqi": "Asia/Urumqi",
    "Asia/Vientiane": "Asia/Vientiane",
    "Asia/Vladivostok": "Asia/Vladivostok",
    "Asia/Yakutsk": "Asia/Yakutsk",
    "Asia/Yekaterinburg": "Asia/Yekaterinburg",
    "Asia/Yerevan": "Asia/Yerevan",
    "Atlantic/Azores": "Atlantic/Azores",
    "Atlantic/Bermuda": "Atlantic/Bermuda",
    "Atlantic/Canary": "Atlantic/Canary",
    "Atlantic/Cape_Verde": "Atlantic/Cape Verde",
    "Atlantic/Faroe": "Atlantic/Faroe",
    "Atlantic/Madeira": "Atlantic/Madeira",
    "Atlantic/Reykjavik": "Atlantic/Reykjavik",
    "Atlantic/South_Georgia": "Atlantic/South Georgia",
    "Atlantic/St_Helena": "Atlantic/St Helena",
    "Atlantic/Stanley": "Atlantic/Stanley",
    "Australia/Adelaide": "Australia/Adelaide",
    "Australia/Brisbane": "Australia/Brisbane",
    "Australia/Broken_Hill": "Australia/Broken Hill",
    "Australia/Currie": "Australia/Currie",
    "Australia/Darwin": "Australia/Darwin",
    "Australia/Eucla": "Australia/Eucla",
    "Australia/Hobart": "Australia/Hobart",
    "Australia/Lindeman": "Australia/Lindeman",
    "Australia/Lord_Howe": "Australia/Lord Howe",
    "Australia/Melbourne": "Australia/Melbourne",
    "Australia/Perth": "Australia/Perth",
    "Australia/Sydney": "Australia/Sydney",
    "Europe/Amsterdam": "Europe/Amsterdam",
    "Europe/Andorra": "Europe/Andorra",
    "Europe/Athens": "Europe/Athens",
    "Europe/Belgrade": "Europe/Belgrade",
    "Europe/Berlin": "Europe/Berlin",
    "Europe/Bratislava": "Europe/Bratislava",
    "Europe/Brussels": "Europe/Brussels",
    "Europe/Bucharest": "Europe/Bucharest",
    "Europe/Budapest": "Europe/Budapest",
    "Europe/Chisinau": "Europe/Chisinau",
    "Europe/Copenhagen": "Europe/Copenhagen",
    "Europe/Dublin": "Europe/Dublin",
    "Europe/Gibraltar": "Europe/Gibraltar",
    "Europe/Guernsey": "Europe/Guernsey",
    "Europe/Helsinki": "Europe/Helsinki",
    "Europe/Isle_of_Man": "Europe/Isle of Man",
    "Europe/Istanbul": "Europe/Istanbul",
    "Europe/Jersey": "Europe/Jersey",
    "Europe/Kaliningrad": "Europe/Kaliningrad",
    "Europe/Kiev": "Europe/Kiev",
    "Europe/Lisbon": "Europe/Lisbon",
    "Europe/Ljubljana": "Europe/Ljubljana",
    "Europe/London": "Europe/London",
    "Europe/Luxembourg": "Europe/Luxembourg",
    "Europe/Madrid": "Europe/Madrid",
    "Europe/Malta": "Europe/Malta",
    "Europe/Mariehamn": "Europe/Mariehamn",
    "Europe/Minsk": "Europe/Minsk",
    "Europe/Monaco": "Europe/Monaco",
    "Europe/Moscow": "Europe/Moscow",
    "Europe/Oslo": "Europe/Oslo",
    "Europe/Paris": "Europe/Paris",
    "Europe/Podgorica": "Europe/Podgorica",
    "Europe/Prague": "Europe/Prague",
    "Europe/Riga": "Europe/Riga",
    "Europe/Rome": "Europe/Rome",
    "Europe/Samara": "Europe/Samara",
    "Europe/San_Marino": "Europe/San Marino",
    "Europe/Sarajevo": "Europe/Sarajevo",
    "Europe/Simferopol": "Europe/Simferopol",
    "Europe/Skopje": "Europe/Skopje",
    "Europe/Sofia": "Europe/Sofia",
    "Europe/Stockholm": "Europe/Stockholm",
    "Europe/Tallinn": "Europe/Tallinn",
    "Europe/Tirane": "Europe/Tirane",
    "Europe/Uzhgorod": "Europe/Uzhgorod",
    "Europe/Vaduz": "Europe/Vaduz",
    "Europe/Vatican": "Europe/Vatican",
    "Europe/Vienna": "Europe/Vienna",
    "Europe/Vilnius": "Europe/Vilnius",
    "Europe/Volgograd": "Europe/Volgograd",
    "Europe/Warsaw": "Europe/Warsaw",
    "Europe/Zagreb": "Europe/Zagreb",
    "Europe/Zaporozhye": "Europe/Zaporozhye",
    "Europe/Zurich": "Europe/Zurich",
    "Indian/Antananarivo": "Indian/Antananarivo",
    "Indian/Chagos": "Indian/Chagos",
    "Indian/Christmas": "Indian/Christmas",
    "Indian/Cocos": "Indian/Cocos",
    "Indian/Comoro": "Indian/Comoro",
    "Indian/Kerguelen": "Indian/Kerguelen",
    "Indian/Mahe": "Indian/Mahe",
    "Indian/Maldives": "Indian/Maldives",
    "Indian/Mauritius": "Indian/Mauritius",
    "Indian/Mayotte": "Indian/Mayotte",
    "Indian/Reunion": "Indian/Reunion",
    "Pacific/Apia": "Pacific/Apia",
    "Pacific/Auckland": "Pacific/Auckland",
    "Pacific/Chatham": "Pacific/Chatham",
    "Pacific/Chuuk": "Pacific/Chuuk",
    "Pacific/Easter": "Pacific/Easter",
    "Pacific/Efate": "Pacific/Efate",
    "Pacific/Enderbury": "Pacific/Enderbury",
    "Pacific/Fakaofo": "Pacific/Fakaofo",
    "Pacific/Fiji": "Pacific/Fiji",
    "Pacific/Funafuti": "Pacific/Funafuti",
    "Pacific/Galapagos": "Pacific/Galapagos",
    "Pacific/Gambier": "Pacific/Gambier",
    "Pacific/Guadalcanal": "Pacific/Guadalcanal",
    "Pacific/Guam": "Pacific/Guam",
    "Pacific/Honolulu": "Pacific/Honolulu",
    "Pacific/Johnston": "Pacific/Johnston",
    "Pacific/Kiritimati": "Pacific/Kiritimati",
    "Pacific/Kosrae": "Pacific/Kosrae",
    "Pacific/Kwajalein": "Pacific/Kwajalein",
    "Pacific/Majuro": "Pacific/Majuro",
    "Pacific/Marquesas": "Pacific/Marquesas",
    "Pacific/Midway": "Pacific/Midway",
    "Pacific/Nauru": "Pacific/Nauru",
    "Pacific/Niue": "Pacific/Niue",
    "Pacific/Norfolk": "Pacific/Norfolk",
    "Pacific/Noumea": "Pacific/Noumea",
    "Pacific/Pago_Pago": "Pacific/Pago Pago",
    "Pacific/Palau": "Pacific/Palau",
    "Pacific/Pitcairn": "Pacific/Pitcairn",
    "Pacific/Pohnpei": "Pacific/Pohnpei",
    "Pacific/Port_Moresby": "Pacific/Port Moresby",
    "Pacific/Rarotonga": "Pacific/Rarotonga",
    "Pacific/Saipan": "Pacific/Saipan",
    "Pacific/Tahiti": "Pacific/Tahiti",
    "Pacific/Tarawa": "Pacific/Tarawa",
    "Pacific/Tongatapu": "Pacific/Tongatapu",
    "Pacific/Wake": "Pacific/Wake",
    "Pacific/Wallis": "Pacific/Wallis",
    "UTC": "UTC"
  };

  accountService.getTimeZones = function(){
    return accountService.timeZones;
  };

  accountService.getTimeZoneDisplay = function getUserTimeZoneDisplay(tz) {
    return accountService.timeZones[tz];
  };

  accountService.exportProgressHistory = function exportProgressHistory($scope){

    var newScope = $scope.$new(true);

    newScope.mode = undefined;
    newScope.week = 'current';

    newScope.recipient = 'me';

    newScope.errors = [];

    newScope.meData = {
      email: accountService.getAccountUser().user.email,
      name: ''
    };

    newScope.otherData = {
      type: $translate.instant('THERAPIST'),
      email: '',
      name: '',
      userName: ''
    };

    newScope.setRecipient = function setRecipient(recip) {
      newScope.recipient = recip;

      newScope.removeError("recipient");
    };

    newScope.setWeek = function setWeek(week) {
      newScope.week = week;

      newScope.removeError("week");
    };

    newScope.hasError = function hasError(error) {
      return newScope.errors.indexOf(error) >= 0;
    };

    newScope.addError = function addError(error) {

      var index = newScope.errors.indexOf(error);
      if (index < 0)
        newScope.errors.push(error);
    };

    newScope.removeError = function removeError(error) {

      var index = newScope.errors.indexOf(error);
      if (index >= 0) {

        newScope.errors.splice(index, 1);
      }
    };

    newScope.closeExportModal = function closeExportModal(callback) {
      OverlayService.modal.close($scope.exportModal).then(function(modal) {
        $scope.exportModal = modal;
        if(callback)
          callback();
      });
    };

    newScope.canSendReport = function canSendReport() {

      var canSend = true;

      if (!newScope.recipient) {

        newScope.addError('recipient');
        canSend = false;
      }

      if (!newScope.week) {
        newScope.addError('week');
        canSend = false;
      }


      if (canSend && newScope.recipient == 'me') {

        return true;
      } else if (newScope.recipient == 'other') {

        if (!GeneralService.isEmailValid(newScope.otherData.email)) {
          newScope.addError('email');
          canSend = false;
        }

        if (newScope.otherData.name.length === 0) {
          newScope.addError('name');
          canSend = false;
        }

        if (newScope.otherData.userName.length === 0) {
          newScope.addError('userName');
          canSend = false;
        }

        return canSend;
      }

      return false;
    };

    newScope.sendReport = function sendReport() {

      if (!newScope.canSendReport())
        return;

      newScope.sendingReport = true;

      function sendReportSuccess() {
        newScope.closeExportModal();
        newScope.sendingReport = false;
      }

      function sendReportError() {
        // modal-open class does not go away if we close the modal
        // and open the popup at the same time, so we'll use a callback
        newScope.sendingReport = false;
        newScope.closeExportModal(function(){
          OverlayService.popup.alert({
            template: '<div>' + $translate.instant('SEND_REPORT_ERROR') + '</div>',
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });

        });
      }

      if (newScope.recipient == 'me') {

        accountService.sendReportToSelf(newScope.week, newScope.meData.name)
          .success(sendReportSuccess)
          .error(sendReportError);
      } else {
        accountService.sendReportToOther(newScope.week, newScope.otherData.userName, newScope.otherData.name, newScope.otherData.email, newScope.otherData.type)
          .success(sendReportSuccess)
          .error(sendReportError);
      }
    };

    OverlayService.modal.open({
      modalId: 'ExportModal',
      templateUrl: 'views/progress/export.modal.html',
      scope: newScope,
      animation: 'none',
      ignoreStatusBar: false
    }).then(function(modal) {
      $scope.exportModal = modal;
    });
  };

  /*********************
   *   Error Logging   *
   *********************/

  // This is an authenticated user, so we can tie the error
  // to the person it is occurring for.
  accountService.postJSError = function postError(msg, url, line) {

    authHttp.post(Environment.serverURL + '/support/jserror', {
      msg: msg,
      url: url,
      line: line
    });
  };

  accountService.showConfirmDeleteModal = function showConfirmDeleteModal(templateUrl, $scope){

    if(accountService.isPHI()){
      OverlayService.popup.alert({
        template: $translate.instant('CANNOT_DELETE_PHI'),
        okText: $translate.instant('OK_GOT_IT'),
        okType: 'button-default'
      });
      return;
    }
    $scope.confirmData = {
      inputText: '',
      reason: null
    };
    $scope.confirmError = false;

    OverlayService.modal.open({
      modalId: 'DeleteAccountModal',
      templateUrl: templateUrl,
      scope: $scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false
    }).then(function(modal) {
      $scope.deleteModal = modal;
      return $scope.deleteModal;
    });
  };

  accountService.deleteUser = function deleteUser(){
    var reason = accountService.getDeletionReason();
    return authHttp.post(Environment.serverURL + '/account/deleteUser', {reason: reason});
  };

  accountService.finishDelete = function finishDelete(){
    accountService.deleteUser()
      .success(function(){
        if (accountService.googleSignin) {
          //window.plugins.googleplus.logout();
          window.plugins.googleplus.disconnect();
        }
        accountService.clearData();
        $rootScope.$broadcast('event:loginRequired', {showDataDisclaimer: true});
      })
      .error(function(response){
        var errorMessage = 'DELETE_ERROR';
        if(response && response.details){
            errorMessage = response.details;
        }

        OverlayService.popup.alert({
          template: '<div focus-on-open>' + $translate.instant(errorMessage) + '</div>',
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default',
        }).then(function(res){
          //We want to be completely sure this gets removed when alert is closed
          //Otherwise if we depend on the timeout with enableScrollHack we can never assure that
          $('body').removeClass('modal-open');
        });
        
      });
  };

  var deletionError = function(){
    // we still want to swallow this
    accountService.finishDelete();
  };

  accountService.setDeletionReason = function setDeletionReason(val){
    accountService.deletionReason = val;
  };

  accountService.getDeletionReason = function getDeletionReason(){
    return accountService.deletionReason;
  };

  accountService.validateDeleteText = function validateDeleteText(formVal, modal, socialLogout){
    deleteText = formVal.inputText.toLowerCase();
    accountService.setDeletionReason(formVal.reason);
    // check french & english
    if(deleteText === 'delete' || deleteText == 'supprimer'){
      if(socialLogout) // for web we have extra logout functions to call
        socialLogout();
      return true;
    }
    return false;
  };

  accountService.shouldViewTerms = function shouldViewTerms(){
    if(accountService.consentContext.consents.length === 0)
      return true;
  };

  accountService.userAcceptTerms = function userAcceptTerms(){
    var data = {
      userId: accountService.accountUser.user.id,
      consentType: 'TermsOfService',
      consentGiven: true
    };

    authHttp.post(Environment.serverURL + '/account/consent', data)
      .success(function(){
        accountService.consentContext.consents.push(data);
      })
      .error(function(){
        console.log('consent error');
      });
  };

  accountService.setConsentContext = function setConsentContext(ctx){
    accountService.consentContext = ctx;
  };

  accountService.canUseSiriNotifications = function canUseSiriNotifications() {
    return Environment.isIos() &&
           ionic.Platform.version() >= 12 &&
           window.cordova &&
           window.cordova.plugins &&
           typeof window.cordova.plugins.SiriShortcuts != 'undefined';
  };

  accountService.initVideoTextView = function initVideoTextView($scope){
    $scope.closeTextModal = function(){
      OverlayService.modal.close($scope.textModal).then(function(modal) {
        $scope.textModal = modal;
      });
    };

    $scope.viewText = function (event, video){

      event.stopPropagation();
      event.preventDefault();
      $scope.textFile = 'views/videoText/' + video + '.html';

      OverlayService.modal.open({
        modalId: 'VideoTextModal',
        templateUrl: 'views/videoText/videoText.modal.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.textModal = modal;
      });
    };

    $scope.finishVideo = function(){
      $scope.closeTextModal();

      var vidMask = accountService.getUserPreference('milo_video_mask');
      var newPref;

      if(parseInt(vidMask) == 63)
        return;
      if(vidMask){
        newPref = parseInt(vidMask) | (1 <<$scope.vidIndex);
      } else {
        newPref = (1 <<$scope.vidIndex);
      }
      accountService.setUserPreference('milo_video_mask', newPref);
    };
  };

  accountService.disabledStreak = function disabledStreak(){
    return accountService.getUserPreference('disable_streak') == 'true';
  };

  accountService.shouldShowCommunityRules = function shouldShowCommunityRules(){
    var rulesPref2 = accountService.getUserPreference('viewed_community_rules');
    return !rulesPref2 || rulesPref2 != 'true';
  };


  accountService.promptFor2FA = function promptFor2FA(email, successCallback){

    function resend2FACode(email){
      var config = accountService.getRequestConfig();
      authHttp.addPlatform(config);

      return $http.post(Environment.serverURL + '/account/resendVerificationCode', {email: email}, config);
    }

    var cancelBackButtonOverride = $ionicPlatform.registerBackButtonAction(function(event){
      // When the hardware back button is used, we want to override both the default modal
      // and default popup behaviour. If the 2FA modal is open, we can then close it.
      // 400 = default popup back button action priority
      event.preventDefault();
      event.stopPropagation();
      cancelBackButtonOverride();
    }, 401);


    var scope = $rootScope.$new();
    scope.userEmail = email;
    scope.form = {code: ''};

    function closeModal(){

      OverlayService.modal.close(scope.modal2FA).then(function(modal) {
        scope.modal2FA = modal;

        // This is gross, Ionic doesn't seem to be removing the modal-open class,
        // so we have to do it manually. It seems to have to do with having a popup open at the same time.
        // Besides this, the modal instance seems to be getting cleaned up properly.
        $('body').removeClass('modal-open');
      });

    }

    function checkForOffline(){
      if (!Environment.isOnline()) {

        OverlayService.popup.alert({
          template: $translate.instant('OFFLINE_2FA'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
        return true;
      }
      return false;
    }

    scope.cancelModal = function cancelModal(){
      closeModal();
    };

    scope.resend = function resend(){

      scope.resendSuccess = null;

      if(checkForOffline())
        return;
      resend2FACode(scope.userEmail)
        .success(function(data){
          scope.errorMsg = '';
          scope.resendSuccess = $translate.instant('RESEND_2FA_SUCCESS');
        })
        .error(function(data){
          OverlayService.popup.alert({
            template: $translate.instant('GENERIC_ERROR'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
        });
    };

    scope.verify = function verify(){
      scope.resendSuccess = null;
      if(checkForOffline())
        return;
      if(scope.form.code === ''){
        scope.errorMsg = $translate.instant("EMPTY_2FA_ERROR");
        return;
      }

      accountService.login(scope.userEmail, null, null, scope.form.code)
        .success(function(data, status, headers, config){
          accountService.updateToken(headers);
          accountService.findUserContext()
            .success(function(data){
              closeModal();
              successCallback(data);
            });
        })
        .error(function(data, status, headers, config){
          if(status === 401 && data.message){
            scope.errorMsg = $translate.instant(data.message);
          } else {
            scope.errorMsg = $translate.instant('GENERIC_ERROR');
          }
        });
    };

    var templateUrl = Environment.isWeb() ? 'templates/account.2fa.modal.html' : 'views/account/account.2fa.modal.html';

    OverlayService.modal.open({
      modalId: 'modal2FA',
      templateUrl: templateUrl,
      scope: scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false
    }).then(function(modal) {
      scope.modal2FA = modal;
    });

  };

  accountService.changePassword = function changePassword(currentPassword, newPassword){
    var data = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return authHttp.post(Environment.serverURL + '/account/changePassword', {
      currentPassword:currentPassword,
      newPassword: newPassword
    });
  };

  accountService.updateTokenAndGetContext = function updateTokenAndGetContext(data, status, headers, config, successCallback){
    accountService.updateToken(headers);
    accountService.findUserContext()
      .success(successCallback);
  };

  accountService.showUpdatePasswordModal = function showUpdatePasswordModal (force){
    var TOTAL_VALIDATION_COUNT = 8;
    var scope = $rootScope.$new();
    scope.force = force;
    scope.passwordLabel = $translate.instant('NEW_PASSWORD');

    function resetForm(){
      scope.form = {
        current_password: '',
        new_password:'',
        confirm_password: ''
      };
      scope.validationCount = 0;
      scope.validationError = null;
    }
    resetForm();

    scope.visibility = {
      current_password: 'password',
      new_password: 'password',
      confirm_password: 'password'
    };

    scope.toggleVisibility = function toggleVisibility(param){
      scope.visibility[param] = scope.visibility[param] == 'password' ? 'text' : 'password';
    };

    scope.getPasswordValidatorMessage = function getPasswordValidatorMessage(requirementsMet, totalRequirements) {
      return $translate.instant('ARIA_PASS_VALIDATOR_INSTRUCTIONS').replace('XXX', requirementsMet).replace('YYY', totalRequirements);
    };

    function checkForOffline(){
      if (!Environment.isOnline()) {

        OverlayService.popup.alert({
          template: $translate.instant('OFFLINE_PW'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
        return true;
      }
      return false;
    }

    scope.submit = function submit(){
      if(scope.form.new_password === '' || scope.form.confirm_password === '' || scope.form.current_password === ''){
        scope.errorMsg = $translate.instant('EMPTY_PW_FIELDS');
        return;
      }
      if(scope.form.new_password !== scope.form.confirm_password){
        scope.errorMsg = $translate.instant('PASSWORDS_DONT_MATCH');
        return;
      }

      if(scope.validationCount !== TOTAL_VALIDATION_COUNT){
        scope.errorMsg = $translate.instant('PASSWORD_INVALID');
        return;
      }
      scope.submitting = true;
      accountService.changePassword(scope.form.current_password, scope.form.new_password)
        .success(function(){
          scope.submitting = false;
          if(!Environment.isWeb()){
            scope.cancelModal();
            GeneralService.showToast($translate.instant('PW_UPDATED'), null, 'center');
          } else {
            scope.force = false;
            scope.errorMsg = null;
            resetForm();
            scope.successMsg = $translate.instant('PW_UPDATED');
            $timeout(function(){
              scope.cancelModal();
            }, 4000);
          }
          if(force)
            accountService.accountUser.passwordChangeRequired = false;
        })
        .error(function(data){
          if(data.code == 400 && data.message){
            scope.errorMsg = $translate.instant(data.message);
          } else {
            scope.errorMsg = $translate.instant('GENERIC_ERROR');
          }
          scope.submitting = false;
        });
    };

    scope.forgotPassword = function forgotPassword(){
      OverlayService.loading.show();
      accountService.resetPassword(accountService.accountUser.user.email)
        .success(function() {

          OverlayService.loading.hide();
          scope.cancelModal().then(function() {
            var alertPopup = OverlayService.popup.alert({
              title: $translate.instant('CHECK_EMAIL'),
              template: '<div class="pw-pop">' + $translate.instant('LOGIN_RESET_PASSWORD_CHECK_EMAIL') + '</div>',
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }, 100);
        })
        .error(function(data, status, headers, config) {

          OverlayService.loading.hide();
          scope.errorMessage = $translate.instant('GENERIC_ERROR');
        });
    };

    scope.cancelModal = function cancelModal(){
      return OverlayService.modal.close(scope.updatePasswordModal).then(function(modal) {
        scope.updatePasswordModal = modal;
      });
    };

    scope.evalPassword = function evalPassword(){
      var obj = accountService.evalPassword(scope.form.new_password);
      scope.validationCount = obj.validationCount;
      scope.validationError = obj.validationError;
    };

    var templateUrl = Environment.isWeb() ? 'templates/account.updatePassword.modal.html' : 'views/account/account.updatePassword.modal.html';

    OverlayService.modal.open({
      modalId: 'updatePasswordModal',
      templateUrl: templateUrl,
      scope: scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false
    }).then(function(modal) {
      scope.updatePasswordModal = modal;
    });
  };

  accountService.evalPassword = function evalPassword(password){
    var ret = {
      validationCount: 0,
      validationError: ''
    };

    if(password.length === 0){
      return ret;
    }

    if(password.replace(/[^A-Z]/g, "").length > 0){
      ret.validationCount++;
    } else {
      ret.validationError = 'PW_ERROR_UPPERCASE_FORM';
    }

    if(password.replace(/[^a-z]/g, "").length > 0){
      ret.validationCount++;
    } else {
      if(!ret.validationError)
        ret.validationError = 'PW_ERROR_LOWERCASE_FORM';
    }

    if(password.replace(/[^0-9]/g, "").length > 0){
      ret.validationCount++;
    } else {
      if(!ret.validationError)
        ret.validationError = 'PW_ERROR_NUMERIC_FORM';
    }

    if(password.replace(/[^!@#$%^&*(),.?":{}|<>]/g, "").length > 0){
      ret.validationCount++;
    } else {
      if(!ret.validationError)
        ret.validationError = 'PW_ERROR_ALPHANUMERIC_FORM';
    }

    if(password.length > 1){
      var repeats = /(.)\1\1/;
      if(repeats.test(password)){
      if(!ret.validationError)
        ret.validationError = 'PW_ERROR_REPEATED_CHAR_FORM';
      } else {
        ret.validationCount++;
      }
    }

    if(password.length >= 8){

      var lowerCasePw = password.toLowerCase();
      if(lowerCasePw.indexOf('pacifica') == -1 && lowerCasePw.indexOf('sanvello') == -1){
        ret.validationCount++; // add for string match
      } else {
      if(!ret.validationError)
        ret.validationError = 'PW_ERROR_APP_NAME';
      }

      ret.validationCount++; // add for length
    } else {
      if(!ret.validationError){
        ret.validationError = 'PW_ERROR_LENGTH_SHORT_FORM';
      } else {
        ret.validationCount++;
      }
    }

    if(password.length > 50){
      ret.validationError = 'PW_ERROR_LENGTH_LONG_FORM';
    } else {
      ret.validationCount++;
    }
    return ret;
  };

  accountService.requiresPasswordChange = function requiresPasswordChange(){
    return accountService.accountUser.passwordChangeRequired;
  };

  accountService.setTwoFactorAuth = function setTwoFactorAuth(setting, failureCallback){
    authHttp.post(Environment.serverURL + '/account/set2fa', {twoFactor: setting})
      .success(function(){
        accountService.accountUser.user.twoFactor = setting;
      })
      .error(function(){
        if(failureCallback)
          failureCallback();
      });
  };

  accountService.hide2FA = function hide2FA(){
    return accountService.isPHI() || accountService.usesSocialLogin();
  };

  accountService.disconnectInsurer = function disconnectInsurer() {
    return authHttp.post(Environment.serverURL + '/account/disconnectSponsor')
      .then(function(response) {
          if (!accountService.connectionContext) {
            accountService.connectionContext = {};
          }

          if (accountService.connectionContext.authorizations) {
            accountService.connectionContext.authorizations = [];
          }

          accountService.connectionContext.authorizations.push(response.data);

          return accountService.checkHipaaAuthorizations();
      });
  };

  return accountService;
}]);

var servicesModule = angular.module('activityService', []);

servicesModule.factory('ActivityService', ['AccountService', 'PayService', 'Environment', 'authHttp', '$translate', 'GeneralService', 'StorageService', '$rootScope', '$q', '$timeout', '$state', '$analytics',
 function(AccountService, PayService, Environment, authHttp, $translate, GeneralService, StorageService, $rootScope, $q, $timeout, $state, $analytics) {

  var activityService = {

    exitState: null,
    exitParams: null,
    mainBackState: null,

    activityContext: {},
    offlineActivities: [],
    completedActivities: [], // a comma-separated list of IDs used to determine whether or not we should display help screens
    activitiesById: {}, // Will get populated after the list below is built.
    //suggested activity generation vars
    suggestedActivities: {},
    canSuggestPremiumActivity: null,
    retrievedSuggestedActivities: null,
    randomIds: [],
    premiumCount: 0,
    todaysActionList: null,

    activities: {
      'LOGIN': {
        name: 'LOGIN', // This is the activity name in the database.
        id: 1, // fThis is the id of the activity in the database.
        type: 'account' // This is the type of the activity.
      },
      'LOGOUT': {
        name: 'LOGOUT',
        id: 2,
        type: 'account'
      },
      'COMPLETED_EXPERIMENT': {
        name: 'COMPLETED_EXPERIMENT',
        displayKey: 'COMPLETE_AN_EXPERIMENT',
        id: 5,
        type: 'goals',
        premium: false,
        actionClass: 'goal',
        actionTitle: 'COMPLETED_GOAL'
      },
      // basics
      'COMPLETED_BREATHING': {
        name: 'COMPLETED_BREATHING',
        displayKey: 'RELAX_ACTIVITY_DEEP_BREATHING',
        id: 3,
        type: 'relax',
        premium: false,
        actionClass: 'deep-breathing',
        actionTitle: 'COMPLETED_DEEP_BREATHING',
        isSkillActivity: true,

        exercise: 'Deep Breathing',
        audio: 'none',
        audioLength: 0,
        meditation: false,
        activity: 'COMPLETED_BREATHING',
        relaxCategory: 'BASICS'
      },
      'COMPLETED_MUSCLE_RELAXATION': {
        name: 'COMPLETED_MUSCLE_RELAXATION',
        displayKey: 'RELAX_ACTIVITY_MUSCLE_RELAXATION',
        id: 6,
        type: 'relax',
        premium: false,
        actionClass: 'muscle-relaxation',
        actionTitle: 'COMPLETED_MUSCLE_RELAXATION',
        isSkillActivity: true,

        exercise: 'Muscle Relaxation',
        audio: 'musclerelaxation.mp3',
        audioLength: 528, // 8:48
        oldAudioLength: 471, // 7:51
        meditation: true,
        activity: 'COMPLETED_MUSCLE_RELAXATION',
        size: 9080631,
        relaxCategory: 'BASICS'
      },
      'COMPLETED_MINDFULNESS': { // TODO Legacy for old activities.
        name: 'COMPLETED_MINDFULNESS',
        id: 8,
        type: 'relax',
        premium: false,
        isSkillActivity: true
      },
      'COMPLETED_UNGUIDED_MEDITATION': {
        name: 'COMPLETED_UNGUIDED_MEDITATION',
        displayKey: 'UNGUIDED_MEDITATION_DISPLAY',
        descriptionDisplayKey: 'RELAX_ACTIVITY_SOUNDSCAPE_MODE_DESCRIPTION',
        id: 10,
        type: 'relax',
        premium: false,
        actionClass: 'unguided-meditation',
        actionTitle: 'COMPLETED_UNGUIDED_MEDITATION',
        isSkillActivity: true,

        exercise: 'Soundscape Mode',
        audio: 'none',
        audioLength: 0,
        meditation: false,
        activity: 'COMPLETED_UNGUIDED_MEDITATION',
        relaxCategory: 'BASICS'
      },
      'COMPLETED_POSITIVE_VISUALIZATION': {
        name: 'COMPLETED_POSITIVE_VISUALIZATION',
        displayKey: 'RELAX_VISUALIZE_HELP_TITLE',
        descriptionDisplayKey: 'RELAX_ACTIVITY_VISUALIZATION_DESCRIPTION',
        id: 7,
        type: 'relax',
        premium: false, 
        actionClass: 'positive-visualization',
        actionTitle: 'COMPLETED_POSITIVE_VISUALIZATION',
        isSkillActivity: true,

        exercise: 'Visualization',
        audio: '',
        audioLength: 0,
        meditation: false,
        activity: 'COMPLETED_POSITIVE_VISUALIZATION',
        relaxCategory: 'BASICS'
      },
      // mindfullness
      'COMPLETED_MINDFUL_SENSES': {
        name: 'COMPLETED_MINDFUL_SENSES',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_SENSES',
        id: 15,
        type: 'relax',
        premium: false,
        actionClass: 'mindful-senses',
        actionTitle: 'COMPLETED_MINDFUL_SENSES',
        isSkillActivity: true,

        exercise: 'Mindful: Senses',
        audio: 'mindfulsenses.mp3',
        audioLength: 292, //'4:52',
        oldAudioLength: 279, //'4:39',
        meditation: true,
        activity: 'COMPLETED_MINDFUL_SENSES',
        size: 4989498,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_MINDFUL_BREATHE': {
        name: 'COMPLETED_MINDFUL_BREATHE',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_BREATHE',
        id: 16,
        type: 'relax',
        premium: false,
        actionClass: 'mindful-breathe',
        actionTitle: 'COMPLETED_MINDFUL_BREATHE',
        isSkillActivity: true,

        exercise: 'Mindful: Breathe',
        audio: 'mindfulbreathe.mp3',
        audioLength: 195, //'3:15',
        oldAudioLength: 177, //'2:57',
        meditation: true,
        activity: 'COMPLETED_MINDFUL_BREATHE',
        size: 3353531,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_MINDFUL_PRESENCE': {
        name: 'COMPLETED_MINDFUL_PRESENCE',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_PRESENCE',
        id: 46,
        type: 'relax',
        premium: false,
        actionClass: 'mindful-presence',
        actionTitle: 'COMPLETED_MINDFUL_PRESENCE',
        isSkillActivity: true,

        exercise: 'Mindful: Presence',
        audio: 'mindfulpresence.mp3',
        audioLength: 518, // 8:38
        oldAudioLength: 487, // 8:07
        meditation: true,
        activity: 'COMPLETED_MINDFUL_PRESENCE',
        size: 8857631,
        relaxCategory: 'MINDFULNESS'
      },      
      'COMPLETED_MINDFUL_OBSERVE': {
        name: 'COMPLETED_MINDFUL_OBSERVE',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_OBSERVE',
        id: 17,
        type: 'relax',
        premium: true,
        actionClass: 'mindful-observe',
        actionTitle: 'COMPLETED_MINDFUL_OBSERVE',
        isSkillActivity: true,

        exercise: 'Mindful: Observe',
        audio: 'mindfulobserve.mp3',
        audioLength: 213, //'3:33',
        oldAudioLength: 197, //'3:17',
        meditation: true,
        activity: 'COMPLETED_MINDFUL_OBSERVE',
        size: 3728678,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_MINDFUL_BODY_SCAN': {
        name: 'COMPLETED_MINDFUL_BODY_SCAN',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_BODY_SCAN',
        id: 18,
        type: 'relax',
        premium: true,
        actionClass: 'mindful-body-scan',
        actionTitle: 'COMPLETED_MINDFUL_BODY_SCAN',
        isSkillActivity: true,

        exercise: 'Mindful: Body Scan',
        audio: 'mindfulbodyscan.mp3',
        audioLength: 224, //'3:44',
        oldAudioLength: 209, //'3:29',
        meditation: true,
        activity: 'COMPLETED_MINDFUL_BODY_SCAN',
        size: 3826108,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_MINDFUL_WALK': {
        name: 'COMPLETED_MINDFUL_WALK',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_WALK',
        id: 19,
        type: 'relax',
        premium: true,
        actionClass: 'mindful-walk',
        actionTitle: 'COMPLETED_MINDFUL_WALK',
        isSkillActivity: true,

        exercise: 'Mindful: Walk',
        audio: 'mindfulwalk.mp3',
        audioLength: 696, // 11:36
        oldAudioLength: 575, // 9:35
        meditation: true,
        activity: 'COMPLETED_MINDFUL_WALK',
        size: 12298261,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_MINDFUL_EMOTIONS': {
        name: 'COMPLETED_MINDFUL_EMOTIONS',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_EMOTIONS',
        id: 48,
        type: 'relax',
        premium: true,
        actionClass: 'mindful-emotions',
        actionTitle: 'COMPLETED_MINDFUL_EMOTIONS',
        isSkillActivity: true,

        exercise: 'Mindful: Emotions',
        audio: 'mindfulemotions.mp3',
        audioLength: 684, // 11:24
        oldAudioLength: 637, // 10:37
        meditation: true,
        activity: 'COMPLETED_MINDFUL_EMOTIONS',
        size: 11813493,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_MINDFUL_THOUGHTS': {
        name: 'COMPLETED_MINDFUL_THOUGHTS',
        displayKey: 'RELAX_ACTIVITY_MINDFUL_THOUGHTS',
        id: 47,
        type: 'relax',
        premium: true,
        actionClass: 'mindful-thoughts',
        actionTitle: 'COMPLETED_MINDFUL_THOUGHTS',
        isSkillActivity: true,

        exercise: 'Mindful: Thoughts',
        audio: 'mindfulthoughts.mp3',
        audioLength: 565, // 9:25
        oldAudioLength: 523, // 8:43
        meditation: true,
        activity: 'COMPLETED_MINDFUL_THOUGHTS',
        size: 9748634,
        relaxCategory: 'MINDFULNESS'
      },
      'COMPLETED_EATING_MINDFULLY': {
        name: 'COMPLETED_EATING_MINDFULLY',
        displayKey: 'RELAX_ACTIVITY_EATING_MINDFULLY',
        id: 55,
        type: 'relax',
        premium: true,
        actionClass: 'eating-mindfully',
        actionTitle: 'COMPLETED_EATING_MINDFULLY',
        isSkillActivity: true,

        exercise: 'Eating Mindfully',
        audio: 'mindfuleating.mp3',
        audioLength: 370, // 6:10
        meditation: true,
        activity: 'COMPLETED_EATING_MINDFULLY',
        size: 5913349,
        relaxCategory: 'MINDFULNESS'
      },
      // stressfull situations
      'COMPLETED_SS_SOCIAL_SITUATIONS': {
        name: 'COMPLETED_SS_SOCIAL_SITUATIONS',
        displayKey: 'RELAX_ACTIVITY_SOCIAL_SITUATIONS',
        id: 11,
        type: 'relax',
        premium: false,
        actionClass: 'social-situations',
        actionTitle: 'COMPLETED_SS_SOCIAL_SITUATIONS',
        isSkillActivity: true,

        exercise: 'Social Situations',
        audio: 'ss-social-situations.mp3',
        audioLength: 523, // 8:43
        oldAudioLength: 445, // 7:25
        meditation: true,
        activity: 'COMPLETED_SS_SOCIAL_SITUATIONS', 
        size: 9284770,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_SCHOOL_STRESS': {
        name: 'COMPLETED_SCHOOL_STRESS',
        displayKey: 'RELAX_ACTIVITY_SCHOOL_STRESS',
        id: 59,
        type: 'relax',
        premium: false,
        actionClass: 'school-stress',
        actionTitle: 'COMPLETED_SCHOOL_STRESS',
        isSkillActivity: true,

        exercise: 'School Stress',
        audio: 'ss-school.mp3',
        audioLength: 473, //7:53
        meditation: true,
        activity: 'COMPLETED_SCHOOL_STRESS',
        size: 8802728,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },      
      'COMPLETED_SS_FLYING': {
        name: 'COMPLETED_SS_FLYING',
        displayKey: 'RELAX_ACTIVITY_FLYING',
        id: 12,
        type: 'relax',
        premium: true,
        actionClass: 'flying',
        actionTitle: 'COMPLETED_SS_FLYING',
        isSkillActivity: true,

        exercise: 'Flying',
        audio: 'ss-flying.mp3',
        audioLength: 395, // 6:35
        oldAudioLength: 478, // 7:58
        meditation: true,
        activity: 'COMPLETED_SS_FLYING',
        size: 7040170,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_SS_PUBLIC_SPEAKING': {
        name: 'COMPLETED_SS_PUBLIC_SPEAKING',
        displayKey: 'RELAX_ACTIVITY_PUBLIC_SPEAKING',
        id: 13,
        type: 'relax',
        premium: true,
        actionClass: 'public-speaking',
        actionTitle: 'COMPLETED_SS_PUBLIC_SPEAKING',
        isSkillActivity: true,

        exercise: 'Public Speaking',
        audio: 'ss-speaking.mp3',
        audioLength: 585, // 9:45
        oldAudioLength: 556, // 9:16
        meditation: true,
        activity: 'COMPLETED_SS_PUBLIC_SPEAKING',
        size: 10431744,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_SS_PUBLIC_TRANSIT': {
        name: 'COMPLETED_SS_PUBLIC_TRANSIT',
        displayKey: 'RELAX_ACTIVITY_PUBLIC_TRANSIT',
        id: 14,
        type: 'relax',
        premium: true,
        actionClass: 'public-transit',
        actionTitle: 'COMPLETED_SS_PUBLIC_TRANSIT',
        isSkillActivity: true,

        exercise: 'Public Transit',
        audio: 'ss-public-transit.mp3',
        audioLength: 531, // 8:51
        oldAudioLength: 435, // 7:15
        meditation: true,
        activity: 'COMPLETED_SS_PUBLIC_TRANSIT',
        size: 9469781,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_DIFFICULT_EXPERIENCE': {
        name: 'COMPLETED_DIFFICULT_EXPERIENCE',
        displayKey: 'RELAX_ACTIVITY_DIFFICULT_EXPERIENCE',
        id: 26,
        type: 'relax',
        premium: true,
        actionClass: 'difficult-experience',
        actionTitle: 'COMPLETED_DIFFICULT_EXPERIENCE',
        isSkillActivity: true,

        exercise: 'Difficult Experience',
        audio: 'difficultexperience.mp3',
        audioLength: 442, //'7:22'
        oldAudioLength: 393, //'6:33'
        meditation: true,
        activity: 'COMPLETED_DIFFICULT_EXPERIENCE',
        size: 7721839,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_PANIC_EMERGENCY': {
        name: 'COMPLETED_PANIC_EMERGENCY',
        displayKey: 'RELAX_ACTIVITY_PANIC_EMERGENCY',
        id: 22,
        type: 'relax',
        premium: true,
        actionClass: 'panic-emergency',
        actionTitle: 'COMPLETED_PANIC_EMERGENCY',
        isSkillActivity: true,

        exercise: 'Panic: Emergency',
        audio: 'panicemergency.mp3',
        audioLength: 288, //'4:48'
        oldAudioLength: 274, //'4:34'
        meditation: true,
        activity: 'COMPLETED_PANIC_EMERGENCY',
        size: 4891750,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_GOING_TO_WORK': {
        name: 'COMPLETED_GOING_TO_WORK',
        displayKey: 'RELAX_ACTIVITY_GOING_TO_WORK',
        id: 58,
        type: 'relax',
        premium: true,
        actionClass: 'going-to-work',
        actionTitle: 'COMPLETED_GOING_TO_WORK',
        isSkillActivity: true,

        exercise: 'Going to Work',
        audio: 'ss-work.mp3',
        audioLength: 404,//6:44
        meditation: true,
        activity: 'COMPLETED_GOING_TO_WORK',
        size: 7504172,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_GOING_TO_DOCTOR':{
        name: 'COMPLETED_GOING_TO_DOCTOR',
        displayKey: 'RELAX_ACTIVITY_GOING_TO_DOCTOR',
        id: 62, 
        type: 'relax',
        premium: true,
        actionClass: 'ss-doctor',
        actionTitle: 'COMPLETED_GOING_TO_DOCTOR',
        isSkillActivity: true,

        exercise: 'Going to Doctor',
        audio: 'ss-doctor.mp3',
        audioLength: 357,//5:57
        meditation: true,
        activity: 'COMPLETED_GOING_TO_DOCTOR',
        size: 8583262,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_FOCUS_FOR_STUDYING': {
        name: 'COMPLETED_FOCUS_FOR_STUDYING',
        displayKey: 'RELAX_ACTIVITY_FOCUS_FOR_STUDYING',
        id: 63,
        type: 'relax',
        premium: true,
        actionClass: 'ss-studying',
        actionTitle: 'COMPLETED_FOCUS_FOR_STUDYING',
        isSkillActivity: true,

        exercise: 'Focus for Studying',
        audio: 'ss-studying.mp3',
        audioLength: 508,//8:28
        meditation: true,
        activity: 'COMPLETED_FOCUS_FOR_STUDYING',
        size: 12196537,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_SS_MORNING_DREAD': {
        name: 'COMPLETED_SS_MORNING_DREAD',
        displayKey: 'RELAX_ACTIVITY_MORNING_DREAD',
        id: 64,
        type: 'relax',
        premium: true,
        actionClass: 'morning-dread',
        actionTitle: 'COMPLETED_SS_MORNING_DREAD',
        isSkillActivity: true,

        exercise: 'Morning Dread',
        audio: 'ss-morning.mp3',
        audioLength: 501, // 8:21
        meditation: true,
        activity: 'COMPLETED_SS_MORNING_DREAD',
        size: 8398792,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },
      'COMPLETED_SS_PROCESSING_GRIEF': {
        name: 'COMPLETED_SS_PROCESSING_GRIEF',
        displayKey: 'RELAX_ACTIVITY_PROCESSING_GRIEF',
        id: 65,
        type: 'relax',
        premium: true,
        actionClass: 'processing-grief',
        actionTitle: 'COMPLETED_SS_PROCESSING_GRIEF',
        isSkillActivity: true,

        exercise: 'Processing Grief',
        audio: 'ss-grief.mp3',
        audioLength: 626, // 10:26
        meditation: true,
        activity: 'COMPLETED_SS_PROCESSING_GRIEF',
        size: 10349006,
        relaxCategory: 'STRESSFUL_SITUATIONS'
      },      
      // calm down
      'COMPLETED_CALM_BREATHE': {
        name: 'COMPLETED_CALM_BREATHE',
        displayKey: 'RELAX_ACTIVITY_CALM_BREATHE',
        id: 20,
        type: 'relax',
        premium: false,
        actionClass: 'calm-breathe',
        actionTitle: 'COMPLETED_CALM_BREATHE',
        isSkillActivity: true,

        exercise: 'Calm: Breathe',
        audio: 'calmbreathe.mp3',
        audioLength: 410, // 6:50
        oldAudioLength: 287, // 4:47
        meditation: true,
        activity: 'COMPLETED_CALM_BREATHE',
        size: 7380822,
        relaxCategory: 'CALM_DOWN'
      },
      'COMPLETED_ANGER': {
        name: 'COMPLETED_ANGER',
        displayKey: 'RELAX_ACTIVITY_DEFUSING_ANGER',
        id: 54,
        type: 'relax',
        premium: true,
        actionClass: 'defusing-anger',
        actionTitle: 'COMPLETED_ANGER',
        isSkillActivity: true,

        exercise: 'Defusing Anger',
        audio: 'anger.mp3',
        audioLength: 349, //'5:49'
        meditation: true,
        activity: 'COMPLETED_ANGER',
        size: 5591938,
        relaxCategory: 'CALM_DOWN'
      },
      'COMPLETED_SLEEP': {
        name: 'COMPLETED_SLEEP',
        displayKey: 'RELAX_ACTIVITY_SLEEP',
        id: 23,
        type: 'relax',
        premium: true,
        actionClass: 'sleep',
        actionTitle: 'COMPLETED_SLEEP',
        isSkillActivity: true,

        exercise: 'Sleep',
        audio: 'sleep.mp3',
        audioLength: 338, //'5:38'
        oldAudioLength: 321, //'5:21'
        meditation: true,
        activity: 'COMPLETED_SLEEP',
        size: 5770785,
        relaxCategory: 'CALM_DOWN'
      },
      'COMPLETED_BEDTIME': {
        name: 'COMPLETED_BEDTIME',
        displayKey: 'RELAX_ACTIVITY_FALLING_ASLEEP',
        id: 53,
        type: 'relax',
        premium: true,
        actionClass: 'bedtime',
        actionTitle: 'COMPLETED_BEDTIME',
        isSkillActivity: true,

        exercise: 'Falling Asleep',
        audio: 'bedtime.mp3',
        audioLength: 474, //'7:54'
        meditation: true,
        activity: 'COMPLETED_BEDTIME',
        size: 8221513,
        relaxCategory: 'CALM_DOWN'
      },
      'COMPLETED_DEFUSION': {
        name: 'COMPLETED_DEFUSION',
        displayKey: 'RELAX_ACTIVITY_DEFUSION',
        id: 28,
        type: 'relax',
        premium: true,
        actionClass: 'intense-emotions',
        actionTitle: 'COMPLETED_DEFUSION',
        isSkillActivity: true,

        exercise: 'Defusion',
        audio: 'intenseemotions.mp3',
        audioLength: 290, //'4:50'
        oldAudioLength: 261, //'4:21'
        meditation: true,
        activity: 'COMPLETED_DEFUSION',
        size: 5180341,
        relaxCategory: 'CALM_DOWN'
      },
      'COMPLETED_PAIN': {
        name: 'COMPLETED_PAIN',
        displayKey: 'RELAX_ACTIVITY_COPING_WITH_PHYSICAL_PAIN',
        id: 50,
        type: 'relax',
        premium: true,
        actionClass: 'pain',
        actionTitle: 'COMPLETED_PAIN',
        isSkillActivity: true,

        exercise: 'Coping with Physical Pain',
        audio: 'pain.mp3',
        audioLength: 743, //'12:23'
        meditation: true,
        activity: 'COMPLETED_PAIN',
        size: 11892673,
        relaxCategory: 'CALM_DOWN'
      },
      // inner strength
      'COMPLETED_BECOMING_THE_TREE': {
        name: 'COMPLETED_BECOMING_THE_TREE',
        displayKey: 'RELAX_ACTIVITY_BECOME_TREE',
        id: 25,
        type: 'relax',
        premium: false,
        actionClass: 'becoming-the-tree',
        actionTitle: 'COMPLETED_BECOMING_THE_TREE',
        isSkillActivity: true,

        exercise: 'Become Tree',
        audio: 'becomingthetree.mp3',
        audioLength: 602, //'10:02'
        oldAudioLength: 483, //'8:03'
        meditation: true,
        activity: 'COMPLETED_BECOMING_THE_TREE',
        size: 10814686,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_INNER_CRITIC': {
        name: 'COMPLETED_INNER_CRITIC',
        displayKey: 'RELAX_ACTIVITY_QUIETING_THE_INNER_CRITIC',
        id: 61,
        type: 'relax',
        premium: false,
        actionClass: 'inner-critic',
        actionTitle: 'COMPLETED_INNER_CRITIC',
        isSkillActivity: true,

        exercise: 'Quieting the Inner Critic',
        audio: 'innercritic.mp3',
        audioLength: 484,//8:04
        meditation: true,
        activity: "COMPLETED_INNER_CRITIC",
        size: 11630469,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_POSITIVITY': {
        name: 'COMPLETED_POSITIVITY',
        displayKey: 'RELAX_ACTIVITY_BUILDING_POSITIVITY',
        id: 51,
        type: 'relax',
        premium: true,
        actionClass: 'building-positivity',
        actionTitle: 'COMPLETED_POSITIVITY',
        isSkillActivity: true,

        exercise: 'Building Positivity',
        audio: 'positivity.mp3',
        audioLength: 472, //'7:52'
        meditation: true,
        activity: 'COMPLETED_POSITIVITY',
        size: 7552167,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_EMPATHY': {
        name: 'COMPLETED_EMPATHY',
        displayKey: 'RELAX_ACTIVITY_EMPATHY',
        id: 31,
        type: 'relax',
        premium: true,
        actionClass: 'empathy',
        actionTitle: 'COMPLETED_EMPATHY',
        isSkillActivity: true,

        exercise: 'Empathy',
        audio: 'empathy.mp3',
        audioLength: 422, //'7:02'
        oldAudioLength: 358, //'5:58'
        meditation: true,
        activity: 'COMPLETED_EMPATHY',
        size: 7219650,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_SELF_COMPASSION': {
        name: 'COMPLETED_SELF_COMPASSION',
        displayKey: 'RELAX_ACTIVITY_SELF_COMPASSION',
        id: 27,
        type: 'relax',
        premium: true,
        actionClass: 'self-compassion',
        actionTitle: 'COMPLETED_SELF_COMPASSION',
        isSkillActivity: true,

        exercise: 'Self Compassion',
        audio: 'selfcompassion.mp3',
        audioLength: 387, //'6:27'
        oldAudioLength: 340, //'5:40'
        meditation: true,
        activity: 'COMPLETED_SELF_COMPASSION',
        size: 6724898,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_MOTIVATION': {
        name: 'COMPLETED_MOTIVATION',
        displayKey: 'RELAX_ACTIVITY_GETTING_MOTIVATED',
        id: 52,
        type: 'relax',
        premium: true,
        actionClass: 'getting-motivated',
        actionTitle: 'COMPLETED_MOTIVATION',
        isSkillActivity: true,

        exercise: 'Getting Motivated',
        audio: 'motivation.mp3',
        audioLength: 443, //'7:23'
        meditation: true,
        activity: 'COMPLETED_MOTIVATION',
        size: 7921662,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_GRATITUDE': {
        name: 'COMPLETED_GRATITUDE',
        displayKey: 'RELAX_ACTIVITY_GRATITUDE',
        id: 24,
        type: 'relax',
        premium: true,
        actionClass: 'gratitude',
        actionTitle: 'COMPLETED_GRATITUDE',
        isSkillActivity: true,

        exercise: 'Gratitude',
        audio: 'gratitude.mp3',
        audioLength: 331, //'5:31'
        oldAudioLength: 306, //'5:06'
        meditation: true,
        activity: 'COMPLETED_GRATITUDE',
        size: 5691064,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_START_YOUR_DAY': {
        name: 'COMPLETED_START_YOUR_DAY',
        displayKey: 'RELAX_ACTIVITY_START_YOUR_DAY',
        id: 57,
        type: 'relax',
        premium: true,
        actionClass: 'start-your-day',
        actionTitle: 'COMPLETED_START_YOUR_DAY',
        isSkillActivity: true,

        exercise: 'Start Your Day',
        audio: 'morning.mp3',
        audioLength: 324, //5:24
        meditation: true,
        activity: 'COMPLETED_START_YOUR_DAY',
        size: 5754891,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_IGNORING_JUDGEMENT': {
        name: 'COMPLETED_IGNORING_JUDGEMENT',
        displayKey: 'RELAX_ACTIVITY_IGNORING_JUDGEMENT',
        id: 56,
        type: 'relax',
        premium: true,
        actionClass: 'ignoring-judgement',
        actionTitle: 'COMPLETED_IGNORING_JUDGEMENT',
        isSkillActivity: true,

        exercise: 'Ignoring Judgement',
        audio: 'focus.mp3',
        audioLength: 520,// 8:40
        meditation: true,
        activity: 'COMPLETED_IGNORING_JUDGEMENT',
        size: 9499948,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_CULTIVATING_RESILIENCE': {
        name: 'COMPLETED_CULTIVATING_RESILIENCE',
        displayKey: 'RELAX_ACTIVITY_CULTIVATING_RESILIENCE',
        id: 60,
        type: 'relax',
        premium: true,
        actionClass: 'cultivating-resilience',
        actionTitle: 'COMPLETED_CULTIVATING_RESILIENCE',
        isSkillActivity: true,

        exercise: 'Cultivating Resilience',
        audio: 'resilience.mp3',
        audioLength: 530, //8:50
        meditation: true,
        activity: 'COMPLETED_CULTIVATING_RESILIENCE',
        size: 12737234,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_FINDING_PEACE': {
        name: 'COMPLETED_FINDING_PEACE',
        displayKey: 'RELAX_ACTIVITY_FINDING_PEACE',
        id: 66,
        type: 'relax',
        premium: true,
        actionClass: 'inner-critic',
        actionTitle: 'COMPLETED_FINDING_PEACE',
        isSkillActivity: true,

        exercise: 'Finding Peace',
        audio: 'peace.mp3',
        audioLength: 608,//10:08
        meditation: true,
        activity: "COMPLETED_FINDING_PEACE",
        size: 10399518,
        relaxCategory: 'INNER_STRENGTH'
      },
      'COMPLETED_RELEASING_STRESS': {
        name: 'COMPLETED_RELEASING_STRESS',
        displayKey: 'RELAX_ACTIVITY_RELEASING_STRESS',
        id: 67,
        type: 'relax',
        premium: true,
        actionClass: 'inner-critic',
        actionTitle: 'COMPLETED_RELEASING_STRESS',
        isSkillActivity: true,

        exercise: 'Releasing Stress',
        audio: 'releasingstress.mp3',
        audioLength: 520,//8:40
        meditation: true,
        activity: "COMPLETED_RELEASING_STRESS",
        size: 8690551,
        relaxCategory: 'INNER_STRENGTH'
      },

      'COMPLETED_CALM_MIND': {
        name: 'COMPLETED_CALM_MIND',
        displayKey: 'RELAX_ACTIVITY_CALM_MIND',
        id: 21,
        type: 'relax',
        premium: true,
        actionClass: 'calm-mind',
        actionTitle: 'COMPLETED_CALM_MIND',
        isSkillActivity: true,

        exercise: 'Calm: Mind',
        audio: 'calmmind.mp3',
        audioLength: 522, // 8:42
        oldAudioLength: 267, // 4:27
        meditation: true,
        activity: 'COMPLETED_CALM_MIND',
        size: 8355903,
        relaxCategory: 'MINDFULNESS'
      },
      'POSTED_TO_COMMUNITY': {
        name: 'POSTED_TO_COMMUNITY',
        displayKey: 'COMPLETE_A_POSITIVE_THOUGHT_ENTRY',
        id: 30,
        type: 'social',
        premium: false,
        actionClass: 'social',
        actionTitle: 'POSTED_TO_COMMUNITY',
        isSkillActivity: true
      },
      'SHARED_REPORT_WITH_SELF': {
        name: 'SHARED_REPORT',
        displayKey: 'SHARED_REPORT',
        id: 34,
        type: 'account',
        premium: false
      },
      'SHARED_REPORT_WITH_OTHER': {
        name: 'SHARED_REPORT',
        displayKey: 'SHARED_REPORT',
        id: 35,
        type: 'account',
        premium: false
      },
      'ADD_PICTURE_TO_HOPE_FEED': {
        name: 'ADD_PICTURE_TO_HOPE_FEED',
        displayKey: 'ADD_PICTURE_TO_HOPE_BOARD',
        id: 36,
        type: 'account',
        premium: false,
        actionClass: "picture", // Do these need the actionTitle?
        isSkillActivity: true
      },
      'ADD_THOUGHT_TO_HOPE_FEED': {
        name: 'ADD_THOUGHT_TO_HOPE_FEED',
        displayKey: 'ADD_THOUGHT',
        id: 37,
        type: 'account',
        premium: false,
        actionClass: "thought",
        isSkillActivity: true
      },
      'ADD_GOAL_TO_HOPE_FEED': {
        name: 'ADD_GOAL_TO_HOPE_FEED',
        displayKey: 'ADD_GOAL',
        id: 38,
        type: 'account',
        premium: false,
        actionClass: "goal",
        isSkillActivity: true
      },
      'ADD_POST_TO_HOPE_FEED': {
        name: 'ADD_POST_TO_HOPE_FEED',
        displayKey: 'ADD_POST',
        id: 68,
        type: 'account',
        premium: false,
        actionClass: "picture",
        isSkillActivity: true        
      },
      'CREATED_EXPERIMENT': {
        name: 'CREATED_EXPERIMENT',
        displayKey: 'CREATED_EXPERIMENT',
        id: 39,
        type: 'goals',
        premium: false,
        actionClass: "goal"
      },
      'COMPLETED_ABC_PLUS_THOUGHT_RECORD': {
        name : 'COMPLETED_ABC_PLUS_THOUGHT_RECORD',
        id: 45,
        type: 'thoughts',
        premium: false,
        actionClass: 'basic',
        actionTitle: 'COMPLETED_ABC_PLUS_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_BASIC',
        isSkillActivity: true
      },
      'SHARED_PACIFICA_WITH_PRACITTIONER': {
        name: 'SHARED_PACIFICA_WITH_PRACITTIONER',
        displayKey: 'SHARED_PACIFICA',
        id: 49,
        type: 'account',
        premium: false
      },
    },

    thoughtActivities: {
      basic: {
        activityId: 40, // The activity ID corresponding to the database value.
        activityName: 'COMPLETED_ABC_THOUGHT_RECORD', // The activity name corresponding to the database value.
        thoughtType: 'BASIC', // The thought type, which mirrors the thought type on the server.
        description: 'THOUGHTS_ACTIVITY_BASIC_DESC', // Key for the description of the activity, shown in the intro screen.
        completionTitle: 'THOUGHTS_ACTIVITY_BASIC_SUMMARY', // Key for the title of the completion screen for hte activity
        completionText: 'THOUGHTS_ACTIVITY_BASIC_COMPLETED', // Key for the completion text
        completionRoute: 'app.thought-completed',
        recordingOrder: ['event', 'thoughts', 'feelings'], // This is used for the completion screen.
        premium: false,

        name: 'COMPLETED_ABC_THOUGHT_RECORD',
        displayKey: 'COMPLETE_A_BASIC_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_ACTIVITY_BASIC_DESC',
        id: 40,
        type: 'thoughts',
        actionClass: 'basic',
        actionTitle: 'COMPLETED_ABC_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_BASIC',
        isSkillActivity: true,

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
        description: 'THOUGHTS_ACTIVITY_TRAPS_DESC',
        completionTitle: 'THOUGHTS_ACTIVITY_TRAPS_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_TRAPS_COMPLETED',
        completionRoute: 'app.traps-completed',
        recordingOrder: ['thought', 'pattern'],
        premium: false,

        name : 'COMPLETED_TRAPS_THOUGHT_RECORD',
        displayKey: 'COMPLETE_A_TRAPS_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_ACTIVITY_TRAPS_DESC',
        id: 41,
        type: 'thoughts',
        actionClass: 'traps',
        actionTitle: 'COMPLETED_TRAPS_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_TRAPS',
        isSkillActivity: true,

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
        description: 'THOUGHTS_ACTIVITY_REFRAME_DESC',
        completionTitle: 'THOUGHTS_ACTIVITY_REFRAME_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_REFRAME_COMPLETED',
        completionRoute: 'app.reframe-completed',
        recordingOrder: ['thought', 'analysis'],
        premium: false,

        name: 'COMPLETED_RETHINK',
        displayKey: 'COMPLETE_A_REFRAME_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_ACTIVITY_REFRAME_DESC',
        id: 4,
        type: 'thoughts',
        actionClass: 'reframe',
        actionTitle: 'COMPLETED_REFRAME_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_REFRAME',
        isSkillActivity: true,

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
        description: 'THOUGHTS_POSITIVITY_DESCRIPTION',
        completionTitle: 'THOUGHTS_ACTIVITY_POSITIVITY_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_POSITIVITY_COMPLETED',
        completionRoute: 'app.thought-completed',
        recordingOrder: ['journal'],
        premium: true,

        name: 'COMPLETED_POSITIVITY_JOURNAL',
        displayKey: 'COMPLETE_A_POSITIVE_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_POSITIVITY_DESCRIPTION',
        id: 33,
        type: 'thoughts',
        actionClass: 'positivity',
        actionTitle: 'COMPLETED_POSITIVITY_JOURNAL',
        activityDisplay: 'THOUGHTS_ACTIVITY_POSITIVITY',
        isSkillActivity: true,

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
        description: 'THOUGHTS_GRATITUDE_DESCRIPTION',
        completionTitle: 'THOUGHTS_ACTIVITY_GRATITUDE_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_GRATITUDE_COMPLETED',
        completionRoute: 'app.thought-completed',
        recordingOrder: ['journal'],
        premium: true,

        name: 'COMPLETED_GRATITUDE_JOURNAL',
        displayKey: 'COMPLETE_A_GRATITUDE_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_GRATITUDE_DESCRIPTION',
        id: 32,
        type: 'thoughts',
        actionClass: 'gratitude-journal',
        actionTitle: 'COMPLETED_GRATITUDE_JOURNAL',
        activityDisplay: 'THOUGHTS_ACTIVITY_GRATITUDE',
        isSkillActivity: true,

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
        description: 'THOUGHTS_JOURNAL_HEADER',
        completionTitle: 'THOUGHTS_ACTIVITY_JOURNAL_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_JOURNAL_COMPLETED',
        completionRoute: 'app.thought-completed',
        recordingOrder: ['journal'],
        premium: false,

        name: 'COMPLETED_JOURNAL',
        displayKey: 'COMPLETE_A_JOURNAL_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_JOURNAL_HEADER',
        id: 9,
        type: 'thoughts',
        actionClass: 'journal',
        actionTitle: 'COMPLETED_JOURNAL',
        activityDisplay: 'THOUGHTS_ACTIVITY_JOURNAL',
        isSkillActivity: true,

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
        description: 'THOUGHTS_ACTIVITY_BLAME_DESC',
        completionTitle: 'THOUGHTS_ACTIVITY_BLAME_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_BLAME_COMPLETED',
        completionRoute: 'app.contributingfactorscomplete',
        recordingOrder: ['event'],
        premium: true,

        name : 'COMPLETED_BLAME_THOUGHT_RECORD',
        displayKey: 'COMPLETED_A_BLAME_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_ACTIVITY_BLAME_DESC',
        id: 42,
        type: 'thoughts',
        actionClass: 'blame',
        actionTitle: 'COMPLETED_BLAME_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_BLAME',
        isSkillActivity: true,

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
        description: 'THE_THOUGHT_EVIDENCE_DESCRIPTION',
        completionTitle: 'THOUGHTS_ACTIVITY_EVIDENCE_SUMMARY',
        completionText: 'THOUGHTS_ACTIVITY_EVIDENCE_COMPLETED',
        completionRoute: 'app.evidence-completed',
        recordingOrder: ['thought'],
        premium: true,

        name : 'COMPLETED_EVIDENCE_THOUGHT_RECORD',
        displayKey: 'COMPLETE_AN_EVIDENCE_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_ACTIVITY_EVIDENCE_DESC',
        id: 43,
        type: 'thoughts',
        actionClass: 'evidence',
        actionTitle: 'COMPLETED_EVIDENCE_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_EVIDENCE',
        isSkillActivity: true,

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
        description: 'THOUGHTS_ACTIVITY_BELIEFS_DESC',
        completionTitle: 'THOUGHTS_ACTIVITY_BELIEFS_SUMMARY',
        completionText: 'TTHOUGHTS_ACTIVITY_BELIEFS_COMPLETED',
        completionRoute: 'app.beliefs-completed',
        recordingOrder: ['thought', 'evidence'],
        premium: true,

        name : 'COMPLETED_BELIEFS_THOUGHT_RECORD',
        displayKey: 'COMPLETED_A_BELIEFS_THOUGHT_ENTRY',
        descriptionDisplayKey: 'THOUGHTS_ACTIVITY_BELIEFS_DESC',
        id: 44,
        type: 'thoughts',
        actionClass: 'beliefs',
        actionTitle: 'COMPLETED_BELIEFS_THOUGHT_RECORD',
        activityDisplay: 'THOUGHTS_ACTIVITY_BELIEFS',
        isSkillActivity: true,

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
    }

  };


  function initializeThoughtActivities() {
    _.each(activityService.thoughtActivities, function(activity, key) {
      activityService.activities[activity.name] = activity;
      activityService.activitiesById[activity.id] = activity;
    });
  }

  function initializeActivityService() {

    initializeThoughtActivities();

    for (var activityKey in activityService.activities) {
      var activity = activityService.activities[activityKey];
      activityService.activitiesById[activity.id] = activity;
    }
  }

  function resetStreak(val) {
    AccountService.setUserPreference('engagement_streak_count', val + '');
    if (val === 1)  // if we are resetting to 1, the user has broke the streak, but just completed an activity.
      AccountService.setUserPreference('last_completed_engagement_date', GeneralService.getTodayString());
  }

  function getStartAndEndQuery(start, end) {
    var query = '';
    if (start)
      query += '?startTime=' + start.getTime();

    if (end) {

      if (query.length > 0)
        query += '&';
      else
        query += '?';

      query += 'endTime=' + end.getTime();
    }

    return query;
  }

  function postOfflineActivities() {

    function postOfflineActivitiesInternal() {
      authHttp.post(Environment.serverURL + '/account/offline', {
          activities: activityService.offlineActivities
        })
        .success(function() {
          activityService.offlineActivities.length = 0;
          StorageService.removeItem('offlineActivities');
        });
    }

    var shouldPostOfflineActivities = activityService.offlineActivities.length > 0 &&
                                      Environment.isOnline() &&
                                      AccountService.isLoggedIn();

    if (shouldPostOfflineActivities) {

      StorageService.onceInitialized(function() {
        AccountService.onceUserContextInitialized(function() {
          postOfflineActivitiesInternal();
        });
      });
    }

  }

  activityService.initFromLocalStorage = function() {
    return $q.all([
      StorageService.getItemAsync('offlineActivities')
        .then(function(localActivities) {
          if (localActivities) {
            var activityList = JSON.parse(localActivities);
            activityService.offlineActivities = activityList;
          }
        }),
      StorageService.getItemAsync("activityContext")
        .then(function(localContext) {
          if (localContext) {
            var storedActivityContext = JSON.parse(localContext);
            activityService.activityContext = storedActivityContext;
          }
        })
    ]);
  };

  activityService.updateLocalCompletedActivities = function updateLocalCompletedActivities() {

    var completedActivities = AccountService.userPreferences.completed_activities;
    if (completedActivities && completedActivities.length > 0) {

      var allActivities = completedActivities.split(',');
      for (var i=0; i<allActivities.length; ++i) {

        var activityId = +allActivities[i];
        if (activityId > 0) // prevent NaN for whatever reason
          activityService.completedActivities.push(activityId);
      }
    }
  };

  activityService.getRatedActivities = function getRatedActivities() {
    return authHttp.get(Environment.serverURL + '/activity/feedback');
  };

  activityService.getRateableActivity = function getRateableActivity(thoughtsService, skillsService) {

      var ratedActivities;
      var def = $q.defer();

      function getRatedActivities() {
        var deferred = $q.defer();
        if (activityService.ratedActivities) {  // try to get cached rated activities
            $timeout(function() { deferred.resolve(activityService.ratedActivities); });
        } else {  // fetch from network
          activityService.getRatedActivities()
            .success(function(activities) {
              activityService.setRatedActivities(activities);
              deferred.resolve(activities);
            });
        }
        return deferred.promise;
      }

      function canCollectActionFeedback(action, ratedActivities) {
        if (action.actionClass === 'health')
          return ratedActivities.habitIds.length === 0 || !_.includes(ratedActivities.habitIds, action.data.habitId);
        if(ratedActivities.activityIds.length === 0) // haven't rated anything yet
          return true;
        if (action.actionClass === 'goals')
          return !_.includes(ratedActivities.activityIds, 5);
        var activity = thoughtsService.getActivityByName(action.actionClass);
        if(activity)
          return !_.includes(ratedActivities.activityIds, activity.activityId);
        return !_.includes(ratedActivities.activityIds, action.data.activityId);
      }

      getRatedActivities().then(function(activities) {
        var ratedActivities = activities;
        var todaysActions = skillsService.getTodaysActions();
        var todaysRecentActions = _.filter(todaysActions, function(action) {  // recent = within the last 2 hours
          var isRecent = moment().diff(moment(action.actionTimestamp), 'hours') <= 2;
          var invalidTypes = ["social", "mood"];
          var isValidActionType = !_.includes(invalidTypes, action.actionClass);
          return isRecent && isValidActionType;
        });

        var rateableActivity = _.find(todaysRecentActions, function(activity){
          return canCollectActionFeedback(activity, ratedActivities);
        });
        def.resolve(rateableActivity);

      });

      return def.promise;
  };

  activityService.addUserTool = function(activityId, isHabit){
    var tool;
    var tools = [];
    var pref = AccountService.getUserPreference('tools');
    if(pref)
        tools = pref.split(',');

    if(isHabit){
        tool = 'habits';
    } else {    
        var isHopePost = activityService.isHopePost(activityId);
        if(isHopePost){
            tool = 'hope';
        } else {
            var activity = activityService.getActivityById(activityId);
            // relax, goals, thoughts
            if(activity && activity.type)
                tool = activity.type;
        }
    }
        
    if(tool !== undefined  & tools.indexOf(tool) == -1){
        tools.push(tool);
        AccountService.setUserPreference('tools', tools.toString());
    }

  };

  activityService.recordActivity = function recordActivity(activity) {
    // Record the activity locally so that it will update the views.
    var list = activityService.activityContext[activity];
    if (!list) {
      list = [];
      activityService.activityContext[activity] = list;
    }

    var activityId = activityService.getIdForActivity(activity);
    list.push({
      recordedAt: new Date(),
      recordedAtString: new Date().toString(),
      activityId: activityId
    });

    activityService.setActivityStreak();

    if (AccountService.canUseSiriNotifications()) {
      var activityData = activityService.getActivityById(activityId);
      if (activityData) {
        switch (activityData.type) {

          case "relax":
            window.cordova.plugins.SiriShortcuts.donate({persistentIdentifier: 'pacifica-meditate',
                                                         title: $translate.instant('SIRI_MEDITATE_SHORTCUT_TITLE'),
                                                         suggestedInvocationPhrase: $translate.instant('SIRI_MEDITATE_SHORTCUT_PHRASE'),
                                                         isEligibleForSearch: true,
                                                         isEligibleForPrediction: true });
            console.log('donated meditation to Siri');
            break;
          case "thoughts":
            window.cordova.plugins.SiriShortcuts.donate({persistentIdentifier: 'pacifica-thought',
                                                         title: $translate.instant('SIRI_THOUGHT_SHORTCUT_TITLE'),
                                                         suggestedInvocationPhrase: $translate.instant('SIRI_THOUGHT_SHORTCUT_PHRASE'),
                                                         isEligibleForSearch: true,
                                                         isEligibleForPrediction: true });
            console.log('donated thought to Siri');
            break;
          case "goals":
            window.cordova.plugins.SiriShortcuts.donate({persistentIdentifier: 'pacifica-goal',
                                                         title: $translate.instant('SIRI_GOAL_SHORTCUT_TITLE'),
                                                         suggestedInvocationPhrase: $translate.instant('SIRI_GOAL_SHORTCUT_PHRASE'),
                                                         isEligibleForSearch: true,
                                                         isEligibleForPrediction: true });
            console.log('donated goal to Siri');
            break;
          case "account":
            if (activityData.name === "ADD_PICTURE_TO_HOPE_FEED") {
              window.cordova.plugins.SiriShortcuts.donate({persistentIdentifier: 'pacifica-hope',
                                                           title: $translate.instant('SIRI_HOPE_SHORTCUT_TITLE'),
                                                           suggestedInvocationPhrase: $translate.instant('SIRI_HOPE_SHORTCUT_PHRASE'),
                                                           isEligibleForSearch: true,
                                                           isEligibleForPrediction: true });
              console.log('donated hope to Siri');
              break;
            }
        }
      }
    }

    // Make sure we have a record of the activity in local storage.
    activityService.updateLocalActivityContext();
    activityService.addUserTool(activityId);
    if (Environment.isOnline())
      authHttp.post(Environment.serverURL + '/account/activity', activity)
        .success(function(data){
            $rootScope.$broadcast('request:checkPathProgressActivity', activity, data.id);
          activityService.fireActivityCompletion(activityId);
        });
    else {
      activityService.offlineActivities.push({activity: activity, timestamp: new Date() });

      activityService.updateLocalActivities();
    }

    if (activityId) {

      activityService.updateCompletedActivities(activityId);
    }


    // Now we need to check to see if the activity ID is associated with
    // the next activity in a path.

    // Hack, DR: use broadcast to avoid circular dependency with PathService.

    // we want to show helpful/not helpful modal right away, but we need to record the completion with the
    // activity id after the account/activity request returns
    $rootScope.$broadcast('request:checkPathProgressActivity', activity, null, null, true);
  };

  activityService.getActivityById = function getActivityById(activityId) {
    return activityService.activitiesById[activityId];
  };

  activityService.getCategoryForActivity = function getCategoryForActivity(activityObj) {

    var activity = activityService.activities[activityObj];
    if (activity)
      return activity.type;
  };

  activityService.getIdForActivity = function getIdForActivity(activityObj) {

    var activity = activityService.activities[activityObj];
    if (activity)
      return activity.id;
  };

  activityService.getDisplayForActivity = function getDisplayForActivity(activityObj) {

    var activity = activityService.activities[activityObj];
    if (activity) {
      var display = activity.displayKey;

      if (display)
        return $translate.instant(display);
    }
  };

  activityService.isActivityPremium = function isActivityPremium(activityObj) {

    var activity = activityService.activities[activityObj];
    if (activity)
      return activity.premium;

    return false;
  };

  activityService.updateLocalActivityContext = function updateLocalActivityContext() {

    StorageService.setItem("activityContext", JSON.stringify(activityService.activityContext));
  };

  activityService.logout = function logout() {

    activityService.activityContext = {};
    activityService.offlineActivities = [];
    activityService.completedActivities = [];
    activityService.updateLocalActivityContext();
    activityService.updateLocalActivities();
  };

  activityService.hasCompletedActivity = function hasCompletedActivity(activityId) {

    for (var i=0; i<activityService.completedActivities.length; ++i) {

      if (activityService.completedActivities[i] == activityId)
        return true;
    }

    return false;
  };

  activityService.updateCompletedActivities = function updateCompletedActivities(activityId) {

    if (!activityService.hasCompletedActivity(activityId)) {

      activityService.completedActivities.push(activityId);

      var activityIdStr = activityService.completedActivities.join(',');
      AccountService.setUserPreference('completed_activities', activityIdStr);
    }
  };

  activityService.checkForBrokenStreak = function checkForBrokenStreak() {

    var lastCompletedActivityDate = AccountService.getUserPreference('last_completed_engagement_date');
    lastCompletedActivityDate = moment(lastCompletedActivityDate).startOf('day');    
    var today = moment().startOf('day');

    var daysSinceLastCompletion = today.diff(lastCompletedActivityDate, 'day');
    var didBreakStreak = daysSinceLastCompletion > 1;
    var streakCount = parseInt(AccountService.getUserPreference('engagement_streak_count'));

    if (didBreakStreak && streakCount !== 0) {
      resetStreak(0);
    }
  };


  activityService.setActivityStreak = function setActivityStreak() {

    var lastCompletedActivityDate = AccountService.getUserPreference('last_completed_engagement_date');
    var hasNoStreak = !lastCompletedActivityDate;

    if(hasNoStreak){
      resetStreak(1);
      return;
    }

    // we should not need to call `startOf` since we only store a basic date string '2017-09-22', but that wasn't always the case
    // in dev, so keeping this around for testing, but we can remove it whenever we deploy
    lastCompletedActivityDate = moment(lastCompletedActivityDate).startOf('day');
    
    var today = moment().startOf('day');
    var daysSinceLastCompletion = today.diff(lastCompletedActivityDate, 'day');

    var isContinuingStreak = daysSinceLastCompletion == 1;
    var didBreakStreak = daysSinceLastCompletion > 1;

    // This should only get called after an activity was completed, so we can set the last engagement to today.
    AccountService.setUserPreference('last_completed_engagement_date', GeneralService.getTodayString());

    if(didBreakStreak){
      resetStreak(1);
    } else if (isContinuingStreak) {
      var currentStreak = AccountService.getUserPreference('engagement_streak_count');
      AccountService.setUserPreference('engagement_streak_count', parseInt(currentStreak) + 1);
    }

  };

  activityService.fireActivityCompletion = function fireActivityCompletion(activityId, isHabit){
    activityService.addUserTool(activityId, isHabit);
    // using events to get around circular imports, don't love this LW
    $rootScope.$broadcast('event:activityCompleted');
  };

  activityService.setActivityContext = function setActivityContext(ctx) {

    // The dailyActiviies are a map of activity_name to a list of activities for it.
    activityService.activityContext = ctx.dailyActivities;

    activityService.updateLocalActivityContext();
  };

  activityService.getActivities = function getActivities(activity) {

    return activityService.activityContext[activity];
  };

  activityService.getActivityContextV2 = function getActivityContextV2(start, end) {

    var query = getStartAndEndQuery(start, end);

    return authHttp.get(Environment.serverURL + '/activity/contextV2' + query);
  };

  activityService.getActivityHistory = function getActivityHistory(start, end) {

    var query = '';
    if (start)
      query += '?startTime=' + start.getTime();

    if (end) {

      if (query.length > 0)
        query += '&';
      else
        query += '?';

      query += 'endTime=' + end.getTime();
    }

    return authHttp.get(Environment.serverURL + '/activity/history' + query);
  };

  activityService.saveActivityFeedBack = function saveActivityFeedBack(feedback) {
    return authHttp.post(Environment.serverURL + '/activity/feedback', feedback);
  };

  activityService.refreshLocalActivities = function() {
    activityService.completedActivities = [];
    activityService.updateLocalCompletedActivities();
  };

  activityService.setRatedActivities = function setRatedActivities(activities) {
    activityService.ratedActivities = activities;
  };

  activityService.updateLocalActivities = function updateLocalActivities() {

    StorageService.setItem("offlineActivities", JSON.stringify(activityService.offlineActivities));
  };

  activityService.isHopePost = function isHopePost(id){
    return _.includes([36, 37, 38, 68], id);
  };

  activityService.getSuggestionsByMood = function getSuggestionsByMood(moodLevel, randomIds, randomIndex){

    if (moodLevel == 'awful') {
      return {
        'relax': [{
          id: 'COMPLETED_MOTIVATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_1', 'RELAX_FACT_2']
        }, {
          id: 'COMPLETED_MINDFUL_BREATHE', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_ANGER',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_5','RELAX_FACT_6']
        }, {
          id: 'COMPLETED_PANIC_EMERGENCY',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_7','RELAX_FACT_8']
        }, {
          id: 'COMPLETED_CALM_BREATHE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_5', 'RELAX_FACT_6']
        }, {
          id: 'COMPLETED_MINDFUL_SENSES',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_GO_FOR_A_WALK',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_1', 'HABITS_FACT_2']
        }, {
          display: 'SUGGESTED_ACTIVITY_FRIENDS',
          sort: randomIds[randomIndex++],
          id: 10,
          factoids: ['HABITS_FACT_3', 'HABITS_FACT_4']
        }, {
          display: 'SUGGESTED_ACTIVITY_FAMILY',
          sort: randomIds[randomIndex++],
          id: 9,
          factoids: ['HABITS_FACT_5', 'HABITS_FACT_6']
        }, {
          display: 'SUGGESTED_ACTIVITY_MUSIC',
          sort: randomIds[randomIndex++],
          id: 13,
          factoids: ['HABITS_FACT_7', 'HABITS_FACT_8']
        }],
        'thoughts': [{
          id: 'COMPLETED_RETHINK',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_1', 'THOUGHTS_FACT_2']
        }, {
          id: 'COMPLETED_EVIDENCE_THOUGHT_RECORD', /* works */
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_3', 'THOUGHTS_FACT_4']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_NON_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_1', 'GOALS_FACT_2']
        }, {
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_3', 'GOALS_FACT_4']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_5', 'GOALS_FACT_6']
        }],
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_11', 'HOPE_FACT_12', 'HOPE_FACT_13', 'HOPE_FACT_14', 'HOPE_FACT_15', 'HOPE_FACT_16']
        }]
      };

    } else if (moodLevel == 'bad') {

      return {
        'relax': [{
          id: 'COMPLETED_MINDFUL_THOUGHTS',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_DEFUSION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_5', 'RELAX_FACT_6']
        }, {
          id: 'COMPLETED_BECOMING_THE_TREE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_9', 'RELAX_FACT_10']
        }, {
          id: 'COMPLETED_MINDFUL_BREATHE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_SELF_COMPASSION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_11', 'RELAX_FACT_12']
        }, {
          id: 'COMPLETED_MUSCLE_RELAXATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_13', 'RELAX_FACT_14']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_OUTDOORS',
          sort: randomIds[randomIndex++],
          id: 8,
          factoids: ['HABITS_FACT_9', 'HABITS_FACT_10']
        }, {
          display: 'SUGGESTED_ACTIVITY_GET_SOME_EXERCISE',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_11', 'HABITS_FACT_12']
        }, {
          display: 'SUGGESTED_ACTIVITY_HOBBY',
          sort: randomIds[randomIndex++],
          id: 13,
          factoids: ['HABITS_FACT_13', 'HABITS_FACT_14']
        }],
        'thoughts': [{
          id: 'COMPLETED_RETHINK',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_1', 'THOUGHTS_FACT_2']
        }, {
          id: 'COMPLETED_BLAME_THOUGHT_RECORD', /* not working */
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_5', 'THOUGHTS_FACT_6']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_7', 'GOALS_FACT_8']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_5', 'GOALS_FACT_6']
        }, {
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_3', 'GOALS_FACT_4']
        }], 
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_11', 'HOPE_FACT_12', 'HOPE_FACT_13', 'HOPE_FACT_14', 'HOPE_FACT_15', 'HOPE_FACT_16']
        }]
      };

    } else if (moodLevel == 'notgood') {

      return {
        'relax': [{
          id: 'COMPLETED_CALM_BREATHE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_5', 'RELAX_FACT_6']
        }, {
          id: 'COMPLETED_DIFFICULT_EXPERIENCE', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_7', 'RELAX_FACT_8']
        }, {
          id: 'COMPLETED_SELF_COMPASSION', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_11', 'RELAX_FACT_12']
        }, {
          id: 'COMPLETED_CULTIVATING_RESILIENCE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_15', 'RELAX_FACT_16']
        }, {
          id: 'COMPLETED_GRATITUDE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_17', 'RELAX_FACT_18']
        }, {
          id: 'COMPLETED_BREATHING', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_19', 'RELAX_FACT_20']
        }, {
          id: 'COMPLETED_MINDFUL_THOUGHTS', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_SLEEP', 
          sort: randomIds[randomIndex++],
          id: 2,
          factoids: ['HABITS_FACT_15', 'HABITS_FACT_16']
        }, {
          display: 'SUGGESTED_ACTIVITY_HOBBY', 
          sort: randomIds[randomIndex++],
          id: 13,
          factoids: ['HABITS_FACT_13', 'HABITS_FACT_14']
        }, {
          display: 'SUGGESTED_ACTIVITY_EAT', 
          sort: randomIds[randomIndex++],
          id: 4,
          factoids: ['HABITS_FACT_17', 'HABITS_FACT_18']
        }],
        'thoughts': [{
          id: 'COMPLETED_ABC_THOUGHT_RECORD',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_7', 'THOUGHTS_FACT_8']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_7', 'GOALS_FACT_8']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_5', 'GOALS_FACT_6']
        }, {
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_3', 'GOALS_FACT_4']
        }],
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_11', 'HOPE_FACT_12', 'HOPE_FACT_13', 'HOPE_FACT_14', 'HOPE_FACT_15', 'HOPE_FACT_16']
        }]
      };

    } else if (moodLevel == 'okay') {

      return {
        'relax': [{
          id: 'COMPLETED_MINDFUL_PRESENCE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_CALM_MIND',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_EMPATHY',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_21', 'RELAX_FACT_22']
        }, {
          id: 'COMPLETED_CALM_BREATHE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_23', 'RELAX_FACT_24']
        }, {
          id: 'COMPLETED_POSITIVE_VISUALIZATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_25', 'RELAX_FACT_26']
        }, {
          id: 'COMPLETED_UNGUIDED_MEDITATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_27', 'RELAX_FACT_28']
        }, {
          id: 'COMPLETED_BECOMING_THE_TREE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_21', 'RELAX_FACT_22']
        }, {
          id: 'COMPLETED_BREATHING', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_29', 'RELAX_FACT_21'] 
        }, {
          id: 'COMPLETED_MINDFUL_EMOTIONS',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_HOBBY',
          sort: randomIds[randomIndex++],
          id: 13,
          factoids: ['HABITS_FACT_19', 'HABITS_FACT_20']
        }, {
          display: 'SUGGESTED_ACTIVITY_GET_SOME_EXERCISE',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_21', 'HABITS_FACT_22']
        }, {
          display: 'SUGGESTED_ACTIVITY_SLEEP', 
          sort: randomIds[randomIndex++],
          id: 2,
          factoids: ['HABITS_FACT_23', 'HABITS_FACT_24']
        }, {
          display: 'SUGGESTED_ACTIVITY_OUTDOORS',
          sort: randomIds[randomIndex++],
          id: 8,
          factoids: ['HABITS_FACT_25', 'HABITS_FACT_26']
        }],
        'thoughts': [{
          id: 'COMPLETED_TRAPS_THOUGHT_RECORD', /* works */
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_9', 'THOUGHTS_FACT_10']
        }, {
          id: 'COMPLETED_RETHINK',
          sort: randomIds[randomIndex++] ,
          factoids: ['THOUGHTS_FACT_11', 'THOUGHTS_FACT_12']
        }, {
          id: 'COMPLETED_POSITIVITY_JOURNAL',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_13', 'THOUGHTS_FACT_14']
        }, {
          id: 'COMPLETED_JOURNAL', //
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_15', 'THOUGHTS_FACT_16']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_13', 'GOALS_FACT_14']
        }, {
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_15', 'GOALS_FACT_16']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_9', 'GOALS_FACT_10']            
        }, {
          display: 'SUGGESTED_ACTIVITY_NON_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_11', 'GOALS_FACT_12']
        }],
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_6', 'HOPE_FACT_7', 'HOPE_FACT_8', 'HOPE_FACT_9', 'HOPE_FACT_10']
        }]
      };

    } else if (moodLevel == 'good') {

      return {
        'relax': [{
          id: 'COMPLETED_POSITIVE_VISUALIZATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_31', 'RELAX_FACT_32']
        }, {
          id: 'COMPLETED_MINDFUL_SENSES',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_MINDFUL_BODY_SCAN', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_MUSCLE_RELAXATION', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_33', 'RELAX_FACT_34']
        }, {
          id: 'COMPLETED_BREATHING', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_35', 'RELAX_FACT_36']
        }, {
          id: 'COMPLETED_MOTIVATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }, {
          id: 'COMPLETED_EMPATHY',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_GO_FOR_A_WALK',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_27', 'HABITS_FACT_28']
        }, {
          display: 'SUGGESTED_ACTIVITY_GET_SOME_EXERCISE',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_29', 'HABITS_FACT_30']
        }, {
          display: 'SUGGESTED_ACTIVITY_HOBBY',
          sort: randomIds[randomIndex++],
          id: 13,
          factoids: ['HABITS_FACT_31', 'HABITS_FACT_32']
        }],
        'thoughts': [{
          id: 'COMPLETED_JOURNAL',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_17', 'THOUGHTS_FACT_18']
        }, {
          id: 'COMPLETED_ABC_THOUGHT_RECORD',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_19', 'THOUGHTS_FACT_20']
        }, {
          id: 'COMPLETED_GRATITUDE_JOURNAL',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_21', 'THOUGHTS_FACT_22']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_NON_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_17', 'GOALS_FACT_18']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_19', 'GOALS_FACT_20']
        }, {
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_21', 'GOALS_FACT_22']
        }],
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_1', 'HOPE_FACT_2', 'HOPE_FACT_3', 'HOPE_FACT_4', 'HOPE_FACT_5']
        }]
      };

    } else if (moodLevel == 'verygood') {

      return {
        'relax': [{
          id: 'COMPLETED_GRATITUDE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }, {
          id: 'COMPLETED_MINDFUL_PRESENCE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_POSITIVITY', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }, {
          id: 'COMPLETED_UNGUIDED_MEDITATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_39', 'RELAX_FACT_40']
        }, {
          id: 'COMPLETED_EMPATHY', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }, {
          id: 'COMPLETED_BECOMING_THE_TREE',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_OUTDOORS',
          sort: randomIds[randomIndex++],
          id: 8,
          factoids: ['HABITS_FACT_33', 'HABITS_FACT_34']
        }, {
          display: 'SUGGESTED_ACTIVITY_HOBBY',
          sort: randomIds[randomIndex++],
          id: 13,
          factoids: ['HABITS_FACT_31', 'HABITS_FACT_32']
        }, {
          display: 'SUGGESTED_ACTIVITY_GO_FOR_A_WALK',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_26', 'HABITS_FACT_27']
        }],
        'thoughts': [{
          id: 'COMPLETED_POSITIVITY_JOURNAL',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_23', 'THOUGHTS_FACT_24']
        }, {
          id: 'COMPLETED_ABC_THOUGHT_RECORD',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_19', 'THOUGHTS_FACT_20']
        }, {
          id: 'COMPLETED_GRATITUDE_JOURNAL', 
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_21', 'THOUGHTS_FACT_22']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_21', 'GOALS_FACT_22']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_19', 'GOALS_FACT_20']
        }, {
          display: 'SUGGESTED_ACTIVITY_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_23', 'GOALS_FACT_24']
        }],
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_1', 'HOPE_FACT_2', 'HOPE_FACT_3', 'HOPE_FACT_4', 'HOPE_FACT_5']
        }] 
      };

    } else { // great

      return {
        'relax': [{
          id: 'COMPLETED_MINDFUL_WALK',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_POSITIVITY',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }, {
          id: 'COMPLETED_GRATITUDE', 
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_37', 'RELAX_FACT_38']
        }, {
          id: 'COMPLETED_MINDFUL_SENSES',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_3', 'RELAX_FACT_4']
        }, {
          id: 'COMPLETED_POSITIVE_VISUALIZATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_31', 'RELAX_FACT_32']
        }, {
          id: 'COMPLETED_UNGUIDED_MEDITATION',
          sort: randomIds[randomIndex++],
          factoids: ['RELAX_FACT_39', 'RELAX_FACT_40']
        }],
        'habits': [{
          display: 'SUGGESTED_ACTIVITY_GET_SOME_EXERCISE',
          sort: randomIds[randomIndex++],
          id: 3,
          factoids: ['HABITS_FACT_29', 'HABITS_FACT_30']
        }, {
          display: 'SUGGESTED_ACTIVITY_FRIENDS',
          sort: randomIds[randomIndex++],
          id: 10,
          factoids: ['HABITS_FACT_35', 'HABITS_FACT_36']
        },  {
          display: 'SUGGESTED_ACTIVITY_FAMILY',
          sort: randomIds[randomIndex++],
          id: 9,
          factoids: ['HABITS_FACT_37','HABITS_FACT_38']
        }, {
          display: 'SUGGESTED_ACTIVITY_EAT',
          sort: randomIds[randomIndex++],
          id: 4,
          factoids: ['HABITS_FACT_39', 'HABITS_FACT_40']
        }],
        'thoughts': [{
          id: 'COMPLETED_POSITIVITY_JOURNAL', 
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_23', 'THOUGHTS_FACT_24']
        }, {
          id: 'COMPLETED_ABC_THOUGHT_RECORD',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_19', 'THOUGHTS_FACT_20']
        }, {
          id: 'COMPLETED_BELIEFS_THOUGHT_RECORD',
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_25', 'THOUGHTS_FACT_26']
        }, {
          id: 'COMPLETED_GRATITUDE_JOURNAL', 
          sort: randomIds[randomIndex++],
          factoids: ['THOUGHTS_FACT_21', 'THOUGHTS_FACT_22']
        }],
        'goals': [{
          display: 'SUGGESTED_ACTIVITY_ANY_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_21', 'GOALS_FACT_22']
        }, {
          display: 'SET_A_DAILY_CHALLENGE',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_19', 'GOALS_FACT_20']
        }, {
          display: 'SUGGESTED_ACTIVITY_SOCIAL_GOALS',
          sort: randomIds[randomIndex++],
          factoids: ['GOALS_FACT_23', 'GOALS_FACT_24']
        }],
        'hope': [{
          id: 'ADD_PICTURE_TO_HOPE_FEED',
          sort: randomIds[randomIndex++],
          factoids: ['HOPE_FACT_1', 'HOPE_FACT_2', 'HOPE_FACT_3', 'HOPE_FACT_4', 'HOPE_FACT_5']
        }]
      };
    }
  };

  $rootScope.$on('event:online', postOfflineActivities);

  $rootScope.$on('request:updateLocalCompletedActivities', activityService.updateLocalCompletedActivities);

  activityService.setExitState = function(state, params){
    // sometimes we want app.relax to go back to therapist tab in the case of hw, store this here
    // or discover tag 
    activityService.exitState = state;
    activityService.exitParams = params;
  };

  activityService.clearExitState = function(){
    activityService.exitState = null;
    activityService.exitParams = null;
  };

  activityService.hasExitState = function(){
    return activityService.exitState !== null;
  };

  activityService.goToExitState = function(){
    var exitState = activityService.exitState;
    var params = activityService.exitParams;

    if(activityService.exitState){
      activityService.clearExitState();
      $state.go('app.home').then(function(){
        $state.go(exitState, params);
      });
    } else {
      openURL('/home');
    }
  };

  activityService.setMainBackState = function(prevState){
    // save this so main meditation screen knows where to go back to
    activityService.mainBackState = prevState;
  };

  activityService.getMainBackState = function(){
    return activityService.mainBackState;
  };

  activityService.getTools = function getTools(){
    return ['journeys', 'relax', 'habits', 'hope', 'thoughts', 'goals'];
  };

  function filterOutCompletedHabits(suggestedActivities){
    // remove habits we've completed today from the possibilities
    var completedHabits = _.filter(activityService.todaysActionList, {actionClass: 'health'});
    var complete = false;
    var habitsToRemove = [];

    for(var i=0; i < completedHabits.length; i++){
      var foundHabit = _.filter(suggestedActivities, {id: completedHabits[i].data.habitId});
      if(foundHabit){
        habitsToRemove.push(foundHabit);
      }
    }
    if(habitsToRemove.length){
      habitsToRemove = _.flatten(habitsToRemove, suggestedActivities);
      var diff = _.difference(suggestedActivities, habitsToRemove);
      return diff;          
    }
    return suggestedActivities;
  }    

  function getSuggestedActivity(activity, suggestedActivities) {

    if(activity == 'habits'){
      suggestedActivities = filterOutCompletedHabits(suggestedActivities);
      if(!suggestedActivities || !suggestedActivities.length)
        return [];
    }

    var activities = suggestedActivities || activityService.suggestedActivities[activity];
    if (activities) {

      // Apply the randomization.
      activities.sort(function(a, b) {

        return a.sort - b.sort;
      });

      var suggestedActivity;

      for (var i = 0; i < activities.length; ++i) {
        
        suggestedActivity = activities[i];
        var isPremiumActivity = activityService.isActivityPremium(suggestedActivity.id);

        suggestedActivity.premium = isPremiumActivity;

        if ( (isPremiumActivity && activityService.canSuggestPremiumActivity) || !isPremiumActivity) {
          break;             

        } else {
          console.log("skipped.");
        }
      }
      if(suggestedActivity.factoids){
        var randomInt = Math.floor(Math.random() * Math.floor(suggestedActivity.factoids.length));
        suggestedActivity.fact = suggestedActivity.factoids[randomInt];          
      }
      
      return suggestedActivity;
    }
  }

  function removeCompletedActivities(){
    if(!activityService.suggestedActivities || _.isEmpty(activityService.suggestedActivities))
      return;

    if(activityService.suggestedActivities.habits && hasCompletedHabit(activityService.suggestedActivities.habits)){
      delete activityService.suggestedActivities.habits;
    }
    
    var replacements = [];

    _.each(activityService.todaysActionList, function(action){

      if(action.actionClass == 'goals' && activityService.suggestedActivities.hasOwnProperty('goals'))
        delete activityService.suggestedActivities.goals;

      if(action.data){
        var activity = ActivityService.getActivityById(action.data.activityId);
        if(activity){
          _.each(activityService.suggestedActivities, function(val, key){
            if(val.hasOwnProperty('id') && val.id == activity.name){
              if(retrievedSuggestedActivities.retrievedSuggestedActivities){
                // try to replace it with something more valuable
                var completedActionTitles =_.flatMap(activityService.todaysActionList, function(item){return item.actionTitle;});
                var categorySuggestions = activityService.retrievedSuggestedActivities[key];
                var notCompleted;
                // thoughts object formatting is different - the WORST
                if(key === 'thoughts'){
                  var suggestionObj;
                  _.each(categorySuggestions, function(suggestion){
                    suggestionObj = ThoughtsService.getActivityByConstantName(suggestion.id);
                    suggestion.actionTitle = suggestionObj.actionTitle;
                  });
                  var suggestion = ThoughtsService.getActivityByConstantName(val.id);
                  notCompleted = _.filter(categorySuggestions, function(item){
                    return completedActionTitles.indexOf(item.actionTitle) < 0;
                  });

                } else {
                  // else relax
                  notCompleted = _.filter(categorySuggestions, function(item){
                    return completedActionTitles.indexOf(item.id) < 0;
                  });
                }
                if(notCompleted.length){
                  var replacementFound = false;
                  var winner;
                  var compareItems = function compareItems(item){
                    return item.id === winner.id;
                  };
                  while(!replacementFound && notCompleted.length > 0){
                    winner = _.sample(notCompleted);
                    isPremiumActivity = activityService.isActivityPremium(winner.id);
                    
                    if (isPremiumActivity && (activityService.premiumCount > 1 || !activityService.canSuggestPremiumActivity)) {
                      if(notCompleted.length === 1)
                        notCompleted = [];
                      else {
                        _.remove(notCompleted, compareItems);
                      }
                    } else {
                      replacementFound = true;
                      winner.premium = true;
                    }
                  }
                  if(replacementFound)
                    replacements.push({key: key, val: winner});
                }
              }
              delete activityService.suggestedActivities[key];
            }
            if(val.hasOwnProperty('display') && val.display == activity.name){
              delete activityService.suggestedActivities[key];
            }
          });
      
          var isHopePost = ActivityService.isHopePost(activity.id);
          if(isHopePost)
            delete activityService.suggestedActivities.hope;
        }
      }

    });
    if(replacements.length){
      _.each(replacements, function(val){
        activityService.suggestedActivities[val.key] = val.val;
      });
      saveLocalSuggestedActivities();         
    }
    //after we've done our replacement, delete so it doesn't get replaced until next mood rating
    activityService.retrievedSuggestedActivities = null;
  } 

  function hasCompletedHabit(suggestion){
    var completedHabits = _.filter(activityService.todaysActionList, {actionClass: 'health'});
    var completedHabitIds = _.map(completedHabits, function(habit){
      return habit.data.habitId;});
    return _.indexOf(completedHabitIds, suggestion.id) > -1;
  }  

  function rerandomizeSuggestedActivities() {
  // We need to provide random suggestions each time they come back to the home
  // screen, but clicking back and forth between energy levels should provide
  // the same outcome (I believe). This provides some variability in the recommendations.
    activityService.randomIds = [];        
    for (var iRandom = 0; iRandom < 70; ++iRandom) {

      activityService.randomIds[iRandom] = Math.random();
    }
  }

  function saveLocalSuggestedActivities(){
    localStorage.setItem('suggested_activities', JSON.stringify(activityService.suggestedActivities));
  }

  activityService.setEnergyLevel = function setEnergyLevel(todaysActionList, lastMoodEntry) {
    //circular dependency with HabitsService.getTodaysLastMoodEntry, so pass it in as param
    var moodLevel;
    activityService.todaysActions = todaysActionList;

    if (lastMoodEntry == 'Awful') {
      moodLevel = 'awful';
    } else if (lastMoodEntry == 'Bad') {
      moodLevel = 'bad';
    } else if (lastMoodEntry == 'Not Good') {
      moodLevel = 'notgood';
    } else if (lastMoodEntry == 'Okay') {
      moodLevel = 'okay';
    } else if (lastMoodEntry == 'Good') {
      moodLevel = 'good';
    } else if (lastMoodEntry == 'Very Good') {
      moodLevel = 'verygood';
    } else {
      moodLevel = 'great';
    }
    
    var randomIndex = 0;
    
    activityService.canSuggestPremiumActivity = AccountService.getDaysSinceSignup() > 1 || AccountService.isPremiumEnabled();

    function setNewSuggestedActivities() {

      function getNewActivities(forceReturn) {
        activityService.retrievedSuggestedActivities = activityService.getSuggestionsByMood(moodLevel, activityService.randomIds, randomIndex);

        var suggestedCategories = angular.copy(activityService.getTools());
        var suggestedFactoids = angular.copy(activityService.getTools());
        // format of suggestedActivities:
        // { relax: { display: 'COMPLETED_GRATITUDE' ... }
        //   hope:  { display: 'ADD_PICTURE_TO_HOPE_FEED' ...} }

        // If we have more than one premium activity in the set, return null so the set gets regenerated
        // Also regenerate the set if the set contains a premium activity and it's a new user
        var hasCompletedHabit = false;
        var suggestedActivities = angular.copy(activityService.retrievedSuggestedActivities);
        
        // This needs to get reset every time the suggestions are generated or we will never return.
        activityService.premiumCount = 0;

        _.each(suggestedActivities, function(activities, activityType) {

          var singleRecommendedActivity = getSuggestedActivity(activityType, activities);

          if(singleRecommendedActivity.hasOwnProperty('id') || singleRecommendedActivity.hasOwnProperty('display')){
            suggestedActivities[activityType] = singleRecommendedActivity;

            var isPremiumActivity = activityService.isActivityPremium(singleRecommendedActivity.id);
            if (isPremiumActivity){
              ++activityService.premiumCount;
            }
          } else {
            // couldn't find an eligible activity - habits
            delete suggestedActivities[activityType];
          }

        });

        if (activityService.premiumCount > 1 && !AccountService.isPremiumEnabled() && !forceReturn) {
          rerandomizeSuggestedActivities();
          console.log('Generated a set with > 1 premium activity. Regenerating...', suggestedActivities);
          return null;
        }
        if (!activityService.canSuggestPremiumActivity && (activityService.premiumCount > 0) && !forceReturn) {
          rerandomizeSuggestedActivities();
          console.log('Generated a premium activity for a new user. Regenerating...', suggestedActivities);
          return null;
        }

        return suggestedActivities;
      }

      var suggestedActivityIterations = 0;
      var suggestedActivities = null;
      while (!suggestedActivities && (suggestedActivityIterations < 1000)) {
        suggestedActivities = getNewActivities(false);
        ++suggestedActivityIterations;
      }

      // If we didn't get anything previously, force the function to return something.
      if (!suggestedActivities)
        suggestedActivities = getNewActivities(true);

      activityService.suggestedActivities = suggestedActivities;

      var date = new Date();
      saveLocalSuggestedActivities();
      localStorage.setItem('suggestions_time',  date.getTime());
    }

    var previouslySuggestedActivities = localStorage.getItem('suggested_activities');
    
    var lastSuggestionTime = localStorage.getItem('suggestions_time');
    var lastMoodTime = localStorage.getItem('recent_mood_time');

    var hasNewMoodRating = moment(new Date(parseInt(lastMoodTime))).isAfter(new Date(parseInt(lastSuggestionTime)));

    // check to see if they've updated their latest mood rating
    if (previouslySuggestedActivities && previouslySuggestedActivities != 'undefined' && !hasNewMoodRating) {
      console.log('using previous');
      activityService.suggestedActivities = JSON.parse(previouslySuggestedActivities);

      removeCompletedActivities();
    } else {
      console.log('generate new');
      rerandomizeSuggestedActivities();
      setNewSuggestedActivities();
    }
    return activityService.suggestedActivities;
  };

  activityService.getSuggestedActivities = function getSuggestedActivities(){
    return activityService.suggestedActivities;
  };

  activityService.shouldShowSuggestions = function shouldShowSuggestions(skillsService){
    var lastMoodRating = skillsService.getLastMoodRatingObj();
    return lastMoodRating && moment().diff(moment(lastMoodRating.experiencedAt),'m') < 60;
  };

  activityService.initSuggestionFunctionality = function initSuggestionFunctionality($scope, SkillsService){
    // functions for getSuggestions template used in home & tools
    $scope.hasSuggestion = function hasSuggestion(tool){
      if(!$scope.suggestedActivities)
        return;
      return $scope.suggestedActivities.hasOwnProperty(tool);
    };

    /**
     * Returns wether the activity passed as an argument is locked for the 
     * current user.
     */
    $scope.isLocked = function(activity) {
      return activity.premium && !AccountService.isPremiumEnabled();
    };

    $scope.isUserPremium = function isUserPremium(){
      return AccountService.isPremiumEnabled();
    };

    $scope.getActivityClass = function getActivityClass(activity) {
      var displayKey = _.has(activity, 'display') ? activity.display : activity.id;
      return displayKey.toLowerCase().split('_').join('-').split(' ').join('-');
    };
    $scope.goToSuggestion = function goToSuggestion(tool, activity){
      if(activity.premium && !$scope.isUserPremium()){
        PayService.showPremiumModal($scope, tool, 'suggestedActivity');
        return;
      }

      if($scope.suggestionModal)
        $scope.closeSuggestionModal();
      switch(tool){
        case 'habits':
          $scope.goToSuggestedHabit($scope.suggestedActivities[tool]);
          break;
        case 'hope': 
          $scope.goToSuggestedPersonalFeed();
          break;
        case 'thoughts':
          $scope.goToSuggestedThought($scope.suggestedActivities[tool]);
          break;
        case 'goals':
          $scope.goToSuggestedGoal($scope.suggestedActivities[tool]);
          break;
        case 'relax':
          $scope.goToSuggestedRelax($scope.suggestedActivities[tool], {backState: $state.current.name});
          break;
        case 'journeys':
          // have to do this in appCtrl to avoid circular dependency
          $scope.goToSuggestedPath(activity);
          break;
      }
    };

    $scope.goToSuggestedHabit = function(suggestedActivity) {
      $analytics.eventTrack('suggestionClicked', {
        category: 'habits',
      });
      SkillsService.setSuggestedActivityId(suggestedActivity.id);
      $scope.goToHabits({backState: $state.current.name});
    };

    $scope.goToSuggestedPersonalFeed = function goToSuggestedPersonalFeed(){
      $analytics.eventTrack('suggestionClicked', {
        category: 'hope'
      });
      $scope.goToPersonalFeed(null, null, $state.current.name);
    };

    $scope.goToSuggestedThought = function(suggestedActivity) {
      $analytics.eventTrack('suggestionClicked', {
        category: 'thoughts'
      });
      SkillsService.setSuggestedActivityId(suggestedActivity.id);
      $scope.goToThoughts({backState: $state.current.name});
    };
    
    $scope.goToSuggestedGoal = function(suggestedActivity){
      $analytics.eventTrack('suggestionClicked', {
        category: 'goals'
      });
      SkillsService.setSuggestedActivityId(suggestedActivity.id);
      $scope.goToGoals({backState: $state.current.name});
    };

    $scope.getActivityClass = function getActivityClass(activity) {
      if(activity.hasOwnProperty('pathId'))
        return 'journeys';

      var displayKey = _.has(activity, 'display') ? activity.display : activity.id;
      return displayKey.toLowerCase().split('_').join('-').split(' ').join('-');
    };

    $scope.getSuggestedActivityText = function getSuggestedActivityText(activity) {
      if (activity.display) {
        return $translate.instant(activity.display);
      } else {
        return activityService.getDisplayForActivity(activity.id);
      }
    };

    $scope.getToolLabel = function getToolLabel(tool){
      switch(tool){
        case 'relax':
          return $translate.instant('RELAX_ACTIVITY');
        case 'habits':
          return $translate.instant('HEALTH');
        case 'hope':
          return $translate.instant('HOPE');
        case 'thoughts':
          return $translate.instant('THOUGHTS_ACTIVITY');
        case 'goals':
          return $translate.instant('GOALS');
      }
    };     

  };

  initializeActivityService();

  return activityService;
}]);
var tokenModule = angular.module('pacificaAnalytics', []);


tokenModule.provider('$analytics', function() {

  var initialized = false;
  var disabled = false;

  var analyticsProvider = {

    // When users who have the phi flag set log in, we need to be sure to disable all
    // tracking for these individuals.
    disable: function() {

      disabled = true;
    },

    initialize: function(gaCode, version, currentPage) {

      if (window.ga && !disabled) {
        console.log("Inititalizing analytics with GA Code: " + gaCode);


        window.ga('create', gaCode, {
          'storage': 'none',
          'cookieDomain': 'none',
          'clientId': window.device ? device.uuid : 'abc123'
        });

        // Cannot set these in the create function above:
        window.ga('set', 'appName', 'Pacifica');
        window.ga('set', 'appVersion', version);

        // When running locally the analytics.js file will check the page's protocol and
        // abort if it is not http or https without this.
        window.ga('set', 'checkProtocolTask', function() { /* nothing */ });
        window.ga('set', 'forceSSL', true);
        window.ga('set', 'anonymizeIp', true);

        initialized = true;

        analyticsProvider.pageTrack(currentPage);
      } else
        console.log("No analytics provider.");
    },

    //ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
    eventTrack: function(action, options) {

      if (window.ga && initialized && !disabled)
        window.ga('send', 'event', options.category, action, options.label);
    },

    pageTrack: function(page) {

      if (window.ga && initialized && !disabled) {

        // This allows subsequent events to be attributed to the correct page.
        window.ga('set', 'screenName', page);

        window.ga('send', 'screenview', {
          screenName: page
        });
      }
    },

    setUserId: function(userId) {

      if (window.ga && initialized && !disabled)
        window.ga('set', '&uid', '' + userId);
    }
  };

  return {

    disable: analyticsProvider.disable,

    eventTrack: analyticsProvider.eventTrack,

    initialize: analyticsProvider.initialize,

    setUserId: analyticsProvider.setUserId,

    $get: function() {

      return analyticsProvider;
    }
  };
});

var servicesModule = angular.module('assessmentService', []);

servicesModule.factory('AssessmentService', ['authHttp', 'Environment', 'AccountService', '$stateParams', '$state', '$filter', '$translate', 'OverlayService', '$analytics', '$ionicViewSwitcher', 'FeedService', '$ionicPlatform', '$ionicScrollDelegate', '$timeout', 'StorageService',
  function(authHttp, Environment, AccountService, $stateParams, $state, $filter, $translate, OverlayService, $analytics, $ionicViewSwitcher, FeedService, $ionicPlatform, $ionicScrollDelegate, $timeout, StorageService) {

  var assessmentService = {
    assessmentRequests: [],
    assessments: [],
    // to keep track of if they are taking the assessment via discover feed
    // we need to maintain this beyond the intro screen for the back states
    takingNonClinical: false,
    introBackState: null,
    introBackStateParams: null,
  };

  var assignClinicianNames = function assignClinicianNames(assessmentRequests) {
    var user = AccountService.getAccountUser();
    assessmentRequests.forEach(function(assessmentRequest) {
      var practitioner =  _.find(AccountService.getConnectionContext().practitioners, {id: assessmentRequest.requesterId});
      if ( practitioner === undefined ) {
        if (user.practitioner && assessmentRequest.requesterId == user.practitioner.id) {
          assessmentRequest.requesterFullName = 'Me';
        } else {
          assessmentRequest.requesterFullName = $translate.instant('UNKNOWN');
        }
      } else {
        assessmentRequest.requesterFullName  = practitioner.fullName;
      }
    });
  };

  var initializeAnswers = function initializeAnswers(assessmentRequest) {
    assessmentService.getAssessment(assessmentRequest.assessmentId, function successCallback(assessment) {
      assessmentRequest.questions = [];
      var initAnswers = false;
      if(!assessmentRequest.userAssessment.answers) {
        assessmentRequest.userAssessment.answers = [];
        initAnswers = true;
      }
      assessment.parts.forEach(function(part) {
        part.questions.forEach(function(question) {
          assessmentRequest.questions.push(question);
          if (initAnswers) {
            assessmentRequest.userAssessment.answers.push(null);
          }
        });
      });
    });
  };

  var prepareAssessmentRequests = function prepareAssessmentRequests(assessmentRequests) {
    assignClinicianNames(assessmentRequests);
    assessmentRequests.forEach(function(assessmentRequest) {
      initializeAnswers(assessmentRequest);
    });
    return assessmentRequests;
  };

  function updateLocalAssessmentContext() {
    StorageService.setItem('assessmentRequests', JSON.stringify(assessmentService.assessmentRequests));
  }

  assessmentService.initFromLocalStorage = function initFromLocalStorage(){
    return StorageService.getItemAsync('assessmentRequests')
      .then(function(assessmentRequests) {
        if (assessmentRequests) {
          assessmentRequests = JSON.parse(assessmentRequests);
          if (assessmentRequests) {
            assessmentService.assessmentRequests = assessmentRequests;
          }
        }
      });
  };

  assessmentService.setAssessmentContext = function setAssessmentContext(ctx) {
    assessmentService.assessmentRequests = prepareAssessmentRequests(ctx.requests);
    updateLocalAssessmentContext();
  };

  assessmentService.getAssessmentRequests = function getAssessmentRequests() {
    return assessmentService.assessmentRequests;
  };

  assessmentService.getAssessmentRequest = function getAssessmentRequest(assessmentRequestId) {
    return _.find(assessmentService.assessmentRequests, {id: assessmentRequestId});
  };

  assessmentService.getAssessment = function getAssessment(assessmentId, callback) {
    if (assessmentId <= 0) return;
    var assessment = _.find(assessmentService.assessments, {id: assessmentId});
    if(assessment) {
      callback(assessment);
    } else {
      authHttp.get(Environment.serverURL + '/assessments/' + assessmentId)
        .success(function(response) {
          assessment = response;
          assessmentService.assessments.push(assessment);
          callback(assessment);
        })
        .error(function error(response) {
          console.log(response);
        });
    }
  };

  assessmentService.assessmentIsComplete = function assessmentIsComplete(assessmentRequest){
    var req = assessmentService.getAssessmentRequest(assessmentRequest.id);
    return req.userAssessment.status == 'COMPLETE';
  };

  assessmentService.saveAnswers = function saveAnswers(assessmentRequest) {
    var ret = createPromise();

    // need to update internal reference in case of a context refresh
    var index = _.findIndex(assessmentService.assessmentRequests, {id: assessmentRequest.id});
    if (index != -1) {
      assessmentService.assessmentRequests[index] = assessmentRequest;
    }
    var index2 = _.findIndex(assessmentRequest.userAssessment.assessmentAnswers, function(a){ 
      return a.choiceId === null && a.answerText === null;
    });
    if(index2 === -1 && assessmentRequest.userAssessment.assessmentAnswers.length === assessmentRequest.questions.length) {
      assessmentRequest.userAssessment.finishedAt = Date.now();
      assessmentRequest.userAssessment.status = 'COMPLETE';
    } else {
      assessmentRequest.userAssessment.status = 'INCOMPLETE';
    }

    updateLocalAssessmentContext();

    authHttp.post(
      Environment.serverURL + '/assessments/' + assessmentRequest.assessmentId + '/request/' + assessmentRequest.id,
      assessmentRequest.userAssessment
    ).then(function successCallback(response) {
      console.log('Assessment answers saved!: ', response);
      //assessmentRequest.results = response.data;
      if (assessmentRequest.userAssessment.status == 'COMPLETE' ) {
        assessmentRequest.userAssessment.scores = response.data;
      }

      if (ret.successCallback)
        ret.successCallback();
    }, function errorCallback(response) {
      if (ret.errorCallback)
        ret.errorCallback(response);
    });

    return ret;
  };


  assessmentService.getAssessmentHistory = function requestActivity(start, end) {
    // Make it fetch through the end of the day today.
    var query = '';
    if (start) {
      query += '?startDate=' + start.getTime();
    }
    if (end) {
      if (query.length > 0) {
        query += '&';
      } else {
        query += '?';
      }
      query += 'endDate=' + end.getTime();
    }
    return authHttp.get(Environment.serverURL + '/assessments/requests' + query);
  };

  assessmentService.initializeAssessmentFunctionality = function initializeAssessmentFunctionality($scope, $state, OverlayService) {
    // exclude NPS here (and whatever other non-assessment assessments we hack in)
    $scope.todaysAssessmentRequests = _.filter(assessmentService.getAssessmentRequests(), function(a){
      return a.requesterId !== 0;
    });

    if ($scope.todaysAssessmentRequests) {

      $scope.todaysAssessmentRequests.sort(function(a,b) {

        return b.requestDate - a.requestDate;
      });
    }

    $scope.getQuestionIndex = function getQuestionIndex(assessmentRequest){
      var assessmentAnswers = _.get(assessmentRequest, 'userAssessment.assessmentAnswers') || [];

      //if we have no answers, start at the beginning
      if(!assessmentAnswers.length) {
        return 0;
      }

      var index = _.findIndex(assessmentAnswers, function(answer) {
        return answer.choiceId === null && answer.answerText === null;
      });

      // if there's an empty answer set, return that index
      if(index > -1) {
        return index;
      }
      
      return assessmentAnswers.length;
    };

    $scope.takeAssessment = function takeAssessment(assessmentRequest, nonClinical) {
      if(nonClinical)
        assessmentService.takingNonClinical = true;

      if (!Environment.isOnline()) {
        OverlayService.popup.alert({
          template: $translate.instant('ASSESSMENT_OFFLINE_WARNING'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
        return;
      }

      assessmentService.introBackState = $state.current;
      assessmentService.introBackStateParams = angular.copy($stateParams);
      // gonna write some magic code right here... so put on your sunglasses
      // because this shouldn't be seen by the naked eye
      var questionIndex = $scope.getQuestionIndex(assessmentRequest);

      if (questionIndex > 0) {
        assessmentService.getAssessment(parseInt(assessmentRequest.assessmentId), function(assessment) {
          // find part we are on
          var partId = 1;
          var questionCount = 0;
          assessment.parts.some(function(part, partIndex) {
            questionCount += part.questions.length;
            if (questionIndex < questionCount) {
              partId = partIndex+1;
              if ( questionIndex == questionCount - part.questions.length && part.description) {
                // states are also defined in noe
                $state.go('app.assessment-intro', {
                  assessmentId: assessmentRequest.assessmentId,
                  assessmentRequestId: assessmentRequest.id,
                  partId: partId
                });
              } else {
                $state.go('app.assessment-question', {
                  assessmentId: assessmentRequest.assessmentId,
                  assessmentRequestId: assessmentRequest.id,
                  partId: partId,
                  questionId: questionIndex + 1
                });
              }
              return true;
            }
            return false;
          });
        });
      } else {
        // states are also defined in noe
        $state.go('app.assessment-intro', {
          assessmentId: assessmentRequest.assessmentId,
          assessmentRequestId: assessmentRequest.id,
          partId: 1
        });
      }
    };

    $scope.viewAssessmentResults = function viewAssessmentResults(assessmentRequest) {
      if (AccountService.isStudyUser())
        return;
      // states are also defined in noe
      $state.go('app.assessment-results-review', {
        assessmentId: assessmentRequest.assessmentId,
        assessmentRequestId: assessmentRequest.id
      });
    };
  };

  assessmentService.initializeIntroFunctionality = function initializeIntroFunctionality($scope) {

    $scope.questionId = 1;
    $scope.assessmentRequest = assessmentService.getAssessmentRequest(parseInt($stateParams.assessmentRequestId));
    $scope.nonClinical = assessmentService.takingNonClinical;

    $scope.partIndex = parseInt($stateParams.partId) - 1;

    $scope.resetAndGoBack = function resetAndGoBack(){
      assessmentService.takingNonClinical = false;
      if(assessmentService.introBackState){
        $state.go(assessmentService.introBackState.name, assessmentService.introBackStateParams);
        assessmentService.introBackState = null;
        assessmentService.introBackStateParams = null;
      } else {
        $scope.goBack();
      }
    };

    $scope.startPart = function startPart() {
      // states are also defined in noe
      $state.go('app.assessment-question', {
        assessmentId: $stateParams.assessmentId,
        assessmentRequestId: $stateParams.assessmentRequestId,
        partId: $stateParams.partId,
        questionId: $scope.questionId
      });
    };
    var initAssessment = function() {
      // make sure we have the assessment set on the scope before we try to access it
      $scope.assessment.parts.forEach(function(part, index) {
        if($scope.partIndex > index) {
          $scope.questionId += part.questions.length;
        }
      });
      $scope.goToPreviousPart = function goToPreviousPart() {
        // states are also defined in noe
        $state.go('app.assessment-question', {
          assessmentId: $stateParams.assessmentId,
          assessmentRequestId: $stateParams.assessmentRequestId,
          partId: parseInt($stateParams.partId) - 1,
          questionId: $scope.assessment.parts[$scope.partIndex].questions.length
        });
      };
    };

    assessmentService.getAssessment(parseInt($stateParams.assessmentId), function(assessment) {
      if($scope.nonClinical){
        // don't modify the obj on assessmentService.assessments bc we can't undo that if they end up connecting
        // in the same session. this code runs every time anyway.
        $scope.assessment = angular.copy(assessment);
        $scope.assessment.name = $translate.instant('CHECK_IN');
        $scope.assessment.parts[0].description = $translate.instant('DASS21_P1_DESCRIPTION_NON_CLINICAL');
      } else {
        $scope.assessment = assessment;
      }
      initAssessment();
    });
  };

  assessmentService.initializeQuestionFunctionality = function initializeQuestionFunctionality($scope){
    // outside of the app context, this call should be initialized on pacificaReady
    // (after AssessmentService.setAssessmentContext is called during user initialization)

    $scope.submitting = false;
    $scope.partIndex = parseInt($stateParams.partId) - 1;
    $scope.questionIndex = parseInt($stateParams.questionId) - 1;
    $scope.selectedOptions = [];
    $scope.form = {freeText: ''};

    var defaultAnswerObj = {choiceId: null, answerText: null};

    $scope.assessmentRequest = assessmentService.getAssessmentRequest(parseInt($stateParams.assessmentRequestId));

    // need to init this as an array (this will exist for assessments in progress) 
    if($scope.assessmentRequest.userAssessment.assessmentAnswers === null)
      $scope.assessmentRequest.userAssessment.assessmentAnswers = [defaultAnswerObj];
    
    if($scope.assessmentRequest.userAssessment.assessmentAnswers.length < $scope.questionIndex + 1)
      $scope.assessmentRequest.userAssessment.assessmentAnswers.push(defaultAnswerObj);
    if(!$scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].hasOwnProperty('choiceId'))
      $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex] = defaultAnswerObj;

    // need to deserialize answer text
    var assessmentAnswers = $scope.assessmentRequest.userAssessment.assessmentAnswers;
    if(assessmentAnswers && assessmentAnswers[$scope.questionIndex] && assessmentAnswers[$scope.questionIndex].answerText && assessmentAnswers[$scope.questionIndex].answerText !== null){
      var answers = $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].answerText.split(',');
      var questionAnswers = _.map($scope.assessmentRequest.questions[$scope.questionIndex].options, 'text');
      $scope.selectedOptions = _.intersection(questionAnswers, answers);
      $scope.form.freeText = _.difference(answers, $scope.selectedOptions);
    }

    $scope.disableNext = function disableNext(){
      if($scope.submitting || $scope.inputError)
        return true;
      if($scope.assessmentRequest.questions[$scope.questionIndex].questionType === "MULTI_SELECT_FREETEXT"){
        if($scope.selectedOptions.length === 0 && !$scope.form.freeText)
          return true;
      } else {
        return $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].choiceId === null;
      }
    };

    $scope.showNext = function showNext(){
      // on web refresh, may not have annotated request with questions yet
      if(!$scope.assessmentRequest.questions)
        return;
      var type = $scope.assessmentRequest.questions[$scope.questionIndex].questionType;
      // show next button if we've clicked back on the web... only way to advance without selecting a different answer
      var isBack = Environment.isWeb() &&
              ($scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].choiceId !== null ||
              $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].answerText !== null) &&
              !$scope.submitting;
      return type === 'INTEGER_RANGE' || type === 'MULTI_SELECT_FREETEXT' || isBack;
    };

    function deselectNone(){
      var index = $scope.selectedOptions.indexOf('None');
      if(index > -1)
        $scope.selectedOptions.splice(index, 1);
    }

    $scope.checkForNone = function checkForNone(){
      if($scope.form.freeText !== ''){
        deselectNone();
      }
    };

    $scope.toggleMultiSelect = function toggleMultiSelect(txt){
      if(txt !== 'None'){
        // deselect none if they select something else
        deselectNone();
      }

      if(txt === 'None' && ($scope.selectedOptions.length || $scope.form.freeText !== '')){
        $scope.selectedOptions = [];
        $scope.form.freeText = '';
      }

      var index = $scope.selectedOptions.indexOf(txt);
      if(index > -1){
        $scope.selectedOptions.splice(index, 1);
      } else {
        $scope.selectedOptions.push(txt);
      }
    };

    $scope.isSelected = function isSelected(txt){
      return $scope.selectedOptions.indexOf(txt) > -1;
    };

    var initAssessment = function(){
      $scope.questionCount = 0;
      $scope.partRanges = [];
      $scope.assessment.parts.forEach(function(part) {
        $scope.partRanges.push({min:$scope.questionCount, max:$scope.questionCount + part.questions.length});
        $scope.questionCount += part.questions.length;
      });

      $scope.hasInstructions = function hasInstructions() {
        var translated = $translate.instant($scope.assessment.parts[$scope.partIndex].instructions);
        return translated.length > 0;
      };

      $scope.showHelp = function showHelp() {
        var text;
        if(assessmentService.takingNonClinical)
          text = $translate.instant('DASS21_P1_DESCRIPTION_NON_CLINICAL');
        else
          text = $scope.assessment.parts[$scope.partIndex].description;

        // mars-12+4 where we have different parts but not different descriptions
        if(!text)
          text = $scope.assessment.parts[0].description;

        OverlayService.popup.alert({
          template: text,
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
      };

      $scope.goBack = function goBack() {
        var partRange = $scope.partRanges.find(function(partRange) {
          if (partRange.min == $scope.questionIndex) {
            return true;
          }
        });

        if (partRange !== undefined && $scope.assessment.parts[$scope.partRanges.indexOf(partRange)].description !== '') {
          // states are also defined in noe
          $ionicViewSwitcher.nextDirection('back');
          $state.go('app.assessment-intro', {
            assessmentId: $stateParams.assessmentId,
            assessmentRequestId: $stateParams.assessmentRequestId,
            partId: $scope.partRanges.indexOf(partRange) + 1
          });
        } else {
          var partId = $stateParams.partId;
          if(partRange !== undefined)
            partId = $scope.partRanges.indexOf(partRange);
          // states are also defined in noe
          $ionicViewSwitcher.nextDirection('back');
          $state.go('app.assessment-question', {
            assessmentId: $stateParams.assessmentId,
            assessmentRequestId: $stateParams.assessmentRequestId,
            partId: partId,
            questionId: parseInt($stateParams.questionId) - 1
          });
        }
      };

      $scope.validateLength = function validateLength(){
        if($scope.form.freeText.length > 100){
          $scope.inputError = $translate.instant('ASSESSMENT_FREE_TEXT_LENGTH_ERROR');
          if(Environment.isWeb())
            $timeout($ionicScrollDelgate.resize);
        } else {
          $scope.inputError = null;
        }
      };

      $scope.validateRange = function validateRange(){
        if($scope.assessmentRequest.questions[$scope.questionIndex].questionType === 'INTEGER_RANGE'){
          var answer = $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].choiceId;
          var range = _.map($scope.assessmentRequest.questions[$scope.questionIndex].options, 'value');
          var minRange = range[0];
          var maxRange = range[range.length - 1];
          var isInt = Number.isInteger(Number(answer));
          if(answer < minRange || answer > maxRange || !isInt){
            $scope.inputError = $translate.instant('ASSESSMENT_INT_RANGE_ERROR').replace('xx', minRange).replace('yy', maxRange);
          } else {
            $scope.inputError = null;
          }
        }
      };

      function saveAnswersInternal() {
        $scope.inputError = null;
        if (!Environment.isOnline()) {
          OverlayService.popup.alert({
            template: $translate.instant('ASSESSMENT_OFFLINE_WARNING'),
            okText: $translate.instant('OK_GOT_IT'),
            okType: 'button-default'
          });
          return;
        }

        function isLastQuestionForPart(){
          var ret = $scope.partRanges.find(function(partRange) {
            if (partRange.max == $scope.questionIndex + 1) {
              return true;
            }
          });
          return ret;
        }

        if(!$scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].hasOwnProperty('answerText'))
          $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].answerText = null;

        if(!$scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].hasOwnProperty('choiceId'))
          $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].choiceId = 0;


        $scope.validateRange();
        $scope.validateLength();

        if($scope.selectedOptions.length || $scope.form.freeText !== ''){
          var answerText = angular.copy($scope.selectedOptions);
          if($scope.form.freeText !== ''){
            $scope.validateLength();
            answerText.push($scope.form.freeText);
          }

          if($scope.inputError)
            return;

          $scope.submitting = true;
          $scope.assessmentRequest.userAssessment.assessmentAnswers[$scope.questionIndex].answerText = answerText.toString();
        }

        assessmentService.saveAnswers($scope.assessmentRequest)
          .success(function() {
            // special case for phq-9 question 9 which is a self
            // harm question and has a answer that is not the first requires a pop-up
            if ($scope.assessment.shortName === 'PHQ-9' &&
                $scope.questionIndex == 8 &&
                $scope.assessmentRequest.userAssessment.answers[$scope.questionIndex] != $scope.assessmentRequest.questions[$scope.questionIndex].options[0].id) {
              $scope.showSupport();
            }
            // if the last part and last question in part
            if(parseInt($stateParams.partId) === $scope.assessment.parts.length && parseInt($stateParams.questionId) === $scope.assessmentRequest.questions.length) {

              if (!$scope.preventAssessmentResults || !$scope.preventAssessmentResults()) {
                // states are also defined in noe
                $state.go('app.assessment-results', {
                  assessmentId: $stateParams.assessmentId,
                  assessmentRequestId: $stateParams.assessmentRequestId
                });
              }
              else {
                $scope.done();
              }
            }
            else if (isLastQuestionForPart() && $scope.assessment.parts[$scope.partIndex + 1].description !== '') {
              // states are also defined in noe
              $state.go('app.assessment-intro', {
                assessmentId: $stateParams.assessmentId,
                assessmentRequestId: $stateParams.assessmentRequestId,
                partId: parseInt($stateParams.partId) + 1
              });
            }
            else {
              var partId = parseInt($stateParams.partId);
              if(isLastQuestionForPart()){
                partId = partId + 1;
              }
              $state.go('app.assessment-question', {
                assessmentId: $stateParams.assessmentId,
                assessmentRequestId: $stateParams.assessmentRequestId,
                partId: partId,
                questionId: parseInt($stateParams.questionId) + 1
              });
            }
          })
          .error(function(resp) {
            var errorString = 'Assessment not completed within an hour';
            if(resp.status === 400 && resp.data.message == errorString){
              var confirmPopup = OverlayService.popup.confirm({
                template: '<div>' + $translate.instant('EXPIRED_ASSESSMENT') + '</div>',
                okText: $translate.instant('OKAY'),
                okType: 'button-default'
              });
              confirmPopup.then(function(res) {
                assessmentService.resetAnswers($stateParams.assessmentRequestId);
                $state.go('app.assessment-question', {
                  assessmentId: $stateParams.assessmentId,
                  assessmentRequestId: $stateParams.assessmentRequestId,
                  partId: $stateParams.partId,
                  questionId: 1
                });
              });
              return;
            }

            $scope.submitting = false;

            OverlayService.popup.alert({
              template: $translate.instant('ASSESSMENT_QUESTION_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      }

      $scope.saveAnswers = _.debounce(saveAnswersInternal, 2000, {leading: true, trailing: false});

    };

    assessmentService.getAssessment(parseInt($stateParams.assessmentId), function(assessment) {
      $scope.assessment = assessment;
      initAssessment();
    });


    $scope.showSupport = function showSupport() {
      OverlayService.popup.alert({
        template: $translate.instant('PHQ9_SCORE_Q9'),
        okText: $translate.instant('OK_GOT_IT'),
        okType: 'button-default'
      });
    };
  };


  assessmentService.resetAnswers = function resetAnswers(assessmentRequestId){
    var assessment = assessmentService.getAssessmentRequest(parseInt(assessmentRequestId));
    for(var i=0; i<assessment.userAssessment.assessmentAnswers.length; i++){
      assessment.userAssessment.assessmentAnswers[i].choiceId = 0;
      assessment.userAssessment.assessmentAnswers[i].answerText = null;
    }
  };

  assessmentService.requestIsCheckin = function requestIsCheckin(request){
    return request.requestNote === 'Check-in' || request.requestNote === 'CHECK_IN';
  };

  assessmentService.initializeResultsFunctionality = function initializeResultsFunctionality($scope) {
    $scope.assessmentRequest = assessmentService.getAssessmentRequest(parseInt($stateParams.assessmentRequestId));
    $scope.isCheckin = assessmentService.requestIsCheckin($scope.assessmentRequest);
    $scope.isDASS = $scope.assessmentRequest.assessmentId === 6;
    $scope.translateData = {
        finishTime : $filter('date')($scope.assessmentRequest.userAssessment.finishedAt, 'h:mma'),
        finishDate : $filter('date')($scope.assessmentRequest.userAssessment.finishedAt, 'M/d/yy')
    };
    $scope.done = function done() {
      $state.go('app.home');
    };

    $scope.cancelResultsBackButton = $ionicPlatform.registerBackButtonAction(function(event) {
        event.preventDefault();
    }, 100);

    $scope.$on('$destroy', function() {
      if ($scope.cancelResultsBackButton)
        $scope.cancelResultsBackButton();
    });

  };

  assessmentService.isCheckinRequestComplete = function isCheckinRequestComplete(){
    var checkinItem = FeedService.getItemOfType('checkin');
    if(!checkinItem)
      return;
    var request = assessmentService.getAssessmentRequest(checkinItem.assessmentRequestId);
    if (request)
      return assessmentService.assessmentIsComplete(request);
  };

  assessmentService.markLocalRequestComplete = function markLocalRequestComplete(request){
    // we only want to do this for nps since we're storing the answer offline
    // and want to prevent the tile from showing until the answers are saved online
    request = assessmentService.getAssessmentRequest(request.id);
    if(request)
      request.userAssessment.status = 'COMPLETE';
  };

  return assessmentService;

}]);

var servicesModule = angular.module('audioCardService', []);

servicesModule.factory('AudioCardService', ['Environment',
  function(Environment) {

    var active = false;

    return {
      setupNotificationCard: function(exerciseName, playToggle, isPlaying) {
        if (window.MusicControls && !active) {
          MusicControls.create({
            track: exerciseName, // optional, default : ''
            artist: 'Sanvello', // optional, default : ''
            cover: 'img/avatar/icon-sanvello.png',
            isPlaying: true, // optional, default : true
            dismissable: false, // optional, default : false
            // hide previous/next/close buttons:
            hasPrev: false, // show previous button, optional, default: true
            hasNext: false, // show next button, optional, default: true
            hasClose: false, // show close button, optional, default: false
            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated
            ticker: exerciseName
          }, function() {

          }, function(error) {

            console.log("error");

            active = false;
          });

          // Register callback
          MusicControls.subscribe(function(message) {
            message = JSON.parse(message).message;
            switch (message) {
              case 'music-controls-headset-unplugged':
                if(isPlaying()){
                  playToggle();
                }
                break;
              case 'music-controls-pause':
                playToggle();
                break;
              case 'music-controls-play':
                playToggle();
                break;
              default:
                break;
            }
          });
          // Start listening for events
          // The plugin will run the events function each time an event is fired
          MusicControls.listen();

          active = true;

        }
      },

      updateCardControl: function(isPlaying) {
        if (window.MusicControls && active) {
          MusicControls.updateIsPlaying(isPlaying);
        }
      },

      destroyNotificationCard: function() {
        if (window.MusicControls) {
          MusicControls.destroy();

          active = false;
        }
      }
    };
  }
]);

var servicesModule = angular.module('audioService', []);

servicesModule.factory('AudioService', ['$translate', 'authHttp', 'TokenService', 'Environment', 'StorageService',
  function($translate, authHttp, TokenService, Environment, StorageService) {

    var audioService = {

      audioContext: {},

      activeThoughtId: undefined,
      activeSources: {}
    };

    audioService.setActiveThoughtId = function setActiveThoughtId(thoughtId) {
      audioService.activeThoughtId = thoughtId;
    };

    audioService.clearActiveThoughtId = function clearActiveThoughtId() {
      audioService.setActiveThoughtId(undefined);
    };

    audioService.getActiveThoughtId = function getActiveThoughtId() {
      return audioService.activeThoughtId;
    };

    audioService.setActiveSource = function setActiveSource(prefix, src) {
      audioService.activeSources[prefix] = src;
    };

    audioService.getActiveSource = function getActiveSource(prefix) {
      return audioService.activeSources[prefix];
    };

    audioService.initFromLocalStorage = function(){
      return StorageService.getItemAsync('audioContext')
        .then(function(localAudioContext) {
          if (localAudioContext) {
            audioService.audioContext = JSON.parse(localAudioContext);
          }
        });
    };

    var textThoughtForReview;

    // This is for temporary storage when launching the thought modal in private groups.
    audioService.setTextThoughtForReview = function setTextThoughtForReview(thought) {
      textThoughtForReview = thought;
    };

    audioService.getTextThoughtForReview = function getTextThoughtForReview() {

      return textThoughtForReview;
    };

    function updateLocalContext() {

      // Don't store more than the last 10 locally.
      if (audioService.audioContext.thoughts &&
        audioService.audioContext.thoughts.length > 10) {

        // Clone the object using a deep copy and cull the thoughts.
        var context = $.extend(true, {}, audioService.audioContext);

        context.thoughts.splice(10, context.thoughts.length - 10);

        StorageService.setItem('audioContext', JSON.stringify(context));
      } else {

        StorageService.setItem('audioContext', JSON.stringify(audioService.audioContext));
      }
    }

    audioService.setAudioContext = function setAudioContext(ctx) {

      // There's a small problem. If there is a thought that has not been persisted,
      // it will get cleared here. We don't want that.
      var nonPersistedThoughts = [];

      if (audioService.audioContext.thoughts) {
        for (var i = audioService.audioContext.thoughts.length - 1; i >= 0; --i) {
          var thought = audioService.audioContext.thoughts[i];
          if (!isNumeric(thought.id) && !thought.saving) {

            nonPersistedThoughts.push(thought);
          }
        }
      }

      audioService.audioContext = ctx;

      if (!audioService.audioContext.thoughts)
        audioService.audioContext.thoughts = [];

      // Now add back in the thoughts
      for (var j = 0; j < nonPersistedThoughts.length; ++j) {

        audioService.audioContext.thoughts.push(nonPersistedThoughts[j]);
      }

      updateLocalContext();
    };

    audioService.logout = function logout() {
      audioService.audioContext = {};
    };

    audioService.getThoughts = function getThoughts() {

      return audioService.audioContext.thoughts;
    };

    audioService.getThoughtCount = function getThoughtCount() {

      return audioService.audioContext.totalThoughts;
    };

    // We don't currently handle offline thoughts. They are stored here
    // as you go through the steps, but if they don't get persisted
    // at the end, they will get cleared.
    audioService.clearNonPersistedThoughts = function clearNonPersistedThoughts() {

      var removed = 0;
      if (audioService.audioContext.thoughts) {
        for (var i = audioService.audioContext.thoughts.length - 1; i >= 0; --i) {

          var thought = audioService.audioContext.thoughts[i];
          if (!isNumeric(thought.id) && !thought.saving && (thought.id != audioService.activeThoughtId)) {

            audioService.audioContext.thoughts.splice(i, 1);
            ++removed;
          }
        }
      }

      audioService.audioContext.totalThoughts -= removed;

      updateLocalContext();
    };

    audioService.getThought = function getThought(thoughtId) {

      if (audioService.audioContext.thoughts) {
        for (var i = 0; i < audioService.audioContext.thoughts.length; ++i) {
          var thought = audioService.audioContext.thoughts[i];

          if (thought.id == thoughtId || thought.generatedId == thoughtId)
            return thought;
        }
      }
    };

    audioService.createThought = function createThought(titleKey) {

      // Clear these since we don't want to mess up the numbering.
      audioService.clearNonPersistedThoughts();

      var namePrefix = titleKey ? $translate.instant(titleKey) : $translate.instant('THOUGHT_RECORD');


      var titleRegexStr = namePrefix.replace(/ /g, '\\s');
      titleRegexStr += '\\s[0-9]*';

      var titleRegex = new RegExp(titleRegexStr);

      var maxId = 0;

      // Go through and find the thought with the maximum number.
      if (audioService.audioContext.thoughts) {
        for (var i = 0; i < audioService.audioContext.thoughts.length; ++i) {

          var thoughtTitle = audioService.audioContext.thoughts[i].title;
          if (titleRegex.test(thoughtTitle)) {

            var pieces = thoughtTitle.split(" ");

            // We could end up with a blank one in the middle. I think from
            // legacy thoughts that had a bad name generation.
            var id = parseInt(pieces[pieces.length - 1]);
            if (id > maxId)
              maxId = id;
          }
        }
      }

      var newTitle = namePrefix + ' ' + (maxId + 1);

      var newThought = {
        id: generateGUID(),
        title: newTitle,
        createdAt: new Date().getTime(),
        createdAtString: new Date().toString(),
        recordings: {}
      };

      if (!audioService.audioContext.thoughts)
        audioService.audioContext.thoughts = [];

      audioService.audioContext.thoughts.splice(0, 0, newThought);
      ++audioService.audioContext.totalThoughts;

      return newThought;
    };

    audioService.addRecording = function addRecording(localUrl, filename, type, duration, thoughtId, notes) {

      // Add the audio recording to the local set.
      var newRecording = {
        id: generateGUID(),
        title: filename,
        type: type,
        duration: duration,
        recordedAt: new Date().getTime(),
        recordedAtString: new Date().toString(),
        localUrl: localUrl,
        url: filename, // So that it can reload it locally without needing the secure URL.
        notes: notes // for text thoughts
      };

      var thought = audioService.getThought(thoughtId);

      thought.recordings[type] = newRecording;

      return newRecording;
    };

    audioService.addTag = function addTag(thought, recordingType, tagString, tagTypeString, tagTime, tagSpan) {

      var recording = thought.recordings[recordingType];

      var tagToSubmit = {
        tagString: tagString,
        tagTypeString: tagTypeString, // Generally positive or negative.
        tagTime: tagTime
      };

      if (tagSpan)
        tagToSubmit.tagSpan = tagSpan;

      if (recording.tags)
        recording.tags.push(tagToSubmit);
      else
        recording.tags = [tagToSubmit];
    };

    audioService.addDeprecatedTags = function addDeprecatedTags(thought, marks) {

      var recording = thought.recordings.thought; // Looks weird. Thought happened to be the type name

      var tagsToSubmit = [];

      for (var i = 0; i < marks.length; ++i) {

        var mark = marks[i];

        tagsToSubmit.push({
          // recordingId: recording.id, // We don't know the recording ID yet.
          tagTypeString: mark.positive ? 'positive' : 'negative',
          tagTime: mark.tagTime,
          tagString: mark.tags.join(',')
        });
      }

      if (recording.tags)
        Array.prototype.push.apply(recording.tags, tagsToSubmit);
      else
        recording.tags = tagsToSubmit;
    };


    function postTags(recording) {

      if (recording.tags) {

        for (var i = 0; i < recording.tags.length; ++i) {

          recording.tags[i].recordingId = recording.id;
        }
        return authHttp.post(Environment.serverURL + '/audio/tag', {
          tags: recording.tags
        });
      }
    }

    function postRecording(recording, thoughtId) {

      var params = {};
      params.title = recording.title;
      params.type = recording.type;
      params.duration = recording.duration;
      params.thoughtId = thoughtId;

      if (recording.localUrl) {
        // TODO This is just copied. Need the data out of the recording.

        var win = function(r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response); // This should be the recordingId
          console.log("Sent = " + r.bytesSent);

          recording.id = +r.response;

          postTags(recording);
        };

        var fail = function(error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        };

        console.log("got fileEntry for upload");

        var options = new FileUploadOptions();
        options.fileKey = 'file';
        options.fileName = recording.title;
        options.mimeType = recording.title.endsWith('.mp4') ? 'audio/mp4' : 'audio/amr'; // TODO Better handling?

        options.params = params;

        // Add the session header so that the request will be authenticated.
        var headers = {
          Session: TokenService.getToken()
        };

        options.headers = headers;


        console.log("uploading local url : " + recording.localUrl);

        if (Environment.isOnline()) {
          if (window.FileTransfer) {
            var ft = new FileTransfer();
            ft.upload(recording.localUrl, encodeURI(Environment.serverURL + '/audio/upload'), win, fail, options);
          } else {
            console.log("WARNING: Can not upload file.");
          }
        } else {
          console.log("Cannot handle offline upload yet.");
        }
      } else {

        params.notes = recording.notes;

        // Otherwise we are handling a text recording.

        authHttp.post(Environment.serverURL + '/audio/postTextRecording', params)
          .success(function(recordingId) {

            recording.id = +recordingId;

            postTags(recording);
          })
          .error(function(data, status, headers, config) {

            console.log("Error posting recpoding: " + data);
          });
      }
    }

    audioService.postThought = function postThought(thoughtId, type) {

      // Record that we are saving the thought so that it is not
      // removed.
      var thought = audioService.getThought(thoughtId);
      thought.thoughtType = type;
      thought.saving = true;

      authHttp.post(Environment.serverURL + '/audio/createThoughtWithType', {
          title: thought.title,
          thoughtType: type
        })
        .success(function(id) {

          thought.generatedId = thought.id;
          thought.id = id;

          // updateLocalContext();

          // Now that we have a thoughtId, upload the recordings.
          for (var key in thought.recordings) {

            var recording = thought.recordings[key];

            postRecording(recording, thought.id);
          }
        });
    };

    audioService.archiveThought = function archiveThought(thoughtId) {

      var ret = createPromise();

      var successFn = function successFn(){
        --audioService.audioContext.totalThoughts;

        if (ret.successCallback)
          ret.successCallback();
      };

      var errorFn = function errorFn(data, status, headers, config){
        console.log("Error archiving thought: " + data);

        if (ret.errorCallback)
          ret.errorCallback();
      };

      if (audioService.audioContext.thoughts) {
        for (var i = 0; i < audioService.audioContext.thoughts.length; ++i) {

          var thought = audioService.audioContext.thoughts[i];
          if (thought.id == thoughtId) {

            audioService.audioContext.thoughts.splice(i, 1);

            authHttp.post(Environment.serverURL + '/audio/archiveThought', thoughtId)
              .success(successFn)
              .error(errorFn);

            break;
          }
        }
      }

      return ret;
    };

    audioService.updateThoughtTitle = function updateThoughtTitle(thoughtId, title) {

      if (audioService.audioContext.thoughts) {
        for (var i = 0; i < audioService.audioContext.thoughts.length; ++i) {

          var thought = audioService.audioContext.thoughts[i];
          if (thought.id == thoughtId) {

            thought.title = title;

            updateLocalContext();

            authHttp.post(Environment.serverURL + '/audio/updateThoughtTitle', {
              thoughtId: thoughtId,
              title: title
            });

            break;
          }
        }
      }
    };

    audioService.loadMoreThoughts = function loadMoreThoughts(offset, limit) {

      var ret = createPromise();

      authHttp.get(Environment.serverURL + '/audio/thoughts?offset=' + offset + '&limit=' + limit)
        .success(function(newThoughts) {

          if (newThoughts) {

            if (!audioService.audioContext.thoughts)
              audioService.audioContext.thoughts = [];

            for (var i = 0; i < newThoughts.length; ++i) {

              var newThought = newThoughts[i];

              var found = false;
              for (var j = 0; j < audioService.audioContext.thoughts.length; ++j) {

                var oldThought = audioService.audioContext.thoughts[j];

                if (oldThought.id == newThought.id) {

                  found = true;
                  break;
                }
              }

              if (!found) {
                // We DO NOT want this stored locally in persisted storage because it
                // can get way too big.
                audioService.audioContext.thoughts.push(newThought);
              }
            }
          }

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    return audioService;

  }
]);

var servicesModule = angular.module('authService', []);


// This factory is only evaluated once, and authHttp is memorized. That is,
// future requests to authHttp service return the same instance of authHttp.

servicesModule.factory('authHttp', ['$http','TokenService', function($http, TokenService) {

  var authHttp = {};

  // Update the access token and expiration time. If the current time is less than
  // the expiration time, the sessionId will be sent back to the server.
  authHttp.update = function update(headers) {
    var localHeaders = headers();
    var value = localHeaders.session;

    if (value) {
      var params = value.split(";");

      var token = params[0].split("=")[1];
      var expires = params[1].split("=")[1];

      TokenService.update(token, expires);
    }
  };

  authHttp.removeSession = function removeSession() {

    TokenService.clear();
  };

  authHttp.addPlatform = function addPlatform(config) {

    // This can be hard to determine on the server side because Android web views
    // look just like a Chrome browser.
    if (window.device)
      config.headers.Platform = window.device.platform.toLowerCase();
  };

  authHttp.addTimezone = function addTimezone(config) {
    config.headers = config.headers || {};
    config.headers.TimezoneLocale = authHttp.activeTimezone;
  };

  // This sets a preferred timezone which will override anything that is
  authHttp.setActiveTimezone = function setActiveTimezone(tz) {
    authHttp.activeTimezone = tz;
  };

  // Append the right header to the request
  var extendHeaders = function extendHeaders(config) {
    config.headers = config.headers || {};

    config.headers.Session = TokenService.getToken();

    authHttp.addPlatform(config);
    authHttp.addTimezone(config);
  };

  // Do this for each $http call
  angular.forEach(['get', 'delete', 'head', 'jsonp'], function(name) {

    authHttp[name] = function(url, config) {
      config = config || {};
      extendHeaders(config);

      // Required for sending cookies.
      config.withCredentials = true;

      return $http[name](url, config);
    };

  });

    angular.forEach(['post', 'put'], function(name) {

    authHttp[name] = function(url, data, config) {
      config = config || {};
      extendHeaders(config);

      // Required for sending cookies.
      config.withCredentials = true;

      return $http[name](url, data, config);
    };

  });


  return authHttp;

}]);

servicesModule.factory('myHttpInterceptor', ['$q','$injector', function ($q, $injector ) {
  return {
    'response': function(response) {
        var session = response.headers().session;

        if (session) {
            var params = session.split(";");
            var responseToken = params[0].split("=")[1];
            if (responseToken) {
                console.log("Updating auth token: " + responseToken );
                var authHttp = $injector.get('authHttp');
                authHttp.update(response.headers);
            }
        }
        return response;
    }
  };
}]);

servicesModule.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
}]);

var servicesModule = angular.module('careteamService', []);

servicesModule.factory('CareteamService', ['authHttp', 'Environment',
 function(authHttp, Environment) {

  var BASE_URL = Environment.serverURL + '/careteam';

  var careteamService = {
    initialized: false
  };

  /**
   * Transforms an object into query string.
   * @param {Object} options 
   */
  function optionsToQueryString(options) {
    return _
      .chain(options)
      .entries()
      .map(function(pair) {
        return _.join(pair, '=');
      })
      .join('&')
      .value();
  }

  careteamService.getAllIndividuals = function(options) {
    var qs = optionsToQueryString({
      currentPage: options.page,
      sortAscending: options.sortAscending,
      sortField: options.sortField
    });
    return authHttp.get(BASE_URL + '/allindividuals?' + qs);
  };

  careteamService.getAssignedIndividuals = function(options) {
    var qs = optionsToQueryString({
      currentPage: options.page,
      sortAscending: options.sortAscending,
      sortField: options.sortField
    });
    return authHttp.get(BASE_URL + '/assignedindividuals?' + qs);
  };

  careteamService.getYourIndividuals = function(options) {
    var qs = optionsToQueryString({
      currentPage: options.page,
      sortAscending: options.sortAscending,
      sortField: options.sortField
    });
    return authHttp.get(BASE_URL + '/yourindividuals?' + qs);
  };

  careteamService.markAsRead = function(post) {
    var data = {
      'groupId': post.groupId,
      'userId': post.creatorId,
      'groupPostId': post.id
    };
    return authHttp.post(BASE_URL + '/markasread', data);
  };

  careteamService.assignCoachToIndividual = function(coachId, individualId) {
    return authHttp.post(BASE_URL + '/assign/' + coachId + '/' + individualId);
  };

  careteamService.getCoach = function getCoach(coachId) {
    return authHttp.get(BASE_URL + '/coach/' + coachId);
  };

  careteamService.getAllCoaches = function(options) {
    var page = (options && options.page) || 1;

    return authHttp.get(BASE_URL + '/coaches?currentPage=' + page);
  };

  return careteamService;

 }]);
var servicesModule = angular.module('environmentService', []);

// This factory is only evaluated once, and authHttp is memorized. That is,
// future requests to authHttp service return the same instance of authHttp

servicesModule.factory('Environment', ['$rootScope', '$ionicPlatform', '$interval', '$timeout', function($rootScope, $ionicPlatform, $interval, $timeout) {


  // Temporary dev settings before setting up modules
  var env = {};
  if(window.PACIFICA_DEV_SETTINGS) env = window.PACIFICA_DEV_SETTINGS;

  var onlineCheckInterval;

  var localData = {
    online: true, // will get overridden by the app.
  };

  env.isDebug = function isDebug() {

    return !!env.isDebuggable;
  };

  // Useful for determining whether or not things like drag gestures should be applied.
  env.isWeb = function isWeb() {

    return false;
  };

  env.isWebDebug = function isWebDebug() { // Just for debugging in the browser.
      if (window.webDebug) return window.webDebug;
      else return false;
  };

  // The mobile applications may use secure local storage. The web may not as it exposes
  // things like the session token to javascript.
  env.isStorageAllowed = function isStorageAllowed() {

    return env.storageAllowed;
  };

  function onOnline() {
    console.log("ONLINE");

    localData.online = true;

    $rootScope.$broadcast('event:online');
  }

  function onOffline() {
    console.log("OFFLINE");

    localData.online = false;

    $rootScope.$broadcast('event:offline');
  }

  // Poll while the app is initializing.
  // See: https://github.com/pacifica-app/pacifica/issues/3418
  // For older Android versions, we cannot rely on offline/online events while the DOM/platform is initializing.
  env.checkOnlineStatus = function checkOnlineStatus() {
    if(!navigator && !navigator.connection)
      return;
    
    var onlineStatus;
    if (env.isIos()) {
      onlineStatus = navigator.connection.type != 'none';
    } else {
      // For Android, we cannot rely on navigator.connection.type due to this issue: https://github.com/apache/cordova-plugin-network-information/issues/64
      onlineStatus = (navigator.connection.type != 'none') || navigator.onLine;
    }

    if (onlineStatus && !localData.online) {
      onOnline();
    }
    else if (!onlineStatus && localData.online) {
      onOffline();
    }
  };
  
  function setOnlineCheckInterval(){
    onlineCheckInterval = $interval(env.checkOnlineStatus, 300);

    // The interval is only for devices (specifically Android), so we don't need it running on the web.
    if (env.isWeb() || env.isWebDebug())
      setCancelOnlineCheck();
  }
  
  setOnlineCheckInterval();

  function onDeviceReady() {
    if (navigator && navigator.connection) {
      localData.online = navigator.connection.type != 'none'; // Connection object not available on Android?

      if (localData.online)
        onOnline();
      else
        onOffline();
    }
    
    if (window.cordova && window.cordova.getAppVersion) {
      window.cordova.getAppVersion.getVersionNumber(function (version) {
        localData.appVersion = version;
      });
    }

    $ionicPlatform.on("online", onOnline);
    $ionicPlatform.on("offline", onOffline);
    
    // Cancel the interval since the online/offline events seem to work fine after everything is initialized.
    $timeout(setCancelOnlineCheck, 5000);
  }
  
  function setCancelOnlineCheck(){
    if(!onlineCheckInterval)
      return;
    $interval.cancel(onlineCheckInterval);
    onlineCheckInterval = null;
  }
  
  $ionicPlatform.on('resume', function(){
    if(onlineCheckInterval)
      return;
    setOnlineCheckInterval();
    $timeout(setCancelOnlineCheck, 5000);
  });

  $ionicPlatform.ready(onDeviceReady);

  env.isOnline = function isOnline() {
    return localData.online;
  };

  env.isDevelopment = function isDevelopment() {
    return env.development;
  };

  env.isIos = function isIos() {
    return window.device && window.device.platform && (window.device.platform.toLowerCase() == 'ios');
  };

  env.isIPad = function isIPad() {

    return window.device && window.device.model && (window.device.model.indexOf('iPad') >= 0);
  };

  env.isIphoneX = function isIphoneX() {
    var matchingDevicePixelRatio = window.devicePixelRatio && window.devicePixelRatio === 3;
    var matchingDimensions = $(window).width() === 375 && $(window).height() === 812;
    return env.isIos() && matchingDevicePixelRatio && matchingDimensions;
  };

  env.isAndroid = function isAndroid() {
    return window.device && window.device.platform && window.device.platform.toLowerCase() == 'android';
  };

  env.getDeviceMajorVersion = function getDeviceMajorVersion() {

    var version = -1;

    if (window.device && window.device.version) {

      var index = window.device.version.indexOf('.');
      if (index > 0) {
        version = +window.device.version.substring(0, index);
      }
    }

    return version;
  };

  env.getAppVersion = function getAppVersion() {
    return localData.appVersion;
  };

  env.getGATrackingCode = function getGATrackingCode() {
    return env.gaTrackingCode;
  };

  env.getDevEnv = function getDevEnv(){
    var qaMatch = env.serverURL.match('qa');
    if(qaMatch && qaMatch.length)
      return 'QA';
    var devMatch = env.serverURL.match('dev');
    if(devMatch && devMatch.length)
      return 'DEV'; 
    var ptMatch = env.serverURL.match('pt');
    if(devMatch && devMatch.length)
      return 'PT'; 
  };

  return env;
}]);
var servicesModule = angular.module('errorService', []);

servicesModule.factory('ErrorService', function() {

  return {
    errorMessage: null,
    setError: function(msg) {
      this.errorMessage = msg;
    },
    clear: function() {
      this.errorMessage = null;
    }
  };
});

// register the interceptor as a service
// intercepts ALL angular ajax HTTP calls
servicesModule.factory('errorHttpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
  return {
    // optional method
    'responseError': function(rejection) {
      var requestUrl = rejection.config.url;
      var attemptedLogin = _.endsWith(requestUrl, '/login');
      var context = {
        attemptedLogin: attemptedLogin
      };

      if (rejection.status == 401) {
          $rootScope.$broadcast('event:loginRequired', context);
      }

      return $q.reject(rejection);
    }
  };
}]);

// Add the error service as an interceptor.
servicesModule.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
  }
]);

var servicesModule = angular.module('feedService', []);

servicesModule.factory('FeedService', ['$q', 'GeneralService', '$translate', 'StorageService', 'authHttp', 'Environment',
  function($q, GeneralService, $translate, StorageService, authHttp, Environment) {

  var feedService = {
    settings: ['NEVER', 'RARELY', 'SOMETIMES', 'OFTEN', 'ALWAYS'],
    dailyDownVotes: [],
    dailyUpVotes: [],
    feedSettings: {},
    feedContext: {}
  };

  function setVoteStorageItem(){
    var feedVotes = {
      day: GeneralService.getTodayString(),
      dailyUpVotes: feedService.dailyUpVotes,
      dailyDownVotes: feedService.dailyDownVotes
    };
    StorageService.setItem('feedVotes', JSON.stringify(feedVotes));
  }

  function updateLocalFeedContext() {
    StorageService.setItem('feedContext', JSON.stringify(feedService.feedContext));
  }

  function updateDailyDownVotes(pref){
    feedService.settingDownVotedSuccess();
    if(!feedService.wasDownVoted(pref)){
      feedService.dailyDownVotes.push(pref);
      setVoteStorageItem();
    }
  }

  function updateDailyUpVotes(pref){
    feedService.settingUpVotedSuccess();
    if(!feedService.wasUpVoted(pref)){
      feedService.dailyUpVotes.push(pref);
      setVoteStorageItem();
    }
  }

  feedService.setFeedContext = function setFeedContext(feedContext) {
    feedService.feedContext = feedContext;
    updateLocalFeedContext();
  };

  feedService.setDiscoverPreferences = function setDiscoverPreferences(pref, val, successCallback, errorCallback){
    authHttp.post(Environment.serverURL + '/feed/prefs/' +  pref, {value: val})
      .success(function(data){
        var setting = feedService.getFeedPreferenceByPref(pref);
        setting.value = val;
        if(successCallback)
          successCallback(data);
      })
      .error(function(err){
        if(errorCallback)
          errorCallback(err);
      });
  };

  feedService.getFeedSettings = function getFeedSettings(){
    authHttp.get(Environment.serverURL + '/feed/prefs/')
      .success(function(data){
        feedService.setUserFeedSettings(data);
      })
      .error(function(err){
        console.log(err);
      });
  };

  feedService.getFeedPreferenceByPref = function getFeedPreferenceByPref(pref){
    var index = _.findIndex(feedService.feedSettings, {name: pref});
    return feedService.feedSettings[index];
  };

  feedService.setUserFeedSettings = function setUserFeedSettings(data){
    feedService.feedSettings = data;
  };

  feedService.getUserFeedSettings = function getUserFeedSettings(){
    return feedService.feedSettings;
  };

  feedService.getFeedItems = function getFeedItems(){
    return feedService.feedContext.feedItems;
  };

  feedService.getItemOfType = function getItemOfType(type) {
    return _.find(feedService.feedContext.feedItems, function(item) { return item.type === type; });
  };

  feedService.hasItemOfType = function hasItemOfType(type){
    return _.includes(feedService.getCurrentItemTypes(), type);
  };

  feedService.getCurrentItemTypes = function getCurrentItemTypes() {
    return _.map(feedService.feedContext.feedItems, function(i) { return i.type; } );
  };

  feedService.voteLocalCommunityPost = function voteLocalCommunityPost(type) {  // type can be "up" or "remove"
    // This function mutates the the community feedItem in feedContext.feedItems
    var addendum = type === 'up' ? 1 : -1;  // add 1 if it's an up vote, remove 1 if they are removing their vote
    var communityItem = feedService.getItemOfType('community');
    var ndx = _.findIndex(feedService.feedContext.feedItems, communityItem);
    feedService.feedContext.feedItems[ndx].post.score += addendum;
    feedService.feedContext.feedItems[ndx].vote = {up: (type === 'up') ? true : false };
  };

  feedService.getPrefOptions = function getPrefOptions(){
    return feedService.settings;
  };

  feedService.settingUpVotedSuccess = function(){
    var message = $translate.instant('FEED_ITEM_UPVOTED');
    GeneralService.showToast(message, true, 'bottom');
  };

  feedService.settingDownVotedSuccess = function(){
    var message = $translate.instant('FEED_ITEM_DOWNVOTED');
    GeneralService.showToast(message, true, 'bottom');
  };

  feedService.upVote = function upVote(pref){
    
    var currentVal = feedService.getFeedPreferenceByPref(pref);
    var index = feedService.settings.indexOf(currentVal.value);
    
    if(index + 1 == feedService.settings.length){ // already set to always
      feedService.settingUpVotedSuccess();
      return;
    } else {
      feedService.setDiscoverPreferences(
        pref,
        feedService.settings[index + 1],
        function(){
          updateDailyUpVotes(pref);
        },
        function(err){
          // we fail silently here
          updateDailyUpVotes(pref);
          console.log(err);
        }
      );
    }
  };

  feedService.wasUpVoted = function wasUpVoted(pref){
    return feedService.dailyUpVotes.indexOf(pref) > -1;
  };

  feedService.wasDownVoted = function wasDownVoted(pref){
    //need to see if they changed their feed settings too
    var userSettings = feedService.getUserFeedSettings();
    var settingObj = userSettings[_.findIndex(userSettings, {name: pref})];
    if(settingObj && settingObj.value == 'NEVER')
      return true;
    return feedService.dailyDownVotes.indexOf(pref) > -1;
  };

  feedService.downVote = function downVote(pref){
    
    var currentVal = feedService.getFeedPreferenceByPref(pref);
    var index = feedService.settings.indexOf(currentVal.value);

    feedService.setDiscoverPreferences(
      pref,
      feedService.settings[index - 1],
      function(){
        updateDailyDownVotes(pref);
      },
      function(err){
        // we fail silently here since the item gets removed
        // from the feed client side
        updateDailyDownVotes(pref);
        console.log(err);
      }
    );

  };

  feedService.initFromLocalStorage = function initFromLocalStorage(){
    return $q.all([
      StorageService.getItemAsync('feedVotes')
        .then(function(feedVotes) {
          if (feedVotes) {
            feedVotes = JSON.parse(feedVotes);
            if(feedVotes.day == GeneralService.getTodayString()){
              feedService.dailyUpVotes = feedVotes.dailyUpVotes;
              feedService.dailyDownVotes = feedVotes.dailyDownVotes;
            } else {
              StorageService.removeItem('feedVotes');
            }
          }
        }),
      StorageService.getItemAsync('feedContext')
        .then(function(feedContext) {
          if (feedContext) {
            feedContext = JSON.parse(feedContext);
            if (feedContext) {
              feedService.feedContext = feedContext;
            }
          }
        })
    ]);
  };

  feedService.clearData = function clearData() {
    feedService.dailyDownVotes = [];
    feedService.dailyUpVotes = [];
    feedService.feedContext = {};
  };

  return feedService;

}]);

var servicesModule = angular.module('generalService', []);

var EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

servicesModule.factory('GeneralService', ['$translate', 'Environment', '$ionicScrollDelegate', '$state', 'AccessibilityService',
  function($translate, Environment, $ionicScrollDelegate, $state, AccessibilityService) {

  var generalService = {

    COLORS: ['#1bc88c', '#1ebba7', '#27a6d3', '#2f96f4', '#ff8d6e', '#ff7369', '#ff6669'],

    // these names are an artifact of the old color palette, but their css references have been udpated
    // with the correct rgb values although these names are not a totally accurate description anymore
    COLOR_NAMES: ['green', 'turquoise', 'cyan', 'blue', 'yellow', 'orange', 'red'],

    MILLISECONDS_IN_HOUR: 1000 * 60 * 60,
    MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24,
    retrievingLastActive: false,
    lastActiveTime: null
  };

  generalService.openInAppBrowserURL = function openInAppBrowserURL(url) {
    if (typeof cordova != "undefined" && cordova.InAppBrowser)
      cordova.InAppBrowser.open(url, '_system');
  };

  generalService.isEmailValid = function isEmailValid(email) {

    return EMAIL_REGEX.test(String(email).toLowerCase());
  };

  function getColorInternal(colorName, colorNameList, colorList) {

    if (!colorName)
      colorName = [0];

    // always default to green if there isn't one.
    colorName = colorName.toLowerCase();

    var index = colorNameList.indexOf(colorName);
    if (index >= 0)
      return colorList[index];

    return colorList[0];
  }

  generalService.hideToast = function hideToast() {

    if (window.plugins && window.plugins.toast)
      window.plugins.toast.hide();
  };

  // Show a toast message. Defaults to long (4000 ms) and displayed on the top
  generalService.showToast = function showToast(message, short, position, touchCallback, styling) {

    if (window.plugins && window.plugins.toast) {

      var multiplier = window.devicePixelRatio;

      var pixelsY;
      if (!position) {
        pixelsY = 0;
      } else {
        if (Environment.isAndroid()) {
          pixelsY = -90*multiplier;
        } else if (Environment.isIphoneX()) {
          pixelsY = -80;
        } else {
          pixelsY = -50;
        }
      }
      // todo: make position a required param (and make sure we pass it everywhere) so we can get rid of this mess
      var toastPosition;
      if (position === 'center') {
        toastPosition = "center";
      }
      else if (position && position != 'center') {
        toastPosition = "bottom";
      } else {
        toastPosition = "top";
      }

      // https://www.npmjs.com/package/cordova-plugin-x-toast#4-usage
      var options = {
        message: message,
        duration: short ? "short" : 8000, // 2000 ms
        position: toastPosition,
        addPixelsY: pixelsY,
        styling: _.merge({
          backgroundColor: '#FFFFFF',
          textColor: '#000000'
        }, styling || {})
      };

      AccessibilityService.onceInitialized(function() {
        if (AccessibilityService.usingScreenReader) {
          AccessibilityService.speak(message, 1);
        }
      });

      window.plugins.toast.showWithOptions(options,
        function(result) {

          if (result && result.event == 'touch') {

            if (touchCallback)
              touchCallback();
          }
        }
      );
    }
  };

  generalService.getColor = function getColor(colorName) {

    return getColorInternal(colorName, generalService.COLOR_NAMES, generalService.COLORS);
  };

  generalService.getDifferenceInDays = function getDifferenceInDays(d1, d2) {

    var diff = Math.abs(d2 - d1);

    return Math.floor(diff / generalService.MILLISECONDS_IN_DAY);
  };

  generalService.getTodayString = function getTodayString() {
    var d = new Date();
    return generalService.getDayString(d);
  };

  // This is used for data representations, not for general display
  generalService.getDayString = function getDayString(d) {
    var currDate = d.getDate();
    var currMonth = d.getMonth() + 1;
    var currYear = d.getFullYear();

    return currYear + '-' +
      (currMonth < 10 ? '0' : '') + currMonth + '-' +
      (currDate < 10 ? '0' : '') + currDate;
  };

  // This is used for data representations, not for general display
  generalService.getUTCDayString = function getUTCDayString(d) {
    var currDate = d.getUTCDate();
    var currMonth = d.getUTCMonth() + 1;
    var currYear = d.getUTCFullYear();

    return currYear + '-' +
      (currMonth < 10 ? '0' : '') + currMonth + '-' +
      (currDate < 10 ? '0' : '') + currDate;
  };

  // Use this for displaying to the screen.
  generalService.getDateDisplay = function getDateDisplay(date) {

    var year = '' + date.getFullYear();
    year = year.substring(2);

    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + year;
  };

  generalService.getMinuteDisplay = function getMinuteDisplay(d) {

    var minute = d.getMinutes();
    var hour = d.getHours();

    var hourDisplay = hour;
    if (hourDisplay === 0)
      hourDisplay = 12;
    else if (hourDisplay > 12)
      hourDisplay = hourDisplay - 12;

    return hourDisplay + ":" + (minute < 10 ? '0' : '') + minute + (hour >= 12 ? 'PM' : 'AM');
  };

  generalService.toTitleCase = function toTitleCase(str) {

    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // This is a bit annoying. We can't use moment's fromNow function because
  // the value will keep changing, causing angular's digest cycle to keep
  // running, causing an infinite loop.
  generalService.getElapsedTimeDisplay = function getElapsedTimeDisplay(currentDate, startDate) {

    var timestamp = moment(currentDate);

    var start = moment(startDate);

    var diff = moment.duration(timestamp.diff(start));
    var minutes = Math.round(diff.asMinutes());
    var key;
      
    if (Math.abs(minutes) > 60) {

      var hours = Math.round(diff.asHours());

      if (Math.abs(hours) == 1) {
        if (hours < 0) {
          return $translate.instant('ONE_HOUR_AGO');
        }
        else {
          return $translate.instant('IN_ONE_HOUR');
        }
      }
      if (hours < 0) {

        hours = -hours;
        key = 'XXX_HOURS_AGO';
      }
      else {

        key = 'IN_XXX_HOURS';
      }

      return $translate.instant(key).replace('XXXHOURSXXX', hours);
    }
    else {

      if (minutes < 0) {

        minutes = -minutes;
        key = 'XXX_MINUTES_AGO';
      }
      else {
        key = 'IN_XXX_MINUTES';
      }

      return $translate.instant(key).replace('XXXMINUTESXXX', minutes);
    }
  };

  function getTimePortionDisplay(time, removeLeadingZero) {

    if (!time)
      return removeLeadingZero ? "0" : "00";
    else if (time < 10 && !removeLeadingZero)
      return "0" + time;
    else
      return "" + time;
  }

  generalService.getTimeDisplay = function getTimeDisplay(elapsed, removeLeadingZero, roundToMinute) {

    var minutes = Math.floor(elapsed / 60);

    var seconds = Math.floor(elapsed - (minutes * 60));

    var minuteDisplay = getTimePortionDisplay(minutes, removeLeadingZero);
    var secondDisplay = getTimePortionDisplay(seconds, false);

    if(roundToMinute){
      if(secondDisplay > 30){
        return parseInt(minuteDisplay) + 1;
      } else {
        return minuteDisplay;
      }
    }
    return minuteDisplay + ":" + secondDisplay;
  };

  generalService.timeUntil = function timeUntil(dateTime, unit) {
    var eventdate = moment(dateTime);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, unit);
  };

  generalService.timeSince = function timeSince(dateTime, unit) {
    var eventdate = moment(dateTime);
    var todaysdate = moment();
    return todaysdate.diff(eventdate, unit);
  };

  generalService.loadFile = function loadFile(src, callback) {
    function onFileSystemSuccess(fileSystem) {

      // Need to create file to record to it.
      fileSystem.root.getFile(src, {
        create: true,
        exclusive: false
      },
      function onGetSucceed(fileEntry) {
        callback(fileEntry);
      },
      function onGetFail() {
        console.log("did not get file.");
      });
    }

    function fail() {
      console.log("failed getting filesystem");
    }

    if (window.LocalFileSystem)
      window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, fail);
  };

  generalService.getUSStates = function getUSStates() {
    return {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
    };
  };

  generalService.retrieveLastActiveTime = function retrieveLastActiveTime(){
    // should happen once - on init or resume
    // store retrieving state so we don't stomp on the value in the setter
    generalService.retrievingLastActive = true;
    var lastActive = localStorage.getItem('last_active_time');
    if(lastActive){
      generalService.lastActiveTime = new Date(lastActive);
    } else {
      generalService.lastActiveTime = new Date();
    }
    generalService.retrievingLastActive = false;
    generalService.setLastActiveTime();
  };

  generalService.setLastActiveTime = function setLastActiveTime(){
    // set the time on each state change, so we can try to get close to an hour since last active
    // unless we are retrieving it for the first time
    if(generalService.retrievingLastActive)
      return;

    var newDate = new Date();
    generalService.lastActiveTime = newDate;
    localStorage.setItem('last_active_time', newDate);
  }; 

  generalService.getLastActiveTime = function getLastActiveTime(){
    // return this in homeCtrl to see if it's been 60 mins yet
    return generalService.lastActiveTime;
  };

  generalService.clearLastActiveTime = function clearLastActiveTime(){
    // once we've evaluated this on the home page, reset it
    localStorage.removeItem('last_active_time');
  };
  
  generalService.getCurrentYear = function getCurrentYear(){
    return moment().format('YYYY');
  };
  
  return generalService;

}]);

var servicesModule = angular.module('goalsService', []);

servicesModule.factory('GoalsService', ['$q', '$rootScope', '$timeout', 'authHttp', 'Environment', 'GeneralService', 'StorageService', 'AccountService', 'ActivityService', 'PathService', '$translate',
  function($q, $rootScope, $timeout, authHttp, Environment, GeneralService, StorageService, AccountService, ActivityService, PathService, $translate) {

    var goalsService = {

      // This is the list of goals for the account.
      accountGoals: [],

      // This is a map of the current day to the list of sub goals.
      accountSubGoals: {},

      lastActiveTab: undefined
    };

    goalsService.initFromLocalStorage = function(){
      return $q.all([
        StorageService.getItemAsync('accountGoals')
          .then(function(localGoals) {
            if (localGoals) {
              goalsService.accountGoals = JSON.parse(localGoals);
            }
          }),
        StorageService.getItemAsync('accountSubGoals')
          .then(function(localSubGoals) {
            if (localSubGoals) {
              goalsService.accountSubGoals = JSON.parse(localSubGoals);
            }
          })
      ]);
    };

    // The AccountService needs access to the sub goals, but it can't reference
    // this service, so it broadcasts to us.
    $rootScope.$on('event:checkPathMotivationProgress', function() {

      PathService.checkPathMotivationProgress();
    });

    function updateLocalAccountGoals() {

      StorageService.setItem('accountGoals', JSON.stringify(goalsService.accountGoals));
    }

    function updateLocalAccountSubGoals() {

      StorageService.setItem('accountSubGoals', JSON.stringify(goalsService.accountSubGoals));
    }

    goalsService.logout = function logout() {
      goalsService.accountGoals = [];
      goalsService.accountSubGoals = {};
    };

    // Helper methods to store view state. location.search does not play nicely, so
    // screw it, we'll just do it here.
    goalsService.getLastActiveTab = function getLastActiveTab() {
      return goalsService.lastActiveTab;
    };

    goalsService.setLastActiveTab = function setLastActiveTab(tab) {
      goalsService.lastActiveTab = tab;
    };

    goalsService.updateGoalsContext = function updateGoalsContext(){
      // when we update hw, we need to make sure goals are updated in case we added a new one
      authHttp.get(Environment.serverURL + '/goals/account')
        .success(function(ctx) {
          goalsService.setGoalContext(ctx);
        });
    };

    goalsService.setGoalContext = function setGoalContext(ctx) {

      // We want to be careful about just replacing the goal context here. The
      // context being loaded might not have some of the offline goals that
      // we submitted when coming back online.

      var existingGoals = goalsService.accountGoals;
      var existingSubGoals = goalsService.accountSubGoals;

      goalsService.accountGoals = ctx.accountGoals;
      goalsService.accountSubGoals = ctx.accountSubGoals;

      for (var i = 0; i < existingGoals.length; ++i) {

        var goal = existingGoals[i];
        if (goal.createdOffline && !isNumeric(goal.createdOffline)) {

          var found = false;
          for (var j = 0; j < goalsService.accountGoals.length; ++j) {

            if (goalsService.accountGoals[j].id == goal.id) {
              found = true;
              break;
            }
          }

          if (!found) {
            goalsService.accountGoals.push(goal);
          }
        }
      }

      for (var day in existingSubGoals) {

        var existingDaySubGoals = existingSubGoals[day];

        for (var k = 0; k < existingDaySubGoals.length; ++k) {

          var existingSubGoal = existingDaySubGoals[k];
          if (existingSubGoal.createdOffline && !isNumeric(existingSubGoal.id)) {

            var found2 = false;

            var newDaySubGoals = goalsService.accountSubGoals[day];
            for (var l = 0; l < existingDaySubGoals; ++l) {

              if (newDaySubGoals[l].id == existingSubGoal.id) {
                found2 = true;
                break;
              }
            }

            if (!found2) {
              if (!goalsService.accountSubGoals[day])
                goalsService.accountSubGoals[day] = [];

              goalsService.accountSubGoals[day].push(existingSubGoal);
            }
          }
        }
      }

      updateLocalAccountGoals();
      updateLocalAccountSubGoals();
    };


    goalsService.setOnboardingGoals = function setOnboardingGoals(goals){

      var ret = createPromise();

      var data = {
        lang: AccountService.getLocale(), // This should have been set when the app started.
        goals: goals
      };

      authHttp.post(Environment.serverURL + '/account/setGoals', data)
        .success(function(newGoals) {

          if (newGoals) {

            for (var i=0; i<newGoals.length; ++i) {
              var newGoal = newGoals[i];
              goalsService.accountGoals.push(newGoal);
            }
          }

          updateLocalAccountGoals();

          if (ret.successCallback)
            ret.successCallback(newGoals);
        })
        .error(function(data, status, headers, config) {

          // TODO Add to offline list
          console.log("Error creating onboarding goals: " + data);

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    goalsService.getAccountGoals = function getAccountGoals() {
      _.each(goalsService.accountGoals, function(goal){
        goalsService.getGoalKey(goal);
      });
      return goalsService.accountGoals;
    };

    goalsService.getAccountSubGoals = function getAccountSubGoals() {
      return goalsService.accountSubGoals;
    };

    goalsService.getGoal = function getGoal(goalId) {

      var goal;

      var goals = goalsService.accountGoals;
      for (var i = 0; i < goals.length; ++i) {

        if (goals[i].id == goalId) {

          goal = goals[i];

          break;
        }
      }

      return goal;
    };

    goalsService.getSubGoalById = function getSubGoalById(subGoalId) {

      for (var day in goalsService.accountSubGoals) {

        var daySubGoals = goalsService.accountSubGoals[day];

        for (var i = 0; i < daySubGoals.length; ++i) {

          var subGoal = daySubGoals[i];
          if (subGoal.id == subGoalId)
            return subGoal;
        }
      }

      return undefined;
    };

    goalsService.getSubGoal = function getSubGoal(day, subGoalId) {

      var subGoal;
      var subGoals = goalsService.accountSubGoals[day];

      // This should definitely exist...
      if (subGoals) {
        for (var i = 0; i < subGoals.length; ++i) {

          if (subGoals[i].id == subGoalId) {

            subGoal = subGoals[i];
            break;
          }
        }
      }

      return subGoal;
    };

    goalsService.getTodaysAchievedGoals = function getTodaysAchievedGoals() {

      var ret = [];

      var subGoals = goalsService.accountSubGoals;

      for (var day in subGoals) {

        var daysSubGoals = subGoals[day];

        for (var i = 0; i < daysSubGoals.length; ++i) {

          var daysSubGoal = daysSubGoals[i];

          if (goalsService.achievedOrSetSubGoalToday(daysSubGoal, true))
            ret.push(daysSubGoal);
        }
      }

      return ret;
    };

    goalsService.achievedSubGoal = function achievedSubGoal(subGoal) {

      return subGoal.achievedRecordedAt !== null && typeof subGoal.achievedRecordedAt !== 'undefined';
    };

    goalsService.achievedOrSetSubGoalToday = function achievedOrSetSubGoalToday(subGoal, checkCreate) {

      if (goalsService.achievedSubGoal(subGoal)) {

        var achievedDate = new Date(subGoal.achievedRecordedAtString);
        var achievedDay = GeneralService.getDayString(achievedDate);

        return (achievedDay == GeneralService.getTodayString());
      } else if(checkCreate){
        var createdDate = new Date(subGoal.createdAtString);
        var createdDay = GeneralService.getDayString(createdDate);
        
        return (createdDay == GeneralService.getTodayString());
      }

      return false;
    };

    $rootScope.$on('event:online',
      function() {

        postOfflineGoals();
      }
    );

    // Check to see if anything needs to be updated.
    function updateOfflineSubGoal(subGoal) {

      if (isNumeric(subGoal.id) && isNumeric(subGoal.goalId) && subGoal.achievedRecordedAtRequestUpdate) {

        localAchieveSubGoal(subGoal);
      }
    }

    function postAllOfflineSubGoals() {

      function postSubGoal(subGoal) {

        // If we have a numeric goal Id, but not a numeric subgoal ID,
        // we can go ahead and post the goal.
        if (subGoal.createdOffline && !isNumeric(subGoal.id) && isNumeric(subGoal.goalId)) {

          // we don't want this to get marked to upload again.
          subGoal.createdOffline = false;

          authHttp.post(Environment.serverURL + '/goals/account/addSubGoal', subGoal)
            .success(function(id) {

              // Store the id so that we have it. It will also be used to determine if we have offline goals
              subGoal.id = +id;

              updateLocalAccountSubGoals();

              PathService.setAccountSubGoals(goalsService.accountSubGoals);

              ActivityService.recordActivity('CREATED_EXPERIMENT');

              updateOfflineSubGoal(subGoal);
            })
            .error(function(data, status, headers, config) {

              // Try to submit it next time.
              subGoal.createdOffline = false;

              console.log("Error posting goal: " + data);

            });
        }
      }

      var subGoals = goalsService.accountSubGoals;
      for (var key in subGoals) {

        var daySubGoals = subGoals[key];
        for (var i = 0; i < daySubGoals.length; ++i) {

          var subGoal = daySubGoals[i];

          postSubGoal(subGoal);
        }
      }
    }

    function postOfflineSubGoals(oldGoalId, newGoalId) {

      function postSubGoal(subGoal) {

        if (!isNumeric(subGoal.id) && subGoal.goalId == oldGoalId) {

          subGoal.goalId = newGoalId;
          updateLocalAccountSubGoals();

          authHttp.post(Environment.serverURL + '/goals/account/addSubGoal', subGoal)
            .success(function(id) {

              // Store the id so that we have it. It will also be used to determine if we have offline goals
              subGoal.id = +id;

              updateLocalAccountSubGoals();

              updateOfflineSubGoal(subGoal);
            })
            .error(function(data, status, headers, config) {

              // TODO Add to offline list
              console.log("Error posting goal: " + data);

            });
        } else {
          updateOfflineSubGoal(subGoal);
        }
      }

      var subGoals = goalsService.accountSubGoals;
      for (var key in subGoals) {

        var daySubGoals = subGoals[key];
        for (var i = 0; i < daySubGoals.length; ++i) {

          var subGoal = daySubGoals[i];

          postSubGoal(subGoal);
        }
      }
    }

    function postOfflineGoals() {

      // First post any sub-goals that already have goal IDs. Once we post
      // any goals created offline, we'll individually post the associated
      // sub-goals.
      postAllOfflineSubGoals();

      function postGoal(goal) {
        if (!goal.id || !isNumeric(goal.id)) {

          authHttp.post(Environment.serverURL + '/goals/account/addGoal', {
              title: goal.title,
              color: goal.color
            })
            .success(function(id) {

              var oldGoalId = goal.id;

              // Store the id so that we have it.
              goal.id = +id;

              // Now that we have the id, we need to update any subgoals with the old ID
              postOfflineSubGoals(oldGoalId, goal.id);

              // Again, write the data to local storage so that the id is there. This id
              // will be used to determine whether or not we've recorded any offline data.
              updateLocalAccountGoals();
            })
            .error(function(data, status, headers, config) {

              // TODO Add to offline list
              console.log("Error posting goal: " + data);

            });
        }
      }

      var goals = goalsService.accountGoals;
      for (var i = 0; i < goals.length; ++i) {

        var goal = goals[i];

        postGoal(goal);
      }
    }

    goalsService.addGoal = function addGoal(title, color) {

      var newGoal = {
        title: title,
        color: color,
        createdAt: new Date().getTime()
      };

      // Add the goal to our local set of goals.
      goalsService.accountGoals.push(newGoal);

      // Write the data to local storage.
      updateLocalAccountGoals();

      var localCallback;

      // Trying something new. This returns like a promise and the success attribute will get set.
      var ret = createPromise();

      if (Environment.isOnline()) {
        authHttp.post(Environment.serverURL + '/goals/account/addGoal', {
            title: title,
            color: color
          })
          .success(function(id) {

            // Store the id so that we have it.
            newGoal.id = +id;

            // Again, write the data to local storage so that the id is there. This id
            // will be used to determine whether or not we've recorded any offline data.
            updateLocalAccountGoals();

            if (ret.successCallback)
              ret.successCallback(id);
          })
          .error(function(data, status, headers, config) {

            // TODO Add to offline list
            console.log("Error posting goal: " + data);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {

        // The goal needs an id in order for sub goals to be correctly initialized.
        newGoal.id = generateGUID();
        newGoal.createdOffline = true;

        updateLocalAccountGoals();

        $timeout(function() {
          if (localCallback)
            localCallback();
        });
      }

      return ret;
    };

    goalsService.archiveGoal = function archiveGoal(goalId) {

      var goals = goalsService.accountGoals;
      for (var i = 0; i < goals.length; ++i) {

        if (goals[i].id == goalId) {

          goals.splice(i, 1);

          updateLocalAccountGoals();

          // Remove any associated sub goals
          for (var key in goalsService.accountSubGoals) {

            var daySubGoals = goalsService.accountSubGoals[key];
            for (var j = daySubGoals.length - 1; j >= 0; --j) {

              var subGoal = daySubGoals[j];
              if (subGoal.goalId == goalId) {

                daySubGoals.splice(j, 1);
              }
            }
          }

          updateLocalAccountSubGoals();

          break;
        }
      }

      return authHttp.post(Environment.serverURL + '/goals/account/archiveGoal', goalId);
    };

    goalsService.updateGoal = function updateGoal(goalId, title, color) {

      var goal = goalsService.getGoal(goalId);

      if (goal) {

        goal.title = title;
        goal.color = color;

        updateLocalAccountGoals();

        if (Environment.isOnline()) {
          return authHttp.post(Environment.serverURL + '/goals/account/updateGoal', {
            goalId: goal.id,
            title: goal.title,
            color: goal.color
          });
        } else {
          return {
            success: function(callback) {

              if (callback)
                callback();
            }
          };
        }
      }
    };

    goalsService.addSubGoal = function addSubGoal(goalId, title, day, difficulty) {

      var newSubGoal = {
        goalId: goalId,
        title: title,
        day: day,
        difficulty: difficulty,
        createdAt: new Date().getTime()
      };

      var subGoalList = goalsService.accountSubGoals[day];

      if (!subGoalList) {
        subGoalList = [];
        goalsService.accountSubGoals[day] = subGoalList;
      }

      // Add the sub goal to our local set of sub goals.
      subGoalList.push(newSubGoal);

      // Write the data to local storage.
      updateLocalAccountSubGoals();

      var localSuccessCallback;
      var localErrorCallback;

      // Trying something new. This returns like a promise and the success attribute will get set.
      var ret = createPromise();

      if (Environment.isOnline()) {
        authHttp.post(Environment.serverURL + '/goals/account/addSubGoal', newSubGoal)
          .success(function(id) {

            // Store the id so that we have it. It will also be used to determine if we have offline goals
            newSubGoal.id = +id;

            updateLocalAccountSubGoals();

            PathService.setAccountSubGoals(goalsService.accountSubGoals);

            ActivityService.recordActivity('CREATED_EXPERIMENT');

            if (ret.successCallback)
              ret.successCallback();
          })
          .error(function(data, status, headers, config) {

            // TODO Add to offline list
            console.log("Error posting goal: " + data);

            if (ret.errorCallback)
              ret.errorCallback(data, status, headers, config);
          });
      } else {

        // Need to be able to reference it.
        newSubGoal.id = generateGUID();
        newSubGoal.createdOffline = true;

        updateLocalAccountSubGoals();

        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback();
        });
      }

      return ret;
    };

    function localAchieveSubGoal(subGoal, actualDifficulty) {

      if (subGoal) {

        // This could be getting passed in to handle an offline update.
        if (!goalsService.achievedSubGoal(subGoal)) {
          subGoal.achievedRecordedAt = new Date().getTime();
          subGoal.achievedRecordedAtString = new Date().toString();
          subGoal.actualDifficulty = actualDifficulty;

          updateLocalAccountSubGoals();

          // This is used to advance the daily activity.
          ActivityService.recordActivity('COMPLETED_EXPERIMENT');
        }
      }

      if (Environment.isOnline()) {
        return authHttp.post(Environment.serverURL + '/goals/account/achieveSubGoalWithDifficulty', {
          subGoalId: subGoal.id,
          actualDifficulty: actualDifficulty
        });
      } else {

        $rootScope.$on('event:online', function() {
          return authHttp.post(Environment.serverURL + '/goals/account/achieveSubGoalWithDifficulty', {
            subGoalId: subGoal.id,
            actualDifficulty: actualDifficulty
          });
        });

        subGoal.achievedRecordedAtRequestUpdate = true;

        var ret = createPromise();

        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback();
        });

        return ret;
      }
    }

    goalsService.achieveSubGoal = function achieveSubGoal(subGoalId, actualDifficulty) {

      var goalToUpdate = goalsService.getSubGoalById(subGoalId);

      return localAchieveSubGoal(goalToUpdate, actualDifficulty);
    };

    goalsService.archiveSubGoal = function archiveSubGoal(day, subGoalId) {

      console.log("Archive subGoal day:", day);

      // Not sure why this is necessary, but the day should be a date string. Sometimes we are passed a timestamp,
      // so we need to convert that to a date string.
      var goalDay = typeof(day) === "number" ? GeneralService.getUTCDayString(new Date(day)) : day;

      var subGoals = goalsService.accountSubGoals[goalDay];

      if (subGoals) {

        var subGoal = goalsService.getSubGoal(goalDay, subGoalId);

        var index = subGoals.indexOf(subGoal);

        if (index >= 0) {
          subGoals.splice(index, 1);

          updateLocalAccountSubGoals();

          return authHttp.post(Environment.serverURL + '/goals/account/archiveSubGoal', subGoalId);
        }
      }
    };

    goalsService.updateSubGoal = function updateSubGoal(subGoalId, goalId, title, day, difficulty) {

      var subGoal = goalsService.getSubGoal(day, subGoalId);

      if (subGoal) {

        subGoal.goalId = goalId;
        subGoal.day = day;
        subGoal.title = title;
        subGoal.difficulty = difficulty;

        updateLocalAccountSubGoals();

        if (Environment.isOnline()) {
          return authHttp.post(Environment.serverURL + '/goals/account/updateSubGoal', {
            subGoalId: subGoalId,
            goalId: goalId,
            title: title,
            day: day,
            difficulty: difficulty
          });
        }
      }

      var ret = createPromise();

      $timeout(function() {

        if (ret.successCallback)
          ret.successCallback();
      });

      return ret;
    };

    goalsService.getGoalKey = function getGoalKey(goal){
      var categories = goalsService.getNuxGoals();
      var translation;
      for(i=0;i < categories.length; i++){
        translation = $translate.instant(categories[i], {}, undefined, 'en');
        if(translation == goal.title){
          goal.displayKey = categories[i];
          break;
        }
      }
      if(!goal.displayKey)
        goal.displayKey = goal.title;
    };

    goalsService.getNuxGoals = function getNuxGoals(){
      return [
        'NUX_GOAL_DEPRESSION',
        'NUX_GOAL_CONFIDENCE',
        'NUX_GOAL_SOCIAL',
        'NUX_GOAL_HEALTH',
        'NUX_GOAL_GAD',
        'NUX_GOAL_THOUGHTS',
        'NUX_GOAL_MEDITATION',
        'NUX_GOAL_HOPE'
      ];
    };

    goalsService.getCategoryOrder = function getCategoryOrder(){
      return [
        'GOAL_LIST_CATEGORY_WORK_SCHOOL',
        'GOAL_LIST_CATEGORY_FRIENDS_FAMILY',
        'GOAL_LIST_CATEGORY_ROMANCE',
        'GOAL_LIST_CATEGORY_STRANGERS',
        'GOAL_LIST_CATEGORY_EATING',
        'GOAL_LIST_CATEGORY_DESTINATIONS',
        'GOAL_LIST_CATEGORY_PERFORMING',
        'GOAL_LIST_CATEGORY_TRANSPORTATION',
        'GOAL_LIST_CATEGORY_RELAX',
        'GOAL_LIST_CATEGORY_WILDCARDS',
        'GOAL_LIST_CATEGORY_LIFE_STEPS',
        'GOAL_LIST_CATEGORY_PLEASANT_ACTIVITIES'
      ];

    };

    goalsService.getSubGoalKeys = function getSubGoalKeys(){
      return [
        [
          'GOAL_LIST_WORK_SCHOOL_1',
          'GOAL_LIST_WORK_SCHOOL_2',
          'GOAL_LIST_WORK_SCHOOL_3',
          'GOAL_LIST_WORK_SCHOOL_4',
          'GOAL_LIST_WORK_SCHOOL_5',
          'GOAL_LIST_WORK_SCHOOL_6',
          'GOAL_LIST_WORK_SCHOOL_7',
          'GOAL_LIST_WORK_SCHOOL_8',
          'GOAL_LIST_WORK_SCHOOL_9',
          'GOAL_LIST_WORK_SCHOOL_10',
          'GOAL_LIST_WORK_SCHOOL_11',
          'GOAL_LIST_WORK_SCHOOL_12',
          'GOAL_LIST_WORK_SCHOOL_13'
        ],
        [
          'GOAL_LIST_FRIENDS_FAMILY_1',
          'GOAL_LIST_FRIENDS_FAMILY_2',
          'GOAL_LIST_FRIENDS_FAMILY_3',
          'GOAL_LIST_FRIENDS_FAMILY_4',
          'GOAL_LIST_FRIENDS_FAMILY_5',
          'GOAL_LIST_FRIENDS_FAMILY_6',
          'GOAL_LIST_FRIENDS_FAMILY_7',
        ],
        [
          'GOAL_LIST_ROMANCE_1',
          'GOAL_LIST_ROMANCE_2',
          'GOAL_LIST_ROMANCE_3',
          'GOAL_LIST_ROMANCE_4',
          'GOAL_LIST_ROMANCE_5',
          'GOAL_LIST_ROMANCE_6',
          'GOAL_LIST_ROMANCE_7'
        ],
        [
          'GOAL_LIST_STRANGERS_1',
          'GOAL_LIST_STRANGERS_2',
          'GOAL_LIST_STRANGERS_3',
          'GOAL_LIST_STRANGERS_4',
          'GOAL_LIST_STRANGERS_5',
          'GOAL_LIST_STRANGERS_6',
          'GOAL_LIST_STRANGERS_7'
        ],
        [
          'GOAL_LIST_EATING_1',
          'GOAL_LIST_EATING_2',
          'GOAL_LIST_EATING_3',
          'GOAL_LIST_EATING_4',
          'GOAL_LIST_EATING_5'
        ],
        [
          'GOAL_LIST_DESTINATIONS_1',
          'GOAL_LIST_DESTINATIONS_2',
          'GOAL_LIST_DESTINATIONS_3',
          'GOAL_LIST_DESTINATIONS_4',
          'GOAL_LIST_DESTINATIONS_5',
          'GOAL_LIST_DESTINATIONS_6',
          'GOAL_LIST_DESTINATIONS_7',
          'GOAL_LIST_DESTINATIONS_8',
          'GOAL_LIST_DESTINATIONS_9',
          'GOAL_LIST_DESTINATIONS_10',
          'GOAL_LIST_DESTINATIONS_11',
          'GOAL_LIST_DESTINATIONS_12',
          'GOAL_LIST_DESTINATIONS_13',
          'GOAL_LIST_DESTINATIONS_14',
          'GOAL_LIST_DESTINATIONS_15',
          'GOAL_LIST_DESTINATIONS_16',
          'GOAL_LIST_DESTINATIONS_17',
          'GOAL_LIST_DESTINATIONS_18',
          'GOAL_LIST_DESTINATIONS_19',
          'GOAL_LIST_DESTINATIONS_20',
          'GOAL_LIST_DESTINATIONS_21',
          'GOAL_LIST_DESTINATIONS_22',
          'GOAL_LIST_DESTINATIONS_23',
          'GOAL_LIST_DESTINATIONS_24',
          'GOAL_LIST_DESTINATIONS_25',
          'GOAL_LIST_DESTINATIONS_26'
        ],
        [
          'GOAL_LIST_PERFOMING_1',
          'GOAL_LIST_PERFOMING_2',
          'GOAL_LIST_PERFOMING_3',
          'GOAL_LIST_PERFOMING_4',
          'GOAL_LIST_PERFOMING_5',
          'GOAL_LIST_PERFOMING_6',
          'GOAL_LIST_PERFOMING_7',
          'GOAL_LIST_PERFOMING_8',
          'GOAL_LIST_PERFOMING_9',
          'GOAL_LIST_PERFOMING_10',
          'GOAL_LIST_PERFOMING_11'
        ],
        [
          'GOAL_LIST_TRANSPORTATION_1',
          'GOAL_LIST_TRANSPORTATION_2',
          'GOAL_LIST_TRANSPORTATION_3',
          'GOAL_LIST_TRANSPORTATION_4',
          'GOAL_LIST_TRANSPORTATION_5',
          'GOAL_LIST_TRANSPORTATION_6',
          'GOAL_LIST_TRANSPORTATION_7',
          'GOAL_LIST_TRANSPORTATION_8',
          'GOAL_LIST_TRANSPORTATION_9',
          'GOAL_LIST_TRANSPORTATION_10'
        ],
        [
          'GOAL_LIST_RELAX_1',
          'GOAL_LIST_RELAX_2',
          'GOAL_LIST_RELAX_3',
          'GOAL_LIST_RELAX_4',
          'GOAL_LIST_RELAX_5',
          'GOAL_LIST_RELAX_6',
          'GOAL_LIST_RELAX_7',
          'GOAL_LIST_RELAX_8',
          'GOAL_LIST_RELAX_9',
          'GOAL_LIST_RELAX_10',
          'GOAL_LIST_RELAX_11',
          'GOAL_LIST_RELAX_12',
          'GOAL_LIST_RELAX_13',
          'GOAL_LIST_RELAX_14',
          'GOAL_LIST_RELAX_15',
          'GOAL_LIST_RELAX_16',
          'GOAL_LIST_RELAX_17'
        ],
        [
          'GOAL_LIST_WILDCARDS_1',
          'GOAL_LIST_WILDCARDS_2',
          'GOAL_LIST_WILDCARDS_3',
          'GOAL_LIST_WILDCARDS_4',
          'GOAL_LIST_WILDCARDS_5',
          'GOAL_LIST_WILDCARDS_6',
          'GOAL_LIST_WILDCARDS_7',
          'GOAL_LIST_WILDCARDS_8',
          'GOAL_LIST_WILDCARDS_9',
          'GOAL_LIST_WILDCARDS_10',
          'GOAL_LIST_WILDCARDS_11',
          'GOAL_LIST_WILDCARDS_12',
          'GOAL_LIST_WILDCARDS_13',
          'GOAL_LIST_WILDCARDS_14',
          'GOAL_LIST_WILDCARDS_15',
          'GOAL_LIST_WILDCARDS_16',
          'GOAL_LIST_WILDCARDS_17'
        ],
        [
          "GOAL_LIST_LIFE_STEPS_1",
          "GOAL_LIST_LIFE_STEPS_2",
          "GOAL_LIST_LIFE_STEPS_3",
          "GOAL_LIST_LIFE_STEPS_4",
          "GOAL_LIST_LIFE_STEPS_5",
          "GOAL_LIST_LIFE_STEPS_6",
          "GOAL_LIST_LIFE_STEPS_7",
          "GOAL_LIST_LIFE_STEPS_8",
          "GOAL_LIST_LIFE_STEPS_9",
          "GOAL_LIST_LIFE_STEPS_10",
          "GOAL_LIST_LIFE_STEPS_11",
          "GOAL_LIST_LIFE_STEPS_12",
          "GOAL_LIST_LIFE_STEPS_13",
          "GOAL_LIST_LIFE_STEPS_14",
          "GOAL_LIST_LIFE_STEPS_15",
          "GOAL_LIST_LIFE_STEPS_16"
        ],
        [
          "GOAL_LIST_PLEASANT_ACTIVITIES_1",
          "GOAL_LIST_PLEASANT_ACTIVITIES_2",
          "GOAL_LIST_PLEASANT_ACTIVITIES_3",
          "GOAL_LIST_PLEASANT_ACTIVITIES_4",
          "GOAL_LIST_PLEASANT_ACTIVITIES_5",
          "GOAL_LIST_PLEASANT_ACTIVITIES_6",
          "GOAL_LIST_PLEASANT_ACTIVITIES_7",
          "GOAL_LIST_PLEASANT_ACTIVITIES_8",
          "GOAL_LIST_PLEASANT_ACTIVITIES_9",
          "GOAL_LIST_PLEASANT_ACTIVITIES_10",
          "GOAL_LIST_PLEASANT_ACTIVITIES_11",
          "GOAL_LIST_PLEASANT_ACTIVITIES_12",
          "GOAL_LIST_PLEASANT_ACTIVITIES_13",
          "GOAL_LIST_PLEASANT_ACTIVITIES_14",
          "GOAL_LIST_PLEASANT_ACTIVITIES_15",
          "GOAL_LIST_PLEASANT_ACTIVITIES_16"        
        ]
      ];
    };

    return goalsService;

  }
]);

var servicesModule = angular.module('groupsService', []);

servicesModule.factory('GroupsService', ['$timeout', 'authHttp', 'Environment', 'AccountService', 'GeneralService', 'StorageService', 'FeedService', '$q', '$translate', '$ionicModal', 'ActivityService', 'OverlayService',
  function($timeout, authHttp, Environment, AccountService, GeneralService, StorageService, FeedService, $q, $translate, $ionicModal, ActivityService, OverlayService) {

    var savedLastActiveTab;

    var groupsService = {

      userGroupContext: undefined,
      publicGroupContext: undefined,
      publicGroupsById: {},
      profileLikes: undefined,
      profileShares: undefined,
      profileComments: undefined,
      lastActiveTab: undefined,

      nextAllowedPosts: {}, // a map of ID to timestamp
      nextAllowedComments: {},
      nextUserGroupUpdate: undefined,
      nextPublicGroupUpdate: undefined,
      nextProfileSharesUpdate: undefined,
      lastProfileSharesOffset: 0,
      nextProfileLikesUpdate: undefined,
      lastProfileLikesOffset: 0,
      nextProfileCommentsUpdate: undefined,
      nextProfileCommentsOffset: 0
    };

    groupsService.logout = function logout() {

      groupsService.userGroupContext = undefined;
      groupsService.publicGroupContext = undefined;
      groupsService.publicGroupsById = {};
      groupsService.profileLikes = undefined;
      groupsService.profileShares = undefined;
      groupsService.nextUserGroupUpdate = undefined;
      groupsService.nextPublicGroupUpdate = undefined;
      groupsService.nextProfileSharesUpdate = undefined;
      groupsService.lastProfileSharesOffset = 0;
      groupsService.nextProfileLikesUpdate = undefined;
      groupsService.lastProfileLikesOffset = 0;
      groupsService.nextProfileCommentsUpdate = undefined;
      groupsService.nextProfileCommentsOffset = 0;
      groupsService.lastActiveTab = undefined;
    };

    var setupNextAllowed = function(savedNextAllowedPosts){
      if (savedNextAllowedPosts) {
        groupsService.nextAllowedPosts = JSON.parse(savedNextAllowedPosts);
      }
    };

    groupsService.initFromLocalStorage = function(){
      function nextAllowedPosts() {
        return Environment.isStorageAllowed() ? StorageService.getItemAsync('nextAllowedPosts') : StorageService.getInsecureItemAsync('nextAllowedPosts');
      }

      return $q.all([
        StorageService.getItemAsync("userGroupContext")
          .then(function(userGroupContext) {
            if (userGroupContext) {
              groupsService.userGroupContext = userGroupContext;
            }
          }),
        nextAllowedPosts()
          .then(setupNextAllowed),
        StorageService.getItemAsync('nextAllowedComments')
          .then(function(savedNextAllowedComments) {
            if (savedNextAllowedComments) {
              groupsService.nextAllowedComments = JSON.parse(savedNextAllowedComments);
            }
          }),
        StorageService.getItemAsync("lastActiveGroupsTab")
          .then(function(savedLastActiveTab) {
            if (savedLastActiveTab) {
              groupsService.lastActiveTab = savedLastActiveTab;
            }
          })
      ]);
    };

    function updateNextAllowedPost(group) {

      var nextDate = new Date(new Date().getTime() + (15 * 60 * 1000));

      groupsService.nextAllowedPosts[group.id] = nextDate;

      var storageVal = JSON.stringify(groupsService.nextAllowedPosts);

      if(!Environment.isStorageAllowed()){
        StorageService.storeInsecureItem('nextAllowedPosts', storageVal);
      } else {
        StorageService.setItem('nextAllowedPosts', storageVal);
      }
    }

    function updateNextAllowedComments(groupId) {

      var nextDate = new Date(new Date().getTime() + (5 * 60 * 1000));

      groupsService.nextAllowedComments[groupId] = nextDate;

      StorageService.setItem('nextAllowedComments', JSON.stringify(groupsService.nextAllowedComments));
    }

    // Helper methods to store view state. location.search does not play nicely, so
    // screw it, we'll just do it here.
    groupsService.getLastActiveTab = function getLastActiveTab() {

      return groupsService.lastActiveTab;
    };

    groupsService.setLastActiveTab = function setLastActiveTab(tab) {
      groupsService.lastActiveTab = tab;

      StorageService.setItem('lastActiveGroupsTab', tab);
      savedLastActiveTab = tab;
    };

    groupsService.findPublicGroupName = function findPublicGroupName(groupId) {

      var group = groupsService.publicGroupsById[groupId];

      return group ? group.name : undefined;
    };

    groupsService.findPublicGroups = function findPublicGroups(force) {

      var ret = createPromise();

      if (force || !groupsService.publicGroupContext || !groupsService.nextPublicGroupUpdate || (groupsService.nextPublicGroupUpdate < new Date())) {

        authHttp.get(Environment.serverURL + '/groups/public')
          .success(function(publicGroupContext) {

            groupsService.publicGroupContext = publicGroupContext;

            if (groupsService.publicGroupContext.publicGroups) {

              for (var i = 0; i < groupsService.publicGroupContext.publicGroups.length; ++i) {

                var publicGroup = groupsService.publicGroupContext.publicGroups[i];
                groupsService.publicGroupsById[publicGroup.id] = publicGroup;
              }
            }

            // Unused?
            if (groupsService.publicGroupContext.nextAllowedPostStr)
              groupsService.nextAllowedPost = new Date(groupsService.publicGroupContext.nextAllowedPostStr);

            // 1 Minute cache. Is that enough?
            groupsService.nextPublicGroupUpdate = new Date(new Date().getTime() + (5 * 1000 * 60));

            if (ret.successCallback)
              ret.successCallback(publicGroupContext);
          })
          .error(function(data, status, headers, config) {
            console.log("Error retrieving communities: " + data);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {
        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback(groupsService.publicGroupContext);
        });
      }

      return ret;
    };

    groupsService.getCachedUserGroups = function getCachedUserGroups() {

      return groupsService.userGroupContext;
    };

    groupsService.findUserGroups = function findUserGroups(force) {

      var ret = createPromise();

      if (force || !groupsService.userGroupContext || !groupsService.nextUserGroupUpdate || (groupsService.nextUserGroupUpdate < new Date())) {

        authHttp.get(Environment.serverURL + '/groups/user')
          .success(function(context) {

            groupsService.userGroupContext = context;

            groupsService.nextUserGroupUpdate = new Date(new Date().getTime() + (1 * 1000 * 60));

            console.log("got user group context:");
            console.log(context);

            if (ret.successCallback)
              ret.successCallback(context);
          })
          .error(function(data, status, headers, config) {
            console.log("Error retrieving user groups: " + data);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {
        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback(groupsService.userGroupContext);
        });

        authHttp.get(Environment.serverURL + '/groups/invites')
          .success(function(invites) {

            if (groupsService.userGroupContext) {
              groupsService.userGroupContext.pendingInvites.length = 0;

              groupsService.userGroupContext.pendingInvites.push.apply(groupsService.userGroupContext.pendingInvites, invites);
            }
          })
          .error(function(data, status, headers, config) {

            console.log("Error retrieving user invites: " + data);
          });
      }

      return ret;
    };

    // These are public stored posts.
    var storedPosts = {};
    var storedPostData = {};
    var storedUserLikes;

    // Add the ability to cache public posts. This allows the post comments controller to efficiently
    // get to this object.
    groupsService.storeCachedPost = function storeCachedPost(post, postData, userVotes) {

      storedPosts[post.id] = post;
      storedPostData = postData;
      storedUserLikes = userVotes;
    };

    groupsService.getCachedPost = function getCachedPost(postId) {

      return storedPosts[postId];
    };

    groupsService.getCachedPostData = function getCachedPostData(postId) {

      return storedPostData ? storedPostData[postId] : undefined;
    };

    groupsService.getCachedUserVotes = function getCachedUserVotes() {

      return storedUserLikes;
    };

    function updateLocalUserGroups(userGroupContext) {
      StorageService.setItem("userGroupContext", JSON.stringify(userGroupContext));
    }

    groupsService.setUserGroupsContext = function setUserGroupsContext(userGroupContext) {
      groupsService.userGroupContext = userGroupContext;

      if (userGroupContext)
        updateLocalUserGroups();
    };

    groupsService.getGroupImmediate = function getGroupImmediate(groupId) {

      var userGroups = groupsService.userGroupContext.userGroups;

      for (var i = 0; i < userGroups.length; ++i) {

        var group = userGroups[i];
        if (group.id == groupId) {
          return group;
        }
      }

      for (var j = 0; j < groupsService.publicGroupContext.publicGroups.length; ++j) {

        var publicGroup = groupsService.publicGroupContext.publicGroups[j];
        if (publicGroup.id == groupId) {
          return publicGroup;
        }
      }

    };

    groupsService.getGroup = function getGroup(groupId) {

      var ret = createPromise();

      function lookForUserGroup() {

        var userGroups = groupsService.userGroupContext.userGroups;
        
        if(!userGroups)
          return;
        
        for (var i = 0; i < userGroups.length; ++i) {

          var group = userGroups[i];
          if (group.id == groupId) {
            if (ret.successCallback)
              ret.successCallback(group);
            break;
          }
        }

        // At this point, we know that we don't have the group locally, so request it from the server to see if we can get it there.
        authHttp.get(Environment.serverURL + '/groups/' + groupId)
          .success(function(group) {
            userGroups.push(group);

            if (ret.successCallback)
              ret.successCallback(group);
          })
          .error(function(data, status, headers, config) {
            console.log("Error retrieving specific group: " + groupId);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      }

      if (groupsService.userGroupContext) {

        // Need to allow this method to return;
        $timeout(lookForUserGroup);
      } else {
        groupsService.findUserGroups()
          .success(function(context) {

            lookForUserGroup();
          })
          .error(function() {

            if (ret.errorCallback)
              ret.errorCallback();
          });
      }

      function lookForPublicGroup() {

        for (var j = 0; j < groupsService.publicGroupContext.publicGroups.length; ++j) {

          var publicGroup = groupsService.publicGroupContext.publicGroups[j];
          if (publicGroup.id == groupId) {
            if (ret.successCallback)
              ret.successCallback(publicGroup);
            break;
          }
        }
      }

      if (groupsService.publicGroupContext && groupsService.publicGroupContext.publicGroups) {

        $timeout(lookForPublicGroup);
      } else {
        groupsService.findPublicGroups()
          .success(function(context) {

            lookForPublicGroup();
          })
          .error(function() {

            if (ret.errorCallback)
              ret.errorCallback();
          });
      }

      return ret;
    };

    groupsService.getClinicianChatGroup = function getClinicianChatGroup(clinician) {

      var deferred = $q.defer();

      groupsService.findUserGroups()
        .success(function(context) {
          var userGroups = context.userGroups;
          var clinicianChatGroup = _.first(_.filter(userGroups, function(userGroup) {
            var isClinicianChatGroup = userGroup.groupType === 'CLIENT' || userGroup.groupType === 'COACH';
            var isCorrectClinician = userGroup.creatorId === clinician.userId;
            return isClinicianChatGroup && isCorrectClinician;
          }));
          deferred.resolve(clinicianChatGroup);
        })
        .error(function() {
          deferred.reject('failed to retrieve user groups');
        });

      return deferred.promise;

    };

    groupsService.getGroupPost = function getGroupPost(postId) {

      return authHttp.get(Environment.serverURL + '/groups/post?postId=' + postId);
    };

    groupsService.findGroupPostComments = function findGroupPostComments(postId, order, limit, offset) {

      return authHttp.get(Environment.serverURL + '/groups/posts/comments/?postId=' + postId + "&order=" + order + "&limit=" + limit + "&offset=" + offset);
    };

    groupsService.findGroupPosts = function findGroupPosts(group, order, limit, offset) {

      // This should probably be cached...
      return authHttp.get(Environment.serverURL + '/groups/posts?groupId=' + group.id + "&order=" + order + "&limit=" + limit + "&offset=" + offset);
    };

    groupsService.findHopePosts = function() {
      var deferred = $q.defer();

      groupsService.findUserGroups()
        .success(function(groupsContext) {

          var userGroups = groupsContext.userGroups;
          var hopeGroup = _.filter(userGroups, function(group) {
            return group.name == 'Hope Feed';
          })[0];  // a user only has 1 Hope Feed group...

          groupsService.findGroupPosts(hopeGroup, null, 100, 0) // params: (group, order, limit, offset)
            .success(function(commentsContext) {
              deferred.resolve(commentsContext);
            });


        });

      return deferred.promise;
    };

    groupsService.completedHopePostToday = function(hopePost) {
      var achievedDate = new Date(hopePost.createdAt);
      var achievedDay = GeneralService.getDayString(achievedDate);

      return (achievedDay == GeneralService.getTodayString());
    };

    groupsService.findNewerPosts = function findNewerPosts(group, lastDate) {

      return authHttp.get(Environment.serverURL + '/groups/posts/newer?groupId=' + group.id + "&lastTime=" + lastDate.getTime());
    };

    groupsService.canCreatePublicGroupPost = function canCreatePublicGroupPost(group) {

      var nextDate = groupsService.nextAllowedPosts[group.id];

      // It can be a string if it was read back in from localStorage.
      if (typeof nextDate == 'string')
        nextDate = new Date(nextDate);

      return !nextDate || new Date() > nextDate;
    };

    groupsService.canCreatePublicComment = function canCreatePublicComment(groupId) {

      var nextDate = groupsService.nextAllowedComments[groupId];

      // It can be a string if it was read back in from localStorage.
      if (typeof nextDate == 'string')
        nextDate = new Date(nextDate);

      return !nextDate || new Date() > nextDate;
    };

    groupsService.getBinaryURL = function getBinaryURL(type) {

      return authHttp.get(Environment.serverURL + '/groups/binaryPostURL?type=' + type);
    };

    groupsService.editComment = function editComment(commentId, text){
      var ret = createPromise();
      var data = {
        postCommentId: commentId,
        title: text
      };

      authHttp.post(Environment.serverURL + '/groups/post/comment', data)
        .success(function(comment) {

          if (ret.successCallback)
            ret.successCallback(comment);
        })
        .error(function(data, status, headers, config) {
          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;

    };

    groupsService.postComment = function postComment(postId, groupId, title) {

      var ret = createPromise();
      var data = {
        postId: postId,
        groupId: groupId,
        title: title
      };

      authHttp.post(Environment.serverURL + '/groups/post/comment', data)
        .success(function(comment) {

          updateNextAllowedComments(groupId);

          if (ret.successCallback)
            ret.successCallback(comment);
        })
        .error(function(data, status, headers, config) {
          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    groupsService.createGroupPost = function createGroupPost(groupId, title, postData, postId) {

      var ret = createPromise();

      var data = {
        groupId: groupId,
        title: title,
        postData: !!postData ? postData : []
      };

      if(postId)
        data.postId = postId;


      authHttp.post(Environment.serverURL + '/groups/post', data)
        .success(function(post) {

          var group = groupsService.getGroupImmediate(groupId);

          if (!group.private && group.groupType !== 'PERSONAL') {
            groupsService.publicGroupContext.userShares++;

            // Remove this from being cached so the new post will get picked up.
            groupsService.profileShares = undefined;

            // Don't allow posts for the next 15 minutes.
            updateNextAllowedPost(group);
            if(group.groupType == 'COMMUNITY')
              ActivityService.recordActivity('POSTED_TO_COMMUNITY'); // Record the action to create the tile.
          }

          if (ret.successCallback)
            ret.successCallback(post);
        })
        .error(function(data, status, headers, config) {
          var params;
          if(typeof group != 'undefined' && group.groupType)
            params = group.groupType;

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    groupsService.archiveComment = function archiveComment(postCommentId) {

      return authHttp.post(Environment.serverURL + '/groups/post/comment/archive', {
        postCommentId: postCommentId
      });
    };

    groupsService.archivePost = function archivePost(postId) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/post/archive', {
          postId: postId
        })
        .success(function(post) {

          // Remove this from being cached so the new list of posts will get picked up.
          // We really only want to do this if the group is private, but we
          // don't have the group here.
          groupsService.profileShares = undefined;

          if (ret.successCallback)
            ret.successCallback(post);
        })
        .error(function(data, status, headers, config) {
          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    groupsService.reportPost = function reportPost(postId, reason, referUser) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/post/report', {
          postId: postId,
          reason: reason,
          refer: referUser
        })
        .success(function(post) {

          // Remove this from being cached so the new list of posts will get picked up.
          // We really only want to do this if the group is private, but we
          // don't have the group here. Also, the post was not likely in your 'likes'
          groupsService.profileLikes = undefined;

          if (ret.successCallback)
            ret.successCallback(post);
        })
        .error(function(data, status, headers, config) {
          if (ret.errorCallback)
            ret.errorCallback(data);
        });

      return ret;
    };

    groupsService.reportComment = function reportComment(commentId, reason, referUser) {

      return authHttp.post(Environment.serverURL + '/groups/post/comment/report', {
        postCommentId: commentId,
        reason: reason,
        refer: referUser
      });
    };

    groupsService.archiveGroup = function archiveGroup(groupId) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/archive', {
          groupId: groupId
        })
        .success(function() {

          if (groupsService.userGroups) {

            for (var i = 0; i < groupsService.userGroups.length; ++i) {

              var group = groupsService.userGroups[i];
              if (group.id == groupId) {

                groupsService.userGroups.splice(i, 1);
                break;
              }
            }
          }

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function(data, status, headers, config) {
          console.log("Error editing group: " + data);

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    groupsService.editGroup = function editGroup(groupId, name, nickname, description, searchable) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/edit', {
          groupId: groupId,
          name: name,
          nickname: nickname,
          description: description,
          searchable: searchable
        })
        .success(function() {

          var group = groupsService.getGroupImmediate(groupId);
          group.name = name;
          group.nickname = nickname;
          group.description = description;
          group.searchable = searchable;

          if (ret.successCallback)
            ret.successCallback(group);
        })
        .error(function(data, status, headers, config) {

          console.log("Error editing group: " + data);

          if (ret.errorCallback)
            ret.errorCallback(data, status, headers, config);
        });

      return ret;
    };

    groupsService.editGroupNickname = function editGroupNickname(groupId, nickname) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/editNickname', {
          groupId: groupId,
          nickname: nickname
        })
        .success(function() {

          var group = groupsService.getGroupImmediate(groupId);
          group.nickname = nickname;

          if (ret.successCallback)
            ret.successCallback(group);
        })
        .error(function(data, status, headers, config) {

          console.log("Error editing nickname: " + data);

          if (ret.errorCallback)
            ret.errorCallback(data, status, headers, config);
        });

      return ret;
    };

    groupsService.createGroup = function createGroup(name, nickname, description, searchable) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/create', {
          name: name,
          nickname: nickname,
          description: description,
          searchable: searchable
        })
        .success(function(group) {

          if (!groupsService.userGroupContext.userGroups)
            groupsService.userGroupContext.userGroups = [];

          groupsService.userGroupContext.userGroups.push(group);

          if (ret.successCallback)
            ret.successCallback(group);

        })
        .error(function(data, status, headers, config) {

          console.log("Error creating group: " + data);

          if (ret.errorCallback)
            ret.errorCallback(data, status, headers, config);
        });

      return ret;
    };

    groupsService.isFeaturedInFeed = function isFeaturedInFeed(post) {
      return post && FeedService.hasItemOfType('community') && (FeedService.getItemOfType('community').post.id === post.id);
    };

    groupsService.removeVote = function removeVote(post) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/post/removeVote', {
          postId: post.id
        })
        .success(function() {

          // Remove this from being cached so the new post will get picked up.
          groupsService.profileLikes = undefined;

          var isFeaturedInFeed = FeedService.hasItemOfType('community') && (FeedService.getItemOfType('community').post.id === post.id);
          if (isFeaturedInFeed)
            FeedService.voteLocalCommunityPost("remove");

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    groupsService.voteUp = function voteUp(postId, groupId) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/post/voteUp', {
          postId: postId,
          groupId: groupId
        })
        .success(function() {

          // Remove this from being cached so the new post will get picked up.
          groupsService.profileLikes = undefined;

          // Update the score in feedContext if the post is featured in the home feed
          var isFeaturedInFeed = FeedService.hasItemOfType('community') && (FeedService.getItemOfType('community').post.id === postId);
          if (isFeaturedInFeed)
            FeedService.voteLocalCommunityPost("up");

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    function updateNotificationCounts() {

      var notification = AccountService.getUserNotification();

      notification.groupNotificationCount = 0;
      notification.communityNotificationCount = 0;

      if (notification) {

        if (notification.postNotifications) {

          for (var postId in notification.postNotifications) {

            var postNotification = notification.postNotifications[postId];

            if (postNotification)
              notification.communityNotificationCount += postNotification.actions;
          }
        }

        if (notification.groupNotifications) {

          for (var groupId in notification.groupNotifications) {

            var groupNotification = notification.groupNotifications[groupId];

            if (groupNotification)
              notification.groupNotificationCount += groupNotification.actions;
          }
        }
      }
    }

    groupsService.clearAllPostNotifications = function clearAllPostNotifications() {

      var notification = AccountService.getUserNotification();

      if (notification && notification.postNotifications) {

        authHttp.post(Environment.serverURL + '/groups/post/clearAllNotifications')
          .success(function() {

            // NOTE: We don't update the count, we just flag the notification object
            // as having been cleared. This way, during the current session you can
            // still find the posts that have notifications, but you won't see the
            // badge anymore.
            notification.postNotifications.cleared = true;
          })
          .error(function() {

            console.log("error clearing all post notification");
          });
      }
    };

    groupsService.clearPostNotification = function clearPostNotification(postId) {

      var notification = AccountService.getUserNotification();

      if (notification && notification.postNotifications) {

        var postNotification = notification.postNotifications[postId];

        if (!!postNotification) {
          authHttp.post(Environment.serverURL + '/groups/post/clearNotification', {
              postId: postId
            })
            .success(function() {

              delete notification.postNotifications[postId];

              updateNotificationCounts();
            })
            .error(function() {

              console.log("error clearing post notification");
            });
        }
      }
    };

    groupsService.clearAllGroupNotifications = function clearAllGroupNotifications() {

      var notification = AccountService.getUserNotification();
      if (notification && notification.groupNotifications) {

        authHttp.post(Environment.serverURL + '/groups/group/clearAllNotifications')
          .success(function() {

            // NOTE: We don't update the count, we just flag the notification object
            // as having been cleared. This way, during the current session you can
            // still find the groups that have notifications, but you won't see the
            // badge anymore.
            notification.groupNotifications.cleared = true;
          })
          .error(function() {

            console.log("error clearing group notification");
          });
      }
    };

    groupsService.clearGroupNotification = function clearGroupNotification(groupId, successCallback) {

      var notification = AccountService.getUserNotification();
      if (notification && notification.groupNotifications) {

        var groupNotification = notification.groupNotifications[groupId];

        if (!!groupNotification) {
          authHttp.post(Environment.serverURL + '/groups/group/clearNotification', {
              groupId: groupId
            })
            .success(function() {

              delete notification.groupNotifications[groupId];

              updateNotificationCounts();
              if(successCallback)
                successCallback();
            })
            .error(function() {

              console.log("error clearing group notification");
            });
        }
      }
    };

    groupsService.clearNotificationFeed = function clearNotificationFeed() {

      authHttp.post(Environment.serverURL + '/groups/clearNotificationFeed');
    };

    groupsService.hasPostNotification = function hasPostNotification(postId) {

      return groupsService.getPostNotificationCount(postId) > 0;
    };

    groupsService.getPostNotificationCount = function getPostNotificationCount(postId) {

      var notifications = AccountService.getUserNotification();
      if (notifications.postNotifications) {

        if (!!postId) {
          var postNotification = notifications.postNotifications[postId];
          if (!!postNotification)
            return postNotification.actions;
        } else {

          // If they post notifications have been cleared, return 0 as the count for
          // all of them.
          if (notifications.postNotifications.cleared)
            return 0;

          var count = 0;
          for (var key in notifications.postNotifications) {

            var postNotification2 = notifications.postNotifications[key];

            count += postNotification2.actions;
          }

          return count;
        }
      }

      return 0;
    };

    groupsService.hasGroupNotification = function hasGroupNotification(groupId) {

      var notifications = AccountService.getUserNotification();
      if (notifications.groupNotifications) {

        var groupNotification = notifications.groupNotifications[groupId];
        return !!groupNotification;
      }

      return false;
    };

    groupsService.getGroupNotificationCount = function getGroupNotificationCount(groupId) {

      var notifications = AccountService.getUserNotification();
      if (notifications.groupNotifications) {

        if (!!groupId) {

          var groupNotification = notifications.groupNotifications[groupId];
          if (!!groupNotification)
            return groupNotification.actions;
        } else {
          // If they post notifications have been cleared, return 0 as the count for
          // all of them.
          if (notifications.groupNotifications.cleared)
            return 0;

          var count = 0;
          var nonClientGroupNotifications = _.filter(notifications.groupNotifications, function(groupNotification) {
            var groupId = groupNotification.groupId;
            return groupsService.getGroupImmediate(groupId).groupType != 'CLIENT' && groupsService.getGroupImmediate(groupId).groupType != 'COACH';
          });
          for (var key in nonClientGroupNotifications) {

            var groupNotification2 = notifications.groupNotifications[key];
            if (!!groupNotification2)
              count += groupNotification2.actions;
          }

          return count;
        }
      }

      return 0;
    };

    groupsService.removeCommentVote = function removeCommentVote(comment) {

      return authHttp.post(Environment.serverURL + '/groups/post/comment/removeVote', {
        postCommentId: comment.id
      });
    };

    groupsService.voteCommentUp = function voteUp(postCommentId, postId, groupId) {

      return authHttp.post(Environment.serverURL + '/groups/post/comment/voteUp', {
        postCommentId: postCommentId,
        postId: postId,
        groupId: groupId
      });
    };

    groupsService.inviteExistingUser = function inviteExistingUser(groupId, userId, text) {

      return authHttp.post(Environment.serverURL + '/groups/inviteExistingUser', {
        groupId: groupId,
        userId: userId,
        text: text
      });
    };

    groupsService.sendInvites = function sendInvites(groupId, emailList, text) {

      return authHttp.post(Environment.serverURL + '/groups/sendInvites', {
        groupId: groupId,
        emails: emailList,
        text: text
      });
    };

    groupsService.acceptInvite = function acceptInvite(groupId, nickname) {

      return authHttp.post(Environment.serverURL + '/groups/acceptInvite', {
        groupId: groupId,
        nickname: nickname
      });
    };

    groupsService.joinGroup = function joinGroup(groupCode) {

      return authHttp.post(Environment.serverURL + '/groups/joinGroup', {
        groupCode: groupCode
      });
    };

    groupsService.joinRandomGroup = function joinRandomGroup(goal, language) {

      return authHttp.post(Environment.serverURL + '/groups/joinRandomGroup', {
        goal: goal,
        language: language
      });
    };

    groupsService.deleteInvite = function deleteInvite(groupId, email) {

      var data = {
        groupId: groupId
      };

      if (email) {
        data.email = email;
      }

      return authHttp.post(Environment.serverURL + '/groups/deleteInvite', data);
    };

    groupsService.leaveGroup = function leaveGroup(groupId) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/groups/leave', {
          groupId: groupId
        })
        .success(function() {

          if (groupsService.userGroupContext.userGroups) {

            for (var i = 0; i < groupsService.userGroupContext.userGroups.length; ++i) {

              var group = groupsService.userGroupContext.userGroups[i];
              if (group.id == groupId) {

                groupsService.userGroupContext.userGroups.splice(i, 1);
                break;
              }
            }
          }

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function(data, status, headers, config) {
          console.log("Error editing group: " + data);

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    groupsService.getShares = function getShares(limit, offset, otherUserId) {

      var ret = createPromise();

      if (otherUserId || !groupsService.profileShares || groupsService.lastProfileSharesOffset != offset || !groupsService.nextProfileSharesUpdate || (groupsService.nextProfileSharesUpdate < new Date())) {

        groupsService.lastProfileSharesOffset = offset;

        var url = Environment.serverURL + '/groups/shares?limit=' + limit + '&offset=' + offset;

        if (otherUserId)
          url += '&userId=' + otherUserId;

        authHttp.get(url)
          .success(function(shares) {

            if (!otherUserId) {
              groupsService.profileShares = shares;

              groupsService.nextProfileSharesUpdate = new Date(new Date().getTime() + (5 * 1000 * 60));
            }

            if (ret.successCallback)
              ret.successCallback(shares);
          })
          .error(function(data, status, headers, config) {
            console.log("Error retrieving user groups: " + data);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {
        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback(groupsService.profileShares);
        });
      }

      return ret;
    };

    // This retrieves the user's likes for the given post ids.
    groupsService.getUserLikes = function getUserLikes(posts) {

      if (!posts || posts.length === 0)
        return createPromise();

      var url = Environment.serverURL + '/groups/userLikes?ids=';

      for (var i = 0; i < posts.length; ++i) {

        if (i > 0)
          url += '&ids=';

        url += posts[i].id;
      }

      return authHttp.get(url);
    };

    // This retrieves the user's likes for the given post ids.
    groupsService.getUserCommentLikes = function getUserCommentLikes(comments) {

      if (!comments || comments.length === 0)
        return createPromise();

      var url = Environment.serverURL + '/groups/userCommentLikes?ids=';

      for (var i = 0; i < comments.length; ++i) {

        if (i > 0)
          url += '&ids=';

        url += comments[i].id;
      }

      return authHttp.get(url);
    };

    groupsService.getLikes = function getLikes(limit, offset, otherUserId) {

      var ret = createPromise();

      if (otherUserId || !groupsService.profileLikes || groupsService.lastProfileLikesOffset != offset || !groupsService.nextProfileLikesUpdate || (groupsService.nextProfileLikesUpdate < new Date())) {

        groupsService.lastProfileLikesOffset = offset;

        var url = Environment.serverURL + '/groups/likes?limit=' + limit + '&offset=' + offset;

        if (otherUserId)
          url += '&userId=' + otherUserId;

        authHttp.get(url)
          .success(function(likes) {

            if (!otherUserId) {
              groupsService.profileLikes = likes;

              // 1 minute cache. Is that enough?
              groupsService.nextProfileLikesUpdate = new Date(new Date().getTime() + (1 * 1000 * 60));
            }

            if (ret.successCallback)
              ret.successCallback(likes);
          })
          .error(function(data, status, headers, config) {
            console.log("Error retrieving user groups: " + data);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {
        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback(groupsService.profileLikes);
        });
      }

      return ret;
    };

    groupsService.getComments = function getComments(limit, offset, otherUserId, force) {

      var ret = createPromise();

      if (force || otherUserId || !groupsService.profileComments || groupsService.lastProfileCommentsOffset != offset || !groupsService.nextProfileCommentsUpdate || (groupsService.nextProfileCommentsUpdate < new Date())) {

        groupsService.lastProfileCommentsOffset = offset;

        var url = Environment.serverURL + '/groups/comments?limit=' + limit + '&offset=' + offset;

        if (otherUserId)
          url += '&userId=' + otherUserId;

        authHttp.get(url)
          .success(function(comments) {

            if (!otherUserId) {
              groupsService.profileComments = comments;

              // 1 minute cache. Is that enough?
              groupsService.nextProfileCommentsUpdate = new Date(new Date().getTime() + (1 * 1000 * 60));
            }

            if (ret.successCallback)
              ret.successCallback(comments);
          })
          .error(function(data, status, headers, config) {
            console.log("Error retrieving user groups: " + data);

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {
        $timeout(function() {
          if (ret.successCallback)
            ret.successCallback(groupsService.profileComments);
        });
      }

      return ret;
    };

    groupsService.getGroupUsers = function getGroupUsers(groupId) {

      return authHttp.get(Environment.serverURL + '/groups/users?groupId=' + groupId);
    };

    groupsService.removeUser = function removeUser(groupId, userId) {

      return authHttp.post(Environment.serverURL + '/groups/removeUser', {
        groupId: groupId,
        userId: userId
      });
    };

    groupsService.findCuratedGroups = function findCuratedGroups() {

      return authHttp.get(Environment.serverURL + '/groups/curated');
    };

    function addCuratedGroup($scope, category, group) {

      var groupList = $scope.curatedGroups[category];
      if (!groupList) {

        groupList = [];
        $scope.curatedCategories.push(category);
        $scope.curatedGroups[category] = groupList;
      }

      groupList.push(group);
    }

    groupsService.initializeCuratedGroups = function initializeCuratedGroups($scope, groups) {

      $scope.curatedGroups = undefined;
      $scope.curatedCategories = [];

      var userGroups = groupsService.userGroupContext ? groupsService.userGroupContext.userGroups : undefined;

      if (groups && groups.length > 0) {

        $scope.curatedGroups = {};

        for (var i = 0; i < groups.length; ++i) {

          var group = groups[i];

          var hasGroup = false;
          if (userGroups) {

            for (var k = 0; k < userGroups.length; ++k) {

              if (userGroups[k].id == group.id) {

                hasGroup = true;
                break;
              }
            }
          }

          if (!hasGroup) {
            if (group.curatedCategories) {

              var categories = group.curatedCategories.split(';');
              if (categories.length > 0) {

                for (var j = 0; j < categories.length; ++j) {

                  addCuratedGroup($scope, categories[j], group);
                }
              }
            } else {
              addCuratedGroup($scope, 'Other', group);
            }
          }
        }

        // Sort everything alphabetically.
        if ($scope.curatedCategories.length > 0) {

          $scope.curatedCategories.sort();

          for (var category in $scope.curatedGroups) {

            var categoryList = $scope.curatedGroups[category];
            categoryList.sort(function(a, b) {

              return a.name.localeCompare(b.name);
            });
          }
        }
      }
    };

    var searchId = 0;
    groupsService.searchForGroup = function searchForGroup(query) {

      ++searchId;

      var ret = createPromise();

      authHttp.get(Environment.serverURL + '/groups/search?query=' + query + '&searchId=' + searchId)
        .success(function(searchContext) {

          // If the search doesn't match the active one, another search has been kicked off.
          if (searchContext.searchId == searchId) {

            if (ret.successCallback)
              ret.successCallback(searchContext.groups);
          }
        })
        .error(function(data, status, headers, config) {
          console.log("Error searching for groups: " + data);

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    function checkGroupModal($scope, checkName) {

      var name = $("#groupName").val();
      if (name)
        name = name.trim();

      var nickname = $("#groupNickname").val();
      if (nickname)
        nickname = nickname.trim();

      if (checkName && (!name || name.length === 0)) {
        $scope.groupError = $translate.instant("CREATE_GROUP_NO_NAME");
        return true;
      }

      if (!nickname || nickname.length === 0) {

        $scope.groupError = $translate.instant("CREATE_GROUP_NO_NICKNAME");
        return true;
      } else if (!(/^[a-z0-9]+$/i.test(nickname))) {

        $scope.groupError = $translate.instant("LOGIN_ERROR_ALPHANUMERIC_NAME");
        return true;
      }

      return false;
    }

    // Community (social) notifications

    function updateLocalGroupNotifications(notificationContext) {
      StorageService.setItem("notificationContext", JSON.stringify(notificationContext));
    }

    groupsService.setNotificationContext = function setNotificationContext(notificationContext) {

      groupsService.notificationContext = notificationContext;

      if (notificationContext)
        updateLocalGroupNotifications();

    };

    groupsService.getNotificationContext = function getNotificationContext() {
      return groupsService.notificationContext;
    };

    groupsService.updateNotificationContext = function updateNotificationContext() {
  
      return authHttp.get(Environment.serverURL + '/account/notificationContext')
        .success(function(context) {
          AccountService.setUserNotification(context.userNotification);
          groupsService.setNotificationContext(context.notificationContext);
        });
    };

    groupsService.initInviteFunctionality = function initInviteFunctionality($scope, AccountService) {

      $scope.sendingInvites = false;

      $scope.closeInviteModal = function closeInviteModal() {
        OverlayService.modal.close($scope.inviteModal).then(function(modal) {
          $scope.inviteModal = modal;
        });
      };

      $scope.sendInvite = function sendInvite() {

        var emails = $("#inviteEmails").val().trim();
        var text = $("#inviteText").val().trim();

        if (!emails || emails.length === 0) {

          $scope.inviteError = $translate.instant('INVITE_ERROR_MISSING_EMAIL');
          return;
        }

        if (!text || text.length === 0) {

          $scope.inviteError = $translate.instant('INVITE_ERROR_MISSING_TEXT');
          return;
        }

        var userEmail = AccountService.getAccountUser().user.email;

        var emailList = emails.split(",");
        for (var i = 0; i < emailList.length; ++i) {

          var email = emailList[i].trim();

          if (!GeneralService.isEmailValid(email) || email == userEmail) {

            $scope.inviteError = $translate.instant('INVITE_ERROR_INVALID_EMAIL');
            return;
          }

          emailList[i] = email;
        }

        $scope.sendingInvites = true;
        groupsService.sendInvites($scope.group.id, emailList, text)
          .success(function() {

            AccountService.setUserPreference('sent_group_invitation', 'true');

            $scope.sendingInvites = false;

            $scope.closeInviteModal();

            if ($scope.pendingInvites) {

              for (var j = 0; j < emailList.length; ++j) {

                $scope.pendingInvites.push({
                  userGroup: $scope.group,
                  email: emailList[j],
                  createdAtStr: new Date().toString()
                });
              }
            }

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('SEND_INVITE_SUCCESS'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          })
          .error(function() {

            $scope.sendingInvites = false;

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('SEND_INVITE_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });

          });
      };


      $scope.showInvite = function showInvite() {

        if ($scope.mobile) {
          // INVITE_TEXT
          OverlayService.actionSheet.show({
            buttons: [{
              text: $translate.instant('INVITE_VIA_EMAIL')
            }, {
              text: $translate.instant('INVITE_VIA_SMS')
            }],
            titleText: $translate.instant('INVITE_TO_GROUP_TITLE'),
            cancelText: $translate.instant('CANCEL'),
            cancel: function() {

            },
            buttonClicked: function(index) {

              var shareText = $translate.instant('INVITE_TEXT') + ' ' + $scope.group.code + '.';
              var downloadText = $translate.instant('DOWNLOAD_PACIFICA');

              // TODO Google Analytics.

              if (index === 0) {
                window.plugins.socialsharing.shareViaEmail(
                  shareText + '\n\n' + downloadText, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                  $translate.instant('INVITE_EMAIL_SUBJECT'),
                  null, // TO: must be null or an array
                  null, // CC: must be null or an array
                  null, // BCC: must be null or an array
                  null, // FILES: can be null, a string, or an array
                  function ok(msg) {
                    console.log('ok: ' + msg);
                  },
                  function error(msg) {

                    OverlayService.popup.alert({
                      template: $translate.instant('INVITE_EMAIL_ERROR'),
                      okText: $translate.instant('OK_GOT_IT'),
                      okType: 'button-default'
                    });
                  }
                );
              } else if (index == 1) {

                window.plugins.socialsharing.shareViaSMS(shareText + ' ' + downloadText,
                  null /* see the note below */ ,
                  function(msg) {
                    console.log('ok: ' + msg);
                  },
                  function(msg) {

                    OverlayService.popup.alert({
                      template: $translate.instant('INVITE_SMS_ERROR'),
                      okText: $translate.instant('OK_GOT_IT'),
                      okType: 'button-default'
                    });
                  });
              }
              return true;
            }
          });
        } else {
          window.location='mailto:?subject=' + $translate.instant('INVITE_EMAIL_SUBJECT') + '&body=' + $translate.instant('INVITE_TEXT') + ' ' + $scope.group.code + '.';
        }
      };

      $scope.selectGroupForInvite = function selectGroupForInvite(group) {

        $scope.selectedGroupForInvite = group;
      };

      $scope.isGroupSelectedForInvite = function isGroupSelectedForInvite(group) {

        return $scope.selectedGroupForInvite == group;
      };

      $scope.closeSelectGroupForInviteModal = function closeSelectGroupForInviteModal() {
        OverlayService.modal.close($scope.selectGroupModal).then(function(modal) {
          $scope.selectGroupModal = modal;
        });
      };

      $scope.checkSelectGroupForInvite = function checkSelectGroupForInvite() {

        if (!$scope.selectedGroupForInvite) {

          $scope.inviteExistingError = $translate.instant('SELECT_GROUP_MISSING');
          return;
        }

        $scope.inviteExistingError = undefined;

        $scope.showInviteExistingUser();
      };

      $scope.inviteExistingUser = function inviteExistingUser() {

        var text = $("#inviteText").val().trim();

        if (!text || text.length === 0) {

          $scope.inviteError = $translate.instant('INVITE_ERROR_MISSING_TEXT');
          return;
        }

        $scope.sendingInvites = true;
        groupsService.inviteExistingUser($scope.selectedGroupForInvite.id, $scope.invitingUserId, text)
          .success(function() {

            AccountService.setUserPreference('sent_group_invitation', 'true');

            $scope.sendingInvites = false;

            $scope.closeInviteExistingUserModal();

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('SEND_INVITE_SUCCESS'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          })
          .error(function() {

            $scope.sendingInvites = false;

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('SEND_INVITE_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      };

      $scope.closeInviteExistingUserModal = function closeInviteExistingUserModal() {
        OverlayService.modal.close($scope.inviteExistingUserModal).then(function(modal) {
          $scope.inviteExistingUserModal = modal;
        });
      };

      $scope.showInviteExistingUser = function showInviteExistingUser() {

        if ($scope.selectGroupModal) {

          $scope.closeSelectGroupForInviteModal();
        }

        OverlayService.modal.open({
          modalId: 'InviteExistingUserModal',
          templateUrl: 'views/groups/groups.inviteExistingUser.modal.html',
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.inviteExistingUserModal = modal;
        });

      };

      // $scope.showInvite = function showInvite() {

      //   if ($scope.checkOfflineMode()) return;

      //   $ionicModal.fromTemplateUrl('views/groups/groups.invite.modal.html', {
      //     scope: $scope,
      //     animation: 'slide-in-up'
      //   }).then(function(modal) {
      //     $scope.inviteModal = modal;

      //     openModal($scope.inviteModal);
      //   });
      // };
    };

    groupsService.initEditFunctionality = function initEditFunctionality($scope) {

      $scope.closeEditGroupModal = function closeEditGroupModal() {
        OverlayService.modal.close($scope.editGroupModal).then(function(modal) {
          $scope.editGroupModal = modal;
        });
      };

      $scope.editGroup = function editGroup() {

        var owner = $scope.isOwnerById($scope.editGroupId);

        if (checkGroupModal($scope, owner)) return;

        $scope.groupError = undefined;

        var name = $scope.newGroupData.name;
        var nickname = $scope.newGroupData.nickname;
        var searchable = $scope.newGroupData.searchable;
        var description = searchable ? $scope.newGroupData.description : undefined;

        name = name.trim();
        nickname = nickname.trim();

        if (description && description.trim() === '')
          description = undefined;

        var successCallback = function() {

          $scope.editingGroup = false;

          var group = groupsService.getGroupImmediate($scope.editGroupId);

          if (owner)
            group.name = name;

          group.nickname = nickname;

          if ($scope.groupPosts) {

            var user = AccountService.getAccountUser().user;

            for (var i = 0; i < $scope.groupPosts.length; ++i) {

              var post = $scope.groupPosts[i];
              if (post.creatorId == user.id)
                post.creatorNickname = nickname;
            }
          }

          $scope.closeEditGroupModal();
        };

        var errorCallback = function(data, status, headers, config) {

          $scope.editingGroup = false;

          if (status == 409) {
  
            OverlayService.popup.alert({
              template: $translate.instant('GROUP_CONFLICT_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          } else {

            OverlayService.popup.alert({
              template: $translate.instant('UPDATE_GROUP_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }
        };

        $scope.editingGroup = true;

        if (owner) {

          groupsService.editGroup($scope.editGroupId, name, nickname, description, searchable)
            .success(successCallback)
            .error(errorCallback);
        } else {
          groupsService.editGroupNickname($scope.editGroupId, nickname)
            .success(successCallback)
            .error(errorCallback);
        }
      };

      $scope.showEditGroup = function showEditGroup(event, group) {

        event.stopPropagation();
        event.preventDefault();

        if ($scope.checkOfflineMode()) return;

        $scope.newGroupData = {
          nickname: group.nickname,
          name: group.name,
          description: group.description,
          searchable: group.searchable
        };

        $scope.editGroupId = group.id;
        $scope.groupError = undefined;

        var editGroupModalTemplate;
        if ($scope.mobile) {
          editGroupModalTemplate = 'views/groups/groups.editGroup.modal.html';
        } else {
          editGroupModalTemplate = 'templates/groups/groups.editGroup.modal.html';
        }

        OverlayService.modal.open({
          modalId: 'EditGroupModal',
          templateUrl: editGroupModalTemplate,
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.editGroupModal = modal;
        });
      };
    };

    groupsService.initEditNicknameFunctionality = function initEditNicknameFunctionality($scope) {

      $scope.closeNicknameModal = function closeNicknameModal() {
        OverlayService.modal.close($scope.nicknameModal).then(function(modal) {
          $scope.nicknameModal = modal;
        });
      };

      $scope.updatePublicNickname = function updatePublicNickname() {

        var nickname = $("#updateUserNickname").val().trim();

        if (!nickname || nickname.length === 0) {

          $scope.nicknameError = $translate.instant('LOGIN_ERROR_MISSING_NAME');
        } else if (!(/^[a-z0-9]+$/i.test(nickname))) {

          $scope.nicknameError = $translate.instant('LOGIN_ERROR_ALPHANUMERIC_NAME');
        } else {

          $scope.nicknameError = undefined;

          $scope.updatingNickname = true;

          AccountService.setPublicNickname(nickname)
            .success(function() {

              $scope.updatingNickname = false;

              if ($scope.user && !$scope.viewingOtherUser)
                $scope.user.publicName = nickname;

              AccountService.updateLocalPublicNickname(nickname);

              var userId = AccountService.getAccountUser().user.id;

              // Setting the nickname is different for public vs. private groups.
              if ($scope.group) {

                if ($scope.groupPosts) {
                  if ($scope.group.groupType == 'COMMUNITY') {
                    for (var i = 0; i < $scope.groupPosts.length; ++i) {

                      var post = $scope.groupPosts[i];
                      if (post.creatorId == userId) {

                        post.creatorNickname = nickname;
                      }
                    }
                  }
                }
              }

              if ($scope.shares) {
                for (var j = 0; j < $scope.shares.length; ++j) {

                  var share = $scope.shares[j];
                  if (share.creatorId == userId) {

                    share.creatorNickname = nickname;
                  }
                }
              }

              // If the popup was launched as a result of a missing public nickname,
              // then launch the create popup again.
              if ($scope.attemptingCommunityPost) {

                $scope.showCreatePost();
              }

              if ($scope.attemptingJoinGroup) {

                $scope.joinGroup();
              }

              $scope.closeNicknameModal();
            })
            .error(function(data, status, headers, config) {

              $scope.updatingNickname = false;

              $scope.nicknameError = $translate.instant('UPDATE_NICKNAME_ERROR');

              // var alertPopup = OverlayService.popup.alert({
              //   template: $translate.instant('UPDATE_NICKNAME_ERROR'),
              //   okText: $translate.instant('OK_GOT_IT'),
              //   okType: 'button-default'
              // });
            });
        }
      };

      $scope.showUpdateNickname = function showUpdateNickname() {

        if ($scope.nicknameModal) return;

        AccountService.setUserPreference('viewed_communities_popup', true);

        // Populate with their existing name if there is one.
        $scope.originalNickname = AccountService.getAccountUser().user.publicName;

        // It seems that there are too many collisions when pre-populating this with
        // the nickname they used when first signing up.
        // if (!$scope.originalNickname)
        //   $scope.originalNickname = AccountService.getAccountUser().user.name;
        
        var updateNicknameModal;
        if ($scope.mobile) {
          updateNicknameModal = 'views/groups/groups.updateNickname.modal.html';
        } else {
          updateNicknameModal = 'templates/community/community.updateNickname.modal.html';
        }

        OverlayService.modal.open({
          modalId: 'UpdateNicknameModal',
          templateUrl: updateNicknameModal,
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.nicknameModal = modal;
        });
      };
    };

    groupsService.initValidateEmailFunctionality = function initValidateEmailFunctionality($scope) {

      $scope.closeEmailValidationPopup = function closeEmailValidationPopup() {
        OverlayService.modal.close($scope.emailValidationModal).then(function(modal) {
          $scope.emailValidationModal = modal;
        });
      };

      $scope.checkRemoteEmailValidation = function checkRemoteEmailValidation(callback) {

        // We need to check remotely for this because
        AccountService.checkRemoteEmailValidation()
          .success(function(resp) {

            if (resp.validated) {
              AccountService.getAccountUser().user.emailVerifiedAt = new Date();
            } else {
              $scope.showEmailValidationPopup();
            }

            if (callback)
              callback(resp.validated);
          })
          .error(function() {

            OverlayService.popup.alert({
              template: $translate.instant('GENERIC_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });
      };

      $scope.showEmailValidationPopup = function showEmailValidationPopup() {
        
        var validateEmailModal;
        if ($scope.mobile) {
          // Need to take the focus away from the element so the cursor does not show.
          // However, on desktop blurring the input causes the popup to be displayed twice.
          $("#postText").blur();
          validateEmailModal = 'views/groups/groups.validateEmail.modal.html';
        } else {
          validateEmailModal = 'templates/groups/groups.validateEmail.modal.html';
        }

        OverlayService.modal.open({
          modalId: 'EmailValidationModal',
          templateUrl: validateEmailModal,
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.emailValidationModal = modal;
        });
      };

      $scope.isUserEmailValidated = function isUserEmailValidated() {

        return AccountService.isEmailValidated();
      };

      $scope.resendValidationEmail = function resendValidationEmail() {
        if($scope.sendingValidation){
          return;
        }
        $scope.sendingValidation = true;
        AccountService.resendValidationEmail()
          .success(function() {

            $scope.closeEmailValidationPopup();

            $timeout(function() {
              OverlayService.popup.alert({
                template: $translate.instant('VALIDATION_EMAIL_SENT'),
                okText: $translate.instant('OK_GOT_IT'),
                okType: 'button-default'
              });
            }, 500);
            $scope.sendingValidation = false;
          })
          .error(function(data, status, headers, config) {

            var alertPopup = OverlayService.popup.alert({
              template: $translate.instant('GENERIC_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
            $scope.sendingValidation = false;
          });
      };
    };

    groupsService.initCreateGroupFunctionality = function initCreateGroupFunctionality($scope) {

      $scope.closeCreateGroupModal = function closeCreateGroupModal() {
        OverlayService.modal.close($scope.createGroupModal).then(function(modal) {
          $scope.createGroupModal = modal;
        });
      };

      $scope.isNewGroupPublic = function() {

        return $scope.newGroupData.searchable;
      };

      $scope.createGroup = function createGroup() {

        if (checkGroupModal($scope, true)) return;

        var name = $scope.newGroupData.name;
        var nickname = $scope.newGroupData.nickname;
        var searchable = $scope.newGroupData.searchable;
        var description = searchable ? $scope.newGroupData.description : undefined;

        name = name.trim();
        nickname = nickname.trim();

        if (description && description.trim() === '')
          description = undefined;

        $scope.groupError = undefined;

        $scope.creatingGroup = true;

        groupsService.createGroup(name, nickname, description, searchable)
          .success(function(group) {

            $scope.creatingGroup = false;

            // In this case, we don't have a reference to the list from the GroupService.
            $scope.userGroups = undefined;

            // We could be creating the group from a profile page.
            if ($scope.loadGroups)
              $scope.loadGroups(true);

            $scope.closeCreateGroupModal();

            // If the create group modal was launched as a result of inviting a user, then we need
            // to display the invite popup.
            if ($scope.invitingUserId) {

              $scope.selectedGroupForInvite = group;

              $scope.showInviteExistingUser();
            }
          })

        .error(function(data, status, headers, config) {

          $scope.creatingGroup = false;

          if (status == 409) {

            OverlayService.popup.alert({
              template: $translate.instant('GROUP_CONFLICT_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          } else {

            OverlayService.popup.alert({
              template: $translate.instant('CREATE_GROUP_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }

        });
      };

      $scope.closeChooseRandomGroupModal = function() {
        OverlayService.modal.close($scope.chooseRandomGroupModal).then(function(modal) {
          $scope.chooseRandomGroupModal = modal;
        });
      };

      $scope.joinRandomGroup = function joinRandomGroup(groupName) {

        // We allow legacy users to choose a random group here.
        if ($scope.chooseRandomGroupModal) {

          if (groupName == 'depression') {
            groupName = $translate.instant('NUX_GOAL_DEPRESSION');
          } else if (groupName == 'gad') {
            groupName = $translate.instant('NUX_GOAL_GAD');
          } else if (groupName == 'social') {
            groupName = $translate.instant('NUX_GOAL_SOCIAL');
          } else if (groupName == 'health') {
            groupName = $translate.instant('NUX_GOAL_HEALTH');
          }

          $scope.closeChooseRandomGroupModal();
        }

        groupsService.joinRandomGroup(groupName, AccountService.getUserPreference('preferred_locale'))
          .success(function(userGroupContext) {

            $scope.userGroups = undefined;
            $scope.loadGroups(true);
          })
          .error(function() {

            OverlayService.popup.alert({
              template: $translate.instant('ERROR_JOINING_RANDOM_GROUP'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          });

      };

    };

    return groupsService;
  }
]);

var servicesModule = angular.module('habitsService', []);

var MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
var MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

servicesModule.factory('HabitsService', ['$q', '$rootScope', '$timeout', '$translate', 'authHttp', 'Environment', 'GeneralService', 'AccountService', 'StorageService', 'PathService', 'ActivityService', 'OverlayService',
  function($q, $rootScope, $timeout, $translate, authHttp, Environment, GeneralService, AccountService, StorageService, PathService, ActivityService, OverlayService) {

    var habitContextHasBeenSet = false;
    var showingConfirmLeaveMood = false;

    var habitsService = {
      accountHabits: [],
      accountHabitValues: [],
      potentialHabits: [],
      habitData: {},
      offlineHabitData: [],
      recentFeelings: [],

      MOOD_HABIT_ID: 1,
      SLEEP_HABIT_ID: 2,
      EXERCISE_HABIT_ID: 3,
      EATING_HABIT_ID: 4,
      WATER_HABIT_ID: 5,
      CAFFEINE_HABIT_ID: 6,
      ALCOHOL_HABIT_ID: 7,
      OUTDOORS_HABIT_ID: 8,
      FAMILY_HABIT_ID: 9,
      FRIENDS_HABIT_ID: 10,
      HOBBIES_HABIT_ID: 13,
      STRESS_HABIT_ID: 19,
      MENSTRUATION_HABIT_ID: 20,

      // Keep track of the active date for the habits views. We can't manage
      // it using querystrings reliably.
      activeDate: undefined
    };

    var requiresDataReload = false;

    habitsService.requiresHabitDataReload = function requiresHabitDataReload() {

      return requiresDataReload;
    };

    habitsService.clearHabitDataReload = function clearHabitDataReload() {

      requiresDataReload = false;
    };

    var viewedRemoveHabitPref = AccountService.getUserPreference('viewed_remove_habit_tooltip');
    var showRemoveHabit = !viewedRemoveHabitPref || viewedRemoveHabitPref == 'false';


    // Used to control when we will display the remove tooltip.
    var addedHabit = false;

    habitsService.showRemoveHabitTooltip = function showRemoveHabitTooltip() {

      return showRemoveHabit && addedHabit;
    };

    habitsService.dismissRemoveHabitTooltip = function dismissRemoveHabitTooltip() {

      AccountService.setUserPreference('viewed_remove_habit_tooltip', 'true');

      showRemoveHabit = false;
    };

    // Simple in-memory cache for some state transitions.
    var editingHabits = false;

    habitsService.setIsEditingHabits = function setIsEditingHabits(editing) {

      editingHabits = editing;
    };

    habitsService.isEditingHabits = function isEditingHabits() {

      return editingHabits;
    };

    habitsService.removeMoodHabit = function removeMoodHabit($scope) {

      // Copy the array since we're going to modify it.
      if ($scope.habits)
        $scope.habits = $scope.habits.slice(0);

      // Remove the mood habit.
      for (var i = $scope.habits.length - 1; i >= 0; --i) {
        if ($scope.habits[i].id == habitsService.MOOD_HABIT_ID) {
          $scope.habits.splice(i, 1);
        } else if ($scope.habits[i].id == habitsService.STRESS_HABIT_ID) { // Now removing this as well.
          $scope.habits.splice(i, 1);
        }
      }
    };

    function updateAccountHabitValues() {

      habitsService.accountHabitValues = [];

      for (var i = 0; i < habitsService.accountHabits.length; ++i) {

        var habitValues = habitsService.accountHabits[i].habitValues;
        for (var j = 0; j < habitValues.length; ++j) {

          var habitValue = habitValues[j];
          habitsService.accountHabitValues[habitValue.id] = habitValue;
        }
      }
    }

    habitsService.initFromLocalStorage = function(){
      return $q.all([
        StorageService.getItemAsync('accountHabits')
          .then(function(storedHabits) {
            if (storedHabits) {
              habitsService.accountHabits = JSON.parse(storedHabits);

              updateAccountHabitValues();
            }
          }),
        StorageService.getItemAsync('habitData')
          .then(function(storedHabitData) {
            if (storedHabitData) {
              habitsService.habitData = JSON.parse(storedHabitData);
            }
          }),
        StorageService.getItemAsync('offlineHabitData')
          .then(function(storedOfflineData) {
            if (storedOfflineData) {
              habitsService.offlineHabitData = JSON.parse(storedOfflineData);
            }
          }),
        StorageService.getItemAsync('recentFeelings')
          .then(function(storedRecentFeelings) {
            if (storedRecentFeelings) {
              habitsService.recentFeelings = JSON.parse(storedRecentFeelings);
            }
          })
      ]);
    };

    function updateLocalAccountHabits() {
      StorageService.setItem('accountHabits', JSON.stringify(habitsService.accountHabits));
    }

    function updateStoredHabitData() {
      StorageService.setItem('habitData', JSON.stringify(habitsService.habitData));
    }

    function updateOfflineHabitData() {
      StorageService.setItem('offlineHabitData', JSON.stringify(habitsService.offlineHabitData));
    }

    function updateStoredRecentFeelings() {

      StorageService.setItem('recentFeelings', JSON.stringify(habitsService.recentFeelings));
    }

    habitsService.setActiveDate = function setActiveDate(date) {
      habitsService.activeDate = date;
    };

    habitsService.getActiveDate = function getActiveDate() {
      return habitsService.activeDate;
    };

    // TODO Use this *carefully* the habitIndex is very unstable if you aren't using mood. This
    // needs to be refactored. Sub values do not exist for other habits yet however.
    habitsService.getHabitSubValueName = function getHabitSubValueName(habitIndex, habitSubValueId) {

      var habit = habitsService.accountHabits[habitIndex];

      for (var i = 0; i < habit.habitSubValues.length; ++i) {

        var subValue = habit.habitSubValues[i];

        if (subValue.id == habitSubValueId)
          return subValue.display.toLowerCase();
      }
    };

    habitsService.getHabitSubValue = function getHabitSubValue(subValues, subValueId) {

      var valueString;

      if (subValues) {

        // In some cases callers use an array to track sub values, in some cases they use maps.
        if (Array.isArray(subValues)) {
          for (var i = 0; i < subValues.length; ++i) {

            var subValue = subValues[i];
            if (subValue.id == subValueId) {

              valueString = subValue.valueString;
            }
          }
        } else {

          var subValue2 = subValues[subValueId];
          if (subValue2)
            valueString = subValue2.valueString;
        }
      }

      // This is just for safety really, since it was the old way it was implemented.
      // The sub values for the data set should always be here.
      if (!valueString) {

        valueString = habitsService.getHabitSubValueName(0, subValueId);
      }

      if (valueString) {
        var translatedVal = $translate.instant(valueString.toUpperCase());

        // There was no translation, so return the original.
        if (translatedVal == valueString.toUpperCase()) {
          return valueString.toLowerCase();
        } else {

          return translatedVal.toLowerCase();
        }
      }

      return $translate.instant('UNKNOWN').toUpperCase();
    };

    habitsService.updateMoodHabitSubValues = function updateMoodHabitSubValues(subValues) {

      if (subValues) {

        var moodHabit = habitsService.accountHabits[0];

        // These can only be for the mood entry right now.
        // Store the new subValues with the habit.
        for (var k = 0; k < subValues.length; ++k) {

          var subValue = subValues[k];

          var found = false;

          for (var l = 0; l < moodHabit.habitSubValues.length; ++l) {

            var existingSubValue = moodHabit.habitSubValues[l];

            if (existingSubValue.id == subValue.id) {
              found = true;
              break;
            }
          }

          if (!found) {

            moodHabit.habitSubValues.push(subValue);
          }
        }
      }
    };

    habitsService.getHabitSubValues = function getHabitSubValues(subValueIds) {

      var ret = createPromise();

      var ids = '';
      for (var i = 0; i < subValueIds.length; ++i) {

        if (i > 0)
          ids += '&';

        ids += 'ids=' + subValueIds[i];
      }

      authHttp.get(Environment.serverURL + '/habits/habitSubValues?' + ids)
        .success(function(subValues) {

          habitsService.updateMoodHabitSubValues(subValues);

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    function postOfflineHabitData() {

      function postOfflineHabitDataInternal() {
        var dataToPost = [];

        for (var k = 0; k < habitsService.offlineHabitData.length; ++k) {

          var offlineHabitData = habitsService.offlineHabitData[k];

          var habitValue = habitsService.getHabitValueById(offlineHabitData.habitValueId);
          var habit = habitsService.getAccountHabitById(habitValue.habitId);

          var newData = {
            habitId: habit.id,
            habitValueId: habitValue.id,
            habitSubValueIds: offlineHabitData.subValueIds,
            experiencedAt: offlineHabitData.experiencedAt,
            notes: offlineHabitData.notes
          };

          if (offlineHabitData.update) {

            newData.habitDataId = offlineHabitData.id;
            newData.update = true;
          }

          dataToPost.push(newData);
        }

        authHttp.post(Environment.serverURL + '/habits/offline', {
            data: dataToPost
          })
          .success(function(newHabitData) {

            // For any new habit data, we need to record the new Ids so that we don't try creating
            // new data.
            if (newHabitData) {

              for (var j = 0; j < newHabitData.length; ++j) {

                updateLocalHabitData(newHabitData[j]);
              }
            }

            habitsService.offlineHabitData.length = 0;
            StorageService.removeItem('offlineHabitData');

          });
      }

      var shouldPostOfflineHabits = habitsService.offlineHabitData.length > 0 &&
                                    Environment.isOnline() &&
                                    AccountService.isLoggedIn();

      if (shouldPostOfflineHabits) {
        StorageService.onceInitialized(function() {
          AccountService.onceUserContextInitialized(function() {
            postOfflineHabitDataInternal();
          });
        });
      }


    }

    // Make sure that any offline habit data is posted.
    $rootScope.$on('event:online', postOfflineHabitData);
    $rootScope.$on('event:userContextInitialized', postOfflineHabitData);

    function resetData() {

      habitsService.accountHabits = [];
      habitsService.accountHabitValues = [];
      habitsService.potentialHabits = [];
      habitsService.habitData = {};
      habitContextHasBeenSet = false;
      habitsService.recentFeelings = [];

      StorageService.removeItem('accountHabits');
      StorageService.removeItem('habitData');
      StorageService.removeItem('offlineHabitData');
      StorageService.removeItem('recentFeelings');

      addedHabit = false;
    }

    habitsService.logout = function logout() {
      resetData();
    };

    habitsService.findHabitData = function findHabitData(d1, d2) {

      // Make it fetch through the end of the day today.
      var tomorrow = new Date(d2.getTime() + MILLISECONDS_IN_DAY);

      return authHttp.get(Environment.serverURL + '/habits/habitData?startDate=' + GeneralService.getDayString(d1) + "&endDate=" + GeneralService.getDayString(tomorrow));
    };

    habitsService.findPotentialAccountHabits = function findPotentialAccountHabits() {

      return authHttp.get(Environment.serverURL + '/habits/account/potential');
    };

    habitsService.setPotentialAccountHabits = function setPotentialAccountHabits(habits) {

      for (var i = 0; i < habits.length; ++i) {
        var habit = habits[i];

        var found = false;
        for (var j = 0; j < habitsService.potentialHabits.length; ++j) {

          if (habitsService.potentialHabits[j].id == habit.id) {
            found = true;
            break;
          }
        }

        if (!found)
          habitsService.potentialHabits.push(habit);
      }
    };

    habitsService.getPotentialAccountHabits = function getPotentialAccountHabits() {

      return habitsService.potentialHabits;
    };

    habitsService.getPotentialAccountHabitById = function getPotentialAccountHabitById(id){
      return _.find(habitsService.getPotentialAccountHabits(), {id: id});
    };

    habitsService.setHabitContext = function setHabitContext(data) {

      // This is a HabitAndValues object, containing the habit, it's habitValues, and habitSubValues.
      var accountHabits = data.habitValues;

      // Make sure we're starting with the correct data. Sometimes things
      // get a bit out of whack with local storage having old data in it.
      habitsService.accountHabits = accountHabits;
      updateAccountHabitValues();

      habitsService.accountHabits.sort(function(a, b) {

        return a.ordinate - b.ordinate;
      });

      // We reset the ordinate here just in case they get out of order.
      for (var i = 0; i < habitsService.accountHabits.length; ++i) {

        habitsService.ordinate = i;
      }

      // Originally this was a map of <[date] -> <[habitName]->[habitData]>>. However, we can't store habits
      // by name now that people can create them themselves.
      var habitDataList = data.habitData;

      // Reset this as we're effectively getting new data.
      habitsService.habitData = {};
      habitsService.addHabitData(habitDataList);

      habitContextHasBeenSet = true;

      // We need to look at the offline habit data and set it in the new context
      for (var j = 0; j < habitsService.offlineHabitData.length; ++j) {

        var offlineHabitData = habitsService.offlineHabitData[j];

        var habitValue = habitsService.getHabitValueById(offlineHabitData.habitValueId);
        var habit = habitsService.getAccountHabitById(habitValue.habitId);

        // If somehow they changed their account habits before the app came online, we won't
        // have the habit here. This could potentially happen by changing your habits via
        // the webapp..
        if (habitValue && habit) {

          // just being safe.
          var dataDate;
          if (typeof offlineHabitData.experiencedAt == 'number' || typeof offlineHabitData.experiencedAt == 'string')
            dataDate = new Date(offlineHabitData.experiencedAt);
          else
            dataDate = offlineHabitData.experiencedAt;

          habitsService.setLocalHabitData(habit, habitValue.ordinate, offlineHabitData.subValueIds, offlineHabitData.update, dataDate, offlineHabitData.notes, offlineHabitData);
        }
      }

      StorageService.setItem('accountHabits', JSON.stringify(habitsService.accountHabits));
      updateStoredHabitData();
    };

    habitsService.getTodaysLastMoodEntryClass = function getTodaysLastMoodEntryClass() {

      var value = habitsService.getTodaysLastMoodEntry();
      if (value != '?')
        value = value.replace(' ', '');
      else
        value = '';

      return value;
    };

    habitsService.getStressClass = function getStressClass(habitValue) {

      if (!habitValue)
        return '';

      var habitValues = habitsService.getAccountHabitValues('Stress').habitValues;

      var moodClass = habitValues[habitValue.valueInt - 1].valueString;

      return moodClass.replace(/ /g, '');
    };

    habitsService.getMoodClass = function getMoodClass(habitValue) {

      if (!habitValue)
        return '';

      var habitValues = habitsService.getAccountHabitValues('Mood').habitValues;

      var value = habitValues.length - habitValue.valueInt;

      var moodClass = habitValues[value].valueString;

      return moodClass.replace(' ', '');
    };

    habitsService.getMoodClassFromData = function getMoodClassFromData(habitData) {

      var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
      if (habitValue) {

        return habitsService.getMoodClass(habitValue);
      }
    };

    habitsService.getTodaysLastMoodEntry = function getTodaysLastMoodEntry() {

      var todayString = GeneralService.getTodayString();

      var data = habitsService.habitData[todayString];

      if (!data) return '?';

      data = data[1]; // Indexed by ID here.

      if (!data || data.length === 0) return '?';

      data.sort(function(a, b) {
        return new Date(b.recordedAt) - new Date(a.recordedAt);
      });

      var habitValue = habitsService.getHabitValueById(data[0].habitValueId);

      return habitValue.valueString;
    };

    habitsService.isCustomHabit = function isCustomHabit(habit) {
      return habit.creatorId != 1;
    };

    // Originally this was a map of <[date] -> <[habitName]->[habitData]>>. However, we can't store habits
    // by name now that people can create them themselves.
    habitsService.addHabitData = function addHabitData(habitDataList) {

      for (var i = 0; i < habitDataList.length; ++i) {

        var habitData = habitDataList[i];
        var day = GeneralService.getDayString(new Date(habitData.experiencedAt));

        var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
        if (habitValue) {

          var habit = habitsService.getAccountHabitById(habitValue.habitId);

          var daysData = habitsService.habitData[day];
          if (!daysData) {

            daysData = habitsService.habitData[day] = {};
          }

          var days;

          var daysHabitData = daysData[habit.id];

          if (!daysHabitData) {

            daysHabitData = daysData[habit.id] = [];
          }

          var found = false;
          // This needs to make sure that the habit data does not yet exist in the array.
          for (var j = 0; j < daysHabitData.length; ++j) {

            if (daysHabitData[j].id == habitData.id) {
              found = true;
              break;
            }
          }

          if (!found)
            daysHabitData.push(habitData);
        } else {
          console.log("WARNING: Could not find habit value for habit data.");
        }
      }
    };

    habitsService.hasHabitContext = function hasHabitContext() {
      return habitContextHasBeenSet;
    };

    habitsService.getAccountHabitValues = function getAccountHabitValues(habitName) {

      // TODO Will eventually need a reference by ID for custom habits.
      for (var key in habitsService.accountHabits) {

        if (habitsService.accountHabits[key].name == habitName)
          return habitsService.accountHabits[key];
      }
    };

    habitsService.getAccountHabitValuesById = function getAccountHabitValuesById(habitId) {

      // TODO Will eventually need a reference by ID for custom habits.
      for (var key in habitsService.accountHabits) {

        if (habitsService.accountHabits[key].id == habitId)
          return habitsService.accountHabits[key];
      }
    };

    habitsService.getAccountHabits = function getAccountHabits() {
      return habitsService.accountHabits;
    };

    // Return the account habit. Note that if the user does not have the given
    // habit then nothing can be returned here.
    habitsService.getAccountHabitById = function getAccountHabitById(habitId) {

      var habit;

      for (var i = 0; i < habitsService.accountHabits.length; ++i) {

        if (habitsService.accountHabits[i].id == habitId) {
          habit = habitsService.accountHabits[i];
          break;
        }
      }

      return habit;
    };

    var createdHabits = [];

    habitsService.getCreatedHabits = function getCreatedHabits() {

      return createdHabits;
    };

    habitsService.clearCreatedHabits = function clearCreatedHabits() {

      createdHabits.length = 0;
    };

    var habitsToAdd;

    habitsService.getHabitsToAdd = function getHabitsToAdd() {
      return habitsToAdd;
    };

    habitsService.setHabitsToAdd = function setHabitsToAdd(val) {

      habitsToAdd = val;
    };

    habitsService.clearHabitsToAdd = function clearHabitsToAdd() {

      habitsToAdd = undefined;
    };

    habitsService.createHabit = function createHabit(habit, addToAccount) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/habits/create', habit)
        .success(function(newHabit) {

          if (addToAccount) {
            habitsService.addHabit(newHabit.id)
              .success(function() {

                habitsService.addLocalHabit(newHabit);

                if (ret.successCallback)
                  ret.successCallback(newHabit);
              })
              .error(function() {

                if (ret.errorCallback)
                  ret.errorCallback(newHabit);
              });
          } else {

            createdHabits.push(newHabit);

            habitsService.potentialHabits.splice(0, 0, newHabit);

            if (ret.successCallback)
              ret.successCallback(newHabit);
          }
        })
        .error(function() {
          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    habitsService.editHabit = function editHabit(habit) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/habits/edit', habit)
        .success(function(updatedHabit) {

          var habitIndex = 0;
          // Make sure the updated habit is stored.
          for (habitIndex = 0; habitIndex < habitsService.accountHabits.length; ++habitIndex) {

            var existingHabit = habitsService.accountHabits[habitIndex];

            if (existingHabit.id == habit.id) {

              break;
            }
          }

          habitsService.accountHabits.splice(habitIndex, 1, updatedHabit);

          // Necessary to add new or remove any old habit values.
          updateAccountHabitValues();

          if (ret.successCallback)
            ret.successCallback(updatedHabit);
        })
        .error(function() {
          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    // Fixing a deprecation that allowed this to be called with a habit
    habitsService.getHabitValueById = function getHabitValueById(habitOrValueId, habitValueId) {

      var habitValue;
      if (typeof habitOrValueId == 'object')
        habitValue = habitsService.accountHabitValues[habitValueId];
      else
        habitValue = habitsService.accountHabitValues[habitOrValueId];

      if (habitValue && habitValue.active)
        return habitValue;

      return undefined;
    };

    habitsService.getHabitDisplayById = function getHabitDisplayById(habit, habitValueId) {

      var habitValue = habitsService.getHabitValueById(habit, habitValueId);

      return habitsService.getHabitDisplayFromValue(habit, habitValue);
    };

    // We'll translate anything that isn't created by an individual
    habitsService.getHabitName = function getHabitName(habit) {

      if (habitsService.isCustomHabit(habit))
        return habit.name;

      // Try to translate it. If we can't,
      var translated = $translate.instant(habit.name.toUpperCase());
      if (translated == habit.name.toUpperCase())
        return habit.name;

      return translated;
    };

    habitsService.getHabitDisplay = function getHabitDisplay(habit, valueOrdinal) {

      var habitValue = habit.habitValues[valueOrdinal];

      return habitsService.getHabitDisplayFromValue(habit, habitValue);
    };

    habitsService.getHabitIdFromData = function getHabitIdFromData(habitData) {

      var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
      if (habitValue) {

        var habit = habitsService.getAccountHabitById(habitValue.habitId);

        if (habit)
          return habit.id;
      }

      return -1;
    };

    habitsService.getHabitDisplayFromData = function getHabitDisplayFromData(habitData) {

      var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
      if (habitValue) {

        var habit = habitsService.getAccountHabitById(habitValue.habitId);

        return habitsService.getHabitDisplayFromValue(habit, habitValue);
      }

      return $translate.instant('NO_DATA');
    };

    habitsService.getHabitDisplayFromValue = function getHabitDisplayFromValue(habit, habitValue) {

      if (habitValue) {

        if (habitsService.isCustomHabit(habit)) {
          return habitValue.valueString;
        }

        var key;
        if (habit.id == habitsService.MOOD_HABIT_ID) {

          key = 'MOOD_' + habitValue.valueString;
          key = key.replace(' ', '_');

          return $translate.instant(key);
        } else if (habit.id == habitsService.STRESS_HABIT_ID || (habitValue.valueString && habitValue.valueInt < 0)) {
          key = 'HABITS_VALUES_' + habitValue.valueString;
          key = key.replace(/ /g, '_').toUpperCase();

          var text = $translate.instant(key);

          if (!text || text == key)
            text = habitValue.valueString;

          return text;
        } else {
          var key2 = 'HABITS_VALUES_' + habitValue.display;
          key2 = key2.replace(/ /g, '_').toUpperCase();

          var text2 = $translate.instant(key2);

          if (!text2 || text2 == key2)
            text2 = habitValue.display;

          // This is a hack. I'm using the valueInt to say that it is actually and integer
          // valued data point, so add the type on the end.
          return (habitValue.valueString ? habitValue.valueString : habitValue.valueInt) + ' ' + (text2 ? text2 : '');
        }
      }

      return $translate.instant('NO_DATA');
    };

    // This works a little differently now. We used to keep a map of all days that were requested.
    // Now the client only knows
    habitsService.hasHabitData = function hasHabitData(d) {

      var dateString = GeneralService.getDayString(d);

      var dailyData = habitsService.habitData[dateString];
      return typeof dailyData != 'undefined';
    };

    habitsService.getAllMoodHabitData = function getAllMoodHabitData() {

      var ret = [];

      for (var day in habitsService.habitData) {

        var dayData = habitsService.habitData[day];

        // TODO This is a potential problem
        var habit = habitsService.accountHabits[0];

        var habitData = dayData[habit.id];

        if (habitData) {
          for (var i = 0; i < habitData.length; ++i) {

            ret.push(habitData[i]);
          }
        }
      }

      return ret;
    };

    habitsService.canSubmitMood = function canSubmitMood() {

      var habit = habitsService.getAccountHabitValues('Mood');

      var today = new Date();

      var daysData = habitsService.getHabitDataByHabitId(today, habit.id);

      if (daysData) {
        // in ms
        var date;
        if (typeof daysData.experiencedAt == 'object')
          date = daysData.experiencedAt.getTime();
        else
          date = new Date(daysData.experiencedAt).getTime();

        var now = today.getTime();

        if (date > now - (15 * 60 * 1000)) {
          return false;
        }
      }

      return true;
    };

    habitsService.metGoalWithHabitData = function metGoalWithHabitData(habitData) {

      var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
      var habit = habitsService.getAccountHabitById(habitValue.habitId);

      return habitsService.metGoal(habit, habitValue.ordinate);
    };

    habitsService.metGoal = function metGoal(habit, dataOrdinal) {

      return habit.goalMinimized ?
        dataOrdinal <= habit.goalOrdinal :
        dataOrdinal >= habit.goalOrdinal;
    };

    habitsService.getHabitDataByHabitId = function getHabitDataByHabitId(d, habitId) {

      var habit = habitsService.getAccountHabitById(habitId);

      if (!habit)
        return;

      var dateString = GeneralService.getDayString(d);

      var dailyData = habitsService.habitData[dateString];
      if (dailyData) {

        var habitDataList = dailyData[habit.id];

        if (habitDataList) {
          var data = habitDataList[0];

          return data;
        }
      }
    };

    // Note that habits can never have the mood habit in it, because that is
    // always at position 0
    habitsService.reorderHabits = function reorderHabits(habits) {

      var positions = [];

      for (var i = 0; i < habits.length; ++i) {
        var habit = habits[i];

        if (habit.id == habitsService.MOOD_HABIT_ID || habit.id == habitsService.STRESS_HABIT_ID) // Mood and stress
          continue;

        habit.ordinate = i + 1; // don't reorder the mood habit.

        var position = {
          habitId: habit.id,
          ordinate: i + 1
        };

        positions.push(position);

        // Update the local copy
        for (var j = 0; j < habitsService.accountHabits.length; ++j) {

          var existingHabit = habitsService.accountHabits[j];
          if (existingHabit.id == habit.id) {

            existingHabit.ordinate = habit.ordinate;
            break;
          }
        }
      }

      // Make sure these end up ordered correctly.
      habitsService.accountHabits.sort(function(a, b) {

        return a.ordinate - b.ordinate;
      });

      updateLocalAccountHabits();

      return authHttp.post(Environment.serverURL + '/habits/account/reorder', positions);
    };

    habitsService.addHabit = function addHabit(habitId, fromUser) {

      if (fromUser)
        addedHabit = true;

      requiresDataReload = true;

      return authHttp.post(Environment.serverURL + '/habits/account/add', habitId);
    };

    habitsService.addHabits = function addHabits(habitIds, fromUser) {

      if (fromUser)
        addedHabit = true;

      requiresDataReload = true;

      return authHttp.post(Environment.serverURL + '/habits/account/addHabits', habitIds);
    };

    habitsService.addLocalHabitFromId = function addLocalHabitFromId(habitId) {

      for (var i = 0; i < habitsService.accountHabits.length; ++i) {

        if (habitsService.accountHabits[i].id == habitId)
          return;
      }

      var habit;
      for (var j = 0; j < habitsService.potentialHabits.length; ++j) {

        if (habitsService.potentialHabits[j].id == habitId) {
          habit = habitsService.potentialHabits[j];
          break;
        }
      }

      habitsService.addLocalHabit(habit);
    };

    habitsService.addLocalHabit = function addLocalHabit(habit) {

      for (var i = 0; i < habitsService.accountHabits.length; ++i) {
        var existing = habitsService.accountHabits[i];
        if (existing.id == habit.id) {
          console.log("Adding incorrect habit");
          return;
        }
      }

      habitsService.accountHabits.push(habit);

      updateAccountHabitValues();

      habit.ordinate = habitsService.accountHabits.length - 1;

      // This is gross. I think I was just doing it this way to keep it sorted.
      // delete habitsService.potentialHabits[habit.id]; // I think this is right...
      for (var j = 0; j < habitsService.potentialHabits.length; ++j) {
        if (habitsService.potentialHabits[j].id == habit.id) {

          // Splice it out.
          habitsService.potentialHabits.splice(j, 1);
          break;
        }
      }

      updateLocalAccountHabits();
    };

    habitsService.removeHabit = function removeHabit(habitId) {

      requiresDataReload = true;

      return authHttp.post(Environment.serverURL + '/habits/account/remove', habitId);
    };

    habitsService.deleteCustomHabit = function deleteCustomHabit(habitId) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/habits/account/delete', habitId)
        .success(function() {

          for (var j = 0; j < habitsService.potentialHabits.length; ++j) {

            if (habitsService.potentialHabits[j].id == habitId) {

              habitsService.potentialHabits.splice(j, 1);
              break;
            }
          }

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {
          if (ret.errorCallback)
            ret.errorCallback();
        });


      return ret;
    };

    habitsService.removeLocalHabit = function removeLocalHabit(habitId) {

      var habit;
      for (var i = 0; i < habitsService.accountHabits.length; ++i) {
        var accountHabit = habitsService.accountHabits[i];

        if (accountHabit.id == habitId) {

          habit = accountHabit;

          habitsService.accountHabits.splice(i, 1);

          habitsService.potentialHabits.push(habit);
          break;
        }
      }

      for (var j = 0; j < habitsService.accountHabits.length; ++j) {

        habitsService.accountHabits[j].ordinate = j;
      }

      updateLocalAccountHabits();
    };

    function recordOfflineHabitData(habitData) {

      var now = new Date();

      habitData.update = false;

      habitsService.offlineHabitData.push(habitData);

      updateOfflineHabitData();

      checkHabitDataForStreak(habitData);
    }

    function getHabitValueIndex(habit, value) {

      // TODO reversed values like alcohol.

      for (var i = habit.habitValues.length - 1; i >= 0; --i) {

        var habitValue = habit.habitValues[i];

        if (value >= habitValue.valueInt)
          return i;
      }

      // We assume that the value was the first one if we don't have anything.
      return 0;
    }

    habitsService.deleteHabitData = function deleteHabitData(habitData) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/habits/deleteHabitData', {
          habitDataId: habitData.id
        })
        .success(function() {

          var found = false;

          // Remove any data that we have locally.
          for (var day in habitsService.habitData) {

            var dayData = habitsService.habitData[day];

            for (var habitId in dayData) {

              var habitDayData = dayData[habitId];

              for (var i = 0; i < habitDayData.length; ++i) {

                var existingHabitData = habitDayData[i];
                if (existingHabitData.id == habitData.id) {

                  habitDayData.splice(i, 1);
                  found = true;

                  // There are a few places that make assumptions about this existing.
                  if (habitDayData.length === 0)
                    delete dayData[habitId];

                  break;
                }
              }

              if (found)
                break;
            }

            if (found)
              break;
          }

          updateStoredHabitData();

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    habitsService.updateHabitDataNotes = function updateHabitDataNotes(habitDataId, habitNotes) {

      return authHttp.post(Environment.serverURL + '/habits/updateNotes', {
        habitDataId: habitDataId,
        notes: habitNotes
      });
    };

    habitsService.buildMultiHabitDataArray = function buildMultiHabitDataArray(dataArray, habit, valueIndex, experiencedTimestamp, subValueIds, notes, goalMet) {

      var data = {
        habitId: habit.id,
        habitValueId: habit.habitValues[valueIndex].id,
        experiencedAt: experiencedTimestamp,
        goalMet: habit.id > 1 ? !!goalMet : false,
        notes: notes
      };

      if (subValueIds) {
        data.habitSubValueIds = subValueIds;
      }

      dataArray.push(data);
    };

    function checkHabitDataForStreak(habitData) {

      // It looks like we decided to give credit regardless.
      // if (!habitsService.metGoalWithHabitData(habitData))
      //   return;

      // For non-mood and non-stress habits, see if we need to check for streaks.

      // Note we use recordedAt, for when the habit was entered, not experiencedAt, for when
      // the activity was performed.
      if (moment(habitData.recordedAt).startOf('day').valueOf() == moment().startOf('day').valueOf())
        ActivityService.setActivityStreak();
    }

    habitsService.recordMultiHabitData = function recordMultiHabitData(multiHabitDataArray) {

      var ret = createPromise();
      var habitData;
      var i;

      if (Environment.isOnline()) {

        for (i=0; i<multiHabitDataArray.length; ++i) {

          habitData = multiHabitDataArray[i];

          if (habitData.habitId == habitsService.MOOD_HABIT_ID) {
            PathService.checkPathMoodProgress(null, true);
          }
          else if (habitData.habitId != habitsService.STRESS_HABIT_ID) {
            PathService.checkPathHealthProgress(null, true);
          }
        }

        authHttp.post(Environment.serverURL + '/habits/multiRecord', multiHabitDataArray)
          .success(function(newHabitData) {

            // mood rating shouldn't add habits
            if(newHabitData[0].habitId != 1)
              ActivityService.fireActivityCompletion(null, true);

            var today = new Date();

            if (newHabitData) {

              for (i = 0; i < newHabitData.length; ++i) {

                if(newHabitData[i].habitId == habitsService.MOOD_HABIT_ID){
                  PathService.checkPathMoodProgress(newHabitData[i].id);
                } else {
                  PathService.checkPathHealthProgress(newHabitData[i].id);
                }

                habitData = newHabitData[i];

                addLocalHabitData(habitData);

                checkHabitDataForStreak(habitData);
              }
            }
            if (ret.successCallback)
              ret.successCallback(newHabitData);
          })
          .error(function() {

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {

        for (i = 0; i < multiHabitDataArray.length; ++i) {

          habitData = multiHabitDataArray[i];

          var habit = habitsService.getAccountHabitById(habitData.habitId);
          var habitValue = habitsService.getHabitValueById(habitData.habitValueId);

          var localData = habitsService.setLocalHabitData(habit, habitValue.ordinate, habitData.habitSubValueIds, false, habitData.experiencedAt, habitData.notes, habitData);

          recordOfflineHabitData(localData);
        }

        // This is weird. We have to return the object so that the callback can be set, but
        // there will be no remote call so we need to call it.
        ret.success = function(callback) {

          $timeout(callback);

          return ret;
        };
      }

      return ret;
    };

    // The general pattern we want to adopt here is to return to the caller
    // immediately and let them go about their business. This call should
    // handle all results of the update. On failure, it will store to offline
    // data, and if it succeeds we just let it go.
    habitsService.recordHabitData = function recordHabitData(habit, valueIndex, subValueIds, experiencedTimestamp, notes, goalMet) {

      var dataArray = [];

      habitsService.buildMultiHabitDataArray(dataArray, habit, valueIndex, experiencedTimestamp, subValueIds, notes, goalMet);

      return habitsService.recordMultiHabitData(dataArray);
    };

    function updateOfflineHabitDataObj(habitData) {

      var found = false;

      // This is a bit tricky. We need to go through our offline data to find the
      // matching one for today. It may not be there if you recorded it online
      // and then went offline though.
      for (var i = 0; i < habitsService.offlineHabitData.length; ++i) {

        var data = habitsService.offlineHabitData[i];

        var existingDataHabitValue = habitsService.getHabitValueById(data.habitValueId);
        var existingDataHabit = habitsService.getAccountHabitById(existingDataHabitValue.habitId);

        var newDataHabitValue = habitsService.getHabitValueById(habitData.habitValueId);
        var newDataHabit = habitsService.getAccountHabitById(newDataHabitValue.habitId);

        // make sure it's a date obj first and if not, convert it
        if(!data.experiencedAt.getDate)
          data.experiencedAt = new Date(data.experiencedAt);
        if(!habitData.experiencedAt.getDate)
          habitData.experiencedAt = new Date(habitData.experiencedAt);

        if (existingDataHabit.id == newDataHabit.id &&
          GeneralService.getDayString(data.experiencedAt) == GeneralService.getDayString(habitData.experiencedAt)) {
          data.habitValueId = habitData.habitValueId;
          data.habitSubValueIds = habitData.subValueIds;
          data.notes = habitData.notes;

          found = true;
          break;
        }
      }

      // We may be updating a habitData object, but it does not yet exist in the list of offline habit data.
      if (!found) {

        // In the case where you record a value offline and then update it right away, we don't want
        // to set this to update.
        habitData.update = typeof habitData.id == 'number';

        habitsService.offlineHabitData.push(habitData);
      }

      updateOfflineHabitData();
    }


    habitsService.buildMultiHabitDataUpdateArray = function buildMultiHabitDataUpdateArray(dataArray, habit, habitData, valueIndex, experiencedTimestamp, subValueIds, notes, goalMet) {

      var data = {
        habitDataId: habitData.id,
        habitId: habit.id,
        habitValueId: habit.habitValues[valueIndex].id,
        experiencedAt: experiencedTimestamp,
        goalMet: habit.id > 1 ? !!goalMet : false,
        notes: notes
      };

      if (subValueIds) {
        data.habitSubValueIds = subValueIds;
      }

      dataArray.push(data);
    };

    // This is not meant for mood or stress. This is kind of a mess right now really.
    habitsService.updateMultiHabitData = function updateMultiHabitData(dataArray) {

      if (AccountService.canUseSiriNotifications()) {
        window.cordova.plugins.SiriShortcuts.donate({persistentIdentifier: 'pacifica-habit',
                                                     title: $translate.instant('SIRI_HABIT_SHORTCUT_TITLE'),
                                                     suggestedInvocationPhrase: $translate.instant('SIRI_HABIT_SHORTCUT_PHRASE'),
                                                     isEligibleForSearch: true,
                                                     isEligibleForPrediction: true });
        console.log('donated habit to Siri');
      }

      var ret = createPromise();
      var localDataArray = [];
      var habitData;

      for (var i = 0; i < dataArray.length; ++i) {

        habitData = dataArray[i];
        var habit = habitsService.getAccountHabitById(habitData.habitId);

        var habitValue = habitsService.getHabitValueById(habit, habitData.habitValueId);

        var localData = habitsService.setLocalHabitData(habit, habitValue.ordinate, habitData.habitSubValueIds, true, habitData.experiencedAt, habitData.notes, habitData);

        localDataArray.push(localData);

        if (habitData.habitId == habitsService.MOOD_HABIT_ID) {

          PathService.checkPathMoodProgress();
        }
        else if (habitData.habitId != habitsService.STRESS_HABIT_ID) {

          PathService.checkPathHealthProgress();
        }
      }

      if (Environment.isOnline()) {

        authHttp.post(Environment.serverURL + '/habits/multiUpdate', dataArray)
          .success(function() {

            ActivityService.fireActivityCompletion(null, true);

            if (ret.successCallback)
              ret.successCallback();

            for (var k = 0; k < dataArray.length; ++k) {
              habitDataToCheck = dataArray[k];
              checkHabitDataForStreak(habitDataToCheck);
            }
          })
          .error(function updateHabitDataError(data, status, header, config) {

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {

        for (var j = 0; j < localDataArray.length; ++j) {

          habitData = localDataArray[j];

          updateOfflineHabitDataObj(habitData);
        }

        // This is weird. We have to return the object so that the callback can be set, but
        // there will be no remote call so we need to call it.
        ret.success = function(callback) {

          $timeout(callback);

          return ret;
        };
      }

      return ret;
    };

    // It would be nice if we had the habitDataId, but we don't because the updates
    // may have been made locally.
    habitsService.updateHabitData = function updateHabitData(habit, habitData, valueIndex, subValueIds, experiencedTimestamp, notes, metGoal) {

      var dataArray = [];

      habitsService.buildMultiHabitDataUpdateArray(dataArray, habit, habitData, valueIndex, experiencedTimestamp, subValueIds, notes, metGoal);

      return habitsService.updateMultiHabitData(dataArray);
    };

    function check5Consecutive(testFunc) {

      // We could order the list of habits by date
      var dates = [];

      for (var date in habitsService.habitData) {
        dates.push(date);
      }

      dates.sort(function(a, b) {
        return new Date(b) - new Date(a);
      });

      var found = 0;

      var finished = false;

      for (var i = 0;
        (i < dates.length) && !finished; ++i) {

        var date2 = dates[i];
        var dateHabits = habitsService.habitData[date2];

        var moodList = dateHabits[1]; // Habits are indexed by mood here.
        if (moodList) {

          for (var j = 0; j < moodList.length; ++j) {

            var moodData = moodList[j];

            var moodDataHabitValue = habitsService.getHabitValueById(moodData.habitValueId);

            if (testFunc(moodDataHabitValue.valueInt))
              ++found;
            else {
              finished = true;
              break; // We can break out the first time we don't find one.
            }

            if (found >= 5) {
              finished = true;
              break;
            }
          }
        }
      }

      return found >= 5;
    }

    habitsService.has5BadConsecutiveMoodRatings = function has5BadConsecutiveMoodRatings() {

      return check5Consecutive(function(valueInt) {
        return valueInt <= 3;
      });
    };

    habitsService.has5GoodConsecutiveMoodRatings = function has5GoodConsecutiveMoodRatings() {

      return check5Consecutive(function(valueInt) {
        return valueInt >= 5;
      });
    };

    habitsService.getLocaHabitById = function getLocaHabitById(localId) {

      for (var date in habitsService.habitData) {

        var dateHabits = habitsService.habitData[date];
        var moodList = dateHabits[1]; // Indexed by ID
        if (moodList) {

          for (var i = 0; i < moodList.length; ++i) {

            var habitData = moodList[i];

            if (habitData.localId && habitData.localId == localId)
              return habitData;
          }
        }
      }
    };

    habitsService.getHabitDataList = function getHabitDataList(habit, date, create) {

      var dateString = GeneralService.getDayString(date);

      var dateHabits = habitsService.habitData[dateString];
      if (!dateHabits) {
        dateHabits = [];
        habitsService.habitData[dateString] = dateHabits;
      }

      var dataList = dateHabits[habit.id];
      if (!dataList && create) {
        dataList = [];
        dateHabits[habit.id] = dataList;
      }

      return dataList;
    };

    // Add a persisted habitdata object locally. This is similar to setLocalHabitData but a bit
    // simpler as it we have the habitData object already.
    function addLocalHabitData(habitData) {

      var date = habitData.experiencedAt;
      if (typeof date == 'number' || typeof date == 'string') {
        date = new Date(date);
      }

      var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
      var habit = habitsService.getAccountHabitById(habitValue.habitId);

      var dataList = habitsService.getHabitDataList(habit, date, true);

      dataList.splice(0, 0, habitData);

      updateStoredHabitData();
    }

    // This function is similar to below, but designed to be called with a habitData object
    // that is coming back from the server.
    function updateLocalHabitData(habitData) {

      var date = habitData.experiencedAt;
      if (typeof date == 'number' || typeof date == 'string') {
        date = new Date(date);
      }

      var habitValue = habitsService.getHabitValueById(habitData.habitValueId);
      var habit = habitsService.getAccountHabitById(habitValue.habitId);

      var dataList = habitsService.getHabitDataList(habit, date, true);

      var dataToUpdate = dataList[0];

      if (!dataToUpdate) {

        console.log("ERROR: existing habitData MUST exist for this call.");
        return;
      }

      // Just replace it.
      // TODO Technically, this might not be the right one. We need the original
      // localId passed back from the server in order to find the right object to update.
      dataList[0] = habitData;

      updateStoredHabitData();
    }

    // Return the habit data that was updated, if that is the case.
    habitsService.setLocalHabitData = function setLocalHabitData(habit, valueIndex, subValueIds, update, experiencedTimestamp, notes, habitData) {

      // We need to be able to record a local record of the value data.
      var value = habit.habitValues[valueIndex];

      var now = new Date();

      var experiencedAt = experiencedTimestamp ? experiencedTimestamp : now;

      var dataList = habitsService.getHabitDataList(habit, experiencedAt, true);

      var dataToUpdate;

      // If we're updating, get the object out of the list to make sure we use the right ID
      if (update && dataList.length) {

        // Ideally we know exactly which one we're updating.
        if (habitData) {

          for (var i = 0; i < dataList.length; ++i) {

            var dataToCompare = dataList[i];

            if ((dataToCompare.habitDataId && (dataToCompare.habitDataId == habitData.habitDataId)) ||
              (dataToCompare.id && (dataToCompare.id == habitData.habitDataId))) {

              dataToUpdate = dataToCompare;
              break;
            }
          }
        }


        if (!dataToUpdate) {
          dataToUpdate = dataList[0];
        }
      } else {
        dataToUpdate = {
          experiencedAt: experiencedAt
        };
        dataList.splice(0, 0, dataToUpdate);
      }

      // Store a local ID so that we can reference this later if needed.
      if (!dataToUpdate.localId && !dataToUpdate.id)
        dataToUpdate.localId = generateGUID();

      dataToUpdate.habitValueId = value.id;
      dataToUpdate.habitSubValueIds = subValueIds;
      dataToUpdate.recordedAt = now.getTime();
      if (typeof notes !== 'undefined' || typeof dataToUpdate.habitDataNotes !== 'undefined') {

        if (!dataToUpdate.habitDataNotes) {
          dataToUpdate.habitDataNotes = {
            notes: notes
          };
        } else {
          dataToUpdate.habitDataNotes.notes = notes;
        }
      }

      if (typeof dataToUpdate.experiencedAt == 'object')
        dataToUpdate.experiencedAtStr = dataToUpdate.experiencedAt.toString();

      updateStoredHabitData();

      return dataToUpdate;
    };

    habitsService.updateGoalOrdinal = function updateGoalOrdinal(habit) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + "/habits/account/updateGoal", {
          habitId: habit.id,
          goalOrdinal: habit.goalOrdinal
        })
        .success(function() {

          // The habit is a copy, not the one we were originally editing.
          var localHabit = habitsService.getAccountHabitById(habit.id);
          localHabit.goalOrdinal = habit.goalOrdinal;

          updateLocalAccountHabits();

          if (ret.successCallback)
            ret.successCallback();
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    habitsService.getRecentFeelings = function getRecentFeelings() {

      return habitsService.recentFeelings;
    };

    function updateCustomFeeling(subValue) {

      // Don't add the same feeling twice.
      for (var i = 0; i < habitsService.recentFeelings.length; ++i) {

        if (habitsService.recentFeelings[i].id == subValue.id)
          return;
      }

      // Add the feeling.
      habitsService.recentFeelings.splice(0, 0, subValue);

      // if (habitsService.recentFeelings.length > 15)
      //   habitsService.recentFeelings.length = 5;
    }

    habitsService.saveCustomFeelings = function saveCustomFeelings(feelingsToSave) {

      var ret = createPromise();

      var data = [];
      for (var i = 0; i < feelingsToSave.length; ++i) {

        data.push({
          valueString: feelingsToSave[i]
        });
      }

      authHttp.post(Environment.serverURL + '/habits/createSubValues', data)
        .success(function(newSubValues) {

          for (var i = 0; i < newSubValues.length; ++i) {

            var newSubValue = newSubValues[i];
            updateCustomFeeling(newSubValue);
          }

          updateStoredRecentFeelings();

          // We also need to add the sub value to the list of sub values for mood so that it
          // can be found again.
          habitsService.updateMoodHabitSubValues(newSubValues);

          if (ret.successCallback)
            ret.successCallback(newSubValues);
        }).
      error(function() {
        if (ret.errorCallback)
          ret.errorCallback();
      });

      return ret;
    };

    habitsService.saveCustomFeeling = function saveCustomFeeling(valueString, preset) {

      var ret = createPromise();

      authHttp.post(Environment.serverURL + '/habits/createSubValue', {
          valueString: valueString
        })
        .success(function(subValue) {

          updateCustomFeeling(subValue);

          updateStoredRecentFeelings();

          // We also need to add the sub value to the list of sub values for mood so that it
          // can be found again.
          habitsService.updateMoodHabitSubValues([subValue]);

          if (ret.successCallback)
            ret.successCallback(subValue);
        })
        .error(function() {

          if (ret.errorCallback)
            ret.errorCallback();
        });

      return ret;
    };

    // Scoping the inner variables.
    function readHealthKitSleepDay(sleepHabit, daysAgo) {

      var now = new Date();

      // Set to midnight.
      var day = new Date(now.getTime() - (daysAgo * MILLISECONDS_IN_DAY));
      day.setHours(0, 0, 0, 0);

      // We're going to start the readings at 6pm and go through noon.
      var nightStart = new Date(day.getTime() - (6 * MILLISECONDS_IN_HOUR));
      var nightEnd = new Date(day.getTime() + (12 * MILLISECONDS_IN_HOUR));

      console.log("start: " + nightStart);
      console.log("end: " + nightEnd);

      window.plugins.healthkit.querySampleType({
          'startDate': nightStart,
          'endDate': nightEnd,
          'sampleType': "HKCategoryTypeIdentifierSleepAnalysis",
          'ascending': "YES"
        },
        function(value) {

          if (value && value.length > 0) {

            console.log("received sleep results:");
            console.log(value);

            var minutes = 0;

            for (var key in value) {

              var next = value[key];

              var measure = next.value === 1 ? "Sleeping" : "In Bed";

              if (measure == 'Sleeping') {
                var minutesSleep = moment(next.endDate).diff(next.startDate, "minutes");
                var hoursSleep = moment(next.endDate).diff(next.startDate, "hours");

                console.log("Entry got " + minutesSleep + " minutes " + measure);
                console.log("Entry got " + hoursSleep + " hours " + measure);

                minutes += minutesSleep;
              }
            }

            if (minutes === 0)
              return;

            var hours = Math.floor(minutes / 60);

            var valueIndex = getHabitValueIndex(sleepHabit, hours);

            console.log("hours: " + hours + ", index: " + valueIndex);

            var existingData = habitsService.getHabitDataByHabitId(nightEnd, habitsService.SLEEP_HABIT_ID);
            if (existingData) {

              // The idea with updating this is that maybe you had some data recorded, woke
              // up and used Pacifica or something, then went back to sleep for a while.

              var habitValue = habitsService.getHabitValueById(existingData.habitValueId);

              if (valueIndex > habitValue.ordinate)
                habitsService.updateHabitData(sleepHabit, existingData, valueIndex, undefined, nightEnd);
            } else {

              habitsService.recordHabitData(sleepHabit, valueIndex, undefined, nightEnd);
            }
          }
        }
      );

    }

    function readHealthKitSleep() {

      var sleepHabit = habitsService.getAccountHabitById(habitsService.SLEEP_HABIT_ID);
      if (!sleepHabit)
        return;

      // we're going to go 7 days back.
      for (var i = 0; i < 7; ++i) {

        readHealthKitSleepDay(sleepHabit, i);
      }
    }

    // HKQuantityTypeIdentifierDietaryWater

    function getHKHabitValueCallback(habit, habitId, valueDivisor) {

      var readHKHabitValue = function readHKHabitValue(value) {

        if (value && value.length > 0) {

          var habitValue = 0;
          var habitDay;

          // Add up the individual data points.
          for (var key in value) {

            var next = value[key];

            if (!habitDay)
              habitDay = moment(next.startDate).toDate();

            habitValue += next.quantity;
          }

          // e.g. 100mg per drink for caffeine
          var modifiedValue = Math.floor(habitValue / valueDivisor);

          var valueIndex = getHabitValueIndex(habit, modifiedValue);

          var existingData = habitsService.getHabitDataByHabitId(habitDay, habitId);
          if (existingData) {

            habitValue = habitsService.getHabitValueById(existingData.habitValueId);

            if (valueIndex > habitValue.ordinate)
              habitsService.updateHabitData(habit, existingData, valueIndex, undefined, habitDay);
          } else {

            habitsService.recordHabitData(habit, valueIndex, undefined, habitDay);
          }
        }
      };

      return readHKHabitValue;
    }

    function readHealthKitWater() {

      var waterHabit = habitsService.getAccountHabitById(habitsService.WATER_HABIT_ID);
      if (!waterHabit)
        return;

      // we're going to go 7 days back.
      for (var i = 0; i < 7; ++i) {

        var now = new Date();

        // Set to midnight.
        var dayStart = new Date(now.getTime() - (i * MILLISECONDS_IN_DAY));
        dayStart.setHours(0, 0, 0, 0);

        // We're going to start the readings at 6pm and go through noon.
        var dayEnd = new Date(dayStart.getTime() + MILLISECONDS_IN_DAY);

        window.plugins.healthkit.querySampleType({
            'startDate': dayStart,
            'endDate': dayEnd,
            'sampleType': "HKQuantityTypeIdentifierDietaryWater",
            'unit': 'mg'
          },

          // 8 ounces is ~237 milliliters
          getHKHabitValueCallback(waterHabit, habitsService.WATER_HABIT_ID, 237)
        );
      }
    }

    function readHealthKitCaffeine() {

      var caffeineHabit = habitsService.getAccountHabitById(habitsService.CAFFEINE_HABIT_ID);
      if (!caffeineHabit)
        return;

      // we're going to go 7 days back.
      for (var i = 0; i < 7; ++i) {

        var now = new Date();

        // Set to midnight.
        var dayStart = new Date(now.getTime() - (i * MILLISECONDS_IN_DAY));
        dayStart.setHours(0, 0, 0, 0);

        // We're going to start the readings at 6pm and go through noon.
        var dayEnd = new Date(dayStart.getTime() + MILLISECONDS_IN_DAY);

        window.plugins.healthkit.querySampleType({
            'startDate': dayStart,
            'endDate': dayEnd,
            'sampleType': "HKQuantityTypeIdentifierDietaryCaffeine",
            'unit': 'mg'
          },
          getHKHabitValueCallback(caffeineHabit, habitsService.CAFFEINE_HABIT_ID, 100)
        );
      }
    }

    function readHealthKitWorkouts() {

      // Make sure they currently have the exercise habit.
      var exerciseHabit = habitsService.getAccountHabitById(habitsService.EXERCISE_HABIT_ID);
      if (!exerciseHabit)
        return;

      // It doesn't look like the plugin supports much here yet.
      window.plugins.healthkit.findWorkouts({},
        function success(values) {
          console.log("got workouts:");
          console.log(values);

          // This is going to be a map of the day to the amount of exercise in minutes.
          var exerciseData = {};

          if (values && values.length > 0) {

            for (var i = 0; i < values.length; ++i) {

              var value = values[i];

              var endDate = moment(value.endDate).toDate();
              var duration = value.duration / 60; // Returned in seconds, convert to minutes

              // healthkit returns all workouts for all time
              var momentEnd = moment(endDate);
              var cutoff = moment().subtract(1, 'w').startOf('d');
              // if its been more than a week, don't add it
              if(momentEnd.isAfter(cutoff)){

                var endDateString = GeneralService.getDayString(endDate);
                var daysData = exerciseData[endDateString];

                if (!daysData) {
                  daysData = {
                    value: duration,
                    date: endDate
                  };
                  exerciseData[endDateString] = daysData;
                } else {
                  daysData.value += duration;
                }
              }
            }
          }

          for (var day in exerciseData) {

            var daysData2 = exerciseData[day];

            var valueIndex = getHabitValueIndex(exerciseHabit, daysData2.value);

            // Date here is only used to reference the day.
            var existingData = habitsService.getHabitDataByHabitId(daysData2.date, habitsService.EXERCISE_HABIT_ID);
            if (existingData) {

              var habitValue = habitsService.getHabitValueById(existingData.habitValueId);

              if (valueIndex > habitValue.ordinate)
                habitsService.updateHabitData(exerciseHabit, existingData, valueIndex, undefined, daysData2.date);
            } else {

              habitsService.recordHabitData(exerciseHabit, valueIndex, undefined, daysData2.date);
            }
          }

        },
        function failure(err) {

          console.log("failed getting workouts:");
          console.log(err);
        }
      );
    }

    habitsService.saveMindfulMinutes = function saveMindfulMinutes(seconds, successCallback, failureCallback) {

      if (window.plugins && window.plugins.healthkit) {

        // We assume this is numeric for iOS.
        var deviceVersion = device.version;
        var decimal = deviceVersion.indexOf('.');
        if (decimal > 0)
          deviceVersion = deviceVersion.substring(0, decimal);

        // convert to int.
        deviceVersion = +deviceVersion;
        if (deviceVersion >= 10) {
          var isRequesting = habitsService.getIsRequestingHealthkit();
          if(isRequesting)
            return;

          habitsService.setIsRequestingHealthkit();

          window.plugins.healthkit.requestAuthorization({
              // These need to be in both places because they can be initiated from habits or relax.
              'readTypes': ['HKCategoryTypeIdentifierSleepAnalysis', 'HKQuantityTypeIdentifierDietaryCaffeine', 'workoutType'],
              'writeTypes': ['HKCategoryTypeIdentifierMindfulSession']
            },
            function authorizationSuccess() {
              habitsService.unsetIsRequestingHealthkit();
              window.plugins.healthkit.saveMindfulMinutes({
                value: seconds
              });

              if (successCallback)
                successCallback();
            },
            function authorizationFailure(err) {
              habitsService.unsetIsRequestingHealthkit();
              if (failureCallback)
                failureCallback();
            }
          );
        }
      }
    };

    window.readHealthKitData = function readHealthKitData() {

      readHealthKitSleep();

      readHealthKitCaffeine();

      // readHealthKitWater();

      readHealthKitWorkouts();
    };

    habitsService.checkHealthKitAuth = function checkHealthKitAuth(successCallback, failureCallback) {

      if (window.plugins && window.plugins.healthkit) {

        // This apparently looks at the read status.
        window.plugins.healthkit.checkAuthStatus({
            'type': 'HKCategoryTypeIdentifierMindfulSession'
          },
          successCallback,
          failureCallback
        );
      } else {
        $timeout(function() {

          if (successCallback)
            successCallback(false);
        });
      }
    };

    habitsService.unsetIsRequestingHealthkit = function getIsRequestingHealthkit(){
      habitsService.isRequestingHealthkit = undefined;
    };

    habitsService.setIsRequestingHealthkit = function getIsRequestingHealthkit(){
      habitsService.isRequestingHealthkit = true;
    };

    habitsService.getIsRequestingHealthkit = function getIsRequestingHealthkit(){
      return habitsService.isRequestingHealthkit;
    };

    habitsService.initHealthKit = function initHealthKit(successCallback, failureCallback) {

      // Initialize HealthKit stuff
      if (window.plugins && window.plugins.healthkit) {

        window.plugins.healthkit.available(
          function success() {
            var isRequesting = habitsService.getIsRequestingHealthkit();
            if(isRequesting)
              return;

            habitsService.setIsRequestingHealthkit();
            window.plugins.healthkit.requestAuthorization({
                // These need to be in both places because they can be initiated from habits or relax.
                // This was not working: 'HKQuantityTypeIdentifierDietaryWater',
                'readTypes': ['HKCategoryTypeIdentifierSleepAnalysis', 'HKQuantityTypeIdentifierDietaryCaffeine', 'workoutType'],
                'writeTypes': ['HKCategoryTypeIdentifierMindfulSession']
              },
              function authorizationSuccess() {
                habitsService.unsetIsRequestingHealthkit();
                readHealthKitData();

                if (successCallback)
                  successCallback();
              },
              function authorizationFailure(err) {
                habitsService.unsetIsRequestingHealthkit();
                if (failureCallback)
                  failureCallback();
              }
            );
          },
          function failure() {
            console.log("healthkit not available");
          });
      }
    };

    habitsService.getHabitData = function getHabitData(){
      return habitsService.habitData;
    };

    habitsService.updateLocalHabitValue = function updateLocalHabitValue(habitVal){
      // need to udpate the value in habitData for progress graph in feed
      var experiencedAt = new Date(habitVal.experiencedAt);
      var dateString = GeneralService.getDayString(experiencedAt);
      if(habitsService.habitData[dateString]){
        var habits = habitsService.habitData[dateString];
        _.each(habits, function(habit){
          _.each(habit, function(hab){
            if(habitVal.id == hab.id){
              var newHabitValue = habitsService.getHabitValueById(habitVal.habitValueId);
              hab.valueInt = newHabitValue.valueInt;
              hab.valueString = newHabitValue.valueString;
            }
          });
        });
      }
    };

    habitsService.confirmLeaveMood = function confirmLeaveMood(confirmCallback){
      // hitting hw back button multiple times will create multiple popups
      if(showingConfirmLeaveMood)
        return;
      OverlayService.popup.confirm({
        template: $translate.instant('THOUGHTS_GO_BACK_PROMPT'),
        cancelText: $translate.instant('CANCEL'),
        cancelType: 'button-default',
        okText: $translate.instant('CONFIRM'),
        okType: 'button-default'
      }).then(function(res) {
        showingConfirmLeaveMood = false;
        if (res) {
          confirmCallback();
        }
      });
      showingConfirmLeaveMood = true;
    };

    return habitsService;

  }
]);

var servicesModule = angular.module('homeworkService', []);

servicesModule.factory('HomeworkService', ['authHttp', '$translate', 'Environment', '$rootScope', 'ActivityService',
  function(authHttp, $translate, Environment, $rootScope, ActivityService) {

  var homeworkService = {
    homeworkRequests: [],
  };

  homeworkService.annotateRequests = function annotateRequests(ctx){
    _.each(ctx, function(request){
      // create moment object for formatting in template
      request.reminderDate = request.reminderDate ? moment(request.reminderDate) : request.reminderDate;
      request.completedAt = request.finishedAt ? moment(request.finishedAt) : request.finishedAt;
      if(request.activityId){
        request.activity = homeworkService.getActivityById(request.activityId);
      }
    });
    return ctx;
  };

  homeworkService.addRequest = function addRequest(request){
    homeworkService.homeworkRequests.push(request);
    var hw = homeworkService.annotateRequests([request]);
    $rootScope.$broadcast('event:homeworkAdded', hw[0]);
  };

  homeworkService.setHomeworkContext = function setHomeworkContext(ctx) {
    homeworkService.homeworkRequests = homeworkService.annotateRequests(ctx);
  };

  homeworkService.getHomeworkRequests = function getHomeworkRequests(){
    return homeworkService.homeworkRequests;
  };

  homeworkService.getActivityById = function getActivityById(activityId){
    return ActivityService.getActivityById(activityId);
  };

  homeworkService.getActivityCategory = function getActivityCategory(request){
    return ActivityService.getCategoryForActivity(request.activity.name);
  };

  homeworkService.getCategoryName = function getCategoryName(request){
    var category;
    if(request.activityId){
      category = homeworkService.getActivityCategory(request);
      if(category == 'relax'){
        return $translate.instant('RELAX_ACTIVITY');
      }
    } else {
      category = request.activityCategory;
    }
    if(category.toLowerCase() == 'goals')
      return $translate.instant('GOALS');
    if(category.toLowerCase() == 'thoughts')
      return $translate.instant('THOUGHT_ENTRY');
    if (category.toLowerCase() == 'relax')
      return $translate.instant('RELAX_ACTIVITY');
    else
      return $translate.instant('HEALTH_HABIT');
  };

  homeworkService.getHomeworkScreenshot = function getHomeworkScreenshot(homework) {

    if (typeof homework === 'undefined' || typeof homework.type === 'undefined'){
      return;
    }

    if (homework.type.type === 'goal') {
      return '/img/homework-screenshots/goal/any-goal.png';
    }

    if (homework.type.type === 'health') {
      if (homework.exercise && homework.exercise.habitId > 20)
        return '/img/homework-screenshots/health/any-health-habit.png';
    }

    var screenshotPath = '/img/homework-screenshots/';
    var categoryPath = homework.type.type + '/';
    var title = $translate.instant(homework.exercise.displayKey) || homework.exercise.title;
    if(!title)
      title = $translate.instant(homework.exercise.activityDisplay); // for thoughts
    var filename = title.split(' ').join('-').toLowerCase().replace('.', '') + '.png';
    return screenshotPath + categoryPath + filename;
  };

  homeworkService.cancelHomework = function(clientId, hwId){
    return authHttp.delete('/app/practitioner/client/' + clientId + '/homework/' + hwId);
  };
  
  homeworkService.getUserHomework = function(){
    return authHttp.get(Environment.serverURL + '/account/homework');
  };

  homeworkService.checkForCompletedHomework = function checkForCompletedHomework(){
    if(homeworkService.homeworkRequests.length){
      homeworkService.getUserHomework()
        .success(function(data){
          _.each(data, function(hw){
            if(hw.finishedAt){
              var request = _.find(homeworkService.homeworkRequests, {id: hw.id});
              request.finishedAt = hw.finishedAt;
              request.completedAt = request.finishedAt ? moment(request.finishedAt) : request.finishedAt;
            }
          });
        }).error(function(err){
          console.log('error refreshing hw: ' + err);
        });
    }
  };

  return homeworkService;

}]);

var servicesModule = angular.module('httpTimeoutService', []);

/**
 * This object limits all angular requests to 10s timeouts. Note that
 * it does not affect video download or audio upload since those use
 * the native plugin.
 */
servicesModule.factory('HttpTimeoutService', function() {

  return {

  };
});

// register the interceptor as a service
// intercepts ALL angular ajax HTTP calls
servicesModule.factory('timeoutHttpIntercept', [function() {
  return {

    // optional method
    'request': function(config) {
      config.timeout = 10000;
      return config;
    }
  };
}]);

// Add the error service as an interceptor.
servicesModule.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('timeoutHttpIntercept');
  }
]);

var mod = angular.module('mediaService', []);

/*
 * This service is designed to handle local media. There are a few cross-platform
 * quirks that we want to centralize so that we don't need to handle the same
 * thing all over the place.
 */
mod.factory('MediaService', ['$rootScope', '$timeout', '$translate', 'authHttp', 'AccountService', 'Environment',
  function($rootScope, $timeout, $translate, authHttp, AccountService, Environment) {

  // Populated when the device is ready.
  var storageLocation = '';
  var oldStorageLocation = '';

  var mediaService = {

    // This is an object of objects that will look like:
    // filename: {
    //   filename: XXX,
    //   location: XXX,
    //   nativeURL: XXX
    // }
    downloadedFiles: {},
    downloadingFiles: {}
  };

  mediaService.getBackgroundVideos = function() {

    return [
    {
      name: $translate.instant('BG_VIDEO_WAVES'),
      code: 'waves',
      filename: 'waves.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_ALPINE_LAKE'),
      code: 'alpinelake',
      filename: 'alpinelake.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_MOUNTAIN_PEAK'),
      code: 'mountain-peak',
      filename: 'mountainpeak.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_FOREST_CREEK'),
      code:'forest-creek',
      filename: 'forestcreek.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_OVER_EARTH'),
      code:'over-earth',
      filename: 'overearth.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_NIGHT_SKY'),
      code: 'night-sky',
      filename: 'nightsky.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_CITY_LIGHTS'),
      code:'city-lights',
      filename: 'citylights.mp4',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_TROPICAL'),
      code: 'tropical',
      filename: 'tropical.mp4',
      bgAudio: 'Ocean',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_OCEAN_BLUE'),
      code: 'ocean2',
      filename: 'ocean2.mp4',
      bgAudio: 'Ocean',
      blurMethod: 'light',
      free: true
    }, {
      name: $translate.instant('BG_VIDEO_OCEAN_SUNSET'),
      code: 'ocean',
      filename: 'ocean.mp4',
      bgAudio: 'Ocean',
      blurMethod: 'light',
      free: true
    },{
      name: $translate.instant('BG_VIDEO_STREAM'),
      code: 'stream',
      filename: 'forest.mp4',
      bgAudio: 'ForestMorning',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_CLOUDS'),
      code: 'clouds',
      filename: 'clouds.mp4',
      bgAudio: 'Pinknoise',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_CAMPFIRE'),
      code: 'campfire',
      filename: 'campfire.mp4',
      bgAudio: 'campfire',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_MOUNTAINS'),
      code: 'mountains',
      filename: 'mountains.mp4',
      bgAudio: 'ForestMorning',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_WATER'),
      code: 'water',
      filename: 'pond.mp4',
      bgAudio: 'Bach',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_SUNSET'),
      code: 'sunset',
      filename: 'summernight.mp4',
      bgAudio: 'SummerNight',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_WATERFALL'),
      code: 'waterfall',
      filename: 'waterfall.mp4',
      bgAudio: 'Stream',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_LIGHTNING'),
      code: 'thunderstorm',
      filename: 'thunderstorm.mp4',
      bgAudio: 'Thunderstorm',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_FIELD'),
      code: 'field',
      filename: 'field.mp4',
      bgAudio: 'SummerNight',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_LAKE'),
      code: 'lake',
      filename: 'lake.mp4',
      bgAudio: 'ForestMorning',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_REEF'),
      code: 'reef',
      filename: 'reef.mp4',
      bgAudio: 'Pinknoise',
      blurMethod: 'light',
      free: false
    }, {
      name: $translate.instant('BG_VIDEO_FLOWERS'),
      code: 'flowers',
      filename: 'flowers.mp4',
      bgAudio: 'ForestMorning',
      blurMethod: 'light',
      free: false
    }];
  };

  mediaService.currentBackgroundVideo = mediaService.getBackgroundVideos()[0];

  mediaService.getCurrentBackgroundVideo = function() {
    return mediaService.currentBackgroundVideo;
  };

  mediaService.initializeBackgroundVideo = function() {
    var videos = mediaService.getBackgroundVideos();
    var pref = AccountService.getUserPreference('background_video');

    if (!pref) {
      pref = videos[0].code;
    }

    for (var i = 0; i < videos.length; ++i) {

      var video = videos[i];

      if (video.code == pref) {

        if (!mediaService.isDownloaded(video.filename) || (!AccountService.isPremiumEnabled() && !video.free)) {

          video = videos[0];
        }

        mediaService.setBackgroundVideo(video.filename, video.blurMethod);
        break;
      }
    }
  };

  function foundDirectoryFiles(entries) {

    for (var i = 0; i < entries.length; i++) {

      var entry = entries[i];

      if (entry.isFile) {

        console.log("Found file: " + entry.name);

        mediaService.downloadedFiles[entry.name] = {
          filename: entry.name,
          location: entry.fullPath,
          nativeURL: entry.nativeURL
        };
      }
    }

    // Preload the meditations after we have looked for existing ones so
    // we avoid re-downloading
    preloadMeditations();
  }

  function missingDirectoryFiles(error) {

    console.log("Could not find directory files.");

    // Preload the meditations after we have looked for existing ones so
    // we avoid re-downloading
    preloadMeditations();
  }

  function checkDirectory(fileSystem, directory) {

    window.resolveLocalFileSystemURL(storageLocation, function(dir) {

      dir.getDirectory(directory, {
          create: false,
          exclusive: false
        },
        function onGetSucceed(dirEntry) {
          console.log("got directory: ");
          console.log(dirEntry);

          var directoryReader = dirEntry.createReader();

          directoryReader.readEntries(function(entries) {

            foundDirectoryFiles(entries);

            // The timing is a bit annoying here. Try to initialize this once we've read the backgrounds.
            if (directory == 'backgrounds')
              mediaService.initializeBackgroundVideo();

          }, missingDirectoryFiles);
        },
        function onGetFail() {
          console.log("did not get " + directory + " directory.");

          console.log(fileSystem.root);

          // Make sure this gets populated the first time.
          preloadMeditations();

        });
    });
  }

  function checkFileSystem(fileSystem) {

    checkDirectory(fileSystem, 'meditations');
    checkDirectory(fileSystem, 'backgrounds');
  }

  function missingFileSystem(fileSystem) {

    console.log("Could not find persistent file system.");
  }

  // We want to avoid trying this multiple times because we'll keep displaying the permission
  // dialog on Android.
  var attemptedFileRead = false;

  // We need to check over the downloaded files in the meditations directory.
  window.checkExistingFiles = function() {

    var checked = false;

    if ((!Environment.isOnline()) || (window.LocalFileSystem && !attemptedFileRead)) {

      checked = true;
      attemptedFileRead = true;

      if (Environment.isAndroid()) {

        cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus(function(status){
          if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, checkFileSystem, missingFileSystem);
          }
        }, function(error){
          console.error("The following error occurred: "+error);
        });
      } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, checkFileSystem, missingFileSystem);
      }
    }

    return checked;
  };

  function preloadMeditations() {

    // NOTE: We aren't actually doing this anymore since they are pretty large files
    // to add to the total download size.
    // preloadMeditation('musclerelaxation.mp3');
    // preloadMeditation('mindfulsenses.mp3');
  }

  // We need to prelaod a few files
  function preloadMeditation(src) {

    if (mediaService.isDownloaded(src))
      return;

    var assetUrl = cordova.file.applicationDirectory + 'www/img/narrations/' + src;

    var filePath = storageLocation + 'meditations/' + src;

    var ft = new FileTransfer();
    ft.download(assetUrl, filePath,
      function(entry) {

        console.log("copy complete: " + src);

        // Make sure these are updated.
        window.checkExistingFiles();
      },
      function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
      }
    );
  }

  // Make sure the platform is ready and that there is a user logged in.
  $rootScope.$on('event:userContextInitialized', function(event, args) {
    // Android needs permission to read from the device so we want to
    // control when that popup is displayed a bit more effectively.
    if (Environment.isIos() || !args || !args.creatingAccount) {

      var checked = window.checkExistingFiles();
      // This would happen as a part of checkExistingFiles otherwise.
      if (!checked)
        mediaService.initializeBackgroundVideo();
    }
  });

  mediaService.getStorageLocation = function(){
    return storageLocation;
  };

  // There will be no context initialization above, so if we're offline, we have to check
  // the existing files.
  // TODO I wonder if this should be stored in the app somehow.

  mediaService.initStorageLocation = function(){

    if (window.cordova) {

      if (Environment.isIos()) {
        oldStorageLocation = 'cdvfile://localhost/library-nosync/';
        storageLocation = 'cdvfile://localhost/documents-nosync/';
      } else {
        storageLocation = cordova.file.dataDirectory;
      }
    }

    // We can't check if the user is logged in because the data has not been read.
    if (!Environment.isOnline()) {

      window.checkExistingFiles();
    }
  };

  var playOptions = {
    playAudioWhenScreenIsLocked: false
  };

  mediaService.isNative = function isNative() {
    return typeof window.Media != 'undefined';
  };

  // This stuff is such a mess. We don't use the below function because it handles
  // mp3s that are part of the application.
  mediaService.loadMeditationMedia = function loadMeditationMedia(src, isDownloaded, statusCallback) {
    if (window.Media) {
      if(isDownloaded){
        // Gross
        if (Environment.isAndroid())
          src = storageLocation + src;
        else
          src = storageLocation + src;

        window.resolveLocalFileSystemURL(src, function(fileLoc) {

          if (fileLoc) {

            var loc = fileLoc.toInternalURL();

            console.log("actual url: " + loc);
          }
        });
      }

      return new Media(src,
        function getMediaSuccess() {

          console.log("Loaded Media: " + src);
        },
        function getMediaFailure(error) {

          console.log("Failed Loading Media: " + src + ", Error: ");
          console.log(error);
        },
        statusCallback);
    }
  };

  // src here is intended to be the www-relative source. So if something is in
  // www/img/goal.mp3, the source should be img/goal.mp3
  mediaService.loadMedia = function loadMedia(src, elementId, statusCallback) {

    var prefix = '';
    if (!src.startsWith('http') && window.device && window.device.platform && window.device.platform.toLowerCase() == 'android') {
      prefix = '/android_asset/www/';
    }

    if (window.Media) {
      return new Media(prefix + src,
        function getMediaSuccess() {

          console.log("Loaded Media: " + src);
        },
        function getMediaFailure(error) {

          console.log("Failed Loading Media: " + src + ", Error: ");
          console.log(error);
        },
        statusCallback);
    }
  };

  // storage e.g. LocalFileSystem.TEMPORARY
  function loadFile(storage, src, callback) {
    function onFileSystemSuccess(fileSystem) {

      // Need to create file to record to it.
      fileSystem.root.getFile(src, {
          create: true,
          exclusive: false
        },
        function onGetSucceed(fileEntry) {
          callback(fileEntry);
        },
        function onGetFail() {
          console.log("did not get file.");
        });
    }

    function fail() {
      console.log("failed getting filesystem");
    }

    if (window.LocalFileSystem)
      window.requestFileSystem(storage, 0, onFileSystemSuccess, fail);
  }

  mediaService.loadRecording = function loadRecording(Environment, src, variable, scope, statusCallback) {

    // Doing it this way seems to get around an issue with the file not being
    // available at the localhost/temporary location right away.
    var createMedia = function createMedia(filePath) {

      // Note that we're intentionally not using the MediaService here. Recording
      // needs to go to a specific location.
      scope[variable] = new Media(filePath,
        // success callback
        function(data) {
          console.log("Created media: " + filePath);
        },

        // error callback
        function(err) {
          console.log("Could not create media [" + filePath + "] " + err.code + ", " + err.message);
        },

        statusCallback);

      scope[variable].setVolume(1);

    };

    loadFile(LocalFileSystem.TEMPORARY, src, function(fileEntry) {
      if (Environment.isAndroid())
        createMedia(fileEntry.nativeURL);
      else
        createMedia(fileEntry.fullPath);
    });
  };

  mediaService.setVolume = function setVolume(media, volume) {
    if (media) {
      if (media.setVolume) {
        media.setVolume(volume);
      } else {
        media.volume = volume;
      }
    }
  };

  mediaService.fadeIn = function fadeIn(media, volume) {

    if (!media)
      return;

    var fadeSteps = 100;
    var step = 0;

    var hasMedia = mediaService.isNative();

    function fadeInLocal() {

      if (hasMedia)
        media.setVolume(volume * (step / fadeSteps));
      else
        media.volume = volume * (step / fadeSteps);

      if (step < fadeSteps) {
        $timeout(fadeInLocal, 3000 / fadeSteps);
        ++step;
      } else {
        step = 0;
      }
    }

    fadeInLocal();
  };

  mediaService.fadeOut = function fadeOut(media, volume, callback, time) {

    if (!media)
      return;

    var fadeOutTime = time ? time : 3000;

    var fadeSteps = 100;
    var step = 0;

    var hasMedia = mediaService.isNative();

    function fadeOutLocal() {

      if (hasMedia)
        media.setVolume(volume * ((fadeSteps - step) / fadeSteps));
      else
        media.volume = volume * ((fadeSteps - step) / fadeSteps);

      if (step < fadeSteps) {
        $timeout(fadeOutLocal, fadeOutTime / fadeSteps);
        ++step;
      } else {
        step = 0;

        if (callback)
          callback();
      }
    }


    fadeOutLocal();
  };

  mediaService.replayMedia = function replayMedia(media, options) {

    if (!mediaService.isNative()) {

      media.load();
      media.play();
    } else {

      if (!options)
        options = playOptions;

      media.play(options);
    }
  };



  /*
   * The MediaService is also going to be responsible for tracking and storing downloaded audio data
   * from exercises within the application.
   */

  mediaService.isDownloaded = function isDownloaded(filename) {

    var file = mediaService.downloadedFiles[filename];

    return !!file;
  };

  mediaService.isDownloading = function isDownloading(filename) {

    var file = mediaService.downloadingFiles[filename];

    return !!file;
  };

  mediaService.getDownloadPercentage = function getDownloadPercentage(filename) {

    var progress = mediaService.downloadingFiles[filename];

    if (progress) {

      return Math.round(progress.progress * 100);
    }

    return 0;
  };

  function downloadAudioFile(path, localLocation, filename, successCallback, failureCallback) {

    mediaService.downloadingFiles[filename] = {
      filename: filename,
      progress: 0,
      complete: false
    };

    authHttp.get(Environment.serverURL + path + "?filename=" + filename)
      .success(function(response) {

        console.log("Got url: " + response.url);

        if (window.cordova) {
          var localFile = storageLocation + localLocation + filename;

          var ft = new FileTransfer();

          ft.onprogress = function(progressEvent) {

            if (progressEvent.lengthComputable) {

              var progressData = {

                filename: filename,
                progress: (progressEvent.loaded / progressEvent.total),
                complete: false
              };

              mediaService.downloadingFiles[filename] = progressData;

              $rootScope.$broadcast('event:downloadProgress', progressData);

            }
          };

          ft.download(response.url, localFile,

            function(entry) {
              console.log("download complete: ");
              console.log(entry);

              delete mediaService.downloadingFiles[filename];

              mediaService.downloadedFiles[filename] = {
                filename: filename,
                location: localFile,
                nativeURL: entry.nativeURL
              };

              $rootScope.$broadcast('event:downloadProgress', {

                filename: filename,
                progress: 1,
                complete: true
              });

              if (successCallback)
                successCallback();
            },
            function(error) {
              console.log("download error source " + error.source);
              console.log("download error target " + error.target);
              console.log("upload error code" + error.code);

              if (failureCallback)
                failureCallback();
            }
          );
        }
      })
      .error(function(data, status, headers, config) {

        console.log("Error downloading file: " + data);
      });
  }

  function downloadFileIfNeeded(remoteLocation, localLocation, filename, successCallback, failureCallback) {

    if (mediaService.downloadingFiles[filename]) {

      console.log("Currently downloading file: " + filename);
      return;
    } else if (mediaService.downloadedFiles[filename]) {

      console.log("Already downloaded file: " + filename);
    }

    if (Environment.isAndroid() && cordova.plugins.diagnostic) {

      cordova.plugins.diagnostic.requestRuntimePermission(function(status) {
        switch (status) {
          case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
            console.log("Permission granted to store files.");

            downloadAudioFile(remoteLocation, localLocation, filename, successCallback, failureCallback);

            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
            console.log("Permission to store files has not been requested yet");
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
            console.log("Permission denied to store files.");

            if (failureCallback)
              failureCallback();
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied to store files");

            if (failureCallback)
              failureCallback();

            break;
        }
      }, function(error) {
        console.error("The following error occurred: " + error);
      }, cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE);
    } else {

      downloadAudioFile(remoteLocation, localLocation, filename, successCallback, failureCallback);
    }
  }

  mediaService.requestFileSystemPermission = function requestFileSystemPermission() {

    if (Environment.isAndroid()) {
      cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus(function(status){
          if(status !== cordova.plugins.diagnostic.permissionStatus.GRANTED){
            var successCallback = angular.noop;
            var errorCallback = angular.noop;
            cordova.plugins.diagnostic.requestExternalStorageAuthorization(successCallback, errorCallback);
          }
      }, function(error){
          console.error("The following error occurred: "+error);
      });
    }
  };

  mediaService.getStreamingMeditationURL = function getStreamingMeditationURL(filename) {
    // for web
    return authHttp.get(Environment.serverURL + '/media/meditationStream?filename=' + filename);
  };

  mediaService.getStreamingAppMeditationURL = function getStreamingMeditationURL(filename) {
    // for app
    return authHttp.get(Environment.serverURL + '/media/meditationURL?filename=' + filename);
  };

  mediaService.getStreamingBackgroundURL = function getStreamingBackgroundURL(filename) {

    return authHttp.get(Environment.serverURL + '/media/backgroundStream?filename=' + filename);
  };

  mediaService.downloadBackgroundVideo = function downloadBackgroundVideo(filename, successCallback, failureCallback) {

    downloadFileIfNeeded('/media/backgroundVideoURL', 'backgrounds/', filename, successCallback, failureCallback);
  };

  mediaService.setBackgroundVideo = function setBackgroundVideo(filename, blurMethod) {

    // This is the default.
    if (filename == 'waves.mp4') {
      if (window.plugins && window.plugins.bgVideo) {
        window.plugins.bgVideo.setVideo(undefined);
      }

      mediaService.currentBackgroundVideo = mediaService.getBackgroundVideos()[0];
    } else if (!mediaService.isDownloaded(filename)) {
      console.log('File is not downloaded: [' + filename + '], can not set as video.');
      return;
    } else {
      if (window.plugins && window.plugins.bgVideo) {
        var location = mediaService.downloadedFiles[filename].nativeURL;
        if (location.indexOf('file') === 0)
          location = location.substring(7); // remove "file://"

        window.plugins.bgVideo.setVideo(location, blurMethod);
      }

      mediaService.currentBackgroundVideo = mediaService.getBackgroundVideos()
        .find(function(video) {
          return video.filename === filename;
        }) || mediaService.getBackgroundVideos()[0];
    }

  };

  /*
   * Request the signed URL from the server in order to download the file to the local application.
   */
  mediaService.downloadMeditationFile = function downloadMeditationFile(filename, successCallback, failureCallback) {

    downloadFileIfNeeded('/media/meditationURL', 'meditations/', filename, successCallback, failureCallback);
  };

  function removeFile(location, filename) {

    window.resolveLocalFileSystemURL(location, function(fileLoc) {

      if (fileLoc) {

        fileLoc.remove(
          function(file) {

            delete mediaService.downloadedFiles[filename];

            $rootScope.$broadcast('event:downloadRemoved', filename);

            console.log("File removed!");
          },
          function() {
            console.log("error deleting the file " + error.code);
          }
        );
      } else {
        console.log("file does not exist");
      }
    });
  }

  mediaService.removeMeditationFile = function removeMeditationFile(filename) {

    var location = 'meditations/' + filename;

    location = storageLocation + location;

    removeFile(location, filename);
  };

  mediaService.removeBackgroundVideo = function removeBackgroundVideo(filename) {

    var location = 'backgrounds/' + filename;

    location = storageLocation + location;

    removeFile(location, filename);
  };

  return mediaService;

}]);

var servicesModule = angular.module('notificationService', []);

servicesModule.factory('NotificationService', ['$rootScope', '$translate', 'Environment', 'AccountService', 'HabitsService', 'GeneralService', 'StorageService',

  function($rootScope, $translate, Environment, AccountService, HabitsService, GeneralService, StorageService) {

    var HABIT_ID_LOCAL_NOTIFICATION_BASE = 1000;
    var RELAX_REMINDER_ID = 2000;
    var FIRST_ONBOARDING_ID = 3000;
    var SECOND_ONBOARDING_ID = 4000;
    var ACTIVITY_REMINDER_ID = 5000;

    var notificationService = {
      push: undefined,
      registrationId: undefined,
      onboardingNotificationsSet: false
    };

    function checkStorageForId(){
      var regId = StorageService.getItem('notificationRegistrationId', function(id){
        if(regId) {
          notificationService.registrationId = regId;
          notificationService.registerDevice();
        }
      });
    }

    notificationService.registerDevice = function registerDevice() {

      if (notificationService.registrationId) {
        if (Environment.isAndroid()) {
          AccountService.registerGCMToken(notificationService.registrationId, function(response) {
            // This happens when we pass a registrationid that is the same as the one the
            // server already has but the endpoint is marked disabled by AWS SNS
            if (response.status == 409) {
              console.log("Server rejected reg token ", notificationService.registrationId);
              notificationService.push.unregister(
                function onSuccess() {
                  // hopefully there is no case where this causes an infinite loop
                  notificationService.push = undefined;
                  notificationService.registerNotifications();
                },
                function onError() {
                  console.log("Unable to unregister");
                }
              );
            }
          });
        } else {
          AccountService.registerAPNSToken(notificationService.registrationId);
        }
      } else {
        checkStorageForId();
      }
    };

    notificationService.registerNotifications = function registerNotifications(successCallback, errorCallback) {

      if (notificationService.push) {
        if(AccountService.isLoggedIn()){
          notificationService.registerDevice();
        }
        if (successCallback)
          successCallback();
      }
      // Prevent calling this twice, it can cause a crash.
      else if (window.PushNotification && !notificationService.push) {

        var initObj = {
          "android": {
            "senderID": "435361669565",
            "icon": "notif",
            "iconColor": "#1ac88d",
            "clearNotifications": "false"
          },
          "ios": {
            "alert": "true",
            "badge": "true",
            "sound": "true",
            "clearBadge": "true"
          }
        };
        if(Environment.isIos() && ionic.Platform.version() >= 10){
          initObj.ios.categories = {
            "daily": {
              "yes": {
                callback: 'stopNotifications',
                title: $translate.instant('STOP_NOTIFICATIONS'),
                foreground: true,
                destructive: true // colors the button red
              }
            }
          };
        }

        notificationService.push = PushNotification.init(initObj);

        // This is called when the action for stopping notifications in the push notification
        // itself is clicked.
        notificationService.push.on('stopNotifications', function(data) {

          AccountService.setUserPreference('notification_timing', 'none')
            .success(function() {

              GeneralService.showToast($translate.instant('NOTIFICATIONS_STOPPED_SUCCESS'));
            })
            .error(function(data, status, headers, config) {

              GeneralService.showToast($translate.instant('NOTIFICATIONS_STOPPED_ERROR'));
            });

          notificationService.push.finish(function() {
            console.log("processing of stop notification action is finished");
          });
        });

        notificationService.push.on('registration', function(data) {

          console.log("received registration:", data);

          notificationService.registrationId = data.registrationId;

          if(AccountService.isLoggedIn()){
            notificationService.registerDevice();
          } else {
            StorageService.setItem('notificationRegistrationId', notificationService.registrationId);
          }

          if (successCallback)
            successCallback();
        });

        notificationService.push.on('notification', function(data) {
          // data.message,
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData

          console.log("received notification: ", data);

          if (data.additionalData) {

            if (data.additionalData.foreground) {

              var message = $translate.instant('RECEIVED') + ': ' + (_.isUndefined(data.message) ? data.additionalData.text : data.message);

              GeneralService.showToast(message, false);

              if (data.additionalData.refresh) {

                // This is fine when the app is in the foreground.
                $rootScope.$broadcast('event:userContextRefreshRequest');
              }
            }
            else if (data.additionalData.url) {

              // Don't use StorageService here because it might not be ready.
              localStorage.setItem("externalLoadURL", data.additionalData.url);

              window.checkExternalURL();
            }
          }

          // Only do this for background tasks.
          if (Environment.isIos() && data.additionalData['content-available']) {

            notificationService.push.finish(function() {
              console.log("processing of push data is finished");
            });
          }
        });

        notificationService.push.on('error', function(e) {
          console.log("There was an error registering notifications.", e);

          if (errorCallback) {
            errorCallback();
          }
        });
      }
    };

    function updateOldNotification(reminder, callback){
      var text = reminder.text;
      var id = reminder.id;
      var reminderDate = new Date(reminder.at * 1000);

      notificationService.cancelReminder(id, function(){
        notificationService.scheduleReminder(id, text, reminderDate, true, function(){
          notificationService.queryForReminder(id, callback);
        });
      });
    }

    notificationService.queryForReminder = function(id, callback, notFoundCallback){
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification && window.cordova.plugins.notification.local) {
        cordova.plugins.notification.local.get(id, function(notification) {
          if (notification && typeof notification != 'string') {
            console.log("got notification: " + notification.text);
            //onboarding notifications are meant to fire once, not recurring
            if(notification.at && notification.id != FIRST_ONBOARDING_ID && notification.id != SECOND_ONBOARDING_ID){ // old format, need to update
              updateOldNotification(notification, callback);
            } else {
              if (callback) {
                callback(notification);
              }          
            }
          } else {
            if(notFoundCallback){
              notFoundCallback();
            }
          }
        });
      }  
    };

    notificationService.queryForRelaxReminder = function(callback){
      notificationService.queryForReminder(RELAX_REMINDER_ID, callback);
    };

    notificationService.queryForHabitReminder = function queryForHabitReminder(habit, callback) {
      var id = HABIT_ID_LOCAL_NOTIFICATION_BASE + habit.id;
      notificationService.queryForReminder(id, callback);
    };

    function scheduleOnboardingReminders(){

      var text1 = $translate.instant('ONBOARDING_PROMPT_1');
      var text2 = $translate.instant('ONBOARDING_PROMPT_2');
      var dateNow = new Date();
      
      var firstDate = new Date();
      var secondDate = new Date();

      if(Environment.isDevelopment()){
        firstDate.setMinutes(dateNow.getMinutes() + 3);
        secondDate.setMinutes(dateNow.getMinutes() + 6);        
      } else {
        firstDate.setHours(dateNow.getHours() + 24);
        secondDate.setHours(dateNow.getHours() + 24 * 4);        
      }

      if(!notificationService.onboardingNotificationsSet){

        notificationService.scheduleReminder(FIRST_ONBOARDING_ID, text1, firstDate, false, function(data){
          if(data === true)
            notificationService.onboardingNotificationsSet = true;
          console.log(data);
        });
        notificationService.scheduleReminder(SECOND_ONBOARDING_ID, text2, secondDate, false, function(data){
          if(data === true)
            notificationService.onboardingNotificationsSet = true;
          console.log(data);
        });        
      }
    }

    notificationService.setOnboardingReminders = function(){
      notificationService.queryForReminder(FIRST_ONBOARDING_ID,
        function(data){
          var trigger = new Date(data.trigger.at);
          var now = new Date();
          if(now > trigger){
            // notifications arleady fired, let's set them again
            notificationService.cancelOnboardingReminders(notificationService.setOnboardingReminders);
            console.log('notifications already fired, reset');
          } else {
            console.log('onboarding notifications already set');
          }
          return;
        }, scheduleOnboardingReminders);
    };

    notificationService.cancelOnboardingReminders = function(callback){
      notificationService.onboardingNotificationsSet = false;
      notificationService.cancelReminder(FIRST_ONBOARDING_ID, function(){
        notificationService.cancelReminder(SECOND_ONBOARDING_ID, callback);
      });
    };

    notificationService.cancelReminder = function(id, callback){
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification && window.cordova.plugins.notification.local) {
        cordova.plugins.notification.local.cancel(id, function() {

          console.log("canceled reminder for: " + id);

          if (callback)
            callback();
        });
      }
    };
    
    notificationService.cancelRelaxReminder = function cancelHabitReminder(callback) {
      notificationService.cancelReminder(RELAX_REMINDER_ID, callback);
    };

    notificationService.cancelHabitReminder = function cancelHabitReminder(habit, callback) {
      var id = HABIT_ID_LOCAL_NOTIFICATION_BASE + habit.id;
      notificationService.cancelReminder(id, callback);
    };

    notificationService.scheduleReminder = function(id, text, date, recurring, callback){
      var trigger;
      if(recurring)
        trigger = {every: {hour:date.getHours(), minute: date.getMinutes()}};
      else
        trigger = {at: date};

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification && window.cordova.plugins.notification.local) {
        cordova.plugins.notification.local.schedule({
          id: id,
          text: text,
          trigger: trigger,
          smallIcon: 'res://drawable/notif.png',
          color: '2BC78E',
          foreground: true
        }, function(data) {
          console.log('data ', data);
          if (callback)
            callback(data);
        });
      }
    };
    
    notificationService.queryForActivityReminder = function(callback, notFoundCallback){
      notificationService.queryForReminder(ACTIVITY_REMINDER_ID, callback, notFoundCallback);
    };

    notificationService.cancelActivityReminder = function(callback){
      notificationService.cancelReminder(ACTIVITY_REMINDER_ID, callback);
    };

    notificationService.scheduleActivityReminder = function(date, callback){
      var id = ACTIVITY_REMINDER_ID;
      var text = $translate.instant('ACTIVITY_REMINDER_TEXT');
      notificationService.scheduleReminder(id, text, date, false, callback);
    };

    notificationService.scheduleRelaxReminder = function(date, callback){
      var id = RELAX_REMINDER_ID;
      var text = $translate.instant('RELAX_REMINDER_TEXT');
      notificationService.scheduleReminder(id, text, date, true, callback);
    };

    notificationService.scheduleHabitReminder = function scheduleHabitReminder(habit, date, callback) {
      var id = HABIT_ID_LOCAL_NOTIFICATION_BASE + habit.id;
      var text = $translate.instant('HABIT_REMINDER_TEXT').replace('XXXREPLACEXXX', HabitsService.getHabitName(habit));
      notificationService.scheduleReminder(id, text, date, true, callback);
    };

    return notificationService;
  }
]);

var servicesModule = angular.module('organizationService', []);


servicesModule.constant('ORGANIZATION_TYPES', {
  'prov': 'ORGANIZATION_TYPE_PROV',  // Healthcare Provider
  'dept': 'ORGANIZATION_TYPE_DEPT',  // Hospital Department
  'team': 'ORGANIZATION_TYPE_TEAM',  // Organizational team
  'govt': 'ORGANIZATION_TYPE_GOVT',  // Government
  'ins': 'ORGANIZATION_TYPE_INS',    // Insurance
  'edu': 'ORGANIZATION_TYPE_EDU',    // Educational institute  
  'reli': 'ORGANIZATION_TYPE_RELI',  // Religious institution
  'crs': 'ORGANIZATION_TYPE_CRS',  // Clinical Research Sponsor
  'cg': 'ORGANIZATION_TYPE_CG',  // Community Group
  'bus': 'ORGANIZATION_TYPE_BUS',  // Non-Healthcare Business or Corporation
  'other': 'ORGANIZATION_TYPE_OTHER'  // Other
});


servicesModule.factory('OrganizationService', ['ORGANIZATION_TYPES', '$translate',
 function(ORGANIZATION_TYPES, $translate) {

  var organizationService = {};

  organizationService.orgTypeAbbreviationToName = function orgTypeAbbreviationToName(orgTypeAbbreviation) {
    var orgTypeTranslationKey = ORGANIZATION_TYPES[orgTypeAbbreviation];
    return $translate.instant(orgTypeTranslationKey);
  };


  return organizationService;

}]);

var servicesModule = angular.module('overlayService', []);

servicesModule.factory('OverlayService', ['$ionicPopup', '$ionicActionSheet', '$timeout', 'AccessibilityService', '$ionicLoading', '$ionicModal', '$translate', 'Environment', '$q', '$rootScope', '$state',
 function($ionicPopup, $ionicActionSheet, $timeout, AccessibilityService, $ionicLoading, $ionicModal, $translate, Environment, $q, $rootScope, $state) {

  var overlayService = {

    popup: {},
    actionSheet: {},
    showingActionSheet: false,
    closeActionSheet: angular.noop,
    showingLoading: false,
    loading: {},
    modal: {
      instances: {},
      stack: []
    },
    popupsRewired: false
  };

  // Popups

  function buildTemplate(options) {
    return "<focus-on-open tabindex='0'>" + options.template + "</focus-on-open>";
  }

  // Rewire the ionic popup so that we can control the status bar color.
  function rewireIonicPopup(func) {
    overlayService.popupsRewired = true;
    
    var ionicFunc = $ionicPopup[func];
    $ionicPopup[func] = function(options) {
      
      if (window.StatusBar && Environment.isIos()) {
        StatusBar.styleDefault();
      }

      var promise = ionicFunc(options);

      promise.then(function() {

        if (options.enableScrollHack) {
          $timeout(function() {
            $('.overflow-scroll .scroll').hide().show(0);
          }, 750);
        }

        if (window.StatusBar && !overlayService.modalIsOpen()){
          StatusBar.styleLightContent();
        }
      });

      return promise;
    };
  }

  function rewirePopups(){
    rewireIonicPopup('show');
    rewireIonicPopup('alert');
    rewireIonicPopup('confirm');
  }

  overlayService.popup.alert = function alert(options) {
    if(!overlayService.popupsRewired)
      rewirePopups();
    // Online event doesn't appear to be firing on Android, so we check for it here
    // instead of polling (see #3760 and #3805).
    if (Environment.isAndroid())
      Environment.checkOnlineStatus();

    if (options.template)
      options.template = buildTemplate(options);
    return $ionicPopup.alert(options);
  };

  overlayService.popup.confirm = function confirm(options) {
    if(!overlayService.popupsRewired)
      rewirePopups();
    if (options.template)
      options.template = buildTemplate(options);
    return $ionicPopup.confirm(options);
  };

  overlayService.popup.show = function show(options) {
    if(!overlayService.popupsRewired)
      rewirePopups();    
    if (options.template)
      options.template = buildTemplate(options);
    return $ionicPopup.show(options);
  };

  // Action Sheets

  overlayService.actionSheet.show = function(options) {

    // Override buttonClicked
    var initialButtonClicked = options.buttonClicked;
    options.buttonClicked = function(index) {
      overlayService.showingActionSheet = false;
      overlayService.closeActionSheet();
      overlayService.closeActionSheet = angular.noop;
      initialButtonClicked(index);
    };

    // Override cancel
    var initialCancel = options.cancel;
    options.cancel = function() {
      overlayService.showingActionSheet = false;
      overlayService.closeActionSheet = angular.noop;

      // Hack. Overflow scroll content on Webkit does not scroll after modals/actionSheets are hidden.
      if (!options.disableScrollHack) {
        $timeout(function() {
          $('.overflow-scroll .scroll').hide().show(0);
        }, 750);
      }

      initialCancel();
    };

    // Prevent actionSheet from being shown if one is already being shown.
    if (overlayService.showingActionSheet)
      return;

    var hideActionSheet = $ionicActionSheet.show(options);
    overlayService.showingActionSheet = true;

    AccessibilityService.onceInitialized(function() {
      if (AccessibilityService.usingScreenReader) {
        $timeout(function() {
          $('.action-sheet').find('button')[0].focus();
        }, 750);
      }
    });

    overlayService.closeActionSheet = hideActionSheet;
    return hideActionSheet;
  };

  overlayService.loading.show = function(text){
    
    if(overlayService.showingLoading)
      return;

    if(text){
      $ionicLoading.show({
        template: text
      });      
    } else {
      $ionicLoading.show();
      text = $translate.instant('LOADING');
    }

    AccessibilityService.onceInitialized(function() {
      if (AccessibilityService.usingScreenReader) {
        AccessibilityService.speak(text, 1);
      }
    });    

    overlayService.showingLoading = true;
  };

  overlayService.loading.hide = function(){
    $ionicLoading.hide();
    overlayService.showingLoading = false;
  };

  // Modals

  overlayService.modal.open = function(options) {

    var deferred = $q.defer();
    var modalAlreadyOpen = options.modalId in overlayService.modal.instances;
    if (modalAlreadyOpen) {
      $timeout(function() {
        deferred.reject(undefined);
      });
      return deferred.promise;
    }
    if(!options.ignoreStatusBar){
      if (window.StatusBar && Environment.isIos()) {
        StatusBar.styleDefault();
      }
    }

    // Store the modal until closed, so we know which modals are open. We do this below once
    // the modal is opened by Ionic, but this takes a while and we want to prevent the modal
    // from opening additional times until then, so we need to register the modalID in modal.instances.
    overlayService.modal.instances[options.modalId] = "Modal is opening...";

    // Online event doesn't appear to be firing on Android, so we check for it here
    // instead of polling (see #3760 and #3805).
    if (Environment.isAndroid())
      Environment.checkOnlineStatus();

    return $ionicModal.fromTemplateUrl(options.templateUrl, options)
      .then(function(modal) {

        return modal.show()
          .then(function() {

            // store the modal until closed, so we know which modals are open
            overlayService.modal.instances[modal.modalId] = modal;
            overlayService.modal.stack.push(modal);

            return modal;

        });

      });

  };

  overlayService.modal.close = function(modal) {

    function exit() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(undefined);
      });
      return deferred.promise;
    }

    // If a modal was not passed in, remove the last modal opened, last in, first out.
    if (typeof modal === 'undefined') {
      modal = overlayService.modal.stack.pop();

      // modal should only be undefined if the hardware back button was used.
      // We need to make sure that the modal is allowed to be closed by the hardware back button.
      if (typeof modal === 'undefined' || modal.hardwareBackButtonClose === false)
        return exit();

      // The modal gets removed from the stack when it is closed, so add it back in until then.
      overlayService.modal.stack.push(modal);
    }

    var modalNotOpen = !(_.has(modal, 'modalId') && modal.modalId in overlayService.modal.instances);
    if (modalNotOpen) {
      return exit();
    }
    var promise = modal.hide();

    promise.then(function() {


      // This hack is causing an issue where the home view is scrolled out of position. It only seems to be happening on the home view.
      // The hack doesn't seem to be necessary anymore, but until we are certain this is the case, we are just disabling it on the home view.
      if ($state.current.name !== 'app.home') {
        // Hack. Overflow scroll content on Webkit does not scroll after modals are hidden.
        // It has something to do with the 3D stacking context or webkit-overflow-scroll: touch attribute.
        // For some reason forcing a repaint fixes the issue.
        $('.overflow-scroll .scroll').hide().show(0);
        $('.activity-row').hide().show(0);
        $(window).trigger('modal.animateOutComplete');
      }

      // Clean up
      overlayService.modal.stack.pop();
      delete overlayService.modal.instances[modal.modalId];
      modal.remove();
      // modal is open && open modal is not set to ignore
      // modal says ignore status bar
      if (window.StatusBar && !modal.ignoreStatusBar && overlayService.shouldChangeOnClose() && !$rootScope.blackStatusBar){
        StatusBar.styleLightContent();
      }
      modal = undefined;

      return modal;
    });

    return promise;

  };

  overlayService.modalIsOpen = function(){
    return !_.isEmpty(overlayService.modal.instances);
  };

  overlayService.shouldChangeOnClose = function(){
    if(!overlayService.modalIsOpen())
      return true;
    // of other modal is open, don't change status bar
    var shouldChange = false;

    // if other modal says ignore status bar, change it back
    _.each(overlayService.modal.instances, function(modal){
      if(modal.ignoreStatusBar)
        shouldChange = true;
    });
    return shouldChange;
  };

  return overlayService;

 }]);
var servicesModule = angular.module('pathService', []);

servicesModule.factory('PathService', ['$http', '$rootScope', '$timeout', '$translate', '$ionicModal', 'StorageService', 'AccountService', 'GeneralService', 'FeedService', 'Environment', 'authHttp', 'ActivityService', 'OverlayService', '$ionicHistory', '$state',
 function($http, $rootScope, $timeout, $translate, $ionicModal, StorageService, AccountService, GeneralService, FeedService, Environment, authHttp, ActivityService, OverlayService, $ionicHistory, $state) {

	var pathService = {
		pathContext: {},
		pathDayBackState: null,
		accountSubGoals: null
	};

	var pathActivityObservers = [];

	function notifyPathActivityObservers() {
		pathActivityObservers.forEach(function(callback) {
			callback();
		});
	}

 	function updateLocalPathContext() {
 	  StorageService.setItem('pathContext', JSON.stringify(pathService.pathContext));
 	}

 	// We're going to go through the pathContext and update the activity
 	// associated with the pathProgress object. This can be inefficient
 	// because it only happens once when we get the pathContext itself.
 	function updatePathActivityProgress(pathProgress) {

 	  var paths = pathService.pathContext.paths;
 	  for (var i=0; i<paths.length; ++i) {

 	    var path = paths[i];
 	    if (path.id == pathProgress.pathId) {

 	      var days = paths[i].pathDays;
 	      for (var j=0; j<days.length; ++j) {

 	        var day = days[j];
 	        if (day.id == pathProgress.pathDayId) {

 	          var activities = day.pathDayActivities;
 	          for (var k=0; k<activities.length; ++k) {

 	            var activity = activities[k];
 	            if (activity.id == pathProgress.pathDayActivityId) {

 	              activity.complete = true;
 	              break;
 	            }
 	          }

 	          break;
 	        }
 	      }

 	      break;
 	    }
 	  }
 	}

 	function updateAllPathProgress() {

 	  var pathContext = pathService.pathContext;

 	  if (pathContext.pathProgress) {

 	    for (var i=0; i<pathContext.pathProgress.length; ++i) {

 	      var progress = pathContext.pathProgress[i];
 	      updatePathActivityProgress(progress);
 	    }

 	    updatePathProgress();
 	    $rootScope.$broadcast('event:reloadPathData');
 	  }
 	}

 	// Update all of the paths and pathDays to mark them as complete.
 	function updatePathProgress() {

 	  var paths = pathService.pathContext.paths;
 	  for (var i=0; i<paths.length; ++i) {

 	    var pathNotComplete = false;

 	    var path = paths[i];
 	    var days = path.pathDays;
 	    for (var j=0; j<days.length; ++j) {

 	      var dayNotComplete = false;

 	      var day = days[j];
 	      var activities = day.pathDayActivities;
 	      for (var k=0; k<activities.length; ++k) {

 	        var activity = activities[k];
 	        if (!activity.complete) {

 	          dayNotComplete = true;
 	          break;
 	        }
 	      }

 	      if (!dayNotComplete) {

 	        day.complete = true;
 	      }
 	      else {

 	        pathNotComplete = true;
 	        break;
 	      }
 	    }

 	    if (!pathNotComplete ) {

 	      path.complete = true;
 	    }
 	  }
 	}

 	pathService.updatePathProgress = updatePathProgress;

 	function markFeedItemComplete(path){
 	  var feedItem = FeedService.getItemOfType('path');
 	  if(feedItem && feedItem.pathDay.pathId == path.pathId){
 	    feedItem.complete = true;
 	    $rootScope.$broadcast('event:pathFeedItemCompleted');
 	  }
	 }

	pathService.savePathsFeedBack = function savePathsFeedBack(feedback) {
		var hasConnection = Environment.isOnline() && AccountService.isLoggedIn();
    // var hasConnection = false; //<--- Uncomment to test if offline in web,
    if(hasConnection) {
      return authHttp.post(Environment.serverURL + '/paths/feedback', feedback);
    }else {
      StorageService.setItem("offlinePathsFeedback", JSON.stringify(feedback));
    }
  };

 	function showPathDayCompleteModal(day) {

 	  var modalScope = $rootScope.$new();
 	  modalScope.day = day;

 	  AccountService.setUserPreference('last_completed_path_date', GeneralService.getTodayString());
		AccountService.setUserPreference('last_completed_path_day_id', day.id);
		 
		function close() {
			OverlayService.modal.close(modalScope.modal).then(function(modal) {
				modalScope.modal = modal;
			});
		}
		
		modalScope.giveFeedback = function giveFeedback(isHelpful, day) {
			var feedback = {
				pathId: day.pathId,
				pathDayId: day.id,
				isHelpful: isHelpful
			};
			
			pathService.savePathsFeedBack(feedback);
			close();
		};

 	  OverlayService.modal.open({
 	    modalId: 'PathDayCompleteModal',
 	    templateUrl: 'views/paths/day.complete.modal.html',
 	    scope: modalScope,
 	    animation: 'slide-in-up',
 	    ignoreStatusBar: false,
			backdropClickToClose: false
 	  }).then(function(modal) {
 	  	modalScope.modal = modal;
 	  });
	 }
	 
	/**
	 * Registers observers for a completed path activity
	 * @param {function} callback A callback to be executed when an activity is
	 * completed.
	 */
	pathService.onCompletedPathActivity = function(callback) {
		pathActivityObservers.push(callback);
	};

 	pathService.initFromLocalStorage = function initFromLocalStorage() {
		return StorageService.getItemAsync("pathContext")
		 	.then(function(pathContext) {
				if (pathContext) {
					try {
						var storedPathContext = JSON.parse(pathContext);
						pathService.pathContext = storedPathContext;
 
						updateAllPathProgress();
					}
					catch (err) {
						console.log("There was an error parsing the path context: " + err);
					}
				}
			});
 	};



 	pathService.checkPathGoalProgress = function checkPathGoalProgress() {
 	  var subGoalsCount = 0;
 	  for (var key in pathService.accountSubGoals) {

 	    var daySubGoals = pathService.accountSubGoals[key];
 	    for (var i = 0; i < daySubGoals.length; ++i) {

 	      ++subGoalsCount;
 	    }
 	  }

 	  return subGoalsCount >= 5;
 	};

 	pathService.checkPathMotivationProgress  = function checkPathMotivationProgress() {
 	  var motivationPref = AccountService.getUserPreference('set_goal_motivation');
 	  if ( motivationPref == 'true') {
      // show modal first, then record it
      pathService.checkPathProgress('SET_MOTIVATION', null, null, null, true);
      pathService.checkPathProgress('SET_MOTIVATION');
 	  }
 	};

 	pathService.checkPathMoodProgress = function checkPathMoodProgress(habitRecordId, showModal) {

 	  pathService.checkPathProgress('MOOD', null, null, habitRecordId, showModal);
 	};

 	pathService.checkPathHealthProgress = function checkPathHealthProgress(habitRecordId, showModal) {

 	  pathService.checkPathProgress('HEALTH', null, null, habitRecordId, showModal);
 	};

  pathService.checkInfocardProgress = function checkInfocardProgress(){

    pathService.checkPathProgress('INFOCARD');
  };

  pathService.checkVideoProgress = function checkVideoProgress(){

    pathService.checkPathProgress('VIDEO');
  };

  function getCompletedPathData(type, activity){
    var paths = pathService.pathContext.paths;
    for (var i=0; i<paths.length; ++i) {

      var path = paths[i];
      if (path.complete)
        continue;

      var days = path.pathDays;
      for (var j=0; j<days.length; ++j) {

        var day = days[j];
        if (day.complete)
          continue;

        var activities = day.pathDayActivities;
        for (var k=0; k<activities.length; ++k) {

          var pathActivity = activities[k];
          if (pathActivity.complete)
            continue;

          if (pathActivity.type == type) {

            var completedNextActivity = false;

            if (pathActivity.type == 'ACTIVITY') {
              var activityId = ActivityService.getIdForActivity(activity);
              if (!activityId) // This shouldn't happen.
                return;

              if (pathActivity.activityId == activityId) {
                completedNextActivity = true;
              }
            }
            else {
              completedNextActivity = true;
            }

            if (completedNextActivity) {
              return { path: path, day: day, pathActivity: pathActivity };
            }
          }

          // We can only try the first non-completed activity in the path.
          break;
        }

        // We can only try the first non-completed day in the path.
        break;
      }
    }
    return false;
  }

  function isGoalsActivity(activity){ 
    return ActivityService.getCategoryForActivity(activity) === 'goals';
  }

 	// Check to see if the activity ID is associated with the next non-completed
 	// activity in any of the paths. If so, tell the server that it is complete
 	// and mark it as such here and prompt the user.
  // activityId will be from recordActivity or habits mutliRecord id
  // showModalOnly is to launch helpful/not helpful ahead of getting the activity/habit id to record
  // it will be called again with an id to record completion
 	// doNotRecurse is used internally, does not need to be added by caller.
 	pathService.checkPathProgress = function checkPathProgress(type, activity, activityId, habitId, showModalOnly, doNotRecurse) {
 	  // Only complete these in the app
 	  if (Environment.isWeb())
 	    return;

    var completionData = getCompletedPathData(type, activity);
    
    // if it's a goal activity that was completed, let's see if we're on the goal setting path day (complete 5-8 goals)
    if(!completionData && isGoalsActivity(activity) && pathService.checkPathGoalProgress()){
      completionData = getCompletedPathData('GOAL_SETTING');
    }
    
    if(completionData){
      // We found an activity associated with the provided one, and we have an id for the recorded activity,
      // so mark it as complete.
      if(!showModalOnly){
        pathService.completePathActivity(completionData.path.id, completionData.day.id, completionData.pathActivity.id, activityId, habitId, activityId, habitId);
      } else {
        // If it's the last one
        var activityIndex = _.findIndex(completionData.day.pathDayActivities, {id: completionData.pathActivity.id});
        if (activityIndex == completionData.day.pathDayActivities.length-1) {

          showPathDayCompleteModal(completionData.day);
          // Make sure we only complete one.
          return;
        }
      }
    }
 	  // If we didn't find anything, we need to check to see if we should
 	  // give credit for the other activity type.
 	  if (!doNotRecurse) {
 	    if (activity == 'COMPLETED_ABC_THOUGHT_RECORD') {

 	      pathService.checkPathProgress(type, 'COMPLETED_ABC_PLUS_THOUGHT_RECORD', activityId, habitId, showModalOnly, true);
 	    }
 	    else if (activity == 'COMPLETED_ABC_PLUS_THOUGHT_RECORD') {

 	      pathService.checkPathProgress(type, 'COMPLETED_ABC_THOUGHT_RECORD', activityId, habitId, showModalOnly, true);
 	    }
 	  }

 	};

 	pathService.isPathDayLocked = function isPathDayLocked(pathDay) {

 	  var isFreePath = pathDay.id === 80 || pathDay.id === 81;
 	  var isPremiumUser = AccountService.isPremiumEnabled();

 	  if (isFreePath || isPremiumUser) {
 	    return false;
 	  }

 	  return true;

 	};

 	// Return the next day that has not been completed.
 	pathService.getPathDaySuggestion = function getPathDaySuggestion(ignoreToday) {
 		// typically we don't want to suggest the next path day if you've just completed one today
 		// ignoreToday will return the next path day regardless of when the previous one was completed

 	  var completedId = -1;

 	  var datePref = AccountService.getUserPreference('last_completed_path_date');
 	  if (!ignoreToday && datePref && datePref == GeneralService.getTodayString()) {

 	    var idPref = +AccountService.getUserPreference('last_completed_path_day_id');
 	    if (idPref && idPref > 0) {

 	      completedId = idPref;
 	    }
 	  }

 	  var pathContext = pathService.pathContext;

 	  if (pathContext && pathContext.paths) {

 	    var paths = pathService.pathContext.paths;
 	    for (var i=0; i<paths.length; ++i) {

 	      var path = paths[i];
 	      if (path.complete)
 	        continue;

 	      var days = path.pathDays;
 	      for (var j=0; j<days.length; ++j) {

 	        var day = days[j];

 	        // If this is the suggested one that they completed, return it.
 	        if (day.id == completedId)
 	          return day;

 	        if (day.complete)
 	          continue;

 	        return day;
 	      }
 	    }
 	  }

 	  return undefined;
 	};

 	pathService.getPathDayById = function getPathDayById(id){
 		var path;
 		var pathDayIndex;
 		var pathDay;

 		for(i=0; i < pathService.pathContext.paths.length; i++){
 			path = pathService.pathContext.paths[i];
 			pathDayIndex = _.findIndex(path.pathDays, {id: id});

 			if(pathDayIndex > -1){
 				pathDay = path.pathDays[pathDayIndex];
 				break;
 			}
 		}
 		return pathDay;
 	};

 	pathService.getPathDayActivityClass = function getPathDayActivityClass(pathDay) {

 	  for (var i=0; i<pathDay.pathDayActivities.length; ++i) {

 	    var activity = pathDay.pathDayActivities[i];

 	    if (activity.type == 'ACTIVITY') {

 	      var activityObj = ActivityService.getActivityById(activity.activityId);
 	      if (activityObj) {

 	        var ret =  activityObj.actionClass;
 	        return ret;
 	      }
 	    }
 	    else if (activity.type != 'LESSON') {

 	      return activity.type.toLowerCase();
 	    }
 	  }
 	};

 	pathService.goToPathSuggestion = function goToPathSuggestion(scope, lockedCallback) {
 	  // we need to make sure there's a callback here for payservice since it's a cirular import
 	  var day = pathService.getPathDaySuggestion();
 	  
 	  if (day) {

 	    if (pathService.isPathDayLocked(day)) {
 	      lockedCallback();
 	      return;
 	    }

 	    $state.go('app.path-day', {pathId: day.pathId, dayId: day.id, backState: 'app.home'});
 	  }
 	};

 	pathService.setPathContext = function setPathContext(pathContext) {
 	  pathService.pathContext = pathContext;
 	  updateLocalPathContext();
 	  updateAllPathProgress();
 	};

 	pathService.completePathActivity = function completePathActivity(pathId, pathDayId, pathDayActivityId, activityId, habitId) {

 	  // First see if we've already completed it
 	  var existing = _.find(pathService.pathContext.pathProgress, {pathDayActivityId: pathDayActivityId});
 	  if (existing)
 	    return;

 	  // TODO offline mode.
 	  var newProgress = {
 	    userId: AccountService.getAccountUser().user.id,
 	    pathId: pathId,
 	    pathDayId: pathDayId,
 	    pathDayActivityId: pathDayActivityId,
 	    state: 'COMPLETE',
 	    updatedAt: new Date().getTime()
 	  };

 	  // Make sure we are recording things correctly.
 	  pathService.pathContext.pathProgress.push(newProgress);
 	  updatePathActivityProgress(newProgress);

 	  // This will mark any paths or days as complete.
 	  updatePathProgress(pathId);

 	  // This is a bit strange. After completing any activity we need to check to see if you have
 	  // already set your motivation in goals since it could be the next activity... There isn't
 	  // really a better way to do this that I can think of.
 	  // TODO Maybe do the same thing for adding goals if you already have them?
 	  $timeout(function() {
 	    pathService.checkPathMotivationProgress();
 	  });

    var data = {
      pathId : pathId,
      pathDayId: pathDayId,
      pathDayActivityId: pathDayActivityId
    };
    
    if(habitId){
      data.habitDataId = habitId;
    }
    if(activityId){
      data.accountActivityId = activityId;
    }

		 return authHttp.post(Environment.serverURL + '/paths/completeActivity', data)
		 	.then(notifyPathActivityObservers);
 	};

 	pathService.getPathById = function getPathById(id){
 		var context = pathService.getPathContext();
 	  var pathIndex = _.findIndex(context.paths, {id: id});
 	  return context.paths[pathIndex];
 	};

 	pathService.isPathDayComplete = function isPathDayComplete(pathDay){
 	  var path = pathService.getPathById(pathDay.pathId);
 	  var contextPathDay = _.findIndex(path.pathDays, {id: pathDay.id});
 	  return path.pathDays[contextPathDay].complete;
 	  
 	};

 	pathService.getIncompletePaths = function getIncompletePaths(){
		var incomplete = _.filter(pathService.pathContext.paths, function(p){
 			return !p.hasOwnProperty('complete') || p.complete !== true;
 		});
 		return incomplete;
 	};

 	pathService.getNextPathActivity = function getNextPathActivity(){
 		if(!pathService.pathContext || !pathService.pathContext.pathProgress)
 			return;
 		var progress = pathService.pathContext.pathProgress;
 		// if no progress, send the first day of the first path
 		if(!progress.length)
 			return pathService.pathContext.paths[0].pathDays[0].pathDayActivities[0];

 		var incompletePaths = pathService.getIncompletePaths();
 		var incompletePathIds = _.values(
 			_.mapValues(incompletePaths, function (i){
 				return i.id;
 			})
 		);

 		// filter out activities for paths that are aleady complete
 		var orderedProgress = _.orderBy(progress, ['updatedAt']);
 		var orderedProgressIncomplete = _.filter(orderedProgress, function(o){
 			return incompletePathIds.indexOf(o.pathId) > -1;
 		});
 		
 		if(orderedProgressIncomplete.length){
      var pathDay;
      // the order is flipped (ascneding v descending) depending on where we call this from even though we do a sort above
      // make sure we get the most recently completed path item
      if(orderedProgressIncomplete[0].updatedAt > orderedProgressIncomplete[orderedProgressIncomplete.length -1].updatedAt){
        pathDay = pathService.getPathDayById(orderedProgressIncomplete[0].pathDayId);
      } else {
        pathDay = pathService.getPathDayById(orderedProgressIncomplete[orderedProgressIncomplete.length-1].pathDayId);
      }
      var remainingActivities = _.filter(pathDay.pathDayActivities, function (a){
 				return !a.hasOwnProperty('complete') || a.complete !== true;
 			});

 			// if there's no more activities for that module [day], go to the next
 			if(remainingActivities.length < 1){
 				var path = pathService.getPathById(pathDay.pathId);
                var nextIndex = _.findIndex(path.pathDays, function (d){
                    return !d.hasOwnProperty('complete') && d.complete !== true;
                });
 				return path.pathDays[nextIndex].pathDayActivities[0];
 			} else {
 				// return next activity for module
 				return remainingActivities[0];
 			}
 			
 		} else if(incompletePathIds.length){
 			// if there's no more activities for that path, go to the next one
 			var nextPath = pathService.getPathById(incompletePathIds[0]);
 			return nextPath.pathDays[0].pathDayActivities[0];
 		}
 		// we have done all paths
 		return null;
 	};

 	pathService.getActionDetails = function getActionDetails(activity){
 		var ret = {};
 		var actionType = activity.type;
 		if(actionType === 'INFOCARD'){
 			ret.icon = 'ion-ios-paper';
 			ret.label = $translate.instant('JOURNEY_5_THE_BASICS');
 		} else if(actionType === 'VIDEO'){
 			ret.icon = 'ion-television';
 			ret.label = $translate.instant('JOURNEY_5_WATCH');
 		} else if(actionType === 'LESSON' || actionType === 'AUDIO'){
			ret.icon = 'ion-ios-play';
      ret.label = $translate.instant('JOURNEY_5_LISTEN');
    } else if(actionType === 'MOOD'){
      ret.icon =  'ion-android-happy';
      ret.label = $translate.instant('JOURNEY_5_TRACK');
    } else if (actionType === 'SET_MOTIVATION' || actionType === 'GOAL_SETTING'){
      ret.icon =  'ion-ios-bolt';
      ret.label = $translate.instant('JOURNEY_5_PLAN');
    } else if(actionType === 'HEALTH'){
      ret.icon =  'ion-ios-heart';
      ret.label = $translate.instant('JOURNEY_5_TRACK');
    } else if(actionType === 'ACTIVITY'){
      activity = ActivityService.getActivityById(activity.activityId);
      if(activity.hasOwnProperty('actionClass') && activity.actionClass === 'picture'){
        ret.icon =  'ion-ios-sunny';
        ret.label = $translate.instant('JOURNEY_5_WRITE');
      } else if(activity.type === 'relax'){
        ret.icon =  'ion-ios-flame';
        ret.label = $translate.instant('JOURNEY_5_MEDITATE');
      } else if(activity.type === 'thoughts'){
        ret.icon =  'ion-ios-lightbulb';
        ret.label = $translate.instant('JOURNEY_5_WRITE');
      } else if(activity.type === 'goals'){
        ret.icon =  'ion-ios-bolt';
        ret.label = $translate.instant('JOURNEY_5_PLAN');
      }
    }
    return ret;
 	};

  pathService.getNextActivityByPath = function getNextActivityByPath(pathId){
    
    var path = pathService.getPathById(pathId);
    if(!path)
      return;
    var firstIncomplete = _.findIndex(path.pathDays, function (p){
      return !p.hasOwnProperty('complete') && p.complete !== true;
    });
    if(firstIncomplete < 0)
      return false;
    var day = path.pathDays[firstIncomplete];
    var activityIndex = _.findIndex(day.pathDayActivities, function (p){
      return !p.hasOwnProperty('complete') && p.complete !== true;
    });
    if(activityIndex < 0)
      return;
    return day.pathDayActivities[activityIndex];
	};
	
  function submitAndRemovePathFeedback(feedback) {
    pathService.savePathsFeedBack(JSON.parse(feedback));
    StorageService.removeItem('offlinePathsFeedback');
  }

  function checkIfPathFeedbackExist() {
    StorageService.getItem('offlinePathsFeedback', function(feedback) {
      if(feedback) {
        submitAndRemovePathFeedback(feedback);
      }
    });
  }

 	pathService.getPathContext = function getPathContext() {
 	  return pathService.pathContext;
 	};

 	pathService.getPathDayBackState = function getPathDayBackState(){
 	  return pathService.pathDayBackState;
 	};

 	pathService.setPathDayBackState = function setPathDayBackState(state){
 	  pathService.pathDayBackState = state;
 	};

 	pathService.unsetPathDayBackState = function unsetPathDayBackState(){
 	  pathService.pathDayBackState = null;
 	};

  pathService.getPathProgressByPathId = function getPathProgressByPathId(id){
    return _.filter(pathService.pathContext.pathProgress, function (p) {
      return p.pathId === id;
    });
  };  

  pathService.getPathProgress = function getPathProgress(){
    return pathService.pathContext.pathProgress;
  };
	 
  pathService.setAccountSubGoals = function setAccountSubGoals(subGoals){
    // set them since we can't retrieve them from goalsService bc of ciruclar dependencies 
    pathService.accountSubGoals = subGoals;
  };

  pathService.getAllPathActivities = function getAllPathActivities(id){
    var path = pathService.getPathById(id);
    return _.flatten(_.map(path.pathDays, 'pathDayActivities'));
  };
  
  pathService.showPathIntro = function showPathIntro(id){
    var pref = AccountService.getUserPreference('completed_journey_intro_' + id);
    if(id === 5 && (!pref || pref !== 'true')){
      return true;
    }
    return false;
  };

  pathService.preventOfflineNavigation = function preventOfflineNavigation(){
    if (!Environment.isOnline()) {
      OverlayService.popup.alert({
        template: $translate.instant('PATH_OFFLINE_WARNING'),
        okText: $translate.instant('OK_GOT_IT'),
        okType: 'button-default'
      });
      return true;
    }
    return false;
  };

	$rootScope.$on('event:online', checkIfPathFeedbackExist);

 	return pathService;

 }]);
var servicesModule = angular.module('payService', []);

var currencyMap = { "AED": { "symbol": "AED", "symbol_native": "د.إ.\u200F", "decimal_digits": 2, "rounding": 0.0, "code": "AED" }, "AFN": { "symbol": "AFN", "symbol_native": "؋", "decimal_digits": 0, "rounding": 0.0, "code": "AFN" }, "ALL": { "symbol": "ALL", "symbol_native": "Lek", "decimal_digits": 0, "rounding": 0.0, "code": "ALL" }, "AMD": { "symbol": "AMD", "symbol_native": "դր.", "decimal_digits": 0, "rounding": 0.0, "code": "AMD" }, "AOA": { "symbol": "AOA", "symbol_native": "Kz", "decimal_digits": 2, "rounding": 0.0, "code": "AOA" }, "ARS": { "symbol": "ARS", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "ARS" }, "AUD": { "symbol": "AU$", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "AUD" }, "AWG": { "symbol": "AWG", "symbol_native": "Afl.", "decimal_digits": 2, "rounding": 0.0, "code": "AWG" }, "AZN": { "symbol": "AZN", "symbol_native": "ман.", "decimal_digits": 2, "rounding": 0.0, "code": "AZN" }, "BAM": { "symbol": "BAM", "symbol_native": "KM", "decimal_digits": 2, "rounding": 0.0, "code": "BAM" }, "BBD": { "symbol": "BBD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "BBD" }, "BDT": { "symbol": "BDT", "symbol_native": "৳", "decimal_digits": 2, "rounding": 0.0, "code": "BDT" }, "BGN": { "symbol": "BGN", "symbol_native": "лв.", "decimal_digits": 2, "rounding": 0.0, "code": "BGN" }, "BHD": { "symbol": "BHD", "symbol_native": "د.ب.\u200F", "decimal_digits": 3, "rounding": 0.0, "code": "BHD" }, "BIF": { "symbol": "BIF", "symbol_native": "FBu", "decimal_digits": 0, "rounding": 0.0, "code": "BIF" }, "BMD": { "symbol": "BMD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "BMD" }, "BND": { "symbol": "BND", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "BND" }, "BOB": { "symbol": "BOB", "symbol_native": "Bs", "decimal_digits": 2, "rounding": 0.0, "code": "BOB" }, "BRL": { "symbol": "R$", "symbol_native": "R$", "decimal_digits": 2, "rounding": 0.0, "code": "BRL" }, "BWP": { "symbol": "BWP", "symbol_native": "P", "decimal_digits": 2, "rounding": 0.0, "code": "BWP" }, "BYR": { "symbol": "BYR", "symbol_native": "BYR", "decimal_digits": 0, "rounding": 0.0, "code": "BYR" }, "BZD": { "symbol": "BZD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "BZD" }, "CAD": { "symbol": "CA$", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "CAD" }, "CDF": { "symbol": "CDF", "symbol_native": "FrCD", "decimal_digits": 2, "rounding": 0.0, "code": "CDF" }, "CHF": { "symbol": "CHF", "symbol_native": "CHF", "decimal_digits": 2, "rounding": 0.05, "code": "CHF" }, "CLP": { "symbol": "CLP", "symbol_native": "$", "decimal_digits": 0, "rounding": 0.0, "code": "CLP" }, "CNY": { "symbol": "CN¥", "symbol_native": "CN¥", "decimal_digits": 2, "rounding": 0.0, "code": "CNY" }, "COP": { "symbol": "COP", "symbol_native": "$", "decimal_digits": 0, "rounding": 0.0, "code": "COP" }, "CRC": { "symbol": "CRC", "symbol_native": "\u20A1", "decimal_digits": 0, "rounding": 0.0, "code": "CRC" }, "CVE": { "symbol": "CVE", "symbol_native": "CVE", "decimal_digits": 2, "rounding": 0.0, "code": "CVE" }, "CZK": { "symbol": "CZK", "symbol_native": "Kč", "decimal_digits": 2, "rounding": 0.0, "code": "CZK" }, "DJF": { "symbol": "DJF", "symbol_native": "Fdj", "decimal_digits": 0, "rounding": 0.0, "code": "DJF" }, "DKK": { "symbol": "DKK", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0.0, "code": "DKK" }, "DOP": { "symbol": "DOP", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "DOP" }, "DZD": { "symbol": "DZD", "symbol_native": "د.ج.\u200F", "decimal_digits": 2, "rounding": 0.0, "code": "DZD" }, "EGP": { "symbol": "EGP", "symbol_native": "ج.م.\u200F", "decimal_digits": 2, "rounding": 0.0, "code": "EGP" }, "ERN": { "symbol": "ERN", "symbol_native": "Nfk", "decimal_digits": 2, "rounding": 0.0, "code": "ERN" }, "ETB": { "symbol": "ETB", "symbol_native": "ብር", "decimal_digits": 2, "rounding": 0.0, "code": "ETB" }, "EUR": { "symbol": "\u20AC", "symbol_native": "\u20AC", "decimal_digits": 2, "rounding": 0.0, "code": "EUR" }, "GBP": { "symbol": "£", "symbol_native": "£", "decimal_digits": 2, "rounding": 0.0, "code": "GBP" }, "GEL": { "symbol": "GEL", "symbol_native": "GEL", "decimal_digits": 2, "rounding": 0.0, "code": "GEL" }, "GHS": { "symbol": "GHS", "symbol_native": "GHS", "decimal_digits": 2, "rounding": 0.0, "code": "GHS" }, "GNF": { "symbol": "GNF", "symbol_native": "FG", "decimal_digits": 0, "rounding": 0.0, "code": "GNF" }, "GTQ": { "symbol": "GTQ", "symbol_native": "Q", "decimal_digits": 2, "rounding": 0.0, "code": "GTQ" }, "GYD": { "symbol": "GYD", "symbol_native": "GYD", "decimal_digits": 0, "rounding": 0.0, "code": "GYD" }, "HKD": { "symbol": "HK$", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "HKD" }, "HNL": { "symbol": "HNL", "symbol_native": "L", "decimal_digits": 2, "rounding": 0.0, "code": "HNL" }, "HRK": { "symbol": "HRK", "symbol_native": "kn", "decimal_digits": 2, "rounding": 0.0, "code": "HRK" }, "HUF": { "symbol": "HUF", "symbol_native": "Ft", "decimal_digits": 0, "rounding": 0.0, "code": "HUF" }, "IDR": { "symbol": "IDR", "symbol_native": "Rp", "decimal_digits": 0, "rounding": 0.0, "code": "IDR" }, "ILS": { "symbol": "\u20AA", "symbol_native": "\u20AA", "decimal_digits": 2, "rounding": 0.0, "code": "ILS" }, "INR": { "symbol": "\u20B9", "symbol_native": "\u20B9", "decimal_digits": 2, "rounding": 0.0, "code": "INR" }, "IQD": { "symbol": "IQD", "symbol_native": "د.ع.\u200F", "decimal_digits": 0, "rounding": 0.0, "code": "IQD" }, "IRR": { "symbol": "IRR", "symbol_native": "﷼", "decimal_digits": 0, "rounding": 0.0, "code": "IRR" }, "ISK": { "symbol": "ISK", "symbol_native": "kr", "decimal_digits": 0, "rounding": 0.0, "code": "ISK" }, "JMD": { "symbol": "JMD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "JMD" }, "JOD": { "symbol": "JOD", "symbol_native": "د.أ.\u200F", "decimal_digits": 3, "rounding": 0.0, "code": "JOD" }, "JPY": { "symbol": "¥", "symbol_native": "￥", "decimal_digits": 0, "rounding": 0.0, "code": "JPY" }, "KES": { "symbol": "KES", "symbol_native": "Ksh", "decimal_digits": 2, "rounding": 0.0, "code": "KES" }, "KHR": { "symbol": "KHR", "symbol_native": "៛", "decimal_digits": 2, "rounding": 0.0, "code": "KHR" }, "KMF": { "symbol": "KMF", "symbol_native": "CF", "decimal_digits": 0, "rounding": 0.0, "code": "KMF" }, "KRW": { "symbol": "\u20A9", "symbol_native": "\u20A9", "decimal_digits": 0, "rounding": 0.0, "code": "KRW" }, "KWD": { "symbol": "KWD", "symbol_native": "د.ك.\u200F", "decimal_digits": 3, "rounding": 0.0, "code": "KWD" }, "KZT": { "symbol": "KZT", "symbol_native": "\u20B8", "decimal_digits": 2, "rounding": 0.0, "code": "KZT" }, "LBP": { "symbol": "LBP", "symbol_native": "ل.ل.\u200F", "decimal_digits": 0, "rounding": 0.0, "code": "LBP" }, "LKR": { "symbol": "LKR", "symbol_native": "රු.", "decimal_digits": 2, "rounding": 0.0, "code": "LKR" }, "LRD": { "symbol": "LRD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "LRD" }, "LTL": { "symbol": "LTL", "symbol_native": "Lt", "decimal_digits": 2, "rounding": 0.0, "code": "LTL" }, "LVL": { "symbol": "LVL", "symbol_native": "Ls", "decimal_digits": 2, "rounding": 0.0, "code": "LVL" }, "LYD": { "symbol": "LYD", "symbol_native": "د.ل.\u200F", "decimal_digits": 3, "rounding": 0.0, "code": "LYD" }, "MAD": { "symbol": "MAD", "symbol_native": "د.م.\u200F", "decimal_digits": 2, "rounding": 0.0, "code": "MAD" }, "MDL": { "symbol": "MDL", "symbol_native": "MDL", "decimal_digits": 2, "rounding": 0.0, "code": "MDL" }, "MGA": { "symbol": "MGA", "symbol_native": "MGA", "decimal_digits": 0, "rounding": 0.0, "code": "MGA" }, "MKD": { "symbol": "MKD", "symbol_native": "MKD", "decimal_digits": 2, "rounding": 0.0, "code": "MKD" }, "MMK": { "symbol": "MMK", "symbol_native": "K", "decimal_digits": 0, "rounding": 0.0, "code": "MMK" }, "MOP": { "symbol": "MOP", "symbol_native": "MOP", "decimal_digits": 2, "rounding": 0.0, "code": "MOP" }, "MUR": { "symbol": "MUR", "symbol_native": "MUR", "decimal_digits": 0, "rounding": 0.0, "code": "MUR" }, "MXN": { "symbol": "MX$", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "MXN" }, "MYR": { "symbol": "MYR", "symbol_native": "RM", "decimal_digits": 2, "rounding": 0.0, "code": "MYR" }, "MZN": { "symbol": "MZN", "symbol_native": "MTn", "decimal_digits": 2, "rounding": 0.0, "code": "MZN" }, "NAD": { "symbol": "NAD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "NAD" }, "NGN": { "symbol": "NGN", "symbol_native": "\u20A6", "decimal_digits": 2, "rounding": 0.0, "code": "NGN" }, "NIO": { "symbol": "NIO", "symbol_native": "C$", "decimal_digits": 2, "rounding": 0.0, "code": "NIO" }, "NOK": { "symbol": "NOK", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0.0, "code": "NOK" }, "NPR": { "symbol": "NPR", "symbol_native": "नेरू", "decimal_digits": 2, "rounding": 0.0, "code": "NPR" }, "NZD": { "symbol": "NZ$", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "NZD" }, "OMR": { "symbol": "OMR", "symbol_native": "ر.ع.\u200F", "decimal_digits": 3, "rounding": 0.0, "code": "OMR" }, "PAB": { "symbol": "PAB", "symbol_native": "B\/.", "decimal_digits": 2, "rounding": 0.0, "code": "PAB" }, "PEN": { "symbol": "PEN", "symbol_native": "S\/.", "decimal_digits": 2, "rounding": 0.0, "code": "PEN" }, "PHP": { "symbol": "PHP", "symbol_native": "\u20B1", "decimal_digits": 2, "rounding": 0.0, "code": "PHP" }, "PKR": { "symbol": "PKR", "symbol_native": "\u20A8", "decimal_digits": 0, "rounding": 0.0, "code": "PKR" }, "PLN": { "symbol": "PLN", "symbol_native": "zł", "decimal_digits": 2, "rounding": 0.0, "code": "PLN" }, "PYG": { "symbol": "PYG", "symbol_native": "\u20B2", "decimal_digits": 0, "rounding": 0.0, "code": "PYG" }, "QAR": { "symbol": "QAR", "symbol_native": "ر.ق.\u200F", "decimal_digits": 2, "rounding": 0.0, "code": "QAR" }, "RON": { "symbol": "RON", "symbol_native": "RON", "decimal_digits": 2, "rounding": 0.0, "code": "RON" }, "RSD": { "symbol": "RSD", "symbol_native": "дин.", "decimal_digits": 0, "rounding": 0.0, "code": "RSD" }, "RUB": { "symbol": "RUB", "symbol_native": "руб.", "decimal_digits": 2, "rounding": 0.0, "code": "RUB" }, "RWF": { "symbol": "RWF", "symbol_native": "FR", "decimal_digits": 0, "rounding": 0.0, "code": "RWF" }, "SAR": { "symbol": "SAR", "symbol_native": "ر.س.\u200F", "decimal_digits": 2, "rounding": 0.0, "code": "SAR" }, "SDG": { "symbol": "SDG", "symbol_native": "SDG", "decimal_digits": 2, "rounding": 0.0, "code": "SDG" }, "SEK": { "symbol": "SEK", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0.0, "code": "SEK" }, "SGD": { "symbol": "SGD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "SGD" }, "SOS": { "symbol": "SOS", "symbol_native": "SOS", "decimal_digits": 0, "rounding": 0.0, "code": "SOS" }, "STD": { "symbol": "STD", "symbol_native": "Db", "decimal_digits": 0, "rounding": 0.0, "code": "STD" }, "SYP": { "symbol": "SYP", "symbol_native": "ل.س.\u200F", "decimal_digits": 0, "rounding": 0.0, "code": "SYP" }, "THB": { "symbol": "฿", "symbol_native": "฿", "decimal_digits": 2, "rounding": 0.0, "code": "THB" }, "TND": { "symbol": "TND", "symbol_native": "د.ت.\u200F", "decimal_digits": 3, "rounding": 0.0, "code": "TND" }, "TOP": { "symbol": "TOP", "symbol_native": "T$", "decimal_digits": 2, "rounding": 0.0, "code": "TOP" }, "TRY": { "symbol": "TRY", "symbol_native": "TL", "decimal_digits": 2, "rounding": 0.0, "code": "TRY" }, "TTD": { "symbol": "TTD", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "TTD" }, "TWD": { "symbol": "NT$", "symbol_native": "NT$", "decimal_digits": 2, "rounding": 0.0, "code": "TWD" }, "TZS": { "symbol": "TZS", "symbol_native": "TSh", "decimal_digits": 0, "rounding": 0.0, "code": "TZS" }, "UAH": { "symbol": "UAH", "symbol_native": "\u20B4", "decimal_digits": 2, "rounding": 0.0, "code": "UAH" }, "UGX": { "symbol": "UGX", "symbol_native": "USh", "decimal_digits": 0, "rounding": 0.0, "code": "UGX" }, "USD": { "symbol": "$", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "USD" }, "UYU": { "symbol": "UYU", "symbol_native": "$", "decimal_digits": 2, "rounding": 0.0, "code": "UYU" }, "UZS": { "symbol": "UZS", "symbol_native": "UZS", "decimal_digits": 0, "rounding": 0.0, "code": "UZS" }, "VEF": { "symbol": "VEF", "symbol_native": "Bs.F.", "decimal_digits": 2, "rounding": 0.0, "code": "VEF" }, "VND": { "symbol": "\u20AB", "symbol_native": "\u20AB", "decimal_digits": 0, "rounding": 0.0, "code": "VND" }, "XAF": { "symbol": "FCFA", "symbol_native": "FCFA", "decimal_digits": 0, "rounding": 0.0, "code": "XAF" }, "XOF": { "symbol": "CFA", "symbol_native": "CFA", "decimal_digits": 0, "rounding": 0.0, "code": "XOF" }, "YER": { "symbol": "YER", "symbol_native": "ر.ي.\u200F", "decimal_digits": 0, "rounding": 0.0, "code": "YER" }, "ZAR": { "symbol": "ZAR", "symbol_native": "R", "decimal_digits": 2, "rounding": 0.0, "code": "ZAR" }, "ZMK": { "symbol": "ZMK", "symbol_native": "ZK", "decimal_digits": 0, "rounding": 0.0, "code": "ZMK" } };

servicesModule.factory('PayService', ['$sce', '$rootScope', '$timeout', '$analytics', '$translate', '$ionicModal', 'Environment', 'AccountService', 'OverlayService', '$q', 'authHttp', 'SettingsService',
  function($sce, $rootScope, $timeout, $analytics, $translate, $ionicModal, Environment, AccountService, OverlayService, $q, authHttp, SettingsService) {

    var initializedOfflineListener = false;

    var ORIGINAL_YEARLY_PRODUCT_ID = (Environment.isAndroid() ?
      'pacifica_yearly_subscription_54_new' :
      'Pacifica_Yearly_Subscription_v3_53_99');
    var YEARLY_PRODUCT_ID = ORIGINAL_YEARLY_PRODUCT_ID;
    var ORIGINAL_SHORT_TERM_PRODUCT_ID = (Environment.isAndroid() ?
      'pacifica_monthly_subscription_8_99' :
      'Pacifica_Monthly_Subscription_v3_8_99');
    var SHORT_TERM_PRODUCT_ID = ORIGINAL_SHORT_TERM_PRODUCT_ID;
    var ORIGINAL_LIFETIME_PRODUCT_ID = (Environment.isAndroid() ?
      'pacifica_lifetime_subscription_199_99' :
      'Pacifica_Lifetime_Subscription_199_99');
    var LIFETIME_PRODUCT_ID = ORIGINAL_LIFETIME_PRODUCT_ID;

    var TRACKING_PRODUCT_ID = "unlimited_tracking";

    // copied from constants.js, need them before the store is initialized.
    var FREE_SUBSCRIPTION = "free subscription";
    var PAID_SUBSCRIPTION = "paid subscription";
    var CONSUMABLE        = "consumable";
    var NON_CONSUMABLE    = "non consumable";

    var possibleProducts = {
      iOS: [
        {
          id: 'Pacifica_Yearly_Subscription_v3_53_99',
          alias: 'Yearly Subscription 53.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'Pacifica_Yearly_Subscription_35_99',
          alias: 'Yearly Subscription 35.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'Pacifica_Yearly_Subscription',
          alias: 'Yearly Subscription 29.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'Pacifica_Monthly_Subscription_v3_8_99',
          alias: 'Monthly Subscription 8.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'Pacifica_Monthly_Subscription_5_99',
          alias: 'Monthly Subscription 5.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'Pacifica_Monthly_Subscription',
          alias: 'Monthly Subscription 3.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'Pacifica_Lifetime_Subscription_199_99',
          alias: 'Lifetime Subscription 199.99',
          type: NON_CONSUMABLE
        },
        {
          id: 'unlimited_tracking',
          alias: 'Unlimited Tracking 1.99',
          type: NON_CONSUMABLE
        }
      ],
      Android: [
        {
          id: 'pacifica_yearly_subscription_54',
          alias: 'Yearly Subscription 53.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_yearly_subscription_54_new',
          alias: 'Yearly Subscription 53.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_yearly_subscription_36',
          alias: 'Yearly Subscription 35.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_yearly_subscription_30',
          alias: 'Yearly Subscription 29.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_monthly_subscription_8_99',
          alias: 'Monthly Subscription 8.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_monthly_subscription_5_99',
          alias: 'Monthly Subscription 5.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_monthly_subscription_3_99',
          alias: 'Monthly Subscription 3.99',
          type: PAID_SUBSCRIPTION
        },
        {
          id: 'pacifica_lifetime_subscription_199_99',
          alias: 'Lifetime Subscription 199.99',
          type: NON_CONSUMABLE
        },
        {
          id: 'unlimited_tracking',
          alias: 'Unlimited Tracking 1.99',
          type: NON_CONSUMABLE
        }
      ]
    };

    var defaultProducts = {
      iOS: {
        monthly: 'Pacifica_Monthly_Subscription_v3_8_99',
        yearly: 'Pacifica_Yearly_Subscription_v3_53_99',
        lifetime: 'Pacifica_Lifetime_Subscription_199_99',
        tracking: 'unlimited_tracking'
      },
      Android: {
        monthly: 'pacifica_monthly_subscription_8_99',
        yearly: 'pacifica_yearly_subscription_54_new',
        lifetime: 'pacifica_lifetime_subscription_199_99',
        tracking: 'unlimited_tracking'
      }
    };

    // Note, this has to happen right before we initialize. In some cases, it appears that the
    // Device plugin used by the Environment service is not ready yet, so we need to wait.
    // if (Environment.isAndroid()) {
    //   YEARLY_PRODUCT_ID = 'pacifica_yearly_subscription_30';
    //   SHORT_TERM_PRODUCT_ID = 'pacifica_monthly_subscription_3_99'
    // }

    var payService = {
      subscribed: false,
      products: {},
      productVerificationAttempts: {},
      initializedStore: false,
      loadingError: false,
      verifyingPayment: false,
      isShowingModal: false,
      isShowingInsurance: false,
      currentErrorPopup: undefined,
      isPurchasing: false, // This is used so that we don't show reverifications
      insurers:
        [{
          name: 'Aetna',
          covered: false
        },{
          name: 'Allways',
          covered: true
        },{
          name: 'ConnectiCare',
          covered: true
        },{
          name: 'Harvard Pilgrim',
          covered: true
        },{
          name: 'Health Insurance Plan of NY',
          covered: true
        },{
          name: 'Medica',
          covered: true
        },{
          name: 'Providence Health',
          covered: true
        },{
          name: 'Sutter',
          covered: true
        },{
          name: 'Ventura',
          covered: true
        },{
          name: 'United Health Care',
          covered: false
        },{
          name: 'Humana',
          covered: false
        }]
    };

    payService.setOverrides = function setOverrides(premiumCtx) {

      if (premiumCtx && premiumCtx.yearlyProductId && premiumCtx.monthlyProductId) {

        YEARLY_PRODUCT_ID = premiumCtx.yearlyProductId;
        SHORT_TERM_PRODUCT_ID = premiumCtx.monthlyProductId;
        if (premiumCtx.lifetimeProductId)
          LIFETIME_PRODUCT_ID = premiumCtx.lifetimeProductId;
        if (premiumCtx.trackingProductId)
          TRACKING_PRODUCT_ID = premiumCtx.trackingProductId;

        var platformPossibleProducts;
        if (Environment.isAndroid()) {
          platformPossibleProducts = possibleProducts.Android;
        }
        else {
          platformPossibleProducts = possibleProducts.iOS;
        }

        var found = false;
        for (var i=0; i<platformPossibleProducts.length; ++i) {

          var platformProduct = platformPossibleProducts[i];
          if (platformProduct.id == premiumCtx.yearlyProductId ||
              platformProduct.id == premiumCtx.monthlyProductId) {

            found = true;
            break;
          }
        }

        // Will have to test this out to make sure we can register new product IDs without the
        // mobile app knowing about them.
        if (!found) {

          store.register({
            id: premiumCtx.monthlyProductId,
            alias: 'Monthly Override',
            type: store.PAID_SUBSCRIPTION
          });

          store.register({
            id: premiumCtx.monthlyProductId,
            alias: 'Yearly Override',
            type: store.PAID_SUBSCRIPTION
          });

          // TODO other overrides?
        }
      }
      else {

        // Reset to default.
        if (Environment.isAndroid()) {
          YEARLY_PRODUCT_ID = defaultProducts.Android.yearly;
          SHORT_TERM_PRODUCT_ID = defaultProducts.Android.monthly;
          LIFETIME_PRODUCT_ID = defaultProducts.Android.lifetime;
          TRACKING_PRODUCT_ID = defaultProducts.Android.tracking;
        }
        else {
          YEARLY_PRODUCT_ID = defaultProducts.iOS.yearly;
          SHORT_TERM_PRODUCT_ID = defaultProducts.iOS.monthly;
          LIFETIME_PRODUCT_ID = defaultProducts.iOS.lifetime;
          TRACKING_PRODUCT_ID = defaultProducts.iOS.tracking;
        }
      }
    };

    function getProductName(productId) {

      var product = payService.products[productId];
      if (product)
        return product.title;

      if (Environment.isOnline())
        return $translate.instant('UNKNOWN');
      else
        return '[' + $translate.instant('OFFLINE') + ']';
    }

    function getProductPrice(productId) {

      var product = payService.products[productId];
      if (product)
        return product.price;

      if (Environment.isOnline())
        return $translate.instant('UNKNOWN');
      else
        return $translate.instant('OFFLINE');
    }

    // function getProductCurrency(productId) {
    //
    //   var product = payService.products[productId];
    //   if (product) {
    //     if (product.currency)
    //       return product.currency;
    //
    //     // If we don't have the currency, take the price and strip all numbers,
    //     // decimal places, spaces, commas, and return what's left.
    //     var price = product.title;
    //     price = price.replaceAll(/[0-9,\s\.]/g, '');
    //
    //     return price;
    //   }
    //
    //   return '$';
    // }

    function getCurrency(productId) {

      var product = payService.products[productId];
      if (product) {

        if (product.currency)
          return product.currency;

        for (var key in currencyMap) {

          var currencyData = currencyMap[key];

          // Note that we're looking for the code here, not the symbol.
          if (product.price.indexOf(currencyData.symbol) >= 0)
            return key;
        }
      }

      return "$";
    }

    function getNumericProductPrice(productId) {

      var product = payService.products[productId];
      if (product)
        return parseFloat(product.numericPrice);

      return 0;
    }

    function getProductDuration(productId) {

      if (productId == YEARLY_PRODUCT_ID)
        return $translate.instant('ONE_YEAR');
      else
        return $translate.instant('ONE_MONTH');
    }

    function purchaseSubscription(productId) {

      var product = payService.products[productId];

      if (product) {

        // This will force the thank you modal to be displayed.
        payService.isPurchasing = true;

        store.order(product.id);

      } else {

        if (payService.currentErrorPopup)
          payService.currentErrorPopup.close();

        payService.currentErrorPopup = OverlayService.popup.alert({
          title: 'Error',
          template: $translate.instant('ACCOUNT_UPGRADE_PRODUCT_ERROR'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
        payService.currentErrorPopup.then(function(res) {
          payService.currentErrorPopup = undefined;
        });
      }
    }

    /**
     * Search for insurance provider
     * @param {string} [query] the query to search for
     * @returns {Promise<array>} Returns array of insurance providers that match search
     */
    payService.searchForInsurance = function(query) {
      return authHttp.get(Environment.serverURL + '/insurancecarriers/search', {
        params: {
          query: query
        }
      });
    };

    payService.getCurrency = function getCurrency() {

      // Both products will have the same currency.
      return getCurrency(YEARLY_PRODUCT_ID);
    };

    payService.getYearlyProductName = function getYearlyProductName() {

      return getProductName(YEARLY_PRODUCT_ID);
    };

    payService.getYearlyProductPrice = function getYearlyProductPrice() {

      return getProductPrice(YEARLY_PRODUCT_ID);
    };

    payService.getOriginalYearlyProductPrice = function getOriginalYearlyProductPrice() {

      return getProductPrice(ORIGINAL_YEARLY_PRODUCT_ID);
    };

    payService.getYearlyProductPricePerMonth = function getYearlyProductPricePerMonth() {

      // This will be the currency code
      var currency = getCurrency(YEARLY_PRODUCT_ID);
      var currencySymbol;
      if (currencyMap[currency])
        currencySymbol = currencyMap[currency].symbol;
      else
        currencySymbol = '';

      var price = getNumericProductPrice(YEARLY_PRODUCT_ID);

      if (price) {
        // This will round. To get the 2.99 number, we need to truncate.
        // price = Number(price / 12.0).toFixed(2); // e.g. 2.50

        price = Math.floor((price / 12) * 100) / 100;

        // Try to convert currency the right way...
        var monthlyPrice = payService.getShortTermProductPrice() + ''; // e.g. €3,99

        // Gross
        var localDelimiter = monthlyPrice.indexOf('.') >= 0 ? '.' : ',';

        var localePrice;

        price = (price + '').replace('.', localDelimiter);

        if (monthlyPrice.indexOf(currencySymbol) === 0)
          return currencySymbol + price.toLocaleString();
        else
          return price.toLocaleString() + currencySymbol;
      }

      return undefined;
    };

    payService.getYearlyProductDuration = function getYearlyProductDuration() {

      return getProductDuration(YEARLY_PRODUCT_ID);
    };

    payService.purchaseYearlySubscription = function purchaseYearlySubscription() {

      purchaseSubscription(YEARLY_PRODUCT_ID);
    };

    payService.getShortTermProductName = function getShortTermProductName() {

      return getProductName(SHORT_TERM_PRODUCT_ID);
    };

    payService.getShortTermProductPrice = function getShortTermProductPrice() {

      return getProductPrice(SHORT_TERM_PRODUCT_ID);
    };

    payService.getOriginalShortTermProductPrice = function getOriginalShortTermProductPrice() {

      return getProductPrice(ORIGINAL_SHORT_TERM_PRODUCT_ID);
    };

    payService.getShortTermProductDuration = function getShortTermProductDuration() {

      return getProductDuration(SHORT_TERM_PRODUCT_ID);
    };

    payService.purchaseShortTermSubscription = function purchaseShortTermSubscription() {

      purchaseSubscription(SHORT_TERM_PRODUCT_ID);
    };

    payService.getLifetimeProductPrice = function getLifetimeProductPrice() {

      return getProductPrice(LIFETIME_PRODUCT_ID);
    };

    payService.purchaseLifetime = function purchaseLifetime() {

      purchaseSubscription(LIFETIME_PRODUCT_ID);
    };

    payService.getTrackingProductName = function getTrackingProductName() {

      return getProductName(TRACKING_PRODUCT_ID);
    };

    payService.getTrackingProductPrice = function getTrackingProductPrice() {

      return getProductPrice(TRACKING_PRODUCT_ID);
    };

    payService.purchaseTracking = function purchaseTracking() {

      purchaseSubscription(TRACKING_PRODUCT_ID);
    };

    payService.isStoreLoaded = function isStoreLoaded() {

      // Do we need to be more complicated than this?
      return payService.products[YEARLY_PRODUCT_ID] || payService.isLoadingError();
    };

    payService.isLoadingError = function isLoadingError() {

      return payService.loadingError;
    };

    payService.isVerifyingPayment = function isVerifyingPayment() {

      return payService.verifyingPayments > 0;
    };

    payService.manualRefreshStore = function(){
      if (AccountService.canUpgrade()) {
        OverlayService.loading.show($translate.instant('ACCOUNT_UPGRADE_ATTEMPTING_REFRESH') + '...');
        store.refresh();

        $timeout(function() {
          OverlayService.loading.hide();
        }, 2000);
      }
    };

    // Be VERY careful with this. If two of these get kicked off, it's pretty bad. App crashes and all that.
    payService.refreshStore = function refreshStore() {

      // If two of these get kicked off at the same time it seems to be bad. This
      // check might not actually do much.
      // Also, avoid refreshing the store when the user can't upgrade. We'll never
      // show the prices then, and it can cause the user to need to log in.
      if (AccountService.canUpgrade()) {

        console.log("refreshing store.");

        if (!payService.initializedStore)
          payService.initStore();

      } else {

        console.log("Skipping store refresh, user is premium.");
      }
    };

    $rootScope.$on('event:refreshStore', payService.manualRefreshStore);

    var purchaseApproved = function purchaseApproved(p) {


      if (payService.isShowingModal) {

        OverlayService.loading.show($translate.instant('ACCOUNT_UPGRADE_PURCHASE_APPROVED') + '...');

      }
    };

    function initializeProduct(productId, alias, type) {

      // Lifecycle is: Valid -> Requested -> Initiated -> Approved -> Finished -> Owned

      store.register({
        id: productId,
        alias: alias,
        type: type
      });

      // This is called when the purchase was approved by the store
      store.when(alias).approved(function(p) {

        purchaseApproved(p);

        console.log(productId + " attempting verify");
        p.verify();
      });

      // Once the purchase has been approved we need to verify it with out server.
      store.when(alias).verified(function(p) {
        console.log(productId + " verified");
        p.finish();
      });

      store.when(alias).unverified(function(p) {
        console.log(productId + " unverified");
      });

      store.when(alias).initiated(function(p) {

        OverlayService.loading.show($translate.instant('ACCOUNT_UPGRADE_INITIATING_PURCHASE') + '...');
      });

      store.when(alias).cancelled(function(p) {

        OverlayService.loading.hide();

        OverlayService.popup.alert({
          title: 'Error',
          template: $translate.instant('ACCOUNT_UPGRADE_PURCHASE_CANCELED'),
          okText: $translate.instant('OK_GOT_IT'),
          okType: 'button-default'
        });
      });


      store.when(alias).updated(function(p) {

        console.log("Product updated: " + p.id);

        console.log(p);

        payService.products[p.id] = p;

        $rootScope.$broadcast('event:storeUpdated');
      });
    }

    payService.initStore = function initStore() {

      // This has to wait until this is called for reasons described at the top of the service.
      // Note: THis should now be done when setting the premium overrides, which can also reset
      // the payment ID based on the platform. The store should have been initialized.
      // if (Environment.isAndroid()) {
      //   YEARLY_PRODUCT_ID = 'pacifica_yearly_subscription_36';
      //   SHORT_TERM_PRODUCT_ID = 'pacifica_monthly_subscription_5_99';
      // }

      // Check availability of the store plugin
      if (!window.store) {
        console.log('Store not available');
        payService.loadingError = true;
        return;
      } else {
        console.log('Initializing Store.');
      }

      // Note that the refresh still happens below.
      if (!payService.initializedStore) {

        // Don't register these listeners again.
        payService.initializedStore = true;

        // Enable maximum logging level
        store.verbosity = store.DEBUG;

        // Provide a way to validate receipts.
        store.validator = function(product, callback) {

          console.log("Calling validator with product: ");
          console.log(product);

          if (AccountService.canUpgrade() && product.transaction) {

            // This disables some of the retries that are happening within the store plugin I think.
            // Not really sure if we want to do this.
            // if (typeof payService.productVerificationAttempts[product.transaction.id] !== 'undefined') {

            //   OverlayService.loading.hide();

            //   callback(false, "An attempt to verify the transaction has already been made.");

            //   return;
            // }

            ++payService.verifyingPayments;

            AccountService.enablePremiumFeatures(product.transaction, product.id, product.price, function(result) {

              --payService.verifyingPayment;

              OverlayService.loading.hide();

              if (result == 'false') {

                callback(false, {
                  error: {
                    code: store.PURCHASE_EXPIRED,
                    message: $translate.instant('ACCOUNT_UPGRADE_EXPIRED_MESSAGE')
                  }
                });

                // This could prevent us from verifying future purchases.
                // TODO check on iOS that transaction.id exists.
                payService.productVerificationAttempts[product.transaction.id] = false;
              } else {

                payService.productVerificationAttempts[product.transaction.id] = true;

                callback(true, {});

                $rootScope.$broadcast('event:purchased');

                if (payService.isShowingModal) {

                  OverlayService.loading.show($translate.instant('ACCOUNT_UPGRADE_PURCHASE_VERIFIED'));

                  $timeout(function() {

                    OverlayService.loading.hide();

                  }, 2000);
                }
              }
            });
          }
        };

        var platformPossibleProducts;
        if (Environment.isAndroid()) {
          platformPossibleProducts = possibleProducts.Android;
        }
        else {
          platformPossibleProducts = possibleProducts.iOS;
        }

        for (var i=0; i<platformPossibleProducts.length; ++i) {

          var platformProduct = platformPossibleProducts[i];

          initializeProduct(platformProduct.id, platformProduct.alias, platformProduct.type);
        }

        store.error(function(error) {
          var errorMessage;
          OverlayService.loading.hide();
          console.log('ERROR ' + error.code + ': ' + error.message);

          if(!payService.isShowingModal)
            return;
          // There is an annoying case in the sandbox where we are trying to verify
          // purchases for old products, or for receipts that are no longer valid.
          // We don't want to display those.
          if (error.code != store.ERR_PURCHASE) {
            payService.loadingError = true;
            errorMessage = 'ACCOUNT_UPGRADE_STORE_ERROR';
          }else {
            if (payService.currentErrorPopup)
              payService.currentErrorPopup.close();
            errorMessage ='ACCOUNT_UPGRADE_PURCHASE_ERROR';
          }

          if (!payService.currentErrorPopup) {
            payService.currentErrorPopup = OverlayService.popup.alert({
              title: 'Error',
              template: $translate.instant(errorMessage) + '<br><br>Code: ' + error.code + '<br>Message: ' + error.message,
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default',
              enableScrollHack: true
            });
            payService.currentErrorPopup.then(function(res) {
              payService.currentErrorPopup = undefined;
            });
          }
        });

        if (AccountService.canUpgrade())
          store.refresh();
      }
    };

    function setupPaymentScope($scope, category, label) {

      $scope.modalData = {
        showThanks: false
      };

      $scope.refreshStore = function refreshStore() {

        payService.refreshStore();
      };

      // Listen for updates to the pay service products.
      $scope.$on("event:storeUpdated", function() {

        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

      $scope.closePremiumModal = function closePremiumModal() {

        payService.isShowingModal = false;

        OverlayService.modal.close($scope.premiumModal).then(function(modal) {
          $scope.premiumModal = modal;
        });
      };

      $scope.$on('event:purchased', function() {
        if (payService.isPurchasing) {
          $rootScope.$broadcast('event:userContextRefreshRequest');
          OverlayService.loading.hide();
          $scope.modalData.showThanks = true;
          payService.isPurchasing = false;
        }
      });

      $scope.$on('event:upgradedThroughInsurance', function() {
        $rootScope.$broadcast('event:userContextRefreshRequest');
        OverlayService.loading.hide();
        $scope.modalData.showThanks = true;
      });

      // Listen for updates to the pay service products.
      $scope.$on("event:storeUpdated", function() {

        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

      $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
      });

      $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){

        // Hack. Need to trigger re-paint, or swipes left before the first slide show a dark background.
        if (data.slider.activeIndex === 0 || data.slider.activeIndex === 6) {
          $timeout(function() {
            $('ion-content').hide().show();
          }, 0);
        }

        $scope.currentSlideCategory = $scope.slideIndexToCategory(data.slider.activeIndex);
        $scope.$apply();

        if ($rootScope.isUsingScreenReader) {
          var focusId = '#upgrade-focus-' + (data.slider.activeIndex+1);
          $timeout(function() {
            ionic.DomUtil.blurAll();
            $(focusId).focus();
          }, 0);
        }

      });

      // Actually launch the modal
      $analytics.eventTrack('premiumWall', {
        category: category,
        label: label
      });

      // Called at the bottom of this file.
      var attempts = 0;

      $scope.waitForStore = function waitForStore() {

        if (payService.isStoreLoaded()) {

          // The payment service may have changed this for us.
          if (!payService.isVerifyingPayment())
            OverlayService.loading.hide();

          if (payService.isLoadingError()) {
            OverlayService.popup.alert({
              title: 'Error',
              template: $translate.instant('ACCOUNT_UPGRADE_LOADING_STORE_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          } else {

            // Check to see if the payment was actually verified.
            if (AccountService.isPremiumEnabled() && !AccountService.canUpgrade()) {

              $scope.closePremiumModal();
            }
          }
        } else {

          OverlayService.loading.show($translate.instant('ACCOUNT_UPGRADE_REFRESHING') + '...');

          ++attempts;
          if (attempts >= 20) {

            OverlayService.loading.hide();
            OverlayService.popup.alert({
              title: 'Error',
              template: $translate.instant('ACCOUNT_UPGRADE_REFRESH_TIMEOUT_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          } else if (!Environment.isWebDebug()) {

            $timeout($scope.waitForStore, 500);
          }
        }
      };
    }

    payService.showPremiumModal = function showPremiumModal($scope, category, label) {
      if (category === 'account')
        category = 'relax';

      $scope.upgradeCompleteHeader = $sce.trustAsHtml($translate.instant('ACCOUNT_UPGRADE_COMPLETE_POPUP_HEADER_V2'));
      $scope.upgradeCompleteContent = $sce.trustAsHtml($translate.instant('ACCOUNT_UPGRADE_COMPLETE_POPUP_CONTENT_V2'));
      $scope.categoryMap = {
        "relax": 0,
        "journeys": 1,
        "habits": 2,
        "thoughts": 3,
        "mood": 4,
        "backgrounds": 5
      };

      $scope.isShowingInsurance = payService.isShowingInsurance;
      $scope.showInsurance = function() {
        $scope.isShowingInsurance = true;

        // Only try autofocusing on Android, because iOS randomly moves the focus
        // back to the <body> element
        if (Environment.isAndroid()) {
          var insuranceSearch = document.getElementById('insurance-form-search');

          if (insuranceSearch) {
            insuranceSearch.focus();
          }
        }
      };

      $scope.hideInsurance = function() {
        $scope.isShowingInsurance = false;
      };

      $scope.getSlideInstructions = function getSlideInstructions(currentSlide, totalSlides){
        return $translate.instant('ARIA_SLIDE_INSTRUCTIONS').replace('x', currentSlide).replace('y', totalSlides);
      };

      $scope.categoryToSlideIndex = function categoryToSlideIndex(category) {
        return $scope.categoryMap.hasOwnProperty(category) ? $scope.categoryMap[category] : 0;
      };

      $scope.slideIndexToCategory = function slideIndexToCategory(slideIndex) {
        return _.invert($scope.categoryMap)[slideIndex];
      };

      $scope.currentSlideCategory = $scope.slideIndexToCategory($scope.categoryToSlideIndex(category));

      $scope.sliderOptions = {
        loop: false,
        effect: 'slide',
        speed: 350,
        initialSlide: $scope.categoryToSlideIndex(category),
        slidesPerView: 'auto',
        a11y: {
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }
      };

      $scope.getYearlyProductName = function getYearlyProductName() {

        return payService.getYearlyProductName();
      };

      $scope.getYearlyProductPrice = function getYearlyProductPrice() {

        return payService.getYearlyProductPrice();
      };

      $scope.getOriginalYearlyProductPrice = function getOriginalYearlyProductPrice() {
        return payService.getOriginalYearlyProductPrice();
      };

      $scope.getYearlyProductPricePerMonth = function getYearlyProductPricePerMonth() {

        return payService.getYearlyProductPricePerMonth();
      };

      $scope.getYearlyProductDuration = function getYearlyProductDuration() {

        return payService.getYearlyProductDuration();
      };

      $scope.showYearlyPricePerMonth = function showYearlyPricePerMonth() {

        return payService.isStoreLoaded() && $scope.getYearlyProductPricePerMonth() > 0;
      };

      $scope.getShortTermProductName = function getShortTermProductName() {

        return payService.getShortTermProductName();
      };

      $scope.getShortTermProductPrice = function getShortTermProductPrice() {

        return payService.getShortTermProductPrice();
      };

      $scope.getOriginalShortTermProductPrice = function getOriginalShortTermProductPrice() {
        return payService.getOriginalShortTermProductPrice();
      };

      $scope.getShortTermProductDuration = function getShortTermProductDuration() {

        return payService.getShortTermProductDuration();
      };

      $scope.getLifetimeProductPrice = function getLifetimeProductPrice() {

        return payService.getLifetimeProductPrice();
      };

      $scope.getMonthlyTrialText = function getMonthlyTrialText() {

        var text = $translate.instant('ACCOUNT_UPGRADE_MONTHLY_INCLUDES_TRIAL');

        return $sce.trustAsHtml(text);
      };

      $scope.isDiscountActive = function isDiscountActive() {
        // Todo(Dale): how do we determine this?
        // Todo: Should this be broken out by product?
        return ORIGINAL_SHORT_TERM_PRODUCT_ID != SHORT_TERM_PRODUCT_ID;
      };

      $scope.closePremiumModal = function closePremiumModal() {

        payService.isShowingModal = false;

        OverlayService.modal.close($scope.premiumModal).then(function(modal) {
          $scope.premiumModal = modal;
        });

      };

      $scope.purchaseYearly = function purchaseYearly() {
        payService.purchaseYearlySubscription();
      };

      $scope.purchaseShortTerm = function purchaseShortTerm() {
        payService.purchaseShortTermSubscription();
      };

      $scope.purchaseLifetime = function purchaseLifetime() {
        payService.purchaseLifetime();
      };

      $scope.manualRefreshStore = function manualRefreshStore(){
        payService.manualRefreshStore();
      };

      setupPaymentScope($scope, category, label);

      // Add isSettingEnabled to scope if it does not exist
      $scope.isSettingEnabled = SettingsService.isEnabled;

      OverlayService.modal.open({
        modalId: 'UpgradeModal',
        templateUrl: 'views/account/upgrade/account.upgrade.modal.html',
        hardwareBackButtonClose: false,
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: true
      }).then(function(modal) {
        $scope.premiumModal = modal;
        payService.isShowingModal = true;
      });

      if (!payService.isStoreLoaded()) {
        $scope.waitForStore();
      }
    };

    return payService;
  }
]);

/*
 * Created by enda on 7/12/16.
 */
var service = angular.module('practitionerService', []);

service.factory('PractitionerService', ['authHttp', 'AccountService', 'HabitsService', 'GeneralService', 'AssessmentService', '$ionicModal', '$translate', '$ionicPopup', '$rootScope', '$timeout', '$state', '$sce', 'Environment', 'OverlayService',
 function(authHttp, AccountService, HabitsService, GeneralService, AssessmentService,  $ionicModal, $translate, $ionicPopup, $rootScope, $timeout, $state, $sce, Environment, OverlayService) {
  var practitionerService = {

    cachedClients: undefined,
  };

  // These two are only designed to be used during the onboarding workflow.
  // They will not track historical information! In addition, they require
  // the remote calls to have been made. TODO Should have a practitionerContext.
  practitionerService.hasConnectedToSelf = function hasConnectedToSelf() {

    if (AccountService.getAccountUser().user && practitionerService.cachedClients) {

      var selfId = AccountService.getAccountUser().user.id;

      for (var i=0; i<practitionerService.cachedClients.length; ++i) {

        var client = practitionerService.cachedClients[i];

        if (client.clientId == selfId)

          return true;
      }
    }

    return false;
  };

  practitionerService.clientNotificationCount = function clientNotificationCount(client) {
    var notifications = AccountService.getUserNotification();
    var groupNotifications = _.filter(notifications.groupNotifications, function(notification) {
      return !_.isEmpty(notification);
    });

    var count = 0;
    if (groupNotifications && client) {
      _.each(groupNotifications, function(groupNotification) {
        if (groupNotification.groupId === client.clientGroupId)
          count += groupNotification.actions;
      });
    }
    return count;
  };

  practitionerService.clearConsultationNotifications = function clearConsultationNotifications() {
    return authHttp.post('/app/practitioner/appointments/clearAllNotifications');
  };

  practitionerService.updateDirectoryVisibility = function updateDirectoryVisibility(setting){
    var user = AccountService.getAccountUser();
    user.practitioner.publicDirectory = setting;
    return authHttp.post('app/practitioner/account', user.practitioner);
  };

  practitionerService.presignURL = function presignURL(type) {
    return authHttp.get('/app/practitioner/presignURL?type=' + type);
  };


  practitionerService.setPhotoURL= function setPhotoURL(url) {
    return authHttp.post('/app/practitioner/setPhotoURL', url);
  };

  practitionerService.hasInvitedOther = function hasInvitedOther() {

    if (AccountService.getAccountUser().user && practitionerService.cachedInvites) {

      var selfEmail = AccountService.getAccountUser().user.email;

      for (var i=0; i<practitionerService.cachedInvites.length; ++i) {

        var invite = practitionerService.cachedInvites[i];

        if (invite.email != selfEmail)
          return true;
      }
    }

    return false;
  };


  practitionerService.getCachedClients = function getCachedClients() {

    return practitionerService.cachedClients;
  };

  practitionerService.getClients = function() {

    var ret = createPromise();

    authHttp.get('/app/practitioner/clients')
      .success(function (clients) {
        practitionerService.cachedClients = clients;

        if (ret.successCallback)
          ret.successCallback(clients);
      })
      .error(function() {

        if (ret.errorCallback)
          ret.errorCallback();
      });

    return ret;
  };

  practitionerService.testClient = function() {
    return authHttp.post('/app/practitioner/democlient' );
  };

  practitionerService.inviteClient = function(client) {
    return authHttp.post('/app/practitioner/client', client);
  };

  practitionerService.updateClient = function(client){
   return authHttp.put('/app/practitioner/client', client);
  };

  practitionerService.disconnectClient = function(client) {
    return authHttp.delete('/app/practitioner/client/' + client.account.id);
  };

  practitionerService.resendInvite = function(client) {
    return authHttp.post('/app/practitioner/resendInvite', client);
  };

  practitionerService.deleteAllForClient = function(clientId){
    return authHttp.post('/app/practitioner/cancelupcoming/' + clientId);
  };

  practitionerService.getUserContext = function(clientId) {
    var params = {
      clientId: clientId
    };
    return authHttp.get('/app/practitioner/usercontext', {
      params: params
    });
  };

  practitionerService.getUserActivity = function(clientId, start, end) {
    var params = {
      clientId: clientId
    };
    if (start) {
      params.startTime = start.getTime();
    }
    if (end) {
      params.endTime = end.getTime();
    }
    return authHttp.get('/app/practitioner/useractivity', {
      params: params
    });
  };

  practitionerService.getUser = function(accountId) {
    var params = {
      clientid: accountId
    };
    return authHttp.get('/app/practitioner/client/' + accountId);
  };

  practitionerService.getAssessments = function() {
    return authHttp.get('/app/assessments');
  };

  practitionerService.getAssessment = function(id) {
    return authHttp.get('/app/assessments/' + id);
  };

  practitionerService.getAssessmentRequests = function(accountId) {
    var params = {
      accountId: accountId
    };
    return authHttp.get('/app/practitioner/assessmentrequests', {
      params: params
    });
  };

  practitionerService.editAssessmentRequest = function(accountId, assessmentId, requestId, requestDate, repeating, intervalDays) {
    var request = {
      accountId :accountId,
      requestDate : requestDate,
      repeating: repeating,
      intervalDays: intervalDays
    };
    return authHttp.put('/app/assessments/' + assessmentId + '/request/' + requestId, request );
  };

  practitionerService.cancelAssessmentRequest = function(assessmentId, requestId) {
    return authHttp.delete('/app/assessments/' + assessmentId + '/request/' + requestId );
  };

  practitionerService.getAssessmentResults = function(assessmentId, requestId) {
    return authHttp.get('/app/assessments/' + assessmentId + '/request/' + requestId );
  };


  practitionerService.downloadPDF = function(assessmentId, requestId) {
    return authHttp.get('/app/assessments/' + assessmentId + '/request/' + requestId + '/report.pdf', {responseType:'blob'} );
  };

  practitionerService.requestAssessment = function(accountId, assessmentId, requestDate, repeating, intervalDays, force) {
    var request = {
      accountId :accountId,
      requestDate : requestDate,
      repeating: repeating,
      intervalDays: intervalDays
    };

    // This is used to ensure that post-upgrade workflow completes.
    // TODO This is a bit broken. It is getting fired when getting your own assessment.
    AccountService.setUserPreference('practitioner_completed_postupgrade', true);
    var config = {};
    if (force === true) {
      config = { params : { force: 'true'}};
    }
    return authHttp.post('/app/assessments/' + assessmentId + '/request', request, config );
  };

  practitionerService.baaSigned = function() {
    return authHttp.post('/app/practitioner/setBaaSigned');
  };

  practitionerService.getAppointmentsForClient = function(clientId) {
    return authHttp.get( '/app/practitioner/appointments?clientId=' + clientId);
  };

  practitionerService.getAppointments = function(startTime, endTime) {

    var params = {};
    if (startTime) {
      params.startTime = startTime.getTime();
    }
    if (endTime) {
      params.endTime = endTime.getTime();
    }
    return authHttp.get( '/app/practitioner/appointments',{
      params: params
    });
  };

  practitionerService.newAppointment = function(appointment) {
    return authHttp.post('/app/practitioner/appointments',appointment);
  };

  practitionerService.editAppointment = function(appointment) {
    return authHttp.put('/app/practitioner/appointments/' + appointment.id ,appointment);
  };

  practitionerService.cancelAppointment = function(appointment) {
    return authHttp.delete('/app/practitioner/appointments/' + appointment.id);
  };

  practitionerService.createAppointmentException = function(appointment){
    var time = appointment.exceptionTime ? appointment.exceptionTime : appointment.startTime;
    return authHttp.delete('/app/practitioner/appointments/' + appointment.id + '?startTime=' + time);
  };

  practitionerService.newRoom = function(room) {
    return authHttp.post('/app/practitioner/rooms',room);
  };

  practitionerService.initClientFunctionality = function($scope){

      $scope.dismissCopyConfirmation = function(){
        $scope.codeCopied = undefined;
      };

      $scope.codeCopiedCallback = function(code){
        $scope.codeCopied = code;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
        $timeout(function(){
          $scope.codeCopied = undefined;
        }, 1500);
      };

    $scope.closeEditClientModal = function(){
      OverlayService.modal.close($scope.editClientModal).then(function(modal) {
        $scope.editClientModal = modal;
        $scope.showClientConfirmationModal = false;
        $timeout(function() {
          $scope.refreshClients();
        });
      });
    };

    $scope.newClient = function(opts){
      if($scope.editClientModal){
        return;
      }
      $scope.client = undefined;
      $scope.editClient = {
        account:{
          firstName: opts? opts.firstName: undefined,
          lastName: opts? opts.lastName: undefined,
          email: opts? opts.email: undefined,
        },
        message: "",
        sendEmail: opts? true: false
      };
      $scope.showTestDrive = function showTestDrive() {

        return Environment.isDevelopment() ||  (clients.length === 0);
      };

      OverlayService.modal.open({
        modalId: 'EditClientModal',
        templateUrl: 'templates/practitioner/edit-client.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.editClientModal = modal;
      });

    };

    $scope.updateClient = function(client){
      if(client){
        $scope.client = client;
      }
      $scope.editClient = {
        account: {
          firstName: client.account.firstName,
          lastName: client.account.lastName,
          email: client.account.email
        },
        message: "",
        sendEmail: false,
        emailEditable: client.emailEditable
      };

      OverlayService.modal.open({
        modalId: 'EditClientModal',
        templateUrl: 'templates/practitioner/edit-client.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.editClientModal = modal;
      });
    };

    var colorSeries = ['#E77D8D','#AB8FBF','#48A3B6','#4BA578','#919640','#C77C4A'];
    function getSeriesColor(index) {

      return colorSeries[index % colorSeries.length];
    }


     var setAssessmentGraphId = function(id) {
       $scope.graphAssessment.id = id;
       AssessmentService.getAssessment($scope.graphAssessment.id, function(assessment) {
         // The above could return immediately.
         if ($scope.clientAssessments) {
           $scope.clientAssessments.title.text = 'All Time ' + assessment.shortName;
         }
         if ($scope.thirtyDayAssessments) {
           $scope.thirtyDayAssessments.title.text = '30 Day ' + assessment.shortName;
         }
       });
     };

    $scope.graphAssessment = {
      id: -1
    };

    var assessmentOverviewId = AccountService.getUserPreference('practitioner_last_overview_assessment');
    if (assessmentOverviewId) {
      assessmentOverviewId = +assessmentOverviewId;
      setAssessmentGraphId(assessmentOverviewId);
    }


    $scope.updateClientAssessmentGraph = function updateClientAssessmentGraph(filteredClients, assessmentId) {


      // Keep a map to start that we'll turn into an array later.
      var availableClientAssessmentIds = {};
      var clientAssessmentSeries;
      // Don't recreate the object or we'll invalidate angular's watch hierarchy.
      if (!$scope.clientAssessments)
        $scope.clientAssessments = {};

      _.merge($scope.clientAssessments, {
        chart: {
          type: 'spline',
          height: 240,
          width: 500
        },
        title: {
          text: 'All Time Assessments'
        },
        legend: {
          enabled: false
        },
        yAxis: {
          min: 0,
          max: 24, // Will get updated with assessment data
          ceiling: 24,
          tickInterval: 10,
          labels: {
            enabled: true
          },
          title: {
            text: null
          }
        },
        xAxis: {
          min: 0,
          showEmpty: true,
          labels: {
            enabled: true
          },
          title: {
            text: 'Days From First Assessment'
          }
        },
        series: [],
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  $scope.goToClientTab(this.client.clientId, 'assessments');
                }
              }
            }
          }
        },
        tooltip: {
          useHTML: true,
          style: {
            pointerEvents: 'auto'
          },
          formatter: function(){
            return '<span style="font-size: 10px">' + moment(this.point.finishedAt).format("MMM DD, YYYY h:mm a") + '</span><br/>' +
              // '<a href="javascript:goToClient(' + this.point.client.clientId + ')"><strong>' + this.point.client.account.firstName + ' ' + this.point.client.account.lastName.substring(0, 1) + '.</strong></a>, ' + $translate.instant(this.point.scoreType) + ': ' + this.y + '<br>' +
              '<strong>' + this.point.client.account.firstName + ' ' + this.point.client.account.lastName.substring(0, 1) + '.</strong>, ' + $translate.instant(this.point.scoreType) + ': ' + this.y + '<br>' +
              this.x + ' Days';
          }
        }
      });

      $scope.clientAssessments.series.length = 0;

      // This seems extremely unnecessary but I can't get the axes to show up without it.
      $scope.clientAssessments.series.push({
        name: "Fake Series",
        data: []
      });
      if (typeof $scope.clientAssessments.iteration == 'undefined')
        $scope.clientAssessments.iteration = 0;
      else
        ++$scope.clientAssessments.iteration;

      if (filteredClients) {

        for (var i=0; i<filteredClients.length; ++i) {

          var client = filteredClients[i];

          // This needs to get reset every time we re-run this.
          client.lastAssessment = undefined;
          client.firstAssessment = undefined;

          clientAssessmentSeries = {};

          // Need to limit by type.
          if (client.assessmentRequests && client.assessmentRequests.length > 0) {

            for (var j=0; j<client.assessmentRequests.length; ++j) {
              var userAssessment = client.assessmentRequests[j].userAssessment;

              // We need a way to know which assessments can be viewed.
              availableClientAssessmentIds[userAssessment.assessmentId] = userAssessment.assessmentId;

              // Just start with the first one if an ID has not been passed in.
              if (!assessmentId || assessmentId <= 0) {
                assessmentId = userAssessment.assessmentId;
                setAssessmentGraphId(assessmentId);
              } else if ($scope.graphAssessment.id <= 0) {
                setAssessmentGraphId(assessmentId);
              }


              if (assessmentId && userAssessment.assessmentId != assessmentId)
                continue;

              if (userAssessment.status == 'COMPLETE') {

                if (!client.lastAssessment ||
                    (userAssessment.finishedAt > client.lastAssessment.userAssessment.finishedAt))
                  client.lastAssessment = client.assessmentRequests[j];

                if (!client.firstAssessment)
                  client.firstAssessment = userAssessment.finishedAt;

                for (var k=0; k<userAssessment.scores.length; ++k) {

                  var assessmentScore = userAssessment.scores[k];

                  var seriesScoreData = clientAssessmentSeries[assessmentScore.name];
                  if (!seriesScoreData)
                    seriesScoreData = clientAssessmentSeries[assessmentScore.name] = [];

                  // TODO What about series with multiple scores?
                  seriesScoreData.push({
                    x: Math.floor( (userAssessment.finishedAt - client.firstAssessment) / (24 * 60 * 60 * 1000)),
                    y: assessmentScore.score,
                    finishedAt: userAssessment.finishedAt,
                    scoreType: assessmentScore.name,
                    client: client
                  });

                  if (assessmentScore.maxScore > $scope.clientAssessments.yAxis.max)
                    $scope.clientAssessments.yAxis.max = $scope.clientAssessments.yAxis.ceiling = assessmentScore.maxScore;
                }
              }
            }
          }

          // We need to add series for each of the score types.
          for (var scoreType in clientAssessmentSeries) {
            var scoreSeries = clientAssessmentSeries[scoreType];

            var seriesName = client.account.firstName + ' ' + client.account.lastName.substring(0, 1) + '. ';
            // Maybe this should be a map based on the assessment IDs.
            $scope.clientAssessments.series.push({
              name: seriesName,
              data: scoreSeries,
              color: getSeriesColor(i)
            });
          }

         setAssessmentGraphId($scope.graphAssessment.id);
        }


        // --------------------------------------------------------
        // Copy over all of the data we just collected, but modify
        // the data points to use the actual time and only show the
        // past 30 days' worth of data.
        // --------------------------------------------------------
        if (!$scope.thirtyDayAssessments)
          $scope.thirtyDayAssessments = {};
        else
          $scope.thirtyDayAssessments.series.length = 0;

        _.merge($scope.thirtyDayAssessments, $scope.clientAssessments);

        var today = new Date();
        today.setHours(0,0,0,0);
        var thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        $scope.thirtyDayAssessments.title.text = '30 Day Assessments';
        $scope.thirtyDayAssessments.xAxis.min = thirtyDaysAgo.getTime();
        $scope.thirtyDayAssessments.xAxis.max = new Date().getTime();
        $scope.thirtyDayAssessments.xAxis.title.text = 'Past 30 Days';
        $scope.thirtyDayAssessments.xAxis.labels.enabled = true;
        $scope.thirtyDayAssessments.xAxis.labels.formatter = function() {
          return moment(this.value).format("MMM D");
        };

        $scope.thirtyDayAssessments.tooltip.formatter = function(){
          return '<span style="font-size: 10px">' + moment(this.point.finishedAt).format("MMM DD, YYYY h:mm a") + '</span><br/>' +
            // '<a href="javascript:goToClient(' + this.point.client.clientId + ')"><strong>' + this.point.client.account.firstName + ' ' + this.point.client.account.lastName.substring(0, 1) + '.</strong></a>, ' + $translate.instant(this.point.scoreType) + ': ' + this.y;
            '<strong>' + this.point.client.account.firstName + ' ' + this.point.client.account.lastName.substring(0, 1) + '.</strong>, ' + $translate.instant(this.point.scoreType) + ': ' + this.y;
        };

        for (var x=0; x<$scope.thirtyDayAssessments.series.length; ++x) {

          clientAssessmentSeries = $scope.thirtyDayAssessments.series[x].data;
          for (var y=0; y<clientAssessmentSeries.length; ++y){

            // We need this data to use the actual timestamps.
            var dataPoint = clientAssessmentSeries[y];
            dataPoint.x = dataPoint.finishedAt;
          }
        }

        $scope.availableClientAssessmentIds = [];

        for (assessmentId in availableClientAssessmentIds) {
          $scope.availableClientAssessmentIds.push(+assessmentId);
        }

      }

    };

    function tooltipFormatter(){
      return '<span style="font-size: 10px">' + moment(this.x).format("MMM DD, YYYY h:mm a") + '</span><br/>' +
        '<span class="mood ' + this.points[0].point.moodClass + '">' + HabitsService.getHabitDisplayFromData(this.points[0].point.moodEntry) + '</span>';
    }

    $scope.refreshClients = function(callback) {
      practitionerService.getClients()
        .success(function (clients) {
          $scope.clients = clients;

          if ($scope.clients) {

            for (var i=0; i<$scope.clients.length; ++i) {

              var client = $scope.clients[i];

              if (client.moodData) {

                client.moodData.sort(function (a,b) {
                  return a.experiencedAt - b.experiencedAt;
                });

                var now = new Date();
                now.setHours(0,0,0,0);

                var dayInMS = 24 * 60 * 60 * 1000;
                var chartStartX = now.getTime();
                var chartEndX = chartStartX + dayInMS; // Tonight at midnight.
                chartStartX -= (6 * dayInMS); // 7 days ago.

                // tickInterval: 24 * 60 * 60 * 1000,
                // maxTickInterval: 24 * 60 * 60 * 1000,
                var tickPositions = [];
                for (var j=0; j<8; ++j) {
                  tickPositions.push(chartStartX + (j*dayInMS));
                }

                var seriesData = [];
                client.moodChart = {
                  chart: {
                    height: 40
                  },
                  yAxis: {
                    max: 8,
                    min: 0
                  },
                  xAxis: {
                    min: chartStartX,
                    max: chartEndX,
                    tickPositions: tickPositions
                  },
                  series: [{
                    data: seriesData,
                    pointStart: 1
                  }],
                  tooltip: {
                    formatter: tooltipFormatter
                  }
                };

                for (var k=0; k<client.moodData.length; ++k) {

                  var moodEntry = client.moodData[k];

                  // Translations haven't loaded?
                  if (moodEntry.experiencedAt > chartStartX) {
                    seriesData.push({x: moodEntry.experiencedAt,
                                     y: moodEntry.valueInt,
                                     moodEntry: moodEntry,
                                     moodClass: HabitsService.getMoodClassFromData(moodEntry),
                                     color: GeneralService.COLORS[7-moodEntry.valueInt]});
                  }
                }
              }
            }
          }

          $scope.hasActiveClients = false;
          $scope.clients.forEach(function(client){
            if(client.status != 'DISCONNECTED'){
              $scope.hasActiveClients = true;
            }
          });
          $rootScope.$broadcast('event:clientsLoaded');
          if(callback){
            callback();
          }
        })
        .error(function () {
          $scope.clients = [];
        });
    };

    $scope.testDrive = function() {
        practitionerService.testClient().success(function (client) {
            $scope.closeEditClientModal();
            $scope.refreshClients();
        });
    };

    $scope.saveClient = function(){
      $scope.submittingClient = true;
      $scope.errorMessage = undefined;
      if (!$scope.editClient.account.firstName) {
        $scope.errorMessage = "First name required";
        $scope.submittingClient = false;
        return;
      }
      if (!$scope.editClient.account.lastName) {
        $scope.errorMessage = "Last name required";
        $scope.submittingClient = false;
        return;
      }

      var isEdit = $scope.client && $scope.client.id;
      var action = practitionerService.inviteClient;
      if(isEdit){
        action = practitionerService.updateClient;
        $scope.editClient.id = $scope.client.id;
        $scope.editClient.account.id = $scope.client.account.id;
      }

      action($scope.editClient)
        .success(function (client) {
          if(!isEdit){
            $scope.clientInviteCode = client.inviteCode;
            $scope.downloadPrompt = $translate.instant('CLIENT_ADDED_DOWNLOAD_PROMPT');
            $scope.showClientConfirmationModal = true;
          } else {
            $scope.closeEditClientModal();
            $scope.client.account.firstName = $scope.editClient.account.firstName;
            $scope.client.account.lastName = $scope.editClient.account.lastName;
            $scope.client.account.email = $scope.editClient.account.email;
          }
          $scope.submittingClient = false;
          $scope.refreshClients();
        })
        .error(function (data, status, header, config) {
          $scope.submittingClient = false;
          if (status == 409) {
            OverlayService.popup.alert({
              template: $translate.instant('INVITE_CLIENT_CONFLICT'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }
          else {
            OverlayService.popup.alert({
              template: $translate.instant('INVITE_CLIENT_ERROR'),
              okText: $translate.instant('OK_GOT_IT'),
              okType: 'button-default'
            });
          }
        });
    };

    $scope.toggleSendEmail = function(){
      $scope.editClient.sendEmail = !$scope.editClient.sendEmail;
    };

    $rootScope.$on('event:appointmentsUpdated', function(){
      $scope.refreshClients();
    });
  };


  practitionerService.getFirstRecurringInstance = function(appointment, recurrenceStart){
    if(typeof appointment.startTime != 'object'){
      appointment.startTime = moment(appointment.startTime);
    }
    var startDiff = recurrenceStart.diff(appointment.startTime, 'd');
    var intervalsPast = Math.ceil(startDiff / appointment.intervalDays);
    if(intervalsPast <= 0){
      return appointment.startTime.clone();
    }
    return appointment.startTime.clone().add(appointment.intervalDays * intervalsPast, 'd');
  };

  practitionerService.evaluateException = function(appointment, start){
    var isException = false;
    if(appointment.exceptions){
      appointment.exceptions.forEach(function(exception){
        if(start.isSame(exception.startTime)){
          isException = true;
        }
      });
    }
    return isException;
  };

  practitionerService.createClientGroup = function createClientGroup(clientId) {

    var ret = createPromise();

    authHttp.put('/app/practitioner/client/' + clientId + '/group')
      .success(function (newGroupId) {

        var cachedClients = practitionerService.getCachedClients();

        var existingClient = _.find(cachedClients, function(cl){
          return cl.id == clientId;
        });

        if (existingClient) {
          existingClient.clientGroupId = newGroupId;
        }

        if (ret.successCallback)
          ret.successCallback(newGroupId);
      })
      .error(function() {

        if (ret.errorCallback)
          ret.errorCallback();
      });
    return ret;
  };

  practitionerService.initAppointmentFunctionality = function($scope){

    $scope.closeEditAppointmentModal = function closeEditAppointmentModal () {
      OverlayService.modal.close($scope.editAppointmentModal).then(function(modal) {
        $scope.editAppointmentModal = modal;
        $scope.showAppointmentConfirmation = false;
      });
    };

    $scope.clientSelected = function(client){
      $scope.showTeletherapyExplainer = false;
      $scope.showClientDropdown = true;
      $scope.client = _.find($scope.clients, function(client){
        return client.account.id == $scope.editAppointment.clientId;
      });
      if($scope.client.status == 'INVITED'){
        $scope.editAppointment.appointmentType = 'IN_PERSON';
      }
    };

    $scope.getFormattedApptTime = function(appointment){
      var timeString = '';
      if($scope.canStartAppointment(appointment)){
        timeString += 'Now, ' + moment(appointment.startTime).format("M/D") + ' at ';
      } else {
        timeString += moment(appointment.startTime).format("dddd, M/D") + ' at ';
      }
      timeString += moment(appointment.startTime).format("h:mmA z") + ' (' + appointment.duration + 'm)';
      return timeString;
    };

    $scope.viewClient = function(clientId){
      $scope.goToClient(clientId);
      $scope.closeEditAppointmentModal();
    };

    $scope.updateAppointment = function(appointment, reschedule, overrideCancel) {
      $scope.appointmentModalError = null;
      $scope.appointmentModalErrorMsg = null;

      $scope.newClientRibbon = $sce.trustAsHtml($translate.instant("FIND_NEW_CLIENTS_RIBBON"));
      //use reschedule = true to update one instance of a recurring appointment
      $scope.showTeletherapyExplainer = false;
      $scope.reschedule = reschedule;
      $scope.minDate = moment().subtract(5,'minutes');
      // we don't want to allow cancel from client screen, there's a drop down for cancelling
      // don't need it in the edit modal
      $scope.editAppointment = angular.copy(appointment);
      // on update we need to preserve the exception time so we can create it since startTime is overridden
      $scope.editAppointment.exceptionTime = angular.copy($scope.editAppointment.startTime);
      $scope.editAppointment.disallowCancel = overrideCancel;
      $scope.editAppointment.duration = '' + $scope.editAppointment.duration;

      if($scope.editAppointment.appointmentType == 'CONSULTATION' ){
        $scope.minDate = moment().subtract(5,'minutes');
      }

      var zone = moment().tz(AccountService.getUserTimeZone()).format('z');
      $scope.editAppointment.tz = zone;

      OverlayService.modal.open({
        modalId: 'EditAppointmentModal',
        templateUrl: 'templates/practitioner/edit-appointment.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.editAppointmentModal = modal;
      });
    };

    $scope.checkExplainerStatus = function(){
      $scope.showTeletherapyExplainer = false;
      if($scope.client && $scope.client.status != 'CONNECTED'){
        $scope.editAppointment.appointmentType = 'IN_PERSON';
        $scope.showTeletherapyExplainer = true;
      }
    };

    $scope.isPremiumEnabled = function isPremiumEnabled() {
      return AccountService.isPremiumEnabled();
    };

    $scope.isViewingPersonalAccount = function isViewingPersonalAccount() {

      return $scope.practitionerUserId == +$scope.userId;
    };

    $scope.getRecurringDislpay = function(days){
      var interval = _.find($scope.recurringOptions, {value: days});
      return interval.display;
    };

    $scope.setConsultation = function setConsultation(appointment) {

      if (appointment.duration != '15' && appointment.duration != '20')
        appointment.duration = '15';

      appointment.clientId = undefined;
    };

    $scope.newConsultation = function(){
      if(!AccountService.isPremiumEnabled()){
        $scope.showClinicianPremiumModal();
        return;
      }
      resetEditAppointmentVars();
      $scope.minDate = moment().subtract(5,'minutes');
      $scope.newClientRibbon = $sce.trustAsHtml($translate.instant("FIND_NEW_CLIENTS_RIBBON"));
      $scope.editAppointment = createDefaultAppointmentObj('CONSULTATION', '20');
      showEditAppointmentModal();
    };

    $scope.getCreateButtonLabel = function(){
      if($scope.isConsultation()){
        return $translate.instant("SCHEDULE_CONSULTATION");
      }
      return $translate.instant("SCHEDULE_APPOINTMENT");
    };

    $scope.isConsultation = function(){
      return $scope.editAppointment.appointmentType == 'CONSULTATION';
    };

    function createDefaultAppointmentObj(type, duration){
      var zone = moment().tz(AccountService.getUserTimeZone()).format('z');
      var startNow = moment();
      startNow = $scope.roundUpToNearestFiveMinutes(startNow);

      return {
          startTime: startNow,
          duration: duration,
          intervalDays: 7,
          set: false,
          tz: zone,
          appointmentType: type,
          clientId: undefined
        };
    }

    function showEditAppointmentModal(){
      OverlayService.modal.open({
        modalId: 'EditAppointmentModal',
        templateUrl: 'templates/practitioner/edit-appointment.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.editAppointmentModal = modal;
      });
    }

    function resetEditAppointmentVars(){
      $scope.reschedule = false;
      $scope.appointmentModalError = null;
      $scope.appointmentModalErrorMsg = null;
      $scope.showTeletherapyExplainer = false;
      $scope.client = undefined;
    }

    $scope.newAppointment = function(client) {
      resetEditAppointmentVars();
      if ($scope.isPremiumEnabled() || $scope.isViewingPersonalAccount() || (client && client.account.premium)) {
        $scope.minDate = moment().subtract(5,'minutes');
        $scope.editAppointment = createDefaultAppointmentObj('IN_PERSON', '50');
        if(client && $scope.clients){
          $scope.client = _.find($scope.clients, function(cl){
            return cl.id == client.id;
          });
          $scope.editAppointment.client = client;
          if($scope.client.status != 'CONNECTED'){
            $scope.editAppointment.appointmentType = 'IN_PERSON';
          }
        }
        showEditAppointmentModal();
      }
      else {
        $scope.showClinicianPremiumModal();
      }
    };

    $scope.saveAppointment = function(updateExisting, successCallback) {
      //create appointment
      if (updateExisting) {
        $scope.editAppointment.repeating = $scope.editAppointment.intervalDays > 0;
        practitionerService.editAppointment($scope.editAppointment)
        .success(function () {
          // clear errors
          $scope.appointmentModalError = false;
          $scope.appointmentModalErrorMsg = null;
          // refresh list
          if($scope.editAppointmentModal !== undefined){
            $scope.showAppointmentConfirmation = true;
          }
          $rootScope.$broadcast('event:appointmentsUpdated');
        })
        .error(function (resp) {
          if(!resp.message){
            $scope.appointmentModalErrorMsg = $translate.instant('APPOINTMENT_SAVE_ERROR');
          } else {
            $scope.appointmentModalErrorMsg = resp.message;
          }
          $scope.appointmentModalError = true;
          console.log('There was an error creating appointment.');
        });
      } else {
        var appointment = {
          practitionerId: $scope.practitionerId,
          clientId: $scope.editAppointment.appointmentType != 'CONSULTATION' ? ($scope.client ? $scope.client.account.id : $scope.editAppointment.clientId) : undefined,
          description: 'Test Appointment',
          startTime: $scope.editAppointment.startTime,
          duration: +$scope.editAppointment.duration,
          appointmentType: $scope.editAppointment.appointmentType,
          intervalDays: $scope.editAppointment.intervalDays,
          repeating: $scope.editAppointment.intervalDays > 0
        };
        appointment.repeating = appointment.intervalDays > 0;
        practitionerService.newAppointment(appointment)
        .success(function (data) {
          //clear errors
          $scope.appointmentModalError = false;
          $scope.appointmentModalErrorMsg = null;
          // refresh list
          if(successCallback){
            successCallback();
          }
          $scope.showAppointmentConfirmation = true;
          $rootScope.$broadcast('event:appointmentsUpdated');
        })
        .error(function (resp) {
          if(!resp.message){
            $scope.appointmentModalErrorMsg = $translate.instant('APPOINTMENT_SAVE_ERROR');
          } else {
            $scope.appointmentModalErrorMsg = resp.message;
          }
          $scope.appointmentModalError = true;
        });
      }
    };

    $scope.scheduleRecurringException = function(successCallback){
      $scope.editAppointment.intervalDays = 0;
      $scope.editAppointment.repeating = false;
      $scope.saveAppointment(false);
    };

    $scope.rescheduleRecurringAppointment = function(){
      $scope.createException($scope.editAppointment, $scope.scheduleRecurringException);
    };


    var makeExceptionCall = function(appointment, cancelCallback){
      practitionerService.createAppointmentException(appointment).success(function() {
        $rootScope.$broadcast('event:appointmentCancelled', {appointment: appointment} );
        $scope.refreshClients();
        if(cancelCallback){
          cancelCallback();
        } else {
          if($scope.editAppointmentModal !== undefined){
            $scope.closeEditAppointmentModal();
          }
        }
      }).error(function(){
        console.log('an error occurred creating this exception');
      });
    };

    $scope.createException = function(appointment, successCallback){

      if(!successCallback){
        var template = '';
        var yesState = '';
        if(appointment.appointmentType == 'CONSULTATION'){
          template = $translate.instant('CANCEL_CONSULTATION_TEXT');
          yesState = $translate.instant('YES_CANCEL_CONSULTATION');
        } else {
          template = $translate.instant('CANCEL_APPOINTMENT_TEXT');
          yesState = $translate.instant('YES_CANCEL_APPOINTMENT');
        }
        var confirmPopup = OverlayService.popup.confirm({
          template: template,
          cancelText: $translate.instant('NO_CANCEL_APPOINTMENT'),
          cssClass: 'cancel-appointment',
          cancelType: 'button-default',
          title: $translate.instant('CANCEL_APPOINTMENT'),
          okText: yesState,
          okType: 'button-default'
        });

        confirmPopup.then(function(res) {
          if(res) {
            makeExceptionCall(appointment);
          }
        });
      } else {
        makeExceptionCall(appointment, successCallback);
      }
    };

    $scope.cancelAppointment = function(appointment, callback) {
      var templateText;

      if(appointment.appointmentType == 'CONSULTATION'){
        yesState = $translate.instant('YES_CANCEL_CONSULTATION');
        if(appointment.repeating) {
          templateText = $translate.instant('CANCEL_REPEATING_CONSULTATION_TEXT');
        } else {
          templateText = $translate.instant('CANCEL_CONSULTATION_TEXT');
        }
      } else {
        yesState = $translate.instant('YES_CANCEL_APPOINTMENT');
        if(appointment.repeating) {
          templateText = $translate.instant('CANCEL_REPEATING_APPOINTMENT_TEXT');
        } else {
          templateText = $translate.instant('CANCEL_APPOINTMENT_TEXT');
        }
      }


      var confirmPopup = OverlayService.popup.confirm({
        template: templateText,
        cancelText: $translate.instant('NO_CANCEL_APPOINTMENT'),
        cssClass: 'cancel-appointment',
        cancelType: 'button-default',
        title: $translate.instant('CANCEL_APPOINTMENT'),
        okText: yesState,
        okType: 'button-default'
      });

      confirmPopup.then(function(res) {
        if(res) {
          practitionerService.cancelAppointment(appointment).success(function() {
            $rootScope.$broadcast('event:appointmentCancelled', {appointment: appointment, repeating: appointment.repeating} );
            $scope.refreshClients();
            if($scope.editAppointmentModal !== undefined){
              $scope.closeEditAppointmentModal();
              $scope.refreshClients();
            }
          });
        }
      });
    };

    $scope.getPhoneDisplay = function(phone){
    };

    $scope.getAppointmentTypeDisplay = function(type){
      if(type == 'TELETHERAPY'){
        return $translate.instant('TELETHERAPY');
      } else if(type == 'IN_PERSON'){
        return $translate.instant("IN_PERSON");
      }
    };

    $scope.joinSessionModalClick = function(id){
      $scope.closeConsultConfirmModal();
      $scope.goToStartConsult(id);
    };

    $scope.closeConsultConfirmModal = function(){
      OverlayService.modal.close($scope.consultConfirmModal).then(function(modal) {
        $scope.consultConfirmModal = modal;
      });
    };

    $scope.showConsultConfirmation = function(appointment){
      $scope.consult = appointment;

      OverlayService.modal.open({
        modalId: 'ConsultConfirmModal',
        templateUrl: 'templates/practitioner/consult-confirm.html',
        scope: $scope,
        animation: 'slide-in-up',
        ignoreStatusBar: false
      }).then(function(modal) {
        $scope.consultConfirmModal = modal;
      });

    };

  };

  practitionerService.checkForAgreements = function($scope){
    $scope.closeAgreementsModal = function closeAgreementsModal () {
      OverlayService.modal.close($scope.agreementsModal).then(function(modal) {
        $scope.agreementsModal = modal;
      });
    };

    $scope.checkForAgreementsModal = function checkForAgreementsModal() {

      $scope.showSignTOS = !$scope.hasSignedTOS();
      $scope.showBAA = !$scope.hasSignedBAA();

      if($scope.showSignTOS || $scope.showBAA){
        $scope.agreements = {
          medProfChecked: !$scope.showSignTOS,
          baaChecked: !$scope.showBAA
        };
        // we bootstrap the app twice when we redirect from /home to practitioner/clients
        // this creates 2 modals, so make sure we're on a practitioner page before we launch it
        var isPractitionerPage = $state.current.name.indexOf('practitioner') > -1;
        if(!$scope.agreementsModal && isPractitionerPage){

          OverlayService.modal.open({
            modalId: 'AgreementsModal',
            templateUrl: 'templates/practitioner/agreements.html',
            scope: $scope,
            animation: 'slide-in-up',
            ignoreStatusBar: false
          }).then(function(modal) {
            $scope.agreementsModal = modal;
          });

        }
      } else if($scope.agreementsModal){
        // we reload the user on success which calls this check again,
        // if the check passes, we can assume the modal is open and close it
        $scope.closeAgreementsModal();
      }
    };

    $scope.submitAgreements = function(){
      if($scope.agreements.baaChecked && $scope.agreements.medProfChecked){
        // update baa
        practitionerService.baaSigned()
        .success(function(){
          // update tos
          if(!$scope.hasSignedTOS()){
            AccountService.setUserPreference('signed_supplemental_tos', true)
            .success(function(){
              $scope.retrieveUserContext();
            });
          } else {
              $scope.retrieveUserContext();
          }
        });
      }
    };
    $scope.checkForAgreementsModal();
  };

  practitionerService.initAssessmentFunctionality = function($scope){

    $scope.closeEditAssessmentRequestModal = function closeEditAssessmentRequestModal() {
      $scope.showAssessmentConfirmation = false;
      OverlayService.modal.close($scope.editAssessmentRequestModal).then(function(modal) {
        $scope.editAssessmentRequestModal = modal;
      });
    };

    $scope.newAssessmentRequest = function(client) {

      if ($scope.isPremiumEnabled() || $scope.isViewingPersonalAccount() || (client && client.account.premium)) {

        var fiveMinAgo = new Date(new Date().getTime() - (5 * 60 * 1000));
        $scope.minDate = moment(fiveMinAgo);
        var startNow = moment();
        startNow = $scope.roundUpToNearestFiveMinutes(startNow);
        var zone = moment().tz(AccountService.getUserTimeZone()).format('z');

        if(client && $scope.clients){
          $scope.client = _.find($scope.clients, {id: client.id});
        }

        $scope.editAssessmentRequest = {
          assessmentId: 1,
          requestDate: startNow,
          intervalDays: 7,
          set: false,
          tz: zone
        };
        $scope.$watch('editAssessmentRequest.assessmentId', function(assessmentId, oldAssessmentId){
        var assessment = _.find($scope.assessments, {id: assessmentId});
          if (assessment.feeCode !== null) {
              $scope.assessmentModalInfo = true;
              $scope.assessmentModalInfoMsg = 'Note: The requested assessment will be billed to your account for ' + assessment.price;
          } else {
              $scope.assessmentModalInfo = false;
              $scope.assessmentModalInfoMsg = 'Note: The requested assessment will be billed to your account for ' + assessment.price;
          }
        });

        OverlayService.modal.open({
          modalId: 'EditAssessmentRequestModal',
          templateUrl: 'templates/practitioner/edit-assessment-request.html',
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.editAssessmentRequestModal = modal;
          $scope.assessmentModalError = false;
        });

      }
      else {
        $scope.showClinicianPremiumModal();
      }
    };

    $scope.editAssessment = function(assessmentRequest) {
      if(!$scope.editAssessmentRequestModal){
        $scope.editAssessmentRequest = angular.copy(assessmentRequest);
        var zone = moment().tz(AccountService.getUserTimeZone()).format('z');
        $scope.editAssessmentRequest.tz = zone;
        OverlayService.modal.open({
          modalId: 'EditAssessmentRequestModal',
          templateUrl: 'templates/practitioner/edit-assessment-request.html',
          scope: $scope,
          animation: 'slide-in-up',
          ignoreStatusBar: false
        }).then(function(modal) {
          $scope.editAssessmentRequestModal = modal;
        });
      }
    };

    var lookupAssessmentNameById = function(id){
      return _.find($scope.assessments, {id: id}).longName;
    };

    $scope.saveAssessmentRequest = function() {
      var force = false;
      if ( $scope.assessmentModalError === true ) {
        force = true;
      }
      if($scope.submittingAssessmentRequest){
        return;
      }
      $scope.submittingAssessmentRequest = true;
      practitionerService.requestAssessment($scope.client.account.id, $scope.editAssessmentRequest.assessmentId, $scope.editAssessmentRequest.requestDate, !!$scope.editAssessmentRequest.intervalDays, $scope.editAssessmentRequest.intervalDays, force).success(function() {
        $scope.submittingAssessmentRequest = false;
        $scope.confirmationAssessmentName = lookupAssessmentNameById($scope.editAssessmentRequest.assessmentId);
        $scope.showAssessmentConfirmation = true;
        $rootScope.$broadcast('event:assessmentsUpdated');
      }).error(function (resp) {
        $scope.submittingAssessmentRequest = false;
        $scope.assessmentModalError = true;
        $scope.assessmentModalErrorMsg = resp.message;
      });
    };

    $scope.updateAssessmentRequest = function() {
      if($scope.submittingAssessmentRequest){
        return;
      }
      $scope.submittingAssessmentRequest = true;
      practitionerService.editAssessmentRequest($scope.client.account.id, $scope.editAssessmentRequest.assessmentId, $scope.editAssessmentRequest.id, $scope.editAssessmentRequest.requestDate, !!$scope.editAssessmentRequest.intervalDays, $scope.editAssessmentRequest.intervalDays).success(function() {
        $scope.submittingAssessmentRequest = false;
        $scope.confirmationAssessmentName = lookupAssessmentNameById($scope.editAssessmentRequest.assessmentId);
        $scope.showAssessmentConfirmation = true;
        $scope.loadAssessmentRequests();
      }).error(function(resp){
        $scope.submittingAssessmentRequest = false;
      });
    };

    $scope.loadAssessments = function loadAssessments() {
      $scope.loadingAssessments = true;
      practitionerService.getAssessments()
        .success(function(data) {
          $scope.assessments = data;
          $scope.assessments.forEach(function(assessment){
            assessment.longName = $translate.instant(assessment.name) + ' (' + assessment.shortName + ')';
          });
          $scope.loadingAssessments = false;
        })
        .error(function() {
          console.log('There was an error loading assessments.');
          $scope.loadingAssessments = false;
        });
    };

  };

  practitionerService.getClientHabits = function getClientHabits(client) {
    return authHttp.get('/app/practitioner/client/' + client.clientId + '/habits');
  };

  practitionerService.saveHomeworkInternal = function saveHomeworkInternal(clientId, activityCategory, activityId, auxiliaryId, newSubGoal, reminderDate) {
    var url = '/app/practitioner/client/' + clientId + '/homework';
    var data = {
      'activityId': activityId,
      'auxiliaryId': auxiliaryId,
      'activityCategory': activityCategory,
      'newSubGoal': newSubGoal,
      'reminderDate': reminderDate
    };

    return authHttp.put(url, data);
  };

  practitionerService.getClientGoalContext = function getClientGoalContext(clientId){
    return authHttp.get('/app/practitioner/client/' + clientId + '/goalContext');
  };

  practitionerService.disableCommunities = function disableCommunities(clientId, val){
    var url = '/app/practitioner/client/' + clientId + '/disableCommunities';
    return authHttp.post(url, {"preference": "communitiesIneligible", "value": val});
  };

  practitionerService.showPractitionerDetails = function showPractitionerDetails(clinician, $scope){
    $scope.selectedPractitioner = clinician;

    $scope.openFacebookUsername = function openFacebookUsername(username) {
      GeneralService.openInAppBrowserURL("https://facebook.com/" + username);
    };
    $scope.openTwitterUsername = function openTwitterUsername(username) {
      GeneralService.openInAppBrowserURL("https://twitter.com/" + username);
    };

    $scope.closePractitionerDetailsModal = function() {
      OverlayService.modal.close($scope.therapistDetailsModal).then(function(modal) {
        $scope.therapistDetailsModal = modal;
        $scope.selectedPractitioner = undefined;
      });
    };
    $scope.isUserConnected = function(practitioner){
      return AccountService.isUserConnected(practitioner);
    };
    OverlayService.modal.open({
      modalId: 'TherapistDetailsModal',
      templateUrl: 'views/therapy/therapy.therapist-details.modal.html',
      scope: $scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false
    }).then(function(modal) {
      $scope.therapistDetailsModal = modal;
    });
  };

  return practitionerService;

}]);

var servicesModule = angular.module('relaxService', []);

servicesModule.factory('RelaxService', ['$translate', 'Environment', 'AccountService', 'HabitsService', 'GeneralService', '$state', '$timeout', 'MediaService', 'ActivityService', '$ionicHistory',

  function($translate, Environment, AccountService, HabitsService, GeneralService, $state, $timeout, MediaService, ActivityService, $ionicHistory) {

    var relaxService = {
      playOptions: {
        playAudioWhenScreenIsLocked: true
      },
      bgPlayOptions: {
        playAudioWhenScreenIsLocked: true,
        numberOfLoops: 1000
      },
      bgAudioSources: [
        'Ocean',
        'SummerNight',
        'Campfire',
        'ForestMorning',
        'Stream',
        'RooftopRain',
        'City',
        'Thunderstorm',
        'Bach',
        'Pinknoise',
        'none'
      ],

      bgAudioText: [
        "Ocean Waves",
        "Summer Night",
        "Campfire",
        "Forest Morning",
        "Stream",
        "Rooftop Rain",
        "City",
        "Thunderstorm",
        "Bach Cello Suite #1",
        "White Noise",
        "No Sound"
      ],

      categoryOrder: [
        'BASICS',
        'MINDFULNESS',
        'STRESSFUL_SITUATIONS',
        'CALM_DOWN',
        'INNER_STRENGTH'
      ],

      // This is the inhale curve.
      breathingValues: [0.007, 0.008, 0.009, 0.010, 0.011, 0.012, 0.013, 0.015, 0.016, 0.018, 0.020, 0.022, 0.024, 0.027, 0.029, 0.032, 0.036, 0.039, 0.043, 0.047, 0.052, 0.057, 0.063, 0.069, 0.076, 0.083, 0.091, 0.100, 0.109, 0.119, 0.130, 0.142, 0.154, 0.168, 0.182, 0.198, 0.214, 0.231, 0.250, 0.269, 0.289, 0.310, 0.332, 0.354, 0.378, 0.401, 0.426, 0.450, 0.475, 0.500, 0.525, 0.550, 0.574, 0.599, 0.622, 0.646, 0.668, 0.690, 0.711, 0.731, 0.750, 0.769, 0.786, 0.802, 0.818, 0.832, 0.846,
        0.858, 0.870, 0.881, 0.891, 0.900, 0.909, 0.917, 0.924, 0.931, 0.937, 0.943, 0.948, 0.953, 0.957, 0.961, 0.964, 0.968, 0.971, 0.973, 0.976, 0.978, 0.980, 0.982, 0.984, 0.985, 0.987, 0.988, 0.989, 0.990, 0.991, 0.992, 0.993, 0.993
      ],
      relaxExercises: [],
      relaxExercisesAudio: [],
      relaxExerciseLengths: [],
      relaxExerciseOldLengths: []
    };

    relaxService.breathingValueMaxIndex = relaxService.breathingValues.length - 1;

    relaxService.getExerciseObject = function(exercise) {

      for (var key in relaxService.getRelaxCategories()) {

        var relaxCategory = relaxService.getRelaxCategories()[key].exercises;

        for (var j = 0; j < relaxCategory.length; ++j) {

          var relaxExercise = relaxCategory[j];

          if (relaxExercise.exercise == exercise) {

            return relaxExercise;
          }
        }
      }
    };

    relaxService.setConfigBackStateParmas = function(params){
      relaxService.configBackStateParams = params;
    };

    relaxService.setConfigBackState = function(state){
      relaxService.configBackState = state;
    };

    relaxService.clearConfigBackState = function(){
      relaxService.configBackState = undefined;
    };

    relaxService.clearConfigBackStateParams = function(){
      relaxService.configBackStateParams = undefined;
    };

    relaxService.hasConfigBackState = function(){
      return relaxService.configBackState !== undefined;
    };

    relaxService.goToConfigBackState = function(){
      var backState = relaxService.configBackState;
      var params = relaxService.configBackStateParams;
      if(backState){
        relaxService.clearConfigBackState();
        relaxService.clearConfigBackStateParams();
        $state.go(backState, params);
      } else {
        $ionicHistory.goBack();
      }
    };


    relaxService.getExerciseObjectByAudio = function(audio) {

      for (var key in relaxService.getRelaxCategories()) {

        var relaxCategory = relaxService.getRelaxCategories()[key].exercises;

        for (var j = 0; j < relaxCategory.length; ++j) {

          var relaxExercise = relaxCategory[j];
          if (relaxExercise.audio == audio) {

            return relaxExercise;
          }
        }
      }
    };

    relaxService.getExerciseObjectByActivityId = function(activityId) {

      var relaxCategories = relaxService.getRelaxCategories();

      for (var key in relaxCategories) {

        var relaxCategory = relaxCategories[key].exercises;

        for (var j = 0; j < relaxCategory.length; ++j) {

          var relaxExercise = relaxCategory[j];
          if (relaxExercise.activity == activityId) {

            return relaxExercise;
          }
        }
      }
    };

    relaxService.initRelaxExercises = function(){
      var index = 0;
      for (var key in relaxService.getRelaxCategories()) {

        var keyList = relaxService.getRelaxCategories()[key].exercises;

        for (var i = 0; i < keyList.length; ++i) {

          var relaxItem = keyList[i];

          relaxService.relaxExercises[index] = relaxItem.exercise;
          relaxService.relaxExercisesAudio[index] = relaxItem.audio;
          relaxService.relaxExerciseLengths[index] = relaxItem.audioLength;
          relaxService.relaxExerciseOldLengths[index] = relaxItem.oldAudioLength ? relaxItem.oldAudioLength : null;

          ++index;
        }
      }
    };

    relaxService.initializeBackgroundAudio = function($scope, bgAudioStatus) {

      if ($scope.bgAudioSource != 'none') {

        var actualSource = $scope.bgAudioSource;
        if (Environment.isAndroid()) {

          actualSource += '.ogg';
        } else {

          actualSource += '.aifc';
        }

        $scope.bgAudio = MediaService.loadMedia('img/background-sounds/' + actualSource, 'bgAudio', bgAudioStatus);

        MediaService.setVolume($scope.bgAudio, 0);

        // Wrapped to use as a ngModel
        $scope.volumeData = {
          bgVolume: 0.2
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

          if ($scope.started && $scope.bgAudio)
            MediaService.setVolume($scope.bgAudio, $scope.volumeData.bgVolume);
        };

        $scope.initializeVolumeValue = function initializeVolumeValue() {
          // Angular doesn't set the initial value of range elements, but it does set the value property after a change is detected.
          // This tricks Angular into setting the initial value by creating a change in the model.
          var actualVolume = $scope.volumeData.bgVolume;
          $scope.volumeData.bgVolume = 0.0;
          $timeout(function() {
            $scope.$apply(function() {
              $scope.volumeData.bgVolume = actualVolume;
            });
          }, 1);
        };

      }
    };

    // Percentage is a value from 0-1
    relaxService.getBreathingValue = function(percentage) {

      if (percentage > 1)
        percentage = 1;
      else if (percentage < 0)
        percentage = 0;

      var val = relaxService.breathingValues[Math.floor(percentage * relaxService.breathingValueMaxIndex)];

      return val;
    };

    relaxService.replaceExerciseCharacters = function(exercise) {

      return exercise.replace(/ /g, '_').replace(/\+/g, '').replace(/-/g, '').replace(/:/g, '').replace(/__/g, '_');
    };

    relaxService.getRelaxCategories = function getRelaxCategories() {
      var relaxActivities = _.filter(ActivityService.activities, function(a) { return a.type === 'relax';});
      return {
        'BASICS': {
          descriptionKey: 'RELAX_BASICS_DESC',
          exercises: _.filter(relaxActivities, function(a) { return a.relaxCategory === 'BASICS';})
        },
        'CALM_DOWN': {
          descriptionKey: 'RELAX_CALM_DOWN_DESC',
          exercises: _.filter(relaxActivities, function(a) { return a.relaxCategory === 'CALM_DOWN';})
        },
        'STRESSFUL_SITUATIONS': {
          descriptionKey: 'RELAX_STRESSFUL_SITUATIONS_DESC',
          exercises: _.filter(relaxActivities, function(a) { return a.relaxCategory === 'STRESSFUL_SITUATIONS';})
        },
        'MINDFULNESS': {
          descriptionKey: 'RELAX_MINDFULNESS_DESC',
          exercises: _.filter(relaxActivities, function(a) { return a.relaxCategory === 'MINDFULNESS';})
        },
        'INNER_STRENGTH': {
          descriptionKey: 'RELAX_INNER_STRENGTH_DESC',
          exercises: _.filter(relaxActivities, function(a) { return a.relaxCategory === 'INNER_STRENGTH';})
        }
      };
    };

    relaxService.getRelaxExerciseDisplay = function(item) {

      var key = 'RELAX_ACTIVITY_' + item;
      key = relaxService.replaceExerciseCharacters(key).toUpperCase();

      var text = $translate.instant(key);

      return text;
    };

    relaxService.getBreathingDuration = function() {

      var cyclePref = AccountService.getUserPreference('breathe_cycle_length');
      if (!cyclePref)
        cyclePref = 8;
      else
        cyclePref = +cyclePref;

      // This "8" is the number of cycles. That should get passed in.
      return 8 * cyclePref;
    };

    relaxService.getMeditationDuration = function() {

      var lengthPref = AccountService.getUserPreference('meditation_length');
      if (!lengthPref)
        lengthPref = 10;
      else
        lengthPref = +lengthPref;

      return lengthPref * 60;
    };

    relaxService.getExerciseTimeDisplay = function(item) {

      var index = relaxService.relaxExercises.indexOf(item);

      var length = relaxService.relaxExerciseLengths[index];

      if (length > 0) {
        return GeneralService.getTimeDisplay(length, true, true);
      } else if (item == 'Deep Breathing' || item == 'Visualization') {

        var totalLength = relaxService.getBreathingDuration();

        return GeneralService.getTimeDisplay(totalLength, true, true);
      } else if (item == 'Soundscape Mode') {

        var meditationLength = relaxService.getMeditationDuration();

        return GeneralService.getTimeDisplay(meditationLength, true, true);
      }

      return '';
    };

    relaxService.getExerciseMinuteDisplay = function(exercise) {

      var length;

      var obj = relaxService.getExerciseObject(exercise);

      if (obj.exercise == 'Deep Breathing' || obj.exercise == 'Visualization') {

        length = relaxService.getBreathingDuration();
      } else if (obj.exercise == 'Soundscape Mode') {

        length = relaxService.getMeditationDuration();
      } else {
        length = obj.audioLength;
      }

      if (length > 0) {

        length = Math.round(length / 60);

        return length + ' ' + (length > 1 ? $translate.instant('HABITS_VALUES_MINUTES') : $translate.instant('HABITS_VALUES_MINUTE'));
      }

      return '';
    };

    relaxService.getRelaxExerciseDescription = function(item) {

      var key = 'RELAX_ACTIVITY_' + item + "_DESCRIPTION";
      key = relaxService.replaceExerciseCharacters(key).toUpperCase();

      var text = $translate.instant(key);

      return text;
    };

    relaxService.initializeBreatheParams = function($scope) {

      $scope.bgAudioSources = relaxService.bgAudioSources;

      // Adapt the preferences to a spinner. Needs to be in an object to work in angular.
      $scope.soundOptions = {
        options: relaxService.bgAudioText,
        soundOptionOrdinal: 0
      };

      $scope.cycleOptions = {
        options: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        cycleOptionOrdinal: 1
      };

      $scope.lengthOptions = {
        options: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        lengthOptionOrdinal: 1
      };

      $scope.breathingOptions = {
        options: [true, false],
        breathingOptionOrdinal: 0
      };

      $scope.continueOptions = {
        options: [
          'Return',
          'Continue Sounds'
        ],
        continueOptionOrdinal: 0
      };

      $scope.bellOptions = {
        options: [
          true,
          false
        ],
        bellOptionOrdinal: 0
      };
      $scope.enableMeditationMode = false;

      $scope.affirmationOptions = {
        // Note that these relate to the filenames, not the actual displayed wording.
        options: [
          "Record my own",
          "I am calm",
          "I am strong",
          "I am",
          "I believe in myself",
          "I can accomplish anything",
          "I can handle whatever comes my way",
          "I love myself",
          "This too shall pass"
        ],
        affirmationOptionOrdinal: 0
      };

      var bgAudioPref = AccountService.getUserPreference('bg_audio_src');
      if (bgAudioPref) {
        var index = $scope.bgAudioSources.indexOf(bgAudioPref);

        if (index >= 0) {
          $scope.soundOptions.soundOptionOrdinal = $scope.bgAudioSources.indexOf(bgAudioPref);
        }
      }

      $scope.bgAudioSource = $scope.bgAudioSources[$scope.soundOptions.soundOptionOrdinal];

      // Pull out the cycle preference.
      var cyclePref = AccountService.getUserPreference('breathe_cycle_length');
      if (cyclePref)
        $scope.cycleLength = parseInt(cyclePref);
      else
        $scope.cycleLength = 8;

      $scope.cycleOptions.cycleOptionOrdinal = $scope.cycleOptions.options.indexOf($scope.cycleLength);


      var lengthPref = AccountService.getUserPreference('meditation_length');
      if (lengthPref)
        $scope.meditationLength = parseInt(lengthPref);
      else
        $scope.meditationLength = 10;

      $scope.lengthOptions.lengthOptionOrdinal = $scope.lengthOptions.options.indexOf($scope.meditationLength);

      var breathingPref = AccountService.getUserPreference('disable_breathing_sounds');
      if (breathingPref)
        $scope.breathingSoundsOn = breathingPref == 'false'; // This is reversed.
      else
        $scope.breathingSoundsOn = true;

      $scope.breathingOptions.breathingOptionOrdinal = $scope.breathingOptions.options.indexOf($scope.breathingSoundsOn);

      var enableMeditationMode = AccountService.getUserPreference('enable_meditation_mode');

      if (enableMeditationMode) {

        if (enableMeditationMode == 'true') {
          $scope.continueOptions.continueOptionOrdinal = 1;
          $scope.enableMeditationMode = true;
        }
      }

      var playBell = AccountService.getUserPreference('meditation_bell');
      if (playBell == 'false') {
        $scope.playBell = false;
        $scope.bellOptions.bellOptionOrdinal = 1;
      } else {
        $scope.playBell = true;
        $scope.bellOptions.bellOptionOrdinal = 0;
      }

      var affirmation = AccountService.getUserPreference('affirmation');

      if(affirmation){
        $scope.affirmationOptions.affirmationOptionOrdinal = $scope.affirmationOptions.options.indexOf(affirmation);
        $scope.affirmation = affirmation;
      } else {
        $scope.affirmation = $scope.affirmationOptions.options[$scope.affirmationOptions.affirmationOptionOrdinal];
      }
    };

  return relaxService;
}]);

var servicesModule = angular.module('settingsService', []);

servicesModule.factory('SettingsService', ['StorageService', function(StorageService) {

  var settingsService = {
    settings: {},
    enableAllSettings: false  // For development only: set to true to bypass the backend and enable all settings locally
  };

  settingsService.initFromLocalStorage = function() {

    return StorageService.getItemAsync("settings").then(function(settings) {

      if (settings && settings !== "undefined") {
        var settingsObj = JSON.parse(settings);
        settingsService.settings = settingsObj;
      }

    });

  };

  settingsService.setSettingsContext = function(settings) {
    settingsService.settings = settings;
    updateLocalSettings();
  };

  settingsService.isEnabled = function(settingKey) {

    // For local development: bypass the backend and enable all settings for easier testing
    var settingsOverrideEnabled = settingsService.enableAllSettings === true;
    var isDevEnvironment = window.PACIFICA_DEV_SETTINGS.development === true;
    if (settingsOverrideEnabled && isDevEnvironment)
      return true;

    if (!settingKey || !settingsService.settings)
      return false;

    var isSettingDefined = settingsService.settings.hasOwnProperty(settingKey);
    var isSettingEnabled = false;  // default to false, override if we determine otherwise

    try {

      if (isSettingDefined && (settingsService.settings[settingKey] === true || settingsService.settings[settingKey] === 'true'))
        isSettingEnabled = true;

    } catch (error) {

      console.log('Failed to determine if setting is enabled, defaulting to false', settingKey, settingsService.settings[settingKey], error);

    }

    return isSettingEnabled;

  };


  function updateLocalSettings() {

    StorageService.setItem("settings", JSON.stringify(settingsService.settings));
  }

  return settingsService;

}]);


var servicesModule = angular.module('skillsService', []);

servicesModule.factory('SkillsService', ['$translate', '$timeout', 'authHttp', 'Environment', 'AccountService', 'HabitsService', 'GoalsService', 'StorageService', '$state', 'ActivityService',

  function($translate, $timeout, authHttp, Environment, AccountService, HabitsService, GoalsService, StorageService, $state, ActivityService) {

    var skillsService = {

      skillContext: undefined,

      todaysActions: [],
      todaysActionDate: new Date(),

      suggestedActivityId: null,
    };

    skillsService.initFromLocalStorage = function(){
      // Pull any information from local storage if it is there. This
      // will be a single string with name/value pairs.
      return StorageService.getItemAsync('skillContext')
        .then(function(skillContextStr) {
          if (skillContextStr) {
            var skillContext = JSON.parse(skillContextStr);
            skillsService.skillContext = skillContext;
          }
        });
    };

    function updateLocalSkillContext() {

      if (skillsService.skillContext) {

        StorageService.setItem("skillContext", JSON.stringify(skillsService.skillContext));
      }
    }

    skillsService.logout = function logout() {

      skillsService.skillContext = undefined;

      skillsService.todaysActions = [];
      skillsService.todaysActionDate = new Date();

      skillsService.suggestedActivityId = null;
    };

    // For moving around to other views.
    skillsService.getSuggestedActivityId = function getSuggestedActivityId() {

      return skillsService.suggestedActivityId;
    };

    skillsService.unsetSuggestedActivityId = function unsetSuggestedActivityId(){
      // we use this on completing relax to remove highlight
      skillsService.suggestedActivityId = null;
    };

    skillsService.setSuggestedActivityId = function setSuggestedActivityId(id) {

      skillsService.suggestedActivityId = id;
    };

    skillsService.getLastMoodRatingObj = function getLastMoodRatingObj(){
      var lastMoodRating;
      var filterList = _.filter(skillsService.todaysActions, function(action) {
        return action.actionClass == 'mood';
      });
      return filterList.length ? filterList[0] : false;
    };

    skillsService.getTodaysActions = function getTodaysActions() {

      return skillsService.todaysActions;
    };

    skillsService.completedDailyActivity = function(){

        var completedActivity = _.find(skillsService.todaysActions, function(activity){
          return activity.actionClass != 'mood';
        });
        return completedActivity;
    };

    skillsService.getTodaysLastMoodEntryTime = function(){
      var moodRatings = _.sortBy(_.filter(skillsService.todaysActions, {actionClass: 'mood'}), 'actionTimestamp');
      if(!moodRatings.length)
        return null;
      var lastRatingTimestamp = moment(moodRatings[moodRatings.length - 1].actionTimestamp);
      return lastRatingTimestamp;
    };

    skillsService.isDayCompleted = function(){
      // has user rated mood & completed activity
      completedDaily = skillsService.completedDailyActivity();
      todaysLastMoodEntry = skillsService.getTodaysLastMoodEntryTime();
      return completedDaily !== undefined && todaysLastMoodEntry !== null;
    };

    skillsService.setSkillContext = function setSkillContext(ctx) {
      // The account service needs to have the user data here, but as long
      // as this is called later it will.
      var ret = checkForLevelUpInternal(ctx);

      skillsService.skillContext = ctx;

      updateLocalSkillContext();

      return ret;
    };

    skillsService.getSkillLevel = function getSkillLevel(category) {

      var ctx = skillsService.skillContext;
      if (!ctx)
        return 0;

      if (category == 'goals')
        return ctx.goalsLevel;
      else if (category == 'health')
        return ctx.habitsLevel;
      else if (category == 'relax')
        return ctx.relaxLevel;
      else if (category == 'thoughts')
        return ctx.thoughtsLevel;
      else if (category == 'hope')
        return ctx.hopeLevel;

      return 0;
    };

    function addHabitSkillData(habit, habitData, requireGoalMet, list) {

      if (!requireGoalMet || HabitsService.metGoalWithHabitData(habitData)) {

        var skillData = {
          actionClass: 'health',
          skillSubClass: habit.name.toLowerCase(),
          actionTitle: HabitsService.getHabitName(habit),
          actionTimestamp: habitData.experiencedAt,
          data: habitData
        };

        var habitValue;
        if (habit.id == HabitsService.MOOD_HABIT_ID) {

          habitValue = HabitsService.getHabitValueById(habitData.habitValueId);

          skillData.actionClass = habit.name.toLowerCase();
          skillData.skillSubClass = HabitsService.getMoodClass(habitValue);
          skillData.actionTitle = HabitsService.getHabitDisplayById(habit, habitData.habitValueId);
        } else if (habit.id == HabitsService.STRESS_HABIT_ID) {

          habitValue = HabitsService.getHabitValueById(habitData.habitValueId);

          skillData.actionClass = habit.name.toLowerCase();
          skillData.skillSubClass = HabitsService.getStressClass(habitValue);
          skillData.actionTitle = HabitsService.getHabitDisplayById(habit, habitData.habitValueId);
        }

        list.push(skillData);
      }
    }

    function addActivitySkillData(activityData, activityDate, activityType, list) {

      list.push({

        actionClass: activityType.actionClass,
        actionTitle: activityType.actionTitle,
        actionTimestamp: activityDate,
        data: activityData
      });
    }

    function finalizeSkillData(list) {

      // Make sure they're all dates.
      for (var y = 0; y < list.length; ++y) {

        var actionForDate = list[y];

        actionForDate.actionTimestamp = new Date(actionForDate.actionTimestamp);
      }

      list.sort(function(a, b) {

        return b.actionTimestamp - a.actionTimestamp;
      });

      var moodHasAction = false;

      for (var z = 0; z < list.length; ++z) {

        var action = list[z];

        // Only show the action button for the first action.

        if (action.actionClass == 'mood') {

          if (z === 0) {
            action.showActionButton = true;
          }

          if (moodHasAction) {
            action.moodRespondedTo = true;
          }

          moodHasAction = false;
        } else {

          // Just keep track of whether or not there are actions that were done after the mood rating.
          moodHasAction = true;
        }
      }
    }

    skillsService.createActionsWithData = function createActionsWithData(habitDataList, activityDataList) {

      var newActions = [];

      if (habitDataList) {

        for (var i = 0; i < habitDataList.length; ++i) {

          var habitData = habitDataList[i];
          var habitValue = HabitsService.getHabitValueById(habitData.habitValueId);
          var habit = HabitsService.getAccountHabitById(habitValue.habitId);

          addHabitSkillData(habit, habitData, false, newActions);
        }
      }

      var activityTypes = getActivityTypes(true);

      if (activityDataList) {

        for (var j = 0; j < activityDataList.length; ++j) {

          var activityData = activityDataList[j];
          var activityType = activityTypes[activityData.activityName];

          // Make sure we know about it (future versions could create new activities).
          if (activityType)
            addActivitySkillData(activityData, activityData.date, activityType, newActions);
        }
      }

      finalizeSkillData(newActions);

      return newActions;
    };

    /**
     * @returns An object with getTodaysActions property for easy chaining.
     */
    skillsService.recreateTodaysActions = function recreateTodaysActions() {

      var today = new Date();

      skillsService.todaysActions = [];
      skillsService.todaysActionDate = today;

      function addHabits() {
        var accountHabits = HabitsService.getAccountHabits();
        for (var i = 0; i < accountHabits.length; ++i) {

          var habit = accountHabits[i];
          var habitDataList = HabitsService.getHabitDataList(habit, today);

          if (habitDataList) {

            for (var k = 0; k < habitDataList.length; ++k) {

              var habitData = habitDataList[k];

              addHabitSkillData(habit, habitData, false, skillsService.todaysActions);
            }
          }
        }
      }

      function addGoals() {
        var goals = GoalsService.getTodaysAchievedGoals();
        if (goals) {

          for (var j = 0; j < goals.length; ++j) {

            var goal = goals[j];

            skillsService.todaysActions.push({
              actionClass: 'goals',
              actionTitle: goal.title,
              actionTimestamp: goal.achievedRecordedAt
            });
          }
        }
      }

      function addActivities() {
        var activityTypes = getActivityTypes(false);

        for (var activityId in activityTypes) {

          var activityType = activityTypes[activityId];
          var activities =  ActivityService.getActivities(activityType.name);

          if (activities) {

            for (var l = 0; l < activities.length; ++l) {

              var activity = activities[l];

              addActivitySkillData(activity, activity.recordedAt, activityType, skillsService.todaysActions);
            }
          }
        }
      }

      addHabits();
      addGoals();
      addActivities();

      finalizeSkillData(skillsService.todaysActions);

      // Makes sense to return getTodaysActions for easy chaining because the 
      // call order of this function and getTodaysActions matters.
      return {
        getTodaysActions: skillsService.getTodaysActions
      };
    };

    function getActivityTypes(includeGoalActivity) {

      var skillActivities = _.chain(ActivityService.activities)
                             .filter(function(a) { return a.isSkillActivity; })
                             .map(function(a) {
                               a.activityName = $translate.instant(a.actionTitle);
                               return a;
                             })
                             .keyBy('name')  // transform the list to an object using the name property
                             .value();

      if (includeGoalActivity) {

        skillActivities.COMPLETED_EXPERIMENT = {
          activityName: 'COMPLETED_EXPERIMENT',
          actionClass: 'goals',
          actionTitle: $translate.instant('COMPLETED_GOAL')
        };
      }

      return skillActivities;
    }

    function checkForLevelUpInternal(newCtx) {

      var oldCtx = skillsService.skillContext;

      var newLevels = [];

      if (newCtx && oldCtx) {

        // Add 1 because we're using 1-indexed levels for display but 0-indexed for storage.

        if (newCtx.goalsLevel > oldCtx.goalsLevel) {

          newLevels.push({
            type: 'goals',
            level: newCtx.goalsLevel
          });
        }

        if (newCtx.habitsLevel > oldCtx.habitsLevel) {

          newLevels.push({
            type: 'habits',
            level: newCtx.habitsLevel
          });
        }

        if (newCtx.relaxLevel > oldCtx.relaxLevel) {

          newLevels.push({
            type: 'relax',
            level: newCtx.relaxLevel
          });
        }

        if (newCtx.hopeLevel > oldCtx.hopeLevel) {

          newLevels.push({
            type: 'hope',
            level: newCtx.hopeLevel
          });
        }

        if (newCtx.thoughtsLevel > oldCtx.thoughtsLevel) {

          newLevels.push({
            type: 'thoughts',
            level: newCtx.thoughtsLevel
          });
        }
      }

      return newLevels.length;
    }

    skillsService.checkForLevelUp = function checkForLevelUp(successCallback, errorCallback) {

      getSkillContext()
        .success(function(ctx) {

          var newLevels = skillsService.setSkillContext(ctx);

          if (successCallback)
            successCallback(newLevels);
        })
        .error(function() {

          if (errorCallback)
            errorCallback();
        });
    };

    function getSkillContext() {

      var ret = createPromise();

      if (Environment.isOnline()) {

        authHttp.get(Environment.serverURL + '/skills/context')
          .success(function(ctx) {

            if (ret.successCallback)
              ret.successCallback(ctx);
          })
          .error(function() {

            if (ret.errorCallback)
              ret.errorCallback();
          });
      } else {

        // For the promise in offline mode.
        $timeout(function() {

          if (ret.successCallback)
            ret.successCallback(skillsService.skillContext);
        });
      }

      return ret;
    }

    return skillsService;
  }
]);

var servicesModule = angular.module('storageService', []);

// var oldParse = JSON.parse;

// JSON.parse = function newParse(str) {

//   if (console)
//     console.log('PARSING: ' + str);
//   var res = oldParse(str);

//   if (console)
//     console.log('PARSED : ' + str);

//   alert (str);
//   return res;
// } 

// Notes: Android users will need to use PIN locking on their device in order
// for secure storage to work. This should be fine, as it is required anyway.
servicesModule.factory('StorageService', ['$q', 'Environment', '$rootScope', '$cordovaNativeStorage',
  function($q, Environment, $rootScope, $cordovaNativeStorage) {

  var initialized = false;

  var storageService = {
    initComplete: false,

    canEncrpyt: false,

    secureStorage: undefined,

    // The list of keys that have been stored.
    keys: {},
    initKeys: []
  };

  // Fallback for local storage. DEBUGGING ONLY.
  function retrieveFromLocalStorage(key, callback) {
    checkInit(key);

    var value = localStorage.getItem(key);
    value = decompressItem(value);

    retrievedKey(key);
    callback(value);
  }

  /**
   * An async, promise-based, version of `retrieveFromLocalStorage`.
   */
  function getAsync(key) {
    var q = $q.defer();
    checkInit(key);

    var value = localStorage.getItem(key);
    value = decompressItem(value);

    q.resolve(value);
    retrievedKey(key);

    return q.promise;
  }

  function storeInLocalStorage(key, value) {

    localStorage.setItem(key, value);
  }

  function removeFromLocalStorage(key) {

    localStorage.removeItem(key);
  }

  function checkCompleteInit(){
    if(!storageService.initComplete && !storageService.trackingInit && (storageService.initKeys.length == 0)){
      storageService.initComplete = true;
      $rootScope.$broadcast('event:initializedFromStorage');
    }
  }

  function retrievedKey(key){
    if (storageService.initKeys.indexOf(key) >= 0) {
      storageService.initKeys.splice(storageService.initKeys.indexOf(key), 1);
    }
    checkCompleteInit();
  }

  function checkInit(key){
    if(storageService.trackingInit && storageService.initKeys.indexOf(key) == -1){
      storageService.initKeys.push(key);
    }
  }


  storageService.isInitComplete = function(){
    return storageService.initComplete;
  };

  storageService.setFirstRun = function(){
    $cordovaNativeStorage.setItem("firstRun", "true").then(function (value) {
      return true;
    }, function (error) {
      console.log('error setting first run');
      console.log(error);
    });
  };

  storageService.checkForFirstRun = function(foundCallback, notFoundCallback){
    $cordovaNativeStorage.getItem("firstRun").then(function (value) {
      foundCallback();
    }, function(){
      notFoundCallback();
    });    
  };

  storageService.trackInit = function(){
    storageService.trackingInit = true;
  };

  storageService.stopTracking = function(){
    storageService.trackingInit = false;
    checkCompleteInit();
  };

  function stripChars(value){
    // iOS throws EOF error when trying to pull these values out of storage, so strip them on set item
    if(!value || typeof value !== 'string')
      return value;
    var regex1 = /\u2028/g; 
    var regex2 = /\u2029/g;
    var retVal = value.replace(regex1, " ");
    return retVal.replace(regex2, " ");
  }

  storageService.storeInsecureItem = function (key, value) {
    var val = stripChars(value);
    storeInLocalStorage(key, val);
  };

  storageService.getInsecureItem = function(key, callback){
    retrieveFromLocalStorage(key, callback);
  };

  /**
   * Async version of `getInsecureItem`.
   */
  storageService.getInsecureItemAsync = function(key){
    return getAsync(key);
  };

  storageService.clear = function clear() {

    if (Environment.isStorageAllowed()) {

      if (initialized) {

        if (storageService.canEncrpyt) {

          storageService.secureStorage.clear(
            function(){
              console.log('Secure storage cleared.');
            },
            function() {
              console.log('Failed to clear secure storage');
            }
          );


        } else {

          localStorage.clear();
        }
      } else {

        console.log("Cannot clear, Storage has not been initialized.");
      }
    }
  };

  function compressItem(value) {

    // iOS versions less than 12 seem to have a bug in their evaluateJavascript WebView implementation that does not know how
    // to escape strings. The compression algorithm here seems to generate repeating slashes in all cases (maybe to delinieate
    // a dictionary or something in the string), causing it to break for everyone. The issue does not exixt in iOS 12, and we
    // have not seen it on Android. The compression is mainly used to fix a prevalent issue on Android, so remains in place
    // for all Android devices.
    if (Environment.isAndroid() || 
        (Environment.isIos() && Environment.getDeviceMajorVersion() >= 12)) {
      // We indicate that the data has been compressed by appending a header: 'lz;'
      return 'lz;' + LZString.compressToUTF16(stripChars(value));
    }

    return stripChars(value);
  }

  function decompressItem(value) {
    // Check to see if the data has been compressed.
    if (value && (value.indexOf('lz;') === 0)) {
      value = LZString.decompressFromUTF16(value.substring(3));
    }

    return value;
  }

  storageService.getItem = function getItem(key, callback, failureCallback, options) {

    if (Environment.isStorageAllowed()) {

      if (initialized) {

        if (storageService.canEncrpyt) {

          checkInit(key);

          storageService.secureStorage.get(
            function(value) {
              
              value = decompressItem(value);

              retrievedKey(key);
              callback(value);
            },
            function(error) {
              console.log('StorageService Error Retrieving [' + key + ']:' + error);

              var recordRetrieval = true;
              if (options && options.preventRetrievalFailureRecording)
                recordRetrieval = false;

              if (recordRetrieval)
                retrievedKey(key);

              if (failureCallback)
                failureCallback(error);
            },
            key);
        } else {

          retrieveFromLocalStorage(key, callback);
        }
      } else {

        console.log("Cannot retrieve item [" + key + "]. Storage has not been initialized.");

        // We don't even call teh callback here...
      }
    }

    // Otherwise we're just dropping it on the floor.
  };

  /**
   * Async version of `getItemAsync`.
   */
  storageService.getItemAsync = function(key, options) {
    var q = $q.defer();

    if (Environment.isStorageAllowed()) {
      if (initialized) {
        if (storageService.canEncrpyt) {
          checkInit(key);

          storageService.secureStorage.get(
            function(value) {

              value = decompressItem(value);

              retrievedKey(key);
              q.resolve(value);
            },
            function(error) {
              console.log('StorageService Error Retrieving [' + key + ']:' + error);

              var recordRetrieval = true;
              if (options && options.preventRetrievalFailureRecording) {
                recordRetrieval = false;
              }
              
              if (recordRetrieval) {
                retrievedKey(key);
              }

              q.reject(error);
            },
            key);
        } else {
          return getAsync(key);
        }
      } else {
        q.reject();
      }
    } else {
      q.reject();
    }

    return q.promise;
  };

  storageService.setItem = function setItem(key, value, callback) {
    if (Environment.isStorageAllowed()) {

      console.log('StorageService setting [' + key + ']');

      if (initialized) {

        var val = compressItem(value);

        if (storageService.canEncrpyt) {

          storageService.secureStorage.set(
            function(key) {
              // Nothing to do

              storageService.keys[key] = key;

              if (callback)
                callback(key);
            },
            function(error) {
              console.log('StorageService Error Setting [' + key + ']: ' + error);
            },
            key,
            val);
        } else {

          storeInLocalStorage(key, val);
        }

      } else {

        console.log("Cannot set item [" + key + "]. Storage has not been initialized.");
      }
    }
  };

  storageService.removeItem = function removeItem(key) {

    if (Environment.isStorageAllowed()) {

      console.log('StorageService removing [' + key + ']');

      // var err = new Error();
      // console.log(err.stack);

      if (initialized) {

        if (storageService.canEncrpyt) {

          storageService.secureStorage.remove(
            function(key) {
              // Nothing to do
            },
            function(error) {
              console.log('StorageService Error, ' + error, key);
            },
            key
          );

        } else {

          removeFromLocalStorage(key);
        }
      }
    } else {

      // Ignoring this call when storage is not supported.
    }
  };

  storageService.isKeyguardSecure = function isKeyguardSecure(success, failure) {

    if (Environment.isWeb() || Environment.isWebDebug()) {

      success(true);
    } else if (storageService.secureStorage) {

      storageService.secureStorage.isKeyguardSecure(success, failure);
    } else {
      failure();
    }
  };

  // Called from app.js when the platform is ready.
  storageService.initialize = function initialize(callback) {

    if (initialized)
      return;

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.SecureStorage) {

      storageService.secureStorage = new cordova.plugins.SecureStorage( 

      function success() {

        if (Environment.isAndroid()) {

          // Some old android phones are not capable of using secure storage.
          storageService.isKeyguardSecure(function(secure) {

            initialized = true;

            if (secure) {

              storageService.canEncrpyt = true;

            } else {

              storageService.canEncrpyt = false;
              console.log("WARNING: StorageService is not encrypting data.");
            }

            console.log('Created SecureStorage');

            if (callback)
              callback();

          }, function (e) {
            console.log("There was an error determining if the keyguard was secure:" + e);
          });
        } else {

          initialized = true;
          storageService.canEncrpyt = true;

          console.log('Created SecureStorage');

          if (callback)
            callback();
        }
      }, 
      function failure(error) {

        initialized = true;
        storageService.canEncrpyt = false;

        if (callback)
          callback();

        console.log("The SecureStorage plugin could not be inititalized: " + error);
      },
      'pacifica');

    } else {
      initialized = true;

      console.log("WARNING: SecureStorage is not available on this platform.");

      if (callback)
        callback();
    }
  };

  storageService.onceInitialized = function onceInitialized(fn) {
    if (!storageService.isInitComplete()) {
      once($rootScope, 'event:initializedFromStorage', fn);  // from helpers.js
    } else {
      fn();
    }
  };
  return storageService;

}]);

var servicesModule = angular.module('thoughtsService', []);

servicesModule.factory('ThoughtsService', ['$ionicHistory', '$state', '$translate', 'Environment', 'ActivityService', 'OverlayService',

  function($ionicHistory, $state, $translate, Environment, ActivityService, OverlayService) {

    var thoughtsService = {
      recordingId: 0,
      mediaCache: {},

    };

    thoughtsService.getThoughtActivities = function getThoughtActivities(){
      return ActivityService.thoughtActivities;
    };

    thoughtsService.getThoughtType = function getThoughtType(thought) {
      var thoughtType;
      if (thought.thoughtType == 'TEXT_DISTORTIONS' || thought.thoughtType == 'AUDIO_DISTORTIONS')
        thoughtType = 'REFRAME';
      else if (thought.thoughtType == 'AUDIO_JOURNAL' || thought.thoughtType == 'TEXT_JOURNAL')
        thoughtType = 'JOURNAL';
      else
        thoughtType = thought.thoughtType;

      thoughtType = thoughtType.toLowerCase();

      return thoughtType;
    };

    thoughtsService.getActivityByConstantName = function getActivityByConstantName(name){
      // this takes the name field from a thought 'COMPLETED_RETHINK'
      return ActivityService.activities[name];
    };

    thoughtsService.getActivityByName = function getActivityByName(activityName) {
      // this takes 'evidence', 'belief', etc
      if(activityName == 'gratitude-journal')
        activityName = 'gratitude';
      var activities = thoughtsService.getThoughtActivities();
      return activities[activityName];
    };

    function displayMicError(alwaysDenied) {

      // instruct how to enable your app's access to the microphone
      OverlayService.popup.alert({
        title: '',
        template: '<div>' + (alwaysDenied ? $translate.instant('THOUGHTS_MIC_ACCESS_PROMPT_SETTINGS') : $translate.instant('THOUGHTS_MIC_ACCESS_PROMPT')) + '</div>',
        okText: $translate.instant('OK_GOT_IT'),
        okType: 'button-default'
      })
      .then(function() {

        if ($state.current.name == 'app.rethink-record' ||
          $state.current.name == 'app.breathe-record' ||
          $state.current.name == 'app.muscles-record')
          $ionicHistory.goBack();
      });
    }

    thoughtsService.checkMicAccess = function checkMicAccess() {

      if (cordova.plugins.diagnostic) {

        cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status) {

          if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
            console.log("Microphone use is authorized");
          } else if (status === cordova.plugins.diagnostic.permissionStatus.DENIED ||
            status === cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED) {

            cordova.plugins.diagnostic.requestMicrophoneAuthorization(
              function success(newstatus) {

                if (newstatus !== cordova.plugins.diagnostic.permissionStatus.GRANTED) {

                  displayMicError((newstatus === cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS));
                }
              },
              function error() {

                displayMicError(false);
              }
            );
          } else if (status === cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS) {

            displayMicError(true);
          }
        }, function(error) {

          displayMicError(false);
        });
      }
    };

    thoughtsService.getRecordingTagDisplay = function getRecordingTagDisplay(tagStrings, tagTypeString) {

      var result = '';

      if (tagStrings.indexOf('catastrophizing') >= 0) {
        result += $translate.instant('THOUGHTS_EMOTIONS_CATASTROPHIZING');
      }

      if (tagStrings.indexOf('black_and_white') >= 0) {

        if (result.length > 0)
          result += ', ';

        result += $translate.instant('THOUGHTS_EMOTIONS_BLACK_WHITE');
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
    };

    thoughtsService.getRecordingId = function getRecordingId(){
      return thoughtsService.recordingId;
    };

    thoughtsService.incrementRecordingId = function incrementRecordingId(){
      thoughtsService.recordingId++;
    };


    thoughtsService.loadFile = function loadFile(src, callback) {
      function onFileSystemSuccess(fileSystem) {

        // Need to create file to record to it.
        fileSystem.root.getFile(src, {
            create: true,
            exclusive: false
          },
          function onGetSucceed(fileEntry) {
            callback(fileEntry);
          },
          function onGetFail() {
            console.log("did not get file.");
          });
      }

      function fail() {
        console.log("failed getting filesystem");
      }

      if (window.LocalFileSystem)
        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, fail);
    };

    // We are going to use this to cache media when moving between different views.
    // We need to keep the Media object alive or we can't append a recording to it.

    thoughtsService.loadMedia = function loadMedia(src, scope, statusCallback) {

      if (thoughtsService.mediaCache[src]) {
        scope.mediaRec = thoughtsService.mediaCache[src];

        scope.elapsedTime = scope.mediaRec.__elapsedTime;
        if (!scope.elapsedTime)
          scope.elapsedTime = 0;

      } else {
        // Doing it this way seems to get around an issue with the file not being
        // available at the localhost/temporary location right away.
        var createMedia = function createMedia(filePath) {

          console.log("Creating media: " + filePath);

          // Note that we're intentionally not using the MediaService here. Recording
          // needs to go to a specific location.
          scope.mediaRec = new Media(filePath,
            // success callback
            function(data) {
              console.log("Created media: " + filePath);
            },

            // error callback
            function(err) {
              console.log("Could not create media [" + filePath + "] " + err.code + ", " + err.message);
            },

            statusCallback);

          // Not sure if this will help the visualize stuff.
          scope.mediaRec.setVolume(1);

          // We only store a single object in the cache at a time, so delete anything
          // else that is there.
          thoughtsService.clearMediaCache();

          thoughtsService.mediaCache[src] = scope.mediaRec;
        };

        thoughtsService.loadFile(src, function(fileEntry) {


          if (Environment.isAndroid()) {
            scope.nativeSrc = fileEntry.nativeURL;

            createMedia(scope.nativeSrc);
          } else {
            scope.nativeSrc = fileEntry.nativeURL;

            createMedia(fileEntry.fullPath);
          }


        });
      }
    };

    thoughtsService.clearMediaCache = function clearMediaCache() {
      for (var key in thoughtsService.mediaCache) {

        thoughtsService.mediaCache[key].release();

        delete thoughtsService.mediaCache[key];
      }
    };

    // Make sure that we aren't using any old state somehow.
    thoughtsService.clearRethinkState = function clearRethinkState() {

      localStorage.removeItem("rethinkReplayState");
    };

    thoughtsService.getUniqueDistortions = function getUniqueDistortions(tagsToAnalyze) {

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
    };
    
    return thoughtsService;
  }
]);

var tokenModule = angular.module('tokenProvider', []);

// This exists because the configuration needs a provider, not a factory, when
// starting up.
tokenModule.provider('Token', function() {

  var tokenProvider = {

    token: undefined
  };

  tokenProvider.setToken = function setToken(newToken) {

    tokenProvider.token = newToken;
  };

  tokenProvider.getToken = function getToken() {

    return tokenProvider.token;
  };

  tokenProvider.hasToken = function hasToken() {

    // This is really gross. The web app really needs its own token provider since
    // it manages things much differently.
    if (window.Cookies) {

      var expirationToken = Cookies.get('SessionExpires');

      if (!expirationToken)
        return false;

      try {

        // Timezones east of GMT (e.g. GMT+4) will cause something like "+0400" to be written, but that needs
        // to be encoded and decoded so that the plus is not interpreted as a space in javascript.
        var expirationDate = new Date(Date.parse(decodeURIComponent(expirationToken.replace(new RegExp("\\+","g"),' '))));

        return new Date() < expirationDate;
      }
      catch (e) {
        return false;
      }

      return false;
    }

    return !!tokenProvider.token;
  };

  return {

    setToken: function(token) {

      tokenProvider.setToken(token);
    },

    getToken: function() {

      return tokenProvider.getToken();
    },

    hasToken: function() {

      return tokenProvider.hasToken();
    },

    $get: function() {

      return tokenProvider;
    }
  };
});


tokenModule.factory('TokenService', ['$q', 'StorageService', 'Token', 'Environment', function($q, StorageService, Token, Environment) {

  var tokenService = {};

  var retries = 5;

  tokenService.initFromLocalStorage = function(){
    // The webapp token is never available since it is a secure HTTP token.
    var q = $q.defer();

    if (Environment.isWeb()) {
      q.resolve();
      return q.promise;
    }

    var config = {
      preventRetrievalFailureRecording: retries > 1
    };

    return StorageService.getItemAsync('token', config)
      .then(function(token) {
        if (token) {
          Token.setToken(token);
        }

        console.log("TOKEN RETRIEVED: " + token);
      })
      .catch(function() {
        --retries;
        if (retries > 0) {
          return tokenService.initFromLocalStorage();
        }
      });
  };

  tokenService.getToken = function getToken() {

    return Token.getToken();
  };

  tokenService.hasToken = function hasToken() {

    return Token.hasToken();
  };

  tokenService.update = function update(token, newExpires) {

    Token.setToken(token);

    StorageService.setItem('token', token);
  };

  tokenService.clear = function clear() {

    Token.setToken(undefined);

    StorageService.removeItem('token');

    // So in the case of the web environment, we need to delete the cookie. We use the
    // cookies.js library to easily get the value, but we can't remove cookies on the
    // correct domain using that library. We have to use the specific domain that the
    // cookie was set for.
    if (window.Cookies) {
      // This will only work for localhost because of the domains used.
      Cookies.remove('SessionExpires', {domain: window.location.host});
    }
  };

  return tokenService;

}]);

var servicesModule = angular.module('webappEnvironmentService', []);


// This factory is only evaluated once, and authHttp is memorized. That is,
// future requests to authHttp service return the same instance of authHttp

servicesModule.factory('Environment', [function() {

  var env = {

    serverURL: '/app',
    websocketURL: 'wss://' + window.location.host.toString() + '/app',
    gaTrackingCode: 'UA-55091509-7'
  };

  var localData = {
    appVersion: "8.3.0" // MUST HAVE BUILD NUMBER
  };

  env.isOnline = function isOnline() {

    return true;
  };

  env.isDebug = function isDebug() {

    return (window.location.host.indexOf('www.thinkpacifica.com') < 0) && (window.location.host.indexOf('www.sanvello.com') < 0);
  };


  env.isIphoneX = function isIphoneX() {
    return false;
  };


  env.isIos = function isIos() {
    return false;
  };

  env.isAndroid = function isAndroid(){
    return false;
  };

  // Useful for determining whether or not things like drag gestures should be applied.
  env.isWeb = function isWeb() {

    return true;
  };

  // Fulfilling the interface here too.
  env.isWebDebug = function isWebDebug() {

    return true;
  };

  env.isDevelopment = function isDevelopment() {
    return (window.location.host.indexOf('www.thinkpacifica.com') < 0) && (window.location.host.indexOf('www.sanvello.com') < 0);
  };

  // The mobile applications may use secure local storage. The web may not as it exposes
  // things like the session token to javascript.
  env.isStorageAllowed = function isStorageAllowed() {

    return false;
  };

  env.setStorageAllowed = function setStorageAllowed(allowed) {

    // Just fulfilling the interface.
  };

  env.getAppVersion = function getAppVersion() {
    return localData.appVersion;
  };

  env.getGATrackingCode = function getGATrackingCode() {
    return env.gaTrackingCode;
  };

  return env;
}]);
