import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const NUEVA_CONSTRUCCION = gql`
  mutation Mutation($createConstruccionInput: ConstruccionInput) {
    createConstruccion(input: $createConstruccionInput) {
      id_predio
      id_construccion
      numero_pisos_construccion
      area_total_construccion
      tipo_construccion
      direccion_construccion
    }
  }
`;

const NuevaConstruccion = () => {
  //mutacion para crear nuevas construcciones

  const [createConstruccion] = useMutation(NUEVA_CONSTRUCCION);

  //Validacion de formulario
  const formik = useFormik({
    initialValues: {
      id_predio: "",
      id_construccion: "",
      numero_pisos_construccion: "",
      area_total_construccion: "",
      tipo_construccion: "",
      direccion_construccion: "",
    },

    validationSchema: Yup.object({
      id_predio: Yup.string().required("El id es obligatorio"),
      id_construccion: Yup.string().required(
        "El did de la construccion  es obligatorio"
      ),

      numero_pisos_construccion: Yup.string().required(
        "El numero de pisos es obligatorio"
      ),
      area_total_construccion: Yup.string().required(
        "El area total es obligatorio"
      ),
      tipo_construccion: Yup.string().required(
        "El tipo de construccion es obligatorio"
      ),
      direccion_construccion: Yup.string().required(
        "La direccion de la construccion es obligatorio"
      ),
    }),

    onSubmit: async (valores) => {
      const {
        id_predio,
        id_construccion,
        numero_pisos_construccion,
        area_total_construccion,
        tipo_construccion,
        direccion_construccion,
      } = valores;

      try {
        const { data } = await createConstruccion({
          variables: {
            createConstruccionInput: {
              id_predio,
              id_construccion,
              numero_pisos_construccion,
              area_total_construccion,
              tipo_construccion,
              direccion_construccion,
            },
          },
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
      <h1 className="text-center text-blackfont-black">
        {" "}
        Crear Nueva construccion
      </h1>

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
                htmlFor="id_construccion"
              >
                ID construccion
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_construccion"
                type="nombre"
                placeholder="id de la construccion"
                value={formik.values.id_construccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.id_construccion && formik.errors.id_construccion ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.id_construccion}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="numero_pisos_construccion"
              >
                Numero de pisos en la construccion
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numero_pisos_construccion"
                type="number"
                placeholder="numero de pisos de la construccion"
                value={formik.values.numero_pisos_construccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.numero_pisos_construccion &&
            formik.errors.numero_pisos_construccion ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.numero_pisos_construccion}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="area_total_construccion"
              >
                Area total de construccion
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="area_total_construccion"
                type="number"
                placeholder="Area total de la construccion"
                value={formik.values.area_total_construccion}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.area_total_construccion &&
            formik.errors.area_total_construccion ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.area_total_construccion}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo_construccion"
              >
                Tipo de construccion
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tipo_construccion"
                type="nombre"
                placeholder="Tipo de construccion"
                value={formik.values.tipo_construccion}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.tipo_construccion && formik.errors.tipo_construccion ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.tipo_construccion}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="direccion_construccion"
              >
                direccion de la construccion
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="direccion_construccion"
                type="nombre"
                placeholder="Direccion de la construccion"
                value={formik.values.direccion_construccion}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
              ></input>
            </div>

            {formik.touched.direccion_construccion && formik.errors.direccion_construccion ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.direccion_construccion}</p>
              </div>
            ) : null}


            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Agregar Nueva Construccion"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaConstruccion;
