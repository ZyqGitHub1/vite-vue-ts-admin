<template>
  <component :is="layouts[layout]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import layouts from '@/layouts/layouts';

const route = useRoute();
const layout = computed(() => route.meta.layout ?? 'DefaultLayout');
</script>
