import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import register from "./register.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    register
  }
});
