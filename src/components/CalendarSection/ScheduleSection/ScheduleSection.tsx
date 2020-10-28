import React from 'react';

import { DisplayData } from '../types';
import S from './styles';

interface Props {
  data: DisplayData[];
}

export default function ScheduleSection(props: Props) {
  const { data } = props;

  return (
    <S.Container data-testid="scheduleSection">
      {data.map(datum => (
        <S.TimeNum
          isAvailable={datum.isAvailable}
          key={datum.value}
          data-testid="timeNum"
        >
          {datum.value}
        </S.TimeNum>
      ))}
    </S.Container>
  );
}
