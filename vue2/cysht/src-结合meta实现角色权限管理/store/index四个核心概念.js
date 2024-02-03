import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notice: '今天我们上网课',
    city: '郑州',
    classroom: [],
    score: [45,67,89,68,90,36]
  },
  getters: {
    badScore(state){
      return state.score.filter(item=>item < 70)
    }
  },
  mutations: {
    changeCity(state, payload) {
      // state指仓库中的state
      state.city = payload
    },
    // CHANGE_NOTICE(state,notice){
    //   state.notice = notice
    // },
    // changeNotice: (state, notice) => state.notice = notice,
    CHANGE_NOTICE: (state, notice) => state.notice = notice,
    GET_CLASSROOM_LIST: (state,data)=>state.classroom = data
  },
  actions: {
    // change(ctx, payload) {
    //   // ctx表示store的上下文， payload载荷，指的就是传参
    //   // console.log('action',ctx,payload);
    //   ctx.commit("change1", payload)
    // },
    changeCity(ctx, payload) {
      // ctx表示store的上下文， payload载荷，指的就是传参
      // console.log('action',ctx,payload);
      ctx.commit("changeCity", payload)
    },
    // changeNotice(ctx){
    //   ctx.commit("CHANGE_NOTICE",'新的公告')
    // },
    changeNotice: ({ commit }) => {
      commit("CHANGE_NOTICE", '新的公告')
    },
    getClassroomList({commit}) {
       setTimeout(()=>{
         let list = ['嵖岈山','嵩山']
         commit("GET_CLASSROOM_LIST",list)
       },1000)
    }
  },
  modules: {
  }
})
