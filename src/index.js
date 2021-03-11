import Vue from 'vue'
import App from './app.vue'
import '../src/assets/styles/test.css'
import '../src/assets/images/pic-F.jpg'
import '../src/assets/styles/test-stylus.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)