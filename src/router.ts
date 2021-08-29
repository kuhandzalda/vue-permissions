import Vue from "vue";
import VueRouter from "vue-router";
import { Auth } from "./auth";
const auth = new Auth();
Vue.use(VueRouter);

export class Router {
  constructor(
    public model: { unauthorizedDefaultRedirect: string; params: Object }
  ) {
    return this;
  }

  mount() {
    const router = new VueRouter(this.model.params);

    router.beforeEach((to: any, from, next) => {
      if (to.meta.auth) {
        auth.userAsAnyPermission(to.meta.permissions).then((can) => {
          if (!can) {
            if (to.meta.redirectTo)
              window.location.href =
                to.meta.redirectTo === "default"
                  ? this.model.unauthorizedDefaultRedirect
                  : to.meta.redirectTo;
            else window.location.href = this.model.unauthorizedDefaultRedirect;
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
