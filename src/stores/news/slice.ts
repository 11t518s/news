import { createSlice } from "@reduxjs/toolkit";

import { NewsStore } from "./type";

const initialState: NewsStore = {
  isLoading: false,
  data: [],
  error: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    requestData(state) {
      state.isLoading = true;
      state.error = "";
    },
    requestSuccess(state, action) {
      state.isLoading = false;
      state.data = [...state.data, ...action.payload];
    },
    requestFailure(state) {
      state.isLoading = false;
      state.error = "에러가 발생했습니다.";
    },
  },
});

export const { reducer: newsReducer, actions: newsActions } = newsSlice;
