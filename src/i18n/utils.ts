import { ui, defaultLocale } from './ui';

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLocale;
}

/**
 * @example
 * const lang = (Astro.currentLocale || defaultLocale) as keyof typeof ui;
 * const t = useTranslations(lang);
 *
 * @param {keyof typeof ui} lang - The language key for which translations are requested.
 * @return {Function} A function that takes a translation key and optional variables, and returns the translated string.
 */
export function useTranslations(lang: keyof typeof ui): Function {
  return function t(key: keyof (typeof ui)[typeof defaultLocale], vars: { [key: string]: string } = {}) {
    return translate(lang, key, vars);
  };
}

/**
 * Translates a given key into the specified language, optionally incorporating variables into the translation string.
 * @example
 * import { t } from '~/lib';
 * {@html $t("homepage.welcome", { name: "Jane Doe" })}
 * {$t("homepage.title")}
 *
 * @param {keyof typeof ui} lang - The target language for the translation.
 * @param {keyof (typeof ui)[typeof defaultLocale]} key - The key identifying the translation string.
 * @param {{[key: string]: string}} [vars={}] - An object containing variables to be substituted in the translation string.
 * @return {string} The translated string with variables replaced, or the default locale translation if the key is missing.
 */
export function translate(
  lang: keyof typeof ui,
  key: keyof (typeof ui)[typeof defaultLocale],
  vars: {
    [key: string]: string;
  } = {}
): string {
  let text = ui[lang][key] || ui[defaultLocale][key];

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}
