import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScrapArticleFilterStore } from "./type";

export const initialState: ScrapArticleFilterStore = {
  headline: "",
  pubDate: null,
  countries: [],
};

const scrapArticleFilterSlice = createSlice({
  name: "scrapArticleFilter",
  initialState,
  reducers: {
    updateArticleFilter(
      state,
      action: PayloadAction<Omit<ScrapArticleFilterStore, "page">>
    ) {
      const { headline, pubDate, countries } = action.payload;
      state.headline = headline;
      state.pubDate = pubDate;
      state.countries = countries;
    },
  },
});

export const {
  reducer: scrapArticleFilterReducer,
  actions: scrapArticleFilterActions,
} = scrapArticleFilterSlice;
