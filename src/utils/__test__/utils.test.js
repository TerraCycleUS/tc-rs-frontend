import extractErrorMessage from '../extractErrorMessage'
import '@testing-library/jest-dom'
import getProgressPercentage from '../getProgressPercentage'
import getMobileOperatingSystem from '../getMobileOperatingSystem'

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
    expect(getMobileOperatingSystem(5, 10)).toBe(
      process.env.REACT_APP_LINK_TO_GOOGLEPLAY,
    )

    Object.defineProperty(global, 'navigator', {
      value: iphoneNavigator,
      writable: true,
    })
    expect(getMobileOperatingSystem(5, 10)).toBe(
      process.env.REACT_APP_LINK_TO_APPSTORE,
    )
  })
})
