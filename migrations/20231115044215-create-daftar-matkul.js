'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DaftarMatkuls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mahasiswaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Mahasiswas',
          key: 'id',
        }
      },
      matkulId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MataKuliahs',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DaftarMatkuls');
  }
};