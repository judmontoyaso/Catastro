import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from 'next/link'

const OBTENER_PROPIETARIOS = gql`
  query Query {
    getPropietarioDetails {
        id_propietario
        id_predio
        direccion_propietario
        telefono_propietario
        tipo_propietario
        correo_propietario
  }
}
`;

const index = () => {
  //consultar propietarios

  const { data, loading, error } = useQuery(OBTENER_PROPIETARIOS);
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>

        <h1 className="text-2xl text-gray-800 font-light">propietarios</h1>

        <div>
        <Link href="/NuevoPropietario">
          <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
            Nuevo Propietario
          </a>
        </Link>

        </div>
        

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/6 py-2">ID Propietario </th>
              <th className="w-1/6 py-2">ID predio </th>
              <th className="w-1/6 py-2">Direccion </th>
              <th className="w-1/6 py-2">Telefono </th>
              <th className="w-1/6 py-2">Tipo propietario </th>
              <th className="w-1/6 py-2">Correo </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {
              //para iterar sobre la base de datos, pero no me lee la funcion getPropietarioDetails
              /* {data.getPropietarioDetails.map( propietario => (
              <tr key={propietario.id_propietario}>
                <td className="border px-4 py-2">{propietario.id_predio}</td>
                <td className="border px-4 py-2">{propietario.direccion_propietario}</td>
                <td className="border px-4 py-2">{propietario.telefono_propietario}</td>
                <td className="border px-4 py-2">{propietario.tipo_propietario}</td>
                <td className="border px-4 py-2">{propietario.correo_propietario}</td>
                </tr>
            ))} */
            }
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default index;
