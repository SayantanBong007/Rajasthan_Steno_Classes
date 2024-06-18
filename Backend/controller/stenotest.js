import StenoTest from "../model/stenoTest.js";

// Controller to add a test
export const addTest = async (req, res) => {
  try {
    const { name, test_lang, total_words, dictation_speed, duration } =
      req.body;
    const audioUrl = req.file
      ? `/uploads/steno_tests/${req.file.filename}`
      : null;

    if (!audioUrl) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const newTest = new StenoTest({
      name,
      test_lang,
      total_words,
      dictation_speed,
      duration,
      audio_url: audioUrl,
    });

    await newTest.save();
    res
      .status(201)
      .json({ message: "Steno Test created successfully", newTest });
  } catch (error) {
    console.error("Error adding test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get all tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await StenoTest.find();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to update a test
export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, test_lang, total_words, dictation_speed, duration } =
      req.body;
    const audioUrl = req.file
      ? `/uploads/steno_tests/${req.file.filename}`
      : null;

    const test = await StenoTest.findById(id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    if (audioUrl) {
      test.audio_url = audioUrl;
    }

    test.name = name || test.name;
    test.test_lang = test_lang || test.test_lang;
    test.total_words = total_words || test.total_words;
    test.dictation_speed = dictation_speed || test.dictation_speed;
    test.duration = duration || test.duration;

    await test.save();
    res.status(200).json({ message: "Steno Test updated successfully", test });
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to delete a test
export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await StenoTest.findByIdAndDelete(id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Steno Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Server error" });
  }
};
