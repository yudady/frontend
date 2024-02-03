<!--发布功能-->
<template>
  <el-dialog :visible.sync="show" :title="title" :before-close="close">
    <el-form v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发布时间">
            <el-date-picker v-model="form.createTime" format="yyyy-MM-dd" value-format="timestamp" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截止时间">
            <el-date-picker v-model="form.endTime" format="yyyy-MM-dd" value-format="timestamp" style="width: 100%"/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="发布内容">
            <el-input type="textarea" v-model="form.publishContent" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布渠道">
            <el-select v-model="form.publishChannel" style="width: 100%">
              <el-option label="微信群" value="微信群" />
              <el-option label="钉钉群" value="钉钉群" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布位置">
            <el-input v-model="form.publishGroup" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布人">
            <el-input v-model="form.publishPerson" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="告知人员">
            <el-select v-model="form.informPerson" multiple style="width: 100%;">
              <el-option v-for="(item, index) in userList" :label="item.userName" :value="item.userId" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submit" :loading="buttonLoading">提交</el-button>
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
      if(newVal){
        if(this.id){
          this.title = '修改'
          this.load()
        }else{
          this.title = '发布'
        }
        this.loadUserList()
      }else{
        this.form = {}
      }
    }
  },
  data(){
    return {
      title: '',
      form: {},
      userList: [],
      loading: false,
      buttonLoading: false
    }
  },

  methods: {
    close(val){
      this.$emit('close', val)
    },

    // 加载默认数据
    load(){
      this.loading = true
      API.immediateFeedback.getInfo({id: this.id}).then((res)=>{
        this.loading = false
        if(res.status === 'success'){
          this.form = res.data
        }else{
          this.form = {}
        }
      })
    },

    // 获取用户列表
    loadUserList(){
      API.user.getList().then((res)=>{
        if(res.status === 'success'){
          this.userList = res.data
        }
      })
    },

    submit(){
      this.buttonLoading = true
      let api = 'setAdd'
      if(this.id){
        this.form.id = this.id
        api = 'setEdit'
      }
      API.immediateFeedback[api](this.form).then((res)=>{
        if(res.status === 'success'){
          this.$message({
            type: 'success',
            message: res.message,
            duration: 1500,
            onClose: ()=>{
              this.buttonLoading = false
              this.close(1)
            }
          })
        }else{
          this.buttonLoading = false
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  }
}
</script>