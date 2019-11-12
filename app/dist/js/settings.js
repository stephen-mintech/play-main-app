/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"settings": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([14,"chunk-vendors","chunk-common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/settings/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _components_Settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Settings */ \"./src/pages/settings/components/Settings.vue\");\n/* harmony import */ var _components_FootTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/FootTab */ \"./src/components/FootTab.vue\");\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  components: {\n    Settings: _components_Settings__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n    MFooter: _components_FootTab__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  },\n  data: function data() {\n    return {\n      name: 'settings',\n      ready: false\n    };\n  },\n  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapGetters\"])(['isPlus'])),\n  created: function created() {\n    Utils.onPageCreated(this, this.isPlus);\n  },\n  methods: {}\n});\n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/components/Settings.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/settings/components/Settings.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js\");\n/* harmony import */ var vant_es_nav_bar_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vant/es/nav-bar/style */ \"./node_modules/vant/es/nav-bar/style/index.js\");\n/* harmony import */ var vant_es_nav_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vant/es/nav-bar */ \"./node_modules/vant/es/nav-bar/index.js\");\n/* harmony import */ var vant_es_cell_group_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vant/es/cell-group/style */ \"./node_modules/vant/es/cell-group/style/index.js\");\n/* harmony import */ var vant_es_cell_group__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vant/es/cell-group */ \"./node_modules/vant/es/cell-group/index.js\");\n/* harmony import */ var vant_es_cell_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vant/es/cell/style */ \"./node_modules/vant/es/cell/style/index.js\");\n/* harmony import */ var vant_es_cell__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vant/es/cell */ \"./node_modules/vant/es/cell/index.js\");\n/* harmony import */ var vant_es_switch_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vant/es/switch/style */ \"./node_modules/vant/es/switch/style/index.js\");\n/* harmony import */ var vant_es_switch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vant/es/switch */ \"./node_modules/vant/es/switch/index.js\");\n/* harmony import */ var vant_es_radio_group_style__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vant/es/radio-group/style */ \"./node_modules/vant/es/radio-group/style/index.js\");\n/* harmony import */ var vant_es_radio_group__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! vant/es/radio-group */ \"./node_modules/vant/es/radio-group/index.js\");\n/* harmony import */ var vant_es_radio_style__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! vant/es/radio/style */ \"./node_modules/vant/es/radio/style/index.js\");\n/* harmony import */ var vant_es_radio__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! vant/es/radio */ \"./node_modules/vant/es/radio/index.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _components_Spacer__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @/components/Spacer */ \"./src/components/Spacer.vue\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\nVue.use(vant_es_nav_bar__WEBPACK_IMPORTED_MODULE_9__[\"default\"]).use(vant_es_cell_group__WEBPACK_IMPORTED_MODULE_11__[\"default\"]).use(vant_es_cell__WEBPACK_IMPORTED_MODULE_13__[\"default\"]).use(vant_es_switch__WEBPACK_IMPORTED_MODULE_15__[\"default\"]).use(vant_es_radio_group__WEBPACK_IMPORTED_MODULE_17__[\"default\"]).use(vant_es_radio__WEBPACK_IMPORTED_MODULE_19__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Settings',\n  components: {\n    Spacer: _components_Spacer__WEBPACK_IMPORTED_MODULE_21__[\"default\"]\n  },\n  data: function data() {\n    return {\n      model: {\n        offline: false,\n        hide: false,\n        theme: 1\n      },\n      radio: '1'\n    };\n  },\n  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_20__[\"mapState\"])({\n    currentPage: function currentPage(state) {\n      return state.app.currentPage;\n    }\n  })),\n  created: function created() {},\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$nextTick(function () {\n      _this.init();\n    });\n  },\n  methods: {\n    init: function init() {},\n    goBack: function goBack() {\n      mui.back();\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/pages/settings/components/Settings.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"27f96fd9-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=template&id=4a0fae19&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"27f96fd9-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/settings/App.vue?vue&type=template&id=4a0fae19& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _vm.ready\n    ? _c(\"div\", { attrs: { id: \"app\" } }, [_c(\"Settings\")], 1)\n    : _vm._e()\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2227f96fd9-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"27f96fd9-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/components/Settings.vue?vue&type=template&id=d37e8498&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"27f96fd9-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/settings/components/Settings.vue?vue&type=template&id=d37e8498& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"page-content nav-content\" },\n    [\n      _c(\"van-nav-bar\", {\n        attrs: {\n          title: _vm.currentPage.meta.title,\n          fixed: \"\",\n          \"left-arrow\": \"\"\n        },\n        on: { \"click-left\": _vm.goBack }\n      }),\n      _c(\n        \"div\",\n        [\n          _c(\"Spacer\"),\n          _c(\"h2\", { staticClass: \"block-title\" }, [_vm._v(\"上線狀態\")]),\n          _c(\n            \"van-cell-group\",\n            [\n              _c(\n                \"van-cell\",\n                {\n                  staticStyle: { \"align-items\": \"center\" },\n                  attrs: {\n                    title: \"下線\",\n                    \"title-class\": \"van-field__label main-title\"\n                  }\n                },\n                [\n                  _c(\"van-switch\", {\n                    model: {\n                      value: _vm.model.offline,\n                      callback: function($$v) {\n                        _vm.$set(_vm.model, \"offline\", $$v)\n                      },\n                      expression: \"model.offline\"\n                    }\n                  })\n                ],\n                1\n              )\n            ],\n            1\n          ),\n          _c(\"Spacer\"),\n          _c(\"h2\", { staticClass: \"block-title\" }, [_vm._v(\"上線狀態\")]),\n          _c(\n            \"van-cell-group\",\n            [\n              _c(\n                \"van-cell\",\n                {\n                  staticStyle: { \"align-items\": \"center\" },\n                  attrs: {\n                    title: \"隱身榜單\",\n                    \"title-class\": \"van-field__label main-title\"\n                  }\n                },\n                [\n                  _c(\"van-switch\", {\n                    model: {\n                      value: _vm.model.hide,\n                      callback: function($$v) {\n                        _vm.$set(_vm.model, \"hide\", $$v)\n                      },\n                      expression: \"model.hide\"\n                    }\n                  })\n                ],\n                1\n              )\n            ],\n            1\n          ),\n          _c(\"Spacer\"),\n          _c(\"h2\", { staticClass: \"block-title\" }, [_vm._v(\"主題樣式\")]),\n          _c(\n            \"van-cell-group\",\n            [\n              _c(\n                \"van-cell\",\n                { attrs: { \"title-class\": \"van-field__label main-title\" } },\n                [\n                  _c(\n                    \"van-radio-group\",\n                    {\n                      model: {\n                        value: _vm.radio,\n                        callback: function($$v) {\n                          _vm.radio = $$v\n                        },\n                        expression: \"radio\"\n                      }\n                    },\n                    [\n                      _c(\n                        \"van-radio\",\n                        { staticClass: \"main-title\", attrs: { name: \"1\" } },\n                        [_vm._v(\"桃紅版面\")]\n                      ),\n                      _c(\"Spacer\"),\n                      _c(\n                        \"van-radio\",\n                        { staticClass: \"main-title\", attrs: { name: \"2\" } },\n                        [_vm._v(\"天藍版面\")]\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          ),\n          _c(\"Spacer\"),\n          _c(\"h2\", { staticClass: \"block-title\" }, [_vm._v(\"系統\")]),\n          _c(\n            \"van-cell-group\",\n            [\n              _c(\n                \"van-cell\",\n                {\n                  attrs: {\n                    title: \"清除快取\",\n                    \"title-class\": \"van-field__label main-title\",\n                    \"is-link\": \"\"\n                  }\n                },\n                [_vm._v(\" 23.16MB \")]\n              ),\n              _c(\n                \"van-cell\",\n                {\n                  attrs: {\n                    title: \"版本號\",\n                    \"title-class\": \"van-field__label main-title\"\n                  }\n                },\n                [_vm._v(\" 851 \")]\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/pages/settings/components/Settings.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2227f96fd9-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/postcss-loader/src/index.js):\\nJSONError: JSON Error in C:\\\\Users\\\\Stephen\\\\Desktop\\\\min-tech\\\\apps\\\\play-main-app\\\\package.json:\\nUnexpected string in JSON at position 130 while parsing '{\\r  \\\"name\\\": \\\"myapp-weui\\\",\\r  \\\"version\\\":'\\n    at module.exports (C:\\\\Users\\\\Stephen\\\\Desktop\\\\min-tech\\\\apps\\\\play-main-app\\\\node_modules\\\\cosmiconfig\\\\node_modules\\\\parse-json\\\\index.js:26:19)\\n    at Object.loadJson (C:\\\\Users\\\\Stephen\\\\Desktop\\\\min-tech\\\\apps\\\\play-main-app\\\\node_modules\\\\cosmiconfig\\\\dist\\\\loaders.js:15:12)\\n    at Explorer.loadPackageProp (C:\\\\Users\\\\Stephen\\\\Desktop\\\\min-tech\\\\apps\\\\play-main-app\\\\node_modules\\\\cosmiconfig\\\\dist\\\\createExplorer.js:176:35)\\n    at Explorer.loadFileContent (C:\\\\Users\\\\Stephen\\\\Desktop\\\\min-tech\\\\apps\\\\play-main-app\\\\node_modules\\\\cosmiconfig\\\\dist\\\\createExplorer.js:230:12)\\n    at Promise.resolve.then (C:\\\\Users\\\\Stephen\\\\Desktop\\\\min-tech\\\\apps\\\\play-main-app\\\\node_modules\\\\cosmiconfig\\\\dist\\\\createExplorer.js:252:21)\");\n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"8c32f064\", content, false, {\"sourceMap\":true,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/pages/settings/App.vue":
/*!************************************!*\
  !*** ./src/pages/settings/App.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_4a0fae19___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=4a0fae19& */ \"./src/pages/settings/App.vue?vue&type=template&id=4a0fae19&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/pages/settings/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ \"./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_4a0fae19___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_4a0fae19___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/pages/settings/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?");

/***/ }),

/***/ "./src/pages/settings/App.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/pages/settings/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?");

/***/ }),

/***/ "./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************!*\
  !*** ./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--8-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?");

/***/ }),

/***/ "./src/pages/settings/App.vue?vue&type=template&id=4a0fae19&":
/*!*******************************************************************!*\
  !*** ./src/pages/settings/App.vue?vue&type=template&id=4a0fae19& ***!
  \*******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27f96fd9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_4a0fae19___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"27f96fd9-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=4a0fae19& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"27f96fd9-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/App.vue?vue&type=template&id=4a0fae19&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27f96fd9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_4a0fae19___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27f96fd9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_4a0fae19___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/pages/settings/App.vue?");

/***/ }),

/***/ "./src/pages/settings/components/Settings.vue":
/*!****************************************************!*\
  !*** ./src/pages/settings/components/Settings.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Settings_vue_vue_type_template_id_d37e8498___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=d37e8498& */ \"./src/pages/settings/components/Settings.vue?vue&type=template&id=d37e8498&\");\n/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js& */ \"./src/pages/settings/components/Settings.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Settings_vue_vue_type_template_id_d37e8498___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Settings_vue_vue_type_template_id_d37e8498___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/pages/settings/components/Settings.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/pages/settings/components/Settings.vue?");

/***/ }),

/***/ "./src/pages/settings/components/Settings.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./src/pages/settings/components/Settings.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../../node_modules/babel-loader/lib!../../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/components/Settings.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/pages/settings/components/Settings.vue?");

/***/ }),

/***/ "./src/pages/settings/components/Settings.vue?vue&type=template&id=d37e8498&":
/*!***********************************************************************************!*\
  !*** ./src/pages/settings/components/Settings.vue?vue&type=template&id=d37e8498& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27f96fd9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_d37e8498___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"27f96fd9-vue-loader-template\"}!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=template&id=d37e8498& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"27f96fd9-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/settings/components/Settings.vue?vue&type=template&id=d37e8498&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27f96fd9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_d37e8498___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27f96fd9_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_d37e8498___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/pages/settings/components/Settings.vue?");

/***/ }),

/***/ "./src/pages/settings/settings.js":
/*!****************************************!*\
  !*** ./src/pages/settings/settings.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_Stephen_Desktop_min_tech_apps_play_main_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/main */ \"./src/main.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store */ \"./src/store/index.js\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App */ \"./src/pages/settings/App.vue\");\n\n\n\n\n\n\n\nnew Vue({\n  store: _store__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  render: function render(h) {\n    return h(_App__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/pages/settings/settings.js?");

/***/ }),

/***/ 14:
/*!**********************************************!*\
  !*** multi ./src/pages/settings/settings.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\Stephen\\Desktop\\min-tech\\apps\\play-main-app\\src\\pages\\settings\\settings.js */\"./src/pages/settings/settings.js\");\n\n\n//# sourceURL=webpack:///multi_./src/pages/settings/settings.js?");

/***/ }),

/***/ "page-manager":
/*!*************************************!*\
  !*** external "window.PageManager" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = window.PageManager;\n\n//# sourceURL=webpack:///external_%22window.PageManager%22?");

/***/ })

/******/ });