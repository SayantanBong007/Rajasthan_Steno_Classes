import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RegisterButton from "../../components/RegisterButton";
import { login } from "../../actions/user/userController";

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!user.email || !user.password) {
        toast.error("Please complete the fields!");
        setLoading(false);
        return;
      }

      const { success, message, resUser } = await login({
        email: user.email,
        password: user.password,
      });

      if (success) {
        // Save user details to localStorage
        localStorage.setItem("role", JSON.stringify(resUser.role));
        localStorage.setItem("name", JSON.stringify(resUser.name));

        toast.success("Login Successful!");
        // Navigate based on user role
        if (resUser.role === "admin") {
          navigate("/admin");
        } else navigate("/profile");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Signin failed", error.message);
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
            <h1 className="text-2xl font-bold mt-4">Gurukul Steno Classes</h1>
            <p className="text-center mt-2">
              Join our Platform to make Your Score Better & Practice well!
            </p>
          </div>
        </div>

        {/* Right side login form */}
        <div className="w-full md:w-1/2 px-8 py-3 flex flex-col justify-center">
          <div className="flex items-center justify-center pb-5 ">
            <img src="/logo.png" width="80" height="80" alt="Logo" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">
            {loading ? "Loading..." : "Sign in"}
          </h2>
          <div className="flex flex-col gap-4 text-xl">
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password (min. 8 characters)"
              className="rounded-lg bg-gray-200 w-full border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <RegisterButton
              className="font-bold uppercase text-xl w-full rounded-lg py-3 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
              onClick={handleLogin}
              disabled={loading}
            >
              Sign In
            </RegisterButton>
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
