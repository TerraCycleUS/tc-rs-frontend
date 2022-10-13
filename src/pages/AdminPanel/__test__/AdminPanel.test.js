import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import AdminPanel from '..'

describe('AdminPanel ', () => {
  test('it renders Admin panel page', async () => {
    render(
      <TestEnvironment store={store}>
        <AdminPanel />
      </TestEnvironment>,
    )
  })
})
