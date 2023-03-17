import { defineStore } from 'pinia';
import { getUserinfo } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const username = ref('');
  const nickname = ref('');
  const permissions = ref<{ name: string }[]>([]);

  const roleSet = computed(() => {
    return new Set(permissions.value.map((item) => item.name));
  });
  async function fetchUserinfo() {
    const { data } = await getUserinfo();
    username.value = data.data.username;
    nickname.value = data.data.nickname;
    permissions.value = data.data.permissions;
  }

  return {
    username,
    nickname,
    permissions,
    roleSet,
    fetchUserinfo,
  };
});
