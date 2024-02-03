<template>
  <div class="tabs">
    <el-tag  
    :type="activeIndex=== index ?'success':''"
     @click="skip(item,index)"
      v-for="(item, index) in tablist" :key="item.path"
      :closable=" index !==0"
      @close="handleclose(index)"
      >
      {{item.title}}
      </el-tag>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tablist: [
                {
                    title:'首页',
                    path:'/dashboard'
                },
            ],
            //高亮的索引
            activeIndex:0
        };
    },
    methods: {
        skip(item,index){
            this.$router.push(item.path)
            this.activeIndex = index
        },
        //判断路由是否已经存在
        isrepeat(path){
            return this.tablist.some(item=>{
                return path === item.path
            })
        },
        //处理点击叉号后删除
        handleclose(index){
            this.tablist.splice(index,1)
            //判断删除的是否是高亮的
            if(index ===this.activeIndex){
                this.activeIndex = this.tablist.length-1
                 this.$router.push(this.tablist[this.activeIndex].path)
            }else{
                //删除不高量的
                if(index<this.activeIndex){
                    this.activeIndex = this.activeIndex-1
                }
            }
            
        }
    },
    watch:{
        $route:{
            handler(to){
                //路由发生变化的时候
                //判断当前路由是否重复 
                if(this.isrepeat(to.fullPath)) {
                    let index = this.tablist.findIndex(item=>{
                        return item.path === to.fullPath
                    })
                    this.activeIndex = index
                    return
                    // console.log(index);
                }
                if(to.matched[0].meta.level){
                    //只有一级
                    this.tablist.push({
                        title:to.matched[0].meta.title,
                        path:to.fullPath
                    })
                }else{
                     //有二级以上
                    this.tablist.push({
                    title:to.meta.title,
                    path:to.fullPath
                    })
                }
               //处理高亮
               this.activeIndex = this.tablist.length-1
            },
            immediate:true
        }
    }
};
</script>

<style scoped lang="scss">
.tabs{
    display: flex;
    span{
        margin-left: 20px !important;
        cursor: pointer;
    }
}
</style>