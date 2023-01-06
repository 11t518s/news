import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { nyTimesApi } from "apis/nyTimes";
import { Article } from "apis/nyTimes/type";
import { convertDateForApi } from "utils/time";
import { articleActions } from "./slice";
import { articleFilterActions, ArticleFilterStore } from "../articleFilter";

function* getArticleSaga(action: PayloadAction<ArticleFilterStore>) {
  const { requestSuccess, requestFailure } = articleActions;
  const { increasePage } = articleFilterActions;
  const { page, pubDate, headline, countries } = action.payload;

  const params = {
    page,
    headline,
    pubDate: pubDate ? convertDateForApi(pubDate) : null,
    countries: countries ? countries.map((country) => country.value) : [],
  };

  try {
    const articleData: Article = yield call(nyTimesApi.getArticle, params);

    yield all([put(requestSuccess(articleData)), put(increasePage())]);
  } catch (error) {
    yield put(requestFailure());
  }
}

function* watchGetArticleSaga() {
  yield takeLatest(articleActions.requestData, getArticleSaga);
}

export default function* articleSaga() {
  yield all([fork(watchGetArticleSaga)]);
}
