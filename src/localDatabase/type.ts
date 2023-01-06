import { Article } from "apis/nyTimes/type";

export interface Action<T> {
  read: () => Promise<T[]>;
  create: (data: T) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
}

export type IndexedDBArticle = Article & { ID?: number };
