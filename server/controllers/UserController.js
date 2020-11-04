//user.js
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const validationResult = require('express-validator').validationResult;
const check = require('express-validator').check;
const bcrypt = require('bcrypt');
const PUB_KEY = require('../utils').PUB_KEY;
var path = require('path');

// The verifying public key
const PRIV_KEY = require('../utils').PRIV_KEY;

const deletePrivateDetails = (userDetails) => {
    if (typeof userDetails == 'object') {
        delete userDetails['password'];
        delete userDetails['id'];
    }
    return userDetails;
};

module.exports = {
    async mainRoute(req, res) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        var token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
            jwt.verify(token, PUB_KEY, (err, verifiedJwt) => {
                if (err) {
                    res.cookie('jwt', '', {
                        httpOnly: true,
                        sameSite: true,
                        expires: new Date()
                    });
                }
                // if (verifiedJwt && verifiedJwt.email) {
                //     console.log(verifiedJwt);
                //     let userInstance = await User.findOne({
                //         where: { email: verifiedJwt.email }
                //     });
                //     if (!!userInstance) {
                //         let tasks = await userInstance.getTasks();
                //         let userDetails = Object.assign(
                //             {},
                //             userInstance.get()
                //         );
                //         userDetails = Object.assign(
                //             {},
                //             deletePrivateDetails(
                //                 userDetails
                //             )
                //         );
                //     }
                // }
            });
        }
        res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
    },

    async isLogged(req, res) {
        try {
            let userDetails = Object.assign({}, req.user.get()),
                tasks = await req.user.getTasks(),
                notes = await req.user.getNotes();
            userDetails = Object.assign({}, deletePrivateDetails(userDetails));
            return res.status(200).json({
                success: true,
                user: userDetails,
                tasks,
                notes
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                errors: ['Server issue']
            });
        }
    },
    async notLogged(req, res) {
        return res.status(401).json({
            success: false,
            errors: ['User is not logged']
        });
    },

    async logout(req, res) {
        res.cookie('jwt', '', {
            httpOnly: true,
            sameSite: true,
            expires: new Date()
        });
        return res.status(200).json({
            success: true,
            user: {
                email: req.user.email
            }
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
                        email: email
                    }
                });
                if (!!findInstance) {
                    return res.status(403).json({
                        success: false,
                        errors: ['Already have user']
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
                                    'could not save credentials'
                                ]
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
                                            'could not save credentials'
                                        ]
                                    });
                                } else {
                                    User.create({
                                        email: email,
                                        password: hash
                                    }).then((createInstance) => {
                                        if (!!createInstance) {
                                            let token = jwt.sign(
                                                { email: email },
                                                PRIV_KEY,
                                                {
                                                    expiresIn: '1d',
                                                    algorithm: 'RS256'
                                                }
                                            );
                                            let userDetails = Object.assign(
                                                {},
                                                createInstance.get()
                                            );
                                            userDetails = Object.assign(
                                                {},
                                                deletePrivateDetails(
                                                    userDetails
                                                )
                                            );
                                            res.cookie('jwt', token, {
                                                httpOnly: true,
                                                sameSite: true,
                                                expires: 0
                                            });
                                            return res.status(201).json({
                                                success: true,
                                                user: userDetails,
                                                token: 'Bearer ' + token
                                            });
                                        } else {
                                            return res.status(403).json({
                                                success: false,
                                                errors: [
                                                    'Could not create user'
                                                ]
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
                    errors: ['trouble getting the data']
                });
            }
        }
    },

    async login(req, res) {
        try {
            let { tasks, notes, user } = req.body;
            let userDetails = Object.assign({}, user);
            userDetails = Object.assign({}, deletePrivateDetails(userDetails));
            let token = jwt.sign({ email: user.email }, PRIV_KEY, {
                expiresIn: '1d',
                algorithm: 'RS256'
            });
            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: true,
                expires: 0
            });
            return res.status(201).json({
                success: true,
                user: userDetails,
                tasks: tasks ? tasks : [],
                notes: notes ? notes : [],
                token: 'Bearer ' + token
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                errors: ['trouble getting the data']
            });
        }
    },

    async update(req, res) {
        let { password } = req.body;
        let cur_email = req.user.email,
            cur_password = req.user.password;
        try {
            let plainPassword = password ? password : cur_password;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log(err);
                    return res.status(403).json({
                        success: false,
                        errors: [
                            'Could not update user',
                            'could not update credentials'
                        ]
                    });
                } else {
                    bcrypt.hash(plainPassword, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                            return res.status(403).json({
                                success: false,
                                errors: [
                                    'Could not update user',
                                    'could not update credentials'
                                ]
                            });
                        } else {
                            User.update(
                                {
                                    password: hash
                                },
                                {
                                    where: { email: cur_email }
                                }
                            ).then((updateInstance) => {
                                if (
                                    !!updateInstance &&
                                    typeof updateInstance[0] === 'number' &&
                                    updateInstance[0] > 0
                                ) {
                                    User.findOne({
                                        where: { email: cur_email }
                                    }).then((updatedUser) => {
                                        if (!!updatedUser) {
                                            let userDetails = Object.assign(
                                                {},
                                                updatedUser.get()
                                            );
                                            userDetails = Object.assign(
                                                {},
                                                deletePrivateDetails(
                                                    userDetails
                                                )
                                            );
                                            let token = jwt.sign(
                                                { email: cur_email },
                                                PRIV_KEY,
                                                {
                                                    expiresIn: '1d',
                                                    algorithm: 'RS256'
                                                }
                                            );
                                            res.cookie('jwt', token, {
                                                httpOnly: true,
                                                sameSite: true,
                                                expires: 0
                                            });
                                            return res.status(201).json({
                                                success: true,
                                                user: userDetails,
                                                token: 'Bearer ' + token
                                            });
                                        } else {
                                            return res.status(403).json({
                                                success: false,
                                                errors: [
                                                    'Could not get updated user'
                                                ]
                                            });
                                        }
                                    });
                                } else {
                                    return res.status(401).json({
                                        success: false,
                                        errors: ['Update failed']
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                errors: ['trouble getting the data']
            });
        }
    },

    async delete(req, res) {
        let cur_email = req.user.email;
        try {
            return User.destroy({
                where: {
                    email: cur_email
                },
                truncate: false
            }).then((destroyInstance) => {
                if (
                    !!destroyInstance &&
                    typeof destroyInstance[0] === 'number' &&
                    destroyInstance[0] > 0
                ) {
                    res.cookie('jwt', {
                        httpOnly: true,
                        sameSite: true,
                        expires: new Date()
                    });
                    return res.status(200).json({
                        success: true,
                        user: cur_email,
                        message: [`User deleted successfully`]
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        errors: ['Some error occurred while deleting user']
                    });
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                success: false,
                errors: ['trouble getting the data']
            });
        }
    }
};
