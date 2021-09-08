const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_predios', {
    id_predio: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre_predio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departamento_predio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    municipio_predio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avaluo_predio: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_terreno: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_predios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_predios_pkey",
        unique: true,
        fields: [
          { name: "id_predio" },
        ]
      },
    ]
  });
};
