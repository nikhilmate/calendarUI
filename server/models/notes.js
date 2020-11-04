'use strict';
const { Model } = require('sequelize');
const { v4: uuidV4 } = require('uuid');
const CreateNoteObj = require('../utils').CreateNoteObj;

module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Note.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'user_email'
            });
        }
    }
    Note.init(CreateNoteObj(DataTypes), {
        sequelize,
        timestamps: true,
        modelName: 'Note'
    });
    Note.beforeCreate((note, options) => {
        note.id = uuidV4();
    });
    return Note;
};
