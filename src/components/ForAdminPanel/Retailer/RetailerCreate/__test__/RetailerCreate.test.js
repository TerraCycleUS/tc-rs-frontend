import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import RetailerCreate from '../index'
import '@testing-library/jest-dom'
import TestEnvironment from '../../../../ForTestWriting/TestEnvironment'
import store from '../../../../../store'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))
describe('RetailerCreate', () => {
  test('it renders RetailerCreate component', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/retailer/create']}>
        <AdminContext>
          <Resource name="retailer" create={RetailerCreate} />
        </AdminContext>
      </TestEnvironment>,
    )
  })
})
