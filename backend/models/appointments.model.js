
var knex = require('../config/knex');

exports.createAppointment = async (data) => {
  let queryRes = await knex('appointments').insert(data)
  return queryRes;
}

exports.getAppointmentsData = async () => {
  let queryRes = await knex.select().from('appointments')
  return queryRes
}

exports.getAppointmentsDataById = async (id) => {
  let queryRes = await knex.select().from('appointments').where('id', id);
  return queryRes
}

exports.getAppointmentsDataBasedOnPatientId = async (patientId) => {
  let queryRes = await knex.select().from('appointments').where('patientId', patientId);
  return queryRes
}