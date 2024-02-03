import Vue from 'vue'
import App from './App.vue'
import {Button,Radio,Container,Main,Header,Aside,Menu,MenuItem,MenuItemGroup,
  Submenu,Dropdown,DropdownItem,DropdownMenu,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,
  Tag,Form,FormItem,Input,Select,Switch,DatePicker,Option,Dialog,Pagination,Message,MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/less/index.less'
import store from './store'
import http from 'axios'
import './api/mock'

Vue.prototype.$message=Message
Vue.prototype.$messagebox=MessageBox

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)

Vue.use(Dialog)

Vue.use(Pagination)

Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)

Vue.use(Form)
Vue.use(FormItem)

Vue.use(Tag)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)


Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$http=http

//路由监听
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token=store.state.user.token
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token&&to.name==='login'){
    next({name:''})
  }
  else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
