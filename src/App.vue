<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import GlobalRender from './plugins/ztools/global-render/global-render.vue';
import { useUserStore } from './stores/user-store';

const userStore = useUserStore();
const route = useRoute();

const ready = computed(() => route.meta.noAuth || userStore.username);
</script>

<template>
  <div v-if="ready">
    <ElConfigProvider :locale="zhCn">
      <AppLayout>
        <RouterView />
      </AppLayout>
      <GlobalRender />
    </ElConfigProvider>
  </div>
</template>
