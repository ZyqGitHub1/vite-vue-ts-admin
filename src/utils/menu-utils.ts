import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export type MenuRecord = {
  type: 'menuItem' | 'subMenu';
  path: string;
  name: string | symbol;
  label: string;
  icon?: string | Component;
  children?: MenuRecord[];
};

export function buildMenu(routes: Readonly<RouteRecordRaw[]>) {
  const menuTree: MenuRecord[] = [];
  for (let i = 0; i < routes.length; i += 1) {
    const routeItem = routes[i];
    const menuMeta = routeItem.meta?.menu;
    if (menuMeta) {
      if (!menuMeta.label) {
        throw new Error(`route ${routeItem.path} meta.menu.label not a string`);
      }
      if (!routeItem.name) {
        throw new Error(`route ${routeItem.path} name not a string`);
      }
      if (!menuMeta.hidden) {
        const { children } = routeItem;
        const showChildrenCount = children?.filter((c) => {
          if (!c.meta) {
            return false;
          }
          if (!c.meta.menu) {
            return false;
          }
          if (c.meta.menu.hidden) {
            return false;
          }
          return true;
        }).length;
        if (showChildrenCount) {
          // 仅有一个子路由
          if (showChildrenCount === 1) {
            // 仅有一个子路由显示父级
            if (menuMeta.alwaysShow) {
              const menuNode: MenuRecord = {
                type: 'subMenu',
                path: routeItem.path,
                label: menuMeta.label,
                name: routeItem.name,
                icon: menuMeta.icon,
                children: buildMenu(children),
              };
              menuTree.push(menuNode);
            } else {
              // 仅有一个子路由不显示父级
              menuTree.push(buildMenu(children)[0]);
            }
          } else {
            // 有多个子路由递归处理
            const menuNode: MenuRecord = {
              type: 'subMenu',
              path: routeItem.path,
              label: menuMeta.label,
              name: routeItem.name,
              icon: menuMeta.icon,
              children: buildMenu(children),
            };
            menuTree.push(menuNode);
          }
        } else if (routeItem.component) {
          // 没有子路由
          const menuNode: MenuRecord = {
            type: 'menuItem',
            path: routeItem.path,
            label: menuMeta.label,
            name: routeItem.name,
            icon: menuMeta.icon,
          };
          menuTree.push(menuNode);
        }
      }
    }
  }

  return menuTree;
}
