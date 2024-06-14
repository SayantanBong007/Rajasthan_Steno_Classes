import { register } from "../../actions/user/userController";
import { useState, useRef } from "react";
import RegisterButton from "../../components/RegisterButton";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // const router = useRouter();
  const navigate = useNavigate(); // Initialize the navigate hook
  const ref = useRef(null);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!username || !email || !password || !confirmpassword) {
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
        username,
        fullName,
        email,
        password,
        phone,
        avatar: image.secureURL,
      });

      if (success) {
        toast.success("Registration successful!");
        navigate("/signin"); // Redirect to Sign In page
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
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-stone-100">
      <div className="absolute left-6 top-4 flex items-center">
        <div className="flex flex-row gap-3">
          <img src="/logo.png" width="40" height="40" alt="Logo" />
          <h1 className="text-cyan-700 text-2xl font-bold">
            Rajasthan Steno Classes
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-sm w-[60%] h-fit p-8 flex flex-col justify-center align-items">
        <div className="flex justify-center align-items">
          <h2 className="flex justify-centre item-centre text-6xl mb-[3.5rem] font-bold">
            {loading ? "Loading..." : "Register"}
          </h2>
        </div>
        <div className="flex flex-col w-[100%] justify-center items-center">
          <div className="flex flex-col gap-4 text-xl mt-[2rem] pt-[2rem]">
            <div className="flex gap-6">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="User Name"
                  className="rounded-lg bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-lg bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-lg bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password min. 8 characters"
                  className="rounded-lg bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-lg bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  type="string"
                  placeholder="Contact Number"
                  className="rounded-lg bg-transparent w-[25vw] border-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-[2rem] m-auto">
              <RegisterButton
                className="font-bold uppercase text-xl w-[25vw] rounded-lg pb-2"
                onClick={handleSubmit}
                disabled={loading}
              >
                Sign Up
              </RegisterButton>
              <br />

              <div className="m-2">
                Already have an account?
                <Link to="/login" className="hover:text-blue-800">
                  <span className="text-cyan-500"> Sign in </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
