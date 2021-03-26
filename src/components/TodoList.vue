<template>
  <div 
    :class="['item-box', todoList.done ? 'done' : '']"
  >
    <input class="check" type="checkbox" v-model="todoList.done" @change="handleChange">
    <label>{{ todoList.value }}</label>
    <button class="delete" @click="handleDelete(index)"></button>
  </div>
</template>

<script>
export default {
  props: {
    todoList: {
      type: Object,
      required: true
    },
    index: Number
  },
  data() {
    return {
      id: this.todoList.id,
      done: this.todoList.done
    }
  },
  methods: {
    handleDelete(index) {
      this.$emit('delete', index)
    },
    handleChange() {
      this.todoList.done ? this.done = 1 : this.done = 0
      this.$emit('handleChange', this.id, this.done)      
    },
  },
}
</script>

<style lang="scss" scoped>
.item-box {
    position: relative;
    background-color: #fff;
    &:hover {
      background-color: #ddd;
      cursor: pointer;
      .delete::after {
        content: 'x';
      }
    }
    label {
      display: block;
      margin-left: 45px;
      white-space: pre-line;
      word-break: break-all;
      font-size: 20px;
      line-height: 1.2;
      transition: 0.4s;
      padding: 15px 60px 15px 15px;
    }
    &.done {
      label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
    }
    .check {
      width: 60px;
      height: 40px;
      text-align: center;
      position: absolute;
      top: 0;
      bottom: 0;
      border: none;
      margin: auto 0;
      appearance: none;
      outline: none;
      cursor: pointer;
      &::after {
        content: url('../assets/images/unChecked.svg');
      }
      &:checked::after {
        content: url('../assets/images/checked.svg');
      }
    }
    .delete {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 50px;
        height: 50px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color: transparent;
        appearance: none;
        border-width: 0;
        cursor: pointer;
        outline: none;
    }
  }
</style>