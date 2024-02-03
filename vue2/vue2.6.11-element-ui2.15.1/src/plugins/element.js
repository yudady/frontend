import Vue from 'vue';
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,

  Tree,
  Select,
  Option,

  Cascader,
  Alert,
  Tabs,
  TabPane,

  Steps,
  Step,
  CheckboxGroup,
  Checkbox,

  Upload,

  Timeline,
  TimelineItem,

} from 'element-ui';

/**
 * 把导入的组件注册为全局组件
 */
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Tag);

// Tree 运行依赖组件
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);

// 级联选择组件
Vue.use(Cascader);

// 警告组件
Vue.use(Alert);

// Tabs标签页，选项卡
Vue.use(Tabs);
Vue.use(TabPane);

// 商品列表
Vue.use(Steps);
Vue.use(Step);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);

// 富文本编辑器 运行依赖 vue-quill-editor
Vue.use(Upload);

Vue.use(Timeline);
Vue.use(TimelineItem);

// 把 Message 挂载到 VUE的原型对象上，
// $message可以自定义名称 $element_ui_message
Vue.prototype.$ui_message = Message;
Vue.prototype.$ui_confirm = MessageBox.confirm;
