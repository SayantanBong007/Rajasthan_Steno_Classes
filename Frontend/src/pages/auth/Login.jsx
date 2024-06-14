import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RegisterButton from "../../components/RegisterButton";
import { login } from "../../actions/user/userController";

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
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

      const { success, message } = await login({
        email: user.email,
        username: user.username,
        password: user.password,
      });

      if (success) {
        await extractData(); // Fetch additional user data

        // Save user details to localStorage
        localStorage.setItem("role", JSON.stringify(luser.role));
        localStorage.setItem("name", JSON.stringify(luser.fullName));
        localStorage.setItem("phone", JSON.stringify(luser.phone));
        localStorage.setItem("email", JSON.stringify(luser.email));

        // Navigate based on user role
        if (luser.role === "user") {
          navigate("/user");
        } else if (luser.role === "admin") {
          navigate("/admin");
        }
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

  const [luser, setLUser] = useState({});

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-stone-100">
      <div className="absolute left-6 top-4 flex items-center">
        <div className="flex flex-row gap-3">
          <img src="/logo.png" width="40" height="40" alt="Logo" />
          <h1 className="text-cyan-700 text-2xl font-bold">
            Rajasthan Steno Classes
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-sm w-[40%] h-fit p-8 flex flex-col justify-center align-items">
        <div className="flex justify-center items-center mt-5 pt-10">
          <h2 className="text-6xl mb-[3.5rem] font-bold">
            {loading ? "Loading..." : "Sign in"}
          </h2>
        </div>

        <div className="flex flex-col w-[100%] justify-center items-center">
          <div className="flex flex-col gap-4 text-xl pt-[2.5rem]">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="User Name"
                className="bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password min. 8 characters"
                className="bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="mt-[1rem] m-auto">
              <RegisterButton
                className="font-bold uppercase text-xl w-[25vw]"
                onClick={handleLogin}
                disabled={loading}
              >
                Sign In
              </RegisterButton>
              <br />

              <div className="m-2">
                Don't have an account?
                <Link to="/register" className="hover:text-blue-800">
                  <span className="text-cyan-600"> Sign up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
