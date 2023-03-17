import { required as vRequired, numeric as vNumeric, helpers } from '@vuelidate/validators';

export const required = helpers.withMessage('该项不能为空', vRequired);
export const numeric = helpers.withMessage('该项必须为数字', vNumeric);
export const sameWithNewPassword = helpers.withMessage(
  '密码不一致',
  (value, formObj) => value === formObj.password,
);
export const greaterThanZero = helpers.withMessage('该项必须大于0', (value: number) => value > 0);
export const isCapitalize = helpers.withMessage('必须是大写的英文字母', (val: string) => {
  if (val) {
    const reg = /^[A-Z]+$/;
    return reg.test(val);
  }
  return true;
});
