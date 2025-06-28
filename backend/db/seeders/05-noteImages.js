'use strict';

const { NoteImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      NoteImage.schema(process.env.SCHEMA);
    }
    await NoteImage.bulkCreate([
    {
        url:  "test img",
        noteId: 1,
        userId: 1
    },
    {
        url:  "test img",
        noteId: 2,
        userId: 1
    }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'NoteImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      noteId: { [Op.in]: [1, 2] }
    }, {});
  }
};