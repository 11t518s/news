export const convertDateForArticle = (targetDate: string) => {
  const date = new Date(targetDate);
  const YYYMMDD = new Intl.DateTimeFormat("ko", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
    // dateStyle: "medium",
  }).format(date);
  return YYYMMDD.replace("년 ", ".").replace("월 ", ".").replace("일", ".");
};

export const convertDateForApi = (targetDate: Date) => {
  const date = new Date(targetDate);
  const YYYYMMDD = new Intl.DateTimeFormat("ko", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return YYYYMMDD.replace("년 ", "-").replace("월 ", "-").replace("일", "");
};

export const convertDateForFilterHeader = (targetDate: Date) => {
  const date = new Date(targetDate);
  const YYYYMMDD = new Intl.DateTimeFormat("ko", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return YYYYMMDD.replace("년 ", ".").replace("월 ", ".").replace("일", "");
};
