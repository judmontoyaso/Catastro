import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import Swal from "sweetalert2";

const ELIMINAR_PROPIETARIO = gql`
  mutation Mutation($deletePropietarioIdPropietario: ID!) {
    deletePropietario(id_propietario: $deletePropietarioIdPropietario)
  }
`;

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

const propietarios = () => {
  const [deletePropietario] = useMutation(ELIMINAR_PROPIETARIO);

  //borrar propietario

  const confirmarEliminarPropietario = (id_propietario) => {
    Swal.fire({
      title: "¿Deseas eliminar este propietaro?",
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

          const { deletePropietarioIdPropietario } = await deletePropietario({
            variables: {
              deletePropietarioIdPropietario: id_propietario,
            },
          });

          // mostrar alerta
          Swal.fire("Eliminar!", "El propietario a sido eliminado", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //consultar propietarios

  const { data, loading, error } = useQuery(OBTENER_PROPIETARIOS);
  if (loading) return "Cargando....";
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>
        <section>
          <h1 className="font-bold text-2xl text-gray-800 font-light px-5">
            propietarios existentes
          </h1>
        </section>
        <section className="flex flex-col">
          <div>
            <Link href="/NuevoPropietario">
              <a className="font-bold bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 upper-case font-bold">
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
                <th className="w-1/8 py-2">Eliminar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {/* para iterar sobre la base de datos, pero no me lee la funcion getPropietarioDetails */}
              {data.getPropietarioDetails.map((propietario) => (
                <tr key={propietario.id_propietario}>
                  <td className="border px-4 py-2">
                    {propietario.id_propietario}
                  </td>
                  <td className="border px-4 py-2">{propietario.id_predio}</td>
                  <td className="border px-4 py-2">
                    {propietario.direccion_propietario}
                  </td>
                  <td className="border px-4 py-2">
                    {propietario.telefono_propietario}
                  </td>
                  <td className="border px-4 py-2">
                    {propietario.tipo_propietario}
                  </td>
                  <td className="border px-4 py-2">
                    {propietario.correo_propietario}
                  </td>
                  <td className="border px-6 py-2">
                    <button
                      type="button"
                      className="flex justify-center items-center bg-red-800 py-2 px-4  w-full text-white rounded text-xs uppercase font-bold"
                      onClick={() =>
                        confirmarEliminarPropietario(propietario.id_propietario)
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

export default propietarios;
