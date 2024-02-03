<template>
  <div class="page">dd</div>
</template>

<script>
export default {
  // 数据层
  data() {
    return {

    };
  },

  // 方法集合
  methods: {

  },

  // 注册组件
  components: {

  },

  // 计算属性
  computed: {

  },

  // 侦听器
  watch: {

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
