import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./news";
import newsSaga from "./news/saga";
import { newsFilterReducer } from "./newsFilter";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield all([newsSaga()]);
};

const rootReducer = combineReducers({
  news: newsReducer,
  newsFilter: newsFilterReducer,
});

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
export type RootState = ReturnType<typeof rootReducer>;
