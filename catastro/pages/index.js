import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";

const ELIMINAR_CLIENTE = gql`
  mutation Mutation($deletePredioIdPredio: ID!) {
    deletePredio(id_predio: $deletePredioIdPredio)
  }
`;

const OBTENER_PREDIOS = gql`
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

const index = () => {
  //mutation eliminar predio

  const [deletePredio]  = useMutation( ELIMINAR_CLIENTE);

  const {id_predio, nombre_predio,departamento_predio,municipio_predio,avaluo_predio,d_terreno} = predio;


  //consultar predios

  const { data, loading, error } = useQuery(OBTENER_PREDIOS);
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Predios</h1>
        <Link href="/NuevoPredio">
          <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
            Nuevo Predio
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/6 py-2">ID Predio </th>
              <th className="w-1/6 py-2">Nombre </th>
              <th className="w-1/6 py-2">Departamento </th>
              <th className="w-1/6 py-2">Municipio </th>
              <th className="w-1/6 py-2">Avaluo </th>
              <th className="w-1/6 py-2">Terreno </th>
              <th className="w-1/6 py-2">Eliminar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {
              data.getPredioDetails.map( predio => (
                <predio/>
              //para iterar sobre la base de datos, pero no me lee la funcion getPredioDetails
              /* {data.getPredioDetails.map( predio => (
              <tr key={predio.id_predio}>
                <td className="border px-4 py-2">{predio.nombre_predio}</td>
                <td className="border px-4 py-2">{predio.departamento_predio}</td>
                <td className="border px-4 py-2">{predio.municipio_predio}</td>
                <td className="border px-4 py-2">{predio.avaluo_predio}</td>
                <td className="border px-4 py-2">{predio.terreno_predio}</td>
                </tr>
            ))} */
              ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default index;
