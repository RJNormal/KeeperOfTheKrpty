'use strict';


const { Character } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  
  async up(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      Character.schema(process.env.SCHEMA);
    }

       await Character.bulkCreate([
      {
        ownerId: 1,
        name: 'Kaelen Duskthorn',
        race: 'Half-Elf',
        className: 'Shadowblade',
        backstory: 'A rogue war orphan trained in forbidden arts.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 1,
        name: 'Brakka Stonegut',
        race: 'Dwarf',
        className: 'Berserker',
        backstory: 'A disgraced noble seeking redemption in blood.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Characters';
    await queryInterface.bulkDelete(options, {
      name: { [Sequelize.Op.in]: ['Kaelen Duskthorn', 'Brakka Stonegut'] },
    });
  },
};