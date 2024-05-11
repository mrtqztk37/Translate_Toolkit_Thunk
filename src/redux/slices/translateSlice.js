import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";
const initialState = {
  isLoading: false,
  isEror: false,
  answer: "",
};
const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setAnswer: (state, { payload }) => {
      state.answer = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state, action) => {
      state.isLoading = true;
      state.answer = "";
    });
    builder.addCase(translateText.fulfilled, (state, { payload }) => {
      (state.isLoading = false),
        (state.isEror = false),
        (state.answer = payload);
    });
    builder.addCase(translateText.rejected, (state, { error }) => {
      (state.isLoading = false), (state.isEror = true);
    });
  },
});
export default translateSlice.reducer;

export const { setAnswer } = translateSlice.actions;
