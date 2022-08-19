import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/src/base.scss';
import pinia from 'src/store/index';
import * as Icons from '@element-plus/icons-vue';

import('src/static/style/reset.css');
// element dark(内置暗黑模式)
import 'element-plus/theme-chalk/dark/css-vars.css';
// const app = createApp(App)
// app.use(ElementPlus)
const app = createApp(App);
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key]);
});
app.use(pinia).use(store).use(router).use(ElementPlus).mount('#app');
// TODO 1、axios的封装 2、基础组件封装 (
//  布局layout组件: 要支持横向和纵向的布局
//  按钮组组件
//  上传组件:文件预览下载上传的icon
//  表格和分页集成
//  input 和select 封装 支持 readOnly
//  单选/复选框封装
//  .jsx文件 css modules 隔离样式
//  webpack 配置 改sass 取消less 预处理
//  自动部署到github pages )
/*
* 集成formily https://element-plus.formilyjs.org/guide/form-grid.html#json-schema-%E6%A1%88%E4%BE%8B
* 先实现template 模板的集成  JSON
*
* */

