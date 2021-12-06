import dayjs from 'dayjs';

export const monthName = <T extends { dt_txt: string }>(data: T) => {
  return dayjs(data.dt_txt, 'YYYY-MM-DD').format('MMMM D, YYYY');
};
