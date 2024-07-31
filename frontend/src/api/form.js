import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

//to read form outside folder
const getDashboardForms = async () => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/form/dashboard/`, {
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

//to read single form
const getSingleForm = async (formId) => {
  try {
    const response = await axios.get(
      `${BACKEND_ORIGIN_URL}/form/singleForm/${formId}`,
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

//to read forms inside folder
const getFolderForms = async (folderId) => {
  try {
    const response = await axios.get(
      `${BACKEND_ORIGIN_URL}/form/dashboard/?folderId=${folderId}`,
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

//to get data for bot
const getFormBot = async (folderId) => {
  try {
    const response = await axios.get(
      `${BACKEND_ORIGIN_URL}/form/formBot/${folderId}`
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

//to create new form
const createForm = async (formName, theme, flow, folderId) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/form/create/`,
      {
        formName,
        theme,
        flow,
        folderId,
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

//to update form
const updateForm = async (formName, theme, flow, formId) => {
  try {
    const response = await axios.put(
      `${BACKEND_ORIGIN_URL}/form/update/${formId}`,
      {
        formName,
        theme,
        flow,
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

//to delete form

const deleteForm = async (formId) => {
  try {
    const response = await axios.delete(
      `${BACKEND_ORIGIN_URL}/form/delete/${formId}`,
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

export {
  getDashboardForms,
  getFolderForms,
  getSingleForm,
  getFormBot,
  createForm,
  updateForm,
  deleteForm,
};
