import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {gql, useQuery, useMutation} from '@apollo/client'
import { useRouter } from 'next/router'



const NUEVO_PREDIO = gql`

    mutation Mutation($createPredioInput: PredioInput) {
    createPredio(input: $createPredioInput) {
        id_predio
        nombre_predio
        departamento_predio
        municipio_predio
        avaluo_predio
        id_terreno

}
}`;

const QUERY = gql`
    query Query {
        getPredioDetails {
        id_predio
        nombre_predio
        departamento_predio
        municipio_predio
        avaluo_predio
        id_terreno
    }
  }
`;

const NuevoPredio = () => {

    //mutacion para crear nuevos predios

    const [Mutation] = useMutation(NUEVO_PREDIO, {
        update(cache, { data: { Mutation } }) {
            // obtener el objeto de cache
            const { QUERY } = cache.readQuery({ query: QUERY  });
            
            // reescribir ese objeto
            cache.writeQuery({
                query: QUERY,
                data: {
                    QUERY: [...QUERY, Mutation]
                }
            });
        }
    });

    //Validacion de formulario
    const formik = useFormik(
        {
            initialValues: {
                id_predio: '',
                nombre_predio: '',
                departamento_predio: '',
                municipio_predio: '',
                avaluo_predio: '',
                id_terreno:''
            },

            validationSchema: Yup.object({
                id_predio: Yup.string() .required('El ID es obligatorio'),
                nombre_predio: Yup.string() .required('El nombre es obligatorio'),
                departamento_predio: Yup.string() .required('El departamento es obligatorio'),
                municipio_predio: Yup.string() .required('El municipio es obligatorio'),
                avaluo_predio: Yup.string() .required('El avaluo es obligatorio'),
            }),

            onSubmit: async valores =>{
                const {id_predio,nombre_predio,departamento_predio,municipio_predio,avaluo_predio,id_terreno} = valores;

                try{
                    const {data} = await Mutation({
                        variables: {
                            input: {
                                id_predio,
                                nombre_predio,
                                departamento_predio,
                                municipio_predio,
                                avaluo_predio,
                                id_terreno

                            }
                        }

                    })
                }catch (error) {
                    console.log(error);
                    console.log(variables);
            }
        }
        })

    return (
    
            <Layout>
                <h1 className = "text-center text-blackfont-black"> Crear Nuevo predio</h1>
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}>

                            <div className="mb-4">

                                <label class name ="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_predio">
                                    ID Predio
                                </label>

                                <input  className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id = "id_predio"
                                type = "ID"
                                placeholder = "ID predio"
                                onChange={formik.handleChange}
                                value={formik.values.id_predio}>
                                    
                                </input>
                            </div>

                            <div className="mb-4">
                                <label class name ="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_predio">
                                    nombre Predio
                                </label>
                                <input  className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id = "nombre_predio"
                                type = "nombre"
                                placeholder = "Nombre del predio"
                                onChange={formik.handleChange}
                                value={formik.values.nombre_predio}>
                                </input>
                            </div>

                            <div className="mb-4">
                                <label class name ="block text-gray-700 text-sm font-bold mb-2" htmlFor="departamento_predio">
                                    departamento Predio
                                </label>
                                <input  className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id = "departamento_predio"
                                type = "nombre"
                                placeholder = "Departamento donde esta el predio"
                                value = {formik.values.departamento_predio}
                                onChange={formik.handleChange}

                                value={formik.values.departamento_predio}>
                                </input>
                            </div>

                            <div className="mb-4">
                                <label class name ="block text-gray-700 text-sm font-bold mb-2" htmlFor="municipio_predio">
                                    Municipio Predio
                                </label>
                                <input  className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id = "municipio_predio"
                                type = "nombre"
                                placeholder = "Municipio donde esta el predio"
                                value = {formik.values.municipio_predio}
                                onChange={formik.handleChange}>
                                </input>
                            </div>

                            <input type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                value="Agregar Nuevo Predio"
                            />

                            
                        </form>

                    </div>

                   
                </div>
            </Layout>
        

    );
}

export default NuevoPredio