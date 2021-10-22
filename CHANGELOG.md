# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-beta.5](https://github.com/onfido/castor-tokens/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2021-10-21)

### ⚠ BREAKING CHANGES

- neutral-700 to neutral-200 have been renamed one digit down

* neutral-700 has been introduced as a new token in place of the old one

Affected users:
Only those using palette tokens, theme token users are unaffected

Migration path:

1. search neutral-700 to neutral-200 and replace with one digit lower

- e.g. `neutral-700` -> `neutral-600`

2. (optional) visually review all `neutral-600` and `neutral-800`

- potentially use `neutral-700` instead

### Features

- introduce new color-neutral token ([#245](https://github.com/onfido/castor-tokens/issues/245)) ([011a866](https://github.com/onfido/castor-tokens/commit/011a866a963feedb80553c707a9200349f7d1918))
- update night theme's background-action-subtle opacity ([#243](https://github.com/onfido/castor-tokens/issues/243)) ([ba23a48](https://github.com/onfido/castor-tokens/commit/ba23a4886e5803e0d4917d7c0a8b7a902dfcad7d))
- **android:** exclude base tokens from "night" mode values ([#95](https://github.com/onfido/castor-tokens/issues/95)) ([20e0377](https://github.com/onfido/castor-tokens/commit/20e037751ab58452f526749003f32cd89e2e093b))

## [1.0.0-beta.4](https://github.com/onfido/castor-tokens/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2021-06-10)

### Features

- **android:** add initial implementation ([#58](https://github.com/onfido/castor-tokens/issues/58)) ([654b663](https://github.com/onfido/castor-tokens/commit/654b663fd147effd810a8cc7084cf9d0ff09b2b5))
- add progress (content, background) colors ([#69](https://github.com/onfido/castor-tokens/issues/69)) ([90145d8](https://github.com/onfido/castor-tokens/commit/90145d8ee4fec5d4725273b4a94057aa8b8ced05))

## [1.0.0-beta.3](https://github.com/onfido/castor-tokens/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-05-18)

### Features

- **npm:** add types and sass variables ([#22](https://github.com/onfido/castor-tokens/issues/22)) ([3f6ea6e](https://github.com/onfido/castor-tokens/commit/3f6ea6e58ebeebed2ce450012d568482806e4beb))

## [1.0.0-beta.2](https://github.com/onfido/castor-tokens/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-05-10)

### Features

- **npm:** add theme switcher ([#9](https://github.com/onfido/castor-tokens/issues/9)) ([74516df](https://github.com/onfido/castor-tokens/commit/74516df90b857e1a65bc1be9d9a67204879831fe))

## 1.0.0-beta.1 (2021-05-07)

Initial release.
