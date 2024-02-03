<template>
   <el-dialog
  :title="action==='add'?'添加班级':'编辑班级'"
  :visible= "dialogVisible"
  width="70%"
  :before-close="handleClose"
 >
 <!-- 添加班级列表的表单 -->
     <el-form :model="form" label-width="120px" ref="form">
    <el-form-item label="班级名称"  prop="className">
      <el-input v-model="form.className" autocomplete="off"></el-input>
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
     <el-form-item label="开班日期" prop="startDate">
             <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
     </el-form-item>
      <el-form-item label="开班状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="0">未开班</el-radio>
                <el-radio :label="1">已封班</el-radio>
                <el-radio :label="2">已结课</el-radio>
            </el-radio-group>
     </el-form-item>
  </el-form>
  <!-- 底部按钮 -->
  <span slot="footer" class="dialog-footer">
    <el-button  type="primary" @click="add" v-if="action === 'add'">添加</el-button>
    <el-button  type="primary" @click="edit" v-else>编辑</el-button>
  </span>
</el-dialog>
   
</template>

<script>
import moment from 'moment'
import {addClass,editClass} from '@/api/http'
export default {
    props:{
        dialogVisible:Boolean,
        action:String,
        record:Object
    },
    data() {
        return {
             form: {
            className:'',
            classroom:'',
            headTeacher:'',
            startDate:'',
            status:0,
        }
        };
    },
    //监听record是否有数据 发生改变 有数据传过来的话说明是编辑 就把接收的record赋值给到this.form
    watch:{
      record(){
        this.form = this.record
      }
    },
    methods: {
        add(){
            // this.$emit("update:dialogVisible",false)
            this.$refs['form'].validate(async (valid)=>{
                if(valid){
                    //当有数据有效时 调用后端接口 进行登录验证
                    this.form.startDate = moment(this.form.startDate).format("YYYY-MM-DD")
                    let res = await addClass(this.form)
                    let {code} = res.data 
                    if(code===0){
                        this.$message.success("添加成功")
                         this.$emit("close",false,'add')
                         this.$refs["form"].resetFields()
                    }else{
                        this.$message.success("添加失败")
                    }
                }else{
                    //数据无效
                    console.log('err');
                    return false
                }
            })
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.$emit("close",false)
          })
          .catch(_ => {});
      },
      // 编辑班级
      edit(){
        this.$refs['form'].validate(async (valid)=>{
                if(valid){
                    //当有数据有效时 调用后端接口 进行登录验证
                    this.form.startDate = moment(this.form.startDate).format("YYYY-MM-DD")
                    let res = await editClass(this.form)
                    let {code} = res.data 
                    if(code===0){
                        this.$message.success("编辑成功")
                         this.$emit("close",false,'edit')
                         this.$refs["form"].resetFields()
                    }else{
                        this.$message.success("编辑失败")
                    }
                }else{
                    //数据无效
                    console.log('err');
                    return false
                }
            })
      }
    },
}
</script>

<style >

</style>