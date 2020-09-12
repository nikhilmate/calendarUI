var path = require('path');

module.exports = (app, directory) => {
    var router = require('express').Router();

    // comment this in development mode
    /* router.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: path.join(directory, 'public'),
        });
    }); */
    // comment this in development mode

    router.get('/api', (req, res) => {
        res.status(200).send({
            success: true,
            data: 'Calendar API v1'
        });
    });

    app.use('/', router);
};
