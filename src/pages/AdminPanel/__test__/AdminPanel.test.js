import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import AdminPanel from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall')

describe('AdminPanel ', () => {
  test('it renders Admin panel page', async () => {
    render(
      <TestEnvironment store={store}>
        <AdminPanel />
      </TestEnvironment>,
    )
  })
})
