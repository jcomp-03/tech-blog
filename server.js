const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection_postgres');
// const sequelize = require('./config/connection_mysql');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up an Express.js session and connect the session to our Sequelize database
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// The express.static() method is a built-in Express.js middleware
// function that can take all of the contents of a folder and
// serve them as static assets. This is useful for front-end specific
// files like images, style sheets, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(controllers);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
        console.log(`Now listening on port ${PORT}.`);
        console.log(`******************************`);
    });
});