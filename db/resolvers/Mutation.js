import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";
import { Order } from "../../models/Order";
import { Note } from "../../models/Note";

const Mutation = {
  //Add new product
  newProduct: async (_, { input }) => {
    const { code } = input;
    //search if product exists
    const product = await Product.findOne({ code });
    if (product) throw new Error("Product exists already");

    try {
      //add new product
      const newProduct = new Product(input);
      return await newProduct.save();
    } catch (error) {
      console.log(error);
    }
  },
  //edit existing product
  editProduct: async (_, { id, input }) => {
    //Search the product
    let product = await Product.findById(id);
    if (!product) throw new Error("Product does not exist");
    //update the product
    product = await Product.findOneAndUpdate({ _id: id }, input, { new: true });
    return product;
  },
  //delete product
  deleteProduct: async (_, { id }) => {
    //search the product
    const product = await Product.findById(id);
    if (!product) throw new error("Product does not exist");
    //remove product
    await Product.findOneAndDelete({ _id: id });
    return "Product removed";
  },
  newSale: async (_, { input }) => {
    //add new Sale
    try {
      const newSale = await new Sale(input);
      return await newSale.save();
    } catch (error) {
      console.log(error);
    }
  },
  newOrder: async (_, { input }) => {
    try {
      const newOrder = await new Order(input);
      return await newOrder.save();
    } catch (error) {
      console.log(error);
    }
  },
  editOrder: async (_, { id, input }) => {
    let order = await Order.findById(id);
    if (!order) throw new Error("Order does not exists");
    order = await Order.findOneAndUpdate({ _id: id }, input, { new: true });
    return order;
  },
  newNote: async (_, { input }) => {
    try {
      const newNote = await new Note(input);
      return await newNote.save();
    } catch (error) {
      console.log(error);
    }
  },
  deleteNote: async (_, { id }) => {
    //search the Note
    const note = await Note.findById(id);
    if (!note) throw new error("Note does not exist");
    //remove Note
    await Note.findOneAndDelete({ _id: id });
    return "Note removed";
  },
  editNote: async (_, { id, input }) => {
    let note = await Note.findById(id);
    if (!note) throw new Error("Note does not exists");
    note = await Note.findOneAndUpdate({ _id: id }, input, { new: true });
    return note;
  },
};

export { Mutation };
