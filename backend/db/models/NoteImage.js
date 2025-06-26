'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NoteImage extends Model {
    static associate(models) {
      NoteImage.belongsTo(models.Note, { foreignKey: 'noteId' });
    }
  }

  NoteImage.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Notes', key: 'id' }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id'}
      }
    },
    {
      sequelize,
      modelName: 'NoteImage'
    }
  );
  return NoteImage;
};