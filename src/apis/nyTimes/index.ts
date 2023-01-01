import axios from "axios";
import { GetNYTimes, NYTimes } from "./type";

const apikey = "eHSHzzYsGoXTAx159wjGqxf5gYvMxiQj";

export const getNYTimesApi = async ({
  page,
  targetCountries,
  targetDate,
  targetHeadline,
}: GetNYTimes): Promise<NYTimes> => {
  const glocationsQuery = `glocations.contains:(${targetCountries?.join(" ")})`;
  const pubDateQuery = `pub_date:(${targetDate})`;
  const headlineQuery = `headline:(${targetHeadline})`;
  let fqArray: string[] = [];
  if (targetCountries) fqArray = [...fqArray, glocationsQuery];
  if (targetDate) fqArray = [...fqArray, pubDateQuery];
  if (targetHeadline) fqArray = [...fqArray, headlineQuery];

  const params = { "api-key": apikey, fq: fqArray.join(" AND "), page };

  const result = await axios.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    { params }
  );
  if (result.status !== 200) {
    throw new Error("예상치 않은 에러가 발생했습니다.");
  }

  return result.data.response.docs;
};
