/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_art-template@4.12.2@art-template/lib/compile/runtime.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_art-template@4.12.2@art-template/lib/compile/runtime.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*! art-template@runtime | https://github.com/aui/art-template */

var detectNode = __webpack_require__(/*! detect-node */ "./node_modules/_detect-node@2.0.3@detect-node/index.js");
var runtime = Object.create(detectNode ? global : window);
var ESCAPE_REG = /["&'<>]/;

/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */
runtime.$escape = function (content) {
    return xmlEscape(toString(content));
};

/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data 
 * @param {function}     callback 
 */
runtime.$each = function (data, callback) {
    if (Array.isArray(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            callback(data[i], i);
        }
    } else {
        for (var _i in data) {
            callback(data[_i], _i);
        }
    }
};

// 将目标转成字符
function toString(value) {
    if (typeof value !== 'string') {
        if (value === undefined || value === null) {
            value = '';
        } else if (typeof value === 'function') {
            value = toString(value.call(value));
        } else {
            value = JSON.stringify(value);
        }
    }

    return value;
};

// 编码 HTML 内容
function xmlEscape(content) {
    var html = '' + content;
    var regexResult = ESCAPE_REG.exec(html);
    if (!regexResult) {
        return content;
    }

    var result = '';
    var i = void 0,
        lastIndex = void 0,
        char = void 0;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {

        switch (html.charCodeAt(i)) {
            case 34:
                char = '&#34;';
                break;
            case 38:
                char = '&#38;';
                break;
            case 39:
                char = '&#39;';
                break;
            case 60:
                char = '&#60;';
                break;
            case 62:
                char = '&#62;';
                break;
            default:
                continue;
        }

        if (lastIndex !== i) {
            result += html.substring(lastIndex, i);
        }

        lastIndex = i + 1;
        result += char;
    }

    if (lastIndex !== i) {
        return result + html.substring(lastIndex, i);
    } else {
        return result;
    }
};

module.exports = runtime;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../_webpack@4.8.3@webpack/buildin/global.js */ "./node_modules/_webpack@4.8.3@webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/_art-template@4.12.2@art-template/lib/runtime.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_art-template@4.12.2@art-template/lib/runtime.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./compile/runtime */ "./node_modules/_art-template@4.12.2@art-template/lib/compile/runtime.js");

/***/ }),

/***/ "./node_modules/_detect-node@2.0.3@detect-node/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/_detect-node@2.0.3@detect-node/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = false;

// Only Node.JS has a process variable that is of [[Class]] process
try {
 module.exports = Object.prototype.toString.call(global.process) === '[object process]' 
} catch(e) {}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.8.3@webpack/buildin/global.js */ "./node_modules/_webpack@4.8.3@webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/_webpack@4.8.3@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/html/components/test.art":
/*!**************************************!*\
  !*** ./src/html/components/test.art ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../../node_modules/_art-template@4.12.2@art-template/lib/runtime.js */ "./node_modules/_art-template@4.12.2@art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $escape = $imports.$escape, user = $data.user;
    $$out += '<div>\r\n    ';
    $$out += $escape(user.name);
    $$out += '\r\n</div>';
    return $$out;
};

/***/ }),

/***/ "./src/js/common/test.js":
/*!*******************************!*\
  !*** ./src/js/common/test.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const label = '测试tnt_promise';
console.log(label, '公共部分打印');

/* harmony default export */ __webpack_exports__["default"] = (label);

/***/ }),

/***/ "./src/js/index/index.js":
/*!*******************************!*\
  !*** ./src/js/index/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var window$__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! window$ */ "window$");
/* harmony import */ var window$__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(window$__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/test */ "./src/js/common/test.js");
/* harmony import */ var Tpl_test_art__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Tpl/test.art */ "./src/html/components/test.art");
/* harmony import */ var Tpl_test_art__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(Tpl_test_art__WEBPACK_IMPORTED_MODULE_2__);




// 如果想用管道
// var runtime = require('art-template/lib/runtime');
// runtime.dateFormat = function(date, format){ /*[...]*/ };

const html = Tpl_test_art__WEBPACK_IMPORTED_MODULE_2___default()({
    user:{name:'feel so great'}
});

window$__WEBPACK_IMPORTED_MODULE_0___default()('div').html(html);

console.log(_common_test__WEBPACK_IMPORTED_MODULE_1__["default"],'在index页面');

/***/ }),

/***/ "window$":
/*!***************************!*\
  !*** external "window.$" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = window.$;

/***/ })

/******/ });