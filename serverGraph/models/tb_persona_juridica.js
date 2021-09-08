const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_persona_juridica', {
    nit_persona_juridica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_propietarios',
        key: 'id_propietario'
      }
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_persona_juridica',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_persona_juridica_pkey",
        unique: true,
        fields: [
          { name: "nit_persona_juridica" },
        ]
      },
    ]
  });
};
