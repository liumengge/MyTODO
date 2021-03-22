import Vue from 'vue'
import Router from 'vue-router'
// 导入需要展示的组件
import TodoList from '../views/Todo/TODO.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/allTodo'
    },
    {
      path: '/allTodo',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/addTodoList',
      name: 'addTodoList',
      component: TodoList
    },
    {
      path: '/needTodo',
      name: 'needTodo',
      component: TodoList
    },
    {
      path: '/done',
      name: 'done',
      component: TodoList
    },
    {
      path: '/delete',
      name: 'delete',
      component: TodoList
    }
  ]
})
