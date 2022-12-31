import { createSlice } from "@reduxjs/toolkit";

import { BasicReduxState } from "../type";
import { News } from "./type";

const initialState: BasicReduxState<News> = {
  isLoading: false,
  data: null,
  error: null,
};

const reducers = {
  getNews: () => {},
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers,
});

export const { reducer: newsReducer, actions: newsActions } = newsSlice;
