import Vue from 'vue'
import Router from 'vue-router'
// 导入需要展示的组件
import Todo from '../views/Todo/TODO.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: Todo
    },
  ]
})
