import dayjs from 'dayjs';
import React, { useContext } from 'react';

import Context from '../../../context';
import { Weeks } from '../../../types/commons';
import { DateData } from '../../../types/getSchedule';
import ScheduleSection from '../ScheduleSection';
import S from './styles';
import { makeDisplayData } from './utils';

interface Props {
  day: number;
  available: DateData[];
  booked: DateData[];
}

export default function ColumnSection(props: Props) {
  const { day, available, booked } = props;
  const { startTime } = useContext(Context);
  const currentDay = dayjs(startTime).set('d', day);
  const date = currentDay.date();
  const formatAvailable = makeDisplayData(available, {
    currentDay,
    isAvailable: true,
  });
  const formatBooked = makeDisplayData(booked, {
    currentDay,
    isAvailable: false,
  });
  const hasData = formatAvailable.length > 0;
  const displayData = hasData
    ? formatAvailable
        .concat(formatBooked)
        .sort((d1, d2) => (d1.value > d2.value ? 1 : -1))
    : [];

  return (
    <S.Container hasData={hasData} data-testid="container">
      <S.TitleBox>
        <S.TitleText hasData={hasData} data-testid="dayOfWeek">
          {Weeks[day]}
        </S.TitleText>
        <S.TitleText hasData={hasData} data-testid="dayText">
          {`${date}`.padStart(2, '0')}
        </S.TitleText>
      </S.TitleBox>
      <ScheduleSection data={displayData} />
    </S.Container>
  );
}
