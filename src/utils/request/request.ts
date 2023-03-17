import { stringify } from 'qs';
import axios from 'axios';
import { errorHandler } from './ep-error';
import { getToken } from '../native-store';

const request = axios.create({
  baseURL: '/api/v1',
  paramsSerializer: {
    serialize: (params) =>
      stringify(params, {
        arrayFormat: 'brackets',
      }),
  },
  // 请求超时时间
  withCredentials: true,
  timeout: 5000,
});

request.interceptors.request.use(
  (requestConfig) => {
    if (!requestConfig.headers.has('x-auth-token')) {
      const token = getToken();
      if (token) {
        requestConfig.headers.set('x-auth-token', token);
      }
    }

    return requestConfig;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use((response) => response, errorHandler);

export default request;
