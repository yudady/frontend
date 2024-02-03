<template>
  <div>
    <h1>餐饮店列表</h1>
    <!-- 第一层 -->
    <ul>
        <li v-for="firstlevel in recursionList" :key="firstlevel.id">
            <h2>{{firstlevel.title}}</h2>
            <!-- 第二层ul -->
            <ul>
                <li v-for="secondlevel in firstlevel.cont" :key="secondlevel.id">
                    <h3>{{secondlevel.title}}</h3>
                    <!-- 第三层ul -->
                    <ul>
                        <li v-for="thirdlevel in  secondlevel.cont" :key="thirdlevel.id">
                            <h4>{{thirdlevel.title}}</h4>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>
import recursionRouter from '@/data/recursion' 
export default {
    data() {
        return {
            recursionList:recursionRouter,
        };
    },
}
</script>

<style>

</style>