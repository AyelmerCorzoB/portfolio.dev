import en from '../locales/en.json';
import es from '../locales/es.json';

type Translations = {
  [key: string]: string;
};

const translations: { [key: string]: Translations } = {
  en,
  es,
};

export function getTranslations(lang: string): Translations {
  return translations[lang] || translations['en']; 
}