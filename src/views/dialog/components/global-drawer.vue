<template>
  <ElDrawer
    v-model="visible"
    title="global drawer"
    width="30%"
    @closed="onDialogHide"
  >
    <ElButton @click="showDialog">dialog in drawer</ElButton>
    <template #footer>
      <ElButton
        type="primary"
        @click="onOKClick"
        >确定</ElButton
      >
      <ElButton @click="onCancelClick">取消</ElButton>
    </template>
  </ElDrawer>
</template>

<script lang="ts" setup>
import useDialogPluginComponent from '@/plugins/ztools/global-render/use-dialog-plugin-component';
import { useGlobalRender } from '@/plugins/ztools/global-render/global-render.vue';
import GlobalDialog from './global-dialog.vue';

defineEmits(useDialogPluginComponent.emits);

const { visible, onDialogHide, onDialogOK } = useDialogPluginComponent();

function onOKClick() {
  onDialogOK('a');
}

function onCancelClick() {
  visible.value = false;
}

function showDialog() {
  useGlobalRender(GlobalDialog);
}
</script>
