import React, { useEffect, useRef, useState } from "react";

const AudioElement = () => {
  const audio = useRef();
  const [progress, setProgress] = useState(0);
  const [audioSource, setAudioSource] = useState(
    "https://res.cloudinary.com/dmicop9hj/video/upload/v1720166987/AUD-20240630-WA0005_nn46bq.mp3"
  );
  const [value, setValue] = useState(100);

  useEffect(() => {
    let aud = audio.current;
    aud.ontimeupdate = () => {
      setProgress(
        (aud.currentTime ? audio.currentTime : 0 / aud.duration) * 100
      );
    };
  }, [audio]);

  return (
    <div>
      <audio
        ref={audio}
        className="bg-gray-800 border-2 border-gray-800 w-[40rem] rounded-full hidden"
      >
        <source src={audioSource} />
      </audio>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center font-bold text-gray-700">
            {audio.current?.currentTime.toFixed(1)}s /{" "}
            {audio.current?.duration.toFixed(1)}s
          </div>
          <div>
            <div className="w-[30rem] bg-gray-400 h-[0.4rem] rounded-lg">
              <div
                className="w-[00%] bg-gray-700 h-[0.4rem] rounded-lg relative"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => audio.current.play()}
              className="bg-blue-500 py-2 px-3 font-bold text-white rounded-lg hover:bg-blue-600"
            >
              Start
            </button>
            <button
              onClick={() => audio.current.pause()}
              className="bg-blue-500 py-2 px-3 font-bold text-white rounded-lg hover:bg-blue-600"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioElement;
