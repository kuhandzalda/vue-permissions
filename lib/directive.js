"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var auth_1 = require("./auth");
var auth = new auth_1.Auth();
vue_1.default.directive("can", function (el, binding, vnode) {
    auth.userAsPermission(binding.value).then(function (res) {
        return res ? (vnode.elm.hidden = false) : (vnode.elm.hidden = true);
    });
});
vue_1.default.directive("canany", function (el, binding, vnode) {
    var permissions = binding.value.split(",");
    auth.userAsAnyPermission(permissions).then(function (res) {
        return res ? (vnode.elm.hidden = false) : (vnode.elm.hidden = true);
    });
});
