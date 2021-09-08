import head from "next/head";
import Layout from "../components/Layout";
import {useQuery, gql} from '@apollo/client'

const QUERY = gql`
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


const Propietarios = () => {

    
    const { data, loading } = useQuery(QUERY);
    console.log(data)
    console.log(loading)
 return(
    <div>
        <Layout>
            <h1 className ="text-2xl text-gray-800 font-light">Propietarios</h1>
        </Layout>
    </div>

 )}

export default Propietarios