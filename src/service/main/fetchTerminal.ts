import _request from "..";

export function getCommandApi(value: string) {
	const data = JSON.stringify({ code: value });
	return _request
		.post({
			headers: {
				"Content-Type": "application/json",
			},
			url: "code",
			data,
		})
		.catch((err) => {
			return err;
		});
}
