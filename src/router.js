import Vue from "vue";
import VueRouter from "vue-router";
import { Auth } from "./auth";
const auth = new Auth();
Vue.use(VueRouter);
export class Router {

    constructor({ redirectTo, params }) {
        this.redirectTo = redirectTo;
        const router = new VueRouter({...params });
        router.beforeEach((to, from, next) => {
            if (to.meta.auth) {
                auth.userAsAnyPermission(to.meta.permissions).then(can => {
                    if (!can) {
                        if (to.meta.redirectTo)
                            window.location = to.meta.redirectTo === 'default' ? redirectTo : to.meta.redirectTo;
                        else
                            window.location = redirectTo;
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        });
        return router;
    }
}