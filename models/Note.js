import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});

const Note = mongoose.model("Note", NoteSchema);

export { Note };
