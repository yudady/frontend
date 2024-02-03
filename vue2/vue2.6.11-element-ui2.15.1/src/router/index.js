import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '@/views/Home.vue';

const User = {
  template: `
    <div class="user">
      <h2>{{ $route.params.id }} 一级路由</h2>
      <router-view></router-view>
    </div>
  `,
};

const Default = { template: '<p>{{ $route.params.id }} Default </p>' };
const ViewOne = { template: '<p>{{ $route.params.id }} ViewOne </p>' };
const ViewTow = { template: '<p> {{ $route.params.id }} ViewTow </p>' };

const UserSettings = {
  template: `
  <div>
    <div>设置</div> 
    <NavBar/> 
    <router-view name="default" /> 
    <router-view name="a"/>
    <router-view name="b"/>
  </div> 
  `,
};
const UserEmails = { template: '<p> {{ $route.params.id }} 邮件 </p>' };

const UserProfile = { template: '<p>{{ $route.params.id }} tow1   二级路由 </p>' };
const UserPosts = { template: '<p> {{ $route.params.id }} tow1 二级路由 </p>' };
const UserHome = {
  template: '<p>{{ $route.params.id }} 当二级路由 /user/123/xxx 中的xxx为 ‘null’时，显示我</p>',
};

// 使用 props 将组件和路由解耦,这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。
// 如果 props 被设置为 true，route.params 将会被设置为组件属性。
const LowDependency = { template: '<div>LowDependency {{ $route.params.id }}</div>' };
const LowDependencyS = { props: ['id'], template: '<div>User {{ id }}</div>' };

const NotFound = { template: '<h1>404 Not found </h1>' };

const routes = [

  // 使用 props 将组件和路由解耦,
  // 这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。
  // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
  { path: '/low-dependency/:id', component: LowDependency },
  { path: '/low-dependency-s/:id', component: LowDependencyS, props: true },

  // “重定向”的意思是，当用户访问 /a时，URL 将会被替换成 /b
  // { path: '/', redirect: '/login' },
  // { path: '/', redirect: { name: 'login' }} //重定向的目标也可以是一个 命名的路由

  // 别名 ,“别名”的功能,不受限于 配置的路由结构。http://localhost:8080/bbb ===http://localhost:8080/user/123/xxx
  { alias: '/bbb', path: '/user/123/xxx', component: UserEmails },

  // 命名视图 : 一个路由渲染 多个组件
  {
    // 同个路由，多个视图 components 配置 (带上 s)：
    path: '/',
    components: {
      default: Default,
      a: ViewOne,
      b: ViewTow,
      // App.vue:
      // <router-view class="view derault" />
      // <router-view class="view one" name="a" />
      // <router-view class="view two" name="b" />
    },
    // 通过 props 解耦
    props: { default: true, a: false, b: false },
  },

  // 嵌套命名视图
  {
    path: '/settings',
    // 嵌套命名视图
    // url为 /settings 时 ，显示 UserSettings组件，
    // url为 /settings/one 时 ，显示 UserSettings组件 和 UserEmails组件
    // url为 /settings/tow 时 ，显示 UserSettings组件 和 Default,ViewOne,ViewTow组件
    component: UserSettings,
    children: [
      {
        path: 'one', // url: /settings/one
        component: UserEmails,
      },
      // 命名视图 : 一个路由渲染 多个组件
      {
        path: 'tow', // url: /settings/tow
        components: {
          default: Default,
          a: ViewOne,
          b: ViewTow,
        },
        // 通过 props 解耦
        // props: { default: true, a: false, b: false },
      }],
  },

  // home-about
  {
    path: '/home', // component: Home,
    component: () => import(/* webpackChunkName: "1" */ '@/views/Home.vue'),
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "1" */ '@/views/About.vue'),
  },

  // login-register-helloworld
  {
    path: '/login',
    // component: () => import(/* webpackChunkName: "2" */ '@/components/Login.vue'),
    component: () => import(/* webpackChunkName: "2" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    // component: () => import(/* webpackChunkName: "2" */ '@/components/Register.vue'),
    component: () => import(/* webpackChunkName: "2" */ '@/views/Register.vue'),
  },
  {
    path: '/helloworld',
    // component: () => import(/* webpackChunkName: "2" */ '@/components/HelloWorld.vue'),
    component: () => import(/* webpackChunkName: "2" */ '@/views/HelloWorld.vue'),
  },

  // 子路由
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配成功，j即：二级路由 /user/123/xxx 中的xxx为 ‘null’时，显示 UserHome组件。
      // UserHome 会被渲染在 User 的 <router-view> 中
      {
        path: '',
        component: UserHome,
      },
      {
        // 当 /user/:id/tow1 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'tow1',
        component: UserProfile,
      },
      {
        // 当 /user/:id/tow2 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'tow2',
        component: UserPosts,
      },
    ],
  },

  // 404 Not found
  {
    path: '*',
    component: NotFound,
  },

  //
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  // vue-router 默认 hash 模式 —— 当 URL 改变时，页面不会重新加载。
  // /#/ 如果不想要很丑的 hash，我们可以用路由的 history 模式,
  // history 模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
  // 你也许注意到 router.push、 router.replace 和 router.go
  // 跟 window.history.pushState、 window.history.replaceState 和 window.history.go好像，
  // 实际上它们确实是效仿 window.history API 的。
  mode: 'history',

  base: process.env.BASE_URL,

  //
  // 对于非/home的 路由导航，简单地让页面滚动到{ x: 0, y: 30 }。
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/home') {
      return { x: 0, y: 60 };
    }
    return { x: 0, y: 30 };
  },
  //
});

// 如果用户没有登录，不能访问/home,如果用户通过url地址直接访问，则强制跳转到登录页面
// eslint-disable-next-line
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next('/login') 强制跳转
  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  // console.log(tokenStr)
  if (!tokenStr) return next('/login');
  next();
});

export default router;
