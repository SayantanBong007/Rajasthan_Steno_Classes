import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RegisterButton from "../../components/RegisterButton";
import { register } from "../../actions/user/userController";

const Register = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password || !confirmpassword || !phone) {
        toast.error("Please complete all fields");
        setLoading(false);
        return;
      }

      const mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        toast.error("Invalid email!");
        setLoading(false);
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        setLoading(false);
        return;
      }

      if (password !== confirmpassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }


      const { success, message } = await register({
        fullName,
        email,
        password,
        phone,
      });

      if (success) {
        toast.success("Registration successful!");
        navigate("/profile"); // Redirect to Sign In page
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-red-50">
      <div className="bg-white rounded-lg shadow-lg flex overflow-hidden w-11/12 max-w-4xl">
        {/* Left side image and branding */}
        <div className="w-1/2 hidden md:block relative">
          <img
            src="bro.png"
            alt="Left Image"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
            <img src="/logo.png" width="80" height="80" alt="Logo" />
            <h1 className="text-2xl font-bold mt-4">Gurukul Steno Classes</h1>
            <p className="text-center mt-2">
              Join our Platform to make Your, Score Better & Practice well!
            </p>
          </div>
        </div>

        {/* Right side registration form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            {loading ? "Loading..." : "Register"}
          </h2>
          <div className="flex flex-col gap-4 text-xl">
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password (min. 8 characters)"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <RegisterButton
              className="font-bold uppercase text-xl w-full rounded-lg py-3 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign Up
            </RegisterButton>
            <p className="mt-4 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
