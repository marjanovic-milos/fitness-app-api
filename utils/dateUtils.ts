import dayjs from "dayjs";

export const currentWeek = () => {
  const last3Days = dayjs().subtract(3, "day").format("YYYY-MM-DD");
  const next3Days = dayjs().add(3, "day").format("YYYY-MM-DD");
  return { last3Days, next3Days };
};
