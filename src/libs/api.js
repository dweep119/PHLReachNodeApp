const javaURL = "https://api.prismtravelpassport.com/api/v1";
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

export async function getData(locationId) {
  const data = await fetch(`${url}/getSQLData/${locationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const _data = await data.json();
  return _data;
}

export async function getLocations() {
  const data = await fetch(`${url}/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const _data = await data.json();
  return _data;
}

export async function getAppointmentAndPatientData(appointmentId, patientId) {
  const data = await fetch(`${url}/getSQLData/${appointmentId}/${patientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const _data = await data.json();
  return _data;
}

export async function documentsScan(formData) {
  const data = await fetch('https://app.nanonets.com/api/v2/OCR/Model/50afe7a1-7b2f-4c62-bcaa-5532b67479e9/LabelFile/', {
    headers: {
      'Authorization': 'Basic ' + Buffer.from('5xvA-9VchZ0TJf5Ll_5avOlpnSQvL0gG' + ':').toString('base64')
    },
    method: "POST",
    body: formData,
  });

  const _data = await data.json();
  return _data;
}

export async function sendOtp(date) {
  const data = await fetch(`${javaURL}/auth/generateAndSendOtp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  });

  const _data = await data.json();
  return _data;
}

export async function verifyEmailOtp(obj) {
  const data = await fetch(`${javaURL}/auth/verifyOtp/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const _data = await data.json();
  return _data;
}

export async function verifyMobileOtp(obj) {
  const data = await fetch(`${javaURL}/auth/verifyOtp/mobile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
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