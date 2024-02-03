<template>
  <span>{{ tweeningValue }}</span>
</template>
<script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>

<script>
// npm i @tweenjs/tween.js
// import TWEEN from '@tweenjs/tween.js';
// const TWEEN = require('@tweenjs/tween.js');

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  // 数据层
  data() {
    return {
      tweeningValue: 0,
    };
  },
  mounted() {
    this.tween(0, this.value);
  },
  // 方法集合
  methods: {
    tween(startValue, endValue) {
      const vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(() => {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();

      animate();
    },
  },

  // 注册组件
  components: {

  },

  // 计算属性
  computed: {

  },

  // 侦听器
  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue);
    },
  },

  // 局部过滤器
  filters: {
    upper(val) {
      return val.charAt(0).toUpperCase() + val.slice(0, 3);
    },
    lower(val) {
      return val.charAt(0).toLowerCase() + val.slice(0, 3);
    },
  },
//
};
</script>

<style lang='less' scoped>
.page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
