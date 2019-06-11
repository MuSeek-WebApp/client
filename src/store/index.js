import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import progress from "./progress.module";
import event from "./event.module";
import profile from "./profile.module";
import band from "./band.module";
import error from "./error.module";
import general from "./general.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    auth,
    progress,
    event,
    profile,
    band,
    error
  }
});
