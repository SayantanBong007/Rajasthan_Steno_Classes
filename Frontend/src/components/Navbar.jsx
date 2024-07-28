import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { FaKeyboard } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Navbar = ({ isAuth }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);

  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <main className="w-full h-[4rem] py-2 px-5 flex flex-row items-center justify-center sticky top-0 bg-gradient-to-r from-sky-500 to-cyan-500 bg-opacity-30 text-gray-700 text-[1.1rem] font-bold z-50 backdrop-blur-md ">
      <div className="min-w-[90%] flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="logo.png"
            className="w-[3rem]"
            alt="logo of Rajasthan steno classes"
          />
          <div className="font-bold ml-3">Rajasthan Steno Classes</div>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex flex-row items-center">
            <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
              <FaHome size={25} />
              <Link to="/" className="hover:underline ml-1">
                Home
              </Link>
            </div>
            <h1 className="ml-2">|</h1>
          </div>

          {isAuthenticated ? (
            <>
              <div className="flex flex-row items-center">
                <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                  <FaKeyboard size={25} />
                  <Link to="/typing-tests" className="hover:underline ml-2">
                    Typing
                  </Link>
                </div>
              </div>
              <h1>|</h1>
              <div className="flex flex-row items-center">
                <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                  <AiFillSound size={25} />
                  <Link to="/steno-tests" className="hover:underline ml-2">
                    Steno
                  </Link>
                </div>
              </div>
              <h1>|</h1>
              <div className="flex flex-row items-center">
                <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                  <FaClipboardUser size={25} />
                  <Link to="/profile" className="hover:underline ml-2">
                    Profile
                  </Link>
                </div>
              </div>
              <h1>|</h1>
              <div className="flex flex-row items-center">
                <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                  <RiLogoutBoxRFill size={25} />
                  <button
                    onClick={handleAuthToggle}
                    className="hover:underline ml-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </div>
              <h1>|</h1>
              <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Navbar;
