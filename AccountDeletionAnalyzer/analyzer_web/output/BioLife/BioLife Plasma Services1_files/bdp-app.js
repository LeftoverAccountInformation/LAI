"use strict";

var com = com || {};
com.bdp = com.bdp || {};

(function() {

    var bdpApp = angular.module('bdpApp', [
        /* Third party modules */
        'ngRoute',
        'ngResource',
        'ngMessages',
        'ngAnimate',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'datatables',
        'ui.utils',
        'ui.mask',
        'uiGmapgoogle-maps',
        'angularFileUpload',
        'angularUtils.directives.dirPagination',
        'directive.g+signin',
        /* BioLife modules */
        'bdpApp.controllers',
        'bdpApp.directives',
        'bdpApp.filters',
        'bdpApp.services'
    ]);
    
    bdpApp.factory('httpResponseInterceptor', ['$q', '$location', function ($q, $location) {
    	return {
            response: function(response){
                if (response.status === 401 || response.status === 403) {
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                	if($location.path() !== "/login") {
                		 $location.path('/unauthorized');                	
                	}                   
                }
                return $q.reject(rejection);
            }
        };
    }]);
    
    bdpApp.factory('httpRequestInterceptor', function () {
    	return {
            request: function(config){
                if (config.method === "GET") {
                    config.headers['Cache-Control'] = 'no-cache'; 
                    config.headers['Pragma'] = 'no-cache';
                }
                return config;
            }
        };
    });

    bdpApp.config(['$routeProvider', '$httpProvider', '$compileProvider', function($routeProvider, $httpProvider, $compileProvider) {
        $routeProvider
            .when('/', {
                title: 'BioLife Plasma Services',
                templateUrl: 'html/home.html',
                controller: 'HomeController'
            })
              .when('/betaLogin/', {
	            title: 'BioLife Donor Portal',
	            templateUrl: 'html/login.html',
	            controller: 'BetaLoginController'
	        })
            .when('/login', {
                title: 'Login',
                templateUrl: 'html/login.html',
                controller: 'LoginController'
            })
            .when('/donor-home', {
                title: 'Donor Home',
                templateUrl: 'html/donor/donor-home.html',
                controller: 'DonorHomeController'
            })
            .when('/staff-home', {
                title: 'Staff Profile',
                templateUrl: 'html/staff/staff-home.html',
                controller: 'StaffHomeController'
            })
            .when('/manager-home', {
                title: 'Manager Profile',
                templateUrl: 'html/manager/manager-home.html',
                controller: 'StaffHomeController'
            })
            /*
             * Administrator Screens
             */
            .when('/admin-home', {
                title: 'Admin Home',
                templateUrl: 'html/admin/admin-home.html',
                controller: 'StaffHomeController'
            })
            .when('/setup/general', {
                title: 'General Setup',
                templateUrl: 'html/admin/setup-general.html',
                controller: 'AdminGeneralSetupController'
            })
            .when('/setup/schedule-display', {
                title: 'Schedule Display Setup',
                templateUrl: 'html/admin/setup-schedule-display.html'
            })             
            .when('/donor-register', {
                title: 'Donor Registration',
                templateUrl: 'html/donor-register.html',
                controller: 'RegistrationController'
            })
            .when('/forgot-password-wizard/:id/:guid', {
                title: 'Forgot Password Wizard',
                templateUrl: 'html/forgot-password-wizard.html',
                controller: 'PasswordWizardController'
            })
            .when('/forgot-password-instructions', {
                title: 'Forgot Password Instruction Page',
                templateUrl: 'html/forgot-password-instructions.html'
            })
            .when('/profile-wizard-1', {
                title: 'Please enter your personal information',
                templateUrl: 'html/profile-wizard-1.html',
                controller: 'ProfileWizardOneController'
            })
            .when('/profile-wizard-2', {
                title: 'Choose donation center using the selection below',
                templateUrl: 'html/profile-wizard-2.html',
                controller: 'ProfileWizardTwoController'
            })
            .when('/profile-wizard-3', {
                title: 'Profile Wizard 3',
                templateUrl: 'html/profile-wizard-3.html',
                controller: 'ProfileWizardThreeController'
            })
            .when('/center/center-setup', {
                title: 'Center Setup',
                templateUrl: 'html/manager/center/center-setup.html',
                controller: 'CenterSetupController'
            })
            .when('/center/schedule-setup', {
                title: 'Schedule Setup',
                templateUrl: 'html/manager/center/schedule-setup.html',
                controller: 'ScheduleSetupController'
            })
            .when('/center/center-hours-and-location', {
                title: 'Center Hours and Location',
                templateUrl: 'html/manager/center/center-hours-and-location.html',
                controller: 'CenterHoursController'
            })
            .when('/appointments/calendar-one-day', {
            	title: 'Calendar View 1 Day',
            	templateUrl: 'html/manager/appointments/calendar-one-day.html',
            	controller: 'CalendarViewOneDayController'
            })
            .when('/appointments/calendar-month', {
            	title: 'Calendar View 1 Month',
            	templateUrl: 'html/manager/appointments/calendar-month.html',
            	controller: 'CalendarViewMonthController'
            })
            .when('/appointments/calendar-donor', {
                title: 'Donor View 1 Day',
                templateUrl: 'html/manager/appointments/calendar-donor.html',
                controller: 'CalendarDonorViewController'
            })
            .when('/appointments/setup', {
                title: 'Appointments Setup',
                templateUrl: 'html/manager/appointments/setup.html',
                controller: 'AppointmentsSetupController'
            })
            .when('/search-result', {
                title: 'Search Results',
                templateUrl: 'html/search-result.html',
                controller: 'SearchResultsController'
            })
            .when('/profile/donor-information', {
                title: 'Profile Information',
                templateUrl: 'html/donor/profile/profile-information.html',
                controller: 'DonorInformationController'
            })
            .when('/profile/donor-appointments', {
                title: 'Donor Appointments',
                templateUrl: 'html/donor/appointments/donor-appointments.html',
                controller: 'DonorAppointmentsController'
            })
            .when('/profile/debit-card', {
                title: 'BioLife Debit Card Information',
                templateUrl: 'html/donor/profile/debit-card.html',
                controller: 'DebitCardController'
            })
            .when('/profile/username-update', {
                title: 'Donor Username Update',
                templateUrl: 'html/donor/profile/username-update.html',
                controller: 'UpdateUsernameController'
            })
            .when('/profile/password-update', {
                title: 'Donor Password Update',
                templateUrl: 'html/donor/profile/password-update.html',
                controller: 'UpdatePasswordController'
            })
            .when('/profile/notification-preferences', {
                title: 'Notification Preferences',
                templateUrl: 'html/donor/profile/notification-preferences.html',
                controller: 'NotificationPreferencesController'
            })
            .when('/profile/donation-history', {
                title: 'Donor History',
                templateUrl: 'html/donor/profile/donation-history.html',
                controller: 'DonationHistoryController'
            })
            .when('/profile/delete-profile', {
                title: 'Delete Donor Profile',
                templateUrl: 'html/donor/profile/delete-profile.html',
                controller: 'DeleteProfileController'
            })
            .when('/profile/donation-center', {
                title: 'Donation Center',
                templateUrl: 'html/donor/profile/donation-center.html',
                controller: 'DonorDonationCenterController'
            })
            .when('/profile/schedule-preferences', {
                title: 'Schedule Preferences',
                templateUrl: 'html/donor/profile/schedule-preferences.html',
                controller: 'SchedulePreferencesController'
            })
            .when('/profile/unlink-social-media', {
                title: 'Unlink Social Media',
                templateUrl: 'html/donor/profile/unlink-social-media.html',
                controller: 'UnlinkSocialMediaController'
            })
            .when('/appointments/schedule-now', {
                title: 'Schedule Now',
                templateUrl: 'html/donor/appointments/schedule-now.html',
                controller: 'ScheduleNowController'
            })
            .when('/appointments/select-time', {
                title: 'Select Appointment Time',
                templateUrl: 'html/donor/appointments/select-time.html',
                controller: 'SelectTimeController'
            })
			.when('/appointments/reschedule-appointment', {
                title: 'Reschedule Appointment',
                templateUrl: 'html/donor/appointments/reschedule-appointment.html',
                controller: 'RescheduleAppointmentController'
            })
            .when('/appointments/staff-modify-appointment', {
            	title: 'Staff Modify Appointment',
            	templateUrl: 'html/manager/appointments/staff-modify-appointment.html',
            	controller: 'StaffModifyAppointmentController'
    		})
            .when('/donation-center', {
                title: 'Donation Center',
                templateUrl: 'html/donation-center.html',
                controller: 'DonationCenterController'
            })
            .when('/donor-register-incomplete', {
                title: 'Registration Incomplete',
                templateUrl: 'html/donor-register-incomplete.html',
                controller: 'RegistrationController'
            })
            .when('/report/appointment-by-type-report', {
                title: 'Appointments By Type Report',
                templateUrl: 'html/manager/report/appointment-by-type-report.html',
                controller: 'ApptByTypeReportController'
            })          
            .when('/report/appointment-by-type-report-result', {
                title: 'Appointments By Type Report',
                templateUrl: 'html/manager/report/appointment-by-type-report-result.html',
                controller: 'ApptByTypeReportResultController'
            })
            .when('/report/playroom-report', {
                title: 'Playroom Report',
                templateUrl: 'html/manager/report/playroom-report.html',
                controller: 'PlayroomReportController'
            })
            .when('/report/playroom-report-result', {
                title: 'Playroom Report',
                templateUrl: 'html/manager/report/playroom-report-result.html',
                controller: 'PlayroomReportResultController'
            })
            .when('/report/donor-override-report', {
                title: 'Override Report',
                templateUrl: 'html/manager/report/donor-override-report.html',
                controller: 'OverrideReportController'
            })          
            .when('/report/donor-override-report-result', {
                title: 'Override Report',
                templateUrl: 'html/manager/report/donor-override-report-result.html',
                controller: 'OverrideReportResultController'
            })
            .when('/report/potential-donor-report', {
                title: 'Potential Donor Report',
                templateUrl: 'html/manager/report/potential-donor-report.html',
                controller: 'PotentialDonorReportController'
            })          
            .when('/report/potential-donor-report-result', {
                title: 'Potential Donor Report Result',
                templateUrl: 'html/manager/report/potential-donor-report-result.html',
                controller: 'PotentialDonorReportResultController'
            })
            .when('/report/appointment-made-by-report', {
                title: 'Appointment Made By Report',
                templateUrl: 'html/manager/report/appointment-made-by-report.html',
                controller: 'AppointmentMadeByReportController'
            })
            .when('/report/appointment-made-by-report-result', {
                title: 'Appointment Made By Report Result',
                templateUrl: 'html/manager/report/appointment-made-by-report-result.html',
                controller: 'AppointmentMadeByReportResultController'
            })
            .when('/marketing-home', {
                title: 'Marketing Home',
                templateUrl: 'html/marketing/marketing-home.html',
                controller: 'StaffHomeController'
            })
            .when('/marketing/new-center-setup', {
                title: 'Marketing New Center Setup',
                templateUrl: 'html/marketing/new-center-setup.html',
                controller: 'MarketingNewCenterSetupController'
            })
            .when('/marketing/main-site-setup', {
                title: 'Marketing Main Site Setup',
                templateUrl: 'html/marketing/main-site-setup.html',
                controller: 'AdminGeneralSetupController'
            })
            .when('/marketing/new-center-event', {
                title: 'Marketing New Center Event',
                templateUrl: 'html/marketing/new-center-event.html',
                controller: 'MarketingNewCenterEventController'
            })
            .when('/marketing/important-center-updates', {
                title: 'Marketing Important Center Updates',
                templateUrl: 'html/marketing/important-center-updates.html',
                controller: 'MarketingImportantCenterUpdatesController'
            })
            .when('/marketing/edit-center', {
                title: 'Marketing Edit Center',
                templateUrl: 'html/marketing/edit-center.html',
                controller: 'MarketingEditCenterController'
            })
            .when('/marketing/center-relocation', {
                title: 'Marketing Edit Center Relocation',
                templateUrl: 'html/marketing/center-relocation.html',
                controller: 'MarketingCenterRelocationController'
            })
            .when('/marketing/center-news-messages', {
                title: 'Marketing Center News Messages',
                templateUrl: 'html/marketing/center-news-messages.html',
                controller: 'MarketingCenterNewsMessagesController'
            })
            .when('/marketing/pop-up-promotions', {
                title: 'Marketing Pop Up Promotions',
                templateUrl: 'html/marketing/pop-up-promotions.html',
                controller: 'MarketingPopUpPromotionsController'
            })
            .when('/center-event', {
                title: 'Center Event',
                templateUrl: 'html/center-event.html',
                controller: 'CenterEventController'
            })
            .when('/oops', {
                title: 'Oops!',
                templateUrl: 'html/oops.html'
            })
            .when('/unauthorized', {
                title: 'Unauthorized!',
                templateUrl: 'html/unauthorized.html'
            })
            .when('/timeout-warning', {
                title: 'Timeout Warning',
                templateUrl: 'html/timeout-warning-modal.html',
                controller: 'TimeoutWarningController'
            })
            .when('/social-media-log-in-test', {
                title: 'Social Media Log In Test',
                templateUrl: 'html/social-media-log-in-test.html',
                controller: 'SocialMediaLogInTestController'
            })
            .otherwise('/oops');
        // load all static file routes
        loadStaticPageRoutes($routeProvider);
        //http interceptor for 401's
        $httpProvider.interceptors.push('httpResponseInterceptor');
        $httpProvider.interceptors.push('httpRequestInterceptor');
        
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }])
        .run(function($rootScope, $templateCache, $location, $window, $document, homeService, userService, appointmentService, googleTagManagerService) {
        	
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            	$window.scrollTo(0,0);
            	$rootScope.title = current.$$route.title;
            	$rootScope.currentPath = current.$$route.originalPath;
            	$rootScope.centerFinder = false;
                $rootScope.finderArrow = false;
                $rootScope.promoArrow = false;
                $rootScope.doShowPromo = false;
            });
            $rootScope.$on('$viewContentLoaded', function() {
//              $templateCache.removeAll(); // KEEP FOR FLUSHING CACHE
            	/*if($location.host() === "www.biolifeplasma.com/us/#/") {
            		$window.ga('send', 'pageview', {page: $location.absUrl()});
            	}*/
            	/* Good Apple Google Tag Manager Implementation 11/2016  */
            	if($location.host() === "www.biolifeplasma.com") {
            		if(googleTagManagerService.getCookieValue("visitID=") === undefined || googleTagManagerService.getCookieValue("visitID=") === "undefined") {
	            		googleTagManagerService.create30MinuteCookie();
	            	} else {
	            		googleTagManagerService.refresh30MinuteCookie();
	            	}
	            	if(googleTagManagerService.getCookieValue("userID=") === undefined || googleTagManagerService.getCookieValue("userID=") === "undefined") {
	            		googleTagManagerService.create30DayCookie();
	            	} else {
	            		googleTagManagerService.refresh30DayCookie();
	            	}
	            	googleTagManagerService.sendGeneralTrackingData();	            	
            	}
            });
            // setup and load home site info like promo images
            homeService.loadSiteInfo();

//            if($location.path() === "/betaLogin/" ) {
//            	$scope.jsessionId === routeParams.value;    
//            	
//            	// load the response object from the server if page is reset
//                userService.loadBetaLoginResponse($scope.jsessionId);
//            } else {                   
//	            // load the response object from the server if page is reset
//	            userService.loadLoginResponse();
//            }
            // load the response object from the server if page is reset
            userService.loadLoginResponse();
            //appointmentService.loadAppointmentResponse();
           
            // initialize misc variables
            $rootScope.isLoggedIn = userService.isLoggedIn();
            $rootScope.logout = userService.logout;

            // load the role now
            userService.loadRole();
            
            

            $rootScope.redirectToSignin = function () {
                $location.path('/login');
            };
            $rootScope.redirectToScheduling = function () {
                window.location = 'https://www.biolifeplasma.com/us/#/login';
            };
            
            moment.locale('en', {
    		    longDateFormat : {
    		        LT: "h:mmA",
    		        LTS: "h:mm:ss A",
    		        L: "MM/DD/YYYY",
    		        LL: "MMM Do",
    		        LLL: "MMMM Do",
    		        LLLL: "MMMM Do YYYY"
    		    }
    		});
           	$rootScope.user = {};

            $window.fbAsyncInit = function() {
              // Executed when the SDK is loaded

              FB.init({

                /*
                 The app id of the web app;
                 To register a new app visit Facebook App Dashboard
                 ( https://developers.facebook.com/apps/ )
                */
            	/*Test FB App ID */
                /*appId: '708767529329222',*/
            	/* Production FB App ID */
                appId: '484616721913939',


                /*
                 Adding a Channel File improves the performance
                 of the javascript SDK, by addressing issues
                 with cross-domain communication in certain browsers.
                */

                //channelUrl: 'html/channel.html',

                /*
                 Set if you want to check the authentication status
                 at the start up of the app
                */

                status: true,

                /*
                 Enable cookies to allow the server to access
                 the session
                */

                cookie: true,

                /* Parse XFBML */

                xfbml: true,
                
                version: 'v2.4'
              });
              
//              $rootScope.initializeFacebookStatus = function(response) {
//            	  if(response.status === 'connected') {
//            		 $rootScope.$broadcast("fb_connected", {'response': response});
//             	  } else {
//            		 $rootScope.$broadcast("fb_statusChange", {'response': response});
//        		  }            	  
//              }
//              
//              FB.getLoginStatus(function(response) {
//            	  $rootScope.initializeFacebookStatus(response);
//              });
              
              FB.Event.subscribe('auth.statusChange', function(response) {
            	  if(response.status === 'connected') {
               		 $rootScope.$broadcast("fb_connected", {'response': response});
            	  } else {
               		 $rootScope.$broadcast("fb_statusChange", {'response': response});
           		  }              
              });
          };         

          (function(d){
              // load the Facebook javascript SDK

              var js,
              id = 'facebook-jssdk',
              ref = d.getElementsByTagName('script')[0];

              if (d.getElementById(id)) {
                return;
              }

              js = d.createElement('script');
              js.id = id;
              js.async = true;
              js.src = "https://connect.facebook.net/en_US/sdk.js";

              ref.parentNode.insertBefore(js, ref);

            }(document));
        });


    function loadStaticPageRoutes($routeProvider) {
        $routeProvider
            // About Biolife
            .when('/about-biolife/who-we-are', {
                title: 'Who We Are',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/whats_new', {
                title: 'What is New',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/upcoming-events', {
                title: 'Upcoming Events',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/our-centers', {
                title: 'Our Centers',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/kids-playroom', {
                title: 'Supervised Playroom',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/careers', {
                title: 'Careers',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/press-room', {
                title: 'Press Room',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/contact', {
                title: 'Contact Us',
                templateUrl: 'html/menus/about-biolife/contact.html',
                controller: 'ContactUsController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/new-centers', {
                title: 'New Centers',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/important-center-updates', {
                title: 'Important Center Updates',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/buddy-bonus', {
                title: 'Buddy Bonus',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/news_textmsgappts', {
                title: 'Text Message Appointments',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            .when('/about-biolife/contact_thx', {
                title: 'Contact Us - Thank You',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })
            /*.when('/about-biolife/news_mobilesite', {
                title: 'Mobile Site',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Biolife'
            })*/
            // About Plasma
            .when('/about-plasma/what-is-plasma', {
                title: 'What is Plasma?',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Plasma'
            })
            .when('/about-plasma/video-gallery', {
                title: 'Video Gallery',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Plasma'
            })
            .when('/about-plasma/donation-safety', {
                title: 'Donation Safety',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Plasma'
            })
            .when('/about-plasma/links-resources', {
                title: 'Links/Resources',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'About Plasma'
            })
            // Become a Donor
            .when('/become-donor/eligibility', {
                title: 'Eligibility',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/program-step-by-step', {
                title: 'Program Step-by-Step',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/step-by-step-guide', {
                title: 'Step-by-Step Guide',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/patient-testimonials', {
                title: 'Patient Testimonials',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/donor-testimonials', {
                title: 'Donor Testimonials',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/health-nutrition', {
                title: 'Health & Nutrition',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/compensation', {
                title: 'Compensation',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/faqs', {
                title: 'Frequently Asked Questions',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            .when('/become-donor/biolife-debit-card', {
                title: 'Frequently Asked Questions',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor -- BioLife Debit Card'
            })
            .when('/become-donor/second-donation', {
                title: 'Second Donation',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Become a Donor'
            })
            // Current Donors
            .when('/current-donor/patient-testimonials', {
                title: 'Patient Testimonials',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Current Donors'
            })
            .when('/current-donor/health-nutrition', {
                title: 'Health & Nutrition',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Current Donors'
            })
            .when('/current-donor/compensation', {
                title: 'Compensation',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Current Donors'
            })
            .when('/current-donor/feedback', {
                title: 'Tell Us Your Story',
                templateUrl: 'html/menus/current-donor/feedback.html',
                controller: 'FeedbackController',
                sectionTitle: 'Current Donors'
            })
            .when('/current-donor/faqs', {
                title: 'FAQs',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Current Donors'
            })
            .when('/current-donor/biolife-debit-card', {
                title: 'Frequently Asked Questions',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Current Donors -- BioLife Debit Card'
            })
            .when('/current-donor/feedback_thank_you', {
                title: 'Tell Us Your Story',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Current Donors'
            })
            // Legal
            .when('/legal/non-discrimination-statement', {
                title: 'Non-discrimination Statement',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Legal'
            })
            .when('/legal/copyright', {
                title: 'Copyright',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Legal'
            })
            .when('/legal/privacy', {
                title: 'Privacy',
                templateUrl: 'html/menus/menu-page.html',
                controller: 'MenuPageController',
                sectionTitle: 'Legal'
            })
            .when('/legal/twitter-code-of-conduct', {
                title: 'Twitter Code of Conduct',
                templateUrl: 'html/menus/legal/twitter-code-of-conduct.html',
                controller: 'MenuPageController',
                sectionTitle: 'Legal'
            })
            //Feature
            .when('/feature/celina', {
	            title: 'Celina',
	            templateUrl: 'html/feature/celina.html',
	            controller: 'MenuPageController',
	            sectionTitle: 'Feature'
	        })
	        .when('/feature/community', {
	            title: 'Community',
	            templateUrl: 'html/feature/community.html',
	            controller: 'MenuPageController',
	            sectionTitle: 'Feature'
	        })
	        .when('/feature/look-inside', {
	            title: 'Look Inside',
	            templateUrl: 'html/feature/look-inside.html',
	            controller: 'MenuPageController',
	            sectionTitle: 'Feature'
	        })
	        .when('/feature/social-media', {
	            title: 'Social Media',
	            templateUrl: 'html/feature/social-media.html',
	            controller: 'MenuPageController',
	            sectionTitle: 'Feature'
	        })
	        .when('/feature/opt-in', {
	            title: 'Opt In',
	            templateUrl: 'html/feature/opt-in.html',
	            controller: 'MenuPageController',
	            sectionTitle: 'Feature'
	        })
	        //Wifi
	        .when('/wifi/wifi-splash', {
	            title: 'Wifi',
	            templateUrl: 'html/wifi/wifi-splash.html',
	            controller: 'MenuPageController',
	            sectionTitle: 'Wifi'
	        });
    };
})();