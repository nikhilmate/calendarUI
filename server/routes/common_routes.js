module.exports = (app, staticPath) => {
    var router = require('express').Router();
    const user = require('../controllers/UserController.js');

    router.get('/', user.mainRoute);

    router.get('/api', (req, res) => {
        res.status(200).send({
            success: true,
            data: 'Calendar API v1'
        });
    });

    app.use('/', router);
};
