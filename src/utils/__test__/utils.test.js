import extractErrorMessage from '../extractErrorMessage'
import '@testing-library/jest-dom'
import getProgressPercentage from '../getProgressPercentage'
import getMobileOperatingSystem from '../getMobileOperatingSystem'
import validateRetailersId from '../validateRetailersId'
import { detectLanguage } from '../intl'

describe('utils testing', () => {
  test('extractErrorMessage will find error in response to display', async () => {
    const input1 = { response: { data: { errors: 'One error text' } } }
    const input2 = {
      response: { data: { errors: ['One error text', 'One error text'] } },
    }
    const input3 = {
      response: { data: { message: 'Error message' } },
    }
    const input4 = {
      message: 'Error message',
    }

    expect(extractErrorMessage(input1)).toBe('One error text')
    expect(extractErrorMessage(input2)).toBe('One error text\nOne error text')
    expect(extractErrorMessage(input3)).toBe('Error message')
    expect(extractErrorMessage(input4)).toBe('Error message')
  })

  test('getProgressPercentage count percentage of progress for unlocking', async () => {
    expect(getProgressPercentage(5, 10)).toBe('50%')
    expect(getProgressPercentage(10, 5)).toBe('100%')
    expect(getProgressPercentage(7, 13)).toBe('53.84615384615385%')
    expect(getProgressPercentage(13, 7)).toBe('100%')
  })

  test('getMobileOperatingSystem correctly returns link for android and ios', async () => {
    const androidNavigator = {
      userAgent: 'android',
    }
    const iphoneNavigator = {
      userAgent: 'iPhone',
    }

    Object.defineProperty(global, 'navigator', {
      value: androidNavigator,
      writable: true,
    })
    expect(getMobileOperatingSystem()).toBe(
      process.env.REACT_APP_LINK_TO_GOOGLEPLAY,
    )

    Object.defineProperty(global, 'navigator', {
      value: iphoneNavigator,
      writable: true,
    })
    expect(getMobileOperatingSystem()).toBe(
      process.env.REACT_APP_LINK_TO_APPSTORE,
    )
  })

  test('validateRetailersId validates monoprix code', async () => {
    expect(validateRetailersId([1, 1, 1, 54, 9, 4, 1, 5, 94, 51])).toBe(true)
  })

  test('detectLanguage will return lang string', async () => {
    Object.defineProperty(global, 'navigator', {
      value: { language: 'English' },
      writable: true,
    })
    expect(detectLanguage()).toBe('en')

    Object.defineProperty(global, 'navigator', {
      value: { language: 'French' },
      writable: true,
    })
    expect(detectLanguage()).toBe('fr')
  })
})