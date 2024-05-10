var linkShortenerModel = require('../models/link_shortener.model');

exports.redirectToURL = async (req, res) => {
  try {
    let queryRes = await linkShortenerModel.getLinkShortenerData()
    let result = queryRes.filter(item => item.code === req.params.code);
    if (result.length > 0) {
      res.redirect(result[0].redirectURL);
    } else {
      res.status(404).send('We are sorry, the page you requested cannot be found.')
    }
    // res.send({ status: true, message: "All event data get successfully", data: { eventList, demographics, insuranceCompanyList, relationshipList, groupList, questionList, consentformList } })
  } catch (error) {
    res.send({ status: false, error: error });
  }
}