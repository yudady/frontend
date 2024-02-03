<template>
  <div class="edit-news">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="form"
    >
      <!-- 新闻标题 -->
      <el-form-item label="新闻标题" prop="title" label-width="100px">
        <el-input
          type="text"
          placeholder="请输入新闻标题"
          prefix-icon="el-icon-user-solid"
          v-model="ruleForm.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 作者 -->
      <el-form-item label="作者" prop="author" label-width="100px">
        <el-input
          type="text"
          placeholder="请输入作者"
          prefix-icon="el-icon-user-solid"
          v-model="ruleForm.author"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 文章内容 -->
      <el-form-item label="文章内容" class="content" label-width="100px">
        <!-- 富文本编辑器 -->
        <editor @change="getContent" :set-content="setContent" :is-send="isSend"></editor>
      </el-form-item>

      <el-form-item>
        <el-button v-if="action=== 'add'" type="primary" @click="submitForm('ruleForm')"
          >保存并继续录入</el-button
        >
        <el-button v-else type="primary" @click="submitForm('ruleForm')"
          >编辑完毕</el-button
        >
        <el-button type="primary" @click="resetForm('ruleForm')"
          >重置</el-button
        >
        <el-button type="primary" @click="back">返回新闻列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
// import editor from "@/components/editor";
import editor from "com/editor";
import {addNews,getNewsId,editNews} from '@/api/news.js'
import _ from 'lodash'
export default {
  components: { editor },
  name: "login",
  data() {
    return {
      ruleForm: {
        title: "",
        author: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        author: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      // 只要父向子传参，就取isSend的相反值，并传给子组件，这样子组件每次都能监听到
      // 父组件传参的行为
      setContent:'',
      isSend:true,
    };
  },
  created() {
    this.getNewsIdList()
  },
  methods: {
      //获取指定的newsId的数据
      async getNewsIdList(){
            //处理编辑传过来的参数
      let {newsId} = this.$route.query
      if(newsId){
        //编辑 判断的标识
        this.action = "edit"
        let res = await getNewsId(newsId)
        let{code,list} = res.data
        if(code===0){
          this.ruleForm = _.cloneDeep(list[0])
          this.setContent = list[0].content
        }
      }else{
        //添加 判断的标识
        this.action = "add"
      }
      
    },
    //获取富文本编辑器中的内容
    getContent(html) {
      //   console.log("editNews-html", html);
      this.ruleForm.content = html;
    },
    //处理添加
    async handleAdd(formName){
      let res =await addNews(this.ruleForm)
        let{code} =res.data
        if(code===0){ 
          this.$message.success("添加成功")
          this.$refs[formName].resetFields()
          this.isSend = !this.isSend
        }else{
          this.$message.error("添加失败")
        }
    },
    //处理编辑
    async handleEdit(formName){
        let res =await editNews(this.ruleForm)
        let{code} =res.data
        if(code===0){ 
          this.$message.success("编辑成功")
          this.$router.push("/news/index")
        }else{
          this.$message.error("编辑失败")
        }
    },
    //添加提交
    submitForm(formName){
     this.$refs[formName].validate(async (valid)=>{
      if(valid){
        if(this.ruleForm.content===''){
          this.$message.error("文章不能为空")
        }
        //判断不同的action处理不同的操作
        if(this.action==="add"){
          this.handleAdd(formName)
        }else{
          this.handleEdit(formName)
        }
      }else {
          // 数据无效
          //当有字段数据无效时，阻止提交
          console.log("error submit!!");
          return false;
        }
     })
    },
    //重置
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.isSend = !this.isSend
    },
    //返回新闻列表
    back(){
      this.$router.push("/news/index")
    }
    },
}
</script>
  
  <style lang="scss">
</style>