import mongoose from "mongoose";

//Schema of product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  amount: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Float,
    require: true,
    trim: true,
  },
  code: {
    type: String,
    require: true,
    trim: true,
  },
  create: {
    type: Date,
    default: Date.now,
  },
  restock: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export { Product };
