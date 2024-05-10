let moment = require("moment");
var locationsModel = require('../models/locations.model');

exports.getLocationsData = async (req, res) => {
	try {
		let response = await locationsModel.getLocationsData();
		let locationList = [];
		response.map(item => {
			let obj = {
				"label": item.locationName,
				"value": item.id
			}
			locationList.push(obj);
		});
		res.send({ status: true, message: "All location data get successfully", data: { locationList } })
	} catch (error) {
		res.send({ status: false, error: error });
	}
}