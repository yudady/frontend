<template>
<!-- 一级路由 -->
  <el-menu-item :index="getIndexOne(result)" v-if="result.level">
    <i :class="result.icon"></i>
    <span slot="title">{{ result.title }}</span>
  </el-menu-item>

  <el-submenu :index=" '/' + result.path" v-else>
    <template slot="title">
      <i :class="result.icon"></i>
      <span slot="title">{{result.title}}</span>
    </template>
    <el-menu-item 
    :index="'/'+result.path +'/' + item.path"  
    v-for="item in result.children"
     :key="item.path"
     >
    <i :class="item.icon"></i>
    <span slot="title">{{ item.title }}</span>
  </el-menu-item>
  </el-submenu>
</template>

<script>
import _ from "lodash"
export default {
  props: {
    route: Object,
  },
  computed:{
    //处理level=1的菜单的index值
    getIndexOne(){
      return function (item){
        if(item.path===""){
          return "/" + item.children[0].path
        }
        return '/'+ item.path +"/" +item.children[0].path
      }
    },
    //过滤hidden=true的值
    result(){
      let route = _.cloneDeep(this.route)
      let children = route.children.filter(item=>!item.hidden)
      route.children = children
      return route
    }
  }
};
</script>

<style>
</style>