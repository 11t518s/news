export interface GetArticleParams {
  page: number;
  countries?: string[];
  headline?: string;
  pubDate?: string | null;
}

export interface Article {
  abstract: string;
  byline: Byline;
  document_type: string;
  headline: Headline;
  keywords: Keywords[];
  lead_paragraph: string;
  multimedia: any[];
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}

interface Byline {
  original: string;
  person: Person[];
  organization: null;
}

interface Person {
  firstname: string;
  middlename: string | null;
  lastname: string;
  organization: string;
  qualifier: string | null;
  rank: number;
  role: string;
  title: string | null;
}

interface Headline {
  content_kicker: string | null;
  kicker: string;
  main: string;
  name: string | null;
  print_headline: string;
  seo: string | null;
  sub: string | null;
}

interface Keywords {
  major: string;
  name: string;
  rank: number;
  value: string;
}
