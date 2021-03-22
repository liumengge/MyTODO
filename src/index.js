import Vue from 'vue'
import App from './app.vue'
import '../src/assets/styles/global.scss'
import axios from 'axios'
require('../mock')
import { Message } from 'element-ui'

Vue.use(Message)

Vue.prototype.$ajax = axios
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)