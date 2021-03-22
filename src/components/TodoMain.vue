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
      v-for="(item, index) in todoLists"
      :key="item.id"
      :todoList="item" 
      :index="index"
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
    this.$ajax('/allTodo')
        .then((res)=>{
            console.log(res)
            this.todoLists = res.data.data
        })
        .catch((err)=>{
          this.$message.error('这是一条错误消息');
        })
  },
  methods: {
    handleAddTodoList() {
      this.$router.push({ path: '/addTodoList' })
        .catch(err => {
          console.log(err)
        })   
      this.$ajax('/addTodoList')
        .then((res)=>{
            console.log(res)
            this.todoLists = res.data.data
        })
        .catch((err)=>{
          this.$message.error('错了哦，这是一条错误消息');
        })
      this.$refs.txt.value = ''
    },
    deleteTodoList(idx) {
      this.todoLists.splice(idx, 1)
    },
    handleShow(state) {
      this.show = state
      if (state === 'All') {
        this.$ajax({
          url: '/allTodo',
          params: {
              show: this.show
          }
        })
        .then(res => {
          this.todoLists = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
      } else if (state === 'NeedToDo') {
        this.$ajax({
          url: '/needTodo',
          params: {
              show: this.show
          }
        })
        .then(res => {
          this.todoLists = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
      }else {
        this.$ajax({
          url: '/done',
          params: {
              show: this.show
          }
        })
        .then(res => {
          this.todoLists = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    handleDeleteCompleted() {
      this.$ajax({
          url: '/delete',
          params: {
              show: this.show
          }
        })
        .then(res => {
          this.todoLists = res.data.data
        })
        .catch(error => {
          console.log(error)
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