const ID_TOKEN_KEY = "idToken";
import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

const JwtService = {
  getToken() {
    return Vue.cookies.get(ID_TOKEN_KEY);
  },
  setToken(idToken) {
    Vue.cookies.set(ID_TOKEN_KEY, idToken);
  },
  removeToken() {
    Vue.cookies.remove(ID_TOKEN_KEY);
  }
};

export default JwtService;
