
var knex = require('../config/knex');

exports.getPatientsData = async (name) => {
  let queryRes = await knex.select('id', 'firstName', 'lastName', 'dob').from('patient_demographics').where('firstName', 'like', `%${name}%`).orWhere('lastName', 'like', `%${name}%`);
  return queryRes
}

exports.getPatientsDataByID = async (patientId) => {
  let queryRes = await knex.select('id', 'firstName', 'lastName', 'dob').from('patient_demographics').where('id', patientId);
  return queryRes
}