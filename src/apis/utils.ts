import dayjs from 'dayjs';

import { DateData, getScheduleResponse } from '../types/getSchedule';

function handleFormat(acc: DateData[], cur: DateData) {
  const { start, end } = cur;
  const endOf = dayjs(start).endOf('d');

  if (dayjs(end) > endOf) {
    return acc.concat(
      {
        start,
        end: endOf.toDate(),
      },
      {
        start: dayjs(start).startOf('d').add(1, 'd').toDate(),
        end,
      }
    );
  } else {
    return acc.concat(cur);
  }
}

export function formatScheduleResponse(resp: getScheduleResponse) {
  if (!resp) {
    return { available: [], booked: [] };
  }

  const { available, booked } = resp;
  const newAvailable = available.reduce(handleFormat, [] as DateData[]);
  const newBooked = booked.reduce(handleFormat, [] as DateData[]);

  return { available: newAvailable, booked: newBooked };
}
