import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import CouponUsing from '..'

describe('CouponUsing', () => {
  test('it renders CouponUsing', async () => {
    render(
      <TestEnvironment store={store}>
        <CouponUsing />
      </TestEnvironment>,
    )
  })
})
