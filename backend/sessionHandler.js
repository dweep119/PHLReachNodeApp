const sendLocationIdCookie = (locationId, res) => {
  var expiryDate = new Date(Number(new Date()) + 315360000000);
  res.cookie('locationId', locationId,
    {
      domain: '.prismtravelpassport.com',
      expires: expiryDate,
      // httpOnly: true,
      secure: true,
      path: '/'
    });
};

// returns an object with the cookies' name as keys
const getAppCookies = (req) => {
  // We extract the raw cookies from the request headers
  if (req.headers && req.headers['set-cookie']) {
    return req.headers['set-cookie'][0];
  } else {
    return sessions;
  }

};

// Our application store is stateful and uses a variable
let sessions = "";

const sessionHandler = (req, res, next) => {
  // extracting the user id from the session
  let locationId = getAppCookies(req, res);

  if (locationId) {
    sessions = locationId;
  }
  sendLocationIdCookie(locationId, res);
  // }

  req.session = sessions;
  // Now in our route handlers you'll have session information in req.session
  next();
};

module.exports = sessionHandler;