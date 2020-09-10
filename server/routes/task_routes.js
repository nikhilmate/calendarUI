module.exports = (app, directorypath, passport) => {
    const task = require('../controllers/TaskController.js');

    var router = require('express').Router();

    // Retrieve user
    router.post(
        '/create/:email',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        task.createTask
    );

    router.post(
        '/update',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        task.updateTask
    );

    router.post(
        '/delete',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        task.deleteTask
    );

    router.get(
        '/all/:email',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        task.getTaskDetails
    );

    app.use('/api/task', router);
};
