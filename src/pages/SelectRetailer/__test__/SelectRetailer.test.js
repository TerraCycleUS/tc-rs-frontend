import React from 'react'
import { render, screen } from '@testing-library/react'
import SelectRetailer from '../index'
import store from '../../../store'
import { setUser } from '../../../actions/user'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'

describe('SelectRetailer ', () => {
  test('it renders Select Retailer', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <SelectRetailer />
      </TestEnvironment>,
    )

    screen.debug()
  })
})
