import { isAxiosError } from 'axios';

export default function errorHandler(error: any, messageText = '系统内部异常') {
  console.error(error);
  if (!isAxiosError(error)) {
    ElMessage.error({
      showClose: true,
      message: messageText,
    });
  } else {
    const { response } = error;
    const data = response?.data;
    const message = data?.message ?? messageText;
    ElMessage.error({
      showClose: true,
      message: `[服务错误] ${message}`,
    });
  }
}
