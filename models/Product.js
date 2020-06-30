import mongoose from "mongoose";

//Schema of product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
    required: true,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
  restock: {
    type: Date,
    default: Date.now(),
  },
  labels: {
    type: Array,
    default: [],
  },
});

const Product = mongoose.model("Product", ProductSchema);
export { Product };
