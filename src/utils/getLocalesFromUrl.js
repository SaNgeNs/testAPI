import localeRegexp from 'Utils/localeRegexp';

export const getLocaleFromUrl = (location) => {
  const localeReg = new RegExp(`/(${localeRegexp})/`, 'i');
  const localeFromUrl = (location.match(localeReg) && location.match(localeReg)[0].replace(/\//g, '')) || 'en';

  return localeFromUrl;
};

export default getLocaleFromUrl;
