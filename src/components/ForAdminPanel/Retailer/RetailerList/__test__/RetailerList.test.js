import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import RetailerList from '../index'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('RetailerList', () => {
  test('it renders RetailerList component', async () => {
    render(
      <AdminContext>
        <Resource name="retailer" list={RetailerList} />
      </AdminContext>,
    )
  })
})
