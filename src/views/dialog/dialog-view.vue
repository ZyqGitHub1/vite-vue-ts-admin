<template>
  <ElButton @click="openDialog">打开dialog</ElButton>
  <ElButton @click="openDrawer">打开drawer</ElButton>
</template>
<script lang="ts" setup>
import { useGlobalRender } from '@/plugins/ztools/global-render/global-render.vue';
import GlobalDialog from './components/global-dialog.vue';
import GlobalDrawer from './components/global-drawer.vue';

function openDialog() {
  useGlobalRender(GlobalDialog)
    .onOk((data) => {
      console.log(data);
    })
    .onCancel(() => {
      console.log('cancel');
    });
}

function openDrawer() {
  useGlobalRender(GlobalDrawer)
    .onOk((data) => {
      console.log(data);
    })
    .onCancel(() => {
      console.log('cancel');
    });
}
</script>
