import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import MonoprixId from '..'
import { setUser } from '../../../actions/user'

describe('MonoprixId ', () => {
  test('it renders MonoprixId page', async () => {
    store.dispatch(setUser({ locale: 'en' }))
    render(
      <TestEnvironment store={store}>
        <MonoprixId />
      </TestEnvironment>,
    )
  })
})
