import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      //进入编辑页面时的动作
      action:'add',
      //要回显的数据
      record:{
          gender:0,
          payStatus:0
      },
      //编辑完毕返回列表的页码数
      page2:1,
      navData:[]
  },
  getters: {
   
  },
  mutations: {
    //改变action
    CHANGE_ACTION:(state,action)=>state.action =action,
    //改变record
    CHANGE_RECORD:(state,action)=>state.record =action,
    //改变page
    CHANGE_PAGE2:(state,action)=>state.page2 =action,
    //改变navData
    CHANGE_NAV_DATA:(state,navData)=>state.navData =navData,
  },
  actions: {
   
  },
  modules: {
  }
})
