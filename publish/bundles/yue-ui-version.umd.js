(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('yue-ui/version', ['exports', '@angular/core'], factory) :
	(global = global || self, factory((global['yue-ui'] = global['yue-ui'] || {}, global['yue-ui'].version = {}), global.ng.core));
}(this, (function (exports, core) { 'use strict';

	/**
	 * @fileoverview added by tsickle
	 * Generated from: version.ts
	 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
	 */
	/** @type {?} */
	var VERSION = new core.Version('0.0.1');

	exports.VERSION = VERSION;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yue-ui-version.umd.js.map
