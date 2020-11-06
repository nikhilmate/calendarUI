const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const db = require('./models');
const compression = require('compression');
var cookieParser = require('cookie-parser');

const app = express();

// body parser for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cokkies enabled
app.use(cookieParser());

// csrf enable through cookie
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// compression data
app.use(compression());

// cors
const corsOptions = {
    origin: 'http://localhost:5011'
};
app.use(cors(corsOptions));

// log output
const logger = require('winston');

// passport auth/support
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

// routes
require('./routes/common_routes.js')(app);
require('./routes/user_routes.js')(app, __dirname, passport);
require('./routes/task_routes.js')(app, passport);
require('./routes/note_routes.js')(app, passport);

// static files(o/p)
const staticPath = path.join(__dirname, '..', 'public');
app.use(express.static(staticPath));

// error show
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).json({ errors: ['session has expired or tampered with'] });
});

// db sync
db.sequelize.sync();

// server init
const PORT = process.env.PORT || 5011;
var server = app.listen(PORT, () => {
    logger.info(`Started successfully server at port ${PORT}`);
});
