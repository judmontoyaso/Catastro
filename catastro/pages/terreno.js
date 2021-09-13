import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from 'next/link'

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

const terreno = () => {
  //consultar predios

  const { data, loading, error } = useQuery(OBTENER_TERRENOS);
  if (loading) return "Cargando....";
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>

        <h1 className="text-2xl text-gray-800 font-light">Predios</h1>
        <Link href="/NuevoTerreno">
          <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
            Nuevo Terreno
          </a>
        </Link>
        

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/6 py-2">ID Predio </th>
              <th className="w-1/6 py-2">ID Terreno </th>
              <th className="w-1/6 py-2">Area Total </th>
              <th className="w-1/6 py-2">Valor Comercial </th>
              <th className="w-1/6 py-2">Tipo de terreno </th>
              <th className="w-1/6 py-2">Fuentes </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {
              //para iterar sobre la base de datos, pero no me lee la funcion getTerrenosDetails 
            }
              {data.getTerrenosDetails.map( terreno => (
              <tr key={terreno.id_terreno}>
                <td className="border px-4 py-2">{terreno.id_predio}</td>
                <td className="border px-4 py-2">{terreno.area_total_terreno}</td>
                <td className="border px-4 py-2">{terreno.valor_comercial_terreno}</td>
                <td className="border px-4 py-2">{terreno.fuente_hidrica_terreno}</td>
                <td className="border px-4 py-2">{terreno.tipo_terreno}</td>
                <td className="border px-4 py-2">{terreno.tiene_construccion_terreno}</td>
                </tr>
            ))} 
            
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default terreno;
