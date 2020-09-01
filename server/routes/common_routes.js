var path = require('path');

module.exports = (app, directory) => {
    var router = require('express').Router();

    router.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: path.join(directory, 'public'),
        });
    });

    router.get('/api', (req, res) => {
        res.sendStatus(200).send({
            data: 'Calendar API v1',
        });
    });

    app.use('/', router);
};
