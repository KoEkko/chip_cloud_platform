let BASE_URL = "";

if (import.meta.env.PROD) {
	// production
	BASE_URL = "http://118.24.150.38:84";
} else {
	// development
	BASE_URL = "/api";
}

export const TIME_OUT = 10000;
export { BASE_URL };
