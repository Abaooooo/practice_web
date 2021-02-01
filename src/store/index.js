import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
if (+new Date().getTime() - userInfo.time > 1800000) {
  userInfo = userInfo.data;
}
export default new Vuex.Store({
  state: {
    userInfo,
  },
  mutations: {
    updateUserInfo(state, value) {
      state.userInfo = value;
    },
  },
  actions: {},
  modules: {},
});
