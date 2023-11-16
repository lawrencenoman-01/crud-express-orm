'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaftarMatkul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DaftarMatkul.init({
    mahasiswaId: DataTypes.INTEGER,
    matkulId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DaftarMatkul',
  });
  return DaftarMatkul;
};