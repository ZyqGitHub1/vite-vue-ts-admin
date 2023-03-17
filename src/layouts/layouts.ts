import DefaultLayout from '@/layouts/default/default-layout.vue';
import SimpleLayout from '@/layouts/simple/simple-layout.vue';

const layouts = {
  DefaultLayout,
  SimpleLayout,
};

export default layouts;

export type Layout = keyof typeof layouts;
