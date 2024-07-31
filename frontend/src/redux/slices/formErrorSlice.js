import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
};

const formErrorSlice = createSlice({
  name: "formError",
  initialState,
  reducers: {
    addError: (state, action) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = "";
    },
    resetError: () => initialState,
  },
});

export const { addError, removeError, resetError } = formErrorSlice.actions;

export default formErrorSlice.reducer;
