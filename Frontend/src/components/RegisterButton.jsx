import { twMerge } from "tailwind-merge";

const RegisterButton = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "px-6 py-4 border border-black  bg-cyan-600 hover:bg-cyan-800 text-white transition-colors duration-100 ",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default RegisterButton;
