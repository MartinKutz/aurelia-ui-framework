var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable, inlineView, customElement } from 'aurelia-framework';
let ActionBar = class ActionBar {
    attached() {
    }
    toggleMenuVisible() {
        this.menuVisible = !this.menuVisible;
    }
};
__decorate([
    bindable,
    __metadata("design:type", Boolean)
], ActionBar.prototype, "menuVisible", void 0);
__decorate([
    bindable,
    __metadata("design:type", String)
], ActionBar.prototype, "heading", void 0);
ActionBar = __decorate([
    inlineView(`<template>
<div class="action-bar row">
    <div class="menu-button d-flex d-lg-none align-items-center" click.delegate="toggleMenuVisible()">
        <img class="icon-small" src="/static/icons/menu.svg">
    </div>
    <!-- left action bar component: -->
    <!-- show this version on lg and xl screens only: -->
    <div class="action-bar-left col-xl-2 col-lg-3 d-none d-lg-flex">
        <div class="d-flex align-items-center">
            <img class="icon-small drill360-logo" src="/static/images/logo_Drill360_inverted.svg">
            <div class="action-bar-left-heading d-flex align-items-center">
                <div class="app-name-caption">\${'actionBar.headingLeft' | t}</div>
            </div>
        </div>
    </div>
    <!-- show on sm and md screens only: -->
    <div class="action-bar-left d-flex d-lg-none align-items-center">
        <img class="icon-small drill360-logo" src="/static/images/logo_Drill360_inverted.svg">
    </div>
    <!-- left action bar component END -->

    <!-- central action bar component: -->
    <!-- show on all screens: -->
    <div class="action-bar-center col d-flex justify-content-center align-items-center">
        <p class="text-center font-weight-bold action-bar-center-heading">\${'actionBar.headingCentral' | t}</p>
    </div>
    <!-- central action bar component END -->

    <!-- right action bar component: -->
    <!-- show this version on md, lg and xl screens only: -->
    <div class="action-bar-right col-xl-2 col-md-3 d-none d-md-flex">
        <div class="d-flex align-items-center">
            <img class="icon-small" src="/static/images/user-profile.svg">
            <div class="username-caption">\${userName}</div>
        </div>
    </div>
    <!-- show this version on sm screens only: -->
    <div class="action-bar-right d-flex d-md-none align-items-center">
        <img class="icon-small" src="/static/images/user-profile.svg">
    </div>
    <!-- right action bar component END -->
</div>
</template>
`),
    customElement('action-bar')
], ActionBar);
export { ActionBar };
