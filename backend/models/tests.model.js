var knex = require('../config/knex');

exports.getTestData = async (testId) => {
  let queryRes = await knex.select().from('tests').where('id', testId)
  return queryRes
}

exports.getAllTestData = async (testId) => {
  let queryRes = await knex.select().from('tests')
  return queryRes
}