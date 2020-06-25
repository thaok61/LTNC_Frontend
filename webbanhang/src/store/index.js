import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        mainURL: "http://localhost",
        userName: "guest",
        categoryId: ""
      },
      getters: {},
      mutations: {},
      actions: {}
});