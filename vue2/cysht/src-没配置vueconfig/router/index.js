import Vue from 'vue'
import VueRouter from 'vue-router'
import constRouter from "./constRouter"
import store from '@/store'
Vue.use(VueRouter)

//配置路由
const routes = [
  ...constRouter,
]
//解决路由重复报错提示
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//解决重新登录时，路由重复定义的报错
const createRouter = () => new VueRouter({
  routes,
  mode:'history'
})

const router = createRouter()

//在重新登录时，重置路由对象
function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

 //根据异步请求的数据动态生成路由 
export function asyncRouter(navData){
  resetRouter()  //重置路由
  navData.forEach(item=>{
    /* 
    let routerItem={
      path:'/',
      name="layout",
      meta:{
        title:'首页',
        icon:'el-icon-menu',
        level:1
      },
      redirect:"/dashboard",
      component = ()=> import('@/views/layout'),
      children:[
        {
          path:'dashboard',
          component:()=> import("@/views/dashboard")
          name:'dashboard'
        }
      ]
    }
    */
   //处理一级路由
    let routerItem ={}
    let {path,name,title,icon,children,level} = item
    routerItem.path = '/' +path 
    routerItem.name = name 
    routerItem.component = ()=> import('@/views/layout')
    routerItem.meta = {
      title,
      icon,
      level
    }
    //首页的处理 需要重定向
    if(path==''){
      routerItem.redirect = '/' +children[0].path
    }
    if(children.length===1){
      let {path,name,url} = children[0]
      //处理首页的路径
      let parentUrl = item.path? '/' +item.path :''
      routerItem.children =[
        {
          path,
          component:()=>import("@/views"+ parentUrl+ '/' + url),
          name
        }
      ]
    }else{
      //多级路由 有两个以上的嵌套路由 需要遍历children
      routerItem.children = []
      children.forEach(secondRouter=>{
          let {path,name,url,title,icon} = secondRouter
          routerItem.children.push({
            name,
            path,
            component:()=> import("@/views/" + item.path +'/' +url),
            meta:{
              title,
              icon
            }
          })
      })
    }
    //动态添加到我们的路由
    router.addRoute(routerItem)
  }),//foreach结束的位置
  router.addRoute(
    {
      path: '*',
      name: '404',
      component: () => import('../views/404')
    } 
  )
}


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
      //改动以下代码
    //******************************************************
      // 有token进入有两种情况：
      // 1. 正常跳转，vuex中始终有navData数据
      // 2. 刷新进入，vuex中没有navData数据
      let navData = store.state.navData;
      if (navData.length === 0){  //如果长度为0,则是刷新
        // 从sessionStorage中拿navData数据
        navData = JSON.parse(sessionStorage.getItem("navData"))
        store.commit("CHANGE_NAV_DATA",navData);
        asyncRouter(navData);
        // 参考4.3.4解释
        next({...to,replace: true});
      }else{
        next()
      }
    //**********************************************************
    }else{
      next("/login")
    }
  }
})

export default router
