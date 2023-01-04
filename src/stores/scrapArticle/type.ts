import { BasicAsyncReduxState } from "../type";
import { IndexedDBArticle } from "../../localDatabase/type";

export type ScrapArticleStore = BasicAsyncReduxState<IndexedDBArticle[]>;
