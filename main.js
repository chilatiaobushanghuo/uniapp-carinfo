import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import store from './store/index.js'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    store,...App
	
})
app.$mount()