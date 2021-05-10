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

## Switch theme

To be able to switch between one and another, use "classed" themes when importing, and switch with the helper:

```js
import { switchTheme } from '@onfido/castor-tokens';

// switch to "day" theme
import '@onfido/castor-tokens/dist/day-class.css';
switchTheme('day');

// OR to "night" theme
import '@onfido/castor-tokens/dist/night-class.css';
switchTheme('night');
```

You can also include class themes within your Sass file instead:

```scss
@use '~@onfido/castor-tokens' as theme;

@include theme.day('class');
@include theme.night('class');
```

These themes are not applied to the root element but instead theme variables are scoped to CSS classes, which are then applied to the body element.

If you're using CSS modules, you must use a global scope when including class themes. For example, for [PostCSS](https://postcss.org/):

```scss
:global {
  @include theme.day('class');
  @include theme.night('class');
}
```

You can also switch a theme on any selectable elements, for example switching on a section using the custom theme:

```scss
.castor-theme--custom {
  // ...theme CSS variables
}
```

```js
switchTheme('custom', document.querySelector('.section'));
```

If you do not use JavaScript, you might consider including a different CSS theme file based on URL parameter.

Lastly, if you're extremely concerned about efficiency, you can shave off 1-3 KBs by not including base tokens twice, if they're shared between the themes you're switching:

```scss
@use '~@onfido/castor-tokens' as castor;

:root {
  @include castor.tokens();
}

@include castor.day('class', 'raw');
@include castor.night('class', 'raw');
```
