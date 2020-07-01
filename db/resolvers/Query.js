import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";

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
  getSaleID: (_, { id }) => {
    const sale = Sale.findById(id);
    if (!sale) throw new Error("Error la venta no existe");
    return sale;
  },
  getSales: async () => {
    const sales = Sale.find();
    return sales;
  },
};
export { Query };
