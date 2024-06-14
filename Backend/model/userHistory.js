import mongoose from "mongoose";

const userHistorySchema = new mongoose.Schema({
  test_date: {
    type: Date,
    required: true,
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  test_name: {
    type: String,
    required: true,
  },
  test_language: {
    type: String,
    required: true,
  },
  wpm: {
    type: Number,
    required: true,
  },
  correctwords: {
    type: Number,
    required: true,
  },
  incorrectwords: {
    type: Number,
    required: true,
  },
  totalwords: {
    type: Number,
    required: true,
  },
});

const UserHistory = mongoose.model("UserHistory", userHistorySchema);

export default UserHistory;
