'use strict';
const { Model } = require('sequelize');
const { v4: uuidV4 } = require('uuid');
const CreateTaskObj = require('../utils').CreateTaskObj;

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Task.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'user_email'
            });
        }
    }
    Task.init(CreateTaskObj(DataTypes), {
        sequelize,
        timestamps: true,
        modelName: 'Task'
    });
    Task.beforeCreate((task, options) => {
        task.id = uuidV4();
    });
    return Task;
};
