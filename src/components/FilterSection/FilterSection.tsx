import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import i18n from 'i18next';
import React, { useContext } from 'react';

import Context from '../../context';
import CurrentTimeRange from './CurrentTimeRange';
import S from './styles';

export const MAX_DATE = '2020-11-07';

export default function FilterSection() {
  const { startTime, endTime, onPrevClick, onNextClick } = useContext(Context);
  const start = dayjs().startOf('w');
  const isDisabledPrevBtn = +dayjs(startTime).startOf('w') <= +start;
  const isDisabledNextBtn = +dayjs(endTime).startOf('d') >= +dayjs(MAX_DATE);

  const _onPrevClick = () => {
    if (isDisabledPrevBtn) {
      return;
    }

    onPrevClick();
  };

  const _onNextClick = () => {
    if (isDisabledNextBtn) {
      return;
    }

    onNextClick();
  };

  const renderTimeZoneDesc = () => {
    const timeZoneSplit = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split('/');
    const city = timeZoneSplit[timeZoneSplit.length - 1];
    const timeZoneOffset = dayjs().format('Z');

    return (
      <S.TimeZoneDesc>
        {i18n.t('time-zone-desc', {
          timeZone: `${city} (GMT${timeZoneOffset})`,
        })}
      </S.TimeZoneDesc>
    );
  };

  return (
    <S.Container>
      <S.ActionsSection>
        <S.PrevButton
          data-testid="prevBtn"
          isDisabled={isDisabledPrevBtn}
          onClick={_onPrevClick}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </S.PrevButton>
        <S.NextButton
          data-testid="nextBtn"
          isDisabled={isDisabledNextBtn}
          onClick={_onNextClick}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </S.NextButton>
      </S.ActionsSection>
      <CurrentTimeRange />
      {renderTimeZoneDesc()}
    </S.Container>
  );
}
