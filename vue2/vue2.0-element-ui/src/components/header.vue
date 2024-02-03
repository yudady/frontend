<template>
<div class="header">
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <div class="logo">
      <img src="./../assets/logo.png" alt="">
    </div>
    <div class="nav">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">订单管理</el-menu-item>
    </div>
  </el-menu>
  <div class="line"></div>
</div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      activeIndex: "1"
    }
  },
  methods:{
    handleSelect(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.header{
  .logo {
      float: left;
      padding-left: 20px;
      display: inline-block;
      img{
        width: 40px;
      }
      padding-top: 10px
  }
  .nav{
    display: inline-block;
    float: right;
    padding-right: 20px;
  }
}
</style>
