import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ArticleStore } from "./type";
import { ArticleFilterStore } from "../articleFilter";

const initialState: ArticleStore = {
  isLoading: true,
  data: [],
  error: "",
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetData(state) {
      state.data = [];
    },
    requestData(state, action: PayloadAction<ArticleFilterStore>) {
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

export const { reducer: articleReducer, actions: articleActions } =
  articleSlice;
