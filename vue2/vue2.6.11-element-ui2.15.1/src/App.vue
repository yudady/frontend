<template>
  <div id="app">
    <!--  -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/register">Register</router-link>|
      <router-link to="/helloworld">HelloWorld</router-link>|
    </div>
    <!--  -->
    <!-- <router-view /> -->
    <transition>
      <router-view class="view derault" />
      <router-view class="view one" name="a" />
      <router-view class="view two" name="b" />
    </transition>
  </div>
</template>

<style lang="less" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //
  #nav {
    margin: 100px 0px;
  }
  //
  // [router-view] {
  // }
  .row {
    margin: 50px 0px;
  }
}
</style>
