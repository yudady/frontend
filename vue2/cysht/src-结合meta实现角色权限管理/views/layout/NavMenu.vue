<template>
  <!-- <p>首页</p>
    <p>学生管理</p>
    <p>教师管理</p>
    <p>图表管理</p>
    <p>图片上传</p>
    <p>公告管理</p> -->
  <el-menu
    :default-active="getpath"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
  >
  <!-- 对应的路由菜单 -->
    <nav-item 
    v-for="route in routerlist" 
    :key="route.path" :route="route">
    </nav-item>
  </el-menu>
</template>

<script>
//只有一级菜单 可以用level=1来标识 也可以用item.children.length的长度减一的
//菜单文字在一级路由的meta中配置的
//有二级菜单 用item.children.length>1 就是孩子大于一的说明是二级路由
//隐藏路由 hidden=true 标识
import asyncRouter from "@/router/asyncRouter";
import NavItem from "./NavItem.vue";
export default {
  components: { NavItem },
  // data() {
  //   return {
  //     routerlist: asyncRouter,
  //   };
  // },
  props: {
    isCollapse: Boolean,
  },
  computed: {
    getpath() {
      let { fullPath } = this.$route;
      if (fullPath === "/studentadmin/editstudent") {
        return "/studentadmin/stuinfo";
      }
      return fullPath;
    },
    //计算属性可传值
    getIndex() {
      return function (item) {
        if (item.path === "/") {
          return "/" + item.children[0].path;
        }
        return item.path + "/" + item.children[0].path;
      };
    },
    routerlist(){
      let role = sessionStorage.getItem('role')
      return asyncRouter.filter(route=>{
       let index = route.meta.role.findIndex(item=>{
          return item==role
       })
       return index!=-1
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  width: 200px;
  height: 100%;
  box-sizing: border-box;
}
.el-menu--collapse {
  width: 100px !important;
}
</style>