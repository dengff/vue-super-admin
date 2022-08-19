const layout = () => import('src/views/layout/index');
export const children = [
  {
    path: '/home',
    component: layout,
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        component: () => import('src/views/home/index'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '首页',
          key: 'home',
        },
      },

    ],
  },
  /*{
    path: '/home/index',
    name: 'Home',
    component: layout,
    // redirect: '/home/index',
    // path: 'index',
    // name: 'home',
    children: [
      {
        component: () => import('src/views/home/index'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '首页',
          key: 'home',
        },
      },

    ],

  },*/
  {
    path: '/dataScreen',
    name: 'DataScreen',
    component: () => import('src/views/About.vue'),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: '数据大屏',
      key: 'dataScreen',
    },
    // redirect: '/dataScreen/index',

  },
  {
    path: '/form',
    // name: '表单 Form',
    // redirect: '/from/basic-form',
    component: layout,
    // path: '/form/basicForm',
    redirect: '/from/basicForm',
    meta: {
      title: '表单 Form',
    },
    children: [
      {
        path: 'basicForm',
        name: 'basicForm',
        component: () => import('src/views/from/base-from/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '基础 Form',
          key: 'basicForm',
        },
      },
      {
        path: 'dynamicForm',
        name: 'dynamicForm',
        component: () => import('src/views/from/dynamic-form/index.vue'),
        meta: {
          // keepAlive: true,
          requiresAuth: true,
          title: '动态 Form',
          key: 'dynamicForm',
        },
      },
    ],
    // redirect: '/dataScreen/index',
  },
  {
    path: '/assembly',
    component: layout,
    redirect: '/assembly/grid-layout',
    meta: {
      title: '常用组件',
    },
    children: [
      {
        path: 'guide',
        name: 'grid-layout',
        component: () => import('src/views/assembly/grid-layout'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '布局组件',
          key: 'grid-layout',
        },
      },
    ],
  },

];

