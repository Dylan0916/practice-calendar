import dayjs from 'dayjs';
import i18n from 'i18next';
import React, { useState } from 'react';

import Context from '../../context';
import { getTime } from '../../utils/timeHelpers';
import CalendarSection from '../CalendarSection';
import FilterSection from '../FilterSection';
import S from './styles';

const ONE_WEEK = 7;

function App() {
  const [time, setTime] = useState(getTime(new Date()));
  const [apiNum, setApiNum] = useState(0);

  const onPrevClick = () => {
    const newDate = dayjs(time.startTime).subtract(ONE_WEEK, 'd').toDate();

    setTime(getTime(newDate));
    setApiNum(preNum => preNum - 1);
  };

  const onNextClick = () => {
    const newDate = dayjs(time.startTime).add(ONE_WEEK, 'd').toDate();

    setTime(getTime(newDate));
    setApiNum(preNum => preNum + 1);
  };

  const value = {
    apiNum,
    startTime: time.startTime,
    endTime: time.endTime,
    onPrevClick,
    onNextClick,
  };

  return (
    <Context.Provider value={value}>
      <S.Container>
        <S.Title>{i18n.t('schedule-title')}</S.Title>
        <FilterSection />
        <CalendarSection />
      </S.Container>
    </Context.Provider>
  );
}

export default App;
