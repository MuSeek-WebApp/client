import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router.js'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyATf8pQvKSy06bSYjYGZgC5SOc-IKzdYYM",
  authDomain: "museek-ebe73.firebaseapp.com",
  databaseURL: "https://museek-ebe73.firebaseio.com",
  projectId: "museek-ebe73",
  storageBucket: "museek-ebe73.appspot.com",
  messagingSenderId: "550779950359"
};

firebase.initializeApp(config)
Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
