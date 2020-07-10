import express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { resolvers } from "./db/resolver";
import { typeDefs } from "./db/schema";
import { accountsServer } from "./config/db";
import { mergeResolvers, mergeTypeDefs } from "@graphql-toolkit/schema-merging";
import { AccountsModule } from "@accounts/graphql-api";
import User from "./db/resolvers/User";

const app = express();
//Generate the account-js module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

//Create Schema combining our schema wiht account-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers, User]),
  schemaDirectives: { ...accountsGraphQL.schemaDirectives },
});

const server = new ApolloServer({
  schema,
  context: async (req) => ({ ...(await accountsGraphQL.context(req)) }),
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(
    `Server is running in http://localhost:4000${server.graphqlPath}`
  );
});
