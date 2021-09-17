import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVO_TERRENO = gql`
  mutation Mutation($createTerrenoInput: TerrenoInput) {
  createTerreno(input: $createTerrenoInput) {
    id_predio
    id_terreno
    area_total_terreno
    valor_comercial_terreno
    fuente_hidrica_terreno
    tipo_terreno
    tiene_construccion_terreno
  }
}
`;

const OBTENER_TERRENOS = gql`
  query Query {
    getTerrenosDetails {
      id_predio
      id_terreno
      area_total_terreno
      valor_comercial_terreno
      fuente_hidrica_terreno
      tipo_terreno
      tiene_construccion_terreno
    }
  }
`;

const NuevoTerreno = () => {

  const router = useRouter();


  //mutacion para crear nuevos terrenos

  const [createTerreno] = useMutation(NUEVO_TERRENO, {
    update(cache, {data: {createTerreno}}){
      //obtener el objeto de cache que se necesita actualizar
      const{getTerrenosDetails} = cache.readQuery({query: OBTENER_TERRENOS});

      //Reescribir el cache(el cache es inmutable, no se debe modificar, se debe reescribir)
      cache.writeQuery({
        query: OBTENER_TERRENOS,
        data: {
          getTerrenosDetails : [...getTerrenosDetails, createTerreno]
        }
      })
    }
  });

  //Validacion de formulario
  const formik = useFormik({
    initialValues: {
      id_predio: "",
      id_terreno: "",
      area_total_terreno: "",
      valor_comercial_terreno: "",
      fuente_hidrica_terreno: "",
      tipo_terreno: "",
      tiene_construccion_terreno: "",
    },

    validationSchema: Yup.object({
      id_predio: Yup.string().required("El id es obligatorio"),
      id_terreno: Yup.string().required("El id del terreno es obligatorio"),
      area_total_terreno: Yup.string().required(
        "El area total del terreno es obligatorio"
      ),
      valor_comercial_terreno: Yup.string().required(
        "El municipio es obligatorio"
      ),
      fuente_hidrica_terreno: Yup.string().required(
        "El valor comercial esbligatorio"
      ),
      tipo_terreno: Yup.string().required(
        "El nel tipo de terreno es obligatorio"
      ),
      tiene_construccion_terreno: Yup.string().required(
        "Responda si tiene o no construcciones"
      ),
    }),

    onSubmit: async (valores) => {
      const {
        id_predio,
        id_terreno,
        area_total_terreno,
        valor_comercial_terreno,
        fuente_hidrica_terreno,
        tipo_terreno,
        tiene_construccion_terreno,
      } = valores;

      try {
        const { data } = await createTerreno({
          variables: {
            createTerrenoInput: {
              id_predio,
              id_terreno,
              area_total_terreno,
              valor_comercial_terreno,
              fuente_hidrica_terreno,
              tipo_terreno,
              tiene_construccion_terreno,
            },
          },
        });
        router.push('/terreno')
      } catch (error) {
        console.log(error);
      }

      console.log("enviando");
      console.log(valores);
    },
  });

  return (
    <Layout>
      <h1 className="text-center text-blackfont-black"> Crear Nuevo Terreno</h1>

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
                ID Terreno
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id_terreno"
                type="ID"
                placeholder="id del terreno"
                value={formik.values.id_terreno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.id_terreno && formik.errors.id_terreno ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.id_terreno}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="area_total_terreno"
              >
                Area Total del terreno
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="area_total_terreno"
                type="number"
                placeholder="Area total del terreno"
                value={formik.values.area_total_terreno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.area_total_terreno &&
            formik.errors.area_total_terreno ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.area_total_terreno}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="valor_comercial_terreno"
              >
                Valor comercial del terreno
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="valor_comercial_terreno"
                type="number"
                placeholder="Municipio donde esta el predio"
                value={formik.values.valor_comercial_terreno}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.valor_comercial_terreno &&
            formik.errors.valor_comercial_terreno ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.valor_comercial_terreno}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fuente_hidrica_terreno"
              >
                Fuente hidrica cerca del predio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fuente_hidrica_terreno"
                type="nombre"
                placeholder="Fuente hidrica"
                value={formik.values.fuente_hidrica_terreno}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>

            {formik.touched.fuente_hidrica_terreno &&
            formik.errors.fuente_hidrica_terreno ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.fuente_hidrica_terreno}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo_terreno"
              >
                tipo de terreno
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tipo_terreno"
                type="nombre"
                placeholder="ID del terreno"
                value={formik.values.tipo_terreno}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
              ></input>
            </div>
            {formik.touched.tipo_terreno && formik.errors.tipo_terreno ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.tipo_terreno}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                class
                name="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tiene_construccion_terreno"
              >
                Construcciones en el terreno
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tiene_construccion_terreno"
                type="nombre"
                placeholder="Construcciones del terreno"
                value={formik.values.tiene_construccion_terreno}
                onChange={formik.handleChange}
                onChange={formik.handleChange}
              ></input>
            </div>
            {formik.touched.tiene_construccion_terreno &&
            formik.errors.tiene_construccion_terreno ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="front-bold">Error</p>
                <p>{formik.errors.tiene_construccion_terreno}</p>
              </div>
            ) : null}

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

export default NuevoTerreno;
