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
keyMap.set("s", 1);
keyMap.set("S", 1);
keyMap.set("d", 1);
keyMap.set("D", 2);
keyMap.set("f", 1);
keyMap.set("F", 2);
keyMap.set("g", 1);
keyMap.set("G", 1);
keyMap.set("h", 1);
keyMap.set("H", 2);
keyMap.set("j", 1);
keyMap.set("J", 3);
keyMap.set("k", 1);
keyMap.set("K", 3);
keyMap.set("l", 1);
keyMap.set("L", 2);
keyMap.set(";", 1);
keyMap.set(":", 2);
keyMap.set(`'`, 2);
keyMap.set(`"`, 2);
keyMap.set("z", 2);
keyMap.set("Z", 2);
keyMap.set("x", 1);
keyMap.set("X", 2);
keyMap.set("c", 1);
keyMap.set("C", 2);
keyMap.set("v", 1);
keyMap.set("V", 1);
keyMap.set("b", 1);
keyMap.set("B", 1);
keyMap.set("n", 1);
keyMap.set("N", 1);
keyMap.set("m", 1);
keyMap.set("M", 1);
keyMap.set(",", 1);
keyMap.set("<", 1);
keyMap.set(".", 2);
keyMap.set(">", 1);
keyMap.set("/", 2);
keyMap.set("?", 2);
keyMap.set("`", 1);
keyMap.set("~", 1);
keyMap.set("~", 1);
keyMap.set("1", 1);
keyMap.set("!", 1);
keyMap.set("2", 1);
keyMap.set("@", 1);
keyMap.set("3", 1);
keyMap.set("#", 2);
keyMap.set("4", 1);
keyMap.set("$", 1);
keyMap.set("5", 1);
keyMap.set("%", 1);
keyMap.set("6", 1);
keyMap.set("^", 1);
keyMap.set("7", 1);
keyMap.set("&", 1);
keyMap.set("8", 1);
keyMap.set("*", 1);
keyMap.set("9", 1);
keyMap.set("(", 1);
keyMap.set("0", 1);
keyMap.set(")", 3);
keyMap.set("-", 1);
keyMap.set("_", 1);
keyMap.set("=", 3);
keyMap.set("+", 1);

const HindiTest = () => {
  const ZWJ = "0x200D";
  const [stackOfKeys, setStackOfKeys] = useState([]);
  const timerRef = useRef(null);

  const [time, setTime] = useState(true);
  const [backspace, setBackspace] = useState(true);
  const [timeSelected, setTimeSelected] = useState(1);
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
      console.log("stack ", stackOfKeys);
      console.log("inputText length ", inputText.length);
      console.log("is zwj ", lastLetterZWJ);

      if (lastLetterZWJ) {
        if (stackOfKeys.length) {
          let lastKey = stackOfKeys.pop();
          setInputText((prev) => prev.slice(0, -(keyMap.get(lastKey) + 1)));
        }
      } else {
        if (stackOfKeys.length) {
          let lastKey = stackOfKeys.pop();
          // console.log("keymap of ", lastKey, " ", keyMap.get(lastKey));
          if(lastKey === "Z"){
            // special case of 'Z'
            // it will only happen when lastLetterZWJ is false because it does not use zwj in its char list
 
 
            if(inputText.length>3){
              // when 'Z' is not used as the first letter of hindi
              setInputText((prev) => prev.slice(0, -3) + prev.slice(-1));
            }else setInputText((prev)=> "");
          }else setInputText((prev) => prev.slice(0, -keyMap.get(lastKey)));
        }
      }
    } else if (key == " ") {
      if (lastLetterZWJ) {
        console.log("testing ", inputText, "ending");
        setInputText((prev) => prev.slice(0, -1) + " ");
        console.log("testing ", inputText, "ending");
      } else setInputText((prev) => prev + " ");

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "q") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0935")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0941"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "Q") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092B"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "w") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0942")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0942"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "W") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0945")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0945"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "e") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092E"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "r") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0924")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0924"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "t") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091C"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "y") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0932")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0932"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "u") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0928")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0928"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "i") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092A"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "o") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0935")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0935"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "p") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091A"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "[") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0916")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0916"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "]") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002C"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "\\") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x003F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x003F"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "|") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0918")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0918"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "a") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0902")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0902"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "A") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0964")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0964"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "s") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0947")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0947"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "S") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0948")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0948"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "d") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0915")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0915"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "f") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x093F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x093F"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "g") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0939")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0939"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "G") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0933")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0933"));

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "h") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0940")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0940"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "j") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0930")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0930"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "k") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x093E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x093E"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "l") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0938")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0938"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == ";") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092F"));

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "Z") {
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

      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "x") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0917")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0917"));

      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "c") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x092C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x092C"));
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "v") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + tring.fromCharCode("0x0905")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0905"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "V") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091F"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "b") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0907")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0907"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "B") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0920")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0920"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "n") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0926")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0926"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "N") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091B"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "m") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0909")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0909"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "M") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0921")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0921"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == ",") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x090F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x090F"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "<") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0922")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0922"));
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == ">") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x091D")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x091D"));
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "`") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0943")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0943"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "~") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x094D")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x094D"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "1") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0967")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0967"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "!") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0021")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0021"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "2") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0968")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0968"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "@") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002F"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "3") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0969")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0969"));
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "4") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096A"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "$") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002B"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "5") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096B"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "%") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x003A")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x003A"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "6") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096C"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "^") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x2018")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x2018"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "7") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096D")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096D"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "&") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x2212")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x2212"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "8") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096E"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "*") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x2019")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x2019"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "9") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x096F")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x096F"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "(") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x003B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x003B"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "0") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x0966")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x0966"));
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "-") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x002E")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x002E"));
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "_") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x090B")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x090B"));
      setStackOfKeys((prev) => [...prev, key]);
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
      setStackOfKeys((prev) => [...prev, key]);
    } else if (key == "+") {
      if (lastLetterZWJ)
        setInputText(
          (prev) => prev.slice(0, -1) + String.fromCharCode("0x093C")
        );
      else setInputText((prev) => prev + String.fromCharCode("0x093C"));
      setStackOfKeys((prev) => [...prev, key]);
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
      console.log(stackOfKeys);
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

    // if last char typed by user is ZWJ, then we need to remove it while checking
    const isLastCharZWJ =
      inputText[inputText.length - 1] === String.fromCharCode(ZWJ) ? 1 : 0;

    // here calculate all things that we need to show in the modal

    let inputArr = [];
    if (isLastCharZWJ) {
      inputArr = inputText.slice(0, -1).split(/\s+/);
    } else inputArr = inputText.trim().split(/\s+/);
    const correctArr = testText.trim().split(/\s+/);

    // let lst = inputArr[inputArr.length - 1];
    // console.log(lst, "end");
    // console.log(lst[lst.length - 1] == String.fromCharCode(ZWJ)? "yes": "no", "end");
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
