import { BASE_URL, TIME_OUT } from "./config";
import _Request from "./request";

const _request = new _Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {},
});

export default _request;
