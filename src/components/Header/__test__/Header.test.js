import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import Header from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('Header', () => {
  test('it renders Header', async () => {
    render(
      <TestEnvironment store={store}>
        <Header />
      </TestEnvironment>,
    )
  })
})
