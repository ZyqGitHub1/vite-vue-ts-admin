import { createRouter, createWebHashHistory, type RouterOptions } from 'vue-router';
import type { Layout } from '@/layouts/layouts';
import type { Component } from 'vue';
import notFound from '@/views/not-found.vue';
import type { AclRules } from '@/utils/router-utils';
import { getToken, removeToken } from '@/utils/native-store';
import { useUserStore } from '@/stores/user-store';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import staticRoutes from './static-routes';
import { START_LOCATION } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: Layout;
    noAuth?: boolean;
    menu?: {
      label: string;
      icon?: Component | string;
      hidden?: boolean;
      alwaysShow?: boolean;
      activeMenu?: string;
    };
    breadcrumb?: {
      from?: string;
      label: string;
      disableRoute?: boolean;
    };
    acl?: AclRules;
  }
}

export const routes: RouterOptions['routes'] = [
  ...staticRoutes,
  {
    path: '/:pathMatch(.*)',
    meta: {
      layout: 'SimpleLayout',
    },
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const { isLoading } = useNProgress();
  if (to.meta.noAuth) {
    return true;
  }
  if (from !== START_LOCATION) {
    return true;
  }

  if (getToken()) {
    if (to.path === '/login') {
      return {
        path: '/home',
      };
    }
    const userStore = useUserStore();
    if (!userStore.username) {
      try {
        isLoading.value = true;
        await userStore.fetchUserinfo();
        return true;
      } catch (error) {
        console.error(error);
        removeToken();
        return {
          path: '/login',
        };
      } finally {
        isLoading.value = false;
      }
    }
  } else {
    return {
      path: '/login',
    };
  }

  return true;
});

export default router;
