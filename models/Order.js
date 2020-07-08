import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
  },
  amount: {
    type: String,
    trim: true,
  },
});

const OrderSchema = new mongoose.Schema({
  products: [ProductSchema],
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", OrderSchema);
export { Order };
