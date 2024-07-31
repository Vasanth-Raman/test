import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

//to read folders
const getFolders = async () => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/folder/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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

//to create folder
const createFolder = async (folderName) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/folder/create/`,
      {
        folderName,
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

//to delete folder
const deleteFolder = async (folderId) => {
  try {
    const response = await axios.delete(
      `${BACKEND_ORIGIN_URL}/folder/delete/${folderId}`,
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

export { getFolders, createFolder, deleteFolder };
