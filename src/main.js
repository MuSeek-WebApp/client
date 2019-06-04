import Vue from "vue";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
import "vuetify/src/stylus/app.styl";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import store from "./store";
import ApiService from "./common/api.service";
import WsService from "./common/ws.service";
import config from "./common/firebase.js";
import VueTextareaAutosize from "vue-textarea-autosize";
import { CHECK_AUTH, GET_USER_DATA } from "./store/actions.type";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Vuetify);
Vue.use(VeeValidate, {
  events: "change"
});
Vue.use(VueTextareaAutosize);
Vue.use(VueGoogleMaps, {
  load: {
    key: config.apiKey
  }
});

ApiService.init();
WsService.init();

router.beforeEach(async (to, from, next) => {
  try {
    await store.dispatch(CHECK_AUTH);
    if (to.name === "Login") {
      next("/home");
    } else {
      await store.dispatch(GET_USER_DATA);
      next();
    }
  } catch {
    if (to.name === "Login" || to.name === "Register") {
      next();
    } else {
      next("/login");
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

firebase.initializeApp(config);
