const url = "https://phl-react-api.prismtravelpassport.com/api/v1";
// const url = "http://localhost:8000/api/v1";

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

export async function bookAppointment(obj) {
	const data = await fetch(`${url}/setSQLData`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	});

	const _data = await data.json();
	return _data;
}