import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TypewriterComponent from "typewriter-effect";
import { Link } from "react-router-dom";

const isLoggedIn = false;

const HeroSection = () => {
  const handleButtonClick = () => {
    if (isLoggedIn) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="relative w-[100%] h-full bg-blue-50  ">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="w-1/2 h-full">
          <img
            src="hero.png"
            alt="background"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="w-1/2 h-full position-relative flex flex-col align-items-center">
          <div className="text-slate-600 font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
              <h1>Welcome to</h1>
              <h1>Rajasthan Steno Classes</h1>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-400 p-3">
                <TypewriterComponent
                  options={{
                    strings: [
                      "Typing Mastery",
                      "Steno Skills",
                      "Speed Development",
                      "Accuracy Techniques",
                      "Professional Coaching",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </div>
            <div className="text-2xl font-semibold md:text-xl text-zinc-400 pb-5">
              Learn typing and steno skills effectively in Rajasthan.
            </div>
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="md:text-lg p-4 md:p-6 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white border-0"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="md:text-lg p-4 md:p-6 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white border-0"
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
