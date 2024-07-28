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
      const providedText = ` हिन्दू धर्म में गंगा के लिए असीम श्रद्धा और मान्यता है। गंगा हमारे लिए केवल नदी नहीं, बल्कि पवित्रता का प्रवाह है। ऐसा माना जाता है कि सूर्य की किरणों से निकलने वाले जीवन ऊर्जा को व्यक्त करने की क्षमता केवल गंगा और गंगा में ही है, इसलिए गंगा का स्मरण-पूजन करने से हमारे देवता स्वतः प्रसन्न हो जाते हैं। मां गंगा योग सिद्धिका है। वह ब्रह्म के कमंडल से निकलकर ज्ञान योग भगवान विष्णु के चरणों का स्पर्श करते हुए भक्ति योग और शिव की जटाओं से होकर बहती है, इसलिए साधना योग सिद्ध करती है। धरती पर गंगा का अवतरण ही पितरों के मोक्ष के लिए हुआ था। मां गंगा को लेकर हम भारतीयों में श्रद्धा और विश्वास इतना प्रबल है कि मृत्यु के उपरांत भी जीव अपने मोक्ष के लिए गंगा के आश्रय में रहना चाहता है। गंगाजल में मृतकों की अस्थि विसर्जित कर उनका पुनर्जन्म सुनिश्चित कर दिया जाता है। वर्तमान में गंगा की स्थिति अत्यंत ओछी हो रही है। आज वैज्ञानिक भौतिक सुखों की प्राप्ति के लिए गंगा के प्रवाह को बाधित किया जा रहा है। हमें यह समझने की आवश्यकता है कि प्रदूषण के युक्त और मार्ग बाधित गंगा मानवता के लिए अभिशाप है। गंगा की पवित्रता सुनिश्चित करने के लिए सामूहिक प्रयास करें, क्योंकि गंगा सबकी है। वह अपने गर्भ में अनेक जीव प्रजातियां, वनस्पतियाँ और संस्कृतियों को युगों-युगांतर से पोषित करती आई है। गंगा के नष्ट होने से मानवता की एक रसमयी सांस्कृतिक परंपरा का भी अंत हो जाएगा। इस बात की सराहना है कि प्रधानमंत्री के नेतृत्व में नमामि गंगे योजना के माध्यम से गंगा की स्वच्छता और पवित्रता के लिए अनेक संयुक्त प्रयास किए जा रहे हैं, लेकिन सरकारी कार्यों और योजनाओं से हटकर भी गंगा की पवित्रता बनाए रखने के लिए सामूहिक सहभागिता और जन-जागरूकता की आवश्यकता है। गंगा तट पर गंगा की स्वच्छता के लिए अपने उत्तरदायित्व की अनुभूति करें। सर्वजन कल्याण का विषय है। पवित्र और स्वच्छ गंगा राष्ट्रीय जीवन से जुड़ी सर्वजन कल्याण नदी है। गंगा को लेकर अनेक आंदोलन चले, आज भी चल रहे हैं। केंद्र इन्हें कार्यदल की तरह लेता है।`;
      setTestText(providedText.trim());
    })();
  }, [inputText]);

  return (
    <main className="flex flex-col min-h-[80vh] pb-10 bg-gray-100 px-20">
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
      <div className="my-[5rem] flex items-center justify-center">
        <AudioElement />
      </div>

      <p className="text-[1.2rem] font-semibold text-gray-500">{timer}</p>
      <textarea
        className={cn(
          "w-[100%] h-[25rem] overflow-auto py-4 px-6 rounded-lg select-none border-[0.1rem] border-gray-400",
          "container-scrollbar"
        )}
        style={{ fontSize }}
        spellCheck="false"
        value={inputText}
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
      <button className=" mt-4 border-2 border-gray-400 text-gray-400 font-bold hover:border-black hover:text-black hover:bg-white py-3 px-5 rounded-md">
        Submit
      </button>
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
