<template>
  <ElMenuItem
    v-if="type === 'menuItem'"
    :index="name"
    :route="{
      name: name,
    }"
  >
    <i class="el-icon">
      <Icon
        v-if="icon"
        :icon="icon"
      />
    </i>
    <span class="ml-[20px]">{{ label }}</span>
  </ElMenuItem>
  <ElSubMenu
    v-else-if="type === 'subMenu'"
    :index="name"
  >
    <template #title>
      <i class="el-icon">
        <Icon
          v-if="icon"
          :icon="icon"
        />
      </i>
      <span class="ml-[20px]">{{ label }}</span>
    </template>
    <AutoMenuItem
      v-for="item in children"
      :key="item.name"
      :label="item.label"
      :type="item.type"
      :icon="item.icon"
      :path="item.path"
      :children="item.children"
      :name="item.name"
    />
  </ElSubMenu>
</template>

<script lang="ts" setup>
import type { MenuRecord } from '@/utils/menu-utils';
import type { Component } from 'vue';
import { Icon } from '@iconify/vue';

defineProps<{
  label: string;
  path: string;
  name: string;
  icon?: string | Component;
  children?: MenuRecord[];
  type: string;
}>();
</script>

<style>
.el-sub-menu.is-active > .el-sub-menu__title {
  color: var(--el-menu-active-color);
}
</style>
