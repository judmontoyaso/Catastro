const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_terrenos', {
    id_predio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_predios',
        key: 'id_predio'
      }
    },
    id_terreno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    area_total_terreno: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    valor_comercial_terreno: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    fuente_hidrica_terreno: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tipo_terreno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tiene_construccion_terreno: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_terrenos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_terrenos_pkey",
        unique: true,
        fields: [
          { name: "id_terreno" },
        ]
      },
    ]
  });
};
