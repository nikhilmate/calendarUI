module.exports = (app, passport) => {
    const note = require('../controllers/NoteController.js');

    var router = require('express').Router();

    // Retrieve user
    router.post(
        '/create',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        note.createNote
    );

    router.post(
        '/update',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        note.updateNote
    );

    router.post(
        '/delete',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        note.deleteNote
    );

    router.get(
        '/all',
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/api/user/notLogged'
        }),
        note.getNoteDetails
    );

    app.use('/api/note', router);
};
