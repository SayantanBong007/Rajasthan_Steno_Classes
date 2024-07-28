import TypingTest from "../model/test.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new test
const addTest = asyncHandler(async (req, res) => {
  const { name, language, text } = req.body;

  const total_words = text.trim().split(" ").length;

  const newTest = new TypingTest({
    name,
    language,
    total_words,
    text,
  });
  console.log(newTest);
  const savedTest = await newTest.save();
  res.status(201).json(savedTest);
});

// Get all tests
const getAllTests = asyncHandler(async (req, res) => {
  const tests = await TypingTest.find();
  res.status(200).json(tests);
});

// Update a test by ID
const updateTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedTest = await Test.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedTest) {
    return res.status(404).json({ message: "Test not found" });
  }

  res.status(200).json(updatedTest);
});

// Delete a test by ID
const deleteTest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedTest = await Test.findByIdAndDelete(id);
  if (!deletedTest) {
    return res.status(404).json({ message: "Test not found" });
  }

  res.status(200).json({ message: "Test deleted successfully" });
});

// Delete a test by ID
const getTestDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const test = await TypingTest.findOne({ _id: id });
  if (!test) {
    return res.status(404).json({ message: "Test not found" });
  }

  res.status(200).json({ success: true, test });
});

export { addTest, getAllTests, updateTest, deleteTest, getTestDetails };
