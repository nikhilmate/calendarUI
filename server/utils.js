const check = require('express-validator').check;

const fs = require('fs');
const path = require('path');
// Go up one directory, then look for file name
const publicPathToKey = path.join(__dirname, '../keys', 'public.pem');
const privatePathToKey = path.join(__dirname, '../keys', 'private.pem');
// The verifying public key
const PUB_KEY = fs.readFileSync(publicPathToKey, 'utf8');
const PRIV_KEY = fs.readFileSync(privatePathToKey, 'utf8');

module.exports = {
    loginValidation: [
        check('email')
            .exists()
            .withMessage('EMAIL_IS_EMPTY')
            .isEmail()
            .withMessage('EMAIL_IS_IN_WRONG_FORMAT'),
        check('password')
            .exists()
            .withMessage('PASSWORD_IS_EMPTY')
            .isLength({ min: 6 })
            .withMessage('PASSWORD_LENGTH_MUST_BE_MORE_THAN_8')
    ],
    PUB_KEY,
    PRIV_KEY,
    CreateTaskObj(Sequelize) {
        return {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            timestamp: {
                type: Sequelize.STRING,
                allowNull: false
            },
            // dateUtil: {
            //     type: Sequelize.STRING,
            //     allowNull: false
            // },
            // timeUtil: {
            //     type: Sequelize.STRING,
            //     allowNull: false
            // },
            isFinished: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        };
    },
    CreateUserObj(Sequelize) {
        return {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false
            },
            email: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        };
    },
    CreateNoteObj(Sequelize) {
        return {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            note: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            timestamp: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        };
    }
};
