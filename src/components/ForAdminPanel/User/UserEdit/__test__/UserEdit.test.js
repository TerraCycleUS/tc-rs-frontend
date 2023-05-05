import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import UserEdit from '../index'
import '@testing-library/jest-dom'
import TestEnvironment from '../../../../ForTestWriting/TestEnvironment'
import store from '../../../../../store'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('UserEdit', () => {
  test('it renders UserEdit component', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/user/1']}>
        <AdminContext>
          <Resource name="user" edit={UserEdit} />
        </AdminContext>
      </TestEnvironment>,
    )
  })
})
