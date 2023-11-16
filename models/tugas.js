'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tugas.belongsTo(models.Mahasiswa, {
        as: 'tugasMahasiswa',
        foreignKey: 'mahasiswaId',
        onDelete: "SET NULL",
      })
    }
  }
  Tugas.init({
    mahasiswaId: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    nilai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tugas',
  });
  return Tugas;
};