import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import MockDate from 'mockdate';
import React from 'react';

import Context from '../../../../context';
import CurrentTimeRange from '../CurrentTimeRange';

describe('CurrentTimeRange', () => {
  MockDate.set('2020-10-08');

  const createWrapper = (testProps = {}, testContextValue = {}) => {
    const props = { ...testProps };
    const mockValue = {
      apiNum: 0,
      startTime: dayjs().startOf('w').toDate(),
      endTime: dayjs().endOf('w').toDate(),
      onPrevClick: () => {},
      onNextClick: () => {},
      ...testContextValue,
    };

    return render(
      <Context.Provider value={mockValue}>
        <CurrentTimeRange {...props} />
      </Context.Provider>
    );
  };

  it('should render nice', () => {
    const { queryByText } = createWrapper();
    const expectedText = '2020/10/04 - 10';

    expect(queryByText(expectedText)).not.toBeNull();
  });
});
