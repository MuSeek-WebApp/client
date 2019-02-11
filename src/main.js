import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
