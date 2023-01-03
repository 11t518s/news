import axios from "axios";
import { GetArticleParams, Article } from "./type";

// const apikey = "AljG7ANi28deGI6fiCrQB4NCvgUf7aUu";
const apikey = "eHSHzzYsGoXTAx159wjGqxf5gYvMxiQj";

const URL_PATH = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

class NYTimesApi {
  getArticle = async ({
    page,
    countries,
    pubDate,
    headline,
  }: GetArticleParams): Promise<Article> => {
    const params = this.makeParams({ countries, pubDate, headline, page });

    const result = await axios.get(URL_PATH, { params });
    if (result.status !== 200) {
      throw new Error("예상치 않은 에러가 발생했습니다.");
    }

    return result.data.response.docs;
  };

  private makeParams = ({
    countries,
    pubDate,
    headline,
    page,
  }: GetArticleParams) => {
    const glocationsQuery = `glocations.contains:(${countries?.join(" ")})`;
    const pubDateQuery = `pub_date:(${pubDate})`;
    const headlineQuery = `headline:(${headline})`;
    let fqArray: string[] = [];
    if (countries && countries.length > 0)
      fqArray = [...fqArray, glocationsQuery];
    if (pubDate) fqArray = [...fqArray, pubDateQuery];
    if (headline) fqArray = [...fqArray, headlineQuery];

    return { "api-key": apikey, fq: fqArray.join(" AND "), page };
  };
}

export const nyTimesApi = new NYTimesApi();
