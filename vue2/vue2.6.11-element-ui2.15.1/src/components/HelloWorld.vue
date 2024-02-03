<template>
  <div class="hello-world">
    <h1>hello-world1{{ prop0 }}</h1>
    <h1>hello-world2{{ prop1 }}</h1>
    <h1>hello-world3{{ prop2 }}</h1>
    <h1>hello-world4{{ prop3.title }}</h1>
    <div>components/HelloWorld.vue</div>
    <div>components/HelloWorld.vue</div>
    <div>components/HelloWorld.vue</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // inheritAttrs: false 不希望子组件的根元素继承父组件的 attribute,像是使用原始的 HTML 元素
  // inheritAttrs: false 选项不会影响 style 和 class 的绑定。
  /* ⚠️对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入
   type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute
   会稍微智能一些，即两边的值会被合并起来 */

  inheritAttrs: false,
  props: {
    prop0: {
      type: [String, Number], // 多个可能的类型
      required: true,
    },
    prop1: {},
    prop2: {},
    prop3: {},
    // fatherAttribute: {},
    // title: String,
    // likes: Number,
    // isPublished: Boolean,
    // commentIds: Array,
    // author: Object,
    // callback: Function,
    // contactsPromise: Promise,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
