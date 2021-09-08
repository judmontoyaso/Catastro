import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import fetch from 'node-fetch';

const MyApp = ({Component, pageProps}) => {
console.log("Desde myapp")

  return(
    <ApolloProvider client = {client}>
        <Component {...pageProps} />
    </ApolloProvider>
  )

}

export default MyApp;