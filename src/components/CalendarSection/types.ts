import dayjs from 'dayjs';

export interface DisplayData {
  theDate: dayjs.Dayjs;
  value: string;
  isAvailable: boolean;
}
