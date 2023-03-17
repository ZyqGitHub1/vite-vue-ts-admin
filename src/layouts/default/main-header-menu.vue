<template>
  <div class="flex h-48px items-center main-header-menu">
    <ElButton
      type="primary"
      text
      @click="onCheckPersonalCenterClick"
      >个人中心</ElButton
    >
    <div class="menu-gap">|</div>
    <ElButton
      type="primary"
      text
      >消息中心
      <ElBadge
        class="msg-count"
        :value="12"
      />
    </ElButton>
    <div class="menu-gap">|</div>
    <ElButton
      type="primary"
      text
      >任务管理</ElButton
    >
    <div class="menu-gap">|</div>
    <ElButton
      type="primary"
      @click="onLogoutClick"
      text
      >注销登录</ElButton
    >
  </div>
</template>

<script lang="ts" setup>
import { logout } from '@/api/user';
import errorHandler from '@/plugins/error-handler';
import { useUserStore } from '@/stores/user-store';
import { removeToken } from '@/utils/native-store';

const userStore = useUserStore();

const router = useRouter();

function onCheckPersonalCenterClick() {
  router.push({
    name: 'personal-center',
  });
}

async function onLogoutClick() {
  try {
    await logout();
    removeToken();
    userStore.$reset();
    window.location.reload();
  } catch (error) {
    errorHandler(error);
  }
}
</script>

<style lang="scss">
.main-header-menu {
  color: var(--el-color-primary);
  font-size: 14px;

  .msg-count {
    display: flex;
    align-items: center;
    margin-left: 4px;
  }

  .menu-gap {
    display: flex;
    line-height: 1em;
  }
}
</style>
