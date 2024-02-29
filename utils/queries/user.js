const { User } = require('../../models');
const { BadRequestError, } = require('../errors');


async function createUser(userData) {
  const result = await User.create(userData);

  return result;
}

async function findOneByEmail(email) {
  const result = await User.findOne({ where: { email } });

  if (!result) {
    throw new BadRequestError('login', 'Incorrect email or password, please try again');
  }

  return result;
}

module.exports = {
  createUser,
  findOneByEmail,

}