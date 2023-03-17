<template>
  <ElDialog
    v-model="visible"
    title="global doalog"
    width="30%"
    @closed="onDialogHide"
  >
    <template #footer>
      <ElButton
        type="primary"
        @click="onOKClick"
        >确定</ElButton
      >
      <ElButton @click="onCancelClick">取消</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import useDialogPluginComponent from '@/plugins/ztools/global-render/use-dialog-plugin-component';

defineEmits(useDialogPluginComponent.emits);

const { visible, onDialogHide, onDialogOK } = useDialogPluginComponent();

function onOKClick() {
  onDialogOK();
}

function onCancelClick() {
  visible.value = false;
}
</script>
