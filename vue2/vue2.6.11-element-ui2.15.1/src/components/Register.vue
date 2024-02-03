<template>
  <div class="register-hello">
    <h1>prop2:{{ prop2 }}</h1>
    <div>components/register.vue</div>
    <div>components/register.vue</div>
    <div>components/register.vue</div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    prop2: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
