import { supportedLanguages } from '../../i18n';
import { whitelist } from './whitelist';

type Code = 'en' | 'es' | 'pt-br';

export const codeToLanguage = (code: Code) =>
  supportedLanguages[code].replace(/ /g, ' ' /* nbsp */);

export const loadFontsForCode = (code: Code) => {
  switch (code) {
    case 'es':
    case 'pt-br':
      import('../fonts/fonts-shared.latin-ext.css');
      import('../fonts/fonts-post.latin-ext.css');
      break;
    default:
      break;
  }
};

// TODO: the curried signature is weird.
export const createLanguageLink = (slug: string, lang: string) => {
  const rawSlug = slug.replace(`${lang}/`, '');

  return (targetLang: string) =>
    targetLang === 'pt-br' ? rawSlug : `${targetLang}${rawSlug}`;
};

export const replaceAnchorLinksByLanguage = (html: string, code: Code) => {
  // Match any link using https://regexr.com/4airl
  const matches = html.match(/https?:\/\/(www)?[^\/\s)"?]+/gm);

  // Return same html if no matches were found
  // or code isn't supported
  if (!matches || !supportedLanguages[code]) {
    return html;
  }

  matches.forEach((url: string) => {
    // Replace to locale url if and only if exists in whitelist
    // and has code registered
    if (whitelist[url] && whitelist[url][code]) {
      html = html.replace(url, whitelist[url][code]);
    }
  });

  return html;
};
