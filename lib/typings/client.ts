import { AxiosResponse, AxiosRequestConfig } from 'axios';

export type IntercomVersion = '1.0' | '1.1' | '1.2' | '1.3' | '1.4' | '2.0';
export abstract class IClient {
	public get: <R, Q>(endpoint: string, query?: Q) => Promise<AxiosResponse<R>>;
	public put: <R, D>(endpoint: string, data: D) => Promise<AxiosResponse<R>>;
	public post: <R, D>(endpoint: string, data: D) => Promise<AxiosResponse<R>>;
	public delete: <R, Q>(endpoint: string, query?: Q) => Promise<AxiosResponse<R>>;
}
