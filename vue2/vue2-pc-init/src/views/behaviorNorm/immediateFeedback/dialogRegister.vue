<!--登记功能-->
<template>
  <el-dialog :visible.sync="show" append-to-body width="700px" title="登记" :before-close="close">
    <el-transfer :titles="['待选择', '已选择']" v-model="selectList" :data="list"
                 :props="{key: 'userId', label:'userName'}" />
    <template slot="footer">
      <el-button type="primary" @click="confirm" :loading="buttonLoading">确定</el-button>
      <el-button @click="close">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import API from '../../../api'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },

    id: {
      type: Number
    }
  },

  watch: {
    show(newVal) {
      if (newVal) {
        this.load()
        this.loadUserList()
      }
    }
  },

  data() {
    return {
      list: [],
      selectList: [],
      buttonLoading: false
    }
  },

  methods: {
    // 加载当前ID已登记人员列表
    load() {
      API.immediateFeedback.getInfo({ id: this.id }).then((res) => {
        if (res.status === 'success') {
          this.selectList = res.data.replyPerson && res.data.replyPerson.split(',').map(item=>item - 0)
        } else {
          this.selectList = []
        }
      })
    },

    // 加载所有用户列表
    loadUserList() {
      API.user.getList({}).then((res) => {
        if (res.status === 'success') {
          this.list = res.data
        }
      })
    },

    confirm() {
      let obj = {
        id: this.id,
        replyPerson: this.selectList.join()
      }
      this.buttonLoading = true
      API.immediateFeedback.setEdit(obj).then((res) => {
        if (res.status === 'success') {
          this.$message({
            type: 'success',
            message: '登记成功',
            duration: 1500,
            onClose: () => {
              this.buttonLoading = false
              this.close(1)
            }
          })
        } else {
          this.buttonLoading = false
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    close(val) {
      this.list = []
      this.selectList = []
      this.$emit('close', val)
    }
  }
}
</script>