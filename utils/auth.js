const withAuth = (req, res, next) => {
  // console.log(req.session);
  // console.log(req.headers);
  if (!req.session.loggedIn) {
    if (req.headers['hx-request']) {
      // console.log('\n\n here \n\n');
      return res.status(200).set('hx-redirect', '/loginSignup').end();
    }
    return res.redirect('/loginSignup');

  } else {
    next();
  }
};

module.exports = withAuth;
