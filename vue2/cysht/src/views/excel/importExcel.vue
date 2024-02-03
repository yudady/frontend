<template>
  <div class="excel">
    <h1>excel的导入</h1>
    <!-- limit=1 代表一次上传一个文件 -->
    <el-upload action="" :auto-upload="false" :on-change="onChange" :limit="1">
      <el-button size="mini" type="success">上传文件</el-button>
    </el-upload>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-if="tableData.length">
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="score" label="分数"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import xlsx from "xlsx";
import { readFile } from "@/utils/readFile";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async onChange(file) {
        // 获取上传excel的文件数据
        let dataBinary = await readFile(file.raw);
        // 获取工作簿对象
        let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
        // 获取第一个工作表的数据
        let workSheet = workBook.Sheets[workBook.SheetNames[0]];
        // 把工作表数据转为json
        const data = xlsx.utils.sheet_to_json(workSheet);
        // console.log('data',data);
        //把json传给tableData
        this.tableData = data;
      },
  },
};
</script>

<style>
</style>