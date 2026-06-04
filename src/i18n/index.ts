import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en.json';

const i18n = new I18n({
  en,
});

const locales = Localization.getLocales();

i18n.locale = locales[0]?.languageTag ?? 'en';
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n;
