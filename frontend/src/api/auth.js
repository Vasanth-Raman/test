import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const registerUser = async (userName, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/register`, {
      userName,
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "An error occurred",
      status: error.response?.status || 500,
    };
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/login`, {
      email,
      password,
    });
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "An error occurred",
      status: error.response?.status || 500,
    };
  }
};

const updateUser = async (userName, email, oldPassword, password) => {
  try {
    const response = await axios.put(
      `${BACKEND_ORIGIN_URL}/user/update`,
      {
        userName,
        email,
        oldPassword,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "An error occurred",
      status: error.response?.status || 500,
    };
  }
};

export { registerUser, loginUser, updateUser };
