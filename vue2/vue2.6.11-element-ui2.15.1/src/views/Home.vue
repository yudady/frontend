<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div>
      <el-button type="info" @click="logout"> 退出 </el-button>
    </div>
    <!--  -->
    <Tab prop1="tab-compoments" />
    <!--  -->
    <HelloWorld
      prop0="Welcome-compoments"
      prop1=" prop1"
      prop2=" prop2"
      :prop3="obj"
      no-prop="Attribute"
      fatherAttribute="fatherAttribute"
      class="father-hello-world"
    />
    <Login prop1="login-compoments" />
    <Register prop2="Register-compoments" />
  </div>
</template>

<script>
// @ is an alias to /src
import Tab from '@/components/Tab.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

export default {
  name: 'Home',
  components: {
    Tab,
    HelloWorld,
    Login,
    Register,
  },
  data() {
    return {
      obj: {
        title: '标题',
      },
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
  },
  //
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
