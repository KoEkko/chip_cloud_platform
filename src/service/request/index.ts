import axios from "axios";

import type { AxiosInstance } from "axios";
import { _RequestConfig } from "./type";

class _Request {
	instance: AxiosInstance;

	// request
	constructor(config: _RequestConfig) {
		this.instance = axios.create(config);

		// add interceptors
		this.instance.interceptors.request.use(
			(config) => {
				// loading / token
				return config;
			},
			(err) => {
				return err;
			}
		);
		this.instance.interceptors.response.use(
			(res) => {
				return res.data;
			},
			(err) => {
				return err;
			}
		);

		// 特定的_request实例添加拦截器
		this.instance.interceptors.request
			.use
			// config.interceptors?.requestSuccessFn,
			// config.interceptors?.requestFailureFn
			();
	}

	// 封装网络请求

	request<T = any>(config: _RequestConfig<T>) {
		// 单次请求的成功拦截处理
		if (config.interceptors?.requestSuccessFn) {
			config = config.interceptors.requestSuccessFn(config);
		}

		return new Promise<T>((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 单次响应的成功拦截处理
					if (config.interceptors?.responseSuccessFn) {
						res = config.interceptors.responseSuccessFn(res);
					}
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	get<T = any>(config: _RequestConfig<T>) {
		return this.request({ ...config, method: "GET" });
	}
	post<T = any>(config: _RequestConfig<T>) {
		return this.request({ ...config, method: "POST" });
	}
	delete<T = any>(config: _RequestConfig<T>) {
		return this.request({ ...config, method: "DELETE" });
	}
	patch<T = any>(config: _RequestConfig<T>) {
		return this.request({ ...config, method: "PATCH" });
	}
}

export default _Request;
