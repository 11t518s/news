import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ArticleFilterStore } from "./type";

export const initialState: ArticleFilterStore = {
  page: 0,
  headline: "",
  pubDate: "",
  countries: [],
};

const articleFilterSlice = createSlice({
  name: "newsFilter",
  initialState,
  reducers: {
    updateHeadLine(state, action: PayloadAction<string>) {
      state.headline = action.payload;
      state.page = 0;
    },
    updatePubDate(state, action: PayloadAction<string>) {
      state.pubDate = action.payload;
      state.page = 0;
    },
    updateCountries(state, action: PayloadAction<string>) {
      if (state.countries.some((country) => country === action.payload)) {
        state.countries = state.countries.filter(
          (country) => country !== action.payload
        );
        state.page = 0;
      } else {
        state.countries = [...state.countries, action.payload];
        state.page = 0;
      }
    },
    increasePage(state) {
      state.page = state.page + 1;
    },
  },
});

export const { reducer: articleFilterReducer, actions: articleFilterActions } =
  articleFilterSlice;
