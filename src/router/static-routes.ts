import type { RouterOptions } from 'vue-router';

import LoginView from '@/views/login/login-view.vue';
import DialogView from '@/views/dialog/dialog-view.vue';
import HomeView from '@/views/home/home-view.vue';
const staticRoutes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: LoginView,
    meta: {
      layout: 'SimpleLayout',
      noAuth: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      menu: {
        icon: 'ep:avatar',
        label: '首页',
      },
      breadcrumb: {
        label: '首页',
      },
      acl: {
        permission: ['home', 'admin'],
      },
    },
  },
  {
    path: '/global-render',
    component: DialogView,
    name: 'global-render',
    meta: {
      menu: {
        icon: 'ep:avatar',
        label: '全局渲染',
      },
      breadcrumb: {
        label: '全局渲染',
      },
    },
  },
  {
    path: '/nest',
    name: 'nest',
    meta: {
      menu: {
        label: '父级菜单',
        icon: 'ep:menu',
      },
      breadcrumb: {
        label: '父级菜单',
      },
    },
    redirect: '/nest/1',
    children: [
      {
        path: '/nest/1',
        name: 'nest-1',
        meta: {
          menu: {
            label: '子菜单-1',
            icon: 'ep:menu',
          },
          breadcrumb: {
            label: '子菜单-1',
            from: 'nest',
          },
        },
        component: () => import('@/views/mock/mock-page-view.vue'),
      },
      {
        path: '/nest/2',
        name: 'nest-2',
        meta: {
          menu: {
            label: '子菜单-2',
            icon: 'ep:menu',
          },
          breadcrumb: {
            label: '子菜单-2',
            from: 'nest',
          },
        },
        component: () => import('@/views/mock/mock-page-view.vue'),
      },
    ],
  },
  {
    path: '/hidden-nest',
    name: 'hidden-nest',
    meta: {
      menu: {
        label: '单个嵌套菜单',
        icon: 'ep:menu',
      },
      breadcrumb: {
        label: '单个嵌套菜单',
      },
    },
    component: () => import('@/views/mock/mock-page-view.vue'),
    children: [
      {
        path: '1',
        name: 'hidden-nest-1',
        meta: {
          menu: {
            label: '查看页面',
            activeMenu: 'hidden-nest',
            hidden: true,
          },
          breadcrumb: {
            label: '查看页面',
            from: 'hidden-nest',
          },
        },
        component: () => import('@/views/mock/mock-page-view.vue'),
      },
      {
        path: '2',
        name: 'hidden-nest-2',
        meta: {
          menu: {
            label: '编辑页面',
            activeMenu: 'hidden-nest',
            hidden: true,
          },
          breadcrumb: {
            label: '编辑页面',
            from: 'hidden-nest',
          },
        },
        component: () => import('@/views/mock/mock-page-view.vue'),
      },
    ],
  },
  {
    path: '/flat-nest',
    name: 'flat-nest',
    meta: {
      menu: {
        label: '单个非嵌套菜单',
        icon: 'ep:menu',
      },
      breadcrumb: {
        label: '单个非嵌套菜单',
      },
    },
    component: () => import('@/views/mock/mock-page-view.vue'),
  },
  {
    path: '/flat-nest/1',
    name: 'flat-nest-1',
    meta: {
      menu: {
        label: '查看页面',
        activeMenu: 'flat-nest',
        hidden: true,
      },
      breadcrumb: {
        label: '查看页面',
        from: 'flat-nest',
      },
    },
    component: () => import('@/views/mock/mock-page-view.vue'),
  },
  {
    path: '/flat-nest/2',
    name: 'flat-nest-2',
    meta: {
      menu: {
        label: '编辑页面',
        activeMenu: 'flat-nest',
        hidden: true,
      },
      breadcrumb: {
        label: '编辑页面',
        from: 'flat-nest',
      },
    },
    component: () => import('@/views/mock/mock-page-view.vue'),
  },
];

export default staticRoutes;
