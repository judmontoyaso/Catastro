var DataTypes = require("sequelize").DataTypes;
var _tb_construcciones = require("./tb_construcciones");
var _tb_persona_juridica = require("./tb_persona_juridica");
var _tb_persona_natural = require("./tb_persona_natural");
var _tb_predios = require("./tb_predios");
var _tb_propietarios = require("./tb_propietarios");
var _tb_terrenos = require("./tb_terrenos");

function initModels(sequelize) {
  var tb_construcciones = _tb_construcciones(sequelize, DataTypes);
  var tb_persona_juridica = _tb_persona_juridica(sequelize, DataTypes);
  var tb_persona_natural = _tb_persona_natural(sequelize, DataTypes);
  var tb_predios = _tb_predios(sequelize, DataTypes);
  var tb_propietarios = _tb_propietarios(sequelize, DataTypes);
  var tb_terrenos = _tb_terrenos(sequelize, DataTypes);

  tb_construcciones.belongsTo(tb_predios, { as: "id_predio_tb_predio", foreignKey: "id_predio"});
  tb_predios.hasMany(tb_construcciones, { as: "tb_construcciones", foreignKey: "id_predio"});
  tb_propietarios.belongsTo(tb_predios, { as: "id_predio_tb_predio", foreignKey: "id_predio"});
  tb_predios.hasMany(tb_propietarios, { as: "tb_propietarios", foreignKey: "id_predio"});
  tb_terrenos.belongsTo(tb_predios, { as: "id_predio_tb_predio", foreignKey: "id_predio"});
  tb_predios.hasMany(tb_terrenos, { as: "tb_terrenos", foreignKey: "id_predio"});
  tb_persona_juridica.belongsTo(tb_propietarios, { as: "nit_persona_juridica_tb_propietario", foreignKey: "nit_persona_juridica"});
  tb_propietarios.hasOne(tb_persona_juridica, { as: "tb_persona_juridica", foreignKey: "nit_persona_juridica"});
  tb_persona_natural.belongsTo(tb_propietarios, { as: "id_persona_natural_tb_propietario", foreignKey: "id_persona_natural"});
  tb_propietarios.hasOne(tb_persona_natural, { as: "tb_persona_natural", foreignKey: "id_persona_natural"});

  return {
    tb_construcciones,
    tb_persona_juridica,
    tb_persona_natural,
    tb_predios,
    tb_propietarios,
    tb_terrenos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
