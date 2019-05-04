import Vue from "vue";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
import "vuetify/src/stylus/app.styl";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import store from "./store";
import ApiService from "./common/api.service";
import config from "./common/firebase.js";
import { CHECK_AUTH } from "./store/actions.type";
import VueTextareaAutosize from "vue-textarea-autosize";

Vue.use(Vuetify, {
  iconfont: "md"
});
Vue.use(VeeValidate, {
  events: "change"
});
Vue.use(VueTextareaAutosize);

ApiService.init();

router.beforeEach((to, from, next) => {
  store
    .dispatch(CHECK_AUTH)
    .then(() => {
      if (to.name === "Login") {
        next("/home");
      } else {
        next();
      }
    })
    .catch(() => {
      if (to.name === "Login" || to.name === "Register") {
        next();
      } else {
        next("/login");
      }
    });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

firebase.initializeApp(config);
