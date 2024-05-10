var knex = require('../config/knex');

exports.createPatientQuestions = async (data) => {
  let queryRes = await knex('patient_questions').insert(data)
  return queryRes;
}

exports.getQuestionsByPatientId = async (id) => {
  let queryRes = await knex.select().from('patient_questions').where('patientId', id);
  return queryRes;
}