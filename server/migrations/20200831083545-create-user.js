'use strict';
const CreateUserObj = require('../utils').CreateUserObj;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', CreateUserObj(Sequelize));
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};
