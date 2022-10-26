import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import CouponLanding from '..'
import { setUser } from '../../../actions/user'

describe('CouponLanding ', () => {
  test('it renders CouponLanding page', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <CouponLanding />
      </TestEnvironment>,
    )
  })

  test('it has link to Terms & Conditions', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <CouponLanding />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('terms-and-conditions')).toHaveProperty(
      'href',
      'http://localhost/profile/terms',
    )
  })
})
