import React, { useState } from "react";
import { cn } from "../lib/utils";
import toast from "react-hot-toast";
import { addStenoTest } from "../actions/admin/adminController";
import axios from "axios";

const AddStenoTestModal = ({ open, setStenoTestModal }) => {
  const [testName, setTestName] = useState("");
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const handleClose = () => {
    setStenoTestModal(false);
  };

  const handleCreateTest = async () => {
    if (!testName || !text || !audioFile) {
      toast.error("Please complete all the fields!");
      return;
    }

    try {
      // Upload audio file to Cloudinary
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("upload_preset", "ml_default1");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dy9spksm1/upload",
        formData
      );

      const audioURL = uploadRes.data.secure_url;

      // Log the data being sent
      console.log("Data being sent:", { testName, text, audioURL });

      const response = await addStenoTest({ testName, text, audioURL });

      if (response.success) {
        toast.success("Steno test created successfully!");
        handleClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error creating steno test:", error.response.data);
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server");
      } else {
        console.error("Error", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  if (open) {
    return (
      <main className="w-[100%] h-[100vh] bg-gray-600 bg-opacity-70 fixed top-0 left-0 flex items-center justify-center">
        <div className="absolute m-auto w-[50vw] max-w-[50rem] bg-white shadow-lg flex flex-col rounded-md py-5 px-7">
          <h1 className="text-[1.9rem] mb-5 text-center">Add Steno Test</h1>
          <input
            type="text"
            placeholder="Test name"
            className="bg-transparent my-3 w-[100%] rounded-lg border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          <textarea
            className={cn(
              "w-[100%] min-h-[10rem] max-h-[10rem] my-3 overflow-auto py-4 px-6 rounded-lg select-none border-2 border-gray-300 hover:border-gray-400",
              "container-scrollbar"
            )}
            placeholder="Enter steno test text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="my-3"
          />
          <div className="my-3 mt-5 flex items-center justify-center gap-10">
            <button
              onClick={handleClose}
              className="border-2 border-gray-400 text-gray-400 font-bold hover:border-black hover:text-black py-3 px-5 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTest}
              className="bg-[#4582FF] hover:bg-[#346bda] border-2 border-[#4582FF] hover:border-[#346bda] text-white font-bold py-3 px-5 rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </main>
    );
  }
  return null;
};

export default AddStenoTestModal;
