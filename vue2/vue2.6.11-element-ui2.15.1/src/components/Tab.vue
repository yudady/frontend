<template >
  <div class="compontnts-tab" clic>
    <h1>{{ prop1 }}</h1>
    <!--  -->
    <div class="tab">
      <ul>
        <li
          v-on:click="changeTab(index)"
          :class="currentIndex == index ? 'active' : ''"
          :key="item.id"
          v-for="(item, index) in list"
        >
          {{ item.title }}
        </li>
      </ul>
      <div
        :class="currentIndex === index ? 'current' : ''"
        :key="item.id"
        v-for="(item, index) in list"
      >
        <img :src="item.path" />
        <!-- <img src=../../public/img/apple.png /> -->
        <!-- <img src=../../public/img/lemon.png /> -->
        <!-- <img src=../../public/img/apple.png /> -->
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    prop1: String,
  },
  data() {
    return {
      currentIndex: 0, // 选项卡当前的索引
      list: [{
        id: 1,
        title: 'apple',
        // src: '../public/img/apple.png',
        path: 'http://localhost:8080/img/apple.png',
      }, {
        id: 2,
        title: 'orange',
        path: 'http://localhost:8080/img/lemon.png',
      }, {
        id: 3,
        title: 'lemon',
        path: 'http://localhost:8080/img/apple.png',
      }],
    };
  },
  methods: {
    changeTab(index) {
      // 通过传入过来的索引来让当前的  currentIndex  和点击的index 值 相等
      //  从而实现 控制类名
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.compontnts-tab {
  margin-top: 100px;
}
.tab {
  // width: 50%;
  // position: absolute; // position: relative / absolute;
  // top: 50%; /*top和left偏移各为50%*/
  // left: 50%;
  // transform: translate(-50%, -50%); // 偏移自身的宽和高的-50%
  margin-left: 50%;
  transform: translateX(-50%);
  border: 1px solid red;
  // margin: 10px;
  padding: 10px;
}
.tab ul {
  overflow: hidden;
  border: 1px solid red;
  padding: 10px;
  margin: 10px;
}
.tab ul li {
  // box-sizing: border-box;
  padding: 0;

  float: left;
  list-style: none;

  width: 100px;

  height: 45px;
  line-height: 45px;
  text-align: center;

  // border-top: 1px solid blue;
  // border-right: 1px solid blue;
  cursor: pointer;
}
// .tab ul li:first-child {
//   border-left: 1px solid blue;
// }

.tab ul li.active {
  background-color: orange;
}
.tab div.current {
  display: block;
}
.tab div {
  margin-left: 50%;
  transform: translateX(-50%);

  width: 80%;

  height: 300px;
  line-height: 300px;
  text-align: center;

  display: none;

  font-size: 30px;

  border: 1px solid blue;
  // border-top: 0px;
}
</style>
