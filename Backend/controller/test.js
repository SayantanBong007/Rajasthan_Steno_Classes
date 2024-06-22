import Test from "../model/test.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new test
const addTest = asyncHandler(async (req, res) => {
  const { name, language, serialNumber, total_words, text } = req.body;

  const newTest = new Test({
    name,
    language,
    serialNumber,
    total_words,
    text,
  });

  const savedTest = await newTest.save();
  res.status(201).json(savedTest);
});

// Get all tests
const getAllTests = asyncHandler(async (req, res) => {
  const tests = await Test.find();
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

export { addTest, getAllTests, updateTest, deleteTest };
