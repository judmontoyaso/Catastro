const {sequelize} = require('sequelize');
const{tb_predios, tb_propietarios, tb_persona_natural,tb_persona_juridica, tb_terrenos, tb_construcciones} = require('../models');


const Query = {

    getPredioDetails: async () =>{
        
        try {
            const predios = await tb_predios.findAll();
            return predios;
            
        } catch(err) {
            console.log(err);
        }
    },
  

    getPredio: async (root, {id_predio}) =>{
        try {
            const pred = await tb_predios.findByPk(id_predio)
            if(!pred) {
                throw new Error('Predio no encontrado');
            }
            return pred;   
        } catch(err) {
            console.log(err);
        }
    },

    getPropietarioDetails: async () =>{
        try {
            const propietarios = await tb_propietarios.findAll();
            return propietarios;
            
        } catch(err) {
            console.log(err);
        }
    },

    getPropietario: async (root, {id_propietario}) =>{
        try {
            const prop = await tb_propietarios.findByPk(id_propietario)
            return prop;
            
        } catch(err) {
            console.log(err);
        }
    },

    getPersonaNaturalDetails: async () =>{
        try {
            const personaNatural = await tb_persona_natural.findAll();
            return personaNatural;
            
        } catch(err) {
            console.log(err);
        }
    },

    getPersonaNatural: async (root, {id_persona_Natural}) =>{
        try {
            const pn = await tb_persona_natural.findByPk(id_persona_Natural)
            return pn;
            
        } catch(err) {
            console.log(err);
        }
    },

    

    getPersonaJuridicaDetails: async () =>{
        try {
            const personaJuridica = await tb_persona_juridica.findAll();
            return personaJuridica;
            
        } catch(err) {
            console.log(err);
        }
    },
    getPersonaJuridica: async (root, {id_persona_juridica}) =>{
        try {
            const pj = await tb_persona_juridica.findByPk(id_persona_juridica)
            return pj;
            
        } catch(err) {
            console.log(err);
        }
    },

    getConstruccionesDetails: async () =>{
        try {
            const construcciones = await tb_construcciones.findAll();
            return construcciones;
            
        } catch(err) {
            console.log(err);
        }
    },

    getConstruccion: async (root, {id_construccion}) =>{
        try {
            const constru = await tb_construcciones.findByPk(id_construccion)
            return constru;
            
        } catch(err) {
            console.log(err);
        }
    },

    getTerrenosDetails: async () =>{
        try {
            const terrenos = await tb_terrenos.findAll();
            return terrenos;
            
        } catch(err) {
            console.log(err);
        }
    },

    getTerreno: async (root, {id_Terreno}) =>{
        try {
            const terr = await tb_terrenos.findByPk(id_Terreno)
            return terr
            
        } catch(err) {
            console.log(err);
        }
    },


}


const Predio = {
	propietario: (pred) => tb_propietarios.findByPk(pred.id_propietario)
}

const Mutation = {

    createPredio: async (_, { input }) => {
    try {
            const predio = new tb_predios(input);
            const resultado = await predio.save();
            return resultado;
        } catch (error) {
            console.log(error);
        }

},
	updatePredio: async (_ , {
		id_predio,
        nombre_predio,
        departamento_predio,
        municipio_predio,
        avaluo_predio,
        id_terreno
	}) => {
		try {
			await tb_predios && tb_predios.update({
				id_predio,
                nombre_predio,
                departamento_predio,
                municipio_predio,
                avaluo_predio,
                id_terreno
			} ,{ where: { id_predio: id_predio } });
			return "Predio Updated";
		}catch (err) {
			console.error(err);
  		}	
	},

	deletePredio: async(_ , { id_predio }) => {
		await tb_predios.destroy({ where: { id_predio: id_predio }})
		return "Predio Deleted";
	},

    createPropietario: async (_, { input }) => {
        try {
                const propietario = new tb_propietarios(input);
                const resultado = await propietario.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
    
    },

    updatePropietario: async (_ , {
		id_propietario,
        id_predio,
        direccion_propietario,
        telefono_propietario,
        tipo_propietario,
        correo_propietario
	}) => {
		try {
			await tb_propietarios && tb_propietarios.update({
				id_propietario,
                id_predio,
                direccion_propietario,
                telefono_propietario,
                tipo_propietario,
                correo_propietario
			} ,{ where: { id_propietario: id_propietario } });
			return "Propietario Updated";
		}catch (err) {
			console.error(err);
  		}	
	},

    deletePropietario: async(_ , { id_propietario }) => {
		await tb_propietarios.destroy({ where: { id_propietario: id_propietario }})
		return "Propietario Deleted";
	},


    createConstruccion: async (_, { input }) => {
        try {
                const construccion = new tb_construcciones(input);
                const resultado = await construccion.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
    
    },

    updateConstrucciones: async (_ , {
        id_predio,
        id_construccion,
        numero_pisos_construccion,
        area_total_construccion,
        tipo_construccion,
        direccion_construccion
	}) => {
		try {
			await tb_construcciones&& tb_construcciones.update({
				id_predio,
                id_construccion,
                numero_pisos_construccion,
                area_total_construccion,
                tipo_construccion,
                direccion_construccion
			} ,{ where: { id_construccion: id_construccion } });
			return "Construccion Updated";
		}catch (err) {
			console.error(err);
  		}	
	},

    deleteConstrucciones: async(_ , { id_construccion }) => {
		await tb_construcciones.destroy({ where: { id_construccion: id_construccion }})
		return "Construccion Deleted";
	},


    createTerreno: async (_, { input }) => {
        try {
                const terreno = new tb_terrenos(input);
                const resultado = await terreno.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
    
    },

    updateTerrenos: async (_ , {
        id_predio,
        id_terreno,
        area_total_terreno,
        valor_comercial_terreno,
        fuente_hidrica_terreno,
        tipo_terreno,
        tiene_construccion_terreno,
	}) => {
		try {
			await tb_construcciones&& tb_construcciones.update({
				id_predio,
                id_terreno,
                area_total_terreno,
                valor_comercial_terreno,
                fuente_hidrica_terreno,
                tipo_terreno,
                tiene_construccion_terreno,
			} ,{ where: { id_terreno: id_terreno } });
			return "Terreno Updated";
		}catch (err) {
			console.error(err);
  		}	
	},

    deleteTerreno: async(_ , { id_terreno }) => {
		await tb_terrenos.destroy({ where: { id_terreno: id_terreno}})
		return "Construccion Deleted";
	},










}



module.exports = {Query, Predio, Mutation}