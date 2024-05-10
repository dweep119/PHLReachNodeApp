var knex = require('../config/knex');

var eventServiceModel = require('./event_service.model');
var testsModel = require('./tests.model');

exports.getEventsData = async (locationId) => {
  let queryRes = await knex.select().from('events').where('assignedLocationId', locationId);
  let testList = [];
  const promises = queryRes.map(async (item) => {
    let eventServiceList = await eventServiceModel.getEventServiceData(item.id);

    const promises1 = eventServiceList.map(async (eService) => {
      testList = await testsModel.getTestData(eService.testId);
      return {eventList: queryRes, testList}
    });

    const results1 = await Promise.all(promises1);

    return results1;
  });

  const results = await Promise.all(promises);

  return results;
}