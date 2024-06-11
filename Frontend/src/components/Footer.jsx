import { FaWhatsapp } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-[100%] text-white">
      <div className="bg-[#191F23] flex justify-center gap-20 pt-8 pb-6">
        <div className="mx-w-[50rem]">
          <div className="flex gap-4">
            <img src="logo.png" className="w-[4.5rem]" alt="" />
            <h1 className="text-[1.5rem] font-bold">
              Rajasthan Steno <br /> Classes{" "}
            </h1>
          </div>
          <div className="mt-[3.5rem]">
            <h3 className="text-[1.5rem] font-bold">Follow us</h3>
            <div className="flex items-center  gap-4 py-4">
              <a href="" className="">
                <FaWhatsapp
                  size={"1.6rem"}
                  className="text-[#ABA9AB] hover:text-blue-500 hover:cursor-pointer"
                />
              </a>
              <a href="">
                <FaGooglePlusG
                  size={"2rem"}
                  className="text-[#ABA9AB] hover:text-blue-500 hover:cursor-pointer"
                />
              </a>
              <a href="">
                <BsTelegram
                  size={"1.6rem"}
                  className="text-[#ABA9AB] hover:text-blue-500 hover:cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-w-[50rem]">
          <h3 className="text-[1.5rem] font-bold pb-4">Connect with us</h3>
          <div className="flex gap-4 items-center mb-2">
            <HiMapPin />
            <p className="text-[#ABA9AB]">ABC Colony, this road, Rajasthan</p>
          </div>
          <div className="flex gap-4 items-center mb-2">
            <FaPhoneAlt />
            <p className="text-[#ABA9AB]">+91 6260050101</p>
          </div>
          <div className="flex gap-4 items-center mb-2">
            <IoMdMail />
            <p className="text-[#ABA9AB]">steno.classes@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="bg-[#14191C] text-[#ABA9AB] text-center py-6 border-t-[1px] border-t-[#494949]">
        Copyright &#169; Rajasthan Steno Classes
      </div>
    </div>
  );
};

export default Footer;
