<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  }
}
</script>

<style>
html,body,p{
  margin: 0px;
  padding: 0px;
}
#app {
  height: 100vh;
}
</style>
