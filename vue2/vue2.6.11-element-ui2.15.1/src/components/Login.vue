<template>
  <div class="compontnts-login">
    <h1>prop1:{{ prop1 }}</h1>
    <div>components/Login.vue</div>
    <div>components/Login.vue</div>
    <div>components/Login.vue</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    prop1: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
