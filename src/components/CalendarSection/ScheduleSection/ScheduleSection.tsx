import React, { FC } from 'react';

import { DisplayData } from '../types';
import S from './styles';

interface Props {
  data: DisplayData[];
}

const ScheduleSection: FC<Props> = props => {
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

export default ScheduleSection;
