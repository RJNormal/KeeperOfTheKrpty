'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CharacterImage extends Model {
    static associate(models) {
      CharacterImage.belongsTo(models.Character, { foreignKey: 'characterId' });
      CharacterImage.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  CharacterImage.init(
    {
      url: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: 'CharacterImage',
    }
  );
  return CharacterImage;
};