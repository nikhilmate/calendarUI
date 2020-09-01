// module.exports = () => {
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const db = require('./models');

const app = express();
const corsOptions = {
    origin: 'http://localhost:5011',
};
const PORT = process.env.PORT || 5011;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors(corsOptions));

require('./routes/common_routes.js')(app, __dirname);
require('./routes/user_routes.js')(app, __dirname);

app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

db.sequelize.sync();

var server = app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});
// };
