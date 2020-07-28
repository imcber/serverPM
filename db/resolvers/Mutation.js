import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";
import { Order } from "../../models/Order";
import { Note } from "../../models/Note";
import { Category } from "../../models/Category";
import { authenticated } from "@accounts/graphql-api";

const Mutation = {
  //Add new product
  newProduct: async (_, { input }) => {
    const { code, labels } = input;
    //search if product exists
    const product = await Product.findOne({ code });
    if (product) throw new Error("Product exists already");

    try {
      //add new product
      const newProduct = new Product(input);
      //add new categories
      labels.map(async (name) => {
        const category = await Category.findOne({ name });
        console.log(category);
        if (!category) {
          const newCat = await new Category({ name });
          newCat.save();
        }
      });
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
  newSale: authenticated((_, { input }, context) => {
    //add new Sale
    const { user } = context;
    try {
      const newSale = new Sale(input);
      newSale.user = user.id;
      return newSale.save();
    } catch (error) {
      console.log(error);
    }
  }),
  newOrder: authenticated((_, { input }, context) => {
    const { user } = context;
    try {
      const newOrder = new Order(input);
      newOrder.user = user.id;
      return newOrder.save();
    } catch (error) {
      console.log(error);
    }
  }),
  editOrder: async (_, { id, input }) => {
    let order = await Order.findById(id);
    if (!order) throw new Error("Order does not exists");
    order = await Order.findOneAndUpdate({ _id: id }, input, { new: true });
    return order;
  },
  newNote: authenticated((_, { input }, context) => {
    const { user } = context;
    try {
      const newNote = new Note(input);
      newNote.user = user.id;
      return newNote.save();
    } catch (error) {
      console.log(error);
    }
  }),
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
  newCategory: async (_, { input }) => {
    const { name } = input;
    let category = await Category.find({ name });
    if (category) throw new Error("Category exists already");
    try {
      //add new category
      const newCategory = new Category(input);
      return await newCategory.save();
    } catch (error) {
      console.log(error);
    }
  },
};

export { Mutation };
