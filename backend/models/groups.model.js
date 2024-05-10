var knex = require('../config/knex');

exports.getGroupData = async () => {
  let queryRes = await knex.select().from('groups')
  return queryRes
}