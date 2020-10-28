import { render } from '@testing-library/react';
import React from 'react';

import * as apis from '../../../apis';
import mockGetScheduleSuccess from '../../../apis/mocks/getSchedule.json';
import CalendarSection from '../CalendarSection';

describe('CalendarSection', () => {
  const createWrapper = (testProps = {}) => {
    const props = { ...testProps };

    return render(<CalendarSection {...props} />);
  };

  it('should call getSchedule api when component setup', () => {
    Object.defineProperty(apis, 'getSchedule', {
      value: jest.fn().mockResolvedValue({ data: mockGetScheduleSuccess }),
    });

    createWrapper();

    expect(apis.getSchedule).toBeCalled();
  });
});
