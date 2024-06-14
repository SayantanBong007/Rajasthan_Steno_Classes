import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  serialNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  total_words: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);

export default Test;
