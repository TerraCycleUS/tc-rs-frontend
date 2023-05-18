import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import AdminPanel from '..'

jest.mock('../../../utils/http', () => ({
  post: () => ({ data: { name: 'image123.png' } }),
  get: () => ({ data: { name: 'image123.png' } }),
}))
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('AdminPanel ', () => {
  test('it renders Admin panel page', async () => {
    render(
      <TestEnvironment store={store}>
        <AdminPanel />
      </TestEnvironment>,
    )
  })
})
