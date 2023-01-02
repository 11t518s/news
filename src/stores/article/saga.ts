import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { articleActions } from "./slice";
import { nyTimesApi } from "../../apis/nyTimes";
import { Article, GetArticleParams } from "../../apis/nyTimes/type";
import { articleFilterActions } from "../articleFilter";
import { PayloadAction } from "@reduxjs/toolkit";

function* getNewsSaga(action: PayloadAction<GetArticleParams>) {
  const { requestSuccess, requestFailure } = articleActions;
  const { increasePage } = articleFilterActions;
  const params = action.payload;
  try {
    const articleData: Article = yield call(nyTimesApi.getArticle, params);

    yield all([put(requestSuccess(articleData)), put(increasePage())]);

    put(increasePage());
  } catch (error) {
    yield put(requestFailure());
  }
}

function* watchGetNewsSaga() {
  yield takeLatest(articleActions.requestData, getNewsSaga);
}

export default function* newsSaga() {
  yield all([fork(watchGetNewsSaga)]);
}
