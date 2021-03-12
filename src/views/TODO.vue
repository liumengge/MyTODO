<template>
  <div class="todo">
    <div class="cover">
      <Header></Header>
      <List></List>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import List from '../components/List.vue'

export default {
  components: {
    Header,
    List
  }
  
}
</script>

<style lang="scss" scoped>
.todo {
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