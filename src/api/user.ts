import request from '@/utils/request/request';

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginData = {
  token: string;
};

export async function login(body: LoginBody) {
  return request.post<JsonBody<LoginData>>('/user/login', body);
}

export type UserinfoData = {};

export async function getUserinfo() {
  return request.get<JsonBody<UserinfoData>>('/user/info');
}

export async function logout() {
  return request.post('/user/logout');
}
