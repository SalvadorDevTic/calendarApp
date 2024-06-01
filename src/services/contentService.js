import { contentCalendarDays } from "../data/data";

export const getAllContent = () => {
  return contentCalendarDays;
};

export const getContentByRangeTimeStamp = (tsFrom, tsFo) => {
  contentCalendarDays.filter((c) => {
    let tsContent = new Date().setFullYear(
      c.date.year,
      c.date.month,
      c.date.day
    );
    if (tsFrom <= tsContent && tsFrom >= tsContent) c;
  });
};
