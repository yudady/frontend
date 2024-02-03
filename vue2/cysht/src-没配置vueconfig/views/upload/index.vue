<template>
<!-- el-upload 组件上传图片是没有axios 而是封装了http请求 用户只需提供必要选项即可 -->
  <el-upload
  class="avatar-uploader"
  action="http://localhost:5000/upload"
  :headers="headers"
  :show-file-list="true"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script>
export default {
    data() {
      return {
        imageUrl: '',
        headers:{
            Authorization:"Bearer " + sessionStorage.getItem("token")
        }
      };
    },
    methods: {
    //图片上传成功后调用
      handleAvatarSuccess(res, file) {
        // 生成图片的地址 临时的
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.url
      },
      //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
    
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>