import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";


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
  }
`;

const NuevoPredio = () => {
  //mutacion para crear nuevos predios

  

  const [createPredio] = useMutation(NUEVO_PREDIO);

  //Validacion de formulario
  const formik = useFormik({
    initialValues: {
      id_predio: "",
      nombre_predio: "",
      departamento_predio: "",
      municipio_predio: "",
      avaluo_predio: "",
      id_terreno: "",
    },

    validationSchema: Yup.object({
      id_predio: Yup.string().required("El id es obligatorio"),
      nombre_predio: Yup.string().required(
        "El nombre del predio es obligatorio"
      ),
      departamento_predio: Yup.string().required(
        "El departamento  es obligatorio"
      ),
      municipio_predio: Yup.string().required("El municipio es obligatorio"),
      avaluo_predio: Yup.string().required(
        "El nombre del predio es obligatorio"
      ),
    }),

    onSubmit: async (valores) => {
      const {
        id_predio,
        nombre_predio,
        departamento_predio,
        municipio_predio,
        avaluo_predio,
        id_terreno,
      } = valores;

      try {
        const { data } = await createPredio({
          variables: {
            input: {
              id_predio,
              nombre_predio,
              departamento_predio,
              municipio_predio,
              avaluo_predio,
              id_terreno,
            }
          }
        });
      } catch (error) {
        console.log(error);
      }

      console.log("enviando");
      console.log(valores);
    },
  });

  return (
    <Layout>
      <h1 className="text-center text-blackfont-black"> Crear Nuevo predio</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
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
                value={formik.values.id_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.id_predio && formik.errors.id_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.id_predio}</p>
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
                value={formik.values.nombre_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.nombre_predio && formik.errors.nombre_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.nombre_predio}</p>
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
                value={formik.values.departamento_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.departamento_predio &&
            formik.errors.departamento_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.departamento_predio}</p>
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
                value={formik.values.municipio_predio}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.municipio_predio &&
            formik.errors.municipio_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.municipio_predio}</p>
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
                type="nombre"
                placeholder="avaluo del predio"
                value={formik.values.avaluo_predio}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.avaluo_predio && formik.errors.avaluo_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.avaluo_predio}</p>
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
                value={formik.values.id_terreno}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
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

export default NuevoPredio;
