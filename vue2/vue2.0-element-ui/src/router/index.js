import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
const Header = resolve => require(['@/components/header'], resolve)
const Footer = resolve => require(['@/components/footer'], resolve)
const Nav = resolve => require(['@/components/nav'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Hello
    }
  ]
})
