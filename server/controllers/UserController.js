//user.js
const User = require('../models').User;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
module.exports = {
    async getUser(req, res) {
        let { email } = req.params;
        if (validateEmail(email)) {
            try {
                await User.findOne({
                    where: {
                        email: req.params.email,
                    },
                }).then((findInstance) => {
                    if (!!findInstance) {
                        return res.status(200).send({
                            status: true,
                            user: findInstance,
                        });
                    } else {
                        return res.status(200).send({
                            status: false,
                            user: null,
                            message: 'Could not found',
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                return res.status(500).send({
                    status: false,
                    user: null,
                    message: e,
                });
            }
        } else {
            return res.status(500).send({
                status: true,
                user: false,
                message: 'Wrong mail entered',
            });
        }
    },

    async create(req, res) {
        let { email, password } = req.body;
        if (
            validateEmail(email) &&
            typeof password == 'string' &&
            password.trim()
        ) {
            try {
                await User.findOne({
                    where: {
                        email: email,
                    },
                }).then((findInstance) => {
                    if (!!findInstance) {
                        return res.status(404).send({
                            status: false,
                            user: findInstance,
                            message: 'Already have user',
                        });
                    } else {
                        return User.create({
                            email: email,
                            password: password,
                        }).then((createInstance) => {
                            if (!!createInstance) {
                                return res.status(201).send({
                                    status: true,
                                    user: createInstance,
                                });
                            } else {
                                return res.status(500).send({
                                    status: false,
                                    user: null,
                                    message: 'Could not create user',
                                });
                            }
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                return res.status(500).send({
                    status: false,
                    user: null,
                    message: e,
                });
            }
        } else {
            return res.status(500).send({
                status: false,
                user: false,
                message: 'Wrong detalis entered',
            });
        }
    },

    async update(req, res) {
        let { email, password } = req.body;
        let sourceEmail = req.params.email;
        email = !!email ? email : sourceEmail;
        if (validateEmail(sourceEmail) && validateEmail(email)) {
            try {
                await User.findOne({
                    where: {
                        email: sourceEmail,
                    },
                })
                    .then((findInstance) => {
                        if (!!findInstance) {
                            return User.update(
                                {
                                    email: email,
                                    password: password
                                        ? password
                                        : findInstance.password,
                                },
                                {
                                    where: {
                                        email: sourceEmail,
                                    },
                                }
                            );
                        } else {
                            return res.status(404).send({
                                status: false,
                                user: null,
                                message: 'User not found',
                            });
                        }
                    })
                    .then((updateInstance) => {
                        User.findOne({
                            where: {
                                email: email,
                            },
                        }).then((updatedUser) => {
                            if (!!updatedUser) {
                                return res.status(201).send({
                                    status: true,
                                    user: updatedUser,
                                });
                            } else {
                                return res.status(502).send({
                                    status: false,
                                    user: false,
                                    message: 'Could not get updated user',
                                });
                            }
                        });
                    });
            } catch (e) {
                console.log(e);
                return res.status(500).send({
                    status: false,
                    user: null,
                    message: e,
                });
            }
        } else {
            return res.status(500).send({
                status: false,
                user: false,
                message: 'Wrong detalis entered',
            });
        }
    },

    async delete(req, res) {
        let sourceEmail = req.params.email;
        if (validateEmail(sourceEmail)) {
            try {
                await User.findOne({
                    where: {
                        email: sourceEmail,
                    },
                }).then((findInstance) => {
                    if (!!findInstance) {
                        return User.destroy({
                            where: {
                                email: sourceEmail,
                            },
                            truncate: false,
                        }).then((destroyInstance) => {
                            if (!!destroyInstance) {
                                return res.status(200).send({
                                    status: true,
                                    user: findInstance,
                                    message: `User deleted successfully!`,
                                });
                            } else {
                                return res.status(200).send({
                                    status: false,
                                    user: false,
                                    message:
                                        err.message ||
                                        'Some error occurred while deleting user.',
                                });
                            }
                        });
                    } else {
                        return res.status(404).send({
                            status: false,
                            user: null,
                            message: 'User not found',
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                return res.status(500).send({
                    status: false,
                    user: false,
                    message: e,
                });
            }
        } else {
            return res.status(500).send({
                status: false,
                user: false,
                message: 'Wrong email',
            });
        }
    },
};
