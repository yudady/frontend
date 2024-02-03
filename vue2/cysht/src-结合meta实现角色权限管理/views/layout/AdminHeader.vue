<template>
  <div class="header">
    <div class="top">
      <div class="left" @click="toggle">
        <!-- 展开的 -->
        <i class="el-icon-s-unfold" v-if="isCollapse"></i>
        <!-- 折叠的 -->
        <i class="el-icon-s-fold" v-else></i>
      </div>
      <div class="breadcrumb">
        <!-- 面包屑导航组件 -->
        <bread-crumb></bread-crumb>
      </div>
      <div class="right" @click="quit">退出登录</div>
    </div>
    <hr>
    <tabs></tabs>
  </div>
</template>

<script>
import BreadCrumb from './BreadCrumb.vue';
import Tabs from './Tabs.vue';
export default {
  components: { BreadCrumb, Tabs },
  props:{
    isCollapse:Boolean
  },
  methods: {
    toggle(){
      this.$emit('change-collapse');
    },
    //退出登录
    quit() {
      sessionStorage.clear();
      this.$router.push({
        path: "/login",
        query: {
            redirectUrl: this.$route.path
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.header{
  height: 100px;
}
.top{
  line-height: 50px;
    display: flex;
    .breadcrumb{
      width: 400px;
    }
    .el-breadcrumb{
      width: 600px;
      padding-left: 100px;
      line-height: 50px;
    }
    .right{
      position:absolute;
      right: 10px;
    }
}
</style>