import { Product } from "../../models/Product";
const Query = {
  getProductID: (_, { id }) => {
    const product = Product.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  },
  getListProducts: async () => {
    const products = await Product.find({});
    return products;
  },
};
export { Query };
