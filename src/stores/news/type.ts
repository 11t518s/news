import { BasicAsyncReduxState } from "../type";
import { NYTimes } from "../../apis/nyTimes/type";

export type NewsStore = BasicAsyncReduxState<NYTimes[]>;
