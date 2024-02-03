import Vue from 'vue'
import VueRouter from 'vue-router'
import asyncRouter from "./asyncRouter"
Vue.use(VueRouter)

//配置路由
const routes = [
  ...asyncRouter,
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404')
  }
]
//解决路由重复报错提示
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
  mode:'history'
  
})

// 假设没登录时，非法进入管理主页面  "/"
// 假设没登录时，进入登录页  "/login"
// 假设登录过，进入管理页  "/"

//路由拦截 权限管理的相关内容
//只检测是否有token 只要有token就能导航对应的路由组件不管token 是否伪造或过期
//所以 在请求后端接口时 还要在携带token 到后端验证token是否有效 有效才能进入
//如果token无效 会返回401 路由前置守卫
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  //path 不带参数的路由 fullpath带路由参数的
  if(to.path ==='/login'){
    next()
  }else{
    if(token){
      next()
    }else{
      next("/login")
    }
  }
})

export default router
