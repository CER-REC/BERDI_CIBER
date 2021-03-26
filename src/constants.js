export const applicationPath = {
  en: 'esa',
  fr: 'ees',
};

export const lang = (typeof document !== 'undefined'
    && document.location
    && document.location.href
    && document.location.href.includes(applicationPath.fr))
  || (process.env.NODE_ENV === 'development'
    && typeof window !== 'undefined'
    && window.localStorage
    && window.localStorage.getItem('dev-lang') === 'fr')
  ? 'fr' : 'en';

export const API_HOST = process.env.API_HOST || '';

export const RESULT_COUNT = 10;

export const mockFileSize = lang === 'en' ? 67.8 : 71.2;
export const mockCSVCount = 26665;
export const mockPDFCount = 15151;
