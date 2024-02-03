// npm i vue@2.6.11 -S
import Vue from 'vue';
// npm i element-ui@2.4.5 -S
import 'element-ui/lib/theme-chalk/index.css';
// npm i nprogress@0.2.0 -S
import NProgress from 'nprogress';
// npm i nprogress@0.2.0 -S
import 'nprogress/nprogress.css';
// npm i axios@0.21.0 -S
import axios from 'axios';
//
import router from '@/router';
import App from '@/App.vue';
import '@/plugins/element';
import '@/assets/css/global.css';
import '@/assets/fonts/iconfont.css';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

// 如果服务器和客户端同源，建议可以使用cookie或者session来保持登录状态
// 如果客户端和服务器跨域了，建议使用token进行维持登录状态。

// axios处理请求体，当请求体符合规范时，程序才能继续。
// （在请求头headers中使用 `Authorization` 字段提供 `token` 令牌）
axios.interceptors.request.use((reqObj) => {
  NProgress.start();
  // eslint-disable-next-line
  reqObj.headers.Authorization = window.sessionStorage.getItem('token');
  // window.sessionStorage.setItem('token', res.data.token);
  return reqObj;// 在最后必须 return reqObj
});

// 隐藏进度条 NProgress.done()
axios.interceptors.response.use((resObj) => {
  NProgress.done();
  return resObj;
});

// 把配置好的 axios 挂载到 VUE的原型对象上，
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

const option = {
  data: { a: 1 },
  beforeCreate() {
    // console.log('beforeCreate,data和mathods还未初始化');
  },
  created() {
    // console.log('created,data和mathods初始化完成，如果要操作data或调用mathods，最早只能在这里');
    // console.log(router);
  },
  beforeMount() {
    // console.log('beforeMount，模板在 内存中编译完成，尚未渲染到页面');
    // console.log(router);
  },
  mounted() {
    // console.log('mounted，vue实例初始化完毕，组件进入运行阶段，这时还可以操作DOM节点');
    // console.log(router);
  },
  beforeUpdate() {
    // console.log('组件生命周期函数 beforeUpdate，页面是旧的，data是新的');
  },
  updated() {
    // console.log('组件生命周期函数 updated，页面和data已经保持同步');
  },
  beforeDestroy() {
    // console.log('7，data,methods,过滤器,指令...都还可用');
  },
  destroyed() {
    // console.log('8，data,methods,过滤器,指令...不可用');
  },
};

new Vue({
  ...option,
  router,
  render: (h) => h(App),
}).$mount('#app');
