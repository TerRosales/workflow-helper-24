import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  line: "",
  job: "",
  qualificationKey: "",
  qualification: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      console.log("updateFormData - state:", state, "action:", action.payload); // Debugging
      return { ...state, ...action.payload };
    },
    resetFormData: (state) => {
      console.log("resetFormData - state:", initialState); // Debugging
      return initialState;
    },
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;

export default formSlice.reducer;
