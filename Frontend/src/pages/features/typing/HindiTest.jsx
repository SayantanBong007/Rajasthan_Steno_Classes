import React, { useEffect, useRef, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { RiExpandLeftFill } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import { cn } from "../../../lib/utils";
import ResultModal from "../../../components/ResultModal";

const HindiTest = () => {
  const ZWJ = "0x200D";

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

  const onClickResetTimer = () => {
    // run this function to reset the timer
    clearTimer(getTestEndTime());
  };

  useEffect(() => {
    if (testState == -1) {
      handleTestComplete();
    }
  }, [testState]);

  const handleHindikey = (key) => {
    if (key == "Backspace") {
      if (inputText[inputText.length - 1] == String.fromCharCode(ZWJ)) {
        setInputText((prev) => (prev ? prev.slice(0, -2) : prev));
      }
      setInputText((prev) => (prev ? prev.slice(0, -1) : prev));
    } else if (key == " ") {
      setInputText((prev) => prev + " ");
    } else if (key == "q") {
      setInputText((prev) => prev + String.fromCharCode("0x0941"));
    } else if (key == "Q") {
      setInputText((prev) => prev + String.fromCharCode("0x092B"));
    } else if (key == "w") {
      setInputText((prev) => prev + String.fromCharCode("0x0942"));
    } else if (key == "W") {
      setInputText((prev) => prev + String.fromCharCode("0x0945"));
    } else if (key == "e") {
      setInputText((prev) => prev + String.fromCharCode("0x092E"));
    } else if (key == "E") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x92E") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "r") {
      setInputText((prev) => prev + String.fromCharCode("0x0924"));
    } else if (key == "R") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x924") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "t") {
      setInputText((prev) => prev + String.fromCharCode("0x091C"));
    } else if (key == "T") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x91C") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "y") {
      setInputText((prev) => prev + String.fromCharCode("0x0932"));
    } else if (key == "Y") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x932") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "u") {
      setInputText((prev) => prev + String.fromCharCode("0x0928"));
    } else if (key == "U") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x928") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "i") {
      setInputText((prev) => prev + String.fromCharCode("0x092A"));
    } else if (key == "I") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x092A") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "o") {
      setInputText((prev) => prev + String.fromCharCode("0x0935"));
    } else if (key == "O") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0935") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "p") {
      setInputText((prev) => prev + String.fromCharCode("0x091A"));
    } else if (key == "P") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x091A") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "[") {
      setInputText((prev) => prev + String.fromCharCode("0x0916"));
    } else if (key == "{") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0915") +
          String.fromCharCode("0x94D") +
          String.fromCharCode("0x0937") +
          String.fromCharCode("0x94D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "]") {
      setInputText((prev) => prev + String.fromCharCode("0x002C"));
    } else if (key == "}") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0926") +
          String.fromCharCode("0x94D") +
          String.fromCharCode("0x0935") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "\\") {
      setInputText((prev) => prev + String.fromCharCode("0x003F"));
    } else if (key == "|") {
      setInputText((prev) => prev + String.fromCharCode("0x0918"));
    } else if (key == "a") {
      setInputText((prev) => prev + String.fromCharCode("0x0902"));
    } else if (key == "A") {
      setInputText((prev) => prev + String.fromCharCode("0x0964"));
    } else if (key == "s") {
      setInputText((prev) => prev + String.fromCharCode("0x0947"));
    } else if (key == "S") {
      setInputText((prev) => prev + String.fromCharCode("0x0948"));
    } else if (key == "d") {
      setInputText((prev) => prev + String.fromCharCode("0x0915"));
    } else if (key == "D") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0915") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "f") {
      setInputText((prev) => prev + String.fromCharCode("0x093F"));
    } else if (key == "F") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0925") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "g") {
      setInputText((prev) => prev + String.fromCharCode("0x0939"));
    } else if (key == "G") {
      setInputText((prev) => prev + String.fromCharCode("0x0933"));
    } else if (key == "h") {
      setInputText((prev) => prev + String.fromCharCode("0x0940"));
    } else if (key == "H") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x092D") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "j") {
      setInputText((prev) => prev + String.fromCharCode("0x0930"));
    } else if (key == "J") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0936") +
          String.fromCharCode("0x094D") +
          String.fromCharCode("0x0930") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "k") {
      setInputText((prev) => prev + String.fromCharCode("0x093E"));
    } else if (key == "K") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x091C") +
          String.fromCharCode("0x094D") +
          String.fromCharCode("0x091E") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "l") {
      setInputText((prev) => prev + String.fromCharCode("0x0938"));
    } else if (key == "L") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0938") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == ";") {
      setInputText((prev) => prev + String.fromCharCode("0x092F"));
    } else if (key == ":") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0930") +
          String.fromCharCode("0x0942") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == `'`) {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0936") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == `"`) {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0937") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == z) {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x094D") +
          String.fromCharCode("0x0930") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == Z) {
      setInputText((prev) => prev + "TohandleRightNow");
    }

    if (key == "x") {
      setInputText((prev) => prev + String.fromCharCode("0x0917"));
    } else if (key == "X") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0917") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "c") {
      setInputText((prev) => prev + String.fromCharCode("0x092C"));
    } else if (key == "C") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x092C") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "v") {
      setInputText((prev) => prev + String.fromCharCode("0x0905"));
    } else if (key == "V") {
      setInputText((prev) => prev + String.fromCharCode("0x091F"));
    } else if (key == "b") {
      setInputText((prev) => prev + String.fromCharCode("0x0907"));
    } else if (key == "B") {
      setInputText((prev) => prev + String.fromCharCode("0x0920"));
    } else if (key == "n") {
      setInputText((prev) => prev + String.fromCharCode("0x0926"));
    } else if (key == "N") {
      setInputText((prev) => prev + String.fromCharCode("0x091B"));
    } else if (key == "m") {
      setInputText((prev) => prev + String.fromCharCode("0x0909"));
    } else if (key == "M") {
      setInputText((prev) => prev + String.fromCharCode("0x0921"));
    } else if (key == ",") {
      setInputText((prev) => prev + String.fromCharCode("0x090F"));
    } else if (key == "<") {
      setInputText((prev) => prev + String.fromCharCode("0x0922"));
    } else if (key == ".") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0923") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == ">") {
      setInputText((prev) => prev + String.fromCharCode("0x091D"));
    } else if (key == "/") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0927") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "?") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0918") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "`") {
      setInputText((prev) => prev + String.fromCharCode("0x0943"));
    } else if (key == "~") {
      setInputText((prev) => prev + String.fromCharCode("0x094D"));
    } else if (key == "1") {
      setInputText((prev) => prev + String.fromCharCode("0x0967"));
    } else if (key == "!") {
      setInputText((prev) => prev + String.fromCharCode("0x0021"));
    } else if (key == "2") {
      setInputText((prev) => prev + String.fromCharCode("0x0968"));
    } else if (key == "@") {
      setInputText((prev) => prev + String.fromCharCode("0x002F"));
    } else if (key == "3") {
      setInputText((prev) => prev + String.fromCharCode("0x0969"));
    } else if (key == "#") {
      setInputText((prev) => prev + "TohandleRightNow");
    } else if (key == "4") {
      setInputText((prev) => prev + String.fromCharCode("0x096A"));
    } else if (key == "$") {
      setInputText((prev) => prev + String.fromCharCode("0x002B"));
    } else if (key == "5") {
      setInputText((prev) => prev + String.fromCharCode("0x096B"));
    } else if (key == "%") {
      setInputText((prev) => prev + String.fromCharCode("0x003A"));
    } else if (key == "6") {
      setInputText((prev) => prev + String.fromCharCode("0x096C"));
    } else if (key == "^") {
      setInputText((prev) => prev + String.fromCharCode("0x2018"));
    } else if (key == "7") {
      setInputText((prev) => prev + String.fromCharCode("0x096D"));
    } else if (key == "&") {
      setInputText((prev) => prev + String.fromCharCode("0x2212"));
    } else if (key == "8") {
      setInputText((prev) => prev + String.fromCharCode("0x096E"));
    } else if (key == "*") {
      setInputText((prev) => prev + String.fromCharCode("0x2019"));
    } else if (key == "9") {
      setInputText((prev) => prev + String.fromCharCode("0x096F"));
    } else if (key == "(") {
      setInputText((prev) => prev + String.fromCharCode("0x003B"));
    } else if (key == "0") {
      setInputText((prev) => prev + String.fromCharCode("0x0966"));
    } else if (key == ")") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0926") +
          String.fromCharCode("0x94D") +
          String.fromCharCode("0x0927") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "-") {
      setInputText((prev) => prev + String.fromCharCode("0x002E"));
    } else if (key == "_") {
      setInputText((prev) => prev + String.fromCharCode("0x090B"));
    } else if (key == "=") {
      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0924") +
          String.fromCharCode("0x094D") +
          String.fromCharCode("0x0930") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "+") {
      setInputText((prev) => prev + String.fromCharCode("0x093C"));
    }
  };

  const keyDownHandle = (e) => {
    if (testState == 0) {
      setTestState(1);
      // setStartTimerVar(true);
      clearTimer(getTestEndTime());
    }

    console.log(e);
    handleHindikey(e.key);

    console.log(inputText);
  };

  const handleInput = (e) => {
    // console.log(e);
    // setInputText(e.target.value);
  };

  const handleTestComplete = () => {
    // and set modal to true
    setOpenModal(true);
    setInputText((prev) => prev.trim());
    console.log(inputText);

    // here calculate all things that we need to show in the modal
    const inputArr = inputText.trim().split(" ");
    const correctArr = testText.trim().split(" ");

    var result = {
      correctWords: 0,
      totalWords: 0, // total words typed by user
      incorrectChar: 0,
      missedChar: 0,
      totalChar: 0, // total chars typed by user
      wpm: 0,
      cpm: 0,
      accuracy: 0,
    };

    var incorrectCharList = [[-1, -1]];
    var missingCharList = [];

    console.log(inputArr);
    // set last letter

    for (let i = 0; i < inputArr.length; i++) {
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
    }

    console.log(incorrectCharList);

    result.wpm = result.correctWords / timeSelected;
    result.cpm = (result.totalChar - result.incorrectChar) / timeSelected;
    result.accuracy =
      ((result.totalChar - result.incorrectChar) * 100) / result.totalChar;

    setModalData(result);
    incorrectCharList.shift();
    console.log;
    setModalTextDetails({
      lastLetter: [
        inputArr.length - 1,
        inputArr[inputArr.length - 1].length - 1,
      ],
      inputText,
      testText,
      incorrectCharList: incorrectCharList,
    });
    console.log("on page before");
    console.log("this is modal text details ", modalTextDetails);
  };

  const testReset = () => {};

  useEffect(() => {
    (function () {
      const providedText = `महत्व जीवन  की सुंदरताका असली  यह है कि यह दूसरों के लिए कितना मूल्य रखती है। दूसरों की मदद करने में बिताया गया जीवन, एकांत में बिताए गए जीवन से काफी अधिक मूल्यवान होता है। जीवन की सच्ची सुंदरताका महत्व इस बात पर निहित होता है कि वह दूसरों की देखभाल और मदद के लिए किस प्रकार खर्च किया जाता है। प्रेम का बिखराव जीवन में दूसरों के लिए जितना अधिक होगा वह उतना ही अधिक सुंदर होगा। जीवन एक उस खड़े पेड़ की तरह है, जो प्रकृति के तत्वों पर, पंक्षियों और राहगीरों का सामना करता है और यह एक अकेले रह रहे आदमी की अपेक्षा अधिक सुंदरहोता है, जो अपने आस-पास के लोगों के लिए अपनी आंखे बंद किया रहता है।जीवन की सुंदरताका असली महत्व यह है कि यह दूसरों के लिए कितना मूल्य रखती है। दूसरों की मदद करने में बिताया गया जीवन, एकांत में बिताए गए जीवन से काफी अधिक मूल्यवान होता है। जीवन की सच्ची सुंदरताका महत्व इस बात पर निहित होता है कि वह दूसरों की देखभाल और मदद के लिए किस प्रकार खर्च किया जाता है। प्रेम का बिखराव जीवन में दूसरों के लिए जितना अधिक होगा वह उतना ही अधिक सुंदर होगा। जीवन एक उस खड़े पेड़ की तरह है, जो प्रकृति के तत्वों पर, पंक्षियों और राहगीरों का सामना करता है और यह एक अकेले रह रहे आदमी की अपेक्षा अधिक सुंदरहोता है, जो अपने आस-पास के लोगों के लिए अपनी आंखे बंद किया रहता है।जीवन की सुंदरताका असली महत्व यह है कि यह दूसरों के लिए कितना मूल्य रखती है। दूसरों की मदद करने में बिताया गया जीवन, एकांत में बिताए गए जीवन से काफी अधिक मूल्यवान होता है। जीवन की सच्ची सुंदरताका महत्व इस बात पर निहित होता है कि वह दूसरों की देखभाल और मदद के लिए किस प्रकार खर्च किया जाता है। प्रेम का बिखराव जीवन में दूसरों के लिए जितना अधिक होगा वह उतना ही अधिक सुंदर होगा। जीवन एक उस खड़े पेड़ की तरह है, जो प्रकृति के तत्वों पर, पंक्षियों और राहगीरों का सामना करता है और यह एक अकेले रह रहे आदमी की अपेक्षा अधिक सुंदरहोता है, जो अपने आस-पास के लोगों के लिए अपनी आंखे बंद किया रहता है।`;
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
              onClick={() => {
                setTimer("01:00");
                setTimeSelected(1);
              }}
            >
              1
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 2,
              })}
              onClick={() => {
                setTimer("02:00");
                setTimeSelected(2);
              }}
            >
              2
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 3,
              })}
              onClick={() => {
                setTimer("03:00");
                setTimeSelected(3);
              }}
            >
              3
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 4,
              })}
              onClick={() => {
                setTimer("04:00");
                setTimeSelected(4);
              }}
            >
              4
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 5,
              })}
              onClick={() => {
                setTimer("05:00");
                setTimeSelected(5);
              }}
            >
              5
            </span>
            <span
              className={cn("hover:text-black cursor-pointer", {
                "text-blue-800": timeSelected == 10,
              })}
              onClick={() => {
                setTimer("10:00");
                setTimeSelected(10);
              }}
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
        className={cn(
          "w-[100%] my-[5rem] bg-gray-300 h-[17rem] overflow-auto py-4 px-6 rounded-lg select-none",
          "container-scrollbar"
        )}
        style={{ fontSize }}
      >
        {testText}
      </div>
      <p className="text-[1.2rem] font-semibold text-gray-500">{timer}</p>
      <textarea
        className={cn(
          "w-[100%] h-[17rem] overflow-auto py-4 px-6 rounded-lg select-none border-[0.1rem] border-gray-400",
          "container-scrollbar"
        )}
        style={{ fontSize }}
        spellCheck="false"
        id="hindiTextArea"
        value={inputText}
        onChange={(e) => handleInput(e)}
        onKeyDown={(e) => keyDownHandle(e)}
        lang="hi"
      />
      <ResultModal
        open={openModal}
        data={modalData}
        otherDetails={{ time: timeSelected, backspace, language: "English" }}
        textDetails={modalTextDetails}
      />
    </main>
  );
};

export default HindiTest;
