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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BlockedPage {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = 'page';
    }
    goBack() {
        let history;
        chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
            for (let i = 0; i < tab.length; i++) {
                history = bgPage.tabsCollection.getTab(tab[i].id) || {};
                if (history.urls) {
                    for (let j = history.urls.length - 1; j >= 0; j-- ) {    
                        history.url = history.urls[j];                   
                        if (bgPage.checkPage(history)) {
                            chrome.tabs.update(tab[i].id, {
                                url: history.url
                            });
                            return;
                        }
                    } 
                }
                chrome.tabs.update(tab[i].id, {
                    url: 'chrome://newtab'
                });  
            }
        });
    }
    goSettings() {
        window.location = 'options.html';
    }
    reason() {
        let isWhiteList = getPref('whitelist');
        return isWhiteList ? 'This site is not in your list of "Allow These Sites Only"' : 'This site is in your list of "Block These Sites"';
    }
    template() {
        return `
            <div class="page__paragraph">
                <div class="logo logo_blocksite"></div>
                <div class="page__title"> This site is currently blocked by Block Site </div>
                <div class="page__sub-title"> ${this.reason()} </div>
                <div class="page__row">
                    <div id="back-button" class="button button_green"> GO BACK </div>
                    <div id="settings-button" class="button button_gray"> CHANGE SETTINGS </div>
                </div>
            </div>
            <div class="page__text"> You've got better things to do. <span> 😀 </span> </div>`;
    }
    render() {
        this.el.innerHTML = this.template();
        this.el.querySelector('#back-button')
               .addEventListener('click', e => this.goBack());
        this.el.querySelector('#settings-button')
               .addEventListener('click', e => this.goSettings());
        return this;
    }
}
/* unused harmony export BlockedPage */


let bgPage = chrome.extension.getBackgroundPage();
let getPref;
let setPref;

document.addEventListener('DOMContentLoaded', e => {
    bgPage.updateAllData().then(DB => {
        getPref = name => {
            return bgPage.getPref(name);
        };
        setPref = (name, value) => {
            DB[name] = value;
            bgPage.setPref(name, value);
        };
        let blockedPage = new BlockedPage();
        document.body.append(blockedPage.render().el);
    });
});

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background_js_blocked__ = __webpack_require__(11);


/***/ })

/******/ });
