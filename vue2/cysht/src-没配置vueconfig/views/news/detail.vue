<template>
  <div class="detail">
    <router-link to="/news/index">返回新闻列表</router-link>
    <hr>
    <h1>{{ title }}</h1>
    <p>作者: {{ author }}</p>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import { getNewsId } from "@/api/news";
export default {
    data(){
        return {
            title:'',
            author: '',
            content: ''
        }
    },
  async created() {
    let { newsId } = this.$route.params;
    let res = await getNewsId(newsId)
    let {code,list} = res.data
    if (code === 0 ){
        this.title = list[0].title
        this.author = list[0].author
        this.content = list[0].content
    }
  },
};
</script>

<style scoped>
    .detail {
        width: 1400px;
        margin: 0 auto;
    }
</style>