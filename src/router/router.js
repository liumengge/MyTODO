import Vue from 'vue'
import Router from 'vue-router'
// 导入需要展示的组件
import TodoList from '@/views/TODO.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: '/app',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
