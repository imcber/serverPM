import { Product } from "../../models/Product";
import { Sale } from "../../models/Sale";

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
      const newSale = new Sale(input);
      return await newSale.save();
    } catch (error) {
      console.log(error);
    }
  },
};

export { Mutation };
