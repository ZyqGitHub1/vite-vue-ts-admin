export {};
declare global {
  export interface JsonBody<T> {
    data: T;
  }
}
