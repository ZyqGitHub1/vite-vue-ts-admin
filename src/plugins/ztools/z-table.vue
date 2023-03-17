<script lang="ts" setup>
import { useAttrs, ref, onMounted, watch } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  selected: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(['load', 'update:currentPage', 'update:pageSize']);
const attr$ = useAttrs();

const elTable = ref();

onMounted(() => {
  watch(
    () => props.selected,
    (selected) => {
      elTable.value.store.states.selection.value = selected;
      elTable.value.store.updateAllSelected();
    },
    {
      immediate: true,
    },
  );
});

function loadData() {
  emit('load');
}
function onSizeChange(val: number) {
  emit('update:pageSize', val);
  emit('load');
}

function onCurrentChange(val: number) {
  emit('update:currentPage', val);
  emit('load');
}

loadData();
</script>
<template>
  <div>
    <ElTable
      v-bind="attr$"
      ref="elTable"
    >
      <template
        v-for="(_, name) in $slots"
        v-slot:[name]="data"
      >
        <slot
          :name="name"
          v-bind="data"
        />
      </template>
    </ElTable>
    <ElPagination
      class="page"
      :currentPage="props.currentPage"
      :pageSize="props.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @update:pageSize="onSizeChange"
      @update:currentPage="onCurrentChange"
    />
  </div>
</template>
<style scoped>
.page {
  margin-top: 1rem;
  justify-content: center;
}
</style>
