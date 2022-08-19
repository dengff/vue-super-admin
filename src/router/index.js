'use strict';
import {createRouter, createWebHashHistory} from 'vue-router';
import layout from 'src/views/layout/index';
import {children} from './modules/index';

// console.log(children, 'routes');
export const routes = [
  {
    path: '/',
    redirect: '/home/index',
    component: layout,
    // children: children,
  },
  ...children,
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: {name: '404'},
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
