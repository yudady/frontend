<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>学员信息</span>
      <el-button @click="addstudent" style="float: right; padding: 3px 0" type="text" v-if="role !=='teacher'"
        >添加学员</el-button
      >
    </div>
    <!-- 筛选列表 -->
    <sel-student  @on-submit="onsubmit" @on-reset="onreset" ></sel-student>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="stuId" label="学号" > </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="className" label="班级名称" > </el-table-column>
      <el-table-column prop="gender" label="性别"> 
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gender===0">男</el-tag>
          <el-tag type="success" v-if="scope.row.gender===1">女</el-tag>
          <el-tag type="warning" v-if="scope.row.gender===2">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="imgUrl" label="头像" >
         <template slot-scope="scope">
         <img :src="scope.row.imgUrl" alt="">
        </template>
     </el-table-column>
      <el-table-column prop="payStatus" label="缴费状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.payStatus===0">试听</el-tag>
          <el-tag type="success" v-if="scope.row.payStatus===1">欠费</el-tag>
          <el-tag type="warning" v-if="scope.row.payStatus===2">已缴费</el-tag>
        </template>
      </el-table-column>

      <!-- 编辑删除操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" 
          @click="handleEdit(scope.$index, scope.row)"
          class="but"
            >编辑</el-button
          >
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
          <el-button
            size="mini"
            type="danger"
            slot="reference"
            >删除
            </el-button>
          </el-popconfirm>
          
   
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页显示 -->
    <el-pagination
      background
      layout="prev, pager, next, jumper, ->, total"
      :total="total"
      :page-size="4"
      :current-page="page"
      @current-change="handlechange"
      v-if="tableData.length"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import {getstudent,delstudent} from "@/api/http"
// 函数集
import _ from "lodash";
import selStudent from './selStudent.vue';
import {mapMutations,mapState} from 'vuex'
export default {
  components: { selStudent },
  data() {
    return {
      tableData: [],
      total:null,
      page:1,
      //获取登录用户的角色
      role:sessionStorage.getItem('role'),
      loading:true,
      form:{
            name: "",
            classId: "",
            gender: 0,
            payStatus: 0,
            imgUrl: "",
          }
    };
  },
  computed:{
      ...mapState(["page2"])
  },
  created() {
    //初始化 page=undefined
    //添加回来 page=1
    //添加回来 page=编辑离开时的页码
   if(this.page2) this.page = Number(this.page2)
    this.handlegetstudent()
  },
  methods: {
    ...mapMutations({
        changeAction:'CHANGE_ACTION',
        changeRecord:'CHANGE_RECORD',
        changePage2:'CHANGE_PAGE2'
    }),
    //当子组件触发查询时
    onsubmit(querydata){
      // console.log(query);
      this.querydata = querydata
      this.handlegetstudent()
    },
    //子组件触发重置按钮时
    onreset(){
      this.querydata =''
      this.page=1
      this.handlegetstudent()
    },
    //拉取数据
   async handlegetstudent(){
      let query = {}
      if(this.querydata){
        //有筛选
        query = this.querydata
      }
      query.page =this.page

      let res = await getstudent(query)
      let {code,list,total} =res.data
      if(code===0){
        this.tableData = list
        this.total = total
      }
      if(code===1){
        this.tableData=[]
      }
      this.loading = false
    },
    //页码改变时
    handlechange(page){
      this.page = page
      this.handlegetstudent()
    },

    /* 编辑 */
    handleEdit(index, row) {
      this.changeAction('edit')
      this.changeRecord(row)
      this.changePage2(this.page)
      this.$router.push("/studentadmin/editstudent")
    },
    //当添加学员的时候 JSON.stringify()
    addstudent() {
      this.changeAction('add')
      this.changeRecord({
          gender:0,
          payStatus:0
      })
      this.changePage2(1)
      this.$router.push("/studentadmin/editstudent")
    },

    // 删除
    async handleDelete(index, row) {
      // console.log(index, row);
      //index是所在行的索引 row是所在行的内容 拿到classId传给后端 进行删除操作
      let { stuId } = row;
      let res = await delstudent({
        stuId,
      });
      let { code } = res.data;
      if (code === 0) {
        //如果是最后一条数据 删除的时候 要调到前一页
        if(this.total=== (this.page-1)*4+1){
          this.page = this.page-1
        }
        if(this.total==1){
          this.tableData=[]
          return
        }
        this.handlegetstudent();
        this.$message.success("删除成功");
        
      } else {
        this.$message.error("删除失败");
      }
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
img{
  width: 180px;
  height: 100px;
}
 .but{
  margin-right: 10px !important;
}
</style>