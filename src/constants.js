export const applicationPath = {
  en: 'berdi',
  fr: 'ciber',
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

export const ENV_SOCIO_GRADIENT_ID = 'environmentalSocioEconomicGradient';

export const NEB_ACT_CUTOFF_DATE = new Date('2019-08-28');

export const socioEconomicTopics = [
  'infrastructure',
  'job',
  'proximity',
  'human',
  'boat',
  'heritage',
  'social',
  'indigenous',
  'treaty',
];

export const environmentalTopics = [
  'landscape',
  'soil',
  'wetland',
  'water',
  'fish',
  'plant',
  'wildlife',
  'species',
  'noise',
  'gas',
  'air',
  'electricity',
  'environmental',
];
