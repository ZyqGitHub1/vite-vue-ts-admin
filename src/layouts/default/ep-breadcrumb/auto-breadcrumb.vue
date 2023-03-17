<template>
  <ElBreadcrumb separator="/">
    <ElBreadcrumbItem
      v-for="item in breadcrumbList"
      :to="item.to"
      :key="item.label"
      :class="{
        'breadcrumb-disable-route': item.disableRoute,
      }"
      >{{ item.label }}</ElBreadcrumbItem
    >
  </ElBreadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded, RouteLocationRaw } from 'vue-router';

const route = useRoute();
const router = useRouter();
const breadcrumbList = ref<BreadcrumbRecord[]>([]);

type BreadcrumbRecord = {
  to?: RouteLocationRaw;
  label: string;
  disableRoute?: boolean;
};

function creteBreadcrumbList(curRoute: RouteLocationNormalizedLoaded) {
  const breadcrumbMeta = curRoute.meta?.breadcrumb;
  if (breadcrumbMeta?.label) {
    const breadcrumbItem: BreadcrumbRecord = {
      label: breadcrumbMeta.label,
    };
    breadcrumbItem.disableRoute = breadcrumbMeta.disableRoute || !breadcrumbMeta.from;
    if (!breadcrumbItem.disableRoute) {
      breadcrumbItem.to = {
        name: curRoute.name!,
        params: curRoute.params,
        query: curRoute.query,
      };
    }
    breadcrumbList.value.unshift(breadcrumbItem);
    if (breadcrumbMeta.from) {
      const fromRoute = router.resolve({
        name: breadcrumbMeta.from,
      });
      creteBreadcrumbList(fromRoute);
    }
  }
}

watchEffect(() => {
  breadcrumbList.value = [];
  creteBreadcrumbList(route);
});
</script>

<style>
.breadcrumb-disable-route {
  font-weight: 700;
  text-decoration: none;
  transition: var(--el-transition-color);
  color: var(--el-text-color-primary);
}
</style>
