import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import MockDate from 'mockdate';
import React from 'react';

import Context from '../../../../context';
import { Weeks } from '../../../../types/commons';
import ColumnSection from '../ColumnSection';

describe('ColumnSection', () => {
  const mockDateData = {
    start: new Date(),
    end: new Date(),
  };
  const defaultProps = {
    day: 0,
    available: [mockDateData],
    booked: [mockDateData],
  };

  const createWrapper = (testProps = {}, testContextValue = {}) => {
    const props = { ...defaultProps, ...testProps };
    const mockValue = {
      apiNum: 0,
      startTime: new Date(),
      endTime: new Date(),
      onPrevClick: () => {},
      onNextClick: () => {},
      ...testContextValue,
    };

    return render(
      <Context.Provider value={mockValue}>
        <ColumnSection {...props} />
      </Context.Provider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render day of week correctly', () => {
    const expected = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expected.forEach((day, index) => {
      const { getByText } = createWrapper({ day: index });

      expect(getByText(day)).not.toBeNull();
    });
  });

  it('should render day correctly', () => {
    const mockContextValue = { startTime: new Date('2020-10-13') };
    const mockProps = { day: Weeks.Mon };
    const { getByText } = createWrapper(mockProps, mockContextValue);

    expect(getByText('12')).not.toBeNull();
  });

  describe('display data', () => {
    it('should not show any timeNum if available is empty', () => {
      const { queryAllByTestId } = createWrapper({
        available: [],
        booked: [mockDateData, mockDateData],
      });

      expect(queryAllByTestId('timeNum').length).toBe(0);
    });

    it('should not show any timeNum if available is all expired', () => {
      const mockAvailable = [
        {
          start: new Date('2020-01-02 13:00'),
          end: new Date('2020-01-02 14:00'),
        },
        {
          start: new Date('2020-01-02 15:00'),
          end: new Date('2020-01-02 16:00'),
        },
      ];
      const { queryAllByTestId } = createWrapper({
        available: mockAvailable,
        booked: [mockDateData, mockDateData],
      });

      expect(queryAllByTestId('timeNum').length).toBe(0);
    });

    it('should render timeNum correctly', () => {
      MockDate.set('2020-10-18');

      const mockStartTime = dayjs().startOf('d').toDate();
      const mockEndTime = dayjs().startOf('w').toDate();
      const mockAvailable = [
        {
          start: new Date('2020-10-19 08:00'),
          end: new Date('2020-10-19 09:00'),
        },
        {
          start: new Date('2020-10-19 15:00'),
          end: new Date('2020-10-19 16:00'),
        },
      ];
      const mockBooked = [
        {
          start: new Date('2020-10-19 10:00'),
          end: new Date('2020-10-19 11:00'),
        },
        {
          start: new Date('2020-10-19 16:30'),
          end: new Date('2020-10-19 17:30'),
        },
      ];
      const mockContextValue = {
        startTime: mockStartTime,
        endTime: mockEndTime,
      };
      const mockProps = {
        day: 1,
        available: mockAvailable,
        booked: mockBooked,
      };
      const { queryAllByTestId } = createWrapper(mockProps, mockContextValue);
      const expected = [
        '08:00',
        '08:30',
        '10:00',
        '10:30',
        '15:00',
        '15:30',
        '16:30',
        '17:00',
      ];

      expected.forEach((datum, index) => {
        expect(queryAllByTestId('timeNum')[index].innerHTML).toBe(datum);
      });
    });
  });
});
