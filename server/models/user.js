'use strict';
const { Model, Op, Sequelize } = require('sequelize');
const { v4: uuidV4 } = require('uuid');
const CreateUserObj = require('../utils').CreateUserObj;

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Task, {
                as: 'tasks',
                sourceKey: 'email',
                foreignKey: 'user_email',
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION'
            });
        }
    }
    User.init(CreateUserObj(DataTypes), {
        sequelize,
        timestamps: true,
        modelName: 'User'
    });
    User.beforeCreate((user, options) => {
        user.id = uuidV4();
    });
    return User;
};
