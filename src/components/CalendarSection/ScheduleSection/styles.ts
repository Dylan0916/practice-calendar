import styled from 'styled-components';

import { timeAvailable, timeBooked } from '../../../constants/colors';

interface TimeNumProps {
  isAvailable: boolean;
}

export default {
  Container: styled.div``,
  TimeNum: styled.p<TimeNumProps>`
    color: ${({ isAvailable }) => (isAvailable ? timeAvailable : timeBooked)};
    font-weight: 700;
    padding: 3px 0;
    border: 1px solid transparent;
    font-size: 0.75rem;
  `,
};
