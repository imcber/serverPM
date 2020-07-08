import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";
import { Order } from "../../models/Order";
import { Note } from "../../models/Note";

const Query = {
  getProductID: (_, { id }) => {
    const product = Product.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  },
  getListProducts: () => {
    const products = Product.find({});
    return products;
  },
  getSaleID: (_, { id }) => {
    const sale = Sale.findById(id);
    if (!sale) throw new Error("Error la venta no existe");
    return sale;
  },
  getSales: () => {
    const sales = Sale.find();
    return sales;
  },
  getOrders: () => {
    const orders = Order.find();
    return orders;
  },
  getOrderID: (_, { id }) => {
    const order = Order.findById(id);
    if (!order) throw new Error("El pedido no existe");
    return orders;
  },
  getNotes: () => {
    const notes = Note.find();
    return notes;
  },
  getNotesByUser: (_, { id }) => {
    //Revisa esta parte compa, checa como los buscarias
    const notes = Note.find({ user: { _id: id } });
    if (!notes) throw new Error("No tiene notas");
    return notes;
  },
  getNoteID: (_, { id }) => {
    const notes = Note.findById(id);
    if (!notes) throw new Error("Sin notas");
    return notes;
  },
};
export { Query };
