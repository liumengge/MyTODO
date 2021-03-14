<template>
  <div class="footerTxt">
    <span>Written by {{ author }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: 'Miss Milly'
    }
  },
}
</script>

<style lang="scss" scoped>
  .footerTxt {
    margin-top: .5rem;
    text-align: center;
    color: #373b3e;
    font-weight: 700;
    font-style: italic;
    text-shadow: 5px 0 10px #fff;
  }
</style>