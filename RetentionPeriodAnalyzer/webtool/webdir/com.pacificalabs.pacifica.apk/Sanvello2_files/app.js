
// Provide a way to override the back button.
window.backButtonOverride = undefined;

// Global cache of playing line items. We use this so that we can
// stop playing in other scopes.
var playingAudioLineItems = [];

var playerIds = 0;

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

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('pacifica', [
  'abstractGroupPostsCtrl',
  'accessibilityService',
  'accountCtrl',
  'accountService',
  'activityService',
  'audioService',
  'authService',
  'clientsCtrl',
  'contributingFactorsCompleteCtrl',
  'scheduleCtrl',
  'errorService',
  'evidenceCompleteCtrl',
  'generalService',
  'goalsService',
  'groupsCtrl',  // used as an abstract controller for webGroupsCtrl
  'groupPostCommentsCtrl',
  'groupPostsCtrl',
  'groupUsersCtrl',
  'groupsHelpCtrl',
  'groupsProfileCtrl',
  'communitiesHelpCtrl',
  'groupsService',
  'habitsCtrl',
  'habitsService',
  'homeCtrl',
  'homeworkModalCtrl',
  'ionic',
  'loginCtrl',
  'mediaService',
  'moodCtrl',
  'organizationService',
  'overlayService',
  'pacifica-templates',
  'pacificaAnalytics', // Used to use angulartics and rather than rewrite everything, just replacing their provider.
  'pascalprecht.translate',
  'pathService',
  'practitionerService',
  'pacificaDirectives',
  'payService',
  'progressCtrl',
  'relaxCtrl',
  'skillsService',
  'storageService',
  'thoughtsCtrl',
  'tokenProvider',
  'tutorialsCtrl',
  'webCommunityCtrl',
  // 'ui.bootstrap',
  // 'ui.date',
  'ui.utils',
  'infinite-scroll',
  'upgradeCtrl',
  'webappEnvironmentService',
  'moment-picker',
  'videochat',
  'therapistCtrl',
  'assessmentService',
  'assessmentIntroCtrl',
  'assessmentQuestionCtrl',
  'assessmentResultsCtrl',
  'ui.calendar',
  'practitionerAccountCtrl',
  'findClientsCtrl',
  'homeworkService',
  'relaxService',
  'feedService',
  'overlayService',
  'ngCordova.plugins.nativeStorage',

  'individualsCtrl',
  'coachesCtrl',
    'careteamService',
    'settingsService'
])
.config(['$stateProvider', '$urlRouterProvider', '$logProvider', '$locationProvider', '$translateProvider', '$analyticsProvider', '$uiViewScrollProvider', 'momentPickerProvider', 'TokenProvider', 'ACCOUNT_ROLES',
  function($stateProvider, $urlRouterProvider, $logProvider, $locationProvider, $translateProvider, $analyticsProvider, $uiViewScrollProvider, momentPickerProvider, TokenProvider, ACCOUNT_ROLES) {

    $translateProvider.useStaticFilesLoader({
      prefix: '/js/app/i18n/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');

    $logProvider.debugEnabled(true);

    $uiViewScrollProvider.useAnchorScroll();

    // These are just separated out into app.routes.js.
    initializeRoutes($stateProvider, ACCOUNT_ROLES);

    // Initialize the moment display
    moment.locale('en', {
        longDateFormat : {
            LTS : 'h:mm:ss A',
            LT : 'h:mm A',
            L : 'M/D',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        calendar : {
            lastDay : '[Yesterday at] LT',
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            lastWeek : 'L LT',
            nextWeek : 'dddd [at] LT',
            sameElse : 'L LT'
        }
    });

    moment.locale('en-gb', {
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/M',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : 'L LT',
            sameElse : 'L LT'
        },
    });

    moment.locale('es', {
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'LT:ss',
            L : 'D/M',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY LT',
            LLLL : 'dddd, D [de] MMMM [de] YYYY LT'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : 'L LT',
            sameElse : 'L LT'
        }
    });

    moment.locale('fr', {
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'D/M',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd D MMMM YYYY LT'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'L LT',
            sameElse: 'L LT'
        },
    });

    momentPickerProvider.options({
        /* Picker properties */
        // format: 'DD/MM/YYYY',
        // minView: 'year',
        // maxView: 'day',
        // startView: 'year',
        // autoclose: true,
        // today: false,
        // keyboard: false,

        /* Extra: Views properties */
        // leftArrow: '&larr;',
        // rightArrow: '&rarr;',
        // yearsFormat: 'YYYY',
        // monthsFormat: 'MMM',
        // daysFormat: 'D',
        hoursFormat: 'h a',
        // minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
        // secondsFormat: 'ss',
        // minutesStep: 5,
        // secondsStep: 1
    });

    // Check to see where we should start the user off. We do this because checking
    // once we're in the controller means that the html for that controller has already
    // loaded. We want the first screen to be the one determined below. We do not
    // want a transition when the app loads.
    if (TokenProvider.hasToken()) {
      $urlRouterProvider.otherwise("/app/home");
    }
    else {
      $urlRouterProvider.otherwise("/app/login");
    }
  }
])

.run(['$rootScope', '$window', '$location', function($rootScope, $window, $location) {
  $rootScope.location = $location;
  $rootScope.loadedTranslation = false;

  $(window).on('hashchange', function(event) {
    var oldUrl = event.originalEvent.oldURL;
    var newUrl = event.originalEvent.newURL;
    var isDisplayingModal = $('body').hasClass('modal-open');

    if (isDisplayingModal && typeof $rootScope.closeActiveModal === "function") {
      $rootScope.closeActiveModal();
      $rootScope.closeActiveModal = undefined;
      setTimeout(function() {
        window.location = oldUrl;
      }, 0);
    } else if (isDisplayingModal && typeof $rootScope.closeActiveModal !== "function") {
      console.log('Cannot close modal from rootScope without a close-handler defined.');
    }
  });

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded
    FB.init({
      appId: '830202777051419',
      status: true,
      cookie: true,
      xfbml: true,
      version    : 'v3.1'
    });
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}])

.filter('activeClients', ['$filter',function ($filter){
  return function(input){
    activeClients = []
    input.forEach(function(client){
      if(client.status == 'CONNECTED' || client.status == 'INVITED'){
        activeClients.push(client);
      }
    });
    return activeClients;
  }
}])

.filter('capitalize', function() {
  return function(input) {
    return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
  }
})

.controller('AppCtrl', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$translate', '$analytics', '$ionicModal', '$ionicPopup', 'ErrorService', 'AccountService', 'HabitsService', 'GoalsService', 'AudioService', 'GeneralService', 'PractitionerService', 'Environment', 'TokenService', 'AssessmentService', 'GroupsService', 'ActivityService', 'PathService', 'AccessibilityService', '$sce', 'OverlayService', 'ACCOUNT_ROLES',
               function($scope, $rootScope, $state, $http, $timeout, $translate, $analytics, $ionicModal, $ionicPopup, ErrorService, AccountService, HabitsService, GoalsService, AudioService, GeneralService, PractitionerService, Environment, TokenService, AssessmentService, GroupsService, ActivityService, PathService, AccessibilityService, $sce, OverlayService, ACCOUNT_ROLES) {

  // These two variables are required in order to boostrap the application.
  //$scope.loadedTranslation = loadedTranslation;
  $scope.retrievedUserContext = false;

  $scope.appIsReady = false;

  $scope.wasLoggedOut = false;

  $scope.mobile = false; //mobileCheck();

  $scope.showSidebar = true;

  $scope.shouldShowSidebar = function shouldShowSidebar() {

    return $scope.showSidebar;
  };

  $scope.isClientsView = function isClientsView(){
    return $state.current.name == 'practitioner.clients';
  }

  $scope.setShowSidebar = function setShowSidebar(showSidebar) {

    $scope.showSidebar = showSidebar;
  };

  $rootScope.$on('$translateLoadingSuccess', function () {
    $rootScope.loadedTranslation = true;

    checkIfAppIsReady();
  });

  var hasSeenMobileWarning = localStorage.getItem('hasSeenMobileWarning');
  if (hasSeenMobileWarning)
    $scope.mobile = false;

  $scope.isMobile = function isMobile() {
    return AccountService.isLoggedIn() && $scope.mobile;
  };

  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  $scope.checkWebRTCSupport = function checkWebRTCSupport() {

    var hasUserMedia = navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia;

    if (!hasUserMedia || detectIE()) {

      $ionicPopup.alert({
        template: '<div>' + $translate.instant('BROWSER_DOES_NOT_SUPPORT_WEBRTC') + '</div>',
        okText: $translate.instant('OK_GOT_IT'),
        okType: 'button-default'
      });

      return false;
    }

    return true;
  };

  $scope.dismissToolTip = function (tooltipPref) {
    AccountService.setUserPreference(tooltipPref, true);
  };

  $scope.showToolTip = function (tooltipPref) {
    if(!AccountService.accountUser.user){
      return false;
    }
    var pref = AccountService.getUserPreference(tooltipPref);
    return !pref || (pref == 'false');
  };

  $scope.canStartAppointment = function canStartAppointment(appointment) {

    if(appointment.appointmentType != 'TELETHERAPY' && appointment.appointmentType != 'CONSULTATION'){
      return false;
    }

    var now = moment();
    var original = moment(appointment.startTime);
    var start = moment(appointment.startTime).add(-5, 'minutes');
    var end = moment(appointment.startTime).add(appointment.duration, 'm').add(15, 'minutes');
    var ret = original.isSame(original, 'day') &&
              start.isBefore(now) &&
              end.isAfter(now);

    return ret;
  };

  $scope.closeTrialModal = function closeTrialModal () {
    OverlayService.modal.close($scope.trialModal).then(function(modal) {
      $scope.trialModal = modal;
    });
  };

  $scope.showTrialModal = function showTrialModal() {
    OverlayService.modal.open({
      modalId: 'StartTrialModal',
      templateUrl: 'templates/practitioner/starttrial.modal.html',
      scope: $scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false,
      recordAppseeEvent: false
    }).then(function(modal) {
      $scope.trialModal = modal;
    });
  };

  $scope.isComplimentary = function isComplimentary() {

    var accountUser = AccountService.getAccountUser();
    return (accountUser && accountUser.account && (accountUser.account.paymentType == 'COMPLIMENTARY'));
  };

  $scope.canUpgrade = function canUpgrade() {

    if (!AccountService.isPremiumEnabled()) {

      return true;
    }

    // Always allow
    if ($scope.isComplimentary()) {

      return true;
    }

    return false;
  };

  $scope.getComplimentaryRemainingDays = function getComplimentaryRemainingDays() {

    var accountUser = AccountService.getAccountUser();
    if (accountUser && accountUser.account && (accountUser.account.paymentType == 'COMPLIMENTARY')) {

      var expires = new Date(accountUser.account.premiumExpiresAt);
      var today = new Date();
      if (expires > today) {

        var expiresMillis = expires.getTime();
        var todayMillis = today.getTime();

        var elapsed = Math.floor( (expiresMillis - todayMillis) / (1000 * 60 * 60 * 24));

        return elapsed;
      }
    }

    return 0;
  };

  $scope.showClinicianPremiumModal = function() {

    OverlayService.modal.open({
      modalId: 'ClinicianPremiumModal',
      templateUrl: 'templates/practitioner/upgrade.html',
      scope: $scope,
      animation: 'slide-in-up',
      ignoreStatusBar: false,
      recordAppseeEvent: false
    }).then(function(modal) {
      $scope.clinicianUpgradeModal = modal;
    });
  }

  $scope.closeClinicianPremiumModal = function closePremiumModal () {
    OverlayService.modal.close($scope.clinicianUpgradeModal).then(function(modal) {
      $scope.clinicianUpgradeModal = modal;
    });
  };

  $scope.useWebApp = function userWebApp() {

    $scope.mobile = false;

    localStorage.setItem('hasSeenMobileWarning', 'true');

    $state.go('app.home');
  };

  var showingClientView = false;

  // The AppCtrl gets reloaded when going between the app and the practitioner view,
  // so we need to use localstorage to set this below.
  var persistedShowingClientView = localStorage.getItem('clientView');
  if (persistedShowingClientView && persistedShowingClientView == 'true') {

    showingClientView = true;
  }

  $scope.showClientView = function showClientView() {
    showingClientView = true;

    localStorage.setItem('clientView', 'true');

    $scope.removePractitionerClass();

    window.location.hash = '#/app';
  };

  $scope.setClinicianView = function setClinicianView(){

    showingClientView = false;

    localStorage.removeItem('clientView');

    $scope.addPractitionerClass();
  }

  $scope.showClinicianView = function showClinicianView() {
    $scope.setClinicianView();
    window.location.hash = '#/practitioner/clients';
  };

  $scope.isShowingClientView = function  isShowingClientView() {

    return showingClientView;
  };

  $scope.isPractitioner = function isPractitioner() {

    return AccountService.isPractitioner()
  };

  $scope.hasSignedBAA = function hasSignedBAA() {

    var accountUser = AccountService.getAccountUser();
    if (accountUser && accountUser.practitioner) {
      return accountUser.practitioner.baaSigned;
    }

    return false;
  };

  $scope.isInPreviewMode = function isInPreviewMode() {

    var accountUser = AccountService.getAccountUser();

    return (accountUser && accountUser.practitioner) && !$scope.hasSignedBAA();
  };

  $scope.isInInviteMode = function isInInviteMode() {

    var pref = AccountService.getUserPreference('practitioner_completed_postupgrade');

    return !$scope.isInPreviewMode() && (!pref || pref == 'false');
  };

  $scope.isPHI = function isPHI() {
    return AccountService.isPHI();
  };

  $scope.getFullName = function() {
    return AccountService.getFullName();
  };

  $scope.getAvatarUrl = function() {
    return AccountService.getAvatarUrl();
  };

  $scope.getExactCoachRole = function() {
    return AccountService.getExactCoachRole();
  };

  $scope.isAnyCoach = function() {
    return AccountService.isAnyCoach();
  };

  $scope.isCoachManager = function() {
    return AccountService.isCoachManager();
  };

  $scope.isCoach = function() {
    return AccountService.isCoach();
  };

  $scope.isBackendCoach = function() {
    return AccountService.isBackendCoach();
  };

  $scope.goToIndividuals = function() {
    $state.go('practitioner.individuals');
  };

  $scope.goToCoaches = function() {
    $state.go('practitioner.coaches');
  };

  $scope.goToAccount = function() {
    $state.go('practitioner.account');
  }

  var logoutTimer;

  function performLogout() {

    AccountService.logout()
      .success(function() {

        $('html').removeClass('practitioner');

        $rootScope.$broadcast('event:loginRequired');
      });
  }

  $scope.restartLogoutTimer = function restartLogoutTimer() {

    $scope.cancelLogoutTimer();

    if (AccountService.isLoggedIn()) {

      // If the practitioner is in preview mode don't start the logout timer.
      if (AccountService.isPractitioner()) {

        if (!$scope.isInPreviewMode())
          return;
      }

      // Give the user 10 minutes to change views before we log out.
      logoutTimer = $timeout(function() {

        performLogout();
      }, AccountService.getLoginTimeout());
    }
  }

  $scope.cancelLogoutTimer = function cancelLogoutTimer() {

    if (logoutTimer) {
      $timeout.cancel(logoutTimer);
      logoutTimer = undefined;
    }
  };

  /*$rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
          // prevent navigating to user side of app
          if ( fromState.name.indexOf('practitioner') >= 0 &&
               toState.name.indexOf('app') >= 0 ) {
              event.preventDefault();
          }
      });*/

  $scope.$on("$stateChangeSuccess",
    function(event, toState, toParams, fromState, fromParams) {
      if ( fromState.name == "app.upgrade" && toState.name == "app.login") {
        $rootScope.returnToState = fromState;
        $rootScope.returnToParams = fromParams;
      } else {
        delete $rootScope.returnToState;
        delete $rootScope.returnToParams;
      }
      if(toState.name == 'app.login'){
         // we don't want to wait for user to load if we're not logged in
        $scope.appRenderReady = true;
      }
      if(toState.name.indexOf('practitioner') > -1){
        $scope.setClinicianView();
      }
      $analytics.pageTrack(toState.url);

      $scope.restartLogoutTimer();
    }
  );


  if ( Environment.isDebug()) {

    // Debugging
    window.onerror = function(msg, url, line) {

      console.log("JS Error:");
      console.log(msg);

      alert("ERROR:" + msg + "\nurl: " + url + "\nline: " + line);

      var err = new Error();
      msg += '\n' + err.stack;

      AccountService.postJSError(msg, url, line);
    };
  }
  else {

    // Post to the server.
    window.onerror = function(msg, url, line) {

      console.log("JS Error:");
      console.log(msg);

      var err = new Error();
      msg += '\n' + err.stack;

      AccountService.postJSError(msg, url, line);
    };
  }

  $scope.serverError = false;

  $scope.downloadedFile = false;

  $scope.showingPremiumModal = false;

  $scope.loadingUserContext = false;
  $scope.lastUserContextRequest = undefined;

  $scope.getLang = function getLang() {

    var locale = AccountService.getLocale();

    if (locale)
      return AccountService.getLang(locale);
    else
      return AccountService.getLang('en-us');
  };

  $scope.isLoggedIn = function isLoggedIn() {

    var accountUser = AccountService.getAccountUser();
    return accountUser && accountUser.user;
  };

  $scope.isPremium = function isPremium() {

    return AccountService.isPremiumEnabled();
  };

  $scope.hasSignedTOS = function hasSignedTOS() {
    var signedToS = AccountService.getUserPreference('signed_supplemental_tos');
    return signedToS == 'true';
  };

  $scope.isEmailValidated = function isEmailValidated() {

    return AccountService.isEmailValidated();
  };

  $scope.showPremiumModal = function showPremiumModal() {
    $scope.showingPremiumModal = true;
  };

  $scope.hidePremiumModal = function hidePremiumModal() {
    $scope.showingPremiumModal = false;
  };

  if(typeof gapi != 'undefined'){
    gapi.load('auth2', function() {//load in the auth2 api's, without it gapi.auth2 will be undefined
        gapi.auth2.init(
            {
                client_id: googlePlayClientID
            }
        );
        $scope.googleAuth = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
    });
  }

  $scope.socialLogout = function socialLogout(){
    if ($scope.googleAuth && $scope.googleAuth.isSignedIn.get() == true) {
        $scope.googleAuth.signOut().then(function () {
            console.log('Signing out for Google');
        });
    }
    FB.getLoginStatus(function(response) {
       if (response.status == 'connected') {
         FB.logout(function(response) {
           console.log('Signing out for Facebook');
         });
       }
    });    
  };

  $scope.logout = function logout() {
    $scope.socialLogout();

    AccountService.logout()
      .success(function() {
        $rootScope.$broadcast('event:loginRequired');
      });
  };

  $scope.showReedemGiftCode = function showReedemGiftCode() {

    $state.go('app.redeem');
  };

  $scope.isAppReady = function isAppReady() {

    return $scope.appIsReady;
  };

  function checkIfAppIsReady() {
    if ($rootScope.loadedTranslation &&
        $scope.retrievedUserContext) {

      $scope.appIsReady = true;

      $analytics.initialize(Environment.getGATrackingCode(), Environment.getAppVersion(), $state.current.url);

      GroupsService.initFromLocalStorage();
      $timeout(function() {
        $rootScope.$broadcast('event:pacificaReady');
      });
    }

  }

  window.showTermsOfService = $scope.showTermsOfService = function showTermsOfService() {
    window.open('/tos/', '_blank');
  };

  window.showPrivacyPolicy = $scope.showPrivacyPolicy = function showPrivacyPolicy() {
    window.open('/privacy/', '_blank');
  };

  $scope.getUpdatedAgreementText = function(){
    return $sce.trustAsHtml($translate.instant('UPDATED_AGREEMENT_TEXT'));
  };

  $scope.showAgreement = function(){

    // if we're still on the login state, we want to wait and check this on the home view or clients view
    // we call this again in homeCtrl clientsCtrl
    if(!AccountService.shouldViewTerms()){
      return;
    }
    if (!$rootScope.showingAgreementModal && $state.current.name != 'app.login') {
      $rootScope.showingAgreementModal = true;


      OverlayService.modal.open({
        modalId: 'AcceptTermsModal',
        templateUrl: 'templates/acceptTerms.modal.html',
        scope: $rootScope,
        animation: 'slide-in-up',
        ignoreStatusBar: false,
        recordAppseeEvent: false
      }).then(function(modal) {
        $scope.agreementModal = modal;
      });

    }
  }

  // This needs to happen either on login or app load, if they're already logged in.
  $rootScope.$on('event:userContextInitialized', function() {
    $scope.appRenderReady = true;
    $scope.retrievedUserContext = true;
    $scope.wasLoggedOut = false;

    if(AccountService.requiresPasswordChange()){
      AccountService.showUpdatePasswordModal(true);
    };

    // See if we need to update the locale.
    checkLocalePreference();

    startPing();

    checkIfAppIsReady();
    
      if(!$rootScope.loadedTranslation){
        $rootScope.$on('event:pacificaReady', $scope.showAgreement);
      } else {
        $scope.showAgreement();
      }
  });

  $rootScope.acceptTerms = function(){
    OverlayService.modal.close($scope.agreementModal).then(function(modal) {
      $scope.agreementModal = modal;
      $rootScope.showingAgreementModal = false;
      AccountService.userAcceptTerms();
    });
  };

  /*************************************************************************
   * Retrieve the current user context. This is where the app context
   * gets initialized if it is not loaded from local storage (offline mode).
   *************************************************************************/

  $scope.retrieveUserContext = function(){
    $scope.loadingUserContext = true;

    console.log("retrieving user context.");
    // Should only do this if we in fact have a token
    // This actually needs to check to see if the cookie is there for the web.
    if (!TokenService.hasToken()) {

      console.log("No token to retrieve user context.");

      $state.go('app.login', {} , {location: 'replace'});
      return;
    }

    AccountService.findUserContext()
      .success(function (data) {


        console.log("got user context:");
        console.log(data);

        $scope.initializeUserContext(data, $rootScope, AccountService, HabitsService, GoalsService, AudioService, Environment, AssessmentService, ActivityService, PathService);

        $scope.loadingUserContext = false;

        $scope.lastUserContextRequest = new Date();

        if($scope.isPractitioner()){
          // we need this for the nav
          PractitionerService.checkForAgreements($scope);
          PractitionerService.initClientFunctionality($scope);
          PractitionerService.initAppointmentFunctionality($scope);
          $scope.refreshClients();
        } else if (AccountService.isAnyCoach()) {
          PractitionerService.initClientFunctionality($scope);
        }
      })
      .error(function(data, status, headers, config) {
        // Handle the error
        console.log("error loading user context");

        $scope.loadingUserContext = false;

        $scope.retrievedUserContext = true;

        checkIfAppIsReady();

      });
  }

  // These get inherited down through the other controllers.
  $scope.goBack = function goBack(backCount) {

    if (window.backButtonOverride) {
      window.backButtonOverride();
    }
    else {
      history.back();
    }
  };

  // global goToClient = gross. Need a way to call from highcharts tooltip though.
  $scope.goToClient = window.goToClient = function(clientId) {
    $state.go('practitioner.client.view',{clientId: clientId});
  };

  $scope.goToClientTab = function(clientId, tabName){
    $state.go('practitioner.client.tab', {clientId: clientId, activeTab: tabName});
  }

  $scope.goClients = function goClients() {

    if (AccountService.isPractitioner()) {
      $state.go('practitioner.clients');
    }
  };
  // for practicioner nav
  $scope.showingAddDropdown = false;
  $scope.showingAccountDropdown = false;
  $scope.showingMobileMenu = false;

  $scope.toggleMobileMenu = function(){
    $scope.showingMobileMenu = !$scope.showingMobileMenu;
  }

  $scope.getRecurringDisplay = function(days){
    var interval = _.find($scope.recurringOptions, {value: days});
    return interval.display;
  }

  $scope.recurringOptions = [
    {
      value: 0,
      display: 'Just Once'
    },
    {
      value: 7,
      display: 'Every Week'
    },
    {
      value: 14,
      display: 'Every 2 Weeks'
    },
    {
      value: 28,
      display: 'Every 4 Weeks'
    }
  ];


  $scope.goTutorials = function goTutorials() {

    if (AccountService.isPractitioner()) {
      $state.go('practitioner.tutorials');
    }
  };

  $scope.goToSchedule = function goToSchedule() {
    if(AccountService.isPractitioner() || AccountService.isAnyCoach()){
      $state.go('practitioner.schedule');
    }
  }

  $scope.goHome = function goHome() {
    $state.go('app.home');
  };

  $scope.goToProgress = function goToProgress(client) {
    if(AccountService.isPractitioner() && client){
      if (AccountService.isPremiumEnabled() || $scope.isViewingPersonalAccount()) {
        $state.go('practitioner.progress', {userId: client.account.id, viewingOtherUser: true});
      } else {
        $scope.showClinicianPremiumModal();
      }
    } else {
      $state.go('app.progress');
    }
  };

  $scope.getClientName = function getClientName() {
    if ($scope.client) {
      return $scope.client.account.firstName + ' ' + $scope.client.account.lastName;
    }
  };

  $scope.goToAccount = function goToAccount(activeTab) {
    if ( (AccountService.isPractitioner() || AccountService.isAnyCoach()) && !showingClientView) {
        var extras = {};
        if(activeTab){
          extras.activeTab = activeTab
        }
        $state.go('practitioner.account', extras);
    } else {
        $state.go('app.account');
    }
  };

  $scope.removePractitionerClass = function(){
    if($('html').hasClass('practitioner')){
      $('html').removeClass('practitioner');
    }
  }

  $scope.addPractitionerClass = function(){
    $('html').addClass('practitioner');
  }

  $scope.goToTherapist = function goToTherapist() {
    $state.go('app.therapist');
  }

  $scope.goToGroups = function() {
    $state.go('app.groups');
  }

  $scope.goToCommunity = function() {
    $state.go('app.community');
  }

  $scope.goToUpgrade = function goToUpgrade(type, coupon) {

    var data;
    if (type) {
      data = {
        plan: type,
        couponCode: coupon
      };
    }

    if (AccountService.isPractitioner()) {

      if (!$scope.hasSignedBAA()) {
        $scope.goClients();
      }
      else {
        $state.go('practitioner.upgrade', data);
      }
    }
    else
      $state.go('app.upgrade', data);

    // Handled for both consumer and clinician.
    $scope.closeClinicianPremiumModal();
    $scope.hidePremiumModal();
  };

  $scope.hideTherapistTab = function hideTherapistTab() {
    // Always show the tab when there is a connection.
    var connectionContext = AccountService.getConnectionContext();
    if (connectionContext && connectionContext.practitioners && (connectionContext.practitioners.length > 0))
      return false;

    var pref = AccountService.getUserPreference('working_with_professional');
    return pref != 'true';

  };

  $scope.isRelaxActivity = function isRelaxActivity() {

    return $state.includes('app.breathe') || $state.includes('app.meditation');
  };

  $scope.isLoginActivity = function isLoginActivity() {

    return $state.includes('app.login') || $state.includes('app.login-reset');
  };

  $scope.canViewCommunities = function(){
    var pref = AccountService.getUserPreference('communities_ineligible');
    return pref != 'true';
  }

  $scope.isTabActive = function isTabActive(tab) {
    if (tab == 'Home')
      return $state.includes('app.home');
    else if (tab == 'Progress')
      return $state.includes('app.progress');
    else if (tab == 'Community')
      return $state.includes('app.community');
    else if (tab == 'Groups')
      return $state.includes('app.groups');
    else if (tab == 'Account')
      return $state.includes('app.account');
    else if (tab == 'Therapist')
      return $state.includes('app.therapist');
    else if (tab == 'Clients')
      return $state.includes('practitioner.clients');
    else if (tab == 'Schedule')
      return $state.includes('practitioner.schedule');
    else if (tab == 'Tutorials')
      return $state.includes('practitioner.tutorials');
    else if (tab == 'activity')
      return $state.includes('practitioner.progress');
    else if (tab =='Find')
      return $state.includes('practitioner.findClients');
    else if (tab == 'Individuals')
      return $state.includes('practitioner.individuals') || $state.includes('practitioner.client');
    else if (tab == 'Coaches')
      return $state.includes('practitioner.coaches');
    else if (tab == 'Schedule')
      return $state.includes('practitioner.schedule');

    return false;
  };

  $scope.goToFindClients = function goToFindClients(){
    if (AccountService.isPractitioner()) {
      $state.go('practitioner.findClients');
    }
  }

  $scope.goToStartConsult = function goToStartConsult(id){
    if (AccountService.isPractitioner()) {
      $state.go('practitioner.findClients', {startSession: id});
    }
  }

  $scope.getConsultationsNotificationsCount = function getConsultationsNotificationsCount() {
    return AccountService.appointmentContext.claimedConsultationNotificationCount;
  }

  window.checkLocalePreference = function checkLocalePreference() {

    var localePref = AccountService.getUserPreference('preferred_locale');
    if (typeof localePref == 'undefined') {
      var lang;
      if (navigator.languages && navigator.languages.length > 0) {

        lang = navigator.languages[0];
      }
      else if (navigator.userLanguage) {

        lang = navigator.userLanguage;
      }
      else {
        lang = navigator.language;
      }

      if (lang) {

        AccountService.setLocale(lang);
      }
      else {

        // More testing
        AccountService.setLocale('en-US');
      }
    }
    else {
      AccountService.updateLocale(localePref);
    }
  }

  $scope.getSchedulerDateDisplay = function(dateVal) {
    return moment(dateVal).format('MMMM Do, YYYY');
  };

  $scope.getSchedulerTimeDisplay = function(dateVal) {
    return moment(dateVal).format('LT');
  };

  $scope.roundUpToNearestFiveMinutes = function(time){
    additionalMinutes = 5 - time.minutes() % 5;
    if(additionalMinutes == 5){
      return time;
    }
    return time.add(additionalMinutes, 'm');
  };

  $scope.isPacificaLiteUser = function isPacificaLiteUser() {

    var splitTestContext = AccountService.getSplitTestContext();
    if (splitTestContext && splitTestContext.splitTestGroups) {

      var val = splitTestContext.splitTestGroups.umnPilot;

      return val == 'lite';
    }

    return false;
  };

  $scope.initializeUserContext = function initializeUserContext(userContext, $rootScope, AccountService, HabitsService, GoalsService, AudioService, Environment, AssessmentService, ActivityService, PathService) {

    // from helpers.js
    window.initializeUserContext(userContext, $rootScope, AccountService, HabitsService, GoalsService, AudioService, Environment, AssessmentService, ActivityService, PathService, $scope);
  }

  $scope.hasBeenLoggedOut = function hasBeenLoggedOut() {

    return $scope.wasLoggedOut;
  }

  // This needs to be initialized, since some services fire events once it has been initialized.
  AccessibilityService.initialize().then(function(accessibilityService) {
    // We can set web accessibility classes here in the future.
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    var isProtected = _.has(toStateParams, 'whitelistedRoles');

    if (isProtected) {
      var canAccess = _.some(toStateParams.whitelistedRoles, AccountService.hasRole);

      if (!canAccess) {
        var defaultState;
        if (AccountService.isAnyCoach()) {
          defaultState = 'practitioner.individuals';
        } else if (AccessibilityService.isPractitioner()) {
          defaultState = 'practitioner.clients';
        } else {
          defaultState = 'app.home';
        }
        
        $state.go(defaultState, null, {location: 'replace'});
      }
    }
  });

  // Handle redirect for loginRequired events.
  $scope.$on('event:loginRequired',
    function(ev, args) {

      $scope.wasLoggedOut = true;

      // This is the main thing that assumes the app is logged in so clear it first.
      TokenService.clear();
      if ($('html').hasClass('practitioner')) {
        $('html').removeClass('practitioner');
      }
      if(!args)
        args = {};
      
      if($state.current.name !== 'app.login')
        $state.go('app.login', args , {location: 'replace'});

      $timeout(function() {

        // Remove all of the in-memory data as well.
        AccountService.clearData(); // The logout functionality posts to the server.
        HabitsService.logout();
        GoalsService.logout();
        GroupsService.logout();
        AudioService.logout();

        // Clear out any user preferences.
        localStorage.clear();

        cancelPing();
      });
    }
  );

  $scope.hasLoadedTranslation = function hasLoadedTranslation() {
    return $rootScope.loadedTranslation;
  }


  checkLocalePreference();
  // This is effectively bootstrapping the whole app on the web. We need the user context to do anything.
  $scope.retrieveUserContext();

  var pingFuture;
  var pingTimeout = 60 * 1000; // One minute

  function startPing() {

    // In case there is one running
    cancelPing();

    pingFuture = $timeout(ping, pingTimeout);
  }

  function cancelPing() {

    if (pingFuture) {
      $timeout.cancel(pingFuture);
      pingFuture = undefined;
    }
  }

  function ping() {

    if (AccountService.isLoggedIn()) {
      AccountService.ping();

      pingFuture = $timeout(ping, pingTimeout);
    }
  }

}]);
