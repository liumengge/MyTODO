<template>
  <div class="todo-box">
    <input
      autofocus
      class="txt"
      ref="txt" 
      type="text" 
      placeholder="Please enter your plan"
      @keydown.enter="handleAddTodoItem"
    >
    <div class="sc">
      <todo-item
        v-for="(item) in todoLists"
        :key="item.id"
        :todoItem="item" 
        @handleChange="handleChange(arguments)"
        @delete="deleteTodoItem"
      ></todo-item>
    </div>
    <tabs
      :todoLists="todoLists"
      :show="show"
      @handleShow="handleShow"
      @handleDeleteCompleted="handleDeleteCompleted"
    ></tabs>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import Tabs from './Tabs.vue'

export default {
  components: {
    TodoItem,
    Tabs
  },
  data() {
    return {
      todoLists: [],
      show: 'All'  // 显示状态
    }
  },
  mounted() {
    this.$ajax('/tasks')
      .then((res)=>{
        this.todoLists = res.data.tasks
      })
      .catch((err)=>{
        this.$message.error(err.message || '系统出错了...');
      })
  },
  methods: {
    handleAddTodoItem() {  // 添加一项新的任务
      this.$ajax.post('/tasks', {
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
    deleteTodoItem(idx) {  // 删除id为idx的任务项
      this.$ajax.delete("/tasks/"+idx)
        .then((res) => {
          this.todoLists = res.data.tasks
      }).catch((err) => {
        this.$message.error(err.message || '系统出错啦！')
      })
    },
    handleShow(state) {
      this.show = state
      if(state === 'All') {
        this.$ajax('/tasks')
        .then(res => {
          this.todoLists = res.data.tasks
        })
        .catch(error => {
          this.$message.error(error.message || '出错啦！')
        })
      }else if (state === 'NeedToDo') {
        this.$ajax({
          url: '/tasks',
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
          url: '/tasks',
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
    handleDeleteCompleted() {  // 删除所有已完成项
      this.$ajax.delete('/tasks')
        .then(res => {
          this.todoLists = res.data.tasks
          this.show = 'All'
        })
        .catch(error => {
          this.$message.error(error.message || '出错啦！')
        })
    },
    handleChange(arg) {
      this.$ajax.post('/tasks', {
        "id": arg[0],
        "done": arg[1]
      }).then((res) => {
        this.todoLists = res.data.tasks
      }).catch((error) => {
        this.$message.error(error.message || '出错啦！')
      })
      this.show = 'All'
    }
  },
}
</script>

<style lang="scss" scoped>
  .todo-box {
    width: 800px;
    margin: 0 auto;
    .sc {
      max-height: 260px;
      overflow: auto;
    }
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