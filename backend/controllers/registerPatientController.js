const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
var patientDemographicsModel = require('../models/patient_demographics.model');

exports.savePatientData = async (req, res) => {
  try {
    let patientReq = req.body;
    patientReq.id = uuidv4();
    patientReq.password = bcrypt.hashSync(req.body.password, 10);
    let patientData = await patientDemographicsModel.createPatient(patientReq);
    res.send({ status: true, message: "Patient register successfully" })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}