<template>
  <div>
    <el-button @click="skip">
        新闻管理
    </el-button>
    <el-table :data="tableData" style="width: 100%">
       <el-table-column prop="newsId" label="新闻id"> </el-table-column>
      <el-table-column prop="title" label="新闻标题"> </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <el-table-column prop="newsId" label="preview">
          <template slot-scope="scope">
          <router-link :to="`/news/detail/${scope.row.newsId}`">详情</router-link>
        </template>
      </el-table-column>
      <!-- 编辑删除操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" 
          @click="handleEdit(scope.$index, scope.row)"
          class="but"
            >编辑</el-button
          >
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
          <el-button
            size="mini"
            type="danger"
            slot="reference"
            >删除
            </el-button>
          </el-popconfirm>
          
   
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getNews,delNews} from '@/api/news.js'
export default {
  created() {
    this.handleNewsList()
  },
  data() {
    return {
      tableData: []
       
      
    };
  },
    methods: {
      //拉取新闻数据
      async handleNewsList() {
      //区分不同情况下的传递不同的参数
      let res = await getNews()
      // console.log(res.data);
      let{code,list} =res.data
      if(code===0){
        this.tableData = list
      }
    },
      //新闻管理
        skip(){
            this.$router.push("/news/editNews")
        },
        //新闻编辑
        handleEdit(index,row){
          this.$router.push(`/news/editNews?newsId=${row.newsId}`)
        },
        //新闻删除
        async handleDelete(index,row){
          let {newsId} = row
          let res = await delNews({
            newsId
          })
          let {code} = res.data
          if(code===0){
            //删除成功拉取数据
            this.$message.success("删除成功")
            this.handleNewsList()
          }else{
            this.$message.error("删除失败")
          }
        }
    },
}
</script>

<style>
.but{
  margin-right: 10px !important;
}
</style>