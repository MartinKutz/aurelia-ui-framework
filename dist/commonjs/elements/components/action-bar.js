"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ActionBar = (function () {
    function ActionBar() {
    }
    ActionBar.prototype.attached = function () {
    };
    ActionBar.prototype.toggleMenuVisible = function () {
        this.menuVisible = !this.menuVisible;
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], ActionBar.prototype, "menuVisible", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ActionBar.prototype, "heading", void 0);
    ActionBar = __decorate([
        aurelia_framework_1.inlineView("<template>\n<div class=\"action-bar row\">\n    <div class=\"menu-button d-flex d-lg-none align-items-center\" click.delegate=\"toggleMenuVisible()\">\n        <img class=\"icon-small\" src=\"/static/icons/menu.svg\">\n    </div>\n    <!-- left action bar component: -->\n    <!-- show this version on lg and xl screens only: -->\n    <div class=\"action-bar-left col-xl-2 col-lg-3 d-none d-lg-flex\">\n        <div class=\"d-flex align-items-center\">\n            <img class=\"icon-small drill360-logo\" src=\"/static/images/logo_Drill360_inverted.svg\">\n            <div class=\"action-bar-left-heading d-flex align-items-center\">\n                <div class=\"app-name-caption\">${'actionBar.headingLeft' | t}</div>\n            </div>\n        </div>\n    </div>\n    <!-- show on sm and md screens only: -->\n    <div class=\"action-bar-left d-flex d-lg-none align-items-center\">\n        <img class=\"icon-small drill360-logo\" src=\"/static/images/logo_Drill360_inverted.svg\">\n    </div>\n    <!-- left action bar component END -->\n\n    <!-- central action bar component: -->\n    <!-- show on all screens: -->\n    <div class=\"action-bar-center col d-flex justify-content-center align-items-center\">\n        <p class=\"text-center font-weight-bold action-bar-center-heading\">${'actionBar.headingCentral' | t}</p>\n    </div>\n    <!-- central action bar component END -->\n\n    <!-- right action bar component: -->\n    <!-- show this version on md, lg and xl screens only: -->\n    <div class=\"action-bar-right col-xl-2 col-md-3 d-none d-md-flex\">\n        <div class=\"d-flex align-items-center\">\n            <img class=\"icon-small\" src=\"/static/images/user-profile.svg\">\n            <div class=\"username-caption\">${userName}</div>\n        </div>\n    </div>\n    <!-- show this version on sm screens only: -->\n    <div class=\"action-bar-right d-flex d-md-none align-items-center\">\n        <img class=\"icon-small\" src=\"/static/images/user-profile.svg\">\n    </div>\n    <!-- right action bar component END -->\n</div>\n</template>\n"),
        aurelia_framework_1.customElement('action-bar')
    ], ActionBar);
    return ActionBar;
}());
exports.ActionBar = ActionBar;
