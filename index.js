import express from "express";
import { ApolloServer, makeExecutableSchema, gql } from "apollo-server";
//import { resolvers } from "./db/resolver";
//import { typeDefs } from "./db/schema";
import { accountsServer } from "./config/db";
import { mergeResolvers, mergeTypeDefs } from "@graphql-toolkit/schema-merging";
import { AccountsModule } from "@accounts/graphql-api";
import User from "./db/resolvers/User";

//connect db
//connectDB();

//Generate the account-js module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

const typeDefs = gql`
  extend type User {
    profile: CreateUserProfile
  }

  type CreateUserProfile {
    firstName: String!
    lastName: String!
  }
  type Query {
    myQuery: String
  }

  type Mutation {
    myMutation: String
  }
  extend input CreateUserInput {
    profile: CreateUserProfileInput!
  }

  input CreateUserProfileInput {
    firstName: String!
    lastName: String!
  }
`;

const UserResolver = {
  firstName: () => "Dotan",
  lastName: () => "Simha",
};

let myResolvers = {
  Query: {
    myQuery: () => "Hello",
  },
  Mutation: {
    myMutation: () => "Hello",
  },
  User: { profile: UserResolver },
};

//Create Schema combining our schema wiht account-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, myResolvers]),
  schemaDirectives: { ...accountsGraphQL.schemaDirectives },
});

const server = new ApolloServer({
  schema,
  context: accountsGraphQL.context,
});

server.listen({ port: 4000 }, () => {
  console.log(
    `Server is running in http://localhost:4000${server.graphqlPath}`
  );
});
