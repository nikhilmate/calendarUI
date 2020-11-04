const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const db = require('./models');
const compression = require('compression');
var cookieParser = require('cookie-parser');

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

const app = express();

const corsOptions = {
    origin: 'http://localhost:5011'
};
const PORT = process.env.PORT || 5011;

const staticPath = path.join(__dirname, '..', 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(csrfProtection);

app.use(compression());
app.use(cors(corsOptions));

const logger = require('winston');
const passport = require('passport');

app.use(passport.initialize());
require('./config/passport')(passport);

require('./routes/common_routes.js')(app);
require('./routes/user_routes.js')(app, __dirname, passport);
require('./routes/task_routes.js')(app, passport);
require('./routes/note_routes.js')(app, passport);

app.use(express.static(staticPath));

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).json({ errors: ['session has expired or tampered with'] });
});

db.sequelize.sync();

var server = app.listen(PORT, () => {
    logger.info(`Started successfully server at port ${PORT}`);
});
