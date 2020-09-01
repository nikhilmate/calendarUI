module.exports = (app) => {
    const user = require('../controllers/UserController.js');

    var router = require('express').Router();

    // Create User
    router.post('/create', user.create);

    // Retrieve user
    router.get('/getUser/:email', user.getUser);

    // Update User
    router.post('/update/:email', user.update);

    // Delete User
    router.post('/delete/:email', user.delete);

    app.use('/api/user', router);
};
