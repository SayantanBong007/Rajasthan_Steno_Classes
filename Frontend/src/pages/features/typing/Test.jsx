import React, { useRef, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { RiExpandLeftFill } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import { cn } from "../../../lib/utils";
import TypingTextBox from "../../../components/TypingTextBox";

const Test = () => {
  const [time, setTime] = useState(true);
  const [backspace, setBackspace] = useState(true);
  const [timeSelected, setTimeSelected] = useState(1);
  const [fontSize, setFontSize] = useState(20);

  const readBox = useRef(null);
  const writeBox = useRef(null);

  return (
    <main className="flex flex-col min-h-[100vh] pb-10 bg-gray-100 px-20">
      <div className="flex items-center gap-10">
        <h1 className="text-[2rem] text-center mt-10 font-medium justify-self-start">
          Test Name
        </h1>
        <div className="flex items-center bg-gray-300 text-gray-500 py-3 rounded-lg mt-[2rem] divide-x-2 divide-gray-400">
          <div className="flex items-center gap-4 px-4">
            <div
              className={cn(
                "flex items-center gap-1 hover:text-black cursor-pointer",
                {
                  "text-blue-800": time,
                }
              )}
            >
              <LuTimer />
              <span>time</span>
            </div>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 1,
              })}
              onClick={() => setTimeSelected(1)}
            >
              1
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 2,
              })}
              onClick={() => setTimeSelected(2)}
            >
              2
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 3,
              })}
              onClick={() => setTimeSelected(3)}
            >
              3
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 4,
              })}
              onClick={() => setTimeSelected(4)}
            >
              4
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 5,
              })}
              onClick={() => setTimeSelected(5)}
            >
              5
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 10,
              })}
              onClick={() => setTimeSelected(10)}
            >
              10
            </span>
          </div>
          <div className="px-4">
            <div
              className={cn(
                "flex items-center gap-1 hover:text-black cursor-pointer",
                {
                  "text-blue-800": backspace,
                }
              )}
              onClick={() => setBackspace((prev) => !prev)}
            >
              <RiExpandLeftFill />
              <span>Backspace</span>
            </div>
          </div>
          <div className="px-4  flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-1 hover:text-black cursor-pointer"
              )}
            >
              <ImFontSize size={14} />
              <span>Size</span>
            </div>
            <span
              className={cn("hover:text-black cursor-pointer")}
              onClick={() => {
                console.log(fontSize);
                if (fontSize < 35) {
                  setFontSize(fontSize + 2);
                }
              }}
            >
              <FaPlus />
            </span>
            <span
              className={cn("hover:text-black cursor-pointer")}
              onClick={() => {
                console.log(fontSize);
                if (fontSize > 21) {
                  setFontSize(fontSize - 2);
                }
              }}
            >
              <FiMinus />
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn("w-[100%] mt-[5rem] bg-gray-300 h-[17rem] overflow-auto py-4 px-6 rounded-lg select-none", "container-scrollbar")}
        style={{ fontSize }}
      >
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        "This is the entire text lorem ipsum m Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
      </div>
      <textarea
        className={cn("w-[100%] mt-[5rem] h-[17rem] overflow-auto py-4 px-6 rounded-lg select-none border-[0.1rem] border-gray-400", "container-scrollbar")}
        style={{ fontSize }}
      >
      </textarea>
    </main>
  );
};

export default Test;
