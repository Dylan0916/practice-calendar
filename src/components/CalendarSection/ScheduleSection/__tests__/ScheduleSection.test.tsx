import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';

import ScheduleSection from '../ScheduleSection';

describe('ScheduleSection', () => {
  const defaultProps = {
    data: [
      {
        theDate: dayjs(),
        value: '15:00',
        isAvailable: true,
      },
      {
        theDate: dayjs(),
        value: '15:030',
        isAvailable: true,
      },
    ],
  };

  const createWrapper = (testProps = {}) => {
    const props = { ...defaultProps, ...testProps };

    return render(<ScheduleSection {...props} />);
  };

  it('should not render timeNum if props.data is empty array', () => {
    const { queryAllByTestId } = createWrapper({ data: [] });

    expect(queryAllByTestId('timeNum').length).toBe(0);
  });

  it('should render the correct amount of timeNum if props.data is not empty array', () => {
    const { queryAllByTestId } = createWrapper();

    expect(queryAllByTestId('timeNum').length).toBe(defaultProps.data.length);
  });
});
