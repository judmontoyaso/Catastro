const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_persona_natural', {
    id_persona_natural: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_propietarios',
        key: 'id_propietario'
      }
    },
    tipo_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_persona_natural',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_persona_natural_pkey",
        unique: true,
        fields: [
          { name: "id_persona_natural" },
        ]
      },
    ]
  });
};
