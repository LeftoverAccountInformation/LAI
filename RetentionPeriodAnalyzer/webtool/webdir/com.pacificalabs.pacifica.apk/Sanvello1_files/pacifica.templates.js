//HEAD 
(function(app) {
try { app = angular.module("pacifica-templates"); }
catch(err) { app = angular.module("pacifica-templates", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("templates/acceptTerms.modal.html","<ion-modal-view class=\"popoverr hipaa agreement scroll-modal\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\">\n" +
    "    <div class=\"box\">\n" +
    "      <h1>{{ 'PRIVACY_UPDATE' | translate }}</h1>\n" +
    "      <p ng-bind-html=\"getUpdatedAgreementText()\"></p><br>\n" +
    "      <p><em>{{ 'AGREEMENT_HEADLINE1' | translate }}</em><br>\n" +
    "         {{ 'AGREEMENT_PARAGRAPH1' | translate }}</p><br>\n" +
    "\n" +
    "      <p class=\"nomargin\"><em>{{ 'AGREEMENT_HEADLINE2' | translate }}</em></p>\n" +
    "         <ul>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH2' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH3' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH4' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH5' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH6' | translate }}</li>\n" +
    "         </ul><br>\n" +
    "\n" +
    "      <p><em>{{ 'AGREEMENT_HEADLINE3' | translate }}</em></p>\n" +
    "      <button ng-click=\"acceptTerms()\" class=\"button-start\">{{ 'I_UNDERSTAND' | translate }}</button>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/account.2fa.modal.html","<ion-modal-view class=\"generic-modal scroll-modal twofa-modal\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <i class=\"ion-ios-close-empty close\"\n" +
    "         aria-label=\"{{ 'ARIA_GO_BACK' | translate }}\"\n" +
    "         ng-click=\"cancelModal()\"\n" +
    "         style=\"color:#666\">\n" +
    "        <span>{{ 'CLOSE' | translate }}</span>\n" +
    "      </i> \n" +
    "\n" +
    "      <div class=\"box\">\n" +
    "        <div class=\"clearfix\">\n" +
    "\n" +
    "          <i class=\"ion-ios-locked\" aria-hidden=\"true\"></i>\n" +
    "          <h1>{{ 'TWO_FACTOR_AUTH' | translate }}</h1>\n" +
    "          <p>{{ 'TWO_FACTOR_AUTH_SUBTITLE' | translate }} {{ userEmail  }}</p>\n" +
    "      \n" +
    "          <label for=\"code\">{{ 'ENTER_YOUR_CODE' | translate }}</label>\n" +
    "          <input type=\"text\" id=\"code\" ng-model=\"form.code\">\n" +
    "\n" +
    "          <p ng-if=\"errorMsg\" class=\"error\">{{ errorMsg }}</p>\n" +
    "\n" +
    "          <button ng-click=\"verify()\">{{ \"VERIFY\" | translate }}</button>\n" +
    "          <a href=\"javascript:;\" ng-click=\"resend()\">{{ \"SEND_AGAIN\" | translate }}</a>\n" +
    "\n" +
    "          <p ng-if=\"resenedSuccess\"> {{ resenedSuccess }}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/account.authorizeHIPAA.modal.html","<ion-modal-view class=\"generic-modal scroll-modal hipaa\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <!-- The authorization text is provided by the server. -->\n" +
    "      <div ng-bind-html=\"authorizationText\" class=\"authorizationText\"></div>\n" +
    "      <input type=\"text\" ng-model=\"data.fullName\" placeholder=\"{{ 'FULL_NAME' | translate }}\" >\n" +
    "      <p ng-show=\"nameError\" class=\"error\">{{ 'FULL_NAME_HIPAA_ERROR' | translate }}</p>\n" +
    "      <button ng-click=\"authorize()\" ng-disabled=\"busy\" class=\"button-start\">{{ 'AUTHORIZE' | translate }}</button>\n" +
    "      <button ng-click=\"deny()\" ng-disabled=\"busy\" class=\"button-start cancel\">{{ 'DENY' | translate }}</button>\n" +
    " \n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/account.connect.modal.html","<ion-modal-view class=\"generic-modal scroll-modal hipaa\" close-handler=closeConnectModal()>\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <div class=\"box\"> \n" +
    "\n" +
    "      <div ng-show=\"!enteringInvite\" class=\"big-text\">\n" +
    "        <h1>{{ 'CONNECT_TO_PRACTITIONER' | translate}}<br><em>{{ getPractitionerName(practitionerData.practitioner) }}<br>{{ practitionerData.practitioner.location.address }}<br>{{ practitionerData.practitioner.location.city }}, {{ practitionerData.practitioner.location.state }}</em></h1>\n" +
    "        <p ng-bind-html=\"getAuthorizationText()\" class=\"authorization-text\"></p>\n" +
    "        <div class=\"clearfix\">\n" +
    "          <button ng-click=\"connectToPractitioner()\" class=\"button-start\">{{ 'CONNECT' | translate }}</button>\n" +
    "          <button ng-click=\"closeConnectModal()\" class=\"button-start cancel\">{{ 'CANCEL_LOWER' | translate }}</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"enteringInvite\">\n" +
    "        <h1>{{ 'ENTER_INVITE_CODE' | translate}}<br><span>({{ 'FROM_CLINICIAN' | translate }})</span></h1> \n" +
    "        <input type=\"text\" placeholder=\"{{ 'INVITE_CODE' | translate }}\" ng-model=\"practitionerData.inviteCode\">\n" +
    "        <p>{{ 'CONNECT_TO_PRACTITIONER_SUB' | translate }} {{ 'CONNECT_TO_PRACTITIONER_SUB2' | translate }} <strong>sanvello.com/clinicians</strong> {{ 'CONNECT_TO_PRACTITIONER_SUB3' | translate }}</p>\n" +
    "        <div class=\"clearfix\">\n" +
    "        <button ng-click=\"connectToPractitioner()\" class=\"button-start\">{{ 'FIND_INVITE' | translate }}</button>\n" +
    "        <button ng-click=\"closeConnectModal()\" class=\"button-start cancel\">{{ 'CANCEL_LOWER' | translate }}</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    " \n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/account.delete.modal.html","<ion-modal-view class=\"generic-modal delete scroll-modal\">\n" +
    "  <ion-content class=\"filter-popover\">\n" +
    "\n" +
    "      <h1 focus-on-open>{{ 'DELETE_ACCOUNT' | translate }}</h1>\n" +
    "      <p>{{ 'DELETE_ACCOUNT_TEXT' | translate }}</p>\n" +
    "      <form>\n" +
    "        <label for=\"delete-text\">{{ 'TYPE_DELETE' | translate }}</label>\n" +
    "        <input type=\"text\" id=\"delete-text\" placeholder=\"{{ 'DELETE' | translate }}\" ng-model=\"confirmData.inputText\" />\n" +
    "        <p ng-if=\"confirmError\" class=\"error\">{{ 'DELETE_ACCOUNT_ERROR' | translate }}</p>\n" +
    "        <label for=\"whyDelete\">{{ 'HOW_CAN_PACIFICA_DO_BETTER' | translate }}</label>\n" +
    "        <textarea id=\"whyDelete\" ng-model=\"confirmData.reason\"></textarea>\n" +
    "        <div class=\"clearfix\">\n" +
    "          <button ng-click=\"closeDeleteModal()\" class=\"button-start cancel\">{{ 'CANCEL' | translate }}</button>\n" +
    "          <button ng-click=\"confirmDelete()\" class=\"button-start\">{{ 'DELETE' | translate }}</button>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "\n" +
    "    </div>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/account.deleteDataDisclaimer.modal.html","<ion-modal-view class=\"popoverr\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\">\n" +
    "\n" +
    "  	<p>{{ 'DATA_DELETION_DISCLAIMER' | translate }}</p>\n" +
    "    <button ng-click=\"closeDeleteDataDisclaimer()\" >{{ 'OK_GOT_IT' | translate }}</button>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/account.html","<div class=\"account-view\">\n" +
    "\n" +
    "		<h1>{{ 'ACCOUNT' | translate }}</h1>\n" +
    "\n" +
    "		<div class=\"item-divider\">{{ 'PROFILE_DETAILS' | translate }}</div>\n" +
    "\n" +
    "		<div class=\"row\" ng-show=\"!editingName\" ng-click=\"showUpdateName()\">\n" +
    "			<div class=\"col-md-3 text-light\">\n" +
    "				{{ 'NICKNAME' | translate }}\n" +
    "			</div>\n" +
    "			<div class=\"col-md-9\">\n" +
    "				{{ accountUser.user.name }}\n" +
    "				<i class=\"icon ion-ios-compose-outline edit\"></i>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row is-input\" ng-show=\"editingName\">\n" +
    "			<input type=\"text\" ng-model=\"accountData.name\">\n" +
    "			<div class=\"button-wrap\">\n" +
    "			<button ng-click=\"updateName()\" ng-disabled=\"updatingName\">{{ 'UPDATE' | translate }}</button>\n" +
    "			<button ng-click=\"cancelUpdateName()\" class=\"cancel\">{{ 'CANCEL_LOWER' | translate }}</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row\" >\n" +
    "			<div class=\"col-md-3\">\n" +
    "				{{ 'EMAIL' | translate }}\n" +
    "			</div>\n" +
    "			<div class=\"col-md-9\">\n" +
    "				{{ accountUser.user.email }}\n" +
    "				<span ng-if=\"isEmailValidated()\"><img src=\"/img/checkmark.svg\" class=\"validated\"></span>\n" +
    "        		<i class=\"icon ion-ios-compose-outline edit\" ng-click=\"updateEmail()\"></i>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row flex-row\" ng-click=\"updatePassword()\">\n" +
    "			<i class=\"icon ion-ios-password\"></i>{{ 'CHANGE_PASSWORD' | translate }}\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row is-input\" ng-show=\"editingEmail\">\n" +
    "			<input type=\"text\" ng-model=\"accountData.email\">\n" +
    "			<div class=\"button-wrap\">\n" +
    "			<button ng-click=\"updateEmail()\" ng-disabled=\"updatingEmail\">{{ 'UPDATE' | translate }}</button>\n" +
    "			<button ng-click=\"cancelUpdateEmail()\" class=\"cancel\">{{ 'CANCEL_LOWER' | translate }}</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				{{ 'ACCOUNT_TYPE' | translate }}\n" +
    "			</div>\n" +
    "			<div class=\"col-md-9\">\n" +
    "				{{getAccountType()}} <button ng-click=\"goToUpgrade()\" ng-show=\"false && isLoggedIn() && !isPremium() && (isPractitioner() || !isPHI())\">{{ 'UPGRADE' | translate }}</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row\" ng-show=\"isPremium()\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				{{ 'EXPIRES_ON' | translate }}\n" +
    "			</div>\n" +
    "			<div class=\"col-md-9\">\n" +
    "				{{getPremiumExpiration()}}\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row row-action\" ng-show=\"hasDownloadedGiftCodes()\" ng-click=\"downloadGiftCodes()\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				<a href=\"javascript:;\">{{ 'DOWNLOAD_GIFT_CODES' | translate }}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"row row-action\" ng-show=\"isWebSubscription()\" ng-click=\"cancelSubscription()\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				<a href=\"javascript:;\">{{ 'CANCEL_SUBSCRIPTION' | translate }}</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"item-divider\">{{ 'CONNECTIONS' | translate }}</div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"row row-action\" ng-repeat=\"connection in practitionerConnections\">\n" +
    "\n" +
    "    	<div class=\"col-md-12\">{{connection.firstName}} {{connection.lastName}}</div>\n" +
    "    	<div class=\"button-wrap\">\n" +
    "            <button ng-click=\"disconnectPractitioner(connection)\" class=\"disconnect\">{{ 'DISCONNECT' | translate }}</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row row-action\" ng-show=\"showInsecureEmailPreference()\">\n" +
    "      <label>\n" +
    "      	{{ 'ALLOW_PHI_IN_EMAIL' | translate }}\n" +
    "      	<input type=\"checkbox\" ng-model=\"insecureEmail.checked\" ng-change=\"updateInsecureEmailPreference()\">\n" +
    "      </label><br>\n" +
    "\n" +
    "			<label>\n" +
    "      	{{ 'ALLOW_PHI_IN_PUSHES' | translate }}\n" +
    "      	<input type=\"checkbox\" ng-model=\"insecurePushes.checked\" ng-change=\"updateInsecurePushPreference()\">\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row row-action\" ng-click=\"connectPractitioner = !connectPractitioner\" ng-show=\"!connectPractitioner\">\n" +
    "        <img src=\"/img/share.svg\">\n" +
    "        {{ 'CONNECT_TO_PRACTITIONER' | translate }}<br>\n" +
    "         <em>{{ 'CONNECT_TO_PRACTITIONER_SUB4' | translate }}</em>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row is-input\" ng-show=\"connectPractitioner\">\n" +
    "\n" +
    "    	<div ng-show=\"enteringInvite\">\n" +
    "	        <input type=\"text\" placeholder=\"Enter Invite Code\" ng-model=\"practitionerData.inviteCode\">\n" +
    "      	</div>\n" +
    "\n" +
    "      	<div ng-show=\"!enteringInvite\" class=\"entering-invite\">\n" +
    "      		{{ 'CONNECT_TO' | translate}}: <strong>{{ getPractitionerDetails(practitionerData.practitioner) }}</strong><br><br>\n" +
    "	        <p ng-bind-html=\"getAuthorizationText()\"></p>\n" +
    "      	</div>\n" +
    "\n" +
    "      	<div class=\"button-wrap\">\n" +
    "          <button ng-click=\"useInviteCode()\" ng-disabled=\"submittingInvite\">{{ enteringInvite ? 'FIND_INVITE' : 'CONNECT' | translate }}</button>\n" +
    "          <button ng-click=\"cancelConnectPractitioner()\" class=\"cancel\">{{ 'CANCEL_LOWER' | translate }}</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "		<div class=\"item-divider\">{{ 'ACCOUNT_SETTINGS' | translate }}</div>\n" +
    "\n" +
    "		<div class=\"row row-action flex-row\" ng-click=\"changeLanguage()\" ng-class=\"{updated: languageUpdated}\">\n" +
    "			<i class=\"icon ion-ios-world-outline\"></i>\n" +
    "			{{ 'LANGUAGE' | translate }}\n" +
    "		</div>\n" +
    "		<div style=\"overflow: hidden;\" ng-show=\"editingLanguage\">\n" +
    "\n" +
    "			<span ng-click=\"setLanguage('en-us')\" ng-class=\"{active: isLanguageActive('en-us')}\" class=\"language-options\">{{ 'ENGLISH' | translate }} (US)</span>\n" +
    "			<span ng-click=\"setLanguage('en-gb')\" ng-class=\"{active: isLanguageActive('en-gb')}\" class=\"language-options\">{{ 'ENGLISH' | translate }} (GB)</span>\n" +
    "			<span ng-click=\"setLanguage('fr')\" ng-class=\"{active: isLanguageActive('fr')}\" class=\"language-options\">{{ 'FRENCH' | translate }}</span>\n" +
    "			<span ng-click=\"setLanguage('es')\" ng-class=\"{active: isLanguageActive('es')}\" class=\"language-options\">{{ 'SPANISH' | translate }}</span>\n" +
    "\n" +
    "			<span ng-click=\"stopEditingLanguage()\" class=\"language-options cancel\">{{ 'CANCEL' | translate}}</span>\n" +
    "		</div>\n" +
    "\n" +
    "		<a class=\"row row-action flex-row icon-row\" href=\"http://help.sanvello.com\" target=\"_blank\">\n" +
    "			<i class=\"icon ion-ios-help-outline\"></i>\n" +
    "			{{ 'HELP' | translate }}\n" +
    "		</a>\n" +
    "\n" +
    "\n" +
    "		<div ng-hide=\"hide2FA()\" class=\"row row-action twofa flex-row icon-row\" ng-click=\"toggleTwoFactorAuth()\" role=\"button\">\n" +
    "\n" +
    "	    	<i class=\"icon ion-ios-locked-outline\" aria-hidden=\"true\"></i>\n" +
    "	    	<span>{{ 'TWO_FACTOR_AUTH' | translate }}</span>\n" +
    "\n" +
    "		    <input type=\"checkbox\" ng-model=\"twoFactorAuthBool\">\n" +
    "\n" +
    "		</div>\n" +
    "\n" +
    "\n" +
    "		<a class=\"row row-action flex-row icon-row\" href=\"mailto:info@sanvello.com\" target=\"_blank\">\n" +
    "			<i class=\"icon ion-ios-paperplane-outline\"></i>\n" +
    "			{{ 'GIVE_FEEDBACK' | translate }}\n" +
    "		</a>\n" +
    "		<div class=\"row row-action flex-row icon-row\">\n" +
    "			<i class=\"icon ion-ios-sanvello\"></i>\n" +
    "			{{ 'VERSION' | translate }}: {{ appVersion }} &copy;Sanvello Health {{ copyrightYear }}. {{ 'ALL_RIGHTS_RESERVED' | translate }}.\n" +
    "		</div>\n" +
    "		<a class=\"row row-action flex-row icon-row\" ng-click=\"showConfirmDelete()\">\n" +
    "      		<i class=\"icon ion-ios-trash-outline\"></i>\n" +
    "      		{{ 'DELETE_ACCOUNT' | translate }}\n" +
    "    	</a>\n" +
    "		<div class=\"row row-action flex-row\" ng-click=\"showLogout()\">\n" +
    "			<img src=\"/img/logout.svg\">{{ 'SIGN_OUT' | translate }}\n" +
    "		</div>\n" +
    "		<div style=\"overflow: hidden;\" class=\"sign-out\" ng-show=\"showingLogout\">\n" +
    "			<span class=\"language-options\">{{ 'ACCOUNT_LOGOUT_POPUP' | translate }}</span>\n" +
    "			<span ng-click=\"logout()\" class=\"language-options cancel\">{{ 'YES' | translate }}</span>\n" +
    "			<span ng-click=\"hideLogout()\" class=\"language-options cancel\">{{ 'NO' | translate }}</span>\n" +
    "		</div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/account.insecureEmail.modal.html","<ion-modal-view class=\"generic-modal scroll-modal hipaa\" close-handler=\"closeInsecureEmailModal()\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <h1>{{ 'CONNECTION_PRACTITIONER_EMAIL_TITLE' | translate}}</h1>\n" +
    "\n" +
    "      <p>{{ 'CONNECTION_PRACTITIONER_EMAIL_WARNING' | translate}}<br><br>\n" +
    "         {{ 'CONNECTION_PRACTITIONER_EMAIL_WARNING2' | translate}}\n" +
    "      </p>\n" +
    "\n" +
    "      <div class=\"clearfix\">\n" +
    "        <ion-toggle ng-model=\"insecureEmail.checked\" ng-change=\"updateInsecureEmailPreference()\" toggle-class=\"toggle-calm\">{{ 'ALLOW_PHI_IN_EMAIL' | translate}}</ion-toggle>\n" +
    "\n" +
    "        <ion-toggle ng-model=\"insecurePushes.checked\" ng-change=\"updateInsecurePushPreference()\" toggle-class=\"toggle-calm\">{{ 'ALLOW_PHI_IN_PUSHES' | translate}}</ion-toggle>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\">\n" +
    "        <button ng-click=\"closeInsecureEmailModal()\" class=\"button-start\">\n" +
    "          {{ 'FINISHED' | translate }}\n" +
    "        </button>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/account.updatePassword.modal.html","<ion-modal-view class=\"generic-modal scroll-modal form-modal update-password-modal\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <i ng-if='!force' class=\"ion-ios-close-empty close\" aria-label=\"{{ 'ARIA_GO_BACK' | translate }}\" ng-click=\"cancelModal()\" style=\"color:#666\">\n" +
    "        <span>{{ 'CLOSE' | translate }}</span>\n" +
    "      </i> \n" +
    "\n" +
    "      <div class=\"box\">\n" +
    "        <div class=\"clearfix\">\n" +
    "          <h1>{{ 'UPDATE_PASSWORD' | translate }}</h1>\n" +
    "      \n" +
    "          <label for=\"current_password\">{{ 'CURRENT_PASSWORD' | translate }}</label>\n" +
    "          <input type=\"{{ visibility.current_password }}\" id=\"current_password\" ng-model=\"form.current_password\">\n" +
    "          <i ng-class=\"{'icon': true, 'ion-eye': visibility.current_password == 'password', 'ion-eye-disabled': (visibility.current_password == 'text')}\"\n" +
    "             ng-click=\"toggleVisibility('current_password')\"\n" +
    "             tabindex=\"0\"\n" +
    "             role=\"button\"\n" +
    "             aria-hidden=\"true\">\n" +
    "          </i>\n" +
    "\n" +
    "          <div ng-include=\"'templates/includes/account.passwordValidator.html'\"></div>\n" +
    "\n" +
    "          <label for=\"confirm_password\">{{ 'CONFIRM_PASSWORD' | translate }}</label>\n" +
    "          <input type=\"{{ visibility.confirm_password }}\" id=\"confirm_password\" ng-model=\"form.confirm_password\" ng-paste=\"$event.preventDefault()\">\n" +
    "          <i ng-class=\"{'icon': true, 'ion-eye': visibility.confirm_password == 'password', 'ion-eye-disabled': (visibility.confirm_password == 'text')}\"\n" +
    "             ng-click=\"toggleVisibility('confirm_password')\"\n" +
    "             tabindex=\"0\"\n" +
    "             role=\"button\"\n" +
    "             aria-hidden=\"true\">\n" +
    "          </i>\n" +
    "\n" +
    "          <p ng-show=\"successMsg\" class=\"success\">{{ successMsg }}</p>\n" +
    "          <p ng-show=\"errorMsg\" class=\"error\">{{ errorMsg }}</p>\n" +
    "\n" +
    "          <button ng-click=\"submit()\" ng-disabled=\"submitting\">{{ \"RESET_PASSWORD\" | translate }}</button>\n" +
    "          <a href=\"javascript:;\" ng-click=\"forgotPassword()\">{{ \"FORGOT_PASSWORD\" | translate }}</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/agreement.modal.html","<ion-modal-view class=\"popoverr hipaa agreement scroll-modal\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\">\n" +
    "    <div class=\"box\">\n" +
    "      <button href=\"javascript:;\" ng-click=\"closeAgreement()\" class=\"go-back button-clear\"><i class=\"icon ion-ios-close-empty\"></i></button>\n" +
    "      <h1>{{ 'PRIVACY_AND_YOU' | translate }}</h1>\n" +
    "      <p><em>{{ 'AGREEMENT_HEADLINE1' | translate }}</em><br>\n" +
    "      	 {{ 'AGREEMENT_PARAGRAPH1' | translate }}</p><br>\n" +
    "\n" +
    "      <p class=\"nomargin\"><em>{{ 'AGREEMENT_HEADLINE2' | translate }}</em></p>\n" +
    "         <ul>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH2' | translate }}</li>\n" +
    "          <li><span ng-bind-html=\"'AGREEMENT_PARAGRAPH3' | translate\"></span>\n" +
    "            <ul>\n" +
    "              <li>{{ 'AGREEMENT_PARAGRAPH3_SUBPARAGRAPH1' | translate }}</li>\n" +
    "              <li>{{ 'AGREEMENT_PARAGRAPH3_SUBPARAGRAPH2' | translate }}</li>\n" +
    "              <li>{{ 'AGREEMENT_PARAGRAPH3_SUBPARAGRAPH3' | translate }}</li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH4' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH5' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH6' | translate }}</li>\n" +
    "          <li>{{ 'AGREEMENT_PARAGRAPH7' | translate }}</li>\n" +
    "         </ul>\n" +
    "        <br>\n" +
    "      <p><em>{{ 'AGREEMENT_HEADLINE3' | translate }}</em></p>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <button ng-click=\"agreeToAgreement()\" class=\"button-start\">{{ 'I_UNDERSTAND' | translate }}</button>\n" +
    "\n" +
    "  </ion-content>\n" +
    "\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/app.html","<div ng-show=\"appRenderReady\">\n" +
    "  <div id=\"draggable-area\" class=\"background-container container {{ getLang() }} {{ isLoginActivity() ? 'is-login' : ''}} {{ isRelaxActivity() ? 'is-relax'  : '' }} {{ isPacificaLiteUser() ? 'lite' : '' }} {{ hasLoadedTranslation() ? '' : 'loading-translations' }}\"> <!-- removed {{ isMobile() ? 'mobile' : '' }} because it wasn't working with upgrades. -->\n" +
    "\n" +
    "  	<div class=\"content\" ui-view autoscroll=\"true\"></div> \n" +
    "\n" +
    "  	<div class=\"sidebar\" ng-show=\"shouldShowSidebar()\">\n" +
    "  		<a href=\"javascript:;\" ng-click=\"goHome()\" class=\"side-logo\" ng-class=\"{'no-border': isPractitioner()}\"><img src=\"/img/logo-cropped-sanvello.png\" class=\"is-logo\" alt=\"Sanvello\"><img src=\"/img/logo-small.png\" class=\"is-mobile-logo\" alt=\"Sanvello\"></a>\n" +
    "\n" +
    "      <div class=\"viewing-as\" ng-show=\"isPractitioner()\">\n" +
    "        <span>View as:</span>\n" +
    "        <div class=\"pill-wrapper\"> \n" +
    "        <div ng-click=\"showClinicianView()\" class=\"prac-toggle\">{{ 'CLINICIAN' | translate }}</div><div class=\"active\">{{ 'CLIENT' | translate }}</div>\n" +
    "        </div>\n" +
    "	   </div>\n" +
    "\n" +
    "    	<ul ng-if=\"isLoggedIn() && !isAnyCoach()\">\n" +
    "      		<li ng-class=\"{active: isTabActive('Home')}\"><a href=\"javascript:;\" class=\"side-link\" ng-click=\"goHome()\"><i class=\"icon ion-ios-sanvello\"></i>{{ 'TODAY' | translate }}</a></li>\n" +
    "\n" +
    "      		<li ng-class=\"{active: isTabActive('Progress')}\"><a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToProgress()\"><i class=\"icon ion-stats-bars\"></i>{{ 'PROGRESS' | translate }}</a></li>\n" +
    "\n" +
    "          <li ng-if=\"canViewCommunities()\" ng-class=\"{active: isTabActive('Community')}\"><a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToCommunity()\"><i class=\"icon ion-ios-community\"></i>{{ 'COMMUNITY' | translate }}</a></li>\n" +
    "\n" +
    "      		<li ng-if=\"canViewCommunities()\" ng-class=\"{active: isTabActive('Groups')}\"><a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToGroups()\"><i class=\"icon ion-ios-chatbubble-outline\"></i>{{ 'GROUPS_TITLE' | translate }}</a></li>\n" +
    "\n" +
    "          <li ng-class=\"{active: isTabActive('Therapist')}\"><a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToTherapist()\"><i class=\"icon ion-ios-emergency\"></i>{{ 'THERAPIST' | translate }}</a></li> \n" +
    "\n" +
    "      		<li ng-class=\"{active: isTabActive('Account')}\" ng-hide=\"isPractitioner()\"><a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToAccount()\"><i class=\"icon ion-ios-gear-outline\"></i>{{ 'ACCOUNT' | translate }}</a></li>\n" +
    "\n" +
    "          <li ng-if=\"isLoggedIn() && !isPremium() && !isPractitioner()\" ng-class=\"{active: isTabActive('Upgrade')}\" class=\"mobile-only-link\">\n" +
    "            <a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToUpgrade()\">\n" +
    "              <i class=\"icon ion-ios-pricetag-outline\"></i>{{ 'UPGRADE' | translate }}\n" +
    "            </a>\n" +
    "          </li>\n" +
    "\n" +
    "    	</ul>\n" +
    "\n" +
    "    	<div ng-if=\"isLoggedIn() && !isPremium() && !isPractitioner() && !isPHI()\" >\n" +
    "    		<button ng-click=\"goToUpgrade()\">{{ 'UPGRADE' | translate }}</button>\n" +
    "    		<a href=\"javascript:;\" ng-click=\"showReedemGiftCode()\" ng-show=\"!isPractitioner()\" class=\"gift-code\">{{ 'REDEEM_GIFT_CODE' | translate }}</a>\n" +
    "    	</div>\n" +
    "\n" +
    "     	<div class=\"app-wrapper\">\n" +
    "        <a href=\"https://itunes.apple.com/us/app/pacifica-tools-for-stress/id922968861?mt=8&amp;uo=6&amp;at=1010l3fm&amp;ct=\" target=\"_blank\"><img src=\"/img/ios.svg\" alt=\"iTunes App Store\" class=\"ios\"></a>\n" +
    "        <a href=\"https://play.google.com/store/apps/details?id=com.pacificalabs.pacifica\" target=\"_blank\"><img src=\"/img/android.svg\" alt=\"Google Play Store\" class=\"android\"></a>\n" +
    "    	</div>\n" +
    "    	<div class=\"mobile-app-wrapper\">\n" +
    "    		<a href=\"https://itunes.apple.com/us/app/pacifica-tools-for-stress/id922968861?mt=8&amp;uo=6&amp;at=1010l3fm&amp;ct=\" target=\"_blank\"><img src=\"/img/social-apple.svg\"></a>\n" +
    "     	 	<a href=\"https://play.google.com/store/apps/details?id=com.pacificalabs.pacifica\" target=\"_blank\"><img src=\"/img/social-android.svg\"></a>\n" +
    "    	</div>\n" +
    "\n" +
    "  	</div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>")

$templateCache.put("templates/audioLineItem.html","<div class=\"clearfix\">\n" +
    "	<span class=\"{{getAudioClass()}}\" ng-click=\"playPause($event)\"> {{ playing ? 'pause' : 'play' }}</span>\n" +
    "\n" +
    "  <div style=\"width: 1px; height: 1px; position: absolute; top: -9999px; left: -9999px;\">\n" +
    "		<div class=\"audioPlayer\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<canvas class=\"audioLineCanvas\" style=\"height:3px; width: 250px;\"></canvas> <!-- Is there a way to auto-expand this -->\n" +
    "	<span class=\"duration\">{{getDuration()}}</span>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/breathing.html","<div>\n" +
    "\n" +
    "	<a href=\"javascript:;\" ng-click=\"goBack()\" class=\"close\">X</a>\n" +
    "\n" +
    "	<div style=\"width: 1px; height: 1px; position: absolute; top: -9999px; left: -9999px;\">\n" +
    "		<audio id=\"inhaleAudio\"></audio>\n" +
    "		<audio id=\"exhaleAudio\"></audio>\n" +
    "\n" +
    "		<audio id=\"bgAudio\"></audio> \n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"relax-header\">{{ getExerciseHeader() }}</div> \n" +
    "\n" +
    "	<canvas id=\"breathingCanvas\" width=\"270\" height=\"270\"></canvas>\n" +
    "	<span ng-if=\"!finishedExercise()\" class=\"time-elapsed\">{{ getExerciseTitle() }}</span>\n" +
    "  <span class=\"pause {{playing ? 'play' : ''}}\" ng-if=\"!finishedExercise()\" ng-click=\"pause()\"></span> \n" +
    "\n" +
    "  <input type=\"range\" name=\"volume\" min=\"0\" max=\"1\" step=\"0.01\" ng-model=\"volumeData.bgVolume\"  ng-change=\"bgVolumeChanged()\" class=\"volume-slider\">\n" +
    "\n" +
    "  <div class=\"bar bar-footer\" ng-if=\"finishedExercise() && enableMeditationMode\">\n" +
    "    <a href=\"javascript:;\" ng-click=\"finishExercise()\" class=\"item button-start\">{{ 'IM_DONE' | translate }}</a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>")

$templateCache.put("templates/download.modal.html","<ion-modal-view class=\"generic-modal scroll-modal download\" close-handler=\"closeDownloadModal()\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeDownloadModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i> \n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <div class=\"download-glass\"></div>\n" +
    "			<div class=\"download-panel\">\n" +
    "				<h3>{{ 'DOWNLOAD' | translate}} {{ 'PDF' | translate }}</h3>\n" +
    "				<input type=\"text\" ng-model=\"pdfData.name\" placeholder=\"{{ 'YOUR_NAME' | translate }}\" ng-show=\"!viewingOtherUser\">\n" +
    "\n" +
    "		      <div class=\"mock-radio-container\">\n" +
    "		        <span class=\"mock-radio\"></span><input type=\"radio\" name=\"reportWeek\" value=\"last\">{{ 'LAST_WEEK' | translate}}<span class=\"mock-radio\"></span>\n" +
    "		      </div>\n" +
    "\n" +
    "		      <div class=\"mock-radio-container\">\n" +
    "		        <span class=\"mock-radio\"></span><input type=\"radio\" name=\"reportWeek\" value=\"current\" checked=\"checked\">{{ 'THIS_WEEK' | translate }}<span class=\"mock-radio\"></span>\n" +
    "		      </div>\n" +
    "\n" +
    "				<a ng-click=\"downloadPDF()\" class=\"download-pdf\">{{ 'DOWNLOAD_PDF' | translate}}</a>\n" +
    "				<p>{{ 'POPUP_BLOCKER' | translate}}</p>\n" +
    "				<h3>{{ 'DOWNLOAD' | translate}} {{ 'CSV ' | translate}}</h3>\n" +
    "\n" +
    "\n" +
    "				<h4>{{ 'ALL_DATA' | translate }} ({{ getAllDateDisplay() }})</h4>\n" +
    "				<div style=\"margin-bottom: 20px\">\n" +
    "					<a ng-if=\"!viewingOtherUser\" ng-click=\"downloadCSV('all')\" style=\"margin-bottom:10px;\">{{ 'ALL_DATA' | translate}}</a>\n" +
    "				</div>\n" +
    "\n" +
    "				<h4>{{ getActiveDateDisplay() }}</h4>\n" +
    "				<a ng-click=\"downloadCSV('mood')\">{{ 'MOOD_ACTIVITY' | translate}}</a>\n" +
    "				<a ng-click=\"downloadCSV('health')\">{{ 'HEALTH' | translate}}</a>\n" +
    "				<a ng-click=\"downloadCSV('thoughts')\">{{ 'THOUGHTS_ACTIVITY' | translate}}</a>\n" +
    "				<a ng-click=\"downloadCSV('goals')\">{{ 'GOALS' | translate}}</a>\n" +
    "				<a ng-click=\"downloadCSV('activities')\">{{ 'ACTIVITIES' | translate}}</a>\n" +
    "			</div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/healthSelector.html","<div class=\"clearfix\">\n" +
    "	<canvas class=\"healthSelectorCanvas\" style=\"height: 50px; width: 100%;\"></canvas> <!-- Is there a way to auto-expand this -->\n" +
    "</div>")

$templateCache.put("templates/home.html","<div class=\"home-view\" ng-show=\"homeRenderReady\">\n" +
    "\n" +
    "	<div id=\"streamingElement\"></div>\n" +
    "\n" +
    "		<div id=\"mood-column\" class=\"col-md-4 is-mood\" ng-class=\"[currentMoodClass, getCurrentStressClass(), {blurred: isAnySectionAction() && !isSectionActive('mood'), showinghelp: showingMoodHelp}]\">\n" +
    "\n" +
    "			<div ng-show=\"!showingMoodHelp\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"clearActiveSection()\" ng-show=\"isSectionActive('mood')\" class=\"close\">X</a>\n" +
    "\n" +
    "				<a href=\"javascript:;\" ng-click=\"showMoodHelp()\" ng-show=\"isSectionActive('mood')\" class=\"close question\">?</a>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"showingMoodHelp\" class=\"help-screen\">\n" +
    "\n" +
    "				<a href=\"javascript:;\" ng-click=\"hideMoodHelp()\" ng-show=\"isSectionActive('mood')\" class=\"close\">X</a>\n" +
    "\n" +
    "				<div class=\"slide-image\"></div>\n" +
    "\n" +
    "    		<div>\n" +
    "	        		<strong>{{ 'HABITS_MOOD_HELP_TITLE' | translate }}</strong>\n" +
    "	        		<h2>{{ 'HABITS_MOOD_HELP_LINE_1' | translate }}</h2>\n" +
    "	        		<p>{{ 'HABITS_MOOD_HELP_LINE_2' | translate }}<br><br>\n" +
    "	        		{{ 'HABITS_MOOD_HELP_LINE_3' | translate }}</p>\n" +
    "	      </div>\n" +
    "\n" +
    "				<button ng-click=\"hideMoodHelp()\">{{ 'OK_GOT_IT' | translate }}</button>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"!showingMoodHelp\">\n" +
    "				<div class=\"slide-image\"></div> \n" +
    "				<strong>{{ getMoodTitle() }}</strong>\n" +
    "				<div ng-show=\"!isSectionActive('mood')\">\n" +
    "					<em>{{ 'MOOD_HOME_DESCRIPTION' | translate }}</em>\n" +
    "					<button ng-click=\"setSectionActive('mood')\">{{ 'NEW_MOOD_ENTRY' | translate }}</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div ng-show=\"isSectionActive('mood') && !showingMoodHelp\">\n" +
    "\n" +
    "				<div class=\"row\">\n" +
    "					<div style=\"overflow: hidden;\">\n" +
    "						<span class=\"title\">{{ 'HABITS_MOOD_TITLE' | translate }}</span>\n" +
    "						<span>{{ getMoodValue() }}</span>\n" +
    "					</div>\n" +
    "					\n" +
    "					<health-selector habit=\"moodHabit\" value=\"moodData.value\" redraw=\"redraw\" callbacks=\"callbacks\"remove-empty-state=\"true\"></health-selector>\n" +
    "				</div>\n" +
    "\n" +
    "				<div ng-if=\"showSubValueSection('Relaxed')\" class=\"feeling-wrapper {{getValueClass()}}\">\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Relaxed')}\" ng-click=\"setSelectedSubValue('Relaxed')\">\n" +
    "		        {{ 'RELAXED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Loved')}\" ng-click=\"setSelectedSubValue('Loved')\">\n" +
    "		        {{ 'LOVED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Grateful')}\" ng-click=\"setSelectedSubValue('Grateful')\" class=\"third\">\n" +
    "		        {{ 'GRATEFUL' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Excited')}\" ng-click=\"setSelectedSubValue('Excited')\">\n" +
    "		        {{ 'EXCITED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Happy')}\" ng-click=\"setSelectedSubValue('Happy')\">\n" +
    "		        {{ 'HAPPY' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Inspired')}\" ng-click=\"setSelectedSubValue('Inspired')\">\n" +
    "		        {{ 'INSPIRED' | translate }}\n" +
    "		      </div>\n" +
    "		    </div>\n" +
    "		    <div ng-if=\"showSubValueSection('Calm')\" class=\"feeling-wrapper {{getValueClass()}}\">\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Calm')}\" ng-click=\"setSelectedSubValue('Calm')\">\n" +
    "		        {{ 'CALM' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Loved')}\" ng-click=\"setSelectedSubValue('Loved')\">\n" +
    "		        {{ 'LOVED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Grateful')}\" ng-click=\"setSelectedSubValue('Grateful')\" class=\"third\">\n" +
    "		        {{ 'GRATEFUL' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Anxious')}\" ng-click=\"setSelectedSubValue('Anxious')\">\n" +
    "		        {{ 'ANXIOUS' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Stressed')}\" ng-click=\"setSelectedSubValue('Stressed')\">\n" +
    "		        {{ 'STRESSED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Lonely')}\" ng-click=\"setSelectedSubValue('Lonely')\">\n" +
    "		        {{ 'LONELY' | translate }}\n" +
    "		      </div>\n" +
    "		    </div>\n" +
    "		    <div ng-if=\"showSubValueSection('Panicked')\" class=\"feeling-wrapper {{getValueClass()}}\">\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Panicked')}\" ng-click=\"setSelectedSubValue('Panicked')\">\n" +
    "		        {{ 'PANICKED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Sad')}\" ng-click=\"setSelectedSubValue('Sad')\">\n" +
    "		        {{ 'SAD' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Angry')}\" ng-click=\"setSelectedSubValue('Angry')\" class=\"third\">\n" +
    "		        {{ 'ANGRY' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Anxious')}\" ng-click=\"setSelectedSubValue('Anxious')\">\n" +
    "		        {{ 'ANXIOUS' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Stressed')}\" ng-click=\"setSelectedSubValue('Stressed')\">\n" +
    "		        {{ 'STRESSED' | translate }}\n" +
    "		      </div>\n" +
    "		      <div ng-class=\"{active: subValueIsActive('Lonely')}\" ng-click=\"setSelectedSubValue('Lonely')\">\n" +
    "		        {{ 'LONELY' | translate }}\n" +
    "		      </div>\n" +
    "		    </div>\n" +
    "				<div contenteditable=\"true\" class=\"notes-div\" id=\"moodNotes\" ng-model=\"moodData.notes\" ng-change=\"notesChanged()\" placeholder=\"{{ 'WHATS_GOING_ON' | translate }} {{ 'HASHTAGS_DESC' | translate }}\"></div>\n" +
    "				<button ng-click=\"updateMood()\">{{ 'DONE' | translate }}</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<!-- Health Section -->\n" +
    "		<div class=\"col-md-4 is-health\" ng-class=\"{blurred: isAnySectionAction() && !isSectionActive('health'), showinghelp: showingHealthHelp}\">\n" +
    "\n" +
    "			<div ng-show=\"showingHealthHelp\" class=\"help-screen\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"hideHealthHelp()\" ng-show=\"isSectionActive('health')\" class=\"close\">X</a>\n" +
    "				<div class=\"slide-image\"></div> \n" +
    "				<strong>{{ 'HEALTH_ACTIVITY' | translate}}</strong>\n" +
    "        		<h2>{{ getHabitsHelpLine1() }}</h2>\n" +
    "        		<p> {{ getHabitsHelpLine2() }}<br><br>\n" +
    "            	{{ 'HABITS_HELP_LINE_3' | translate }}</p>\n" +
    "				<button ng-click=\"hideHealthHelp()\">{{ 'OK_GOT_IT' | translate }}</button>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"!editingGoals && !addingActivity && !showingHealthHelp\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"clearActiveSection()\" ng-show=\"isSectionActive('health')\" class=\"close\">X</a>\n" +
    "				<a href=\"javascript:;\" ng-click=\"showHealthHelp()\" ng-show=\"isSectionActive('health')\" class=\"close question\">?</a>\n" +
    "\n" +
    "				<div class=\"slide-image {{getTodaysHabitsClass()}}\"></div>\n" +
    "				<strong>{{ 'HEALTH' | translate }}</strong>\n" +
    "				\n" +
    "				<div ng-show=\"!isSectionActive('health')\">\n" +
    "					<em>{{ 'HEALTH_HOME_DESCRIPTION' | translate }}</em>\n" +
    "\n" +
    "					<button ng-click=\"setSectionActive('health')\">{{ 'DAILY_CHECK_IN' | translate }}</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<!-- Editing goals -->\n" +
    "			<div ng-show=\"editingGoals && !addingActivity && !showingHealthHelp\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"stopEditingGoals()\" ng-show=\"isSectionActive('health')\" class=\"close\">X</a>\n" +
    "				<strong>{{ 'DAILY_GOALS' | translate }}</strong>\n" +
    "			</div>\n" +
    "\n" +
    "			<!-- Adding activities -->\n" +
    "			<div ng-show=\"!editingGoals && addingActivity && !showingHealthHelp\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"stopAddingActivity()\" ng-show=\"isSectionActive('health')\" class=\"close\">X</a>\n" +
    "				<strong>{{ 'HABITS_ADD_ACTIVITY' | translate }}</strong>\n" +
    "				<div ng-repeat=\"habit in potentialHabits | filter:name='!mood'\" class=\"{{habit.name}} row habit has-icon fat\" ng-click=\"addHabit(habit)\" title=\"Add Activity\">\n" +
    "					<div style=\"overflow: hidden;\">\n" +
    "						<i class=\"icon\"></i>\n" +
    "						<span class=\"title\">{{ getHabitName(habit) }}</span>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"isSectionActive('health') && !addingActivity && !showingHealthHelp\" class=\"health-container\">\n" +
    "				<div ng-repeat=\"habit in habits track by habit.id\" class=\"{{habit.name}} habit row has-icon\" ng-class=\"{'goal-met': isGoalMet(habit), 'editingGoals': editingGoals}\">\n" +
    "					<div style=\"overflow: hidden;\">\n" +
    "						<i class=\"icon\"></i>\n" +
    "						<span class=\"title\">{{ getHabitName(habit) }}</span>\n" +
    "						<span>{{ getTodaysDataDisplay(habit) }}</span>\n" +
    "					</div>\n" +
    "					<div ng-show=\"!todaysData[habit.id].deleted\">\n" +
    "\n" +
    "						<health-selector habit=\"habit\" value=\"todaysData[habit.id].options.value\" editing-goals=\"editingGoals\" redraw=\"redraw\" callbacks=\"habitCallbacks\" disabled=\"isHabitDisabled(habit)\" remove-empty-state=\"editingGoals\"></health-selector>\n" +
    "\n" +
    "		         <a href=\"javascript:;\" ng-click=\"removeHabit(habit)\" ng-show=\"editingGoals\" class=\"remove\" title=\"Remove\">\n" +
    "		         	<!-- <img src=\"/img/trash.svg\" alt=\"remove\"> -->\n" +
    "					<i class=\"icon ion-ios-trash-outline\"></i>\n" +
    "		         	<!-- <img src=\"/css/sanvello-icons/ionicons/svg/ios-trash-outline.svg\" alt=\"remove\"> -->\n" +
    "		         </a>\n" +
    "		      </div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div ng-show=\"!editingGoals && !showingHealthHelp\">\n" +
    "					<div class=\"health-actions-wrapper\">\n" +
    "						<a href=\"javascript:;\" ng-click=\"showAddActivity()\" ng-show=\"potentialHabits.length > 0\">{{ 'ADD_ACTIVITY' | translate }}</a>\n" +
    "						<a href=\"javascript:;\" ng-click=\"editGoals()\" class=\"edit-goals\">{{ 'EDIT_GOALS' | translate }}</a>\n" +
    "					</div>\n" +
    "					<button ng-click=\"homeUpdateHabits()\" ng-disabled=\"updatingHabitData\">{{ 'DONE' | translate }}</button>\n" +
    "				</div>\n" +
    "				<div ng-show=\"editingGoals\">\n" +
    "					<button ng-click=\"finishEditingGoals()\" ng-disabled=\"updatingGoals\">{{ 'DONE_EDITING' | translate }}</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<!-- Relax section -->\n" +
    "		<div class=\"col-md-4 is-relax\" ng-class=\"{blurred: isAnySectionAction() && !isSectionActive('relax'), showinghelp: showingRelaxHelp || showingPremiumModal}\" ng-show=\"!isPacificaLiteUser()\">\n" +
    "\n" +
    "			<div class=\"premium-modal help-screen\" ng-show=\"showingPremiumModal\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"hidePremiumModal()\" class=\"close\">X</a>\n" +
    "	    		<strong>{{ 'ACCOUNT_UPGRADE_POPUP_HEADER' | translate }}</strong>\n" +
    "	    		<ul class=\"feature-list\">\n" +
    "	      			<li>\n" +
    "	      				<strong>{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_RELAX' | translate }}</strong>\n" +
    "	      				{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_RELAX_DESC' | translate }}\n" +
    "	      			</li>\n" +
    "	      			<li>\n" +
    "						<strong>{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_THEME' | translate }}</strong>\n" +
    "	      				{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_THEME_DESC' | translate }} {{ 'MOBILE_ONLY' | translate }}\n" +
    "	      			</li>\n" +
    "	      			<li>\n" +
    "	      				<strong>{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_HEALTH' | translate }}</strong>\n" +
    "	      				{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_HEALTH_DESC' | translate }} {{ 'MOBILE_ONLY' | translate }}\n" +
    "	      			</li>\n" +
    "	      			<li>\n" +
    "						<strong>{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_THOUGHTS' | translate }}</strong>\n" +
    "	      				{{ 'ACCOUNT_UPGRADE_INFO_POPUP_FEATURE_THOUGHTS_DESC' | translate }} {{ 'MOBILE_ONLY' | translate }}\n" +
    "	      			</li>\n" +
    "	    		</ul>\n" +
    "				<div class=\"button-wrap\">\n" +
    "		    		<button ng-click=\"goToUpgrade('yearly')\" class=\"button-start\" style=\"margin-top: 10px;\">\n" +
    "		      		{{ 'YEARLY' | translate }}<br>\n" +
    "		      		<span>$4.50 / {{ 'MONTH' | translate }}</span> <em>$53.99<br>{{ 'CHARGED_YEARLY' | translate }}</em>\n" +
    "		      		<strong>{{ 'BEST_VALUE' | translate }}</strong>\n" +
    "		    		</button>\n" +
    "		    		<button ng-click=\"goToUpgrade('monthly')\" class=\"button-start light\">\n" +
    "		      		{{ 'MONTHLY' | translate }}<br>\n" +
    "		      		<span>$8.99 / {{ 'MONTH' | translate }}</span> <em>{{ 'CHARGED_MONTHLY' | translate }}</em><!-- not yet.<em>{{ '7_DAY_TRIAL' | translate }}</em>-->\n" +
    "		    		</button>\n" +
    "		    		<button ng-click=\"goToUpgrade('lifetime')\" class=\"button-start light annual\">\n" +
    "		      		{{ 'LIFETIME' | translate }}<br>\n" +
    "		      		<span>$199.99</span> <em>{{ 'BILLED_ONCE' | translate }}</em><!-- not yet.<em>{{ '7_DAY_TRIAL' | translate }}</em>-->\n" +
    "		    		</button>\n" +
    "		  		</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"!showingRelaxHelp && isSectionActive('relax') && !showingPremiumModal\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"exitCurrentRelaxScreen()\" class=\"close\">X</a>\n" +
    "				<a href=\"javascript:;\" ng-click=\"showRelaxHelp()\" class=\"close question\">?</a>\n" +
    "			</div>\n" +
    "\n" +
    "			<!-- the Relax help modal. -->\n" +
    "			<div ng-show=\"showingRelaxHelp\" class=\"help-screen\">\n" +
    "				<a href=\"javascript:;\" ng-click=\"hideRelaxHelp()\" ng-show=\"isSectionActive('relax')\" class=\"close\">X</a>\n" +
    "				<div class=\"slide-image\"></div> \n" +
    "				<strong>{{ 'RELAX_HELP_TITLE' | translate }}</strong>\n" +
    "        		<p>{{ 'RELAX_HELP_LINE_2' | translate }}<br><br>\n" +
    "				<button ng-click=\"hideRelaxHelp()\">{{ 'OK_GOT_IT' | translate }}</button>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"!showRelaxOptions && !showingRelaxHelp && !showingPremiumModal\">\n" +
    "				<div class=\"slide-image\"></div>\n" +
    "				<strong>{{ 'RELAX' | translate }}</strong>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"!isSectionActive('relax')\">\n" +
    "				<em>{{ 'RELAX_HOME_DESCRIPTION' | translate }}</em>\n" +
    "				<button ng-click=\"setSectionActive('relax')\">{{ 'EXPLORE_ACTIVITIES' | translate }}</button>\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "			<div ng-show=\"isSectionActive('relax') && !showingRelaxHelp && !showingPremiumModal\">\n" +
    "\n" +
    "				<!-- New Layout for Relax. -->\n" +
    "				 <div ng-repeat=\"category in exerciseCategories\" ng-show=\"!showRelaxOptions\">\n" +
    "\n" +
    "		        <div class=\"item item-divider relax-subj row {{getExerciseCategory(category)}}\">{{getExerciseCategory(category)}}</div>\n" +
    "				<div class=\"cat-desc item\">{{getCategoryDescription(category)}}</div>\n" +
    "\n" +
    "				<div class=\"meditation-tile-wrapper\">\n" +
    "					    <div ng-repeat=\"exerciseItem in getCategoryExercises(category)\" class=\"{{getExerciseClass(exerciseItem.exercise)}} row has-icon relax-activity meditation-tile\" href=\"javascript:;\" ng-click=\"goToExercise(exerciseItem)\" ng-show=\"!showRelaxOptions\">\n" +
    "					    	<div class=\"tile-inner\" ng-include=\"'templates/includes/meditation-tile.html'\"></div>\n" +
    "						</div>\n" +
    "				</div>\n" +
    "		    </div>\n" +
    "\n" +
    "\n" +
    "		  	<div class=\"meditation-background {{ getExerciseClass(exercise.exercise) }}\" ng-show=\"showRelaxOptions\"></div>\n" +
    "	        <div ng-show=\"showRelaxOptions\" class=\"relax-desc {{ getExerciseClass(exercise.exercise) }}\">\n" +
    "	        	<strong>{{ getActivityName() }}</strong>\n" +
    "	        	<em>{{ getActivityDescription() }}</em>\n" +
    "	  		  <div class=\"item item-icon-left item-select\" ng-if=\"showCycleOptions()\">\n" +
    "	  	  		<i class=\"icon\"><img src=\"/img/ios-time-outline.svg\"></i>\n" +
    "	  	        <span>{{ 'RELAX_BREATH_LENGTH' | translate }}:</span>\n" +
    "	  	  		<select ng-model=\"cycleOptions.cycleOptionOrdinal\" ng-options=\"cycleOptions.options.indexOf(item) as getCycleOptionDisplay(item) for item in cycleOptions.options\" ng-change=\"updateCycleLength()\"></select>\n" +
    "	  	  		<i class=\"icon right-arrow\"><img src=\"/img/ios-arrow-down.svg\"></i>\n" +
    "	  	    </div>\n" +
    "\n" +
    "\n" +
    "		  	<div class=\"item item-icon-left item-select\">\n" +
    "		        <i class=\"icon\"><img src=\"/img/ios-volume-high.svg\"></i>\n" +
    "		        <span>{{ 'RELAX_SOUND' | translate }}:</span>\n" +
    "		        <select ng-model=\"soundOptions.soundOptionOrdinal\" ng-options=\"soundOptions.options.indexOf(item) as getSoundOptionDisplay(item) for item in soundOptions.options\" ng-change=\"updateSoundOption()\">\n" +
    "		        </select>\n" +
    "		        <i class=\"icon right-arrow\"><img src=\"/img/ios-arrow-down.svg\"></i>\n" +
    "		    </div>\n" +
    "		    <div class=\"item item-icon-left item-select\" ng-show=\"showContinueOptions()\">\n" +
    "		        <i class=\"icon\"><img src=\"/img/ios-loop.svg\"></i>\n" +
    "		        <span>{{ 'RELAX_WHEN_DONE' | translate }}:</span>\n" +
    "		        <select ng-model=\"continueOptions.continueOptionOrdinal\" ng-options=\"continueOptions.options.indexOf(item) as getContinueOptionDisplay(item) for item in continueOptions.options\" ng-change=\"updateContinueOption()\"></select>\n" +
    "		        <i class=\"icon right-arrow\"><img src=\"/img/ios-arrow-down.svg\"></i>\n" +
    "		      </div>\n" +
    "			  <button ng-click=\"startExercise()\" class=\"item button-start\">{{ 'START' | translate }}</button>\n" +
    "		    </div>\n" +
    "			<!--<button ng-click=\"closeRelax()\" ng-show=\"!showRelaxOptions\">{{ 'DONE' | translate }}</button>-->\n" +
    "			</div>\n" +
    "		</div>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/login.html"," <img src=\"/img/sanvello.png\" alt=\"Sanvello\" class=\"login-logo\">\n" +
    " <h1 ng-show=\"!isLogin()\">{{ 'LOGIN_PAGE_MOTTO' | translate }}</h1>\n" +
    " <h1 ng-show=\"isLogin()\">{{ 'WELCOME_BACK' | translate }}</h1>\n" +
    " <div class=\"error\" ng-show=\"loginError\">{{errorMessage}}</div>\n" +
    "<div class=\"app-wrapper sign-up-page\">\n" +
    "  <a href=\"https://itunes.apple.com/us/app/pacifica-tools-for-stress/id922968861?mt=8&amp;uo=6&amp;at=1010l3fm&amp;ct=\" target=\"_blank\"><img src=\"/img/ios.svg\" alt=\"iTunes App Store\" class=\"ios\"></a>\n" +
    "  <a href=\"https://play.google.com/store/apps/details?id=com.pacificalabs.pacifica\" target=\"_blank\"><img src=\"/img/android.svg\" alt=\"Google Play Store\" class=\"android\"></a>\n" +
    "</div>\n" +
    " <div class=\"form-wrapper\"> \n" +
    "	 \n" +
    "   <form class=\"form-signin\" novalidate ng-show=\"isLogin()\">\n" +
    "    <div class=\"white-wrap\">\n" +
    "      <div class=\"input-wrap\">\n" +
    "	     <i class=\"icon ion-ios-email-outline\"></i><input type=\"email\" ng-model=\"loginData.email\" id=\"loginEmail\" class=\"form-control rounded-corners\" placeholder=\"{{ 'EMAIL' | translate }}\" required autofocus autocomplete=\"off\">\n" +
    "      </div>\n" +
    "      <div class=\"input-wrap\" ng-show=\"!showingForgotPassword\"> \n" +
    "	     <i class=\"icon ion-ios-locked-outline\"></i><input type=\"password\" ng-model=\"loginData.password\" id=\"loginPassword\" class=\"form-control\" placeholder=\"{{ 'PASSWORD' | translate }}\" required autocomplete=\"off\">\n" +
    "      </div>\n" +
    "     <div class=\"button-wrap\">\n" +
    "        <button class=\"btn btn-lg btn-primary btn-block\" ng-disabled=\"loading\" ng-click=\"login()\" ng-show=\"!showingForgotPassword\">{{ 'LOG_IN_BUTTON' | translate }}</button>\n" +
    "        <button class=\"btn btn-lg btn-primary btn-block\" ng-disabled=\"loading\" ng-click=\"resetPassword()\" ng-show=\"showingForgotPassword && !forgotPasswordSuccess\">{{ 'RESET_PASSWORD' | translate }}</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "        \n" +
    "    <div class=\"social-btn-wrap\">\n" +
    "      <button class=\"btn btn-lg btn-primary btn-block is-facebook\" ng-disabled=\"loading\" ng-click=\"facebookSignIn(false)\" ng-show=\"!showingForgotPassword\">&nbsp;</button>\n" +
    "      <button class=\"btn btn-lg btn-primary btn-block is-google\" ng-disabled=\"loading\" ng-click=\"googleSignIn(false)\" ng-show=\"!showingForgotPassword && googleAuth\">&nbsp;</button>\n" +
    "    </div>\n" +
    "    <div class=\"bottom-link\" ng-click=\"toggleForgotPassword()\" ng-show=\"!forgotPasswordSuccess\">{{ (showingForgotPassword ? 'CANCEL_LOWER' : 'FORGOT_PASSWORD') | translate }}</div>\n" +
    "    <div ng-show=\"forgotPasswordSuccess && isLogin()\" class=\"bottom-text\">\n" +
    "      <em>{{ 'LOGIN_RESET_PASSWORD_CHECK_EMAIL' | translate }}</em>\n" +
    "    </div>\n" +
    "    <div class=\"toggle-prompt\">\n" +
    "      {{ 'DONT_HAVE_ACCOUNT' | translate }} <a href=\"javascript:;\" ng-click=\"toggleLogin()\">{{ 'SIGN_UP_BUTTON' | translate }}</a>\n" +
    "    </div>\n" +
    "\n" +
    "  </form>\n" +
    "\n" +
    "	<form class=\"form-signup\" novalidate ng-show=\"!isLogin()\">\n" +
    "    <div class=\"white-wrap\">\n" +
    "      <div class=\"input-wrap\">\n" +
    "        <label>{{ 'NICKNAME' | translate }}</label>\n" +
    "        <i class=\"icon ion-ios-me\"></i><input type=\"text\" placeholder=\"{{ 'NICKNAME' | translate }}\" ng-model=\"signUpData.name\" tabindex=\"1\" name=\"name\" id=\"createUserName\" autocomplete=\"off\" class=\"rounded-corners\">\n" +
    "      </div>\n" +
    "      <div class=\"input-wrap\">\n" +
    "        <label>{{ 'EMAIL' | translate }}</label>\n" +
    "        <i class=\"icon ion-ios-email-outline\"></i><input type=\"email\" placeholder=\"{{ 'EMAIL' | translate }}\" ng-model=\"signUpData.email\" tabindex=\"3\" name=\"email\" id=\"createUserEmail\" autocomplete=\"off\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"signup-validator\" ng-include=\"'templates/includes/account.passwordValidator.html'\"></div>\n" +
    "\n" +
    "      <div class=\"button-wrap\">\n" +
    "        <button class=\"btn btn-lg btn-primary btn-block\" ng-disabled=\"loading\" ng-if=\"!suggestedEmail\" ng-click=\"signup()\" >{{ 'LOGIN_JOIN_NOW' | translate }}</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"approval-wrapper\">\n" +
    "      <input type=\"checkbox\" ng-checked=\"signUpData.agreed\" ng-click=\"clickedAgreement($event)\">\n" +
    "      <p ng-bind-html=\"getLoginTosHTML()\" class=\"approval-text\"></p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"social-btn-wrap\" ng-show=\"!suggestedEmail\">\n" +
    "      <button class=\"btn btn-lg btn-primary btn-block is-facebook\" ng-disabled=\"loading\" ng-click=\"facebookSignIn(true)\">&nbsp;</button>\n" +
    "      <button class=\"btn btn-lg btn-primary btn-block is-google\" ng-disabled=\"loading\" ng-click=\"googleSignIn(true)\">&nbsp;</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"social-btn-wrap suggestion\" ng-show=\"suggestedEmail\">\n" +
    "      <div class=\"error\" ng-show=\"suggestedEmail\">{{ 'DID_YOU_MEAN' | translate}}: <strong>{{suggestedEmail}}</strong>?</div>\n" +
    "      <button class=\"button button-default suggest-correction\" ng-click=\"useSuggestedEmail()\" ng-if=\"suggestedEmail\">{{ 'USE' | translate }} {{suggestedEmail}}</button>\n" +
    "      <button class=\"button button-default light-button suggest-correction\" ng-if=\"suggestedEmail\">{{ 'NO_USE' | translate }} {{signUpData.email}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--<div class=\"bottom-text\">\n" +
    "      <em>{{ 'LOGIN_TOS_AGREEMENT2' | translate }} <a href=\"/tos.html\" target=\"_blank\">{{ 'TERMS_OF_SERVICE' | translate}}</a>\n" +
    "      {{ 'LOGIN_TOS_AGREEMENT3' | translate }} <a href=\"/privacy.html\" target=\"_blank\">{{ 'PRIVACY_POLICY' | translate }}</a>.</em>\n" +
    "    </div>-->\n" +
    "\n" +
    "    <div class=\"toggle-prompt\">\n" +
    "      {{ 'ALREADY_HAVE_AN_ACCOUNT' | translate }} <a href=\"javascript:;\" ng-click=\"toggleLogin()\">{{ 'LOG_IN_BUTTON' | translate }}</a>\n" +
    "    </div> \n" +
    "\n" +
    "	</form>\n" +
    "\n" +
    "</div>\n" +
    "<p class=\"version\">Version {{ appVersion }} &copy;Sanvello Health {{ copyrightYear }}. {{ 'ALL_RIGHTS_RESERVED' | translate }}.</p>\n" +
    "")

$templateCache.put("templates/meditation.html","<div class=\"meditation-view\">\n" +
    "\n" +
    "	<a href=\"javascript:;\" ng-click=\"goBack()\" class=\"close\">X</a>\n" +
    "\n" +
    "	<div style=\"width: 1px; height: 1px; position: absolute; top: -9999px; left: -9999px;\">\n" +
    "		<div id=\"meditationAudio\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div style=\"width: 1px; height: 1px; position: absolute; top: -9999px; left: -9999px;\">\n" +
    "		<audio id=\"bgAudio\"></audio>\n" +
    "	</div>\n" +
    "\n" +
    "	<span ng-if=\"!loading && !isSoundscape && !finishedExercise()\" class=\"time-elapsed\">{{ getElapsedTime() }}</span>\n" +
    "\n" +
    "  <span class=\"pause {{paused ? '' : 'play'}}\" ng-if=\"!finishedExercise()\" ng-click=\"pause()\"></span>\n" +
    "\n" +
    "  <div ng-show=\"!hasFlash\" class=\"flash-required\">{{ 'FLASH_REQUIRED' | translate }}</div>\n" +
    "\n" +
    "  <input type=\"range\" name=\"volume\" min=\"0\" max=\"1\" step=\"0.01\" ng-model=\"volumeData.bgVolume\"  ng-change=\"bgVolumeChanged()\" class=\"volume-slider\">\n" +
    "\n" +
    "  <div class=\"bar bar-footer\" ng-if=\"finishedExercise() && enableMeditationMode\">\n" +
    "    <a href=\"javascript:;\" ng-click=\"finishExercise()\" class=\"item button-start\">{{ 'IM_DONE' | translate }}</a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/mobile.html","<div>\n" +
    "	<h1>The Pacifica web app is designed for the desktop and may not work in mobile browsers.<br><br>\n" +
    "	Please download our <a href=\"https://itunes.apple.com/us/app/pacifica-tools-for-stress/id922968861?mt=8&amp;uo=6&amp;at=1010l3fm&amp;ct=\" target=\"_blank\">iOS</a> or <a href=\"https://play.google.com/store/apps/details?id=com.pacificalabs.pacifica\" target=\"_blank\">Android</a> apps instead for a quality mobile experience.</h1>\n" +
    "	<a href=\"javascript:;\" ng-click=\"useWebApp()\" class=\"button\">Continue to Web App</a>  \n" +
    "</div> ")

$templateCache.put("templates/progress.html","<div class=\"progress-view\">\n" +
    "\n" +
    "  <div class=\"client-menu-wrap\" ng-show=\"viewingOtherUser\">\n" +
    "		<div class=\"button-wrap\">\n" +
    "	    <button ng-click=\"showDownloadModal()\">{{ 'DOWNLOAD_REPORT' | translate }}</button>\n" +
    "	  </div>\n" +
    "  </div>\n" +
    "	<!-- top bar. -->\n" +
    "	<div class=\"top-stats-bar\">\n" +
    "\n" +
    "		<div class=\"arrow-wrap\">\n" +
    "			<button ng-click=\"moveBackwards()\" ng-class=\"{disabled: !canMoveBackwards()}\" ng-disabled=\"!canMoveBackwards()\" class=\"data-btn\"><i class=\"icon ion-ios-arrow-left\"></i></button>\n" +
    "			<button ng-click=\"moveForwards()\" ng-class=\"{disabled: !canMoveForwards()}\" ng-disabled=\"!canMoveForwards()\" class=\"data-btn last\"><i class=\"icon ion-ios-arrow-right\"></i></button>\n" +
    "		</div>\n" +
    "\n" +
    "		<span ng-class=\"{monthrange: isModeActive('week')}\" class=\"date-title\">{{ getActiveDateDisplay() }}</span>\n" +
    "\n" +
    "		<div class=\"range-wrap\">\n" +
    "			<span ng-click=\"setMode('month')\" class=\"data-btn\" ng-class=\"{'active': isModeActive('month')}\">{{ 'MONTH' | translate }}</span>\n" +
    "			<span ng-click=\"setMode('week')\" class=\"data-btn\" ng-class=\"{'active': isModeActive('week')}\">{{ 'WEEK' | translate }}</span>\n" +
    "			<span ng-click=\"setMode('day')\" class=\"data-btn\" ng-class=\"{'active': isModeActive('day')}\">{{ 'DAY' | translate }}</span>\n" +
    "		</div>\n" +
    "		<span ng-click=\"showDownloadModal()\" class=\"download-link\" ng-show=\"!viewingOtherUser\">{{ 'DOWNLOAD' | translate }}</span>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- the graph canvas. -->\n" +
    "	<div ng-show=\"isModeActive('day') || isModeActive('week')\" style=\"position: relative;\" class=\"graph-wrapper\">\n" +
    "		<canvas id=\"moodHistory\" height=\"150\" width=\"100%\" ng-class=\"{weekgraph: isModeActive('week'), practitionerGraphView: viewingOtherUser}\"></canvas>\n" +
    "		<i class=\"moon icon ion-ios-moon\" ng-if=\"isModeActive('day')\"></i>\n" +
    "		<i class=\"sun icon ion-ios-sunny\" ng-if=\"isModeActive('day')\"></i>\n" +
    "		<div ng-show=\"isModeActive('week')\" class=\"day-click-handler\">\n" +
    "			<div ng-click=\"goToDay(1)\" ng-class=\"{available: isDayAvailable(1)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(1) }} mood\"></i><i class=\"{{ getDayHabitClass(1) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div ng-click=\"goToDay(2)\" ng-class=\"{available: isDayAvailable(2)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(2) }} mood\"></i><i class=\"{{ getDayHabitClass(2) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div ng-click=\"goToDay(3)\" ng-class=\"{available: isDayAvailable(3)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(3) }} mood\"></i><i class=\"{{ getDayHabitClass(3) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div ng-click=\"goToDay(4)\" ng-class=\"{available: isDayAvailable(4)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(4) }} mood\"></i><i class=\"{{ getDayHabitClass(4) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div ng-click=\"goToDay(5)\" ng-class=\"{available: isDayAvailable(5)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(5) }} mood\"></i><i class=\"{{ getDayHabitClass(5) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div ng-click=\"goToDay(6)\" ng-class=\"{available: isDayAvailable(6)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(6) }} mood\"></i><i class=\"{{ getDayHabitClass(6) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div ng-click=\"goToDay(7)\" ng-class=\"{available: isDayAvailable(7)}\">&nbsp;\n" +
    "				<span>\n" +
    "				<i class=\"{{ getDayMoodClass(7) }} mood\"></i><i class=\"{{ getDayHabitClass(7) }} health\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "			<div ng-show=\"loading\" class=\"loading\">\n" +
    "				{{ 'LOADING_HISTORY' | translate }}\n" +
    "			</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- the Calendar displays for monthly data. -->\n" +
    "	<div ng-if=\"isModeActive('month')\" class=\"month-calendar\">\n" +
    "		<!-- monthly mood display -->\n" +
    "		<div class=\"col-md-4\">\n" +
    "			<div class=\"overflow: hidden\">\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(0) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(1) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(2) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(3) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(4) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(5) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(6) | translate }}</span>\n" +
    "			</div>\n" +
    "			<div class=\"overflow: hidden;\">\n" +
    "				<span ng-repeat=\"day in getDaysBeforeFirstOfMonth()\" class=\"empty-day day\">&nbsp;</span>\n" +
    "				<span ng-repeat=\"day in getDaysInMonth()\" class=\"{{getDayMoodClass(day, isModeActive('week'))}} day\" ng-mouseenter=\"setActiveHighlightDay(day)\" ng-mouseleave=\"setActiveHighlightDay(undefined)\" ng-class=\"{active: activeHighlightDay == day, future: isDayInFuture(day)}\" ng-click=\"goToDay(day)\">{{day}}</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<!-- monthly health display -->\n" +
    "		<div class=\"col-md-4\">\n" +
    "			<div class=\"overflow: hidden\">\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(0) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(1) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(2) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(3) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(4) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(5) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(6) | translate }}</span>\n" +
    "			</div>\n" +
    "			<div class=\"overflow: hidden;\">\n" +
    "				<span ng-repeat=\"day in getDaysBeforeFirstOfMonth()\" class=\"empty-day day\">&nbsp;</span>\n" +
    "				<span ng-repeat=\"day in getDaysInMonth()\" class=\"{{getDayHabitClass(day)}} day heart\" ng-click=\"goToDay(day)\" ng-mouseenter=\"setActiveHighlightDay(day)\" ng-mouseleave=\"setActiveHighlightDay(undefined)\" ng-class=\"{active: activeHighlightDay == day, future: isDayInFuture(day)}\">&nbsp;</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<!-- monthly activity display -->\n" +
    "		<div  class=\"col-md-4\" ng-show=\"!isPacificaLiteUser()\">\n" +
    "			<div class=\"overflow: hidden\">\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(0) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(1) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(2) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(3) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(4) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(5) | translate }}</span>\n" +
    "				<span class='day-title'>{{ getDayAbbreviation(6) | translate }}</span>\n" +
    "			</div>\n" +
    "			<div class=\"overflow: hidden;\">\n" +
    "				<span ng-repeat=\"day in getDaysBeforeFirstOfMonth()\" class=\"empty-day day\">&nbsp;</span>\n" +
    "				<span ng-repeat=\"day in getDaysInMonth()\" class=\"{{getDayActivityClass(day)}} day\" ng-mouseenter=\"setActiveHighlightDay(day)\" ng-mouseleave=\"setActiveHighlightDay(undefined)\" ng-class=\"{active: activeHighlightDay == day, future: isDayInFuture(day)}\" ng-click=\"goToDay(day)\">\n" +
    "				{{ getDayActivityDisplay(day) }}\n" +
    "				</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- active display for the day mode. -->\n" +
    "	<div ng-if=\"isModeActive('day')\" class=\"day\">\n" +
    "\n" +
    "		<!-- mood section -->\n" +
    "		<div class=\"col-md-4 is-mood {{ getModeMoodClass() }} vertical-stretch\">\n" +
    "			<div class=\"slide-image\"></div>\n" +
    "			<strong>{{ 'MOOD' | translate }}</strong>\n" +
    "			<div class=\"{{ getModeMoodClass() }}\">\n" +
    "\n" +
    "				<div ng-repeat=\"stressRating in getModeHabits(19)\" class=\"mood-row\">\n" +
    "					{{getRatingDisplay(stressRating)}}<em class=\"note-icon\"></em>\n" +
    "					<span class=\"timestamp\">{{getRatingDateDisplay(stressRating)}}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<div ng-repeat=\"moodRating in getModeHabits(1)\" ng-class=\"{note: hasNotes(moodRating)}\" ng-click=\"toggleNotes(moodRating)\" class=\"mood-row\">\n" +
    "					{{getRatingDisplay(moodRating)}}<em class=\"note-icon\"></em>\n" +
    "					<span class=\"timestamp\">{{getRatingDateDisplay(moodRating)}}</span>\n" +
    "					<div class=\"feeling-container\">\n" +
    "           				<span ng-repeat=\"subValue in moodRating.habitSubValueIds\" class=\"feeling\">\n" +
    "              			{{getHabitSubValueDisplayById(subValue)}}\n" +
    "            			</span>\n" +
    "          			</div>\n" +
    "          			<div class=\"notes\" ng-show=\"moodRating.habitDataNotes.notes\">\n" +
    "          			{{ moodRating.habitDataNotes.notes }}\n" +
    "          			</div>\n" +
    "				</div>\n" +
    "				<div class=\"mood-row empty\" ng-if=\"!getModeHabits(1) || getModeHabits(1).length == 0\">\n" +
    "					{{ \"PROGRESS_EMPTY\" | translate }}\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div ng-show=\"loading\" class=\"loading\">\n" +
    "				{{ 'LOADING_HISTORY' | translate }}\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<!-- health section -->\n" +
    "		<div class=\"col-md-4 is-health vertical-stretch\">\n" +
    "			<div class=\"slide-image {{ getModeHabitsClass() }}\"></div>\n" +
    "			<strong>{{ 'HEALTH' | translate }}</strong>\n" +
    "			<div ng-repeat=\"habit in accountHabits | filter:filterMoodAndStress\" class=\"{{habit.name}} habit row has-icon\">\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					<span class=\"title\">{{ habit.name | translate }}</span>\n" +
    "					<span ng-if=\"getDailyHabitValue(habit.id).length > 0\">{{ getDailyHabitValue(habit.id) }}</span>\n" +
    "					<span ng-if=\"!getDailyHabitValue(habit.id)\">?</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"mood-row empty\" ng-show=\"!hasHabits\">\n" +
    "					{{ 'HEALTH_EMPTY' | translate }}\n" +
    "			</div> \n" +
    "		</div>\n" +
    "		<!-- activity section -->\n" +
    "		<div class=\"col-md-4 is-relax vertical-stretch\" ng-show=\"!isPacificaLiteUser()\">\n" +
    "			<div class=\"slide-image\"></div>\n" +
    "			<strong>{{ 'ACTIVITIES' | translate }}</strong>\n" +
    "			<div class=\"relax-records\">\n" +
    "				<h3>{{ 'RELAX_ACTIVITY' | translate }}</h3>\n" +
    "				<div ng-repeat=\"activity in getModeActivities('relax')\" class=\"row\">\n" +
    "					{{ getActivityDisplay(activity) }}\n" +
    "					<span>{{ getActivityDateDisplay(activity)}}</span>\n" +
    "				</div>\n" +
    "				<div class=\"row empty\" ng-if=\"getModeActivities('relax').length == 0 || !getModeActivities('relax')\">{{ \"PROGRESS_EMPTY\" | translate }}</div>\n" +
    "			</div>\n" +
    "			<div class=\"relax-records\">\n" +
    "				<h3>{{ 'GOALS' | translate }}</h3>\n" +
    "\n" +
    "				<div class=\"row goal-compl has-icon\" ng-repeat=\"goal in getModeGoals() track by $index\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					{{ goal.title }}\n" +
    "					<span class=\"timestamp\">{{ getGoalDateDisplay(goal) }}</span>\n" +
    "					<span class=\"timestamp\">{{ 'PERCEIVED_DIFFICULTY' | translate}}: {{ goal.difficulty }}</span>\n" +
    "					<span class=\"timestamp\">{{ 'ACTUAL_DIFFICULTY' | translate}}: {{ goal.actualDifficulty }}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row empty\" ng-if=\"getModeGoals().length == 0\">{{ \"PROGRESS_EMPTY\" | translate }}</div>\n" +
    "			</div>\n" +
    "			<div class=\"relax-records\">\n" +
    "				<h3>{{ 'THOUGHTS_ACTIVITY' | translate }}</h3>\n" +
    "				<div class=\"row {{ thought.thoughtType }} has-icon clickable\" ng-repeat=\"thought in getModeThoughts() track by $index\" ng-click=\"handleThoughtReviewRequest(thought)\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					{{ thought.title }}\n" +
    "					<span class=\"timestamp\">{{ getThoughtDateDisplay(thought) }}</span>\n" +
    "					<div ng-if=\"thought.thoughtType == 'AUDIO_DISTORTIONS'\">\n" +
    "		        		<audio-line-item src=\"getRecordingSource(thought, 'thought')\" duration=\"getRecordingDuration(thought, 'thought')\" tags=\"getRecordingTags(thought, 'thought')\" class=\"thought-history negative\"></audio-line-item>\n" +
    "				        <div ng-repeat=\"tag in getRecordingTags(thought, 'thought') | orderBy:'tagTime' | filter:{tagTypeString: 'negative'}  \" class=\"tag-wrapper\">\n" +
    "				          <span class=\"tag-time\">{{ getRecordingTagTimeDisplay(tag) }}</span>\n" +
    "				          <span class=\"tag-label\">{{ getRecordingTagLabel(tag) }}</span>\n" +
    "				        </div>\n" +
    "		        		<audio-line-item src=\"getRecordingSource(thought, 'analysis')\" duration=\"getRecordingDuration(thought, 'analysis')\" tags=\"getRecordingTags(thought, 'analysis')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		      		</div>\n" +
    "		      		<div ng-if=\"thought.thoughtType == 'AUDIO_JOURNAL'\">\n" +
    "		      			<audio-line-item src=\"getRecordingSource(thought, 'journal')\" duration=\"getRecordingDuration(thought, 'journal')\" tags=\"getRecordingTags(thought, 'journal')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		      		</div>\n" +
    "				</div>\n" +
    "				<div class=\"row empty\" ng-if=\"getModeThoughts().length == 0\">{{ \"PROGRESS_EMPTY\" | translate }}</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- active display for the week mode. -->\n" +
    "	<div ng-if=\"isModeActive('week')\">\n" +
    "\n" +
    "		<!-- mood section -->\n" +
    "		<div class=\"col-md-4 is-mood {{ getModeMoodClass() }} vertical-stretch\">\n" +
    "			<div class=\"slide-image\" style=\"display:none;\"></div>\n" +
    "			<div class=\"moodPieChart\" style=\"height:150px\"></div>\n" +
    "			<strong>{{ 'WEEKLY_MOOD' | translate }}</strong>\n" +
    "			<div class=\"{{ getModeMoodClass() }} row extra\">\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'MOOD_AVG' | translate }}</span>\n" +
    "					<span>{{ getModeAverage(1) }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'BEST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMaximumDay(1) }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'WORST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMinimumDay(1) }}</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-bind-html=\"getWordCloud()\" class=\"wordCloud\"></div>\n" +
    "		</div>\n" +
    "		<!-- health section -->\n" +
    "		<div class=\"col-md-4 is-health vertical-stretch\">\n" +
    "			<div class=\"slide-image {{ getModeHabitsClass() }}\"></div>\n" +
    "			<strong>{{ 'WEEKLY_HEALTH' | translate }}</strong>\n" +
    "			<div ng-repeat=\"habit in accountHabits | filter:filterMoodAndStress\" class=\"{{habit.name}} habit row has-icon\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ habit.name | translate }} {{ 'AVERAGE_ABBREVIATION' | translate }}</span>\n" +
    "					<span>{{ getModeAverage(habit.id) }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'BEST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMaximumDay(habit.id) }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'WORST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMinimumDay(habit.id) }}</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"mood-row empty\" ng-show=\"!hasHabits\">\n" +
    "					{{ 'HEALTH_EMPTY' | translate }}\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<!-- activity section -->\n" +
    "		<div class=\"col-md-4 is-relax vertical-stretch\" ng-show=\"!isPacificaLiteUser()\">\n" +
    "			<div class=\"slide-image\"></div>\n" +
    "			<strong>{{ 'WEEKLY_ACTIVITIES' | translate }}</strong>\n" +
    "				<h3>{{ 'RELAX_ACTIVITY' | translate }}</h3>\n" +
    "				<div class=\"row compl\">\n" +
    "					{{ 'COMPLETED' | translate}}\n" +
    "					<span>{{ getModeActivityCount('relax') }}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<h3>{{ 'GOALS' | translate }}</h3>\n" +
    "				<div class=\"row compl\">\n" +
    "					{{ 'COMPLETED' | translate}}\n" +
    "					<span>{{ getModeActivityCount('goals') }}</span>\n" +
    "				</div>\n" +
    "				<div class=\"row goal-compl has-icon\" ng-repeat=\"goal in getModeGoals() track by $index\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					{{ goal.title }}\n" +
    "					<span class=\"timestamp\">{{ getGoalDateDisplay(goal) }}</span>\n" +
    "					<span class=\"timestamp\">{{ 'PERCEIVED_DIFFICULTY' | translate}}: {{ goal.difficulty }}</span>\n" +
    "					<span class=\"timestamp\">{{ 'ACTUAL_DIFFICULTY' | translate}}: {{ goal.actualDifficulty }}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<h3>{{ 'THOUGHTS_ACTIVITY' | translate }}</h3>\n" +
    "				<div class=\"row compl\">\n" +
    "					{{ 'COMPLETED' | translate}}\n" +
    "					<span>{{ getModeActivityCount('thoughts') }}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row empty\" ng-if=\"getModeThoughts().length == 0\">{{ \"PROGRESS_EMPTY\" | translate }}</div>\n" +
    "\n" +
    "				<div class=\"row {{ thought.thoughtType }} has-icon\" ng-repeat=\"thought in getModeThoughts() track by $index\" ng-click=\"handleThoughtReviewRequest(thought)\" ng-class=\"{ clickable: canShowMore(thought) }\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					{{ thought.title }}\n" +
    "					<span class=\"timestamp\">{{ getThoughtDateDisplay(thought) }}</span>\n" +
    "					<div ng-if=\"thought.thoughtType == 'AUDIO_DISTORTIONS'\">\n" +
    "		        		<audio-line-item src=\"getRecordingSource(thought, 'thought')\" duration=\"getRecordingDuration(thought, 'thought')\" tags=\"getRecordingTags(thought, 'thought')\" class=\"thought-history negative\"></audio-line-item>\n" +
    "				        <div ng-repeat=\"tag in getRecordingTags(thought, 'thought') | orderBy:'tagTime' | filter:{tagTypeString: 'negative'}  \" class=\"tag-wrapper\">\n" +
    "				          <span class=\"tag-time\">{{ getRecordingTagTimeDisplay(tag) }}</span>\n" +
    "				          <span class=\"tag-label\">{{ getRecordingTagLabel(tag) }}</span>\n" +
    "				        </div>\n" +
    "		        		<audio-line-item src=\"getRecordingSource(thought, 'analysis')\" duration=\"getRecordingDuration(thought, 'analysis')\" tags=\"getRecordingTags(thought, 'analysis')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		      		</div>\n" +
    "		      		<div ng-if=\"thought.thoughtType == 'AUDIO_JOURNAL'\">\n" +
    "		      			<audio-line-item src=\"getRecordingSource(thought, 'journal')\" duration=\"getRecordingDuration(thought, 'journal')\" tags=\"getRecordingTags(thought, 'journal')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		      		</div>\n" +
    "				</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- active display for the month mode. -->\n" +
    "	<div ng-if=\"isModeActive('month')\">\n" +
    "\n" +
    "		<!-- mood section -->\n" +
    "		<div class=\"col-md-4 is-mood {{ getModeMoodClass() }} vertical-stretch\">\n" +
    "			<div class=\"slide-image\" style=\"display:none;\"></div>\n" +
    "			<div class=\"moodPieChart\" style=\"height:150px\"></div>\n" +
    "			<strong>{{ 'MONTHLY_MOOD' | translate }}</strong>\n" +
    "			<div class=\"{{ getModeMoodClass() }} row extra\">\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'MOOD_AVG' | translate }}</span>\n" +
    "					<span>{{ getModeAverage('Mood') }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'BEST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMaximumDay('Mood') }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'WORST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMinimumDay('Mood') }}</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "			<div ng-bind-html=\"getWordCloud()\" class=\"wordCloud\"></div>\n" +
    "		</div>\n" +
    "		<!-- health section -->\n" +
    "		<div class=\"col-md-4 is-health vertical-stretch\">\n" +
    "			<div class=\"slide-image {{ getModeHabitsClass() }}\"></div>\n" +
    "			<strong>{{ 'MONTHLY_HEALTH' | translate }}</strong>\n" +
    "			<div ng-repeat=\"habit in accountHabits | filter:filterMoodAndStress\" class=\"{{habit.name}} habit row has-icon\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ habit.name | translate }} {{ 'AVERAGE_ABBREVIATION' | translate }}</span>\n" +
    "					<span>{{ getModeAverage(habit.id) }}</span> \n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'BEST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMaximumDay(habit.id) }}</span>\n" +
    "				</div>\n" +
    "				<div style=\"overflow: hidden;\">\n" +
    "					<span class=\"title\">{{ 'WORST_DAY' | translate }}</span>\n" +
    "					<span>{{ getModeMinimumDay(habit.id) }}</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"mood-row empty\" ng-show=\"!hasHabits\">\n" +
    "				{{ 'HEALTH_EMPTY' | translate }}\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<!-- activity section -->\n" +
    "		<div class=\"col-md-4 is-relax vertical-stretch\" ng-show=\"!isPacificaLiteUser()\">\n" +
    "			<div class=\"slide-image\"></div>\n" +
    "			<strong>{{ 'MONTHLY_ACTIVITIES' | translate }}</strong>\n" +
    "\n" +
    "				<h3>{{ 'RELAX_ACTIVITY' | translate }}</h3>\n" +
    "				<div class=\"row compl\">\n" +
    "					{{ 'COMPLETED' | translate}}\n" +
    "					<span>{{ getModeActivityCount('relax') }}</span>\n" +
    "\n" +
    "				</div>\n" +
    "\n" +
    "				<h3>{{ 'GOALS' | translate }}</h3>\n" +
    "				<div class=\"row compl\">\n" +
    "					{{ 'COMPLETED' | translate}}\n" +
    "					<span>{{ getModeActivityCount('goals') }}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row goal-compl has-icon\" ng-repeat=\"goal in getModeGoals() track by $index\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					{{ goal.title }}\n" +
    "					<span class=\"timestamp\">{{ getGoalDateDisplay(goal) }}</span>\n" +
    "					<span class=\"timestamp\">{{ 'PERCEIVED_DIFFICULTY' | translate}}: {{ goal.difficulty }}</span>\n" +
    "					<span class=\"timestamp\">{{ 'ACTUAL_DIFFICULTY' | translate}}: {{ goal.actualDifficulty }}</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<h3>{{ 'THOUGHTS_ACTIVITY' | translate }}</h3>\n" +
    "				<div class=\"row compl\">\n" +
    "					{{ 'COMPLETED' | translate}}\n" +
    "					<span>{{ getModeActivityCount('thoughts') }}</span>\n" +
    "				</div>\n" +
    "				<div class=\"row {{ thought.thoughtType }} has-icon clickable\" ng-repeat=\"thought in getModeThoughts() track by $index\" ng-click=\"handleThoughtReviewRequest(thought)\">\n" +
    "					<i class=\"icon\"></i>\n" +
    "					{{ thought.title }}\n" +
    "					<span class=\"timestamp\">{{ getThoughtDateDisplay(thought) }}</span>\n" +
    "					<div ng-if=\"thought.thoughtType == 'AUDIO_DISTORTIONS'\">\n" +
    "				        <audio-line-item src=\"getRecordingSource(thought, 'thought')\" duration=\"getRecordingDuration(thought, 'thought')\" tags=\"getRecordingTags(thought, 'thought')\" class=\"thought-history negative\"></audio-line-item>\n" +
    "				        <div ng-repeat=\"tag in getRecordingTags(thought, 'thought') | orderBy:'tagTime' | filter:{tagTypeString: 'negative'}  \" class=\"tag-wrapper\">\n" +
    "				          <span class=\"tag-time\">{{ getRecordingTagTimeDisplay(tag) }}</span>\n" +
    "				          <span class=\"tag-label\">{{ getRecordingTagLabel(tag) }}</span>\n" +
    "				        </div>\n" +
    "				        <audio-line-item src=\"getRecordingSource(thought, 'analysis')\" duration=\"getRecordingDuration(thought, 'analysis')\" tags=\"getRecordingTags(thought, 'analysis')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		      		</div>\n" +
    "		      		<div ng-if=\"thought.thoughtType == 'AUDIO_JOURNAL'\">\n" +
    "		      			<audio-line-item src=\"getRecordingSource(thought, 'journal')\" duration=\"getRecordingDuration(thought, 'journal')\" tags=\"getRecordingTags(thought, 'journal')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		      		</div>\n" +
    "				</div>\n" +
    "\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/redeem.html","<div class=\"account-view redeem-view\">\n" +
    "\n" +
    "	<h1>{{ 'REDEEM_GIFT_CODE' | translate }}</h1>\n" +
    "	<h2 ng-show=\"!redemptionSuccessful\">{{ 'REDEEM_GIFT_CODE_DESC' | translate }}</h2>\n" +
    "	<div ng-show=\"!redemptionSuccessful\" style=\"position: relative;\">\n" +
    "		<input type=\"text\" placeholder=\"XXXX-XXXX-XXXX-XXXX\" ng-model=\"formData.giftCode\">\n" +
    "		<!--<button ng-click=\"back()\">{{ 'GO_BACK' | translate }}</button>-->\n" +
    "		<button ng-click=\"redeem()\">{{ 'REDEEM' | translate }}</button>\n" +
    "		<div ng-show=\"formatError\" class=\"error\">{{ 'REDEEM_GIFT_CODE_FORMAT_ERROR' | translate }}</div>\n" +
    "		<div ng-show=\"otherError\" class=\"error\">{{ otherError }}</div>\n" +
    "	</div>\n" +
    "	<div ng-show=\"redemptionSuccessful\">\n" +
    "		<h2>{{ 'GIFT_CARD_REDEEMED' | translate }}</h2>\n" +
    "	</div>\n" +
    "\n" +
    "</div>")

$templateCache.put("templates/therapist.html","<div class=\"account-view your-therapist\">\n" +
    "\n" +
    "  <h1>{{ 'YOUR_THERAPIST' | translate }}</h1>\n" +
    "\n" +
    "  <div class=\"item\" ng-show=\"!loading && !isConnectedToPractitioner()\">\n" +
    "    <div class=\"item-header\">\n" +
    "      <h2>{{ 'THERAPIST_CONNECTIONS' | translate }}</h2>\n" +
    "    </div>\n" +
    "    <div class=\"item-content connections\">\n" +
    "      <p>{{ 'NO_THERAPIST_CONNECTIONS' | translate }}</p>\n" +
    "      <p class=\"bold\">{{ 'NO_THERAPIST_CONNECTIONS2' | translate }}</p>\n" +
    "      <button class=\"btn green\" ng-click=\"showConnectModal()\">\n" +
    "        {{ 'ENTER_INVITE_CODE' | translate }}\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"!loading && isConnectedToPractitioner()\">\n" +
    "    <div ng-include=\"'templates/videoChat.html'\"></div>\n" +
    "\n" +
    "    <div class=\"item\">\n" +
    "      <div class=\"item-header\">\n" +
    "        <h2>{{ 'CONNECTIONS' | translate }}</h2>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-repeat=\"connection in practitionerConnections\" class=\"row row-action item name\">\n" +
    "        {{getPractitionerName(connection)}}\n" +
    "\n" +
    "        <span ng-click=\"showConnectionOptions(connection)\" class=\"more-options\"></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"item\">\n" +
    "      <div class=\"item-header\">\n" +
    "        <h2>{{ 'CURRENT_ASSESSMENTS' | translate }}</h2>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"action-list list\" ng-if=\"todaysAssessmentRequests.length > 0\">\n" +
    "        <div ng-repeat=\"assessmentrequest in todaysAssessmentRequests\"\n" +
    "          class=\"action item assessment-request row row-action\">\n" +
    "          <img src=\"/img/help-full.svg\">\n" +
    "          <span class=\"action-title\">{{ assessmentrequest.requestNote || 'NEW_ASSESSMENT' | translate }}</span>\n" +
    "          <span class=\"action-timestamp\"\n" +
    "            ng-if=\"assessmentrequest.userAssessment.status !== 'COMPLETE'\">{{ 'ASSIGNED_BY' | translate }}\n" +
    "            {{assessmentrequest.requesterFullName}}</span>\n" +
    "          <span class=\"action-timestamp\"\n" +
    "            ng-if=\"assessmentrequest.userAssessment.status === 'COMPLETE'\">{{ 'COMPLETED_AT' | translate }}\n" +
    "            {{assessmentrequest.userAssessment.finishedAt | date:'h:mm a'}}</span>\n" +
    "          <button ng-click=\"takeAssessment(assessmentrequest)\"\n" +
    "            ng-if=\"assessmentrequest.userAssessment.status == undefined\">{{ 'START' | translate }}</button>\n" +
    "          <button ng-click=\"takeAssessment(assessmentrequest)\"\n" +
    "            ng-if=\"assessmentrequest.userAssessment.status === 'INCOMPLETE'\">{{ 'CONTINUE' | translate }}</button>\n" +
    "          <button ng-click=\"viewAssessmentResults(assessmentrequest)\"\n" +
    "            ng-if=\"assessmentrequest.userAssessment.status === 'COMPLETE'\">{{ 'REVIEW' | translate }}</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"action-list list\" ng-if=\"todaysAssessmentRequests.length < 1\">\n" +
    "      <div class=\"action item empty row row-action\">{{ 'EMPTY_ASSESSMENTS' | translate }}</div>\n" +
    "\n" +
    "      <div class=\"item\">\n" +
    "        <div class=\"item-header\">\n" +
    "          <h2>{{ 'UPCOMING_TELETHERAPY_SESSIONS' | translate }}</h2>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"action-list list\">\n" +
    "          <!-- check for appointment -->\n" +
    "          <div ng-repeat=\"appointment in todaysAppointments\" class=\"action item teletherapy row row-action\"\n" +
    "            ng-click=\"tappedAppointment(appointment)\" ng-show=\"isAppointmentToday(appointment)\">\n" +
    "            <img src=\"/img/teletherapy.svg\">\n" +
    "            <span class=\"action-title\">{{ 'SESSION_WITH' | translate }}:\n" +
    "              {{getPractitionerName(appointment.practitioner)}}</span>\n" +
    "            <span class=\"action-timestamp\">{{appointment.startTime | date:'M/dd h:mm a'}}\n" +
    "              ({{getAppointmentTimeDiff(appointment)}})</span>\n" +
    "            <button ng-click=\"startWebAppointment(appointment)\"\n" +
    "              ng-show=\"canStartAppointment(appointment)\">{{ 'GO' | translate }}</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"action-list list\" ng-if=\"(todaysAppointments.length < 1)\">\n" +
    "          <div class=\"action item empty row row-action\">{{ 'EMPTY_TELETHERAPY' | translate }}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"item\" ng-show=\"shouldShowResources()\">\n" +
    "    <div class=\"item-header\">\n" +
    "      <h2>{{ 'CRISIS_INFORMATION' | translate }}</h2>\n" +
    "    </div>\n" +
    "    <div class=\"item-content resources\">\n" +
    "        <div class=\"resource\" ng-bind-html=\"getPersonalizedResources()\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>")

$templateCache.put("templates/therapist.info.modal.html","<ion-modal-view class=\"generic-modal scroll-modal report therapist-lead\" close-handler=\"closeTherapistSharemodal()\">\n" +
    " \n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeTherapistSharemodal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <div class=\"box\" ng-show=\"!showConfirmScreen\">    \n" +
    "      <h1>{{ 'SELECT_PRACTITIONER_TYPE' | translate }}</h1>\n" +
    "      <div class=\"form-wrapper other\">\n" +
    "      	<select ng-model=\"practitionerData.type\">\n" +
    "          <option value=\"{{ 'THERAPIST' | translate}}\">{{ 'THERAPIST' | translate}}</option>\n" +
    "          <option value=\"{{ 'PSYCHOLOGIST' | translate}}\">{{ 'PSYCHOLOGIST' | translate}}</option>\n" +
    "          <option value=\"{{ 'PSYCHIATRIST' | translate}}\">{{ 'PSYCHIATRIST' | translate}}</option>\n" +
    "          <option value=\"{{ 'COUNSELOR' | translate}}\">{{ 'COUNSELOR' | translate}}</option>\n" +
    "          <option value=\"{{ 'SOCIAL_WORKER' | translate}}\">{{ 'SOCIAL_WORKER' | translate}}</option>\n" +
    "          <option value=\"{{ 'DOCTOR' | translate}}\">{{ 'DOCTOR' | translate}}</option>\n" +
    "          <option value=\"{{ 'COACH' | translate}}\">{{ 'COACH' | translate}}</option>\n" +
    "          <option value=\"{{ 'OTHER' | translate}}\">{{ 'OTHER' | translate}}</option>\n" +
    "        </select>\n" +
    "        <input class=\"{{ hasError('name') ? 'error' : '' }}\" type=\"text\" placeholder=\"{{practitionerData.type}}'s {{ 'NAME' | translate}}\" ng-model=\"practitionerData.name\" ng-change=\"removeError('name')\">\n" +
    "        <input class=\"{{ hasError('email') ? 'error' : '' }}\" type=\"email\" placeholder=\"{{practitionerData.type}}'s {{ 'EMAIL' | translate}}\" ng-model=\"practitionerData.email\" ng-change=\"removeError('email')\">\n" +
    "        <input class=\"{{ hasError('userName') ? 'error' : '' }}\" type=\"text\" placeholder=\"{{ 'YOUR_NAME' | translate }} ({{ 'TO_PERSONALIZE_THE_MESSAGE' | translate }})\" ng-model=\"practitionerData.userName\" ng-change=\"removeError('userName')\">\n" +
    "        </div>\n" +
    "        <p>{{ 'SHARE_WITH_THERAPIST_BLURB' | translate }} <strong>{{ 'SHARE_WITH_THERAPIST_BLURB2' | translate }}</strong></p>\n" +
    "\n" +
    "\n" +
    "        <div class=\"bar bar-footer\" ng-show=\"!showConfirmScreen\">\n" +
    "           <button ng-click=\"sharePacificaInfo()\" class=\"button-start\" ng-disabled=\"sendingEmail\">{{ 'SHARE' | translate }}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"showConfirmScreen\" scroll-top-on-show>\n" +
    "          <p>{{ confirmMsg }}</p>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.review.audio.modal.html","<ion-modal-view class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"audio\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ 'AUDIO_MODAL_ERROR_TITLE' | translate }}</h1>\n" +
    "    <p>{{ 'AUDIO_MODAL_ERROR_TEXT' | translate }}</p>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.review.beliefs.modal.html","<ion-modal-view ng-controller=\"TrapsCompleteCtrl\" class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"beliefs\">\n" +
    "\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "\n" +
    "    <h2>{{ 'THOUGHT' | translate }}</h2>\n" +
    "    <p>{{ getRecordingText('thought') }}</p>\n" +
    "\n" +
    "    <h2>{{ 'CORE_BELIEF' | translate }}</h2>\n" +
    "\n" +
    "    <div ng-repeat=\"tag in getRecordingTags('thought')\">\n" +
    "      <!-- only show the last one. -->\n" +
    "      <p ng-if=\"$index == getRecordingTags('thought').length-1\">{{ getRecordingTagString(tag) }}</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-repeat=\"tag in getRecordingTags('evidence')\">\n" +
    "      <h2>{{ getRecordingTagName(tag) }}</h2>\n" +
    "      <p>{{ getRecordingTagString(tag) }}</p>\n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.review.blame.modal.html","<ion-modal-view ng-controller=\"ContributingFactorsCompleteCtrl\" class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"blame\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <canvas id=\"pieChart\" width=\"150\" height=\"150\"></canvas>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "    <p>{{ getRecordingText('event') }}</p>\n" +
    "\n" +
    "    <div ng-repeat=\"tag in tags\" class=\"pie-key\">\n" +
    "      <div class=\"key-wrap\">\n" +
    "        <span class=\"circle\" style=\"background-color:{{getTagColor($index)}}\"></span>\n" +
    "        {{tag.tagString}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.review.evidence.modal.html","<ion-modal-view ng-controller=\"EvidenceCompleteCtrl\" class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"evidence\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "\n" +
    "    <h2>{{ 'THOUGHT' | translate }}</h2>\n" +
    "    <p>{{ getRecordingText('thought') }}</p>\n" +
    "\n" +
    "    <h2>{{ 'QUESTIONS' | translate }}</h2>\n" +
    "\n" +
    "    <p>{{ 'EVIDENCE_QUESTION_1' | translate }}: <strong>{{ getQuestionYesNo(0)}}</strong><br>\n" +
    "    <strong ng-show=\"showQuestionAnswer(0)\">{{getQuestionAnswer(0)}}</strong>\n" +
    "    </p>\n" +
    "\n" +
    "    <p>{{ 'EVIDENCE_QUESTION_2' | translate }}: <strong>{{ getQuestionYesNo(1)}}</strong><br>\n" +
    "    <strong ng-show=\"showQuestionAnswer(1)\">{{getQuestionAnswer(1)}}</strong>\n" +
    "    </p>\n" +
    "\n" +
    "    <p>{{ 'EVIDENCE_QUESTION_3' | translate }}: <strong>{{ getQuestionYesNo(2)}}</strong><br>\n" +
    "    <strong ng-show=\"showQuestionAnswer(2)\">{{getQuestionAnswer(2)}}</strong>\n" +
    "    </p>\n" +
    "\n" +
    "    <p>{{ 'EVIDENCE_QUESTION_4' | translate }}: <strong>{{ getQuestionYesNo(3)}}</strong><br>\n" +
    "    <strong ng-show=\"showQuestionAnswer(3)\">{{getQuestionAnswer(3)}}</strong>\n" +
    "    </p>\n" +
    "\n" +
    "    <p>{{ 'EVIDENCE_QUESTION_5' | translate }}: <strong>{{ getQuestionYesNo(4)}}</strong><br>\n" +
    "    <strong ng-show=\"showQuestionAnswer(4)\">{{getQuestionAnswer(4)}}</strong>\n" +
    "    </p>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.review.generic.modal.html","<ion-modal-view class=\"popoverr slideshow summary thoughts-summary scroll-modal\">\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"{{thoughtType}}\" close-handler=\"closeModal()\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "\n" +
    "    <div ng-repeat=\"recordingType in getRecordingOrder()\" class=\"{{recorrdingType}}\">\n" +
    "\n" +
    "      <div ng-show=\"thoughtType == 'basic' || thoughtType == 'positivity' || thoughtType == 'gratitude' || thoughtType == 'journal' || thoughtType == 'beliefs' \">\n" +
    "        <h2>{{ getRecordingTitle(recordingType) }}</h2>\n" +
    "        <p>{{ getRecordingText(recordingType) }}</p>\n" +
    "        <div ng-repeat=\"tag in getRecordingTags(recordingType)\">\n" +
    "          <h2>{{ getRecordingTagName(tag) }}</h2>\n" +
    "          <p>{{ getRecordingTagString(tag) }}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/thoughts.review.journal.modal.html","<ion-modal-view class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"filter-popover journal\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "      <br>\n" +
    "      <div class=\"thought-highlight-box\" style=\"overflow:scroll !important;\">\n" +
    "        <p>\n" +
    "          {{ thought.recordings.journal.notes }}\n" +
    "        </p>\n" +
    "      </div>  \n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.review.reframe.modal.html","<ion-modal-view ng-controller=\"ReframeCompleteCtrl\" class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"reframe\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "\n" +
    "    <h2>{{ 'THOUGHT' | translate }}</h2>\n" +
    "    <p>{{ getRecordingText('thought')}}</p>\n" +
    "\n" +
    "    <h2>{{ 'REFRAME' | translate }}</h2>\n" +
    "\n" +
    "    <div ng-repeat=\"tag in getRecordingTags('thought')\">\n" +
    "\n" +
    "      <div>\n" +
    "        <p class=\"highlight-box\">{{ getRecordingSection('thought', tag.tagTime, tag.tagSpan)}}</p>\n" +
    "      </div> \n" +
    "      <div>\n" +
    "        <p class=\"highlight-box-positive\">{{ getRecordingSection('analysis', getRecordingTagByIndex('analysis', ($index*2)+1).tagTime, getRecordingTagByIndex('analysis', ($index*2)+1).tagSpan) }}</p>\n" +
    "      </div>\n" +
    "      <p class=\"distortion\">{{ getRecordingTagStringDisplay(tag) }}</p>\n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/thoughts.review.traps.modal.html","<ion-modal-view ng-controller=\"TrapsCompleteCtrl\" class=\"popoverr slideshow summary thoughts-summary scroll-modal\" close-handler=\"closeModal()\">\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"traps\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ getCompletionTitle() }}</h1>\n" +
    "\n" +
    "    <h2>{{ 'THOUGHT' | translate }}</h2>\n" +
    "    <p>{{ getRecordingText('thought')}}</p>\n" +
    "\n" +
    "    <h2>{{ 'THOUGHTS_ACTIVITY_COGNITIVE_DISTORTIONS' | translate }}</h2>\n" +
    "    \n" +
    "    <div ng-repeat=\"tag in getRecordingTags('thought')\">\n" +
    "\n" +
    "      <p class=\"highlight-box\">{{getRecordingSection('thought', tag.tagTime, tag.tagSpan)}}</p>\n" +
    "      <p class=\"distortion\">{{getRecordingTagStringDisplay(tag)}}</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <h2>{{ 'THE_PATTERN' | translate }}</h2>\n" +
    "    <em>{{ 'THE_PATTERN_BYLINE' | translate }}</em>\n" +
    "\n" +
    "    <div ng-repeat=\"distortion in getUniqueTagDistortions('thought')\">\n" +
    "      <p class=\"distortion no-bottom-space\">{{distortion}}</p>\n" +
    "      <p>{{getRecordingTagByIndex('pattern', $index).tagString}}</p>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/thoughts.text.modal.html","<ion-modal-view class=\"touchpoint popoverr scroll-modal\" close-handler=\"closeTextThoughtsModal()\">\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\" class=\"filter-popover\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeTextThoughtsModal()\" ng-if=\"closeTextThoughtsModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "  \n" +
    "    <div ng-bind-html=\"thoughtHTML\" class=\"thought-highlight-box\" style=\"overflow:scroll !important;\"></div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/upgrade.html","<div class=\"upgrade-view\">\n" +
    "\n" +
    "  <div ng-if=\"upgradeComplete\" class=\"upgradeComplete\">\n" +
    "\n" +
    "    <h1>{{ 'ACCOUNT_UPGRADE_COMPLETE_POPUP_HEADER' | translate }}</h1>\n" +
    "    <div ng-if=\"isPractitioner()\">\n" +
    "      <h3>{{ 'ACCOUNT_UPGRADE_COMPLETE_POPUP_CONTENT_PRACTITIONER' | translate }} <a href=\"mailto:info@sanvello.com\">info@sanvello.com</a><br><br></h3>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!isPractitioner()\">\n" +
    "      <h3>{{ 'ACCOUNT_UPGRADE_COMPLETE_POPUP_CONTENT' | translate }} <a href=\"mailto:info@sanvello.com\">info@sanvello.com</a></h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"!!purchasedGiftCodes\">\n" +
    "\n" +
    "      <h1>{{ 'YOUR_PURCHASED_GIFT_CODES' | translate }}</h1>\n" +
    "      <div class=\"gift-code-list\">\n" +
    "        <a href=\"javascript:;\" ng-click=\"downloadGiftCodes()\">{{ 'DOWNLOAD_GIFT_CODES' | translate }}</a>\n" +
    "        <div ng-repeat=\"code in purchasedGiftCodes\">{{code.code}}</div> \n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    " \n" +
    "  <div ng-if=\"!upgradeComplete\" class=\"upgradeComplete\">\n" +
    "    <h1 ng-show=\"!isPractitioner()\">{{ 'ACCOUNT_UPGRADE_POPUP_HEADER' | translate }}</h1>\n" +
    "    <h1 ng-show=\"isPractitioner()\">{{ 'ACCOUNT_UPGRADE_POPUP_HEADER_2' | translate }}</h1>\n" +
    "    <h3 ng-show=\"!isPractitioner()\">{{ 'ACCOUNT_UPGRADE_INFO_POPUP_BLURB1' | translate }}</h3>\n" +
    "    <!--<h3 ng-show=\"isPractitioner()\">{{ 'PRACTITIONER_UPGRADE_DESC' | translate }}</h3>-->\n" +
    "  </div>\n" +
    "\n" +
    "	<!-- copied from https://kale-krate.herokuapp.com/subscribe-more -->\n" +
    "  <div style=\"overflow: visible;\">\n" +
    "\n" +
    "	<form ng-if=\"!upgradeComplete\">\n" +
    "\n" +
    "    <div style=\"overflow: visible;\">\n" +
    "\n" +
    "    <div class=\"right-column-wrapper\">\n" +
    "    <div class=\"right-column\">\n" +
    "      <ul ng-show=\"isPractitioner()\">\n" +
    "        <li><i class=\"icon ion-ios-videocam\"></i><strong>Expand your practice</strong> and <strong>reach new clients</strong> with a featured directory listing and secure teletherapy</li>\n" +
    "        <li><i class=\"icon ion-iphone\"></i><strong>Increase engagement</strong> by giving your clients <a href=\"https://itunes.apple.com/us/app/pacifica-anxiety-stress-depression-relief/id922968861?mt=8\" target=\"_blank\">Sanvello</a>, the #1 Mental Health App <em>($5.99/month value)</em></li>\n" +
    "        <li><i class=\"icon ion-monitor\"></i><strong>Gain deeper insights</strong> by reviewing your clients’ actionable mental health data</li>\n" +
    "        <li><i class=\"icon ion-stats-bars\"></i><strong>Monitor and improve outcomes</strong> in less time by assigning paperless assessments</li> \n" +
    "        <li><i class=\"icon ion-ios-calendar\"></i><strong>Organize your schedule</strong> with simple, easy client appointment scheduling</li>\n" +
    "      </ul>\n" +
    "      <h2>{{ 'DUE_NOW' | translate }}</h2>\n" +
    "      <input data-recurly=\"token\" name=\"recurly-token\" type=\"hidden\" />\n" +
    "      <section id=\"pricing\">\n" +
    "        <input type=\"hidden\" data-recurly=\"currency\" value=\"USD\">\n" +
    "        <span ng-show=\"showPrice()\" class=\"price\">${{price.total}}</span>\n" +
    "\n" +
    "        <span ng-show=\"price.discount > 0\" class=\"discount\">Discount: ${{nextPrice.discount}}</span>\n" +
    "\n" +
    "        <span ng-show=\"updatingPricing\" class=\"center discount\">{{ 'UPDATING_PRICE' | translate }}</span>\n" +
    "\n" +
    "        <!--\n" +
    "        <div ng-show=\"isPractitioner()\">\n" +
    "          <h2>{{ 'NEXT_CHARGE' | translate }}</h2> \n" +
    "          <span ng-show=\"showPrice()\" class=\"price\">${{nextPrice.total}}</span>\n" +
    "\n" +
    "          <span ng-show=\"nextPrice.discount > 0\" class=\"discount\">Discount: ${{nextPrice.discount}}</span>\n" +
    "        </div>\n" +
    "        -->\n" +
    "\n" +
    "        <div style=\"overflow: hidden;\" ng-if=\"allowSubscription\">\n" +
    "          <button ng-click=\"setPlan('monthly')\" ng-class=\"{active: planType == 'monthly'}\">{{ 'MONTHLY' | translate }}</button>\n" +
    "          <button ng-click=\"setPlan('yearly')\" ng-class=\"{active: planType == 'yearly'}\">{{ 'YEARLY' | translate }}</button>\n" +
    "          <button ng-click=\"setPlan('lifetime')\" ng-class=\"{active: planType == 'lifetime'}\" ng-show=\"!isPractitioner()\">{{ 'LIFETIME' | translate }}</button>\n" +
    "          <a href=\"javascript:;\" class=\"coupon\" ng-click=\"showCouponCode()\" ng-show=\"!shouldShowCouponCode\" >{{ 'GOT_A_COUPON_CODE' | translate }}</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"shouldShowCouponCode\" class=\"coupon-code\">\n" +
    "    		  {{ 'COUPON_CODE' | translate }}\n" +
    "          <div class=\"input-wrap\">\n" +
    "            <input type=\"text\" data-recurly=\"coupon\" ng-model=\"formData.coupon\" ng-change=\"couponChanged()\" ng-class=\"{error: hasFieldError('coupon')}\">\n" +
    "            <button ng-click=\"applyCoupon()\">{{ 'APPLY' | translate }}</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"!updatingPricing && requestingCoupon && enteredCoupon() && !hasValidCoupon()\" class=\"is-error\">{{ 'COUPON_ERROR' | translate }}</div>\n" +
    "  		</section>\n" +
    "\n" +
    "      <div class=\"error\" ng-show=\"errorMsg && !isPractitioner()\">\n" +
    "        {{ errorMsg }}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "    <div class=\"left-column-wrapper\">\n" +
    "\n" +
    "    <div class=\"left-column\">\n" +
    "      <div class=\"credit-card-image\"></div>\n" +
    "      <!-- name -->\n" +
    "      <h2>{{ 'SECURE_PAYMENT_INFO' | translate }}</h2>\n" +
    "      <div class=\"row customer-fields--name\">\n" +
    "        <div class=\"form-input form-input__first_name\" ng-class=\"{error: hasFieldError('first_name')}\">\n" +
    "          <label for=\"first_name\">{{ 'FIRST_NAME' | translate }}</label><input data-recurly=\"first_name\" id=\"first_name\" name=\"first-name\" type=\"text\" ng-model=\"formData.firstName\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-input form-input__last_name\" ng-class=\"{error: hasFieldError('last_name')}\">\n" +
    "          <label for=\"last_name\">{{ 'LAST_NAME' | translate }}</label><input data-recurly=\"last_name\" id=\"last_name\" name=\"last-name\" type=\"text\" ng-model=\"formData.lastName\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"row customer-fields--card-number\">\n" +
    "        <div class=\"form-input form-input__number\" ng-class=\"{error: hasFieldError('number')}\">\n" +
    "          <label for=\"number\">{{ 'CREDIT_CARD_NUMBER' | translate }}</label><input data-recurly=\"number\" id=\"number\" type=\"text\" ng-model=\"formData.ccNumber\" ng-change=\"checkCreditCard()\" /><span class=\"icon icon-card icon-card__generic\"></span><span class=\"icon icon-lock\"></span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row customer-fields--name\">\n" +
    "        <div class=\"form-input form-input__selection customer-fields--card-expiry form-input__month form-input__year\" ng-class=\"{error: hasFieldError('month') || hasFieldError('year')}\">\n" +
    "          <label for=\"month\">{{ 'EXPIRATION' | translate }}</label><input data-recurly=\"month\" id=\"month\" maxlength=\"2\" name=\"month\" placeholder=\"MM\" type=\"text\" /><input data-recurly=\"year\" id=\"year\" maxlength=\"2\" name=\"year\" placeholder=\"YY\" type=\"text\" />\n" +
    "        </div>\n" +
    "        <div class=\"form-input customer-fields--card-cvv form-input__cvv\" ng-class=\"{error: hasFieldError('cvv')}\">\n" +
    "          <label for=\"cvv\">{{ 'CVC' | translate }}</label><input data-recurly=\"cvv\" id=\"cvv\" maxlength=\"4\" type=\"text\" ng-model=\"formData.cvv\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"is-gift\" ng-class=\"{active: isGiftPurchase()}\" ng-show=\"!isPractitioner()\">{{'GIFT_CODES_1' | translate}} <a href=\"javascript:;\" ng-click=\"setPlan('giftpurchaser')\">{{'GIFT_CODES_2' | translate}}</a> {{'GIFT_CODES_3' | translate}}</div>\n" +
    "    <div ng-show=\"isGiftPurchase()\" class=\"gift-purchase\">\n" +
    "          <h2>{{ 'BULK_PURCHASE_TITLE' | translate }}</h2>\n" +
    "          <input type=\"number\" ng-model=\"formData.purchases\" ng-change=\"updateGiftPurchases()\" min=\"1\" max=\"1000\">\n" +
    "          <h5>{{ 'BULK_PURCHASE_DESCRIPTION' | translate }}</h5>\n" +
    "    </div>\n" +
    "      <div class=\"error with-spacing\" ng-show=\"errorMsg && isPractitioner()\">\n" +
    "        {{ errorMsg }}\n" +
    "      </div>\n" +
    "      <button class=\"btn-submit\" id=\"subscribe\" type=\"submit\" ng-click=\"submitForm($event)\" ng-disabled=\"submittingForm\">{{ ( submittingForm ? 'PROCESSING' : (isGiftPurchase() ? 'PURCHASE' : 'SUBSCRIBE') ) | translate }}</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  </form>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/videoChat.html","<div ng-draggable=\"dragOptions\" fullscreen=\"fullscreen\" ng-if=\"activeAppointment\" class=\"activeAppointment\" ng-class=\"{fullscreen: fullscreen}\">\n" +
    "    <!--<span ng-class=\"{fullscreen: fullscreen}\" ng-click=\"fullscreen = !fullscreen\">TOGGLE FULLSCREEN</span>-->\n" +
    "    <div ng-repeat=\"(s, m) in remoteParticipants\"  style=\"display: flex;\" class=\"remote\"> \n" +
    "        <twilio-video id=\"remote-media\" tracks=\"m\"></twilio-video>\n" +
    "    </div>\n" +
    "    <div id=\"controls\">\n" +
    "        <div ng-show=\"!hasRemoteParticipant()\" class=\"waiting\">Waiting on other participant.</div>\n" +
    "        <div id=\"preview\">\n" +
    "            <twilio-video id=\"local-media\" tracks=\"localTracks\"></twilio-video>\n" +
    "            <div class=\"btn-wrapper\">\n" +
    "              <button ng-click=\"previewCamera()\" ng-disabled=\"activeRoom\" ng-show=\"!activeRoom && !activeAppointment\" class=\"btn\">{{localTracks.length > 0 ? 'Stop ':'' }}Preview</button>\n" +
    "            <!--\n" +
    "            <button ng-click=\"activateSession()\" ng-disabled=\"activeRoom\" ng-show=\"!activeRoom\">Join Session</button>\n" +
    "            -->\n" +
    "              <button ng-click=\"leaveSession()\" ng-disabled=\"!activeRoom\" title=\"Leave Session\" class=\"btn leave-btn\"></button>\n" +
    "              <button ng-click=\"toggleAudio(!audioTrack.isEnabled)\" ng-disabled=\"!audioTrack\" class=\"audio-btn btn\" ng-class=\"{'on': audioTrack.isEnabled, 'off': !audioTrack.isEnabled}\" title=\"{{audioTrack.isEnabled ?'Mute':'Unmute' }} Microphone\"></button>\n" +
    "              <button ng-click=\"toggleCamera(!videoTrack.isEnabled)\" ng-disabled=\"!videoTrack\" class=\"video-btn btn\" ng-class=\"{'on': videoTrack.isEnabled, 'off': !videoTrack.isEnabled}\" title=\"{{videoTrack.isEnabled ?'Disable':'Enable' }} Camera\">&nbsp;</button>\n" +
    "             <button ng-click=\"fullscreen = !fullscreen\" title=\"{{fullscreen ?'Shrink to Sidebar':'Fullscreen' }}\" class=\"btn fullscreen\" ng-class=\"{'on': fullscreen}\"></button>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>")

$templateCache.put("templates/assessments/intro.html","<div class=\"assessment-view intro\">\n" +
    "<!-- <a href=\"javascript:;\" ng-click=\"closeAssessment()\" class=\"cancel-assessment close\" ng-if=\"partIndex == 0\">X</a> -->\n" +
    "<!--<i class=\"ion-chevron-left go-back\" ng-if=\"partIndex != 0\" ng-click=\"goToPreviousPart()\">go back</i>-->\n" +
    "<div class=\"consent-section-title\"><h2>{{assessment.name | translate }}</h2></div>\n" +
    "<p ng-bind-html=\"assessment.parts[partIndex].description | translate\"></p>\n" +
    "<button class=\"button-primary cancel\" ng-if=\"partIndex != 0\" ng-click=\"goToPreviousPart()\">{{'BACK' | translate}}</button>\n" +
    "<button class=\"button-primary quiz-button\" ng-click=\"startPart()\">{{'START' | translate}}</button>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/assessments/question.html","<div class=\"assessment-view questions informed-consent\" ng-enter=\"!submitting && assessmentRequest.userAssessment.answers[questionIndex] !== null && saveAnswers()\">\n" +
    "\n" +
    "<!-- <a href=\"javascript:;\" ng-click=\"closeAssessment()\" class=\"cancel-assessment close\" ng-if=\"partIndex == 0\">X</a> -->\n" +
    "<!-- <div class=\"close help\" ng-click=\"showHelp()\">?</div>  -->\n" +
    "\n" +
    "<div class=\"consent-section-title\"><h1>{{ 'QUESTION' | translate }} {{questionIndex + 1}} {{'OF' | translate}} {{questionCount}}</h1></div>\n" +
    "<div class=\"progress\" ng-style=\"{background: 'linear-gradient( to right, #1bc98d ' + (questionIndex/questionCount*100 - 5) + '%, #8D8D8D ' + (questionIndex/questionCount*100 + 5) + '%)'}\"></div><!-- just needs a height on it -->\n" +
    "\n" +
    "<p>\n" +
    "	<span><h2 class=\"question fadein\">{{assessment.parts[partIndex].instructions | translate}}: {{assessmentRequest.questions[questionIndex].text | translate}}</h2></span>\n" +
    "	<div class=\"response\" ng-repeat=\"option in assessmentRequest.questions[questionIndex].options\" ng-if=\"assessmentRequest.questions[questionIndex].questionType === 'MULTIPLE_CHOICE'\">\n" +
    "		<span class=\"fadein\">{{option.text | translate}}</span>\n" +
    "		<label class=\"assessment-response-label\">\n" +
    "			<input type=\"radio\" class=\"fadein\" ng-model=\"assessmentRequest.userAssessment.assessmentAnswers[questionIndex].choiceId\" ng-value=\"option.id\" ng-disabled=\"submitting\" ng-change=\"saveAnswers()\">\n" +
    "		</label>\n" +
    "	</div>\n" +
    "\n" +
    "    <div class=\"freetext\" ng-if=\"assessmentRequest.questions[questionIndex].questionType === 'MULTI_SELECT_FREETEXT'\">\n" +
    "      <ul>\n" +
    "        <li ng-repeat=\"option in assessmentRequest.questions[questionIndex].options\" ng-click=\"toggleMultiSelect(option.text)\" role=\"button\" ng-class=\"{'selected': isSelected(option.text)}\">\n" +
    "          {{ option.text | translate }}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <input type=\"text\" ng-change=\"checkForNone(); validateLength();\" ng-model=\"form.freeText\" placeholder=\"{{ 'OTHER' | translate }}\"/>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"integer-range\" ng-class=\"{'empty-input': !assessmentRequest.userAssessment.assessmentAnswers[questionIndex].choiceId}\" ng-if=\"assessmentRequest.questions[questionIndex].questionType === 'INTEGER_RANGE'\">\n" +
    "      <input type=\"number\"\n" +
    "        id=\"integer-range-input\"\n" +
    "        ng-model=\"assessmentRequest.userAssessment.assessmentAnswers[questionIndex].choiceId\"\n" +
    "        placeholder=\"0\"\n" +
    "        ng-change=\"validateRange()\"/>\n" +
    "        <label for=\"integer-range-input\">{{ assessmentRequest.questions[questionIndex].options[0].text | translate }}</label>\n" +
    "\n" +
    "    </div>\n" +
    "    <p ng-if=\"inputError\" class=\"input-error\"> {{ inputError }}</p>\n" +
    "\n" +
    "</p>\n" +
    "\n" +
    "<div class=\"assessment-copyright\" ng-show=\"assessment.copyright\">{{assessment.copyright}}</div>\n" +
    "\n" +
    "<button class=\"outline-button cancel\" ng-disabled=\"submitting\" ng-click=\"goBack()\">{{'BACK' | translate}}</button>\n" +
    "<button class=\"outline-button next\" ng-click=\"saveAnswers()\" ng-show=\"showNext()\" ng-disabled=\"disableNext()\">\n" +
    "  <span ng-if=\"questionIndex == questionCount - 1\">{{ preventAssessmentResults() ? 'FINISH' : 'SEE_RESULTS' | translate}}</span>\n" +
    "  <span ng-if=\"questionIndex != questionCount - 1\">{{'NEXT' | translate}}</span>\n" +
    "</button> \n" +
    "</div>\n" +
    "")

$templateCache.put("templates/assessments/results.html","<div class=\"assessment-view results\">\n" +
    "<div class=\"assessments\">\n" +
    "  <h2 ng-show=\"isReview\">{{'ASSESSMENT_COMPLETED_REVIEW' | translate: translateData}}</h2>\n" +
    "  <h2 ng-show=\"!isReview\">{{'ASSESSMENT_COMPLETED' | translate}}</h2>\n" +
    "  <div class=\"score\" ng-repeat=\"result in assessmentRequest.userAssessment.scores\">\n" +
    "    <p class=\"score-label\">{{result.name | translate}}</p>\n" +
    "    <p class=\"score-value\">{{result.score}}</p>\n" +
    "  </div>\n" +
    "  <p class=\"head\">{{'SCORE_RESULTS' | translate }} </p>\n" +
    "  <p ng-repeat=\"result in assessmentRequest.userAssessment.scores\" class=\"desc\">{{result.description | translate}}</p>\n" +
    "  <div class=\"bar bar-footer\">\n" +
    "    <button ng-show=\"isReview\" class=\"button-primary button-done\" ng-click=\"exitResults()\">{{'OK_GOT_IT' | translate}}</button>\n" +
    "    <button ng-hide=\"isReview\" class=\"button-primary button-done\" ng-click=\"exitResults()\">{{'DONE' | translate}}</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/careteam/coaches.html","\n" +
    "\n" +
    "<div class=\"dashboard-view coaches-view\">\n" +
    "	\n" +
    "	<div class=\"headline-wrap\">\n" +
    "		<h1>Coaches</h1>\n" +
    "	</div>\n" +
    "	\n" +
    "\n" +
    "	<coaches-table \n" +
    "		coaches=\"coaches\"\n" +
    "		sorted-by=\"sortedBy\"\n" +
    "		on-sort=\"onSort(sortDetails)\"\n" +
    "	></coaches-table>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/careteam/individuals.add.modal.html","<ion-modal-view class=\"generic-modal scroll-modal assign-coach-modal\" close-handler=\"closeModal()\">\n" +
    "    <ion-content overflow-scroll=\"true\">\n" +
    "        <i class=\"ion-ios-close-empty close\" ng-click=\"closeModal()\">\n" +
    "            <span>{{ 'CLOSE' | translate }}</span>\n" +
    "        </i>\n" +
    "        <div>\n" +
    "            <h1 class=\"assign-coach-heading\">Assign Coach<i class=\"icon ion-ios-personadd-outline\"></i></h1>\n" +
    "            <p class=\"assign-coach-guide\">Choose a coach from the list below.</p>\n" +
    "            <div class=\"assign-coach-form\">\n" +
    "                <div class=\"coach-data\" ng-repeat=\"coach in coaches\">\n" +
    "                    <div class=\"coach-status\">\n" +
    "                        <label class=\"add-coach-checkmark-container\">\n" +
    "                            <input\n" +
    "                                type=\"radio\"\n" +
    "                                name=\"selectedCoach\" \n" +
    "                                ng-model=\"$parent.selectedCoach\"\n" +
    "                                ng-value=\"coach\" \n" +
    "                                required \n" +
    "                            />\n" +
    "                            <span class=\"checkmark\"></span>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"avatar-container\" ng-if=\"coach.photoUrl\">\n" +
    "                        <img ng-src=\"{{ coach.photoUrl }}\" alt=\"\" class=\"avatar-image\">\n" +
    "                    </div>\n" +
    "                    <div class=\"coach-name\">\n" +
    "                        {{ coach.firstName }} {{ coach.lastName }}\n" +
    "                    </div>\n" +
    "                    <div class=\"coach-individuals\">\n" +
    "                        <span class=\"count\">\n" +
    "                            {{ coach.assignedClients }}\n" +
    "                        </span>\n" +
    "                        <span class=\"individuals-label\">{{ 'INDIVIDUALS' | translate }}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <p class=\"assign-error\" ng-if=\"assignError\">{{ assignError }}</p>\n" +
    "                <button \n" +
    "                    type=\"button\" \n" +
    "                    ng-disabled=\"!selectedCoach || assignError\"\n" +
    "                    ng-click=\"assignCoachToIndividual(selectedCoach, individualId)\"    \n" +
    "                >ASSIGN</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/careteam/individuals.html","\n" +
    "\n" +
    "<div class=\"dashboard-view clients-view individuals-view\" infinite-scroll=\"getNextPage()\">\n" +
    "	<div ng-include=\"'templates/careteam/individuals/individuals-header.html'\"></div>\n" +
    "\n" +
    "	<individuals-table \n" +
    "		individuals=\"individuals\"\n" +
    "		sorted-by=\"sortedBy\"\n" +
    "		on-sort=\"onSort(sortDetails)\"\n" +
    "		on-assign=\"openAssignModalForIndividual(individualId)\"\n" +
    "		is-manager-view=\"isManagerView()\"\n" +
    "		is-backend-coach-view=\"isBackendCoachView()\"\n" +
    "	></individuals-table>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/community/community.createPost.modal.html","<ion-modal-view class=\"new-post generic-modal scroll-modal\" close-handler=\"closeCreatePostModal()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeCreatePostModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <h1>{{ 'COMMUNITY_POST_TITLE' | translate}}</h1>\n" +
    "      <p class=\"no-indent\"><strong>{{group.name}}</strong><br>{{groupDescription}}</p>\n" +
    "      <p class=\"no-indent\" style=\"position: relative;\">\n" +
    "        <textarea placeholder=\"{{ 'COMMUNITY_POST_PLACEHOLDER' | translate }}\" id=\"communityPostText\" ng-model=\"communityPostData.postText\"></textarea>\n" +
    "\n" +
    "        <span class=\"char-count\" style=\"{{ getCommunityPostRemainingCharacters() < 20 ? 'color:red' : ''}}\">{{getCommunityPostRemainingCharacters()}}</span>\n" +
    "      </p>\n" +
    "      <p ng-if=\"communityError\" class=\"error\">{{communityError}}</p>\n" +
    "      <p class=\"light no-indent\">{{ 'COMMUNITY_POST_WARNING' | translate}}</p>\n" +
    "      <div class=\"clearfix\">\n" +
    "        <button ng-click=\"createCommunityPost()\" class=\"button-start\">\n" +
    "          {{ 'CREATE_POST' | translate }}\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/community/community.html","<div class=\"groups-container\">\n" +
    "  \n" +
    "  <div class=\"sub-sidebar\">\n" +
    "    <div class=\"account-overview\">\n" +
    "      <div class=\"overview-left\">\n" +
    "        <div class=\"{{getUserAvatar()}} avatar\"></div>\n" +
    "      </div>\n" +
    "      <div class=\"overview-right\">\n" +
    "        <div class=\"account-nickname\" ng-click=\"showUpdateNickname()\">\n" +
    "          {{getUserNickname()}}\n" +
    "          <i class=\"icon ion-edit\" ng-click=\"showUpdateNickname()\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"stats-left\">\n" +
    "          <div>{{getUserShares()}}</div>\n" +
    "          <div>{{ 'POSTS' | translate }}</div>\n" +
    "        </div>\n" +
    "        <div class=\"stats-right\">\n" +
    "          <div>{{getUserLikes()}}</div>\n" +
    "          <div>{{ 'LIKES' | translate }}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <ul>\n" +
    "      <li id=\"group-list-title\">Topics</li>\n" +
    "      <li ng-repeat=\"community in communities\" class=\"group-list-item\" ng-class=\"{active: location.search().groupId == community.id}\" ng-hide=\"community.name == 'Experiments' \">\n" +
    "        <a href=\"/app#/app/community?groupId={{community.id}}&order=hotness\">{{community.name}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"chat-container\" id=\"groupPosts\">\n" +
    "    \n" +
    "    <div class=\"group-title-banner\">\n" +
    "      <a href=\"javascript:;\" class=\"navicon-button\" ng-click=\"toggleMobileSideBar()\">\n" +
    "        <button class=\"button button-clear icon ion-ios-navicon\">\n" +
    "        </button>\n" +
    "      </a>\n" +
    "      <h2>{{group.name}}</h2>\n" +
    "      <ul>\n" +
    "        <li ng-class=\"{active: location.search().order == 'hotness'}\" ng-click=\"showTop()\">\n" +
    "          <a href=\"javascript:;\">{{ 'HOT' | translate }}</a>\n" +
    "        </li>\n" +
    "        <li ng-class=\"{active: location.search().order == 'date'}\" ng-click=\"showNew()\">\n" +
    "          <a href=\"javascript:;\">{{ 'NEW' | translate }}</a>\n" +
    "        </li>\n" +
    "        <li ng-class=\"{active: location.search().order == 'score'}\" ng-click=\"showAllTime()\">\n" +
    "          <a href=\"javascript:;\">{{ 'TOP' | translate }}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <button class=\"post-button web-button\" ng-click=\"showCreatePost()\">{{ 'COMMUNITY_POST_TITLE' | translate }}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"isLoadingMore\" class=\"web-messages-loading-community\">{{ 'LOADING' | translate }}...</div>\n" +
    "\n" +
    "    <div class=\"chat-scroll-container masonry-wrapper\" scroll-trigger=\"loadMoreGroupsPosts(false)\" trigger-direction=\"down\" threshold=\"400\" scroll-element-type=\"window\">\n" +
    "\n" +
    "      <div class=\"masonry-grid\">\n" +
    "        <div class=\"grid-sizer\"></div>\n" +
    "        <div ng-repeat=\"post in groupPosts\" ng-if=\"groupPosts && groupPosts.length > 0\" class=\"post grid-item\" ng-click=\"showMore(post)\" ng-init=\"$last && initMasonry()\">\n" +
    "          <div class=\"{{getPostAvatar(post)}} avatar\"></div>\n" +
    "          <span ng-class=\"{notify: hasPostNotification(post.id)}\" class=\"author\"><strong>{{getPostCreatorNickname(post)}}</strong><br>{{getPostDate(post)}}</span>\n" +
    "          <div ng-bind-html=\"getPostTitle(post)\" class=\"post-title\"></div>\n" +
    "          <div class=\"community-actions-wrapper clearfix\">\n" +
    "\n" +
    "            <a ng-if=\"retrievedUserContext && !hasVote(post)\" href=\"javascript:;\" ng-click=\"voteUp($event, post)\" class=\"row-options blocky-button blocky-button\"><i class=\"icon ion-ios-heart-outline\"></i><span class=\"tiny-label\">{{post.score}}</span></a>\n" +
    "            <a ng-if=\"retrievedUserContext && hasVote(post)\" href=\"javascript:;\" ng-click=\"removeVote($event, post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-heart\"></i><span class=\"tiny-label\"><b>{{post.score}}</b></span></a>\n" +
    "\n" +
    "            <a href=\"javascript:;\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-chatbubble-outline\"></i><span class=\"tiny-label\">{{post.comments}}</span></a>\n" +
    "\n" +
    "            <a href=\"javascript:;\" ng-click=\"sharePost($event, post)\" class=\"row-options blocky-button\"><i class=\"icon ion-share\"></i><span class=\"tiny-label\">{{ 'SHARE' | translate }}</span></a>\n" +
    "\n" +
    "            <a href=\"javascript:;\" ng-click=\"showReportPost($event, post)\" ng-if=\"retrievedUserContext && !isPostOwner(post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-flag-outline\"></i><span class=\"tiny-label\">{{ 'REPORT' | translate }}</span></a>\n" +
    "\n" +
    "            <a href=\"javascript:;\" ng-click=\"addExperiment($event, post)\" ng-if=\"retrievedUserContext && showAddExperiment(post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-bolt-outline\"></i><span class=\"tiny-label\">{{ 'COPY' | translate }}</span></a>\n" +
    "\n" +
    "            <a href=\"javascript:;\" ng-click=\"deletePost($event, post)\" ng-if=\"retrievedUserContext && isPostOwner(post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-trash-outline\"></i><span class=\"tiny-label\">{{ 'DELETE' | translate }}</span></a>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/community/community.post.comments.modal.html","<ion-modal-view class=\"scroll-modal summary thoughts-summary community\" ng-controller=\"GroupPostCommentsCtrl\" close-handler=\"closePostCommentsModal()\">\n" +
    "\n" +
    "  <!-- Because of the dynamic nature of loading communities, this cannot be in the title attribute. -->\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\" id=\"groupPosts\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closePostCommentsModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i> \n" +
    "    \n" +
    "    <div class=\"grid\">\n" +
    "\n" +
    "        <div class=\"{{getPostAvatar(post)}} avatar\"></div>\n" +
    "        <div class=\"author author-info\">\n" +
    "          <div class=\"author-info-name\">{{getPostCreatorNickname(post)}}</div>\n" +
    "          <div class=\"author-info-date\">{{getPostDate(post)}}</div>\n" +
    "        </div>\n" +
    "        <div class=\"main-post-text\" ng-bind-html=\"getCommentPostTitle(post)\"></div>\n" +
    "\n" +
    "        <div class=\"community-actions-wrapper clearfix\">\n" +
    "\n" +
    "          <a ng-if=\"retrievedUserContext && !hasVote(post)\" href=\"javascript:;\" ng-click=\"voteUp($event, post)\" class=\"row-options blocky-button blocky-button\"><i class=\"icon ion-ios-heart-outline\"></i><span class=\"tiny-label\">{{post.score}}</span></a>\n" +
    "          <a ng-if=\"retrievedUserContext && hasVote(post)\" href=\"javascript:;\" ng-click=\"removeVote($event, post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-heart\"></i><span class=\"tiny-label\"><b>{{post.score}}</b></span></a>\n" +
    "\n" +
    "          <a href=\"javascript:;\" ng-click=\"sharePost($event, post)\" class=\"row-options blocky-button\"><i class=\"icon ion-share\"></i><span class=\"tiny-label\">{{ 'SHARE' | translate }}</span></a>\n" +
    "\n" +
    "          <a href=\"javascript:;\" ng-click=\"showReportPost($event, post)\" ng-if=\"retrievedUserContext && !isPostOwner(post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-flag-outline\"></i><span class=\"tiny-label\">{{ 'REPORT' | translate }}</span></a>\n" +
    "\n" +
    "          <a href=\"javascript:;\" ng-click=\"addExperiment($event, post)\" ng-if=\"retrievedUserContext && showAddExperiment(post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-bolt-outline\"></i><span class=\"tiny-label\">{{ 'COPY' | translate }}</span></a>\n" +
    "\n" +
    "          <a href=\"javascript:;\" ng-click=\"deletePost($event, post)\" ng-if=\"retrievedUserContext && isPostOwner(post)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-trash-outline\"></i><span class=\"tiny-label\">{{ 'DELETE' | translate }}</span></a>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"write-message wrapper shadow\" ng-class=\"{'is-focused': isInputFocused()}\">\n" +
    "      <textarea id=\"postText\" placeholder=\"{{ 'GROUP_POST_PLACEHOLDER' | translate }}\" maxlength=\"512\" style=\"{{ getGroupRemainingPostCharacters() < 20 ? 'color:red' : ''}}\" ng-focus=\"inputFocused()\" ng-blur=\"inputBlurred()\" ng-model=\"groupPostData.postText\" ng-disabled=\"postingComment\"></textarea>\n" +
    "      <button ng-click=\"postComment($event)\" ng-disabled=\"postingComment || !hasPostText()\" class=\"post-button web-button\" ng-class=\"{'is-on': hasPostText()}\">{{ 'COMMENT' | translate }}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"community-tabs\">\n" +
    "        <a href=\"javascript:;\" ng-click=\"showNew()\" class=\"community-tab\" ng-class=\"{active: order == 'date'}\">{{ 'NEW' | translate }}</a>\n" +
    "        <a href=\"javascript:;\" ng-click=\"showAllTime()\" class=\"community-tab\" ng-class=\"{active: order == 'score'}\">{{ 'TOP' | translate }}</a>\n" +
    "    </div>  \n" +
    "\n" +
    "    <div ng-if=\"!loadingComments\" class=\"community-posts\">\n" +
    "\n" +
    "      <div ng-if=\"!postComments || postComments.length == 0\">\n" +
    "        <h2 class=\"quote\">{{ 'COMMENTS_EMPTY' | translate }}</h2>\n" +
    "      </div>\n" +
    "      <div ng-repeat=\"comment in postComments\" ng-if=\"postComments && postComments.length > 0\" class=\"post\">\n" +
    "        <div class=\"{{getPostAvatar(comment)}} avatar\"></div>\n" +
    "          <div class=\"author\">\n" +
    "            <span><strong>{{getPostCreatorNickname(comment)}}</strong><br>{{getPostDate(comment)}}</span>\n" +
    "          </div>\n" +
    "          <div class=\"main-post-text\" ng-bind-html=\"getPostTitle(comment, true)\"></div>\n" +
    "\n" +
    "         <div class=\"community-actions-wrapper clearfix\">\n" +
    "\n" +
    "        <a ng-if=\"retrievedUserContext && !hasCommentVote(comment)\" href=\"javascript:;\" ng-click=\"voteCommentUp($event, comment)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-heart-outline\"></i><span class=\"tiny-label\"><b>{{comment.score}}</b></span></a>\n" +
    "        <a ng-if=\"retrievedUserContext && hasCommentVote(comment)\" href=\"javascript:;\" ng-click=\"removeCommentVote($event, comment)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-heart\"></i><span class=\"tiny-label\"><b>{{comment.score}}</b></span></a>\n" +
    "\n" +
    "        <a href=\"javascript:;\" ng-click=\"showReportComment($event, comment)\" ng-if=\"retrievedUserContext && !isPostOwner(comment)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-flag-outline\"></i><span class=\"tiny-label\">{{ 'REPORT' | translate }}</span></a>\n" +
    "\n" +
    "        <a href=\"javascript:;\" ng-click=\"deleteComment($event, comment)\" ng-if=\"retrievedUserContext && isPostOwner(comment)\" class=\"row-options blocky-button\"><i class=\"icon ion-ios-trash-outline\"></i><span class=\"tiny-label\">{{ 'DELETE' | translate }}</span></a>\n" +
    "      </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div ng-show=\"canLoadMore && postComments && postComments.length > 0\" class=\"load-more\" style=\"padding-bottom:60px;\">\n" +
    "      <a href=\"javascript:;\" ng-click=\"loadMorePostComments()\">{{ 'LOAD_MORE' | translate }}</a>\n" +
    "    </div>\n" +
    "    <div ng-show=\"!canLoadMore && postComments && postComments.length > 0\" class='load-more' style=\"padding-bottom:60px;\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/community/community.shareContent.modal.html","<ion-modal-view class=\"generic-modal assessment-modal scroll-modal\" close-handler=\"closeShareContentModal()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeShareContentModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ 'SHARE_POST' | translate }}</h1>\n" +
    "\n" +
    "    <div id=\"social-share-tooltip\" ng-click=\"$event.stopPropagation()\">\n" +
    "      <input type=\"text\" name=\"\" value=\"{{socialTooltipUrl}}\">\n" +
    "      <button class=\"icon ion-ios-paper-outline blocky-button\" id=\"copy-button\" ng-click-copy=\"{{socialTooltipUrl}}\">\n" +
    "        <span>{{ 'COPY' | translate }}</span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/community/community.updateNickname.modal.html","<ion-modal-view class=\"new-post generic-modal scroll-modal\" close-handler=\"closeNicknameModal()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">  \n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeNicknameModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <h1>{{ 'UPDATE_PUBLIC_NICKNAME' | translate}}</h1>\n" +
    "       \n" +
    "        <input type=\"text\" placeholder=\"{{ 'NICKNAME' | translate }}\" ng-model=\"originalNickname\" name=\"nickname\" id=\"updateUserNickname\" maxlength=\"20\">\n" +
    "\n" +
    "      <p class=\"no-indent\">\n" +
    "        {{ 'UPDATE_PUBLIC_NICKNAME_BODY' | translate }}\n" +
    "      </p>\n" +
    "\n" +
    "      <p ng-if=\"nicknameError\" class=\"error\">\n" +
    "        {{nicknameError}}\n" +
    "      </p>\n" +
    "      <div class=\"clearfix\">\n" +
    "      <button ng-click=\"updatePublicNickname()\" class=\"button-start\" ng-disabled=\"updatingNickname\">\n" +
    "        {{ 'UPDATE_NICKNAME' | translate }}\n" +
    "      </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/groups/groups.browseGroups.modal.html","<ion-modal-view class=\"generic-modal scroll-modal browse\" close-handler=\"closeBrowseGroupsModal()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeBrowseGroupsModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i> \n" +
    "\n" +
    "    <div class=\"box\">\n" +
    " \n" +
    "      <h1>{{ 'FIND_SUPPORT' | translate }}</h1>\n" +
    "      <h2>{{ 'FIND_SUPPORT_SUBHEAD' | translate }}</h2>\n" +
    "\n" +
    "      <div ng-show=\"curatedGroups.length == 0\"> \n" +
    "        {{ 'SUPPORT_GROUPS_NOT_AVAILABLE' | translate }}\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"loadingCuratedGroups\" class=\"is-loading\">\n" +
    "        {{ 'LOADING_SUPPORT_GROUPS' | translate }}\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"!loadingCuratedGroups\" ng-class=\"{joining: joiningCuratedGroup}\">\n" +
    "\n" +
    "        <div ng-show=\"curatedGroups.length == 0\" class=\"is-loading\">\n" +
    "          {{ 'SUPPORT_GROUPS_NOT_AVAILABLE' | translate }}\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-repeat=\"category in curatedCategories\" class=\"category\">\n" +
    "          <div class=\"cat-title\" ng-click=\"toggleCategoryDisplay(category)\">\n" +
    "            {{category}}\n" +
    "            <i class=\"icon ion-ios-minus\" ng-show=\"isDisplayingCategory(category)\"></i>\n" +
    "            <i class=\"icon ion-ios-plus\" ng-show=\"!isDisplayingCategory(category)\"></i>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div ng-repeat=\"group in curatedGroups[category]\" ng-click=\"joinCuratedGroup(group.id, group.code)\" class=\"group-cat\" ng-show=\"isDisplayingCategory(category)\">\n" +
    "            {{group.name}}\n" +
    "            <span class=\"groupDescription\" ng-show=\"group.description && group.description.length > 0\"><br>{{getGroupDescription(group)}}</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/groups/groups.editGroup.modal.html","<ion-modal-view class=\"generic-modal scroll-modal assessment-modal\" close-handler=\"closeEditGroupModal()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeEditGroupModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i> \n" +
    " \n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <h1>{{ 'EDIT_GROUP_TITLE' | translate}}</h1>\n" +
    "\n" +
    "        <p ng-if=\"retrievedUserContext && isOwnerById(editGroupId)\">\n" +
    "          <label>{{ 'GROUP_NAME_LABEL' | translate}}</label>\n" +
    "          <input type=\"text\" placeholder=\"{{ 'GROUP_NAME' | translate }}\" name=\"groupName\" id=\"groupName\" ng-model=\"newGroupData.name\" maxLength=\"64\">\n" +
    "        </p>\n" +
    "\n" +
    "      <div class=\"mock-radio-container\" ng-if=\"retrievedUserContext && isOwnerById(editGroupId)\">\n" +
    "        <span class=\"mock-radio\"></span><input type=\"radio\" name=\"searchable\" ng-model=\"newGroupData.searchable\" ng-value=\"{{false}}\" id=\"groupNotSearchable\">{{ 'PRIVATE_GROUP_LABEL' | translate}}<span class=\"mock-radio\"></span>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"mock-radio-container\" ng-if=\"retrievedUserContext && isOwnerById(editGroupId)\">\n" +
    "        <span class=\"mock-radio\"></span><input type=\"radio\" name=\"searchable\" ng-model=\"newGroupData.searchable\" ng-value=\"{{true}}\" id=\"groupSearchable\" checked>{{ 'PUBLIC_GROUP_LABEL' | translate}}<span class=\"mock-radio\"></span>\n" +
    "      </div>\n" +
    "      <br><br>\n" +
    "\n" +
    "      <p class=\"description-wrapper no-padding\" ng-show=\"newGroupData.searchable\" ng-if=\"retrievedUserContext && isOwnerById(editGroupId)\">\n" +
    "        <textarea ng-model=\"newGroupData.description\" id=\"groupDescription\" placeholder=\"{{ 'GROUP_DESCRIPTION_PROMPT' | translate }}\" id=\"moodNote\"></textarea>\n" +
    "      </p> \n" +
    "\n" +
    "      <p ng-if=\"groupError\" class=\"error\">{{groupError}}</p>\n" +
    "\n" +
    "      <button ng-click=\"editGroup()\" class=\"button\" ng-disabled=\"editingGroup\">\n" +
    "        {{ 'UPDATE_GROUP' | translate }}\n" +
    "      </button>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/groups/groups.html","<div class=\"groups-container\">\n" +
    "  \n" +
    "  <div class=\"sub-sidebar\">\n" +
    "\n" +
    "\n" +
    "    <div class=\"mock-label\">\n" +
    "      <i class=\"icon ion-ios-search\"></i>\n" +
    "      <input type=\"text\" placeholder=\"{{ 'SEARCH_FOR_GROUPS' | translate }}\" name=\"searchgroups\" id=\"searchGroups\" maxlength=\"32\" ng-model=\"searchQuery.query\" ng-change=\"searchGroups()\">\n" +
    "      <span ng-click=\"clearGroupSearch()\" class=\"clear-goal\" ng-show=\"searchQuery.query.length > 0\">X</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <button ng-click=\"browseCuratedGroups()\">{{ 'BROWSE_GROUPS_WEB' | translate }}</button>\n" +
    "\n" +
    "    <a id=\"group-code\" ng-click=\"showJoinGroupByCode()\">{{ 'GOT_GROUP_CODE' | translate }}</a>\n" +
    "\n" +
    "    <div ng-show=\"hasSearchEntry\" class=\"hasSearchEntry\">\n" +
    "      <div class=\"item item-divider\">{{ 'AVAILABLE_GROUPS' | translate }} <span ng-show=\"searchableGroups.length > 0\">({{searchableGroups.length}})</span></div>\n" +
    "        <div ng-show=\"isSearching\" class=\"item empty-search\">\n" +
    "          {{ 'SEARCHING' | translate }}...\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"group in searchableGroups\" ng-if=\"!isSearching && searchableGroups && searchableGroups.length > 0\" ng-click=\"showJoinGroup(group.id, group.code)\" class=\"item\">\n" +
    "          <span>{{group.name}}</span>\n" +
    "          <em>({{group.members}} {{ (group.members == 1 ? 'MEMBER' : 'MEMBERS') | translate }})</em>\n" +
    "          <div class=\"group-description\">{{group.description}}</div>\n" +
    "\n" +
    "          </div>\n" +
    "          <div ng-show=\"!isSearching && (!searchableGroups || searchableGroups.length == 0)\" class=\"item empty-search\">\n" +
    "          {{ 'NO_SEARCHABLE_GROUPS' | translate }}\n" +
    "        </div>\n" +
    "     </div>\n" +
    "\n" +
    "    <ul>\n" +
    "      <li id=\"group-list-title\">{{ 'PRIVATE_GROUPS' | translate }}</li>\n" +
    "      <li class=\"group-list-item\" ng-repeat=\"group in userGroups | filter:{ groupType: 'GROUP' } as filteredUserGroups\" ng-class=\"{active: location.search().groupId == group.id}\" ng-if=\"userGroups && userGroups.length > 0 && group.groupType == 'GROUP'\">\n" +
    "        <a href=\"/app#/app/groups?groupId={{group.id}}\">{{group.name}}</a>\n" +
    "      </li>\n" +
    "      <li class=\"group-list-item\" ng-if=\"!(filteredUserGroups.length > 0) && userGroups\">\n" +
    "        <a ng-click=\"browseCuratedGroups()\">{{ 'NO_GROUPS_3' | translate }}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    \n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"chat-container\" ng-controller=\"GroupPostsCtrl\" id=\"groupPosts\">\n" +
    "    \n" +
    "    <div class=\"group-title-banner\" ng-show=\"group\">\n" +
    "      <a href=\"javascript:;\" class=\"navicon-button\" ng-click=\"toggleMobileSideBar()\">\n" +
    "        <button class=\"button button-clear icon ion-ios-navicon\">\n" +
    "        </button>\n" +
    "      </a>\n" +
    "      <h1>{{group.name}}</h1>\n" +
    "      <a href=\"javascript:;\" class=\"settings-button\" ng-if=\"isOwner(group)\" ng-click=\"showEditGroup($event, group)\">\n" +
    "        <button class=\"button button-clear icon ion-ios-gear-outline\">\n" +
    "          <span>{{ 'SETTINGS' | translate }}</span>\n" +
    "        </button>\n" +
    "      </a>\n" +
    "      <a href=\"javascript:;\" class=\"invite-button\" ng-click=\"showInvite()\" ng-if=\"retrievedUserContext && (isOwner(group) || group.searchable)\">\n" +
    "        <button class=\"button button-clear icon ion-ios-personadd-outline\">\n" +
    "          <span>{{ 'INVITE_TO_GROUP_WEB' | translate }}</span>\n" +
    "        </button>\n" +
    "      </a>\n" +
    "      <div class=\"group-number-of-members\">{{group.members}} members</div>\n" +
    "      <span class=\"group-leave-group\" ng-click=\"archiveGroup($event, group)\">({{ 'LEAVE_GROUP' | translate }})</span>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"chat-scroll-container\" scroll-trigger=\"!loadingPosts && loadMoreGroupsPosts()\" threshold=\"350\" trigger-direction=\"up\" scroll-element-type=\"window\">\n" +
    "\n" +
    "\n" +
    "      <div ng-show=\"isLoadingMore\" class=\"web-messages-loading\">{{ 'LOADING' | translate }}...</div>\n" +
    "\n" +
    "      <div ng-repeat=\"post in groupPosts | unique:'id'\" ng-if=\"groupPosts && groupPosts.length > 0\" class=\"group-message-wrapper\" ng-class=\"{'is-mood': isPostType(post, 'Mood')}\" on-finish-render=\"scrollBottom()\">\n" +
    "        <div class=\"creator\">\n" +
    "          <span class=\"creator-nickname\">{{post.creatorNickname}}</span>\n" +
    "          <span class=\"creator-date\"> - {{getPostDate(post)}}</span>\n" +
    "        </div>\n" +
    "        <div class=\"{{getPostAvatar(post)}} avatar\"></div> <!--{{post.creatorNickname}}-->\n" +
    "        <div class=\"group-post\">\n" +
    "          <div class=\"group-message-button\" ng-if=\"retrievedUserContext && !isPostOwner(post)\" ng-click=\"showReportPost($event, post)\"></div>\n" +
    "          <span class=\"group-post-copy\" ng-bind-html=\"getPostTitle(post)\"></span>\n" +
    "          <div class=\"list\">\n" +
    "\n" +
    "            <div ng-if=\"retrievedUserContext && isPostType(post, 'Mood')\" class=\"mood-row\">\n" +
    "              <div data-mooddata=\"{{getMoodData(post)}}\" data-startdate=\"{{getMoodStartDate(post)}}\" data-numberofdays=\"{{getMoodNumberOfDays(post)}}\" data-postid=\"{{post.id}}\" class=\"graph\">\n" +
    "                <canvas height=\"120\" width=\"50\"></canvas> <!-- The width needs to be less than 100. It will get rewritten. -->\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"retrievedUserContext && isPostType(post, 'Thought')\" class=\"item recording expanded\" ng-click=\"showTextThought(post)\">\n" +
    "              <span class=\"title\">{{getThought(post).title}}</span>\n" +
    "              <span class=\"date\">{{getThoughtDate(post)}}</span>\n" +
    "\n" +
    "              <span ng-if=\"retrievedUserContext && isThoughtExpired(post)\">[{{ 'LISTENING_PERIOD_EXPIRED' | translate }}]</span>\n" +
    "              <div class=\"counter-wrap\" ng-show=\"isAudioThought(post) || isTextThought(post)\">\n" +
    "                <div class=\"negative\">{{getNegativeFlags(post)}}</div>\n" +
    "              </div>\n" +
    "              <div ng-if=\"retrievedUserContext && !isThoughtExpired(post)\">\n" +
    "\n" +
    "                <div ng-if=\"isAudioJournal(post)\">\n" +
    "                  <audio-line-item src=\"getRecordingSource(getThought(post), 'journal')\" duration=\"getRecordingDuration(getThought(post), 'thought')\" tags=\"getRecordingTags(getThought(post), 'journal')\" class=\"thought-history\"></audio-line-item>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-if=\"isAudioThought(post)\">\n" +
    "                  <audio-line-item src=\"getRecordingSource(getThought(post), 'thought')\" duration=\"getRecordingDuration(getThought(post), 'thought')\" tags=\"getRecordingTags(getThought(post), 'thought')\" class=\"thought-history\"></audio-line-item>\n" +
    "                  <audio-line-item src=\"getRecordingSource(getThought(post), 'analysis')\" duration=\"getRecordingDuration(getThought(post), 'analysis')\" tags=\"getRecordingTags(getThought(post), 'analysis')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-if=\"isTextThought(post)\" class=\"text-thought-shared\">\n" +
    "                  {{ getTextThoughtDisplay(post) }}\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-if=\"isTextJournal(post)\" class=\"text-thought-shared\">\n" +
    "                  {{ getTextJournalDisplay(post) }}\n" +
    "                </div>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"isPostType(post, 'Experiment')\" class=\"item experiment-share\">\n" +
    "            {{getExperiment(post).title}}\n" +
    "            <em>{{getExperimentCompletionDate(post)}}</em>\n" +
    "            <span class=\"status goal true\">{{getExperiment(post).difficulty}}</span>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"group-message-bar\" ng-show=\"group\">\n" +
    "      <span class=\"newPosts\" ng-click=\"scrollToNewPosts()\" ng-show=\"hasNewPosts\">{{ 'NEW_POSTS' | translate }}</span>\n" +
    "      <span class=\"icon ion-android-textsms is-typing\" ng-show=\"usersTyping > 0\"></span>\n" +
    "\n" +
    "      <div class=\"write-message shadow\" ng-class=\"{'is-focused': isInputFocused()}\">\n" +
    "\n" +
    "        <textarea id=\"postText\" placeholder=\"{{ 'GROUP_POST_PLACEHOLDER' | translate }}\" ng-disabled=\"showingModal() || submittingPost\" maxlength=\"512\" style=\"{{ getGroupRemainingPostCharacters() < 20 ? 'color:red' : ''}}\" ng-focus=\"inputFocused()\" ng-blur=\"inputBlurred()\" ng-model=\"groupPostData.postText\" ng-change=\"inputChanged()\"></textarea>\n" +
    "        <!-- Placeholders to show that we have data that will be shared out with the (optional) message. -->\n" +
    "        <div class=\"share-options-wrapper\">\n" +
    "          <button ng-click=\"createPost($event)\" ng-disabled=\"submittingPost || !hasPostText()\" class=\"post-button web-button group-post-button\" ng-class=\"{'is-on': hasPostText()}\">{{ 'SEND_MESSAGE' | translate }}</button>\n" +
    "          <!--<a href=\"javascript:;\" class=\"progress-btn\"></a>-->\n" +
    "        <div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>")

$templateCache.put("templates/groups/groups.joinGroup.modal.html","<ion-modal-view class=\"generic-modal scroll-modal assessment-modal\" close-handler=\"closeJoinGroupModal()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeJoinGroupModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i> \n" +
    " \n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <h1>{{ 'JOIN_GROUP_TITLE' | translate}}</h1>\n" +
    "        <p ng-if=\"showGroupCode\">\n" +
    "        <label>{{ 'GROUP_CODE_LABEL' | translate }}</label>\n" +
    "        <input type=\"text\" placeholder=\"{{ 'GROUP_CODE_PLACEHOLDER' | translate}}\" name=\"inviteEmails\" id=\"groupCode\">\n" +
    "        </p>\n" +
    "\n" +
    "        <p><label>{{ 'GROUP_NICKNAME_LABEL' | translate}}</label>\n" +
    "        <input type=\"text\" placeholder=\"{{ 'GROUP_NICKNAME' | translate }}\" name=\"groupNickname\" id=\"groupNickname\" ng-model=\"joinForm.joinGroupNickname\">\n" +
    "        </p>\n" +
    "      <p ng-if=\"groupError\" class=\"error\">{{groupError}}</p>\n" +
    "      <p ng-if=\"groupCodeError\" class=\"error\">{{groupCodeError}}</p>\n" +
    "      <div class=\"clearfix\">\n" +
    "        <button ng-click=\"joinGroup()\" class=\"button-start\" ng-disabled=\"joiningGroup\">\n" +
    "          {{ 'JOIN_GROUP' | translate }}\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/groups/groups.report.modal.html","<ion-modal-view class=\"new-post generic-modal scroll-modal\" close-handler=\"closeReportModal()\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeReportModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <div class=\"box flag\">\n" +
    "      <h1>{{ 'REPORT_POST' | translate}}</h1>\n" +
    "      <p class=\"no-indent\">\n" +
    "        <textarea placeholder=\"{{ 'REPORT_POST_PLACEHOLDER' | translate }}\" ng-model=\"reportPostData.postText\"></textarea>\n" +
    "        <span class=\"radio-wrapper\">\n" +
    "            <span class=\"more-fields\">\n" +
    "              <span class=\"mock-radio\"></span>\n" +
    "              <input type=\"checkbox\" ng-model=\"referUserData.referUser\">{{ 'REPORT_POST_REFERRAL' | translate }}<span class=\"mock-radio green\"></span>\n" +
    "            </span>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "      <div ng-if=\"reportError\" class=\"error\">{{reportError}}</div>\n" +
    "      <div class=\"clearfix\">\n" +
    "      <button ng-click=\"reportingComment ? reportComment() : reportPost()\" class=\"button-start\">\n" +
    "        {{ 'REPORT_POST' | translate }}\n" +
    "      </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/groups/groups.validateEmail.modal.html","<ion-modal-view class=\"new-post generic-modal scroll-modal\" close-handler=\"closeEmailValidationPopup()\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeEmailValidationPopup()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "\n" +
    "      <h1>{{ 'VALIDATE_EMAIL' | translate}}</h1>\n" +
    "      \n" +
    "      <p>{{ 'VALIDATED_EMAIL_REQUIRED' | translate}}</p>\n" +
    "\n" +
    "      <p>{{ 'VALIDATED_EMAIL_CONTACTS' | translate }}</p>\n" +
    "\n" +
    "      <div class=\"clearfix\">\n" +
    "        <button ng-click=\"resendValidationEmail()\" class=\"button-start\">\n" +
    "          {{ 'RESEND_VALIDATION_EMAIL' | translate }}\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/includes/account.passwordValidator.html","<div id=\"password-validator\">\n" +
    "  <div class=\"validator-label-row\">\n" +
    "\n" +
    "    <label ng-if=\"validationLabel\" for=\"new_password\">{{ validationLabel }}</label>\n" +
    "    <label ng-if=\"!validationLabel\" for=\"new_password\">{{ 'NEW_PASSWORD' | translate }}</label>\n" +
    "\n" +
    "    <span class=\"validation-label-right\" id=\"validator-error\">{{ validationError | translate }}</span>\n" +
    "    <span ng-show=\"validationCount == 8\" id=\"validator-success\" class=\"validation-label-right\">\n" +
    "      <i class=\"icon ion-ios-checkmark\"></i>\n" +
    "      <span>{{ 'STRONG_PASSWORD' | translate }}</span>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "  <i ng-show=\"showPwIcon\" class=\"icon ion-ios-locked-outline\"></i>\n" +
    "  <input type=\"{{ visibility.new_password }}\" id=\"new_password\" ng-model=\"form.new_password\" ng-change=\"evalPassword()\" placeholder=\"{{ pwPlaceholder }}\">\n" +
    "  <i ng-class=\"{'icon': true, 'ion-eye': visibility.new_password == 'password', 'ion-eye-disabled': (visibility.new_password == 'text')}\"\n" +
    "     ng-click=\"toggleVisibility('new_password')\"\n" +
    "     tabindex=\"0\"\n" +
    "     role=\"button\"\n" +
    "     aria-hidden=\"true\">\n" +
    "  </i>\n" +
    "  <progress value=\"{{validationCount}}\" max=\"8\"></progress>\n" +
    "</div>")

$templateCache.put("templates/includes/meditation-tile.html","<div class=\"overlay\"></div>\n" +
    "\n" +
    "<div class=\"tile-text\">\n" +
    "	<div class=\"title\">{{ getExerciseOptionDisplay(exerciseItem.exercise) }}</div> <br>\n" +
    "	<strong class=\"meditation-length\">{{ getExerciseOptionTimeDisplay(exerciseItem.exercise) }}m</strong></em>\n" +
    "</div>\n" +
    "\n" +
    "<i class=\"icon right-icon ion-ios-locked-outline\" ng-if=\"!isPremiumEnabled(exerciseItem.exercise)\"></i>\n" +
    "")

$templateCache.put("templates/practitioner/account.html","<div class=\"account-view\">\n" +
    "\n" +
    "	<div class=\"fixed-header\">\n" +
    "		<div class=\"header-wrap\">\n" +
    "			<h1 ng-click=\"updateView('account')\" ng-class=\"{activeTab: activeView && activeView == 'account'}\">{{ 'ACCOUNT_DETAILS' | translate }}</h1>\n" +
    "			<h1 ng-click=\"updateView('directory')\" ng-class=\"{activeTab: activeView && activeView == 'directory'}\">{{ 'CLINICIAN_INFORMATION' | translate }}</h1>\n" +
    "			<h1 ng-click=\"updateView('billing')\" ng-class=\"{activeTab: activeView && activeView == 'billing'}\" ng-if=\"!viewingCoach\">{{ 'BILLING_LOWER' | translate }}</h1>\n" +
    "		</div>\n" +
    "		<div class=\"error-wrapper\">\n" +
    "			<p ng-show=\"formErrors.length > 0\" class=\"form-error\">\n" +
    "				<span ng-repeat=\"error in formErrors\"><i class=\"icon ion-alert-circled\"></i>{{ error }}<br></span>\n" +
    "			</p>	\n" +
    "			<p ng-show=\"formConfirmation\" class=\"form-confirmation\"><i class=\"icon ion-ios-checkmark\"></i>{{ formConfirmation }}</p>\n" +
    "		</div>\n" +
    "		<div ng-if=\"activeView != 'billing'\" class=\"buttons-right\">\n" +
    "			<button ng-click=\"cancelEdits()\" tabindex=\"14\">{{ \"DISCARD\" | translate }}</button>\n" +
    "			<button ng-click=\"saveDetails()\" ng-disabled=\"isSaving\" tabindex=\"13\">{{ \"SAVE_CHANGES\" | translate }}</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-if=\"activeView && activeView == 'account'\" class=\"account-tab\">\n" +
    "	\n" +
    "		<form name=\"accountForm\" ng-submit=\"saveDetails()\" ng-keyup=\"$event.keyCode == 13 && saveDetails()\">\n" +
    "\n" +
    "			<input type=\"submit\" id=\"submit\" value=\"Submit\" style=\"position: absolute; left: -9999px; width: 1px; height: 1px;\" />\n" +
    "			\n" +
    "			<div class=\"account-left\">\n" +
    "			\n" +
    "				<h2>{{ viewingCoach ? 'ABOUT' : 'ABOUT_YOU' | translate }}</h2>\n" +
    "				<div class=\"row flex-row\">	\n" +
    "					<div class=\"vertical-label vertical-label-short\">\n" +
    "						<label for=\"title\">{{ 'TITLE' | translate }}</label>\n" +
    "						<input type=\"text\" name=\"title\" ng-model=\"editUser.title\" maxlength=\"10\" tabindex=\"1\" />\n" +
    "					</div>\n" +
    "					<div class=\"vertical-label\">\n" +
    "						<label for=\"firstName\">{{ 'FIRST_NAME' | translate }}</label>\n" +
    "						<input type=\"text\" name=\"firstName\" ng-model=\"editUser.firstName\" tabindex=\"2\" />\n" +
    "					</div>\n" +
    "					<div class=\"vertical-label\">\n" +
    "						<label for=\"lastName\">{{ 'LAST_NAME' | translate }}</label>\n" +
    "						<input type=\"text\" name=\"lastName\" ng-model=\"editUser.lastName\" tabindex=\"3\" />\n" +
    "					</div>\n" +
    "					<div class=\"vertical-label\">\n" +
    "						<label for=\"credentials\">Credentials</label>\n" +
    "						<input type=\"text\" name=\"credentials\" ng-model=\"editUser.credentials\" tabindex=\"4\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row flex-row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"email\">{{ 'EMAIL' | translate }}</label>\n" +
    "						<input type=\"text\" name=\"email\" ng-model=\"editUser.email\" ng-disabled=\"isAnyCoach()\" tabindex=\"5\" />\n" +
    "						<img src=\"/img/checkmark.svg\" ng-if=\"isEmailValidated()\" class=\"validated\">\n" +
    "					</div>\n" +
    "				</div>	\n" +
    "				<div class=\"row no-action\" ng-if=\"!viewingCoach\">\n" +
    "					<div class=\"col-md-3\">\n" +
    "						{{ 'ACCOUNT_TYPE' | translate }}\n" +
    "					</div>\n" +
    "					<div class=\"col-md-9\">\n" +
    "						{{getAccountType()}} <button ng-click=\"goToUpgrade()\" ng-show=\"false && isLoggedIn() && !isPremium() && !isPHI()\">{{ 'UPGRADE' | translate }}</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row no-action\" ng-show=\"isPremium()\" ng-if=\"!viewingCoach\">\n" +
    "					<div class=\"col-md-3\">\n" +
    "						{{ 'EXPIRES_ON' | translate }}\n" +
    "					</div>\n" +
    "					<div class=\"col-md-9\">\n" +
    "						{{getPremiumExpiration()}}\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"account-right\">\n" +
    "				<h2>{{ viewingCoach ? 'ORGANIZATION' : 'YOUR_ORGANIZATION' | translate }}</h2>\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"organization\">{{ 'ORGANIZATION_NAME' | translate }}</label>\n" +
    "						<input type=\"text\" name=\"organization\" ng-model=\"editUser.organization.organizationName\" tabindex=\"7\"/>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"address\">{{ 'ADDRESS' | translate }}</label>\n" +
    "						<input type=\"text\" name=\"address\" maxlength=\"255\" ng-model=\"editUser.location.address\" tabindex=\"8\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				\n" +
    "				<div class=\"row flex-row\">\n" +
    "					<div class=\"vertical-label\">\n" +
    "						<label for=\"city\">{{ \"CITY\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"city\" ng-model=\"editUser.location.city\" tabindex=\"9\" />\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"vertical-label\">\n" +
    "						<label for=\"state\">{{ \"STATE\" | translate }}</label>\n" +
    "						<input type=\"text\" maxlength=\"2\" name=\"state\" ng-model=\"editUser.location.state\" tabindex=\"10\" />\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"vertical-label\">\n" +
    "						<label for=\"postalCode\">5 Digit {{ \"ZIP_CODE\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"postalCode\" pattern=\"[0-9]{5}\" maxlength=\"5\" ng-model=\"editUser.location.postalCode\" tabindex=\"11\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"phone\">{{ \"PHONE_NUMBER\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"phone\" ng-model=\"editUser.location.phone\" ui-mask=\"(999) 999-9999\" ui-mask-placeholder ui-mask-placeholder-char=\"_\" tabindex=\"12\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row\" ng-if=\"isAnyCoach()\">\n" +
    "					<button ng-click=\"logout()\">Logout</button>\n" +
    "				</div>\n" +
    "\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "	<div ng-if=\"activeView && activeView == 'directory'\" class=\"directory-tab\">\n" +
    "\n" +
    "		<div class=\"clearfix column-wrap\">\n" +
    "			<div class=\"account-left\">\n" +
    "				<div class=\"top-profile\">\n" +
    "					<h2>{{ 'YOUR_PHOTO' | translate }}</h2>	\n" +
    "					<div ng-if=\"!editUser.photo\" class=\"row\"> \n" +
    "						<label >\n" +
    "						    <input style=\"display:none;\" accept=\"image/png, image/jpeg\" type=\"file\" ng-model=\"photoUpload\" onchange=\"angular.element(this).scope().photoUploadChange(this)\">\n" +
    "						    <div class=\"profile-img\"><em>+</em>{{ \"ADD_PHOTO\" | translate }}</div>\n" +
    "						</label>\n" +
    "						<!-- <input ng-model=\"photoUpload\" name='photo' type='file' accept=\"image/*\" ng-change=\"\"/> -->\n" +
    "					</div>\n" +
    "					<div ng-if=\"editUser.photo\" class=\"row photo-wrapper\">\n" +
    "						<img ng-mouseover=\"photoHoverIn()\" ng-mouseleave=\"photoHoverOut()\" ng-src=\"{{ editUser.photo }}\" />\n" +
    "						<button ng-click=\"removePhoto()\" ng-mouseover=\"photoHoverIn()\" ng-show=\"showRemoveBtn\" class=\"remove\">Remove</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<h2>{{ viewingCoach ? \"PRACTICE\" : \"YOUR_PRACTICE\" | translate }}</h2>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"statement\">{{ \"ABOUT_BIOGRAPHY\" | translate }}</label>\n" +
    "						<textarea name=\"statement\" ng-model=\"editUser.statement\" rows=\"4\" cols=\"50\" class=\"about\" placeholder=\"{{ 'DESCRIBE_YOURSELF' | translate }}\"></textarea>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"npi\">{{ \"NPI\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"npi\" maxlength=\"10\" ng-model=\"editUser.npi\" placeholder=\"{{ 'TEN_DIGIT_CODE' | translate }}\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"fees\">{{ \"FEES\" | translate }}</label>\n" +
    "						<textarea name=\"fees\" ng-model=\"editUser.fees\" rows=\"4\" cols=\"50\" placeholder=\"{{ 'WHAT_DO_YOU_CHARGE' | translate }}\"></textarea>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"licenses\">\n" +
    "					<h2>{{ \"STATE_LICENCES\" | translate }}</h2>\n" +
    "					<div ng-repeat=\"license in userLicenses\"  class=\"row flex-row\">\n" +
    "						<div class=\"vertical-label\">\n" +
    "							<label for=\"licenseState\">{{ \"STATE\" | translate }}</label><i class=\"icon ion-ios-arrow-down\"></i>\n" +
    "							<select name=\"licenseState\" ng-model=\"license.licenseState\" ng-options=\"abbrev as value for (abbrev, value) in stateOptions\"></select>\n" +
    "						</div>\n" +
    "						<div class=\"vertical-label\">\n" +
    "							<label for=\"licenseNumber\">{{ \"STATE_LICENSE_NUMBER\" | translate }}</label>\n" +
    "							<input type=\"text\" name=\"licenseNumber\" maxlength=\"255\" ng-model=\"license.licenseNumber\" />\n" +
    "							<a ng-show=\"license.id\" href=\"javascript:;\" ng-click=\"removeLicense(license.id)\" class=\"remove\">{{ \"REMOVE\" | translate }}</a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<a href=\"javascript:;\" ng-click='createEmptyStateLicense()'>+ {{ \"ADD_ADDITIONAL\" | translate }}</a>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"account-right\">\n" +
    "				<h2>{{ \"CONTACT_INFO\" | translate }}</h2>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"websiteUrl\">{{ \"WEBSITE\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"websiteUrl\" maxlength=\"255\" ng-model=\"editUser.websiteUrl\" placeholder=\"http://www.yoursite.com\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"facebookUrl\">{{ \"FACEBOOK\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"facebookUrl\" maxlength=\"255\" ng-model=\"editUser.facebookUrl\" placeholder=\"{{ 'USERNAME' | translate }}\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"twitterUrl\">{{ \"TWITTER\" | translate }}</label>\n" +
    "						<input type=\"text\" name=\"twitterUrl\" maxlength=\"255\" ng-model=\"editUser.twitterUrl\" placeholder=\"{{ 'USERNAME2' | translate }}\"/>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<h2>{{ \"OTHER_INFO\" | translate }}</h2>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"gender\">{{ \"GENDER\" | translate }}</label><i class=\"icon ion-ios-arrow-down\"></i>\n" +
    "						<select name=\"gender\" ng-model=\"editUser.gender\">\n" +
    "							<option value=\"\"></option>\n" +
    "							<option value=\"female\">{{ \"FEMALE\" | translate }}</option>\n" +
    "							<option value=\"male\">{{ \"MALE\" | translate }}</option>\n" +
    "						</select>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"ageGroups\">{{ \"AGE_GROUPS\" | translate }}</label>\n" +
    "						<a ng-click=\"toggleAgeGroups()\" href=\"javascript:void(0)\">{{ \"EDIT_LOWER\" | translate }}</a>\n" +
    "						<input type=\"text\" disabled value=\"{{ ageGroupString }}\"/>\n" +
    "						<div ng-show=\"editingAgeGroups\" class=\"checkbox-container\">\n" +
    "							<div class=\"option\">\n" +
    "								<input ng-change=\"buildAgeGroupString()\" type=\"checkbox\" name=\"ageGroups\" ng-model=\"editUser.ageGroups.zeroToFive\" />0 - 5 {{ \"YEARS\" | translate }}\n" +
    "							</div>\n" +
    "							<div class=\"option\">\n" +
    "								<input ng-change=\"buildAgeGroupString()\" type=\"checkbox\" name=\"ageGroups\" ng-model=\"editUser.ageGroups.sixToEleven\" />6 - 11 {{ \"YEARS\" | translate }}\n" +
    "							</div>\n" +
    "							<div class=\"option\">\n" +
    "								<input ng-change=\"buildAgeGroupString()\" type=\"checkbox\" name=\"ageGroups\" ng-model=\"editUser.ageGroups.twelveToSeventeen\" />12 - 17 {{ \"YEARS\" | translate }}\n" +
    "							</div>\n" +
    "							<div class=\"option\">\n" +
    "								<input ng-change=\"buildAgeGroupString()\" type=\"checkbox\" name=\"ageGroups\" ng-model=\"editUser.ageGroups.eighteenToSixtyFour\" />18 - 64 {{ \"YEARS\" | translate }}\n" +
    "							</div>\n" +
    "							<div class=\"option\">\n" +
    "								<input ng-change=\"buildAgeGroupString()\" type=\"checkbox\" name=\"ageGroups\" ng-model=\"editUser.ageGroups.sixtyFiveOrOver\" />65 {{ \"YEARS_OR_OVER\" | translate }}\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"specialties\">{{ \"SPECIALITIES\" | translate }} ({{ \"MAX\" | translate }} 10)</label>\n" +
    "						<a ng-click=\"toggleSpecialties(editingSpecialties)\" href=\"javascript:void(0)\" ng-show=\"!editingSpecialties\">{{ \"EDIT_LOWER\" | translate }}</a>\n" +
    "						<input type=\"text\" disabled value=\"{{ specialtiesString }}\"/>\n" +
    "						<div ng-show=\"editingSpecialties\" class=\"checkbox-container\">\n" +
    "							<div ng-repeat=\"specialty in specialties\" class=\"option\">\n" +
    "								<input ng-model=\"specialtyCheckbox\" ng-disabled=\"specialtySelections.length >= 10 && !isSelected(specialty.id, specialtySelections)\" ng-checked=\"isSelected(specialty.id, specialtySelections)\" value=\"specialty\" name=\"specialties\" type=\"checkbox\" ng-click=\"updateSelection(specialty, specialtySelections, editUser.specialties)\">{{ specialty.specialty }}\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"orientations\">{{ \"ORIENTATIONS\" | translate }}</label>\n" +
    "						<a ng-click=\"toggleOrientations()\" href=\"javascript:void(0)\" ng-show=\"!editingOrientations\">{{ \"EDIT_LOWER\" | translate }}</a>\n" +
    "						<input type=\"text\" disabled value=\"{{ orientationsString }}\"/>\n" +
    "						<div ng-show=\"editingOrientations\" class=\"checkbox-container\">\n" +
    "							<div ng-repeat=\"orientation in orientations\" class=\"option\">\n" +
    "								<input ng-model=\"orientationCheckbox\" ng-checked=\"isSelected(orientation.id, orientationSelections)\" value=\"orientation\" name=\"orientation\" type=\"checkbox\" ng-click=\"updateSelection(orientation, orientationSelections, editUser.orientations)\">{{ orientation.orientation }}\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"languages\">{{ \"LANGUAGES\" | translate }}</label>\n" +
    "						<a ng-click=\"toggleLanguages()\" href=\"javascript:void(0)\" ng-show=\"!editingLanguages\">{{ \"EDIT_LOWER\" | translate }}</a>\n" +
    "						<input type=\"text\" disabled value=\"{{ languagesString }}\"/>\n" +
    "						<div ng-show=\"editingLanguages\" class=\"checkbox-container\">\n" +
    "							<div ng-repeat=\"language in languages\" class=\"option\">\n" +
    "								<input ng-model=\"languageCheckbox\" ng-checked=\"isSelected(language.id, languageSelections)\" value=\"language\" name=\"language\" type=\"checkbox\" ng-click=\"updateSelection(language, languageSelections, editUser.languages)\">{{ language.language }}\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<!--\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"vertical-label vertical-label-full\">\n" +
    "						<label for=\"telehealth\">{{ \"TELEHEALTH\" | translate }}</label><i class=\"icon ion-ios-arrow-down\"></i>\n" +
    "						<select name=\"telehealth\" ng-model=\"editUser.telehealth\">\n" +
    "							<option value=\"\"></option>\n" +
    "							<option value=\"true\">{{ \"YES_TELETHERAPY\" | translate }}</option>\n" +
    "							<option value=\"false\">{{ \"NO_TELETHERAPY\" | translate }}</option>\n" +
    "						</select>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				-->\n" +
    "			</div> \n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-if=\"activeView && activeView == 'billing' && !viewingCoach\" class=\"billing-tab\">\n" +
    "\n" +
    "			<div class=\"account-left\">\n" +
    "\n" +
    "				<div ng-repeat=\"subscription in billinginfo.subscriptions\">\n" +
    "\n" +
    "					<div class=\"row no-action\">\n" +
    "						<div class=\"col-md-3\"><strong>Plan:</strong></div>\n" +
    "						<div class=\"col-md-9\">{{ subscription.name }}</div>\n" +
    "					</div>\n" +
    "					<div class=\"row no-action\">\n" +
    "						<div class=\"col-md-3\"><strong>Price:</strong></div>\n" +
    "						<div class=\"col-md-9\">{{ subscription.price }}</div>\n" +
    "					</div>\n" +
    "					<div class=\"row no-action\">\n" +
    "						<div class=\"col-md-3\"><strong>Next Invoice Date:</strong></div>\n" +
    "						<div class=\"col-md-9\">{{ subscription.nextInvoice | date }}</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div ng-if=\"subscription.addOns\">\n" +
    "						<h2>Billable Assessments</h2>\n" +
    "						<div ng-repeat=\"addon in subscription.addOns\" class=\"row no-action\">\n" +
    "							<div class=\"col-md-3\">{{addon.quantity}} X {{ addon.name }}  {{ addon.totalPrice }}</div>\n" +
    "							<div class=\"col-md-9\">{{addon.price}}/Assessment</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"row no-action\">\n" +
    "						<div class=\"col-md-3\"><strong>Total:</strong></div>\n" +
    "						<div class=\"col-md-9\">{{ subscription.totalPrice }}</div>\n" +
    "					</div>\n" +
    "					<div ng-if=\"subscription.addOns\">\n" +
    "					<h2>Transactions</h2>\n" +
    "					<div ng-repeat=\"usage in usages | orderBy:'finishedAt'\" class=\"row no-action\">\n" +
    "						<div class=\"col-md-3\">\n" +
    "							<span ng-click=\"goToClientTab(usage.clientId,'assessments')\" ><u>{{usage.clientName}}</u></span>\n" +
    "						</div>\n" +
    "						<div class=\"col-md-9\">\n" +
    "							{{usage.finishedAt | date:'short'}}\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					</div>\n" +
    "					<hr>\n" +
    "				</div>\n" +
    "\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "	</div>\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/agreements.html","<ion-modal-view class=\"generic-modal scroll-modal hipaa\">\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "    <h1>You must agree to the following before you can proceed:</h1>\n" +
    "	<div class=\"checkbox-wrapper\" ng-show=\"showSignTOS\">  \n" +
    "  	By clicking here <input type=\"checkbox\" ng-model=\"agreements.medProfChecked\"> you signify your acceptance of Sanvello’s <a href=\"/supplemental-tos/\" target=\"_blank\">Medical Professionals Agreement</a>. <a href=\"/clinicians-frequently-asked-questions/#medical\" target=\"_blank\" class=\"second-link\">(What is the Medical Professionals Agreement?)</a>\n" +
    "  </div>\n" +
    "	<div class=\"checkbox-wrapper\" ng-show=\"showBAA\">  \n" +
    "  	By clicking here <input type=\"checkbox\" ng-model=\"agreements.baaChecked\"> you signify your acceptance of Sanvello’s <a href=\"http://static.thinkpacifica.com/content/Pacifica+Labs+Inc+-+HIPAA+Business+Associate+Addendum+v1.pdf\" target=\"_blank\">Business Associates Agreement</a>. <a href=\"/clinicians-frequently-asked-questions/#baa\" target=\"_blank\" class=\"second-link\">(What is the Business Associate Agreement?)</a>\n" +
    "  </div>\n" +
    "  <button ng-click=\"submitAgreements()\">{{ 'SUBMIT' | translate }}</button>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/practitioner/app.html","<div ng-show=\"appRenderReady\">\n" +
    "	<div id=\"draggable-area\" class=\"practitioner container {{ isAnyCoach() ? 'careteam' : '' }} {{ getLang() }} {{ hasLoadedTranslation() ? '' : 'loading-translations' }}\" >\n" +
    "\n" +
    "		<div class=\"content\" ui-view autoscroll=\"true\"></div>\n" +
    "\n" +
    "		<div class=\"sidebar\">\n" +
    "			<a href=\"javascript:;\" ng-click=\"goClients()\" class=\"side-logo\"><img src=\"/img/wave.png\" class=\"is-logo\" alt=\"Sanvello\"><img src=\"/img/wave.png\" class=\"is-mobile-logo\" alt=\"Sanvello\"></a>\n" +
    "\n" +
    "\n" +
    "		   	<ul class=\"hide-mobile\" ng-if=\"isLoggedIn() && isAnyCoach()\">\n" +
    "				<li ng-class=\"{active: isTabActive('Individuals')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link coach-navigation\" ng-click=\"goToIndividuals()\">\n" +
    "						{{ 'INDIVIDUALS' | translate }}\n" +
    "					</a>\n" +
    "				</li>\n" +
    "				<li ng-if=\"isCoachManager()\" ng-class=\"{active: isTabActive('Coaches')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link coach-navigation\" ng-click=\"goToCoaches()\">\n" +
    "						{{ 'COACHES' | translate }}\n" +
    "					</a>\n" +
    "				</li>\n" +
    "				<li ng-if=\"isAnyCoach()\" ng-class=\"{active: isTabActive('Schedule')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link coach-navigation\" ng-click=\"goToSchedule()\">\n" +
    "						{{ 'SCHEDULE' | translate }}\n" +
    "					</a>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "\n" +
    "			<div class=\"viewing-as\" ng-show=\"isTabActive('Clients') && isPremiumEnabled()\">\n" +
    "				<div ng-click=\"showClientView()\" class=\"prac-toggle\"><i class=\"icon ion-iphone\"></i></div>\n" +
    "				<span class=\"button-label\">{{ 'VIEWING_AS_CLIENT' | translate }}</span>\n" +
    "			 </div>\n" +
    "\n" +
    "			<ul class=\"hide-mobile\" ng-if=\"isPractitioner()\">\n" +
    "				<li ng-class=\"{active: isTabActive('Clients')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link\" ng-click=\"goClients()\">{{ 'CLIENTS_LOWER' | translate }}</a>\n" +
    "				</li>\n" +
    "				<li ng-if=\"isPremiumEnabled()\" ng-class=\"{active: isTabActive('Schedule')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToSchedule()\">{{ 'SCHEDULE' | translate }}</a>\n" +
    "				</li>\n" +
    "				<li ng-class=\"{active: isTabActive('Find')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link\" ng-click=\"goToFindClients()\">{{ 'FIND_CLIENTS' | translate }}\n" +
    "						<span class=\"clinician-menu-badge\" ng-if=\"getConsultationsNotificationsCount() > 0\">{{getConsultationsNotificationsCount()}}</span>\n" +
    "						<div ng-show=\"isClientsView() && showToolTip('viewed_directory_edit_tooltip')\" class=\"hint-tooltip account\">\n" +
    "      						<span ng-click=\"dismissToolTip('viewed_directory_edit_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "      						<p>{{ 'EDIT_DIRECTORY_TOOLTIP' | translate}}</p>\n" +
    "    					</div>\n" +
    "    				</a>\n" +
    "				</li>\n" +
    "				<li ng-class=\"{active: isTabActive('Tutorials')}\">\n" +
    "					<a href=\"javascript:;\" class=\"side-link\" ng-click=\"goTutorials()\">{{ 'HELP' | translate }}</a>\n" +
    "				</li>\n" +
    "			</ul> \n" +
    "\n" +
    "			<coach-banner\n" +
    "				ng-if=\"isLoggedIn() && isAnyCoach()\"\n" +
    "				name=\"getFullName()\"\n" +
    "				avatar-url=\"getAvatarUrl()\"\n" +
    "				ng-click=\"goToAccount()\"\n" +
    "			></coach-banner>\n" +
    "\n" +
    "			<coaches-search \n" +
    "				ng-if=\"isAnyCoach()\"\n" +
    "				placeholder=\"'Coaches search'\"\n" +
    "			></coaches-search>\n" +
    "\n" +
    "			<client-search ng-if=\"isPremiumEnabled()\"></client-search>\n" +
    "\n" +
    "			<dropdown-button is-shown=\"showingAddDropdown\" ng-if=\"isPractitioner()\" class=\"add-option hide-mobile\">\n" +
    "				<a>{{ 'ADD' | translate }}</a>\n" +
    "				<ul ng-show=\"showingAddDropdown\" class=\"dropdown\">\n" +
    "					<li ng-click=\"newClient()\">{{ 'ADD_CLIENT' | translate }}</li>\n" +
    "					<li ng-if=\"isPremiumEnabled() && hasActiveClients\" ng-click='newAppointment()'>{{ 'ADD_APPOINTMENT' | translate }}</li>\n" +
    "					<li ng-click=\"newConsultation()\">{{ \"ADD_CONSULTATION\" | translate }}</li>\n" +
    "				</ul>\n" +
    "			</dropdown-button>\n" +
    "\n" +
    "			<dropdown-button\n" +
    "				ng-if=\"!isAnyCoach()\"\n" +
    "				is-shown=\"showingAccountDropdown\" \n" +
    "				class=\"account-option hide-mobile\"\n" +
    "			>\n" +
    "				<a>{{ 'ACCOUNT_LOWER' | translate }} <strong><i class=\"icon ion-ios-arrow-down\"></i></strong></a>\n" +
    "				<ul ng-show=\"showingAccountDropdown\" class=\"dropdown\">\n" +
    "					<li ng-click=\"goToAccount()\">{{ 'YOUR_ACCOUNT' | translate }}</li>\n" +
    "					<li ng-if=\"isLoggedIn() && canUpgrade()\" ng-click='goToUpgrade()'>{{ 'UPGRADE' | translate }}</li>\n" +
    "					<li ng-click='logout()'>{{ 'SIGN_OUT' | translate}}				\n" +
    "				</ul>\n" +
    "			</dropdown-button>\n" +
    "\n" +
    "\n" +
    "			<div ng-if=\"isLoggedIn() && canUpgrade() && isPractitioner()\" class=\"upgrade-option hide-mobile\">\n" +
    "	  			<button ng-click=\"goToUpgrade()\">\n" +
    "	  				{{ (!hasSignedBAA() ? 'BEGIN_TRIAL' : 'UPGRADE') | translate }}\n" +
    "	  				<span ng-if=\"isComplimentary()\" class=\"trial\">{{ getComplimentaryRemainingDays() }} {{ 'DAYS_LEFT_IN_TRIAL' | translate }}</span>\n" +
    "	  				<span ng-if=\"!isComplimentary()\" class=\"trial\">{{ 'YOUR_TRIAL_EXPIRED' | translate }}</span>\n" +
    "	  			</button>\n" +
    "			</div>\n" +
    "		\n" +
    "			<div class=\"mobile-menu\" ng-click=\"toggleMobileMenu()\" ng-if=\"isAnyCoach()\">\n" +
    "				<i class=\"icon ion-ios-navicon\"></i>\n" +
    "				<div class=\"submenu\" ng-show=\"showingMobileMenu\"> \n" +
    "					<a href=\"javascript:;\" ng-click=\"goToIndividuals()\">{{ 'INDIVIDUALS' | translate }}</a>\n" +
    "					<a href=\"javascript:;\" ng-click=\"goToCoaches()\">{{ 'COACHES' | translate }}</a>\n" +
    "					<a href=\"javascript:;\" ng-click=\"goToSchedule()\">{{ 'SCHEDULE' | translate }}</a>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "	        <div class=\"mobile-menu\" ng-click=\"toggleMobileMenu()\" ng-if=\"!isAnyCoach()\">\n" +
    "	          <i class=\"icon ion-ios-navicon\"></i>\n" +
    "	          <div class=\"submenu\" ng-show=\"showingMobileMenu\"> \n" +
    "	            <a href=\"javascript:;\" ng-click=\"goClients()\">{{ 'CLIENTS_LOWER' | translate }}</a>\n" +
    "	            <a href=\"javascript:;\" ng-click=\"goToSchedule()\">{{ 'SCHEDULE' | translate }}</a>\n" +
    "	            <a href=\"javascript:;\" ng-click=\"goToFindClients()\">{{ 'FIND_CLIENTS' | translate }}</a>\n" +
    "	            <a href=\"javascript:;\" ng-click=\"goTutorials()\">{{ 'HELP' | translate }}</a>\n" +
    "	            <a href=\"javascript:;\" ng-if=\"isLoggedIn() && canUpgrade()\" ng-click=\"goToUpgrade()\">{{ 'UPGRADE' | translate }}</a>\n" +
    "	            <a href=\"javascript:;\" ng-click=\"goToAccount()\">{{ 'ACCOUNT_LOWER' | translate }}</a>\n" +
    "	            <a href=\"javascript:;\" ng-click=\"logout()\">{{ 'SIGN_OUT' | translate}}</a>\n" +
    "	          </div>\n" +
    "	        </div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>")

$templateCache.put("templates/practitioner/chat.html","\n" +
    "<div ng-show=\"client && !hasClientGroup()\" class=\"tooltip-box\">\n" +
    "	Enable Sanvello's messaging tool to chat securely with your clients between sessions. Use chat to answer quick questions, provide encouragement, or give reminders.\n" +
    "</div>\n" +
    "\n" +
    "<button ng-show=\"client && !hasClientGroup()\" ng-click=\"createClientGroup()\" class=\"create-client-group\">Enable Chat</button>\n" +
    "\n" +
    "<div ng-controller=\"GroupPostsCtrl\" ng-show=\"hasClientGroup()\" ng-init=\"clinicianDashChatInitialized()\" id=\"groupPosts\">\n" +
    "\n" +
    "	<div class=\"clinician-chat\" ng-class=\"{'coach-chat': isCareteamDashboardChat()}\">\n" +
    "		<div class=\"chat-scroll-container\" scroll-trigger=\"!loadingPosts && loadMoreGroupsPosts()\" threshold=\"150\" trigger-direction=\"up\" data-chat-type=\"clinician\" scroll-element-type=\"this\">\n" +
    "\n" +
    "		  <div ng-show=\"isLoadingMore\" class=\"web-messages-loading\">{{ 'LOADING' | translate }}...</div>\n" +
    "\n" +
    "		  <div ng-if=\"(!groupPosts || groupPosts.length == 0) && !loadingPosts && group\">\n" +
    "		  	<div class=\"creator\">\n" +
    "		  	  <span class=\"creator-nickname\"></span>\n" +
    "		  	  <span class=\"creator-date\"></span>\n" +
    "		  	</div>\n" +
    "		  	<div class=\"group-post\">\n" +
    "		  		<span class=\"group-post-copy\">There are no messages to display yet. Feel free to start the conversation!</span>\n" +
    "		  	</div>\n" +
    "		  </div>\n" +
    "\n" +
    "		  <div \n" +
    "			  ng-repeat=\"post in groupPosts | unique:'id'\" \n" +
    "			  ng-if=\"groupPosts && groupPosts.length > 0\" \n" +
    "			  class=\"group-message-wrapper\" \n" +
    "			  ng-class=\"{'is-mood': isPostType(post, 'Mood'), 'by-current-user': post.careteamCoach}\" \n" +
    "			  on-finish-render=\"clinicianChatMessagesRendered()\"\n" +
    "		  >\n" +
    "		    <div class=\"creator\">\n" +
    "		      <span class=\"creator-nickname\">{{ getCreatorName(post) }}</span>\n" +
    "		      <span class=\"creator-date\"> - {{ getMessageDate(post) }}</span>\n" +
    "		    </div>\n" +
    "\n" +
    "		    <img class=\"avatar\" ng-if=\"getClinicianAvatar(post, therapist)\" ng-src=\"{{getClinicianAvatar(post, therapist)}}\">\n" +
    "		    <div ng-show=\"!getClinicianAvatar(post, therapist)\" class=\"{{getPostAvatar(post)}} avatar\"></div> <!--{{post.creatorNickname}}-->\n" +
    "\n" +
    "		    <div class=\"group-post\">\n" +
    "		      <div class=\"group-message-button\" ng-if=\"retrievedUserContext && !isPostOwner(post) && group.groupType != 'CLIENT' && group.groupType != 'COACH'\" ng-click=\"showReportPost($event, post)\"></div>\n" +
    "		      <span class=\"group-post-copy\" ng-bind-html=\"getPostTitle(post)\"></span>\n" +
    "		      <div class=\"list\">\n" +
    "\n" +
    "		        <div ng-if=\"retrievedUserContext && isPostType(post, 'Mood')\" class=\"mood-row\">\n" +
    "		          <div data-mooddata=\"{{getMoodData(post)}}\" data-startdate=\"{{getMoodStartDate(post)}}\" data-numberofdays=\"{{getMoodNumberOfDays(post)}}\" data-postid=\"{{post.id}}\" class=\"graph\">\n" +
    "		            <canvas height=\"120\" width=\"50\"></canvas> <!-- The width needs to be less than 100. It will get rewritten. -->\n" +
    "		          </div>\n" +
    "		        </div>\n" +
    "\n" +
    "		        <div ng-if=\"retrievedUserContext && isPostType(post, 'Thought')\" class=\"item recording expanded\" ng-click=\"showTextThought(post)\">\n" +
    "		          <span class=\"title\">{{getThought(post).title}}</span>\n" +
    "		          <span class=\"date\">{{getThoughtDate(post)}}</span>\n" +
    "\n" +
    "		          <span ng-if=\"retrievedUserContext && isThoughtExpired(post)\">[{{ 'LISTENING_PERIOD_EXPIRED' | translate }}]</span>\n" +
    "		          <div class=\"counter-wrap\" ng-show=\"isAudioThought(post) || isTextThought(post)\">\n" +
    "		            <div class=\"negative\">{{getNegativeFlags(post)}}</div>\n" +
    "		          </div>\n" +
    "		          <div ng-if=\"retrievedUserContext && !isThoughtExpired(post)\">\n" +
    "\n" +
    "		            <div ng-if=\"isAudioJournal(post)\">\n" +
    "		              <audio-line-item src=\"getRecordingSource(getThought(post), 'journal')\" duration=\"getRecordingDuration(getThought(post), 'thought')\" tags=\"getRecordingTags(getThought(post), 'journal')\" class=\"thought-history\"></audio-line-item>\n" +
    "		            </div>\n" +
    "\n" +
    "		            <div ng-if=\"isAudioThought(post)\">\n" +
    "		              <audio-line-item src=\"getRecordingSource(getThought(post), 'thought')\" duration=\"getRecordingDuration(getThought(post), 'thought')\" tags=\"getRecordingTags(getThought(post), 'thought')\" class=\"thought-history\"></audio-line-item>\n" +
    "		              <audio-line-item src=\"getRecordingSource(getThought(post), 'analysis')\" duration=\"getRecordingDuration(getThought(post), 'analysis')\" tags=\"getRecordingTags(getThought(post), 'analysis')\" class=\"thought-history\" bg-color=\"#60d293\"></audio-line-item>\n" +
    "		            </div>\n" +
    "\n" +
    "		            <div ng-if=\"isTextThought(post)\" class=\"text-thought-shared\">\n" +
    "		              {{ getTextThoughtDisplay(post) }}\n" +
    "		            </div>\n" +
    "\n" +
    "		            <div ng-if=\"isTextJournal(post)\" class=\"text-thought-shared\">\n" +
    "		              {{ getTextJournalDisplay(post) }}\n" +
    "		            </div>\n" +
    "\n" +
    "		          </div>\n" +
    "		        </div>\n" +
    "\n" +
    "		        <div ng-if=\"isPostType(post, 'Experiment')\" class=\"item experiment-share\">\n" +
    "		        {{getExperiment(post).title}}\n" +
    "		        <em>{{getExperimentCompletionDate(post)}}</em>\n" +
    "		        <span class=\"status goal true\">{{getExperiment(post).difficulty}}</span>\n" +
    "		        </div>\n" +
    "\n" +
    "		      </div>\n" +
    "\n" +
    "		    </div>\n" +
    "\n" +
    "		    <button ng-if=\"isLastMessageFromClient(post) && careTeamGroup && careTeamGroup.careTeamLastReadStatus == 'NEW_MESSAGE' && !markedAsRead\" class=\"mark-as-read\" ng-click=\"markAsRead(post)\">{{ 'MARK_AS_READ' | translate }}</button>\n" +
    "\n" +
    "		  </div>\n" +
    "\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"group-message-bar\" ng-show=\"group\">\n" +
    "\n" +
    "		  <span class=\"newPosts\" ng-click=\"scrollToNewPosts()\" ng-show=\"hasNewPosts\">{{ 'NEW_MESSAGES' | translate }}</span>\n" +
    "\n" +
    "		  <span class=\"icon ion-android-textsms is-typing\" ng-show=\"usersTyping > 0\"></span>\n" +
    "\n" +
    "		  <div class=\"write-message shadow\" ng-class=\"{'is-focused': isInputFocused()}\">\n" +
    "\n" +
    "		    <textarea id=\"postText\" placeholder=\"{{ 'GROUP_POST_PLACEHOLDER' | translate }}\" ng-disabled=\"showingModal() || submittingPost\" maxlength=\"{{ getMaxChatLength() }}\" style=\"{{ getGroupRemainingPostCharacters() < 20 ? 'color:red' : ''}}\" ng-focus=\"inputFocused()\" ng-blur=\"inputBlurred()\" ng-model=\"groupPostData.postText\" ng-change=\"inputChanged()\"></textarea>\n" +
    "		    <!-- Placeholders to show that we have data that will be shared out with the (optional) message. -->\n" +
    "		    <div class=\"share-options-wrapper\">\n" +
    "\n" +
    "		      <button ng-click=\"checkCanAccessPremiumActivity() && createPost($event)\" ng-disabled=\"submittingPost || !hasPostText()\" class=\"post-button web-button group-post-button\" ng-class=\"{'is-on': hasPostText()}\">{{ 'SEND_MESSAGE' | translate }}</button>\n" +
    "		      <!--<a href=\"javascript:;\" class=\"progress-btn\"></a>-->\n" +
    "		    <div>\n" +
    "		  </div>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/client-menu.html","<h1 ng-show=\"loadingClient\">...</h1>\n" +
    "<h1 ng-show=\"!loadingClient\">{{ getClientName() }}&nbsp; <span ng-class=\"{activeTab: isTabActive('account')}\" ng-click=\"setActiveTab('account')\" id=\"edit-client\">{{ \"PROFILE_DETAILS\" | translate }}<i class=\"ion-gear-a icon\"></i></span></h1>\n" +
    "<p ng-if=\"client.status == 'INVITED'\" class=\"client-invite-code\">\n" +
    "	{{ \"NOT_CONNECTED\" | translate }}<br>\n" +
    "  <strong>{{client.inviteCode }}</strong>\n" +
    "    <button ng-click=\"resendInviteEmail(client)\">{{ 'RESEND_INVITE' | translate }}</button>\n" +
    "</p>\n" +
    "<ul class=\"client-menu\">\n" +
    "  <li ng-if=\"showTab('activity')\" ng-class=\"{activeTab: isTabActive('activity')}\" ng-click=\"setActiveTab('activity')\" class=\"item-large\">\n" +
    "    <i class=\"ion-iphone icon\"></i>App Data\n" +
    "    <div class=\"vertical-divider\"></div>\n" +
    "  </li>\n" +
    "  <li ng-if=\"showTab('assessments')\" ng-class=\"{activeTab: isTabActive('assessments')}\" ng-click=\"setActiveTab('assessments')\" class=\"item-small\">\n" +
    "  	<i class=\"ion-stats-bars icon\"></i>Assess\n" +
    "  </li>\n" +
    "  <li ng-if=\"showTab('homework')\" ng-class=\"{activeTab: isTabActive('homework')}\" ng-click=\"setActiveTab('homework')\" class=\"item-small\">\n" +
    "    <i class=\"ion-ios-checkmark icon\"></i>Homework\n" +
    "  </li>\n" +
    "  <li ng-if=\"showTab('chat')\" ng-class=\"{activeTab: isTabActive('chat')}\" ng-click=\"setActiveTab('chat')\" class=\"item-small\">\n" +
    "    <i class=\"ion-ios-chatbubble-outline icon\"></i>Chat\n" +
    "    <div class=\"badge client-badge\" ng-show=\"clientNotificationCount > 0\">{{ clientNotificationCount }}</div>\n" +
    "  </li>\n" +
    "  <li ng-if=\"showTab('schedule')\" ng-class=\"{activeTab: isTabActive('schedule')}\" ng-click=\"setActiveTab('schedule')\" class=\"item-small\">\n" +
    "    <i class=\"ion-ios-calendar icon\"></i>Schedule\n" +
    "  </li>\n" +
    "  <li ng-if=\"displayCoachInformation()\" class=\"item-small coach-item\">\n" +
    "    <coach-banner\n" +
    "      name=\"currentPractitioner.fullName\"\n" +
    "      avatar-url=\"currentPractitioner.photoUrl\"\n" +
    "      show-label=\"true\"\n" +
    "    ></coach-banner>\n" +
    "  </li>\n" +
    "\n" +
    "</ul>\n" +
    "")

$templateCache.put("templates/practitioner/client-search.directive.html","<form class=\"search-option\">\n" +
    "	<i class=\"ion-ios-search icon\"></i>\n" +
    "	<input autocomplete=\"off\" id=\"clientSearchInput\" type=\"text\" placeholder=\"Search Clients\" ng-keyup=\"filterClients()\" ng-model=\"clientSearchInput\" ng-blur=\"clearClientSearch($event)\"/>\n" +
    "	<ul ng-show=\"isShown\" class=\"dropdown search-results\">\n" +
    "		<li ng-click=\"onSelectClient($index)\" ng-repeat=\"result in searchResults\">{{ result.fullName }}</li>\n" +
    "		<li ng-show=\"emptyResults\" ng-click=\"newClient()\">{{ \"EMPTY_SEARCH_ADD_CLIENT\" | translate }}</li>\n" +
    "	</ul>\n" +
    "</form>")

$templateCache.put("templates/practitioner/client.html","<div class=\"client-view\">\n" +
    "\n" +
    "  <div class=\"client-menu-wrap\">\n" +
    "    <div ng-include=\"'templates/practitioner/client-menu.html'\"></div>\n" +
    "\n" +
    "    <!--schedule buttons-->\n" +
    "    <div class=\"button-wrap\" ng-show=\"isTabActive('schedule')\">\n" +
    "      <button ng-click=\"newAppointment(client)\">{{ \"SCHEDULE_APPOINTMENT\" | translate }}</button>\n" +
    "      <div ng-show=\"showToolTip('viewed_client_appointment_tooltip') && appointments.length == 0\" class=\"hint-tooltip client-schedule-tip\">\n" +
    "        <span ng-click=\"dismissToolTip('viewed_client_appointment_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "        <p>{{ 'ADD_APPOINTMENT_TOOLTIP' | translate}}.</p>\n" +
    "      </div>\n" +
    "      <button ng-click=\"startSessionClick()\" ng-show=\"client.status == 'CONNECTED'\" ng-disabled=\"activeAppointment\" class=\"start-session second\">{{ 'START_VIDEO_SESSION' | translate }}</button>\n" +
    "      <div ng-show=\"showToolTip('viewed_start_appointment_now_tooltip') && appointments.length > 0 && client.status == 'CONNECTED'\" class=\"hint-tooltip client-video-tip\">\n" +
    "        <span ng-click=\"dismissToolTip('viewed_start_appointment_now_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "        <p>{{ 'START_APPOINTMENT_NOW_TOOLTIP' | translate}}.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--assessments buttons-->\n" +
    "    <div class=\"button-wrap\" ng-show=\"isTabActive('assessments')\">\n" +
    "       <button ng-click=\"newAssessmentRequest(client)\">{{ \"ASSIGN_ASSESSMENT\" | translate }}</button>\n" +
    "       <div ng-show=\"assessmentRequests.length == 0 && showToolTip('viewed_client_assessment_tooltip')\" class=\"hint-tooltip\" id=\"viewed_client_assessment_tooltip\">\n" +
    "          <span ng-click=\"dismissToolTip('viewed_client_assessment_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "          <p>{{ 'ADD_ASSESSMENT_TOOLTIP' | translate}}.</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--account buttons-->\n" +
    "    <div class=\"button-wrap\" ng-show=\"isTabActive('account')\">\n" +
    "        <button ng-click=\"updateClient(client)\">{{ \"EDIT_CLIENT_DETAILS\" | translate }}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"button-wrap\" ng-show=\"isTabActive('homework')\">\n" +
    "\n" +
    "      <button ng-click=\"launchHomeworkModal(client)\">{{ \"ASSIGN_HOMEWORK\" | translate }}</button>\n" +
    "      <div ng-show=\"client.homeworkRequests.length == 0 && showToolTip('viewed_assign_homework_tooltip')\" class=\"hint-tooltip\" id=\"viewed_assign_homework_tooltip\">\n" +
    "        <span ng-click=\"dismissToolTip('viewed_assign_homework_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "        <p>{{ 'ASSIGN_HW_TOOLTIP' | translate}}</p>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "    <!--schedule content-->\n" +
    "  <div ng-show=\"isTabActive('schedule')\" class=\"client-schedule\">\n" +
    "    \n" +
    "    <div class=\"boxwrap\">\n" +
    "\n" +
    "      <div class=\"boxleft\">\n" +
    "\n" +
    "        <h2>{{ \"UPCOMING_APPOINTMENTS\" | translate }} {{ upcomingApppointments.length }}</h2>\n" +
    "        <p ng-if=\"upcomingAppointments.length == 0\">{{ \"EMPTY_UPCOMING_APPOINTMENTS\" | translate }}</p>\n" +
    "        <ul ng-if=\"upcomingAppointments.length > 0\" class=\"gen-row\">\n" +
    "          <li ng-repeat=\"appointment in upcomingAppointments | orderBy:'startTime' | limitTo:3\" ng-class=\"{isCurrent: canStartAppointment(appointment)}\">\n" +
    "            <span ng-show=\"canStartAppointment(appointment)\" class=\"date\">Now, {{appointment.startTime.format(\"M/D\") }} at {{ appointment.startTime.format(\"h:mmA z\") }}</span>\n" +
    "            <span ng-hide=\"canStartAppointment(appointment)\" class=\"date\">{{appointment.startTime.format(\"dddd, M/D\") }} at {{ appointment.startTime.format(\"h:mmA z\")}}</span>\n" +
    "        ({{ appointment.duration }}m)<br>\n" +
    "            <strong>{{ getAppointmentTypeDisplay(appointment.appointmentType) }}</strong>\n" +
    "            <dropdown-button is-shown=\"showingEditAppointmentDropdown\" class=\"header-dropdown-wrapper\">\n" +
    "              <a class=\"btn-gray-small\">{{ 'EDIT_LOWER' | translate }}</a>\n" +
    "              <ul ng-show=\"showingEditAppointmentDropdown\" class=\"dropdown\">\n" +
    "                <li ng-click=\"updateAppointment(appointment, appointment.repeating, appointment.repeating)\" ng-show=\"activeAppointment.id != appointment.id\">{{ 'EDIT_APPOINTMENT' | translate }}</li>\n" +
    "                <li ng-if=\"!appointment.repeating\" ng-click=\"cancelAppointment(appointment)\" class=\"btn red\" ng-show=\"appointment.finishTime.isAfter(moment())\" ng-disabled=\"activeAppointment.id == appointment.id\">{{ 'CANCEL_THIS_APPOINTMENT' | translate }}</li>\n" +
    "                <li ng-if=\"appointment.repeating\" ng-click=\"createException(appointment)\" class=\"btn red\" ng-show=\"appointment.finishTime.isAfter(moment())\" ng-disabled=\"activeAppointment.id == appointment.id\">{{ 'CANCEL_THIS_APPOINTMENT' | translate }}</li>\n" +
    "                <li ng-if=\"appointment.repeating\" ng-click=\"cancelAppointment(appointment)\">{{ 'CANCEL_RECURRING_APPOINTMENTS' | translate }}</li>\n" +
    "              </ul>\n" +
    "            </dropdown-button>\n" +
    "            <button ng-click=\"startWebAppointment(appointment)\" ng-show=\"canStartAppointment(appointment)\" class=\"btn-green-small\">{{ 'START_SESSION' | translate }}</button>\n" +
    "            <p ng-if=\"appointment.repeating\" class=\"repeat\">This appointment {{ getIntervalDaysDisplay(appointment.intervalDays) }} on {{ appointment.startTime.format('dddd') }} at \n" +
    "              <span ng-if=\"appointment.startTime.format('mm') == '00'\">{{ appointment.startTime.format('hA') }}</span>\n" +
    "              <span ng-if=\"appointment.startTime.format('mm') != '00'\">{{ appointment.startTime.format('h:mmA z') }}</span>\n" +
    "              <button class=\"change\">\n" +
    "                <span ng-click=\"changeAppointments(appointment)\">{{ 'CHANGE' | translate }}</span>\n" +
    "                <div ng-show=\"showToolTip('viewed_recurring_appointments_tooltip') && upcomingAppointments.length > 0 && appointment.firstRepeating\" class=\"hint-tooltip\">\n" +
    "                  <span ng-click=\"dismissToolTip('viewed_recurring_appointments_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "                  <p>{{ 'EDIT_RECURRING_APPOINTMENTS_TOOLTIP' | translate}}</p>\n" +
    "                </div>\n" +
    "              </button>\n" +
    "            </p>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"boxright\">\n" +
    "\n" +
    "        <h2>{{ \"PREVIOUS_APPOINTMENTS\" | translate }}</h2>\n" +
    "        <p ng-if=\"previousAppointments.length == 0\">{{ \"EMPTY_PREVIOUS_APPOINTMENTS\" | translate }}</p>\n" +
    "        <ul ng-if=\"previousAppointments.length > 0\" class=\"gen-row\">\n" +
    "          <li ng-repeat=\"appointment in previousAppointments | orderBy:'-startTime'\">\n" +
    "            <span class=\"date\">{{appointment.startTime.format(\"dddd, M/D\")}} at {{ appointment.startTime.format(\"h:mm\") }} - {{appointment.finishTime.format(\"h:mmA z\") }} </span>\n" +
    "            ({{ appointment.duration }}m)<br>\n" +
    "            <strong>{{ getAppointmentTypeDisplay(appointment.appointmentType) }}</strong>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "    \n" +
    "  </div>\n" +
    "  \n" +
    "  <div ng-include=\"'templates/videoChat.html'\"></div>\n" +
    "\n" +
    "    <!--assessment content-->\n" +
    "  <div ng-show=\"isTabActive('assessments')\" class=\"client-assessments\">\n" +
    "    <div class=\"boxwrap\">\n" +
    "\n" +
    "      <div class=\"boxleft\">\n" +
    "      \n" +
    "        <div ng-show=\"assessmentRequests.length > 0\" class=\"assessment-dropdown\">\n" +
    "          <span class=\"select-wrap\">\n" +
    "            <select ng-focus=\"dismissToolTip('viewed_assessment_dropdown_tooltip')\" ng-model=\"displayedAssessment\" ng-options=\"assessment as assessment.longName for assessment in userAssessmentList\" ng-change=\"updateAssessmentView()\"></select>\n" +
    "            <i class=\"icon ion-ios-arrow-down\"></i>\n" +
    "          </span>\n" +
    "          <div ng-show=\"showToolTip('viewed_assessment_dropdown_tooltip')\" id=\"viewed_assessment_dropdown_tooltip\" class=\"hint-tooltip\">\n" +
    "            <span ng-click=\"dismissToolTip('viewed_assessment_dropdown_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "            <p>{{ 'ASSESSMENT_DROPDOWN_TOOLTIP' | translate}}</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <hc-chart config=\"chartConfig\" ready=\"chartsReady\" watch-data=\"chartConfig.series\" ng-class=\"{'empty-graph': chartConfig.series.length == 0}\"></hc-chart>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"boxright\">\n" +
    "        <h2 ng-if=\"displayedAssessment.id != 'all'\">{{ \"UPCOMING\" | translate }} {{ displayedAssessment.shortName }} {{ \"ASSESSMENT\" | translate }}</h2>\n" +
    "        <p ng-show=\"!upcomingRequests || upcomingRequests.length == 0\">{{ \"EMPTY_UPCOMING_ASSESSMENTS\" | translate }}.</p>\n" +
    "        <div ng-if=\"displayedAssessment.id == 'all'\">\n" +
    "          <div ng-repeat=\"(key, assessmentRequests) in upcomingRequests\">\n" +
    "            <div ng-repeat=\"assessmentRequest in assessmentRequests\" class=\"assessment-request\">\n" +
    "              <h2 ng-show=\"$index == 0\">{{ \"UPCOMING\" | translate }} {{ assessmentRequest.requestNote }}</h2>\n" +
    "              <div ng-include=\"'templates/practitioner/upcoming-assessment-item.html'\" class=\"assessment-request-content\"></div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"assessmentRequest in upcomingRequests\" ng-if=\"displayedAssessment.id != 'all'\" class=\"assessment-request\">\n" +
    "          <div ng-include=\"'templates/practitioner/upcoming-assessment-item.html'\" class=\"assessment-request-content\"></div>\n" +
    "        </div> \n" +
    "\n" +
    "        <h2 ng-if=\"displayedAssessment.id != 'all'\">{{ \"COMPLETED\" | translate }} {{ displayedAssessment.shortName }} {{ \"ASSESSMENT\" | translate }}</h2>\n" +
    "        <p ng-show=\"!previousRequests || previousRequests.length == 0\">{{ \"EMPTY_COMPLETED_ASSESSMENTS\" | translate }}.</p>\n" +
    "        <div ng-if=\"displayedAssessment.id == 'all'\">\n" +
    "          <div ng-repeat=\"(key, assessmentRequests) in previousRequests\">\n" +
    "            <div ng-repeat=\"assessmentRequest in assessmentRequests\">\n" +
    "              <h2 ng-show=\"$index == 0\">{{ \"COMPLETED\" | translate }} {{ assessmentRequest.requestNote }}</h2>\n" +
    "              <div ng-include=\"'templates/practitioner/previous-assessment-item.html'\" class=\"assessment-request-content\"></div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"assessmentRequest in previousRequests\" ng-if=\"displayedAssessment.id != 'all'\" class=\"assessment-request\">\n" +
    "          <div ng-include=\"'templates/practitioner/previous-assessment-item.html'\" class=\"assessment-request-content\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "    <!--progress content-->\n" +
    "  <div ng-show=\"isTabActive('activity')\">\n" +
    "    <div ng-include=\"'templates/progress.html'\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"isTabActive('chat')\" class=\"client-group\">\n" +
    "    <div ng-include=\"'templates/practitioner/chat.html'\"></div>\n" +
    "  </div>\n" +
    "  \n" +
    "    <!--progress content-->\n" +
    "  <div ng-show=\"isTabActive('homework')\" class=\"client-homework\">\n" +
    "    <div ng-include=\"'templates/practitioner/homework.html'\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "      <!--account content-->\n" +
    "  <div ng-show=\"isTabActive('account') && !loadingClient\" class=\"client-account\">\n" +
    "    <div class=\"account-left\">\n" +
    "    <h2>{{ \"CLIENT_DETAILS\" | translate }}</h2>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-3\">{{ \"FIRST_NAME\" | translate }}</div>\n" +
    "      <div class=\"col-md-9\">{{ client.account.firstName }}</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-3\">{{ \"LAST_NAME\" | translate }}</div>\n" +
    "      <div class=\"col-md-9\">{{ client.account.lastName }}</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-3\">{{ \"EMAIL\" | translate }}</div>\n" +
    "      <div class=\"col-md-9\">{{ client.account.email }}&nbsp;</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-3\">{{ \"JOINED\" | translate }}</div>\n" +
    "      <div class=\"col-md-9\">{{ joinDate }}</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-show=\"client.status == 'CONNECTED'\">\n" +
    "      <div class=\"col-md-9\">\n" +
    "        <input type=\"checkbox\" ng-change=\"updateCommunitiesSetting()\" ng-model=\"communitiesIneligible\">{{ 'HIDE_COMMUNITIES_TEXT' | translate }}\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/clients.html","<div class=\"clients-view\">\n" +
    "\n" +
    "  <div class=\"headline-wrap\">\n" +
    "    <h1>{{ getFilterByLabel(filterBy) }} ({{ getFilterCount(filterBy) }})</h1>\n" +
    "    <dropdown-button is-shown=\"showingSortClientDropdown\" class=\"header-dropdown-wrapper\">\n" +
    "      <a class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></a>\n" +
    "      <ul ng-show=\"showingSortClientDropdown\" class=\"dropdown\">\n" +
    "        <li ng-repeat=\"option in filterOptions\" ng-click=\"setupFilterSet(option)\">{{ getFilterByLabel(option) }} ({{ getFilterCount(option) }})</li>\n" +
    "      </ul>\n" +
    "    </dropdown-button>\n" +
    "\n" +
    "    <button ng-click=\"newClient()\" class=\"has-icon\"><i class=\"ion-ios-personadd-outline icon\"></i>{{ 'ADD_CLIENT' | translate }}</button>\n" +
    "    <div ng-show=\"clients.length == 0 && showToolTip('viewed_add_client_tooltip')\" class=\"hint-tooltip\">\n" +
    "      <span ng-click=\"dismissToolTip('viewed_add_client_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "      <p>{{ 'ADD_CLIENT_TOOLTIP' | translate}}.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div ng-if=\"!isPremiumEnabled()\" class=\"trial-expired-banner\"><em>Your free trial has expired.</em><br><button ng-click=\"goToUpgrade()\">Upgrade</button> to keep using Sanvello for Clinicians with your clients.</div>\n" +
    "\n" +
    "  <table class=\"table\">\n" +
    "    <thead>\n" +
    "      <tr class=\"no-card\">\n" +
    "        <th ng-click=\"sortClients('name')\" ng-class=\"{'active': sortBy == 'name'}\">\n" +
    "          Name \n" +
    "          <span ng-if=\"sortBy == 'name'\">\n" +
    "            <span ng-if=\"reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-up\"></i></span>\n" +
    "            <span ng-if=\"!reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </span>\n" +
    "        </th>\n" +
    "        <th ng-click=\"sortClients('nextAppointment')\" ng-class=\"{'active': sortBy == 'nextAppointment'}\">\n" +
    "          Next Appointment \n" +
    "          <span ng-if=\"sortBy == 'nextAppointment'\">\n" +
    "            <span ng-if=\"reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-up\"></i></span>\n" +
    "            <span ng-if=\"!reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "        </span>\n" +
    "        </th>\n" +
    "        <th ng-click=\"sortClients('lastActivity')\" ng-class=\"{'active': sortBy == 'lastActivity'}\">\n" +
    "          Last App Activity \n" +
    "          <span ng-if=\"sortBy == 'lastActivity'\">\n" +
    "            <span ng-if=\"reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-up\"></i></span>\n" +
    "            <span ng-if=\"!reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </span></th>\n" +
    "\n" +
    "        <!--<th ng-click=\"sortClients('lastAssessment')\" ng-class=\"{'active': sortBy == 'lastAssessment'}\">\n" +
    "          Last {{ getDisplayedAssessmentShortName() }} Assessment\n" +
    "          <span ng-if=\"sortBy == 'lastAssessment'\">\n" +
    "            <span ng-if=\"reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-up\"></i></span>\n" +
    "            <span ng-if=\"!reverseSort\" class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </span></th>-->\n" +
    "        <th></th>\n" +
    "      </tr> \n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-show=\"!clients || clients.length == 0 && filterBy == 'all'\">\n" +
    "        <td colspan=\"8\">{{ 'EMPTY_CLIENTS_TABLE' | translate }}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-show=\"!activeClients || activeClients.length == 0 && filterBy != 'inactive' && filterBy != 'all'\">\n" +
    "        <td colspan=\"8\">{{ 'EMPTY_CLIENTS_TABLE' | translate }}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-show=\"filteredClients.length == 0 && filterBy == 'inactive'\">\n" +
    "        <td colspan=\"8\">{{ 'EMPTY_INACTIVE_CLIENTS_TABLE' | translate }}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"client in filteredClients\" ng-class=\"{ 'premium-client': client.account.premium && !isPremiumEnabled(),  'non-premium-client': !client.account.premium && !isPremiumEnabled()}\">\n" +
    "        <td ng-if=\"client.account.premium || isPremiumEnabled()\" ng-click=\"client.connectedAt ? goToClientTab(client.account.id, 'activity') : goToClientTab(client.account.id, 'schedule')\" class=\"name-col\">{{ client.account.firstName }} <span class=\"last-name\">{{ client.account.lastName }}</span></td>\n" +
    "        \n" +
    "        <td ng-if=\"!client.account.premium && !isPremiumEnabled()\" ng-click=\"showClinicianPremiumModal()\" class=\"name-col\">{{ client.account.firstName }} <span class=\"last-name\">{{ client.account.lastName }}</span></td>\n" +
    "        <td class=\"appointment-col\">\n" +
    "          <span class=\"mobile-labels\">Next Appointment</span>\n" +
    "          <button ng-if=\"!client.nextAppointment\" ng-click=\"newAppointment(client)\">{{ \"ADD_APPT\" | translate }}</button>\n" +
    "          <span ng-if=\"client.nextAppointment && !canStartAppointment(client.nextAppointment)\">{{ getDateDisplay(client.nextAppointment.startTime) }} ({{ client.nextAppointment.duration }}m)</span>\n" +
    "          <span ng-if=\"client.nextAppointment && canStartAppointment(client.nextAppointment)\">Now, {{ getTimeFormatted(client.nextAppointment.startTime) }} ({{ client.nextAppointment.duration }}m)</span>\n" +
    "          <br>\n" +
    "          {{ getAppointmentTypeDisplay(client.nextAppointment.appointmentType) }}\n" +
    "        </td>\n" +
    "        <td class=\"activity-col\">\n" +
    "          <span class=\"mobile-labels\">Last App Activity </span>\n" +
    "          <span ng-if=\"client.status == 'DISCONNECTED'\" class=\"invited\">\n" +
    "            <div class=\"floatleft\">\n" +
    "              {{ \"DISCONNECTED\" | translate }}<br>\n" +
    "              <strong>{{ client.inviteCode }}</strong>\n" +
    "            </div>\n" +
    "            <div class=\"floatright\">\n" +
    "              <button ng-if=\"client.account.email\" ng-click=\"resendInviteEmail(client)\">{{ 'RESEND_INVITE' | translate }}</button>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "\n" +
    "          <span ng-if=\"client.status == 'INVITED'\" class=\"invited\"> \n" +
    "            <div class=\"floatleft\">\n" +
    "              {{ \"NOT_CONNECTED\" | translate }}<br>\n" +
    "              <strong>{{ client.inviteCode }}</strong>\n" +
    "            </div>\n" +
    "            <div class=\"floatright\">\n" +
    "              <button ng-if=\"client.account.email\" ng-click=\"resendInviteEmail(client)\">{{ 'RESEND_INVITE' | translate }}</button>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "          <p ng-if=\"codeCopied == client.inviteCode\" class=\"code-copied\">Code copied to your clipboard.</p>\n" +
    "\n" +
    "          <span ng-if=\"client.status == 'CONNECTED'\" class=\"connected\">  \n" +
    "            <div class=\"floatleft\" ng-if=\"client.lastActivity\">\n" +
    "              <span>{{ getDateDisplay(client.lastActivity) }}</span>\n" +
    "              <em class=\"mood {{ getLastMoodClass(client) }}\" ng-if=\"getLastMoodDisplay(client)\">{{ getLastMoodDisplay(client) }}</em>\n" +
    "              <em class=\"mood empty\" ng-if=\"!getLastMoodDisplay(client)\">No Mood Entry</em>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"floatright\">\n" +
    "              <hc-chart type=\"sparkline\" config=\"client.moodChart\" ready=\"chartsReady\"></hc-chart>\n" +
    "            </div>     \n" +
    "\n" +
    "          </span>\n" +
    "\n" +
    "        </td>\n" +
    "        <!--<td class=\"activity-col\">\n" +
    "          <span class=\"mobile-labels\">Last Assessment</span>\n" +
    "\n" +
    "          <span ng-if=\"client.status == 'CONNECTED'\" class=\"connected\">  \n" +
    "\n" +
    "            <span class=\"assessment\" ng-if=\"client.lastAssessment\">\n" +
    "              {{ getLastAssessmentName(client) }}: {{ getDateDisplay(client.lastAssessment.userAssessment.finishedAt) }}<br>\n" +
    "\n" +
    "              <span ng-repeat=\"score in client.lastAssessment.userAssessment.scores\">\n" +
    "                <strong>{{ score.name | translate }}</strong>: {{score.score}}\n" +
    "              </span>\n" +
    "            </span>\n" +
    "\n" +
    "            <span class=\"assessment\" ng-if=\"!client.lastAssessment\">No Assessment</span>\n" +
    "\n" +
    "          </span>\n" +
    "        </td>-->\n" +
    "        <td class=\"actions-col\" ng-if=\"client.account.premium || isPremiumEnabled()\">\n" +
    "          <dropdown-button is-shown=\"showingClientDropdown\">\n" +
    "            <a class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></a>\n" +
    "            <ul ng-show=\"showingClientDropdown\" class=\"dropdown\">\n" +
    "              <li ng-click=\"newAssessmentRequest(client)\">{{ 'ASSIGN_ASSESSMENT' | translate }}</li>\n" +
    "              <li ng-click='newAppointment(client)'>{{ 'SCHEDULE_APPOINTMENT' | translate }}</li>\n" +
    "              <li ng-click=\"goToClientStartAppointmentNow(client.account.id)\" ng-if=\"client.status == 'CONNECTED'\" class=\"hide-on-mobile\">{{ 'START_TELETHERAPY' | translate }}</li>\n" +
    "              <li ng-click=\"updateClient(client)\">{{ 'EDIT_CLIENT_DETAILS' | translate}}</li>\n" +
    "              <li ng-if=\"client.status == 'CONNECTED' || client.status == 'INVITED'\" ng-click='disconnect(client)'>{{ 'REMOVE' | translate}}</li>\n" +
    "            </ul>\n" +
    "          </dropdown-button>\n" +
    "          <div class=\"badge clients-badge\" ng-show=\"getClientNotificationCount(client) > 0\">{{ getClientNotificationCount(client) }}</div>\n" +
    "          <button ng-click=\"client.connectedAt ? goToClientTab(client.account.id, 'activity') : goToClientTab(client.account.id, 'schedule')\">{{ 'VIEW_CLIENT' | translate }}</button>\n" +
    "          <button ng-if=\"client.nextAppointment && canStartAppointment(client.nextAppointment)\" ng-click=\"navigateToAppointment(client)\" class=\"green hide-on-mobile\">{{ 'START_SESSION' | translate }}</button>\n" +
    "        </td>\n" +
    "        <td class=\"actions-col red\" ng-if=\"!client.account.premium && !isPremiumEnabled()\">\n" +
    "          <button ng-show=\"!hasDeletedContent(client.account.id)\" ng-click=\"deleteAllForClient(client.account.id, $event)\" class=\"delete-all\">Delete All Appointments &amp; Assessments</button>\n" +
    "          <button ng-disabled=\"true\" ng-show=\"hasDeletedContent(client.account.id)\" ng-click=\"deleteAllForClient(client.account.id, $event)\" class=\"delete-all\">DELETED</button>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      <tr ng-show=\"showTooltips && ((showToolTip('viewed_schedule_appointment_tooltip') && !hasAppointments) || showToolTip('viewed_share_invite_tooltip') || showToolTip('viewed_view_client_tooltip'))\">\n" +
    "        <td class=\"no-border\"></td>\n" +
    "        <td class=\"no-border appointment-col \">\n" +
    "          <div ng-show=\"showToolTip('viewed_schedule_appointment_tooltip') && !hasAppointments\" class=\"hint-tooltip\">\n" +
    "            <span ng-click=\"dismissToolTip('viewed_schedule_appointment_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "            <p>{{ 'ADD_APPOINTMENT_TOOLTIP' | translate}}.</p>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td class=\"no-border activity-col\">\n" +
    "          <div ng-show=\"showToolTip('viewed_share_invite_tooltip') && uninvitedClient && (!showToolTip('viewed_schedule_appointment_tooltip') || hasAppointments)\" class=\"hint-tooltip\">\n" +
    "            <span ng-click=\"dismissToolTip('viewed_share_invite_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "            <p>{{ 'INVITE_CODE_TOOLTIP' | translate}}.</p>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td class=\"no-border actions-col\">\n" +
    "          <div ng-show=\"showToolTip('viewed_view_client_tooltip') && (!showToolTip('viewed_schedule_appointment_tooltip') || hasAppointments) && !showToolTip('viewed_share_invite_tooltip')\" class=\"hint-tooltip\">\n" +
    "            <span ng-click=\"dismissToolTip('viewed_view_client_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "            <p>{{ 'VIEW_CLIENT_TOOLTIP' | translate}}.</p>\n" +
    "          </div>          \n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody> \n" +
    "  </table>\n" +
    "\n" +
    "  <div class=\"assessment-overview-wrap\">\n" +
    "    <h1>Assessments Overview</h1>\n" +
    "    <span class=\"select-wrap\" ng-show=\"availableClientAssessmentIds.length > 0\"><select ng-model=\"graphAssessment.id\" ng-options=\"assessmentId as getAssessmentShortName(assessmentId) for assessmentId in availableClientAssessmentIds\" ng-change=\"updateAssessmentView()\"></select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "\n" +
    "    <div ng-show=\"availableClientAssessmentIds.length == 0\" class=\"empty-assessments\">You haven't assigned any assessments.</div>\n" +
    "    <table class=\"table\"> \n" +
    "      <tbody>\n" +
    "        <tr>\n" +
    "          <td><hc-chart config=\"thirtyDayAssessments\" ready=\"chartsReady\" redrawvar=\"thirtyDayAssessments.iteration\"></hc-chart></td>\n" +
    "          <td><hc-chart config=\"clientAssessments\" ready=\"chartsReady\" redrawvar=\"clientAssessments.iteration\"></hc-chart></td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-include=\"'templates/videoChat.html'\"></div>\n" +
    "  \n" +
    "  <practitioner-onboarding ng-show=\"isInPreviewMode()\"></practitioner-onboarding>\n" +
    "\n" +
    "  <!--\n" +
    "  <post-upgrade ng-show=\"isInInviteMode()\"></post-upgrade>\n" +
    "  -->\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/coach-banner.directive.html","<div class=\"coach-banner\">\n" +
    "    <div class=\"coach-meta\">\n" +
    "    	<div class=\"coach-label\" ng-if=\"showLabel\">\n" +
    "    		{{ 'COACH' | translate | uppercase }}\n" +
    "    	</div>\n" +
    "        <span class=\"name\">{{ name }}</span>\n" +
    "    </div>\n" +
    "    <div class=\"avatar-container\" ng-if=\"avatarUrl\">\n" +
    "        <img ng-src=\"{{ avatarUrl }}\" alt=\"avatar\" class=\"avatar-image\">\n" +
    "    </div>\n" +
    "</div>")

$templateCache.put("templates/practitioner/coaches-search.directive.html","<div class=\"coaches-search-wrapper\">\n" +
    "    <form class=\"search-option\">\n" +
    "        <i class=\"ion-ios-search icon\"></i>\n" +
    "        <input \n" +
    "            autocomplete=\"off\" \n" +
    "            id=\"clientSearchInput\" \n" +
    "            type=\"text\" \n" +
    "            placeholder=\"{{ placeholder | translate }}\" \n" +
    "            ng-keyup=\"filterClients()\" \n" +
    "            ng-model=\"clientSearchInput\" \n" +
    "            ng-blur=\"clearClientSearch($event)\"\n" +
    "        />\n" +
    "        <ul ng-show=\"isShown\" class=\"dropdown search-results\">\n" +
    "            <li ng-click=\"onSelectClient($index)\" ng-repeat=\"result in searchResults\">{{ result.fullName }}</li>\n" +
    "            <li ng-show=\"emptyResults\" ng-click=\"newClient()\">{{ \"EMPTY_SEARCH_ADD_CLIENT\" | translate }}</li>\n" +
    "        </ul>\n" +
    "    </form>\n" +
    "</div>")

$templateCache.put("templates/practitioner/consult-confirm.html","<ion-modal-view class=\"generic-modal assessment-modal confirm-consultation scroll-modal\" close-handler=\"closeConsultConfirmModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\">\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeConsultConfirmModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "    <h1 class=\"title\" ng-hide=\"editAppointment.id\">{{ 'UPCOMING_CONSULTATION' | translate }}<i class=\"icon ion-ios-calendar\"></i></h1>\n" +
    "     <span class=\"ribbon\"><strong>Congratulations, you have a prospective new client.</strong></span>\n" +
    "    <label for=\"consult-time\">{{ \"CONSULTATION_TIME\" | translate }}</label>\n" +
    "    <input type=\"text\" name=\"consult-time\" ng-disabled=\"true\" value=\"{{ getFormattedApptTime(consult) }}\"/>\n" +
    "    <br><br><label>Client info</label>\n" +
    "    <p class=\"white\">\n" +
    "      {{ consult.firstName }} {{ consult.lastName }}<br/>\n" +
    "      <a href=\"tel:{{ consult.phone }}\">{{ consult.phone }}</a><br/>\n" +
    "      <a href=\"mailto:{{ consult.email }}\">{{ consult.email }}</a>\n" +
    "    </p>\n" +
    "    <button ng-click=\"joinSessionModalClick(consult.id)\" ng-show=\"consult.id && canStartAppointment(consult)\" class=\"hide-on-mobile\">{{ 'JOIN_SESSION' | translate }}</button>\n" +
    "    <button ng-click=\"cancelAppointment(consult)\" class=\"red\">{{ 'CANCEL_CONSULTATION' | translate }}</button>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "\n" +
    "\n" +
    "")

$templateCache.put("templates/practitioner/dashboard.html","<div class=\"dashboard-view\">\n" +
    "    <h1>{{ 'TODAYS_APPOINTMENTS' | translate }} <button ng-click=\"goToUpgrade()\" ng-show=\"isInPreviewMode()\" class=\"gradient-button\" ng-cloak>INVITE YOUR CLIENTS</button></h1>\n" +
    "    <button ng-click=\"newAppointment()\">{{ 'NEW_APPOINTMENT' | translate }}</button>\n" +
    "    <div ng-if=\"appointmentsLoaded\" ui-calendar=\"uiConfig.calendar\" ng-model=\"eventSources\" calendar=\"mainCalendar\"></div>\n" +
    "\n" +
    "    <h1>{{ 'ACTIVE_CLIENTS' | translate }} <button ng-click=\"goToUpgrade()\" ng-show=\"isInPreviewMode()\" class=\"gradient-button\" ng-cloak>INVITE YOUR CLIENTS</button><button ng-click=\"goClients()\" ng-show=\"!isInPreviewMode()\" ng-cloak>INVITE NEW CLIENT</button></h1>\n" +
    "\n" +
    "    <div class=\"dash-table\">\n" +
    "        <table class=\"table\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>{{ 'FIRST_NAME' | translate }}</th>\n" +
    "                <th>{{ 'LAST_NAME' | translate }}</th>\n" +
    "                <th>{{ 'LAST_MOOD' | translate }}</th>\n" +
    "                <th>{{ '7_DAY_MOOD' | translate }}</th>\n" +
    "                <th>{{ 'ACTIONS' | translate }}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"client in clients track by client.clientId\" on-finish-render=\"ngRepeatFinished\" ng-click=\"client.connectedAt ? goToClientTab(client.account.id, 'activity') : goToClientTab(client.account.id, 'schedule')\">\n" +
    "                <td>{{client.firstName}}</td>\n" +
    "                <td class=\"last-name\">{{client.lastName}}</td>\n" +
    "                <td>{{client.lastMood}}</td>\n" +
    "                <td>{{client.avgMood}}<canvas id=\"{{client.clientId}}\"></canvas></td>\n" +
    "                <td class=\"table-link\">\n" +
    "                    <a class=\"btn\" ng-click=\"goToClient(client.clientId)\"><img src=\"/img/bars.png\" class=\"progress\">\n" +
    "                        {{ 'VIEW_HISTORY' | translate }}\n" +
    "                    </a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "\n" +
    "            <tr ng-show=\"!clients || clients.length == 0\">\n" +
    "                <td colspan=\"6\" ng-click=\"goClients()\" style=\"text-align:center\">{{ 'EMPTY_CLIENT_LIST' | translate }}</td>\n" +
    "            </tr>\n" +
    "\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    \n" +
    "        <div ng-show=\"isInPreviewMode() && showToolTip('viewed_client_tooltip')\" class=\"gradient-tip\" ng-cloak>\n" +
    "            <a href=\"javascript:;\" ng-click=\"dismissToolTip('viewed_client_tooltip')\" class=\"close\">X</a>\n" +
    "            <div class=\"image\"></div>\n" +
    "            <h2>Review data recorded in the mobile app here</h2>\n" +
    "            <p>\n" +
    "                In Preview Mode, you can see your own data to preview what a client’s data would look like. First, log in to the mobile app using your credentials, or click “View as: Client” in the menu on the left. Next, explore the mobile app and see how data is recorded back in the dashboard in real-time. <a href=\"https://itunes.apple.com/us/app/pacifica-tools-for-stress/id922968861?mt=8&ign-mpt=uo%3D6\" target=\"_blank\">iOS</a> | <a href=\"https://play.google.com/store/apps/details?id=com.pacificalabs.pacifica\" target=\"_blank\">Android</a>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/edit-appointment.html","<ion-modal-view class=\"generic-modal assessment-modal scroll-modal\" close-handler=\"closeEditAppointmentModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\">\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeEditAppointmentModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "    <div ng-hide=\"showAppointmentConfirmation\">\n" +
    "      <div ng-hide=\"isConsultation()\">\n" +
    "        <h1 class=\"title\" ng-hide=\"editAppointment.id\">{{ 'NEW_APPOINTMENT' | translate }}<i class=\"icon ion-ios-calendar\"></i></h1>\n" +
    "        <h1 class=\"title\" ng-show=\"editAppointment.id\">{{ 'UPDATE_APPOINTMENT' | translate }}<i class=\"icon ion-ios-calendar\"></i></h1>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"isConsultation()\">\n" +
    "        <h1 class=\"title\" ng-hide=\"editAppointment.id\">{{ 'NEW_CONSULTATION' | translate }}<i class=\"icon ion-ios-calendar\"></i></h1>\n" +
    "        <h1 class=\"title\" ng-show=\"editAppointment.id\">{{ 'EDIT_CONSULTATION' | translate }}<i class=\"icon ion-ios-calendar\"></i></h1>\n" +
    "         <span class=\"ribbon\"><strong ng-bind-html=\"newClientRibbon\"></strong></span>\n" +
    "        <!--<div ng-show=\"editAppointment.appointmentType == 'CONSULTATION'\">\n" +
    "        Consultations are freely available appointment types that allow you to open up time slots that can be claimed by any individual as a way to expand your practice by finding new clients. <strong>Note</strong>: Consultations are always administered via the Teletherapy feature through Sanvello.\n" +
    "        </div>-->\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <p ng-show=\"client && !showClientDropdown && (editAppointment.appointmentType != 'CONSULTATION')\">{{ client.fullName }}</p>\n" +
    "      <p ng-hide=\"(client && !showClientDropdown) || (editAppointment.appointmentType == 'CONSULTATION')\">\n" +
    "        <label>{{ 'CLIENT' | translate }}</label>\n" +
    "        <span ng-show=\"editAppointment.id\" ng-click=\"viewClient(editAppointment.clientId)\" class=\"green-link\"><strong>{{ editAppointment.firstName }} {{ editAppointment.lastName }}</strong></span>\n" +
    "        <span ng-show=\"!editAppointment.id\" class=\"select-wrap\"><select ng-change=\"clientSelected(client.status)\" ng-model=\"editAppointment.clientId\" ng-hide=\"editAppointment.id\" ng-options=\"client.account.id as client.fullName for client in clients | activeClients\">\n" +
    "        </select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "\n" +
    "      <div class=\"no-padding boxwrap\">\n" +
    "        <label ng-show=\"!isConsultation()\">{{ 'WHEN_IS_APPOINTMENT' | translate }}</label> \n" +
    "        <label ng-show=\"isConsultation()\">{{ 'WHEN_IS_CONSULTATION' | translate }}</label> \n" +
    "        <div moment-picker=\"editAppointment.startTime\"\n" +
    "             ng-model=\"editAppointment.startTime\"\n" +
    "             format=\"MMMM Do, YYYY\"\n" +
    "             autoclose=\"true\"\n" +
    "             today=\"true\"\n" +
    "             validate=\"true\"\n" +
    "             min-date=\"minDate\"\n" +
    "             min-view=\"month\"\n" +
    "             locale=\"en\">{{ getSchedulerDateDisplay(editAppointment.startTime) }}</div>\n" +
    "\n" +
    "        <div moment-picker=\"editAppointment.startTime\"\n" +
    "             ng-model=\"editAppointment.startTime\"\n" +
    "             format=\"LT\"\n" +
    "             autoclose=\"true\"\n" +
    "             today=\"true\"\n" +
    "             validate=\"true\"\n" +
    "             min-date=\"minDate\"\n" +
    "             locale=\"en\">{{ getSchedulerTimeDisplay(editAppointment.startTime) }}</div>   \n" +
    "\n" +
    "        <div class=\"timezone grow1x\">\n" +
    "          {{ editAppointment.tz }}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <p>\n" +
    "        <label>{{ 'FOR_HOW_LONG' | translate }}</label>\n" +
    "        <span class=\"select-wrap\">\n" +
    "          <select ng-model=\"editAppointment.duration\">\n" +
    "            <option value=\"15\">15 Minutes</option>\n" +
    "            <option value=\"20\">20 Minutes</option>\n" +
    "            <option value=\"25\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">25 Minutes</option>\n" +
    "            <option value=\"30\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">30 Minutes</option>\n" +
    "            <option value=\"35\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">35 Minutes</option>\n" +
    "            <option value=\"40\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">40 Minutes</option>\n" +
    "            <option value=\"45\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">45 Minutes</option>\n" +
    "            <option value=\"50\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">50 Minutes</option>\n" +
    "            <option value=\"55\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">55 Minutes</option>\n" +
    "            <option value=\"60\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">60 Minutes</option>\n" +
    "            <option value=\"65\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">65 Minutes</option>\n" +
    "            <option value=\"70\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">70 Minutes</option>\n" +
    "            <option value=\"75\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">75 Minutes</option>\n" +
    "            <option value=\"80\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">80 Minutes</option>\n" +
    "            <option value=\"85\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">85 Minutes</option>\n" +
    "            <option value=\"90\" ng-if=\"editAppointment.appointmentType != 'CONSULTATION'\">90 Minutes</option>\n" +
    "          </select>\n" +
    "          <i class=\"icon ion-ios-arrow-down\"></i>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "\n" +
    "      <p ng-if=\"!reschedule\">\n" +
    "        <label>{{ 'HOW_OFTEN' | translate }}</label>\n" +
    "        <span class=\"select-wrap\"><select ng-model=\"editAppointment.intervalDays\" ng-options=\"option.value as option.display for option in recurringOptions\"></select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "      </p>\n" +
    "\n" +
    "      <p ng-show=\"isConsultation()\" class=\"small\">{{ \"SCHEDULE_CONSULT_EXPLAINER\" | translate }}</p> \n" +
    "\n" +
    "      <div ng-hide=\"isConsultation()\">\n" +
    "        <label>{{ 'TYPE' | translate }}</label>\n" +
    "        <div class=\"mock-radio-container\" ng-class=\"{disabled: client && client.status != 'CONNECTED'}\">\n" +
    "          <span class=\"mock-radio\"></span><input ng-click=\"checkExplainerStatus()\" type=\"radio\" name=\"type\" value=\"TELETHERAPY\" ng-model=\"editAppointment.appointmentType\">{{ 'TELETHERAPY' | translate}} ({{ 'VIA_PACIFICA' | translate }})<span class=\"mock-radio\"></span>\n" +
    "          <p ng-show=\"showTeletherapyExplainer\" class=\"form-error\">\n" +
    "            <i class=\"icon ion-alert-circled\"></i>\n" +
    "            {{ 'TELETHERAPY_DISABLED_EXPLAINER' | translate }}\n" +
    "          </p>\n" +
    "        </div> \n" +
    "\n" +
    "        <div class=\"mock-radio-container\" >\n" +
    "          <span class=\"mock-radio\"></span><input type=\"radio\" name=\"type\" value=\"IN_PERSON\" ng-model=\"editAppointment.appointmentType\" selected=\" client && client.status != 'CONNECTED'\">{{ 'IN_PERSON' | translate }}<span class=\"mock-radio\"></span>\n" +
    "        </div>\n" +
    "        \n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"error\" ng-show=\"appointmentModalError\">{{appointmentModalErrorMsg}}</div>\n" +
    "      <button ng-click=\"clickToJoin(editAppointment.clientId)\" ng-show=\"editAppointment.id && canStartAppointment(editAppointment) && !client\" class=\"blue hide-on-mobile\">{{ 'JOIN_SESSION' | translate }}</button>\n" +
    "\n" +
    "      <button ng-click=\"rescheduleRecurringAppointment()\" ng-show=\"reschedule\" class=\"button\">\n" +
    "        <span ng-hide=\"isConsultation()\">{{ 'UPDATE_APPOINTMENT' | translate }}</span>\n" +
    "        <span ng-show=\"isConsultation()\">{{ 'UPDATE' | translate }}</span>\n" +
    "      </button>\n" +
    "      <button ng-click=\"saveAppointment(false)\" ng-hide=\"editAppointment.id || reschedule\" class=\"button\">{{ getCreateButtonLabel() }}</button>\n" +
    "      <button ng-click=\"saveAppointment(true)\" ng-show=\"editAppointment.id && !reschedule\" class=\"button\">\n" +
    "        <span ng-hide=\"isConsultation()\">{{ 'UPDATE_APPOINTMENT' | translate }}</span>\n" +
    "        <span ng-show=\"isConsultation()\">{{ 'UPDATE' | translate }}</span>\n" +
    "      </button>\n" +
    "\n" +
    "      <button ng-click=\"createException(editAppointment)\" ng-hide=\"!editAppointment.repeating || !editAppointment.id || !(editAppointment.startTime.clone().add(editAppointment.duration, 'm')).isAfter(moment()) || editAppointment.disallowCancel\" class=\"red\">{{ 'CANCEL_LOWER' | translate }} \n" +
    "        <span ng-hide=\"isConsultation()\">{{ 'APPOINTMENT_LOWER' | translate }}</span>\n" +
    "        <span ng-show=\"isConsultation()\">{{ 'CONSULTATION' | translate }}</span>\n" +
    "      </button>\n" +
    "\n" +
    "      <button ng-click=\"cancelAppointment(editAppointment)\" ng-hide=\"editAppointment.repeating || !editAppointment.id || !(editAppointment.startTime.clone().add(editAppointment.duration, 'm')).isAfter(moment())\" class=\"red\">{{ 'CANCEL_LOWER' | translate }} \n" +
    "        <span ng-hide=\"isConsultation()\">{{ 'APPOINTMENT_LOWER' | translate }}</span>\n" +
    "        <span ng-show=\"isConsultation()\">{{ 'CONSULTATION' | translate }}</span>\n" +
    "      </button>\n" +
    "      \n" +
    "      <button ng-click=\"cancelAppointment(editAppointment)\" ng-show=\"isConsultation() && editAppointment.repeating && editAppointment.id && editAppointment.startTime.clone().add(editAppointment.duration, 'm').isAfter(moment())\" class=\"red cancel-all\">{{ 'CANCEL_ALL_CONSULTATIONS' | translate }} \n" +
    "      </button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"showAppointmentConfirmation\" scroll-top-on-show>\n" +
    "      <div ng-show=\"!isConsultation()\">\n" +
    "        <h1 class=\"title\">{{ 'APPOINTMENT_SCHEDULED' | translate }}<i class=\"icon ion-ios-checkmark\"></i></h1>\n" +
    "        <p>You've scheduled an upcoming appointment for {{ editAppointment.startTime.format((\"MMMM Do, YYYY\")) }} at {{ editAppointment.startTime.format(\"hh:mm a\")}} {{ editAppointment.tz }}. <span ng-if=\"editAppointment.intervalDays > 0\">This appointment will repeat <span class=\"lowercase\">{{ getRecurringDisplay(editAppointment.intervalDays)}}</span>.</span></p>\n" +
    "        <p>60 minutes before, your client will receive a reminder. If you'd like, you can also use Sanvello for secure video teletherapy.</p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"isConsultation()\">\n" +
    "        <h1 class=\"title\"> {{ 'CONSULTATION_ADDED' | translate }}<i class=\"icon ion-ios-checkmark\"></i></h1>\n" +
    "        <p>You've added a consultation opening for {{ editAppointment.startTime.format((\"MMMM Do, YYYY\")) }} at {{ editAppointment.startTime.format(\"hh:mm a\")}} {{ editAppointment.tz }} to Sanvello's therapist directory. <span ng-if=\"editAppointment.intervalDays > 0\">This consultation will repeat <span class=\"lowercase\">{{ getRecurringDisplay(editAppointment.intervalDays)}}</span>.</span></p>\n" +
    "        <p>Prospective new clients within Sanvello claim this consultation and meet with you via teletherapy.</p>\n" +
    "        <p>We'll let you know when someone has claimed your consultation.</p>\n" +
    "      </div>\n" +
    "      <button ng-click=\"closeEditAppointmentModal()\">{{ 'FINISHED' | translate }}</button>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "\n" +
    "\n" +
    "")

$templateCache.put("templates/practitioner/edit-assessment-request.html","<ion-modal-view class=\"generic-modal assessment-modal scroll-modal\" close-handler=\"closeEditAssessmentRequestModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\">\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeEditAssessmentRequestModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <div ng-show=\"!showAssessmentConfirmation\">\n" +
    "      <h1 ng-hide=\"editAssessmentRequest.id\" class=\"title\">{{ 'ASSIGN_ASSESSMENT' | translate }}<i class=\"icon ion-stats-bars\"></i></h1>\n" +
    "      <h1 ng-show=\"editAssessmentRequest.id\" class=\"title\">{{ 'UPDATE_ASSESSMENT_REQUEST' | translate }}<i class=\"icon ion-stats-bars\"></i></h1>\n" +
    "\n" +
    "      <p ng-hide=\"editAssessmentRequest.id && editAssessmentRequest.repeating\">\n" +
    "        <label>{{ 'CHOOSE_ASSESSMENT' | translate }}:</label>\n" +
    "        <span class=\"select-wrap\"><select ng-model=\"editAssessmentRequest.assessmentId\" ng-options=\"assessment.id as assessment.longName for assessment in assessments | filter:{enabled:true}\"></select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "      </p>\n" +
    "      <p ng-show=\"editAssessmentRequest.id && editAssessmentRequest.repeating\">\n" +
    "        {{ editAssessmentRequest.requestNote }}\n" +
    "      </p>\n" +
    "\n" +
    "\n" +
    "      <div class=\"no-padding boxwrap\">\n" +
    "        <label>{{ 'ASSIGN_ASSESSMENT_TIME_PROMPT' | translate }}</label>\n" +
    "        <div moment-picker=\"editAssessmentRequest.requestDate\"\n" +
    "             ng-model=\"editAssessmentRequest.requestDate\"\n" +
    "             format=\"MMMM Do, YYYY\"\n" +
    "             min-date=\"minDate\"\n" +
    "             min-view=\"month\"\n" +
    "             autoclose=\"true\"\n" +
    "             today=\"true\"\n" +
    "             validate=\"true\"\n" +
    "             locale=\"en\"\n" +
    "             class=\"grow3x\">{{ getSchedulerDateDisplay(editAssessmentRequest.requestDate) }}\n" +
    "        </div>\n" +
    "\n" +
    "        <div moment-picker=\"editAssessmentRequest.requestDate\"\n" +
    "             ng-model=\"editAssessmentRequest.requestDate\"\n" +
    "             format=\"LT\"\n" +
    "             autoclose=\"true\"\n" +
    "             min-date=\"minDate\"\n" +
    "             today=\"true\"\n" +
    "             validate=\"true\"\n" +
    "             locale=\"en\"\n" +
    "             class=\"grow1x\">{{ getSchedulerTimeDisplay(editAssessmentRequest.requestDate) }}\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"timezone grow1x\">\n" +
    "          {{ editAssessmentRequest.tz }}\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "      \n" +
    "      <p>\n" +
    "        <label>{{ 'HOW_OFTEN_TO_RECEIVE_ASSESSMENTS' | translate }}</label>\n" +
    "        <span class=\"select-wrap\"><select ng-model=\"editAssessmentRequest.intervalDays\" ng-options=\"option.value as option.display for option in recurringOptions\"></select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "      </p>\n" +
    "      <div class=\"info\" ng-show=\"assessmentModalInfo\">{{assessmentModalInfoMsg}}</div>\n" +
    "      <div class=\"error\" ng-show=\"assessmentModalError\">{{assessmentModalErrorMsg}}</div>\n" +
    "      <button ng-click=\"saveAssessmentRequest()\" ng-hide=\"editAssessmentRequest.id\" class=\"button\">{{ 'SCHEDULE' | translate }}</button>\n" +
    "      <button ng-click=\"updateAssessmentRequest()\" ng-show=\"editAssessmentRequest.id\" class=\"button\">{{ 'UPDATE_ASSESSMENT_REQUEST' | translate }}</button>\n" +
    "    </div>\n" +
    "    <div ng-show=\"showAssessmentConfirmation\" scroll-top-on-show>\n" +
    "      <h1 class=\"title\">{{ 'ASSESSMENT_ASSIGNED' | translate }}<i class=\"icon ion-ios-checkmark\"></i></h1>\n" +
    "      <p>You've scheduled an upcoming {{ confirmationAssessmentName }} for {{ editAssessmentRequest.requestDate.format(\"MMMM Do, YYYY\") }} at {{ editAssessmentRequest.requestDate.format(\"hh:mm a\")}} {{ editAssessmentRequest.tz }}. <span ng-if=\"editAssessmentRequest.intervalDays > 0\">This assessment will repeat <span class=\"lowercase\">{{ getRecurringDisplay(editAssessmentRequest.intervalDays)}}</span>.</span></p>\n" +
    "      <p>Sanvello will notify you when your client completes the assessment.</p>\n" +
    "      <button ng-click=\"closeEditAssessmentRequestModal()\">{{ 'FINISHED' | translate }}</button>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/practitioner/edit-client.html","<ion-modal-view class=\"generic-modal edit-client scroll-modal\" close-handler=\"closeEditClientModal()\">\n" +
    "  <ion-content overflow-scroll=\"true\">\n" +
    "  <i class=\"ion-ios-close-empty close\" ng-click=\"closeEditClientModal()\">\n" +
    "    <span>{{ 'CLOSE' | translate }}</span>\n" +
    "  </i>\n" +
    "  <div ng-show=\"!showClientConfirmationModal\">\n" +
    "    <h1 ng-if=\"!client\">{{ 'ADD_CLIENT' | translate }}<i class=\"icon ion-ios-personadd-outline\"></i></h1>\n" +
    "    <h1 ng-if=\"client\">{{ 'EDIT_CLIENT_DETAILS' | translate }}<i class=\"icon ion-ios-person\"></i></h1>\n" +
    "    <p ng-if=\"errorMessage\" class=\"error\">{{ errorMessage }}</p>\n" +
    "    <form name=\"newClient\">\n" +
    "      <input type=\"text\" placeholder=\"{{ 'FIRST_NAME' | translate }}\" maxlength=\"30\" name=\"firstName\" ng-model=\"editClient.account.firstName\" />\n" +
    "      <input type=\"text\" placeholder=\"{{ 'LAST_NAME' | translate }}\" maxlength=\"30\" name=\"lastName\" ng-model=\"editClient.account.lastName\" />\n" +
    "\n" +
    "\n" +
    "      <span ng-if=\"!client\" class=\"radio-wrapper\">\n" +
    "        <span class=\"more-fields\">\n" +
    "          <span class=\"mock-radio\"></span>\n" +
    "          <input type=\"checkbox\" name=\"sendEmail\" ng-model=\"editClient.sendEmail\" ng-change=\"toggleSendEmail\" />{{ 'CHECK_FOR_EMAIL_INVITE' | translate}}<span class=\"mock-radio green\"></span>\n" +
    "        </span>\n" +
    "        <input ng-show=\"editClient.sendEmail\" placeholder=\"{{ 'CLIENT_EMAIL_ADDRESS' | translate }}\" type=\"text\" name=\"email\" ng-model=\"editClient.account.email\" />\n" +
    "        <textarea ng-show=\"editClient.sendEmail\" placeholder=\"{{ 'MESSAGE' | translate }}\" name=\"message\" ng-model=\"editClient.message\"></textarea>\n" +
    "      </span>\n" +
    "      <span ng-if=\"client\">\n" +
    "        <input placeholder=\"{{ 'EMAIL' | translate }}\" type=\"text\" name=\"email\" ng-model=\"editClient.account.email\" ng-disabled=\"!editClient.emailEditable\"/>\n" +
    "      </span>\n" +
    "      <button ng-disabled=\"newClient.$invalid || submittingClient\" ng-if=\"client\" ng-click=\"saveClient()\">{{ \"UPDATE\" | translate }}</button>\n" +
    "      <button ng-disabled=\"newClient.$invalid || submittingClient\" ng-if=\"!client\" ng-click=\"saveClient()\">{{ \"ADD\" | translate }}</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"clients.length == 0\" class=\"test-drive\">\n" +
    "    <p>{{ \"TEST_DRIVE_PROMPT\" | translate }}</p>\n" +
    "    <button class=\"blue\" ng-click=\"testDrive()\">{{ \"TEST_DRIVE_ACTION\" | translate}}</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"showClientConfirmationModal\">\n" +
    "    <h1>{{ \"CLIENT_ADDED\" | translate }}<i class=\"icon ion-ios-checkmark\"></i></h1>\n" +
    "    <p>{{ \"CLIENT_ADDED_CONFIRMATION_TEXT\" | translate }}</p>\n" +
    "    <p ng-bind-html=\"downloadPrompt\"></p>\n" +
    "    <p>\n" +
    "      <strong>{{ \"SHARE_CODE_PROMPT\" | translate }}</strong>:<br>\n" +
    "      <span class=\"code\">{{ clientInviteCode }}<button callback=\"codeCopiedCallback\" ng-click-copy=\"{{ clientInviteCode }}\">{{ 'COPY_CODE' | translate }}</button></span>\n" +
    "      <p ng-if=\"codeCopied\" class=\"code-copied\">Code copied to your clipboard</p>\n" +
    "    </p>\n" +
    "    <button ng-click=\"closeEditClientModal()\">{{ \"FINISHED\" | translate }}</button>\n" +
    "  </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/practitioner/edit-homework.html","<ion-modal-view class=\"generic-modal assessment-modal homework-modal scroll-modal\" close-handler=\"closeHomeworkModal()\" ng-controller=\"HomeworkModalCtrl\">\n" +
    "  <ion-content overflow-scroll=\"true\">\n" +
    "  <i class=\"ion-ios-close-empty close\" ng-click=\"closeHomeworkModal()\">\n" +
    "    <span>{{ 'CLOSE' | translate }}</span>\n" +
    "  </i>\n" +
    "\n" +
    "\n" +
    "  <div class=\"flex-container\" ng-show=\"!showHomeworkConfirmationText\">\n" +
    "    \n" +
    "    <div class=\"flex-col\">\n" +
    "      <div>\n" +
    "\n" +
    "        <h1 ng-if=\"homework\">{{ 'ASSIGN_HOMEWORK' | translate }}</h1>\n" +
    "\n" +
    "        <p ng-if=\"errorMessage\" class=\"error\">{{ errorMessage }}</p>\n" +
    "\n" +
    "        <form name=\"newClient\">\n" +
    "\n" +
    "          <p>\n" +
    "            <label>{{ 'HOMEWORK_APP_ACTION' | translate }}</label>\n" +
    "            <span class=\"select-wrap {{homework.type.type}}\"><select ng-model=\"homework.type\" ng-change=\"toggleShowSuggestions(false)\" ng-options=\"t.label for t in homeworkTypeOptions track by t.type\"></select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </p>\n" +
    "\n" +
    "          <p ng-show=\"homework.type.type == 'meditation' \">\n" +
    "            <label>{{ 'HOMEWORK_DESC_MEDITATION' | translate }}</label>\n" +
    "            <span class=\"select-wrap\"><select ng-model=\"homework.exercise\" ng-options=\"a.displayKey | translate for a in relaxActivities\">\n" +
    "              <option value=\"\" selected hidden />\n" +
    "            </select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </p>\n" +
    "\n" +
    "          <p ng-if=\"homework.type.type == 'thought' \">\n" +
    "            <label>{{ 'HOMEWORK_DESC_THOUGHT' | translate }}</label>\n" +
    "            <span class=\"select-wrap\"><select ng-model=\"homework.exercise\" ng-options=\"a.activityDisplay | translate for a in thoughtActivities\">\n" +
    "              <option value=\"\" selected hidden />\n" +
    "            </select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </p>\n" +
    "\n" +
    "          <p ng-if=\"homework.type.type == 'health' \">\n" +
    "            <label>{{ 'HOMEWORK_DESC_HEALTH' | translate }}</label>\n" +
    "            <span class=\"select-wrap\"><select ng-model=\"homework.exercise\" ng-options=\"h.title for h in healthActivities\">\n" +
    "              <option value=\"\" selected hidden />\n" +
    "            </select><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "          </p>\n" +
    "\n" +
    "          <p ng-if=\"homework.type.type == 'goal' \" style=\"position: relative;\">\n" +
    "            <a class=\"toggle-suggestions\" href=\"javascript:void(0);\" ng-show=\"!showSuggestions\" ng-click=\"toggleShowSuggestions(true)\">{{ 'SHOW_SUGGESTIONS' | translate }}</a>\n" +
    "            <a class=\"toggle-suggestions\" href=\"javascript:void(0);\" ng-show=\"showSuggestions\" ng-click=\"toggleShowSuggestions(false)\">{{ 'HIDE_SUGGESTIONS' | translate }}</a>\n" +
    "            <label>{{ 'HOMEWORK_DESC_GOAL_SPECIFIC' | translate }}</label>\n" +
    "            <input type=\"text\" name=\"\" maxlength=\"48\" ng-model=\"homework.newSubGoal\">\n" +
    "          </p>\n" +
    "          \n" +
    "          <p class=\"activity-description\" ng-show=\"getDescriptionKey(homework)\">\n" +
    "            {{ getDescriptionKey(homework) | translate }}\n" +
    "          </p>\n" +
    "\n" +
    "          <!-- Unchecked -->\n" +
    "          <div class=\"mock-radio-container\" ng-if=\"homework.reminder == 0\">\n" +
    "            <span class=\"mock-radio\"></span><input ng-click=\"toggleReminder()\" value=\"1\" type=\"radio\" name=\"type\" ng-model=\"homework.reminder\">{{ 'SEND_REMINDER' | translate }}<span class=\"mock-radio\"></span>\n" +
    "          </div>\n" +
    "          <!-- Checked -->\n" +
    "          <div class=\"checked-row\" ng-if=\"homework.reminder == 1\">\n" +
    "\n" +
    "              <div class=\"mock-radio-container\">\n" +
    "                <span class=\"mock-radio\"></span><input ng-click=\"toggleReminder()\" value=\"1\" type=\"radio\" name=\"type\" ng-model=\"homework.reminder\">{{ 'SEND_REMINDER' | translate }}<span class=\"mock-radio\"></span>\n" +
    "              </div> \n" +
    "\n" +
    "              <div class=\"no-padding boxwrap\">\n" +
    "                <div moment-picker=\"homework.reminderDate\"\n" +
    "                     ng-model=\"homework.reminderDate\"\n" +
    "                     format=\"MMMM Do, YYYY\"\n" +
    "                     min-date=\"minDate\"\n" +
    "                     min-view=\"month\"\n" +
    "                     autoclose=\"true\"\n" +
    "                     today=\"true\"\n" +
    "                     validate=\"true\"\n" +
    "                     locale=\"en\"\n" +
    "                     class=\"grow3x\">{{ getSchedulerDateDisplay(homework.reminderDate) }}\n" +
    "                </div>\n" +
    "                <div moment-picker=\"homework.reminderDate\"\n" +
    "                     ng-model=\"homework.reminderDate\"\n" +
    "                     format=\"LT\"\n" +
    "                     autoclose=\"true\"\n" +
    "                     min-date=\"minDate\"\n" +
    "                     today=\"true\"\n" +
    "                     validate=\"true\"\n" +
    "                     locale=\"en\"\n" +
    "                     class=\"grow1x\">{{ getSchedulerTimeDisplay(homework.reminderDate) }}\n" +
    "                </div>\n" +
    "                <div class=\"timezone grow1x\">\n" +
    "                  {{ getReminderDateTz(homework.reminderDate) }}\n" +
    "                </div>\n" +
    "\n" +
    "              </div>\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "          <!-- <button ng-disabled=\"newClient.$invalid || submittingClient\" ng-if=\"homework\" ng-click=\"saveHomework()\">{{ \"EDIT_HOMEWORK\" | translate }}</button> -->\n" +
    "          <button class=\"assign-homework\" ng-disabled=\"newClient.$invalid || submittingClient || homework.type.type == 'goal' && !homework.newSubGoal\" ng-if=\"homework\" ng-click=\"saveHomework(homework)\">{{ \"ASSIGN_HOMEWORK\" | translate }}</button>\n" +
    "\n" +
    "          <p id=\"assignment-description\">\n" +
    "            {{ 'ASSIGN_HOMEWORK_DESC' | translate }}\n" +
    "          </p>\n" +
    "\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"flex-col\">\n" +
    "      <img ng-hide=\"showSuggestions\" ng-src=\"{{getHomeworkScreenshot(homework)}}\">\n" +
    "      <div ng-show=\"showSuggestions\" class=\"suggestions\">\n" +
    "        <ul ng-repeat=\"category in goalCategories\">\n" +
    "          <li class=\"suggestion-title\">{{ category | translate }}</li>\n" +
    "          <ul>\n" +
    "            <li class=\"suggestion-item\" ng-click=\"selectGoal(subGoal)\" ng-repeat=\"subGoal in subGoalKeys[$index]\">{{ subGoal | translate }}</li>\n" +
    "          </ul>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"clients.length == 0\" class=\"test-drive\">\n" +
    "    <p>{{ \"TEST_DRIVE_PROMPT\" | translate }}</p>\n" +
    "    <button class=\"blue\" ng-click=\"testDrive()\">{{ \"TEST_DRIVE_ACTION\" | translate}}</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"showHomeworkConfirmationText\" class=\"homework-confirmation\">\n" +
    "    <h1>{{ \"HOMEWORK_ASSIGNED\" | translate }}<i class=\"icon ion-ios-checkmark\"></i></h1>\n" +
    "    <p>{{ \"HOMEWORK_ASSIGNED_CONFIRMATION_TEXT_TOP\" | translate }}<br>\n" +
    "\n" +
    "    <strong>{{ homework.type.label }}: \n" +
    "      <span ng-show=\"!homework.newSubGoal\">\n" +
    "        <span ng-show=\"homework.exercise.activityDisplay\">{{ homework.exercise.activityDisplay | translate }}</span>\n" +
    "        <span ng-show=\"!homework.exercise.activityDisplay\">\n" +
    "          <span>{{ homework.exercise.displayKey | translate }}</span>\n" +
    "          <span>{{ homework.exercise.title }}</span>\n" +
    "        </span>\n" +
    "      </span>\n" +
    "      <span ng-show=\"homework.newSubGoal\">\n" +
    "        <span>\"{{ homework.newSubGoal }}\"</span>\n" +
    "    </strong></p>\n" +
    "\n" +
    "    <p ng-if=\"homework.reminder == '1'\">\n" +
    "      {{ 'CLIENT_REMINDED_AT' | translate }}<br>\n" +
    "      <strong>{{ getConfirmationDateDisplay(homework.reminderDate) }}</strong>\n" +
    "      <br>\n" +
    "    </p>\n" +
    "\n" +
    "    <p>{{ \"HOMEWORK_ASSIGNED_CONFIRMATION_TEXT_BOTTOM\" | translate }}</p>\n" +
    "\n" +
    "    <button ng-click=\"closeHomeworkModal()\">{{ \"FINISHED\" | translate }}</button>\n" +
    "  </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/practitioner/find-clients.html","<div class=\"clients-view find\">\n" +
    "\n" +
    "  <div class=\"headline-wrap\">\n" +
    "		<h1>{{ \"FIND_NEW_CLIENTS\" | translate}}</h1>\n" +
    "\n" +
    "		<!-- accountUser.practitioner = editUser-->\n" +
    "		<div class=\"top-profile\">\n" +
    "\n" +
    "			<div ng-if=\"accountUser.practitioner.photo\" class=\"photo-wrapper\">\n" +
    "				<img ng-src=\"{{ accountUser.practitioner.photo }}\" />\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-show=\"accountUser.practitioner.publicDirectory\">\n" +
    "				<div ng-show=\"!accountUser.practitioner.pendingApproval\">\n" +
    "					<p ng-bind-html=\"directoryVisibleMsg\"></p>\n" +
    "					<p>\n" +
    "						<div class=\"link-row\">\n" +
    "							<a href=\"/find-a-therapist/profile/{{ accountUser.practitioner.urlPath }}\" target=\"_blank\">thinkpacifica.com/find-a-therapist/profile/{{ accountUser.practitioner.urlPath }}</a>\n" +
    "							<button ng-click=\"updateListingVisibility(false)\" class=\"outline\">{{ \"HIDE_LISTING\" | translate }}</button>\n" +
    "						</div>\n" +
    "					</p>\n" +
    "				</div>\n" +
    "				<div ng-if=\"accountUser.practitioner.pendingApproval\">\n" +
    "					<p class=\"pending\">{{ \"PENDING_APPROVAL\" | translate }}\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-hide=\"accountUser.practitioner.publicDirectory\">\n" +
    "				<p ng-bind-html=\"directoryHiddenMsg\"></p>\n" +
    "				<p>\n" +
    "					<div class=\"link-row\">\n" +
    "						<button ng-click=\"updateListingVisibility(true)\" class=\"outline\">{{ \"SHOW_LISTING\" | translate }}</button>\n" +
    "					</div>\n" +
    "				</p>\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "		</div>\n" +
    "		<div class=\"right-button-wrap\">\n" +
    "			<button ng-click=\"goToAccount('directory')\" class=\"consultation\">{{ \"EDIT_LISTING\" | translate }}</button>\n" +
    "			<button ng-click=\"newConsultation()\">{{ \"SCHEDULE_CONSULTATION\" | translate }}</button>\n" +
    "			<div ng-show=\"pastConsultations.length == 0 && futureConsultations.length == 0 && showToolTip('viewed_schedule_consultation_tooltip')\" class=\"hint-tooltip consult\">\n" +
    "	  			<span ng-click=\"dismissToolTip('viewed_schedule_consultation_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "	  			<p>{{ 'SCHEDULE_CONSULTATION_TOOLTIP' | translate}}</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<h2>{{ \"UPCOMING_CONSULTATIONS\" | translate }}</h2>\n" +
    "	<p ng-show=\"futureConsultations.length == 0\" class=\"empty\">{{ 'EMPTY_FUTURE_CONSULTS' | translate }}</p>\n" +
    "	<table ng-show=\"futureConsultations.length > 0\" class=\"upcoming-consultations\">\n" +
    "		<thead>\n" +
    "			<tr>\n" +
    "				<th></th>\n" +
    "				<th>{{ \"NAME\" | translate }}</th>\n" +
    "				<th></th>\n" +
    "			</tr>\n" +
    "		</thead>\n" +
    "		<tbody>\n" +
    "			<tr ng-repeat=\"consult in futureConsultations\">\n" +
    "				<td class=\"date-col\">{{ getFormattedApptTime(consult) }}<br><strong>{{ 'TELETHERAPY' | translate }}</strong></td>\n" +
    "				<td class=\"name-col\">{{ consult.firstName }} <span class=\"last-name\">{{ consult.lastName }}</span></td>\n" +
    "				<td class=\"actions-col\">\n" +
    "					<button ng-click=\"startWebAppointment(consult)\" ng-show=\"canStartAppointment(consult)\" class=\"blue hide-on-mobile btn-join\">{{ 'JOIN_SESSION' | translate }}</button>\n" +
    "	        <dropdown-button is-shown=\"showingContactDropdown\" class=\"header-dropdown-wrapper\">\n" +
    "	          <a class=\"btn-gray-small\">{{ 'ACTIVITY_OPTIONS' | translate }}</a>\n" +
    "	          <ul ng-show=\"showingContactDropdown\" class=\"dropdown\">\n" +
    "	          	<li><a href=\"tel:{{ consult.phone }}\">{{ consult.phone }}</a></li>\n" +
    "	            <li><a href=\"mailto:{{ consult.email }}\">{{ 'EMAIL' | translate }}</a></li>\n" +
    "	            <li ng-click=\"showConsultConfirmation(consult)\">{{ 'VIEW_DETAILS' | translate }}</li>\n" +
    "	            <li ng-click=\"cancelAppointment(consult)\">{{ 'CANCEL_CONSULTATION' | translate }}</li>\n" +
    "	          </ul>\n" +
    "	        </dropdown-button>\n" +
    "				</td>\n" +
    "			</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "	<p><a href=\"javascript:void(0);\" ng-click=\"goToSchedule();\" class=\"more-link\">{{ \"VIEW_AVILABLE_CONSULTATIONS\" | translate}}</a>\n" +
    "	<h2>{{ \"COMPLETED_CONSULTATIONS\" | translate }}</h2>\n" +
    "	<p ng-show=\"pastConsultations.length == 0\" class=\"empty\">{{ 'EMPTY_PAST_CONSULTS' | translate }}</p>\n" +
    "	<table ng-show=\"pastConsultations.length > 0\" class=\"past-consultations\">\n" +
    "		<thead>\n" +
    "			<tr>\n" +
    "				<th></th>\n" +
    "				<th>{{ \"NAME\" | translate }}</th>\n" +
    "				<th>\n" +
    "					{{ \"ADD_CLIENT\" | translate }}\n" +
    "					<span ng-mouseover=\"updateClientTooltipVisibility(true)\" ng-mouseleave=\"updateClientTooltipVisibility(false)\" class=\"more-info\">i<span ng-show=\"showClientTooltip\" class=\"tip\">{{ 'MOVE_FORWARD' | translate }}</span></span>\n" +
    "				</th>\n" +
    "				<th></th>\n" +
    "			</tr>\n" +
    "		</thead>\n" +
    "		<tbody>\n" +
    "			<tr ng-repeat=\"consult in pastConsultations\">\n" +
    "				<td class=\"date-col\">{{ getFormattedApptTime(consult) }}<br><strong>{{ 'TELETHERAPY' | translate }}</strong></td>\n" +
    "				<td class=\"name-col\">{{ consult.firstName }} <span class=\"last-name\">{{ consult.lastName }}</span></td>\n" +
    "				<td class=\"activity-col\">\n" +
    "					<button ng-hide=\"consult.clientStatus\" ng-click=\"addClientPrefilled(consult)\">{{ \"ADD_CLIENT\" | translate }}</button>\n" +
    "					<span ng-show=\"consult.clientStatus\">{{ consult.clientStatus }}</span>\n" +
    "				</td>\n" +
    "				<td class=\"actions-col\">\n" +
    "				  <dropdown-button is-shown=\"showingContactDropdown\" class=\"header-dropdown-wrapper\">\n" +
    "	          		  <a class=\"btn-gray-small\">{{ 'CONTACT' | translate }}</a>\n" +
    "			          <ul ng-show=\"showingContactDropdown\" class=\"dropdown\">\n" +
    "			            <li><a href=\"tel:{{ consult.phone }}\">{{ consult.phone }}</a></li>\n" +
    "			            <li><a href=\"mailto:{{ consult.email }}\">{{ 'EMAIL' | translate }}</a></li>\n" +
    "			          </ul>\n" +
    "	        		</dropdown-button>\n" +
    "	       </td>\n" +
    "			</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "\n" +
    "	<div ng-include=\"'templates/videoChat.html'\"></div>\n" +
    "\n" +
    "</div>")

$templateCache.put("templates/practitioner/homework.html","<div class=\"boxwrap\">\n" +
    "	<div class=\"boxleft\">\n" +
    "\n" +
    "		<h2>{{ \"ASSIGNED_HOMEWORK\" | translate }}</h2>\n" +
    "		<p ng-show=\"upcomingHomework.length == 0\">{{ 'EMPTY_ASSIGNED_HW' | translate }}</p>\n" +
    "		<div ng-repeat=\"homework in upcomingHomework\" class=\"homework-item homework-item-assigned\">\n" +
    "			\n" +
    "			<i class=\"icon {{ getHwCategoryName(homework) }}\"></i>\n" +
    "\n" +
    "			<div class=\"homework-title\">\n" +
    "				{{ getHwCategoryName(homework) }}: \n" +
    "				<span ng-if=\"homework.activityId\">\n" +
    "					<span ng-if=\"homework.activity.activityDisplay\">\"{{ homework.activity.activityDisplay | translate }}\"</span>\n" +
    "					<span ng-if=\"!homework.activity.activityDisplay\">\"{{ homework.activity.displayKey | translate }}\"</span>\n" +
    "				</span>\n" +
    "				<span ng-if=\"!homework.auxiliaryId && !homework.activityId\">{{ getGenericActivityText(homework) }}</span>\n" +
    "				<span ng-if=\"homework.auxiliaryId\">\"{{ getAuxActivity(homework) }}\"</span>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"homework-subtitle\">\n" +
    "				{{ 'NOT_COMPLETED' | translate }}\n" +
    "				<span ng-if=\"homework.reminderDate\"> (remind on {{ homework.reminderDate.format(\"M/D\") }} at {{ homework.reminderDate.format(\"h:mmA z\") }})</span>\n" +
    "			</div>\n" +
    "\n" +
    "          	<a class=\"btn-gray-small\" ng-click=\"cancelHomework(homework)\">{{ 'CANCEL_LOWER' | translate }}</a>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"boxright\">\n" +
    "\n" +
    "		<h2>{{ \"COMPLETED_HOMEWORK\" | translate }}</h2>\n" +
    "		<p ng-show=\"completedHomework.length == 0\">{{ 'EMPTY_COMPLETED_HW' | translate }}</p>\n" +
    "		<div ng-repeat=\"homework in completedHomework\" class=\"homework-item homework-item-completed\">\n" +
    "\n" +
    "			<i class=\"icon {{ getHwCategoryName(homework) }}\"></i>\n" +
    "\n" +
    "			<div class=\"homework-title\">\n" +
    "				<span class=\"{{ getHwCategoryName(homework) }}\">\n" +
    "				</span> {{ getHwCategoryName(homework) }}: \n" +
    "				<span ng-if=\"homework.auxiliaryId\">\"{{ getAuxActivity(homework) }}\"</span>\n" +
    "				<span ng-if=\"homework.activityId\">\n" +
    "					<span ng-if=\"homework.activity.activityDisplay\">\"{{ homework.activity.activityDisplay | translate }}\"</span>\n" +
    "					<span ng-if=\"!homework.activity.activityDisplay\">\"{{ homework.activity.displayKey | translate }}\"</span>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "		<div class=\"homework-subtitle\">\n" +
    "			<span>Completed on {{ homework.completedAt.format(\"dddd, M/D\")}} at {{ homework.completedAt.format(\"h:mmA z\") }}</span>\n" +
    "		</div>\n" +
    "\n" +
    "	    <a ng-click=\"setActiveTab('activity', homework.finishedAt)\" class=\"btn-gray-small btn-small-checked\">{{ 'REVIEW_LOWER' | translate }}</a>\n" +
    "	    <i class=\"icon ion-ios-checkmark homework-checkmark\"></i>\n" +
    "\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>")

$templateCache.put("templates/practitioner/onboarding.directive.html","<div class=\"step-wrapper\">\n" +
    "\n" +
    "<h2 ng-show=\"!isStepComplete(3)\" class=\"banner\">In order to invite your clients  and activate your free trial, you must complete the <strong>3 HIPAA compliance steps</strong> below.</h2>\n" +
    "\n" +
    "<h2 ng-show=\"isStepComplete(3)\" class=\"banner\">You've completed the preview mode tutorial. To invite your clients, you'll need to <a href='javascript:;' ng-click=\"checkForBAAModal()\">Sign a BAA</a>.</h2>\n" +
    "	<div class=\"clearfix\" ng-show=\"!isStepComplete(3)\">\n" +
    "		<div class=\"email\" ng-class=\"{complete: isStepComplete(1), active: !isStepComplete(1)}\">\n" +
    "			<h1>Step 1</h1>\n" +
    "			<h2 ng-show=\"!isStepComplete(1)\">Validate Your Email Address (Check Your Email)</h2>\n" +
    "			<button ng-show=\"!isStepComplete(1)\" ng-click=\"checkEmailValidation()\">Check Email Status</button>\n" +
    "			<p ng-show=\"isStepComplete(1)\">Your email has been validated.</p>\n" +
    "			<a href=\"/clinicians-frequently-asked-questions/#email\" ng-show=\"!isStepComplete(1)\" target=\"_blank\">\"Why do I need to validate my email?\"</a>\n" +
    "			<a href=\"javascript:;\" ng-click=\"resendEmailValidation()\" ng-show=\"!isStepComplete(1)\">Resend Validation Email</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"medical\" ng-class=\"{complete: isStepComplete(2), active: !isStepComplete(2) && isStepComplete(1)}\">\n" +
    "			<h1>Step 2</h1>\n" +
    "			<h2 ng-show=\"!isStepComplete(2)\">Review Medical Professionals Agreement</h2>\n" +
    "			<button ng-show=\"!isStepComplete(2)\" ng-click=\"showTOSModal()\" ng-disabled=\"!isStepComplete(1)\">Review Agreement</button>\n" +
    "			<p ng-show=\"isStepComplete(2)\">You reviewed the Medical Professionals Agreement.</p>\n" +
    "			<a href=\"/clinicians-frequently-asked-questions/#medical\" ng-show=\"!isStepComplete(2)\" target=\"_blank\">\"Why do I need to review a Medical Professionals Agreement?\"</a>\n" +
    "			<a href=\"/supplemental-tos/\" target=\"_blank\" ng-show=\"!isStepComplete(2)\">Print Medical Professionals Agreement</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"baa\" ng-class=\"{complete: isStepComplete(3), active: isStepComplete(2)}\">\n" +
    "			<h1>Step 3</h1>\n" +
    "			<h2 ng-show=\"!isStepComplete(3)\">Sign Business Associates Addendum</h2>\n" +
    "			<button ng-show=\"!isStepComplete(3)\" ng-click=\"reviewBAA()\" ng-disabled=\"!isStepComplete(2)\">Review BAA</button>\n" +
    "			<a href=\"/clinicians-frequently-asked-questions/#baa\" ng-show=\"!isStepComplete(3)\" target=\"_blank\">\"Why do I need to sign a BAA?\"</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<p class=\"onboarding\">If you have any questions, you can email us at <a href=\"mailto:info@sanvello.com\">info@sanvello.com</a> or call (562) 310-2831. We're here to help.</p>\n" +
    "	<!--<div class=\"clearfix\" ng-show=\"!hasSignedBAA()\">\n" +
    "		Done with Preview Mode?<br>\n" +
    "		<button ng-click=\"checkForBAAModal()\" class=\"blue\">Complete the Business Associates Agreement to invite your clients.</button>  \n" +
    "	</div>-->\n" +
    "</div>")

$templateCache.put("templates/practitioner/postupgrade.directive.html","<div class=\"step-wrapper\" ng-if=\"!isStepComplete(3)\">\n" +
    "\n" +
    "<h1>Onboarding Clients Tutorial</h1>\n" +
    "<h2>You are all set to get started using the dashboard and all of its features. This tutorial will walk you through inviting your clients, pairing their accounts, and reviewing their data.</h2>\n" +
    "<span ng-click=\"dismiss()\" class=\"close\">X</span>\n" +
    "<div class=\"clearfix\">\n" +
    "	<div ng-class=\"{complete: isStepComplete(1), active: !isStepComplete(1)}\">\n" +
    "		<h1>Step 1: Complete BAA</h1>\n" +
    "		<p ng-bind-html=\"getBAAText()\" ng-show=\"!isStepComplete(1)\"></p>\n" +
    "		<button ng-click=\"checkForBAAModal()\" ng-show=\"!isStepComplete(1)\">Review BAA</button>\n" +
    "		<p ng-show=\"isStepComplete(1)\">BAA successfully signed.</p>\n" +
    "	</div>\n" +
    "	<div ng-class=\"{complete: isStepComplete(2), active: !isStepComplete(2) && isStepComplete(1)}\">\n" +
    "		<h1>Step 2: Invite Clients</h1>\n" +
    "		<p ng-show=\"!isStepComplete(2)\">With the BAA completed, you can now invite clients. Head over to the <a href=\"javascript:;\" ng-click=\"goToClients(true)\">Client Page</a> to create new invite codes.</p>\n" +
    "		<p ng-show=\"isStepComplete(2)\">Invites successfully sent to clients.</p>\n" +
    "	</div>\n" +
    "	<div ng-class=\"{complete: isStepComplete(3), active: isStepComplete(2)}\">\n" +
    "		<h1>Step 3: Assign Assessments</h1>\n" +
    "		<p>Once you have connected to your clients, you can use the <a href=\"javascript:;\" ng-click=\"goDashboard()\">Dashboard</a> to assign assessments and start implementing Measurement-Based Care in your practice.</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "</div>")

$templateCache.put("templates/practitioner/previous-assessment-item.html","\n" +
    "<div class=\"completed-assessment-item\">\n" +
    "\n" +
    "\n" +
    "	<span ng-repeat=\"score in assessmentRequest.userAssessment.scores\" class=\"score\">\n" +
    "	  <strong class=\"circled-score\">{{score.score}}</strong>\n" +
    "	  <strong class=\"block\">{{score.name | translate}}</strong>\n" +
    "	</span>\n" +
    "\n" +
    "	<dropdown-button is-shown=\"showingAssessmentResultsDropdown\" class=\"header-dropdown-wrapper\">\n" +
    "	  <a>{{ 'RESULTS' | translate }}</a>\n" +
    "	  <ul ng-show=\"showingAssessmentResultsDropdown\" class=\"dropdown\">\n" +
    "	    <li ng-click=\"viewAssessmentResults(assessmentRequest)\">{{ 'VIEW_RESULTS' | translate }}</li>\n" +
    "	    <li ng-show=\"assessmentRequest.assessmentId != 5\" ng-click=\"downloadAssessmentPDF(assessmentRequest)\" class=\"hide-on-mobile\">{{ 'EXPORT' | translate }}</li>\n" +
    "	  </ul>\n" +
    "	</dropdown-button>\n" +
    "\n" +
    "	<span class=\"date\">{{'COMPLETED' | translate}} {{'ON' | translate}} {{assessmentRequest.userAssessment.finishedAt.format(\"dddd, M/D/YYYY\")}} {{'AT_DESCRIBING_TIME' | translate}} {{assessmentRequest.userAssessment.finishedAt.format(\"hh:mm a z\")}}.</span>\n" +
    "	\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/schedule.html","<div class=\"dashboard-view schedule-view\">\n" +
    "    <h1>{{ 'YOUR_SCHEDULE' | translate }}</h1>\n" +
    "    <button ng-show=\"hasActiveClients\" ng-click=\"newAppointment()\" class=\"new-appointment\">{{ 'SCHEDULE_APPOINTMENT' | translate }}</button> \n" +
    "    <button ng-click=\"newConsultation()\" class=\"new-appointment consultation\">{{ 'SCHEDULE_CONSULTATION' | translate }}</button> \n" +
    "    <div ng-if=\"appointmentsLoaded\" ui-calendar=\"uiConfig.calendar\" ng-model=\"eventSources\" calendar=\"mainCalendar\"></div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/starttrial.modal.html","<ion-modal-view class=\"touchpoint popoverr email hipaa tos start-trial\" close-handler=\"closeTrialModal()\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-close close\" ng-click=\"closeTrialModal()\">X</i>\n" +
    "\n" +
    "    <div class=\"box\">\n" +
    "       <h1>You're Ready to Go!</h1>\n" +
    "    	<p>Your 30-day free trial of Sanvello for Clinicians has begun. This gives you and your clients access to all of the features below:</p>\n" +
    "\n" +
    "    	<ul class=\"feature-list\">\n" +
    "        <li>\n" +
    "            <strong>{{ 'FEATURE_PRAC1' | translate }}</strong><br>\n" +
    "            {{ 'FEATURE_PRAC1_DESC' | translate }}\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <strong>{{ 'FEATURE_PRAC2' | translate }}</strong><br>\n" +
    "            {{ 'FEATURE_PRAC2_DESC' | translate }}\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <strong>{{ 'FEATURE_PRAC3' | translate }}</strong><br>\n" +
    "            {{ 'FEATURE_PRAC3_DESC' | translate }}\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <strong>{{ 'FEATURE_PRAC4' | translate }}</strong><br>\n" +
    "            {{ 'FEATURE_PRAC4_DESC' | translate }}\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <button ng-click=\"closeTrialModal()\">OK, GOT IT.</button>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/practitioner/supplemental.tos.modal.html","<ion-modal-view class=\"generic-modal scroll-modal hipaa\" close-handler=\"closeTOSModal()\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" overflow-scroll=\"true\">\n" +
    "\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeTOSModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>Medical Professionals Agreement</h1>\n" +
    "    <div class=\"box\">\n" +
    "      <p>Last Updated: February 14th, 2017</p>\n" +
    "      <ol>\n" +
    "        <li><strong>Introduction</strong>\n" +
    "          <ul>\n" +
    "            <li>This Medical Professionals Agreement (the “Agreement”) incorporates by reference all provisions of the standard Terms of Service (the “Standard Terms”) of Pacifica Labs, Inc. (“Pacifica” or the “Company” or “we”), found at https://www.sanvello.com/tos.  In the event of any conflict between the terms of this Agreement and the Standard Terms, the terms of this Agreement shall be controlling in all matters concerning your use of Pacifica’s Services as a Medical Professional (“Medical Professional Service”).  By completing the registration process, clicking an associated “I AGREE” button, and/or using the Medical Professional Service, you are indicating that you agree to be bound by all of the terms in this Agreement, as well as all of the Standard Terms (except to the extent of conflict between Standard Terms and this Agreement).</li>\n" +
    "            <li>You agree your use of the Medical Professional Service is not contingent on the delivery of any future functionality or features or dependent on any oral or written public comments made by the Company or any of its affiliates regarding future functionality or features.  Unless defined otherwise herein, all capitalized terms used in this Agreement shall have the meanings ascribed to such term in the Standard Terms.</li>\n" +
    "            <li>THE MEDICAL PROFESSIONAL SERVICE PROVIDES AN ONLINE PLATFORM THAT FACILITATES THE CONNECTION BETWEEN USERS AND THEIR CHOSEN MEDICAL PROFESSIONALS.  YOU UNDERSTAND AND AGREE THAT THE COMPANY IS NOT A PARTY TO ANY AGREEMENTS ENTERED INTO BETWEEN USERS AND MEDICAL PROFESSIONALS.  MEDICAL PROFESSIONALS ARE INDEPENDENT CONTRACTORS, NOT EMPLOYEES OR AGENTS OF THE COMPANY.  THE COMPANY HAS NO CONTROL OVER THE SERVICES PROVIDED BY MEDICAL PROFESSIONALS OR THE CONDUCT OF USERS OR MEDICAL PROFESSIONALS GENERALLY, AND DISCLAIMS ALL LIABILITY IN THIS REGARD.</li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li><strong>Description of Services</strong>\n" +
    "          <ul>\n" +
    "            <li>The Medical Professional Service provides an online platform that facilitates the connection between Users and their chosen Medical Professionals in order to allow such Medical Professionals to monitor or otherwise assist in a Users’ use of Pacifica’s services.</li>\n" +
    "            <li>The Company is not a provider of medical services or medical advice.  Similarly, the Company is not a contracting agent or representative of any Medical Professional or User.  As a Medical Professional, you agree that you are not an employee or agent of the Company, and that nothing in this Agreement will be construed as establishing an employment or agency relationship between you and the Company.  Company’s relationship to you shall strictly be that of an independent contractor and, if applicable, a “business associate” under the Health Insurance Portability and Accountability Act of 1996, Subtitle D of the Health Information Technology for Economic and Clinical Health Act, as amended, and the implementing regulations promulgated under both laws, as the foregoing may be amended from time to time (collectively “HIPAA”).</li>\n" +
    "            <li>You agree that you are fully and solely responsible for all goods and services that you provide to others using or in connection with the Medical Professional Service and for any and all injuries, illnesses, damages, claims, liabilities and costs that you cause to other Users.</li>\n" +
    "            <li>The Company shall provide certain information to you regarding a User’s use of, and information provided through, the online platform, including, but not limited to, responses to and scoring of behavioral health assessments, mood tracking, thought diary entries, health habits, and daily goals. You shall be solely responsible for taking any necessary and appropriate action to analyze the information provided and provide necessary and appropriate care to the User based on such information.</li>\n" +
    "            <li>The Company has the right, but not the obligation, to monitor any activity and content associated with the Medical Professional Service.</li>\n" +
    "            <li>THE COMPANY DOES NOT CONTROL, IS NOT RESPONSIBLE FOR, AND MAKES NO REPRESENTATIONS OR WARRANTIES WITH RESPECT TO ANY USER OR USER CONDUCT.  YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTION WITH OR RELIANCE ON ANY USER OR USER CONDUCT.  IN ADDITION, THE COMPANY ASSUMES NO RESPONSIBILITY FOR VERIFYING THE IDENTITY, QUALIFICATIONS, CREDENTIALS, BIOGRAPHIC INFORMATION, LICENSURE, AND/OR ANY OTHER INFORMATION REGARDING ANY USERS OR MEDICAL PROFESSIONALS.</li>\n" +
    "            <li>THERE ARE NO REPRESENTATIONS, PROMISES, WARRANTIES, OR UNDERSTANDINGS RELIED UPON BY YOU WHICH ARE NOT CONTAINED HEREIN. ALL MEDICAL PROFESSIONAL SERVICES PROVIDED BY THE COMPANY HEREUNDER ARE PERFORMED AND PROVIDED ON “AS IS,” ‘WITHOUT ALL FAULTS,” AND “AS AVAILABLE,” AND THE COMPANY DISCLAIMS ALL WARRANTIES WITH REGARD TO THE MEDICAL PROFESSIONAL SERVICE, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THOSE REGARDING MERCHANTABILITY, NONINFRINGEMENT, TITLE, ACCURACY, CORRECTNESS, COMPLETENESS, OR FITNESS FOR A PARTICULAR PURPOSE. THE COMPANY DOES NOT WARRANT THAT THE MEDICAL PROFESSIONAL SERVICE WILL MEET YOUR REQUIREMENTS OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DATA STORED PURSUANT TO THE SERVICES WILL NOT BE LOST.</li>\n" +
    "            <li>You represent that you currently provide professional services exclusively within the United States, and warrant that, during the term hereof, you will continue to provide professional services exclusively within the United States.</li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li><strong>Pricing</strong>\n" +
    "          <ul>\n" +
    "            <li>Use of the Medical Professional Service is subject to a fee. Please see Pacifica’s Pricing Terms for Medical Professionals at <a href=\"http://www.sanvello.com/pricing.html\" target=\"_blank\">http://www.sanvello.com/pricing.html</a> for details regarding pricing for the Medical Professional Service.</li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li><strong>HIPAA Business Associate Addendum</strong>\n" +
    "          <ul>\n" +
    "            <li>In order to ensure compliance with the requirements of HIPAA, the Company and the Medical Professional shall enter into and be subject to the terms of a separate HIPAA Business Associate Addendum. Notwithstanding the foregoing, the Company and the Medical Professional shall not be required to enter into the HIPAA Business Associate Addendum if the Medical Professional provides the Company with a written explanation as to why the Medical Professional is not subject to HIPAA as a “covered entity,” as such term is defined in HIPAA.\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li><strong>Miscellaneous</strong>\n" +
    "          <ul>\n" +
    "            <li>This Agreement, together with our Standard Terms, Privacy Policy, Pricing Terms for Medical Professionals, and HIPAA Business Associate Addendum, constitutes the entire agreement between the parties relating to the Medical Professional Service and all related activities. This Agreement shall not be modified except in writing signed by both parties or by your express electronic consent to a modified version of this Agreement posted by us. If any part of this Agreement is held to be unlawful, void, or unenforceable, that part shall be deemed severed and shall not affect the validity and enforceability of the remaining provisions. The failure of Pacifica to exercise or enforce any right or provision under this Agreement shall not constitute a waiver of such right or provision. Any waiver of any right or provision by Pacifica must be in writing and shall only apply to the specific instance identified in such writing. You may not assign this Agreement, or any rights or licenses granted hereunder, whether voluntarily, by operation of law, or otherwise without our prior written consent. This Agreement and any action related thereto will be governed by the laws of the State of California without regard to its conflict of laws provisions. The exclusive jurisdiction and venue of any action with respect to the subject matter of this Agreement will be the state and federal courts located in San Francisco, California, and each of the parties hereto waives any objection to jurisdiction and venue in such courts.</li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "      </ol>\n" +
    "\n" +
    "\n" +
    "      <button ng-click=\"approveSupplementalTos()\" ng-disabled=\"busy\" class=\"button-start\">{{ 'I_AGREE' | translate }}</button>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/practitioner/tutorials.html","<div class=\"dashboard-view tutorials help-tutorials-view\">\n" +
    "\n" +
    "    <h1>Tutorials</h1>\n" +
    "	\n" +
    "	<div class=\"multiline-flex\">\n" +
    "		\n" +
    "		<div class=\"iframe-container\"><iframe id=\"player\" type=\"text/html\" src=\"https://www.youtube.com/embed/i2VGtImOpo0?list=PLwGa1e-peK5iEW3wo5klKcqkI1ivrlMho\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "		<div class=\"iframe-container\"><iframe id=\"player\" type=\"text/html\" src=\"https://www.youtube.com/embed/5NSiowmbdDk?list=PLwGa1e-peK5iEW3wo5klKcqkI1ivrlMho\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "		<div class=\"iframe-container\"><iframe id=\"player\" type=\"text/html\" src=\"https://www.youtube.com/embed/J8GkDEQOlWc?list=PLwGa1e-peK5iEW3wo5klKcqkI1ivrlMho\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "		<div class=\"iframe-container\"><iframe id=\"player\" type=\"text/html\" src=\"https://www.youtube.com/embed/Zl3rMsI9RDE?list=PLwGa1e-peK5iEW3wo5klKcqkI1ivrlMho\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "		<div class=\"iframe-container\"><iframe id=\"player\" type=\"text/html\" src=\"https://www.youtube.com/embed/Loypi1PIYqo?list=PLwGa1e-peK5iEW3wo5klKcqkI1ivrlMho\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "		<div class=\"iframe-container\"><iframe id=\"player\" type=\"text/html\" src=\"https://www.youtube.com/embed/VPo6vzdCsfs?list=PLwGa1e-peK5iEW3wo5klKcqkI1ivrlMho\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "\n" +
    "	</div> \n" +
    "\n" +
    "\n" +
    "	<h1 class=\"middle-header\">Have questions?</h1>\n" +
    "	<p>Feel free to email us at <a href=\"mailto:info@sanvello.com\">info@sanvello.com</a> and we'll get back to you promptly.</p>\n" +
    "\n" +
    "	<h1>Blog Resources</h1>\n" +
    "	<div class=\"multiline-flex\">\n" +
    "		<div class=\"iframe-container\">\n" +
    "			<img src=\"https://s3-us-west-2.amazonaws.com/static.thinkpacifica.com/blog/wp-content/uploads/2017/05/peter-john-maridable-57721-1.jpg\">\n" +
    "			<a href=\"https://www.thinkpacifica.com/blog/cpt-code-96127/\" target=\"_blank\">CPT Code 96127: Improving Patient Care and Your Bottom Line</a>\n" +
    "		</div>\n" +
    "		<div class=\"iframe-container\">\n" +
    "			<img src=\"https://s3-us-west-2.amazonaws.com/static.thinkpacifica.com/blog/wp-content/uploads/2017/07/andrew-ruiz-5578.jpg\">\n" +
    "			<a href=\"https://www.thinkpacifica.com/blog/your-hipaa-questions-answered/\" target=\"_blank\">HIPAA Compliance for Mental Health Clinicians</a>\n" +
    "		</div>\n" +
    "		<div class=\"iframe-container\">\n" +
    "			<img src=\"https://s3-us-west-2.amazonaws.com/static.thinkpacifica.com/blog/wp-content/uploads/2017/03/lionello-delpiccolo-216163.jpg\">\n" +
    "			<a href=\"https://www.thinkpacifica.com/blog/cbt-act-thoughts-defusion/\" target=\"_blank\">CBT &amp; ACT: Help your clients give their thoughts a little space</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "")

$templateCache.put("templates/practitioner/upcoming-assessment-item.html","<span class=\"score next\">\n" +
    "  \n" +
    "</span>\n" +
    "<span class=\"date\">\n" +
    "	<strong class=\"block\">{{assessmentRequest.requestDate.format(\"dddd\")}}</strong>\n" +
    "	{{assessmentRequest.requestDate.format(\"M/D/YYYY\")}} {{'AT_DESCRIBING_TIME' | translate}} {{assessmentRequest.requestDate.format(\"hh:mm a z\")}}</span>\n" +
    "\n" +
    "<dropdown-button is-shown=\"showingAssessmentEditDropdown\" class=\"header-dropdown-wrapper\">\n" +
    "  <a>{{ 'EDIT_LOWER' | translate }}</a>\n" +
    "  <ul ng-show=\"showingAssessmentEditDropdown\" class=\"dropdown\">\n" +
    "    <li ng-click=\"editAssessment(assessmentRequest)\">{{ 'EDIT_ASSESSMENT_DETAILS' | translate }}</li>\n" +
    "    <li ng-click=\"cancelAssessment(assessmentRequest)\">{{ 'CANCEL_LOWER' | translate }} {{ 'ASSESSMENT' | translate }}</li>\n" +
    "  </ul>\n" +
    "</dropdown-button>\n" +
    "<br>\n" +
    "<span ng-if=\"assessmentRequest.repeating\" id=\"repeat-message\">This assessment request {{ assessmentRequest.repeatStr }} on {{ assessmentRequest.requestDate.format(\"dddd\") }} at {{ assessmentRequest.requestDate.format(\"h:mmA z\") }}<a><span ng-click=\"changeAssessments(assessmentRequest)\">{{ 'CHANGE' | translate }}</span><div ng-show=\"!showToolTip('viewed_assessment_dropdown_tooltip') && showToolTip('viewed_assessment_edit_tooltip') && assessmentRequest.firstRepeating\" class=\"hint-tooltip change-assessment\">\n" +
    "  <span ng-click=\"dismissToolTip('viewed_assessment_edit_tooltip')\" class=\"the-x\">&times;</span>\n" +
    "  <p>{{ 'ASSESSMENT_EDIT_TOOLTIP' | translate}}</p>\n" +
    "</div></a></span>\n" +
    "")

$templateCache.put("templates/practitioner/upgrade.html","<ion-modal-view class=\"upgrade-modal scroll-modal generic-modal\" close-handler=\"closeClinicianPremiumModal()\">\n" +
    "\n" +
    "  <ion-content class=\"filter-popover\" scroll=\"true\">\n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeClinicianPremiumModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1>{{ 'ACCOUNT_UPGRADE_POPUP_HEADER_2' | translate }}</h1>\n" +
    "    <ul class=\"feature-list\">\n" +
    "        <li><i class=\"icon ion-ios-videocam\"></i><strong>Expand your practice</strong> and <strong>reach new clients</strong> with a featured directory listing and secure teletherapy</li>\n" +
    "        <li><i class=\"icon ion-iphone\"></i><strong>Increase engagement</strong> by giving your clients <a href=\"https://itunes.apple.com/us/app/pacifica-anxiety-stress-depression-relief/id922968861?mt=8\" target=\"_blank\">Sanvello</a>, the #1 Mental Health App <em>($5.99/month value)</em></li>\n" +
    "        <li><i class=\"icon ion-monitor\"></i><strong>Gain deeper insights</strong> by reviewing your clients’ actionable mental health data</li>\n" +
    "        <li><i class=\"icon ion-stats-bars\"></i><strong>Monitor and improve outcomes</strong> in less time by assigning paperless assessments</li>\n" +
    "        <li><i class=\"icon ion-ios-calendar\"></i><strong>Organize your schedule</strong> with simple, easy client appointment scheduling</li>\n" +
    "    </ul>\n" +
    "    \n" +
    "    <div class=\"button-wrap\">\n" +
    "        <button ng-click=\"goToUpgrade('yearly')\" class=\"button-start\" style=\"margin-top: 10px;\">\n" +
    "            {{ 'YEARLY' | translate }}<br>\n" +
    "            <span>$499.99</span> <em>{{ 'CHARGED_YEARLY' | translate }}</em>\n" +
    "            <strong>{{ 'BEST_VALUE' | translate }}</strong>\n" +
    "        </button>\n" +
    "        <button ng-click=\"goToUpgrade('monthly')\" class=\"button-start light\">\n" +
    "            {{ 'MONTHLY' | translate }}<br>\n" +
    "            <span>$49.99</span> <em>{{ 'CHARGED_MONTHLY' | translate }}</em>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/practitioner/view-assessment-results.html","<ion-modal-view class=\"generic-modal view-results-modal scroll-modal\" close-handler=\"closeViewAssessmentResultsModal()\">\n" +
    "\n" +
    "  <ion-content overflow-scroll=\"true\">\n" +
    "    \n" +
    "    <i class=\"ion-ios-close-empty close\" ng-click=\"closeViewAssessmentResultsModal()\">\n" +
    "      <span>{{ 'CLOSE' | translate }}</span>\n" +
    "    </i>\n" +
    "\n" +
    "    <h1 class=\"title\">{{'ASSESSMENT_REVIEW' | translate}}<i class=\"icon ion-stats-bars\"></i></h1>\n" +
    "\n" +
    "    <p><strong>{{'ASSESSMENT' | translate}}:</strong><br>{{selectedAssessment.name | translate}}</p>\n" +
    "\n" +
    "    <p><strong>{{'COMPLETED_CAPS' | translate}}:</strong><br>{{selectedResults.userAssessment.finishedAt.format(\"dddd, M/D/YYYY, h:mm a\")}}</p>\n" +
    "\n" +
    "    <p><strong>{{'SCORE' | translate}}:</strong><br><span class=\"score-results\" ng-repeat=\"score in selectedResults.userAssessment.scores\">{{score.score}} ({{score.name | translate}})</span></p>\n" +
    "\n" +
    "    <p class=\"no-padding\"><strong>{{ 'RESPONSES' | translate }}:</strong></p>\n" +
    "\n" +
    "    <div ng-repeat=\"question in selectedAssessment.questions\">\n" +
    "      <p><strong>{{$index+1}}.</strong> {{question.instructions | translate}}:<br>{{question.text | translate}}<br>\n" +
    "      <em>{{ getAnswerText(question, selectedResults.userAssessment.assessmentAnswers[$index]) }}</em></p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"assessment-copyright\" ng-show=\"selectedAssessment.copyright\">{{selectedAssessment.copyright}}</div>\n" +
    "  </ion-content>\n" +
    "</ion-modal-view>\n" +
    "")

$templateCache.put("templates/careteam/coaches/coaches-table.directive.html","<table class=\"table coaches-table\">\n" +
    "    <thead>\n" +
    "        <tr class=\"no-card\">\n" +
    "            <th ng-click=\"sortField('name')\" ng-class=\"{'active': sortedBy.field === 'name'}\">\n" +
    "                {{ 'NAME' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'name'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th ng-click=\"sortField('role')\" ng-class=\"{'active': sortedBy.field === 'role'}\" class=\"coach-header\">\n" +
    "                {{ 'ROLE(S)' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'role'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th ng-click=\"sortField('individuals')\" ng-class=\"{'active': sortedBy.field === 'individuals'}\">\n" +
    "                {{ 'INDIVIDUALS' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'individuals'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"coach in coaches\">\n" +
    "            <td class=\"name-col\" ng-class=\"{'not-assigned': !individual.practitionerId}\" ng-click=\"viewCoach(coach)\">\n" +
    "                {{ coach.firstName + ' ' + coach.lastName}} \n" +
    "            </td>\n" +
    "            <td>\n" +
    "                Roles here\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                {{ coach.assignedClients }}\n" +
    "            </td>\n" +
    "           \n" +
    "            <td class=\"actions-col\">\n" +
    "                <dropdown-button is-shown=\"showingCoachDropdown\">\n" +
    "                    <a class=\"arrow\" ng-click=\"viewCoach(coach)\">{{ 'VIEW' | translate }}<span class=\"delimiter\"></span><i class=\"icon ion-ios-arrow-down\"></i></a>\n" +
    "                    <ul class=\"dropdown\">\n" +
    "                        <li>View options</li>\n" +
    "                    </ul>\n" +
    "                </dropdown-button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>")

$templateCache.put("templates/careteam/individuals/assign-button.directive.html","<button class=\"assign-button\" ng-click=\"ngClick()\">\n" +
    "    {{ 'ASSIGN' | translate }}\n" +
    "</button>")

$templateCache.put("templates/careteam/individuals/assigned-coach.directive.html","<div class=\"assigned-coach\">\n" +
    "    <div class=\"avatar-container\" ng-if=\"photo\">\n" +
    "        <img ng-src=\"{{ photo }}\" alt=\"avatar\" class=\"avatar-image\">\n" +
    "    </div>\n" +
    "    <div class=\"coach-meta\">\n" +
    "        <span class=\"name\">{{ practitionerName }}</span>\n" +
    "        <span class=\"status assigned\" ng-if=\"status === 'CONNECTED'\">{{ connectedAt | date:'M/d/yyyy' }}</span>\n" +
    "        <span class=\"status\" ng-if=\"status === 'INVITED'\">Awaiting acceptance</span>\n" +
    "    </div>\n" +
    "</div>")

$templateCache.put("templates/careteam/individuals/coach-assign-success.modal.html","<ion-modal-view class=\"generic-modal scroll-modal assign-coach-modal\" close-handler=\"closeAssignSuccessfulModal()\">\n" +
    "    <ion-content overflow-scroll=\"true\">\n" +
    "        <div>\n" +
    "            <h1 class=\"assign-coach-heading\">\n" +
    "                <i class=\"icon ion-ios-checkmark\"></i>\n" +
    "                {{ 'COACH_ASSIGNED' | translate }}\n" +
    "            </h1>\n" +
    "            <p class=\"assign-coach-guide\">\n" +
    "                {{ 'COACH_ASSIGN_SUCCESS' | translate }}\n" +
    "            </p>\n" +
    "            <button type=\"button\" ng-click=\"closeAssignSuccessfulModal()\">{{ 'FINISHED' | translate }}</button>\n" +
    "        </div>\n" +
    "    </ion-content>\n" +
    "</ion-modal-view>")

$templateCache.put("templates/careteam/individuals/individuals-header.html","\n" +
    "<div class=\"headline-wrap\">\n" +
    "	<h1>{{ currentViewOption | viewOptionLabel }} {{ '(' + totalIndividuals + ')'}}</h1>\n" +
    "	<dropdown-button ng-show=\"shouldShowViewOptions\" is-shown=\"showViewOptions\" class=\"header-dropdown-wrapper\">\n" +
    "	  <a class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></a>\n" +
    "	  <ul ng-show=\"showViewOptions\" class=\"dropdown\">\n" +
    "	    <li ng-repeat=\"option in viewOptions track by $index\" ng-click=\"updateViewOptions(option)\">{{ option | viewOptionLabel }}</li>\n" +
    "	  </ul>\n" +
    "	</dropdown-button>\n" +
    "</div>")

$templateCache.put("templates/careteam/individuals/individuals-table.directive.html","<table class=\"table individuals-table\">\n" +
    "    <thead>\n" +
    "        <tr class=\"no-card\">\n" +
    "            <th ng-click=\"sortField('name')\" ng-class=\"{'active': sortedBy.field === 'name'}\" width=\"20%\">\n" +
    "                {{ 'NAME' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'name'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th ng-if=\"isManagerView || isBackendCoachView\" ng-click=\"sortField('practitionerName')\" \n" +
    "                ng-class=\"{'active': sortedBy.field === 'practitionerName'}\" class=\"coach-header\" width=\"20%\">\n" +
    "                {{ 'ASSIGNED_COACH' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'practitionerName'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th ng-if=\"isManagerView\" ng-click=\"sortField('premiumType')\" ng-class=\"{'active': sortedBy.field === 'premiumType'}\" width=\"20%\">\n" +
    "                {{ 'PREMIUM_STATUS' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'premiumType'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th ng-if=\"!isManagerView\" ng-click=\"sortField('lastMessageAt')\"\n" +
    "                ng-class=\"{'active': sortedBy.field === 'lastMessageAt'}\" width=\"20%\">\n" +
    "                {{ 'LAST_MESSAGE' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'lastMessageAt'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th ng-click=\"sortField('pathActivityDate')\"\n" +
    "                ng-if=\"!isManagerView\"\n" +
    "                ng-class=\"{'active': sortedBy.field === 'pathActivityDate'}\" width=\"20%\">\n" +
    "                {{ 'LAST_JOURNEY_ACTIVITY' | translate }}\n" +
    "                <sort-arrow ng-if=\"sortedBy.field === 'pathActivityDate'\" order=\"sortedBy.order\"></sort-arrow>\n" +
    "            </th>\n" +
    "            <th class=\"filter\" width=\"20%\">\n" +
    "                {{ 'FILTER' | translate }}\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"individual in individuals\">\n" +
    "            <td class=\"name-col\" ng-class=\"{'not-assigned': !individual.practitionerId}\"\n" +
    "                ng-click=\"viewClient(individual)\">\n" +
    "                {{ individual.name }}\n" +
    "            </td>\n" +
    "            <td ng-if=\"isManagerView || isBackendCoachView\">\n" +
    "                <assign-button ng-if=\"!individual.practitionerId\"\n" +
    "                    ng-click=\"onAssign({individualId: individual.userId})\"></assign-button>\n" +
    "                <assigned-coach ng-if=\"individual.practitionerId\" practitioner-id=\"individual.practitionerId\"\n" +
    "                    practitioner-name=\"individual.practitionerName\" connected-at=\"individual.connectedAt\"\n" +
    "                    photo=\"individual.photo\" status=\"individual.status\"></assigned-coach>\n" +
    "            </td>\n" +
    "            <td ng-if=\"isManagerView\">\n" +
    "                <premium-status\n" +
    "                    ng-if=\"individual.premiumType\"\n" +
    "                    premium-status=\"individual.premiumType\"\n" +
    "                    premium-expiration=\"individual.expiresAt\"\n" +
    "                    sponsor-name=\"individual.sponsorName\"\n" +
    "                    sponsor-type=\"individual.sponsorType\">\n" +
    "                </premium-status>\n" +
    "            </td>\n" +
    "            <td ng-if=\"!isManagerView\">\n" +
    "                <div class=\"message-row\">\n" +
    "                    <div class=\"left\">\n" +
    "                        <span class=\"last-message-type\" ng-if=\"individual.lastMessageStatus === 'NEW_MESSAGE' \">{{ 'NEW_MESSAGE' | translate }}</span>\n" +
    "                        <span class=\"last-message-type\" ng-if=\"individual.lastMessageStatus === 'READ' \">{{ 'READ' | translate }}</span>\n" +
    "                        <span class=\"last-message-type\" ng-if=\"individual.lastMessageStatus === 'REPLIED' \">{{ 'REPLIED' | translate }}</span>\n" +
    "                        <span clss=\"last-message-time\">{{ getTimeAgo(individual.lastMessageAt) }}</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"right\">\n" +
    "                        <button class=\"assign-button\" ng-if=\"individual.lastMessageStatus === 'NEW_MESSAGE'\" ng-click=\"viewClient(individual, 'chat')\">{{ 'REPLY' | translate }}</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td ng-if=\"!isManagerView\">\n" +
    "                <div ng-if=\"individual.pathDayName\">\n" +
    "                    {{ individual.pathDay }} <strong>{{ individual.pathDayName | translate }}</strong><br> {{ getTimeAgo(individual.pathActivityDate) }}\n" +
    "                </div>\n" +
    "                <div ng-if=\"!individual.pathDayName\">\n" +
    "                    N/A\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td class=\"actions-col\">\n" +
    "                <dropdown-button is-shown=\"showingClientDropdown\" ng-if=\"individual.practitionerId\">\n" +
    "                    <a class=\"arrow\" ng-click=\"viewClient(individual)\">{{ 'VIEW' | translate }}<span class=\"delimiter\"></span><i class=\"icon ion-ios-arrow-down\"></i></a>\n" +
    "                    <ul class=\"dropdown\">\n" +
    "                        <li>View options</li>\n" +
    "                    </ul>\n" +
    "                </dropdown-button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>")

$templateCache.put("templates/careteam/individuals/premium-status.directive.html","<div class=\"premium-status\">\n" +
    "    <div class=\"premium-status-meta\">\n" +
    "        <div ng-if=\"premiumStatus === 'SPONSOR'\" class=\"sponsor-wrapper\">\n" +
    "            <span class=\"sponsor\">{{ ('PREMIUM_SPONSOR' | translate) | capitalize }}:</span>\n" +
    "            <div class=\"institution\">\n" +
    "                <span class=\"name\">{{ sponsorName }}</span>\n" +
    "                <span class=\"type\">({{ orgTypeAbbreviationToName(sponsorType) }})</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <span ng-if=\"premiumStatus === 'COMPLIMENTARY'\" class=\"sponsor-wrapper self-pay\">{{ ('COMPLIMENTARY' | translate) | capitalize }}</span>\n" +
    "        <span ng-if=\"premiumStatus === 'SELF_PAY'\" class=\"sponsor-wrapper self-pay\">{{ ('PREMIUM_SELF_PAY' | translate) | capitalize }}</span>\n" +
    "        <span ng-if=\"premiumStatus === 'NA'\" class=\"sponsor-wrapper self-pay\">{{ 'NONE' | translate }}</span>\n" +
    "\n" +
    "        <span ng-if=\"premiumStatus != 'NA'\" class=\"expiration\">{{ 'EXPIRES_ON' | translate }} {{ premiumExpiration | date:'M/d/yyyy' }}</span>\n" +
    "        <span ng-if=\"premiumStatus === 'NA'\" class=\"expiration\">N/A</span>\n" +
    "    </div>\n" +
    "</div>")

$templateCache.put("templates/careteam/individuals/sort-arrow.directive.html","<span>\n" +
    "    <span ng-if=\"order === 'desc'\" class=\"arrow\"><i class=\"icon ion-ios-arrow-up\"></i></span>\n" +
    "    <span ng-if=\"order === 'asc'\" class=\"arrow\"><i class=\"icon ion-ios-arrow-down\"></i></span>\n" +
    "</span>")
}]);
})();