'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });
      Character.hasMany(models.Note, { foreignKey: 'characterId', onDelete: 'CASCADE' });
      Character.hasMany(models.CharacterImage, { foreignKey: 'characterId', onDelete: 'CASCADE' });
    }
  }

  Character.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      race: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      className: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      backstory: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [0, 1000] 
        }
    
      },
      
    },
    {
      sequelize,
      modelName: 'Character',
    }
  );

  return Character;
};