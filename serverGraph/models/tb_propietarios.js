const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_propietarios', {
    id_predio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_predios',
        key: 'id_predio'
      }
    },
    id_propietario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    direccion_propietario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono_propietario: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tipo_propietario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo_propietario: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_propietarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_propietarios_pkey",
        unique: true,
        fields: [
          { name: "id_propietario" },
        ]
      },
    ]
  });
};
