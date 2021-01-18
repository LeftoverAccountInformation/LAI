define("default/prop-types", ["exports","module","context"], function (exports, module, context) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    get: function() { return true; },
    set: function() {}
});



(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react-is.production.min.js');
} else {
  module.exports = __webpack_require__(3);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(0);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(4)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (true) {
  (function () {
    'use strict';

    Object.defineProperty(exports, '__esModule', { value: true });

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    function typeOf(object) {
      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_LAZY_TYPE:
          case REACT_MEMO_TYPE:
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    }

    // AsyncMode is deprecated along with isAsyncMode
    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;

    var hasWarnedAboutDeprecatedIsAsyncMode = false;

    // AsyncMode should be deprecated
    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true;
          lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.typeOf = typeOf;
    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isValidElementType = isValidElementType;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
  })();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactIs = __webpack_require__(0);
var assign = __webpack_require__(5);

var ReactPropTypesSecret = __webpack_require__(1);
var checkPropTypes = __webpack_require__(6);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function printWarning() {};

if (true) {
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ('development' !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var printWarning = function printWarning() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(1);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + (typeof error === 'undefined' ? 'undefined' : _typeof(error)) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function () {
  if (true) {
    loggedTypeFailures = {};
  }
};

module.exports = checkPropTypes;

/***/ })
/******/ ])));
});
define("default/trips/components/common/ui/react/inboxsync/Styles", ['exports', 'styletron-react', 'common/components/_themes/react/palette'], function (exports, _styletronReact, _palette) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Link = exports.Disclaimer = undefined;

    var _palette2 = babelHelpers.interopRequireDefault(_palette);

    var Disclaimer = exports.Disclaimer = (0, _styletronReact.styled)('span', {
        color: _palette2.default.gray_7,
        fontSize: '13px'
    });

    var Link = exports.Link = (0, _styletronReact.styled)('a', {
        whiteSpace: 'nowrap'
    });
});define("default/trips/components/common/ui/react/inboxsync/GoogleLimitedUseLink", ['exports', 'property!horizon.trips.inboxsync.google.limited.use.link', 'prop-types', 'trips/components/common/ui/react/resources', 'trips/components/common/ui/react/inboxsync/Styles'], function (exports, _propertyHorizonTripsInboxsyncGoogleLimitedUse, _propTypes, _resources, _Styles) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var HYPERLINK = _resources.strings.GOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK,
        DISCLAIMER = _resources.strings.GOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER;


    var Component = function Component(_ref) {
        var brand = _ref.brand;
        return DISCLAIMER.incorporateComponents(brand, babelHelpers.jsx(_Styles.Link, {
            href: (0, _propertyHorizonTripsInboxsyncGoogleLimitedUse.getString)('/'),
            target: '_blank',
            rel: 'noopener noreferrer'
        }, void 0, HYPERLINK))(_Styles.Disclaimer);
    };

    Component.propTypes = { brand: _propTypes2.default.string.isRequired };

    exports.default = ReactRedux.connect(function (store, ownProps) {
        return { brand: store && store.global && store.global.brand || ownProps.brand };
    })(Component);
});define('default/trips/components/common/ui/_svg_/close', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 11 11\"><path fill=\"#FFF\" d=\"M10.9 1.3L9.7.1 5.5 4.3 1.3.1.1 1.3l4.2 4.2L.1 9.7l1.2 1.2 4.2-4.2 4.2 4.2 1.2-1.2-4.2-4.2z\"/><path d=\"M10.9 1.3L9.7.1 5.5 4.3 1.3.1.1 1.3l4.2 4.2L.1 9.7l1.2 1.2 4.2-4.2 4.2 4.2 1.2-1.2-4.2-4.2z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/trips/components/common/ui/_svg_/close"}, params || {}, {svg: svgStr})); };
});define("default/trips/components/common/ui/react/resources", ['exports', 'string!trips/components/common/ui//REFRESH_EMAIL_TOKEN_TITLE', 'string!trips/components/common/ui//REFRESH_EMAIL_TOKEN_DESCRIPTION', 'string!trips/components/common/ui//EMAIL_TOKEN_LOST_TITLE', 'string!trips/components/common/ui//EMAIL_TOKEN_LOST_DESCRIPTION', 'string!trips/components/common/ui//REFRESH_CONNECTION_BUTTON', 'string!trips/components/common/ui//GOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK', 'string!trips/components/common/ui//GOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER', 'string!trips/components/common/ui//TRAVELERS', 'string!trips/components/common/ui//SEAT_NUMBER', 'trips/components/common/ui/_svg_/sync', 'trips/components/common/ui/_svg_/warning', 'trips/components/common/ui/_svg_/close'], function (exports, _stringREFRESH_EMAIL_TOKEN_TITLE, _stringREFRESH_EMAIL_TOKEN_DESCRIPTION, _stringEMAIL_TOKEN_LOST_TITLE, _stringEMAIL_TOKEN_LOST_DESCRIPTION, _stringREFRESH_CONNECTION_BUTTON, _stringGOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK, _stringGOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER, _stringTRAVELERS, _stringSEAT_NUMBER, _svgSync, _svgWarning, _svgClose) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.images = exports.strings = undefined;

    var _stringREFRESH_EMAIL_TOKEN_TITLE2 = babelHelpers.interopRequireDefault(_stringREFRESH_EMAIL_TOKEN_TITLE);

    var _stringREFRESH_EMAIL_TOKEN_DESCRIPTION2 = babelHelpers.interopRequireDefault(_stringREFRESH_EMAIL_TOKEN_DESCRIPTION);

    var _stringEMAIL_TOKEN_LOST_TITLE2 = babelHelpers.interopRequireDefault(_stringEMAIL_TOKEN_LOST_TITLE);

    var _stringEMAIL_TOKEN_LOST_DESCRIPTION2 = babelHelpers.interopRequireDefault(_stringEMAIL_TOKEN_LOST_DESCRIPTION);

    var _stringREFRESH_CONNECTION_BUTTON2 = babelHelpers.interopRequireDefault(_stringREFRESH_CONNECTION_BUTTON);

    var _stringGOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK2 = babelHelpers.interopRequireDefault(_stringGOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK);

    var _stringGOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER2 = babelHelpers.interopRequireDefault(_stringGOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER);

    var _stringTRAVELERS2 = babelHelpers.interopRequireDefault(_stringTRAVELERS);

    var _stringSEAT_NUMBER2 = babelHelpers.interopRequireDefault(_stringSEAT_NUMBER);

    var _svgSync2 = babelHelpers.interopRequireDefault(_svgSync);

    var _svgWarning2 = babelHelpers.interopRequireDefault(_svgWarning);

    var _svgClose2 = babelHelpers.interopRequireDefault(_svgClose);

    //Strings
    var strings = exports.strings = {
        REFRESH_EMAIL_TOKEN_TITLE: _stringREFRESH_EMAIL_TOKEN_TITLE2.default.value,
        REFRESH_EMAIL_TOKEN_DESCRIPTION: _stringREFRESH_EMAIL_TOKEN_DESCRIPTION2.default.value,
        EMAIL_TOKEN_LOST_TITLE: _stringEMAIL_TOKEN_LOST_TITLE2.default.value,
        EMAIL_TOKEN_LOST_DESCRIPTION: _stringEMAIL_TOKEN_LOST_DESCRIPTION2.default.value,
        REFRESH_CONNECTION_BUTTON: _stringREFRESH_CONNECTION_BUTTON2.default.value(),
        GOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK: _stringGOOGLE_LIMITED_USE_REQUIREMENTS_HYPERLINK2.default.value(),
        GOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER: _stringGOOGLE_LIMITED_USE_REQUIREMENTS_DISCLAIMER2.default,
        TRAVELERS: _stringTRAVELERS2.default.value(),
        SEAT_NUMBER: _stringSEAT_NUMBER2.default.value()
    };

    //SVGs
    var images = exports.images = {
        SyncIcon: _svgSync2.default,
        WarningIcon: _svgWarning2.default,
        CloseIcon: _svgClose2.default
    };
});define("momondo/common/components/_themes/react/palette", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var miami = {
        700: '#a80043',
        600: '#bf1056',
        500: '#e02671',
        400: '#f7498e',
        300: '#f65e9d',
        200: '#ff94bf',
        100: '#ffbdd6'
    };
    /* Sydney */
    var sydney = {
        700: '#005882',
        600: '#046d9f',
        500: '#0790d1',
        400: '#00baf7',
        300: '#4ecbf4',
        200: '#89defa',
        100: '#caf2ff'
    };

    var bangkok = {
        700: '#140028',
        600: '#220340',
        500: '#300b56',
        400: '#542881',
        300: '#8952bf',
        200: '#b686e4',
        100: '#d9b5fe'
    };

    var shanghai = {
        700: '#920700',
        600: '#be0800',
        500: '#d91007',
        400: '#ee322a',
        300: '#ff5952',
        200: '#ff928d',
        100: '#fccac8'
    };

    var jakarta = {
        700: '#033524',
        600: '#074d35',
        500: '#047550',
        400: '#2ca179',
        300: '#3bbe91',
        200: '#7adfbd',
        100: '#c1ffea'
    };

    var havana = {
        700: '#f09500',
        600: '#fba502',
        500: '#ffad12',
        400: '#ffba35',
        300: '#ffc557',
        200: '#ffd686',
        100: '#ffe3ae'
    };

    var murmansk = {
        700: 'black',
        600: '#191919',
        500: '#2d2d2d',
        400: '#585858',
        300: '#919191',
        200: '#c9c9c9',
        100: '#eaeaea',
        '700-04': 'rgba(0,0,0,0.4)',
        '700-06': 'rgba(0,0,0,0.6)',
        '700-09': 'rgba(0,0,0,0.9)'
    };

    var nuuk = {
        700: '#b3b0b0',
        600: '#ccc7c7',
        500: '#DFDFDF',
        400: '#edecec',
        300: '#f2f2f2',
        200: '#f9f9f9',
        100: 'white',
        '100-05': 'rgba(255,255,255,0.5)',
        '100-08': 'rgba(255,255,255,0.8)'
    };

    var amsterdam = {
        700: '#c14200',
        600: '#dd4e04',
        500: '#f75d0d',
        400: '#fe7934',
        300: '#ff9a67',
        200: '#ffc4a6',
        100: '#ffe7db'
    };

    var venice = {
        700: '#4b001f',
        600: '#5f032b',
        500: '#810037',
        400: '#ab1a57',
        300: '#bd3a70',
        200: '#dd6c9b',
        100: '#ff9fc7'
    };

    var jaipur = {
        700: '#460335',
        600: '#520740',
        500: '#671051',
        400: '#7f246a',
        300: '#b3499c',
        200: '#df76c9',
        100: '#ffa3ed'
    };

    var london = {
        700: '#00424e',
        600: '#015462',
        500: '#0d788d',
        400: '#1895ad',
        300: '#2dbfda',
        200: '#70dbf0',
        100: '#a8f1ff'
    };

    var montreal = {
        700: '#071d6e',
        600: '#102a8b',
        500: '#2540a4',
        400: '#415ec9',
        300: '#6683f0',
        200: '#92aaff',
        100: '#c6d3ff'
    };

    /* Neutral */
    var primaryNeutralBase = exports.primaryNeutralBase = nuuk[100];
    var primaryNeutralLight = exports.primaryNeutralLight = murmansk[100];
    var primaryNeutralDark = exports.primaryNeutralDark = murmansk[500];
    var secondaryNeutralBase = exports.secondaryNeutralBase = bangkok[600];
    var secondaryNeutralLight = exports.secondaryNeutralLight = bangkok[500];
    var secondaryNeutralDark = exports.secondaryNeutralDark = bangkok[700];

    /* Info */
    var primaryInfoBase = exports.primaryInfoBase = amsterdam[300];
    var primaryInfoLight = exports.primaryInfoLight = amsterdam[200];
    var primaryInfoDark = exports.primaryInfoDark = amsterdam[400];
    var secondaryInfoBase = exports.secondaryInfoBase = primaryInfoBase;
    var secondaryInfoLight = exports.secondaryInfoLight = primaryInfoLight;
    var secondaryInfoDark = exports.secondaryInfoDark = primaryInfoDark;

    /* Positive */
    var primaryPositiveBase = exports.primaryPositiveBase = sydney[400];
    var primaryPositiveLight = exports.primaryPositiveLight = sydney[300];
    var primaryPositiveDark = exports.primaryPositiveDark = sydney[500];
    var secondaryPositiveBase = exports.secondaryPositiveBase = primaryPositiveBase;
    var secondaryPositiveLight = exports.secondaryPositiveLight = primaryPositiveLight;
    var secondaryPositiveDark = exports.secondaryPositiveDark = primaryPositiveDark;

    /* Negative */
    var primaryNegativeBase = exports.primaryNegativeBase = shanghai[400];
    var primaryNegativeLight = exports.primaryNegativeLight = shanghai[300];
    var primaryNegativeDark = exports.primaryNegativeDark = shanghai[500];
    var secondaryNegativeBase = exports.secondaryNegativeBase = primaryNegativeBase;
    var secondaryNegativeLight = exports.secondaryNegativeLight = primaryNegativeLight;
    var secondaryNegativeDark = exports.secondaryNegativeDark = primaryNegativeDark;

    /* Search */
    var primarySearchBase = exports.primarySearchBase = miami[400];
    var primarySearchLight = exports.primarySearchLight = miami[300];
    var primarySearchDark = exports.primarySearchDark = miami[600];
    var secondarySearchBase = exports.secondarySearchBase = primarySearchBase;
    var secondarySearchLight = exports.secondarySearchLight = primarySearchLight;
    var secondarySearchDark = exports.secondarySearchDark = primarySearchDark;

    /* Redirect */
    var primaryRedirectBase = exports.primaryRedirectBase = jakarta[400];
    var primaryRedirectLight = exports.primaryRedirectLight = jakarta[300];
    var primaryRedirectDark = exports.primaryRedirectDark = jakarta[500];
    var secondaryRedirectBase = exports.secondaryRedirectBase = primaryRedirectBase;
    var secondaryRedirectLight = exports.secondaryRedirectLight = primaryRedirectLight;
    var secondaryRedirectDark = exports.secondaryRedirectDark = primaryRedirectDark;

    /* Text */
    var primaryFontPrimary = exports.primaryFontPrimary = nuuk[100];
    var primaryFontSecondary = exports.primaryFontSecondary = nuuk[500];
    var primaryFontTertiary = exports.primaryFontTertiary = nuuk[700];
    var secondaryFontPrimary = exports.secondaryFontPrimary = murmansk[500];
    var secondaryFontSecondary = exports.secondaryFontSecondary = murmansk[400];
    var secondaryFontTertiary = exports.secondaryFontTertiary = murmansk[300];

    /* Link */
    var primaryLink = exports.primaryLink = primaryPositiveBase;
    var primaryLinkHover = exports.primaryLinkHover = primaryPositiveLight;
    var primaryLinkActive = exports.primaryLinkActive = primaryPositiveDark;
    var secondaryLink = exports.secondaryLink = secondaryPositiveBase;
    var secondaryLinkHover = exports.secondaryLinkHover = secondaryPositiveLight;
    var secondaryLinkActive = exports.secondaryLinkActive = secondaryPositiveDark;

    // export const primaryTranslucent = `rgba(${murmansk[600]}, 0.1)`;
    var secondaryTranslucent = exports.secondaryTranslucent = 'rgba(255, 255, 255, 0.15)';
    var secondaryTranslucentOutlinedButton = exports.secondaryTranslucentOutlinedButton = 'rgba(255, 255, 255, 0.1)';

    /* Backdrop (overlay) */
    var popupFooter = exports.popupFooter = nuuk[300];
    var uiFocus = exports.uiFocus = '#ccf1fd';

    exports.default = {
        // primaries
        primary: 'ff690f',
        primary_4: '#D3030F', // focus/hover
        primary_3: '#FD4752', // click/press
        primary_2: '#FD868D', // ???
        primary_1: '#FECCCF',

        primary_alt_1: '#FC0D1B',
        primary_alt_3: '#D3030F',
        primary_alt_5: '#FFF2CE',
        primary_alt_6: '#FFB72E',

        secondary: '#0790d1',
        secondary_4: '#24477E', // focus/hover
        secondary_3: '#5F95E6', // click/presp-onboardings
        secondary_2: '#8FC3F7',
        secondary_1: '#C4E1FF',

        // neutrals
        black: '#000000',
        black_2: '#333333',
        black_1: '#4c4c4c',

        gray: '#0f0f0f',
        gray_9: '#717585',
        gray_8: '#717585',
        gray_7: '#717585',
        gray_6: '#717585',
        gray_5: '#a5a7b3',
        gray_4: '#a5a7b3',
        gray_3: '#e4e5ea',
        gray_2: '#e4e5ea',
        gray_1: '#f3f4f7',
        gray_0: '#f3f4f7',
        white: '#ffffff',

        // accents
        accent1: '#2d2d2d',
        accent1_4: '#108c59', // focus/hover
        accent1_3: '#17a66a', // click/press
        accent1_2: '#4dcc96',
        accent1_1: '#eefaf5',

        accent2: '#e63a51',
        accent2_4: '#b32538', // focus/hover
        accent2_3: '#cc2f44', // click/press
        accent2_2: '#eb6174',
        accent2_1: '#fdf1f3',

        // 3rd party
        facebookblue: '#3757a8',
        twitterblue: '#55acee',
        outlookblue: '#0067b8',
        outlookblue_hover: '#005da6',
        googleblue: '#4285F4',
        googleblue_hover: '#5491F5',
        googlered: '#da4c27',

        // Momondo
        primaryNeutralBase: primaryNeutralBase,
        primaryNeutralLight: primaryNeutralLight,
        primaryNeutralDark: primaryNeutralDark,
        secondaryNeutralBase: secondaryNeutralBase,
        secondaryNeutralLight: secondaryNeutralLight,
        secondaryNeutralDark: secondaryNeutralDark,
        primaryInfoBase: primaryInfoBase,
        primaryInfoLight: primaryInfoLight,
        primaryInfoDark: primaryInfoDark,
        secondaryInfoBase: secondaryInfoBase,
        secondaryInfoLight: secondaryInfoLight,
        secondaryInfoDark: secondaryInfoDark,
        primaryPositiveBase: primaryPositiveBase,
        primaryPositiveLight: primaryPositiveLight,
        primaryPositiveDark: primaryPositiveDark,
        secondaryPositiveBase: secondaryPositiveBase,
        secondaryPositiveLight: secondaryPositiveLight,
        secondaryPositiveDark: secondaryPositiveDark,
        primaryNegativeBase: primaryNegativeBase,
        primaryNegativeLight: primaryNegativeLight,
        primaryNegativeDark: primaryNegativeDark,
        secondaryNegativeBase: secondaryNegativeBase,
        secondaryNegativeLight: secondaryNegativeLight,
        secondaryNegativeDark: secondaryNegativeDark,
        primarySearchBase: primarySearchBase,
        primarySearchLight: primarySearchLight,
        primarySearchDark: primarySearchDark,
        secondarySearchBase: secondarySearchBase,
        secondarySearchLight: secondarySearchLight,
        secondarySearchDark: secondarySearchDark,
        primaryRedirectBase: primaryRedirectBase,
        primaryRedirectLight: primaryRedirectLight,
        primaryRedirectDark: primaryRedirectDark,
        secondaryRedirectBase: secondaryRedirectBase,
        secondaryRedirectLight: secondaryRedirectLight,
        secondaryRedirectDark: secondaryRedirectDark,
        primaryFontPrimary: primaryFontPrimary,
        primaryFontSecondary: primaryFontSecondary,
        primaryFontTertiary: primaryFontTertiary,
        secondaryFontPrimary: secondaryFontPrimary,
        secondaryFontSecondary: secondaryFontSecondary,
        secondaryFontTertiary: secondaryFontTertiary,
        primaryLink: primaryLink,
        primaryLinkHover: primaryLinkHover,
        primaryLinkActive: primaryLinkActive,
        secondaryLink: secondaryLink,
        secondaryLinkHover: secondaryLinkHover,
        secondaryLinkActive: secondaryLinkActive,
        uiFocus: uiFocus,
        secondaryTranslucent: secondaryTranslucent,
        secondaryTranslucentOutlinedButton: secondaryTranslucentOutlinedButton,
        popupFooter: popupFooter,
        venice: venice,
        havana: havana,
        london: london,
        montreal: montreal,
        jaipur: jaipur
    };
});define('default/trips/components/common/ui/_svg_/sync', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><path d=\"M37.482 95.686l-14.963-1.047C27.006 30.511 104.172.546 151.862 42.576V20h15c0 41.598 2.536 50.167-7.5 50.167H116.19v-15h27.22C105.37 19.429 41.157 43.157 37.482 95.686zm125.036 8.628c-3.676 52.529-67.888 76.255-105.928 40.519h27.22v-15c-42.228 0-50.672-2.516-50.672 7.5V180h15v-22.575c47.688 42.031 124.856 12.065 129.343-52.063l-14.963-1.048z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/trips/components/common/ui/_svg_/sync"}, params || {}, {svg: svgStr})); };
});define('default/trips/components/common/ui/_svg_/warning', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0\" y=\"0\" viewBox=\"0 0 23 23\" xml:space=\"preserve\"><path d=\"M22.4 11.2C22.4 5 17.4 0 11.2 0S0 5 0 11.2c0 6.2 5 11.2 11.2 11.2s11.2-5 11.2-11.2z\" fill=\"#e8381b\"/><path fill=\"#fff\" d=\"M10 5.6h2.4c0 3.6.1 1.9-.6 7.4h-1.1c-.8-5.3-.7-3.8-.7-7.4zM9.9 14.5h2.5v2.3H9.9z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/trips/components/common/ui/_svg_/warning"}, params || {}, {svg: svgStr})); };
});define("default/common/react/ReactSvgInline", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var cleanups = {
        title: /<title>.*<\/title>/gi,
        desc: /<desc>.*<\/desc>/gi,
        comment: /<!--.*-->/gi,
        defs: /<defs>.*<\/defs>/gi,

        width: / +width="\d+(\.\d+)?(px)?"/gi,
        height: / +height="\d+(\.\d+)?(px)?"/gi,

        fill: / +fill="(none|#[0-9a-f]+)"/gi,

        sketchMSShapeGroup: / +sketch:type="MSShapeGroup"/gi,
        sketchMSPage: / +sketch:type="MSPage"/gi,
        sketchMSLayerGroup: / +sketch:type="MSLayerGroup"/gi
    };

    var splitParams = function splitParams(params) {
        return params.trim().split('" ');
    };

    var splitParam = function splitParam(param) {
        return param.trim().split('="');
    };

    var stringParamsToObj = function stringParamsToObj(stringParams) {
        return splitParams(stringParams).map(function (p) {
            if (p.indexOf('="') >= 0) {
                var param = splitParam(p);
                if (param.length > 1) {
                    return babelHelpers.defineProperty({}, param[0], param[1].replace(/^"|"$/, '').trim());
                }
            }
            return null;
        }).filter(function (i) {
            return i;
        }) // filter null vals
        .reduce(function (acc, itm) {
            return babelHelpers.extends({}, acc, itm);
        }, {});
    };

    var getStringParams = function getStringParams(svg) {
        var svgParamsMatch = svg.match(/<svg([^>]*)>/);
        if (svgParamsMatch && svgParamsMatch.length > 1) {
            return svgParamsMatch[1].trim();
        }
        return '';
    };

    var safeText = function safeText() {
        var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (typeof string === 'string') {
            return string.replace(/<(?:.|\n)*?>/gm, '');
        }
        return '';
    };

    var addAccessibilityData = function addAccessibilityData(svg) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var title = data.title,
            titleId = data.titleId,
            description = data.description,
            descriptionId = data.descriptionId;

        if (!title && !titleId && !description && !descriptionId) {
            return svg;
        }

        var svgMatch = svg.match(/(<svg.*?>)(.*?)(<\/svg>)/);
        if (!svgMatch || svgMatch.length < 3) {
            return svg;
        }

        var _svgMatch = babelHelpers.slicedToArray(svgMatch, 4),
            openTag = _svgMatch[1],
            content = _svgMatch[2],
            closeTag = _svgMatch[3];

        var finalContent = content;
        var descriptionText = safeText(description);
        if (descriptionText !== '' && descriptionId) {
            finalContent = '<desc id="' + descriptionId + '">' + descriptionText + '</desc>' + finalContent;
        }

        var titleText = safeText(title);
        if (titleText !== '' && titleId) {
            finalContent = '<title id="' + titleId + '">' + titleText + '</title>' + finalContent;
        }

        return '' + openTag + finalContent + closeTag;
    };

    /* eslint-disable prefer-const */
    var SVGInline = function SVGInline(props) {
        var className = props.className,
            parentClassName = props.parentClassName,
            svg = props.svg,
            id = props.id,
            parentId = props.parentId,
            ariaLabelledBy = props.ariaLabelledBy,
            title = props.title,
            ariaDescribedBy = props.ariaDescribedBy,
            description = props.description,
            width = props.width,
            height = props.height,
            fill = props.fill,
            cleanup = props.cleanup,
            cleanupExceptions = props.cleanupExceptions,
            noWrapperElement = props.noWrapperElement,
            transform = props.transform,
            svgNonFocusable = props.svgNonFocusable,
            componentProps = babelHelpers.objectWithoutProperties(props, ['className', 'parentClassName', 'svg', 'id', 'parentId', 'ariaLabelledBy', 'title', 'ariaDescribedBy', 'description', 'width', 'height', 'fill', 'cleanup', 'cleanupExceptions', 'noWrapperElement', 'transform', 'svgNonFocusable']);


        if (
        // simple way to enable entire cleanup
        cleanup === true ||
        // passing cleanupExceptions enable cleanup as well
        cleanup.length === 0 && cleanupExceptions.length > 0) {
            cleanup = Object.keys(cleanups);
        }
        cleanup = cleanup.filter(function (key) {
            return !(cleanupExceptions.indexOf(key) > -1);
        });

        if (width && height === undefined) {
            height = width;
        }

        var idSufx = id || Date.now().toString(36);
        var titleId = title ? ariaLabelledBy || 'title_' + idSufx : null;
        var descriptionId = description ? ariaDescribedBy || 'description_' + idSufx : null;
        var cleanedUpSVG = addAccessibilityData(SVGInline.cleanupSvg(svg, cleanup), { titleId: titleId, title: title, descriptionId: descriptionId, description: description });

        var accessibilityParams = '';
        if (titleId) {
            accessibilityParams += ' aria-labelledby=' + titleId;
        }

        if (descriptionId) {
            accessibilityParams += ' aria-describedby=' + descriptionId;
        }

        var idString = id ? 'id=' + id : '';

        var style = 'width:inherit;height:inherit;line-height:inherit;color:inherit;';
        return noWrapperElement ? React.createElement('svg', babelHelpers.extends({}, stringParamsToObj(getStringParams(cleanedUpSVG)), stringParamsToObj(accessibilityParams.trim()), stringParamsToObj(idString), {
            className: className,
            'aria-labelledby': ariaLabelledBy,
            'aria-describedby': ariaDescribedBy,
            role: 'img'
        }, componentProps, {
            dangerouslySetInnerHTML: {
                __html: cleanedUpSVG.replace(/<svg([^>]*)>/, '').replace(/<\/svg>/, '')
            }
        })) : React.createElement('span', babelHelpers.extends({}, componentProps, parentId ? { id: parentId } : {}, {
            className: parentClassName ? 'svg ' + parentClassName : 'svg',
            style: {
                transform: transform || 'translate3d(0,0,0)',
                verticalAlign: 'middle',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                height: height || false,
                width: width || false,
                fill: fill || false
            },
            dangerouslySetInnerHTML: {
                __html: cleanedUpSVG.replace(/<svg/, '<svg ' + idString + (' class="' + (className || '') + '"') + ' role="img"' + (' ' + accessibilityParams.trim()) + (' style="' + style + '"') + (' ' + (svgNonFocusable ? 'focusable="false"' : '')))
            }
        }));
    };

    SVGInline.defaultProps = {
        cleanup: [],
        cleanupExceptions: []
    };

    SVGInline.cleanupSvg = function (svg) {
        var cleanup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return Object.keys(cleanups).filter(function (key) {
            return cleanup.indexOf(key) > -1;
        }).reduce(function (acc, key) {
            return acc.replace(cleanups[key], '');
        }, svg).trim();
    };

    exports.default = SVGInline;
});define("default/styletron-react", ["exports","module","context"], function (exports, module, context) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    get: function() { return true; },
    set: function() {}
});



module.exports = StyletronReact;
});
