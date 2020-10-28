import dayjs from 'dayjs';

import { DateData } from '../../../types/getSchedule';
import { DisplayData } from '../types';

export function filterCurrentDay(datum: DateData, currentDay: dayjs.Dayjs) {
  const targetStartTime = dayjs(datum.start);
  const startDay = currentDay.startOf('d');
  const endDay = currentDay.endOf('d');

  return startDay <= targetStartTime && endDay > targetStartTime;
}

const DISPLAY_INTERVAL = 1000 * 60 * 30;
export function formatData(
  acc: DisplayData[],
  cur: DateData,
  isAvailable: boolean
) {
  const targetStart = +dayjs(cur.start);
  const targetEnd = +dayjs(cur.end);
  const returnValue: DisplayData[] = [];

  for (let i = targetStart; i < targetEnd; i += DISPLAY_INTERVAL) {
    const hour = `${dayjs(i).get('h')}`.padStart(2, '0');
    const minute = `${dayjs(i).get('m')}`.padStart(2, '0');

    returnValue.push({
      theDate: dayjs(i),
      value: `${hour}:${minute}`,
      isAvailable,
    });
  }

  return acc.concat(returnValue);
}

export function filterValidDate(datum: DisplayData) {
  const now = dayjs();

  return +datum.theDate >= +now;
}

interface MakeDisplayDataParams {
  currentDay: dayjs.Dayjs;
  isAvailable: boolean;
}

export function makeDisplayData(
  ary: DateData[],
  { currentDay, isAvailable }: MakeDisplayDataParams
) {
  return ary
    .filter(v => filterCurrentDay(v, currentDay))
    .reduce(
      (acc, cur) => formatData(acc, cur, isAvailable),
      [] as DisplayData[]
    )
    .filter(filterValidDate);
}
