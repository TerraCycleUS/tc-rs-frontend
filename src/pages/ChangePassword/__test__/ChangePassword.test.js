import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import ChangePassword from '..'
import { setUser } from '../../../actions/user'

describe('ChangePassword ', () => {
  test('it renders change password code page if user signed-in', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <ChangePassword />
      </TestEnvironment>,
    )
  })
})
