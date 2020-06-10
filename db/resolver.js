import { User } from "../models/User";

export const resolvers = {
  Query: {
    getTest: () => {
      console.log("TEST!");

      return "Quiobo!";
    },
  },
};
