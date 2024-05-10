var knex = require('../config/knex');

exports.getQuestionsData = async () => {
  let queryRes = await knex.select().from('questions')
  return queryRes
}