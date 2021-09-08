const { ApolloServer} = require('apollo-server');
const { gql } = require('apollo-server');
const fs = require('fs');
const resolvers = require('./GraphQL/resolvers');
const typeDefs = gql(fs.readFileSync('./GraphQL/typeDefs.graphql', {encoding:'utf-8'}));
const Sequelize = require('sequelize');
const server = new ApolloServer({typeDefs,resolvers});

const sequelize = new Sequelize('bd_Catastro', 'postgres', '1234', {
    host: 'localhost',
    dialect:'postgres'
})

server.listen(5000).then(({url})=>
{
    console.log("Server ready at " + url);
});

