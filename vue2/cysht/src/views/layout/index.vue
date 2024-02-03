<template>
  <el-container>
  <el-aside width="200px" :class="isCollapse ?'collapse':''">
    <!-- 左侧导航 -->
    <nav-menu :is-collapse="isCollapse"></nav-menu>
  </el-aside>
  <el-container>
    <el-header>
      <!-- 头部 -->
      <admin-header :is-collapse="isCollapse"  @change-collapse="changeCollapse"></admin-header>
    </el-header>
    <el-main>
      <!-- 嵌套路由的出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>

import AdminHeader from './AdminHeader.vue'
import NavMenu from './NavMenu.vue'
export default {
  components: { NavMenu, AdminHeader },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 100px !important;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  .collapse{
    width: 100px !important;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
</style>