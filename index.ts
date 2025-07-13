import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArrray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

export const schema = makeExecutableSchema({
  typeDefs: typesArrray,
  resolvers: resolversArray,
});
