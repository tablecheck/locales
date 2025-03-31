# TableCheck Locales

TableCheck's shared locale definition files and functions

## Development setup

#### Prerequisites

- Install [nvm](https://github.com/nvm-sh/nvm)
- Install [bun](https://bun.sh) (needed for translation checks)

#### Installation

```shell
npm ci --legacy-peer-deps
```

## Development Workflow

### Translation Checks

This repository includes automated checks to ensure all locale files have complete translations.

To manually check if all locales have complete translations:

```shell
npm run check-translations
```

This check will also run during CI/CD workflows and fail if any translations are missing.

When adding a new locale, ensure it includes translations for all existing locale codes. Similarly, when adding a new locale code to an existing locale, add translations for it to all other locale files.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/SimeonC"><img src="https://avatars.githubusercontent.com/u/1085899?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Simeon Cheeseman</b></sub></a><br /><a href="https://github.com/tablecheck/@tablecheck/locales/commits?author=SimeonC" title="Documentation">📖</a> <a href="#infra-SimeonC" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/tablecheck/@tablecheck/locales/commits?author=SimeonC" title="Code">💻</a> <a href="https://github.com/tablecheck/@tablecheck/locales/commits?author=SimeonC" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
