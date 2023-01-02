import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { articleReducer } from "./article";
import articleSaga from "./article/saga";
import { articleFilterReducer } from "./articleFilter";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield all([articleSaga()]);
};

const rootReducer = combineReducers({
  article: articleReducer,
  articleFilter: articleFilterReducer,
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
