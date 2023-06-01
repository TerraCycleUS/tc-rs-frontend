import React from 'react'
import { screen, render, act } from '@testing-library/react'
import extractErrorMessage from '../extractErrorMessage'
import '@testing-library/jest-dom'
import getProgressPercentage from '../getProgressPercentage'
import getMobileOperatingSystem from '../getMobileOperatingSystem'
import validateRetailersId from '../validateRetailersId'
import { detectLanguage } from '../intl'
import useApiCall from '../useApiCall'
import MockComponent from '../../components/ForTestWriting/MockComponent'
import UseApiEnv from '../../components/ForTestWriting/UseApiEnv'

jest.mock('../../store', () => ({
  dispatch: () => {},
  getState: () => ({ user: { name: 'mock' } }),
  subscribe: () => {},
}))

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

  // useApiCall check modal
  // use apical check input and resolve reject
  // to test every prop
  test('useApiCall only promise parameter, should resolve, and return promise value', async () => {
    const mockPromise = new Promise((resolve) => {
      resolve({ data: 'Promise was resolved' })
    })

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent useApiCall={useApiCall} mockPromise={mockPromise} />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('resolved')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent(
      '[{"data":"Promise was resolved"},null]',
    )
  })

  test('useApiCall only promise parameter, should resolve if given proper API structure , and return error', async () => {
    const mockPromise = new Promise((resolve, reject) => {
      const mockError = new Error('Something went wrong')
      mockError.response = {}
      mockError.response.status = 404
      reject(mockError)
    })

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent useApiCall={useApiCall} mockPromise={mockPromise} />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('resolved')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent(
      '[null,{"response":{"status":404}}]',
    )
  })

  test('useApiCall only promise parameter, should reject without proper API structure, and return error', async () => {
    const mockPromise = new Promise((resolve, reject) => {
      const mockError = new Error('Something went wrong')
      reject(mockError)
    })

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent useApiCall={useApiCall} mockPromise={mockPromise} />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('rejected')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent('{}')
  })

  test('useApiCall status 401', async () => {
    const mockPromise = new Promise((resolve, reject) => {
      const mockError = new Error('Something went wrong')
      mockError.response = {}
      mockError.response.status = 401
      reject(mockError)
    })

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent useApiCall={useApiCall} mockPromise={mockPromise} />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('resolved')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent(
      '[null,{"response":{"status":401}}]',
    )
  })

  test('useApiCall status 403', async () => {
    const mockPromise = new Promise((resolve, reject) => {
      const mockError = new Error('Something went wrong')
      mockError.response = {}
      mockError.response.status = 403
      reject(mockError)
    })

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent useApiCall={useApiCall} mockPromise={mockPromise} />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('resolved')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent(
      '[null,{"response":{"status":403}}]',
    )
  })

  test('useApiCall all parameter, should resolve', async () => {
    const mockPromise = new Promise((resolve) => {
      resolve({ data: 'Promise was resolved' })
    })

    const additionalParams = {
      successCb: () => {},
      errorCb: () => {},
      finalCb: () => {},
      config: { message: false },
    }

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent
            useApiCall={useApiCall}
            mockPromise={mockPromise}
            additionalParams={additionalParams}
          />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('resolved')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent(
      '[{"data":"Promise was resolved"},null]',
    )
  })

  test('useApiCall all parameter, rejected', async () => {
    const mockPromise = new Promise((resolve, reject) => {
      const mockError = new Error('Something went wrong')
      mockError.response = {}
      mockError.code = 'ERR_NETWORK'
      mockError.response.status = 403
      reject(mockError)
    })

    const additionalParams = {
      successCb: () => {},
      errorCb: () => {},
      finalCb: () => {},
      config: { message: false },
    }

    await act(async () => {
      await render(
        <UseApiEnv>
          <MockComponent
            useApiCall={useApiCall}
            mockPromise={mockPromise}
            additionalParams={additionalParams}
          />
        </UseApiEnv>,
      )
    })
    screen.debug()
    expect(screen.getByTestId('api-call-mock')).toBeInTheDocument()
    expect(screen.getByTestId('api-call-mock')).toHaveTextContent('resolved')
    expect(screen.getByTestId('value-passed')).toBeInTheDocument()
    expect(screen.getByTestId('value-passed')).toHaveTextContent(
      '[null,{"response":{"status":403},"code":"ERR_NETWORK"}]',
    )
  })
})
