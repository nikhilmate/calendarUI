const jwt = require('jsonwebtoken');
const User = require('../models').User;
const PUB_KEY = require('../utils').PUB_KEY;
// const verifyCryptPassword = require('../utils').verifyCryptPassword;
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
                bcrypt.compare(password, userInstance.password, function (
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
                        delete _user['password'];
                        delete _user['id'];
                        req.body = Object.assign({}, _user);
                        return next();
                    }
                });
            }
        });
    },

    // not used
    isLogged(req, res, next) {
        // check header or url parameters or post parameters for token
        var token =
            req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(
                token,
                'sfAq2SD22J3a445562646sdjad456ASJFjjFSDJjSFJvCJWPASDmq2eqe21',
                function (err, decoded) {
                    if (err) {
                        return res.sendStatus(400).json({
                            success: false,
                            errors: ['Failed to authenticate token.']
                        });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                }
            );
        } else {
            // if there is no token
            // return an error
            return res.sendStatus(400).json({
                success: false,
                errors: ['No token provided.']
            });
        }
    },
    // not used
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.sendStatus(403).json({
                        success: false,
                        errors: ['Wrong token provided.']
                    });
                } else {
                    req.jwt = jwt.verify(
                        authorization[1],
                        'sfAq2SD22J3a445562646sdjad456ASJFjjFSDJjSFJvCJWPASDmq2eqe21'
                    );
                    return next();
                }
            } catch (err) {
                return res.sendStatus(400).json({
                    success: false,
                    errors: err
                });
            }
        } else {
            return res.sendStatus(400).json({
                success: false,
                errors: ['Token needed']
            });
        }
    }
};
