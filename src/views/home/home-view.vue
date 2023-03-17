<template>
  <div>home</div>
  <ElInput />
  <ElButton type="primary">button</ElButton>
  <ZTable
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="100"
    @load="load"
  />
</template>
<script lang="ts" setup>
import ZTable from '@/plugins/ztools/z-table.vue';

const currentPage = ref(1);
const pageSize = ref(20);

function load() {
  console.log('load');
}
</script>
