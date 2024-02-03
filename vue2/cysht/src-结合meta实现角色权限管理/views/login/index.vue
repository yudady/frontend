<template>
  <div class="login">
      <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm form"
      >

        <!-- 账号 -->
        <el-form-item prop="account">
        <el-input
          type="text"
          v-model="ruleForm.account"
          placeholder="请输入账号"
          prefix-icon="el-icon-user-solid"
          autocomplete="off"
        ></el-input>
      </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="pw">
        <el-input
          type="password"
          v-model="ruleForm.pw"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          autocomplete="off"
        ></el-input>
      </el-form-item>

        <!-- 提交按钮 -->
       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {login} from '@/api/http'
export default {
    name:'login',
    data() {
      return {
       ruleForm: {
        account:'admin',
        pw:'123456',
       },
       rules:{
          account:[
            {required:true,message:'不能为空',trigger:'blur'},
            {pattern:/^\w{3,5}$/,message:'必须是3-5位的纯数字',trigger:'blur'}
          ],
          pw:[
            {required:true,message:'不能为空',trigger:'blur'},
            {pattern:/^\d{3,6}$/,message:'必须是3-6位的纯数字',trigger:'blur'}
          ],
         
       }
      };
    },
     methods: {
    submitForm(formName) {
       /* 
        	对整个表单进行校验的方法，参数为一个回调函数。
          该回调函数会在校验结束后被调用，并传入两个参数：
          是否校验成功和未通过校验的字段。若不传入回调函数，
          则会返回一个 promise
        */
      //  验证结果
      //  console.log(valid);
       //不符合验证的
      //  console.log(fields);
      this.$refs[formName].validate(async (valid,fields) => {
        if (valid) {
          try{
              //验证成功都通过就可以提交 后端验证
              let res = await login(this.ruleForm)
              let {code,token,role} = res.data
              if(code===0){
                //登录成功 存token 和 登录用户的身份
                sessionStorage.setItem('token',token)
                sessionStorage.setItem('role',role)
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration:1000
                });
                // console.log(role);
                //登录讨论
                //第一次登录
                //退出登录后在登录 回到退出的页面
                // 1. 首次登录，没有参数redirectUrl,  登录成功后进入首页
                // 2. 退出登录后再次登录，有参数redirectUrl,登录成功后进入上一次退出登录的那个路由
                let { redirectUrl } = this.$route.query;
                if (redirectUrl) {
                  this.$router.replace(redirectUrl);
                } else {
                  this.$router.replace("/");
                }
                
              }else{
                //登陆失败
              this.$message({
                  message: '登录失败',
                  type: 'error',
                  duration:1000
                });
              this.$refs[formName].resetFields();
              
              }
          }catch(err){
              console.log(err);
          }
        } else {
          // console.log("error submit!!");
          return false;

        }
      });
    },
    
  },
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  position: relative;
  .form{
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>