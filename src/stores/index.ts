import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./news";
import newsSaga from "./news/saga";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield all([newsSaga()]);
};

const createStore = () => {
  const store = configureStore({
    reducer: newsReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
