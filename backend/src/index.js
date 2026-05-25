const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  
  app.use('/graphql', expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
