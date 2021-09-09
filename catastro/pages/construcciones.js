import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const OBTENER_CONSTRUCCIONES = gql`
  query Query {
    getConstruccionesDetails {
      id_predio
      id_construccion
      numero_pisos_construccion
      area_total_construccion
      direccion_construccion
    }
  }
`;

const construcciones = () => {
  //consultar predios

  const { data, loading, error } = useQuery(OBTENER_CONSTRUCCIONES);
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Construcciones</h1>
        <div>
        <Link href="/NuevaConstruccion">
          
          <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
            Nueva construccion
          </a>
        </Link>
        </div>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/6 py-2">ID Predio </th>
              <th className="w-1/6 py-2">ID Construccion</th>
              <th className="w-1/6 py-2">Numero de pisos </th>
              <th className="w-1/6 py-2">Area total construccion </th>
              <th className="w-1/6 py-2">direccion_construccion</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {
              //para iterar sobre la base de datos
              /* {data.getConstruccionesDetails.map( construcciones => (
              <tr key={construcciones.id_construcciones}>
                <td className="border px-4 py-2">{construcciones.id_predio}</td>
                <td className="border px-4 py-2">{construcciones.id_construccion}</td>
                <td className="border px-4 py-2">{construcciones.numero_pisos_construccion}</td>
                <td className="border px-4 py-2">{construcciones.area_total_construccion}</td>
                <td className="border px-4 py-2">{construcciones.direccion_construccion}</td>
                </tr>
            ))} */
            }
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default construcciones;
