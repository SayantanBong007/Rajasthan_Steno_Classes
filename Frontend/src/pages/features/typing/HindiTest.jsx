import React, { useEffect, useRef, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { RiExpandLeftFill } from "react-icons/ri";
import { ImFontSize } from "react-icons/im";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import { cn } from "../../../lib/utils";
import ResultModal from "../../../components/ResultModal";


// while backspacing
// in normal case - see last letter in the stack and delete that many no. of characters
/// if zwj is in last then remove it and see the last letter in the stack also and delete that many no. of characters. do both
const keyMap = new Map();
keyMap.set(" ", 1);
keyMap.set("q", 1);
keyMap.set("Q", 1);
keyMap.set("w", 1);
keyMap.set("W", 1);
keyMap.set("e", 1);
keyMap.set("E", 2);
keyMap.set("r", 1);
keyMap.set("R", 2);
keyMap.set("t", 1);
keyMap.set("T", 2);
keyMap.set("y", 1);
keyMap.set("Y", 2);
keyMap.set("u", 1);
keyMap.set("U", 2);
keyMap.set("i", 1);
keyMap.set("I", 2);
keyMap.set("o", 1);
keyMap.set("O", 2);
keyMap.set("p", 1);
keyMap.set("P", 2);
keyMap.set("[", 1);
keyMap.set("{", 4);
keyMap.set("]", 1);
keyMap.set("}", 3);
keyMap.set("}", 3);
keyMap.set("\\", 1);
keyMap.set("|", 1);
keyMap.set("a", 1);
keyMap.set("A", 1);


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
    let lastLetterZWJ = false;
    if (
      inputText.length > 1 &&
      inputText[inputText.length - 1] === String.fromCharCode(ZWJ)
    ) {
      console.log(inputText[inputText.length - 1]);
      lastLetterZWJ = true;
    }

    if (key == "Backspace") {
      if (
        inputText.length > 1 &&
        inputText[inputText.length - 1] == String.fromCharCode("0x94D")
      ) {
        setInputText((prev) => prev.slice(0, -2));
      } else setInputText((prev) => (prev ? prev.slice(0, -1) : prev));
    } else if (key == " ") {
      if (lastLetterZWJ)
        setInputText((prev) => prev.slice(0, -1) + String.fromCharCode(" "));
      else setInputText((prev) => prev + " ");
    } else if (key == "q") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0935")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0941"));
    } else if (key == "Q") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092B"));
    } else if (key == "w") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0942")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0942"));
    } else if (key == "W") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0945")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0945"));
    } else if (key == "e") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092E"));
    } else if (key == "E") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x92E") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x92E") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "r") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0924")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0924"));
    } else if (key == "R") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x924") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x924") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "t") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091C"));
    } else if (key == "T") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x91C") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x91C") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "y") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0932")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0932"));
    } else if (key == "Y") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x932") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x932") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "u") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0928")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0928"));
    } else if (key == "U") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x928") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x928") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "i") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092A"));
    } else if (key == "I") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x092A") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x092A") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "o") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0935")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0935"));
    } else if (key == "O") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0935") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0935") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "p") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091A"));
    } else if (key == "P") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x091A") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x091A") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "[") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0916")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0916"));
    } else if (key == "{") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0915") +
            String.fromCharCode("0x94D") +
            String.fromCharCode("0x0937") +
            String.fromCharCode("0x94D") +
            String.fromCharCode(ZWJ)
        );
      else
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
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002C"));
    } else if (key == "}") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0926") +
            String.fromCharCode("0x94D") +
            String.fromCharCode("0x0935") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0926") +
            String.fromCharCode("0x94D") +
            String.fromCharCode("0x0935") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "\\") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x003F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x003F"));
    } else if (key == "|") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0918")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0918"));
    } else if (key == "a") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0902")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0902"));
    } else if (key == "A") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0964")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0964"));
    } else if (key == "s") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0947")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0947"));
    } else if (key == "S") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0948")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0948"));
    } else if (key == "d") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0915")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0915"));
    } else if (key == "D") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0915") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0915") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "f") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x093F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x093F"));
    } else if (key == "F") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0925") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0925") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "g") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0939")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0939"));
    } else if (key == "G") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0933")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0933"));
    } else if (key == "h") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0940")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0940"));
    } else if (key == "H") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x092D") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x092D") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "j") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0930")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0930"));
    } else if (key == "J") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0936") +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x0930") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0936") +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x0930") +
            String.fromCharCode(ZWJ)
        );

      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0936") +
          String.fromCharCode("0x094D") +
          String.fromCharCode("0x0930") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "k") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x093E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x093E"));
    } else if (key == "K") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x091C") +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x091E") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x091C") +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x091E") +
            String.fromCharCode(ZWJ)
        );

      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x091C") +
          String.fromCharCode("0x094D") +
          String.fromCharCode("0x091E") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "l") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0938")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0938"));
    } else if (key == "L") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0938") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0938") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == ";") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092F"));
    } else if (key == ":") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0930") +
            String.fromCharCode("0x0942") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0930") +
            String.fromCharCode("0x0942") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == `'`) {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0936") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0936") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == `"`) {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0937") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0937") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );

      setInputText(
        (prev) =>
          prev +
          String.fromCharCode("0x0937") +
          String.fromCharCode("0x094D") +
          String.fromCharCode(ZWJ)
      );
    } else if (key == "z") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x0930") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x0930") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "Z") {
      // if (lastLetterZWJ)
      //   setInputText((prev) => prev.slice(0, -1) + "TohandleRightNow");
      // else setInputText((prev) => prev + "TohandleRightNow");

      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0930") +
            String.fromCharCode("0x094D") +
            prev.slice(-1)
        );
      else
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0930") +
            String.fromCharCode("0x094D") +
            prev.slice(-1)
        );
    }

    if (key == "x") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0917")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0917"));
    } else if (key == "X") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0917") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0917") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "c") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092C"));
    } else if (key == "C") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x092C") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x092C") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "v") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + tring.fromCharCode("0x0905")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0905"));
    } else if (key == "V") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091F"));
    } else if (key == "b") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0907")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0907"));
    } else if (key == "B") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0920")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0920"));
    } else if (key == "n") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0926")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0926"));
    } else if (key == "N") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091B"));
    } else if (key == "m") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0909")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0909"));
    } else if (key == "M") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0921")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0921"));
    } else if (key == ",") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x090F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x090F"));
    } else if (key == "<") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0922")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0922"));
    } else if (key == ".") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0923") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0923") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == ">") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091D")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091D"));
    } else if (key == "/") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0927") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0927") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "?") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0918") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0918") +
            String.fromCharCode("0x094D") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "`") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0943")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0943"));
    } else if (key == "~") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x094D")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x094D"));
    } else if (key == "1") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0967")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0967"));
    } else if (key == "!") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0021")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0021"));
    } else if (key == "2") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0968")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0968"));
    } else if (key == "@") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002F"));
    } else if (key == "3") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0969")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0969"));
    } else if (key == "#") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0930") +
            String.fromCharCode("0x0941")
        );
      else
        setInputText(
          (prev) =>
            prev + String.fromCharCode("0x0930") + String.fromCharCode("0x0941")
        );
    } else if (key == "4") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096A"));
    } else if (key == "$") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002B"));
    } else if (key == "5") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096B"));
    } else if (key == "%") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x003A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x003A"));
    } else if (key == "6") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096C"));
    } else if (key == "^") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x2018")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x2018"));
    } else if (key == "7") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096D")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096D"));
    } else if (key == "&") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x2212")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x2212"));
    } else if (key == "8") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096E"));
    } else if (key == "*") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x2019")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x2019"));
    } else if (key == "9") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096F"));
    } else if (key == "(") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x003B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x003B"));
    } else if (key == "0") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0966")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0966"));
    } else if (key == ")") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0926") +
            String.fromCharCode("0x94D") +
            String.fromCharCode("0x0927") +
            String.fromCharCode(ZWJ)
        );
      else
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0926") +
            String.fromCharCode("0x94D") +
            String.fromCharCode("0x0927") +
            String.fromCharCode(ZWJ)
        );
    } else if (key == "-") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002E"));
    } else if (key == "_") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x090B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x090B"));
    } else if (key == "=") {
      if (lastLetterZWJ)
        setInputText(
          (prev) =>
            prev.slice(0, -1) +
            String.fromCharCode("0x0924") +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x0930") +
            String.fromCharCode(ZWJ)
        );
      else {
        setInputText(
          (prev) =>
            prev +
            String.fromCharCode("0x0924") +
            String.fromCharCode("0x094D") +
            String.fromCharCode("0x0930") +
            String.fromCharCode(ZWJ)
        );
      }
    } else if (key == "+") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x093C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x093C"));
    }
  };

  const keyDownHandle = (e) => {
    if (testState == 0) {
      setTestState(1);
      // setStartTimerVar(true);
      clearTimer(getTestEndTime());
    }

    if (
      (inputText.length == 0 && e.key == " ") ||
      (inputText.length >= 2 &&
        inputText[inputText.length - 1] == " " &&
        e.key == " ")
    ) {
      // do nothing
      console.log("calll");
    } else {
      // insert text
      console.log("this .. ");

      handleHindikey(e.key);
    }
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

      console.log(inputArr[i], "e");
      console.log(correctArr[i], "e");
      if (inputArr[i] == correctArr[i]) {
        result.correctWords++;
      } else {
        if (inputArr[i].length < correctArr[i].length) {
          // when input word length is less than the correct word
          for (let j = 0; j < inputArr[i].length; j++) {
            console.log("short", inputArr[i][j], " ", correctArr[i][j]);
            if (inputArr[i][j] != correctArr[i][j]) {
              result.incorrectChar++;
              incorrectCharList.push([i, j]);
            }
          }
          // include the index in missing char list
          missingCharList.push([i, inputArr[i].length]);
        } else {
          console.log(inputArr[i].length, correctArr[i].length);
          for (let j = 0; j < correctArr[i].length; j++) {
            console.log("long", inputArr[i][j], " ", correctArr[i][j]);
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
    // console.log("on page before");
    // console.log("this is modal text details ", modalTextDetails);
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
      const providedText = `रुक्ष गर्म प्रार्थना महत्व जीवन  की सुंदरताका असली  यह है कि यह दूसरों के लिए कितना मूल्य रखती है। दूसरों की मदद करने में बिताया गया जीवन, एकांत में बिताए गए जीवन से काफी अधिक मूल्यवान होता है। जीवन की सच्ची सुंदरताका महत्व इस बात पर निहित होता है कि वह दूसरों की देखभाल और मदद के लिए किस प्रकार खर्च किया जाता है। प्रेम का बिखराव जीवन में दूसरों के लिए जितना अधिक होगा वह उतना ही अधिक सुंदर होगा। जीवन एक उस खड़े पेड़ की तरह है, जो प्रकृति के तत्वों पर, पंक्षियों और राहगीरों का सामना करता है और यह एक अकेले रह रहे आदमी की अपेक्षा अधिक सुंदरहोता है, जो अपने आस-पास के लोगों के लिए अपनी आंखे बंद किया रहता है।जीवन की सुंदरताका असली महत्व यह है कि यह दूसरों के लिए कितना मूल्य रखती है। दूसरों की मदद करने में बिताया गया जीवन, एकांत में बिताए गए जीवन से काफी अधिक मूल्यवान होता है। जीवन की सच्ची सुंदरताका महत्व इस बात पर निहित होता है कि वह दूसरों की देखभाल और मदद के लिए किस प्रकार खर्च किया जाता है। प्रेम का बिखराव जीवन में दूसरों के लिए जितना अधिक होगा वह उतना ही अधिक सुंदर होगा। जीवन एक उस खड़े पेड़ की तरह है, जो प्रकृति के तत्वों पर, पंक्षियों और राहगीरों का सामना करता है और यह एक अकेले रह रहे आदमी की अपेक्षा अधिक सुंदरहोता है, जो अपने आस-पास के लोगों के लिए अपनी आंखे बंद किया रहता है।जीवन की सुंदरताका असली महत्व यह है कि यह दूसरों के लिए कितना मूल्य रखती है। दूसरों की मदद करने में बिताया गया जीवन, एकांत में बिताए गए जीवन से काफी अधिक मूल्यवान होता है। जीवन की सच्ची सुंदरताका महत्व इस बात पर निहित होता है कि वह दूसरों की देखभाल और मदद के लिए किस प्रकार खर्च किया जाता है। प्रेम का बिखराव जीवन में दूसरों के लिए जितना अधिक होगा वह उतना ही अधिक सुंदर होगा। जीवन एक उस खड़े पेड़ की तरह है, जो प्रकृति के तत्वों पर, पंक्षियों और राहगीरों का सामना करता है और यह एक अकेले रह रहे आदमी की अपेक्षा अधिक सुंदरहोता है, जो अपने आस-पास के लोगों के लिए अपनी आंखे बंद किया रहता है।`;
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
        reset={testReset}
      />
    </main>
  );
};

export default HindiTest;
