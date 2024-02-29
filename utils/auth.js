const withAuth = (req, res, next) => {
  // console.log(req.session);
  // console.log(req.headers);
  if (!req.session.logged_in) {
    console.log('\nauth failed\n')
    if (req.headers['hx-request']) {
      // console.log('\n\n here \n\n');
      return res.status(200).set('hx-redirect', '/loginSignup').end();
    }
    return res.redirect('/loginSignup');

  } else {
    console.log('\nauth passed\n')
    next();
  }
};

module.exports = withAuth;
