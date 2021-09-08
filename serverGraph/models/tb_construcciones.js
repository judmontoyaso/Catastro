const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_construcciones', {
    id_predio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_predios',
        key: 'id_predio'
      }
    },
    id_construccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_pisos_construccion: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    area_total_construccion: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tipo_construccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion_construccion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_construcciones',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_construcciones_pkey",
        unique: true,
        fields: [
          { name: "id_construccion" },
        ]
      },
    ]
  });
};
