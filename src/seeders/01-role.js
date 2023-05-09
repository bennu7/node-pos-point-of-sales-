("use strict");

const roles = [
  {
    id: "75d797d9-50a7-4805-9f2e-8c7b29c35a5c",
    name: "ADMIN",
  },
  {
    id: "cc670dc1-26a7-4712-a6fa-4604f5c35a99",
    name: "CASHIER",
  },
  {
    id: "1e45853f-5603-43a3-8492-e74576ff2794",
    name: "USER",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  roles,
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
