import i18n from 'i18next';

import enUS from './locales/en_US';
import zhTW from './locales/zh_TW';

const resources = {
  en: {
    translation: enUS,
  },
  zh: {
    translation: zhTW,
  },
};

export function init() {
  i18n.init({
    resources,
    lng: navigator.language,
    fallbackLng: 'en',
  });
}
