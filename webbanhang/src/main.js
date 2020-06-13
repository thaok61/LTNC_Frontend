import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {mainurl} from 'constants'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  mainurl,
  render: h => h(App)
}).$mount('#app')
