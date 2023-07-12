import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface _Interceptors<T = AxiosResponse> {
	requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestFailureFn?: (err: T) => T;
	responseSuccessFn?: (res: T) => T;
	responseFailureFn?: (err: T) => T;
}

export interface _RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: _Interceptors<T>;
}
