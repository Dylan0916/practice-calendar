import dayjs from 'dayjs';
import React, { useContext } from 'react';

import Context from '../../../context';
import S from './styles';

export default function CurrentTimeRange() {
  const { startTime, endTime } = useContext(Context);
  const start = dayjs(startTime).format('YYYY/MM/DD');
  const end = `${endTime.getDate()}`.padStart(2, '0');

  return (
    <S.CurrentTimeRange>
      {start} - {end}
    </S.CurrentTimeRange>
  );
}
