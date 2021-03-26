<template>
  <div class="todo-box">
    <input
      autofocus
      class="txt"
      ref="txt" 
      type="text" 
      placeholder="Please enter your plan"
      @keydown.enter="handleAddTodoList"
    >
    <todo-list
      v-for="(item) in todoLists"
      :key="item.id"
      :todoList="item" 
      :index="item.id"
      @handleChange="handleChange(arguments)"
      @delete="deleteTodoList"
    ></todo-list>
    <tabs
      :todoLists="todoLists"
      :show="show"
      @handleShow="handleShow"
      @handleDeleteCompleted="handleDeleteCompleted"
    ></tabs>
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import Tabs from './Tabs.vue'

export default {
  components: {
    TodoList,
    Tabs
  },
  data() {
    return {
      todoLists: [],
      show: 'All'
    }
  },
  mounted() {
    this.$ajax('/api/tasks')
      .then((res)=>{
        this.todoLists = res.data.tasks
      })
      .catch((err)=>{
        this.$message.error(err.message || '系统出错了...');
      })
  },
  methods: {
    handleAddTodoList() {  
      this.$ajax.post('/api/tasks', {
        "value": this.$refs.txt.value,
        "done": 0
      })
      .then((res)=>{
        this.todoLists = res.data.tasks
      })
      .catch((err)=>{
        this.$message.error('错了哦，这是一条错误消息');
      })
      this.$refs.txt.value = ''
    },
    deleteTodoList(idx) {
      this.$ajax.delete("/api/tasks/"+idx)
        .then((res) => {
          this.todoLists = res.data.tasks
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
      }).catch((err) => {
        this.$message.error(err.message || '系统出错啦！')
      })
    },
    handleShow(state) {
      this.show = state
      if(state === 'All') {
        this.$ajax('/api/tasks')
        .then(res => {
          this.todoLists = res.data.tasks
        })
        .catch(error => {
          this.$message.error(error.message || '出错啦！')
        })
      }else if (state === 'NeedToDo') {
        this.$ajax({
          url: '/api/tasks',
          params: {
            done: 0
          }
        })
        .then(res => {
          this.todoLists = res.data.tasks
        })
        .catch(error => {
          this.$message.error(error.message || '出错啦！')
        })
      }else {
        this.$ajax({
          url: '/api/tasks',
          params: {
              done: 1
          }
        })
        .then(res => {
          this.todoLists = res.data.tasks
        })
        .catch(error => {
          this.$message.error(error.message || '出错啦！')
        })
      }
    },
    handleDeleteCompleted() {
      this.$ajax({
          url: '/api/tasks',
          params: {
            done: 1
          }
        })
        .then(res => {
          this.todoLists = res.data.tasks
        })
        .catch(error => {
          this.$message.error(error.message || '出错啦！')
        })
    },
    handleChange(arg) {
      this.$ajax.post('/api/tasks', {
        "id": arg[0],
        "done": arg[1]
      }).then((res) => {
        this.todoLists = res.data.tasks
      }).catch((err) => {
        this.$message.error(error.message || '出错啦！')
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .todo-box {
    width: 800px;
    margin: 0 auto;
    .txt {
      width: 100%;
      box-sizing: border-box;
      border: none;
      box-shadow: inset 0 -2px 1px #ddd;
      outline: none;
      position: relative;
      margin: 0;
      padding: 20px;
      font-size: 30px;
      font-family: inherit;
      line-height: 1.4em;
      &::-webkit-input-placeholder {
        color: #C0C0C0;
        font-family: 'Times New Roman', Times, serif;
      }
      &:-moz-placeholder {
        color: #C0C0C0;
        font-family: 'Times New Roman', Times, serif;
      }
    }
  }
</style>