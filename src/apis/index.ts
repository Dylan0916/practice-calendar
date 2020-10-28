import axios from 'axios';

import { getScheduleResponse } from '../types/getSchedule';
import { formatScheduleResponse } from './utils';

const apiList = [
  'https://run.mocky.io/v3/1f8f1b3a-bcce-41cf-9ecb-6581a3180d1f',
  'https://run.mocky.io/v3/7589ca14-bbbe-42c3-b9b6-0b7911222573',
  'https://run.mocky.io/v3/ac08c487-920f-468d-8e92-4cd77ae30b18',
];

export const getSchedule = (num: number) => {
  return axios.get<getScheduleResponse>(apiList[num], {
    responseType: 'json',
    transformResponse: (r: getScheduleResponse) => formatScheduleResponse(r),
  });
};
