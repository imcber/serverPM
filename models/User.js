import mongoose, { connect, mongo } from "mongoose";

//Schema of user

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  emails: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);
export { User };
