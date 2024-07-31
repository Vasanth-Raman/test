import { configureStore } from "@reduxjs/toolkit";
import formFieldSlice from "../slices/formFieldSlice";
import formFlowSlice from "../slices/formFlowSlice";
import formErrorSlice from "../slices/formErrorSlice";

const appStore = configureStore({
  reducer: {
    fields: formFieldSlice,
    flows: formFlowSlice,
    errors: formErrorSlice,
  },
});

export default appStore;
