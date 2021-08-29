"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
var auth_1 = require("./auth");
var auth = new auth_1.Auth();
vue_1.default.use(vue_router_1.default);
var Router = /** @class */ (function () {
    function Router(model) {
        this.model = model;
        return this;
    }
    Router.prototype.mount = function () {
        var _this = this;
        var router = new vue_router_1.default(this.model.params);
        router.beforeEach(function (to, from, next) {
            if (to.meta.auth) {
                auth.userAsAnyPermission(to.meta.permissions).then(function (can) {
                    if (!can) {
                        if (to.meta.redirectTo)
                            window.location.href =
                                to.meta.redirectTo === "default"
                                    ? _this.model.unauthorizedDefaultRedirect
                                    : to.meta.redirectTo;
                        else
                            window.location.href = _this.model.unauthorizedDefaultRedirect;
                    }
                    else {
                        next();
                    }
                });
            }
            else {
                next();
            }
        });
        return router;
    };
    return Router;
}());
exports.Router = Router;
