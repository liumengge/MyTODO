<template>
  <div class="todo">
    <input 
      class="txt"
      ref="txt" 
      type="text" 
      placeholder="请输入你的计划"
      @keydown.enter="handleAddTodoList"
    >
    <div 
      v-for="(item,index) of todoList"
      :key="item.id"
    >
      <div 
        :class="[todoItem, item.done ? 'done' : '']"
      >
        <input type="checkbox">
        <label>{{ item.value }}</label>
        <button class="delete" @click="handleDelete(index)"></button>
      </div>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from '../components/Tabs.vue'

export default {
  components: {
    Tabs
  },
  data() {
    return {
      todoList: [
        {
          id: 1,
          done: true,
          value: '吃饭'
        },
        {
          id: 1,
          done: true,
          value: '敲代码'
        }
      ],

    }
  },
  methods: {
    handleAddTodoList() {
      this.todoList.push(this.$refs.txt.value)
      this.$refs.txt.value = ''
    }
  },
  handleDelete() {
  }
}
</script>

<style lang="scss" scoped>
  .todo {
    width: 800px;
    margin: 0 auto;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #666;
    .txt {
      width: 100%;
      box-sizing: border-box;
      border: none;
      box-shadow: inset 0 -2px 1px #ddd;
      outline: none;
      margin: 0;
      padding: 15px;
      font-size: 24px;
      line-height: 1.4em;
    }
  }
</style>