<script setup lang="ts">
import AutoBreadcrumb from './ep-breadcrumb/auto-breadcrumb.vue';
import AutoMenu from './ep-menu/auto-menu.vue';
import GlobalHeader from './global-header.vue';
import MainHeaderMenu from './main-header-menu.vue';

const collapse = ref(false);
const onFoldClick = () => {
  collapse.value = !collapse.value;
};
</script>

<template>
  <div class="h-screen flex flex-col default-layout">
    <GlobalHeader />
    <div class="flex flex-1">
      <ElScrollbar style="height: calc(100vh - 48px)">
        <AutoMenu :collapse="collapse" />
      </ElScrollbar>
      <div class="flex-1 overflow-y-auto bg-slate-100 min-w-0">
        <div class="h-48px flex main-header p-x-4">
          <ElIcon
            class="hamburger-container"
            :class="{
              'is-collapse': collapse,
            }"
            @click="onFoldClick"
            :size="20"
          >
            <IEpFold />
          </ElIcon>
          <div id="breadcrumb-container">
            <AutoBreadcrumb />
          </div>
          <div class="flex-1" />
          <MainHeaderMenu />
        </div>
        <div class="pa-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.default-layout {
  .main-header {
    background: white;

    .hamburger-container {
      line-height: 48px;
      height: 100%;
      cursor: pointer;
      transition: transform 0.3s;

      &.is-collapse {
        transform: rotate(180deg);
      }
    }

    #breadcrumb-container {
      display: flex;
      align-items: center;
      margin-left: 16px;
    }
  }
}
</style>
