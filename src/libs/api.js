const url = "http://localhost:8000/api/v1";

export async function getData() {
	const data = await fetch(`${url}/sendData`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	const _data = await data.json();
	return _data;
}