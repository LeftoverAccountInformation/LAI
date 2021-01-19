define("default/common/components/_utils/react/immutableUtils", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var addItem = exports.addItem = function addItem(array, item) {
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : array.length;
        return [].concat(babelHelpers.toConsumableArray(array.slice(0, index)), [item], babelHelpers.toConsumableArray(array.slice(index)));
    };
    var removeItem = exports.removeItem = function removeItem(array, index) {
        return [].concat(babelHelpers.toConsumableArray(array.slice(0, index)), babelHelpers.toConsumableArray(array.slice(index + 1)));
    };
    var updateItem = exports.updateItem = function updateItem(array, index, item) {
        return [].concat(babelHelpers.toConsumableArray(array.slice(0, index)), [item], babelHelpers.toConsumableArray(array.slice(index + 1)));
    };

    var findIndex = exports.findIndex = function findIndex() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if (data.length === 0) {
            return -1;
        }
        // eslint-disable-next-line no-plusplus
        for (var i = 0; i < data.length; i++) {
            if (filter(data[i])) {
                return i;
            }
        }
        return -1;
    };

    var findItem = exports.findItem = function findItem() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        var index = findIndex(data, filter);

        if (index > -1) {
            return babelHelpers.extends({}, data[index]);
        }

        return null;
    };

    exports.default = null;
});define("default/trips/react/reducers/user/UserReducer", ['exports', 'trips/react/reducers/TripsStoreActionTypes', 'trips/react/reducers/user/UserActions', 'common/components/_utils/react/immutableUtils'], function (exports, _TripsStoreActionTypes, _UserActions, _immutableUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        switch (action.type) {
            case _TripsStoreActionTypes2.default.UPDATE_STORE:
                {
                    if (action.store.user) {
                        return babelHelpers.extends({}, state, action.store.user);
                    }
                    return state;
                }
            case _UserActions.actionTypes.INBOX_TOGGLE:
                {
                    return babelHelpers.extends({}, state, {
                        isInboxActivated: action.isInboxActivated
                    });
                }
            case _UserActions.actionTypes.TOGGLE_SUBSCRIPTION:
                {
                    var itemIndex = (0, _immutableUtils.findIndex)(state.userSubscriptions, function (i) {
                        return action.subscriptionName === i.subscriptionName;
                    });
                    var item = itemIndex !== -1 ? state.userSubscriptions[itemIndex] : null;
                    return babelHelpers.extends({}, state, item && {
                        userSubscriptions: (0, _immutableUtils.updateItem)(state.userSubscriptions, itemIndex, babelHelpers.extends({}, item, {
                            enabled: !item.enabled
                        }))
                    });
                }
            case _UserActions.actionTypes.SET_HOME_AIRPORT:
                {
                    return babelHelpers.extends({}, state, {
                        homeAirportDisplay: action.homeAirportDisplay,
                        homeAirportCode: action.homeAirportCode
                    });
                }
            default:
                return state;
        }
    };

    var _TripsStoreActionTypes2 = babelHelpers.interopRequireDefault(_TripsStoreActionTypes);

    var initialState = {
        homeAirportDisplay: null,
        homeAirportCode: null,
        userSubscriptions: []
    };
});define("default/trips/react/reducers/TripsStoreActionTypes", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var prefix = 'TRIPS.GLOBAL';

    exports.default = {
        UPDATE_STORE: prefix + '.UPDATE_STORE',
        FETCH_STORE_START: prefix + '.FETCH_STORE_START',
        FETCH_STORE_FINISH: prefix + '.FETCH_STORE_FINISH',
        SET_PATH: prefix + '.SET_PATH',
        SET_FLIGHT_CHECKIN_URL: prefix + '.SET_FLIGHT_CHECKIN_URL',
        SET_LINKED_USER: prefix + '.SET_LINKED_USER',
        TOGGLE_EVENT_ITEM: prefix + '.TOGGLE_EVENT_ITEM',
        UPDATE_FORM_TOKEN: prefix + '.UPDATE_FORM_TOKEN',
        REMOVE_TRIP: prefix + '.REMOVE_TRIP',
        SET_TRIP_TYPE: prefix + '.SET_TRIP_TYPE',
        SET_MOBILE_BANNER_VISIBILITY: prefix + '.SET_MOBILE_BANNER_VISIBILITY',
        SET_TRIP_USER_NOTIFICATION: prefix + '.SET_TRIP_USER_NOTIFICATION',
        SET_SHARING_EMAIL_HASH: prefix + '.SET_SHARING_EMAIL_HASH',
        SET_SHARING_CONFIRMATION_CODE: prefix + '.SET_SHARING_CONFIRMATION_CODE',
        SET_PUBLIC_ACCESS_ENABLED: prefix + '.SET_PUBLIC_ACCESS_ENABLED',
        SET_SUGGESTED_RECIPIENTS: prefix + '.SET_SUGGESTED_RECIPIENTS',
        REMOVE_SUGGESTED_RECIPIENT: prefix + '.REMOVE_SUGGESTED_RECIPIENT'
    };
});define("default/common/components/_utils/react/formUtils", ['exports', 'moment'], function (exports, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getDefinedValue = exports.isDefinedAndNotNull = exports.isDefined = undefined;
    exports.serialize = serialize;
    exports.createTimeRangeItem = createTimeRangeItem;
    exports.createTimeRange = createTimeRange;
    exports.disassembleTime = disassembleTime;

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    function serialize(params) {
        var str = [];
        Object.keys(params).forEach(function (key) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        });
        return str.join('&');
    }

    /**
     * Create a time object with multiple details
     * @returns {{id: string, name: string, hour: string, minute: string, period: string}}
     */
    function createTimeRangeItem(hourItem, timeFormat) {
        return {
            id: hourItem.format('HH:mm'),
            name: hourItem.format(timeFormat || 'hh:mm A'),
            hour: hourItem.format('hh'),
            minute: hourItem.format('mm'),
            period: hourItem.format('A')
        };
    }

    /**
     * Create 24h time range with item every half an hour
     * @returns {[{id: string, name: string, hour: string, minute: string, period: string}]}
     */
    function createTimeRange(timeFormat) {
        var hh = [];
        for (var i = 0; i < 48; i += 1) {
            var hourItem = (0, _moment2.default)().hour(Math.floor(i / 2)).minute(i % 2 ? 30 : 0);
            hh.push(createTimeRangeItem(hourItem, timeFormat));
        }
        return hh;
    }

    /**
     * Disassemble 24h time string into object
     * @param time 24h time
     * @returns {?{time24: string, time12: string, hour: string, minute: string, period: string}}
     */
    function disassembleTime() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (time === null) {
            return null;
        }

        var parsedTime = (0, _moment2.default)(time, 'HH:mm');
        return {
            time24: parsedTime.format('HH:mm'),
            time12: parsedTime.format('hh:mm A'),
            hour: parsedTime.format('hh'),
            minute: parsedTime.format('mm'),
            period: parsedTime.format('A'),
            moment: parsedTime
        };
    }

    var isDefined = exports.isDefined = function isDefined(value) {
        return typeof value !== 'undefined';
    };
    var isDefinedAndNotNull = exports.isDefinedAndNotNull = function isDefinedAndNotNull(value) {
        return isDefined(value) && value !== null;
    };
    var getDefinedValue = exports.getDefinedValue = function getDefinedValue(value, defaultValue) {
        return isDefined(value) ? value : defaultValue;
    };

    exports.default = null;
});define("default/trips/react/reducers/user/UserActions", ['exports', 'common/components/_utils/react/formUtils', 'common/components/_utils/react/immutableUtils'], function (exports, _formUtils, _immutableUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.inboxDeactivated = exports.inboxActivated = exports.setAirport = exports.toggleSubscription = exports.actionTypes = undefined;


    var prefix = 'TRIPS.USER';

    var actionTypes = exports.actionTypes = {
        INBOX_TOGGLE: prefix + '.INBOX_TOGGLE',
        SET_HOME_AIRPORT: prefix + '.SET_HOME_AIRPORT',
        TOGGLE_SUBSCRIPTION: prefix + '.TOGGLE_SUBSCRIPTION'
    };

    var toggleSubscription = exports.toggleSubscription = function toggleSubscription() {
        var subscriptionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'product';
        return function (dispatch, getStore) {
            var _getStore = getStore(),
                _getStore$global$form = _getStore.global.formtoken,
                formtoken = _getStore$global$form === undefined ? null : _getStore$global$form,
                _getStore$user$userSu = _getStore.user.userSubscriptions,
                userSubscriptions = _getStore$user$userSu === undefined ? [] : _getStore$user$userSu;

            var userSubscription = (0, _immutableUtils.findItem)(userSubscriptions, function (i) {
                return subscriptionName === i.subscriptionName;
            });

            if (!userSubscription) {
                return;
            }

            dispatch({
                type: actionTypes.TOGGLE_SUBSCRIPTION,
                subscriptionName: subscriptionName
            });

            fetch('/h/affinity', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF': formtoken
                },
                body: (0, _formUtils.serialize)({
                    action: 'subscription',
                    subname: subscriptionName,
                    enable: !userSubscription.enabled
                })
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.status === 200 ? response.text() : null;
            }).then(function (message) {
                if (message === 'fail') {
                    throw Error('failed');
                }
                // revert
            }).catch(function () {
                dispatch({
                    type: actionTypes.TOGGLE_SUBSCRIPTION,
                    subscriptionName: subscriptionName
                });
            });
        };
    };

    var setAirport = exports.setAirport = function setAirport() {
        var homeAirportDisplay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var homeAirportCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return function (dispatch, getStore) {
            var _getStore2 = getStore(),
                _getStore2$global$for = _getStore2.global.formtoken,
                formtoken = _getStore2$global$for === undefined ? null : _getStore2$global$for;

            if (homeAirportCode === null || homeAirportCode.length === 0) {
                return;
            }

            dispatch({
                type: actionTypes.SET_HOME_AIRPORT,
                homeAirportDisplay: homeAirportDisplay,
                homeAirportCode: homeAirportCode
            });

            fetch('/a/api/account/preferences/V1/homeairport/update', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF': formtoken
                },
                body: (0, _formUtils.serialize)({
                    homeAirport: homeAirportCode
                })
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.status === 200 ? response.json() : null;
            });
        };
    };

    var inboxActivated = exports.inboxActivated = function inboxActivated() {
        return {
            type: actionTypes.INBOX_TOGGLE,
            isInboxActivated: true
        };
    };

    var inboxDeactivated = exports.inboxDeactivated = function inboxDeactivated() {
        return {
            type: actionTypes.INBOX_TOGGLE,
            isInboxActivated: false
        };
    };

    exports.default = null;
});define("default/moment", ["exports","module","context"], function (exports, module, context) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    get: function() { return true; },
    set: function() {}
});



module.exports = moment;
});
