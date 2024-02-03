<template>
  <div class="home">
    <!-- 卡片 -->
   <card-list :card-list ="cardList"></card-list>
   <!-- 图表 -->
  <charts></charts>
  </div>
</template>

<script>
import {homeData} from '@/api/http'
import CardList from './CardList.vue'
import Charts from './Charts.vue'

export default {
  components: { CardList, Charts },
  
    Chartsname:'dashbord',
  created() {
    this.getHomeData()
  },
  data() {
    return {
      cardList: [],
    };
  },
  methods: {
   async getHomeData(){
      let res = await homeData()
      // console.log(res);
      let {code,list} =res.data
      if(code===0){
        this.cardList = list
      }
    }
  },
}
</script>

<style>

</style>