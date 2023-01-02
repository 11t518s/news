import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ArticleStore } from "./type";
import { GetArticleParams } from "../../apis/nyTimes/type";

const initialState: ArticleStore = {
  isLoading: false,
  data: [],
  error: "",
};

const articleSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    requestData(state, action: PayloadAction<GetArticleParams>) {
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
