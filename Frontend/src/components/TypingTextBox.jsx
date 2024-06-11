import React, { useEffect, useRef, useState } from "react";

const TypingTextBox = () => {
  const [text, setText] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const [words, setWords] = useState([]);
  const inputRef = useRef(null);

  // Fetch or generate test words here
  useEffect(() => {
    const fetchWords = async () => {
      // Replace with your logic to fetch or generate words
      const fetchedWords = ["This", "is", "a", "sample", "text"];
      setWords(fetchedWords);
    };
    fetchWords();
  }, []);

  const handleKeyDown = (event) => {
    const typedChar = event.key;
    const expectedChar = words[currentWord][0];

    if (typedChar === expectedChar) {
      // Update typed text and move to next character
      setText(text + typedChar);
      setCurrentWord(currentWord + 1);
    }

    // Additional logic for handling backspace, errors, etc.
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
  }, [inputRef]);

  return (
    <div>
      <p>{text}</p>
      <input
        ref={inputRef}
        value={text.slice(currentWord)}
        onChange={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
      />
      {/* Additional elements for displaying progress, time, etc. */}
    </div>
  );
};

export default TypingTextBox;
