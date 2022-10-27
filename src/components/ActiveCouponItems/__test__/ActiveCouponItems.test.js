import React from 'react'
import { render } from '@testing-library/react'
import ActiveCouponItems from '../index'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('ActiveCouponItems', () => {
  test('it renders ActiveCouponItems component', async () => {
    render(
      <TestEnvironment store={store}>
        <ActiveCouponItems />
      </TestEnvironment>,
    )
  })
})
