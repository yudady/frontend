<!--及时反馈-->
<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button type="primary" icon="el-icon-plus" @click="openInsert()">发布</el-button>
      <el-button type="primary" @click="openScoring">计分表</el-button>
    </div>
    <el-table :data="list" border v-loading="loading">
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="发布时间" align="center">
        <template slot-scope="{row}">
          {{ row.createTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="发布内容" prop="publishContent" align="center" />
      <el-table-column label="发布渠道" prop="publishChannel" align="center" />
      <el-table-column label="发布群组" prop="publishGroup" align="center" />
      <el-table-column label="发布人" prop="publishPerson" align="center" />
      <el-table-column label="告知人数" prop="informPersonNum" align="center" />
      <el-table-column label="回复人数" prop="replyPersonNum" align="center" />
      <el-table-column label="统计截止时间" prop="endTime" align="center" />
      <el-table-column label="管理" width="250" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" @click="openInsert(row.id)">修改</el-button>
          <el-button type="primary" @click="openRegister(row.id)">登记</el-button>
          <el-button type="default">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
          @size-change="changeSize"
          @current-change="changeCurrent"
          :current-page="page.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
      </el-pagination>
    </div>
    <!--发布-->
    <dialogInsert :show="showInsert" :id="id" @close="closeInsert" />
    <!--记分表-->
    <dialogScoring :show="showScoring" @close="closeScoring" />
    <!--登记-->
    <dialogRegister :show="showRegister" :id="id" @close="closeRegister" />
  </div>
</template>

<script>
import moment from 'moment'
import dialogInsert from './dialogInsert'
import dialogScoring from './dialogScoring'
import dialogRegister from './dialogRegister'
import API from '../../../api'

export default {
  components: {
    dialogInsert,
    dialogScoring,
    dialogRegister
  },
  data() {
    return {
      showInsert: false,
      showScoring: false,
      showRegister: false,
      page: {},
      list: [],
      id: null,
      loading: false
    }
  },

  created() {
    this.load()
  },

  methods: {
    // 加载列表数据
    load() {
      let obj = this.page
      this.loading = true
      API.immediateFeedback.getListPage(obj).then((res) => {
        this.loading = false
        if (res.status === 'success') {
          if (res.data) {
            this.list = res.data.list
            this.page = {
              total: res.data.total,
              pageSize: res.data.perPage,
              page: res.data.currentPage
            }
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    changeSize(val) {
      this.page.pageSize = val
      this.load()
    },

    changeCurrent(val) {
      this.page.page = val
      this.load()
    },

    // 打开发布弹窗
    openInsert(id) {
      this.showInsert = true
      if (id) {
        this.id = id
      } else {
        this.id = null
      }
    },

    // 关闭发布弹窗
    closeInsert(val) {
      this.showInsert = false
      this.id = null
      if(val === 1){
        this.load()
      }
    },

    // 打开计分表弹窗
    openScoring() {
      this.showScoring = true
    },

    // 关闭计分表弹窗
    closeScoring() {
      this.showScoring = false
    },

    // 打开登记弹窗
    openRegister(id) {
      this.showRegister = true
      this.id = id
    },

    // 关闭登记弹窗
    closeRegister(val) {
      this.showRegister = false
      if (val === 1) {
        this.load()
      }
    }
  }
}
</script>