import { fireEvent, render } from '@testing-library/react';
import MockDate from 'mockdate';
import React from 'react';

import Context from '../../../context';
import FilterSection, { MAX_DATE } from '../FilterSection';

describe('FilterSection', () => {
  MockDate.set('2020-10-08');

  const mockOnPrevClick = jest.fn();
  const mockOnNextClick = jest.fn();

  const createWrapper = (testProps = {}, testContextValue = {}) => {
    const props = { ...testProps };
    const mockValue = {
      apiNum: 0,
      startTime: new Date('2020-10-11'),
      endTime: new Date('2020-10-17'),
      onPrevClick: mockOnPrevClick,
      onNextClick: mockOnNextClick,
      ...testContextValue,
    };

    return render(
      <Context.Provider value={mockValue}>
        <FilterSection {...props} />
      </Context.Provider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('prev button', () => {
    it('should call onPrevClick when pressed the prevBtn', () => {
      const { getByTestId } = createWrapper();
      const theBtn = getByTestId('prevBtn');

      expect(mockOnPrevClick).not.toBeCalled();

      fireEvent.click(theBtn);

      expect(mockOnPrevClick).toBeCalled();
    });

    it('should not call onPrevClick when pressed the prevBtn but it is disabled', () => {
      const { getByTestId } = createWrapper({}, { startTime: new Date() });
      const theBtn = getByTestId('prevBtn');

      expect(mockOnPrevClick).not.toBeCalled();

      fireEvent.click(theBtn);

      expect(mockOnPrevClick).not.toBeCalled();
    });
  });

  describe('next button', () => {
    it('should call onNextClick when pressed the nextBtn', () => {
      const { getByTestId } = createWrapper();
      const theBtn = getByTestId('nextBtn');

      expect(mockOnNextClick).not.toBeCalled();

      fireEvent.click(theBtn);

      expect(mockOnNextClick).toBeCalled();
    });

    it('should not call onNextClick when pressed the nextBtn but it is disabled', () => {
      const { getByTestId } = createWrapper(
        {},
        { endTime: new Date(MAX_DATE) }
      );
      const theBtn = getByTestId('nextBtn');

      expect(mockOnNextClick).not.toBeCalled();

      fireEvent.click(theBtn);

      expect(mockOnNextClick).not.toBeCalled();
    });
  });
});
