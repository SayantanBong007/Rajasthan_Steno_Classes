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
    <main className="w-[100%] h-[4rem] py-2 px-5 flex flex-row items-center justify-center bg-[#278db5] text-white text-[1.1rem] font-bold sticky top-0">
      <div className="min-w-[90%] flex items-center justify-between">
        <div className="flex flex-between flex-row items-center">
          <img
            src="logo.png"
            className="w-[3rem]"
            alt="logo of Rajasthan steno classes"
          />
          <div className="font-bold ml-3">Rajasthan Steno Classes</div>
        </div>
        <div className="flex items-center justify-center gap-7">
          <div className="flex flex-row items-center">
            <FaHome size={25} />
            <Link to="/" className="hover:underline ml-1">
              Home
            </Link>
            <h1 className="ml-2">|</h1>
          </div>

          {true ? (
            <>
              <div className="flex flex-row items-center">
                <FaKeyboard size={25} />
                <Link to="/typing-tests" className="hover:underline ml-2">
                  Typing
                </Link>
              </div>
              <h1>|</h1>
              <div className="flex flex-row items-center">
                <AiFillSound size={25} />
                <Link to="/steno" className="hover:underline ml-2">
                  Steno
                </Link>
              </div>
              <h1>|</h1>
              <div className="flex flex-row items-center">
                <FaClipboardUser size={25} />
                <Link to="/profile" className="hover:underline ml-2">
                  Profile
                </Link>
              </div>
              <h1>|</h1>
              <div className="flex flex-row items-center">
                <RiLogoutBoxRFill size={25} />
                <button
                  onClick={handleAuthToggle}
                  className="hover:underline ml-2"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <h1>|</h1>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Navbar;
