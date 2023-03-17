<script lang="ts">
import { ref, h, Teleport, markRaw, watch, type Component, type Raw } from 'vue';

import { useRoute } from 'vue-router';

const uidKey = Symbol('uid');

type GlobalComponent = {
  [uidKey]: string;
  component: Raw<Component>;
  options: any;
  onOk: (data: any) => void;
  onHide: (api: GlobalComponent) => void;
};

const globalComponentList = ref<GlobalComponent[]>([]);

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const useGlobalRender = (component: Component, options?: any) => {
  let emittedOK = false;
  const okFns: Array<(data: any) => void> = [];
  const cancelFns: Array<() => void> = [];
  const onHide = (api: GlobalComponent) => {
    if (emittedOK !== true) {
      cancelFns.forEach((fn) => {
        fn();
      });
    }
    globalComponentList.value = globalComponentList.value.filter(
      (item) => item[uidKey] !== api[uidKey],
    );
  };
  const onOk = (data: any) => {
    emittedOK = true;
    okFns.forEach((fn) => {
      fn(data);
    });
  };

  const globalComponent: GlobalComponent = {
    [uidKey]: makeid(32),
    component: markRaw(component),
    options,
    onOk,
    onHide,
  };
  const API = {
    onOk(fn: (data: any) => void) {
      okFns.push(fn);
      return API;
    },
    onCancel(fn: () => void) {
      cancelFns.push(fn);
      return API;
    },
    onDismiss(fn: () => void) {
      okFns.push(fn);
      cancelFns.push(fn);
      return API;
    },
    hide() {
      onHide(globalComponent);
      return API;
    },
  };

  globalComponentList.value.push(globalComponent);

  return API;
};
</script>
<script lang="ts" setup>
const route = useRoute();
watch(route, () => {
  globalComponentList.value.forEach((item) => {
    item.onHide(item);
  });
});
const render = () =>
  h(
    Teleport,
    {
      to: 'body',
      disable: false,
    },
    globalComponentList.value.map((item) =>
      h(item.component, {
        ...item.options,
        onHide: () => item.onHide(item),
        onOk: (data: typeof item.component) => item.onOk(data),
      }),
    ),
  );
</script>

<template>
  <render />
</template>
