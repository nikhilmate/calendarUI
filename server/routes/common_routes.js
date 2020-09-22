module.exports = (app, staticPath) => {
    var router = require('express').Router();

    router.get('/api', (req, res) => {
        res.status(200).send({
            success: true,
            data: 'Calendar API v1'
        });
    });

    app.use('/', router);
};
