import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScrapArticleStore } from "./type";
import { IndexedDBArticle } from "../../localDatabase/type";
import { ScrapArticleFilterStore } from "../scrapArticleFilter";
import { convertDateForApi } from "../../utils/time";

const initialState: ScrapArticleStore = {
  isLoading: true,
  data: [],
  error: "",
};

const scrapArticleSlice = createSlice({
  name: "scrapArticle",
  initialState,
  reducers: {
    addArticle(
      state,
      action: PayloadAction<{
        article: IndexedDBArticle;
        scrapFilter: ScrapArticleFilterStore;
      }>
    ) {
      const {
        article,
        scrapFilter: { headline, pubDate, countries },
      } = action.payload;
      const isTargetHeadline =
        !headline || (headline && article.headline.main.includes(headline));
      const isTargetPubDate =
        !pubDate ||
        (pubDate &&
          article.pub_date.slice(0, article.pub_date.indexOf("T")) ===
            convertDateForApi(pubDate));

      const isTargetCountries =
        countries.length === 0 ||
        article.keywords.some(
          (keyword) =>
            keyword.name === "glocations" &&
            countries.some((country) => country.value === keyword.value)
        );
      if (!isTargetHeadline) return;
      if (!isTargetPubDate) return;
      if (!isTargetCountries) return;

      state.data = [...state.data, article];
    },
    deleteArticle(state, action: PayloadAction<IndexedDBArticle>) {
      state.data = state.data.filter(
        (article) => article._id !== action.payload._id
      );
    },

    requestData(state, action: PayloadAction<ScrapArticleFilterStore>) {
      state.isLoading = true;
      state.error = "";
    },
    requestSuccess(state, action: PayloadAction<IndexedDBArticle[]>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    requestFailure(state) {
      state.isLoading = false;
      state.error = "에러가 발생했습니다.";
    },
  },
});

export const { reducer: scrapArticleReducer, actions: scrapArticleActions } =
  scrapArticleSlice;
