import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from "./store"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  VueCookies,
  render: h => h(App)
}).$mount('#app')
