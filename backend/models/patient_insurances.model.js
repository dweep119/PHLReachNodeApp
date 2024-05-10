var knex = require('../config/knex');

exports.createPatientInsurance = async (data) => {
  let queryRes = await knex('patient_insurances').insert(data)
  return queryRes;
}

exports.getInsuranceByPatientId = async (id) => {
  let queryRes = await knex.select().from('patient_insurances').where('patientId', id);
  return queryRes;
}