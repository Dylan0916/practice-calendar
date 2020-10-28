import styled from 'styled-components';

import { cyan, gray } from '../../../constants/colors';

interface ContainerProps {
  hasData: boolean;
}

interface TitleTextProps {
  hasData: boolean;
}

export default {
  Container: styled.div<ContainerProps>`
    flex: 1;
    margin: 0 5px;
    border-top: 4px solid;
    border-top-color: ${({ hasData }) => (hasData ? cyan : gray)};
    text-align: center;
  `,
  TitleBox: styled.div`
    padding: 10px 0;
  `,
  TitleText: styled.p<TitleTextProps>`
    color: ${({ hasData }) => (hasData ? 'inherit' : gray)};
  `,
};
