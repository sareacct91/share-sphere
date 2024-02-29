function renderHomePage(req, res) {
  const { logged_in } = req.session;

  res.render('homepage', { logged_in, layout: 'main' });
};


function renderLoginSignupPage(req, res) {
  if (req.session.logged_in) {
    return res.redirect('/');
  }

  res.render('loginSignup');
}

module.exports = {
  renderHomePage,
  renderLoginSignupPage,
}