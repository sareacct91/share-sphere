const router = require('express').Router();
const c = require('../../controllers/homeController');
const withAuth = require('../../utils/auth');
const pageRedirect = require('../../utils/redirect');

const userHxRoutes = require('./userHxRoutes');
const messageBoardHxRoutes = require('./messageBoardHxRoutes');

router.get('/', c.renderHomePage);
router.use(pageRedirect);
router.get('/loginSignup', c.renderLoginSignupPage);
router.use('/users', userHxRoutes);
router.use(withAuth);
router.use('/messageBoard', messageBoardHxRoutes);

module.exports = router;