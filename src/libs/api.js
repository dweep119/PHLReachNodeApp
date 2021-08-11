const url = "https://phl-react-api.prismtravelpassport.com/api/v1";

export async function sendData() {
	const data = await fetch(`${url}/sendData`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	const _data = await data.json();
	return _data;
}

export async function getData() {
	const data = await fetch(`${url}/getSQLData`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	const _data = await data.json();
	return _data;
}