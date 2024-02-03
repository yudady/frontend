<!--用户计分详情功能-->
<template>
  <el-dialog :visible.sync="show" append-to-body title="用户计分详情" :before-close="close">
    <el-table :data="list" border>
      <el-table-column label="序号"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="及时响应分数"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      list: []
    }
  },

  methods: {
    close(){
      this.form = {}
      this.$emit('close', false)
    }
  }
}
</script>