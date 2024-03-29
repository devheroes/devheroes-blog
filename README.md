# [devheroes.io](https://devheroes.io/)

DevHeroes blog.

Forked from [overreacted.io](https://github.com/gaearon/overreacted.io). Syntax theme based on [Sarah Drasner's Night Owl](https://github.com/sdras/night-owl-vscode-theme/) with small tweaks.

To run locally, `yarn`, then `yarn start`, then open https://localhost:8000.

## Contributing Translations

The main language is pt-br (Português do Brasil). You can translate any article on the website into your language!

Add a Markdown file with the translation to the corresponding article folder. For example `index.fr.md` in `src/pages/optimized-for-change/`.

If you're the first one to translate a post to your language, you'll need to add it to to the list in `./i18n.js`. If your language needs special font characters, add it to the appropriate place in [this list](https://github.com/devheroes/devheroes-blog/blob/26c04de5940ac92a36bc6b9ebedc0cca79191116/src/utils/i18n.js#L16).

**Please don't send translations for the English language — I will be translating into it myself when I find time.**
