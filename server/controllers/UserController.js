//user.js
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const validationResult = require('express-validator').validationResult;
const check = require('express-validator').check;
// const generateCryptPassword = require('../utils').generateCryptPassword;
const bcrypt = require('bcrypt');

// The verifying public key
const PRIV_KEY = require('../utils').PRIV_KEY;

module.exports = {
    async isLogged(req, res) {
        let { email } = req.params;
        return res.status(200).json({
            success: true,
            user: {
                email: email,
            },
        });
    },
    async notLogged(req, res) {
        return res.status(200).json({
            success: false,
            errors: ['User is not logged'],
        });
    },

    async create(req, res) {
        await check('email').isEmail().run(req);
        await check('password').isLength({ min: 6 }).run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res
                .status(400)
                .json({ success: false, errors: result.array() });
        } else {
            let { email, password } = req.body;
            try {
                let findInstance = await User.findOne({
                    where: {
                        email: email,
                    },
                });
                if (!!findInstance) {
                    return res.status(403).json({
                        success: false,
                        errors: ['Already have user'],
                    });
                } else {
                    let plainPassword = password;
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            console.log(err);
                            return res.status(403).json({
                                success: false,
                                errors: [
                                    'Could not create user',
                                    'could not save credentials',
                                ],
                            });
                        } else {
                            bcrypt.hash(plainPassword, salt, function (
                                err,
                                hash
                            ) {
                                if (err) {
                                    console.log(err);
                                    return res.status(403).json({
                                        success: false,
                                        errors: [
                                            'Could not create user',
                                            'could not save credentials',
                                        ],
                                    });
                                } else {
                                    User.create({
                                        email: email,
                                        password: hash,
                                    }).then((createInstance) => {
                                        if (!!createInstance) {
                                            let token = jwt.sign(
                                                { email: email },
                                                PRIV_KEY,
                                                {
                                                    expiresIn: '1d',
                                                    algorithm: 'RS256',
                                                }
                                            );
                                            delete createInstance['password'];
                                            return res.status(201).json({
                                                success: true,
                                                user: createInstance,
                                                token: 'Bearer ' + token,
                                            });
                                        } else {
                                            return res.status(403).json({
                                                success: false,
                                                errors: [
                                                    'Could not create user',
                                                ],
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            } catch (e) {
                console.log(e);
                return res.status(401).json({
                    success: false,
                    errors: e,
                });
            }
        }
    },

    async login(req, res) {
        try {
            let token = jwt.sign({ email: req.body.email }, PRIV_KEY, {
                expiresIn: '1d',
                algorithm: 'RS256',
            });
            return res.status(201).json({
                success: true,
                user: req.body,
                token: 'Bearer ' + token,
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                errors: e,
            });
        }
    },

    async update(req, res) {
        let { email, password } = req.body;
        let cur_email = req.user.email,
            cur_password = req.user.password;
        // return res.status(200).json({
        //     success: true,
        //     user: req.user,
        //     message: {
        //         email,
        //         password,
        //     },
        // });
        try {
            let plainPassword = password ? password : cur_password,
                newEmail = email ? email : cur_email;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log(err);
                    return res.status(403).json({
                        success: false,
                        errors: [
                            'Could not update user',
                            'could not update credentials',
                        ],
                    });
                } else {
                    bcrypt.hash(plainPassword, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                            return res.status(403).json({
                                success: false,
                                errors: [
                                    'Could not update user',
                                    'could not update credentials',
                                ],
                            });
                        } else {
                            User.update(
                                {
                                    email: newEmail,
                                    password: hash,
                                },
                                {
                                    where: {
                                        email: cur_email,
                                    },
                                }
                            ).then((updateInstance) => {
                                User.findOne({
                                    where: {
                                        email: newEmail,
                                    },
                                }).then((updatedUser) => {
                                    if (!!updatedUser) {
                                        delete updatedUser['password'];
                                        let token = jwt.sign(
                                            { email: newEmail },
                                            PRIV_KEY,
                                            {
                                                expiresIn: '1d',
                                                algorithm: 'RS256',
                                            }
                                        );
                                        return res.status(201).json({
                                            success: true,
                                            user: updatedUser,
                                            token: 'Bearer ' + token,
                                        });
                                    } else {
                                        return res.status(403).json({
                                            success: false,
                                            errors: [
                                                'Could not get updated user',
                                            ],
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                errors: e,
            });
        }
    },

    async delete(req, res) {
        let cur_email = req.user.email;
        try {
            return User.destroy({
                where: {
                    email: cur_email,
                },
                truncate: false,
            }).then((destroyInstance) => {
                if (!!destroyInstance) {
                    return res.status(200).json({
                        success: true,
                        user: cur_email,
                        message: [`User deleted successfully!`],
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        errors: err.message || [
                            'Some error occurred while deleting user.',
                        ],
                    });
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                errors: e,
            });
        }
    },
};
