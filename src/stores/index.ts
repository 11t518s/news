import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { articleReducer } from "./article";
import articleSaga from "./article/saga";
import { articleFilterReducer } from "./articleFilter";
import { scrapArticleFilterReducer } from "./scrapArticleFilter";
import { scrapArticleReducer } from "./scrapArticle";
import scrapArticleSaga from "./scrapArticle/saga";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield all([articleSaga(), scrapArticleSaga()]);
};

const rootReducer = combineReducers({
  article: articleReducer,
  articleFilter: articleFilterReducer,
  scrapArticleFilter: scrapArticleFilterReducer,
  scrapArticle: scrapArticleReducer,
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
