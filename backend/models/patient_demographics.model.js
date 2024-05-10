var knex = require('../config/knex');

exports.createPatient = async (data) => {
  let queryRes = await knex('patient_demographics').insert(data)
  return queryRes;
}

exports.getPatientDataById = async (id) => {
  let queryRes = await knex.select().from('patient_demographics').where('id', id);
  return queryRes;
}