<template>
  <div class="todo">
    <Header></Header>
    <!-- todo组件 -->
    <Todo-Main></Todo-Main>
    <!-- 脚注 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import TodoMain from '../../components/TodoMain.vue'
import Footer from '../../components/Footer.vue'

export default {
  components: {
    Header,
    TodoMain,
    Footer
  }
  
}
</script>

<style lang="scss" scoped>

</style>