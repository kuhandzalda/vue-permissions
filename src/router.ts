import Vue from "vue";
import VueRouter from "vue-router";
import { Auth } from "./auth";
const auth = new Auth();
Vue.use(VueRouter);
export class Router {

    constructor(public redirectTo: string, public params: Object )  {
        return this;
    }

    init(){
        const router = new VueRouter(this.params);

        router.beforeEach((to: any, from, next) => {
            if (to.meta.auth) {
                auth.userAsAnyPermission(to.meta.permissions).then(can => {
                    if (!can) {
                        if (to.meta.redirectTo)
                            window.location.href = to.meta.redirectTo === 'default' ? this.redirectTo : to.meta.redirectTo;
                        else
                            window.location.href = this.redirectTo;
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