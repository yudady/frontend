<template>
    <div class="manage">
        <el-dialog
            :title="operateType==='add'?'新增用户':'更新用户'"
            :visible.sync="isShow"
            width="60%"
            >
            <common-form
            :formLable="operateFormLable"
            :form="oprateForm"
            :inline="true"
            ref="form">
            </common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow=false">取消</el-button>
                <el-button @click="confirm" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <common-form
            :formLable="formLable"
            :form="searchFrom"
            :inline="true"
            ref="form">
             <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table 
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config='config'
        @changePage="getList()"
        @edit="editUser"
        @del="delUser">
        </common-table>
    </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUser} from '../../api/data'
export default {
    name:'user',
    components:{
       CommonForm,
       CommonTable
    },
    data(){
        return {
            operateType:'add',
            isShow:false,
            operateFormLable:[
                {
                    model:'name',
                    label:'姓名',
                    type:'input'
                },
                {
                    model:'age',
                    label:'年龄',
                    type:'input'
                },
                {
                    model:'sex',
                    label:'性别',
                    type:'select',
                    opts:[
                        {
                            label:'男',
                            value:1
                        },
                        {
                            label:'女',
                            value:0
                        }
                    ]
                },
                {
                    model:'birth',
                    label:'出生日期',
                    type:'data'
                },
                {
                    model:'addr',
                    label:'地址',
                    type:'input'
                },
            ],
            oprateForm:{
                name:'',
                addr:'',
                age:'',
                birth:'',
                sex:''
            },
            formLable:[
                {
                    model:'keyword',
                    label:'',
                    type:'input'
                }
            ],
            searchFrom:{
                keyword:'',
            },
            tableData:[],
            tableLabel:[
                {
                    prop:'name',
                    label:'姓名',
                },
                {
                    prop:'age',
                    label:'年龄',
                },
                {
                    prop:'sexLabel',
                    label:'性别',
                },
                {
                    prop:'birth',
                    label:'出生日期',
                    width:200
                },
                {
                    prop:'addr',
                    label:'地址',
                    width:320
                },
            ],
            config:{
                page:1,
                total:30
            }
        }
    },
    methods:{
        confirm(){
            if(this.operateType==='edit'){
                this.$http.post('/user/edit',this.oprateForm).then(()=>{
                    //console.log(res)
                    this.isShow=false
                    this.getList()
                })
            }else{
               this.$http.post('/user/add',this.oprateForm).then(()=>{
                    //console.log(res)
                    this.isShow=false
                    this.getList()
                }) 
            }
        },
        addUser(){
            this.isShow=true
            this.operateType='add'
            this.oprateForm={
                name:'',
                addr:'',
                age:'',
                birth:'',
                sex:''
            }
        },
        editUser(row){
            this.operateType='edit'
            this.isShow=true
            this.oprateForm=row
        },
        delUser(row){
            this.$messagebox.confirm("此操作将永久删除该文件，是否继续？","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                const id=row.id
                this.$http.get("/user/del",{
                    param:{id}
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getList()
                })
            })
        },
        getList(name=''){
            this.config.loading=true
            name?(this.config.page=1):''
            getUser({
                page:this.config.page,
                name
            }).then(res=>{
                console.log(res)
                this.tableData=res.data.list.map(item=>{
                    item.sexLabel=item.sex===0?'女':'男'
                    return item
                })
                this.config.total=res.data.count
                this.config.loading=false
            })
        },
    },
    created () {
        this.getList()
    }
}
</script>

<style scoped lang='less'>
.manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>