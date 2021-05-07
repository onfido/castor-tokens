# Castor Tokens

[![npm version](https://badgen.net/npm/v/@onfido/castor-tokens)](https://www.npmjs.com/package/@onfido/castor-tokens)
[![Bundle size](https://badgen.net/bundlephobia/minzip/@onfido/castor-tokens)](https://bundlephobia.com/result?p=@onfido/castor-tokens)

This is _Castor_ addition providing design tokens, including (CSS/Sass) themes.

## Get started

Install package:

    npm install @onfido/castor-tokens

Then add a theme by following either approach from examples below.

### Setup using CSS

In order to use a theme with plain HTML + CSS, you must make the source available to public, and include it.

For example, if you serve your app from "public" directory, you can copy `day.css` and/or `night.css` files from `node_modules/@onfido/castor-tokens/dist` to `public` (or your root assets folder), then choose and include _one_ theme in your HTML file from the following options:

```html
<link rel="stylesheet" href="./day.css" />
<link rel="stylesheet" href="./night.css" />
```

### Setup using Sass

`@use` Castor Tokens within your main Sass file:

```scss
@use '~@onfido/castor-tokens' as theme;
```

One time only, choose and include _one_ theme within your root element from the following options:

```scss
:root {
  // "day" theme
  @include theme.day();

  // OR "night" theme
  @include theme.night();
}
```

### Setup using CSS-in-JS (for example Emotion)

Choose and import _one_ theme from the following options in your root JS file:

```js
import '@onfido/castor-tokens/dist/day.css';
import '@onfido/castor-tokens/dist/night.css';
```
