var knex = require('../config/knex');

exports.getEventServiceData = async (eventId) => {
  let queryRes = await knex.select().from('event_service').where('eventId', eventId)
  return queryRes
}