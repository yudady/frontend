<template>
  <div>
    <h1>餐饮店列表</h1>
    <food-menu :menu-data="recursionList"></food-menu>
  </div>
</template>

<script>
import recursionRouter from '@/data/recursion' 
import foodMenu from './foodMenu.vue';
export default {
  components: { foodMenu },
    data() {
        return {
            recursionList:recursionRouter,
        };
    },
}
</script>

<style>

</style>