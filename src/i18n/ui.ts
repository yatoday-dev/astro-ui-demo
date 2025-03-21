/**
 * An array of string constants representing supported locale keys.
 * These keys typically correspond to language codes used for
 * internationalization (i18n) within the application.
 * The available locale keys in this array are:
 * - "en" for English
 * - "es" for Spanish
 *
 * The `as const` assertion ensures the array elements are treated
 * as literal types, preventing modifications and providing stricter
 * type-checking in the codebase.
 */
export const localeKeys = ['en', 'es'] as const;
export type LocaleKeys = (typeof localeKeys)[number];

/**
 * A string variable representing the default locale for the application.
 * This variable is used to set the standard language and regional settings.
 * The initial value of 'ru' indicates Russian as the default locale.
 */
export const defaultLocale = 'en';

export const locales: Record<LocaleKeys, string> = {
  en: 'English',
  es: 'Español',
} as const;


import es from '/src/assets/icons/flag-icons/es.png';
import gb from '/src/assets/icons/flag-icons/gb.svg';
export const flagIcons = { en: gb, es: es };


/**
 * An object that provides localized UI text strings for different languages.
 * The object includes translations for Russian (ru), English (en), and Spanish (es).
 * Each key represents a specific UI text identifier, and the value corresponds to its localized text in the respective language.
 *
 * Properties:
 * - `en`: Contains English translations for various UI components and messages.
 * - `es`: Placeholder for Spanish translations, currently empty.
 */
export const ui = {
  en: {
    'comments': 'Comments',
    'answer': 'Reply',
    'share': 'Share',
    'blog.related.posts': 'Related Posts',
    'error': 'Error',
    '404.title': 'Error 404',
    '404.desc.1': "Sorry, we couldn't find this page.",
    '404.desc.2': "But dont worry, you can find plenty of other things on our homepage.",
    '404.desc.link': "Back to homepage",
    'number.of.images': '{{amount}} images',
    'join.us.title': 'Join {{name}} Business Network',
    'join.us.desc': 'The business club that offers you offers, inspiration and advice for your business.',
    'join.us.link': 'Discover all the advantages',
    'join.us.btn': 'Join or log in',
    'article': 'Article number',
    'cancel': 'Cancel',
    'settings.change.lang.title': 'Change region',
    'settings.change.region.title': "You're in the Alicante online store",
    'settings.change.region.desc': 'Your shopping bag will empty if you change to a different country/region.',
  },
  es: {},
} as const;
