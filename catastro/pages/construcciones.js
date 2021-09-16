import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";

const  ELIMINAR_CONSTRUCCION = gql `
mutation Mutation($deleteConstruccionesIdConstruccion: ID!) {
  deleteConstrucciones(id_construccion: $deleteConstruccionesIdConstruccion)
}`;

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
//Borrar terreno
const [deleteConstrucciones] = useMutation(ELIMINAR_CONSTRUCCION);

const confirmarEliminarConstruccion = (id_construccion) => {
  Swal.fire({
    title: "¿Deseas eliminar esta construccion?",
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

        const { deleteConstruccionesIdConstruccion} = await deleteConstrucciones({
          variables: {
            deleteConstruccionesIdConstruccion: id_construccion,
          },
        });

        // mostrar alerta
        Swal.fire("Eliminar!", "ELa construcción a sido eliminada", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};


  //consultar predios

  const { data, loading, error } = useQuery(OBTENER_CONSTRUCCIONES);
  if (loading) return "Cargando....";
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>
      <section>
          <h1 className="font-bold text-2xl text-gray-800 font-light px-5">
            construcciones existentes
          </h1>
        </section>
        <section className="flex flex-col">
          <div>
            <Link href="/NuevaConstruccion">
              <a className="font-bold bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
                Nueva construcción
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
              <th className="w-1/8 py-2">Eliminar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {
              //para iterar sobre la base de datos
            }
              {data.getConstruccionesDetails.map( construcciones => (
              <tr key={construcciones.id_construccion}>
                <td className="border px-4 py-2">{construcciones.id_predio}</td>
                <td className="border px-4 py-2">{construcciones.id_construccion}</td>
                <td className="border px-4 py-2">{construcciones.numero_pisos_construccion}</td>
                <td className="border px-4 py-2">{construcciones.area_total_construccion}</td>
                <td className="border px-4 py-2">{construcciones.direccion_construccion}</td>
                <td className="border px-6 py-2">
                    <button
                      type="button"
                      className="flex justify-center items-center bg-red-800 py-2 px-4  w-full text-white rounded text-xs uppercase font-bold"
                      onClick={() =>
                        confirmarEliminarConstruccion(construcciones.id_construccion)
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

export default construcciones;
