# pick-by-lang

> Helper for transform object with i18n content

## Installation

```sh
yarn add pick-by-lang
```

Or, if you prefer `npm`:

```sh
npm i pick-by-lang
```

## Usage

### TL;DR

```js
import { pickByLang } from 'pick-by-lang'

const pickRu = pickByLang('ru')
const pickEn = pickByLang('en')

const content = {
  title: {
    en: 'Shop',
    ru: 'Магазин',
  }
})

console.log(pickRu(content)) // { title: 'Магазин' }
console.log(pickEn(content)) // { title: 'Shop' }
```

### Docs

`pickByLang` accept two parameters — `lang` and `content` for translate. If content does not provided, it return function with one argument.

Example:
```js
const content = {
  title: {
    en: 'Shop',
    ru: 'Магазин',
  }
})

// Simple usage
console.log(pickByLang('ru', content)) // { title: 'Магазин' }

// Curried usage
const pickRu = pickByLang('ru')
console.log(pickRu(content)) // { title: 'Магазин' }
```

Lib can handke objects with some rules:

1. Any field can contains some language variants. If field do not contain language variants, it will be provided as is.

Example:
```js
const content = {
  title: {
    en: 'Shop',
    ru: 'Магазин',
  },
  site: 'https://google.com'
}

console.log(pickByLang('en', content)) // { title: 'Shop', site: 'https://google.com' }
```

2. You can create fields only for specific languages and hide it for other.

Example: 
```js
const content = {
  name: {
    en: 'Igor',
    ru: 'Игорь',
  },
  slides: [
    {
      name: 'Hop-hey, only for ru',
      onlyFor: ['ru'],
    },
    {
      name: 'Text for any language',
    },
  ],
}

console.log(pickByLang('en', content)) // { name: 'Igor', slides: [{ name: 'Text for any language' }] }
console.log(pickByLang('ru', content)) // { name: 'Igor', slides: [{ name: 'Hop-hey, only for ru' }, { name: ''Text for any language' }] }
```

That's all. Enjoy!
