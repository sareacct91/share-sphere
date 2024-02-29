const router = require('express').Router();

// const apiRoutes = require('./api');
const htmxRoutes = require('./htmx');
// const homeRoutes = require('./homeRoutes');

router.use('/', htmxRoutes);
// router.use('/api', apiRoutes);


module.exports = router;