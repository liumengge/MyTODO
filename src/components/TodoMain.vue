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
      v-for="(item, index) in filteredTodoLists"
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

let id = 0

export default {
  components: {
    TodoList,
    Tabs
  },
  data() {
    return {
      todoLists: [
        // {
        //   id: 0,
        //   done: true,
        //   value: 'Eating'
        // },
        // {
        //   id: 1,
        //   done: true,
        //   value: 'Coding'
        // }
      ],
      show: 'All'
    }
  },
  computed: {
    filteredTodoLists() {
      if (this.show === 'All') return this.todoLists
      const done = this.show === 'Done'
      return this.todoLists.filter(todoList => done === todoList.done)
    }
  },
  methods: {
    handleAddTodoList() {
      this.todoLists.push({
        id: id++,
        value: this.$refs.txt.value,
        done: false
      })
      this.$refs.txt.value = ''
    },
    deleteTodoList(idx) {
      this.todoLists.splice(idx, 1)
    },
    handleShow(state) {
      this.show = state
    },
    handleDeleteCompleted() {
      this.todoLists = this.todoLists.filter(todoList => !todoList.done)
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