<template>
  <div class="login">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRules"
      label-width="100px"
      class=""
      status-icon
    >
      <!-- prop="username" 指定username的验证规则 -->
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <!-- prop="password" 指定password的验证规则 -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          prefix-icon="el-icon-key"
        ></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item>
        <el-button type="primary" @click="submitLoginForm('loginFormRef')"
          >提交</el-button
        >
        <el-button @click="resetLoginForm('loginFormRef')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // required: true,@必填项
        // message: '请输入登录名称' @Message组件 提示条 @
        // trigger: 'blur' @标单项 失去焦点时 触发 规则，
        // 验证用户名是否合法
        username: [// 规则名与表单属性名一致,
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [// 规则名与表单属性名一致
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur',
          },
        ],
      },
    };
  },
  //
  methods: {
    // 如果服务器和客户端同源，建议可以使用cookie或者session来保持登录状态
    // 如果客户端和服务器跨域了，建议使用token进行维持登录状态。

    submitLoginForm(ref) {
      // prop 会在一个组件实例创建之前进行验证，实例的  在 default 或 validator 函数中是不可用的。
      // eslint-disable-next-line
      this.$refs[ref].validate(async (valid) => {
        // alert(valid);
        if (!valid) return false;
        const { data: res } = await this.$http.post('login', this.loginForm);
        if (res.meta.status !== 200) { return this.$ui_message.error('登录失败 ！请输入正确的用户名和密码'); }
        // this.$ui_message.success(`登录成功${res.data.token}`);
        this.$ui_message.success('登录成功');
        window.sessionStorage.setItem('token', res.data.token);
        // window.sessionStorage.getItem('token');
        // 2. 通过 编程式导航 跳转到后台主页，路由地址是 /home
        this.$router.push('/home');
      });
    },
    resetLoginForm(ref) {
      this.$refs[ref].resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
  // 垂直剧中
  width: 50%;
  position: absolute; // position: relative / absolute;
  top: 50%; /*top和left偏移各为50%*/
  left: 50%;
  transform: translate(-50%, -50%); // 偏移自身的宽和高的-50%
}
</style>
