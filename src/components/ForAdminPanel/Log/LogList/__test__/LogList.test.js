import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import LogList from '../index'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('LogList', () => {
  test('it renders LogList component', async () => {
    render(
      <AdminContext>
        <Resource name="log" list={LogList} />
      </AdminContext>,
    )
  })
})
