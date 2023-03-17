import store from 'store2';

const TokenKey = 'anfou-inst-web';

export function getToken() {
  const localStoreToken = store.get(TokenKey);
  if (localStoreToken) {
    return localStoreToken;
  }
  return store.session.get(TokenKey);
}

export function setToken(token: string) {
  return store.set(TokenKey, token);
}

export function setSessionToken(token: string) {
  return store.session.set(TokenKey, token);
}

export function removeToken() {
  return store.remove(TokenKey);
}
