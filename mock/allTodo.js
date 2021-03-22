let allTodoList = [{
  id: 0,
  done: 1,
  value: '写完todoList项目'
},{
  id: 1,
  done: 1,
  value: '学习vue2底层源码'
},{
  id: 2,
  done: 0,
  value: '学习TS+vue3'
}]

export default {
  'get|/allTodo':  option => {
  return {
      status: 200,
      message: 'success',
      data: allTodoList
    }
  }
}