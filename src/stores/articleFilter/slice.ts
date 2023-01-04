import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ArticleFilterStore } from "./type";

export const initialState: ArticleFilterStore = {
  page: 0,
  headline: "",
  pubDate: null,
  countries: [],
};

const articleFilterSlice = createSlice({
  name: "articleFilter",
  initialState,
  reducers: {
    updateArticleFilter(
      state,
      action: PayloadAction<Omit<ArticleFilterStore, "page">>
    ) {
      const { headline, pubDate, countries } = action.payload;
      state.headline = headline;
      state.pubDate = pubDate;
      state.page = 0;
      state.countries = countries;
    },
    increasePage(state) {
      state.page = state.page + 1;
    },
  },
});

export const { reducer: articleFilterReducer, actions: articleFilterActions } =
  articleFilterSlice;
