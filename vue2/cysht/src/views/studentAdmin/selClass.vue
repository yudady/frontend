<template>
  <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
  <el-form-item label="班级名称" prop="className">
    <el-input v-model="form.className" placeholder="班级名称"></el-input>
  </el-form-item>
 <el-form-item label="教室" prop="classroom">
      <el-select v-model="form.classroom" placeholder="请选择教室">
        <el-option label="嵖岈山" value="嵖岈山"></el-option>
        <el-option label="桐柏山" value="桐柏山"></el-option>
        <el-option label="鄱阳湖" value="鄱阳湖"></el-option>
        <el-option label="洞庭湖" value="洞庭湖"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班主任" prop="headTeacher">
      <el-select   v-model="form.headTeacher" placeholder="请选择班主任" >
        <el-option label="王趁红" value="王趁红"></el-option>
        <el-option label="何爽" value="何爽"></el-option>
        <el-option label="詹姆斯" value="詹姆斯"></el-option>
        <el-option label="杜兰特" value="杜兰特"></el-option>
      </el-select>
    </el-form-item>
    <br>
  <el-form-item label="开班日期" prop="startDate">
             <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
     </el-form-item>
      <el-form-item label="开班状态" prop="status" >
              <el-radio-group v-model="form.status">
                <el-radio :label="0">未开班</el-radio>
                <el-radio :label="1">已封班</el-radio>
                <el-radio :label="2">已结课</el-radio>
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
        form: {
            className:'',
            classroom:'',
            headTeacher:'',
            startDate:'',
            status:'',
        }
      }
    },
    methods: {
        onSubmit(){
         this.$refs["form"].validate(async (valid) => {
        if (valid) {
          //当数据都有效时，调用后端接口，进行登录验证
          if(this.form.startDate){
            this.form.startDate = moment(this.form.startDate).format(
            "YYYY-MM-DD"
          );
          }
          // let res = await getClassList(this.form);
          //   console.log(res);
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