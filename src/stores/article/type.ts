import { BasicAsyncReduxState } from "../type";
import { Article } from "apis/nyTimes/type";

export type ArticleStore = BasicAsyncReduxState<Article[]>;
