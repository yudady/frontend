<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>班级管理</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="handleAdd"
        >添加班级</el-button
      >
    </div>
    <!-- 筛选内容 -->
    <sel-class @on-submit="onsubmit" @on-reset="onreset"></sel-class>
     <el-divider></el-divider>
    <!-- 显示表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="className" label="班级名称"> </el-table-column>
      <el-table-column prop="classroom" label="教室"> </el-table-column>
      <el-table-column prop="headTeacher" label="班主任"> </el-table-column>
      <el-table-column prop="startDate" label="开班日期" width="180">
        <template slot-scope="scope">
          {{ scope.row.startDate }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="开班状态"> 
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0">未开班</el-tag>
          <el-tag type="success" v-if="scope.row.status===1">已封班</el-tag>
          <el-tag type="warning" v-if="scope.row.status===2">已结课</el-tag>
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
    <!-- 添加班级 -->
    <edit-class
      @close="handleClose"
      :dialog-visible="dialogVisible"
      :action="action"
      :record="record"
    ></edit-class>
  </el-card>
</template>

<script>
import EditClass from "./EditClass.vue";
import { getClassList, delClass } from "@/api/http";
// 处理时间的格式
import moment from "moment";
// 函数集
import _ from "lodash";
import SelClass from "./selClass.vue";
export default {
  components: { EditClass, SelClass },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      action: "",
      record: {},
      page: 1,
    };
  },
  created() {
    this.handleClassList();
  },
  methods: {
    //当子组件触发查询时
    onsubmit(querydata){
      // console.log(query);
      this.querydata = querydata
      this.handleClassList()
    },
    //子组件触发重置按钮时
    onreset(){
      this.querydata =''
      this.page=1
      this.handleClassList()
    },
    //拉取数据
    async handleClassList() {
      //区分不同情况下的传递不同的参数
      let query = {}
      if(this.querydata){
        //有筛选
        query = this.querydata
      }
      query.page =this.page
      
      let res = await getClassList(query);
      let { code, list, total } = res.data;
      if (code === 0) {
        // 日期格式化一
        list.forEach(item=> {
          item.startDate = moment(item.startDate).format("YYYY-MM-DD")
        });
        this.tableData = list;
        this.total = total;
      }
      if(code===1){
        //没有数据
        this.tableData =[]
        return 
      }
    },
    handleClose(status, type) {
      this.dialogVisible = status;
      if (type === "add") {
        //添加成功后
        this.page = 1;
        this.querydata=''
        this.handleClassList();
      }
      if (type === "edit") {
        this.handleClassList();
      }
    },
    handlechange(page) {
      this.page = page;
      this.handleClassList();
    },
    /* 编辑 */
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.action = "edit";
      //深拷贝
      this.record = _.cloneDeep(row);
    },
    // 删除
    async handleDelete(index, row) {
      // console.log(index, row);
      //index是所在行的索引 row是所在行的内容 拿到classId传给后端 进行删除操作
      let { classId } = row;
      let res = await delClass({
        classId,
      });
      // console.log(res);
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
        this.handleClassList();
        this.$message.success("删除成功");
        
      } else {
        this.$message.success("删除失败");
      }
    },
    // 添加
    handleAdd() {
      this.dialogVisible = true;
      this.action = "add";
      this.record = {};
    },
  },
};
</script>

<style scoped lang="scss">
 .but{
  margin-right: 10px !important;
}
</style>