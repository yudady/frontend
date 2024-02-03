<template>
  <div id="app">
    <header_bar></header_bar>
    <nav_bar class="nav"></nav_bar>
    <router-view class="view"></router-view>
    <footer_bar></footer_bar>
  </div>
</template>

<script>
import nav_bar from '@/components/nav'
import header_bar from '@/components/header'
import footer_bar from '@/components/footer'
export default {
  name: 'app',
  components:{
    'header_bar': header_bar,
    'nav_bar':nav_bar,
    'footer_bar':footer_bar,
  }
}
</script>

<style lang="scss" type="text/css" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .nav,.view{
    float: left;
  }
}
</style>
