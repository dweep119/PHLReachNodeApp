const { v4: uuidv4 } = require('uuid');
var patientDemographicsModel = require('../models/patient_demographics.model');
var appointmentsModel = require('../models/appointments.model');
var patientInsuranceModel = require('../models/patient_insurances.model');
var patientQuestionModel = require('../models/patient_questions.model');
var log = require('log4js').getLogger("setSQLDataController");

exports.saveAppointmentData = async (req, res) => {
  try {
    log.info("save appointment data", JSON.stringify(req.body));
    let patientReq = req.body.patientDemographic;
    patientReq.id = uuidv4();
    let appointmentReq = req.body.appointment;
    appointmentReq.id = uuidv4();
    appointmentReq.patientId = patientReq.id;
    let patientInsuraceReq = req.body.patientInsurance;
    patientInsuraceReq.id = uuidv4();
    patientInsuraceReq.patientId = patientReq.id;
    let patientData = await patientDemographicsModel.createPatient(patientReq);
    let appointmentData = await appointmentsModel.createAppointment(appointmentReq);
    let patientInsuranceData = await patientInsuranceModel.createPatientInsurance(patientInsuraceReq);
    if (req.body.patientQuestions && req.body.patientQuestions.length > 0) {
      req.body.patientQuestions.map(async (item) => {
        item.id = uuidv4();
        item.patientId = patientReq.id;
        if (item.Answers.length > 1) {
          let arr = item.Answers.filter(function (entry) { return entry.trim() !== ''; });
          item.Answers = arr.join();
        }
        let patientQuestionData = await patientQuestionModel.createPatientQuestions(item);
      });
    }
    res.send({ status: true, message: "Appointment booked successfully" })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}