let moment = require("moment");
var eventModel = require('../models/events.model');
var choiceModel = require('../models/choice.model');
var groupModel = require('../models/groups.model');
var questionModel = require('../models/questions.model');
var appointmentModel = require('../models/appointments.model');
var consentformsModel = require('../models/consentforms.model');
var patientDemographicsModel = require('../models/patient_demographics.model');
var patientInsurancesModel = require('../models/patient_insurances.model');
var patientQuestionsModel = require('../models/patient_questions.model');

exports.getEventsData = async (req, res) => {
  try {
    let queryRes = await eventModel.getEventsData(req.params.locationId);
    let groupList = await groupModel.getGroupData();
    let questionList = await questionModel.getQuestionsData();
    let choiceList = await choiceModel.getChoiceData();
    let appointmentList = await appointmentModel.getAppointmentsData();
    let consentformList = await consentformsModel.getConsentFormsData();
    let eventList = [];
    let demographics = [];
    let insuranceCompanyList = [];
    let relationshipList = [];
    let testList = queryRes[0][0].testList;
    queryRes[0][0].eventList.map(async (item) => {
      let generatedSlots = [];
      let nextSlot = (60 / item.blocksPerHour);
      if (item.startTime && item.endTime) {
        let startTime = moment(new Date(item.startTime)).format("HH:mm");
        let endTime = moment(new Date(item.endTime)).format("HH:mm");
        while (startTime < endTime) {
          let res = appointmentList.filter(app => {
            if (moment(new Date(app.appointmentDate)).format("MM/DD/YYYY") === moment(new Date(item.eventDate)).format("MM/DD/YYYY")) {
              if (moment(startTime, ["HH:mm"]).format("HH:mm:00") === app.slot) {
                return app;
              }
            }
          });
          if (res && res.length >= item.patientsPerBlock) {
            generatedSlots.push({ "slot": startTime, isBooked: true });
          } else {
            generatedSlots.push({ "slot": startTime, isBooked: false });
          }
          startTime = moment(startTime, 'HH:mm').add(nextSlot, 'minutes').format('HH:mm');
        }
      }
      item.slots = generatedSlots;
      eventList.push(item);
    });
    questionList.map((queItem) => {
      if (queItem.type === "choice" && queItem.choiceId) {
        let res = choiceList.filter(itm => itm.id === queItem.choiceId);
        if (res && res.length > 0) {
          queItem["choice"] = JSON.parse(res[0].values);
        }
      }
    });
    let newObj = {};
    choiceList.map((choiceItem) => {
      if (choiceItem.label === "race" || choiceItem.label === "preferredLanguage" ||
        choiceItem.label === "ethnicity" || choiceItem.label === "gender") {
        let arr = [];
        JSON.parse(choiceItem.values).map((val) => {
          let obj = {
            "key": val,
            "value": val
          }
          arr.push(obj);
        });
        newObj[choiceItem.label] = arr;
        demographics.push(newObj);
      }
      if (choiceItem.label === "insuranceCompany") {
        JSON.parse(choiceItem.values).map((val) => {
          let obj = {
            "label": val,
            "value": val
          }
          insuranceCompanyList.push(obj);
        });
      }
      if (choiceItem.label === "relationship") {
        JSON.parse(choiceItem.values).map((val) => {
          let obj = {
            "label": val,
            "value": val
          }
          relationshipList.push(obj);
        });
      }
    });
    res.send({ status: true, message: "All event data get successfully", data: { eventList, testList, demographics, insuranceCompanyList, relationshipList, groupList, questionList, consentformList } })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}

exports.getEventsDataByAppointmentId = async (req, res) => {
  try {
    let appointmentData = await appointmentModel.getAppointmentsDataById(req.params.appointmentId);
    let patientData = await patientDemographicsModel.getPatientDataById(req.params.patientId);
    let insuranceData = await patientInsurancesModel.getInsuranceByPatientId(req.params.patientId);
    let questionData = await patientQuestionsModel.getQuestionsByPatientId(req.params.patientId);

    // let groupList = await groupModel.getGroupData();
    // let questionList = await questionModel.getQuestionsData();
    // let choiceList = await choiceModel.getChoiceData();
    // let consentformList = await consentformsModel.getConsentFormsData();
    // let eventList = [];
    // let demographics = [];
    // let insuranceCompanyList = [];
    // let relationshipList = [];
    // let testList = queryRes[0][0].testList;
    // queryRes[0][0].eventList.map(async (item) => {
    //   let generatedSlots = [];
    //   let nextSlot = (60 / item.blocksPerHour);
    //   if (item.startTime && item.endTime) {
    //     let startTime = moment(new Date(item.startTime)).format("HH:mm");
    //     let endTime = moment(new Date(item.endTime)).format("HH:mm");
    //     while (startTime < endTime) {
    //       let res = appointmentList.filter(app => {
    //         if (moment(new Date(app.appointmentDate)).format("MM/DD/YYYY") === moment(new Date(item.eventDate)).format("MM/DD/YYYY")) {
    //           if (moment(startTime, ["HH:mm"]).format("HH:mm:00") === app.slot) {
    //             return app;
    //           }
    //         }
    //       });
    //       if (res && res.length >= item.patientsPerBlock) {
    //         generatedSlots.push({ "slot": startTime, isBooked: true });
    //       } else {
    //         generatedSlots.push({ "slot": startTime, isBooked: false });
    //       }
    //       startTime = moment(startTime, 'HH:mm').add(nextSlot, 'minutes').format('HH:mm');
    //     }
    //   }
    //   item.slots = generatedSlots;
    //   eventList.push(item);
    // });
    // questionList.map((queItem) => {
    //   if (queItem.type === "choice" && queItem.choiceId) {
    //     let res = choiceList.filter(itm => itm.id === queItem.choiceId);
    //     if (res && res.length > 0) {
    //       queItem["choice"] = JSON.parse(res[0].values);
    //     }
    //   }
    // });
    // let newObj = {};
    // choiceList.map((choiceItem) => {
    //   if (choiceItem.label === "race" || choiceItem.label === "preferredLanguage" ||
    //     choiceItem.label === "ethnicity" || choiceItem.label === "gender") {
    //     let arr = [];
    //     JSON.parse(choiceItem.values).map((val) => {
    //       let obj = {
    //         "key": val,
    //         "value": val
    //       }
    //       arr.push(obj);
    //     });
    //     newObj[choiceItem.label] = arr;
    //     demographics.push(newObj);
    //   }
    //   if (choiceItem.label === "insuranceCompany") {
    //     JSON.parse(choiceItem.values).map((val) => {
    //       let obj = {
    //         "label": val,
    //         "value": val
    //       }
    //       insuranceCompanyList.push(obj);
    //     });
    //   }
    //   if (choiceItem.label === "relationship") {
    //     JSON.parse(choiceItem.values).map((val) => {
    //       let obj = {
    //         "label": val,
    //         "value": val
    //       }
    //       relationshipList.push(obj);
    //     });
    //   }
    // });
    // res.send({ status: true, message: "All event data get successfully", data: { eventList, testList, demographics, insuranceCompanyList, relationshipList, groupList, questionList, consentformList } })
    res.send({ status: true, message: "All event data get successfully", data: { appointmentData, patientData, insuranceData, questionData } })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}

exports.getEventsDataByPatientId = async (req, res) => {
  try {
    let patientData = await patientDemographicsModel.getPatientDataById(req.params.patientId);
    let insuranceData = await patientInsurancesModel.getInsuranceByPatientId(req.params.patientId);
    let questionData = await patientQuestionsModel.getQuestionsByPatientId(req.params.patientId);

    // let groupList = await groupModel.getGroupData();
    // let questionList = await questionModel.getQuestionsData();
    // let choiceList = await choiceModel.getChoiceData();
    // let consentformList = await consentformsModel.getConsentFormsData();
    // let eventList = [];
    // let demographics = [];
    // let insuranceCompanyList = [];
    // let relationshipList = [];
    // let testList = queryRes[0][0].testList;
    // queryRes[0][0].eventList.map(async (item) => {
    //   let generatedSlots = [];
    //   let nextSlot = (60 / item.blocksPerHour);
    //   if (item.startTime && item.endTime) {
    //     let startTime = moment(new Date(item.startTime)).format("HH:mm");
    //     let endTime = moment(new Date(item.endTime)).format("HH:mm");
    //     while (startTime < endTime) {
    //       let res = appointmentList.filter(app => {
    //         if (moment(new Date(app.appointmentDate)).format("MM/DD/YYYY") === moment(new Date(item.eventDate)).format("MM/DD/YYYY")) {
    //           if (moment(startTime, ["HH:mm"]).format("HH:mm:00") === app.slot) {
    //             return app;
    //           }
    //         }
    //       });
    //       if (res && res.length >= item.patientsPerBlock) {
    //         generatedSlots.push({ "slot": startTime, isBooked: true });
    //       } else {
    //         generatedSlots.push({ "slot": startTime, isBooked: false });
    //       }
    //       startTime = moment(startTime, 'HH:mm').add(nextSlot, 'minutes').format('HH:mm');
    //     }
    //   }
    //   item.slots = generatedSlots;
    //   eventList.push(item);
    // });
    // questionList.map((queItem) => {
    //   if (queItem.type === "choice" && queItem.choiceId) {
    //     let res = choiceList.filter(itm => itm.id === queItem.choiceId);
    //     if (res && res.length > 0) {
    //       queItem["choice"] = JSON.parse(res[0].values);
    //     }
    //   }
    // });
    // let newObj = {};
    // choiceList.map((choiceItem) => {
    //   if (choiceItem.label === "race" || choiceItem.label === "preferredLanguage" ||
    //     choiceItem.label === "ethnicity" || choiceItem.label === "gender") {
    //     let arr = [];
    //     JSON.parse(choiceItem.values).map((val) => {
    //       let obj = {
    //         "key": val,
    //         "value": val
    //       }
    //       arr.push(obj);
    //     });
    //     newObj[choiceItem.label] = arr;
    //     demographics.push(newObj);
    //   }
    //   if (choiceItem.label === "insuranceCompany") {
    //     JSON.parse(choiceItem.values).map((val) => {
    //       let obj = {
    //         "label": val,
    //         "value": val
    //       }
    //       insuranceCompanyList.push(obj);
    //     });
    //   }
    //   if (choiceItem.label === "relationship") {
    //     JSON.parse(choiceItem.values).map((val) => {
    //       let obj = {
    //         "label": val,
    //         "value": val
    //       }
    //       relationshipList.push(obj);
    //     });
    //   }
    // });
    // res.send({ status: true, message: "All event data get successfully", data: { eventList, testList, demographics, insuranceCompanyList, relationshipList, groupList, questionList, consentformList } })
    res.send({ status: true, message: "All event data get successfully", data: { patientData, insuranceData, questionData } })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}