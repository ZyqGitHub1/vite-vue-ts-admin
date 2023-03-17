import type { BaseValidation } from '@vuelidate/core';

export const em = (target: BaseValidation) => target.$errors[0]?.$message as string;
