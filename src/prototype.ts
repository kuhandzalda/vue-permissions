import Vue from "vue";
import { Auth } from './auth';

Vue.prototype.$auth = new Auth('/auth');