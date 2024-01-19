import React, { useContext, useEffect, useState } from 'react';

import { getSchedule } from '../../apis';
import Context from '../../context';
import { GetScheduleResponse } from '../../types/getSchedule';
import ColumnSection from './ColumnSection';
import S from './styles';

export default function CalendarSection() {
  const weeks = Array.from({ length: 7 }, (_, index) => index);
  const { apiNum } = useContext(Context);
  const [response, setResponse] = useState<GetScheduleResponse>({
    available: [],
    booked: [],
  });

  useEffect(() => {
    getSchedule(apiNum).then(resp => {
      const { available = [], booked = [] } = resp.data;

      setResponse({ available, booked });
    });
  }, [apiNum]);

  return (
    <S.Container>
      {weeks.map(n => (
        <ColumnSection
          key={n}
          day={n}
          available={response.available}
          booked={response.booked}
        />
      ))}
    </S.Container>
  );
}
