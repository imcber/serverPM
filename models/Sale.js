import mongoose from "mongoose";

//Schema of sale

const SaleSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
});

const Sale = mongoose.model("Sale", SaleSchema);

export { Sale };
