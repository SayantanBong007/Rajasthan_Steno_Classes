import axios from "axios";

const base_url = "http://localhost:4000";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export async function register(user) {
  try {
    console.log("called");
    const response = await axios.post(
      `${base_url}/api/v1/user/register`,
      user,
      config
    );

    if (response.data.success) {
      return {
        success: response.data.success,
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

export async function login(user) {
  try {
    const response = await axios.post(
      `${base_url}/api/v1/user/login`,
      user,
      config
    );

    if (response.data.success) {
      return {
        success: response.data.success,
        message: "Registration Success",
        resUser: response.data.user,
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

export async function getUserDetails() {
  try {
    const response = await axios.get(`${base_url}/api/v1/user/`, config);

    if (response.data.success) {
      return {
        success: response.data.success,
        message: "Registration Success",
        resUser: response.data.user,
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
