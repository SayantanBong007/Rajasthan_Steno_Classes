import React, { useState } from "react";
import { cn } from "../lib/utils";
import toast from "react-hot-toast";
import { addTypingTest } from "../actions/admin/adminController";

const AddTypingTestModal = ({ open, setTypingTestModal }) => {
  const [testName, setTestName] = useState("");
  const [text, setText] = useState("");
  const [lang, setLang] = useState("");

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const handleClose = () => {
    console.log("close");
    setTypingTestModal(false);
  };

  const handleCreateTest = async () => {
    if (!testName || !text || !lang)
      toast.error("Please complete all the fields!");

    const { success, message } = await addTypingTest({
      name: testName,
      text: text.trim(),
      language: lang,
    });

    if (success) {
      toast.success("test created successfully!");
      handleClose();
    } else {
      toast.error(message);
      handleClose();
    }


  };

  if (open) {
    return (
      <main className="w-[100%] h-[100vh] bg-gray-600 bg-opacity-70 fixed top-0 left-0 flex items-center justify-center">
        <div className="absolute m-auto w-[50vw] max-w-[50rem]  bg-white shadow-lg flex flex-col rounded-md py-5 px-7">
          <h1 className="text-[1.9rem] mb-5 text-center">Add typing test</h1>
          <input
            type="text"
            placeholder="Test name"
            className="bg-transparent my-3 w-[100%] rounded-lg border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          <textarea
            className={cn(
              "w-[100%] min-h-[17rem] max-h-[17rem] my-3 overflow-auto py-4 px-6 rounded-lg select-none border-2 border-gray-300 hover:border-gray-400",
              "container-scrollbar"
            )}
            placeholder="Enter your text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className={cn("flex justify-center gap-8 my-3 text-black", {
              "text-gray-400": lang == "",
            })}
          >
            <span className="">Language : </span>
            <div>
              <input
                type="radio"
                name="language"
                value="english"
                id="english"
                checked={lang === "english"}
                onChange={onLangChange}
                className="mr-1"
              />
              <label htmlFor="english">English</label>
            </div>
            <div>
              <input
                type="radio"
                name="language"
                value="hindi"
                id="hindi"
                checked={lang === "hindi"}
                onChange={onLangChange}
                className="mr-1"
              />
              <label htmlFor="hindi">Hindi</label>
            </div>
          </div>

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

export default AddTypingTestModal;
