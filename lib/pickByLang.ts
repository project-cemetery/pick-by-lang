import isPlainObject from 'lodash.isplainobject'
import mapValues from 'lodash.mapvalues'

import { isEmpty } from './helpers/isEmpty'
import { isString } from './helpers/isString'

export const pickByLang = (lang: string, content?: any) => {
  const checkString = (v: any) => isString(v) && v === lang
  const checkArray = (v: any) => Array.isArray(v) && v.includes(lang)

  const transformArray = (arr: any[]) =>
    arr
      .filter(
        ({ onlyFor }) =>
          isEmpty(onlyFor) || checkString(onlyFor) || checkArray(onlyFor),
      )
      .map(pick) // eslint-disable-line no-use-before-define

  const pick = (data: any) => {
    if (Array.isArray(data)) {
      return transformArray(data)
    }

    if (!isPlainObject(data)) {
      return data
    }

    if (Object.keys(data).includes(lang)) {
      return data[lang]
    }

    return mapValues(data, pick)
  }

  if (!content) {
    return pick
  }

  return pick(content)
}
