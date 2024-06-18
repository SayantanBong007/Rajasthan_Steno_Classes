import mongoose from "mongoose";

const stenoTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  test_lang: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  total_words: {
    type: Number,
    required: true,
  },
  dictation_speed: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  audio_url: {
    type: String,
    required: true,
  },
});

const StenoTest = mongoose.model("StenoTest", stenoTestSchema);

export default StenoTest;
