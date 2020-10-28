import styled, { css } from 'styled-components';

import { cyan, white } from '../../constants/colors';

const BTN_DISABLED_COLOR = '#ebeef5';
const BTN_TEXT_DISABLED_COLOR = '#c0c4cc';

const arrowBtnStyle = css<ButtonProps>`
  padding: 6px 16px;
  border-radius: 3px;
  color: ${({ isDisabled }) =>
    isDisabled ? BTN_TEXT_DISABLED_COLOR : '#606266'};
  background-color: ${white};
  outline: none;
  border: 1px solid
    ${({ isDisabled }) => (isDisabled ? BTN_DISABLED_COLOR : '#dcdfe6')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  &:hover {
    color: ${({ isDisabled }) => (isDisabled ? BTN_TEXT_DISABLED_COLOR : cyan)};
    border-color: ${({ isDisabled }) =>
      isDisabled ? BTN_DISABLED_COLOR : `${cyan}f2`};
  }
`;

interface ButtonProps {
  isDisabled: boolean;
}

export default {
  Container: styled.div`
    overflow: hidden;
  `,
  ActionsSection: styled.div`
    display: inline-block;
  `,
  PrevButton: styled.button<ButtonProps>`
    margin-right: -1px;
    ${arrowBtnStyle};
  `,
  NextButton: styled.button<ButtonProps>`
    ${arrowBtnStyle};
  `,
  CurrentTimeRange: styled.span`
    display: inline-block;
    padding-left: 15px;
  `,
  TimeZoneDesc: styled.span`
    float: right;
    font-size: 12px;
    line-height: 25px;
  `,
};
