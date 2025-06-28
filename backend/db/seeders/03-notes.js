'use strict';

const { Note } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Note.bulkCreate([
      {
        userId: 1,
        characterId: 2,
        note:
          "We finally reached the ruins beneath Hollowmere. I don't trust the ranger — he walks like a man who’s seen too much and spoken too little.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        characterId: 1,
        note:
          "Fought a dire bear today. Brakka broke its jaw with a single swing. I’m starting to think he’s not just ‘some dwarf with a bad attitude’.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Notes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userID: { [Op.in]: [1] }
    }, {});
  }
};