'use strict';

const { CharacterImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await CharacterImage.bulkCreate([
      {
        url: "https://i.pinimg.com/736x/90/47/34/9047346db12ebbabe2b490bfc33878f6.jpg",
        preview: true,
        characterId: 2,
        userId: 1
      },
      {
        url: "https://i.pinimg.com/736x/98/eb/55/98eb5529ba72506d38b6af4176e95353.jpg",
        preview: true,
        characterId: 1,
        userId: 1
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'CharacterImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      characterId: { [Op.in]: [1, 2] }
    }, {});
  }
};