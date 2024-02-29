const router = require('express').Router();
const c = require('../../controllers/messageBoardController');


router.get('/', c.renderMessageBoardPage);


module.exports = router;