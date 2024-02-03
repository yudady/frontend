<template>
  <!-- 第一层 -->
    <ul>
        <li v-for="item in menuData" :key="item.id">
            <p>{{item.title}}</p>
            <food-menu :menu-data="item.cont"></food-menu>
            <!-- :menu-data="item.cont" 和父组件的传值一致 -->
        </li>
    </ul>
</template>

<script>
export default {
    //组件的名称和自己一样 自己调用自己 不在引入 name注册
    // 组件的name属性有三种用法
    // 1. <keep-alive include="组件的name"></keep-alive>
    // 2. vue devtools 显示组件的name
    // 3. 递归组件
    name:'foodMenu',
    props:{
        menuData:Array
    }
}
</script>

<style>

</style>