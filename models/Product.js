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
    type: Number,
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
    default: Date.now(),
  },
  restock: {
    type: Date,
    default: Date.now(),
  },
  label: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export { Product };