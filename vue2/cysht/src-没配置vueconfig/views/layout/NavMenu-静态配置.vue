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
        <!-- 首页 -->
         <el-menu-item index="/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
        <!-- 学生管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">学生管理</span>
        </template>
         <el-menu-item index="/studentadmin/classadmin">
                <i class="el-icon-menu"></i>
                <span slot="title">班级管理</span>
        </el-menu-item>
         <el-menu-item index="/studentadmin/stuinfo">
                <i class="el-icon-menu"></i>
                <span slot="title">学员管理</span>
        </el-menu-item>
      </el-submenu>

       <!-- 图表管理 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">图表管理</span>
        </template>
         <el-menu-item index="/echarts/bar">
                <i class="el-icon-menu"></i>
                <span slot="title">柱状图</span>
        </el-menu-item>
         <el-menu-item index="/echarts/pie">
                <i class="el-icon-menu"></i>
                <span slot="title">饼图</span>
        </el-menu-item>
      </el-submenu>
       <!-- 公告-->
         <el-menu-item index="/notice/index">
        <i class="el-icon-menu"></i>
        <span slot="title">公告管理</span>
      </el-menu-item>
       <!-- 图片上传-->
         <el-menu-item index="/upload/index">
        <i class="el-icon-menu"></i>
        <span slot="title">图片上传</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    props:{
        isCollapse:Boolean
    },
    computed:{
      getpath(){
        let {fullPath} =this.$route
        if(fullPath==="/studentadmin/editstudent"){
            return "/studentadmin/stuinfo"
        }
       return fullPath
      }
    }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo{
   width: 200px;
    height: 100%;
    box-sizing: border-box;
}
.el-menu--collapse{
    width: 100px !important;
}
</style>