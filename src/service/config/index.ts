let BASE_URL = "";

if (import.meta.env.PROD) {
	// production
	BASE_URL = "";
} else {
	// development
	BASE_URL = "";
}

export const TIME_OUT = 10000;
export { BASE_URL };
