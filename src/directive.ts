import Vue from "vue";
import { Auth } from "./auth";
const auth = new Auth();


Vue.directive("can", function(el, binding, vnode: any) {
    auth.userAsPermission(binding.value).then(res => {
        return res ? (vnode.elm.hidden = false) : (vnode.elm.hidden = true);
    });
});

Vue.directive("canany", function(el, binding, vnode: any) {
    const permissions = binding.value.split(",");
    auth.userAsAnyPermission(permissions).then(res => {
        return res ? (vnode.elm.hidden = false) : (vnode.elm.hidden = true);
    });
});