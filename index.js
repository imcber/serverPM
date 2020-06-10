import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./db/resolver";
import { typeDefs } from "./db/schema";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server have runs in http://localhost:4000${server.graphqlPath}`);
});
