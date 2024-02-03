<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{action==='add'?'添加学员':'编辑学员'}}</span>
    </div>
    <!-- 表单 -->
    <el-form :model="form" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="班级名称" prop="classId">
        <el-select v-model="form.classId" placeholder="请选择班级">
          <el-option
            v-for="item in list"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">其他</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="缴费状态" prop="payStatus">
        <el-radio-group v-model="form.payStatus">
          <el-radio :label="0">试听</el-radio>
          <el-radio :label="1">欠费</el-radio>
          <el-radio :label="2">已缴费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5000/upload"
          :headers="headers"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="onSave('save')">保存</el-button>
        <el-button type="primary" @click="oncontInupt" v-if="action==='add'">保存后继续录入</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getClassList ,addStudent,editstudent} from "@/api/http";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      form: {
        name: "",
        classId: "",
        gender: 0,
        payStatus: 0,
        imgUrl: "",
      },
      list: [],
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
  },
  created() {
    this.form = this.record
    this.handlegetclasslist();
    // //获取路由跳转的的参数
    // let {action,page,record}= this.$route.params
    // //action 和 record 存在执行下面
    // if(action && record){
    //   this.action = action
    //   this.form = record
    //   //对数据进行持久化存储 以备再刷新的页面的仍然能得到数据
    //   sessionStorage.setItem("action",action)
    //   sessionStorage.setItem("record",JSON.stringify(record))
    // }else{
    //   //可能是刷新页面 此时参数丢失
    //   let action = sessionStorage.getItem("action")
    //   let record = sessionStorage.getItem("record")
    //   if(record && action){
    //     //在sessionStorage 是否存在有该数据
    //     this.action = action
    //     this.form = JSON.parse(record)
    //   }
    // }
    // this.page = page
   
  },
  computed:{
    ...mapState(['action','record'])
    
  },
  methods: {
    //初始化拉取数据
    async handlegetclasslist() {
      let res = await getClassList({
        page: 1,
      });
      let { code, list } = res.data
      if (code == 0) {
        this.list = list
        // console.log(this.list);
      }
    },
    //当添加的时候
   async hanleAdd(type){
        //当有数据有效时 调用后端接口 进行登录验证
                    let res = await addStudent(this.form)
                    let {code} = res.data 
                    if(code===0){
                        this.$message.success("添加成功")
                         this.$emit("close",false,'add')
                         this.$refs["form"].resetFields()
                         this.form.imgUrl = ''
                         this.imageUrl=''
                         if(type=="save"){
                            this.$router.push("/studentAdmin/stuinfo")
                         }
                         
                    }else{
                        this.$message.success("添加失败")
                    }
    },
    //当编辑的时候
   async hanleEdit(){
        //当有数据有效时 调用后端接口 进行登录验证
                    let res = await editstudent(this.form)
                    let {code} = res.data 
                    if(code===0){
                        this.$message.success("编辑成功")
                        this.$router.push(`/studentAdmin/stuinfo?page=${this.page}`)                      
                    }else{
                        this.$message.success("编辑失败")
                    }
    },
    //当保存的时候 三种情况 
    // 1编辑 调编辑接口 并返回学员信息页面
    //  2保存 保存action=add 添加接口 并返回学员信息页面
    //  3保存继续录入 action=add 添加接口 不返回学员信息页面
    onSave(type){
        //type的值不同
         this.$refs['form'].validate(async (valid)=>{
                if(valid){
                    if(this.action==='add') this.hanleAdd(type)
                    if(this.action==='edit') this.hanleEdit()
                }else{
                    //数据无效
                    console.log('err');
                    return false
                }
            })
    },
    //当保存的时候继续录入
    oncontInupt(){
        this.onSave("continput")
    },
    //当取消时
    cancel(){
        this.$router.push("/studentAdmin/stuinfo")
    },
    //图片上传成功后调用
    handleAvatarSuccess(res, file) {
      // 生成图片的地址 临时的
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$set(this.form,"imgUrl",res.url)
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>