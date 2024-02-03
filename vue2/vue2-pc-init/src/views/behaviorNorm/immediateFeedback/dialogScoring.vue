<!--计分表功能-->
<template>
  <el-dialog :visible.sync="show" append-to-body title="计分表" :before-close="close">
    <el-table :data="list" border>
      <el-table-column label="序号"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="及时响应分数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="default" @click="openDetail">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialogScoringDetail :show="showDetail" @close="closeDetail" />
  </el-dialog>
</template>

<script>
import dialogScoringDetail from './dialogScoringDetail'
export default {
  components: {
    dialogScoringDetail
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      showDetail: false,
      list: [{}]
    }
  },

  methods: {
    close(){
      this.form = {}
      this.$emit('close', false)
    },

    closeDetail(){
      this.showDetail = false
    },

    // 打开详情弹窗
    openDetail(){
      this.showDetail = true
    }
  }
}
</script>