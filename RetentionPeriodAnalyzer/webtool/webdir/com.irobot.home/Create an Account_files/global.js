;(function($) {
    $(function () {
        /* ==== COUNTRY-LANGUAGE POPUP INTERACTION EVENT HANDLERS ==== */
        var focusSelector;
        var focusCountrySelector;
        var focusLanguageSelector;
        var continueWithDetectedCountry;
        var $body = $(document.body);

        if ($body.hasClass('country-page')) {
            focusSelector = function (selectorSelector) {
                return function (e) {
                    e.preventDefault();

                    /* Show language country selector in the header */
                    var $dropdownWrapper = $(selectorSelector);
                    $(document.body).addClass('showing-select_language')
                    $('.country-detect-popup-container').addClass('hidden');
                    $('.closed-state-container').trigger('click');

                    /* Replace the label for the dropdown with "Choose a different {X}" text */
                    $dropdownWrapper.find('label').html('<strong>' + $(this).html() + '</strong>');

                    /* Focus the select dropdown */
                    $selectElement[0].focus();
                };
            };
            focusCountrySelector = focusSelector('.country-dropdown-wrapper');
            focusLanguageSelector = focusSelector('.language-dropdown-wrapper');

            continueWithDetectedCountry = function(e) {
                e.preventDefault();
                $('.country-detect-popup-banner').addClass('hidden');
                var countryAbbr = $('[data-country-abbr]').attr('data-country-abbr');
                window.location.href = setQueryStringValue('Country', countryAbbr, window.location.href);
            };
        } else if ($body.hasClass('homepage')) {
            focusSelector = function (selectorSelector) {
                return function (e) {
                    e.preventDefault();
                    $('.country-detect-popup-banner').addClass('hidden');
                    $(selectorSelector + ' .page-locale-option-link')[0].focus();
                    $(selectorSelector).addClass('focused')[0].scrollIntoView();
                };
            };
            focusCountrySelector = focusSelector('.page-country-selector');
            focusLanguageSelector = focusSelector('.page-language-selector');
        }

        $('.choose-country-link').click(focusCountrySelector);
        $('.choose-language-link').click(focusLanguageSelector);
        $('.country-continue-link').click(continueWithDetectedCountry);
        $('.country-detect-popup-banner .popup-banner-overlay').on('click touchstart', function() {
            $('.country-detect-popup-banner').addClass('hidden');
        });
        /* ==== END Country-Language Popup Interaction Event Handlers ==== */
        
        /* ==== LANGUAGE COUNTRY SELECT EVENT HANDLERS AND OPTIONS ==== */
        var $closedStateContainer = $('.closed-state-container');
        $closedStateContainer.attr('tabindex', 0);
        $closedStateContainer.attr('role', 'button');
        $closedStateContainer.on('click keydown', function(e) {
            var isKeydownEvent = e.type === 'keydown';
            if (isKeydownEvent && e.which !== 13 && e.which !== 32) {
                return;
            }
            e.preventDefault();

            $(this).parents('#select_language').toggleClass('closed open');
        });
        if (window.matchMedia) {
            var mobileViewMQL = window.matchMedia('(max-width: 767px)');
            if (mobileViewMQL.matches) {
                $closedStateContainer.attr('tabindex', null);
                $closedStateContainer.attr('role', null);
            }

            if (window.MediaQueryListEvent) {
                mobileViewMQL.addListener(function() {
                    var $closedStateContainer = $('.closed-state-container');
                    if (this.matches) {
                        $closedStateContainer.attr('tabindex', null);
                        $closedStateContainer.attr('role', null);
                    } else {
                        $closedStateContainer.attr('tabindex', 0);
                        $closedStateContainer.attr('role', 'button');
                    }
                });
            }
        }
        /* ==== END Language-Country Select Event Handlers and Options */
    });

    /* ==== GIGYA RAAS INITIALIZATION ==== */
    window.onGigyaServiceReady = function () {
        $(function () {
            var gigyaLang = document.documentElement.getAttribute('data-gigya-lang');
            var availableScreenSets = [{
                containerID: 'gigya-login',
                lang: gigyaLang,
                screenSet: 'iRobot-RegistrationLogin',
                startScreen: 'gigya-login-screen'
            },
            {
                containerID: 'gigya-register',
                lang: gigyaLang,
                screenSet: 'iRobot-RegistrationLogin',
                startScreen: 'gigya-register-screen'
            },
            {
                containerID: 'gigya-reset',
                lang: gigyaLang,
                screenSet: 'iRobot-RegistrationLogin',
                startScreen: 'gigya-reset-password-screen'
            },
            {
                containerID: 'gigya-app-reset',
                lang: gigyaLang,
                screenSet: 'iRobot-RegistrationLogin',
                startScreen: 'gigya-app-reset-password-screen'
            },
            {
                containerID: 'gigya-profile',
                lang: gigyaLang,
                screenSet: 'iRobot-ProfileUpdate',
            }];

            var screenSetsToRender = gigya.accounts ? availableScreenSets.filter(function (screenSet) {
                return $('#' + screenSet.containerID).length > 0;
            }) : [];

            if (screenSetsToRender.length) {
                var screenSetIDsToRender = screenSetsToRender.map(function (screenSet) {
                    return screenSet.screenSet;
                });

                screenSetsToRender.forEach(gigya.accounts.showScreenSet);

                // Disable preloading for now
                //gigya.accounts.getScreenSets({
                //    screenSetIDs: screenSetIDsToRender.join(),
                //    include: 'screenSetID,html,css',
                //    callback: renderScreenSets
                //});
            }

            // Function for preloading gigya screens
            //function renderScreenSets(response) {
            //    if (response.screenSets.length) {
            //        var screenSetHtml = response.screenSets.reduce(function (html, screenSet) {
            //            return html +
            //                '<div id="__gigyaScreenSet_' + screenSet.screenSetID + '" style="display: none;">' +
            //                    screenSet.html +
            //                '</div>';
            //        }, '<style>' + response.screenSets[0].css + '</style>');
            //        $(document.body).prepend(screenSetHtml);
            //        screenSetsToRender.forEach(gigya.accounts.showScreenSet);
            //    }
            //}

            gigya.accounts.addEventHandlers({
                onLogin: onGigyaLogin,
                onLogout: onGigyaLogout
            });

            function onGigyaLogin(e) {
                var loginUrl = window.location.href;
                loginUrl = setQueryStringValue('u', encodeURIComponent(e.UID), loginUrl);
                loginUrl = setQueryStringValue('s', encodeURIComponent(e.UIDSignature), loginUrl);
                loginUrl = setQueryStringValue('t', encodeURIComponent(e.signatureTimestamp), loginUrl);
                loginUrl = setQueryStringValue('e', encodeURIComponent(e.profile.email), loginUrl);
                window.location = loginUrl;
            }

            function onGigyaLogout() {
                window.location = "/Manage-Your-Account/Logout";
            }
        });
    };
    /* ==== END Gigya RaaS Initialization ==== */

    function setQueryStringValue(field, value, url) {
        var newFieldValuePair = field + '=' + value;

        var oldFieldValueMatch;
        var oldFieldValueRegEx = new RegExp('([?&])' + field + '=([^&#]*)', 'i');
        /* If the old pair exists in the url update the value */
        if (oldFieldValueMatch = url.match(oldFieldValueRegEx)) {
            return url.replace(oldFieldValueRegEx, oldFieldValueMatch[1] + newFieldValuePair);
        }

        /* Otherwise, add the pair to the url */
        /* Check to determine if there is even a query string in the current url to determine how to add the pair */
        newFieldValuePair = url.match(/\?[^&#]*=[^&#]*/i) ? "&" + newFieldValuePair : '?' + newFieldValuePair;

        /* Insert the new pair before the hash if there is a hash */
        var hashSplit = url.split('#');
        return hashSplit[1] ? hashSplit[0] + newFieldValuePair + "#" + hashSplit[1] : url + newFieldValuePair;
    }
})(jQuery);
