'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
    await queryInterface.bulkDelete('Characters', {
      name: { [Sequelize.Op.in]: ['Kaelen Duskthorn', 'Brakka Stonegut'] },
    });
  },
};