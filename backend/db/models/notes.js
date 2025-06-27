
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User, { foreignKey: 'userId' });
      Note.belongsTo(models.Character, { foreignKey: 'characterId' });
      Note.hasMany(models.NoteImage, { foreignKey: 'noteId' })
    }
  }

  Note.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Characters', key: 'id' }
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 1000],
          }
      }
    },
    {
      sequelize,
      modelName: 'Note'
    }
  );

  return Note;
};