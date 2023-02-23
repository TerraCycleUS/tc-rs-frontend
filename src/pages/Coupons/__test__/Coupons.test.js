import React from 'react'
import { render } from '@testing-library/react'
import Coupons from '../index'
import store from '../../../store'
import { setUser } from '../../../actions/user'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('Coupons', () => {
  test('it renders Coupons page', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <Coupons />
      </TestEnvironment>,
    )
  })
})
