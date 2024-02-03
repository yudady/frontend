<template>
  <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
  <el-form-item label="学员姓名" prop="name">
    <el-input v-model="form.name" placeholder="学员姓名"></el-input>
  </el-form-item>
      <el-form-item label="缴费状态" prop="payStatus" >
              <el-radio-group v-model="form.payStatus">
                <el-radio :label="0">试听</el-radio>
                <el-radio :label="1">欠费</el-radio>
                <el-radio :label="2">已缴费</el-radio>
            </el-radio-group>
     </el-form-item>
  <el-form-item class="padding">
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button type="primary" @click="onreset">重置</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
import { getClassList} from "@/api/http";
import moment from 'moment'
export default {
     data() {
      return {
        form:{
            name: "",
            payStatus: "",
          }
      }
    },
    methods: {
        onSubmit(){
         
         this.$refs["form"].validate(async (valid) => {
        if (valid) {
          //当数据都有效时，调用后端接口，进行登录验证
          //发送到父组件
          this.$emit('on-submit', this.form);
        } else {
          // 数据无效
          //当有字段数据无效时，阻止提交
          console.log("error submit!!");
          return false;
        }
      });
      },
      onreset(){
        this.$refs["form"].resetFields();
        this.$emit("on-reset")
      }
    }
}
</script>

<style lang="scss" scoped>
.padding{
  padding-left: 20px;
}
.el-form-item{
  margin-right: 100px !important;
}
</style>