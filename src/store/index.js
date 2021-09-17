import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    backType: '1'
  },
  getters: {
    getBackType: state => state.backType
  },
  mutations: {
    setBackType(state, val) {
      state.backType = val
    }
  }
})