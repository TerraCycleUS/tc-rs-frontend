import React from 'react'
import { render } from '@testing-library/react'
import EditProfile from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'
import { setUser } from '../../../actions/user'

describe('EditProfile', () => {
  test('it renders EditProfile page if there is user in Redux store', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <EditProfile />
      </TestEnvironment>,
    )
  })
})
