<template>
  <ElMenu
    class="auto-menu"
    router
    :defaultActive="defaultActive"
    style="border: none"
  >
    <AutoMenuItem
      v-for="item in menu"
      :key="item.name"
      :label="item.label"
      :type="item.type"
      :icon="item.icon"
      :path="item.path"
      :children="item.children"
      :name="(item.name as string)"
    />
  </ElMenu>
</template>

<script lang="ts" setup>
import { filterRoutesByPermission } from '@/utils/router-utils';
import { buildMenu } from '@/utils/menu-utils';
import { routes } from '@/router';
import AutoMenuItem from './auto-menu-item.vue';

const userInfo = {
  permission: new Set(['admin']),
};

const accessableRoutes = filterRoutesByPermission(routes, userInfo.permission);

const menu = buildMenu(accessableRoutes);

const route = useRoute();

const defaultActive = ref('');

watchEffect(() => {
  if (route.meta?.menu?.activeMenu) {
    defaultActive.value = route.meta.menu.activeMenu;
  } else {
    defaultActive.value = route.name as string;
  }
});
</script>

<style lang="scss">
.auto-menu {
  &.el-menu--vertical:not(.el-menu--collapse) {
    width: 230px;
  }
}
</style>
