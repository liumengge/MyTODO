<template>
  <div class="app">
    <div class="cover">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Todo from './views/Todo/TODO.vue'

export default {
  components: {
    Todo,
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.6;
    z-index: 1;
  }
}
</style>