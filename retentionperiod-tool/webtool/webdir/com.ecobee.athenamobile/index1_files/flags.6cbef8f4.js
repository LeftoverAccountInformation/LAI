angular.module('ecobeePortalApp')
  .service('featureFlags', function featureFlags() {

    var featureFlags = {
      hasLightSwitches: true
    }

    return featureFlags;
  });
