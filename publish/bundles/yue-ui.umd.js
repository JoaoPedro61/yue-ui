(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('yue-ui', ['exports', '@angular/core'], factory) :
    (global = global || self, factory(global['yue-ui'] = {}, global.ng.core));
}(this, (function (exports, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: version/version.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var VERSION = new core.Version('0.0.1');

    /**
     * @fileoverview added by tsickle
     * Generated from: version/public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: version/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: yue-ui.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var YueUiModule = /** @class */ (function () {
        function YueUiModule() {
        }
        YueUiModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [],
                        exports: []
                    },] }
        ];
        return YueUiModule;
    }());

    exports.VERSION = VERSION;
    exports.YueUiModule = YueUiModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yue-ui.umd.js.map
