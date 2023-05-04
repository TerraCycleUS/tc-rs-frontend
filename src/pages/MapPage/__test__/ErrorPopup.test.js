import React from 'react'
import { render } from '@testing-library/react'
import ErrorPopup from '../ErrorPopup'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('ErrorPopup', () => {
  test('it renders ErrorPopup', async () => {
    render(
      <TestEnvironment store={store}>
        <ErrorPopup />
      </TestEnvironment>,
    )
  })
})
