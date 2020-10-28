import dayjs from 'dayjs';
import MockDate from 'mockdate';

import { DisplayData } from '../../types';
import * as utils from '../utils';

describe('utils', () => {
  MockDate.set('2020-10-18');

  describe('filterCurrentDay', () => {
    it('should return false if the start time is in the past', () => {
      const mockDateData = {
        start: new Date('2020-10-17 05:00'),
        end: new Date('2020-10-17 06:00'),
      };
      const mockCurrentDay = dayjs();

      expect(utils.filterCurrentDay(mockDateData, mockCurrentDay)).toBeFalsy();
    });

    it('should return false if the start time is in the future', () => {
      const mockDateData = {
        start: new Date('2020-10-19 05:00'),
        end: new Date('2020-10-19 06:00'),
      };
      const mockCurrentDay = dayjs();

      expect(utils.filterCurrentDay(mockDateData, mockCurrentDay)).toBeFalsy();
    });

    it('should return true if the start time is currently', () => {
      const mockDateData = {
        start: new Date(),
        end: new Date('2020-10-19 06:00'),
      };
      const mockCurrentDay = dayjs();

      expect(utils.filterCurrentDay(mockDateData, mockCurrentDay)).toBeTruthy();
    });
  });

  describe('formatData', () => {
    it('should return array correctly', () => {
      const mockDisplayData = [] as DisplayData[];
      const mockDateData = {
        start: new Date('2020-10-19 05:00'),
        end: new Date('2020-10-19 06:00'),
      };
      const mockIsAvailable = true;
      const expected = [
        {
          theDate: dayjs('2020-10-19 05:00'),
          value: '05:00',
          isAvailable: mockIsAvailable,
        },
        {
          theDate: dayjs('2020-10-19 05:30'),
          value: '05:30',
          isAvailable: mockIsAvailable,
        },
      ];

      utils
        .formatData(mockDisplayData, mockDateData, mockIsAvailable)
        .forEach((datum, index) => {
          expect(datum).toEqual(expected[index]);
        });
    });
  });

  describe('filterValidDate', () => {
    it('should return true if the date is currently', () => {
      const mockDisplayData = {
        theDate: dayjs(),
        value: '',
        isAvailable: true,
      };

      expect(utils.filterValidDate(mockDisplayData)).toBeTruthy();
    });

    it('should return true if the date is in the future', () => {
      const mockDisplayData = {
        theDate: dayjs('2020-10-19'),
        value: '',
        isAvailable: true,
      };

      expect(utils.filterValidDate(mockDisplayData)).toBeTruthy();
    });

    it('should return false if the date is in the past', () => {
      const mockDisplayData = {
        theDate: dayjs('2020-10-17'),
        value: '',
        isAvailable: true,
      };

      expect(utils.filterValidDate(mockDisplayData)).toBeFalsy();
    });
  });

  describe('makeDisplayData', () => {
    it('should return array correctly', () => {
      const mockDateData = [
        {
          start: new Date('2020-10-17 13:00'),
          end: new Date('2020-10-17 14:00'),
        },
        {
          start: new Date('2020-10-18 15:00'),
          end: new Date('2020-10-18 16:00'),
        },
      ];
      const mockOtherParams = {
        currentDay: dayjs(),
        isAvailable: true,
      };
      const expected = ['15:00', '15:30'];

      utils
        .makeDisplayData(mockDateData, mockOtherParams)
        .forEach((datum, index) => {
          expect(datum.value).toBe(expected[index]);
        });
    });

    it('should return empty array if start time is all in the past', () => {
      const mockDateData = [
        {
          start: new Date('2020-10-17 13:00'),
          end: new Date('2020-10-17 14:00'),
        },
        {
          start: new Date('2020-10-17 15:00'),
          end: new Date('2020-10-17 16:00'),
        },
      ];
      const mockOtherParams = {
        currentDay: dayjs(),
        isAvailable: true,
      };

      expect(utils.makeDisplayData(mockDateData, mockOtherParams)).toEqual([]);
    });

    it('should return empty array if start time is all in the future', () => {
      const mockDateData = [
        {
          start: new Date('2020-10-19 13:00'),
          end: new Date('2020-10-19 14:00'),
        },
        {
          start: new Date('2020-10-19 15:00'),
          end: new Date('2020-10-19 16:00'),
        },
      ];
      const mockOtherParams = {
        currentDay: dayjs(),
        isAvailable: true,
      };

      expect(utils.makeDisplayData(mockDateData, mockOtherParams)).toEqual([]);
    });
  });
});
