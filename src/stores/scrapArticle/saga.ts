import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { scrapArticleActions } from "./slice";
import { ScrapArticleFilterStore } from "stores/scrapArticleFilter/type";
import { scrapArticleDB } from "localDatabase";
import { IndexedDBArticle } from "localDatabase/type";
import { convertDateForScrapFilter } from "utils/time";

function* getScrapArticleSaga(action: PayloadAction<ScrapArticleFilterStore>) {
  const { requestSuccess, requestFailure } = scrapArticleActions;
  const { pubDate, headline, countries } = action.payload;

  try {
    const articleData: IndexedDBArticle[] = yield call(scrapArticleDB.read);

    const filteredArticle = articleData
      .filter((article) => {
        if (!headline) return true;

        return article.headline.main
          .toLowerCase()
          .includes(headline.toLowerCase());
      })
      .filter((article) => {
        if (!pubDate) return true;

        return (
          article.pub_date.slice(0, article.pub_date.indexOf("T")) ===
          convertDateForScrapFilter(pubDate)
        );
      })
      .filter((article) => {
        if (countries.length === 0) return true;

        return article.keywords.some(
          (keyword) =>
            keyword.name === "glocations" &&
            countries.some(
              (country) =>
                country.value.toLowerCase() === keyword.value.toLowerCase()
            )
        );
      });

    yield put(requestSuccess(filteredArticle));
  } catch (error) {
    yield put(requestFailure());
  }
}

function* watchGetScrapArticleSaga() {
  yield takeLatest(scrapArticleActions.requestData, getScrapArticleSaga);
}

export default function* scrapArticleSaga() {
  yield all([fork(watchGetScrapArticleSaga)]);
}
