/* eslint-disable vue/max-len */
import type { RouteRecordRaw } from 'vue-router';
import { type LogicOp, logicFilter } from './logic-utils/filter';

export type FilterCallback = (value: RouteRecordRaw) => boolean;

export type AclRules = {
  role?: string | string[] | LogicOp;
  permission?: string | string[] | LogicOp;
};

export function filterRoutes(
  routes: Readonly<RouteRecordRaw[]>,
  filter: FilterCallback,
): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const curRoute = { ...route };
    if (filter(curRoute)) {
      if (curRoute.children) {
        curRoute.children = filterRoutes(curRoute.children, filter);
      }
      result.push(curRoute);
    }
  });

  return result;
}

export function filterRoutesByPermission(
  routes: Readonly<RouteRecordRaw[]>,
  permissions: Set<string>,
): Readonly<RouteRecordRaw[]> {
  const permissionRouteFilter: FilterCallback = (route) => {
    const permissionRule = route.meta?.acl?.permission;
    if (!permissionRule) {
      return true;
    }
    return logicFilter(permissionRule, permissions);
  };

  return filterRoutes(routes, permissionRouteFilter);
}
