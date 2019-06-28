import Vue from 'vue'
import Vuex from 'vuex'
import basicinfo from './modules/basicinfo.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
		basicinfo
    }
})