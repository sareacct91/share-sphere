const router = require('express').Router();
const c = require('../../controllers/userController');

router.post('/signup', c.renderSignedUp);
router.post('/login', c.renderLoggedIn);
router.post('/logout', c.renderLoggedOut);

module.exports = router;
