require('express-async-errors');
const path = require('path');
const express = require('express');
const {create} = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const morgan = require('morgan');
// Controllers
const routes = require('./routes');

// Helpers
const helpers = require('./utils/helpers');
const errorHandler = require('./utils/error-handler');
const app = express();
const PORT = process.env.PORT;

// Creates the Handlebars.js engine object with custom helper functions
const hbs = create({ extname: 'hbs', helpers });

// // Set Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.locals.layout = false;

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(routes);
app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
