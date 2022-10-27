import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import CouponPanel from '..'

describe('CouponPanel', () => {
  test('it renders CouponPanel', async () => {
    render(
      <TestEnvironment store={store}>
        <CouponPanel />
      </TestEnvironment>,
    )
  })
})
