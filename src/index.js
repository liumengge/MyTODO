import Vue from 'vue'
import App from './app.vue'
import '../src/assets/styles/global.scss'
import axios from 'axios'
import router from './router/router.js'
require('../mock')
import { Message } from 'element-ui'

Vue.use(Message)
Vue.prototype.$message = Message

Vue.prototype.$ajax = axios
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root)