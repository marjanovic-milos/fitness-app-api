const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { loadFilesSync } = require("@graphql-tools/load-files");

const path = require("path");
const typesArrray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function createApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArrray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    // optionally context, plugins, etc.
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}

module.exports = { createApolloServer };
