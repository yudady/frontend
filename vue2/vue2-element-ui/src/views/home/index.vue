<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userimg" style="width: 100px" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-7-19</span></p>
          <p>上次登录地点:<span>温州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, index) in tableLabel"
            :key="index"
            :prop="index"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="flex">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
          <!-- <div style="height:280px" ref="echarts"></div> -->
          <echart :chartData="echartData.order" style="height:280px"/>
      </el-card>
      <div class="graph">
          <el-card style="width:48%;height:230px;">
              <!-- <div style="height:210px" ref="userecharts"></div> -->
              <echart :chartData="echartData.user" style="height:210px"/>
          </el-card>
          <el-card style="width:48%;height:230px;">
              <!-- <div style="height:210px" ref="videoecharts"></div> -->
              <echart :chartData="echartData.video" :isAxisChart="false" style="height:210px"/>
          </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../../api/data'
//import * as echarts from 'echarts'
import Echart from '../../components/Echarts.vue'
export default {
  name: "home",
  data() {
    return {
      userimg: require("../../assets/img/photo2.jpg"),
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        mouthBuy: "本月购买",
        totalBuy: "总购买",
      },
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb9c9",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData:{
          order:{
              xData:[],
              series:[]
          },
          user:{
              xData:[],
              series:[]
          },
          video:{
              series:[]
          }
      }
    }
  },
  components:{
      Echart
  },
  mounted () {
      getData().then(res=>{
          const { code,data }=res.data
          if(code===20000){
              this.tableData=data.tableData
              const order=data.orderData
              const xData=order.date
              const keyArray=Object.keys(order.data[0])
              const series=[]
              keyArray.forEach(key => {
                  series.push({
                      name:key,
                      data:order.data.map(item=>item[key]),
                      type:'line'
                  })
              });
              /* const option={
                  xAxis:{
                      data:xData
                  },
                  yAxis:{},
                  legend:{
                      data:keyArray
                  },
                  series
              } */
              this.echartData.order.xData=xData
              this.echartData.order.series=series
              //const E=echarts.init(this.$refs.echarts)
              //E.setOption(option)

              //用户图
              /* const useroption={
                  xAxis:{
                      type:'category',
                      data:data.userData.map(item=>item.date),
                      axisLine:{
                          lineStyle:{
                              color:'#17b3a3'
                          }
                      },
                      axisLabel:{
                          interval:0,
                          color:'#333'
                      }
                  },
                  yAxis:[
                      {
                          type:'value',
                          axisLine:{
                              lineStyle:{
                                  color:'#17b3a3'
                              }
                          }
                      }
                  ],
                  color:['#2ec7c9','#b6a2de'],
                  legend:{
                      textStyle:{
                          color:'#333'
                      }
                  },
                  grid:{
                      left:'20%'
                  },
                  tooltip:{
                      trigger:'axis',
                  },
                  series:[
                      {
                          name:'新增用户',
                          data:data.userData.map(item=>item.new),
                          type:'bar'
                      },
                      {
                          name:'活跃用户',
                          data:data.userData.map(item=>item.active),
                          type:'bar'
                      }
                  ]
              } */
              this.echartData.user.xData=data.userData.map(item=>item.date)
              this.echartData.user.series=[
                      {
                          name:'新增用户',
                          data:data.userData.map(item=>item.new),
                          type:'bar'
                      },
                      {
                          name:'活跃用户',
                          data:data.userData.map(item=>item.active),
                          type:'bar'
                      }
                  ]
              //const User=echarts.init(this.$refs.userecharts)
              //User.setOption(useroption)

              //饼图
              /* const viedooption={
                  color:['#0f78f4','#dd536b','#9462e5','#a6a6a6','#e1bb22','#39c362','#3ed1cf'],
                  tooltip:{
                      trigger:'item',
                  },
                  series:[
                      {
                          data:data.videoData,
                          type:'pie'
                      },
                  ]
              } */
              this.echartData.video.series=[
                      {
                          data:data.videoData,
                          type:'pie'
                      },
                  ]
              //const video=echarts.init(this.$refs.videoecharts)
              //video.setOption(viedooption)
          }
          console.log(res)
      })
  }
};
</script>

<style scoped lang='less'>
.user {
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
  padding-bottom: 20px;
  img {
    width: 100px;
  }
  .userinfo {
    margin-left: 30px;
    font-family: Arial, Helvetica, sans-serif;
    p {
      margin-bottom: 5px;
    }
    .name {
      font-size: 24px;
      color: #000;
    }
    .access {
      font-size: 12px;
      color: #555;
    }
  }
}
.login-info {
  font-size: 12px;
  margin-top: 10px;
  p {
    margin-bottom: 5px;
    span {
      margin-left: 50px;
    }
  }
}
.icon {
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 24px;
}
.flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  .el-card {
    width: 30%;
    margin-bottom: 20px;
  }
}
.detail {
  padding-left: 10px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .num {
    font-size: 24px;
    color: #000;
  }
  .txt {
    font-size: 12px;
    color: #bfbfbf;
  }
}
.graph{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
}
</style>