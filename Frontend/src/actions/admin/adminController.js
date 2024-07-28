import axios from "axios";

const base_url = "http://localhost:4000";

const getConfig = () => {
  const token = localStorage.getItem("authToken"); // Ensure the token is stored correctly after login
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
};

export async function addTypingTest(data) {
  try {
    const response = await axios.post(
      `${base_url}/api/v1/admin/add/typing-test`,
      data,
      getConfig()
    );

    if (response.data.success) {
      return {
        success: response.data.success,
        message: "Registration Success",
      };
    } else {
      return {
        success: false,
        message: "Registration Failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Registration Failed",
    };
  }
}

export async function addStenoTest(data) {
  try {
    const response = await axios.post(
      `${base_url}/api/v1/admin/add/steno-test`,
      data,
      getConfig()
    );

    if (response.data.success) {
      return {
        success: response.data.success,
        message: "Steno Test Added Successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to Add Steno Test",
      };
    }
  } catch (error) {
    console.log("Error in addStenoTest function:", error.response.data);
    return {
      success: false,
      message: "Failed to Add Steno Test",
    };
  }
}
