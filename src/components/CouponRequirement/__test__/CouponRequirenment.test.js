import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import CouponRequirement from '..'

describe('CouponRequirement', () => {
  test('it renders CouponRequirement', async () => {
    render(
      <TestEnvironment store={store}>
        <CouponRequirement />
      </TestEnvironment>,
    )
  })
})
