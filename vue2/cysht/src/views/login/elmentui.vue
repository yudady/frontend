<template>
  <div class="login">
    <el-row>
  <el-col :span="4"><div class="grid-content bg-purple">1</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">2</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">3</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">4</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">5</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">6</div></el-col>
    </el-row>
     <el-radio v-model="radio" label="james">詹姆斯</el-radio>
     <el-radio v-model="radio" label="du">杜兰特</el-radio>
     <br>
      <el-checkbox v-model="checked">备选项</el-checkbox>
      <br>
      <el-input v-model="input" placeholder="请输入内容" :disabled="true"  clearable></el-input>
      <el-input v-model="input" placeholder="请输入内容"  clearable></el-input>
      <el-input v-model="input" placeholder="请输入内容"  clearable  show-password></el-input>
      <!-- 计数器 -->
       <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
       <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
       <br>
       <!-- 选择 -->
       <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
       </el-option>
        </el-select> -->
       <!-- 可清空选择 -->
         <!-- <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select> -->
         <!--  -->
         <!-- <div class="block">
          <span class="demonstration">默认 click 触发子菜单</span>
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"></el-cascader>
        </div>
        <div class="block">
          <span class="demonstration">hover 触发子菜单</span>
          <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        </div> -->
        <!-- <el-switch
          v-model="value1"
          active-text="按月付费"
          inactive-text="按年付费">
        </el-switch>
        <el-switch
          style="display: block"
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="按月付费"
          inactive-text="按年付费">
        </el-switch> -->

        <el-time-select
        v-model="value"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间">
      </el-time-select>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
  </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        radio: 'james',
         checked: true,
         input: '',
          num: 1,
        // value: [],
        // options: [{
        //   value: 'zhinan',
        //   label: '指南',
        //   children: [{
        //     value: 'shejiyuanze',
        //     label: '设计原则',
        //     children: [{
        //       value: 'yizhi',
        //       label: '一致'
        //     }, {
        //       value: 'fankui',
        //       label: '反馈'
        //     }, {
        //       value: 'xiaolv',
        //       label: '效率'
        //     }, {
        //       value: 'kekong',
        //       label: '可控'
        //     }]
        //   }, {
        //     value: 'daohang',
        //     label: '导航',
        //     children: [{
        //       value: 'cexiangdaohang',
        //       label: '侧向导航'
        //     }, {
        //       value: 'dingbudaohang',
        //       label: '顶部导航'
        //     }]
        //   }]
        // }, {
        //   value: 'zujian',
        //   label: '组件',
        //   children: [{
        //     value: 'basic',
        //     label: 'Basic',
        //     children: [{
        //       value: 'layout',
        //       label: 'Layout 布局'
        //     }, {
        //       value: 'color',
        //       label: 'Color 色彩'
        //     }, {
        //       value: 'typography',
        //       label: 'Typography 字体'
        //     }, {
        //       value: 'icon',
        //       label: 'Icon 图标'
        //     }, {
        //       value: 'button',
        //       label: 'Button 按钮'
        //     }]
        //   }, {
        //     value: 'form',
        //     label: 'Form',
        //     children: [{
        //       value: 'radio',
        //       label: 'Radio 单选框'
        //     }, {
        //       value: 'checkbox',
        //       label: 'Checkbox 多选框'
        //     }, {
        //       value: 'input',
        //       label: 'Input 输入框'
        //     }, {
        //       value: 'input-number',
        //       label: 'InputNumber 计数器'
        //     }, {
        //       value: 'select',
        //       label: 'Select 选择器'
        //     }, {
        //       value: 'cascader',
        //       label: 'Cascader 级联选择器'
        //     }, {
        //       value: 'switch',
        //       label: 'Switch 开关'
        //     }, {
        //       value: 'slider',
        //       label: 'Slider 滑块'
        //     }, {
        //       value: 'time-picker',
        //       label: 'TimePicker 时间选择器'
        //     }, {
        //       value: 'date-picker',
        //       label: 'DatePicker 日期选择器'
        //     }, {
        //       value: 'datetime-picker',
        //       label: 'DateTimePicker 日期时间选择器'
        //     }, {
        //       value: 'upload',
        //       label: 'Upload 上传'
        //     }, {
        //       value: 'rate',
        //       label: 'Rate 评分'
        //     }, {
        //       value: 'form',
        //       label: 'Form 表单'
        //     }]
        //   }, {
        //     value: 'data',
        //     label: 'Data',
        //     children: [{
        //       value: 'table',
        //       label: 'Table 表格'
        //     }, {
        //       value: 'tag',
        //       label: 'Tag 标签'
        //     }, {
        //       value: 'progress',
        //       label: 'Progress 进度条'
        //     }, {
        //       value: 'tree',
        //       label: 'Tree 树形控件'
        //     }, {
        //       value: 'pagination',
        //       label: 'Pagination 分页'
        //     }, {
        //       value: 'badge',
        //       label: 'Badge 标记'
        //     }]
        //   }, {
        //     value: 'notice',
        //     label: 'Notice',
        //     children: [{
        //       value: 'alert',
        //       label: 'Alert 警告'
        //     }, {
        //       value: 'loading',
        //       label: 'Loading 加载'
        //     }, {
        //       value: 'message',
        //       label: 'Message 消息提示'
        //     }, {
        //       value: 'message-box',
        //       label: 'MessageBox 弹框'
        //     }, {
        //       value: 'notification',
        //       label: 'Notification 通知'
        //     }]
        //   }, {
        //     value: 'navigation',
        //     label: 'Navigation',
        //     children: [{
        //       value: 'menu',
        //       label: 'NavMenu 导航菜单'
        //     }, {
        //       value: 'tabs',
        //       label: 'Tabs 标签页'
        //     }, {
        //       value: 'breadcrumb',
        //       label: 'Breadcrumb 面包屑'
        //     }, {
        //       value: 'dropdown',
        //       label: 'Dropdown 下拉菜单'
        //     }, {
        //       value: 'steps',
        //       label: 'Steps 步骤条'
        //     }]
        //   }, {
        //     value: 'others',
        //     label: 'Others',
        //     children: [{
        //       value: 'dialog',
        //       label: 'Dialog 对话框'
        //     }, {
        //       value: 'tooltip',
        //       label: 'Tooltip 文字提示'
        //     }, {
        //       value: 'popover',
        //       label: 'Popover 弹出框'
        //     }, {
        //       value: 'card',
        //       label: 'Card 卡片'
        //     }, {
        //       value: 'carousel',
        //       label: 'Carousel 走马灯'
        //     }, {
        //       value: 'collapse',
        //       label: 'Collapse 折叠面板'
        //     }]
        //   }]
        // }, {
        //   value: 'ziyuan',
        //   label: '资源',
        //   children: [{
        //     value: 'axure',
        //     label: 'Axure Components'
        //   }, {
        //     value: 'sketch',
        //     label: 'Sketch Templates'
        //   }, {
        //     value: 'jiaohu',
        //     label: '组件交互文档'
        //   }]
        // }]
        // value1: true,
        // value2: true,
        value: '',
         pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
      };
    },
      methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  
}
</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>