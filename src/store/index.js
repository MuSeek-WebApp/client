import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import progress from "./progress.module";
import event from "./event.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    progress,
    event
  }
});
