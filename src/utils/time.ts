export const convertDataType = (targetDate: string) => {
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
