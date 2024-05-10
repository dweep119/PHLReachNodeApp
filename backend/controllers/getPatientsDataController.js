let moment = require("moment");
var _ = require('lodash');
var appointmentModel = require('../models/appointments.model');
var patientsModel = require('../models/patients.model');

exports.getPatientsData = async (req, res) => {
	try {
		let response = await patientsModel.getPatientsData(req.params.name);
    let patientList = _.sortBy(response, [function(o) { return o.firstName; }]);
		// let locationList = [];
		// response.map(item => {
		// 	console.log(item)
		// 	let obj = {
		// 		"label": item.locationName,
		// 		"value": item.id
		// 	}
		// 	locationList.push(obj);
		// });
		res.send({ status: true, message: "All location data get successfully", data: { patientList } })
	} catch (error) {
		res.send({ status: false, error: error });
	}
}

exports.getPatientsDataBasedOnId = async (req, res) => {
	try {
		let appointments = await appointmentModel.getAppointmentsDataBasedOnPatientId(req.params.patientId);
		let patientData = await patientsModel.getPatientsDataByID(req.params.patientId);
    appointments.sort(function (a, b) {
      return new Date(b.appointmentDate) - new Date(a.appointmentDate);
    });

		res.send({ status: true, message: "All location data get successfully", data: { patientData, appointments } })
	} catch (error) {
		res.send({ status: false, error: error });
	}
}