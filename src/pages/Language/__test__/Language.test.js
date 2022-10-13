import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import Language from '..'
import { setUser } from '../../../actions/user'

describe('Language ', () => {
  test('it renders Language page if user is signed-in', async () => {
    store.dispatch(setUser({ locale: 'en' }))
    render(
      <TestEnvironment store={store}>
        <Language />
      </TestEnvironment>,
    )
  })
})
