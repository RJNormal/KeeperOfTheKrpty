'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsTo(models.User, { foreignKey: 'userId' });
      Character.hasOne(models.SaveSlot, {
        foreignKey: 'characterId',
        as: 'saveSlot',
        onDelete: 'CASCADE',
      });
    }
  }

  Character.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      race: {
        type: DataTypes.ENUM('Human', 'Elf', 'Dwarf'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['Human', 'Elf', 'Dwarf']],
            msg: 'Race must be either Human, Elf, or Dwarf',
          },
        },
      },
      className: {
        type: DataTypes.ENUM('Warrior', 'Mage', 'Rogue'),
        allowNull: false,
         validate: {
          isIn: {
            args: [['Warrior', 'Mage', 'Rogue']],
            msg: 'Race must be either Warrior, Mage, Rogue',
          },
        },
        
      },
      portrait: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Character',
    }
  );

  return Character;
};