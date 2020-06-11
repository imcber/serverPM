import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
  },
});
