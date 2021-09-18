import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";

const OBTENER_PREDIO = gql `
query Query($getPredioIdPredio: ID!) {
  getPredio(id_predio: $getPredioIdPredio) {
    id_predio
    nombre_predio
    departamento_predio
    municipio_predio
    avaluo_predio
    id_terreno
  }
}`


const EditarPredio = () => {
  //obtener ID actual

  const router = useRouter();
  const {
    query: { pid_predio },
  } = router;
  //console.log(pid_predio);


// consultar para obtener cliente
const {data, loading, error} = useQuery(OBTENER_PREDIO, {
    variables:{
        getPredioIdPredio : pid_predio
    }
});

if (loading) return 'Cargando...';




  return (
    //Retorna el formulario para editar, se importa el layout

    <Layout>
      <h1 className="text-center text-black font-black"> Editar predio</h1>


      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            /* onSubmit={formik.handleSubmit} */
          >
            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="id_predio"
              >
                ID Predio
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_predio"
                type="ID"
                placeholder="ID predio"
                /* value={formik.values.id_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} */
              ></input>
            </div>

           {/*  {formik.touched.id_predio && formik.errors.id_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.id_predio}</p>
              </div>
            ) : null}
 */}
            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre_predio"
              >
                nombre Predio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre_predio"
                type="nombre"
                placeholder="Nombre del predio"
                /* value={formik.values.nombre_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} */
              ></input>
            </div>

           {/*  {formik.touched.nombre_predio && formik.errors.nombre_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.nombre_predio}</p>
              </div>
            ) : null}
 */}
            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="departamento_predio"
              >
                departamento Predio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="departamento_predio"
                type="nombre"
                placeholder="Departamento donde esta el predio"
                /* value={formik.values.departamento_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} */
              ></input>
            </div>

           {/*  {formik.touched.departamento_predio &&
            formik.errors.departamento_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.departamento_predio}</p>
              </div>
            ) : null} */}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="municipio_predio"
              >
                Municipio Predio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="municipio_predio"
                type="nombre"
                placeholder="Municipio donde esta el predio"
               /*  value={formik.values.municipio_predio}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} */
              ></input>
            </div>

           {/*  {formik.touched.municipio_predio &&
            formik.errors.municipio_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.municipio_predio}</p>
              </div>
            ) : null}
 */}
            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="avaluo_predio"
              >
                Avaluo del Predio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="avaluo_predio"
                type="ID"
                placeholder="avaluo del predio"
                /* value={formik.values.avaluo_predio}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} */
              ></input>
            </div>

            {/* {formik.touched.avaluo_predio && formik.errors.avaluo_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.avaluo_predio}</p>
              </div>
            ) : null} */}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="id_terreno"
              >
                ID del terreno
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_terreno"
                type="nombre"
                placeholder="ID del terreno"
               /*  value={formik.values.id_terreno}
                onChange={formik.handleChange}
                onChange={formik.handleChange} */
              ></input>
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Agregar Nuevo Predio"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditarPredio;
