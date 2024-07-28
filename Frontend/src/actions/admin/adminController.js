import axios from "axios";

const base_url = "http://localhost:4000";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export async function addTypingTest(data) {
  try {
    console.log("called");
    const response = await axios.post(
      `${base_url}/api/v1/admin/add/typing-test`,
      data,
      config
    );
    console.log(response);
    if (response.data) {
      return {
        success: true,
        message: "Registration Success",
      };
    } else {
      return {
        success: false,
        message: "Registration Failed ",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Registration Failed ",
    };
  }
}
