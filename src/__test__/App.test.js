import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../components/ForTestWriting/TestEnvironment'
import App from '../App'

jest.mock('../utils/http')
jest.mock('../utils/useApiCall', () => () => jest.fn(() => {}))

describe('App ', () => {
  test('it renders App', async () => {
    render(
      <TestEnvironment>
        <App />
      </TestEnvironment>,
    )
  })
})
