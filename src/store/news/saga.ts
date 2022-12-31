import { createAction } from "@reduxjs/toolkit";
import { all, fork, takeLatest } from "redux-saga/effects";

export const getNewsAction = createAction("news/getNews");

function* getNewsSaga() {
  try {
    yield console.log("getNews");
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetNewsSaga() {
  yield takeLatest(getNewsAction, getNewsSaga);
}

export default function* newsSaga() {
  yield all([fork(watchGetNewsSaga)]);
}
