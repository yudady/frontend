<template>
  <div>
     <h1>
      excel的导出
        <download-excel
      class="export-btn"
      :data="tableData"
      :fields="jsonFields"
      type="xlsx"
      header="患者列表"
      name="患者列表.xlsx"
    >
      <el-button type="success">把json导出为excel表格</el-button>
    </download-excel>
     </h1>
  </div>
</template>

<script>
import JsonExcel from "vue-json-excel";
export default {
components: {
    DownloadExcel: JsonExcel,
},
data(){
       return{
          jsonFields: {  //导出Excel表格的表头设置
              '序号': 'type',
              '姓名': 'userName',
              '年龄': 'age',
              '手机号': 'phone',
              '注册时间': 'createTime',
          },
          //表格数据
          tableData:[
            {"userName":"张三","age":18,"phone":15612345612,"createTime":"2019-10-22"},
            {"userName":"李四","age":17,"phone":15612345613,"createTime":"2019-10-23"},
            {"userName":"王五","age":19,"phone":15612345615,"createTime":"2019-10-25"},
            {"userName":"赵六","age":18,"phone":15612345618,"createTime":"2019-10-15"}     
          ]
       }
    }
}
</script>

<style>

</style>