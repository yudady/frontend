<template>
    <div class="common-table">
        <el-table
            :data="tableData"
            height=90% stripe>
            <el-table-column
                show-overflow-tooltip
                v-for="item in tableLabel"
                :key="item.prop"
                :label="item.label"
                :width="item.width?item.width:125">
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button @click="handleEdie(scope.row)" size="mini">编辑</el-button>
                    <el-button @click="handleDelete" type="danger" size="mini">删除</el-button>
                </template> 
            </el-table-column>
        </el-table>
        <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20">
       </el-pagination>
    </div>
</template>

<script>
export default {
    name:'CommonTable',
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object
    },
    data(){
        return {
            
        }
    },
    methods:{
        handleEdie(row){
            this.$emit('edit',row)
        },
        handleDelete(row){
            console.log(this)
            this.$emit('del',row)
        },
        changePage(row){
            this.$emit('changePage',row)
        }
    }
}
</script>

<style scoped lang="less">
.common-table{
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager{
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>