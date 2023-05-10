import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LockedCouponDate from '../index'
import store from '../../../store'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'

describe('LockedCouponDate', () => {
  test('it renders LockedCouponDate', async () => {
    render(
      <TestEnvironment store={store}>
        <LockedCouponDate />
      </TestEnvironment>,
    )
    screen.debug()
  })
})
