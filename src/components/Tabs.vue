<template>
  <div class="tabs-box">
    <!-- 剩余任务数 -->
    <span class="unReached">{{ unReachedNum }} items left</span>
    <!-- 状态切换区域 -->
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, show === state ? 'pointed' : '']"
        @click="handleShow(state)"
      >{{ state }}</span>
    </span>
    <!-- 删除所有已完成项按钮 -->
    <span class="delete" @click="handleDeleteCompleted">Delete completed items</span>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: String,
      required: true
    },
    todoLists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ['All', 'NeedToDo', 'Done']
    }
  },
  computed: {
    // 计算属性：获取当前剩余任务数
    unReachedNum() {
      return this.todoLists.filter(todoItem => !Number(todoItem.done)).length
    }
  },
  methods: {
    handleShow(state) {
      this.$emit('handleShow', state)
    },
    handleDeleteCompleted() {
      this.$emit('handleDeleteCompleted')
    }
  },
}
</script>

<style lang="scss" scoped>
  .tabs-box {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    font-size: 14px;
    font-style: italic;
    font-weight: 700;
    line-height: 1.375rem;
    padding: 5px 0;
    .unReached {
      width: 5.875rem;
      text-align: left;
    }
    .tabs {
      width: 11.5rem;
      display: flex;
      justify-content: space-between;
      * {
        display: inline-block;
        padding: 0 .0625rem;
        cursor: pointer;
        border: 1px solid rgba(175,47,47,0);
        &.pointed {
          // border-color: rgba(243, 75, 75, 0.4);
          // border-radius: 5px;
          background-color: rgba(243, 75, 75, 0.4);
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    .unReached, .tabs, .delete {
      padding: 0 1.125rem;
    }
    .delete {
      width: 10.875rem;
      text-align: center;
      cursor: pointer;
      margin-right: 1.0625rem;
      padding: 0;
      &:hover {
        background-color: rgba(243, 75, 75, 0.4);
        color: #fff;
        border-radius: 5px;
      }
    }
  }
</style>