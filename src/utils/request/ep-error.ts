export function isInternalError(errorCode: number) {
  return errorCode.toString().startsWith('5') || errorCode.toString().startsWith('4');
}
export const errorHandler = (error: any) => {
  const { response } = error;
  const { status } = response;
  if (isInternalError(status)) {
    if (status === 403) {
      ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '用户凭据失效').then(
        () => {
          window.location.reload();
        },
      );
    }
  }
  return Promise.reject(error);
};
