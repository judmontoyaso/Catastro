import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { useQuery, gql, useMutation, fromPromise } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";

const OBTENER_PREDIO = gql`
  query Query($getPredioIdPredio: ID!) {
    getPredio(id_predio: $getPredioIdPredio) {
      id_predio
      nombre_predio
      departamento_predio
      municipio_predio
      avaluo_predio
      id_terreno
    }
  }
`;

const EditarPredio = () => {
  //obtener ID actual

  const router = useRouter();
  const {
    query: { pid_predio },
  } = router;
  //console.log(pid_predio);

  // consultar para obtener cliente
  const { data, loading, error } = useQuery(OBTENER_PREDIO, {
    variables: {
      getPredioIdPredio: pid_predio,
    },
  });

  //Schema de validacion

  const schemaValidacion = Yup.object({
    id_predio: Yup.string().required("El id es obligatorio"),
    nombre_predio: Yup.string().required("El nombre del predio es obligatorio"),
    departamento_predio: Yup.string().required(
      "El departamento  es obligatorio"
    ),
    municipio_predio: Yup.string().required("El municipio es obligatorio"),
    avaluo_predio: Yup.string().required("El nombre del predio es obligatorio"),
  });

  //cargando para evitar conflictos mientras se hace consulta a la base de datos

  if (loading) return "Cargando...";

  //console.log(data.getPredio)

  //

  //definir valores obtenidos

  const { getPredio } = data;

  return (
    //Retorna el formulario para editar, se importa el layout

    <Layout>
      <h1 className="text-center text-black font-black"> Editar predio</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            //para el schema de validacion con yup
            validationSchema={schemaValidacion}
            //para reinicar el formulario con valores inciales del predio a editar
            enableReinitialize
            initialValues={getPredio}
            //para el onsubmit ya que no se tiene hook

            onSubmit={
              (valores) => {
                console.log(valores)
            }
            }
          >
            {(props) => {
              //console.log(props);

              return (
                <form
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      value={props.values.id_predio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>

                  {props.touched.id_predio && props.errors.id_predio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="front-bold">Error</p>
                      <p>{props.errors.id_predio}</p>
                    </div>
                  ) : null}

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
                      value={props.values.nombre_predio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>

                  {props.touched.nombre_predio && props.errors.nombre_predio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="front-bold">Error</p>
                      <p>{props.errors.nombre_predio}</p>
                    </div>
                  ) : null}

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
                      value={props.values.departamento_predio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>

                  {props.touched.departamento_predio &&
                  props.errors.departamento_predio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="front-bold">Error</p>
                      <p>{props.errors.departamento_predio}</p>
                    </div>
                  ) : null}

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
                      value={props.values.municipio_predio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>

                  {props.touched.municipio_predio &&
                  props.errors.municipio_predio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="front-bold">Error</p>
                      <p>{props.errors.municipio_predio}</p>
                    </div>
                  ) : null}

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
                      value={props.values.avaluo_predio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>

                  {props.touched.avaluo_predio && props.errors.avaluo_predio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="front-bold">Error</p>
                      <p>{props.errors.avaluo_predio}</p>
                    </div>
                  ) : null}

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
                      value={props.values.id_terreno}
                      onChange={props.handleChange}
                      onChange={props.handleChange}
                    ></input>
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Editar Predio"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarPredio;
