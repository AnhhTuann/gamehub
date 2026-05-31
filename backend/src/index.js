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
  
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'omniwear_super_secret_key';

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      let user = null;
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          user = jwt.verify(token, JWT_SECRET);
        } catch (e) {
          console.warn("Invalid token:", e.message);
        }
      }
      return { user };
    },
  }));

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
