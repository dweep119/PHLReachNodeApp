let moment = require("moment");
let Events = require("../models/newevents");
let Locations = require("../models/locations");
let Groups = require("../models/groups");
let Insurancecompanies = require("../models/insurancecompanies");
let Questions = require("../models/questions");
let Demographics = require("../models/demographics");
let Relationships = require("../models/relationships");

dataController = {};

dataController.getData = (req, res) => {
  Events.find()
    .then(async events => {
      let eventList = [];
      events.map((item) => {
        let event = {
          "_id": item._id,
          "assignedLocationId": item.assignedLocationId,
          "eventDate": item.eventDate,
          "startTime": item.startTime,
          "endTime": item.endTime,
          "patientsPerBlock": item.patientsPerBlock,
          "blocksPerHour": item.blocksPerHour
        }
        let generatedSlots = [];
        let nextSlot = (60 / item.blocksPerHour);
        if (item.startTime && item.endTime) {
          let startTime = moment(new Date(item.startTime)).format("HH:mm");
          let endTime = moment(new Date(item.endTime)).format("HH:mm");
          while (startTime < endTime) {
            generatedSlots.push({ "slot": startTime });
            startTime = moment(startTime, 'HH:mm').add(nextSlot, 'minutes').format('HH:mm');
          }
        }
        event.slots = generatedSlots;
        eventList.push(event);
      });
      await Locations.find()
        .then(async locationList => {
          await Demographics.find()
            .then(async demographics => {
              await Relationships.find()
                .then(async relationshipList => {
                  await Insurancecompanies.find()
                    .then(async insuranceCompanyList => {
                      await Groups.find()
                        .then(async groupList => {
                          await Questions.find()
                            .then(async questionList => {
                              res.send({ status: true, data: { eventList, locationList, demographics, relationshipList, insuranceCompanyList, groupList, questionList } });
                            }).catch(err => {
                              res.status(500).send({
                                message: "Some error occurred while retrieving questions."
                              });
                            });
                        }).catch(err => {
                          res.status(500).send({
                            message: "Some error occurred while retrieving groups."
                          });
                        });
                    }).catch(err => {
                      res.status(500).send({
                        message: "Some error occurred while retrieving insurancecompanies."
                      });
                    });
                }).catch(err => {
                  res.status(500).send({
                    message: "Some error occurred while retrieving relationships."
                  });
                });
            }).catch(err => {
              res.status(500).send({
                message: "Some error occurred while retrieving demographics."
              });
            });
        }).catch(err => {
          res.status(500).send({
            message: "Some error occurred while retrieving locations."
          });
        });
    }).catch(err => {
      res.status(500).send({
        message: "Some error occurred while retrieving events."
      });
    });

}

module.exports = dataController;