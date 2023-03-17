<template>
  <div class="login-container">
    <div class="login-form-container">
      <div class="text-white text-center mb-4 text-2xl">LOGIN</div>
      <ElForm>
        <ElFormItem :error="em(v$.username)">
          <ElInput
            v-model="username"
            placeholder="username"
            @keyup.enter="onLoginClick"
          />
        </ElFormItem>
        <ElFormItem :error="em(v$.password)">
          <ElInput
            v-model="password"
            type="password"
            placeholder="password"
            show-password
            @keyup.enter="onLoginClick"
          />
        </ElFormItem>
        <ElButton
          :loading="loading"
          class="w-full"
          type="primary"
          @click="onLoginClick"
          >login</ElButton
        >
      </ElForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { required, numeric } from '@/utils/vuelidate/vuelidate-rules';
import { em } from '@/utils/vuelidate/vuelidate-helper';
import errorHandler from '@/plugins/error-handler';
import { setToken } from '@/utils/native-store';
import { login } from '@/api/user';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();

const username = ref('');
const password = ref('');

const loading = ref(false);

const rules = {
  username: {
    required,
    numeric,
  },
  password: {
    required,
  },
};

const v$ = useVuelidate(rules, { username, password });

const router = useRouter();

const onLoginClick = async () => {
  try {
    loading.value = true;
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
      const loginData = await login({
        username: username.value,
        password: password.value,
      });
      setToken(loginData.data.data.token);
      await userStore.fetchUserinfo();
      router.replace({
        name: 'home',
      });
    }
  } catch (error) {
    errorHandler(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.login-container {
  background-color: #2d3a4b;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form-container {
    width: 520px;

    .el-form-item {
      border-radius: 5px;
    }
  }
}
</style>
