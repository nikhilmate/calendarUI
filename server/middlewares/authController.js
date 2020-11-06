const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports = {
    isPasswordAndUserMatch(req, res, next) {
        var { email, password } = req.body;
        User.findOne({ where: { email } }).then(function (userInstance) {
            if (!userInstance) {
                return res.status(400).json({
                    success: false,
                    errors: ['Incorrect email.']
                });
            } else {
                bcrypt.compare(password, userInstance.password, async function (
                    err,
                    isMatch
                ) {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({
                            success: false,
                            errors: ['Could not match credentials']
                        });
                    } else if (!isMatch) {
                        return res.status(400).json({
                            success: false,
                            errors: ['Invalid password']
                        });
                    } else {
                        let _user = Object.assign({}, userInstance.get());
                        _tasks = await userInstance.getTasks();
                        _notes = await userInstance.getNotes();
                        delete _user['password'];
                        delete _user['id'];
                        req.body = Object.assign(
                            {},
                            {
                                user: _user,
                                tasks: _tasks,
                                notes: _notes
                            }
                        );
                        return next();
                    }
                });
            }
        });
    }
};
