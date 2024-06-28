import React, { useEffect, useRef, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { RiExpandLeftFill } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import { cn } from "../../../lib/utils";
import ResultModal from "../../../components/ResultModal";
import AudioElement from "../../../components/AudioElement";
import ActionButton from "../../../components/ActionButton";

const StenoTest = () => {
  const timerRef = useRef(null);

  const [time, setTime] = useState(true);
  const [backspace, setBackspace] = useState(true);
  const [timeSelected, setTimeSelected] = useState(0.1);
  const [fontSize, setFontSize] = useState(20);

  const [testText, setTestText] = useState("");
  const [inputText, setInputText] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalTextDetails, setModalTextDetails] = useState({});
  const [timer, setTimer] = useState("01:00");

  const [testState, setTestState] = useState(0);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      if (total == 0) setTestState(-1);
    }
  };

  const clearTimer = (e) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    timerRef.current = id;
  };

  const getTestEndTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeSelected * 60);
    return deadline;
  };

  const onClickRestartTimer = () => {
    // run this function to restart the timer
    clearTimer(getTestEndTime());
  };

  useEffect(() => {
    if (testState == -1) {
      handleTestComplete();
    }
  }, [testState]);

  const handleOnKeyDown = (e) => {
    if (testState == 0) {
      console.log(testState);
      setTestState(1);
      // setStartTimerVar(true);
      clearTimer(getTestEndTime());
    }
  };

  const handleOnChange = (e) => {
    console.log(e.target.value.length);
    if (
      (e.target.value.length == 1 &&
        e.target.value[e.target.value.length - 1] == " ") ||
      (e.target.value.length >= 2 &&
        e.target.value[e.target.value.length - 1] == " " &&
        e.target.value[e.target.value.length - 2] == " ")
    ) {
      // do nothing
      console.log("calll");
    } else setInputText(e.target.value);
  };

  const handleTestComplete = () => {
    // and set modal to true
    setOpenModal(true);
    setInputText((prev) => prev.trim());
    console.log(inputText);

    // const isLastCharSpace = inputText[inputText.length - 1] === " " ? 1 : 0;

    // here calculate all things that we need to show in the modal
    const inputArr = inputText.trim().split(/\s+/);
    const correctArr = testText.trim().split(/\s+/);

    console.log(inputArr);
    console.log(correctArr);

    var result = {
      correctWords: 0,
      totalWords: 0, // total words typed by user
      incorrectChar: 0,
      missedChar: 0,
      totalChar: 0, // total chars typed by user
      grossWpm: 0,
      netWpm: 0,
      cpm: 0,
      accuracy: 0,
    };

    var incorrectCharList = [[-1, -1]];
    var missingCharList = [];

    for (let i = 0; i < inputArr.length; i++) {
      // inputArr[i] = inputArr[i].trim();
      // correctArr[i] = correctArr[i].trim();

      console.log(correctArr[i]);
      if (inputArr[i] == correctArr[i]) {
        result.correctWords++;
      } else {
        if (inputArr[i].length < correctArr[i].length) {
          // when input word length is less than the correct word
          for (let j = 0; j < inputArr[i].length; j++) {
            if (inputArr[i][j] != correctArr[i][j]) {
              result.incorrectChar++;
              incorrectCharList.push([i, j]);
            }
          }
          // include the index in missing char list
          missingCharList.push([i, inputArr[i].length]);
        } else {
          for (let j = 0; j < correctArr[i].length; j++) {
            if (inputArr[i][j] != correctArr[i][j]) {
              result.incorrectChar++;
              incorrectCharList.push([i, j]);
              console.log("pushed", i, j, incorrectCharList);
            }
          }
          if (inputArr[i].length > correctArr[i].length) {
            // when overflow of words
            result.incorrectChar += inputArr[i].length - correctArr[i].length;
            for (let j = correctArr[i].length; j < inputArr[i].length; j++) {
              incorrectCharList.push([i, j]);
            }
          }
        }
      }

      result.totalWords++;

      result.totalChar += inputArr[i].length;
      // if (i === inputArr.length - 1) {
      //   result.totalChar += inputArr[i].length + Number(isLastCharSpace);
      // } else result.totalChar += inputArr[i].length + 1;
    }

    incorrectCharList.shift();

    console.log(result.totalChar);

    if (result.totalChar != 0) {
      result.grossWpm = (result.totalChar + 5 - 1) / 5 / timeSelected;
      result.netWpm =
        result.grossWpm - incorrectCharList.length / timeSelected > 0
          ? result.grossWpm - incorrectCharList.length / timeSelected
          : 0;
      result.accuracy =
        ((result.totalChar - result.incorrectChar) * 100) / result.totalChar;
    } else {
      result.totalWords = 0;
    }

    setModalData(result);
    setModalTextDetails({
      lastLetter: [
        inputArr.length - 1,
        inputArr[inputArr.length - 1].length - 1,
      ],
      inputArr,
      correctArr,
      incorrectCharList: incorrectCharList,
    });
    console.log("on page before");
    console.log("this is modal text details ", modalTextDetails);
  };

  const testReset = () => {
    if (timeSelected == 1) setTimer("01:00");
    else if (timeSelected == 2) setTimer("02:00");
    else if (timeSelected == 3) setTimer("03:00");
    else if (timeSelected == 4) setTimer("04:00");
    else if (timeSelected == 5) setTimer("05:00");
    else if (timeSelected == 10) setTimer("10:00");
    else if (timeSelected == 0.1) setTimer("01:00");

    setInputText("");
    setModalData({});
    setModalTextDetails({});
    setTestState(0);
    setOpenModal(false);
  };

  useEffect(() => {
    (function () {
      const providedText = ` This   is the entire text lorem ipsum m Ipsum is simply dummy text of the
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
        printing and typesetting industry. Lorem Ipsum has been the industrys`;
      setTestText(providedText.trim());
    })();
  }, [inputText]);

  return (
    <main className="flex flex-col min-h-[100vh] pb-10 bg-gray-100 px-20">
      <div className="flex items-center gap-10">
        <h1 className="text-[2rem] text-center mt-10 font-medium justify-self-start">
          Test Name
        </h1>
        <div className="flex items-center bg-gray-300 text-gray-500 py-3 rounded-lg mt-[2rem] divide-x-2 divide-gray-400">
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
      <div className="my-[9rem] flex items-center justify-center" >
        <AudioElement />
      </div>

      <p className="text-[1.2rem] font-semibold text-gray-500">{timer}</p>
      <textarea
        className={cn(
          "w-[100%] h-[17rem] overflow-auto py-4 px-6 rounded-lg select-none border-[0.1rem] border-gray-400",
          "container-scrollbar"
        )}
        style={{ fontSize }}
        spellCheck="false"
        value={inputText}
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
      <button className=" mt-4 border-2 border-gray-400 text-gray-400 font-bold hover:border-black hover:text-black hover:bg-white py-3 px-5 rounded-md"
 >Submit</button>
      <ResultModal
        open={openModal}
        data={modalData}
        otherDetails={{ time: timeSelected, backspace, language: "English" }}
        textDetails={modalTextDetails}
        reset={testReset}
      />
    </main>
  );
};

export default StenoTest;
