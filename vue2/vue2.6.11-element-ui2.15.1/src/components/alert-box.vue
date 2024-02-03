<template>
  <div class="alert-box">
    <!--  -->
    <div>
      <slot name="test6" v-bind:user="userdata" v-bind:users="userdatas"
        >test6</slot
      >
    </div>
    <!--  -->
    <div>
      <slot name="test7" v-bind:user="userdata" v-bind:users="{ test1: '22' }"
        >test7</slot
      >
    </div>
    <!--  -->
    <div>
      <slot name="test8" v-bind:yonghu="user">test8</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alertBox',
  props: {
  },
  data() {
    return {
      userdata: 'p',
      userdatas: {
        test1: '11',
        test2: '22',
      },
      user: { lastName: '名字', firstName: '姓氏' },
    };
  },
};
</script>

<style lang="less" scoped>
</style>
