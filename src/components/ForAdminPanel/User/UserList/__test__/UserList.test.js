import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import UserList from '../index'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('UserList', () => {
  test('it renders UserList component', async () => {
    render(
      <AdminContext>
        <Resource name="user" list={UserList} />
      </AdminContext>,
    )
  })
})
