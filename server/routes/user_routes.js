const loginValidation = require('../utils').loginValidation;
const isPasswordAndUserMatch = require('../middlewares/authController')
    .isPasswordAndUserMatch;

module.exports = (app, directorypath, passport) => {
    const user = require('../controllers/UserController.js');

    var router = require('express').Router();

    // Create User
    router.post('/register', user.create);

    // login User
    router.post(
        '/login',
        [loginValidation, isPasswordAndUserMatch],
        user.login
    );

    // Retrieve user
    router.get(
        '/isLogged',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        user.isLogged
    );

    router.get(
        '/logout',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        user.logout
    );

    router.get('/notLogged', user.notLogged);

    // Update User
    router.post(
        '/update/:email',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        user.update
    );

    // Delete User
    router.get(
        '/delete/:email',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        user.delete
    );

    app.use('/api/user', router);
};
