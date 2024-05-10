
var knex = require('../config/knex');

exports.getLocationsData = async () => {
  let queryRes = await knex.select().from('locations');
  return queryRes
}