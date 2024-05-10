
var knex = require('../config/knex');

exports.getLinkShortenerData = async () => {
  let queryRes = await knex.select().from('link_shortener')
  return queryRes
}