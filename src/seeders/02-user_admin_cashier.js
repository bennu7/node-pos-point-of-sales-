const bcryptjs = require("bcryptjs");
("use strict");

const users = [
  {
    id: "ca5ecda7-35bf-40d7-a127-51a870b26361",
    full_name: "ADMIN GANTENG",
    user_name: "admin",
    email: "admin@gmail.com",
    password: bcryptjs.hashSync("Password123", 10),
    role_id: "75d797d9-50a7-4805-9f2e-8c7b29c35a5c",
  },
];

module.exports = {
  users,
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
