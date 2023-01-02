import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NewsFilterStore } from "./type";

export const initialState: NewsFilterStore = {
  page: 0,
  headline: "",
  pubDate: "",
  countries: [],
};

const newsSlice = createSlice({
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
      state.page++;
    },
  },
});

export const { reducer: newsFilterReducer, actions: newsFilterActions } =
  newsSlice;
