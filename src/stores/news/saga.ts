import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import stores from "../index";
import { newsActions } from "./slice";
import { nyTimesApi } from "../../apis/nyTimes";
import { NYTimes } from "../../apis/nyTimes/type";

function* getNewsSaga() {
  const { requestSuccess, requestFailure } = newsActions;
  try {
    const params = stores().getState().newsFilter;

    const nyTimesData: NYTimes = yield call(nyTimesApi.getNYTimes, params);
    yield put(requestSuccess(nyTimesData));
  } catch (error) {
    yield put(requestFailure());
  }
}

export function* watchGetNewsSaga() {
  yield takeLatest(newsActions.requestData, getNewsSaga);
}

export default function* newsSaga() {
  yield all([fork(watchGetNewsSaga)]);
}
