import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import MonoprixId from '..'
import { setUser } from '../../../actions/user'

describe('MonoprixId ', () => {
  test('it renders MonoprixId page', async () => {
    store.dispatch(setUser({ authorization: 'token' }))
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="asdasd"
          isNum={false}
          setCode={() => {}}
          submitHandler={() => {}}
        />
      </TestEnvironment>,
    )
  })
})
