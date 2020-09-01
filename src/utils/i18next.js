import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import getLocalesFromUrl from 'Utils/getLocalesFromUrl';

export const i18next = (url) => {
  const locale = getLocalesFromUrl(url);

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {},
        },
      },
      lng: locale,
      fallbackLng: locale,
      lowerCaseLng: true,
      nsSeparator: false,
      keySeparator: false,
      interpolation: {
        escapeValue: false
      },
    });

  return i18n;
};

export default i18next;
