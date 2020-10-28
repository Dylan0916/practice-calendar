import MockDate from 'mockdate';

import * as timeHelpers from '../timeHelpers';

describe('timeHelpers', () => {
  describe('getTime', () => {
    MockDate.set('2020-10-19');

    it('should return the value correctly', () => {
      expect(timeHelpers.getTime(new Date())).toEqual({
        startTime: new Date('2020-10-18'),
        endTime: new Date('2020-10-24'),
      });
    });
  });
});
