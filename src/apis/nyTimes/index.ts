import axios from "axios";
import { GetNYTimesParams, NYTimes } from "./type";

const apikey = "eHSHzzYsGoXTAx159wjGqxf5gYvMxiQj";

class NYTimesApi {
  getNYTimes = async ({
    page,
    countries,
    pubDate,
    headline,
  }: GetNYTimesParams): Promise<NYTimes> => {
    const params = this.makeParams({ countries, pubDate, headline, page });

    const result = await axios.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      { params }
    );
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
  }: GetNYTimesParams) => {
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
