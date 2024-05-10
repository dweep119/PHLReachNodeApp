var eventModel = require('../models/events.model');
var testModel = require('../models/tests.model');

exports.getTestData = async (req, res) => {
  try {
    let queryRes = await testModel.getAllTestData();
    let testList = queryRes;

    res.send({ status: true, message: "All event data get successfully", data: { testList } })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}

exports.getTestDataBaesdOnLocation = async (req, res) => {
  try {
    let queryRes = await eventModel.getEventsData(req.params.locationId);
    let testList = queryRes[0][0].testList;

    res.send({ status: true, message: "All event data get successfully", data: { testList } })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}