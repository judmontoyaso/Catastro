import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import Swal from "sweetalert2";

const ELIMINAR_TERRENOS = gql`
  mutation Mutation($deleteTerrenoIdTerreno: ID!) {
    deleteTerreno(id_terreno: $deleteTerrenoIdTerreno)
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

const terreno = () => {
  //borrar terreno

  const [deleteTerreno] = useMutation(ELIMINAR_TERRENOS);

  const confirmarEliminarTerreno = (id_terreno) => {
    Swal.fire({
      title: "¿Deseas eliminar este terreno?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo!",
      cancelButtonText: "No, cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //Eliminar por id

          const { deleteTerrenoIdTerreno } = await deleteTerreno({
            variables: {
              deleteTerrenoIdTerreno: id_terreno,
            },
          });

          // mostrar alerta
          Swal.fire("Eliminar!", "El terreno a sido eliminado", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //consultar predios

  const { data, loading, error } = useQuery(OBTENER_TERRENOS);
  if (loading) return "Cargando....";
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>
        <section>
          <h1 className="font-bold text-2xl text-gray-800 font-light px-5">
            Predios
          </h1>
        </section>
        <section className="flex flex-col">
          <div>
            <Link href="/NuevoTerreno">
              <a className="fon-bold bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
                Nuevo Terreno
              </a>
            </Link>
          </div>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/6 py-2">ID Predio </th>
                <th className="w-1/6 py-2">ID Terreno </th>
                <th className="w-1/6 py-2">Area Total </th>
                <th className="w-1/6 py-2">Valor Comercial </th>
                <th className="w-1/6 py-2">Tipo de terreno </th>
                <th className="w-1/6 py-2">Fuentes de agua</th>
                <th className="w-1/8 py-2">Eliminar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {
                //para iterar sobre la base de datos, pero no me lee la funcion getTerrenosDetails
              }
              {data.getTerrenosDetails.map((terreno) => (
                <tr key={terreno.id_terreno}>
                  <td className="border px-4 py-2">{terreno.id_predio}</td>
                  <td className="border px-4 py-2">{terreno.id_terreno}</td>
                  <td className="border px-4 py-2">
                    {terreno.area_total_terreno}
                  </td>
                  <td className="border px-4 py-2">
                    {terreno.valor_comercial_terreno}
                  </td>
                  <td className="border px-4 py-2">
                    {terreno.tipo_terreno}
                  </td>
                  <td className="border px-4 py-2">
                    {terreno.fuente_hidrica_terreno}
                  </td>
                  <td className="border px-6 py-2">
                    <button
                      type="button"
                      className="flex justify-center items-center bg-red-800 py-2 px-4  w-full text-white rounded text-xs uppercase font-bold"
                      onClick={() =>
                        confirmarEliminarTerreno(terreno.id_terreno)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Layout>
    </div>
  );
};

export default terreno;
