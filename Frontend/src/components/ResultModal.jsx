import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

import { cn } from "../lib/utils";

const ResultModal = ({ open, data, otherDetails, textDetails, reset }) => {
  const [showText, setShowText] = useState([]);
  const [incorrectCharListArr, setIncorrectCharListArr] = useState([]);
  var incorrectCharItr = 0;
  var wrongWordItr = 0;

  const createText = () => {
    const lastWord = textDetails.lastLetter[0];
    const lastLetter = textDetails.lastLetter[1];

    const correctArr = textDetails.correctArr;
    const userArr = textDetails.inputArr;

    let finalArr = [];
    if (lastLetter + 1 >= correctArr[lastWord].length) {
      // if(lastWord + 1 == correctArr.length ) return;

      const add = correctArr.slice(lastWord + 1);
      finalArr = userArr.concat(add);
    } else {
      // correctArr[lastWord][lastLetter+1]

      // if(lastWord + 1 == correctArr.length ) return;
      userArr[lastWord] =
        userArr[lastWord] + correctArr[lastWord].substr(lastLetter + 1);
      const add = correctArr.slice(lastWord + 1);
      finalArr = userArr.concat(add);
    }
    console.log(finalArr);
    setShowText(finalArr);
  };

  useEffect(() => {
    if (Object.keys(textDetails).length) {
      setIncorrectCharListArr(textDetails.incorrectCharList);
      console.log(textDetails.lastLetter);
      createText();
    }
  }, [textDetails]);

  if (open)
    return (
      <>
        <div className="w-[100vw] h-[100vh] px-20 bg-gray-100 fixed top-0 left-0 ">
          {data ? (
            <div className="h-[100%] w-[100%]">
              <div className="flex items-center mt-10 mb-8 gap-10 ">
                <h1 className="text-[2rem]">Test Name</h1>
                <div className="flex items-center bg-gray-300 text-gray-500 py-3 rounded-lg divide-x-2 divide-gray-400">
                  <div className="px-4">
                    time:{" "}
                    <span className=" text-blue-800">{otherDetails.time}m</span>
                  </div>
                  <div className="px-4">
                    backspace:{" "}
                    <span className="text-blue-800">
                      {otherDetails.backspace ? "on" : "off"}
                    </span>
                  </div>
                  <div className="px-4">
                    language:{" "}
                    <span className="text-blue-800">
                      {otherDetails.language}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-[1.2rem]">
                  net wpm:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.netWpm.toFixed(2)}
                  </span>
                </div>
                <div className="text-[1.2rem]">
                  gross wpm:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.grossWpm.toFixed(2)}
                  </span>
                </div>
                <div className="text-[1.2rem]">
                  accuracy:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.accuracy.toFixed(2)} %
                  </span>
                </div>
                <div className="text-[1.2rem]">
                  correct words:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.correctWords}
                  </span>
                </div>
                <div className="text-[1.2rem]">
                  incorrect words:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.totalWords - data.correctWords}
                  </span>
                </div>
                <div className="text-[1.2rem]">
                  correct characters:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.totalChar - data.incorrectChar}
                  </span>
                </div>
                <div className="text-[1.2rem]">
                  incorrect characters:{" "}
                  <span className="text-[1.3rem] font-bold text-blue-500">
                    {data.incorrectChar}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "w-[100%] text-[1.2rem] my-[5rem] bg-gray-300 h-[17rem] overflow-auto py-4 px-6 rounded-lg select-none",
                  "container-scrollbar"
                )}
              >
                {showText.map((word, i) => {
                  wrongWordItr = incorrectCharItr;
                  return (
                    <span key={i}>
                      {word.split("").map((letter, j) => {
                        // handle wrong letters
                        if (
                          incorrectCharListArr.length &&
                          incorrectCharItr < incorrectCharListArr.length
                        ) {
                          if (
                            incorrectCharListArr[incorrectCharItr][0] == i &&
                            incorrectCharListArr[incorrectCharItr][1] == j
                          ) {
                            // incorrect word
                            console.log(i, " ", j);
                            console.log("called");
                            incorrectCharItr += 1;
                            return (
                              <>
                                <span className="text-red-400" key={j}>
                                  {letter}
                                </span>
                              </>
                            );
                          }
                        }
                        // handle upto last user letter
                        if (
                          i < textDetails.lastLetter[0] ||
                          (i == textDetails.lastLetter[0] &&
                            j <= textDetails.lastLetter[1])
                        ) {
                          return (
                            <span className="text-black" key={j}>
                              {word[j]}
                            </span>
                          );
                        }
                        // remaining letters
                        return (
                          <span className="text-gray-500" key={j}>
                            {word[j]}
                          </span>
                        );
                      })}
                      {wrongWordItr < incorrectCharItr && (
                        <span className="text-green-700">
                          {`[${textDetails.correctArr[i]}]`}
                        </span>
                      )}{" "}
                    </span>
                  );
                })}
              </div>
              <div className="mt-10 flex items-center justify-center gap-[2.5rem] text-gray-500">
                <span>
                  <FaHome size={30} className="cursor-pointer" />
                </span>
                <span>
                  <FaRepeat
                    size={28}
                    className="cursor-pointer"
                    onClick={() => reset()}
                  />
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">Loading....</div>
          )}
        </div>
      </>
    );
  return null;
};

export default ResultModal;
