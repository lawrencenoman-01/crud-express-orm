'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mahasiswa.belongsToMany(models.MataKuliah, { through: models.DaftarMatkul, foreignKey: "mahasiswaId", otherKey: "matkulId", onDelete: "CASCADE" })
      Mahasiswa.hasMany(models.Tugas, {
        as: 'tugasMahasiswa',
        foreignKey: 'mahasiswaId',
        onDelete: "CASCADE",
        hooks: true,
      })
    }
  }
  Mahasiswa.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};