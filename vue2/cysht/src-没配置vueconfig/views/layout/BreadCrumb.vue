<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item 
            v-for="item in breadcrumblsit" 
            :key="item"
            >{{item}}
            </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script>
export default {
    data() {
        return {
            breadcrumblsit: [],
        };
    },
    watch:{
        $route:{
            handler(){
                this.breadcrumblsit = []
                //match是数组 matched[0] 是一级路由信息 matched[1] 是嵌套路由信息
                let {matched} = this.$route
                if(matched[0].path==='') return
                if(matched[0].meta.level){
                    //只有一级菜单
                    this.breadcrumblsit.push(matched[0].meta.title)
                    return
                }
                //有二级菜单
                matched.forEach(item=>{
                    this.breadcrumblsit.push(item.meta.title)
                })
        },
        immediate:true
        }
    }
};
</script>

<style>
</style>