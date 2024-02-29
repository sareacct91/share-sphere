const { User } = require('../models');
const { BadRequestError, InternalServerError, } = require('../utils/errors');

const {createUser, findOneByEmail, } = require('../utils/queries/user');

async function renderSignedUp(req, res) {
  const { name, username, email, password, community_id } = req.body;

  const inputData = {
    name: name.trim(),
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
    community_id
  }

  const user = await createUser(inputData);

  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.status(200).header('hx-redirect', '/').end();
  });
};

async function renderLoggedIn(req, res) {
  const { email, password } = req.body;

  const inputData = {
    email: email.trim(),
    password: password.trim()
  }

  const user = await findOneByEmail(inputData.email);

  if (!await user.checkPassword(inputData.password)) {
    throw new BadRequestError('login', 'Incorrect email or password, please try again');
  }

  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.status(200).header('hx-redirect', '/').end();
  });
}

async function renderLoggedOut(req, res) {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).header('hx-redirect', '/').end();
    });
  } else {
    throw new InternalServerError('logout', 'An error occurred during logout');
  }
}

async function renderUserProfilePage(req, res) {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Post,
      include: {
      model: User,
      attributes: ["name", "username"],
    }, },
    { model: Material,
      include: {
      model: User,
      attributes: ["name"],
    }, }],
  });

  const user = userData.get({ plain: true });

  res.render('profile', {
    ...user,
    logged_in: req.session.logged_in
  });
}

module.exports = {
  renderSignedUp,
  renderLoggedIn,
  renderLoggedOut,
  renderUserProfilePage,
  
}