import { Link } from "react-router-dom";

import DarkToggle from "./DarkToggle";

const Navbar = () => {
  return (
    <main className="w-[100%] h-[4rem] py-2 px-5 flex flex-row items-center justify-center bg-[#4582FF] text-white text-[1.1rem] font-bold sticky top-0 ">
      <div className=" min-w-[60%] flex items-center justify-between">
        <img src="logo.png" className="w-[3rem]" alt="logo of Rajasthan steno classes" />
        <div className="flex items-center justify-center gap-7 ">
          <Link className="hover:underline" >Login</Link>
          {/* <DarkToggle size={30} /> */}
        </div>
      </div>
    </main>
  );
};

export default Navbar;
