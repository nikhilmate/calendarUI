// module.exports = () => {
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const db = require('./models');
const compression = require('compression');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5011',
};
const PORT = process.env.PORT || 5011;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors(corsOptions));

const logger = require('winston');
const passport = require('passport');

app.use(passport.initialize());
require('./config/passport')(passport);

require('./routes/common_routes.js')(app, __dirname);
require('./routes/user_routes.js')(app, __dirname, passport);
require('./routes/task_routes.js')(app, __dirname, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // next(err);
    return res.status(404).json({
        errors: err,
    });
});

// error handler
// app.use(function(err, req, res, next) {
// set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

db.sequelize.sync();

var server = app.listen(PORT, () => {
    logger.info(`Started successfully server at port ${PORT}`);
});
