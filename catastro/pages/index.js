import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import Swal from "sweetalert2";
import Router from "next/router";

//graphql

const ELIMINAR_PREDIO = gql`
  mutation Mutation($deletePredioIdPredio: ID!) {
    deletePredio(id_predio: $deletePredioIdPredio)
  }
`;

const OBTENER_PREDIOS = gql`
  query QUERY {
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

  const [deletePredio] = useMutation(ELIMINAR_PREDIO);

  //const {id_predio, nombre_predio,departamento_predio,municipio_predio,avaluo_predio,id_terreno} = predio;

  //confirmar eliminar predio
  const confirmarEliminarPredio = (id_predio) => {
    Swal.fire({
      title: "¿Deseas eliminar este predio?",
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

          const { deletePredioIdPredio } = await deletePredio({
            variables: {
              deletePredioIdPredio: id_predio,
            },
          });

          // mostrar alerta
          Swal.fire("Eliminar!", "El predio a sido eliminado", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //consultar predios
  const { data, loading } = useQuery(OBTENER_PREDIOS);

  //
  if (loading) return "Cargando....";

  console.log(loading);

  console.log(data);

  //funcion Routing para obtener id del predio y editar

  const editarPredio = (id_predio) => {
    Router.push({
      pathname: "/editarpredio/[id_predio]",
      query: { id_predio },
    });
  };
  //

  return (
    <div>
      <Layout>
        <section>
          <h1 className="font-bold text-2xl text-gray-800 font-light px-5">
            Predios existentes
          </h1>
        </section>
        <section className="flex flex-col">
          {/* boton nuevo predio */}
          <div>
            <Link href="/NuevoPredio">
              <a className="font-bold bg-blue-800  py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
                Ingresar Nuevo Predio
              </a>
            </Link>
          </div>

          {/* tabla para mostrar datos del query */}

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/8 py-2">ID Predio </th>
                <th className="w-1/8 py-2">Nombre </th>
                <th className="w-1/8 py-2">Departamento </th>
                <th className="w-1/8 py-2">Municipio </th>
                <th className="w-1/8 py-2">Avaluo </th>
                <th className="w-1/8 py-2">Terreno </th>
                <th className="w-1/8 py-2">Eliminar</th>
                <th className="w-1/8 py-2">Editar</th>
              </tr>
            </thead>

            {/* Iteracion sobre el arreglo  */}

            <tbody className="bg-white">
              {data.getPredioDetails.map((predio) => (
                <tr key={predio.id_predio}>
                  <td className="border px-6 py-2">{predio.id_predio}</td>
                  <td className="border px-6 py-2">{predio.nombre_predio}</td>
                  <td className="border px-6 py-2">
                    {predio.departamento_predio}
                  </td>
                  <td className="border px-6 py-2">
                    {predio.municipio_predio}
                  </td>
                  <td className="border px-6 py-2">{predio.avaluo_predio}</td>
                  <td className="border px-6 py-2">{predio.id_terreno}</td>
                  <td className="border px-6 py-2">
                    {/*  Buton de eliminar predio */}
                    <button
                      type="button"
                      className="flex justify-center items-center bg-red-700 py-2 px-4  w-full text-white rounded text-xs uppercase font-bold"
                      onClick={() => confirmarEliminarPredio(predio.id_predio)}
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
                  <td className="border px-6 py-2">
                    {/*  Buton de editar predio */}
                    <button
                      type="button"
                      className="flex justify-center items-center bg-blue-400 py-2 px-4  w-full text-white rounded text-xs uppercase font-bold"
                      onClick={() => editarPredio(predio.id_predio)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
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

export default index;
