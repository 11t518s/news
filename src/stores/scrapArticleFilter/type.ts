import { Countries } from "../articleFilter";

export interface ScrapArticleFilterStore {
  countries: Countries[];
  headline: string;
  pubDate: Date | null;
}
