export type ApiRequestMethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Request = (
  method: ApiRequestMethodType, data: Record<string, any>,
) => Promise<Req>;

export interface Req<T = any, E = any> {
  data?: T;
  error?: E;
}
