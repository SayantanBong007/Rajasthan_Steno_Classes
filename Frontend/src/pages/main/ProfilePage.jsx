import React, { useState, useEffect } from "react";
import { FaUserAlt, FaHistory } from "react-icons/fa";
import axios from "axios";

const base_url = "http://localhost:4000";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    history: [],
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/api/v1/user/`, config);

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.log("Failed to fetch user details.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-8xl flex flex-col overflow-hidden max-h-[800px] border border-gray-200">
        {/* User Logo */}
        <div className="flex justify-center mb-4">
          <FaUserAlt
            className="text-gray-500 border-4 border-gray-200 rounded-full p-2"
            size={96}
          />
        </div>

        {/* User Details */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>

        {/* User History */}
        <div className="flex-grow mt-4">
          <div className="bg-gray-100 flex flex-row items-center justify-center p-2 rounded-md mb-4">
            <FaHistory size={25} className="text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900 pl-2">
              User History
            </h3>
          </div>

          <div className="overflow-y-auto space-y-4 px-2 pt-2 max-h-[500px]">
            {user.history.length > 0 ? (
              user.history.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row items-center md:justify-between"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:flex-grow">
                    <div className="flex-grow">
                      <p className="font-bold text-gray-900">{item.type}</p>
                      <p className="text-gray-600">{item.date}</p>
                      <p className="text-gray-800">{item.score}</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:ml-auto">
                      <div className="bg-slate-50 rounded-lg p-2 mr-2">
                        <p className="text-gray-800 text-sm font-semibold ">
                          Accuracy: {item.accuracy}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2 mr-2">
                        <p className="text-gray-800 text-sm font-semibold">
                          Language: {item.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-md">
                <p className="text-gray-600">No history available.</p>
                <p className="text-gray-800 font-semibold mt-2">
                  Take exams to generate history!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
