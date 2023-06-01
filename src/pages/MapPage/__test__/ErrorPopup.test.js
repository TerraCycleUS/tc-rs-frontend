import React from 'react'
import { screen, render } from '@testing-library/react'
import ErrorPopup from '../ErrorPopup'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))
jest.mock('../../../utils/detectIos', () => ({
  __esModule: true,
  default: () => true,
}))
describe('ErrorPopup', () => {
  test('it renders ErrorPopup without onclick', async () => {
    render(
      <TestEnvironment store={store}>
        <ErrorPopup />
      </TestEnvironment>,
    )
  })

  test('it renders ErrorPopup with onclick', async () => {
    render(
      <TestEnvironment store={store}>
        <ErrorPopup onClick={() => {}} />
      </TestEnvironment>,
    )
  })

  test('it renders ErrorPopup with instructions if detectIos true', async () => {
    render(
      <TestEnvironment store={store}>
        <ErrorPopup onClick={() => {}} />
      </TestEnvironment>,
    )

    screen.debug()
    expect(screen.getByTestId('instructions')).toBeTruthy()
  })
})
