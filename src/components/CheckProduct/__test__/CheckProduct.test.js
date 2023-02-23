import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import CheckProduct from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('CheckProduct', () => {
  test('it renders CheckProduct', async () => {
    render(
      <TestEnvironment store={store}>
        <CheckProduct />
      </TestEnvironment>,
    )
  })
})
