import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const NUEVO_PROPIETARIO = gql`
  mutation Mutation($createPropietarioInput: PropietarioInput) {
  createPropietario(input: $createPropietarioInput) {
    id_propietario
    id_predio
    direccion_propietario
    telefono_propietario
    tipo_propietario
    correo_propietario
  }
}
`;

const NuevoPropietario = () => {
  //mutacion para crear nuevos predios

  const [createPropietario] = useMutation(NUEVO_PROPIETARIO);

  //Validacion de formulario
  const formik = useFormik({
    initialValues: {
      id_propietario: "",
      id_predio: "",
      direccion_propietario: "",
      telefono_propietario: "",
      tipo_propietario: "",
      correo_propietario: "",
    },

    validationSchema: Yup.object({
      id_propietario: Yup.string().required("El id es obligatorio"),
      id_predio: Yup.string().required("El id del predio es obligatorio"),
      direccion_propietario: Yup.string().required(
        "La direccion del propietario  es obligatorio"
      ),
      telefono_propietario: Yup.string().required("El municipio es obligatorio"),
      tipo_propietario: Yup.string().required(
        "El telefono del predio es obligatorio"
      ),
    }),

    onSubmit: async (valores) => {
      const {
        id_propietario,
        id_predio,
        direccion_propietario,
        telefono_propietario,
        tipo_propietario,
        correo_propietario,
      } = valores;

      try {
        const { data } = await createPropietario({
          variables: {
            createPropietarioInput: {
              id_propietario,
              id_predio,
              direccion_propietario,
              telefono_propietario,
              tipo_propietario,
              correo_propietario,
            },
          },
        });
        console.log(valores);
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
        Crear Nuevo propietario
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
                ID Propietario
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_propietario"
                type="ID"
                placeholder="ID predio"
                value={formik.values.id_propietario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.id_propietario && formik.errors.id_propietario ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.id_propietario}</p>
              </div>
            ) : null}

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
                type="nombre"
                placeholder="ID del predio"
                value={formik.values.id_predio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.id_predio && formik.errors.id_predio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.nombre_predio}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="direccion_propietario"
              >
                Direccion propietario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="direccion_propietario"
                type="nombre"
                placeholder="Direccion del propietario"
                value={formik.values.direccion_propietario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.direccion_propietario &&
            formik.errors.direccion_propietario ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.direccion_propietario}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono_propietario"
              >
                Telefono Propietario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono_propietario"
                type="number"
                placeholder="Telefono del propietario"
                value={formik.values.telefono_propietario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.telefono_propietario &&
            formik.errors.telefono_propietario ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.telefono_propietario}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo_propietario"
              >
                Tipo de propietario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tipo_propietario"
                type="nombre"
                placeholder="Tipo de persona"
                value={formik.values.tipo_propietario}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
              ></input>
            </div>

            {formik.touched.tipo_propietario &&
            formik.errors.tipo_propietario ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.tipo_propietario}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correo_propietario"
              >
                E-mail propietario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="correo_propietario"
                type="nombre"
                placeholder="Email del propietario"
                value={formik.values.correo_propietario}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Agregar Nuevo Propietario"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPropietario;
