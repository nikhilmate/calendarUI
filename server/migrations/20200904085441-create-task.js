'use strict';

const CreateTaskObj = require('../utils').CreateTaskObj;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tasks', CreateTaskObj(Sequelize));
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Tasks');
    }
};
