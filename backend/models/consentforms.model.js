var knex = require('../config/knex');

exports.getConsentFormsData = async () => {
  let queryRes = await knex.select().from('consent_forms')
  return queryRes
}