import { createGlobalStyle } from 'styled-components';

import { textBlack } from '../../constants/colors';

export default createGlobalStyle`
  * {
    position: relative;
    box-sizing: border-box;
  };

  body {
    line-height: 1.5;
  }

  p, div, span, h1, h2, h3, h4, h5, h6{
    font-family: Helvetica Neue,Helvetica,Arial,PingFang HK,PingFang,Hiragino Sans GB,STHeiti,Microsoft JhengHei,sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, span, div {
    margin: 0;
    color: ${textBlack}
  }
`;
