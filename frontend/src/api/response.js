import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

//to create response document
const createResponse = async (formId) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/response/create/`,
      {
        formId,
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

//to update response
const updateResponse = async (responseId, title, response) => {
  try {
    const responses = await axios.put(
      `${BACKEND_ORIGIN_URL}/response/update/${responseId}`,
      {
        title,
        response,
      }
    );

    return {
      success: true,
      data: responses.data,
      status: responses.status,
    };
  } catch (error) {
    return {
      success: false,
      data: error.responses?.data || "An error occurred",
      status: error.responses?.status || 500,
    };
  }
};

// to read response
const getResponses = async (formId) => {
  try {
    const response = await axios.get(
      `${BACKEND_ORIGIN_URL}/response/${formId}`
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

export { createResponse, updateResponse, getResponses };
