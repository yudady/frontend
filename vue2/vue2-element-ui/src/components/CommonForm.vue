<template>
    <el-form ref="form" :model="form" label-width="100px" :inline="inline">
        <el-form-item v-for="item in formLable" :key="item.label" :label="item.label">
            <el-input v-if="item.type === 'input'" :placeholder="'请输入'+item.label" v-model="form[item.model]">
            </el-input>
            <el-switch v-if="item.type === 'switch'" v-model="form[item.model]">
            </el-switch>
            <el-date-picker v-if="item.type === 'data'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form[item.model]">
            </el-date-picker>
            <el-select v-if="item.type === 'select'" v-model="form[item.model]" placeholder="请选择">
                <el-option
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <slot></slot>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name:'CommonForm',
    props:{
        formLable:Array,
        form:Object,
        inline:Boolean
    },
    data(){
        return{

        }
    }
}
</script>