import { createAction } from "@reduxjs/toolkit";
import { takeEvery } from "redux-saga/effects";

export const getNewsAction = createAction("news/getNews");

function* getNewsSaga() {
  try {
    yield console.log("getNews");
  } catch (error) {
    console.error(error);
  }
}

export function* newsSaga() {
  yield takeEvery(getNewsAction, getNewsSaga);
}
