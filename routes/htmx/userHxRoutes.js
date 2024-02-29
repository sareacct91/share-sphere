const router = require('express').Router();
const c = require('../../controllers/userController');
const withAuth = require('../../utils/auth');

router.post('/signup', c.renderSignedUp);
router.post('/login', c.renderLoggedIn);
router.post('/logout', c.renderLoggedOut);
router.get('/profile', withAuth, c.renderUserProfilePage);

module.exports = router;
