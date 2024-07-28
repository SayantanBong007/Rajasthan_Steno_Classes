import mongoose from "mongoose";

const typingTestSchema = new mongoose.Schema({
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
  total_words: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const TypingTest = mongoose.model("TypingTest", typingTestSchema);

export default TypingTest;
