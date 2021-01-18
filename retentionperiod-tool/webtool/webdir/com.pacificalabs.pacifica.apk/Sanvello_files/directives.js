(function() {

  var module = angular.module('pacificaDirectives', []);

  module.directive('practitionerOnboarding', ['$sce', '$parse', function($sce, $parse) {
    return {
      restrict: 'E',
      templateUrl: "templates/practitioner/onboarding.directive.html",
      replace: true,
      scope: true,
      controller: ['$scope', '$state', '$element', '$timeout', '$analytics', '$translate', '$ionicPopup', '$ionicModal', 'MediaService', 'AccountService', 'PractitionerService', 'GeneralService', 'Environment', 'OverlayService', function($scope, $state, $element, $timeout, $analytics, $translate, $ionicPopup, $ionicModal, MediaService, AccountService, PractitionerService, GeneralService, Environment, OverlayService) {

        $scope.isStepComplete = function isStepComplete(step) {

          if (step == 1) {

            return $scope.isEmailValidated();
          }
          else if (step == 2) {

            return $scope.hasSignedTOS();
          }
          else {

            return $scope.hasSignedBAA();
          }

          return false;
        };

        $scope.checkEmailValidation = function checkEmailValidation() {

          AccountService.checkRemoteEmailValidation().success(function(resp) {

            if (resp.validated) {
              AccountService.getAccountUser().user.emailVerifiedAt = new Date();
            } else {
              $ionicPopup.alert({title: $translate.instant('CHECK_EMAIL'), template: $translate.instant('EMAIL_NOT_YET_VALIDATED'), okText: $translate.instant('OK_GOT_IT'), okType: 'button-default'});
            }

          }).error(function() {

            $ionicPopup.alert({template: $translate.instant('GENERIC_ERROR'), okText: $translate.instant('OK_GOT_IT'), okType: 'button-default'});
          });
        };

        $scope.resendEmailValidation = function resendEmailValidation() {

          AccountService.resendValidationEmail().success(function() {

            var validationText = $translate.instant('VALIDATION_EMAIL_SENT_WITH_EMAIL');
            validationText = validationText.replace('XXXEMAILXXX', AccountService.getAccountUser().user.email);

            $ionicPopup.alert({title: $translate.instant('VALIDATE_EMAIL'), template: validationText, okText: $translate.instant('OK_GOT_IT'), okType: 'button-default'});
          }).error(function(data, status, headers, config) {

            $ionicPopup.alert({template: $translate.instant('GENERIC_ERROR'), okText: $translate.instant('OK_GOT_IT'), okType: 'button-default'});
          });
        };


        $scope.showTOSModal = function showTOSModal() {
          OverlayService.modal.open({
            modalId: 'TermsOfServiceModal',
            templateUrl: 'templates/practitioner/supplemental.tos.modal.html',
            scope: $scope,
            animation: 'slide-in-up',
            ignoreStatusBar: false,
            recordAppseeEvent: false
          }).then(function(modal) {
            $scope.tosModal = modal;
          });
        };

        $scope.closeTOSModal = function closeTOSModal() {
          OverlayService.modal.close($scope.tosModal).then(function(modal) {
            $scope.tosModal = modal;
          });
        };

        $scope.approveSupplementalTos = function approveSupplementalTos() {

          $scope.closeTOSModal();

          AccountService.setUserPreference('signed_supplemental_tos', 'true');
        };

        $scope.reviewBAA = function reviewBAA() {

          $scope.checkForBAAModal();
        };
      }]
    };
  }]);

  
  module.directive('postUpgrade', ['$sce', '$parse', function($sce, $parse) {
    return {
      restrict: 'E',
      templateUrl: "templates/practitioner/postupgrade.directive.html",
      replace: true,
      scope: true,
      controller: ['$sce', '$scope', '$state', '$element', '$timeout', '$analytics', '$translate', '$ionicPopup', 'MediaService', 'AccountService', 'PractitionerService', 'GeneralService', 'Environment', function($sce, $scope, $state, $element, $timeout, $analytics, $translate, $ionicPopup, MediaService, AccountService, PractitionerService, GeneralService, Environment) {

        $scope.dismiss = function dismiss() {

          var popup = $ionicPopup.confirm({
            template: '<div>' + $translate.instant('DISMISS_POST_UPGRADE_WORKFLOW') + '</div>',
            cancelText: $translate.instant('CANCEL'),
            cancelType: 'button-default',
            okText: $translate.instant('DISMISS'),
            okType: 'button-default'
          });

          popup.then(function(res) {

            if (res) {

              AccountService.setUserPreference('practitioner_completed_postupgrade', true);
            }
          });
        };

        $scope.getBAAText = function getBAAText() {

          return $sce.getTrustedHtml($translate.instant('PLEASE_SIGN_BAA'));
        };

        $scope.goToClients = function goToClients(showInvite) {

          $state.go('practitioner.clients', {
            invite: showInvite
          });
        };

        $scope.isStepComplete = function isStepComplete(step) {

          if (step == 1) {

            var accountUser = AccountService.getAccountUser();
            if (accountUser && accountUser.practitioner) {

              return accountUser.practitioner.baaSigned;
            }
          }
          else if (step == 2) {

            return PractitionerService.hasInvitedOther();
          }
          else {

            var pref = AccountService.getUserPreference('practitioner_completed_postupgrade');

            return pref == 'true';
          }

          return false;
        };


      }]
    };
  }]);

  module.directive('contenteditable', ['$sce', '$parse', function($sce, $parse) {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          try {
            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
          }
          catch (err) {
            console.log("Caught strange contenteditable unsafe error that has no effect.");
          }
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$evalAsync(read);
        });

        initialize();

        function initialize() {

          var getter = $parse(attrs.ngModel);
          var value = getter(scope);

          element.html(value);
        }

        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if ( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  }]);

  module.directive('audioLineItem', function() {

    return {
      restrict: 'E',
      templateUrl: "templates/audioLineItem.html",
      replace: true,
      scope: {
        src: "=",
        duration: "=",
        tags: "=",
        bgColor: "@",
        hide: "="
      },
      controller: ['$scope', '$element', '$timeout', '$analytics', '$translate', '$ionicPopup', 'MediaService', 'GeneralService', 'Environment', function($scope, $element, $timeout, $analytics, $translate, $ionicPopup, MediaService, GeneralService, Environment) {

        // We aren't going to initialize this right away because we
        // don't want to use up any resources on the device.

        var element = $element.find('.audioPlayer')[0];
        element.id = 'jwPlayer' + (++playerIds);

        $scope.media = jwplayer(element);

        $scope.media.setup({
          file: $scope.src,
          primary: 'html5',
          height: 40
        });

        $scope.media.on('setupError', function(message) {
          console.log('error', message);
        });
        $scope.media.on('error', function(message) {
          console.log('error', message);
        });

        $scope.loading = false;
        $scope.playing = false;
        $scope.currentTime = 0.0;

        $scope.canvasScale = window.devicePixelRatio;

        $scope.getDuration = function getDuration() {
          return GeneralService.getTimeDisplay($scope.duration);
        };

        $scope.getAudioClass = function getAudioClass() {
          if ($scope.loading)
            return "loading";
          else if ($scope.playing)
            return "playing";
          else
            return "paused";
        };

        $scope.monitorPlay = function() {

          var position =  $scope.media.getPosition();

          if (position < 0)
            position = 0;

          $scope.currentTime = position;

          drawCanvas();

          if ($scope.playing) {

            $timeout($scope.monitorPlay, 5);
          }
        };

        $scope.$watch('hide', function() {
          if ($scope.playing && $scope.hide)
            $scope.playPause();
        });

        $scope.playPause = function playPause(e) {
          if (typeof e !== 'undefined') var evt = e.originalEvent;
          if (typeof window.event !== 'undefined') var evt = window.event;
          if (typeof event !== 'undefined') var evt = event;

          evt.stopPropagation();
          evt.preventDefault();

          function localPlayPause() {

            var wasPlaying = $scope.playing;

            $scope.playing = !$scope.playing;


            if (wasPlaying) {
              // Remove from the global list.
              removeFromPlayingItems();

              $scope.media.pause();

              $analytics.eventTrack('playAudioLineItem', {category: 'thoughts'});
            }
            else {

              if (playingAudioLineItems.length > 0) {

                var otherScope = playingAudioLineItems[0];

                playingAudioLineItems.length = 0; // Prevent an infinite loop
                otherScope.playPause();
              }

              playingAudioLineItems.push($scope);

              $scope.media.play();

              $scope.monitorPlay();

              // Monitor how far into the playing they are as an integer percentage
              // when they pause it.
              var percentage = Math.floor( ($scope.currentTime / $scope.duration) * 100);

              $analytics.eventTrack('pauseAudioLineItem', {category: 'thoughts', value: percentage});
            }
          }

          localPlayPause();

        }; // playPause

        function removeFromPlayingItems() {
          var index = playingAudioLineItems.indexOf($scope);
          if (index >= 0)
            playingAudioLineItems.splice(index, 1);
        }

        $scope.$on('$destroy', function() {

          removeFromPlayingItems();

          $scope.playing = false;

          if ($scope.media) {
            $scope.media.stop();
            $scope.media.remove();
          }
        });

        var canvas = $element.find("canvas")[0];

        canvas.width = 250 * $scope.canvasScale;
        canvas.height = 3 * $scope.canvasScale;

        var ctx = canvas.getContext("2d");

        function handlePositionUpdate(evt) {

          evt.stopPropagation();
          evt.preventDefault();

          var paddingLeft = parseInt($(canvas).css('padding-left'));
          var paddingRight = parseInt($(canvas).css('padding-right'));

          var width = $(canvas).outerWidth() - paddingLeft - paddingRight;
          var height = $(canvas).outerHeight();

          var x = 0;

          if (evt.changedTouches)
            x = evt.changedTouches[0].pageX - canvas.getBoundingClientRect().left - paddingLeft;

          var loc = x / width;
          var duration = $scope.media.getDuration();

          $scope.media.seekTo(loc * duration * 1000);
        }

        canvas.addEventListener('touchstart', function(evt) {

          handlePositionUpdate(evt);
        }, false);

        function drawCanvas() {

          var width = canvas.width;
          var height = canvas.height;

          ctx.clearRect(0, 0, width, height);

          ctx.beginPath();
          ctx.rect(0, 0, width, height);

          if ($scope.bgColor)
            ctx.fillStyle = $scope.bgColor;
          else
            ctx.fillStyle = '#969696';
          ctx.fill();

          // Run through the tags and render each one in the correct location.
          if ($scope.tags) {

            for (var i=0; i<$scope.tags.length; ++i) {

              var tag = $scope.tags[i];

              // This is the pixel location.
              var location = Math.floor((tag.tagTime / $scope.duration) * width);

              ctx.beginPath();
              ctx.rect(location-3, 0, 7, height); // location is the center

              if (tag.tagTypeString == 'positive')
                ctx.fillStyle = '#60d293';
              else
                ctx.fillStyle = '#ff6669';

              ctx.fill();
            }
          }

          // Draw the cursor
          var finalLocation = Math.floor(($scope.currentTime / $scope.duration) * width);

          ctx.beginPath();
          ctx.rect(finalLocation, 0, 2, height);

          ctx.fillStyle = '#fff';
          ctx.fill();
        }

        drawCanvas();

      }]
    };
  });

  module.directive('healthSelector', ['$window', function($window) {

    return {
      restrict: 'E',
        templateUrl: "templates/healthSelector.html",
        replace: true,
        scope: {
          habit: '=',
          value: '=',
          editingGoals: '=',
          redraw: '=',
          callbacks: '=',
          removeEmptyState: '=',
          disabled: '='
        },
        link: function(scope, element, attrs) {


          angular.element($window).bind('resize', function() {
            scope.drawCanvas();
            scope.$apply();
          });

        },
        controller: ['$scope', '$element', '$timeout', '$analytics', 'MediaService', 'GeneralService', 'HabitsService', 'Environment', function($scope, $element, $timeout, $analytics, MediaService, GeneralService, HabitsService, Environment) {

          var initialValue = $scope.value;

          $scope.$watch('redraw', function(newValue, oldValue) {

            $scope.drawCanvas();
          });

          $scope.$watch('habit', function(newValue, oldValue) {

            $scope.drawCanvas();
          });

          $scope.canvasScale = window.devicePixelRatio;

          var canvas = $element.find("canvas")[0];
          var ctx = canvas.getContext("2d");

          var elementWidth = $(canvas).innerWidth();
          var elementHeight = $(canvas).innerHeight();

          if (canvas.width != (elementWidth * $scope.canvasScale))
            canvas.width = elementWidth * $scope.canvasScale;
          if (canvas.height != (elementHeight * $scope.canvasScale))
            canvas.height = elementHeight * $scope.canvasScale;

          var width = canvas.width;
          var height = canvas.height;

          var firstSection = $scope.removeEmptyState ? 0.0 : 0.1; // 10%
          var secondSection;
          var thirdSection;

          var selectorHeight;
          var maxForSelector;

          function updateSections() {

            firstSection = $scope.removeEmptyState ? 0.0 : 0.1;

            var sectionValue;
            // Note: If the goal is minimized, we need to be sure to offset the section by 1.
            if ($scope.editingGoals) {

              sectionValue = $scope.value - 1;
            }
            else {

              sectionValue = $scope.habit.goalOrdinal;
            }

            if ($scope.habit.goalMinimized)
              sectionValue += 1;

            secondSection = (1-firstSection) * ( sectionValue / $scope.habit.habitValues.length);

            thirdSection = 1 - firstSection - secondSection;
          }

          $scope.drawCanvas = function drawCanvas() {

            // On the webapp we need to wait until the app has been initialized.
            if (!$scope.habit)
              return;

            updateSections();

            // We need to redo these every time because they can change often.
            elementWidth = $(canvas).innerWidth();
            elementHeight = $(canvas).innerHeight();

            if (canvas.width != (elementWidth * $scope.canvasScale))
              canvas.width = elementWidth * $scope.canvasScale;
            if (canvas.height != (elementHeight * $scope.canvasScale))
              canvas.height = elementHeight * $scope.canvasScale;

            width = canvas.width;
            height = canvas.height;

            selectorHeight = 30 * $scope.canvasScale;

            if ($scope.removeEmptyState)
              maxForSelector = width * (1 / $scope.habit.habitValues.length);
            else {

              maxForSelector = Math.min(width * firstSection, (width * (1 - firstSection)) * (1 / $scope.habit.habitValues.length));
            }

            // We don't want the selector to display larger than the first section.
            while (selectorHeight > maxForSelector) {

              selectorHeight *= 0.8;
            }

            var barHeight = 5 * $scope.canvasScale;

            ctx.clearRect(0, 0, width, height);

            var middle = height / 2;

            ctx.fillStyle = '#aaaaaa';
            ctx.beginPath();
            ctx.rect(0, middle - (barHeight/2), width*firstSection, barHeight);
            ctx.fill();

            if ($scope.habit.id == 1)
              ctx.fillStyle = GeneralService.COLORS[$scope.value-1];
            else if ($scope.disabled)
              ctx.fillStyle = 'cccccc';
            else if ($scope.habit.goalMinimized)
              ctx.fillStyle = '#60d293';
            else
              ctx.fillStyle = '#ff6669';

            ctx.beginPath();
            ctx.rect(width*firstSection, middle - (barHeight/2), width*secondSection, barHeight);
            ctx.fill();

            if ($scope.disabled || $scope.habit.id == 1)
              ctx.fillStyle = 'cccccc';
            else if ($scope.habit.goalMinimized)
              ctx.fillStyle = '#ff6669';
            else
              ctx.fillStyle = '#60d293';

            ctx.beginPath();
            ctx.rect(width*(firstSection+secondSection), middle - (barHeight/2), width*thirdSection, barHeight);
            ctx.fill();

            // Draw the selector.

            var position = getSelectorPosition();

            if ($scope.value === 0) {

              ctx.fillStyle = '#ffffff';

              ctx.beginPath();
              ctx.arc(position, middle, (selectorHeight /2), 0, 2*Math.PI);
              ctx.fill();

              ctx.fillStyle = '#cccccc';

              ctx.beginPath();
              ctx.arc(position, middle, (selectorHeight /2) * 0.7, 0, 2*Math.PI);
              ctx.fill();
            }
            else {

              if ($scope.habit.id == 1)
                ctx.fillStyle = GeneralService.COLORS[$scope.value-1];
              else if ($scope.disabled)
                ctx.fillStyle = 'cccccc';
              else if (HabitsService.metGoal($scope.habit, $scope.value-1) || $scope.editingGoals)
                ctx.fillStyle = '#60d293';
              else
                ctx.fillStyle = '#ff6669';

              ctx.beginPath();
              ctx.arc(position, middle, (selectorHeight /2), 0, 2*Math.PI);
              ctx.fill();
            }

          }

          function getSelectorPosition() {

            if ($scope.value === 0) {

              return (width * firstSection) / 2;
            }
            else {

              var segments = $scope.habit.habitValues.length;
              var segmentSize = (width * (1-firstSection)) / segments;

              return (width*firstSection) + (segmentSize / 2) + (($scope.value-1) * segmentSize);
            }
          }

          function handleUpdate(evt) {

            evt.preventDefault();
            evt.stopPropagation();

            if ($scope.disabled) {

              if ($scope.callbacks.disabledInteraction)
                $scope.callbacks.disabledInteraction();
              return;
            }


            var width = canvas.width;

            var mousePos = getMousePos(canvas, evt);

            // Not handled in the function for legacy reasons.
            mousePos.x *= $scope.canvasScale;

            var percentage = mousePos.x / width;

            var newValue;

            if (percentage < firstSection) {

              // We can't set a goal to non-existant, and we can't unset existing values.
              if ($scope.editingGoals || (initialValue > 0))
                newValue = 1;
              else
                newValue = 0;
            }
            else {

              var segments = $scope.habit.habitValues.length;
              var segmentWidth = width / segments;

              var firstSectionWidth = firstSection * width;

              var newX = mousePos.x - firstSectionWidth;
              var newWidth = width - firstSectionWidth;

              percentage = newX / newWidth;

              // For when then mouse is over the last pixel.
              if (percentage >= 1)
                percentage = 0.9999;

              newValue = Math.floor(segments * percentage) + 1;
            }

            if (newValue != $scope.value) {

              $scope.value = newValue;
              $scope.drawCanvas();

              if(!$scope.$$phase) {
                $scope.$apply();
              }

              if ($scope.callbacks && $scope.callbacks.valueUpdated) {

                $scope.callbacks.valueUpdated($scope.habit);
              }
            }
          }

          function didTouchSelector(evt) {

            // Mouse coordinates are relative to the element, but we need to do the math relative to the canvas,
            // which is typically twice as big.
            var mousePos = getMousePos(canvas, evt);

            // This is an x coordinate
            var selectorPos = getSelectorPosition();

            var xDiff = Math.abs(mousePos.x - (selectorPos / $scope.canvasScale));
            var yDiff = Math.abs(mousePos.y - ((height / $scope.canvasScale) / 2));

            // NOTE: If we were doing this 'correctly' we would use selectorHeight / 2, but I want to expand the click area
            // so we're leaving it as selectorHeight
            var result = (xDiff <= (selectorHeight / $scope.canvasScale)) && (yDiff <= (selectorHeight / $scope.canvasScale));

            return true; //result;
          }

          var clickedSelector = false;

          canvas.addEventListener('touchstart', function(evt) {

            clickedSelector = didTouchSelector(evt);
          }, false);

          canvas.addEventListener('touchend', function(evt) {

            clickedSelector = false;
          }, false);

          canvas.addEventListener('touchmove', function(evt) {

            if (!clickedSelector) return;

            handleUpdate(evt);
          }, false);

          canvas.addEventListener('mousedown', function(evt) {

            clickedSelector = didTouchSelector(evt);
          });

          canvas.addEventListener('mouseup', function(evt) {

            clickedSelector = false;
          });

          canvas.addEventListener('mousemove', function(evt) {

            if (!clickedSelector) return;

            handleUpdate(evt);
          });

          $scope.drawCanvas();
        }]
    };
  }]);

  module.directive('twilioVideo', twilioVideoDirective);
    function twilioVideoDirective() {
      return {
        template: '<div class="twilio-video-media-container"></div>',
        restrict: 'E',
        replace: true,
        scope: {
          tracks: '=',
        },
        link: function (scope, element, $attributes) {
          scope.$watchCollection('tracks', function (newval, oldval) {
            while (element[0].hasChildNodes()) {
              element[0].removeChild(element[0].lastChild);
            }
            scope.tracks.forEach(function(track) {
                element[0].appendChild(track.attach());
            });
          });
        }
      };
    }

  module.directive('scrollModal', [function() {
    return {
      restrict: 'C',
      link:function(scope,elem,attrs){
          scope.$on('modal.shown', function() {
            $(window).scrollTop(0);
          });
      }
    }
  }]);

  module.directive('onFinishRender', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$apply(attrs.onFinishRender);
          });
        }
      }
    }
  }]);

  module.directive('scrollTrigger', ['$window', function($window) {
      return {
          link : function(scope, element, attrs) {

              var scrollElementType = attrs.scrollElementType;
              if (scrollElementType === 'window') {
                var scrollPositionElement = $(window);  // the jQuery element used to get the scroll position                
                var scrollWatchElement = angular.element(document);  // the angular element to watch for scroll changes
              } else if (scrollElementType === 'this') {
                var scrollPositionElement = $('.chat-scroll-container');  // the jQuery element used to get the scroll position  
                var scrollWatchElement = angular.element('.chat-scroll-container');  // the angular element to watch for scroll changes
              }

              var offset = parseInt(attrs.threshold) || 0;
              var lastScrollTop = 0;

              scrollWatchElement.bind('scroll', _.debounce(function() {

                var currentScrollTop = scrollPositionElement.scrollTop();
                var isScrollingUp = currentScrollTop <= lastScrollTop;

                // bottom trigger used by communities
                var shouldTriggerFromBottom = attrs.triggerDirection === 'down';
                if (shouldTriggerFromBottom && !isScrollingUp) {
                  var hasScrolledNearBottom = $(window).height() + $(window).scrollTop() >= ($(document).height() - offset);
                  if (hasScrolledNearBottom) {
                    scope.isLoadingMore = true;
                    scope.$apply(attrs.scrollTrigger);
                  }
                }

                // top trigger used by groups
                var shouldTriggerFromTop = attrs.triggerDirection === 'up';
                if (shouldTriggerFromTop && isScrollingUp) {
                  var hasScrolledNearTop =  currentScrollTop <= offset;
                  if (hasScrolledNearTop) {
                    scope.isLoadingMore = true;
                    scope.$apply(attrs.scrollTrigger);
                  }
                }

                lastScrollTop = currentScrollTop;
                scope.isLoadingMore = false;

              }, 1000, true));
          }
      };
  }]);

  module.directive('closeHandler', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      link:function(scope,elem,attrs){
        scope.$on('modal.shown', function(self, modal) {
          $rootScope.closeActiveModal = function() {
            scope.$eval(attrs.closeHandler);
          }
        });
        scope.$on('modal.hidden', function(self, modal) {
          $rootScope.closeActiveModal = undefined;
        });
      }
    }
  }]);

  module.directive('scrollTopOnShow', [function() {
    return {
      restrict: 'A',
      link:function(scope,elem,attrs){
        scope.$watch(function() {
          return elem.is(':visible');
        }, function(newVal, oldVal) {
          if (newVal === true) {
            $(window).scrollTop(0);
          }
        });
      }
    }
  }]);
  
  module.directive('dropdownButton', ['$timeout', function($timeout) {
    /* This directive is kind of lame - LW
    It relies on the following structure:
    <button></button>
    <ul><li></li></ul>
    It handles the following:
    - Opening/closing the drop down when the button is clicked
    - Closing the menu when clicked outside of it 
    */
    return {
      restrict: 'E',
      scope: {
        isShown: '='
      },
      link: function (scope, element, attrs) {
        var button = element.find('a');
        var dropdown = element.find('ul');
        var clickEvent = "click.clickAway";

        // Set the default state
        if (!scope.isShown) {
          dropdown.addClass('ng-hide');
        }

        var documentClickHandler = function(event) {
          if (!$(event.target).closest(element).length || element.find('ul')[0] == event.target.parentElement) {
            scope.$apply(function () {
              if(scope.isShown){
                toggleMenu();
              }
            });
          }
        }        
        var addEvent = function(){
          jQuery(document).on(clickEvent, documentClickHandler);
        }

        var removeEvent = function(){
          jQuery(document).off(clickEvent, documentClickHandler);
        }

        /* When the element is removed, clean up the click handler */
        scope.$on('$destroy', function () {
            removeEvent();
        });

        var toggleMenu = function(){
          if(!scope.isShown){
            dropdown.removeClass('ng-hide');
            scope.isShown = true;
            addEvent();
          } else {
            dropdown.addClass('ng-hide');
            scope.isShown = false;
            removeEvent();
          }
        };

        button.on('click', toggleMenu);
      }
    }
  }]);

  module.directive('hcChart', function () {
    return {
      restrict: 'E',
      template: '<div></div>',
      scope: {
        config: '=',
        ready: '=',
        watchData: '=',
        redrawvar: '=',
        type: '@' // can be 'sparkline'
      },
      link: function (scope, element) {
        var renderChart = function(){
          // Sometimes this doesn't appear to be there?
          if (!scope.config)
            return;

          // Disable credits for all charts.
          scope.config.credits = {
            enabled: false
          };

          if (scope.type == 'sparkline')
            scope.chartObj = Highcharts.SparkLine(element[0], scope.config);
          else
            scope.chartObj = Highcharts.chart(element[0], scope.config);
        }
        scope.$watch('ready', function(newVal, oldVal) {
          if(newVal != oldVal && newVal){
            renderChart();
          }
        });
        scope.$watch('watchData', function(newVal, oldVal){
          if(newVal != oldVal){
            renderChart();
          }
        });
        scope.$watch('redrawvar', function(newVal, oldVal){
          if(newVal != oldVal){
            renderChart();
          }
        });
        if(scope.ready){
          renderChart();
        }

      }
    };
  });

  module.service('ngCopy', ['$window', function ($window) {
    var body = angular.element($window.document.body);
    var textarea = angular.element('<textarea/>');
    textarea.css({
      position: 'fixed',
      opacity: '0'
    });

    return function (toCopy) {
      textarea.val(toCopy);
      body.append(textarea);
      textarea[0].select();

      try {
        var successful = document.execCommand('copy');
        if (!successful) throw successful;
      } catch (err) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
      }

      textarea.remove();
    }
  }]);
  module.directive('ngClickCopy', ['ngCopy', function (ngCopy) {
    return {
      restrict: 'A',
      scope: {
        callback: '='
      },
      link: function (scope, element, attrs) {
        element.bind('click', function (e) {
          ngCopy(attrs.ngClickCopy);
          if(scope.callback){
            scope.callback(attrs.ngClickCopy);
          }
        });
      }
    }
  }]);

  module.directive('ngDraggable', ['$document', function($document) {
    return {
      restrict: 'A',
      scope: {
        dragOptions: '=ngDraggable',
        fullscreen: '='
      },
      link: function(scope, elem, attr) {

        var startX, startY, x = 0, y = 0,
            start, stop, drag, container;

        var width  = elem[0].offsetWidth,
            height = elem[0].offsetHeight;

        // Obtain drag options
        if (scope.dragOptions) {
          start  = scope.dragOptions.start;
          drag   = scope.dragOptions.drag;
          stop   = scope.dragOptions.stop;
          var id = scope.dragOptions.container;
          if (id) {
              container = document.getElementById(id).getBoundingClientRect();
          }
        }

        function bindEvents(){
          console.log('bind');
          // Bind mousedown event
          elem.on('mousedown', function(e) {
            e.preventDefault();
            startX = e.clientX - elem[0].offsetLeft;
            startY = e.clientY - elem[0].offsetTop;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            if (start) start(e);
          });        
        }
  
        // Handle drag event
        function mousemove(e) {
          y = e.clientY - startY;
          x = e.clientX - startX;
          setPosition();
          if (drag) drag(e);
        }

        // Unbind drag events
        function mouseup(e) {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
          if (stop) stop(e);
        }

        // Move element, within container if provided
        function setPosition() {
          if (container) {
            if (x < container.left) {
              x = container.left;
            } else if (x > container.right - width) {
              x = container.right - width;
            }
            if (y < container.top) {
              y = container.top;
            } else if (y > container.bottom - height) {
              y = container.bottom - height;
            }
          }

          elem.css({
            top: y + 'px',
            left:  x + 'px',
            bottom: 'auto'
          });
        }
        
        function unbindEvents(){
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
          elem.unbind('mousedown');
        }

        scope.$watch('fullscreen', function(newVal, oldVal){
          if(newVal){
            unbindEvents();
            elem.css({
              top: '0px',
              left: '0px'
            });
          } else {
            bindEvents();
            elem.css({
              bottom: '0px',
              top: 'auto'
            });
          }
        });

        bindEvents();
      }
    }
  }]);

  module.directive('clientSearch', ['$state', function($state) {
    return {
      restrict: 'E',
      templateUrl: "templates/practitioner/client-search.directive.html",
      link: function(scope, element, attr) {
        
        var clickEvent = "click.clickAway";
        var dropdown = element.find('ul');
        scope.emptyResults = false;

        scope.clearClientSearch = function(event){
          if(event.target.id != 'clientSearchInput'){
            scope.searchResults = [];
          }
        };
        scope.onSelectClient = function(index){
          var client = scope.searchResults[index];
          scope.userSearch = '';
          scope.searchResults = [];
          scope.clientSearchInput = '';
          scope.isShown = false;
          removeEvent();
          scope.goToClient(client.account.id);
        };
        scope.clientSearchInput = '';
        scope.searchResults = [];

        scope.filterClients = function(){
          if(scope.clientSearchInput == ''){
            hideResults();
            return;
          }
          scope.isShown = true;
          scope.emptyResults = false;
          addEvent();
          scope.searchResults = _.filter(scope.clients, function(s){
            return s.fullName.toLowerCase().indexOf(scope.clientSearchInput.toLowerCase()) > -1 });
          if(scope.searchResults.length == 0 && scope.clientSearchInput.length > 0){
            scope.emptyResults = true;
          }
        };
  
        var hideResults = function(){
          dropdown.addClass('ng-hide');
          scope.isShown = false;
          removeEvent();          
        }

        var documentClickHandler = function(event) {
          if (!$(event.target).closest(element).length || element.find('ul')[0] == event.target.parentElement) {
            scope.$apply(function () {
              if(scope.isShown){
                  hideResults();
              }
            });
          }
        }        
        var addEvent = function(){
          jQuery(document).on(clickEvent, documentClickHandler);
        }

        var removeEvent = function(){
          jQuery(document).off(clickEvent, documentClickHandler);
        }

        /* When the element is removed, clean up the click handler */
        scope.$on('$destroy', function () {
            removeEvent();
        });

      }
    }
  }]);

  module.directive('coachBanner', function() {
    return {
      restrict: 'E',
      scope: {
        name: '=',
        avatarUrl: '=',
        showLabel: '='
      },
      templateUrl: 'templates/practitioner/coach-banner.directive.html'
    }
  });

  module.directive('coachesSearch', function($state) {
    return {
      restrict: 'E',
      scope: {
        placeholder: '='
      },
      templateUrl: "templates/practitioner/coaches-search.directive.html",
      link: function(scope, element, attr) {
        
        var clickEvent = "click.clickAway";
        var dropdown = element.find('ul');
        scope.emptyResults = false;

        scope.clearClientSearch = function(event){
          if(event.target.id != 'clientSearchInput'){
            scope.searchResults = [];
          }
        };
        scope.onSelectClient = function(index){
          var client = scope.searchResults[index];
          scope.userSearch = '';
          scope.searchResults = [];
          scope.clientSearchInput = '';
          scope.isShown = false;
          removeEvent();
          scope.goToClient(client.account.id);
        };
        scope.clientSearchInput = '';
        scope.searchResults = [];

        scope.filterClients = function(){
          if(scope.clientSearchInput == ''){
            hideResults();
            return;
          }
          scope.isShown = true;
          scope.emptyResults = false;
          addEvent();
          scope.searchResults = _.filter(scope.clients, function(s){
            return s.fullName.toLowerCase().indexOf(scope.clientSearchInput.toLowerCase()) > -1 });
          if(scope.searchResults.length == 0 && scope.clientSearchInput.length > 0){
            scope.emptyResults = true;
          }
        };
  
        var hideResults = function(){
          dropdown.addClass('ng-hide');
          scope.isShown = false;
          removeEvent();          
        }

        var documentClickHandler = function(event) {
          if (!$(event.target).closest(element).length || element.find('ul')[0] == event.target.parentElement) {
            scope.$apply(function () {
              if(scope.isShown){
                  hideResults();
              }
            });
          }
        }        
        var addEvent = function(){
          jQuery(document).on(clickEvent, documentClickHandler);
        }

        var removeEvent = function(){
          jQuery(document).off(clickEvent, documentClickHandler);
        }

        /* When the element is removed, clean up the click handler */
        scope.$on('$destroy', function () {
            removeEvent();
        });

      }
    }
  });

  module.directive('coachesTable', ['$state', '$ionicPopup', '$translate', function ($state, $ionicPopup, $translate) {
    return {
      restrict: 'E',
      scope: {
        coaches: '<',
        onSort: '&',
        sortedBy: '<'
      },
      templateUrl: "templates/careteam/coaches/coaches-table.directive.html",
      link: function(scope, element, attr) {
        var SortOrder = {
          ASC: 'asc',
          DESC: 'desc'
        };

        scope.showingCoachDropdown = false;

        scope.sortField = function(field) {
          var sortedBy = scope.sortedBy;
          var order = null;

          if (sortedBy.field === field) {
            if (sortedBy.order === SortOrder.ASC) {
              order = SortOrder.DESC;
            } else {
              order = SortOrder.ASC;
            }
          }

          scope.onSort({
            sortDetails: {
              field: field,
              order: order || 'asc'
            }
          });
        }

        scope.viewCoach = function(coach) {

          $state.go('practitioner.account', {'coachId': coach.practitionerId});
        };
      }
    }
  }]);

  module.directive('individualsTable', ['$state', '$ionicPopup', '$translate', 'AccountService', function ($state, $ionicPopup, $translate, AccountService) {
    return {
      restrict: 'E',
      scope: {
        individuals: '<',
        onSort: '&',
        sortedBy: '<',
        onAssign: '&',
        isManagerView: '<',
        isBackendCoachView: '<'
      },
      templateUrl: "templates/careteam/individuals/individuals-table.directive.html",
      link: function(scope, element, attr) {
        var SortOrder = {
          ASC: 'asc',
          DESC: 'desc'
        };

        scope.showingClientDropdown = false;

        scope.sortField = function(field) {
          var sortedBy = scope.sortedBy;
          var order = null;

          if (sortedBy.field === field) {
            if (sortedBy.order === SortOrder.ASC) {
              order = SortOrder.DESC;
            } else {
              order = SortOrder.ASC;
            }
          }

          scope.onSort({
            sortDetails: {
              field: field,
              order: order || 'asc'
            }
          });
        };

        scope.viewClient = function(individual, tab) {

          // Need to check to see if they have a coach assigned.
          if (!individual.connectedAt) {

            $ionicPopup.alert({template: $translate.instant('COACH_NOT_CONNECTED_ERROR'), okText: $translate.instant('OK_GOT_IT'), okType: 'button-default'});
          }
          else {
            var activeTab = tab ? tab : 'activity';
            $state.go('practitioner.client.view', {activeTab: activeTab, 'clientId': individual.accountId});
          }
        };

        scope.isCoach = function() {
          return AccountService.isCoach();
        };

        scope.isBackendCoach = function() {
          return AccountService.isBackendCoach();
        };

        scope.getTimeAgo = function(timestamp) {
          if (!timestamp) {
            return null;
          }

          var parsed = moment(timestamp);
          var fromNow = parsed.fromNow();
          var timePart = parsed.format('h:mma');

          return fromNow + ', ' + timePart;
        };
      }
    }
  }]);

  module.directive('sortArrow', function() {
    return {
      restrict: 'E',
      scope: {
        order: '<'
      },
      templateUrl: "templates/careteam/individuals/sort-arrow.directive.html"
    }
  });

  module.directive('assignButton', function(OverlayService) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: "templates/careteam/individuals/assign-button.directive.html"
    }
  });

  module.directive('assignedCoach', function() {
    return {
      restrict: 'E',
      scope: {
        practitionerId: '<',
        practitionerName: '<',
        status: '<',
        connectedAt: '<',
        photo: '<'
      },
      templateUrl: "templates/careteam/individuals/assigned-coach.directive.html"
    }
  });

  module.directive('premiumStatus', ['OrganizationService', function(OrganizationService) {
    return {
      restrict: 'E',
      scope: {
        premiumStatus: '<',
        premiumExpiration: '<',
        sponsorName: '<',
        sponsorType: '<'
      },
      templateUrl: "templates/careteam/individuals/premium-status.directive.html",
      link: function(scope, element, attr) {	
        scope.orgTypeAbbreviationToName = function(orgTypeAbbreviation) {	
          return OrganizationService.orgTypeAbbreviationToName(orgTypeAbbreviation);	
        };	
      }
    }
  }]);

})();