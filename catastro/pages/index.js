import Head from 'next/head'
import Layout from '../components/Layout';
import {gql, useQuery} from '@apollo/client';



const index =  () =>{
  //consultar predios

  
  return (
  <div>
    <Layout>
      <h1 className ="text-2xl text-gray-800 font-light">Predios</h1>
    </Layout>
  </div>
)}

export default index