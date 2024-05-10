var knex = require('../config/knex');

exports.getChoiceData = async () => {
  let queryRes = await knex.select().from('choice')
  return queryRes
}