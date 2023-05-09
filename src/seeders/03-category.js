("use strict");
const { v4: uuidv4 } = require("uuid");

const categories = [
  {
    id: uuidv4(),
    name: "Makanan",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Minuman Hangat",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Minuman Dingin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Jus Buah",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Snack",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  categories,
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
