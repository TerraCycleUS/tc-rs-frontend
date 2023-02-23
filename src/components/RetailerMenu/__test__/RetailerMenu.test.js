import React from 'react'
import { render } from '@testing-library/react'
import RetailerMenu from '../index'
import store from '../../../store'
import { setUser } from '../../../actions/user'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('RetailerMenu ', () => {
  test('it renders Retailer menu', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <RetailerMenu />
      </TestEnvironment>,
    )
  })
})
