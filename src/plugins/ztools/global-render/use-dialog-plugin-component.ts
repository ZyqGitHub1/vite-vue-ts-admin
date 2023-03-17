import { ref, getCurrentInstance, type EmitsOptions } from 'vue';

const trueFn = () => true;

function getEmitsObject(emitsArray: string[]) {
  const emitsObject: EmitsOptions = {};

  emitsArray.forEach((val) => {
    emitsObject[val] = trueFn;
  });

  return emitsObject;
}

function useDialogPluginComponent() {
  const currentInstance = getCurrentInstance();
  if (!currentInstance) {
    throw new Error('currentInstance is null');
  }

  const { emit } = currentInstance;
  const visible = ref(true);

  function hide() {
    visible.value = false;
  }

  function onDialogOK(payload?: any) {
    emit('ok', payload);
    hide();
  }

  function onDialogHide() {
    emit('hide');
  }

  return {
    visible,
    onDialogHide,
    onDialogOK,
    onDialogCancel: hide,
  };
}

const emits = ['ok', 'hide'];

useDialogPluginComponent.emits = emits;
useDialogPluginComponent.emitsObject = getEmitsObject(emits);

export default useDialogPluginComponent;
