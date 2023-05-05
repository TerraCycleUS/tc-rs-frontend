import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import PageList from '../index'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('PageList', () => {
  test('it renders PageList component', async () => {
    render(
      <AdminContext>
        <Resource name="page" list={PageList} />
      </AdminContext>,
    )
  })
})
