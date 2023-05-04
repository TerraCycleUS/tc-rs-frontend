import React from 'react'
import { render } from '@testing-library/react'
import FileNotFound from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('FileNotFound', () => {
  test('it renders FileNotFound page', async () => {
    render(
      <TestEnvironment store={store}>
        <FileNotFound />
      </TestEnvironment>,
    )
  })
})
