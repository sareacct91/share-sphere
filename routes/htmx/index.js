const router = require('express').Router();
const c = require('../../controllers/homeController');
const withAuth = require('../../utils/auth');
const pageRedirect = require('../../utils/redirect');

const userRoutes = require('./userRoutes');

router.get('/', c.renderHomePage);
router.use(pageRedirect);
router.get('/loginSignup', c.renderLoginSignupPage);
router.use('/users', userRoutes);
router.use(withAuth);


module.exports = router;