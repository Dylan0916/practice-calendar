import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import GlobalStyle from './components/GlobalStyle';
import { init as initI18n } from './i18n';

initI18n();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
