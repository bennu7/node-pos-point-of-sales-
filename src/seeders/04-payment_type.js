("use strict");
const { v4: uuidv4 } = require("uuid");

const payment_types = [
  {
    id: uuidv4(),
    name: "Cash",
    type: "CASH",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Debit",
    type: "DEBIT",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Credit",
    type: "CREDIT",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "OVO",
    type: "E-MONEY",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "GoPay",
    type: "E-MONEY",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Dana",
    type: "E-MONEY",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "LinkAja",
    type: "E-MONEY",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "ShopeePay",
    type: "E-MONEY",
    logo: "https://i.ibb.co/0jZQYQg/cash.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  payment_types,
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("payment_types", payment_types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payment_types", null, {});
  },
};
