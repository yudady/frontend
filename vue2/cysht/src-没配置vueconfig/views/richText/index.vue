<template>
  <div class="editor" id="box">
    富文本编辑器
    
  </div>
</template>

<script>
import E from "wangeditor";
export default {
     data() {
    return {};
  },
  mounted() {
    this.initE();
  },
  methods: {
    initE() {
      this.editor = new E("#box");
      //这里各位小伙伴可以查询官网，根据自己的需求进行菜单栏调整
      
      //行内样式
      this.editor.config.styleWithCSS = true;
    
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ];
      //为true，则上传后的图片转为base64编码，为false,则上传图片到服务器，二者不能同时使用
      this.editor.config.uploadImgShowBase64 = false;
      //服务器接收的上传图片的属性名
      this.editor.config.uploadFileName = "file";
      this.editor.config.uploadImgHeaders = {
        Authorization:"Bearer "+sessionStorage.getItem('token')
    }
      //服务器上传图片的接口地址
      this.editor.config.uploadImgServer = `http://localhost:5000/upload`;
      // 默认限制图片大小是 5M ，可以自己修改。
      this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
      // 限制类型,可自定义配置,默认为： ['jpg', 'jpeg', 'png', 'gif', 'bmp']
      this.editor.config.uploadImgAccept = ['jpg', 'jpeg',"png", "gif", "bmp", "webp"];
      //上传图片过程中钩子函数
      this.editor.config.uploadImgHooks = {
        customInsert: function (insertImgFn, result) {
        //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
        // console.log(result.data[0].url)
        //insertImgFn()为插入图片的函数
        //循环插入图片
        // for (let i = 0; i < 1; i++) {
        // console.log(result)
        insertImgFn(result.url);
    }
      };
	  // 在输入内容时，把内容传给父组件
      this.editor.config.onchange = (html) => {
        this.$emit("change", html); // 将内容同步到父组件中
        // console.log(html);
      };
      this.editor.create();
      //初始化富文本编辑器时显示的内容
      this.editor.txt.html("<h1>你好</h1>");
    },
  },
}
</script>

<style scoped lang="scss">

</style>