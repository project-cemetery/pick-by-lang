import { pickByLang } from '../pickByLang'

describe('pickByLang', () => {
  test('pass data as is if lang not specified', () => {
    const data = {
      name: 'Igor',
    }

    expect(pickByLang('en')(data)).toEqual(data)
  })

  test('pick lang data in complex object with one key', () => {
    const data = {
      ru: {
        name: 'Игорь',
      },
      en: {
        name: 'Igor',
      },
    }

    expect(pickByLang('ru')(data)).toEqual({
      name: 'Игорь',
    })
  })

  test('pick lang data in flat object with one key', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
    }

    expect(pickByLang('ru')(data)).toEqual({
      name: 'Игорь',
    })
  })

  test('pick lang data in flat object with many keys', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
      surname: {
        en: 'Kamyshev',
        ru: 'Камышев',
      },
    }

    expect(pickByLang('ru')(data)).toEqual({
      name: 'Игорь',
      surname: 'Камышев',
    })
  })

  test('pick lang data in deep object', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
      data: {
        description: {
          en: 'Human',
          ru: 'Человек',
        },
      },
    }

    expect(pickByLang('ru')(data)).toEqual({
      name: 'Игорь',
      data: {
        description: 'Человек',
      },
    })
  })

  test('pick lang data in object with normal keys', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
      data: {
        description: 'Lang insensitive',
      },
    }

    expect(pickByLang('ru')(data)).toEqual({
      name: 'Игорь',
      data: {
        description: 'Lang insensitive',
      },
    })
  })

  test('pick lang data in object with array', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
      slides: ['Lang insensitive 1', 'Lang insensitive 2'],
    }

    expect(pickByLang('ru')(data)).toEqual({
      name: 'Игорь',
      slides: ['Lang insensitive 1', 'Lang insensitive 2'],
    })
  })

  test('remove inappropriate elements from arrays', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
      slides: [
        {
          name: 'Lang insensitive 1',
          onlyFor: ['ru'],
        },
        {
          name: 'Lang insensitive 2',
        },
      ],
    }

    expect(pickByLang('en')(data)).toEqual({
      name: 'Igor',
      slides: [
        {
          name: 'Lang insensitive 2',
        },
      ],
    })
  })

  test('pick lang data in not curried mode', () => {
    const data = {
      name: {
        en: 'Igor',
        ru: 'Игорь',
      },
      slides: ['Lang insensitive 1', 'Lang insensitive 2'],
    }

    expect(pickByLang('ru', data)).toEqual({
      name: 'Игорь',
      slides: ['Lang insensitive 1', 'Lang insensitive 2'],
    })
  })
})
