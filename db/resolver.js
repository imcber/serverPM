import { User } from "../models/User";
import { Product } from "../models/Product";

export const resolvers = {
  Query: {
    getTest: () => {
      console.log("TEST!");

      return "Quiobo!";
    },
    getProductID: (_, { id }) => {
      const product = Product.findById(id);
      if (!product) throw new Error("Producto no encontrado");
      return product;
    },
  },
};
