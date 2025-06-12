'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        url: "https://robbreport.com/wp-content/uploads/2022/05/Stone-Home-6.jpg",
        preview: true,
        spotId: 1,
        userId: 1
      },
      {
        url: "https://robbreport.com/wp-content/uploads/2022/05/Stone-Home-2.jpg?resize=681,383",
        preview: false,
        spotId: 1,
        userId: 1
      },
      {
        url: "https://img.sfist.com/2022/05/1-25th-avenue-garden.jpg",
        preview: false,
        spotId: 1,
        userId: 1
      },
      {
        url: "https://img.sfist.com/2022/05/1-25th-avenue-living.jpg",
        preview: false,
        spotId: 1,
        userId: 1
      },
      {
        url: "https://img.sfist.com/2022/05/1-25th-avenue-widow.jpg",
        preview: false,
        spotId: 1,
        userId: 1
      },
      //Spot 2
      {
        url: "https://a0.muscache.com/im/pictures/3abcfb27-24e7-4570-a923-627160911e81.jpg",
        preview: true,
        spotId: 2,
        userId: 2
      },
      {
        url: "https://cdn-dknnf.nitrocdn.com/UULmjgivAAitezmwWhUMIrpfTexQjeUF/assets/images/optimized/rev-3667796/www.littlepalmisland.com/wp-content/uploads/2020/09/island-grand-bedroom-horz.jpg",
        preview: false,
        spotId: 2,
        userId: 2
      },
      {
        url: "https://cdn-dknnf.nitrocdn.com/UULmjgivAAitezmwWhUMIrpfTexQjeUF/assets/images/optimized/rev-3667796/www.littlepalmisland.com/wp-content/uploads/2020/09/suite-firepit-horz.jpg",
        preview: false,
        spotId: 2,
        userId: 2
      },
      {
        url: "https://cdn-dknnf.nitrocdn.com/UULmjgivAAitezmwWhUMIrpfTexQjeUF/assets/images/optimized/rev-3667796/www.littlepalmisland.com/wp-content/uploads/2024/06/balcony-horz.jpg",
        preview: false,
        spotId: 2,
        userId: 2
      },
      {
        url: "https://cdn-dknnf.nitrocdn.com/UULmjgivAAitezmwWhUMIrpfTexQjeUF/assets/images/optimized/rev-3667796/www.littlepalmisland.com/wp-content/uploads/2024/06/bathroom-2-horz.jpg",
        preview: false,
        spotId: 2,
        userId: 2
      },
      //SPOT 3
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzgyMTU1MTQ%3D/original/3c19cf2f-1445-4e50-8296-52d0249a1762.jpeg?im_w=1200",
        preview: true,
        spotId: 3,
        userId: 3
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzgyMTU1MTQ%3D/original/9445f170-7cd6-42cd-8589-0fc0586fcd81.jpeg?im_w=1200",
        preview: false,
        spotId: 3,
        userId: 3
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzgyMTU1MTQ%3D/original/324adae6-d114-41b4-906b-045135a54a18.jpeg?im_w=1200",
        preview: false,
        spotId: 3,
        userId: 3
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzgyMTU1MTQ%3D/original/508daa8d-74d2-43f6-ad9c-52a377c36e4a.jpeg?im_w=1200",
        preview: false,
        spotId: 3,
        userId: 3
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-38215514/original/caf27ec7-567d-4721-bcd0-507c9fbde007.jpeg?im_w=1200",
        preview: false,
        spotId: 3,
        userId: 3
      },
      //SPOT 4
      {
        url: "https://assets.guesty.com/image/upload/v1711044205/stskuqbujstcc6e56ztr.jpg",
        preview: true,
        spotId: 4,
        userId: 2
      },
      {
        url: "https://assets.guesty.com/image/upload/v1711044205/ruf7crcugfoukozjba6k.jpg",
        preview: false,
        spotId: 4,
        userId: 2
      },
      {
        url: "https://assets.guesty.com/image/upload/v1711044204/kxwuxwgyb56iiqmnc1nz.jpg",
        preview: false,
        spotId: 4,
        userId: 2
      },
      {
        url: "https://assets.guesty.com/image/upload/v1711044205/wbvzu0jdkwtqls4h7eb1.jpg",
        preview: false,
        spotId: 4,
        userId: 2
      },
      //SPOT 5
      {
        url: "https://onekindesign.com/wp-content/uploads/2020/01/Modern-Southern-Farmhouse-Steve-Powell-Homes-01-1-Kindesign.jpg",
        preview: true,
        spotId: 5,
        userId: 1
      },
      {
        url: "https://onekindesign.com/wp-content/uploads/2020/01/Modern-Southern-Farmhouse-Steve-Powell-Homes-09-1-Kindesign.jpg",
        preview: false,
        spotId: 5,
        userId: 1
      },
      {
        url: "https://onekindesign.com/wp-content/uploads/2020/01/Modern-Southern-Farmhouse-Steve-Powell-Homes-10-1-Kindesign.jpg",
        preview: false,
        spotId: 5,
        userId: 1
      },
      {
        url: "https://onekindesign.com/wp-content/uploads/2020/01/Modern-Southern-Farmhouse-Steve-Powell-Homes-18-1-Kindesign.jpg",
        preview: false,
        spotId: 5,
        userId: 1
      },
      {
        url: "https://onekindesign.com/wp-content/uploads/2020/01/Modern-Southern-Farmhouse-Steve-Powell-Homes-22-1-Kindesign.jpg",
        preview: false,
        spotId: 5,
        userId: 1
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};