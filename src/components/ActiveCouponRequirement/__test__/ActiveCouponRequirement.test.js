import React from 'react'
import { render } from '@testing-library/react'
import ActiveCouponRequirement from '../index'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('ActiveCouponRequirement', () => {
  test('it renders ActiveCouponRequirement component', async () => {
    render(
      <TestEnvironment store={store}>
        <ActiveCouponRequirement />
      </TestEnvironment>,
    )
  })
})
