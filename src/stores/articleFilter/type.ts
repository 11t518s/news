export interface ArticleFilterStore {
  page: number;
  countries: Countries[];
  headline: string;
  pubDate: Date | null;
}

export interface Countries {
  displayName: string;
  value: string;
}
